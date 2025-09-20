'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  ArrowLeft, BarChart3, TrendingUp, TrendingDown, Shield, Target, 
  Star, AlertTriangle, CheckCircle, XCircle, Info, Zap, Brain,
  PieChart, LineChart, Activity, Award, Globe, Users, Calculator,
  DollarSign, Clock, Briefcase, Eye, Download, Share2, Building,
  ChevronRight
} from 'lucide-react';
import PayTMStyleNavigation from '../../components/PayTMStyleNavigation';

const FSIAnalysisPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [showStockAnalysis, setShowStockAnalysis] = useState(false);
  
  const fundId = searchParams.get('fundId');
  const fundName = searchParams.get('fundName') || 'Mutual Fund';

  // Mock FSI Analysis Data - Replace with API call
  const fsiData = {
    fundId: fundId,
    fundName: decodeURIComponent(fundName),
    overallScore: 87,
    scoreGrade: 'A+',
    lastUpdated: '2024-01-15',
    currentNav: 156.78,
    
    // Core Metrics
    metrics: {
      performance: { score: 92, grade: 'A+', trend: 'up' },
      risk: { score: 78, grade: 'B+', trend: 'stable' },
      expense: { score: 85, grade: 'A-', trend: 'up' },
      consistency: { score: 89, grade: 'A', trend: 'up' },
      liquidity: { score: 94, grade: 'A+', trend: 'stable' },
      management: { score: 91, grade: 'A+', trend: 'up' }
    },
    
    // Detailed Analysis
    analysis: {
      strengths: [
        'Consistent outperformance over 3+ years',
        'Low expense ratio compared to category',
        'Strong fund manager track record',
        'High liquidity and easy redemption',
        'Diversified portfolio reducing concentration risk'
      ],
      concerns: [
        'Higher volatility during market downturns',
        'Concentration in few sectors',
        'Recent underperformance in last quarter'
      ],
      recommendations: [
        'Suitable for long-term wealth creation',
        'Ideal for investors with moderate risk appetite',
        'Consider SIP for rupee cost averaging',
        'Monitor quarterly performance closely'
      ]
    },
    
    // Performance Data
    performance: {
      returns: {
        '1M': 2.1,
        '3M': 8.4,
        '6M': 15.2,
        '1Y': 24.8,
        '3Y': 18.6,
        '5Y': 16.3
      },
      benchmark: {
        '1M': 1.8,
        '3M': 7.2,
        '6M': 13.1,
        '1Y': 21.4,
        '3Y': 16.2,
        '5Y': 14.8
      }
    },
    
    // Risk Metrics
    risk: {
      volatility: 18.2,
      sharpeRatio: 1.34,
      beta: 0.98,
      maxDrawdown: -12.4,
      var95: -2.8
    },
    
    // Portfolio Composition
    portfolio: {
      sectors: [
        { name: 'Technology', allocation: 28.5, performance: '+12.4%' },
        { name: 'Financial Services', allocation: 22.1, performance: '+8.7%' },
        { name: 'Healthcare', allocation: 15.3, performance: '+15.2%' },
        { name: 'Consumer Goods', allocation: 12.8, performance: '+6.9%' },
        { name: 'Energy', allocation: 10.2, performance: '+18.3%' },
        { name: 'Others', allocation: 11.1, performance: '+9.1%' }
      ],
      topHoldings: [
        { name: 'Reliance Industries', allocation: 8.2, price: '₹2,847' },
        { name: 'TCS', allocation: 6.8, price: '₹3,421' },
        { name: 'HDFC Bank', allocation: 5.9, price: '₹1,632' },
        { name: 'Infosys', allocation: 5.1, price: '₹1,498' },
        { name: 'ICICI Bank', allocation: 4.7, price: '₹1,089' }
      ]
    }
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-blue-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-500/20 border-green-500/30';
    if (score >= 80) return 'bg-blue-500/20 border-blue-500/30';
    if (score >= 70) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        <PayTMStyleNavigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center p-12">
            <div className="relative mb-8">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-white/20 border-t-blue-400 mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Analyzing Fund Performance</h3>
            <p className="text-gray-300 mb-4">Generating comprehensive FSI report...</p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <PayTMStyleNavigation />
      
      <div className="px-8 py-12 pt-32 relative z-10 max-w-7xl mx-auto">
        {/* Premium Header */}
        <div className="flex items-center justify-between mb-16">
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => router.back()}
                className="p-3 rounded-2xl hover:bg-white/10 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                  <span className="text-base font-semibold text-blue-400 uppercase tracking-wide">FSI Analysis Report</span>
                </div>
                <h1 className="text-5xl font-bold text-white mb-4">{fsiData.fundName}</h1>
                <p className="text-gray-300 text-xl mb-6">Comprehensive Fund Performance Analysis</p>
                <div className="flex items-center space-x-6 mt-6">
                  <span className="text-base text-gray-400">Last Updated: {fsiData.lastUpdated}</span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                  <span className="text-base text-gray-400">Fund ID: {fsiData.fundId}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="px-8 py-4 hover:bg-white/10 rounded-xl text-white font-medium transition-all duration-300 flex items-center space-x-3 border border-white/20">
                <Download className="w-5 h-5" />
                <span>Export PDF</span>
              </button>
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl">
                <Share2 className="w-5 h-5" />
                <span>Share Report</span>
              </button>
            </div>
        </div>

        {/* Premium Overall Score Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Overall Score - Premium Design */}
            <div className="text-center lg:border-r lg:border-white/20 lg:pr-12">
              <div className="relative inline-block mb-8">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 p-3 mx-auto shadow-2xl">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center shadow-inner">
                    <div className="text-center">
                      <div className="text-6xl font-black text-white mb-2">{fsiData.overallScore}</div>
                      <div className="text-blue-400 font-bold text-xl">{fsiData.scoreGrade}</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">FSI Score</h3>
              <p className="text-gray-300 font-medium text-lg mb-6">Excellent Investment Quality</p>
              <div className="inline-flex items-center px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-full">
                <Award className="w-5 h-5 text-green-400 mr-3" />
                <span className="text-green-300 font-semibold">Top 10% Performance</span>
              </div>
            </div>

            {/* Key Metrics - Premium Grid */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-white">Performance Metrics</h3>
                <div className="text-base text-gray-400">Last updated: {fsiData.lastUpdated}</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {Object.entries(fsiData.metrics).map(([key, metric]) => {
                  const getBgColor = (score: number) => {
                    if (score >= 90) return 'bg-green-500/20 border-green-500/30';
                    if (score >= 80) return 'bg-blue-500/20 border-blue-500/30';
                    if (score >= 70) return 'bg-yellow-500/20 border-yellow-500/30';
                    return 'bg-red-500/20 border-red-500/30';
                  };
                  
                  const getTextColor = (score: number) => {
                    if (score >= 90) return 'text-green-400';
                    if (score >= 80) return 'text-blue-400';
                    if (score >= 70) return 'text-yellow-400';
                    return 'text-red-400';
                  };
                  
                  return (
                    <div key={key} className="p-6 bg-gray-800/30 rounded-2xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-base font-bold text-white capitalize">{key}</span>
                        <div className="flex items-center">
                          {metric.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-400" />}
                          {metric.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-400" />}
                          {metric.trend === 'stable' && <Activity className="w-5 h-5 text-blue-400" />}
                        </div>
                      </div>
                      <div className={`text-4xl font-black mb-2 ${getTextColor(metric.score)}`}>{metric.score}</div>
                      <div className="text-base font-semibold text-gray-300">{metric.grade}</div>
                    </div>
                  );
                })}
              </div>
            </div>
        </div>

        {/* Premium Tabs */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-3 mb-12 border border-gray-800/50">
          <div className="flex space-x-2">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'future', label: 'Future Outlook', icon: TrendingUp },
              { id: 'performance', label: 'Performance', icon: BarChart3 },
              { id: 'risk', label: 'Risk Analysis', icon: Shield },
              { id: 'portfolio', label: 'Portfolio', icon: PieChart }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-3 py-5 px-8 rounded-2xl font-semibold transition-all duration-300 relative overflow-hidden group ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl shadow-blue-500/25 transform scale-[1.02]' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/60 hover:shadow-lg hover:shadow-gray-900/20 hover:scale-[1.01]'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <tab.icon className={`w-6 h-6 relative z-10 transition-all duration-300 ${
                  activeTab === tab.id ? 'text-white' : 'group-hover:text-blue-400'
                }`} />
                <span className="relative z-10 text-base">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
              {/* Strengths Column */}
              <div className="space-y-8 md:pr-8 md:border-r md:border-gray-700/50 bg-green-500/5 rounded-3xl p-8 border border-green-500/10">
                <div className="flex items-center space-x-6 mb-10">
                  <div className="w-16 h-16 flex items-center justify-center bg-green-500/10 rounded-2xl">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">Key Strengths</h3>
                    <p className="text-gray-300 text-lg">What makes this fund outstanding</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {fsiData.analysis.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center space-x-4 p-6 bg-green-500/5 rounded-xl border border-green-500/10">
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <p className="text-gray-200 font-medium leading-relaxed text-base">{strength}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Concerns Column */}
              <div className="space-y-8 md:pl-8 bg-orange-500/5 rounded-3xl p-8 border border-orange-500/10">
                <div className="flex items-center space-x-6 mb-10">
                  <div className="w-16 h-16 flex items-center justify-center bg-orange-500/10 rounded-2xl">
                    <AlertTriangle className="w-8 h-8 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">Areas of Concern</h3>
                    <p className="text-gray-300 text-lg">Points to consider before investing</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {fsiData.analysis.concerns.map((concern, index) => (
                    <div key={index} className="flex items-center space-x-4 p-6 bg-orange-500/5 rounded-xl border border-orange-500/10">
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                      </div>
                      <p className="text-gray-200 font-medium leading-relaxed text-base">{concern}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="lg:col-span-2 mt-12">
                <div className="flex items-center space-x-6 mb-10">
                  <div className="w-16 h-16 flex items-center justify-center bg-blue-500/10 rounded-2xl">
                    <Brain className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">AI-Powered Recommendations</h3>
                    <p className="text-gray-300 text-lg">Personalized investment guidance based on advanced analysis</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {fsiData.analysis.recommendations.map((rec, index) => (
                    <div key={index} className="relative p-8 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-blue-500/20 rounded-xl">
                          <Zap className="w-6 h-6 text-blue-400" />
                        </div>
                        <p className="text-gray-200 font-medium leading-relaxed text-base">{rec}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* FSI Final Verdict - Simplified */}
              <div className="lg:col-span-2 mt-16">
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-3xl p-10 border border-green-500/20">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 flex items-center justify-center bg-green-500/10 rounded-2xl">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">FSI Investment Verdict</h3>
                        <p className="text-gray-300 text-lg">AI-powered future performance assessment</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-blue-400 mb-2">HIGH POTENTIAL</div>
                      <div className="text-base text-gray-400">Historical: 15-18% Returns</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-200 text-xl leading-relaxed mb-8">
                    Based on comprehensive portfolio analysis and market positioning, this fund shows strong 
                    historical performance patterns. <span className="text-blue-400 font-medium">Consider for your SIP portfolio.</span>
                  </p>
                  
                  <div className="flex items-center space-x-8 text-base text-gray-400">
                    <div className="flex items-center space-x-3">
                      <span className="text-green-500 font-bold">•</span>
                      <span>92% Quality Holdings</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>Expert Fund Management</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-purple-500 font-bold">•</span>
                      <span>Optimal Market Timing</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="lg:col-span-2 mt-16">
                <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-3xl p-10 border border-gray-700/50">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-white mb-3">Ready to Invest?</h3>
                    <p className="text-gray-300 text-lg">Take action based on your FSI analysis</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:from-blue-500 hover:to-blue-600 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 min-w-[200px]">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      <span className="relative z-10">Start SIP</span>
                    </button>
                    
                    <button className="group relative px-10 py-5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:from-green-500 hover:to-green-600 hover:shadow-xl hover:shadow-green-500/25 hover:scale-105 min-w-[200px]">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-400/10 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      <span className="relative z-10">Lump Sum</span>
                    </button>
                    
                    <button className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:from-purple-500 hover:to-purple-600 hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105 min-w-[200px]">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-400/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      <span className="relative z-10">Add to Watchlist</span>
                    </button>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <p className="text-gray-400 text-sm">All investments are subject to market risks. Please read the offer document carefully before investing.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Future Outlook Tab */}
        {activeTab === 'future' && (
          <div className="mb-8 space-y-8 clear-both">
            {/* NAV Prediction Chart */}
            <div className="bg-blue-500/5 rounded-2xl p-6 border border-blue-500/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">NAV Prediction & Market Outlook</h3>
                    <p className="text-gray-300">Interactive chart showing historical and projected performance</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Powered by</div>
                  <div className="text-blue-400 font-bold">TradingView (Coming Soon)</div>
                </div>
              </div>
              
              {/* Professional TradingView-Style Chart */}
              <div className="bg-gray-900 rounded-xl border border-gray-700 mb-6 h-96 relative overflow-hidden clear-both">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>
                <div className="relative z-10 h-full flex flex-col">
                  {/* Chart Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-white font-bold text-lg">₹{fsiData.currentNav}</span>
                        <span className="text-green-400 text-sm font-medium">+2.34%</span>
                      </div>
                      <div className="text-gray-400 text-sm">NAV • Last Updated: 15:30</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium">1D</button>
                      <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-xs">1W</button>
                      <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-xs">1M</button>
                      <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-xs">1Y</button>
                      <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-xs">ALL</button>
                    </div>
                  </div>
                  
                  {/* Chart Canvas */}
                  <div className="flex-1 relative bg-gray-900 overflow-hidden">
                    {/* Y-Axis Labels */}
                    <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4 text-xs text-gray-500">
                      <span>180</span>
                      <span>170</span>
                      <span>160</span>
                      <span>150</span>
                      <span>140</span>
                      <span>130</span>
                    </div>
                    
                    {/* Chart Area */}
                    <div className="ml-12 mr-4 h-full relative">
                      <svg viewBox="0 0 800 300" className="w-full h-full block">
                        {/* Grid */}
                        <defs>
                          <pattern id="chartGrid" width="80" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 80 0 L 0 0 0 30" fill="none" stroke="#374151" strokeWidth="0.3" opacity="0.4"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#chartGrid)" />
                        
                        {/* Candlestick-style bars */}
                        <g>
                          {/* Day 1 */}
                          <line x1="50" y1="220" x2="50" y2="180" stroke="#10B981" strokeWidth="1"/>
                          <rect x="47" y="200" width="6" height="15" fill="#10B981"/>
                          
                          {/* Day 2 */}
                          <line x1="90" y1="210" x2="90" y2="170" stroke="#EF4444" strokeWidth="1"/>
                          <rect x="87" y="185" width="6" height="20" fill="#EF4444"/>
                          
                          {/* Day 3 */}
                          <line x1="130" y1="200" x2="130" y2="160" stroke="#10B981" strokeWidth="1"/>
                          <rect x="127" y="175" width="6" height="18" fill="#10B981"/>
                          
                          {/* Day 4 */}
                          <line x1="170" y1="190" x2="170" y2="150" stroke="#10B981" strokeWidth="1"/>
                          <rect x="167" y="165" width="6" height="20" fill="#10B981"/>
                          
                          {/* Continue pattern */}
                          <line x1="210" y1="180" x2="210" y2="140" stroke="#EF4444" strokeWidth="1"/>
                          <rect x="207" y="155" width="6" height="18" fill="#EF4444"/>
                          
                          <line x1="250" y1="170" x2="250" y2="130" stroke="#10B981" strokeWidth="1"/>
                          <rect x="247" y="145" width="6" height="20" fill="#10B981"/>
                          
                          <line x1="290" y1="160" x2="290" y2="120" stroke="#10B981" strokeWidth="1"/>
                          <rect x="287" y="135" width="6" height="22" fill="#10B981"/>
                          
                          <line x1="330" y1="150" x2="330" y2="110" stroke="#10B981" strokeWidth="1"/>
                          <rect x="327" y="125" width="6" height="20" fill="#10B981"/>
                          
                          <line x1="370" y1="140" x2="370" y2="100" stroke="#EF4444" strokeWidth="1"/>
                          <rect x="367" y="115" width="6" height="18" fill="#EF4444"/>
                          
                          <line x1="410" y1="130" x2="410" y2="90" stroke="#10B981" strokeWidth="1"/>
                          <rect x="407" y="105" width="6" height="20" fill="#10B981"/>
                          
                          <line x1="450" y1="120" x2="450" y2="80" stroke="#10B981" strokeWidth="1"/>
                          <rect x="447" y="95" width="6" height="22" fill="#10B981"/>
                          
                          <line x1="490" y1="110" x2="490" y2="70" stroke="#10B981" strokeWidth="1"/>
                          <rect x="487" y="85" width="6" height="20" fill="#10B981"/>
                        </g>
                        
                        {/* Moving Average Line */}
                        <path d="M 50 210 L 90 195 L 130 185 L 170 175 L 210 165 L 250 155 L 290 145 L 330 135 L 370 125 L 410 115 L 450 105 L 490 95" 
                              stroke="#F59E0B" strokeWidth="2" fill="none" opacity="0.8"/>
                        
                        {/* Trend Line */}
                        <path d="M 50 210 L 490 95" 
                              stroke="#3B82F6" strokeWidth="1" fill="none" strokeDasharray="4,4" opacity="0.6"/>
                        
                        {/* Volume Bars */}
                        <g transform="translate(0, 250)">
                          <rect x="47" y="0" width="6" height="15" fill="#6B7280" opacity="0.6"/>
                          <rect x="87" y="0" width="6" height="25" fill="#6B7280" opacity="0.6"/>
                          <rect x="127" y="0" width="6" height="18" fill="#6B7280" opacity="0.6"/>
                          <rect x="167" y="0" width="6" height="22" fill="#6B7280" opacity="0.6"/>
                          <rect x="207" y="0" width="6" height="12" fill="#6B7280" opacity="0.6"/>
                          <rect x="247" y="0" width="6" height="28" fill="#6B7280" opacity="0.6"/>
                          <rect x="287" y="0" width="6" height="20" fill="#6B7280" opacity="0.6"/>
                          <rect x="327" y="0" width="6" height="16" fill="#6B7280" opacity="0.6"/>
                          <rect x="367" y="0" width="6" height="24" fill="#6B7280" opacity="0.6"/>
                          <rect x="407" y="0" width="6" height="19" fill="#6B7280" opacity="0.6"/>
                          <rect x="447" y="0" width="6" height="26" fill="#6B7280" opacity="0.6"/>
                          <rect x="487" y="0" width="6" height="21" fill="#6B7280" opacity="0.6"/>
                        </g>
                      </svg>
                      
                      {/* Crosshair */}
                      <div className="absolute top-1/2 left-1/2 w-px h-full bg-gray-500 opacity-30 pointer-events-none"></div>
                      <div className="absolute top-1/2 left-0 w-full h-px bg-gray-500 opacity-30 pointer-events-none"></div>
                    </div>
                    
                    {/* X-Axis Labels */}
                    <div className="absolute bottom-2 left-12 right-4 flex justify-between text-xs text-gray-500">
                      <span>Jan</span>
                      <span>Mar</span>
                      <span>May</span>
                      <span>Jul</span>
                      <span>Sep</span>
                      <span>Nov</span>
                    </div>
                    
                    {/* Chart Info Overlay */}
                    <div className="absolute top-4 right-4 bg-gray-800/90 rounded-lg p-3 border border-gray-600">
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center justify-between space-x-4">
                          <span className="text-gray-400">High:</span>
                          <span className="text-white font-bold">₹{(fsiData.currentNav * 1.18).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                          <span className="text-gray-400">Low:</span>
                          <span className="text-white font-bold">₹{(fsiData.currentNav * 0.92).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                          <span className="text-gray-400">Volume:</span>
                          <span className="text-white font-bold">2.4M</span>
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                          <span className="text-gray-400">MA(50):</span>
                          <span className="text-yellow-400 font-bold">₹{(fsiData.currentNav * 0.98).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chart Footer */}
                  <div className="flex items-center justify-between p-3 border-t border-gray-700 bg-gray-800/50">
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-500 font-bold">▪</span>
                        <span>Bullish Trend</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-500 font-bold">▪</span>
                        <span>MA(50)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-500 font-bold">▪</span>
                        <span>Trend Line</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Powered by TradingView • Real-time data coming soon
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-blue-400 mb-2">₹{(fsiData.currentNav * 1.15).toFixed(2)}</div>
                  <div className="text-sm text-gray-400 mb-1">Potential NAV Range</div>
                  <div className="text-xs text-blue-400">Based on Historical Trends</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-purple-400 mb-2">78%</div>
                  <div className="text-sm text-gray-400 mb-1">Historical Success Rate</div>
                  <div className="text-xs text-purple-400">Similar Market Conditions</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-green-400 mb-2">Q2 2024</div>
                  <div className="text-sm text-gray-400 mb-1">Favorable Period</div>
                  <div className="text-xs text-green-400">Historical Market Patterns</div>
                </div>
              </div>
              
              <div className="bg-gray-800/30 rounded-2xl p-8">
                <h4 className="text-2xl font-bold text-white mb-8">Key Future Drivers</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="flex items-start space-x-4 p-4 bg-green-500/5 rounded-xl border border-green-500/10">
                    <ChevronRight className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <div className="space-y-2">
                      <div className="text-white font-semibold text-lg">Technology Sector Growth</div>
                      <div className="text-gray-300 leading-relaxed">28.5% portfolio exposure to high-growth tech stocks driving innovation and digital transformation</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                    <ChevronRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                    <div className="space-y-2">
                      <div className="text-white font-semibold text-lg">Fund Manager Track Record</div>
                      <div className="text-gray-300 leading-relaxed">Consistent outperformance in similar market cycles with proven expertise in market timing</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-purple-500/5 rounded-xl border border-purple-500/10">
                    <ChevronRight className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                    <div className="space-y-2">
                      <div className="text-white font-semibold text-lg">Market Cycle Position</div>
                      <div className="text-gray-300 leading-relaxed">Currently positioned in early growth phase of market cycle with optimal entry timing</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-yellow-500/5 rounded-xl border border-yellow-500/10">
                    <ChevronRight className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                    <div className="space-y-2">
                      <div className="text-white font-semibold text-lg">Portfolio Quality Score</div>
                      <div className="text-gray-300 leading-relaxed">92/100 rating based on comprehensive individual stock analysis and risk assessment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Individual Stock Analysis */}
            <div className="bg-purple-500/5 rounded-3xl p-12 border border-purple-500/10">
              <div className="flex items-center space-x-8 mb-16">
                <div className="w-20 h-20 flex items-center justify-center bg-purple-500/10 rounded-3xl">
                  <BarChart3 className="w-10 h-10 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-white mb-3">Top Holdings Future Analysis</h3>
                  <p className="text-gray-300 text-xl">Individual stock predictions and portfolio impact analysis</p>
                </div>
              </div>
              
              <div className="space-y-20">
                {[
                  { 
                    name: 'Reliance Industries', 
                    allocation: '8.2%', 
                    prediction: '+18%', 
                    confidence: 'High',
                    currentPrice: '₹2,847',
                    peRatio: '24.5',
                    marketCap: '₹19.2L Cr',
                    sector: 'Energy & Petrochemicals',
                    strengths: [
                      'Dominant market position in petrochemicals and refining with integrated business model',
                      'Massive investments in renewable energy and green hydrogen initiatives positioning for future growth',
                      'Strong digital transformation through Jio platforms with 450M+ subscribers',
                      'Robust financial position with improving debt metrics and strong cash flows',
                      'Strategic partnerships with global tech giants like Facebook and Google'
                    ],
                    weaknesses: [
                      'Heavy dependence on volatile oil and gas prices affecting profitability',
                      'High capital intensity requiring continuous large investments',
                      'Regulatory challenges in telecom and retail sectors',
                      'Execution risk in ambitious renewable energy transition plans'
                    ]
                  },
                  { 
                    name: 'TCS', 
                    allocation: '6.8%', 
                    prediction: '+22%', 
                    confidence: 'Very High',
                    currentPrice: '₹3,421',
                    peRatio: '28.3',
                    marketCap: '₹12.5L Cr',
                    sector: 'Information Technology',
                    strengths: [
                      'Leading position in digital transformation services with strong client relationships',
                      'Consistent revenue growth and industry-leading profit margins above 25%',
                      'Strong presence in emerging technologies like AI, cloud, and IoT solutions',
                      'Excellent talent management and training programs ensuring skilled workforce',
                      'Diversified geographic presence reducing dependency on single markets'
                    ],
                    weaknesses: [
                      'Increasing wage inflation and talent retention challenges in competitive market',
                      'Currency fluctuation risks due to significant dollar revenue exposure',
                      'Growing competition from global consulting firms and cloud providers',
                      'Potential visa and immigration policy changes affecting operations'
                    ]
                  },
                  { 
                    name: 'HDFC Bank', 
                    allocation: '5.9%', 
                    prediction: '+12%', 
                    confidence: 'Medium',
                    currentPrice: '₹1,632',
                    peRatio: '18.7',
                    marketCap: '₹9.1L Cr',
                    sector: 'Banking & Financial Services',
                    strengths: [
                      'Strong retail banking franchise with extensive branch and digital network',
                      'Consistent asset quality with low NPAs and strong provisioning practices',
                      'Leading digital banking platform with high customer engagement',
                      'Diversified revenue streams across retail, corporate, and treasury operations',
                      'Strong capital adequacy ratios providing growth flexibility'
                    ],
                    weaknesses: [
                      'Regulatory restrictions on new credit card issuances and digital payments',
                      'Increasing competition from fintech companies and digital banks',
                      'Rising funding costs in current interest rate environment',
                      'Potential asset quality concerns in unsecured lending portfolio'
                    ]
                  },
                  { 
                    name: 'Infosys', 
                    allocation: '5.1%', 
                    prediction: '+25%', 
                    confidence: 'High',
                    currentPrice: '₹1,498',
                    peRatio: '26.8',
                    marketCap: '₹6.3L Cr',
                    sector: 'Information Technology',
                    strengths: [
                      'Strong focus on digital transformation and cloud migration services',
                      'Excellent client mining capabilities with high revenue per client growth',
                      'Strategic acquisitions enhancing capabilities in emerging technology areas',
                      'Strong corporate governance and transparent management practices',
                      'Robust cash generation and consistent dividend payout policy'
                    ],
                    weaknesses: [
                      'Higher dependence on traditional services compared to pure-play digital companies',
                      'Intense competition from both Indian and global IT service providers',
                      'Client concentration risks with top clients contributing significant revenue',
                      'Challenges in scaling up newer service offerings to meaningful revenue levels'
                    ]
                  },
                  { 
                    name: 'ICICI Bank', 
                    allocation: '4.7%', 
                    prediction: '+15%', 
                    confidence: 'High',
                    currentPrice: '₹1,156',
                    peRatio: '16.2',
                    marketCap: '₹8.1L Cr',
                    sector: 'Banking & Financial Services',
                    strengths: [
                      'Strong retail banking growth with expanding customer base and digital adoption',
                      'Improving asset quality with declining NPAs and robust provisioning coverage',
                      'Diversified revenue streams across retail, corporate, and international banking',
                      'Technology-driven operations with industry-leading digital banking platform',
                      'Strong capital position supporting growth and regulatory requirements'
                    ],
                    weaknesses: [
                      'Exposure to interest rate volatility affecting net interest margins',
                      'Competition from both traditional banks and emerging fintech players',
                      'Credit risk in unsecured lending and SME segments',
                      'Regulatory compliance costs and evolving banking regulations'
                    ]
                  },
                  { 
                    name: 'Hindustan Unilever', 
                    allocation: '4.3%', 
                    prediction: '+14%', 
                    confidence: 'Medium',
                    currentPrice: '₹2,634',
                    peRatio: '58.7',
                    marketCap: '₹6.2L Cr',
                    sector: 'Consumer Goods',
                    strengths: [
                      'Dominant market position in FMCG with strong brand portfolio and distribution network',
                      'Consistent revenue growth driven by rural market penetration and premiumization',
                      'Strong R&D capabilities and innovation pipeline for sustainable products',
                      'Efficient supply chain and manufacturing operations across India',
                      'Strong cash generation and consistent dividend payout history'
                    ],
                    weaknesses: [
                      'High valuation multiples limiting upside potential in near term',
                      'Intense competition from local and regional FMCG players',
                      'Raw material cost inflation pressuring profit margins',
                      'Slower growth in urban markets and changing consumer preferences'
                    ]
                  },
                  { 
                    name: 'ITC Limited', 
                    allocation: '3.9%', 
                    prediction: '+8%', 
                    confidence: 'Medium',
                    currentPrice: '₹462',
                    peRatio: '28.9',
                    marketCap: '₹5.7L Cr',
                    sector: 'Consumer Goods',
                    strengths: [
                      'Diversified business portfolio across FMCG, hotels, paperboards, and agri-business',
                      'Strong cash generation and healthy balance sheet with minimal debt',
                      'Leading position in cigarettes business with pricing power',
                      'Growing FMCG business with expanding product portfolio and distribution',
                      'Sustainable business practices and ESG initiatives'
                    ],
                    weaknesses: [
                      'Regulatory headwinds and taxation pressures on tobacco business',
                      'Slow growth in traditional cigarettes due to health consciousness',
                      'Intense competition in FMCG segment from established players',
                      'Dependence on tobacco business for majority of profits'
                    ]
                  },
                  { 
                    name: 'Larsen & Toubro', 
                    allocation: '3.6%', 
                    prediction: '+20%', 
                    confidence: 'High',
                    currentPrice: '₹3,547',
                    peRatio: '31.4',
                    marketCap: '₹4.9L Cr',
                    sector: 'Infrastructure & Engineering',
                    strengths: [
                      'Leading engineering and construction company with strong order book visibility',
                      'Diversified business across infrastructure, defense, technology, and financial services',
                      'Strong execution capabilities and project management expertise',
                      'Beneficiary of government infrastructure spending and capex cycle',
                      'Strong balance sheet and cash flow generation from operations'
                    ],
                    weaknesses: [
                      'Cyclical nature of business dependent on government spending and economic cycles',
                      'Working capital intensive business model affecting cash flows',
                      'Execution risks in large infrastructure projects',
                      'Competition from both domestic and international players'
                    ]
                  },
                  { 
                    name: 'Bajaj Finance', 
                    allocation: '3.2%', 
                    prediction: '+16%', 
                    confidence: 'Medium',
                    currentPrice: '₹6,847',
                    peRatio: '27.3',
                    marketCap: '₹4.2L Cr',
                    sector: 'Financial Services',
                    strengths: [
                      'Leading NBFC with strong retail lending franchise and customer base',
                      'Diversified product portfolio across consumer durables, personal loans, and digital lending',
                      'Strong technology platform and digital capabilities for customer acquisition',
                      'Consistent growth in AUM and improving operational efficiency',
                      'Strong brand recognition and distribution network'
                    ],
                    weaknesses: [
                      'Asset quality concerns in unsecured lending portfolio',
                      'Rising funding costs and competitive pressure on margins',
                      'Regulatory scrutiny on lending practices and collection methods',
                      'Economic slowdown impact on customer repayment capabilities'
                    ]
                  },
                  { 
                    name: 'Asian Paints', 
                    allocation: '2.8%', 
                    prediction: '+11%', 
                    confidence: 'Medium',
                    currentPrice: '₹2,934',
                    peRatio: '52.1',
                    marketCap: '₹2.8L Cr',
                    sector: 'Consumer Goods',
                    strengths: [
                      'Dominant market position in decorative paints with strong brand equity',
                      'Extensive distribution network and dealer relationships across India',
                      'Strong R&D capabilities and continuous product innovation',
                      'Efficient manufacturing operations and supply chain management',
                      'Consistent financial performance with strong return ratios'
                    ],
                    weaknesses: [
                      'High raw material cost volatility affecting profit margins',
                      'Intense competition from both organized and unorganized players',
                      'Slower growth in real estate sector affecting demand',
                      'Premium valuation limiting near-term upside potential'
                    ]
                  }
                ].map((stock, index) => (
                  <div key={index}>
                    {/* Company Header */}
                    <h4 className="text-white font-bold text-3xl mb-8">{index + 1}) {stock.name}</h4>
                    
                    {/* Metrics Table */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10 p-6 bg-gray-900/20 rounded-xl border border-gray-800/50">
                      <div className="text-center">
                        <div className={`text-xl font-bold mb-1 ${
                          stock.prediction.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        }`}>{stock.prediction}</div>
                        <div className="text-gray-400 text-sm">Prediction</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold mb-1 ${
                          stock.confidence === 'Very High' ? 'text-green-400' :
                          stock.confidence === 'High' ? 'text-blue-400' :
                          'text-yellow-400'
                        }`}>{stock.confidence}</div>
                        <div className="text-gray-400 text-sm">Confidence</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-lg mb-1">{stock.allocation}</div>
                        <div className="text-gray-400 text-sm">Portfolio</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-lg mb-1">{stock.currentPrice}</div>
                        <div className="text-gray-400 text-sm">Current Price</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-lg mb-1">{stock.peRatio}</div>
                        <div className="text-gray-400 text-sm">P/E Ratio</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-lg mb-1">{stock.marketCap}</div>
                        <div className="text-gray-400 text-sm">Market Cap</div>
                      </div>
                    </div>
                    
                    {/* Comprehensive Analysis */}
                    <div className="mb-12">
                      <h5 className="text-white font-bold text-xl mb-8">Comprehensive Analysis</h5>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Strengths */}
                        <div>
                          <h6 className="text-green-400 font-semibold text-lg mb-6">Key Strengths</h6>
                          <div className="space-y-4">
                            {stock.strengths.map((strength, idx) => (
                              <div key={idx} className="flex items-start space-x-3">
                                <span className="text-green-400 font-bold mt-1">•</span>
                                <span className="text-gray-300 leading-relaxed">{strength}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Weaknesses */}
                        <div>
                          <h6 className="text-orange-400 font-semibold text-lg mb-6">Key Concerns</h6>
                          <div className="space-y-4">
                            {stock.weaknesses.map((weakness, idx) => (
                              <div key={idx} className="flex items-start space-x-3">
                                <span className="text-orange-400 font-bold mt-1">•</span>
                                <span className="text-gray-300 leading-relaxed">{weakness}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Separator Line - Only show if not the last item */}
                    {index < 9 && (
                      <div className="flex items-center justify-center my-16">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                        <div className="mx-6 text-gray-500 text-sm font-medium">• • •</div>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Market Sentiment Analysis */}
            <div className="bg-green-500/5 rounded-3xl p-12 border border-green-500/10">
              <div className="flex items-center space-x-8 mb-16">
                <div className="w-20 h-20 flex items-center justify-center bg-green-500/10 rounded-3xl">
                  <Brain className="w-10 h-10 text-green-500" />
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-white mb-3">AI Market Sentiment & Timing Analysis</h3>
                  <p className="text-gray-300 text-xl">Advanced market intelligence and optimal investment timing insights</p>
                </div>
              </div>
              
              {/* Market Metrics Table */}
              <div className="bg-gray-900/40 rounded-3xl border border-gray-700/50 overflow-hidden mb-12 shadow-2xl">
                <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 px-8 py-6 border-b border-gray-600/30">
                  <h4 className="text-2xl font-bold text-white flex items-center">
                    <div className="w-2 h-8 bg-blue-400 rounded-full mr-4"></div>
                    Current Market Metrics
                  </h4>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-slate-800/60 to-slate-700/60">
                        <th className="text-left py-5 px-8 text-slate-200 font-bold text-lg border-b-2 border-slate-600/40">Market Parameter</th>
                        <th className="text-center py-5 px-8 text-slate-200 font-bold text-lg border-b-2 border-slate-600/40">Current Value</th>
                        <th className="text-center py-5 px-8 text-slate-200 font-bold text-lg border-b-2 border-slate-600/40">Trend</th>
                        <th className="text-center py-5 px-8 text-slate-200 font-bold text-lg border-b-2 border-slate-600/40">Signal Strength</th>
                        <th className="text-right py-5 px-8 text-slate-200 font-bold text-lg border-b-2 border-slate-600/40">Confidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* 72% - High Signal Strength - Green */}
                      <tr className="bg-green-500/8 hover:bg-green-500/12 transition-all duration-300 border-b border-green-500/15">
                        <td className="py-6 px-8 text-white font-semibold text-lg">Overall Market Sentiment</td>
                        <td className="py-6 px-8 text-center">
                          <span className="text-green-300 font-bold text-xl">Bullish</span>
                        </td>
                        <td className="py-6 px-8 text-center">
                          <span className="text-green-300 font-semibold text-lg">↗ Upward</span>
                        </td>
                        <td className="py-6 px-8 text-center">
                          <div className="flex items-center justify-center space-x-3">
                            <div className="w-20 bg-gray-700/50 rounded-full h-3">
                              <div className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full" style={{width: '72%'}}></div>
                            </div>
                            <span className="text-green-300 font-bold text-lg">72%</span>
                          </div>
                        </td>
                        <td className="py-6 px-8 text-right">
                          <span className="text-green-300 font-bold text-lg">High</span>
                        </td>
                      </tr>
                      
                      {/* 68% - Medium-High Signal Strength - Light Green */}
                      <tr className="bg-green-500/6 hover:bg-green-500/10 transition-all duration-300 border-b border-green-500/12">
                        <td className="py-6 px-8 text-white font-semibold text-lg">Sector Performance</td>
                        <td className="py-6 px-8 text-center">
                          <span className="text-green-200 font-bold text-xl">Positive</span>
                        </td>
                        <td className="py-6 px-8 text-center">
                          <span className="text-green-200 font-semibold text-lg">→ Stable</span>
                        </td>
                        <td className="py-6 px-8 text-center">
                          <div className="flex items-center justify-center space-x-3">
                            <div className="w-20 bg-gray-700/50 rounded-full h-3">
                              <div className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full" style={{width: '68%'}}></div>
                            </div>
                            <span className="text-green-200 font-bold text-lg">68%</span>
                          </div>
                        </td>
                        <td className="py-6 px-8 text-right">
                          <span className="text-green-200 font-bold text-lg">Medium</span>
                        </td>
                      </tr>
                      
                      {/* 81% - Very High Signal Strength - Strong Green */}
                      <tr className="bg-green-500/10 hover:bg-green-500/15 transition-all duration-300 border-b border-green-500/20">
                        <td className="py-6 px-8 text-white font-semibold text-lg">Fund Category Outlook</td>
                        <td className="py-6 px-8 text-center">
                          <span className="text-green-400 font-bold text-xl">Strong</span>
                        </td>
                        <td className="py-6 px-8 text-center">
                          <span className="text-green-400 font-semibold text-lg">↗ Rising</span>
                        </td>
                        <td className="py-6 px-8 text-center">
                          <div className="flex items-center justify-center space-x-3">
                            <div className="w-20 bg-gray-700/50 rounded-full h-3">
                              <div className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full" style={{width: '81%'}}></div>
                            </div>
                            <span className="text-green-400 font-bold text-lg">81%</span>
                          </div>
                        </td>
                        <td className="py-6 px-8 text-right">
                          <span className="text-green-400 font-bold text-lg">Very High</span>
                        </td>
                      </tr>
                      
                      {/* 45% - Low Signal Strength - Red */}
                      <tr className="bg-red-500/6 hover:bg-red-500/10 transition-all duration-300 border-b border-red-500/12">
                        <td className="py-6 px-8 text-white font-semibold text-lg">Market Volatility Index</td>
                        <td className="py-6 px-8 text-center">
                          <span className="text-red-300 font-bold text-xl">Moderate</span>
                        </td>
                        <td className="py-6 px-8 text-center">
                          <span className="text-red-300 font-semibold text-lg">→ Neutral</span>
                        </td>
                        <td className="py-6 px-8 text-center">
                          <div className="flex items-center justify-center space-x-3">
                            <div className="w-20 bg-gray-700/50 rounded-full h-3">
                              <div className="bg-gradient-to-r from-red-500 to-red-400 h-3 rounded-full" style={{width: '45%'}}></div>
                            </div>
                            <span className="text-red-300 font-bold text-lg">45</span>
                          </div>
                        </td>
                        <td className="py-6 px-8 text-right">
                          <span className="text-red-300 font-bold text-lg">Medium</span>
                        </td>
                      </tr>
                      
                      {/* 82% - Highest Signal Strength - Strongest Green */}
                      <tr className="bg-green-500/12 hover:bg-green-500/18 transition-all duration-300">
                        <td className="py-6 px-8 text-white font-semibold text-lg">Investment Timing Score</td>
                        <td className="py-6 px-8 text-center">
                          <span className="text-green-400 font-bold text-2xl">8.2/10</span>
                        </td>
                        <td className="py-6 px-8 text-center">
                          <span className="text-green-400 font-semibold text-lg">↗ Optimal</span>
                        </td>
                        <td className="py-6 px-8 text-center">
                          <div className="flex items-center justify-center space-x-3">
                            <div className="w-20 bg-gray-700/50 rounded-full h-3">
                              <div className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full" style={{width: '82%'}}></div>
                            </div>
                            <span className="text-green-400 font-bold text-lg">82%</span>
                          </div>
                        </td>
                        <td className="py-6 px-8 text-right">
                          <span className="text-green-400 font-bold text-lg">Very High</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Comprehensive Market Analysis */}
              <div className="bg-gray-900/30 rounded-2xl border border-gray-700/50 p-10">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-500/10 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">Comprehensive Market Analysis</h4>
                </div>
                
                <div className="space-y-8 text-gray-300 leading-relaxed">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div>
                      <h5 className="text-blue-400 font-semibold text-lg mb-4">Current Market Environment</h5>
                      <p className="text-lg leading-relaxed mb-6">
                        The current market environment presents exceptionally favorable conditions for equity investments, with our AI-driven analysis indicating a strong bullish sentiment across major indices. The combination of robust corporate earnings growth, supportive monetary policy stance, and improving economic indicators has created an optimal investment window.
                      </p>
                      <p className="text-lg leading-relaxed">
                        Technical indicators show strong momentum with key resistance levels being consistently breached, while fundamental analysis reveals attractive valuations in select sectors. The volatility index remains at moderate levels, suggesting controlled market movements without excessive speculation.
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="text-green-400 font-semibold text-lg mb-4">Investment Timing Insights</h5>
                      <p className="text-lg leading-relaxed mb-6">
                        Our proprietary timing model, which analyzes over 200 market variables including sentiment indicators, technical patterns, and macroeconomic factors, currently shows an 8.2/10 score - indicating near-optimal entry conditions. Historical backtesting suggests that investments made during similar market conditions have generated superior risk-adjusted returns.
                      </p>
                      <p className="text-lg leading-relaxed">
                        The convergence of positive sentiment (72% bullish), strong sector performance (68% positive), and exceptional fund category outlook (81% strong) creates a rare alignment that typically occurs only 15-20% of the time, making this an opportune moment for strategic portfolio allocation.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/5 rounded-xl p-8 border border-blue-500/10 mt-8">
                    <h5 className="text-blue-400 font-semibold text-lg mb-4">FSI Research Summary</h5>
                    <p className="text-lg leading-relaxed">
                      Based on comprehensive analysis of market sentiment, technical indicators, and fundamental factors, FSI's AI-powered research indicates this as a favorable period for equity mutual fund consideration. The current market timing score of 8.2/10 reflects strong analytical conviction in near-term performance potential, supported by robust underlying economic fundamentals and positive investor sentiment trends. However, investors should maintain appropriate diversification and consider their individual risk tolerance and investment horizon.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="mb-8 space-y-8 clear-both">
              {/* Interactive Performance Chart */}
              <div className="bg-purple-500/5 rounded-2xl p-6 border border-purple-500/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <LineChart className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Performance Chart</h3>
                      <p className="text-gray-300">Interactive comparison with benchmark and category</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Chart Engine</div>
                    <div className="text-purple-400 font-bold">TradingView (Coming Soon)</div>
                  </div>
                </div>
                
                {/* Professional Performance Chart */}
                <div className="bg-gray-900 rounded-xl border border-gray-700 mb-6 h-96 relative overflow-hidden clear-both">
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Chart Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-700">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <span className="text-purple-500 font-bold text-lg">•</span>
                          <span className="text-white font-bold">Fund: +18.5%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-500 font-bold text-lg">•</span>
                          <span className="text-gray-300">Benchmark: +12.3%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500 font-bold text-lg">•</span>
                          <span className="text-gray-300">Category: +10.8%</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-purple-600 text-white rounded text-xs font-medium">1Y</button>
                        <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-xs">3Y</button>
                        <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-xs">5Y</button>
                        <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-xs">MAX</button>
                      </div>
                    </div>
                    
                    {/* Chart Canvas */}
                    <div className="flex-1 relative bg-gray-900 overflow-hidden">
                      {/* Y-Axis Labels */}
                      <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4 text-xs text-gray-500">
                        <span>25%</span>
                        <span>20%</span>
                        <span>15%</span>
                        <span>10%</span>
                        <span>5%</span>
                        <span>0%</span>
                      </div>
                      
                      {/* Chart Area */}
                      <div className="ml-12 mr-4 h-full relative">
                        <svg viewBox="0 0 600 250" className="w-full h-full block">
                          {/* Grid */}
                          <defs>
                            <pattern id="perfChartGrid" width="60" height="25" patternUnits="userSpaceOnUse">
                              <path d="M 60 0 L 0 0 0 25" fill="none" stroke="#374151" strokeWidth="0.3" opacity="0.4"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#perfChartGrid)" />
                          
                          {/* Fund Performance Line (Purple) */}
                          <path d="M 30 200 L 80 190 L 130 175 L 180 160 L 230 140 L 280 125 L 330 110 L 380 95 L 430 80 L 480 65 L 530 50" 
                                stroke="#8B5CF6" strokeWidth="3" fill="none" />
                          
                          {/* Benchmark Line (Blue) */}
                          <path d="M 30 210 L 80 205 L 130 195 L 180 185 L 230 170 L 280 160 L 330 150 L 380 140 L 430 130 L 480 120 L 530 110" 
                                stroke="#3B82F6" strokeWidth="2" fill="none" />
                          
                          {/* Category Average Line (Yellow, Dashed) */}
                          <path d="M 30 215 L 80 210 L 130 200 L 180 190 L 230 180 L 280 170 L 330 160 L 380 150 L 430 140 L 480 130 L 530 120" 
                                stroke="#EAB308" strokeWidth="2" fill="none" strokeDasharray="4,4" />
                          
                          {/* Performance Area Fill */}
                          <defs>
                            <linearGradient id="fundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2"/>
                              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.05"/>
                            </linearGradient>
                          </defs>
                          <path d="M 30 200 L 80 190 L 130 175 L 180 160 L 230 140 L 280 125 L 330 110 L 380 95 L 430 80 L 480 65 L 530 50 L 530 250 L 30 250 Z" 
                                fill="url(#fundGradient)" />
                          
                          {/* Data Points */}
                          <circle cx="530" cy="50" r="4" fill="#8B5CF6" stroke="#1F2937" strokeWidth="2"/>
                          <circle cx="530" cy="110" r="3" fill="#3B82F6" stroke="#1F2937" strokeWidth="2"/>
                          <circle cx="530" cy="120" r="3" fill="#EAB308" stroke="#1F2937" strokeWidth="2"/>
                          
                          {/* Milestone Markers */}
                          <line x1="180" y1="0" x2="180" y2="250" stroke="#6B7280" strokeWidth="1" strokeDasharray="2,2" opacity="0.3"/>
                          <text x="185" y="15" fill="#9CA3AF" fontSize="10">Q1 2024</text>
                          
                          <line x1="380" y1="0" x2="380" y2="250" stroke="#6B7280" strokeWidth="1" strokeDasharray="2,2" opacity="0.3"/>
                          <text x="385" y="15" fill="#9CA3AF" fontSize="10">Q3 2024</text>
                        </svg>
                        
                        {/* Crosshair */}
                        <div className="absolute top-1/3 left-2/3 w-px h-full bg-gray-400 opacity-20 pointer-events-none"></div>
                        <div className="absolute top-1/3 left-0 w-full h-px bg-gray-400 opacity-20 pointer-events-none"></div>
                      </div>
                      
                      {/* X-Axis Labels */}
                      <div className="absolute bottom-2 left-12 right-4 flex justify-between text-xs text-gray-500">
                        <span>Jan '24</span>
                        <span>Mar '24</span>
                        <span>May '24</span>
                        <span>Jul '24</span>
                        <span>Sep '24</span>
                        <span>Nov '24</span>
                      </div>
                      
                      {/* Performance Stats Overlay */}
                      <div className="absolute top-4 right-4 bg-gray-800/95 rounded-lg p-4 border border-gray-600">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between space-x-6">
                            <span className="text-purple-400 font-medium">Fund Return</span>
                            <span className="text-white font-bold">+18.5%</span>
                          </div>
                          <div className="flex items-center justify-between space-x-6">
                            <span className="text-blue-400 font-medium">Benchmark</span>
                            <span className="text-white font-bold">+12.3%</span>
                          </div>
                          <div className="flex items-center justify-between space-x-6">
                            <span className="text-yellow-400 font-medium">Category Avg</span>
                            <span className="text-white font-bold">+10.8%</span>
                          </div>
                          <hr className="border-gray-600 my-2" />
                          <div className="flex items-center justify-between space-x-6">
                            <span className="text-green-400 font-medium">Alpha</span>
                            <span className="text-green-400 font-bold">+6.2%</span>
                          </div>
                          <div className="flex items-center justify-between space-x-6">
                            <span className="text-gray-400">Sharpe Ratio</span>
                            <span className="text-white font-bold">1.85</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Chart Footer */}
                    <div className="flex items-center justify-between p-3 border-t border-gray-700 bg-gray-800/50">
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <span>Outperformance: <span className="text-green-400 font-bold">+6.2%</span></span>
                        <span>•</span>
                        <span>Volatility: <span className="text-yellow-400">12.4%</span></span>
                        <span>•</span>
                        <span>Max Drawdown: <span className="text-red-400">-8.2%</span></span>
                      </div>
                      <div className="text-xs text-gray-500">
                        TradingView Integration • Live Data Coming Soon
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Returns Comparison */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Returns vs Benchmark</h3>
                    <p className="text-gray-300">Performance comparison across different time periods</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600 font-bold">■</span>
                      <span className="text-sm text-gray-300 font-medium">Fund Returns</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 font-bold">■</span>
                      <span className="text-sm text-gray-300 font-medium">Benchmark</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                  {Object.entries(fsiData.performance.returns).map(([period, returns]) => {
                    const benchmarkReturn = fsiData.performance.benchmark[period as keyof typeof fsiData.performance.benchmark];
                    const outperformance = returns - benchmarkReturn;
                    return (
                      <div key={period} className="text-center p-4">
                        <div className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">{period}</div>
                        <div className="text-3xl font-black text-blue-400 mb-2">{returns}%</div>
                        <div className="text-sm text-gray-400 mb-2">{benchmarkReturn}%</div>
                        <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          outperformance > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {outperformance > 0 ? '+' : ''}{outperformance.toFixed(1)}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        {/* Risk Tab */}
        {activeTab === 'risk' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {Object.entries(fsiData.risk).map(([key, value]) => {
                const getRiskColor = (key: string, value: number) => {
                  if (key === 'sharpeRatio') return value > 1 ? 'text-green-600' : 'text-yellow-600';
                  if (key === 'volatility' || key === 'maxDrawdown') return value < 15 ? 'text-green-600' : 'text-red-600';
                  return 'text-blue-600';
                };
                
                const getRiskBg = (key: string, value: number) => {
                  if (key === 'sharpeRatio') return value > 1 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200';
                  if (key === 'volatility' || key === 'maxDrawdown') return value < 15 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
                  return 'bg-blue-50 border-blue-200';
                };
                
                return (
                  <div key={key} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-white capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                      <Shield className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className={`text-4xl font-black mb-3 ${getRiskColor(key, value)}`}>
                      {value}{key === 'volatility' || key === 'maxDrawdown' || key === 'var95' ? '%' : ''}
                    </div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed">
                      {key === 'volatility' && 'Measure of price fluctuation over time'}
                      {key === 'sharpeRatio' && 'Risk-adjusted returns efficiency'}
                      {key === 'beta' && 'Sensitivity to market movements'}
                      {key === 'maxDrawdown' && 'Maximum loss from peak value'}
                      {key === 'var95' && 'Value at Risk (95% confidence)'}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-600">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 uppercase tracking-wide">Risk Level</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          key === 'sharpeRatio' && value > 1 ? 'bg-green-100 text-green-700' :
                          (key === 'volatility' || key === 'maxDrawdown') && value < 15 ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {key === 'sharpeRatio' && value > 1 ? 'Excellent' :
                           (key === 'volatility' || key === 'maxDrawdown') && value < 15 ? 'Low' :
                           'Moderate'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="space-y-12 mb-8">
              {/* Sector Allocation Analysis */}
              <div className="bg-purple-500/5 rounded-3xl p-10 border border-purple-500/10">
                <div className="flex items-center space-x-6 mb-10">
                  <div className="w-16 h-16 flex items-center justify-center bg-purple-500/10 rounded-3xl">
                    <PieChart className="w-8 h-8 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">Sector Allocation & Future Outlook</h3>
                    <p className="text-gray-300 text-lg">Comprehensive sector analysis with AI-powered future projections</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-8">
                  {[
                    {
                      name: 'Technology',
                      allocation: 28.5,
                      performance: '+12.4%',
                      outlook: 'Bullish',
                      confidence: 'Very High',
                      prediction: '+24%',
                      analysis: 'Strong fundamentals driven by digital transformation, AI adoption, and robust IT services demand. Expected to benefit from increasing enterprise digitization and cloud migration trends.',
                      keyFactors: ['Digital transformation acceleration', 'AI and cloud adoption', 'Strong export demand', 'Talent availability'],
                      risks: ['Wage inflation', 'Currency volatility', 'Global economic slowdown']
                    },
                    {
                      name: 'Financial Services',
                      allocation: 22.1,
                      performance: '+8.7%',
                      outlook: 'Positive',
                      confidence: 'High',
                      prediction: '+18%',
                      analysis: 'Banking sector showing resilience with improving asset quality and strong credit growth. NBFCs benefiting from financial inclusion and digital lending innovations.',
                      keyFactors: ['Credit growth recovery', 'Improving asset quality', 'Digital banking adoption', 'Financial inclusion'],
                      risks: ['Interest rate volatility', 'Regulatory changes', 'Economic slowdown impact']
                    },
                    {
                      name: 'Healthcare',
                      allocation: 15.3,
                      performance: '+15.2%',
                      outlook: 'Very Positive',
                      confidence: 'High',
                      prediction: '+22%',
                      analysis: 'Healthcare sector positioned for strong growth with increasing healthcare spending, aging population, and medical tourism recovery post-pandemic.',
                      keyFactors: ['Rising healthcare spending', 'Medical tourism recovery', 'Innovation in treatments', 'Government healthcare initiatives'],
                      risks: ['Regulatory pricing pressures', 'Competition from generics', 'R&D investment requirements']
                    },
                    {
                      name: 'Consumer Goods',
                      allocation: 12.8,
                      performance: '+6.9%',
                      outlook: 'Neutral',
                      confidence: 'Medium',
                      prediction: '+12%',
                      analysis: 'Mixed outlook with rural demand recovery offset by urban slowdown. Premium products showing resilience while mass market faces pressure from inflation.',
                      keyFactors: ['Rural demand recovery', 'Premiumization trend', 'Distribution expansion', 'Brand strength'],
                      risks: ['Raw material inflation', 'Rural income pressure', 'Changing consumer preferences']
                    },
                    {
                      name: 'Energy',
                      allocation: 10.2,
                      performance: '+18.3%',
                      outlook: 'Positive',
                      confidence: 'Medium',
                      prediction: '+15%',
                      analysis: 'Energy transition creating opportunities in renewables while traditional energy benefits from stable demand and improved refining margins.',
                      keyFactors: ['Renewable energy transition', 'Stable oil demand', 'Refining margin improvement', 'Government policy support'],
                      risks: ['Commodity price volatility', 'Environmental regulations', 'Energy transition costs']
                    },
                    {
                      name: 'Others',
                      allocation: 11.1,
                      performance: '+9.1%',
                      outlook: 'Mixed',
                      confidence: 'Medium',
                      prediction: '+10%',
                      analysis: 'Diversified exposure across infrastructure, telecom, and industrial sectors with varying growth trajectories and cyclical patterns.',
                      keyFactors: ['Infrastructure spending', 'Industrial recovery', 'Telecom consolidation', 'Government capex'],
                      risks: ['Cyclical volatility', 'Execution challenges', 'Regulatory uncertainties']
                    }
                  ].map((sector, index) => {
                    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500', 'bg-indigo-500'];
                    const textColors = ['text-blue-400', 'text-green-400', 'text-purple-400', 'text-yellow-400', 'text-red-400', 'text-indigo-400'];
                    return (
                      <div key={index} className="bg-gray-900/40 rounded-2xl p-8 border border-gray-700/30">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          {/* Sector Overview */}
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className={`w-4 h-4 ${colors[index % colors.length]} rounded-full`}></div>
                                <h4 className="text-xl font-bold text-white">{sector.name}</h4>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-sm font-bold ${colors[index % colors.length]}/20 ${textColors[index % textColors.length]}`}>
                                {sector.allocation}%
                              </span>
                            </div>
                            
                            <div className="w-full bg-gray-700/50 rounded-full h-3 mb-6">
                              <div 
                                className={`${colors[index % colors.length]} h-3 rounded-full transition-all duration-1000`}
                                style={{ width: `${sector.allocation}%` }}
                              ></div>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Performance</span>
                                <span className="text-green-400 font-bold">{sector.performance}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Outlook</span>
                                <span className={`font-bold ${
                                  sector.outlook === 'Very Positive' ? 'text-green-400' :
                                  sector.outlook === 'Bullish' || sector.outlook === 'Positive' ? 'text-blue-400' :
                                  sector.outlook === 'Neutral' ? 'text-yellow-400' : 'text-red-400'
                                }`}>{sector.outlook}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Prediction</span>
                                <span className="text-green-400 font-bold">{sector.prediction}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Analysis */}
                          <div className="lg:col-span-2">
                            <h5 className={`font-bold text-lg mb-4 ${textColors[index % textColors.length]}`}>Sector Analysis</h5>
                            <p className="text-gray-300 leading-relaxed mb-6">{sector.analysis}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h6 className="text-green-400 font-semibold mb-3">Key Growth Factors</h6>
                                <ul className="space-y-2">
                                  {sector.keyFactors.map((factor, idx) => (
                                    <li key={idx} className="flex items-start space-x-2">
                                      <span className="text-green-400 mt-1">•</span>
                                      <span className="text-gray-300 text-sm">{factor}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h6 className="text-orange-400 font-semibold mb-3">Key Risks</h6>
                                <ul className="space-y-2">
                                  {sector.risks.map((risk, idx) => (
                                    <li key={idx} className="flex items-start space-x-2">
                                      <span className="text-orange-400 mt-1">•</span>
                                      <span className="text-gray-300 text-sm">{risk}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end">
                              <button className={`px-6 py-3 ${colors[index % colors.length]} hover:opacity-80 text-white rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2`}>
                                <BarChart3 className="w-4 h-4" />
                                <span>Detailed Sector Analysis</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Complete Portfolio Holdings */}
              <div className="bg-blue-500/5 rounded-3xl p-10 border border-blue-500/10">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 flex items-center justify-center bg-blue-500/10 rounded-3xl">
                      <Building className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">Complete Portfolio Holdings</h3>
                      <p className="text-gray-300 text-lg">Full portfolio with ASI ratings and detailed analysis</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-lg">Total Holdings</div>
                    <div className="text-4xl font-bold text-blue-400">47</div>
                  </div>
                </div>
                
                {/* Holdings Table */}
                <div className="bg-gray-900/40 rounded-2xl overflow-hidden border border-gray-700/30">
                  <div className="bg-gradient-to-r from-slate-800/60 to-slate-700/60">
                    <div className="grid grid-cols-6 gap-4 p-6 text-slate-200 font-bold text-lg">
                      <div>Stock Name</div>
                      <div className="text-center">Allocation</div>
                      <div className="text-center">Current Price</div>
                      <div className="text-center">ASI Rating</div>
                      <div className="text-center">Future Outlook</div>
                      <div className="text-center">Analysis</div>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-700/50">
                    {[
                      { name: 'Reliance Industries', allocation: '8.2%', price: '₹2,847', asiRating: 'A+', outlook: '+18%', confidence: 'High' },
                      { name: 'TCS', allocation: '6.8%', price: '₹3,421', asiRating: 'A+', outlook: '+22%', confidence: 'Very High' },
                      { name: 'HDFC Bank', allocation: '5.9%', price: '₹1,632', asiRating: 'A', outlook: '+12%', confidence: 'Medium' },
                      { name: 'Infosys', allocation: '5.1%', price: '₹1,498', asiRating: 'A+', outlook: '+25%', confidence: 'High' },
                      { name: 'ICICI Bank', allocation: '4.7%', price: '₹1,089', asiRating: 'A', outlook: '+15%', confidence: 'High' },
                      { name: 'Hindustan Unilever', allocation: '4.2%', price: '₹2,654', asiRating: 'A-', outlook: '+8%', confidence: 'Medium' },
                      { name: 'ITC', allocation: '3.8%', price: '₹456', asiRating: 'B+', outlook: '+5%', confidence: 'Low' },
                      { name: 'Bharti Airtel', allocation: '3.5%', price: '₹1,234', asiRating: 'A', outlook: '+16%', confidence: 'High' },
                      { name: 'Kotak Mahindra Bank', allocation: '3.2%', price: '₹1,876', asiRating: 'A', outlook: '+14%', confidence: 'Medium' },
                      { name: 'Axis Bank', allocation: '2.9%', price: '₹1,123', asiRating: 'B+', outlook: '+10%', confidence: 'Medium' },
                      { name: 'Larsen & Toubro', allocation: '2.7%', price: '₹3,456', asiRating: 'A-', outlook: '+12%', confidence: 'Medium' },
                      { name: 'Asian Paints', allocation: '2.5%', price: '₹3,234', asiRating: 'A', outlook: '+9%', confidence: 'Medium' },
                      { name: 'Maruti Suzuki', allocation: '2.3%', price: '₹11,234', asiRating: 'B+', outlook: '+7%', confidence: 'Low' },
                      { name: 'Wipro', allocation: '2.1%', price: '₹456', asiRating: 'A-', outlook: '+13%', confidence: 'Medium' },
                      { name: 'Nestle India', allocation: '1.9%', price: '₹23,456', asiRating: 'A+', outlook: '+11%', confidence: 'High' },
                      { name: 'HCL Technologies', allocation: '1.8%', price: '₹1,567', asiRating: 'A', outlook: '+19%', confidence: 'High' },
                      { name: 'Bajaj Finance', allocation: '1.6%', price: '₹6,789', asiRating: 'A-', outlook: '+8%', confidence: 'Medium' },
                      { name: 'UltraTech Cement', allocation: '1.5%', price: '₹8,234', asiRating: 'B+', outlook: '+6%', confidence: 'Low' },
                      { name: 'Tech Mahindra', allocation: '1.4%', price: '₹1,234', asiRating: 'A-', outlook: '+14%', confidence: 'Medium' },
                      { name: 'Sun Pharma', allocation: '1.3%', price: '₹1,456', asiRating: 'B+', outlook: '+9%', confidence: 'Medium' },
                      { name: 'Titan Company', allocation: '1.2%', price: '₹3,234', asiRating: 'A', outlook: '+17%', confidence: 'High' },
                      { name: 'Power Grid Corp', allocation: '1.1%', price: '₹234', asiRating: 'B', outlook: '+4%', confidence: 'Low' },
                      { name: 'NTPC', allocation: '1.0%', price: '₹234', asiRating: 'B', outlook: '+3%', confidence: 'Low' },
                      { name: 'Bajaj Finserv', allocation: '0.9%', price: '₹1,567', asiRating: 'A-', outlook: '+11%', confidence: 'Medium' },
                      { name: 'Dr Reddys Labs', allocation: '0.8%', price: '₹5,234', asiRating: 'B+', outlook: '+8%', confidence: 'Medium' }
                    ].map((holding, index) => (
                      <div key={index} className="grid grid-cols-6 gap-4 p-4 hover:bg-gray-700/30 transition-colors duration-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xs">{index + 1}</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">{holding.name}</div>
                            <div className="text-gray-400 text-xs">NSE Listed</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-bold">{holding.allocation}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-medium">{holding.price}</div>
                        </div>
                        <div className="text-center">
                          <div className={`inline-flex px-2 py-1 rounded-full text-xs font-bold ${
                            holding.asiRating.startsWith('A+') ? 'bg-green-500/20 text-green-400' :
                            holding.asiRating.startsWith('A') ? 'bg-blue-500/20 text-blue-400' :
                            holding.asiRating.startsWith('B+') ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {holding.asiRating}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className={`font-bold ${
                            holding.outlook.startsWith('+') && parseInt(holding.outlook.slice(1)) >= 15 ? 'text-green-400' :
                            holding.outlook.startsWith('+') && parseInt(holding.outlook.slice(1)) >= 10 ? 'text-blue-400' :
                            holding.outlook.startsWith('+') ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {holding.outlook}
                          </div>
                          <div className={`text-xs ${
                            holding.confidence === 'Very High' ? 'text-green-400' :
                            holding.confidence === 'High' ? 'text-blue-400' :
                            holding.confidence === 'Medium' ? 'text-yellow-400' :
                            'text-red-400'
                          }`}>
                            {holding.confidence}
                          </div>
                        </div>
                        <div className="text-center">
                          <button 
                            onClick={() => {
                              // Open detailed stock analysis modal
                              setSelectedStock(holding);
                              setShowStockAnalysis(true);
                            }}
                            className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-medium transition-colors duration-200 flex items-center space-x-1"
                          >
                            <BarChart3 className="w-3 h-3" />
                            <span>Analyze</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Show More Button */}
                  <div className="p-4 text-center border-t border-gray-700/50">
                    <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200">
                      Show All 47 Holdings
                    </button>
                  </div>
                </div>
                
                {/* ASI Rating Legend */}
                <div className="mt-6 bg-gray-800/30 rounded-xl p-4">
                  <h4 className="text-white font-bold mb-3">ASI Rating System</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-500 font-bold">●</span>
                      <span className="text-gray-300 text-sm"><strong>A+:</strong> Exceptional Growth</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-500 font-bold">●</span>
                      <span className="text-gray-300 text-sm"><strong>A:</strong> Strong Performance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-500 font-bold">●</span>
                      <span className="text-gray-300 text-sm"><strong>B+:</strong> Moderate Growth</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-500 font-bold">●</span>
                      <span className="text-gray-300 text-sm"><strong>B:</strong> Conservative</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Action Buttons */}
        <div className="text-center mb-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">Interested in this Fund?</h3>
          <p className="text-gray-400">Based on our analysis, this fund has shown consistent historical performance</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button 
              onClick={() => router.push(`/investment?fundId=${fundId}&fundName=${encodeURIComponent(fundName)}`)}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600 text-white rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
            >
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                <DollarSign className="w-4 h-4" />
              </div>
              <span className="text-lg">Start Investing</span>
              <div className="w-2 h-2 bg-white/60 rounded-full group-hover:bg-white transition-all duration-300"></div>
            </button>
            <button 
              onClick={() => router.push('/mutual-funds')}
              className="group px-8 py-4 hover:bg-white/10 text-white hover:text-gray-200 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-lg">Explore More Funds</span>
            </button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              <Shield className="w-4 h-4 inline mr-1" />
              SEBI Registered • Mutual fund investments are subject to market risks
            </p>
        </div>
      </div>
      
      {/* Detailed Stock Analysis Modal */}
      {showStockAnalysis && selectedStock && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowStockAnalysis(false)}
        >
          <div 
            className="bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedStock.name}</h2>
                    <p className="text-gray-400">Comprehensive ASI Stock Analysis with Satellite Data</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setShowStockAnalysis(false)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                    Close Analysis
                  </button>
                  <button 
                    onClick={() => setShowStockAnalysis(false)}
                    className="w-10 h-10 bg-red-600 hover:bg-red-500 rounded-xl flex items-center justify-center transition-colors duration-200"
                  >
                    <XCircle className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Stock Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400 mb-1">{selectedStock.price}</div>
                  <div className="text-sm text-gray-400">Current Price</div>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                  <div className="text-2xl font-bold text-green-400 mb-1">{selectedStock.outlook}</div>
                  <div className="text-sm text-gray-400">12M Target</div>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-400 mb-1">{selectedStock.asiRating}</div>
                  <div className="text-sm text-gray-400">ASI Rating</div>
                </div>
                <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">{selectedStock.allocation}</div>
                  <div className="text-sm text-gray-400">Portfolio Weight</div>
                </div>
              </div>
              
              {/* Stock Price Chart */}
              <div className="bg-gray-800/30 rounded-xl p-4 h-64 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                        <LineChart className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-bold">{selectedStock.name} Price Chart</div>
                        <div className="text-gray-400 text-xs">TradingView Integration Coming Soon</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-2 py-1 bg-purple-600 text-white rounded text-xs">1M</button>
                      <button className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">3M</button>
                      <button className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">1Y</button>
                    </div>
                  </div>
                  
                  <div className="flex-1 relative">
                    <svg viewBox="0 0 300 120" className="w-full h-full">
                      {/* Grid */}
                      <defs>
                        <pattern id="stockGrid" width="30" height="12" patternUnits="userSpaceOnUse">
                          <path d="M 30 0 L 0 0 0 12" fill="none" stroke="#374151" strokeWidth="0.3" opacity="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#stockGrid)" />
                      
                      {/* Stock Price Line */}
                      <path d="M 10 100 Q 50 90 80 85 T 140 70 T 200 65 T 260 55" 
                            stroke="#8B5CF6" strokeWidth="2" fill="none" />
                      
                      {/* Volume Bars */}
                      <rect x="10" y="110" width="2" height="8" fill="#6B7280" opacity="0.6" />
                      <rect x="30" y="108" width="2" height="10" fill="#6B7280" opacity="0.6" />
                      <rect x="50" y="105" width="2" height="13" fill="#6B7280" opacity="0.6" />
                      <rect x="70" y="107" width="2" height="11" fill="#6B7280" opacity="0.6" />
                      
                      {/* Current Price Point */}
                      <circle cx="260" cy="55" r="3" fill="#8B5CF6" />
                      <text x="265" y="50" fill="#8B5CF6" fontSize="8" fontWeight="bold">{selectedStock.price}</text>
                    </svg>
                    
                    <div className="absolute top-2 right-2 bg-gray-900/80 rounded p-2">
                      <div className="text-green-400 text-xs font-bold">+2.3%</div>
                      <div className="text-gray-400 text-xs">Today</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* ASI Analysis Parameters */}
              <div className="bg-gray-800/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">ASI Analysis Parameters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Technical Indicators</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">RSI (14)</span>
                        <span className="text-green-400 font-bold">58.2 (Neutral)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">MACD Signal</span>
                        <span className="text-blue-400 font-bold">Bullish</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Moving Average</span>
                        <span className="text-green-400 font-bold">Above 50 & 200 MA</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Volume Trend</span>
                        <span className="text-blue-400 font-bold">Increasing</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Fundamental Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">P/E Ratio</span>
                        <span className="text-green-400 font-bold">18.5 (Attractive)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">ROE</span>
                        <span className="text-blue-400 font-bold">22.8%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Debt/Equity</span>
                        <span className="text-green-400 font-bold">0.35 (Low)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Revenue Growth</span>
                        <span className="text-blue-400 font-bold">15.2% YoY</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Future Prediction Model */}
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-bold text-white mb-4">AI Future Prediction Model</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Market Sentiment</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">News Sentiment</span>
                        <span className="text-green-400 font-bold text-sm">78% Positive</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Analyst Coverage</span>
                        <span className="text-blue-400 font-bold text-sm">12 Buy, 3 Hold</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Social Media</span>
                        <span className="text-green-400 font-bold text-sm">Bullish</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Sector Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Sector Growth</span>
                        <span className="text-green-400 font-bold text-sm">18.5% CAGR</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Market Share</span>
                        <span className="text-blue-400 font-bold text-sm">Leading Position</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Competition</span>
                        <span className="text-yellow-400 font-bold text-sm">Moderate</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Risk Factors</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Volatility</span>
                        <span className="text-yellow-400 font-bold text-sm">Moderate</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Regulatory Risk</span>
                        <span className="text-green-400 font-bold text-sm">Low</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Liquidity</span>
                        <span className="text-green-400 font-bold text-sm">High</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Satellite Data Analysis */}
              <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-xl p-6 border border-green-500/20">
                <h3 className="text-xl font-bold text-white mb-4">Satellite Data Intelligence</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Geospatial Insights</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Factory Activity</span>
                        <span className="text-green-400 font-bold">High (↑15%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Supply Chain Flow</span>
                        <span className="text-blue-400 font-bold">Optimal</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Infrastructure Expansion</span>
                        <span className="text-green-400 font-bold">Active (3 sites)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Regional Demand</span>
                        <span className="text-blue-400 font-bold">Growing</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Environmental Factors</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Weather Impact</span>
                        <span className="text-green-400 font-bold">Favorable</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Seasonal Patterns</span>
                        <span className="text-blue-400 font-bold">Stable</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Resource Availability</span>
                        <span className="text-green-400 font-bold">Abundant</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">ESG Compliance</span>
                        <span className="text-blue-400 font-bold">Excellent</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-800/40 rounded-xl p-4">
                  <h4 className="text-white font-bold mb-3">Satellite Data Insights Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-green-500/10 rounded-lg">
                      <div className="text-lg font-bold text-green-400 mb-1">92%</div>
                      <div className="text-xs text-gray-400">Operational Efficiency</div>
                    </div>
                    <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                      <div className="text-lg font-bold text-blue-400 mb-1">+18%</div>
                      <div className="text-xs text-gray-400">Capacity Utilization</div>
                    </div>
                    <div className="text-center p-3 bg-purple-500/10 rounded-lg">
                      <div className="text-lg font-bold text-purple-400 mb-1">A+</div>
                      <div className="text-xs text-gray-400">Sustainability Score</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stock Analysis Summary */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
                <div className="flex items-center space-x-4 mb-4">
                  <Info className="w-8 h-8 text-blue-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">ASI Analysis Summary</h3>
                    <p className="text-gray-300">Based on comprehensive multi-parameter analysis</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Key Strengths</h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span className="text-gray-300 text-sm">Strong financial fundamentals with consistent growth</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span className="text-gray-300 text-sm">Market leadership position in growing sector</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span className="text-gray-300 text-sm">Positive technical indicators and momentum</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Key Observations</h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span className="text-gray-300 text-sm">Current allocation aligns with fund strategy</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span className="text-gray-300 text-sm">Quarterly results show consistent patterns</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span className="text-gray-300 text-sm">Historical performance during market corrections</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FSIAnalysisPage;
