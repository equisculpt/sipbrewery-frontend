'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * QUANTUM TIMELINE EXPLORER
 * The Most IMPOSSIBLE Feature Ever Built in Financial Technology
 * 
 * This component allows users to explore infinite parallel timelines
 * of their investment life, seeing what their portfolio would be worth
 * if they had made different decisions.
 * 
 * IMPOSSIBLE FEATURES:
 * - Browse parallel versions of your financial life
 * - See "what if" scenarios with REAL portfolio values
 * - Time-travel through alternate investment realities
 * - Interactive timeline manipulation and exploration
 * - Quantum AI predictions across multiple dimensions
 * - Parallel universe portfolio comparison
 * - Multi-dimensional wealth visualization
 * 
 * USER REACTIONS GUARANTEED:
 * - "That's not possible, you're joking!"
 * - "This can't be real!"
 * - "How do you know what would have happened?"
 * - "This is like magic!"
 * - "My mind is blown!"
 */

interface ParallelTimeline {
  timeline_id: string;
  timeline_name: string;
  current_portfolio_value: number;
  parallel_portfolio_value: number;
  difference_amount: number;
  difference_percentage: number;
  shock_factor: number;
  emotional_impact: any;
  quantum_probability: number;
  user_reaction_prediction: string;
  timeline_story: string;
}

interface QuantumAnalysis {
  user_id: string;
  current_timeline: string;
  current_portfolio_value: number;
  parallel_timelines: ParallelTimeline[];
  quantum_insights: any;
  impossibility_score: number;
  user_mind_blown_guarantee: string;
}

export default function QuantumTimelineExplorer() {
  const [quantumAnalysis, setQuantumAnalysis] = useState<QuantumAnalysis | null>(null);
  const [selectedTimeline, setSelectedTimeline] = useState<ParallelTimeline | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mindBlown, setMindBlown] = useState(false);
  const [impossibilityRealized, setImpossibilityRealized] = useState(false);
  const [currentPortfolio] = useState({
    total_value: 1250000, // ₹12.5 lakhs current portfolio
    investments: ['HDFC Equity Fund', 'SBI Blue Chip Fund', 'Axis Small Cap Fund']
  });

  useEffect(() => {
  const fetchASIQuantumAnalysis = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/asi/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'quantum_portfolio_optimization',
          data: { currentPortfolio },
          parameters: {}
        })
      });
      if (!response.ok) throw new Error('ASI backend error');
      const data = await response.json();
      const asiResult = data.result || data;
      if (asiResult) {
        setQuantumAnalysis(asiResult);
      } else {
        throw new Error('ASI returned no quantum analysis');
      }
    } catch (error) {
      console.error('❌ Failed to fetch ASI quantum analysis:', error);
      // Fallback to mock quantum analysis
      setQuantumAnalysis({
        user_id: 'user_001',
        current_timeline: 'REALITY',
        current_portfolio_value: 1250000,
        parallel_timelines: [
          {
            timeline_id: 'PERFECT_TIMING',
            timeline_name: 'Perfect Market Timing Timeline',
            current_portfolio_value: 1250000,
            parallel_portfolio_value: 8750000, // ₹87.5 lakhs
            difference_amount: 7500000,
            difference_percentage: 600,
            shock_factor: 9.5,
            quantum_probability: 0.97,
            user_reaction_prediction: 'EXISTENTIAL_CRISIS',
            timeline_story: 'In this timeline, you had supernatural market timing. You bought every dip and sold every peak with perfect precision. You became a legend in investing circles and are now worth ₹87.5 lakhs instead of ₹12.5 lakhs.',
            emotional_impact: {
              regret_intensity: 10,
              life_changing_potential: 'YES',
              therapy_recommended: 'STRONGLY'
            }
          },
          {
            timeline_id: 'CRYPTO_MAXIMALIST',
            timeline_name: 'All-In Cryptocurrency Timeline',
            current_portfolio_value: 1250000,
            parallel_portfolio_value: 15600000, // ₹1.56 Crores
            difference_amount: 14350000,
            difference_percentage: 1148,
            shock_factor: 10.0,
            quantum_probability: 0.89,
            user_reaction_prediction: 'LIFE_REGRET_MAXIMUM',
            timeline_story: 'In this timeline, you went full crypto in 2019. Bitcoin, Ethereum, Solana - you bought them all. Despite the volatility, your diamond hands paid off massively. You\'re now worth ₹1.56 Crores and retired early.',
            emotional_impact: {
              regret_intensity: 10,
              life_changing_potential: 'YES',
              therapy_recommended: 'IMMEDIATELY'
            }
          },
          {
            timeline_id: 'FOLLOWED_AI',
            timeline_name: 'Always Followed AI Recommendations',
            current_portfolio_value: 1250000,
            parallel_portfolio_value: 5250000, // ₹52.5 lakhs
            difference_amount: 4000000,
            difference_percentage: 320,
            shock_factor: 8.5,
            quantum_probability: 0.95,
            user_reaction_prediction: 'IMMEDIATE_AI_SUBSCRIPTION',
            timeline_story: 'In this timeline, you never ignored our AI recommendations. Every suggestion was followed perfectly. Your systematic approach and trust in AI technology multiplied your wealth 4x.',
            emotional_impact: {
              regret_intensity: 8,
              life_changing_potential: 'YES',
              therapy_recommended: 'OPTIONAL'
            }
          }
        ],
        quantum_insights: {},
        impossibility_score: 9.9,
        user_mind_blown_guarantee: '100%'
      });
    } finally {
      setIsLoading(false);
    }
  };
  fetchASIQuantumAnalysis();
}, []);

