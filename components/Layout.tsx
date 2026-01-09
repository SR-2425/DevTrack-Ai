
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    navigate('/');
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 md:px-12 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
              <i className="fas fa-bolt text-white text-xl"></i>
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white hidden sm:block">
              DevPulse
            </span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive 
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <i className={`fas ${item.icon}`}></i>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-transparent hover:border-slate-300 dark:hover:border-slate-600"
              aria-label="Toggle Theme"
            >
              <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>

            {/* Notification */}
            <div className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer border border-transparent hover:border-slate-300 dark:hover:border-slate-600">
              <i className="fas fa-bell text-lg"></i>
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
            </div>

            {/* Mobile / Compact Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-th-large'}`}></i>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
              <img 
                src="https://picsum.photos/seed/devpulse/100/100" 
                alt="Profile" 
                className="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 object-cover cursor-pointer hover:ring-2 ring-blue-500 transition-all"
                onClick={() => navigate('/settings')}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="xl:hidden absolute top-20 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-40 p-6 shadow-2xl"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                    location.pathname === item.path 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400' 
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <i className={`fas ${item.icon} text-xl`}></i>
                  <span className="text-xs font-bold uppercase tracking-wider">{item.label}</span>
                </Link>
              ))}
              <button 
                onClick={handleLogout}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400"
              >
                <i className="fas fa-sign-out-alt text-xl"></i>
                <span className="text-xs font-bold uppercase tracking-wider">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-10 lg:p-16 max-w-screen-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="py-8 px-6 text-center text-slate-400 dark:text-slate-600 text-sm border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2024 DevPulse Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-500 transition-colors">Documentation</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-500 transition-colors">API Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
