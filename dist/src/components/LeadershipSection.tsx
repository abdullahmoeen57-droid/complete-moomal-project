import React from 'react';
import { leadershipData } from '../data/initialData';
import { Quote, UserCheck, Shield, ChevronRight } from 'lucide-react';

export const LeadershipSection: React.FC = () => {
  const { chairman, principal, ceo, adminOffice } = leadershipData;

  return (
    <section className="py-16 px-4 md:px-8 bg-stone-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold tracking-wider text-amber-700 uppercase mb-2">
            Institutional Governance & Academic Vision
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
            Messages from Leadership
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Guiding principles and visionary messages from the leadership of Moomal Group of Colleges and Moomal College of Nursing.
          </p>
        </div>

        {/* Top Leadership Cards Grid: Chairman & Principal with their full Prospectus messages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Chairman Message Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100">
                <div className="relative shrink-0">
                  <img
                    src={chairman.photo}
                    alt={chairman.name}
                    className="w-28 h-36 md:w-32 md:h-40 object-cover rounded-xl shadow-xs border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-slate-900 text-amber-300 p-1.5 rounded-lg shadow-xs">
                    <Quote className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-center sm:text-left">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                    Chairman & Managing Director
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-slate-900 mt-1">
                    {chairman.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">
                    {chairman.org}
                  </p>
                  <div className="mt-3 inline-block px-2.5 py-1 bg-amber-50 text-amber-900 text-xs rounded-md border border-amber-200">
                    Official Message 
                  </div>
                </div>
              </div>

              {/* Exact Prospectus Message */}
              <div className="mt-6 text-slate-700 text-sm leading-relaxed space-y-3 font-serif italic text-justify">
                <p>"{chairman.message}"</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-800">Dr. Ghulam Mustafa Butt</span>
              <span>Moomal Group of Colleges</span>
            </div>
          </div>

          {/* Principal Message Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100">
                <div className="relative shrink-0">
                  <img
                    src={principal.photo}
                    alt={principal.name}
                    className="w-28 h-36 md:w-32 md:h-40 object-cover rounded-xl shadow-xs border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-slate-900 text-amber-300 p-1.5 rounded-lg shadow-xs">
                    <Quote className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-center sm:text-left">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    Principal & Assistant Professor
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-slate-900 mt-1">
                    {principal.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">
                    {principal.org}
                  </p>
                  <div className="mt-3 inline-block px-2.5 py-1 bg-emerald-50 text-emerald-900 text-xs rounded-md border border-emerald-200">
                    Official Message 
                  </div>
                </div>
              </div>

              {/* Exact Prospectus Message */}
              <div className="mt-6 text-slate-700 text-sm leading-relaxed space-y-3 font-serif italic text-justify">
                <p>"{principal.message}"</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-800">Ms. Nazia</span>
              <span>Principal, MCNAHS Hyderabad</span>
            </div>
          </div>
        </div>

        {/* CEO & Executive Leadership Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-14">
          {/* CEO Feature */}
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div className="flex flex-col items-center text-center">
              <img
                src={ceo.photo}
                alt={ceo.name}
                className="w-32 h-36 object-cover rounded-xl shadow-xs border border-slate-200 mb-4"
                referrerPolicy="no-referrer"
              />
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                Chief Executive Officer & CEO
              </span>
              <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
                {ceo.name}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 mb-4">
                {ceo.org}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed italic text-center">
                "{ceo.message}"
              </p>
            </div>
          </div>

          {/* Director Administration & Administrative Directorate */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                    Administrative Team
                  </span>
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    Administration Department
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  <Shield className="w-3.5 h-3.5 text-slate-700" />
                  <span>Moomal Group of Colleges</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {adminOffice.map((officer, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors flex items-start gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-slate-900 text-amber-300 flex items-center justify-center font-bold text-sm shrink-0">
                      {officer.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{officer.name}</h4>
                      <p className="text-xs font-medium text-amber-800">{officer.role}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{officer.department}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
              <span>Campus Office: Auto Bhan Rd, Latifabad Unit #8, Hyderabad</span>
              <span className="font-medium text-slate-700">Tel: 0226119144</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
