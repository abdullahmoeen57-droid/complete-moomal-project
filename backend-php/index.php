<?php
// Moomal College API (PHP). Same endpoints and JSON as the old Python backend.
declare(strict_types=1);

require __DIR__ . '/lib.php';

ini_set('display_errors', '0');

const NEWS_BOOLS = ['is_pinned', 'is_published'];
const APP_INTS = ['matric_marks', 'matric_total', 'inter_marks', 'inter_total'];
const POPUP_DEFAULTS = [
    'id' => 1, 'enabled' => true, 'badge' => 'Admissions Open 2025-2026',
    'title' => 'Bachelor of Science in Nursing (BSN)',
    'subtitle' => '4-Year Degree Program • Affiliated with LUMHS Jamshoro',
    'description' => 'Applications are now invited for the 4-Year BSN Program...',
    'button_text' => 'Apply Online Now', 'button_link' => '#admissions', 'image_url' => null,
];
const COLLEGE_DEFAULTS = [
    'id' => 1, 'name' => 'Moomal College of Nursing & Allied Health Sciences',
    'tagline' => 'Empowering Next-Generation Healthcare Leaders', 'short_name' => 'MCNAHS Hyderabad',
    'parent_org' => 'Moomal Group of Colleges / Moomal Education (Pvt) Ltd',
    'address' => 'B-6, Block A, Latifabad, Unit #8, Auto Bhan Road', 'city' => 'Hyderabad, Sindh 46000, Pakistan',
    'phone_primary' => '03033266736', 'phone_secondary' => '03330248438', 'landline' => '0226119144',
    'admission_phone1' => '+92 3152001297', 'admission_phone2' => '+92 3132355799',
    'email' => 'Moomal.edu@hotmail.com', 'website' => 'www.moomal.edu.pk',
    'facebook_url' => 'https://www.facebook.com/moomalgroupofcolleges/',
    'instagram_url' => 'https://www.instagram.com/moomalgroupofcolleges/?hl=en',
    'whatsapp_number' => '+923033266736',
];

function news_out(?array $r): ?array { return shape_row($r, NEWS_BOOLS, [], ['created_at']); }
function app_out(?array $r): ?array { return shape_row($r, [], APP_INTS); }
function popup_out(?array $r): ?array { return shape_row($r, ['enabled'], ['id']); }

