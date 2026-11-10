import React from 'react';
import { useApp } from '../context/AppContext';
import { AffiliationBanner } from './AffiliationBanner';
import {
  GraduationCap,
  Download,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Award,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { admissionSettings, collegeInfo } = useApp();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-20 px-4 md:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          {/* Main 2-column split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-amber-300 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Admissions Open • Academic Session {admissionSettings.sessionYear}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Shang Compassionate Nurses, Empowering Healthcare Leaders.
              </h1>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
                Welcome to <strong>Moomal College of Nursing & Allied Health Sciences Hyderabad</strong> (Moomal Group of Colleges). Offering the 4-Year Bachelor of Science in Nursing (BSN) degree program under full recognition by the <strong>pakistan nursing and midwifery council (PNMC)</strong> and academic affiliation with <strong>Liaquat University of Medical and Health Sciences (LUMHS), Jamshoro</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('admissions')}
                  className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Apply Online (BSN)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('prospectus')}
                  className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-slate-400" />
                  <span>Download Prospectus</span>
                </button>
              </div>

              {/* Trust markers */}
              <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Recognized by PNMC</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <span>Affiliated with LUMHS Jamshoro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Approved by Health Dept Sindh</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Anchor */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800 aspect-4/3 sm:aspect-auto sm:h-[420px]">
                <img
                  src="/src/assets/images/nursing_skills_lab_1794147849707.jpg"
                  alt="Moomal College Nursing Clinical Skills Training"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Overlaid Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 flex items-center gap-3">
                  <img
                    src="/assets/aistudio/Moomal_Groups_Of_Colleges_deda5503.jpeg"
                    alt="Logo"
                    className="w-10 h-10 object-contain rounded-md bg-white p-1 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h2 className="text-xs font-bold text-white">4-Year BSN Degree</h2>
                    <p className="text-[11px] text-amber-300 font-medium">LUMHS Affiliated & PNMC Recognized</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width KPI strip below hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800 text-xs">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
              <span className="text-slate-400 block font-medium">Degree Duration</span>
              <span className="text-lg font-bold text-white mt-0.5 block tabular-nums">4 Years (8 Semesters)</span>
              <span className="text-[11px] text-slate-500">124–136 Total Credit Hours</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
              <span className="text-slate-400 block font-medium">Affiliated University</span>
              <span className="text-lg font-bold text-amber-300 mt-0.5 block">LUMHS Jamshoro</span>
              <span className="text-[11px] text-slate-500">Direct Degree Conferment</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
              <span className="text-slate-400 block font-medium">Accreditation</span>
              <span className="text-lg font-bold text-emerald-400 mt-0.5 block">PNMC Islamabad</span>
              <span className="text-[11px] text-slate-500">Nationwide Licensure</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
              <span className="text-slate-400 block font-medium">Clinical Rotations</span>
              <span className="text-lg font-bold text-white mt-0.5 block">2 Partner Hospitals</span>
              <span className="text-[11px] text-slate-500">Civil Hospital & Govt.Shah Bhittai Hospital</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition & Statutory Affiliation Banner */}
      <AffiliationBanner />

      {/* The Florence Nightingale Pledge Card */}
      <section className="px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-stone-100 border border-stone-200 rounded-3xl p-8 md:p-12 text-center">
          <span className="text-xs font-serif uppercase tracking-widest text-amber-800 font-semibold block mb-2">
            The Florence Nightingale Pledge
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Our Solemn Healthcare Oath
          </h2>
          <p className="font-serif italic text-slate-700 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            "I solemnly pledge myself before God and presence of this assembly; To pass my life in purity and to practice my profession faithfully. I will abstain from whatever is deleterious and mischievous and will not take or knowingly administer any harmful drug. I will do all in my power to maintain and elevate the standard of my profession..."
          </p>
          <div className="mt-6 text-xs text-stone-500">
            Administered to all undergraduate nursing students at Moomal College of Nursing (MCNAHS Hyderabad)
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="px-4 md:px-8">
        <div className="max-w-7xl mx-auto bg-slate-950 text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-white mb-3">
            Admissions Open for BSN (4-Years)
          </h2>
          <p className="text-slate-300 text-xs md:text-sm max-w-xl mx-auto leading-relaxed mb-6">
            Join Moomal College of Nursing & Allied Health Sciences on Auto Bhan Road, Latifabad Unit #8, Hyderabad.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('admissions')}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Apply Online (Admissions Page)
            </button>
            <a
              href={`https://wa.me/${collegeInfo.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Contact on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
