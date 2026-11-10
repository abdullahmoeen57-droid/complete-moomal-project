import { CollegeInfo, PopupAd, FacultyMember, NewsEvent, AdmissionSettings, AdmissionApplication } from '../types';

export const initialCollegeInfo: CollegeInfo = {
  name: "Moomal College of Nursing & Allied Health Sciences",
  tagline: "Empowering Next-Generation Healthcare Leaders & Compassionate Bedside Nurses",
  shortName: "MCNAHS Hyderabad",
  parentOrg: "Moomal Group of Colleges / Moomal Education (Pvt) Ltd",
  recognizedBy: "Pakistan Nursing and Midwifery Council (PNMC)",
  affiliatedWith: "Liaquat University of Medical and Health Sciences (LUMHS), Jamshoro",
  approvedBy: "Health Department, Government of Sindh",
  address: "B-6, Block A, Latifabad, Unit #8, Auto Bhan Road",
  city: "Hyderabad, Sindh 46000, Pakistan",
  phonePrimary: "03033266736",
  phoneSecondary: "03330248438",
  landline: "0226119144",
  admissionPhone1: "+92 3152001297",
  admissionPhone2: "+92 3132355799",
  email: "Moomal.edu@hotmail.com",
  website: "www.moomal.edu.pk",
  facebookUrl: "https://www.facebook.com/moomalgroupofcolleges/",
  instagramUrl: "https://www.instagram.com/moomalgroupofcolleges/?hl=en",
  whatsappNumber: "+923033266736",
};

export const initialPopupAd: PopupAd = {
  enabled: true,
  badge: "Admissions Open 2026-2027",
  title: "Bachelor of Science in Nursing (BSN)",
  subtitle: "4-Year Degree Program • Affiliated with LUMHS Jamshoro",
  description: "Applications are now invited for the 4-Year BSN Program. Recognized by Pakistan Nursing Council (PNC) and approved by Health Department Sindh. Limited seats available on merit.",
  buttonText: "Apply Online Now",
  buttonLink: "#admissions",
  imageUrl: "/public/assets/aistudio/Moomal_Groups_Of_Colleges_deda5503.jpeg",
  showDismissForToday: true,
};

export const initialAdmissionSettings: AdmissionSettings = {
  cycleTitle: "BSN Admissions 2026-2027",
  sessionYear: "2026 - 2027",
  isGoogleFormEnabled: false,
  googleFormUrl: "https://docs.google.com/forms",
  admissionStatus: "Open",
  lastDateToApply: "December 30, 2025",
  entryTestDate: "January 15, 2026",
  eligibilityNotes: "F.Sc (Pre-Medical) with minimum 50% marks (Physics, Chemistry, Biology) from any recognized Board of Intermediate and Secondary Education. Age limit: 14 to 35 years. Both Male and Female candidates eligible.",
  admissionFee: 50000,
  annualTuitionFee: 170000,
  universityExamFeeNote: "University Examination, Enrollment / Registration with PNMC to be paid separately as per actual university schedules.",
};

