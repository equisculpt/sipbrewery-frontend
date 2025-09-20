'use client';

import { useState, useEffect } from 'react';

export default function UltimateComplianceFooter() {
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<Array<{left: number, top: number, duration: number, delay: number}>>([]);
  const [lines, setLines] = useState<Array<{x1: number, y1: number, x2: number, y2: number}>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsClient(true);
    
    // Generate spectacular particles
    const particleData = Array.from({length: 200}).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 8,
      delay: Math.random() * 4
    }));
    setParticles(particleData);

    // Generate neural network lines
    const lineData = Array.from({length: 40}).map(() => ({
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
        radial-gradient(circle at 20% 50%, rgba(0, 249, 255, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 0, 128, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(57, 255, 20, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 60% 30%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
        linear-gradient(135deg, #000000 0%, #0a0a1a 25%, #1a1a2e 50%, #2a1a4e 75%, #000000 100%)
      `
    }}>
      {/* WORLD-CLASS BACKGROUND SYSTEM */}
      <div className="absolute inset-0">
        {/* Dynamic Gradient Mesh */}
        <div className="absolute inset-0 opacity-80">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/30 via-transparent to-purple-500/30 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-pink-500/30 via-transparent to-green-500/30 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-blue-500/30 via-transparent to-yellow-500/30 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Spectacular Floating Orbs */}
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-r from-cyan-400/40 to-blue-600/40 rounded-full blur-3xl" style={{
          animation: 'float 15s ease-in-out infinite',
          filter: 'blur(60px)'
        }}></div>
        <div className="absolute bottom-32 right-32 w-[400px] h-[400px] bg-gradient-to-r from-purple-400/40 to-pink-600/40 rounded-full blur-3xl" style={{
          animation: 'float 18s ease-in-out infinite reverse',
          filter: 'blur(60px)'
        }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-r from-green-400/40 to-emerald-600/40 rounded-full blur-3xl" style={{
          animation: 'float 12s ease-in-out infinite',
          filter: 'blur(60px)'
        }}></div>
        
        {/* Premium Particle System */}
        {isClient && particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/80 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `twinkle ${particle.duration}s ease-in-out infinite ${particle.delay}s`,
              boxShadow: '0 0 10px rgba(0, 249, 255, 0.8)'
            }}
          />
        ))}
        
        {/* Neural Network Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="footerLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f9ff" stopOpacity="0.8" />
              <stop offset="25%" stopColor="#8b5cf6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#ff0080" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#39ff14" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
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
              strokeWidth="1"
              className="animate-pulse"
            />
          ))}
        </svg>
      </div>
      
      {/* MASSIVE FOOTER CONTENT */}
      <div className="relative z-10 max-w-8xl mx-auto px-12 py-32">
        
        {/* SPECTACULAR BRANDING SECTION */}
        <div className="text-center mb-20">
          <h3 className="text-8xl font-black mb-8" style={{
            background: `
              linear-gradient(45deg, 
                #00f9ff 0%, 
                #ff0080 20%, 
                #39ff14 40%, 
                #8b5cf6 60%, 
                #f59e0b 80%, 
                #00f9ff 100%
              )
            `,
            backgroundSize: '400% 400%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientShift 4s ease-in-out infinite',
            textShadow: '0 0 80px rgba(0, 249, 255, 1)',
            filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.3))'
          }}>
            SIPBrewery
          </h3>
          <p className="text-gray-300 max-w-6xl mx-auto text-2xl leading-relaxed mb-12">
            Revolutionary AI-powered investment platform designed for the future of smart investing.
            Trusted by elite investors worldwide with cutting-edge technology and unmatched performance.
          </p>
          
          {/* PREMIUM STATS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-6xl mx-auto">
            {[
              { value: '$2.5B+', label: 'Assets Under Management', icon: '💰', color: 'from-cyan-400 to-blue-600' },
              { value: '150K+', label: 'Active Investors', icon: '👥', color: 'from-green-400 to-emerald-600' },
              { value: '99.99%', label: 'Platform Uptime', icon: '⚡', color: 'from-purple-400 to-pink-600' },
              { value: '24/7', label: 'AI Monitoring', icon: '🤖', color: 'from-yellow-400 to-orange-600' }
            ].map((stat, i) => (
              <div key={i} className="group relative">
                <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500`}></div>
                <div className="relative bg-black/50 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 hover:border-white/50 transition-all duration-500">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* FOOTER MENU GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* PLATFORM LINKS */}
          <div className="space-y-8">
            <h4 className="text-3xl font-bold text-white mb-8 drop-shadow-lg">Platform</h4>
            <div className="space-y-6 text-lg">
              {[
                { name: '🚀 Smart SIP', desc: 'AI-Powered Investing' },
                { name: '🧠 AI Analysis', desc: 'Deep Market Intelligence' },
                { name: '📊 Portfolio Optimizer', desc: 'Quantum Optimization' },
                { name: '💎 Market Insights', desc: 'Real-time Analytics' },
                { name: '🌌 Quantum Timeline', desc: 'Advanced Features' }
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer p-4 rounded-xl hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 border border-transparent hover:border-cyan-500/40">
                  <div className="text-white group-hover:text-cyan-400 font-semibold transition-colors">{item.name}</div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* SUPPORT SECTION */}
          <div className="space-y-8">
            <h4 className="text-3xl font-bold text-white mb-8 drop-shadow-lg">Support</h4>
            <div className="space-y-6 text-lg">
              {[
                { name: '📚 Help Center', desc: '24/7 Expert Support' },
                { name: '💬 Contact Support', desc: 'Instant Assistance' },
                { name: '🎓 Educational Resources', desc: 'Learn & Grow' },
                { name: '📱 Mobile App', desc: 'Trade Anywhere' },
                { name: '🔐 Security Center', desc: 'Military-Grade Protection' }
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer p-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 border border-transparent hover:border-purple-500/40">
                  <div className="text-white group-hover:text-purple-400 font-semibold transition-colors">{item.name}</div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* LEGAL SECTION */}
          <div className="space-y-8">
            <h4 className="text-3xl font-bold text-white mb-8 drop-shadow-lg">Legal</h4>
            <div className="space-y-6 text-lg">
              {[
                { name: '📋 Terms of Service', desc: 'User Agreement' },
                { name: '🔒 Privacy Policy', desc: 'Data Protection' },
                { name: '⚖️ Risk Disclosure', desc: 'Investment Risks' },
                { name: '📄 Grievance Redressal', desc: 'Complaint Resolution' },
                { name: '🏛️ Regulatory Info', desc: 'Compliance Details' }
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer p-4 rounded-xl hover:bg-gradient-to-r hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300 border border-transparent hover:border-green-500/40">
                  <div className="text-white group-hover:text-green-400 font-semibold transition-colors">{item.name}</div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* CONTACT SECTION */}
          <div className="space-y-8">
            <h4 className="text-3xl font-bold text-white mb-8 drop-shadow-lg">Contact Us</h4>
            <div className="space-y-6 text-lg">
              {[
                { name: '📧 hello@sipbrewery.in', desc: 'General Inquiries' },
                { name: '📞 +91 7760997030', desc: 'Phone Support' },
                { name: '📍 Hyderabad, India', desc: 'Headquarters' },
                { name: '🌐 Global Presence', desc: 'Worldwide Service' },
                { name: '💼 Enterprise Sales', desc: 'Business Solutions' }
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer p-4 rounded-xl hover:bg-gradient-to-r hover:from-yellow-500/20 hover:to-orange-500/20 transition-all duration-300 border border-transparent hover:border-yellow-500/40">
                  <div className="text-white group-hover:text-yellow-400 font-semibold transition-colors">{item.name}</div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* SPECTACULAR COMPLIANCE SHOWCASE */}
        <div className="relative mt-32">
          {/* Spectacular Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-gray-900/95 to-black/90 rounded-3xl blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-green-500/20 rounded-3xl"></div>
          
          <div className="relative backdrop-blur-3xl rounded-3xl p-16 border border-white/30" style={{
            background: `
              linear-gradient(135deg, 
                rgba(0, 0, 0, 0.9) 0%, 
                rgba(30, 30, 60, 0.95) 50%, 
                rgba(0, 0, 0, 0.9) 100%
              )
            `,
            boxShadow: `
              0 0 120px rgba(0, 249, 255, 0.4),
              0 0 240px rgba(139, 92, 246, 0.3),
              inset 0 4px 0 rgba(255, 255, 255, 0.3),
              inset 0 -4px 0 rgba(0, 0, 0, 0.6)
            `
          }}>
            {/* SPECTACULAR COMPLIANCE HEADER */}
            <div className="text-center mb-20">
              <div className="relative inline-block">
                <h2 className="text-7xl font-black mb-8" style={{
                  background: `
                    linear-gradient(45deg, 
                      #10b981 0%, 
                      #06b6d4 20%, 
                      #8b5cf6 40%, 
                      #f59e0b 60%, 
                      #ef4444 80%, 
                      #10b981 100%
                    )
                  `,
                  backgroundSize: '400% 400%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradientShift 6s ease-in-out infinite',
                  textShadow: '0 0 80px rgba(16, 185, 129, 1)',
                  filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.4))'
                }}>
                  🏛️ REGULATORY EXCELLENCE
                </h2>
                <div className="absolute -inset-12 bg-gradient-to-r from-green-500/30 via-cyan-500/30 to-purple-500/30 rounded-3xl blur-3xl -z-10 animate-pulse"></div>
              </div>
              
              <p className="text-3xl font-light text-white/95 max-w-5xl mx-auto leading-relaxed mb-12" style={{
                textShadow: '0 0 30px rgba(255, 255, 255, 0.4)'
              }}>
                World-class compliance with <span className="font-bold text-green-400">Indian financial regulations</span>, 
                <span className="font-bold text-cyan-400"> international standards</span>, and 
                <span className="font-bold text-purple-400">cutting-edge security protocols</span>
              </p>
              
              {/* Compliance Badges */}
              <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
                {[
                  { name: 'AMFI Registered', color: 'from-green-400 to-emerald-600', icon: '🏆', desc: 'Mutual Fund Distributor' },
                  { name: 'SEBI Compliant', color: 'from-blue-400 to-cyan-600', icon: '🛡️', desc: 'Securities Regulation' },
                  { name: 'ISO 27001', color: 'from-purple-400 to-pink-600', icon: '🔒', desc: 'Information Security' },
                  { name: 'RBI Guidelines', color: 'from-yellow-400 to-orange-600', icon: '⚡', desc: 'Banking Standards' },
                  { name: '3000+ Funds', color: 'from-red-400 to-pink-600', icon: '📊', desc: 'Comprehensive Access' }
                ].map((badge, i) => (
                  <div key={i} className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${badge.color} rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500`}></div>
                    <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl px-8 py-6 border border-white/30 hover:border-white/50 transition-all duration-500">
                      <div className="text-3xl mb-3">{badge.icon}</div>
                      <div className={`text-lg font-bold bg-gradient-to-r ${badge.color} bg-clip-text text-transparent mb-2`}>
                        {badge.name}
                      </div>
                      <div className="text-sm text-gray-400">{badge.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* AMFI Registration Details */}
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-8 border border-green-500/30 mb-12">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" style={{
                    boxShadow: '0 0 15px rgba(34, 197, 94, 0.8)'
                  }}></div>
                  <span className="text-2xl font-bold text-green-400">AMFI REGISTERED MUTUAL FUND DISTRIBUTOR</span>
                </div>
                <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed">
                  India's trusted AMFI registered mutual fund distributor offering regular mutual 
                  funds with professional advisory. <span className="font-bold text-cyan-400">ARN: XXXXXX</span> | 
                  <span className="font-bold text-purple-400"> Valid till: DD/MM/YYYY</span>
                </p>
              </div>
              
              {/* Important Disclosure */}
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-8 border border-yellow-500/30">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Important Disclosure:</h3>
                <p className="text-white/90 leading-relaxed max-w-5xl mx-auto">
                  Mutual Fund investments are subject to market risks. Please read all scheme related documents 
                  carefully before investing. Past performance is not indicative of future results. SIP Brewery 
                  is a registered mutual fund distributor (ARN: XXXXXX) with AMFI and operates under strict SEBI 
                  regulations. All investments are processed through verified AMCs and custodians for maximum security.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* COPYRIGHT SECTION */}
        <div className="text-center mt-20 pt-12 border-t border-white/20">
          <p className="text-gray-400 text-lg mb-4">
            © 2024 SIPBrewery. All rights reserved. | A trademark of Equiscript Ventures Pvt Ltd.
          </p>
          <p className="text-gray-500 text-sm max-w-4xl mx-auto">
            SIPBrewery is a trademark of Equiscript Ventures Pvt Ltd. | Equiscript Ventures Pvt Ltd. is an AMFI Registered Mutual Fund Distributor | 
            We may earn commission when you invest through our platform. AI-generated research and analysis are for informational purposes only and 
            should not be considered as investment advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
