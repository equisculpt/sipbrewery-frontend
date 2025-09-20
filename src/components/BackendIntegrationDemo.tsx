/**
 * 🔗 BACKEND INTEGRATION DEMONSTRATION
 * 
 * Comprehensive demo of frontend-backend integration
 * Shows ASI capabilities, real-time data, and API connectivity
 * 
 * @version 3.0.0 - Backend Integration
 * @author Frontend Integration Specialist
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useBackendIntegration, backendIntegration, demoData } from '../services/backendIntegration';

const BackendIntegrationDemo = () => {
  const [selectedFund, setSelectedFund] = useState('AXIS_BLUECHIP');
  const [comparisonFunds, setComparisonFunds] = useState(['AXIS_BLUECHIP', 'HDFC_TOP_100']);
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipDuration, setSipDuration] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);

  // API Hook Usage
  const { data: healthData, loading: healthLoading, error: healthError } = useSystemHealth();
  const { data: asiAnalysis, loading: asiLoading, error: asiError, analyzeWithASI } = useASIFundAnalysis(selectedFund);
  const { data: marketInsights, loading: insightsLoading } = useASIMarketInsights();
  const { data: fundComparison, loading: comparisonLoading, compareFunds } = useASIFundComparison();
  const { data: marketIndices, loading: indicesLoading } = useLiveMarketIndices();
  const { connected: wsConnected, lastMessage } = useWebSocket();
  const { data: sipCalculation, loading: sipLoading, calculateSIP } = useSIPCalculator();
  const { data: allFunds, loading: fundsLoading } = useAllFunds();

  // Demo Actions
  const handleAnalyzeFund = () => {
    analyzeWithASI();
  };

  const handleCompareFunds = () => {
    compareFunds(comparisonFunds);
  };

  const handleCalculateSIP = () => {
    calculateSIP(sipAmount, sipDuration, expectedReturn);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🔗 Backend Integration Demo
          </h1>
          <p className="text-xl text-gray-300">
            Live demonstration of SIP Brewery frontend connected to Universe-Class ASI Backend
          </p>
        </div>

        {/* Connection Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* System Health */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              🏥 System Health
              {healthLoading && <div className="ml-2 w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
            </h3>
            {healthError ? (
              <div className="text-red-400">❌ {healthError}</div>
            ) : healthData ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Status:</span>
                  <span className="text-green-400">✅ {healthData.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Uptime:</span>
                  <span className="text-blue-400">{healthData.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">ASI:</span>
                  <span className="text-green-400">✅ {healthData.asi_status}</span>
                </div>
              </div>
            ) : (
              <div className="text-gray-400">Connecting...</div>
            )}
          </div>

          {/* WebSocket Status */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              📡 Real-time Connection
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">WebSocket:</span>
                <span className={wsConnected ? "text-green-400" : "text-red-400"}>
                  {wsConnected ? "🟢 Connected" : "🔴 Disconnected"}
                </span>
              </div>
              {lastMessage && (
                <div className="text-xs text-gray-400 mt-2">
                  Last: {JSON.stringify(lastMessage).substring(0, 50)}...
                </div>
              )}
            </div>
          </div>

          {/* Market Data */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              📊 Live Market Data
              {indicesLoading && <div className="ml-2 w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
            </h3>
            {marketIndices?.indices ? (
              <div className="space-y-2">
                {marketIndices.indices.slice(0, 3).map((index: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-300">{index.name}:</span>
                    <span className={index.change >= 0 ? "text-green-400" : "text-red-400"}>
                      {index.value} ({index.change >= 0 ? '+' : ''}{index.change_percent}%)
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400">Loading indices...</div>
            )}
          </div>
        </div>

        {/* ASI Fund Analysis Demo */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">🤖 ASI Fund Analysis</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controls */}
            <div>
              <div className="mb-4">
                <label className="block text-white mb-2">Select Fund for Analysis:</label>
                <select 
                  value={selectedFund}
                  onChange={(e) => setSelectedFund(e.target.value)}
                  className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white"
                >
                  <option value="AXIS_BLUECHIP">Axis Bluechip Fund</option>
                  <option value="HDFC_TOP_100">HDFC Top 100 Fund</option>
                  <option value="SBI_BLUECHIP">SBI Bluechip Fund</option>
                  <option value="ICICI_BLUECHIP">ICICI Pru Bluechip Fund</option>
                </select>
              </div>
              
              <button
                onClick={handleAnalyzeFund}
                disabled={asiLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
              >
                {asiLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Analyzing with ASI...
                  </div>
                ) : (
                  '🧠 Analyze with ASI'
                )}
              </button>
            </div>

            {/* Results */}
            <div>
              {asiError ? (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
                  ❌ {asiError}
                </div>
              ) : asiAnalysis ? (
                <div className="space-y-4">
                  <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">{asiAnalysis.fund_name}</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-300">Overall Score:</span>
                        <span className="text-green-400 ml-2 font-bold">{asiAnalysis.analysis.overall_score}/10</span>
                      </div>
                      <div>
                        <span className="text-gray-300">Recommendation:</span>
                        <span className={`ml-2 font-bold ${
                          asiAnalysis.analysis.recommendation === 'BUY' ? 'text-green-400' :
                          asiAnalysis.analysis.recommendation === 'HOLD' ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {asiAnalysis.analysis.recommendation}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-300">Risk Score:</span>
                        <span className="text-blue-400 ml-2 font-bold">{asiAnalysis.analysis.risk_score}/10</span>
                      </div>
                      <div>
                        <span className="text-gray-300">Confidence:</span>
                        <span className="text-purple-400 ml-2 font-bold">{(asiAnalysis.analysis.confidence * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                    
                    {asiAnalysis.insights && (
                      <div className="mt-4">
                        <h5 className="text-white font-semibold mb-2">🔍 Key Insights:</h5>
                        <ul className="text-gray-300 text-sm space-y-1">
                          {asiAnalysis.insights.slice(0, 3).map((insight, i) => (
                            <li key={i}>• {insight}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {asiAnalysis.quantum_optimization && (
                      <div className="mt-4 bg-purple-500/20 border border-purple-500/50 rounded-lg p-3">
                        <h5 className="text-white font-semibold mb-2">⚛️ Quantum Optimization:</h5>
                        <div className="text-sm text-gray-300">
                          <div>Optimal Allocation: {(asiAnalysis.quantum_optimization.optimal_allocation * 100).toFixed(1)}%</div>
                          <div>Quantum Advantage: {(asiAnalysis.quantum_optimization.quantum_advantage * 100).toFixed(1)}%</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">
                  Click "Analyze with ASI" to get intelligent fund analysis
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fund Comparison Demo */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">⚖️ ASI Fund Comparison</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <label className="block text-white mb-2">Select Funds to Compare:</label>
                <div className="space-y-2">
                  {['AXIS_BLUECHIP', 'HDFC_TOP_100', 'SBI_BLUECHIP', 'ICICI_BLUECHIP'].map(fund => (
                    <label key={fund} className="flex items-center text-white">
                      <input
                        type="checkbox"
                        checked={comparisonFunds.includes(fund)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setComparisonFunds([...comparisonFunds, fund]);
                          } else {
                            setComparisonFunds(comparisonFunds.filter(f => f !== fund));
                          }
                        }}
                        className="mr-2"
                      />
                      {fund.replace(/_/g, ' ')}
                    </label>
                  ))}
                </div>
              </div>
              
              <button
                onClick={handleCompareFunds}
                disabled={comparisonLoading || comparisonFunds.length < 2}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50"
              >
                {comparisonLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Comparing...
                  </div>
                ) : (
                  '⚖️ Compare Funds'
                )}
              </button>
            </div>

            <div>
              {fundComparison ? (
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">Comparison Results:</h4>
                  {fundComparison.comparison?.map((fund: any, i: number) => (
                    <div key={i} className="bg-white/10 rounded-lg p-3 border border-white/20">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{fund.fund_name}</span>
                        <span className="text-yellow-400 font-bold">#{fund.rank}</span>
                      </div>
                      <div className="text-sm text-gray-300 mt-1">
                        Overall: {fund.scores?.overall}/10 | Risk: {fund.scores?.risk}/10
                      </div>
                    </div>
                  ))}
                  {fundComparison.best_choice && (
                    <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 mt-4">
                      <div className="text-green-400 font-semibold">🏆 Best Choice: {fundComparison.best_choice}</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">
                  Select at least 2 funds and click "Compare Funds"
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SIP Calculator Demo */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">💰 SIP Calculator</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Monthly SIP Amount (₹):</label>
                <input
                  type="number"
                  value={sipAmount}
                  onChange={(e) => setSipAmount(Number(e.target.value))}
                  className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white"
                  min="500"
                  step="500"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Investment Duration (Years):</label>
                <input
                  type="number"
                  value={sipDuration}
                  onChange={(e) => setSipDuration(Number(e.target.value))}
                  className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white"
                  min="1"
                  max="30"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Expected Annual Return (%):</label>
                <input
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white"
                  min="1"
                  max="30"
                  step="0.5"
                />
              </div>
              
              <button
                onClick={handleCalculateSIP}
                disabled={sipLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
              >
                {sipLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Calculating...
                  </div>
                ) : (
                  '💰 Calculate SIP'
                )}
              </button>
            </div>

            <div>
              {sipCalculation ? (
                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/50 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-white mb-4">📈 SIP Projection</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Monthly Investment:</span>
                      <span className="text-white font-bold">₹{sipCalculation.monthly_investment?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Total Investment:</span>
                      <span className="text-blue-400 font-bold">₹{sipCalculation.total_investment?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Maturity Amount:</span>
                      <span className="text-green-400 font-bold text-xl">₹{sipCalculation.maturity_amount?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Wealth Gained:</span>
                      <span className="text-yellow-400 font-bold">₹{sipCalculation.wealth_gained?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">
                  Enter SIP details and click "Calculate SIP"
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Market Insights */}
        {marketInsights && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">🧠 ASI Market Insights</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">📊 Market Sentiment</h4>
                <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-400">
                    {(marketInsights.market_sentiment * 100).toFixed(1)}%
                  </div>
                  <div className="text-gray-300 text-sm">Overall Market Sentiment</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">💡 Key Insights</h4>
                <div className="space-y-2">
                  {marketInsights.key_insights?.slice(0, 3).map((insight: string, i: number) => (
                    <div key={i} className="text-gray-300 text-sm">• {insight}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackendIntegrationDemo;
