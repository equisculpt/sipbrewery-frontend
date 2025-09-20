/**
 * 🚀 SIP BREWERY API INTEGRATION SERVICE
 * 
 * Connects Next.js frontend to Node.js backend
 * Integrates with Universe-Class ASI System
 * 
 * @version 3.0.0 - Backend Integration
 * @author Frontend Integration Specialist
 */

// Backend API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const ASI_API_BASE = `${API_BASE_URL}/api/asi`;
const FUND_API_BASE = `${API_BASE_URL}/api/funds`;
const MARKET_API_BASE = `${API_BASE_URL}/api/market`;

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string;
}

interface MutualFundScheme {
  code: string;
  name: string;
  category: string;
  aum: string;
  expense_ratio: number;
  nav_history_url: string;
}

interface ChartData {
  scheme: {
    code: string;
    name: string;
    category: string;
    aum: string;
    expense_ratio: number;
  };
  period: string;
  candles: Array<{
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    nav: number;
  }>;
  indicators: {
    moving_averages: {
      sma_20: Array<{ index: number; value: number }>;
      sma_50: Array<{ index: number; value: number }>;
      sma_100: Array<{ index: number; value: number }>;
      sma_200: Array<{ index: number; value: number }>;
      ema_12: Array<{ index: number; value: number }>;
      ema_26: Array<{ index: number; value: number }>;
      ema_50: Array<{ index: number; value: number }>;
    };
    oscillators: {
      rsi: Array<{ index: number; value: number }>;
      macd: {
        macd: Array<{ index: number; value: number }>;
        signal: Array<{ index: number; value: number }>;
        histogram: Array<{ index: number; value: number }>;
      };
      stochastic: {
        k: Array<{ index: number; value: number }>;
        d: Array<{ index: number; value: number }>;
      };
    };
    volatility: {
      bollinger_bands: {
        upper: Array<{ index: number; value: number }>;
        middle: Array<{ index: number; value: number }>;
        lower: Array<{ index: number; value: number }>;
      };
    };
    volume: {
      volume_sma: Array<{ index: number; value: number }>;
    };
  };
  statistics: {
    total_return: number;
    annualized_return: number;
    volatility: number;
    sharpe_ratio: number;
    max_drawdown: number;
    current_nav: number;
  };
  metadata: {
    total_records: number;
    start_date: string;
    end_date: string;
    last_updated: string;
  };
}

interface ComparisonData {
  period: string;
  comparison: Array<{
    scheme: {
      code: string;
      name: string;
      category: string;
      aum: string;
      expense_ratio: number;
    };
    returns: number;
    start_nav: number;
    end_nav: number;
    volatility: number;
    sharpe_ratio: number;
    max_drawdown: number;
  }>;
  best_performer: {
    scheme: {
      code: string;
      name: string;
      category: string;
      aum: string;
      expense_ratio: number;
    };
    returns: number;
    start_nav: number;
    end_nav: number;
    volatility: number;
    sharpe_ratio: number;
    max_drawdown: number;
  };
  metadata: {
    compared_schemes: number;
    analysis_date: string;
  };
}

// ASI Analysis Result Interface
interface ASIAnalysisResult {
  fund_code: string;
  analysis: {
    score: number;
    recommendation: string;
    risk_level: string;
    expected_return: number;
    confidence: number;
  };
  insights: string[];
  timestamp: string;
}

// Market Data Interface
interface MarketData {
  index: string;
  value: number;
  change: number;
  change_percent: number;
  timestamp: string;
}

// Portfolio Analysis Interface
interface PortfolioAnalysis {
  total_value: number;
  total_return: number;
  risk_score: number;
  diversification_score: number;
  recommendations: string[];
  holdings: Array<{
    fund_code: string;
    allocation: number;
    value: number;
    return: number;
  }>;
}

