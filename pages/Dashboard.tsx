
import React, { useState, useEffect } from 'react';
import { SummaryCard } from '../components/DashboardCards';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getDeveloperAssistantAdvice } from '../services/geminiService';
import { fetchSummaryStats, fetchActivityData, isUsingDemoData, getUserRole } from '../services/apiService';
import { SummaryStats, ActivityPoint, AIAssistantAdvice } from '../types';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');
  const [stats, setStats] = useState<SummaryStats | null>(null);
  const [activity, setActivity] = useState<ActivityPoint[]>([]);
  const [advice, setAdvice] = useState<AIAssistantAdvice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const role = getUserRole();

  useEffect(() => {
    const loadData = async () => {
      const s = await fetchSummaryStats();
      const a = await fetchActivityData(viewMode);
      setStats(s);
      setActivity(a);
      
      const assistantAdvice = await getDeveloperAssistantAdvice(s);
      setAdvice(assistantAdvice);
      setIsLoading(false);
    };
    loadData();
  }, [viewMode]);

  if (!stats) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const titlePrefix = role === 'admin' ? 'Organization' : role === 'team' ? 'Team' : 'Personal';

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{titlePrefix} Dashboard</h1>
          <p className="text-xs text-slate-500">
            {isUsingDemoData() ? 'Viewing Mock Data Context' : 'Real-time Analytics Feed'}
          </p>
        </div>
        <div className="flex items-center gap-2">
           <div className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${isUsingDemoData() ? 'bg-amber-100 text-amber-600' : 'bg-blue-50 text-blue-500 dark:bg-blue-900/10'}`}>
            {isUsingDemoData() ? 'Sandbox Mode' : 'Live Sync'}
          </div>
          <div className="text-[10px] font-black px-3 py-1 bg-slate-900 text-white rounded-full uppercase tracking-widest">
            Role: {role}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <SummaryCard 
          label={role === 'individual' ? "Total Commits" : "Team Output"} 
          value={stats.totalCommits} 
          icon="fa-code-commit" 
          colorClass="bg-blue-100 text-blue-600"
          description="Total contribution points aggregated from connected repositories."
        />
        <SummaryCard 
          label="Pulse Score" 
          value={stats.productivityScore} 
          icon="fa-bolt" 
          colorClass="bg-amber-100 text-amber-600"
          description="Algorithmic assessment of work-to-maintenance ratio."
        />
        <SummaryCard 
          label="Top Stack" 
          value={stats.mostUsedLanguage} 
          icon="fa-code" 
          colorClass="bg-emerald-100 text-emerald-600"
        />
        <SummaryCard 
          label="Active Hours" 
          value={stats.peakProductiveHours} 
          icon="fa-clock" 
          colorClass="bg-violet-100 text-violet-600"
        />
        <SummaryCard 
          label="Active Streak" 
          value={stats.activityStreak} 
          icon="fa-fire" 
          colorClass="bg-orange-100 text-orange-600"
        />
        <SummaryCard 
          label="Work Velocity" 
          value={stats.weeklyVelocity} 
          icon="fa-gauge-high" 
          colorClass="bg-indigo-100 text-indigo-600"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900 dark:text-white">Trend Analysis</h3>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              <button onClick={() => setViewMode('weekly')} className={`px-4 py-1 rounded-md text-xs font-bold transition-all ${viewMode === 'weekly' ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400' : 'text-slate-500'}`}>Weekly</button>
              <button onClick={() => setViewMode('monthly')} className={`px-4 py-1 rounded-md text-xs font-bold transition-all ${viewMode === 'monthly' ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400' : 'text-slate-500'}`}>Monthly</button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activity}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-slate-800" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} stroke="#94a3b8" fontSize={10} />
                <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" fontSize={10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="commits" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold mb-4 text-xs uppercase tracking-widest text-slate-500">Burnout Monitor</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">System Risk</span>
                <span className={`font-bold ${stats.burnoutRisk === 'High' ? 'text-red-500' : stats.burnoutRisk === 'Medium' ? 'text-amber-500' : 'text-emerald-500'}`}>{stats.burnoutRisk}</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${stats.burnoutRisk === 'High' ? 'bg-red-500 w-full' : stats.burnoutRisk === 'Medium' ? 'bg-amber-500 w-1/2' : 'bg-emerald-500 w-1/4'}`}
                />
              </div>
              <p className="text-[10px] text-slate-400 italic">Determined by commit timing consistency and weekend activity patterns.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold mb-4 text-xs uppercase tracking-widest text-slate-500">Momentum Radar</h3>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 28 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`aspect-square rounded-sm ${ (i % 7 < 4 || i % 5 === 0) ? 'bg-blue-500' : 'bg-slate-100 dark:bg-slate-800'}`}
                ></div>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-3 text-center uppercase font-black">28-Day Heatmap</p>
          </div>
        </div>
      </div>

      {/* AI Assistant - Integrated Bottom Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 dark:bg-slate-900 border border-slate-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <i className="fas fa-robot text-8xl rotate-12"></i>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
          <div className="shrink-0">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <i className="fas fa-brain text-2xl"></i>
            </div>
          </div>
          
          <div className="flex-grow space-y-8 w-full">
            <div>
              <h2 className="text-xl font-bold mb-2">DevPulse AI Assistant</h2>
              <p className="text-slate-400 text-sm">Providing {role}-focused coaching based on the latest performance telemetry.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <i className="fas fa-rocket text-blue-400"></i>
                  <h4 className="text-xs font-black uppercase tracking-widest text-blue-400">Optimization</h4>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  {isLoading ? "Consulting logs..." : advice?.performance}
                </p>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <i className="fas fa-heart-pulse text-rose-400"></i>
                  <h4 className="text-xs font-black uppercase tracking-widest text-rose-400">Health Signals</h4>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  {isLoading ? "Detecting fatigue..." : advice?.wellness}
                </p>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <i className="fas fa-scale-balanced text-emerald-400"></i>
                  <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400">Lifecycle Balance</h4>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  {isLoading ? "Checking work-rest cycle..." : advice?.balance}
                </p>
              </div>
            </div>
            
            {!isLoading && (
              <div className="flex items-center gap-2 pt-2 text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                Contextual Analysis Active • Mode: {role.toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
