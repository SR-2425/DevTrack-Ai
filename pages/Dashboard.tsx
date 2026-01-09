
import React, { useState, useEffect } from 'react';
import { SummaryCard, LevelCard } from '../components/DashboardCards';
import { MOCK_SUMMARY, WEEKLY_ACTIVITY, MONTHLY_ACTIVITY } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getDeveloperInsights } from '../services/geminiService';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');
  const [insights, setInsights] = useState<string>("Analyzing your coding patterns...");
  const [isLoadingInsights, setIsLoadingInsights] = useState(true);

  const chartData = viewMode === 'weekly' ? WEEKLY_ACTIVITY : MONTHLY_ACTIVITY;

  useEffect(() => {
    const fetchInsights = async () => {
      setIsLoadingInsights(true);
      const result = await getDeveloperInsights(MOCK_SUMMARY);
      setInsights(result);
      setIsLoadingInsights(false);
    };
    fetchInsights();
  }, []);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg italic">
            Visualizing your professional coding evolution and consistency.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/10 px-4 py-2 rounded-xl border border-blue-100 dark:border-blue-800/30 shrink-0">
          <i className="fas fa-sync-alt text-blue-500 animate-spin-slow"></i>
          <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Live Mirror Syncing</span>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <LevelCard rank={MOCK_SUMMARY.currentRank} progress={MOCK_SUMMARY.levelProgress} />
        </div>
        <SummaryCard 
          label="Total Commits" 
          value={MOCK_SUMMARY.totalCommits.toLocaleString()} 
          icon="fa-code-commit" 
          colorClass="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
          description="Total reflected code contributions."
        />
        <SummaryCard 
          label="Productivity Score" 
          value={MOCK_SUMMARY.productivityScore} 
          icon="fa-bolt" 
          colorClass="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
          description="Calculated based on logic impact and complexity."
        />
        <SummaryCard 
          label="Activity Streak" 
          value={`${MOCK_SUMMARY.activityStreak} Days`} 
          icon="fa-fire" 
          colorClass="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
          description="Number of consecutive contribution days."
        />
        <SummaryCard 
          label="Weekly Velocity" 
          value={MOCK_SUMMARY.weeklyVelocity} 
          icon="fa-gauge-high" 
          colorClass="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
          description="Average throughput for the last 7 days."
        />
        <SummaryCard 
          label="Top Language" 
          value={MOCK_SUMMARY.mostUsedLanguage} 
          icon="fa-code" 
          colorClass="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
          description="The programming language you mirrored most this cycle."
        />
        <SummaryCard 
          label="Productive Hours" 
          value={MOCK_SUMMARY.peakProductiveHours} 
          icon="fa-clock" 
          colorClass="bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
          description="Your mirrored peak performance window."
        />
      </div>

      {/* Main Trends Chart */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Growth Trends</h3>
            <p className="text-sm text-slate-500 mt-1">Reflecting productivity across time cycles.</p>
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button 
              onClick={() => setViewMode('weekly')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'weekly' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500'}`}
            >
              Weekly
            </button>
            <button 
              onClick={() => setViewMode('monthly')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'monthly' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500'}`}
            >
              Monthly
            </button>
          </div>
        </div>
        
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRef" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-slate-800" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} stroke="#94a3b8" fontSize={12} dy={10} />
              <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" fontSize={12} dx={-10} />
              <Tooltip 
                 contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="commits" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorRef)" animationDuration={1000} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Habit Distribution - One Line */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 mb-6">
          <i className="fas fa-calendar-alt text-blue-500"></i>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">Habit Distribution Map</h3>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-1.5 pb-2 min-w-max">
            {Array.from({ length: 52 }).map((_, i) => {
              const isActive = (i * 7) % 11 < 4 || i % 5 === 0;
              return (
                <div 
                  key={i} 
                  className={`w-3.5 h-3.5 rounded-sm shrink-0 transition-transform hover:scale-125 ${isActive ? 'bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.25)]' : 'bg-slate-100 dark:bg-slate-800'}`}
                  title={`Week ${i + 1}`}
                ></div>
              );
            })}
          </div>
        </div>
        <div className="mt-4 flex justify-between text-[9px] text-slate-400 font-black uppercase tracking-widest">
          <span>Past 52 Weeks Activity</span>
          <div className="flex gap-2">
            <span>Low</span>
            <div className="flex gap-0.5">
              {[0, 1, 2, 3].map(v => <div key={v} className={`w-2.5 h-2.5 rounded-sm ${v === 0 ? 'bg-slate-100 dark:bg-slate-800' : v === 1 ? 'bg-blue-200' : v === 2 ? 'bg-blue-400' : 'bg-blue-600'}`}></div>)}
            </div>
            <span>High</span>
          </div>
        </div>
      </div>

      {/* AI Coach - Simplistic and Below Map */}
      <div className="bg-slate-900 dark:bg-slate-950 p-8 rounded-3xl text-white shadow-xl border border-slate-800">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
            <i className="fas fa-magic text-blue-400 text-lg"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight">AI Coach Reflection</h3>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Direct Guidance</p>
          </div>
        </div>
        
        <div className="space-y-6">
          {isLoadingInsights ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-3 bg-slate-800 rounded-full w-full"></div>
              <div className="h-3 bg-slate-800 rounded-full w-2/3"></div>
            </div>
          ) : (
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-slate-300 text-base font-medium italic">
              "{insights}"
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
            <div className="flex items-center gap-3 text-rose-400 shrink-0">
              <i className="fas fa-heart-pulse"></i>
              <span className="font-bold text-xs uppercase">Health Signal</span>
            </div>
            <p className="text-rose-200/70 text-xs text-center sm:text-left">
              Current burnout risk is <strong>{MOCK_SUMMARY.burnoutRisk}</strong>. Keep sessions balanced.
            </p>
            <button className="px-5 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-[10px] font-bold uppercase rounded-lg transition-colors border border-rose-500/30">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
