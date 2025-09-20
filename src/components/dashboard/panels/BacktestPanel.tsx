"use client";

import React, { useState } from 'react';
import { History, TrendingUp, TrendingDown, AlertTriangle, Target, BarChart3, PieChart } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, LineChart, Line, BarChart, Bar, Tooltip, Legend, ComposedChart, ReferenceLine } from 'recharts';

// Enhanced backtest data with regret analysis
const backtestData = [
  { date: '2020-01', portfolio: 100000, benchmark: 100000, regretBuyNow: 0, regretBuyLater: 0, drawdown: 0, volatility: 12.5 },
  { date: '2020-02', portfolio: 95000, benchmark: 92000, regretBuyNow: 3000, regretBuyLater: 0, drawdown: -5.0, volatility: 18.2 },
  { date: '2020-03', portfolio: 82000, benchmark: 78000, regretBuyNow: 4000, regretBuyLater: 0, drawdown: -18.0, volatility: 35.8 },
  { date: '2020-04', portfolio: 88000, benchmark: 85000, regretBuyNow: 3000, regretBuyLater: 0, drawdown: -12.0, volatility: 28.4 },
  { date: '2020-05', portfolio: 102000, benchmark: 98000, regretBuyNow: 0, regretBuyLater: 4000, drawdown: 2.0, volatility: 22.1 },
  { date: '2020-06', portfolio: 108000, benchmark: 103000, regretBuyNow: 0, regretBuyLater: 5000, drawdown: 8.0, volatility: 19.6 },
  { date: '2020-07', portfolio: 115000, benchmark: 109000, regretBuyNow: 0, regretBuyLater: 6000, drawdown: 15.0, volatility: 16.8 },
  { date: '2020-08', portfolio: 122000, benchmark: 116000, regretBuyNow: 0, regretBuyLater: 6000, drawdown: 22.0, volatility: 15.2 },
  { date: '2020-09', portfolio: 118000, benchmark: 114000, regretBuyNow: 0, regretBuyLater: 4000, drawdown: 18.0, volatility: 17.4 },
  { date: '2020-10', portfolio: 125000, benchmark: 119000, regretBuyNow: 0, regretBuyLater: 6000, drawdown: 25.0, volatility: 14.9 },
  { date: '2020-11', portfolio: 135000, benchmark: 128000, regretBuyNow: 0, regretBuyLater: 7000, drawdown: 35.0, volatility: 13.1 },
  { date: '2020-12', portfolio: 142000, benchmark: 134000, regretBuyNow: 0, regretBuyLater: 8000, drawdown: 42.0, volatility: 12.8 },
  { date: '2021-01', portfolio: 148000, benchmark: 139000, regretBuyNow: 0, regretBuyLater: 9000, drawdown: 48.0, volatility: 11.9 },
  { date: '2021-02', portfolio: 152000, benchmark: 143000, regretBuyNow: 0, regretBuyLater: 9000, drawdown: 52.0, volatility: 11.4 },
  { date: '2021-03', portfolio: 158000, benchmark: 148000, regretBuyNow: 0, regretBuyLater: 10000, drawdown: 58.0, volatility: 10.8 },
];

const performanceMetrics = {
  totalReturn: 58.0,
  annualizedReturn: 16.8,
  volatility: 15.2,
  sharpeRatio: 1.84,
  maxDrawdown: -18.0,
  calmarRatio: 0.93,
  winRate: 73.3,
  avgWin: 4.2,
  avgLoss: -2.8,
  profitFactor: 2.15,
  regretScore: 0.12,
  informationRatio: 1.25
};

const scenarioAnalysis = [
  { scenario: 'Bull Market', probability: 35, portfolioReturn: 28.5, benchmarkReturn: 22.1, regret: 0.08 },
  { scenario: 'Bear Market', probability: 20, portfolioReturn: -12.3, benchmarkReturn: -18.7, regret: 0.15 },
  { scenario: 'Sideways', probability: 30, portfolioReturn: 8.2, benchmarkReturn: 6.8, regret: 0.05 },
  { scenario: 'High Volatility', probability: 15, portfolioReturn: 15.8, benchmarkReturn: 12.4, regret: 0.22 }
];

const attributionData = [
  { factor: 'Asset Allocation', contribution: 4.2, benchmark: 2.8 },
  { factor: 'Security Selection', contribution: 2.8, benchmark: 0.0 },
  { factor: 'Market Timing', contribution: 1.4, benchmark: 0.0 },
  { factor: 'Currency Effect', contribution: -0.3, benchmark: -0.1 },
  { factor: 'Fees & Costs', contribution: -1.2, benchmark: -0.8 }
];

