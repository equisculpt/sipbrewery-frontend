'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FeaturesGrid: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setIsClient(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: '🧠',
      title: 'AI-Powered Analytics',
      description: 'Revolutionary machine learning algorithms analyze market patterns in real-time, providing insights that traditional analysis simply cannot match.',
      gradient: 'from-cyan-400 to-blue-600',
      glowColor: 'rgba(0, 249, 255, 0.4)',
      stats: ['99.7% Accuracy', '0.003s Response', '24/7 Monitoring']
    },
    {
      icon: '🚀',
      title: 'Quantum SIP Engine',
      description: 'Next-generation systematic investment planning powered by quantum computing principles for optimal portfolio allocation.',
      gradient: 'from-purple-400 to-pink-600',
      glowColor: 'rgba(139, 92, 246, 0.4)',
      stats: ['15% Higher Returns', 'Auto-Rebalancing', 'Risk Optimization']
    },
    {
      icon: '🛡️',
      title: 'Military-Grade Security',
      description: 'Bank-level encryption with multi-layer security protocols ensuring your investments are protected with institutional-grade safeguards.',
      gradient: 'from-green-400 to-emerald-600',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      stats: ['256-bit Encryption', 'Zero Breaches', 'ISO 27001 Certified']
    },
    {
      icon: '📊',
      title: 'Real-Time Portfolio Tracking',
      description: 'Advanced dashboard with live market data, performance analytics, and predictive modeling for informed investment decisions.',
      gradient: 'from-yellow-400 to-orange-600',
      glowColor: 'rgba(245, 158, 11, 0.4)',
      stats: ['Live Updates', 'Custom Alerts', 'Performance Insights']
    },
    {
      icon: '🌐',
      title: 'Global Market Access',
      description: 'Access to international markets, emerging opportunities, and diversified investment options across multiple asset classes.',
      gradient: 'from-indigo-400 to-purple-600',
      glowColor: 'rgba(99, 102, 241, 0.4)',
      stats: ['50+ Markets', 'Multi-Currency', 'Global Diversification']
    },
    {
      icon: '⚡',
      title: 'Lightning-Fast Execution',
      description: 'Ultra-low latency trading infrastructure with direct market access for instant order execution and optimal pricing.',
      gradient: 'from-red-400 to-pink-600',
      glowColor: 'rgba(239, 68, 68, 0.4)',
      stats: ['<1ms Latency', 'Direct Access', 'Best Pricing']
    }
  ];

  return (
    <section className="relative min-h-screen py-32 overflow-hidden" style={{
      background: `
        radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 70% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 20% 70%, rgba(245, 158, 11, 0.15) 0%, transparent 50%),
        linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)
      `
    }}>
      
      {/* SPECTACULAR BACKGROUND SYSTEM */}
      <div className="absolute inset-0">
        {/* Dynamic Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" style={{
          animation: 'float 15s ease-in-out infinite',
          filter: 'blur(60px)'
        }}></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{
          animation: 'float 18s ease-in-out infinite reverse',
          filter: 'blur(60px)'
        }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400/20 to-emerald-600/20 rounded-full blur-3xl animate-pulse" style={{
          animation: 'float 12s ease-in-out infinite',
          filter: 'blur(60px)'
        }}></div>

        {/* Interactive Mouse Glow */}
        {isClient && (
          <div 
            className="absolute w-96 h-96 pointer-events-none transition-all duration-300 ease-out"
            style={{
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
              background: 'radial-gradient(circle, rgba(0, 249, 255, 0.1) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }}
          />
        )}
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-8">
        
        {/* SPECTACULAR SECTION HEADER */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-8xl font-black mb-8"
            style={{
              background: `
                linear-gradient(45deg, 
                  #00f9ff 0%, 
                  #8b5cf6 25%, 
                  #10b981 50%, 
                  #f59e0b 75%, 
                  #00f9ff 100%
                )
              `,
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientShift 4s ease-in-out infinite',
              textShadow: '0 0 80px rgba(0, 249, 255, 0.8)',
              filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.3))'
            }}
          >
            Revolutionary Features
          </motion.h2>
          
          <motion.p 
            className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Experience the future of investing with cutting-edge technology that delivers 
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent font-bold"> unprecedented performance</span> and 
            <span className="bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent font-bold"> unmatched security</span>.
          </motion.p>
        </motion.div>

        {/* SPECTACULAR FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Spectacular Card Glow */}
              <div 
                className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-500`}
                style={{
                  boxShadow: hoveredCard === index ? `0 0 60px ${feature.glowColor}` : 'none'
                }}
              ></div>
              
              {/* Premium Card */}
              <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl p-10 border border-white/20 group-hover:border-white/40 transition-all duration-500 h-full">
                
                {/* Floating Icon */}
                <motion.div 
                  className="text-8xl mb-8 relative"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.6 }
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500`}></div>
                  <div className="relative z-10 bg-black/50 rounded-2xl p-6 backdrop-blur-sm border border-white/30">
                    {feature.icon}
                  </div>
                </motion.div>

                {/* Premium Title */}
                <h3 className={`text-3xl font-bold mb-6 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {feature.description}
                </p>

                {/* Stats Grid */}
                <div className="space-y-4">
                  {feature.stats.map((stat, statIndex) => (
                    <motion.div
                      key={statIndex}
                      className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all duration-300"
                      whileHover={{ x: 10 }}
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient}`}></div>
                      <span className="text-white font-medium">{stat}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Interactive Hover Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background: hoveredCard === index 
                      ? `radial-gradient(circle at center, ${feature.glowColor} 0%, transparent 70%)`
                      : 'transparent'
                  }}
                  animate={{
                    opacity: hoveredCard === index ? 0.3 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* SPECTACULAR CTA SECTION */}
        <motion.div 
          className="text-center mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="group relative inline-flex items-center justify-center px-16 py-6 text-2xl font-bold text-white rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105"
            style={{
              background: `
                linear-gradient(45deg, 
                  #00f9ff 0%, 
                  #8b5cf6 25%, 
                  #10b981 50%, 
                  #f59e0b 75%, 
                  #00f9ff 100%
                )
              `,
              backgroundSize: '400% 400%',
              animation: 'gradientShift 4s ease-in-out infinite',
              boxShadow: '0 0 60px rgba(0, 249, 255, 0.4)'
            }}
            whileHover={{
              boxShadow: '0 0 80px rgba(0, 249, 255, 0.6)',
              scale: 1.05
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Experience the Future</span>
            
            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
