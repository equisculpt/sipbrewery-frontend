'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Star, MessageCircle, Calendar, Clock, Eye, ThumbsUp, BookOpen, TrendingUp, Shield, Zap, Brain, Target, Globe, BarChart3, Video, Mic, FileText, ExternalLink } from 'lucide-react';
import '../../../styles/blog-center-fix.css';

const ExpertDiscussionsPage = () => {
  const [selectedExpertise, setSelectedExpertise] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');

  const expertiseAreas = [
    { id: 'all', name: 'All Experts', count: 156, color: 'emerald' },
    { id: 'mutual-funds', name: 'Mutual Funds', count: 45, color: 'blue' },
    { id: 'equity-research', name: 'Equity Research', count: 38, color: 'purple' },
    { id: 'portfolio-management', name: 'Portfolio Management', count: 32, color: 'orange' },
    { id: 'risk-management', name: 'Risk Management', count: 28, color: 'red' },
    { id: 'fintech-ai', name: 'FinTech & AI', count: 13, color: 'cyan' }
  ];

  const discussionFormats = [
    { id: 'all', name: 'All Formats', icon: Globe },
    { id: 'live-sessions', name: 'Live Sessions', icon: Video },
    { id: 'ama', name: 'Ask Me Anything', icon: MessageCircle },
    { id: 'webinars', name: 'Webinars', icon: Mic },
    { id: 'case-studies', name: 'Case Studies', icon: FileText }
  ];

  const featuredExperts = [
    {
      id: 1,
      name: "Dr. Rajesh Mehta",
      title: "Chief Investment Officer",
      company: "HDFC Asset Management",
      expertise: ["Mutual Funds", "Portfolio Strategy"],
      experience: "25+ years",
      followers: 12500,
      rating: 4.9,
      totalSessions: 89,
      nextSession: "Market Outlook 2024",
      nextSessionDate: "Dec 15, 2024 at 3:00 PM",
      bio: "Former Goldman Sachs MD with expertise in emerging market investments and systematic portfolio construction.",
      achievements: ["CFA Charterholder", "Top Fund Manager 2023", "Author of 3 Investment Books"],
      avatar: "RM"
    },
    {
      id: 2,
      name: "Priya Sharma",
      title: "Head of Equity Research",
      company: "Kotak Securities",
      expertise: ["Equity Analysis", "Sector Research"],
      experience: "18+ years",
      followers: 8900,
      rating: 4.8,
      totalSessions: 67,
      nextSession: "Banking Sector Deep Dive",
      nextSessionDate: "Dec 18, 2024 at 4:30 PM",
      bio: "Ex-Morgan Stanley equity researcher specializing in Indian financial services and technology sectors.",
      achievements: ["Best Analyst Award 2022", "SEBI Research Analyst", "Featured in Economic Times"],
      avatar: "PS"
    },
    {
      id: 3,
      name: "Amit Kumar",
      title: "Quantitative Strategist",
      company: "Axis Asset Management",
      expertise: ["Risk Management", "Algorithmic Trading"],
      experience: "15+ years",
      followers: 6700,
      rating: 4.9,
      totalSessions: 45,
      nextSession: "AI in Portfolio Optimization",
      nextSessionDate: "Dec 20, 2024 at 2:00 PM",
      bio: "IIT Delhi alumnus with PhD in Financial Engineering, pioneering AI-driven investment strategies in India.",
      achievements: ["PhD Financial Engineering", "Patent Holder", "TEDx Speaker"],
      avatar: "AK"
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: "Market Volatility: Opportunity or Threat?",
      expert: "Dr. Rajesh Mehta",
      expertTitle: "CIO, HDFC AMC",
      date: "December 15, 2024",
      time: "3:00 PM IST",
      duration: "90 minutes",
      format: "Live Q&A Session",
      participants: 1250,
      maxParticipants: 2000,
      category: "Market Analysis",
      description: "Deep dive into current market conditions and how to position your portfolio for maximum returns while managing downside risk.",
      topics: ["Market Cycles", "Risk Assessment", "Portfolio Rebalancing", "Sector Rotation"],
      isLive: false,
      registrationFee: "Free for Premium Members"
    },
    {
      id: 2,
      title: "Banking Sector: Hidden Gems & Red Flags",
      expert: "Priya Sharma",
      expertTitle: "Head of Research, Kotak",
      date: "December 18, 2024",
      time: "4:30 PM IST",
      duration: "75 minutes",
      format: "Interactive Webinar",
      participants: 890,
      maxParticipants: 1500,
      category: "Sector Analysis",
      description: "Comprehensive analysis of banking sector opportunities, including PSU banks, private banks, and NBFCs.",
      topics: ["Credit Growth", "NPA Trends", "Digital Banking", "Regulatory Changes"],
      isLive: false,
      registrationFee: "₹299"
    },
    {
      id: 3,
      title: "AI Revolution in Investment Management",
      expert: "Amit Kumar",
      expertTitle: "Quant Strategist, Axis AMC",
      date: "December 20, 2024",
      time: "2:00 PM IST",
      duration: "120 minutes",
      format: "Technical Workshop",
      participants: 567,
      maxParticipants: 1000,
      category: "Technology & Innovation",
      description: "Explore how artificial intelligence is transforming portfolio management, risk assessment, and investment decision-making.",
      topics: ["Machine Learning Models", "Algorithmic Trading", "Risk Analytics", "Future Trends"],
      isLive: false,
      registrationFee: "₹599"
    }
  ];

  const pastSessions = [
    {
      id: 1,
      title: "SIP Success Stories: From ₹1000 to ₹1 Crore",
      expert: "Dr. Rajesh Mehta",
      date: "November 28, 2024",
      views: 15600,
      rating: 4.9,
      duration: "85 minutes",
      highlights: ["Power of Compounding", "Discipline in Investing", "Long-term Wealth Creation"]
    },
    {
      id: 2,
      title: "Decoding Mutual Fund Expense Ratios",
      expert: "Priya Sharma",
      date: "November 25, 2024",
      views: 12300,
      rating: 4.8,
      duration: "60 minutes",
      highlights: ["Cost Impact Analysis", "Direct vs Regular Plans", "Hidden Charges"]
    },
    {
      id: 3,
      title: "Crypto vs Traditional Assets: A Balanced View",
      expert: "Amit Kumar",
      date: "November 22, 2024",
      views: 18900,
      rating: 4.7,
      duration: "95 minutes",
      highlights: ["Risk Comparison", "Portfolio Allocation", "Regulatory Landscape"]
    }
  ];

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
            <Award className="w-16 h-16 text-emerald-400" />
            <h1 className="text-6xl font-bold text-white">
              Expert <span className="text-emerald-400">Discussions</span>
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-8 dynamic-center-text hero-subtitle-dynamic">
            Learn from India's top investment professionals. Join exclusive sessions with fund managers, research analysts, and portfolio strategists from leading financial institutions.
          </p>
          
          {/* Expert Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">156+</div>
              <div className="text-sm text-slate-400">Expert Contributors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">2,500+</div>
              <div className="text-sm text-slate-400">Hours of Content</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">45,000+</div>
              <div className="text-sm text-slate-400">Active Learners</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Expertise Areas */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {expertiseAreas.map((area, index) => (
              <motion.button
                key={area.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedExpertise(area.id)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  selectedExpertise === area.id
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600 hover:border-emerald-500/50'
                }`}
              >
                {area.name} ({area.count})
              </motion.button>
            ))}
          </motion.div>

          {/* Discussion Formats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {discussionFormats.map((format, index) => {
              const IconComponent = format.icon;
              return (
                <motion.button
                  key={format.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedFormat === format.id
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-800/30 text-slate-400 hover:bg-slate-700/30 border border-slate-700'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {format.name}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Experts */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3"
          >
            <Star className="text-emerald-400" />
            Featured Experts
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExperts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 group"
              >
                {/* Expert Avatar & Basic Info */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {expert.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{expert.name}</h3>
                  <p className="text-emerald-400 font-semibold mb-1">{expert.title}</p>
                  <p className="text-slate-400 text-sm mb-3">{expert.company}</p>
                  
                  {/* Rating & Stats */}
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">{expert.rating}</span>
                    </div>
                    <div className="text-slate-400 text-sm">
                      {expert.followers.toLocaleString()} followers
                    </div>
                  </div>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {expert.expertise.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bio */}
                <p className="text-slate-300 text-sm mb-6 text-center leading-relaxed">
                  {expert.bio}
                </p>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-2 text-center">Key Achievements</h4>
                  <div className="space-y-1">
                    {expert.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                        <Award className="w-3 h-3 text-emerald-400" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Session */}
                <div className="bg-slate-700/30 rounded-xl p-4 mb-6">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    Next Session
                  </h4>
                  <p className="text-emerald-400 font-medium text-sm mb-1">{expert.nextSession}</p>
                  <p className="text-slate-400 text-xs">{expert.nextSessionDate}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-colors text-sm">
                    Follow Expert
                  </button>
                  <button className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-colors text-sm">
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Sessions */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3"
          >
            <Calendar className="text-blue-400" />
            Upcoming Sessions
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
              >
                {/* Session Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                        {session.format}
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium">
                        {session.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{session.title}</h3>
                    <p className="text-slate-300 text-sm mb-4">{session.description}</p>
                  </div>
                </div>

                {/* Expert Info */}
                <div className="flex items-center gap-3 mb-6 p-4 bg-slate-700/30 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {session.expert.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{session.expert}</p>
                    <p className="text-emerald-400 text-sm">{session.expertTitle}</p>
                  </div>
                </div>

                {/* Session Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">{session.date}</p>
                      <p className="text-slate-400">{session.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-green-400" />
                    <div>
                      <p className="text-white font-medium">{session.duration}</p>
                      <p className="text-slate-400">Duration</p>
                    </div>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Key Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {session.topics.map((topic, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded-lg text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Registration Info */}
                <div className="flex items-center justify-between mb-6 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <div>
                    <p className="text-emerald-400 font-semibold text-sm">{session.registrationFee}</p>
                    <p className="text-slate-400 text-xs">{session.participants}/{session.maxParticipants} registered</p>
                  </div>
                  <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(session.participants / session.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors">
                  Register Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Sessions */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3"
          >
            <BookOpen className="text-purple-400" />
            Past Sessions Library
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer"
              >
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {session.title}
                </h3>
                <p className="text-emerald-400 font-semibold text-sm mb-4">{session.expert}</p>
                
                <div className="flex items-center justify-between mb-4 text-sm">
                  <span className="text-slate-400">{session.date}</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-blue-400" />
                      <span className="text-white">{session.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white">{session.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2 text-sm">Key Highlights</h4>
                  <div className="space-y-1">
                    {session.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                        <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{session.duration}</span>
                  <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors text-sm flex items-center gap-2">
                    Watch Now
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600 hover:border-purple-500/50 text-white rounded-xl font-semibold transition-all duration-300">
              View All Past Sessions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExpertDiscussionsPage;