export default function BacktestPanel() {
  const [activeView, setActiveView] = useState<'performance' | 'regret' | 'attribution' | 'scenarios'>('performance');
  const [timeframe, setTimeframe] = useState<'1Y' | '3Y' | '5Y' | 'All'>('All');

  return (
    <div id="panel-backtest" role="tabpanel" aria-labelledby="tab-backtest" className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20">
            <History className="w-6 h-6 text-white"/>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Regret Backtest Engine
            </h2>
            <p className="text-purple-200/90 text-sm">Institutional-grade backtesting with regret minimization analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {['1Y', '3Y', '5Y', 'All'].map(period => (
            <button
              key={period}
              onClick={() => setTimeframe(period as any)}
              className={`px-3 py-2 rounded-xl text-sm transition-all ${
                timeframe === period
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white/10 text-purple-200 hover:bg-white/15'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Performance Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-emerald-300">Total Return</span>
          </div>
          <div className="text-xl font-bold text-emerald-400">{performanceMetrics.totalReturn}%</div>
          <div className="text-xs text-emerald-300/70">vs {(performanceMetrics.totalReturn - 8.2).toFixed(1)}% benchmark</div>
        </div>
        
        <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-cyan-300">Sharpe Ratio</span>
          </div>
          <div className="text-xl font-bold text-cyan-400">{performanceMetrics.sharpeRatio}</div>
          <div className="text-xs text-cyan-300/70">Risk-adjusted excellence</div>
        </div>
        
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-amber-300">Max Drawdown</span>
          </div>
          <div className="text-xl font-bold text-amber-400">{performanceMetrics.maxDrawdown}%</div>
          <div className="text-xs text-amber-300/70">Peak-to-trough loss</div>
        </div>
        
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-purple-300">Regret Score</span>
          </div>
          <div className="text-xl font-bold text-purple-400">{performanceMetrics.regretScore}</div>
          <div className="text-xs text-purple-300/70">Lower is better</div>
        </div>
        
        <div className="p-4 rounded-xl bg-gradient-to-br from-rose-500/10 to-rose-600/5 border border-rose-500/20">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-rose-400" />
            <span className="text-xs text-rose-300">Win Rate</span>
          </div>
          <div className="text-xl font-bold text-rose-400">{performanceMetrics.winRate}%</div>
          <div className="text-xs text-rose-300/70">Profitable periods</div>
        </div>
        
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-500/20">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="w-4 h-4 text-indigo-400" />
            <span className="text-xs text-indigo-300">Info Ratio</span>
          </div>
          <div className="text-xl font-bold text-indigo-400">{performanceMetrics.informationRatio}</div>
          <div className="text-xs text-indigo-300/70">Active return quality</div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-2 mb-6">
        {[
          { key: 'performance', label: 'Performance', icon: TrendingUp },
          { key: 'regret', label: 'Regret Analysis', icon: AlertTriangle },
          { key: 'attribution', label: 'Attribution', icon: BarChart3 },
          { key: 'scenarios', label: 'Scenarios', icon: Target }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveView(key as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
              activeView === key
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                : 'bg-white/10 text-purple-200 hover:bg-white/15'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Performance View */}
      {activeView === 'performance' && (
        <div className="space-y-6">
          <div className="h-80">
            <div className="text-white font-medium mb-3">Portfolio vs Benchmark Performance</div>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={backtestData}>
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.6)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 30, 50, 0.95)', 
                    border: '1px solid rgba(124, 58, 237, 0.3)',
                    borderRadius: '12px',
                    color: 'white'
                  }} 
                />
                <Legend />
                <Area type="monotone" dataKey="portfolio" stroke="#10B981" fill="rgba(16, 185, 129, 0.1)" name="Portfolio" />
                <Line type="monotone" dataKey="benchmark" stroke="#6366F1" strokeWidth={2} name="Benchmark" />
                <Bar dataKey="drawdown" fill="rgba(239, 68, 68, 0.3)" name="Drawdown %" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Regret Analysis View */}
      {activeView === 'regret' && (
        <div className="space-y-6">
          <div className="h-80">
            <div className="text-white font-medium mb-3">Regret Analysis: Buy Now vs Buy Later</div>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={backtestData}>
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.6)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 30, 50, 0.95)', 
                    border: '1px solid rgba(124, 58, 237, 0.3)',
                    borderRadius: '12px',
                    color: 'white'
                  }} 
                />
                <Legend />
                <Bar dataKey="regretBuyNow" fill="rgba(239, 68, 68, 0.6)" name="Regret (Buy Now)" />
                <Bar dataKey="regretBuyLater" fill="rgba(16, 185, 129, 0.6)" name="Regret (Buy Later)" />
                <ReferenceLine y={0} stroke="rgba(255,255,255,0.3)" strokeDasharray="5 5" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20">
              <div className="text-red-300 text-sm mb-2">Average Regret (Buy Now)</div>
              <div className="text-2xl font-bold text-red-400">₹2,450</div>
              <div className="text-xs text-red-300/70">When market goes down after purchase</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20">
              <div className="text-emerald-300 text-sm mb-2">Average Regret (Buy Later)</div>
              <div className="text-2xl font-bold text-emerald-400">₹6,200</div>
              <div className="text-xs text-emerald-300/70">When market goes up before purchase</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20">
              <div className="text-purple-300 text-sm mb-2">Regret Minimization Score</div>
              <div className="text-2xl font-bold text-purple-400">{performanceMetrics.regretScore}</div>
              <div className="text-xs text-purple-300/70">Optimal timing strategy effectiveness</div>
            </div>
          </div>
        </div>
      )}

      {/* Attribution Analysis View */}
      {activeView === 'attribution' && (
        <div className="space-y-6">
          <div className="h-80">
            <div className="text-white font-medium mb-3">Performance Attribution Analysis</div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attributionData} layout="horizontal">
                <XAxis type="number" stroke="rgba(255,255,255,0.6)" fontSize={12} />
                <YAxis type="category" dataKey="factor" stroke="rgba(255,255,255,0.6)" fontSize={12} width={120} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 30, 50, 0.95)', 
                    border: '1px solid rgba(124, 58, 237, 0.3)',
                    borderRadius: '12px',
                    color: 'white'
                  }} 
                />
                <Legend />
                <Bar dataKey="contribution" fill="#10B981" name="Portfolio Contribution %" />
                <Bar dataKey="benchmark" fill="#6366F1" name="Benchmark Contribution %" />
                <ReferenceLine x={0} stroke="rgba(255,255,255,0.3)" strokeDasharray="5 5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="text-white font-medium">Top Contributors</div>
              {attributionData.filter(d => d.contribution > 0).sort((a, b) => b.contribution - a.contribution).map(item => (
                <div key={item.factor} className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-emerald-300">{item.factor}</span>
                  <span className="text-emerald-400 font-semibold">+{item.contribution}%</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="text-white font-medium">Detractors</div>
              {attributionData.filter(d => d.contribution < 0).sort((a, b) => a.contribution - b.contribution).map(item => (
                <div key={item.factor} className="flex items-center justify-between p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <span className="text-red-300">{item.factor}</span>
                  <span className="text-red-400 font-semibold">{item.contribution}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scenario Analysis View */}
      {activeView === 'scenarios' && (
        <div className="space-y-6">
          <div className="h-80">
            <div className="text-white font-medium mb-3">Scenario Analysis & Stress Testing</div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scenarioAnalysis}>
                <XAxis dataKey="scenario" stroke="rgba(255,255,255,0.6)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 30, 50, 0.95)', 
                    border: '1px solid rgba(124, 58, 237, 0.3)',
                    borderRadius: '12px',
                    color: 'white'
                  }} 
                />
                <Legend />
                <Bar dataKey="portfolioReturn" fill="#10B981" name="Portfolio Return %" />
                <Bar dataKey="benchmarkReturn" fill="#6366F1" name="Benchmark Return %" />
                <ReferenceLine y={0} stroke="rgba(255,255,255,0.3)" strokeDasharray="5 5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {scenarioAnalysis.map(scenario => (
              <div key={scenario.scenario} className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-500/20">
                <div className="text-indigo-300 font-medium mb-2">{scenario.scenario}</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-200">Probability:</span>
                    <span className="text-white">{scenario.probability}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-200">Portfolio:</span>
                    <span className={`font-semibold ${
                      scenario.portfolioReturn >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {scenario.portfolioReturn >= 0 ? '+' : ''}{scenario.portfolioReturn}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-200">Benchmark:</span>
                    <span className={`font-semibold ${
                      scenario.benchmarkReturn >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {scenario.benchmarkReturn >= 0 ? '+' : ''}{scenario.benchmarkReturn}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-200">Regret:</span>
                    <span className="text-amber-400 font-semibold">{scenario.regret}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
        <div className="text-white font-medium mb-2">Institutional Insights</div>
        <div className="text-sm text-purple-200 leading-relaxed">
          This regret backtest engine uses advanced quantitative models to analyze timing decisions and minimize behavioral biases. 
          The regret score of <span className="text-purple-400 font-semibold">{performanceMetrics.regretScore}</span> indicates 
          excellent timing optimization with minimal opportunity cost from market timing decisions.
        </div>
      </div>
    </div>
  );
}
