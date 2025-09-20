'use client';

import { useState, useEffect } from 'react';

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
}

interface FundPerformance {
  name: string;
  nav: number;
  change: number;
  changePercent: number;
  aum: string;
  category: string;
}

export default function MarketVisualization() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [fundData, setFundData] = useState<FundPerformance[]>([]);
  const [selectedTab, setSelectedTab] = useState<'market' | 'funds'>('market');
  const [isLive, setIsLive] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Ensure component only renders on client to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simulate real-time market data updates
  useEffect(() => {
    const generateMarketData = (): MarketData[] => [
      {
        symbol: 'NIFTY 50',
        name: 'Nifty 50 Index',
        price: 21847.70 + (Math.random() - 0.5) * 100,
        change: (Math.random() - 0.5) * 200,
        changePercent: (Math.random() - 0.5) * 2,
        volume: '₹45,234 Cr',
        marketCap: '₹2,45,67,890 Cr'
      },
      {
        symbol: 'SENSEX',
        name: 'BSE Sensex',
        price: 72240.26 + (Math.random() - 0.5) * 300,
        change: (Math.random() - 0.5) * 400,
        changePercent: (Math.random() - 0.5) * 2.5,
        volume: '₹38,567 Cr',
        marketCap: '₹3,12,45,678 Cr'
      },
      {
        symbol: 'BANKNIFTY',
        name: 'Bank Nifty',
        price: 47856.35 + (Math.random() - 0.5) * 500,
        change: (Math.random() - 0.5) * 600,
        changePercent: (Math.random() - 0.5) * 3,
        volume: '₹28,945 Cr',
        marketCap: '₹1,87,34,567 Cr'
      },
      {
        symbol: 'NIFTY IT',
        name: 'Nifty IT Index',
        price: 34567.89 + (Math.random() - 0.5) * 400,
        change: (Math.random() - 0.5) * 500,
        changePercent: (Math.random() - 0.5) * 2.8,
        volume: '₹15,678 Cr',
        marketCap: '₹98,76,543 Cr'
      }
    ];

    const generateFundData = (): FundPerformance[] => [
      {
        name: 'SIP Brewery Flexi Cap Fund',
        nav: 245.67 + (Math.random() - 0.5) * 5,
        change: (Math.random() - 0.5) * 3,
        changePercent: (Math.random() - 0.5) * 1.5,
        aum: '₹12,345 Cr',
        category: 'Flexi Cap'
      },
      {
        name: 'SIP Brewery Large Cap Fund',
        nav: 189.34 + (Math.random() - 0.5) * 3,
        change: (Math.random() - 0.5) * 2,
        changePercent: (Math.random() - 0.5) * 1.2,
        aum: '₹8,967 Cr',
        category: 'Large Cap'
      },
      {
        name: 'SIP Brewery Mid Cap Fund',
        nav: 156.78 + (Math.random() - 0.5) * 8,
        change: (Math.random() - 0.5) * 4,
        changePercent: (Math.random() - 0.5) * 2.5,
        aum: '₹5,432 Cr',
        category: 'Mid Cap'
      },
      {
        name: 'SIP Brewery ELSS Fund',
        nav: 298.45 + (Math.random() - 0.5) * 6,
        change: (Math.random() - 0.5) * 3.5,
        changePercent: (Math.random() - 0.5) * 1.8,
        aum: '₹7,890 Cr',
        category: 'ELSS'
      }
    ];

    // Initial data load
    setMarketData(generateMarketData());
    setFundData(generateFundData());

    // Real-time updates every 3 seconds
    const interval = setInterval(() => {
      if (isLive) {
        setMarketData(generateMarketData());
        setFundData(generateFundData());
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  if (!isClient) {
    return (
      <div style={{
        background: 'rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        padding: '3rem',
        textAlign: 'center',
        margin: '4rem 0',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ opacity: 0.6 }}>Loading Market Visualization...</div>
      </div>
    );
  }

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toFixed(decimals);
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? '#39ff14' : '#ff4757';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? '▲' : '▼';
  };

  return (
    <div style={{ margin: '4rem 0' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          background: 'linear-gradient(45deg, #00f9ff, #39ff14)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          📊 Real-Time Market Intelligence
        </h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '2rem' }}>
          AI-powered market analysis with live data visualization
        </p>

        {/* Live Status Indicator */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(0,0,0,0.4)',
          padding: '0.5rem 1rem',
          borderRadius: '25px',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            background: isLive ? '#39ff14' : '#ff4757',
            borderRadius: '50%',
            boxShadow: `0 0 10px ${isLive ? '#39ff14' : '#ff4757'}`,
            animation: isLive ? 'pulse 2s infinite' : 'none'
          }}></div>
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
            {isLive ? 'LIVE' : 'PAUSED'}
          </span>
          <button
            onClick={() => setIsLive(!isLive)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#00f9ff',
              cursor: 'pointer',
              marginLeft: '0.5rem',
              fontSize: '0.8rem'
            }}
          >
            {isLive ? '⏸️' : '▶️'}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem',
        gap: '1rem'
      }}>
        {[
          { key: 'market', label: '📈 Market Indices', icon: '🏛️' },
          { key: 'funds', label: '💼 Fund Performance', icon: '🎯' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key as 'market' | 'funds')}
            style={{
              background: selectedTab === tab.key 
                ? 'linear-gradient(45deg, #00f9ff, #39ff14)'
                : 'rgba(255,255,255,0.1)',
              color: selectedTab === tab.key ? '#000000' : '#ffffff',
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(20px)'
            }}
            onMouseEnter={(e) => {
              if (selectedTab !== tab.key) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedTab !== tab.key) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              }
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Market Data Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem'
      }}>
        {(selectedTab === 'market' ? marketData : fundData).map((item, index) => (
          <div
            key={index}
            style={{
              background: `linear-gradient(135deg, 
                ${index % 4 === 0 ? 'rgba(0,249,255,0.1)' : 
                  index % 4 === 1 ? 'rgba(57,255,20,0.1)' : 
                  index % 4 === 2 ? 'rgba(128,0,255,0.1)' : 
                  'rgba(255,128,0,0.1)'} 0%, 
                rgba(0,0,0,0.2) 100%)`,
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              padding: '2rem',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Live pulse animation */}
            <div style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '8px',
              height: '8px',
              background: '#39ff14',
              borderRadius: '50%',
              boxShadow: '0 0 10px #39ff14',
              animation: isLive ? 'pulse 2s infinite' : 'none'
            }}></div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '0.5rem'
              }}>
                {'symbol' in item ? item.symbol : item.name}
              </h3>
              <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>
                {'name' in item ? item.name : `Category: ${(item as FundPerformance).category}`}
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '0.5rem'
              }}>
                ₹{formatNumber('price' in item ? item.price : item.nav)}
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: getChangeColor(item.change)
              }}>
                <span>{getChangeIcon(item.change)}</span>
                <span>{formatNumber(Math.abs(item.change))}</span>
                <span>({formatNumber(Math.abs(item.changePercent))}%)</span>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              fontSize: '0.9rem',
              opacity: 0.8
            }}>
              <div>
                <div style={{ marginBottom: '0.3rem' }}>
                  {'volume' in item ? 'Volume' : 'AUM'}
                </div>
                <div style={{ fontWeight: 600, color: '#00f9ff' }}>
                  {'volume' in item ? item.volume : item.aum}
                </div>
              </div>
              <div>
                <div style={{ marginBottom: '0.3rem' }}>
                  {'marketCap' in item ? 'Market Cap' : 'Category'}
                </div>
                <div style={{ fontWeight: 600, color: '#39ff14' }}>
                  {'marketCap' in item ? item.marketCap : item.category}
                </div>
              </div>
            </div>

            {/* AI Insight Badge */}
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              background: 'rgba(0,249,255,0.2)',
              color: '#00f9ff',
              padding: '0.3rem 0.8rem',
              borderRadius: '15px',
              fontSize: '0.7rem',
              fontWeight: 600,
              border: '1px solid rgba(0,249,255,0.3)'
            }}>
              🤖 AI Tracked
            </div>
          </div>
        ))}
      </div>

      {/* Global Styles for Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
