'use client';

import React, { useState } from 'react';
import DemoLoginPage from '@/components/DemoLoginPage';
import TrillionFundDashboard from '@/components/TrillionFundDashboard';

const TrillionFundDemoPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'individual' | 'institutional'>('institutional');

  const handleLogin = (type: 'individual' | 'institutional') => {
    setUserType(type);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              💰 $1 Trillion Fund ASI Demo
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Experience sovereign wealth fund level capabilities
            </p>
            <div className="flex justify-center space-x-4 mb-8">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Matching Capabilities Of:</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>🇳🇴 Norway Government Pension Fund ($1.4T)</li>
                  <li>🇸🇦 Saudi Public Investment Fund ($700B)</li>
                  <li>🇨🇳 China Investment Corporation ($1.2T)</li>
                  <li>🇸🇬 Singapore GIC ($690B)</li>
                  <li>🇦🇪 Abu Dhabi Investment Authority ($650B)</li>
                </ul>
              </div>
            </div>
          </div>
          
          <DemoLoginPage onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return <TrillionFundDashboard onLogout={handleLogout} />;
};

export default TrillionFundDemoPage;
