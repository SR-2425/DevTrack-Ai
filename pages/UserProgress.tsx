
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Removed MOCK_ACTIVITY and MOCK_SUMMARY imports which were causing build errors as they are not used and MOCK_ACTIVITY does not exist in constants.
const UserProgress: React.FC = () => {
  const rankLevels = [
    { name: 'Newbie', score: 0, current: false },
    { name: 'Coder', score: 25, current: false },
    { name: 'Pro', score: 50, current: false },
    { name: 'Elite', score: 75, current: true },
    { name: 'Master', score: 100, current: false },
  ];

  const growthData = [
    { month: 'Jul', score: 45 },
    { month: 'Aug', score: 52 },
    { month: 'Sep', score: 68 },
    { month: 'Oct', score: 84 },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Personal Growth Tracker</h2>
          <p className="text-slate-500 dark:text-slate-400">Detailed analysis of your professional progression.</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-1">Current Milestone</p>
          <p className="text-lg font-bold dark:text-white">Elite Status</p>
        </div>
      </div>

      {/* Rank Progression Path */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <h3 className="text-lg font-bold mb-8 dark:text-white">Rank Progression Map</h3>
        <div className="relative h-2 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-between">
          <div className="absolute left-0 top-0 h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
          {rankLevels.map((lvl, i) => (
            <div key={lvl.name} className="relative z-10 flex flex-col items-center">
              <div className={`w-5 h-5 rounded-full border-4 ${lvl.score <= 75 ? 'bg-blue-500 border-blue-100 dark:border-slate-700 shadow-lg shadow-blue-500/40' : 'bg-slate-200 dark:bg-slate-700 border-white dark:border-slate-800'}`}></div>
              <p className={`absolute top-8 text-xs font-bold ${lvl.current ? 'text-blue-500' : 'text-slate-400 dark:text-slate-500'}`}>{lvl.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl flex items-center gap-4 border border-blue-100 dark:border-blue-800/30">
          <i className="fas fa-info-circle text-blue-500"></i>
          <p className="text-sm text-blue-800 dark:text-blue-300">
            You are <strong>124 commits</strong> away from reaching the <span className="font-bold">Master</span> rank.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Productivity Score Trend */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <h3 className="text-lg font-bold mb-6 dark:text-white">Monthly Productivity Growth</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-slate-800" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="#94a3b8" />
                <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="score" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Consistency Check */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <h3 className="text-lg font-bold mb-6 dark:text-white">Consistency Score: 94%</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className={`h-8 rounded-md ${i % 7 === 6 || i % 7 === 0 ? 'bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700' : 'bg-emerald-500/20 border border-emerald-500/30'} flex items-center justify-center`}>
                   {i % 3 === 0 && <i className="fas fa-check text-[10px] text-emerald-600"></i>}
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Your activity distribution is highly consistent during weekdays. You maintain an average of 4.2 active hours per day with a focus score of 8.2/10.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProgress;
