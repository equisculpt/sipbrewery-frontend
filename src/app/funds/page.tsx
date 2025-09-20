'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, TrendingUp, Star, ArrowUpDown, Grid, List, Zap, Award, Shield, Users, ChevronDown, X, Eye, Heart, ArrowRight, BarChart3, PieChart, Activity, Clock, CreditCard } from 'lucide-react';
import PayTMStyleNavigation from '../../components/PayTMStyleNavigation';
import { useRouter } from 'next/navigation';

const FundsDiscoveryPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRisk, setSelectedRisk] = useState('All');
  const [selectedReturns, setSelectedReturns] = useState('All');
  const [selectedAUM, setSelectedAUM] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock fund data - would come from API
  const allFunds = [
    {
      id: 'hdfc-top-100',
      name: 'HDFC Top 100 Fund',
      fullName: 'HDFC Top 100 Fund - Direct Growth',
      category: 'Large Cap',
      nav: 847.32,
      navChange: 2.45,
      navChangePercent: 0.29,
      aum: 45678,
      expenseRatio: 0.45,
      rating: 4.5,
      returns: { '1Y': 18.45, '3Y': 16.78, '5Y': 14.92 },
      riskLevel: 'Moderately High',
      minSipAmount: 500,
      minLumpsumAmount: 5000,
      fundManager: 'Rahul Baijal',
      trending: true,
      recommended: true
    },
    {
      id: 'axis-bluechip',
      name: 'Axis Bluechip Fund',
      fullName: 'Axis Bluechip Fund - Direct Growth',
      category: 'Large Cap',
      nav: 652.18,
      navChange: -1.23,
      navChangePercent: -0.19,
      aum: 32456,
      expenseRatio: 0.52,
      rating: 4.2,
      returns: { '1Y': 16.23, '3Y': 15.45, '5Y': 13.67 },
      riskLevel: 'Moderately High',
      minSipAmount: 500,
      minLumpsumAmount: 5000,
      fundManager: 'Shreyash Devalkar',
      trending: false,
      recommended: false
    },
    {
      id: 'mirae-emerging-bluechip',
      name: 'Mirae Asset Emerging Bluechip',
      fullName: 'Mirae Asset Emerging Bluechip Fund - Direct Growth',
      category: 'Large & Mid Cap',
      nav: 789.45,
      navChange: 3.67,
      navChangePercent: 0.47,
      aum: 28934,
      expenseRatio: 0.68,
      rating: 4.7,
      returns: { '1Y': 22.34, '3Y': 19.12, '5Y': 16.89 },
      riskLevel: 'High',
      minSipAmount: 1000,
      minLumpsumAmount: 5000,
      fundManager: 'Neelesh Surana',
      trending: true,
      recommended: true
    },
    {
      id: 'parag-parikh-flexi-cap',
      name: 'Parag Parikh Flexi Cap',
      fullName: 'Parag Parikh Flexi Cap Fund - Direct Growth',
      category: 'Flexi Cap',
      nav: 456.78,
      navChange: 1.89,
      navChangePercent: 0.42,
      aum: 18765,
      expenseRatio: 0.75,
      rating: 4.3,
      returns: { '1Y': 19.67, '3Y': 17.23, '5Y': 15.45 },
      riskLevel: 'High',
      minSipAmount: 500,
      minLumpsumAmount: 5000,
      fundManager: 'Rajeev Thakkar',
      trending: false,
      recommended: true
    }
  ];

  const categories = ['All', 'Large Cap', 'Mid Cap', 'Small Cap', 'Large & Mid Cap', 'Flexi Cap', 'Debt', 'Hybrid'];
  const riskLevels = ['All', 'Low', 'Moderately Low', 'Moderate', 'Moderately High', 'High', 'Very High'];
  const returnRanges = ['All', '0-10%', '10-15%', '15-20%', '20%+'];
  const aumRanges = ['All', '0-1000 Cr', '1000-5000 Cr', '5000-10000 Cr', '10000+ Cr'];
  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'returns-1y', label: '1Y Returns' },
    { value: 'returns-3y', label: '3Y Returns' },
    { value: 'rating', label: 'Rating' },
    { value: 'aum', label: 'AUM' },
    { value: 'expense-ratio', label: 'Expense Ratio' }
  ];

  // Filter and sort funds
  const filteredFunds = useMemo(() => {
    let filtered = allFunds.filter(fund => {
      const matchesSearch = fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           fund.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || fund.category === selectedCategory;
      const matchesRisk = selectedRisk === 'All' || fund.riskLevel === selectedRisk;
      
      let matchesReturns = true;
      if (selectedReturns !== 'All') {
        const returns1Y = fund.returns['1Y'];
        switch (selectedReturns) {
          case '0-10%': matchesReturns = returns1Y <= 10; break;
          case '10-15%': matchesReturns = returns1Y > 10 && returns1Y <= 15; break;
          case '15-20%': matchesReturns = returns1Y > 15 && returns1Y <= 20; break;
          case '20%+': matchesReturns = returns1Y > 20; break;
        }
      }
      
      let matchesAUM = true;
      if (selectedAUM !== 'All') {
        const aum = fund.aum;
        switch (selectedAUM) {
          case '0-1000 Cr': matchesAUM = aum <= 1000; break;
          case '1000-5000 Cr': matchesAUM = aum > 1000 && aum <= 5000; break;
          case '5000-10000 Cr': matchesAUM = aum > 5000 && aum <= 10000; break;
          case '10000+ Cr': matchesAUM = aum > 10000; break;
        }
      }
      
      return matchesSearch && matchesCategory && matchesRisk && matchesReturns && matchesAUM;
    });

    // Sort funds
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'returns-1y': return b.returns['1Y'] - a.returns['1Y'];
        case 'returns-3y': return b.returns['3Y'] - a.returns['3Y'];
        case 'rating': return b.rating - a.rating;
        case 'aum': return b.aum - a.aum;
        case 'expense-ratio': return a.expenseRatio - b.expenseRatio;
        case 'popularity':
        default:
          return (b.trending ? 1 : 0) + (b.recommended ? 1 : 0) - (a.trending ? 1 : 0) - (a.recommended ? 1 : 0);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedRisk, selectedReturns, selectedAUM, sortBy]);

  const toggleCompare = (fundId: string) => {
    setCompareList(prev => 
      prev.includes(fundId) 
        ? prev.filter(id => id !== fundId)
        : prev.length < 3 ? [...prev, fundId] : prev
    );
  };

  const toggleFavorite = (fundId: string) => {
    setFavorites(prev => 
      prev.includes(fundId) 
        ? prev.filter(id => id !== fundId)
        : [...prev, fundId]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedRisk('All');
    setSelectedReturns('All');
    setSelectedAUM('All');
    setSearchQuery('');
  };

  const activeFiltersCount = [selectedCategory, selectedRisk, selectedReturns, selectedAUM].filter(f => f !== 'All').length;

  const handleInvestNow = (fundId: string) => {
    router.push(`/investment/${fundId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-900">
      <PayTMStyleNavigation />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Discover Mutual Funds</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Find the perfect investment opportunities with AI-powered recommendations and advanced filtering
            </p>
          </div>

          {/* Search and Quick Actions */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search funds by name, category, or fund manager..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all"
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`relative px-6 py-4 rounded-2xl border-2 font-medium transition-all duration-300 flex items-center space-x-2 ${
                    showFilters || activeFiltersCount > 0
                      ? 'border-blue-400 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white'
                      : 'border-gray-600 bg-gray-800/30 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="px-6 py-4 rounded-2xl border-2 border-gray-600 bg-gray-800/30 text-gray-300 hover:border-gray-500 font-medium transition-all duration-300 flex items-center space-x-2"
                >
                  {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
                  <span>{viewMode === 'grid' ? 'List' : 'Grid'}</span>
                </button>

                {compareList.length > 0 && (
                  <button
                    onClick={() => router.push(`/funds/compare?ids=${compareList.join(',')}`)}
                    className="px-6 py-4 rounded-2xl border-2 border-emerald-400 bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-white font-medium transition-all duration-300 flex items-center space-x-2 animate-pulse"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Compare ({compareList.length})</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Fund Cards Grid */}
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredFunds.map((fund) => (
              <FundCard
                key={fund.id}
                fund={fund}
                viewMode={viewMode}
                isComparing={compareList.includes(fund.id)}
                isFavorite={favorites.includes(fund.id)}
                onToggleCompare={() => toggleCompare(fund.id)}
                onToggleFavorite={() => toggleFavorite(fund.id)}
                onInvestNow={() => handleInvestNow(fund.id)}
                onViewDetails={() => router.push(`/investment/${fund.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Fund Card Component
interface FundCardProps {
  fund: any;
  viewMode: string;
  isComparing: boolean;
  isFavorite: boolean;
  onToggleCompare: (fundId: string) => void;
  onToggleFavorite: (fundId: string) => void;
  onInvestNow: (fundId: string) => void;
  onViewDetails: (fundId: string) => void;
}

const FundCard = ({ fund, viewMode, isComparing, isFavorite, onToggleCompare, onToggleFavorite, onInvestNow, onViewDetails }: FundCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 transform hover:scale-[1.02] p-6 ${
        isHovered 
          ? 'border-blue-400 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 shadow-lg shadow-blue-500/20' 
          : 'border-gray-700 bg-white/5 backdrop-blur-md hover:border-gray-600'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fund Info */}
      <div className="space-y-4 mt-12">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
              {fund.name}
            </h3>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(fund.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
              ))}
            </div>
          </div>
          
          <p className="text-gray-400 text-sm mb-3">{fund.category}</p>
          
          {/* NAV and Change */}
          <div className="flex items-baseline space-x-3 mb-4">
            <span className="text-2xl font-bold text-white">₹{fund.nav.toFixed(2)}</span>
            <span className={`text-sm font-medium ${fund.navChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {fund.navChange >= 0 ? '+' : ''}{fund.navChange.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-1">1Y Returns</p>
            <p className={`text-lg font-bold ${fund.returns['1Y'] >= 15 ? 'text-green-400' : 'text-yellow-400'}`}>
              {fund.returns['1Y'].toFixed(1)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-1">3Y Returns</p>
            <p className={`text-lg font-bold ${fund.returns['3Y'] >= 12 ? 'text-green-400' : 'text-yellow-400'}`}>
              {fund.returns['3Y'].toFixed(1)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-1">AUM</p>
            <p className="text-lg font-bold text-white">₹{(fund.aum / 1000).toFixed(1)}K Cr</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={() => router.push(`/fsi-analysis/${fund.id}`)}
            className="py-3 px-4 border-2 border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>Details</span>
          </button>
          
          <button
            onClick={() => onInvestNow(fund.id)}
            className="relative overflow-hidden py-3 px-4 rounded-xl border-2 border-blue-400 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold transition-all duration-500 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <ArrowRight className="w-4 h-4" />
            <span>Invest</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundsDiscoveryPage;
