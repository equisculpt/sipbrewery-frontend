// Professional Reports Dashboard with ASI Portfolio Analysis
import React, { useState, useEffect } from 'react';

interface ReportOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'standard' | 'asi' | 'tax' | 'analysis';
  estimatedTime: string;
  options?: any;
}

interface ReportHistory {
  id: string;
  type: string;
  generatedAt: string;
  status: 'completed' | 'processing' | 'failed';
  downloadUrl?: string;
}

const ReportsDashboard: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [reportOptions, setReportOptions] = useState<any>({});
  const [generating, setGenerating] = useState<boolean>(false);
  const [reportHistory, setReportHistory] = useState<ReportHistory[]>([]);
  const [activeTab, setActiveTab] = useState<'generate' | 'history'>('generate');

  const availableReports: ReportOption[] = [
    {
      id: 'asi-portfolio-analysis',
      name: 'ASI Portfolio Analysis',
      description: 'Comprehensive AI-powered portfolio analysis with predictive insights, behavioral analysis, and optimization recommendations',
      icon: '🤖',
      category: 'asi',
      estimatedTime: '30-45 seconds',
      options: {
        analysisDepth: ['basic', 'detailed', 'comprehensive'],
        includeAIPredictions: true,
        includeBehavioralAnalysis: true,
        includeMarketSentiment: true,
        includeOptimizationSuggestions: true,
        timeHorizon: ['1Y', '3Y', '5Y']
      }
    },
    {
      id: 'portfolio-statement',
      name: 'Portfolio Statement',
      description: 'Comprehensive portfolio overview with holdings, performance, and transactions',
      icon: '📊',
      category: 'standard',
      estimatedTime: '15-20 seconds',
      options: {
        dateRange: ['1M', '3M', '6M', '1Y', 'YTD', 'ALL'],
        format: ['detailed', 'summary', 'regulatory'],
        includeTransactions: true,
        includeTaxDetails: true,
        includePerformance: true
      }
    },
    {
      id: 'performance-analysis',
      name: 'Performance Analysis',
      description: 'Detailed performance metrics, benchmark comparison, and risk analysis',
      icon: '📈',
      category: 'analysis',
      estimatedTime: '20-25 seconds',
      options: {
        period: ['1M', '3M', '6M', '1Y', '3Y', '5Y', 'ALL'],
        benchmarkComparison: true,
        riskMetrics: true,
        attribution: true
      }
    },
    {
      id: 'tax-statement',
      name: 'Tax Statement',
      description: 'Tax implications, capital gains, dividend income, and ELSS investments',
      icon: '💰',
      category: 'tax',
      estimatedTime: '10-15 seconds',
      options: {
        financialYear: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1)
      }
    },
    {
      id: 'capital-gains',
      name: 'Capital Gains Report',
      description: 'Short-term and long-term capital gains with tax implications',
      icon: '📋',
      category: 'tax',
      estimatedTime: '10-15 seconds',
      options: {
        financialYear: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
        gainType: ['STCG', 'LTCG', 'ALL'],
        includeUnrealized: false
      }
    },
    {
      id: 'sip-analysis',
      name: 'SIP Analysis',
      description: 'SIP performance, rupee cost averaging, and future projections',
      icon: '🔄',
      category: 'analysis',
      estimatedTime: '15-20 seconds',
      options: {
        period: ['1Y', '3Y', '5Y', 'ALL'],
        includeFutureProjections: true,
        includeOptimization: true
      }
    },
    {
      id: 'risk-analysis',
      name: 'Risk Analysis',
      description: 'Portfolio risk metrics, volatility analysis, and stress testing',
      icon: '⚠️',
      category: 'analysis',
      estimatedTime: '20-25 seconds',
      options: {
        includeStressTest: true,
        includeScenarioAnalysis: true,
        includeRiskRecommendations: true
      }
    },
    {
      id: 'annual-report',
      name: 'Annual Report',
      description: 'Comprehensive year-end review with performance highlights and outlook',
      icon: '📅',
      category: 'standard',
      estimatedTime: '25-30 seconds',
      options: {
        year: new Date().getFullYear()
      }
    }
  ];

  useEffect(() => {
    fetchReportHistory();
  }, []);

  const fetchReportHistory = async () => {
    try {
      const userId = localStorage.getItem('userId') || 'demo-user';
      const response = await fetch(`/api/reports/history/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setReportHistory(data.data.reports || []);
      }
    } catch (error) {
      console.error('Failed to fetch report history:', error);
    }
  };

  const generateReport = async () => {
    if (!selectedReport) return;
    
    setGenerating(true);
    
    try {
      const userId = localStorage.getItem('userId') || 'demo-user';
      const reportConfig = availableReports.find(r => r.id === selectedReport);
      
      let endpoint = `/api/reports/generate/${selectedReport}`;
      let payload: any = { userId };
      
      // Handle special case for ASI report
      if (selectedReport === 'asi-portfolio-analysis') {
        endpoint = '/api/reports/generate/asi-portfolio-analysis';
        payload.options = reportOptions;
      } else {
        // Handle other report types
        if (selectedReport === 'tax-statement' || selectedReport === 'capital-gains') {
          payload.financialYear = reportOptions.financialYear || '2024-2025';
        }
        if (selectedReport === 'annual-report') {
          payload.year = reportOptions.year || new Date().getFullYear();
        }
        if (reportOptions && Object.keys(reportOptions).length > 0) {
          payload.options = reportOptions;
        }
      }
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        // Handle PDF download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${reportConfig?.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Refresh history
        fetchReportHistory();
      } else {
        const errorData = await response.json();
        alert(`Failed to generate report: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Report generation failed:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'asi': return 'from-purple-500 to-pink-500';
      case 'standard': return 'from-blue-500 to-cyan-500';
      case 'tax': return 'from-green-500 to-emerald-500';
      case 'analysis': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'asi': return 'bg-purple-100 text-purple-800';
      case 'standard': return 'bg-blue-100 text-blue-800';
      case 'tax': return 'bg-green-100 text-green-800';
      case 'analysis': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderReportOptions = () => {
    const report = availableReports.find(r => r.id === selectedReport);
    if (!report?.options) return null;

    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-4">Report Options</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(report.options).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              {Array.isArray(value) ? (
                <select
                  value={reportOptions[key] || value[0]}
                  onChange={(e) => setReportOptions({...reportOptions, [key]: e.target.value})}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {value.map((option: string) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : typeof value === 'boolean' ? (
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reportOptions[key] !== undefined ? reportOptions[key] : value}
                    onChange={(e) => setReportOptions({...reportOptions, [key]: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">Include in report</span>
                </label>
              ) : (
                <input
                  type="text"
                  value={reportOptions[key] || value}
                  onChange={(e) => setReportOptions({...reportOptions, [key]: e.target.value})}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Professional Reports</h1>
        <p className="text-gray-600">Generate comprehensive portfolio reports with AI-powered insights</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab('generate')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'generate'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Generate Reports
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'history'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Report History
        </button>
      </div>

      {activeTab === 'generate' ? (
        <div>
          {/* Report Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {availableReports.map((report) => (
              <div
                key={report.id}
                onClick={() => {
                  setSelectedReport(report.id);
                  setReportOptions({});
                }}
                className={`cursor-pointer rounded-xl p-6 transition-all duration-200 ${
                  selectedReport === report.id
                    ? 'ring-2 ring-blue-500 shadow-lg scale-105'
                    : 'hover:shadow-md hover:scale-102'
                } bg-gradient-to-br ${getCategoryColor(report.category)} text-white`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{report.icon}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor(report.category)} bg-white bg-opacity-20 text-white`}>
                    {report.category.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{report.name}</h3>
                <p className="text-sm opacity-90 mb-3">{report.description}</p>
                <div className="flex items-center text-xs opacity-75">
                  <span>⏱️ {report.estimatedTime}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Report Options */}
          {selectedReport && renderReportOptions()}

          {/* Generate Button */}
          {selectedReport && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={generateReport}
                disabled={generating}
                className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                  generating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
                }`}
              >
                {generating ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Report...
                  </div>
                ) : (
                  `📄 Generate ${availableReports.find(r => r.id === selectedReport)?.name}`
                )}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Report History */
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Report History</h2>
            {reportHistory.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-6xl mb-4">📄</div>
                <p className="text-gray-500">No reports generated yet</p>
                <button
                  onClick={() => setActiveTab('generate')}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Generate Your First Report
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {reportHistory.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">
                        {availableReports.find(r => r.id === report.type)?.icon || '📄'}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {availableReports.find(r => r.id === report.type)?.name || report.type}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Generated on {new Date(report.generatedAt).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.status === 'completed' ? 'bg-green-100 text-green-800' :
                        report.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {report.status}
                      </span>
                      {report.status === 'completed' && report.downloadUrl && (
                        <button
                          onClick={() => window.open(report.downloadUrl, '_blank')}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                        >
                          Download
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsDashboard;
