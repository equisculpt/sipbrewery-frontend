'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, TrendingUp, Star, Shield, DollarSign, ArrowUpRight, ArrowDownRight, Minus, BarChart3, Zap, Target, Brain, Award, Sparkles, TrendingDown, Calculator, PieChart, Globe, Users } from 'lucide-react';
import PayTMStyleNavigation from '../../components/PayTMStyleNavigation';

const MutualFundsPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('returns');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // TODO: Replace with actual auth state
  const [viewMode, setViewMode] = useState('grid'); // grid, list, comparison
  const [selectedFunds, setSelectedFunds] = useState<number[]>([]);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [riskProfile, setRiskProfile] = useState('moderate');
  const [investmentGoal, setInvestmentGoal] = useState('wealth_creation');
  const [timeHorizon, setTimeHorizon] = useState('long_term');
  const [animationKey, setAnimationKey] = useState(0);
  
  // Navigation Functions
  const handleInvestNow = (fundId: number, fundName: string) => {
    if (isAuthenticated) {
      // User is logged in, go directly to investment page
      router.push(`/investment?fundId=${fundId}&fundName=${encodeURIComponent(fundName)}`);
    } else {
      // User not logged in, go to login with redirect
      router.push(`/login?redirect=/investment&fundId=${fundId}&fundName=${encodeURIComponent(fundName)}`);
    }
  };

  const handleFSIAnalysis = (fundId: number, fundName: string) => {
    // Navigate to FSI Analysis page
    router.push(`/fsi-analysis/${fundId}`);
  };
  
  // Enhanced mutual fund data with AI insights
  const mutualFunds = [
    {
      id: 1,
      name: 'SBI Blue Chip Fund',
      category: 'Large Cap',
      nav: 89.45,
      returns1Y: 12.5,
      returns3Y: 15.2,
      returns5Y: 13.8,
      rating: 4,
      riskLevel: 'Moderate',
      minInvestment: 500,
      expenseRatio: 1.8,
      aum: '₹45,678 Cr',
      fundManager: 'Dinesh Ahuja',
      benchmark: 'NIFTY 100 TRI',
      sharpeRatio: 0.85,
      alpha: 2.3,
      beta: 0.92,
      aiScore: 87,
      aiInsight: 'Strong fundamentals with consistent performance',
      esgScore: 'A+',
      volatility: 'Low',
      dividendYield: 1.2,
      portfolioTurnover: 45,
      exitLoad: '1% if redeemed within 1 year',
      lockIn: 'None',
      sipMinimum: 500,
      trending: true,
      recommended: true,
      tags: ['Blue Chip', 'Consistent', 'Low Risk'],
      topHoldings: ['Reliance Industries', 'HDFC Bank', 'Infosys'],
      sectorAllocation: { 'Financial Services': 25, 'IT': 18, 'Energy': 12 }
    },
    {
      id: 2,
      name: 'HDFC Mid-Cap Opportunities',
      category: 'Mid Cap',
      nav: 156.78,
      returns1Y: 18.3,
      returns3Y: 22.1,
      returns5Y: 19.5,
      rating: 5,
      riskLevel: 'High',
      minInvestment: 1000,
      expenseRatio: 2.1
    },
    {
      id: 3,
      name: 'ICICI Prudential Equity & Debt',
      category: 'Hybrid',
      nav: 234.56,
      returns1Y: 9.8,
      returns3Y: 11.4,
      returns5Y: 10.2,
      rating: 4,
      riskLevel: 'Low',
      minInvestment: 500,
      expenseRatio: 1.5
    },
    {
      id: 4,
      name: 'Axis Small Cap Fund',
      category: 'Small Cap',
      nav: 67.89,
      returns1Y: 25.6,
      returns3Y: 28.9,
      returns5Y: 24.3,
      rating: 5,
      riskLevel: 'Very High',
      minInvestment: 1000,
      expenseRatio: 2.3
    },
    {
      id: 5,
      name: 'Kotak Tax Saver Fund',
      category: 'ELSS',
      nav: 78.12,
      returns1Y: 14.7,
      returns3Y: 16.8,
      returns5Y: 15.1,
      rating: 4,
      riskLevel: 'Moderate',
      minInvestment: 500,
      expenseRatio: 1.9
    },
    {
      id: 6,
      name: 'Franklin India Flexi Cap',
      category: 'Flexi Cap',
      nav: 123.45,
      returns1Y: 16.2,
      returns3Y: 18.7,
      returns5Y: 16.9,
      rating: 4,
      riskLevel: 'Moderate',
      minInvestment: 1000,
      expenseRatio: 2.0
    }
  ];
  
  const categories = ['All', 'Large Cap', 'Mid Cap', 'Small Cap', 'Hybrid', 'ELSS', 'Flexi Cap'];
  
  // Advanced utility functions
  const debounceSearch = useCallback(
    (searchValue: string) => {
      setIsLoading(true);
      setTimeout(() => {
        setSearchTerm(searchValue);
        setIsLoading(false);
        setAnimationKey(prev => prev + 1);
      }, 300);
    },
    []
  );
  
  const getAIRecommendations = useCallback(() => {
    return mutualFunds
      .filter(fund => {
        if (riskProfile === 'conservative') return fund.riskLevel === 'Low';
        if (riskProfile === 'moderate') return ['Low', 'Moderate'].includes(fund.riskLevel);
        if (riskProfile === 'aggressive') return ['Moderate', 'High', 'Very High'].includes(fund.riskLevel);
        return true;
      })
      .sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0))
      .slice(0, 3);
  }, [riskProfile]);
  
  const calculatePortfolioMetrics = useCallback((selectedFundIds: number[]) => {
    const selectedFunds = mutualFunds.filter(fund => selectedFundIds.includes(fund.id));
    if (selectedFunds.length === 0) return null;
    
    const avgReturns = selectedFunds.reduce((sum, fund) => sum + fund.returns1Y, 0) / selectedFunds.length;
    const avgExpenseRatio = selectedFunds.reduce((sum, fund) => sum + fund.expenseRatio, 0) / selectedFunds.length;
    const avgRating = selectedFunds.reduce((sum, fund) => sum + fund.rating, 0) / selectedFunds.length;
    
    return { avgReturns, avgExpenseRatio, avgRating };
  }, []);
  
  // Filter and sort funds
  const filteredFunds = useMemo(() => {
    let filtered = mutualFunds.filter(fund => {
      const matchesSearch = fund.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || fund.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    
    // Sort funds
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'returns':
          return b.returns1Y - a.returns1Y; // Sort by Historical Performance (1Y returns)
        case 'rating':
          return b.rating - a.rating; // Sort by FSI Rating
        case 'nav':
          return b.nav - a.nav; // Sort by NAV
        case 'name':
          return a.name.localeCompare(b.name); // Sort by Fund Name
        case 'expenseRatio':
          return a.expenseRatio - b.expenseRatio; // Sort by Expense Ratio (lower is better)
        case 'aum':
          return (b.aum || '').localeCompare(a.aum || ''); // Sort by AUM
        case 'risk':
          const riskOrder: Record<string, number> = { 'Low': 1, 'Moderate': 2, 'High': 3, 'Very High': 4 };
          return (riskOrder[a.riskLevel] || 0) - (riskOrder[b.riskLevel] || 0); // Sort by Risk Level
        default:
          return b.returns1Y - a.returns1Y; // Default to Historical Performance
      }
    });
    
    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400';
      case 'Moderate': return 'text-yellow-400';
      case 'High': return 'text-orange-400';
      case 'Very High': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900">
      {/* Use PayTMStyleNavigation component */}
      <PayTMStyleNavigation />
      
      {/* Main Content with proper navigation spacing */}
      <div className="pt-32 px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className="max-w-7xl mx-auto py-12">
          <div className="text-center mb-12">
            <div className="flex flex-col items-center justify-center mb-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 mt-2">
                🍺 Explore Mutual Funds
              </h1>
              <div className="flex items-center space-x-1 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
                <Brain className="w-5 h-5" />
                <span>AI Powered</span>
              </div>
            </div>
            <div className="flex justify-center">
              <p className="text-xl text-amber-400 max-w-3xl mb-8 text-center">
                Discover premium mutual funds with AI-powered insights, advanced analytics, and world-class investment strategies
              </p>
            </div>

          </div>
          
          {/* Ultra-Sexy Search and Filter Section - External Icon Design */}
          <div className="w-full flex justify-center mb-20 relative z-10">
            <div className="w-full max-w-6xl mx-auto">
              {/* Perfect Centering Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 place-items-center w-full">
                {/* Ultra-Sexy Search - External Icon Design */}
                <div className="relative group isolate w-full max-w-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 -z-10"></div>
                  
                  {/* External Icon Above Input */}
                  <div className="flex flex-col items-center space-y-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 group-hover:border-blue-400/60 transition-all duration-300 group-hover:scale-110">
                      <Search className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-all duration-300" />
                    </div>
                    
                    {/* Clean Input Without Internal Icons */}
                    <div className="relative z-20 w-full">
                      <input
                        type="text"
                        placeholder="Search funds by name, category, or manager..."
                        onChange={(e) => debounceSearch(e.target.value)}
                        className="w-full h-14 px-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700/50 focus:border-blue-500/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 shadow-xl hover:shadow-2xl focus:shadow-blue-500/25 text-base text-center"
                      />
                      
                      {/* Loading Spinner Above Input */}
                      {isLoading && (
                        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                          <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-400/30 border-t-blue-400"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                </div>
              
                {/* Ultra-Sexy Category Filter - External Icon Design */}
                <div className="relative group isolate w-full max-w-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 -z-10"></div>
                  
                  {/* External Icon Above Select */}
                  <div className="flex flex-col items-center space-y-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-400/30 group-hover:border-green-400/60 transition-all duration-300 group-hover:scale-110">
                      <Filter className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-all duration-300" />
                    </div>
                    
                    {/* Clean Select Without Internal Icons */}
                    <div className="relative z-20 w-full">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full h-14 px-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700/50 focus:border-green-500/50 rounded-2xl text-white focus:outline-none appearance-none cursor-pointer text-base text-center transition-all duration-300 shadow-xl hover:shadow-2xl focus:shadow-green-500/25"
                      >
                    <option value="All" className="bg-gray-900 text-white">All Categories</option>
                    <option value="Large Cap" className="bg-gray-900 text-white">Large Cap</option>
                    <option value="Mid Cap" className="bg-gray-900 text-white">Mid Cap</option>
                    <option value="Small Cap" className="bg-gray-900 text-white">Small Cap</option>
                    <option value="Hybrid" className="bg-gray-900 text-white">Hybrid</option>
                    <option value="ELSS" className="bg-gray-900 text-white">ELSS</option>
                    <option value="Flexi Cap" className="bg-gray-900 text-white">Flexi Cap</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                </div>
              
                {/* Ultra-Sexy Sort By - External Icon Design */}
                <div className="relative group isolate w-full max-w-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 -z-10"></div>
                  
                  {/* External Icon Above Select */}
                  <div className="flex flex-col items-center space-y-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 group-hover:border-purple-400/60 transition-all duration-300 group-hover:scale-110">
                      <BarChart3 className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-all duration-300" />
                    </div>
                    
                    {/* Clean Select Without Internal Icons */}
                    <div className="relative z-20 w-full">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full h-14 px-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700/50 focus:border-purple-500/50 rounded-2xl text-white focus:outline-none appearance-none cursor-pointer text-base text-center transition-all duration-300 shadow-xl hover:shadow-2xl focus:shadow-purple-500/25"
                      >
                    <option value="returns" className="bg-gray-900 text-white">Sort by Historical Performance</option>
                    <option value="rating" className="bg-gray-900 text-white">Sort by FSI Rating</option>
                    <option value="nav" className="bg-gray-900 text-white">Sort by NAV</option>
                    <option value="name" className="bg-gray-900 text-white">Sort by Fund Name</option>
                    <option value="expenseRatio" className="bg-gray-900 text-white">Sort by Expense Ratio</option>
                    <option value="aum" className="bg-gray-900 text-white">Sort by AUM</option>
                    <option value="risk" className="bg-gray-900 text-white">Sort by Risk Level</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                </div>
              
                {/* Ultra-Sexy Risk Level Filter - External Icon Design */}
                <div className="relative group isolate w-full max-w-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 -z-10"></div>
                  
                  {/* External Icon Above Select */}
                  <div className="flex flex-col items-center space-y-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-amber-500/20 to-red-500/20 backdrop-blur-sm border border-amber-400/30 group-hover:border-amber-400/60 transition-all duration-300 group-hover:scale-110">
                      <Shield className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-all duration-300" />
                    </div>
                    
                    {/* Clean Select Without Internal Icons */}
                    <div className="relative z-20 w-full">
                      <select
                        className="w-full h-14 px-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700/50 focus:border-amber-500/50 rounded-2xl text-white focus:outline-none appearance-none cursor-pointer text-base text-center transition-all duration-300 shadow-xl hover:shadow-2xl focus:shadow-amber-500/25"
                      >
                    <option value="" className="bg-gray-900 text-white">All Risk Levels</option>
                    <option value="Low" className="bg-gray-900 text-white">Low Risk</option>
                    <option value="Moderate" className="bg-gray-900 text-white">Moderate Risk</option>
                    <option value="High" className="bg-gray-900 text-white">High Risk</option>
                    <option value="Very High" className="bg-gray-900 text-white">Very High Risk</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Spacer to prevent overlapping */}
          <div className="h-32"></div>
          
          {/* Funds Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFunds.map(fund => (
              <div key={fund.id} className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/20 hover:border-blue-400/50 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 h-full" style={{ padding: '12px' }}>
                {/* Invisible Inner Card - Creates Perfect Content Boundary */}
                <div className="rounded-xl h-full">
                  <div style={{ padding: '12px' }} className="h-full flex flex-col">
                  {/* Enhanced Fund Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 pr-4">
                      <div className="mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors duration-300 leading-snug break-words">{fund.name}</h3>
                      {fund.trending && (
                        <div className="flex items-center space-x-1 bg-gradient-to-r from-green-400 to-blue-500 text-white px-2 py-1 rounded-full text-xs animate-pulse">
                          <TrendingUp className="w-3 h-3" />
                          <span>Trending</span>
                        </div>
                      )}
                      {fund.recommended && (
                        <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs">
                          <Award className="w-3 h-3" />
                          <span>AI Pick</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                        {fund.category}
                      </span>
                    </div>
                  </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">₹{fund.nav}</div>
                    <div className="text-sm text-gray-400">NAV</div>
                    {fund.aiScore && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Brain className="w-3 h-3 text-purple-400" />
                        <span className="text-xs text-purple-400">{fund.aiScore}% AI Score</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {renderStars(fund.rating)}
                  </div>
                  <span className="ml-2 text-sm text-gray-300">({fund.rating}/5)</span>
                </div>
                
                {/* Returns */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      {fund.returns1Y > 0 ? (
                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`text-sm font-semibold ml-1 ${
                        fund.returns1Y > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {fund.returns1Y}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">1Y</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      {fund.returns3Y > 0 ? (
                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`text-sm font-semibold ml-1 ${
                        fund.returns3Y > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {fund.returns3Y}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">3Y</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      {fund.returns5Y > 0 ? (
                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`text-sm font-semibold ml-1 ${
                        fund.returns5Y > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {fund.returns5Y}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">5Y</div>
                  </div>
                </div>
                
                {/* Fund Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Risk Level:</span>
                    <span className={`text-sm font-medium ${getRiskColor(fund.riskLevel)}`}>
                      {fund.riskLevel}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Min Investment:</span>
                    <span className="text-sm text-white">₹{fund.minInvestment}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Expense Ratio:</span>
                    <span className="text-sm text-white">{fund.expenseRatio}%</span>
                  </div>
                </div>
                
                {/* Flexible spacer to push buttons to bottom */}
                <div className="flex-1"></div>
                
                {/* Professional Action Buttons */}
                <div className="flex gap-4 mt-6">
                  {/* Invest Now - Clean Blue */}
                  <button 
                    onClick={() => handleInvestNow(fund.id, fund.name)}
                    className="group flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg hover:shadow-blue-500/25 border border-blue-500/20 hover:border-blue-400/50 transform hover:scale-105 cursor-pointer"
                  >
                    <span className="group-hover:underline underline-offset-2 decoration-2 decoration-blue-200">Invest Now</span>
                  </button>
                  
                  {/* FSI Analysis - Clean Gray */}
                  <button 
                    onClick={() => handleFSIAnalysis(fund.id, fund.name)}
                    className="group flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg hover:shadow-gray-500/25 border border-gray-500/20 hover:border-gray-400/50 transform hover:scale-105 cursor-pointer"
                  >
                    <BarChart3 className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <span className="group-hover:underline underline-offset-2 decoration-2 decoration-gray-200">FSI Analysis</span>
                  </button>
                </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* No Results */}
          {filteredFunds.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No funds found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MutualFundsPage;
