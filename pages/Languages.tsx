
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { MOCK_LANGUAGES } from '../constants';

const Languages: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Languages Analytics</h2>
        <p className="text-slate-500 dark:text-slate-400">Deep inspection of technology distribution across repositories.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold mb-6 dark:text-white">Primary Technology Stack</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_LANGUAGES}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {MOCK_LANGUAGES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold dark:text-white">Expertise Levels</h3>
          {MOCK_LANGUAGES.map((lang, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={lang.name} 
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }}></div>
                  <span className="font-bold dark:text-white">{lang.name}</span>
                </div>
                <span className="text-sm font-bold text-blue-500">{lang.value}% Usage</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.value}%` }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
              </div>
              <div className="mt-4 flex justify-between text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                <span>Core Ecosystem</span>
                <span>Pro Level Mastery</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Languages;
