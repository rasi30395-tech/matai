import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const AuthPage = () => {
  const navigate = useNavigate();
  const { user, loginWithGoogle, loginMockUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/workspace');
    }
  }, [user, navigate]);

  const handleSimulatedLogin = (e) => {
    e.preventDefault();
    loginMockUser({
      name: email ? email.split('@')[0] : 'Scholar Adept',
      picture: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
      email: email || 'adept@matai.edu'
    });
    navigate('/workspace');
  };

  return (
    <div className="min-h-screen bg-background-secondary flex items-center justify-center p-4 font-sans text-text-primary">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-background-primary border border-border-custom p-8 rounded-2xl shadow-sm space-y-6"
      >
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-10 h-10 rounded-lg bg-text-primary text-background-primary flex items-center justify-center font-bold text-lg">
            M
          </div>
          <h1 className="text-xl font-bold font-display tracking-tight text-text-primary">Welcome to MatAI</h1>
          <p className="text-xs text-text-secondary">
            AI-Powered Mathematics Laboratory & Visualization Workspace
          </p>
        </div>

        <form onSubmit={handleSimulatedLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-text-secondary">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-text-secondary" />
              <input 
                type="email" 
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-border-custom bg-background-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-text-secondary">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-text-secondary" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-border-custom bg-background-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-2.5 rounded-lg bg-text-primary text-background-primary hover:opacity-90 font-semibold text-sm transition-all cursor-pointer"
          >
            Sign In with Email
          </button>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-border-custom"></div>
          <span className="flex-shrink mx-3 text-[10px] text-text-secondary font-mono uppercase tracking-wider">or continue with</span>
          <div className="flex-grow border-t border-border-custom"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={loginWithGoogle}
            className="flex items-center justify-center space-x-2 py-2 px-3 rounded-lg border border-border-custom bg-background-primary hover:bg-background-secondary text-xs font-semibold text-text-primary transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
            <span>Google</span>
          </button>

          <button 
            onClick={() => {
              loginMockUser();
              navigate('/workspace');
            }}
            className="flex items-center justify-center space-x-2 py-2 px-3 rounded-lg border border-border-custom bg-background-primary hover:bg-background-secondary text-xs font-semibold text-text-primary transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-text-primary" />
            <span>Sandbox</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
