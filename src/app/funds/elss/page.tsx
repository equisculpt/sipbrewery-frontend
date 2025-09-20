'use client';

import React, { useState, useEffect } from 'react';
import { Shield, TrendingUp, Calculator, Star, Award, DollarSign, Clock, CheckCircle } from 'lucide-react';

interface ELSSFund {
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
  taxBenefit: string;
}

export default function ELSSFunds() {
  const [elssFunds, setElssFunds] = useState<ELSSFund[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('returns3Y');
  const [taxSavingAmount, setTaxSavingAmount] = useState(150000);

  useEffect(() => {
    fetchELSSFunds();
  }, [sortBy]);

  const fetchELSSFunds = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/funds/elss?sortBy=${sortBy}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch ELSS funds');
      }

      const data = await response.json();
      setElssFunds(data.data.elssFunds || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching ELSS funds:', err);
      setError('Failed to load ELSS funds. Please try again.');
      // Fallback demo data
      setElssFunds([
        {
          id: 'FUND004',
          name: 'Mirae Asset Tax Saver Fund',
          category: 'ELSS',
          nav: 28.34,
          returns: { '1Y': 14.2, '3Y': 17.5, '5Y': 16.8 },
          rating: 4.5,
          riskLevel: 'Moderate High',
          minSIP: 500,
          expenseRatio: 0.75,
          aum: 12000,
          fundManager: 'Neelesh Surana',
          taxBenefit: '80C deduction up to ₹1.5 lakh'
        },
        {
          id: 'FUND006',
          name: 'Axis Long Term Equity Fund',
          category: 'ELSS',
          nav: 156.78,
          returns: { '1Y': 15.5, '3Y': 18.2, '5Y': 17.1 },
          rating: 4.5,
          riskLevel: 'Moderate High',
          minSIP: 500,
          expenseRatio: 0.85,
          aum: 22000,
          fundManager: 'Jinesh Gopani',
          taxBenefit: '80C deduction up to ₹1.5 lakh'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const calculateTaxSaving = (amount: number) => {
    const taxRate = 0.30; // 30% tax rate
    return amount * taxRate;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">💵 Tax Saving ELSS Funds</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Save tax up to ₹46,800 annually while building wealth with Equity Linked Savings Scheme (ELSS) mutual funds. 
            3-year lock-in period with potential for higher returns.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tax Benefits Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">₹1.5L</div>
            <div className="text-sm text-gray-600">Max Investment</div>
            <div className="text-xs text-gray-500">Under Section 80C</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">₹46,800</div>
            <div className="text-sm text-gray-600">Max Tax Saving</div>
            <div className="text-xs text-gray-500">At 30% tax rate</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">3 Years</div>
            <div className="text-sm text-gray-600">Lock-in Period</div>
            <div className="text-xs text-gray-500">Shortest among 80C</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">17.2%</div>
            <div className="text-sm text-gray-600">Avg 3Y Returns</div>
            <div className="text-xs text-gray-500">Historical average</div>
          </div>
        </div>

        {/* Tax Calculator */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Calculator className="w-6 h-6 mr-2 text-green-600" />
            Tax Saving Calculator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Investment Amount
              </label>
              <input
                type="range"
                min="500"
                max="150000"
                step="500"
                value={taxSavingAmount}
                onChange={(e) => setTaxSavingAmount(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-lg font-bold text-blue-600 mt-2">
                ₹{taxSavingAmount.toLocaleString()}
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">₹{calculateTaxSaving(taxSavingAmount).toLocaleString()}</div>
              <div className="text-sm text-gray-600">Tax Saved (30% rate)</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">₹{Math.round(taxSavingAmount / 12).toLocaleString()}</div>
              <div className="text-sm text-gray-600">Monthly SIP Amount</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-gray-700 font-medium">Sort by:</span>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="returns3Y">3Y Returns</option>
              <option value="returns1Y">1Y Returns</option>
              <option value="rating">Rating</option>
              <option value="aum">AUM</option>
            </select>
          </div>
          {error && (
            <div className="mt-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              {error} (Showing demo data)
            </div>
          )}
        </div>

        {/* ELSS Benefits */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Why Choose ELSS?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Tax Benefits</h4>
              <p className="text-sm opacity-90">Save up to ₹46,800 in taxes under Section 80C</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Shortest Lock-in</h4>
              <p className="text-sm opacity-90">Only 3 years lock-in period among all 80C options</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Wealth Creation</h4>
              <p className="text-sm opacity-90">Potential for higher returns through equity investments</p>
            </div>
          </div>
        </div>

        {/* ELSS Funds List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {elssFunds.map(fund => (
              <div key={fund.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                {/* Fund Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{fund.name}</h3>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">{fund.category}</span>
                      <div className="flex items-center">
                        {getRatingStars(fund.rating)}
                        <span className="ml-1 text-sm text-gray-600">({fund.rating})</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                    Tax Saver
                  </div>
                </div>

                {/* NAV and Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">₹{fund.nav.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Current NAV</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{fund.returns['3Y']}%</div>
                    <div className="text-sm text-gray-600">3Y Returns</div>
                  </div>
                </div>

                {/* Returns Performance */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{fund.returns['1Y']}%</div>
                    <div className="text-xs text-gray-600">1Y Return</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{fund.returns['3Y']}%</div>
                    <div className="text-xs text-gray-600">3Y Return</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{fund.returns['5Y']}%</div>
                    <div className="text-xs text-gray-600">5Y Return</div>
                  </div>
                </div>

                {/* Fund Details */}
                <div className="border-t pt-4 space-y-2 mb-4">
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

                {/* Tax Benefits */}
                <div className="bg-green-50 p-3 rounded-lg mb-4">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">Tax Benefits</span>
                  </div>
                  <ul className="text-xs text-green-700 space-y-1">
                    <li>• Deduction up to ₹1.5 lakh under Section 80C</li>
                    <li>• 3-year mandatory lock-in period</li>
                    <li>• LTCG tax applicable after ₹1 lakh</li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Start Tax Saving SIP
                  </button>
                  <button className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tax Planning Tips */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Award className="w-6 h-6 mr-2 text-green-600" />
            ELSS Tax Planning Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Investment Strategy</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Start early in the financial year for better planning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Use SIP mode to benefit from rupee cost averaging</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Diversify across 2-3 ELSS funds for better risk management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Continue investing even after 3-year lock-in for wealth creation</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Tax Implications</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">No tax on gains up to ₹1 lakh per year (LTCG)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">10% tax on LTCG above ₹1 lakh (without indexation)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">No dividend distribution tax for investors</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Can claim deduction in the year of investment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