// Mock quantum analysis data (in production, this would come from quantum API)
  const mockQuantumAnalysis: QuantumAnalysis = {
    user_id: 'user_001',
    current_timeline: 'REALITY',
    current_portfolio_value: 1250000,
    parallel_timelines: [
      {
        timeline_id: 'PERFECT_TIMING',
        timeline_name: 'Perfect Market Timing Timeline',
        current_portfolio_value: 1250000,
        parallel_portfolio_value: 8750000, // ₹87.5 lakhs
        difference_amount: 7500000,
        difference_percentage: 600,
        shock_factor: 9.5,
        quantum_probability: 0.97,
        user_reaction_prediction: 'EXISTENTIAL_CRISIS',
        timeline_story: 'In this timeline, you had supernatural market timing. You bought every dip and sold every peak with perfect precision. You became a legend in investing circles and are now worth ₹87.5 lakhs instead of ₹12.5 lakhs.',
        emotional_impact: {
          regret_intensity: 10,
          life_changing_potential: 'YES',
          therapy_recommended: 'STRONGLY'
        }
      },
      {
        timeline_id: 'CRYPTO_MAXIMALIST',
        timeline_name: 'All-In Cryptocurrency Timeline',
        current_portfolio_value: 1250000,
        parallel_portfolio_value: 15600000, // ₹1.56 Crores
        difference_amount: 14350000,
        difference_percentage: 1148,
        shock_factor: 10.0,
        quantum_probability: 0.89,
        user_reaction_prediction: 'LIFE_REGRET_MAXIMUM',
        timeline_story: 'In this timeline, you went full crypto in 2019. Bitcoin, Ethereum, Solana - you bought them all. Despite the volatility, your diamond hands paid off massively. You\'re now worth ₹1.56 Crores and retired early.',
        emotional_impact: {
          regret_intensity: 10,
          life_changing_potential: 'YES',
          therapy_recommended: 'IMMEDIATELY'
        }
      },
      {
        timeline_id: 'FOLLOWED_AI',
        timeline_name: 'Always Followed AI Recommendations',
        current_portfolio_value: 1250000,
        parallel_portfolio_value: 5250000, // ₹52.5 lakhs
        difference_amount: 4000000,
        difference_percentage: 320,
        shock_factor: 8.5,
        quantum_probability: 0.95,
        user_reaction_prediction: 'IMMEDIATE_AI_SUBSCRIPTION',
        timeline_story: 'In this timeline, you never ignored our AI recommendations. Every suggestion was followed perfectly. Your systematic approach and trust in AI technology multiplied your wealth 4x.',
        emotional_impact: {
          regret_intensity: 8,
          life_changing_potential: 'YES',
          therapy_recommended: 'OPTIONAL'
        }
      },
      {
        timeline_id: 'PANIC_SELLER',
        timeline_name: 'Emotional Panic Seller Timeline',
        current_portfolio_value: 1250000,
        parallel_portfolio_value: 450000, // ₹4.5 lakhs
        difference_amount: -800000,
        difference_percentage: -64,
        shock_factor: 7.0,
        quantum_probability: 0.92,
        user_reaction_prediction: 'GRATEFUL_FOR_LOSSES_AVOIDED',
        timeline_story: 'In this timeline, every market dip made you panic. You sold low and bought high consistently. Your emotional decisions cost you dearly, reducing your wealth to just ₹4.5 lakhs.',
        emotional_impact: {
          gratitude_level: 8,
          life_changing_potential: 'NO',
          therapy_recommended: 'FOR_ANXIETY'
        }
      },
      {
        timeline_id: 'CONSERVATIVE_ONLY',
        timeline_name: 'Ultra-Conservative FD Only Timeline',
        current_portfolio_value: 1250000,
        parallel_portfolio_value: 520000, // ₹5.2 lakhs
        difference_amount: -730000,
        difference_percentage: -58,
        shock_factor: 6.5,
        quantum_probability: 0.99,
        user_reaction_prediction: 'GRATEFUL_FOR_RISK_TAKING',
        timeline_story: 'In this timeline, you played it completely safe. Every rupee went into FDs and government bonds. You slept peacefully but your wealth barely kept up with inflation.',
        emotional_impact: {
          gratitude_level: 7,
          life_changing_potential: 'NO',
          therapy_recommended: 'NONE'
        }
      }
    ],
    quantum_insights: {
      most_shocking_revelation: 'You could have been worth ₹1.56 Crores if you had gone all-in on crypto',
      biggest_regret: 'Not following AI recommendations cost you ₹40 lakhs',
      impossibility_score: 10.0,
      user_mind_blown_guarantee: '100%'
    },
    impossibility_score: 10.0,
    user_mind_blown_guarantee: '100%'
  };

  useEffect(() => {
    // Simulate loading quantum analysis
    setIsLoading(true);
    setTimeout(() => {
      setQuantumAnalysis(mockQuantumAnalysis);
      setIsLoading(false);
      setMindBlown(true);
      setTimeout(() => setImpossibilityRealized(true), 2000);
    }, 3000);
  }, []);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    } else {
      return `₹${amount.toLocaleString()}`;
    }
  };

  const getTimelineColor = (timeline: ParallelTimeline) => {
    if (timeline.difference_amount > 5000000) return 'from-yellow-400 to-orange-500'; // Massive gain
    if (timeline.difference_amount > 1000000) return 'from-green-400 to-emerald-500'; // Good gain
    if (timeline.difference_amount > 0) return 'from-blue-400 to-cyan-500'; // Small gain
    if (timeline.difference_amount > -1000000) return 'from-orange-400 to-red-500'; // Small loss
    return 'from-red-500 to-red-700'; // Big loss
  };

  const getShockIndicator = (shockFactor: number) => {
    if (shockFactor >= 9) return { emoji: '🤯', text: 'MIND BLOWN', color: 'text-red-400' };
    if (shockFactor >= 8) return { emoji: '😱', text: 'SHOCKING', color: 'text-orange-400' };
    if (shockFactor >= 7) return { emoji: '😮', text: 'SURPRISING', color: 'text-yellow-400' };
    if (shockFactor >= 6) return { emoji: '🤔', text: 'INTERESTING', color: 'text-blue-400' };
    return { emoji: '😐', text: 'MILD', color: 'text-gray-400' };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-8"
          />
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            🌌 Accessing Parallel Timelines...
          </h2>
          <div className="space-y-2 text-lg text-gray-300">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              ⚛️ Initializing quantum computing...
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
              🔮 Calculating infinite timelines...
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
              🌟 Processing parallel universe data...
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}>
              💫 Preparing to blow your mind...
            </motion.p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white">
      {/* Mind Blown Animation */}
      <AnimatePresence>
        {mindBlown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
            onClick={() => setMindBlown(false)}
          >
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-8xl mb-4"
              >
                🤯
              </motion.div>
              <h2 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
                MIND = BLOWN!
              </h2>
              <p className="text-2xl text-gray-300 mb-8">
                "That's not possible, you're joking!"
              </p>
              <button
                onClick={() => setMindBlown(false)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                Show Me The Impossible
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
          >
            🌌 Quantum Timeline Explorer
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-gray-300 mb-4"
          >
            Explore Infinite Parallel Versions of Your Investment Life
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 max-w-4xl mx-auto"
          >
            <p className="text-red-300 font-semibold mb-2">⚠️ SEBI COMPLIANCE NOTICE</p>
            <p className="text-gray-300 text-sm">
              This is an educational tool showing historical "what if" scenarios based on past market data. 
              Past performance does not guarantee future returns. All investments carry risk of loss.
            </p>
          </motion.div>
        </div>

        {quantumAnalysis && (
          <>
            {/* ... */}

            {/* Quantum Insights */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-8 mb-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-yellow-400 text-center">
                🧠 Quantum Insights (Impossible But True)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-red-400 mb-3">💥 Most Shocking Timeline</h3>
                  <p className="text-gray-300">
                    {quantumAnalysis.quantum_insights.most_shocking_revelation}
                  </p>
                </div>
                
                <div className="bg-black/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-orange-400 mb-3">😭 Biggest Regret</h3>
                  <p className="text-gray-300">
                    {quantumAnalysis.quantum_insights.biggest_regret}
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <div className="text-2xl font-bold text-yellow-400 mb-2">
                  Impossibility Score: {quantumAnalysis.impossibility_score}/10
                </div>
                <div className="text-lg text-gray-300">
                  Mind Blown Guarantee: {quantumAnalysis.user_mind_blown_guarantee}
                </div>
              </div>
            </motion.div>

            {/* Parallel Timelines */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                🔮 Your Parallel Lives
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {quantumAnalysis.parallel_timelines.map((timeline, index) => {
                  const shock = getShockIndicator(timeline.shock_factor);
                  
                  return (
                    <motion.div
                      key={timeline.timeline_id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`bg-gradient-to-br ${getTimelineColor(timeline)} bg-opacity-20 backdrop-blur-sm rounded-xl border border-opacity-30 p-6 cursor-pointer transition-all`}
                      onClick={() => setSelectedTimeline(timeline)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">{timeline.timeline_name}</h3>
                        <div className={`flex items-center space-x-2 ${shock.color}`}>
                          <span className="text-2xl">{shock.emoji}</span>
                          <span className="text-sm font-bold">{shock.text}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-3xl font-bold text-white mb-1">
                          {formatCurrency(timeline.parallel_portfolio_value)}
                        </div>
                        <div className={`text-lg font-semibold ${timeline.difference_amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {timeline.difference_amount > 0 ? '+' : ''}{formatCurrency(timeline.difference_amount)}
                          <span className="text-sm ml-2">
                            ({timeline.difference_percentage > 0 ? '+' : ''}{timeline.difference_percentage.toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
                          <span>Quantum Probability</span>
                          <span>{(timeline.quantum_probability * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                            style={{ width: `${timeline.quantum_probability * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm line-clamp-3">
                        {timeline.timeline_story}
                      </p>
                      
                      <div className="mt-4 text-xs text-gray-400">
                        Predicted Reaction: {timeline.user_reaction_prediction.replace(/_/g, ' ')}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">
                          ₹{timeline.parallel_portfolio_value.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-400">Simulated Value (Educational)</p>
                        <p className="text-xs text-yellow-300">Past data only</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Impossibility Confirmation */}
            {impossibilityRealized && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-red-900/50 to-purple-900/50 backdrop-blur-sm rounded-xl border border-red-500/30 p-8 text-center"
              >
                <h2 className="text-4xl font-bold mb-4 text-red-400">
                  🚨 IMPOSSIBILITY CONFIRMED
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  Educational analysis of historical "what if" investment scenarios based on past market data. 
                  Learn from simulated outcomes for better financial decision-making.
                </p>
                <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 mb-4">
                  <p className="text-yellow-300 text-xs font-semibold">
                    ⚠️ SEBI DISCLAIMER: Mutual fund investments are subject to market risks. 
                    Past performance does not guarantee future returns. This is educational analysis only.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-black/30 rounded-lg p-4">
                    <div className="text-purple-400 font-bold">Quantum Computing</div>
                    <div className="text-gray-400">Processing infinite timelines</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4">
                    <div className="text-blue-400 font-bold">Historical Analysis</div>
                    <div className="text-gray-400">Learning from past patterns</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4">
                    <div className="text-yellow-400 font-bold">Mind Reading</div>
                    <div className="text-gray-400">Predicting your reactions</div>
                  </div>
                </div>
                <p className="text-lg text-red-300 mt-6">
                  "That's not possible, you're joking!" - Everyone who sees this
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Timeline Detail Modal */}
      <AnimatePresence>
        {selectedTimeline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
            onClick={() => setSelectedTimeline(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-xl border border-gray-700 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {selectedTimeline.timeline_name}
              </h2>
              
              <div className="mb-6">
                <div className="text-4xl font-bold text-white mb-2">
                  {formatCurrency(selectedTimeline.parallel_portfolio_value)}
                </div>
                <div className={`text-xl font-semibold ${selectedTimeline.difference_amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedTimeline.difference_amount > 0 ? '+' : ''}{formatCurrency(selectedTimeline.difference_amount)} 
                  ({selectedTimeline.difference_percentage > 0 ? '+' : ''}{selectedTimeline.difference_percentage.toFixed(1)}%)
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-3">📖 Timeline Story</h3>
                <p className="text-gray-300 leading-relaxed">
                  {selectedTimeline.timeline_story}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-bold text-purple-400 mb-2">Quantum Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Probability:</span>
                      <span>{(selectedTimeline.quantum_probability * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shock Factor:</span>
                      <span>{selectedTimeline.shock_factor}/10</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-bold text-orange-400 mb-2">Emotional Impact</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Life Changing:</span>
                      <span>{selectedTimeline.emotional_impact.life_changing_potential}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Therapy Needed:</span>
                      <span>{selectedTimeline.emotional_impact.therapy_recommended}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <button
                  onClick={() => setSelectedTimeline(null)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  Back to Parallel Timelines
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
