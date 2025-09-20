'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Search, LogIn, UserPlus, BarChart2, Brain, PieChart, Target, Activity, Settings2, Lightbulb, TrendingUp, Calculator, BookOpen } from 'lucide-react';
import SearchInput from './ui/SearchInput';

const menuItems = [
  {
    title: 'Mutual Fund',
    items: [
      { name: 'Explore Funds', description: 'Premium investment solutions', icon: <Search className="w-4 h-4 text-blue-600" /> },
      { name: 'Top SIPs', description: 'Top performing Smart SIPs', icon: <TrendingUp className="w-4 h-4 text-green-600" /> },
    ],
  },
  {
    title: 'Brew Bot',
    items: [
      { name: 'AI Portfolio Manager', description: 'Intelligent fund selection', icon: <Brain className="w-4 h-4 text-purple-600" /> },
      { name: 'Market Insights', description: 'Real-time market analysis', icon: <BarChart2 className="w-4 h-4 text-blue-600" /> },
      { name: 'Tax Optimizer', description: 'Maximize tax efficiency', icon: <PieChart className="w-4 h-4 text-yellow-600" /> },
      { name: 'Performance Analytics', description: 'Detailed performance metrics', icon: <Activity className="w-4 h-4 text-orange-500" /> },
      { name: 'Risk Analyzer', description: 'Advanced risk assessment', icon: <Target className="w-4 h-4 text-red-500" /> },
      { name: 'Smart Rebalancing', description: 'Automated portfolio optimization', icon: <Settings2 className="w-4 h-4 text-green-600" /> },
      { name: 'Goal Tracker', description: 'Monitor investment progress', icon: <Target className="w-4 h-4 text-pink-500" /> },
      { name: 'Investment Advisor', description: 'Personalized recommendations', icon: <Lightbulb className="w-4 h-4 text-yellow-500" /> },
    ],
  },
  {
    title: 'Tools',
    items: [
      { name: 'SIP Calculator', description: 'Plan your SIP goals', icon: <Calculator className="w-4 h-4 text-blue-600" /> },
      { name: 'XIRR Calculator', description: 'Measure returns accurately', icon: <BarChart2 className="w-4 h-4 text-green-600" /> },
      { name: 'Goal Planner', description: 'Target your financial dreams', icon: <Target className="w-4 h-4 text-purple-600" /> },
    ],
  },
  {
    title: 'Resources',
    items: [
      { name: 'Learning Center', description: 'Investing masterclass', icon: <BookOpen className="w-4 h-4 text-indigo-600" /> },
      { name: 'Blog', description: 'Investment insights & tips', icon: <BookOpen className="w-4 h-4 text-blue-600" /> },
    ],
  },
];

interface PayTMStyleNavigationProps {
  isAuthenticated?: boolean;
  onSignIn?: () => void;
  onSignUp?: () => void;
  onSignOut?: () => void;
}

