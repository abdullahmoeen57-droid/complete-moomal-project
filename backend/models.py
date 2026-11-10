from sqlalchemy import Column, String, Integer, Boolean, Text, DateTime
from datetime import datetime
from database import Base

class NewsEventModel(Base):
    __tablename__ = "news_events"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    category = Column(String, nullable=False)
    date = Column(String, nullable=False)
    summary = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    image = Column(String, nullable=True)
    is_pinned = Column(Boolean, default=False)
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class AdmissionApplicationModel(Base):
    __tablename__ = "admission_applications"

    id = Column(String, primary_key=True, index=True)
    ref_no = Column(String, unique=True, index=True)
    applicant_name = Column(String, nullable=False)
    father_name = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    dob = Column(String, nullable=False)
    cnic = Column(String, nullable=False, index=True)
    phone = Column(String, nullable=False)
    whatsapp = Column(String, nullable=False)
    email = Column(String, nullable=True)
    domicile_district = Column(String, nullable=False)
    permanent_address = Column(Text, nullable=False)
    matric_marks = Column(Integer, nullable=False)
    matric_total = Column(Integer, default=1100)
    matric_year = Column(String, nullable=True)
    inter_marks = Column(Integer, nullable=False)
    inter_total = Column(Integer, default=1100)
    inter_year = Column(String, nullable=True)
    inter_board = Column(String, nullable=False)
    guardian_phone = Column(String, nullable=True)
    status = Column(String, default="Pending")
    submitted_at = Column(String, default=lambda: datetime.utcnow().strftime("%Y-%m-%d %H:%M"))
    notes = Column(Text, nullable=True)

class FacultyMemberModel(Base):
    __tablename__ = "faculty_members"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    designation = Column(String, nullable=False)
    department = Column(String, default="Faculty of Nursing")
    category = Column(String, default="nursing")
    qualification = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    photo_url = Column(String, nullable=True)

class PopupAdModel(Base):
    __tablename__ = "popup_ad"

    id = Column(Integer, primary_key=True, default=1)
    enabled = Column(Boolean, default=True)
    badge = Column(String, default="Admissions Open 2025-2026")
    title = Column(String, default="Bachelor of Science in Nursing (BSN)")
    subtitle = Column(String, default="4-Year Degree Program • Affiliated with LUMHS Jamshoro")
    description = Column(Text, default="Applications are now invited for the 4-Year BSN Program...")
    button_text = Column(String, default="Apply Online Now")
    button_link = Column(String, default="#admissions")
    image_url = Column(String, nullable=True)

class CollegeInfoModel(Base):
    __tablename__ = "college_info"

    id = Column(Integer, primary_key=True, default=1)
    name = Column(String, default="Moomal College of Nursing & Allied Health Sciences")
    tagline = Column(String, default="Empowering Next-Generation Healthcare Leaders")
    short_name = Column(String, default="MCNAHS Hyderabad")
    parent_org = Column(String, default="Moomal Group of Colleges / Moomal Education (Pvt) Ltd")
    address = Column(String, default="B-6, Block A, Latifabad, Unit #8, Auto Bhan Road")
    city = Column(String, default="Hyderabad, Sindh 46000, Pakistan")
    phone_primary = Column(String, default="03033266736")
    phone_secondary = Column(String, default="03330248438")
    landline = Column(String, default="0226119144")
    admission_phone1 = Column(String, default="+92 3152001297")
    admission_phone2 = Column(String, default="+92 3132355799")
    email = Column(String, default="Moomal.edu@hotmail.com")
    website = Column(String, default="www.moomal.edu.pk")
    facebook_url = Column(String, default="https://www.facebook.com/moomalgroupofcolleges/")
    instagram_url = Column(String, default="https://www.instagram.com/moomalgroupofcolleges/?hl=en")
    whatsapp_number = Column(String, default="+923033266736")

class AdminUserModel(Base):
    __tablename__ = "admin_users"
    id = Column(Integer, primary_key=True, default=1)
    username = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
