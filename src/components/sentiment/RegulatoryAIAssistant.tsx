/*
  RegulatoryAIAssistant.tsx
  Regulatory Compliance AI Assistant - SIP Brewery
  -----------------------------------------------
  - Powered by ASI backend: /asi/process (type: 'regulatory_ai_assistant')
  - Provides real-time compliance checks, regulatory alerts, and AI-powered explanations
  - Premium compliance dashboard and alert cards
*/

'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface RegulatoryAlert {
  id: string;
  regulation: string;
  impact: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
}

const demoAlerts: RegulatoryAlert[] = [
  {
    id: '1',
    regulation: 'SEBI Circular 2025-07',
    impact: 'Portfolio rebalancing required for compliance.',
    description: 'New SEBI rules on sector allocation exceed current portfolio weights.',
    severity: 'High'
  },
  {
    id: '2',
    regulation: 'FATCA',
    impact: 'Additional KYC required for US investors.',
    description: 'FATCA compliance check flagged incomplete KYC for 3 investors.',
    severity: 'Medium'
  }
];

const RegulatoryAIAssistant = () => {
  const [alerts, setAlerts] = useState<RegulatoryAlert[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/asi/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'regulatory_ai_assistant',
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
        console.error('❌ Regulatory AI Assistant ASI error:', err);
        setAlerts(demoAlerts);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-gradient-to-br from-black/90 to-purple-900/80">
      <div className="container-custom">
        <motion.h2 className="display-title text-white mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Regulatory <span className="text-gradient">AI Assistant</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(loading ? demoAlerts : alerts).map(alert => (
            <motion.div key={alert.id} className={`rounded-2xl p-6 border shadow-xl bg-dark-800/80 border-accent-neon/20 flex flex-col gap-2`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-8 h-8 text-accent-neon" />
                <span className="font-bold text-lg text-white">{alert.regulation}</span>
              </div>
              <div className="text-red-400 font-bold mb-1">{alert.impact}</div>
              <div className="text-gray-200 text-md mb-1">{alert.description}</div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${alert.severity === 'High' ? 'bg-red-500/30 text-red-300' : alert.severity === 'Medium' ? 'bg-orange-400/30 text-orange-200' : 'bg-accent-neon/20 text-accent-neon'}`}>{alert.severity} Severity</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegulatoryAIAssistant;
