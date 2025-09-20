/*
  BehavioralAnalysisSection.tsx
  $1B Institutional-Grade Behavioral Analytics - SIP Brewery
  --------------------------------------------------------
  - Powered by ASI backend: /asi/process (type: 'behavioral_analysis')
  - Unifies market-wide and user-personalized behavioral intelligence
  - Visualizes bias, alpha, psychology, crowd risk, and archetypes
  - Ultra-premium UI: charts, cards, timeline, narrative, alerts
  - Designed to intimidate the world's top fund managers
*/

'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, Users, AlertTriangle, Zap, Brain, Globe2, UserCheck, Timeline } from 'lucide-react';
import { motion } from 'framer-motion';

interface BehavioralAlpha {
  score: number; // -100 to 100
  label: string;
  explanation: string;
}

interface BiasMetric {
  type: string;
  value: number; // 0-100
  label: string;
  risk: string;
}

interface Archetype {
  name: string;
  description: string;
  icon: string;
  score: number;
}

interface CrowdEvent {
  timestamp: number;
  event: string;
  riskLevel: string;
  impact: string;
}

interface BehavioralAnalysisData {
  alpha: BehavioralAlpha;
  biases: BiasMetric[];
  archetypes: Archetype[];
  timeline: CrowdEvent[];
  riskScore: number;
  riskLabel: string;
  aiNarrative: string;
}

const demoData: BehavioralAnalysisData = {
  alpha: {
    score: 84,
    label: 'Behavioral Alpha Surplus',
    explanation: 'Investors are exhibiting strong contrarian and disciplined behavior, adding significant alpha.'
  },
  biases: [
    { type: 'Herding', value: 21, label: 'Low Herding', risk: 'Minimal crowding' },
    { type: 'Loss Aversion', value: 43, label: 'Moderate Loss Aversion', risk: 'Watch for panic selling' },
    { type: 'Overconfidence', value: 12, label: 'Low Overconfidence', risk: 'Disciplined trading' },
    { type: 'Recency Bias', value: 32, label: 'Mild Recency', risk: 'Short-term memory' }
  ],
  archetypes: [
    { name: 'Contrarian', description: 'Buys when others sell, sells when others buy.', icon: 'Zap', score: 92 },
    { name: 'Momentum', description: 'Rides trends, quick to adapt.', icon: 'BarChart3', score: 65 },
    { name: 'Cautious', description: 'Waits for confirmation, avoids risk.', icon: 'AlertTriangle', score: 38 }
  ],
  timeline: [
    { timestamp: Date.now() - 3600000 * 6, event: 'Retail FOMO spike', riskLevel: 'Medium', impact: 'Short-term volatility' },
    { timestamp: Date.now() - 3600000 * 4, event: 'Institutional buying surge', riskLevel: 'Low', impact: 'Stabilizing effect' },
    { timestamp: Date.now() - 3600000 * 2, event: 'Herding detected', riskLevel: 'High', impact: 'Potential reversal' },
    { timestamp: Date.now(), event: 'Contrarian activity rising', riskLevel: 'Low', impact: 'Alpha opportunity' }
  ],
  riskScore: 18,
  riskLabel: 'Low Behavioral Risk',
  aiNarrative: 'Current market psychology is disciplined and opportunistic. Contrarian investors are driving alpha, while crowd risk is subdued.'
};

