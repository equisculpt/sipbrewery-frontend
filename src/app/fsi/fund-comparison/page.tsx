'use client';

import React, { useState } from 'react';
import { Search, Plus, X, TrendingUp, TrendingDown, BarChart3, Shield, Target, Zap, Brain, Eye, Star, ArrowRight, Download, Share2, Activity, Award, Calendar, DollarSign, AlertTriangle, CheckCircle, Filter, LineChart as LineChartIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const FundComparisonPage = () => {
  const [selectedFunds, setSelectedFunds] = useState([
    {
      symbol: 'HDFC_TOP_100',
      name: 'HDFC Top 100 Fund - Direct Growth',
      nav: '₹847.32',
      change: '+2.45%',
      changeValue: '+20.15',
      aum: '₹45,678 Cr',
      expenseRatio: 0.45,
      exitLoad: 'Nil',
      returns1Y: 18.5,
      returns3Y: 16.8,
      returns5Y: 15.2,
      volatility: 14.2,
      sharpeRatio: 1.24,
      category: 'Large Cap',
      asiScore: 8.7,
      recommendation: 'STRONG BUY',
      targetReturn: '16-18%',
      upside: 15.8,
      riskLevel: 'Medium',
      rating: 4.5,
      fundManager: 'Rahul Baijal',
      benchmark: 'NIFTY 100 TRI'
    },
    {
      symbol: 'SBI_BLUECHIP',
      name: 'SBI Blue Chip Fund - Direct Growth',
      nav: '₹623.45',
      change: '+1.89%',
      changeValue: '+11.58',
      aum: '₹32,456 Cr',
      expenseRatio: 0.52,
      exitLoad: 'Nil',
      returns1Y: 16.2,
      returns3Y: 15.4,
      returns5Y: 14.1,
      volatility: 15.8,
      sharpeRatio: 1.18,
      category: 'Large Cap',
      asiScore: 8.3,
      recommendation: 'BUY',
      targetReturn: '14-16%',
      upside: 12.4,
      riskLevel: 'Medium',
      rating: 4.2,
      fundManager: 'Sohini Andani',
      benchmark: 'BSE 100 TRI'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddFund, setShowAddFund] = useState(false);
  const [activeTab, setActiveTab] = useState('comparison');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('1Y');

  const fundSuggestions = [
    { symbol: 'AXIS_BLUECHIP', name: 'Axis Blue Chip Fund', category: 'Large Cap' },
    { symbol: 'MIRAE_LARGECAP', name: 'Mirae Asset Large Cap Fund', category: 'Large Cap' },
    { symbol: 'PARAG_FLEXI', name: 'Parag Parikh Flexi Cap Fund', category: 'Flexi Cap' },
    { symbol: 'ICICI_BLUECHIP', name: 'ICICI Pru Blue Chip Fund', category: 'Large Cap' },
    { symbol: 'KOTAK_EMERGING', name: 'Kotak Emerging Equity Fund', category: 'Large & Mid Cap' },
    { symbol: 'NIPPON_SMALLCAP', name: 'Nippon India Small Cap Fund', category: 'Small Cap' },
    { symbol: 'DSP_MIDCAP', name: 'DSP Mid Cap Fund', category: 'Mid Cap' },
    { symbol: 'FRANKLIN_INDIA', name: 'Franklin India Equity Fund', category: 'Multi Cap' }
  ];

  // Historical performance data for charts
  const performanceData = {
    '1Y': [
      { period: 'Jan', HDFC_TOP_100: 847, SBI_BLUECHIP: 623, AXIS_BLUECHIP: 745, MIRAE_LARGECAP: 892 },
      { period: 'Feb', HDFC_TOP_100: 832, SBI_BLUECHIP: 615, AXIS_BLUECHIP: 738, MIRAE_LARGECAP: 885 },
      { period: 'Mar', HDFC_TOP_100: 856, SBI_BLUECHIP: 634, AXIS_BLUECHIP: 752, MIRAE_LARGECAP: 901 },
      { period: 'Apr', HDFC_TOP_100: 841, SBI_BLUECHIP: 628, AXIS_BLUECHIP: 746, MIRAE_LARGECAP: 896 },
      { period: 'May', HDFC_TOP_100: 863, SBI_BLUECHIP: 641, AXIS_BLUECHIP: 758, MIRAE_LARGECAP: 908 },
      { period: 'Jun', HDFC_TOP_100: 871, SBI_BLUECHIP: 648, AXIS_BLUECHIP: 764, MIRAE_LARGECAP: 915 },
      { period: 'Jul', HDFC_TOP_100: 859, SBI_BLUECHIP: 635, AXIS_BLUECHIP: 751, MIRAE_LARGECAP: 903 },
      { period: 'Aug', HDFC_TOP_100: 868, SBI_BLUECHIP: 644, AXIS_BLUECHIP: 761, MIRAE_LARGECAP: 912 },
      { period: 'Sep', HDFC_TOP_100: 854, SBI_BLUECHIP: 631, AXIS_BLUECHIP: 748, MIRAE_LARGECAP: 899 },
      { period: 'Oct', HDFC_TOP_100: 875, SBI_BLUECHIP: 651, AXIS_BLUECHIP: 768, MIRAE_LARGECAP: 919 },
      { period: 'Nov', HDFC_TOP_100: 869, SBI_BLUECHIP: 645, AXIS_BLUECHIP: 762, MIRAE_LARGECAP: 913 },
      { period: 'Dec', HDFC_TOP_100: 847, SBI_BLUECHIP: 623, AXIS_BLUECHIP: 745, MIRAE_LARGECAP: 892 }
    ]
  };

  // Future predictions data
  const predictionData = [
    { period: 'Current', HDFC_TOP_100: 847, SBI_BLUECHIP: 623 },
    { period: '3M', HDFC_TOP_100: 875, SBI_BLUECHIP: 645 },
    { period: '6M', HDFC_TOP_100: 905, SBI_BLUECHIP: 668 },
    { period: '1Y', HDFC_TOP_100: 940, SBI_BLUECHIP: 692 },
    { period: '2Y', HDFC_TOP_100: 1025, SBI_BLUECHIP: 745 },
    { period: '3Y', HDFC_TOP_100: 1120, SBI_BLUECHIP: 805 }
  ];

  // Risk-Return analysis data
  const riskReturnData = selectedFunds.map(fund => ({
    name: fund.symbol,
    risk: fund.volatility,
    return: fund.returns3Y,
    size: parseFloat(fund.aum.replace('₹', '').replace(' Cr', '').replace(',', '')),
    color: fund.symbol === 'HDFC_TOP_100' ? '#3B82F6' : fund.symbol === 'SBI_BLUECHIP' ? '#8B5CF6' : '#10B981'
  }));

  // Category performance comparison
  const categoryData = [
    { category: 'Large Cap', performance: 16.5, volatility: 14.8, outlook: 'Positive' },
    { category: 'Mid Cap', performance: 18.2, volatility: 19.3, outlook: 'Bullish' },
    { category: 'Small Cap', performance: 22.1, volatility: 24.7, outlook: 'High Risk-Reward' },
    { category: 'Flexi Cap', performance: 17.3, volatility: 16.2, outlook: 'Balanced' }
  ];

  // Portfolio Holdings Data for each fund
  const portfolioHoldings = {
    HDFC_TOP_100: {
      totalStocks: 98,
      topHoldings: [
        { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', weight: 8.45, sector: 'Oil & Gas', price: 2847.30, change: '+1.2%', futureOutlook: 'Strong', asiScore: 8.9, reason: 'Strong refining margins and digital expansion' },
        { symbol: 'TCS', name: 'Tata Consultancy Services', weight: 7.23, sector: 'IT Services', price: 3654.80, change: '+0.8%', futureOutlook: 'Bullish', asiScore: 8.7, reason: 'AI transformation and cloud growth' },
        { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', weight: 6.89, sector: 'Banking', price: 1678.45, change: '+1.5%', futureOutlook: 'Positive', asiScore: 8.5, reason: 'Digital banking leadership and NIM expansion' },
        { symbol: 'INFY', name: 'Infosys Ltd', weight: 5.67, sector: 'IT Services', price: 1845.20, change: '+2.1%', futureOutlook: 'Strong', asiScore: 8.4, reason: 'GenAI capabilities and margin improvement' },
        { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', weight: 4.98, sector: 'Banking', price: 1234.60, change: '+0.9%', futureOutlook: 'Positive', asiScore: 8.2, reason: 'Retail banking growth and digital adoption' },
        { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', weight: 4.23, sector: 'FMCG', price: 2456.30, change: '-0.3%', futureOutlook: 'Stable', asiScore: 7.8, reason: 'Premium portfolio and rural recovery' },
        { symbol: 'ITC', name: 'ITC Ltd', weight: 3.87, sector: 'FMCG', price: 467.80, change: '+0.5%', futureOutlook: 'Moderate', asiScore: 7.5, reason: 'Cigarette stability and FMCG diversification' },
        { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', weight: 3.45, sector: 'Telecom', price: 1567.90, change: '+1.8%', futureOutlook: 'Strong', asiScore: 8.3, reason: '5G rollout and Africa expansion' }
      ],
      sectorAllocation: [
        { sector: 'Banking & Financial Services', weight: 28.5, outlook: 'Positive', growth: '+12.5%' },
        { sector: 'Information Technology', weight: 22.3, outlook: 'Strong', growth: '+18.2%' },
        { sector: 'Oil & Gas', weight: 12.8, outlook: 'Moderate', growth: '+8.1%' },
        { sector: 'FMCG', weight: 11.2, outlook: 'Stable', growth: '+6.8%' },
        { sector: 'Telecom', weight: 8.7, outlook: 'Strong', growth: '+15.3%' },
        { sector: 'Pharmaceuticals', weight: 6.9, outlook: 'Positive', growth: '+11.4%' },
        { sector: 'Automobiles', weight: 5.2, outlook: 'Recovery', growth: '+9.7%' },
        { sector: 'Others', weight: 4.4, outlook: 'Mixed', growth: '+7.2%' }
      ],
      strengthAnalysis: {
        strengths: [
          'High-quality large-cap stocks with strong fundamentals',
          'Diversified sector exposure reduces concentration risk',
          'Strong management teams and corporate governance',
          'Consistent dividend-paying companies'
        ],
        weaknesses: [
          'Limited exposure to high-growth mid and small-cap stocks',
          'Overweight in traditional sectors vs emerging themes',
          'Higher correlation with benchmark limits alpha generation'
        ],
        futureDrivers: [
          'Digital transformation across portfolio companies',
          'India\'s economic growth benefiting large-cap leaders',
          'Increasing market share of organized players',
          'ESG compliance and sustainable business practices'
        ]
      }
    },
    SBI_BLUECHIP: {
      totalStocks: 87,
      topHoldings: [
        { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', weight: 9.12, sector: 'Oil & Gas', price: 2847.30, change: '+1.2%', futureOutlook: 'Strong', asiScore: 8.9, reason: 'Retail and digital expansion driving growth' },
        { symbol: 'INFY', name: 'Infosys Ltd', weight: 6.78, sector: 'IT Services', price: 1845.20, change: '+2.1%', futureOutlook: 'Strong', asiScore: 8.4, reason: 'AI and automation leadership' },
        { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', weight: 6.23, sector: 'Banking', price: 1678.45, change: '+1.5%', futureOutlook: 'Positive', asiScore: 8.5, reason: 'Market leadership in retail banking' },
        { symbol: 'TCS', name: 'Tata Consultancy Services', weight: 5.89, sector: 'IT Services', price: 3654.80, change: '+0.8%', futureOutlook: 'Bullish', asiScore: 8.7, reason: 'Cloud transformation and consulting growth' },
        { symbol: 'LT', name: 'Larsen & Toubro Ltd', weight: 4.67, sector: 'Infrastructure', price: 3456.70, change: '+2.3%', futureOutlook: 'Strong', asiScore: 8.1, reason: 'Infrastructure capex cycle and order book' },
        { symbol: 'SBIN', name: 'State Bank of India', weight: 4.23, sector: 'Banking', price: 834.50, change: '+1.7%', futureOutlook: 'Positive', asiScore: 7.9, reason: 'Asset quality improvement and digitization' },
        { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', weight: 3.98, sector: 'NBFC', price: 6789.40, change: '+0.6%', futureOutlook: 'Strong', asiScore: 8.6, reason: 'Digital lending and customer acquisition' },
        { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd', weight: 3.45, sector: 'Automobiles', price: 11234.20, change: '+1.9%', futureOutlook: 'Recovery', asiScore: 7.7, reason: 'EV transition and rural demand recovery' }
      ],
      sectorAllocation: [
        { sector: 'Banking & Financial Services', weight: 32.1, outlook: 'Positive', growth: '+13.8%' },
        { sector: 'Information Technology', weight: 19.7, outlook: 'Strong', growth: '+17.5%' },
        { sector: 'Oil & Gas', weight: 14.2, outlook: 'Moderate', growth: '+7.9%' },
        { sector: 'Infrastructure & Construction', weight: 9.8, outlook: 'Strong', growth: '+16.2%' },
        { sector: 'Automobiles', weight: 8.3, outlook: 'Recovery', growth: '+12.1%' },
        { sector: 'FMCG', weight: 7.9, outlook: 'Stable', growth: '+5.4%' },
        { sector: 'Pharmaceuticals', weight: 4.7, outlook: 'Positive', growth: '+9.8%' },
        { sector: 'Others', weight: 3.3, outlook: 'Mixed', growth: '+6.5%' }
      ],
      strengthAnalysis: {
        strengths: [
          'Higher allocation to infrastructure benefiting from capex cycle',
          'Strong exposure to financial services growth story',
          'Active fund management with tactical allocation changes',
          'Focus on value stocks with re-rating potential'
        ],
        weaknesses: [
          'Higher concentration in cyclical sectors increases volatility',
          'Limited exposure to new-age technology companies',
          'Overweight in PSU banks with execution risks'
        ],
        futureDrivers: [
          'Government infrastructure spending and PLI schemes',
          'Financial inclusion and credit growth acceleration',
          'Manufacturing renaissance and Make in India',
          'Energy transition and renewable investments'
        ]
      }
    }
  };

  const addFund = (fund: any) => {
    if (selectedFunds.length < 4) {
      const newFund = {
        symbol: fund.symbol,
        name: fund.name,
        nav: '₹' + (Math.random() * 800 + 200).toFixed(2),
        change: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 3).toFixed(2) + '%',
        changeValue: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 20).toFixed(2),
        aum: '₹' + (Math.random() * 40000 + 5000).toFixed(0) + ' Cr',
        expenseRatio: parseFloat((Math.random() * 1.5 + 0.3).toFixed(2)),
        exitLoad: Math.random() > 0.7 ? 'Nil' : '1% if redeemed within 1 year',
        returns1Y: parseFloat((Math.random() * 10 + 10).toFixed(1)),
        returns3Y: parseFloat((Math.random() * 8 + 12).toFixed(1)),
        returns5Y: parseFloat((Math.random() * 6 + 11).toFixed(1)),
        volatility: parseFloat((Math.random() * 10 + 10).toFixed(1)),
        sharpeRatio: parseFloat((Math.random() * 0.8 + 0.8).toFixed(2)),
        category: fund.category,
        asiScore: parseFloat((Math.random() * 2 + 7).toFixed(1)),
        recommendation: Math.random() > 0.5 ? 'BUY' : 'HOLD',
        targetReturn: (Math.random() * 6 + 12).toFixed(0) + '-' + (Math.random() * 4 + 16).toFixed(0) + '%',
        upside: parseFloat((Math.random() * 15 + 8).toFixed(1)),
        riskLevel: Math.random() > 0.5 ? 'Medium' : 'Low',
        rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
        fundManager: ['Rahul Baijal', 'Sohini Andani', 'Neelesh Surana', 'Jinesh Gopani'][Math.floor(Math.random() * 4)],
        benchmark: ['NIFTY 100 TRI', 'BSE 100 TRI', 'NIFTY 500 TRI', 'NIFTY 50 TRI'][Math.floor(Math.random() * 4)]
      };
      setSelectedFunds([...selectedFunds, newFund]);
      setShowAddFund(false);
      setSearchTerm('');
    }
  };

  const removeFund = (index: number) => {
    setSelectedFunds(selectedFunds.filter((_, i) => i !== index));
  };

  const getChangeColor = (change: string) => {
    return change.startsWith('+') ? 'text-green-400' : 'text-red-400';
  };

  const getMetricComparison = (values: number[], index: number, higherIsBetter: boolean = true) => {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const current = values[index];
    
    if (higherIsBetter) {
      if (current === max) return 'bg-green-500/20 text-green-400 border-green-400/30';
      if (current === min) return 'bg-red-500/20 text-red-400 border-red-400/30';
    } else {
      if (current === min) return 'bg-green-500/20 text-green-400 border-green-400/30';
      if (current === max) return 'bg-red-500/20 text-red-400 border-red-400/30';
    }
    return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Fund Comparison Engine
              </span>
            </h1>
            <div className="flex gap-2">
              <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
              <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
              <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <div className="flex justify-center">
            <p className="text-xl text-gray-300 max-w-4xl mb-8 text-center">
              Advanced AI-powered mutual fund comparison with future predictions, risk analysis, and institutional-grade insights
            </p>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-2 flex gap-2">
              {[
                { id: 'comparison', label: 'Overview', icon: BarChart3 },
                { id: 'portfolio-holdings', label: 'Portfolio Holdings', icon: Eye },
                { id: 'predictions', label: 'Future Predictions', icon: TrendingUp },
                { id: 'risk-analysis', label: 'Risk Analysis', icon: Shield },
                { id: 'comprehensive-report', label: 'Full Report', icon: Download }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Add Fund Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowAddFund(true)}
            disabled={selectedFunds.length >= 4}
            className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              selectedFunds.length >= 4
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
            }`}
          >
            <Plus className="w-5 h-5" />
            Add Fund to Compare {selectedFunds.length >= 4 && '(Maximum 4 funds)'}
          </button>
        </div>

        {/* Add Fund Modal */}
        {showAddFund && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 max-w-2xl w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Add Fund</h3>
                <button
                  onClick={() => setShowAddFund(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search funds by symbol or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {fundSuggestions
                  .filter(fund => 
                    fund.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    fund.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((fund) => (
                    <div
                      key={fund.symbol}
                      onClick={() => addFund(fund)}
                      className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer"
                    >
                      <div>
                        <div className="text-white font-bold">{fund.symbol}</div>
                        <div className="text-gray-300 text-sm">{fund.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-purple-400 text-sm">{fund.category}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {selectedFunds.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left p-6 text-gray-300 font-semibold">Metric</th>
                    {selectedFunds.map((fund, index) => (
                      <th key={index} className="text-center p-6 min-w-48 relative">
                        <div className="text-center">
                          <div className="text-white font-bold text-lg">{fund.symbol}</div>
                          <div className="text-gray-300 text-sm">{fund.name}</div>
                          <div className="text-purple-400 text-xs">{fund.category}</div>
                        </div>
                        <button
                          onClick={() => removeFund(index)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Current NAV */}
                  <tr className="border-b border-white/10">
                    <td className="p-6 text-gray-300 font-semibold">Current NAV</td>
                    {selectedFunds.map((fund, index) => (
                      <td key={index} className="p-6 text-center">
                        <div className="text-white font-bold text-xl">{fund.nav}</div>
                        <div className={`text-sm ${getChangeColor(fund.change)}`}>
                          {fund.change} ({fund.changeValue})
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* AUM */}
                  <tr className="border-b border-white/10">
                    <td className="p-6 text-gray-300 font-semibold">AUM</td>
                    {selectedFunds.map((fund, index) => (
                      <td key={index} className="p-6 text-center">
                        <div className="text-white font-semibold">{fund.aum}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Expense Ratio */}
                  <tr className="border-b border-white/10">
                    <td className="p-6 text-gray-300 font-semibold">Expense Ratio</td>
                    {selectedFunds.map((fund, index) => {
                      const expenseValues = selectedFunds.map(f => parseFloat(f.expenseRatio.toString()));
                      return (
                        <td key={index} className="p-6 text-center">
                          <div className={`inline-block px-3 py-2 rounded-lg border ${getMetricComparison(expenseValues, index, false)}`}>
                            {fund.expenseRatio}%
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* 1Y Returns */}
                  <tr className="border-b border-white/10">
                    <td className="p-6 text-gray-300 font-semibold">1Y Returns</td>
                    {selectedFunds.map((fund, index) => {
                      const returnValues = selectedFunds.map(f => parseFloat(f.returns1Y.toString()));
                      return (
                        <td key={index} className="p-6 text-center">
                          <div className={`inline-block px-3 py-2 rounded-lg border ${getMetricComparison(returnValues, index, true)}`}>
                            {fund.returns1Y}%
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* 3Y Returns */}
                  <tr className="border-b border-white/10">
                    <td className="p-6 text-gray-300 font-semibold">3Y Returns</td>
                    {selectedFunds.map((fund, index) => {
                      const returnValues = selectedFunds.map(f => parseFloat(f.returns3Y.toString()));
                      return (
                        <td key={index} className="p-6 text-center">
                          <div className={`inline-block px-3 py-2 rounded-lg border ${getMetricComparison(returnValues, index, true)}`}>
                            {fund.returns3Y}%
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Volatility */}
                  <tr className="border-b border-white/10">
                    <td className="p-6 text-gray-300 font-semibold">Volatility</td>
                    {selectedFunds.map((fund, index) => {
                      const volValues = selectedFunds.map(f => parseFloat(f.volatility.toString()));
                      return (
                        <td key={index} className="p-6 text-center">
                          <div className={`inline-block px-3 py-2 rounded-lg border ${getMetricComparison(volValues, index, false)}`}>
                            {fund.volatility}%
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Sharpe Ratio */}
                  <tr>
                    <td className="p-6 text-gray-300 font-semibold">Sharpe Ratio</td>
                    {selectedFunds.map((fund, index) => (
                      <td key={index} className="p-6 text-center">
                        <div className="text-white font-semibold">{fund.sharpeRatio}</div>
                        <div className="text-xs text-gray-400">
                          {parseFloat(fund.sharpeRatio.toString()) > 1.2 ? 'Excellent' : parseFloat(fund.sharpeRatio.toString()) > 1.0 ? 'Good' : 'Average'}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Portfolio Holdings Tab */}
        {activeTab === 'portfolio-holdings' && selectedFunds.length >= 1 && (
          <div className="mt-8 space-y-8">
            {selectedFunds.map((fund, fundIndex) => {
              const holdings = portfolioHoldings[fund.symbol as keyof typeof portfolioHoldings];
              if (!holdings) return null;
              
              return (
                <div key={fund.symbol} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{fund.name}</h3>
                      <p className="text-gray-300">Portfolio Holdings Analysis • {holdings.totalStocks} Total Stocks</p>
                    </div>
                  </div>

                  {/* Top Holdings */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      Top Holdings Analysis
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/20">
                            <th className="text-left p-4 text-gray-300 font-semibold">Stock</th>
                            <th className="text-center p-4 text-gray-300 font-semibold">Weight</th>
                            <th className="text-center p-4 text-gray-300 font-semibold">Price</th>
                            <th className="text-center p-4 text-gray-300 font-semibold">Change</th>
                            <th className="text-center p-4 text-gray-300 font-semibold">ASI Score</th>
                            <th className="text-center p-4 text-gray-300 font-semibold">Outlook</th>
                            <th className="text-left p-4 text-gray-300 font-semibold">Investment Thesis</th>
                          </tr>
                        </thead>
                        <tbody>
                          {holdings.topHoldings.map((stock, index) => (
                            <tr key={stock.symbol} className="border-b border-white/10">
                              <td className="p-4">
                                <div>
                                  <div className="text-white font-bold">{stock.symbol}</div>
                                  <div className="text-gray-300 text-sm">{stock.name}</div>
                                  <div className="text-purple-400 text-xs">{stock.sector}</div>
                                </div>
                              </td>
                              <td className="p-4 text-center">
                                <div className="text-white font-bold text-lg">{stock.weight}%</div>
                              </td>
                              <td className="p-4 text-center">
                                <div className="text-white font-semibold">₹{stock.price.toLocaleString()}</div>
                              </td>
                              <td className="p-4 text-center">
                                <div className={`font-semibold ${getChangeColor(stock.change)}`}>
                                  {stock.change}
                                </div>
                              </td>
                              <td className="p-4 text-center">
                                <div className={`inline-block px-3 py-2 rounded-lg font-bold ${
                                  stock.asiScore >= 8.5 ? 'bg-green-500/20 text-green-400' :
                                  stock.asiScore >= 8.0 ? 'bg-blue-500/20 text-blue-400' :
                                  stock.asiScore >= 7.5 ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-red-500/20 text-red-400'
                                }`}>
                                  {stock.asiScore}/10
                                </div>
                              </td>
                              <td className="p-4 text-center">
                                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                  stock.futureOutlook === 'Strong' || stock.futureOutlook === 'Bullish' ? 'bg-green-500/20 text-green-400' :
                                  stock.futureOutlook === 'Positive' ? 'bg-blue-500/20 text-blue-400' :
                                  stock.futureOutlook === 'Stable' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-gray-500/20 text-gray-400'
                                }`}>
                                  {stock.futureOutlook}
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="text-gray-300 text-sm max-w-xs">{stock.reason}</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Sector Allocation */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-400" />
                      Sector Allocation & Growth Outlook
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {holdings.sectorAllocation.map((sector, index) => (
                        <div key={sector.sector} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="text-white font-bold">{sector.sector}</div>
                              <div className="text-gray-300 text-sm">{sector.weight}% allocation</div>
                            </div>
                            <div className="text-right">
                              <div className={`text-sm font-semibold ${
                                sector.outlook === 'Strong' || sector.outlook === 'Bullish' ? 'text-green-400' :
                                sector.outlook === 'Positive' ? 'text-blue-400' :
                                sector.outlook === 'Stable' ? 'text-yellow-400' :
                                'text-gray-400'
                              }`}>
                                {sector.outlook}
                              </div>
                              <div className="text-purple-400 font-bold">{sector.growth}</div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${Math.min(sector.weight * 3, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strength Analysis */}
                  <div>
                    <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      Fund Strength Analysis
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="bg-green-500/10 border border-green-400/30 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 font-semibold">Strengths</span>
                        </div>
                        <ul className="space-y-2">
                          {holdings.strengthAnalysis.strengths.map((strength, index) => (
                            <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-red-500/10 border border-red-400/30 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          <span className="text-red-400 font-semibold">Weaknesses</span>
                        </div>
                        <ul className="space-y-2">
                          {holdings.strengthAnalysis.weaknesses.map((weakness, index) => (
                            <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-blue-500/10 border border-blue-400/30 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingUp className="w-5 h-5 text-blue-400" />
                          <span className="text-blue-400 font-semibold">Future Drivers</span>
                        </div>
                        <ul className="space-y-2">
                          {holdings.strengthAnalysis.futureDrivers.map((driver, index) => (
                            <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              {driver}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Future Predictions Tab */}
        {activeTab === 'predictions' && selectedFunds.length >= 1 && (
          <div className="mt-8 space-y-8">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Future Performance Predictions</h3>
                <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                  AI-POWERED
                </div>
              </div>

              {/* Prediction Chart */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-white mb-6">3-Year NAV Projection</h4>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="period" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(17, 24, 39, 0.8)', 
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '12px',
                          backdropFilter: 'blur(10px)'
                        }}
                      />
                      {selectedFunds.map((fund, index) => (
                        <Line 
                          key={fund.symbol}
                          type="monotone" 
                          dataKey={fund.symbol} 
                          stroke={index === 0 ? '#3B82F6' : '#8B5CF6'} 
                          strokeWidth={3}
                          dot={{ fill: index === 0 ? '#3B82F6' : '#8B5CF6', strokeWidth: 2, r: 6 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Stock-Level Predictions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {selectedFunds.map((fund) => {
                  const holdings = portfolioHoldings[fund.symbol as keyof typeof portfolioHoldings];
                  if (!holdings) return null;

                  return (
                    <div key={fund.symbol} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                      <h4 className="text-lg font-bold text-white mb-6">{fund.name} - Key Stock Predictions</h4>
                      <div className="space-y-4">
                        {holdings.topHoldings.slice(0, 5).map((stock) => (
                          <div key={stock.symbol} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                            <div className="flex-1">
                              <div className="text-white font-semibold">{stock.symbol}</div>
                              <div className="text-gray-300 text-sm">{stock.weight}% weight</div>
                            </div>
                            <div className="text-center">
                              <div className={`text-sm font-semibold ${
                                stock.futureOutlook === 'Strong' || stock.futureOutlook === 'Bullish' ? 'text-green-400' :
                                stock.futureOutlook === 'Positive' ? 'text-blue-400' :
                                'text-yellow-400'
                              }`}>
                                {stock.futureOutlook}
                              </div>
                              <div className="text-xs text-gray-400">12M Target</div>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-bold">
                                {stock.futureOutlook === 'Strong' || stock.futureOutlook === 'Bullish' ? '+25%' :
                                 stock.futureOutlook === 'Positive' ? '+15%' :
                                 stock.futureOutlook === 'Stable' ? '+8%' : '+5%'}
                              </div>
                              <div className="text-purple-400 text-xs">Expected</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sector-wise Predictions */}
              <div className="mt-8">
                <h4 className="text-xl font-bold text-white mb-6">Sector Growth Predictions</h4>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {[
                    { sector: 'Information Technology', prediction: '+22%', confidence: 'High', reason: 'AI adoption and digital transformation' },
                    { sector: 'Banking & Financial Services', prediction: '+18%', confidence: 'Medium', reason: 'Credit growth and NIM expansion' },
                    { sector: 'Infrastructure', prediction: '+20%', confidence: 'High', reason: 'Government capex and PLI schemes' },
                    { sector: 'Pharmaceuticals', prediction: '+12%', confidence: 'Medium', reason: 'Export growth and domestic demand' },
                    { sector: 'FMCG', prediction: '+8%', confidence: 'Low', reason: 'Rural recovery and premiumization' },
                    { sector: 'Automobiles', prediction: '+15%', confidence: 'Medium', reason: 'EV transition and rural demand' }
                  ].map((sector) => (
                    <div key={sector.sector} className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-400/30 rounded-2xl p-6">
                      <div className="text-white font-bold mb-2">{sector.sector}</div>
                      <div className="text-2xl font-bold text-purple-400 mb-2">{sector.prediction}</div>
                      <div className={`text-sm font-semibold mb-3 ${
                        sector.confidence === 'High' ? 'text-green-400' :
                        sector.confidence === 'Medium' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {sector.confidence} Confidence
                      </div>
                      <div className="text-gray-300 text-sm">{sector.reason}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fund-level Predictions */}
              <div className="mt-8">
                <h4 className="text-xl font-bold text-white mb-6">Fund Performance Outlook</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {selectedFunds.map((fund) => {
                    const holdings = portfolioHoldings[fund.symbol as keyof typeof portfolioHoldings];
                    if (!holdings) return null;

                    const strongStocks = holdings.topHoldings.filter(stock => 
                      stock.futureOutlook === 'Strong' || stock.futureOutlook === 'Bullish'
                    ).length;
                    const totalWeight = holdings.topHoldings.reduce((sum, stock) => sum + stock.weight, 0);
                    const avgASIScore = holdings.topHoldings.reduce((sum, stock) => sum + stock.asiScore, 0) / holdings.topHoldings.length;

                    return (
                      <div key={fund.symbol} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h5 className="text-lg font-bold text-white">{fund.name}</h5>
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            avgASIScore >= 8.5 ? 'bg-green-500/20 text-green-400' :
                            avgASIScore >= 8.0 ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {avgASIScore >= 8.5 ? 'OUTPERFORM' : avgASIScore >= 8.0 ? 'PERFORM' : 'UNDERPERFORM'}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">
                              {avgASIScore >= 8.5 ? '+20%' : avgASIScore >= 8.0 ? '+15%' : '+10%'}
                            </div>
                            <div className="text-gray-300 text-sm">Expected 1Y Return</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">{strongStocks}/8</div>
                            <div className="text-gray-300 text-sm">Strong Outlook Stocks</div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Portfolio Quality Score</span>
                            <span className="text-white font-semibold">{avgASIScore.toFixed(1)}/10</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Top Holdings Weight</span>
                            <span className="text-white font-semibold">{totalWeight.toFixed(1)}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Risk-Adjusted Return</span>
                            <span className="text-green-400 font-semibold">
                              {avgASIScore >= 8.5 ? 'High' : avgASIScore >= 8.0 ? 'Medium' : 'Low'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comprehensive Report Tab */}
        {activeTab === 'comprehensive-report' && selectedFunds.length >= 2 && (
          <div className="mt-8 space-y-8">
            {/* Report Header */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Comprehensive Fund Comparison Report</h3>
                    <p className="text-gray-300">Institutional-grade analysis with portfolio holdings deep-dive</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export PDF
                  </button>
                  <button className="px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share Report
                  </button>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Executive Summary
                </h4>
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-2xl p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {selectedFunds.map((fund) => {
                      const holdings = portfolioHoldings[fund.symbol as keyof typeof portfolioHoldings];
                      if (!holdings) return null;
                      
                      const avgASIScore = holdings.topHoldings.reduce((sum, stock) => sum + stock.asiScore, 0) / holdings.topHoldings.length;
                      const strongStocks = holdings.topHoldings.filter(stock => 
                        stock.futureOutlook === 'Strong' || stock.futureOutlook === 'Bullish'
                      ).length;

                      return (
                        <div key={fund.symbol} className="bg-white/5 rounded-xl p-6">
                          <h5 className="text-lg font-bold text-white mb-4">{fund.name}</h5>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-300">Overall Rating</span>
                              <span className={`font-bold ${
                                avgASIScore >= 8.5 ? 'text-green-400' :
                                avgASIScore >= 8.0 ? 'text-blue-400' :
                                'text-yellow-400'
                              }`}>
                                {avgASIScore >= 8.5 ? 'STRONG BUY' : avgASIScore >= 8.0 ? 'BUY' : 'HOLD'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Portfolio Quality</span>
                              <span className="text-white font-semibold">{avgASIScore.toFixed(1)}/10</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Strong Holdings</span>
                              <span className="text-purple-400 font-semibold">{strongStocks}/8 stocks</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">12M Target Return</span>
                              <span className="text-green-400 font-bold">
                                {avgASIScore >= 8.5 ? '+20%' : avgASIScore >= 8.0 ? '+15%' : '+10%'}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Key Findings */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-white mb-6">Key Investment Insights</h4>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-green-500/10 border border-green-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-semibold">Investment Strengths</span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="text-gray-300 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        Both funds have strong exposure to quality large-cap stocks with proven track records
                      </li>
                      <li className="text-gray-300 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        High allocation to IT and Banking sectors positioned for digital transformation
                      </li>
                      <li className="text-gray-300 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        Diversified portfolio reduces concentration risk while maintaining growth potential
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-semibold">Risk Considerations</span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="text-gray-300 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        Limited exposure to emerging themes like renewable energy and new-age tech
                      </li>
                      <li className="text-gray-300 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        High correlation with benchmark may limit alpha generation opportunities
                      </li>
                      <li className="text-gray-300 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        Cyclical sector exposure increases volatility during economic downturns
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                      <span className="text-blue-400 font-semibold">Future Outlook</span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="text-gray-300 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        AI adoption and digital transformation to drive IT sector growth (+22%)
                      </li>
                      <li className="text-gray-300 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        Infrastructure capex cycle benefits construction and engineering stocks
                      </li>
                      <li className="text-gray-300 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        Banking sector poised for credit growth with improving asset quality
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Detailed Comparison Matrix */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-white mb-6">Detailed Comparison Matrix</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left p-4 text-gray-300 font-semibold">Comparison Factor</th>
                        {selectedFunds.map((fund, index) => (
                          <th key={index} className="text-center p-4 text-white font-semibold">
                            {fund.symbol}
                          </th>
                        ))}
                        <th className="text-center p-4 text-gray-300 font-semibold">Winner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { factor: 'Portfolio Quality (Avg ASI Score)', getValue: (fund: any) => {
                          const holdings = portfolioHoldings[fund.symbol as keyof typeof portfolioHoldings];
                          return holdings ? (holdings.topHoldings.reduce((sum, stock) => sum + stock.asiScore, 0) / holdings.topHoldings.length).toFixed(1) : 'N/A';
                        }, higherIsBetter: true },
                        { factor: 'Expense Ratio', getValue: (fund: any) => fund.expenseRatio + '%', higherIsBetter: false },
                        { factor: '3Y Returns', getValue: (fund: any) => fund.returns3Y + '%', higherIsBetter: true },
                        { factor: 'Volatility', getValue: (fund: any) => fund.volatility + '%', higherIsBetter: false },
                        { factor: 'Strong Outlook Holdings', getValue: (fund: any) => {
                          const holdings = portfolioHoldings[fund.symbol as keyof typeof portfolioHoldings];
                          return holdings ? holdings.topHoldings.filter(stock => stock.futureOutlook === 'Strong' || stock.futureOutlook === 'Bullish').length + '/8' : 'N/A';
                        }, higherIsBetter: true },
                        { factor: 'Sharpe Ratio', getValue: (fund: any) => fund.sharpeRatio, higherIsBetter: true }
                      ].map((row) => {
                        const values = selectedFunds.map(fund => {
                          const value = row.getValue(fund);
                          return typeof value === 'string' && value.includes('%') ? parseFloat(value.replace('%', '')) : 
                                 typeof value === 'string' && value.includes('/') ? parseInt(value.split('/')[0]) :
                                 parseFloat(value.toString());
                        });
                        const bestIndex = row.higherIsBetter ? 
                          values.indexOf(Math.max(...values.filter(v => !isNaN(v)))) :
                          values.indexOf(Math.min(...values.filter(v => !isNaN(v))));

                        return (
                          <tr key={row.factor} className="border-b border-white/10">
                            <td className="p-4 text-gray-300 font-semibold">{row.factor}</td>
                            {selectedFunds.map((fund, index) => (
                              <td key={index} className={`p-4 text-center font-semibold ${
                                index === bestIndex ? 'text-green-400' : 'text-white'
                              }`}>
                                {row.getValue(fund)}
                              </td>
                            ))}
                            <td className="p-4 text-center">
                              <div className="text-green-400 font-bold">
                                {selectedFunds[bestIndex]?.symbol || 'N/A'}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Investment Recommendation */}
              <div>
                <h4 className="text-xl font-bold text-white mb-6">Final Investment Recommendation</h4>
                <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 rounded-2xl p-8">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-white mb-2">
                      {(() => {
                        const bestFund = selectedFunds.reduce((prev, curr) => {
                          const prevHoldings = portfolioHoldings[prev.symbol as keyof typeof portfolioHoldings];
                          const currHoldings = portfolioHoldings[curr.symbol as keyof typeof portfolioHoldings];
                          
                          if (!prevHoldings || !currHoldings) return prev;
                          
                          const prevScore = prevHoldings.topHoldings.reduce((sum, stock) => sum + stock.asiScore, 0) / prevHoldings.topHoldings.length;
                          const currScore = currHoldings.topHoldings.reduce((sum, stock) => sum + stock.asiScore, 0) / currHoldings.topHoldings.length;
                          
                          return currScore > prevScore ? curr : prev;
                        });
                        return bestFund.name;
                      })()}
                    </div>
                    <div className="text-green-400 text-xl font-semibold mb-4">RECOMMENDED CHOICE</div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400 mb-2">Superior</div>
                      <div className="text-gray-300 text-sm">Portfolio Quality</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-2">Strong</div>
                      <div className="text-gray-300 text-sm">Future Outlook</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-2">Balanced</div>
                      <div className="text-gray-300 text-sm">Risk-Return Profile</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white/5 rounded-xl">
                    <p className="text-gray-300 text-center">
                      <strong className="text-white">Investment Thesis:</strong> Based on comprehensive portfolio holdings analysis, 
                      the recommended fund demonstrates superior stock selection with higher ASI scores, stronger future outlook 
                      for underlying holdings, and better positioned for India's digital transformation and infrastructure growth themes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'comparison' && selectedFunds.length >= 2 && (
          <div className="mt-8">
            {/* Enhanced AI Analysis */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">FSI Intelligence Analysis</h3>
                <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                  LIVE
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-semibold">Top FSI Score</span>
                  </div>
                  <div className="text-white font-bold text-2xl mb-2">
                    {selectedFunds.reduce((prev, curr) => parseFloat(prev.asiScore.toString()) > parseFloat(curr.asiScore.toString()) ? prev : curr).symbol}
                  </div>
                  <div className="text-green-400 text-lg font-bold mb-2">
                    {selectedFunds.reduce((prev, curr) => parseFloat(prev.asiScore.toString()) > parseFloat(curr.asiScore.toString()) ? prev : curr).asiScore}/10
                  </div>
                  <p className="text-gray-300 text-sm">
                    Highest FSI intelligence score with {selectedFunds.reduce((prev, curr) => parseFloat(prev.asiScore.toString()) > parseFloat(curr.asiScore.toString()) ? prev : curr).recommendation} recommendation
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-400 font-semibold">Lowest Risk</span>
                  </div>
                  <div className="text-white font-bold text-2xl mb-2">
                    {selectedFunds.reduce((prev, curr) => parseFloat(prev.volatility.toString()) < parseFloat(curr.volatility.toString()) ? prev : curr).symbol}
                  </div>
                  <div className="text-blue-400 text-lg font-bold mb-2">
                    {selectedFunds.reduce((prev, curr) => parseFloat(prev.volatility.toString()) < parseFloat(curr.volatility.toString()) ? prev : curr).volatility}%
                  </div>
                  <p className="text-gray-300 text-sm">
                    {selectedFunds.reduce((prev, curr) => parseFloat(prev.volatility.toString()) < parseFloat(curr.volatility.toString()) ? prev : curr).riskLevel} risk profile for conservative portfolios
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-400 font-semibold">Best Returns</span>
                  </div>
                  <div className="text-white font-bold text-2xl mb-2">
                    {selectedFunds.reduce((prev, curr) => parseFloat(prev.returns3Y.toString()) > parseFloat(curr.returns3Y.toString()) ? prev : curr).symbol}
                  </div>
                  <div className="text-purple-400 text-lg font-bold mb-2">
                    {selectedFunds.reduce((prev, curr) => parseFloat(prev.returns3Y.toString()) > parseFloat(curr.returns3Y.toString()) ? prev : curr).returns3Y}%
                  </div>
                  <p className="text-gray-300 text-sm">
                    3-year annualized returns
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold">Lowest Cost</span>
                  </div>
                  <div className="text-white font-bold text-2xl mb-2">
                    {selectedFunds.reduce((prev, curr) => parseFloat(prev.expenseRatio.toString()) < parseFloat(curr.expenseRatio.toString()) ? prev : curr).symbol}
                  </div>
                  <div className="text-yellow-400 text-lg font-bold mb-2">
                    {selectedFunds.reduce((prev, curr) => parseFloat(prev.expenseRatio.toString()) < parseFloat(curr.expenseRatio.toString()) ? prev : curr).expenseRatio}%
                  </div>
                  <p className="text-gray-300 text-sm">
                    Annual expense ratio
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundComparisonPage;
