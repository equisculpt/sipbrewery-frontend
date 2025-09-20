'use client';

import React, { useState, useEffect } from 'react';
import {
  Target, Award, RefreshCw, BarChart3, Eye, Activity, TrendingUp, Star,
  Building, LogOut, Zap, PieChart, FileText, Brain, Plus, Settings
} from 'lucide-react';

// Enterprise Navigation Component (copied from home page)
interface EnterpriseNavigationProps {
  onOpenAuthModal?: () => void;
}

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
        </div>
        
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
                      <span className="relative z-10">{item.name}</span>
                      
                      {/* Sophisticated underline animation */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent transition-all duration-500 group-hover:w-full" style={{
                        width: activeDropdown === i ? '60%' : '0%',
                        boxShadow: activeDropdown === i ? '0 0 12px rgba(0, 255, 135, 0.8)' : '0 0 8px rgba(0, 255, 135, 0.4)',
                        background: activeDropdown === i 
                          ? 'linear-gradient(90deg, transparent, #00FF87, #4AE3F7, #00FF87, transparent)'
                          : 'linear-gradient(90deg, transparent, #00FF87, transparent)'
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
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* MODERN DROPDOWN MEGA MENU */}
      {activeDropdown !== null && (
        <div 
          className="absolute left-0 right-0 z-40 transition-all duration-500 transform" 
          style={{
            top: 'calc(100% + 20px)',
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
                        >
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
                        >
                          <div className="relative w-12 h-12 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-xl flex items-center justify-center mr-4 group-hover:from-amber-400/30 group-hover:to-orange-400/30 transition-all duration-300 shadow-lg">
                            <span className="text-lg filter drop-shadow-sm">{item.icon}</span>
                          </div>
                          <div className="relative flex-1">
                            <div className="font-semibold text-white text-base group-hover:text-amber-300 transition-colors duration-300">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                              Tax-efficient investing
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  {/* Additional columns for Mutual Fund menu */}
                  <div className="space-y-8">
                    <div className="relative">
                      <h3 className="text-xl font-bold text-white mb-8">
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                          📊 Analytics
                        </span>
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="text-gray-300 text-sm">
                        • Fund Performance Analysis
                      </div>
                      <div className="text-gray-300 text-sm">
                        • Risk Assessment Tools
                      </div>
                      <div className="text-gray-300 text-sm">
                        • Portfolio Optimization
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="relative">
                      <h3 className="text-xl font-bold text-white mb-8">
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          🎯 Quick Actions
                        </span>
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <button className="w-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-400 py-3 rounded-xl font-medium transition-all hover:scale-105 border border-green-500/20">
                        Start SIP
                      </button>
                      <button className="w-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 text-blue-400 py-3 rounded-xl font-medium transition-all hover:scale-105 border border-blue-500/20">
                        Compare Funds
                      </button>
                    </div>
                  </div>
                </>
              )}
              
              {/* Brew Bot Mega Menu */}
              {navigationMenu[activeDropdown]?.name === 'Brew Bot' && navigationMenu[activeDropdown]?.dropdown && (
                <>
                  <div className="space-y-8">
                    <div className="relative">
                      <h3 className="text-xl font-bold text-white mb-8">
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                          🤖 AI Analysis
                        </span>
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {navigationMenu[activeDropdown].dropdown.slice(0, 4).map((item: any, i: number) => (
                        <a 
                          key={i} 
                          href={item.href} 
                          className="group relative flex items-center px-6 py-4 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                          style={{
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(6,182,212,0.08) 50%, rgba(59,130,246,0.06) 100%)',
                            border: '1px solid rgba(6,182,212,0.15)',
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                          }}
                        >
                          <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-xl flex items-center justify-center mr-4 group-hover:from-cyan-400/30 group-hover:to-blue-400/30 transition-all duration-300 shadow-lg">
                            <span className="text-lg filter drop-shadow-sm">{item.icon}</span>
                          </div>
                          <div className="relative flex-1">
                            <div className="font-semibold text-white text-base group-hover:text-cyan-300 transition-colors duration-300">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                              AI-powered insights
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="relative">
                      <h3 className="text-xl font-bold text-white mb-8">
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          ⚛️ Advanced Tools
                        </span>
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {navigationMenu[activeDropdown].dropdown.slice(4, 8).map((item: any, i: number) => (
                        <a 
                          key={i} 
                          href={item.href} 
                          className="group relative flex items-center px-6 py-4 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                          style={{
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(168,85,247,0.08) 50%, rgba(236,72,153,0.06) 100%)',
                            border: '1px solid rgba(168,85,247,0.15)',
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                          }}
                        >
                          <div className="relative w-12 h-12 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-xl flex items-center justify-center mr-4 group-hover:from-purple-400/30 group-hover:to-pink-400/30 transition-all duration-300 shadow-lg">
                            <span className="text-lg filter drop-shadow-sm">{item.icon}</span>
                          </div>
                          <div className="relative flex-1">
                            <div className="font-semibold text-white text-base group-hover:text-purple-300 transition-colors duration-300">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                              Advanced analytics
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  {/* Additional columns for Brew Bot */}
                  <div className="col-span-2 space-y-8">
                    <div className="relative">
                      <h3 className="text-xl font-bold text-white mb-8">
                        <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                          🚀 AI-Powered Features
                        </span>
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-slate-600/30">
                        <h4 className="text-white font-semibold mb-2">Quantum Predictions</h4>
                        <p className="text-gray-400 text-sm">Advanced AI models predict market movements with quantum computing precision.</p>
                      </div>
                      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-slate-600/30">
                        <h4 className="text-white font-semibold mb-2">Smart Portfolio</h4>
                        <p className="text-gray-400 text-sm">AI automatically optimizes your portfolio for maximum returns and minimal risk.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {/* Blog Mega Menu */}
              {navigationMenu[activeDropdown]?.name === 'Blog' && navigationMenu[activeDropdown]?.dropdown && (
                <>
                  <div className="space-y-8">
                    <div className="relative">
                      <h3 className="text-xl font-bold text-white mb-8">
                        <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                          📝 Content
                        </span>
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {navigationMenu[activeDropdown].dropdown.slice(0, 4).map((item: any, i: number) => (
                        <a 
                          key={i} 
                          href={item.href} 
                          className="group relative flex items-center px-6 py-4 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                          style={{
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(251,146,60,0.08) 50%, rgba(239,68,68,0.06) 100%)',
                            border: '1px solid rgba(251,146,60,0.15)',
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                          }}
                        >
                          <div className="relative w-12 h-12 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-xl flex items-center justify-center mr-4 group-hover:from-orange-400/30 group-hover:to-red-400/30 transition-all duration-300 shadow-lg">
                            <span className="text-lg filter drop-shadow-sm">{item.icon}</span>
                          </div>
                          <div className="relative flex-1">
                            <div className="font-semibold text-white text-base group-hover:text-orange-300 transition-colors duration-300">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                              Expert insights
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="relative">
                      <h3 className="text-xl font-bold text-white mb-8">
                        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                          👥 Community
                        </span>
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {navigationMenu[activeDropdown].dropdown.slice(4, 8).map((item: any, i: number) => (
                        <a 
                          key={i} 
                          href={item.href} 
                          className="group relative flex items-center px-6 py-4 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                          style={{
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(99,102,241,0.08) 50%, rgba(168,85,247,0.06) 100%)',
                            border: '1px solid rgba(99,102,241,0.15)',
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                          }}
                        >
                          <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-xl flex items-center justify-center mr-4 group-hover:from-indigo-400/30 group-hover:to-purple-400/30 transition-all duration-300 shadow-lg">
                            <span className="text-lg filter drop-shadow-sm">{item.icon}</span>
                          </div>
                          <div className="relative flex-1">
                            <div className="font-semibold text-white text-base group-hover:text-indigo-300 transition-colors duration-300">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                              Connect & learn
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  {/* Additional columns for Blog */}
                  <div className="col-span-2 space-y-8">
                    <div className="relative">
                      <h3 className="text-xl font-bold text-white mb-8">
                        <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                          📚 Learning Resources
                        </span>
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-slate-600/30">
                        <h4 className="text-white font-semibold mb-2">Investment Guides</h4>
                        <p className="text-gray-400 text-sm">Comprehensive guides for beginners to advanced investors.</p>
                      </div>
                      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-slate-600/30">
                        <h4 className="text-white font-semibold mb-2">Market Analysis</h4>
                        <p className="text-gray-400 text-sm">Daily market insights and expert analysis.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add required CSS animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100px, 100px); }
        }
      `}</style>
    </>
  );
};

// Dashboard Market Ticker Component
interface TickerData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'index' | 'fund';
  isUserInvested?: boolean;
}

const DashboardTicker: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);
  const [tickerData, setTickerData] = useState<TickerData[]>([
    // Market Indexes
    { symbol: 'NIFTY', name: 'Nifty 50', price: 21853.19, change: 124.67, changePercent: 0.57, type: 'index' },
    { symbol: 'SENSEX', name: 'BSE Sensex', price: 72247.34, change: 287.45, changePercent: 0.40, type: 'index' },
    { symbol: 'BANKNIFTY', name: 'Bank Nifty', price: 47874.56, change: 156.89, changePercent: 0.33, type: 'index' },
    { symbol: 'NIFTY IT', name: 'Nifty IT', price: 34569.49, change: 445.23, changePercent: 1.31, type: 'index' },
    
    // User's Invested Mutual Funds
    { symbol: 'AXISBLUECHIP', name: 'Axis Bluechip Fund', price: 65.42, change: 0.89, changePercent: 1.38, type: 'fund', isUserInvested: true },
    { symbol: 'ICICIPRUDENTIAL', name: 'ICICI Prudential Bluechip', price: 89.76, change: -0.45, changePercent: -0.50, type: 'fund', isUserInvested: true },
    { symbol: 'HDFCTOP100', name: 'HDFC Top 100 Fund', price: 756.23, change: 4.56, changePercent: 0.61, type: 'fund', isUserInvested: true },
    { symbol: 'MIRAEASSET', name: 'Mirae Asset Large Cap', price: 98.34, change: 1.23, changePercent: 1.27, type: 'fund', isUserInvested: true },
    { symbol: 'KOTAKSTANDARD', name: 'Kotak Standard Multicap', price: 54.23, change: 0.67, changePercent: 1.25, type: 'fund', isUserInvested: true },
    
    // Additional Market Data
    { symbol: 'GOLD', name: 'Gold (₹/10g)', price: 62847.00, change: -234.56, changePercent: -0.37, type: 'index' },
    { symbol: 'SILVER', name: 'Silver (₹/kg)', price: 74562.00, change: 567.89, changePercent: 0.77, type: 'index' },
    { symbol: 'USD/INR', name: 'USD/INR', price: 83.25, change: -0.15, changePercent: -0.18, type: 'index' }
  ]);

  useEffect(() => {
    setIsClient(true);
    
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const priceInterval = setInterval(() => {
      setTickerData(prev => prev.map(item => ({
        ...item,
        price: Math.max(0, item.price + (Math.random() - 0.5) * (item.price * 0.001)),
        change: item.change + (Math.random() - 0.5) * (item.type === 'fund' ? 0.5 : 10),
        changePercent: item.changePercent + (Math.random() - 0.5) * 0.1
      })));
    }, 2000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(priceInterval);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-3xl border-t border-white/20" style={{
      background: `linear-gradient(90deg, 
        rgba(0,0,0,0.85) 0%, 
        rgba(10,10,30,0.95) 25%, 
        rgba(20,20,40,0.95) 50%, 
        rgba(10,10,30,0.95) 75%, 
        rgba(0,0,0,0.85) 100%
      )`,
      boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.3)'
    }}>
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" style={{
                boxShadow: '0 0 15px rgba(34, 197, 94, 0.8)'
              }}></div>
              <span className="text-green-400 font-bold text-sm tracking-wider">LIVE PORTFOLIO</span>
            </div>
            <div className="text-white/70 text-sm font-mono">
              {isClient ? currentTime.toLocaleTimeString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                hour12: false 
              }) : '--:--:--'} IST
            </div>
          </div>
          
          <div className="flex-1 mx-8 overflow-hidden relative">
            <div className="flex space-x-4 animate-scroll" style={{
              animation: 'seamlessTickerScroll 45s linear infinite',
              width: 'max-content'
            }}>
              {/* First set of data */}
              {tickerData.flatMap((item, index) => {
                const separator = <span key={`first-sep-${index}`} className="ticker-beer-mug">🍺</span>;
                
                return [
                  <div key={`first-${item.symbol}-${index}`} className="flex items-center space-x-1 whitespace-nowrap ticker-item">
                    <span className={`ticker-name w-24 ${
                      item.isUserInvested ? 'text-cyan-300 font-bold' : ''
                    }`}>{item.symbol}</span>
                    <span className="ticker-value w-16 text-right">
                      {item.type === 'fund' ? '₹' : ''}{item.price.toLocaleString('en-IN', {maximumFractionDigits: 2})}
                    </span>
                    <span className={`ticker-change w-20 flex items-center justify-center space-x-1 ${
                      item.change >= 0 ? 'ticker-positive' : 'ticker-negative'
                    }`}>
                      <span>{item.change >= 0 ? '▲' : '▼'}</span>
                      <span>{Math.abs(item.change).toFixed(2)}</span>
                      <span>({(item.changePercent).toFixed(2)}%)</span>
                    </span>
                  </div>,
                  separator
                ];
              })}
              
              {/* Second set of data for seamless loop */}
              {tickerData.flatMap((item, index) => {
                const separator = <span key={`second-sep-${index}`} className="ticker-beer-mug">🍺</span>;
                
                return [
                  <div key={`second-${item.symbol}-${index}`} className="flex items-center space-x-1 whitespace-nowrap ticker-item">
                    <span className={`ticker-name w-24 ${
                      item.isUserInvested ? 'text-cyan-300 font-bold' : ''
                    }`}>{item.symbol}</span>
                    <span className="ticker-value w-16 text-right">
                      {item.type === 'fund' ? '₹' : ''}{item.price.toLocaleString('en-IN', {maximumFractionDigits: 2})}
                    </span>
                    <span className={`ticker-change w-20 flex items-center justify-center space-x-1 ${
                      item.change >= 0 ? 'ticker-positive' : 'ticker-negative'
                    }`}>
                      <span>{item.change >= 0 ? '▲' : '▼'}</span>
                      <span>{Math.abs(item.change).toFixed(2)}</span>
                      <span>({(item.changePercent).toFixed(2)}%)</span>
                    </span>
                  </div>,
                  separator
                ];
              })}
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
};

// Custom CSS-in-JS for institutional animations
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(1deg); }
    66% { transform: translateY(-10px) rotate(-1deg); }
  }
  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-15px) rotate(-1deg); }
    66% { transform: translateY(-25px) rotate(1deg); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3); }
    50% { box-shadow: 0 0 40px rgba(6, 182, 212, 0.6), 0 0 60px rgba(16, 185, 129, 0.4); }
  }
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes seamlessTickerScroll {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
  .animate-spin-slow { animation: spin-slow 20s linear infinite; }
  .animate-gradient { animation: gradient-shift 8s ease-in-out infinite; }
  .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
  
  /* Ticker Styles */
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
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

interface SIPBreweryDashboardProps {
  onLogout?: () => void;
}

const SIPBreweryDashboard: React.FC<SIPBreweryDashboardProps> = ({ onLogout }) => {
  const [animatedAUM, setAnimatedAUM] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showUserTooltip, setShowUserTooltip] = useState(false);
  const [animatedUserPortfolio, setAnimatedUserPortfolio] = useState(0);
  const [smartSipTimeframe, setSmartSipTimeframe] = useState<'all' | '1y' | '30d'>('all');
  const [activeTab, setActiveTab] = useState<'smart-sip' | 'portfolio' | 'all-sips' | 'reports' | 'asi-dashboard'>('smart-sip');

  // Progressive milestone system
  const getCurrentMilestone = (currentAUM: number) => {
    if (currentAUM < 100) return { target: 100, level: 1, name: 'Launch Milestone' };
    if (currentAUM < 1000) return { target: 1000, level: 2, name: 'Growth Milestone' };
    if (currentAUM < 10000) return { target: 10000, level: 3, name: 'Scale Milestone' };
    return { target: 100000, level: 4, name: 'Trillion Milestone' };
  };

  // Mock data
  const dashboardData = {
    totalAUM: 75.5, // Current AUM in crores (₹75.5 Cr)
    monthlyGrowth: 12.4,
    totalInvestors: 2847392,
    activeFunds: 1247,
    performanceScore: 87.5
  };

  // User portfolio data (mock)
  const userPortfolioValue = 275000; // ₹2,75,000

  // Personal wealth milestones (in rupees)
  const wealthMilestones = [100000, 500000, 1000000, 2500000, 5000000, 10000000, 20000000, 50000000, 100000000, 250000000];

  // Helper functions for user milestones
  const getUserNextMilestone = (currentValue: number) => {
    return wealthMilestones.find(milestone => milestone > currentValue) || wealthMilestones[wealthMilestones.length - 1];
  };

  const getUserProgressPercentage = (currentValue: number) => {
    const nextMilestone = getUserNextMilestone(currentValue);
    const previousMilestone = wealthMilestones[wealthMilestones.indexOf(nextMilestone) - 1] || 0;
    return ((currentValue - previousMilestone) / (nextMilestone - previousMilestone)) * 100;
  };

  const getUserRemainingAmount = (currentValue: number) => {
    return getUserNextMilestone(currentValue) - currentValue;
  };

  // Dynamic motivational messages based on milestone level
  const getMotivationalMessage = (currentValue: number) => {
    const nextMilestone = getUserNextMilestone(currentValue);
    const remaining = getUserRemainingAmount(currentValue);
    
    if (nextMilestone === 100000) {
      return `You're ₹${remaining.toLocaleString('en-IN')} away from your first milestone!`;
    } else if (nextMilestone === 500000) {
      return `You're ₹${remaining.toLocaleString('en-IN')} away from building serious wealth!`;
    } else if (nextMilestone === 1000000) {
      return `You're ₹${remaining.toLocaleString('en-IN')} away from becoming a Lakhpati!`;
    } else if (nextMilestone === 2500000) {
      return `You're ₹${remaining.toLocaleString('en-IN')} away from reaching ₹25 Lacs milestone!`;
    } else if (nextMilestone === 5000000) {
      return `You're ₹${remaining.toLocaleString('en-IN')} away from the ₹50 Lacs club!`;
    } else if (nextMilestone === 10000000) {
      return `You're ₹${remaining.toLocaleString('en-IN')} away from becoming a Crorepati!`;
    } else if (nextMilestone === 20000000) {
      return `You're ₹${remaining.toLocaleString('en-IN')} away from the ₹2 Crore elite!`;
    } else if (nextMilestone === 50000000) {
      return `You're ₹${remaining.toLocaleString('en-IN')} away from the ₹5 Crore league!`;
    } else if (nextMilestone === 100000000) {
      return `You're ₹${remaining.toLocaleString('en-IN')} away from joining the Million Dollar Club!`;
    } else {
      return `You're ₹${remaining.toLocaleString('en-IN')} away from ultra-high net worth status!`;
    }
  };

  // Current milestone data
  const currentMilestone = getCurrentMilestone(dashboardData.totalAUM);
  const progressPercentage = (dashboardData.totalAUM / currentMilestone.target) * 100;
  const remainingAmount = currentMilestone.target - dashboardData.totalAUM;

  // Animate AUM counter on load
  useEffect(() => {
    const targetAUM = dashboardData.totalAUM;
    const duration = 2000;
    const steps = 60;
    const increment = targetAUM / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetAUM) {
        setAnimatedAUM(targetAUM);
        clearInterval(timer);
      } else {
        setAnimatedAUM(current);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, []);

  // Animate user portfolio counter on load
  useEffect(() => {
    const targetPortfolio = userPortfolioValue;
    const duration = 2500;
    const steps = 60;
    const increment = targetPortfolio / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetPortfolio) {
        setAnimatedUserPortfolio(targetPortfolio);
        clearInterval(timer);
      } else {
        setAnimatedUserPortfolio(current);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, []);

  const getSmartSipData = (timeframe: string) => {
    const data = {
      all: { dynamicSips: 15847, sipsOptimized: 89.2, aiAlphaBoost: 24.8 },
      '1y': { dynamicSips: 12340, sipsOptimized: 76.5, aiAlphaBoost: 18.3 },
      '30d': { dynamicSips: 2847, sipsOptimized: 94.1, aiAlphaBoost: 31.2 }
    };
    return data[timeframe as keyof typeof data] || data.all;
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'smart-sip':
        return (
          <div className="bg-gradient-to-br from-slate-800/40 via-blue-900/30 to-purple-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
            {/* Smart SIP Engine Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <Zap className="w-7 h-7 text-purple-400" />
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text tracking-wide">
                  SMART SIP ENGINE
                </h2>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              </div>
              <p className="text-slate-400 text-base font-medium">AI-Powered SIP Intelligence & Optimization</p>
            </div>

            {/* Smart SIP Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
              <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 backdrop-blur-xl rounded-xl p-4 border border-green-500/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-green-400 text-xs font-medium">Active</div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {getSmartSipData('all').dynamicSips.toLocaleString()}
                </div>
                <div className="text-slate-400 text-sm">Dynamic SIPs</div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-xl p-4 border border-blue-500/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-blue-400 text-xs font-medium">Optimized</div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {getSmartSipData('all').sipsOptimized}%
                </div>
                <div className="text-slate-400 text-sm">SIPs Optimized</div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-xl rounded-xl p-4 border border-amber-500/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-amber-400 text-xs font-medium">Alpha</div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  +{getSmartSipData('all').aiAlphaBoost}%
                </div>
                <div className="text-slate-400 text-sm">AI Alpha Boost</div>
              </div>
              
              <div className="bg-gradient-to-br from-rose-500/10 to-pink-500/10 backdrop-blur-xl rounded-xl p-4 border border-rose-500/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-rose-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="text-rose-400 text-xs font-medium">Live</div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  ₹2.4Cr
                </div>
                <div className="text-slate-400 text-sm">Assets Managed</div>
              </div>
            </div>

            {/* Demo Content */}
            <div className="text-center py-12">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart SIP Engine Active</h3>
              <p className="text-slate-400 mb-6">Your AI-powered SIP optimization is running smoothly</p>
              <button className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 hover:from-purple-500/30 hover:to-cyan-500/30 text-purple-300 px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 border border-purple-500/30">
                View Optimization Details
              </button>
            </div>
          </div>
        );
        
      case 'portfolio':
        return (
          <div className="bg-gradient-to-br from-slate-800/40 via-green-900/30 to-emerald-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <TrendingUp className="w-7 h-7 text-green-400" />
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text tracking-wide">
                  PORTFOLIO ANALYSIS
                </h2>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <p className="text-slate-400 text-base font-medium">Deep insights and performance analytics</p>
            </div>
            
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-white mb-4">Portfolio Analysis Dashboard</h3>
              <p className="text-slate-400 mb-6">Comprehensive analysis of your investment portfolio performance</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                  <div className="text-2xl font-bold text-green-400 mb-1">24.8%</div>
                  <div className="text-slate-400 text-sm">Total Returns</div>
                </div>
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400 mb-1">18.7%</div>
                  <div className="text-slate-400 text-sm">XIRR</div>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-400 mb-1">47</div>
                  <div className="text-slate-400 text-sm">Holdings</div>
                </div>
              </div>
              <button className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-300 px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 border border-green-500/30">
                View Detailed Analysis
              </button>
            </div>
          </div>
        );
        
      case 'all-sips':
        return (
          <div className="bg-gradient-to-br from-slate-800/40 via-blue-900/30 to-indigo-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <BarChart3 className="w-7 h-7 text-blue-400" />
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text tracking-wide">
                  ALL SIPs MANAGEMENT
                </h2>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
              <p className="text-slate-400 text-base font-medium">Smart + Static SIPs management hub</p>
            </div>
            
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-white mb-4">SIPs Management Center</h3>
              <p className="text-slate-400 mb-6">Manage all your SIP investments in one place</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400 mb-1">32</div>
                  <div className="text-slate-400 text-sm">Smart SIPs</div>
                </div>
                <div className="bg-indigo-500/10 rounded-xl p-4 border border-indigo-500/20">
                  <div className="text-2xl font-bold text-indigo-400 mb-1">15</div>
                  <div className="text-slate-400 text-sm">Static SIPs</div>
                </div>
              </div>
              <button className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 text-blue-300 px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 border border-blue-500/30">
                Manage SIPs
              </button>
            </div>
          </div>
        );
        
      case 'reports':
        return (
          <div className="bg-gradient-to-br from-slate-800/40 via-amber-900/30 to-orange-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <FileText className="w-7 h-7 text-amber-400" />
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text tracking-wide">
                  REPORTS & ANALYTICS
                </h2>
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              </div>
              <p className="text-slate-400 text-base font-medium">Tax reports, statements & analytics</p>
            </div>
            
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-2xl font-bold text-white mb-4">Reports Dashboard</h3>
              <p className="text-slate-400 mb-6">Access all your investment reports and tax documents</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
                  <div className="text-lg font-bold text-amber-400 mb-1">Tax Report</div>
                  <div className="text-slate-400 text-sm">FY 2023-24</div>
                </div>
                <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
                  <div className="text-lg font-bold text-orange-400 mb-1">Statements</div>
                  <div className="text-slate-400 text-sm">Monthly</div>
                </div>
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                  <div className="text-lg font-bold text-red-400 mb-1">Analytics</div>
                  <div className="text-slate-400 text-sm">Performance</div>
                </div>
              </div>
              <button className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 border border-amber-500/30">
                Generate Reports
              </button>
            </div>
          </div>
        );
        
      case 'asi-dashboard':
        return (
          <div className="bg-gradient-to-br from-slate-800/40 via-rose-900/30 to-pink-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <Brain className="w-7 h-7 text-rose-400" />
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text tracking-wide">
                  ASI DASHBOARD
                </h2>
                <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
              </div>
              <p className="text-slate-400 text-base font-medium">Advanced AI insights & predictions</p>
            </div>
            
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Insights Dashboard</h3>
              <p className="text-slate-400 mb-6">Advanced artificial intelligence predictions and market insights</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-rose-500/10 rounded-xl p-4 border border-rose-500/20">
                  <div className="text-2xl font-bold text-rose-400 mb-1">94.2%</div>
                  <div className="text-slate-400 text-sm">Prediction Accuracy</div>
                </div>
                <div className="bg-pink-500/10 rounded-xl p-4 border border-pink-500/20">
                  <div className="text-2xl font-bold text-pink-400 mb-1">127</div>
                  <div className="text-slate-400 text-sm">AI Signals</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-xl p-4 border border-rose-500/20 mb-6">
                <div className="text-sm text-rose-300 font-semibold mb-2">🚀 BETA FEATURE</div>
                <div className="text-slate-400 text-sm">This advanced AI dashboard is currently in beta testing</div>
              </div>
              <button className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 hover:from-rose-500/30 hover:to-pink-500/30 text-rose-300 px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 border border-rose-500/30">
                Explore AI Insights
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">
      {/* Enterprise Navigation */}
      <EnterpriseNavigation />
      
      {/* Add top padding to account for fixed navigation */}
      <div className="pt-20">

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* 🎯 $100M INSTITUTIONAL HERO SECTION */}
        <section className="mb-16">
          <div className="relative bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-800/85 backdrop-blur-2xl rounded-[2rem] p-12 border border-slate-600/30 shadow-[0_32px_64px_rgba(0,0,0,0.4)] overflow-hidden">
            {/* Subtle Background Effects */}
            <div className="absolute inset-0">
              {/* Simple Gradient Orb */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-conic from-cyan-500/5 to-green-500/5 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              {/* Clean Institutional Header */}
              <div className="flex items-center justify-between mb-12">
                {/* World-Class Milestone Badge */}
                <div className="inline-flex items-center bg-gradient-to-r from-slate-800/90 via-slate-700/70 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-600/40 shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden">
                  {/* Main Milestone Section */}
                  <div className="flex items-center space-x-4 px-6 py-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-green-400 rounded-xl flex items-center justify-center shadow-lg">
                      <Target className="w-5 h-5 text-slate-900 font-bold" />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-cyan-300 font-bold text-base tracking-wide leading-tight">
                        {currentMilestone.name}
                      </div>
                      <div className="text-slate-400 text-sm font-medium mt-0.5">
                        Target: ₹{currentMilestone.target.toLocaleString('en-IN')} Cr
                      </div>
                    </div>
                  </div>
                  
                  {/* Separator */}
                  <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-600/50 to-transparent"></div>
                  
                  {/* Level Badge Section */}
                  <div className="px-6 py-4">
                    <div className="bg-gradient-to-r from-purple-500/25 to-blue-500/25 rounded-xl px-4 py-2.5 border border-purple-500/40 shadow-inner">
                      <span className="text-purple-200 font-bold text-sm tracking-wider">LEVEL {currentMilestone.level}</span>
                    </div>
                  </div>
                </div>
                
                {/* Live Status */}
                <div className="flex items-center space-x-3 bg-gradient-to-r from-slate-800/60 to-slate-700/40 backdrop-blur-sm rounded-xl px-4 py-3 border border-slate-600/30">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span className="text-green-400 font-bold text-sm tracking-wider">LIVE</span>
                </div>
              </div>

              {/* Institutional AUM Display */}
              <div className="text-center mb-12">
                {/* AUM Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center space-x-3 bg-slate-800/40 backdrop-blur-sm rounded-2xl px-6 py-3 border border-slate-600/30 mb-4">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-300 font-semibold text-sm tracking-widest">ASSETS UNDER MANAGEMENT</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Main AUM Display */}
                <div className="relative inline-block group">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-green-500/30 to-cyan-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  <div className="relative">
                    <h1 
                      className="text-6xl lg:text-8xl xl:text-9xl font-black text-transparent bg-gradient-to-r from-cyan-300 via-green-300 to-cyan-300 bg-clip-text mb-6 tracking-tight cursor-pointer transition-all duration-500 hover:scale-105"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontWeight: 900,
                        textShadow: '0 0 60px rgba(6, 182, 212, 0.4), 0 0 120px rgba(16, 185, 129, 0.2)',
                        filter: 'drop-shadow(0 8px 32px rgba(6, 182, 212, 0.3))'
                      }}
                    >
                      ₹{animatedAUM.toFixed(2)}
                      <span className="text-4xl lg:text-6xl xl:text-7xl ml-4 text-slate-400 font-bold">Cr</span>
                    </h1>
                    

                  </div>
                  
                  {/* Enhanced Tooltip */}
                  {showTooltip && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl border border-cyan-500/40 rounded-2xl p-6 shadow-[0_24px_48px_rgba(0,0,0,0.4)] z-50 min-w-[320px]">
                      <div className="text-center">
                        <div className="text-cyan-400 font-mono text-xl font-bold mb-2">
                          ₹{(dashboardData.totalAUM * 10000000).toLocaleString('en-IN')}
                        </div>
                        <div className="text-slate-400 text-sm mb-3">Exact Amount (Rupees)</div>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div className="bg-slate-800/50 rounded-lg p-2">
                            <div className="text-green-400 font-semibold">USD Equiv.</div>
                            <div className="text-slate-300">${((dashboardData.totalAUM * 10000000) / 83).toFixed(0)}</div>
                          </div>
                          <div className="bg-slate-800/50 rounded-lg p-2">
                            <div className="text-blue-400 font-semibold">Growth</div>
                            <div className="text-slate-300">+{dashboardData.monthlyGrowth}%</div>
                          </div>
                        </div>
                      </div>
                      {/* Arrow */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] border-l-transparent border-r-transparent border-b-slate-900/95"></div>
                    </div>
                  )}
                </div>
                
                {/* Clean Progress Stats */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">{progressPercentage.toFixed(1)}%</div>
                    <div className="text-slate-400 font-medium">Complete</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-cyan-400 mb-2">₹{remainingAmount.toFixed(1)} Cr</div>
                    <div className="text-slate-400 font-medium">Remaining</div>
                  </div>
                </div>

                {/* Clean Progress Bar */}
                <div className="mb-12">
                  <div className="relative">
                    <div className="w-full bg-slate-800/50 rounded-2xl h-6 border border-slate-600/40 shadow-inner backdrop-blur-sm overflow-hidden">
                      <div 
                        className="relative h-6 bg-gradient-to-r from-green-400 via-cyan-400 to-green-500 rounded-2xl transition-all duration-[3000ms] ease-out shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                        style={{ width: `${progressPercentage}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl animate-pulse" style={{animationDuration: '2s'}}></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-start mt-4 text-sm">
                      <span className="text-slate-400">₹0 Cr</span>
                    </div>
                  </div>
                </div>

              {/* Inspirational Quote */}
              <div className="text-center mb-8">
                <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-green-300 bg-clip-text">
                  "Brewing India's path to ₹{currentMilestone.target} Cr excellence."
                </p>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* Gradient Transition Bridge */}
        <div className="h-16 bg-gradient-to-b from-slate-900/60 via-slate-800/40 to-slate-900/60 -mb-8 relative z-0"></div>

        {/* 👤 PERSONAL WEALTH MILESTONE SECTION */}
        <section className="mb-16 relative z-10">
          <div className="relative bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-teal-800/60 backdrop-blur-2xl rounded-[2rem] p-12 border border-slate-600/20 shadow-[0_32px_64px_rgba(0,0,0,0.3)] overflow-hidden">
            {/* Subtle Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-conic from-blue-500/5 to-teal-500/5 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              {/* Clean Personal Header */}
              <div className="flex items-center justify-between mb-12">
                {/* Simple Title */}
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
                    <Star className="w-5 h-5 text-slate-900 font-bold" />
                  </div>
                  <div>
                    <div className="text-cyan-300 font-bold text-2xl tracking-wide">
                      Wealth Builder Journey
                    </div>
                    <div className="text-slate-400 text-base font-medium mt-1">
                      Target: ₹{getUserNextMilestone(userPortfolioValue).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
                
                {/* Live Status */}
                <div className="flex items-center space-x-3 bg-gradient-to-r from-slate-800/60 to-slate-700/40 backdrop-blur-sm rounded-xl px-4 py-3 border border-slate-600/30">
                  <div className="relative">
                    <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-teal-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span className="text-teal-400 font-bold text-sm tracking-wider">LIVE</span>
                </div>
              </div>

              {/* Personal Portfolio Display */}
              <div className="text-center mb-12">
                {/* Main Portfolio Display */}
                <div className="relative inline-block group">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-teal-500/30 to-cyan-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  <div className="relative">
                    <h1 
                      className="text-6xl lg:text-8xl xl:text-9xl font-black text-transparent bg-gradient-to-r from-cyan-300 via-teal-300 to-cyan-300 bg-clip-text mb-6 tracking-tight cursor-pointer transition-all duration-500 hover:scale-105"
                      onMouseEnter={() => setShowUserTooltip(true)}
                      onMouseLeave={() => setShowUserTooltip(false)}
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontWeight: 900,
                        textShadow: '0 0 60px rgba(6, 182, 212, 0.4), 0 0 120px rgba(20, 184, 166, 0.2)',
                        filter: 'drop-shadow(0 8px 32px rgba(6, 182, 212, 0.3))'
                      }}
                    >
                      ₹{animatedUserPortfolio.toLocaleString('en-IN')}
                    </h1>
                  </div>
                  
                  {/* Enhanced Tooltip */}
                  {showUserTooltip && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl border border-teal-500/40 rounded-2xl p-6 shadow-[0_24px_48px_rgba(0,0,0,0.4)] z-50 min-w-[320px]">
                      <div className="text-center">
                        <div className="text-teal-400 font-mono text-xl font-bold mb-2">
                          ₹{userPortfolioValue.toLocaleString('en-IN')}
                        </div>
                        <div className="text-slate-400 text-sm mb-3">Exact Amount (Rupees)</div>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div className="bg-slate-800/50 rounded-lg p-2">
                            <div className="text-green-400 font-semibold">Monthly Growth</div>
                            <div className="text-slate-300">+₹{(userPortfolioValue * 0.08).toFixed(0)}</div>
                          </div>
                          <div className="bg-slate-800/50 rounded-lg p-2">
                            <div className="text-blue-400 font-semibold">Growth %</div>
                            <div className="text-slate-300">+8.2%</div>
                          </div>
                        </div>
                      </div>
                      {/* Arrow */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] border-l-transparent border-r-transparent border-b-slate-900/95"></div>
                    </div>
                  )}
                </div>
                
                {/* Financial Performance Metrics */}
                <div className="grid grid-cols-3 gap-6 mb-12">
                  <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-2xl p-4 border border-slate-600/20">
                    <div className="text-3xl font-bold text-green-400 mb-2">24.8%</div>
                    <div className="text-slate-400 font-medium text-sm">XIRR</div>
                  </div>
                  <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-2xl p-4 border border-slate-600/20">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">+18.2%</div>
                    <div className="text-slate-400 font-medium text-sm">Absolute Return</div>
                  </div>
                  <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-2xl p-4 border border-slate-600/20">
                    <div className="text-3xl font-bold text-teal-400 mb-2">+8.5%</div>
                    <div className="text-slate-400 font-medium text-sm">Last 30 Days</div>
                  </div>
                </div>

                {/* Clean Progress Stats */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-teal-400 mb-2">{getUserProgressPercentage(userPortfolioValue).toFixed(1)}%</div>
                    <div className="text-slate-400 font-medium">Complete</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-cyan-400 mb-2">₹{getUserRemainingAmount(userPortfolioValue).toLocaleString('en-IN')}</div>
                    <div className="text-slate-400 font-medium">Remaining</div>
                  </div>
                </div>

                {/* Clean Progress Bar */}
                <div className="mb-12">
                  <div className="relative">
                    <div className="w-full bg-slate-800/50 rounded-2xl h-6 border border-slate-600/40 shadow-inner backdrop-blur-sm overflow-hidden">
                      <div 
                        className="relative h-6 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 rounded-2xl transition-all duration-[3000ms] ease-out shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                        style={{ width: `${getUserProgressPercentage(userPortfolioValue)}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl animate-pulse" style={{animationDuration: '2s'}}></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-start mt-4 text-sm">
                      <span className="text-slate-400">₹0</span>
                    </div>
                  </div>
                </div>

              {/* Inspirational Quote */}
              <div className="text-center mb-8">
                <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text">
                  "{getMotivationalMessage(userPortfolioValue)}"
                </p>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🎯 USER DASHBOARD NAVIGATION MENU */}
        <section className="mb-12">
          <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-2xl rounded-[2rem] p-8 border border-slate-600/30 shadow-[0_32px_64px_rgba(0,0,0,0.4)] overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/10 to-blue-500/5 rounded-[2rem]"></div>
            </div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-3 bg-slate-800/60 backdrop-blur-sm rounded-2xl px-6 py-3 border border-slate-600/40 mb-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-300 font-semibold text-sm tracking-widest">YOUR DASHBOARD</span>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-blue-300 bg-clip-text mb-2">
                  Investment Command Center
                </h2>
                <p className="text-slate-400 text-base font-medium">Navigate your wealth-building journey with precision</p>
              </div>

              {/* Navigation Tabs */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Smart SIP Engine Tab */}
                <div 
                  onClick={() => setActiveTab('smart-sip')}
                  className={`group relative backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:scale-105 cursor-pointer ${
                    activeTab === 'smart-sip' 
                      ? 'bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 border-purple-500/60 shadow-[0_0_30px_rgba(168,85,247,0.3)]'
                      : 'bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border-purple-500/20 hover:border-purple-500/40'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Zap className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 text-center group-hover:text-purple-300 transition-colors">
                      Smart SIP Engine
                    </h3>
                    <p className="text-slate-400 text-sm text-center group-hover:text-slate-300 transition-colors">
                      AI-powered SIP optimization and automation
                    </p>
                    <div className="mt-4 flex justify-center">
                      <div className="bg-purple-500/20 rounded-lg px-3 py-1 border border-purple-500/30">
                        <span className="text-purple-300 text-xs font-semibold">ACTIVE</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Portfolio Analysis Tab */}
                <div 
                  onClick={() => setActiveTab('portfolio')}
                  className={`group relative backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:scale-105 cursor-pointer ${
                    activeTab === 'portfolio' 
                      ? 'bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 border-green-500/60 shadow-[0_0_30px_rgba(34,197,94,0.3)]'
                      : 'bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 border-green-500/20 hover:border-green-500/40'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <TrendingUp className="w-6 h-6 text-green-400 group-hover:text-green-300" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 text-center group-hover:text-green-300 transition-colors">
                      Portfolio Analysis
                    </h3>
                    <p className="text-slate-400 text-sm text-center group-hover:text-slate-300 transition-colors">
                      Deep insights and performance analytics
                    </p>
                    <div className="mt-4 flex justify-center">
                      <div className="bg-green-500/20 rounded-lg px-3 py-1 border border-green-500/30">
                        <span className="text-green-300 text-xs font-semibold">LIVE</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* All SIPs Tab */}
                <div 
                  onClick={() => setActiveTab('all-sips')}
                  className={`group relative backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:scale-105 cursor-pointer ${
                    activeTab === 'all-sips' 
                      ? 'bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 border-blue-500/60 shadow-[0_0_30px_rgba(59,130,246,0.3)]'
                      : 'bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 border-blue-500/20 hover:border-blue-500/40'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <BarChart3 className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 text-center group-hover:text-blue-300 transition-colors">
                      All SIPs
                    </h3>
                    <p className="text-slate-400 text-sm text-center group-hover:text-slate-300 transition-colors">
                      Smart + Static SIPs management hub
                    </p>
                    <div className="mt-4 flex justify-center">
                      <div className="bg-blue-500/20 rounded-lg px-3 py-1 border border-blue-500/30">
                        <span className="text-blue-300 text-xs font-semibold">24/7</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reports Tab */}
                <div 
                  onClick={() => setActiveTab('reports')}
                  className={`group relative backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:scale-105 cursor-pointer ${
                    activeTab === 'reports' 
                      ? 'bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-red-500/20 border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.3)]'
                      : 'bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 border-amber-500/20 hover:border-amber-500/40'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-red-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <FileText className="w-6 h-6 text-amber-400 group-hover:text-amber-300" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 text-center group-hover:text-amber-300 transition-colors">
                      Reports
                    </h3>
                    <p className="text-slate-400 text-sm text-center group-hover:text-slate-300 transition-colors">
                      Tax reports, statements & analytics
                    </p>
                    <div className="mt-4 flex justify-center">
                      <div className="bg-amber-500/20 rounded-lg px-3 py-1 border border-amber-500/30">
                        <span className="text-amber-300 text-xs font-semibold">READY</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ASI Dashboard Tab */}
                <div 
                  onClick={() => setActiveTab('asi-dashboard')}
                  className={`group relative backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:scale-105 cursor-pointer ${
                    activeTab === 'asi-dashboard' 
                      ? 'bg-gradient-to-br from-rose-500/20 via-pink-500/20 to-purple-500/20 border-rose-500/60 shadow-[0_0_30px_rgba(244,63,94,0.3)]'
                      : 'bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-purple-500/10 border-rose-500/20 hover:border-rose-500/40'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-rose-500/20 to-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Brain className="w-6 h-6 text-rose-400 group-hover:text-rose-300" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 text-center group-hover:text-rose-300 transition-colors">
                      ASI Dashboard
                    </h3>
                    <p className="text-slate-400 text-sm text-center group-hover:text-slate-300 transition-colors">
                      Advanced AI insights & predictions
                    </p>
                    <div className="mt-4 flex justify-center">
                      <div className="bg-rose-500/20 rounded-lg px-3 py-1 border border-rose-500/30">
                        <span className="text-rose-300 text-xs font-semibold">BETA</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats Row */}
              <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-600/20 text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">47</div>
                  <div className="text-slate-400 text-sm font-medium">Active SIPs</div>
                </div>
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-600/20 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">₹24.8K</div>
                  <div className="text-slate-400 text-sm font-medium">Monthly SIP</div>
                </div>
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-600/20 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">18.7%</div>
                  <div className="text-slate-400 text-sm font-medium">Avg XIRR</div>
                </div>
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-600/20 text-center">
                  <div className="text-2xl font-bold text-amber-400 mb-1">₹1.2L</div>
                  <div className="text-slate-400 text-sm font-medium">Tax Saved</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-300 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 border border-cyan-500/30 hover:border-cyan-500/50 flex items-center justify-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Start New SIP</span>
                </button>
                <button className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-purple-300 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 border border-purple-500/30 hover:border-purple-500/50 flex items-center justify-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Optimize Portfolio</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 📊 DYNAMIC CONTENT SECTION */}
        <section className="mb-12">
          {renderTabContent()}
        </section>
      </main>
      
      {/* Dashboard Ticker */}
      <DashboardTicker />
      </div>
    </div>
  );
};

export default SIPBreweryDashboard;
              {/* Total Smart SIPs */}
              <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 backdrop-blur-xl rounded-xl p-3 border border-green-500/20 hover:border-green-500/40 transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-green-400 text-xs font-medium">Active</div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {getSmartSipData('all').dynamicSips.toLocaleString()}
                </div>
                <div className="text-slate-300 font-medium mb-1 text-sm">Smart SIPs Active</div>
                <div className="text-xs text-slate-400">AI-optimized in real-time</div>
              </div>

              {/* Total Extra Returns */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-xl p-3 border border-blue-500/20 hover:border-blue-500/40 transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-blue-400 text-xs font-medium">Extra Returns</div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  ₹{(userPortfolioValue * 0.127).toLocaleString('en-IN', {maximumFractionDigits: 0})}
                </div>
                <div className="text-slate-300 font-medium mb-1 text-sm">vs Static SIP</div>
                <div className="text-xs text-slate-400">Additional gains earned</div>
              </div>

              {/* AI Alpha Boost */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-xl p-3 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-purple-400 text-xs font-medium">Alpha</div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  +{getSmartSipData('all').aiAlphaBoost}%
                </div>
                <div className="text-slate-300 font-medium mb-1 text-sm">AI Alpha Boost</div>
                <div className="text-xs text-slate-400">vs regular SIP</div>
              </div>

              {/* Optimization Rate */}
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl rounded-xl p-3 border border-orange-500/20 hover:border-orange-500/40 transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-orange-400" />
                  </div>
                  <div className="text-orange-400 text-xs font-medium">Optimized</div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {getSmartSipData('all').sipsOptimized}%
                </div>
                <div className="text-slate-300 font-medium mb-1 text-sm">SIPs Optimized</div>
                <div className="text-xs text-slate-400">Performance improvement</div>
              </div>
            </div>

            {/* Active Smart SIPs List */}
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span>Active Smart SIPs</span>
                </h3>
                <div className="text-sm text-slate-400">Real-time AI optimization</div>
              </div>
              
              <div className="space-y-4">
                {/* Smart SIP Item 1 */}
                <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="font-semibold text-white">Axis Bluechip Fund</span>
                        </div>
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">ACTIVE</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-400">Monthly SIP</div>
                          <div className="text-white font-medium">₹5,000</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Smart vs Static</div>
                          <div className="text-green-400 font-medium">+₹8,450 (+14.2%)</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Current Value</div>
                          <div className="text-cyan-400 font-medium">₹67,890</div>
                        </div>
                        <div>
                          <div className="text-slate-400">AI Decisions</div>
                          <div className="text-purple-400 font-medium">247 this month</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Smart SIP Item 2 */}
                <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="font-semibold text-white">ICICI Prudential Bluechip</span>
                        </div>
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">ACTIVE</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-400">Monthly SIP</div>
                          <div className="text-white font-medium">₹3,000</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Smart vs Static</div>
                          <div className="text-green-400 font-medium">+₹5,670 (+11.8%)</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Current Value</div>
                          <div className="text-cyan-400 font-medium">₹53,240</div>
                        </div>
                        <div>
                          <div className="text-slate-400">AI Decisions</div>
                          <div className="text-purple-400 font-medium">189 this month</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Smart SIP Item 3 */}
                <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="font-semibold text-white">HDFC Top 100 Fund</span>
                        </div>
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">ACTIVE</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-400">Monthly SIP</div>
                          <div className="text-white font-medium">₹7,500</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Smart vs Static</div>
                          <div className="text-green-400 font-medium">+₹12,890 (+16.7%)</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Current Value</div>
                          <div className="text-cyan-400 font-medium">₹89,650</div>
                        </div>
                        <div>
                          <div className="text-slate-400">AI Decisions</div>
                          <div className="text-purple-400 font-medium">312 this month</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Smart SIP Item 4 */}
                <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="font-semibold text-white">Mirae Asset Large Cap</span>
                        </div>
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">ACTIVE</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-400">Monthly SIP</div>
                          <div className="text-white font-medium">₹4,000</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Smart vs Static</div>
                          <div className="text-green-400 font-medium">+₹6,780 (+13.4%)</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Current Value</div>
                          <div className="text-cyan-400 font-medium">₹57,320</div>
                        </div>
                        <div>
                          <div className="text-slate-400">AI Decisions</div>
                          <div className="text-purple-400 font-medium">203 this month</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Smart SIP Item 5 */}
                <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="font-semibold text-white">Kotak Standard Multicap</span>
                        </div>
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">ACTIVE</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-400">Monthly SIP</div>
                          <div className="text-white font-medium">₹2,500</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Smart vs Static</div>
                          <div className="text-green-400 font-medium">+₹4,230 (+12.9%)</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Current Value</div>
                          <div className="text-cyan-400 font-medium">₹37,050</div>
                        </div>
                        <div>
                          <div className="text-slate-400">AI Decisions</div>
                          <div className="text-purple-400 font-medium">156 this month</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Smart SIP Item 6 - Inactive */}
                <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-cyan-500/30 transition-all opacity-75">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                          <span className="font-semibold text-white">SBI Small Cap Fund</span>
                        </div>
                        <span className="text-xs bg-slate-500/20 text-slate-400 px-2 py-1 rounded-full">INACTIVE</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-400">Monthly SIP</div>
                          <div className="text-white font-medium">₹3,000</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Smart vs Static</div>
                          <div className="text-green-400 font-medium">+₹12,340 (+18.5%)</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Final Value</div>
                          <div className="text-cyan-400 font-medium">₹79,180</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Duration</div>
                          <div className="text-purple-400 font-medium">24 months</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Smart SIP Item 7 - Inactive */}
                <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-cyan-500/30 transition-all opacity-75">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                          <span className="font-semibold text-white">Franklin India Prima</span>
                        </div>
                        <span className="text-xs bg-slate-500/20 text-slate-400 px-2 py-1 rounded-full">INACTIVE</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-400">Monthly SIP</div>
                          <div className="text-white font-medium">₹4,000</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Smart vs Static</div>
                          <div className="text-green-400 font-medium">+₹8,920 (+15.2%)</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Final Value</div>
                          <div className="text-cyan-400 font-medium">₹67,640</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Duration</div>
                          <div className="text-purple-400 font-medium">18 months</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Smart SIP Item 8 - Active */}
                <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="font-semibold text-white">Nippon India Growth</span>
                        </div>
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">ACTIVE</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-400">Monthly SIP</div>
                          <div className="text-white font-medium">₹6,000</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Smart vs Static</div>
                          <div className="text-green-400 font-medium">+₹5,680 (+16.8%)</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Current Value</div>
                          <div className="text-cyan-400 font-medium">₹39,450</div>
                        </div>
                        <div>
                          <div className="text-slate-400">AI Decisions</div>
                          <div className="text-purple-400 font-medium">89 this month</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Analysis Section */}
            <div className="mb-8">
              {/* Portfolio Header */}
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
                  Portfolio Analysis
                </h2>
                <p className="text-slate-400 text-lg mx-auto text-center">
                  Comprehensive insights into your investment portfolio with detailed performance metrics and fund analysis
                </p>
              </div>

              {/* Portfolio Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Total Investment */}
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-xl p-4 border border-blue-500/20 hover:border-blue-500/40 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-blue-400 text-xs font-medium">Invested</div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">₹2,58,000</div>
                  <div className="text-slate-300 text-sm font-medium mb-1">Total Investment</div>
                  <div className="text-xs text-slate-400">Across 6 funds</div>
                </div>

                {/* Current Value */}
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-xl p-4 border border-green-500/20 hover:border-green-500/40 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-green-400 text-xs font-medium">Current</div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">₹2,86,950</div>
                  <div className="text-slate-300 text-sm font-medium mb-1">Current Value</div>
                  <div className="text-xs text-slate-400">As of today</div>
                </div>

                {/* Absolute Returns */}
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-purple-400 text-xs font-medium">Absolute</div>
                  </div>
                  <div className="text-2xl font-bold text-green-400 mb-1">+₹28,950</div>
                  <div className="text-slate-300 text-sm font-medium mb-1">Absolute Returns</div>
                  <div className="text-xs text-green-400">+11.22% overall</div>
                </div>

                {/* XIRR */}
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl rounded-xl p-4 border border-orange-500/20 hover:border-orange-500/40 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-orange-400" />
                    </div>
                    <div className="text-orange-400 text-xs font-medium">XIRR</div>
                  </div>
                  <div className="text-2xl font-bold text-orange-400 mb-1">14.8%</div>
                  <div className="text-slate-300 text-sm font-medium mb-1">Annualized XIRR</div>
                  <div className="text-xs text-slate-400">Time-weighted return</div>
                </div>
              </div>

              {/* Additional Portfolio Metrics */}
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-cyan-400">18 months</div>
                    <div className="text-xs text-slate-400">Investment Duration</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-400">6</div>
                    <div className="text-xs text-slate-400">Active Funds</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-400">₹14,333</div>
                    <div className="text-xs text-slate-400">Avg Monthly SIP</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-400">85.2%</div>
                    <div className="text-xs text-slate-400">Large Cap Allocation</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-yellow-400">14.8%</div>
                    <div className="text-xs text-slate-400">Multi Cap Allocation</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-emerald-400">₹1,608</div>
                    <div className="text-xs text-slate-400">Monthly Gain</div>
                  </div>
                </div>
              </div>

              {/* Fund Analysis Section */}
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                      <PieChart className="w-5 h-5 text-blue-400" />
                      <span>Fund-wise Analysis</span>
                    </h3>
                    <div className="text-sm text-slate-400">Individual fund performance and metrics</div>
                  </div>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>Complete Portfolio Analysis</span>
                  </button>
                </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Fund 1 - Axis Bluechip */}
                <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-white">Axis Bluechip Fund</h4>
                      <div className="text-sm text-slate-400">Large Cap • Equity</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 text-sm font-medium">+14.2%</div>
                      <div className="text-xs text-slate-400">1Y Returns</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div>
                      <div className="text-slate-400">Current Value</div>
                      <div className="text-white font-medium">₹67,850</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Investment</div>
                      <div className="text-white font-medium">₹60,000</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Gain/Loss</div>
                      <div className="text-green-400 font-medium">+₹7,850</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Units</div>
                      <div className="text-white font-medium">1,247.3</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-400 py-2 rounded-lg font-medium transition-all hover:scale-105 border border-blue-500/20 hover:border-blue-500/40 flex items-center justify-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs">Analyze</span>
                    </button>
                    <button className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-400 py-2 rounded-lg font-medium transition-all hover:scale-105 border border-green-500/20 hover:border-green-500/40 flex items-center justify-center space-x-1">
                      <Target className="w-3 h-3" />
                      <span className="text-xs">Invest More</span>
                    </button>
                  </div>
                </div>

                {/* Fund 2 - ICICI Prudential */}
                <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-white">ICICI Prudential Bluechip</h4>
                      <div className="text-sm text-slate-400">Large Cap • Equity</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 text-sm font-medium">+12.8%</div>
                      <div className="text-xs text-slate-400">1Y Returns</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div>
                      <div className="text-slate-400">Current Value</div>
                      <div className="text-white font-medium">₹45,230</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Investment</div>
                      <div className="text-white font-medium">₹42,000</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Gain/Loss</div>
                      <div className="text-green-400 font-medium">+₹3,230</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Units</div>
                      <div className="text-white font-medium">892.5</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-400 py-2 rounded-lg font-medium transition-all hover:scale-105 border border-blue-500/20 hover:border-blue-500/40 flex items-center justify-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs">Analyze</span>
                    </button>
                    <button className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-400 py-2 rounded-lg font-medium transition-all hover:scale-105 border border-green-500/20 hover:border-green-500/40 flex items-center justify-center space-x-1">
                      <Target className="w-3 h-3" />
                      <span className="text-xs">Invest More</span>
                    </button>
                  </div>
                </div>

                {/* Fund 3 - HDFC Top 100 */}
                <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-white">HDFC Top 100 Fund</h4>
                      <div className="text-sm text-slate-400">Large Cap • Equity</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 text-sm font-medium">+16.5%</div>
                      <div className="text-xs text-slate-400">1Y Returns</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div>
                      <div className="text-slate-400">Current Value</div>
                      <div className="text-white font-medium">₹58,920</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Investment</div>
                      <div className="text-white font-medium">₹54,000</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Gain/Loss</div>
                      <div className="text-green-400 font-medium">+₹4,920</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Units</div>
                      <div className="text-white font-medium">1,156.8</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-400 py-2 rounded-lg font-medium transition-all hover:scale-105 border border-blue-500/20 hover:border-blue-500/40 flex items-center justify-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs">Analyze</span>
                    </button>
                    <button className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-400 py-2 rounded-lg font-medium transition-all hover:scale-105 border border-green-500/20 hover:border-green-500/40 flex items-center justify-center space-x-1">
                      <Target className="w-3 h-3" />
                      <span className="text-xs">Invest More</span>
                    </button>
                  </div>
                </div>

                {/* Fund 4 - Mirae Asset */}
                <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-white">Mirae Asset Large Cap</h4>
                      <div className="text-sm text-slate-400">Large Cap • Equity</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 text-sm font-medium">+13.7%</div>
                      <div className="text-xs text-slate-400">1Y Returns</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div>
                      <div className="text-slate-400">Current Value</div>
                      <div className="text-white font-medium">₹38,450</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Investment</div>
                      <div className="text-white font-medium">₹36,000</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Gain/Loss</div>
                      <div className="text-green-400 font-medium">+₹2,450</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Units</div>
                      <div className="text-white font-medium">743.2</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-400 py-2 rounded-lg font-medium transition-all hover:scale-105 border border-blue-500/20 hover:border-blue-500/40 flex items-center justify-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs">Analyze</span>
                    </button>
                    <button className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-400 py-2 rounded-lg font-medium transition-all hover:scale-105 border border-green-500/20 hover:border-green-500/40 flex items-center justify-center space-x-1">
                      <Target className="w-3 h-3" />
                      <span className="text-xs">Invest More</span>
                    </button>
                  </div>
                </div>

                {/* Fund 5 - Kotak Standard */}
                <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-white">Kotak Standard Multicap</h4>
                      <div className="text-sm text-slate-400">Multi Cap • Equity</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 text-sm font-medium">+15.9%</div>
                      <div className="text-xs text-slate-400">1Y Returns</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div>
                      <div className="text-slate-400">Current Value</div>
                      <div className="text-white font-medium">₹37,050</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Investment</div>
                      <div className="text-white font-medium">₹30,000</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Gain/Loss</div>
                      <div className="text-green-400 font-medium">+₹7,050</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Units</div>
                      <div className="text-white font-medium">689.4</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-400 py-2 rounded-lg font-medium transition-all hover:scale-105 border border-blue-500/20 hover:border-blue-500/40 flex items-center justify-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs">Analyze</span>
                    </button>
                    <button className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-400 py-2 rounded-lg font-medium transition-all hover:scale-105 border border-green-500/20 hover:border-green-500/40 flex items-center justify-center space-x-1">
                      <Target className="w-3 h-3" />
                      <span className="text-xs">Invest More</span>
                    </button>
                  </div>
                </div>

                {/* Fund 6 - Nippon India */}
                <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-white">Nippon India Growth</h4>
                      <div className="text-sm text-slate-400">Large Cap • Equity</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 text-sm font-medium">+18.2%</div>
                      <div className="text-xs text-slate-400">1Y Returns</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div>
                      <div className="text-slate-400">Current Value</div>
                      <div className="text-white font-medium">₹39,450</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Investment</div>
                      <div className="text-white font-medium">₹36,000</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Gain/Loss</div>
                      <div className="text-green-400 font-medium">+₹3,450</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Units</div>
                      <div className="text-white font-medium">821.7</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-400 py-2 rounded-lg font-medium transition-all hover:scale-105 border border-blue-500/20 hover:border-blue-500/40 flex items-center justify-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs">Analyze</span>
                    </button>
                    <button className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-400 py-2 rounded-lg font-medium transition-all hover:scale-105 border border-green-500/20 hover:border-green-500/40 flex items-center justify-center space-x-1">
                      <Target className="w-3 h-3" />
                      <span className="text-xs">Invest More</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Portfolio Summary */}
              <div className="mt-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">₹2,86,950</div>
                    <div className="text-sm text-slate-400">Total Portfolio Value</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">₹2,58,000</div>
                    <div className="text-sm text-slate-400">Total Investment</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">+₹28,950</div>
                    <div className="text-sm text-slate-400">Total Gain</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">+11.2%</div>
                    <div className="text-sm text-slate-400">Overall Returns</div>
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Bottom Stats */}
            <div className="flex items-center justify-center space-x-8 text-center">
              <div>
                <div className="text-2xl font-bold text-cyan-400">1000+</div>
                <div className="text-sm text-slate-400">AI Models Running</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">24/7</div>
                <div className="text-sm text-slate-400">Market Monitoring</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">&lt; 1ms</div>
                <div className="text-sm text-slate-400">Decision Latency</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Dashboard Market Ticker */}
      <DashboardTicker />
      </div>
    </div>
  );
};

export default SIPBreweryDashboard;
