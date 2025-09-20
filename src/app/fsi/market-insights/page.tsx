'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Brain, Zap, Globe, BarChart3, Activity, AlertCircle, Target, Award, Eye, Layers, Shield, Atom, Download, Share2, Filter, Search, Bell } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';
import PayTMStyleNavigation from '@/components/PayTMStyleNavigation';

interface MarketInsights {
  marketSentiment: {
    overall: string;
    score: number;
    confidence: number;
    trend: string;
  };
  keyInsights: {
    title: string;
    category: string;
    impact: string;
    description: string;
    actionable: boolean;
  }[];
  sectorAnalysis: {
    sector: string;
    performance: number;
    outlook: string;
    recommendation: string;
    keyDrivers: string[];
  }[];
  marketMetrics: {
    volatilityIndex: number;
    fearGreedIndex: number;
    momentumScore: number;
    liquidityIndex: number;
  };
  predictions: {
    timeframe: string;
    direction: string;
    probability: number;
    targetLevel: number;
    keyFactors: string[];
  }[];
  opportunityAlerts: {
    type: string;
    asset: string;
    reason: string;
    urgency: string;
    potentialReturn: number;
  }[];
  riskWarnings: {
    risk: string;
    severity: string;
    timeline: string;
    mitigation: string;
  }[];
}

