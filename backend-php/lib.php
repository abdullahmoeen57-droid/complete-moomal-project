<?php
// Shared helpers: config, database, JSON responses, auth tokens, password hashing.
// Written to run on PHP 7.4 and PHP 8.x (cPanel hosts often still default to 7.4).
declare(strict_types=1);

if (!function_exists('str_starts_with')) {
    function str_starts_with(string $haystack, string $needle): bool
    {
        return $needle === '' || strncmp($haystack, $needle, strlen($needle)) === 0;
    }
}
if (!function_exists('array_is_list')) {
    function array_is_list(array $array): bool
    {
        return $array === [] || array_keys($array) === range(0, count($array) - 1);
    }
}

final class HttpError extends Exception
{
    public $status;
    public $detail;

    public function __construct(int $status, string $detail)
    {
        parent::__construct($detail, $status);
        $this->status = $status;
        $this->detail = $detail;
    }
}

function config(): array
{
    static $cfg = null;
    if ($cfg !== null) return $cfg;
    $file = __DIR__ . '/config.php';
    if (!is_file($file)) {
        throw new HttpError(500, 'Server not configured: copy config.sample.php to config.php and fill it in.');
    }
    $cfg = require $file;
    $cfg += [
        'jwt_secret' => '',
        'admin_username' => 'admin',
        'admin_password' => '',
        'admin_reset_password' => false,
        'access_token_minutes' => 60,
        'cookie_secure' => true,
        'frontend_origins' => [],
        'db_driver' => 'sqlite',
        'sqlite_path' => __DIR__ . '/data/moomal_college.db',
        'mysql_host' => 'localhost',
        'mysql_database' => '',
        'mysql_user' => '',
        'mysql_password' => '',
    ];
    if (strlen((string)$cfg['jwt_secret']) < 32) {
        throw new HttpError(500, 'Server not configured: jwt_secret in config.php must be at least 32 characters.');
    }
    return $cfg;
}

// ---------- Responses ----------

/** Send a JSON response and stop. */
function send_json($data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function send_security_headers(): void
{
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('Permissions-Policy: camera=(), microphone=(), geolocation=()');
}

function send_cors_headers(array $origins): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    // Allow the listed sites plus any https://<sub>.moomal.edu.pk site (bsn., www., ...).
    $trusted = in_array($origin, $origins, true) || preg_match('#^https://([a-z0-9-]+\.)*moomal\.edu\.pk$#', $origin);
    if ($origin !== '' && $trusted) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Vary: Origin');
    }
}

// ---------- Database ----------

function db(): PDO
{
    static $pdo = null;
    if ($pdo !== null) return $pdo;
    $cfg = config();
    $opts = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC];
    if ($cfg['db_driver'] === 'mysql') {
        $dsn = "mysql:host={$cfg['mysql_host']};dbname={$cfg['mysql_database']};charset=utf8mb4";
        $pdo = new PDO($dsn, $cfg['mysql_user'], $cfg['mysql_password'], $opts);
    } else {
        $path = $cfg['sqlite_path'];
        if (!is_dir(dirname($path))) mkdir(dirname($path), 0755, true);
        $pdo = new PDO('sqlite:' . $path, null, null, $opts);
        $pdo->exec('PRAGMA busy_timeout = 5000');
    }
    create_schema($pdo, $cfg['db_driver'] === 'mysql');
    return $pdo;
}

