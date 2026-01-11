import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginWithGitHub } from '../services/authService';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDemoEntry = (role: 'individual' | 'admin') => {
    localStorage.setItem('data_mode', 'demo');
    localStorage.setItem('user_role', role);
    setIsConnecting(true);
    setTimeout(() => navigate('/dashboard'), 800);
  };

  const handleGitHubLogin = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      await loginWithGitHub();
      navigate('/dashboard');
    } catch (err: any) {
      setError("Authentication failed. Ensure Firebase config is valid.");
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 selection:bg-blue-500 overflow-hidden relative">
      <div className="absolute top-0 w-full h-1/2 bg-blue-600/5 blur-[100px] rounded-full"></div>
      
      <div className="relative z-10 text-center max-w-5xl w-full">
        <div className="flex items-center justify-center gap-3 mb-10">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20"
          >
            <i className="fas fa-bolt text-2xl"></i>
          </motion.div>
          <span className="text-3xl font-black tracking-tight">DevPulse</span>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          Engineering <span className="text-blue-500">Intelligence</span> <br />
          <span className="text-slate-200">for Modern Teams</span>
        </motion.h1>
        
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
          Actionable metrics, burnout signals, and AI-powered wellness coaching. Secure your environment to begin.
        </p>

        {/* Primary Auth Action */}
        <div className="mb-16 flex flex-col items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGitHubLogin}
            className="flex items-center gap-4 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl shadow-white/10 hover:bg-slate-100 transition-all"
          >
            <i className="fab fa-github text-2xl"></i>
            Continue with GitHub
          </motion.button>
          {error && <p className="text-rose-500 text-xs font-bold uppercase tracking-widest">{error}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto px-4">
          <motion.button 
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => handleDemoEntry('individual')}
            className="p-10 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl text-left hover:border-blue-500/50 transition-all group relative overflow-hidden"
          >
            <i className="fas fa-flask text-blue-500 mb-6 text-2xl"></i>
            <h3 className="text-2xl font-bold mb-2">Personal Demo</h3>
            <p className="text-sm text-slate-400 leading-relaxed italic">Explore features with sandbox data.</p>
          </motion.button>

          <motion.button 
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => handleDemoEntry('admin')}
            className="p-10 bg-blue-600 rounded-3xl text-left hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/20 group relative overflow-hidden"
          >
            <i className="fas fa-shield-halved text-white mb-6 text-2xl"></i>
            <h3 className="text-2xl font-bold mb-2">Admin Demo</h3>
            <p className="text-sm text-blue-100 leading-relaxed italic">Management-level insights sandbox.</p>
          </motion.button>
        </div>
      </div>
      
      <footer className="mt-20 text-[10px] uppercase font-black tracking-[0.3em] text-slate-700">
        DevPulse Framework &bull; Built for High Performance &bull; 2025
      </footer>

      {isConnecting && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-black uppercase tracking-widest text-blue-500 animate-pulse">Syncing Environment...</p>
        </div>
      )}
    </div>
  );
};

export default LandingPage;