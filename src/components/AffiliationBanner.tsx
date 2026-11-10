import React from 'react';
import { Award, CheckCircle2, ShieldCheck, GraduationCap } from 'lucide-react';

export const AffiliationBanner: React.FC = () => {
  return (
    <section className="bg-white border-y border-slate-200 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="text-xs font-semibold tracking-wider text-amber-700 uppercase mb-1">
            Authoritative Credentials & Medical Licensing
          </p>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">
            Recognition and Academic Affiliation
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Moomal College of Nursing & Allied Health Sciences operates under complete statutory recognition and university charter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* PNC Recognition */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center text-center hover:border-slate-300 transition-colors">
            <div className="w-20 h-20 mb-4 bg-white rounded-full p-2 border border-slate-200 shadow-xs flex items-center justify-center">
              <img
                src="/assets/aistudio/PNC.images_8105418d.jpg"
                alt="Pakistan Nursing Council (PNC) Official Seal"
                className="w-16 h-16 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Statutory Regulatory Body</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
              Recognized by Pakistan Nursing and Midwifery Council
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fully approved under Pakistan Nursing and Midwifery Council (PNMC) standards, enabling our graduates to practice legally nationwide and internationally.
            </p>
          </div>

          {/* LUMHS Affiliation */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center text-center hover:border-slate-300 transition-colors">
            <div className="w-20 h-20 mb-4 bg-white rounded-full p-2 border border-slate-200 shadow-xs flex items-center justify-center">
              <img
                src="/assets/aistudio/Liaquat_University_of_Medical_and_Health_Sciences__crest__c9f1f067.jpg"
                alt="Liaquat University of Medical and Health Sciences Crest"
                className="w-16 h-16 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>Degree Awarding University</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
              Affiliated with LUMHS Jamshoro
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Under complete academic affiliation with Liaquat University of Medical and Health Sciences Jamshoro. Degrees are awarded directly by LUMHS.
            </p>
          </div>

          {/* Sindh Health Department */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center text-center hover:border-slate-300 transition-colors">
            <div className="w-20 h-20 mb-4 bg-white rounded-full p-3 border border-slate-200 shadow-xs flex items-center justify-center">
              <img
                src="/assets/aistudio/Moomal_Groups_Of_Colleges_deda5503.jpeg"
                alt="Moomal Group of Colleges Crest"
                className="w-14 h-14 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
              <Award className="w-4 h-4" />
              <span>Government of Sindh</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
              Approved by Health Department
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Formally approved by the Health Department, Government of Sindh. Affiliated for clinical rotations with Liaquat University Hospital (LUH), Civil Hospital  , and Shah Bhittai Govt. Hospital.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
