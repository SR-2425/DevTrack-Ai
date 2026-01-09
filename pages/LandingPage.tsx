
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-blue-500">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <i className="fas fa-bolt text-xl"></i>
          </div>
          <span className="text-2xl font-bold tracking-tight">DevPulse</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-slate-400 font-medium">
          <a href="#concept" className="hover:text-white transition-colors">Digital Mirror</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105"
          >
            Connect GitHub
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-32 text-center md:text-left flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Reflect. <span className="text-blue-500">Refine.</span> <br />Repeat.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl">
            DevPulse is your personal <span className="text-white font-semibold italic">digital mirror</span>. 
            Understand your unique coding patterns, track your growth discipline, and unlock actionable guidance for your professional journey.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3"
            >
              <i className="fab fa-github text-xl"></i>
              Connect My Activity
            </button>
            <button className="px-8 py-4 rounded-2xl font-bold text-lg border border-slate-700 hover:border-slate-500 transition-all">
              Learn the Science
            </button>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur opacity-25"></div>
          <img 
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" 
            alt="Reflective Coding Environment" 
            className="relative rounded-3xl border border-slate-800 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-24 border-y border-slate-800">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
           <div className="bg-slate-800/40 p-12 rounded-3xl border border-slate-700">
              <h2 className="text-3xl font-bold mb-6 italic">"The most powerful tool for an engineer is a mirror."</h2>
              <p className="text-slate-400 leading-relaxed">
                DevPulse doesn't micromanage—it observes. Like a fitness tracker for your mind, it maps your GitHub activity to help you spot burnout before it happens and celebrates the discipline of consistent creation.
              </p>
           </div>
           <div className="space-y-6">
              <h3 className="text-2xl font-bold">Guided Self-Improvement</h3>
              <ul className="space-y-4">
                 <li className="flex gap-4">
                    <i className="fas fa-check-circle text-blue-500 mt-1"></i>
                    <span><strong>User-Initiated Analysis:</strong> We only deep-dive into code when you ask.</span>
                 </li>
                 <li className="flex gap-4">
                    <i className="fas fa-check-circle text-blue-500 mt-1"></i>
                    <span><strong>Growth, Not Judgment:</strong> Metrics designed to reflect your evolution over years, not days.</span>
                 </li>
                 <li className="flex gap-4">
                    <i className="fas fa-check-circle text-blue-500 mt-1"></i>
                    <span><strong>Gamified Mastery:</strong> A ranking system inspired by competitive platforms to keep you motivated.</span>
                 </li>
              </ul>
           </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500 uppercase tracking-tighter">Your Personal Analytics Engine</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'fa-brain', title: 'Personal Reflection', desc: 'Summary cards showing key productivity indicators from a growth perspective.' },
              { icon: 'fa-medal', title: 'Ranking Journey', desc: 'Ascend from Newbie to Master through disciplined contribution and consistent habits.' },
              { icon: 'fa-heart-circle-bolt', title: 'Wellbeing Monitor', desc: 'Identify workload spikes and burnout risks early to maintain your passion for code.' },
              { icon: 'fa-microchip', title: 'On-Demand Audit', desc: 'Request AI-driven repository analysis for refactoring and hygiene tips when you need it.' },
              { icon: 'fa-globe', title: 'Optional Rankings', desc: 'Participate in optional leaderboards to challenge yourself against the global community.' },
              { icon: 'fa-file-pdf', title: 'Professional Portfolio', desc: 'Export submission-ready PDF/CSV reports for project documentation or self-review.' }
            ].map((f, i) => (
              <div key={i} className="p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:border-blue-500 transition-all group">
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <i className={`fas ${f.icon} text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="container mx-auto px-6 py-12 text-center text-slate-500 border-t border-slate-800">
        <p>&copy; 2024 DevPulse Platform. Designed for personal engineering growth.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
