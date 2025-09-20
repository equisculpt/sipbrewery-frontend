'use client';

import React, { useState, useEffect } from 'react';
import PayTMStyleNavigation from '../components/PayTMStyleNavigation';
import { Plus, DollarSign } from 'lucide-react';
import SimpleBackendDemo from '../components/SimpleBackendDemo';
import DemoAccount from '../components/DemoAccount';
import SimpleASIDashboard from '../components/SimpleASIDashboard';
import AdvancedRiskDashboard from '../components/AdvancedRiskDashboard';
import RealTimeDataDashboard from '../components/RealTimeDataDashboard';
import EnterpriseIntegrationDashboard from '../components/EnterpriseIntegrationDashboard';
import AuthModal from '../components/AuthModal';
import DemoDashboard from '../components/DemoDashboardClean';



const EnterpriseNavigation: React.FC<EnterpriseNavigationProps> = ({ onOpenAuthModal }) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Clean, minimal navigation with necessary dropdowns
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

  // Navigation menu is now unified

  return (
    <>
      {/* ENTERPRISE NAVIGATION BAR */}
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
        {/* Continuous Background Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(57, 255, 20, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(57, 255, 20, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            opacity: 0.4,
            animation: 'gridMove 20s linear infinite'
          }}></div>
          
          {/* Neural Network in Navigation */}
          <div className="absolute inset-0">
            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              {[...Array(7)].map((_, i) => {
                const x1 = 15 + i * 12;
                const y1 = 30 + (i % 3) * 20;
                const x2 = 15 + (i + 1) * 12;
                const y2 = 30 + ((i + 1) % 3) * 20;
                return (
                  <line
                    key={i}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="rgba(57, 255, 20, 0.3)"
                    strokeWidth="1"
                    style={{
                      animation: `neuralConnection ${4 + i * 0.3}s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                );
              })}
              {/* Additional connecting lines for network effect */}
              {[...Array(5)].map((_, i) => {
                const x1 = 15 + i * 15;
                const y1 = 30 + (i % 2) * 40;
                const x2 = 15 + (i + 2) * 15;
                const y2 = 30 + ((i + 2) % 2) * 40;
                return (
                  <line
                    key={`cross-${i}`}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="rgba(57, 255, 20, 0.2)"
                    strokeWidth="0.5"
                    style={{
                      animation: `neuralConnection ${5 + i * 0.4}s ease-in-out infinite reverse`,
                      animationDelay: `${i * 0.15}s`
                    }}
                  />
                );
              })}
            </svg>
            
            {/* Neural Nodes */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-green-400 rounded-full"
                style={{
                  left: `${15 + i * 12}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  animation: `neuralNode ${3 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                  zIndex: 2,
                  boxShadow: '0 0 10px rgba(57, 255, 20, 0.6)'
                }}
              />
            ))}
            
            {/* Pulsing Connection Points */}
            {[...Array(4)].map((_, i) => (
              <div
                key={`pulse-${i}`}
                className="absolute w-1 h-1 bg-green-300 rounded-full"
                style={{
                  left: `${25 + i * 20}%`,
                  top: `${40 + (i % 2) * 10}%`,
                  animation: `consciousBreath ${2 + i * 0.3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.25}s`,
                  zIndex: 1,
                  boxShadow: '0 0 8px rgba(57, 255, 20, 0.8)'
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Seamless Transition Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 50%, rgba(57,255,20,0.05) 100%)'
        }}></div>
      
      <div className="max-w-7xl mx-auto px-8 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* PROFESSIONAL LOGO */}
          <div className="flex items-center space-x-4">
            <div className="text-4xl transform hover:scale-110 transition-transform duration-300" style={{
              filter: 'drop-shadow(0 0 20px rgba(57, 255, 20, 0.6))'
            }}>
              🍺
            </div>
            <div>
              <div className="text-white font-black text-2xl tracking-tight" style={{
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>SIP Brewery™</div>
              <div className="text-sm font-semibold tracking-wide opacity-90" style={{
                background: 'linear-gradient(90deg, #00FF87 0%, #4AE3F7 50%, #00FF87 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 4px rgba(0, 255, 135, 0.3))'
              }}>Brewing Wealth</div>
            </div>
          </div>
          
          {/* LEFT-ALIGNED NAVIGATION MENU */}
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
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontWeight: activeDropdown === i ? 600 : 500,
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
                      WebkitBackdropFilter: activeDropdown === i ? 'blur(10px) saturate(150%)' : 'none' as any,
                      padding: '1rem 1.5rem',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      // Glassmorphism hover effect
                      if (activeDropdown !== i) {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(57,255,20,0.05) 100%)';
                        e.currentTarget.style.backdropFilter = 'blur(10px) saturate(150%)';
                        (e.currentTarget.style as any).WebkitBackdropFilter = 'blur(10px) saturate(150%)';
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15), 0 0 20px rgba(57,255,20,0.1), inset 0 1px 0 rgba(255,255,255,0.05)';
                      }
                      
                      // Dropdown functionality
                      if (hoverTimeout) clearTimeout(hoverTimeout);
                      if ((item as any).dropdown) {
                        setActiveDropdown(i);
                        setIsHovering(true);
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeDropdown !== i) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.backdropFilter = 'none';
                        (e.currentTarget.style as any).WebkitBackdropFilter = 'none';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                  >
                    {/* Shimmer overlay for premium effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                      background: 'linear-gradient(45deg, transparent 30%, rgba(0,255,135,0.1) 50%, transparent 70%)',
                      animation: 'shimmerSweep 2s ease-in-out infinite'
                    }}></div>
                    
                    <span className="relative z-10">{item.name}</span>
                    
                    {/* Sophisticated underline animation */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent transition-all duration-500 group-hover:w-full" style={{
                      width: activeDropdown === i ? '60%' : '0%',
                      boxShadow: activeDropdown === i ? '0 0 12px rgba(0, 255, 135, 0.8)' : '0 0 8px rgba(0, 255, 135, 0.4)',
                      background: activeDropdown === i 
                        ? 'linear-gradient(90deg, transparent, #00FF87, #4AE3F7, #00FF87, transparent)'
                        : 'linear-gradient(90deg, transparent, #00FF87, transparent)'
                    }}></div>
                    
                    {/* Subtle glow effect on hover */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" style={{
                      background: 'radial-gradient(circle at center, rgba(0,255,135,0.05) 0%, transparent 70%)',
                      filter: 'blur(8px)'
                    }}></div>
                  </button>

              </div>
            ))}
          </div>
          
          {/* PREMIUM GLASSMORPHISM SEARCH BOX */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative group">
              {/* Enhanced outer glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/15 via-cyan-400/20 to-green-400/15 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-700"></div>
              
              {/* Premium glassmorphism container */}
              <div className="relative overflow-hidden rounded-2xl" style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(0,255,135,0.05) 50%, rgba(74,227,247,0.03) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}>
                {/* Animated shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 transform -skew-x-12 group-hover:translate-x-full"></div>
                
                {/* Focus ring */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-300" style={{
                  boxShadow: '0 0 0 2px rgba(0,255,135,0.3), 0 0 20px rgba(0,255,135,0.2)'
                }}></div>
                
                {/* Search Icon - Left Side */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white group-hover:text-green-300 transition-colors duration-300 z-50 pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <input
                  type="text"
                  placeholder="Search funds, SIPs, or schemes..."
                  className="w-full pr-16 py-4 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:placeholder-green-300 transition-all duration-300 text-base font-medium"
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    textShadow: '0 0 10px rgba(255,255,255,0.1)',
                    paddingLeft: '3rem',
                    textIndent: '0.5rem'
                  }}
                />
                
                {/* Lightning Button - Right Side */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-black font-bold cursor-pointer hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-green-400/50">
                    ⚡
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* HERO-STYLE AUTH BUTTON */}
          <div>
            <button 
              onClick={onOpenAuthModal}
              className="text-white hover:text-green-400 transition-all duration-300 font-bold px-8 py-3 text-lg bg-transparent border-none outline-none hover:scale-105 transform"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                background: 'linear-gradient(90deg, #00FF87 0%, #4AE3F7 50%, #00FF87 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 8px rgba(0, 255, 135, 0.3))',
                textShadow: 'none'
              }}
            >
              SignUp/Login
            </button>
          </div>
        </div>
      </div>
      
      {/* MODERN SEXY MEGA MENU */}
      {activeDropdown !== null && (
        <div 
          className="absolute top-full left-0 right-0 z-40 transition-all duration-500 transform" 
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(15,23,42,0.90) 30%, rgba(30,41,59,0.95) 70%, rgba(0,0,0,0.85) 100%)',
            backdropFilter: 'blur(40px) saturate(200%) brightness(1.1)',
            WebkitBackdropFilter: 'blur(40px) saturate(200%) brightness(1.1)' as any,
            borderRadius: '0 0 24px 24px',
            border: '1px solid rgba(57, 255, 20, 0.2)',
            borderTop: '1px solid rgba(57, 255, 20, 0.3)',
            boxShadow: `
              0 32px 64px -12px rgba(0, 0, 0, 0.9),
              0 0 0 1px rgba(57, 255, 20, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.08),
              inset 0 -1px 0 rgba(57, 255, 20, 0.05),
              0 0 50px rgba(57, 255, 20, 0.1),
              0 0 100px rgba(57, 255, 20, 0.05)
            `,
            overflow: 'hidden'
          }}
          onMouseEnter={() => {
            if (hoverTimeout) clearTimeout(hoverTimeout);
            setIsHovering(true);
          }}
          onMouseLeave={() => {
            setIsHovering(false);
            const timeout = setTimeout(() => setActiveDropdown(null), 100);
            setHoverTimeout(timeout);
          }}
        >
          <div className="max-w-7xl mx-auto px-12 py-12">
            <div className="grid grid-cols-4 gap-16">
              {/* ENTERPRISE GRID - PERFECT 25% DISTRIBUTION */}
              {/* Mutual Fund Mega Menu */}
              {navigationMenu[activeDropdown]?.name === 'Mutual Fund' && navigationMenu[activeDropdown]?.dropdown && (
                <>
                  <div className="space-y-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-xl blur-sm"></div>
                      <h3 className="relative text-xl font-bold text-white mb-8 pb-4 border-b border-gradient-to-r from-transparent via-green-400/30 to-transparent">
                        <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                          💎 Investment Options
                        </span>
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {navigationMenu[activeDropdown].dropdown.slice(0, 2).map((item: any, i: number) => (
                        <a 
                          key={i} 
                          href={item.href} 
                          className="group relative flex items-center px-6 py-4 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                          style={{
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(57,255,20,0.08) 50%, rgba(34,197,94,0.06) 100%)',
                            border: '1px solid rgba(57,255,20,0.15)',
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `
                              0 8px 32px rgba(0,0,0,0.4),
                              0 0 40px rgba(57,255,20,0.3),
                              0 0 80px rgba(57,255,20,0.1),
                              inset 0 1px 0 rgba(255,255,255,0.15)
                            `;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/5 to-green-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                          <div className="relative w-12 h-12 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-xl flex items-center justify-center mr-4 group-hover:from-green-400/30 group-hover:to-emerald-400/30 transition-all duration-300 shadow-lg">
                            <span className="text-lg filter drop-shadow-sm">{item.icon}</span>
                          </div>
                          <div className="relative flex-1">
                            <div className="font-semibold text-white text-base group-hover:text-green-300 transition-colors duration-300">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                              Premium investment solutions
                            </div>
                          </div>
                          <div className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                              <span className="text-black text-xs font-bold">→</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-xl blur-sm"></div>
                      <h3 className="relative text-xl font-bold text-white mb-8 pb-4 border-b border-gradient-to-r from-transparent via-amber-400/30 to-transparent">
                        <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                          💰 Tax Saving
                        </span>
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {navigationMenu[activeDropdown].dropdown.slice(2, 4).map((item: any, i: number) => (
                        <a 
                          key={i} 
                          href={item.href} 
                          className="group relative flex items-center px-6 py-4 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                          style={{
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(251,191,36,0.08) 50%, rgba(245,158,11,0.06) 100%)',
                            border: '1px solid rgba(251,191,36,0.15)',
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `
                              0 8px 32px rgba(0,0,0,0.4),
                              0 0 40px rgba(251,191,36,0.3),
                              0 0 80px rgba(251,191,36,0.1),
                              inset 0 1px 0 rgba(255,255,255,0.15)
                            `;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                          <div className="relative w-12 h-12 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-xl flex items-center justify-center mr-4 group-hover:from-amber-400/30 group-hover:to-orange-400/30 transition-all duration-300 shadow-lg">
                            <span className="text-lg filter drop-shadow-sm">{item.icon}</span>
                          </div>
                          <div className="relative flex-1">
                            <div className="font-semibold text-white text-base group-hover:text-amber-300 transition-colors duration-300">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                              Tax-efficient strategies
                            </div>
                          </div>
                          <div className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                              <span className="text-black text-xs font-bold">→</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-xl blur-sm"></div>
                      <h3 className="relative text-xl font-bold text-white mb-8 pb-4 border-b border-gradient-to-r from-transparent via-blue-400/30 to-transparent">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          🚀 Tools & Calculators
                        </span>
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <a 
                        href="/calculator" 
                        className="group relative flex items-center px-6 py-4 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                        style={{
                          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(59,130,246,0.08) 50%, rgba(147,51,234,0.06) 100%)',
                          border: '1px solid rgba(59,130,246,0.15)',
                          backdropFilter: 'blur(20px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = `
                            0 8px 32px rgba(0,0,0,0.4),
                            0 0 40px rgba(59,130,246,0.3),
                            0 0 80px rgba(59,130,246,0.1),
                            inset 0 1px 0 rgba(255,255,255,0.15)
                          `;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        <div className="relative w-12 h-12 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-xl flex items-center justify-center mr-4 group-hover:from-blue-400/30 group-hover:to-purple-400/30 transition-all duration-300 shadow-lg">
                          <span className="text-lg filter drop-shadow-sm">🧮</span>
                        </div>
                        <div className="relative flex-1">
                          <div className="font-semibold text-white text-base group-hover:text-blue-300 transition-colors duration-300">
                            SIP Calculator
                          </div>
                          <div className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                            Advanced planning tools
                          </div>
                        </div>
                        <div className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                            <span className="text-black text-xs font-bold">→</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-xl blur-sm"></div>
                      <h3 className="relative text-xl font-bold text-white mb-8 pb-4 border-b border-gradient-to-r from-transparent via-pink-400/30 to-transparent">
                        <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                          🎆 Resources
                        </span>
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <a 
                        href="/learn" 
                        className="group relative flex items-center px-6 py-4 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                        style={{
                          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(236,72,153,0.08) 50%, rgba(219,39,119,0.06) 100%)',
                          border: '1px solid rgba(236,72,153,0.15)',
                          backdropFilter: 'blur(20px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = `
                            0 8px 32px rgba(0,0,0,0.4),
                            0 0 40px rgba(236,72,153,0.3),
                            0 0 80px rgba(236,72,153,0.1),
                            inset 0 1px 0 rgba(255,255,255,0.15)
                          `;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/0 via-pink-400/5 to-pink-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        <div className="relative w-12 h-12 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-xl flex items-center justify-center mr-4 group-hover:from-pink-400/30 group-hover:to-rose-400/30 transition-all duration-300 shadow-lg">
                          <span className="text-lg filter drop-shadow-sm">📚</span>
                        </div>
                        <div className="relative flex-1">
                          <div className="font-semibold text-white text-base group-hover:text-pink-300 transition-colors duration-300">
                            Learning Center
                          </div>
                          <div className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                            Expert insights & research
                          </div>
                        </div>
                        <div className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                            <span className="text-black text-xs font-bold">→</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </>
              )}
              
              {/* Brew Bot ASI Mega Menu */}
              {navigationMenu[activeDropdown]?.name === 'Brew Bot' && navigationMenu[activeDropdown]?.dropdown && (
                <>
                  <div className="space-y-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl blur-sm"></div>
                      <h3 className="relative text-xl font-bold text-white mb-8 pb-4 border-b border-gradient-to-r from-transparent via-orange-400/50 to-transparent flex items-center">
                        <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-extrabold">
                          🤖 Analysis Tools
                        </span>
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {navigationMenu[activeDropdown].dropdown.slice(0, 2).map((item: any, i: number) => (
                        <a 
                          key={i} 
                          href={item.href} 
                          className="group relative flex items-center px-6 py-4 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                          style={{
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(249,115,22,0.12) 50%, rgba(239,68,68,0.08) 100%)',
                            border: '1px solid rgba(249,115,22,0.25)',
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `
                              0 8px 32px rgba(0,0,0,0.4),
                              0 0 40px rgba(249,115,22,0.4),
                              0 0 80px rgba(249,115,22,0.2),
                              inset 0 1px 0 rgba(255,255,255,0.15)
                            `;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                          <div className="relative w-12 h-12 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-xl flex items-center justify-center mr-4 group-hover:from-orange-400/50 group-hover:to-red-400/50 transition-all duration-300 shadow-lg shadow-orange-500/20">
                            <span className="text-lg filter drop-shadow-sm">{item.icon}</span>
                          </div>
                          <div className="relative flex-1">
                            <div className="font-semibold text-white text-base group-hover:text-orange-300 transition-colors duration-300">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-300 mt-1 group-hover:text-orange-200 transition-colors duration-300">
                              AI-powered analysis
                            </div>
                          </div>
                          <div className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-black text-xs font-bold">→</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl blur-sm"></div>
                      <h3 className="relative text-xl font-bold text-white mb-8 pb-4 border-b border-gradient-to-r from-transparent via-yellow-400/50 to-transparent flex items-center">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-extrabold">
                          ⚖️ Comparison Engine
                        </span>
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {navigationMenu[activeDropdown].dropdown.slice(2, 4).map((item: any, i: number) => (
                        <a 
                          key={i} 
                          href={item.href} 
                          className="group relative flex items-center px-6 py-4 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                          style={{
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(245,158,11,0.12) 50%, rgba(251,191,36,0.08) 100%)',
                            border: '1px solid rgba(245,158,11,0.25)',
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `
                              0 8px 32px rgba(0,0,0,0.4),
                              0 0 40px rgba(245,158,11,0.4),
                              0 0 80px rgba(245,158,11,0.2),
                              inset 0 1px 0 rgba(255,255,255,0.15)
                            `;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                          <div className="relative w-12 h-12 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-xl flex items-center justify-center mr-4 group-hover:from-yellow-400/50 group-hover:to-orange-400/50 transition-all duration-300 shadow-lg shadow-yellow-500/20">
                            <span className="text-lg filter drop-shadow-sm">{item.icon}</span>
                          </div>
                          <div className="relative flex-1">
                            <div className="font-semibold text-white text-base group-hover:text-yellow-300 transition-colors duration-300">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-300 mt-1 group-hover:text-yellow-200 transition-colors duration-300">
                              Advanced comparison algorithms
                            </div>
                          </div>
                          <div className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-black text-xs font-bold">→</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 rounded-xl blur-sm"></div>
                      <h3 className="relative text-xl font-bold text-white mb-8 pb-4 border-b border-gradient-to-r from-transparent via-purple-400/50 to-transparent flex items-center">
                        <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent font-extrabold">
                          ⚛️ Quantum AI
                        </span>
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {navigationMenu[activeDropdown].dropdown.slice(4, 6).map((item: any, i: number) => (
                        <a 
                          key={i} 
                          href={item.href} 
                          className="group relative flex items-center px-6 py-4 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                          style={{
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(168,85,247,0.12) 50%, rgba(217,70,239,0.08) 100%)',
                            border: '1px solid rgba(168,85,247,0.25)',
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `
                              0 8px 32px rgba(0,0,0,0.4),
                              0 0 40px rgba(168,85,247,0.4),
                              0 0 80px rgba(168,85,247,0.2),
                              inset 0 1px 0 rgba(255,255,255,0.15)
                            `;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                          <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500/30 to-fuchsia-500/30 rounded-xl flex items-center justify-center mr-4 group-hover:from-purple-400/50 group-hover:to-fuchsia-400/50 transition-all duration-300 shadow-lg shadow-purple-500/20">
                            <span className="text-lg filter drop-shadow-sm">{item.icon}</span>
                          </div>
                          <div className="relative flex-1">
                            <div className="font-semibold text-white text-base group-hover:text-purple-300 transition-colors duration-300">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-300 mt-1 group-hover:text-purple-200 transition-colors duration-300">
                              Quantum-powered predictions
                            </div>
                          </div>
                          <div className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-fuchsia-400 rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-black text-xs font-bold">→</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur-sm"></div>
                      <h3 className="relative text-xl font-bold text-white mb-8 pb-4 border-b border-gradient-to-r from-transparent via-cyan-400/50 to-transparent flex items-center">
                        <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent font-extrabold">
                          🛡️ Advanced Tools
                        </span>
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {navigationMenu[activeDropdown].dropdown.slice(6, 8).map((item: any, i: number) => (
                        <a 
                          key={i} 
                          href={item.href} 
                          className="group relative flex items-center px-6 py-4 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                          style={{
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(6,182,212,0.12) 50%, rgba(16,185,129,0.08) 100%)',
                            border: '1px solid rgba(6,182,212,0.25)',
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `
                              0 8px 32px rgba(0,0,0,0.4),
                              0 0 40px rgba(6,182,212,0.4),
                              0 0 80px rgba(6,182,212,0.2),
                              inset 0 1px 0 rgba(255,255,255,0.15)
                            `;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                          <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500/30 to-emerald-500/30 rounded-xl flex items-center justify-center mr-4 group-hover:from-cyan-400/50 group-hover:to-emerald-400/50 transition-all duration-300 shadow-lg shadow-cyan-500/20">
                            <span className="text-lg filter drop-shadow-sm">{item.icon}</span>
                          </div>
                          <div className="relative flex-1">
                            <div className="font-semibold text-white text-base group-hover:text-cyan-300 transition-colors duration-300">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-300 mt-1 group-hover:text-cyan-200 transition-colors duration-300">
                              Professional-grade tools
                            </div>
                          </div>
                          <div className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-black text-xs font-bold">→</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
    </>
  );
};

// FSI Top 10 Mutual Funds Section Component
const FSIMutualFundsSection = React.memo(() => {
  // Top 10 mutual funds data discovered by FSI
  const topMutualFunds = [
    {
      id: 1,
      name: "Axis Bluechip Fund",
      category: "Large Cap",
      nav: "₹65.42",
      returns1Y: "+18.5%",
      returns3Y: "+15.2%",
      returns5Y: "+12.8%",
      riskLevel: "Moderate",
      rating: 4.5,
      aum: "₹45,230 Cr",
      expenseRatio: "1.85%",
      fsiScores: {
        riskAnalysis: 96.2,
        performanceStability: 94.8,
        marketTiming: 94.1,
        portfolioOptimization: 94.9,
        overallScore: 95.0
      }
    },
    {
      id: 2,
      name: "HDFC Top 100 Fund",
      category: "Large Cap",
      nav: "₹892.15",
      returns1Y: "+17.8%",
      returns3Y: "+14.9%",
      returns5Y: "+13.1%",
      riskLevel: "Moderate",
      rating: 4.3,
      aum: "₹38,450 Cr",
      expenseRatio: "1.92%",
      fsiScores: {
        riskAnalysis: 93.8,
        performanceStability: 92.4,
        marketTiming: 92.9,
        portfolioOptimization: 92.7,
        overallScore: 93.0
      }
    },
    {
      id: 3,
      name: "SBI Small Cap Fund",
      category: "Small Cap",
      nav: "₹156.78",
      returns1Y: "+24.2%",
      returns3Y: "+19.5%",
      returns5Y: "+16.8%",
      riskLevel: "High",
      rating: 4.1,
      aum: "₹28,670 Cr",
      expenseRatio: "2.15%",
      fsiScores: {
        riskAnalysis: 89.7,
        performanceStability: 92.1,
        marketTiming: 91.8,
        portfolioOptimization: 90.4,
        overallScore: 91.0
      }
    },
    {
      id: 4,
      name: "Mirae Asset Large Cap Fund",
      category: "Large Cap",
      nav: "₹98.34",
      returns1Y: "+16.9%",
      returns3Y: "+14.2%",
      returns5Y: "+12.5%",
      riskLevel: "Moderate",
      rating: 4.2,
      aum: "₹32,180 Cr",
      expenseRatio: "1.75%",
      fsiScores: {
        riskAnalysis: 88.9,
        performanceStability: 89.2,
        marketTiming: 89.7,
        portfolioOptimization: 90.2,
        overallScore: 89.0
      }
    },
    {
      id: 5,
      name: "Parag Parikh Flexi Cap Fund",
      category: "Flexi Cap",
      nav: "₹67.89",
      returns1Y: "+19.3%",
      returns3Y: "+16.1%",
      returns5Y: "+14.2%",
      riskLevel: "Moderate High",
      rating: 4.4,
      aum: "₹41,560 Cr",
      expenseRatio: "1.68%",
      fsiScores: {
        riskAnalysis: 87.1,
        performanceStability: 86.8,
        marketTiming: 87.4,
        portfolioOptimization: 86.7,
        overallScore: 87.0
      }
    },
    {
      id: 6,
      name: "ICICI Prudential Technology Fund",
      category: "Sectoral",
      nav: "₹145.67",
      returns1Y: "+22.1%",
      returns3Y: "+18.7%",
      returns5Y: "+15.9%",
      riskLevel: "High",
      rating: 4.0,
      aum: "₹25,340 Cr",
      expenseRatio: "2.25%",
      fsiScores: {
        riskAnalysis: 84.8,
        performanceStability: 85.1,
        marketTiming: 85.7,
        portfolioOptimization: 84.4,
        overallScore: 85.0
      }
    },
    {
      id: 7,
      name: "Kotak Standard Multicap Fund",
      category: "Multi Cap",
      nav: "₹54.23",
      returns1Y: "+17.4%",
      returns3Y: "+15.6%",
      returns5Y: "+13.3%",
      riskLevel: "Moderate",
      rating: 4.2,
      aum: "₹36,780 Cr",
      expenseRatio: "1.89%",
      fsiScores: {
        riskAnalysis: 82.9,
        performanceStability: 83.2,
        marketTiming: 82.8,
        portfolioOptimization: 83.1,
        overallScore: 83.0
      }
    },
    {
      id: 8,
      name: "UTI Flexi Cap Fund",
      category: "Flexi Cap",
      nav: "₹342.56",
      returns1Y: "+16.7%",
      returns3Y: "+14.8%",
      returns5Y: "+12.9%",
      riskLevel: "Moderate",
      rating: 4.1,
      aum: "₹29,450 Cr",
      expenseRatio: "1.95%",
      fsiScores: {
        riskAnalysis: 80.8,
        performanceStability: 81.1,
        marketTiming: 81.4,
        portfolioOptimization: 80.7,
        overallScore: 81.0
      }
    },
    {
      id: 9,
      name: "DSP Midcap Fund",
      category: "Mid Cap",
      nav: "₹89.12",
      returns1Y: "+20.8%",
      returns3Y: "+17.2%",
      returns5Y: "+14.7%",
      riskLevel: "Moderate High",
      rating: 4.3,
      aum: "₹31,890 Cr",
      expenseRatio: "2.05%",
      fsiScores: {
        riskAnalysis: 78.9,
        performanceStability: 79.2,
        marketTiming: 78.7,
        portfolioOptimization: 79.2,
        overallScore: 79.0
      }
    },
    {
      id: 10,
      name: "Nippon India Small Cap Fund",
      category: "Small Cap",
      nav: "₹78.45",
      returns1Y: "+25.1%",
      returns3Y: "+20.3%",
      returns5Y: "+17.1%",
      riskLevel: "High",
      rating: 4.0,
      aum: "₹24,670 Cr",
      expenseRatio: "2.18%",
      fsiScores: {
        riskAnalysis: 76.8,
        performanceStability: 77.1,
        marketTiming: 77.4,
        portfolioOptimization: 76.7,
        overallScore: 77.0
      }
    }
  ];

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Moderate': return 'text-green-400';
      case 'Moderate High': return 'text-yellow-400';
      case 'High': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    
    return stars.join('');
  };

  return (
    <section className="relative px-4 overflow-hidden" style={{
      background: 'linear-gradient(135deg, #000814 0%, #001d3d 50%, #003566 100%)',
      paddingTop: '2mm',
      paddingBottom: '80px'
    }}>
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(0, 255, 135, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 15s ease-in-out infinite'
        }}></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(74, 227, 247, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'float 18s ease-in-out infinite reverse'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-16" style={{ textAlign: 'center' }}>
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-6" style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 135, 0.1) 0%, rgba(74, 227, 247, 0.1) 100%)',
            border: '1px solid rgba(0, 255, 135, 0.2)'
          }}>
            <div className="w-2 h-2 rounded-full mr-2" style={{
              background: '#00FF87',
              boxShadow: '0 0 8px rgba(0, 255, 135, 0.6)'
            }}></div>
            <span className="text-sm font-medium text-green-300 tracking-wider uppercase">FSI POWERED ANALYSIS</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #00FF87 50%, #4AE3F7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            FSI-Optimized Fund Selection
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Curated by our <span className="text-cyan-400 font-semibold">Financial Super Intelligence</span> using 
            multi-dimensional risk modeling, volatility prediction, and quantum market analysis algorithms
          </p>
        </div>

        {/* AI-Optimized Funds Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {topMutualFunds.map((fund, index) => (
            <div key={fund.id} className="group relative" style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(100, 116, 139, 0.3)',
              borderRadius: '16px',
              padding: '20px',
              minHeight: '220px',
              transition: 'all 0.4s ease',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 255, 135, 0.15), 0 0 40px rgba(74, 227, 247, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(0, 255, 135, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)';
            }}>
              {/* FSI Score Badge */}
              <div className="absolute top-4 right-4 flex flex-col items-center" style={{
                background: 'linear-gradient(135deg, #00FF87 0%, #4AE3F7 100%)',
                borderRadius: '12px',
                padding: '6px 10px',
                color: '#000',
                boxShadow: '0 4px 12px rgba(0, 255, 135, 0.4)',
                minWidth: '60px'
              }}>
                <div className="text-xs font-bold uppercase tracking-wider leading-tight">FSI</div>
                <div className="text-lg font-black leading-none">{fund.fsiScores.overallScore.toFixed(1)}</div>
              </div>

              {/* World-Class Header Section */}
              <div className="relative mb-6">
                {/* Fund Title & Category */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-white mb-2 tracking-tight leading-tight group-hover:text-cyan-300 transition-all duration-300">
                      {fund.name}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <div className="px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{
                        background: 'linear-gradient(135deg, rgba(74, 227, 247, 0.15) 0%, rgba(0, 255, 135, 0.15) 100%)',
                        border: '1px solid rgba(74, 227, 247, 0.3)',
                        color: '#4AE3F7'
                      }}>
                        {fund.category}
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400 text-sm">{getRatingStars(fund.rating)}</span>
                        <span className="text-xs text-gray-400 ml-1">{fund.rating}/5</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium NAV Display */}
                <div className="relative p-4 rounded-xl mb-4" style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
                  border: '1px solid rgba(0, 255, 135, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Net Asset Value</div>
                      <div className="text-2xl font-black text-white" style={{ 
                        fontFamily: 'ui-monospace, "SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", "Courier New", monospace',
                        letterSpacing: '-0.02em'
                      }}>
                        {fund.nav}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Risk Profile</div>
                      <div className={`text-sm font-black uppercase tracking-wider ${getRiskColor(fund.riskLevel)}`}>
                        {fund.riskLevel}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Institutional FSI Analytics Dashboard */}
              <div className="relative mb-4">
                {/* FSI Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: 'FSI Risk Analysis', value: fund.fsiScores.riskAnalysis, icon: '🛡️' },
                    { label: 'FSI Performance Stability', value: fund.fsiScores.performanceStability, icon: '📈' },
                    { label: 'FSI Market Timing', value: fund.fsiScores.marketTiming, icon: '⏰' },
                    { label: 'FSI Portfolio Optimization', value: fund.fsiScores.portfolioOptimization, icon: '🎯' }
                  ].map((metric, idx) => (
                    <div key={idx} className="relative p-3 rounded-lg" style={{
                      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(30, 41, 59, 0.4) 100%)',
                      border: '1px solid rgba(100, 116, 139, 0.2)'
                    }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">{metric.label}</span>
                        <span className="text-xs opacity-60">{metric.icon}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-lg font-black text-green-400" style={{ fontFamily: 'monospace' }}>
                          {metric.value.toFixed(1)}
                        </div>
                        <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-cyan-400 rounded-full transition-all duration-1000" 
                               style={{ width: `${metric.value}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Performance Timeline */}
                <div className="p-3 rounded-lg" style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(15, 23, 42, 0.5) 100%)',
                  border: '1px solid rgba(0, 255, 135, 0.15)'
                }}>
                  <div className="text-xs text-cyan-300 uppercase tracking-wider font-bold mb-2">Historical Performance</div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { period: '1Y', return: fund.returns1Y },
                      { period: '3Y', return: fund.returns3Y },
                      { period: '5Y', return: fund.returns5Y }
                    ].map((perf, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{perf.period} CAGR</div>
                        <div className="text-lg font-black text-green-400" style={{ fontFamily: 'monospace' }}>
                          {perf.return}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Premium Fund Fundamentals */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative p-3 rounded-lg" style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(30, 41, 59, 0.6) 100%)',
                  border: '1px solid rgba(0, 255, 135, 0.1)',
                  backdropFilter: 'blur(8px)'
                }}>
                  <div className="text-xs text-cyan-300 uppercase tracking-wider font-bold mb-1">Assets Under Management</div>
                  <div className="text-lg font-black text-white" style={{ 
                    fontFamily: 'ui-monospace, "SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", "Courier New", monospace' 
                  }}>
                    {fund.aum}
                  </div>
                </div>
                <div className="relative p-3 rounded-lg" style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(30, 41, 59, 0.6) 100%)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  backdropFilter: 'blur(8px)'
                }}>
                  <div className="text-xs text-red-300 uppercase tracking-wider font-bold mb-1">Expense Ratio</div>
                  <div className="text-lg font-black text-red-400" style={{ 
                    fontFamily: 'ui-monospace, "SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", "Courier New", monospace' 
                  }}>
                    {fund.expenseRatio}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* World-Class Platform Comparison */}
        <div className="relative mb-20" style={{
          background: 'linear-gradient(135deg, rgba(13, 15, 26, 0.98) 0%, rgba(17, 24, 39, 0.95) 100%)',
          border: '1px solid rgba(0, 255, 135, 0.15)',
          borderRadius: '32px',
          padding: '56px 40px',
          backdropFilter: 'blur(24px) saturate(180%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.02)'
        }}>
          {/* Section Header */}
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-2xl" style={{
                  filter: 'drop-shadow(0 0 12px rgba(0, 255, 135, 0.6))'
                }}>👑</span>
                <h3 className="text-sm font-bold uppercase tracking-wider" style={{
                  background: 'linear-gradient(135deg, #00FF87 0%, #4AE3F7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '0.15em'
                }}>Platform Superiority</h3>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center" style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #00FF87 50%, #4AE3F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Inter, system-ui, sans-serif',
              textShadow: '0 0 40px rgba(0, 255, 135, 0.3)',
              lineHeight: '1.1'
            }}>Why SIP Brewery Dominates India's Mutual Fund Landscape</h2>
            
            <div className="w-full flex justify-center">
              <div className="max-w-4xl">
                <p className="text-lg text-gray-300 leading-relaxed" style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  textAlign: 'center',
                  margin: '0 auto',
                  width: '100%'
                }}>
                A comprehensive comparison with India's largest mutual fund distributors, showcasing our{' '}
                <span className="font-semibold" style={{
                  background: 'linear-gradient(135deg, #00FF87 0%, #4AE3F7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>FSI-powered technological supremacy</span>{' '}
                and{' '}
                <span className="font-semibold" style={{
                  background: 'linear-gradient(135deg, #00FF87 0%, #4AE3F7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>zero-commission transparency</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="relative overflow-hidden rounded-3xl" style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(13, 15, 26, 0.8) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(16px) saturate(180%)',
            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}>
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-6 p-8" style={{
              background: 'linear-gradient(135deg, rgba(0, 255, 135, 0.06) 0%, rgba(74, 227, 247, 0.06) 100%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div className="flex items-center justify-center text-center">
                <div className="text-sm font-bold uppercase tracking-wider" style={{
                  color: '#E0E0E0',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>Feature</div>
              </div>
              <div className="flex items-center justify-center text-center relative" style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 135, 0.1) 0%, rgba(74, 227, 247, 0.1) 100%)',
                borderRadius: '12px',
                padding: '8px 4px',
                border: '1px solid rgba(0, 255, 135, 0.2)'
              }}>
                <div className="text-sm font-bold uppercase tracking-wider" style={{
                  background: 'linear-gradient(135deg, #00FF87 0%, #4AE3F7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>SIP Brewery</div>
              </div>
              <div className="flex items-center justify-center text-center">
                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider" style={{
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>Zerodha Coin</div>
              </div>
              <div className="flex items-center justify-center text-center">
                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider" style={{
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>Groww</div>
              </div>
              <div className="flex items-center justify-center text-center">
                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider" style={{
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>Paytm Money</div>
              </div>
              <div className="flex items-center justify-center text-center">
                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider" style={{
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>ET Money</div>
              </div>
            </div>

            {/* Comparison Rows */}
            {[
              {
                feature: '🤖 FSI-Powered Fund Research',
                icon: '🧠',
                sipBrewery: { status: 'available', text: 'Advanced AI analysis with 95%+ accuracy' },
                competitors: [
                  { status: 'limited', text: 'Basic fund information' },
                  { status: 'limited', text: 'Popularity-driven listing' },
                  { status: 'not-available', text: 'Mostly AMC-provided data' },
                  { status: 'limited', text: 'Limited insights' }
                ]
              },
              {
                feature: '📊 Real-Time FSI Analytics',
                icon: '⚡',
                sipBrewery: { status: 'available', text: 'Live market analysis & predictions' },
                competitors: [
                  { status: 'not-available', text: 'No real-time analytics' },
                  { status: 'limited', text: 'Basic performance charts' },
                  { status: 'not-available', text: 'Static fund data' },
                  { status: 'limited', text: 'Limited market insights' }
                ]
              },
              {
                feature: '🛡️ Commission Transparency',
                icon: '💎',
                sipBrewery: { status: 'available', text: 'Zero hidden fees, 100% transparent' },
                competitors: [
                  { status: 'available', text: 'Direct plans, no commission' },
                  { status: 'limited', text: 'Trail commission hidden' },
                  { status: 'not-available', text: 'Not clearly visible' },
                  { status: 'limited', text: 'Fragmented disclosure' }
                ]
              },
              {
                feature: '🎯 Personalized SIP Guidance',
                icon: '🎲',
                sipBrewery: { status: 'available', text: 'FSI-matched to goals, age, risk profile' },
                competitors: [
                  { status: 'not-available', text: 'Self-research required' },
                  { status: 'limited', text: 'Basic risk profiling' },
                  { status: 'limited', text: 'Generic recommendations' },
                  { status: 'limited', text: 'Limited personalization' }
                ]
              },
              {
                feature: '💬 Human Expert Support',
                icon: '👥',
                sipBrewery: { status: 'available', text: 'Chat + certified advisors 24/7' },
                competitors: [
                  { status: 'not-available', text: 'No dedicated MF support' },
                  { status: 'limited', text: 'App-only help' },
                  { status: 'limited', text: 'Limited customer care' },
                  { status: 'limited', text: 'Basic support only' }
                ]
              },
              {
                feature: '📈 Advanced Portfolio Analytics',
                icon: '🔬',
                sipBrewery: { status: 'available', text: 'FSI health score, rebalancing alerts' },
                competitors: [
                  { status: 'limited', text: 'Basic portfolio view' },
                  { status: 'limited', text: 'Performance tracking only' },
                  { status: 'not-available', text: 'Fragmented portfolio view' },
                  { status: 'limited', text: 'Limited analytics' }
                ]
              },
              {
                feature: '🌐 Investment Community',
                icon: '🤝',
                sipBrewery: { status: 'available', text: 'Expert discussions & success stories' },
                competitors: [
                  { status: 'not-available', text: 'No community features' },
                  { status: 'not-available', text: 'No investor community' },
                  { status: 'not-available', text: 'No community platform' },
                  { status: 'limited', text: 'Basic user reviews' }
                ]
              },
              {
                feature: '💰 Tax Optimization',
                icon: '🧮',
                sipBrewery: { status: 'available', text: 'FSI-powered tax harvesting' },
                competitors: [
                  { status: 'limited', text: 'Basic tax reports' },
                  { status: 'limited', text: 'Capital gains tracking' },
                  { status: 'not-available', text: 'No tax optimization' },
                  { status: 'limited', text: 'Basic tax statements' }
                ]
              }
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-6 gap-6 p-6 transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-800/10 hover:to-gray-700/10" style={{
                borderBottom: idx < 7 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                background: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                minHeight: '80px'
              }}>
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-lg" style={{
                    filter: 'drop-shadow(0 0 8px rgba(0, 255, 135, 0.3))'
                  }}>{row.icon}</span>
                  <span className="text-sm font-semibold text-center" style={{
                    color: '#E0E0E0',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>{row.feature}</span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative" style={{
                    background: 'linear-gradient(135deg, rgba(0, 255, 135, 0.05) 0%, rgba(74, 227, 247, 0.05) 100%)',
                    borderRadius: '12px',
                    padding: '12px 8px',
                    border: '1px solid rgba(0, 255, 135, 0.15)',
                    width: '100%'
                  }}>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="flex items-center justify-center w-4 h-4 rounded-full" style={{
                        background: 'linear-gradient(135deg, #00FF87 0%, #4AE3F7 100%)',
                        boxShadow: '0 0 12px rgba(0, 255, 135, 0.4)'
                      }}>
                        <span className="text-xs text-black font-bold">✓</span>
                      </div>
                      <span className="text-xs font-medium text-center" style={{
                        background: 'linear-gradient(135deg, #00FF87 0%, #4AE3F7 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontFamily: 'Inter, system-ui, sans-serif'
                      }}>{row.sipBrewery.text}</span>
                    </div>
                  </div>
                </div>
                {row.competitors.map((comp, compIdx) => (
                  <div key={compIdx} className="flex items-center justify-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="flex items-center justify-center w-4 h-4 rounded-full" style={{
                        background: comp.status === 'available' ? '#00FF87' :
                                   comp.status === 'limited' ? '#FFC857' : '#FF4F61',
                        boxShadow: comp.status === 'available' ? '0 0 8px rgba(0, 255, 135, 0.4)' :
                                  comp.status === 'limited' ? '0 0 8px rgba(255, 200, 87, 0.4)' : '0 0 8px rgba(255, 79, 97, 0.4)'
                      }}>
                        <span className="text-xs text-black font-bold">
                          {comp.status === 'available' ? '✓' : comp.status === 'limited' ? '⚠' : '✗'}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-center" style={{
                        color: comp.status === 'available' ? '#00FF87' :
                               comp.status === 'limited' ? '#FFC857' : '#FF4F61',
                        fontFamily: 'Inter, system-ui, sans-serif'
                      }}>{comp.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

            {/* Premium Legend */}
            <div className="flex justify-center" style={{ marginTop: 'calc(1.5rem + 2mm)' }}>
              <div className="flex items-center px-16 py-4 rounded-2xl" style={{
                gap: '4rem',
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(13, 15, 26, 0.6) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full" style={{
                    background: 'linear-gradient(135deg, #00FF87 0%, #4AE3F7 100%)',
                    boxShadow: '0 0 12px rgba(0, 255, 135, 0.4)'
                  }}>
                    <span className="text-xs text-black font-bold">✓</span>
                  </div>
                  <span className="text-sm font-medium" style={{
                    color: '#00FF87',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>Superior/Available</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full" style={{
                    background: '#FFC857',
                    boxShadow: '0 0 12px rgba(255, 200, 87, 0.4)'
                  }}>
                    <span className="text-xs text-black font-bold">⚠</span>
                  </div>
                  <span className="text-sm font-medium" style={{
                    color: '#FFC857',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>Limited/Basic</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full" style={{
                    background: '#FF4F61',
                    boxShadow: '0 0 12px rgba(255, 79, 97, 0.4)'
                  }}>
                    <span className="text-xs text-black font-bold">✗</span>
                  </div>
                  <span className="text-sm font-medium" style={{
                    color: '#FF4F61',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>Not Available</span>
                </div>
              </div>
            </div>

          {/* Bottom CTA */}
          <div className="text-center" style={{ marginTop: '2mm' }}>
            <p className="text-lg text-gray-300 mb-6">
              <span className="text-cyan-400 font-bold">Experience the difference</span> with India's most advanced 
              FSI-powered mutual fund platform
            </p>
            <button className="px-8 py-4 rounded-xl font-bold text-black transition-all duration-300 hover:scale-105" style={{
              background: 'linear-gradient(135deg, #00FF87 0%, #4AE3F7 100%)',
              boxShadow: '0 8px 25px rgba(0, 255, 135, 0.3)'
            }}>
              Start Your FSI-Powered Investment Journey
            </button>
          </div>

          {/* 4mm Spacer */}
          <div style={{ height: '15px', width: '100%' }}></div>

          {/* Disclaimer Note */}
          <p className="text-xs text-gray-400 text-center mt-6">
            *This comparison is based on publicly available information as of January 2024. 
            All trademarks belong to their respective owners. SIP Brewery offers only regular plans.
            <br />
            <strong>Sources:</strong> Company websites, platform FAQs, public SEBI disclosures
          </p>
        </div>

        {/* SEBI/AMFI Disclaimer */}
        <div className="relative" style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(220, 38, 38, 0.08) 100%)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400 text-sm font-bold">!</span>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-red-400 font-semibold mb-3">Important Disclaimers</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  <strong className="text-red-300">SEBI Disclaimer:</strong> Mutual Fund investments are subject to market risks. 
                  Please read all scheme related documents carefully before investing. Past performance is not indicative of future results.
                </p>
                <p>
                  <strong className="text-red-300">AMFI Registration:</strong> SIP Brewery is registered with AMFI as a distributor 
                  (ARN: XXXXX). This analysis is for informational purposes only and should not be considered as investment advice.
                </p>
                <p>
                  <strong className="text-red-300">FSI Analysis:</strong> The recommendations are generated by our Financial Super Intelligence 
                  algorithm based on historical data, market trends, and risk factors. Individual suitability may vary.
                </p>
                <p className="text-xs text-gray-400 mt-3">
                  Please consult with a qualified financial advisor before making investment decisions. 
                  SIP Brewery does not guarantee returns and is not liable for any investment losses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// World-Class Professional Footer Component
const ProfessionalFooter = React.memo(() => {
  return (
    <footer className="relative" style={{
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)',
      borderTop: '1px solid rgba(100, 116, 139, 0.3)',
      backdropFilter: 'blur(20px)'
    }}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6" style={{ paddingTop: 'calc(3rem + 2mm)', paddingBottom: '3rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-black text-white mb-2" style={{
                background: 'linear-gradient(135deg, #00FF87 0%, #4AE3F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                SIP Brewery
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                India's trusted AMFI-registered mutual fund distributor offering regular mutual 
                funds with professional advisory.
              </p>
            </div>
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: '📘', label: 'Facebook' },
                { icon: '🐦', label: 'Twitter' },
                { icon: '💼', label: 'LinkedIn' },
                { icon: '📷', label: 'Instagram' }
              ].map((social, idx) => (
                <div key={idx} className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110" style={{
                  background: 'linear-gradient(135deg, rgba(0, 255, 135, 0.1) 0%, rgba(74, 227, 247, 0.1) 100%)',
                  border: '1px solid rgba(100, 116, 139, 0.3)'
                }}>
                  <span className="text-sm">{social.icon}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                'About Us',
                'Mutual Funds',
                'Community',
                'Fund Comparison',
                'Blog'
              ].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {[
                'Terms of Service',
                'Privacy Policy',
                'Risk Disclosure',
                'Grievance Redressal',
                'SEBI Complaints'
              ].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1mm' }}>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-cyan-400/20" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}>
                  <span className="text-xs text-cyan-400" style={{
                    lineHeight: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>📧</span>
                </div>
                <span className="text-sm text-gray-300">hello@sipbrewery.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-green-400/20" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}>
                  <span className="text-xs text-green-400" style={{
                    lineHeight: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>📞</span>
                </div>
                <span className="text-sm text-gray-300">+91 7760097030</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-blue-400/20" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}>
                  <span className="text-xs text-blue-400" style={{
                    lineHeight: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>📍</span>
                </div>
                <span className="text-sm text-gray-300">Hyderabad, India</span>
              </div>
            </div>
            <button className="px-4 py-2 rounded-lg text-sm font-bold text-black transition-all duration-300 hover:scale-105" style={{
              background: 'linear-gradient(135deg, #00FF87 0%, #4AE3F7 100%)',
              marginTop: 'calc(1mm + 1.5mm)'
            }}>
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Regulatory Compliance Section */}
      <div className="border-t border-gray-700/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* AMFI Registration */}
            <div className="text-center p-4 rounded-xl" style={{
              background: 'linear-gradient(135deg, rgba(0, 255, 135, 0.05) 0%, rgba(74, 227, 247, 0.05) 100%)',
              border: '1px solid rgba(0, 255, 135, 0.2)'
            }}>
              <div className="mb-4" style={{
                fontSize: '48px'
              }}>
                🛡️
              </div>
              <h5 className="text-sm font-bold text-cyan-300 mb-2">AMFI Registered</h5>
              <p className="text-xs text-gray-400">
                Mutual Fund Distributor registered with Association of Mutual Funds in India
              </p>
            </div>

            {/* Distribution Services */}
            <div className="text-center p-4 rounded-xl" style={{
              background: 'linear-gradient(135deg, rgba(74, 227, 247, 0.05) 0%, rgba(0, 255, 135, 0.05) 100%)',
              border: '1px solid rgba(74, 227, 247, 0.2)'
            }}>
              <div className="mb-4" style={{
                fontSize: '48px'
              }}>
                📊
              </div>
              <h5 className="text-sm font-bold text-cyan-300 mb-2">Distribution Services</h5>
              <p className="text-xs text-gray-400">
                We provide mutual fund distribution services and earn commission from fund houses
              </p>
            </div>

            {/* Risk Disclosure */}
            <div className="text-center p-4 rounded-xl" style={{
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(220, 38, 38, 0.05) 100%)',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}>
              <div className="mb-4" style={{
                fontSize: '48px'
              }}>
                ⚠️
              </div>
              <h5 className="text-sm font-bold text-red-300 mb-2">Risk Disclosure</h5>
              <p className="text-xs text-gray-400">
                Mutual funds are subject to market risks. Read all documents carefully
              </p>
            </div>
          </div>

          {/* Important Disclaimer */}
          <div className="bg-gray-800/30 rounded-xl p-6 mb-6">
            <p className="text-xs text-gray-400 leading-relaxed text-center">
              <strong>Important:</strong> Past performance is not indicative of future returns. Mutual fund investments are subject to market risks, read all scheme related documents 
              carefully. The NAVs of the schemes may go up or down depending upon the factors and forces affecting the securities market including the fluctuations in the 
              interest rates. The past performance of the mutual funds is not necessarily indicative of future performance of the schemes. We are AMFI registered mutual 
              fund distributor. We may earn commission when you invest through our platform. The information provided on this website should not be considered as investment advice.
            </p>
          </div>

          {/* Company Registration */}
          <div className="text-center border-t border-gray-700/30 pt-6">
            <p className="text-xs text-gray-400 mb-2">
              "SIP Brewery" is a trademark of <strong className="text-cyan-400">Equisculpt Ventures Pvt. Ltd.</strong> | 
              Equisculpt Ventures Pvt. Ltd. is an AMFI Registered Mutual Fund Distributor | 
              We may earn commission when you invest through our platform
            </p>
            <p className="text-xs text-gray-500">
              © 2025 SIP Brewery. All rights reserved. | Powered by <strong className="text-cyan-400">Equisculpt Ventures Pvt. Ltd.</strong>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

// World-Class Premium Fixed Bottom Ticker Component - Memoized for performance
const PremiumFixedTicker = React.memo(() => {
  // Static market data with enhanced structure
  const marketData = [
    { name: 'NIFTY 50', value: '22,967.65', change: '+145.23', changePercent: '+0.64%', isPositive: true },
    { name: 'SENSEX', value: '75,418.04', change: '+486.50', changePercent: '+0.65%', isPositive: true },
    { name: 'BANK NIFTY', value: '49,856.30', change: '-125.45', changePercent: '-0.25%', isPositive: false },
    { name: 'NIFTY IT', value: '43,210.85', change: '+234.67', changePercent: '+0.55%', isPositive: true },
    { name: 'NIFTY PHARMA', value: '22,145.90', change: '-89.12', changePercent: '-0.40%', isPositive: false },
    { name: 'NIFTY AUTO', value: '25,340.20', change: '+180.45', changePercent: '+0.72%', isPositive: true }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 overflow-hidden" style={{
      background: 'linear-gradient(135deg, rgba(13, 15, 26, 0.95) 0%, rgba(17, 24, 39, 0.98) 50%, rgba(30, 41, 59, 0.95) 100%)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(100, 116, 139, 0.2)',
      boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.3)',
      height: '36px'
    }}>
      {/* Seamless ticker with exact duplication */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        padding: '0.25rem 0',
        height: '100%',
        animation: 'seamlessTickerScroll 25s linear infinite'
      }}>
        {/* Create ticker content once */}
        {(() => {
          const tickerContent = (
            <>
              {/* Time Display */}
              <div className="flex items-center space-x-1 px-2 mx-3 rounded" style={{
                background: 'rgba(57, 255, 20, 0.06)',
                border: '1px solid rgba(57, 255, 20, 0.1)'
              }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{
                  background: '#39ff14',
                  boxShadow: '0 0 4px rgba(57, 255, 20, 0.6)'
                }}></div>
                <span className="text-green-300 font-medium text-xs">LIVE</span>
                <span className="text-white text-xs font-mono">9:15</span>
              </div>
              
              {/* Market Data */}
              {marketData.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="ticker-beer-mug">🍺</div>
                  <div className="ticker-item">
                    <span className="ticker-name">{item.name}</span>
                    <span className="ticker-value">{item.value}</span>
                    <span className={`ticker-change ${item.isPositive ? 'ticker-positive' : 'ticker-negative'}`}>
                      {item.change}
                    </span>
                    <span className={`ticker-percent ${item.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                      {item.changePercent}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </>
          );
          
          return (
            <>
              {/* First copy */}
              <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {tickerContent}
              </div>
              {/* Second copy - exact duplicate */}
              <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {tickerContent}
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
});

// Premium Background Animation Component
const PremiumBackgroundAnimations = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Multi-layer Gradient Background */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(circle at 20% 30%, rgba(57, 255, 20, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(0, 249, 255, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 70% 20%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
          linear-gradient(135deg, #000000 0%, #001122 50%, #002244 100%)
        `
      }}></div>
      
      {/* Floating Premium Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-30 animate-pulse" style={{
        background: 'radial-gradient(circle, rgba(57, 255, 20, 0.3) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'float 12s ease-in-out infinite'
      }}></div>
      <div className="absolute bottom-32 right-32 w-80 h-80 rounded-full opacity-25 animate-pulse" style={{
        background: 'radial-gradient(circle, rgba(0, 249, 255, 0.3) 0%, transparent 70%)',
        filter: 'blur(50px)',
        animation: 'float 15s ease-in-out infinite reverse',
        animationDelay: '2s'
      }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20" style={{
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'float 10s ease-in-out infinite',
        animationDelay: '4s'
      }}></div>
      
      {/* Static Premium Particle System */}
      {[
        {left: 10, top: 20, delay: 0},
        {left: 25, top: 15, delay: 1},
        {left: 40, top: 30, delay: 2},
        {left: 60, top: 10, delay: 0.5},
        {left: 75, top: 25, delay: 1.5},
        {left: 90, top: 35, delay: 2.5},
        {left: 15, top: 50, delay: 3},
        {left: 35, top: 60, delay: 1.2},
        {left: 55, top: 45, delay: 2.2},
        {left: 80, top: 55, delay: 0.8},
        {left: 20, top: 80, delay: 1.8},
        {left: 45, top: 85, delay: 2.8},
        {left: 70, top: 75, delay: 0.3},
        {left: 85, top: 90, delay: 1.3}
      ].map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: '2px',
            height: '2px',
            background: 'radial-gradient(circle, rgba(57, 255, 20, 0.8) 0%, transparent 70%)',
            boxShadow: '0 0 6px rgba(57, 255, 20, 0.6)',
            animation: `twinkle 5s ease-in-out infinite ${particle.delay}s`
          }}
        />
      ))}
      
      {/* Static Neural Network Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#39ff14" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#00f9ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" />
        <line x1="40%" y1="10%" x2="60%" y2="30%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" />
        <line x1="70%" y1="25%" x2="90%" y2="45%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" />
        <line x1="15%" y1="60%" x2="35%" y2="80%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" />
        <line x1="50%" y1="70%" x2="70%" y2="90%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" />
        <line x1="80%" y1="15%" x2="95%" y2="35%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" />
      </svg>
    </div>
  );
};

// Lightweight Neural Network for Features Section
const LightweightNeuralNetwork = () => {
  const [nodes, setNodes] = useState<Array<{x: number, y: number, vx: number, vy: number, id: number}>>([]);
  const [connections, setConnections] = useState<Array<{from: number, to: number, opacity: number}>>([]);
  
  useEffect(() => {
    // Only 8 nodes for features section - much lighter
    const staticPositions = [
      {x: 20, y: 25, vx: 0.15, vy: 0.1}, {x: 80, y: 30, vx: -0.1, vy: 0.15}, 
      {x: 35, y: 45, vx: 0.1, vy: -0.1}, {x: 65, y: 40, vx: -0.15, vy: 0.1},
      {x: 25, y: 70, vx: 0.15, vy: -0.1}, {x: 75, y: 75, vx: -0.1, vy: -0.15},
      {x: 50, y: 20, vx: 0.1, vy: 0.1}, {x: 50, y: 80, vx: -0.1, vy: -0.1}
    ];
    
    const initialNodes = staticPositions.map((pos, i) => ({
      x: pos.x, y: pos.y, vx: pos.vx, vy: pos.vy, id: i
    }));
    setNodes(initialNodes);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prevNodes => {
        const newNodes = prevNodes.map(node => {
          let newX = node.x + node.vx;
          let newY = node.y + node.vy;
          let newVx = node.vx;
          let newVy = node.vy;
          
          if (newX <= 5 || newX >= 95) {
            newVx = -newVx;
            newX = Math.max(5, Math.min(95, newX));
          }
          if (newY <= 10 || newY >= 90) {
            newVy = -newVy;
            newY = Math.max(10, Math.min(90, newY));
          }
          
          return { ...node, x: newX, y: newY, vx: newVx, vy: newVy };
        });
        
        // Simple connections for lightweight version
        const newConnections: Array<{from: number, to: number, opacity: number}> = [];
        for (let i = 0; i < newNodes.length; i++) {
          for (let j = i + 1; j < newNodes.length; j++) {
            const dx = newNodes[i].x - newNodes[j].x;
            const dy = newNodes[i].y - newNodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 30 && newConnections.length < 6) { // Max 6 connections
              newConnections.push({
                from: i, to: j,
                opacity: Math.max(0.2, 1 - distance / 30)
              });
            }
          }
        }
        
        setConnections(newConnections);
        return newNodes;
      });
    }, 120); // Slower updates for better performance
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.4 }}>
        <defs>
          <linearGradient id="lightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {connections.map((conn, index) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          if (!fromNode || !toNode) return null;
          
          return (
            <line
              key={`${conn.from}-${conn.to}`}
              x1={`${fromNode.x}%`} y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`} y2={`${toNode.y}%`}
              stroke="url(#lightGradient)" strokeWidth="1"
              opacity={conn.opacity}
            />
          );
        })}
      </svg>
      
      {nodes.map((node, i) => (
        <div
          key={`light-node-${node.id}`}
          className="absolute rounded-full"
          style={{
            left: `${node.x}%`, top: `${node.y}%`,
            width: '4px', height: '4px',
            background: i % 2 === 0 ? '#10b981' : '#3b82f6',
            boxShadow: `0 0 10px ${i % 2 === 0 ? '#10b981' : '#3b82f6'}`,
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.12s linear, top 0.12s linear'
          }}
        />
      ))}
    </>
  );
};

// Static Neural Network Component - Memory Optimized
const StaticNeuralNetwork = () => {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="staticLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#39ff14" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#00f9ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* Static lines with CSS animations */}
      <line x1="15%" y1="20%" x2="30%" y2="40%" stroke="url(#staticLineGradient)" strokeWidth="1" className="animate-pulse" />
      <line x1="85%" y1="25%" x2="70%" y2="35%" stroke="url(#staticLineGradient)" strokeWidth="1" className="animate-pulse" />
      <line x1="50%" y1="60%" x2="20%" y2="75%" stroke="url(#staticLineGradient)" strokeWidth="1" className="animate-pulse" />
      <line x1="80%" y1="80%" x2="40%" y2="15%" stroke="url(#staticLineGradient)" strokeWidth="1" className="animate-pulse" />
      <line x1="60%" y1="90%" x2="10%" y2="50%" stroke="url(#staticLineGradient)" strokeWidth="1" className="animate-pulse" />
      <line x1="90%" y1="45%" x2="25%" y2="65%" stroke="url(#staticLineGradient)" strokeWidth="1" className="animate-pulse" />
      
      {/* Static nodes */}
      <circle cx="15%" cy="20%" r="3" fill="#10b981" className="animate-pulse" />
      <circle cx="85%" cy="25%" r="3" fill="#3b82f6" className="animate-pulse" />
      <circle cx="30%" cy="40%" r="3" fill="#8b5cf6" className="animate-pulse" />
      <circle cx="70%" cy="35%" r="3" fill="#10b981" className="animate-pulse" />
      <circle cx="50%" cy="60%" r="3" fill="#3b82f6" className="animate-pulse" />
      <circle cx="20%" cy="75%" r="3" fill="#8b5cf6" className="animate-pulse" />
    </svg>
  );
};

// Dynamic Neural Network Component
const DynamicNeuralNetwork = () => {
  const [nodes, setNodes] = useState<Array<{x: number, y: number, vx: number, vy: number, id: number}>>([]);
  const [connections, setConnections] = useState<Array<{from: number, to: number, opacity: number}>>([]);
  
  useEffect(() => {
    // Optimized 40 nodes with memory-efficient patterns
    const staticPositions = [
      {x: 15, y: 20, vx: 0.2, vy: 0.1}, {x: 85, y: 25, vx: -0.1, vy: 0.2}, {x: 30, y: 40, vx: 0.1, vy: -0.1},
      {x: 70, y: 35, vx: -0.2, vy: 0.1}, {x: 50, y: 60, vx: 0.1, vy: 0.2}, {x: 20, y: 75, vx: 0.2, vy: -0.1},
      {x: 80, y: 80, vx: -0.1, vy: -0.2}, {x: 40, y: 15, vx: 0.1, vy: 0.1}, {x: 60, y: 90, vx: -0.2, vy: 0.1},
      {x: 10, y: 50, vx: 0.2, vy: -0.1}, {x: 90, y: 45, vx: -0.1, vy: 0.2}, {x: 25, y: 65, vx: 0.1, vy: -0.2},
      {x: 75, y: 20, vx: -0.2, vy: 0.1}, {x: 35, y: 85, vx: 0.1, vy: 0.1}, {x: 65, y: 10, vx: -0.1, vy: 0.2},
      {x: 45, y: 30, vx: 0.2, vy: -0.1}, {x: 55, y: 70, vx: -0.1, vy: -0.1}, {x: 12, y: 35, vx: 0.1, vy: 0.2},
      {x: 88, y: 55, vx: -0.2, vy: -0.1}, {x: 32, y: 25, vx: 0.1, vy: 0.1}, {x: 68, y: 75, vx: -0.1, vy: 0.2},
      {x: 18, y: 60, vx: 0.2, vy: -0.2}, {x: 82, y: 40, vx: -0.1, vy: 0.1}, {x: 38, y: 80, vx: 0.1, vy: -0.1},
      {x: 62, y: 15, vx: -0.2, vy: 0.2}, {x: 28, y: 55, vx: 0.1, vy: -0.1}, {x: 72, y: 65, vx: -0.1, vy: 0.1},
      {x: 48, y: 25, vx: 0.2, vy: 0.2}, {x: 52, y: 45, vx: -0.1, vy: -0.1}, {x: 22, y: 30, vx: 0.1, vy: 0.1},
      {x: 78, y: 50, vx: -0.2, vy: 0.1}, {x: 42, y: 70, vx: 0.1, vy: -0.2}, {x: 58, y: 35, vx: -0.1, vy: 0.2},
      {x: 33, y: 60, vx: 0.2, vy: -0.1}, {x: 67, y: 30, vx: -0.1, vy: 0.1}, {x: 15, y: 85, vx: 0.1, vy: -0.1},
      {x: 85, y: 15, vx: -0.2, vy: 0.2}, {x: 25, y: 45, vx: 0.1, vy: 0.1}, {x: 75, y: 85, vx: -0.1, vy: -0.1},
      {x: 50, y: 25, vx: 0.2, vy: 0.1}, {x: 95, y: 70, vx: -0.1, vy: -0.2}, {x: 5, y: 40, vx: 0.1, vy: 0.2}
    ];
    
    const initialNodes = staticPositions.map((pos, i) => ({
      x: pos.x,
      y: pos.y,
      vx: pos.vx,
      vy: pos.vy,
      id: i
    }));
    setNodes(initialNodes);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prevNodes => {
        const newNodes = prevNodes.map(node => {
          let newX = node.x + node.vx;
          let newY = node.y + node.vy;
          let newVx = node.vx;
          let newVy = node.vy;
          
          // Bounce off edges
          if (newX <= 2 || newX >= 98) {
            newVx = -newVx;
            newX = Math.max(2, Math.min(98, newX));
          }
          if (newY <= 5 || newY >= 95) {
            newVy = -newVy;
            newY = Math.max(5, Math.min(95, newY));
          }
          
          return { ...node, x: newX, y: newY, vx: newVx, vy: newVy };
        });
        
        // Calculate new connections with max 3-4 connections per dot
        const newConnections: Array<{from: number, to: number, opacity: number}> = [];
        const connectionCounts = new Array(newNodes.length).fill(0);
        
        // Create array of potential connections with distances
        const potentialConnections = [];
        for (let i = 0; i < newNodes.length; i++) {
          for (let j = i + 1; j < newNodes.length; j++) {
            const dx = newNodes[i].x - newNodes[j].x;
            const dy = newNodes[i].y - newNodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 25) {
              potentialConnections.push({
                from: i,
                to: j,
                distance: distance,
                opacity: Math.max(0.1, 1 - distance / 25)
              });
            }
          }
        }
        
        // Sort by distance (closest first) and limit connections per dot
        potentialConnections.sort((a, b) => a.distance - b.distance);
        
        for (const conn of potentialConnections) {
          const maxConnections = (conn.from + conn.to) % 2 === 0 ? 3 : 4; // Deterministic 3 or 4 max connections
          if (connectionCounts[conn.from] < maxConnections && connectionCounts[conn.to] < maxConnections) {
            newConnections.push({
              from: conn.from,
              to: conn.to,
              opacity: conn.opacity
            });
            connectionCounts[conn.from]++;
            connectionCounts[conn.to]++;
          }
        }
        
        setConnections(newConnections);
        return newNodes;
      });
    }, 80); // Update every 80ms for balanced performance and smooth animation
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      {/* SVG for dynamic connections */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.4, filter: 'blur(0.5px)' }}>
        <defs>
          <linearGradient id="dynamicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FF87" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#4AE3F7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        {connections.map((conn, index) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          if (!fromNode || !toNode) return null;
          
          return (
            <line
              key={`${conn.from}-${conn.to}`}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke="url(#dynamicGradient)"
              strokeWidth="1"
              opacity={conn.opacity}
              style={{
                transition: 'opacity 0.3s ease'
              }}
            />
          );
        })}
      </svg>
      
      {/* Dynamic neural nodes */}
      {nodes.map((node, i) => (
        <div
          key={`dynamic-node-${node.id}`}
          className="absolute rounded-full"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: '6px',
            height: '6px',
            background: i % 3 === 0 ? '#00FF87' : i % 3 === 1 ? '#4AE3F7' : i % 3 === 2 ? '#60a5fa' : '#06b6d4',
            boxShadow: `0 0 10px ${i % 3 === 0 ? 'rgba(0, 255, 135, 0.4)' : i % 3 === 1 ? 'rgba(74, 227, 247, 0.4)' : i % 3 === 2 ? 'rgba(96, 165, 250, 0.4)' : 'rgba(6, 182, 212, 0.4)'}`,
            animation: `softPulse ${3 + (i % 3)}s ease-in-out infinite`,
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.05s linear, top 0.05s linear',
            zIndex: 10
          }}
        />
      ))}
    </>
  );
};

