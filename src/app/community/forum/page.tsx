'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, TrendingUp, Clock, Heart, Reply, Pin, Award, Search, Filter, Eye, ThumbsUp, MessageSquare, Star, Shield, Zap, Globe, BarChart3 } from 'lucide-react';
import '../../../styles/blog-center-fix.css';

const CommunityForumPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Discussions', count: 1247, color: 'blue' },
    { id: 'mutual-funds', name: 'Mutual Funds', count: 456, color: 'green' },
    { id: 'stocks', name: 'Stocks', count: 389, color: 'purple' },
    { id: 'sip-strategies', name: 'SIP Strategies', count: 234, color: 'orange' },
    { id: 'market-analysis', name: 'Market Analysis', count: 168, color: 'red' }
  ];

  const pinnedDiscussions = [
    {
      id: 1,
      title: "📌 Welcome to SIP Brewery Community - Read First!",
      author: "SIP Brewery Team",
      authorBadge: "Official",
      category: "Announcements",
      replies: 89,
      views: 5647,
      lastActivity: "2 hours ago",
      isPinned: true,
      isHot: false
    },
    {
      id: 2,
      title: "📌 Community Guidelines and Best Practices",
      author: "Moderator",
      authorBadge: "Moderator",
      category: "Guidelines",
      replies: 23,
      views: 2134,
      lastActivity: "1 day ago",
      isPinned: true,
      isHot: false
    }
  ];

  const discussions = [
    {
      id: 3,
      title: "🔥 Which mutual fund is best for 2024? Share your picks!",
      author: "InvestorPro",
      authorBadge: "Expert",
      category: "Mutual Funds",
      replies: 156,
      views: 8934,
      lastActivity: "5 minutes ago",
      isPinned: false,
      isHot: true,
      likes: 89
    },
    {
      id: 4,
      title: "SIP vs Lump Sum: My 5-year experiment results",
      author: "DataDrivenInvestor",
      authorBadge: "Verified",
      category: "SIP Strategies",
      replies: 78,
      views: 4567,
      lastActivity: "12 minutes ago",
      isPinned: false,
      isHot: true,
      likes: 134
    },
    {
      id: 5,
      title: "Market crash incoming? How to protect your portfolio",
      author: "RiskManager",
      authorBadge: "Expert",
      category: "Market Analysis",
      replies: 234,
      views: 12456,
      lastActivity: "23 minutes ago",
      isPinned: false,
      isHot: true,
      likes: 267
    },
    {
      id: 6,
      title: "HDFC vs ICICI vs SBI: Large cap fund comparison",
      author: "FundAnalyst",
      authorBadge: "Verified",
      category: "Mutual Funds",
      replies: 45,
      views: 2890,
      lastActivity: "1 hour ago",
      isPinned: false,
      isHot: false,
      likes: 56
    },
    {
      id: 7,
      title: "Started SIP with ₹1000, now at ₹10 lakhs! AMA",
      author: "SuccessStory",
      authorBadge: "Member",
      category: "Success Stories",
      replies: 189,
      views: 15678,
      lastActivity: "2 hours ago",
      isPinned: false,
      isHot: false,
      likes: 445
    },
    {
      id: 8,
      title: "Tax saving ELSS funds - which ones to avoid?",
      author: "TaxSaver",
      authorBadge: "Member",
      category: "Mutual Funds",
      replies: 67,
      views: 3456,
      lastActivity: "3 hours ago",
      isPinned: false,
      isHot: false,
      likes: 78
    },
    {
      id: 9,
      title: "AI predictions vs human analysis - who wins?",
      author: "TechInvestor",
      authorBadge: "Verified",
      category: "Market Analysis",
      replies: 123,
      views: 6789,
      lastActivity: "4 hours ago",
      isPinned: false,
      isHot: false,
      likes: 156
    },
    {
      id: 10,
      title: "Small cap funds: Hidden gems or risky bets?",
      author: "SmallCapFan",
      authorBadge: "Member",
      category: "Mutual Funds",
      replies: 89,
      views: 4321,
      lastActivity: "5 hours ago",
      isPinned: false,
      isHot: false,
      likes: 92
    }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Official': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'Moderator': return 'bg-gradient-to-r from-red-500 to-orange-500';
      case 'Expert': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'Verified': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.name === category);
    return cat?.color || 'gray';
  };

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
            <MessageCircle className="w-16 h-16 text-emerald-400" />
            <h1 className="text-6xl font-bold text-white">
              Community <span className="text-emerald-400">Forum</span>
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-8 dynamic-center-text hero-subtitle-dynamic">
            Join India's most sophisticated investment community. Connect with institutional-grade investors, share market insights, and accelerate your financial growth through collective intelligence.
          </p>
          
          {/* Search Bar - YouTube-Style Flex Design */}
          <div className="w-full flex justify-center mb-8">
            <div className="w-full max-w-2xl mx-auto">
              <div className="flex justify-center">
                <div className="w-full max-w-xl">
                  {/* YouTube-Style Flex Search Container */}
                  <div className="flex items-center bg-slate-800/50 border border-slate-600 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl focus-within:border-emerald-500 focus-within:shadow-emerald-500/25">
                    {/* Search Icon in Separate Flex Cell */}
                    <div className="flex items-center justify-center px-4 py-4 flex-shrink-0">
                      <Search className="w-5 h-5 text-slate-400" />
                    </div>
                    
                    {/* Search Input in Separate Flex Cell */}
                    <input
                      type="text"
                      placeholder="Search discussions, topics, or members..."
                      className="flex-1 py-4 bg-transparent text-white placeholder-slate-400 focus:outline-none min-w-0"
                    />
                    
                    {/* Search Button in Separate Flex Cell */}
                    <div className="flex-shrink-0 p-2">
                      <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Categories & Stats */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Live Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 mb-12 p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50"
          >
            <div className="flex items-center gap-3 text-center">
              <Users className="w-6 h-6 text-emerald-400" />
              <div>
                <div className="text-2xl font-bold text-white">45,678</div>
                <div className="text-sm text-slate-400">Active Members</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center">
              <MessageSquare className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-white">12,456</div>
                <div className="text-sm text-slate-400">Discussions</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center">
              <Eye className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-2xl font-bold text-white">1.2M</div>
                <div className="text-sm text-slate-400">Monthly Views</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center">
              <Zap className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold text-white">1,234</div>
                <div className="text-sm text-slate-400">Online Now</div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 group ${
                  selectedCategory === category.id
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 scale-105'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600 hover:border-emerald-500/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span>{category.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-700 text-slate-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400'
                  }`}>
                    {category.count.toLocaleString()}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Forum Content */}
      <div className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Main Forum */}
            <div className="lg:col-span-3">
              {/* New Discussion Button */}
              <div className="mb-8">
                <button className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Start New Discussion
                </button>
              </div>

              {/* Pinned Discussions */}
              {selectedCategory === 'all' && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Pin className="w-6 h-6 text-yellow-400" />
                    Pinned Discussions
                  </h2>
                  <div className="space-y-4">
                    {pinnedDiscussions.map((discussion) => (
                      <div
                        key={discussion.id}
                        className="bg-yellow-500/10 backdrop-blur-lg border border-yellow-400/30 rounded-2xl p-6 hover:bg-yellow-500/15 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-2">{discussion.title}</h3>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-300">by</span>
                                <span className="text-white font-semibold">{discussion.author}</span>
                                <span className={`px-2 py-1 ${getBadgeColor(discussion.authorBadge)} text-white text-xs rounded-full`}>
                                  {discussion.authorBadge}
                                </span>
                              </div>
                              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                                {discussion.category}
                              </span>
                            </div>
                          </div>
                          <div className="text-right text-sm text-gray-400">
                            <div className="flex items-center gap-4 mb-1">
                              <div className="flex items-center gap-1">
                                <Reply className="w-4 h-4" />
                                {discussion.replies}
                              </div>
                              <div>{discussion.views.toLocaleString()} views</div>
                            </div>
                            <div>{discussion.lastActivity}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Discussions */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                  {selectedCategory === 'all' ? 'Latest Discussions' : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer ${
                        discussion.isHot ? 'ring-1 ring-orange-400/50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {discussion.isHot && (
                              <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs font-semibold">
                                🔥 Hot
                              </span>
                            )}
                            <span className={`px-2 py-1 bg-${getCategoryColor(discussion.category)}-500/20 text-${getCategoryColor(discussion.category)}-300 rounded-full text-xs`}>
                              {discussion.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2 hover:text-blue-400 transition-colors">
                            {discussion.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-300">by</span>
                              <span className="text-white font-semibold">{discussion.author}</span>
                              <span className={`px-2 py-1 ${getBadgeColor(discussion.authorBadge)} text-white text-xs rounded-full`}>
                                {discussion.authorBadge}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-400">
                          <div className="flex items-center gap-4 mb-2">
                            <div className="flex items-center gap-1">
                              <Reply className="w-4 h-4" />
                              {discussion.replies}
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {discussion.likes}
                            </div>
                            <div>{discussion.views.toLocaleString()} views</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {discussion.lastActivity}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-8">
                  <button className="px-8 py-3 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
                    Load More Discussions
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Community Stats */}
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  Community Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Members</span>
                    <span className="text-white font-semibold">45,678</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Online Now</span>
                    <span className="text-green-400 font-semibold">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Discussions</span>
                    <span className="text-white font-semibold">12,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Posts</span>
                    <span className="text-white font-semibold">89,123</span>
                  </div>
                </div>
              </div>

              {/* Top Contributors */}
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Top Contributors
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'InvestorPro', posts: 1234, badge: 'Expert' },
                    { name: 'DataDrivenInvestor', posts: 987, badge: 'Verified' },
                    { name: 'RiskManager', posts: 756, badge: 'Expert' },
                    { name: 'FundAnalyst', posts: 543, badge: 'Verified' }
                  ].map((contributor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {contributor.name[0]}
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">{contributor.name}</div>
                          <span className={`px-2 py-1 ${getBadgeColor(contributor.badge)} text-white text-xs rounded-full`}>
                            {contributor.badge}
                          </span>
                        </div>
                      </div>
                      <span className="text-gray-400 text-sm">{contributor.posts}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <a href="/community/experts" className="block text-blue-400 hover:text-blue-300 transition-colors">
                    👥 Expert Discussions
                  </a>
                  <a href="/community/stories" className="block text-green-400 hover:text-green-300 transition-colors">
                    🏆 Success Stories
                  </a>
                  <a href="/community/qa" className="block text-purple-400 hover:text-purple-300 transition-colors">
                    ❓ Q&A Hub
                  </a>
                  <a href="/blog" className="block text-orange-400 hover:text-orange-300 transition-colors">
                    📝 Blog Articles
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityForumPage;
