'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Users, MessageSquare, ThumbsUp, Star, Award, Clock, Eye, Search, Plus, CheckCircle, AlertCircle } from 'lucide-react';
import '../../../styles/blog-center-fix.css';

const QAHubPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Questions', count: 2847 },
    { id: 'mutual-funds', name: 'Mutual Funds', count: 1245 },
    { id: 'sip-planning', name: 'SIP Planning', count: 678 },
    { id: 'tax-planning', name: 'Tax Planning', count: 456 },
    { id: 'portfolio-review', name: 'Portfolio Review', count: 234 }
  ];

  const featuredQuestions = [
    {
      id: 1,
      title: "Should I continue SIP during market crash or pause it?",
      askedBy: "Rahul Sharma",
      category: "SIP Planning",
      views: 15600,
      upvotes: 234,
      answers: 18,
      timeAgo: "2 hours ago",
      status: "expert-verified",
      description: "I've been doing SIP of ₹25,000 monthly for last 3 years. With current market volatility, should I pause my SIPs or continue?",
      bestAnswer: {
        author: "Dr. Rajesh Mehta",
        authorTitle: "CIO, HDFC AMC",
        content: "Continue your SIPs! Market crashes are the best time to accumulate more units at lower prices.",
        upvotes: 189
      }
    },
    {
      id: 2,
      title: "How to build ₹1 crore corpus in 10 years with ₹5000 monthly SIP?",
      askedBy: "Priya Patel",
      category: "Mutual Funds",
      views: 12400,
      upvotes: 178,
      answers: 12,
      timeAgo: "5 hours ago",
      status: "answered",
      description: "I'm 25 years old and want to accumulate ₹1 crore by age 35. Can I achieve this with ₹5000 monthly SIP?"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-8 text-center community-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <HelpCircle className="w-16 h-16 text-emerald-400" />
            <h1 className="text-6xl font-bold text-white">
              Q&A <span className="text-emerald-400">Hub</span>
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-8 dynamic-center-text hero-subtitle-dynamic">
            Get expert answers to your investment questions. Connect with India's top financial professionals and experienced investors for personalized guidance.
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
                      placeholder="Search questions, topics, or keywords..."
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

          <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-2xl font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-3 mx-auto">
            <Plus className="w-5 h-5" />
            Ask Your Question
          </button>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 mb-12 p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50"
          >
            <div className="flex items-center gap-3 text-center">
              <MessageSquare className="w-6 h-6 text-emerald-400" />
              <div>
                <div className="text-2xl font-bold text-white">2,847</div>
                <div className="text-sm text-slate-400">Total Questions</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-white">2,456</div>
                <div className="text-sm text-slate-400">Answered</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center">
              <Award className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold text-white">567</div>
                <div className="text-sm text-slate-400">Expert Verified</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center">
              <Users className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-white">156</div>
                <div className="text-sm text-slate-400">Active Experts</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 scale-105'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600 hover:border-emerald-500/50'
                }`}
              >
                {category.name} ({category.count})
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Questions */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3"
          >
            <Star className="text-emerald-400" />
            Featured Questions
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredQuestions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  {question.status === 'expert-verified' ? (
                    <Award className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                    {question.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 hover:text-emerald-400 transition-colors cursor-pointer">
                  {question.title}
                </h3>
                
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {question.description}
                </p>

                <div className="flex items-center justify-between mb-6 text-sm text-slate-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {question.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {question.upvotes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {question.answers}
                    </div>
                  </div>
                  <div>by {question.askedBy} • {question.timeAgo}</div>
                </div>

                {question.bestAnswer && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Award className="w-5 h-5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Best Answer</span>
                    </div>
                    <p className="text-white font-semibold mb-1">{question.bestAnswer.author}</p>
                    <p className="text-emerald-400 text-sm mb-3">{question.bestAnswer.authorTitle}</p>
                    <p className="text-slate-300 mb-3">{question.bestAnswer.content}</p>
                    <div className="flex items-center gap-1 text-emerald-400 text-sm">
                      <ThumbsUp className="w-4 h-4" />
                      {question.bestAnswer.upvotes} helpful
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default QAHubPage;
