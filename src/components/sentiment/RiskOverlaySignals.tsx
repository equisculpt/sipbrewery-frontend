/*
  RiskOverlaySignals.tsx
  Behavioral Risk Overlay Signals - SIP Brewery
  --------------------------------------------
  - Powered by ASI backend: /asi/process (type: 'risk_overlay_signals')
  - Visualizes risk overlays on portfolio/assets with premium UI
*/

'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, BarChart3, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

interface RiskOverlay {
  id: string;
  asset: string;
  overlay: string;
  risk: string;
  rationale: string;
}

const demoOverlays: RiskOverlay[] = [
  {
    id: '1',
    asset: 'RELIANCE',
    overlay: 'Behavioral Risk Warning',
    risk: 'High',
    rationale: 'Panic risk and crowding detected.'
  },
  {
    id: '2',
    asset: 'ICICIBANK',
    overlay: 'Low Behavioral Risk',
    risk: 'Low',
    rationale: 'Contrarian flows, disciplined trading.'
  },
  {
    id: '3',
    asset: 'INFY',
    overlay: 'Moderate Behavioral Risk',
    risk: 'Medium',
    rationale: 'Mixed signals, some crowding.'
  }
];

const RiskOverlaySignals = () => {
  const [overlays, setOverlays] = useState<RiskOverlay[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/asi/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'risk_overlay_signals',
        data: {},
        parameters: {}
      })
    })
      .then(async res => {
        if (!res.ok) throw new Error('ASI backend error');
        const result = await res.json();
        setOverlays(result.result || result.overlays);
      })
      .catch(err => {
        console.error('❌ Risk Overlay Signals ASI error:', err);
        setOverlays(demoOverlays);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-gradient-to-br from-black/90 to-purple-900/80">
      <div className="container-custom">
        <motion.h2 className="display-title text-white mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Behavioral <span className="text-gradient">Risk Overlay Signals</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(loading ? demoOverlays : overlays).map(overlay => (
            <motion.div key={overlay.id} className={`rounded-2xl p-6 border shadow-xl bg-dark-800/80 border-accent-neon/20 flex flex-col gap-2`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-8 h-8 text-accent-neon" />
                <span className="font-bold text-lg text-white">{overlay.asset}</span>
              </div>
              <div className="text-gray-200 text-md mb-1">{overlay.overlay}</div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${overlay.risk === 'High' ? 'bg-red-500/30 text-red-300' : overlay.risk === 'Medium' ? 'bg-orange-400/30 text-orange-200' : 'bg-accent-neon/20 text-accent-neon'}`}>{overlay.risk} Risk</div>
              <div className="text-xs text-gray-400 mt-2">{overlay.rationale}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RiskOverlaySignals;