export const leadershipData = {
  chairman: {
    name: "Dr. Ghulam Mustafa Butt",
    title: "Chairman and Managing Director",
    org: "Moomal Education Private Limited • Moomal Group of Colleges",
    photo: "/public/assets/aistudio/Dr_Ghulam_Mustufa_Chairman_27b5c6cf.jpeg",
    message: "Any institution can be proud of its students only if they are acquiring quality education. When it is related to health science, it becomes even more significant. That is the whole philosophy behind the establishment of Moomal college of nursing and Allied Health Sciences. It has been our motto to impart quality education and by the grace of Allah the college is trying to achieve its goal perfectly. I from the depth of my heart, congratulate the team for this endeavor. I am fully confident that the faculty comprising of highly qualified, most experienced and dedicated/committed nursing professionals and doctors, will deliver and share their qualities with incoming students and future nurses. In the end, I must say that it is not less than a miracle to make it possible within a very short period of time.",
  },
  ceo: {
    name: "Mr. Altaf Hussain Butt",
    title: "Chief Executive Officer & Chief Financial Officer",
    org: "Moomal Education Private Limited • Moomal Group of Colleges",
    photo: "/public/assets/aistudio/Altaf_Hussain_Butt_CEO_3a350340.jpeg",
    message: "At Moomal Group of Colleges, our vision is grounded in student-first educational infrastructure and moral integrity. We have equipped Moomal College of Nursing with world-class learning facilities, clinical simulation equipment, and strong university affiliations with LUMHS to guarantee our nursing graduates rank amongst the finest medical professionals globally.",
  },
  principal: {
    name: "Ms. Nazia",
    title: "Principal & Assistant Professor",
    org: "Moomal College of Nursing & Allied Health Sciences Hyderabad",
    photo: "/public/assets/aistudio/Ms_Nazia_Principle_d237453b.jpeg",
    message: "It is a great source of pride for me to introduce new programmers the BSCN at Moomal College Of Nursing & Allied Health Sciences Hyderabad. Considering the shortage of qualified nursing staff in Pakistan, an extreme need exists to establish programs that offer high standards of education and professionalism. By starting these programs, we intend to contribute to strengthening the healthcare system in Pakistan. We Aim to provide knowledge and skills from bedside nursing care to nursing educators, researchers and policy makers. We are determined to reach international standards in the field of nursing education in Pakistan and have chosen well qualified and experienced faculty members as part of our team. I hope that in the years ahead, Insha'Allah, we will be able to make major contribution in improving the Healthcare system in Sindh led by our qualified, motivated and professionally sound graduates.",
  },
  adminOffice: [
    { name: "Dr. Maqsood Ahmed Hingoro", role: "Director Administration", department: "Administration Directorate" },
    { name: "Ashfaq Hussain Butt", role: "Deputy Director Administrator", department: "Operations & Admin" },
    { name: "Khurram Shahzad Bhatti", role: "Administrator", department: "General Administration" },
    { name: "M. Niaz", role: "Admin / Assistant", department: "Records & Support" },
    { name: "Dr. Muhammad Mushtaque Khan", role: "Director Academic & Executive Director", department: "Academic Affairs" },
  ],
  executiveCouncil: [
    "Dr. Permanand", "Dr. Ali Maqbool", "Dr. Qamar un Nisa", "Dr. Rana Muhammad Ashfaq",
    "Dr. Vikram Paul", "Dr. Raj Kumar Sufi", "Prof. Muhammad Laique Thebo", "Dr. Habib Memon",
    "Mr. Aamir Shakoor", "Mr. Waseem Rajput", "Mr. Muhammad Waseem Khan", "Mr. Tariq Aziz",
    "Mr. Faiz Siyal", "Mr. Muhammad Iqbal Memon", "Mr. Jawwad Farooq", "Mr. Abdul Aziz"
  ]
};

export const initialFaculty: FacultyMember[] = [
  {
    id: "fac-1",
    name: "Ms. Nazia",
    designation: "Principal & Assistant Professor",
    department: "Faculty of Nursing",
    category: "leadership",
    qualification: "MSN / BSN, Registered Nurse (PNC)",
    bio: "Visionary academic leader with extensive experience in nursing education, clinical curriculum design, and healthcare institutional administration.",
    photoUrl: "/public/assets/aistudio/Ms_Nazia_Principle_d237453b.jpeg",
  },
  {
    id: "fac-2",
    name: "Paras Ali Pitafi",
    designation: "Vice Principal & Coordinator",
    department: "Faculty of Nursing",
    category: "nursing",
    qualification: "BSN, Certified Nursing Specialist",
    bio: "Senior nursing administrator overseeing academic coordination, clinical rotations, and student mentorship programs.",
  },
  {
    id: "fac-3",
    name: "Mr. Abdul Baqi",
    designation: "Nursing Instructor",
    department: "Faculty of Nursing",
    category: "nursing",
    qualification: "BSN, Clinical Instructor Certified",
    bio: "Dedicated instructor specializing in fundamentals of nursing, bedside patient assessment, and critical care procedures.",
  },
  {
    id: "fac-4",
    name: "Mr. Vijay Kumar",
    designation: "Nursing Instructor",
    department: "Faculty of Nursing",
    category: "nursing",
    qualification: "BSN, Advanced Life Support Certified",
    bio: "Specializes in adult health nursing, clinical bedside instruction, and patient safety management.",
  },
  {
    id: "fac-5",
    name: "Mr. Sohail",
    designation: "Nursing Instructor",
    department: "Faculty of Nursing",
    category: "nursing",
    qualification: "BSN, Community Health Specialist",
    bio: "Leads clinical skills demonstration, community health nursing, and preventive healthcare field training.",
  },
  {
    id: "fac-6",
    name: "Ms. Muqadas",
    designation: "Nursing Instructor",
    department: "Faculty of Nursing",
    category: "nursing",
    qualification: "BSN, Maternal & Child Health Certified",
    bio: "Passionate about nursing ethics, pediatric health nursing, and simulation-based clinical skills training.",
  },
  {
    id: "fac-7",
    name: "Mr. Ashfaq",
    designation: "Nursing Instructor",
    department: "Faculty of Nursing",
    category: "nursing",
    qualification: "BSN, Emergency & Trauma Certified",
    bio: "Focuses on medical-surgical nursing, sterile technique enforcement, and emergency ward rotation guidance.",
  },
  {
    id: "fac-8",
    name: "Ms. Zeenat",
    designation: "Assistant Professor (English)",
    department: "Basic Medical Sciences & Humanities",
    category: "humanities",
    qualification: "M.Phil in English Linguistics",
    bio: "Conducts functional English, technical communication, and medical professional writing for healthcare contexts.",
  },
  {
    id: "fac-9",
    name: "Mr. Uzair Nazim",
    designation: "Sr. Lecturer (IT)",
    department: "Information Technology & Computer Sciences",
    category: "humanities",
    qualification: "MS in Computer Science",
    bio: "Instructs students on healthcare informatics, medical computer applications, electronic health records, and digital research tools.",
  },
  {
    id: "fac-10",
    name: "Dr. Ashok Kumar",
    designation: "Assistant Professor (Pharmacology)",
    department: "Basic Medical Sciences",
    category: "basic_sciences",
    qualification: "Pharm-D, M.Phil Pharmacology",
    bio: "Expert educator in clinical pharmacology, dosage calculations, drug interactions, and safe medication administration.",
  },
  {
    id: "fac-11",
    name: "Mr. Osama Zafar Siddiqui",
    designation: "Sr. Lecturer (Islamiyat)",
    department: "Humanities & Islamic Studies",
    category: "humanities",
    qualification: "M.A. Islamic Studies",
    bio: "Instills healthcare ethics, Islamic bioethics, compassion, and professional moral codes in nursing practice.",
  },
];

