
import React, { useState, useEffect } from 'react';
import { fetchTeamMembers, exportProjectReport } from '../services/apiService';
import { TeamMember } from '../types';
import { motion } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchTeamMembers().then(data => {
      setMembers(data);
      setLoading(false);
    });
  }, []);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      exportProjectReport();
      setExporting(false);
    }, 1200);
  };

  if (loading) return <div className="p-10 text-center animate-pulse">Accessing Secure Records...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold">Team Admin Dashboard</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-black mt-1">Global Health & Performance Overview</p>
        </div>
        <button 
          onClick={handleExport}
          disabled={exporting}
          className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center transition-all ${
            exporting ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700'
          }`}
        >
          <i className={`fas ${exporting ? 'fa-spinner fa-spin' : 'fa-file-export'} mr-2`}></i> 
          {exporting ? 'Compiling JSON...' : 'Export Project Report'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Developers', value: members.length, icon: 'fa-users', color: 'text-blue-500' },
          { label: 'Avg Productivity', value: '82%', icon: 'fa-bolt', color: 'text-amber-500' },
          { label: 'High Risk Alert', value: members.filter(m => m.burnoutRisk === 'High').length, icon: 'fa-triangle-exclamation', color: 'text-rose-500' },
          { label: 'Deployment Flow', value: 'Healthy', icon: 'fa-check-circle', color: 'text-emerald-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">{stat.label}</span>
              <i className={`fas ${stat.icon} ${stat.color}`}></i>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-bold">Team Performance Grid</h3>
          <div className="flex gap-2">
             <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-full text-[10px] font-bold text-slate-500">
               <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Low Risk
             </div>
             <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-full text-[10px] font-bold text-slate-500">
               <span className="w-2 h-2 rounded-full bg-rose-500"></span> High Risk
             </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase font-black text-slate-400 bg-slate-50 dark:bg-slate-800/50">
                <th className="p-6">Developer</th>
                <th className="p-6">Commits (M)</th>
                <th className="p-6">Efficiency</th>
                <th className="p-6">Top Stack</th>
                <th className="p-6">Risk Signal</th>
                <th className="p-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={member.avatar} className="w-10 h-10 rounded-xl" alt={member.name} />
                        <span className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-white dark:border-slate-900 rounded-full ${
                          member.status === 'online' ? 'bg-emerald-500' : member.status === 'busy' ? 'bg-rose-500' : 'bg-slate-400'
                        }`}></span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">{member.name}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">{member.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 font-mono text-sm">{member.commits}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className="flex-grow w-24 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{ width: `${member.score}%` }}></div>
                      </div>
                      <span className="text-xs font-bold">{member.score}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-black uppercase text-slate-500">{member.topLanguage}</span>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      member.burnoutRisk === 'High' ? 'bg-rose-100 text-rose-600' :
                      member.burnoutRisk === 'Medium' ? 'bg-amber-100 text-amber-600' :
                      'bg-emerald-100 text-emerald-600'
                    }`}>
                      {member.burnoutRisk}
                    </span>
                  </td>
                  <td className="p-6">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                      <i className="fas fa-ellipsis-h text-slate-400"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><i className="fas fa-server text-9xl"></i></div>
        <div className="space-y-2 relative z-10">
          <h3 className="text-lg font-bold">Live Backend Synchronized</h3>
          <p className="text-sm text-slate-400 max-w-xl italic">"Simulated Node.js environment is active. PostgreSQL storage is currently handling {members.length} users and active commit streams. System stability: 99.99%."</p>
        </div>
        <button className="px-8 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all relative z-10">System Audit</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
