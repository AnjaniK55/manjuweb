import React, { useState, useEffect } from 'react';
import { ArrowRight, Copy, Check, Terminal, Cpu, Activity, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const email = "manjuwbagency@gmail.com";

  const roles = ["Powerful Digital Products", "Bespoke SaaS Solutions", "High-Converting Websites", "Scalable Web Systems"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = ((clientX / innerWidth) - 0.5) * 20;
    const y = ((clientY / innerHeight) - 0.5) * 20;
    setMousePos({ x, y });
  };

  useEffect(() => {
    let timer;
    const fullText = roles[currentRoleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }

      setTypingSpeed(isDeleting ? 75 : 150);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed]);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 120, damping: 20 } 
    }
  };

  return (
    <section 
      id="home" 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-32 pb-24 px-6 md:px-12 overflow-hidden bg-[#050507]"
    >
      {/* Dynamic Animated background particle spheres */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,rgba(0,0,0,0)_70%)] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.04)_0%,rgba(0,0,0,0)_75%)] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Copy & Actions */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-8 text-left"
          >
            {/* Availability Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-white/5 bg-zinc-900/30 backdrop-blur-xl hover:border-gold-500/30 transition-all duration-300 shadow-xl"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">
                Available for Q3/Q4 Agency Projects
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[1.05] text-white min-h-[120px] sm:min-h-0">
                Transforming Ideas <br />
                Into <span className="text-gold-gradient font-display relative inline-block">
                  {currentText}
                  <span className="w-1.5 h-10 sm:h-12 md:h-16 bg-gold-500 inline-block ml-1 animate-pulse rounded-full align-middle"></span>
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed font-light">
                Premium digital agency engineering high-end corporate websites, custom SaaS applications, and interactive creative assets that build customer trust and drive conversions.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4.5"
            >
              <button
                id="hero-cta-hire"
                onClick={() => window.dispatchEvent(new CustomEvent('openInquiryModal'))}
                className="flex items-center gap-3 px-7 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-black bg-gradient-to-r from-gold-400 to-gold-600 hover:from-white hover:to-white hover:shadow-[0_0_35px_rgba(212,175,55,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto text-center justify-center cursor-pointer"
              >
                Hire Us
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              
              <a
                id="hero-cta-projects"
                href="#projects"
                className="flex items-center gap-3 px-7 py-4 rounded-xl text-xs font-bold uppercase tracking-widest active:scale-95 hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center justify-center cursor-pointer button-secondary-custom"
              >
                View Projects
              </a>
              
              <a
                id="hero-cta-contact"
                href="#contact"
                className="flex items-center gap-3 px-5 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-100 hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center justify-center cursor-pointer"
              >
                Get Consultation
              </a>
            </motion.div>

            {/* Quick Copy Contact Info */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-8 border-t border-zinc-900 max-w-xl text-zinc-500 text-[10px] tracking-wider uppercase font-semibold font-mono"
            >
              <div className="flex items-center gap-2">
                <span className="text-gold-500">&bull;</span>
                <span>Clients: US &bull; UK &bull; EU &bull; India</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gold-500">&bull;</span>
                <button 
                  id="hero-email-copy-btn"
                  onClick={copyEmailToClipboard}
                  className="flex items-center gap-2 text-zinc-400 hover:text-gold-500 transition-colors group cursor-pointer"
                  title="Click to copy email address"
                >
                  <span>{email}</span>
                  {copied ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-zinc-650 group-hover:text-gold-500" />
                  )}
                </button>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Premium SaaS Interface Mock */}
          <div className="lg:col-span-5 relative">
            {/* Floating React Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="absolute -top-8 -left-6 z-20 p-2.5 rounded-2xl bg-zinc-950/80 border border-white/5 shadow-2xl flex items-center gap-2 pointer-events-none"
            >
              <div className="w-7 h-7 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 text-xs font-mono font-bold">R</div>
              <span className="text-[9px] font-bold text-zinc-350 pr-1">REACT</span>
            </motion.div>

            {/* Floating Node Badge */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-6 z-20 p-2.5 rounded-2xl bg-zinc-950/80 border border-white/5 shadow-2xl flex items-center gap-2 pointer-events-none"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-mono font-bold">N</div>
              <span className="text-[9px] font-bold text-zinc-350 pr-1">NODE</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)` }}
              className="glass-panel w-full rounded-3xl border border-white/5 bg-zinc-950/40 p-6 shadow-2xl relative glow-border-gold overflow-hidden transition-transform duration-100 ease-out"
            >
              {/* Card Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gold-500/5 blur-[50px] pointer-events-none"></div>

              {/* Fake Chrome window controls */}
              <div className="flex items-center justify-between pb-5 border-b border-white/5 mb-6">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-900/60 border border-white/5 text-[9px] text-zinc-500 font-mono">
                  <Terminal className="w-3 h-3 text-gold-500" />
                  <span>agency_metrics.sh</span>
                </div>
                <div className="w-6"></div>
              </div>

              {/* Metrics Grid */}
              <div className="space-y-6">
                
                {/* Metric Item 1 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-gold-500" />
                      Agency Showcase Delivery
                    </span>
                    <span className="text-xs text-emerald-400 font-mono font-bold">100% Success</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/5 flex flex-col justify-between shadow-inner">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500">Case Studies</span>
                      <span className="text-2xl font-extrabold text-white font-display tracking-tight mt-2">08+ Realized</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/5 flex flex-col justify-between shadow-inner">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500">Websites Built</span>
                      <span className="text-2xl font-extrabold text-white font-display tracking-tight mt-2">12+ Live</span>
                    </div>
                  </div>
                </div>

                {/* Progress Metric Item 2 */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                    <span>Performance Success Rate</span>
                    <span className="text-gold-500 font-mono">98%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '98%' }}
                      transition={{ duration: 1.5, delay: 0.6 }}
                      className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                    ></motion.div>
                  </div>
                </div>

                {/* Status Indicator list */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  
                  <div className="p-3 rounded-xl bg-zinc-900/30 border border-white/5 space-y-1">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 block">Technologies</span>
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-gold-500" />
                      12+ Mastered
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900/30 border border-white/5 space-y-1">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 block">Response SLA</span>
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                      &lt; 24h Reply
                    </span>
                  </div>

                </div>

              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
