'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, TrendingDown, Star, DollarSign, Shield, Clock } from 'lucide-react';

interface Fund {
  id: string;
  name: string;
  category: string;
  nav: number;
  returns: {
    '1Y': number;
    '3Y': number;
    '5Y': number;
  };
  rating: number;
  riskLevel: string;
  minSIP: number;
  expenseRatio: number;
  aum: number;
  fundManager: string;
}

export default function ExploreFunds() {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('');
  const [sortBy, setSortBy] = useState('returns3Y');
  const [error, setError] = useState<string | null>(null);

  const categories = ['All', 'Large Cap', 'Mid Cap', 'Small Cap', 'Flexi Cap', 'ELSS', 'Hybrid'];
  const riskLevels = ['All', 'Low', 'Moderate', 'Moderate High', 'High'];

  useEffect(() => {
    fetchFunds();
  }, [selectedCategory, selectedRisk, sortBy]);

  const fetchFunds = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== 'All') params.append('category', selectedCategory);
      if (selectedRisk && selectedRisk !== 'All') params.append('riskLevel', selectedRisk);
      if (sortBy) params.append('sortBy', sortBy);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/funds/explore?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch funds');
      }

      const data = await response.json();
      setFunds(data.data.funds || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching funds:', err);
      setError('Failed to load funds. Please try again.');
      // Fallback demo data
      setFunds([
        {
          id: 'FUND001',
          name: 'SBI Bluechip Fund',
          category: 'Large Cap',
          nav: 58.45,
          returns: { '1Y': 12.5, '3Y': 15.2, '5Y': 14.8 },
          rating: 4.5,
          riskLevel: 'Moderate',
          minSIP: 500,
          expenseRatio: 0.68,
          aum: 25000,
          fundManager: 'Dinesh Ahuja'
        },
        {
          id: 'FUND002',
          name: 'HDFC Top 100 Fund',
          category: 'Large Cap',
          nav: 742.89,
          returns: { '1Y': 13.8, '3Y': 16.1, '5Y': 15.9 },
          rating: 5.0,
          riskLevel: 'Moderate',
          minSIP: 1000,
          expenseRatio: 0.52,
          aum: 18500,
          fundManager: 'Prashant Jain'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredFunds = funds.filter(fund =>
    fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fund.fundManager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'low': return 'text-green-500 bg-green-100';
      case 'moderate': return 'text-blue-500 bg-blue-100';
      case 'moderate high': return 'text-orange-500 bg-orange-100';
      case 'high': return 'text-red-500 bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">🔍 Explore Mutual Funds</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Discover the perfect mutual funds for your investment goals with our comprehensive fund explorer powered by ASI intelligence.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search funds or managers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category === 'All' ? '' : category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Risk Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
            >
              {riskLevels.map(risk => (
                <option key={risk} value={risk === 'All' ? '' : risk}>
                  {risk} Risk
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="returns3Y">3Y Returns</option>
              <option value="returns1Y">1Y Returns</option>
              <option value="rating">Rating</option>
              <option value="aum">AUM</option>
              <option value="expenseRatio">Expense Ratio</option>
            </select>
          </div>

          {error && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
              {error} (Showing demo data)
            </div>
          )}
        </div>

        {/* Fund Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFunds.map(fund => (
              <div key={fund.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                {/* Fund Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{fund.name}</h3>
                    <p className="text-sm text-gray-600">{fund.category}</p>
                  </div>
                  <div className="flex items-center">
                    {getRatingStars(fund.rating)}
                  </div>
                </div>

                {/* NAV and Risk */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">₹{fund.nav.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">NAV</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(fund.riskLevel)}`}>
                    {fund.riskLevel}
                  </span>
                </div>

                {/* Returns */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-green-600">{fund.returns['1Y']}%</p>
                    <p className="text-xs text-gray-600">1Y Return</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-green-600">{fund.returns['3Y']}%</p>
                    <p className="text-xs text-gray-600">3Y Return</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-green-600">{fund.returns['5Y']}%</p>
                    <p className="text-xs text-gray-600">5Y Return</p>
                  </div>
                </div>

                {/* Fund Details */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Min SIP:</span>
                    <span className="font-medium">₹{fund.minSIP}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Expense Ratio:</span>
                    <span className="font-medium">{fund.expenseRatio}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">AUM:</span>
                    <span className="font-medium">₹{fund.aum.toLocaleString()} Cr</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Fund Manager:</span>
                    <span className="font-medium">{fund.fundManager}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Start SIP
                  </button>
                  <button className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredFunds.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No funds found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
