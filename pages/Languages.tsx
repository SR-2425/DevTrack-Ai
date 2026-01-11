
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MOCK_LANGUAGES } from '../constants';

const Languages: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Skills Analysis</h2>
        <p className="text-xs text-slate-500">Technology breakdown across your work.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Stack Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MOCK_LANGUAGES} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {MOCK_LANGUAGES.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          {MOCK_LANGUAGES.map((lang) => (
            <div key={lang.name} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm">{lang.name}</span>
                <span className="text-xs text-blue-500 font-bold">{lang.value}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                <div className="h-full" style={{ width: `${lang.value}%`, backgroundColor: lang.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Languages;
