// Investment API Service - Backend integration for investment flow
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface InvestmentData {
  fundId: string;
  fundName: string;
  investmentType: 'SIP' | 'Lumpsum';
  amount: number;
  frequency?: string;
  duration?: number;
  startDate: string;
  paymentMethod: string;
  isDynamicSIP?: boolean;
  dynamicRange?: { min: number; max: number };
  expectedReturn: number;
  projection: {
    invested: number;
    returns: number;
    total: number;
  };
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  paymentUrl?: string;
  message: string;
}

class InvestmentApiService {
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
      console.error(`Investment API Error (${endpoint}):`, error);
      throw error;
    }
  }

  async createInvestment(investmentData: InvestmentData): Promise<PaymentResponse> {
    return this.fetchApi('/investments/create', {
      method: 'POST',
      body: JSON.stringify(investmentData),
    });
  }

  async processPayment(transactionId: string, paymentDetails: any): Promise<PaymentResponse> {
    return this.fetchApi(`/investments/${transactionId}/payment`, {
      method: 'POST',
      body: JSON.stringify(paymentDetails),
    });
  }

  async getInvestmentHistory(userId?: string) {
    const endpoint = userId ? `/investments/history/${userId}` : '/investments/history';
    return this.fetchApi(endpoint);
  }

  async cancelInvestment(transactionId: string) {
    return this.fetchApi(`/investments/${transactionId}/cancel`, {
      method: 'POST',
    });
  }

  async updateSIP(sipId: string, updates: Partial<InvestmentData>) {
    return this.fetchApi(`/investments/sip/${sipId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }
}

export const investmentApi = new InvestmentApiService();
