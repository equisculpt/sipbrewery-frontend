/**
 * Analytics & Tax Reports API Service
 * Handles performance analytics, tax calculations, and reports
 */

import { apiClient, ApiResponse } from './apiClient';

export interface PerformanceReport {
  period: string;
  totalReturns: number;
  returnsPercent: number;
  xirr: number;
  benchmark: {
    name: string;
    returns: number;
  };
  alpha: number;
  beta: number;
  sharpeRatio: number;
  sortinoRatio: number;
  maxDrawdown: number;
  volatility: number;
  monthlyReturns: Array<{
    month: string;
    returns: number;
    returnsPercent: number;
  }>;
}

export interface TaxReport {
  financialYear: string;
  shortTermGains: number;
  longTermGains: number;
  dividendIncome: number;
  taxLiability: {
    stcg: number;
    ltcg: number;
    dividend: number;
    total: number;
  };
  transactions: TaxTransaction[];
  summary: {
    totalGains: number;
    totalTax: number;
    taxSavings: number;
  };
}

export interface TaxTransaction {
  id: string;
  type: 'BUY' | 'SELL' | 'DIVIDEND';
  schemeName: string;
  date: string;
  amount: number;
  units?: number;
  nav?: number;
  gainLoss?: number;
  taxCategory: 'STCG' | 'LTCG' | 'DIVIDEND' | 'NONE';
  taxAmount: number;
}

export interface PortfolioAnalytics {
  totalInvestment: number;
  currentValue: number;
  totalReturns: number;
  returnsPercent: number;
  xirr: number;
  dayChange: number;
  dayChangePercent: number;
  assetAllocation: {
    equity: number;
    debt: number;
    gold: number;
    hybrid: number;
  };
  topPerformers: Array<{
    schemeName: string;
    returns: number;
    returnsPercent: number;
  }>;
  underperformers: Array<{
    schemeName: string;
    returns: number;
    returnsPercent: number;
  }>;
}

export interface GoalAnalytics {
  goalId: string;
  goalName: string;
  targetAmount: number;
  currentAmount: number;
  progressPercent: number;
  monthlyRequired: number;
  onTrack: boolean;
  projectedCompletion: string;
  shortfall?: number;
}

class AnalyticsApiService {
  // Get performance report
  async getPerformanceReport(period: '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y' | 'ALL' = '1Y'): Promise<PerformanceReport> {
    try {
      const response = await apiClient.get<PerformanceReport>('/api/analytics/performance', { period });
      return response.data;
    } catch (error) {
      return this.getMockPerformanceReport(period);
    }
  }

  // Get tax report
  async getTaxReport(financialYear: string = '2025-26'): Promise<TaxReport> {
    try {
      const response = await apiClient.get<TaxReport>('/api/analytics/tax-report', { financialYear });
      return response.data;
    } catch (error) {
      return this.getMockTaxReport(financialYear);
    }
  }

  // Get portfolio analytics
  async getPortfolioAnalytics(): Promise<PortfolioAnalytics> {
    try {
      const response = await apiClient.get<PortfolioAnalytics>('/api/analytics/portfolio');
      return response.data;
    } catch (error) {
      return this.getMockPortfolioAnalytics();
    }
  }

  // Get goal analytics
  async getGoalAnalytics(): Promise<GoalAnalytics[]> {
    try {
      const response = await apiClient.get<GoalAnalytics[]>('/api/analytics/goals');
      return response.data;
    } catch (error) {
      return this.getMockGoalAnalytics();
    }
  }

