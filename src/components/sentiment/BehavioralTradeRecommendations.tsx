/*
  BehavioralTradeRecommendations.tsx
  Direct Behavioral Trade Action Recommendations - SIP Brewery
  ----------------------------------------------------------
  - Powered by ASI backend: /asi/process (type: 'behavioral_trade_recommendations')
  - AI-driven buy/sell/hold/hedge signals based on behavioral intelligence
  - Premium actionable cards with risk and rationale
*/

'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, PauseCircle, ShieldCheck, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

interface TradeRecommendation {
  id: string;
  asset: string;
  action: 'buy' | 'sell' | 'hold' | 'hedge';
  rationale: string;
  risk: string;
  confidence: number; // 0-100
}

const demoRecommendations: TradeRecommendation[] = [
  {
    id: '1',
    asset: 'RELIANCE',
    action: 'buy',
    rationale: 'Contrarian alpha detected, crowd selling is peaking.',
    risk: 'Low',
    confidence: 91
  },
  {
    id: '2',
    asset: 'HDFCBANK',
    action: 'hold',
    rationale: 'Behavioral risk is rising, but no clear crowding.',
    risk: 'Medium',
    confidence: 72
  },
  {
    id: '3',
    asset: 'INFY',
    action: 'sell',
    rationale: 'Panic selling risk detected, alpha opportunity is fading.',
    risk: 'High',
    confidence: 64
  },
  {
    id: '4',
    asset: 'TCS',
    action: 'hedge',
    rationale: 'Volatility spike predicted, hedge to reduce risk.',
    risk: 'Medium',
    confidence: 78
  }
];

const iconMap = {
  buy: ArrowUpRight,
  sell: ArrowDownRight,
  hold: PauseCircle,
  hedge: ShieldCheck
};

const BehavioralTradeRecommendations = () => {
  const [recommendations, setRecommendations] = useState<TradeRecommendation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/asi/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'behavioral_trade_recommendations',
        data: {},
        parameters: {}
      })
    })
      .then(async res => {
        if (!res.ok) throw new Error('ASI backend error');
        const result = await res.json();
        setRecommendations(result.result || result.recommendations);
      })
      .catch(err => {
        console.error('❌ Behavioral Trade Recommendations ASI error:', err);
        setRecommendations(demoRecommendations);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-gradient-to-br from-black/90 to-purple-900/80">
      <div className="container-custom">
        <motion.h2 className="display-title text-white mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Direct <span className="text-gradient">Behavioral Trade Recommendations</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(loading ? demoRecommendations : recommendations).map(rec => {
            const Icon = iconMap[rec.action] || Brain;
            return (
              <motion.div key={rec.id} className={`rounded-2xl p-6 border shadow-xl bg-dark-800/80 border-accent-neon/20 flex flex-col gap-2`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <div className="flex items-center gap-3 mb-2">
                  <Icon className={`w-8 h-8 ${rec.action === 'buy' ? 'text-green-400' : rec.action === 'sell' ? 'text-red-400' : rec.action === 'hedge' ? 'text-orange-400' : 'text-accent-neon'}`} />
                  <span className={`font-bold text-lg ${rec.action === 'buy' ? 'text-green-400' : rec.action === 'sell' ? 'text-red-400' : rec.action === 'hedge' ? 'text-orange-400' : 'text-accent-neon'}`}>{rec.action.toUpperCase()}</span>
                </div>
                <div className="text-white font-semibold text-xl">{rec.asset}</div>
                <div className="text-gray-300 text-md mb-1">{rec.rationale}</div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${rec.risk === 'High' ? 'bg-red-500/30 text-red-300' : rec.risk === 'Medium' ? 'bg-orange-400/30 text-orange-200' : 'bg-accent-neon/20 text-accent-neon'}`}>{rec.risk} Risk</div>
                <div className="text-xs text-gray-400 mt-2">Confidence: {rec.confidence}%</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BehavioralTradeRecommendations;
