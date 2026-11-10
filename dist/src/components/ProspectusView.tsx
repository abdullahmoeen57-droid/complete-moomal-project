import React, { useState } from 'react';
import { Download, FileText, BookOpen, AlertOctagon, ShieldAlert, Award, ExternalLink, CheckCircle } from 'lucide-react';

export const ProspectusView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reader' | 'conduct' | 'disciplinary' | 'hyderabad'>('reader');

  const prospectusPdfUrl = "/assets/aistudio/Prospectus_Nursing_25-26_7a7c6e86.pdf";

  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Title Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            {/* Page Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
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
              <span className="text-amber-700 font-semibold">Admission Prospectus</span>
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
              Official Document 2025–2026
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
              Admission Prospectus & Institutional Code
            </h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Official prospectus of Moomal College of Nursing & Allied Health Sciences Hyderabad. Contains comprehensive guidelines, LUMHS affiliation charter, 4-year BSN scheme, student conduct code, and disciplinary procedures.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={prospectusPdfUrl}
              download="Moomal_College_Nursing_Prospectus_2025-2026.pdf"
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download Official PDF</span>
            </a>
            <a
              href={prospectusPdfUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in New Tab</span>
            </a>
          </div>
        </div>

        {/* Navigation Tabs for Key Sections */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveTab('reader')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'reader' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            PDF Interactive Viewer
          </button>
          <button
            onClick={() => setActiveTab('conduct')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'conduct' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Student Conduct Rules (9 Rules)
          </button>
          <button
            onClick={() => setActiveTab('disciplinary')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'disciplinary' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Disciplinary Code & Expulsion
          </button>
          <button
            onClick={() => setActiveTab('hyderabad')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'hyderabad' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hyderabad City Heritage & Preface
          </button>
        </div>

        {/* Tab 1: Interactive PDF Viewer */}
        {activeTab === 'reader' && (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700">
                Document: Moomal College of Nursing Admission Prospectus 2025-2026 (29 Pages)
              </span>
              <a
                href={prospectusPdfUrl}
                download
                className="text-amber-700 hover:underline font-semibold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save a Copy</span>
              </a>
            </div>
            <div className="w-full h-[750px] bg-slate-100 flex items-center justify-center">
              <object
                data={`${prospectusPdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                type="application/pdf"
                className="w-full h-full"
              >
                <div className="p-8 text-center max-w-md">
                  <FileText className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                  <p className="text-sm font-bold text-slate-800 mb-2">
                    PDF Preview Available for Download
                  </p>
                  <p className="text-xs text-slate-500 mb-4">
                    Your browser does not support embedded PDF view. Click below to download the official prospectus.
                  </p>
                  <a
                    href={prospectusPdfUrl}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-xl"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF File</span>
                  </a>
                </div>
              </object>
            </div>
          </div>
        )}

        {/* Tab 2: Student Conduct Rules */}
        {activeTab === 'conduct' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
            <div className="mb-6 pb-4 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Prospectus Page 28</span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                Student Conduct Rules & Code of Ethics
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Applicable to all undergraduate students admitted to Moomal College of Nursing & Allied Health Sciences.
              </p>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block font-semibold mb-1">1. External Guest Addresses:</strong>
                No outsider will be invited by the student to address any meeting at the University or its Constituent college/institute, hospital etc., whether academic, social, religious or political without prior written permission of LUMHS/CON authorities.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block font-semibold mb-1">2. Wall Chalking & Posters:</strong>
                Students are not allowed to paste any poster, pamphlet or fix banners on walls. Graffiti to walls (wallchalking) in premises or hospital area is strictly forbidden.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block font-semibold mb-1">3. Teaching Hours Discipline:</strong>
                During teaching hours, students are prohibited to play or roam around within college or hospital corridors.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block font-semibold mb-1">4. Unapproved Gatherings & Events:</strong>
                No student or group shall arrange any picnic, musical concert, sports or excursion without prior written permission from the institutional authorities.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block font-semibold mb-1">5. Mandatory College Identity Cards:</strong>
                College ID Cards must be clearly displayed at all times within college premises and clinical training wards. Faculty and security staff are authorized to inspect ID cards at any time.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block font-semibold mb-1">6. Scientific & Literary Publications:</strong>
                Any draft intended for publication must be scrutinized and approved by MCNAHS authorities prior to release.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block font-semibold mb-1">7. Official Communication Channel:</strong>
                Students are forbidden to address higher university authorities directly. All communication must be routed through Course Coordinator, Principal, or Chairman.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block font-semibold mb-1">8. Administrative Office Access:</strong>
                Students are not permitted to enter administrative offices, telephone exchange, or faculty lounges without specific authorization.
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-medium">
                <strong className="block font-bold text-amber-900 mb-1">9. Mandatory 75% Attendance:</strong>
                Students are required to attain a minimum of 75% attendance in both didactic classes and clinical rotations to be eligible for final LUMHS examination appearance.
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Disciplinary Rules & Expulsion */}
        {activeTab === 'disciplinary' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
            <div className="mb-6 pb-4 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-red-700">Prospectus Page 29</span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                Student Disciplinary Rules & Expulsion Policy
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Formal legal and disciplinary framework enforced under approval of the Vice Chancellor LUMHS.
              </p>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-semibold mb-1">1. Disciplinary Committee:</strong>
                Each constituent faculty maintains a Disciplinary Committee notified with the approval of the Vice Chancellor to adjudicate all disciplinary matters.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-semibold mb-1">2. Suo Moto & Inquiry:</strong>
                The Principal/Director on suo moto or upon complaint initiates disciplinary inquiry and refers the case to the Committee.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-semibold mb-1">3. Show Cause Notice & Personal Hearing:</strong>
                Before taking adverse action, a show cause notice is served allowing 7 days for written reply, followed by a formal hearing before any suspension, rustication or expulsion.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-semibold mb-1">4. Right to Appeal (30 Days):</strong>
                Any aggrieved student has the statutory right to appeal directly to the Vice Chancellor LUMHS within 30 days of the order.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-semibold mb-1">5. Criminal Procedure Offenses:</strong>
                Any student named in an F.I.R. pertaining to non-bailable offenses under the Cr.P.C. will stand suspended immediately pending resolution.
              </div>

              {/* Expulsion Clause */}
              <div className="p-5 rounded-xl bg-red-50 border border-red-200 text-red-950 mt-6">
                <div className="flex items-center gap-2 font-bold text-red-900 mb-1">
                  <AlertOctagon className="w-5 h-5 text-red-600 shrink-0" />
                  <span>Statutory Expulsion Rule:</span>
                </div>
                <p className="text-xs text-red-900 leading-relaxed">
                  "Any student who remains absent for more than three (3) consecutive months without written permission of the Principal/Director shall have their admission cancelled by the Disciplinary Committee of the institute."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Hyderabad Heritage & Preface */}
        {activeTab === 'hyderabad' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Historical Background</span>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1 mb-4">
                Welcome to Hyderabad City
              </h3>
              <div className="text-xs md:text-sm text-slate-700 space-y-3 leading-relaxed font-serif">
                <p>
                  Hyderabad is one of those cities where the magnetic pull of nostalgia can be felt to a maximum, owing to the ever glorious landmarks of a bygone era. Apart from its modern bustling avenues, its history dates back to when Kalhora ruler Mian Ghulam Shah Kalhoro established it as the capital of his empire in 1768.
                </p>
                <p>
                  Today, Hyderabad acts as the vibrant educational and clinical core connecting diverse cities across Sindh. Located on Auto Bhan Road Latifabad Unit #8, Moomal College of Nursing provides an ideal, accessible medical training campus.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Official Preface</span>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1 mb-4">
                Preface to 2025–2026 Prospectus
              </h3>
              <div className="text-xs md:text-sm text-slate-700 space-y-3 leading-relaxed font-serif">
                <p>
                  "This prospectus of Moomal College of Nursing & Allied Health Sciences introduces students to rules and regulations governing our academic institution."
                </p>
                <p>
                  "Moomal College of Nursing & Allied Health Sciences offers a 4-year study course for students of BSN under the affiliation of Liaquat University of Medical and Health Sciences (LUMHS), Jamshoro. Successful completion will award the official BSN degree from LUMHS."
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
