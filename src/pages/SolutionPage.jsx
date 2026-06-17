import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { HelpCircle, ChevronRight, ChevronDown, Highlighter, Sparkles, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Export SolutionViewer as a standalone component for use in split screens
export const SolutionViewer = ({ solutionHtml }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [highlightedToken, setHighlightedToken] = useState(null);

  const parsedHtml = solutionHtml || `
    <h3>Problem Description:</h3>
    <p>Find the derivative of the polynomial: <strong>f(x) = x³ + 2x²</strong>.</p>
  `;

  const interactiveSteps = [
    {
      title: "Step 1: Identify terms & write the differential operator",
      formula: "d/dx [ x³ + 2x² ]",
      desc: "Distribute the derivative operator to each individual polynomial term.",
      mathBlocks: [
        { label: "Operator", value: "d/dx", type: "operator" },
        { label: "First Term", value: "x³", type: "term1" },
        { label: "Second Term", value: "2x²", type: "term2" }
      ]
    },
    {
      title: "Step 2: Apply the Power Rule to the first term x³",
      formula: "d/dx [ x³ ] = 3 * x^(3 - 1) = 3x²",
      desc: "The power rule states that d/dx [xⁿ] = n * x^(n-1). For x³, the power is 3, which moves in front of x, and the new exponent is 3 - 1 = 2.",
      mathBlocks: [
        { label: "Exponent", value: "3", type: "exponent" },
        { label: "Base Variable", value: "x", type: "base" },
        { label: "Resulting Power", value: "3x²", type: "result1" }
      ]
    },
    {
      title: "Step 3: Apply Power Rule & Constant Factor to 2x²",
      formula: "d/dx [ 2x² ] = 2 * (2 * x^(2 - 1)) = 4x",
      desc: "Pull out the constant multiplier 2. Then differentiate x² using the power rule to get 2x. Multiply them together: 2 * 2x = 4x.",
      mathBlocks: [
        { label: "Constant", value: "2", type: "constant" },
        { label: "Exponent", value: "2", type: "exponent" },
        { label: "Resulting Power", value: "4x", type: "result2" }
      ]
    },
    {
      title: "Step 4: Combine the results",
      formula: "f'(x) = 3x² + 4x",
      desc: "Sum the derivatives of the individual terms together to obtain the complete derivative function.",
      mathBlocks: [
        { label: "Final Derivative", value: "3x² + 4x", type: "final" }
      ]
    }
  ];

  const toggleStep = (index) => {
    setActiveStep(activeStep === index ? -1 : index);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Solver Content */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Original Problem Summary */}
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-primary space-y-2 card-neon-border">
          <h2 className="text-xs font-mono uppercase text-muted tracking-wider flex items-center space-x-1.5">
            <HelpCircle size={14} className="text-primary" />
            <span>Problem Statement</span>
          </h2>
          <div 
            className="font-mono text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: parsedHtml }}
          ></div>
        </div>

        {/* Expandable Step-by-Step Accordion */}
        <div className="space-y-4">
          <h2 className="text-base font-display font-semibold flex items-center space-x-2">
            <Highlighter className="text-secondary w-5 h-5" />
            <span>Derivation Blueprint</span>
          </h2>

          <div className="space-y-3">
            {interactiveSteps.map((step, idx) => {
              const isOpen = activeStep === idx;
              return (
                <div 
                  key={idx} 
                  className={`glass-panel rounded-xl overflow-hidden transition-all duration-200 border ${
                    isOpen ? 'border-white/15 bg-white/[0.02]' : 'border-white/5'
                  }`}
                >
                  {/* Step Header */}
                  <button 
                    onClick={() => toggleStep(idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm cursor-pointer hover:bg-white/[0.01]"
                  >
                    <span className="flex-1 pr-4 font-display text-text/90">{step.title}</span>
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>

                  {/* Step Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden border-t border-white/5"
                      >
                        <div className="p-5 space-y-4">
                          {/* Formula box */}
                          <div className="p-4 rounded-xl bg-background border border-white/5 font-mono text-center text-primary text-base select-all">
                            {step.formula}
                          </div>

                          <p className="text-muted text-xs leading-relaxed">{step.desc}</p>

                          {/* Interactive highlighter tokens */}
                          <div className="pt-2">
                            <div className="text-[10px] font-mono text-muted uppercase mb-2">Click elements to highlight:</div>
                            <div className="flex flex-wrap gap-2.5">
                              {step.mathBlocks.map((block, bIdx) => {
                                const isHighlighted = highlightedToken === block.type;
                                return (
                                  <button
                                    key={bIdx}
                                    onClick={() => setHighlightedToken(isHighlighted ? null : block.type)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer flex items-center space-x-1.5 ${
                                      isHighlighted 
                                        ? 'bg-gradient-to-r from-primary/25 to-secondary/20 border-primary text-primary text-glow-cyan' 
                                        : 'bg-white/5 border-white/10 text-muted hover:text-text'
                                    }`}
                                  >
                                    <span className="font-bold">{block.value}</span>
                                    <span className="opacity-50 text-[9px] uppercase">({block.label})</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Panel: Analogies & Insights */}
      <div className="space-y-6">
        
        {/* Interactive explanation box */}
        <AnimatePresence>
          {highlightedToken && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel border-primary p-6 rounded-2xl space-y-3 shadow-neon-cyan/5 card-neon-border"
            >
              <div className="flex items-center space-x-2 text-primary font-mono text-xs font-bold uppercase">
                <Sparkles size={14} />
                <span>Highlight Inspector</span>
              </div>
              <h3 className="font-semibold text-sm font-display">
                {highlightedToken === 'exponent' && "The Exponent Modifier"}
                {highlightedToken === 'operator' && "The Differential operator d/dx"}
                {highlightedToken === 'constant' && "Constant Factor Rule"}
                {highlightedToken === 'base' && "Variable Input"}
                {!['exponent', 'operator', 'constant', 'base'].includes(highlightedToken) && "Formula Token Info"}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                {highlightedToken === 'exponent' && "Exponents dictate the polynomial degrees. In power rule derivations, the original exponent multiplier is moved to the front and the degree reduces by one."}
                {highlightedToken === 'operator' && "Specifies differentiation respect to the variable 'x'. It behaves distributively across addition: d/dx[A + B] = d/dx[A] + d/dx[B]."}
                {highlightedToken === 'constant' && "Constants are coefficients that scale derivatives linearly. You pull constants out before applying power rules: d/dx[c*f(x)] = c * d/dx[f(x)]."}
                {highlightedToken === 'base' && "The core mathematical variable. The system solves equations relative to this coordinate baseline."}
                {!['exponent', 'operator', 'constant', 'base'].includes(highlightedToken) && "This specific token represents the intermediate calculated output of this calculation step."}
              </p>
              <button 
                onClick={() => setHighlightedToken(null)}
                className="w-full text-center py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-mono transition-colors cursor-pointer"
              >
                Clear Highlight
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analogy Explainer Card */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden bg-white/[0.01]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center space-x-2 text-secondary font-mono text-xs font-bold uppercase mb-4">
            <BookOpen size={14} />
            <span>Teaching Analogy</span>
          </div>
          <h3 className="font-display font-semibold text-sm mb-2">Think of it like a racecar on a hill!</h3>
          <p className="text-xs text-muted leading-relaxed">
            If the polynomial <strong>f(x) = x³ + 2x²</strong> represents the height profile of a rollercoaster, the derivative <strong>f'(x) = 3x² + 4x</strong> is the speedometer reading. It tells you exactly how steep the track is at any given horizontal distance x!
          </p>
        </div>

        {/* Gamification reminder widget */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center text-xs text-muted space-y-1">
          <span className="text-warning">🔥 tip:</span> Click on active steps to study derivations and earn more achievements!
        </div>
      </div>
    </div>
  );
};

const SolutionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const solutionHtml = location.state?.solutionHtml;

  return (
    <div className="min-h-screen bg-background flex text-text font-sans">
      <Sidebar />

      {/* Main Solution Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12">
        {/* Page Header */}
        <div className="border-b border-white/5 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">Interactive Solution Explorer</h1>
            <p className="text-muted text-sm mt-1">Review derivations with interactive formula token highlighting.</p>
          </div>
          <button 
            onClick={() => navigate('/workspace')}
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold font-mono transition-colors cursor-pointer"
          >
            &larr; Back to Workspace
          </button>
        </div>

        <SolutionViewer solutionHtml={solutionHtml} />
      </div>
    </div>
  );
};

export default SolutionPage;
