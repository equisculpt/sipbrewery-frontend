'use client';

import { useState, useEffect } from 'react';
import UltimateHeroSection from '@/components/sections/UltimateHeroSection';
import MarketTicker from '@/components/sections/MarketTicker';
import BackgroundEffects from '@/components/sections/BackgroundEffects';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    const marketInterval = setInterval(() => {
      setMarketData(prev => prev.map(item => ({
        ...item,
        price: item.price + (Math.random() - 0.5) * 10,
        change: item.change + (Math.random() - 0.5) * 5,
        changePercent: item.changePercent + (Math.random() - 0.5) * 0.5
      })));
    }, 3000);
    
    return () => {
      clearInterval(timeInterval);
      clearInterval(marketInterval);
    };
  }, [isClient]);
  
  if (!isLoaded || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0a2e 50%, #1a1a4e 100%)'
      }}>
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-2xl font-bold">Loading Spectacular Experience...</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen relative overflow-hidden text-white" style={{
      background: `
        radial-gradient(circle at 20% 30%, rgba(0, 249, 255, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(255, 0, 128, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 40% 90%, rgba(128, 0, 255, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 60% 10%, rgba(0, 255, 0, 0.1) 0%, transparent 50%),
        linear-gradient(135deg, #000000 0%, #0a0a2e 25%, #1a1a4e 50%, #2a2a6e 75%, #000000 100%)
      `,
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      
      {/* SPECTACULAR BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" style={{
          animation: 'float 15s ease-in-out infinite',
          filter: 'blur(60px)'
        }}></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{
          animation: 'float 18s ease-in-out infinite reverse',
          filter: 'blur(60px)'
        }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400/20 to-emerald-600/20 rounded-full blur-3xl animate-pulse" style={{
          animation: 'float 12s ease-in-out infinite',
          filter: 'blur(60px)'
        }}></div>
        
        {/* Particle System */}
        {Array.from({length: 100}).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* REAL-TIME MARKET TICKER */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl px-8 py-4 border border-cyan-500/30" style={{
          boxShadow: '0 0 40px rgba(0, 249, 255, 0.3)'
        }}>
          <div className="flex items-center space-x-8">
            {marketData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 group">
                <span className="font-bold text-white">{item.symbol}:</span>
                <span className="font-mono text-cyan-400">₹{item.price.toFixed(2)}</span>
                <span className={`flex items-center space-x-1 ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  <span>{item.change >= 0 ? '▲' : '▼'}</span>
                  <span>{Math.abs(item.change).toFixed(2)}</span>
                  <span>({(item.changePercent * 100).toFixed(2)}%)</span>
                </span>
              </div>
            ))}
            <div className="flex items-center space-x-2 text-cyan-400">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Market Time: {currentTime?.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* SPECTACULAR HERO SECTION */}
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center max-w-6xl mx-auto px-8">
          
          {/* MASSIVE TITLE */}
          <div className="relative mb-12">
            <h1 className="text-9xl font-black mb-8" style={{
              background: `
                linear-gradient(45deg, 
                  #ff0080 0%, 
                  #ff8c00 12%, 
                  #40e0d0 25%, 
                  #9370db 37%, 
                  #00ff00 50%, 
                  #ff1493 62%, 
                  #00bfff 75%, 
                  #ffd700 87%, 
                  #ff0080 100%
                )
              `,
              backgroundSize: '800% 800%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientShift 3s ease-in-out infinite',
              textShadow: '0 0 100px rgba(255, 0, 128, 1)',
              filter: 'drop-shadow(0 0 50px rgba(255, 255, 255, 0.5))'
            }}>
              SIPBrewery
            </h1>
            
            {/* HOLOGRAPHIC SUBTITLE */}
            <div className="relative">
              <p className="text-4xl font-light mb-6" style={{
                textShadow: '0 0 30px rgba(255, 255, 255, 0.8)'
              }}>
                The World's Most Advanced <span className="font-bold text-cyan-400">AI-Powered</span> Investment Platform
              </p>
              <p className="text-2xl text-gray-300 mb-8" style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
              }}>
                Powered by <span className="font-bold text-green-400">Artificial Super Intelligence</span> • Trusted by Sophisticated Investors Worldwide
              </p>
              <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl -z-10 animate-pulse"></div>
            </div>
            
            {/* SPECTACULAR CTA BUTTON */}
            <div className="relative inline-block mb-16">
              <button className="relative px-12 py-6 text-2xl font-bold text-white rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-105" style={{
                background: `
                  linear-gradient(45deg, 
                    #ff0080, #ff8c00, #40e0d0, #9370db, #00ff00, #ff1493
                  )
                `,
                backgroundSize: '400% 400%',
                animation: 'gradientShift 4s ease-in-out infinite',
                boxShadow: `
                  0 0 50px rgba(255, 0, 128, 0.5),
                  0 0 100px rgba(64, 224, 208, 0.3),
                  inset 0 2px 0 rgba(255, 255, 255, 0.3)
                `
              }}>
                <span className="relative z-10">🚀 Start Your AI Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-3xl blur-2xl -z-10 animate-pulse"></div>
            </div>
          </div>
          
          {/* PREMIUM STATS DASHBOARD */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '$2.5B+', label: 'Assets Under Management', icon: '💰', color: 'from-cyan-400 to-blue-600' },
              { value: '150K+', label: 'Active Investors', icon: '👥', color: 'from-green-400 to-emerald-600' },
              { value: '99.99%', label: 'Platform Uptime', icon: '⚡', color: 'from-purple-400 to-pink-600' },
              { value: '24/7', label: 'AI Monitoring', icon: '🤖', color: 'from-yellow-400 to-orange-600' }
            ].map((stat, i) => (
              <div key={i} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className={`text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}>
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-lg font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* FEATURES SECTION */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-black mb-8" style={{
            background: 'linear-gradient(135deg, #00f9ff 0%, #39ff14 50%, #ff0080 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(0, 249, 255, 0.5)'
          }}>
            Revolutionary Features
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
            Experience the future of investing with our cutting-edge AI technology
          </p>
        </div>
        
        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: '🧠 AI-Powered Analysis',
              description: 'Advanced machine learning algorithms analyze market trends and provide intelligent investment recommendations.',
              color: 'from-cyan-400 to-blue-600'
            },
            {
              title: '📊 Real-Time Data',
              description: 'Live market data and instant portfolio updates keep you informed of every market movement.',
              color: 'from-green-400 to-emerald-600'
            },
            {
              title: '🔒 Enterprise Security',
              description: 'Military-grade security protocols protect your investments and personal information.',
              color: 'from-purple-400 to-pink-600'
            }
          ].map((feature, i) => (
            <div key={i} className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
              <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* GLOBAL ANIMATIONS */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(2deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
