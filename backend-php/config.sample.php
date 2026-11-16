<?php
// Copy this file to config.php (same folder) and fill in the values.
// config.php is never sent to visitors: the server runs it as PHP and .htaccess blocks it too.
return [
    // Random secret, at least 32 characters. Generate one at the command line with:
    //   php -r "echo bin2hex(random_bytes(32));"
    'jwt_secret' => 'CHANGE-ME-to-a-long-random-secret-at-least-32-characters',

    // Admin login for the website's admin panel (#admin).
    'admin_username' => 'admin',
    'admin_password' => 'CHANGE-ME-strong-password',

    // Set to true to reset the existing admin's password to admin_password above.
    // It runs once per password; set it back to false afterwards.
    'admin_reset_password' => false,

    'access_token_minutes' => 60,

    // true on the live HTTPS site. Set false only for local testing over http://.
    'cookie_secure' => true,

    // Websites allowed to call this API from another address (local dev, www, etc).
    'frontend_origins' => [
        'https://bsn.moomal.edu.pk',
        'https://moomal.edu.pk',
        'https://www.moomal.edu.pk',
        'http://localhost:3000',
    ],

    // Database: 'sqlite' (default, a single file in data/) or 'mysql'.
    'db_driver' => 'sqlite',
    'sqlite_path' => __DIR__ . '/data/moomal_college.db',

    // Only used when db_driver is 'mysql' (create the DB + user in cPanel > MySQL Databases).
    'mysql_host' => 'localhost',
    'mysql_database' => '',
    'mysql_user' => '',
    'mysql_password' => '',
];