/** Work out the API path (e.g. "/api/news") no matter which folder the API is installed in. */
function request_path(): string
{
    $path = rawurldecode(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/');
    $base = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/')), '/');
    if ($base !== '' && str_starts_with($path, $base . '/')) $path = substr($path, strlen($base));
    if ($path === '/index.php' || str_starts_with($path, '/index.php/')) $path = substr($path, 10) ?: '/';
    if (!str_starts_with($path, '/api/') && $path !== '/api') $path = '/api' . $path;
    return rtrim($path, '/') ?: '/';
}

function handle(string $method, string $path): void
{
    // ----- Health: also reports setup problems (missing config.php, bad secret, database errors) -----
    if ($method === 'GET' && $path === '/api/health') {
        config();
        try { db(); } catch (PDOException $e) { throw new HttpError(500, 'Database error: ' . $e->getMessage()); }
        send_json(['status' => 'online', 'institution' => 'Moomal College of Nursing & Allied Health Sciences']);
    }

    bootstrap_admin();

    // ----- Auth -----
    if ($method === 'POST' && $path === '/api/auth/login') {
        enforce_login_limit();
        $data = validate(json_body(), ['username' => ['str', true, null], 'password' => ['str', true, null]]);
        $admin = db_one('SELECT * FROM admin_users WHERE username = ? AND is_active = 1', [$data['username']]);
        if (!$admin || !verify_password($data['password'], $admin['password_hash'])) {
            throw new HttpError(401, 'Invalid username or password');
        }
        $maxAge = (int)config()['access_token_minutes'] * 60;
        set_session_cookie(create_session_token($admin['username']), $maxAge);
        send_json(['authenticated' => true, 'username' => $admin['username'], 'expires_in' => $maxAge]);
    }
    if ($method === 'POST' && $path === '/api/auth/logout') {
        set_session_cookie('', 0);
        send_json(['authenticated' => false]);
    }
    if ($method === 'GET' && $path === '/api/auth/me') {
        $admin = require_admin();
        send_json(['authenticated' => true, 'username' => $admin['username']]);
    }
    if ($method === 'POST' && $path === '/api/auth/change-password') {
        $admin = require_admin();
        $data = validate(json_body(), ['current_password' => ['str', true, null], 'new_password' => ['str', true, null]]);
        if (strlen($data['new_password']) < 12) throw new HttpError(422, 'New password must be at least 12 characters');
        if (!verify_password($data['current_password'], $admin['password_hash'])) throw new HttpError(400, 'Current password is incorrect');
        db_update('admin_users', ['password_hash' => make_password_hash($data['new_password'])], 'id', $admin['id']);
        set_session_cookie('', 0);
        send_json(['message' => 'Password updated. Please sign in again.']);
    }

    // ----- Image upload -----
    if ($method === 'POST' && $path === '/api/uploads/image') {
        require_admin();
        send_json(['url' => '/uploads/' . save_uploaded_image()], 201);
    }

    // ----- News & events -----
    if ($method === 'GET' && $path === '/api/news') {
        $rows = db_all('SELECT * FROM news_events WHERE is_published = 1 ORDER BY is_pinned DESC, created_at DESC');
        send_json(array_map('news_out', $rows));
    }
    if ($method === 'GET' && $path === '/api/admin/news') {
        require_admin();
        send_json(array_map('news_out', db_all('SELECT * FROM news_events ORDER BY created_at DESC')));
    }
    $newsSpec = [
        'title' => ['str', true, null], 'category' => ['str', true, null], 'date' => ['str', true, null],
        'summary' => ['str', true, null], 'content' => ['str', true, null], 'image' => ['?str', false, null],
        'is_pinned' => ['bool', false, false], 'is_published' => ['bool', false, true],
    ];
    if ($method === 'POST' && $path === '/api/news') {
        require_admin();
        $row = ['id' => new_id('news')] + validate(json_body(), $newsSpec) + ['created_at' => now_datetime()];
        db_insert('news_events', $row);
        send_json(news_out(db_one('SELECT * FROM news_events WHERE id = ?', [$row['id']])), 201);
    }
    if (preg_match('#^/api/news/([^/]+)$#', $path, $m)) {
        require_admin();
        $item = db_one('SELECT * FROM news_events WHERE id = ?', [$m[1]]);
        if (!$item) throw new HttpError(404, 'News item not found');
        if ($method === 'PUT') {
            $spec = array_map(fn($f) => ['?' . ltrim($f[0], '?'), false, null], $newsSpec);
            $changes = validate(json_body(), $spec, true, true);
            // Required text columns cannot be set to null.
            foreach (['title', 'category', 'date', 'summary', 'content', 'is_pinned', 'is_published'] as $c) {
                if (array_key_exists($c, $changes) && $changes[$c] === null) throw new HttpError(422, "Field cannot be empty: $c");
            }
            db_update('news_events', $changes, 'id', $m[1]);
            send_json(news_out(db_one('SELECT * FROM news_events WHERE id = ?', [$m[1]])));
        }
        if ($method === 'DELETE') {
            db_exec('DELETE FROM news_events WHERE id = ?', [$m[1]]);
            send_json(['message' => 'News item deleted', 'id' => $m[1]]);
        }
    }

    // ----- Admission applications -----
    if ($method === 'GET' && $path === '/api/applications') {
        require_admin();
        send_json(array_map('app_out', db_all('SELECT * FROM admission_applications ORDER BY submitted_at DESC')));
    }
    if ($method === 'POST' && $path === '/api/applications') {
        $data = validate(json_body(), [
            'applicant_name' => ['str', true, null], 'father_name' => ['str', true, null], 'gender' => ['str', true, null],
            'dob' => ['str', true, null], 'cnic' => ['str', true, null], 'phone' => ['str', true, null],
            'whatsapp' => ['str', true, null], 'email' => ['?str', false, ''], 'domicile_district' => ['str', true, null],
            'permanent_address' => ['str', true, null], 'matric_marks' => ['int', true, null], 'matric_total' => ['int', false, 1100],
            'matric_year' => ['?str', false, '2023'], 'inter_marks' => ['int', true, null], 'inter_total' => ['int', false, 1100],
            'inter_year' => ['?str', false, '2025'], 'inter_board' => ['str', true, null], 'guardian_phone' => ['?str', false, ''],
        ]);
        $now = new DateTimeImmutable('now', new DateTimeZone('UTC'));
        $row = ['id' => new_id('app'), 'ref_no' => 'MCNAHS-' . $now->format('Y') . '-' . strtoupper(bin2hex(random_bytes(3)))]
            + $data + ['status' => 'Pending', 'submitted_at' => $now->format('Y-m-d H:i'), 'notes' => null];
        db_insert('admission_applications', $row);
        send_json(app_out(db_one('SELECT * FROM admission_applications WHERE id = ?', [$row['id']])), 201);
    }
    if ($method === 'DELETE' && preg_match('#^/api/applications/([^/]+)$#', $path, $m)) {
        require_admin();
        if (!db_one('SELECT id FROM admission_applications WHERE id = ?', [$m[1]])) throw new HttpError(404, 'Application not found');
        db_exec('DELETE FROM admission_applications WHERE id = ?', [$m[1]]);
        send_json(['message' => 'Application deleted']);
    }
    if ($method === 'PUT' && preg_match('#^/api/applications/([^/]+)/status$#', $path, $m)) {
        require_admin();
        if (!db_one('SELECT id FROM admission_applications WHERE id = ?', [$m[1]])) throw new HttpError(404, 'Application not found');
        $data = validate(json_body(), ['status' => ['str', true, null], 'notes' => ['?str', false, null]]);
        $changes = ['status' => $data['status']];
        if ($data['notes'] !== null) $changes['notes'] = $data['notes'];
        db_update('admission_applications', $changes, 'id', $m[1]);
        send_json(app_out(db_one('SELECT * FROM admission_applications WHERE id = ?', [$m[1]])));
    }

    // ----- Faculty -----
    if ($method === 'GET' && $path === '/api/faculty') {
        send_json(array_map(fn($r) => shape_row($r), db_all('SELECT * FROM faculty_members')));
    }
    if ($method === 'POST' && $path === '/api/faculty') {
        require_admin();
        $row = ['id' => new_id('fac')] + validate(json_body(), [
            'name' => ['str', true, null], 'designation' => ['str', true, null],
            'department' => ['str', false, 'Faculty of Nursing'], 'category' => ['str', false, 'nursing'],
            'qualification' => ['?str', false, ''], 'bio' => ['?str', false, ''], 'photo_url' => ['?str', false, null],
        ]);
        db_insert('faculty_members', $row);
        send_json(shape_row(db_one('SELECT * FROM faculty_members WHERE id = ?', [$row['id']])), 201);
    }
    if ($method === 'DELETE' && preg_match('#^/api/faculty/([^/]+)$#', $path, $m)) {
        require_admin();
        if (!db_one('SELECT id FROM faculty_members WHERE id = ?', [$m[1]])) throw new HttpError(404, 'Faculty member not found');
        db_exec('DELETE FROM faculty_members WHERE id = ?', [$m[1]]);
        send_json(['message' => 'Faculty member deleted']);
    }

    // ----- Popup advertisement -----
    if ($path === '/api/popup-ad' && ($method === 'GET' || $method === 'PUT')) {
        $ad = db_one('SELECT * FROM popup_ad ORDER BY id LIMIT 1');
        if ($method === 'GET') {
            if (!$ad) { db_insert('popup_ad', POPUP_DEFAULTS); $ad = db_one('SELECT * FROM popup_ad ORDER BY id LIMIT 1'); }
            send_json(popup_out($ad));
        }
        require_admin();
        $data = validate(json_body(), [
            'enabled' => ['bool', true, null], 'badge' => ['str', true, null], 'title' => ['str', true, null],
            'subtitle' => ['str', true, null], 'description' => ['str', true, null], 'button_text' => ['str', true, null],
            'button_link' => ['str', true, null], 'image_url' => ['?str', false, null],
        ]);
        if (!$ad) db_insert('popup_ad', ['id' => 1] + $data);
        else db_update('popup_ad', $data, 'id', $ad['id']);
        send_json(popup_out(db_one('SELECT * FROM popup_ad ORDER BY id LIMIT 1')));
    }

    // ----- College info -----
    if ($path === '/api/college-info' && ($method === 'GET' || $method === 'PUT')) {
        $info = db_one('SELECT * FROM college_info ORDER BY id LIMIT 1');
        if ($method === 'GET') {
            if (!$info) { db_insert('college_info', COLLEGE_DEFAULTS); $info = db_one('SELECT * FROM college_info ORDER BY id LIMIT 1'); }
            send_json(shape_row($info, [], ['id']));
        }
        require_admin();
        $fields = ['name', 'tagline', 'address', 'city', 'phone_primary', 'phone_secondary', 'landline', 'admission_phone1',
            'admission_phone2', 'email', 'website', 'facebook_url', 'instagram_url', 'whatsapp_number'];
        $data = validate(json_body(), array_fill_keys($fields, ['str', true, null]));
        if (!$info) db_insert('college_info', array_merge(COLLEGE_DEFAULTS, $data));
        else db_update('college_info', $data, 'id', $info['id']);
        send_json(shape_row(db_one('SELECT * FROM college_info ORDER BY id LIMIT 1'), [], ['id']));
    }

    // Path exists but with another method -> 405, otherwise 404 (same as before).
    $known = ['#^/api/(health|news|admin/news|applications|faculty|popup-ad|college-info|uploads/image)$#',
        '#^/api/auth/(login|logout|me|change-password)$#', '#^/api/(news|applications|faculty)/[^/]+(/status)?$#'];
    foreach ($known as $re) if (preg_match($re, $path)) throw new HttpError(405, 'Method Not Allowed');
    throw new HttpError(404, 'Not Found');
}

/** Validate an uploaded image, re-encode it (strips anything hidden inside), save it, return the file name. */
function save_uploaded_image(): string
{
    $file = $_FILES['file'] ?? null;
    if (!$file || !is_array($file) || ($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) throw new HttpError(422, 'Field required: file');
    if (in_array($file['error'], [UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE], true) || $file['size'] > 5 * 1024 * 1024) {
        throw new HttpError(413, 'Image must be 5 MB or smaller');
    }
    if ($file['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($file['tmp_name'])) throw new HttpError(400, 'Upload failed');
    $info = @getimagesize($file['tmp_name']);
    $types = [IMAGETYPE_JPEG => 'jpg', IMAGETYPE_PNG => 'png', IMAGETYPE_WEBP => 'webp'];
    if (!$info) throw new HttpError(400, 'Uploaded file is not a valid image');
    if (!isset($types[$info[2]])) throw new HttpError(415, 'Only JPG, PNG and WEBP images are allowed');
    $ext = $types[$info[2]];

    $dir = __DIR__ . '/uploads';
    if (!is_dir($dir)) mkdir($dir, 0755, true);
    $name = bin2hex(random_bytes(16)) . '.' . $ext;
    $dest = "$dir/$name";

    if (function_exists('imagecreatefromstring') && ($ext !== 'webp' || function_exists('imagewebp'))) {
        $img = @imagecreatefromstring((string)file_get_contents($file['tmp_name']));
        if (!$img) throw new HttpError(400, 'Uploaded file is not a valid image');
        [$w, $h] = [imagesx($img), imagesy($img)];
        $scale = min(1, 2400 / max($w, $h));
        if ($scale < 1) {
            $nw = max(1, (int)round($w * $scale)); $nh = max(1, (int)round($h * $scale));
            $resized = imagecreatetruecolor($nw, $nh);
            imagealphablending($resized, false); imagesavealpha($resized, true);
            imagecopyresampled($resized, $img, 0, 0, 0, 0, $nw, $nh, $w, $h);
            $img = $resized;
        }
        if ($ext === 'jpg') {
            $ok = imagejpeg($img, $dest, 85);
        } elseif ($ext === 'png') {
            imagesavealpha($img, true);
            $ok = imagepng($img, $dest, 6);
        } else {
            $ok = imagewebp($img, $dest, 85);
        }
        if (!$ok) throw new HttpError(500, 'Could not save image');
    } elseif (!move_uploaded_file($file['tmp_name'], $dest)) {
        throw new HttpError(500, 'Could not save image');
    }
    return $name;
}

// ---------- Main ----------
send_security_headers();
try {
    $cfg = null;
    try { $cfg = config(); } catch (HttpError $ignored) { /* reported below by the route */ }
    send_cors_headers($cfg['frontend_origins'] ?? []);
    $method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
    if ($method === 'OPTIONS') { http_response_code(204); exit; }
    handle($method, request_path());
} catch (HttpError $e) {
    send_json(['detail' => $e->detail], $e->status);
} catch (Throwable $e) {
    error_log('Moomal API error: ' . $e);
    send_json(['detail' => 'Internal server error'], 500);
}
