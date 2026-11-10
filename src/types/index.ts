export interface CollegeInfo {
  name: string;
  tagline: string;
  shortName: string;
  parentOrg: string;
  recognizedBy: string;
  affiliatedWith: string;
  approvedBy: string;
  address: string;
  city: string;
  phonePrimary: string;
  phoneSecondary: string;
  landline: string;
  admissionPhone1: string;
  admissionPhone2: string;
  email: string;
  website: string;
  facebookUrl: string;
  instagramUrl: string;
  whatsappNumber: string;
}

export interface PopupAd {
  enabled: boolean;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl?: string;
  showDismissForToday: boolean;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  category: 'leadership' | 'nursing' | 'basic_sciences' | 'humanities';
  qualification?: string;
  experience?: string;
  bio?: string;
  photoUrl?: string;
}

export interface NewsEvent {
  id: string;
  title: string;
  category?: string;
  date: string;
  summary: string;
  content: string;
  image?: string;
  isPinned?: boolean;
  isPublished: boolean;
}

export interface AdmissionApplication {
  id: string;
  refNo: string;
  applicantName: string;
  fatherName: string;
  gender: 'Female' | 'Male';
  dob: string;
  cnic: string;
  phone: string;
  whatsapp: string;
  email: string;
  domicileDistrict: string;
  permanentAddress: string;
  matricMarks: number;
  matricTotal: number;
  matricYear: string;
  interMarks: number;
  interTotal: number;
  interYear: string;
  interBoard: string;
  guardianPhone: string;
  status: 'Pending' | 'Under Review' | 'Interview Scheduled' | 'Accepted' | 'Rejected';
  submittedAt: string;
  notes?: string;
}

export interface AdmissionSettings {
  cycleTitle: string;
  sessionYear: string;
  isGoogleFormEnabled: boolean;
  googleFormUrl: string;
  admissionStatus: 'Open' | 'Closing Soon' | 'Closed';
  lastDateToApply: string;
  entryTestDate: string;
  eligibilityNotes: string;
  admissionFee: number;
  annualTuitionFee: number;
  universityExamFeeNote: string;
}

export interface AdminUser {
  isAuthenticated: boolean;
  role: 'superadmin' | 'admin';
}
