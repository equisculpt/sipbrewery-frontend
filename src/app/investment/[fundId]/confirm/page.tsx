'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Shield, Clock, Calculator, Info, CheckCircle, AlertCircle, CreditCard, Building2, Users, Star, Settings, BarChart3, TrendingDown, ArrowRight, Zap, Award, PieChart, Activity, Smartphone, ArrowLeft, Edit3 } from 'lucide-react';
import PayTMStyleNavigation from '../../../../components/PayTMStyleNavigation';
import { useRouter } from 'next/navigation';

const InvestmentConfirmation = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data - would come from previous page state or API
  const investmentData = {
    fundName: "HDFC Top 100 Fund",
    fundFullName: "HDFC Top 100 Fund - Direct Growth",
    investmentType: "SIP",
    amount: "5000",
    frequency: "Monthly",
    duration: "36",
    startDate: "2024-01-15",
    paymentMethod: "nach",
    isDynamicSIP: true,
    dynamicRange: { min: 4000, max: 6000 },
    nav: "847.32",
    expectedReturn: 15.1,
    projection: {
      invested: 180000,
      returns: 45230,
      total: 225230
    }
  };

  const paymentMethods = {
    nach: { name: 'NACH', description: 'Auto-debit for SIP investments', icon: CreditCard },
    netbanking: { name: 'Net Banking', description: 'Pay directly from your bank account', icon: Building2 },
    upi: { name: 'UPI', description: 'Instant payment via UPI apps', icon: Smartphone }
  };

  const handleConfirmInvestment = () => {
    setIsProcessing(true);
    // Simulate processing time
    setTimeout(() => {
      router.push(`/investment/${investmentData.fundName}/payment`);
    }, 2000);
  };

  const handleEdit = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
      <PayTMStyleNavigation />
      
      <div className="main-content pt-24 pb-12">
        <div className="w-full flex justify-center">
          <div className="max-w-4xl px-6">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <CheckCircle className="w-12 h-12 text-emerald-400" />
              <h1 className="text-4xl font-bold text-white">Confirm Your Investment</h1>
            </div>
            <p className="text-xl text-gray-300">Review your investment details before proceeding</p>
          </div>

          {/* Investment Summary */}
          <div className="space-y-8">
            
            {/* Fund Information */}
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white">{investmentData.fundName}</h2>
                <p className="text-gray-300">{investmentData.fundFullName}</p>
                <div className="flex items-center justify-center space-x-4 mt-2">
                  <span className="text-sm text-gray-400">NAV: ₹{investmentData.nav}</span>
                  <span className="text-sm text-emerald-400">Large Cap Equity</span>
                </div>
              </div>
            </div>

            {/* Investment Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Investment Type & Amount */}
              <div className="space-y-6">
                <div className="text-center py-6">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    {investmentData.investmentType === 'SIP' ? (
                      <Clock className="w-8 h-8 text-blue-400" />
                    ) : (
                      <CreditCard className="w-8 h-8 text-purple-400" />
                    )}
                    <h3 className="text-xl font-bold text-white">{investmentData.investmentType} Investment</h3>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    ₹{parseInt(investmentData.amount).toLocaleString('en-IN')}
                  </div>
                  {investmentData.investmentType === 'SIP' && (
                    <p className="text-gray-300">{investmentData.frequency} for {investmentData.duration} months</p>
                  )}
                </div>

                {/* Dynamic SIP Info */}
                {investmentData.isDynamicSIP && (
                  <div className="text-center py-4">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <Zap className="w-6 h-6 text-emerald-400" />
                      <span className="text-lg font-bold text-white">Dynamic SIP Active</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Range: ₹{investmentData.dynamicRange.min.toLocaleString('en-IN')} - ₹{investmentData.dynamicRange.max.toLocaleString('en-IN')}
                    </p>
                  </div>
                )}
              </div>

              {/* Payment & Schedule */}
              <div className="space-y-6">
                <div className="text-center py-6">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    {React.createElement(paymentMethods[investmentData.paymentMethod].icon, { 
                      className: "w-8 h-8 text-emerald-400" 
                    })}
                    <h3 className="text-xl font-bold text-white">Payment Method</h3>
                  </div>
                  <div className="text-lg font-bold text-white mb-1">
                    {paymentMethods[investmentData.paymentMethod].name}
                  </div>
                  <p className="text-gray-300 text-sm">
                    {paymentMethods[investmentData.paymentMethod].description}
                  </p>
                </div>

                <div className="text-center py-4">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    <Calendar className="w-6 h-6 text-purple-400" />
                    <span className="text-lg font-bold text-white">Start Date</span>
                  </div>
                  <p className="text-lg text-white">
                    {new Date(investmentData.startDate).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Investment Projection */}
            <div className="text-center py-8">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Calculator className="w-8 h-8 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">Expected Returns</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Projected @ {investmentData.expectedReturn}% p.a. (FSI Prediction)
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center py-4">
                  <p className="text-gray-300 text-sm mb-2">Total Investment</p>
                  <p className="text-2xl font-bold text-white">
                    ₹{(investmentData.projection.invested / 100000).toFixed(1)}L
                  </p>
                </div>
                <div className="text-center py-4">
                  <p className="text-gray-300 text-sm mb-2">Expected Gains</p>
                  <p className="text-2xl font-bold text-emerald-400">
                    ₹{(investmentData.projection.returns / 100000).toFixed(1)}L
                  </p>
                </div>
                <div className="text-center py-4">
                  <p className="text-gray-300 text-sm mb-2">Maturity Value</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    ₹{(investmentData.projection.total / 100000).toFixed(1)}L
                  </p>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="text-center py-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Info className="w-6 h-6 text-blue-400" />
                <span className="text-lg font-bold text-white">Important Information</span>
              </div>
              <div className="space-y-2 text-sm text-gray-300 max-w-2xl mx-auto">
                <p>• Mutual fund investments are subject to market risks</p>
                <p>• Past performance is not indicative of future results</p>
                <p>• Please read all scheme documents carefully before investing</p>
                <p>• You can modify or cancel your SIP anytime</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-8">
              <button
                onClick={handleEdit}
                className="flex-1 py-4 px-8 font-bold text-lg text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <ArrowLeft className="w-6 h-6" />
                <span>Edit Details</span>
              </button>
              
              <button
                onClick={handleConfirmInvestment}
                disabled={isProcessing}
                className="flex-1 relative overflow-hidden py-4 px-8 rounded-2xl border-2 border-emerald-400 bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/30 font-bold text-lg transition-all duration-500 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-20 animate-pulse"></div>
                
                {/* Sparkle effects */}
                {!isProcessing && (
                  <>
                    <div className="absolute top-1 left-4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                    <div className="absolute top-3 right-6 w-1 h-1 bg-white rounded-full animate-ping delay-300"></div>
                    <div className="absolute bottom-2 left-1/3 w-1 h-1 bg-white rounded-full animate-ping delay-700"></div>
                  </>
                )}

                <div className="relative flex items-center justify-center space-x-3 text-white">
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      <span>Confirm & Proceed to Payment</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Security Indicators */}
            <div className="flex items-center justify-center space-x-8 pt-6">
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
                <span className="text-sm font-medium">10L+ Investors</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentConfirmation;