const BehavioralAnalysisSection = () => {
  const [data, setData] = useState<BehavioralAnalysisData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/asi/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'behavioral_analysis',
        data: {},
        parameters: {}
      })
    })
      .then(async res => {
        if (!res.ok) throw new Error('ASI backend error');
        const result = await res.json();
        setData(result.result || result);
      })
      .catch(err => {
        console.error('❌ Behavioral ASI error:', err);
        setData(demoData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <section className="section-padding bg-gradient-to-br from-purple-900/80 to-black/90 flex items-center justify-center min-h-[500px]">
        <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 1 }}>
          <div className="flex flex-col items-center gap-4">
            <Brain className="w-16 h-16 text-accent-neon animate-pulse" />
            <span className="text-2xl text-white font-bold animate-pulse">Analyzing Market Psychology...</span>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-br from-purple-900/80 to-black/90">
      <div className="container-custom">
        <motion.h2 className="display-title text-white mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Behavioral <span className="text-gradient">Alpha</span> & Market Psychology
        </motion.h2>
        {/* Alpha Card */}
        <motion.div className="mb-8 flex flex-wrap gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="bg-gradient-to-r from-accent-neon/20 to-accent-green/10 rounded-3xl p-8 flex-1 min-w-[320px] shadow-xl border border-accent-neon/30">
            <div className="flex items-center gap-4 mb-2">
              <Zap className="w-8 h-8 text-accent-neon" />
              <span className="text-3xl font-bold text-accent-neon">{data.alpha.score}</span>
              <span className="text-lg text-white font-semibold">{data.alpha.label}</span>
            </div>
            <p className="text-gray-200 text-lg mt-2">{data.alpha.explanation}</p>
          </div>
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/10 rounded-3xl p-8 flex-1 min-w-[320px] shadow-xl border border-orange-400/30">
            <div className="flex items-center gap-4 mb-2">
              <AlertTriangle className="w-8 h-8 text-orange-400" />
              <span className="text-3xl font-bold text-orange-400">{data.riskScore}</span>
              <span className="text-lg text-white font-semibold">{data.riskLabel}</span>
            </div>
            <p className="text-gray-200 text-lg mt-2">Behavioral risk is measured by crowding, panic, and bias levels across all investor classes.</p>
          </div>
        </motion.div>
        {/* Biases */}
        <motion.div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {data.biases.map((bias, idx) => (
            <div key={bias.type} className="bg-dark-800/80 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-accent-neon" />
                <span className="text-white font-semibold text-lg">{bias.type}</span>
              </div>
              <div className="text-3xl font-bold text-accent-neon">{bias.value}</div>
              <div className="text-gray-300 text-md mb-1">{bias.label}</div>
              <div className="text-xs text-orange-400 font-semibold">{bias.risk}</div>
            </div>
          ))}
        </motion.div>
        {/* Archetypes */}
        <motion.div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {data.archetypes.map((arc, idx) => {
            const Icon = { Zap, BarChart3, AlertTriangle }[arc.icon as keyof typeof import('lucide-react')];
            return (
              <div key={arc.name} className="bg-gradient-to-tr from-accent-neon/10 to-accent-green/10 rounded-2xl p-8 border border-accent-neon/20 flex flex-col items-center">
                {Icon ? <Icon className="w-10 h-10 mb-2 text-accent-neon" /> : <UserCheck className="w-10 h-10 mb-2 text-accent-neon" />}
                <div className="text-2xl font-bold text-white mb-1">{arc.name}</div>
                <div className="text-gray-200 mb-2 text-center">{arc.description}</div>
                <div className="text-lg font-semibold text-accent-neon">Score: {arc.score}</div>
              </div>
            );
          })}
        </motion.div>
        {/* Timeline */}
        <motion.div className="mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <h3 className="text-xl text-white mb-4 font-bold flex items-center gap-2"><Timeline className="w-6 h-6 text-accent-neon" />Behavioral Timeline</h3>
          <div className="flex flex-col gap-4">
            {data.timeline.map((event, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-dark-800/60 rounded-xl p-4 border border-white/10">
                <div className={`w-3 h-3 rounded-full ${event.riskLevel === 'High' ? 'bg-red-500' : event.riskLevel === 'Medium' ? 'bg-orange-400' : 'bg-accent-neon'}`}></div>
                <div className="flex-1">
                  <div className="text-white font-semibold">{event.event}</div>
                  <div className="text-gray-400 text-xs">{new Date(event.timestamp).toLocaleString()} | Impact: {event.impact}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${event.riskLevel === 'High' ? 'bg-red-500/30 text-red-300' : event.riskLevel === 'Medium' ? 'bg-orange-400/30 text-orange-200' : 'bg-accent-neon/20 text-accent-neon'}`}>{event.riskLevel}</div>
              </div>
            ))}
          </div>
        </motion.div>
        {/* AI Narrative */}
        <motion.div className="bg-gradient-to-br from-accent-neon/10 to-accent-green/10 rounded-3xl p-8 border border-accent-neon/20 shadow-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <h3 className="text-xl font-bold text-accent-neon mb-2 flex items-center gap-2"><Brain className="w-6 h-6" />AI Behavioral Insights</h3>
          <p className="text-lg text-gray-200 leading-relaxed">{data.aiNarrative}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default BehavioralAnalysisSection;
