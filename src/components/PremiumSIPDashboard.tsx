'use client';

import React, { useState, useEffect } from 'react';
import {
  Target, Award, BarChart3, Activity, TrendingUp, PieChart, FileText, Brain, Plus, Settings,
  DollarSign, Calendar, AlertTriangle, CheckCircle, Clock, Zap, Shield, Globe,
  Search, Filter, Download, Upload, RefreshCw, Bell, User, HelpCircle,
  Smartphone, CreditCard, Wallet, TrendingDown, Eye, EyeOff, Star, Bookmark,
  ArrowUpRight, ArrowDownRight, Sparkles, Layers, Database, LineChart, Map,
  Briefcase, GraduationCap, Home, Car, Plane, Heart, Gift, Coffee
} from 'lucide-react';

// 🚀 PREMIUM $100M WORLD-CLASS ASI-POWERED INVESTMENT DASHBOARD 🚀
const PremiumSIPDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'portfolio', name: 'Portfolio', icon: PieChart },
    { id: 'sips', name: 'My SIPs', icon: Target },
    { id: 'goals', name: 'Goals', icon: Award },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'ai-advisor', name: 'AI Advisor', icon: Brain },
    { id: 'market', name: 'Market Intel', icon: Globe },
    { id: 'research', name: 'Research', icon: FileText },
    { id: 'tax', name: 'Tax Center', icon: Shield },
    { id: 'alerts', name: 'Smart Alerts', icon: Bell },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Premium Header */}
      <header className="relative backdrop-blur-xl bg-white/5 border-b border-white/10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                SIP Brewery Pro
              </h1>
              <p className="text-purple-200 text-sm font-medium">Advanced Investment Intelligence Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="text-xs text-purple-300 font-medium">{currentTime.toLocaleTimeString()}</div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                ₹27,50,000
              </div>
              <div className="text-sm text-purple-300 font-medium">Total Portfolio</div>
              <div className="text-xs text-green-400 font-semibold">+18.7% ↗</div>
            </div>
            
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
              <Plus className="w-5 h-5 inline mr-2" />
              New SIP
            </button>
          </div>
        </div>
      </header>

      {/* Premium Navigation */}
      <nav className="relative backdrop-blur-xl bg-white/5 border-b border-white/10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 rounded-t-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-white border-b-2 border-purple-400'
                      : 'text-purple-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-white/10 p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">24</div>
                <div className="text-purple-300 text-sm font-medium">Active SIPs</div>
                <div className="text-green-400 text-xs font-semibold mt-2">+12% this month</div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-xl border border-white/10 p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">₹45,000</div>
                <div className="text-blue-300 text-sm font-medium">Monthly SIP</div>
                <div className="text-green-400 text-xs font-semibold mt-2">+8% increase</div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600/20 to-green-600/20 backdrop-blur-xl border border-white/10 p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">22.4%</div>
                <div className="text-emerald-300 text-sm font-medium">XIRR Returns</div>
                <div className="text-green-400 text-xs font-semibold mt-2">Beating market</div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600/20 to-orange-600/20 backdrop-blur-xl border border-white/10 p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">₹18.5L</div>
                <div className="text-amber-300 text-sm font-medium">Total Invested</div>
                <div className="text-green-400 text-xs font-semibold mt-2">Goal: ₹50L by 2030</div>
              </div>
            </div>

            {/* Premium SIP Table */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Active SIPs</h3>
                  <div className="flex space-x-3">
                    <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                      <Search className="w-5 h-5 text-purple-300" />
                    </button>
                    <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                      <Filter className="w-5 h-5 text-purple-300" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase">Fund Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase">SIP Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase">Current Value</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase">Returns</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">AB</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">Axis Bluechip Fund</div>
                            <div className="text-purple-300 text-sm">Large Cap • Equity</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white font-medium">₹8,000</td>
                      <td className="px-6 py-4 text-white font-medium">₹1,24,580</td>
                      <td className="px-6 py-4">
                        <span className="text-green-400 font-semibold">+18.5%</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 transition-colors text-sm">
                            View
                          </button>
                          <button className="px-3 py-1 rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 transition-colors text-sm">
                            Modify
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Other Tabs */}
        {activeTab !== 'overview' && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              {tabs.find(t => t.id === activeTab)?.icon && 
                React.createElement(tabs.find(t => t.id === activeTab)!.icon, { className: "w-12 h-12 text-white" })
              }
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              {tabs.find(t => t.id === activeTab)?.name}
            </h2>
            <p className="text-purple-300 text-lg">Advanced features powered by world-class AI</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PremiumSIPDashboard;
