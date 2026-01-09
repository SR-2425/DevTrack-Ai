
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Automation: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);

  const triggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 3000);
  };

  const tasks = [
    { id: 1, name: 'Daily Contribution Sync', schedule: 'Every 24 hours', lastRun: '2 hours ago', status: 'Running' },
    { id: 2, name: 'Weekly Insight Generation', schedule: 'Mondays 00:00', lastRun: '4 days ago', status: 'Idle' },
    { id: 3, name: 'Team Pulse Aggregation', schedule: 'Every 6 hours', lastRun: '1 hour ago', status: 'Running' },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Automation Engine</h2>
          <p className="text-slate-500 dark:text-slate-400">Scheduled data processing and synchronization tasks.</p>
        </div>
        <button 
          onClick={triggerSync}
          disabled={isSyncing}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
            isSyncing 
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
          }`}
        >
          <i className={`fas fa-sync ${isSyncing ? 'animate-spin' : ''}`}></i>
          {isSyncing ? 'Syncing...' : 'Force Global Sync'}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold dark:text-white">Scheduled Pipelines</h3>
          {tasks.map((task) => (
            <div key={task.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${task.status === 'Running' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                  <i className={`fas ${task.status === 'Running' ? 'fa-cog fa-spin' : 'fa-clock'}`}></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">{task.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{task.schedule}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 uppercase font-bold">Last Run</p>
                <p className="text-sm dark:text-slate-200">{task.lastRun}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
          <h3 className="text-lg font-bold mb-4 relative z-10">Sync Status Overview</h3>
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Uptime</span>
              <span className="text-emerald-400 font-bold">99.9%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">API Queue</span>
              <span className="font-bold">0 Pending</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Last Error</span>
              <span className="text-slate-500 italic">None</span>
            </div>
          </div>
          <div className="mt-8 relative z-10">
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <motion.div 
                animate={{ x: [-100, 300] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-20 h-full bg-blue-500"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-2 uppercase font-bold text-center tracking-widest">Active Processing Layer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Automation;
