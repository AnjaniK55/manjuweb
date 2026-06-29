import React, { useState } from 'react';
import { X, Send, Check, Loader2, Phone, Briefcase, Calendar, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function InquiryModal({ isOpen, onClose }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'Business Website',
    message: '',
    budget: '$1000 - $5000',
    timeline: '1 Month'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const spamQuestion = { num1: 5, num2: 4, answer: 9 };

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
    if (!formState.name.trim()) tempErrors.name = "Full Name is required";
    
    if (!formState.email.trim()) {
      tempErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    
    if (!formState.phone.trim()) {
      tempErrors.phone = "Phone or WhatsApp number is required";
    }
    
    if (!formState.message.trim()) {
      tempErrors.message = "Project description is required";
    }
    
    if (!captchaInput.trim()) {
      tempErrors.captcha = "Anti-spam verification is required";
    } else if (parseInt(captchaInput) !== spamQuestion.answer) {
      tempErrors.captcha = "Incorrect answer";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    const payload = {
      name: formState.name,
      email: formState.email,
      message: `[Phone: ${formState.phone}] [Company: ${formState.company || 'N/A'}] - Description: ${formState.message}`,
      projectType: formState.projectType,
      budget: formState.budget,
      timeline: formState.timeline
    };

    fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(async (res) => {
      setIsSubmitting(false);
      setIsSuccess(true);

      const localMsg = {
        ...payload,
        timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
      };
      const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      localStorage.setItem('contact_messages', JSON.stringify([...existing, localMsg]));
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: 'Business Website',
        message: '',
        budget: '$1000 - $5000',
        timeline: '1 Month'
      });
      setCaptchaInput('');
      
      // Dispatch content update to sync dashboards
      window.dispatchEvent(new CustomEvent('agency_content_updated'));
    })
    .catch((err) => {
      // Fallback local storage update
      setIsSubmitting(false);
      setIsSuccess(true);
      const localMsg = {
        ...payload,
        timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
      };
      const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      localStorage.setItem('contact_messages', JSON.stringify([...existing, localMsg]));
      
      setFormState({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: 'Business Website',
        message: '',
        budget: '$1000 - $5000',
        timeline: '1 Month'
      });
      setCaptchaInput('');
      window.dispatchEvent(new CustomEvent('agency_content_updated'));
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl bg-zinc-950 border border-white/5 rounded-3xl p-6 sm:p-10 relative shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
          >
            
            {/* Close trigger */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900 border border-white/5 cursor-pointer transition-all z-10"
              aria-label="Close form modal"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Project Inquiry Sent!</h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    Thanks for contacting me. I will review your project and get back to you soon.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl border border-white/5 hover:border-gold-500 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-zinc-100 cursor-pointer bg-zinc-900/60"
                >
                  Return to MANJUWEBAGENCY
                </button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-[1px] bg-gold-500"></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold-500">Intake Hub</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Start Your Project Brief
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-300 block">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Sarah Jenkins"
                        className={`w-full px-4 py-3 border rounded-xl text-xs placeholder-zinc-650 focus:outline-none transition-all input-field-custom ${
                          errors.name ? 'border-red-500/50' : 'border-white/5'
                        }`}
                      />
                      {errors.name && <p className="text-[10px] text-red-400">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-300 block">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="sarah@apex.com"
                        className={`w-full px-4 py-3 border rounded-xl text-xs placeholder-zinc-650 focus:outline-none transition-all input-field-custom ${
                          errors.email ? 'border-red-500/50' : 'border-white/5'
                        }`}
                      />
                      {errors.email && <p className="text-[10px] text-red-400">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-300 block flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gold-500" />
                        Phone / WhatsApp Number
                      </label>
                      <input 
                        type="text" 
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 019-2834"
                        className={`w-full px-4 py-3 border rounded-xl text-xs placeholder-zinc-650 focus:outline-none transition-all input-field-custom ${
                          errors.phone ? 'border-red-500/50' : 'border-white/5'
                        }`}
                      />
                      {errors.phone && <p className="text-[10px] text-red-400">{errors.phone}</p>}
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-300 block">Company Name (Optional)</label>
                      <input 
                        type="text" 
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        placeholder="Apex Health Inc."
                        className="w-full px-4 py-3 border rounded-xl text-xs placeholder-zinc-650 focus:outline-none transition-all input-field-custom border-white/5"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Project Type */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-300 block flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-gold-500" />
                        Project Type
                      </label>
                      <select 
                        name="projectType"
                        value={formState.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-xl text-xs focus:outline-none transition-all input-field-custom border-white/5"
                      >
                        <option value="Business Website">Business Website</option>
                        <option value="E-commerce Website">E-commerce Website</option>
                        <option value="Web Application">Web Application</option>
                        <option value="Landing Page">Landing Page</option>
                        <option value="Custom Software">Custom Software</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>

                    {/* Budget */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-300 block flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-gold-500" />
                        Budget Range
                      </label>
                      <select 
                        name="budget"
                        value={formState.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-xl text-xs focus:outline-none transition-all input-field-custom border-white/5"
                      >
                        <option value="$500 - $1000">$500 - $1000</option>
                        <option value="$1000 - $5000">$1000 - $5000</option>
                        <option value="$5000+">$5000+</option>
                      </select>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-300 block flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gold-500" />
                        Project Timeline
                      </label>
                      <select 
                        name="timeline"
                        value={formState.timeline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-xl text-xs focus:outline-none transition-all input-field-custom border-white/5"
                      >
                        <option value="1-2 Weeks">1-2 Weeks</option>
                        <option value="1 Month">1 Month</option>
                        <option value="2+ Months">2+ Months</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-300 block">Project Description</label>
                    <textarea 
                      name="message"
                      rows="3"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Outline core objectives, integrations, and performance targets..."
                      className={`w-full px-4 py-3 border rounded-xl text-xs placeholder-zinc-655 focus:outline-none transition-all input-field-custom ${
                        errors.message ? 'border-red-500/50' : 'border-white/5'
                      }`}
                    ></textarea>
                    {errors.message && <p className="text-[10px] text-red-400">{errors.message}</p>}
                  </div>

                  {/* Spam Check */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-300 block">
                      Anti-Spam Code: What is {spamQuestion.num1} + {spamQuestion.num2}?
                    </label>
                    <input 
                      type="text" 
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="Solve this math check"
                      className={`w-full px-4 py-3 border rounded-xl text-xs placeholder-zinc-650 focus:outline-none transition-all input-field-custom ${
                        errors.captcha ? 'border-red-500/50' : 'border-white/5'
                      }`}
                    />
                    {errors.captcha && <p className="text-[10px] text-red-400">{errors.captcha}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-gold-400 to-gold-600 hover:from-white hover:to-white flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 cursor-pointer shadow-lg shadow-gold-500/20"
                  >
                    {isSubmitting ? (
                      <>
                        <span>Transmitting Intake Data...</span>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                      </>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                </form>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
