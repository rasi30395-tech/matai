import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Video, 
  HelpCircle, 
  LogOut, 
  Menu, 
  ChevronLeft, 
  Flame, 
  Award, 
  Cpu
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { xp, level, xpInCurrentLevel, xpNeededForNextLevel, streak } = useGame();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/workspace', label: 'AI Workspace', icon: MessageSquare },
    { path: '/video', label: 'Manim Video', icon: Video },
    { path: '/solution', label: 'Solution Viewer', icon: HelpCircle },
  ];

  const pct = Math.floor((xpInCurrentLevel / xpNeededForNextLevel) * 100);

  return (
    <div 
      className={`glass-panel h-screen transition-all duration-300 flex flex-col sticky top-0 left-0 z-40 ${
        collapsed ? 'w-20' : 'w-64'
      } border-r border-white/10 text-text`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/5">
        {!collapsed && (
          <Link to="/" className="flex items-center space-x-2">
            <Cpu className="text-primary w-6 h-6 animate-pulse" />
            <span className="font-display font-bold text-lg tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MATAILAB
            </span>
          </Link>
        )}
        {collapsed && (
          <Cpu className="text-primary w-6 h-6 mx-auto animate-pulse" />
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-primary transition-all ml-auto"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Profile & Gamification (Persistently Visible context) */}
      <div className="p-4 border-b border-white/5 bg-white/[0.02]">
        {collapsed ? (
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <img 
                src={user?.picture || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80'} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-primary/50"
              />
              <span className="active-status-pulse"></span>
              <span className="active-status-ping"></span>
              <div className="absolute -bottom-1 -left-1 bg-secondary text-[10px] font-bold px-1 rounded-full text-white">
                {level}
              </div>
            </div>
            <div className="flex items-center text-warning text-xs font-bold font-mono">
              <Flame size={14} className="fill-warning text-warning" />
              <span>{streak}d</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src={user?.picture || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80'} 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full border-2 border-primary/50"
                />
                <span className="active-status-pulse"></span>
                <span className="active-status-ping"></span>
              </div>
              <div className="overflow-hidden">
                <h3 className="font-semibold text-sm truncate">{user?.name || 'Adept Solver'}</h3>
                <p className="text-xs text-muted font-mono">Adept Level {level}</p>
              </div>
            </div>

            {/* XP progress bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-muted">
                <span>XP: {xpInCurrentLevel}/{xpNeededForNextLevel}</span>
                <span>{pct}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                ></div>
              </div>
            </div>

            {/* Streak indicator */}
            <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg border border-white/5">
              <div className="flex items-center space-x-1.5 text-warning font-mono text-xs font-bold">
                <Flame size={16} className="fill-warning animate-bounce" />
                <span>{streak} DAY STREAK!</span>
              </div>
              <div className="text-[10px] text-muted font-mono">
                +{xp} XP total
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all group ${
                active 
                  ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border-l-2 border-primary text-primary shadow-neon-cyan/5' 
                  : 'text-muted hover:text-text hover:bg-white/5'
              }`}
            >
              <Icon size={18} className={`transition-all group-hover:scale-110 ${active ? 'text-primary' : ''}`} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-white/5">
        <button 
          onClick={logout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-danger/80 hover:text-danger hover:bg-danger/10 transition-all"
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout Lab</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
