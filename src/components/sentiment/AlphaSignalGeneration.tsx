/*
  AlphaSignalGeneration.tsx
  Alpha Signal Generation - SIP Brewery
  ------------------------------------
  - Powered by ASI backend: /asi/process (type: 'alpha_signal_generation')
  - Delivers actionable alpha signals with rationale and risk
  - Premium signal cards and charts
*/

'use client';

import React, { useState, useEffect } from 'react';
import { Zap, BarChart3, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

interface AlphaSignal {
  id: string;
  asset: string;
  signal: string;
  rationale: string;
  confidence: number;
}

const demoAlphaSignals: AlphaSignal[] = [
  {
    id: '1',
    asset: 'RELIANCE',
    signal: 'Strong Buy',
    rationale: 'Contrarian activity and low crowd risk detected.',
    confidence: 91
  },
  {
    id: '2',
    asset: 'ICICIBANK',
    signal: 'Buy',
    rationale: 'Momentum building, institutional flows rising.',
    confidence: 82
  },
  {
    id: '3',
    asset: 'INFY',
    signal: 'Hold',
    rationale: 'Mixed signals, behavioral risk moderate.',
    confidence: 68
  },
  {
    id: '4',
    asset: 'TCS',
    signal: 'Sell',
    rationale: 'Crowding and panic risk detected.',
    confidence: 74
  }
];

const AlphaSignalGeneration = () => {
  const [signals, setSignals] = useState<AlphaSignal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/asi/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'alpha_signal_generation',
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
        console.error('❌ Alpha Signal Generation ASI error:', err);
        setSignals(demoAlphaSignals);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-gradient-to-br from-black/90 to-purple-900/80">
      <div className="container-custom">
        <motion.h2 className="display-title text-white mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Alpha <span className="text-gradient">Signal Generation</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(loading ? demoAlphaSignals : signals).map(signal => (
            <motion.div key={signal.id} className={`rounded-2xl p-6 border shadow-xl bg-dark-800/80 border-accent-neon/20 flex flex-col gap-2`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-8 h-8 text-accent-neon" />
                <span className="font-bold text-lg text-white">{signal.asset}</span>
              </div>
              <div className="text-gray-200 text-md mb-1">{signal.signal}</div>
              <div className="text-gray-400 text-sm mb-1">{signal.rationale}</div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-accent-neon/20 text-accent-neon">Confidence: {signal.confidence}%</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlphaSignalGeneration;
