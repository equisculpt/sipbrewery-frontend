import { useState, useEffect } from 'react';
import { fundApi, FundDetails, DEMO_FUND_DATA } from '../services/fundApi';

export const useFundData = (fundId: string, useDemoData: boolean = false) => {
  const [data, setData] = useState<FundDetails>(DEMO_FUND_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFundData = async () => {
    if (useDemoData) {
      setData(DEMO_FUND_DATA);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fundData = await fundApi.getFundDetails(fundId);
      setData(fundData);
    } catch (err) {
      console.warn('Failed to fetch real fund data, falling back to demo data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch fund data');
      setData(DEMO_FUND_DATA);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fundId) {
      fetchFundData();
    }
  }, [fundId, useDemoData]);

  const refreshData = () => {
    fetchFundData();
  };

  return {
    data,
    loading,
    error,
    refreshData,
    isDemo: useDemoData || !!error
  };
};
