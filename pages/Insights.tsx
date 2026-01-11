
import React from 'react';

const Insights: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Insights</h2>
          <p className="text-xs text-slate-500">Career narratives based on technical markers.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">New Reflection</button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-8 bg-blue-600 text-white">
          <h3 className="text-lg font-bold italic">"Consistency is your strongest skill this cycle."</h3>
          <p className="text-blue-100 text-[10px] mt-1 uppercase font-bold tracking-widest">Q4 Analysis Cycle</p>
        </div>
        
        <div className="grid md:grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800">
          <div className="p-8 space-y-4">
            <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Behaviors</h4>
            <ul className="space-y-3">
              <li className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2"><i className="fas fa-check text-emerald-500"></i> High daily velocity (up 15%)</li>
              <li className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2"><i className="fas fa-check text-emerald-500"></i> Focus score 92/100</li>
              <li className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2"><i className="fas fa-info-circle text-amber-500"></i> Documentation needs more focus</li>
            </ul>
          </div>
          <div className="p-8 space-y-4">
            <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Technical</h4>
            <ul className="space-y-3">
              <li className="text-sm text-slate-600 dark:text-slate-300 flex justify-between"><span>Commit Hygiene</span> <span className="font-bold">8.4/10</span></li>
              <li className="text-sm text-slate-600 dark:text-slate-300 flex justify-between"><span>Refactor Ratio</span> <span className="font-bold">Optimal</span></li>
              <li className="text-sm text-slate-600 dark:text-slate-300 flex justify-between"><span>Tech Debt</span> <span className="font-bold">12%</span></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-slate-900 rounded-2xl text-white text-center">
        <p className="text-xs text-slate-400">DevTrack focuses on private career calibration, not surveillance.</p>
      </div>
    </div>
  );
};

export default Insights;
