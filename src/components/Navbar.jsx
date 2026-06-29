import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Laptop, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = navLinks.map(link => document.querySelector(link.href));
    
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', 
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) setActiveSection(id);
        }
      });
    }, observerOptions);

    sections.forEach(sec => {
      if (sec) observer.observe(sec);
    });

    return () => {
      sections.forEach(sec => {
        if (sec) observer.unobserve(sec);
      });
    };
  }, []);

  return (
    <nav 
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-4.5 bg-zinc-950/60 backdrop-blur-xl border-b border-white/5 shadow-2xl' 
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#home" 
          id="nav-logo"
          className="flex items-center gap-3 group text-lg font-extrabold tracking-widest text-white whitespace-nowrap"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 group-hover:border-gold-500/50 transition-all duration-300">
            <Laptop className="w-4.5 h-4.5 text-gold-500 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 rounded-xl bg-gold-500/10 opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
          </div>
          <span className="font-display tracking-widest">
            MANJU<span className="text-gold-500 font-light">WEBAGENCY</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center justify-end flex-grow gap-8 xl:gap-14">
          <ul className="flex items-center gap-6 xl:gap-9">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  id={`nav-link-${link.name.toLowerCase()}`}
                  href={link.href}
                  className={`text-[10px] font-bold uppercase tracking-widest transition-colors py-2 relative group whitespace-nowrap ${
                    activeSection === link.href.substring(1)
                      ? 'text-gold-500 font-bold'
                      : 'text-zinc-450 hover:text-zinc-100'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold-500 to-amber-400 transition-all duration-300 ${
                    activeSection === link.href.substring(1)
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}></span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <a
              id="nav-cta-desktop"
              href="#contact"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-black bg-gradient-to-r from-gold-400 to-gold-600 hover:from-white hover:to-white hover:shadow-2xl hover:shadow-gold-500/30 active:scale-95 transition-all duration-300 whitespace-nowrap"
            >
              Let's Talk
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl border border-white/5 bg-zinc-900/60 hover:bg-zinc-800 hover:text-gold-500 text-zinc-400 transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Control Row */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl text-zinc-450 hover:text-zinc-100 bg-zinc-900 border border-white/5 transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>
          <button
            id="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-zinc-450 hover:text-zinc-100 hover:bg-zinc-900 border border-white/5 transition-all"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div 
        id="mobile-drawer"
        className={`fixed inset-y-0 right-0 w-full max-w-xs z-40 bg-zinc-950/95 backdrop-blur-xl border-l border-white/5 shadow-2xl lg:hidden transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '0', height: '100vh' }}
      >
        <div className="flex flex-col h-full justify-between p-8 pt-24">
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  id={`mobile-nav-link-${link.name.toLowerCase()}`}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-xs font-semibold uppercase tracking-widest transition-all block py-2.5 border-b border-white/5 ${
                    activeSection === link.href.substring(1)
                      ? 'text-gold-500 font-bold pl-2 border-b-gold-500/30'
                      : 'text-zinc-450 hover:text-zinc-100'
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4">
            <p className="text-zinc-650 text-[10px] text-center tracking-wide">
              Remote freelance engagements worldwide.
            </p>
            <button
              id="nav-cta-mobile"
              onClick={() => {
                setIsOpen(false);
                window.dispatchEvent(new CustomEvent('openInquiryModal'));
              }}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-gold-400 to-gold-600 hover:from-white hover:to-white transition-all duration-300 cursor-pointer"
            >
              Start A Project
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
