<?php
// Local development only:  php -S localhost:8000 dev-router.php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if (preg_match('#^/api/uploads/([A-Za-z0-9]+\.(jpg|png|webp))$#', $path, $m) && is_file(__DIR__ . '/uploads/' . $m[1])) {
    header('Content-Type: ' . ['jpg' => 'image/jpeg', 'png' => 'image/png', 'webp' => 'image/webp'][$m[2]]);
    readfile(__DIR__ . '/uploads/' . $m[1]);
    return true;
}
$_SERVER['SCRIPT_NAME'] = '/index.php';
require __DIR__ . '/index.php';
