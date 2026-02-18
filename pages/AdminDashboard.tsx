import React, { useState, useEffect } from 'react';
import { fetchTeamMembers, exportProjectReport } from '../services/apiService';
import { TeamMember } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    fetchTeamMembers().then(data => {
      setMembers(data);
      setLoading(false);
    });
  }, []);

  const handleExport = () => {
    setExporting(true);
    // Mimic processing time for professional feel
    setTimeout(() => {
      exportProjectReport();
      setExporting(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }, 2000);
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Accessing Team Records...</p>
    </div>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Administrative Suite</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Team Intelligence</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Cross-platform contribution analysis & health signaling.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            disabled={exporting}
            className={`group relative overflow-hidden px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center transition-all ${
              exporting ? 'bg-slate-100 text-slate-400 dark:bg-slate-800' : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl shadow-slate-900/10 hover:-translate-y-1'
            }`}
          >
            <AnimatePresence mode="wait">
              {exporting ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="flex items-center"
                >
                  <i className="fas fa-circle-notch fa-spin mr-3"></i> Generating JSON
                </motion.div>
              ) : (
                <motion.div 
                  key="ready"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="flex items-center"
                >
                  <i className="fas fa-file-export mr-3 group-hover:translate-x-1 transition-transform"></i> Export Project Data
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Network Size', value: members.length, icon: 'fa-users', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/10' },
          { label: 'Avg Velocity', value: '82.4', icon: 'fa-bolt', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/10' },
          { label: 'System Risks', value: members.filter(m => m.burnoutRisk === 'High').length, icon: 'fa-triangle-exclamation', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/10' },
          { label: 'Uptime', value: '99.9%', icon: 'fa-check-circle', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/10' },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">{stat.label}</span>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <i className={`fas ${stat.icon} ${stat.color}`}></i>
              </div>
            </div>
            <p className="text-4xl font-black tracking-tighter">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-black text-xl tracking-tight">Team Grid Analysis</h3>
          <div className="flex gap-3">
             <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/10 rounded-full text-[10px] font-black uppercase text-emerald-600 tracking-tighter border border-emerald-100 dark:border-emerald-800">
               <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Stable
             </div>
             <div className="flex items-center gap-2 px-4 py-1.5 bg-rose-50 dark:bg-rose-900/10 rounded-full text-[10px] font-black uppercase text-rose-600 tracking-tighter border border-rose-100 dark:border-rose-800">
               <span className="w-2 h-2 rounded-full bg-rose-500"></span> Burnout Alert
             </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase font-black text-slate-400 bg-slate-50 dark:bg-slate-800/50">
                <th className="p-8">Engineering Unit</th>
                <th className="p-8">Commits</th>
                <th className="p-8">Efficiency</th>
                <th className="p-8">Primary Stack</th>
                <th className="p-8 text-center">Status Signal</th>
                <th className="p-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      <div className="relative group-hover:scale-105 transition-transform">
                        <img src={member.avatar} className="w-12 h-12 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700" alt={member.name} />
                        <span className={`absolute -bottom-1 -right-1 w-4 h-4 border-[3px] border-white dark:border-slate-900 rounded-full shadow-sm ${
                          member.status === 'online' ? 'bg-emerald-500' : member.status === 'busy' ? 'bg-rose-500' : 'bg-slate-400'
                        }`}></span>
                      </div>
                      <div>
                        <p className="font-black text-slate-800 dark:text-white tracking-tight">{member.name}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{member.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8 font-mono text-sm font-bold text-blue-600 dark:text-blue-400">{member.commits.toLocaleString()}</td>
                  <td className="p-8">
                    <div className="flex items-center gap-3">
                      <div className="flex-grow w-32 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${member.score}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full" 
                        />
                      </div>
                      <span className="text-xs font-black">{member.score}</span>
                    </div>
                  </td>
                  <td className="p-8">
                    <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase text-slate-500 tracking-widest border border-slate-200 dark:border-slate-700">{member.topLanguage}</span>
                  </td>
                  <td className="p-8 text-center">
                    <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border ${
                      member.burnoutRisk === 'High' ? 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/20 dark:border-rose-800' :
                      member.burnoutRisk === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800' :
                      'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800'
                    }`}>
                      {member.burnoutRisk}
                    </span>
                  </td>
                  <td className="p-8 text-right">
                    <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                      <i className="fas fa-arrow-right text-slate-300 group-hover:text-blue-500"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-slate-900 to-blue-900 p-10 rounded-[2.5rem] text-white flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
          <i className="fas fa-microchip text-[12rem]"></i>
        </div>
        
        <div className="space-y-4 relative z-10 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 text-blue-400">
            <i className="fas fa-server text-sm"></i>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Node.js Backend v3.2.0</span>
          </div>
          <h3 className="text-3xl font-black tracking-tight">System Reliability Audit</h3>
          <p className="text-base text-slate-400 max-w-2xl leading-relaxed">
            Infrastructure operating at <span className="text-emerald-400 font-bold">99.99% efficiency</span>. 
            Automated PostgreSQL sync is currently monitoring {members.length} distributed units across 14 connected repositories.
          </p>
        </div>
        
        <div className="shrink-0 relative z-10">
          <button className="group px-10 py-5 bg-white text-slate-900 rounded-[1.5rem] font-black text-sm hover:scale-105 transition-all flex items-center gap-3">
            Review System Health
            <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      </motion.div>

      {/* Export Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] px-6 py-4 bg-emerald-600 text-white rounded-2xl shadow-2xl flex items-center gap-4 font-bold"
          >
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-check"></i>
            </div>
            <span>Export Successful: Report generated as JSON</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;