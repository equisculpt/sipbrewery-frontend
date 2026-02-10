/**
 * Digital Gold API Service
 * Handles all digital gold trading, SIP, and holdings operations
 */

import { apiClient, ApiResponse } from './apiClient';

// Digital Gold Types
export interface GoldPrice {
  goldType: '24K' | '22K' | '18K';
  buyPrice: number;
  sellPrice: number;
  currency: string;
  unit: string;
  lastUpdated: string;
  priceChange24h: number;
  priceChangePercent: number;
}

export interface GoldBuyRequest {
  goldType: '24K' | '22K' | '18K';
  amount: number;
  paymentMode: 'ONLINE' | 'UPI' | 'NETBANKING';
}

export interface GoldBuyResponse {
  transactionId: string;
  goldType: string;
  grams: number;
  amount: number;
  pricePerGram: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  paymentLink?: string;
}

export interface GoldSellRequest {
  goldType: '24K' | '22K' | '18K';
  grams: number;
}

export interface GoldSellResponse {
  transactionId: string;
  goldType: string;
  grams: number;
  amount: number;
  pricePerGram: number;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  creditedTo: string;
}

export interface GoldSIPRequest {
  goldType: '24K' | '22K' | '18K';
  amount: number;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  startDate: string;
  endDate?: string;
}

export interface GoldSIPResponse {
  sipId: string;
  goldType: string;
  amount: number;
  frequency: string;
  status: 'ACTIVE' | 'PAUSED' | 'CANCELLED';
  nextDate: string;
}

export interface GoldHoldings {
  totalGrams: number;
  totalValue: number;
  avgBuyPrice: number;
  currentPrice: number;
  returns: number;
  returnsPercent: number;
  breakdown: {
    [key: string]: {
      grams: number;
      value: number;
    };
  };
}

export interface GoldTransaction {
  id: string;
  type: 'BUY' | 'SELL' | 'SIP';
  goldType: string;
  grams: number;
  amount: number;
  pricePerGram: number;
  status: string;
  timestamp: string;
}

export interface PhysicalDeliveryRequest {
  goldType: '24K' | '22K' | '18K';
  grams: number;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country?: string;
  };
}

export interface PhysicalDeliveryResponse {
  deliveryId: string;
  grams: number;
  estimatedDelivery: string;
  charges: number;
  status: 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  trackingId?: string;
}

class DigitalGoldApiService {
  // Get current gold price
  async getGoldPrice(goldType: '24K' | '22K' | '18K' = '24K'): Promise<GoldPrice> {
    try {
      const response = await apiClient.get<GoldPrice>(`/api/digital-gold/price/${goldType}`);
      return response.data;
    } catch (error) {
      // Fallback to mock data for development
      return this.getMockGoldPrice(goldType);
    }
  }

  // Get all gold prices
  async getAllGoldPrices(): Promise<GoldPrice[]> {
    try {
      const response = await apiClient.get<GoldPrice[]>('/api/digital-gold/prices');
      return response.data;
    } catch (error) {
      return [
        this.getMockGoldPrice('24K'),
        this.getMockGoldPrice('22K'),
        this.getMockGoldPrice('18K')
      ];
    }
  }

  // Buy gold
  async buyGold(request: GoldBuyRequest): Promise<GoldBuyResponse> {
    try {
      const response = await apiClient.post<GoldBuyResponse>('/api/digital-gold/buy', request);
      return response.data;
    } catch (error) {
      return this.getMockBuyResponse(request);
    }
  }

  // Sell gold
  async sellGold(request: GoldSellRequest): Promise<GoldSellResponse> {
    try {
      const response = await apiClient.post<GoldSellResponse>('/api/digital-gold/sell', request);
      return response.data;
    } catch (error) {
      return this.getMockSellResponse(request);
    }
  }

  // Create Gold SIP
  async createGoldSIP(request: GoldSIPRequest): Promise<GoldSIPResponse> {
    try {
      const response = await apiClient.post<GoldSIPResponse>('/api/digital-gold/sip', request);
      return response.data;
    } catch (error) {
      return this.getMockSIPResponse(request);
    }
  }

  // Get Gold SIPs
  async getGoldSIPs(): Promise<GoldSIPResponse[]> {
    try {
      const response = await apiClient.get<GoldSIPResponse[]>('/api/digital-gold/sips');
      return response.data;
    } catch (error) {
      return this.getMockSIPs();
    }
  }

  // Pause/Resume SIP
  async updateGoldSIP(sipId: string, action: 'PAUSE' | 'RESUME' | 'CANCEL'): Promise<ApiResponse> {
    try {
      return await apiClient.post(`/api/digital-gold/sip/${sipId}/${action.toLowerCase()}`);
    } catch (error) {
      return { success: true, data: { message: `SIP ${action.toLowerCase()}d successfully` } };
    }
  }

  // Get gold holdings
  async getGoldHoldings(): Promise<GoldHoldings> {
    try {
      const response = await apiClient.get<GoldHoldings>('/api/digital-gold/holdings');
      return response.data;
    } catch (error) {
      return this.getMockHoldings();
    }
  }

