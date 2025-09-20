'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, Shield, CreditCard, Settings, Bell, FileText, Camera, Edit3, Check, 
  Upload, Download, Eye, EyeOff, Lock, Phone, Mail, MapPin, Calendar, 
  Building, Briefcase, TrendingUp, AlertCircle, CheckCircle, Clock, 
  Star, ArrowLeft, Plus, Trash2
} from 'lucide-react';
import PayTMStyleNavigation from '@/components/PayTMStyleNavigation';

const ProfilePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'personal' | 'kyc' | 'banking' | 'risk-profile' | 'notifications' | 'security' | 'documents'>('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userProfile, setUserProfile] = useState({
    firstName: 'Milin',
    lastName: 'Raijada',
    email: 'milin.raijada@gmail.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1990-05-15',
    address: '123 Tech Park, Bangalore',
    occupation: 'Software Engineer',
    company: 'Tech Corp'
  });

  const [originalProfile, setOriginalProfile] = useState({
    email: 'milin.raijada@gmail.com',
    phone: '+91 98765 43210',
    address: '123 Tech Park, Bangalore'
  });

  const [kycInvalidated, setKycInvalidated] = useState(false);

  const [kycStatus, setKycStatus] = useState({
    panCard: { status: 'verified', uploadDate: '2024-01-15' },
    aadharCard: { status: 'verified', uploadDate: '2024-01-15' },
    bankStatement: { status: 'pending', uploadDate: '2024-08-20' },
    addressProof: { status: 'verified', uploadDate: '2024-01-15' },
    incomeProof: { status: 'rejected', uploadDate: '2024-08-15', reason: 'Document unclear' }
  });

  const [bankAccounts] = useState([
    { id: 1, bankName: 'HDFC Bank', accountNumber: '****1234', ifsc: 'HDFC0001234', status: 'verified', isPrimary: true },
    { id: 2, bankName: 'ICICI Bank', accountNumber: '****5678', ifsc: 'ICIC0005678', status: 'pending', isPrimary: false }
  ]);

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: true,
    pushNotifications: true,
    marketUpdates: true,
    portfolioAlerts: true,
    transactionAlerts: true
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [riskProfile, setRiskProfile] = useState({
    investmentExperience: '',
    riskTolerance: '',
    investmentHorizon: '',
    financialGoals: '',
    monthlyIncome: '',
    monthlyExpenses: '',
    emergencyFund: '',
    currentInvestments: '',
    marketVolatilityReaction: '',
    lossComfortLevel: '',
    riskScore: 0,
    riskCategory: 'Conservative'
  });

  const tabs = [
    { key: 'personal', label: 'Personal Info', icon: User },
    { key: 'kyc', label: 'KYC & Documents', icon: Shield },
    { key: 'banking', label: 'Bank Accounts', icon: CreditCard },
    { key: 'risk-profile', label: 'Risk Profile', icon: TrendingUp },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'security', label: 'Security', icon: Lock },
    { key: 'documents', label: 'Tax Documents', icon: FileText }
  ];

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCriticalFieldChange = (field: string, value: string) => {
    setUserProfile({...userProfile, [field]: value});
    
    // Check if critical KYC fields have changed
    if ((field === 'phone' && value !== originalProfile.phone) ||
        (field === 'email' && value !== originalProfile.email) ||
        (field === 'address' && value !== originalProfile.address)) {
      setKycInvalidated(true);
      // In real app, this would trigger backend API call to invalidate KYC
      console.log('KYC invalidated due to change in:', field);
    }
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    
    if (kycInvalidated) {
      // Show KYC re-verification modal/alert
      alert('Important: Your KYC verification has been reset due to changes in critical information. Please re-upload your documents for verification.');
      
      // Reset KYC status for affected documents
      setKycStatus(prev => ({
        ...prev,
        panCard: { ...prev.panCard, status: 'pending' },
        aadharCard: { ...prev.aadharCard, status: 'pending' },
        addressProof: { ...prev.addressProof, status: 'pending' }
      }));
      
      // Update original profile to new values
      setOriginalProfile({
        email: userProfile.email,
        phone: userProfile.phone,
        address: userProfile.address
      });
      
      setKycInvalidated(false);
    }
    
    // API call to save profile
    console.log('Profile saved:', userProfile);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'rejected': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return CheckCircle;
      case 'pending': return Clock;
      case 'rejected': return AlertCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-900">
      <PayTMStyleNavigation />
      
      <div className="pt-48 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-white font-semibold">KYC Status</div>
                <div className="text-green-400 text-sm">✓ Verified</div>
              </div>
            </div>
          </div>

          {/* Profile Header */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-400 mx-auto">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">
                      {getInitials(userProfile.firstName, userProfile.lastName)}
                    </span>
                  </div>
                )}
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-300"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {userProfile.firstName} {userProfile.lastName}
            </h1>
            <p className="text-xl text-gray-300 mb-2">{userProfile.email}</p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
              <span>{userProfile.occupation}</span>
              <span>•</span>
              <span>Bangalore</span>
              <span>•</span>
              <span>Member since Jan 2024</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as 'personal' | 'kyc' | 'banking' | 'risk-profile' | 'notifications' | 'security' | 'documents')}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.key
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Personal Information</h3>
                  <button
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                      kycInvalidated 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {isEditing ? <Check className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    <span>{isEditing ? (kycInvalidated ? 'Save & Reset KYC' : 'Save Changes') : 'Edit Profile'}</span>
                  </button>
                </div>
                
                {kycInvalidated && (
                  <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2 text-red-400">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-semibold">KYC Re-verification Required</span>
                    </div>
                    <p className="text-red-300 text-sm mt-2">
                      You've changed critical information (phone/email/address). Your KYC status will be reset and you'll need to re-upload documents for verification.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">First Name</label>
                  <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg focus-within:border-blue-400 transition-colors duration-300">
                    <div className="flex items-center justify-center w-12 h-12 text-gray-400">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={userProfile.firstName}
                      onChange={(e) => setUserProfile({...userProfile, firstName: e.target.value})}
                      disabled={!isEditing}
                      className="flex-1 px-3 py-3 bg-transparent text-white focus:outline-none disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Last Name</label>
                  <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg focus-within:border-blue-400 transition-colors duration-300">
                    <div className="flex items-center justify-center w-12 h-12 text-gray-400">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={userProfile.lastName}
                      onChange={(e) => setUserProfile({...userProfile, lastName: e.target.value})}
                      disabled={!isEditing}
                      className="flex-1 px-3 py-3 bg-transparent text-white focus:outline-none disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email Address
                    {userProfile.email !== originalProfile.email && (
                      <span className="text-yellow-400 text-xs ml-2">⚠️ Will reset KYC</span>
                    )}
                  </label>
                  <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg focus-within:border-blue-400 transition-colors duration-300">
                    <div className="flex items-center justify-center w-12 h-12 text-gray-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => handleCriticalFieldChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="flex-1 px-3 py-3 bg-transparent text-white focus:outline-none disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Phone Number
                    {userProfile.phone !== originalProfile.phone && (
                      <span className="text-red-400 text-xs ml-2">🚨 Will reset KYC</span>
                    )}
                  </label>
                  <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg focus-within:border-blue-400 transition-colors duration-300">
                    <div className="flex items-center justify-center w-12 h-12 text-gray-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <input
                      type="tel"
                      value={userProfile.phone}
                      onChange={(e) => handleCriticalFieldChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="flex-1 px-3 py-3 bg-transparent text-white focus:outline-none disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Date of Birth</label>
                  <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg focus-within:border-blue-400 transition-colors duration-300">
                    <div className="flex items-center justify-center w-12 h-12 text-gray-400">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <input
                      type="date"
                      value={userProfile.dateOfBirth}
                      onChange={(e) => setUserProfile({...userProfile, dateOfBirth: e.target.value})}
                      disabled={!isEditing}
                      className="flex-1 px-3 py-3 bg-transparent text-white focus:outline-none disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Occupation</label>
                  <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg focus-within:border-blue-400 transition-colors duration-300">
                    <div className="flex items-center justify-center w-12 h-12 text-gray-400">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={userProfile.occupation}
                      onChange={(e) => setUserProfile({...userProfile, occupation: e.target.value})}
                      disabled={!isEditing}
                      className="flex-1 px-3 py-3 bg-transparent text-white focus:outline-none disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Address
                    {userProfile.address !== originalProfile.address && (
                      <span className="text-yellow-400 text-xs ml-2">⚠️ Will reset KYC</span>
                    )}
                  </label>
                  <div className="flex bg-gray-800 border border-gray-600 rounded-lg focus-within:border-blue-400 transition-colors duration-300">
                    <div className="flex items-start justify-center w-12 pt-4 text-gray-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <textarea
                      value={userProfile.address}
                      onChange={(e) => handleCriticalFieldChange('address', e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      className="flex-1 px-3 py-3 bg-transparent text-white focus:outline-none disabled:opacity-50 resize-none"
                    />
                  </div>
                </div>
                </div>
              </div>
            )}

            {/* KYC & Documents Tab */}
            {activeTab === 'kyc' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white">KYC & Document Verification</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(kycStatus).map(([docType, doc]) => {
                    const StatusIcon = getStatusIcon(doc.status);
                    return (
                      <div key={docType} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-white capitalize">
                            {docType.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <div className={`flex items-center space-x-2 ${getStatusColor(doc.status)}`}>
                            <StatusIcon className="w-5 h-5" />
                            <span className="capitalize font-medium">{doc.status}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-400">
                          <div>Uploaded: {doc.uploadDate}</div>
                          {'reason' in doc && doc.reason && (
                            <div className="text-red-400 mt-2">
                              <AlertCircle className="w-4 h-4 inline mr-1" />
                              {doc.reason}
                            </div>
                          )}
                        </div>

                        <div className="flex space-x-2 mt-4">
                          <button className="flex items-center space-x-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors duration-300">
                            <Upload className="w-4 h-4" />
                            <span>Re-upload</span>
                          </button>
                          <button className="flex items-center space-x-2 px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded text-sm transition-colors duration-300">
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bank Accounts Tab */}
            {activeTab === 'banking' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Bank Accounts</h3>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300">
                    <Plus className="w-4 h-4" />
                    <span>Add Account</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {bankAccounts.map((account) => (
                    <div key={account.id} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                            <Building className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white">{account.bankName}</h4>
                            <div className="text-gray-400 text-sm">
                              Account: {account.accountNumber} • IFSC: {account.ifsc}
                            </div>
                            {account.isPrimary && (
                              <div className="flex items-center space-x-1 mt-1">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span className="text-yellow-400 text-sm">Primary Account</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className={`flex items-center space-x-2 ${getStatusColor(account.status)}`}>
                            {React.createElement(getStatusIcon(account.status), { className: "w-5 h-5" })}
                            <span className="capitalize font-medium">{account.status}</span>
                          </div>
                          <button className="text-gray-400 hover:text-red-400 transition-colors duration-300">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Risk Profile Tab */}
            {activeTab === 'risk-profile' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white">Risk Profile Assessment</h3>
                
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {riskProfile.riskScore || 0}
                    </div>
                    <div>
                      <h4 className="text-white text-lg font-semibold">Current Risk Score: {riskProfile.riskScore}/100</h4>
                      <p className="text-gray-300 text-sm">Risk Category: <span className="text-blue-400 font-medium">{riskProfile.riskCategory}</span></p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Investment Experience */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h4 className="text-white text-lg font-semibold mb-4">1. Investment Experience</h4>
                    <p className="text-gray-300 text-sm mb-4">How long have you been investing in financial markets?</p>
                    <div className="space-y-3">
                      {[
                        { value: 'beginner', label: 'New to investing (0-1 years)', score: 10 },
                        { value: 'intermediate', label: 'Some experience (1-5 years)', score: 20 },
                        { value: 'experienced', label: 'Experienced (5-10 years)', score: 30 },
                        { value: 'expert', label: 'Very experienced (10+ years)', score: 40 }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                          <input 
                            type="radio" 
                            name="investmentExperience" 
                            value={option.value}
                            checked={riskProfile.investmentExperience === option.value}
                            onChange={(e) => setRiskProfile({...riskProfile, investmentExperience: e.target.value})}
                            className="w-4 h-4 text-blue-500" 
                          />
                          <span className="text-white">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Risk Tolerance */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h4 className="text-white text-lg font-semibold mb-4">2. Risk Tolerance</h4>
                    <p className="text-gray-300 text-sm mb-4">How comfortable are you with investment volatility?</p>
                    <div className="space-y-3">
                      {[
                        { value: 'low', label: 'I prefer stable returns even if they are lower', score: 10 },
                        { value: 'moderate', label: 'I can accept some volatility for better returns', score: 20 },
                        { value: 'high', label: 'I am comfortable with high volatility for potentially high returns', score: 30 }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                          <input 
                            type="radio" 
                            name="riskTolerance" 
                            value={option.value}
                            checked={riskProfile.riskTolerance === option.value}
                            onChange={(e) => setRiskProfile({...riskProfile, riskTolerance: e.target.value})}
                            className="w-4 h-4 text-blue-500" 
                          />
                          <span className="text-white">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Investment Horizon */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h4 className="text-white text-lg font-semibold mb-4">3. Investment Time Horizon</h4>
                    <p className="text-gray-300 text-sm mb-4">When do you plan to withdraw your investments?</p>
                    <div className="space-y-3">
                      {[
                        { value: 'short', label: 'Within 1-3 years', score: 5 },
                        { value: 'medium', label: '3-7 years', score: 15 },
                        { value: 'long', label: '7-15 years', score: 25 },
                        { value: 'very-long', label: 'More than 15 years', score: 35 }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                          <input 
                            type="radio" 
                            name="investmentHorizon" 
                            value={option.value}
                            checked={riskProfile.investmentHorizon === option.value}
                            onChange={(e) => setRiskProfile({...riskProfile, investmentHorizon: e.target.value})}
                            className="w-4 h-4 text-blue-500" 
                          />
                          <span className="text-white">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Financial Goals */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h4 className="text-white text-lg font-semibold mb-4">4. Primary Financial Goal</h4>
                    <p className="text-gray-300 text-sm mb-4">What is your main investment objective?</p>
                    <div className="space-y-3">
                      {[
                        { value: 'wealth-creation', label: 'Long-term wealth creation', score: 25 },
                        { value: 'retirement', label: 'Retirement planning', score: 20 },
                        { value: 'education', label: 'Child education', score: 15 },
                        { value: 'house', label: 'Buying a house', score: 10 },
                        { value: 'emergency', label: 'Emergency fund', score: 5 }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                          <input 
                            type="radio" 
                            name="financialGoals" 
                            value={option.value}
                            checked={riskProfile.financialGoals === option.value}
                            onChange={(e) => setRiskProfile({...riskProfile, financialGoals: e.target.value})}
                            className="w-4 h-4 text-blue-500" 
                          />
                          <span className="text-white">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Market Volatility Reaction */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h4 className="text-white text-lg font-semibold mb-4">5. Market Volatility Reaction</h4>
                    <p className="text-gray-300 text-sm mb-4">If your investment portfolio drops 20% in a month, what would you do?</p>
                    <div className="space-y-3">
                      {[
                        { value: 'sell-all', label: 'Sell all investments immediately', score: 0 },
                        { value: 'sell-some', label: 'Sell some investments to reduce risk', score: 5 },
                        { value: 'hold', label: 'Hold and wait for recovery', score: 15 },
                        { value: 'buy-more', label: 'Buy more at lower prices', score: 25 }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                          <input 
                            type="radio" 
                            name="marketVolatilityReaction" 
                            value={option.value}
                            checked={riskProfile.marketVolatilityReaction === option.value}
                            onChange={(e) => setRiskProfile({...riskProfile, marketVolatilityReaction: e.target.value})}
                            className="w-4 h-4 text-blue-500" 
                          />
                          <span className="text-white">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button 
                      onClick={() => {
                        // Calculate risk score based on selections
                        const calculateRiskScore = () => {
                          const scores: Record<string, number> = {
                            'beginner': 5, 'intermediate': 15, 'experienced': 25, 'expert': 35,
                            'low': 5, 'moderate': 15, 'high': 25,
                            'short': 5, 'medium': 15, 'long': 25, 'very-long': 35,
                            'emergency': 5, 'house': 10, 'education': 15, 'retirement': 20, 'wealth-creation': 25,
                            'sell-all': 0, 'sell-some': 5, 'hold': 15, 'buy-more': 25
                          };
                          
                          const totalScore = (scores[riskProfile.investmentExperience] || 0) +
                                           (scores[riskProfile.riskTolerance] || 0) +
                                           (scores[riskProfile.investmentHorizon] || 0) +
                                           (scores[riskProfile.financialGoals] || 0) +
                                           (scores[riskProfile.marketVolatilityReaction] || 0);
                          
                          let category = 'Conservative';
                          if (totalScore >= 80) category = 'Aggressive';
                          else if (totalScore >= 50) category = 'Moderate';
                          
                          setRiskProfile(prev => ({
                            ...prev,
                            riskScore: totalScore,
                            riskCategory: category
                          }));
                        };
                        
                        calculateRiskScore();
                        alert('Risk profile updated successfully!');
                      }}
                      className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-300"
                    >
                      Calculate Risk Profile
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white">Security Settings</h3>
                
                <div className="space-y-6">
                  <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-4">Change Password</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                            placeholder="Enter current password"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">New Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300">
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-300">Add an extra layer of security to your account</p>
                        <p className="text-gray-400 text-sm">Status: <span className={twoFactorEnabled ? "text-green-400" : "text-red-400"}>{twoFactorEnabled ? "Enabled" : "Disabled"}</span></p>
                      </div>
                      <button 
                        onClick={() => {
                          setTwoFactorEnabled(!twoFactorEnabled);
                          alert(twoFactorEnabled ? '2FA has been disabled' : '2FA has been enabled successfully!');
                        }}
                        className={`px-4 py-2 ${twoFactorEnabled ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg transition-colors duration-300`}
                      >
                        {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white">Notification Preferences</h3>
                
                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-4">Email Notifications</h4>
                    <div className="space-y-4">
                      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex-1">
                            <p className="text-white font-medium">Email Alerts</p>
                            <p className="text-gray-400 text-sm">Receive important account updates via email</p>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end">
                            <span className={`text-sm font-semibold ${
                              notifications.emailAlerts ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {notifications.emailAlerts ? '● ENABLED' : '○ DISABLED'}
                            </span>
                            <button
                              onClick={() => setNotifications({...notifications, emailAlerts: !notifications.emailAlerts})}
                              className={`ml-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                notifications.emailAlerts 
                                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                                  : 'bg-green-500 hover:bg-green-600 text-white'
                              }`}
                            >
                              {notifications.emailAlerts ? 'Disable' : 'Enable'}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex-1">
                            <p className="text-white font-medium">Market Updates</p>
                            <p className="text-gray-400 text-sm">Daily market insights and analysis</p>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end">
                            <span className={`text-sm font-semibold ${
                              notifications.marketUpdates ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {notifications.marketUpdates ? '● ENABLED' : '○ DISABLED'}
                            </span>
                            <button
                              onClick={() => setNotifications({...notifications, marketUpdates: !notifications.marketUpdates})}
                              className={`ml-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                notifications.marketUpdates 
                                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                                  : 'bg-green-500 hover:bg-green-600 text-white'
                              }`}
                            >
                              {notifications.marketUpdates ? 'Disable' : 'Enable'}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex-1">
                            <p className="text-white font-medium">Portfolio Alerts</p>
                            <p className="text-gray-400 text-sm">Updates on your investment portfolio performance</p>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end">
                            <span className={`text-sm font-semibold ${
                              notifications.portfolioAlerts ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {notifications.portfolioAlerts ? '● ENABLED' : '○ DISABLED'}
                            </span>
                            <button
                              onClick={() => setNotifications({...notifications, portfolioAlerts: !notifications.portfolioAlerts})}
                              className={`ml-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                notifications.portfolioAlerts 
                                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                                  : 'bg-green-500 hover:bg-green-600 text-white'
                              }`}
                            >
                              {notifications.portfolioAlerts ? 'Disable' : 'Enable'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SMS Notifications */}
                  <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-4">SMS Notifications</h4>
                    <div className="space-y-4">
                      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex-1">
                            <p className="text-white font-medium">SMS Alerts</p>
                            <p className="text-gray-400 text-sm">Critical account notifications via SMS</p>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end">
                            <span className={`text-sm font-semibold ${
                              notifications.smsAlerts ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {notifications.smsAlerts ? '● ENABLED' : '○ DISABLED'}
                            </span>
                            <button
                              onClick={() => setNotifications({...notifications, smsAlerts: !notifications.smsAlerts})}
                              className={`ml-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                notifications.smsAlerts 
                                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                                  : 'bg-green-500 hover:bg-green-600 text-white'
                              }`}
                            >
                              {notifications.smsAlerts ? 'Disable' : 'Enable'}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex-1">
                            <p className="text-white font-medium">Transaction Alerts</p>
                            <p className="text-gray-400 text-sm">Instant notifications for all transactions</p>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end">
                            <span className={`text-sm font-semibold ${
                              notifications.transactionAlerts ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {notifications.transactionAlerts ? '● ENABLED' : '○ DISABLED'}
                            </span>
                            <button
                              onClick={() => setNotifications({...notifications, transactionAlerts: !notifications.transactionAlerts})}
                              className={`ml-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                notifications.transactionAlerts 
                                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                                  : 'bg-green-500 hover:bg-green-600 text-white'
                              }`}
                            >
                              {notifications.transactionAlerts ? 'Disable' : 'Enable'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-4">Push Notifications</h4>
                    <div className="space-y-4">
                      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex-1">
                            <p className="text-white font-medium">Browser Push Notifications</p>
                            <p className="text-gray-400 text-sm">Real-time notifications in your browser</p>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end">
                            <span className={`text-sm font-semibold ${
                              notifications.pushNotifications ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {notifications.pushNotifications ? '● ENABLED' : '○ DISABLED'}
                            </span>
                            <button
                              onClick={() => setNotifications({...notifications, pushNotifications: !notifications.pushNotifications})}
                              className={`ml-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                notifications.pushNotifications 
                                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                                  : 'bg-green-500 hover:bg-green-600 text-white'
                              }`}
                            >
                              {notifications.pushNotifications ? 'Disable' : 'Enable'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button 
                      onClick={() => {
                        alert('Notification preferences saved successfully!');
                        console.log('Notification settings:', notifications);
                      }}
                      className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-300"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tax Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white">Tax Documents & Certificates</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: 'Form 16', year: '2023-24', status: 'available' },
                    { name: 'Capital Gains Statement', year: '2023-24', status: 'available' },
                    { name: 'Tax Saving Certificate', year: '2023-24', status: 'available' },
                    { name: 'Annual Investment Report', year: '2023-24', status: 'processing' }
                  ].map((doc, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{doc.name}</h4>
                          <p className="text-gray-400 text-sm">Financial Year: {doc.year}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          doc.status === 'available' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {doc.status}
                        </div>
                      </div>
                      
                      {doc.status === 'available' && (
                        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300">
                          <Download className="w-4 h-4" />
                          <span>Download PDF</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
