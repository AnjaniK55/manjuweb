import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 500); 
          }, 400);
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + step, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#050507] flex flex-col items-center justify-center font-sans"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.05),rgba(255,255,255,0))] pointer-events-none"></div>

          <div className="text-center space-y-8 z-10 relative">
            {/* Spinning/glowing logo ring */}
            <div className="relative w-20 h-20 mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                className="w-full h-full rounded-3xl border-2 border-dashed border-gold-500/30"
              />
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute inset-2 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-600 shadow-lg shadow-gold-500/20 flex items-center justify-center"
              >
                <span className="text-black font-extrabold text-lg tracking-wider font-display">M</span>
              </motion.div>
            </div>

            {/* Title & percentage */}
            <div className="space-y-2">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-[0.25em] font-display">
                MANJUWEBAGENCY
              </h2>
              <div className="flex items-center justify-center gap-1.5 text-zinc-550 text-[10px] font-mono">
                <span>SYSTEM INTIALIZATION</span>
                <span className="text-gold-500 font-bold">{progress}%</span>
              </div>
            </div>

            {/* Custom Progress Bar */}
            <div className="w-56 h-1 bg-zinc-900 rounded-full overflow-hidden mx-auto border border-white/5 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
