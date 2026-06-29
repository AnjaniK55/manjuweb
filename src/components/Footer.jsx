import React from 'react';
import { Laptop, ArrowUp } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  const socialLinks = [
    { icon: <GithubIcon className="w-4 h-4" />, href: "https://github.com/AnjaniK55", name: "GitHub" },
    { icon: <LinkedinIcon className="w-4 h-4" />, href: "#", name: "LinkedIn" },
    { icon: <TwitterIcon className="w-4 h-4" />, href: "#", name: "Twitter" },
    { icon: <InstagramIcon className="w-4 h-4" />, href: "https://instagram.com/manjuwebagency", name: "Instagram" }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer id="main-footer" className="bg-zinc-950 py-16 px-6 md:px-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Side: Brand Logo */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <a 
            href="#home" 
            id="footer-logo"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-white"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gold-500">
              <Laptop className="w-4.5 h-4.5" />
            </div>
            <span className="font-display">
              MANJU<span className="text-gold-500 font-light">WEBAGENCY</span>
            </span>
          </a>
          <p className="text-[11px] text-zinc-500 max-w-xs text-center md:text-left leading-relaxed">
            Constructing premium software architectures and user experiences for international freelance clients.
          </p>
        </div>

        {/* Middle Side: Quick Links */}
        <ul className="flex flex-wrap items-center justify-center gap-6 max-w-md">
          {quickLinks.map((link) => (
            <li key={link.name}>
              <a
                id={`footer-link-${link.name.toLowerCase()}`}
                href={link.href}
                className="text-xs text-zinc-500 hover:text-gold-500 transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side: Social handles & Scroll to Top */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                id={`footer-social-${social.name.toLowerCase()}`}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all button-secondary-custom"
                title={social.name}
                aria-label={`Visit my ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
            <a
              id="footer-back-to-top"
              href="#home"
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all ml-4 button-secondary-custom"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </a>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1.5">
            <span className="text-[10px] text-zinc-600 font-mono">
              &copy; {new Date().getFullYear()} Manju Web Agency. All rights reserved.
            </span>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('toggleAdminDashboard'))}
              className="text-[9px] text-zinc-700 hover:text-gold-500 font-mono tracking-widest uppercase transition-colors cursor-pointer"
            >
              [ Access Terminal ]
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