function create_schema(PDO $pdo, bool $mysql): void
{
    // Same tables and columns as the original Python (SQLAlchemy) backend.
    $s = $mysql ? 'VARCHAR(255)' : 'VARCHAR';
    $t = $mysql ? 'TEXT' : 'TEXT';
    $engine = $mysql ? ' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' : '';
    $tables = [
        "CREATE TABLE IF NOT EXISTS news_events (id $s NOT NULL, title $s NOT NULL, category $s NOT NULL, date $s NOT NULL, summary $t NOT NULL, content $t NOT NULL, image $s, is_pinned BOOLEAN, is_published BOOLEAN, created_at DATETIME" . ($mysql ? '(6)' : '') . ", PRIMARY KEY (id))$engine",
        "CREATE TABLE IF NOT EXISTS admission_applications (id $s NOT NULL, ref_no $s, applicant_name $s NOT NULL, father_name $s NOT NULL, gender $s NOT NULL, dob $s NOT NULL, cnic $s NOT NULL, phone $s NOT NULL, whatsapp $s NOT NULL, email $s, domicile_district $s NOT NULL, permanent_address $t NOT NULL, matric_marks INTEGER NOT NULL, matric_total INTEGER, matric_year $s, inter_marks INTEGER NOT NULL, inter_total INTEGER, inter_year $s, inter_board $s NOT NULL, guardian_phone $s, status $s, submitted_at $s, notes $t, PRIMARY KEY (id), UNIQUE (ref_no))$engine",
        "CREATE TABLE IF NOT EXISTS faculty_members (id $s NOT NULL, name $s NOT NULL, designation $s NOT NULL, department $s, category $s, qualification $s, bio $t, photo_url $s, PRIMARY KEY (id))$engine",
        "CREATE TABLE IF NOT EXISTS popup_ad (id INTEGER NOT NULL, enabled BOOLEAN, badge $s, title $s, subtitle $s, description $t, button_text $s, button_link $s, image_url $s, PRIMARY KEY (id))$engine",
        "CREATE TABLE IF NOT EXISTS college_info (id INTEGER NOT NULL, name $s, tagline $s, short_name $s, parent_org $s, address $s, city $s, phone_primary $s, phone_secondary $s, landline $s, admission_phone1 $s, admission_phone2 $s, email $s, website $s, facebook_url $s, instagram_url $s, whatsapp_number $s, PRIMARY KEY (id))$engine",
        "CREATE TABLE IF NOT EXISTS admin_users (id INTEGER NOT NULL, username $s NOT NULL, password_hash $s NOT NULL, is_active BOOLEAN NOT NULL, created_at DATETIME" . ($mysql ? '(6)' : '') . ", PRIMARY KEY (id), UNIQUE (username))$engine",
        "CREATE TABLE IF NOT EXISTS login_attempts (ip $s NOT NULL, attempted_at DOUBLE" . ($mysql ? '' : ' PRECISION') . " NOT NULL)$engine",
    ];
    foreach ($tables as $sql) $pdo->exec($sql);
}

function db_one(string $sql, array $params = []): ?array
{
    $st = db()->prepare($sql);
    $st->execute($params);
    $row = $st->fetch();
    return $row === false ? null : $row;
}

function db_all(string $sql, array $params = []): array
{
    $st = db()->prepare($sql);
    $st->execute($params);
    return $st->fetchAll();
}

function db_exec(string $sql, array $params = []): int
{
    $st = db()->prepare($sql);
    $st->execute($params);
    return $st->rowCount();
}

function db_insert(string $table, array $row): void
{
    $cols = array_keys($row);
    $sql = "INSERT INTO $table (" . implode(', ', $cols) . ') VALUES (' . implode(', ', array_map(fn($c) => ":$c", $cols)) . ')';
    db_exec($sql, db_params($row));
}

function db_update(string $table, array $row, string $idCol, $id): void
{
    if (!$row) return;
    $sets = implode(', ', array_map(fn($c) => "$c = :$c", array_keys($row)));
    db_exec("UPDATE $table SET $sets WHERE $idCol = :__id", db_params($row) + [':__id' => $id]);
}

function db_params(array $row): array
{
    $out = [];
    foreach ($row as $k => $v) $out[":$k"] = is_bool($v) ? ($v ? 1 : 0) : $v;
    return $out;
}

function now_datetime(): string
{
    return (new DateTimeImmutable('now', new DateTimeZone('UTC')))->format('Y-m-d H:i:s.u');
}

// ---------- Output shaping (match the old JSON types) ----------

