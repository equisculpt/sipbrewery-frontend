'use client';

import React, { useState } from 'react';
import { Calendar, User, TrendingUp, MessageCircle, Eye, Heart, Share2, BookOpen } from 'lucide-react';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Articles', count: 247 },
    { id: 'market-updates', name: 'Market Updates', count: 89 },
    { id: 'investment-tips', name: 'Investment Tips', count: 76 },
    { id: 'fsi-insights', name: 'FSI Insights', count: 45 },
    { id: 'success-stories', name: 'Success Stories', count: 37 }
  ];

  const featuredArticles = [
    {
      id: 1,
      title: "How AI is Revolutionizing Mutual Fund Selection in 2024",
      excerpt: "Discover how artificial intelligence and machine learning are transforming the way investors choose mutual funds, with real-world examples and performance data.",
      author: "Dr. Priya Sharma",
      date: "2024-01-12",
      category: "FSI Insights",
      readTime: "8 min read",
      views: 12847,
      likes: 234,
      comments: 45,
      image: "🤖",
      featured: true
    },
    {
      id: 2,
      title: "Market Outlook 2024: Top 10 Sectors to Watch",
      excerpt: "Our comprehensive analysis of market trends and sector performance predictions for the upcoming year, backed by data from 1000+ companies.",
      author: "Rajesh Kumar",
      date: "2024-01-10",
      category: "Market Updates",
      readTime: "12 min read",
      views: 8934,
      likes: 189,
      comments: 67,
      image: "📈",
      featured: true
    },
    {
      id: 3,
      title: "SIP Success Story: From ₹5,000 to ₹50 Lakhs in 15 Years",
      excerpt: "Meet Anita Desai, who built a corpus of ₹50 lakhs through disciplined SIP investing. Learn her strategy and key lessons for long-term wealth creation.",
      author: "Amit Patel",
      date: "2024-01-08",
      category: "Success Stories",
      readTime: "6 min read",
      views: 15623,
      likes: 456,
      comments: 123,
      image: "💰",
      featured: true
    }
  ];

  const recentArticles = [
    {
      id: 4,
      title: "Tax-Saving Mutual Funds: ELSS vs PPF Comparison 2024",
      excerpt: "Complete guide to choosing between ELSS mutual funds and PPF for tax saving under Section 80C.",
      author: "Sneha Agarwal",
      date: "2024-01-11",
      category: "Investment Tips",
      readTime: "10 min read",
      views: 6789,
      likes: 134,
      comments: 28,
      image: "💵"
    },
    {
      id: 5,
      title: "Quantum Computing in Financial Markets: The Future is Here",
      excerpt: "How quantum algorithms are being used to predict market movements and optimize portfolios.",
      author: "Dr. Vikram Singh",
      date: "2024-01-09",
      category: "FSI Insights",
      readTime: "15 min read",
      views: 4567,
      likes: 89,
      comments: 34,
      image: "⚛️"
    },
    {
      id: 6,
      title: "Mid-Cap Funds: Hidden Gems or Risky Bets?",
      excerpt: "Analyzing the performance of mid-cap mutual funds and their role in a diversified portfolio.",
      author: "Ravi Mehta",
      date: "2024-01-07",
      category: "Market Updates",
      readTime: "7 min read",
      views: 5432,
      likes: 112,
      comments: 19,
      image: "🎯"
    },
    {
      id: 7,
      title: "Building Your First Investment Portfolio: A Beginner's Guide",
      excerpt: "Step-by-step guide for new investors to build a balanced portfolio with mutual funds and SIPs.",
      author: "Meera Joshi",
      date: "2024-01-05",
      category: "Investment Tips",
      readTime: "9 min read",
      views: 9876,
      likes: 234,
      comments: 56,
      image: "🏗️"
    },
    {
      id: 8,
      title: "ESG Investing: The Sustainable Future of Mutual Funds",
      excerpt: "Understanding Environmental, Social, and Governance factors in mutual fund selection.",
      author: "Arjun Kapoor",
      date: "2024-01-03",
      category: "Market Updates",
      readTime: "11 min read",
      views: 3456,
      likes: 78,
      comments: 23,
      image: "🌱"
    },
    {
      id: 9,
      title: "From Engineer to Crorepati: Tech Professional's Investment Journey",
      excerpt: "How a software engineer achieved financial independence through smart mutual fund investments.",
      author: "Kavya Reddy",
      date: "2024-01-01",
      category: "Success Stories",
      readTime: "8 min read",
      views: 7890,
      likes: 167,
      comments: 45,
      image: "👨‍💻"
    }
  ];

  const allArticles = [...featuredArticles, ...recentArticles];
  const filteredArticles = selectedCategory === 'all' 
    ? allArticles 
    : allArticles.filter(article => article.category.toLowerCase().replace(' ', '-') === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                📝 SIP Brewery Blog
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Insights, analysis, and success stories from the world of smart investing
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-white/10 backdrop-blur-lg text-gray-300 hover:bg-white/20'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      {selectedCategory === 'all' && (
        <div className="px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                ⭐ Featured Articles
              </span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="p-8">
                    <div className="text-6xl mb-4 text-center">{article.image}</div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">{article.excerpt}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 font-semibold">{article.readTime}</span>
                      <div className="flex items-center gap-4 text-gray-400">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {article.likes}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Articles */}
      <div className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              📚 {selectedCategory === 'all' ? 'Recent Articles' : categories.find(c => c.id === selectedCategory)?.name}
            </span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredArticles.slice(selectedCategory === 'all' ? 3 : 0).map((article) => (
              <div
                key={article.id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer"
              >
                <div className="flex gap-6">
                  <div className="text-4xl">{article.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                      <span className="text-purple-400">{article.readTime}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-gray-400 text-xs">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {article.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {article.comments}
                        </div>
                      </div>
                      <button className="text-purple-400 hover:text-purple-300 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
              Load More Articles
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center">
            <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-4">
              Stay Updated with SIP Brewery
            </h3>
            <p className="text-gray-300 mb-6">
              Get the latest market insights, investment tips, and AI-powered analysis delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center">
              <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">247</div>
              <div className="text-gray-400">Articles Published</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center">
              <Eye className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">1.2M</div>
              <div className="text-gray-400">Total Views</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center">
              <Heart className="w-8 h-8 text-red-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">45K</div>
              <div className="text-gray-400">Likes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center">
              <MessageCircle className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">12K</div>
              <div className="text-gray-400">Comments</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
