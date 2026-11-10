import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PopupAdvertisement } from './components/PopupAdvertisement';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { LeadershipPageView } from './components/LeadershipPageView';
import { BSNProgramDetails } from './components/BSNProgramDetails';
import { FacultyView } from './components/FacultyView';
import { FacilitiesView } from './components/FacilitiesView';
import { ProspectusView } from './components/ProspectusView';
import { AdmissionsApplySection } from './components/AdmissionsApplySection';
import { ContactSection } from './components/ContactSection';
import { NewsEventsView } from './components/NewsEventsView';
import { AdminPanel } from './components/AdminPanel';
import { Phone, MessageCircle } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { currentTab, setCurrentTab, collegeInfo } = useApp();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Supported route keys
  const validTabs = ['home', 'about', 'leadership', 'program', 'faculty', 'facilities', 'news', 'prospectus', 'admissions', 'contact'];

  // Handle URL hash changes (back/forward, direct link, bookmark, #admin)
  React.useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin') {
        setIsAdminOpen(true);
      } else if (validTabs.includes(hash)) {
        setCurrentTab(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (!hash) {
        // default to home
        setCurrentTab('home');
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, [setCurrentTab]);

  // Sync state to URL hash when currentTab changes
  const navigateTo = (tab: string) => {
    setCurrentTab(tab);
    if (window.location.hash !== `#${tab}`) {
      window.location.hash = tab;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentView = () => {
    switch (currentTab) {
      case 'home':
        return <HomeView onNavigate={setCurrentTab} />;
      case 'about':
        return <AboutView />;
      case 'leadership':
        return <LeadershipPageView />;
      case 'program':
        return <BSNProgramDetails onApplyClick={() => setCurrentTab('admissions')} />;
      case 'faculty':
        return <FacultyView />;
      case 'facilities':
        return <FacilitiesView />;
      case 'news':
        return <NewsEventsView />;
      case 'prospectus':
        return <ProspectusView />;
      case 'admissions':
        return <AdmissionsApplySection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HomeView onNavigate={setCurrentTab} />;
    }
  };

  const whatsappHref = `https://wa.me/${collegeInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Moomal%20College%20of%20Nursing,%20I%20need%20information%20about%20BSN%20admissions`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Header */}
      <Header onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Popup Advertisement Modal (Configurable in Admin) */}
      <PopupAdvertisement onApplyClick={() => setCurrentTab('admissions')} />

      {/* Administrator Portal Modal */}
      {isAdminOpen && (
        <AdminPanel
          onClose={() => {
            setIsAdminOpen(false);
            if (window.location.hash === '#admin') {
              window.history.replaceState(null, '', window.location.pathname);
            }
          }}
        />
      )}

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating Action Button for Instant WhatsApp Query */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 group"
          aria-label="Chat with Admissions on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="sr-only">WhatsApp Admissions</span>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
