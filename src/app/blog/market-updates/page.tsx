'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Calendar, Clock, BarChart3, Globe, IndianRupee, AlertTriangle } from 'lucide-react';
import '../../../styles/blog-center-fix.css';

interface MarketUpdate {
  id: string;
  title: string;
  summary: string;
  impact: 'positive' | 'negative' | 'neutral';
  urgency: 'high' | 'medium' | 'low';
  category: string;
  timestamp: string;
  source: string;
  marketData?: {
    change: number;
    percentage: number;
    value: number;
  };
}

interface MarketIndex {
  name: string;
  value: number;
  change: number;
  percentage: number;
  symbol: string;
}

const MarketUpdatesPage = () => {
  const [updates, setUpdates] = useState<MarketUpdate[]>([]);
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Market Indices', 'Mutual Funds', 'Regulatory', 'Global Markets', 'Economic Data'];

  // Sample market indices
  const sampleIndices: MarketIndex[] = [
    { name: 'Nifty 50', value: 21850.50, change: 125.30, percentage: 0.58, symbol: 'NIFTY' },
    { name: 'Sensex', value: 72240.26, change: 380.15, percentage: 0.53, symbol: 'SENSEX' },
    { name: 'Nifty Bank', value: 46850.75, change: -180.25, percentage: -0.38, symbol: 'BANKNIFTY' },
    { name: 'Nifty IT', value: 35420.80, change: 220.45, percentage: 0.63, symbol: 'NIFTYIT' }
  ];

  // Sample market updates
  const sampleUpdates: MarketUpdate[] = [
    {
      id: '1',
      title: 'RBI Maintains Repo Rate at 6.50% - Markets Rally',
      summary: 'Reserve Bank of India keeps policy rates unchanged, citing balanced inflation outlook. Banking and financial stocks surge on the news.',
      impact: 'positive',
      urgency: 'high',
      category: 'Regulatory',
      timestamp: '2024-01-15T14:30:00Z',
      source: 'RBI Press Release',
      marketData: { change: 1.2, percentage: 1.8, value: 21850 }
    },
    {
      id: '2',
      title: 'IT Sector Outlook Improves on Strong Q3 Results',
      summary: 'Major IT companies report better-than-expected earnings. TCS, Infosys lead the rally with strong guidance for next quarter.',
      impact: 'positive',
      urgency: 'medium',
      category: 'Market Indices',
      timestamp: '2024-01-15T12:15:00Z',
      source: 'Market Analysis',
      marketData: { change: 0.8, percentage: 2.3, value: 35420 }
    },
    {
      id: '3',
      title: 'SEBI Introduces New Mutual Fund Disclosure Norms',
      summary: 'Enhanced transparency requirements for mutual fund houses. New regulations effective from March 2024.',
      impact: 'neutral',
      urgency: 'medium',
      category: 'Mutual Funds',
      timestamp: '2024-01-15T11:00:00Z',
      source: 'SEBI Circular',
    },
    {
      id: '4',
      title: 'Global Markets Mixed Amid Fed Rate Uncertainty',
      summary: 'US markets show volatility ahead of Fed meeting. Asian markets follow suit with mixed performance.',
      impact: 'negative',
      urgency: 'medium',
      category: 'Global Markets',
      timestamp: '2024-01-15T09:30:00Z',
      source: 'Bloomberg',
    },
    {
      id: '5',
      title: 'India\'s GDP Growth Revised Upward to 7.3%',
      summary: 'Government revises GDP growth estimate for FY24. Strong domestic consumption and investment drive growth.',
      impact: 'positive',
      urgency: 'high',
      category: 'Economic Data',
      timestamp: '2024-01-15T08:00:00Z',
      source: 'Ministry of Statistics',
    }
  ];

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setUpdates(sampleUpdates);
      setIndices(sampleIndices);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredUpdates = selectedCategory === 'All' 
    ? updates 
    : updates.filter(update => update.category === selectedCategory);

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'negative': return <TrendingDown className="w-5 h-5 text-red-400" />;
      default: return <BarChart3 className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-500/50 bg-red-500/10';
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10';
      default: return 'border-blue-500/50 bg-blue-500/10';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading market updates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 blog-page">
      {/* Navigation Spacer */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="px-8 py-16 hero-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 blog-hero-section"
          >
            <h1 className="text-5xl font-bold text-white mb-6 header-safe-center">
              Market <span className="text-emerald-400">Updates</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto text-center blog-subtitle-only">
              Real-time market insights, regulatory updates, and economic developments
            </p>
          </motion.div>
        </div>
      </section>

      {/* Market Indices Dashboard */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <BarChart3 className="text-emerald-400" />
            Live Market Indices
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {indices.map((index, i) => (
              <motion.div
                key={index.symbol}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{index.name}</h3>
                  <IndianRupee className="w-5 h-5 text-emerald-400" />
                </div>
                
                <div className="mb-3">
                  <p className="text-2xl font-bold text-white">
                    {index.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                
                <div className={`flex items-center gap-2 ${index.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {index.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="font-medium">
                    {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.percentage >= 0 ? '+' : ''}{index.percentage.toFixed(2)}%)
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Market Updates */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <Globe className="text-emerald-400" />
            Latest Updates
          </motion.h2>
          
          <div className="space-y-6">
            {filteredUpdates.map((update, index) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border ${getUrgencyColor(update.urgency)} hover:border-emerald-500/50 transition-all duration-300`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      {getImpactIcon(update.impact)}
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                        {update.category}
                      </span>
                      {update.urgency === 'high' && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                          <AlertTriangle className="w-3 h-3" />
                          High Priority
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">
                      {update.title}
                    </h3>
                    
                    <p className="text-slate-300 mb-4 leading-relaxed">
                      {update.summary}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(update.timestamp).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(update.timestamp).toLocaleTimeString()}
                      </span>
                      <span>Source: {update.source}</span>
                    </div>
                  </div>
                  
                  {update.marketData && (
                    <div className="lg:w-48 bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
                      <h4 className="text-sm font-medium text-slate-300 mb-2">Market Impact</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-400">Value:</span>
                          <span className="text-sm text-white font-medium">
                            {update.marketData.value.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-400">Change:</span>
                          <span className={`text-sm font-medium ${update.marketData.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {update.marketData.change >= 0 ? '+' : ''}{update.marketData.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredUpdates.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Globe className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">No updates found</h3>
              <p className="text-slate-500">Try selecting a different category</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Market Alert Subscription */}
      <section className="px-8 py-16 border-t border-slate-700/50 text-center newsletter-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center max-w-4xl mx-auto"
        >
          <AlertTriangle className="w-12 h-12 text-emerald-400 mb-4" />
          <h3 className="text-3xl font-bold text-white mb-4">
            Get Real-Time Market Alerts
          </h3>
          <p className="text-slate-300 mb-8 max-w-2xl text-center">
            Never miss important market movements. Get instant notifications for breaking news and significant market events.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-center sm:text-left"
            />
            <button className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default MarketUpdatesPage;
