import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Mantra from './components/Mantra';
import WhyChooseMe from './components/WhyChooseMe';
import Services from './components/Services';
import WorkProcess from './components/WorkProcess';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import AIAssistant from './components/AIAssistant';
import InquiryModal from './components/InquiryModal';
import Blog from './components/Blog';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
// import CustomCursor from './components/CustomCursor';

const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? 'https://manjuwebbackend.onrender.com/api' : 'http://localhost:5000/api');

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => {
      setIsAdminOpen(prev => !prev);
    };
    const handleOpenInquiry = () => {
      setIsInquiryModalOpen(true);
    };
    
    window.addEventListener('toggleAdminDashboard', handleToggle);
    window.addEventListener('openInquiryModal', handleOpenInquiry);

    // Track visitor metrics dynamically on load and hash navigation changes
    const trackVisitor = () => {
      fetch(`${API_URL}/visitors`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: window.location.pathname + window.location.hash || '/' })
      }).catch(() => {});
    };

    trackVisitor();
    window.addEventListener('hashchange', trackVisitor);
    
    return () => {
      window.removeEventListener('toggleAdminDashboard', handleToggle);
      window.removeEventListener('openInquiryModal', handleOpenInquiry);
      window.removeEventListener('hashchange', trackVisitor);
    };
  }, []);

  useEffect(() => {
    const syncOfflineData = async () => {
      try {
        const offlineMsgs = JSON.parse(localStorage.getItem('contact_messages') || '[]');
        if (offlineMsgs.length > 0) {
          console.log(`>>> [SYNC] Syncing ${offlineMsgs.length} offline contact messages...`);
          for (const msg of offlineMsgs) {
            await fetch(`${API_URL}/messages`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(msg)
            });
          }
          localStorage.removeItem('contact_messages');
        }

        const offlineLeads = JSON.parse(localStorage.getItem('saved_crm_leads') || '[]');
        if (offlineLeads.length > 0) {
          console.log(`>>> [SYNC] Syncing ${offlineLeads.length} offline chatbot leads...`);
          for (const lead of offlineLeads) {
            const { id, ...leadPayload } = lead;
            await fetch(`${API_URL}/leads`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(leadPayload)
            });
          }
          localStorage.removeItem('saved_crm_leads');
        }
        
        window.dispatchEvent(new CustomEvent('agency_content_updated'));
      } catch (e) {
        console.warn('>>> [SYNC] Failed to sync offline items:', e);
      }
    };
    
    const timer = setTimeout(syncOfflineData, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen relative font-sans transition-colors duration-500">
      {/* Page Loading Sequence Overlay */}
      {isLoading && <PageLoader onComplete={() => setIsLoading(false)} />}

      {/* Interactive Custom Cursor */}
      {/* {!isLoading && <CustomCursor />} */}

      {/* Floating Header */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Mantra Statement Section */}
      <Mantra />

      {/* Why Choose Me Section */}
      <WhyChooseMe />

      {/* Services Section */}
      <Services />

      {/* Work Process Roadmap Section */}
      <WorkProcess />

      {/* Skills Matrix Section */}
      <Skills />

      {/* Projects Showcase Section */}
      <Projects />

      {/* Developer Blog Section */}
      <Blog />

      {/* Testimonials Slider Section */}
      <Testimonials />

      {/* Contact & Pre-qualification Form Section */}
      <Contact />

      {/* Floating AI Chat Assistant */}
      <AIAssistant />

      {/* Project Inquiry Modal popup */}
      <InquiryModal isOpen={isInquiryModalOpen} onClose={() => setIsInquiryModalOpen(false)} />

      {/* Admin Dashboard command panel */}
      {isAdminOpen && (
        <Suspense fallback={
          <div className="fixed inset-0 z-[100] bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-gold-500/20 border-t-gold-500 animate-spin"></div>
          </div>
        }>
          <AdminDashboard onClose={() => setIsAdminOpen(false)} />
        </Suspense>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
