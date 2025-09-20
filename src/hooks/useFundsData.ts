import { useState, useEffect } from 'react';
import { fundApi, FundDetails } from '../services/fundApi';

export interface FundsFilters {
  category?: string;
  riskLevel?: string;
  minAmount?: number;
  returns?: string;
  aum?: string;
}

export const useFundsData = (searchQuery: string = '', filters: FundsFilters = {}, sortBy: string = 'popularity') => {
  const [funds, setFunds] = useState<FundDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Demo funds data
  const demoFunds: FundDetails[] = [
    {
      id: 'hdfc-top-100',
      name: 'HDFC Top 100 Fund',
      fullName: 'HDFC Top 100 Fund - Direct Growth',
      category: 'Large Cap',
      nav: '847.32',
      navChange: '+2.45',
      navChangePercent: '0.29',
      aum: '45,678',
      expenseRatio: '0.45',
      rating: 4.5,
      returns: {
        '1Y': { value: '18.45', positive: true },
        '3Y': { value: '16.78', positive: true },
        '5Y': { value: '14.92', positive: true }
      },
      riskometer: 'Moderately High',
      exitLoad: '1% if redeemed within 1 year',
      minSipAmount: 500,
      minLumpsumAmount: 5000,
      benchmark: 'NIFTY 100 TRI',
      fundManager: 'Rahul Baijal',
      inception: 'Oct 30, 2010',
      fsiPredictions: {
        '1Y': 14.2,
        '2Y': 13.8,
        '3Y': 15.1,
        '5Y': 16.4,
        '10Y': 17.2,
        '15Y': 16.8
      }
    },
    {
      id: 'axis-bluechip',
      name: 'Axis Bluechip Fund',
      fullName: 'Axis Bluechip Fund - Direct Growth',
      category: 'Large Cap',
      nav: '652.18',
      navChange: '-1.23',
      navChangePercent: '-0.19',
      aum: '32,456',
      expenseRatio: '0.52',
      rating: 4.2,
      returns: {
        '1Y': { value: '16.23', positive: true },
        '3Y': { value: '15.45', positive: true },
        '5Y': { value: '13.67', positive: true }
      },
      riskometer: 'Moderately High',
      exitLoad: '1% if redeemed within 1 year',
      minSipAmount: 500,
      minLumpsumAmount: 5000,
      benchmark: 'NIFTY 100 TRI',
      fundManager: 'Shreyash Devalkar',
      inception: 'Dec 30, 2009',
      fsiPredictions: {
        '1Y': 13.5,
        '2Y': 13.2,
        '3Y': 14.8,
        '5Y': 15.9,
        '10Y': 16.5,
        '15Y': 16.2
      }
    },
    {
      id: 'mirae-emerging-bluechip',
      name: 'Mirae Asset Emerging Bluechip',
      fullName: 'Mirae Asset Emerging Bluechip Fund - Direct Growth',
      category: 'Large & Mid Cap',
      nav: '789.45',
      navChange: '+3.67',
      navChangePercent: '0.47',
      aum: '28,934',
      expenseRatio: '0.68',
      rating: 4.7,
      returns: {
        '1Y': { value: '22.34', positive: true },
        '3Y': { value: '19.12', positive: true },
        '5Y': { value: '16.89', positive: true }
      },
      riskometer: 'High',
      exitLoad: '1% if redeemed within 1 year',
      minSipAmount: 1000,
      minLumpsumAmount: 5000,
      benchmark: 'NIFTY LargeMidcap 250 TRI',
      fundManager: 'Neelesh Surana',
      inception: 'Jul 19, 2010',
      fsiPredictions: {
        '1Y': 15.8,
        '2Y': 15.5,
        '3Y': 17.2,
        '5Y': 18.1,
        '10Y': 18.8,
        '15Y': 18.3
      }
    }
  ];

  const fetchFunds = async () => {
    setLoading(true);
    setError(null);

    try {
      // Try to fetch from API first
      const apiFilters = {
        category: filters.category !== 'All' ? filters.category : undefined,
        riskLevel: filters.riskLevel !== 'All' ? filters.riskLevel : undefined,
        minAmount: filters.minAmount,
        sortBy
      };

      const fundsData = await fundApi.searchFunds(searchQuery, apiFilters);
      setFunds(fundsData);
    } catch (err) {
      console.warn('Failed to fetch funds from API, using demo data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch funds');
      
      // Fallback to demo data with client-side filtering
      let filteredFunds = demoFunds.filter(fund => {
        const matchesSearch = fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             fund.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             fund.fundManager.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = !filters.category || filters.category === 'All' || fund.category === filters.category;
        const matchesRisk = !filters.riskLevel || filters.riskLevel === 'All' || fund.riskometer === filters.riskLevel;
        
        return matchesSearch && matchesCategory && matchesRisk;
      });

      // Sort demo data
      filteredFunds.sort((a, b) => {
        switch (sortBy) {
          case 'returns-1y': return parseFloat(b.returns['1Y'].value) - parseFloat(a.returns['1Y'].value);
          case 'returns-3y': return parseFloat(b.returns['3Y'].value) - parseFloat(a.returns['3Y'].value);
          case 'rating': return b.rating - a.rating;
          case 'aum': return parseFloat(b.aum.replace(',', '')) - parseFloat(a.aum.replace(',', ''));
          case 'expense-ratio': return parseFloat(a.expenseRatio) - parseFloat(b.expenseRatio);
          default: return 0;
        }
      });

      setFunds(filteredFunds);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunds();
  }, [searchQuery, filters, sortBy]);

  const refreshData = () => {
    fetchFunds();
  };

  return {
    funds,
    loading,
    error,
    refreshData,
    isDemo: !!error
  };
};
