# FastAPI backend

See the project-root `README.md` for complete setup instructions.

Run locally from this folder:

```powershell
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

Configuration is read from the project-root `.env` file. Set `JWT_SECRET_KEY`, `ADMIN_USERNAME`, and a unique `ADMIN_PASSWORD` (12+ characters) before the first run. The initial administrator is created automatically on first startup.

The backend uses `backend/moomal_college.db` (SQLite) by default. Set `DATABASE_URL` to a PostgreSQL connection string for production. A failed explicitly configured database connection stops the backend instead of silently switching databases.

Admin-only routes require the signed HttpOnly `admin_session` cookie. Public routes are limited to published news, popup settings, public faculty list, health status, and new admission submissions. Student application lists and content-management writes require an administrator session.
