'use client';

import React, { useState } from 'react';
import {
  Target, Award, BarChart3, Activity, TrendingUp, 
  PieChart, FileText, Brain, Plus, Settings
} from 'lucide-react';

// Clean, Simple SIP Dashboard - Maximum Information, Minimal Design
const CleanSIPDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Clean tab system
  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'sips', name: 'My SIPs', icon: Target },
    { id: 'portfolio', name: 'Portfolio', icon: PieChart },
    { id: 'reports', name: 'Reports', icon: FileText },
    { id: 'ai', name: 'AI Insights', icon: Brain }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Clean Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">SIP Brewery Dashboard</h1>
            <p className="text-slate-600 text-sm">Manage your investments efficiently</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">₹2,75,000</div>
              <div className="text-sm text-slate-600">Total Portfolio</div>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="w-4 h-4 inline mr-2" />
              New SIP
            </button>
          </div>
        </div>
      </header>

      {/* Clean Navigation Tabs */}
      <nav className="bg-white border-b border-slate-200 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics - Clean Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active SIPs</p>
                    <p className="text-3xl font-bold text-slate-900">12</p>
                  </div>
                  <Activity className="w-8 h-8 text-green-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Monthly SIP</p>
                    <p className="text-3xl font-bold text-slate-900">₹25,000</p>
                  </div>
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Returns (XIRR)</p>
                    <p className="text-3xl font-bold text-green-600">+18.7%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Invested</p>
                    <p className="text-3xl font-bold text-slate-900">₹1,80,000</p>
                  </div>
                  <Award className="w-8 h-8 text-amber-600" />
                </div>
              </div>
            </div>

            {/* SIP List - Maximum Information */}
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Active SIPs</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Fund Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">SIP Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Current Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Returns</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-slate-900">Axis Bluechip Fund</div>
                          <div className="text-sm text-slate-500">Large Cap • Equity</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">₹5,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">₹67,890</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-green-600">+14.2%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                        <button className="text-slate-600 hover:text-slate-900">Modify</button>
                      </td>
                    </tr>
                    
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-slate-900">ICICI Prudential Bluechip</div>
                          <div className="text-sm text-slate-500">Large Cap • Equity</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">₹3,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">₹53,240</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-green-600">+11.8%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                        <button className="text-slate-600 hover:text-slate-900">Modify</button>
                      </td>
                    </tr>

                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-slate-900">HDFC Top 100 Fund</div>
                          <div className="text-sm text-slate-500">Large Cap • Equity</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">₹7,500</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">₹89,650</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-green-600">+16.7%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                        <button className="text-slate-600 hover:text-slate-900">Modify</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Plus className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium text-slate-900">Start New SIP</div>
                        <div className="text-sm text-slate-600">Begin systematic investment</div>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Settings className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-slate-900">Optimize Portfolio</div>
                        <div className="text-sm text-slate-600">AI-powered recommendations</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">SIP executed - Axis Bluechip</div>
                      <div className="text-xs text-slate-500">₹5,000 • 2 days ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">Portfolio rebalanced</div>
                      <div className="text-xs text-slate-500">AI optimization • 5 days ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">New fund recommendation</div>
                      <div className="text-xs text-slate-500">Mid-cap opportunity • 1 week ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tab content would go here */}
        {activeTab !== 'overview' && (
          <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">{tabs.find(t => t.id === activeTab)?.name}</h2>
            <p className="text-slate-600">Content for this section is being developed.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CleanSIPDashboard;
