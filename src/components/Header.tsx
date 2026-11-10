import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, MapPin, Menu, X, Shield, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

interface HeaderProps {
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin }) => {
  const { collegeInfo, currentTab, setCurrentTab, popupAd, openPopup, isAdminLoggedIn } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'program', label: 'BSN Degree' },
    { id: 'faculty', label: 'Our Faculty' },
    { id: 'facilities', label: 'Campus Life' },
    { id: 'news', label: 'News & Events' },
    { id: 'prospectus', label: 'Prospectus' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Notification Strip */}
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 md:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{collegeInfo.phonePrimary}</span>
              <span className="text-slate-500">/</span>
              <span>{collegeInfo.phoneSecondary}</span>
              <span className="hidden sm:inline text-slate-500">|</span>
              <span className="hidden sm:inline text-slate-300">Office: {collegeInfo.landline}</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate max-w-xs">{collegeInfo.address}, Latifabad</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {popupAd.enabled && (
              <button
                onClick={openPopup}
                className="flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors font-medium cursor-pointer"
                title="View Announcement"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Notice:</span>
                <span>{popupAd.badge || 'Admissions Open'}</span>
              </button>
            )}
            <a
              href={`https://wa.me/${collegeInfo.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Strict 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single element brand wordmark / logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left focus:outline-hidden group shrink-0"
        >
          <img
            src="/assets/aistudio/Moomal_Groups_Of_Colleges_deda5503.jpeg"
            alt="Moomal Group of Colleges Crest"
            className="w-11 h-11 object-contain rounded-md shadow-xs group-hover:scale-105 transition-transform"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="font-serif text-lg md:text-xl font-bold tracking-tight text-slate-900 leading-tight">
              Moomal College of Nursing
            </div>
            <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              & Allied Health Sciences Hyderabad
            </div>
          </div>
        </button>

        {/* Zone 2: 4-7 single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
                currentTab === link.id
                  ? 'border-amber-600 text-slate-900 font-semibold'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary CTA action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('admissions')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer active:scale-95"
          >
            Apply Online (BSN)
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                currentTab === link.id
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('admissions')}
              className="w-full py-2.5 px-4 text-center text-xs font-semibold text-white bg-slate-900 rounded-lg shadow-sm"
            >
              Apply Online (BSN 4-Years)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
