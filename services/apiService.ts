import { SummaryStats, ActivityPoint, LanguageData, UserRole, TeamMember } from '../types';
import { db, Task } from './storageService';
import { auth } from './authService';

const LATENCY = 400; // ms

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const isUsingDemoData = (): boolean => {
  return localStorage.getItem('data_mode') === 'demo';
};

export const getUserRole = (): UserRole => {
  return (localStorage.getItem('user_role') as UserRole) || 'individual';
};

export const getUserId = (): string => {
  const user = auth.currentUser;
  return user?.uid || '1'; // Fallback to demo ID if not logged in via Firebase
};

export const getUserMetadata = () => {
  const user = auth.currentUser;
  if (user) {
    return {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      uid: user.uid
    };
  }
  return null;
};

export const fetchSummaryStats = async (): Promise<SummaryStats> => {
  await sleep(LATENCY);
  return db.getStats();
};

export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  await sleep(LATENCY);
  return db.getMembers();
};

export const fetchTasks = async (assigneeId?: string): Promise<Task[]> => {
  await sleep(LATENCY);
  return db.getTasks(assigneeId);
};

export const addTask = async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
  await sleep(LATENCY);
  return db.addTask(task);
};

export const updateTask = async (id: string, status: Task['status']): Promise<void> => {
  await sleep(200);
  return db.updateTaskStatus(id, status);
};

export const exportProjectReport = () => {
  const data = db.exportData();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `DevPulse_Report_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
};

export const fetchActivityData = async (type: 'weekly' | 'monthly'): Promise<ActivityPoint[]> => {
  await sleep(LATENCY);
  const activity = await (type === 'weekly' ? import('../constants').then(c => c.WEEKLY_ACTIVITY) : import('../constants').then(c => c.MONTHLY_ACTIVITY));
  return activity;
};

export const fetchLanguageData = async (): Promise<LanguageData[]> => {
  await sleep(LATENCY);
  return import('../constants').then(c => c.MOCK_LANGUAGES);
};