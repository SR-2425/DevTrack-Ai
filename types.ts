
export enum DeveloperRank {
  NEWBIE = 'Newbie',
  CODER = 'Coder',
  PRO = 'Pro',
  ELITE = 'Elite',
  MASTER = 'Master'
}

export interface SummaryStats {
  totalCommits: number;
  productivityScore: number;
  currentRank: DeveloperRank;
  levelProgress: number;
  activityStreak: number;
  weeklyVelocity: number;
  activeRepositories: number;
  mostUsedLanguage: string;
  burnoutRisk: 'Low' | 'Medium' | 'High';
  peakProductiveHours: string;
}

export interface ActivityPoint {
  label: string;
  commits: number;
  [key: string]: string | number;
}

export interface LanguageData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}
