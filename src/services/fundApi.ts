// Fund API Service - Real backend integration for fund details and investment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface FundDetails {
  id: string;
  name: string;
  fullName: string;
  category: string;
  nav: string;
  navChange: string;
  navChangePercent: string;
  aum: string;
  expenseRatio: string;
  rating: number;
  returns: {
    [key: string]: { value: string; positive: boolean };
  };
  riskometer: string;
  exitLoad: string;
  minSipAmount: number;
  minLumpsumAmount: number;
  benchmark: string;
  fundManager: string;
  inception: string;
  fsiPredictions: {
    [key: string]: number;
  };
}

export interface InvestmentRequest {
  fundId: string;
  investmentType: 'SIP' | 'Lumpsum';
  amount: number;
  startDate: string;
  sipFrequency?: string;
  duration?: number;
  bankAccount: string;
  isDynamicSIP?: boolean;
  dynamicRange?: { min: number; max: number };
  termsAccepted: boolean;
}

export interface InvestmentConfirmation {
  transactionId: string;
  status: 'pending' | 'confirmed' | 'failed';
  paymentUrl?: string;
  message: string;
}

class FundApiService {
  private async fetchApi(endpoint: string, options?: RequestInit) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Fund API Error (${endpoint}):`, error);
      throw error;
    }
  }

  async getFundDetails(fundId: string): Promise<FundDetails> {
    return this.fetchApi(`/funds/${fundId}`);
  }

  async searchFunds(query: string, filters?: {
    category?: string;
    riskLevel?: string;
    minAmount?: number;
    sortBy?: string;
  }): Promise<FundDetails[]> {
    const params = new URLSearchParams({ query, ...filters });
    return this.fetchApi(`/funds/search?${params}`);
  }

  async getFundPerformance(fundId: string, period: string = '1Y') {
    return this.fetchApi(`/funds/${fundId}/performance?period=${period}`);
  }

  async getFundComparison(fundIds: string[]) {
    return this.fetchApi('/funds/compare', {
      method: 'POST',
      body: JSON.stringify({ fundIds }),
    });
  }

  async initiateInvestment(investmentData: InvestmentRequest): Promise<InvestmentConfirmation> {
    return this.fetchApi('/investments/initiate', {
      method: 'POST',
      body: JSON.stringify(investmentData),
    });
  }

  async confirmInvestment(transactionId: string): Promise<InvestmentConfirmation> {
    return this.fetchApi(`/investments/${transactionId}/confirm`, {
      method: 'POST',
    });
  }

  async getInvestmentStatus(transactionId: string) {
    return this.fetchApi(`/investments/${transactionId}/status`);
  }
}

export const fundApi = new FundApiService();

// Demo data fallback for development
export const DEMO_FUND_DATA: FundDetails = {
  id: "hdfc-top-100",
  name: "HDFC Top 100 Fund",
  fullName: "HDFC Top 100 Fund - Direct Growth",
  category: "Large Cap Equity",
  nav: "847.32",
  navChange: "+2.45",
  navChangePercent: "0.29",
  aum: "45,678",
  expenseRatio: "0.45",
  rating: 4.5,
  returns: {
    "1Y": { value: "18.45", positive: true },
    "3Y": { value: "16.78", positive: true },
    "5Y": { value: "14.92", positive: true }
  },
  riskometer: "Moderately High",
  exitLoad: "1% if redeemed within 1 year",
  minSipAmount: 500,
  minLumpsumAmount: 5000,
  benchmark: "NIFTY 100 TRI",
  fundManager: "Rahul Baijal",
  inception: "Oct 30, 2010",
  fsiPredictions: {
    "1Y": 14.2,
    "2Y": 13.8,
    "3Y": 15.1,
    "5Y": 16.4,
    "10Y": 17.2,
    "15Y": 16.8
  }
};
