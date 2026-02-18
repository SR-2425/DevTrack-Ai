import React from 'react';
import { motion } from 'framer-motion';

interface SummaryCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: string;
  trendUp?: boolean;
  colorClass: string;
  description?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, icon, colorClass, description }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm transition-all group relative overflow-hidden"
  >
    <div className="flex items-start justify-between relative z-10">
      <div className="min-w-0">
        <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest truncate mb-1">{label}</p>
        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</h3>
      </div>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${colorClass} transition-transform group-hover:rotate-6`}>
        <i className={`fas ${icon} text-lg`}></i>
      </div>
    </div>
    
    <div className="mt-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
       <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
       <span className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">Live Metric Feed</span>
    </div>

    {description && (
      <div className="absolute inset-0 bg-blue-600/95 text-white p-6 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-center pointer-events-none z-20">
        <i className={`fas ${icon} text-2xl mb-3 opacity-50`}></i>
        <p className="text-xs font-bold leading-relaxed">{description}</p>
      </div>
    )}
  </motion.div>
);