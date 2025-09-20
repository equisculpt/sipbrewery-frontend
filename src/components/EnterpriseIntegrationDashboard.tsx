'use client';

import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Database, 
  Shield, 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw,
  Play,
  Square,
  BarChart3,
  Brain,
  Zap,
  Globe,
  Server,
  HardDrive,
  Network,
  Eye,
  Download,
  Settings
} from 'lucide-react';

interface ServiceStatus {
  status: string;
  initialized?: boolean;
  activeRequests?: number;
  totalRequests?: number;
  averagePerformance?: number;
  capabilities?: any[];
  knowledgeBase?: number;
  config?: any;
  memoryUsage?: any;
  tfMemory?: any;
}

interface IntegratedSystemStatus {
  overall_status: string;
  timestamp: string;
  services: {
    [key: string]: ServiceStatus;
  };
  integration_metrics: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    averageResponseTime: number;
    lastHealthCheck: number;
  };
  active_workflows: Array<{
    id: string;
    name: string;
    active: boolean;
    last_execution?: string;
  }>;
  event_bus_status: {
    listeners: number;
    max_listeners: number;
  };
}

interface ComprehensiveAnalysisResult {
  analysis_id: string;
  portfolio_id: string;
  analysis_type: string;
  timestamp: string;
  components: {
    real_time_stream?: { stream_id: string; status: string };
    var_analysis?: any;
    stress_testing?: any;
    risk_attribution?: any;
    regulatory_capital?: any;
    performance_analytics?: any;
    ml_predictions?: any;
    asi_insights?: any;
    comprehensive_report?: any;
  };
}

