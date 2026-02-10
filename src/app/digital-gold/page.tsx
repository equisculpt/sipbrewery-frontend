'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Zap, Shield, Award, ArrowRight, Sparkles, DollarSign, PieChart, Clock, Star, ChevronRight, Activity } from 'lucide-react';
import { digitalGoldApi, GoldPrice } from '../../services/digitalGoldApi';
import { useRouter } from 'next/navigation';

const DigitalGoldPage = () => {
  const router = useRouter();
  const [goldPrices, setGoldPrices] = useState<GoldPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGoldType, setSelectedGoldType] = useState<'24K' | '22K' | '18K'>('24K');

  useEffect(() => {
    loadGoldPrices();
    const interval = setInterval(loadGoldPrices, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadGoldPrices = async () => {
    try {
      const prices = await digitalGoldApi.getAllGoldPrices();
      setGoldPrices(prices);
    } catch (error) {
      console.error('Failed to load gold prices:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedPrice = goldPrices.find(p => p.goldType === selectedGoldType);

  const features = [
    {
      icon: Shield,
      title: '100% Secure',
      description: 'Bank-grade security with insurance',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Zap,
      title: 'Instant Trading',
      description: 'Buy & sell in seconds',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Award,
      title: '99.9% Pure Gold',
      description: 'Certified hallmark quality',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: DollarSign,
      title: 'Zero Making Charges',
      description: 'No hidden fees',
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  const benefits = [
    'Start with as low as ₹100',
    'No storage or security worries',
    'Convert to physical gold anytime',
    'Tax benefits on long-term holdings',
    'Portfolio diversification',
    'Hedge against inflation'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900 to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-5 animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Sparkles className="w-10 h-10 text-yellow-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              Digital Gold
            </h1>
            <Sparkles className="w-10 h-10 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Invest in 24K pure gold digitally. Safe, secure, and hassle-free.
          </p>
        </div>

        {/* Live Gold Prices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {goldPrices.map((price) => (
            <div
              key={price.goldType}
              onClick={() => setSelectedGoldType(price.goldType)}
              className={`
                relative overflow-hidden rounded-3xl p-6 cursor-pointer transition-all duration-300
                ${selectedGoldType === price.goldType
                  ? 'bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-2 border-yellow-400 shadow-2xl shadow-yellow-500/30 scale-105'
                  : 'bg-gray-800/50 border-2 border-gray-700 hover:border-yellow-500/50 hover:scale-102'
                }
              `}
            >
              {selectedGoldType === price.goldType && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-amber-400/10 animate-pulse"></div>
              )}

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-2xl font-bold text-white">{price.goldType}</span>
                  </div>
                  {price.priceChangePercent >= 0 ? (
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-red-400" />
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-1">Buy Price</p>
                  <p className="text-3xl font-bold text-white">
                    ₹{price.buyPrice.toLocaleString('en-IN')}
                    <span className="text-sm text-gray-400 ml-2">/gram</span>
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">24h Change</p>
                    <p className={`text-sm font-semibold ${price.priceChangePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {price.priceChangePercent >= 0 ? '+' : ''}{price.priceChangePercent.toFixed(2)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Sell Price</p>
                    <p className="text-sm font-semibold text-yellow-400">
                      ₹{price.sellPrice.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <button
            onClick={() => router.push('/digital-gold/buy')}
            className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-amber-500 rounded-3xl p-8 shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-semibold text-yellow-900 mb-1">Buy Gold</p>
                <p className="text-2xl font-bold text-white">Start Investing</p>
              </div>
              <ArrowRight className="w-8 h-8 text-white group-hover:translate-x-2 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => router.push('/digital-gold/sip')}
            className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-semibold text-purple-100 mb-1">Gold SIP</p>
                <p className="text-2xl font-bold text-white">Auto-Invest</p>
              </div>
              <Clock className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => router.push('/digital-gold/holdings')}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl p-8 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-semibold text-blue-100 mb-1">My Holdings</p>
                <p className="text-2xl font-bold text-white">View Portfolio</p>
              </div>
              <PieChart className="w-8 h-8 text-white group-hover:rotate-180 transition-transform duration-500" />
            </div>
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Star className="w-8 h-8 text-yellow-400 mr-3" />
            Why Digital Gold?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 group">
                <div className="w-2 h-2 bg-yellow-400 rounded-full group-hover:scale-150 transition-transform"></div>
                <p className="text-gray-300 group-hover:text-white transition-colors">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 rounded-3xl p-12 text-center shadow-2xl shadow-yellow-500/30">
          <h2 className="text-4xl font-bold text-white mb-4">
            Start Your Gold Journey Today
          </h2>
          <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who trust us for their digital gold investments
          </p>
          <button
            onClick={() => router.push('/digital-gold/buy')}
            className="bg-white text-yellow-600 px-12 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-50 transition-all duration-300 hover:scale-105 shadow-xl inline-flex items-center space-x-3"
          >
            <span>Buy Gold Now</span>
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DigitalGoldPage;
