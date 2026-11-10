import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, MapPin, Shield, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onNavigate }) => {
  const { collegeInfo } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-16 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand & Affiliations */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/Moomal_Groups_Of_Colleges_deda5503.jpeg"
                alt="Moomal Group Crest"
                className="w-12 h-12 object-contain rounded-md bg-white p-1"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="font-serif text-lg font-bold text-white leading-tight">
                  Moomal College of Nursing
                </h3>
                <p className="text-[11px] text-amber-400 font-medium">
                  & Allied Health Sciences Hyderabad
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Established under Moomal Education Private Limited (Moomal College of Nursing & Allied Health Sciences Hyderabad) to provide international standard 4-year BSN education. Recognized by Pakistan Nursing and Midwifery Council (PNMC) and affiliated with Liaquat University of Medical and Health Sciences (LUMHS), Jamshoro.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={collegeInfo.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Facebook Page"
              >
                fb
              </a>
              <a
                href={collegeInfo.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Instagram Page"
              >
                ig
              </a>
              <a
                href={`https://wa.me/${collegeInfo.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="WhatsApp"
              >
                wa
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Academic Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Us (Vision & Ethos)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('leadership')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Leadership & Administration
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('program')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  BSN Degree (4-Years)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faculty')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Teaching Faculty Roster
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('facilities')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Library & Cafeteria
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('news')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  News & Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('prospectus')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Admission Prospectus
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Admissions & Program */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Degree Program</h4>
            <div className="text-xs text-slate-400 space-y-1.5">
              <p className="font-semibold text-slate-200">BS Nursing (BSN)</p>
              <p>4 Years / 8 Semesters</p>
              <p>124–136 Total Credit Hours</p>
              <p className="text-amber-400 pt-1">Affiliated: LUMHS Jamshoro</p>
              <p className="text-emerald-400">Approved: PNMC Islamabad</p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('admissions')}
                className="text-xs font-bold text-amber-300 hover:text-amber-200 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Apply Online Form</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Col 5: Contact Desk */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Campus Contact</h4>
            <div className="text-xs text-slate-400 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{collegeInfo.address}, {collegeInfo.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{collegeInfo.phonePrimary} / {collegeInfo.phoneSecondary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`mailto:${collegeInfo.email}`} className="hover:text-white">
                  {collegeInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with discrete Staff Admin portal entrance */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Moomal College of Nursing & Allied Health Sciences Hyderabad. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Recognized by PNMC</span>
            <span>·</span>
            <span>Affiliated with LUMHS Jamshoro</span>
            <span>·</span>
            <button
              onClick={onOpenAdmin}
              className="text-slate-800 hover:text-slate-500 transition-colors cursor-pointer"
              aria-label="Admin Access"
              title="Admin Access"
            >
              <Shield className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
