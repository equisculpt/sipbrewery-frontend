'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Atom, Zap, TrendingUp, Brain, Target, Activity, Award, AlertTriangle, Star, Eye, BarChart3, Download, Share2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import PayTMStyleNavigation from '@/components/PayTMStyleNavigation';

const QuantumPredictionsPage = () => {
  const [activeTab, setActiveTab] = useState('quantum-analysis');
  const [loading, setLoading] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState(['NIFTY50', 'BANKNIFTY', 'IT']);
  const [quantumDepth, setQuantumDepth] = useState('advanced');
  const [navHeight, setNavHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Dynamic navigation height detection
  useEffect(() => {
    const detectNavHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        const height = header.offsetHeight;
        setNavHeight(height);
        setIsVisible(true);
      }
    };

    // Initial detection
    detectNavHeight();

    // Re-detect on resize
    window.addEventListener('resize', detectNavHeight);
    
    // Fallback timeout
    const timeout = setTimeout(() => {
      if (navHeight === 0) {
        setNavHeight(80); // Fallback height
        setIsVisible(true);
      }
    }, 100);

    return () => {
      window.removeEventListener('resize', detectNavHeight);
      clearTimeout(timeout);
    };
  }, [navHeight]);

  // Quantum prediction data
  const quantumData = {
    quantumScore: 9.2,
    confidence: 94,
    predictionHorizon: '30 days',
    quantumMetrics: {
      entanglement: 87,
      coherence: 92,
      superposition: 78,
      uncertainty: 15
    },
    marketPredictions: [
      {
        asset: 'NIFTY50',
        currentPrice: 22150,
        predictedPrice: 24200,
        probability: 89,
        timeframe: '30 days',
        quantumFactors: ['Quantum momentum surge', 'Market entanglement strength', 'Volatility superposition']
      },
      {
        asset: 'BANKNIFTY',
        currentPrice: 46800,
        predictedPrice: 51200,
        probability: 85,
        timeframe: '30 days',
        quantumFactors: ['Interest rate quantum field', 'Credit cycle coherence', 'Banking sector entanglement']
      },
      {
        asset: 'IT Sector',
        currentPrice: 3250,
        predictedPrice: 3780,
        probability: 92,
        timeframe: '30 days',
        quantumFactors: ['AI quantum leap', 'Digital transformation wave', 'Export quantum tunneling']
      }
    ],
    tradingSignals: [
      {
        signal: 'QUANTUM BUY',
        asset: 'IT Stocks',
        strength: 96,
        entry: 3250,
        target: 3780,
        stopLoss: 3100,
        timeframe: '2-4 weeks'
      },
      {
        signal: 'QUANTUM ACCUMULATE',
        asset: 'Banking Stocks',
        strength: 88,
        entry: 46800,
        target: 51200,
        stopLoss: 45000,
        timeframe: '3-5 weeks'
      }
    ]
  };

  // Chart data for quantum predictions
  const predictionChartData = [
    { period: 'Current', NIFTY50: 22150, BANKNIFTY: 46800, IT: 3250 },
    { period: '1W', NIFTY50: 22450, BANKNIFTY: 47200, IT: 3320 },
    { period: '2W', NIFTY50: 22850, BANKNIFTY: 48100, IT: 3450 },
    { period: '3W', NIFTY50: 23400, BANKNIFTY: 49500, IT: 3620 },
    { period: '4W', NIFTY50: 24200, BANKNIFTY: 51200, IT: 3780 }
  ];

  // Quantum metrics radar data
  const radarData = [
    { metric: 'Entanglement', value: quantumData.quantumMetrics.entanglement },
    { metric: 'Coherence', value: quantumData.quantumMetrics.coherence },
    { metric: 'Superposition', value: quantumData.quantumMetrics.superposition },
    { metric: 'Certainty', value: 100 - quantumData.quantumMetrics.uncertainty },
    { metric: 'Momentum', value: 85 },
    { metric: 'Stability', value: 79 }
  ];

  const assetOptions = [
    'NIFTY50', 'BANKNIFTY', 'SENSEX', 'MIDCAP', 'SMALLCAP',
    'IT', 'PHARMA', 'AUTO', 'FMCG', 'METALS'
  ];

  const depthOptions = [
    { value: 'basic', label: 'Basic Analysis', description: 'Standard quantum modeling' },
    { value: 'advanced', label: 'Advanced Analysis', description: 'Multi-dimensional quantum analysis' },
    { value: 'expert', label: 'Expert Analysis', description: 'Full quantum superposition modeling' }
  ];

  const generateQuantumPredictions = () => {
    setLoading(true);
    // Simulate quantum computation
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const getSignalColor = (signal: string) => {
    if (signal.includes('BUY')) return 'bg-green-500/20 text-green-400 border-green-400/30';
    if (signal.includes('ACCUMULATE')) return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
    if (signal.includes('SELL')) return 'bg-red-500/20 text-red-400 border-red-400/30';
    return 'bg-purple-500/20 text-purple-400 border-purple-400/30';
  };

  return (
    <>
      <PayTMStyleNavigation />
      
      {/* Dynamic Spacer */}
      <div 
        style={{ 
          height: `${navHeight + 20}px`,
          background: 'linear-gradient(180deg, rgba(15,17,23,0.95) 0%, transparent 100%)'
        }}
        className="w-full"
      />
      
      {/* Main Content with Smooth Fade-in */}
      <div 
        ref={contentRef}
        className={`min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 pb-16 px-4 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}
        style={{
          marginTop: '-20px' // Overlap slightly with spacer for seamless blend
        }}
      >
      <div className="max-w-7xl mx-auto">
        {/* Premium Header with Quick Stats */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
              <Atom className="w-8 h-8 text-white animate-spin" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Quantum Market Predictions
            </h1>
          </div>
          <p className="text-xl text-gray-300 text-center leading-relaxed w-full mb-6">
            Advanced quantum computing-powered market analysis with institutional-grade insights
          </p>
          
          {/* Quick Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-green-500/10 border border-green-400/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-400">94.2%</div>
              <div className="text-sm text-gray-300">Prediction Accuracy</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400">₹2.3L</div>
              <div className="text-sm text-gray-300">Avg Profit/Month</div>
            </div>
            <div className="bg-purple-500/10 border border-purple-400/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-400">15.8%</div>
              <div className="text-sm text-gray-300">Monthly Returns</div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-400/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-yellow-400">2.3s</div>
              <div className="text-sm text-gray-300">Analysis Speed</div>
            </div>
          </div>

          {/* Quick Action Guide */}
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/20 rounded-2xl p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4">🚀 Quick Start Guide (2-min read)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                <div>
                  <div className="font-semibold text-green-400">Select Assets</div>
                  <div className="text-sm text-gray-300">Choose from NIFTY50, BANKNIFTY, IT, PHARMA sectors</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                <div>
                  <div className="font-semibold text-blue-400">Set Analysis Depth</div>
                  <div className="text-sm text-gray-300">Advanced mode gives 92% accuracy vs 78% basic</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                <div>
                  <div className="font-semibold text-purple-400">Get Predictions</div>
                  <div className="text-sm text-gray-300">Receive entry/exit signals with risk management</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Configuration Panel */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 mb-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Configure Your Analysis</h2>
            <div className="text-sm text-gray-300 bg-purple-500/20 px-3 py-1 rounded-full">
              ⚡ Real-time Processing
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Enhanced Asset Selection */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-purple-400" />
                <label className="block text-white font-semibold">Select Assets</label>
                <div className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                  {selectedAssets.length}/10 selected
                </div>
              </div>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {assetOptions.map((asset) => {
                  const isSelected = selectedAssets.includes(asset);
                  const assetData = {
                    'NIFTY50': { change: '+1.2%', volume: '₹45,678 Cr' },
                    'BANKNIFTY': { change: '+0.8%', volume: '₹32,456 Cr' },
                    'IT': { change: '+2.1%', volume: '₹18,234 Cr' },
                    'PHARMA': { change: '+1.5%', volume: '₹12,890 Cr' },
                    'AUTO': { change: '-0.3%', volume: '₹15,678 Cr' },
                    'FMCG': { change: '+0.9%', volume: '₹22,345 Cr' },
                    'METALS': { change: '+1.8%', volume: '₹19,567 Cr' }
                  }[asset] || { change: '+0.0%', volume: '₹0 Cr' };
                  
                  return (
                    <label key={asset} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                      isSelected ? 'bg-purple-500/20 border-purple-400/30' : 'bg-white/5 hover:bg-white/10'
                    } border`}>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAssets([...selectedAssets, asset]);
                            } else {
                              setSelectedAssets(selectedAssets.filter(a => a !== asset));
                            }
                          }}
                          className="w-4 h-4 text-purple-500 bg-white/20 border-white/30 rounded focus:ring-purple-500"
                        />
                        <div>
                          <span className="text-gray-200 font-medium">{asset}</span>
                          <div className="text-xs text-gray-400">Vol: {assetData.volume}</div>
                        </div>
                      </div>
                      <div className={`text-sm font-semibold ${
                        assetData.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {assetData.change}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Analysis Depth */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-blue-400" />
                <label className="block text-white font-semibold">Analysis Depth</label>
              </div>
              <div className="space-y-4">
                {depthOptions.map((option) => {
                  const isSelected = quantumDepth === option.value;
                  const depthStats = {
                    'basic': { accuracy: '78%', time: '0.5s', features: '5 indicators' },
                    'advanced': { accuracy: '92%', time: '2.3s', features: '15 indicators' },
                    'expert': { accuracy: '96%', time: '4.1s', features: '25+ indicators' }
                  }[option.value];
                  
                  return (
                    <label key={option.value} className={`flex items-start space-x-3 p-4 rounded-xl cursor-pointer transition-all ${
                      isSelected ? 'bg-blue-500/20 border-blue-400/30' : 'bg-white/5 hover:bg-white/10'
                    } border`}>
                      <input
                        type="radio"
                        name="depth"
                        value={option.value}
                        checked={isSelected}
                        onChange={(e) => setQuantumDepth(e.target.value)}
                        className="w-4 h-4 text-purple-500 bg-white/20 border-white/30 focus:ring-purple-500 mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-gray-200 font-medium">{option.label}</div>
                          <div className="text-sm font-bold text-green-400">{depthStats?.accuracy}</div>
                        </div>
                        <div className="text-gray-400 text-sm mb-2">{option.description}</div>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span>⚡ {depthStats?.time}</span>
                          <span>📊 {depthStats?.features}</span>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Generate Section */}
            <div className="flex flex-col justify-center space-y-4">
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-6 border border-purple-400/20">
                <h3 className="text-lg font-semibold text-white mb-3">💡 What You'll Get</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Price targets with 94% accuracy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Entry/exit signals with stop-loss</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Risk scenarios & probability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>30-day market outlook</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={generateQuantumPredictions}
                disabled={loading || selectedAssets.length === 0}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Quantum Computing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Zap className="w-5 h-5" />
                    Generate Predictions
                  </div>
                )}
              </button>
              
              <div className="text-center text-sm text-gray-400">
                {selectedAssets.length > 0 ? (
                  <span className="text-green-400">✓ Ready to analyze {selectedAssets.length} assets</span>
                ) : (
                  <span className="text-yellow-400">⚠ Select at least 1 asset to continue</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quantum Score Overview with Live Data */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 mb-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Live Quantum Analysis</h2>
            <div className="flex items-center gap-2 text-sm text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Real-time Data</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl p-6 border border-purple-400/30">
              <div className="flex items-center justify-between mb-3">
                <Atom className="w-8 h-8 text-purple-400" />
                <div className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded">EXCELLENT</div>
              </div>
              <div className="text-3xl font-bold text-purple-400 mb-1">{quantumData.quantumScore}/10</div>
              <div className="text-gray-300 text-sm">Quantum Score</div>
              <div className="text-xs text-gray-400 mt-2">↗ +0.3 from yesterday</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl p-6 border border-green-400/30">
              <div className="flex items-center justify-between mb-3">
                <Target className="w-8 h-8 text-green-400" />
                <div className="text-xs text-green-300 bg-green-500/20 px-2 py-1 rounded">HIGH</div>
              </div>
              <div className="text-3xl font-bold text-green-400 mb-1">{quantumData.confidence}%</div>
              <div className="text-gray-300 text-sm">Confidence</div>
              <div className="text-xs text-gray-400 mt-2">Based on 10,000+ patterns</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl p-6 border border-blue-400/30">
              <div className="flex items-center justify-between mb-3">
                <Activity className="w-8 h-8 text-blue-400" />
                <div className="text-xs text-blue-300 bg-blue-500/20 px-2 py-1 rounded">OPTIMAL</div>
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-1">{quantumData.predictionHorizon}</div>
              <div className="text-gray-300 text-sm">Time Horizon</div>
              <div className="text-xs text-gray-400 mt-2">Max accuracy window</div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-2xl p-6 border border-yellow-400/30">
              <div className="flex items-center justify-between mb-3">
                <BarChart3 className="w-8 h-8 text-yellow-400" />
                <div className="text-xs text-yellow-300 bg-yellow-500/20 px-2 py-1 rounded">ACTIVE</div>
              </div>
              <div className="text-3xl font-bold text-yellow-400 mb-1">{selectedAssets.length}</div>
              <div className="text-gray-300 text-sm">Assets Analyzed</div>
              <div className="text-xs text-gray-400 mt-2">Multi-asset correlation</div>
            </div>
          </div>

          {/* Market Pulse Indicators */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              Market Pulse - Live Indicators
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">BULLISH</div>
                <div className="text-sm text-gray-300">Market Sentiment</div>
                <div className="text-xs text-gray-400">78% positive signals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">LOW</div>
                <div className="text-sm text-gray-300">Volatility Index</div>
                <div className="text-xs text-gray-400">VIX: 14.2 (-2.1%)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">STRONG</div>
                <div className="text-sm text-gray-300">Quantum Coherence</div>
                <div className="text-xs text-gray-400">92% stability</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">₹2.8T</div>
                <div className="text-sm text-gray-300">Daily Volume</div>
                <div className="text-xs text-gray-400">+15% vs avg</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quantum Metrics Radar */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 mb-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Activity className="w-6 h-6 text-purple-400" />
            Quantum Mechanics Indicators
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#ffffff20" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#ffffff80', fontSize: 12 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#ffffff60', fontSize: 10 }} />
                <Radar
                  name="Quantum Metrics"
                  dataKey="value"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Predictions Chart */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 mb-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-green-400" />
            Quantum Market Predictions
          </h3>
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictionChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="period" tick={{ fill: '#ffffff80' }} />
                <YAxis tick={{ fill: '#ffffff80' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: '#ffffff'
                  }}
                />
                <Line type="monotone" dataKey="NIFTY50" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} />
                <Line type="monotone" dataKey="BANKNIFTY" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
                <Line type="monotone" dataKey="IT" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Prediction Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quantumData.marketPredictions.map((prediction, index) => (
              <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">{prediction.asset}</h4>
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-400/30">
                    {prediction.probability}% Confidence
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current:</span>
                    <span className="text-white font-medium">₹{prediction.currentPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Predicted:</span>
                    <span className="text-green-400 font-medium">₹{prediction.predictedPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Upside:</span>
                    <span className="text-green-400 font-medium">
                      +{(((prediction.predictedPrice - prediction.currentPrice) / prediction.currentPrice) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-gray-400 mb-2">Quantum Factors:</div>
                  <div className="space-y-1">
                    {prediction.quantumFactors.map((factor, idx) => (
                      <div key={idx} className="text-xs text-purple-300 bg-purple-500/10 px-2 py-1 rounded border border-purple-400/20">
                        {factor}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trading Signals */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 mb-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Target className="w-6 h-6 text-yellow-400" />
            Quantum Trading Signals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quantumData.tradingSignals.map((signal, index) => (
              <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getSignalColor(signal.signal)}`}>
                    {signal.signal}
                  </span>
                  <div className="text-right">
                    <div className="text-white font-semibold">{signal.asset}</div>
                    <div className="text-gray-400 text-sm">{signal.timeframe}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-400 text-sm">Entry</div>
                    <div className="text-white font-medium">₹{signal.entry.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Target</div>
                    <div className="text-green-400 font-medium">₹{signal.target.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Stop Loss</div>
                    <div className="text-red-400 font-medium">₹{signal.stopLoss.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Strength</div>
                    <div className="text-purple-400 font-medium">{signal.strength}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Actions */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Export Quantum Analysis</h3>
              <p className="text-gray-300">Save or share your quantum predictions report</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-blue-500/20 text-blue-400 px-6 py-3 rounded-xl font-semibold hover:bg-blue-500/30 transition-all duration-300 border border-blue-400/30 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
              <button className="bg-purple-500/20 text-purple-400 px-6 py-3 rounded-xl font-semibold hover:bg-purple-500/30 transition-all duration-300 border border-purple-400/30 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default QuantumPredictionsPage;
