import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, Sparkles, Globe, ShoppingBag, 
  Cpu, Check, ArrowRight, Monitor, Video, ImageIcon, 
  Loader2, RefreshCw, Layers, DollarSign, Zap, HelpCircle, Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = 'http://localhost:5000/api';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'tools'
  const [conversation, setConversation] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState('greeting');
  const [textInput, setTextInput] = useState('');
  
  // Smart Tools UI States
  const [nicheInput, setNicheInput] = useState('');
  const [generatedIdea, setGeneratedIdea] = useState(null);
  
  const [growthCategory, setGrowthCategory] = useState('');
  const [growthTips, setGrowthTips] = useState(null);
  
  const [selectedTechProj, setSelectedTechProj] = useState('web-app');
  const [techStackRecommendation, setTechStackRecommendation] = useState(null);
  
  const [estScale, setEstScale] = useState('starter');
  const [estPages, setEstPages] = useState('1-5');
  const [estFeatures, setEstFeatures] = useState([]);
  const [estimationResult, setEstimationResult] = useState(null);

  const chatRef = useRef(null);

  // Lead data collected through conversation
  const [leadData, setLeadData] = useState({
    service: '',
    businessName: '',
    businessCategory: '',
    targetCustomers: '',
    mainGoal: '',
    requiredPages: '',
    needLogin: '',
    needPayment: '',
    needAdminPanel: '',
    name: '',
    email: '',
    whatsapp: '',
    budget: '',
    timeline: ''
  });

  const services = [
    { label: "Business Website", value: "Business Website", icon: <Globe className="w-4 h-4" /> },
    { label: "E-commerce Website", value: "E-commerce Website", icon: <ShoppingBag className="w-4 h-4" /> },
    { label: "Web Application", value: "Web Application", icon: <Cpu className="w-4 h-4" /> },
    { label: "Admin Dashboard", value: "Admin Dashboard", icon: <Monitor className="w-4 h-4" /> },
    { label: "Video Editing", value: "Video Editing", icon: <Video className="w-4 h-4" /> },
    { label: "AI Image Creation", value: "AI Image Creation", icon: <ImageIcon className="w-4 h-4" /> }
  ];

  const budgetOptions = ["Starter ($500 - $1,500)", "Professional ($1,500 - $5,000)", "Enterprise ($5,000+)"];
  const timelineOptions = ["2-4 Weeks", "1-2 Months", "Custom / Flexible"];

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversation, isTyping, activeTab]);

  // Load chat session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('manju_assistant_session');
    if (savedSession) {
      try {
        const { savedConv, savedStep, savedLead } = JSON.parse(savedSession);
        setConversation(savedConv || []);
        setCurrentStep(savedStep || 'greeting');
        setLeadData(savedLead || {});
      } catch (e) {
        localStorage.removeItem('manju_assistant_session');
      }
    }
  }, []);

  // Save chat session on update
  const saveSessionToStorage = (conv, step, lead) => {
    localStorage.setItem('manju_assistant_session', JSON.stringify({
      savedConv: conv,
      savedStep: step,
      savedLead: lead
    }));
  };

  const getFormattedTime = () => {
    const d = new Date();
    let hrs = d.getHours();
    let mins = d.getMinutes();
    const ampm = hrs >= 12 ? 'PM' : 'AM';
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12;
    mins = mins < 10 ? '0' + mins : mins;
    return `${hrs}:${mins} ${ampm}`;
  };

  // Simulate bot typing delay then add message
  const botReply = (text, delay = 800) => {
    setIsTyping(true);
    return new Promise(resolve => {
      setTimeout(() => {
        setIsTyping(false);
        const updated = [...conversation, { sender: 'bot', text, time: getFormattedTime() }];
        setConversation(updated);
        saveSessionToStorage(updated, currentStep, leadData);
        resolve(updated);
      }, delay);
    });
  };

  const addUserMsg = (text) => {
    const updated = [...conversation, { sender: 'user', text, time: getFormattedTime() }];
    setConversation(updated);
    saveSessionToStorage(updated, currentStep, leadData);
    return updated;
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (conversation.length === 0) {
      setCurrentStep('greeting');
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const initMsg = [
            { 
              sender: 'bot', 
              text: "Hi 👋\nI am Manju AI Assistant.\nI can help you choose the right digital solution for your business.",
              time: getFormattedTime() 
            }
          ];
          setConversation(initMsg);
          setCurrentStep('service');
          saveSessionToStorage(initMsg, 'service', leadData);
        }, 1000);
      }, 200);
    }
  };

  const handleReset = () => {
    localStorage.removeItem('manju_assistant_session');
    setConversation([]);
    setLeadData({
      service: '', businessName: '', businessCategory: '', targetCustomers: '',
      mainGoal: '', requiredPages: '', needLogin: '', needPayment: '',
      needAdminPanel: '', name: '', email: '', whatsapp: '', budget: '', timeline: ''
    });
    setCurrentStep('greeting');
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const initMsg = [
          { 
            sender: 'bot', 
            text: "Chat reset! Let's start fresh. 😊\n\nWhat digital solution do you need?",
            time: getFormattedTime() 
          }
        ];
        setConversation(initMsg);
        setCurrentStep('service');
        saveSessionToStorage(initMsg, 'service', leadData);
      }, 800);
    }, 100);
  };

  const handleQuickAction = (action) => {
    if (action === 'consult') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action === 'portfolio') {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    } else if (action === 'quote' || action === 'start') {
      handleReset();
    }
  };

  const handleServiceSelect = async (service) => {
    const updatedConv = addUserMsg(service.label);
    const updatedLead = { ...leadData, service: service.value };
    setLeadData(updatedLead);
    setCurrentStep('waiting');
    saveSessionToStorage(updatedConv, 'waiting', updatedLead);

    await botReply(`Great choice! ${service.label} is one of our specialty fields. Let me collect a few details to structure the ideal project concept. 🚀\n\nWhat is your business or company name?`, 900);
    setCurrentStep('businessName');
    saveSessionToStorage([...updatedConv, { sender: 'bot', text: `Great choice! ${service.label} is one of our specialty fields. Let me collect a few details to structure the ideal project concept. 🚀\n\nWhat is your business or company name?`, time: getFormattedTime() }], 'businessName', updatedLead);
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    const value = textInput.trim();
    if (!value) return;
    setTextInput('');

    const updatedConv = addUserMsg(value);
    let updatedLead = { ...leadData };

    switch (currentStep) {
      case 'businessName':
        updatedLead.businessName = value;
        setLeadData(updatedLead);
        setCurrentStep('waiting');
        saveSessionToStorage(updatedConv, 'waiting', updatedLead);
        await botReply("What category or industry does your business operate in? (e.g. Retail, Real Estate, Health, SaaS)", 800);
        setCurrentStep('businessCategory');
        break;

      case 'businessCategory':
        updatedLead.businessCategory = value;
        setLeadData(updatedLead);
        setCurrentStep('waiting');
        saveSessionToStorage(updatedConv, 'waiting', updatedLead);
        await botReply("Who are your target customers or main audience?", 800);
        setCurrentStep('targetCustomers');
        break;

      case 'targetCustomers':
        updatedLead.targetCustomers = value;
        setLeadData(updatedLead);
        setCurrentStep('waiting');
        saveSessionToStorage(updatedConv, 'waiting', updatedLead);
        await botReply("What is the primary goal of your project? (e.g. Sell online, capture leads, automate tasks)", 800);
        setCurrentStep('mainGoal');
        break;

      case 'mainGoal':
        updatedLead.mainGoal = value;
        setLeadData(updatedLead);
        setCurrentStep('waiting');
        saveSessionToStorage(updatedConv, 'waiting', updatedLead);
        await botReply("How many pages or sections do you expect the project to have? (e.g. 5-10 pages)", 800);
        setCurrentStep('requiredPages');
        break;

      case 'requiredPages':
        updatedLead.requiredPages = value;
        setLeadData(updatedLead);
        setCurrentStep('waiting');
        saveSessionToStorage(updatedConv, 'waiting', updatedLead);
        await botReply("Do you need a secure user login/authentication system?", 700);
        setCurrentStep('needLogin');
        break;

      case 'name':
        updatedLead.name = value;
        setLeadData(updatedLead);
        setCurrentStep('waiting');
        saveSessionToStorage(updatedConv, 'waiting', updatedLead);
        await botReply(`Nice to meet you, ${value}! What is your email address so we can send the proposal details?`, 800);
        setCurrentStep('email');
        break;

      case 'email':
        if (!value.includes('@') || !value.includes('.')) {
          await botReply("That doesn't look like a valid email address. Could you double-check?", 600);
          setCurrentStep('email');
          return;
        }
        updatedLead.email = value;
        setLeadData(updatedLead);
        setCurrentStep('waiting');
        saveSessionToStorage(updatedConv, 'waiting', updatedLead);
        await botReply("Great! Lastly, what is your WhatsApp or phone number (with country code)?", 800);
        setCurrentStep('whatsapp');
        break;

      case 'whatsapp':
        updatedLead.whatsapp = value;
        setLeadData(updatedLead);
        setCurrentStep('waiting');
        saveSessionToStorage(updatedConv, 'waiting', updatedLead);
        await botReply("Excellent! Saving details and packaging your custom project brief now...", 900);
        
        // Save to backend DB
        await submitLeadToDB(updatedLead);
        setCurrentStep('done');
        break;

      default:
        break;
    }
  };

  const handleOptionSelect = async (field, choice) => {
    const updatedConv = addUserMsg(choice);
    const updatedLead = { ...leadData, [field]: choice };
    setLeadData(updatedLead);
    setCurrentStep('waiting');
    saveSessionToStorage(updatedConv, 'waiting', updatedLead);

    if (field === 'needLogin') {
      await botReply("Do you need integrated payment processing capabilities? (Stripe, Paypal, Apple Pay)", 700);
      setCurrentStep('needPayment');
    } else if (field === 'needPayment') {
      await botReply("Do you require an administrative portal to manage users or content?", 700);
      setCurrentStep('needAdminPanel');
    } else if (field === 'needAdminPanel') {
      // Generate AI Recommendation Box
      const recommendationText = generateRecommendation(updatedLead);
      await botReply(recommendationText, 1100);
      setCurrentStep('recommendationReview');
    } else if (field === 'recommendationApproved') {
      if (choice.includes('Perfect')) {
        await botReply("Awesome! Let's select your budget range.", 700);
        setCurrentStep('budget');
      } else {
        handleReset();
      }
    } else if (field === 'budget') {
      await botReply("Excellent! And what is your expected timeline?", 700);
      setCurrentStep('timeline');
    } else if (field === 'timeline') {
      await botReply("Perfect! To complete your custom quote proposal, please tell me your name.", 800);
      setCurrentStep('name');
    }
  };

  const generateRecommendation = (lead) => {
    let rec = `Based on your requirements, I've compiled a recommendation card for you:\n\n`;
    rec += `🛡️ **Solution:** Enterprise ${lead.service}\n`;
    rec += `⚙️ **Architecture Stack:** React + Node.js/Express + MongoDB\n\n`;
    rec += `**Included Core Features:**\n`;
    rec += `✓ Fully responsive theme-aware UI\n`;
    rec += `✓ SEO & Page Performance audits\n`;
    
    if (lead.needLogin === 'Yes') rec += `✓ JWT-based secure user authentication\n`;
    if (lead.needPayment === 'Yes') rec += `✓ Stripe payment checkout gateway\n`;
    if (lead.needAdminPanel === 'Yes') rec += `✓ content & analytics dashboard panel\n`;
    
    rec += `\nDoes this recommended structure look suitable to proceed?`;
    return rec;
  };

  const submitLeadToDB = async (lead) => {
    const history = conversation
      .map(m => `${m.sender === 'user' ? 'Visitor' : 'AI'}: ${m.text}`)
      .join('\n');

    const payload = {
      service: lead.service,
      name: lead.name,
      email: lead.email,
      whatsapp: lead.whatsapp,
      company: lead.businessName,
      description: `Business Category: ${lead.businessCategory}\nTarget Customer: ${lead.targetCustomers}\nGoals: ${lead.mainGoal}\nPages expected: ${lead.requiredPages}\nUser login needed: ${lead.needLogin}\nPayments integrated: ${lead.needPayment}\nAdmin panel needed: ${lead.needAdminPanel}`,
      budget: lead.budget,
      timeline: lead.timeline,
      status: 'New',
      notes: '',
      conversationHistory: history,
      timestamp: new Date().toISOString()
    };

    try {
      await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      // Fallback local storage
      const existing = JSON.parse(localStorage.getItem('saved_crm_leads') || '[]');
      localStorage.setItem('saved_crm_leads', JSON.stringify([...existing, { ...payload, id: Date.now() }]));
    }
  };

  // --- SMART TOOLS GENERATORS ---
  const handleGenerateIdea = () => {
    const niche = nicheInput.trim();
    if (!niche) return;
    
    const ideas = [
      {
        title: `${niche} Dynamic Connect`,
        concept: `A state-of-the-art landing page and booking system engineered with React.`,
        features: ["Real-time appointment scheduler", "Interactive pricing cards", "Client testimonials slider", "Automated SMS/Email reminders"]
      },
      {
        title: `${niche} Premium Flow`,
        concept: `Next-gen E-commerce storefront with headless CMS content syncing.`,
        features: ["Instant-search product filter", "Smooth sliding card checkout", "User dashboard order history", "Stripe payment flow integrations"]
      }
    ];

    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    setGeneratedIdea(randomIdea);
  };

  const handleGenerateGrowth = () => {
    if (!growthCategory) return;
    const suggestions = {
      retail: [
        "Implement cart recovery emails to boost completed sales by up to 15%.",
        "Enable one-click checkout flows to minimize friction.",
        "Add micro-interactions and trust badges to checkout grids."
      ],
      saas: [
        "Build a free sandbox dashboard preview for instant user engagement.",
        "Showcase real-world case studies and ROI calculations prominently.",
        "Set up an automated onboarding flow via email."
      ],
      service: [
        "Include a dynamic pricing configurator widget in the inquiry section.",
        "Embed client video testimonials or rating summaries.",
        "Add a Calendly or interactive calendar link to speed bookings."
      ]
    };
    setGrowthTips(suggestions[growthCategory] || suggestions['service']);
  };

  const handleGenerateTechStack = () => {
    const stacks = {
      'landing': {
        front: "Next.js / React (Static Site Generation)",
        back: "Node.js (Minimal Form handling)",
        db: "MongoDB / Supabase",
        host: "Vercel / Netlify"
      },
      'web-app': {
        front: "Vite + React (Redux state management)",
        back: "Node.js + Express.js APIs",
        db: "MongoDB (Mongoose models)",
        host: "AWS EC2 / DigitalOcean"
      },
      'ecommerce': {
        front: "Next.js App Router (Headless structure)",
        back: "Shopify Storefront API or Express server",
        db: "MongoDB / PostgreSQL",
        host: "Vercel + AWS S3"
      }
    };
    setTechStackRecommendation(stacks[selectedTechProj]);
  };

  const handleEstimateCost = () => {
    let base = 600;
    if (estScale === 'pro') base = 1800;
    if (estScale === 'enterprise') base = 4500;

    let pageMultiplier = 1;
    if (estPages === '5-15') pageMultiplier = 1.3;
    if (estPages === '15+') pageMultiplier = 1.8;

    let add = estFeatures.length * 200;
    const finalVal = Math.round((base * pageMultiplier) + add);
    setEstimationResult({
      range: `$${Math.round(finalVal * 0.9)} - $${Math.round(finalVal * 1.1)}`,
      hours: `${Math.round(finalVal / 45)} - ${Math.round(finalVal / 35)} hours`
    });
  };

  const toggleFeature = (feat) => {
    setEstFeatures(prev => 
      prev.includes(feat) ? prev.filter(f => f !== feat) : [...prev, feat]
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="w-[340px] sm:w-[400px] rounded-3xl bg-[#0a0a0f]/98 border border-white/[0.06] backdrop-blur-2xl shadow-[0_24px_80px_-12px_rgba(0,0,0,0.8)] overflow-hidden mb-4 chatbot-window"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#0f0f14] to-[#111118] border-b border-white/[0.04] chatbot-header">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl border border-white/[0.08] overflow-hidden bg-zinc-900 flex items-center justify-center p-0.5">
                  <img src="/chatbot_logo.png" alt="Manju Assistant" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-white tracking-tight">Manju AI Assistant</h4>
                  <span className="text-[10px] text-gold-500 font-medium flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold-500"></span>
                    </span>
                    AI Sales & Consulting bot
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={handleReset}
                  className="p-1.5 rounded-xl text-zinc-500 hover:text-zinc-100 hover:bg-white/5 transition-all cursor-pointer"
                  title="Reset Conversation"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl text-zinc-500 hover:text-zinc-100 hover:bg-white/5 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tab navigation */}
            <div className="flex border-b border-white/[0.04] bg-zinc-950/40">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2 text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  activeTab === 'chat'
                    ? 'text-gold-500 border-b border-gold-500 bg-gold-500/[0.02]'
                    : 'text-zinc-500 hover:text-zinc-350'
                }`}
              >
                AI Consultant
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`flex-1 py-2 text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  activeTab === 'tools'
                    ? 'text-gold-500 border-b border-gold-500 bg-gold-500/[0.02]'
                    : 'text-zinc-500 hover:text-zinc-350'
                }`}
              >
                Smart Tools
              </button>
            </div>

            {/* Smart shortcut buttons */}
            <div className="flex gap-1.5 px-4 py-2 overflow-x-auto border-b border-white/[0.02] bg-zinc-950/20 scrollbar-none">
              <button onClick={() => handleQuickAction('quote')} className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-white/5 text-[9px] font-bold text-zinc-400 hover:text-gold-500 transition-colors uppercase tracking-wider whitespace-nowrap cursor-pointer">Get Quote</button>
              <button onClick={() => handleQuickAction('start')} className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-white/5 text-[9px] font-bold text-zinc-400 hover:text-gold-500 transition-colors uppercase tracking-wider whitespace-nowrap cursor-pointer">Start Project</button>
              <button onClick={() => handleQuickAction('consult')} className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-white/5 text-[9px] font-bold text-zinc-400 hover:text-gold-500 transition-colors uppercase tracking-wider whitespace-nowrap cursor-pointer">Book Consultation</button>
              <button onClick={() => handleQuickAction('portfolio')} className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-white/5 text-[9px] font-bold text-zinc-400 hover:text-gold-500 transition-colors uppercase tracking-wider whitespace-nowrap cursor-pointer">View Portfolio</button>
            </div>

            {/* Tab Body */}
            {activeTab === 'chat' ? (
              <>
                {/* Chat Messages */}
                <div ref={chatRef} className="px-5 py-4 h-[300px] overflow-y-auto space-y-3.5 custom-scrollbar bg-zinc-950/20">
                  {conversation.map((msg, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className={`px-4 py-3 rounded-2xl text-[12.5px] leading-[1.6] max-w-[85%] whitespace-pre-line ${
                        msg.sender === 'user' 
                          ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-black font-semibold rounded-br-sm shadow-lg shadow-gold-500/10' 
                          : 'bg-white/[0.04] border border-white/[0.06] text-zinc-300 rounded-bl-sm chatbot-bot-bubble'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[8px] text-zinc-550 mt-1 font-mono">{msg.time}</span>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/[0.04] border border-white/[0.06] flex items-center gap-1.5 chatbot-bot-bubble">
                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Chat Footer */}
                <div className="px-4 py-3.5 bg-[#08080c] border-t border-white/[0.04] chatbot-footer">
                  {/* Service Selector */}
                  {currentStep === 'service' && (
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase font-bold tracking-[0.15em] text-zinc-500 block px-1">Choose Service Scope</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {services.map((svc, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleServiceSelect(svc)}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-gold-500/30 hover:bg-gold-500/[0.03] text-[11px] text-zinc-400 hover:text-zinc-100 transition-all cursor-pointer group chatbot-reply-btn"
                          >
                            <span className="text-gold-500/70 group-hover:text-gold-500 transition-colors">{svc.icon}</span>
                            <span className="truncate">{svc.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Standard Text Inputs */}
                  {['businessName', 'businessCategory', 'targetCustomers', 'mainGoal', 'requiredPages', 'name', 'email', 'whatsapp'].includes(currentStep) && (
                    <form onSubmit={handleTextSubmit} className="flex gap-2">
                      <input
                        type={currentStep === 'email' ? 'email' : 'text'}
                        required
                        placeholder={
                          currentStep === 'businessName' ? 'Enter business name...' :
                          currentStep === 'businessCategory' ? 'Industry: Retail, Real Estate...' :
                          currentStep === 'targetCustomers' ? 'e.g. young adults, homeowners...' :
                          currentStep === 'mainGoal' ? 'e.g. sell products, capture leads...' :
                          currentStep === 'requiredPages' ? 'e.g. 5 pages...' :
                          currentStep === 'name' ? 'Your name...' :
                          currentStep === 'email' ? 'your@email.com' :
                          'WhatsApp / Phone number...'
                        }
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        autoFocus
                        className="flex-1 px-4 py-2.5 text-[12px] rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-gold-500/40 focus:outline-none text-white placeholder-zinc-650 transition-colors chatbot-input"
                      />
                      <button
                        type="submit"
                        className="p-2.5 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 hover:from-white hover:to-white text-black transition-all cursor-pointer active:scale-95 shadow-lg shadow-gold-500/15"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  )}

                  {/* Yes/No Selectors */}
                  {['needLogin', 'needPayment', 'needAdminPanel'].includes(currentStep) && (
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase font-bold tracking-[0.15em] text-zinc-500 block px-1">Required Option</span>
                      <div className="flex gap-2">
                        {["Yes", "No"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleOptionSelect(currentStep, opt)}
                            className="flex-1 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-gold-500/30 hover:bg-gold-500/[0.03] text-xs font-semibold text-zinc-300 hover:text-zinc-100 transition-all cursor-pointer chatbot-reply-btn"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendation suit check */}
                  {currentStep === 'recommendationReview' && (
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase font-bold tracking-[0.15em] text-zinc-500 block px-1">Verify Strategy</span>
                      <div className="flex flex-col gap-1.5">
                        <button
                          onClick={() => handleOptionSelect('recommendationApproved', 'Looks Perfect! Let\'s continue')}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 text-black font-bold text-xs cursor-pointer shadow-lg active:scale-[0.98] transition-transform"
                        >
                          Looks Perfect! Let's continue
                        </button>
                        <button
                          onClick={() => handleOptionSelect('recommendationApproved', 'No, let\'s restart')}
                          className="w-full py-2 rounded-xl bg-white/5 border border-white/5 text-[11px] text-zinc-400 hover:text-zinc-100 cursor-pointer transition-colors"
                        >
                          No, let's restart
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Budget Selector */}
                  {currentStep === 'budget' && (
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase font-bold tracking-[0.15em] text-zinc-500 block px-1">Budget tier</span>
                      <div className="flex flex-col gap-1.5">
                        {budgetOptions.map((b) => (
                          <button
                            key={b}
                            onClick={() => handleOptionSelect('budget', b)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-gold-500/30 text-left text-xs text-zinc-300 hover:text-zinc-100 transition-all cursor-pointer chatbot-reply-btn"
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timeline Selector */}
                  {currentStep === 'timeline' && (
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase font-bold tracking-[0.15em] text-zinc-500 block px-1">Project Timeline</span>
                      <div className="flex gap-2">
                        {timelineOptions.map((t) => (
                          <button
                            key={t}
                            onClick={() => handleOptionSelect('timeline', t)}
                            className="flex-1 py-2.5 px-2 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-gold-500/30 text-[10.5px] text-zinc-300 hover:text-zinc-100 transition-all cursor-pointer chatbot-reply-btn whitespace-nowrap text-center"
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Done State */}
                  {currentStep === 'done' && (
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold px-1">
                        <Check className="w-4 h-4" />
                        <span>Consultation Brief Completed!</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 leading-normal pl-1">
                        Our consultant team will review your profile and reach out within 24 hours. Click "Book Call" to check availability.
                      </p>
                    </div>
                  )}

                  {/* Loading States */}
                  {['waiting', 'greeting'].includes(currentStep) && (
                    <div className="flex items-center justify-center py-2">
                      <Loader2 className="w-4 h-4 text-gold-500 animate-spin" />
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Smart Tools Tab Body */
              <div className="p-5 h-[415px] overflow-y-auto space-y-6 custom-scrollbar bg-zinc-950/20">
                
                {/* Website Idea Generator */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-gold-500 flex items-center gap-1.5 font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    Idea Generator
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Gym, Coffee Shop, Dentist..."
                      value={nicheInput}
                      onChange={(e) => setNicheInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-[11.5px] rounded-lg bg-zinc-950 border border-white/5 focus:outline-none focus:border-gold-500 text-white"
                    />
                    <button 
                      onClick={handleGenerateIdea}
                      className="px-3 rounded-lg bg-gold-500 text-black text-[11px] font-bold cursor-pointer"
                    >
                      Generate
                    </button>
                  </div>
                  {generatedIdea && (
                    <div className="pt-2.5 border-t border-white/5 space-y-1.5">
                      <h5 className="text-[11.5px] font-bold text-white">{generatedIdea.title}</h5>
                      <p className="text-[10.5px] text-zinc-400 leading-relaxed font-light">{generatedIdea.concept}</p>
                      <ul className="space-y-1">
                        {generatedIdea.features.map((f, i) => (
                          <li key={i} className="text-[9.5px] text-zinc-300 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-gold-500"></span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Tech Stack Selector */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-gold-500 flex items-center gap-1.5 font-mono">
                    <Layers className="w-3.5 h-3.5" />
                    Tech Recommendations
                  </span>
                  <div className="flex gap-2">
                    <select
                      value={selectedTechProj}
                      onChange={(e) => setSelectedTechProj(e.target.value)}
                      className="flex-1 px-2.5 py-2 text-[11.5px] rounded-lg bg-zinc-950 border border-white/5 text-zinc-300 focus:outline-none focus:border-gold-500"
                    >
                      <option value="landing">Business Landing Page</option>
                      <option value="web-app">SaaS / Web Application</option>
                      <option value="ecommerce">Headless E-commerce</option>
                    </select>
                    <button 
                      onClick={handleGenerateTechStack}
                      className="px-3 rounded-lg bg-gold-500 text-black text-[11px] font-bold cursor-pointer"
                    >
                      Show
                    </button>
                  </div>
                  {techStackRecommendation && (
                    <div className="pt-2.5 border-t border-white/5 grid grid-cols-2 gap-2 text-[9.5px] font-mono">
                      <div className="p-2 rounded bg-zinc-950 border border-white/5">
                        <span className="text-zinc-550 block">FRONTEND</span>
                        <span className="text-zinc-200">{techStackRecommendation.front}</span>
                      </div>
                      <div className="p-2 rounded bg-zinc-950 border border-white/5">
                        <span className="text-zinc-550 block">BACKEND</span>
                        <span className="text-zinc-200">{techStackRecommendation.back}</span>
                      </div>
                      <div className="p-2 rounded bg-zinc-950 border border-white/5">
                        <span className="text-zinc-550 block">DATABASE</span>
                        <span className="text-zinc-200">{techStackRecommendation.db}</span>
                      </div>
                      <div className="p-2 rounded bg-zinc-950 border border-white/5">
                        <span className="text-zinc-550 block">HOSTING</span>
                        <span className="text-zinc-200">{techStackRecommendation.host}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Business Growth Suggestions */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-gold-500 flex items-center gap-1.5 font-mono">
                    <Zap className="w-3.5 h-3.5" />
                    Growth Suggestions
                  </span>
                  <div className="flex gap-2">
                    <select
                      value={growthCategory}
                      onChange={(e) => setGrowthCategory(e.target.value)}
                      className="flex-1 px-2.5 py-2 text-[11.5px] rounded-lg bg-zinc-950 border border-white/5 text-zinc-300 focus:outline-none focus:border-gold-500"
                    >
                      <option value="">Select industry category...</option>
                      <option value="retail">Retail / E-commerce</option>
                      <option value="saas">SaaS / Web App Startup</option>
                      <option value="service">Business Services Agency</option>
                    </select>
                    <button 
                      onClick={handleGenerateGrowth}
                      className="px-3 rounded-lg bg-gold-500 text-black text-[11px] font-bold cursor-pointer"
                    >
                      Get
                    </button>
                  </div>
                  {growthTips && (
                    <ul className="pt-2.5 border-t border-white/5 space-y-2">
                      {growthTips.map((tip, idx) => (
                        <li key={idx} className="text-[10px] text-zinc-350 leading-relaxed font-light flex gap-2">
                          <span className="text-gold-500 font-bold font-mono">0{idx + 1}.</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Cost & Hours Estimator */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-gold-500 flex items-center gap-1.5 font-mono">
                    <DollarSign className="w-3.5 h-3.5" />
                    Cost Estimator
                  </span>
                  
                  {/* Select scale */}
                  <div className="space-y-1">
                    <label className="text-[9.5px] uppercase tracking-wider text-zinc-500 block">Project Scale</label>
                    <div className="flex gap-1">
                      {["starter", "pro", "enterprise"].map(s => (
                        <button
                          key={s}
                          onClick={() => setEstScale(s)}
                          className={`flex-1 py-1.5 rounded text-[10px] uppercase font-bold border transition-colors cursor-pointer ${
                            estScale === s 
                              ? 'bg-gold-500 border-transparent text-black' 
                              : 'bg-zinc-950 border-white/5 text-zinc-450 hover:text-zinc-100'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Pages */}
                  <div className="space-y-1">
                    <label className="text-[9.5px] uppercase tracking-wider text-zinc-500 block">Complexity / Pages</label>
                    <div className="flex gap-1">
                      {["1-5", "5-15", "15+"].map(p => (
                        <button
                          key={p}
                          onClick={() => setEstPages(p)}
                          className={`flex-1 py-1.5 rounded text-[10px] border transition-colors cursor-pointer ${
                            estPages === p 
                              ? 'bg-gold-500 border-transparent text-black' 
                              : 'bg-zinc-950 border-white/5 text-zinc-450 hover:text-zinc-100'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Integrations checklist */}
                  <div className="space-y-1.5">
                    <label className="text-[9.5px] uppercase tracking-wider text-zinc-500 block">Add-ons</label>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      {[
                        { label: "Login Auth", key: "auth" },
                        { label: "Stripe Payments", key: "pay" },
                        { label: "Admin CRM", key: "crm" },
                        { label: "SEO Pack", key: "seo" }
                      ].map(item => (
                        <button
                          key={item.key}
                          onClick={() => toggleFeature(item.key)}
                          className={`p-2 rounded border text-left flex items-center justify-between cursor-pointer ${
                            estFeatures.includes(item.key)
                              ? 'bg-gold-500/10 border-gold-500/30 text-gold-500'
                              : 'bg-zinc-950 border-white/5 text-zinc-400'
                          }`}
                        >
                          <span>{item.label}</span>
                          {estFeatures.includes(item.key) && <Check className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleEstimateCost}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 text-black font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg"
                  >
                    Calculate Cost Estimate
                  </button>

                  {estimationResult && (
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px]">
                      <div>
                        <span className="text-zinc-550 block">EST. BUDGET</span>
                        <span className="text-white text-xs font-bold">{estimationResult.range}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-zinc-550 block">EST. TIMEFRAME</span>
                        <span className="text-white text-xs font-bold">{estimationResult.hours}</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <div className="flex justify-end">
        <motion.button
          id="assistant-toggle-btn"
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            } else {
              handleOpen();
            }
          }}
          animate={{
            y: [0, -6, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full border-2 flex items-center justify-center cursor-pointer group relative chatbot-toggle-btn"
          aria-label="Open chat assistant"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-zinc-900" />
          ) : (
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-transparent">
              <img src="/chatbot_logo.png" alt="Chatbot" className="w-full h-full object-cover scale-150 origin-center rounded-full transition-transform duration-300 group-hover:scale-[1.65]" />
            </div>
          )}
          
          {/* Pulse ring */}
          {!isOpen && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#050507]"></span>
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
}
