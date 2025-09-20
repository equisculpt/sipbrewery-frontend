"use client";

import React, { useState } from 'react';

type EnterpriseNavigationProps = {
  rightSlot?: React.ReactNode;
};

const EnterpriseNavigation: React.FC<EnterpriseNavigationProps> = ({ rightSlot }) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const navigationMenu = [
    { name: 'Home', href: '/' },
    { 
      name: 'Mutual Fund', 
      href: '/mutual-funds',
      dropdown: [
        { name: 'Explore Funds', href: '/funds/explore', icon: '🔍' },
        { name: 'Top SIPs', href: '/funds/top-sips', icon: '🏆' },
        { name: 'Tax Saving ELSS', href: '/funds/elss', icon: '💵' },
        { name: 'Goal-Based Investing', href: '/funds/goals', icon: '🎯' }
      ]
    },
    { 
      name: 'Brew Bot', 
      href: '/brew-bot',
      dropdown: [
        { name: 'Fund Analysis', href: '/fsi/fund-analysis', icon: '📈' },
        { name: 'Stock Analysis', href: '/fsi/stock-analysis', icon: '📉' },
        { name: 'Fund Comparison', href: '/fsi/fund-comparison', icon: '⚖️' },
        { name: 'Stock Comparison', href: '/fsi/stock-comparison', icon: '🏁' },
        { name: 'Quantum Predictions', href: '/fsi/quantum-predictions', icon: '⚛️' },
        { name: 'Market Insights', href: '/fsi/market-insights', icon: '🤖' },
        { name: 'Risk Assessment', href: '/fsi/risk-assessment', icon: '🛡️' },
        { name: 'Portfolio Optimizer', href: '/fsi/portfolio-optimizer', icon: '🎯' }
      ]
    },
    { 
      name: 'Blog', 
      href: '/blog',
      dropdown: [
        { name: 'Latest Articles', href: '/blog/articles', icon: '📝' },
        { name: 'Market Updates', href: '/blog/market-updates', icon: '📊' },
        { name: 'Investment Tips', href: '/blog/investment-tips', icon: '💡' },
        { name: 'FSI Insights', href: '/blog/fsi-insights', icon: '🧠' },
        { name: 'Community Forum', href: '/community/forum', icon: '💬' },
        { name: 'Expert Discussions', href: '/community/experts', icon: '👥' },
        { name: 'Success Stories', href: '/community/stories', icon: '🏆' },
        { name: 'Q&A Hub', href: '/community/qa', icon: '❓' }
      ]
    }
  ];

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" 
      style={{
        background: activeDropdown !== null 
          ? 'linear-gradient(135deg, rgba(13, 15, 26, 0.95) 0%, rgba(17, 24, 39, 0.98) 100%)' 
          : 'linear-gradient(135deg, rgba(13, 15, 26, 0.85) 0%, rgba(17, 24, 39, 0.9) 50%, rgba(30, 41, 59, 0.85) 100%)',
        backdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: activeDropdown !== null ? '1px solid rgba(100, 116, 139, 0.3)' : '1px solid rgba(100, 116, 139, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
      }}
      onMouseLeave={() => {
        const timeout = setTimeout(() => {
          setActiveDropdown(null);
          setIsHovering(false);
        }, 150);
        setHoverTimeout(timeout);
      }}
    >
      <div className="max-w-7xl mx-auto px-8 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="text-4xl transform hover:scale-110 transition-transform duration-300" style={{
              filter: 'drop-shadow(0 0 20px rgba(57, 255, 20, 0.6))'
            }}>
              🍺
            </div>
            <div>
              <div className="text-white font-black text-2xl tracking-tight">SIP Brewery™</div>
              <div className="text-sm font-semibold tracking-wide opacity-90" style={{
                background: 'linear-gradient(90deg, #00FF87 0%, #4AE3F7 50%, #00FF87 100%)',
                WebkitBackgroundClip: 'text' as any,
                WebkitTextFillColor: 'transparent' as any,
                filter: 'drop-shadow(0 0 4px rgba(0, 255, 135, 0.3))'
              }}>Brewing Wealth</div>
            </div>
          </div>

          {/* Menu */}
          <div className="flex items-center space-x-12 ml-16">
            {navigationMenu.map((item, i) => (
              <div key={item.name} className="relative">
                <button
                  className={`navigation-button px-6 py-4 text-base font-medium transition-all duration-500 relative border-none shadow-none rounded-xl group ${
                    activeDropdown === i
                      ? 'text-green-400'
                      : 'text-white hover:text-green-400'
                  }`}
                  style={{
                    letterSpacing: '-0.01em',
                    background: activeDropdown === i 
                      ? 'linear-gradient(135deg, rgba(0,255,135,0.12) 0%, rgba(74,227,247,0.08) 100%)'
                      : 'transparent',
                    border: 'none',
                    outline: 'none',
                    boxShadow: activeDropdown === i 
                      ? '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 20px rgba(0,255,135,0.15)'
                      : 'none',
                    backdropFilter: activeDropdown === i ? 'blur(10px) saturate(150%)' : 'none',
                    WebkitBackdropFilter: activeDropdown === i ? 'blur(10px) saturate(150%)' : 'none'
                  }}
                  onMouseEnter={() => {
                    if (hoverTimeout) clearTimeout(hoverTimeout);
                    if ((item as any).dropdown) {
                      setActiveDropdown(i);
                      setIsHovering(true);
                    }
                  }}
                >
                  <span className="relative z-10">{item.name}</span>
                </button>
              </div>
            ))}
          </div>

          {/* Right slot for actions/search */}
          <div className="flex-1 max-w-lg mx-8">{rightSlot}</div>
        </div>
      </div>
    </nav>
  );
};

export default EnterpriseNavigation;
