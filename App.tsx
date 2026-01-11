
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import UserProgress from './pages/UserProgress';
import Settings from './pages/Settings';
import Repositories from './pages/Repositories';
import Languages from './pages/Languages';
import Insights from './pages/Insights';
import AdminDashboard from './pages/AdminDashboard';
import Tasks from './pages/Tasks';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Core Productivity Routes */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/tasks" element={<Layout><Tasks /></Layout>} />
        <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
        <Route path="/user-progress" element={<Layout><UserProgress /></Layout>} />
        <Route path="/repositories" element={<Layout><Repositories /></Layout>} />
        <Route path="/languages" element={<Layout><Languages /></Layout>} />
        <Route path="/insights" element={<Layout><Insights /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
