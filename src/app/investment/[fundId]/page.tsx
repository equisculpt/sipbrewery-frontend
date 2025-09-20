'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Shield, Clock, Calculator, Info, CheckCircle, AlertCircle, CreditCard, Building2, Users, Star, Settings, BarChart3, TrendingDown, ArrowRight, Zap, Award, PieChart, Activity, Smartphone } from 'lucide-react';
import PayTMStyleNavigation from '../../../components/PayTMStyleNavigation';

const MutualFundInvestment = () => {
  const [investmentType, setInvestmentType] = useState('SIP');
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [sipFrequency, setSipFrequency] = useState('Monthly');
  const [duration, setDuration] = useState('36');
  const [bankAccount, setBankAccount] = useState('nach');
  const [isLoading, setIsLoading] = useState(false);
  const [showProjection, setShowProjection] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Dynamic SIP states
  const [isDynamicSIP, setIsDynamicSIP] = useState(true);
  const [dynamicRange, setDynamicRange] = useState(30);
  const [customMinRange, setCustomMinRange] = useState('');
  const [customMaxRange, setCustomMaxRange] = useState('');
  const [showCustomRange, setShowCustomRange] = useState(false);

  // Mock fund data with FSI predictions
  const fundData = {
    name: "HDFC Top 100 Fund",
    fullName: "HDFC Top 100 Fund - Direct Growth",
    category: "Large Cap Equity",
    nav: "847.32",
    navChange: "+2.45",
    navChangePercent: "0.29",
    aum: "45,678",
    expenseRatio: "0.45",
    rating: 4.5,
    returns: {
      "1Y": { value: "18.45", positive: true },
      "3Y": { value: "16.78", positive: true },
      "5Y": { value: "14.92", positive: true }
    },
    riskometer: "Moderately High",
    exitLoad: "1% if redeemed within 1 year",
    minSipAmount: 500,
    minLumpsumAmount: 5000,
    benchmark: "NIFTY 100 TRI",
    fundManager: "Rahul Baijal",
    inception: "Oct 30, 2010",
    // FSI Predictions - Dynamic expected returns based on time period
    fsiPredictions: {
      "1Y": 14.2,   // 1 year expected return %
      "2Y": 13.8,   // 2 year expected return %
      "3Y": 15.1,   // 3 year expected return %
      "5Y": 16.4,   // 5 year expected return %
      "10Y": 17.2,  // 10 year expected return %
      "15Y": 16.8   // 15 year expected return %
    }
  };

  // Amount presets
  const amountPresets = investmentType === 'SIP' 
    ? [1000, 2500, 5000, 10000, 25000]
    : [10000, 25000, 50000, 100000, 500000];

  // Dynamic SIP calculations
  const getDynamicSIPRange = () => {
    const baseAmount = parseFloat(amount) || 0;
    if (!isDynamicSIP || !baseAmount) return { min: baseAmount, max: baseAmount };
    
    if (showCustomRange && customMinRange && customMaxRange) {
      return {
        min: parseFloat(customMinRange),
        max: parseFloat(customMaxRange)
      };
    }
    
    const rangePercent = dynamicRange / 2;
    const minAmount = Math.round(baseAmount * (1 - rangePercent / 100));
    const maxAmount = Math.round(baseAmount * (1 + rangePercent / 100));
    
    return { min: minAmount, max: maxAmount };
  };

  const getCustomRangeLimits = () => {
    const baseAmount = parseFloat(amount) || 0;
    
    return {
      minLowerLimit: Math.max(500, Math.round(baseAmount * 0.5)),
      minUpperLimit: Math.round(baseAmount * (1 - 0.1)),
      maxLowerLimit: Math.round(baseAmount * (1 + 0.1)),
      maxUpperLimit: Math.round(baseAmount * 1.5)
    };
  };

  // Get FSI predicted return rate based on investment duration
  const getFSIExpectedReturn = () => {
    const years = parseFloat(duration) / 12;
    const predictions = fundData.fsiPredictions;
    
    // Map duration to closest FSI prediction period
    if (years <= 1) return predictions['1Y'] / 100;
    if (years <= 2) return predictions['2Y'] / 100;
    if (years <= 3) return predictions['3Y'] / 100;
    if (years <= 5) return predictions['5Y'] / 100;
    if (years <= 10) return predictions['10Y'] / 100;
    return predictions['15Y'] / 100; // For 15+ years
  };

  const calculateProjection = () => {
    const principal = parseFloat(amount) || 0;
    const rate = getFSIExpectedReturn(); // Use FSI prediction instead of hardcoded 12%
    const time = parseFloat(duration) / 12 || 1;
    
    if (investmentType === 'SIP') {
      const monthlyRate = rate / 12;
      const months = parseFloat(duration) || 12;
      
      if (isDynamicSIP) {
        const range = getDynamicSIPRange();
        const avgAmount = (range.min + range.max) / 2;
        const futureValue = avgAmount * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate);
        return {
          invested: avgAmount * months,
          returns: futureValue - (avgAmount * months),
          total: futureValue,
          isDynamic: true,
          range: range
        };
      } else {
        const futureValue = principal * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate);
        return {
          invested: principal * months,
          returns: futureValue - (principal * months),
          total: futureValue,
          isDynamic: false
        };
      }
    } else {
      const futureValue = principal * ((1 + rate) ** time);
      return {
        invested: principal,
        returns: futureValue - principal,
        total: futureValue,
        isDynamic: false
      };
    }
  };

  const handleCustomRangeSubmit = () => {
    const limits = getCustomRangeLimits();
    const baseAmount = parseFloat(amount);
    const newMin = parseFloat(customMinRange);
    const newMax = parseFloat(customMaxRange);
    
    if (newMin < limits.minLowerLimit || newMin > limits.minUpperLimit) {
      alert(`Minimum amount should be between ₹${limits.minLowerLimit} and ₹${limits.minUpperLimit}`);
      return;
    }
    
    if (newMax < limits.maxLowerLimit || newMax > limits.maxUpperLimit) {
      alert(`Maximum amount should be between ₹${limits.maxLowerLimit} and ₹${limits.maxUpperLimit}`);
      return;
    }
    
    if (newMin >= newMax) {
      alert('Minimum amount should be less than maximum amount');
      return;
    }
    
    const minPercent = ((baseAmount - newMin) / baseAmount) * 100;
    const maxPercent = ((newMax - baseAmount) / baseAmount) * 100;
    const avgPercent = (minPercent + maxPercent) / 2;
    setDynamicRange(avgPercent * 2);
    setShowCustomRange(false);
  };

  const projection = calculateProjection();
  const dynamicSIPRange = getDynamicSIPRange();
  const customLimits = getCustomRangeLimits();

  const handleInvest = async () => {
    if (!termsAccepted) {
      alert('Please accept the terms and conditions to proceed');
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    alert('Investment initiated successfully! You will receive a confirmation shortly.');
  };

  useEffect(() => {
    if (amount && (investmentType === 'Lumpsum' || duration)) {
      setShowProjection(true);
    } else {
      setShowProjection(false);
    }
  }, [amount, investmentType, duration, isDynamicSIP, dynamicRange]);

  const customStyles = `
    .smart-input-container {
      position: relative;
      display: flex;
      align-items: center;
      background: rgba(31, 41, 55, 0.9);
      backdrop-filter: blur(4px);
      border: 2px solid rgba(75, 85, 99, 0.5);
      border-radius: 1rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }
    .smart-input-container:hover {
      border-color: rgba(75, 85, 99, 0.7);
      background: rgba(31, 41, 55, 0.95);
    }
    .smart-input-container:focus-within {
      border-color: rgb(59, 130, 246);
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
      background: rgba(31, 41, 55, 0.95);
    }
    .smart-input-icon {
      flex-shrink: 0;
      width: 3rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(55, 65, 81, 0.5);
      border-right: 1px solid rgba(75, 85, 99, 0.3);
    }
    .smart-input-field {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      padding: 1.25rem 1rem;
      color: white;
      font-size: 1.125rem;
      font-weight: 600;
    }
    .smart-input-field::placeholder {
      color: rgba(156, 163, 175, 0.7);
    }
    .smart-select {
      background: rgba(31, 41, 55, 0.9) !important;
      backdrop-filter: blur(4px);
      border: 2px solid rgba(75, 85, 99, 0.5) !important;
      border-radius: 0.75rem !important;
      padding: 0.75rem 1rem !important;
      color: white !important;
      font-weight: 500 !important;
      transition: all 0.3s ease !important;
    }
    .smart-select:focus {
      border-color: rgb(59, 130, 246) !important;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1) !important;
      outline: none !important;
    }
    select option {
      background-color: #1f2937 !important;
      color: white !important;
      padding: 8px !important;
    }
    input[type="date"]::-webkit-calendar-picker-indicator {
      filter: invert(1);
      cursor: pointer;
    }
    .main-content {
      padding-top: 80px;
      position: relative;
      z-index: 1;
      min-height: 100vh;
    }
    @media (max-width: 768px) {
      .main-content {
        padding-top: 70px;
      }
    }
    @media (max-width: 480px) {
      .main-content {
        padding-top: 65px;
      }
    }
  `;

  return (
    <>
      <style>{customStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-900">
        {/* PayTM Style Navigation */}
        <PayTMStyleNavigation />
        
        {/* Main Content with proper navigation spacing */}
        <div className="px-4 sm:px-6 lg:px-8 main-content">
          <div className="max-w-7xl mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Enhanced Fund Information */}
              <div className="lg:col-span-1 space-y-6">
                <div>
                  {/* Fund Header with Gradient */}
                  <div className="relative p-6 text-white">
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h2 className="text-xl font-bold">{fundData.name}</h2>
                            <div className="flex items-center px-2 py-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < Math.floor(fundData.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/40'}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-blue-100 text-sm">{fundData.category}</p>
                        </div>
                      </div>
                      
                      {/* Live NAV Display */}
                      <div className="p-4">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <p className="text-xs text-blue-100 mb-1">Current NAV</p>
                            <div className="flex items-baseline space-x-2">
                              <span className="text-3xl font-bold">₹{fundData.nav}</span>
                              <span className={`text-sm ${parseFloat(fundData.navChange) >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                                {fundData.navChange} ({fundData.navChangePercent}%)
                              </span>
                            </div>
                          </div>
                          <Activity className="w-8 h-8 text-white/40" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Fund Stats Grid */}
                  <div className="p-6 space-y-6">
                    {/* Returns Section */}
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Historical Returns</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {Object.entries(fundData.returns).map(([period, data]) => (
                          <div key={period} className="p-3">
                            <p className="text-xs text-gray-400 mb-1">{period}</p>
                            <p className={`text-lg font-bold ${data.positive ? 'text-green-400' : 'text-red-400'}`}>
                              {data.positive ? '+' : '-'}{data.value}%
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-400">AUM</p>
                          <p className="text-lg font-bold text-white">₹{fundData.aum} Cr</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Expense Ratio</p>
                          <p className="text-lg font-bold text-white">{fundData.expenseRatio}%</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-400">Fund Manager</p>
                          <p className="text-lg font-bold text-white">{fundData.fundManager}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Inception</p>
                          <p className="text-lg font-bold text-white">{fundData.inception}</p>
                        </div>
                      </div>
                    </div>

                    {/* Risk Meter */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-300">Risk Level</span>
                        <span className="text-xs text-orange-300 px-2 py-1 font-medium">
                          {fundData.riskometer}
                        </span>
                      </div>
                      <div className="relative h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full">
                        <div className="absolute top-1/2 left-[70%] transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-orange-500 rounded-full shadow-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Risk Disclaimer */}
                <div className="p-5">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-sm text-amber-200">
                      <p className="font-bold mb-1">Investment Risk Disclosure</p>
                      <p className="leading-relaxed">Mutual Fund investments are subject to market risks. Read all scheme documents carefully.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Investment Form */}
              <div className="lg:col-span-2">
                <div>
                  {/* Form Header */}
                  <div className="p-8">
                    <h3 className="text-3xl font-bold text-white mb-2">Start Your Investment Journey</h3>
                    <p className="text-blue-100">Build wealth systematically with smart investment options</p>
                  </div>

                  <div className="p-8 space-y-8">
                    {/* Investment Type Selection */}
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-4">Choose Investment Type</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setInvestmentType('SIP')}
                          className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                            investmentType === 'SIP'
                              ? 'text-blue-400'
                              : 'text-gray-400'
                          }`}
                        >
                          {investmentType === 'SIP' && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle className="w-5 h-5 text-blue-400" />
                            </div>
                          )}
                          <Clock className={`w-8 h-8 mb-3 mx-auto ${investmentType === 'SIP' ? 'text-blue-400' : 'text-gray-400'}`} />
                          <div className={`font-bold text-lg mb-1 ${investmentType === 'SIP' ? 'text-white' : 'text-gray-300'}`}>SIP</div>
                          <div className="text-xs text-gray-400 mb-2">Systematic Investment</div>
                          <div className={`text-sm font-semibold ${investmentType === 'SIP' ? 'text-blue-300' : 'text-gray-500'}`}>
                            Min ₹{fundData.minSipAmount}
                          </div>
                        </button>
                        
                        <button
                          onClick={() => setInvestmentType('Lumpsum')}
                          className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                            investmentType === 'Lumpsum'
                              ? 'text-purple-400'
                              : 'text-gray-400'
                          }`}
                        >
                          {investmentType === 'Lumpsum' && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle className="w-5 h-5 text-purple-400" />
                            </div>
                          )}
                          <CreditCard className={`w-8 h-8 mb-3 mx-auto ${investmentType === 'Lumpsum' ? 'text-purple-400' : 'text-gray-400'}`} />
                          <div className={`font-bold text-lg mb-1 ${investmentType === 'Lumpsum' ? 'text-white' : 'text-gray-300'}`}>Lumpsum</div>
                          <div className="text-xs text-gray-400 mb-2">One-time Investment</div>
                          <div className={`text-sm font-semibold ${investmentType === 'Lumpsum' ? 'text-purple-300' : 'text-gray-500'}`}>
                            Min ₹{fundData.minLumpsumAmount.toLocaleString('en-IN')}
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Amount Input */}
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-3">
                        {investmentType === 'SIP' ? 'Monthly SIP Amount' : 'Investment Amount'}
                      </label>
                      <div className="smart-input-container">
                        <div className="smart-input-icon">
                          <span className="text-2xl font-bold text-gray-300">₹</span>
                        </div>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder={investmentType === 'SIP' ? '5,000' : '50,000'}
                          className="smart-input-field"
                        />
                      </div>
                      
                      {/* Amount Presets */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {amountPresets.map((preset) => (
                          <button
                            key={preset}
                            onClick={() => setAmount(preset.toString())}
                            className={`px-4 py-2 font-medium transition-all ${
                              amount === preset.toString()
                                ? 'text-blue-400'
                                : 'text-gray-300'
                            }`}
                          >
                            ₹{preset.toLocaleString('en-IN')}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic SIP Section for SIP */}
                    {investmentType === 'SIP' && (
                      <>
                        {/* Dynamic SIP Feature */}
                        <div className="relative p-8 text-white">
                          
                          <div className="relative">
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center space-x-4">
                                <div>
                                  <BarChart3 className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                  <h4 className="text-2xl font-bold">
                                    Dynamic SIP
                                    <span className="ml-3 px-2 py-1 bg-yellow-400/30 rounded-full text-xs font-medium">RECOMMENDED</span>
                                  </h4>
                                  <p className="text-blue-100 text-sm mt-1">AI-powered investment optimization</p>
                                </div>
                              </div>
                              <div className="relative">
                                <button
                                  onClick={() => {
                                    setIsDynamicSIP(!isDynamicSIP);
                                    if (isDynamicSIP) setShowCustomRange(false);
                                  }}
                                  className={`group relative overflow-hidden px-6 py-3 rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 ${
                                    isDynamicSIP
                                      ? 'border-emerald-400 bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/30'
                                      : 'border-gray-500 bg-gray-700/50 hover:border-gray-400'
                                  }`}
                                >
                                  {/* Animated background glow */}
                                  {isDynamicSIP && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-20 animate-pulse"></div>
                                  )}
                                  
                                  {/* Content */}
                                  <div className="relative flex items-center space-x-3">
                                    {/* Icon with animation */}
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                      isDynamicSIP 
                                        ? 'bg-white/20 backdrop-blur-sm' 
                                        : 'bg-gray-600/50'
                                    }`}>
                                      {isDynamicSIP ? (
                                        <Zap className="w-5 h-5 text-white animate-bounce" />
                                      ) : (
                                        <Zap className="w-5 h-5 text-gray-400" />
                                      )}
                                    </div>
                                    
                                    {/* Text */}
                                    <div className="text-left">
                                      <div className={`font-bold text-sm transition-all duration-300 ${
                                        isDynamicSIP ? 'text-white' : 'text-gray-300'
                                      }`}>
                                        {isDynamicSIP ? 'Dynamic SIP Active' : 'Enable Dynamic SIP'}
                                      </div>
                                      <div className={`text-xs transition-all duration-300 ${
                                        isDynamicSIP ? 'text-white/80' : 'text-gray-500'
                                      }`}>
                                        {isDynamicSIP ? 'AI optimization enabled' : 'Click to activate'}
                                      </div>
                                    </div>
                                    
                                    {/* Status indicator */}
                                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                      isDynamicSIP 
                                        ? 'bg-white shadow-lg shadow-white/50 animate-pulse' 
                                        : 'bg-gray-500'
                                    }`}></div>
                                  </div>
                                  
                                  {/* Sparkle effects for active state */}
                                  {isDynamicSIP && (
                                    <>
                                      <div className="absolute top-1 right-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                                      <div className="absolute bottom-2 left-3 w-1 h-1 bg-white rounded-full animate-ping delay-300"></div>
                                      <div className="absolute top-3 left-1/2 w-1 h-1 bg-white rounded-full animate-ping delay-700"></div>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>

                            {isDynamicSIP && amount && (
                              <div className="space-y-6">
                                {/* Dynamic Range Display */}
                                <div className="p-6">
                                  <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-semibold">Smart Investment Range</span>
                                    <span className="px-3 py-1 text-xs font-bold">
                                      ±{(dynamicRange/2).toFixed(0)}% Flexibility
                                    </span>
                                  </div>
                                  
                                  <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="text-center">
                                      <p className="text-xs text-blue-100 mb-1">Market Low</p>
                                      <p className="text-2xl font-bold">₹{dynamicSIPRange.max.toLocaleString('en-IN')}</p>
                                      <p className="text-xs text-green-300 mt-1">Buy More ↑</p>
                                    </div>
                                    <div className="text-center">
                                      <p className="text-xs text-blue-100 mb-1">Base Amount</p>
                                      <p className="text-2xl font-bold">₹{parseFloat(amount).toLocaleString('en-IN')}</p>
                                      <p className="text-xs text-yellow-300 mt-1">Normal</p>
                                    </div>
                                    <div className="text-center">
                                      <p className="text-xs text-blue-100 mb-1">Market High</p>
                                      <p className="text-2xl font-bold">₹{dynamicSIPRange.min.toLocaleString('en-IN')}</p>
                                      <p className="text-xs text-red-300 mt-1">Buy Less ↓</p>
                                    </div>
                                  </div>

                                  <div className="relative h-3 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400"></div>
                                  </div>
                                </div>

                                {/* Range Controls */}
                                <div className="p-4">
                                  <div className="flex items-center space-x-4">
                                    <div className="flex-1">
                                      <label className="block text-xs font-semibold mb-2">Adjust Flexibility</label>
                                      <input
                                        type="range"
                                        min="10"
                                        max="50"
                                        step="5"
                                        value={dynamicRange}
                                        onChange={(e) => setDynamicRange(parseInt(e.target.value))}
                                        className="w-full h-2 appearance-none cursor-pointer"
                                      />
                                    </div>
                                    <button
                                      onClick={() => {
                                        setShowCustomRange(!showCustomRange);
                                        if (!showCustomRange) {
                                          setCustomMinRange(dynamicSIPRange.min.toString());
                                          setCustomMaxRange(dynamicSIPRange.max.toString());
                                        }
                                      }}
                                      className="px-4 py-2 transition-all flex items-center space-x-2"
                                    >
                                      <Settings className="w-4 h-4" />
                                      <span>Customize</span>
                                    </button>
                                  </div>
                                </div>

                                {/* Custom Range Input */}
                                {showCustomRange && (
                                  <div className="p-5 space-y-4">
                                    <h5 className="font-bold text-lg">Set Custom Range</h5>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-xs font-medium mb-1">Min Amount</label>
                                        <input
                                          type="number"
                                          value={customMinRange}
                                          onChange={(e) => setCustomMinRange(e.target.value)}
                                          className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white"
                                          placeholder="Min amount"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-medium mb-1">Max Amount</label>
                                        <input
                                          type="number"
                                          value={customMaxRange}
                                          onChange={(e) => setCustomMaxRange(e.target.value)}
                                          className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white"
                                          placeholder="Max amount"
                                        />
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                      <button
                                        onClick={handleCustomRangeSubmit}
                                        className="px-5 py-2 text-purple-600 font-medium"
                                      >
                                        Apply
                                      </button>
                                      <button
                                        onClick={() => setShowCustomRange(false)}
                                        className="px-5 py-2 font-medium"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {/* Dynamic SIP Benefits */}
                                <div className="p-4">
                                  <div className="flex items-start space-x-3">
                                    <Zap className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" />
                                    <div className="text-sm">
                                      <p className="font-bold mb-2">AI-Powered Benefits</p>
                                      <ul className="space-y-1 text-xs text-blue-100">
                                        <li>• Automatically invests more when markets dip</li>
                                        <li>• Reduces investment during market peaks</li>
                                        <li>• Potentially 15-20% better returns over time</li>
                                        <li>• No manual intervention required</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* SIP Configuration */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-gray-300 mb-3">SIP Frequency</label>
                            <div className="grid grid-cols-4 gap-3">
                              {[
                                { name: 'Daily', color: 'orange', gradient: 'from-orange-500 to-red-500' },
                                { name: 'Weekly', color: 'blue', gradient: 'from-blue-500 to-indigo-500' },
                                { name: 'Monthly', color: 'emerald', gradient: 'from-emerald-500 to-green-500' },
                                { name: 'Quarterly', color: 'purple', gradient: 'from-purple-500 to-pink-500' }
                              ].map((freq) => {
                                const isSelected = sipFrequency === freq.name;
                                return (
                                  <button
                                    key={freq.name}
                                    onClick={() => setSipFrequency(freq.name)}
                                    className={`group relative overflow-hidden py-4 px-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                                      isSelected
                                        ? `border-${freq.color}-400 bg-gradient-to-r ${freq.gradient} shadow-lg shadow-${freq.color}-500/25`
                                        : 'border-gray-600 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50'
                                    }`}
                                  >
                                    {/* Animated background glow for selected */}
                                    {isSelected && (
                                      <div className={`absolute inset-0 bg-gradient-to-r ${freq.gradient} opacity-20 animate-pulse`}></div>
                                    )}
                                    
                                    {/* Content */}
                                    <div className="relative text-center">
                                      <div className={`font-bold text-sm transition-all duration-300 ${
                                        isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'
                                      }`}>
                                        {freq.name}
                                      </div>
                                      
                                      {/* Selection indicator */}
                                      {isSelected && (
                                        <div className="mt-1 flex justify-center">
                                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        </div>
                                      )}
                                    </div>
                                    
                                    {/* Subtle sparkle effect for selected */}
                                    {isSelected && (
                                      <>
                                        <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-ping"></div>
                                        <div className="absolute bottom-1 left-1 w-1 h-1 bg-white rounded-full animate-ping delay-500"></div>
                                      </>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-bold text-gray-300 mb-3">Investment Period</label>
                            <select
                              value={duration}
                              onChange={(e) => setDuration(e.target.value)}
                              className="smart-select w-full"
                            >
                              <option value="12">1 Year</option>
                              <option value="24">2 Years</option>
                              <option value="36">3 Years</option>
                              <option value="60">5 Years</option>
                              <option value="120">10 Years</option>
                              <option value="180">15 Years</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Date Selection */}
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-3">
                        {investmentType === 'SIP' ? 'SIP Start Date' : 'Investment Date'}
                      </label>
                      <div className="smart-input-container">
                        <div className="smart-input-icon">
                          <Calendar className="text-gray-300 w-5 h-5" />
                        </div>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="smart-input-field"
                        />
                      </div>
                    </div>

                    {/* Payment Method Selection - Beautiful Design */}
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-6">Choose Payment Method</label>
                      <div className="grid grid-cols-1 gap-4">
                        {(() => {
                          const allMethods = [
                            { 
                              id: 'netbanking', 
                              name: 'Net Banking', 
                              description: 'Pay directly from your bank account',
                              icon: Building2,
                              recommended: false,
                              color: 'blue',
                              gradient: 'from-blue-500 to-blue-600'
                            },
                            { 
                              id: 'upi', 
                              name: 'UPI', 
                              description: 'Instant payment via UPI apps',
                              icon: Smartphone,
                              recommended: false,
                              color: 'purple',
                              gradient: 'from-purple-500 to-purple-600'
                            },
                            { 
                              id: 'nach', 
                              name: 'NACH', 
                              description: investmentType === 'SIP' ? 'Auto-debit for SIP investments' : 'Secure auto-debit payment',
                              icon: CreditCard,
                              recommended: true,
                              color: 'emerald',
                              gradient: 'from-emerald-500 to-emerald-600'
                            }
                          ];
                          
                          // For SIP, show only NACH
                          if (investmentType === 'SIP') {
                            return allMethods.filter(method => method.id === 'nach');
                          }
                          
                          // For Lumpsum, show all methods with NACH recommended
                          return allMethods;
                        })().map((method) => {
                          const IconComponent = method.icon;
                          const isSelected = bankAccount === method.id;
                          return (
                            <button
                              key={method.id}
                              onClick={() => setBankAccount(method.id)}
                              className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                                isSelected
                                  ? `border-${method.color}-400 bg-gradient-to-r ${method.gradient} shadow-lg shadow-${method.color}-500/25`
                                  : 'border-gray-600 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50'
                              }`}
                            >
                              {method.recommended && (
                                <div className="absolute -top-2 right-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
                                  ✨ RECOMMENDED
                                </div>
                              )}
                              
                              <div className="flex items-center space-x-4">
                                {/* Icon with beautiful background */}
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                  isSelected 
                                    ? 'bg-white/20 backdrop-blur-sm' 
                                    : `bg-${method.color}-500/10 group-hover:bg-${method.color}-500/20`
                                }`}>
                                  <IconComponent className={`w-6 h-6 transition-all duration-300 ${
                                    isSelected 
                                      ? 'text-white' 
                                      : `text-${method.color}-400 group-hover:text-${method.color}-300`
                                  }`} />
                                </div>
                                
                                {/* Content */}
                                <div className="text-left flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h3 className={`font-bold text-lg transition-all duration-300 ${
                                      isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'
                                    }`}>
                                      {method.name}
                                    </h3>
                                    {isSelected && (
                                      <CheckCircle className="w-5 h-5 text-white animate-bounce" />
                                    )}
                                  </div>
                                  <p className={`text-sm transition-all duration-300 ${
                                    isSelected ? 'text-white/80' : 'text-gray-400 group-hover:text-gray-300'
                                  }`}>
                                    {method.description}
                                  </p>
                                </div>
                                
                                {/* Selection indicator */}
                                <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                                  isSelected 
                                    ? 'border-white bg-white' 
                                    : 'border-gray-400 group-hover:border-gray-300'
                                }`}>
                                  {isSelected && (
                                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${method.gradient}`}></div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Subtle glow effect for selected */}
                              {isSelected && (
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${method.gradient} opacity-10 pointer-events-none`}></div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      
                      {/* Payment security note */}
                      <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-400">
                        <Shield className="w-4 h-4 text-green-400" />
                        <span>All payments are secured with 256-bit SSL encryption</span>
                      </div>
                    </div>

                    {/* Investment Projection */}
                    {showProjection && amount && (
                      <div className="relative p-8 text-white">
                        
                        <div className="relative">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                              <Calculator className="w-8 h-8" />
                              <div>
                                <h4 className="text-2xl font-bold">Wealth Projection</h4>
                                <p className="text-emerald-100 text-sm">Expected returns @ {(getFSIExpectedReturn() * 100).toFixed(1)}% p.a. (FSI Prediction)</p>
                              </div>
                            </div>
                            {projection.isDynamic && (
                              <span className="px-3 py-1 text-sm font-medium">
                                Dynamic SIP Active
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-3 gap-6">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                              <p className="text-emerald-100 text-sm mb-2">Total Investment</p>
                              <p className="text-3xl font-bold">₹{(projection.invested / 100000).toFixed(1)}L</p>
                              <p className="text-xs text-emerald-200 mt-1">
                                {investmentType === 'SIP' ? `${duration} months` : 'One-time'}
                              </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                              <p className="text-emerald-100 text-sm mb-2">Expected Gains</p>
                              <p className="text-3xl font-bold text-yellow-300">₹{(projection.returns / 100000).toFixed(1)}L</p>
                              <p className="text-xs text-emerald-200 mt-1">
                                +{((projection.returns / projection.invested) * 100).toFixed(1)}% returns
                              </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                              <p className="text-emerald-100 text-sm mb-2">Maturity Value</p>
                              <p className="text-3xl font-bold text-green-300">₹{(projection.total / 100000).toFixed(1)}L</p>
                              <p className="text-xs text-emerald-200 mt-1">
                                {new Date(new Date().setMonth(new Date().getMonth() + parseInt(duration))).getFullYear()}
                              </p>
                            </div>
                          </div>

                          {projection.isDynamic && (
                            <div className="mt-6 p-4">
                              <div className="flex items-center space-x-2">
                                <Activity className="w-5 h-5 text-yellow-300" />
                                <p className="text-sm">
                                  Dynamic range: ₹{(projection.range.min * parseInt(duration)).toLocaleString('en-IN')} - ₹{(projection.range.max * parseInt(duration)).toLocaleString('en-IN')} total investment
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Terms and Conditions */}
                    <div className="p-5">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          className="mt-1 w-5 h-5 text-blue-600" 
                        />
                        <div className="text-sm text-gray-300">
                          <p className="font-medium mb-1">Terms & Conditions</p>
                          <p className="text-xs leading-relaxed text-gray-400">
                            I agree to the <span className="text-blue-400 hover:underline cursor-pointer">Terms & Conditions</span>, 
                            <span className="text-blue-400 hover:underline cursor-pointer"> Privacy Policy</span>, and confirm that I have read all 
                            <span className="text-blue-400 hover:underline cursor-pointer"> scheme documents</span>. I understand that mutual fund investments are subject to market risks.
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Investment Button - Sexy Design */}
                    <button
                      onClick={handleInvest}
                      disabled={!amount || !startDate || !bankAccount || !termsAccepted || isLoading}
                      className={`relative w-full overflow-hidden py-6 px-8 rounded-2xl border-2 font-bold text-lg transition-all duration-500 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group ${
                        investmentType === 'SIP'
                          ? 'border-blue-400 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 shadow-lg shadow-blue-500/30'
                          : 'border-purple-400 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-600 shadow-lg shadow-purple-500/30'
                      }`}
                    >
                      {/* Animated background glow */}
                      <div className={`absolute inset-0 transition-all duration-500 ${
                        investmentType === 'SIP'
                          ? 'bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 animate-pulse'
                          : 'bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse'
                      }`}></div>
                      
                      {/* Sparkle effects */}
                      {!isLoading && (
                        <>
                          <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                          <div className="absolute top-4 right-6 w-1 h-1 bg-white rounded-full animate-ping delay-300"></div>
                          <div className="absolute bottom-3 left-1/3 w-1 h-1 bg-white rounded-full animate-ping delay-700"></div>
                          <div className="absolute bottom-2 right-1/4 w-1 h-1 bg-white rounded-full animate-ping delay-1000"></div>
                        </>
                      )}

                      <div className="relative flex items-center justify-center space-x-3 text-white">
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                            <span>Processing Investment...</span>
                          </>
                        ) : (
                          <>
                            {/* Dynamic icon based on investment type */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                              investmentType === 'SIP' 
                                ? 'bg-white/20 backdrop-blur-sm' 
                                : 'bg-white/20 backdrop-blur-sm'
                            }`}>
                              {investmentType === 'SIP' ? (
                                <Clock className="w-5 h-5 text-white animate-pulse" />
                              ) : (
                                <CreditCard className="w-5 h-5 text-white animate-pulse" />
                              )}
                            </div>
                            
                            {/* Dynamic text */}
                            <div className="text-center">
                              <div className="text-xl font-bold">
                                Start {investmentType} Investment
                              </div>
                              <div className="text-sm opacity-90">
                                ₹{amount ? parseFloat(amount).toLocaleString('en-IN') : '0'} • {investmentType === 'SIP' ? sipFrequency : 'One-time'}
                              </div>
                            </div>
                            
                            {/* Arrow with bounce effect */}
                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform animate-bounce" />
                            </div>
                          </>
                        )}
                      </div>
                      
                      {/* Bottom glow line */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 ${
                        investmentType === 'SIP'
                          ? 'bg-gradient-to-r from-blue-300 to-purple-300'
                          : 'bg-gradient-to-r from-purple-300 to-pink-300'
                      }`}></div>
                    </button>

                    {/* Trust Indicators */}
                    <div className="flex items-center justify-center space-x-8 pt-4">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Shield className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-medium">256-bit SSL</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Award className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium">SEBI Registered</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Users className="w-5 h-5 text-purple-500" />
                        <span className="text-sm font-medium">5M+ Investors</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MutualFundInvestment;