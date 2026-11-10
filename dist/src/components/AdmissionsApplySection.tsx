import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdmissionApplication } from '../types';
import {
  FileText,
  CheckCircle,
  ExternalLink,
  Send,
  AlertCircle,
  HelpCircle,
  Clock,
  Printer,
  Sparkles,
} from 'lucide-react';

export const AdmissionsApplySection: React.FC = () => {
  const { admissionSettings, submitApplication, collegeInfo } = useApp();

  const [formData, setFormData] = useState({
    applicantName: '',
    fatherName: '',
    gender: 'Female' as 'Female' | 'Male',
    dob: '',
    cnic: '',
    phone: '',
    whatsapp: '',
    email: '',
    domicileDistrict: 'Hyderabad',
    permanentAddress: '',
    matricMarks: 850,
    matricTotal: 1100,
    matricYear: '2023',
    interMarks: 750,
    interTotal: 1100,
    interYear: '2025',
    interBoard: 'BISE Hyderabad',
    guardianPhone: '',
  });

  const [submittedApp, setSubmittedApp] = useState<AdmissionApplication | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const interPercentage = ((formData.interMarks / formData.interTotal) * 100).toFixed(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.applicantName || !formData.fatherName || !formData.phone || !formData.cnic) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (formData.interMarks / formData.interTotal < 0.5) {
      setErrorMsg('Minimum 50% marks in F.Sc (Pre-Medical) is required by PNC regulations.');
      return;
    }

    try { const app = await submitApplication(formData); setSubmittedApp(app); }
    catch (error) { setErrorMsg(error instanceof Error ? error.message : 'Your application could not be submitted. Please try again.'); return; }
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <section id="admissions" className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Page Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-4">
          <button
            onClick={() => {
              window.location.hash = 'home';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-amber-800 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-amber-700 font-semibold">Apply Online (BSN)</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
            Academic Session {admissionSettings.sessionYear}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
            Apply Online for BSN (4-Years)
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Submit your admission application for the Bachelor of Science in Nursing degree affiliated with LUMHS Jamshoro and recognized by the Pakistan Nursing Council.
          </p>
        </div>

        {/* Google Form External Option Banner (Configurable in Admin) */}
        {admissionSettings.isGoogleFormEnabled && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                Alternative Application Method
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 mt-0.5">
                Official Google Form Application
              </h3>
              <p className="text-xs text-slate-700 mt-1">
                You can also complete the admissions application directly via our official Google Form.
              </p>
            </div>
            <a
              href={admissionSettings.googleFormUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Open Google Form</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Confirmation Screen if Submitted */}
        {submittedApp ? (
          <div className="bg-white border border-emerald-200 rounded-3xl p-8 max-w-2xl mx-auto shadow-sm text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Application Successfully Submitted
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1 mb-2">
              Registration Reference: {submittedApp.refNo}
            </h2>
            <p className="text-xs text-slate-600 mb-6">
              Thank you, <strong>{submittedApp.applicantName}</strong>. Your online admission form for Bachelor of Science in Nursing (4-Year) has been received in our admissions database.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Program Applied:</span>
                <span className="font-bold text-slate-900">BSN (4-Years)</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Applicant Father Name:</span>
                <span className="font-semibold text-slate-900">{submittedApp.fatherName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">CNIC / B-Form:</span>
                <span className="font-mono text-slate-900">{submittedApp.cnic}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">F.Sc Pre-Medical Marks:</span>
                <span className="font-semibold text-slate-900">{submittedApp.interMarks} / {submittedApp.interTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Application Status:</span>
                <span className="font-bold text-amber-700">{submittedApp.status}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Application Receipt</span>
              </button>
              <button
                onClick={() => setSubmittedApp(null)}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          /* Application Form & Guidelines Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Guidelines & Summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Admission Schedule</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-4">
                  Important Deadlines
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block">Status</span>
                    <span className="font-bold text-emerald-700 text-sm">{admissionSettings.admissionStatus}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block">Last Date to Submit Application</span>
                    <span className="font-bold text-slate-900 text-sm">{admissionSettings.lastDateToApply}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block">Entrance Test & Interview Date</span>
                    <span className="font-bold text-slate-900 text-sm">{admissionSettings.entryTestDate}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
                  <p className="font-semibold text-slate-800 mb-1">Admissions Helpdesk:</p>
                  <p>Tel: {collegeInfo.phonePrimary} / {collegeInfo.phoneSecondary}</p>
                  <p>Cell: {collegeInfo.admissionPhone1}</p>
                  <p>Email: {collegeInfo.email}</p>
                </div>
              </div>

              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xs">
                <h3 className="font-serif text-lg font-bold text-white mb-2">
                  Eligibility Criteria
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {admissionSettings.eligibilityNotes}
                </p>
                <div className="p-3 rounded-xl bg-slate-800 text-[11px] text-amber-300 space-y-1">
                  <p>• Compulsory Pre-Medical stream</p>
                  <p>• Mandatory 50% min marks</p>
                  <p>• Age 14-35 years</p>
                </div>
              </div>
            </div>

            {/* Right Application Form */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="pb-6 border-b border-slate-100 mb-6">
                <h2 className="font-serif text-2xl font-bold text-slate-900">
                  Online Admission Application Form
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Fields marked with an asterisk (*) are required for registration.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Program of Study (Locked to BSN only) */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Offered Academic Program *
                  </label>
                  <div className="text-sm font-bold text-slate-900">
                    Bachelor of Science in Nursing (BSN - 4 Years)
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Recognized by Pakistan Nursing Council (PNC) & Affiliated with LUMHS Jamshoro.
                  </p>
                </div>

                {/* 2. Personal Information */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100 mb-4">
                    1. Applicant Personal Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        Full Name of Candidate *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ayesha Noor"
                        value={formData.applicantName}
                        onChange={e => setFormData({ ...formData, applicantName: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        Father's Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Muhammad Farooq"
                        value={formData.fatherName}
                        onChange={e => setFormData({ ...formData, fatherName: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        CNIC / B-Form Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="41303-XXXXXXX-X"
                        value={formData.cnic}
                        onChange={e => setFormData({ ...formData, cnic: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.dob}
                        onChange={e => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        Gender *
                      </label>
                      <select
                        value={formData.gender}
                        onChange={e => setFormData({ ...formData, gender: e.target.value as 'Female' | 'Male' })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        Domicile District *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hyderabad / Jamshoro / Matiari"
                        value={formData.domicileDistrict}
                        onChange={e => setFormData({ ...formData, domicileDistrict: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Contact Details */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100 mb-4">
                    2. Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        Candidate Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0300-XXXXXXX"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0300-XXXXXXX"
                        value={formData.whatsapp}
                        onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        Guardian / Father Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="0333-XXXXXXX"
                        value={formData.guardianPhone}
                        onChange={e => setFormData({ ...formData, guardianPhone: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="applicant@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        Permanent Residential Address *
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Complete postal address for admission communication"
                        value={formData.permanentAddress}
                        onChange={e => setFormData({ ...formData, permanentAddress: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Academic Record */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100 mb-4">
                    3. Academic Qualification
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        Matric Marks Obtained *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.matricMarks}
                        onChange={e => setFormData({ ...formData, matricMarks: parseInt(e.target.value) || 0 })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        Matric Total Marks
                      </label>
                      <input
                        type="number"
                        value={formData.matricTotal}
                        onChange={e => setFormData({ ...formData, matricTotal: parseInt(e.target.value) || 0 })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        F.Sc Pre-Med Marks *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.interMarks}
                        onChange={e => setFormData({ ...formData, interMarks: parseInt(e.target.value) || 0 })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        F.Sc Total Marks
                      </label>
                      <input
                        type="number"
                        value={formData.interTotal}
                        onChange={e => setFormData({ ...formData, interTotal: parseInt(e.target.value) || 0 })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        Board of Intermediate (BISE) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. BISE Hyderabad"
                        value={formData.interBoard}
                        onChange={e => setFormData({ ...formData, interBoard: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>

                    <div className="sm:col-span-2 flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                      <span className="text-slate-600 font-medium">Calculated Pre-Medical %:</span>
                      <span className={`font-mono font-bold text-sm ${parseFloat(interPercentage) >= 50 ? 'text-emerald-700' : 'text-red-600'}`}>
                        {interPercentage}% {parseFloat(interPercentage) >= 50 ? '(Eligible)' : '(Below 50% min)'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-[11px] text-slate-400">
                    By submitting, I solemnly swear all submitted documents and marks are authentic.
                  </p>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit BSN Application</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
