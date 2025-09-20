'use client';

import React, { useState, useEffect } from 'react';

// Simple Backend Integration Demo
const SimpleBackendDemo: React.FC = () => {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [marketData, setMarketData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Check backend connectivity
  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/health`);
      if (response.ok) {
        setBackendStatus('online');
      } else {
        setBackendStatus('offline');
      }
    } catch (error) {
      setBackendStatus('offline');
    }
  };

  const fetchMarketData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/asi/analyze`);
      if (response.ok) {
        const data = await response.json();
        setMarketData(data);
      }
    } catch (error) {
      console.error('Failed to fetch market data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Backend Status Card */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Backend Connection Status</h3>
          <div className="flex items-center space-x-2">
            <div 
              className={`w-3 h-3 rounded-full ${
                backendStatus === 'online' ? 'bg-green-500' : 
                backendStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
              }`}
            />
            <span className={`text-sm font-medium ${
              backendStatus === 'online' ? 'text-green-400' : 
              backendStatus === 'offline' ? 'text-red-400' : 'text-yellow-400'
            }`}>
              {backendStatus === 'online' ? 'Connected' : 
               backendStatus === 'offline' ? 'Disconnected' : 'Checking...'}
            </span>
          </div>
        </div>
        
        <div className="text-gray-300 text-sm">
          <p>Backend URL: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}</p>
          <p>Status: {backendStatus === 'online' ? '✅ Backend is running and accessible' : 
                     backendStatus === 'offline' ? '❌ Backend is not accessible' : '🔄 Checking connection...'}</p>
        </div>
        
        <button
          onClick={checkBackendStatus}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
        >
          Refresh Status
        </button>
      </div>

      {/* Market Data Demo */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Live Market Data Test</h3>
          <button
            onClick={fetchMarketData}
            disabled={loading || backendStatus !== 'online'}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg text-sm transition-colors"
          >
            {loading ? 'Loading...' : 'Fetch Market Data'}
          </button>
        </div>
        
        {marketData ? (
          <div className="bg-gray-900/50 rounded-lg p-4">
            <h4 className="text-green-400 font-medium mb-2">✅ Market Data Retrieved Successfully</h4>
            <pre className="text-gray-300 text-xs overflow-x-auto">
              {JSON.stringify(marketData, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="text-gray-400 text-sm">
            <p>Click "Fetch Market Data" to test the backend API connection.</p>
            <p className="mt-2">This will call: <code className="bg-gray-700 px-2 py-1 rounded">/api/market/indices</code></p>
          </div>
        )}
      </div>

      {/* Integration Status */}
      <div className="mt-6 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl p-6 border border-green-500/20">
        <h3 className="text-xl font-semibold text-white mb-3">🚀 Integration Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="text-green-400 font-medium mb-2">✅ Completed</h4>
            <ul className="text-gray-300 space-y-1">
              <li>• Frontend-Backend API connection</li>
              <li>• Environment configuration</li>
              <li>• TypeScript interfaces</li>
              <li>• Error handling</li>
              <li>• Health check endpoint</li>
            </ul>
          </div>
          <div>
            <h4 className="text-blue-400 font-medium mb-2">🔄 Ready for Enhancement</h4>
            <ul className="text-gray-300 space-y-1">
              <li>• ASI fund analysis integration</li>
              <li>• Real-time WebSocket connection</li>
              <li>• Portfolio optimization</li>
              <li>• Market insights dashboard</li>
              <li>• Authentication flow</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleBackendDemo;
