'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  ArrowLeft, DollarSign, Calculator, Calendar, Target, 
  TrendingUp, Shield, Clock, CheckCircle, AlertCircle,
  CreditCard, Wallet, Building, Smartphone, Info
} from 'lucide-react';
import PayTMStyleNavigation from '../../components/PayTMStyleNavigation';

const InvestmentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [investmentType, setInvestmentType] = useState('sip');
  const [amount, setAmount] = useState('5000');
  const [sipFrequency, setSipFrequency] = useState('monthly');
  const [sipDate, setSipDate] = useState('1');
  const [duration, setDuration] = useState('5');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isLoading, setIsLoading] = useState(false);
  
  const fundId = searchParams.get('fundId');
  const fundName = searchParams.get('fundName') || 'Mutual Fund';

  // Mock fund data
  const fundData = {
    name: decodeURIComponent(fundName),
    nav: 89.45,
    minInvestment: 500,
    minSIP: 500,
    expenseRatio: 1.8,
    rating: 4,
    category: 'Large Cap'
  };

  // Calculate projected returns
  const calculateReturns = () => {
    const monthlyAmount = parseInt(amount);
    const years = parseInt(duration);
    const annualReturn = 0.12; // 12% assumed return
    
    if (investmentType === 'sip') {
      const months = years * 12;
      const monthlyReturn = annualReturn / 12;
      const futureValue = monthlyAmount * (((1 + monthlyReturn) ** months - 1) / monthlyReturn) * (1 + monthlyReturn);
      const totalInvested = monthlyAmount * months;
      const gains = futureValue - totalInvested;
      
      return {
        totalInvested,
        futureValue: Math.round(futureValue),
        gains: Math.round(gains)
      };
    } else {
      const futureValue = monthlyAmount * ((1 + annualReturn) ** years);
      const gains = futureValue - monthlyAmount;
      
      return {
        totalInvested: monthlyAmount,
        futureValue: Math.round(futureValue),
        gains: Math.round(gains)
      };
    }
  };

  const projections = calculateReturns();

  const handleInvest = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    // Show success message or redirect
    alert(`Investment of ₹${amount} ${investmentType === 'sip' ? 'SIP' : 'lumpsum'} initiated successfully!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <PayTMStyleNavigation />
      
      <div className="container mx-auto px-6 py-8 pt-24">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-blue-400/50 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Invest in Fund</h1>
            <p className="text-gray-300">{fundData.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Investment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Fund Summary */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Fund Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">₹{fundData.nav}</div>
                  <div className="text-sm text-gray-400">Current NAV</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{fundData.rating}/5</div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{fundData.expenseRatio}%</div>
                  <div className="text-sm text-gray-400">Expense Ratio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{fundData.category}</div>
                  <div className="text-sm text-gray-400">Category</div>
                </div>
              </div>
            </div>

            {/* Investment Type */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Investment Type</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setInvestmentType('sip')}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    investmentType === 'sip'
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                      : 'bg-white/5 border-white/20 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <Calendar className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">SIP</div>
                  <div className="text-sm">Systematic Investment</div>
                </button>
                <button
                  onClick={() => setInvestmentType('lumpsum')}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    investmentType === 'lumpsum'
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                      : 'bg-white/5 border-white/20 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <DollarSign className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Lumpsum</div>
                  <div className="text-sm">One-time Investment</div>
                </button>
              </div>
            </div>

            {/* Investment Amount */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                {investmentType === 'sip' ? 'Monthly SIP Amount' : 'Investment Amount'}
              </h3>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full h-14 bg-white/5 hover:bg-white/10 focus:bg-white/15 border border-white/20 hover:border-white/40 focus:border-blue-400/60 rounded-xl text-white placeholder-gray-300 focus:outline-none transition-all duration-300 pl-12 pr-4 text-lg font-semibold"
                  placeholder="Enter amount"
                  min={investmentType === 'sip' ? fundData.minSIP : fundData.minInvestment}
                />
              </div>
              <div className="flex space-x-2 mt-4">
                {['1000', '2500', '5000', '10000'].map(preset => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset)}
                    className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                      amount === preset
                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                        : 'bg-white/5 border-white/20 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    ₹{preset}
                  </button>
                ))}
              </div>
            </div>

            {/* SIP Configuration */}
            {investmentType === 'sip' && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">SIP Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Frequency</label>
                    <select
                      value={sipFrequency}
                      onChange={(e) => setSipFrequency(e.target.value)}
                      className="w-full h-12 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400/60 px-4"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">SIP Date</label>
                    <select
                      value={sipDate}
                      onChange={(e) => setSipDate(e.target.value)}
                      className="w-full h-12 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400/60 px-4"
                    >
                      {Array.from({ length: 28 }, (_, i) => i + 1).map(date => (
                        <option key={date} value={date.toString()}>{date}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Investment Duration */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Investment Duration</h3>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full h-14 bg-white/5 hover:bg-white/10 focus:bg-white/15 border border-white/20 hover:border-white/40 focus:border-blue-400/60 rounded-xl text-white placeholder-gray-300 focus:outline-none transition-all duration-300 pl-12 pr-16 text-lg font-semibold"
                  placeholder="Years"
                  min="1"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">Years</span>
              </div>
              <div className="flex space-x-2 mt-4">
                {['1', '3', '5', '10'].map(preset => (
                  <button
                    key={preset}
                    onClick={() => setDuration(preset)}
                    className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                      duration === preset
                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                        : 'bg-white/5 border-white/20 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {preset}Y
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Payment Method</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 'upi', label: 'UPI', icon: Smartphone },
                  { id: 'netbanking', label: 'Net Banking', icon: Building },
                  { id: 'card', label: 'Debit Card', icon: CreditCard },
                  { id: 'wallet', label: 'Wallet', icon: Wallet }
                ].map(method => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      paymentMethod === method.id
                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                        : 'bg-white/5 border-white/20 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <method.icon className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">{method.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Investment Summary */}
          <div className="space-y-6">
            {/* Projections */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-white mb-6">Investment Projection</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Invested</span>
                  <span className="text-white font-semibold">₹{projections.totalInvested.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Expected Returns</span>
                  <span className="text-green-400 font-semibold">₹{projections.gains.toLocaleString()}</span>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Future Value</span>
                    <span className="text-2xl font-bold text-blue-400">₹{projections.futureValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-400 font-medium mb-1">Projection Disclaimer</p>
                    <p className="text-gray-300 text-sm">Returns are projected at 12% p.a. and are subject to market risks. Past performance doesn't guarantee future results.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleInvest}
                disabled={isLoading || !amount || parseInt(amount) < (investmentType === 'sip' ? fundData.minSIP : fundData.minInvestment)}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-5 h-5" />
                    <span>Invest Now</span>
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <button
                  onClick={() => router.push(`/fsi-analysis?fundId=${fundId}&fundName=${encodeURIComponent(fundName)}`)}
                  className="text-blue-400 hover:text-blue-300 text-sm underline"
                >
                  View FSI Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPage;
