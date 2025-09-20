import { useState, useEffect } from 'react';
import { portfolioApi, PortfolioData, DEMO_DATA } from '../services/portfolioApi';

export const usePortfolioData = (useDemoData: boolean = false) => {
  const [data, setData] = useState<PortfolioData>(DEMO_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolioData = async () => {
    if (useDemoData) {
      setData(DEMO_DATA);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const portfolioData = await portfolioApi.getPortfolioSummary();
      setData(portfolioData);
    } catch (err) {
      console.warn('Failed to fetch real data, falling back to demo data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolio data');
      setData(DEMO_DATA); // Fallback to demo data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, [useDemoData]);

  const refreshData = () => {
    fetchPortfolioData();
  };

  return {
    data,
    loading,
    error,
    refreshData,
    isDemo: useDemoData || !!error
  };
};
