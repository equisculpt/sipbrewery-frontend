'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Star, Award, Target, ArrowRight } from 'lucide-react';

interface TopSIP {
  id: string;
  fundId: string;
  name: string;
  category: string;
  sipAmount: number;
  returns: {
    '1Y': number;
    '3Y': number;
    '5Y': number;
  };
  rating: number;
  popularity: number;
  investors: number;
  totalSIPValue: number;
}

export default function TopSIPs() {
  const [topSIPs, setTopSIPs] = useState<TopSIP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState('all');

  const sipAmountRanges = [
    { value: 'all', label: 'All SIP Amounts' },
    { value: '1000', label: '₹1,000 - ₹2,999' },
    { value: '3000', label: '₹3,000 - ₹4,999' },
    { value: '5000', label: '₹5,000+' }
  ];

  useEffect(() => {
    fetchTopSIPs();
  }, []);

  const fetchTopSIPs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/funds/top-sips?limit=10`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch top SIPs');
      }

      const data = await response.json();
      setTopSIPs(data.data.topSIPs || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching top SIPs:', err);
      setError('Failed to load top SIPs. Please try again.');
      // Fallback demo data
      setTopSIPs([
        {
          id: 'SIP001',
          fundId: 'FUND002',
          name: 'HDFC Top 100 Fund',
          category: 'Large Cap',
          sipAmount: 5000,
          returns: { '1Y': 13.8, '3Y': 16.1, '5Y': 15.9 },
          rating: 5.0,
          popularity: 95,
          investors: 125000,
          totalSIPValue: 2500000000
        },
        {
          id: 'SIP002',
          fundId: 'FUND005',
          name: 'Parag Parikh Flexi Cap Fund',
          category: 'Flexi Cap',
          sipAmount: 3000,
          returns: { '1Y': 16.8, '3Y': 19.2, '5Y': 18.5 },
          rating: 5.0,
          popularity: 92,
          investors: 98000,
          totalSIPValue: 1800000000
        },
        {
          id: 'SIP003',
          fundId: 'FUND001',
          name: 'SBI Bluechip Fund',
          category: 'Large Cap',
          sipAmount: 2000,
          returns: { '1Y': 12.5, '3Y': 15.2, '5Y': 14.8 },
          rating: 4.5,
          popularity: 88,
          investors: 156000,
          totalSIPValue: 3200000000
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredSIPs = topSIPs.filter(sip => {
    if (selectedAmount === 'all') return true;
    const amount = parseInt(selectedAmount);
    if (amount === 1000) return sip.sipAmount >= 1000 && sip.sipAmount < 3000;
    if (amount === 3000) return sip.sipAmount >= 3000 && sip.sipAmount < 5000;
    if (amount === 5000) return sip.sipAmount >= 5000;
    return true;
  });

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const formatNumber = (num: number) => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">🏆 Top SIP Funds</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Discover the most popular SIP funds chosen by thousands of investors. Start your systematic investment journey with proven performers.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">₹7,500Cr</div>
            <div className="text-sm text-gray-600">Total SIP Value</div>
            <div className="text-xs text-gray-500">Across all funds</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">3.8L+</div>
            <div className="text-sm text-gray-600">Active Investors</div>
            <div className="text-xs text-gray-500">Growing daily</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">15.8%</div>
            <div className="text-sm text-gray-600">Avg 3Y Returns</div>
            <div className="text-xs text-gray-500">Annualized</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">4.8★</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
            <div className="text-xs text-gray-500">Out of 5</div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-gray-700 font-medium">Filter by SIP Amount:</span>
            {sipAmountRanges.map(range => (
              <button
                key={range.value}
                onClick={() => setSelectedAmount(range.value)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedAmount === range.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          {error && (
            <div className="mt-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              {error} (Showing demo data)
            </div>
          )}
        </div>

        {/* Top SIPs List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredSIPs.map((sip, index) => (
              <div key={sip.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    {/* Rank Badge */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    
                    {/* Fund Info */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{sip.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{sip.category}</span>
                        <div className="flex items-center">
                          {getRatingStars(sip.rating)}
                          <span className="ml-1">({sip.rating})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Popularity Score */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{sip.popularity}%</div>
                    <div className="text-sm text-gray-600">Popularity</div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">₹{sip.sipAmount.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Popular SIP</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{sip.returns['3Y']}%</div>
                    <div className="text-xs text-gray-600">3Y Returns</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{formatNumber(sip.investors)}</div>
                    <div className="text-xs text-gray-600">Investors</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">₹{formatNumber(sip.totalSIPValue)}</div>
                    <div className="text-xs text-gray-600">Total SIP Value</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-600">{sip.returns['1Y']}%</div>
                    <div className="text-xs text-gray-600">1Y Returns</div>
                  </div>
                </div>

                {/* Returns Chart */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Performance Track Record</div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="h-2 bg-gray-200 rounded-full mb-1">
                        <div 
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: `${Math.min((sip.returns['1Y'] / 20) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-sm font-medium text-green-600">{sip.returns['1Y']}%</div>
                      <div className="text-xs text-gray-500">1 Year</div>
                    </div>
                    <div className="text-center">
                      <div className="h-2 bg-gray-200 rounded-full mb-1">
                        <div 
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${Math.min((sip.returns['3Y'] / 20) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-sm font-medium text-blue-600">{sip.returns['3Y']}%</div>
                      <div className="text-xs text-gray-500">3 Years</div>
                    </div>
                    <div className="text-center">
                      <div className="h-2 bg-gray-200 rounded-full mb-1">
                        <div 
                          className="h-2 bg-purple-500 rounded-full"
                          style={{ width: `${Math.min((sip.returns['5Y'] / 20) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-sm font-medium text-purple-600">{sip.returns['5Y']}%</div>
                      <div className="text-xs text-gray-500">5 Years</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Start SIP ₹{sip.sipAmount.toLocaleString()}
                  </button>
                  <button className="flex-1 border border-blue-600 text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center justify-center">
                    <Target className="w-4 h-4 mr-2" />
                    View Analysis
                  </button>
                  <button className="px-4 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Popular Badge */}
                {index < 3 && (
                  <div className="absolute top-4 right-4">
                    <div className={`px-2 py-1 rounded-full text-xs font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                    }`}>
                      {index === 0 ? '🥇 #1 Choice' : index === 1 ? '🥈 Runner Up' : '🥉 Top 3'}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {filteredSIPs.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Award className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No SIPs found</h3>
            <p className="text-gray-500">Try adjusting your filter criteria.</p>
          </div>
        )}

        {/* SIP Benefits */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Why Choose SIP?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Rupee Cost Averaging</h4>
              <p className="text-sm opacity-90">Reduce impact of market volatility through systematic investing</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Disciplined Investing</h4>
              <p className="text-sm opacity-90">Build wealth systematically with automated investments</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Goal Achievement</h4>
              <p className="text-sm opacity-90">Reach your financial goals with consistent investments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
