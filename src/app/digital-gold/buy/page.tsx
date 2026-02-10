'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Zap, Shield, TrendingUp, Calculator, CreditCard, Smartphone, Building2 } from 'lucide-react';
import { digitalGoldApi, GoldPrice } from '../../../services/digitalGoldApi';
import { useRouter } from 'next/navigation';

const BuyGoldPage = () => {
  const router = useRouter();
  const [goldType, setGoldType] = useState<'24K' | '22K' | '18K'>('24K');
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState<'ONLINE' | 'UPI' | 'NETBANKING'>('ONLINE');
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadGoldPrice();
  }, [goldType]);

  const loadGoldPrice = async () => {
    const price = await digitalGoldApi.getGoldPrice(goldType);
    setGoldPrice(price);
  };

  const calculateGrams = () => {
    if (!amount || !goldPrice) return 0;
    return (parseFloat(amount) / goldPrice.buyPrice).toFixed(4);
  };

  const handleBuy = async () => {
    if (!amount || parseFloat(amount) < 100) {
      alert('Minimum investment is ₹100');
      return;
    }

    setLoading(true);
    try {
      const response = await digitalGoldApi.buyGold({
        goldType,
        amount: parseFloat(amount),
        paymentMode
      });

      if (response.paymentLink) {
        window.location.href = response.paymentLink;
      } else {
        router.push('/digital-gold/holdings');
      }
    } catch (error) {
      alert('Failed to process purchase. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900 to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-300 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-4">
            Buy Digital Gold
          </h1>
          <p className="text-gray-300">Invest in 99.9% pure gold starting from ₹100</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="space-y-6">
            {/* Gold Type Selection */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-700">
              <label className="text-sm font-semibold text-gray-300 mb-3 block">Select Gold Type</label>
              <div className="grid grid-cols-3 gap-3">
                {(['24K', '22K', '18K'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setGoldType(type)}
                    className={`py-3 rounded-xl font-bold transition-all ${
                      goldType === type
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg shadow-yellow-500/30'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-700">
              <label className="text-sm font-semibold text-gray-300 mb-3 block">Investment Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border-2 border-gray-700 rounded-2xl text-2xl font-bold text-white focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="flex gap-2 mt-3">
                {[500, 1000, 5000, 10000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt.toString())}
                    className="flex-1 py-2 bg-gray-700 hover:bg-yellow-500 text-gray-300 hover:text-white rounded-lg text-sm font-semibold transition-all"
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Mode */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-700">
              <label className="text-sm font-semibold text-gray-300 mb-3 block">Payment Method</label>
              <div className="space-y-3">
                {[
                  { mode: 'ONLINE' as const, icon: CreditCard, label: 'Credit/Debit Card' },
                  { mode: 'UPI' as const, icon: Smartphone, label: 'UPI Payment' },
                  { mode: 'NETBANKING' as const, icon: Building2, label: 'Net Banking' }
                ].map(({ mode, icon: Icon, label }) => (
                  <button
                    key={mode}
                    onClick={() => setPaymentMode(mode)}
                    className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all ${
                      paymentMode === mode
                        ? 'bg-yellow-500/20 border-2 border-yellow-500'
                        : 'bg-gray-700/50 border-2 border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${paymentMode === mode ? 'text-yellow-400' : 'text-gray-400'}`} />
                    <span className={`font-semibold ${paymentMode === mode ? 'text-white' : 'text-gray-300'}`}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Buy Button */}
            <button
              onClick={handleBuy}
              disabled={!amount || parseFloat(amount) < 100 || loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-yellow-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Zap className="w-6 h-6" />
                  <span>Buy Gold Now</span>
                </>
              )}
            </button>
          </div>

          {/* Right: Summary */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 backdrop-blur-xl rounded-3xl p-6 border-2 border-yellow-500/50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300">Current Price ({goldType})</span>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                ₹{goldPrice?.buyPrice.toLocaleString('en-IN')}
                <span className="text-lg text-gray-400 ml-2">/gram</span>
              </div>
              <div className="text-sm text-gray-400">
                Last updated: {goldPrice ? new Date(goldPrice.lastUpdated).toLocaleTimeString() : '-'}
              </div>
            </div>

            {/* Calculation */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-700">
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold text-white">You will get</span>
              </div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">
                {calculateGrams()}
                <span className="text-2xl text-gray-400 ml-2">grams</span>
              </div>
              <div className="space-y-2 mt-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Investment Amount</span>
                  <span className="text-white font-semibold">₹{amount || '0'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Price per gram</span>
                  <span className="text-white font-semibold">₹{goldPrice?.buyPrice || '0'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Making Charges</span>
                  <span className="text-green-400 font-semibold">₹0 (Free!)</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-700">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-300">100% Secure & Insured</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-gray-300">Instant Credit to Account</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-gray-300">99.9% Pure Gold</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyGoldPage;
