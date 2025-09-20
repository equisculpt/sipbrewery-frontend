'use client';

import React, { useState, useRef, useEffect } from 'react';
import SearchInput from './ui/SearchInput';
import { navigationMenu } from '../config/navigationConfig';
import CompleteMegaMenu from './CompleteMegaMenu';

interface UnifiedNavigationProps {
  isAuthenticated?: boolean;
  onSignOut?: () => void;
  onSignIn?: () => void;
  onSignUp?: () => void;
}

export default function UnifiedNavigation({ 
  isAuthenticated = false, 
  onSignOut, 
  onSignIn, 
  onSignUp 
}: UnifiedNavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Handle dropdown hover - EXACT logic from home page
  const handleMouseEnter = (index: number) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    if (navigationMenu[index].dropdown) {
      setActiveDropdown(index);
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    const timeout = setTimeout(() => {
      if (!isHovering) {
        setActiveDropdown(null);
      }
    }, 100);
    setHoverTimeout(timeout);
  };

  const handleMegaMenuEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setIsHovering(true);
  };

  const handleMegaMenuLeave = () => {
    setIsHovering(false);
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 100);
    setHoverTimeout(timeout);
  };

  return (
    <>
      {/* ENTERPRISE NAVIGATION BAR - EXACT copy from home page */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" 
        style={{
          background: activeDropdown !== null 
            ? 'linear-gradient(135deg, rgba(13, 15, 26, 0.95) 0%, rgba(17, 24, 39, 0.98) 100%)' 
            : 'linear-gradient(135deg, rgba(13, 15, 26, 0.85) 0%, rgba(17, 24, 39, 0.9) 50%, rgba(30, 41, 59, 0.85) 100%)',
          backdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: activeDropdown !== null ? 'none' : '1px solid rgba(100, 116, 139, 0.1)', // Remove border for seamless dropdown connection
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}
      >
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

            {/* NAVIGATION MENU */}
            <div className="flex items-center space-x-2">
              {navigationMenu.map((item, i) => (
                <div key={i} className="relative group">
                  <button
                    className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group ${
                      activeDropdown === i 
                        ? 'text-green-300 shadow-lg' 
                        : 'text-white hover:text-green-400'
                    }`}
                    style={{
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontWeight: activeDropdown === i ? 600 : 500,
                      letterSpacing: '-0.01em',
                      background: activeDropdown === i 
                        ? '#ffffff' // PayTM Money style: pure white background for active tab
                        : 'transparent',
                      border: activeDropdown === i 
                        ? '1px solid #d1d5db' // Slightly darker border for better definition
                        : 'none',
                      borderBottom: activeDropdown === i 
                        ? '1px solid #ffffff' // White border to hide dropdown border
                        : 'none',
                      borderRadius: activeDropdown === i 
                        ? '8px 8px 0 0' // PayTM Money style: rounded top corners only
                        : '0',
                      outline: 'none',
                      boxShadow: activeDropdown === i 
                        ? '0 -2px 8px rgba(0,0,0,0.1)' // Subtle shadow above the tab
                        : 'none',
                      padding: '1rem 2rem', // Wider padding like PayTM Money
                      marginBottom: activeDropdown === i ? '-1px' : '0', // Overlap with dropdown border
                      position: 'relative',
                      overflow: 'hidden',
                      color: activeDropdown === i ? '#1f2937' : 'white', // Dark text for active tab
                      zIndex: activeDropdown === i ? 51 : 'auto' // Ensure tab appears above dropdown border
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
                      handleMouseEnter(i);
                    }}
                    onMouseLeave={(e) => {
                      if (activeDropdown !== i) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.backdropFilter = 'none';
                        (e.currentTarget.style as any).WebkitBackdropFilter = 'none';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                      handleMouseLeave();
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
              <div className="group w-full max-w-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/15 via-cyan-400/20 to-green-400/15 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-700 pointer-events-none"></div>
                <SearchInput
                  placeholder="Search funds, stocks, insights..."
                  ariaLabel="Global search"
                  className="relative"
                  inputClassName="w-full py-4 bg-transparent text-white placeholder-gray-400 border border-white/10 rounded-2xl focus:placeholder-gray-500"
                  debounceMs={300}
                />
              </div>
            </div>

            {/* AUTHENTICATION BUTTONS */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <button
                  onClick={onSignOut}
                  className="relative group px-8 py-3 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105"
                  style={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    background: 'linear-gradient(135deg, rgba(239,68,68,0.8) 0%, rgba(185,28,28,0.9) 100%)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    boxShadow: '0 8px 32px rgba(239,68,68,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                  }}
                >
                  <span className="relative z-10">Sign Out</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={onSignIn}
                    className="relative group px-6 py-3 rounded-xl font-medium text-white hover:text-green-300 transition-all duration-300"
                    style={{
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={onSignUp}
                    className="relative group px-8 py-3 rounded-2xl font-semibold text-black transition-all duration-300 hover:scale-105"
                    style={{
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      background: 'linear-gradient(135deg, #00FF87 0%, #4AE3F7 100%)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      border: '1px solid rgba(0,255,135,0.3)',
                      boxShadow: '0 8px 32px rgba(0,255,135,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                    }}
                  >
                    <span className="relative z-10">Sign Up</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* MEGA MENU DROPDOWN */}
      <CompleteMegaMenu
        activeDropdown={activeDropdown}
        isHovering={isHovering}
        onMouseEnter={handleMegaMenuEnter}
        onMouseLeave={handleMegaMenuLeave}
      />

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes shimmerSweep {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </>
  );
}
