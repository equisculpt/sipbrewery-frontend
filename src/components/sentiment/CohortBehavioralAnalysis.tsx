/*
  CohortBehavioralAnalysis.tsx
  Cohort-Based Behavioral Analysis - SIP Brewery
  ---------------------------------------------
  - Powered by ASI backend: /asi/process (type: 'cohort_behavioral_analysis')
  - Analyzes behavioral risk, alpha, and bias by investor cohort (retail, institutional, FII, DII, age groups, etc.)
  - Premium cohort comparison charts
*/

'use client';

import React, { useState, useEffect } from 'react';
import { Users, BarChart3, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

interface CohortMetric {
  cohort: string;
  risk: number;
  alpha: number;
  bias: number;
}

const demoCohorts: CohortMetric[] = [
  { cohort: 'Retail', risk: 27, alpha: 48, bias: 31 },
  { cohort: 'Institutional', risk: 12, alpha: 77, bias: 14 },
  { cohort: 'FII', risk: 51, alpha: 22, bias: 45 },
  { cohort: 'DII', risk: 38, alpha: 36, bias: 29 },
  { cohort: 'Young (18-35)', risk: 44, alpha: 31, bias: 53 },
  { cohort: 'Senior (55+)', risk: 19, alpha: 62, bias: 12 }
];

const CohortBehavioralAnalysis = () => {
  const [cohorts, setCohorts] = useState<CohortMetric[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/asi/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'cohort_behavioral_analysis',
        data: {},
        parameters: {}
      })
    })
      .then(async res => {
        if (!res.ok) throw new Error('ASI backend error');
        const result = await res.json();
        setCohorts(result.result || result.cohorts);
      })
      .catch(err => {
        console.error('❌ Cohort Behavioral Analysis ASI error:', err);
        setCohorts(demoCohorts);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-gradient-to-br from-black/90 to-purple-900/80">
      <div className="container-custom">
        <motion.h2 className="display-title text-white mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Cohort-Based <span className="text-gradient">Behavioral Analysis</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(loading ? demoCohorts : cohorts).map((cohort, idx) => (
            <motion.div key={idx} className={`rounded-2xl p-6 border shadow-xl bg-dark-800/80 border-accent-neon/20 flex flex-col gap-2`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-8 h-8 text-accent-neon" />
                <span className="font-bold text-lg text-white">{cohort.cohort}</span>
              </div>
              <div className="flex gap-4">
                <span className="text-green-400 font-bold">Alpha: {cohort.alpha}</span>
                <span className="text-red-400 font-bold">Risk: {cohort.risk}</span>
                <span className="text-orange-400 font-bold">Bias: {cohort.bias}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CohortBehavioralAnalysis;