export const initialNewsEvents: NewsEvent[] = [];

export const sampleApplications: AdmissionApplication[] = [
  {
    id: "app-101",
    refNo: "MCNAHS-2026-0042",
    applicantName: "Ayesha Noor",
    fatherName: "Muhammad Farooq",
    gender: "Female",
    dob: "2006-04-12",
    cnic: "41303-1234567-8",
    phone: "03001234567",
    whatsapp: "03001234567",
    email: "ayesha.noor@example.com",
    domicileDistrict: "Hyderabad",
    permanentAddress: "House 14, Phase 1, Qasimabad, Hyderabad",
    matricMarks: 940,
    matricTotal: 1100,
    matricYear: "2023",
    interMarks: 875,
    interTotal: 1100,
    interYear: "2025",
    interBoard: "BISE Hyderabad",
    guardianPhone: "03331234567",
    status: "Interview Scheduled",
    submittedAt: "2025-11-04 11:20",
    notes: "Top merit in BISE Hyderabad. Pre-Medical 79.5%. Document verification scheduled.",
  },
  {
    id: "app-102",
    refNo: "MCNAHS-2026-0089",
    applicantName: "Bilal Ahmed Memon",
    fatherName: "Abdul Rauf Memon",
    gender: "Male",
    dob: "2005-09-18",
    cnic: "41304-9876543-1",
    phone: "03129876543",
    whatsapp: "03129876543",
    email: "bilal.memon@example.com",
    domicileDistrict: "Jamshoro",
    permanentAddress: "Main Bazaar, Kotri, Jamshoro",
    matricMarks: 890,
    matricTotal: 1100,
    matricYear: "2022",
    interMarks: 760,
    interTotal: 1100,
    interYear: "2024",
    interBoard: "BISE Mirpurkhas",
    guardianPhone: "03459876543",
    status: "Under Review",
    submittedAt: "2025-11-06 14:45",
    notes: "F.Sc Pre-Medical 69.1%. Eligible for entrance test.",
  }
];

