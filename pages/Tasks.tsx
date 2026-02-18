
import React, { useState, useEffect } from 'react';
import { fetchTasks, addTask, updateTask, getUserId, getUserRole } from '../services/apiService';
import { Task } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  const role = getUserRole();
  const userId = getUserId();

  const loadTasks = async () => {
    setLoading(true);
    const data = await fetchTasks(role === 'admin' ? undefined : userId);
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    await addTask({
      title: newTaskTitle,
      assignee: userId,
      status: 'todo',
      priority: 'medium'
    });
    
    setNewTaskTitle('');
    setIsModalOpen(false);
    loadTasks();
  };

  const handleStatusChange = async (id: string, status: Task['status']) => {
    await updateTask(id, status);
    loadTasks();
  };

  if (loading) return <div className="p-10 text-center animate-pulse italic">Opening your task board...</div>;

  const columns: { title: string; status: Task['status'] }[] = [
    { title: 'To Do', status: 'todo' },
    { title: 'In Progress', status: 'in-progress' },
    { title: 'Done', status: 'done' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Project Tasks</h2>
          <p className="text-sm text-slate-500">{role === 'admin' ? 'Team task list' : 'Your current work items'}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
        >
          <i className="fas fa-plus mr-2"></i> Add Task
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {columns.map(col => (
          <div key={col.status} className="bg-slate-100/50 dark:bg-slate-900/50 p-4 rounded-2xl min-h-[500px]">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 px-2">{col.title} ({tasks.filter(t => t.status === col.status).length})</h3>
            <div className="space-y-3">
              <AnimatePresence>
                {tasks.filter(t => t.status === col.status).map(task => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm group hover:border-blue-500/50 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        task.priority === 'high' ? 'bg-rose-100 text-rose-600' : 
                        task.priority === 'medium' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {task.priority}
                      </span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {col.status !== 'todo' && (
                          <button onClick={() => handleStatusChange(task.id, 'todo')} className="p-1 hover:text-blue-500"><i className="fas fa-arrow-left text-[10px]"></i></button>
                        )}
                        {col.status !== 'done' && (
                          <button onClick={() => handleStatusChange(task.id, col.status === 'todo' ? 'in-progress' : 'done')} className="p-1 hover:text-blue-500"><i className="fas fa-arrow-right text-[10px]"></i></button>
                        )}
                      </div>
                    </div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{task.title}</p>
                    <div className="mt-3 flex items-center gap-2 pt-3 border-t border-slate-50 dark:border-slate-700">
                      <img src={`https://picsum.photos/seed/${task.assignee}/20/20`} className="w-5 h-5 rounded-full" alt="User" />
                      <span className="text-[10px] text-slate-400 font-bold">#{task.id}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 w-full max-w-md p-8 rounded-3xl shadow-2xl"
          >
            <h3 className="text-xl font-bold mb-6">Create New Task</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-slate-400 mb-2">Task Name</label>
                <input 
                  autoFocus
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Build the login page"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-grow py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-grow py-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20"
                >
                  Save Task
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
