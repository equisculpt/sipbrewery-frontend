'use client';

import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Shield, Target, Download, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

interface ASIScore {
  overallScore: number;
  scoreInterpretation: string;
}

interface ASIPreview {
  overallASIScore: ASIScore;
  keyInsights: {
    performanceAttribution: number;
    riskLevel: number;
    expectedReturn: number;
    recommendationsCount: number;
  };
  generatedAt: string;
  analysisVersion: string;
}

const SimpleASIDashboard: React.FC = () => {
  const [asiScore, setAsiScore] = useState<ASIScore | null>(null);
  const [asiPreview, setAsiPreview] = useState<ASIPreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('preview');

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const userId = 'demo-user';

  // Fetch ASI Score - Using mock data for demo
  const fetchASIScore = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock ASI Score data
      const mockData = {
        overallScore: 78,
        scoreInterpretation: 'Good - Your portfolio shows strong performance with balanced risk management.'
      };
      
      setAsiScore(mockData);
    } catch (err: any) {
      setError('Failed to load ASI score');
      console.error('ASI Score fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch ASI Preview - Using mock data for demo
  const fetchASIPreview = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock ASI Preview data
      const mockPreviewData = {
        overallASIScore: {
          overallScore: 78,
          scoreInterpretation: 'Good - Your portfolio shows strong performance with balanced risk management.'
        },
        keyInsights: {
          performanceAttribution: 85,
          riskLevel: 65,
          expectedReturn: 12.5,
          recommendationsCount: 8
        },
        generatedAt: new Date().toISOString(),
        analysisVersion: 'v2.1.0'
      };
      
      setAsiPreview(mockPreviewData);
    } catch (err: any) {
      console.error('ASI Preview fetch error:', err);
    }
  };

  // Generate ASI Report - Mock functionality for demo
  const generateASIReport = async () => {
    setGenerating(true);
    setError('');
    
    try {
      // Simulate report generation delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock success message
      alert('ASI Report generated successfully! In a real implementation, this would download a PDF report.');
      
      // Refresh data after successful generation
      await fetchASIScore();
      await fetchASIPreview();
    } catch (err) {
      setError('Failed to generate ASI report');
      console.error('ASI Report generation error:', err);
    } finally {
      setGenerating(false);
    }
  };

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  // Get score background color
  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500/20 border-green-500/30';
    if (score >= 60) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  useEffect(() => {
    // Only fetch if we're in a browser environment and API is likely available
    if (typeof window !== 'undefined') {
      // Add extra protection against fetch errors
      const safelyFetchData = async () => {
        try {
          await Promise.allSettled([
            fetchASIScore(),
            fetchASIPreview()
          ]);
        } catch (error) {
          console.warn('Dashboard data fetch failed:', error);
          // Set a fallback state or show offline mode
          setError('Unable to connect to server. Please check your connection.');
        }
      };
      
      safelyFetchData();
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Brain className="h-8 w-8 text-blue-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">ASI Portfolio Analysis</h1>
            <p className="text-gray-400">Artificial Stock Intelligence • Advanced AI-Powered Insights</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => { fetchASIScore(); fetchASIPreview(); }}
            disabled={loading}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center space-x-2 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={generateASIReport}
            disabled={generating}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 disabled:opacity-50"
          >
            <Download className={`h-4 w-4 ${generating ? 'animate-spin' : ''}`} />
            <span>{generating ? 'Generating...' : 'Generate Report'}</span>
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* ASI Score Overview */}
      {asiScore && (
        <div className={`rounded-lg border p-6 ${getScoreBgColor(asiScore.overallScore)}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">Overall ASI Score</span>
            </div>
            <div className={`text-4xl font-bold ${getScoreColor(asiScore.overallScore)}`}>
              {asiScore.overallScore}/100
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
            <div 
              className={`h-3 rounded-full ${asiScore.overallScore >= 80 ? 'bg-green-400' : asiScore.overallScore >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`}
              style={{ width: `${asiScore.overallScore}%` }}
            />
          </div>
          <p className="text-gray-300">{asiScore.scoreInterpretation}</p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {[
            { id: 'preview', label: 'Quick Insights', icon: TrendingUp },
            { id: 'analysis', label: 'Analysis Details', icon: Brain },
            { id: 'history', label: 'Report History', icon: CheckCircle }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === id
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'preview' && asiPreview && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium text-gray-300">Performance Attribution</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-400">
                +{asiPreview.keyInsights.performanceAttribution.toFixed(1)}%
              </div>
              <p className="text-xs text-gray-500">Active return contribution</p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-orange-400" />
                  <span className="text-sm font-medium text-gray-300">Risk Level</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-orange-400">
                {asiPreview.keyInsights.riskLevel.toFixed(1)}%
              </div>
              <p className="text-xs text-gray-500">Portfolio volatility</p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium text-gray-300">Expected Return</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-400">
                {asiPreview.keyInsights.expectedReturn.toFixed(1)}%
              </div>
              <p className="text-xs text-gray-500">1-year forecast</p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-medium text-gray-300">AI Recommendations</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-400">
                {asiPreview.keyInsights.recommendationsCount}
              </div>
              <p className="text-xs text-gray-500">Optimization suggestions</p>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Analysis Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Analysis Depth</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                  <option value="comprehensive">Comprehensive Analysis</option>
                  <option value="standard">Standard Analysis</option>
                  <option value="basic">Basic Analysis</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Time Horizon</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                  <option value="5Y">5 Years</option>
                  <option value="3Y">3 Years</option>
                  <option value="1Y">1 Year</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Advanced Features</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'AI Predictions & Forecasting',
                  'Behavioral Pattern Analysis',
                  'Market Sentiment Analysis',
                  'Portfolio Optimization'
                ].map((feature) => (
                  <label key={feature} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-600 bg-gray-700 text-blue-600"
                    />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Report History</h3>
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Analysis history will appear here after generating reports</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleASIDashboard;
