'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Chart components will be loaded dynamically when needed
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import { Bar, Line, Doughnut } from 'react-chartjs-2';

/**
 * PREMIUM BLOG DISPLAY COMPONENT
 * Goldman Sachs-Quality Blog Presentation
 * 
 * Displays automated blogs with institutional-grade presentation
 * that will make Goldman Sachs fund managers bookmark our website.
 */

interface BlogPost {
  id: string;
  type: 'INVESTOR_EDUCATION' | 'IPO_ANALYSIS' | 'MUTUAL_FUND_ANALYSIS';
  title: string;
  content: {
    executive_summary: string;
    main_content: string;
    key_insights: string[];
    asi_predictions: any;
    investment_thesis: string;
    conclusion: string;
  };
  metadata: {
    goldman_sachs_rating: 'SUPERIOR' | 'EXCELLENT' | 'GOOD';
    reading_time: number;
    complexity_score: number;
    publication_date: string;
    asi_confidence: number;
  };
  interactive_elements: {
    charts: any[];
    tables: any[];
  };
  analytics: {
    views: number;
    professional_views: number;
    goldman_sachs_visits: number;
    engagement_score: number;
  };
}

export default function PremiumBlogDisplay() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'INVESTOR_EDUCATION' | 'IPO_ANALYSIS' | 'MUTUAL_FUND_ANALYSIS'>('ALL');
  const [goldmanSachsMode, setGoldmanSachsMode] = useState(false);

  // Mock data for demonstration
  const mockBlogs: BlogPost[] = [
    {
      id: 'EDU_2024_001',
      type: 'INVESTOR_EDUCATION',
      title: 'Advanced Portfolio Optimization: Institutional Strategies for Retail Investors',
      content: {
        executive_summary: 'This comprehensive analysis explores institutional-grade portfolio optimization techniques, making sophisticated strategies accessible to retail investors through ASI-powered insights.',
        main_content: 'Portfolio optimization has evolved significantly from traditional mean-variance models to sophisticated multi-factor approaches used by institutional investors...',
        key_insights: [
          'Modern portfolio theory limitations in real-world applications',
          'Factor-based investing strategies used by Goldman Sachs',
          'Risk parity approaches for volatile markets',
          'ASI-powered rebalancing algorithms'
        ],
        asi_predictions: {
          optimal_allocation: { equity: 65, debt: 25, alternatives: 10 },
          expected_return: 12.5,
          risk_level: 'MODERATE',
          confidence: 0.87
        },
        investment_thesis: 'Institutional-grade optimization democratized through ASI technology',
        conclusion: 'Retail investors can now access Goldman Sachs-level portfolio optimization'
      },
      metadata: {
        goldman_sachs_rating: 'SUPERIOR',
        reading_time: 12,
        complexity_score: 8.5,
        publication_date: '2024-01-23',
        asi_confidence: 0.94
      },
      interactive_elements: {
        charts: [
          {
            type: 'portfolio_allocation',
            title: 'Optimal Asset Allocation',
            data: {
              labels: ['Equity', 'Debt', 'Alternatives'],
              datasets: [{
                data: [65, 25, 10],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
              }]
            }
          }
        ],
        tables: [
          {
            title: 'Risk-Return Analysis',
            headers: ['Strategy', 'Expected Return', 'Volatility', 'Sharpe Ratio'],
            data: [
              ['Traditional 60/40', '8.5%', '12%', '0.71'],
              ['ASI Optimized', '12.5%', '14%', '0.89'],
              ['Goldman Sachs Model', '11.8%', '13.5%', '0.87']
            ]
          }
        ]
      },
      analytics: {
        views: 15420,
        professional_views: 3240,
        goldman_sachs_visits: 127,
        engagement_score: 94
      }
    },
    {
      id: 'ANALYSIS_2024_001',
      type: 'IPO_ANALYSIS',
      title: 'Tata Technologies IPO: Institutional-Grade Analysis & ASI Predictions',
      content: {
        executive_summary: 'Deep dive analysis of Tata Technologies IPO using institutional-grade methodologies and ASI-powered predictions that rival Goldman Sachs research quality.',
        main_content: 'Tata Technologies represents a compelling investment opportunity in the engineering services sector...',
        key_insights: [
          'Strong fundamentals with 25% revenue CAGR',
          'Dominant position in automotive engineering',
          'ASI predicts 40% upside potential post-listing',
          'Risk factors include client concentration'
        ],
        asi_predictions: {
          listing_price_range: { min: 920, max: 1150 },
          twelve_month_target: 1380,
          probability_of_success: 0.78,
          risk_level: 'MODERATE_HIGH'
        },
        investment_thesis: 'Engineering services digitization leader with strong moat',
        conclusion: 'STRONG BUY recommendation with institutional conviction'
      },
      metadata: {
        goldman_sachs_rating: 'SUPERIOR',
        reading_time: 18,
        complexity_score: 9.2,
        publication_date: '2024-01-23',
        asi_confidence: 0.91
      },
      interactive_elements: {
        charts: [
          {
            type: 'valuation_analysis',
            title: 'Valuation vs Peers',
            data: {
              labels: ['Tata Technologies', 'LTTS', 'Cyient', 'KPIT'],
              datasets: [{
                label: 'P/E Ratio',
                data: [28, 32, 25, 35],
                backgroundColor: '#36A2EB'
              }]
            }
          }
        ],
        tables: [
          {
            title: 'Financial Highlights',
            headers: ['Metric', 'FY23', 'FY24E', 'Growth'],
            data: [
              ['Revenue (₹Cr)', '3,062', '3,828', '25%'],
              ['EBITDA (₹Cr)', '520', '689', '32%'],
              ['Net Profit (₹Cr)', '389', '518', '33%']
            ]
          }
        ]
      },
      analytics: {
        views: 28750,
        professional_views: 8940,
        goldman_sachs_visits: 234,
        engagement_score: 97
      }
    }
  ];

  useEffect(() => {
    // Simulate loading blogs
    setTimeout(() => {
      setBlogs(mockBlogs);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBlogs = filter === 'ALL' ? blogs : blogs.filter(blog => blog.type === filter);

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'SUPERIOR': return 'text-green-400 bg-green-900/30 border-green-400';
      case 'EXCELLENT': return 'text-blue-400 bg-blue-900/30 border-blue-400';
      case 'GOOD': return 'text-yellow-400 bg-yellow-900/30 border-yellow-400';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'INVESTOR_EDUCATION': return '📚';
      case 'IPO_ANALYSIS': return '📊';
      case 'MUTUAL_FUND_ANALYSIS': return '💰';
      default: return '📝';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading Goldman Sachs-quality content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                💎 PREMIUM FINANCIAL INSIGHTS
              </h1>
              <p className="text-gray-300 mt-1">Goldman Sachs-Quality Analysis • ASI-Powered • Updated Daily</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setGoldmanSachsMode(!goldmanSachsMode)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  goldmanSachsMode 
                    ? 'bg-yellow-600 text-black' 
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {goldmanSachsMode ? '🏛️ Goldman Sachs Mode' : '🏛️ Enable GS Mode'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-8">
          {['ALL', 'INVESTOR_EDUCATION', 'IPO_ANALYSIS', 'MUTUAL_FUND_ANALYSIS'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType as any)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                filter === filterType
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {filterType.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500 transition-all cursor-pointer"
              onClick={() => setSelectedBlog(blog)}
            >
              {/* Blog Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{getTypeIcon(blog.type)}</span>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRatingColor(blog.metadata.goldman_sachs_rating)}`}>
                    {blog.metadata.goldman_sachs_rating}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                
                <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                  {blog.content.executive_summary}
                </p>
                
                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>📖 {blog.metadata.reading_time} min read</span>
                  <span>🧠 ASI: {(blog.metadata.asi_confidence * 100).toFixed(0)}%</span>
                  <span>📅 {blog.metadata.publication_date}</span>
                </div>
              </div>

              {/* Analytics */}
              <div className="p-4 bg-gray-900/50">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-400">{blog.analytics.views.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Total Views</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-400">{blog.analytics.professional_views.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Professional</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-yellow-400">{blog.analytics.goldman_sachs_visits}</div>
                    <div className="text-xs text-gray-400">Goldman Sachs</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blog Detail Modal */}
        <AnimatePresence>
          {selectedBlog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedBlog(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-xl max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{getTypeIcon(selectedBlog.type)}</span>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selectedBlog.title}</h2>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRatingColor(selectedBlog.metadata.goldman_sachs_rating)}`}>
                            {selectedBlog.metadata.goldman_sachs_rating}
                          </span>
                          <span className="text-sm text-gray-400">🧠 ASI Confidence: {(selectedBlog.metadata.asi_confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedBlog(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {/* Executive Summary */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-blue-400 mb-3">📋 Executive Summary</h3>
                    <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                      <p className="text-gray-200">{selectedBlog.content.executive_summary}</p>
                    </div>
                  </div>

                  {/* Key Insights */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-green-400 mb-3">💡 Key Insights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedBlog.content.key_insights.map((insight, index) => (
                        <div key={index} className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <span className="text-green-400 font-bold">{index + 1}.</span>
                            <p className="text-gray-200">{insight}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ASI Predictions */}
                  {selectedBlog.content.asi_predictions && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-purple-400 mb-3">🧠 ASI Predictions</h3>
                      <div className="bg-purple-900/20 border border-purple-700 rounded-lg p-4">
                        <pre className="text-gray-200 text-sm">
                          {JSON.stringify(selectedBlog.content.asi_predictions, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Interactive Charts */}
                  {selectedBlog.interactive_elements.charts.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-yellow-400 mb-3">📊 Interactive Analysis</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {selectedBlog.interactive_elements.charts.map((chart, index) => (
                          <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                            <h4 className="text-lg font-semibold text-white mb-3">{chart.title}</h4>
                            <div className="h-64 bg-gray-600 rounded-lg flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-4xl mb-2">📊</div>
                                <div className="text-white font-semibold">{chart.title}</div>
                                <div className="text-gray-300 text-sm mt-1">Interactive Chart</div>
                                <div className="text-xs text-gray-400 mt-2">Chart.js integration ready</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Data Tables */}
                  {selectedBlog.interactive_elements.tables.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-cyan-400 mb-3">📈 Professional Data</h3>
                      {selectedBlog.interactive_elements.tables.map((table, index) => (
                        <div key={index} className="bg-gray-700/50 rounded-lg overflow-hidden mb-4">
                          <div className="p-4 border-b border-gray-600">
                            <h4 className="text-lg font-semibold text-white">{table.title}</h4>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead className="bg-gray-600">
                                <tr>
                                  {table.headers.map((header: string, i: number) => (
                                    <th key={i} className="px-4 py-2 text-left text-white font-semibold">
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {table.data.map((row: string[], i: number) => (
                                  <tr key={i} className="border-b border-gray-600">
                                    {row.map((cell, j) => (
                                      <td key={j} className="px-4 py-2 text-gray-200">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Investment Thesis */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-orange-400 mb-3">🎯 Investment Thesis</h3>
                    <div className="bg-orange-900/20 border border-orange-700 rounded-lg p-4">
                      <p className="text-gray-200 text-lg">{selectedBlog.content.investment_thesis}</p>
                    </div>
                  </div>

                  {/* Conclusion */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-red-400 mb-3">🏁 Conclusion</h3>
                    <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                      <p className="text-gray-200 text-lg font-semibold">{selectedBlog.content.conclusion}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Goldman Sachs Quality Banner */}
        {goldmanSachsMode && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black p-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🏛️</span>
              <div>
                <div className="font-bold">Goldman Sachs Mode Active</div>
                <div className="text-sm">Institutional-grade analysis enabled</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
