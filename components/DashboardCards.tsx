
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
    whileHover={{ y: -5 }}
    className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all group relative"
  >
    <div className="flex items-start justify-between">
      <div className="min-w-0">
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium truncate">{label}</p>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</h3>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
        <i className={`fas ${icon} text-lg`}></i>
      </div>
    </div>
    
    {description && (
      <div className="absolute inset-0 bg-slate-900/90 dark:bg-blue-900/90 text-white p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-center text-xs pointer-events-none z-20">
        {description}
      </div>
    )}
  </motion.div>
);