// ASI Neural Network Hero Section - Exact Match with Proper Animations
const ASINeuralHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 pt-32 pb-20 overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0D0F1A 0%, #111827 50%, #1e293b 100%)'
    }}>
      {/* Static Neural Network - Memory Optimized */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Optimized Dynamic Neural Network */}
        <DynamicNeuralNetwork />
        
        {/* Minimal Background Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(57, 255, 20, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(57, 255, 20, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '150px 150px',
          opacity: 0.3
        }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main Title - Premium Enhanced */}
        <h1 className="text-7xl md:text-8xl font-black mb-6" style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          background: 'linear-gradient(90deg, #00FF87 0%, #4AE3F7 50%, #00FF87 100%)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 8px rgba(0, 255, 135, 0.3))',
          letterSpacing: '-0.02em'
        }}>
          SIPBrewery
        </h1>
        
        {/* Rocket + Tagline */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="text-2xl" style={{
            animation: 'float 3s ease-in-out infinite',
            filter: 'drop-shadow(0 0 4px rgba(0, 255, 135, 0.4))'
          }}>🚀</div>
          <p className="text-xl md:text-2xl font-light text-slate-200" style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            letterSpacing: '0.01em'
          }}>
            The Future of Investing is <span className="font-semibold" style={{
              background: 'linear-gradient(90deg, #00FF87 0%, #4AE3F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 4px rgba(0, 255, 135, 0.4))'
            }}>Smart SIP</span>
          </p>
        </div>
        
        {/* Description */}
        <div className="mb-16 max-w-4xl mx-auto">
          <p className="text-lg text-slate-300 leading-relaxed" style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            lineHeight: '1.8',
            letterSpacing: '0.01em'
          }}>
            Dynamic, market-aware SIPs powered by <span className="font-semibold" style={{
              background: 'linear-gradient(90deg, #00FF87 0%, #4AE3F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 4px rgba(0, 255, 135, 0.4))'
            }}>Financial Super Intelligence</span> for maximum growth and intelligent portfolio optimization.
          </p>
        </div>
        
        {/* CTA Button - Premium Enhanced */}
        <div className="mb-16">
          <button className="relative group overflow-hidden px-12 py-4 text-xl font-bold rounded-full transition-all duration-500 hover:scale-105" style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            background: 'linear-gradient(135deg, #00FF87 0%, #4AE3F7 50%, #00FF87 100%)',
            boxShadow: '0 8px 25px rgba(0, 255, 135, 0.3), 0 0 35px rgba(0, 255, 135, 0.1)',
            border: '2px solid rgba(0, 255, 135, 0.3)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
            animation: 'pulseGlow 3s ease-in-out infinite'
          }}>
            <span className="relative z-10 text-white font-black tracking-wide">START YOUR SMART SIP</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
              background: 'linear-gradient(135deg, #00f5a0 0%, #00d084 50%, #00b86b 100%)',
              transform: 'scale(1.02)'
            }}></div>
            <div className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
              background: 'linear-gradient(135deg, #39ff14, #00f5a0)',
              filter: 'blur(20px)',
              zIndex: -1
            }}></div>
            <div className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500" style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
              animation: 'elegantShimmer 3s ease-in-out infinite'
            }}></div>
          </button>
        </div>
      </div>
    </section>
  );
};

