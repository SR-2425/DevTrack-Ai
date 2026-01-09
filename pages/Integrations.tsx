
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Integrations: React.FC = () => {
  const [integrations, setIntegrations] = useState([
    { id: 'github', name: 'GitHub', icon: 'fa-github', status: 'Connected', color: 'bg-slate-900 text-white' },
    { id: 'jira', name: 'Jira Software', icon: 'fa-jira', status: 'Pending', color: 'bg-blue-600 text-white' },
    { id: 'slack', name: 'Slack', icon: 'fa-slack', status: 'Disconnected', color: 'bg-purple-600 text-white' },
    { id: 'trello', name: 'Trello', icon: 'fa-trello', status: 'Disconnected', color: 'bg-sky-500 text-white' },
  ]);

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Third-party Integrations</h2>
        <p className="text-slate-500 dark:text-slate-400">Extend your analytics reach by connecting external developer tools.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((app) => (
          <div key={app.id} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-full">
            <div className="flex items-start justify-between mb-8">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${app.color}`}>
                <i className={`fab ${app.icon}`}></i>
              </div>
              <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${
                app.status === 'Connected' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' :
                app.status === 'Pending' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' :
                'bg-slate-100 text-slate-600 dark:bg-slate-800'
              }`}>
                {app.status}
              </span>
            </div>
            
            <div className="mb-8">
              <h4 className="text-lg font-bold dark:text-white">{app.name}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                {app.status === 'Connected' 
                  ? 'Syncing active branches and merge request velocity data.' 
                  : `Integrate ${app.name} to track ticket resolution speed.`}
              </p>
            </div>

            <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
              app.status === 'Connected' 
                ? 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}>
              {app.status === 'Connected' ? 'Manage Connection' : 'Setup Integration'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Integrations;
