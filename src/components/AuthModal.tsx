'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Smartphone, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  ArrowRight,
  Building,
  X,
  Sparkles,
  Zap,
  Info,
  KeyRound,
  Fingerprint,
  Check
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userType: 'individual' | 'institutional') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  // Typewriter effect component
  const TypewriterText: React.FC<{ text: string; speed?: number }> = ({ text, speed = 50 }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      }
    }, [currentIndex, text, speed]);

    useEffect(() => {
      setDisplayText('');
      setCurrentIndex(0);
    }, [text]);

    return <span>{displayText}<span className="animate-pulse">|</span></span>;
  };

  // Placeholder for premium forgot password flow
  const handleForgotPassword = () => {
    alert("Forgot password functionality coming soon!");
  };

  // Validation helper functions
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const isValidPassword = (password: string): boolean => {
    return password.length >= 8;
  };

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
  const [showAccountTypeSelection, setShowAccountTypeSelection] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState<'individual' | 'institutional'>('individual');
  const [lastUsedEmail, setLastUsedEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showAITip, setShowAITip] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [deviceTrusted, setDeviceTrusted] = useState(false);
  const [showOTPOption, setShowOTPOption] = useState(false);
  const [fetchedUserName, setFetchedUserName] = useState('');
  const [userLookupLoading, setUserLookupLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const lookupTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // AI-powered personalization and device trust
  useEffect(() => {
    const savedEmail = localStorage.getItem('sipbrewery_last_email');
    const savedName = localStorage.getItem('sipbrewery_user_name');
    const deviceId = localStorage.getItem('sipbrewery_device_id');
    const lastLoginTime = localStorage.getItem('sipbrewery_last_login');
    
    if (savedEmail) {
      setLastUsedEmail(savedEmail);
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setIsReturningUser(true);
      
      // Check if device is trusted (logged in within last 14 days)
      if (lastLoginTime) {
        const daysSinceLogin = (Date.now() - parseInt(lastLoginTime)) / (1000 * 60 * 60 * 24);
        if (daysSinceLogin <= 14) {
          setDeviceTrusted(true);
        }
      }
    }
    
    if (savedName) {
      setUserName(savedName);
    }
    
    // Generate device ID if not exists
    if (!deviceId) {
      const newDeviceId = 'device_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sipbrewery_device_id', newDeviceId);
    }
    
    // Auto-focus email field with animation delay
    setTimeout(() => {
      if (emailRef.current && !savedEmail) {
        emailRef.current.focus();
      }
    }, 500);
  }, []);

  // Database lookup function to fetch user's first name
  const lookupUserName = async (emailOrPhone: string) => {
    if (!emailOrPhone.trim() || emailOrPhone.length < 3) {
      setFetchedUserName('');
      return;
    }

    setUserLookupLoading(true);
    
    try {
      // Demo user data for testing
      const demoUsers: {[key: string]: string} = {
        'demo@sipbrewery.com': 'Demo User',
        'institutional@sipbrewery.com': 'Enterprise',
        'john@example.com': 'John',
        'jane@example.com': 'Jane',
        'admin@sipbrewery.com': 'Admin'
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      const email = emailOrPhone.trim().toLowerCase();
      if (demoUsers[email]) {
        setFetchedUserName(demoUsers[email]);
      } else {
        // Try to extract name from email if not in demo list
        if (email.includes('@')) {
          const username = email.split('@')[0];
          const capitalizedName = username.charAt(0).toUpperCase() + username.slice(1);
          setFetchedUserName(capitalizedName);
        } else {
          setFetchedUserName('');
        }
      }
    } catch (error) {
      console.log('User lookup failed:', error);
      setFetchedUserName('');
    } finally {
      setUserLookupLoading(false);
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowAITip('');
    
    try {
      // Enhanced validation with AI feedback
      const errors: {[key: string]: string} = {};
      
      Object.keys(formData).forEach(field => {
        const error = validateField(field, formData[field as keyof typeof formData]);
        if (error) errors[field] = error;
      });
      
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        setLoading(false);
        
        // AI feedback for validation errors
        const firstError = Object.keys(errors)[0];
        if (firstError === 'email') {
          setShowAITip('Please check your email format 📧');
          emailRef.current?.focus();
        } else if (firstError === 'password') {
          setShowAITip('Password needs to be stronger 🔒');
          passwordRef.current?.focus();
        }
        
        // Shake animation for errors
        const errorFields = document.querySelectorAll('.error-shake');
        errorFields.forEach(field => {
          field.classList.add('animate-shake');
          setTimeout(() => field.classList.remove('animate-shake'), 500);
        });
        
        return;
      }
      
      // Demo credentials validation
      const validCredentials = [
        { email: 'demo@sipbrewery.com', password: 'demo123' },
        { email: 'institutional@sipbrewery.com', password: 'enterprise123' },
        { email: 'admin@sipbrewery.com', password: 'admin123' }
      ];

      const isValidCredentials = validCredentials.some(
        cred => cred.email.toLowerCase() === formData.email.toLowerCase() && 
                cred.password === formData.password
      );

      if (!isValidCredentials && isLogin) {
        setLoading(false);
        setLoginAttempts(prev => prev + 1);
        setShowAITip('❌ Invalid credentials. Try: demo@sipbrewery.com / demo123');
        
        // Shake animation for failed login
        if (passwordRef.current) {
          passwordRef.current.classList.add('animate-shake');
          setTimeout(() => passwordRef.current?.classList.remove('animate-shake'), 500);
        }
        return;
      }
      
      // Simulate authentication with AI feedback
      setShowAITip('🔐 Verifying your credentials securely...');
      
      // Save user data for personalization
      localStorage.setItem('sipbrewery_last_email', formData.email);
      localStorage.setItem('sipbrewery_last_login', Date.now().toString());
      
      if (formData.name) {
        localStorage.setItem('sipbrewery_user_name', formData.name);
      }
      
      // Simulate network delay with AI feedback updates
      setTimeout(() => {
        setShowAITip('✨ Almost there! Preparing your dashboard...');
      }, 800);
      
      // Show account type selection after successful authentication
      setTimeout(() => {
        setLoading(false);
        setShowAccountTypeSelection(true);
        setShowAITip('🎉 Welcome to SIP Brewery!');
      }, 1500);
      
    } catch (error) {
      console.error('Auth error:', error);
      setLoading(false);
      setLoginAttempts(prev => prev + 1);
      
      // AI-powered error handling
      if (loginAttempts >= 1) {
        setShowAITip('Having trouble? Try the "Forgot Password" option 🤔');
      } else {
        setShowAITip('Something went wrong. Please try again 🔄');
      }
      
      // Shake animation for failed login
      if (passwordRef.current) {
        passwordRef.current.classList.add('animate-shake');
        setTimeout(() => passwordRef.current?.classList.remove('animate-shake'), 500);
      }
    }
  };

  // AI-powered helper functions
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getAITip = (field: string, value: string) => {
    switch (field) {
      case 'email':
        if (value && !value.includes('@')) return 'Add @ symbol for valid email';
        if (value && lastUsedEmail && value !== lastUsedEmail) return 'Different email detected. Want OTP instead?';
        return 'Use your registered email for fastest login';
      case 'password':
        if (value.length > 0 && value.length < 8) return 'Minimum 8 characters required';
        if (value.length >= 8) {
          const strength = getPasswordStrength(value);
          if (strength < 3) return 'Add numbers or symbols for better security';
          if (strength >= 4) return '✓ Strong password!';
        }
        return 'Use @, #, $, etc. for better security';
      default:
        return '';
    }
  };

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        return '';
      case 'name':
        if (!isLogin && !value) return 'Full name is required';
        return '';
      case 'phone':
        if (!isLogin && !value) return 'Phone number is required';
        if (!isLogin && !/^[+]?[0-9]{10,15}$/.test(value.replace(/\s/g, ''))) return 'Please enter a valid phone number';
        return '';
      case 'confirmPassword':
        if (!isLogin && value !== formData.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  // AI Voice Feature
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text.replace(/[🤖✨🔐🎉🔄🤔]/g, ''));
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      synth.speak(utterance);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Show AI tips for email and password
    if (field === 'email' || field === 'password') {
      setShowAITip(getAITip(field, value));
    }
    
    // Show password strength indicator
    if (field === 'password') {
      setShowPasswordStrength(value.length > 0);
    }
    
    // Detect OTP option for known emails
    if (field === 'email' && lastUsedEmail && value === lastUsedEmail && loginAttempts === 0) {
      setShowOTPOption(true);
    }
    
    // Debounced user lookup for email field
    if (field === 'email') {
      // Clear existing timeout
      if (lookupTimeoutRef.current) {
        clearTimeout(lookupTimeoutRef.current);
      }
      
      // Set new timeout for user lookup
      lookupTimeoutRef.current = setTimeout(() => {
        lookupUserName(value);
      }, 500); // 500ms debounce
    }
  };



  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .auth-modal .icon-button {
          background: transparent !important;
          background-color: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          appearance: none !important;
          -webkit-tap-highlight-color: transparent !important;
          -webkit-focus-ring-color: transparent !important;
        }
        .auth-modal .icon-button:focus {
          background: transparent !important;
          background-color: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
        .auth-modal .icon-button:active {
          background: transparent !important;
          background-color: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 auth-modal">
      <div className="relative">
        {/* ASI-Inspired Animated Container */}
        <div className="w-[380px] sm:w-[420px] p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 shadow-xl border border-white/10 backdrop-blur-md transition-all duration-300 scale-100 opacity-100 animate-[fadeInScale_300ms_ease-out] relative overflow-hidden">


          

          
          {/* Inner Content Container */}
          <div className="relative z-10">
            {/* Clean Close Button */}
            <button
              onClick={onClose}
              onFocus={(e) => e.target.blur()}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-20 icon-button"
              style={{
                background: 'transparent !important',
                backgroundColor: 'transparent !important',
                border: 'none !important',
                outline: 'none !important',
                boxShadow: 'none !important',
                WebkitAppearance: 'none !important',
                MozAppearance: 'none !important',
                appearance: 'none !important',
                WebkitTapHighlightColor: 'transparent !important',
                WebkitFocusRingColor: 'transparent !important'
              }}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

        {!showAccountTypeSelection ? (
          <>
            <div className="space-y-5 text-white text-center">
              {/* Welcome Header with AI Brewing Icon */}
              <div className="flex items-center justify-center gap-3">
                {/* AI Brewing Icon */}
                <div className="relative flex items-center justify-center w-8 h-8">
                  {/* Neural Chip Base */}
                  <div className="w-7 h-7 bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 rounded-lg border border-amber-300/50 flex items-center justify-center shadow-lg">
                    {/* Circuit Pattern */}
                    <div className="w-4 h-4 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 rounded-sm"></div>
                      <div className="absolute top-1 left-1 w-1 h-1 bg-white/90 rounded-full"></div>
                      <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/90 rounded-full"></div>
                      <div className="absolute top-1/2 left-0 w-full h-px bg-white/50"></div>
                      <div className="absolute left-1/2 top-0 w-px h-full bg-white/50"></div>
                    </div>
                  </div>
                  {/* Brewing Steam Dots */}
                  <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-80 animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
                  <div className="absolute -top-2 right-0 w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '2s' }}></div>
                  <div className="absolute -top-3 right-1 w-0.5 h-0.5 bg-purple-500 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '2s' }}></div>
                </div>
                
                <h2 className="text-2xl font-semibold">
                  {(() => {
                    // Show loading state while looking up user
                    if (userLookupLoading && formData.email.trim().length >= 3) {
                      return 'Welcome Back...';
                    }
                    
                    // If we have a fetched user name from database, use it
                    if (fetchedUserName) {
                      return `Welcome Back ${fetchedUserName}`;
                    }
                    
                    // Fallback to generic welcome if no user found or input too short
                    if (!formData.email.trim() || formData.email.trim().length < 3) {
                      return 'Welcome Back';
                    }
                    
                    // Show generic message while waiting for database response
                    return 'Welcome Back';
                  })()
                  }
                </h2>
              </div>
              
              <p className="text-gray-300 text-sm">Sign in securely to your portfolio</p>

              <form onSubmit={handleSubmit} className="space-y-8 flex flex-col items-center">
                {/* Email/Mobile */}
                <div className="flex items-center bg-gray-800/50 border border-gray-600 rounded-lg focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-400 focus-within:backdrop-blur-sm focus-within:bg-gray-800/70 focus-within:shadow-lg focus-within:shadow-purple-500/20 min-h-[54px] h-[54px] max-w-[320px] w-full transition-all duration-300">
                  {/* Icon Container */}
                  <div className="flex items-center gap-2 px-4 py-4 flex-shrink-0">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500 text-sm">/</span>
                    <Smartphone className="w-4 h-4 text-gray-400" />
                  </div>
                  {/* Spacer */}
                  <div className="w-3"></div>
                  {/* Input */}
                  <input
                    type="text"
                    placeholder="Enter email or mobile number"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none py-4 pl-4 pr-10 text-base"
                    disabled={loading}
                  />
                  {/* Validation Icon */}
                  {formData.email && (
                    <div className="flex items-center px-3 py-4 flex-shrink-0">
                      {isValidEmail(formData.email) ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <>
                          {/* Placeholder to maintain spacing */}
                          <div className="w-4 h-4" />
                        </>
                      )}
                    </div>
                  )}

                </div>

                {/* Spacer */}
                <div className="h-2"></div>

                {/* Password */}
                <div className="flex items-center bg-gray-800/50 border border-gray-600 rounded-lg focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-400 focus-within:backdrop-blur-sm focus-within:bg-gray-800/70 focus-within:shadow-lg focus-within:shadow-purple-500/20 min-h-[54px] h-[54px] max-w-[320px] w-full transition-all duration-300">
                  {/* Lock Icon */}
                  <div className="flex items-center px-3 py-4 flex-shrink-0">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                  {/* Spacer */}
                  <div className="w-3"></div>
                  {/* Input */}
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none py-5 px-2 text-base"
                    disabled={loading}
                    title={formData.password && !isValidPassword(formData.password) ? "Must be 8+ characters" : ""}
                  />
                  {/* Validation Icon */}
                  {formData.password && (
                    <div className="flex items-center px-2 py-4 flex-shrink-0">
                      {isValidPassword(formData.password) ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <>
                          {/* Placeholder to maintain spacing */}
                          <div className="w-4 h-4" />
                        </>
                      )}
                    </div>
                  )}
                  {/* Eye Icon */}
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center px-3 py-4 text-gray-400 hover:text-gray-300 transition-colors flex-shrink-0 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </div>
                </div>

                {/* Smart Tip Display */}
                <div className="mt-16 px-3 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg backdrop-blur-sm">
                  <div className="text-xs text-purple-300" style={{ display: 'inline', whiteSpace: 'nowrap' }}>
                    <span className="animate-pulse" style={{ display: 'inline' }}>🧠</span>
                    <span style={{ display: 'inline', marginLeft: '8px' }}>
                      {showAITip ? (
                        <TypewriterText text={`AI: ${showAITip}`} speed={30} />
                      ) : (
                        <TypewriterText text="Tip: Use your registered email for fastest login" speed={35} />
                      )}
                    </span>
                  </div>
                </div>

              {/* CTA Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 hover:bg-opacity-90 py-4 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-transform duration-150 hover:scale-[1.015] transition-all disabled:opacity-50 text-base"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              </form>

              {/* Premium Sign Up CTA */}
              <div className="text-center">
                <p className="text-sm text-gray-300 mb-4">
                  Don't have an account?
                </p>
                <button 
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="relative group inline-flex items-center justify-center gap-3 w-64 h-14 bg-gradient-to-r from-pink-500 via-rose-400 to-yellow-400 hover:from-pink-400 hover:via-rose-300 hover:to-yellow-300 text-white font-semibold text-base rounded-full transition-all duration-500 transform hover:scale-110 shadow-xl hover:shadow-2xl border border-pink-400/40 hover:border-yellow-400/60 animate-pulse hover:animate-none"
                  style={{
                    boxShadow: '0 15px 50px rgba(236, 72, 153, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}
                >
                  {/* AI Brewing Icon */}
                  <div className="relative flex items-center justify-center w-7 h-7">
                    {/* Neural Chip Base */}
                    <div className="w-6 h-6 bg-gradient-to-br from-pink-300 via-rose-300 to-yellow-300 rounded-lg border border-pink-300/50 flex items-center justify-center">
                      {/* Circuit Pattern */}
                      <div className="w-3 h-3 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/70 to-white/30 rounded-sm"></div>
                        <div className="absolute top-1 left-1 w-1 h-1 bg-yellow-200 rounded-full"></div>
                        <div className="absolute bottom-1 right-1 w-1 h-1 bg-pink-200 rounded-full"></div>
                        <div className="absolute top-1/2 left-0 w-full h-px bg-rose-200/60"></div>
                        <div className="absolute left-1/2 top-0 w-px h-full bg-rose-200/60"></div>
                      </div>
                    </div>
                    {/* Sparkle Particles */}
                    <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-90 animate-ping" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
                    <div className="absolute -top-2 right-0 w-1 h-1 bg-pink-300 rounded-full opacity-80 animate-ping" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}></div>
                    <div className="absolute -top-3 right-1 w-0.5 h-0.5 bg-rose-300 rounded-full opacity-70 animate-ping" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
                    <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-yellow-400 rounded-full opacity-60 animate-ping" style={{ animationDelay: '1.5s', animationDuration: '2s' }}></div>
                    <div className="absolute top-0 -left-2 w-0.5 h-0.5 bg-pink-400 rounded-full opacity-50 animate-ping" style={{ animationDelay: '2s', animationDuration: '2.5s' }}></div>
                  </div>
                  
                  {/* CTA Text */}
                  <span className="relative">
                    Sign Up & Unlock SIPBot
                    {/* Shimmer Effect */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        animation: 'shimmer 2s ease-in-out infinite'
                      }}
                    />
                  </span>
                  
                  {/* Subtle Accent Dots */}
                  <div className="absolute top-2 right-3 w-1 h-1 bg-yellow-300 rounded-full opacity-60 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                  <div className="absolute bottom-2 left-3 w-1 h-1 bg-pink-300 rounded-full opacity-40 group-hover:opacity-80 transition-opacity animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute top-1/2 left-2 w-0.5 h-0.5 bg-rose-300 rounded-full opacity-30 group-hover:opacity-60 transition-opacity animate-pulse" style={{ animationDelay: '1s' }}></div>
                  
                  {/* Soft Pulse Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-400 to-yellow-400 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-500 blur-xl animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-yellow-300 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-700 blur-2xl animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                </button>
                
                {/* Subtext */}
                <p className="text-xs text-gray-400 mt-2 max-w-xs mx-auto">
                  Join thousands using AI-powered SIP strategies
                </p>
              </div>
            </div>
          </>
        ) : (
          /* Account Type Selection */
          <div>
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
                  onClose();
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
                  onClose();
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
        )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default AuthModal;
