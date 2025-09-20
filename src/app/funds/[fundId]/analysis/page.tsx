'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, BarChart3, PieChart, Activity, Award, Shield, Users, Calendar, DollarSign, Target, Zap, Brain, Eye, AlertTriangle, CheckCircle, Star, ArrowRight, Download, Share2 } from 'lucide-react';
import PayTMStyleNavigation from '../../../../components/PayTMStyleNavigation';
import { useRouter, useParams } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const FundAnalysisPage = () => {
  const router = useRouter();
  const params = useParams();
  const fundId = params.fundId as string;
  
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  // Mock comprehensive fund data with FSI analysis
  const fundData = {
    id: fundId,
    name: "HDFC Top 100 Fund",
    fullName: "HDFC Top 100 Fund - Direct Growth",
    category: "Large Cap Equity",
    nav: 847.32,
    navChange: 2.45,
    navChangePercent: 0.29,
    aum: 45678,
    expenseRatio: 0.45,
    rating: 4.5,
    benchmark: "NIFTY 100 TRI",
    fundManager: "Rahul Baijal",
    inception: "Oct 30, 2010",
    riskLevel: "Moderately High",
    exitLoad: "1% if redeemed within 1 year",
    minSipAmount: 500,
    minLumpsumAmount: 5000,
    
    // FSI Analysis Data
    fsiScore: 87.5,
    fsiGrade: "A+",
    fsiPredictions: {
      "1Y": { return: 14.2, confidence: 85, scenario: "Bullish" },
      "3Y": { return: 15.1, confidence: 78, scenario: "Moderate Bullish" },
      "5Y": { return: 16.4, confidence: 72, scenario: "Long-term Growth" }
    },
    
    // Performance Data
    performanceData: [
      { period: '2019', fund: 12.5, benchmark: 11.2, category: 10.8 },
      { period: '2020', fund: 15.8, benchmark: 14.3, category: 13.9 },
      { period: '2021', fund: 22.4, benchmark: 20.1, category: 19.7 },
      { period: '2022', fund: -8.2, benchmark: -9.1, category: -10.3 },
      { period: '2023', fund: 18.7, benchmark: 16.9, category: 17.2 },
      { period: '2024', fund: 14.2, benchmark: 13.8, category: 13.1 }
    ],
    
    // Portfolio Holdings
    topHoldings: [
      { name: "Reliance Industries", percentage: 8.45, sector: "Energy" },
      { name: "HDFC Bank", percentage: 7.23, sector: "Banking" },
      { name: "Infosys", percentage: 6.78, sector: "IT" },
      { name: "TCS", percentage: 5.92, sector: "IT" },
      { name: "ICICI Bank", percentage: 5.34, sector: "Banking" }
    ],
    
    // Sector Allocation
    sectorAllocation: [
      { name: "Banking & Financial", value: 28.5, color: "#3B82F6" },
      { name: "Information Technology", value: 22.3, color: "#10B981" },
      { name: "Energy", value: 12.8, color: "#F59E0B" },
      { name: "Consumer Goods", value: 11.2, color: "#EF4444" },
      { name: "Healthcare", value: 8.7, color: "#8B5CF6" },
      { name: "Others", value: 16.5, color: "#6B7280" }
    ],
    
    // Risk Metrics
    riskMetrics: {
      volatility: 15.2,
      sharpeRatio: 1.34,
      beta: 0.98,
      alpha: 2.1,
      maxDrawdown: -18.5,
      var95: -12.3
    },
    
    // FSI AI Insights
    aiInsights: [
      {
        type: "strength",
        title: "Strong Momentum Indicators",
        description: "Technical analysis shows bullish momentum with RSI at 65 and MACD showing positive divergence.",
        confidence: 88
      },
      {
        type: "opportunity",
        title: "Sector Rotation Advantage",
        description: "Current allocation benefits from expected rotation into value stocks in banking and energy sectors.",
        confidence: 76
      },
      {
        type: "risk",
        title: "Market Concentration Risk",
        description: "High exposure to top 10 holdings (52%) may increase volatility during market corrections.",
        confidence: 82
      },
      {
        type: "recommendation",
        title: "Optimal Entry Point",
        description: "Current valuation metrics suggest favorable entry point for long-term investors.",
        confidence: 79
      }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart },
    { id: 'risk', label: 'Risk Analysis', icon: Shield },
    { id: 'fsi-insights', label: 'FSI AI Insights', icon: Brain }
  ];

  const handleInvestNow = () => {
    router.push(`/investment/${fundId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-900">
      <PayTMStyleNavigation />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header with Back Button */}
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={() => router.back()}
              className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">{fundData.name}</h1>
              <p className="text-gray-300">{fundData.fullName}</p>
            </div>
          </div>

          {/* Fund Summary Card */}
          <div className="mb-8 p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* NAV & Change */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                  <span className="text-3xl font-bold text-white">₹{fundData.nav.toFixed(2)}</span>
                  <span className={`text-lg font-medium ${fundData.navChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {fundData.navChange >= 0 ? '+' : ''}{fundData.navChange.toFixed(2)} ({fundData.navChangePercent >= 0 ? '+' : ''}{fundData.navChangePercent.toFixed(2)}%)
                  </span>
                </div>
                <p className="text-gray-400">Current NAV</p>
              </div>

              {/* FSI Score */}
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse opacity-20"></div>
                  <div className="relative w-full h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{fundData.fsiScore}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">FSI Grade: {fundData.fsiGrade}</div>
                  <p className="text-gray-400 text-sm">AI Analysis Score</p>
                </div>
              </div>

              {/* Rating */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-6 h-6 ${i < Math.floor(fundData.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                  ))}
                  <span className="ml-2 text-xl font-bold text-white">({fundData.rating})</span>
                </div>
                <p className="text-gray-400">Fund Rating</p>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleInvestNow}
                  className="relative overflow-hidden py-3 px-6 rounded-xl border-2 border-blue-400 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold transition-all duration-500 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <ArrowRight className="w-5 h-5" />
                  <span>Invest Now</span>
                </button>
                
                <div className="flex space-x-2">
                  <button className="flex-1 py-2 px-4 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg font-medium transition-all flex items-center justify-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>Report</span>
                  </button>
                  <button className="flex-1 py-2 px-4 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg font-medium transition-all flex items-center justify-center space-x-1">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex-1 py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 animate-pulse rounded-xl"></div>
                    )}
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.label}</span>
                    {isActive && (
                      <>
                        <div className="absolute top-1 right-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                        <div className="absolute bottom-1 left-2 w-1 h-1 bg-white rounded-full animate-ping delay-300"></div>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'overview' && <OverviewTab fundData={fundData} />}
            {activeTab === 'performance' && <PerformanceTab fundData={fundData} />}
            {activeTab === 'portfolio' && <PortfolioTab fundData={fundData} />}
            {activeTab === 'risk' && <RiskAnalysisTab fundData={fundData} />}
            {activeTab === 'fsi-insights' && <FSIInsightsTab fundData={fundData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ fundData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    
    {/* Key Metrics */}
    <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <BarChart3 className="w-6 h-6 text-blue-400" />
        <span>Key Metrics</span>
      </h3>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-gray-400 text-sm mb-1">AUM</p>
          <p className="text-2xl font-bold text-white">₹{(fundData.aum / 1000).toFixed(1)}K Cr</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-1">Expense Ratio</p>
          <p className="text-2xl font-bold text-white">{fundData.expenseRatio}%</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-1">Fund Manager</p>
          <p className="text-lg font-bold text-white">{fundData.fundManager}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-1">Inception</p>
          <p className="text-lg font-bold text-white">{fundData.inception}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-1">Min SIP</p>
          <p className="text-lg font-bold text-green-400">₹{fundData.minSipAmount}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-1">Min Lumpsum</p>
          <p className="text-lg font-bold text-green-400">₹{fundData.minLumpsumAmount.toLocaleString()}</p>
        </div>
      </div>
    </div>

    {/* FSI Predictions */}
    <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <Brain className="w-6 h-6 text-purple-400" />
        <span>FSI Predictions</span>
      </h3>
      
      <div className="space-y-4">
        {Object.entries(fundData.fsiPredictions).map(([period, data]) => (
          <div key={period} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div>
              <p className="text-white font-semibold">{period} Expected Return</p>
              <p className="text-gray-400 text-sm">{data.scenario}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-400">{data.return.toFixed(1)}%</p>
              <p className="text-gray-400 text-sm">{data.confidence}% confidence</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Performance Tab Component
const PerformanceTab = ({ fundData }) => (
  <div className="space-y-8">
    
    {/* Performance Chart */}
    <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
      <h3 className="text-xl font-bold text-white mb-6">Historical Performance</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={fundData.performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="period" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }} 
            />
            <Line type="monotone" dataKey="fund" stroke="#3B82F6" strokeWidth={3} name="Fund" />
            <Line type="monotone" dataKey="benchmark" stroke="#10B981" strokeWidth={2} name="Benchmark" />
            <Line type="monotone" dataKey="category" stroke="#F59E0B" strokeWidth={2} name="Category Avg" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Returns Summary */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { period: '1 Year', value: '18.45%', benchmark: '16.23%' },
        { period: '3 Years', value: '16.78%', benchmark: '15.12%' },
        { period: '5 Years', value: '14.92%', benchmark: '13.45%' }
      ].map((item, index) => (
        <div key={index} className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-center">
          <p className="text-gray-400 text-sm mb-2">{item.period} Returns</p>
          <p className="text-3xl font-bold text-green-400 mb-1">{item.value}</p>
          <p className="text-gray-400 text-sm">vs {item.benchmark} benchmark</p>
        </div>
      ))}
    </div>
  </div>
);

// Portfolio Tab Component  
const PortfolioTab = ({ fundData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    
    {/* Top Holdings */}
    <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
      <h3 className="text-xl font-bold text-white mb-6">Top Holdings</h3>
      
      <div className="space-y-4">
        {fundData.topHoldings.map((holding, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div>
              <p className="text-white font-semibold">{holding.name}</p>
              <p className="text-gray-400 text-sm">{holding.sector}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-blue-400">{holding.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Sector Allocation */}
    <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
      <h3 className="text-xl font-bold text-white mb-6">Sector Allocation</h3>
      
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={fundData.sectorAllocation}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {fundData.sectorAllocation.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }} 
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="space-y-2">
        {fundData.sectorAllocation.map((sector, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.color }}></div>
              <span className="text-gray-300 text-sm">{sector.name}</span>
            </div>
            <span className="text-white font-semibold">{sector.value}%</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Risk Analysis Tab Component
const RiskAnalysisTab = ({ fundData }) => (
  <div className="space-y-8">
    
    {/* Risk Metrics Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { label: 'Volatility', value: `${fundData.riskMetrics.volatility}%`, color: 'text-yellow-400' },
        { label: 'Sharpe Ratio', value: fundData.riskMetrics.sharpeRatio, color: 'text-green-400' },
        { label: 'Beta', value: fundData.riskMetrics.beta, color: 'text-blue-400' },
        { label: 'Alpha', value: `${fundData.riskMetrics.alpha}%`, color: 'text-purple-400' },
        { label: 'Max Drawdown', value: `${fundData.riskMetrics.maxDrawdown}%`, color: 'text-red-400' },
        { label: 'VaR (95%)', value: `${fundData.riskMetrics.var95}%`, color: 'text-orange-400' }
      ].map((metric, index) => (
        <div key={index} className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-center">
          <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
          <p className={`text-3xl font-bold ${metric.color}`}>{metric.value}</p>
        </div>
      ))}
    </div>

    {/* Risk Level Indicator */}
    <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
      <h3 className="text-xl font-bold text-white mb-6">Risk Assessment</h3>
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-semibold text-gray-300">Risk Level</span>
        <span className="text-xl font-bold text-orange-400">{fundData.riskLevel}</span>
      </div>
      
      <div className="relative h-4 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full mb-4">
        <div className="absolute top-1/2 left-[70%] transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-orange-500 rounded-full shadow-lg animate-pulse"></div>
      </div>
      
      <div className="flex justify-between text-sm text-gray-400">
        <span>Low Risk</span>
        <span>Moderate Risk</span>
        <span>High Risk</span>
      </div>
    </div>
  </div>
);

// FSI Insights Tab Component
const FSIInsightsTab = ({ fundData }) => (
  <div className="space-y-6">
    {fundData.aiInsights.map((insight, index) => {
      const getInsightIcon = (type) => {
        switch (type) {
          case 'strength': return <CheckCircle className="w-6 h-6 text-green-400" />;
          case 'opportunity': return <Target className="w-6 h-6 text-blue-400" />;
          case 'risk': return <AlertTriangle className="w-6 h-6 text-red-400" />;
          case 'recommendation': return <Zap className="w-6 h-6 text-purple-400" />;
          default: return <Activity className="w-6 h-6 text-gray-400" />;
        }
      };

      const getInsightColor = (type) => {
        switch (type) {
          case 'strength': return 'border-green-400/30 bg-green-500/10';
          case 'opportunity': return 'border-blue-400/30 bg-blue-500/10';
          case 'risk': return 'border-red-400/30 bg-red-500/10';
          case 'recommendation': return 'border-purple-400/30 bg-purple-500/10';
          default: return 'border-gray-400/30 bg-gray-500/10';
        }
      };

      return (
        <div key={index} className={`p-6 backdrop-blur-md border rounded-2xl ${getInsightColor(insight.type)}`}>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              {getInsightIcon(insight.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-bold text-white">{insight.title}</h4>
                <span className="text-sm text-gray-400">{insight.confidence}% confidence</span>
              </div>
              <p className="text-gray-300 leading-relaxed">{insight.description}</p>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

export default FundAnalysisPage;
