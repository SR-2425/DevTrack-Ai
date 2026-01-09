
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Repositories: React.FC = () => {
  const [analyzingRepo, setAnalyzingRepo] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const repos = [
    { name: 'personal-reflection-api', stars: 12, commits: 342, lastSync: '2 hours ago', status: 'Active', language: 'Go' },
    { name: 'mirror-dashboard-ui', stars: 84, commits: 1560, lastSync: '5 hours ago', status: 'Active', language: 'TypeScript' },
    { name: 'growth-engine-rust', stars: 15, commits: 89, lastSync: '1 day ago', status: 'Stale', language: 'Rust' },
  ];

  const triggerAudit = (repoName: string) => {
    setAnalyzingRepo(repoName);
    setAnalysisResult(null);
    // Mimic user-initiated on-demand reflection
    setTimeout(() => {
      setAnalysisResult(`On-Demand Reflection for ${repoName}:
      
1. Language Pattern: Observed high complexity in utility modules. Suggest abstracting logic into reusable decorators.
2. Commit Structure: Frequency is excellent, but commit messages lack consistent imperative verbs. Refine for better history readability.
3. Hygiene: Identified 3 stale branches. A cleanup is recommended to maintain repository focus.

*Guidance generated based on mirrored metadata.*`);
    }, 2500);
  };

  return (
    <div className="space-y-10 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Mirrored Projects</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Repository-level insights available upon your explicit request.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {repos.map((repo, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={repo.name}
            className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-blue-500/30 transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                  <i className="fas fa-folder-open text-3xl"></i>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{repo.name}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-lg font-black uppercase ${repo.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                      {repo.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-5 mt-2 text-sm text-slate-500">
                    <span className="flex items-center gap-2"><i className="fas fa-code text-blue-500"></i> {repo.language}</span>
                    <span className="flex items-center gap-2"><i className="fas fa-history"></i> {repo.commits} Reflected</span>
                    <span className="flex items-center gap-2"><i className="fas fa-clock"></i> Sync: {repo.lastSync}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => triggerAudit(repo.name)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
                >
                  <i className="fas fa-wand-sparkles"></i>
                  Analyze Repository
                </button>
              </div>
            </div>

            <AnimatePresence>
              {analyzingRepo === repo.name && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-8"
                >
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-6">
                       <h4 className="text-xs font-black uppercase tracking-widest text-blue-500 flex items-center gap-2">
                         <i className="fas fa-microchip"></i>
                         On-Demand Reflection Audit
                       </h4>
                       <button onClick={() => setAnalyzingRepo(null)} className="text-slate-400 hover:text-slate-600">
                         <i className="fas fa-times"></i>
                       </button>
                    </div>
                    {analysisResult ? (
                      <div className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed italic prose prose-sm dark:prose-invert">
                        {analysisResult}
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 py-6">
                         <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                         <span className="text-sm text-slate-500 font-medium">Observing your mirror code for growth opportunities...</span>
                      </div>
                    )}
                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-[10px] text-slate-400 italic">
                      Disclaimer: Analysis is purely advisory and only occurs upon your explicit trigger.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Repositories;
