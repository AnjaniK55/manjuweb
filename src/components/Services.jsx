import React, { useEffect, useState } from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

export default function Services() {
  const [services, setServices] = useState([]);

  const defaultWebDev = [
    {
      id: "service-web-dev",
      category: "webDevelopment",
      icon: "Globe",
      title: "Business Websites",
      description: "High-end corporate websites and landing pages built for extreme speed, visual prestige, and search engine domination.",
      features: [
        "Headless CMS Integration (Strapi, Sanity)",
        "Flawless Mobile Responsive Layouts",
        "Next.js Static Site Generation (SSG)",
        "Strict Search Engine Optimization (SEO)"
      ]
    },
    {
      id: "service-web-apps",
      category: "webDevelopment",
      icon: "Cpu",
      title: "Web Applications",
      description: "Robust, custom-built software architectures and SaaS applications designed to handle thousands of concurrent operations.",
      features: [
        "Stateful React / Redux Frontends",
        "Fast REST & GraphQL API Design",
        "Scalable Server Frameworks (Node, Express)",
        "Database Query Optimization & Safety"
      ]
    },
    {
      id: "service-ecommerce",
      category: "webDevelopment",
      icon: "ShoppingBag",
      title: "E-commerce Solutions",
      description: "Bespoke digital storefronts and sales pipelines that provide friction-free checkout workflows and automate back-office operations.",
      features: [
        "Shopify Headless or Custom Storefronts",
        "Stripe, PayPal, and Apple Pay Integration",
        "Real-time Inventory & Shipping Sync",
        "Optimized Multi-step Checkout Funnels"
      ]
    }
  ];

  const defaultCreative = [
    {
      id: "service-video",
      category: "creative",
      icon: "Video",
      title: "Professional Video Editing",
      description: "Professional video editing solutions and motion graphics for businesses, brands, and marketing campaigns.",
      features: [
        "Promotional Videos & Commercials",
        "Social Media Reels & Shorts Dynamic Cuts",
        "Product Advertisements & Mockups",
        "Motion Graphics & Fluid Transitions"
      ]
    },
    {
      id: "service-ai-graphics",
      category: "creative",
      icon: "Palette",
      title: "AI Image Creation & Design",
      description: "Custom AI generated visual assets and premium graphic designs optimized for marketing campaigns.",
      features: [
        "Midjourney / DALL-E Generative Prompts",
        "Social Media Brand Assets",
        "Bespoke Website Custom Illustration",
        "Marketing Banner Graphics"
      ]
    },
    {
      id: "service-marketing-visuals",
      category: "creative",
      icon: "Sparkles",
      title: "Marketing Visuals & Identity",
      description: "Premium visual strategies, logo packages, and visual brand assets that differentiate businesses from competitors.",
      features: [
        "Vector Logo & Visual Guidelines",
        "Newsletter Templates Design",
        "Slide Decks & Pitch Presentations",
        "Custom SVG Illustrations"
      ]
    }
  ];

  useEffect(() => {
    const handleUpdate = () => {
      fetch('http://localhost:5000/api/services')
        .then(res => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then(data => {
          if (data && data.length > 0) {
            setServices(data);
          } else {
            setServices([...defaultWebDev, ...defaultCreative]);
          }
        })
        .catch(() => {
          setServices([...defaultWebDev, ...defaultCreative]);
        });
    };

    handleUpdate();
    window.addEventListener('agency_content_updated', handleUpdate);
    return () => window.removeEventListener('agency_content_updated', handleUpdate);
  }, []);

  const webDevelopmentServices = services.filter(s => s.category === 'webDevelopment');
  const creativeSolutions = services.filter(s => s.category === 'creative');

  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName] || Icons.HelpCircle;
    return <IconComponent className="w-6 h-6 text-gold-500 transition-transform duration-300" />;
  };

  const ArrowUpRight = Icons.ArrowUpRight;

  return (
    <section id="services" className="py-28 px-6 md:px-12 bg-[#050507] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-gold-500"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">Digital Solutions</span>
            <span className="w-8 h-[1px] bg-gold-500"></span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Bespoke Services Engineered <br />
            <span className="text-gold-gradient font-display">For Global Impact</span>
          </h2>
          
          <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed">
            We build solid, scalable systems and deliver polished user interfaces. Standard tools, modern design guidelines, and clean code are built into every layer.
          </p>
        </div>

        {/* Web Development Section */}
        {webDevelopmentServices.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-2.5 h-2.5 rounded-full bg-gold-500"></span>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">Web Development</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {webDevelopmentServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ y: -8, scale: 1.015, boxShadow: "var(--shadow-md)" }}
                  className="glass-panel p-8 md:p-10 rounded-3xl border border-white/5 glow-border-gold flex flex-col justify-between group bg-zinc-950/20 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:border-gold-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        {renderIcon(service.icon)}
                      </div>
                      <a 
                        href="#contact" 
                        className="text-zinc-650 hover:text-gold-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                        title={`Inquire about ${service.title}`}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-4">
                      {service.title}
                    </h4>
                    
                    <p className="text-sm text-zinc-400 font-light leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {service.features && (
                      <ul className="space-y-3.5 mb-8">
                        {service.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-center gap-3 text-xs text-zinc-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="pt-6 border-t border-zinc-900/60 mt-auto">
                    <a 
                      href="#contact" 
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-500 hover:text-zinc-100 transition-colors"
                    >
                      Configure Solution
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Creative Solutions Section */}
        {creativeSolutions.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-2.5 h-2.5 rounded-full bg-gold-500"></span>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">Creative Solutions</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {creativeSolutions.map((service, index) => (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ y: -8, scale: 1.015, boxShadow: "var(--shadow-md)" }}
                  className="glass-panel p-8 md:p-10 rounded-3xl border border-white/5 glow-border-gold flex flex-col justify-between group bg-zinc-950/20 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:border-gold-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        {renderIcon(service.icon)}
                      </div>
                      <a 
                        href="#contact" 
                        className="text-zinc-650 hover:text-gold-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                        title={`Inquire about ${service.title}`}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-4">
                      {service.title}
                    </h4>
                    
                    <p className="text-sm text-zinc-400 font-light leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {service.features && (
                      <ul className="space-y-3.5 mb-8">
                        {service.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-center gap-3 text-xs text-zinc-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="pt-6 border-t border-zinc-900/60 mt-auto">
                    <a 
                      href="#contact" 
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-500 hover:text-zinc-100 transition-colors"
                    >
                      Configure Solution
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Consulting CTA */}
        <div className="mt-16 text-center">
          <p className="text-xs text-zinc-500">
            Need a custom combination of backend API integration, complex frontend state, and AWS deployment? 
            <a href="#contact" className="text-gold-500 hover:underline ml-1.5 font-medium">
              Schedule a technical consultation →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
