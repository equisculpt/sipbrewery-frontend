'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Play, Award, Users, Clock, Star, TrendingUp, Target, Brain, Zap, Download, ArrowRight, Filter, Search, ChevronRight, Video, FileText, Headphones, Globe, Shield, DollarSign } from 'lucide-react';

const LearningCenterPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Topics', count: 156, icon: Globe, color: 'emerald' },
    { id: 'mutual-funds', name: 'Mutual Funds', count: 45, icon: TrendingUp, color: 'blue' },
    { id: 'sip-investing', name: 'SIP Investing', count: 38, icon: Target, color: 'purple' },
    { id: 'portfolio-management', name: 'Portfolio Management', count: 32, icon: Shield, color: 'orange' },
    { id: 'market-analysis', name: 'Market Analysis', count: 28, icon: Brain, color: 'pink' },
    { id: 'tax-planning', name: 'Tax Planning', count: 13, icon: DollarSign, color: 'cyan' }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const featuredCourses = [
    {
      id: 1,
      title: "Complete Mutual Fund Mastery",
      description: "Master mutual fund investing from basics to advanced portfolio strategies. Learn fund selection, risk management, and wealth creation techniques.",
      instructor: "Dr. Rajesh Mehta",
      instructorTitle: "CFA, Portfolio Manager",
      duration: "8 hours",
      lessons: 24,
      students: 12500,
      rating: 4.9,
      level: "Beginner to Advanced",
      category: "Mutual Funds",
      price: "₹2,999",
      originalPrice: "₹4,999",
      thumbnail: "📈",
      features: [
        "Live Q&A Sessions",
        "Downloadable Resources",
        "Certificate of Completion",
        "Lifetime Access"
      ],
      modules: [
        "Introduction to Mutual Funds",
        "Fund Categories & Types",
        "Risk Assessment & Management",
        "Portfolio Construction",
        "Tax Optimization Strategies",
        "Advanced Investment Techniques"
      ]
    },
    {
      id: 2,
      title: "SIP Strategy Masterclass",
      description: "Learn systematic investment planning strategies used by top wealth managers. Build disciplined investing habits for long-term wealth creation.",
      instructor: "Priya Sharma",
      instructorTitle: "Certified Financial Planner",
      duration: "6 hours",
      lessons: 18,
      students: 8900,
      rating: 4.8,
      level: "Beginner",
      category: "SIP Investing",
      price: "₹1,999",
      originalPrice: "₹2,999",
      thumbnail: "💰",
      features: [
        "Step-by-step SIP Setup",
        "Goal-based Planning Tools",
        "Market Timing Strategies",
        "Performance Tracking"
      ],
      modules: [
        "SIP Fundamentals",
        "Goal Setting & Planning",
        "Fund Selection for SIP",
        "Timing & Frequency Optimization",
        "Monitoring & Rebalancing"
      ]
    },
    {
      id: 3,
      title: "Advanced Portfolio Management",
      description: "Professional-grade portfolio management techniques used by institutional investors. Learn asset allocation, rebalancing, and risk optimization.",
      instructor: "Amit Kumar",
      instructorTitle: "CFA, Quantitative Analyst",
      duration: "12 hours",
      lessons: 36,
      students: 4500,
      rating: 4.9,
      level: "Advanced",
      category: "Portfolio Management",
      price: "₹4,999",
      originalPrice: "₹7,999",
      thumbnail: "🎯",
      features: [
        "Real Portfolio Case Studies",
        "Advanced Analytics Tools",
        "Institutional Strategies",
        "Risk Management Framework"
      ],
      modules: [
        "Modern Portfolio Theory",
        "Asset Allocation Models",
        "Risk Budgeting",
        "Performance Attribution",
        "Alternative Investments",
        "Behavioral Finance"
      ]
    }
  ];

  const quickLearningPaths = [
    {
      id: 1,
      title: "30-Day Investing Bootcamp",
      description: "Complete beginner to confident investor in 30 days",
      duration: "30 days",
      courses: 5,
      icon: Zap,
      color: "emerald",
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "SIP Mastery Track",
      description: "Become a systematic investment planning expert",
      duration: "2 weeks",
      courses: 3,
      icon: Target,
      color: "blue",
      difficulty: "Intermediate"
    },
    {
      id: 3,
      title: "Portfolio Pro Certification",
      description: "Professional portfolio management certification",
      duration: "6 weeks",
      courses: 8,
      icon: Award,
      color: "purple",
      difficulty: "Advanced"
    }
  ];

  const learningResources = [
    {
      type: "Video Courses",
      count: 89,
      icon: Video,
      description: "HD video lessons with expert instructors"
    },
    {
      type: "Interactive Guides",
      count: 156,
      icon: FileText,
      description: "Step-by-step written tutorials"
    },
    {
      type: "Podcasts",
      count: 67,
      icon: Headphones,
      description: "Audio content for learning on-the-go"
    },
    {
      type: "Live Webinars",
      count: 24,
      icon: Globe,
      description: "Real-time sessions with market experts"
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
            <BookOpen className="w-16 h-16 text-emerald-400" />
            <h1 className="text-6xl font-bold text-white">
              Learning <span className="text-emerald-400">Center</span>
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-8 dynamic-center-text hero-subtitle-dynamic">
            Master investing with world-class courses from industry experts. From beginner basics to advanced strategies, accelerate your financial education journey.
          </p>
          
          {/* Learning Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">156+</div>
              <div className="text-sm text-slate-400">Expert Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">25,000+</div>
              <div className="text-sm text-slate-400">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">4.9★</div>
              <div className="text-sm text-slate-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">500+</div>
              <div className="text-sm text-slate-400">Hours Content</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full flex justify-center mb-8">
            <div className="w-full max-w-2xl mx-auto">
              <div className="flex justify-center">
                <div className="w-full max-w-xl">
                  <div className="flex items-center bg-slate-800/50 border border-slate-600 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl focus-within:border-emerald-500 focus-within:shadow-emerald-500/25">
                    <div className="flex items-center justify-center px-4 py-4 flex-shrink-0">
                      <Search className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search courses, topics, or instructors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 py-4 bg-transparent text-white placeholder-slate-400 focus:outline-none min-w-0"
                    />
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

      {/* Categories & Filters */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                    selectedCategory === category.id
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 scale-105'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600 hover:border-emerald-500/50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.name} ({category.count})
                </motion.button>
              );
            })}
          </motion.div>

          {/* Level Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center gap-4 mb-12"
          >
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  selectedLevel === level.id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-800/30 text-slate-400 hover:bg-slate-700/30 border border-slate-700'
                }`}
              >
                {level.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Learning Paths */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3"
          >
            <Zap className="text-emerald-400" />
            Quick Learning Paths
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {quickLearningPaths.map((path, index) => {
              const IconComponent = path.icon;
              return (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-800/30 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300 group cursor-pointer"
                >
                  <IconComponent className={`w-12 h-12 text-${path.color}-400 mb-4 group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className="text-xl font-bold text-white mb-2">{path.title}</h3>
                  <p className="text-slate-300 mb-4">{path.description}</p>
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <span>{path.duration}</span>
                    <span>{path.courses} courses</span>
                    <span className={`px-2 py-1 bg-${path.color}-500/20 text-${path.color}-400 rounded-full text-xs`}>
                      {path.difficulty}
                    </span>
                  </div>
                  <button className="w-full py-2 bg-emerald-500/20 text-emerald-400 rounded-xl font-semibold hover:bg-emerald-500/30 transition-colors">
                    Start Learning Path
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3"
          >
            <Star className="text-emerald-400" />
            Featured Courses
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/30 backdrop-blur-lg border border-slate-700/50 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 group"
              >
                {/* Course Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center">
                  <div className="text-6xl">{course.thumbnail}</div>
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">{course.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Course Header */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                        {course.category}
                      </span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                        {course.level}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-300 text-sm line-clamp-2">{course.description}</p>
                  </div>

                  {/* Instructor Info */}
                  <div className="flex items-center gap-3 mb-4 p-3 bg-slate-700/30 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {course.instructor.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{course.instructor}</p>
                      <p className="text-emerald-400 text-xs">{course.instructorTitle}</p>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
                    <div className="text-center">
                      <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                      <div className="text-white font-medium">{course.duration}</div>
                      <div className="text-slate-400 text-xs">Duration</div>
                    </div>
                    <div className="text-center">
                      <Play className="w-4 h-4 text-green-400 mx-auto mb-1" />
                      <div className="text-white font-medium">{course.lessons}</div>
                      <div className="text-slate-400 text-xs">Lessons</div>
                    </div>
                    <div className="text-center">
                      <Users className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                      <div className="text-white font-medium">{course.students.toLocaleString()}</div>
                      <div className="text-slate-400 text-xs">Students</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2 text-sm">What's Included:</h4>
                    <div className="space-y-1">
                      {course.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                          <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">{course.price}</div>
                      <div className="text-sm text-slate-400 line-through">{course.originalPrice}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 font-semibold text-sm">
                        {Math.round((1 - parseInt(course.price.replace(/[₹,]/g, '')) / parseInt(course.originalPrice.replace(/[₹,]/g, ''))) * 100)}% OFF
                      </div>
                      <div className="text-slate-400 text-xs">Limited Time</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-colors text-sm">
                      Enroll Now
                    </button>
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-12 text-center"
          >
            Learning <span className="text-emerald-400">Resources</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningResources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-800/30 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6 text-center hover:border-emerald-500/50 transition-all duration-300 group"
                >
                  <IconComponent className="w-12 h-12 text-emerald-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-white mb-2">{resource.type}</h3>
                  <div className="text-3xl font-bold text-emerald-400 mb-2">{resource.count}+</div>
                  <p className="text-slate-300 text-sm">{resource.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-lg border border-emerald-500/30 rounded-3xl p-12">
            <Brain className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Start Learning Today
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join thousands of successful investors who transformed their financial future through our expert-led courses and comprehensive learning resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-emerald-500/80 to-blue-500/80 backdrop-blur-lg border border-white/20 text-white rounded-2xl font-semibold hover:from-emerald-400/90 hover:to-blue-400/90 hover:scale-105 transition-all duration-300 flex items-center gap-3 justify-center">
                <Play className="w-5 h-5" />
                Browse All Courses
              </button>
              <button className="px-8 py-4 bg-slate-800/50 border border-slate-600 text-white rounded-2xl font-semibold hover:bg-slate-700/50 transition-all duration-300">
                Free Trial Available
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default LearningCenterPage;
