import React from 'react';
import { motion } from 'framer-motion';
import { BaseChartProps } from '../../../types';

/**
 * ============================================================================
 * BASE CHART WRAPPER
 * ============================================================================
 * This component acts as a standardized container for all charts.
 *
 * Features:
 * - Provides a consistent visual structure with a title and description.
 * - Handles loading states, showing a spinner while data is being fetched.
 * - Ensures all charts have a uniform appearance and padding.
 * - Promotes reusability and simplifies the creation of new charts.
 * ============================================================================
 */
const BaseChart: React.FC<BaseChartProps> = ({ title, description, isLoading, children }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-900/[0.02] h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h3 className="font-black text-lg tracking-tight text-slate-900 dark:text-white uppercase tracking-[0.2em]">{title}</h3>
          {description && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{description}</p>}
        </div>
        {/* Placeholder for potential actions like a view mode switcher */}
      </div>

      <div className="flex-grow h-[400px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BaseChart;
