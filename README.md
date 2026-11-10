# Moomal College of Nursing & Allied Health Sciences

React + Vite frontend with a FastAPI + SQLAlchemy backend.

## 1) First-time setup

1. Install Python 3.10+ and Node.js 20+.
2. In the project root, copy `.env.example` to `.env`.
3. Generate a strong secret:

   ```powershell
   python -c "import secrets; print(secrets.token_urlsafe(48))"
   ```

4. Paste the generated value into `JWT_SECRET_KEY` in `.env`.
5. Set `ADMIN_USERNAME` and a unique `ADMIN_PASSWORD` (at least 12 characters). Do not use the old `moomal2026` passcode.
6. For local development, leave `DATABASE_URL` commented out; the backend uses `backend/moomal_college.db`.

## 2) Start the backend

Open a terminal in the project root:

```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

Backend: `http://localhost:8000`
Health check: `http://localhost:8000/api/health`
API docs: `http://localhost:8000/docs` (turn off in production with `ENABLE_API_DOCS=false`).

## 3) Start the frontend

Open a second terminal in the project root:

```powershell
npm install
npm run dev
```

Website: `http://localhost:3000`
Admin panel: `http://localhost:3000/#admin`

Sign in using the username and password configured in the root `.env` file.

## 4) Database: view student registrations

The local SQLite database is `backend/moomal_college.db`.

Install DB Browser for SQLite from https://sqlitebrowser.org/, open that file, select **Browse Data**, then choose `admission_applications`. Each row is a submitted application. Other useful tables:

- `news_events`: notices, news and events, including image path and publish state.
- `admission_applications`: student admission forms and their status.
- `faculty_members`: faculty roster.
- `popup_ad`: popup title, description, image and button settings.
- `admin_users`: administrator username and salted password hash (never the plain password).

The public admissions form writes to the database. Viewing the applications list and changing an application's status requires an authenticated admin session.

## 5) Admin content management

- **News & Events**: add title, category, date, summary, full content and optional image; publish/draft, pin, edit or delete.
- **Popup Advertisement**: edit badge, title, subtitle, description, button label/link, upload an optional image, then click **Save Changes**.
- **Applications**: view real submitted applications, update status and export CSV.
- Uploaded images are validated as JPG/PNG/WEBP, limited to 5 MB, re-encoded, and stored under `backend/uploads/`.

## 6) Security notes

- Admin sessions use signed, expiring tokens in an HttpOnly, SameSite=Strict cookie; the token is not stored in LocalStorage.
- Passwords are stored as salted PBKDF2-SHA256 hashes.
- Admin-only APIs reject requests without a valid session. Public visitors can read published news and submit an application, but cannot list applications or modify content.
- Login attempts are limited per client IP (5 attempts per minute in this single-process development server).
- CORS is restricted to `FRONTEND_ORIGINS`; do not use `*` with credentials.
- A configured PostgreSQL connection is not silently replaced by SQLite if it fails. Set `DATABASE_URL` explicitly for production.
- For HTTPS production deployment set `COOKIE_SECURE=true`, `ENABLE_API_DOCS=false`, use a strong secret, configure exact frontend origins, keep `.env` private, and use a managed database plus persistent media storage/backups.

This project has not been penetration-tested. Before collecting real CNICs or other sensitive admission data on a public production website, arrange a professional security review and confirm privacy/data-retention requirements.
