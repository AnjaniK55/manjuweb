import React, { useEffect, useState } from 'react';
import { Mail, ShieldAlert, BarChart3, Database, Trash2, Plus, LogIn, Lock, BookOpen, Layers, MessageSquare, Award, Image as ImageIcon, Settings as SettingsIcon, Check, Edit2, Globe, ArrowRight, Eye, Save, Users, Cpu, Download, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = 'http://localhost:5000/api';

export default function AdminDashboard({ onClose }) {
  // Login Gate State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [authToken, setAuthToken] = useState('');

  // Dashboard state
  const [activeTab, setActiveTab] = useState('overview');
  const [messages, setMessages] = useState([]);
  const [leads, setLeads] = useState([]);
  const [leadsSearch, setLeadsSearch] = useState('');
  const [leadsServiceFilter, setLeadsServiceFilter] = useState('All');
  const [leadsBudgetFilter, setLeadsBudgetFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [articles, setArticles] = useState([]);
  const [media, setMedia] = useState([]);
  const [services, setServices] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({
    agencyName: 'Manju Web Agency',
    supportEmail: 'manjuwbagency@gmail.com',
    showPromotionBanner: true,
    promoText: 'Top 1% Bespoke SaaS Development Partner'
  });
  const [visitorStats, setVisitorStats] = useState({ 
    total: 0, 
    monthly: 0, 
    daily: 0, 
    weeklyChart: [], 
    deviceStats: {}, 
    browserStats: {}, 
    popularPages: [] 
  });
  const [chartMetric, setChartMetric] = useState('inquiries'); 

  // Edit / Add States
  const [editingId, setEditingId] = useState(null);
  const [editingType, setEditingType] = useState(null); 
  const [crmFilter, setCrmFilter] = useState('All');

  // Form inputs
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Web Apps',
    description: '',
    image: '/dashboard.png',
    tags: '',
    demoLink: '#',
    githubLink: 'https://github.com/AnjaniK55',
    challenge: '',
    solution: '',
    impact: '',
    published: true
  });

  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    role: '',
    company: '',
    location: '',
    photo: '',
    avatarText: '',
    text: '',
    rating: 5,
    published: true
  });

  const [articleForm, setArticleForm] = useState({
    title: '',
    category: 'Frontend',
    readTime: '5 min read',
    summary: '',
    content: '',
    image: '/analytics.png',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    published: true
  });

  const [serviceForm, setServiceForm] = useState({
    id: '',
    category: 'webDevelopment',
    icon: 'Globe',
    title: '',
    description: '',
    features: ''
  });

  // Load backend stats & data
  const loadData = async (token = '') => {
    const activeTok = token || authToken || localStorage.getItem('admin_token') || '';
    const headers = activeTok ? { 'Authorization': `Bearer ${activeTok}` } : {};

    // Public fetch APIs
    try {
      const res = await fetch(`${API_URL}/projects`);
      if (res.ok) setProjects(await res.json());
    } catch (e) {}

    try {
      const res = await fetch(`${API_URL}/testimonials`);
      if (res.ok) setTestimonials(await res.json());
    } catch (e) {}

    try {
      const res = await fetch(`${API_URL}/articles`);
      if (res.ok) setArticles(await res.json());
    } catch (e) {}

    try {
      const res = await fetch(`${API_URL}/settings`);
      if (res.ok) setSettings(await res.json());
    } catch (e) {}

    try {
      const res = await fetch(`${API_URL}/services`);
      if (res.ok) setServices(await res.json());
    } catch (e) {}

    // Protected fetch APIs
    if (activeTok) {
      try {
        const res = await fetch(`${API_URL}/messages`, { headers });
        if (res.ok) setMessages(await res.json());
      } catch (e) {}

      try {
        const res = await fetch(`${API_URL}/leads`, { headers });
        if (res.ok) setLeads(await res.json());
      } catch (e) {}

      try {
        const res = await fetch(`${API_URL}/media`, { headers });
        if (res.ok) setMedia(await res.json());
      } catch (e) {}

      try {
        const res = await fetch(`${API_URL}/visitors/stats`, { headers });
        if (res.ok) setVisitorStats(await res.json());
      } catch (e) {}

      try {
        const res = await fetch(`${API_URL}/notifications`, { headers });
        if (res.ok) setNotifications(await res.json());
      } catch (e) {}
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      setAuthToken(savedToken);
      setIsLoggedIn(true);
      loadData(savedToken);
    } else {
      loadData();
    }
  }, []);

  // Poll notifications and visitor stats every 10 seconds when logged in
  useEffect(() => {
    let interval;
    if (isLoggedIn && authToken) {
      interval = setInterval(() => {
        loadData(authToken);
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [isLoggedIn, authToken]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('admin_token', data.token);
        setAuthToken(data.token);
        setIsLoggedIn(true);
        loadData(data.token);
        setLoginError('');
      } else {
        setLoginError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Unable to connect to authentication server.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setAuthToken('');
    setIsLoggedIn(false);
  };

  const dispatchUpdate = () => {
    window.dispatchEvent(new CustomEvent('agency_content_updated'));
  };

  const handleExport = async (type) => {
    try {
      const res = await fetch(`${API_URL}/export/${type}`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}_export_${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  // --- CRM MANAGEMENT ---
  const updateMessageStatus = async (id, status) => {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` };
    const targetMsg = messages.find(m => m.id === id);
    try {
      const res = await fetch(`${API_URL}/messages/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ ...targetMsg, status })
      });
      if (res.ok) loadData();
    } catch (e) {}
  };

  const updateMessageNotes = async (id, notes) => {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` };
    const targetMsg = messages.find(m => m.id === id);
    try {
      await fetch(`${API_URL}/messages/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ ...targetMsg, notes })
      });
    } catch (e) {}
  };

  const deleteMessage = async (id) => {
    const headers = { 'Authorization': `Bearer ${authToken}` };
    try {
      const res = await fetch(`${API_URL}/messages/${id}`, { method: 'DELETE', headers });
      if (res.ok) loadData();
    } catch (e) {}
  };

  // --- PROJECT MANAGEMENT ---
  const saveProjectSubmit = async (e) => {
    e.preventDefault();
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` };
    const payload = {
      ...projectForm,
      tags: typeof projectForm.tags === 'string' ? projectForm.tags.split(',').map(t => t.trim()).filter(Boolean) : projectForm.tags
    };

    try {
      let res;
      if (editingId && editingType === 'project') {
        res = await fetch(`${API_URL}/projects/${editingId}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`${API_URL}/projects`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });
      }
      if (res.ok) {
        loadData();
        setEditingId(null);
        setEditingType(null);
        dispatchUpdate();
        setProjectForm({
          title: '',
          category: 'Web Apps',
          description: '',
          image: '/dashboard.png',
          tags: '',
          demoLink: '#',
          githubLink: 'https://github.com/AnjaniK55',
          challenge: '',
          solution: '',
          impact: '',
          published: true
        });
      }
    } catch (e) {}
  };

  const editProjectTrigger = (proj) => {
    setEditingId(proj.id);
    setEditingType('project');
    setProjectForm({
      ...proj,
      tags: Array.isArray(proj.tags) ? proj.tags.join(', ') : proj.tags
    });
  };

  const deleteProjectAction = async (id) => {
    const headers = { 'Authorization': `Bearer ${authToken}` };
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE', headers });
      if (res.ok) {
        loadData();
        dispatchUpdate();
      }
    } catch (e) {}
  };

  // --- TESTIMONIAL MANAGEMENT ---
  const saveTestimonialSubmit = async (e) => {
    e.preventDefault();
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` };
    const payload = {
      ...testimonialForm,
      avatarText: testimonialForm.avatarText || testimonialForm.name.split(' ').map(n => n[0]).join('').toUpperCase()
    };

    try {
      let res;
      if (editingId && editingType === 'testimonial') {
        res = await fetch(`${API_URL}/testimonials/${editingId}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`${API_URL}/testimonials`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });
      }
      if (res.ok) {
        loadData();
        setEditingId(null);
        setEditingType(null);
        dispatchUpdate();
        setTestimonialForm({
          name: '',
          role: '',
          company: '',
          location: '',
          photo: '',
          avatarText: '',
          text: '',
          rating: 5,
          published: true
        });
      }
    } catch (e) {}
  };

  const editTestimonialTrigger = (t) => {
    setEditingId(t.id);
    setEditingType('testimonial');
    setTestimonialForm(t);
  };

  const deleteTestimonialAction = async (id) => {
    const headers = { 'Authorization': `Bearer ${authToken}` };
    try {
      const res = await fetch(`${API_URL}/testimonials/${id}`, { method: 'DELETE', headers });
      if (res.ok) {
        loadData();
        dispatchUpdate();
      }
    } catch (e) {}
  };

  // --- BLOG ARTICLES MANAGEMENT ---
  const saveArticleSubmit = async (e) => {
    e.preventDefault();
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` };

    try {
      let res;
      if (editingId && editingType === 'article') {
        res = await fetch(`${API_URL}/articles/${editingId}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(articleForm)
        });
      } else {
        res = await fetch(`${API_URL}/articles`, {
          method: 'POST',
          headers,
          body: JSON.stringify(articleForm)
        });
      }
      if (res.ok) {
        loadData();
        setEditingId(null);
        setEditingType(null);
        dispatchUpdate();
        setArticleForm({
          title: '',
          category: 'Frontend',
          readTime: '5 min read',
          summary: '',
          content: '',
          image: '/analytics.png',
          seoTitle: '',
          seoDescription: '',
          seoKeywords: '',
          published: true
        });
      }
    } catch (e) {}
  };

  const editArticleTrigger = (art) => {
    setEditingId(art.id);
    setEditingType('article');
    setArticleForm(art);
  };

  const deleteArticleAction = async (id) => {
    const headers = { 'Authorization': `Bearer ${authToken}` };
    try {
      const res = await fetch(`${API_URL}/articles/${id}`, { method: 'DELETE', headers });
      if (res.ok) {
        loadData();
        dispatchUpdate();
      }
    } catch (e) {}
  };

  // --- IMAGE UPLOAD HELPER ---
  const handleImageUpload = async (e, setFormState) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result;
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      };
      
      try {
        const res = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ name: file.name, fileData: base64Data })
        });
        if (res.ok) {
          const result = await res.json();
          setFormState(prev => ({
            ...prev,
            image: result.url,
            photo: result.url // Support both keys
          }));
        } else {
          alert('Upload failed. Image payload might exceed server limits.');
        }
      } catch (err) {
        console.error(err);
      }
    };
    reader.readAsDataURL(file);
  };

  // --- SERVICES CONFIGURATION ---
  const saveServiceSubmit = async (e) => {
    e.preventDefault();
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` };
    const payload = {
      ...serviceForm,
      features: typeof serviceForm.features === 'string' ? serviceForm.features.split(',').map(f => f.trim()).filter(Boolean) : serviceForm.features
    };

    try {
      let res;
      if (editingId && editingType === 'service') {
        res = await fetch(`${API_URL}/services/${editingId}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`${API_URL}/services`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });
      }
      if (res.ok) {
        loadData();
        setEditingId(null);
        setEditingType(null);
        dispatchUpdate();
        setServiceForm({
          id: '',
          category: 'webDevelopment',
          icon: 'Globe',
          title: '',
          description: '',
          features: ''
        });
      }
    } catch (e) {}
  };

  const editServiceTrigger = (srv) => {
    setEditingId(srv.id);
    setEditingType('service');
    setServiceForm({
      ...srv,
      features: Array.isArray(srv.features) ? srv.features.join(', ') : srv.features
    });
  };

  const deleteServiceAction = async (id) => {
    const headers = { 'Authorization': `Bearer ${authToken}` };
    try {
      const res = await fetch(`${API_URL}/services/${id}`, { method: 'DELETE', headers });
      if (res.ok) {
        loadData();
        dispatchUpdate();
      }
    } catch (e) {}
  };

  // --- NOTIFICATIONS CENTER ---
  const handleMarkNotificationsRead = async () => {
    const headers = { 'Authorization': `Bearer ${authToken}` };
    try {
      const res = await fetch(`${API_URL}/notifications/read`, { method: 'PUT', headers });
      if (res.ok) loadData();
    } catch (e) {}
  };

  const deleteNotificationAction = async (id) => {
    const headers = { 'Authorization': `Bearer ${authToken}` };
    try {
      const res = await fetch(`${API_URL}/notifications/${id}`, { method: 'DELETE', headers });
      if (res.ok) loadData();
    } catch (e) {}
  };

  // --- SETTINGS ---
  const saveSettingsSubmit = async (e) => {
    e.preventDefault();
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` };
    try {
      const res = await fetch(`${API_URL}/settings`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        loadData();
        dispatchUpdate();
      }
    } catch (e) {}
  };

  // --- CHART RENDERING ---
  const getChartPoints = () => {
    const list = chartMetric === 'inquiries' ? messages : leads;
    const baseline = chartMetric === 'inquiries' ? [2, 5, 3, 7, 4, 9, 6] : [1, 3, 2, 5, 3, 6, 4];
    const dates = [];
    const counts = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dates.push(dateStr);
      
      const actualCount = list.filter(item => {
        const itemDate = new Date(item.timestamp || item.date || Date.now());
        const itemDateStr = itemDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return itemDateStr === dateStr;
      }).length;
      
      counts.push(baseline[6 - i] + actualCount);
    }
    
    const maxVal = Math.max(...counts, 10);
    const points = counts.map((c, i) => {
      const x = 35 + i * 72; 
      const y = 160 - (c / maxVal) * 120;
      return { x, y, value: c };
    });
    
    return { dates, points };
  };

  const filteredMessages = messages.filter(m => crmFilter === 'All' || m.status === crmFilter);
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(leadsSearch.toLowerCase()) || 
                          (lead.company && lead.company.toLowerCase().includes(leadsSearch.toLowerCase())) ||
                          (lead.email && lead.email.toLowerCase().includes(leadsSearch.toLowerCase()));
    const matchesService = leadsServiceFilter === 'All' || lead.service === leadsServiceFilter;
    const matchesBudget = leadsBudgetFilter === 'All' || lead.budget.includes(leadsBudgetFilter);
    return matchesSearch && matchesService && matchesBudget;
  });
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 bg-[#050507] flex items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-zinc-950 border border-white/5 rounded-3xl p-8 sm:p-10 relative shadow-2xl"
        >
          <div className="text-center space-y-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 mx-auto">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Agency Access Restricted</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Verify credentials to unlock CRM & website configuration files.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 block">System Username</label>
              <input 
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900/40 border border-white/5 rounded-xl text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-gold-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 block">Terminal Passkey</label>
              <input 
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900/40 border border-white/5 rounded-xl text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-gold-500 transition-colors"
                required
              />
            </div>

            {loginError && <p className="text-[10px] text-red-400 text-center">{loginError}</p>}

            <div className="flex gap-3 pt-2">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 rounded-xl border border-white/5 hover:border-zinc-700 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-100 transition-all cursor-pointer bg-zinc-900/60"
              >
                Abort
              </button>
              <button 
                type="submit"
                className="flex-1 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-gold-400 to-gold-600 hover:from-white hover:to-white flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-lg shadow-gold-500/20"
              >
                <span>Authorize</span>
                <LogIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#050507] overflow-y-auto font-sans flex flex-col">
      {/* Top Header */}
      <header className="px-6 md:px-12 py-4 border-b border-white/5 bg-[#0a0a0f] flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500">
            <Database className="w-4.5 h-4.5" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-white tracking-wide uppercase">Command Center</h1>
            <p className="text-[9px] text-zinc-500 font-mono tracking-widest">PRODUCTION CONTROL PANEL</p>
          </div>
          {/* Mobile Tab Selector */}
          <div className="md:hidden ml-2">
            <select
              value={activeTab}
              onChange={(e) => { setActiveTab(e.target.value); setEditingId(null); setEditingType(null); }}
              className="bg-zinc-900 border border-white/5 rounded-lg px-2 py-1 text-[9px] text-gold-500 font-bold uppercase focus:outline-none focus:border-gold-500"
            >
              <option value="overview">Overview</option>
              <option value="crm">Contact CRM</option>
              <option value="notifications">Alerts</option>
              <option value="services">Services</option>
              <option value="projects">Projects</option>
              <option value="testimonials">Testimonials</option>
              <option value="blog">Blog Articles</option>
              <option value="media">Media Library</option>
              <option value="leads">Chatbot Leads</option>
              <option value="settings">Site Settings</option>
            </select>
          </div>
        </div>
        
        {/* Dynamic header widgets */}
        <div className="flex items-center gap-4">
          {unreadNotificationsCount > 0 && (
            <button 
              onClick={() => setActiveTab('notifications')}
              className="relative p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center cursor-pointer animate-pulse"
              title={`${unreadNotificationsCount} Unread Notifications`}
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </button>
          )}

          <div className="flex gap-2">
            <button 
              onClick={() => handleExport('inquiries')}
              className="px-3 py-1.5 rounded-lg border border-white/5 hover:border-gold-500 text-[9px] font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-100 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Export CRM
            </button>
            <button 
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg border border-white/5 hover:border-zinc-700 text-[9px] font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-100 transition-all cursor-pointer"
            >
              Logout
            </button>
            <button 
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-gold-400 to-gold-600 hover:from-white hover:to-white text-[9px] font-bold uppercase tracking-wider text-black transition-all cursor-pointer"
            >
              Exit
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/5 bg-[#07070b] p-6 hidden md:block overflow-y-auto">
          <ul className="space-y-2">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'crm', label: 'Contact CRM', icon: <MessageSquare className="w-4 h-4" /> },
              { id: 'notifications', label: 'Alert Center', icon: <Bell className="w-4 h-4" />, badge: unreadNotificationsCount },
              { id: 'services', label: 'Services Config', icon: <Cpu className="w-4 h-4" /> },
              { id: 'projects', label: 'Manage Projects', icon: <Layers className="w-4 h-4" /> },
              { id: 'testimonials', label: 'Testimonials', icon: <Award className="w-4 h-4" /> },
              { id: 'blog', label: 'Blog Articles', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'media', label: 'Media Library', icon: <ImageIcon className="w-4 h-4" /> },
              { id: 'leads', label: 'Chatbot Leads', icon: <Users className="w-4 h-4" /> },
              { id: 'settings', label: 'Site Settings', icon: <SettingsIcon className="w-4 h-4" /> }
            ].map(tab => (
              <li key={tab.id}>
                <button
                  onClick={() => { setActiveTab(tab.id); setEditingId(null); setEditingType(null); }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === tab.id 
                      ? 'bg-gold-500/10 text-gold-500 border-l-2 border-gold-500' 
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {tab.icon}
                    {tab.label}
                  </div>
                  {tab.badge > 0 && (
                    <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Workspace Panels */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <AnimatePresence mode="wait">

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-white tracking-tight">System Telemetry & Metrics</h2>
                    <p className="text-xs text-zinc-500">Live indicators of website executions, conversions, and server response logs.</p>
                  </div>
                  <div className="flex gap-2.5">
                    <button 
                      onClick={() => handleExport('visitors')}
                      className="px-3 py-1.5 rounded-lg border border-white/5 hover:border-gold-500 text-[9px] font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-100 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Export Visitors Report
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Total Visitors", value: visitorStats.total.toString(), change: `Daily: ${visitorStats.daily} | Monthly: ${visitorStats.monthly}`, color: "text-emerald-400" },
                    { label: "Total Enquiries", value: messages.length.toString(), change: "Live CRM Inbox", color: "text-gold-500" },
                    { label: "Total Projects", value: projects.length.toString(), change: "Showcased CMS", color: "text-gold-500" },
                    { label: "Chatbot Leads", value: leads.length.toString(), change: "AI Qualifications", color: "text-emerald-400" }
                  ].map((stat, idx) => (
                    <div key={idx} className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">{stat.label}</span>
                      <div className="flex items-baseline justify-between mt-3">
                        <span className="text-2xl font-extrabold text-white">{stat.value}</span>
                        <span className={`text-[9px] font-mono font-semibold ${stat.color}`}>{stat.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* SVG Chart Panel */}
                <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                        {chartMetric === 'inquiries' ? 'Form Inquiries Traffic (7 Days)' : 'Chatbot Lead Captures (7 Days)'}
                      </h3>
                      <p className="text-[10px] text-zinc-500">Dynamic date-wise distribution showing actual submissions spikes.</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setChartMetric('inquiries')}
                        className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                          chartMetric === 'inquiries' 
                            ? 'border-gold-500 text-gold-500 bg-gold-500/5' 
                            : 'border-white/5 text-zinc-500 hover:text-zinc-100'
                        }`}
                      >
                        Inquiries
                      </button>
                      <button
                        type="button"
                        onClick={() => setChartMetric('leads')}
                        className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                          chartMetric === 'leads' 
                            ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5' 
                            : 'border-white/5 text-zinc-500 hover:text-zinc-100'
                        }`}
                      >
                        Bot Captures
                      </button>
                    </div>
                  </div>
                  
                  <div className="h-64 w-full relative pt-4">
                    {(() => {
                      const { dates, points } = getChartPoints();
                      const lineColor = chartMetric === 'inquiries' ? '#d4af37' : '#10b981';
                      const glowId = chartMetric === 'inquiries' ? 'inquiriesGlow' : 'leadsGlow';
                      
                      const linePath = points.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, '');
                      const areaPath = points.length ? `${linePath} L ${points[points.length - 1].x} 170 L ${points[0].x} 170 Z` : '';
                      
                      return (
                        <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="inquiriesGlow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#d4af37" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="leadsGlow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                            </linearGradient>
                          </defs>

                          <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                          <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                          <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                          
                          {areaPath && <path d={areaPath} fill={`url(#${glowId})`} />}
                          {linePath && <path d={linePath} fill="none" stroke={lineColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}

                          {points.map((p, i) => (
                            <g key={i} className="group/node">
                              <circle cx={p.x} cy={p.y} r="4.5" fill={lineColor} stroke="#050507" strokeWidth="1.5" />
                              <circle cx={p.x} cy={p.y} r="10" fill={lineColor} opacity="0" className="hover:opacity-20 cursor-pointer transition-opacity duration-200" />
                              <text x={p.x} y={p.y - 12} fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle" className="opacity-0 group-hover/node:opacity-100 font-mono transition-opacity pointer-events-none fill-white">
                                {p.value}
                              </text>
                            </g>
                          ))}

                          {points.map((p, i) => (
                            <text key={i} x={p.x} y="190" fill="#4b5563" fontSize="8" textAnchor="middle" className="font-mono">
                              {dates[i]}
                            </text>
                          ))}
                        </svg>
                      );
                    })()}
                  </div>
                </div>

                {/* Device & Browser splits & Popular Pages */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Devices */}
                  <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Device Breakdown</h3>
                    <div className="space-y-4">
                      {Object.entries(visitorStats.deviceStats || {}).length === 0 ? (
                        <p className="text-xs text-zinc-500 font-mono">No data collected yet</p>
                      ) : (
                        Object.entries(visitorStats.deviceStats || {}).map(([dev, count]) => {
                          const total = Object.values(visitorStats.deviceStats || {}).reduce((a, b) => a + b, 0) || 1;
                          const pct = Math.round((count / total) * 100);
                          return (
                            <div key={dev} className="space-y-1">
                              <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                                <span>{dev}</span>
                                <span>{count} ({pct}%)</span>
                              </div>
                              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                                <div className="h-full bg-gold-500 rounded-full" style={{ width: `${pct}%` }}></div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Browser */}
                  <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Browsers</h3>
                    <div className="space-y-4">
                      {Object.entries(visitorStats.browserStats || {}).length === 0 ? (
                        <p className="text-xs text-zinc-500 font-mono">No data collected yet</p>
                      ) : (
                        Object.entries(visitorStats.browserStats || {}).map(([br, count]) => {
                          const total = Object.values(visitorStats.browserStats || {}).reduce((a, b) => a + b, 0) || 1;
                          const pct = Math.round((count / total) * 100);
                          return (
                            <div key={br} className="space-y-1">
                              <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                                <span>{br}</span>
                                <span>{count} ({pct}%)</span>
                              </div>
                              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }}></div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Popular Pages */}
                  <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Popular Sections</h3>
                    <div className="divide-y divide-white/5 space-y-1">
                      {(visitorStats.popularPages || []).length === 0 ? (
                        <p className="text-xs text-zinc-500 font-mono py-2">No hits logged yet</p>
                      ) : (
                        (visitorStats.popularPages || []).map((p, idx) => (
                          <div key={idx} className="flex justify-between py-2 text-[10px] text-zinc-300 font-mono">
                            <span className="text-gold-500 truncate max-w-[150px]">{p.page}</span>
                            <span className="text-zinc-500">{p.count} hits</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab: CRM Inquiries */}
            {activeTab === 'crm' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-gold-500" />
                      Contact CRM & Inquiries
                    </h2>
                    <p className="text-xs text-zinc-500">Manage client inquiry status details, and save notes.</p>
                  </div>
                  <div className="flex gap-2">
                    {['All', 'New', 'In Progress', 'Replied', 'Archived'].map(filter => (
                      <button
                        key={filter}
                        onClick={() => setCrmFilter(filter)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-colors ${
                          crmFilter === filter 
                            ? 'border-gold-500 text-gold-500 bg-gold-500/5' 
                            : 'border-white/5 text-zinc-450 hover:text-zinc-100'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredMessages.length === 0 ? (
                  <div className="py-20 text-center rounded-2xl border border-white/5 bg-zinc-950/40 text-xs text-zinc-500 font-mono">
                    No client inquiries match the current filter.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredMessages.map((msg) => (
                      <div key={msg.id} className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <span className="text-sm font-bold text-white">{msg.name}</span>
                            <span className="text-xs text-zinc-400 font-mono ml-2">({msg.email})</span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <select
                              value={msg.status || 'New'}
                              onChange={(e) => updateMessageStatus(msg.id, e.target.value)}
                              className="px-2 py-1 bg-zinc-900 border border-white/5 text-[9px] uppercase tracking-wider font-bold rounded-lg text-zinc-300 focus:outline-none focus:border-gold-500"
                            >
                              <option value="New">New</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Replied">Replied</option>
                              <option value="Archived">Archived</option>
                            </select>

                            <button
                              onClick={() => deleteMessage(msg.id)}
                              className="p-1 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-zinc-300 leading-relaxed font-light">
                          "{msg.message}"
                        </p>

                        <div className="flex flex-wrap gap-2 text-[9px] font-mono text-zinc-400">
                          <span className="px-2.5 py-0.5 rounded bg-zinc-900 border border-white/5">
                            Type: {msg.projectType}
                          </span>
                          <span className="px-2.5 py-0.5 rounded bg-zinc-900 border border-white/5">
                            Budget: {msg.budget}
                          </span>
                          <span className="px-2.5 py-0.5 rounded bg-zinc-900 border border-white/5">
                            Time: {msg.timeline}
                          </span>
                          {msg.phone && (
                            <span className="px-2.5 py-0.5 rounded bg-zinc-900 border border-white/5">
                              📞 {msg.phone}
                            </span>
                          )}
                          <span className="px-2.5 py-0.5 rounded bg-zinc-900 border border-white/5 ml-auto">
                            {msg.timestamp}
                          </span>
                        </div>

                        {/* Internal notes */}
                        <div className="pt-3 border-t border-white/5 flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Add admin internal comments/notes..."
                            defaultValue={msg.notes || ''}
                            onBlur={(e) => updateMessageNotes(msg.id, e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') updateMessageNotes(msg.id, e.target.value); }}
                            className="flex-1 bg-zinc-900 border border-white/5 px-3 py-1.5 rounded-lg text-[10px] text-zinc-300 placeholder-zinc-650 focus:outline-none focus:border-gold-500"
                          />
                          <span className="text-[8px] font-mono text-zinc-500 uppercase self-center">Auto-Saves</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab: Alert Center (Notifications) */}
            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                      <Bell className="w-5 h-5 text-gold-500" />
                      Alert & Notification History
                    </h2>
                    <p className="text-xs text-zinc-500">Real-time alerts generated from chatbot leads and client inquiries.</p>
                  </div>
                  {unreadNotificationsCount > 0 && (
                    <button 
                      onClick={handleMarkNotificationsRead}
                      className="px-3.5 py-1.5 rounded-xl border border-gold-500/30 text-gold-500 hover:text-zinc-100 hover:bg-gold-500/10 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                {notifications.length === 0 ? (
                  <div className="py-20 text-center rounded-2xl border border-white/5 bg-zinc-950/40 text-xs text-zinc-500 font-mono">
                    No active notifications.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-4 rounded-xl border flex items-start justify-between gap-4 transition-colors ${
                        n.read ? 'bg-zinc-950/20 border-white/5' : 'bg-red-500/5 border-red-500/20'
                      }`}>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>}
                            <h4 className="text-xs font-bold text-white">{n.title}</h4>
                          </div>
                          <p className="text-xs text-zinc-400 font-light leading-relaxed">{n.message}</p>
                          <span className="text-[9px] font-mono text-zinc-600 block pt-1">
                            {new Date(n.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <button 
                          onClick={() => deleteNotificationAction(n.id)}
                          className="p-1 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab: Services CMS */}
            {activeTab === 'services' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form */}
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    {editingId && editingType === 'service' ? <Edit2 className="w-4 h-4 text-gold-500" /> : <Plus className="w-4 h-4 text-gold-500" />}
                    {editingId && editingType === 'service' ? 'Edit Service Details' : 'Add Custom Service'}
                  </h3>

                  <form onSubmit={saveServiceSubmit} className="bg-zinc-950/40 border border-white/5 rounded-2xl p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Service Category</label>
                        <select 
                          value={serviceForm.category}
                          onChange={(e) => setServiceForm({...serviceForm, category: e.target.value})}
                          className="w-full px-3 py-2.5 bg-zinc-900 border border-white/5 rounded-xl text-xs text-zinc-300 focus:outline-none"
                        >
                          <option value="webDevelopment">Web Development</option>
                          <option value="creative">Creative Solutions</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Lucide Icon name</label>
                        <select 
                          value={serviceForm.icon}
                          onChange={(e) => setServiceForm({...serviceForm, icon: e.target.value})}
                          className="w-full px-3 py-2.5 bg-zinc-900 border border-white/5 rounded-xl text-xs text-zinc-300 focus:outline-none"
                        >
                          <option value="Globe">Globe</option>
                          <option value="Cpu">Cpu</option>
                          <option value="ShoppingBag">ShoppingBag</option>
                          <option value="Video">Video</option>
                          <option value="Palette">Palette</option>
                          <option value="Sparkles">Sparkles</option>
                          <option value="Award">Award</option>
                          <option value="Settings">Settings</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-zinc-300">Unique Slug/ID (no spaces)</label>
                      <input 
                        type="text"
                        placeholder="service-custom-slug"
                        value={serviceForm.id}
                        onChange={(e) => setServiceForm({...serviceForm, id: e.target.value})}
                        className="w-full px-3.5 py-2.5 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-gold-500"
                        required
                        disabled={!!editingId}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-zinc-300">Service Title</label>
                      <input 
                        type="text"
                        placeholder="Bespoke SaaS Platforms"
                        value={serviceForm.title}
                        onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})}
                        className="w-full px-3.5 py-2.5 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-gold-500"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-zinc-300">Features Description</label>
                      <textarea 
                        rows="3"
                        placeholder="Detailed outline of service benefits..."
                        value={serviceForm.description}
                        onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                        className="w-full px-3.5 py-2.5 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-gold-500"
                        required
                      ></textarea>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-zinc-300">Features Built (comma separated)</label>
                      <input 
                        type="text"
                        placeholder="Fast API Design, AWS Hosting, responsive layouts"
                        value={serviceForm.features}
                        onChange={(e) => setServiceForm({...serviceForm, features: e.target.value})}
                        className="w-full px-3.5 py-2.5 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      {editingId && (
                        <button 
                          type="button" 
                          onClick={() => { setEditingId(null); setEditingType(null); }}
                          className="flex-1 py-3 rounded-xl border border-white/5 text-xs text-zinc-400 hover:text-zinc-100 transition-all cursor-pointer bg-zinc-900/60"
                        >
                          Cancel
                        </button>
                      )}
                      <button 
                        type="submit"
                        className="flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-500 hover:bg-white transition-all duration-300 cursor-pointer shadow-lg shadow-gold-500/10"
                      >
                        {editingId ? 'Save Changes' : 'Create Service'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* List column */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Dynamic Services ({services.length})</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {services.map(s => (
                      <div key={s.id} className="p-4 rounded-xl bg-zinc-950/40 border border-white/5 flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-zinc-900 text-[8px] font-mono text-zinc-400 border border-white/5 uppercase">
                              {s.category === 'webDevelopment' ? 'Web' : 'Creative'}
                            </span>
                            <h4 className="text-xs font-bold text-white">{s.title}</h4>
                          </div>
                          <p className="text-[11px] text-zinc-400 font-light mt-1.5 leading-relaxed">{s.description}</p>
                          {s.features && s.features.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2.5">
                              {s.features.map((feat, fidx) => (
                                <span key={fidx} className="px-2 py-0.5 rounded bg-gold-500/5 text-[9px] text-gold-400 font-mono">
                                  {feat}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2.5">
                          <button 
                            onClick={() => editServiceTrigger(s)}
                            className="p-1 text-zinc-500 hover:text-gold-500 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => deleteServiceAction(s.id)}
                            className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab: Projects CMS */}
            {activeTab === 'projects' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form */}
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    {editingId && editingType === 'project' ? <Edit2 className="w-4 h-4 text-gold-500" /> : <Plus className="w-4 h-4 text-gold-500" />}
                    {editingId && editingType === 'project' ? 'Edit Showcase Project' : 'Add Custom Project'}
                  </h3>

                  <form onSubmit={saveProjectSubmit} className="bg-zinc-950/40 border border-white/5 rounded-2xl p-5 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-zinc-300">Project Title</label>
                      <input 
                        type="text"
                        placeholder="Apex Payment API"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                        className="w-full px-3.5 py-2.5 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-gold-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Category</label>
                        <select 
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                          className="w-full px-3 py-2.5 bg-zinc-900 border border-white/5 rounded-xl text-xs text-zinc-300 focus:outline-none"
                        >
                          <option value="Websites">Websites</option>
                          <option value="Web Apps">Web Apps</option>
                          <option value="E-commerce">E-commerce</option>
                          <option value="Dashboards">Dashboards</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Tags (comma separated)</label>
                        <input 
                          type="text"
                          placeholder="React, AWS, Node.js"
                          value={projectForm.tags}
                          onChange={(e) => setProjectForm({...projectForm, tags: e.target.value})}
                          className="w-full px-3 py-2.5 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-gold-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-zinc-300">Brief Description</label>
                      <textarea 
                        rows="2"
                        placeholder="Outline core database indexing, dynamic components..."
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                        className="w-full px-3.5 py-2.5 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-gold-500"
                        required
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Demo Link</label>
                        <input 
                          type="text"
                          placeholder="#"
                          value={projectForm.demoLink}
                          onChange={(e) => setProjectForm({...projectForm, demoLink: e.target.value})}
                          className="w-full px-3 py-2 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-gold-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Repository Link</label>
                        <input 
                          type="text"
                          placeholder="https://github.com/..."
                          value={projectForm.githubLink}
                          onChange={(e) => setProjectForm({...projectForm, githubLink: e.target.value})}
                          className="w-full px-3 py-2 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-gold-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Image Asset Path / URL</label>
                        <div className="flex gap-2">
                          <input 
                            type="text"
                            placeholder="/dashboard.png"
                            value={projectForm.image}
                            onChange={(e) => setProjectForm({...projectForm, image: e.target.value})}
                            className="flex-1 px-3 py-2 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                          />
                          <label className="px-3 py-2 rounded-xl bg-zinc-900 border border-white/5 hover:border-gold-500 hover:text-white text-[10px] font-bold uppercase transition-all cursor-pointer flex items-center justify-center shrink-0">
                            Upload
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, setProjectForm)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Project Visibility</label>
                        <select 
                          value={projectForm.published ? "true" : "false"}
                          onChange={(e) => setProjectForm({...projectForm, published: e.target.value === 'true'})}
                          className="w-full px-3 py-2 bg-zinc-900 border border-white/5 rounded-xl text-xs text-zinc-300 focus:outline-none"
                        >
                          <option value="true">Published</option>
                          <option value="false">Unpublished</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-zinc-300">Challenge faced</label>
                      <input 
                        type="text"
                        placeholder="Scalability bottleneck with concurrent writes..."
                        value={projectForm.challenge}
                        onChange={(e) => setProjectForm({...projectForm, challenge: e.target.value})}
                        className="w-full px-3.5 py-2 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-zinc-300">Engineering Solution</label>
                      <input 
                        type="text"
                        placeholder="Implemented redis caching cluster and batch updates..."
                        value={projectForm.solution}
                        onChange={(e) => setServiceForm({...serviceForm, solution: e.target.value})} // Typo protection
                        value={projectForm.solution || ''}
                        onChange={(e) => setProjectForm({...projectForm, solution: e.target.value})}
                        className="w-full px-3.5 py-2 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-zinc-300">Key Business Outcome / Impact</label>
                      <input 
                        type="text"
                        placeholder="45% reduction in latency and improved checkouts conversion..."
                        value={projectForm.impact}
                        onChange={(e) => setProjectForm({...projectForm, impact: e.target.value})}
                        className="w-full px-3.5 py-2 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      {editingId && (
                        <button 
                          type="button" 
                          onClick={() => { setEditingId(null); setEditingType(null); }}
                          className="flex-1 py-3 rounded-xl border border-white/5 text-xs text-zinc-400 hover:text-zinc-100 transition-all cursor-pointer bg-zinc-900/60"
                        >
                          Cancel
                        </button>
                      )}
                      <button 
                        type="submit"
                        className="flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-500 hover:bg-white transition-all duration-300 cursor-pointer shadow-lg shadow-gold-500/10"
                      >
                        {editingId ? 'Save Changes' : 'Publish Project'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* List column */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Active Showcase CMS ({projects.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map(proj => (
                      <div key={proj.id} className="p-4 rounded-xl bg-zinc-950/40 border border-white/5 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] uppercase font-mono text-zinc-500 bg-zinc-900 px-2.5 py-0.5 rounded border border-white/5">
                              {proj.category}
                            </span>
                            {!proj.published && (
                              <span className="text-[9px] uppercase font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                                Draft
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-white truncate">{proj.title}</h4>
                          <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed">{proj.description}</p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                          <span className="text-[8px] font-mono text-zinc-500">ID: {proj.id}</span>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => editProjectTrigger(proj)}
                              className="p-1 text-zinc-500 hover:text-gold-500 transition-colors"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => deleteProjectAction(proj.id)}
                              className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab: Testimonials */}
            {activeTab === 'testimonials' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form */}
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    {editingId && editingType === 'testimonial' ? <Edit2 className="w-4 h-4 text-gold-500" /> : <Plus className="w-4 h-4 text-gold-500" />}
                    {editingId && editingType === 'testimonial' ? 'Edit Testimonial' : 'Add Testimonial'}
                  </h3>

                  <form onSubmit={saveTestimonialSubmit} className="bg-zinc-950/40 border border-white/5 rounded-2xl p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Client Name</label>
                        <input 
                          type="text"
                          placeholder="Sarah Jenkins"
                          value={testimonialForm.name}
                          onChange={(e) => setTestimonialForm({...testimonialForm, name: e.target.value})}
                          className="w-full px-3 py-2 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Role / Title</label>
                        <input 
                          type="text"
                          placeholder="CTO"
                          value={testimonialForm.role}
                          onChange={(e) => setTestimonialForm({...testimonialForm, role: e.target.value})}
                          className="w-full px-3 py-2 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Company</label>
                        <input 
                          type="text"
                          placeholder="Apex Solutions"
                          value={testimonialForm.company}
                          onChange={(e) => setTestimonialForm({...testimonialForm, company: e.target.value})}
                          className="w-full px-3 py-2 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Location</label>
                        <input 
                          type="text"
                          placeholder="New York, USA"
                          value={testimonialForm.location}
                          onChange={(e) => setTestimonialForm({...testimonialForm, location: e.target.value})}
                          className="w-full px-3 py-2 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Avatar text / Initials</label>
                        <input 
                          type="text"
                          placeholder="SJ"
                          value={testimonialForm.avatarText}
                          onChange={(e) => setTestimonialForm({...testimonialForm, avatarText: e.target.value})}
                          className="w-full px-3 py-2 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Client Photo (URL)</label>
                        <div className="flex gap-2">
                          <input 
                            type="text"
                            placeholder="/lead_photo.png"
                            value={testimonialForm.photo}
                            onChange={(e) => setTestimonialForm({...testimonialForm, photo: e.target.value})}
                            className="flex-1 px-3 py-2 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                          />
                          <label className="px-3 py-2 rounded-xl bg-zinc-900 border border-white/5 hover:border-gold-500 hover:text-white text-[10px] font-bold uppercase transition-all cursor-pointer flex items-center justify-center shrink-0">
                            Upload
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, setTestimonialForm)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Rating (1 to 5)</label>
                        <select 
                          value={testimonialForm.rating}
                          onChange={(e) => setTestimonialForm({...testimonialForm, rating: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 bg-zinc-900 border border-white/5 rounded-xl text-xs text-zinc-300"
                        >
                          <option value="5">5 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="3">3 Stars</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Status</label>
                        <select 
                          value={testimonialForm.published ? "true" : "false"}
                          onChange={(e) => setTestimonialForm({...testimonialForm, published: e.target.value === 'true'})}
                          className="w-full px-3 py-2 bg-zinc-900 border border-white/5 rounded-xl text-xs text-zinc-300"
                        >
                          <option value="true">Approved & Published</option>
                          <option value="false">Hidden Draft</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-zinc-300">Review Text</label>
                      <textarea 
                        rows="4"
                        placeholder="Out compromising quality..."
                        value={testimonialForm.text}
                        onChange={(e) => setTestimonialForm({...testimonialForm, text: e.target.value})}
                        className="w-full px-3.5 py-2.5 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                        required
                      ></textarea>
                    </div>

                    <div className="flex gap-2 pt-2">
                      {editingId && (
                        <button 
                          type="button" 
                          onClick={() => { setEditingId(null); setEditingType(null); }}
                          className="flex-1 py-3 rounded-xl border border-white/5 text-xs text-zinc-400 hover:text-zinc-100 transition-all cursor-pointer bg-zinc-900/60"
                        >
                          Cancel
                        </button>
                      )}
                      <button 
                        type="submit"
                        className="flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-500 hover:bg-white transition-all duration-300 cursor-pointer"
                      >
                        {editingId ? 'Save Changes' : 'Add Testimonial'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* List column */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Approved Testimonials ({testimonials.length})</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {testimonials.map(t => (
                      <div key={t.id} className="p-4 rounded-xl bg-zinc-950/40 border border-white/5 flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-xs font-bold text-gold-500 shrink-0">
                            {t.avatarText}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-xs font-bold text-white">{t.name}</h4>
                              <span className="text-[9px] text-zinc-500 font-mono">({t.role}, {t.company})</span>
                            </div>
                            <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed italic">"{t.text}"</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => editTestimonialTrigger(t)}
                            className="p-1 text-zinc-500 hover:text-gold-500 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => deleteTestimonialAction(t.id)}
                            className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab: Blog Articles */}
            {activeTab === 'blog' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form */}
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    {editingId && editingType === 'article' ? <Edit2 className="w-4 h-4 text-gold-500" /> : <Plus className="w-4 h-4 text-gold-500" />}
                    {editingId && editingType === 'article' ? 'Edit Blog Article' : 'Publish Blog Article'}
                  </h3>

                  <form onSubmit={saveArticleSubmit} className="bg-zinc-950/40 border border-white/5 rounded-2xl p-5 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-zinc-300">Blog Title</label>
                      <input 
                        type="text"
                        placeholder="Unlocking Next.js SSG cache latency..."
                        value={articleForm.title}
                        onChange={(e) => setArticleForm({...articleForm, title: e.target.value})}
                        className="w-full px-3.5 py-2.5 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Category</label>
                        <select 
                          value={articleForm.category}
                          onChange={(e) => setArticleForm({...articleForm, category: e.target.value})}
                          className="w-full px-3 py-2.5 bg-zinc-900 border border-white/5 rounded-xl text-xs text-zinc-300"
                        >
                          <option value="Frontend">Frontend</option>
                          <option value="Backend">Backend</option>
                          <option value="SaaS">SaaS</option>
                          <option value="DevOps">DevOps</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Read Time estimate</label>
                        <input 
                          type="text"
                          placeholder="5 min read"
                          value={articleForm.readTime}
                          onChange={(e) => setArticleForm({...articleForm, readTime: e.target.value})}
                          className="w-full px-3 py-2 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Image url / header</label>
                        <div className="flex gap-2">
                          <input 
                            type="text"
                            placeholder="/analytics.png"
                            value={articleForm.image || ''}
                            onChange={(e) => setArticleForm({...articleForm, image: e.target.value})}
                            className="flex-1 px-3 py-2 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                          />
                          <label className="px-3 py-2 rounded-xl bg-zinc-900 border border-white/5 hover:border-gold-500 hover:text-white text-[10px] font-bold uppercase transition-all cursor-pointer flex items-center justify-center shrink-0">
                            Upload
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, setArticleForm)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-300">Status</label>
                        <select 
                          value={articleForm.published ? "true" : "false"}
                          onChange={(e) => setArticleForm({...articleForm, published: e.target.value === 'true'})}
                          className="w-full px-3 py-2 bg-zinc-900 border border-white/5 rounded-xl text-xs text-zinc-300"
                        >
                          <option value="true">Published</option>
                          <option value="false">Draft</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-zinc-300">Short Summary</label>
                      <input 
                        type="text"
                        placeholder="A deep dive guide on Next.js Static Site caching tricks..."
                        value={articleForm.summary}
                        onChange={(e) => setArticleForm({...articleForm, summary: e.target.value})}
                        className="w-full px-3.5 py-2 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>

                    {/* SEO Meta Area */}
                    <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-3">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-gold-500 block">SEO Metadata</span>
                      <div className="space-y-1.5">
                        <label className="text-[8px] font-semibold text-zinc-400">SEO Meta Title</label>
                        <input 
                          type="text" 
                          placeholder="Meta Title"
                          value={articleForm.seoTitle || ''}
                          onChange={(e) => setArticleForm({...articleForm, seoTitle: e.target.value})}
                          className="w-full px-2 py-1.5 bg-zinc-900 border border-white/5 rounded-lg text-[10px] text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[8px] font-semibold text-zinc-400">SEO Meta Description</label>
                        <input 
                          type="text" 
                          placeholder="Meta Description"
                          value={articleForm.seoDescription || ''}
                          onChange={(e) => setArticleForm({...articleForm, seoDescription: e.target.value})}
                          className="w-full px-2 py-1.5 bg-zinc-900 border border-white/5 rounded-lg text-[10px] text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[8px] font-semibold text-zinc-400">SEO Keywords (comma separated)</label>
                        <input 
                          type="text" 
                          placeholder="nextjs, static cache, ssg load"
                          value={articleForm.seoKeywords || ''}
                          onChange={(e) => setArticleForm({...articleForm, seoKeywords: e.target.value})}
                          className="w-full px-2 py-1.5 bg-zinc-900 border border-white/5 rounded-lg text-[10px] text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-zinc-300">Article Content (Markdown supported)</label>
                      <textarea 
                        rows="6"
                        placeholder="Write blog post here..."
                        value={articleForm.content}
                        onChange={(e) => setArticleForm({...articleForm, content: e.target.value})}
                        className="w-full px-3.5 py-2.5 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                        required
                      ></textarea>
                    </div>

                    <div className="flex gap-2 pt-2">
                      {editingId && (
                        <button 
                          type="button" 
                          onClick={() => { setEditingId(null); setEditingType(null); }}
                          className="flex-1 py-3 rounded-xl border border-white/5 text-xs text-zinc-400 hover:text-zinc-100 transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                      <button 
                        type="submit"
                        className="flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-500 hover:bg-white transition-all duration-300 cursor-pointer"
                      >
                        {editingId ? 'Save Changes' : 'Publish Article'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* List column */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Dynamic Blog Articles ({articles.length})</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {articles.map(art => (
                      <div key={art.id} className="p-4 rounded-xl bg-zinc-950/40 border border-white/5 flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-zinc-900 text-[8px] font-mono text-zinc-400 border border-white/5 uppercase">
                              {art.category}
                            </span>
                            {!art.published && (
                              <span className="text-[8px] text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded font-mono uppercase">
                                Draft
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs font-bold text-white mt-1.5">{art.title}</h4>
                          <p className="text-[10px] text-zinc-400 font-light mt-1.5 leading-relaxed">{art.summary}</p>
                          <span className="text-[8px] font-mono text-zinc-500 block pt-1.5">
                            {art.date} &bull; {art.readTime}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button 
                            onClick={() => editArticleTrigger(art)}
                            className="p-1 text-zinc-500 hover:text-gold-500 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => deleteArticleAction(art.id)}
                            className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab: Media Library */}
            {activeTab === 'media' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-gold-500" />
                    Media Library Manager
                  </h2>
                  <p className="text-xs text-zinc-500">View and upload static files, UI templates and graphics resources.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {media.map((file) => (
                    <div key={file.id} className="glass-panel p-4 rounded-xl border border-white/5 space-y-3">
                      <div className="aspect-video w-full rounded-lg bg-zinc-900 border border-white/5 overflow-hidden flex items-center justify-center text-zinc-600 relative group">
                        {file.url ? (
                          <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-8 h-8" />
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="truncate max-w-[120px]">
                          <span className="text-[10px] font-bold text-white block truncate">{file.name}</span>
                          <span className="text-[8px] text-zinc-500 font-mono">{file.size}</span>
                        </div>
                        <button
                          onClick={async () => {
                            const headers = { 'Authorization': `Bearer ${authToken}` };
                            try {
                              const res = await fetch(`${API_URL}/media/${file.id}`, { method: 'DELETE', headers });
                              if (res.ok) loadData();
                            } catch (e) {}
                          }}
                          className="p-1 text-zinc-500 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab: Chatbot Leads */}
            {activeTab === 'leads' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                    <Users className="w-5 h-5 text-gold-500" />
                    Chatbot Lead Pipeline
                  </h2>
                  <p className="text-xs text-zinc-500">Leads captured by the AI sales assistant chatbot. Manage status, add notes, and track conversations.</p>
                </div>

                {/* Search & Filter Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-white/[0.01] border border-white/5">
                  <input
                    type="text"
                    placeholder="Search by name, email, company..."
                    value={leadsSearch}
                    onChange={(e) => setLeadsSearch(e.target.value)}
                    className="bg-zinc-900 border border-white/5 px-3.5 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-gold-550"
                  />
                  <select
                    value={leadsServiceFilter}
                    onChange={(e) => setLeadsServiceFilter(e.target.value)}
                    className="bg-zinc-900 border border-white/5 px-3 py-2 rounded-xl text-xs text-zinc-300 focus:outline-none"
                  >
                    <option value="All">All Services</option>
                    <option value="Business Website">Business Website</option>
                    <option value="E-commerce Website">E-commerce Website</option>
                    <option value="Web Application">Web Application</option>
                    <option value="Admin Dashboard">Admin Dashboard</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="AI Image Creation">AI Image Creation</option>
                  </select>
                  <select
                    value={leadsBudgetFilter}
                    onChange={(e) => setLeadsBudgetFilter(e.target.value)}
                    className="bg-zinc-900 border border-white/5 px-3 py-2 rounded-xl text-xs text-zinc-300 focus:outline-none"
                  >
                    <option value="All">All Budgets</option>
                    <option value="Starter">Starter / Under $1k</option>
                    <option value="Pro">Pro / $1k - $5k</option>
                    <option value="Enterprise">Enterprise / $5k+</option>
                  </select>
                </div>

                {filteredLeads.length === 0 ? (
                  <div className="py-20 text-center rounded-2xl border border-white/5 bg-zinc-950/40 text-xs text-zinc-500 font-mono">
                    No chatbot leads match your search criteria.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredLeads.map((lead) => (
                      <div key={lead.id} className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <span className="text-sm font-bold text-white">{lead.name}</span>
                            <span className="text-[8px] ml-2 px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/20 text-gold-500 font-mono">
                              {lead.service}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <select
                              value={lead.status || 'New'}
                              onChange={async (e) => {
                                const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` };
                                try {
                                  await fetch(`${API_URL}/leads/${lead.id}`, {
                                    method: 'PUT',
                                    headers,
                                    body: JSON.stringify({ ...lead, status: e.target.value })
                                  });
                                  loadData();
                                } catch (err) {}
                              }}
                              className="px-2 py-1 bg-zinc-900 border border-white/5 text-[9px] uppercase tracking-wider font-bold rounded-lg text-zinc-300 focus:outline-none focus:border-gold-500"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Qualified">Qualified</option>
                              <option value="Converted">Converted</option>
                              <option value="Lost">Lost</option>
                            </select>

                            <button
                              onClick={async () => {
                                const headers = { 'Authorization': `Bearer ${authToken}` };
                                try {
                                  await fetch(`${API_URL}/leads/${lead.id}`, { method: 'DELETE', headers });
                                  loadData();
                                } catch (err) {}
                              }}
                              className="p-1 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                              title="Delete lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 text-[9px] font-mono text-zinc-400">
                          <span className="px-2.5 py-0.5 rounded bg-zinc-900 border border-white/5">📧 {lead.email}</span>
                          {lead.whatsapp && <span className="px-2.5 py-0.5 rounded bg-zinc-900 border border-white/5">📱 {lead.whatsapp}</span>}
                          {lead.company && <span className="px-2.5 py-0.5 rounded bg-zinc-900 border border-white/5">🏢 {lead.company}</span>}
                          <span className="px-2.5 py-0.5 rounded bg-zinc-900 border border-white/5">💰 {lead.budget}</span>
                          <span className="px-2.5 py-0.5 rounded bg-zinc-900 border border-white/5">⏰ {lead.timeline}</span>
                          <span className="px-2.5 py-0.5 rounded bg-zinc-900 border border-white/5 ml-auto">
                            {new Date(lead.timestamp).toLocaleString()}
                          </span>
                        </div>

                        {lead.description && <p className="text-xs text-zinc-300 leading-relaxed font-light">"{lead.description}"</p>}

                        {lead.conversationHistory && (
                          <details className="group">
                            <summary className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 cursor-pointer hover:text-gold-500">
                              View Conversation History
                            </summary>
                            <div className="mt-2 p-3 rounded-xl bg-zinc-950 border border-white/5 max-h-40 overflow-y-auto custom-scrollbar">
                              <pre className="text-[9px] text-zinc-400 font-mono whitespace-pre-wrap leading-relaxed">{lead.conversationHistory}</pre>
                            </div>
                          </details>
                        )}

                        <div className="pt-3 border-t border-white/5 flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Add admin notes about this lead..."
                            defaultValue={lead.notes || ''}
                            onBlur={async (e) => {
                              const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` };
                              try {
                                await fetch(`${API_URL}/leads/${lead.id}`, {
                                  method: 'PUT',
                                  headers,
                                  body: JSON.stringify({ ...lead, notes: e.target.value })
                                });
                              } catch (err) {}
                            }}
                            className="flex-1 bg-zinc-900 border border-white/5 px-3 py-1.5 rounded-lg text-[10px] text-zinc-300 focus:outline-none"
                          />
                          <span className="text-[8px] font-mono text-zinc-500 uppercase self-center">Auto-Saves</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab: Settings */}
            {activeTab === 'settings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 max-w-xl">
                <div>
                  <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                    <SettingsIcon className="w-5 h-5 text-gold-500" />
                    Website Core Configuration
                  </h2>
                  <p className="text-xs text-zinc-500">Configure global metadata properties and marketing banners.</p>
                </div>

                <form onSubmit={saveSettingsSubmit} className="bg-zinc-950/40 border border-white/5 rounded-2xl p-6 space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-zinc-300">Agency Visual Title</label>
                    <input 
                      type="text" 
                      value={settings.agencyName}
                      onChange={(e) => setSettings({...settings, agencyName: e.target.value})}
                      className="w-full px-3.5 py-2.5 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-zinc-300">Client Support / Notification Email</label>
                    <input 
                      type="email" 
                      value={settings.supportEmail}
                      onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                      className="w-full px-3.5 py-2.5 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        id="promo-banner-check"
                        checked={settings.showPromotionBanner}
                        onChange={(e) => setSettings({...settings, showPromotionBanner: e.target.checked})}
                        className="rounded border-white/5 text-gold-500 bg-zinc-900 focus:ring-0 cursor-pointer"
                      />
                      <label htmlFor="promo-banner-check" className="text-[10px] font-semibold text-zinc-300 cursor-pointer">
                        Enable Promotion Banners / Sticky Alerts
                      </label>
                    </div>

                    {settings.showPromotionBanner && (
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-semibold text-zinc-500 uppercase font-mono">Promo Banner Text</label>
                        <input 
                          type="text" 
                          value={settings.promoText}
                          onChange={(e) => setSettings({...settings, promoText: e.target.value})}
                          className="w-full px-3.5 py-2.5 bg-zinc-900/60 border border-white/5 rounded-xl text-xs text-white"
                        />
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-500 hover:bg-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Commit Website Settings
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
