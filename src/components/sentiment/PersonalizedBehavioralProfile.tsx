/*
  PersonalizedBehavioralProfile.tsx
  $1B User-Centric Behavioral Profile - SIP Brewery
  -----------------------------------------------
  - Powered by ASI backend: /asi/process (type: 'behavioral_profile')
  - Delivers personalized bias, archetype, alpha, and coaching
  - Ultra-premium profile cards, radar chart, and AI coaching
*/

'use client';

import React, { useState, useEffect } from 'react';
import { UserCheck, Zap, BarChart3, AlertTriangle, Brain, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface UserBias {
  type: string;
  value: number; // 0-100
  label: string;
  risk: string;
}

interface UserArchetype {
  name: string;
  description: string;
  icon: string;
  score: number;
}

interface BehavioralProfileData {
  alphaScore: number;
  alphaLabel: string;
  biases: UserBias[];
  archetype: UserArchetype;
  aiAdvice: string;
}

const demoProfile: BehavioralProfileData = {
  alphaScore: 77,
  alphaLabel: 'Above Average Behavioral Alpha',
  biases: [
    { type: 'Loss Aversion', value: 38, label: 'Moderate', risk: 'Watch for panic selling' },
    { type: 'Overconfidence', value: 19, label: 'Low', risk: 'Disciplined' },
    { type: 'Recency Bias', value: 29, label: 'Mild', risk: 'Short-term focus' }
  ],
  archetype: {
    name: 'Disciplined Contrarian',
    description: 'You buy when others panic and stay calm in volatility.',
    icon: 'Zap',
    score: 91
  },
  aiAdvice: 'Maintain your contrarian discipline, but review your stop-losses to avoid rare panic events. Consider rebalancing if crowding signals rise.'
};

const PersonalizedBehavioralProfile = () => {
  const [profile, setProfile] = useState<BehavioralProfileData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/asi/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'behavioral_profile',
        data: {},
        parameters: {}
      })
    })
      .then(async res => {
        if (!res.ok) throw new Error('ASI backend error');
        const result = await res.json();
        setProfile(result.result || result);
      })
      .catch(err => {
        console.error('❌ Behavioral Profile ASI error:', err);
        setProfile(demoProfile);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !profile) {
    return (
      <section className="section-padding bg-gradient-to-br from-black/90 to-purple-900/80 flex items-center justify-center min-h-[400px]">
        <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 1 }}>
          <div className="flex flex-col items-center gap-4">
            <UserCheck className="w-16 h-16 text-accent-neon animate-pulse" />
            <span className="text-2xl text-white font-bold animate-pulse">Building Your Behavioral Profile...</span>
          </div>
        </motion.div>
      </section>
    );
  }

  const Icon = { Zap, BarChart3, AlertTriangle }[profile.archetype.icon as keyof typeof import('lucide-react')] || Star;

  return (
    <section className="section-padding bg-gradient-to-br from-black/90 to-purple-900/80">
      <div className="container-custom">
        <motion.h2 className="display-title text-white mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Your <span className="text-gradient">Behavioral Profile</span>
        </motion.h2>
        {/* Alpha Card */}
        <motion.div className="mb-8 flex flex-wrap gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="bg-gradient-to-r from-accent-neon/20 to-accent-green/10 rounded-3xl p-8 flex-1 min-w-[320px] shadow-xl border border-accent-neon/30">
            <div className="flex items-center gap-4 mb-2">
              <Zap className="w-8 h-8 text-accent-neon" />
              <span className="text-3xl font-bold text-accent-neon">{profile.alphaScore}</span>
              <span className="text-lg text-white font-semibold">{profile.alphaLabel}</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-accent-neon/10 to-accent-green/10 rounded-3xl p-8 flex-1 min-w-[320px] shadow-xl border border-accent-neon/20 flex flex-col items-center">
            {Icon ? <Icon className="w-10 h-10 mb-2 text-accent-neon" /> : <UserCheck className="w-10 h-10 mb-2 text-accent-neon" />}
            <div className="text-2xl font-bold text-white mb-1">{profile.archetype.name}</div>
            <div className="text-gray-200 mb-2 text-center">{profile.archetype.description}</div>
            <div className="text-lg font-semibold text-accent-neon">Score: {profile.archetype.score}</div>
          </div>
        </motion.div>
        {/* Biases */}
        <motion.div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {profile.biases.map((bias, idx) => (
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
        {/* AI Advice */}
        <motion.div className="bg-gradient-to-br from-accent-neon/10 to-accent-green/10 rounded-3xl p-8 border border-accent-neon/20 shadow-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <h3 className="text-xl font-bold text-accent-neon mb-2 flex items-center gap-2"><Brain className="w-6 h-6" />AI Behavioral Coaching</h3>
          <p className="text-lg text-gray-200 leading-relaxed">{profile.aiAdvice}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalizedBehavioralProfile;
