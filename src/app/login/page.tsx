'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, Smartphone, 
  Shield, CheckCircle, Zap, Star, Globe
} from 'lucide-react';
import PayTMStyleNavigation from '../../components/PayTMStyleNavigation';

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email');

  const redirect = searchParams.get('redirect');
  const fundId = searchParams.get('fundId');
  const fundName = searchParams.get('fundName');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful login
    setIsLoading(false);
    
    // Redirect to intended page or dashboard
    if (redirect && fundId && fundName) {
      router.push(`${redirect}?fundId=${fundId}&fundName=${fundName}`);
    } else if (redirect) {
      router.push(redirect);
    } else {
      router.push('/dashboard');
    }
  };

  const handleGoogleLogin = () => {
    // Mock Google login
    if (redirect && fundId && fundName) {
      router.push(`${redirect}?fundId=${fundId}&fundName=${fundName}`);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <PayTMStyleNavigation />
      
      <div className="container mx-auto px-6 py-8 pt-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-white mb-4">
                Welcome to
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SIP Brewery
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Your AI-powered investment companion for smarter mutual fund decisions
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { icon: Shield, title: 'Secure', desc: 'Bank-grade security' },
                { icon: Zap, title: 'Fast', desc: 'Instant transactions' },
                { icon: Star, title: 'Rated', desc: '4.8★ user rating' },
                { icon: Globe, title: 'Trusted', desc: '1M+ investors' }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>

            {redirect && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-blue-400 font-medium">Continue Your Investment</p>
                    <p className="text-gray-300 text-sm">Login to proceed with your fund investment</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Login Form */}
          <div className="max-w-md mx-auto w-full">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
                <p className="text-gray-300">Access your investment dashboard</p>
              </div>

              {/* Login Method Toggle */}
              <div className="flex space-x-1 mb-6 bg-white/5 p-1 rounded-2xl border border-white/10">
                <button
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                    loginMethod === 'email' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </button>
                <button
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                    loginMethod === 'phone' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Phone</span>
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email/Phone Input */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {loginMethod === 'email' ? <Mail className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
                  </div>
                  <input
                    type={loginMethod === 'email' ? 'email' : 'tel'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 bg-white/5 hover:bg-white/10 focus:bg-white/15 border border-white/20 hover:border-white/40 focus:border-blue-400/60 rounded-xl text-white placeholder-gray-300 focus:outline-none transition-all duration-300 pl-12 pr-4"
                    placeholder={loginMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 bg-white/5 hover:bg-white/10 focus:bg-white/15 border border-white/20 hover:border-white/40 focus:border-blue-400/60 rounded-xl text-white placeholder-gray-300 focus:outline-none transition-all duration-300 pl-12 pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-gray-300">
                    <input type="checkbox" className="rounded border-gray-600 bg-gray-700 text-blue-600" />
                    <span className="text-sm">Remember me</span>
                  </label>
                  <button type="button" className="text-blue-400 hover:text-blue-300 text-sm">
                    Forgot password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading || !email || !password}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-white/20"></div>
                <span className="px-4 text-gray-400 text-sm">or</span>
                <div className="flex-1 border-t border-white/20"></div>
              </div>

              {/* Google Login */}
              <button
                onClick={handleGoogleLogin}
                className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">G</span>
                </div>
                <span>Continue with Google</span>
              </button>

              {/* Sign Up Link */}
              <div className="text-center mt-6">
                <p className="text-gray-400">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => router.push('/signup')}
                    className="text-blue-400 hover:text-blue-300 font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
              <p className="text-yellow-400 font-medium mb-2">Demo Credentials:</p>
              <p className="text-gray-300 text-sm">
                Email: demo@sipbrewery.com<br />
                Password: demo123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
