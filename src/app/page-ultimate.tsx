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
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isClient]);
  
  if (!isLoaded || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        background: `
          radial-gradient(circle at 30% 20%, rgba(0, 249, 255, 0.4) 0%, transparent 50%),
          radial-gradient(circle at 70% 80%, rgba(255, 0, 128, 0.4) 0%, transparent 50%),
          radial-gradient(circle at 20% 70%, rgba(57, 255, 20, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #000000 0%, #0a0a2e 25%, #1a1a4e 50%, #2a2a6e 75%, #000000 100%)
        `
      }}>
        <div className="text-center text-white">
          <div className="relative mb-8">
            <div className="w-32 h-32 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" style={{
              filter: 'drop-shadow(0 0 30px rgba(0, 249, 255, 1))',
              animationDuration: '1s'
            }}></div>
            <div className="absolute inset-0 w-32 h-32 border-4 border-purple-400 border-b-transparent rounded-full animate-spin mx-auto" style={{
              animationDirection: 'reverse',
              animationDuration: '1.5s',
              filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 1))'
            }}></div>
            <div className="absolute inset-0 w-32 h-32 border-2 border-pink-400 border-l-transparent rounded-full animate-spin mx-auto" style={{
              animationDuration: '2s',
              filter: 'drop-shadow(0 0 20px rgba(255, 0, 128, 1))'
            }}></div>
          </div>
          <div className="text-5xl font-black mb-6" style={{
            background: 'linear-gradient(45deg, #00f9ff, #ff0080, #39ff14, #8b5cf6, #f59e0b)',
            backgroundSize: '400% 400%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientShift 2s ease-in-out infinite',
            textShadow: '0 0 60px rgba(255, 255, 255, 0.8)'
          }}>
            Loading Ultimate Experience...
          </div>
          <div className="text-2xl text-gray-300 mb-4">Initializing $250M Frontend Architecture</div>
          <div className="text-lg text-cyan-400">Powered by 100+ Years of Design Excellence</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative overflow-hidden text-white" style={{
      background: `
        radial-gradient(circle at 15% 25%, rgba(0, 249, 255, 0.25) 0%, transparent 35%),
        radial-gradient(circle at 85% 75%, rgba(255, 0, 128, 0.25) 0%, transparent 35%),
        radial-gradient(circle at 35% 85%, rgba(57, 255, 20, 0.2) 0%, transparent 35%),
        radial-gradient(circle at 65% 15%, rgba(139, 92, 246, 0.25) 0%, transparent 35%),
        radial-gradient(circle at 90% 45%, rgba(245, 158, 11, 0.2) 0%, transparent 35%),
        radial-gradient(circle at 10% 65%, rgba(255, 107, 107, 0.2) 0%, transparent 35%),
        linear-gradient(135deg, #000000 0%, #0a0a1a 15%, #1a1a2e 30%, #2a1a4e 45%, #1a2a4e 60%, #0a1a3e 75%, #000000 100%)
      `,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      minHeight: '100vh'
    }}>
      
      {/* ULTRA-PREMIUM BACKGROUND EFFECTS SYSTEM */}
      <BackgroundEffects mousePosition={mousePosition} />
      
      {/* SPECTACULAR MARKET TICKER */}
      <MarketTicker currentTime={currentTime} />
      
      {/* ULTIMATE HERO SECTION */}
      <UltimateHeroSection mousePosition={mousePosition} scrollY={scrollY} />
      
      {/* GLOBAL PREMIUM ANIMATIONS */}
      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(3deg); }
          66% { transform: translateY(-15px) rotate(-2deg); }
        }
      `}</style>
    </div>
  );
}
