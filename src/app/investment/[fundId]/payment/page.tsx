'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Shield, Clock, Calculator, Info, CheckCircle, AlertCircle, CreditCard, Building2, Users, Star, Settings, BarChart3, TrendingDown, ArrowRight, Zap, Award, PieChart, Activity, Smartphone, ArrowLeft, Edit3, Loader, Lock } from 'lucide-react';
import PayTMStyleNavigation from '../../../../components/PayTMStyleNavigation';
import { useRouter } from 'next/navigation';

const PaymentProcessing = () => {
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState('initiating'); // initiating, processing, success, failed
  const [progress, setProgress] = useState(0);
  const [transactionId, setTransactionId] = useState('');

  // Mock payment data
  const paymentData = {
    fundName: "HDFC Top 100 Fund",
    investmentType: "SIP",
    amount: "5000",
    frequency: "Monthly",
    paymentMethod: "nach",
    orderId: "ORD" + Date.now(),
    timestamp: new Date().toISOString()
  };

  const paymentMethods = {
    nach: { name: 'NACH', description: 'Auto-debit setup', icon: CreditCard, color: 'emerald' },
    netbanking: { name: 'Net Banking', description: 'Bank redirect', icon: Building2, color: 'blue' },
    upi: { name: 'UPI', description: 'UPI payment', icon: Smartphone, color: 'purple' }
  };

  const currentMethod = paymentMethods[paymentData.paymentMethod];

  // Simulate payment processing
  useEffect(() => {
    const processPayment = async () => {
      // Initiating phase
      setPaymentStatus('initiating');
      setProgress(10);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Processing phase
      setPaymentStatus('processing');
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 300);

      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Complete payment
      clearInterval(progressInterval);
      setProgress(100);
      
      // Generate transaction ID
      const txnId = 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
      setTransactionId(txnId);
      
      // Simulate success/failure (90% success rate)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        setPaymentStatus('success');
        setTimeout(() => {
          router.push(`/investment/success/${txnId}`);
        }, 2000);
      } else {
        setPaymentStatus('failed');
      }
    };

    processPayment();
  }, [router]);

  const handleRetry = () => {
    setPaymentStatus('initiating');
    setProgress(0);
    // Restart the payment process
    window.location.reload();
  };

  const handleCancel = () => {
    router.back();
  };

  const getStatusColor = () => {
    switch (paymentStatus) {
      case 'initiating': return 'blue';
      case 'processing': return 'yellow';
      case 'success': return 'emerald';
      case 'failed': return 'red';
      default: return 'gray';
    }
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'initiating': 
        return <Loader className="w-12 h-12 text-blue-400 animate-spin" />;
      case 'processing': 
        return <Activity className="w-12 h-12 text-yellow-400 animate-pulse" />;
      case 'success': 
        return <CheckCircle className="w-12 h-12 text-emerald-400" />;
      case 'failed': 
        return <AlertCircle className="w-12 h-12 text-red-400" />;
      default: 
        return <Loader className="w-12 h-12 text-gray-400" />;
    }
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case 'initiating': 
        return {
          title: 'Initiating Payment',
          subtitle: 'Setting up your payment gateway...'
        };
      case 'processing': 
        return {
          title: 'Processing Payment',
          subtitle: `Processing ${currentMethod.name} payment...`
        };
      case 'success': 
        return {
          title: 'Payment Successful!',
          subtitle: 'Your investment has been confirmed'
        };
      case 'failed': 
        return {
          title: 'Payment Failed',
          subtitle: 'There was an issue processing your payment'
        };
      default: 
        return {
          title: 'Processing...',
          subtitle: 'Please wait'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
      <PayTMStyleNavigation />
      
      <div className="main-content pt-24 pb-12">
        <div className="w-full flex justify-center">
          <div className="max-w-3xl px-6">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Lock className="w-10 h-10 text-emerald-400" />
              <h1 className="text-4xl font-bold text-white">Secure Payment</h1>
            </div>
            <p className="text-xl text-gray-300">Your payment is being processed securely</p>
          </div>

          {/* Payment Status Card */}
          <div className="text-center py-12 mb-8">
            
            {/* Status Icon */}
            <div className="flex justify-center mb-6">
              {getStatusIcon()}
            </div>

            {/* Status Message */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {getStatusMessage().title}
              </h2>
              <p className="text-lg text-gray-300">
                {getStatusMessage().subtitle}
              </p>
            </div>

            {/* Progress Bar */}
            {(paymentStatus === 'initiating' || paymentStatus === 'processing') && (
              <div className="mb-8">
                <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 bg-gradient-to-r ${
                      paymentStatus === 'initiating' 
                        ? 'from-blue-500 to-blue-600' 
                        : 'from-yellow-500 to-orange-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400">{Math.round(progress)}% Complete</p>
              </div>
            )}

            {/* Transaction ID */}
            {transactionId && (
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-1">Transaction ID</p>
                <p className="text-lg font-mono text-white">{transactionId}</p>
              </div>
            )}
          </div>

          {/* Payment Details Summary */}
          <div className="space-y-6 mb-8">
            <div className="text-center py-6">
              <h3 className="text-xl font-bold text-white mb-6">Payment Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="text-center py-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-gray-300">Fund</span>
                  </div>
                  <p className="text-lg font-bold text-white">{paymentData.fundName}</p>
                </div>
                
                <div className="text-center py-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {React.createElement(currentMethod.icon, { 
                      className: `w-5 h-5 text-${currentMethod.color}-400` 
                    })}
                    <span className="text-sm text-gray-300">Payment</span>
                  </div>
                  <p className="text-lg font-bold text-white">{currentMethod.name}</p>
                </div>
                
                <div className="text-center py-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Calculator className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm text-gray-300">Amount</span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    ₹{parseInt(paymentData.amount).toLocaleString('en-IN')}
                  </p>
                  {paymentData.investmentType === 'SIP' && (
                    <p className="text-sm text-gray-400">{paymentData.frequency}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {paymentStatus === 'failed' && (
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <button
                onClick={handleCancel}
                className="flex-1 py-4 px-8 font-bold text-lg text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <ArrowLeft className="w-6 h-6" />
                <span>Go Back</span>
              </button>
              
              <button
                onClick={handleRetry}
                className="flex-1 relative overflow-hidden py-4 px-8 rounded-2xl border-2 border-blue-400 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/30 font-bold text-lg transition-all duration-500 transform hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 animate-pulse"></div>
                
                <div className="relative flex items-center justify-center space-x-3 text-white">
                  <ArrowRight className="w-6 h-6" />
                  <span>Retry Payment</span>
                </div>
              </button>
            </div>
          )}

          {/* Security & Processing Info */}
          <div className="text-center py-6">
            <div className="space-y-4">
              {(paymentStatus === 'initiating' || paymentStatus === 'processing') && (
                <div className="text-sm text-gray-300 space-y-2">
                  <p className="flex items-center justify-center space-x-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span>Your payment is secured with 256-bit SSL encryption</span>
                  </p>
                  <p className="text-gray-400">Please do not close this window or press back button</p>
                  <p className="text-gray-400">Processing time: 30 seconds to 2 minutes</p>
                </div>
              )}
              
              {paymentStatus === 'success' && (
                <div className="text-sm text-gray-300">
                  <p className="text-emerald-400 font-medium">Redirecting to success page...</p>
                </div>
              )}
              
              {paymentStatus === 'failed' && (
                <div className="text-sm text-gray-300 space-y-2">
                  <p className="text-red-400">Payment could not be processed</p>
                  <p className="text-gray-400">Please try again or contact support if the issue persists</p>
                </div>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 pt-8">
              <div className="flex items-center space-x-2 text-gray-400">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">PCI DSS Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Award className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">SEBI Registered</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Lock className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium">Bank Grade Security</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;