export default function PayTMStyleNavigation({ 
  isAuthenticated = false, 
  onSignIn, 
  onSignUp, 
  onSignOut 
}: PayTMStyleNavigationProps) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <header className="w-full bg-[#0f1117] text-white shadow-lg fixed top-0 left-0 right-0 z-50 isolate" style={{backgroundColor: '#0f1117'}}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{ 
            background: [
              'linear-gradient(90deg, rgba(0,255,135,0.05) 0%, transparent 50%, rgba(74,227,247,0.05) 100%)',
              'linear-gradient(270deg, rgba(74,227,247,0.05) 0%, transparent 50%, rgba(0,255,135,0.05) 100%)',
              'linear-gradient(90deg, rgba(0,255,135,0.05) 0%, transparent 50%, rgba(74,227,247,0.05) 100%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating Particles */}
        {[
          { x: 25, y: 15, xMove: 30, yMove: -20, duration: 4.5, delay: 0 },
          { x: 75, y: 85, xMove: -40, yMove: -15, duration: 5.2, delay: 0.3 },
          { x: 10, y: 60, xMove: 35, yMove: -25, duration: 4.8, delay: 0.7 },
          { x: 90, y: 20, xMove: -30, yMove: -18, duration: 5.5, delay: 1.1 },
          { x: 45, y: 90, xMove: 25, yMove: -22, duration: 4.3, delay: 1.5 },
          { x: 65, y: 35, xMove: -35, yMove: -16, duration: 5.0, delay: 0.2 },
          { x: 20, y: 75, xMove: 40, yMove: -24, duration: 4.7, delay: 0.9 },
          { x: 85, y: 50, xMove: -25, yMove: -19, duration: 5.3, delay: 1.3 },
          { x: 35, y: 25, xMove: 30, yMove: -21, duration: 4.6, delay: 0.5 },
          { x: 55, y: 80, xMove: -38, yMove: -17, duration: 5.1, delay: 1.7 },
          { x: 15, y: 40, xMove: 32, yMove: -23, duration: 4.9, delay: 0.8 },
          { x: 80, y: 65, xMove: -28, yMove: -20, duration: 5.4, delay: 1.2 }
        ].map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-20"
            animate={{
              x: [0, particle.xMove],
              y: [0, particle.yMove],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
          />
        ))}
      </div>
      <motion.div 
        className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div 
          className="flex items-center gap-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <motion.a 
            href="/" 
            className="flex items-center space-x-4 cursor-pointer hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="text-4xl" 
              style={{
                filter: 'drop-shadow(0 0 8px rgba(0, 255, 135, 0.4))'
              }}
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >🍺</motion.div>
            <div className="flex flex-col">
              <motion.div 
                className="text-2xl font-bold tracking-tight" 
                style={{
                  background: 'linear-gradient(90deg, #FFFFFF 0%, #E0E0E0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >SIP Brewery™</motion.div>
              <motion.div 
                className="text-sm font-semibold tracking-wide opacity-90" 
                style={{
                  background: 'linear-gradient(90deg, #00FF87 0%, #4AE3F7 50%, #00FF87 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 4px rgba(0, 255, 135, 0.3))'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >Brewing Wealth</motion.div>
            </div>
          </motion.a>
          
          <nav className="flex items-center gap-1">
            {menuItems.map((section, idx) => (
              <div
                key={section.title}
                className="relative"
                onMouseEnter={() => setOpenMenu(idx)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button 
                  className={`flex items-center gap-1 px-4 py-2 transition-all duration-200 ${
                    openMenu === idx 
                      ? 'text-green-400 border-b-2 border-green-400' 
                      : 'text-white hover:text-green-300'
                  }`}
                  style={{
                    backgroundColor: 'transparent',
                    background: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    outline: 'none'
                  }}
                >
                  {section.title} <ChevronDown size={16} />
                </button>
                
                {/* Invisible hover bridge */}
                {openMenu === idx && (
                  <div className="absolute left-0 top-full w-full h-2 z-[59]" />
                )}
                
                {openMenu === idx && (
                  <motion.div 
                    className="absolute left-0 top-full mt-2 bg-white/95 backdrop-blur-sm text-black rounded-xl shadow-2xl border border-gray-100/50 z-[60] overflow-hidden"
                    style={{
                      width: section.title === 'Brew Bot' ? '500px' : '320px',
                      minWidth: '280px'
                    }}
                    initial={{ opacity: 0, scaleY: 0, y: -10 }}
                    animate={{ opacity: 1, scaleY: 1, y: 0 }}
                    exit={{ opacity: 0, scaleY: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {/* Dropdown content */}
                    <div className="p-4">
                      <div className={`grid gap-3 ${section.title === 'Brew Bot' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                        {section.items.map((item, itemIdx) => (
                          <motion.div 
                            key={item.name}
                            className="flex items-start gap-3 hover:bg-green-50/50 p-3 rounded-lg transition-all duration-200 hover:shadow-sm cursor-pointer group border border-transparent hover:border-green-200/50"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: itemIdx * 0.05 }}
                            whileHover={{ scale: 1.02, x: 2 }}
                          >
                            <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                            <div className="min-w-0">
                              <div className="font-semibold text-sm text-gray-900 group-hover:text-green-700 transition-colors">{item.name}</div>
                              <div className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">{item.description}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </nav>
        </motion.div>

        <motion.div 
          className="flex items-center flex-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <motion.div 
            className="flex-1 mx-6 relative z-20"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <SearchInput
              placeholder="Search funds, stocks, insights..."
              className="w-full relative z-30 search-container"
              inputClassName="w-full h-12 bg-[#1c1f26] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 hover:bg-[#252830] focus:bg-[#252830] placeholder-gray-400 relative z-30"
              debounceMs={300}
              ariaLabel="Global search"
            />
          </motion.div>
          <motion.div 
            className="flex items-center gap-4 ml-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
          
          {isAuthenticated ? (
            <button 
              onClick={onSignOut}
              className="flex items-center gap-1 hover:text-green-300 transition-colors"
              style={{
                backgroundColor: 'transparent',
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                outline: 'none'
              }}
            >
              <LogIn size={18} /> Sign Out
            </button>
          ) : (
            <motion.button 
              onClick={onSignIn}
              data-signin-button="true"
              className="font-semibold px-6 py-2 transition-all duration-300"
              style={{
                background: 'linear-gradient(90deg, #00FF87 0%, #4AE3F7 50%, #00FF87 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                outline: 'none'
              }}
              whileHover={{ 
                scale: 1.05,
                filter: 'drop-shadow(0 0 8px rgba(0, 255, 135, 0.5))'
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                filter: [
                  'drop-shadow(0 0 4px rgba(0, 255, 135, 0.3))',
                  'drop-shadow(0 0 8px rgba(0, 255, 135, 0.5))',
                  'drop-shadow(0 0 4px rgba(0, 255, 135, 0.3))'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <UserPlus size={18} className="inline mr-1" style={{
                color: '#00FF87'
              }} /> Sign In/Up
            </motion.button>
          )}
          </motion.div>
        </motion.div>
      </motion.div>
    </header>
  );
}
