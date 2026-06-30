import React, { useState, useEffect } from 'react';
import { Send, Check, Mail, Clock, MapPin, Copy, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? 'https://manjuwebbackend.onrender.com/api' : 'http://localhost:5000/api');

const InstagramIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.012 2c-5.506 0-9.988 4.475-9.988 9.977 0 1.764.46 3.48 1.333 4.988L2 22l5.239-1.371a9.92 9.92 0 0 0 4.773 1.218h.004c5.503 0 9.986-4.474 9.986-9.974C22 6.475 17.518 2 12.012 2zm6.009 14.425c-.246.69-1.2 1.262-1.657 1.332-.423.064-.977.106-1.579-.086a9.096 9.096 0 0 1-3.66-2.285 10.373 10.373 0 0 1-2.528-3.14c-.292-.51-.43-1.042-.43-1.573 0-1.127.593-1.678.825-1.91.2-.2.433-.298.65-.298.07 0 .142.002.208.006.19.01.385-.01.556.402.167.4.577 1.402.628 1.505.05.103.084.224.017.359-.068.134-.102.22-.204.339-.102.119-.215.265-.306.363-.102.11-.21.23-.09.435.12.204.53 1.22.99 1.63.593.527 1.096.69 1.25.753.155.064.246.03.339-.074.093-.104.402-.466.51-.628.109-.162.217-.134.366-.08.15.054.95.449 1.114.532.164.082.273.123.314.195.04.072.04.417-.206 1.107z" />
  </svg>
);

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'Web App',
    budget: '$10,000 - $25,000',
    timeline: '1 - 3 Months',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [spamQuestion, setSpamQuestion] = useState({ num1: 4, num2: 3, answer: 7 });
  const [captchaInput, setCaptchaInput] = useState('');

  const emailAddress = "manjuwbagency@gmail.com";

  useEffect(() => {
    const handleSync = (e) => {
      setFormState(prev => ({
        ...prev,
        projectType: e.detail
      }));
      setStep(2); // Jump to next step
    };
    window.addEventListener('setProjectType', handleSync);
    return () => window.removeEventListener('setProjectType', handleSync);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formState.name.trim()) tempErrors.name = "Name is required";
    if (!formState.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!formState.message.trim()) tempErrors.message = "Message details are required";
    if (!captchaInput.trim()) {
      tempErrors.captcha = "Please solve the math question";
    } else if (parseInt(captchaInput) !== spamQuestion.answer) {
      tempErrors.captcha = "Incorrect answer";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });
      if (res.ok) {
        setIsSuccess(true);
        setFormState({
          name: '',
          email: '',
          projectType: 'Web App',
          budget: '$10,000 - $25,000',
          timeline: '1 - 3 Months',
          message: ''
        });
        setCaptchaInput('');
        setStep(1);
        setTimeout(() => setIsSuccess(false), 6000);
      } else {
        throw new Error();
      }
    } catch (err) {
      // Fallback: save client details to localStorage
      const newMsg = {
        ...formState,
        timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
      };
      const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      localStorage.setItem('contact_messages', JSON.stringify([...existing, newMsg]));

      setIsSuccess(true);
      setFormState({
        name: '',
        email: '',
        projectType: 'Web App',
        budget: '$10,000 - $25,000',
        timeline: '1 - 3 Months',
        message: ''
      });
      setCaptchaInput('');
      setStep(1);
      setTimeout(() => setIsSuccess(false), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 px-6 md:px-12 bg-[#050507] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-gold-500"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">Initiate Project</span>
            <span className="w-8 h-[1px] bg-gold-500"></span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Let's Construct Something <br />
            <span className="text-gold-gradient font-display">Extraordinary Together</span>
          </h2>
          
          <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed">
            Fill out the pre-qualification form below or copy my direct email to coordinate a video conference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Consultancy Information
              </h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                I partner with businesses globally. My schedule runs on a first-come, first-served retainer contract model. Contact me to discuss pipeline bookings.
              </p>

              {/* Info Items */}
              <div className="space-y-4 pt-4">
                
                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-850 flex items-center justify-center text-gold-500">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-zinc-500 block">Location</span>
                    <span className="text-xs text-zinc-300">Bhopal, Madhya Pradesh, India</span>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-850 flex items-center justify-center text-gold-500">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-zinc-500 block">Response Window</span>
                    <span className="text-xs text-zinc-300">Under 12 Hours (Mon - Fri)</span>
                  </div>
                </div>

                {/* Email Info */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-850 flex items-center justify-center text-gold-500">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-zinc-500 block">Direct Channel</span>
                    <button 
                      id="contact-copy-email-btn"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-2 text-xs text-zinc-300 hover:text-gold-500 transition-colors group cursor-pointer"
                    >
                      <span>{emailAddress}</span>
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-zinc-500 group-hover:text-gold-500 transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                {/* WhatsApp Info */}
                <div className="flex items-center gap-4 animate-pulse-slow">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-emerald-500 block">Instant Chat</span>
                    <a 
                      id="contact-whatsapp-link"
                      href="https://wa.me/917828207963" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-300 hover:text-emerald-400 transition-colors font-semibold"
                    >
                      Connect on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Instagram Info */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-850 flex items-center justify-center text-gold-500">
                    <InstagramIcon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-zinc-500 block">Instagram</span>
                    <a 
                      id="contact-instagram-link"
                      href="https://instagram.com/manjuwebagency" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-300 hover:text-gold-500 transition-colors"
                    >
                      @manjuwebagency
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Consultation Callout */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-900 mt-auto">
              <h4 className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold-500" />
                Prefer a direct conversation?
              </h4>
              <p className="text-[11px] text-zinc-500 leading-relaxed mb-4">
                Schedule a 15-minute video intake call to review your app details.
              </p>
              <a 
                id="contact-schedule-link"
                href="#contact" 
                className="inline-block py-2.5 px-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-gold-500 text-xs font-semibold text-zinc-300 hover:text-zinc-100 text-center transition-colors w-full"
              >
                Launch Calendar Scheduler
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-3xl border border-zinc-850 relative">
              
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-zinc-950/95 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-8 text-center z-20"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Project Request Received</h3>
                    <p className="text-xs text-zinc-400 max-w-sm leading-relaxed mb-6">
                      Thank you for outlining your requirements. I will review the timeline specifications and contact you directly via email within 12 hours.
                    </p>
                    <button
                      id="contact-success-close-btn"
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 text-xs font-semibold uppercase tracking-wider text-zinc-300"
                    >
                      Return to Form
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step Indicators Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  Project Configurator
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        i <= step ? 'bg-gold-500' : 'bg-zinc-800'
                      }`}
                    ></div>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-gold-500 font-bold">
                  Step {step} of 4
                </span>
              </div>

              <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                
                {/* Step 1: Service Choice */}
                {step === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <label className="text-xs font-semibold text-zinc-300 block">Step 1: What service profile are you looking to launch?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: "Bespoke Website", value: "Website" },
                        { label: "Custom E-Commerce", value: "E-commerce" },
                        { label: "SaaS Web Application", value: "Web App" },
                        { label: "Custom Software", value: "Custom Software" }
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.value}
                          onClick={() => {
                            setFormState(prev => ({ ...prev, projectType: item.value }));
                            setStep(2);
                          }}
                          className={`p-5 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer ${
                            formState.projectType === item.value
                              ? 'border-gold-500 bg-gold-500/5 text-white'
                              : 'border-white/5 bg-zinc-900/30 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Budget Choice */}
                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <label className="text-xs font-semibold text-zinc-300 block">Step 2: Define your estimated budget limits</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        "Under $5,000",
                        "$5,000 - $10,000",
                        "$10,000 - $25,000",
                        "$25,000+"
                      ].map((val) => (
                        <button
                          type="button"
                          key={val}
                          onClick={() => {
                            setFormState(prev => ({ ...prev, budget: val }));
                            setStep(3);
                          }}
                          className={`p-5 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer ${
                            formState.budget === val
                              ? 'border-gold-500 bg-gold-500/5 text-white'
                              : 'border-white/5 bg-zinc-900/30 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-start pt-4">
                      <button 
                        type="button" 
                        onClick={() => setStep(1)} 
                        className="text-[10px] uppercase font-bold text-zinc-500 hover:text-zinc-100 cursor-pointer transition-colors"
                      >
                        &larr; Back to Step 1
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Timeline Choice */}
                {step === 3 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <label className="text-xs font-semibold text-zinc-300 block">Step 3: What is your target timeline for completion?</label>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        "Less than 1 Month",
                        "1 - 3 Months",
                        "3+ Months"
                      ].map((val) => (
                        <button
                          type="button"
                          key={val}
                          onClick={() => {
                            setFormState(prev => ({ ...prev, timeline: val }));
                            setStep(4);
                          }}
                          className={`p-5 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer ${
                            formState.timeline === val
                              ? 'border-gold-500 bg-gold-500/5 text-white'
                              : 'border-white/5 bg-zinc-900/30 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-start pt-4">
                      <button 
                        type="button" 
                        onClick={() => setStep(2)} 
                        className="text-[10px] uppercase font-bold text-zinc-500 hover:text-zinc-100 cursor-pointer transition-colors"
                      >
                        &larr; Back to Step 2
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Contact Details */}
                {step === 4 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="name-input" className="text-xs font-semibold text-zinc-300 block">Your Name</label>
                        <input 
                          id="name-input"
                          type="text" 
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="Sarah Jenkins"
                          className={`w-full px-4 py-3 border rounded-xl text-sm placeholder-zinc-600 focus:outline-none transition-all input-field-custom ${
                            errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-gold-500/50'
                          }`}
                        />
                        {errors.name && <p className="text-[10px] text-red-400 mt-1">{errors.name}</p>}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email-input" className="text-xs font-semibold text-zinc-300 block">Email Address</label>
                        <input 
                          id="email-input"
                          type="email" 
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="sarah@apexhealth.com"
                          className={`w-full px-4 py-3 border rounded-xl text-sm placeholder-zinc-600 focus:outline-none transition-all input-field-custom ${
                            errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-gold-500/50'
                          }`}
                        />
                        {errors.email && <p className="text-[10px] text-red-400 mt-1">{errors.email}</p>}
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <label htmlFor="message-textarea" className="text-xs font-semibold text-zinc-300 block">Message Details</label>
                        <textarea 
                          id="message-textarea"
                          name="message"
                          rows="3"
                          value={formState.message}
                          onChange={handleChange}
                          placeholder="Briefly describe project scope..."
                          className={`w-full px-4 py-3 border rounded-xl text-sm placeholder-zinc-650 focus:outline-none transition-all input-field-custom ${
                            errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-gold-500/50'
                          }`}
                        ></textarea>
                        {errors.message && <p className="text-[10px] text-red-400 mt-1">{errors.message}</p>}
                      </div>

                      {/* Anti-spam Verification */}
                      <div className="space-y-2">
                        <label htmlFor="captcha-input" className="text-xs font-semibold text-zinc-300 block">
                          Security Check: What is {spamQuestion.num1} + {spamQuestion.num2}?
                        </label>
                        <input 
                          id="captcha-input"
                          type="text"
                          value={captchaInput}
                          onChange={(e) => setCaptchaInput(e.target.value)}
                          placeholder="Your answer"
                          className={`w-full px-4 py-3 border rounded-xl text-sm placeholder-zinc-650 focus:outline-none transition-all input-field-custom ${
                            errors.captcha ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-gold-500/50'
                          }`}
                        />
                        {errors.captcha && <p className="text-[10px] text-red-400 mt-1">{errors.captcha}</p>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 gap-4">
                      <button 
                        type="button" 
                        onClick={() => setStep(3)} 
                        className="text-[10px] uppercase font-bold text-zinc-500 hover:text-zinc-100 cursor-pointer transition-colors"
                      >
                        &larr; Back to Step 3
                      </button>

                      <button
                        id="contact-submit-btn"
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-gold-400 to-gold-600 hover:from-white hover:to-white flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 cursor-pointer shadow-lg shadow-gold-500/20"
                      >
                        {isSubmitting ? (
                          <span>Submitting...</span>
                        ) : (
                          <>
                            <span>Transmit Request</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