export default function MarketInsights() {
  const [insights, setInsights] = useState<MarketInsights | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1_week');
  const [navHeight, setNavHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const contentRef = useRef<HTMLDivElement>(null);

  // Dynamic navigation height detection
  useEffect(() => {
    const detectNavHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        const height = header.offsetHeight;
        setNavHeight(height);
        setIsVisible(true);
      }
    };

    detectNavHeight();
    window.addEventListener('resize', detectNavHeight);
    
    const timeout = setTimeout(() => {
      if (navHeight === 0) {
        setNavHeight(80);
        setIsVisible(true);
      }
    }, 100);

    return () => {
      window.removeEventListener('resize', detectNavHeight);
      clearTimeout(timeout);
    };
  }, [navHeight]);

  const timeframes = [
    { value: '1_day', label: '1 Day' },
    { value: '1_week', label: '1 Week' },
    { value: '1_month', label: '1 Month' },
    { value: '3_months', label: '3 Months' }
  ];

  const fetchMarketInsights = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/asi/market-insights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeframe: selectedTimeframe,
          markets: ['indian_equity', 'global_markets'],
          analysisDepth: 'comprehensive'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch market insights');
      }

      const data = await response.json();
      setInsights(data.data);
    } catch (err) {
      console.error('Error fetching market insights:', err);
      setError('Failed to fetch market insights. Please try again.');
      // Fallback demo data
      setInsights({
        marketSentiment: {
          overall: 'BULLISH',
          score: 72,
          confidence: 85,
          trend: 'IMPROVING'
        },
        keyInsights: [
          {
            title: 'Tech Sector Rally Continues',
            category: 'SECTOR_ROTATION',
            impact: 'HIGH',
            description: 'Technology stocks showing strong momentum with AI and cloud computing driving growth',
            actionable: true
          },
          {
            title: 'FII Inflows Accelerating',
            category: 'CAPITAL_FLOWS',
            impact: 'MEDIUM',
            description: 'Foreign institutional investors increasing allocation to Indian markets',
            actionable: true
          }
        ],
        sectorAnalysis: [
          {
            sector: 'Technology',
            performance: 15.2,
            outlook: 'POSITIVE',
            recommendation: 'OVERWEIGHT',
            keyDrivers: ['AI adoption', 'Digital transformation', 'Export growth']
          },
          {
            sector: 'Banking & Finance',
            performance: 8.7,
            outlook: 'NEUTRAL',
            recommendation: 'NEUTRAL',
            keyDrivers: ['Credit growth', 'NIM expansion', 'Asset quality']
          }
        ],
        marketMetrics: {
          volatilityIndex: 18.5,
          fearGreedIndex: 68,
          momentumScore: 74,
          liquidityIndex: 82
        },
        predictions: [
          {
            timeframe: '1 Week',
            direction: 'UPWARD',
            probability: 72,
            targetLevel: 22500,
            keyFactors: ['Earnings momentum', 'FII flows', 'Global sentiment']
          }
        ],
        opportunityAlerts: [
          {
            type: 'SECTOR_ROTATION',
            asset: 'IT Stocks',
            reason: 'Oversold conditions with strong fundamentals',
            urgency: 'HIGH',
            potentialReturn: 15.5
          }
        ],
        riskWarnings: [
          {
            risk: 'Geopolitical Tensions',
            severity: 'MEDIUM',
            timeline: '2-4 weeks',
            mitigation: 'Diversify across regions and sectors'
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketInsights();
  }, []);

  // Enhanced market data for visualization
  const marketTrendData = [
    { time: '9:15', nifty: 22150, banknifty: 47800, sentiment: 72 },
    { time: '10:00', nifty: 22180, banknifty: 47850, sentiment: 74 },
    { time: '11:00', nifty: 22220, banknifty: 47920, sentiment: 76 },
    { time: '12:00', nifty: 22200, banknifty: 47880, sentiment: 75 },
    { time: '13:00', nifty: 22250, banknifty: 47950, sentiment: 78 },
    { time: '14:00', nifty: 22280, banknifty: 48000, sentiment: 80 },
    { time: '15:30', nifty: 22320, banknifty: 48080, sentiment: 82 }
  ];

  const sectorAllocation = [
    { name: 'Technology', value: 28, color: '#8B5CF6' },
    { name: 'Banking', value: 22, color: '#06B6D4' },
    { name: 'Healthcare', value: 15, color: '#10B981' },
    { name: 'Energy', value: 12, color: '#F59E0B' },
    { name: 'Consumer', value: 13, color: '#EF4444' },
    { name: 'Others', value: 10, color: '#6B7280' }
  ];

  const riskMetrics = [
    { subject: 'Volatility', A: 75, fullMark: 100 },
    { subject: 'Liquidity', A: 88, fullMark: 100 },
    { subject: 'Correlation', A: 65, fullMark: 100 },
    { subject: 'Momentum', A: 82, fullMark: 100 },
    { subject: 'Sentiment', A: 78, fullMark: 100 },
    { subject: 'Technical', A: 85, fullMark: 100 }
  ];

  return (
    <>
      <PayTMStyleNavigation />
      
      {/* Dynamic Spacer */}
      <div 
        style={{ 
          height: `${navHeight + 20}px`,
          background: 'linear-gradient(180deg, rgba(15,17,23,0.95) 0%, transparent 100%)'
        }}
        className="w-full"
      />
      
      {/* Main Content */}
      <div 
        ref={contentRef}
        className={`min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pb-16 px-4 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}
        style={{ marginTop: '-20px' }}
      >
      <div className="max-w-7xl mx-auto">
        {/* Premium Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
              <Brain className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Market Intelligence Hub
            </h1>
          </div>
          <p className="text-xl text-gray-300 text-center leading-relaxed w-full mb-6">
            Institutional-grade market analysis powered by advanced AI algorithms and real-time data streams
          </p>
          
          {/* Live Market Status */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-green-500/10 border border-green-400/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="text-sm text-gray-300">LIVE</div>
              </div>
              <div className="text-2xl font-bold text-green-400">22,320</div>
              <div className="text-sm text-gray-300">NIFTY 50</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="text-sm text-gray-300">LIVE</div>
              </div>
              <div className="text-2xl font-bold text-blue-400">48,080</div>
              <div className="text-sm text-gray-300">BANK NIFTY</div>
            </div>
            <div className="bg-purple-500/10 border border-purple-400/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-400">82%</div>
              <div className="text-sm text-gray-300">Market Sentiment</div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-400/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-yellow-400">₹2.8T</div>
              <div className="text-sm text-gray-300">Daily Volume</div>
            </div>
          </div>
        </div>

        {/* Minimal Control Panel */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Intelligence Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-300 bg-green-500/20 px-3 py-1 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Real-time Analysis
            </div>
            <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
              <Bell className="w-4 h-4" />
              Alerts
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Timeframe Selection */}
          <div>
            <label className="block text-white font-semibold mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              Analysis Period
            </label>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {timeframes.map(tf => (
                <option key={tf.value} value={tf.value} className="bg-gray-800">{tf.label}</option>
              ))}
            </select>
          </div>

          {/* Market Filter */}
          <div>
            <label className="block text-white font-semibold mb-3 flex items-center gap-2">
              <Filter className="w-4 h-4 text-purple-400" />
              Market Focus
            </label>
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all" className="bg-gray-800">All Markets</option>
              <option value="equity" className="bg-gray-800">Equity Only</option>
              <option value="derivatives" className="bg-gray-800">F&O Markets</option>
              <option value="sectors" className="bg-gray-800">Sector Focus</option>
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-white font-semibold mb-3 flex items-center gap-2">
              <Search className="w-4 h-4 text-green-400" />
              Quick Search
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search insights..."
                className="w-full px-4 py-3 pl-10 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex flex-col justify-end">
            <button
              onClick={fetchMarketInsights}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Analyzing...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Brain className="w-4 h-4" />
                  Generate Insights
                </div>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 bg-yellow-500/10 border border-yellow-400/20 text-yellow-300 px-4 py-3 rounded-xl">
            {error} {insights && '(Showing demo insights)'}
          </div>
        )}

        {/* Live Market Trends Chart - Minimal */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-green-400" />
            Live Market Trends
          </h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium border border-green-400/30">
              NIFTY 50
            </button>
            <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium border border-blue-400/30">
              BANK NIFTY
            </button>
          </div>
        </div>
        
        <div className="h-80 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={marketTrendData}>
              <defs>
                <linearGradient id="niftyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="bankniftyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                  border: '1px solid rgba(75, 85, 99, 0.3)',
                  borderRadius: '12px',
                  color: '#F3F4F6'
                }} 
              />
              <Area
                type="monotone"
                dataKey="nifty"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#niftyGradient)"
              />
              <Area
                type="monotone"
                dataKey="banknifty"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#bankniftyGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Enhanced Results Section */}
        {insights && !loading && (
          <div className="space-y-8">
            {/* Multi-dimensional Analysis Grid - Minimal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Market Intelligence Matrix - No Container */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Brain className="w-6 h-6 text-purple-400" />
                  Market Intelligence Matrix
                </h3>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl p-6 border border-green-400/30">
                    <div className="flex items-center justify-between mb-3">
                      <Target className="w-8 h-8 text-green-400" />
                      <div className="text-xs text-green-300 bg-green-500/20 px-2 py-1 rounded">{insights.marketSentiment.overall}</div>
                    </div>
                    <div className="text-3xl font-bold text-green-400 mb-1">{insights.marketSentiment.confidence}%</div>
                    <div className="text-gray-300 text-sm">Market Confidence</div>
                    <div className="text-xs text-gray-400 mt-2">Trend: {insights.marketSentiment.trend}</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl p-6 border border-blue-400/30">
                    <div className="flex items-center justify-between mb-3">
                      <Activity className="w-8 h-8 text-blue-400" />
                      <div className="text-xs text-blue-300 bg-blue-500/20 px-2 py-1 rounded">ACTIVE</div>
                    </div>
                    <div className="text-3xl font-bold text-blue-400 mb-1">{insights.marketMetrics.fearGreedIndex}</div>
                    <div className="text-gray-300 text-sm">Fear & Greed Index</div>
                    <div className="text-xs text-gray-400 mt-2">Volatility: {insights.marketMetrics.volatilityIndex}%</div>
                  </div>
                </div>
                
                {/* Risk Assessment Radar - No Container */}
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={riskMetrics}>
                      <PolarGrid stroke="#374151" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                      <PolarRadiusAxis tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                      <Radar
                        name="Risk Metrics"
                        dataKey="A"
                        stroke="#8B5CF6"
                        fill="#8B5CF6"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sector Allocation - No Container */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-yellow-400" />
                  Sector Allocation
                </h3>
                <div className="h-48 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorAllocation}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {sectorAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                          border: '1px solid rgba(75, 85, 99, 0.3)',
                          borderRadius: '8px',
                          color: '#F3F4F6'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {sectorAllocation.map((sector, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: sector.color }}
                        ></div>
                        <span className="text-gray-300">{sector.name}</span>
                      </div>
                      <span className="text-white font-medium">{sector.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Insights - Minimal */}
            <h3 className="text-xl font-bold text-white mb-6">Key Market Insights</h3>
            <div className="space-y-4 mb-8">
              {insights.keyInsights.map((insight, index) => (
                <div key={index} className="border border-white/20 rounded-lg p-4 bg-white/5">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-semibold text-white">{insight.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      insight.impact === 'HIGH' ? 'bg-red-500/20 text-red-300 border border-red-400/30' :
                      insight.impact === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30' :
                      'bg-green-500/20 text-green-300 border border-green-400/30'
                    }`}>
                      {insight.impact}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{insight.description}</p>
                </div>
              ))}
            </div>

            {/* Sector Analysis - Minimal */}
            <h3 className="text-xl font-bold text-white mb-6">Sector Performance</h3>
            <div className="space-y-4 mb-8">
              {insights.sectorAnalysis.map((sector, index) => (
                <div key={index} className="flex justify-between items-center p-4 border border-white/20 rounded-lg bg-white/5">
                  <div>
                    <h4 className="font-semibold text-white">{sector.sector}</h4>
                    <div className="text-sm text-gray-300">{sector.keyDrivers.join(', ')}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${sector.performance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {sector.performance >= 0 ? '+' : ''}{sector.performance.toFixed(1)}%
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      sector.recommendation === 'OVERWEIGHT' ? 'bg-green-500/20 text-green-300' :
                      sector.recommendation === 'UNDERWEIGHT' ? 'bg-red-500/20 text-red-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {sector.recommendation}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Opportunities and Risks - Minimal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-green-400 mb-6">Opportunities</h3>
                <div className="space-y-4">
                  {insights.opportunityAlerts.map((opp, index) => (
                    <div key={index} className="border border-green-400/20 rounded-lg p-4 bg-green-500/10">
                      <h4 className="font-semibold text-white">{opp.asset}</h4>
                      <p className="text-sm text-gray-300 mt-1">{opp.reason}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          opp.urgency === 'HIGH' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {opp.urgency}
                        </span>
                        <span className="text-green-400 font-bold">+{opp.potentialReturn.toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-red-400 mb-6">Risk Warnings</h3>
                <div className="space-y-4">
                  {insights.riskWarnings.map((risk, index) => (
                    <div key={index} className="border border-red-400/20 rounded-lg p-4 bg-red-500/10">
                      <h4 className="font-semibold text-white">{risk.risk}</h4>
                      <p className="text-sm text-gray-300 mt-1">{risk.mitigation}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          risk.severity === 'HIGH' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {risk.severity}
                        </span>
                        <span className="text-gray-300 text-sm">{risk.timeline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Analyzing market conditions with AI...</p>
          </div>
        )}

        {/* Export Actions - Minimal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Export Market Intelligence</h3>
            <p className="text-gray-300">Download comprehensive market analysis reports</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-blue-500/20 text-blue-400 px-6 py-3 rounded-xl font-semibold hover:bg-blue-500/30 transition-all duration-300 border border-blue-400/30 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            <button className="bg-purple-500/20 text-purple-400 px-6 py-3 rounded-xl font-semibold hover:bg-purple-500/30 transition-all duration-300 border border-purple-400/30 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share Report
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
