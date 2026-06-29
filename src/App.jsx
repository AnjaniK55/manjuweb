import React, { useState, useEffect } from 'react';
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
import AdminDashboard from './components/AdminDashboard';
import InquiryModal from './components/InquiryModal';
import Blog from './components/Blog';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
// import CustomCursor from './components/CustomCursor';

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
      fetch('http://localhost:5000/api/visitors', { 
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
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
