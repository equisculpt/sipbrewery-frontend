'use client';

import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  Target, 
  Download, 
  RefreshCw, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

interface ASIScore {
  overallScore: number;
  scoreInterpretation: string;
  factorScores: {
    performance: number;
    riskAdjustedReturns: number;
    diversification: number;
    costEfficiency: number;
    taxEfficiency: number;
  };
  weights: {
    performance: number;
    riskAdjustedReturns: number;
    diversification: number;
    costEfficiency: number;
    taxEfficiency: number;
  };
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

interface ASIAnalysisOptions {
  analysisDepth: 'basic' | 'standard' | 'comprehensive' | 'institutional';
  includeAIPredictions: boolean;
  includeBehavioralAnalysis: boolean;
  includeMarketSentiment: boolean;
  includeOptimizationSuggestions: boolean;
  timeHorizon: '1Y' | '3Y' | '5Y' | '10Y';
}

const ASIDashboard: React.FC = () => {
  const [asiScore, setAsiScore] = useState<ASIScore | null>(null);
  const [asiPreview, setAsiPreview] = useState<ASIPreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  
  const [analysisOptions, setAnalysisOptions] = useState<ASIAnalysisOptions>({
    analysisDepth: 'comprehensive',
    includeAIPredictions: true,
    includeBehavioralAnalysis: true,
    includeMarketSentiment: true,
    includeOptimizationSuggestions: true,
    timeHorizon: '5Y'
  });

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const userId = 'demo-user'; // Replace with actual user ID from auth context

  // Fetch ASI Score
  const fetchASIScore = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE}/api/asi/score/${userId}`, {
        headers: {
          'Authorization': `Bearer demo-token`, // Replace with actual token
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setAsiScore(data.data);
        setLastUpdated(data.data.lastUpdated);
      } else {
        setError(data.message || 'Failed to fetch ASI score');
      }
    } catch (err) {
      setError('Network error while fetching ASI score');
      console.error('ASI Score fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch ASI Preview
  const fetchASIPreview = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/asi/preview/${userId}?timeHorizon=${analysisOptions.timeHorizon}`, {
        headers: {
          'Authorization': `Bearer demo-token`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setAsiPreview(data.data);
      }
    } catch (err) {
      console.error('ASI Preview fetch error:', err);
    }
  };

  // Generate ASI Report
  const generateASIReport = async () => {
    setGenerating(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE}/api/asi/generate/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer demo-token`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(analysisOptions)
      });
      
      if (response.ok) {
        // Handle PDF download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ASI_Portfolio_Analysis_${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        // Refresh data after successful generation
        await fetchASIScore();
        await fetchASIPreview();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to generate ASI report');
      }
    } catch (err) {
      setError('Network error while generating ASI report');
      console.error('ASI Report generation error:', err);
    } finally {
      setGenerating(false);
    }
  };

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Get score badge variant
  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  useEffect(() => {
    fetchASIScore();
    fetchASIPreview();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Brain className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ASI Portfolio Analysis</h1>
            <p className="text-gray-600">Artificial Stock Intelligence • Advanced AI-Powered Insights</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => { fetchASIScore(); fetchASIPreview(); }}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={generateASIReport}
            disabled={generating}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Download className={`h-4 w-4 mr-2 ${generating ? 'animate-spin' : ''}`} />
            {generating ? 'Generating...' : 'Generate Report'}
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ASI Score Overview */}
      {asiScore && (
        <Card className="border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-blue-600" />
                <span>Overall ASI Score</span>
              </span>
              <Badge variant={getScoreBadgeVariant(asiScore.overallScore)} className="text-lg px-3 py-1">
                {asiScore.overallScore}/100
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Score Interpretation</span>
                  <span className={`text-2xl font-bold ${getScoreColor(asiScore.overallScore)}`}>
                    {asiScore.overallScore}
                  </span>
                </div>
                <Progress value={asiScore.overallScore} className="h-3 mb-3" />
                <p className="text-sm text-gray-600">{asiScore.scoreInterpretation}</p>
                {lastUpdated && (
                  <p className="text-xs text-gray-500 mt-2 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Last updated: {new Date(lastUpdated).toLocaleString()}
                  </p>
                )}
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Factor Breakdown</h4>
                {Object.entries(asiScore.factorScores).map(([factor, score]) => (
                  <div key={factor} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{factor.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">{Math.round(score)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Options and Preview */}
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preview">Quick Insights</TabsTrigger>
          <TabsTrigger value="options">Analysis Options</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          {asiPreview && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                    Performance Attribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    +{asiPreview.keyInsights.performanceAttribution.toFixed(1)}%
                  </div>
                  <p className="text-xs text-gray-600">Active return contribution</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-orange-600" />
                    Risk Level
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    {asiPreview.keyInsights.riskLevel.toFixed(1)}%
                  </div>
                  <p className="text-xs text-gray-600">Portfolio volatility</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2 text-blue-600" />
                    Expected Return
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {asiPreview.keyInsights.expectedReturn.toFixed(1)}%
                  </div>
                  <p className="text-xs text-gray-600">1-year forecast</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-purple-600" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    {asiPreview.keyInsights.recommendationsCount}
                  </div>
                  <p className="text-xs text-gray-600">Optimization suggestions</p>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="options" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customize Your ASI Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Analysis Depth</label>
                    <Select 
                      value={analysisOptions.analysisDepth} 
                      onValueChange={(value: any) => setAnalysisOptions(prev => ({ ...prev, analysisDepth: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic Analysis</SelectItem>
                        <SelectItem value="standard">Standard Analysis</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                        <SelectItem value="institutional">Institutional Grade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Time Horizon</label>
                    <Select 
                      value={analysisOptions.timeHorizon} 
                      onValueChange={(value: any) => setAnalysisOptions(prev => ({ ...prev, timeHorizon: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1Y">1 Year</SelectItem>
                        <SelectItem value="3Y">3 Years</SelectItem>
                        <SelectItem value="5Y">5 Years</SelectItem>
                        <SelectItem value="10Y">10 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-3 block">Include Advanced Features</label>
                    <div className="space-y-3">
                      {[
                        { key: 'includeAIPredictions', label: 'AI Predictions & Forecasting' },
                        { key: 'includeBehavioralAnalysis', label: 'Behavioral Pattern Analysis' },
                        { key: 'includeMarketSentiment', label: 'Market Sentiment Analysis' },
                        { key: 'includeOptimizationSuggestions', label: 'Portfolio Optimization' }
                      ].map(({ key, label }) => (
                        <div key={key} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={key}
                            checked={analysisOptions[key as keyof ASIAnalysisOptions] as boolean}
                            onChange={(e) => setAnalysisOptions(prev => ({ 
                              ...prev, 
                              [key]: e.target.checked 
                            }))}
                            className="rounded border-gray-300"
                          />
                          <label htmlFor={key} className="text-sm">{label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ASI Analysis History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Analysis history will appear here after generating reports</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ASIDashboard;
