'use client';

import React, { useState, useEffect } from 'react';
import { Upload, Check, User, CreditCard, Shield, ArrowRight, Sparkles, Zap, Camera, FileText, Fingerprint } from 'lucide-react';

const KYCPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    pan: '',
    aadhaar: '',
    fullName: '',
    email: '',
    mobile: '',
    dob: '',
    selfie: null,
    panImage: null,
    aadhaarImage: null
  });
  const [focusedField, setFocusedField] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    { id: 'identity', title: 'Identity', icon: User, color: 'from-violet-500 to-purple-600' },
    { id: 'documents', title: 'Documents', icon: CreditCard, color: 'from-blue-500 to-indigo-600' },
    { id: 'verify', title: 'Verify', icon: Shield, color: 'from-emerald-500 to-teal-600' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [fieldName]: file }));
    }
  };

  const handleNext = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('KYC Completed Successfully! 🎉');
    }, 2000);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.fullName && formData.email && formData.mobile && formData.dob;
      case 1:
        return formData.pan && formData.aadhaar;
      case 2:
        return formData.selfie;
      default:
        return false;
    }
  };

  // Premium Input Component
  const PremiumInput = ({ 
    type = 'text', 
    name, 
    label, 
    value, 
    onChange, 
    icon: Icon,
    maxLength,
    uppercase = false,
    helper,
    autoComplete = 'off'
  }) => {
    const isFocused = focusedField === name;
    const hasValue = value && value.length > 0;
    
    return (
      <div className="relative group">
        <div className={`
          relative bg-gray-900/60 rounded-2xl border-2 transition-all duration-300
          ${isFocused 
            ? 'border-purple-500 shadow-lg shadow-purple-500/20 transform scale-[1.02]' 
            : hasValue 
              ? 'border-gray-600 hover:border-gray-500' 
              : 'border-gray-700 hover:border-gray-600'
          }
        `}>
          {Icon && (
            <div className={`
              absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300
              ${isFocused ? 'text-purple-400' : 'text-gray-500'}
            `}>
              <Icon className="w-5 h-5" />
            </div>
          )}
          
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocusedField(name)}
            onBlur={() => setFocusedField('')}
            maxLength={maxLength}
            autoComplete={autoComplete}
            className={`
              w-full px-4 ${Icon ? 'pl-12' : ''} py-4 pt-6 pb-2 
              bg-transparent text-white text-base font-medium
              focus:outline-none peer transition-all
              ${uppercase ? 'uppercase' : ''}
            `}
            placeholder=" "
          />
          
          <label className={`
            absolute left-4 ${Icon ? 'left-12' : ''} 
            transition-all duration-300 pointer-events-none
            ${isFocused || hasValue 
              ? 'top-2 text-xs text-purple-400 opacity-75' 
              : 'top-4 text-sm text-gray-400'
            }
          `}>
            {label}
          </label>

          {/* Animated underline effect */}
          <div className={`
            absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500
            transition-all duration-300 rounded-b-2xl
            ${isFocused ? 'w-full' : 'w-0'}
          `}></div>
        </div>
        
        {helper && (
          <p className="text-xs text-gray-500 mt-1 ml-4">{helper}</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-md w-full">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${
                    index <= currentStep
                      ? `bg-gradient-to-r ${step.color} shadow-lg shadow-purple-500/25`
                      : 'bg-gray-700'
                  }`}
                >
                  {completedSteps.has(index) ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <step.icon className="w-5 h-5 text-white" />
                  )}
                  {index === currentStep && (
                    <div className="absolute inset-0 rounded-full bg-white opacity-25 animate-ping"></div>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-20 h-0.5 transition-all duration-500 ${
                      index < currentStep ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-white mb-1">{steps[currentStep].title}</h2>
            <p className="text-gray-400 text-sm">Step {currentStep + 1} of {steps.length}</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 shadow-2xl">
          <div className="mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 blur-xl opacity-50 animate-pulse"></div>
                <Sparkles className="w-10 h-10 text-purple-400 relative z-10" />
                <Zap className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 z-10 animate-bounce" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white text-center mb-2">
              {currentStep === 0 && "Let's get to know you"}
              {currentStep === 1 && "Quick document check"}
              {currentStep === 2 && "Almost there!"}
            </h3>
            <p className="text-gray-400 text-center text-sm">
              {currentStep === 0 && "Basic details for your investment journey"}
              {currentStep === 1 && "Secure and encrypted upload"}
              {currentStep === 2 && "One selfie to complete verification"}
            </p>
          </div>

          <div className="space-y-5">
            {/* Step 1: Identity */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="relative group">
                  <div className={`
                    relative bg-gray-900/60 rounded-2xl border-2 transition-all duration-300 h-16
                    ${focusedField === 'fullName'
                      ? 'border-purple-500 shadow-lg shadow-purple-500/20 transform scale-[1.02]' 
                      : formData.fullName
                        ? 'border-gray-600 hover:border-gray-500' 
                        : 'border-gray-700 hover:border-gray-600'
                    }
                  `}>
                    <div className="relative h-full px-4">
                      <label className={`
                        absolute transition-all duration-300 pointer-events-none left-0
                        ${focusedField === 'fullName' || formData.fullName
                          ? 'top-1 text-xs text-purple-400 opacity-75' 
                          : 'top-1/2 -translate-y-1/2 text-base text-gray-400'
                        }
                      `}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('fullName')}
                        onBlur={() => setFocusedField('')}
                        className={`w-full h-full bg-transparent text-white font-semibold focus:outline-none placeholder-transparent transition-all duration-300 ${
                          focusedField === 'fullName' || formData.fullName 
                            ? 'text-lg pt-5' 
                            : 'text-base'
                        }`}
                        placeholder=""
                        autoComplete="off"
                      />
                    </div>
                    <div className={`
                      absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500
                      transition-all duration-300 rounded-b-2xl
                      ${focusedField === 'fullName' ? 'w-full' : 'w-0'}
                    `}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-4">As per your PAN card</p>
                </div>
                
                <div className="relative group">
                  <div className={`
                    relative bg-gray-900/60 rounded-2xl border-2 transition-all duration-300 h-16
                    ${focusedField === 'email'
                      ? 'border-purple-500 shadow-lg shadow-purple-500/20 transform scale-[1.02]' 
                      : formData.email
                        ? 'border-gray-600 hover:border-gray-500' 
                        : 'border-gray-700 hover:border-gray-600'
                    }
                  `}>
                    <div className="relative h-full px-4">
                      <label className={`
                        absolute transition-all duration-300 pointer-events-none left-0
                        ${focusedField === 'email' || formData.email
                          ? 'top-1 text-xs text-purple-400 opacity-75' 
                          : 'top-1/2 -translate-y-1/2 text-base text-gray-400'
                        }
                      `}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField('')}
                        className={`w-full h-full bg-transparent text-white font-semibold focus:outline-none placeholder-transparent transition-all duration-300 ${
                          focusedField === 'email' || formData.email 
                            ? 'text-lg pt-5' 
                            : 'text-base'
                        }`}
                        placeholder=""
                        autoComplete="off"
                      />
                    </div>
                    <div className={`
                      absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500
                      transition-all duration-300 rounded-b-2xl
                      ${focusedField === 'email' ? 'w-full' : 'w-0'}
                    `}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-4">We'll send investment updates here</p>
                </div>
                
                <div className="relative group">
                  <div className={`
                    relative bg-gray-900/60 rounded-2xl border-2 transition-all duration-300 h-16
                    ${focusedField === 'mobile'
                      ? 'border-purple-500 shadow-lg shadow-purple-500/20 transform scale-[1.02]' 
                      : formData.mobile
                        ? 'border-gray-600 hover:border-gray-500' 
                        : 'border-gray-700 hover:border-gray-600'
                    }
                  `}>
                    <div className="relative h-full px-4">
                      <label className={`
                        absolute transition-all duration-300 pointer-events-none left-0
                        ${focusedField === 'mobile' || formData.mobile
                          ? 'top-1 text-xs text-purple-400 opacity-75' 
                          : 'top-1/2 -translate-y-1/2 text-base text-gray-400'
                        }
                      `}>
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('mobile')}
                        onBlur={() => setFocusedField('')}
                        className={`w-full h-full bg-transparent text-white font-semibold focus:outline-none placeholder-transparent transition-all duration-300 ${
                          focusedField === 'mobile' || formData.mobile 
                            ? 'text-lg pt-5' 
                            : 'text-base'
                        }`}
                        placeholder=""
                        autoComplete="off"
                      />
                    </div>
                    <div className={`
                      absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500
                      transition-all duration-300 rounded-b-2xl
                      ${focusedField === 'mobile' ? 'w-full' : 'w-0'}
                    `}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-4">For OTP verification</p>
                </div>
                
                <div className="relative group">
                  <div className={`
                    relative bg-gray-900/60 rounded-2xl border-2 transition-all duration-300 h-16
                    ${focusedField === 'dob'
                      ? 'border-purple-500 shadow-lg shadow-purple-500/20 transform scale-[1.02]' 
                      : formData.dob
                        ? 'border-gray-600 hover:border-gray-500' 
                        : 'border-gray-700 hover:border-gray-600'
                    }
                  `}>
                    <div className="relative h-full px-4">
                      <label className="absolute top-1 left-0 text-xs text-purple-400 opacity-75 pointer-events-none">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('dob')}
                        onBlur={() => setFocusedField('')}
                        className="w-full h-full bg-transparent text-white font-semibold focus:outline-none text-lg pt-5"
                        placeholder="DD-MM-YYYY"
                      />
                    </div>
                    <div className={`
                      absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500
                      transition-all duration-300 rounded-b-2xl
                      ${focusedField === 'dob' ? 'w-full' : 'w-0'}
                    `}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-4">You must be 18+ to invest</p>
                </div>
              </div>
            )}

            {/* Step 2: Documents */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="relative group">
                  <div className={`
                    relative bg-gray-900/60 rounded-2xl border-2 transition-all duration-300 h-16
                    ${focusedField === 'pan'
                      ? 'border-purple-500 shadow-lg shadow-purple-500/20 transform scale-[1.02]' 
                      : formData.pan
                        ? 'border-gray-600 hover:border-gray-500' 
                        : 'border-gray-700 hover:border-gray-600'
                    }
                  `}>
                    <div className="relative h-full px-4">
                      <label className={`
                        absolute transition-all duration-300 pointer-events-none left-0
                        ${focusedField === 'pan' || formData.pan
                          ? 'top-1 text-xs text-purple-400 opacity-75' 
                          : 'top-1/2 -translate-y-1/2 text-base text-gray-400'
                        }
                      `}>
                        PAN Number
                      </label>
                      <input
                        type="text"
                        name="pan"
                        value={formData.pan}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('pan')}
                        onBlur={() => setFocusedField('')}
                        maxLength={10}
                        className={`w-full h-full bg-transparent text-white font-semibold focus:outline-none uppercase placeholder-transparent transition-all duration-300 ${
                          focusedField === 'pan' || formData.pan 
                            ? 'text-lg pt-5' 
                            : 'text-base'
                        }`}
                        placeholder=""
                        autoComplete="off"
                      />
                    </div>
                    <div className={`
                      absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500
                      transition-all duration-300 rounded-b-2xl
                      ${focusedField === 'pan' ? 'w-full' : 'w-0'}
                    `}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-4">10-character PAN (e.g., ABCDE1234F)</p>
                </div>
                
                <div className="relative group">
                  <div className={`
                    relative bg-gray-900/60 rounded-2xl border-2 transition-all duration-300 h-16
                    ${focusedField === 'aadhaar'
                      ? 'border-purple-500 shadow-lg shadow-purple-500/20 transform scale-[1.02]' 
                      : formData.aadhaar
                        ? 'border-gray-600 hover:border-gray-500' 
                        : 'border-gray-700 hover:border-gray-600'
                    }
                  `}>
                    <div className="relative h-full px-4">
                      <label className={`
                        absolute transition-all duration-300 pointer-events-none left-0
                        ${focusedField === 'aadhaar' || formData.aadhaar
                          ? 'top-1 text-xs text-purple-400 opacity-75' 
                          : 'top-1/2 -translate-y-1/2 text-base text-gray-400'
                        }
                      `}>
                        Aadhaar Last 4 Digits
                      </label>
                      <input
                        type="text"
                        name="aadhaar"
                        value={formData.aadhaar}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('aadhaar')}
                        onBlur={() => setFocusedField('')}
                        maxLength={4}
                        className={`w-full h-full bg-transparent text-white font-semibold focus:outline-none placeholder-transparent transition-all duration-300 ${
                          focusedField === 'aadhaar' || formData.aadhaar 
                            ? 'text-lg pt-5' 
                            : 'text-base'
                        }`}
                        placeholder=""
                        autoComplete="off"
                      />
                    </div>
                    <div className={`
                      absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500
                      transition-all duration-300 rounded-b-2xl
                      ${focusedField === 'aadhaar' ? 'w-full' : 'w-0'}
                    `}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-4">For identity verification only</p>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-gray-400 mb-3 font-medium">Upload Documents</p>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="relative group cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'panImage')}
                      />
                      <div className={`
                        relative overflow-hidden rounded-2xl border-2 transition-all duration-300
                        ${formData.panImage 
                          ? 'border-green-500 bg-gradient-to-br from-green-500/20 to-emerald-500/10' 
                          : 'border-gray-700 hover:border-purple-500 bg-gray-900/60 hover:bg-gray-900/80'
                        }
                      `}>
                        <div className="p-6 text-center">
                          {formData.panImage ? (
                            <>
                              <div className="relative inline-block">
                                <Check className="w-10 h-10 mx-auto mb-2 text-green-400" />
                                <div className="absolute inset-0 bg-green-400 blur-xl opacity-30 animate-pulse"></div>
                              </div>
                              <p className="text-sm font-semibold text-green-400">PAN Uploaded</p>
                            </>
                          ) : (
                            <>
                              <FileText className="w-10 h-10 mx-auto mb-2 text-gray-500 group-hover:text-purple-400 transition-colors" />
                              <p className="text-xs text-gray-400 font-medium group-hover:text-gray-300">Upload PAN</p>
                            </>
                          )}
                        </div>
                        {!formData.panImage && (
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 transition-all duration-300"></div>
                        )}
                      </div>
                    </label>

                    <label className="relative group cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'aadhaarImage')}
                      />
                      <div className={`
                        relative overflow-hidden rounded-2xl border-2 transition-all duration-300
                        ${formData.aadhaarImage 
                          ? 'border-green-500 bg-gradient-to-br from-green-500/20 to-emerald-500/10' 
                          : 'border-gray-700 hover:border-purple-500 bg-gray-900/60 hover:bg-gray-900/80'
                        }
                      `}>
                        <div className="p-6 text-center">
                          {formData.aadhaarImage ? (
                            <>
                              <div className="relative inline-block">
                                <Check className="w-10 h-10 mx-auto mb-2 text-green-400" />
                                <div className="absolute inset-0 bg-green-400 blur-xl opacity-30 animate-pulse"></div>
                              </div>
                              <p className="text-sm font-semibold text-green-400">Aadhaar Done</p>
                            </>
                          ) : (
                            <>
                              <Fingerprint className="w-10 h-10 mx-auto mb-2 text-gray-500 group-hover:text-purple-400 transition-colors" />
                              <p className="text-xs text-gray-400 font-medium group-hover:text-gray-300">Upload Aadhaar</p>
                            </>
                          )}
                        </div>
                        {!formData.aadhaarImage && (
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 transition-all duration-300"></div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Verify */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <label className="relative group cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    capture="user"
                    onChange={(e) => handleFileUpload(e, 'selfie')}
                  />
                  <div className={`
                    relative overflow-hidden rounded-3xl border-2 transition-all duration-300
                    ${formData.selfie 
                      ? 'border-green-500 bg-gradient-to-br from-green-500/20 to-emerald-500/10' 
                      : 'border-gray-700 hover:border-purple-500 bg-gradient-to-br from-gray-900/60 to-gray-800/60 hover:from-purple-900/20 hover:to-blue-900/20'
                    }
                  `}>
                    <div className="p-16 text-center">
                      {formData.selfie ? (
                        <>
                          <div className="relative inline-block">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center mx-auto mb-4">
                              <Check className="w-12 h-12 text-white" />
                            </div>
                            <div className="absolute inset-0 bg-green-400 blur-2xl opacity-30 animate-pulse"></div>
                          </div>
                          <p className="text-xl font-bold text-white mb-1">Perfect Shot!</p>
                          <p className="text-gray-400 text-sm">Selfie verified successfully</p>
                        </>
                      ) : (
                        <>
                          <div className="relative inline-block mb-4">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center mx-auto group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all">
                              <Camera className="w-12 h-12 text-gray-400 group-hover:text-purple-400 transition-colors" />
                            </div>
                            <div className="absolute inset-0 rounded-full bg-purple-500 opacity-20 animate-ping"></div>
                          </div>
                          <p className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">Take a Selfie</p>
                          <p className="text-gray-500 text-sm group-hover:text-gray-400">Click to open camera</p>
                          <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-600">
                            <span>📸 Good lighting</span>
                            <span>😊 Clear face</span>
                            <span>🚫 No glasses</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </label>

                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-4 border border-purple-500/20 backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-white">Bank-grade Security</p>
                      <p className="text-xs text-gray-400">256-bit encryption protects your data</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={handleNext}
            disabled={!isStepValid() || isLoading}
            className={`
              relative w-full mt-8 px-6 py-4 rounded-2xl font-semibold text-white 
              transition-all duration-300 flex items-center justify-center space-x-2 overflow-hidden
              ${isStepValid() && !isLoading
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-xl hover:shadow-purple-500/30 transform hover:-translate-y-1 hover:scale-[1.02]'
                : 'bg-gray-800 cursor-not-allowed opacity-50'
              }
            `}
          >
            {/* Animated background shimmer effect */}
            {isStepValid() && !isLoading && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] animate-shimmer"></div>
            )}
            
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span className="relative z-10">{currentStep === steps.length - 1 ? 'Complete KYC' : 'Continue'}</span>
                <ArrowRight className="w-5 h-5 relative z-10" />
              </>
            )}
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-6 flex justify-center space-x-6">
          <div className="flex items-center space-x-2 text-gray-500 text-xs group hover:text-gray-400 transition-colors cursor-pointer">
            <Shield className="w-4 h-4" />
            <span>Bank-grade security</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 text-xs group hover:text-gray-400 transition-colors cursor-pointer">
            <Zap className="w-4 h-4" />
            <span>2-min process</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes shimmer {
          to {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        @keyframes delay-500 {
          animation-delay: 0.5s;
        }

        @keyframes delay-1000 {
          animation-delay: 1s;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default KYCPage;