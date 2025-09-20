'use client';

import React, { useState, useEffect } from 'react';
import { Brain, Zap, TrendingUp, Shield, Target, BarChart3, Sparkles, Bot } from 'lucide-react';

const BrewBotPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const features = [
    {
      id: 'fund-analysis',
      name: 'Fund Analysis',
      icon: BarChart3,
      description: 'Deep dive into mutual fund performance with AI-powered insights',
      href: '/fsi/fund-analysis'
    },
    {
      id: 'stock-analysis',
      name: 'Stock Analysis',
      icon: TrendingUp,
      description: 'Comprehensive stock analysis with quantum predictions',
      href: '/fsi/stock-analysis'
    },
    {
      id: 'fund-comparison',
      name: 'Fund Comparison',
      icon: Target,
      description: 'Compare multiple funds with advanced metrics',
      href: '/fsi/fund-comparison'
    },
    {
      id: 'stock-comparison',
      name: 'Stock Comparison',
      icon: Shield,
      description: 'Side-by-side stock comparison with risk analysis',
      href: '/fsi/stock-comparison'
    },
    {
      id: 'quantum-predictions',
      name: 'Quantum Predictions',
      icon: Sparkles,
      description: 'Quantum-powered market predictions and forecasts',
      href: '/fsi/quantum-predictions'
    },
    {
      id: 'market-insights',
      name: 'Market Insights',
      icon: Brain,
      description: 'Real-time market insights powered by ASI intelligence',
      href: '/fsi/market-insights'
    },
    {
      id: 'risk-assessment',
      name: 'Risk Assessment',
      icon: Shield,
      description: 'Advanced risk profiling and portfolio stress testing',
      href: '/fsi/risk-assessment'
    },
    {
      id: 'portfolio-optimizer',
      name: 'Portfolio Optimizer',
      icon: Target,
      description: 'AI-driven portfolio optimization and rebalancing',
      href: '/fsi/portfolio-optimizer'
    }
  ];

  const aiInsights = [
    {
      type: 'Market Prediction',
      confidence: 94,
      message: 'Tech sector rally expected in next 2 weeks based on 1,247 data points',
      impact: 'High'
    },
    {
      type: 'Risk Alert',
      confidence: 87,
      message: 'Volatility spike detected in mid-cap segment, consider rebalancing',
      impact: 'Medium'
    },
    {
      type: 'Opportunity',
      confidence: 91,
      message: 'Hidden gem detected: Parag Parikh Fund showing strong momentum',
      impact: 'High'
    },
    {
      type: 'SIP Advisory',
      confidence: 89,
      message: 'Market dip window opening, increase SIP by 20% for next 3 months',
      impact: 'Medium'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Bot className="w-20 h-20 text-purple-400 mx-auto mb-6 animate-pulse" />
            <h1 className="text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                🤖 Brew Bot
              </span>
            </h1>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
              Your AI-Powered Financial Intelligence Assistant
            </p>
            <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
              Harness the power of Artificial Super Intelligence (ASI) for market analysis, 
              risk assessment, and investment optimization
            </p>
          </div>

          {/* AI Status */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold">ASI Engine Status: ACTIVE</span>
            </div>
            <div className="text-gray-300 text-sm">
              Processing 1,247 data points • Quantum algorithms running • Real-time analysis enabled
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🧠 AI Capabilities
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.id}
                  className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:scale-105 ${
                    activeFeature === index ? 'ring-2 ring-purple-400 bg-white/20' : ''
                  }`}
                  onClick={() => window.location.href = feature.href}
                >
                  <div className="text-center">
                    <IconComponent className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">{feature.name}</h3>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Live AI Insights */}
      <div className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              ⚡ Live AI Insights
            </span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {aiInsights.map((insight, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold">
                      {insight.type}
                    </span>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-gray-400 text-sm">Confidence:</span>
                      <span className="text-green-400 font-bold">{insight.confidence}%</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    insight.impact === 'High' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {insight.impact} Impact
                  </span>
                </div>
                <p className="text-white text-lg">{insight.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
            <h3 className="text-3xl font-bold text-white text-center mb-8">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                🎯 Try Brew Bot Now
              </span>
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">Ask Brew Bot:</label>
                <textarea
                  className="w-full p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  rows={3}
                  placeholder="e.g., Which mutual fund should I invest in for long-term growth? or Analyze HDFC Bank stock for next quarter..."
                />
              </div>
              
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                  isAnalyzing
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                }`}
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5 animate-spin" />
                    Analyzing with ASI...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Brain className="w-5 h-5" />
                    Analyze with Brew Bot
                  </div>
                )}
              </button>
            </div>
            
            {isAnalyzing && (
              <div className="mt-6 p-4 bg-purple-500/20 border border-purple-400/30 rounded-xl">
                <div className="flex items-center gap-2 text-purple-300">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <span>ASI is processing your query using quantum algorithms...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center">
              <Brain className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">1,247</div>
              <div className="text-gray-400">Data Points</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">94.7%</div>
              <div className="text-gray-400">Accuracy</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">2.3s</div>
              <div className="text-gray-400">Response Time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center">
              <Target className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-gray-400">Availability</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrewBotPage;
