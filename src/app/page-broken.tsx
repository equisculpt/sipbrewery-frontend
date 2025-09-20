'use client';

import { useState, useEffect } from 'react';
import AIPersonalizationCompliant from '../components/ai/AIPersonalizationCompliant';
import MarketVisualization from '@/components/market/MarketVisualization';
import FloatingElements, { ParticleSystem } from '@/components/effects/FloatingElements';
import AdvancedTradingChart from '@/components/charts/AdvancedTradingChart';
import AdvancedPortfolioAnalytics from '@/components/portfolio/AdvancedPortfolioAnalytics';
import MarketSentimentAnalysis from '@/components/sentiment/MarketSentimentAnalysis';
import PremiumMicroInteractions from '@/components/interactions/PremiumMicroInteractions';
import EnterpriseSecurityDashboard from '@/components/security/EnterpriseSecurityDashboard';
import MutualFundTradingView from '@/components/charts/MutualFundTradingView';
import FundManagerIntimidationDashboard from '../components/institutional/FundManagerIntimidationDashboard';
import PremiumBlogDisplay from '../components/blog/PremiumBlogDisplay';
import AddictiveCommunityHub from '../components/community/AddictiveCommunityHub';
import GamificationDashboard from '../components/community/GamificationDashboard';
import QuantumTimelineExplorer from '../components/quantum/QuantumTimelineExplorer';
import ComplianceDisclaimer from '../components/compliance/ComplianceDisclaimer';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [marketData, setMarketData] = useState([
    { symbol: 'NIFTY', price: 21847.70, change: 156.25, changePercent: 0.72 },
    { symbol: 'SENSEX', price: 72240.26, change: 445.87, changePercent: 0.62 },
    { symbol: 'BANKNIFTY', price: 47856.35, change: -234.12, changePercent: -0.49 },
    { symbol: 'NIFTY IT', price: 34567.89, change: 287.45, changePercent: 0.84 }
  ]);
  
  useEffect(() => {
    // Initialize client-side only to avoid hydration mismatch
    setIsClient(true);
    setCurrentTime(new Date());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Simulate real-time market data updates
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
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontSize: '1.5rem'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #00f9ff',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          Loading Universe-Class Experience...
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: `
        radial-gradient(circle at 20% 30%, rgba(0, 249, 255, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(255, 0, 128, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 40% 90%, rgba(128, 0, 255, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 60% 10%, rgba(0, 255, 0, 0.1) 0%, transparent 50%),
        linear-gradient(135deg, #000000 0%, #0a0a2e 25%, #1a1a4e 50%, #2a2a6e 75%, #000000 100%)
      `,
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* SPECTACULAR BACKGROUND SYSTEM */}
      <div className="absolute inset-0">
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
        {isClient && Array.from({length: 50}).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <ParticleSystem />
      <FloatingElements />
      {/* Real-time Market Data Ticker */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '50px',
        padding: '10px 20px',
        display: 'flex',
        gap: '30px',
        zIndex: 1000,
        fontSize: '14px'
      }}>
        {marketData.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ opacity: 0.8 }}>{item.symbol}:</span>
            <span style={{ fontWeight: 'bold' }}>₹{item.price.toFixed(2)}</span>
            <span style={{ 
              color: item.changePercent >= 0 ? '#39ff14' : '#ff0040', 
              fontSize: '12px' 
            }}>
              {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
      
      {/* Main Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '120px 2rem 4rem',
        textAlign: 'center'
      }}>
        {/* Hero Section */}
        <div style={{ marginBottom: '6rem' }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            fontWeight: 900,
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #00f9ff 0%, #39ff14 50%, #8000ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(0,249,255,0.5)',
            letterSpacing: '-0.02em',
            lineHeight: 0.9
          }}>
            SIP<span style={{ color: '#39ff14' }}>Brewery</span>
          </h1>
          
          <div style={{
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            marginBottom: '1.5rem',
            opacity: 0.9,
            fontWeight: 300
          }}>
            🚀 The Future of Investing is <span style={{
              background: 'linear-gradient(45deg, #00f9ff, #39ff14)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 600
            }}>Smart SIP</span>
          </div>
          
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.4rem)',
            marginBottom: '3rem',
            opacity: 0.8,
            maxWidth: '600px',
            margin: '0 auto 3rem',
            lineHeight: 1.6
          }}>
            Dynamic, market-aware SIPs powered by <span style={{ color: '#39ff14' }}>Artificial Super Intelligence</span> for maximum growth.
          </p>
          
          <button style={{
            background: 'linear-gradient(45deg, #00f9ff, #39ff14)',
            color: '#000000',
            padding: 'clamp(1rem, 2vw, 1.5rem) clamp(2rem, 4vw, 3rem)',
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            fontWeight: 700,
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(0,249,255,0.5), 0 0 40px rgba(0,249,255,0.3)',
            transition: 'all 0.3s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 0 40px rgba(0,249,255,0.8), 0 0 80px rgba(0,249,255,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0px)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0,249,255,0.5), 0 0 40px rgba(0,249,255,0.3)';
          }}>
            Start Your Smart SIP Now ✨
          </button>
        </div>
        
        {/* Premium Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '6rem'
        }}>
          {[
            {
              icon: '🤖',
              title: 'AI-Powered Analysis',
              description: 'Advanced machine learning algorithms analyze 10,000+ data points in real-time for optimal investment decisions.',
              gradient: 'linear-gradient(135deg, rgba(0,249,255,0.2) 0%, rgba(0,249,255,0.05) 100%)'
            },
            {
              icon: '⚡',
              title: 'Dynamic SIP Adjustment',
              description: 'Automatically adjusts investment amounts based on market volatility, sentiment, and economic indicators.',
              gradient: 'linear-gradient(135deg, rgba(57,255,20,0.2) 0%, rgba(57,255,20,0.05) 100%)'
            },
            {
              icon: '🛡️',
              title: 'SEBI Compliant',
              description: 'Fully registered and compliant with all regulatory requirements. Your investments are secure and protected.',
              gradient: 'linear-gradient(135deg, rgba(128,0,255,0.2) 0%, rgba(128,0,255,0.05) 100%)'
            }
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                background: feature.gradient,
                padding: '3rem 2rem',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '1.5rem',
                filter: 'drop-shadow(0 0 10px rgba(0,249,255,0.5))'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '1rem',
                color: '#ffffff'
              }}>
                {feature.title}
              </h3>
              <p style={{
                opacity: 0.8,
                lineHeight: 1.6,
                fontSize: '1.125rem'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'clamp(1rem, 3vw, 3rem)',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50px',
          padding: 'clamp(1rem, 2vw, 2rem) clamp(2rem, 4vw, 4rem)',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {[
            { color: '#39ff14', label: 'SEBI Registered', icon: '🛡️' },
            { color: '#00f9ff', label: '1,00,000+ Investors', icon: '👥' },
            { color: '#8000ff', label: '₹2500 Cr AUM', icon: '💎' },
            { color: '#ff8000', label: '25% Better Returns', icon: '📈' }
          ].map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
              fontWeight: 500
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                background: item.color,
                borderRadius: '50%',
                boxShadow: `0 0 10px ${item.color}`
              }}></div>
              <span style={{ marginRight: '0.3rem' }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        
        {/* Live Time Display */}
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '1rem 1.5rem',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          color: '#00f9ff',
          zIndex: 1000
        }}>
          <div>Market Time</div>
          <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
            {currentTime ? currentTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }) : '--:--:--'}
          </div>
        </div>
        
        {/* Educational AI Tool - SEBI Compliant */}
        <AIPersonalizationCompliant />
        
        {/* Real-Time Market Visualization */}
        <MarketVisualization />
        
        {/* Revolutionary Mutual Fund TradingView */}
        <section className="py-20">
          <MutualFundTradingView />
        </section>

        {/* Fund Manager Intimidation Dashboard */}
        <section className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              🔥 INSTITUTIONAL INTIMIDATION CENTER
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Analysis so sophisticated that fund managers will fear our predictive accuracy and seek partnerships to access our ASI technology.
            </p>
          </div>
          <FundManagerIntimidationDashboard />
        </section>

        {/* Critical Compliance Notice */}
        <section className="bg-red-900/20 border-b border-red-500/30 py-4">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl font-bold text-red-300 mb-2">
              🚨 IMPORTANT: We are Mutual Fund Distributors, NOT Investment Advisors
            </h2>
            <ComplianceDisclaimer 
              contentType="general" 
              showAMFI={true} 
              showBusinessModel={true}
              size="large"
            />
          </div>
        </section>

        {/* $100M Automated Blog Generation System */}
        <section className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
              📝 $100M AUTOMATED BLOG GENERATION
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              World-class financial content generated daily by ASI. Quality so high that Goldman Sachs fund managers bookmark our website for insights.
            </p>
            <div className="flex justify-center space-x-8 mt-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                <span>2 Blogs Daily</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                <span>Goldman Sachs Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-purple-400 rounded-full"></span>
                <span>ASI-Powered Insights</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span>Interactive Charts</span>
              </div>
            </div>
          </div>
          <PremiumBlogDisplay />
        </section>

        {/* Addictive Community Hub - Most Engaging Feature */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🌟 Most Addictive Financial Community
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              The community so engaging that every office will keep it open 24/7. Real-time discussions, 
              exclusive alpha, gamification, and social trading that creates compulsive usage.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></span>
                <span>Real-time Live Discussions</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></span>
                <span>Exclusive Alpha Drops</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
                <span>Gamification & Rewards</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                <span>Fund Manager Direct Access</span>
              </div>
            </div>
          </div>
          <AddictiveCommunityHub />
        </section>

        {/* Gamification Dashboard - Addiction Psychology */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              🎮 Gamification & Addiction Psychology
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Advanced gamification system designed with addiction psychology to create compulsive engagement. 
              Variable rewards, social validation, FOMO triggers, and achievement systems.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span>Variable Reward Schedule</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                <span>FOMO Triggers</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                <span>Social Validation</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-purple-400 rounded-full"></span>
                <span>Achievement Systems</span>
              </div>
            </div>
          </div>
          <GamificationDashboard />
        </section>

        {/* IMPOSSIBLE QUANTUM TIMELINE FEATURE */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              🌌 IMPOSSIBLE: Quantum Timeline Explorer
            </h2>
            <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mb-6 max-w-4xl mx-auto">
              <p className="text-yellow-300 font-semibold mb-2">⚠️ SEBI COMPLIANCE: Educational Tool Only</p>
              <p className="text-gray-300 text-sm">
                This educational tool shows historical "what if" investment scenarios based on past market data. 
                Past performance does not guarantee future returns. All investments carry risk of loss. 
                This is for learning purposes only, not investment advice.
              </p>
            </div>
              Revolutionary educational tool for learning from historical investment patterns. 
              Analyze "what if" scenarios with simulated portfolio values based on past market data 
              to improve your financial decision-making and understanding of market dynamics.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
{{ ... }}
              <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">🤖 AI Learning</span>
              <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full">📚 Educational Tool</span>
              <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full">⚠️ SEBI Compliant</span>
            </div>
          </div>
          <QuantumTimelineExplorer />
        </section>

        {/* Advanced Trading Chart - $20M Feature */}
        <AdvancedTradingChart />
        
        {/* Advanced Portfolio Analytics - $20M Feature */}
        <AdvancedPortfolioAnalytics />
        
        {/* Market Sentiment Analysis - $30M Feature */}
        <MarketSentimentAnalysis />
        
        {/* Premium Micro-Interactions - $15M Feature */}
        <PremiumMicroInteractions />
        
        {/* Enterprise Security Dashboard - $15M Feature */}
        <EnterpriseSecurityDashboard />
      </div>
      
      {/* Global Animations */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
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
        
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px currentColor, 0 0 40px currentColor; }
          50% { text-shadow: 0 0 40px currentColor, 0 0 80px currentColor; }
        }
      `}</style>
    </div>
  );
}
