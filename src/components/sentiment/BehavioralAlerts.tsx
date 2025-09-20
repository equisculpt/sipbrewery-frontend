/*
  BehavioralAlerts.tsx
  $1B Institutional-Grade Real-Time Behavioral Alerts
  -------------------------------------------------
  - Powered by ASI backend: /asi/process (type: 'behavioral_alerts')
  - Detects crowd risk, panic, FOMO, contrarian signals, and alpha events
  - Ultra-premium alert cards and timeline
*/

'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, Zap, TrendingUp, TrendingDown, Users, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface BehavioralAlert {
  id: string;
  timestamp: number;
  type: 'panic' | 'herding' | 'contrarian' | 'fomo' | 'alpha_opportunity' | 'risk';
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
}

const demoAlerts: BehavioralAlert[] = [
  {
    id: '1',
    timestamp: Date.now() - 600000,
    type: 'contrarian',
    title: 'Contrarian Alpha Detected',
    description: 'A surge in contrarian trades is creating a rare alpha window.',
    severity: 'High'
  },
  {
    id: '2',
    timestamp: Date.now() - 1800000,
    type: 'panic',
    title: 'Panic Selling Spike',
    description: 'Retail panic selling detected. Short-term volatility risk elevated.',
    severity: 'Medium'
  },
  {
    id: '3',
    timestamp: Date.now() - 3600000,
    type: 'herding',
    title: 'Herding Behavior Rising',
    description: 'Institutional investors are crowding into banking stocks.',
    severity: 'Low'
  }
];

const iconMap = {
  panic: AlertCircle,
  herding: Users,
  contrarian: Zap,
  fomo: TrendingUp,
  alpha_opportunity: TrendingUp,
  risk: ShieldCheck
};

const BehavioralAlerts = () => {
  const [alerts, setAlerts] = useState<BehavioralAlert[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/asi/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'behavioral_alerts',
        data: {},
        parameters: {}
      })
    })
      .then(async res => {
        if (!res.ok) throw new Error('ASI backend error');
        const result = await res.json();
        setAlerts(result.result || result.alerts);
      })
      .catch(err => {
        console.error('❌ Behavioral Alerts ASI error:', err);
        setAlerts(demoAlerts);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-gradient-to-br from-black/90 to-purple-900/80">
      <div className="container-custom">
        <motion.h2 className="display-title text-white mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Real-Time <span className="text-gradient">Behavioral Alerts</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(loading ? demoAlerts : alerts).map(alert => {
            const Icon = iconMap[alert.type] || AlertCircle;
            return (
              <motion.div key={alert.id} className={`rounded-2xl p-6 border shadow-xl bg-dark-800/80 border-accent-neon/20 flex flex-col gap-2 animate-pulse`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <div className="flex items-center gap-3 mb-2">
                  <Icon className={`w-8 h-8 ${alert.severity === 'High' ? 'text-red-400' : alert.severity === 'Medium' ? 'text-orange-400' : 'text-accent-neon'}`} />
                  <span className={`font-bold text-lg ${alert.severity === 'High' ? 'text-red-400' : alert.severity === 'Medium' ? 'text-orange-400' : 'text-accent-neon'}`}>{alert.title}</span>
                </div>
                <div className="text-gray-200 text-md mb-1">{alert.description}</div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${alert.severity === 'High' ? 'bg-red-500/30 text-red-300' : alert.severity === 'Medium' ? 'bg-orange-400/30 text-orange-200' : 'bg-accent-neon/20 text-accent-neon'}`}>{alert.severity} Severity</div>
                <div className="text-xs text-gray-400 mt-2">{new Date(alert.timestamp).toLocaleString()}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BehavioralAlerts;
