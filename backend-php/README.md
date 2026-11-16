# Moomal College API (PHP)

PHP replacement for the old Python/FastAPI backend in `../backend`. It serves the
same endpoints (`/api/news`, `/api/applications`, `/api/auth/login`, ...) with the
same JSON, cookie and password format, so the React frontend needs no changes and
existing databases and admin passwords keep working.

Requirements: PHP 8.1+ with PDO SQLite (or PDO MySQL) and GD. Standard on cPanel.

## Files

| Path | Purpose |
|---|---|
| `index.php` | All API routes |
| `lib.php` | Config, database, validation, auth helpers |
| `config.sample.php` | Settings template, copy to `config.php` |
| `.htaccess` | Sends `/api/*` to `index.php`, blocks private files |
| `data/` | SQLite database (blocked from the web) |
| `uploads/` | Uploaded images, served at `/api/uploads/<file>` (scripts blocked) |
| `dev-router.php` | Local development server only |

## Deploy on cPanel

1. Live setup: upload this folder's contents into the document root of the
   `api.moomal.edu.pk` subdomain (cPanel > Domains shows the folder). The frontend
   is built with `VITE_API_BASE_URL=https://api.moomal.edu.pk` (see `../.env.production`).
   It also works inside an `api/` folder of the main site if the frontend calls the main domain.
2. Copy `config.sample.php` to `config.php` and set `jwt_secret` and `admin_password`.
3. Make sure `data/` and `uploads/` are writable (permission 755 is normal on cPanel).
4. Open `https://moomal.edu.pk/api/health`. It should show `"status":"online"`.
   If not, the JSON `detail` says what is wrong.

If a Python app was set up for `/api` in "Setup Python App", remove it first,
otherwise it takes over the `/api` address.

## Admin password

On first request the admin from `config.php` is created if it does not exist.
To reset a forgotten password: set a new `admin_password`, set
`admin_reset_password` to `true`, open `/api/health` once, then set it back to `false`.
Passwords shorter than 12 characters or starting with `CHANGE-ME` are ignored.

## Run locally

```bash
cd backend-php
cp config.sample.php config.php   # set cookie_secure => false for http://localhost
php -S localhost:8000 dev-router.php
```

Then run the frontend with `npm run dev` in the project root. It calls
`http://localhost:8000` by default.

## MySQL instead of SQLite

Create a database and user in cPanel > MySQL Databases, then set `db_driver`
to `mysql` and fill in the `mysql_*` values. Tables are created automatically.
