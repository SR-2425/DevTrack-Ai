
import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState(false);
  const [analysis, setAnalysis] = useState(true);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 flex items-center gap-6">
        <img src="https://picsum.photos/seed/dev/200/200" className="w-20 h-20 rounded-xl object-cover border border-slate-200" alt="Avatar" />
        <div>
          <h3 className="text-2xl font-bold">AlexRivers88</h3>
          <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mt-1">Elite Developer</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 divide-y divide-slate-50 dark:divide-slate-800">
        <div className="p-8">
          <h2 className="font-bold text-lg mb-6">Preferences</h2>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-sm">Public Leaderboard</p>
                <p className="text-xs text-slate-500 mt-1">Show your rank to the community.</p>
              </div>
              <button onClick={() => setLeaderboard(!leaderboard)} className={`w-10 h-5 rounded-full transition-all relative ${leaderboard ? 'bg-blue-600' : 'bg-slate-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${leaderboard ? 'left-5.5' : 'left-0.5'}`} style={{ left: leaderboard ? '22px' : '2px' }} />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-sm">Deep Repo Analysis</p>
                <p className="text-xs text-slate-500 mt-1">Allow AI to provide technical improvement tips.</p>
              </div>
              <button onClick={() => setAnalysis(!analysis)} className={`w-10 h-5 rounded-full transition-all relative ${analysis ? 'bg-blue-600' : 'bg-slate-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${analysis ? 'left-5.5' : 'left-0.5'}`} style={{ left: analysis ? '22px' : '2px' }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-8 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold text-sm">Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;
