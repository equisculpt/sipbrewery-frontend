'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Shield, Target, AlertTriangle, CheckCircle, BarChart3, PieChart, Activity } from 'lucide-react';

interface FundAnalysis {
  fundId: string;
  asiRating: number;
  confidence: number;
  recommendation: string;
  targetPrice: number;
  riskScore: number;
  analysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  quantitativeMetrics: {
    sharpeRatio: number;
    beta: number;
    standardDeviation: number;
    maxDrawdown: number;
  };
}

export default function FundAnalysis() {
  const [fundId, setFundId] = useState('');
  const [analysis, setAnalysis] = useState<FundAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeFund = async () => {
    if (!fundId.trim()) {
      setError('Please enter a fund ID');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/asi/fund-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fundId: fundId.trim(),
          analysisType: 'comprehensive'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze fund');
      }

      const data = await response.json();
      setAnalysis(data.data);
    } catch (err) {
      console.error('Error analyzing fund:', err);
      setError('Failed to analyze fund. Please try again.');
      // Fallback demo data
      setAnalysis({
        fundId: fundId.trim(),
        asiRating: 9.2,
        confidence: 94.5,
        recommendation: 'BUY',
        targetPrice: 65.50,
        riskScore: 6.8,
        analysis: {
          strengths: [
            'Consistent outperformance against benchmark',
            'Strong fund manager track record',
            'Diversified portfolio with quality stocks',
            'Low expense ratio compared to peers'
          ],
          weaknesses: [
            'High concentration in top 10 holdings',
            'Sector allocation skewed towards IT',
            'Recent underperformance in volatile markets'
          ],
          opportunities: [
            'Potential for value creation in current market cycle',
            'Favorable regulatory environment',
            'Growing retail investor participation'
          ],
          threats: [
            'Market volatility and economic uncertainty',
            'Regulatory changes in mutual fund industry',
            'Competition from passive funds'
          ]
        },
        quantitativeMetrics: {
          sharpeRatio: 1.45,
          beta: 0.95,
          standardDeviation: 15.2,
          maxDrawdown: -18.5
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation.toUpperCase()) {
      case 'BUY': return 'text-green-600 bg-green-100';
      case 'HOLD': return 'text-yellow-600 bg-yellow-100';
      case 'SELL': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (score: number) => {
    if (score <= 3) return 'text-green-600 bg-green-100';
    if (score <= 6) return 'text-yellow-600 bg-yellow-100';
    if (score <= 8) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">📈 ASI Fund Analysis</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Get comprehensive AI-powered analysis of mutual funds with our advanced ASI system. Deep insights, risk assessment, and investment recommendations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Analysis Input */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyze Fund</h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter Fund ID (e.g., FUND001, HDFC_TOP_100)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={fundId}
                onChange={(e) => setFundId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && analyzeFund()}
              />
            </div>
            <button
              onClick={analyzeFund}
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? 'Analyzing...' : 'Analyze Fund'}
            </button>
          </div>
          {error && (
            <div className="mt-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              {error} {analysis && '(Showing demo analysis)'}
            </div>
          )}
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-8">
            {/* ASI Rating Overview */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{analysis.asiRating}</div>
                  <div className="text-sm text-gray-600">ASI Rating</div>
                  <div className="text-xs text-gray-500">out of 10</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">{analysis.confidence}%</div>
                  <div className="text-sm text-gray-600">Confidence</div>
                  <div className="text-xs text-gray-500">Analysis accuracy</div>
                </div>
                <div className="text-center">
                  <span className={`inline-block px-4 py-2 rounded-full text-lg font-bold ${getRecommendationColor(analysis.recommendation)}`}>
                    {analysis.recommendation}
                  </span>
                  <div className="text-sm text-gray-600 mt-2">Recommendation</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">₹{analysis.targetPrice}</div>
                  <div className="text-sm text-gray-600">Target NAV</div>
                  <div className="text-xs text-gray-500">12 months</div>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-blue-600" />
                Risk Assessment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Overall Risk Score</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(analysis.riskScore)}`}>
                      {analysis.riskScore}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full"
                      style={{ width: `${(analysis.riskScore / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900">{analysis.quantitativeMetrics.beta}</div>
                    <div className="text-xs text-gray-600">Beta</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900">{analysis.quantitativeMetrics.sharpeRatio}</div>
                    <div className="text-xs text-gray-600">Sharpe Ratio</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantitative Metrics */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
                Quantitative Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{analysis.quantitativeMetrics.sharpeRatio}</div>
                  <div className="text-sm text-gray-600">Sharpe Ratio</div>
                  <div className="text-xs text-gray-500">Risk-adjusted return</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{analysis.quantitativeMetrics.beta}</div>
                  <div className="text-sm text-gray-600">Beta</div>
                  <div className="text-xs text-gray-500">Market sensitivity</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{analysis.quantitativeMetrics.standardDeviation}%</div>
                  <div className="text-sm text-gray-600">Volatility</div>
                  <div className="text-xs text-gray-500">Standard deviation</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{analysis.quantitativeMetrics.maxDrawdown}%</div>
                  <div className="text-sm text-gray-600">Max Drawdown</div>
                  <div className="text-xs text-gray-500">Worst decline</div>
                </div>
              </div>
            </div>

            {/* SWOT Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Strengths & Opportunities */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-2" />
                    Strengths
                  </h3>
                  <ul className="space-y-3">
                    {analysis.analysis.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
                    <Target className="w-6 h-6 mr-2" />
                    Opportunities
                  </h3>
                  <ul className="space-y-3">
                    {analysis.analysis.opportunities.map((opportunity, index) => (
                      <li key={index} className="flex items-start">
                        <Target className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{opportunity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Weaknesses & Threats */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-orange-600 mb-4 flex items-center">
                    <Activity className="w-6 h-6 mr-2" />
                    Weaknesses
                  </h3>
                  <ul className="space-y-3">
                    {analysis.analysis.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start">
                        <Activity className="w-5 h-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-2" />
                    Threats
                  </h3>
                  <ul className="space-y-3">
                    {analysis.analysis.threats.map((threat, index) => (
                      <li key={index} className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{threat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Recommendations */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">🎯 Investment Recommendation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{analysis.recommendation}</div>
                  <div className="text-sm opacity-90">Action</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">₹{analysis.targetPrice}</div>
                  <div className="text-sm opacity-90">Target NAV</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{analysis.confidence}%</div>
                  <div className="text-sm opacity-90">Confidence</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg">
                <p className="text-sm">
                  <strong>ASI Recommendation:</strong> Based on comprehensive analysis of quantitative metrics, 
                  market conditions, and fund fundamentals, this fund shows {analysis.recommendation.toLowerCase() === 'buy' ? 'strong potential for outperformance' : 
                  analysis.recommendation.toLowerCase() === 'hold' ? 'stable performance with moderate upside' : 'elevated risks that warrant caution'}.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Sample Fund IDs */}
        {!analysis && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample Fund IDs to Try:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['FUND001', 'FUND002', 'HDFC_TOP_100', 'SBI_BLUECHIP'].map(id => (
                <button
                  key={id}
                  onClick={() => setFundId(id)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
