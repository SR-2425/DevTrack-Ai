
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Settings: React.FC = () => {
  const [displayWorkPublic, setDisplayWorkPublic] = useState(true);
  const [showActiveStatus, setShowActiveStatus] = useState(true);
  const [leaderboardOptIn, setLeaderboardOptIn] = useState(false);
  const [analysisConsent, setAnalysisConsent] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <h2 className="text-xl font-bold dark:text-white">Developer Identity</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Identity is securely mirrored from your GitHub credentials.</p>
        </div>
        
        <div className="p-10 space-y-10">
          <div className="flex items-center gap-8">
            <div className="relative">
              <img src="https://picsum.photos/seed/devpulse/200/200" className="w-32 h-32 rounded-3xl border-4 border-slate-100 dark:border-slate-800 shadow-2xl object-cover" alt="Avatar" />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center border-4 border-white dark:border-slate-900">
                <i className="fab fa-github text-white"></i>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-black text-3xl dark:text-white tracking-tight">AlexRivers88</h3>
              </div>
              <p className="text-slate-500 font-medium mt-1">Professional Identity Mirrored from GitHub</p>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-200 dark:border-blue-800">Elite Level</span>
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200 dark:border-emerald-800">Verified Mirror</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-blue-50/50 dark:bg-blue-900/5 rounded-2xl border border-blue-100 dark:border-blue-800/20">
            <div className="flex items-start gap-4">
              <i className="fas fa-info-circle text-blue-500 mt-1 text-lg"></i>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-blue-900 dark:text-blue-200">Locked Mirror Fields</h4>
                <p className="text-xs text-blue-800/60 dark:text-blue-400/60 leading-relaxed">
                  To ensure authenticity, your handle and profile picture are strictly synchronized with GitHub. Update these details on your primary GitHub profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="p-10 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold dark:text-white">Privacy & Growth Controls</h2>
        </div>
        
        <div className="p-10 divide-y divide-slate-100 dark:divide-slate-800">
          {[
            { 
              id: 'leaderboard_opt', 
              label: 'Global Growth Leaderboard', 
              desc: 'Participate in the optional motivational ranking system to benchmark your growth path.', 
              state: leaderboardOptIn, 
              setter: setLeaderboardOptIn 
            },
            { 
              id: 'analysis_consent', 
              label: 'On-Demand Repository Analysis', 
              desc: 'Enable the option to request deep technical reflections on your repositories.', 
              state: analysisConsent, 
              setter: setAnalysisConsent 
            },
            { 
              id: 'active_status', 
              label: 'Public Mastery Status', 
              desc: 'Display your current Rank and Level Progress on your public growth profile.', 
              state: showActiveStatus, 
              setter: setShowActiveStatus 
            }
          ].map((item) => (
            <div key={item.id} className="py-8 first:pt-0 last:pb-0 flex items-center justify-between gap-10">
              <div className="max-w-xl">
                <p className="font-bold text-slate-800 dark:text-slate-100">{item.label}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
              </div>
              <button 
                onClick={() => item.setter(!item.state)}
                className={`w-14 h-7 rounded-full transition-colors relative shrink-0 ${item.state ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}
              >
                <motion.div 
                  animate={{ x: item.state ? 30 : 2 }}
                  className="w-6 h-6 bg-white rounded-full absolute top-0.5 shadow-md"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <button className="px-10 py-5 rounded-[2rem] bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-2xl">
          Apply Mirror Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
