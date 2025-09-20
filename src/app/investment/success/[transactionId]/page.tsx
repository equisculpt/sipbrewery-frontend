'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Shield, Clock, Calculator, Info, CheckCircle, AlertCircle, CreditCard, Building2, Users, Star, Settings, BarChart3, TrendingDown, ArrowRight, Zap, Award, PieChart, Activity, Smartphone, Download, Share2, Home, Eye, Sparkles, Gift, Target } from 'lucide-react';
import PayTMStyleNavigation from '../../../../components/PayTMStyleNavigation';
import { useRouter, useParams } from 'next/navigation';

const InvestmentSuccess = () => {
  const router = useRouter();
  const params = useParams();
  const [showConfetti, setShowConfetti] = useState(true);
  const [animationStep, setAnimationStep] = useState(0);

  // Mock success data
  const successData = {
    transactionId: params.transactionId || 'TXN1234567890ABC',
    orderId: 'ORD' + Date.now(),
    fundName: "HDFC Top 100 Fund",
    fundFullName: "HDFC Top 100 Fund - Direct Growth",
    investmentType: "SIP",
    amount: "5000",
    frequency: "Monthly",
    duration: "36",
    startDate: "2024-01-15",
    paymentMethod: "NACH",
    isDynamicSIP: true,
    timestamp: new Date().toISOString(),
    folioNumber: "12345678/90",
    expectedMaturityDate: "2027-01-15",
    totalInvestment: 180000,
    expectedReturns: 45230,
    maturityValue: 225230,
    nextSIPDate: "2024-02-15"
  };

  // Animation sequence
  useEffect(() => {
    const animationSequence = [
      { step: 0, delay: 0 },
      { step: 1, delay: 500 },
      { step: 2, delay: 1000 },
      { step: 3, delay: 1500 }
    ];

    animationSequence.forEach(({ step, delay }) => {
      setTimeout(() => setAnimationStep(step), delay);
    });

    // Hide confetti after 3 seconds
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const handleViewPortfolio = () => {
    router.push('/dashboard');
  };

  const handleDownloadReceipt = () => {
    // Mock download functionality
    console.log('Downloading receipt...');
  };

  const handleShareSuccess = () => {
    // Mock share functionality
    if (navigator.share) {
      navigator.share({
        title: 'Investment Success!',
        text: `I just started my ${successData.investmentType} investment in ${successData.fundName}!`,
        url: window.location.href
      });
    }
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 relative overflow-hidden">
      <PayTMStyleNavigation />
      
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
      
      <div className="main-content pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Success Header with Animation */}
          <div className={`text-center mb-12 transition-all duration-1000 ${animationStep >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="relative">
                <CheckCircle className="w-20 h-20 text-emerald-400 animate-pulse" />
                <div className="absolute inset-0 w-20 h-20 rounded-full bg-emerald-400 opacity-20 animate-ping"></div>
              </div>
              <div className="text-left">
                <h1 className="text-5xl font-bold text-white mb-2">Investment Successful!</h1>
                <p className="text-xl text-emerald-300">Your journey to wealth creation begins now</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-lg text-gray-300">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <span>Congratulations on taking this smart financial step!</span>
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
          </div>

          {/* Investment Summary */}
          <div className={`space-y-8 transition-all duration-1000 delay-500 ${animationStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Fund & Investment Details */}
            <div className="text-center py-8">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white">{successData.fundName}</h2>
                  <p className="text-gray-300">{successData.fundFullName}</p>
                  <p className="text-emerald-400 font-medium">Folio: {successData.folioNumber}</p>
                </div>
              </div>
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center py-6">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  {successData.investmentType === 'SIP' ? (
                    <Clock className="w-8 h-8 text-blue-400" />
                  ) : (
                    <CreditCard className="w-8 h-8 text-purple-400" />
                  )}
                  <span className="text-lg font-bold text-white">{successData.investmentType}</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  ₹{parseInt(successData.amount).toLocaleString('en-IN')}
                </div>
                <p className="text-gray-300 text-sm">
                  {successData.investmentType === 'SIP' ? successData.frequency : 'One-time'}
                </p>
              </div>

              <div className="text-center py-6">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <Calendar className="w-8 h-8 text-purple-400" />
                  <span className="text-lg font-bold text-white">Duration</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {successData.duration} months
                </div>
                <p className="text-gray-300 text-sm">
                  Until {new Date(successData.expectedMaturityDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                </p>
              </div>

              <div className="text-center py-6">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <Building2 className="w-8 h-8 text-emerald-400" />
                  <span className="text-lg font-bold text-white">Payment</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {successData.paymentMethod}
                </div>
                <p className="text-gray-300 text-sm">Auto-debit setup</p>
              </div>

              <div className="text-center py-6">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <Target className="w-8 h-8 text-yellow-400" />
                  <span className="text-lg font-bold text-white">Goal</span>
                </div>
                <div className="text-2xl font-bold text-yellow-400 mb-1">
                  ₹{(successData.maturityValue / 100000).toFixed(1)}L
                </div>
                <p className="text-gray-300 text-sm">Expected value</p>
              </div>
            </div>

            {/* Dynamic SIP Badge */}
            {successData.isDynamicSIP && (
              <div className="text-center py-4">
                <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-2xl border-2 border-emerald-400 bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/30">
                  <Zap className="w-6 h-6 text-white animate-pulse" />
                  <span className="text-lg font-bold text-white">Dynamic SIP Activated</span>
                  <Award className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-300 text-sm mt-2">AI-powered optimization enabled for better returns</p>
              </div>
            )}
          </div>

          {/* Transaction Details */}
          <div className={`transition-all duration-1000 delay-1000 ${animationStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center py-8">
              <h3 className="text-xl font-bold text-white mb-6">Transaction Details</h3>
              
              <div className="space-y-3 max-w-md mx-auto">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-300">Transaction ID:</span>
                  <span className="text-white font-mono text-sm">{successData.transactionId}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-300">Order ID:</span>
                  <span className="text-white font-mono text-sm">{successData.orderId}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-300">Date & Time:</span>
                  <span className="text-white text-sm">
                    {new Date(successData.timestamp).toLocaleString('en-IN')}
                  </span>
                </div>
                {successData.investmentType === 'SIP' && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Next SIP:</span>
                    <span className="text-emerald-400 text-sm font-medium">
                      {new Date(successData.nextSIPDate).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`transition-all duration-1000 delay-1500 ${animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <button
                onClick={handleViewPortfolio}
                className="relative overflow-hidden py-4 px-6 rounded-2xl border-2 border-blue-400 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/30 font-bold text-white transition-all duration-500 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 animate-pulse"></div>
                <Eye className="w-5 h-5" />
                <span>View Portfolio</span>
              </button>

              <button
                onClick={handleDownloadReceipt}
                className="py-4 px-6 font-bold text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Receipt</span>
              </button>

              <button
                onClick={handleShareSuccess}
                className="py-4 px-6 font-bold text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Share2 className="w-5 h-5" />
                <span>Share Success</span>
              </button>

              <button
                onClick={handleGoHome}
                className="py-4 px-6 font-bold text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Home className="w-5 h-5" />
                <span>Go Home</span>
              </button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-center py-8">
            <h3 className="text-xl font-bold text-white mb-6">What's Next?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="py-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Track Performance</h4>
                <p className="text-gray-300 text-sm">Monitor your investment growth in real-time through your dashboard</p>
              </div>

              <div className="py-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Manage SIP</h4>
                <p className="text-gray-300 text-sm">Modify amount, pause, or stop your SIP anytime with just a few clicks</p>
              </div>

              <div className="py-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Earn Rewards</h4>
                <p className="text-gray-300 text-sm">Get cashback and rewards for consistent investments and referrals</p>
              </div>
            </div>
          </div>

          {/* Security & Trust Indicators */}
          <div className="flex items-center justify-center space-x-8 pt-8">
            <div className="flex items-center space-x-2 text-gray-400">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Investment Secured</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Award className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">SEBI Registered</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Users className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium">10L+ Happy Investors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSuccess;
