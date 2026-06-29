import React, { useState } from 'react';
import { ArrowUpRight, Code, Layout, Layers, Server, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GithubIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [liveDemoProject, setLiveDemoProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const defaultProjects = [
    {
      id: 1,
      title: "Nexus AI Agent Orchestrator",
      category: "Web Apps",
      description: "An enterprise-grade workspace that coordinates multi-agent LLM teams, Redis vector search pipelines, and distributed memory states.",
      image: "/analytics.png",
      tags: ["React", "Node.js", "Redis", "Vector DB", "WebSockets"],
      demoLink: "#",
      githubLink: "https://github.com/AnjaniK55",
      challenge: "Coordinating context sharing and execution workflows across 1,000+ autonomous AI agent threads concurrently without latency degradation.",
      solution: "Engineered transactional WebSocket event loops, decoupled task synchronization brokers, and in-memory Redis message queues.",
      impact: "Reduced multi-agent system state synchronization latency to under 12ms avg.",
      features: ["Multi-Agent Orchestrator Portal", "Real-time Event Streaming Logs", "Vector Embedding Sync Engines", "Secure User Role Keys"]
    },
    {
      id: 2,
      title: "Aura Fit Club Portal",
      category: "Websites",
      description: "A high-end luxury fitness club landing page and booking system featuring dynamic membership schedules, class reservation forms, and trainer directories.",
      image: "/aurafit.png",
      tags: ["React", "Tailwind CSS", "Framer Motion", "Vercel"],
      demoLink: "#",
      githubLink: "https://github.com/AnjaniK55",
      challenge: "Converting raw web traffic into high-value premium memberships and guest pass bookings for a luxury boutique fitness franchise.",
      solution: "Designed a visual-first dark themed user experience with clear benefit copy, floating chat assistant triggers, and seamless forms.",
      impact: "Boosted guest-pass capture rates by 40% within the first 30 days of implementation.",
      features: ["Custom Intake Form Validation", "Interactive Class Calendars", "Stripe payment integration gateways", "Responsive navigation layout"]
    },
    {
      id: 3,
      title: "Cognitive AI Suite",
      category: "Web Apps",
      description: "Deep learning model visualization dashboard offering real-time model accuracy analytics and telemetry nodes mapping.",
      image: "/analytics.png",
      tags: ["Go", "React", "Docker", "Redis", "WebSockets"],
      demoLink: "#",
      githubLink: "https://github.com/AnjaniK55",
      challenge: "Streaming real-time neural network node configurations and weights dynamically without lagging browser rendering engines.",
      solution: "Created highly optimized WebSocket handlers in Go, utilizing JSON-binary serialization protocols for frontend streams.",
      impact: "Allowed machine learning engineers to visualize model updates with less than 50ms latency response times.",
      features: ["Dynamic WebGL Visualizations", "Go WebSocket Stream Handlers", "Performance optimized CPU layouts", "Interactive nodes hover tools"]
    },
    {
      id: 4,
      title: "Vanguard Payment Suite",
      category: "Dashboards",
      description: "Multi-tenant B2B payments orchestrator allowing global startups to accept localized bank transfers securely.",
      image: "/dashboard.png",
      tags: ["React", "Express.js", "MongoDB", "OAuth 2.0", "Docker"],
      demoLink: "#",
      githubLink: "https://github.com/AnjaniK55",
      challenge: "Maintaining PCI-DSS compliance standards while creating custom routing endpoints for international accounts.",
      solution: "Abstracted payment payload inputs through verified sandbox containers, utilizing double-token JWT validations.",
      impact: "Processed $12M+ in cross-border settlements with zero security occurrences or database drift.",
      features: ["Sandbox execution toggles", "Double-token JWT authorization controls", "Multi-tenant merchant panels", "Auto-generating invoice exports"]
    },
    {
      id: 5,
      title: "Nouveau Marketplace",
      category: "E-commerce",
      description: "High-performance headless online fashion marketplace with instant search indexing and custom product grids.",
      image: "/ecommerce.png",
      tags: ["React", "Shopify API", "Node.js", "Tailwind CSS", "Vercel"],
      demoLink: "#",
      githubLink: "https://github.com/AnjaniK55",
      challenge: "Handling severe traffic surges during flash-sale launches without breaking DB connections or increasing response lags.",
      solution: "Designed static HTML pre-generation templates, serving images via CDN edge caching layers.",
      impact: "Maintained 100% server uptime during a high-profile influencer product launch event with 50,000+ concurrent visitors.",
      features: ["Instant category filtering structures", "Headless Shopify checkout APIs", "Dynamic shopping cart controllers", "CDN static page rendering optimizations"]
    },
    {
      id: 6,
      title: "Telemetry Log Engine",
      category: "Web Apps",
      description: "Secure cloud infrastructure log collector and analytics workspace highlighting immediate server error warning codes.",
      image: "/analytics.png",
      tags: ["Go", "React", "PostgreSQL", "AWS S3", "Tailwind CSS"],
      demoLink: "#",
      githubLink: "https://github.com/AnjaniK55",
      challenge: "Storing and query-searching terabytes of historical server errors efficiently while keeping search times low.",
      solution: "Implemented time-series table partition structures in PostgreSQL and automated older logs archival routines.",
      impact: "Reduced average log lookup times from 8.2 seconds down to 230 milliseconds.",
      features: ["PostgreSQL timescaled log partitions", "AWS S3 automated archival triggers", "Full-text query search consoles", "Mobile telemetry logs viewport"]
    },
    {
      id: 7,
      title: "Aether Decentralized Vector Engine",
      category: "Web Apps",
      description: "Distributed database query portal executing similarity searches across large dimensional AI embeddings.",
      image: "/analytics.png",
      tags: ["Rust", "React", "gRPC", "Kubernetes", "HNSW"],
      demoLink: "#",
      githubLink: "https://github.com/AnjaniK55",
      challenge: "Maintaining similarity query latencies under 5ms for datasets exceeding 100 million vector coordinates.",
      solution: "Implemented HNSW index partition algorithms in Rust, communicating via gRPC network streams to React dashboards.",
      impact: "Improved similarity query throughput by 300% compared to traditional vector database engines.",
      features: ["Similarity search interface portals", "Dynamic index rebuild timers", "Real-time coordinate maps", "Custom cluster health metrics"]
    },
    {
      id: 8,
      title: "Helios Cloud CDN Cache Router",
      category: "Dashboards",
      description: "Custom edge proxy routing dashboard displaying active traffic requests, cached hits ratios, and geo-ip coordinates.",
      image: "/dashboard.png",
      tags: ["React", "Express.js", "Redis", "GeoIP", "Chart.js"],
      demoLink: "#",
      githubLink: "https://github.com/AnjaniK55",
      challenge: "Visualizing live global request routing spikes and hit ratios across 20+ edge locations simultaneously.",
      solution: "Configured local cache databases utilizing dynamic Redis hashes synced via SSE event streams to Chart.js widgets.",
      impact: "Allowed cache administrators to identify invalidation bottlenecks inside 2 seconds.",
      features: ["Global geo-location telemetry plots", "Real-time edge cache invalidation controls", "Live chart update loops", "Detailed log level filtering consoles"]
    }
  ];

  const [projectsList, setProjectsList] = React.useState(defaultProjects);

  React.useEffect(() => {
    const handleUpdate = () => {
      fetch('http://localhost:5000/api/projects')
        .then(res => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then(data => {
          if (data && data.length > 0) {
            setProjectsList(data);
          } else {
            setProjectsList(defaultProjects);
          }
        })
        .catch(() => {
          setProjectsList(defaultProjects);
        });
    };
    handleUpdate();
    window.addEventListener('agency_content_updated', handleUpdate);
    return () => window.removeEventListener('agency_content_updated', handleUpdate);
  }, []);

  const filteredProjects = projectsList.filter(proj => {
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || proj.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <section id="projects" className="py-28 px-6 md:px-12 bg-[#050507] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-gold-500"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">Portfolio</span>
            <span className="w-8 h-[1px] bg-gold-500"></span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Engineered Excellence Shipped <br />
            <span className="text-gold-gradient font-display">To Production Environments</span>
          </h2>
          
          <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed">
            A selective showcase of six high-performance platforms designed, developed, and deployed for global clients.
          </p>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12 max-w-6xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {['All', 'Websites', 'Web Apps', 'E-commerce', 'Dashboards'].map((cat, idx) => (
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
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-650" />
            <input
              type="text"
              placeholder="Search projects by tech/name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/60 border border-white/5 focus:border-gold-500 text-xs text-white placeholder-zinc-650 transition-colors focus:outline-none"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.015, boxShadow: "var(--shadow-md)" }}
              className="glass-panel rounded-3xl overflow-hidden border border-white/5 glow-border-gold flex flex-col h-full group bg-zinc-950/20 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden bg-zinc-900 border-b border-white/5">
                <img 
                  src={project.image} 
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60"></div>
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border project-badge">
                  {project.category}
                </span>
              </div>

              {/* Text Body */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white mb-2.5">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-400 bg-zinc-900/60 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-500 bg-zinc-900/30">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Card CTA Actions */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                  <button 
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-500 hover:text-zinc-100 transition-colors cursor-pointer"
                  >
                    View Case Study
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Case Study Modal Overlays */}
        <AnimatePresence>
          {activeProject && (
            <div 
              id="project-modal"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-full max-w-4xl glass-panel rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl relative"
              >
                {/* Modal header image */}
                <div className="relative h-48 sm:h-64 overflow-hidden bg-zinc-900">
                  <img 
                    src={activeProject.image} 
                    alt={activeProject.title} 
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
                  <button 
                    id="close-modal-btn"
                    onClick={() => setActiveProject(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-zinc-950/80 border border-zinc-800 hover:border-gold-500 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
                    aria-label="Close Case Study Details"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-6 left-6 sm:left-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border project-badge">
                      {activeProject.category}
                    </span>
                    <h3 className="text-xl sm:text-3xl font-extrabold text-white mt-3">
                      {activeProject.title}
                    </h3>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 sm:p-10 max-h-[60vh] overflow-y-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Main description columns */}
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-2">Overview</h4>
                        <p className="text-sm text-zinc-300 font-light leading-relaxed">
                          {activeProject.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-900">
                          <h5 className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                            The Challenge
                          </h5>
                          <p className="text-xs text-zinc-400 leading-relaxed font-light">
                            {activeProject.challenge}
                          </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-900">
                          <h5 className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            The Solution
                          </h5>
                          <p className="text-xs text-zinc-400 leading-relaxed font-light">
                            {activeProject.solution}
                          </p>
                        </div>
                      </div>

                      {activeProject.features && (
                        <div className="pt-6 border-t border-white/5 space-y-3">
                          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-500">Core Features Built</h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300 font-light">
                            {activeProject.features.map((feat, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Meta info column */}
                    <div className="space-y-6 lg:border-l lg:border-zinc-900 lg:pl-8">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">Key Outcomes</h4>
                        <div className="p-4 rounded-xl bg-gold-500/5 border border-gold-500/10">
                          <p className="text-xs text-gold-200 font-medium leading-relaxed">
                            {activeProject.impact}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">Technologies Stack</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {activeProject.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex} 
                              className="px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-300 bg-zinc-900 border border-zinc-850"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-zinc-900 flex items-center gap-4">
                        <button 
                          id={`modal-demo-btn-${activeProject.id}`}
                          onClick={() => setLiveDemoProject(activeProject)}
                          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 hover:from-white hover:to-white text-black font-semibold text-xs uppercase tracking-wider text-center transition-all duration-300 cursor-pointer"
                        >
                          Launch Demo
                        </button>
                        <a 
                          id={`modal-github-btn-${activeProject.id}`}
                          href={activeProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl transition-all button-secondary-custom"
                          title="View Repository"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Full-screen Simulated Browser Live Demo */}
        <AnimatePresence>
          {liveDemoProject && (
            <div 
              id="live-demo-modal"
              className="fixed inset-0 z-[60] flex flex-col bg-zinc-950/95 backdrop-blur-lg p-4 sm:p-8"
            >
              {/* Browser Chrome Header */}
              <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-4 p-4.5 bg-zinc-900/80 backdrop-blur-md border-t border-x border-white/5 rounded-t-3xl shadow-2xl">
                {/* Left: Window Dots */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setLiveDemoProject(null)} 
                    className="w-3.5 h-3.5 rounded-full bg-red-500 hover:opacity-80 transition-opacity cursor-pointer border-none"
                    aria-label="Close Preview"
                  ></button>
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-500"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500"></div>
                </div>

                {/* Center: Address Bar */}
                <div className="flex-grow max-w-xl mx-auto flex items-center justify-between px-4 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-400 font-mono select-none">
                  <span className="truncate">https://{liveDemoProject.title.toLowerCase().replace(/\s+/g, '-')}.manjuwebagency.com</span>
                  <span className="text-[10px] text-emerald-400 font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10">SECURE</span>
                </div>

                {/* Right: Exit / Return CTA */}
                <button
                  onClick={() => setLiveDemoProject(null)}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer button-secondary-custom"
                >
                  Exit Preview
                </button>
              </div>

              {/* Browser Body (Scrollable Mockup) */}
              <div className="w-full max-w-6xl mx-auto flex-grow overflow-y-auto bg-zinc-950 border-b border-x border-white/5 rounded-b-3xl shadow-2xl relative custom-scrollbar">
                {/* Floating Banner */}
                <div className="sticky top-0 left-0 w-full z-10 px-6 py-2.5 bg-gold-500/10 border-b border-gold-500/20 backdrop-blur-md flex items-center justify-between text-xs text-gold-300">
                  <span>🖥️ Interactive Mock Browser Preview: Scroll down to view full project layout.</span>
                  <button 
                    onClick={() => setLiveDemoProject(null)}
                    className="underline hover:text-zinc-100 font-medium cursor-pointer"
                  >
                    Back to Case Study
                  </button>
                </div>

                {/* Full Image */}
                <div className="w-full">
                  <img 
                    src={liveDemoProject.image} 
                    alt={liveDemoProject.title} 
                    loading="lazy"
                    className="w-full h-auto object-contain select-none"
                  />
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>



      </div>
    </section>
  );
}
