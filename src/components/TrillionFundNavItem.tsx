'use client';

import React from 'react';
import Link from 'next/link';
import { DollarSign, TrendingUp, Globe, Zap } from 'lucide-react';

const TrillionFundNavItem = () => {
  return (
    <Link 
      href="/trillion-fund-demo"
      className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
    >
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
          <DollarSign className="w-5 h-5" />
        </div>
        <div>
          <div className="font-bold text-sm">$1 Trillion Fund ASI</div>
          <div className="text-xs opacity-90">Sovereign Wealth Fund Demo</div>
        </div>
      </div>
      
      {/* Hover tooltip */}
      <div className="absolute top-full left-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
        <h4 className="font-bold text-white mb-2">Experience $1T Fund Capabilities</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
          <div className="flex items-center space-x-1">
            <Globe className="w-3 h-3 text-blue-400" />
            <span>Global Markets</span>
          </div>
          <div className="flex items-center space-x-1">
            <Zap className="w-3 h-3 text-yellow-400" />
            <span>10M Data Points/Sec</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span>Alpha Strategies</span>
          </div>
          <div className="flex items-center space-x-1">
            <DollarSign className="w-3 h-3 text-purple-400" />
            <span>$1T AUM Scale</span>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-400">
          Matching Norway GPFG, Saudi PIF, China CIC capabilities
        </div>
      </div>
    </Link>
  );
};

export default TrillionFundNavItem;
