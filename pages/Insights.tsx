import React from 'react';
import { motion } from 'framer-motion';

const Insights: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">AI Growth Report</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Your Progress Story</h1>
          <p className="text-sm text-slate-500 font-medium">Using your coding data to help you grow your career.</p>
        </div>
        <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:-translate-y-1 transition-all">
          Update Report
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl"
      >
        <div className="p-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative">
          <p className="text-xs font-black uppercase tracking-[0.4em] mb-4 opacity-70">Summary • Current Period</p>
          <h3 className="text-3xl font-black leading-tight italic max-w-2xl">
            "You are showing steady growth in how you build systems and keep your code clean and organized."
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800">
          <div className="p-10 space-y-8">
            <div>
              <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-[0.3em] mb-6 flex items-center gap-3">
                <i className="fas fa-bolt text-blue-500"></i> Work Habits
              </h4>
              <ul className="space-y-6">
                {[
                  { icon: 'fa-check-circle', text: 'You coded 18% more this period.', color: 'text-emerald-500' },
                  { icon: 'fa-check-circle', text: 'You do your best work late in the morning.', color: 'text-emerald-500' },
                  { icon: 'fa-info-circle', text: 'Try to document your code a bit more.', color: 'text-amber-500' },
                  { icon: 'fa-triangle-exclamation', text: 'Take more time off during the weekends.', color: 'text-rose-500' }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 group">
                    <i className={`fas ${item.icon} ${item.color} mt-1 text-base`}></i>
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300 transition-colors">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="p-10 space-y-8 bg-slate-50/50 dark:bg-slate-800/20">
            <div>
              <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-[0.3em] mb-6 flex items-center gap-3">
                <i className="fas fa-code text-indigo-500"></i> Code Health
              </h4>
              <div className="space-y-6">
                {[
                  { label: "Update Clarity", value: "8.8/10", desc: "How easy it is for others to read your updates." },
                  { label: "Cleanup Ratio", value: "34%", desc: "How much time you spend fixing vs. building." },
                  { label: "Stability Score", value: "Solid", desc: "Your code is reliable and follows good rules." }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-xs font-black text-slate-800 dark:text-white uppercase">{stat.label}</span>
                      <span className="text-lg font-black text-blue-600 dark:text-blue-400">{stat.value}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div whileHover={{ scale: 1.02 }} className="p-8 bg-gradient-to-br from-slate-800 to-slate-950 rounded-3xl text-white flex items-center gap-6">
           <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
              <i className="fas fa-rocket text-2xl text-blue-400"></i>
           </div>
           <div>
             <h4 className="font-black mb-1">Career Goal Sync</h4>
             <p className="text-xs text-slate-400">Match your coding habits with your dream job requirements.</p>
           </div>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} className="p-8 bg-gradient-to-br from-indigo-800 to-indigo-950 rounded-3xl text-white flex items-center gap-6">
           <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
              <i className="fas fa-user-graduate text-2xl text-indigo-300"></i>
           </div>
           <div>
             <h4 className="font-black mb-1">Skill Gap Check</h4>
             <p className="text-xs text-slate-400">Find out which 3 skills you should learn next.</p>
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Insights;