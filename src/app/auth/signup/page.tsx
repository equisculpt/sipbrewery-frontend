'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, ArrowLeft, CheckCircle, Shield, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    fullName: '',
    email: '',
    phone: '',
    // Step 2: Security
    password: '',
    confirmPassword: '',
    // Step 3: Preferences
    investmentExperience: '',
    riskTolerance: '',
    monthlyInvestment: '',
    // Step 4: Verification
    agreeToTerms: false,
    agreeToPrivacy: false,
    subscribeNewsletter: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const steps = [
    { number: 1, title: 'Basic Information', description: 'Tell us about yourself' },
    { number: 2, title: 'Security Setup', description: 'Create a secure password' },
    { number: 3, title: 'Investment Profile', description: 'Help us personalize your experience' },
    { number: 4, title: 'Verification', description: 'Review and confirm' }
  ];

  const validateStep = (step: number) => {
    const newErrors: {[key: string]: string} = {};
    
    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phone) {
          newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
          newErrors.phone = 'Please enter a valid 10-digit phone number';
        }
        break;
      
      case 2:
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
          newErrors.password = 'Password must contain uppercase, lowercase, and number';
        }
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;
      
      case 3:
        if (!formData.investmentExperience) newErrors.investmentExperience = 'Please select your experience level';
        if (!formData.riskTolerance) newErrors.riskTolerance = 'Please select your risk tolerance';
        if (!formData.monthlyInvestment) newErrors.monthlyInvestment = 'Please select your investment range';
        break;
      
      case 4:
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms of service';
        if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock successful signup
      localStorage.setItem('sipbrewery_token', 'mock_jwt_token');
      localStorage.setItem('sipbrewery_user', JSON.stringify({
        id: '1',
        name: formData.fullName,
        email: formData.email,
        avatar: null,
        isNewUser: true
      }));
      
      router.push('/dashboard?welcome=true');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-200">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 bg-gray-800/50 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-800/70 transition-all duration-300 ${
                    errors.fullName ? 'border-red-500' : 'border-gray-600 hover:border-gray-500'
                  }`}
                  placeholder="Enter your full name"
                />
                <User className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {errors.fullName && <p className="text-sm text-red-400">{errors.fullName}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-200">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 bg-gray-800/50 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-800/70 transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-gray-600 hover:border-gray-500'
                  }`}
                  placeholder="Enter your email address"
                />
                <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-200">
                Phone Number
              </label>
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 bg-gray-800/50 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-800/70 transition-all duration-300 ${
                    errors.phone ? 'border-red-500' : 'border-gray-600 hover:border-gray-500'
                  }`}
                  placeholder="Enter your phone number"
                />
                <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {errors.phone && <p className="text-sm text-red-400">{errors.phone}</p>}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-200">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 pr-12 bg-gray-800/50 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-800/70 transition-all duration-300 ${
                    errors.password ? 'border-red-500' : 'border-gray-600 hover:border-gray-500'
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-200">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 pr-12 bg-gray-800/50 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-800/70 transition-all duration-300 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-600 hover:border-gray-500'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-400">{errors.confirmPassword}</p>}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="investmentExperience" className="block text-sm font-semibold text-gray-200">
                Investment Experience
              </label>
              <select
                id="investmentExperience"
                name="investmentExperience"
                value={formData.investmentExperience}
                onChange={handleInputChange}
                className={`w-full px-4 py-4 bg-gray-800/50 border-2 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:bg-gray-800/70 transition-all duration-300 ${
                  errors.investmentExperience ? 'border-red-500' : 'border-gray-600 hover:border-gray-500'
                }`}
                style={{
                  colorScheme: 'dark'
                }}
              >
                <option value="" className="bg-gray-800 text-white">Select your experience level</option>
                <option value="beginner" className="bg-gray-800 text-white">Beginner (0-1 years)</option>
                <option value="intermediate" className="bg-gray-800 text-white">Intermediate (1-5 years)</option>
                <option value="experienced" className="bg-gray-800 text-white">Experienced (5+ years)</option>
              </select>
              {errors.investmentExperience && <p className="text-sm text-red-400">{errors.investmentExperience}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="riskTolerance" className="block text-sm font-semibold text-gray-200">
                Risk Tolerance
              </label>
              <select
                id="riskTolerance"
                name="riskTolerance"
                value={formData.riskTolerance}
                onChange={handleInputChange}
                className={`w-full px-4 py-4 bg-gray-800/50 border-2 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:bg-gray-800/70 transition-all duration-300 ${
                  errors.riskTolerance ? 'border-red-500' : 'border-gray-600 hover:border-gray-500'
                }`}
                style={{
                  colorScheme: 'dark'
                }}
              >
                <option value="" className="bg-gray-800 text-white">Select your risk tolerance</option>
                <option value="conservative" className="bg-gray-800 text-white">Conservative (Low Risk)</option>
                <option value="moderate" className="bg-gray-800 text-white">Moderate (Medium Risk)</option>
                <option value="aggressive" className="bg-gray-800 text-white">Aggressive (High Risk)</option>
              </select>
              {errors.riskTolerance && <p className="text-sm text-red-400">{errors.riskTolerance}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="monthlyInvestment" className="block text-sm font-semibold text-gray-200">
                Expected Monthly Investment
              </label>
              <select
                id="monthlyInvestment"
                name="monthlyInvestment"
                value={formData.monthlyInvestment}
                onChange={handleInputChange}
                className={`w-full px-4 py-4 bg-gray-800/50 border-2 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:bg-gray-800/70 transition-all duration-300 ${
                  errors.monthlyInvestment ? 'border-red-500' : 'border-gray-600 hover:border-gray-500'
                }`}
                style={{
                  colorScheme: 'dark'
                }}
              >
                <option value="" className="bg-gray-800 text-white">Select investment range</option>
                <option value="1000-5000" className="bg-gray-800 text-white">₹1,000 - ₹5,000</option>
                <option value="5000-10000" className="bg-gray-800 text-white">₹5,000 - ₹10,000</option>
                <option value="10000-25000" className="bg-gray-800 text-white">₹10,000 - ₹25,000</option>
                <option value="25000-50000" className="bg-gray-800 text-white">₹25,000 - ₹50,000</option>
                <option value="50000+" className="bg-gray-800 text-white">₹50,000+</option>
              </select>
              {errors.monthlyInvestment && <p className="text-sm text-red-400">{errors.monthlyInvestment}</p>}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Account Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone:</span>
                  <span className="text-white">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Experience:</span>
                  <span className="text-white capitalize">{formData.investmentExperience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Risk Tolerance:</span>
                  <span className="text-white capitalize">{formData.riskTolerance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Monthly Investment:</span>
                  <span className="text-white">{formData.monthlyInvestment}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                />
                <span className="text-sm text-gray-300">
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreeToTerms && <p className="text-sm text-red-400">{errors.agreeToTerms}</p>}
              
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreeToPrivacy"
                  checked={formData.agreeToPrivacy}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                />
                <span className="text-sm text-gray-300">
                  I consent to the processing of my personal data for investment services
                </span>
              </label>
              {errors.agreeToPrivacy && <p className="text-sm text-red-400">{errors.agreeToPrivacy}</p>}
              
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                />
                <span className="text-sm text-gray-300">
                  Subscribe to investment insights and market updates (optional)
                </span>
              </label>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="w-full max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">SIP Brewery</h1>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Create Your Account</h2>
          <p className="text-gray-300">Join thousands of smart investors building wealth</p>
        </div>
        
        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                  currentStep >= step.number
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-gray-600 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.number}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 transition-all duration-200 ${
                    currentStep > step.number ? 'bg-blue-500' : 'bg-gray-600'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Form Container */}
        <div className="max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-1">
                {steps[currentStep - 1].title}
              </h3>
              <p className="text-gray-300 text-sm">
                {steps[currentStep - 1].description}
              </p>
            </div>
            
            <form onSubmit={currentStep === 4 ? handleSubmit : (e) => e.preventDefault()}>
              {renderStepContent()}
              
              {/* Submit Error */}
              {errors.submit && (
                <div className="mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-sm text-red-400">{errors.submit}</p>
                </div>
              )}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="flex items-center space-x-2 px-6 py-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <CheckCircle className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
            
            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-300">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
