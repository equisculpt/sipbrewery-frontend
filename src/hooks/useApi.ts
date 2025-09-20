/**
 * 🔗 SIP BREWERY API HOOKS
 * 
 * React hooks for seamless backend integration
 * Provides loading states, error handling, and caching
 * 
 * @version 3.0.0 - Backend Integration
 * @author Frontend Integration Specialist
 */

import { useState, useEffect, useCallback } from 'react';
import { sipBreweryApi, ApiResponse, MutualFundScheme, ASIAnalysisResult, MarketData } from '../services/mutualFundApi';

// Generic API hook
export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.error || response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// System Health Hook
export function useSystemHealth() {
  return useApi(() => sipBreweryApi.getSystemHealth());
}

// Fund Data Hooks
export function useAllFunds() {
  return useApi(() => sipBreweryApi.getAllFunds());
}

export function useFundDetails(fundCode: string) {
  return useApi(
    () => sipBreweryApi.getFundDetails(fundCode),
    [fundCode]
  );
}

export function useTopPerformingFunds(category: string = 'ALL', period: string = '1Y') {
  return useApi(
    () => sipBreweryApi.getTopPerformingFunds(category, period),
    [category, period]
  );
}

// ASI Integration Hooks
export function useASIFundAnalysis(fundCode: string) {
  const [data, setData] = useState<ASIAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeWithASI = useCallback(async () => {
    if (!fundCode) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log(`🤖 Requesting ASI analysis for fund: ${fundCode}`);
      const response = await sipBreweryApi.getASIFundAnalysis(fundCode);
      
      if (response.success) {
        setData(response.data);
        console.log(`✅ ASI analysis completed for ${fundCode}:`, response.data);
      } else {
        setError(response.error || 'ASI analysis failed');
      }
    } catch (err) {
      console.error('ASI analysis error:', err);
      setError(err instanceof Error ? err.message : 'ASI analysis failed');
    } finally {
      setLoading(false);
    }
  }, [fundCode]);

  return { data, loading, error, analyzeWithASI };
}

export function useASIPortfolioOptimization() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const optimizePortfolio = useCallback(async (
    portfolio: Array<{ fund_code: string; allocation: number }>
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🎯 Requesting ASI portfolio optimization:', portfolio);
      const response = await sipBreweryApi.getASIPortfolioOptimization(portfolio);
      
      if (response.success) {
        setData(response.data);
        console.log('✅ Portfolio optimization completed:', response.data);
      } else {
        setError(response.error || 'Portfolio optimization failed');
      }
    } catch (err) {
      console.error('Portfolio optimization error:', err);
      setError(err instanceof Error ? err.message : 'Portfolio optimization failed');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, optimizePortfolio };
}

export function useASIMarketInsights() {
  return useApi(() => sipBreweryApi.getASIMarketInsights());
}

export function useASIFundComparison() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const compareFunds = useCallback(async (fundCodes: string[]) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('⚖️ Requesting ASI fund comparison:', fundCodes);
      const response = await sipBreweryApi.getASIFundComparison(fundCodes);
      
      if (response.success) {
        setData(response.data);
        console.log('✅ Fund comparison completed:', response.data);
      } else {
        setError(response.error || 'Fund comparison failed');
      }
    } catch (err) {
      console.error('Fund comparison error:', err);
      setError(err instanceof Error ? err.message : 'Fund comparison failed');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, compareFunds };
}

// Market Data Hooks
export function useMarketData() {
  return useApi(() => sipBreweryApi.getMarketData());
}

export function useLiveMarketIndices() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const response = await sipBreweryApi.getLiveMarketIndices();
        
        if (response.success) {
          setData(response.data);
        } else {
          setError(response.error || 'Failed to fetch market data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Market data error');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchMarketData();

    // Set up periodic updates every 30 seconds
    const interval = setInterval(fetchMarketData, 30000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}

// Real-time WebSocket Hook
export function useWebSocket() {
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);

  useEffect(() => {
    console.log('🔗 Establishing WebSocket connection...');
    
    const disconnect = sipBreweryApi.connectWebSocket((data: any) => {
      console.log('📡 WebSocket message received:', data);
      setLastMessage(data);
      setConnected(true);
    });

    return () => {
      console.log('🔌 Disconnecting WebSocket...');
      disconnect();
      setConnected(false);
    };
  }, []);

  return { connected, lastMessage };
}

// SIP Calculator Hook
export function useSIPCalculator() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateSIP = useCallback(async (
    monthlyAmount: number,
    duration: number,
    expectedReturn: number
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await sipBreweryApi.calculateSIP(monthlyAmount, duration, expectedReturn);
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.error || 'SIP calculation failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'SIP calculation failed');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, calculateSIP };
}

// User Portfolio Hook
export function useUserPortfolio() {
  return useApi(() => sipBreweryApi.getUserPortfolio());
}

// Search Hook
export function useSearch() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchFunds = useCallback(async (query: string) => {
    if (!query.trim()) {
      setData(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await sipBreweryApi.searchFunds(query);
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.error || 'Search failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, searchFunds };
}

// Market News Hook
export function useMarketNews() {
  return useApi(() => sipBreweryApi.getMarketNews());
}

// Custom hook for managing loading states across multiple API calls
export function useMultipleApiCalls() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: loading }));
  }, []);

  const setError = useCallback((key: string, error: string | null) => {
    setErrors(prev => ({ ...prev, [key]: error }));
  }, []);

  const isAnyLoading = Object.values(loadingStates).some(loading => loading);
  const hasAnyError = Object.values(errors).some(error => error !== null);

  return {
    loadingStates,
    errors,
    setLoading,
    setError,
    isAnyLoading,
    hasAnyError
  };
}
