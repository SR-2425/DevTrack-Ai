import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginWithGitHub } from '../services/authService';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleDemoEntry = (role: 'individual' | 'admin') => {
    localStorage.setItem('data_mode', 'demo');
    localStorage.setItem('user_role', role);
    setIsConnecting(true);
    setTimeout(() => navigate('/dashboard'), 800);
  };

  const handleGitHubLogin = async () => {
    setIsConnecting(true);
    try {
      await loginWithGitHub();
      navigate('/dashboard');
    } catch (err) {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Top Header / View Demo Button */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <i className="fas fa-bolt text-white text-xs"></i>
          </div>
          <span className="font-black text-xl tracking-tight uppercase">DevTrack</span>
        </div>
        <button 
          onClick={() => handleDemoEntry('individual')}
          className="text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
        >
          Try Demo
        </button>
      </div>
      
      <div className="flex-grow flex flex-col items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight max-w-3xl">
            Track Your Coding Habits <br /> 
            <span className="text-slate-400">& Grow Your Skills.</span>
          </h1>
          <p className="text-base text-slate-500 max-w-lg mx-auto font-medium">
            Get simple, automated insights to help you code better, stay healthy, and level up your career.
          </p>
        </motion.div>

        {/* 2-Column Action Grid */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
          <motion.button 
            whileHover={{ y: -4, borderColor: 'rgba(59, 130, 246, 0.5)' }}
            onClick={() => handleDemoEntry('individual')}
            className="p-10 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] text-left transition-all group"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-blue-500 border border-blue-500/20">
              <i className="fas fa-user-ninja text-xl"></i>
            </div>
            <h3 className="text-xl font-black mb-2">Personal View</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">See your coding speed, favorite languages, and get tips to avoid burnout.</p>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 group-hover:translate-x-1 transition-transform">
              Open My Dashboard <i className="fas fa-arrow-right"></i>
            </div>
          </motion.button>

          <motion.button 
            whileHover={{ y: -4, borderColor: 'rgba(99, 102, 241, 0.5)' }}
            onClick={() => handleDemoEntry('admin')}
            className="p-10 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] text-left transition-all group"
          >
            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 text-indigo-400 border border-indigo-500/20">
              <i className="fas fa-shield-halved text-xl"></i>
            </div>
            <h3 className="text-xl font-black mb-2">Team View</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">Check team health, export reports, and help everyone work better together.</p>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 group-hover:translate-x-1 transition-transform">
              Open Team Panel <i className="fas fa-arrow-right"></i>
            </div>
          </motion.button>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <button 
            onClick={handleGitHubLogin}
            className="text-[10px] text-slate-600 hover:text-white font-black uppercase tracking-[0.3em] transition-colors"
          >
            Connect with GitHub <i className="fab fa-github ml-2"></i>
          </button>
        </motion.div>
      </div>
      
      <div className="p-8 text-center text-[9px] font-black uppercase tracking-[0.5em] text-slate-800">
        DevTrack Systems • 2025
      </div>

      {isConnecting && (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 animate-pulse">Setting up your view...</p>
        </div>
      )}
    </div>
  );
};

export default LandingPage;