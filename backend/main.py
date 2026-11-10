import os, uuid, secrets, base64, hashlib, hmac, json, time
from datetime import datetime
from pathlib import Path
from typing import Optional
from io import BytesIO
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, Response, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, ConfigDict
from sqlalchemy.orm import Session
from PIL import Image, UnidentifiedImageError
from database import engine, Base, get_db
import models

BASE_DIR = Path(__file__).resolve().parent
PROJECT_DIR = BASE_DIR.parent
load_dotenv(PROJECT_DIR / ".env")
load_dotenv(BASE_DIR / ".env")
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "")
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "")
ACCESS_TOKEN_MINUTES = int(os.getenv("ACCESS_TOKEN_MINUTES", "60"))
COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() == "true"
FRONTEND_ORIGINS = [x.strip() for x in os.getenv("FRONTEND_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",") if x.strip()]
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
MAX_UPLOAD_BYTES = 5 * 1024 * 1024
ALLOWED_FORMATS = {"JPEG": "jpg", "PNG": "png", "WEBP": "webp"}
Base.metadata.create_all(bind=engine)
app = FastAPI(title="Moomal College of Nursing & Allied Health Sciences API", description="Secure college content and admissions management API", version="2.0.0", docs_url="/docs" if os.getenv("ENABLE_API_DOCS", "true").lower() == "true" else None, redoc_url=None)
app.add_middleware(CORSMiddleware, allow_origins=FRONTEND_ORIGINS, allow_credentials=True, allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], allow_headers=["Content-Type", "Authorization"])
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    return response

def _b64encode(raw: bytes) -> str:
    return base64.urlsafe_b64encode(raw).rstrip(b"=").decode("ascii")
def _b64decode(value: str) -> bytes:
    return base64.urlsafe_b64decode(value + "=" * (-len(value) % 4))
def make_password_hash(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 310_000)
    return f"pbkdf2_sha256$310000${_b64encode(salt)}${_b64encode(digest)}"
def verify_password(password: str, encoded: str) -> bool:
    try:
        scheme, iterations, salt, expected = encoded.split("$", 3)
        if scheme != "pbkdf2_sha256": return False
        actual = hashlib.pbkdf2_hmac("sha256", password.encode(), _b64decode(salt), int(iterations))
        return hmac.compare_digest(actual, _b64decode(expected))
    except (ValueError, TypeError): return False
def create_session_token(username: str) -> str:
    header = _b64encode(json.dumps({"alg":"HS256","typ":"JWT"},separators=(",",":")).encode())
    payload = _b64encode(json.dumps({"sub":username,"exp":int(time.time())+ACCESS_TOKEN_MINUTES*60,"jti":secrets.token_urlsafe(12)},separators=(",",":")).encode())
    message = f"{header}.{payload}".encode("ascii")
    sig = _b64encode(hmac.new(SECRET_KEY.encode(),message,hashlib.sha256).digest())
    return f"{header}.{payload}.{sig}"
def read_session_token(token: str) -> dict:
    try:
        header,payload,signature = token.split(".",2)
        expected = _b64encode(hmac.new(SECRET_KEY.encode(),f"{header}.{payload}".encode("ascii"),hashlib.sha256).digest())
        if not hmac.compare_digest(signature,expected): raise ValueError("signature")
        data = json.loads(_b64decode(payload))
        if int(data.get("exp",0)) < int(time.time()): raise ValueError("expired")
        return data
    except Exception: raise HTTPException(status_code=401,detail="Session expired. Please sign in again.")
_login_attempts: dict[str,list[float]] = {}
def enforce_login_limit(request: Request):
    ip = request.client.host if request.client else "unknown"
    now = time.time()
    recent = [stamp for stamp in _login_attempts.get(ip,[]) if now-stamp < 60]
    if len(recent) >= 5: raise HTTPException(status_code=429,detail="Too many login attempts. Please wait one minute.")
    recent.append(now); _login_attempts[ip] = recent

class LoginInput(BaseModel): username: str; password: str
class PasswordChangeInput(BaseModel): current_password: str; new_password: str
class NewsEventCreate(BaseModel):
    title: str; category: str; date: str; summary: str; content: str
    image: Optional[str] = None; is_pinned: bool = False; is_published: bool = True
class NewsEventUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")
    title: Optional[str] = None; category: Optional[str] = None; date: Optional[str] = None
    summary: Optional[str] = None; content: Optional[str] = None; image: Optional[str] = None
    is_pinned: Optional[bool] = None; is_published: Optional[bool] = None
class ApplicationCreate(BaseModel):
    applicant_name: str; father_name: str; gender: str; dob: str; cnic: str; phone: str; whatsapp: str
    email: Optional[str] = ""; domicile_district: str; permanent_address: str
    matric_marks: int; matric_total: int = 1100; matric_year: Optional[str] = "2023"
    inter_marks: int; inter_total: int = 1100; inter_year: Optional[str] = "2025"
    inter_board: str; guardian_phone: Optional[str] = ""
class ApplicationStatusUpdate(BaseModel): status: str; notes: Optional[str] = None
class FacultyCreate(BaseModel):
    name: str; designation: str; department: str = "Faculty of Nursing"; category: str = "nursing"
    qualification: Optional[str] = ""; bio: Optional[str] = ""; photo_url: Optional[str] = None
class PopupAdUpdate(BaseModel):
    enabled: bool; badge: str; title: str; subtitle: str; description: str
    button_text: str; button_link: str; image_url: Optional[str] = None
class CollegeInfoUpdate(BaseModel):
    name: str; tagline: str; address: str; city: str; phone_primary: str; phone_secondary: str
    landline: str; admission_phone1: str; admission_phone2: str; email: str; website: str
    facebook_url: str; instagram_url: str; whatsapp_number: str

def require_admin(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("admin_session")
    if not token or not SECRET_KEY: raise HTTPException(status_code=401,detail="Administrator login required")
    payload = read_session_token(token)
    username = payload.get("sub")
    admin = db.query(models.AdminUserModel).filter_by(username=username,is_active=True).first() if username else None
    if not admin: raise HTTPException(status_code=401,detail="Administrator account is unavailable")
    return admin

@app.on_event("startup")
def bootstrap_admin():
    if not SECRET_KEY or len(SECRET_KEY) < 32: raise RuntimeError("JWT_SECRET_KEY is missing or too short. Add a random 32+ character secret to .env")
    if not ADMIN_PASSWORD:
        print("WARNING: ADMIN_PASSWORD is not configured. Set it in the root .env file before first login.")
        return
    db = next(get_db())
    try:
        admin = db.query(models.AdminUserModel).filter_by(username=ADMIN_USERNAME).first()
        if not admin:
            db.add(models.AdminUserModel(username=ADMIN_USERNAME,password_hash=make_password_hash(ADMIN_PASSWORD))); db.commit()
    finally: db.close()

@app.post("/api/auth/login")
def admin_login(request: Request, data: LoginInput, response: Response, db: Session = Depends(get_db)):
    enforce_login_limit(request)
    admin = db.query(models.AdminUserModel).filter_by(username=data.username,is_active=True).first()
    if not admin or not verify_password(data.password,admin.password_hash): raise HTTPException(status_code=401,detail="Invalid username or password")
    token = create_session_token(admin.username)
    response.set_cookie("admin_session",token,httponly=True,secure=COOKIE_SECURE,samesite="strict",max_age=ACCESS_TOKEN_MINUTES*60,path="/")
    return {"authenticated":True,"username":admin.username,"expires_in":ACCESS_TOKEN_MINUTES*60}
@app.post("/api/auth/logout")
def admin_logout(response: Response):
    response.delete_cookie("admin_session",path="/",httponly=True,secure=COOKIE_SECURE,samesite="strict")
    return {"authenticated":False}
@app.get("/api/auth/me")
def admin_me(admin=Depends(require_admin)): return {"authenticated":True,"username":admin.username}
@app.post("/api/auth/change-password")
def change_password(data: PasswordChangeInput,response: Response,admin=Depends(require_admin),db: Session=Depends(get_db)):
    if len(data.new_password)<12: raise HTTPException(status_code=422,detail="New password must be at least 12 characters")
    if not verify_password(data.current_password,admin.password_hash): raise HTTPException(status_code=400,detail="Current password is incorrect")
    admin.password_hash=make_password_hash(data.new_password); db.commit()
    response.delete_cookie("admin_session",path="/",httponly=True,secure=COOKIE_SECURE,samesite="strict")
    return {"message":"Password updated. Please sign in again."}

@app.post("/api/uploads/image",status_code=201)
async def upload_image(file: UploadFile=File(...),admin=Depends(require_admin)):
    if file.content_type not in {"image/jpeg","image/png","image/webp"}: raise HTTPException(status_code=415,detail="Only JPG, PNG and WEBP images are allowed")
    raw=await file.read(MAX_UPLOAD_BYTES+1)
    if len(raw)>MAX_UPLOAD_BYTES: raise HTTPException(status_code=413,detail="Image must be 5 MB or smaller")
    try:
        image=Image.open(BytesIO(raw)); image.verify(); image=Image.open(BytesIO(raw)); fmt=image.format
        if fmt not in ALLOWED_FORMATS: raise HTTPException(status_code=415,detail="Unsupported image format")
        image.thumbnail((2400,2400))
        name=f"{uuid.uuid4().hex}.{ALLOWED_FORMATS[fmt]}"
        if fmt=="JPEG" and image.mode not in ("RGB","L"): image=image.convert("RGB")
        image.save(UPLOAD_DIR/name,format=fmt,optimize=True)
    except (UnidentifiedImageError,OSError,ValueError): raise HTTPException(status_code=400,detail="Uploaded file is not a valid image")
    return {"url":f"/uploads/{name}"}

@app.get("/api/news")
def get_public_news(db: Session=Depends(get_db)):
    return db.query(models.NewsEventModel).filter_by(is_published=True).order_by(models.NewsEventModel.is_pinned.desc(),models.NewsEventModel.created_at.desc()).all()
@app.get("/api/admin/news")
def get_admin_news(db: Session=Depends(get_db),admin=Depends(require_admin)):
    return db.query(models.NewsEventModel).order_by(models.NewsEventModel.created_at.desc()).all()
@app.post("/api/news",status_code=201)
def create_news_event(data: NewsEventCreate,db: Session=Depends(get_db),admin=Depends(require_admin)):
    item=models.NewsEventModel(id=f"news-{uuid.uuid4().hex}",**data.model_dump()); db.add(item); db.commit(); db.refresh(item); return item
@app.put("/api/news/{item_id}")
def update_news_event(item_id: str,data: NewsEventUpdate,db: Session=Depends(get_db),admin=Depends(require_admin)):
    item=db.query(models.NewsEventModel).filter_by(id=item_id).first()
    if not item: raise HTTPException(status_code=404,detail="News item not found")
    for key,val in data.model_dump(exclude_unset=True).items(): setattr(item,key,val)
    db.commit(); db.refresh(item); return item
@app.delete("/api/news/{item_id}")
def delete_news_event(item_id: str,db: Session=Depends(get_db),admin=Depends(require_admin)):
    item=db.query(models.NewsEventModel).filter_by(id=item_id).first()
    if not item: raise HTTPException(status_code=404,detail="News item not found")
    db.delete(item); db.commit(); return {"message":"News item deleted","id":item_id}

@app.get("/api/applications")
def get_all_applications(db: Session=Depends(get_db),admin=Depends(require_admin)):
    return db.query(models.AdmissionApplicationModel).order_by(models.AdmissionApplicationModel.submitted_at.desc()).all()
@app.post("/api/applications",status_code=201)
def submit_admission_application(data: ApplicationCreate,db: Session=Depends(get_db)):
    ref=f"MCNAHS-{datetime.utcnow().year}-{uuid.uuid4().hex[:6].upper()}"
    record=models.AdmissionApplicationModel(id=f"app-{uuid.uuid4().hex}",ref_no=ref,**data.model_dump()); db.add(record); db.commit(); db.refresh(record); return record
@app.delete("/api/applications/{app_id}")
def delete_application(app_id: str,db: Session=Depends(get_db),admin=Depends(require_admin)):
    record=db.query(models.AdmissionApplicationModel).filter_by(id=app_id).first()
    if not record: raise HTTPException(status_code=404,detail="Application not found")
    db.delete(record); db.commit(); return {"message":"Application deleted"}
@app.put("/api/applications/{app_id}/status")
def update_application_status(app_id: str,data: ApplicationStatusUpdate,db: Session=Depends(get_db),admin=Depends(require_admin)):
    record=db.query(models.AdmissionApplicationModel).filter_by(id=app_id).first()
    if not record: raise HTTPException(status_code=404,detail="Application not found")
    record.status=data.status
    if data.notes is not None: record.notes=data.notes
    db.commit(); db.refresh(record); return record

@app.get("/api/faculty")
def get_all_faculty(db: Session=Depends(get_db)): return db.query(models.FacultyMemberModel).all()
@app.post("/api/faculty",status_code=201)
def create_faculty_member(data: FacultyCreate,db: Session=Depends(get_db),admin=Depends(require_admin)):
    item=models.FacultyMemberModel(id=f"fac-{uuid.uuid4().hex}",**data.model_dump()); db.add(item); db.commit(); db.refresh(item); return item
@app.delete("/api/faculty/{fac_id}")
def delete_faculty_member(fac_id: str,db: Session=Depends(get_db),admin=Depends(require_admin)):
    item=db.query(models.FacultyMemberModel).filter_by(id=fac_id).first()
    if not item: raise HTTPException(status_code=404,detail="Faculty member not found")
    db.delete(item); db.commit(); return {"message":"Faculty member deleted"}

@app.get("/api/popup-ad")
def get_popup_ad(db: Session=Depends(get_db)):
    ad=db.query(models.PopupAdModel).first()
    if not ad: ad=models.PopupAdModel(); db.add(ad); db.commit(); db.refresh(ad)
    return ad
@app.put("/api/popup-ad")
def update_popup_ad(data: PopupAdUpdate,db: Session=Depends(get_db),admin=Depends(require_admin)):
    ad=db.query(models.PopupAdModel).first()
    if not ad: ad=models.PopupAdModel(**data.model_dump()); db.add(ad)
    else:
        for key,value in data.model_dump().items(): setattr(ad,key,value)
    db.commit(); db.refresh(ad); return ad
@app.get("/api/college-info")
def get_college_info(db: Session=Depends(get_db)):
    info=db.query(models.CollegeInfoModel).first()
    if not info: info=models.CollegeInfoModel(); db.add(info); db.commit(); db.refresh(info)
    return info
@app.put("/api/college-info")
def update_college_info(data: CollegeInfoUpdate,db: Session=Depends(get_db),admin=Depends(require_admin)):
    info=db.query(models.CollegeInfoModel).first()
    if not info: info=models.CollegeInfoModel(**data.model_dump()); db.add(info)
    else:
        for key,value in data.model_dump().items(): setattr(info,key,value)
    db.commit(); db.refresh(info); return info
@app.get("/api/health")
def health_check(): return {"status":"online","institution":"Moomal College of Nursing & Allied Health Sciences"}
if __name__=="__main__":
    import uvicorn
    uvicorn.run("main:app",host="127.0.0.1",port=8000,reload=True)
