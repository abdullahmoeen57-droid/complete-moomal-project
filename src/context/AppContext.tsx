import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CollegeInfo,
  PopupAd,
  FacultyMember,
  NewsEvent,
  AdmissionApplication,
  AdmissionSettings,
} from '../types';
import { apiRequest, toCamel, toSnake } from '../lib/api';
import {
  initialCollegeInfo,
  initialPopupAd,
  initialAdmissionSettings,
  initialFaculty,
  initialNewsEvents,
} from '../data/initialData';

interface AppContextType {
  // College Information
  collegeInfo: CollegeInfo;
  updateCollegeInfo: (info: Partial<CollegeInfo>) => void;

  // Popup Advertisement
  popupAd: PopupAd;
  updatePopupAd: (ad: Partial<PopupAd>) => void;
  isPopupDismissed: boolean;
  dismissPopup: (forToday?: boolean) => void;
  openPopup: () => void;

  // Faculty Management
  faculty: FacultyMember[];
  addFaculty: (member: Omit<FacultyMember, 'id'>) => Promise<void>;
  updateFaculty: (id: string, member: Partial<FacultyMember>) => void;
  deleteFaculty: (id: string) => Promise<void>;

  // News & Events
  newsEvents: NewsEvent[];
  addNewsEvent: (news: Omit<NewsEvent, 'id'>) => Promise<void>;
  updateNewsEvent: (id: string, news: Partial<NewsEvent>) => Promise<void>;
  deleteNewsEvent: (id: string) => Promise<void>;

  // Admission Settings & Google Form
  admissionSettings: AdmissionSettings;
  updateAdmissionSettings: (settings: Partial<AdmissionSettings>) => void;

  // Applications
  applications: AdmissionApplication[];
  submitApplication: (appData: Omit<AdmissionApplication, 'id' | 'refNo' | 'submittedAt' | 'status'>) => Promise<AdmissionApplication>;
  updateApplicationStatus: (id: string, status: AdmissionApplication['status'], notes?: string) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;

  // Admin Auth & Security
  isAdminLoggedIn: boolean;
  adminLogin: (username: string, password: string) => Promise<boolean>;
  adminLogout: () => Promise<void>;
  changeAdminPassword: (oldPass: string, newPass: string) => Promise<boolean>;
  savePopupAd: () => Promise<void>;

  // Navigation State
  currentTab: string;
  setCurrentTab: (tab: string) => void;

  // Reset Data helper
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  COLLEGE_INFO: 'moomal_college_info_v1',
  POPUP_AD: 'moomal_popup_ad_v1',
  POPUP_DISMISSED: 'moomal_popup_dismissed_v1',
  ADMISSION_SETTINGS: 'moomal_admission_settings_v1',
  FACULTY: 'moomal_faculty_v1',
  NEWS_EVENTS: 'moomal_news_events_v2',
  APPLICATIONS: 'moomal_applications_v1',
};



