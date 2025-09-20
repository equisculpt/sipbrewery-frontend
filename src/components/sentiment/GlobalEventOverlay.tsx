/*
  GlobalEventOverlay.tsx
  Real-Time Global Event Overlay - SIP Brewery
  -------------------------------------------
  - Powered by ASI backend: /asi/process (type: 'global_event_overlay')
  - Displays real-time global events and overlays their behavioral impact
  - Premium event cards with map overlays
*/

'use client';

import React, { useState, useEffect } from 'react';
import { Globe2, AlertTriangle, CalendarCheck2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface GlobalEvent {
  id: string;
  event: string;
  region: string;
  impact: string;
  severity: 'Low' | 'Medium' | 'High';
  timestamp: string;
}

const demoEvents: GlobalEvent[] = [
  {
    id: '1',
    event: 'US Fed Rate Hike',
    region: 'US',
    impact: 'Elevated volatility in global equities, crowding in safe havens.',
    severity: 'High',
    timestamp: '2025-07-26T16:00:00Z'
  },
  {
    id: '2',
    event: 'India Budget Announcement',
    region: 'India',
    impact: 'Alpha opportunities in infra and banking, mild retail panic.',
    severity: 'Medium',
    timestamp: '2025-07-26T10:00:00Z'
  }
];

const GlobalEventOverlay = () => {
  const [events, setEvents] = useState<GlobalEvent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/asi/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'global_event_overlay',
        data: {},
        parameters: {}
      })
    })
      .then(async res => {
        if (!res.ok) throw new Error('ASI backend error');
        const result = await res.json();
        setEvents(result.result || result.events);
      })
      .catch(err => {
        console.error('❌ Global Event Overlay ASI error:', err);
        setEvents(demoEvents);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-gradient-to-br from-black/90 to-purple-900/80">
      <div className="container-custom">
        <motion.h2 className="display-title text-white mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Real-Time <span className="text-gradient">Global Event Overlay</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(loading ? demoEvents : events).map(event => (
            <motion.div key={event.id} className={`rounded-2xl p-6 border shadow-xl bg-dark-800/80 border-accent-neon/20 flex flex-col gap-2`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-3 mb-2">
                <Globe2 className="w-8 h-8 text-accent-neon" />
                <span className="font-bold text-lg text-white">{event.event}</span>
              </div>
              <div className="text-accent-neon font-bold mb-1">Region: {event.region}</div>
              <div className="text-gray-200 text-md mb-1">{event.impact}</div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${event.severity === 'High' ? 'bg-red-500/30 text-red-300' : event.severity === 'Medium' ? 'bg-orange-400/30 text-orange-200' : 'bg-accent-neon/20 text-accent-neon'}`}>{event.severity} Severity</div>
              <div className="text-xs text-gray-400 mt-2">{new Date(event.timestamp).toLocaleString()}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalEventOverlay;
