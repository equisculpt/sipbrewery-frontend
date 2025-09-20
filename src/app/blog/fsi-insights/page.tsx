'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, TrendingUp, Shield, Eye, Cpu, BarChart3, Target, ArrowRight, Sparkles, Activity, Database } from 'lucide-react';
import '../../../styles/blog-center-fix.css';

interface FSIInsight {
  id: string;
  title: string;
  description: string;
  category: string;
  complexity: 'Basic' | 'Advanced' | 'Expert';
  impact: 'High' | 'Medium' | 'Low';
  publishDate: string;
  readTime: string;
  aiConfidence: number;
  featured: boolean;
  tags: string[];
  keyMetrics: {
    accuracy: number;
    predictiveValue: number;
    marketImpact: string;
  };
}

interface FSICapability {
  name: string;
  icon: React.ReactNode;
  description: string;
  accuracy: number;
  color: string;
}

const FSIInsightsPage = () => {
  const [insights, setInsights] = useState<FSIInsight[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedComplexity, setSelectedComplexity] = useState('All');
  const [loading, setLoading] = useState(true);

  const fsiCapabilities: FSICapability[] = [
    {
      name: 'Portfolio Optimization',
      icon: <Target className="w-6 h-6" />,
      description: 'AI-driven asset allocation and risk-adjusted returns',
      accuracy: 94.2,
      color: 'emerald'
    },
    {
      name: 'Market Prediction',
      icon: <TrendingUp className="w-6 h-6" />,
      description: 'Advanced forecasting using quantum algorithms',
      accuracy: 87.8,
      color: 'blue'
    },
    {
      name: 'Risk Assessment',
      icon: <Shield className="w-6 h-6" />,
      description: 'Real-time risk profiling and stress testing',
      accuracy: 91.5,
      color: 'purple'
    },
    {
      name: 'Behavioral Analysis',
      icon: <Brain className="w-6 h-6" />,
      description: 'Investor psychology and decision pattern analysis',
      accuracy: 89.3,
      color: 'orange'
    }
  ];

  const categories = ['All', 'AI Technology', 'Market Analysis', 'Risk Intelligence', 'Portfolio Optimization', 'Behavioral Finance'];
  const complexities = ['All', 'Basic', 'Advanced', 'Expert'];

  // Sample FSI insights
  const sampleInsights: FSIInsight[] = [
    {
      id: '1',
      title: 'Quantum-Enhanced Portfolio Optimization: The Next Frontier',
      description: 'Our proprietary quantum algorithms have achieved 94.2% accuracy in portfolio optimization, outperforming traditional methods by 23%. Learn how quantum computing is revolutionizing investment management.',
      category: 'AI Technology',
      complexity: 'Expert',
      impact: 'High',
      publishDate: '2024-01-15',
      readTime: '12 min read',
      aiConfidence: 94.2,
      featured: true,
      tags: ['Quantum Computing', 'Portfolio Optimization', 'AI', 'Innovation'],
      keyMetrics: {
        accuracy: 94.2,
        predictiveValue: 87.5,
        marketImpact: '+23% vs Traditional'
      }
    },
    {
      id: '2',
      title: 'Behavioral Finance AI: Understanding Investor Psychology',
      description: 'Our advanced behavioral analysis engine identifies cognitive biases and emotional patterns in real-time, helping investors make more rational decisions.',
      category: 'Behavioral Finance',
      complexity: 'Advanced',
      impact: 'High',
      publishDate: '2024-01-12',
      readTime: '8 min read',
      aiConfidence: 89.3,
      featured: true,
      tags: ['Behavioral Finance', 'Psychology', 'Decision Making', 'AI'],
      keyMetrics: {
        accuracy: 89.3,
        predictiveValue: 82.1,
        marketImpact: '+15% Better Decisions'
      }
    },
    {
      id: '3',
      title: 'Real-Time Risk Intelligence: Predicting Market Volatility',
      description: 'FSI\'s risk assessment engine processes 10,000+ data points per second to predict market volatility with 91.5% accuracy, 48 hours in advance.',
      category: 'Risk Intelligence',
      complexity: 'Advanced',
      impact: 'High',
      publishDate: '2024-01-10',
      readTime: '10 min read',
      aiConfidence: 91.5,
      featured: false,
      tags: ['Risk Management', 'Volatility Prediction', 'Real-time Analysis'],
      keyMetrics: {
        accuracy: 91.5,
        predictiveValue: 88.7,
        marketImpact: '48hr Early Warning'
      }
    },
    {
      id: '4',
      title: 'Market Sentiment Analysis: Social Media to Alpha Generation',
      description: 'How our AI processes millions of social media posts, news articles, and market data to generate actionable investment insights.',
      category: 'Market Analysis',
      complexity: 'Basic',
      impact: 'Medium',
      publishDate: '2024-01-08',
      readTime: '6 min read',
      aiConfidence: 85.7,
      featured: false,
      tags: ['Sentiment Analysis', 'Social Media', 'Alpha Generation'],
      keyMetrics: {
        accuracy: 85.7,
        predictiveValue: 79.3,
        marketImpact: '+8% Alpha'
      }
    },
    {
      id: '5',
      title: 'Dynamic Asset Allocation: Adaptive Investment Strategies',
      description: 'FSI\'s dynamic allocation engine automatically adjusts portfolio weights based on market conditions, achieving superior risk-adjusted returns.',
      category: 'Portfolio Optimization',
      complexity: 'Advanced',
      impact: 'High',
      publishDate: '2024-01-05',
      readTime: '9 min read',
      aiConfidence: 92.1,
      featured: true,
      tags: ['Asset Allocation', 'Dynamic Strategies', 'Risk-Adjusted Returns'],
      keyMetrics: {
        accuracy: 92.1,
        predictiveValue: 86.4,
        marketImpact: '+18% Sharpe Ratio'
      }
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInsights(sampleInsights);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredInsights = insights.filter(insight => {
    const categoryMatch = selectedCategory === 'All' || insight.category === selectedCategory;
    const complexityMatch = selectedComplexity === 'All' || insight.complexity === selectedComplexity;
    return categoryMatch && complexityMatch;
  });

  const featuredInsights = insights.filter(insight => insight.featured);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Basic': return 'text-green-400 bg-green-500/20';
      case 'Advanced': return 'text-yellow-400 bg-yellow-500/20';
      case 'Expert': return 'text-red-400 bg-red-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-emerald-400 bg-emerald-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'Low': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading FSI insights...</p>
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
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="w-12 h-12 text-emerald-400" />
              <h1 className="text-5xl font-bold text-white header-safe-center">
                FSI <span className="text-emerald-400">Insights</span>
              </h1>
            </div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 text-center blog-subtitle-only">
              Discover how our Financial Super Intelligence (FSI) technology is revolutionizing investment management through advanced AI and quantum computing
            </p>
            
            {/* FSI Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="w-6 h-6 text-emerald-400" />
                  <span className="text-2xl font-bold text-white">94.2%</span>
                </div>
                <p className="text-slate-300 text-sm">AI Accuracy Rate</p>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Activity className="w-6 h-6 text-emerald-400" />
                  <span className="text-2xl font-bold text-white">10K+</span>
                </div>
                <p className="text-slate-300 text-sm">Data Points/Second</p>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Database className="w-6 h-6 text-emerald-400" />
                  <span className="text-2xl font-bold text-white">23%</span>
                </div>
                <p className="text-slate-300 text-sm">Performance Improvement</p>
              </div>
            </div>
          </motion.div>

          {/* FSI Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {fsiCapabilities.map((capability, index) => (
              <motion.div
                key={capability.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-emerald-400">
                    {capability.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{capability.name}</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {capability.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Accuracy</span>
                  <span className="text-emerald-400 font-bold">{capability.accuracy}%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2 mt-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${capability.accuracy}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            {/* Category Filter */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 text-sm ${
                      selectedCategory === category
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Complexity Filter */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Complexity Level</h3>
              <div className="flex flex-wrap gap-3">
                {complexities.map((complexity) => (
                  <button
                    key={complexity}
                    onClick={() => setSelectedComplexity(complexity)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 text-sm ${
                      selectedComplexity === complexity
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600'
                    }`}
                  >
                    {complexity}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Insights */}
      {selectedCategory === 'All' && selectedComplexity === 'All' && (
        <section className="px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-white mb-8 flex items-center gap-3"
            >
              <Sparkles className="text-emerald-400" />
              Featured FSI Insights
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredInsights.slice(0, 2).map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                        {insight.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getComplexityColor(insight.complexity)}`}>
                        {insight.complexity}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getImpactColor(insight.impact)}`}>
                        {insight.impact} Impact
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                      {insight.title}
                    </h3>
                    
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      {insight.description}
                    </p>

                    {/* AI Metrics */}
                    <div className="bg-slate-700/30 rounded-xl p-4 mb-6">
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-emerald-400" />
                        AI Performance Metrics
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-emerald-400">{insight.keyMetrics.accuracy}%</div>
                          <div className="text-xs text-slate-400">Accuracy</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">{insight.keyMetrics.predictiveValue}%</div>
                          <div className="text-xs text-slate-400">Predictive</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-400">{insight.keyMetrics.marketImpact}</div>
                          <div className="text-xs text-slate-400">Impact</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {insight.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Brain className="w-4 h-4" />
                          {insight.aiConfidence}% AI Confidence
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => window.open(`/blog/fsi-insights/${insight.id}`, '_blank')}
                        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group"
                      >
                        Read Insight
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Insights */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <BarChart3 className="text-emerald-400" />
            {selectedCategory === 'All' && selectedComplexity === 'All' ? 'All FSI Insights' : 'Filtered Insights'}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                      {insight.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(insight.complexity)}`}>
                      {insight.complexity}
                    </span>
                    {insight.featured && (
                      <span className="text-yellow-400 text-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {insight.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-4 text-sm leading-relaxed line-clamp-3">
                    {insight.description}
                  </p>

                  {/* AI Confidence Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>AI Confidence</span>
                      <span>{insight.aiConfidence}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${insight.aiConfidence}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {insight.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-700/50 text-slate-400 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {insight.readTime}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getImpactColor(insight.impact)}`}>
                      {insight.impact}
                    </span>
                  </div>
                  
                  <button className="w-full flex items-center justify-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 py-2 rounded-lg transition-colors group text-sm">
                    Explore Insight
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredInsights.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Brain className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">No insights found</h3>
              <p className="text-slate-500">Try adjusting your filters</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="px-8 py-16 border-t border-slate-700/50 text-center newsletter-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center max-w-4xl mx-auto"
        >
          <Brain className="w-12 h-12 text-emerald-400 mb-4" />
          <h3 className="text-3xl font-bold text-white mb-4">
            Get FSI Intelligence Updates
          </h3>
          <p className="text-slate-300 mb-8 max-w-2xl text-center">
            Stay ahead with cutting-edge AI insights and quantum computing developments in finance
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

      {/* FSI Technology CTA */}
      <section className="px-8 py-16 border-t border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-emerald-500/10 to-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 text-center"
          >
            <div className="flex flex-col items-center justify-center">
              <Brain className="w-12 h-12 text-emerald-400 mb-4" />
              <h3 className="text-3xl font-bold text-white mb-4">
                Experience FSI Technology
              </h3>
              <p className="text-slate-300 mb-8 max-w-2xl">
                Get personalized insights powered by our Financial Super Intelligence engine. See how AI can transform your investment strategy.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="w-full sm:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors whitespace-nowrap">
                  Try FSI Demo
                </button>
                <button className="w-full sm:w-auto px-8 py-3 border border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 font-semibold rounded-lg transition-colors whitespace-nowrap">
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FSIInsightsPage;
