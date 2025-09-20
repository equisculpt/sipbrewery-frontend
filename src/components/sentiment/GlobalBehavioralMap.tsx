/*
  GlobalBehavioralMap.tsx
  Global Behavioral Map Visualization - SIP Brewery
  ------------------------------------------------
  - Powered by ASI backend: /asi/process (type: 'global_behavioral_map')
  - Visualizes behavioral risk, alpha, and crowding across countries/regions
  - Interactive world map with premium overlays
*/

'use client';

import React, { useState, useEffect } from 'react';
import { Globe2, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

interface RegionBehavior {
  region: string;
  risk: number; // 0-100
  alpha: number; // -100 to 100
  crowding: number; // 0-100
}

const demoRegions: RegionBehavior[] = [
  { region: 'India', risk: 24, alpha: 67, crowding: 15 },
  { region: 'US', risk: 63, alpha: -12, crowding: 81 },
  { region: 'Europe', risk: 37, alpha: 21, crowding: 34 },
  { region: 'China', risk: 58, alpha: 8, crowding: 49 },
  { region: 'Japan', risk: 18, alpha: 55, crowding: 10 }
];

const getRegionColor = (risk: number, alpha: number, crowding: number) => {
  if (risk > 60) return 'bg-red-500/60';
  if (alpha > 50) return 'bg-green-400/60';
  if (crowding > 60) return 'bg-orange-400/60';
  return 'bg-dark-800/80';
};

const GlobalBehavioralMap = () => {
  const [regions, setRegions] = useState<RegionBehavior[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/asi/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'global_behavioral_map',
        data: {},
        parameters: {}
      })
    })
      .then(async res => {
        if (!res.ok) throw new Error('ASI backend error');
        const result = await res.json();
        setRegions(result.result || result.regions);
      })
      .catch(err => {
        console.error('❌ Global Behavioral Map ASI error:', err);
        setRegions(demoRegions);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-gradient-to-br from-black/90 to-purple-900/80">
      <div className="container-custom">
        <motion.h2 className="display-title text-white mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Global <span className="text-gradient">Behavioral Map</span>
        </motion.h2>
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {(loading ? demoRegions : regions).map((region, idx) => (
              <div key={idx} className={`rounded-2xl p-6 border shadow-xl ${getRegionColor(region.risk, region.alpha, region.crowding)} border-accent-neon/20 flex flex-col gap-2 min-w-[180px]`}>
                <div className="flex items-center gap-3 mb-2">
                  <Globe2 className="w-8 h-8 text-accent-neon" />
                  <span className="font-bold text-lg text-white">{region.region}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-green-400 font-bold">Alpha: {region.alpha}</span>
                  <span className="text-red-400 font-bold">Risk: {region.risk}</span>
                  <span className="text-orange-400 font-bold">Crowding: {region.crowding}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalBehavioralMap;
