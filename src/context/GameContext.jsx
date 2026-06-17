import React, { createContext, useState, useEffect, useContext } from 'react';

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [xp, setXp] = useState(() => {
    const cached = localStorage.getItem('matai_xp');
    return cached ? parseInt(cached, 10) : 2450;
  });

  const [streak, setStreak] = useState(() => {
    const cached = localStorage.getItem('matai_streak');
    return cached ? parseInt(cached, 10) : 7;
  });

  const [lastActive, setLastActive] = useState(() => {
    return localStorage.getItem('matai_last_active') || new Date().toDateString();
  });

  const [achievements, setAchievements] = useState(() => {
    const cached = localStorage.getItem('matai_achievements');
    return cached ? JSON.parse(cached) : [
      { id: 'limit_buster', title: 'Limit Buster', desc: 'Solved 3 limit calculations', icon: '🏆', rarity: 'rare', color: 'text-cyan-400 border-cyan-400/30' },
      { id: 'first_steps', title: 'Adept Beginner', desc: 'Completed the intro solver tour', icon: '🔥', rarity: 'common', color: 'text-purple-400 border-purple-400/30' },
    ];
  });

  const [missions, setMissions] = useState(() => {
    const cached = localStorage.getItem('matai_missions');
    return cached ? JSON.parse(cached) : [
      { id: 'calc_quest', title: 'Calculus Quest', desc: 'Differentiate or integrate 1 equation', progress: 0, target: 1, xpReward: 150, completed: false },
      { id: 'alg_champion', title: 'Algebra Scholar', desc: 'Solve quadratic systems', progress: 1, target: 3, xpReward: 250, completed: false },
      { id: 'manim_cine', title: 'Cinematic Learner', desc: 'Watch 2 Manim animation explainers', progress: 1, target: 2, xpReward: 200, completed: false },
    ];
  });

  const level = Math.floor(xp / 200) + 1;
  const xpInCurrentLevel = xp % 200;
  const xpNeededForNextLevel = 200;

  const getRank = (lvl) => {
    if (lvl < 10) return 'Beginner';
    if (lvl < 25) return 'Explorer';
    if (lvl < 50) return 'Solver';
    if (lvl < 100) return 'Master';
    return 'Legend';
  };
  const rank = getRank(level);

  const [leaderboard, setLeaderboard] = useState([
    { name: 'Dr. Euler', level: 112, rank: 'Legend', xp: 22450, streak: 45, current: false, avatar: '🧮' },
    { name: 'Gauss Junior', level: 56, rank: 'Master', xp: 11200, streak: 28, current: false, avatar: '📐' },
    { name: 'Hypatia_X', level: 28, rank: 'Solver', xp: 5600, streak: 19, current: false, avatar: '💫' },
    { name: 'You (Adept Solver)', level: 13, rank: 'Explorer', xp: 2450, streak: 7, current: true, avatar: '🤖' },
    { name: 'Newton1687', level: 9, rank: 'Beginner', xp: 1800, streak: 3, current: false, avatar: '🍎' },
  ]);

  // Persist game values
  useEffect(() => {
    localStorage.setItem('matai_xp', xp);
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('matai_streak', streak);
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('matai_achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('matai_missions', JSON.stringify(missions));
  }, [missions]);

  // Update leaderboard with user's actual state
  useEffect(() => {
    setLeaderboard(prev => prev.map(entry => {
      if (entry.current) {
        return { ...entry, level, rank, xp, streak };
      }
      return entry;
    }).sort((a, b) => b.xp - a.xp));
  }, [xp, level, streak, rank]);

  const addXp = (amount) => {
    setXp(prev => {
      const newXp = prev + amount;
      return newXp;
    });
  };

  const incrementStreak = () => {
    const today = new Date().toDateString();
    if (lastActive !== today) {
      setStreak(prev => prev + 1);
      setLastActive(today);
      localStorage.setItem('matai_last_active', today);
      addXp(50); // Daily login streak reward
    }
  };

  const updateMissionProgress = (missionId, amount = 1) => {
    setMissions(prev => prev.map(m => {
      if (m.id === missionId && !m.completed) {
        const nextProgress = Math.min(m.progress + amount, m.target);
        const completed = nextProgress >= m.target;
        if (completed) {
          addXp(m.xpReward);
        }
        return { ...m, progress: nextProgress, completed };
      }
      return m;
    }));
  };

  const unlockAchievement = (id, title, desc, icon) => {
    if (achievements.some(a => a.id === id)) return;
    const newBadge = { id, title, desc, icon, rarity: 'epic', color: 'text-amber-400 border-amber-400/30 animate-pulse' };
    setAchievements(prev => [...prev, newBadge]);
    addXp(300); // Epic badge reward
  };

  return (
    <GameContext.Provider value={{
      xp,
      level,
      rank,
      xpInCurrentLevel,
      xpNeededForNextLevel,
      streak,
      achievements,
      missions,
      leaderboard,
      addXp,
      incrementStreak,
      updateMissionProgress,
      unlockAchievement
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
