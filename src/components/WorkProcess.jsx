import React from 'react';
import { MessageSquareCode, FileSearch, Code, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WorkProcess() {
  const steps = [
    {
      step: "01",
      icon: <MessageSquareCode className="w-5 h-5 text-gold-500" />,
      title: "Discussion",
      subtitle: "Scope & Discovery",
      description: "We align on your core product goals, target demographics, technical limitations, budget scopes, and overall timeline expectations."
    },
    {
      step: "02",
      icon: <FileSearch className="w-5 h-5 text-gold-500" />,
      title: "Planning",
      subtitle: "Wireframes & Tech Stack",
      description: "We map out the database schema, wireframe the UI structure, draft the API endpoint mappings, and finalize the frontend/backend stack choice."
    },
    {
      step: "03",
      icon: <Code className="w-5 h-5 text-gold-500" />,
      title: "Development",
      subtitle: "Coding & Checkpoints",
      description: "We write clean, modular React/Node code with git version checkpoints. You receive a staging server link to review weekly updates in real-time."
    },
    {
      step: "04",
      icon: <Radio className="w-5 h-5 text-gold-500" />,
      title: "Delivery",
      subtitle: "Quality Testing & Launch",
      description: "We run unit/integration tests, perform accessibility audits, optimize the SEO tags, set up database backup runs, and hand over the cloud keys."
    }
  ];

  return (
    <section id="process" className="py-28 px-6 md:px-12 bg-[#050507] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-gold-500"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">Workflow Roadmap</span>
            <span className="w-8 h-[1px] bg-gold-500"></span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            A Transparent Process <br />
            <span className="text-gold-gradient font-display">From Concept To Production</span>
          </h2>
          
          <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed">
            No guesswork, no missing code, no ghosting. We follow a highly structured development process with active communication from Day 1.
          </p>
        </div>

        {/* Steps Roadmapping Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-gold-500/10 via-gold-500/30 to-gold-500/10 -translate-y-16"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center text-center relative z-10 group"
              >
                {/* Giant background step number watermark */}
                <div className="absolute text-8xl font-black text-white/[0.02] group-hover:text-gold-500/[0.04] select-none pointer-events-none -top-10 -left-6 transition-colors duration-500 font-mono">
                  {item.step}
                </div>

                {/* Step Circle */}
                <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-zinc-900 border border-white/5 group-hover:border-gold-500/50 shadow-2xl transition-all duration-300 mb-6 z-10">
                  <div className="absolute -top-1 -right-1 w-5.5 h-5.5 rounded-full bg-zinc-950 border border-white/5 flex items-center justify-center text-[9px] font-bold font-mono text-gold-500">
                    {item.step}
                  </div>
                  {item.icon}
                </div>

                {/* Text block */}
                <div className="space-y-2 max-w-xs relative z-10">
                  <h3 className="text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-gold-500 block">
                    {item.subtitle}
                  </span>
                  <p className="text-xs text-zinc-500 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