// SIP Calculation Result Interface
interface SIPCalculationResult {
  monthly_sip: number;
  duration_years: number;
  expected_return: number;
  maturity_amount: number;
  total_invested: number;
  wealth_gained: number;
  projections: Array<{
    year: number;
    invested: number;
    value: number;
  }>;
}

// Market Insight Interface
interface MarketInsight {
  title: string;
  description: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  category: string;
  timestamp: string;
}

class MutualFundApiService {
  private static instance: MutualFundApiService;
  private authToken: string | null = null;

  private constructor() {
    // Initialize with token from localStorage if available
    if (typeof window !== 'undefined') {
      this.authToken = localStorage.getItem('authToken');
    }
  }

  public static getInstance(): MutualFundApiService {
    if (!MutualFundApiService.instance) {
      MutualFundApiService.instance = new MutualFundApiService();
    }
    return MutualFundApiService.instance;
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    try {
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.warn(`API request failed for ${endpoint}:`, error);
      
      // Return mock data for development when backend is not available
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.log('Backend not available, returning mock data for development');
        return this.getMockData<T>(endpoint);
      }
      
      throw error;
    }
  }

  private getMockData<T>(endpoint: string): ApiResponse<T> {
    // Return mock data based on endpoint
    if (endpoint.includes('/mutual-funds/chart/')) {
      return {
        success: true,
        message: 'Mock data for development',
        data: this.getMockChartData() as T
      };
    }
    
    // Default mock response
    return {
      success: false,
      message: 'Backend service unavailable - please start the backend server',
      data: {} as T,
      error: 'Connection failed'
    };
  }

  private getMockChartData(): ChartData {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const mockCandles = [];
    
    // Generate 30 days of mock data
    for (let i = 29; i >= 0; i--) {
      const time = now - (i * oneDay);
      const basePrice = 100 + Math.sin(i * 0.1) * 10;
      const open = basePrice + (Math.random() - 0.5) * 2;
      const close = open + (Math.random() - 0.5) * 3;
      const high = Math.max(open, close) + Math.random() * 2;
      const low = Math.min(open, close) - Math.random() * 2;
      
      mockCandles.push({
        time: Math.floor(time / 1000),
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000),
        nav: Number(close.toFixed(2))
      });
    }
    
    return {
      scheme: {
        code: 'DEMO001',
        name: 'Demo Mutual Fund',
        category: 'Large Cap',
        aum: '₹1,000 Cr',
        expense_ratio: 1.2
      },
      period: '1M',
      candles: mockCandles,
      indicators: {
        moving_averages: {
          sma_20: mockCandles.map((_, i) => ({ index: i, value: 100 + Math.random() * 10 })),
          sma_50: mockCandles.map((_, i) => ({ index: i, value: 95 + Math.random() * 10 })),
          sma_100: mockCandles.map((_, i) => ({ index: i, value: 90 + Math.random() * 10 })),
          sma_200: mockCandles.map((_, i) => ({ index: i, value: 85 + Math.random() * 10 })),
          ema_12: mockCandles.map((_, i) => ({ index: i, value: 102 + Math.random() * 8 })),
          ema_26: mockCandles.map((_, i) => ({ index: i, value: 98 + Math.random() * 8 })),
          ema_50: mockCandles.map((_, i) => ({ index: i, value: 94 + Math.random() * 8 }))
        },
        oscillators: {
          rsi: mockCandles.map((_, i) => ({ index: i, value: 30 + Math.random() * 40 })),
          macd: {
            macd: mockCandles.map((_, i) => ({ index: i, value: (Math.random() - 0.5) * 2 })),
            signal: mockCandles.map((_, i) => ({ index: i, value: (Math.random() - 0.5) * 1.5 })),
            histogram: mockCandles.map((_, i) => ({ index: i, value: (Math.random() - 0.5) * 1 }))
          },
          stochastic: {
            k: mockCandles.map((_, i) => ({ index: i, value: 20 + Math.random() * 60 })),
            d: mockCandles.map((_, i) => ({ index: i, value: 25 + Math.random() * 50 }))
          }
        },
        volatility: {
          bollinger_bands: {
            upper: mockCandles.map((_, i) => ({ index: i, value: 105 + Math.random() * 5 })),
            middle: mockCandles.map((_, i) => ({ index: i, value: 100 + Math.random() * 3 })),
            lower: mockCandles.map((_, i) => ({ index: i, value: 95 + Math.random() * 5 }))
          }
        },
        volume: {
          volume_sma: mockCandles.map((_, i) => ({ index: i, value: 500000 + Math.random() * 200000 }))
        }
      },
      statistics: {
        total_return: 12.5,
        annualized_return: 15.2,
        volatility: 18.3,
        sharpe_ratio: 1.2,
        max_drawdown: -8.5,
        current_nav: mockCandles[mockCandles.length - 1].nav
      },
      metadata: {
        total_records: mockCandles.length,
        start_date: new Date(now - 29 * oneDay).toISOString().split('T')[0],
        end_date: new Date(now).toISOString().split('T')[0],
        last_updated: new Date().toISOString()
      }
    };
  }

  // Authentication
  public setAuthToken(token: string): void {
    this.authToken = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  public clearAuthToken(): void {
    this.authToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  // Get all supported mutual fund schemes
  public async getSupportedSchemes(): Promise<ApiResponse<{
    schemes: MutualFundScheme[];
    total_count: number;
    categories: string[];
  }>> {
    return this.makeRequest('/mutual-funds/schemes');
  }

  // Get TradingView-style chart data for a scheme
  public async getChartData(
    schemeCode: string, 
    period: '1M' | '3M' | '6M' | '1Y' | '2Y' | '3Y' | '5Y' | 'MAX' = '1Y'
  ): Promise<ApiResponse<ChartData>> {
    return this.makeRequest(`/mutual-funds/chart/${schemeCode}?period=${period}`);
  }

  // Compare multiple mutual fund schemes
  public async compareSchemes(
    schemes: string[], 
    period: '1M' | '3M' | '6M' | '1Y' | '2Y' | '3Y' | '5Y' = '1Y'
  ): Promise<ApiResponse<ComparisonData>> {
    return this.makeRequest('/mutual-funds/compare', {
      method: 'POST',
      body: JSON.stringify({ schemes, period }),
    });
  }

  // Get top performing schemes by category
  public async getTopPerformers(
    category: 'ALL' | 'Large Cap' | 'Mid Cap' | 'Small Cap' | 'Multi Cap' | 'Hybrid' = 'ALL',
    period: '1M' | '3M' | '6M' | '1Y' | '2Y' | '3Y' | '5Y' = '1Y',
    limit: number = 10
  ): Promise<ApiResponse<{
    category: string;
    period: string;
    top_performers: Array<{
      scheme: {
        code: string;
        name: string;
        category: string;
        aum: string;
        expense_ratio: number;
      };
      returns: number;
      start_nav: number;
      end_nav: number;
      volatility: number;
      sharpe_ratio: number;
      max_drawdown: number;
    }>;
    metadata: {
      total_analyzed: number;
      analysis_date: string;
    };
  }>> {
    return this.makeRequest(`/mutual-funds/top-performers?category=${category}&period=${period}&limit=${limit}`);
  }

  // Get detailed technical analysis
  public async getTechnicalAnalysis(
    schemeCode: string,
    period: '1M' | '3M' | '6M' | '1Y' | '2Y' | '3Y' | '5Y' = '1Y'
  ): Promise<ApiResponse<{
    scheme: {
      code: string;
      name: string;
      category: string;
      aum: string;
      expense_ratio: number;
    };
    period: string;
    trend_analysis: {
      overall_trend: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
      short_term: 'BULLISH' | 'BEARISH';
      medium_term: 'BULLISH' | 'BEARISH';
      strength: number;
    };
    support_resistance: {
      support_levels: number[];
      resistance_levels: number[];
    };
    momentum_analysis: {
      rsi_signal: 'OVERBOUGHT' | 'OVERSOLD' | 'NEUTRAL';
      macd_signal: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
      momentum_score: number;
    };
    volume_analysis: {
      volume_trend: 'INCREASING' | 'DECREASING' | 'STABLE';
      volume_confirmation: boolean;
    };
    signals: {
      buy_signals: string[];
      sell_signals: string[];
      overall_signal: 'BUY' | 'SELL' | 'HOLD';
      confidence: number;
    };
    risk_metrics: {
      volatility: number;
      var_95: number;
      beta: number;
      correlation_with_market: number;
    };
    forecast: {
      short_term_outlook: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
      target_price: number;
      probability: number;
    };
  }>> {
    return this.makeRequest(`/mutual-funds/technical-analysis/${schemeCode}?period=${period}`);
  }

  // Analyze portfolio
  public async analyzePortfolio(
    portfolio: Array<{
      scheme_code: string;
      allocation: number;
    }>,
    period: '1M' | '3M' | '6M' | '1Y' | '2Y' | '3Y' | '5Y' = '1Y'
  ): Promise<ApiResponse<{
    portfolio_composition: Array<{
      scheme_code: string;
      allocation: number;
    }>;
    period: string;
    performance_metrics: {
      total_return: number;
      annualized_return: number;
      volatility: number;
      sharpe_ratio: number;
      sortino_ratio: number;
      max_drawdown: number;
    };
    risk_analysis: {
      portfolio_beta: number;
      var_95: number;
      cvar_95: number;
      correlation_matrix: number[][];
    };
    diversification_analysis: {
      diversification_ratio: number;
      concentration_risk: number;
      sector_allocation: Record<string, number>;
    };
    rebalancing_suggestions: Array<{
      scheme_code: string;
      current_allocation: number;
      suggested_allocation: number;
      reason: string;
    }>;
    optimization_suggestions: {
      efficient_frontier: Array<{
        risk: number;
        return: number;
        allocation: Record<string, number>;
      }>;
      optimal_allocation: Record<string, number>;
      improvement_potential: number;
    };
  }>> {
    return this.makeRequest('/mutual-funds/portfolio-analysis', {
      method: 'POST',
      body: JSON.stringify({ portfolio, period }),
    });
  }

  // Real-time data subscription (WebSocket)
  public subscribeToRealTimeData(
    schemeCode: string,
    callback: (data: any) => void
  ): () => void {
    // In a real implementation, this would establish a WebSocket connection
    // For now, we'll simulate with periodic polling
    const interval = setInterval(async () => {
      try {
        const response = await this.getChartData(schemeCode, '1M');
        if (response.success) {
          callback(response.data);
        }
      } catch (error) {
        console.error('Real-time data subscription error:', error);
      }
    }, 30000); // Update every 30 seconds

    // Return unsubscribe function
    return () => clearInterval(interval);
  }

  // Market status
  public async getMarketStatus(): Promise<ApiResponse<{
    is_market_open: boolean;
    market_hours: {
      open: string;
      close: string;
    };
    next_market_day: string;
    current_time: string;
    timezone: string;
  }>> {
    return this.makeRequest('/market/status');
  }

  // Get market indices for context
  public async getMarketIndices(): Promise<ApiResponse<{
    indices: Array<{
      name: string;
      value: number;
      change: number;
      change_percent: number;
      last_updated: string;
    }>;
  }>> {
    return this.makeRequest('/market/indices');
  }
}

// Export singleton instance and types
export const mutualFundApi = MutualFundApiService.getInstance();
export const sipBreweryApi = mutualFundApi; // Alias for compatibility
export default mutualFundApi;

// Export types for use in components
export type {
  ApiResponse,
  MutualFundScheme,
  ChartData,
  ComparisonData,
  ASIAnalysisResult,
  MarketData,
  PortfolioAnalysis,
  SIPCalculationResult,
  MarketInsight
};
