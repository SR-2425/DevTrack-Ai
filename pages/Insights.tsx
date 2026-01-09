
import React from 'react';
import { motion } from 'framer-motion';

const Insights: React.FC = () => {
  return (
    <div className="space-y-10 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Growth Reflection Hub</h2>
          <p className="text-slate-500 dark:text-slate-400">Transforming technical markers into meaningful career narratives.</p>
        </div>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition-all font-bold shadow-xl shadow-blue-600/20 flex items-center gap-3">
          <i className="fas fa-magic"></i>
          Request Full Reflection
        </button>
      </div>

      {/* Narrative Mirror Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="p-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <i className="fas fa-lightbulb text-9xl"></i>
          </div>
          <h3 className="text-2xl font-bold tracking-tight italic">"The mirror shows a developer committed to disciplined growth."</h3>
          <p className="text-blue-100 text-sm mt-2 opacity-90 font-medium">Analysis Cycle: Q4 Professional Cycle</p>
        </div>
        
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
          {/* Growth Summary */}
          <div className="p-10 space-y-6">
            <div className="flex items-center gap-4 text-blue-600 dark:text-blue-400 mb-2">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <i className="fas fa-seedling text-lg"></i>
              </div>
              <h4 className="font-extrabold uppercase tracking-widest text-xs">Behavioral Mirror</h4>
            </div>
            <ul className="space-y-4">
              {[
                { label: 'Consistency', text: 'Daily output velocity is up 15% WoW. Discipline is peak.', color: 'emerald' },
                { label: 'Habit Gap', text: 'Documentation frequency is lower than code creation. Focus on parity.', color: 'amber' },
                { label: 'Efficiency', text: 'Focus score is maintained at 92/100 despite repo diversity.', color: 'blue' }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <i className={`fas fa-check-circle text-${item.color}-500 mt-1`}></i>
                  <div>
                    <p className="text-xs font-black uppercase text-slate-400 mb-1">{item.label}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Reflection */}
          <div className="p-10 space-y-6 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="flex items-center gap-4 text-indigo-600 dark:text-indigo-400 mb-2">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                <i className="fas fa-terminal text-lg"></i>
              </div>
              <h4 className="font-extrabold uppercase tracking-widest text-xs">Technical Skill Mirror</h4>
            </div>
            <div className="space-y-6">
              {[
                { label: 'Commit Hygiene', score: '8.4/10', sub: 'High standard logic splitting.' },
                { label: 'Refactor Ratio', score: 'Optimal', sub: '1 audit per 5 feature cycles.' },
                { label: 'Tech Debt Mirror', score: '12%', sub: 'Healthy balance maintained.' }
              ].map((stat, idx) => (
                <div key={idx} className="flex justify-between items-start gap-4">
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{stat.label}</p>
                    <p className="text-xs text-slate-500 mt-1">{stat.sub}</p>
                  </div>
                  <span className="text-sm font-mono font-black text-indigo-500 bg-white dark:bg-slate-900 px-3 py-1 rounded-lg border border-indigo-100 dark:border-indigo-900/30 shadow-sm">
                    {stat.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-100 dark:bg-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Reflection Accuracy: 96% Model Confidence</span>
          </div>
          <button className="text-blue-600 dark:text-blue-400 font-bold hover:underline text-xs flex items-center gap-2">
            View Historical Evolution Path
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Values & Ethics */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
           <h4 className="font-bold mb-4 flex items-center gap-3 text-slate-800 dark:text-white">
             <i className="fas fa-shield-halved text-blue-500"></i>
             Self-Awareness Philosophy
           </h4>
           <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
             DevPulse is your personal growth journal. We do not judge your code; we reflect its patterns. No metrics are used for surveillance—every insight is for your private career calibration.
           </p>
        </div>
        <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700 text-white">
           <h4 className="font-bold mb-4 flex items-center gap-3">
             <i className="fas fa-user-check text-blue-400"></i>
             Privacy Standard
           </h4>
           <p className="text-slate-400 text-sm leading-relaxed">
             Your source code never leaves your GitHub account. DevPulse processes ephemeral metadata locally to ensure your intellectual property remains private and protected.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Insights;
