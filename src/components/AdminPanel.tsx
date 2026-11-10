import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FacultyMember, NewsEvent, AdmissionApplication } from '../types';
import { uploadImage } from '../lib/api';
import {
  Shield,
  Key,
  Lock,
  LogOut,
  Bell,
  Newspaper,
  Users,
  GraduationCap,
  Settings,
  Phone,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
  Download,
  Eye,
  ExternalLink,
  Save,
  RotateCcw,
  Search,
} from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const {
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    changeAdminPassword,
    collegeInfo,
    updateCollegeInfo,
    popupAd,
    updatePopupAd,
    savePopupAd,
    newsEvents,
    addNewsEvent,
    updateNewsEvent,
    deleteNewsEvent,
    faculty,
    addFaculty,
    updateFaculty,
    deleteFaculty,
    applications,
    updateApplicationStatus,
    deleteApplication,
    admissionSettings,
    updateAdmissionSettings,
    resetToDefaultData,
  } = useApp();

  // Login form state
  const [loginUser, setLoginUser] = useState('admin');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Admin tabs
  const [activeTab, setActiveTab] = useState<
    'overview' | 'popup' | 'news' | 'applications' | 'admission' | 'faculty' | 'contact' | 'security'
  >('overview');

  // Change password state
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passMsg, setPassMsg] = useState<{ text: string; isError: boolean } | null>(null);

  // News form state
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'Notice' as any,
    date: 'November 2025',
    summary: '',
    content: '',
    isPinned: false,
    isPublished: true,
    image: '',
  });

  // Faculty form state
  const [editingFacultyId, setEditingFacultyId] = useState<string | null>(null);
  const [facultyForm, setFacultyForm] = useState({
    name: '',
    designation: '',
    department: 'Faculty of Nursing',
    category: 'nursing' as FacultyMember['category'],
    qualification: '',
    bio: '',
  });

  // Application search & filter
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState<string>('All');

  // Success notifications
  const [saveToast, setSaveToast] = useState('');

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3000);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = await adminLogin(loginUser, loginPass);
    if (!success) {
      setLoginError('Invalid username or password.');
    } else {
      setLoginPass('');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassMsg(null);
    if (newPass.length < 12) {
      setPassMsg({ text: 'New password must be at least 12 characters.', isError: true });
      return;
    }
    if (newPass !== confirmPass) {
      setPassMsg({ text: 'New passwords do not match.', isError: true });
      return;
    }
    const success = await changeAdminPassword(oldPass, newPass);
    if (success) {
      setPassMsg({ text: 'Admin passcode updated successfully!', isError: false });
      setOldPass('');
      setNewPass('');
      setConfirmPass('');
    } else {
      setPassMsg({ text: 'Current passcode is incorrect.', isError: true });
    }
  };

  const handleExportCSV = () => {
    if (applications.length === 0) return;
    const headers = ['Ref No', 'Applicant Name', 'Father Name', 'CNIC', 'Phone', 'Email', 'District', 'Inter %', 'Status', 'Submitted At'];
    const rows = applications.map(app => [
      app.refNo,
      `"${app.applicantName}"`,
      `"${app.fatherName}"`,
      app.cnic,
      app.phone,
      app.email,
      app.domicileDistrict,
      ((app.interMarks / app.interTotal) * 100).toFixed(1) + '%',
      app.status,
      app.submittedAt,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MCNAHS_Applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 text-xs font-semibold p-1"
          >
            Close
          </button>

          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-slate-900 text-amber-300 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md">
              <Shield className="w-7 h-7" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900">Staff & Admin Portal</h2>
            <p className="text-xs text-slate-500 mt-1">
              Moomal College of Nursing & Allied Health Sciences
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Administrator Username
              </label>
              <input type="text" required autoComplete="username" placeholder="Administrator username" value={loginUser} onChange={e => setLoginUser(e.target.value)} className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl" />
              <label className="text-xs font-semibold text-slate-700 block mb-1 mt-3">Administrator Password</label>
              <div className="relative"><Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><input type="password" required autoComplete="current-password" placeholder="Enter administrator password" value={loginPass} onChange={e => setLoginPass(e.target.value)} className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-mono" /></div>
              <p className="text-[11px] text-slate-400 mt-1">Use credentials configured by the system administrator.</p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Sign In to Management Console
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredApps = applications.filter(app => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.fatherName.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.refNo.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.cnic.includes(appSearch);

    const matchesStatus = appStatusFilter === 'All' ? true : app.status === appStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Admin Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-lg font-bold text-white leading-tight">
               Administration Console
              </div>
              <div className="text-[11px] text-slate-400">
                Logged in as Master Administrator • Live Content Management
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveToast && (
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-md animate-pulse">
                {saveToast}
              </span>
            )}
            <button
              onClick={adminLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              Back to Site
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 flex items-center gap-1 overflow-x-auto shrink-0 py-2">
          {[
            { id: 'overview', label: 'Overview', icon: Settings },
            { id: 'popup', label: 'Pop Advertisement', icon: Bell },
            { id: 'news', label: 'News & Events', icon: Newspaper },
            { id: 'applications', label: `Applications (${applications.length})`, icon: Users },
            { id: 'admission', label: 'Admissions & Google Form', icon: GraduationCap },
            { id: 'faculty', label: `Faculty Roster (${faculty.length})`, icon: Users },
            { id: 'contact', label: 'Contact & Socials', icon: Phone },
            { id: 'security', label: 'Security & Passcode', icon: Key },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-50/50">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Total Applications</span>
                  <div className="text-2xl font-serif font-bold text-slate-900 mt-1 tabular-nums">
                    {applications.length}
                  </div>
                  <span className="text-[11px] text-amber-700 mt-1 block">
                    {applications.filter(a => a.status === 'Pending').length} Pending Review
                  </span>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Pop Advertisement</span>
                  <div className="text-2xl font-serif font-bold text-slate-900 mt-1">
                    {popupAd.enabled ? (
                      <span className="text-emerald-600">Active</span>
                    ) : (
                      <span className="text-slate-400">Disabled</span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block truncate">
                    {popupAd.badge || 'Admissions Notice'}
                  </span>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Teaching Faculty</span>
                  <div className="text-2xl font-serif font-bold text-slate-900 mt-1 tabular-nums">
                    {faculty.length}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Faculty of Nursing (BSN)
                  </span>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Active News Items</span>
                  <div className="text-2xl font-serif font-bold text-slate-900 mt-1 tabular-nums">
                    {newsEvents.filter(n => n.isPublished).length}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Admissions & Academic Notices
                  </span>
                </div>
              </div>

              {/* Quick Jump Shortcuts */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-4">
                  Quick Management Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab('popup')}
                    className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 text-left cursor-pointer transition-colors"
                  >
                    <Bell className="w-5 h-5 text-amber-700 mb-2" />
                    <h4 className="text-xs font-bold text-slate-900">Edit Pop Advertisement</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Toggle notice popup or update text & banner</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('admission')}
                    className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 text-left cursor-pointer transition-colors"
                  >
                    <GraduationCap className="w-5 h-5 text-blue-700 mb-2" />
                    <h4 className="text-xs font-bold text-slate-900">Google Form & Admissions</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Configure external Google Form URL & session dates</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('applications')}
                    className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 text-left cursor-pointer transition-colors"
                  >
                    <Users className="w-5 h-5 text-emerald-700 mb-2" />
                    <h4 className="text-xs font-bold text-slate-900">Review Student Applications</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Approve, schedule interview or export CSV</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: POPUP ADVERTISEMENT MANAGER */}
          {activeTab === 'popup' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Settings Form */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-slate-900">
                      Pop Advertisement Configuration
                    </h3>
                    <p className="text-xs text-slate-500">
                      Edit the floating notice modal displayed to students upon visiting the website.
                    </p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-xs font-bold text-slate-700">
                      {popupAd.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                    <input
                      type="checkbox"
                      checked={popupAd.enabled}
                      onChange={e => {
                        updatePopupAd({ enabled: e.target.checked });
                        showToast('Pop Ad status updated');
                      }}
                      className="w-4 h-4 accent-slate-900 cursor-pointer"
                    />
                  </label>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Header Badge Text
                    </label>
                    <input
                      type="text"
                      value={popupAd.badge}
                      onChange={e => updatePopupAd({ badge: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                      placeholder="e.g. Admissions Open 2025-2026"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Advertisement Main Title
                    </label>
                    <input
                      type="text"
                      value={popupAd.title}
                      onChange={e => updatePopupAd({ title: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                      placeholder="e.g. Bachelor of Science in Nursing (BSN)"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Subtitle / Affiliation Line
                    </label>
                    <input
                      type="text"
                      value={popupAd.subtitle}
                      onChange={e => updatePopupAd({ subtitle: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                      placeholder="e.g. 4-Year Degree Program • Affiliated with LUMHS Jamshoro"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Detailed Announcement Description
                    </label>
                    <textarea
                      rows={3}
                      value={popupAd.description}
                      onChange={e => updatePopupAd({ description: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                      placeholder="Enter the full advertisement copy..."
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Popup Image</label>
                    <input type="file" accept="image/png,image/jpeg,image/webp" onChange={async e => { const file=e.target.files?.[0]; if(!file)return; try { const imageUrl=await uploadImage(file); updatePopupAd({imageUrl}); showToast('Popup image uploaded. Save changes to publish it.'); } catch(error) { showToast(error instanceof Error ? error.message : 'Image upload failed'); } }} className="w-full text-xs" />
                    {popupAd.imageUrl && <img src={popupAd.imageUrl} alt="Popup preview" className="mt-2 max-h-36 rounded-lg object-contain border border-slate-200" />}
                    <p className="text-[11px] text-slate-500 mt-1">JPG, PNG or WEBP. Maximum size 5 MB.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={popupAd.buttonText}
                        onChange={e => updatePopupAd({ buttonText: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                        placeholder="e.g. Apply Online Now"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Button Action / URL
                      </label>
                      <input
                        type="text"
                        value={popupAd.buttonLink}
                        onChange={e => updatePopupAd({ buttonLink: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                        placeholder="#admissions or https://..."
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={async () => { try { await savePopupAd(); showToast('Popup Advertisement saved to database!'); } catch(error) { showToast(error instanceof Error ? error.message : 'Could not save popup'); } }}
                    className="px-5 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-xl shadow-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Live Preview Column */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-4">
                  Live Modal Preview
                </span>
                <div className="border border-slate-300 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-300">{popupAd.badge}</span>
                    <span className="text-slate-400">✕</span>
                  </div>
                  <div className="p-4 bg-white space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={popupAd.imageUrl || "/public/assets/aistudio/Moomal_Groups_Of_Colleges_deda5503.jpeg"}
                        alt="Preview"
                        className="w-12 h-12 object-contain"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-serif text-sm font-bold text-slate-900">{popupAd.title}</h4>
                        <p className="text-[11px] text-amber-800 font-medium">{popupAd.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      {popupAd.description}
                    </p>
                    <button className="w-full py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg">
                      {popupAd.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NEWS & EVENTS */}
          {activeTab === 'news' && (
            <div className="space-y-8">
              {/* Create/Edit Form */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-4">
                  {editingNewsId ? 'Edit News / Event Item' : 'Add New News or Notice Announcement'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Headline Title *</label>
                    <input
                      type="text"
                      value={newsForm.title}
                      onChange={e => setNewsForm({ ...newsForm, title: e.target.value })}
                      placeholder="e.g. BSN Merit List Announced..."
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Notice Type</label>
                    <select
                      value={newsForm.category}
                      onChange={e => setNewsForm({ ...newsForm, category: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    >
                      <option value="Notice">Official Notice</option>
                      <option value="Announcement">Announcement</option>
                      <option value="News">Campus News</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Date String</label>
                    <input
                      type="text"
                      value={newsForm.date}
                      onChange={e => setNewsForm({ ...newsForm, date: e.target.value })}
                      placeholder="e.g. November 2025"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Short Summary</label>
                    <input
                      type="text"
                      value={newsForm.summary}
                      onChange={e => setNewsForm({ ...newsForm, summary: e.target.value })}
                      placeholder="One-line deck summary..."
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Event / News Image</label>
                    <input type="file" accept="image/png,image/jpeg,image/webp" onChange={async e => { const file=e.target.files?.[0]; if(!file)return; try { const image=await uploadImage(file); setNewsForm(prev=>({...prev,image})); showToast('Image uploaded. Publish or update this news item to save it.'); } catch(error) { showToast(error instanceof Error ? error.message : 'Image upload failed'); } }} className="w-full text-xs" />
                    {newsForm.image && <img src={newsForm.image} alt="News preview" className="mt-2 max-h-40 rounded-lg object-cover border border-slate-200" />}
                    <p className="text-[11px] text-slate-500 mt-1">JPG, PNG or WEBP. Maximum size 5 MB.</p>
                  </div>
                  <div className="sm:col-span-3">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Full Notice Content</label>
                    <textarea
                      rows={3}
                      value={newsForm.content}
                      onChange={e => setNewsForm({ ...newsForm, content: e.target.value })}
                      placeholder="Full details of the announcement..."
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newsForm.isPinned}
                        onChange={e => setNewsForm({ ...newsForm, isPinned: e.target.checked })}
                      />
                      <span>Pin to Top</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newsForm.isPublished}
                        onChange={e => setNewsForm({ ...newsForm, isPublished: e.target.checked })}
                      />
                      <span>Published (Visible)</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    {editingNewsId && (
                      <button
                        onClick={() => {
                          setEditingNewsId(null);
                          setNewsForm({
                            title: '',
                            category: 'Admissions',
                            date: 'November 2025',
                            summary: '',
                            content: '',
                            isPinned: false,
                            isPublished: true,
                            image: '',
                          });
                        }}
                        className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={async () => {
                        if (!newsForm.title) return;
                        try {
                        if (editingNewsId) {
                          await updateNewsEvent(editingNewsId, newsForm);
                          showToast('News item updated');
                          setEditingNewsId(null);
                        } else {
                          await addNewsEvent(newsForm);
                          showToast('New announcement created');
                        }
                        setNewsForm({
                          title: '',
                          category: 'Notice',
                          date: 'November 2025',
                          summary: '',
                          content: '',
                          isPinned: false,
                          isPublished: true,
                          image: '',
                        });
                        } catch(error) { showToast(error instanceof Error ? error.message : 'Could not save news item'); }
                      }}
                      className="px-5 py-2 bg-slate-900 text-white font-semibold text-xs rounded-xl shadow-xs"
                    >
                      {editingNewsId ? 'Update Item' : 'Publish Notice'}
                    </button>
                  </div>
                </div>
              </div>

              {/* News List */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-4">Current News & Announcements</h3>
                <div className="space-y-3">
                  {newsEvents.map(item => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-slate-200 text-slate-800">
                            {item.category}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">{item.date}</span>
                          {item.isPinned && (
                            <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-sm">
                              Pinned
                            </span>
                          )}
                          {!item.isPublished && (
                            <span className="text-[10px] font-semibold text-red-700 bg-red-100 px-1.5 py-0.5 rounded-sm">
                              Draft (Hidden)
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                        <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{item.summary}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setEditingNewsId(item.id);
                            setNewsForm({
                              title: item.title,
                              category: item.category,
                              date: item.date,
                              summary: item.summary,
                              content: item.content,
                              isPinned: !!item.isPinned,
                              isPublished: item.isPublished,
                              image: item.image || '',
                            });
                          }}
                          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete this notice?')) {
                              deleteNewsEvent(item.id);
                              showToast('Notice deleted');
                            }
                          }}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ONLINE APPLICATIONS */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search applicant or CNIC..."
                    value={appSearch}
                    onChange={e => setAppSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <select
                    value={appStatusFilter}
                    onChange={e => setAppStatusFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <button
                    onClick={handleExportCSV}
                    className="px-3.5 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Applications Table */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                        <th className="py-3 px-4">Ref No & Date</th>
                        <th className="py-3 px-4">Applicant & Father</th>
                        <th className="py-3 px-4">CNIC & District</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4 text-center">F.Sc Marks</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredApps.map(app => {
                        const pct = ((app.interMarks / app.interTotal) * 100).toFixed(1);
                        return (
                          <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4">
                              <span className="font-mono font-bold text-slate-900 block">{app.refNo}</span>
                              <span className="text-[11px] text-slate-400">{app.submittedAt}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-semibold text-slate-900 block">{app.applicantName}</span>
                              <span className="text-[11px] text-slate-500">D/O, S/O: {app.fatherName}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-mono text-slate-800 block">{app.cnic}</span>
                              <span className="text-[11px] text-slate-500">{app.domicileDistrict}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="block">{app.phone}</span>
                              <span className="text-[11px] text-slate-400 truncate max-w-xs">{app.email}</span>
                            </td>
                            <td className="py-3 px-4 text-center font-mono">
                              <span className="font-bold text-slate-900">{app.interMarks}/{app.interTotal}</span>
                              <span className="block text-[11px] text-emerald-700 font-semibold">{pct}%</span>
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={app.status}
                                onChange={e => {
                                  updateApplicationStatus(app.id, e.target.value as any);
                                  showToast('Status updated');
                                }}
                                className="px-2 py-1 text-xs rounded-md border border-slate-200 bg-white font-medium"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Interview Scheduled">Interview Scheduled</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => {
                                  if (confirm(`Delete application ${app.refNo}?`)) {
                                    deleteApplication(app.id);
                                    showToast('Application deleted');
                                  }
                                }}
                                className="text-red-500 hover:text-red-700 p-1"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredApps.length === 0 && (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No student applications matching your filters.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: ADMISSION SETTINGS & GOOGLE FORM */}
          {activeTab === 'admission' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Admission Program & Google Form Configuration
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage admission cycles, eligibility notes, and provide custom Google Form application URLs.
                </p>
              </div>

              {/* Google Form Section */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Enable Google Form Direct Application</h4>
                    <p className="text-[11px] text-slate-600">
                      When turned on, a prominent button to open your custom Google Form will appear on the Admissions page.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={admissionSettings.isGoogleFormEnabled}
                    onChange={e => {
                      updateAdmissionSettings({ isGoogleFormEnabled: e.target.checked });
                      showToast('Google Form mode toggled');
                    }}
                    className="w-4 h-4 accent-slate-900 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Google Form URL Link
                  </label>
                  <input
                    type="url"
                    value={admissionSettings.googleFormUrl}
                    onChange={e => updateAdmissionSettings({ googleFormUrl: e.target.value })}
                    placeholder="https://docs.google.com/forms/d/e/..."
                    className="w-full px-3.5 py-2 text-xs bg-white border border-amber-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              {/* Cycle Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Cycle Title</label>
                  <input
                    type="text"
                    value={admissionSettings.cycleTitle}
                    onChange={e => updateAdmissionSettings({ cycleTitle: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Session Year</label>
                  <input
                    type="text"
                    value={admissionSettings.sessionYear}
                    onChange={e => updateAdmissionSettings({ sessionYear: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Status</label>
                  <select
                    value={admissionSettings.admissionStatus}
                    onChange={e => updateAdmissionSettings({ admissionStatus: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-medium"
                  >
                    <option value="Open">Open</option>
                    <option value="Closing Soon">Closing Soon</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Last Date to Apply</label>
                  <input
                    type="text"
                    value={admissionSettings.lastDateToApply}
                    onChange={e => updateAdmissionSettings({ lastDateToApply: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Entry Test Date</label>
                  <input
                    type="text"
                    value={admissionSettings.entryTestDate}
                    onChange={e => updateAdmissionSettings({ entryTestDate: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  onClick={() => showToast('Admission Settings Saved')}
                  className="px-5 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-xl shadow-xs"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: FACULTY ROSTER */}
          {activeTab === 'faculty' && (
            <div className="space-y-8">
              {/* Add Faculty Form */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-4">
                  {editingFacultyId ? 'Edit Faculty Member' : 'Add New Faculty Member'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={facultyForm.name}
                      onChange={e => setFacultyForm({ ...facultyForm, name: e.target.value })}
                      placeholder="e.g. Paras Ali Pitafi"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Designation *</label>
                    <input
                      type="text"
                      value={facultyForm.designation}
                      onChange={e => setFacultyForm({ ...facultyForm, designation: e.target.value })}
                      placeholder="e.g. Nursing Instructor"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Department</label>
                    <input
                      type="text"
                      value={facultyForm.department}
                      onChange={e => setFacultyForm({ ...facultyForm, department: e.target.value })}
                      placeholder="Faculty of Nursing"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Academic Qualification</label>
                    <input
                      type="text"
                      value={facultyForm.qualification}
                      onChange={e => setFacultyForm({ ...facultyForm, qualification: e.target.value })}
                      placeholder="e.g. BSN, MSN, Registered Nurse"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Short Profile / Bio</label>
                    <input
                      type="text"
                      value={facultyForm.bio}
                      onChange={e => setFacultyForm({ ...facultyForm, bio: e.target.value })}
                      placeholder="Specialization and clinical background..."
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                  {editingFacultyId && (
                    <button
                      onClick={() => {
                        setEditingFacultyId(null);
                        setFacultyForm({
                          name: '',
                          designation: '',
                          department: 'Faculty of Nursing',
                          category: 'nursing',
                          qualification: '',
                          bio: '',
                        });
                      }}
                      className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (!facultyForm.name) return;
                      if (editingFacultyId) {
                        updateFaculty(editingFacultyId, facultyForm);
                        showToast('Faculty member updated');
                        setEditingFacultyId(null);
                      } else {
                        addFaculty(facultyForm);
                        showToast('Faculty member added');
                      }
                      setFacultyForm({
                        name: '',
                        designation: '',
                        department: 'Faculty of Nursing',
                        category: 'nursing',
                        qualification: '',
                        bio: '',
                      });
                    }}
                    className="px-5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
                  >
                    {editingFacultyId ? 'Save Updates' : 'Add to Faculty List'}
                  </button>
                </div>
              </div>

              {/* Faculty List */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-4">Faculty Members</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {faculty.map(f => (
                    <div
                      key={f.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start justify-between gap-3"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                          {f.department}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-0.5">{f.name}</h4>
                        <p className="text-xs text-slate-600">{f.designation}</p>
                        {f.qualification && <p className="text-[11px] text-slate-400 mt-1">{f.qualification}</p>}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingFacultyId(f.id);
                            setFacultyForm({
                              name: f.name,
                              designation: f.designation,
                              department: f.department,
                              category: f.category,
                              qualification: f.qualification || '',
                              bio: f.bio || '',
                            });
                          }}
                          className="p-1.5 text-slate-600 hover:text-slate-900 rounded"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove ${f.name}?`)) {
                              deleteFaculty(f.id);
                              showToast('Faculty removed');
                            }
                          }}
                          className="p-1.5 text-red-500 hover:text-red-700 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: CONTACT & SOCIALS */}
          {activeTab === 'contact' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  College Contact Details & Social Channels
                </h3>
                <p className="text-xs text-slate-500">
                  Updates will instantly reflect across the website header, footer, and contact section.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Primary Phone Number *
                  </label>
                  <input
                    type="text"
                    value={collegeInfo.phonePrimary}
                    onChange={e => updateCollegeInfo({ phonePrimary: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Secondary Phone Number *
                  </label>
                  <input
                    type="text"
                    value={collegeInfo.phoneSecondary}
                    onChange={e => updateCollegeInfo({ phoneSecondary: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    College Landline Number
                  </label>
                  <input
                    type="text"
                    value={collegeInfo.landline}
                    onChange={e => updateCollegeInfo({ landline: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    WhatsApp Chat Number
                  </label>
                  <input
                    type="text"
                    value={collegeInfo.whatsappNumber}
                    onChange={e => updateCollegeInfo({ whatsappNumber: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Campus Address *
                  </label>
                  <input
                    type="text"
                    value={collegeInfo.address}
                    onChange={e => updateCollegeInfo({ address: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Facebook Page URL
                  </label>
                  <input
                    type="text"
                    value={collegeInfo.facebookUrl}
                    onChange={e => updateCollegeInfo({ facebookUrl: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Instagram Page URL
                  </label>
                  <input
                    type="text"
                    value={collegeInfo.instagramUrl}
                    onChange={e => updateCollegeInfo({ instagramUrl: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  onClick={() => showToast('Contact information saved successfully!')}
                  className="px-5 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-xl shadow-xs"
                >
                  Save Contact Information
                </button>
              </div>
            </div>
          )}

          {/* TAB 8: SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs max-w-lg">
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
                  Change Administrator Password
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Update the administrator password required to access this admin panel.
                </p>

                {passMsg && (
                  <div
                    className={`p-3 rounded-xl text-xs mb-4 flex items-center gap-2 ${
                      passMsg.isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {passMsg.isError ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                    <span>{passMsg.text}</span>
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Current Password</label>
                    <input
                      type="password"
                      required
                      value={oldPass}
                      onChange={e => setOldPass(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">New Password</label>
                    <input
                      type="password"
                      required
                      minLength={12}
                      value={newPass}
                      onChange={e => setNewPass(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      minLength={12}
                      value={confirmPass}
                      onChange={e => setConfirmPass(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors mt-2"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              {/* Reset to Factory Defaults */}
              <div className="bg-red-50/50 border border-red-200 rounded-2xl p-6 max-w-lg">
                <h4 className="text-xs font-bold text-red-900 uppercase tracking-wider mb-1">
                  Reset Data to Defaults
                </h4>
                <p className="text-xs text-red-800 leading-relaxed mb-4">
                  Revert all edited notices, faculty, and college parameters back to the original prospectus defaults.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all modified data to original values?')) {
                      resetToDefaultData();
                      showToast('Data reset to original prospectus defaults');
                    }
                  }}
                  className="px-4 py-2 bg-white border border-red-300 text-red-700 hover:bg-red-50 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Data to Default</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
