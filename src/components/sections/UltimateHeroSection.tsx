'use client';

import { useState, useEffect, useRef } from 'react';

interface UltimateHeroSectionProps {
  mousePosition: { x: number; y: number };
  scrollY: number;
}

export default function UltimateHeroSection({ mousePosition, scrollY }: UltimateHeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={heroRef} className="min-h-screen flex items-center justify-center relative pt-24" style={{
      transform: `translateY(${scrollY * 0.05}px)`
    }}>
      <div className="text-center max-w-8xl mx-auto px-8 relative z-10">
        
        {/* COLOSSAL TITLE WITH 8-COLOR GRADIENT */}
        <div className="relative mb-20">
          <div className="absolute -inset-32 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 via-pink-500/30 to-green-500/30 rounded-full blur-3xl animate-pulse" style={{
            animationDuration: '6s'
          }}></div>
          
          <h1 className="relative font-black leading-none mb-12" style={{
            fontSize: 'clamp(4rem, 12vw, 12rem)',
            background: `
              linear-gradient(45deg, 
                #00f9ff 0%, 
                #ff0080 12.5%, 
                #39ff14 25%, 
                #8b5cf6 37.5%, 
                #f59e0b 50%, 
                #ff6b6b 62.5%, 
                #4ecdc4 75%, 
                #45b7d1 87.5%, 
                #00f9ff 100%
              )
            `,
            backgroundSize: '800% 800%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientShift 4s ease-in-out infinite',
            textShadow: '0 0 120px rgba(0, 249, 255, 1)',
            filter: 'drop-shadow(0 0 80px rgba(255, 255, 255, 0.4))',
            transform: 'perspective(1200px) rotateX(15deg) rotateY(-5deg)',
            transformStyle: 'preserve-3d'
          }}>
            SIPBrewery
          </h1>
          
          {/* 3D PERSPECTIVE SUBTITLE */}
          <div className="relative mb-16">
            <p className="text-4xl md:text-5xl lg:text-6xl font-light mb-8" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 25%, #fef3c7 50%, #f3e8ff 75%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 60px rgba(255, 255, 255, 1)',
              transform: 'perspective(1000px) rotateX(8deg)',
              filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.3))'
            }}>
              The World's Most Advanced <span className="font-bold text-cyan-400">AI-Powered</span> Investment Platform
            </p>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed" style={{
              textShadow: '0 0 30px rgba(255, 255, 255, 0.4)'
            }}>
              Powered by <span className="font-bold text-green-400">Artificial Super Intelligence</span> • 
              Trusted by <span className="font-bold text-purple-400">150,000+</span> Elite Investors • 
              Managing <span className="font-bold text-yellow-400">$2.5B+</span> in Premium Assets
            </p>
          </div>
          
          {/* DUAL SPECTACULAR CTA BUTTONS */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-20">
            <button className="group relative px-16 py-8 text-2xl font-bold text-white rounded-3xl overflow-hidden transition-all duration-700 hover:scale-110 hover:rotate-2" style={{
              background: `
                linear-gradient(45deg, 
                  #00f9ff, #ff0080, #39ff14, #8b5cf6, #f59e0b, #ff6b6b, #4ecdc4, #45b7d1, #00f9ff
                )
              `,
              backgroundSize: '600% 600%',
              animation: 'gradientShift 3s ease-in-out infinite',
              boxShadow: `
                0 0 60px rgba(0, 249, 255, 0.6),
                0 0 120px rgba(255, 0, 128, 0.4),
                inset 0 4px 0 rgba(255, 255, 255, 0.4),
                0 25px 50px rgba(0, 0, 0, 0.4)
              `,
              transform: 'perspective(800px) rotateX(10deg)'
            }}>
              <span className="relative z-10 flex items-center space-x-4">
                <span className="text-3xl">🚀</span>
                <span>Start Your AI Journey</span>
                <span className="group-hover:translate-x-2 transition-transform text-2xl">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/60 to-purple-500/60 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </button>
            
            <button className="group relative px-16 py-8 text-2xl font-bold text-white rounded-3xl border-3 border-white/40 backdrop-blur-2xl overflow-hidden transition-all duration-700 hover:scale-110 hover:-rotate-2 hover:border-cyan-400/70" style={{
              background: 'rgba(0, 0, 0, 0.4)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
              transform: 'perspective(800px) rotateX(10deg)'
            }}>
              <span className="relative z-10 flex items-center space-x-4">
                <span className="text-3xl">📊</span>
                <span>Experience Live Demo</span>
                <span className="group-hover:scale-125 transition-transform text-2xl">↗</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>
          
          {/* PREMIUM STATS DASHBOARD */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: '$2.5B+', label: 'Assets Under Management', icon: '💰', color: 'from-cyan-400 to-blue-600', metric: 'AUM' },
              { value: '150K+', label: 'Active Investors', icon: '👥', color: 'from-green-400 to-emerald-600', metric: 'Users' },
              { value: '99.99%', label: 'Platform Uptime', icon: '⚡', color: 'from-purple-400 to-pink-600', metric: 'Reliability' },
              { value: '24/7', label: 'AI Monitoring', icon: '🤖', color: 'from-yellow-400 to-orange-600', metric: 'Support' }
            ].map((stat, i) => (
              <div key={i} className="group relative">
                <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500`}></div>
                <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-6 md:p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105" style={{
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}>
                  <div className="text-3xl md:text-4xl mb-4">{stat.icon}</div>
                  <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}>
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-base md:text-lg font-medium mb-2">{stat.label}</div>
                  <div className="text-white/50 text-sm uppercase tracking-wider">{stat.metric}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