function shape_row(?array $row, array $bools = [], array $ints = [], array $datetimes = []): ?array
{
    if ($row === null) return null;
    foreach ($bools as $c) if (array_key_exists($c, $row)) $row[$c] = $row[$c] === null ? null : (bool)(int)$row[$c];
    foreach ($ints as $c) if (array_key_exists($c, $row) && $row[$c] !== null) $row[$c] = (int)$row[$c];
    foreach ($datetimes as $c) if (!empty($row[$c])) $row[$c] = str_replace(' ', 'T', (string)$row[$c]);
    foreach (['image', 'image_url', 'photo_url'] as $c) {
        // Old records saved full localhost links; keep only the /uploads/... part so they work on the server.
        if (!empty($row[$c]) && preg_match('#^https?://(localhost|127\.0\.0\.1)(:\d+)?(/uploads/[^/?\#]+)$#', (string)$row[$c], $m)) {
            $row[$c] = $m[3];
        }
    }
    return $row;
}

// ---------- Request input + validation ----------

function json_body(): array
{
    $raw = file_get_contents('php://input') ?: '';
    $data = json_decode($raw, true);
    if (!is_array($data) || array_is_list($data) && $data !== []) {
        throw new HttpError(422, 'Request body must be a JSON object.');
    }
    return $data;
}

/**
 * Validate input against a field spec, the way the old pydantic models did.
 * $spec: field => [type, required, default]  (type: str|int|bool, optional types allow null)
 */
function validate(array $data, array $spec, bool $partial = false, bool $forbidExtra = false): array
{
    if ($forbidExtra) {
        foreach (array_keys($data) as $k) {
            if (!array_key_exists($k, $spec)) throw new HttpError(422, "Unknown field: $k");
        }
    }
    $out = [];
    foreach ($spec as $field => [$type, $required, $default]) {
        $nullable = str_starts_with($type, '?');
        $base = ltrim($type, '?');
        if (!array_key_exists($field, $data)) {
            if ($partial) continue;
            if ($required) throw new HttpError(422, "Field required: $field");
            $out[$field] = $default;
            continue;
        }
        $v = $data[$field];
        if ($v === null) {
            if (!$nullable) throw new HttpError(422, "Field cannot be empty: $field");
            $out[$field] = null;
            continue;
        }
        if ($base === 'str') {
            if (!is_scalar($v) || is_bool($v)) throw new HttpError(422, "Field must be text: $field");
            $out[$field] = (string)$v;
        } elseif ($base === 'int') {
            $isWhole = is_int($v) || (is_string($v) && preg_match('/^-?\d+$/', trim($v))) || (is_float($v) && floor($v) == $v);
            if (!$isWhole) throw new HttpError(422, "Field must be a whole number: $field");
            $out[$field] = (int)$v;
        } else { // bool
            if (is_bool($v)) {
                $out[$field] = $v;
            } elseif (in_array($v, [1, 0, '1', '0', 'true', 'false'], true)) {
                $out[$field] = in_array($v, [1, '1', 'true'], true);
            } else {
                throw new HttpError(422, "Field must be true or false: $field");
            }
        }
    }
    return $out;
}

// ---------- Passwords (compatible with the Python pbkdf2_sha256 hashes) ----------

function b64url_encode(string $raw): string
{
    return rtrim(strtr(base64_encode($raw), '+/', '-_'), '=');
}

function b64url_decode(string $value): string
{
    $decoded = base64_decode(strtr($value, '-_', '+/') . str_repeat('=', (4 - strlen($value) % 4) % 4), true);
    if ($decoded === false) throw new InvalidArgumentException('bad base64');
    return $decoded;
}

function make_password_hash(string $password): string
{
    $salt = random_bytes(16);
    $digest = hash_pbkdf2('sha256', $password, $salt, 310000, 32, true);
    return 'pbkdf2_sha256$310000$' . b64url_encode($salt) . '$' . b64url_encode($digest);
}

function verify_password(string $password, string $encoded): bool
{
    try {
        $parts = explode('$', $encoded, 4);
        if (count($parts) !== 4 || $parts[0] !== 'pbkdf2_sha256') return false;
        $expected = b64url_decode($parts[3]);
        $actual = hash_pbkdf2('sha256', $password, b64url_decode($parts[2]), (int)$parts[1], strlen($expected), true);
        return hash_equals($expected, $actual);
    } catch (Throwable $ignored) {
        return false;
    }
}

