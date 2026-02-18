import React from 'react';
import { MOCK_LANGUAGES } from '../constants';
import GrowthBarChart from '../components/charts/types/GrowthBarChart';
import SkillsPieChart from '../components/charts/types/SkillsPieChart';

const UserProgress: React.FC = () => {
  const growthData = [
    { month: 'Jul', score: 45 },
    { month: 'Aug', score: 52 },
    { month: 'Sep', score: 68 },
    { month: 'Oct', score: 84 },
  ];

  return (
    <div className="space-y-12">
      {/* --- Growth Section --- */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">My Progress Report</h2>
          <p className="text-sm text-slate-500 mt-1">See how much you've improved over time.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="min-h-[400px]">
            <GrowthBarChart data={growthData} />
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/60 flex flex-col justify-center shadow-xl shadow-slate-900/[0.02]">
            <h3 className="text-xl font-black mb-2 text-slate-900 dark:text-white">Consistency Score: 94%</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              You maintain a great pace on weekdays, which is key to building strong work habits.
            </p>
            <div className="mt-6 grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className={`h-8 rounded-lg ${i % 7 === 0 || i % 7 === 6 ? 'bg-slate-100 dark:bg-slate-800/50' : 'bg-emerald-500/20 border-2 border-emerald-500/30'}`}></div>
              ))}
            </div>
            <div className="mt-4 flex justify-between text-[9px] text-slate-400 uppercase font-black tracking-[0.1em]">
              <span>Work Days</span>
              <span>Weekends</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Skills Section --- */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Skills Analysis</h2>
          <p className="text-sm text-slate-500 mt-1">Technology breakdown across your work.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="min-h-[400px]">
            <SkillsPieChart data={MOCK_LANGUAGES} />
          </div>

          <div className="space-y-4 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-900/[0.02]">
            <h3 className="font-black text-lg tracking-tight text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-4">Language Details</h3>
            {MOCK_LANGUAGES.map((lang) => (
              <div key={lang.name} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{lang.name}</span>
                  <span className="text-xs font-black" style={{ color: lang.color }}>{lang.value}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${lang.value}%`, backgroundColor: lang.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProgress;
