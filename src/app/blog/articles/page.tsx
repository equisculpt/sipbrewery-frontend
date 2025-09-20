'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, TrendingUp, BookOpen, Star } from 'lucide-react';
import '../../../styles/blog-center-fix.css';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  imageUrl: string;
}

const BlogArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Market Analysis', 'Investment Strategy', 'Technology', 'Regulatory', 'ASI Insights'];

  // Sample articles data - replace with API call
  const sampleArticles: Article[] = [
    {
      id: '1',
      title: 'The Future of AI-Powered Investment Management in India',
      excerpt: 'Exploring how artificial intelligence is revolutionizing portfolio management and investment decisions in the Indian financial market.',
      content: 'Full article content...',
      author: 'Dr. Rajesh Kumar',
      publishDate: '2024-01-15',
      readTime: '8 min read',
      category: 'Technology',
      tags: ['AI', 'Investment', 'Technology', 'India'],
      featured: true,
      imageUrl: '/api/placeholder/600/400'
    },
    {
      id: '2',
      title: 'SEBI\'s New Mutual Fund Regulations: What Investors Need to Know',
      excerpt: 'A comprehensive breakdown of the latest SEBI regulations and their impact on mutual fund investments.',
      content: 'Full article content...',
      author: 'Priya Sharma',
      publishDate: '2024-01-12',
      readTime: '6 min read',
      category: 'Regulatory',
      tags: ['SEBI', 'Regulations', 'Mutual Funds'],
      featured: false,
      imageUrl: '/api/placeholder/600/400'
    },
    {
      id: '3',
      title: 'Market Volatility: Strategies for Long-term Wealth Creation',
      excerpt: 'Understanding market cycles and building resilient investment portfolios during uncertain times.',
      content: 'Full article content...',
      author: 'Amit Patel',
      publishDate: '2024-01-10',
      readTime: '10 min read',
      category: 'Investment Strategy',
      tags: ['Market Analysis', 'Strategy', 'Wealth Creation'],
      featured: true,
      imageUrl: '/api/placeholder/600/400'
    },
    {
      id: '4',
      title: 'ESG Investing: The New Paradigm in Indian Markets',
      excerpt: 'How Environmental, Social, and Governance factors are reshaping investment decisions in India.',
      content: 'Full article content...',
      author: 'Sneha Gupta',
      publishDate: '2024-01-08',
      readTime: '7 min read',
      category: 'Investment Strategy',
      tags: ['ESG', 'Sustainable Investing', 'India'],
      featured: false,
      imageUrl: '/api/placeholder/600/400'
    },
    {
      id: '5',
      title: 'ASI Technology: Revolutionizing Portfolio Analysis',
      excerpt: 'Deep dive into our proprietary ASI (Artificial Super Intelligence) technology and its impact on investment outcomes.',
      content: 'Full article content...',
      author: 'Tech Team',
      publishDate: '2024-01-05',
      readTime: '12 min read',
      category: 'ASI Insights',
      tags: ['ASI', 'Technology', 'Portfolio Analysis'],
      featured: true,
      imageUrl: '/api/placeholder/600/400'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setArticles(sampleArticles);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticles = articles.filter(article => article.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading articles...</p>
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
              Latest <span className="text-emerald-400">Articles</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto text-center blog-subtitle-only">
              Stay informed with our expert insights on markets, technology, and investment strategies
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
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

      {/* Featured Articles */}
      {selectedCategory === 'All' && featuredArticles.length > 0 && (
        <section className="px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-white mb-8 flex items-center gap-3"
            >
              <Star className="text-emerald-400" />
              Featured Articles
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.slice(0, 2).map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-slate-700/20 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-emerald-400/50" />
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                      <span className="text-slate-400 text-sm flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        Featured
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {article.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.publishDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => window.open(`/blog/articles/${article.id}`, '_blank')}
                        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group"
                      >
                        Read More
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

      {/* All Articles */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <TrendingUp className="text-emerald-400" />
            {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-slate-700/20 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-emerald-400/50" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                    {article.featured && (
                      <span className="text-yellow-400 text-xs flex items-center gap-1">
                        <Star className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-4 text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {new Date(article.publishDate).toLocaleDateString()}
                    </span>
                    
                    <button 
                      onClick={() => window.open(`/blog/articles/${article.id}`, '_blank')}
                      className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors group text-sm"
                    >
                      Read
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">No articles found</h3>
              <p className="text-slate-500">Try selecting a different category</p>
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
          <h3 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Market Insights
          </h3>
          <p className="text-slate-300 mb-8 max-w-2xl text-center">
            Get the latest articles, market updates, and investment insights delivered to your inbox
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

export default BlogArticlesPage;
