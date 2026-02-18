import React, { useState, useEffect } from 'react';
import { SummaryCard } from '../components/DashboardCards';
import { getDeveloperAssistantAdvice } from '../services/geminiService';
import { fetchSummaryStats, fetchActivityData, isUsingDemoData } from '../services/apiService';
import { SummaryStats, ActivityPoint, AIAssistantAdvice } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import ActivityAreaChart from '../components/charts/types/ActivityAreaChart';

const Dashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');
  const [stats, setStats] = useState<SummaryStats | null>(null);
  const [activity, setActivity] = useState<ActivityPoint[]>([]);
  const [advice, setAdvice] = useState<AIAssistantAdvice | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsInitialLoading(true);
      const [s, a] = await Promise.all([
        fetchSummaryStats(),
        fetchActivityData(viewMode)
      ]);
      setStats(s);
      setActivity(a);
      setIsInitialLoading(false);
    };
    loadData();
  }, [viewMode]);

  const handleDeepAnalysis = async () => {
    if (!stats) return;
    setIsAnalyzing(true);
    // Visual feedback for AI scanning
    await new Promise(resolve => setTimeout(resolve, 1200));
    const assistantAdvice = await getDeveloperAssistantAdvice(stats);
    setAdvice(assistantAdvice);
    setIsAnalyzing(false);
  };

  if (isInitialLoading || !stats) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse italic">Syncing your workspace...</p>
    </div>
  );

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                <span className={`w-2 h-2 rounded-full ${isUsingDemoData() ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-500">
                  {isUsingDemoData() ? 'Sandbox Mode' : 'Live Connection'}
                </span>
             </div>
             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/50">v4.1</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">My Coding Pulse</h1>
          <p className="text-sm text-slate-500 font-medium mt-2">A quick look at your work habits and technical progress.</p>
        </div>

        <button 
          onClick={handleDeepAnalysis}
          disabled={isAnalyzing}
          className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-4 shadow-2xl ${
            isAnalyzing 
              ? 'bg-slate-200 text-slate-400 dark:bg-slate-800 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-1 shadow-blue-500/30'
          }`}
        >
          {isAnalyzing ? (
            <><i className="fas fa-circle-notch fa-spin"></i> Analyzing...</>
          ) : (
            <><i className="fas fa-brain"></i> Get AI Insights</>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        <SummaryCard 
          label="Total Updates" 
          value={stats.totalCommits.toLocaleString()} 
          icon="fa-code-commit" 
          colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/30"
          description="The total number of code changes you've made."
        />
        <SummaryCard 
          label="Output Score" 
          value={`${stats.productivityScore}%`} 
          icon="fa-bolt-lightning" 
          colorClass="bg-amber-100 text-amber-600 dark:bg-amber-900/30"
          description="A calculated score based on your work speed and quality."
        />
        <SummaryCard 
          label="Main Language" 
          value={stats.mostUsedLanguage} 
          icon="fa-terminal" 
          colorClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30"
        />
        <SummaryCard 
          label="Best Time" 
          value={stats.peakProductiveHours} 
          icon="fa-clock" 
          colorClass="bg-violet-100 text-violet-600 dark:bg-violet-900/30"
        />
        <SummaryCard 
          label="Daily Streak" 
          value={`${stats.activityStreak}d`} 
          icon="fa-fire-flame-curved" 
          colorClass="bg-orange-100 text-orange-600 dark:bg-orange-900/30"
        />
        <SummaryCard 
          label="Weekly Speed" 
          value={stats.weeklyVelocity} 
          icon="fa-gauge-high" 
          colorClass="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30"
        />
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Refactored Chart Component */}
          <div className="h-full">
            <ActivityAreaChart data={activity} isLoading={isInitialLoading} />
          </div>

          <AnimatePresence mode="wait">
            {(advice || isAnalyzing) && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-900 border border-slate-800 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl"
              >
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
                
                <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
                  <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center shrink-0 shadow-2xl relative ${isAnalyzing ? 'bg-blue-600/20' : 'bg-blue-600 shadow-blue-500/30'}`}>
                    <i className={`fas ${isAnalyzing ? 'fa-sync fa-spin' : 'fa-brain'} text-4xl`}></i>
                  </div>
                  
                  <div className="flex-grow space-y-10 w-full">
                    <div className="text-center lg:text-left">
                      <h2 className="text-3xl font-black tracking-tight mb-2">Your AI Growth Advice</h2>
                      <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.4em]">Personalized coaching report</p>
                    </div>

                    {isAnalyzing ? (
                      <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="bg-white/5 h-32 rounded-3xl border border-white/5 animate-pulse"></div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:bg-white/10 transition-all hover:scale-[1.02]">
                          <p className="text-[10px] uppercase font-black tracking-widest text-blue-400 mb-4">Efficiency</p>
                          <p className="text-sm text-slate-200 leading-relaxed font-semibold italic">"{advice?.performance}"</p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:bg-white/10 transition-all hover:scale-[1.02]">
                          <p className="text-[10px] uppercase font-black tracking-widest text-emerald-400 mb-4">Wellbeing</p>
                          <p className="text-sm text-slate-200 leading-relaxed font-semibold italic">"{advice?.wellness}"</p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:bg-white/10 transition-all hover:scale-[1.02]">
                          <p className="text-[10px] uppercase font-black tracking-widest text-amber-400 mb-4">Work Balance</p>
                          <p className="text-sm text-slate-200 leading-relaxed font-semibold italic">"{advice?.balance}"</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-900/[0.02]">
            <h3 className="font-black mb-8 text-[11px] uppercase tracking-[0.4em] text-slate-400 text-center">Sync Status</h3>
            <div className="space-y-4">
              {[
                { name: 'Coding Activity', status: 'Connected', icon: 'fa-code-branch' },
                { name: 'Daily Trends', status: 'Ready', icon: 'fa-chart-line' },
                { name: 'Language Use', status: 'Ready', icon: 'fa-layer-group' },
                { name: 'Wellbeing Check', status: 'Ready', icon: 'fa-heartbeat' },
              ].map((source, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-slate-400 shadow-sm group-hover:text-blue-500 transition-colors">
                      <i className={`fas ${source.icon} text-sm`}></i>
                    </div>
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300 tracking-tight">{source.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${source.status === 'Connected' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{source.status}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 pt-10 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Wellbeing Check</span>
                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                  stats.burnoutRisk === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  {stats.burnoutRisk} RISK
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: stats.burnoutRisk === 'High' ? '85%' : stats.burnoutRisk === 'Medium' ? '45%' : '15%' }}
                  className={`h-full transition-all duration-1000 ${stats.burnoutRisk === 'High' ? 'bg-rose-500' : 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]'}`}
                />
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4 leading-relaxed text-center italic opacity-60">Based on your recent coding hours.</p>
            </div>
          </div>

          {!advice && !isAnalyzing && (
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-blue-600 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-blue-600/30 relative overflow-hidden"
            >
              <h4 className="font-black text-2xl mb-3 tracking-tighter">AI Analysis Ready</h4>
              <p className="text-xs text-blue-100 leading-relaxed mb-8 font-medium">
                Your data is synced. Run a scan to get personalized advice on how to grow your career and stay balanced.
              </p>
              <button 
                onClick={handleDeepAnalysis}
                className="w-full py-4 bg-white text-blue-600 rounded-[1.2rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-3"
              >
                Scan Now <i className="fas fa-arrow-right text-[8px]"></i>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
