'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, DollarSign, Target, Award, Heart, Share2, User, Star, Trophy, Zap, Eye, MessageSquare, BookOpen, ArrowRight, Filter, Search } from 'lucide-react';
import '../../../styles/blog-center-fix.css';

const SuccessStoriesPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Stories', count: 156 },
    { id: 'sip-journey', name: 'SIP Journey', count: 89 },
    { id: 'first-crore', name: 'First Crore', count: 34 },
    { id: 'early-retirement', name: 'Early Retirement', count: 23 },
    { id: 'goal-achieved', name: 'Goal Achieved', count: 67 }
  ];

  const featuredStories = [
    {
      id: 1,
      title: "From ₹5,000 SIP to ₹2 Crore Portfolio in 12 Years",
      author: "Anita Desai",
      profession: "Software Engineer",
      age: 34,
      location: "Bangalore",
      timeline: "12 years",
      initialAmount: "₹5,000/month",
      currentValue: "₹2.1 Crore",
      returns: "+18.5% CAGR",
      category: "SIP Journey",
      excerpt: "Started with just ₹5,000 monthly SIP in 2012. Through disciplined investing and smart fund selection, built a corpus that changed my family's future.",
      keyLearnings: [
        "Consistency beats timing the market",
        "Diversification across fund categories",
        "Increasing SIP with salary hikes",
        "Never panic during market crashes"
      ],
      likes: 1247,
      shares: 89,
      featured: true,
      image: "👩‍💻"
    },
    {
      id: 2,
      title: "Retired at 45 with ₹5 Crore Through Smart Investing",
      author: "Rajesh Kumar",
      profession: "Marketing Manager",
      age: 45,
      location: "Mumbai",
      timeline: "20 years",
      initialAmount: "₹8,000/month",
      currentValue: "₹5.2 Crore",
      returns: "+16.8% CAGR",
      category: "Early Retirement",
      excerpt: "Achieved financial independence at 45 through systematic investing in equity mutual funds and smart asset allocation.",
      keyLearnings: [
        "Start early, even with small amounts",
        "Equity funds for long-term wealth",
        "Regular portfolio rebalancing",
        "Living below means is crucial"
      ],
      likes: 2156,
      shares: 134,
      featured: true,
      image: "👨‍💼"
    },
    {
      id: 3,
      title: "House Down Payment Achieved in 5 Years with Goal-Based SIP",
      author: "Priya Sharma",
      profession: "Doctor",
      age: 29,
      location: "Delhi",
      timeline: "5 years",
      initialAmount: "₹15,000/month",
      currentValue: "₹12 Lakh",
      returns: "+14.2% CAGR",
      category: "Goal Achieved",
      excerpt: "Saved for house down payment through dedicated SIP strategy. Achieved target amount 6 months ahead of schedule.",
      keyLearnings: [
        "Goal-based investing works",
        "Hybrid funds for medium-term goals",
        "Step-up SIP increases returns",
        "Discipline over market emotions"
      ],
      likes: 892,
      shares: 67,
      featured: true,
      image: "👩‍⚕️"
    }
  ];

  const regularStories = [
    {
      id: 4,
      title: "Student to Investor: Built ₹50 Lakh by Age 28",
      author: "Arjun Patel",
      profession: "Data Scientist",
      age: 28,
      location: "Pune",
      timeline: "6 years",
      initialAmount: "₹2,000/month",
      currentValue: "₹52 Lakh",
      returns: "+19.3% CAGR",
      category: "SIP Journey",
      excerpt: "Started investing during college with pocket money. Small amounts compounded into significant wealth.",
      likes: 567,
      shares: 45,
      image: "👨‍🎓"
    },
    {
      id: 5,
      title: "Single Mother's Journey to Financial Independence",
      author: "Meera Joshi",
      profession: "Teacher",
      age: 38,
      location: "Ahmedabad",
      timeline: "8 years",
      initialAmount: "₹7,000/month",
      currentValue: "₹85 Lakh",
      returns: "+17.1% CAGR",
      category: "First Crore",
      excerpt: "Overcame financial challenges as single mother to build substantial corpus for daughter's education.",
      likes: 1834,
      shares: 156,
      image: "👩‍🏫"
    },
    {
      id: 6,
      title: "From Debt to Wealth: Complete Financial Turnaround",
      author: "Vikram Singh",
      profession: "Sales Manager",
      age: 42,
      location: "Jaipur",
      timeline: "10 years",
      initialAmount: "₹3,000/month",
      currentValue: "₹78 Lakh",
      returns: "+15.9% CAGR",
      category: "SIP Journey",
      excerpt: "Cleared all debts and built wealth through disciplined SIP investing and lifestyle changes.",
      likes: 723,
      shares: 89,
      image: "👨‍💼"
    }
  ];

  const allStories = [...featuredStories, ...regularStories];
  const filteredStories = selectedFilter === 'all' 
    ? allStories 
    : allStories.filter(story => story.category.toLowerCase().replace(' ', '-') === selectedFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Trophy className="w-16 h-16 text-emerald-400" />
            <h1 className="text-6xl font-bold text-white">
              Success <span className="text-emerald-400">Stories</span>
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-8 dynamic-center-text hero-subtitle-dynamic">
            Real investors, extraordinary journeys, life-changing wealth creation. Discover how ordinary Indians built extraordinary fortunes through disciplined investing and smart financial planning.
          </p>
          
          {/* Impact Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">₹450+ Cr</div>
              <div className="text-sm text-slate-400">Total Wealth Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">18.5%</div>
              <div className="text-sm text-slate-400">Average CAGR</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">156+</div>
              <div className="text-sm text-slate-400">Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">12.5</div>
              <div className="text-sm text-slate-400">Avg Years to Success</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Filters */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {filters.map((filter, index) => (
              <motion.button
                key={filter.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 group ${
                  selectedFilter === filter.id
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 scale-105'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600 hover:border-emerald-500/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span>{filter.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedFilter === filter.id
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-700 text-slate-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400'
                  }`}>
                    {filter.count}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Stories */}
      {selectedFilter === 'all' && (
        <div className="px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                ⭐ Featured Success Stories
              </span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <div className="text-6xl mb-4">{story.image}</div>
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4 line-clamp-2">
                      {story.title}
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-white font-semibold">{story.author}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400">{story.profession}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>📍 {story.location}</span>
                        <span>🎂 {story.age} years</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-green-500/20 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-400">{story.currentValue}</div>
                        <div className="text-gray-400 text-sm">Current Value</div>
                      </div>
                      <div className="bg-blue-500/20 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-blue-400">{story.returns}</div>
                        <div className="text-gray-400 text-sm">Returns</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6 line-clamp-3">{story.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-gray-400">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {story.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="w-4 h-4" />
                          {story.shares}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                        {story.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Stories */}
      <div className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              💼 {selectedFilter === 'all' ? 'More Success Stories' : filters.find(f => f.id === selectedFilter)?.name}
            </span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredStories.slice(selectedFilter === 'all' ? 3 : 0).map((story) => (
              <div
                key={story.id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer"
              >
                <div className="flex gap-6">
                  <div className="text-5xl">{story.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                        {story.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                      {story.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-white font-semibold">{story.author}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400">{story.profession}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>📍 {story.location}</span>
                        <span>⏱️ {story.timeline}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-green-500/20 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-green-400">{story.currentValue}</div>
                        <div className="text-gray-400 text-xs">Portfolio Value</div>
                      </div>
                      <div className="bg-blue-500/20 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-blue-400">{story.returns}</div>
                        <div className="text-gray-400 text-xs">CAGR Returns</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{story.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-gray-400 text-sm">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {story.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="w-4 h-4" />
                          {story.shares}
                        </div>
                      </div>
                      <button className="text-green-400 hover:text-green-300 transition-colors text-sm font-semibold">
                        Read Full Story →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300">
              Load More Stories
            </button>
          </div>
        </div>
      </div>

      {/* Share Your Story CTA */}
      <section className="pt-24 pb-16 px-8 text-center community-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Award className="w-16 h-16 text-emerald-400" />
            <h1 className="text-6xl font-bold text-white">
              Share Your <span className="text-emerald-400">Success Story</span>
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-8 dynamic-center-text hero-subtitle-dynamic">
            Inspire others with your investment journey. Your story could help thousands of investors achieve their financial goals.
          </p>
          
          <div className="flex justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-500/80 to-blue-500/80 backdrop-blur-lg border border-white/20 text-white rounded-2xl font-semibold hover:from-emerald-400/90 hover:to-blue-400/90 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-500 flex items-center gap-3 group">
              <Award className="w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
              Submit Your Story
            </button>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <div className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">156</div>
              <div className="text-gray-400">Success Stories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center">
              <DollarSign className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">₹45 Cr</div>
              <div className="text-gray-400">Total Wealth Created</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center">
              <Target className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">17.2%</div>
              <div className="text-gray-400">Avg CAGR</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center">
              <Calendar className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">8.5</div>
              <div className="text-gray-400">Avg Years</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoriesPage;