export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // College Info
  const [collegeInfo, setCollegeInfo] = useState<CollegeInfo>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COLLEGE_INFO);
    return saved ? JSON.parse(saved) : initialCollegeInfo;
  });

  // Popup Ad
  const [popupAd, setPopupAd] = useState<PopupAd>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.POPUP_AD);
    return saved ? JSON.parse(saved) : initialPopupAd;
  });

  const [isPopupDismissed, setIsPopupDismissed] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.POPUP_DISMISSED);
    if (!saved) return false;
    try {
      const data = JSON.parse(saved);
      if (data.expiry && Date.now() < data.expiry) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  });

  // Admission Settings
  const [admissionSettings, setAdmissionSettings] = useState<AdmissionSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ADMISSION_SETTINGS);
    return saved ? JSON.parse(saved) : initialAdmissionSettings;
  });

  // Faculty
  const [faculty, setFaculty] = useState<FacultyMember[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FACULTY);
    return saved ? JSON.parse(saved) : initialFaculty;
  });

  // News & Events
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NEWS_EVENTS);
    return saved ? JSON.parse(saved) : initialNewsEvents;
  });

  // Applications
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);

  // Admin Security
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Navigation tab state (initialized from URL hash if available)
  const [currentTab, setCurrentTabState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      const valid = ['home', 'about', 'leadership', 'program', 'faculty', 'facilities', 'news', 'prospectus', 'admissions', 'contact'];
      if (valid.includes(hash)) {
        return hash;
      }
    }
    return 'home';
  });

  const setCurrentTab = (tab: string) => {
    setCurrentTabState(tab);
    if (typeof window !== 'undefined' && window.location.hash !== `#${tab}`) {
      window.location.hash = tab;
    }
  };

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COLLEGE_INFO, JSON.stringify(collegeInfo));
  }, [collegeInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.POPUP_AD, JSON.stringify(popupAd));
  }, [popupAd]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMISSION_SETTINGS, JSON.stringify(admissionSettings));
  }, [admissionSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FACULTY, JSON.stringify(faculty));
  }, [faculty]);



  // Server-backed content and records.
  useEffect(() => {
    apiRequest<any[]>('/api/news').then(rows => setNewsEvents(toCamel(rows))).catch(error => console.error('Could not load news:', error));
    apiRequest<any>('/api/popup-ad').then(row => setPopupAd(prev => ({ ...prev, ...toCamel(row) }))).catch(error => console.error('Could not load popup:', error));
    apiRequest<any[]>('/api/faculty').then(rows => setFaculty(toCamel(rows))).catch(error => console.error('Could not load faculty:', error));
    apiRequest('/api/auth/me').then(() => setIsAdminLoggedIn(true)).catch(() => setIsAdminLoggedIn(false));
  }, []);
  useEffect(() => {
    if (!isAdminLoggedIn) return;
    Promise.all([apiRequest<any[]>('/api/admin/news'), apiRequest<any[]>('/api/applications')])
      .then(([news, apps]) => { setNewsEvents(toCamel(news)); setApplications(toCamel(apps)); })
      .catch(error => console.error('Could not load admin records:', error));
  }, [isAdminLoggedIn]);

  // Handlers
  const updateCollegeInfo = (info: Partial<CollegeInfo>) => {
    setCollegeInfo(prev => ({ ...prev, ...info }));
  };

  const updatePopupAd = (ad: Partial<PopupAd>) => { setPopupAd(prev => ({ ...prev, ...ad })); };
  const savePopupAd = async () => {
    const saved = await apiRequest<any>('/api/popup-ad', { method: 'PUT', body: JSON.stringify(toSnake(popupAd)) });
    setPopupAd(prev => ({ ...prev, ...toCamel(saved) }));
  };

  const dismissPopup = (forToday = false) => {
    setIsPopupDismissed(true);
    if (forToday) {
      const tomorrow = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEYS.POPUP_DISMISSED, JSON.stringify({ expiry: tomorrow }));
    }
  };

  const openPopup = () => {
    setIsPopupDismissed(false);
  };

  const addFaculty = async (member: Omit<FacultyMember, 'id'>) => {
    const saved = await apiRequest<any>('/api/faculty', { method: 'POST', body: JSON.stringify(toSnake(member)) });
    setFaculty(prev => [toCamel<FacultyMember>(saved), ...prev]);
  };

  const updateFaculty = (id: string, updated: Partial<FacultyMember>) => {
    setFaculty(prev => prev.map(m => (m.id === id ? { ...m, ...updated } : m)));
  };

  const deleteFaculty = async (id: string) => { await apiRequest(`/api/faculty/${id}`, { method: 'DELETE' }); setFaculty(prev => prev.filter(m => m.id !== id)); };

  const addNewsEvent = async (news: Omit<NewsEvent, 'id'>) => {
    const saved = await apiRequest<any>('/api/news', { method: 'POST', body: JSON.stringify(toSnake(news)) });
    setNewsEvents(prev => [toCamel<NewsEvent>(saved), ...prev]);
  };

  const updateNewsEvent = async (id: string, updated: Partial<NewsEvent>) => {
    const saved = await apiRequest<any>(`/api/news/${id}`, { method: 'PUT', body: JSON.stringify(toSnake(updated)) });
    setNewsEvents(prev => prev.map(n => n.id === id ? toCamel<NewsEvent>(saved) : n));
  };

  const deleteNewsEvent = async (id: string) => { await apiRequest(`/api/news/${id}`, { method: 'DELETE' }); setNewsEvents(prev => prev.filter(n => n.id !== id)); };

  const updateAdmissionSettings = (settings: Partial<AdmissionSettings>) => {
    setAdmissionSettings(prev => ({ ...prev, ...settings }));
  };

  const submitApplication = async (appData: Omit<AdmissionApplication, 'id' | 'refNo' | 'submittedAt' | 'status'>) => {
    const saved = await apiRequest<any>('/api/applications', { method: 'POST', body: JSON.stringify(toSnake(appData)) });
    return toCamel<AdmissionApplication>(saved);
  };

  const updateApplicationStatus = async (id: string, status: AdmissionApplication['status'], notes?: string) => {
    const saved = await apiRequest<any>(`/api/applications/${id}/status`, { method: 'PUT', body: JSON.stringify({ status, notes }) });
    const updated = toCamel<AdmissionApplication>(saved); setApplications(prev => prev.map(app => app.id === id ? updated : app));
  };

  const deleteApplication = async (id: string) => { await apiRequest(`/api/applications/${id}`, { method: 'DELETE' }); setApplications(prev => prev.filter(app => app.id !== id)); };

  const adminLogin = async (username: string, password: string) => {
    try { await apiRequest('/api/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }); setIsAdminLoggedIn(true); return true; } catch { return false; }
  };


  const adminLogout = async () => { try { await apiRequest('/api/auth/logout', { method: 'POST' }); } finally { setIsAdminLoggedIn(false); setApplications([]); } };

  const changeAdminPassword = async (oldPass: string, newPass: string) => {
    try { await apiRequest('/api/auth/change-password', { method: 'POST', body: JSON.stringify({ current_password: oldPass, new_password: newPass }) }); await adminLogout(); return true; } catch { return false; }
  };

  const resetToDefaultData = () => {
    setCollegeInfo(initialCollegeInfo);
    setPopupAd(initialPopupAd);
    setAdmissionSettings(initialAdmissionSettings);
    setFaculty(initialFaculty);
    setNewsEvents(initialNewsEvents);
    setApplications([]);
    localStorage.removeItem(STORAGE_KEYS.POPUP_DISMISSED);
    setIsPopupDismissed(false);
  };

  return (
    <AppContext.Provider
      value={{
        collegeInfo,
        updateCollegeInfo,
        popupAd,
        updatePopupAd,
        savePopupAd,
        isPopupDismissed,
        dismissPopup,
        openPopup,
        faculty,
        addFaculty,
        updateFaculty,
        deleteFaculty,
        newsEvents,
        addNewsEvent,
        updateNewsEvent,
        deleteNewsEvent,
        admissionSettings,
        updateAdmissionSettings,
        applications,
        submitApplication,
        updateApplicationStatus,
        deleteApplication,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        changeAdminPassword,
        currentTab,
        setCurrentTab,
        resetToDefaultData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
