
import { SummaryStats, TeamMember, ActivityPoint, LanguageData } from '../types';
import { MOCK_SUMMARY, MOCK_TEAM_MEMBERS, WEEKLY_ACTIVITY, MOCK_LANGUAGES } from '../constants';

// Virtual DB Schema
interface VirtualDB {
  stats: SummaryStats;
  members: TeamMember[];
  activity: ActivityPoint[];
  languages: LanguageData[];
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

const DB_KEY = 'devpulse_virtual_db';

class StorageService {
  private db: VirtualDB;

  constructor() {
    const saved = localStorage.getItem(DB_KEY);
    if (saved) {
      this.db = JSON.parse(saved);
    } else {
      this.db = this.seed();
      this.save();
    }
  }

  private seed(): VirtualDB {
    return {
      stats: MOCK_SUMMARY,
      members: MOCK_TEAM_MEMBERS,
      activity: WEEKLY_ACTIVITY,
      languages: MOCK_LANGUAGES,
      tasks: [
        { id: 't1', title: 'Implement OAuth Flow', assignee: '1', status: 'done', priority: 'high', createdAt: new Date().toISOString() },
        { id: 't2', title: 'Refactor Dashboard Components', assignee: '1', status: 'in-progress', priority: 'medium', createdAt: new Date().toISOString() },
        { id: 't3', title: 'Database Schema Design', assignee: '2', status: 'done', priority: 'high', createdAt: new Date().toISOString() },
        { id: 't4', title: 'Fix CSS Grid on Mobile', assignee: '3', status: 'todo', priority: 'low', createdAt: new Date().toISOString() },
      ]
    };
  }

  private save() {
    localStorage.setItem(DB_KEY, JSON.stringify(this.db));
  }

  // API Simulations
  async getStats(): Promise<SummaryStats> {
    return this.db.stats;
  }

  async getMembers(): Promise<TeamMember[]> {
    return this.db.members;
  }

  async getTasks(assigneeId?: string): Promise<Task[]> {
    if (assigneeId) {
      return this.db.tasks.filter(t => t.assignee === assigneeId);
    }
    return this.db.tasks;
  }

  async addTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    this.db.tasks.push(newTask);
    
    // Simulate dynamic backend updates (e.g., productivity score changes)
    this.db.stats.productivityScore = Math.min(100, this.db.stats.productivityScore + 1);
    
    this.save();
    return newTask;
  }

  async updateTaskStatus(taskId: string, status: Task['status']): Promise<void> {
    const task = this.db.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = status;
      this.save();
    }
  }

  exportData(): string {
    return JSON.stringify(this.db, null, 2);
  }
}

export const db = new StorageService();
