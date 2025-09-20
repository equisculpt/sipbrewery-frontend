/*
  ExplainablePortfolioOptimization.tsx
  Explainable AI Portfolio Optimization - SIP Brewery
  --------------------------------------------------
  - Powered by ASI backend: /asi/process (type: 'explainable_portfolio_optimization')
  - Provides optimization suggestions with natural language explanations and risk/alpha rationale
  - Premium optimization cards with explainability
*/

'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, Brain, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface OptimizationSuggestion {
  id: string;
  suggestion: string;
  rationale: string;
  expectedAlpha: number;
  riskImpact: string;
  explainability: string;
}

const demoSuggestions: OptimizationSuggestion[] = [
  {
    id: '1',
    suggestion: 'Increase allocation to INFY by 2%',
    rationale: 'Behavioral alpha signals and low risk detected.',
    expectedAlpha: 0.8,
    riskImpact: 'Minimal',
    explainability: 'Contrarian flows and disciplined trading in INFY create alpha with low risk.'
  },
  {
    id: '2',
    suggestion: 'Reduce exposure to banking sector by 3%',
    rationale: 'Crowding and panic risk detected in major banks.',
    expectedAlpha: -0.5,
    riskImpact: 'Moderate',
    explainability: 'Institutional crowding and retail panic increase reversal risk in banking.'
  }
];

const ExplainablePortfolioOptimization = () => {
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/asi/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'explainable_portfolio_optimization',
        data: {},
        parameters: {}
      })
    })
      .then(async res => {
        if (!res.ok) throw new Error('ASI backend error');
        const result = await res.json();
        setSuggestions(result.result || result.suggestions);
      })
      .catch(err => {
        console.error('❌ Explainable Portfolio Optimization ASI error:', err);
        setSuggestions(demoSuggestions);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-gradient-to-br from-black/90 to-purple-900/80">
      <div className="container-custom">
        <motion.h2 className="display-title text-white mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Explainable <span className="text-gradient">Portfolio Optimization</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(loading ? demoSuggestions : suggestions).map(suggestion => (
            <motion.div key={suggestion.id} className={`rounded-2xl p-6 border shadow-xl bg-dark-800/80 border-accent-neon/20 flex flex-col gap-2`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="w-8 h-8 text-accent-neon" />
                <span className="font-bold text-lg text-white">{suggestion.suggestion}</span>
              </div>
              <div className="text-accent-neon font-bold mb-1">Expected Alpha: {suggestion.expectedAlpha}%</div>
              <div className="text-gray-200 text-md mb-1">{suggestion.rationale}</div>
              <div className="text-gray-400 text-sm mb-1">Risk Impact: {suggestion.riskImpact}</div>
              <div className="text-xs text-accent-neon mt-2">{suggestion.explainability}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExplainablePortfolioOptimization;
