"""Entry point for cPanel "Setup Python App" (Passenger).

Passenger speaks WSGI, but FastAPI is ASGI, so a2wsgi bridges the two.

The cPanel app is mounted at /api, so Passenger hands us SCRIPT_NAME=/api and
PATH_INFO=/news for a request to /api/news. The FastAPI routes are written as
/api/news, so we put the full path back before passing the request on.
"""
import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE_DIR)
os.chdir(BASE_DIR)

from a2wsgi import ASGIMiddleware  # noqa: E402
from main import app, bootstrap_admin  # noqa: E402

# a2wsgi does not run FastAPI startup events, so create the admin user here.
bootstrap_admin()

_asgi = ASGIMiddleware(app)


def application(environ, start_response):
    full_path = environ.get("SCRIPT_NAME", "") + environ.get("PATH_INFO", "")
    environ["SCRIPT_NAME"] = ""
    environ["PATH_INFO"] = full_path or "/"
    return _asgi(environ, start_response)
