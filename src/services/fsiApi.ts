/**
 * FSI (Financial Services Intelligence) API Service
 * Handles AI-powered financial analysis and chatbot interactions
 */

import { apiClient, ApiResponse } from './apiClient';

// FSI Analysis Types
export interface FSIAnalysisRequest {
  type: 'fund' | 'stock' | 'portfolio' | 'market';
  symbol?: string;
  data?: any;
  analysisType?: string;
  timeframe?: string;
}

export interface FSIAnalysisResult {
  id: string;
  type: string;
  symbol?: string;
  analysis: {
    score: number;
    recommendation: 'BUY' | 'SELL' | 'HOLD';
    confidence: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    expectedReturn: number;
    timeHorizon: string;
  };
  insights: string[];
  technicalIndicators?: {
    trend: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
    momentum: number;
    volatility: number;
    support: number[];
    resistance: number[];
  };
  fundamentalMetrics?: {
    peRatio?: number;
    expenseRatio?: number;
    aum?: string;
    nav?: number;
    returns: {
      '1Y': number;
      '3Y': number;
      '5Y': number;
    };
  };
  aiInsights: {
    summary: string;
    keyPoints: string[];
    risks: string[];
    opportunities: string[];
  };
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  analysisData?: FSIAnalysisResult;
  suggestions?: string[];
}

export interface ChatResponse {
  message: string;
  analysis?: FSIAnalysisResult;
  suggestions?: string[];
  followUpQuestions?: string[];
}

export interface PortfolioOptimizationRequest {
  currentPortfolio: {
    holdings: Array<{
      symbol: string;
      allocation: number;
      value: number;
    }>;
    totalValue: number;
  };
  objective: 'maximize_returns' | 'minimize_risk' | 'balanced' | 'income_focused';
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  timeHorizon: string;
  constraints?: {
    maxSingleAllocation?: number;
    minDiversification?: number;
    excludeAssets?: string[];
  };
}

export interface PortfolioOptimizationResult {
  currentPortfolio: {
    value: number;
    expectedReturn: number;
    risk: number;
    sharpeRatio: number;
  };
  optimizedPortfolio: {
    expectedReturn: number;
    risk: number;
    sharpeRatio: number;
    improvementScore: number;
  };
  recommendations: Array<{
    action: 'BUY' | 'SELL' | 'HOLD' | 'REBALANCE';
    asset: string;
    currentWeight: number;
    recommendedWeight: number;
    reason: string;
    impact: string;
  }>;
  assetAllocation: {
    current: Record<string, number>;
    optimized: Record<string, number>;
  };
  implementation: {
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    timeframe: string;
    steps: string[];
    estimatedCost: number;
    expectedBenefit: string;
  };
}

export interface MarketInsight {
  id: string;
  title: string;
  description: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'MARKET' | 'SECTOR' | 'ECONOMIC' | 'REGULATORY';
  timestamp: string;
  relevantAssets: string[];
  aiAnalysis: string;
}

export interface RiskAssessment {
  portfolioId: string;
  overallRisk: number;
  riskCategory: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
  riskFactors: Array<{
    factor: string;
    impact: number;
    description: string;
    mitigation: string;
  }>;
  diversificationScore: number;
  concentrationRisk: number;
  marketRisk: number;
  specificRisk: number;
  recommendations: string[];
}

