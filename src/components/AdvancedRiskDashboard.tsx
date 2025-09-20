'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  TrendingDown, 
  AlertTriangle, 
  Activity, 
  BarChart3, 
  Target, 
  RefreshCw,
  Download,
  Eye,
  Zap,
  Brain,
  Gauge
} from 'lucide-react';

interface VaRResults {
  timestamp: string;
  portfolio_id: string;
  confidence_level: number;
  time_horizon: number;
  methodologies: {
    parametric: { value: number; method: string };
    historical: { value: number; method: string };
    monteCarlo: { value: number; method: string };
    cornishFisher: { value: number; method: string };
  };
  composite_var: number;
  risk_decomposition: any;
}

interface StressTestResults {
  timestamp: string;
  portfolio_id: string;
  scenarios: {
    [key: string]: {
      scenario_name: string;
      base_value: number;
      stressed_value: number;
      total_loss: number;
      loss_percentage: number;
      factor_impacts: any;
    };
  };
  summary: any;
  vulnerabilities: string[];
  recommendations: any;
}

interface RiskAttribution {
  timestamp: string;
  portfolio_id: string;
  total_risk: number;
  total_volatility: number;
  factor_contributions: {
    [key: string]: {
      exposure: number;
      variance: number;
      contribution: number;
      percentage: number;
    };
  };
  idiosyncratic_risk: number;
  idiosyncratic_percentage: number;
}

interface RegulatoryCapital {
  timestamp: string;
  portfolio_id: string;
  framework: string;
  capital_requirements: {
    [key: string]: {
      amount: number;
      description: string;
      percentage: number;
    };
  };
  total_capital_required: number;
  capital_adequacy: any;
}

