/**
 * 🚀 SIP BREWERY BACKEND INTEGRATION SERVICE
 * 
 * Production-ready integration with backend API
 * Maintains demo functionality while enabling real backend connectivity
 */

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface HealthStatus {
  status: string;
  timestamp: string;
  version: string;
  uptime?: number;
  asi?: {
    rating: number;
    status: string;
    components: number;
  };
}

interface ASIAnalysisRequest {
  type: 'portfolio' | 'fund' | 'market';
  data: any;
}

interface ASIAnalysisResponse {
  success: boolean;
  analysis: string;
  rating: number;
  timestamp: string;
  recommendations?: string[];
}

class BackendIntegrationService {
  private baseUrl: string;
  private timeout: number;
  private enableIntegration: boolean;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    this.timeout = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '15000');
    this.enableIntegration = process.env.NEXT_PUBLIC_ENABLE_ASI === 'true';
  }

  /**
   * Check if backend integration is enabled
   */
  isIntegrationEnabled(): boolean {
    return this.enableIntegration;
  }

  /**
   * Generic API request handler with error handling and fallbacks
   */
  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.warn(`Backend API Error (${endpoint}):`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Check backend health status
   */
  async checkHealth(): Promise<ApiResponse<HealthStatus>> {
    return this.makeRequest<HealthStatus>('/health');
  }

  /**
   * Check backend readiness
   */
  async checkReadiness(): Promise<ApiResponse<any>> {
    return this.makeRequest('/ready');
  }

  /**
   * Get detailed system health
   */
  async getDetailedHealth(): Promise<ApiResponse<any>> {
    return this.makeRequest('/health/detailed');
  }

  /**
   * Get ASI system health and rating
   */
  async getASIHealth(): Promise<ApiResponse<any>> {
    return this.makeRequest('/api/asi/health');
  }

  /**
   * Perform ASI analysis
   */
  async performASIAnalysis(request: ASIAnalysisRequest): Promise<ApiResponse<ASIAnalysisResponse>> {
    return this.makeRequest<ASIAnalysisResponse>('/api/asi/analyze', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  /**
   * Test backend connectivity
   */
  async testConnectivity(): Promise<{
    connected: boolean;
    latency?: number;
    error?: string;
  }> {
    const startTime = Date.now();
    
    try {
      const response = await this.checkHealth();
      const latency = Date.now() - startTime;
      
      return {
        connected: response.success,
        latency: response.success ? latency : undefined,
        error: response.error,
      };
    } catch (error) {
      return {
        connected: false,
        error: error instanceof Error ? error.message : 'Connection failed',
      };
    }
  }

  /**
   * Get backend system information
   */
  async getSystemInfo(): Promise<ApiResponse<any>> {
    return this.makeRequest('/');
  }
}

// Demo data fallbacks when backend is not available
export const demoData = {
  health: {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '3.0.0-demo',
    asi: {
      rating: 9.2,
      status: 'operational',
      components: 150,
    },
  },
  
  portfolioAnalysis: {
    success: true,
    analysis: 'Demo portfolio analysis completed successfully',
    rating: 9.2,
    timestamp: new Date().toISOString(),
    recommendations: [
      'Consider rebalancing your equity allocation',
      'Increase SIP amount for better long-term growth',
      'Review fund performance quarterly',
    ],
  },

  systemInfo: {
    message: 'SIP Brewery Finance ASI Platform - Demo Mode',
    description: 'Demo mode with simulated data',
    version: '3.0.0-demo',
    rating: '10/10 Production Ready',
    features: {
      asiRating: 9.2,
      components: 150,
      financeOnly: true,
      productionReady: true,
      demoMode: true,
    },
  },
};

// Create singleton instance
export const backendIntegration = new BackendIntegrationService();

// Utility functions for components
export const useBackendIntegration = () => {
  return {
    service: backendIntegration,
    isEnabled: backendIntegration.isIntegrationEnabled(),
    demoData,
  };
};

export default BackendIntegrationService;
