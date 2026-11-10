import React, { useState } from 'react';
import { bsnCurriculum } from '../data/initialData';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Calendar,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  FileText,
  AlertTriangle,
  HeartPulse,
  Users,
  Shield,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface BSNProgramDetailsProps {
  onApplyClick: () => void;
}

export const BSNProgramDetails: React.FC<BSNProgramDetailsProps> = ({ onApplyClick }) => {
  const { admissionSettings, collegeInfo } = useApp();
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);

  const selectedYear = bsnCurriculum[selectedYearIndex];

  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Hero Banner for BSN */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
            <img
              src="/assets/aistudio/Moomal_Groups_Of_Colleges_deda5503.jpeg"
              alt="Moomal Crest Watermark"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="relative z-10 max-w-3xl">
            {/* Page Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
              <button
                onClick={() => {
                  window.location.hash = 'home';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Home
              </button>
              <span>/</span>
              <span className="text-amber-400 font-semibold">BSN Degree (4-Years)</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-amber-400 mb-3">
              <GraduationCap className="w-4 h-4" />
              <span>Exclusive Academic Program</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Bachelor of Science in Nursing (BSN)
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
              A comprehensive 4-year integrated baccalaureate degree program accredited by the{' '}
              <strong className="text-white">pakistan nursing and midwifery council(PNMC)</strong> and affiliated with the prestigious{' '}
              <strong className="text-white">Liaquat University of Medical and Health Sciences (LUMHS), Jamshoro</strong>.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block">Degree Level</span>
                <span className="font-bold text-white text-sm">Undergraduate (4-Year)</span>
              </div>
              <div>
                <span className="text-slate-400 block">Total Semesters</span>
                <span className="font-bold text-white text-sm">8 Semesters</span>
              </div>
              <div>
                <span className="text-slate-400 block">Credit Hours</span>
                <span className="font-bold text-white text-sm">124 – 136 Cr. Hrs</span>
              </div>
              <div>
                <span className="text-slate-400 block">Awarding Body</span>
                <span className="font-bold text-amber-400 text-sm">LUMHS Jamshoro</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={onApplyClick}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Apply for BSN Degree</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#curriculum"
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl transition-colors"
              >
                Explore Scheme of Studies
              </a>
            </div>
          </div>
        </div>

        {/* Program Overview & Academic Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Integrated Teaching Strategy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Modular curriculum followed under LUMHS regulations. Continuous formative assessments, monthly modular exams, and pre-professional summative evaluations conducted annually.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Clinical Bedside Training</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clinical attachments at Civi Hospital and Shah Bhittai Govt. Hospital in Hyderabad, covering medical-surgical wards, emergency triage, ICU, and pediatrics.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Mandatory 75% Attendance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              In accordance with Pakistan Nursing Council and LUMHS regulations, minimum 75% classroom and clinical attendance is strictly required to appear in final semester university examinations.
            </p>
          </div>
        </div>

        {/* Detailed Scheme of Studies / Curriculum Explorer */}
        <div id="curriculum" className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Official Curriculum</p>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">
                Scheme of Studies (8 Semesters)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Standardized integrated format for Four-Year Bachelor Degree in Nursing as prescribed by PNC & LUMHS.
              </p>
            </div>

            {/* Year Selector Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
              {bsnCurriculum.map((yr, idx) => (
                <button
                  key={yr.year}
                  onClick={() => setSelectedYearIndex(idx)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    selectedYearIndex === idx
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {yr.year}
                </button>
              ))}
            </div>
          </div>

          {/* Semesters of Selected Year */}
          <div className="mt-8 space-y-8">
            {selectedYear.semesters.map((sem, sIdx) => (
              <div key={sIdx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 md:p-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-slate-900">{sem.semester}</h3>
                    <p className="text-xs text-slate-500">{selectedYear.year} of Study Course</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-900 rounded-md border border-amber-200 tabular-nums">
                      {sem.totalCredits.toFixed(1)} Credit Hours
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider">
                        <th className="py-2.5 px-3 font-semibold">Course Code & Title</th>
                        <th className="py-2.5 px-3 font-semibold text-center">Theory (Cr)</th>
                        <th className="py-2.5 px-3 font-semibold text-center">Clinical (Cr)</th>
                        <th className="py-2.5 px-3 font-semibold text-center">Skills Lab (Cr)</th>
                        <th className="py-2.5 px-3 font-semibold text-right">Total Credits</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {sem.courses.map(course => (
                        <tr key={course.code} className="hover:bg-white/80 transition-colors">
                          <td className="py-3 px-3">
                            <span className="font-mono text-slate-400 mr-2">{course.code}</span>
                            <span className="font-medium text-slate-900">{course.title}</span>
                          </td>
                          <td className="py-3 px-3 text-center tabular-nums">{course.theory.toFixed(2)}</td>
                          <td className="py-3 px-3 text-center tabular-nums">{course.clinical.toFixed(2)}</td>
                          <td className="py-3 px-3 text-center tabular-nums">{course.lab.toFixed(2)}</td>
                          <td className="py-3 px-3 text-right font-bold text-slate-900 tabular-nums">
                            {course.total.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admission Eligibility Requirements (Fee section removed) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-xs max-w-4xl mx-auto">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Admissions Criteria</p>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">
              Eligibility & Entry Requirements
            </h3>
            <p className="text-xs md:text-sm text-slate-600 mt-2 leading-relaxed">
              Minimum qualification required under pakistan nursing and midwifery council (PNMC) and LUMHS university statutory policies.
            </p>
          </div>

          <ul className="space-y-4 text-xs md:text-sm text-slate-700">
            <li className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">Academic Qualification:</strong>
                F.Sc (Pre-Medical) with minimum 50% marks (Physics, Chemistry, and Biology compulsory) from any recognized Board of Intermediate and Secondary Education.
              </div>
            </li>
            <li className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">Age Limit:</strong>
                Candidates must be between 14 to 35 years of age at the time of admission closure.
              </div>
            </li>
            <li className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">Gender Inclusivity:</strong>
                Both male and female candidates from Sindh and nationwide are eligible on open merit.
              </div>
            </li>
            <li className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">Entry Test & Panel Interview:</strong>
                Shortlisted candidates must appear in the institutional entrance test and face-to-face panel interview to assess clinical aptitude and communication skills.
              </div>
            </li>
            <li className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">Medical Fitness:</strong>
                Selected candidates must submit a standardized medical fitness certificate before final semester registration.
              </div>
            </li>
          </ul>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-slate-500 block">Admissions Helpdesk</span>
              <span className="text-xs font-bold text-slate-900">{collegeInfo.admissionPhone1}</span>
            </div>
            <button
              onClick={onApplyClick}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer w-full sm:w-auto"
            >
              Start Online Application
            </button>
          </div>
        </div>

        {/* The Florence Nightingale Pledge Card */}
        <div className="bg-stone-100 border border-stone-200 rounded-2xl p-8 md:p-10 max-w-4xl mx-auto text-center">
          <span className="text-xs font-serif uppercase tracking-widest text-amber-800 font-semibold block mb-2">
            Professional Oath & Ethical Heritage
          </span>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            The Florence Nightingale Pledge
          </h3>
          <p className="font-serif italic text-slate-700 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            "I solemnly pledge myself before God and presence of this assembly; To pass my life in purity and to practice my profession faithfully. I will abstain from whatever is deleterious and mischievous and will not take or knowingly administer any harmful drug. I will do all in my power to maintain and elevate the standard of my profession and will hold in confidence all personal matters committed to my keeping and family affairs coming to my knowledge in the practice of my calling. With loyalty will I endeavor to aid the physician in his work, and devote myself to the welfare of those committed to my care."
          </p>
          <div className="mt-6 text-xs text-stone-500">
            Official solemn oath administered to all incoming undergraduate nursing students at MCNAHS
          </div>
        </div>
      </div>
    </section>
  );
};
