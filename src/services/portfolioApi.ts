// Portfolio API Service - Real backend integration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface PortfolioData {
  totalInvested: number;
  currentValue: number;
  profit: number;
  xirr: number;
  holdings: Holding[];
  growthData: GrowthPoint[];
  allocationData: AllocationPoint[];
}

export interface Holding {
  symbol: string;
  name: string;
  category: string;
  qty: number;
  avgPrice: number;
  ltp: number;
  invested: number;
  current: number;
  pnl: number;
  pnlPct: number;
}

export interface GrowthPoint {
  date: string;
  invested: number;
  value: number;
  xirr: number;
}

export interface AllocationPoint {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

class PortfolioApiService {
  private async fetchApi(endpoint: string, options?: RequestInit) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Portfolio API Error (${endpoint}):`, error);
      throw error;
    }
  }

  async getPortfolioSummary(): Promise<PortfolioData> {
    return this.fetchApi('/portfolio/summary');
  }

  async getPortfolioGrowth(period: '1M' | '3M' | '6M' | '1Y' | '2Y' | '5Y' = '1Y'): Promise<GrowthPoint[]> {
    return this.fetchApi(`/portfolio/growth?period=${period}`);
  }

  async getPortfolioAllocation(): Promise<AllocationPoint[]> {
    return this.fetchApi('/portfolio/allocation');
  }

  async getHoldings(): Promise<Holding[]> {
    return this.fetchApi('/portfolio/holdings');
  }

  async analyzePortfolio(portfolioData: any) {
    return this.fetchApi('/portfolio/analyze', {
      method: 'POST',
      body: JSON.stringify(portfolioData),
    });
  }

  async getTopPerformers(category: string = 'ALL', period: string = '1Y') {
    return this.fetchApi(`/funds/top-performers?category=${category}&period=${period}`);
  }

  async searchFunds(query: string, filters?: any) {
    const params = new URLSearchParams({ query, ...filters });
    return this.fetchApi(`/funds/search?${params}`);
  }
}

export const portfolioApi = new PortfolioApiService();

// Fallback data for development/demo mode
export const DEMO_DATA: PortfolioData = {
  totalInvested: 120000,
  currentValue: 165000,
  profit: 45000,
  xirr: 27.5,
  holdings: [
    {
      symbol: "HDFCBF",
      name: "HDFC Balanced Advantage",
      category: "Hybrid",
      qty: 120.5,
      avgPrice: 287.3,
      ltp: 312.9,
      invested: 34619.65,
      current: 37705.45,
      pnl: 3085.8,
      pnlPct: 8.91
    },
    // Add more demo holdings...
  ],
  growthData: [
    { date: 'Jan', invested: 10000, value: 10000, xirr: 0 },
    { date: 'Feb', invested: 20000, value: 22000, xirr: 15.2 },
    { date: 'Mar', invested: 30000, value: 32500, xirr: 18.7 },
    // Add more demo data...
  ],
  allocationData: [
    { name: 'Large Cap Equity', value: 57750, percentage: 35, color: '#3B82F6' },
    { name: 'Mid Cap Equity', value: 41250, percentage: 25, color: '#10B981' },
    { name: 'Small Cap Equity', value: 24750, percentage: 15, color: '#F59E0B' },
    { name: 'Debt Funds', value: 16500, percentage: 10, color: '#EF4444' },
    { name: 'International Funds', value: 16500, percentage: 10, color: '#8B5CF6' },
    { name: 'ELSS', value: 8250, percentage: 5, color: '#EC4899' },
  ]
};
