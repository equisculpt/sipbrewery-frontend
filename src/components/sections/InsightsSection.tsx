'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, TrendingUp, Brain, BarChart3, User, Eye } from 'lucide-react';

const InsightsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const [insights, setInsights] = useState<any[]>([]);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  const fetchASIInsights = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/asi/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'deep_forecast',
          data: {},
          parameters: {}
        })
      });
      if (!response.ok) throw new Error('ASI backend error');
      const data = await response.json();
      const asiResult = data.result || data;
      if (asiResult && Array.isArray(asiResult.insights)) {
        setInsights(asiResult.insights);
      } else {
        throw new Error('ASI returned no insights');
      }
    } catch (error) {
      console.error('❌ Failed to fetch ASI insights:', error);
      // Fallback to static insights
      setInsights([
        {
          id: 1,
          category: "Market Analysis",
          title: "Why Smart SIP Outperformed During Market Volatility",
          excerpt: "Our AI detected early warning signals and adjusted SIP amounts 48 hours before the market correction, resulting in 23% better performance.",
          author: "AI Research Team",
          readTime: "5 min read",
          date: "Dec 15, 2024",
          views: "12.5K",
          image: "/api/placeholder/400/250",
          tags: ["AI", "Market Analysis", "Performance"],
          color: "from-purple-500 to-pink-500"
        },
        {
          id: 2,
          category: "Investment Strategy",
          title: "The Science Behind Dynamic SIP Allocation",
          excerpt: "Deep dive into our proprietary algorithms that analyze 15+ market indicators to optimize your investment timing and amounts.",
          author: "Dr. Priya Sharma",
          readTime: "8 min read",
          date: "Dec 12, 2024",
          views: "8.7K",
          image: "/api/placeholder/400/250",
          tags: ["Strategy", "Algorithm", "Research"],
          color: "from-accent-neon to-blue-500"
        },
        {
          id: 3,
          category: "Success Story",
          title: "How Rajesh Increased Returns by 18% with Smart SIP",
          excerpt: "A real investor's journey from traditional SIP to Smart SIP, showcasing the power of AI-driven investment optimization.",
          author: "Success Stories Team",
          readTime: "6 min read",
          date: "Dec 10, 2024",
          views: "15.2K",
          image: "/api/placeholder/400/250",
          tags: ["Success Story", "Case Study", "Returns"],
          color: "from-accent-green to-green-500"
        },
        {
          id: 4,
          category: "Market Trends",
          title: "2024 Mutual Fund Market: AI Predictions vs Reality",
          excerpt: "Our AI's market predictions for 2024 were 94% accurate. Here's what we learned and what it means for 2025.",
          author: "Market Research Team",
          readTime: "10 min read",
          date: "Dec 8, 2024",
          views: "22.1K",
          image: "/api/placeholder/400/250",
          tags: ["Predictions", "Market Trends", "AI"],
          color: "from-orange-500 to-red-500"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  fetchASIInsights();
}, []);

  const stats = [
    { label: "Research Articles", value: "150+", icon: Brain },
    { label: "Market Insights", value: "500+", icon: BarChart3 },
    { label: "Success Stories", value: "1000+", icon: TrendingUp },
    { label: "Monthly Readers", value: "50K+", icon: User }
  ];

  return (
    <section id="insights" className="section-padding bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent-neon rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-green rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="display-title text-dark-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Market <span className="text-gradient">Insights</span> & Research
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Stay ahead with AI-powered market analysis, investment strategies, and success stories from our community of smart investors.
          </motion.p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-soft"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(0, 249, 255, 0.3)' }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-neon rounded-2xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-6 h-6 text-dark-900" />
              </motion.div>
              <div className="text-3xl font-bold text-accent-neon mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Insights Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {insights.map((insight, index) => (
            <motion.article
              key={insight.id}
              className="group relative bg-white rounded-3xl shadow-soft border border-gray-200 overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredCard(insight.id)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ y: -10, borderColor: 'rgba(0, 249, 255, 0.3)' }}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                {/* Placeholder for image */}
                <div className={`w-full h-full bg-gradient-to-br ${insight.color} opacity-80`} />
                
                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent"
                  animate={{ opacity: hoveredCard === insight.id ? 0.8 : 0.4 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-dark-900">
                  {insight.category}
                </div>

                {/* Views */}
                <div className="absolute top-4 right-4 flex items-center space-x-1 text-white/80 text-xs">
                  <Eye className="w-3 h-3" />
                  <span>{insight.views}</span>
                </div>

                {/* Animated Pattern */}
                {hoveredCard === insight.id && (
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-full h-full bg-grid" />
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-900 mb-3 group-hover:text-accent-neon transition-colors line-clamp-2">
                  {insight.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {insight.excerpt}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {insight.tags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">{insight.author}</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{insight.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{insight.date}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <motion.button
                  className="flex items-center space-x-2 text-accent-neon font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ x: 5 }}
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Hover Glow Effect */}
              {hoveredCard === insight.id && (
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent-neon/10 to-accent-green/10 blur-xl pointer-events-none"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-accent-neon/5 to-accent-green/5 rounded-3xl border border-accent-neon/20">
            <h3 className="text-2xl font-bold text-dark-900 mb-4">
              Stay Informed with Weekly Insights
            </h3>
            <p className="text-gray-600 mb-6">
              Get the latest market analysis, investment strategies, and AI insights delivered to your inbox every week.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-accent-neon focus:ring-2 focus:ring-accent-neon/20 outline-none transition-all"
              />
              <motion.button
                className="btn-primary px-6 py-3 whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe Now
              </motion.button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              No spam. Unsubscribe anytime. 50,000+ investors already subscribed.
            </p>
          </div>
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="btn-secondary text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center space-x-2">
              <span>View All Insights</span>
              <ArrowRight className="w-5 h-5" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default InsightsSection;
