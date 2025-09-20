'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Calendar, TrendingUp, Shield, CheckCircle, Clock, Target, PiggyBank, Award, Star, Users, BarChart3, DollarSign, IndianRupee, Building2, Calculator, CreditCard, PieChart, AlertCircle, Info, Zap, Smartphone, Globe, Lock
} from 'lucide-react';

// Import components
import PayTMStyleNavigation from '../../../components/PayTMStyleNavigation';

// Import types
import { 
  FundDetails, InvestmentGoal, SipCalculation, LumpsumCalculation,
  PaymentMethod, InvestmentSummary, RiskProfile, TaxBenefit, AutoDebitSetup
} from '../../../types/investment';

export default function InvestmentSetupPage() {
  const params = useParams();
  const router = useRouter();
  const fundId = params.fundId as string;

  // State management
  const [fundDetails, setFundDetails] = useState<FundDetails | null>(null);
  const [investmentType, setInvestmentType] = useState<'sip' | 'lumpsum'>('sip');
  const [amount, setAmount] = useState<number>(5000);
  const [duration, setDuration] = useState<number>(10);
  const [sipDate, setSipDate] = useState<number>(5);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [calculations, setCalculations] = useState<SipCalculation | LumpsumCalculation | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Load fund details
  useEffect(() => {
    const fetchFundDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3005/api/asi/fsi-analysis/${fundId}/basic-info`);
        if (response.ok) {
          const data = await response.json();
          setFundDetails({
            id: data.data.id,
            name: data.data.name,
            category: data.data.category,
            nav: data.data.nav,
            aum: data.data.aum,
            expenseRatio: data.data.expenseRatio,
            rating: 4,
            riskLevel: 'Moderate',
            returns1Y: 12.5,
            returns3Y: 15.2,
            returns5Y: 13.8,
            fundManager: data.data.fundManager,
            benchmark: 'NIFTY 50',
            minSipAmount: 500,
            minLumpsumAmount: 5000
          });
        }
      } catch (error) {
        console.error('Error fetching fund details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (fundId) {
      fetchFundDetails();
    }
  }, [fundId]);

  // Calculate returns
  useEffect(() => {
    if (investmentType === 'sip') {
      const monthlyRate = 0.12 / 12;
      const months = duration * 12;
      const maturityAmount = amount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
      const totalInvestment = amount * months;
      
      setCalculations({
        monthlyAmount: amount,
        duration,
        expectedReturn: 12,
        totalInvestment,
        maturityAmount: Math.round(maturityAmount),
        wealthGain: Math.round(maturityAmount - totalInvestment)
      } as SipCalculation);
    } else {
      const maturityAmount = amount * Math.pow(1.12, duration);
      setCalculations({
        amount,
        duration,
        expectedReturn: 12,
        maturityAmount: Math.round(maturityAmount),
        wealthGain: Math.round(maturityAmount - amount)
      } as LumpsumCalculation);
    }
  }, [investmentType, amount, duration]);

  // BSE Star MF Payment Handlers
  const handleNACHSetup = async () => {
    try {
      setIsProcessing(true);
      const nachData = {
        fundId,
        investmentType,
        amount,
        duration,
        sipDate: investmentType === 'sip' ? sipDate : undefined,
        bankDetails: {
          accountNumber: '',
          ifscCode: '',
          bankName: ''
        }
      };
      
      const response = await fetch('/api/bse/nach-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nachData)
      });
      
      if (response.ok) {
        const result = await response.json();
        window.location.href = result.bseNachUrl;
      } else {
        throw new Error('NACH registration failed');
      }
    } catch (error) {
      console.error('NACH setup error:', error);
      alert('NACH setup failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOnlinePayment = async () => {
    try {
      setIsProcessing(true);
      const paymentData = {
        fundId,
        investmentType,
        amount,
        duration,
        sipDate: investmentType === 'sip' ? sipDate : undefined
      };
      
      const response = await fetch('/api/bse/generate-payment-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });
      
      if (response.ok) {
        const result = await response.json();
        window.location.href = result.bsePaymentUrl;
      } else {
        throw new Error('Payment link generation failed');
      }
    } catch (error) {
      console.error('Online payment error:', error);
      alert('Payment setup failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Investment Details</h2>
          <p className="text-gray-400">Preparing your investment journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900">
      <PayTMStyleNavigation />
      
      <div className="content-below-nav pb-6">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-400" />
              </button>
              <div>
                <div className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                  <span>Mutual Funds</span>
                  <span>/</span>
                  <span>{fundDetails?.category || 'Large Cap Equity'}</span>
                  <span>/</span>
                  <span className="text-blue-400">Investment Setup</span>
                </div>
                
                <h1 className="text-2xl font-bold text-white mb-2">
                  {fundDetails?.name || 'HDFC Top 100 Fund - Direct Growth'}
                </h1>
                <p className="text-gray-400">Complete your investment in 2 simple steps</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {[
                { step: 1, label: 'Investment Details' },
                { step: 2, label: 'BSE Payment' }
              ].map(({ step, label }) => (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep >= step 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-400'
                    }`}>
                      {currentStep > step ? <CheckCircle className="w-6 h-6" /> : step}
                    </div>
                    <span className={`text-xs mt-1 ${
                      currentStep >= step ? 'text-blue-400' : 'text-gray-500'
                    }`}>
                      {label}
                    </span>
                  </div>
                  {step < 2 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800/50">
                  <h3 className="text-xl font-bold text-white mb-6">Choose Investment Type</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      onClick={() => setInvestmentType('sip')}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                        investmentType === 'sip'
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-center mb-4">
                        <Calendar className={`w-8 h-8 ${
                          investmentType === 'sip' ? 'text-blue-400' : 'text-gray-400'
                        }`} />
                      </div>
                      <h4 className="font-bold text-white mb-2">SIP</h4>
                      <p className="text-gray-400 text-sm">Invest regularly</p>
                    </button>

                    <button
                      onClick={() => setInvestmentType('lumpsum')}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                        investmentType === 'lumpsum'
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-center mb-4">
                        <div className={`w-8 h-8 flex items-center justify-center font-bold text-xl ${
                          investmentType === 'lumpsum' ? 'text-blue-400' : 'text-gray-400'
                        }`}>
                          ₹
                        </div>
                      </div>
                      <h4 className="font-bold text-white mb-2">Lumpsum</h4>
                      <p className="text-gray-400 text-sm">One-time investment</p>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-white font-semibold">
                      {investmentType === 'sip' ? 'Monthly SIP Amount' : 'Investment Amount'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-30">
                        <IndianRupee className="h-5 w-5 text-blue-400" />
                      </div>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white text-lg font-semibold focus:border-blue-500 focus:outline-none relative z-20"
                        placeholder={investmentType === 'sip' ? '5,000' : '50,000'}
                        min={investmentType === 'sip' ? 500 : 5000}
                      />
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <label className="block text-white font-semibold">Duration (Years)</label>
                    <div className="grid grid-cols-4 gap-3">
                      {[5, 10, 15, 20].map(years => (
                        <button
                          key={years}
                          onClick={() => setDuration(years)}
                          className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                            duration === years
                              ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                              : 'border-gray-700 hover:border-gray-600 text-gray-400'
                          }`}
                        >
                          {years}Y
                        </button>
                      ))}
                    </div>
                  </div>

                  {investmentType === 'sip' && (
                    <div className="mt-8 space-y-4">
                      <label className="block text-white font-semibold">SIP Date</label>
                      <select
                        value={sipDate}
                        onChange={(e) => setSipDate(Number(e.target.value))}
                        className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                      >
                        {Array.from({length: 28}, (_, i) => i + 1).map(date => (
                          <option key={date} value={date}>
                            {date}{date === 1 ? 'st' : date === 2 ? 'nd' : date === 3 ? 'rd' : 'th'} of every month
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="mt-8">
                    <button 
                      onClick={() => setCurrentStep(2)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Lock className="w-5 h-5" />
                      <span>Make Payment</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800/50">
                  <h3 className="text-2xl font-bold text-white mb-6">Choose Payment Method</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-900/30 to-green-800/20 border-2 border-green-500/30 rounded-xl p-6 relative">
                      <div className="absolute top-3 right-3">
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">RECOMMENDED</span>
                      </div>
                      <div className="flex items-start space-x-4">
                        <input 
                          type="radio" 
                          id="nach" 
                          name="paymentMethod" 
                          value="nach" 
                          className="mt-1 w-4 h-4 text-green-500 focus:ring-green-500" 
                          defaultChecked
                        />
                        <div className="flex-1">
                          <label htmlFor="nach" className="text-white font-semibold text-lg cursor-pointer">NACH (Auto-Debit)</label>
                          <p className="text-gray-300 text-sm mt-1">Automatic monthly deductions for SIP</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
                      <div className="flex items-start space-x-4">
                        <input 
                          type="radio" 
                          id="online" 
                          name="paymentMethod" 
                          value="online" 
                          className="mt-1 w-4 h-4 text-blue-500 focus:ring-blue-500" 
                        />
                        <div className="flex-1">
                          <label htmlFor="online" className="text-white font-semibold text-lg cursor-pointer">UPI / Net Banking</label>
                          <p className="text-gray-300 text-sm mt-1">Pay online via BSE Star MF</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-8">
                    <button 
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200"
                    >
                      Back to Details
                    </button>
                    <button 
                      onClick={() => {
                        const paymentMethodElement = document.querySelector('input[name="paymentMethod"]:checked') as HTMLInputElement;
                        const paymentMethod = paymentMethodElement?.value;
                        if (paymentMethod === 'nach') {
                          handleNACHSetup();
                        } else {
                          handleOnlinePayment();
                        }
                      }}
                      className="flex-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Lock className="w-5 h-5" />
                      <span>Proceed to BSE Star MF</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6 sticky top-40 self-start">
            {calculations && (
              <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Investment Projection</h3>
                  <Calculator className="w-6 h-6 text-blue-400" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">
                      {investmentType === 'sip' ? 'Monthly Investment' : 'Investment Amount'}
                    </span>
                    <span className="text-white font-semibold">₹{amount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white font-semibold">{duration} years</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Expected Return</span>
                    <span className="text-green-400 font-semibold">12% p.a.</span>
                  </div>
                  
                  <hr className="border-gray-700" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Investment</span>
                    <span className="text-white font-semibold">
                      ₹{(investmentType === 'sip' ? amount * duration * 12 : amount).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Maturity Value</span>
                    <span className="text-blue-400 font-bold text-xl">
                      ₹{calculations.maturityAmount.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Wealth Gain</span>
                    <span className="text-green-400 font-bold text-xl">
                      ₹{calculations.wealthGain.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
