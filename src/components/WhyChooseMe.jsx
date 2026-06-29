import { Code2, Briefcase, Smartphone, Gauge, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyChooseMe() {
  const values = [
    {
      icon: <Code2 className="w-6 h-6 text-gold-500" />,
      title: "Clean Modern Development",
      description: "We follow elite industry-standard practices, constructing highly modular, readable, and documentation-rich code architectures that make scaling a breeze."
    },
    {
      icon: <Briefcase className="w-6 h-6 text-gold-500" />,
      title: "Business-Focused Solutions",
      description: "We align engineering decisions with your corporate objectives. We don't just ship code; we deliver high-converting pipelines and automate bottlenecks."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-gold-500" />,
      title: "Responsive Design",
      description: "Flawless mobile-first visual execution that captivates international clients on every viewport size with smooth layouts."
    },
    {
      icon: <Gauge className="w-6 h-6 text-gold-500" />,
      title: "Performance Optimized",
      description: "We optimize loading speeds and minimize bundles to score 95+ on Google PageSpeed Insights, boosting conversion metrics."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-gold-500" />,
      title: "Professional Communication",
      description: "Seamless daily progress reporting, asynchronous updates across time zones, and transparent engineering timelines."
    }
  ];

  return (
    <section id="why-me" className="py-28 px-6 md:px-12 bg-[#050507] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-gold-500"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">Values & Standards</span>
            <span className="w-8 h-[1px] bg-gold-500"></span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Engineering Code That <br />
            <span className="text-gold-gradient font-display">Drives Business Growth</span>
          </h2>
          
          <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed">
            We hold our work to elite standards. Every single project is engineered from scratch with performance, visual prestige, and long-term scalability in mind.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-panel p-8 md:p-10 rounded-3xl border border-white/5 glow-border-gold transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center mb-6 group-hover:border-gold-500/30 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
