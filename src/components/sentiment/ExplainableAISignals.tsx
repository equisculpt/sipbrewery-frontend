/*
  ExplainableAISignals.tsx
  Explainable AI for Behavioral Signals - SIP Brewery
  --------------------------------------------------
  - Powered by ASI backend: /asi/process (type: 'explainable_ai_signals')
  - Provides natural language explanations for all behavioral analytics and trade signals
  - Premium explainability cards with icons and highlights
*/

'use client';

import React, { useState, useEffect } from 'react';
import { Brain, Zap, AlertTriangle, BarChart3, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExplainableSignal {
  id: string;
  signalType: string;
  explanation: string;
  impact: string;
  confidence: number; // 0-100
}

const demoSignals: ExplainableSignal[] = [
  {
    id: '1',
    signalType: 'Alpha Opportunity',
    explanation: 'Contrarian activity is rising while crowd risk is low. This creates a favorable environment for alpha generation.',
    impact: 'Positive',
    confidence: 91
  },
  {
    id: '2',
    signalType: 'Panic Risk',
    explanation: 'Retail panic selling detected. Short-term volatility risk is elevated.',
    impact: 'Negative',
    confidence: 84
  },
  {
    id: '3',
    signalType: 'Herding',
    explanation: 'Institutional investors are crowding into banking stocks, increasing reversal risk.',
    impact: 'Neutral',
    confidence: 76
  }
];

const ExplainableAISignals = () => {
  const [signals, setSignals] = useState<ExplainableSignal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/asi/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'explainable_ai_signals',
        data: {},
        parameters: {}
      })
    })
      .then(async res => {
        if (!res.ok) throw new Error('ASI backend error');
        const result = await res.json();
        setSignals(result.result || result.signals);
      })
      .catch(err => {
        console.error('❌ Explainable AI Signals ASI error:', err);
        setSignals(demoSignals);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-gradient-to-br from-black/90 to-purple-900/80">
      <div className="container-custom">
        <motion.h2 className="display-title text-white mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Explainable <span className="text-gradient">AI Behavioral Signals</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(loading ? demoSignals : signals).map(signal => (
            <motion.div key={signal.id} className={`rounded-2xl p-6 border shadow-xl bg-dark-800/80 border-accent-neon/20 flex flex-col gap-2`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-3 mb-2">
                <Info className="w-8 h-8 text-accent-neon" />
                <span className="font-bold text-lg text-white">{signal.signalType}</span>
              </div>
              <div className="text-gray-200 text-md mb-1">{signal.explanation}</div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${signal.impact === 'Positive' ? 'bg-green-500/30 text-green-300' : signal.impact === 'Negative' ? 'bg-red-500/30 text-red-300' : 'bg-orange-400/30 text-orange-200'}`}>{signal.impact} Impact</div>
              <div className="text-xs text-gray-400 mt-2">Confidence: {signal.confidence}%</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExplainableAISignals;
