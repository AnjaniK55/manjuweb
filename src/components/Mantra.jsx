import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Mantra() {
  return (
    <section className="py-28 px-6 bg-[#050507] border-t border-b border-white/5 relative overflow-hidden text-center">
      {/* Decorative ambient backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-36 rounded-full bg-gold-500/10 blur-[80px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 space-y-6">
        {/* Subtle Icon Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center p-2.5 rounded-full bg-gold-500/5 border border-gold-500/15 text-gold-500 mb-2"
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>

        {/* The Mantra Statement */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white font-display max-w-4xl mx-auto"
        >
          I don't just build websites, <br />
          I build <span className="text-gold-gradient">digital solutions</span> that help <span className="text-gold-gradient">businesses grow</span>.
        </motion.h2>

        {/* Supporting tag */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xs sm:text-sm text-zinc-500 tracking-wider uppercase font-semibold font-mono pt-4"
        >
          Engineering Business Value &bull; Custom Code Standards &bull; Lead Conversion Optimization
        </motion.p>
      </div>
    </section>
  );
}
