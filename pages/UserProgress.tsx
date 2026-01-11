
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const UserProgress: React.FC = () => {
  const growthData = [
    { month: 'Jul', score: 45 },
    { month: 'Aug', score: 52 },
    { month: 'Sep', score: 68 },
    { month: 'Oct', score: 84 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Growth Tracker</h2>
        <p className="text-xs text-slate-500">Your professional evolution summary.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold mb-6 text-xs uppercase text-slate-400 tracking-widest">Monthly Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={10} stroke="#94a3b8" />
                <YAxis axisLine={false} tickLine={false} fontSize={10} stroke="#94a3b8" />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-center shadow-sm">
          <h3 className="font-bold mb-2 text-slate-900 dark:text-white">Consistency Score: 94%</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            You maintain strong daily momentum with highly active focus windows on weekdays.
          </p>
          <div className="mt-6 grid grid-cols-7 gap-1">
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className={`h-8 rounded-sm ${i % 7 === 0 || i % 7 === 6 ? 'bg-slate-50 dark:bg-slate-800' : 'bg-emerald-500/10 border border-emerald-500/20'}`}></div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-[10px] text-slate-400 uppercase font-black tracking-tighter">
            <span>Focus Active</span>
            <span>Resting Cycle</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 p-8 rounded-2xl text-white">
        <h3 className="text-lg font-bold mb-2">Steady Progress</h3>
        <p className="text-blue-100 text-sm leading-relaxed max-w-2xl">
          Based on your current output, your technical depth is increasing steadily. Continue focusing on consistent daily contributions to reinforce your engineering foundations.
        </p>
      </div>
    </div>
  );
};

export default UserProgress;
