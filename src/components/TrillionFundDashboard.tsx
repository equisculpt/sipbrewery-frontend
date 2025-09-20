'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, Bell, Settings, LogOut, Search, TrendingUp, TrendingDown, DollarSign, PieChart,
  BarChart3, Activity, Shield, Plus, Eye, Download, Calendar, Target, Briefcase,
  ArrowUpRight, ArrowDownRight, CheckCircle, AlertTriangle, Clock, Filter, Globe,
  Satellite, Brain, Zap, Award, Star, Layers, Database, Cpu, Network
} from 'lucide-react';
import SearchInput from './ui/SearchInput';

interface TrillionFundDashboardProps {
  onLogout: () => void;
}

const TrillionFundDashboard: React.FC<TrillionFundDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [notifications] = useState(7);

  // $1 Trillion Fund Portfolio Data
  const portfolioData = {
    totalAUM: 1000000000000,
    gainsPercentage: 5.26,
    dayChange: 2500000000,
    dayChangePercentage: 0.25,
    sharpeRatio: 1.85,
    maxDrawdown: -12.5
  };

  // Global Asset Allocation
  const globalAllocation = [
    { region: 'North America', allocation: 35.0, value: 350000000000, performance: 12.5, color: '#3B82F6' },
    { region: 'Europe', allocation: 25.0, value: 250000000000, performance: 8.7, color: '#10B981' },
    { region: 'Asia Pacific', allocation: 30.0, value: 300000000000, performance: 15.2, color: '#F59E0B' },
    { region: 'Emerging Markets', allocation: 10.0, value: 100000000000, performance: 18.9, color: '#EF4444' }
  ];

  // Alpha Strategies
  const alphaStrategies = [
    {
      id: '1',
      name: 'Satellite Intelligence Alpha',
      expectedAlpha: 3.2,
      capacity: 50000000000,
      informationRatio: 1.8,
      status: 'active',
      accuracy: 87.5
    },
    {
      id: '2',
      name: 'Alternative Data Fusion',
      expectedAlpha: 2.8,
      capacity: 30000000000,
      informationRatio: 1.6,
      status: 'active',
      accuracy: 82.3
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (value: number, compact = false) => {
    if (compact && value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">$1 Trillion Fund ASI</h2>
          <p className="text-gray-300">Initializing sovereign wealth fund capabilities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">$1T Fund Analysis Platform</h1>
                  <p className="text-sm text-gray-400">Institutional-Grade Stock & MF Analysis</p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center space-x-2 ml-8">
                <div className="flex items-center space-x-1 px-3 py-1 bg-green-500/20 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-medium">Live Data Active</span>
                </div>
                <div className="flex items-center space-x-1 px-3 py-1 bg-blue-500/20 rounded-full">
                  <Cpu className="w-3 h-3 text-blue-400" />
                  <span className="text-xs text-blue-400 font-medium">1000 AI Models</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-64">
                <SearchInput
                  placeholder="Search global markets..."
                  ariaLabel="Search global markets"
                  inputClassName="bg-slate-700 border border-slate-600 rounded-lg w-full"
                  debounceMs={300}
                />
              </div>
              
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-800/30 backdrop-blur-sm border-r border-slate-700 min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              {[
                { id: 'overview', label: 'Analysis Overview', icon: PieChart },
                { id: 'global', label: 'Global Markets', icon: Globe },
                { id: 'alpha', label: 'Stock Analysis', icon: Target },
                { id: 'infrastructure', label: 'Data Sources', icon: Database },
                { id: 'intelligence', label: 'Market Intelligence', icon: Brain },
                { id: 'risk', label: 'Risk Analysis', icon: Shield }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Analysis Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Stocks Analyzed</p>
                      <p className="text-2xl font-bold text-white mt-1">50K+</p>
                      <p className="text-green-400 text-sm mt-1 flex items-center">
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        Free Analysis
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Mutual Funds</p>
                      <p className="text-2xl font-bold text-white mt-1">2,500+</p>
                      <p className="text-green-400 text-sm mt-1 flex items-center">
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        All Categories
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <PieChart className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Analysis Accuracy</p>
                      <p className="text-2xl font-bold text-white mt-1">87.5%</p>
                      <p className="text-blue-400 text-sm mt-1">AI-Powered</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Brain className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Data Sources</p>
                      <p className="text-2xl font-bold text-white mt-1">5K+</p>
                      <p className="text-yellow-400 text-sm mt-1">Real-time</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Database className="w-6 h-6 text-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Analysis Platform Disclaimer */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Analysis Platform - Not a Broker</h4>
                    <p className="text-gray-300 text-sm">We provide free stock & mutual fund analysis. Investment decisions are yours. We don't execute trades.</p>
                  </div>
                </div>
              </div>

              {/* Global Market Analysis */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Global Market Analysis</h3>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View Analysis</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {globalAllocation.map((region, index) => (
                    <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-white">{region.region}</h4>
                        <span className="text-sm font-medium" style={{ color: region.color }}>
                          {region.allocation}%
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${region.allocation}%`, 
                              backgroundColor: region.color 
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Value:</span>
                          <span className="text-white">{formatCurrency(region.value, true)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Performance:</span>
                          <span className="text-green-400">+{region.performance}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'alpha' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Alternative Alpha Strategies</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400 font-medium">2 Active Strategies</span>
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">Add Strategy</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {alphaStrategies.map((strategy) => (
                  <div
                    key={strategy.id}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">{strategy.name}</h3>
                      </div>
                      <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                        {strategy.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-xs">Expected Alpha</p>
                        <p className="text-xl font-bold text-green-400">+{strategy.expectedAlpha}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Information Ratio</p>
                        <p className="text-xl font-bold text-blue-400">{strategy.informationRatio}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Capacity</p>
                        <p className="text-lg font-semibold text-white">{formatCurrency(strategy.capacity, true)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Accuracy</p>
                        <p className="text-lg font-semibold text-purple-400">{strategy.accuracy}%</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Satellite className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">AI-Powered Strategy</span>
                      </div>
                      <button className="flex items-center space-x-2 px-3 py-1 bg-blue-600/20 hover:bg-blue-600 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">Details</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'infrastructure' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Data Infrastructure</h2>
                <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400 font-medium">System Healthy</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Data Points/Sec</p>
                      <p className="text-2xl font-bold text-white mt-1">10M</p>
                      <p className="text-blue-400 text-sm mt-1">Real-time Processing</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Alt Data Sources</p>
                      <p className="text-2xl font-bold text-white mt-1">5K</p>
                      <p className="text-green-400 text-sm mt-1">Global Coverage</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Satellite className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">AI Models</p>
                      <p className="text-2xl font-bold text-white mt-1">1000</p>
                      <p className="text-purple-400 text-sm mt-1">Active Learning</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Brain className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">System Uptime</p>
                      <p className="text-2xl font-bold text-white mt-1">99.99%</p>
                      <p className="text-green-400 text-sm mt-1">Enterprise Grade</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TrillionFundDashboard;
