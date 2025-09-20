'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Crown, Diamond, TrendingUp, Zap, Target, PieChart, BarChart3, Shield, Star, Clock, Home, GraduationCap, Download, Sparkles, FileText, AlertTriangle, Building2, ExternalLink
} from 'lucide-react';
import PayTMStyleNavigation from '../../components/PayTMStyleNavigation';

const AdvancedAnalyticsPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedGoal, setSelectedGoal] = useState('all');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({});
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  const timeframes = ['1M', '3M', '6M', '1Y', '2Y', '3Y', '5Y', 'ALL'];
  const views = [
    { id: 'overview', label: 'Portfolio Overview', icon: PieChart },
    { id: 'performance', label: 'Performance Analysis', icon: TrendingUp },
    { id: 'allocation', label: 'Asset Allocation', icon: BarChart3 },
    { id: 'stocks', label: 'Stocks', icon: Building2 },
    { id: 'goals', label: 'Goal Tracking', icon: Target },
    { id: 'tax', label: 'Tax Analysis', icon: Shield },
    { id: 'risk', label: 'Risk Metrics', icon: AlertTriangle }
  ];

  // Mock portfolio data - would come from API
  const portfolioData = {
    totalValue: 2847650,
    totalInvested: 2156000,
    totalGains: 691650,
    totalGainsPercent: 32.08,
    dayChange: 15420,
    dayChangePercent: 0.54,
    xirr: 18.45,
    holdings: [
      {
        id: 1,
        name: 'HDFC Top 100 Fund',
        category: 'Large Cap Equity',
        allocation: 28.5,
        value: 811580,
        invested: 650000,
        gains: 161580,
        gainsPercent: 24.86,
        risk: 'Moderate',
        rating: 4.5
      },
      {
        id: 2,
        name: 'Mirae Asset Emerging Bluechip',
        category: 'Large & Mid Cap',
        allocation: 22.3,
        value: 635025,
        invested: 480000,
        gains: 155025,
        gainsPercent: 32.30,
        risk: 'High',
        rating: 4.7
      },
      {
        id: 3,
        name: 'Axis Small Cap Fund',
        category: 'Small Cap Equity',
        allocation: 18.7,
        value: 532510,
        invested: 420000,
        gains: 112510,
        gainsPercent: 26.79,
        risk: 'Very High',
        rating: 4.2
      },
      {
        id: 4,
        name: 'ICICI Prudential Debt Fund',
        category: 'Debt',
        allocation: 15.2,
        value: 432843,
        invested: 380000,
        gains: 52843,
        gainsPercent: 13.91,
        risk: 'Low',
        rating: 4.0
      },
      {
        id: 5,
        name: 'SBI Gold ETF',
        category: 'Commodity',
        allocation: 15.3,
        value: 435692,
        invested: 226000,
        gains: 209692,
        gainsPercent: 92.78,
        risk: 'High',
        rating: 3.8
      }
    ],
    goals: [
      {
        id: 1,
        name: 'Retirement Planning',
        icon: Clock,
        target: 50000000,
        current: 1847650,
        timeline: '2045-12-31',
        monthlySip: 25000,
        progress: 3.7,
        onTrack: true,
        color: 'from-blue-500 to-cyan-500'
      },
      {
        id: 2,
        name: 'Dream Home',
        icon: Home,
        target: 8000000,
        current: 650000,
        timeline: '2030-06-30',
        monthlySip: 35000,
        progress: 8.1,
        onTrack: true,
        color: 'from-green-500 to-emerald-500'
      },
      {
        id: 3,
        name: 'Child Education',
        icon: GraduationCap,
        target: 2500000,
        current: 350000,
        timeline: '2035-04-15',
        monthlySip: 15000,
        progress: 14.0,
        onTrack: false,
        color: 'from-purple-500 to-pink-500'
      }
    ],
    sectorAllocation: [
      { sector: 'Financial Services', percentage: 24.5, color: 'from-blue-500 to-blue-600' },
      { sector: 'Information Technology', percentage: 18.2, color: 'from-purple-500 to-purple-600' },
      { sector: 'Consumer Goods', percentage: 15.8, color: 'from-green-500 to-green-600' },
      { sector: 'Healthcare', percentage: 12.3, color: 'from-yellow-500 to-yellow-600' },
      { sector: 'Energy', percentage: 10.1, color: 'from-red-500 to-red-600' },
      { sector: 'Industrials', percentage: 8.7, color: 'from-indigo-500 to-indigo-600' },
      { sector: 'Others', percentage: 10.4, color: 'from-gray-500 to-gray-600' }
    ],
    riskMetrics: [
      { name: 'Sharpe Ratio', value: '1.24', level: 'Good' },
      { name: 'Beta', value: '0.89', level: 'Moderate' },
      { name: 'Volatility', value: '16.8%', level: 'Moderate' },
      { name: 'Max Drawdown', value: '-12.4%', level: 'Low' },
      { name: 'VaR (95%)', value: '-8.2%', level: 'Moderate' },
      { name: 'Portfolio Risk', value: 'Moderate-High', level: 'High' }
    ],
    stockHoldings: [
      {
        id: 'RELIANCE',
        name: 'Reliance Industries Ltd',
        symbol: 'RELIANCE',
        sector: 'Energy',
        totalHolding: 125,
        totalValue: 307125,
        portfolioPercent: 10.8,
        avgPrice: 2457,
        currentPrice: 2456.75,
        dayChange: -0.25,
        dayChangePercent: -0.01,
        totalReturn: 15.2,
        totalReturnPercent: 5.2,
        marketCap: '16.6L Cr',
        pe: 24.5,
        pb: 2.1,
        asiScore: 8.9,
        asiGrade: 'A+',
        recommendation: 'STRONG BUY',
        fundHoldings: [
          { fundName: 'HDFC Top 100 Fund', holding: 45, value: 110565, percent: 3.9 },
          { fundName: 'Mirae Asset Emerging Bluechip', holding: 35, value: 85987, percent: 3.0 },
          { fundName: 'Axis Small Cap Fund', holding: 25, value: 61419, percent: 2.2 },
          { fundName: 'ICICI Prudential Debt Fund', holding: 20, value: 49135, percent: 1.7 }
        ]
      },
      {
        id: 'TCS',
        name: 'Tata Consultancy Services Ltd',
        symbol: 'TCS',
        sector: 'Information Technology',
        totalHolding: 75,
        totalValue: 289500,
        portfolioPercent: 10.2,
        avgPrice: 3820,
        currentPrice: 3860,
        dayChange: 40,
        dayChangePercent: 1.05,
        totalReturn: 3000,
        totalReturnPercent: 1.05,
        marketCap: '14.1L Cr',
        pe: 28.3,
        pb: 12.8,
        asiScore: 9.2,
        asiGrade: 'A+',
        recommendation: 'BUY',
        fundHoldings: [
          { fundName: 'HDFC Top 100 Fund', holding: 30, value: 115800, percent: 4.1 },
          { fundName: 'Mirae Asset Emerging Bluechip', holding: 25, value: 96500, percent: 3.4 },
          { fundName: 'Axis Small Cap Fund', holding: 20, value: 77200, percent: 2.7 }
        ]
      },
      {
        id: 'INFY',
        name: 'Infosys Limited',
        symbol: 'INFY',
        sector: 'Information Technology',
        totalHolding: 150,
        totalValue: 267750,
        portfolioPercent: 9.4,
        avgPrice: 1785,
        currentPrice: 1785,
        dayChange: 0,
        dayChangePercent: 0,
        totalReturn: 0,
        totalReturnPercent: 0,
        marketCap: '7.4L Cr',
        pe: 25.1,
        pb: 8.2,
        asiScore: 8.7,
        asiGrade: 'A',
        recommendation: 'HOLD',
        fundHoldings: [
          { fundName: 'HDFC Top 100 Fund', holding: 60, value: 107100, percent: 3.8 },
          { fundName: 'Mirae Asset Emerging Bluechip', holding: 50, value: 89250, percent: 3.1 },
          { fundName: 'Axis Small Cap Fund', holding: 40, value: 71400, percent: 2.5 }
        ]
      },
      {
        id: 'HDFCBANK',
        name: 'HDFC Bank Limited',
        symbol: 'HDFCBANK',
        sector: 'Financial Services',
        totalHolding: 180,
        totalValue: 252000,
        portfolioPercent: 8.9,
        avgPrice: 1400,
        currentPrice: 1400,
        dayChange: 0,
        dayChangePercent: 0,
        totalReturn: 0,
        totalReturnPercent: 0,
        marketCap: '10.6L Cr',
        pe: 18.5,
        pb: 2.8,
        asiScore: 8.5,
        asiGrade: 'A',
        recommendation: 'BUY',
        fundHoldings: [
          { fundName: 'HDFC Top 100 Fund', holding: 80, value: 112000, percent: 3.9 },
          { fundName: 'Mirae Asset Emerging Bluechip', holding: 60, value: 84000, percent: 3.0 },
          { fundName: 'ICICI Prudential Debt Fund', holding: 40, value: 56000, percent: 2.0 }
        ]
      },
      {
        id: 'ICICIBANK',
        name: 'ICICI Bank Limited',
        symbol: 'ICICIBANK',
        sector: 'Financial Services',
        totalHolding: 200,
        totalValue: 240000,
        portfolioPercent: 8.4,
        avgPrice: 1200,
        currentPrice: 1200,
        dayChange: 0,
        dayChangePercent: 0,
        totalReturn: 0,
        totalReturnPercent: 0,
        marketCap: '8.4L Cr',
        pe: 16.2,
        pb: 2.1,
        asiScore: 8.3,
        asiGrade: 'A',
        recommendation: 'BUY',
        fundHoldings: [
          { fundName: 'HDFC Top 100 Fund', holding: 70, value: 84000, percent: 3.0 },
          { fundName: 'Mirae Asset Emerging Bluechip', holding: 80, value: 96000, percent: 3.4 },
          { fundName: 'Axis Small Cap Fund', holding: 50, value: 60000, percent: 2.1 }
        ]
      }
    ]
  };

  // Dynamic navigation height detection
  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight;
        setNavHeight(height);
      }
    };

    // Initial measurement
    updateNavHeight();

    // Listen for resize events
    window.addEventListener('resize', updateNavHeight);
    
    // Use ResizeObserver for more accurate detection
    const resizeObserver = new ResizeObserver(updateNavHeight);
    if (navRef.current) {
      resizeObserver.observe(navRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateNavHeight);
      resizeObserver.disconnect();
    };
  }, []);

  // Animation effect for numbers
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({
        totalValue: portfolioData.totalValue,
        totalGains: portfolioData.totalGains,
        xirr: portfolioData.xirr
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const generateReport = async () => {
    setIsGeneratingReport(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      alert('Portfolio Report Generated Successfully! Download will start shortly.');
    }, 3000);
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400 bg-green-500/20';
      case 'Moderate': return 'text-yellow-400 bg-yellow-500/20';
      case 'High': return 'text-orange-400 bg-orange-500/20';
      case 'Very High': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <>
      <PayTMStyleNavigation />
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-900" style={{ paddingTop: '120px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Clean Header */}
          <div className="text-center mb-12">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Portfolio Analytics
                </h1>
                <p className="text-xl text-gray-300 mt-2">Universe-Class Investment Intelligence</p>
              </div>
            </div>
            
            {/* Clean Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              {[
                { label: 'Total Portfolio', value: formatCurrency(portfolioData.totalValue), change: `+${portfolioData.totalGainsPercent.toFixed(2)}%`, icon: Diamond, color: 'from-blue-500 to-cyan-500', changeColor: 'text-green-400' },
                { label: 'Total Gains', value: formatCurrency(portfolioData.totalGains), change: `+${portfolioData.dayChangePercent.toFixed(2)}%`, icon: TrendingUp, color: 'from-green-500 to-emerald-500', changeColor: 'text-emerald-300' },
                { label: 'XIRR Returns', value: `${portfolioData.xirr}%`, change: 'Annualized', icon: Zap, color: 'from-purple-500 to-pink-500', changeColor: 'text-pink-300' },
                { label: 'Active Goals', value: `${portfolioData.goals.length}`, change: '2 On Track', icon: Target, color: 'from-orange-500 to-red-500', changeColor: 'text-orange-300' }
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className={`bg-gradient-to-r ${stat.color} rounded-2xl p-6 hover:scale-105 transition-all duration-300`}>
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                      <span className={`text-sm font-semibold ${stat.changeColor} block mb-2`}>{stat.change}</span>
                      <p className="text-white/80 text-sm">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sexy Navigation Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {views.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setSelectedView(view.id)}
                  className={`relative flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-500 group ${
                    selectedView === view.id
                      ? 'bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-105'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50 hover:scale-102'
                  }`}
                >
                  {selectedView === view.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 rounded-xl blur-lg opacity-50 -z-10 animate-pulse"></div>
                  )}
                  <view.icon className={`w-5 h-5 transition-transform duration-300 ${
                    selectedView === view.id ? 'scale-110' : 'group-hover:scale-105'
                  }`} />
                  <span className="relative z-10">{view.label}</span>
                  {selectedView === view.id && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="space-y-8">
            
            {/* Portfolio Overview */}
            {selectedView === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Holdings Breakdown */}
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                        <PieChart className="w-6 h-6 text-blue-400" />
                        <span>Portfolio Holdings</span>
                      </h2>
                      <select 
                        value={selectedTimeframe}
                        onChange={(e) => setSelectedTimeframe(e.target.value)}
                        className="bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                      >
                        {timeframes.map(tf => (
                          <option key={tf} value={tf}>{tf}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-4">
                      {portfolioData.holdings.map((holding, index) => (
                        <div key={holding.id} className="bg-gray-800/30 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-4 mb-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                  {holding.name.charAt(0)}
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-white">{holding.name}</h3>
                                  <p className="text-gray-400 text-sm">{holding.category}</p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                  <p className="text-xs text-gray-400 mb-1">Current Value</p>
                                  <p className="text-lg font-bold text-white">{formatCurrency(holding.value)}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400 mb-1">Allocation</p>
                                  <p className="text-lg font-bold text-blue-400">{holding.allocation}%</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400 mb-1">Returns</p>
                                  <p className={`text-lg font-bold ${holding.gainsPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {holding.gainsPercent >= 0 ? '+' : ''}{holding.gainsPercent.toFixed(2)}%
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400 mb-1">Risk Level</p>
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(holding.risk)}`}>
                                    {holding.risk}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 ml-6">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(holding.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sector Allocation */}
                <div>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                      <BarChart3 className="w-6 h-6 text-purple-400" />
                      <span>Sector Allocation</span>
                    </h2>
                    
                    <div className="space-y-4">
                      {portfolioData.sectorAllocation.map((sector, index) => (
                        <div key={sector.sector} className="group">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium">{sector.sector}</span>
                            <span className="text-gray-300">{sector.percentage}%</span>
                          </div>
                          <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                            <div 
                              className={`absolute top-0 left-0 h-full bg-gradient-to-r ${sector.color} rounded-full transition-all duration-1000 ease-out`}
                              style={{ width: `${sector.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Risk Analytics */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                      <Shield className="w-6 h-6 text-orange-400" />
                      <span>Risk Analytics</span>
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-6">
                      {portfolioData.riskMetrics.map((metric: any, index: number) => (
                        <div key={metric.name} className="text-center bg-gray-800/30 rounded-xl p-4">
                          <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                          <div className="text-gray-400 text-sm mb-2">{metric.name}</div>
                          <div className={`text-xs px-3 py-1 rounded-full ${getRiskColor(metric.level)}`}>
                            {metric.level}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Goal Tracking */}
            {selectedView === 'goals' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {portfolioData.goals.map((goal) => (
                  <div key={goal.id} className="bg-gray-800/30 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${goal.color} rounded-2xl flex items-center justify-center`}>
                          <goal.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{goal.name}</h3>
                          <p className="text-gray-400 text-sm">{goal.timeline}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{Math.round(goal.progress)}%</div>
                        <div className="text-xs text-gray-400">Complete</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Target: {formatCurrency(goal.target)}</span>
                        <span className="text-white">Current: {formatCurrency(goal.current)}</span>
                      </div>
                      
                      <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${goal.color} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-gray-400">Monthly SIP: {formatCurrency(goal.monthlySip)}</span>
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          goal.progress >= 80 ? 'bg-green-500/20 text-green-400' :
                          goal.progress >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {goal.progress >= 80 ? 'On Track' : goal.progress >= 50 ? 'Moderate' : 'Behind'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Performance Analysis */}
            {selectedView === 'performance' && (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-8">Performance Analysis</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4 text-center">Portfolio Performance</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">1 Month Return</span>
                        <span className="text-green-400 font-semibold">+2.34%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">3 Month Return</span>
                        <span className="text-green-400 font-semibold">+8.76%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">6 Month Return</span>
                        <span className="text-green-400 font-semibold">+15.23%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">1 Year Return</span>
                        <span className="text-green-400 font-semibold">+32.08%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">3 Year Return</span>
                        <span className="text-green-400 font-semibold">+18.45% (Annualized)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4 text-center">Benchmark Comparison</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">vs NIFTY 50</span>
                        <span className="text-green-400 font-semibold">+4.2% outperformance</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">vs SENSEX</span>
                        <span className="text-green-400 font-semibold">+3.8% outperformance</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">vs Category Average</span>
                        <span className="text-green-400 font-semibold">+6.1% outperformance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Asset Allocation */}
            {selectedView === 'allocation' && (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-8">Asset Allocation</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6 text-center">Current Allocation</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'Large Cap Equity', percentage: 45, color: 'bg-blue-500' },
                        { name: 'Mid Cap Equity', percentage: 25, color: 'bg-green-500' },
                        { name: 'Small Cap Equity', percentage: 15, color: 'bg-purple-500' },
                        { name: 'Debt Funds', percentage: 10, color: 'bg-yellow-500' },
                        { name: 'Gold/Commodities', percentage: 5, color: 'bg-orange-500' }
                      ].map((asset, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium">{asset.name}</span>
                            <span className="text-gray-300">{asset.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`${asset.color} h-2 rounded-full transition-all duration-1000`}
                              style={{ width: `${asset.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6 text-center">Recommended Allocation</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'Large Cap Equity', current: 45, recommended: 40, status: 'reduce' },
                        { name: 'Mid Cap Equity', current: 25, recommended: 30, status: 'increase' },
                        { name: 'Small Cap Equity', current: 15, recommended: 15, status: 'maintain' },
                        { name: 'Debt Funds', current: 10, recommended: 12, status: 'increase' },
                        { name: 'Gold/Commodities', current: 5, recommended: 3, status: 'reduce' }
                      ].map((asset, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-white font-medium">{asset.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400">{asset.current}% → {asset.recommended}%</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              asset.status === 'increase' ? 'bg-green-500/20 text-green-400' :
                              asset.status === 'reduce' ? 'bg-red-500/20 text-red-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {asset.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tax Analysis */}
            {selectedView === 'tax' && (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-8">Tax Analysis</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4 text-center">Tax Harvesting Opportunities</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Short Term Capital Gains</span>
                        <span className="text-red-400 font-semibold">₹45,230</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Long Term Capital Gains</span>
                        <span className="text-green-400 font-semibold">₹2,34,560</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Tax Saving Potential</span>
                        <span className="text-yellow-400 font-semibold">₹23,450</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4 text-center">ELSS Investments</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Current ELSS Investment</span>
                        <span className="text-white font-semibold">₹1,50,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Tax Benefit (30%)</span>
                        <span className="text-green-400 font-semibold">₹45,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Lock-in Period Remaining</span>
                        <span className="text-yellow-400 font-semibold">2.3 years</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stocks Tab */}
            {selectedView === 'stocks' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Stock Holdings</h2>
                <div className="space-y-6">
                  {portfolioData.stockHoldings.map((stock) => (
                    <div key={stock.id} className="bg-gray-800/30 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
                      {/* Stock Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                            {stock.symbol.substring(0, 2)}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">{stock.name}</h3>
                            <p className="text-gray-400">{stock.symbol} • {stock.sector}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">{formatCurrency(stock.totalValue)}</div>
                          <div className="text-blue-400 font-semibold">{stock.portfolioPercent}% of Portfolio</div>
                        </div>
                      </div>

                      {/* Stock Metrics Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                        <div className="text-center">
                          <p className="text-xs text-gray-400 mb-1">Total Holding</p>
                          <p className="text-lg font-bold text-white">{stock.totalHolding}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400 mb-1">Current Price</p>
                          <p className="text-lg font-bold text-white">₹{stock.currentPrice}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400 mb-1">Day Change</p>
                          <p className={`text-lg font-bold ${stock.dayChangePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {stock.dayChangePercent >= 0 ? '+' : ''}{stock.dayChangePercent}%
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400 mb-1">P/E Ratio</p>
                          <p className="text-lg font-bold text-white">{stock.pe}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400 mb-1">ASI Score</p>
                          <p className="text-lg font-bold text-purple-400">{stock.asiScore}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400 mb-1">Grade</p>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            stock.asiGrade === 'A+' ? 'bg-green-500/20 text-green-400' :
                            stock.asiGrade === 'A' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {stock.asiGrade}
                          </span>
                        </div>
                      </div>

                      {/* Fund Holdings Breakdown */}
                      <div className="mb-6">
                        <h4 className="text-lg font-bold text-white mb-4">Holdings Across Funds</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {stock.fundHoldings.map((fund, index) => (
                            <div key={index} className="bg-gray-700/30 rounded-xl p-4">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-white font-medium">{fund.fundName}</span>
                                <span className="text-blue-400 font-semibold">{fund.percent}%</span>
                              </div>
                              <div className="flex justify-between text-sm text-gray-400">
                                <span>{fund.holding} shares</span>
                                <span>{formatCurrency(fund.value)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* FSI Analysis Section */}
                      <div className="bg-gray-700/30 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-bold text-white mb-2">FSI Analysis Overview</h4>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-400">Market Cap: </span>
                                <span className="text-white font-semibold">{stock.marketCap}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">P/B Ratio: </span>
                                <span className="text-white font-semibold">{stock.pb}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Recommendation: </span>
                                <span className={`font-semibold ${
                                  stock.recommendation === 'STRONG BUY' ? 'text-green-400' :
                                  stock.recommendation === 'BUY' ? 'text-blue-400' :
                                  stock.recommendation === 'HOLD' ? 'text-yellow-400' :
                                  'text-red-400'
                                }`}>
                                  {stock.recommendation}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button 
                            onClick={() => window.open(`/stock-analysis/${stock.id}`, '_blank')}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                          >
                            <ExternalLink className="w-5 h-5" />
                            <span>Detailed FSI Analysis</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Risk Metrics */}
            {selectedView === 'risk' && (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-8">Risk Metrics</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {portfolioData.riskMetrics.map((metric: any, index: number) => (
                    <div key={metric.name} className="bg-gray-800/30 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-white mb-2 text-center">{metric.name}</h3>
                      <div className="text-3xl font-bold text-white mb-2 text-center">{metric.value}</div>
                      <div className={`text-xs px-3 py-1 rounded-full mx-auto w-fit ${getRiskColor(metric.level)}`}>
                        {metric.level}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Generate Report Section - Only show on overview tab */}
            {selectedView === 'overview' && (
              <div className="bg-gray-800/30 rounded-2xl p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Generate Comprehensive Report</h2>
                  <p className="text-gray-300 mb-8 max-w-2xl text-center">
                    Get a detailed PDF report with portfolio analysis, performance metrics, risk assessment, and personalized recommendations.
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <button 
                    onClick={() => {
                      setIsGeneratingReport(true);
                      setTimeout(() => {
                        setIsGeneratingReport(false);
                        alert('PDF Report Generated Successfully!');
                      }, 3000);
                    }}
                    disabled={isGeneratingReport}
                    className="relative bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 text-white font-bold py-5 px-10 rounded-3xl transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-4 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex items-center space-x-4">
                      {isGeneratingReport ? (
                        <>
                          <div className="animate-spin rounded-full h-7 w-7 border-b-3 border-white"></div>
                          <span className="text-lg">Generating Report...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-7 h-7 group-hover:animate-bounce" />
                          <span className="text-lg">Generate PDF Report</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedAnalyticsPage;
