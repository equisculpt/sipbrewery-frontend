'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PieChart, BarChart3, TrendingUp, AlertTriangle, Info, Plus, Trash2, BookOpen, Shield, Star, Download, Settings, Search, Filter, DollarSign, Target, Lightbulb, Zap } from 'lucide-react';
import PayTMStyleNavigation from '@/components/PayTMStyleNavigation';

interface PortfolioHolding {
  name: string;
  value: number;
  percentage: number;
  category: string;
  rating: number;
  riskLevel: string;
}

interface PortfolioOptimization {
  objective: string;
  riskTolerance: string;
  currentPortfolio: {
    value: number;
    holdings: number;
    riskScore: number;
    expectedReturn: number;
    volatility: number;
  };
  optimizedPortfolio: {
    expectedReturn: number;
    volatility: number;
    sharpeRatio: number;
    riskScore: number;
    improvementScore: number;
  };
  recommendations: {
    action: string;
    asset: string;
    currentWeight: number;
    recommendedWeight: number;
    reason: string;
    impact: string;
  }[];
  assetAllocation: {
    current: Record<string, number>;
    optimized: Record<string, number>;
  };
  implementation: {
    priority: string;
    timeframe: string;
    steps: string[];
    estimatedCost: number;
    expectedBenefit: string;
  };
}