const EnterpriseIntegrationDashboard: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<IntegratedSystemStatus | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ComprehensiveAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const portfolioId = 'DEMO_PORTFOLIO_001';

  // Get system status (Demo Mode)
  const getSystemStatus = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Demo mode - generate mock system status
      const mockSystemStatus = {
        overall_status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
          'api_gateway': { status: 'healthy', initialized: true, activeRequests: 23, totalRequests: 15420, averagePerformance: 145 },
          'portfolio_engine': { status: 'healthy', initialized: true, activeRequests: 12, totalRequests: 8930, averagePerformance: 234 },
          'risk_calculator': { status: 'healthy', initialized: true, activeRequests: 8, totalRequests: 5670, averagePerformance: 189 },
          'data_pipeline': { status: 'warning', initialized: true, activeRequests: 45, totalRequests: 12340, averagePerformance: 567 },
          'notification_service': { status: 'healthy', initialized: true, activeRequests: 5, totalRequests: 3450, averagePerformance: 89 },
          'authentication': { status: 'healthy', initialized: true, activeRequests: 18, totalRequests: 9870, averagePerformance: 67 }
        },
        integration_metrics: {
          totalRequests: 55680,
          successfulRequests: 54230,
          failedRequests: 1450,
          averageResponseTime: 198,
          lastHealthCheck: Date.now()
        },
        active_workflows: [
          { id: 'portfolio_sync', name: 'Portfolio Synchronization', active: true, last_execution: new Date().toISOString() },
          { id: 'risk_monitoring', name: 'Risk Monitoring', active: true, last_execution: new Date().toISOString() },
          { id: 'compliance_check', name: 'Compliance Validation', active: true, last_execution: new Date().toISOString() },
          { id: 'data_validation', name: 'Data Quality Check', active: false, last_execution: new Date(Date.now() - 300000).toISOString() }
        ],
        event_bus_status: {
          listeners: 24,
          max_listeners: 50,
          events_processed: 8920,
          pending_events: 12
        }
      };
      
      setSystemStatus(mockSystemStatus);
    } catch (err) {
      setError('Demo system status error');
      console.error('System status error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Run comprehensive portfolio analysis
  const runComprehensiveAnalysis = async () => {
    setAnalyzing(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE}/api/enterprise/comprehensive-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer demo-token'
        },
        body: JSON.stringify({
          portfolio_id: portfolioId,
          analysis_type: 'full'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setAnalysisResult(data.data);
      } else {
        setError(data.message || 'Failed to run comprehensive analysis');
      }
    } catch (err) {
      setError('Network error while running comprehensive analysis');
      console.error('Comprehensive analysis error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  // Initialize component
  useEffect(() => {
    getSystemStatus();
    
    // Set up periodic status updates
    const statusInterval = setInterval(getSystemStatus, 30000);
    
    return () => clearInterval(statusInterval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'healthy':
      case 'operational':
      case 'ready':
        return 'text-green-400';
      case 'degraded':
      case 'warning':
        return 'text-yellow-400';
      case 'unhealthy':
      case 'error':
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'healthy':
      case 'operational':
      case 'ready':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'degraded':
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'unhealthy':
      case 'error':
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default:
        return <RefreshCw className="h-4 w-4 text-gray-400 animate-spin" />;
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/20 via-gray-900 to-blue-900/20 rounded-xl p-6 border border-purple-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                🏗️ Enterprise Integration Center
              </span>
            </h1>
            <p className="text-gray-300">
              Unified orchestration and monitoring of all enterprise services and workflows
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={getSystemStatus}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Status</span>
            </button>
            <button
              onClick={runComprehensiveAnalysis}
              disabled={analyzing}
              className="flex items-center space-x-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
            >
              {analyzing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Brain className="h-4 w-4" />
              )}
              <span>{analyzing ? 'Analyzing...' : 'Run Analysis'}</span>
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

      {/* System Overview */}
      {systemStatus && (
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">System Overview</h3>
            <div className="flex items-center space-x-2">
              {getStatusIcon(systemStatus.overall_status)}
              <span className={`font-medium ${getStatusColor(systemStatus.overall_status)}`}>
                {systemStatus.overall_status.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Server className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-gray-300">Total Requests</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">
                {formatNumber(systemStatus.integration_metrics.totalRequests)}
              </div>
              <p className="text-xs text-gray-500">All services</p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-gray-300">Success Rate</span>
              </div>
              <div className="text-2xl font-bold text-green-400">
                {systemStatus.integration_metrics.totalRequests > 0 
                  ? ((systemStatus.integration_metrics.successfulRequests / systemStatus.integration_metrics.totalRequests) * 100).toFixed(1)
                  : 0}%
              </div>
              <p className="text-xs text-gray-500">Request success</p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium text-gray-300">Avg Response</span>
              </div>
              <div className="text-2xl font-bold text-purple-400">
                {systemStatus.integration_metrics.averageResponseTime.toFixed(0)}ms
              </div>
              <p className="text-xs text-gray-500">Response time</p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Network className="h-4 w-4 text-orange-400" />
                <span className="text-sm font-medium text-gray-300">Event Bus</span>
              </div>
              <div className="text-2xl font-bold text-orange-400">
                {systemStatus.event_bus_status.listeners}
              </div>
              <p className="text-xs text-gray-500">Active listeners</p>
            </div>
          </div>

          {/* Service Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(systemStatus.services).map(([serviceName, service]) => (
              <div key={serviceName} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white capitalize">
                    {serviceName.replace(/_/g, ' ')}
                  </h4>
                  {getStatusIcon(service.status)}
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={getStatusColor(service.status)}>
                      {service.status}
                    </span>
                  </div>
                  
                  {service.activeRequests !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Active Requests:</span>
                      <span className="text-white">{service.activeRequests}</span>
                    </div>
                  )}
                  
                  {service.totalRequests !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Requests:</span>
                      <span className="text-white">{formatNumber(service.totalRequests)}</span>
                    </div>
                  )}
                  
                  {service.averagePerformance !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Performance:</span>
                      <span className="text-white">{service.averagePerformance.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {service.memoryUsage && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Memory:</span>
                      <span className="text-white">{formatBytes(service.memoryUsage.heapUsed)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Workflows */}
      {systemStatus?.active_workflows && (
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Active Workflows</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemStatus.active_workflows.map((workflow) => (
              <div key={workflow.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{workflow.name}</h4>
                  <div className="flex items-center space-x-2">
                    {workflow.active ? (
                      <Play className="h-4 w-4 text-green-400" />
                    ) : (
                      <Square className="h-4 w-4 text-gray-400" />
                    )}
                    <span className={`text-xs ${workflow.active ? 'text-green-400' : 'text-gray-400'}`}>
                      {workflow.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                {workflow.last_execution && (
                  <div className="text-xs text-gray-500">
                    Last execution: {new Date(workflow.last_execution).toLocaleString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comprehensive Analysis Results */}
      {analysisResult && (
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Comprehensive Analysis Results</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Analysis ID:</span>
              <span className="text-sm font-mono text-blue-400">{analysisResult.analysis_id}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium text-gray-300">Analysis Type</span>
              </div>
              <div className="text-lg font-bold text-purple-400 capitalize">
                {analysisResult.analysis_type}
              </div>
              <p className="text-xs text-gray-500">Comprehensive analysis</p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Database className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-gray-300">Portfolio</span>
              </div>
              <div className="text-lg font-bold text-blue-400">
                {analysisResult.portfolio_id}
              </div>
              <p className="text-xs text-gray-500">Target portfolio</p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-gray-300">Timestamp</span>
              </div>
              <div className="text-lg font-bold text-green-400">
                {new Date(analysisResult.timestamp).toLocaleTimeString()}
              </div>
              <p className="text-xs text-gray-500">Analysis time</p>
            </div>
          </div>

          {/* Analysis Components */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Analysis Components</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(analysisResult.components).map(([component, data]) => (
                <div key={component} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-white capitalize">
                      {component.replace(/_/g, ' ')}
                    </h5>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>
                  
                  {component === 'real_time_stream' && data && (
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Stream ID:</span>
                        <span className="text-blue-400 font-mono text-xs">{data.stream_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className="text-green-400">{data.status}</span>
                      </div>
                    </div>
                  )}
                  
                  {component === 'var_analysis' && data && (
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Composite VaR:</span>
                        <span className="text-red-400">{(data.composite_var * 100).toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Confidence:</span>
                        <span className="text-white">{(data.confidence_level * 100)}%</span>
                      </div>
                    </div>
                  )}
                  
                  {component === 'regulatory_capital' && data && (
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Framework:</span>
                        <span className="text-white uppercase">{data.framework}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Required:</span>
                        <span className="text-green-400">₹{(data.total_capital_required / 100000).toFixed(1)}L</span>
                      </div>
                    </div>
                  )}
                  
                  {component === 'asi_insights' && data && (
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Confidence:</span>
                        <span className="text-purple-400">{((data.confidence || 0.8) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className="text-green-400">Generated</span>
                      </div>
                    </div>
                  )}
                  
                  {!data && (
                    <div className="text-sm text-gray-500">
                      Component completed successfully
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Download Report Button */}
          {analysisResult.components.comprehensive_report && (
            <div className="mt-6 pt-4 border-t border-gray-700">
              <button className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                <span>Download Comprehensive Report</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <Shield className="h-5 w-5 text-white" />
            <div className="text-left">
              <div className="font-medium text-white">Risk Analysis</div>
              <div className="text-xs text-blue-100">Run VaR & stress tests</div>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
            <Activity className="h-5 w-5 text-white" />
            <div className="text-left">
              <div className="font-medium text-white">Real-time Monitor</div>
              <div className="text-xs text-green-100">Start live monitoring</div>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
            <Database className="h-5 w-5 text-white" />
            <div className="text-left">
              <div className="font-medium text-white">Data Analytics</div>
              <div className="text-xs text-purple-100">Run warehouse queries</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseIntegrationDashboard;