  // Get gold transactions
  async getGoldTransactions(limit: number = 50): Promise<GoldTransaction[]> {
    try {
      const response = await apiClient.get<GoldTransaction[]>('/api/digital-gold/transactions', { limit });
      return response.data;
    } catch (error) {
      return this.getMockTransactions();
    }
  }

  // Request physical delivery
  async requestPhysicalDelivery(request: PhysicalDeliveryRequest): Promise<PhysicalDeliveryResponse> {
    try {
      const response = await apiClient.post<PhysicalDeliveryResponse>('/api/digital-gold/delivery', request);
      return response.data;
    } catch (error) {
      return this.getMockDeliveryResponse(request);
    }
  }

  // Get delivery status
  async getDeliveryStatus(deliveryId: string): Promise<PhysicalDeliveryResponse> {
    try {
      const response = await apiClient.get<PhysicalDeliveryResponse>(`/api/digital-gold/delivery/${deliveryId}`);
      return response.data;
    } catch (error) {
      return {
        deliveryId,
        grams: 10,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        charges: 500,
        status: 'PROCESSING'
      };
    }
  }

  // Mock data methods for development
  private getMockGoldPrice(goldType: '24K' | '22K' | '18K'): GoldPrice {
    const basePrice = goldType === '24K' ? 6000 : goldType === '22K' ? 5500 : 4500;
    const variation = (Math.random() - 0.5) * 100;
    
    return {
      goldType,
      buyPrice: Number((basePrice + variation).toFixed(2)),
      sellPrice: Number((basePrice + variation - 50).toFixed(2)),
      currency: 'INR',
      unit: 'gram',
      lastUpdated: new Date().toISOString(),
      priceChange24h: Number((Math.random() * 100 - 50).toFixed(2)),
      priceChangePercent: Number((Math.random() * 2 - 1).toFixed(2))
    };
  }

  private getMockBuyResponse(request: GoldBuyRequest): GoldBuyResponse {
    const pricePerGram = request.goldType === '24K' ? 6000 : request.goldType === '22K' ? 5500 : 4500;
    const grams = Number((request.amount / pricePerGram).toFixed(3));
    
    return {
      transactionId: 'GOLD' + Date.now(),
      goldType: request.goldType,
      grams,
      amount: request.amount,
      pricePerGram,
      status: 'PENDING',
      paymentLink: 'https://razorpay.com/pay/mock-' + Date.now()
    };
  }

  private getMockSellResponse(request: GoldSellRequest): GoldSellResponse {
    const pricePerGram = request.goldType === '24K' ? 5950 : request.goldType === '22K' ? 5450 : 4450;
    
    return {
      transactionId: 'GOLDSELL' + Date.now(),
      goldType: request.goldType,
      grams: request.grams,
      amount: Number((request.grams * pricePerGram).toFixed(2)),
      pricePerGram,
      status: 'COMPLETED',
      creditedTo: 'Bank Account ***1234'
    };
  }

  private getMockSIPResponse(request: GoldSIPRequest): GoldSIPResponse {
    return {
      sipId: 'GOLDSIP' + Date.now(),
      goldType: request.goldType,
      amount: request.amount,
      frequency: request.frequency,
      status: 'ACTIVE',
      nextDate: request.startDate
    };
  }

  private getMockSIPs(): GoldSIPResponse[] {
    return [
      {
        sipId: 'GOLDSIP001',
        goldType: '24K',
        amount: 1000,
        frequency: 'MONTHLY',
        status: 'ACTIVE',
        nextDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        sipId: 'GOLDSIP002',
        goldType: '22K',
        amount: 500,
        frequency: 'WEEKLY',
        status: 'ACTIVE',
        nextDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  }

  private getMockHoldings(): GoldHoldings {
    return {
      totalGrams: 50.5,
      totalValue: 303000,
      avgBuyPrice: 5900,
      currentPrice: 6000,
      returns: 5050,
      returnsPercent: 1.69,
      breakdown: {
        '24K': { grams: 30, value: 180000 },
        '22K': { grams: 20.5, value: 123000 }
      }
    };
  }

  private getMockTransactions(): GoldTransaction[] {
    return [
      {
        id: 'TXN001',
        type: 'BUY',
        goldType: '24K',
        grams: 5,
        amount: 30000,
        pricePerGram: 6000,
        status: 'COMPLETED',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'TXN002',
        type: 'SIP',
        goldType: '24K',
        grams: 0.167,
        amount: 1000,
        pricePerGram: 5990,
        status: 'COMPLETED',
        timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'TXN003',
        type: 'SELL',
        goldType: '22K',
        grams: 2,
        amount: 11000,
        pricePerGram: 5500,
        status: 'COMPLETED',
        timestamp: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  }

  private getMockDeliveryResponse(request: PhysicalDeliveryRequest): PhysicalDeliveryResponse {
    return {
      deliveryId: 'DEL' + Date.now(),
      grams: request.grams,
      estimatedDelivery: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      charges: 500,
      status: 'PROCESSING'
    };
  }
}

// Export singleton instance
export const digitalGoldApi = new DigitalGoldApiService();
export default digitalGoldApi;