const AdvancedRiskDashboard: React.FC = () => {
  const [varResults, setVarResults] = useState<VaRResults | null>(null);
  const [stressResults, setStressResults] = useState<StressTestResults | null>(null);
  const [riskAttribution, setRiskAttribution] = useState<RiskAttribution | null>(null);
  const [regulatoryCapital, setRegulatoryCapital] = useState<RegulatoryCapital | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('var');
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const portfolioId = 'DEMO_PORTFOLIO_001';

  // Calculate VaR (Demo Mode)
  const calculateVaR = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Demo mode - generate mock VaR data
      const mockVarData = {
        portfolio_id: portfolioId,
        confidence_level: 0.95,
        time_horizon: 1,
        composite_var: -0.0260,
        methodologies: {
          parametric: { value: -0.0234, method: 'Parametric VaR using normal distribution' },
          historical: { value: -0.0267, method: 'Historical simulation with 252 days' },
          monteCarlo: { value: -0.0251, method: 'Monte Carlo simulation with 10,000 iterations' },
          cornishFisher: { value: -0.0289, method: 'Cornish-Fisher expansion for non-normal returns' }
        },
        risk_decomposition: {
          sector_breakdown: {
            technology: -0.0089,
            financial: -0.0067,
            healthcare: -0.0054,
            consumer: -0.0050
          },
          factor_attribution: {
            market_risk: -0.0180,
            credit_risk: -0.0045,
            liquidity_risk: -0.0035
          }
        },
        risk_metrics: {
          volatility: 0.1456,
          sharpe_ratio: 1.23,
          max_drawdown: -0.0892,
          beta: 1.05
        },
        timestamp: new Date().toISOString()
      };
      
      setVarResults(mockVarData);
    } catch (err) {
      setError('Demo VaR analysis error');
      console.error('VaR analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Perform stress testing
  const performStressTesting = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE}/api/risk/stress-test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer demo-token'
        },
        body: JSON.stringify({
          portfolio_id: portfolioId,
          scenarios: ['2008_financial_crisis', 'covid_2020', 'interest_rate_shock', 'currency_crisis']
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStressResults(data.data);
      } else {
        setError(data.message || 'Failed to perform stress testing');
      }
    } catch (err) {
      setError('Network error while performing stress testing');
      console.error('Stress testing error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate risk attribution
  const calculateRiskAttribution = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE}/api/risk/attribution`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer demo-token'
        },
        body: JSON.stringify({
          portfolio_id: portfolioId
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setRiskAttribution(data.data);
      } else {
        setError(data.message || 'Failed to calculate risk attribution');
      }
    } catch (err) {
      setError('Network error while calculating risk attribution');
      console.error('Risk attribution error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate regulatory capital
  const calculateRegulatoryCapital = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE}/api/risk/regulatory-capital`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer demo-token'
        },
        body: JSON.stringify({
          portfolio_id: portfolioId,
          framework: 'sebi'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setRegulatoryCapital(data.data);
      } else {
        setError(data.message || 'Failed to calculate regulatory capital');
      }
    } catch (err) {
      setError('Network error while calculating regulatory capital');
      console.error('Regulatory capital error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Start real-time monitoring
  const toggleRealTimeMonitoring = async () => {
    try {
      if (!realTimeMonitoring) {
        const response = await fetch(`${API_BASE}/api/risk/start-monitoring`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer demo-token'
          },
          body: JSON.stringify({
            portfolio_id: portfolioId
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          setRealTimeMonitoring(true);
        }
      } else {
        setRealTimeMonitoring(false);
      }
    } catch (err) {
      console.error('Real-time monitoring error:', err);
    }
  };

  // Run comprehensive analysis
  const runComprehensiveAnalysis = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Run all analyses in parallel
      await Promise.all([
        calculateVaR(),
        performStressTesting(),
        calculateRiskAttribution(),
        calculateRegulatoryCapital()
      ]);
    } catch (err) {
      setError('Failed to run comprehensive analysis');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (value: number, type: 'var' | 'stress' | 'general' = 'general') => {
    if (type === 'var') {
      if (value > 0.05) return 'text-red-400';
      if (value > 0.03) return 'text-yellow-400';
      return 'text-green-400';
    }
    if (type === 'stress') {
      if (value > 20) return 'text-red-400';
      if (value > 10) return 'text-yellow-400';
      return 'text-green-400';
    }
    if (value > 80) return 'text-green-400';
    if (value > 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900/20 via-gray-900 to-orange-900/20 rounded-xl p-6 border border-red-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                🛡️ Advanced Risk Management
              </span>
            </h1>
            <p className="text-gray-300">
              Enterprise-grade risk analysis with VaR calculations, stress testing, and regulatory compliance
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleRealTimeMonitoring}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                realTimeMonitoring 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              <Activity className="h-4 w-4" />
              <span>{realTimeMonitoring ? 'Monitoring Active' : 'Start Monitoring'}</span>
            </button>
            <button
              onClick={runComprehensiveAnalysis}
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
            >
              {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
              <span>{loading ? 'Analyzing...' : 'Run Analysis'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <span className="text-red-400 font-medium">Error</span>
          </div>
          <p className="text-red-300 mt-2">{error}</p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700">
        <div className="flex border-b border-gray-700">
          {[
            { id: 'var', label: 'Value-at-Risk', icon: TrendingDown },
            { id: 'stress', label: 'Stress Testing', icon: AlertTriangle },
            { id: 'attribution', label: 'Risk Attribution', icon: BarChart3 },
            { id: 'regulatory', label: 'Regulatory Capital', icon: Shield }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === id
                  ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-900/20'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Value-at-Risk Tab */}
          {activeTab === 'var' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Value-at-Risk Analysis</h3>
                <button
                  onClick={calculateVaR}
                  disabled={loading}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  <Gauge className="h-4 w-4" />
                  <span>Calculate VaR</span>
                </button>
              </div>

              {varResults && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">Composite VaR</span>
                      <Target className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className={`text-2xl font-bold ${getRiskColor(varResults.composite_var, 'var')}`}>
                      {formatPercentage(varResults.composite_var)}
                    </div>
                    <p className="text-xs text-gray-500">95% confidence, 1-day horizon</p>
                  </div>

                  {Object.entries(varResults.methodologies).map(([method, result]) => (
                    <div key={method} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-300 capitalize">
                          {method.replace(/([A-Z])/g, ' $1')}
                        </span>
                      </div>
                      <div className={`text-xl font-bold ${getRiskColor(result.value, 'var')}`}>
                        {formatPercentage(result.value)}
                      </div>
                      <p className="text-xs text-gray-500">{result.method}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Stress Testing Tab */}
          {activeTab === 'stress' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Stress Testing Results</h3>
                <button
                  onClick={performStressTesting}
                  disabled={loading}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>Run Stress Tests</span>
                </button>
              </div>

              {stressResults && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(stressResults.scenarios).map(([scenarioKey, scenario]) => (
                    <div key={scenarioKey} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-white mb-4">{scenario.scenario_name}</h4>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Base Value:</span>
                          <span className="text-white font-medium">{formatCurrency(scenario.base_value)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Stressed Value:</span>
                          <span className="text-white font-medium">{formatCurrency(scenario.stressed_value)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Total Loss:</span>
                          <span className="text-red-400 font-medium">{formatCurrency(scenario.total_loss)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Loss Percentage:</span>
                          <span className={`font-bold ${getRiskColor(Math.abs(scenario.loss_percentage), 'stress')}`}>
                            {scenario.loss_percentage.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {stressResults?.vulnerabilities && (
                <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4">
                  <h4 className="text-yellow-400 font-medium mb-2">⚠️ Identified Vulnerabilities</h4>
                  <ul className="text-yellow-300 space-y-1">
                    {stressResults.vulnerabilities.map((vulnerability, index) => (
                      <li key={index}>• {vulnerability}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Risk Attribution Tab */}
          {activeTab === 'attribution' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Factor-Based Risk Attribution</h3>
                <button
                  onClick={calculateRiskAttribution}
                  disabled={loading}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Calculate Attribution</span>
                </button>
              </div>

              {riskAttribution && (
                <div className="space-y-6">
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Total Portfolio Risk</h4>
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {formatPercentage(riskAttribution.total_volatility)}
                    </div>
                    <p className="text-gray-300">Annualized Volatility</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(riskAttribution.factor_contributions).map(([factor, contribution]) => (
                      <div key={factor} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-300 capitalize">
                            {factor.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className="text-xl font-bold text-purple-400 mb-1">
                          {contribution.percentage.toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-500">
                          Exposure: {contribution.exposure.toFixed(3)}
                        </div>
                      </div>
                    ))}

                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-300">Idiosyncratic Risk</span>
                      </div>
                      <div className="text-xl font-bold text-gray-400 mb-1">
                        {riskAttribution.idiosyncratic_percentage.toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-500">
                        Stock-specific risk
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Regulatory Capital Tab */}
          {activeTab === 'regulatory' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">SEBI Regulatory Capital Requirements</h3>
                <button
                  onClick={calculateRegulatoryCapital}
                  disabled={loading}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  <span>Calculate Capital</span>
                </button>
              </div>

              {regulatoryCapital && (
                <div className="space-y-6">
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Total Capital Required</h4>
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {formatCurrency(regulatoryCapital.total_capital_required)}
                    </div>
                    <p className="text-gray-300">Under {regulatoryCapital.framework.toUpperCase()} Framework</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(regulatoryCapital.capital_requirements).map(([requirement, details]) => (
                      <div key={requirement} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-300 capitalize">
                            {requirement.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className="text-xl font-bold text-green-400 mb-1">
                          {formatCurrency(details.amount)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {details.percentage.toFixed(2)}% of AUM
                        </div>
                        <p className="text-xs text-gray-400 mt-2">{details.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Real-time Status */}
      {realTimeMonitoring && (
        <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-medium">Real-time Risk Monitoring Active</span>
          </div>
          <p className="text-green-300 mt-2">
            Continuous monitoring of VaR levels, stress indicators, concentration limits, and liquidity metrics.
            Alerts will be triggered if risk thresholds are breached.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdvancedRiskDashboard;
