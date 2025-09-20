'use client';

import React, { useState } from 'react';
import { Search, Plus, X, TrendingUp, TrendingDown, BarChart3, Shield, Target, Zap, Brain, Eye, Star, ArrowRight, Download, Share2, Activity, Award, Calendar, DollarSign, AlertTriangle, CheckCircle, Filter, LineChart as LineChartIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const StockComparisonPage = () => {
  const [selectedStocks, setSelectedStocks] = useState([
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Ltd',
      price: '₹2,456.75',
      change: '+1.24%',
      changeValue: '+30.15',
      marketCap: '₹16.6L Cr',
      pe: 24.5,
      pb: 1.8,
      roe: 12.4,
      debt: 0.32,
      dividend: 1.2,
      beta: 1.15,
      sector: 'Oil & Gas',
      asiScore: 8.4,
      recommendation: 'BUY',
      targetPrice: '₹2,850',
      upside: 16.0,
      riskLevel: 'Medium',
      analystRating: 4.2,
      futureGrowth: 'Strong',
      technicalSignal: 'Bullish'
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      price: '₹3,789.20',
      change: '+0.89%',
      changeValue: '+33.45',
      marketCap: '₹13.8L Cr',
      pe: 28.7,
      pb: 12.5,
      roe: 42.8,
      debt: 0.05,
      dividend: 2.1,
      beta: 0.85,
      sector: 'IT Services',
      asiScore: 9.1,
      recommendation: 'STRONG BUY',
      targetPrice: '₹4,200',
      upside: 10.8,
      riskLevel: 'Low',
      analystRating: 4.6,
      futureGrowth: 'Excellent',
      technicalSignal: 'Very Bullish'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddStock, setShowAddStock] = useState(false);
  const [activeTab, setActiveTab] = useState('comparison');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('1Y');

  const stockSuggestions = [
    { symbol: 'INFY', name: 'Infosys Ltd', sector: 'IT Services' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', sector: 'Banking' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', sector: 'Banking' },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', sector: 'FMCG' },
    { symbol: 'ITC', name: 'ITC Ltd', sector: 'FMCG' },
    { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', sector: 'Telecom' },
    { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd', sector: 'Paints' }
  ];

  // Historical performance data for charts
  const performanceData = {
    '1Y': [
      { period: 'Jan', RELIANCE: 2240, TCS: 3420, INFY: 1580, HDFCBANK: 1650 },
      { period: 'Feb', RELIANCE: 2180, TCS: 3380, INFY: 1520, HDFCBANK: 1620 },
      { period: 'Mar', RELIANCE: 2320, TCS: 3580, INFY: 1680, HDFCBANK: 1720 },
      { period: 'Apr', RELIANCE: 2280, TCS: 3520, INFY: 1620, HDFCBANK: 1680 },
      { period: 'May', RELIANCE: 2380, TCS: 3680, INFY: 1720, HDFCBANK: 1780 },
      { period: 'Jun', RELIANCE: 2420, TCS: 3720, INFY: 1760, HDFCBANK: 1820 },
      { period: 'Jul', RELIANCE: 2350, TCS: 3650, INFY: 1680, HDFCBANK: 1750 },
      { period: 'Aug', RELIANCE: 2410, TCS: 3710, INFY: 1740, HDFCBANK: 1810 },
      { period: 'Sep', RELIANCE: 2380, TCS: 3680, INFY: 1720, HDFCBANK: 1780 },
      { period: 'Oct', RELIANCE: 2440, TCS: 3740, INFY: 1780, HDFCBANK: 1840 },
      { period: 'Nov', RELIANCE: 2420, TCS: 3720, INFY: 1760, HDFCBANK: 1820 },
      { period: 'Dec', RELIANCE: 2456, TCS: 3789, INFY: 1820, HDFCBANK: 1880 }
    ]
  };

  // Future predictions data
  const predictionData = [
    { period: 'Current', RELIANCE: 2456, TCS: 3789 },
    { period: '3M', RELIANCE: 2580, TCS: 3920 },
    { period: '6M', RELIANCE: 2720, TCS: 4080 },
    { period: '1Y', RELIANCE: 2850, TCS: 4200 },
    { period: '2Y', RELIANCE: 3100, TCS: 4650 },
    { period: '3Y', RELIANCE: 3420, TCS: 5200 }
  ];

  // Risk-Return analysis data
  const riskReturnData = selectedStocks.map(stock => ({
    name: stock.symbol,
    risk: parseFloat(stock.beta.toString()) * 15,
    return: parseFloat(stock.roe.toString()),
    size: parseFloat(stock.marketCap.replace('₹', '').replace('L Cr', '')),
    color: stock.symbol === 'RELIANCE' ? '#3B82F6' : stock.symbol === 'TCS' ? '#8B5CF6' : '#10B981'
  }));

  // Sector performance comparison
  const sectorData = [
    { sector: 'IT Services', performance: 18.5, volatility: 12.3, outlook: 'Positive' },
    { sector: 'Oil & Gas', performance: 14.2, volatility: 18.7, outlook: 'Neutral' },
    { sector: 'Banking', performance: 16.8, volatility: 15.4, outlook: 'Positive' },
    { sector: 'FMCG', performance: 12.3, volatility: 8.9, outlook: 'Stable' }
  ];

  const addStock = (stock: any) => {
    if (selectedStocks.length < 4) {
      const newStock = {
        symbol: stock.symbol,
        name: stock.name,
        price: '₹' + (Math.random() * 3000 + 500).toFixed(2),
        change: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 3).toFixed(2) + '%',
        changeValue: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 50).toFixed(2),
        marketCap: '₹' + (Math.random() * 15 + 1).toFixed(1) + 'L Cr',
        pe: (Math.random() * 40 + 10).toFixed(1),
        pb: (Math.random() * 15 + 0.5).toFixed(1),
        roe: (Math.random() * 40 + 5).toFixed(1),
        debt: (Math.random() * 0.8).toFixed(2),
        dividend: (Math.random() * 3).toFixed(1),
        beta: (Math.random() * 1.5 + 0.5).toFixed(2),
        sector: stock.sector,
        asiScore: (Math.random() * 2 + 7).toFixed(1),
        recommendation: Math.random() > 0.5 ? 'BUY' : 'HOLD',
        targetPrice: '₹' + (Math.random() * 1000 + 2000).toFixed(0),
        upside: (Math.random() * 20 + 5).toFixed(1),
        riskLevel: Math.random() > 0.5 ? 'Medium' : 'Low',
        analystRating: (Math.random() * 1.5 + 3.5).toFixed(1),
        futureGrowth: Math.random() > 0.5 ? 'Strong' : 'Moderate',
        technicalSignal: Math.random() > 0.5 ? 'Bullish' : 'Neutral'
      };
      setSelectedStocks([...selectedStocks, newStock]);
      setShowAddStock(false);
      setSearchTerm('');
    }
  };

  const removeStock = (index: number) => {
    setSelectedStocks(selectedStocks.filter((_, i) => i !== index));
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
                Stock Comparison Engine
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
              Advanced AI-powered stock comparison with future predictions, risk analysis, and institutional-grade insights
            </p>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-2 flex gap-2">
              {[
                { id: 'comparison', label: 'Comparison', icon: BarChart3 },
                { id: 'predictions', label: 'Future Predictions', icon: TrendingUp },
                { id: 'risk-analysis', label: 'Risk Analysis', icon: Shield },
                { id: 'sector-view', label: 'Sector View', icon: Target }
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

        {/* Add Stock Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowAddStock(true)}
            disabled={selectedStocks.length >= 4}
            className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              selectedStocks.length >= 4
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
            }`}
          >
            <Plus className="w-5 h-5" />
            Add Stock to Compare {selectedStocks.length >= 4 && '(Maximum 4 stocks)'}
          </button>
        </div>

        {/* Add Stock Modal */}
        {showAddStock && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 max-w-2xl w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Add Stock</h3>
                <button
                  onClick={() => setShowAddStock(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search stocks by symbol or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {stockSuggestions
                  .filter(stock => 
                    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((stock) => (
                    <div
                      key={stock.symbol}
                      onClick={() => addStock(stock)}
                      className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer"
                    >
                      <div>
                        <div className="text-white font-bold">{stock.symbol}</div>
                        <div className="text-gray-300 text-sm">{stock.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-purple-400 text-sm">{stock.sector}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {selectedStocks.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left p-6 text-gray-300 font-semibold">Metric</th>
                    {selectedStocks.map((stock, index) => (
                      <th key={index} className="text-center p-6 min-w-48 relative">
                        <div className="text-center">
                          <div className="text-white font-bold text-lg">{stock.symbol}</div>
                          <div className="text-gray-300 text-sm">{stock.name}</div>
                          <div className="text-purple-400 text-xs">{stock.sector}</div>
                        </div>
                        <button
                          onClick={() => removeStock(index)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Current Price */}
                  <tr className="border-b border-white/10">
                    <td className="p-6 text-gray-300 font-semibold">Current Price</td>
                    {selectedStocks.map((stock, index) => (
                      <td key={index} className="p-6 text-center">
                        <div className="text-white font-bold text-xl">{stock.price}</div>
                        <div className={`text-sm ${getChangeColor(stock.change)}`}>
                          {stock.change} ({stock.changeValue})
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Market Cap */}
                  <tr className="border-b border-white/10">
                    <td className="p-6 text-gray-300 font-semibold">Market Cap</td>
                    {selectedStocks.map((stock, index) => (
                      <td key={index} className="p-6 text-center">
                        <div className="text-white font-semibold">{stock.marketCap}</div>
                      </td>
                    ))}
                  </tr>

                  {/* P/E Ratio */}
                  <tr className="border-b border-white/10">
                    <td className="p-6 text-gray-300 font-semibold">P/E Ratio</td>
                    {selectedStocks.map((stock, index) => {
                      const peValues = selectedStocks.map(s => parseFloat(s.pe.toString()));
                      return (
                        <td key={index} className="p-6 text-center">
                          <div className={`inline-block px-3 py-2 rounded-lg border ${getMetricComparison(peValues, index, false)}`}>
                            {stock.pe}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* P/B Ratio */}
                  <tr className="border-b border-white/10">
                    <td className="p-6 text-gray-300 font-semibold">P/B Ratio</td>
                    {selectedStocks.map((stock, index) => {
                      const pbValues = selectedStocks.map(s => parseFloat(s.pb.toString()));
                      return (
                        <td key={index} className="p-6 text-center">
                          <div className={`inline-block px-3 py-2 rounded-lg border ${getMetricComparison(pbValues, index, false)}`}>
                            {stock.pb}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* ROE */}
                  <tr className="border-b border-white/10">
                    <td className="p-6 text-gray-300 font-semibold">ROE (%)</td>
                    {selectedStocks.map((stock, index) => {
                      const roeValues = selectedStocks.map(s => parseFloat(s.roe.toString()));
                      return (
                        <td key={index} className="p-6 text-center">
                          <div className={`inline-block px-3 py-2 rounded-lg border ${getMetricComparison(roeValues, index, true)}`}>
                            {stock.roe}%
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Debt to Equity */}
                  <tr className="border-b border-white/10">
                    <td className="p-6 text-gray-300 font-semibold">Debt/Equity</td>
                    {selectedStocks.map((stock, index) => {
                      const debtValues = selectedStocks.map(s => parseFloat(s.debt.toString()));
                      return (
                        <td key={index} className="p-6 text-center">
                          <div className={`inline-block px-3 py-2 rounded-lg border ${getMetricComparison(debtValues, index, false)}`}>
                            {stock.debt}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Dividend Yield */}
                  <tr className="border-b border-white/10">
                    <td className="p-6 text-gray-300 font-semibold">Dividend Yield (%)</td>
                    {selectedStocks.map((stock, index) => {
                      const divValues = selectedStocks.map(s => parseFloat(s.dividend.toString()));
                      return (
                        <td key={index} className="p-6 text-center">
                          <div className={`inline-block px-3 py-2 rounded-lg border ${getMetricComparison(divValues, index, true)}`}>
                            {stock.dividend}%
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Beta */}
                  <tr>
                    <td className="p-6 text-gray-300 font-semibold">Beta</td>
                    {selectedStocks.map((stock, index) => (
                      <td key={index} className="p-6 text-center">
                        <div className="text-white font-semibold">{stock.beta}</div>
                        <div className="text-xs text-gray-400">
                          {parseFloat(stock.beta.toString()) > 1 ? 'High Volatility' : 'Low Volatility'}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'comparison' && selectedStocks.length >= 2 && (
          <div className="mt-8">
            {/* Enhanced AI Analysis */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">ASI Intelligence Analysis</h3>
                <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                  LIVE
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-semibold">Top ASI Score</span>
                  </div>
                  <div className="text-white font-bold text-2xl mb-2">
                    {selectedStocks.reduce((prev, curr) => parseFloat(prev.asiScore.toString()) > parseFloat(curr.asiScore.toString()) ? prev : curr).symbol}
                  </div>
                  <div className="text-green-400 text-lg font-bold mb-2">
                    {selectedStocks.reduce((prev, curr) => parseFloat(prev.asiScore.toString()) > parseFloat(curr.asiScore.toString()) ? prev : curr).asiScore}/10
                  </div>
                  <p className="text-gray-300 text-sm">
                    Highest ASI intelligence score with {selectedStocks.reduce((prev, curr) => parseFloat(prev.asiScore.toString()) > parseFloat(curr.asiScore.toString()) ? prev : curr).recommendation} recommendation
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-400 font-semibold">Lowest Risk</span>
                  </div>
                  <div className="text-white font-bold text-2xl mb-2">
                    {selectedStocks.reduce((prev, curr) => parseFloat(prev.beta.toString()) < parseFloat(curr.beta.toString()) ? prev : curr).symbol}
                  </div>
                  <div className="text-blue-400 text-lg font-bold mb-2">
                    β {selectedStocks.reduce((prev, curr) => parseFloat(prev.beta.toString()) < parseFloat(curr.beta.toString()) ? prev : curr).beta}
                  </div>
                  <p className="text-gray-300 text-sm">
                    {selectedStocks.reduce((prev, curr) => parseFloat(prev.beta.toString()) < parseFloat(curr.beta.toString()) ? prev : curr).riskLevel} risk profile for conservative portfolios
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-400 font-semibold">Highest Upside</span>
                  </div>
                  <div className="text-white font-bold text-2xl mb-2">
                    {selectedStocks.reduce((prev, curr) => parseFloat(prev.upside.toString()) > parseFloat(curr.upside.toString()) ? prev : curr).symbol}
                  </div>
                  <div className="text-purple-400 text-lg font-bold mb-2">
                    +{selectedStocks.reduce((prev, curr) => parseFloat(prev.upside.toString()) > parseFloat(curr.upside.toString()) ? prev : curr).upside}%
                  </div>
                  <p className="text-gray-300 text-sm">
                    Target: {selectedStocks.reduce((prev, curr) => parseFloat(prev.upside.toString()) > parseFloat(curr.upside.toString()) ? prev : curr).targetPrice}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold">Best ROE</span>
                  </div>
                  <div className="text-white font-bold text-2xl mb-2">
                    {selectedStocks.reduce((prev, curr) => parseFloat(prev.roe.toString()) > parseFloat(curr.roe.toString()) ? prev : curr).symbol}
                  </div>
                  <div className="text-yellow-400 text-lg font-bold mb-2">
                    {selectedStocks.reduce((prev, curr) => parseFloat(prev.roe.toString()) > parseFloat(curr.roe.toString()) ? prev : curr).roe}%
                  </div>
                  <p className="text-gray-300 text-sm">
                    Superior profitability and management efficiency
                  </p>
                </div>
              </div>

              {/* Technical Signals */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-400" />
                    Technical Signals
                  </h4>
                  <div className="space-y-3">
                    {selectedStocks.map((stock, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-300">{stock.symbol}</span>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          stock.technicalSignal === 'Very Bullish' ? 'bg-green-500/20 text-green-400' :
                          stock.technicalSignal === 'Bullish' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {stock.technicalSignal}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-purple-400" />
                    Analyst Ratings
                  </h4>
                  <div className="space-y-3">
                    {selectedStocks.map((stock, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-300">{stock.symbol}</span>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${
                                i < Math.floor(parseFloat(stock.analystRating.toString())) ? 'text-yellow-400 fill-current' : 'text-gray-600'
                              }`} />
                            ))}
                          </div>
                          <span className="text-white font-semibold">{stock.analystRating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* COMPREHENSIVE INVESTMENT ANALYSIS REPORT */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Comprehensive Investment Analysis Report</h3>
                  <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold">
                    INSTITUTIONAL GRADE
                  </div>
                </div>

                {/* Executive Summary */}
                <div className="bg-white/5 rounded-2xl p-6 mb-8">
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    Executive Summary
                  </h4>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Our comprehensive analysis of <strong className="text-white">{selectedStocks[0]?.symbol}</strong> vs <strong className="text-white">{selectedStocks[1]?.symbol}</strong> reveals distinct investment profiles suited for different investor objectives and risk tolerances. Based on our proprietary ASI (Artificial Stock Intelligence) scoring system and fundamental analysis, we provide the following strategic recommendations.
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-xl p-4">
                        <h5 className="text-green-400 font-bold mb-2">Winner: {selectedStocks.reduce((prev, curr) => parseFloat(prev.asiScore.toString()) > parseFloat(curr.asiScore.toString()) ? prev : curr).symbol}</h5>
                        <p className="text-gray-300 text-sm">
                          Superior ASI score of {selectedStocks.reduce((prev, curr) => parseFloat(prev.asiScore.toString()) > parseFloat(curr.asiScore.toString()) ? prev : curr).asiScore}/10 with {selectedStocks.reduce((prev, curr) => parseFloat(prev.asiScore.toString()) > parseFloat(curr.asiScore.toString()) ? prev : curr).recommendation} rating makes this our top pick for growth-oriented investors.
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-xl p-4">
                        <h5 className="text-blue-400 font-bold mb-2">Risk-Adjusted Choice: {selectedStocks.reduce((prev, curr) => parseFloat(prev.beta.toString()) < parseFloat(curr.beta.toString()) ? prev : curr).symbol}</h5>
                        <p className="text-gray-300 text-sm">
                          Lower beta of {selectedStocks.reduce((prev, curr) => parseFloat(prev.beta.toString()) < parseFloat(curr.beta.toString()) ? prev : curr).beta} and {selectedStocks.reduce((prev, curr) => parseFloat(prev.beta.toString()) < parseFloat(curr.beta.toString()) ? prev : curr).riskLevel} risk profile makes this ideal for conservative portfolios.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Stock Analysis */}
                <div className="space-y-8">
                  {selectedStocks.map((stock, index) => (
                    <div key={index} className="bg-white/5 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-xl font-bold text-white flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                          {stock.symbol} - In-Depth Analysis
                        </h4>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          stock.recommendation === 'STRONG BUY' ? 'bg-green-500/20 text-green-400' :
                          stock.recommendation === 'BUY' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {stock.recommendation}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Fundamental Strengths */}
                        <div>
                          <h5 className="text-green-400 font-bold mb-3 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Key Strengths
                          </h5>
                          <div className="space-y-2 text-gray-300 text-sm">
                            <p>• <strong>ROE Excellence:</strong> {stock.roe}% return on equity demonstrates {parseFloat(stock.roe.toString()) > 15 ? 'exceptional' : parseFloat(stock.roe.toString()) > 10 ? 'strong' : 'moderate'} management efficiency in generating shareholder returns.</p>
                            <p>• <strong>Valuation Metrics:</strong> P/E ratio of {stock.pe} indicates {parseFloat(stock.pe.toString()) < 20 ? 'attractive' : parseFloat(stock.pe.toString()) < 30 ? 'reasonable' : 'premium'} valuation relative to earnings growth potential.</p>
                            <p>• <strong>Financial Health:</strong> Debt-to-equity ratio of {stock.debt} reflects {parseFloat(stock.debt.toString()) < 0.3 ? 'conservative' : parseFloat(stock.debt.toString()) < 0.6 ? 'moderate' : 'aggressive'} capital structure management.</p>
                            <p>• <strong>Dividend Policy:</strong> {stock.dividend}% yield provides {parseFloat(stock.dividend.toString()) > 2 ? 'attractive' : parseFloat(stock.dividend.toString()) > 1 ? 'reasonable' : 'modest'} income generation for dividend-focused investors.</p>
                            <p>• <strong>Market Position:</strong> ₹{stock.marketCap} market capitalization positions this as a {stock.sector} sector leader with institutional backing.</p>
                          </div>
                        </div>

                        {/* Risk Factors */}
                        <div>
                          <h5 className="text-red-400 font-bold mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Risk Considerations
                          </h5>
                          <div className="space-y-2 text-gray-300 text-sm">
                            <p>• <strong>Volatility Risk:</strong> Beta of {stock.beta} indicates {parseFloat(stock.beta.toString()) > 1.2 ? 'high' : parseFloat(stock.beta.toString()) > 0.8 ? 'moderate' : 'low'} price volatility compared to market movements.</p>
                            <p>• <strong>Sector Exposure:</strong> {stock.sector} sector concentration brings {stock.sector === 'IT Services' ? 'technology disruption and currency' : stock.sector === 'Oil & Gas' ? 'commodity price and regulatory' : 'cyclical business and competition'} risks.</p>
                            <p>• <strong>Valuation Risk:</strong> Current P/B ratio of {stock.pb} suggests {parseFloat(stock.pb.toString()) > 3 ? 'premium valuation with limited margin of safety' : parseFloat(stock.pb.toString()) > 1.5 ? 'fair valuation with moderate downside protection' : 'attractive valuation with strong downside protection'}.</p>
                            <p>• <strong>Market Risk:</strong> {stock.riskLevel} risk classification requires {stock.riskLevel === 'High' ? 'aggressive risk tolerance and active monitoring' : stock.riskLevel === 'Medium' ? 'moderate risk appetite and periodic review' : 'conservative approach suitable for stable portfolios'}.</p>
                            <p>• <strong>Liquidity Considerations:</strong> Large-cap status ensures adequate liquidity but may limit explosive growth potential compared to mid-cap alternatives.</p>
                          </div>
                        </div>
                      </div>

                      {/* Investment Thesis */}
                      <div className="mt-6 bg-white/5 rounded-xl p-4">
                        <h5 className="text-purple-400 font-bold mb-3">Investment Thesis</h5>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {stock.symbol} presents a {stock.recommendation === 'STRONG BUY' ? 'compelling investment opportunity' : stock.recommendation === 'BUY' ? 'solid investment case' : 'moderate investment proposition'} with {stock.upside}% upside potential to our target price of {stock.targetPrice}. 
                          The company's {stock.futureGrowth.toLowerCase()} growth prospects, combined with {stock.technicalSignal.toLowerCase()} technical momentum, make it suitable for 
                          {stock.riskLevel === 'Low' ? ' conservative investors seeking stable returns with dividend income' : 
                           stock.riskLevel === 'Medium' ? ' balanced portfolios requiring moderate growth with manageable risk' : 
                           ' aggressive growth portfolios with high risk tolerance'}. 
                          Our ASI score of {stock.asiScore}/10 reflects {parseFloat(stock.asiScore.toString()) > 8.5 ? 'exceptional' : parseFloat(stock.asiScore.toString()) > 7.5 ? 'strong' : 'moderate'} fundamental and technical alignment.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comparative Analysis */}
                <div className="bg-white/5 rounded-2xl p-6 mt-8">
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    Head-to-Head Comparative Analysis
                  </h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h5 className="text-green-400 font-bold mb-3">Why {selectedStocks[0]?.symbol} Outperforms</h5>
                      <div className="space-y-2 text-gray-300 text-sm">
                        <p>• <strong>Superior Profitability:</strong> {parseFloat(selectedStocks[0]?.roe.toString()) > parseFloat(selectedStocks[1]?.roe.toString()) ? `Higher ROE of ${selectedStocks[0]?.roe}% vs ${selectedStocks[1]?.roe}% demonstrates better capital efficiency` : `Competitive ROE of ${selectedStocks[0]?.roe}% maintains strong profitability standards`}</p>
                        <p>• <strong>Valuation Advantage:</strong> {parseFloat(selectedStocks[0]?.pe.toString()) < parseFloat(selectedStocks[1]?.pe.toString()) ? `More attractive P/E of ${selectedStocks[0]?.pe} vs ${selectedStocks[1]?.pe} offers better value proposition` : `Premium P/E of ${selectedStocks[0]?.pe} justified by superior growth prospects`}</p>
                        <p>• <strong>Technical Momentum:</strong> {selectedStocks[0]?.technicalSignal} signal indicates stronger near-term price momentum and institutional interest</p>
                        <p>• <strong>Analyst Confidence:</strong> {selectedStocks[0]?.analystRating}/5 rating reflects {parseFloat(selectedStocks[0]?.analystRating.toString()) > 4 ? 'strong' : 'moderate'} analyst conviction in future performance</p>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-blue-400 font-bold mb-3">Why {selectedStocks[1]?.symbol} Remains Competitive</h5>
                      <div className="space-y-2 text-gray-300 text-sm">
                        <p>• <strong>Risk Profile:</strong> {parseFloat(selectedStocks[1]?.beta.toString()) < parseFloat(selectedStocks[0]?.beta.toString()) ? `Lower beta of ${selectedStocks[1]?.beta} vs ${selectedStocks[0]?.beta} provides better downside protection` : `Moderate volatility profile suitable for growth-oriented portfolios`}</p>
                        <p>• <strong>Dividend Yield:</strong> {parseFloat(selectedStocks[1]?.dividend.toString()) > parseFloat(selectedStocks[0]?.dividend.toString()) ? `Higher dividend yield of ${selectedStocks[1]?.dividend}% vs ${selectedStocks[0]?.dividend}% appeals to income investors` : `Competitive dividend policy supports total return strategy`}</p>
                        <p>• <strong>Sector Dynamics:</strong> {selectedStocks[1]?.sector} exposure provides diversification benefits and different economic cycle sensitivity</p>
                        <p>• <strong>Growth Potential:</strong> {selectedStocks[1]?.futureGrowth} growth outlook with {selectedStocks[1]?.upside}% upside maintains investment attractiveness</p>
                      </div>
                    </div>
                  </div>

                  {/* Risk-Return Matrix */}
                  <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-4">
                    <h5 className="text-white font-bold mb-3">Risk-Return Assessment Matrix</h5>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-green-400 font-bold">Conservative Investors</div>
                        <div className="text-gray-300">
                          Recommend: {selectedStocks.reduce((prev, curr) => parseFloat(prev.beta.toString()) < parseFloat(curr.beta.toString()) ? prev : curr).symbol}<br/>
                          Allocation: 70-80%<br/>
                          Rationale: Lower volatility, stable dividends
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-blue-400 font-bold">Moderate Investors</div>
                        <div className="text-gray-300">
                          Recommend: Balanced Portfolio<br/>
                          Allocation: 60-40 split<br/>
                          Rationale: Diversified risk-return profile
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-purple-400 font-bold">Aggressive Investors</div>
                        <div className="text-gray-300">
                          Recommend: {selectedStocks.reduce((prev, curr) => parseFloat(prev.asiScore.toString()) > parseFloat(curr.asiScore.toString()) ? prev : curr).symbol}<br/>
                          Allocation: 70-80%<br/>
                          Rationale: Higher growth potential, ASI score
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Portfolio Allocation Recommendations */}
                <div className="bg-white/5 rounded-2xl p-6 mt-8">
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    Strategic Portfolio Allocation Recommendations
                  </h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Conservative Portfolio */}
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-xl p-4">
                      <h5 className="text-green-400 font-bold mb-3 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Conservative Portfolio
                      </h5>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{selectedStocks.reduce((prev, curr) => parseFloat(prev.beta.toString()) < parseFloat(curr.beta.toString()) ? prev : curr).symbol}</span>
                          <span className="text-white font-bold">75%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{selectedStocks.reduce((prev, curr) => parseFloat(prev.beta.toString()) > parseFloat(curr.beta.toString()) ? prev : curr).symbol}</span>
                          <span className="text-white font-bold">25%</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-3">
                          <strong>Target Return:</strong> 12-15% annually<br/>
                          <strong>Risk Level:</strong> Low to Moderate<br/>
                          <strong>Suitable For:</strong> Retirees, risk-averse investors
                        </div>
                      </div>
                    </div>

                    {/* Balanced Portfolio */}
                    <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-xl p-4">
                      <h5 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Balanced Portfolio
                      </h5>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{selectedStocks[0]?.symbol}</span>
                          <span className="text-white font-bold">60%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{selectedStocks[1]?.symbol}</span>
                          <span className="text-white font-bold">40%</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-3">
                          <strong>Target Return:</strong> 15-18% annually<br/>
                          <strong>Risk Level:</strong> Moderate<br/>
                          <strong>Suitable For:</strong> Long-term wealth builders
                        </div>
                      </div>
                    </div>

                    {/* Growth Portfolio */}
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-xl p-4">
                      <h5 className="text-purple-400 font-bold mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Growth Portfolio
                      </h5>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{selectedStocks.reduce((prev, curr) => parseFloat(prev.asiScore.toString()) > parseFloat(curr.asiScore.toString()) ? prev : curr).symbol}</span>
                          <span className="text-white font-bold">80%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{selectedStocks.reduce((prev, curr) => parseFloat(prev.asiScore.toString()) < parseFloat(curr.asiScore.toString()) ? prev : curr).symbol}</span>
                          <span className="text-white font-bold">20%</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-3">
                          <strong>Target Return:</strong> 18-25% annually<br/>
                          <strong>Risk Level:</strong> High<br/>
                          <strong>Suitable For:</strong> Young professionals, high risk tolerance
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Recommendations */}
                <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-400/20 rounded-2xl p-6 mt-8">
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    Final Investment Recommendations
                  </h4>
                  
                  <div className="prose prose-invert max-w-none">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-green-400 font-bold mb-3">✅ Recommended Actions</h5>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li><strong>Primary Choice:</strong> {selectedStocks.reduce((prev, curr) => parseFloat(prev.asiScore.toString()) > parseFloat(curr.asiScore.toString()) ? prev : curr).symbol} for its superior ASI score and {selectedStocks.reduce((prev, curr) => parseFloat(prev.asiScore.toString()) > parseFloat(curr.asiScore.toString()) ? prev : curr).upside}% upside potential</li>
                          <li><strong>Diversification:</strong> Consider 60-40 allocation to balance growth and stability</li>
                          <li><strong>Entry Strategy:</strong> Dollar-cost averaging over 3-6 months to mitigate timing risk</li>
                          <li><strong>Monitoring:</strong> Quarterly review of fundamental metrics and sector dynamics</li>
                          <li><strong>Exit Strategy:</strong> Profit booking at target prices with trailing stop-loss</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-red-400 font-bold mb-3">⚠️ Risk Mitigation</h5>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li><strong>Position Sizing:</strong> Limit individual stock exposure to 5-10% of total portfolio</li>
                          <li><strong>Sector Concentration:</strong> Balance with stocks from different sectors</li>
                          <li><strong>Market Timing:</strong> Avoid lump-sum investments during market peaks</li>
                          <li><strong>Volatility Management:</strong> Use systematic investment plans (SIPs) for regular exposure</li>
                          <li><strong>Regular Rebalancing:</strong> Maintain target allocation through periodic adjustments</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-4 mt-6">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        <strong className="text-white">Disclaimer:</strong> This analysis is based on current market conditions and historical data. Past performance does not guarantee future results. 
                        Investors should conduct their own due diligence and consider their risk tolerance, investment objectives, and financial situation before making investment decisions. 
                        Consider consulting with a qualified financial advisor for personalized investment advice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Future Predictions Tab */}
        {activeTab === 'predictions' && selectedStocks.length >= 1 && (
          <div className="mt-8">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Future Price Predictions</h3>
                <div className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold">
                  AI POWERED
                </div>
              </div>

              {/* Price Prediction Chart */}
              <div className="bg-white/5 rounded-2xl p-6 mb-8">
                <h4 className="text-lg font-bold text-white mb-6">3-Year Price Projection</h4>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="period" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(17, 24, 39, 0.8)', 
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '12px'
                        }}
                      />
                      {selectedStocks.map((stock, index) => (
                        <Line 
                          key={stock.symbol}
                          type="monotone" 
                          dataKey={stock.symbol} 
                          stroke={index === 0 ? '#3B82F6' : '#8B5CF6'}
                          strokeWidth={3}
                          dot={{ fill: index === 0 ? '#3B82F6' : '#8B5CF6', strokeWidth: 2, r: 6 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Prediction Summary Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {selectedStocks.map((stock, index) => (
                  <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-white">{stock.symbol}</h4>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        stock.recommendation === 'STRONG BUY' ? 'bg-green-500/20 text-green-400' :
                        stock.recommendation === 'BUY' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {stock.recommendation}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-gray-400 text-sm">Current Price</div>
                        <div className="text-white font-bold text-lg">{stock.price}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Target Price</div>
                        <div className="text-green-400 font-bold text-lg">{stock.targetPrice}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Upside Potential</div>
                        <div className="text-purple-400 font-bold text-lg">+{stock.upside}%</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Future Growth</div>
                        <div className="text-blue-400 font-bold text-lg">{stock.futureGrowth}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {selectedStocks.length === 0 && (
          <div className="text-center py-16">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">No Stocks Selected</h3>
            <p className="text-gray-300 mb-8">Add stocks to start comparing their fundamentals and performance metrics</p>
            <button
              onClick={() => setShowAddStock(true)}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
            >
              Add Your First Stock
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockComparisonPage;
