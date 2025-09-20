'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft, CheckCircle, Clock, Shield, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'sent' | 'verified'>('email');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateEmail = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful email send
      setStep('sent');
    } catch (error) {
      setErrors({ submit: 'Failed to send reset email. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful resend
      console.log('Email resent');
    } catch (error) {
      setErrors({ resend: 'Failed to resend email. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderEmailStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Forgot Password?</h2>
        <p className="text-gray-300">
          No worries! Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-200">
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors(prev => ({ ...prev, email: '' }));
                }
              }}
              className={`w-full px-4 py-4 bg-gray-800/50 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-800/70 transition-all duration-300 ${
                errors.email ? 'border-red-500' : 'border-gray-600 hover:border-gray-500'
              }`}
              placeholder="Enter your email address"
            />
            <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
        </div>
        
        {/* Submit Error */}
        {errors.submit && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-sm text-red-400">{errors.submit}</p>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <span>Send Reset Link</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
      
      <div className="text-center">
        <Link
          href="/auth/login"
          className="flex items-center justify-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </Link>
      </div>
    </div>
  );

  const renderSentStep = () => (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-green-400" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
        <p className="text-gray-300 mb-4">
          We've sent a password reset link to:
        </p>
        <p className="text-blue-400 font-semibold text-lg">{email}</p>
      </div>
      
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-left">
            <p className="text-blue-300 font-medium text-sm">Important:</p>
            <ul className="text-blue-200 text-sm mt-1 space-y-1">
              <li>• The reset link will expire in 15 minutes</li>
              <li>• Check your spam folder if you don't see the email</li>
              <li>• The link can only be used once</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-400 text-sm">
          Didn't receive the email?
        </p>
        
        <button
          onClick={handleResendEmail}
          disabled={isLoading}
          className="text-blue-400 hover:text-blue-300 font-semibold transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Resend Email'}
        </button>
        
        {errors.resend && (
          <p className="text-sm text-red-400">{errors.resend}</p>
        )}
      </div>
      
      <div className="pt-4 border-t border-gray-700">
        <Link
          href="/auth/login"
          className="flex items-center justify-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side - Security Features */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">SIP Brewery</h1>
            </div>
            <h2 className="text-4xl font-bold text-white leading-tight">
              Your account security is
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> our priority</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              We use industry-standard security measures to protect your account and ensure safe password recovery.
            </p>
          </div>
          
          {/* Security Features */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Secure Email Verification</h3>
                <p className="text-gray-400 text-sm">Time-limited reset links sent to your registered email</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">One-Time Use Links</h3>
                <p className="text-gray-400 text-sm">Reset links expire after use for maximum security</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Time-Limited Access</h3>
                <p className="text-gray-400 text-sm">Reset links automatically expire after 15 minutes</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">SIP Brewery</h1>
            </div>
            
            {step === 'email' && renderEmailStep()}
            {step === 'sent' && renderSentStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
