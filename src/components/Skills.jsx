import React from 'react';
import { Layers, Server, Database, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Layers className="w-5 h-5 text-gold-500" />,
      skills: [
        { name: "HTML", level: "98%" },
        { name: "CSS", level: "95%" },
        { name: "JavaScript", level: "94%" },
        { name: "React", level: "95%" },
        { name: "Tailwind CSS", level: "98%" }
      ],
      id: "skills-frontend"
    },
    {
      title: "Backend Development",
      icon: <Server className="w-5 h-5 text-gold-500" />,
      skills: [
        { name: "Java", level: "90%" },
        { name: "Spring Boot", level: "88%" },
        { name: "Node.js", level: "92%" }
      ],
      id: "skills-backend"
    },
    {
      title: "Database Systems",
      icon: <Database className="w-5 h-5 text-gold-500" />,
      skills: [
        { name: "MySQL", level: "90%" },
        { name: "MongoDB", level: "88%" }
      ],
      id: "skills-database"
    },
    {
      title: "DevOps & Tooling",
      icon: <Wrench className="w-5 h-5 text-gold-500" />,
      skills: [
        { name: "Docker", level: "82%" },
        { name: "AWS Services", level: "80%" },
        { name: "Git & Version Control", level: "95%" }
      ],
      id: "skills-tools"
    }
  ];

  return (
    <section id="skills" className="py-28 px-6 md:px-12 bg-[#050507] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-gold-500"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">Skills Matrix</span>
            <span className="w-8 h-[1px] bg-gold-500"></span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Technical Arsenal Structured <br />
            <span className="text-gold-gradient font-display">For Production Scale</span>
          </h2>
          
          <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed">
            I specialize in full-stack development, database query optimization, and secure infrastructure.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              id={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="glass-panel p-8 rounded-3xl border border-white/5 glow-border-gold transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, sIndex) => (
                  <div key={sIndex} className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-zinc-300">{skill.name}</span>
                      <span className="text-gold-500 font-mono">{skill.level}</span>
                    </div>
                    {/* Progress Bar Track */}
                    <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.level }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: sIndex * 0.05 }}
                        className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
