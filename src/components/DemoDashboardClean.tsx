'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, Bell, Settings, LogOut, Search, TrendingUp, TrendingDown, DollarSign, PieChart,
  BarChart3, Activity, Shield, Plus, Eye, Download, Calendar, Target, Briefcase,
  ArrowUpRight, ArrowDownRight, CheckCircle, AlertTriangle, Clock, Filter
} from 'lucide-react';
import PayTMStyleNavigation from './PayTMStyleNavigation';

interface DemoDashboardProps {
  userType: 'individual' | 'institutional';
  onLogout: () => void;
}

const DemoDashboard: React.FC<DemoDashboardProps> = ({ userType, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [notifications] = useState(3);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiInsight, setAiInsight] = useState('');
  const [hoveredFund, setHoveredFund] = useState<string | null>(null);
  const [showDailyInsights, setShowDailyInsights] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [userProfile, setUserProfile] = useState('balanced'); // aggressive, balanced, conservative

  // Demo portfolio data
  const portfolioData = {
    totalValue: userType === 'institutional' ? 25000000 : 485000,
    totalInvestment: userType === 'institutional' ? 20000000 : 400000,
    totalGains: userType === 'institutional' ? 5000000 : 85000,
    gainsPercentage: 25.0,
    dayChange: userType === 'institutional' ? 125000 : 2500,
    dayChangePercentage: 0.52
  };

  const holdings = [
    {
      id: '1', name: 'Axis Bluechip Fund', scheme: 'Direct Growth', currentValue: 57089,
      investedValue: 50000, gains: 7089, gainsPercentage: 14.18, dayChange: 234,
      dayChangePercentage: 0.41, category: 'Large Cap', riskLevel: 'Medium', rating: 4
    },
    {
      id: '2', name: 'SBI Small Cap Fund', scheme: 'Direct Growth', currentValue: 69845,
      investedValue: 60000, gains: 9845, gainsPercentage: 16.41, dayChange: -456,
      dayChangePercentage: -0.65, category: 'Small Cap', riskLevel: 'High', rating: 5
    },
    {
      id: '3', name: 'HDFC Hybrid Equity Fund', scheme: 'Direct Growth', currentValue: 159234,
      investedValue: 150000, gains: 9234, gainsPercentage: 6.16, dayChange: 789,
      dayChangePercentage: 0.50, category: 'Hybrid', riskLevel: 'Medium', rating: 4
    }
  ];

  const sips = [
    {
      id: '1', fundName: 'Axis Bluechip Fund', amount: 5000, frequency: 'Monthly',
      nextDate: '2024-02-15', status: 'Active', totalInvested: 60000, currentValue: 68500, returns: 14.17
    },
    {
      id: '2', fundName: 'SBI Small Cap Fund', amount: 3000, frequency: 'Monthly',
      nextDate: '2024-02-20', status: 'Active', totalInvested: 36000, currentValue: 42300, returns: 17.50
    }
  ];

  // AI Assistant Logic
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // AI Insights Generation
  useEffect(() => {
    const generateAIInsight = () => {
      const insights = [
        `🎯 Your portfolio outperformed Nifty by 1.3% this week. Consider booking profits in Small Cap.`,
        `📈 Based on today's trend, we recommend investing ₹5K more in Large Cap funds.`,
        `🔄 Your SBI Small Cap Fund gained 32% this year. Time to rebalance?`,
        `💡 You gained ₹${portfolioData.dayChange.toLocaleString()} today. Should I analyze top gainers?`,
        `⚖️ Your portfolio is well-diversified. Consider adding ELSS for tax benefits.`
      ];
      
      const randomInsight = insights[Math.floor(Math.random() * insights.length)];
      setAiInsight(randomInsight);
    };

    if (!loading) {
      generateAIInsight();
      // Show AI assistant after 3 seconds
      const assistantTimer = setTimeout(() => {
        setShowAIAssistant(true);
      }, 3000);
      
      return () => clearTimeout(assistantTimer);
    }
  }, [loading, portfolioData.dayChange]);

  // Smart CTA recommendations based on performance
  const getSmartCTA = () => {
    if (portfolioData.gainsPercentage > 20) {
      return { text: '📈 Book Profits', desc: 'Your gains are strong - consider profit booking', color: 'green' };
    } else if (portfolioData.gainsPercentage > 10) {
      return { text: '🎯 Rebalance Portfolio', desc: 'Optimize your allocation for better returns', color: 'blue' };
    } else {
      return { text: '💰 Invest More', desc: 'Market conditions favor additional investment', color: 'purple' };
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(2)}K`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUpRight className="h-4 w-4" />;
    if (change < 0) return <ArrowDownRight className="h-4 w-4" />;
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Dashboard</h2>
          <p className="text-gray-400">Fetching your portfolio data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/50 to-purple-900/50">
      {/* Unified Navigation */}
      <PayTMStyleNavigation 
        isAuthenticated={true}
        onSignOut={onLogout}
        onSignIn={() => {}}
        onSignUp={() => {}}
      />
      
      {/* Add top padding to account for fixed navigation */}
      <div className="pt-20">

      {/* Navigation Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', name: 'Portfolio Overview', icon: PieChart },
              { id: 'holdings', name: 'Holdings', icon: Briefcase },
              { id: 'sips', name: 'SIPs', icon: Calendar },
              { id: 'analytics', name: 'Analytics', icon: BarChart3 },
              { id: 'risk', name: 'Risk Management', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Portfolio Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-900/50 rounded-lg">
                    <DollarSign className="h-6 w-6 text-blue-400" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">Total Portfolio Value</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(portfolioData.totalValue)}</p>
                  <div className={`flex items-center space-x-1 text-sm ${getChangeColor(portfolioData.dayChange)}`}>
                    {getChangeIcon(portfolioData.dayChange)}
                    <span>
                      {formatCurrency(Math.abs(portfolioData.dayChange))} ({portfolioData.dayChangePercentage.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-900/50 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">Total Gains</p>
                  <p className="text-2xl font-bold text-green-400">{formatCurrency(portfolioData.totalGains)}</p>
                  <div className="flex items-center space-x-1 text-sm text-green-400">
                    <ArrowUpRight className="h-4 w-4" />
                    <span>{portfolioData.gainsPercentage.toFixed(2)}% overall returns</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-900/50 rounded-lg">
                    <Target className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">Total Investment</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(portfolioData.totalInvestment)}</p>
                  <div className="flex items-center space-x-1 text-sm text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>Invested over time</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-orange-900/50 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-orange-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">Active Holdings</p>
                  <p className="text-2xl font-bold text-white">{holdings.length}</p>
                  <div className="flex items-center space-x-1 text-sm text-gray-400">
                    <Eye className="h-4 w-4" />
                    <span>Diversified portfolio</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Holdings Preview */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Top Holdings</h3>
                <button 
                  onClick={() => setActiveTab('holdings')}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  View All →
                </button>
              </div>
              <div className="space-y-4">
                {holdings.slice(0, 3).map((holding) => (
                  <div 
                    key={holding.id} 
                    className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all cursor-pointer group"
                    onMouseEnter={() => setHoveredFund(holding.id)}
                    onMouseLeave={() => setHoveredFund(null)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        {holding.name.split(' ')[0][0]}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-white font-medium">{holding.name}</p>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            holding.category === 'Large Cap' ? 'bg-green-900/50 text-green-400' :
                            holding.category === 'Small Cap' ? 'bg-red-900/50 text-red-400' :
                            'bg-blue-900/50 text-blue-400'
                          }`}>
                            {holding.category}
                          </span>
                          <div className="flex items-center space-x-1">
                            {[...Array(holding.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-xs">★</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">{holding.scheme}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{formatCurrency(holding.currentValue)}</p>
                      <div className="flex items-center space-x-2">
                        <p className={`text-sm ${getChangeColor(holding.gainsPercentage)}`}>
                          {holding.gainsPercentage > 0 ? '🔼' : '🔽'} {holding.gainsPercentage > 0 ? '+' : ''}{holding.gainsPercentage.toFixed(2)}%
                        </p>
                      </div>
                      <p className="text-xs text-gray-400">Today: {holding.dayChange > 0 ? '+' : ''}{formatCurrency(Math.abs(holding.dayChange))}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AI Assistant Popup */}
      {showAIAssistant && activeTab === 'overview' && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-2xl shadow-2xl max-w-sm relative">
            <button 
              onClick={() => setShowAIAssistant(false)}
              className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-gray-700 transition-colors"
            >
              ×
            </button>
            <div className="flex items-start space-x-3">
              <div className="bg-white/20 rounded-full p-2 flex-shrink-0">
                <span className="text-lg">🤖</span>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">ASI Portfolio Assistant</p>
                <p className="text-xs text-blue-100 mb-3">{aiInsight}</p>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setActiveTab('analytics')}
                    className="bg-white/20 hover:bg-white/30 text-xs px-3 py-1 rounded-lg transition-colors"
                  >
                    Analyze Now
                  </button>
                  <button 
                    onClick={() => setShowAIAssistant(false)}
                    className="text-xs text-blue-200 hover:text-white transition-colors"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      </div>
    </div>
  );
};

export default DemoDashboard;
