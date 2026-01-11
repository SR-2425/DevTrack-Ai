
import { SummaryStats, ActivityPoint, LanguageData, TeamMember } from './types';

export const MOCK_SUMMARY: SummaryStats = {
  totalCommits: 1422,
  productivityScore: 88,
  levelProgress: 82,
  activityStreak: 18,
  weeklyVelocity: 48,
  activeRepositories: 14,
  mostUsedLanguage: 'TypeScript',
  burnoutRisk: 'Medium',
  peakProductiveHours: '10 AM - 1 PM',
};

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Alex Rivers', avatar: 'https://picsum.photos/seed/alex/100/100', role: 'Fullstack Dev', commits: 1422, score: 88, burnoutRisk: 'Medium', status: 'online', topLanguage: 'TypeScript' },
  { id: '2', name: 'Sarah Chen', avatar: 'https://picsum.photos/seed/sarah/100/100', role: 'Backend Lead', commits: 2560, score: 94, burnoutRisk: 'High', status: 'busy', topLanguage: 'Go' },
  { id: '3', name: 'Mike Johnson', avatar: 'https://picsum.photos/seed/mike/100/100', role: 'Frontend Dev', commits: 890, score: 76, burnoutRisk: 'Low', status: 'online', topLanguage: 'React' },
  { id: '4', name: 'Emma Wilson', avatar: 'https://picsum.photos/seed/emma/100/100', role: 'DevOps Eng', commits: 450, score: 62, burnoutRisk: 'Low', status: 'offline', topLanguage: 'Python' },
];

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
  { path: '/dashboard', label: 'Dashboard', icon: 'fa-chart-pie', roles: ['individual', 'team', 'admin'] },
  { path: '/tasks', label: 'Backlog', icon: 'fa-tasks', roles: ['individual', 'admin'] },
  { path: '/admin', label: 'Team Admin', icon: 'fa-user-shield', roles: ['admin'] },
  { path: '/user-progress', label: 'Growth', icon: 'fa-user-graduate', roles: ['individual'] },
  { path: '/repositories', label: 'Repos', icon: 'fa-book', roles: ['individual'] },
  { path: '/languages', label: 'Skills', icon: 'fa-code', roles: ['individual'] },
  { path: '/insights', label: 'Insights', icon: 'fa-lightbulb', roles: ['individual', 'admin'] },
  { path: '/settings', label: 'Settings', icon: 'fa-cog', roles: ['individual', 'admin'] },
];
