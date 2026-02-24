import { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
  useLocation,
  Link
} from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Wallet, 
  History, 
  Users, 
  User as UserIcon, 
  MessageCircle,
  Plus,
  Trophy,
  Gamepad2,
  Settings
} from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import WalletPage from './pages/WalletPage';
import HistoryPage from './pages/HistoryPage';
import ReferralPage from './pages/ReferralPage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';

function TabBar() {
  const location = useLocation();
  const { user } = useAuth();
  
  if (!user || location.pathname === '/login' || location.pathname === '/signup' || location.pathname.startsWith('/admin')) {
    return null;
  }

  const tabs = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/wallet', icon: Wallet, label: 'Wallet' },
    { path: '/referral', icon: Users, label: 'Refer' },
    { path: '/profile', icon: UserIcon, label: 'Profile' },
  ];

  return (
    <div className="ios-tab-bar">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <Link 
            key={tab.path} 
            to={tab.path}
            className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-blue-500 scale-110' : 'text-slate-400'}`}
          >
            <tab.icon size={24} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

function AppRoutes() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto min-h-screen">
      <Routes>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
        
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/game/:type" element={user ? <GamePage /> : <Navigate to="/login" />} />
        <Route path="/wallet" element={user ? <WalletPage /> : <Navigate to="/login" />} />
        <Route path="/history" element={user ? <HistoryPage /> : <Navigate to="/login" />} />
        <Route path="/referral" element={user ? <ReferralPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/login" />} />
        
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="relative overflow-hidden min-h-screen">
          {/* Background Elements */}
          <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
          <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />
          
          <AppRoutes />
          <TabBar />
        </div>
      </Router>
    </AuthProvider>
  );
}
