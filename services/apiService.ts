
import { SummaryStats, ActivityPoint, LanguageData, UserRole, TeamMember, Task } from '../types';
import { MOCK_SUMMARY, MOCK_TEAM_MEMBERS, WEEKLY_ACTIVITY, MONTHLY_ACTIVITY, MOCK_LANGUAGES } from '../constants';

export const isUsingDemoData = (): boolean => {
  const mode = localStorage.getItem('data_mode');
  return mode === 'demo' || !mode;
};

export const getUserRole = (): UserRole => {
  return (localStorage.getItem('user_role') as UserRole) || 'individual';
};

export const getUserId = (): string => {
  return 'user-123';
};

export const fetchSummaryStats = async (): Promise<SummaryStats> => {
  // Direct return for maximum performance
  return MOCK_SUMMARY;
};

export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  return MOCK_TEAM_MEMBERS;
};

export const fetchActivityData = async (type: 'weekly' | 'monthly'): Promise<ActivityPoint[]> => {
  return type === 'weekly' ? WEEKLY_ACTIVITY : MONTHLY_ACTIVITY;
};

export const fetchLanguageData = async (): Promise<LanguageData[]> => {
  return MOCK_LANGUAGES;
};

/**
 * Fetches tasks from local storage or returns mock defaults if none exist.
 */
export const fetchTasks = async (userId?: string): Promise<Task[]> => {
  const tasksJson = localStorage.getItem('devtrack_tasks');
  const tasks: Task[] = tasksJson ? JSON.parse(tasksJson) : [
    { id: '1', title: 'Refactor Auth module', assignee: 'user-123', status: 'in-progress', priority: 'high' },
    { id: '2', title: 'Implement Dashboard charts', assignee: 'user-123', status: 'todo', priority: 'medium' },
    { id: '3', title: 'Fix CSS layout bugs', assignee: 'user-123', status: 'done', priority: 'low' }
  ];
  
  if (userId) {
    return tasks.filter(t => t.assignee === userId);
  }
  return tasks;
};

/**
 * Adds a new task and persists it to local storage.
 */
export const addTask = async (task: Partial<Task>): Promise<void> => {
  const tasks = await fetchTasks();
  const newTask: Task = {
    id: Math.random().toString(36).substring(2, 11),
    title: task.title || 'Untitled Task',
    assignee: task.assignee || 'user-123',
    status: (task.status as Task['status']) || 'todo',
    priority: (task.priority as Task['priority']) || 'medium'
  };
  localStorage.setItem('devtrack_tasks', JSON.stringify([...tasks, newTask]));
};

/**
 * Updates the status of an existing task in local storage.
 */
export const updateTask = async (id: string, status: Task['status']): Promise<void> => {
  const tasks = await fetchTasks();
  const updatedTasks = tasks.map(t => t.id === id ? { ...t, status } : t);
  localStorage.setItem('devtrack_tasks', JSON.stringify(updatedTasks));
};

export const exportProjectReport = () => {
  const report = {
    generatedAt: new Date().toISOString(),
    stats: MOCK_SUMMARY,
    team: MOCK_TEAM_MEMBERS
  };
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `DevTrack_Report_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
};
