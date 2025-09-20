/*
  BehavioralHeatmap.tsx
  Behavioral Heatmap Visualization - SIP Brewery
  ---------------------------------------------
  - Powered by ASI backend: /asi/process (type: 'behavioral_heatmap')
  - Visualizes behavioral risk, alpha, bias, and crowding across sectors/assets/time
  - Interactive heatmap with premium UI
*/

'use client';

import React, { useState, useEffect } from 'react';
import { Brain, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeatmapCell {
  sector: string;
  asset: string;
  timeframe: string;
  risk: number; // 0-100
  alpha: number; // -100 to 100
  crowding: number; // 0-100
}

const demoHeatmap: HeatmapCell[] = [
  { sector: 'Banking', asset: 'HDFCBANK', timeframe: '1D', risk: 22, alpha: 45, crowding: 14 },
  { sector: 'IT', asset: 'INFY', timeframe: '1D', risk: 55, alpha: -10, crowding: 62 },
  { sector: 'Energy', asset: 'RELIANCE', timeframe: '1D', risk: 38, alpha: 30, crowding: 29 },
  { sector: 'FMCG', asset: 'HINDUNILVR', timeframe: '1D', risk: 18, alpha: 67, crowding: 8 },
  { sector: 'Banking', asset: 'ICICIBANK', timeframe: '1D', risk: 41, alpha: 12, crowding: 33 },
  { sector: 'IT', asset: 'TCS', timeframe: '1D', risk: 63, alpha: -22, crowding: 80 }
];

const getCellColor = (risk: number, alpha: number, crowding: number) => {
  if (risk > 60) return 'bg-red-500/60';
  if (alpha > 50) return 'bg-green-400/60';
  if (crowding > 60) return 'bg-orange-400/60';
  return 'bg-dark-800/80';
};

const BehavioralHeatmap = () => {
  const [heatmap, setHeatmap] = useState<HeatmapCell[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/asi/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'behavioral_heatmap',
        data: {},
        parameters: {}
      })
    })
      .then(async res => {
        if (!res.ok) throw new Error('ASI backend error');
        const result = await res.json();
        setHeatmap(result.result || result.heatmap);
      })
      .catch(err => {
        console.error('❌ Behavioral Heatmap ASI error:', err);
        setHeatmap(demoHeatmap);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-gradient-to-br from-black/90 to-purple-900/80">
      <div className="container-custom">
        <motion.h2 className="display-title text-white mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Behavioral <span className="text-gradient">Heatmap</span>
        </motion.h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-left text-accent-neon">Sector</th>
                <th className="p-3 text-left text-accent-neon">Asset</th>
                <th className="p-3 text-left text-accent-neon">Risk</th>
                <th className="p-3 text-left text-accent-neon">Alpha</th>
                <th className="p-3 text-left text-accent-neon">Crowding</th>
              </tr>
            </thead>
            <tbody>
              {(loading ? demoHeatmap : heatmap).map((cell, idx) => (
                <tr key={idx} className={getCellColor(cell.risk, cell.alpha, cell.crowding)}>
                  <td className="p-3 text-white font-semibold">{cell.sector}</td>
                  <td className="p-3 text-white">{cell.asset}</td>
                  <td className="p-3 text-white">{cell.risk}</td>
                  <td className="p-3 text-white">{cell.alpha}</td>
                  <td className="p-3 text-white">{cell.crowding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BehavioralHeatmap;
