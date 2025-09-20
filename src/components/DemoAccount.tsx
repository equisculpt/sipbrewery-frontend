'use client';

import React, { useState, useEffect } from 'react';

interface DemoUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  demo_balance: number;
  created_at: string;
  last_login: string;
}

interface Portfolio {
  user_id: string;
  total_invested: number;
  current_value: number;
  total_returns: number;
  return_percentage: number;
  holdings: Holding[];
  sip_investments: SIP[];
  updated_at: string;
}

interface Holding {
  fund_code: string;
  fund_name: string;
  invested_amount: number;
  current_value: number;
  units: number;
  return_amount: number;
  return_percentage: number;
  investment_date: string;
}

interface SIP {
  id: string;
  fund_code: string;
  fund_name: string;
  monthly_amount: number;
  duration_months: number;
  start_date: string;
  next_installment: string;
  total_invested: number;
  installments_completed: number;
  status: string;
}

interface Fund {
  code: string;
  name: string;
  category: string;
  nav: number;
  returns_1y: number;
  returns_3y: number;
  expense_ratio: number;
  risk: string;
}

interface Transaction {
  id: string;
  type: string;
  fund_code: string;
  fund_name: string;
  amount: number;
  status: string;
  date: string;
}

const DemoAccount: React.FC = () => {
  const [currentView, setCurrentView] = useState<'signup' | 'login' | 'dashboard'>('signup');
  const [user, setUser] = useState<DemoUser | null>(null);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [funds, setFunds] = useState<Fund[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [signupForm, setSignupForm] = useState({ name: '', email: '', phone: '' });
  const [loginForm, setLoginForm] = useState({ email: '' });
  const [investmentForm, setInvestmentForm] = useState({ fundCode: '', amount: 0 });
  const [sipForm, setSipForm] = useState({ fundCode: '', monthlyAmount: 0, duration: 12 });

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    fetchFunds();
    // Auto-refresh portfolio every 30 seconds if user is logged in
    if (user) {
      const interval = setInterval(() => {
        fetchPortfolio();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchFunds = async () => {
    try {
      // Mock data for demo mode
      const mockFunds: Fund[] = [
        {
          code: 'AXIS_BLUECHIP',
          name: 'Axis Bluechip Fund',
          category: 'Large Cap',
          nav: 45.67,
          returns_1y: 12.5,
          returns_3y: 15.2,
          expense_ratio: 1.8,
          risk: 'Moderate'
        },
        {
          code: 'SBI_SMALL_CAP',
          name: 'SBI Small Cap Fund',
          category: 'Small Cap',
          nav: 78.23,
          returns_1y: 18.7,
          returns_3y: 22.1,
          expense_ratio: 2.1,
          risk: 'High'
        },
        {
          code: 'HDFC_BALANCED',
          name: 'HDFC Balanced Advantage Fund',
          category: 'Hybrid',
          nav: 32.45,
          returns_1y: 10.8,
          returns_3y: 12.9,
          expense_ratio: 1.5,
          risk: 'Low'
        },
        {
          code: 'ICICI_TECH',
          name: 'ICICI Technology Fund',
          category: 'Sectoral',
          nav: 89.12,
          returns_1y: 25.3,
          returns_3y: 28.7,
          expense_ratio: 2.3,
          risk: 'High'
        },
        {
          code: 'KOTAK_EMERGING',
          name: 'Kotak Emerging Equity Fund',
          category: 'Mid Cap',
          nav: 56.78,
          returns_1y: 16.2,
          returns_3y: 19.5,
          expense_ratio: 1.9,
          risk: 'Moderate'
        },
        {
          code: 'UTI_NIFTY',
          name: 'UTI Nifty Index Fund',
          category: 'Index',
          nav: 23.89,
          returns_1y: 11.4,
          returns_3y: 13.8,
          expense_ratio: 0.5,
          risk: 'Low'
        }
      ];
      setFunds(mockFunds);
    } catch (error) {
      console.error('Failed to fetch funds:', error);
    }
  };

  const fetchPortfolio = async () => {
    if (!user) return;
    
    try {
      // Mock portfolio data for demo mode
      const mockPortfolio: Portfolio = {
        user_id: user.id,
        total_invested: 50000,
        current_value: 58750,
        total_returns: 8750,
        return_percentage: 17.5,
        holdings: [
          {
            fund_code: 'AXIS_BLUECHIP',
            fund_name: 'Axis Bluechip Fund',
            invested_amount: 20000,
            current_value: 23400,
            units: 512.45,
            return_amount: 3400,
            return_percentage: 17.0,
            investment_date: '2024-01-15'
          },
          {
            fund_code: 'SBI_SMALL_CAP',
            fund_name: 'SBI Small Cap Fund',
            invested_amount: 15000,
            current_value: 18750,
            units: 191.78,
            return_amount: 3750,
            return_percentage: 25.0,
            investment_date: '2024-02-10'
          },
          {
            fund_code: 'HDFC_BALANCED',
            fund_name: 'HDFC Balanced Advantage Fund',
            invested_amount: 15000,
            current_value: 16600,
            units: 462.31,
            return_amount: 1600,
            return_percentage: 10.67,
            investment_date: '2024-03-05'
          }
        ],
        sip_investments: [
          {
            id: 'sip_001',
            fund_code: 'AXIS_BLUECHIP',
            fund_name: 'Axis Bluechip Fund',
            monthly_amount: 5000,
            duration_months: 12,
            start_date: '2024-01-01',
            next_installment: '2024-08-01',
            total_invested: 35000,
            installments_completed: 7,
            status: 'Active'
          },
          {
            id: 'sip_002',
            fund_code: 'ICICI_TECH',
            fund_name: 'ICICI Technology Fund',
            monthly_amount: 3000,
            duration_months: 24,
            start_date: '2024-03-01',
            next_installment: '2024-08-01',
            total_invested: 15000,
            installments_completed: 5,
            status: 'Active'
          }
        ],
        updated_at: new Date().toISOString()
      };
      setPortfolio(mockPortfolio);
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
    }
  };

  const fetchTransactions = async () => {
    if (!user) return;
    
    try {
      // Mock transactions data for demo mode
      const mockTransactions: Transaction[] = [
        {
          id: 'txn_001',
          type: 'Purchase',
          fund_code: 'AXIS_BLUECHIP',
          fund_name: 'Axis Bluechip Fund',
          amount: 20000,
          status: 'Completed',
          date: '2024-01-15'
        },
        {
          id: 'txn_002',
          type: 'SIP',
          fund_code: 'AXIS_BLUECHIP',
          fund_name: 'Axis Bluechip Fund',
          amount: 5000,
          status: 'Completed',
          date: '2024-07-01'
        },
        {
          id: 'txn_003',
          type: 'Purchase',
          fund_code: 'SBI_SMALL_CAP',
          fund_name: 'SBI Small Cap Fund',
          amount: 15000,
          status: 'Completed',
          date: '2024-02-10'
        },
        {
          id: 'txn_004',
          type: 'SIP',
          fund_code: 'ICICI_TECH',
          fund_name: 'ICICI Technology Fund',
          amount: 3000,
          status: 'Completed',
          date: '2024-07-01'
        },
        {
          id: 'txn_005',
          type: 'Purchase',
          fund_code: 'HDFC_BALANCED',
          fund_name: 'HDFC Balanced Advantage Fund',
          amount: 15000,
          status: 'Completed',
          date: '2024-03-05'
        }
      ];
      setTransactions(mockTransactions);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock signup for demo mode
      const mockUser: DemoUser = {
        id: 'demo_user_' + Math.random().toString(36).substr(2, 9),
        name: signupForm.name,
        email: signupForm.email,
        phone: signupForm.phone,
        demo_balance: 100000,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString()
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(mockUser);
      setCurrentView('dashboard');
      localStorage.setItem('demoToken', 'demo_token_' + mockUser.id);
      
      // Fetch initial data
      fetchPortfolio();
      fetchTransactions();
    } catch (error) {
      setError('Failed to create demo account');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock login for demo mode
      const mockUser: DemoUser = {
        id: 'demo_user_returning',
        name: 'Demo User',
        email: loginForm.email,
        phone: '+91 9876543210',
        demo_balance: 100000,
        created_at: '2024-01-01T00:00:00.000Z',
        last_login: new Date().toISOString()
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(mockUser);
      setCurrentView('dashboard');
      localStorage.setItem('demoToken', 'demo_token_' + mockUser.id);
      
      // Fetch initial data
      fetchPortfolio();
      fetchTransactions();
    } catch (error) {
      setError('Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleInvestment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || investmentForm.amount <= 0) return;

    setLoading(true);
    const selectedFund = funds.find(f => f.code === investmentForm.fundCode);

    try {
      const response = await fetch(`${API_BASE}/api/demo/invest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          fundCode: investmentForm.fundCode,
          fundName: selectedFund?.name,
          amount: investmentForm.amount,
          investmentType: 'LUMPSUM'
        })
      });

      const data = await response.json();
      if (data.success) {
        setUser({ ...user, demo_balance: data.data.remaining_balance });
        setPortfolio(data.data.portfolio);
        setInvestmentForm({ fundCode: '', amount: 0 });
        fetchTransactions();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to invest');
    } finally {
      setLoading(false);
    }
  };

  const handleSIPCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || sipForm.monthlyAmount <= 0) return;

    setLoading(true);
    const selectedFund = funds.find(f => f.code === sipForm.fundCode);

    try {
      const response = await fetch(`${API_BASE}/api/demo/sip/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          fundCode: sipForm.fundCode,
          fundName: selectedFund?.name,
          monthlyAmount: sipForm.monthlyAmount,
          duration: sipForm.duration
        })
      });

      const data = await response.json();
      if (data.success) {
        fetchPortfolio();
        setSipForm({ fundCode: '', monthlyAmount: 0, duration: 12 });
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to create SIP');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'text-green-400';
      case 'MODERATE': return 'text-yellow-400';
      case 'HIGH': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  if (currentView === 'signup') {
    return (
      <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Create Demo Account</h2>
          <p className="text-gray-300 text-sm">Get ₹1,00,000 virtual money to start investing</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              required
              value={signupForm.name}
              onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={signupForm.email}
              onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Phone (Optional)</label>
            <input
              type="tel"
              value={signupForm.phone}
              onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
              placeholder="Enter your phone number"
            />
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {loading ? 'Creating Account...' : 'Create Demo Account'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setCurrentView('login')}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            Already have a demo account? Login here
          </button>
        </div>
      </div>
    );
  }

  if (currentView === 'login') {
    return (
      <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Login to Demo Account</h2>
          <p className="text-gray-300 text-sm">Access your virtual portfolio</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
              placeholder="Enter your email"
            />
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {loading ? 'Logging in...' : 'Login to Demo'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setCurrentView('signup')}
            className="text-green-400 hover:text-green-300 text-sm"
          >
            Don't have a demo account? Create one here
          </button>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome, {user?.name}!</h1>
            <p className="text-gray-300">Demo Balance: <span className="text-green-400 font-semibold">{formatCurrency(user?.demo_balance || 0)}</span></p>
          </div>
          <button
            onClick={() => {
              setUser(null);
              setPortfolio(null);
              setCurrentView('signup');
              localStorage.removeItem('demoToken');
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Portfolio Summary */}
      {portfolio && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
            <h3 className="text-gray-400 text-sm">Total Invested</h3>
            <p className="text-xl font-bold text-white">{formatCurrency(portfolio.total_invested)}</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
            <h3 className="text-gray-400 text-sm">Current Value</h3>
            <p className="text-xl font-bold text-white">{formatCurrency(portfolio.current_value)}</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
            <h3 className="text-gray-400 text-sm">Total Returns</h3>
            <p className={`text-xl font-bold ${portfolio.total_returns >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatCurrency(portfolio.total_returns)}
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
            <h3 className="text-gray-400 text-sm">Return %</h3>
            <p className={`text-xl font-bold ${portfolio.return_percentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {portfolio.return_percentage.toFixed(2)}%
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Investment Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Invest in Funds</h3>
          
          <form onSubmit={handleInvestment} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Select Fund</label>
              <select
                required
                value={investmentForm.fundCode}
                onChange={(e) => setInvestmentForm({ ...investmentForm, fundCode: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
              >
                <option value="">Choose a fund</option>
                {funds.map(fund => (
                  <option key={fund.code} value={fund.code}>
                    {fund.name} - {fund.category} ({fund.returns_1y}% 1Y)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Investment Amount</label>
              <input
                type="number"
                required
                min="500"
                max={user?.demo_balance || 0}
                value={investmentForm.amount || ''}
                onChange={(e) => setInvestmentForm({ ...investmentForm, amount: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                placeholder="Minimum ₹500"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !investmentForm.fundCode || investmentForm.amount < 500}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {loading ? 'Investing...' : 'Invest Now'}
            </button>
          </form>
        </div>

        {/* SIP Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Start SIP</h3>
          
          <form onSubmit={handleSIPCreation} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Select Fund</label>
              <select
                required
                value={sipForm.fundCode}
                onChange={(e) => setSipForm({ ...sipForm, fundCode: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
              >
                <option value="">Choose a fund</option>
                {funds.map(fund => (
                  <option key={fund.code} value={fund.code}>
                    {fund.name} - {fund.category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Monthly Amount</label>
              <input
                type="number"
                required
                min="500"
                value={sipForm.monthlyAmount || ''}
                onChange={(e) => setSipForm({ ...sipForm, monthlyAmount: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                placeholder="Minimum ₹500"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Duration (Months)</label>
              <select
                value={sipForm.duration}
                onChange={(e) => setSipForm({ ...sipForm, duration: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
              >
                <option value={12}>12 Months</option>
                <option value={24}>24 Months</option>
                <option value={36}>36 Months</option>
                <option value={60}>60 Months</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || !sipForm.fundCode || sipForm.monthlyAmount < 500}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {loading ? 'Creating SIP...' : 'Start SIP'}
            </button>
          </form>
        </div>
      </div>

      {/* Holdings */}
      {portfolio && portfolio.holdings.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Your Holdings</h3>
            <button
              onClick={fetchPortfolio}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
            >
              Refresh
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-gray-300 pb-2">Fund Name</th>
                  <th className="text-gray-300 pb-2">Invested</th>
                  <th className="text-gray-300 pb-2">Current Value</th>
                  <th className="text-gray-300 pb-2">Returns</th>
                  <th className="text-gray-300 pb-2">Return %</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.holdings.map((holding, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="text-white py-3">{holding.fund_name}</td>
                    <td className="text-white py-3">{formatCurrency(holding.invested_amount)}</td>
                    <td className="text-white py-3">{formatCurrency(holding.current_value)}</td>
                    <td className={`py-3 ${holding.return_amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {formatCurrency(holding.return_amount)}
                    </td>
                    <td className={`py-3 ${holding.return_percentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {holding.return_percentage.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Available Funds */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Available Demo Funds</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {funds.map(fund => (
            <div key={fund.code} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <h4 className="text-white font-semibold mb-2">{fund.name}</h4>
              <div className="space-y-1 text-sm">
                <p className="text-gray-300">Category: <span className="text-white">{fund.category}</span></p>
                <p className="text-gray-300">NAV: <span className="text-white">₹{fund.nav}</span></p>
                <p className="text-gray-300">1Y Return: <span className="text-green-400">{fund.returns_1y}%</span></p>
                <p className="text-gray-300">3Y Return: <span className="text-green-400">{fund.returns_3y}%</span></p>
                <p className="text-gray-300">Risk: <span className={getRiskColor(fund.risk)}>{fund.risk}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-500 rounded-lg p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
};

export default DemoAccount;
