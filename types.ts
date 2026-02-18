
export type UserRole = 'individual' | 'team' | 'admin';

export interface SummaryStats {
  totalCommits: number;
  productivityScore: number;
  levelProgress: number;
  activityStreak: number;
  weeklyVelocity: number;
  activeRepositories: number;
  mostUsedLanguage: string;
  burnoutRisk: 'Low' | 'Medium' | 'High';
  peakProductiveHours: string;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  commits: number;
  score: number;
  burnoutRisk: 'Low' | 'Medium' | 'High';
  status: 'online' | 'offline' | 'busy';
  topLanguage: string;
}

export interface ActivityPoint {
  label: string;
  commits: number;
  [key: string]: string | number;
}

export interface LanguageData {
  name:string;
  value: number;
  color: string;
  [key: string]: string | number;
}

export enum DeveloperRank {
  MASTER = 'MASTER',
  ELITE = 'ELITE',
  PRO = 'PRO',
  CODER = 'CODER',
}

export interface AIAssistantAdvice {
  performance: string;
  wellness: string;
  balance: string;
}

/**
 * Interface representing a project task for the kanban board.
 */
export interface Task {
  id: string;
  title: string;
  assignee: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
}

/**
 * Props for the BaseChart wrapper component.
 */
export interface BaseChartProps {
  title: string;
  description?: string;
  isLoading?: boolean;
  children: React.ReactNode;
}