// ---------- Session tokens (signed HS256, same format as before) ----------

function create_session_token(string $username): string
{
    $cfg = config();
    $header = b64url_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload = b64url_encode(json_encode([
        'sub' => $username,
        'exp' => time() + (int)$cfg['access_token_minutes'] * 60,
        'jti' => b64url_encode(random_bytes(12)),
    ]));
    $sig = b64url_encode(hash_hmac('sha256', "$header.$payload", $cfg['jwt_secret'], true));
    return "$header.$payload.$sig";
}

function read_session_token(string $token): array
{
    $parts = explode('.', $token);
    if (count($parts) === 3) {
        [$header, $payload, $sig] = $parts;
        $expected = b64url_encode(hash_hmac('sha256', "$header.$payload", config()['jwt_secret'], true));
        if (hash_equals($expected, $sig)) {
            try {
                $data = json_decode(b64url_decode($payload), true);
                if (is_array($data) && (int)($data['exp'] ?? 0) >= time()) return $data;
            } catch (Throwable $ignored) {
            }
        }
    }
    throw new HttpError(401, 'Session expired. Please sign in again.');
}

function set_session_cookie(string $value, int $maxAge): void
{
    setcookie('admin_session', $value, [
        'expires' => $maxAge > 0 ? time() + $maxAge : time() - 3600,
        'path' => '/',
        'secure' => (bool)config()['cookie_secure'],
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
}

function require_admin(): array
{
    $token = $_COOKIE['admin_session'] ?? '';
    if ($token === '') throw new HttpError(401, 'Administrator login required');
    $payload = read_session_token($token);
    $username = $payload['sub'] ?? '';
    $admin = $username ? db_one('SELECT * FROM admin_users WHERE username = ? AND is_active = 1', [$username]) : null;
    if (!$admin) throw new HttpError(401, 'Administrator account is unavailable');
    return $admin;
}

/** Create the first admin from config.php, or reset its password once when asked to. */
function bootstrap_admin(): void
{
    $cfg = config();
    $password = (string)$cfg['admin_password'];
    // Ignore an unset/placeholder/weak password so a forgotten edit never becomes the real login.
    if (strlen($password) < 12 || str_starts_with($password, 'CHANGE-ME')) return;
    $username = (string)$cfg['admin_username'];
    $admin = db_one('SELECT * FROM admin_users WHERE username = ?', [$username]);
    if (!$admin) {
        $nextId = (int)(db_one('SELECT COALESCE(MAX(id), 0) + 1 AS n FROM admin_users')['n'] ?? 1);
        db_insert('admin_users', [
            'id' => $nextId, 'username' => $username, 'password_hash' => make_password_hash($password),
            'is_active' => true, 'created_at' => now_datetime(),
        ]);
        return;
    }
    if ($cfg['admin_reset_password']) {
        // Only reset once per password value, not on every request.
        $marker = dirname($cfg['sqlite_path']) . '/.admin_reset_done';
        $fingerprint = hash_hmac('sha256', $username . "\0" . $password, $cfg['jwt_secret']);
        if (!is_file($marker) || trim((string)file_get_contents($marker)) !== $fingerprint) {
            db_update('admin_users', ['password_hash' => make_password_hash($password), 'is_active' => true], 'id', $admin['id']);
            @file_put_contents($marker, $fingerprint);
        }
    }
}

function enforce_login_limit(): void
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $now = microtime(true);
    db_exec('DELETE FROM login_attempts WHERE attempted_at < ?', [$now - 60]);
    $count = (int)(db_one('SELECT COUNT(*) AS c FROM login_attempts WHERE ip = ?', [$ip])['c'] ?? 0);
    if ($count >= 5) throw new HttpError(429, 'Too many login attempts. Please wait one minute.');
    db_insert('login_attempts', ['ip' => $ip, 'attempted_at' => $now]);
}

function new_id(string $prefix): string
{
    return $prefix . '-' . bin2hex(random_bytes(16));
}
