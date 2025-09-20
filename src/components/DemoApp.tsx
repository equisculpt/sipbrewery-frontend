'use client';

import React, { useState } from 'react';
import DemoLoginPage from './DemoLoginPage';
import DemoDashboard from './DemoDashboardClean';

const DemoApp: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'individual' | 'institutional'>('individual');

  const handleLogin = (selectedUserType: 'individual' | 'institutional') => {
    setUserType(selectedUserType);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('individual');
  };

  if (isLoggedIn) {
    return <DemoDashboard userType={userType} onLogout={handleLogout} />;
  }

  return <DemoLoginPage onLogin={handleLogin} />;
};

export default DemoApp;
