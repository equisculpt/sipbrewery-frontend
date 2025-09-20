"use client";

import React, { useState, useEffect } from 'react';
import { Shield, TrendingDown, AlertTriangle, Activity, Target, Zap, Eye } from 'lucide-react';
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';

export default function RiskPanel() {
  const [activeMetric, setActiveMetric] = useState('var');
  const [timeHorizon, setTimeHorizon] = useState('1M');

  // Institutional-grade risk metrics
  const riskMetrics = {
    var: { label: 'Value at Risk', value: '₹12,450', change: '-2.3%', status: 'improving' },
    cvar: { label: 'Conditional VaR', value: '₹18,750', change: '-1.8%', status: 'improving' },
    maxDrawdown: { label: 'Max Drawdown', value: '8.2%', change: '+0.5%', status: 'warning' },
    sharpe: { label: 'Sharpe Ratio', value: '1.84', change: '+0.12', status: 'excellent' },
    sortino: { label: 'Sortino Ratio', value: '2.31', change: '+0.18', status: 'excellent' },
    beta: { label: 'Portfolio Beta', value: '0.92', change: '-0.03', status: 'stable' },
    alpha: { label: 'Jensen Alpha', value: '3.2%', change: '+0.4%', status: 'excellent' },
    trackingError: { label: 'Tracking Error', value: '4.1%', change: '-0.2%', status: 'improving' }
  };

  // Factor exposure data
  const factorExposure = [
    { factor: 'Value', exposure: 0.23, benchmark: 0.15, active: 0.08 },
    { factor: 'Growth', exposure: 0.31, benchmark: 0.28, active: 0.03 },
    { factor: 'Quality', exposure: 0.28, benchmark: 0.22, active: 0.06 },
    { factor: 'Momentum', exposure: 0.19, benchmark: 0.25, active: -0.06 },
    { factor: 'Size', exposure: -0.12, benchmark: 0.05, active: -0.17 },
    { factor: 'Volatility', exposure: -0.08, benchmark: 0.02, active: -0.10 }
  ];

  // Risk decomposition by asset class
  const riskDecomposition = [
    { category: 'Large Cap Equity', allocation: 35, contribution: 42, marginalVar: 0.18 },
    { category: 'Mid Cap Equity', allocation: 25, contribution: 31, marginalVar: 0.24 },
    { category: 'Small Cap Equity', allocation: 15, contribution: 19, marginalVar: 0.32 },
    { category: 'International', allocation: 10, contribution: 6, marginalVar: 0.15 },
    { category: 'Debt Funds', allocation: 10, contribution: 1.5, marginalVar: 0.03 },
    { category: 'ELSS', allocation: 5, contribution: 0.5, marginalVar: 0.02 }
  ];

  // Stress test scenarios
  const stressScenarios = [
    { scenario: '2008 Crisis', portfolioImpact: -28.5, benchmarkImpact: -31.2, outperformance: 2.7 },
    { scenario: '2020 COVID', portfolioImpact: -19.8, benchmarkImpact: -23.1, outperformance: 3.3 },
    { scenario: 'Rate Hike Cycle', portfolioImpact: -12.3, benchmarkImpact: -14.7, outperformance: 2.4 },
    { scenario: 'Inflation Spike', portfolioImpact: -8.9, benchmarkImpact: -11.2, outperformance: 2.3 },
    { scenario: 'Geopolitical Crisis', portfolioImpact: -15.6, benchmarkImpact: -18.9, outperformance: 3.3 }
  ];

  // Rolling volatility data
  const rollingVolatility = [
    { date: 'Jan', portfolio: 14.2, benchmark: 16.8, market: 18.5 },
    { date: 'Feb', portfolio: 13.8, benchmark: 16.2, market: 17.9 },
    { date: 'Mar', portfolio: 15.1, benchmark: 17.5, market: 19.8 },
    { date: 'Apr', portfolio: 12.9, benchmark: 15.3, market: 17.2 },
    { date: 'May', portfolio: 11.8, benchmark: 14.7, market: 16.1 },
    { date: 'Jun', portfolio: 13.2, benchmark: 15.9, market: 17.8 },
    { date: 'Jul', portfolio: 12.5, benchmark: 15.1, market: 16.9 },
    { date: 'Aug', portfolio: 14.3, benchmark: 16.7, market: 18.4 },
    { date: 'Sep', portfolio: 13.7, benchmark: 16.1, market: 17.6 },
    { date: 'Oct', portfolio: 12.1, benchmark: 14.8, market: 16.3 },
    { date: 'Nov', portfolio: 11.9, benchmark: 14.5, market: 15.8 },
    { date: 'Dec', portfolio: 12.8, benchmark: 15.4, market: 16.7 }
  ];

  return (
    <div id="panel-risk" role="tabpanel" aria-labelledby="tab-risk" className="mb-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="p-3">
            <Shield className="w-6 h-6 text-red-400"/>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Risk Lens</h2>
            <p className="text-purple-200/90 text-sm">Institutional-grade risk analytics & factor decomposition</p>
          </div>
        </div>
        <div className="flex gap-2">
          {['1M', '3M', '6M', '1Y', '3Y'].map(period => (
            <button
              key={period}
              onClick={() => setTimeHorizon(period)}
              className={`px-3 py-1 rounded-lg text-xs transition-all ${
                timeHorizon === period 
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' 
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Key Risk Metrics Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {Object.entries(riskMetrics).map(([key, metric]) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.02, y: -2 }}
            className="p-4 cursor-pointer transition-all duration-300"
            onClick={() => setActiveMetric(key)}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${
                metric.status === 'excellent' ? 'bg-emerald-400' :
                metric.status === 'improving' ? 'bg-cyan-400' :
                metric.status === 'warning' ? 'bg-amber-400' : 'bg-gray-400'
              }`} />
              <div className="text-xs text-purple-200/80">{metric.label}</div>
            </div>
            <div className="text-xl font-bold text-white mb-1">{metric.value}</div>
            <div className={`text-xs flex items-center gap-1 ${
              metric.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {metric.change.startsWith('+') ? '↗' : '↘'} {metric.change}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Analytics Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Factor Exposure Analysis */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Factor Exposure Analysis</h3>
          </div>
          <div className="space-y-3">
            {factorExposure.map((factor, index) => (
              <div key={factor.factor} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-purple-200">{factor.factor}</span>
                  <div className="flex gap-4 text-xs">
                    <span className="text-white">Portfolio: {(factor.exposure * 100).toFixed(1)}%</span>
                    <span className="text-purple-300">Benchmark: {(factor.benchmark * 100).toFixed(1)}%</span>
                    <span className={`font-semibold ${
                      factor.active > 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      Active: {factor.active > 0 ? '+' : ''}{(factor.active * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.abs(factor.exposure) * 100}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                    className={`h-full rounded-full ${
                      factor.exposure > 0 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-gradient-to-r from-red-500 to-red-400'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Rolling Volatility Chart */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">Rolling Volatility (12M)</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rollingVolatility}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(15, 15, 25, 0.95)', 
                    border: '1px solid rgba(255,255,255,0.2)', 
                    borderRadius: 8,
                    color: '#ffffff'
                  }}
                />
                <Line type="monotone" dataKey="portfolio" stroke="#00FF87" strokeWidth={2} name="Portfolio" />
                <Line type="monotone" dataKey="benchmark" stroke="#4AE3F7" strokeWidth={2} name="Benchmark" />
                <Line type="monotone" dataKey="market" stroke="#A78BFA" strokeWidth={2} name="Market" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Risk Decomposition */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-violet-400" />
          <h3 className="text-lg font-semibold text-white">Risk Contribution by Asset Class</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riskDecomposition}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="category" stroke="#94a3b8" fontSize={11} angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(15, 15, 25, 0.95)', 
                  border: '1px solid rgba(255,255,255,0.2)', 
                  borderRadius: 8,
                  color: '#ffffff'
                }}
                formatter={(value, name) => [
                  name === 'allocation' ? `${value}%` : name === 'contribution' ? `${value}%` : `${value}`,
                  name === 'allocation' ? 'Allocation' : name === 'contribution' ? 'Risk Contribution' : 'Marginal VaR'
                ]}
              />
              <Bar dataKey="allocation" fill="#4AE3F7" opacity={0.7} name="allocation" />
              <Bar dataKey="contribution" fill="#00FF87" name="contribution" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Stress Test Results */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h3 className="text-lg font-semibold text-white">Stress Test Scenarios</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-purple-200 border-b border-white/10">
                <th className="text-left py-3 px-4">Scenario</th>
                <th className="text-right py-3 px-4">Portfolio Impact</th>
                <th className="text-right py-3 px-4">Benchmark Impact</th>
                <th className="text-right py-3 px-4">Outperformance</th>
              </tr>
            </thead>
            <tbody>
              {stressScenarios.map((scenario, index) => (
                <motion.tr 
                  key={scenario.scenario}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3 px-4 text-white font-medium">{scenario.scenario}</td>
                  <td className="py-3 px-4 text-right text-red-400 font-semibold">{scenario.portfolioImpact}%</td>
                  <td className="py-3 px-4 text-right text-red-300">{scenario.benchmarkImpact}%</td>
                  <td className="py-3 px-4 text-right text-emerald-400 font-semibold">+{scenario.outperformance}%</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
