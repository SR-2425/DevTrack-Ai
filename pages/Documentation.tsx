import React from 'react';
import { motion } from 'framer-motion';

const Documentation: React.FC = () => {
  const sections = [
    {
      title: "How it Works",
      icon: "fa-sitemap",
      content: "DevTrack scans your coding activity automatically, so you don't have to fill out any forms or time sheets.",
      tech: ["Simple Setup", "Automatic Sync", "Fast Loading"]
    },
    {
      title: "AI Coaching",
      icon: "fa-brain",
      content: "We use smart AI to look at your work habits and give you real tips on how to improve your skills and career.",
      tech: ["Smart Tips", "Career Paths", "Goal Setting"]
    },
    {
      title: "Private & Safe",
      icon: "fa-shield-halved",
      content: "Your detailed code data is always private. Only you can see your personal habits and growth stories.",
      tech: ["Secure Data", "Private Profile", "No Sharing"]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">How to use DevTrack</h1>
        <p className="text-slate-500 font-medium">Simple guides to help you get the most out of your coding data.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {sections.map((section, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-md">
              <i className={`fas ${section.icon}`}></i>
            </div>
            <h3 className="text-sm font-black mb-3 uppercase tracking-widest">{section.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              {section.content}
            </p>
            <div className="flex flex-wrap gap-2">
              {section.tech.map(t => (
                <span key={t} className="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-400">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">Quick Start Guide</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-8">
            DevTrack is easy to use. Just connect your GitHub account, and we'll start showing you how you work and where you can grow. No manual work required.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest">
              Read More
            </button>
            <button className="px-6 py-3 bg-slate-800 text-white rounded-xl font-black text-xs uppercase tracking-widest border border-slate-700">
              Download Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;