'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Target, AlertTriangle, CheckCircle, Activity, DollarSign } from 'lucide-react';

interface StockAnalysis {
  symbol: string;
  stockInfo: {
    name: string;
    price: number;
    change: number;
    changePercent: number;
    marketCap: number;
    pe: number;
    pb: number;
    sector: string;
  };
  asiRating: number;
  confidence: number;
  recommendation: string;
  targetPrice: number;
  stopLoss: number;
  technicalAnalysis: {
    trend: string;
    support: number;
    resistance: number;
    rsi: number;
    macd: string;
  };
  fundamentalAnalysis: {
    valuation: string;
    financialHealth: string;
    ratios: {
      pe: number;
      pb: number;
      roe: number;
      roce: number;
    };
  };
  quantitativeScores: {
    momentum: number;
    quality: number;
    value: number;
    growth: number;
  };
  riskAssessment: {
    overallRisk: string;
    volatility: number;
    beta: number;
  };
}

export default function StockAnalysis() {
  const [symbol, setSymbol] = useState('');
  const [analysis, setAnalysis] = useState<StockAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeStock = async () => {
    if (!symbol.trim()) {
      setError('Please enter a stock symbol');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/asi/stock-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol: symbol.trim().toUpperCase(),
          analysisDepth: 'detailed'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze stock');
      }

      const data = await response.json();
      setAnalysis(data.data);
    } catch (err) {
      console.error('Error analyzing stock:', err);
      setError('Failed to analyze stock. Please try again.');
      // Fallback demo data
      setAnalysis({
        symbol: symbol.trim().toUpperCase(),
        stockInfo: {
          name: 'Sample Company Ltd',
          price: 2456.75,
          change: 23.45,
          changePercent: 0.96,
          marketCap: 1658000,
          pe: 24.5,
          pb: 1.8,
          sector: 'Technology'
        },
        asiRating: 8.7,
        confidence: 91.2,
        recommendation: 'HOLD',
        targetPrice: 2825.26,
        stopLoss: 2260.21,
        technicalAnalysis: {
          trend: 'Bullish',
          support: 2334.41,
          resistance: 2653.28,
          rsi: 58.2,
          macd: 'Positive crossover'
        },
        fundamentalAnalysis: {
          valuation: 'Fair valued',
          financialHealth: 'Strong',
          ratios: {
            pe: 24.5,
            pb: 1.8,
            roe: 18.5,
            roce: 22.1
          }
        },
        quantitativeScores: {
          momentum: 7.8,
          quality: 8.9,
          value: 6.5,
          growth: 8.2
        },
        riskAssessment: {
          overallRisk: 'Moderate',
          volatility: 18.5,
          beta: 1.12
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

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    if (score >= 4) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getTrendIcon = (trend: string) => {
    return trend.toLowerCase() === 'bullish' ? 
      <TrendingUp className="w-5 h-5 text-green-500" /> : 
      <TrendingDown className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">📉 ASI Stock Analysis</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Get comprehensive AI-powered analysis of individual stocks with technical, fundamental, 
            and quantitative insights powered by our advanced ASI system.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Analysis Input */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyze Stock</h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter Stock Symbol (e.g., RELIANCE, TCS, HDFCBANK)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && analyzeStock()}
              />
            </div>
            <button
              onClick={analyzeStock}
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? 'Analyzing...' : 'Analyze Stock'}
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
            {/* Stock Overview */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{analysis.stockInfo.name}</h2>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span className="text-lg font-medium">{analysis.symbol}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">{analysis.stockInfo.sector}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">₹{analysis.stockInfo.price.toFixed(2)}</div>
                  <div className={`flex items-center ${analysis.stockInfo.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {analysis.stockInfo.change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                    <span>₹{Math.abs(analysis.stockInfo.change).toFixed(2)} ({analysis.stockInfo.changePercent.toFixed(2)}%)</span>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">₹{(analysis.stockInfo.marketCap / 10000).toFixed(0)}K Cr</div>
                  <div className="text-xs text-gray-600">Market Cap</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{analysis.stockInfo.pe.toFixed(1)}</div>
                  <div className="text-xs text-gray-600">P/E Ratio</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{analysis.stockInfo.pb.toFixed(1)}</div>
                  <div className="text-xs text-gray-600">P/B Ratio</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{analysis.riskAssessment.beta.toFixed(2)}</div>
                  <div className="text-xs text-gray-600">Beta</div>
                </div>
              </div>
            </div>

            {/* ASI Rating & Recommendation */}
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
                  <div className="text-2xl font-bold text-purple-600 mb-2">₹{analysis.targetPrice.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Target Price</div>
                  <div className="text-xs text-gray-500">6-12 months</div>
                </div>
              </div>
            </div>

            {/* Technical Analysis */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
                Technical Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Trend</span>
                      <div className="flex items-center">
                        {getTrendIcon(analysis.technicalAnalysis.trend)}
                        <span className="ml-2 font-medium">{analysis.technicalAnalysis.trend}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Support</span>
                      <span className="font-medium text-green-600">₹{analysis.technicalAnalysis.support.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Resistance</span>
                      <span className="font-medium text-red-600">₹{analysis.technicalAnalysis.resistance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Stop Loss</span>
                      <span className="font-medium text-red-600">₹{analysis.stopLoss.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">RSI</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">{analysis.technicalAnalysis.rsi}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              analysis.technicalAnalysis.rsi > 70 ? 'bg-red-500' : 
                              analysis.technicalAnalysis.rsi < 30 ? 'bg-green-500' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${analysis.technicalAnalysis.rsi}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">MACD</span>
                      <span className="font-medium text-blue-600">{analysis.technicalAnalysis.macd}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Volatility</span>
                      <span className="font-medium">{analysis.riskAssessment.volatility}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Risk Level</span>
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        analysis.riskAssessment.overallRisk === 'Low' ? 'bg-green-100 text-green-800' :
                        analysis.riskAssessment.overallRisk === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {analysis.riskAssessment.overallRisk}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fundamental Analysis */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <PieChart className="w-6 h-6 mr-2 text-green-600" />
                Fundamental Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Financial Health</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valuation</span>
                      <span className="font-medium">{analysis.fundamentalAnalysis.valuation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Financial Health</span>
                      <span className="font-medium text-green-600">{analysis.fundamentalAnalysis.financialHealth}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Ratios</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{analysis.fundamentalAnalysis.ratios.roe}%</div>
                      <div className="text-xs text-gray-600">ROE</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{analysis.fundamentalAnalysis.ratios.roce}%</div>
                      <div className="text-xs text-gray-600">ROCE</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantitative Scores */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Activity className="w-6 h-6 mr-2 text-purple-600" />
                Quantitative Scores
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-bold mb-2 px-3 py-1 rounded-full ${getScoreColor(analysis.quantitativeScores.momentum)}`}>
                    {analysis.quantitativeScores.momentum}
                  </div>
                  <div className="text-sm text-gray-600">Momentum</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(analysis.quantitativeScores.momentum / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-bold mb-2 px-3 py-1 rounded-full ${getScoreColor(analysis.quantitativeScores.quality)}`}>
                    {analysis.quantitativeScores.quality}
                  </div>
                  <div className="text-sm text-gray-600">Quality</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(analysis.quantitativeScores.quality / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-bold mb-2 px-3 py-1 rounded-full ${getScoreColor(analysis.quantitativeScores.value)}`}>
                    {analysis.quantitativeScores.value}
                  </div>
                  <div className="text-sm text-gray-600">Value</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${(analysis.quantitativeScores.value / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-bold mb-2 px-3 py-1 rounded-full ${getScoreColor(analysis.quantitativeScores.growth)}`}>
                    {analysis.quantitativeScores.growth}
                  </div>
                  <div className="text-sm text-gray-600">Growth</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(analysis.quantitativeScores.growth / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Summary */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">🎯 Investment Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{analysis.recommendation}</div>
                  <div className="text-sm opacity-90">Action</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">₹{analysis.targetPrice.toFixed(0)}</div>
                  <div className="text-sm opacity-90">Target Price</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{((analysis.targetPrice - analysis.stockInfo.price) / analysis.stockInfo.price * 100).toFixed(1)}%</div>
                  <div className="text-sm opacity-90">Upside Potential</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg">
                <p className="text-sm">
                  <strong>ASI Analysis:</strong> Based on comprehensive technical and fundamental analysis, 
                  this stock shows {analysis.recommendation.toLowerCase() === 'buy' ? 'strong potential with favorable risk-reward ratio' : 
                  analysis.recommendation.toLowerCase() === 'hold' ? 'stable outlook with moderate upside potential' : 'elevated risks that warrant caution'}.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Sample Stock Symbols */}
        {!analysis && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Stock Symbols to Try:</h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'SBIN'].map(sym => (
                <button
                  key={sym}
                  onClick={() => setSymbol(sym)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
