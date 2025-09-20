'use client';

import { useState, useEffect } from 'react';

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

interface MarketTickerProps {
  currentTime?: Date | null;
}

export default function MarketTicker({ currentTime }: MarketTickerProps) {
  const [internalTime, setInternalTime] = useState<Date | null>(null);
  const displayTime = currentTime || internalTime;
  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: 'NIFTY', price: 21853.19, change: 124.67, changePercent: 0.57, volume: '2.1B' },
    { symbol: 'SENSEX', price: 72247.34, change: 287.45, changePercent: 0.40, volume: '1.8B' },
    { symbol: 'BANKNIFTY', price: 47874.56, change: 156.89, changePercent: 0.33, volume: '892M' },
    { symbol: 'NIFTY IT', price: 34569.49, change: 445.23, changePercent: 1.31, volume: '567M' },
    { symbol: 'GOLD', price: 62847.00, change: -234.56, changePercent: -0.37, volume: '234M' },
    { symbol: 'SILVER', price: 74562.00, change: 567.89, changePercent: 0.77, volume: '156M' },
    { symbol: 'CRUDE OIL', price: 6847.50, change: 89.23, changePercent: 1.32, volume: '445M' },
    { symbol: 'USD/INR', price: 83.25, change: -0.15, changePercent: -0.18, volume: '1.2B' }
  ]);

  useEffect(() => {
    // Set initial time if not provided
    if (!currentTime) {
      setInternalTime(new Date());
      
      const timeInterval = setInterval(() => {
        setInternalTime(new Date());
      }, 1000);
      
      return () => clearInterval(timeInterval);
    }
  }, [currentTime]);

  useEffect(() => {
    const marketInterval = setInterval(() => {
      setMarketData(prev => prev.map(item => ({
        ...item,
        price: Math.max(0, item.price + (Math.random() - 0.5) * (item.price * 0.002)),
        change: item.change + (Math.random() - 0.5) * 15,
        changePercent: item.changePercent + (Math.random() - 0.5) * 0.2
      })));
    }, 1500);
    
    return () => clearInterval(marketInterval);
  }, []);
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl border-b border-white/20" style={{
      background: `
        linear-gradient(90deg, 
          rgba(0,0,0,0.85) 0%, 
          rgba(10,10,30,0.95) 25%, 
          rgba(20,20,40,0.95) 50%, 
          rgba(10,10,30,0.95) 75%, 
          rgba(0,0,0,0.85) 100%
        )
      `,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }}>
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" style={{
                boxShadow: '0 0 15px rgba(34, 197, 94, 0.8)'
              }}></div>
              <span className="text-green-400 font-bold text-sm tracking-wider">LIVE MARKET</span>
            </div>
            <div className="text-white/70 text-sm font-mono">
              {displayTime?.toLocaleTimeString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                hour12: false 
              })} IST
            </div>
          </div>
          
          <div className="flex-1 mx-8 overflow-hidden">
            <div className="flex animate-scroll space-x-10" style={{
              animation: 'scroll 60s linear infinite'
            }}>
              {marketData.concat(marketData).map((item, index) => (
                <div key={index} className="flex items-center space-x-4 whitespace-nowrap group hover:scale-105 transition-transform duration-300">
                  <span className="font-bold text-white text-sm tracking-wide">{item.symbol}</span>
                  <span className="font-mono text-cyan-400 text-sm font-bold">
                    ₹{item.price.toLocaleString('en-IN', {maximumFractionDigits: 2})}
                  </span>
                  <span className={`flex items-center space-x-1 text-sm font-bold ${
                    item.change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <span className="text-base">{item.change >= 0 ? '▲' : '▼'}</span>
                    <span>{Math.abs(item.change).toFixed(2)}</span>
                    <span>({(item.changePercent).toFixed(2)}%)</span>
                  </span>
                  <span className="text-white/50 text-xs font-medium">Vol: {item.volume}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
            <span className="text-cyan-400 text-sm font-medium">Real-time</span>
          </div>
        </div>
      </div>
    </div>
  );
}
