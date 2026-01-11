
import React from 'react';
import { DeveloperRank } from '../types';

const Leaderboard: React.FC = () => {
  const ranks = [
    { name: 'Sarah Chen', rank: DeveloperRank.MASTER, score: 94, commits: 2560 },
    { name: 'Alex Rivers', rank: DeveloperRank.ELITE, score: 88, commits: 1422, self: true },
    { name: 'Mike Johnson', rank: DeveloperRank.PRO, score: 76, commits: 890 },
    { name: 'Emma Wilson', rank: DeveloperRank.CODER, score: 62, commits: 450 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Leaderboard</h2>
        <p className="text-xs text-slate-500">Motivational ranking for community benchmarking.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-[10px] uppercase font-black text-slate-400">
            <tr>
              <th className="p-6">#</th>
              <th className="p-6">Developer</th>
              <th className="p-6">Rank</th>
              <th className="p-6 text-center">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {ranks.map((dev, i) => (
              <tr key={dev.name} className={dev.self ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}>
                <td className="p-6 text-sm font-bold">{i + 1}</td>
                <td className="p-6 text-sm font-bold flex items-center gap-2">
                  {dev.name} {dev.self && <span className="text-[8px] bg-blue-600 text-white px-1.5 py-0.5 rounded-full">YOU</span>}
                </td>
                <td className="p-6 text-[10px] font-black uppercase text-blue-500">{dev.rank}</td>
                <td className="p-6 text-center font-bold text-sm">{dev.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
