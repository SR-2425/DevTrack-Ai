
import React, { useState } from 'react';

const Repositories: React.FC = () => {
  const [analyzing, setAnalyzing] = useState<string | null>(null);

  const repos = [
    { name: 'reflection-api', lang: 'Go', commits: 342, status: 'Active' },
    { name: 'dashboard-ui', lang: 'TypeScript', commits: 1560, status: 'Active' },
    { name: 'rust-engine', lang: 'Rust', commits: 89, status: 'Stale' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Repositories</h2>
        <p className="text-xs text-slate-500">Insights for your synced projects.</p>
      </div>

      <div className="space-y-4">
        {repos.map((repo) => (
          <div key={repo.name} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 group transition-all hover:border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                  <i className="fas fa-folder text-lg"></i>
                </div>
                <div>
                  <h3 className="font-bold text-sm">{repo.name}</h3>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-0.5">{repo.lang} &bull; {repo.commits} Commits</p>
                </div>
              </div>
              <button 
                onClick={() => setAnalyzing(analyzing === repo.name ? null : repo.name)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold"
              >
                Analyze
              </button>
            </div>
            {analyzing === repo.name && (
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 text-xs italic text-slate-500 leading-relaxed">
                Analysis: High logic complexity found in main modules. Consider breaking down larger components for better maintainability.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Repositories;
