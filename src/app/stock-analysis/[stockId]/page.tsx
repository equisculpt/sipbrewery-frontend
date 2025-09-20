'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, TrendingUp, TrendingDown, Building2, Users, DollarSign, 
  BarChart3, PieChart, Activity, Shield, Target, Star, ExternalLink,
  Calendar, Globe, Award, AlertTriangle, CheckCircle, XCircle, LineChart
} from 'lucide-react';
import PayTMStyleNavigation from '../../../components/PayTMStyleNavigation';

const StockAnalysisPage = () => {
  const params = useParams();
  const stockId = params.stockId as string;
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredDataPoint, setHoveredDataPoint] = useState<number | null>(null);


  // Mock stock data - would come from API based on stockId
  const stockData = {
    RELIANCE: {
      id: 'RELIANCE',
      name: 'Reliance Industries Limited',
      symbol: 'RELIANCE',
      sector: 'Energy',
      industry: 'Oil & Gas Refining & Marketing',
      currentPrice: 2456.75,
      dayChange: -0.25,
      dayChangePercent: -0.01,
      weekHigh: 2580.50,
      weekLow: 2180.25,
      marketCap: '16.6L Cr',
      pe: 24.5,
      pb: 2.1,
      roe: 12.8,
      debt_equity: 0.35,
      dividend_yield: 0.65,
      asiScore: 8.9,
      asiGrade: 'A+',
      recommendation: 'STRONG BUY',
      targetPrice: 2750,
      upside: 11.9,
      description: 'Reliance Industries Limited is an Indian multinational conglomerate company, headquartered in Mumbai. It has diverse businesses across energy, petrochemicals, natural gas, retail, telecommunications, mass media, and textiles.',
      keyMetrics: {
        revenue: '7,92,756 Cr',
        netProfit: '60,705 Cr',
        eps: 91.2,
        bookValue: 1167.8,
        faceValue: 10
      },
      technicalIndicators: {
        rsi: 58.2,
        macd: 'Bullish',
        movingAverage50: 2420.30,
        movingAverage200: 2380.15,
        support: 2400,
        resistance: 2500
      },
      fundamentalAnalysis: {
        strengths: [
          'Dominant market position in petrochemicals',
          'Strong retail and digital ecosystem',
          'Robust balance sheet with low debt',
          'Diversified business portfolio',
          'Strong management and execution capability'
        ],
        weaknesses: [
          'Cyclical nature of oil & gas business',
          'Regulatory challenges in telecom sector',
          'High capital intensity',
          'Dependence on crude oil prices'
        ],
        opportunities: [
          'Green energy transition initiatives',
          'Expansion in retail and e-commerce',
          'Growth in digital services',
          'New energy business development'
        ],
        threats: [
          'Volatile crude oil prices',
          'Intense competition in retail',
          'Regulatory changes',
          'Economic slowdown impact'
        ]
      },
      financialHighlights: [
        { metric: 'Revenue Growth (YoY)', value: '12.5%', trend: 'up' },
        { metric: 'Profit Margin', value: '7.7%', trend: 'up' },
        { metric: 'ROE', value: '12.8%', trend: 'stable' },
        { metric: 'Debt/Equity', value: '0.35', trend: 'down' },
        { metric: 'Current Ratio', value: '1.2', trend: 'stable' },
        { metric: 'Interest Coverage', value: '8.5x', trend: 'up' }
      ],
      analystRatings: {
        strongBuy: 12,
        buy: 8,
        hold: 5,
        sell: 1,
        strongSell: 0
      },
      priceTargets: {
        high: 2900,
        average: 2750,
        low: 2600
      },
      projections: {
        '1M': {
          stock: { start: 2456.75, end: 2520, return: 2.6, confidence: 85, min: 2420, max: 2580 },
          nifty: { start: 19800, end: 19950, return: 0.8, confidence: 80, min: 19600, max: 20100 },
          outperformance: 1.8,
          volatility: 'Low'
        },
        '3M': {
          stock: { start: 2456.75, end: 2580, return: 5.0, confidence: 82, min: 2480, max: 2680 },
          nifty: { start: 19800, end: 20100, return: 1.5, confidence: 78, min: 19500, max: 20300 },
          outperformance: 3.5,
          volatility: 'Moderate'
        },
        '6M': {
          stock: { start: 2456.75, end: 2720, return: 10.7, confidence: 78, min: 2580, max: 2850 },
          nifty: { start: 19800, end: 20800, return: 5.1, confidence: 75, min: 19200, max: 21500 },
          outperformance: 5.6,
          volatility: 'Moderate'
        },
        '1Y': {
          stock: { start: 2456.75, end: 2950, return: 20.1, confidence: 75, min: 2500, max: 3200 },
          nifty: { start: 19800, end: 22500, return: 13.6, confidence: 72, min: 18500, max: 24000 },
          outperformance: 6.5,
          volatility: 'High'
        },
        '3Y': {
          stock: { start: 2456.75, end: 3800, return: 54.7, confidence: 68, min: 3200, max: 4500 },
          nifty: { start: 19800, end: 28000, return: 41.4, confidence: 65, min: 24000, max: 32000 },
          outperformance: 13.3,
          volatility: 'High'
        },
        '5Y': {
          stock: { start: 2456.75, end: 4500, return: 83.2, confidence: 60, min: 3800, max: 5500 },
          nifty: { start: 19800, end: 32000, return: 61.6, confidence: 58, min: 28000, max: 38000 },
          outperformance: 21.6,
          volatility: 'Very High'
        }
      },
      chartData: {
        '1M': {
          dailyData: [
            { date: 'Day 1', open: 2456.75, high: 2475, low: 2440, close: 2465, volume: 850000, avgPrediction: 2465, minPrediction: 2440, maxPrediction: 2475 },
            { date: 'Day 2', open: 2465, high: 2485, low: 2455, close: 2480, volume: 920000, avgPrediction: 2480, minPrediction: 2455, maxPrediction: 2485 },
            { date: 'Day 3', open: 2480, high: 2495, low: 2470, close: 2475, volume: 780000, avgPrediction: 2475, minPrediction: 2470, maxPrediction: 2495 },
            { date: 'Day 4', open: 2475, high: 2490, low: 2460, close: 2485, volume: 1100000, avgPrediction: 2485, minPrediction: 2460, maxPrediction: 2490 },
            { date: 'Day 5', open: 2485, high: 2500, low: 2475, close: 2495, volume: 950000, avgPrediction: 2495, minPrediction: 2475, maxPrediction: 2500 },
            { date: 'Day 6', open: 2495, high: 2510, low: 2485, close: 2505, volume: 1200000, avgPrediction: 2505, minPrediction: 2485, maxPrediction: 2510 },
            { date: 'Day 7', open: 2505, high: 2520, low: 2495, close: 2515, volume: 1050000, avgPrediction: 2515, minPrediction: 2495, maxPrediction: 2520 },
            { date: 'Day 8', open: 2515, high: 2525, low: 2500, close: 2510, volume: 890000, avgPrediction: 2510, minPrediction: 2500, maxPrediction: 2525 },
            { date: 'Day 9', open: 2510, high: 2530, low: 2505, close: 2525, volume: 1300000, avgPrediction: 2525, minPrediction: 2505, maxPrediction: 2530 },
            { date: 'Day 10', open: 2525, high: 2540, low: 2515, close: 2535, volume: 1150000, avgPrediction: 2535, minPrediction: 2515, maxPrediction: 2540 },
            { date: 'Day 11', open: 2535, high: 2545, low: 2520, close: 2530, volume: 980000, avgPrediction: 2530, minPrediction: 2520, maxPrediction: 2545 },
            { date: 'Day 12', open: 2530, high: 2550, low: 2525, close: 2545, volume: 1400000, avgPrediction: 2545, minPrediction: 2525, maxPrediction: 2550 },
            { date: 'Day 13', open: 2545, high: 2560, low: 2535, close: 2555, volume: 1250000, avgPrediction: 2555, minPrediction: 2535, maxPrediction: 2560 },
            { date: 'Day 14', open: 2555, high: 2570, low: 2545, close: 2565, volume: 1100000, avgPrediction: 2565, minPrediction: 2545, maxPrediction: 2570 },
            { date: 'Day 15', open: 2565, high: 2580, low: 2555, close: 2575, volume: 1350000, avgPrediction: 2575, minPrediction: 2555, maxPrediction: 2580 },
            { date: 'Day 16', open: 2575, high: 2585, low: 2560, close: 2570, volume: 950000, avgPrediction: 2570, minPrediction: 2560, maxPrediction: 2585 },
            { date: 'Day 17', open: 2570, high: 2590, low: 2565, close: 2585, volume: 1200000, avgPrediction: 2585, minPrediction: 2565, maxPrediction: 2590 },
            { date: 'Day 18', open: 2585, high: 2595, low: 2575, close: 2590, volume: 1050000, avgPrediction: 2590, minPrediction: 2575, maxPrediction: 2595 },
            { date: 'Day 19', open: 2590, high: 2605, low: 2580, close: 2600, volume: 1450000, avgPrediction: 2600, minPrediction: 2580, maxPrediction: 2605 },
            { date: 'Day 20', open: 2600, high: 2615, low: 2590, close: 2610, volume: 1300000, avgPrediction: 2610, minPrediction: 2590, maxPrediction: 2615 },
            { date: 'Day 21', open: 2610, high: 2625, low: 2600, close: 2620, volume: 1150000, avgPrediction: 2620, minPrediction: 2600, maxPrediction: 2625 },
            { date: 'Day 22', open: 2620, high: 2630, low: 2605, close: 2615, volume: 980000, avgPrediction: 2615, minPrediction: 2605, maxPrediction: 2630 }
          ],
          nifty: [19800, 19820, 19810, 19835, 19850, 19865, 19880, 19870, 19895, 19910, 19905, 19925, 19940, 19935, 19950, 19945, 19960, 19975, 19985, 19995, 20010, 20005],
          labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 22']
        },
        '3M': {
          dailyData: [
            { date: 'Week 1', avgPrediction: 2480, minPrediction: 2420, maxPrediction: 2540, volume: 5200000 },
            { date: 'Week 2', avgPrediction: 2510, minPrediction: 2450, maxPrediction: 2570, volume: 4800000 },
            { date: 'Week 3', avgPrediction: 2540, minPrediction: 2480, maxPrediction: 2600, volume: 5100000 },
            { date: 'Week 4', avgPrediction: 2520, minPrediction: 2460, maxPrediction: 2580, volume: 4900000 },
            { date: 'Week 5', avgPrediction: 2550, minPrediction: 2490, maxPrediction: 2610, volume: 5300000 },
            { date: 'Week 6', avgPrediction: 2580, minPrediction: 2520, maxPrediction: 2640, volume: 5000000 },
            { date: 'Week 7', avgPrediction: 2610, minPrediction: 2550, maxPrediction: 2670, volume: 5400000 },
            { date: 'Week 8', avgPrediction: 2590, minPrediction: 2530, maxPrediction: 2650, volume: 4700000 },
            { date: 'Week 9', avgPrediction: 2620, minPrediction: 2560, maxPrediction: 2680, volume: 5200000 },
            { date: 'Week 10', avgPrediction: 2640, minPrediction: 2580, maxPrediction: 2700, volume: 5500000 },
            { date: 'Week 11', avgPrediction: 2660, minPrediction: 2600, maxPrediction: 2720, volume: 5100000 },
            { date: 'Week 12', avgPrediction: 2650, minPrediction: 2590, maxPrediction: 2710, volume: 4900000 }
          ],
          nifty: [19800, 19850, 19900, 19950, 20000, 20050, 20100, 20080, 20120, 20150, 20180, 20100],
          labels: ['Week 1', 'Week 4', 'Week 8', 'Week 12']
        },
        '6M': {
          dailyData: [
            { date: 'Month 1', avgPrediction: 2520, minPrediction: 2420, maxPrediction: 2620, volume: 18000000 },
            { date: 'Month 2', avgPrediction: 2580, minPrediction: 2480, maxPrediction: 2680, volume: 17500000 },
            { date: 'Month 3', avgPrediction: 2640, minPrediction: 2540, maxPrediction: 2740, volume: 19000000 },
            { date: 'Month 4', avgPrediction: 2700, minPrediction: 2600, maxPrediction: 2800, volume: 18500000 },
            { date: 'Month 5', avgPrediction: 2750, minPrediction: 2650, maxPrediction: 2850, volume: 19500000 },
            { date: 'Month 6', avgPrediction: 2720, minPrediction: 2620, maxPrediction: 2820, volume: 18800000 }
          ],
          nifty: [19800, 19950, 20100, 20250, 20400, 20300],
          labels: ['Month 1', 'Month 2', 'Month 4', 'Month 6']
        },
        '1Y': {
          dailyData: [
            { date: 'Q1', avgPrediction: 2580, minPrediction: 2380, maxPrediction: 2780, volume: 75000000 },
            { date: 'Q2', avgPrediction: 2720, minPrediction: 2520, maxPrediction: 2920, volume: 72000000 },
            { date: 'Q3', avgPrediction: 2850, minPrediction: 2650, maxPrediction: 3050, volume: 78000000 },
            { date: 'Q4', avgPrediction: 2950, minPrediction: 2750, maxPrediction: 3150, volume: 80000000 }
          ],
          nifty: [19800, 20500, 21200, 22500],
          labels: ['Q1', 'Q2', 'Q3', 'Q4']
        },
        '3Y': {
          dailyData: [
            { date: 'Year 1', avgPrediction: 2800, minPrediction: 2200, maxPrediction: 3400, volume: 285000000 },
            { date: 'Year 2', avgPrediction: 3200, minPrediction: 2650, maxPrediction: 3750, volume: 288000000 },
            { date: 'Year 3', avgPrediction: 3800, minPrediction: 3000, maxPrediction: 4600, volume: 302000000 }
          ],
          nifty: [19800, 24500, 28000],
          labels: ['Year 1', 'Year 2', 'Year 3']
        },
        '5Y': {
          dailyData: [
            { date: 'Year 1', avgPrediction: 2900, minPrediction: 2100, maxPrediction: 3700, volume: 375000000 },
            { date: 'Year 2', avgPrediction: 3200, minPrediction: 2400, maxPrediction: 4000, volume: 385000000 },
            { date: 'Year 3', avgPrediction: 3600, minPrediction: 2800, maxPrediction: 4400, volume: 395000000 },
            { date: 'Year 4', avgPrediction: 4000, minPrediction: 3200, maxPrediction: 4800, volume: 405000000 },
            { date: 'Year 5', avgPrediction: 4500, minPrediction: 3600, maxPrediction: 5400, volume: 415000000 }
          ],
          nifty: [19800, 23000, 26000, 29000, 32000],
          labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5']
        }
      }
    }
  };

  const currentStock = stockData[stockId as keyof typeof stockData] || stockData.RELIANCE;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'financials', label: 'Financials', icon: BarChart3 },
    { id: 'technical', label: 'Technical', icon: Activity },
    { id: 'projection', label: 'Projection', icon: LineChart },
    { id: 'fundamental', label: 'Fundamental', icon: Shield },
    { id: 'analyst', label: 'Analyst Views', icon: Users }
  ];

  const timeframes = ['1M', '3M', '6M', '1Y', '3Y', '5Y'];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'STRONG BUY': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'BUY': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'HOLD': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'SELL': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <>
        <PayTMStyleNavigation />
        <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-900 flex items-center justify-center" style={{ paddingTop: '120px' }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading Stock Analysis...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PayTMStyleNavigation />
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-900" style={{ paddingTop: '120px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Back Button */}
          <button 
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </button>

          {/* Stock Header */}
          <div className="bg-gray-800/30 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                  {currentStock.symbol.substring(0, 2)}
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{currentStock.name}</h1>
                  <p className="text-gray-400 text-lg">{currentStock.symbol} • {currentStock.sector}</p>
                  <p className="text-gray-500">{currentStock.industry}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-white mb-2">₹{currentStock.currentPrice}</div>
                <div className={`flex items-center space-x-2 ${currentStock.dayChangePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {currentStock.dayChangePercent >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  <span className="text-lg font-semibold">
                    {currentStock.dayChangePercent >= 0 ? '+' : ''}{currentStock.dayChange} ({currentStock.dayChangePercent >= 0 ? '+' : ''}{currentStock.dayChangePercent}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">Market Cap</p>
                <p className="text-white font-bold text-lg">{currentStock.marketCap}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">P/E Ratio</p>
                <p className="text-white font-bold text-lg">{currentStock.pe}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">P/B Ratio</p>
                <p className="text-white font-bold text-lg">{currentStock.pb}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">ROE</p>
                <p className="text-white font-bold text-lg">{currentStock.roe}%</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">ASI Score</p>
                <p className="text-purple-400 font-bold text-lg">{currentStock.asiScore}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">Grade</p>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  currentStock.asiGrade === 'A+' ? 'bg-green-500/20 text-green-400' :
                  currentStock.asiGrade === 'A' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {currentStock.asiGrade}
                </span>
              </div>
            </div>

            {/* Recommendation */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className={`px-6 py-3 rounded-xl font-bold border ${getRecommendationColor(currentStock.recommendation)}`}>
                  {currentStock.recommendation}
                </span>
                <div className="text-white">
                  <span className="text-gray-400">Target Price: </span>
                  <span className="font-bold text-xl">₹{currentStock.targetPrice}</span>
                  <span className="text-green-400 ml-2">({currentStock.upside}% upside)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`relative flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-500 group ${
                    selectedTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-105'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50 hover:scale-102'
                  }`}
                >
                  {selectedTab === tab.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 rounded-xl blur-lg opacity-50 -z-10 animate-pulse"></div>
                  )}
                  <tab.icon className={`w-5 h-5 transition-transform duration-300 ${
                    selectedTab === tab.id ? 'scale-110' : 'group-hover:scale-105'
                  }`} />
                  <span className="relative z-10">{tab.label}</span>
                  {selectedTab === tab.id && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            
            {/* Overview Tab */}
            {selectedTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-gray-800/30 rounded-2xl p-6 mb-6">
                    <h3 className="text-2xl font-bold text-white mb-4">Company Overview</h3>
                    <p className="text-gray-300 leading-relaxed">{currentStock.description}</p>
                  </div>
                  
                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-6">Financial Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentStock.financialHighlights.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-700/30 rounded-xl p-4">
                          <span className="text-gray-300">{item.metric}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-bold">{item.value}</span>
                            {getTrendIcon(item.trend)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-800/30 rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Key Metrics</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Revenue</span>
                        <span className="text-white font-semibold">{currentStock.keyMetrics.revenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Net Profit</span>
                        <span className="text-white font-semibold">{currentStock.keyMetrics.netProfit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">EPS</span>
                        <span className="text-white font-semibold">₹{currentStock.keyMetrics.eps}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Book Value</span>
                        <span className="text-white font-semibold">₹{currentStock.keyMetrics.bookValue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">52W High</span>
                        <span className="text-white font-semibold">₹{currentStock.weekHigh}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">52W Low</span>
                        <span className="text-white font-semibold">₹{currentStock.weekLow}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Price Targets</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">High</span>
                        <span className="text-green-400 font-semibold">₹{currentStock.priceTargets.high}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Average</span>
                        <span className="text-blue-400 font-semibold">₹{currentStock.priceTargets.average}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Low</span>
                        <span className="text-yellow-400 font-semibold">₹{currentStock.priceTargets.low}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Financials Tab */}
            {selectedTab === 'financials' && (
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-6">Financial Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentStock.financialHighlights.map((item, index) => (
                    <div key={index} className="bg-gray-700/30 rounded-xl p-6 text-center">
                      <h4 className="text-lg font-bold text-white mb-2">{item.metric}</h4>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-2xl font-bold text-white">{item.value}</span>
                        {getTrendIcon(item.trend)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Tab */}
            {selectedTab === 'technical' && (
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-6">Technical Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">RSI (14)</span>
                      <span className="text-white font-semibold">{currentStock.technicalIndicators.rsi}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">MACD</span>
                      <span className="text-green-400 font-semibold">{currentStock.technicalIndicators.macd}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">50 Day MA</span>
                      <span className="text-white font-semibold">₹{currentStock.technicalIndicators.movingAverage50}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">200 Day MA</span>
                      <span className="text-white font-semibold">₹{currentStock.technicalIndicators.movingAverage200}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Support</span>
                      <span className="text-red-400 font-semibold">₹{currentStock.technicalIndicators.support}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Resistance</span>
                      <span className="text-green-400 font-semibold">₹{currentStock.technicalIndicators.resistance}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Projection Tab */}
            {selectedTab === 'projection' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-white">ASI Projection Analysis</h3>
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

                {/* Projection Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl p-6 border border-blue-500/30">
                    <h4 className="text-lg font-bold text-white mb-2">{currentStock.symbol} Projection</h4>
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      +{currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.return}%
                    </div>
                    <div className="text-sm text-gray-300">
                      Target: ₹{currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.end}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Confidence: {currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.confidence}%
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-2xl p-6 border border-green-500/30">
                    <h4 className="text-lg font-bold text-white mb-2">NIFTY 50 Projection</h4>
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      +{currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].nifty.return}%
                    </div>
                    <div className="text-sm text-gray-300">
                      Target: {currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].nifty.end}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Confidence: {currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].nifty.confidence}%
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30">
                    <h4 className="text-lg font-bold text-white mb-2">Outperformance</h4>
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      +{currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].outperformance}%
                    </div>
                    <div className="text-sm text-gray-300">
                      vs NIFTY 50
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Expected Alpha Generation
                    </div>
                  </div>
                </div>

                {/* World-Class Daily Candlestick Chart */}
                <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-gray-700/30 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h4 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                        Daily ASI Projection Analysis
                      </h4>
                      <p className="text-gray-400 text-lg">Precision daily predictions with market volatility insights</p>
                    </div>
                    <div className="text-sm text-gray-400">
                      Volatility: <span className={`font-bold text-lg px-3 py-1 rounded-full ${
                        currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].volatility === 'Low' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].volatility === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].volatility === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].volatility}
                      </span>
                    </div>
                  </div>
                  
                  {/* Premium Price Range Cards */}
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-red-500/10 via-red-600/5 to-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="text-red-400 text-sm font-semibold uppercase tracking-wider mb-2">Conservative Floor</div>
                      <div className="text-white text-2xl font-bold mb-1">₹{currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.min}</div>
                      <div className="text-red-300/70 text-xs">Downside Protection</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6 text-center backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">ASI Target</div>
                      <div className="text-white text-2xl font-bold mb-1">₹{currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.end}</div>
                      <div className="text-blue-300/70 text-xs">AI Predicted Price</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/10 via-green-600/5 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 text-center backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="text-green-400 text-sm font-semibold uppercase tracking-wider mb-2">Optimistic Ceiling</div>
                      <div className="text-white text-2xl font-bold mb-1">₹{currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.max}</div>
                      <div className="text-green-300/70 text-xs">Maximum Potential</div>
                    </div>
                  </div>
                  
                  {/* Professional Candlestick Chart Container */}
                  <div className="relative h-[500px] bg-gradient-to-br from-gray-950/90 to-gray-900/90 rounded-2xl p-8 mb-6 border border-gray-700/20 shadow-inner">
                    <div className="w-full h-full relative">
                      {/* Enhanced Y-axis */}
                      <div className="absolute left-0 top-0 h-full w-24 flex flex-col justify-between text-sm text-gray-300 pr-4 font-mono">
                        <span className="bg-gray-800/50 px-2 py-1 rounded text-xs">₹{currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.max}</span>
                        <span className="bg-gray-800/50 px-2 py-1 rounded text-xs">₹{Math.round((currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.max + currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.min) / 2)}</span>
                        <span className="bg-gray-800/50 px-2 py-1 rounded text-xs">₹{currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.min}</span>
                      </div>
                      
                      {/* Chart area with enhanced styling */}
                      <div className="ml-24 mr-6 h-full relative">
                        {/* Premium Grid lines */}
                        <div className="absolute inset-0">
                          {[...Array(8)].map((_, i) => (
                            <div 
                              key={i} 
                              className="absolute w-full border-t border-gray-600/10 hover:border-gray-500/20 transition-colors duration-200" 
                              style={{ top: `${i * 12.5}%` }}
                            ></div>
                          ))}
                          {currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData.map((_, i) => (
                            <div 
                              key={i} 
                              className="absolute h-full border-l border-gray-600/10 hover:border-gray-500/20 transition-colors duration-200" 
                              style={{ left: `${(i / (currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData.length - 1)) * 100}%` }}
                            ></div>
                          ))}
                        </div>
                        
                        {/* Interactive Line Chart SVG */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="avgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#3B82F6" />
                              <stop offset="50%" stopColor="#8B5CF6" />
                              <stop offset="100%" stopColor="#EC4899" />
                            </linearGradient>
                            <linearGradient id="maxGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#10B981" />
                              <stop offset="100%" stopColor="#059669" />
                            </linearGradient>
                            <linearGradient id="minGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#EF4444" />
                              <stop offset="100%" stopColor="#DC2626" />
                            </linearGradient>
                            <linearGradient id="niftyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#F59E0B" />
                              <stop offset="100%" stopColor="#D97706" />
                            </linearGradient>
                            <filter id="glow">
                              <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
                              <feMerge> 
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
                            </linearGradient>
                          </defs>
                          
                          {/* Prediction Band Area */}
                          <path
                            d={`M ${currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData.map((data, index) => {
                              const x = (index / (currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData.length - 1)) * 100;
                              const minPrice = currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.min;
                              const maxPrice = currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.max;
                              const maxY = 100 - ((data.maxPrediction - minPrice) / (maxPrice - minPrice)) * 100;
                              return `${x},${maxY}`;
                            }).join(' L ')} L ${currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData.map((data, index) => {
                              const x = (index / (currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData.length - 1)) * 100;
                              const minPrice = currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.min;
                              const maxPrice = currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.max;
                              const minY = 100 - ((data.minPrediction - minPrice) / (maxPrice - minPrice)) * 100;
                              return `${x},${minY}`;
                            }).reverse().join(' L ')} Z`}
                            fill="url(#areaGradient)"
                            opacity="0.4"
                          />
                          
                          {/* Max Prediction Line */}
                          <polyline
                            fill="none"
                            stroke="url(#maxGradient)"
                            strokeWidth="1.2"
                            vectorEffect="non-scaling-stroke"
                            opacity="0.8"
                            strokeDasharray="4,2"
                            points={currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData.map((data, index) => {
                              const x = (index / (currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData.length - 1)) * 100;
                              const minPrice = currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.min;
                              const maxPrice = currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.max;
                              const y = 100 - ((data.maxPrediction - minPrice) / (maxPrice - minPrice)) * 100;
                              return `${x},${y}`;
                            }).join(' ')}
                          />
                          
                          {/* Min Prediction Line */}
                          <polyline
                            fill="none"
                            stroke="url(#minGradient)"
                            strokeWidth="1.2"
                            vectorEffect="non-scaling-stroke"
                            opacity="0.8"
                            strokeDasharray="4,2"
                            points={currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData.map((data, index) => {
                              const x = (index / (currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData.length - 1)) * 100;
                              const minPrice = currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.min;
                              const maxPrice = currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.max;
                              const y = 100 - ((data.minPrediction - minPrice) / (maxPrice - minPrice)) * 100;
                              return `${x},${y}`;
                            }).join(' ')}
                          />
                          
                          {/* Average Prediction Line (Main) */}
                          <polyline
                            fill="none"
                            stroke="url(#avgGradient)"
                            strokeWidth="2.5"
                            vectorEffect="non-scaling-stroke"
                            filter="url(#glow)"
                            points={currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData.map((data, index) => {
                              const x = (index / (currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData.length - 1)) * 100;
                              const minPrice = currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.min;
                              const maxPrice = currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.max;
                              const y = 100 - ((data.avgPrediction - minPrice) / (maxPrice - minPrice)) * 100;
                              return `${x},${y}`;
                            }).join(' ')}
                          />
                          
                          {/* Interactive Data Points */}
                          {currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData.map((data, index) => {
                            const x = (index / (currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData.length - 1)) * 100;
                            const minPrice = currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.min;
                            const maxPrice = currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.max;
                            const y = 100 - ((data.avgPrediction - minPrice) / (maxPrice - minPrice)) * 100;
                            
                            return (
                              <circle
                                key={index}
                                cx={x}
                                cy={y}
                                r={hoveredDataPoint === index ? "1.5" : "1"}
                                fill="#3B82F6"
                                stroke="#FFFFFF"
                                strokeWidth="0.3"
                                vectorEffect="non-scaling-stroke"
                                className="cursor-pointer transition-all duration-200"
                                filter={hoveredDataPoint === index ? "url(#glow)" : ""}
                                onMouseEnter={() => setHoveredDataPoint(index)}
                                onMouseLeave={() => setHoveredDataPoint(null)}
                              />
                            );
                          })}
                          
                          {/* NIFTY benchmark line */}
                          <polyline
                            fill="none"
                            stroke="url(#niftyGradient)"
                            strokeWidth="1.5"
                            strokeDasharray="6,3"
                            vectorEffect="non-scaling-stroke"
                            opacity="0.6"
                            points={currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].nifty.map((niftyPrice, index) => {
                              const x = (index / (currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].nifty.length - 1)) * 100;
                              const niftyStart = currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].nifty[0];
                              const niftyReturn = (niftyPrice - niftyStart) / niftyStart;
                              const stockStart = currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.start;
                              const normalizedPrice = stockStart * (1 + niftyReturn);
                              
                              const minPrice = currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.min;
                              const maxPrice = currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.max;
                              const y = 100 - ((normalizedPrice - minPrice) / (maxPrice - minPrice)) * 100;
                              return `${x},${Math.max(0, Math.min(100, y))}`;
                            }).join(' ')}
                          />
                        </svg>
                      </div>
                      
                      {/* X-axis labels */}
                      <div className="absolute bottom-0 left-24 right-6 flex justify-between text-xs text-gray-400">
                        {currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData.map((data, index) => (
                          <span key={index} className="text-center">{data.date}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover Tooltip */}
                  {hoveredDataPoint !== null && (
                    <div className="bg-gray-800/90 border border-gray-600 rounded-lg p-4 mb-4 backdrop-blur-sm">
                      <h5 className="text-white font-semibold mb-2">
                        {currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData[hoveredDataPoint].date}
                      </h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">Open: <span className="text-white">₹{currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData[hoveredDataPoint].open}</span></div>
                          <div className="text-gray-400">High: <span className="text-green-400">₹{currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData[hoveredDataPoint].high}</span></div>
                          <div className="text-gray-400">Low: <span className="text-red-400">₹{currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData[hoveredDataPoint].low}</span></div>
                          <div className="text-gray-400">Close: <span className="text-white">₹{currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData[hoveredDataPoint].close}</span></div>
                        </div>
                        <div>
                          <div className="text-gray-400">Volume: <span className="text-blue-400">{(currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData[hoveredDataPoint].volume / 1000000).toFixed(2)}M</span></div>
                          <div className="text-gray-400">Avg Prediction: <span className="text-purple-400">₹{currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData[hoveredDataPoint].avgPrediction}</span></div>
                          <div className="text-gray-400">Min Prediction: <span className="text-red-400">₹{currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData[hoveredDataPoint].minPrediction}</span></div>
                          <div className="text-gray-400">Max Prediction: <span className="text-green-400">₹{currentStock.chartData[selectedTimeframe as keyof typeof currentStock.chartData].dailyData[hoveredDataPoint].maxPrediction}</span></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Chart Legend */}
                  <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
                      <span className="text-white text-sm font-medium">Average Prediction</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded" style={{borderTop: '2px dashed #10B981'}}></div>
                      <span className="text-white text-sm font-medium">Max Prediction</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded" style={{borderTop: '2px dashed #EF4444'}}></div>
                      <span className="text-white text-sm font-medium">Min Prediction</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-1 bg-gradient-to-r from-yellow-500 to-orange-600 rounded" style={{borderTop: '2px dashed #F59E0B'}}></div>
                      <span className="text-white text-sm font-medium">NIFTY Benchmark</span>
                    </div>
                  </div>
                </div>

                {/* Key Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Key Projection Insights</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300 text-sm">Expected to outperform NIFTY by {currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].outperformance}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300 text-sm">Price target of ₹{currentStock.projections[selectedTimeframe as keyof typeof currentStock.projections].stock.end} in {selectedTimeframe}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-300 text-sm">High confidence projection based on ASI analysis</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Risk Assessment</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Volatility Risk</span>
                        <span className="text-yellow-400 font-semibold">Moderate</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Market Risk</span>
                        <span className="text-orange-400 font-semibold">High</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Sector Risk</span>
                        <span className="text-green-400 font-semibold">Low</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Overall Risk</span>
                        <span className="text-yellow-400 font-semibold">Moderate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fundamental Tab */}
            {selectedTab === 'fundamental' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <span>Strengths</span>
                    </h3>
                    <ul className="space-y-2">
                      {currentStock.fundamentalAnalysis.strengths.map((strength, index) => (
                        <li key={index} className="text-gray-300 flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                      <Target className="w-6 h-6 text-blue-400" />
                      <span>Opportunities</span>
                    </h3>
                    <ul className="space-y-2">
                      {currentStock.fundamentalAnalysis.opportunities.map((opportunity, index) => (
                        <li key={index} className="text-gray-300 flex items-start space-x-2">
                          <Target className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                          <span>{opportunity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                      <XCircle className="w-6 h-6 text-red-400" />
                      <span>Weaknesses</span>
                    </h3>
                    <ul className="space-y-2">
                      {currentStock.fundamentalAnalysis.weaknesses.map((weakness, index) => (
                        <li key={index} className="text-gray-300 flex items-start space-x-2">
                          <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                      <AlertTriangle className="w-6 h-6 text-yellow-400" />
                      <span>Threats</span>
                    </h3>
                    <ul className="space-y-2">
                      {currentStock.fundamentalAnalysis.threats.map((threat, index) => (
                        <li key={index} className="text-gray-300 flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                          <span>{threat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Analyst Tab */}
            {selectedTab === 'analyst' && (
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-6">Analyst Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Rating Distribution</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-green-400">Strong Buy</span>
                        <span className="text-white font-bold">{currentStock.analystRatings.strongBuy}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-400">Buy</span>
                        <span className="text-white font-bold">{currentStock.analystRatings.buy}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-400">Hold</span>
                        <span className="text-white font-bold">{currentStock.analystRatings.hold}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-400">Sell</span>
                        <span className="text-white font-bold">{currentStock.analystRatings.sell}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Consensus</h4>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-400 mb-2">STRONG BUY</div>
                      <div className="text-gray-400">Based on {Object.values(currentStock.analystRatings).reduce((a, b) => a + b, 0)} analyst ratings</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default StockAnalysisPage;
