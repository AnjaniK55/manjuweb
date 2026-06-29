import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const defaultTestimonials = [
    {
      name: "Sarah Jenkins",
      role: "CTO",
      company: "Apex Healthcare Solutions",
      location: "New York, USA",
      avatarText: "SJ",
      text: "Manju Web Agency's full-stack expertise completely transformed our platform's performance. They refactored our core React frontend and PostgreSQL databases, cutting dashboard loading times down to sub-second speeds. An absolute elite freelance partner.",
      rating: 5
    },
    {
      name: "Hiroshi Tanaka",
      role: "Director of Engineering",
      company: "Quantum AI Labs",
      location: "Tokyo, Japan",
      avatarText: "HT",
      text: "We contracted Manju Web Agency to architect a real-time Go-based telemetry dashboard. The speed, security, and cleanliness of their code exceeded our expectations. They have excellent command over microservices, and their communication across time zones was seamless.",
      rating: 5
    },
    {
      name: "Clara Dupont",
      role: "E-Commerce Director",
      company: "Nouveau Mode",
      location: "Paris, France",
      avatarText: "CD",
      text: "Transitioning to a headless Shopify storefront was a daunting task, but Manju Web Agency made it seamless. They designed a lightning-fast frontend that improved our checkouts by 18% and automated our product synchronization workflows. Uncompromising quality.",
      rating: 5
    }
  ];

  const [testimonialsList, setTestimonialsList] = React.useState(defaultTestimonials);

  React.useEffect(() => {
    const handleUpdate = () => {
      fetch(`${API_URL}/testimonials`)
        .then(res => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then(data => {
          if (data && data.length > 0) {
            setTestimonialsList(data);
          } else {
            setTestimonialsList(defaultTestimonials);
          }
        })
        .catch(() => {
          setTestimonialsList(defaultTestimonials);
        });
    };
    handleUpdate();
    window.addEventListener('agency_content_updated', handleUpdate);
    return () => window.removeEventListener('agency_content_updated', handleUpdate);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonialsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonialsList.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-28 px-6 md:px-12 bg-[#050507] border-t border-white/5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-gold-500"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">Testimonials</span>
            <span className="w-8 h-[1px] bg-gold-500"></span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Trusted By International <br />
            <span className="text-gold-gradient font-display">Technology Leaders</span>
          </h2>
        </div>

        {/* Carousel Frame */}
        <div className="relative glass-panel p-8 sm:p-14 rounded-3xl border border-white/5 glow-border-gold max-w-4xl mx-auto shadow-2xl">
          {/* Quote Icon Overlay */}
          <div className="absolute top-6 right-8 text-gold-500/10 pointer-events-none">
            <Quote className="w-24 h-24 stroke-[1px]" />
          </div>

          <div className="relative min-h-[220px] flex flex-col justify-between">
            
            {/* Sliding Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonialsList[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <blockquote className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed mb-8 italic">
                  "{testimonialsList[activeIndex].text}"
                </blockquote>

                {/* Client Profile */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-sm font-bold text-gold-500 font-display">
                    {testimonialsList[activeIndex].avatarText}
                  </div>
                  <div>
                    <cite className="not-italic text-sm font-semibold text-white block">
                      {testimonialsList[activeIndex].name}
                    </cite>
                    <span className="text-xs text-zinc-500 font-light">
                      {testimonialsList[activeIndex].role}, {testimonialsList[activeIndex].company} &bull; {testimonialsList[activeIndex].location}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between sm:justify-end gap-4 mt-8 pt-6 border-t border-zinc-900/60">
              <span className="text-xs font-mono text-zinc-600 sm:mr-4">
                {String(activeIndex + 1).padStart(2, '0')} / {String(testimonialsList.length).padStart(2, '0')}
              </span>
              
              <div className="flex gap-2">
                <button
                  id="testimonial-prev-btn"
                  onClick={handlePrev}
                  className="p-2.5 rounded-full transition-all cursor-pointer button-secondary-custom"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  id="testimonial-next-btn"
                  onClick={handleNext}
                  className="p-2.5 rounded-full transition-all cursor-pointer button-secondary-custom"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
