
import { DeveloperRank, SummaryStats, ActivityPoint, LanguageData } from './types';

export const MOCK_SUMMARY: SummaryStats = {
  totalCommits: 1422,
  productivityScore: 88,
  currentRank: DeveloperRank.ELITE,
  levelProgress: 82,
  activityStreak: 18,
  weeklyVelocity: 48,
  activeRepositories: 14,
  mostUsedLanguage: 'TypeScript',
  burnoutRisk: 'Medium',
  peakProductiveHours: '10 AM - 1 PM',
};

export const WEEKLY_ACTIVITY: ActivityPoint[] = [
  { label: 'Mon', commits: 8 },
  { label: 'Tue', commits: 12 },
  { label: 'Wed', commits: 5 },
  { label: 'Thu', commits: 15 },
  { label: 'Fri', commits: 10 },
  { label: 'Sat', commits: 2 },
  { label: 'Sun', commits: 1 },
];

export const MONTHLY_ACTIVITY: ActivityPoint[] = [
  { label: 'Week 1', commits: 42 },
  { label: 'Week 2', commits: 38 },
  { label: 'Week 3', commits: 55 },
  { label: 'Week 4', commits: 48 },
];

export const MOCK_LANGUAGES: LanguageData[] = [
  { name: 'TypeScript', value: 48, color: '#3178c6' },
  { name: 'React', value: 28, color: '#61dafb' },
  { name: 'Python', value: 14, color: '#3776ab' },
  { name: 'Rust', value: 10, color: '#dea584' },
];

export const NAVIGATION_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: 'fa-chart-pie' },
  { path: '/user-progress', label: 'Growth', icon: 'fa-user-graduate' },
  { path: '/repositories', label: 'Repos', icon: 'fa-book' },
  { path: '/languages', label: 'Skills', icon: 'fa-code' },
  { path: '/leaderboard', label: 'Ranking', icon: 'fa-award' },
  { path: '/insights', label: 'Reflection', icon: 'fa-lightbulb' },
  { path: '/settings', label: 'Settings', icon: 'fa-cog' },
];
