'use client';

import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Building,
  CreditCard,
  TrendingUp,
  Zap,
  Globe,
  Award,
  DollarSign,
  PieChart,
  Database
} from 'lucide-react';

interface DemoLoginPageProps {
  onLogin: (userType: 'individual' | 'institutional') => void;
}

const DemoLoginPage: React.FC<DemoLoginPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lastUsedEmail, setLastUsedEmail] = useState('');
  const [showTrustSignals, setShowTrustSignals] = useState(false);
  const [showAccountTypeSelection, setShowAccountTypeSelection] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState<'individual' | 'institutional'>('individual');

  // AI Assistant Logic
  useEffect(() => {
    // Show AI assistant after 5 seconds of inactivity
    const timer = setTimeout(() => {
      if (!loading && !formData.email && !formData.password) {
        setShowAIAssistant(true);
        setAiMessage('👋 Need help logging in? I can auto-fill demo credentials for you!');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [loading, formData.email, formData.password]);

  // Check for returning user
  useEffect(() => {
    const savedEmail = localStorage.getItem('sipbrewery_last_email');
    if (savedEmail) {
      setLastUsedEmail(savedEmail);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        alert('Please fill in email and password');
        setLoading(false);
        return;
      }
      
      if (!isLogin) {
        if (!formData.name || !formData.phone) {
          alert('Please fill in all required fields');
          setLoading(false);
          return;
        }
        
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match');
          setLoading(false);
          return;
        }
      }
      
      // For demo purposes, check if credentials match demo credentials
      if (isLogin) {
        if (formData.email !== demoCredentials.email || formData.password !== demoCredentials.password) {
          setLoginAttempts(prev => prev + 1);
          setShowAIAssistant(true);
          setAiMessage('🤖 Login failed: Incorrect credentials. Want me to auto-fill the demo credentials for you?');
          setLoading(false);
          return;
        }
      }
      
      // Save email for returning user experience
      localStorage.setItem('sipbrewery_last_email', formData.email);
      
      // Show account type selection after successful login
      setTimeout(() => {
        setLoading(false);
        setShowAccountTypeSelection(true);
      }, 1500);
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      alert('An error occurred. Please try again.');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const demoCredentials = {
    email: 'demo@sipbrewery.com',
    password: 'demo123'
  };

  const fillDemoCredentials = () => {
    setFormData(prev => ({
      ...prev,
      email: demoCredentials.email,
      password: demoCredentials.password
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Premium Animated Background */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-full blur-3xl animate-spin" style={{animationDuration: '60s'}}></div>
        
        {/* Premium grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015] bg-noise"></div>
      </div>

      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Premium Branding & Features */}
        <div className="text-center lg:text-left space-y-8">
          {/* Premium Brand Identity */}
          <div className="space-y-6">
            {/* Logo & Brand */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-5xl font-black text-white tracking-tight">
                  SIP <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Brewery</span>
                </h1>
                <p className="text-sm text-blue-300 font-medium tracking-wide uppercase">Institutional Intelligence Platform</p>
              </div>
            </div>
            
            {/* Value Proposition */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                $1 Trillion Fund-Level
                <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  Analysis & Intelligence
                </span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                Experience sovereign wealth fund sophistication with institutional-grade stock & mutual fund analysis powered by 1000+ AI models.
              </p>
            </div>
          </div>

          {/* Premium Feature Showcase */}
          <div className="space-y-6">
            {/* Institutional Capabilities */}
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                Institutional-Grade Capabilities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">50K+ Stocks Analyzed</h4>
                    <p className="text-gray-400 text-xs mt-1">AI-powered analysis with 87.5% accuracy</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <PieChart className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">2,500+ Mutual Funds</h4>
                    <p className="text-gray-400 text-xs mt-1">All categories with real-time NAV tracking</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Database className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">5K+ Data Sources</h4>
                    <p className="text-gray-400 text-xs mt-1">Satellite, social, economic intelligence</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Analysis Platform</h4>
                    <p className="text-gray-400 text-xs mt-1">Free insights, not a broker</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">99.99% Uptime</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">Bank-Grade Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">SEBI Compliant</span>
              </div>
            </div>
          </div>

          {/* Platform Metrics with Pulsing Animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
              <div className="text-2xl font-bold text-green-400 flex items-center justify-center space-x-2">
                <span>₹10,000Cr+</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-sm text-gray-400">Assets Under Management</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
              <div className="text-2xl font-bold text-blue-400 flex items-center justify-center space-x-2">
                <span>50,000+</span>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-sm text-gray-400">Active Investors</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
              <div className="text-2xl font-bold text-purple-400 flex items-center justify-center space-x-2">
                <span>99.9%</span>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-sm text-gray-400">Uptime SLA</div>
            </div>
          </div>
        </div>

        {/* Right Side - Premium Login Form */}
        <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden">
          {/* Premium glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent rounded-3xl"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Premium Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-3xl font-black text-white mb-3 tracking-tight">
                {isLogin ? (
                  lastUsedEmail ? (
                    <span className="flex items-center justify-center space-x-2">
                      <span>Welcome Back</span>
                      <span className="text-2xl">👋</span>
                    </span>
                  ) : 'Secure Access'
                ) : 'Join the Elite'}
              </h2>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                {isLogin ? (
                  lastUsedEmail ? (
                    <span>Your $1T fund-level dashboard awaits</span>
                  ) : 'Access institutional-grade analysis'
                ) : 'Experience sovereign wealth fund intelligence'}
              </p>
              
              {/* Status indicator */}
              <div className="flex items-center justify-center space-x-2 mt-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400 font-medium">All systems operational</span>
              </div>
            </div>

            {/* Premium Demo Access */}
            <div className="mb-8 p-6 bg-gradient-to-r from-emerald-900/30 via-green-900/20 to-emerald-900/30 border border-emerald-500/30 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <Zap className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-emerald-400 font-bold text-lg">Instant Demo Access</h3>
                    <p className="text-emerald-300/80 text-sm">Experience the full platform immediately</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-emerald-400 font-medium">LIVE DEMO</div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mt-1 ml-auto"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-black/20 rounded-xl p-3 border border-emerald-500/20">
                  <div className="text-xs text-emerald-400 font-medium mb-1">Demo Email</div>
                  <div className="text-white font-mono text-sm">{demoCredentials.email}</div>
                </div>
                <div className="bg-black/20 rounded-xl p-3 border border-emerald-500/20">
                  <div className="text-xs text-emerald-400 font-medium mb-1">Demo Password</div>
                  <div className="text-white font-mono text-sm">{demoCredentials.password}</div>
                </div>
              </div>
              
              <button
                onClick={fillDemoCredentials}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Quick Demo Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="+91 9876543210"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Confirm your password"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center group cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-300 group-hover:text-white transition-colors">Remember me</span>
                  <div className="ml-1 relative group">
                    <span className="text-gray-500 hover:text-gray-300 cursor-help">ℹ️</span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Avoid re-login next time on this device
                    </div>
                  </div>
                </label>
                <button type="button" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}
            
            {/* Enhanced Trust Signals */}
            <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">Bank-grade Security</span>
                </div>
                <button 
                  onClick={() => setShowTrustSignals(!showTrustSignals)}
                  className="text-green-400 hover:text-green-300 text-xs transition-colors"
                >
                  Why SIP Brewery is safe ▼
                </button>
              </div>
              {showTrustSignals && (
                <div className="mt-2 text-xs text-gray-300 space-y-1">
                  <div>• 256-bit SSL encryption for all data</div>
                  <div>• AMFI registered mutual fund platform</div>
                  <div>• SEBI compliant investment processes</div>
                  <div>• Multi-factor authentication support</div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 ${
                selectedAccountType === 'individual'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                  : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
              } text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
              onClick={(e) => {
                console.log('Button clicked!', { isLogin, formData });
                // The form onSubmit will handle the actual submission
              }}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In to Dashboard' : 'Create Account'}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-3 bg-gray-800/30 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-xs text-gray-400">
                Bank-grade security with 256-bit SSL encryption
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Account Type Selection Modal */}
      {showAccountTypeSelection && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl p-8 border border-white/20 shadow-2xl max-w-md w-full relative">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to SIP Brewery!</h2>
              <p className="text-gray-300">Please select your account type to continue</p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => {
                  setSelectedAccountType('individual');
                  onLogin('individual');
                }}
                className="w-full p-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all transform hover:scale-105 text-left group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Individual Investor</h3>
                    <p className="text-blue-100 text-sm">Personal investment portfolio management</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white">Personal SIPs</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white">Tax Planning</span>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              
              <button
                onClick={() => {
                  setSelectedAccountType('institutional');
                  onLogin('institutional');
                }}
                className="w-full p-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl transition-all transform hover:scale-105 text-left group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Institutional Investor</h3>
                    <p className="text-purple-100 text-sm">Enterprise-grade portfolio management</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white">Bulk Investments</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white">Risk Analytics</span>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-green-400 text-sm font-medium">Same Premium Experience</span>
              </div>
              <p className="text-gray-300 text-xs">Both account types get access to the same advanced features, AI insights, and professional-grade tools.</p>
            </div>
          </div>
        </div>
      )}
      
      {/* AI Assistant Bubble */}
      {showAIAssistant && !showAccountTypeSelection && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-2xl shadow-2xl max-w-sm relative">
            <button 
              onClick={() => setShowAIAssistant(false)}
              className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-gray-700 transition-colors"
            >
              ×
            </button>
            <div className="flex items-start space-x-3">
              <div className="bg-white/20 rounded-full p-2 flex-shrink-0">
                <span className="text-lg">🤖</span>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">SIP Brewery AI Assistant</p>
                <p className="text-xs text-blue-100 mb-3">{aiMessage}</p>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => {
                      fillDemoCredentials();
                      setShowAIAssistant(false);
                    }}
                    className="bg-white/20 hover:bg-white/30 text-xs px-3 py-1 rounded-lg transition-colors"
                  >
                    Auto-fill Demo
                  </button>
                  <button 
                    onClick={() => setShowAIAssistant(false)}
                    className="text-xs text-blue-200 hover:text-white transition-colors"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
            {/* Speech bubble tail */}
            <div className="absolute bottom-0 right-8 transform translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-purple-600"></div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default DemoLoginPage;