// SIP Brewery Features Section
const SIPBreweryFeaturesSection = () => {
  const features = [
    {
      icon: "🧠",
      title: "FSI-Powered Analytics",
      description: "Financial Super Intelligence analyzes 5000+ funds with precision and delivers personalized investment insights.",
      metric: "Predictive insights forecasting NAV performance with up to 94% accuracy",
      badge: "AI-DRIVEN"
    },
    {
      icon: "⚡",
      title: "Real-time Performance",
      description: "Lightning-fast market analytics with institutional-grade data processing capabilities.",
      metric: "Real-time market analytics and instant portfolio adjustments within 0.3 seconds",
      badge: "ULTRA-FAST"
    },
    {
      icon: "🛡️",
      title: "Institutional-Grade Security",
      description: "Bank-level security infrastructure with comprehensive regulatory compliance.",
      metric: "Regularly audited security standards and SEBI-compliant multi-layer encryption",
      badge: "SEBI COMPLIANT"
    },
    {
      icon: "🎯",
      title: "Smart SIP Investing",
      description: "Precision-engineered investment strategies optimized for maximum returns.",
      metric: "Personalized SIP strategies proven to enhance returns by up to 3% annually",
      badge: "PROVEN RESULTS"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 py-20 overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)'
    }}>
      {/* Lightweight Neural Network Background */}
      <div className="absolute inset-0 pointer-events-none">
        <LightweightNeuralNetwork />
        
        {/* Background Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(57, 255, 20, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(57, 255, 20, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '150px 150px',
          opacity: 0.3
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 px-6">
        {/* Section Title - Refined & Elegant */}
        <div className="text-center mb-20">
          <div className="relative inline-block mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white relative z-10" style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              letterSpacing: '-0.02em',
              lineHeight: '1.2'
            }}>
              Why Choose <span style={{
                background: 'linear-gradient(135deg, #00FF87 0%, #4AE3F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 8px rgba(0, 255, 135, 0.3))'
              }}>SIP Brewery</span>?
            </h2>
            
            {/* Subtle underline accent */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-0.5 rounded-full" style={{
              background: 'linear-gradient(90deg, transparent, #00FF87, transparent)',
              boxShadow: '0 0 10px rgba(0, 255, 135, 0.4)'
            }}></div>
          </div>
          
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '16px',
              color: '#cbd5e1',
              lineHeight: '1.6',
              textAlign: 'center',
              maxWidth: '512px',
              margin: '0 auto',
              padding: '0 16px'
            }}>
            Powered by <span style={{
              background: 'linear-gradient(90deg, #00FF87 0%, #4AE3F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '500'
            }}>Financial Super Intelligence</span> and institutional-grade infrastructure
            </p>
          </div>
        </div>

        {/* Features Grid - Luxurious Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4" style={{ marginTop: '2mm' }}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-4 rounded-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 cursor-pointer mx-auto"
              style={{
                background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.85) 100%)',
                border: '1px solid rgba(148, 163, 184, 0.15)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                minHeight: '240px',
                maxWidth: '280px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
                background: 'linear-gradient(145deg, rgba(0,255,135,0.05) 0%, rgba(74,227,247,0.03) 100%)',
                boxShadow: '0 0 20px rgba(0,255,135,0.1)'
              }}></div>
              
              {/* Compact Trust Badge */}
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-xs font-medium opacity-70 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: 'rgba(0,255,135,0.1)',
                color: '#00FF87',
                border: '1px solid rgba(0,255,135,0.2)',
                fontSize: '9px',
                letterSpacing: '0.3px'
              }}>
                {feature.badge}
              </div>
              {/* Compact Feature Icon */}
              <div className="flex-shrink-0 mb-2 text-center">
                <div className="text-2xl group-hover:scale-105 transition-transform duration-300 inline-block">
                  {feature.icon}
                </div>
              </div>
              
              {/* Compact Feature Title */}
              <div className="flex-shrink-0 mb-2">
                <h3 className="text-base font-semibold text-center relative z-10" style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  background: 'linear-gradient(135deg, #00FF87 0%, #4AE3F7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.01em',
                  lineHeight: '1.3'
                }}>
                  {feature.title}
                </h3>
              </div>
              
              {/* Compact Description */}
              <div className="flex-grow mb-2">
                <p className="text-slate-200 text-center leading-relaxed relative z-10" style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '12px',
                  lineHeight: '1.4',
                  fontWeight: '400'
                }}>
                  {feature.description}
                </p>
              </div>
              
              {/* Compact Metric */}
              <div className="flex-shrink-0 mt-auto">
                <div className="p-2 rounded-lg relative z-10" style={{
                  background: 'rgba(0,255,135,0.08)',
                  border: '1px solid rgba(0,255,135,0.2)'
                }}>
                  <p className="text-xs text-green-300 text-center font-medium" style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    lineHeight: '1.2'
                  }}>
                    {feature.metric}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Trust Signals */}
        <div className="flex flex-wrap justify-center items-center gap-2 py-20 my-20" style={{ marginTop: '1.5mm' }}>
          {[
            { icon: '✓', text: 'SEBI Compliant' },
            { icon: '★', text: 'BSE Star MF' },
            { icon: 'A', text: 'AMFI Registered' }
          ].map((badge, index) => (
            <div key={index} className="flex items-center space-x-2 px-2 py-1 rounded transition-all duration-300 hover:scale-105" style={{
              background: 'rgba(0,255,135,0.05)',
              border: '1px solid rgba(0,255,135,0.1)'
            }}>
              <div className="w-3 h-3 rounded-full flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #00FF87 0%, #4AE3F7 100%)'
              }}>
                <span className="font-bold text-black" style={{
                  fontSize: '8px'
                }}>{badge.icon}</span>
              </div>
              <span className="text-green-300 font-medium" style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '10px'
              }}>{badge.text}</span>
            </div>
          ))}
        </div>

        {/* Compact CTA Button */}
        <div className="text-center mb-32" style={{ marginTop: '6mm' }}>
          <button className="relative group overflow-hidden px-8 py-3 text-base font-semibold rounded-xl transition-all duration-500 hover:scale-105" style={{
            background: 'linear-gradient(135deg, #00FF87 0%, #4AE3F7 100%)',
            boxShadow: '0 4px 20px rgba(0, 255, 135, 0.2)',
            border: '1px solid rgba(0, 255, 135, 0.3)'
          }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{
              background: 'linear-gradient(135deg, #4AE3F7 0%, #00FF87 100%)'
            }}></div>
            
            <span className="relative z-10 text-black font-semibold" style={{
              fontFamily: 'Inter, system-ui, sans-serif'
            }}>Explore All Features</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'individual' | 'institutional'>('individual');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogin = (selectedUserType: 'individual' | 'institutional') => {
    setUserType(selectedUserType);
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('individual');
  };

  // If user is logged in, show the dashboard
  if (isLoggedIn) {
    return <DemoDashboard userType={userType} onLogout={handleLogout} />;
  }

  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      <PayTMStyleNavigation 
        isAuthenticated={false}
        onSignIn={() => setShowAuthModal(true)}
        onSignUp={() => setShowAuthModal(true)}
      />
      <style jsx global>{`
        @keyframes textShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes elegantShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100px, 100px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes paytmHover {
          0% { transform: translateY(0); }
          100% { transform: translateY(-2px); }
        }
        
        @keyframes pulseGlow {
          0%, 100% { 
            box-shadow: 0 8px 25px rgba(0, 255, 135, 0.3), 0 0 35px rgba(0, 255, 135, 0.1);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 8px 35px rgba(0, 255, 135, 0.4), 0 0 50px rgba(0, 255, 135, 0.2);
            transform: scale(1.02);
          }
        }
        
        @keyframes softPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes shimmerSweep {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes premiumGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 255, 135, 0.2), 0 0 40px rgba(0, 255, 135, 0.1);
          }
          50% {
            box-shadow: 0 0 30px rgba(0, 255, 135, 0.4), 0 0 60px rgba(0, 255, 135, 0.2);
          }
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes rippleExpand {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes elegantFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-2px) rotate(0.5deg);
          }
          66% {
            transform: translateY(1px) rotate(-0.5deg);
          }
        }
        
        @keyframes seamlessTickerScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        /* Compact ticker classes */
        .ticker-beer-mug {
          margin: 0 12px;
          font-size: 0.875rem;
          filter: drop-shadow(0 0 4px rgba(57, 255, 20, 0.3));
        }
        
        .ticker-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 4px;
        }
        
        .ticker-name {
          color: rgb(226 232 240);
          font-weight: 500;
          font-size: 0.75rem;
          letter-spacing: 0.01em;
          white-space: nowrap;
          font-family: Inter, system-ui, sans-serif;
        }
        
        .ticker-value {
          color: white;
          font-weight: 600;
          font-size: 0.75rem;
          white-space: nowrap;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.2px;
        }
        
        .ticker-change {
          font-weight: 600;
          font-size: 0.75rem;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          white-space: nowrap;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.2px;
        }
        
        .ticker-positive {
          color: rgb(110 231 183);
          background-color: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          text-shadow: 0 0 6px rgba(16, 185, 129, 0.4);
        }
        
        .ticker-negative {
          color: rgb(252 165 165);
          background-color: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          text-shadow: 0 0 6px rgba(239, 68, 68, 0.4);
        }
        
        .ticker-percent {
          font-weight: 600;
          font-size: 0.75rem;
          white-space: nowrap;
        }
      `}</style>
      
      {/* Premium Background Animations */}
      <PremiumBackgroundAnimations />
      

      
      {/* ASI Neural Hero Section */}
      <ASINeuralHeroSection />
      
      {/* SIP Brewery Features Section */}
      <SIPBreweryFeaturesSection />
      
      {/* Top 10 Mutual Funds Section */}
      <FSIMutualFundsSection />
      
      {/* Professional Footer */}
      <ProfessionalFooter />
      
      {/* Backend Integration Demo Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-[#00FF87] to-[#4AE3F7] bg-clip-text text-transparent">
                Live Backend Integration
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Real-time connection to our Universe-Class ASI Backend System with live market data, 
              intelligent fund analysis, and portfolio optimization.
            </p>
          </div>
          
          <SimpleBackendDemo />
        </div>
      </section>
      
      {/* Demo Account Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-900/20 via-gray-900 to-green-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-[#00FF87] to-[#4AE3F7] bg-clip-text text-transparent">
                Try Demo Account
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Experience our platform with ₹1,00,000 virtual money. Create portfolios, invest in funds, 
              start SIPs, and track live performance - all without any real money risk!
            </p>
            <div className="flex justify-center space-x-8 mt-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">₹1,00,000 Virtual Money</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">Live Portfolio Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300">Real Market Simulation</span>
              </div>
            </div>
          </div>
          
          <DemoAccount />
        </div>
      </section>
      
      {/* ASI Portfolio Analysis Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-900/20 via-gray-900 to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
                🤖 ASI Portfolio Analysis
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Advanced Artificial Stock Intelligence powered portfolio analysis with AI-driven insights, 
              predictive modeling, and intelligent optimization recommendations.
            </p>
            <div className="flex justify-center space-x-8 mt-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300">AI-Powered Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">Predictive Insights</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span className="text-gray-300">Smart Recommendations</span>
              </div>
            </div>
          </div>
          
          <SimpleASIDashboard />
        </div>
      </section>
      
      {/* Advanced Risk Management Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-red-900/20 via-gray-900 to-orange-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-[#EF4444] to-[#F97316] bg-clip-text text-transparent">
                🛡️ Advanced Risk Management
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Enterprise-grade risk management with VaR calculations, stress testing, factor-based attribution, 
              and regulatory capital requirements for institutional portfolio management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/demo" className="flex items-center space-x-3 p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                <Plus className="h-5 w-5 text-white" />
                <div className="text-left">
                  <div className="font-medium text-white">Try Demo Login</div>
                  <div className="text-xs text-blue-100">Experience full platform</div>
                </div>
              </a>
              
              <a href="/sipbrewery-dashboard" className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-lg transition-all transform hover:scale-105 shadow-lg">
                <DollarSign className="h-5 w-5 text-white" />
                <div className="text-left">
                  <div className="font-medium text-white">$1T Fund Dashboard</div>
                  <div className="text-xs text-green-100">World-class analytics</div>
                </div>
              </a>
            </div>
            <div className="flex justify-center space-x-8 mt-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-gray-300">VaR Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-gray-300">Stress Testing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">Regulatory Compliance</span>
              </div>
            </div>
          </div>
          
          <AdvancedRiskDashboard />
        </div>
      </section>
      
      {/* Real-Time Market Data Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-900/20 via-gray-900 to-teal-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-[#10B981] to-[#14B8A6] bg-clip-text text-transparent">
                📡 Real-Time Market Data
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Live market data integration from multiple free sources with intelligent failover, 
              quality validation, and real-time streaming capabilities.
            </p>
            <div className="flex justify-center space-x-8 mt-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Live Data Streaming</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-gray-300">Multi-Source Failover</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span className="text-gray-300">Quality Validation</span>
              </div>
            </div>
          </div>
          
          <RealTimeDataDashboard />
        </div>
      </section>
      
      {/* Enterprise Integration Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-indigo-900/20 via-gray-900 to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                🏗️ Enterprise Integration Center
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Unified orchestration and monitoring of all enterprise services including risk management, 
              real-time data, analytics warehouse, and high-availability infrastructure.
            </p>
            <div className="flex justify-center space-x-8 mt-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                <span className="text-gray-300">Service Orchestration</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300">Health Monitoring</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span className="text-gray-300">Workflow Management</span>
              </div>
            </div>
          </div>
          
          <EnterpriseIntegrationDashboard />
        </div>
      </section>
      
      {/* CTA Section - Perfect Centering */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00FF87]/5 via-transparent to-[#4AE3F7]/5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#00FF87]/10 to-[#4AE3F7]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="grid place-items-center gap-8 min-h-[300px] text-center">
            {/* Star Icon with Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="w-16 h-16 bg-gradient-to-r from-[#00FF87] to-[#4AE3F7] rounded-full flex items-center justify-center shadow-2xl shadow-[#00FF87]/30"
            >
              <Star className="w-8 h-8 text-black fill-current" />
            </motion.div>
            
            {/* Heading with Gradient */}
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold leading-tight"
              style={{ 
                textAlign: 'center',
                margin: '0 auto',
                background: 'linear-gradient(135deg, #ffffff 0%, #00FF87 50%, #4AE3F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Ready to Transform Your Investments?
            </motion.h2>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 max-w-2xl leading-relaxed"
              style={{ textAlign: 'center', margin: '0 auto' }}
            >
              Join thousands of investors who trust our AI-powered platform for smarter, 
              data-driven investment decisions with institutional-grade analytics.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 items-center justify-center"
            >
              <button className="group relative px-8 py-4 bg-gradient-to-r from-[#00FF87] to-[#4AE3F7] rounded-xl font-semibold text-black text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#00FF87]/30 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4AE3F7] to-[#00FF87] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
              
              <button className="group px-8 py-4 border-2 border-[#00FF87]/30 rounded-xl font-semibold text-white text-lg transition-all duration-300 hover:border-[#00FF87] hover:bg-[#00FF87]/10 hover:scale-105">
                <span className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </span>
              </button>
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00FF87]" />
                <span>Bank-Grade Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#4AE3F7]" />
                <span>50,000+ Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#00FF87]" />
                <span>SEBI Compliant</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Premium Fixed Bottom Ticker */}
      <PremiumFixedTicker />
      
      {/* Authentication Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
    </main>
  );
}
