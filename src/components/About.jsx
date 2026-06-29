import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Zap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const AnimatedCounter = ({ value }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1.5; 
    const end = numericValue;
    if (end === 0) return;
    
    let startTime = null;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        window.requestAnimationFrame(animateCount);
      }
    };

    window.requestAnimationFrame(animateCount);
  }, [numericValue]);

  return <>{count}{suffix}</>;
};

export default function About() {
  const stats = [
    { value: "7+", label: "Years Experience", description: "Bespoke web architecture" },
    { value: "50+", label: "Projects Delivered", description: "Production-ready apps" },
    { value: "15+", label: "Global Clients", description: "US, Europe, Asia, Australia" },
    { value: "100%", label: "Client Satisfaction", description: "Long-term partnerships" }
  ];

  return (
    <section id="about" className="py-28 px-6 md:px-12 bg-[#050507] relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Story/Copy */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-gold-500"></span>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">About Me</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Architecting Custom Software <br />
              <span className="text-gold-gradient font-display">For High-Growth Ventures</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              {/* Profile Image Area */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl border-2 border-gold-500/30 overflow-hidden bg-zinc-900 shrink-0 shadow-lg shadow-gold-500/5 group">
                <img 
                  src="/profile_avatar.png" 
                  alt="Lead Architect" 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Story/Copy */}
              <div className="space-y-4 text-zinc-450 font-light leading-relaxed text-sm">
                <p>
                  Hello! We are <strong className="text-zinc-100 font-medium">Manju Web Agency</strong>. As elite <strong className="text-zinc-100 font-medium">Full Stack Developers and digital architects</strong>, we specialize in engineering high-end business websites and complex web applications that operate at production scale.
                </p>
                <p>
                  Our primary directive is <strong className="text-zinc-100 font-medium">helping businesses grow online</strong> by optimizing conversion pipelines, improving site loading speeds, and automating manual workflows.
                </p>
              </div>
            </div>

            {/* Development Approach */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gold-500">Our Development Approach</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-400 font-light leading-relaxed">
                <div className="p-4 rounded-2xl bg-zinc-950/40 border border-white/5">
                  <span className="font-semibold text-white block mb-1">1. Discovery & Strategy</span>
                  We analyze your business goals, target audience, and current speed bottlenecks to outline a clear value proposition plan.
                </div>
                <div className="p-4 rounded-2xl bg-zinc-950/40 border border-white/5">
                  <span className="font-semibold text-white block mb-1">2. Bespoke Engineering</span>
                  We write clean, documentation-rich modular code using next-gen frameworks (React, Node, MongoDB) tailored to your scale.
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 text-gold-500 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Security Focused</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">HTTPS encryption, secure database rules, JWT authentication standards.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 text-gold-500 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Performance Tuned</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">Sub-second load times, mobile layouts, and search engine optimization.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Stats Grid */}
          <div className="relative">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-indigo-500/5 rounded-3xl blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-panel p-8 rounded-3xl border border-white/5 glow-border-gold transition-all duration-300 group"
                >
                  <div className="text-4xl sm:text-5xl font-extrabold text-gold-500 font-display mb-3 group-hover:scale-105 transition-transform origin-left">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-normal font-light">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Premium Trust Quote */}
            <div className="glass-panel p-8 rounded-3xl border border-white/5 mt-8 relative overflow-hidden group glow-border-gold">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Award className="w-24 h-24 text-gold-500" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 italic relative z-10 leading-relaxed">
                "Manju Web Agency's ability to act as both a strategic technical advisor and an independent executor saved us months of development time. They act like a technical co-founder."
              </p>
              <div className="mt-5 flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-xs font-bold text-gold-500">
                  ML
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white">Marcus Lindqvist</h5>
                  <p className="text-[10px] text-zinc-500">Founder & CEO, Nordics FinTech AB</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