export const bsnCurriculum = [
  {
    year: "Year I",
    semesters: [
      {
        semester: "Semester I",
        totalCredits: 16.0,
        courses: [
          { code: "NUR-101", title: "Fundamental of Nursing-I", theory: 2.0, clinical: 0.0, lab: 2.0, total: 4.0 },
          { code: "MIC-102", title: "Microbiology", theory: 2.5, clinical: 0.0, lab: 0.5, total: 3.0 },
          { code: "ANA-103", title: "Anatomy and Physiology-I", theory: 3.0, clinical: 0.0, lab: 0.0, total: 3.0 },
          { code: "BIO-104", title: "Biochemistry for Nurses", theory: 2.0, clinical: 0.0, lab: 1.0, total: 3.0 },
          { code: "ENG-105", title: "English-I (Reading & Writing)", theory: 2.0, clinical: 0.0, lab: 0.0, total: 2.0 },
          { code: "COM-106", title: "Computer Skills & Informatics", theory: 0.0, clinical: 0.0, lab: 1.0, total: 1.0 },
        ]
      },
      {
        semester: "Semester II",
        totalCredits: 17.0,
        courses: [
          { code: "NUR-111", title: "Fundamental of Nursing-II", theory: 2.0, clinical: 1.0, lab: 1.0, total: 4.0 },
          { code: "ANA-112", title: "Anatomy and Physiology-II", theory: 3.0, clinical: 0.0, lab: 0.0, total: 3.0 },
          { code: "CHN-113", title: "Community Health Nursing-I", theory: 2.0, clinical: 1.0, lab: 0.0, total: 3.0 },
          { code: "NUT-114", title: "Applied Nutrition", theory: 1.0, clinical: 0.0, lab: 0.0, total: 1.0 },
          { code: "ENG-115", title: "English-II (Communication)", theory: 2.0, clinical: 0.0, lab: 0.0, total: 2.0 },
          { code: "ISL-116", title: "Islamiat / Ethics", theory: 2.0, clinical: 0.0, lab: 0.0, total: 2.0 },
          { code: "PAK-117", title: "Pakistan Studies", theory: 2.0, clinical: 0.0, lab: 0.0, total: 2.0 },
        ]
      }
    ]
  },
  {
    year: "Year II",
    semesters: [
      {
        semester: "Semester III",
        totalCredits: 17.0,
        courses: [
          { code: "AHN-201", title: "Adult Health Nursing-I", theory: 4.0, clinical: 3.0, lab: 1.0, total: 8.0 },
          { code: "PAT-202", title: "Pathophysiology-I", theory: 1.75, clinical: 0.0, lab: 0.25, total: 2.0 },
          { code: "HAS-203", title: "Health Assessment-I", theory: 1.0, clinical: 0.0, lab: 1.0, total: 2.0 },
          { code: "PHM-204", title: "Pharmacology-I", theory: 2.0, clinical: 0.0, lab: 0.0, total: 2.0 },
          { code: "MTH-205", title: "Mathematics for Healthcare", theory: 1.0, clinical: 0.0, lab: 0.0, total: 1.0 },
          { code: "ENG-206", title: "English-III (Professional)", theory: 2.0, clinical: 0.0, lab: 0.0, total: 2.0 },
        ]
      },
      {
        semester: "Semester IV",
        totalCredits: 20.0,
        courses: [
          { code: "AHN-211", title: "Adult Health Nursing-II", theory: 4.0, clinical: 3.0, lab: 1.0, total: 8.0 },
          { code: "PAT-212", title: "Pathophysiology-II", theory: 2.75, clinical: 0.0, lab: 0.25, total: 3.0 },
          { code: "HAS-213", title: "Health Assessment-II", theory: 1.0, clinical: 0.0, lab: 1.0, total: 2.0 },
          { code: "PSY-214", title: "Developmental Psychology", theory: 2.0, clinical: 0.0, lab: 0.0, total: 2.0 },
          { code: "PHM-215", title: "Pharmacology-II", theory: 2.0, clinical: 0.0, lab: 0.0, total: 2.0 },
          { code: "ENG-216", title: "English-IV", theory: 2.0, clinical: 0.0, lab: 0.0, total: 2.0 },
          { code: "ETH-217", title: "Nursing Ethics", theory: 1.0, clinical: 0.0, lab: 0.0, total: 1.0 },
        ]
      }
    ]
  },
  {
    year: "Year III",
    semesters: [
      {
        semester: "Semester V",
        totalCredits: 18.0,
        courses: [
          { code: "PED-301", title: "Pediatrics Health Nursing", theory: 3.0, clinical: 3.0, lab: 1.0, total: 7.0 },
          { code: "CHN-302", title: "Community Health Nursing-II", theory: 2.5, clinical: 2.5, lab: 1.0, total: 6.0 },
          { code: "TLP-303", title: "Teaching/Learning: Principles & Practices", theory: 3.0, clinical: 0.0, lab: 0.0, total: 3.0 },
          { code: "ENG-304", title: "English-V (Scholarly Writing)", theory: 2.0, clinical: 0.0, lab: 0.0, total: 2.0 },
        ]
      },
      {
        semester: "Semester VI",
        totalCredits: 18.0,
        courses: [
          { code: "MHN-311", title: "Mental Health Nursing", theory: 3.0, clinical: 3.0, lab: 0.0, total: 6.0 },
          { code: "BST-312", title: "Introduction to Biostatistics", theory: 2.5, clinical: 0.0, lab: 0.5, total: 3.0 },
          { code: "BEH-313", title: "Behavioural Psychology", theory: 3.0, clinical: 0.0, lab: 0.0, total: 3.0 },
          { code: "EPI-314", title: "Epidemiology", theory: 2.0, clinical: 0.0, lab: 0.0, total: 2.0 },
          { code: "ENG-315", title: "English-VI (Academic Writing)", theory: 2.0, clinical: 0.0, lab: 0.0, total: 2.0 },
          { code: "CUL-316", title: "Culture, Health and Society", theory: 2.0, clinical: 0.0, lab: 0.0, total: 2.0 },
        ]
      }
    ]
  },
  {
    year: "Year IV",
    semesters: [
      {
        semester: "Semester VII",
        totalCredits: 17.0,
        courses: [
          { code: "CCN-401", title: "Critical Care Nursing", theory: 2.5, clinical: 4.0, lab: 0.5, total: 7.0 },
          { code: "THE-402", title: "Introduction to Nursing Theories", theory: 2.0, clinical: 0.0, lab: 0.0, total: 2.0 },
          { code: "LMN-403", title: "Leadership & Management in Nursing", theory: 2.0, clinical: 1.0, lab: 0.0, total: 3.0 },
          { code: "RES-404", title: "Nursing Research Methodology", theory: 3.0, clinical: 0.0, lab: 0.0, total: 3.0 },
          { code: "ENG-405", title: "English-VII (Professional Writing)", theory: 2.0, clinical: 0.0, lab: 0.0, total: 2.0 },
        ]
      },
      {
        semester: "Semester VIII",
        totalCredits: 12.0,
        courses: [
          { code: "CHN-411", title: "Community Health Nursing-III", theory: 2.0, clinical: 3.0, lab: 0.0, total: 5.0 },
          { code: "SEM-412", title: "Nursing Seminar / Role Transition", theory: 2.0, clinical: 0.0, lab: 0.0, total: 2.0 },
          { code: "PRA-413", title: "Senior Clinical Practicum & Internship", theory: 0.0, clinical: 4.0, lab: 1.0, total: 5.0 },
        ]
      }
    ]
  }
];

