/*
  ConversationalAIEnhancements.tsx
  Conversational AI Enhancements - SIP Brewery
  -------------------------------------------
  - Powered by ASI backend: /asi/process (type: 'conversational_ai_enhancements')
  - Provides advanced conversational insights, context-aware responses, and natural language explanations
  - Premium chat UI enhancements
*/

'use client';

import React, { useState, useEffect } from 'react';
import { Brain, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ConversationalInsight {
  id: string;
  message: string;
  context: string;
  aiResponse: string;
  confidence: number;
}

const demoInsights: ConversationalInsight[] = [
  {
    id: '1',
    message: 'What is the behavioral risk in banking stocks?',
    context: 'Banking sector behavioral analytics',
    aiResponse: 'Current behavioral risk in banking stocks is low due to disciplined institutional flows and minimal crowding.',
    confidence: 94
  },
  {
    id: '2',
    message: 'Should I buy more ICICIBANK?',
    context: 'Trade recommendation',
    aiResponse: 'Contrarian signals are strong for ICICIBANK. Buying more could add alpha, but monitor crowding risk.',
    confidence: 89
  },
  {
    id: '3',
    message: 'Explain the last alpha signal.',
    context: 'Alpha signal explainability',
    aiResponse: 'Alpha signal was generated due to rising contrarian activity and low behavioral risk in the asset.',
    confidence: 92
  }
];

const ConversationalAIEnhancements = () => {
  const [insights, setInsights] = useState<ConversationalInsight[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/asi/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'conversational_ai_enhancements',
        data: {},
        parameters: {}
      })
    })
      .then(async res => {
        if (!res.ok) throw new Error('ASI backend error');
        const result = await res.json();
        setInsights(result.result || result.insights);
      })
      .catch(err => {
        console.error('❌ Conversational AI Enhancements ASI error:', err);
        setInsights(demoInsights);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-gradient-to-br from-black/90 to-purple-900/80">
      <div className="container-custom">
        <motion.h2 className="display-title text-white mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Conversational <span className="text-gradient">AI Enhancements</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(loading ? demoInsights : insights).map(insight => (
            <motion.div key={insight.id} className={`rounded-2xl p-6 border shadow-xl bg-dark-800/80 border-accent-neon/20 flex flex-col gap-2`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="w-8 h-8 text-accent-neon" />
                <span className="font-bold text-lg text-white">{insight.context}</span>
              </div>
              <div className="text-gray-200 text-md mb-1">User: {insight.message}</div>
              <div className="text-accent-neon text-md mb-1">AI: {insight.aiResponse}</div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-accent-neon/20 text-accent-neon">Confidence: {insight.confidence}%</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConversationalAIEnhancements;
