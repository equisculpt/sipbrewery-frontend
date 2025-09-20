'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Calendar, Target, PieChart, BarChart3, LineChart, ArrowRight, Info, Zap, Award, Star, Download, Share2 } from 'lucide-react';
import { sipCalculatorAPI, SIPCalculationResult, DynamicSIPResult } from '../../services/sipCalculatorApi';

const SIPCalculatorPage = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [stepUpPercentage, setStepUpPercentage] = useState(10);
  const [calculationType, setCalculationType] = useState('regular');
  const [dynamicAdjustmentRange, setDynamicAdjustmentRange] = useState(15);
  
  // Calculated values
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [totalGains, setTotalGains] = useState(0);
  const [yearlyBreakdown, setYearlyBreakdown] = useState<Array<{
    year: number;
    monthlyAmount: number;
    yearlyInvestment: number;
    cumulativeInvestment: number;
    expectedValue: number;
    gains?: number;
  }>>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  // Calculate SIP returns using backend API
  useEffect(() => {
    const calculateSIP = async () => {
      setIsCalculating(true);
      setCalculationError(null);

      try {
        const params = {
          monthlyInvestment,
          expectedReturn,
          timePeriod,
          stepUpPercentage,
          dynamicAdjustmentRange
        };

        let result: SIPCalculationResult | DynamicSIPResult;

        switch (calculationType) {
          case 'regular':
            result = await sipCalculatorAPI.calculateRegularSIP(params);
            break;
          case 'stepup':
            result = await sipCalculatorAPI.calculateStepUpSIP(params);
            break;
          case 'dynamic':
            result = await sipCalculatorAPI.calculateDynamicSIP(params);
            break;
          default:
            result = await sipCalculatorAPI.calculateRegularSIP(params);
        }

        setTotalInvestment(result.totalInvestment);
        setMaturityAmount(result.maturityAmount);
        setTotalGains(result.totalGains);
        setYearlyBreakdown(result.yearlyBreakdown);

      } catch (error) {
        console.error('SIP calculation error:', error);
        setCalculationError('Failed to calculate SIP. Please try again.');
        
        // Fallback to client-side calculation
        try {
          const result = await sipCalculatorAPI.getCalculationWithFallback(
            calculationType as 'regular' | 'stepup' | 'dynamic',
            { monthlyInvestment, expectedReturn, timePeriod, stepUpPercentage, dynamicAdjustmentRange }
          );
          
          setTotalInvestment(result.totalInvestment);
          setMaturityAmount(result.maturityAmount);
          setTotalGains(result.totalGains);
          setYearlyBreakdown(result.yearlyBreakdown);
          setCalculationError(null);
        } catch (fallbackError) {
          console.error('Fallback calculation also failed:', fallbackError);
        }
      } finally {
        setIsCalculating(false);
      }
    };

    calculateSIP();
  }, [monthlyInvestment, expectedReturn, timePeriod, stepUpPercentage, calculationType, dynamicAdjustmentRange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-8 text-center community-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Calculator className="w-16 h-16 text-emerald-400" />
            <h1 className="text-6xl font-bold text-white">
              SIP <span className="text-emerald-400">Calculator</span>
            </h1>
          </div>
          <div className="w-full flex justify-center mb-8">
            <p className="text-xl text-slate-300 max-w-4xl text-center">
              Plan your wealth creation journey with our advanced SIP calculator. Get precise projections, step-up calculations, and comprehensive analysis to achieve your financial goals.
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">₹{formatNumber(Math.round(maturityAmount/100000))}L+</div>
              <div className="text-sm text-slate-400">Projected Wealth</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{expectedReturn}%</div>
              <div className="text-sm text-slate-400">Expected Returns</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{timePeriod}</div>
              <div className="text-sm text-slate-400">Years Investment</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Calculator Section */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Input Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-800/30 backdrop-blur-lg border border-slate-700/50 rounded-3xl p-8"
            >
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Target className="text-emerald-400" />
                Investment Parameters
              </h2>

              {/* Calculator Type Toggle */}
              <div className="mb-8">
                <label className="block text-white font-semibold mb-4">Calculator Type</label>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setCalculationType('regular')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      calculationType === 'regular'
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                    }`}
                  >
                    Regular SIP
                  </button>
                  <button
                    onClick={() => setCalculationType('stepup')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      calculationType === 'stepup'
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                    }`}
                  >
                    Step-up SIP
                  </button>
                  <button
                    onClick={() => setCalculationType('dynamic')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                      calculationType === 'dynamic'
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                    }`}
                  >
                    <Zap className="w-4 h-4 inline mr-2" />
                    Dynamic SIP
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-xs px-2 py-1 rounded-full text-black font-bold">
                      AI
                    </span>
                  </button>
                </div>
              </div>

              {/* Monthly Investment */}
              <div className="mb-8">
                <label className="block text-white font-semibold mb-4">
                  Monthly Investment Amount
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-slate-400 mt-2">
                    <span>₹500</span>
                    <span>₹1,00,000</span>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <div className="text-2xl font-bold text-emerald-400">
                    {formatCurrency(monthlyInvestment)}
                  </div>
                  <div className="text-sm text-slate-400">per month</div>
                </div>
              </div>

              {/* Expected Return */}
              <div className="mb-8">
                <label className="block text-white font-semibold mb-4">
                  Expected Annual Return (%)
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.5"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-slate-400 mt-2">
                    <span>1%</span>
                    <span>30%</span>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400">
                    {expectedReturn}%
                  </div>
                  <div className="text-sm text-slate-400">annual return</div>
                </div>
              </div>

              {/* Time Period */}
              <div className="mb-8">
                <label className="block text-white font-semibold mb-4">
                  Investment Period (Years)
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(Number(e.target.value))}
                    className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-slate-400 mt-2">
                    <span>1 Year</span>
                    <span>40 Years</span>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-400">
                    {timePeriod} Years
                  </div>
                  <div className="text-sm text-slate-400">investment period</div>
                </div>
              </div>

              {/* Dynamic Adjustment Range (only for Dynamic SIP) */}
              {calculationType === 'dynamic' && (
                <div className="mb-8">
                  <label className="block text-white font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Inviora AI Adjustment Range
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={dynamicAdjustmentRange}
                      onChange={(e) => setDynamicAdjustmentRange(Number(e.target.value))}
                      className="w-full h-3 bg-gradient-to-r from-purple-700 to-blue-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-slate-400 mt-2">
                      <span>5%</span>
                      <span>30%</span>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      ±{dynamicAdjustmentRange}%
                    </div>
                    <div className="text-sm text-slate-400">AI adjustment range</div>
                    <div className="text-xs text-slate-500 mt-2">
                      Inviora AI dynamically adjusts investments based on market conditions
                    </div>
                  </div>
                </div>
              )}

              {/* Step-up Percentage (only for step-up SIP) */}
              {calculationType === 'stepup' && (
                <div className="mb-8">
                  <label className="block text-white font-semibold mb-4">
                    Annual Step-up (%)
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="5"
                      max="25"
                      step="1"
                      value={stepUpPercentage}
                      onChange={(e) => setStepUpPercentage(Number(e.target.value))}
                      className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-slate-400 mt-2">
                      <span>5%</span>
                      <span>25%</span>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                    <div className="text-2xl font-bold text-orange-400">
                      {stepUpPercentage}%
                    </div>
                    <div className="text-sm text-slate-400">annual increase</div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Results Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Key Results */}
              <div className="bg-slate-800/30 backdrop-blur-lg border border-slate-700/50 rounded-3xl p-8">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <TrendingUp className="text-emerald-400" />
                  Investment Results
                </h2>

                <div className="grid grid-cols-1 gap-6">
                  {/* Total Investment */}
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="w-6 h-6 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">Total Investment</h3>
                    </div>
                    <div className="text-3xl font-bold text-blue-400">
                      {formatCurrency(totalInvestment)}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      {formatCurrency(monthlyInvestment)} × {timePeriod * 12} months
                    </div>
                  </div>

                  {/* Maturity Amount */}
                  <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-lg border border-emerald-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="w-6 h-6 text-emerald-400" />
                      <h3 className="text-lg font-semibold text-white">Maturity Amount</h3>
                    </div>
                    <div className="text-3xl font-bold text-emerald-400">
                      {formatCurrency(maturityAmount)}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      After {timePeriod} years @ {expectedReturn}% returns
                      {calculationType === 'dynamic' && (
                        <span className="block text-xs text-purple-400 mt-1">
                          ✨ Enhanced by Inviora AI Dynamic Adjustments
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Total Gains */}
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="w-6 h-6 text-purple-400" />
                      <h3 className="text-lg font-semibold text-white">Total Gains</h3>
                    </div>
                    <div className="text-3xl font-bold text-purple-400">
                      {formatCurrency(totalGains)}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      {((totalGains / totalInvestment) * 100).toFixed(1)}% total return
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500/80 to-blue-500/80 backdrop-blur-lg border border-white/20 text-white rounded-xl font-semibold hover:from-emerald-400/90 hover:to-blue-400/90 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                  <button className="flex-1 px-6 py-3 bg-slate-700/50 backdrop-blur-lg border border-slate-600 text-white rounded-xl font-semibold hover:bg-slate-600/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share Results
                  </button>
                </div>
              </div>

              {/* Investment Breakdown Chart Placeholder */}
              <div className="bg-slate-800/30 backdrop-blur-lg border border-slate-700/50 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <PieChart className="text-emerald-400" />
                  Investment vs Returns Breakdown
                </h3>
                
                <div className="relative h-64 bg-slate-900/50 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400">Interactive Chart Coming Soon</p>
                    <p className="text-sm text-slate-500 mt-2">
                      Investment: {((totalInvestment / maturityAmount) * 100).toFixed(1)}% | 
                      Returns: {((totalGains / maturityAmount) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-12 text-center"
          >
            Why Use Our <span className="text-emerald-400">SIP Calculator</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Instant Calculations",
                description: "Get real-time SIP projections with advanced algorithms and precise mathematical models.",
                color: "emerald"
              },
              {
                icon: TrendingUp,
                title: "Step-up SIP Support",
                description: "Calculate returns for step-up SIPs with annual increment options for better wealth creation.",
                color: "blue"
              },
              {
                icon: Zap,
                title: "Dynamic SIP with Inviora AI",
                description: "Revolutionary AI-powered dynamic adjustments that optimize investments based on real-time market conditions for enhanced returns.",
                color: "gradient"
              },
              {
                icon: PieChart,
                title: "Detailed Analysis",
                description: "Comprehensive breakdown of investments, returns, and year-wise growth projections.",
                color: "purple"
              },
              {
                icon: Target,
                title: "Goal Planning",
                description: "Plan your financial goals with precise calculations and realistic projections.",
                color: "orange"
              },
              {
                icon: Award,
                title: "Professional Grade",
                description: "Bank-grade calculations used by financial advisors and wealth management firms.",
                color: "pink"
              },
              {
                icon: Download,
                title: "Export Reports",
                description: "Download detailed reports and share calculations with your financial advisor.",
                color: "cyan"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/30 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300 group"
              >
                <feature.icon className={`w-12 h-12 ${
                  feature.color === 'gradient' 
                    ? 'text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text' 
                    : `text-${feature.color}-400`
                } mb-4 group-hover:scale-110 transition-transform duration-300`} />
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 pb-16 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="grid place-items-center gap-6 text-center min-h-[200px] py-12">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Star className="w-16 h-16 text-emerald-400" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl font-bold text-white leading-tight"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #10b981 50%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textAlign: 'center',
                  margin: '0 auto'
                }}
              >
                Start Your SIP Journey Today
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl text-slate-300 max-w-3xl leading-relaxed"
                style={{
                  textAlign: 'center',
                  margin: '0 auto'
                }}
              >
                Use our advanced calculator to plan your investments and achieve your goals with systematic investment planning.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-2xl font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-3 justify-center">
                  <ArrowRight className="w-5 h-5" />
                  Start Investing Now
                </button>
                <button className="px-8 py-4 bg-slate-800/50 border border-slate-600 text-white rounded-2xl font-semibold hover:bg-slate-700/50 transition-all duration-300">
                  Learn More About SIP
                </button>
              </motion.div>
          </div>
        </motion.div>
      </section>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #3b82f6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }
        
        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #3b82f6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }
      `}</style>
    </div>
  );
};

export default SIPCalculatorPage;