export const facilitiesData = [
  {
    id: "fac-library",
    title: "Medical & Health Sciences Library",
    shortDesc: "Comprehensive collection of nursing journals, medical reference volumes, and quiet study workstations.",
    image: "/src/assets/images/college_library_hall_1794147850116.jpg",
    details: [
      "Extensive nursing text archives affiliated with LUMHS syllabus",
      "Digital research terminals and high-speed Wi-Fi access",
      "Quiet individual reading carrels and collaborative study rooms",
      "Subscriptions to leading national & international medical journals"
    ]
  },
  {
    id: "fac-cafeteria",
    title: "Student Cafeteria & Dining Lounge",
    shortDesc: "Hygienic, comfortable dining hall and social hub serving fresh refreshments, tea, and balanced meals.",
    image: "/src/assets/images/campus_student_cafeteria_1794147849871.jpg",
    details: [
      "Strict food safety and hygiene monitoring protocols",
      "Warm, modern seating accommodating clinical cohorts and faculty",
      "Affordable pricing designed for undergraduate students",
      "Separated clean dining areas with all-day refreshment service"
    ]
  },
  {
    id: "fac-clinical",
    title: "Accredited Clinical Training Rotations",
    shortDesc: "Hands-on clinical bedside rotations at Civi Hospital and Shah Bhittai Govt. Hospital.",
    image: "/src/assets/images/nursing_skills_lab_1794147849707.jpg",
    details: [
      "Clinical affiliation with Civi Hospital",
      "Public health & emergency exposure at Shah Bhittai Govt. Hospital Latifabad",
      "Supervised bedside clinical guidance by senior nursing preceptors"
    ]
  }
];
