import React from 'react';
import { leadershipData } from '../data/initialData';
import { LeadershipSection } from './LeadershipSection';
import { Shield, Award, Users, GraduationCap, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export const LeadershipPageView: React.FC = () => {
  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 px-4 md:px-8 border-b border-slate-800">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto text-center max-w-3xl"
        >
          {/* Page Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-3">
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
            <span className="text-amber-400 font-semibold">Leadership & Governance</span>
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
            Governance & Administrative Directorate
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
            College Leadership & Management
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Meet the visionary board of directors, executive officers, and academic administration leading <strong>Moomal Group of Colleges</strong> and <strong>Moomal College of Nursing & Allied Health Sciences Hyderabad</strong>.
          </p>
        </motion.div>
      </section>

      {/* Primary Leadership Showcase (Chairman, CEO, Principal, Admin Team) */}
      <LeadershipSection />

      {/* Governing Executive Council (From Prospectus Page 18) */}
      <section className="px-4 md:px-8">
        <div className="max-w-7xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
              Statutory Advisory Body
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">
              Executive Members Council
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            {leadershipData.executiveCouncil.map((name, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-900 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                  {i + 1}
                </div>
                <div>
                  <span className="font-bold text-slate-900 block truncate">{name}</span>
                  <span className="text-[10px] text-slate-400">Executive Member</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
