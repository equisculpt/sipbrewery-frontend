'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, TrendingUp, Star, Shield, DollarSign, ArrowUpRight, ArrowDownRight, Minus, BarChart3 } from 'lucide-react';
import PayTMStyleNavigation from '../../components/PayTMStyleNavigation';

const MutualFundsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('returns');
  
  // Sample mutual fund data
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
      expenseRatio: 1.8
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
          return b.returns1Y - a.returns1Y;
        case 'nav':
          return b.nav - a.nav;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Use PayTMStyleNavigation component */}
      <PayTMStyleNavigation />
      
      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              🍺 SIP Brewery Mutual Funds
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover premium mutual funds with AI-powered insights and advanced analytics
            </p>
          </div>
          
          {/* Search and Filter Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search funds..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-800">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Sort By */}
              <div className="relative">
                <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="returns" className="bg-gray-800">Sort by Returns</option>
                  <option value="nav" className="bg-gray-800">Sort by NAV</option>
                  <option value="rating" className="bg-gray-800">Sort by Rating</option>
                  <option value="name" className="bg-gray-800">Sort by Name</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Funds Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFunds.map(fund => (
              <div key={fund.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                {/* Fund Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{fund.name}</h3>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      {fund.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">₹{fund.nav}</div>
                    <div className="text-sm text-gray-400">NAV</div>
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
                
                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Invest Now
                  </button>
                  <button className="flex-1 bg-white/10 text-white py-2 px-4 rounded-lg font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center border border-white/20">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Details
                  </button>
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
