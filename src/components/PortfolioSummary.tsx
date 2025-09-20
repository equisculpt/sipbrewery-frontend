"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Wallet, Percent, IndianRupee, Sparkles, ArrowUp } from 'lucide-react';

// Consistent number formatting to avoid hydration issues
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function PortfolioSummary() {
  const [animatedValues, setAnimatedValues] = useState({ invested: 0, current: 0, profit: 0, xirr: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const invested = 120000;
  const current = 165000;
  const profit = current - invested;
  const xirr = 27.5;
  const profitPercentage = ((profit / invested) * 100).toFixed(1);

  useEffect(() => {
    setIsVisible(true);
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setAnimatedValues({
        invested: Math.floor(invested * easeOut),
        current: Math.floor(current * easeOut),
        profit: Math.floor(profit * easeOut),
        xirr: parseFloat((xirr * easeOut).toFixed(1))
      });
      
      if (step >= steps) clearInterval(interval);
    }, stepDuration);
    
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { 
      label: 'Total Invested', 
      value: `₹${formatNumber(animatedValues.invested)}`, 
      icon: <Wallet className="w-6 h-6"/>, 
      accent: 'from-cyan-400/40 to-cyan-600/20',
      glow: 'shadow-cyan-500/25',
      border: 'border-cyan-400/30'
    },
    { 
      label: 'Current Value', 
      value: `₹${formatNumber(animatedValues.current)}`, 
      icon: <IndianRupee className="w-6 h-6"/>, 
      accent: 'from-emerald-400/40 to-emerald-600/20',
      glow: 'shadow-emerald-500/25',
      border: 'border-emerald-400/30'
    },
    { 
      label: 'Profit', 
      value: `₹${animatedValues.profit.toLocaleString()}`, 
      subValue: `+${profitPercentage}%`,
      icon: <TrendingUp className="w-6 h-6"/>, 
      accent: 'from-violet-400/40 to-violet-600/20',
      glow: 'shadow-violet-500/25',
      border: 'border-violet-400/30',
      showSparkles: true
    },
    { 
      label: 'XIRR', 
      value: `${animatedValues.xirr}%`, 
      icon: <Percent className="w-6 h-6"/>, 
      accent: 'from-amber-400/40 to-amber-600/20',
      glow: 'shadow-amber-500/25',
      border: 'border-amber-400/30'
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {cards.map((c, index) => (
          <motion.div 
            key={c.label}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.02, 
              y: -2,
              transition: { duration: 0.2 }
            }}
            className={`group relative p-6 transition-all duration-300 overflow-hidden`}
          >

            
            {/* Sparkles for Profit Card */}
            {c.showSparkles && (
              <AnimatePresence>
                {isVisible && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: [0, Math.random() * 40 - 20],
                          y: [0, Math.random() * -30 - 10]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.3 + 1,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                        className="absolute top-4 right-4"
                      >
                        <Sparkles className="w-3 h-3 text-violet-300" />
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
            )}
            
            {/* Icon Container */}
            <div className="relative z-10">
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.1 }}
                className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${c.accent} text-white shadow-lg ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-300`}
              >
                {c.icon}
              </motion.div>
              
              {/* Content */}
              <div className="mt-4 relative z-10">
                <div className="text-sm font-medium text-purple-200/80 group-hover:text-white/90 transition-colors duration-300">
                  {c.label}
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-white group-hover:text-white transition-colors duration-300">
                    {c.value}
                  </div>
                  {c.subValue && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-1 text-sm font-semibold text-emerald-400"
                    >
                      <ArrowUp className="w-3 h-3" />
                      {c.subValue}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
            

          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
