'use client';

import React from 'react';
import PayTMStyleNavigation from './PayTMStyleNavigation';

const SIPBreweryDashboard = () => {
  const handleSignOut = () => {
    console.log('User signed out');
    // Add your sign out logic here
  };

  const handleSignIn = () => {
    console.log('User signing in');
    // Add your sign in logic here
  };

  const handleSignUp = () => {
    console.log('User signing up');
    // Add your sign up logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Unified Navigation Component */}
      <PayTMStyleNavigation 
        isAuthenticated={true}
        onSignOut={handleSignOut}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />
      
      {/* Content area with top padding for fixed nav */}
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">SIP Brewery Dashboard</h1>
            <p className="text-gray-300">Welcome to your investment dashboard!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIPBreweryDashboard;
