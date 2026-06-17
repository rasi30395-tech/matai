import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Check, Play, BookOpen, Layers, Settings, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCTA = () => {
    if (user) {
      navigate('/workspace');
    } else {
      navigate('/auth');
    }
  };

  const features = [
    {
      icon: BookOpen,
      title: "Step-by-Step Logic",
      desc: "Clear, structured logical breakdowns of complex derivations, algebra, and calculus expressions."
    },
    {
      icon: Play,
      title: "Cinematic Explanations",
      desc: "Dynamic rendering of math curves using Manim integration to build visual intuition."
    },
    {
      icon: Layers,
      title: "Interactive Visualization",
      desc: "Live coordinate graphs and mathematical charts generated in real time to test bounds."
    }
  ];

  return (
    <div className="min-h-screen bg-background-primary text-text-primary font-sans">
      {/* Navigation Bar */}
      <header className="border-b border-border-custom px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded bg-text-primary text-background-primary flex items-center justify-center font-bold text-base">
            M
          </div>
          <span className="font-display font-bold text-lg tracking-tight">MatAI</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-text-secondary">
          <a href="#features" className="hover:text-text-primary transition-colors">Features</a>
          <a href="#solutions" className="hover:text-text-primary transition-colors">Solutions</a>
          <a href="#about" className="hover:text-text-primary transition-colors">About</a>
        </nav>

        <button 
          onClick={handleCTA}
          className="px-4 py-2 rounded-lg bg-text-primary text-background-primary hover:opacity-90 text-xs font-semibold font-mono tracking-wider transition-all cursor-pointer"
        >
          {user ? 'ENTER LABORATORY' : 'SIGN IN'}
        </button>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center px-6 py-20 md:py-32 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center space-x-2 bg-background-secondary border border-border-custom px-3 py-1 rounded-full text-xs font-medium text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-text-primary"></span>
            <span>Version 2.0 Enterprise Release</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight leading-tight">
            Solve, Differentiate, and <br className="hidden md:block"/>
            <span className="underline decoration-1 underline-offset-4">Visualize Mathematics</span> with AI.
          </h1>
          <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Generate detailed logical proofs, synchronized concept explanations, coordinate plots, and custom Manim motion-graphic explainers in a single SaaS productivity workspace.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={handleCTA}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-text-primary text-background-primary hover:opacity-90 text-sm font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <span>Open AI Assistant</span>
            <ArrowRight size={16} />
          </button>
          <a 
            href="#features" 
            className="w-full sm:w-auto px-6 py-3 rounded-lg border border-border-custom bg-background-primary hover:bg-background-secondary text-sm font-semibold text-center transition-all"
          >
            Explore features
          </a>
        </motion.div>
      </section>

      {/* Feature Grids */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-16 border-t border-border-custom">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-text-secondary">Core Laboratory Modules</h2>
          <p className="text-2xl font-bold font-display tracking-tight text-text-primary">A clean, high-performance toolkit for math visualization</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="bg-background-secondary border border-border-custom p-8 rounded-2xl space-y-4 hover:border-text-primary transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-text-primary text-background-primary flex items-center justify-center">
                  <Icon size={18} />
                </div>
                <h3 className="text-base font-bold tracking-tight">{feat.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-custom bg-background-secondary py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-text-primary">MatAI Platform</span>
            <span>&copy; {new Date().getFullYear()} MatAI, Inc. All rights reserved.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-text-primary transition-colors">Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
