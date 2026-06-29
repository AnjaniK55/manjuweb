import React, { useEffect, useState } from 'react';
import { Star, GitFork, BookOpen, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/users/AnjaniK55/repos?sort=updated&per_page=4')
      .then(res => {
        if (!res.ok) throw new Error('API limit reached');
        return res.json();
      })
      .then(data => {
        setRepos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center text-xs text-zinc-500 font-mono tracking-widest animate-pulse">
        CONNECTING TO GITHUB STREAM...
      </div>
    );
  }

  if (error || repos.length === 0) {
    return (
      <div className="py-12 text-center text-xs text-zinc-500 font-mono">
        Failed to fetch repositories. Click logo above to visit profile.
      </div>
    );
  }

  return (
    <div className="space-y-8 mt-12">
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 flex items-center gap-1.5 font-mono">
          <BookOpen className="w-3.5 h-3.5 text-gold-500" />
          Live GitHub Repositories
        </span>
        <a 
          href="https://github.com/AnjaniK55" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] uppercase font-bold tracking-widest text-gold-500 hover:text-zinc-100 transition-colors flex items-center gap-1"
        >
          Explore All Profile Repos
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {repos.map((repo, index) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-panel p-6 rounded-2xl border border-white/5 glow-border-gold flex flex-col justify-between group cursor-pointer hover:bg-zinc-900/10"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-white font-mono truncate max-w-[80%]">
                  {repo.name}
                </h4>
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-4 h-4 text-zinc-500 group-hover:text-gold-500 transition-colors"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed font-light line-clamp-2 mb-4">
                {repo.description || "No description provided. Click to explore source files."}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[10px] text-zinc-400 font-mono">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-gold-500" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3 h-3 text-gold-500" />
                  {repo.forks_count}
                </span>
              </div>
              {repo.language && (
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-gold-500">
                  {repo.language}
                </span>
              )}
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
