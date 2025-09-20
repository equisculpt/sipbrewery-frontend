'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Shield, TrendingUp, BookOpen, Users, Star, ArrowRight, Calculator, PieChart } from 'lucide-react';
import '../../../styles/blog-center-fix.css';

interface InvestmentTip {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  likes: number;
  featured: boolean;
  tags: string[];
  actionSteps: string[];
}

interface TipCategory {
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const InvestmentTipsPage = () => {
  const [tips, setTips] = useState<InvestmentTip[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [loading, setLoading] = useState(true);

  const tipCategories: TipCategory[] = [
    {
      name: 'Portfolio Management',
      icon: <PieChart className="w-6 h-6" />,
      color: 'emerald',
      description: 'Diversification and asset allocation strategies'
    },
    {
      name: 'Risk Management',
      icon: <Shield className="w-6 h-6" />,
      color: 'blue',
      description: 'Protecting your investments from market volatility'
    },
    {
      name: 'Wealth Building',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'purple',
      description: 'Long-term strategies for wealth accumulation'
    },
    {
      name: 'Tax Optimization',
      icon: <Calculator className="w-6 h-6" />,
      color: 'orange',
      description: 'Maximizing returns through tax-efficient investing'
    }
  ];

  const categories = ['All', 'Portfolio Management', 'Risk Management', 'Wealth Building', 'Tax Optimization', 'Market Analysis'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Sample investment tips
  const sampleTips: InvestmentTip[] = [
    {
      id: '1',
      title: 'The Power of Systematic Investment Plans (SIPs)',
      description: 'Learn how regular, disciplined investing through SIPs can help you build wealth over time while reducing market timing risks.',
      category: 'Wealth Building',
      difficulty: 'Beginner',
      readTime: '5 min read',
      likes: 245,
      featured: true,
      tags: ['SIP', 'Mutual Funds', 'Discipline', 'Long-term'],
      actionSteps: [
        'Choose a mutual fund scheme aligned with your goals',
        'Set up automatic monthly transfers',
        'Start with a comfortable amount (even ₹500/month works)',
        'Increase SIP amount annually with salary increments',
        'Stay invested for at least 5-7 years for optimal results'
      ]
    },
    {
      id: '2',
      title: 'Asset Allocation: The Foundation of Smart Investing',
      description: 'Understand how to distribute your investments across different asset classes to optimize returns while managing risk.',
      category: 'Portfolio Management',
      difficulty: 'Intermediate',
      readTime: '8 min read',
      likes: 189,
      featured: true,
      tags: ['Asset Allocation', 'Diversification', 'Risk Management'],
      actionSteps: [
        'Assess your risk tolerance and investment horizon',
        'Follow the 100-age rule for equity allocation',
        'Diversify across equity, debt, and alternative assets',
        'Rebalance your portfolio annually',
        'Review and adjust based on life changes'
      ]
    },
    {
      id: '3',
      title: 'Emergency Fund: Your Financial Safety Net',
      description: 'Build a robust emergency fund to protect your investments and avoid financial stress during unexpected situations.',
      category: 'Risk Management',
      difficulty: 'Beginner',
      readTime: '6 min read',
      likes: 156,
      featured: false,
      tags: ['Emergency Fund', 'Financial Planning', 'Liquidity'],
      actionSteps: [
        'Calculate 6-12 months of essential expenses',
        'Keep funds in liquid instruments (savings, FDs)',
        'Build gradually - start with ₹1000/month',
        'Separate from investment accounts',
        'Replenish immediately after any usage'
      ]
    },
    {
      id: '4',
      title: 'Tax-Saving Investments Under Section 80C',
      description: 'Maximize your tax savings while building wealth through ELSS, PPF, and other 80C investment options.',
      category: 'Tax Optimization',
      difficulty: 'Intermediate',
      readTime: '7 min read',
      likes: 203,
      featured: true,
      tags: ['Tax Saving', 'Section 80C', 'ELSS', 'PPF'],
      actionSteps: [
        'Understand your tax bracket and savings potential',
        'Compare ELSS vs PPF vs other 80C options',
        'Invest early in the financial year',
        'Don\'t invest just for tax saving - consider returns',
        'Track lock-in periods and maturity dates'
      ]
    },
    {
      id: '5',
      title: 'Dollar Cost Averaging: Timing the Market vs Time in Market',
      description: 'Learn why consistent investing beats trying to time the market and how to implement this strategy effectively.',
      category: 'Market Analysis',
      difficulty: 'Advanced',
      readTime: '10 min read',
      likes: 178,
      featured: false,
      tags: ['Dollar Cost Averaging', 'Market Timing', 'Strategy'],
      actionSteps: [
        'Understand market volatility patterns',
        'Set up systematic investment schedules',
        'Ignore short-term market noise',
        'Focus on long-term wealth creation',
        'Review and stay disciplined during market downturns'
      ]
    },
    {
      id: '6',
      title: 'Retirement Planning: Starting Early for Financial Freedom',
      description: 'Create a comprehensive retirement plan that ensures financial independence and a comfortable lifestyle post-retirement.',
      category: 'Wealth Building',
      difficulty: 'Intermediate',
      readTime: '12 min read',
      likes: 234,
      featured: true,
      tags: ['Retirement Planning', 'Financial Freedom', 'Long-term Goals'],
      actionSteps: [
        'Calculate retirement corpus needed',
        'Start investing early to leverage compounding',
        'Mix equity and debt based on age',
        'Consider NPS and pension plans',
        'Review and adjust goals every 5 years'
      ]
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTips(sampleTips);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredTips = tips.filter(tip => {
    const categoryMatch = selectedCategory === 'All' || tip.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || tip.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const featuredTips = tips.filter(tip => tip.featured);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'Advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading investment tips...</p>
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
              Investment <span className="text-emerald-400">Tips</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto text-center blog-subtitle-only">
              Expert guidance and actionable strategies to help you make smarter investment decisions
            </p>
          </motion.div>

          {/* Tip Categories Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {tipCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-emerald-400">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {category.description}
                </p>
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

            {/* Difficulty Filter */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Difficulty Level</h3>
              <div className="flex flex-wrap gap-3">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 text-sm ${
                      selectedDifficulty === difficulty
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600'
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tips */}
      {selectedCategory === 'All' && selectedDifficulty === 'All' && (
        <section className="px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-white mb-8 flex items-center gap-3"
            >
              <Star className="text-emerald-400" />
              Featured Tips
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredTips.slice(0, 2).map((tip, index) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                        {tip.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(tip.difficulty)}`}>
                        {tip.difficulty}
                      </span>
                      <span className="text-slate-400 text-sm flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        Featured
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                      {tip.title}
                    </h3>
                    
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      {tip.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {tip.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {tip.likes} likes
                        </span>
                      </div>
                    </div>

                    {/* Action Steps Preview */}
                    <div className="bg-slate-700/30 rounded-xl p-4 mb-6">
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4 text-emerald-400" />
                        Quick Action Steps
                      </h4>
                      <ul className="space-y-2">
                        {tip.actionSteps.slice(0, 3).map((step, i) => (
                          <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">•</span>
                            {step}
                          </li>
                        ))}
                        {tip.actionSteps.length > 3 && (
                          <li className="text-sm text-slate-400 italic">
                            +{tip.actionSteps.length - 3} more steps...
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <button 
                      onClick={() => window.open(`/blog/investment-tips/${tip.id}`, '_blank')}
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group"
                    >
                      Read Full Guide
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Tips */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <Lightbulb className="text-emerald-400" />
            {selectedCategory === 'All' && selectedDifficulty === 'All' ? 'All Tips' : 'Filtered Tips'}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTips.map((tip, index) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                      {tip.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tip.difficulty)}`}>
                      {tip.difficulty}
                    </span>
                    {tip.featured && (
                      <span className="text-yellow-400 text-xs flex items-center gap-1">
                        <Star className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {tip.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-4 text-sm leading-relaxed line-clamp-3">
                    {tip.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tip.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-700/50 text-slate-400 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {tip.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {tip.likes}
                    </span>
                  </div>
                  
                  <button className="w-full flex items-center justify-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 py-2 rounded-lg transition-colors group text-sm">
                    View Guide
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredTips.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Lightbulb className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">No tips found</h3>
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
          <Lightbulb className="w-12 h-12 text-emerald-400 mb-4" />
          <h3 className="text-3xl font-bold text-white mb-4">
            Get Weekly Investment Tips
          </h3>
          <p className="text-slate-300 mb-8 max-w-2xl text-center">
            Receive expert investment strategies and actionable tips directly in your inbox every week
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

export default InvestmentTipsPage;
