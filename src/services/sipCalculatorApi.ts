const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface SIPCalculationParams {
  monthlyInvestment: number;
  expectedReturn: number;
  timePeriod: number;
  stepUpPercentage?: number;
  dynamicAdjustmentRange?: number;
}

export interface GoalBasedSIPParams {
  targetAmount: number;
  timePeriod: number;
  expectedReturn: number;
}

export interface SIPCalculationResult {
  calculationType: string;
  totalInvestment: number;
  maturityAmount: number;
  totalGains: number;
  absoluteReturn: string;
  annualizedReturn: string;
  yearlyBreakdown: Array<{
    year: number;
    monthlyAmount: number;
    yearlyInvestment: number;
    cumulativeInvestment: number;
    expectedValue: number;
    gains: number;
  }>;
  metadata: {
    monthlyInvestment: number;
    expectedReturn: number;
    timePeriod: number;
    calculatedAt: string;
  };
}

export interface DynamicSIPResult extends SIPCalculationResult {
  aiAdvantage: number;
  aiAdvantagePercentage: string;
  aiAnalysis: {
    totalAdjustments: number;
    avgAdjustment: string;
    maxPositiveAdjustment: string;
    maxNegativeAdjustment: string;
    marketCyclesDetected: number;
    volatilityCyclesDetected: number;
  };
}

export interface SIPComparisonResult {
  comparison: {
    regular: SIPCalculationResult;
    stepup: SIPCalculationResult;
    dynamic: DynamicSIPResult;
  };
  analysis: {
    bestPerformer: {
      type: string;
      maturityAmount: number;
      advantage: number;
    };
    stepUpAdvantage: number;
    dynamicAdvantage: number;
    recommendations: Array<{
      type: string;
      title: string;
      description: string;
      priority: string;
    }>;
  };
}

export interface GoalBasedSIPResult {
  targetAmount: number;
  requiredMonthlyInvestment: number;
  totalInvestment: number;
  totalGains: number;
  timePeriod: number;
  expectedReturn: number;
  feasibilityScore: {
    score: number;
    category: string;
    description: string;
  };
  alternatives: Array<{
    type: string;
    description: string;
    requiredMonthlyInvestment: number;
    savings: number;
  }>;
}

class SIPCalculatorAPI {
  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sip-calculator${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error(`SIP Calculator API Error (${endpoint}):`, error);
      throw error;
    }
  }

  /**
   * Calculate regular SIP returns
   */
  async calculateRegularSIP(params: SIPCalculationParams): Promise<SIPCalculationResult> {
    return this.makeRequest<SIPCalculationResult>('/regular', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  /**
   * Calculate step-up SIP returns
   */
  async calculateStepUpSIP(params: SIPCalculationParams): Promise<SIPCalculationResult> {
    return this.makeRequest<SIPCalculationResult>('/stepup', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  /**
   * Calculate dynamic SIP returns with AI adjustments
   */
  async calculateDynamicSIP(params: SIPCalculationParams): Promise<DynamicSIPResult> {
    return this.makeRequest<DynamicSIPResult>('/dynamic', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  /**
   * Compare all SIP calculation types
   */
  async compareSIPTypes(params: SIPCalculationParams): Promise<SIPComparisonResult> {
    return this.makeRequest<SIPComparisonResult>('/compare', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  /**
   * Calculate required SIP for a target goal
   */
  async calculateGoalBasedSIP(params: GoalBasedSIPParams): Promise<GoalBasedSIPResult> {
    return this.makeRequest<GoalBasedSIPResult>('/goal-based', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  /**
   * Quick SIP calculation with query parameters
   */
  async quickCalculate(params: SIPCalculationParams & { type?: 'regular' | 'stepup' | 'dynamic' }): Promise<SIPCalculationResult> {
    const queryParams = new URLSearchParams({
      monthlyInvestment: params.monthlyInvestment.toString(),
      expectedReturn: params.expectedReturn.toString(),
      timePeriod: params.timePeriod.toString(),
      ...(params.type && { type: params.type }),
    });

    return this.makeRequest<SIPCalculationResult>(`/quick-calculate?${queryParams}`, {
      method: 'GET',
    });
  }

  /**
   * Health check for SIP calculator service
   */
  async healthCheck(): Promise<{ service: string; status: string; version: string; features: string[] }> {
    return this.makeRequest<{ service: string; status: string; version: string; features: string[] }>('/health', {
      method: 'GET',
    });
  }

  /**
   * Get calculation based on type with fallback to client-side calculation
   */
  async getCalculationWithFallback(
    type: 'regular' | 'stepup' | 'dynamic',
    params: SIPCalculationParams
  ): Promise<SIPCalculationResult | DynamicSIPResult> {
    try {
      switch (type) {
        case 'regular':
          return await this.calculateRegularSIP(params);
        case 'stepup':
          return await this.calculateStepUpSIP(params);
        case 'dynamic':
          return await this.calculateDynamicSIP(params);
        default:
          return await this.calculateRegularSIP(params);
      }
    } catch (error) {
      console.warn('Backend calculation failed, falling back to client-side calculation:', error);
      
      // Fallback to client-side calculation
      return this.clientSideCalculation(type, params);
    }
  }

  /**
   * Client-side fallback calculation
   */
  private clientSideCalculation(
    type: 'regular' | 'stepup' | 'dynamic',
    params: SIPCalculationParams
  ): SIPCalculationResult {
    const { monthlyInvestment, expectedReturn, timePeriod, stepUpPercentage = 10 } = params;
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = timePeriod * 12;

    if (type === 'regular') {
      const totalInvestment = monthlyInvestment * totalMonths;
      const maturityAmount = monthlyInvestment * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
      const totalGains = maturityAmount - totalInvestment;

      const yearlyBreakdown = [];
      for (let year = 1; year <= timePeriod; year++) {
        const monthsCompleted = year * 12;
        const cumulativeInvestment = monthlyInvestment * monthsCompleted;
        const cumulativeValue = monthlyInvestment * (((Math.pow(1 + monthlyRate, monthsCompleted) - 1) / monthlyRate) * (1 + monthlyRate));
        
        yearlyBreakdown.push({
          year,
          monthlyAmount: monthlyInvestment,
          yearlyInvestment: monthlyInvestment * 12,
          cumulativeInvestment: Math.round(cumulativeInvestment),
          expectedValue: Math.round(cumulativeValue),
          gains: Math.round(cumulativeValue - cumulativeInvestment)
        });
      }

      return {
        calculationType: 'regular',
        totalInvestment: Math.round(totalInvestment),
        maturityAmount: Math.round(maturityAmount),
        totalGains: Math.round(totalGains),
        absoluteReturn: ((maturityAmount - totalInvestment) / totalInvestment * 100).toFixed(2),
        annualizedReturn: expectedReturn.toFixed(2),
        yearlyBreakdown,
        metadata: {
          monthlyInvestment,
          expectedReturn,
          timePeriod,
          calculatedAt: new Date().toISOString()
        }
      };
    }

    // For stepup and dynamic, return a simplified regular calculation as fallback
    return this.clientSideCalculation('regular', params);
  }
}

// Export singleton instance
export const sipCalculatorAPI = new SIPCalculatorAPI();
export default sipCalculatorAPI;
