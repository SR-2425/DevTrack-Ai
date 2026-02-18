import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import Chatbot from './Chatbot';
import { getUserRole } from '../services/apiService';
import { logoutUser, subscribeToAuthChanges } from '../services/authService';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [user, setUser] = useState<any>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const role = getUserRole();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((mockUser) => {
      if (mockUser) {
        setUser({
          name: mockUser.displayName,
          avatar: mockUser.photoURL,
          email: mockUser.email
        });
      } else if (localStorage.getItem('data_mode') !== 'demo') {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  const filteredNavItems = NAVIGATION_ITEMS.filter(item => 
    !item.roles || item.roles.includes(role)
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Top Header */}
      <header className="h-20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between px-6 md:px-12 sticky top-0 z-[60]">
        <div className="flex items-center gap-10">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <i className="fas fa-bolt text-white text-base"></i>
            </div>
            <div className="hidden sm:block">
              <span className="block font-black text-xl tracking-tight text-slate-900 dark:text-white leading-none uppercase">Dashboard</span>
              <span className="block text-[10px] font-black text-blue-500 uppercase tracking-widest mt-1">Activity Center</span>
            </div>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          
          <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>

          {/* Tray Switcher Button */}
          <button 
            onClick={() => setIsTrayOpen(true)}
            className="group flex items-center gap-3 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl shadow-xl shadow-slate-900/10 hover:-translate-y-0.5 transition-all"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden md:block">Menu</span>
            <div className="flex flex-col gap-1.5">
              <span className="w-5 h-0.5 bg-current rounded-full"></span>
              <span className="w-3 h-0.5 bg-current rounded-full group-hover:w-5 transition-all"></span>
              <span className="w-5 h-0.5 bg-current rounded-full"></span>
            </div>
          </button>
        </div>
      </header>

      {/* Navigation Tray Overlay */}
      <AnimatePresence>
        {isTrayOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTrayOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[70] cursor-crosshair"
            />
            {/* Drawer Tray */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 z-[80] shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col"
            >
              <div className="p-8 flex justify-between items-center border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                     <i className="fas fa-th-large text-white text-xs"></i>
                   </div>
                   <span className="font-black text-[11px] uppercase tracking-[0.3em] text-slate-400">Navigation</span>
                </div>
                <button 
                  onClick={() => setIsTrayOpen(false)}
                  className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <nav className="flex-grow p-8 overflow-y-auto space-y-3">
                {filteredNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsTrayOpen(false)}
                    className={`flex items-center gap-6 p-6 rounded-[2rem] transition-all group ${
                      location.pathname === item.path 
                        ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/30' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                       location.pathname === item.path ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'
                    }`}>
                      <i className={`fas ${item.icon} text-lg`}></i>
                    </div>
                    <div>
                      <span className="block font-black text-sm uppercase tracking-widest">{item.label}</span>
                      <span className={`block text-[10px] font-medium opacity-60 mt-1 uppercase tracking-tighter`}>Open Section</span>
                    </div>
                  </Link>
                ))}
              </nav>

              <div className="p-10 border-t border-slate-100 dark:border-slate-800 space-y-8">
                <div className="flex items-center gap-5 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2rem]">
                  <img 
                    src={user?.avatar || `https://picsum.photos/seed/${role}/100/100`}
                    alt="Profile" 
                    className="w-14 h-14 rounded-2xl border-2 border-white dark:border-slate-700 object-cover shadow-sm"
                  />
                  <div className="overflow-hidden">
                    <p className="font-black text-base text-slate-900 dark:text-white truncate">{user?.name || 'Developer'}</p>
                    <p className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.2em]">{role} Access</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full py-5 bg-rose-50 dark:bg-rose-900/10 text-rose-600 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                >
                  Log Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-grow p-4 md:p-12 max-w-screen-2xl mx-auto w-full">
        {children}
      </main>

      <footer className="py-12 text-center flex flex-col items-center gap-5 border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-center gap-2 opacity-20 grayscale hover:grayscale-0 transition-all cursor-pointer">
           <div className="w-5 h-5 bg-slate-900 dark:bg-white rounded-md flex items-center justify-center">
             <i className="fas fa-bolt text-[10px] text-white dark:text-slate-900"></i>
           </div>
           <span className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-900 dark:text-white">DevTrack Engine</span>
        </div>
        <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-slate-300 dark:text-slate-700 italic">Productivity Insights &bull; 2025</p>
      </footer>

      <Chatbot />
    </div>
  );
};

export default Layout;