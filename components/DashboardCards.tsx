
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

export const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, icon, trend, trendUp, colorClass, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all group relative"
  >
    <div className="flex items-start justify-between">
      <div className="min-w-0">
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium truncate">{label}</p>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</h3>
        {trend && (
          <p className={`text-xs mt-2 flex items-center gap-1 ${trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
            <i className={`fas ${trendUp ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
            {trend} <span className="text-slate-400 dark:text-slate-500">vs prev</span>
          </p>
        )}
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

export const LevelCard: React.FC<{ rank: string; progress: number }> = ({ rank, progress }) => (
  <div className="bg-slate-900 dark:bg-brand-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group">
    <div className="relative z-10">
      <p className="text-slate-400 text-sm font-medium">Current Rank</p>
      <motion.h3 
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-3xl font-bold mt-1 text-blue-400"
      >
        {rank}
      </motion.h3>
      
      <div className="mt-6">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-slate-400">Level Progress</span>
          <span className="font-bold">{progress}%</span>
        </div>
        <div className="w-full bg-slate-700/50 dark:bg-slate-800/50 h-2.5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-blue-500 h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          ></motion.div>
        </div>
      </div>
      <p className="mt-4 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Promotion Path: Elite ➔ Master</p>
    </div>
    <div className="absolute -right-6 -bottom-6 opacity-10 transition-transform group-hover:scale-110 duration-700">
      <i className="fas fa-trophy text-9xl"></i>
    </div>
  </div>
);
