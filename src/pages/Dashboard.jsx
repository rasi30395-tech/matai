import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import Sidebar from '../components/Sidebar';
import { 
  Flame, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ArrowUpRight, 
  TrendingUp,
  Sparkles,
  Zap,
  Shield,
  Activity,
  Award as Trophy
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const { 
    xp, 
    level, 
    rank,
    xpInCurrentLevel, 
    xpNeededForNextLevel, 
    streak, 
    achievements, 
    missions, 
    leaderboard 
  } = useGame();

  const pct = Math.floor((xpInCurrentLevel / xpNeededForNextLevel) * 100);

  // Telemetry states
  const [fps, setFps] = useState(60.0);
  const [gpuLoad, setGpuLoad] = useState(45);
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setFps(parseFloat((59.3 + Math.random() * 0.7).toFixed(1)));
      setGpuLoad(Math.floor(38 + Math.random() * 12));
      setLatency(Math.floor(10 + Math.random() * 5));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  // Mouse Reactive Glow Coordinates for HUD Cards
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90 } }
  };

  return (
    <div className="min-h-screen bg-background flex text-text font-sans relative overflow-hidden">
      {/* HUD Diagonal lines overlay */}
      <div className="absolute inset-0 pointer-events-none hud-stripes opacity-5 z-0"></div>

      <Sidebar />

      {/* Command Dashboard */}
      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 relative z-10">
        
        {/* HUD Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-primary/20 pb-5 mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold uppercase tracking-wider text-glow-cyan flex items-center space-x-2">
              <Zap className="text-primary animate-pulse w-5 h-5" />
              <span>Tactical Command Deck</span>
            </h1>
            <p className="text-muted text-xs font-mono mt-0.5 uppercase tracking-wide">SOLVER NODE CONFIGURATION ACTIVE</p>
          </div>
          <div className="flex items-center space-x-4 bg-slate-950/45 border border-primary/20 px-4 py-1.5 rounded-xl text-[10px] font-mono text-muted">
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success active-status-pulse"></span>
              <span>NODE: <strong className="text-success uppercase font-bold">ONLINE</strong></span>
            </div>
            <span className="w-px h-3 bg-white/10"></span>
            <div>FPS: <strong className="text-primary text-glow-cyan">{fps} FPS</strong></div>
            <span className="w-px h-3 bg-white/10"></span>
            <div>LATENCY: <strong className="text-secondary">{latency} MS</strong></div>
            <span className="w-px h-3 bg-white/10"></span>
            <div>GPU: <strong className="text-success">{gpuLoad}%</strong></div>
          </div>
        </div>

        {/* HUD Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column: XP and Missions */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Level & XP Gauge */}
            <motion.div 
              variants={itemVariants} 
              onMouseMove={handleMouseMove}
              className="glass-panel p-6 rounded-2xl relative overflow-hidden card-neon-border border border-primary/10"
              style={{
                '--mouse-x': `${coords.x}px`,
                '--mouse-y': `${coords.y}px`
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-1 bg-secondary/20 text-secondary border border-secondary/35 px-2.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider">
                    {rank} RANK
                  </div>
                  <h2 className="text-lg font-display font-bold uppercase tracking-wider text-glow-purple flex items-center space-x-2">
                    <Shield className="text-secondary w-4.5 h-4.5" />
                    <span>COMMAND LEVEL {level}</span>
                  </h2>
                </div>
                <div className="text-right font-mono text-[10px] text-muted">
                  <span>{xp} / {level * 200} CUMULATIVE XP</span>
                </div>
              </div>

              {/* Progress gauge */}
              <div className="space-y-2">
                <div className="w-full bg-white/5 rounded-full h-3.5 overflow-hidden border border-white/5 p-0.5">
                  <div 
                    className="bg-gradient-to-r from-primary via-accent to-secondary h-2.5 rounded-full transition-all duration-500 shadow-neon-cyan/25"
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-muted font-mono">
                  <span>LEVEL XP progress: {pct}%</span>
                  <span>{200 - xpInCurrentLevel} XP to LEVEL {level + 1}</span>
                </div>
              </div>
            </motion.div>

            {/* Active Learning Missions */}
            <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl space-y-4 border border-primary/10">
              <h2 className="text-xs font-mono uppercase text-primary tracking-widest flex items-center space-x-2 font-bold">
                <Sparkles size={14} className="text-primary animate-pulse" />
                <span>DAILY QUEST MISSIONS</span>
              </h2>
              
              <div className="space-y-3">
                {missions.map((m) => {
                  const progressPct = Math.floor((m.progress / m.target) * 100);
                  return (
                    <div key={m.id} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-between gap-4 hover:border-primary/20 transition-all">
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-xs uppercase font-display tracking-wider text-glow-cyan">{m.title}</h3>
                          {m.completed && <CheckCircle2 size={13} className="text-success" />}
                        </div>
                        <p className="text-[11px] text-muted font-mono leading-relaxed">{m.desc}</p>
                        <div className="flex items-center space-x-2 pt-1.5">
                          <div className="flex-1 bg-white/5 rounded-full h-1 overflow-hidden">
                            <div 
                              className="bg-primary h-1 rounded-full" 
                              style={{ width: `${progressPct}%` }}
                            ></div>
                          </div>
                          <span className="text-[9px] text-muted font-mono">{m.progress}/{m.target}</span>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end justify-center font-mono">
                        <span className="text-xs font-bold text-success">+{m.xpReward} XP</span>
                        <span className="text-[8px] text-muted uppercase font-bold">REWARD</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Saved Lessons */}
            <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl space-y-4 border border-primary/10">
              <h2 className="text-xs font-mono uppercase text-primary tracking-widest font-bold">SAVED DIAGNOSTIC SCRIPTS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-between hover:border-primary/20 transition-all cursor-pointer group">
                  <div className="space-y-1">
                    <h3 className="font-bold text-xs uppercase tracking-wide font-display flex items-center space-x-2">
                      <BookOpen size={14} className="text-primary" />
                      <span>Polynomial Factorization</span>
                    </h3>
                    <p className="text-[10px] text-muted font-mono uppercase">2 hours ago</p>
                  </div>
                  <ArrowUpRight size={14} className="text-muted group-hover:text-primary transition-colors" />
                </div>

                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-between hover:border-secondary/20 transition-all cursor-pointer group">
                  <div className="space-y-1">
                    <h3 className="font-bold text-xs uppercase tracking-wide font-display flex items-center space-x-2">
                      <BookOpen size={14} className="text-secondary" />
                      <span>Polynomial Derivations</span>
                    </h3>
                    <p className="text-[10px] text-muted font-mono uppercase">1 day ago</p>
                  </div>
                  <ArrowUpRight size={14} className="text-muted group-hover:text-secondary transition-colors" />
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Achievements and Leaderboard */}
          <div className="space-y-8">
            
            {/* Streak card */}
            <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl flex items-center justify-between border-glow-cyan card-neon-border border border-primary/15">
              <div className="space-y-1">
                <div className="text-[9px] text-muted font-mono uppercase font-bold">Operational Streak</div>
                <div className="text-base font-display font-bold text-glow-cyan flex items-center space-x-1.5 uppercase">
                  <Flame size={18} className="fill-warning text-warning animate-bounce" />
                  <span>{streak} ACTIVE DAYS</span>
                </div>
              </div>
              <div className="text-right font-mono">
                <div className="text-[9px] text-muted uppercase font-bold">Multiplier</div>
                <div className="text-base font-bold text-secondary">x1.5 XP</div>
              </div>
            </motion.div>

            {/* Achievement Badges */}
            <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl space-y-4 border border-primary/10">
              <h2 className="text-xs font-mono uppercase text-secondary tracking-widest flex items-center space-x-1.5 font-bold">
                <Trophy className="text-secondary w-4.5 h-4.5" />
                <span>ACHIEVEMENT VAULT</span>
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((a) => (
                  <div key={a.id} className={`p-3 rounded-xl border text-center space-y-1 bg-white/[0.01] ${a.color} border-white/5`}>
                    <div className="text-xl">{a.icon}</div>
                    <h4 className="text-[10px] font-bold font-display truncate uppercase">{a.title}</h4>
                    <p className="text-[9px] text-muted leading-tight font-mono">{a.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Leaderboard Widget */}
            <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl space-y-4 border border-primary/10">
              <h2 className="text-xs font-mono uppercase text-primary tracking-widest font-bold">TACTICAL LEADERBOARD</h2>
              <div className="space-y-3">
                {leaderboard.map((entry, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition-all ${
                      entry.current 
                        ? 'bg-gradient-to-r from-primary/15 to-secondary/10 border-primary/40 text-primary shadow-neon-cyan/5' 
                        : 'bg-white/[0.01] border-white/5 text-muted hover:text-text'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold w-4 text-[10px]">{idx + 1}</span>
                      <span className="text-sm">{entry.avatar}</span>
                      <span className="font-semibold truncate max-w-[90px]">{entry.name}</span>
                    </div>
                    <div className="flex items-center space-x-3 font-mono text-[10px]">
                      <span className="text-[8px] bg-white/5 px-1 rounded text-muted font-bold">{entry.rank}</span>
                      <span>Lv.{entry.level}</span>
                      <span className="font-bold text-text">{entry.xp} XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
