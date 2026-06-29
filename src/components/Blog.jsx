import React, { useState } from 'react';
import { BookOpen, Search, Clock, ArrowRight, X, Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = ['All', 'Architecture', 'Frontend', 'Backend', 'Database'];

  const defaultArticles = [
    {
      id: 1,
      title: "Scaling Next.js App Router to 5M Daily Inquiries",
      category: "Frontend",
      readTime: "6 min read",
      date: "June 25, 2026",
      summary: "An in-depth review of layout caching headers, ISR pipelines, and server component memory pooling on AWS Amplify infrastructures.",
      content: "Next.js App Router introduces powerful server component architectures, but high concurrent load requests require strategic cache strategies. By configuring stale-while-revalidate headers at the CDN edge and leveraging incremental static regeneration, we decreased our server loads by 75% for custom dashboard builds. In this article, we map the routing parameters and database pool controls that prevent cluster scaling crashes.",
      related: [2, 3]
    },
    {
      id: 2,
      title: "Spring Boot OAuth2 SSO Security Orchestration",
      category: "Backend",
      readTime: "8 min read",
      date: "May 18, 2026",
      summary: "How to configure double-token JWT validations, dynamic role authorities, and stateless session scopes for microservices.",
      content: "Security is non-negotiable for enterprise SaaS systems. Using Spring Security paired with JWT tokens, we built a zero-session trust architecture that validates routing claims in under 5ms. We cover dynamic user scopes, database authority caching, and configuring fallback filters to isolate malicious clients automatically.",
      related: [1, 4]
    },
    {
      id: 3,
      title: "PostgreSQL Database Partitioning Patterns for High-Scale Shops",
      category: "Database",
      readTime: "5 min read",
      date: "April 12, 2026",
      summary: "A practical guide to time-series table partition structures, automated log archives, and query index performance audits.",
      content: "When tables cross 50 million records, standard query lookups stall. By partitioning the sales database by transaction months and indexing search coordinates, we reduced lookup metrics from 8.4 seconds down to 210ms. Here is the step-by-step SQL migration checklist.",
      related: [1, 2]
    },
    {
      id: 5,
      title: "Architecting Zero-Trust APIs for High-Load Enterprises",
      category: "Architecture",
      readTime: "7 min read",
      date: "March 20, 2026",
      summary: "A deep dive into building decentralized API security with key-rotation triggers, client rate-limiting nodes, and token claims validation.",
      content: "Zero-trust environments require constant verification. In this technical review, we document the implementation of OAuth2 authorization scopes, client-side signature checks, and JWT access tokens with Redis caching to authorize microservices in under 2ms. We examine configuration pipelines that handle up to 10k concurrent authorization handshakes safely.",
      related: [2, 7]
    },
    {
      id: 6,
      title: "Optimizing Redis Memory Spikes in Event-Driven Systems",
      category: "Database",
      readTime: "5 min read",
      date: "February 14, 2026",
      summary: "Resolving memory exhaustion crashes in high-throughput event buses using eviction pipelines and binary payload structures.",
      content: "High frequency message buses can quickly exhaust Redis memory if data structures are not optimized. By switching from standard JSON strings to binary Protocol Buffers and configuring volatile-lru memory eviction models, we cut active memory overhead by 68%. This guide walks through configuring payload schemas and tuning Redis settings for zero-data-loss streaming.",
      related: [3, 7]
    },
    {
      id: 7,
      title: "Designing Smooth Web UIs with Custom GPU Shaders",
      category: "Frontend",
      readTime: "6 min read",
      date: "January 10, 2026",
      summary: "Creating premium interactive 3D elements and background distortions with WebGL shaders and smooth linear interpolation.",
      content: "To stand out as a top 1% developer, generic CSS animations are not enough. We implement custom vertex and fragment shaders using WebGL/Three.js to render premium interactive backgrounds with mouse-movement parallax. We cover math controls, viewport scaling ratios, and frame rate optimization techniques that keep browser rendering at a solid 60fps.",
      related: [1, 5]
    },
    {
      id: 4,
      title: "Managing Connection Pools in Node.js Microservices",
      category: "Backend",
      readTime: "4 min read",
      date: "March 05, 2026",
      summary: "Preventing thread exhaustion and memory leaks when integrating third-party rate-limited checkout endpoints.",
      content: "Thread pooling anomalies can silently crash Node microservices under high sales surges. We explore cluster configurations, rate-limiting handlers using Redis buffers, and dynamic keep-alive settings that ensure backend connections stay reliable under traffic bursts.",
      related: [2, 6]
    }
  ];

  const [articles, setArticles] = React.useState(defaultArticles);

  React.useEffect(() => {
    const handleUpdate = () => {
      fetch('http://localhost:5000/api/articles')
        .then(res => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then(data => {
          if (data && data.length > 0) {
            setArticles(data);
          } else {
            setArticles(defaultArticles);
          }
        })
        .catch(() => {
          setArticles(defaultArticles);
        });
    };
    handleUpdate();
    window.addEventListener('agency_content_updated', handleUpdate);
    return () => window.removeEventListener('agency_content_updated', handleUpdate);
  }, []);

  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <section id="blog" className="py-28 px-6 md:px-12 bg-[#050507] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-gold-500"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">Developer Insights</span>
            <span className="w-8 h-[1px] bg-gold-500"></span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Case Studies, Tech Guides & <br />
            <span className="text-gold-gradient font-display">Systems Engineering</span>
          </h2>
          
          <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed">
            We document actual challenges and solutions encountered when building high-performance products for our clients.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12 max-w-5xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-gold-400 to-gold-600 border-transparent text-black shadow-lg shadow-gold-500/25'
                    : 'bg-zinc-900/40 border-white/5 text-zinc-450 hover:text-zinc-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900/60 border border-white/5 focus:border-gold-500 text-xs text-white placeholder-zinc-650 transition-colors focus:outline-none"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredArticles.map((art) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-8 rounded-3xl border border-white/5 glow-border-gold flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-4">
                  <span>{art.date}</span>
                  <span className="px-2.5 py-0.5 rounded bg-gold-500/10 text-gold-500 uppercase tracking-widest font-bold">
                    {art.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gold-500 transition-colors leading-snug">
                  {art.title}
                </h3>
                
                <p className="text-xs text-zinc-400 leading-relaxed font-light mb-6">
                  {art.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                <span className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
                  <Clock className="w-3.5 h-3.5" />
                  {art.readTime}
                </span>
                
                <button
                  onClick={() => setActiveArticle(art)}
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-500 hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results Fallback */}
        {filteredArticles.length === 0 && (
          <div className="py-24 text-center rounded-3xl border border-white/5 bg-zinc-950/40 text-xs text-zinc-500 font-mono max-w-5xl mx-auto">
            No matching engineering guides found. Try another query.
          </div>
        )}

      </div>

      {/* Full Article Modal Reading View */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-white/5 p-8 sm:p-12 relative shadow-2xl custom-scrollbar"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-xl text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/60 border border-white/5 cursor-pointer transition-all"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500 pt-4">
                  <span>{activeArticle.date}</span>
                  <span className="px-2.5 py-0.5 rounded bg-gold-500/10 text-gold-500 uppercase tracking-widest font-bold">
                    {activeArticle.category}
                  </span>
                  <span>&bull;</span>
                  <span>{activeArticle.readTime}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight font-display">
                  {activeArticle.title}
                </h3>

                <p className="text-zinc-400 font-light leading-relaxed border-l-2 border-gold-500 pl-4 py-1 italic text-sm">
                  "{activeArticle.summary}"
                </p>

                <div className="text-sm text-zinc-350 leading-relaxed font-light pt-4 space-y-4 border-t border-white/5">
                  <p>{activeArticle.content}</p>
                  <p>In upcoming releases, we'll continue analyzing metrics telemetry frameworks and gRPC pipelines. Be sure to check the code repository links or get in touch for custom architecture consultancies.</p>
                </div>

                {/* Related Articles Suggestions */}
                <div className="pt-8 border-t border-white/5 space-y-4">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 flex items-center gap-1.5 font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                    Related Engineering Insights
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeArticle.related.map(id => {
                      const rel = articles.find(a => a.id === id);
                      return (
                        <button
                          key={id}
                          onClick={() => setActiveArticle(rel)}
                          className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-gold-500/30 text-left cursor-pointer transition-colors block"
                        >
                          <h5 className="text-xs font-bold text-white leading-snug line-clamp-2">
                            {rel.title}
                          </h5>
                          <span className="text-[9px] font-mono text-gold-500 mt-2 block">{rel.category}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
