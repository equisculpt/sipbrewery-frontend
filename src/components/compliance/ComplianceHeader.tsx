'use client';

import React, { useState, useEffect } from 'react';
import { COMPLIANCE_CONSTANTS } from '../../utils/complianceConstants';

const ComplianceHeader: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<Array<{left: number, top: number, duration: number, delay: number}>>([]);
  const [lines, setLines] = useState<Array<{x1: number, y1: number, x2: number, y2: number}>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsClient(true);
    // Generate spectacular particles
    const particleData = Array.from({length: 100}).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 6,
      delay: Math.random() * 3
    }));
    setParticles(particleData);

    // Generate neural network lines
    const lineData = Array.from({length: 25}).map(() => ({
      x1: Math.random() * 100,
      y1: Math.random() * 100,
      x2: Math.random() * 100,
      y2: Math.random() * 100
    }));
    setLines(lineData);

    // Mouse tracking for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <footer className="relative min-h-screen overflow-hidden" style={{
      background: `
        radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%),
        linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)
      `
    }}>
      {/* WORLD-CLASS BACKGROUND SYSTEM */}
      <div className="absolute inset-0">
        {/* Dynamic Gradient Mesh */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-pink-500/20 via-transparent to-green-500/20 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-blue-500/20 via-transparent to-yellow-500/20 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Spectacular Floating Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-600/30 rounded-full blur-3xl" style={{
          animation: 'float 12s ease-in-out infinite',
          filter: 'blur(40px)'
        }}></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-r from-purple-400/30 to-pink-600/30 rounded-full blur-3xl" style={{
          animation: 'float 15s ease-in-out infinite reverse',
          filter: 'blur(40px)'
        }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400/30 to-emerald-600/30 rounded-full blur-3xl" style={{
          animation: 'float 10s ease-in-out infinite',
          filter: 'blur(40px)'
        }}></div>
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-yellow-400/30 to-orange-600/30 rounded-full blur-3xl" style={{
          animation: 'float 8s ease-in-out infinite reverse',
          filter: 'blur(40px)'
        }}></div>
        
        {/* Premium Particle System */}
        {isClient && particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `twinkle ${particle.duration}s ease-in-out infinite ${particle.delay}s`
            }}
          />
        ))}
        
        {/* Neural Network Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="footerLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f9ff" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {isClient && lines.map((line, i) => (
            <line
              key={i}
              x1={`${line.x1}%`}
              y1={`${line.y1}%`}
              x2={`${line.x2}%`}
              y2={`${line.y2}%`}
              stroke="url(#footerLineGradient)"
              strokeWidth="0.5"
              className="animate-pulse"
            />
          ))}
        </svg>
      </div>
      
      {/* WORLD-CLASS FOOTER CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-12 py-24">
        
        {/* SPECTACULAR HERO SECTION */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h1 className="text-8xl font-black mb-8" style={{
              background: `
                linear-gradient(45deg, 
                  #ff0080 0%, 
                  #ff8c00 15%, 
                  #40e0d0 30%, 
                  #9370db 45%, 
                  #00ff00 60%, 
                  #ff1493 75%, 
                  #00bfff 90%, 
                  #ff0080 100%
                )
              `,
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientShift 4s ease-in-out infinite',
              textShadow: '0 0 80px rgba(255, 0, 128, 0.8)',
              filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.3))'
            }}>
              SIPBrewery
            </h1>
            
            {/* Holographic Subtitle */}
            <div className="relative">
              <p className="text-3xl font-light text-white/90 mb-4" style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
              }}>
                The Future of <span className="font-bold text-cyan-400">Artificial Super Intelligence</span> Investing
              </p>
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl -z-10 animate-pulse"></div>
            </div>
            
            {/* Premium Stats Dashboard */}
            <div className="grid grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
              {[
                { value: '$2.5B+', label: 'Assets Under Management', color: 'from-cyan-400 to-blue-600' },
                { value: '150K+', label: 'Active Investors', color: 'from-green-400 to-emerald-600' },
                { value: '99.99%', label: 'Platform Uptime', color: 'from-purple-400 to-pink-600' },
                { value: '24/7', label: 'AI Monitoring', color: 'from-yellow-400 to-orange-600' }
              ].map((stat, i) => (
                <div key={i} className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                  <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-white/70 text-sm font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* SPECTACULAR MAIN FOOTER */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* PREMIUM BRAND SECTION */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <h3 className="text-5xl font-black" style={{
                background: `
                  linear-gradient(135deg, 
                    #00f9ff 0%, 
                    #39ff14 25%, 
                    #ff0080 50%, 
                    #8000ff 75%, 
                    #00f9ff 100%
                  )
                `,
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradientShift 6s ease-in-out infinite',
                textShadow: '0 0 40px rgba(0, 249, 255, 0.5)'
              }}>
                SIPBrewery
              </h3>
              <div className="relative">
                <p className="text-xl text-gray-200 leading-relaxed font-light" style={{
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                }}>
                  The world's most advanced <span className="font-bold text-cyan-400">AI-powered investment platform</span> 
                  designed for the future of smart investing. Powered by <span className="font-bold text-green-400">Artificial Super Intelligence</span> 
                  and trusted by sophisticated investors worldwide.
                </p>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 to-green-500/10 rounded-lg blur-lg -z-10"></div>
              </div>
              
              {/* PREMIUM STATS */}
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-cyan-400">$2B+</div>
                  <div className="text-xs text-gray-400 mt-1">Assets Analyzed</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-green-400">50K+</div>
                  <div className="text-xs text-gray-400 mt-1">Active Users</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-purple-400">99.9%</div>
                  <div className="text-xs text-gray-400 mt-1">Uptime</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* PREMIUM PLATFORM LINKS */}
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-white mb-6" style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
            }}>Platform</h4>
            <div className="space-y-4">
              {[
                { name: '🚀 Smart SIP', desc: 'AI-Powered Investing' },
                { name: '🧠 AI Analysis', desc: 'Deep Market Intelligence' },
                { name: '📊 Portfolio Optimizer', desc: 'Quantum Optimization' },
                { name: '💎 Market Insights', desc: 'Real-time Analytics' },
                { name: '🌌 Quantum Timeline', desc: 'Impossible Features' }
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer p-3 rounded-lg hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-300 border border-transparent hover:border-cyan-500/30">
                  <div className="text-gray-300 group-hover:text-cyan-400 font-medium transition-colors">{item.name}</div>
                  <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* PREMIUM SUPPORT SECTION */}
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-white mb-6" style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
            }}>Support</h4>
            <div className="space-y-4">
              {[
                { name: '📚 Help Center', desc: '24/7 Expert Support' },
                { name: '💬 Contact Support', desc: 'Instant Assistance' },
                { name: '🎓 Educational Resources', desc: 'Learn & Grow' },
                { name: '📱 Mobile App', desc: 'Trade Anywhere' },
                { name: '🔐 Security Center', desc: 'Military-Grade Protection' }
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer p-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-300 border border-transparent hover:border-purple-500/30">
                  <div className="text-gray-300 group-hover:text-purple-400 font-medium transition-colors">{item.name}</div>
                  <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* WORLD-CLASS COMPLIANCE SHOWCASE */}
        <div className="relative mt-32">
          {/* Spectacular Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-gray-900/90 to-black/80 rounded-3xl blur-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-green-500/10 rounded-3xl"></div>
          
          <div className="relative backdrop-blur-2xl rounded-3xl p-12 border border-white/20" style={{
            background: `
              linear-gradient(135deg, 
                rgba(0, 0, 0, 0.8) 0%, 
                rgba(30, 30, 60, 0.9) 50%, 
                rgba(0, 0, 0, 0.8) 100%
              )
            `,
            boxShadow: `
              0 0 100px rgba(0, 249, 255, 0.3),
              0 0 200px rgba(128, 0, 255, 0.2),
              inset 0 2px 0 rgba(255, 255, 255, 0.2),
              inset 0 -2px 0 rgba(0, 0, 0, 0.5)
            `
          }}>
            {/* SPECTACULAR COMPLIANCE HEADER */}
            <div className="text-center mb-16">
              <div className="relative inline-block">
                <h2 className="text-6xl font-black mb-6" style={{
                  background: `
                    linear-gradient(45deg, 
                      #10b981 0%, 
                      #06b6d4 25%, 
                      #8b5cf6 50%, 
                      #f59e0b 75%, 
                      #10b981 100%
                    )
                  `,
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradientShift 6s ease-in-out infinite',
                  textShadow: '0 0 60px rgba(16, 185, 129, 0.8)',
                  filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))'
                }}>
                  🏛️ REGULATORY EXCELLENCE
                </h2>
                <div className="absolute -inset-8 bg-gradient-to-r from-green-500/20 via-cyan-500/20 to-purple-500/20 rounded-3xl blur-3xl -z-10 animate-pulse"></div>
              </div>
              
              <p className="text-2xl font-light text-white/90 max-w-4xl mx-auto leading-relaxed" style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
              }}>
                World-class compliance with <span className="font-bold text-green-400">Indian financial regulations</span>, 
                <span className="font-bold text-cyan-400"> international standards</span>, and 
                <span className="font-bold text-purple-400">cutting-edge security protocols</span>
              </p>
              
              {/* Compliance Badges */}
              <div className="flex justify-center items-center gap-6 mt-8">
                {[
                  { name: 'SEBI', color: 'from-green-400 to-emerald-600', icon: '🛡️' },
                  { name: 'AMFI', color: 'from-blue-400 to-cyan-600', icon: '🏆' },
                  { name: 'ISO 27001', color: 'from-purple-400 to-pink-600', icon: '🔒' },
                  { name: 'RBI Guidelines', color: 'from-yellow-400 to-orange-600', icon: '⚡' }
                ].map((badge, i) => (
                  <div key={i} className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${badge.color} rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300`}></div>
                    <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/20 hover:border-white/40 transition-all duration-300">
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <div className={`text-sm font-bold bg-gradient-to-r ${badge.color} bg-clip-text text-transparent`}>
                        {badge.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* PREMIUM AMFI REGISTRATION */}
            <div className="flex flex-col lg:flex-row items-center justify-between mb-8 p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div className="relative">
                  <div className="w-6 h-6 bg-green-400 rounded-full animate-pulse" style={{
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.3)'
                  }}></div>
                  <div className="absolute inset-0 w-6 h-6 bg-green-400 rounded-full animate-ping opacity-20"></div>
                </div>
                <div>
                  <div className="text-green-400 font-bold text-lg">
                    AMFI Registered Mutual Fund Distributor
                  </div>
                  <div className="text-green-300 text-sm font-medium">
                    Registration Number: {COMPLIANCE_CONSTANTS.AMFI.REGISTRATION_NUMBER}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold border border-blue-500/30" style={{
                  boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)'
                }}>
                  {COMPLIANCE_CONSTANTS.BUSINESS_MODEL.NOT_ADVISOR}
                </div>
                <div className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold border border-purple-500/30" style={{
                  boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)'
                }}>
                  SEBI Compliant Platform
                </div>
                <div className="bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-500/30" style={{
                  boxShadow: '0 0 15px rgba(234, 179, 8, 0.3)'
                }}>
                  ISO 27001 Certified
                </div>
              </div>
            </div>
            
            {/* ELEGANT DISCLAIMERS */}
            <div className="text-center p-6 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/30">
              <p className="text-gray-300 text-sm leading-relaxed max-w-5xl mx-auto" style={{
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}>
                <span className="text-yellow-400 text-lg">⚠️</span> 
                <span className="font-semibold text-yellow-300">{COMPLIANCE_CONSTANTS.SEBI_DISCLAIMERS.MARKET_RISK}</span>
                <span className="mx-3 text-gray-500">•</span>
                <span className="font-semibold text-yellow-300">{COMPLIANCE_CONSTANTS.SEBI_DISCLAIMERS.PAST_PERFORMANCE}</span>
                <span className="mx-3 text-gray-500">•</span>
                <span className="text-gray-400">This platform provides educational content and analysis tools only. All investment decisions should be made independently after consulting with qualified financial advisors.</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* SPECTACULAR COPYRIGHT */}
        <div className="mt-12 pt-8 border-t border-gray-700/50 text-center">
          <div className="space-y-4">
            <p className="text-gray-400 text-sm" style={{
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
            }}>
              © 2024 SIPBrewery. All rights reserved. | Powered by <span className="text-cyan-400 font-semibold">Artificial Super Intelligence</span>
            </p>
            <div className="flex justify-center items-center space-x-6 text-xs text-gray-500">
              <span className="hover:text-cyan-400 transition-colors cursor-pointer">Privacy Policy</span>
              <span className="text-gray-700">•</span>
              <span className="hover:text-cyan-400 transition-colors cursor-pointer">Terms of Service</span>
              <span className="text-gray-700">•</span>
              <span className="hover:text-cyan-400 transition-colors cursor-pointer">Risk Disclosure</span>
              <span className="text-gray-700">•</span>
              <span className="hover:text-cyan-400 transition-colors cursor-pointer">Investor Charter</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ComplianceHeader;
