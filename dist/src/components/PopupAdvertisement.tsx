import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, ArrowRight, ShieldCheck, Calendar, Bell } from 'lucide-react';

interface PopupAdvertisementProps {
  onApplyClick: () => void;
}

export const PopupAdvertisement: React.FC<PopupAdvertisementProps> = ({ onApplyClick }) => {
  const { popupAd, isPopupDismissed, dismissPopup } = useApp();

  if (!popupAd.enabled || isPopupDismissed) {
    return null;
  }

  const handleAction = () => {
    dismissPopup(false);
    if (popupAd.buttonLink.startsWith('#')) {
      onApplyClick();
    } else {
      window.open(popupAd.buttonLink, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header Badge Strip */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-400 animate-bounce" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {popupAd.badge || 'Official Notice'}
            </span>
          </div>
          <button
            onClick={() => dismissPopup(false)}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Close Announcement"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={popupAd.imageUrl || '/assets/aistudio/Moomal_Groups_Of_Colleges_deda5503.jpeg'}
              alt="Moomal Group Notice"
              className="w-16 h-16 object-contain rounded-lg border border-slate-100 p-1 shrink-0 bg-slate-50"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900 leading-snug">
                {popupAd.title}
              </h3>
              <p className="text-xs font-semibold text-amber-700 mt-0.5">
                {popupAd.subtitle}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 mb-5">
            <p className="text-sm text-slate-700 leading-relaxed">
              {popupAd.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Recognized by PNMC & Affiliated with LUMHS Jamshoro</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleAction}
              className="w-full sm:flex-1 py-3 px-5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>{popupAd.buttonText || 'Apply Online Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => dismissPopup(true)}
              className="w-full sm:w-auto py-3 px-4 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer text-center"
            >
              Don't show again today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
