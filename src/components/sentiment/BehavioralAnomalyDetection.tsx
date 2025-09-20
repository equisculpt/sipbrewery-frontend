/*
  BehavioralAnomalyDetection.tsx
  Predictive Behavioral Anomaly Detection - SIP Brewery
  ----------------------------------------------------
  - Powered by ASI backend: /asi/process (type: 'behavioral_anomaly')
  - Detects and forecasts behavioral anomalies (panic, euphoria, regime shifts)
  - Visualizes anomaly timeline and predictive risk
*/

'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Zap, TrendingUp, TrendingDown, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnomalyEvent {
  timestamp: number;
  type: 'panic' | 'euphoria' | 'regime_shift' | 'volatility_spike' | 'alpha_opportunity';
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  predicted: boolean;
}

const demoAnomalies: AnomalyEvent[] = [
  {
    timestamp: Date.now() - 3600000 * 6,
    type: 'regime_shift',
    description: 'Market regime shift detected: crowd behavior changing.',
    severity: 'Medium',
    predicted: false
  },
  {
    timestamp: Date.now() - 3600000 * 3,
    type: 'volatility_spike',
    description: 'Predicted volatility spike in next 2 hours.',
    severity: 'High',
    predicted: true
  },
  {
    timestamp: Date.now() - 3600000,
    type: 'panic',
    description: 'Panic event detected: retail selling surge.',
    severity: 'High',
    predicted: false
  },
  {
    timestamp: Date.now(),
    type: 'alpha_opportunity',
    description: 'Alpha opportunity forecast: contrarian signal rising.',
    severity: 'Low',
    predicted: true
  }
];

const iconMap = {
  panic: AlertTriangle,
  euphoria: Zap,
  regime_shift: Brain,
  volatility_spike: TrendingDown,
  alpha_opportunity: TrendingUp
};

const BehavioralAnomalyDetection = () => {
  const [anomalies, setAnomalies] = useState<AnomalyEvent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/asi/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'behavioral_anomaly',
        data: {},
        parameters: {}
      })
    })
      .then(async res => {
        if (!res.ok) throw new Error('ASI backend error');
        const result = await res.json();
        setAnomalies(result.result || result.anomalies);
      })
      .catch(err => {
        console.error('❌ Behavioral Anomaly ASI error:', err);
        setAnomalies(demoAnomalies);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-gradient-to-br from-purple-900/80 to-black/90">
      <div className="container-custom">
        <motion.h2 className="display-title text-white mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Predictive <span className="text-gradient">Behavioral Anomaly Detection</span>
        </motion.h2>
        <div className="flex flex-col gap-6">
          {(loading ? demoAnomalies : anomalies).map((anomaly, idx) => {
            const Icon = iconMap[anomaly.type] || AlertTriangle;
            return (
              <motion.div key={idx} className={`rounded-2xl p-6 border shadow-xl bg-dark-800/80 border-accent-neon/20 flex flex-col gap-2`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <div className="flex items-center gap-3 mb-2">
                  <Icon className={`w-8 h-8 ${anomaly.severity === 'High' ? 'text-red-400' : anomaly.severity === 'Medium' ? 'text-orange-400' : 'text-accent-neon'}`} />
                  <span className={`font-bold text-lg ${anomaly.severity === 'High' ? 'text-red-400' : anomaly.severity === 'Medium' ? 'text-orange-400' : 'text-accent-neon'}`}>{anomaly.type.replace('_', ' ').toUpperCase()}</span>
                  {anomaly.predicted && <span className="ml-2 px-2 py-1 rounded-full text-xs bg-accent-neon/20 text-accent-neon font-bold">Predicted</span>}
                </div>
                <div className="text-gray-200 text-md mb-1">{anomaly.description}</div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${anomaly.severity === 'High' ? 'bg-red-500/30 text-red-300' : anomaly.severity === 'Medium' ? 'bg-orange-400/30 text-orange-200' : 'bg-accent-neon/20 text-accent-neon'}`}>{anomaly.severity} Severity</div>
                <div className="text-xs text-gray-400 mt-2">{new Date(anomaly.timestamp).toLocaleString()}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BehavioralAnomalyDetection;