  // Export tax report
  async exportTaxReport(financialYear: string, format: 'PDF' | 'EXCEL' = 'PDF'): Promise<Blob> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${baseURL}/api/analytics/tax-report/export?financialYear=${financialYear}&format=${format}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      return await response.blob();
    } catch (error) {
      // Return mock PDF blob
      return new Blob(['Mock Tax Report'], { type: 'application/pdf' });
    }
  }

  // Export performance report
  async exportPerformanceReport(period: string, format: 'PDF' | 'EXCEL' = 'PDF'): Promise<Blob> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${baseURL}/api/analytics/performance/export?period=${period}&format=${format}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      return await response.blob();
    } catch (error) {
      return new Blob(['Mock Performance Report'], { type: 'application/pdf' });
    }
  }

  // Mock data methods
  private getMockPerformanceReport(period: string): PerformanceReport {
    return {
      period,
      totalReturns: 75000,
      returnsPercent: 15.0,
      xirr: 16.5,
      benchmark: {
        name: 'Nifty 50',
        returns: 12.5
      },
      alpha: 3.5,
      beta: 1.05,
      sharpeRatio: 1.8,
      sortinoRatio: 2.1,
      maxDrawdown: -12.5,
      volatility: 18.3,
      monthlyReturns: [
        { month: '2025-03', returns: 12500, returnsPercent: 2.5 },
        { month: '2025-04', returns: 16000, returnsPercent: 3.2 },
        { month: '2025-05', returns: 9000, returnsPercent: 1.8 },
        { month: '2025-06', returns: 20000, returnsPercent: 4.0 },
        { month: '2025-07', returns: -5000, returnsPercent: -1.0 },
        { month: '2025-08', returns: 13500, returnsPercent: 2.7 },
        { month: '2025-09', returns: 8000, returnsPercent: 1.6 },
        { month: '2025-10', returns: 15000, returnsPercent: 3.0 },
        { month: '2025-11', returns: 11000, returnsPercent: 2.2 },
        { month: '2025-12', returns: 18000, returnsPercent: 3.6 },
        { month: '2026-01', returns: 14000, returnsPercent: 2.8 },
        { month: '2026-02', returns: 10000, returnsPercent: 2.0 }
      ]
    };
  }

  private getMockTaxReport(financialYear: string): TaxReport {
    const transactions: TaxTransaction[] = [
      {
        id: 'TX001',
        type: 'SELL',
        schemeName: 'HDFC Top 100 Fund',
        date: '2025-06-15',
        amount: 50000,
        units: 200,
        nav: 250,
        gainLoss: 10000,
        taxCategory: 'STCG',
        taxAmount: 1500
      },
      {
        id: 'TX002',
        type: 'SELL',
        schemeName: 'ICICI Prudential Bluechip Fund',
        date: '2025-09-20',
        amount: 75000,
        units: 300,
        nav: 250,
        gainLoss: 15000,
        taxCategory: 'LTCG',
        taxAmount: 1500
      },
      {
        id: 'TX003',
        type: 'DIVIDEND',
        schemeName: 'SBI Equity Hybrid Fund',
        date: '2025-12-10',
        amount: 5000,
        taxCategory: 'DIVIDEND',
        taxAmount: 1500
      }
    ];

    const stcg = 15000;
    const ltcg = 25000;
    const dividend = 5000;

    return {
      financialYear,
      shortTermGains: stcg,
      longTermGains: ltcg,
      dividendIncome: dividend,
      taxLiability: {
        stcg: stcg * 0.15,
        ltcg: Math.max(0, (ltcg - 100000) * 0.10),
        dividend: dividend * 0.30,
        total: (stcg * 0.15) + Math.max(0, (ltcg - 100000) * 0.10) + (dividend * 0.30)
      },
      transactions,
      summary: {
        totalGains: stcg + ltcg,
        totalTax: (stcg * 0.15) + Math.max(0, (ltcg - 100000) * 0.10) + (dividend * 0.30),
        taxSavings: 100000 * 0.10
      }
    };
  }

  private getMockPortfolioAnalytics(): PortfolioAnalytics {
    return {
      totalInvestment: 500000,
      currentValue: 575000,
      totalReturns: 75000,
      returnsPercent: 15.0,
      xirr: 16.5,
      dayChange: 2500,
      dayChangePercent: 0.44,
      assetAllocation: {
        equity: 60,
        debt: 25,
        gold: 10,
        hybrid: 5
      },
      topPerformers: [
        { schemeName: 'HDFC Small Cap Fund', returns: 25000, returnsPercent: 25.0 },
        { schemeName: 'ICICI Technology Fund', returns: 20000, returnsPercent: 20.0 },
        { schemeName: 'SBI Bluechip Fund', returns: 18000, returnsPercent: 18.0 }
      ],
      underperformers: [
        { schemeName: 'ABC Debt Fund', returns: 2000, returnsPercent: 4.0 },
        { schemeName: 'XYZ Balanced Fund', returns: 3000, returnsPercent: 6.0 }
      ]
    };
  }

  private getMockGoalAnalytics(): GoalAnalytics[] {
    return [
      {
        goalId: 'GOAL001',
        goalName: 'Retirement Fund',
        targetAmount: 10000000,
        currentAmount: 5000000,
        progressPercent: 50,
        monthlyRequired: 25000,
        onTrack: true,
        projectedCompletion: '2045-12-31'
      },
      {
        goalId: 'GOAL002',
        goalName: 'Child Education',
        targetAmount: 5000000,
        currentAmount: 1500000,
        progressPercent: 30,
        monthlyRequired: 35000,
        onTrack: false,
        projectedCompletion: '2035-06-30',
        shortfall: 500000
      },
      {
        goalId: 'GOAL003',
        goalName: 'Dream Home',
        targetAmount: 15000000,
        currentAmount: 3000000,
        progressPercent: 20,
        monthlyRequired: 50000,
        onTrack: true,
        projectedCompletion: '2040-12-31'
      }
    ];
  }
}

// Export singleton instance
export const analyticsApi = new AnalyticsApiService();
export default analyticsApi;
