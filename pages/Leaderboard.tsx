
import React from 'react';
import { motion } from 'framer-motion';
import { DeveloperRank } from '../types';

const Leaderboard: React.FC = () => {
  const ranks = [
    { id: 1, name: 'Alex Rivers', handle: '@AlexRivers88', rank: DeveloperRank.ELITE, score: 88, commits: 1422, isUser: true },
    { id: 2, name: 'Sarah Chen', handle: '@Schen_Dev', rank: DeveloperRank.MASTER, score: 94, commits: 2560, isUser: false },
    { id: 3, name: 'Mike Johnson', handle: '@MikeyCodes', rank: DeveloperRank.PRO, score: 76, commits: 890, isUser: false },
    { id: 4, name: 'Emma Wilson', handle: '@E_Wilson', rank: DeveloperRank.CODER, score: 62, commits: 450, isUser: false },
    { id: 5, name: 'David Lee', handle: '@LeeDeveloper', rank: DeveloperRank.NEWBIE, score: 45, commits: 120, isUser: false },
  ].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-10 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Growth Rankings</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Optional motivational benchmarking for self-challenge.</p>
        </div>
        <div className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20">
           Top 8% Globally
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="px-10 py-6 text-left">Level</th>
                <th className="px-10 py-6 text-left">Developer</th>
                <th className="px-10 py-6 text-left">Mirror Rank</th>
                <th className="px-10 py-6 text-center">Mastery Score</th>
                <th className="px-10 py-6 text-right">Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {ranks.map((dev, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={dev.id} 
                  className={`transition-all ${dev.isUser ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'}`}
                >
                  <td className="px-10 py-8">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm border-2 ${
                      i === 0 ? 'bg-amber-100 border-amber-200 text-amber-600' :
                      i === 1 ? 'bg-slate-100 border-slate-200 text-slate-500' :
                      i === 2 ? 'bg-orange-100 border-orange-200 text-orange-600' :
                      'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400'
                    }`}>
                      {i + 1}
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <img src={`https://picsum.photos/seed/${dev.id}/100/100`} className="w-12 h-12 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm" alt="" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          {dev.name}
                          {dev.isUser && <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-lg font-black uppercase tracking-tighter shadow-sm">Self</span>}
                        </p>
                        <p className="text-xs text-slate-500 font-medium">{dev.handle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      dev.rank === DeveloperRank.MASTER ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]' :
                      dev.rank === DeveloperRank.ELITE ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]' :
                      'bg-slate-100 text-slate-500 dark:bg-slate-800'
                    }`}>
                      {dev.rank}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-center">
                    <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums">
                      {dev.score}
                    </span>
                    <span className="text-slate-400 text-xs ml-1 font-bold">/ 100</span>
                  </td>
                  <td className="px-10 py-8 text-right font-bold text-slate-500 dark:text-slate-400 tabular-nums">
                    {dev.commits} commits
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-8 bg-slate-100 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-slate-500">
              <i className="fas fa-eye-slash text-xl"></i>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 italic max-w-xl">
              Leaderboard participation is strictly opt-in. You can toggle your visibility in mirror settings to participate in community benchmarking.
            </p>
         </div>
         <button className="text-blue-600 dark:text-blue-400 font-extrabold hover:underline text-sm uppercase tracking-widest">
           Adjust Visibility
         </button>
      </div>
    </div>
  );
};

export default Leaderboard;