export default function PortfolioOptimizer() {
  const [portfolioHoldings, setPortfolioHoldings] = useState([
    { name: 'SBI Bluechip Fund', value: 500000, percentage: 40.0, category: 'Large Cap', rating: 4.2, riskLevel: 'Moderate' },
    { name: 'Axis Midcap Fund', value: 250000, percentage: 20.0, category: 'Mid Cap', rating: 3.8, riskLevel: 'High' },
    { name: 'HDFC Corporate Bond Fund', value: 300000, percentage: 24.0, category: 'Debt', rating: 4.5, riskLevel: 'Low' },
    { name: 'HDFC Gold ETF', value: 200000, percentage: 16.0, category: 'Gold', rating: 4.0, riskLevel: 'Moderate' }
  ]);
  const [fundSuggestions, setFundSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<number | null>(null);
  const [objective, setObjective] = useState('maximize_returns');
  const [riskTolerance, setRiskTolerance] = useState('Moderate');
  const [investmentHorizon, setInvestmentHorizon] = useState('Medium-term (3-7 years)');
  const [optimizationGoal, setOptimizationGoal] = useState('Balanced');
  const [optimization, setOptimization] = useState<PortfolioOptimization | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
      }
    };

    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);
    return () => window.removeEventListener('resize', updateNavHeight);
  }, []);

  const objectives = [
    { value: 'maximize_returns', label: 'Growth Oriented', description: 'Educational analysis for growth-focused portfolios' },
    { value: 'minimize_risk', label: 'Conservative', description: 'Educational analysis for capital preservation' },
    { value: 'balanced', label: 'Balanced', description: 'Educational analysis for balanced portfolios' },
    { value: 'income_focused', label: 'Income Oriented', description: 'Educational analysis for income generation' }
  ];

  const riskLevels = [
    { value: 'conservative', label: 'Conservative', description: 'Low risk, stable returns' },
    { value: 'moderate', label: 'Moderate', description: 'Balanced risk-return profile' },
    { value: 'aggressive', label: 'Aggressive', description: 'High risk, high return potential' }
  ];

  const optimizePortfolio = async () => {
    try {
      setLoading(true);
      setError(null);

      // Import FSI API
      const { fsiApi } = await import('../../../services/fsiApi');

      // Prepare optimization request
      const optimizationRequest = {
        currentPortfolio: {
          holdings: portfolioHoldings.map(holding => ({
            symbol: holding.name,
            allocation: holding.percentage,
            value: holding.value
          })),
          totalValue: portfolioHoldings.reduce((sum, holding) => sum + holding.value, 0)
        },
        objective,
        riskTolerance,
        timeHorizon: investmentHorizon,
        constraints: {
          maxSingleAllocation: 50,
          minDiversification: 5
        }
      };

      // Call backend API
      const result = await fsiApi.optimizePortfolio(optimizationRequest);
      setOptimization(result);
    } catch (error) {
      console.error('Portfolio optimization error:', error);
      setError(error instanceof Error ? error.message : 'Failed to optimize portfolio');
      
      // Generate mock optimization for development
      const mockOptimization: PortfolioOptimization = {
        objective,
        riskTolerance,
        currentPortfolio: {
          value: portfolioHoldings.reduce((sum, holding) => sum + holding.value, 0),
          holdings: portfolioHoldings.length,
          riskScore: 6.8,
          expectedReturn: 14.2,
          volatility: 16.5
        },
        optimizedPortfolio: {
          expectedReturn: 16.8,
          volatility: 15.2,
          sharpeRatio: 1.52,
          riskScore: 6.2,
          improvementScore: 8.7
        },
        recommendations: [
          {
            action: 'CONSIDER',
            asset: 'Large Cap Equity Funds',
            currentWeight: 50,
            recommendedWeight: 55,
            reason: 'Educational insight: Large cap funds may offer better risk-adjusted returns',
            impact: 'Potential impact analysis'
          },
          {
            action: 'REVIEW',
            asset: 'Small Cap Equity Funds',
            currentWeight: 10,
            recommendedWeight: 5,
            reason: 'Educational insight: Consider concentration risk in small cap allocation',
            impact: 'Risk analysis for reference'
          },
          {
            action: 'EXPLORE',
            asset: 'International Equity Funds',
            currentWeight: 0,
            recommendedWeight: 10,
            reason: 'Educational insight: International funds may provide geographic diversification',
            impact: 'Diversification analysis'
          }
        ],
        assetAllocation: {
          current: {
            equity: 80,
            debt: 15,
            gold: 5,
            international: 0
          },
          optimized: {
            equity: 70,
            debt: 15,
            gold: 5,
            international: 10
          }
        },
        implementation: {
          priority: 'EDUCATIONAL',
          timeframe: 'For reference only',
          steps: [
            'Review current allocation with your financial advisor',
            'Understand risk implications of any changes',
            'Consider your investment goals and time horizon',
            'Make informed decisions based on your research'
          ],
          estimatedCost: 0.35,
          expectedBenefit: 'Educational analysis - consult advisor for actual decisions'
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const updateHolding = (index: number, field: keyof PortfolioHolding, value: number) => {
    const newHoldings = [...portfolioHoldings];
    (newHoldings[index] as any)[field] = value;
    
    if (field === 'value') {
      const totalValue = newHoldings.reduce((sum, holding) => sum + holding.value, 0);
      newHoldings.forEach(holding => {
        holding.percentage = totalValue > 0 ? (holding.value / totalValue) * 100 : 0;
      });
    } else if (field === 'percentage') {
      const totalValue = newHoldings.reduce((sum, holding) => sum + holding.value, 0);
      if (totalValue > 0) {
        newHoldings[index].value = (value / 100) * totalValue;
      }
    }
    
    setPortfolioHoldings(newHoldings);
  };

  // Mock fund database - In production, this will come from backend API
  const fundDatabase = [
    { name: 'SBI Bluechip Fund', category: 'Large Cap', rating: 4.2, riskLevel: 'Moderate' },
    { name: 'HDFC Top 100 Fund', category: 'Large Cap', rating: 4.5, riskLevel: 'Moderate' },
    { name: 'ICICI Pru Bluechip Fund', category: 'Large Cap', rating: 4.3, riskLevel: 'Moderate' },
    { name: 'Axis Bluechip Fund', category: 'Large Cap', rating: 4.1, riskLevel: 'Moderate' },
    { name: 'Axis Midcap Fund', category: 'Mid Cap', rating: 3.8, riskLevel: 'High' },
    { name: 'HDFC Mid-Cap Opportunities Fund', category: 'Mid Cap', rating: 4.0, riskLevel: 'High' },
    { name: 'Kotak Emerging Equity Fund', category: 'Mid Cap', rating: 3.9, riskLevel: 'High' },
    { name: 'HDFC Small Cap Fund', category: 'Small Cap', rating: 3.7, riskLevel: 'Very High' },
    { name: 'SBI Small Cap Fund', category: 'Small Cap', rating: 3.6, riskLevel: 'Very High' },
    { name: 'HDFC Corporate Bond Fund', category: 'Debt', rating: 4.5, riskLevel: 'Low' },
    { name: 'ICICI Pru Corporate Bond Fund', category: 'Debt', rating: 4.3, riskLevel: 'Low' },
    { name: 'HDFC Tax Saver', category: 'ELSS', rating: 4.2, riskLevel: 'Moderate' },
    { name: 'Axis Long Term Equity Fund', category: 'ELSS', rating: 4.0, riskLevel: 'Moderate' },
    { name: 'HDFC Gold ETF', category: 'Gold', rating: 4.0, riskLevel: 'Moderate' },
    { name: 'Mirae Asset Large Cap Fund', category: 'Large Cap', rating: 4.4, riskLevel: 'Moderate' },
    { name: 'Parag Parikh Flexi Cap Fund', category: 'Multi Cap', rating: 4.6, riskLevel: 'Moderate' }
  ];

  const searchFunds = (query: string) => {
    if (!query || query.length < 2) return [];
    return fundDatabase
      .filter(fund => fund.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8); // Limit to 8 suggestions
  };

  const getFundDetails = (fundName: string) => {
    return fundDatabase.find(fund => fund.name === fundName);
  };

  const getActionColor = (action: string) => {
    switch (action.toUpperCase()) {
      case 'CONSIDER': return 'text-green-600 bg-green-100';
      case 'REVIEW': return 'text-orange-600 bg-orange-100';
      case 'EXPLORE': return 'text-blue-600 bg-blue-100';
      case 'MAINTAIN': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      <div ref={navRef}>
        <PayTMStyleNavigation />
      </div>
      <div 
        className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900"
        style={{ paddingTop: `${navHeight + 20}px` }}
      >
        {/* Ultra-Minimal Header */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <PieChart className="w-6 h-6 text-purple-400" />
              <h1 className="text-xl font-semibold text-white">Portfolio Optimizer</h1>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-purple-300">SEBI Compliant</span>
              <span className="text-purple-300">Inviora 4.8★</span>
              <button className="text-purple-300 hover:text-white transition-colors">Export</button>
            </div>
          </div>
          <p className="text-xs text-purple-400">SEBI Registered Distributor • Educational Analysis Only</p>
        </div>
        
        <div className="max-w-7xl mx-auto px-6">
          {/* Simple Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-medium text-white">Portfolio Holdings</h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search funds..."
                className="px-3 py-1 bg-transparent border-b border-purple-500 text-white placeholder-purple-400 focus:outline-none focus:border-purple-300 text-sm w-48"
              />
              <button
                onClick={() => {
                  const newHolding = { 
                    name: '', 
                    value: 0, 
                    percentage: 0, 
                    category: '', 
                    rating: 0, 
                    riskLevel: 'Moderate' 
                  };
                  setPortfolioHoldings([...portfolioHoldings, newHolding]);
                }}
                className="text-purple-300 hover:text-white text-sm transition-colors"
              >
                <Plus className="w-4 h-4 mr-1 inline" />Add Fund
              </button>
            </div>
          </div>
            
          {/* Simple Analytics */}
          <div className="grid grid-cols-4 gap-8 mb-8 text-center">
            <div>
              <div className="text-lg font-bold text-white">
                ₹{portfolioHoldings.reduce((sum, holding) => sum + holding.value, 0).toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-purple-300">Total Value</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">{portfolioHoldings.length}</div>
              <div className="text-xs text-purple-300">Holdings</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {portfolioHoldings.length > 0 ? (portfolioHoldings.reduce((sum, holding) => sum + holding.rating, 0) / portfolioHoldings.length).toFixed(1) : '0.0'}
              </div>
              <div className="text-xs text-purple-300">Inviora Score</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {portfolioHoldings.reduce((sum, holding) => sum + holding.percentage, 0).toFixed(1)}%
              </div>
              <div className="text-xs text-purple-300">Allocation</div>
            </div>
          </div>
          
          <div className="space-y-6 mb-12">
            {portfolioHoldings.map((holding, index) => (
              <div key={index} className="border-b border-purple-800/30 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 font-medium">{index + 1}.</span>
                    <span className="text-white font-medium">Fund {index + 1}</span>
                  </div>
                  {portfolioHoldings.length > 1 && (
                    <button
                      onClick={() => {
                        const newHoldings = portfolioHoldings.filter((_, i) => i !== index);
                        setPortfolioHoldings(newHoldings);
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <label className="block text-sm text-purple-300 mb-2">Fund Name</label>
                    <input
                      type="text"
                      value={holding.name}
                      onChange={(e) => {
                        const query = e.target.value;
                        const newHoldings = [...portfolioHoldings];
                        newHoldings[index].name = query;
                        
                        const fundDetails = getFundDetails(query);
                        if (fundDetails) {
                          newHoldings[index].category = fundDetails.category;
                          newHoldings[index].rating = fundDetails.rating;
                          newHoldings[index].riskLevel = fundDetails.riskLevel;
                        }
                        
                        setPortfolioHoldings(newHoldings);
                        
                        if (query.length > 2) {
                          const suggestions = [
                            'SBI Bluechip Fund',
                            'HDFC Top 100 Fund',
                            'ICICI Prudential Value Discovery Fund',
                            'Axis Long Term Equity Fund',
                            'Mirae Asset Large Cap Fund'
                          ].filter((fund: string) => fund.toLowerCase().includes(query.toLowerCase()))
                            .slice(0, 5);
                          setFundSuggestions(suggestions);
                          setShowSuggestions(index);
                        } else {
                          setShowSuggestions(null);
                        }
                      }}
                      onFocus={() => {
                        if (holding.name.length > 2) {
                          const suggestions = [
                            'SBI Bluechip Fund',
                            'HDFC Top 100 Fund',
                            'ICICI Prudential Value Discovery Fund',
                            'Axis Long Term Equity Fund',
                            'Mirae Asset Large Cap Fund'
                          ].filter((fund: string) => fund.toLowerCase().includes(holding.name.toLowerCase()))
                            .slice(0, 5);
                          setFundSuggestions(suggestions);
                          setShowSuggestions(index);
                        }
                      }}
                      onBlur={() => {
                        setTimeout(() => setShowSuggestions(null), 200);
                      }}
                      className="w-full px-3 py-2 bg-transparent border-b border-purple-500 text-white placeholder-purple-400 focus:outline-none focus:border-purple-300"
                      placeholder="Enter fund name..."
                    />
                    
                    {showSuggestions === index && fundSuggestions.length > 0 && (
                      <div className="mt-2 bg-gray-900/95 border border-purple-500/30 rounded max-h-40 overflow-y-auto">
                        {fundSuggestions.map((suggestion, suggestionIndex) => {
                          const fundDetails = getFundDetails(suggestion);
                          return (
                            <div
                              key={suggestionIndex}
                              onClick={() => {
                                const newHoldings = [...portfolioHoldings];
                                newHoldings[index].name = suggestion;
                                if (fundDetails) {
                                  newHoldings[index].category = fundDetails.category;
                                  newHoldings[index].rating = fundDetails.rating;
                                  newHoldings[index].riskLevel = fundDetails.riskLevel;
                                }
                                setPortfolioHoldings(newHoldings);
                                setShowSuggestions(null);
                              }}
                              className="px-3 py-2 hover:bg-purple-800/30 cursor-pointer text-sm text-white border-b border-purple-800/30 last:border-b-0"
                            >
                              {suggestion}
                              {fundDetails && (
                                <div className="text-xs text-purple-300 mt-1">
                                  {fundDetails.category} • {fundDetails.rating}★
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    {holding.category && (
                      <div className="mt-3 text-xs text-purple-300">
                        {holding.category} • Inviora Score: {holding.rating.toFixed(1)}★
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-purple-300 mb-2">Value (₹)</label>
                        <input
                          type="number"
                          value={holding.value || ''}
                          onChange={(e) => {
                            const newHoldings = [...portfolioHoldings];
                            newHoldings[index].value = parseFloat(e.target.value) || 0;
                            setPortfolioHoldings(newHoldings);
                          }}
                          className="w-full px-3 py-2 bg-transparent border-b border-purple-500 text-white placeholder-purple-400 focus:outline-none focus:border-purple-300"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-purple-300 mb-2">Allocation (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={holding.percentage || ''}
                          onChange={(e) => {
                            const newHoldings = [...portfolioHoldings];
                            newHoldings[index].percentage = parseFloat(e.target.value) || 0;
                            setPortfolioHoldings(newHoldings);
                          }}
                          className="w-full px-3 py-2 bg-transparent border-b border-purple-500 text-white placeholder-purple-400 focus:outline-none focus:border-purple-300"
                          placeholder="0.0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Simple Settings */}
          <div className="mb-12">
            <h3 className="text-lg font-medium text-white mb-6">Optimization Settings</h3>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <label className="block text-sm text-purple-300 mb-2">Risk Tolerance</label>
                <select
                  value={riskTolerance}
                  onChange={(e) => setRiskTolerance(e.target.value)}
                  className="w-full px-3 py-2 bg-transparent border-b border-purple-500 text-white focus:outline-none focus:border-purple-300"
                >
                  <option value="Conservative" className="bg-gray-800">Conservative</option>
                  <option value="Moderate" className="bg-gray-800">Moderate</option>
                  <option value="Aggressive" className="bg-gray-800">Aggressive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-purple-300 mb-2">Investment Horizon</label>
                <select
                  value={investmentHorizon}
                  onChange={(e) => setInvestmentHorizon(e.target.value)}
                  className="w-full px-3 py-2 bg-transparent border-b border-purple-500 text-white focus:outline-none focus:border-purple-300"
                >
                  <option value="Short-term (1-3 years)" className="bg-gray-800">Short-term (1-3 years)</option>
                  <option value="Medium-term (3-7 years)" className="bg-gray-800">Medium-term (3-7 years)</option>
                  <option value="Long-term (7+ years)" className="bg-gray-800">Long-term (7+ years)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-purple-300 mb-2">Optimization Goal</label>
                <select
                  value={optimizationGoal}
                  onChange={(e) => setOptimizationGoal(e.target.value)}
                  className="w-full px-3 py-2 bg-transparent border-b border-purple-500 text-white focus:outline-none focus:border-purple-300"
                >
                  <option value="Maximize Returns" className="bg-gray-800">Maximize Returns</option>
                  <option value="Minimize Risk" className="bg-gray-800">Minimize Risk</option>
                  <option value="Balanced" className="bg-gray-800">Balanced</option>
                </select>
              </div>
            </div>
          </div>

          {/* Simple Summary */}
          <div className="text-center mb-12">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-2xl font-bold text-white">₹{portfolioHoldings.reduce((sum, holding) => sum + holding.value, 0).toLocaleString('en-IN')}</div>
                <div className="text-xs text-purple-300">Total Invested</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{portfolioHoldings.reduce((sum, holding) => sum + holding.percentage, 0).toFixed(1)}%</div>
                <div className="text-xs text-purple-300">Allocated</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{(100 - portfolioHoldings.reduce((sum, holding) => sum + holding.percentage, 0)).toFixed(1)}%</div>
                <div className="text-xs text-purple-300">Available</div>
              </div>
            </div>
          </div>

          {/* Super Sexy Glassomorphic Optimize Button */}
          <div className="text-center mb-12">
            <div className="relative inline-block">
              {/* Glowing Background Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-emerald-500 rounded-2xl blur-lg opacity-60 animate-pulse"></div>
              
              {/* Main Button */}
              <button
                onClick={optimizePortfolio}
                disabled={loading || portfolioHoldings.length === 0}
                className="relative px-12 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-semibold text-lg shadow-2xl hover:bg-white/20 hover:border-white/30 hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Button Content */}
                <div className="relative flex items-center justify-center space-x-3">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                        Inviora is analyzing...
                      </span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                      <span className="bg-gradient-to-r from-purple-300 via-blue-300 to-emerald-300 bg-clip-text text-transparent">
                        Optimize Portfolio
                      </span>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                    </>
                  )}
                </div>
                
                {/* Inner Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              {/* Floating Particles Effect */}
              <div className="absolute -top-2 -left-2 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0s'}}></div>
              <div className="absolute -top-1 -right-3 w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute -bottom-2 -left-1 w-1 h-1 bg-emerald-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s'}}></div>
              <div className="absolute -bottom-1 -right-2 w-1 h-1 bg-pink-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '1.5s'}}></div>
            </div>
            
            {/* Subtitle */}
            <p className="mt-4 text-xs text-purple-300/70 font-medium">
              Powered by Inviora - Your Personal ASI Financial Advisor
            </p>
          </div>

          {error && (
            <div className="mb-8 bg-yellow-500/20 border border-yellow-400/50 text-yellow-200 px-4 py-3 rounded-lg backdrop-blur-sm">
              {error} {optimization && '(Showing demo optimization)'}
            </div>
          )}

          {/* Optimization Results */}
          {optimization && !loading && (
            <div className="space-y-8">
              {/* Educational Analysis Results */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-6 text-white">📊 Educational Analysis Results</h3>
                <div className="bg-white/10 rounded-lg p-3 mb-6 backdrop-blur-sm">
                  <p className="text-sm text-gray-300">
                    <Info className="w-4 h-4 inline mr-2" />
                    These are educational projections based on historical data. Past performance does not guarantee future results.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                    <div className="text-3xl font-bold mb-2 text-green-400">{optimization.optimizedPortfolio.expectedReturn.toFixed(1)}%</div>
                    <div className="text-sm text-gray-300">Projected Return*</div>
                    <div className="text-xs text-gray-400">vs {optimization.currentPortfolio.expectedReturn.toFixed(1)}% current</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                    <div className="text-3xl font-bold mb-2 text-blue-400">{optimization.optimizedPortfolio.volatility.toFixed(1)}%</div>
                    <div className="text-sm text-gray-300">Volatility</div>
                    <div className="text-xs text-gray-400">vs {optimization.currentPortfolio.volatility.toFixed(1)}% current</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                    <div className="text-3xl font-bold mb-2 text-purple-400">{optimization.optimizedPortfolio.sharpeRatio.toFixed(2)}</div>
                    <div className="text-sm text-gray-300">Sharpe Ratio</div>
                    <div className="text-xs text-gray-400">Risk-adjusted return</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                    <div className="text-3xl font-bold mb-2 text-yellow-400">{optimization.optimizedPortfolio.improvementScore.toFixed(1)}/10</div>
                    <div className="text-sm text-gray-300">Improvement Score</div>
                    <div className="text-xs text-gray-400">Overall enhancement</div>
                  </div>
                </div>
              </div>

              {/* Asset Allocation Comparison */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
                  <PieChart className="w-6 h-6 mr-2 text-blue-400" />
                  Asset Allocation Comparison
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Current Allocation */}
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-4">Current Allocation</h4>
                    <div className="space-y-3">
                      {Object.entries(optimization.assetAllocation.current).map(([asset, percentage]) => (
                        <div key={asset} className="flex justify-between items-center">
                          <span className="text-gray-300 capitalize">{asset.replace('_', ' ')}</span>
                          <div className="flex items-center">
                            <div className="w-32 bg-gray-600 rounded-full h-2 mr-3">
                              <div 
                                className="bg-blue-400 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="font-medium w-12 text-right text-white">{percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Optimized Allocation */}
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-4">Optimized Allocation</h4>
                    <div className="space-y-3">
                      {Object.entries(optimization.assetAllocation.optimized).map(([asset, percentage]) => (
                        <div key={asset} className="flex justify-between items-center">
                          <span className="text-gray-300 capitalize">{asset.replace('_', ' ')}</span>
                          <div className="flex items-center">
                            <div className="w-32 bg-gray-600 rounded-full h-2 mr-3">
                              <div 
                                className="bg-green-400 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="font-medium w-12 text-right text-white">{percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Educational Insights */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 mr-2 text-purple-400" />
                  Educational Insights & Analysis
                </h3>
                <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-lg p-3 mb-6 backdrop-blur-sm">
                  <p className="text-sm text-yellow-200">
                    <AlertTriangle className="w-4 h-4 inline mr-2" />
                    <strong>Educational Purpose Only:</strong> These insights are for learning and understanding portfolio concepts. 
                    Consult a SEBI registered Investment Advisor before making any investment decisions.
                  </p>
                </div>
                <div className="space-y-4">
                  {optimization.recommendations.map((rec, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium mr-3 ${getActionColor(rec.action)}`}>
                            {rec.action}
                          </span>
                          <h4 className="text-lg font-semibold text-white">{rec.asset}</h4>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-300">
                            {rec.currentWeight}% → {rec.recommendedWeight}%
                          </div>
                          <div className="text-xs text-green-400 font-medium">{rec.impact}</div>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">{rec.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

            {/* Educational Implementation Guide */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-green-600" />
                Educational Implementation Guide
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-800">
                  <Info className="w-4 h-4 inline mr-2" />
                  This is an educational guide only. Always consult with a qualified financial advisor before implementing any changes.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Action Steps</h4>
                  <div className="space-y-3">
                    {optimization.implementation.steps.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Implementation Details</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priority:</span>
                      <span className="px-2 py-1 rounded text-sm font-medium bg-blue-100 text-blue-800">
                        {optimization.implementation.priority}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Timeframe:</span>
                      <span className="font-medium">{optimization.implementation.timeframe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Cost:</span>
                      <span className="font-medium">{optimization.implementation.estimatedCost}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expected Benefit:</span>
                      <span className="font-medium text-green-600">{optimization.implementation.expectedBenefit}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Educational Resources */}
            <div className="text-center">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
                  Next Steps for Your Investment Journey
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">1. Consult an Advisor</h4>
                    <p className="text-blue-700">Discuss these insights with a SEBI registered Investment Advisor</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">2. Research Funds</h4>
                    <p className="text-green-700">Study fund factsheets and performance history</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">3. Make Informed Decisions</h4>
                    <p className="text-purple-700">Consider your goals, risk tolerance, and time horizon</p>
                  </div>
                </div>
              </div>
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg text-lg font-semibold">
                <BookOpen className="w-5 h-5 inline mr-2" />
                Explore Educational Resources
              </button>
            </div>
          </div>
        )}

          {loading && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-md mx-4">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto">
                      <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
                      <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-blue-500 animate-spin animation-delay-150"></div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Inviora is Working</h3>
                  <p className="text-gray-400 text-sm mb-4">Your personal ASI advisor is analyzing your portfolio and crafting personalized optimization insights...</p>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-75"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse animation-delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SEBI Compliance Footer */}
          <div className="bg-gray-800 text-white p-6 mt-8">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                SEBI Compliance & Risk Disclosure
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Mutual Fund Distributor</h4>
                  <p className="opacity-90">
                    SIP Brewery is a SEBI registered Mutual Fund Distributor (ARN: XXXXX). 
                    We distribute mutual fund products and provide educational content only.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Risk Disclosure</h4>
                  <p className="opacity-90">
                    Mutual Fund investments are subject to market risks. Past performance is not indicative of future results. 
                    Please read all scheme related documents carefully before investing.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-xs opacity-75">
                  This analysis tool is for educational purposes only and does not constitute investment advice. 
                  Please consult a SEBI registered Investment Advisor for personalized investment advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