class FSIApiService {
  // Chat and AI Analysis
  async sendChatMessage(message: string, context?: any): Promise<ChatResponse> {
    try {
      const response = await apiClient.post<ChatResponse>('/api/fsi/chat', {
        message,
        context,
        timestamp: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      // Fallback to mock response for development
      return this.getMockChatResponse(message);
    }
  }

  async getFSIAnalysis(request: FSIAnalysisRequest): Promise<FSIAnalysisResult> {
    try {
      const response = await apiClient.post<FSIAnalysisResult>('/api/fsi/analyze', request);
      return response.data;
    } catch (error) {
      // Fallback to mock analysis
      return this.getMockAnalysis(request);
    }
  }

  // Fund Analysis
  async analyzeFund(fundCode: string, analysisType: string = 'comprehensive'): Promise<FSIAnalysisResult> {
    return this.getFSIAnalysis({
      type: 'fund',
      symbol: fundCode,
      analysisType,
      timeframe: '1Y'
    });
  }

  // Stock Analysis
  async analyzeStock(stockSymbol: string, analysisType: string = 'comprehensive'): Promise<FSIAnalysisResult> {
    return this.getFSIAnalysis({
      type: 'stock',
      symbol: stockSymbol,
      analysisType,
      timeframe: '1Y'
    });
  }

  // Portfolio Optimization
  async optimizePortfolio(request: PortfolioOptimizationRequest): Promise<PortfolioOptimizationResult> {
    try {
      const response = await apiClient.post<PortfolioOptimizationResult>('/api/fsi/portfolio/optimize', request);
      return response.data;
    } catch (error) {
      return this.getMockPortfolioOptimization(request);
    }
  }

  // Market Insights
  async getMarketInsights(category?: string, limit: number = 10): Promise<MarketInsight[]> {
    try {
      const response = await apiClient.get<MarketInsight[]>('/api/fsi/market/insights', {
        category,
        limit
      });
      return response.data;
    } catch (error) {
      return this.getMockMarketInsights();
    }
  }

  // Risk Assessment
  async assessRisk(portfolioData: any): Promise<RiskAssessment> {
    try {
      const response = await apiClient.post<RiskAssessment>('/api/fsi/risk/assess', portfolioData);
      return response.data;
    } catch (error) {
      return this.getMockRiskAssessment();
    }
  }

  // Quantum Predictions (Advanced AI)
  async getQuantumPredictions(symbol: string, timeframe: string = '3M'): Promise<any> {
    try {
      const response = await apiClient.get(`/api/fsi/quantum/predictions/${symbol}`, {
        timeframe
      });
      return response.data;
    } catch (error) {
      return this.getMockQuantumPredictions(symbol);
    }
  }

  // Fund Comparison
  async compareFunds(fundCodes: string[]): Promise<any> {
    try {
      const response = await apiClient.post('/api/fsi/funds/compare', {
        funds: fundCodes,
        analysisType: 'comprehensive'
      });
      return response.data;
    } catch (error) {
      return this.getMockFundComparison(fundCodes);
    }
  }

  // Stock Comparison
  async compareStocks(stockSymbols: string[]): Promise<any> {
    try {
      const response = await apiClient.post('/api/fsi/stocks/compare', {
        stocks: stockSymbols,
        analysisType: 'comprehensive'
      });
      return response.data;
    } catch (error) {
      return this.getMockStockComparison(stockSymbols);
    }
  }

  // Mock Data Methods (for development/fallback)
  private getMockChatResponse(message: string): ChatResponse {
    const responses = [
      {
        message: "I've analyzed your query. Based on current market conditions and AI insights, here's my recommendation:",
        suggestions: ["Consider diversifying your portfolio", "Look into SIP investments", "Review your risk tolerance"]
      },
      {
        message: "Great question! Let me provide you with some AI-powered insights on this topic:",
        suggestions: ["Explore large-cap funds", "Consider ELSS for tax benefits", "Review expense ratios"]
      }
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  private getMockAnalysis(request: FSIAnalysisRequest): FSIAnalysisResult {
    return {
      id: `analysis_${Date.now()}`,
      type: request.type,
      symbol: request.symbol,
      analysis: {
        score: 75 + Math.random() * 20,
        recommendation: ['BUY', 'HOLD', 'SELL'][Math.floor(Math.random() * 3)] as any,
        confidence: 70 + Math.random() * 25,
        riskLevel: ['LOW', 'MEDIUM', 'HIGH'][Math.floor(Math.random() * 3)] as any,
        expectedReturn: 8 + Math.random() * 10,
        timeHorizon: '1-3 years'
      },
      insights: [
        "Strong fundamentals with consistent performance",
        "Good diversification across sectors",
        "Reasonable expense ratio compared to peers"
      ],
      technicalIndicators: {
        trend: 'BULLISH',
        momentum: 65,
        volatility: 18.5,
        support: [100, 95, 90],
        resistance: [120, 125, 130]
      },
      fundamentalMetrics: {
        expenseRatio: 1.2,
        aum: '₹5,000 Cr',
        nav: 115.50,
        returns: {
          '1Y': 12.5,
          '3Y': 15.2,
          '5Y': 13.8
        }
      },
      aiInsights: {
        summary: "This asset shows strong potential with balanced risk-return profile",
        keyPoints: ["Consistent performance", "Good management", "Reasonable valuation"],
        risks: ["Market volatility", "Sector concentration"],
        opportunities: ["Growth potential", "Dividend yield"]
      },
      timestamp: new Date().toISOString()
    };
  }

  private getMockPortfolioOptimization(request: PortfolioOptimizationRequest): PortfolioOptimizationResult {
    return {
      currentPortfolio: {
        value: request.currentPortfolio.totalValue,
        expectedReturn: 10.5,
        risk: 15.2,
        sharpeRatio: 0.69
      },
      optimizedPortfolio: {
        expectedReturn: 12.8,
        risk: 14.1,
        sharpeRatio: 0.91,
        improvementScore: 85
      },
      recommendations: [
        {
          action: 'REBALANCE',
          asset: 'Large Cap Equity',
          currentWeight: 40,
          recommendedWeight: 35,
          reason: 'Reduce concentration risk',
          impact: 'Lower portfolio volatility'
        },
        {
          action: 'BUY',
          asset: 'Mid Cap Equity',
          currentWeight: 20,
          recommendedWeight: 25,
          reason: 'Enhance growth potential',
          impact: 'Increase expected returns'
        }
      ],
      assetAllocation: {
        current: { 'Large Cap': 40, 'Mid Cap': 20, 'Debt': 30, 'Gold': 10 },
        optimized: { 'Large Cap': 35, 'Mid Cap': 25, 'Debt': 25, 'Gold': 15 }
      },
      implementation: {
        priority: 'MEDIUM',
        timeframe: '2-3 months',
        steps: ['Reduce large cap allocation', 'Increase mid cap exposure', 'Rebalance quarterly'],
        estimatedCost: 2500,
        expectedBenefit: 'Improved risk-adjusted returns'
      }
    };
  }

  private getMockMarketInsights(): MarketInsight[] {
    return [
      {
        id: 'insight_1',
        title: 'Technology Sector Outlook',
        description: 'AI and cloud computing driving growth in tech stocks',
        impact: 'HIGH',
        category: 'SECTOR',
        timestamp: new Date().toISOString(),
        relevantAssets: ['INFY', 'TCS', 'HCLTECH'],
        aiAnalysis: 'Strong fundamentals support continued growth'
      },
      {
        id: 'insight_2',
        title: 'Interest Rate Impact',
        description: 'RBI policy changes affecting debt fund performance',
        impact: 'MEDIUM',
        category: 'ECONOMIC',
        timestamp: new Date().toISOString(),
        relevantAssets: ['Debt Funds', 'Banking Stocks'],
        aiAnalysis: 'Monitor for duration risk in debt portfolios'
      }
    ];
  }

  private getMockRiskAssessment(): RiskAssessment {
    return {
      portfolioId: `portfolio_${Date.now()}`,
      overallRisk: 65,
      riskCategory: 'MEDIUM',
      riskFactors: [
        {
          factor: 'Market Risk',
          impact: 40,
          description: 'Exposure to market volatility',
          mitigation: 'Diversify across asset classes'
        },
        {
          factor: 'Concentration Risk',
          impact: 25,
          description: 'High allocation to single sector',
          mitigation: 'Reduce sector concentration'
        }
      ],
      diversificationScore: 75,
      concentrationRisk: 30,
      marketRisk: 40,
      specificRisk: 25,
      recommendations: [
        'Increase diversification across sectors',
        'Consider adding international exposure',
        'Review and rebalance quarterly'
      ]
    };
  }

  private getMockQuantumPredictions(symbol: string): any {
    return {
      symbol,
      predictions: {
        '1M': { price: 120, confidence: 75, direction: 'UP' },
        '3M': { price: 135, confidence: 68, direction: 'UP' },
        '6M': { price: 145, confidence: 60, direction: 'UP' }
      },
      aiInsights: 'Quantum analysis suggests positive momentum',
      riskFactors: ['Market volatility', 'Sector rotation']
    };
  }

  private getMockFundComparison(fundCodes: string[]): any {
    return {
      funds: fundCodes.map(code => ({
        code,
        name: `Fund ${code}`,
        score: 70 + Math.random() * 25,
        returns: {
          '1Y': 8 + Math.random() * 10,
          '3Y': 10 + Math.random() * 8,
          '5Y': 12 + Math.random() * 6
        },
        risk: 15 + Math.random() * 10,
        expenseRatio: 1 + Math.random() * 1.5
      })),
      winner: fundCodes[0],
      analysis: 'Comprehensive comparison based on risk-adjusted returns'
    };
  }

  private getMockStockComparison(stockSymbols: string[]): any {
    return {
      stocks: stockSymbols.map(symbol => ({
        symbol,
        name: `Stock ${symbol}`,
        score: 65 + Math.random() * 30,
        price: 100 + Math.random() * 200,
        returns: {
          '1Y': 5 + Math.random() * 15,
          '3Y': 8 + Math.random() * 12,
          '5Y': 10 + Math.random() * 10
        },
        pe: 15 + Math.random() * 20,
        marketCap: '₹10,000 Cr'
      })),
      winner: stockSymbols[0],
      analysis: 'Fundamental and technical analysis comparison'
    };
  }
}

// Export singleton instance
export const fsiApi = new FSIApiService();
export default fsiApi;
