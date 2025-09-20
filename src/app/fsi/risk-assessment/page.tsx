'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Shield, AlertTriangle, TrendingUp, BarChart3, Target, Activity, Zap, Award, Brain, Eye, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import PayTMStyleNavigation from '@/components/PayTMStyleNavigation';

interface RiskAssessment {
  overallRiskScore: number;
  riskCategory: string;
  portfolioValue: number;
  riskMetrics: {
    volatility: number;
    beta: number;
    maxDrawdown: number;
    valueAtRisk: number;
    sharpeRatio: number;
    sortino: number;
  };
  riskBreakdown: {
    marketRisk: number;
    creditRisk: number;
    liquidityRisk: number;
    concentrationRisk: number;
    currencyRisk: number;
  };
  stressTests: {
    scenario: string;
    impact: number;
    probability: string;
    description: string;
  }[];
  recommendations: {
    priority: string;
    action: string;
    rationale: string;
    expectedImpact: string;
  }[];
  hedgingStrategies: {
    strategy: string;
    cost: number;
    effectiveness: number;
    description: string;
  }[];
}

export default function RiskAssessment() {
  const [portfolioData, setPortfolioData] = useState({
    holdings: [
      { name: 'Large Cap Equity', value: 500000, riskWeight: 0.6 },
      { name: 'Mid Cap Equity', value: 200000, riskWeight: 0.8 },
      { name: 'Small Cap Equity', value: 100000, riskWeight: 1.0 },
      { name: 'Debt Funds', value: 150000, riskWeight: 0.3 },
      { name: 'International Equity', value: 50000, riskWeight: 0.9 }
    ],
    timeHorizon: '5_years',
    riskTolerance: 'moderate'
  });
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [navHeight, setNavHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeView, setActiveView] = useState('overview');
  const contentRef = useRef<HTMLDivElement>(null);

  // Dynamic navigation height detection
  useEffect(() => {
    const detectNavHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        const height = header.offsetHeight;
        setNavHeight(height);
        setIsVisible(true);
      }
    };

    detectNavHeight();
    window.addEventListener('resize', detectNavHeight);
    
    const timeout = setTimeout(() => {
      if (navHeight === 0) {
        setNavHeight(80);
        setIsVisible(true);
      }
    }, 100);

    return () => {
      window.removeEventListener('resize', detectNavHeight);
      clearTimeout(timeout);
    };
  }, [navHeight]);

  const timeHorizons = [
    { value: '1_year', label: '1 Year', description: 'Short-term investment' },
    { value: '3_years', label: '3 Years', description: 'Medium-term goals' },
    { value: '5_years', label: '5 Years', description: 'Long-term planning' },
    { value: '10_years', label: '10+ Years', description: 'Retirement planning' }
  ];

  const riskTolerances = [
    { value: 'conservative', label: 'Conservative', description: 'Capital preservation focus' },
    { value: 'moderate', label: 'Moderate', description: 'Balanced approach' },
    { value: 'aggressive', label: 'Aggressive', description: 'Growth-oriented' }
  ];

  const assessRisk = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/asi/risk-assessment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          portfolio: portfolioData.holdings,
          timeHorizon: portfolioData.timeHorizon,
          riskTolerance: portfolioData.riskTolerance,
          analysisType: 'comprehensive'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to assess portfolio risk');
      }

      const data = await response.json();
      setAssessment(data.data);
    } catch (err) {
      console.error('Error assessing risk:', err);
      setError('Failed to assess portfolio risk. Please try again.');
      // Fallback demo data
      const totalValue = portfolioData.holdings.reduce((sum, holding) => sum + holding.value, 0);
      const avgRiskWeight = portfolioData.holdings.reduce((sum, holding) => sum + (holding.value / totalValue) * holding.riskWeight, 0);
      
      setAssessment({
        overallRiskScore: Math.round(avgRiskWeight * 10 * 10) / 10,
        riskCategory: avgRiskWeight > 0.7 ? 'HIGH' : avgRiskWeight > 0.5 ? 'MODERATE' : 'LOW',
        portfolioValue: totalValue,
        riskMetrics: {
          volatility: 15.2 + (avgRiskWeight * 5),
          beta: 0.85 + (avgRiskWeight * 0.3),
          maxDrawdown: -18.5 - (avgRiskWeight * 8),
          valueAtRisk: -12.3 - (avgRiskWeight * 5),
          sharpeRatio: 1.45 - (avgRiskWeight * 0.2),
          sortino: 1.68 - (avgRiskWeight * 0.15)
        },
        riskBreakdown: {
          marketRisk: 35 + (avgRiskWeight * 15),
          creditRisk: 15 + (avgRiskWeight * 5),
          liquidityRisk: 10 + (avgRiskWeight * 8),
          concentrationRisk: 20 + (avgRiskWeight * 10),
          currencyRisk: 8 + (avgRiskWeight * 3)
        },
        stressTests: [
          {
            scenario: 'Market Crash (-30%)',
            impact: -25.8 - (avgRiskWeight * 8),
            probability: 'Low (5-10%)',
            description: 'Severe market downturn similar to 2008 crisis'
          },
          {
            scenario: 'Interest Rate Spike',
            impact: -12.5 - (avgRiskWeight * 4),
            probability: 'Medium (15-25%)',
            description: 'Sudden increase in interest rates by 200+ bps'
          },
          {
            scenario: 'Sector Rotation',
            impact: -8.2 - (avgRiskWeight * 3),
            probability: 'High (30-40%)',
            description: 'Major shift in sector preferences'
          }
        ],
        recommendations: [
          {
            priority: 'HIGH',
            action: 'Diversify across asset classes',
            rationale: 'Reduce concentration risk and improve risk-adjusted returns',
            expectedImpact: '-15% portfolio volatility'
          },
          {
            priority: 'MEDIUM',
            action: 'Add defensive assets',
            rationale: 'Provide downside protection during market stress',
            expectedImpact: '+0.2 Sharpe ratio improvement'
          },
          {
            priority: 'LOW',
            action: 'Consider hedging strategies',
            rationale: 'Protect against tail risks and extreme scenarios',
            expectedImpact: '-5% maximum drawdown'
          }
        ],
        hedgingStrategies: [
          {
            strategy: 'Put Options',
            cost: 2.5,
            effectiveness: 85,
            description: 'Direct downside protection for equity positions'
          },
          {
            strategy: 'Gold Allocation',
            cost: 0.8,
            effectiveness: 65,
            description: 'Inflation hedge and safe haven asset'
          },
          {
            strategy: 'Currency Hedge',
            cost: 1.2,
            effectiveness: 75,
            description: 'Reduce foreign exchange risk exposure'
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const updateHolding = (index: number, field: string, value: number) => {
    const newHoldings = [...portfolioData.holdings];
    newHoldings[index] = { ...newHoldings[index], [field]: value };
    setPortfolioData({ ...portfolioData, holdings: newHoldings });
  };

  const getRiskColor = (score: number) => {
    if (score >= 7) return 'text-red-600 bg-red-100';
    if (score >= 5) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getRiskCategoryColor = (category: string) => {
    switch (category) {
      case 'HIGH': return 'bg-red-500';
      case 'MODERATE': return 'bg-yellow-500';
      case 'LOW': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'text-red-600 bg-red-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      case 'LOW': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Advanced risk visualization data
  const riskEvolutionData = [
    { month: 'Jan', risk: 6.2, volatility: 14.5, sharpe: 1.3, var: -8.2 },
    { month: 'Feb', risk: 7.1, volatility: 16.2, sharpe: 1.1, var: -9.8 },
    { month: 'Mar', risk: 5.8, volatility: 13.1, sharpe: 1.5, var: -7.4 },
    { month: 'Apr', risk: 6.5, volatility: 15.3, sharpe: 1.2, var: -8.9 },
    { month: 'May', risk: 5.2, volatility: 12.8, sharpe: 1.6, var: -6.8 },
    { month: 'Jun', risk: 6.8, volatility: 15.9, sharpe: 1.0, var: -9.2 }
  ];

  const correlationMatrix = [
    { asset: 'Large Cap', largeCap: 1.0, midCap: 0.85, smallCap: 0.72, debt: -0.15, intl: 0.68 },
    { asset: 'Mid Cap', largeCap: 0.85, midCap: 1.0, smallCap: 0.89, debt: -0.08, intl: 0.71 },
    { asset: 'Small Cap', largeCap: 0.72, midCap: 0.89, smallCap: 1.0, debt: 0.02, intl: 0.65 },
    { asset: 'Debt', largeCap: -0.15, midCap: -0.08, smallCap: 0.02, debt: 1.0, intl: -0.12 },
    { asset: 'International', largeCap: 0.68, midCap: 0.71, smallCap: 0.65, debt: -0.12, intl: 1.0 }
  ];

  const riskContributionData = [
    { name: 'Equity Risk', value: 65, color: '#EF4444' },
    { name: 'Interest Rate', value: 18, color: '#F59E0B' },
    { name: 'Credit Risk', value: 8, color: '#EAB308' },
    { name: 'Liquidity Risk', value: 5, color: '#22C55E' },
    { name: 'Currency Risk', value: 4, color: '#3B82F6' }
  ];

  const scenarioAnalysis = [
    { scenario: 'Bull Market', probability: 25, impact: 15.2, color: '#10B981' },
    { scenario: 'Base Case', probability: 40, impact: 2.1, color: '#3B82F6' },
    { scenario: 'Bear Market', probability: 20, impact: -18.5, color: '#EF4444' },
    { scenario: 'Black Swan', probability: 15, impact: -35.8, color: '#7C2D12' }
  ];

  return (
    <>
      <PayTMStyleNavigation />
      
      {/* Dynamic Spacer */}
      <div 
        style={{ 
          height: `${navHeight + 20}px`,
          background: 'linear-gradient(180deg, rgba(15,17,23,0.95) 0%, transparent 100%)'
        }}
        className="w-full"
      />
      
      {/* Main Content */}
      <div 
        ref={contentRef}
        className={`min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-orange-900 pb-16 px-4 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}
        style={{ marginTop: '-20px' }}
      >
      <div className="max-w-7xl mx-auto">
        {/* Premium Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl">
              <Shield className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
              Advanced Risk Intelligence
            </h1>
          </div>
          <p className="text-xl text-gray-300 text-center leading-relaxed w-full mb-6">
            Institutional-grade portfolio risk assessment with quantum-level precision and real-time stress testing
          </p>
          
          {/* Live Risk Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-red-500/10 border border-red-400/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <div className="text-sm text-gray-300">LIVE</div>
              </div>
              <div className="text-2xl font-bold text-red-400">7.2/10</div>
              <div className="text-sm text-gray-300">Risk Score</div>
            </div>
            <div className="bg-orange-500/10 border border-orange-400/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <div className="text-sm text-gray-300">LIVE</div>
              </div>
              <div className="text-2xl font-bold text-orange-400">15.9%</div>
              <div className="text-sm text-gray-300">Volatility</div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-400/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-yellow-400">-9.2%</div>
              <div className="text-sm text-gray-300">Max VaR</div>
            </div>
            <div className="bg-green-500/10 border border-green-400/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-400">1.2</div>
              <div className="text-sm text-gray-300">Sharpe Ratio</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'analytics', label: 'Analytics', icon: Brain },
              { id: 'scenarios', label: 'Scenarios', icon: Zap },
              { id: 'hedging', label: 'Hedging', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeView === tab.id 
                    ? 'bg-red-500/20 text-red-300 border border-red-400/30' 
                    : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab Content */}
        {activeView === 'overview' && (
          <div className="space-y-6">
            {/* Portfolio Configuration */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-red-400" />
                Portfolio Configuration
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-4">Holdings</h3>
                  <div className="space-y-3">
                    {portfolioData.holdings.map((holding, index) => (
                      <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">{holding.name}</span>
                          <span className="text-white font-medium">₹{(holding.value / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Risk Weight</span>
                            <span className={`${holding.riskWeight > 0.7 ? 'text-red-400' : holding.riskWeight > 0.5 ? 'text-yellow-400' : 'text-green-400'}`}>
                              {(holding.riskWeight * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                            <div 
                              className={`h-1.5 rounded-full ${holding.riskWeight > 0.7 ? 'bg-red-400' : holding.riskWeight > 0.5 ? 'bg-yellow-400' : 'bg-green-400'}`}
                              style={{ width: `${holding.riskWeight * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-4">Time Horizon</h3>
                  <div className="space-y-2">
                    {timeHorizons.map((horizon) => (
                      <button
                        key={horizon.value}
                        onClick={() => setPortfolioData({...portfolioData, timeHorizon: horizon.value})}
                        className={`w-full p-3 text-left rounded-lg border transition-all ${
                          portfolioData.timeHorizon === horizon.value
                            ? 'bg-red-500/20 border-red-400/30 text-red-300'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <div className="font-medium">{horizon.label}</div>
                        <div className="text-sm opacity-70">{horizon.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-4">Risk Tolerance</h3>
                  <div className="space-y-2">
                    {riskTolerances.map((tolerance) => (
                      <button
                        key={tolerance.value}
                        onClick={() => setPortfolioData({...portfolioData, riskTolerance: tolerance.value})}
                        className={`w-full p-3 text-left rounded-lg border transition-all ${
                          portfolioData.riskTolerance === tolerance.value
                            ? 'bg-red-500/20 border-red-400/30 text-red-300'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <div className="font-medium">{tolerance.label}</div>
                        <div className="text-sm opacity-70">{tolerance.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={assessRisk}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing Risk...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Assess Portfolio Risk
                    </>
                  )}
                </button>
                <button className="px-6 py-3 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-all flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            {/* Risk Analysis Results */}
            {assessment && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-red-400" />
                    Risk Contribution
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={riskContributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {riskContributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(17, 24, 39, 0.95)', 
                            border: '1px solid rgba(75, 85, 99, 0.3)',
                            borderRadius: '8px',
                            color: '#F3F4F6'
                          }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 mt-4">
                    {riskContributionData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-gray-300 text-sm">{item.name}</span>
                        </div>
                        <span className="text-white font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-red-400" />
                    Scenario Analysis
                  </h3>
                  <div className="space-y-4">
                    {scenarioAnalysis.map((scenario, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-200 font-medium">{scenario.scenario}</span>
                          <span className="text-sm text-gray-400">{scenario.probability}% prob</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-500"
                              style={{ 
                                backgroundColor: scenario.color,
                                width: `${Math.abs(scenario.impact) * 2}%`
                              }}
                            />
                          </div>
                          <span 
                            className="font-bold text-sm"
                            style={{ color: scenario.color }}
                          >
                            {scenario.impact > 0 ? '+' : ''}{scenario.impact}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-400/20 rounded-xl p-4 mt-6">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-red-300">{error}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab Content */}
        {activeView === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-red-400" />
                Advanced Risk Analytics
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-3">Correlation Matrix</h4>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="grid grid-cols-6 gap-1 text-xs">
                      <div></div>
                      {['LC', 'MC', 'SC', 'Debt', 'Intl'].map(asset => (
                        <div key={asset} className="text-center text-gray-400 font-medium">{asset}</div>
                      ))}
                      {correlationMatrix.map((row, i) => (
                        <React.Fragment key={i}>
                          <div className="text-gray-400 font-medium text-right pr-2">{row.asset.split(' ')[0]}</div>
                          {Object.entries(row).slice(1).map(([key, value], j) => (
                            <div 
                              key={j}
                              className={`text-center p-1 rounded text-xs font-medium ${
                                Math.abs(value as number) > 0.7 
                                  ? 'bg-red-500/20 text-red-300' 
                                  : Math.abs(value as number) > 0.4 
                                    ? 'bg-yellow-500/20 text-yellow-300'
                                    : 'bg-green-500/20 text-green-300'
                              }`}
                            >
                              {(value as number).toFixed(2)}
                            </div>
                          ))}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-3">Risk Metrics</h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Value at Risk (95%)', value: '-9.2%', color: 'text-red-400' },
                      { label: 'Expected Shortfall', value: '-12.8%', color: 'text-red-400' },
                      { label: 'Maximum Drawdown', value: '-18.5%', color: 'text-orange-400' },
                      { label: 'Beta (vs Nifty)', value: '1.15', color: 'text-yellow-400' },
                      { label: 'Tracking Error', value: '4.2%', color: 'text-blue-400' },
                      { label: 'Information Ratio', value: '0.85', color: 'text-green-400' }
                    ].map((metric, index) => (
                      <div key={index} className="flex justify-between items-center bg-white/5 rounded-lg p-3">
                        <span className="text-gray-300">{metric.label}</span>
                        <span className={`font-bold ${metric.color}`}>{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scenarios Tab Content */}
        {activeView === 'scenarios' && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-red-400" />
                Stress Test Scenarios
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Market Crash', impact: '-35%', probability: '5%', color: 'bg-red-500' },
                  { name: 'Interest Rate Spike', impact: '-18%', probability: '15%', color: 'bg-orange-500' },
                  { name: 'Sector Rotation', impact: '-12%', probability: '25%', color: 'bg-yellow-500' },
                  { name: 'Currency Crisis', impact: '-8%', probability: '10%', color: 'bg-blue-500' }
                ].map((scenario, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className={`w-full h-2 ${scenario.color} rounded-full mb-3`} />
                    <h4 className="font-semibold text-white mb-2">{scenario.name}</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Impact</span>
                        <span className="text-red-400 font-medium">{scenario.impact}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Probability</span>
                        <span className="text-gray-300">{scenario.probability}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hedging Tab Content */}
        {activeView === 'hedging' && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-red-400" />
                Risk Management Strategies
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-3">Recommended Actions</h4>
                  <div className="space-y-3">
                    {[
                      { action: 'Reduce Small Cap Exposure', priority: 'HIGH', impact: 'Reduce portfolio risk by 15%' },
                      { action: 'Add Defensive Sectors', priority: 'MEDIUM', impact: 'Improve stability during downturns' },
                      { action: 'Increase Debt Allocation', priority: 'MEDIUM', impact: 'Lower overall volatility' },
                      { action: 'Consider Gold ETF', priority: 'LOW', impact: 'Hedge against inflation' }
                    ].map((item, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-white font-medium">{item.action}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.priority === 'HIGH' ? 'bg-red-500/20 text-red-300' :
                            item.priority === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-blue-500/20 text-blue-300'
                          }`}>
                            {item.priority}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{item.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-3">Hedging Instruments</h4>
                  <div className="space-y-3">
                    {[
                      { instrument: 'Nifty Put Options', cost: '₹2,500', protection: '15% downside' },
                      { instrument: 'VIX Call Options', cost: '₹1,800', protection: 'Volatility spike' },
                      { instrument: 'Gold ETF', cost: '₹25,000', protection: 'Market crash' },
                      { instrument: 'USD/INR Forward', cost: '₹500', protection: 'Currency risk' }
                    ].map((hedge, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">{hedge.instrument}</span>
                          <span className="text-green-400 font-medium">{hedge.cost}</span>
                        </div>
                        <p className="text-gray-400 text-sm">Protects against: {hedge.protection}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-400/20 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-red-300">{error}</span>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
