import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import Chatbot from './Chatbot';
import { getUserRole, getUserMetadata } from '../services/apiService';
import { logoutUser, subscribeToAuthChanges } from '../services/authService';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName,
          avatar: firebaseUser.photoURL,
          email: firebaseUser.email
        });
      } else if (localStorage.getItem('data_mode') !== 'demo') {
        // If not in demo mode and no user, force redirect to landing
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
      <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 md:px-10 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <i className="fas fa-bolt text-white text-sm"></i>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">DevPulse</span>
          </Link>

          <nav className="hidden xl:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  location.pathname === item.path 
                    ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <i className={`fas ${item.icon}`}></i>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 mr-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
             <span className={`w-1.5 h-1.5 rounded-full ${role === 'admin' ? 'bg-blue-500' : 'bg-emerald-500'}`}></span>
             <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">{role}</span>
          </div>

          <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-4">
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            
            <button 
              onClick={handleLogout}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-900/30 transition-colors group"
              title="Logout"
            >
              <i className="fas fa-right-from-bracket"></i>
            </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="xl:hidden p-2 rounded-lg bg-blue-600 text-white">
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>

            <div className="flex items-center gap-3 ml-2">
              <div className="hidden md:block text-right">
                <p className="text-xs font-bold leading-none">{user?.name || (role === 'admin' ? 'Admin Demo' : 'Dev Demo')}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{user ? 'GitHub User' : 'Sandbox User'}</p>
              </div>
              <img 
                src={user?.avatar || `https://picsum.photos/seed/${role}/100/100`}
                alt="Profile" 
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all object-cover"
                onClick={() => navigate('/settings')}
              />
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="xl:hidden fixed inset-x-0 top-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-40 p-4 shadow-xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold"
                >
                  <i className={`fas ${item.icon}`}></i>
                  <span className="text-xs uppercase">{item.label}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 rounded-lg bg-rose-50 dark:bg-rose-900/10 text-rose-600 font-bold col-span-2"
              >
                <i className="fas fa-right-from-bracket"></i>
                <span className="text-xs uppercase">Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow p-4 md:p-8 max-w-screen-xl mx-auto w-full">
        {children}
      </main>

      <footer className="py-6 px-6 text-center text-slate-400 text-xs border-t border-slate-200 dark:border-slate-800">
        <p>© 2025 DevPulse. Engineering Intelligence Ecosystem.</p>
      </footer>

      <Chatbot />
    </div>
  );
};

export default Layout;