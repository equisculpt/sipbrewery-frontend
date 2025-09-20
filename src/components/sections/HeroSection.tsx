'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight, Play, TrendingUp, Zap, Shield, Award, BarChart3 } from 'lucide-react';

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "The Future of Investing is Smart SIP";
  const [showCursor, setShowCursor] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        // Blink cursor for a while then hide it
        setTimeout(() => setShowCursor(false), 2000);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  const trustBadges = [
    { icon: Shield, text: 'AMFI Registered', subtext: 'ARN-123456' },
    { icon: Award, text: 'SEBI Compliant', subtext: 'INH000000123' },
    { icon: TrendingUp, text: 'ISO Certified', subtext: '27001:2013' },
  ];

  const floatingIcons = [
    { icon: '₹', delay: 0 },
    { icon: '📈', delay: 0.5 },
    { icon: '💰', delay: 1 },
    { icon: '🚀', delay: 1.5 },
    { icon: '⚡', delay: 2 },
    { icon: '🎯', delay: 2.5 },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 lg:pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Primary Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-cyan-900/20" />
        
        {/* Animated Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent-neon/10 via-transparent to-accent-green/10"
          animate={{ 
            background: [
              'linear-gradient(45deg, rgba(0,249,255,0.1) 0%, transparent 50%, rgba(57,255,20,0.1) 100%)',
              'linear-gradient(225deg, rgba(57,255,20,0.1) 0%, transparent 50%, rgba(0,249,255,0.1) 100%)',
              'linear-gradient(45deg, rgba(0,249,255,0.1) 0%, transparent 50%, rgba(57,255,20,0.1) 100%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-neon rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * -200 - 50],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Floating Finance Icons */}
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            animate={{
              y: [-20, -60, -20],
              x: [-10, 10, -10],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Typing Animation Title */}
            <div className="space-y-6">
              <motion.div 
                className="hero-title text-white font-display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {isClient ? typedText : fullText}
                {isClient && showCursor && (
                  <motion.span
                    className="inline-block w-1 h-16 bg-accent-neon ml-2"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </motion.div>
              
              <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                Dynamic, market-aware SIPs built for maximum growth.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <motion.button
                className="btn-primary group text-lg px-8 py-4 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Start Your Smart SIP Now</span>
                  <motion.div
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent-green via-accent-neon to-accent-green"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
              
              <motion.button
                className="btn-secondary group text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>See How It Works</span>
                </span>
              </motion.button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(0, 249, 255, 0.3)' }}
                >
                  <motion.div
                    className="w-8 h-8 bg-gradient-neon rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <badge.icon className="w-4 h-4 text-dark-900" />
                  </motion.div>
                  <div>
                    <div className="text-sm font-semibold text-white">{badge.text}</div>
                    <div className="text-xs text-gray-400">{badge.subtext}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Interactive Comparison */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-6">
              
              {/* Static SIP Card */}
              <motion.div
                className="card-premium bg-gray-600/20 border-gray-500/30 relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-300">Static SIP</h3>
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse" />
                </div>
                
                {/* Static Graph */}
                <div className="h-32 bg-gray-700/30 rounded-lg p-4 mb-4 relative overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-gray-500 to-gray-400 rounded"
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ delay: 2, duration: 2, ease: "easeOut" }}
                  />
                  <div className="absolute top-2 right-2 text-xs text-gray-400">
                    Fixed Growth
                  </div>
                </div>
                
                <div className="text-sm text-gray-400">
                  Fixed amount • No market adaptation • Limited growth potential
                </div>
              </motion.div>

              {/* Smart SIP Card */}
              <motion.div
                className="card-premium bg-gradient-to-br from-accent-neon/10 to-accent-green/10 border-accent-neon/30 relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7 }}
              >
                {/* Animated Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent-neon/5 to-accent-green/5"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">Smart SIP</h3>
                    <motion.div
                      className="w-3 h-3 bg-accent-green rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  
                  {/* Dynamic Graph */}
                  <div className="h-32 bg-gray-900/30 rounded-lg p-4 mb-4 relative overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent-neon to-accent-green rounded relative"
                      initial={{ width: 0 }}
                      animate={{ width: "90%" }}
                      transition={{ delay: 2.2, duration: 2, ease: "easeOut" }}
                    >
                      {/* Animated Wave Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 3 }}
                      />
                    </motion.div>
                    
                    {/* Market Adaptation Indicators */}
                    <div className="absolute top-2 right-2 flex space-x-1">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-6 bg-accent-green rounded-full"
                          animate={{ 
                            height: [6, 24, 12, 20],
                            opacity: [0.5, 1, 0.7, 1] 
                          }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            delay: i * 0.2 
                          }}
                        />
                      ))}
                    </div>
                    
                    <div className="absolute top-2 left-2 text-xs text-accent-green font-medium">
                      AI Adapting
                    </div>
                  </div>
                  
                  <div className="text-sm text-accent-green">
                    Dynamic amounts • Market intelligence • Superior returns
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Performance Badge */}
            <motion.div
              className="absolute -top-4 -right-4 bg-accent-green text-dark-900 px-6 py-3 rounded-full text-sm font-bold shadow-neon-green z-20"
              initial={{ opacity: 0, scale: 0, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: -12 }}
              transition={{ delay: 3, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1, rotate: 0 }}
            >
              +18% Potential Growth
            </motion.div>

            {/* Floating Stats */}
            <motion.div
              className="absolute -left-8 top-1/2 bg-gray-900/90 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-4 text-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <BarChart3 className="w-6 h-6 text-accent-neon mx-auto mb-2" />
              <div className="text-lg font-bold text-white">1,00,000+</div>
              <div className="text-xs text-gray-400">Smart Investors</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-accent-neon rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">Scroll to explore</p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
