'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Brain, BarChart3, TrendingUp, ArrowRight, Zap, Target, Activity } from 'lucide-react';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Analyze Market",
      subtitle: "AI monitors market conditions",
      description: "Our advanced AI continuously monitors market volatility, economic indicators, fund performance, and global events to detect optimal investment opportunities in real-time.",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      chartData: [40, 30, 20, 35, 45, 55, 50, 60, 45],
      highlight: "Market volatility detected - Opportunity identified",
      stats: { accuracy: "99.7%", speed: "3.2s", sources: "15+" }
    },
    {
      id: 1,
      title: "Auto SIP Adjustment",
      subtitle: "Dynamic amount optimization",
      description: "When markets dip, Smart SIP automatically increases your investment amount to buy more units at lower prices. When markets peak, it maintains discipline to protect your gains.",
      icon: BarChart3,
      color: "from-accent-neon to-blue-500",
      chartData: [50, 45, 40, 60, 75, 80, 85, 90, 95],
      highlight: "SIP amount increased by 40% during market dip",
      stats: { adjustment: "40%", timing: "24h", automation: "100%" }
    },
    {
      id: 2,
      title: "Superior Growth",
      subtitle: "Outperform static SIPs",
      description: "By buying more during market lows and maintaining discipline during highs, Smart SIP delivers significantly better returns than traditional fixed SIPs over the long term.",
      icon: TrendingUp,
      color: "from-accent-green to-green-500",
      chartData: [60, 70, 75, 85, 95, 110, 125, 140, 155],
      highlight: "+18% better returns vs static SIP over 3 years",
      stats: { outperformance: "+18%", period: "3Y", investors: "1L+" }
    }
  ];

  const currentStep = steps[activeStep];

  return (
    <section id="how-it-works" className="section-padding bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="display-title text-dark-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Smart SIP in <span className="text-gradient">Action</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Market volatility? We adapt. You grow. See how our AI transforms market challenges into investment opportunities.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Steps Navigation */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className={`relative cursor-pointer transition-all duration-300 ${
                  activeStep === index 
                    ? 'scale-105' 
                    : 'hover:scale-102'
                }`}
                onClick={() => setActiveStep(index)}
                whileHover={{ x: 10 }}
              >
                <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-gradient-to-r from-accent-neon/10 to-accent-green/10 border-accent-neon/50 shadow-neon' 
                    : 'bg-white border-gray-200 hover:border-accent-neon/30 shadow-soft'
                }`}>
                  
                  {/* Step Number & Icon */}
                  <div className="flex items-start space-x-4">
                    <motion.div
                      className={`relative w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${step.color}`}
                      animate={activeStep === index ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                      {activeStep === index && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-neon/20 to-accent-green/20"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      {/* Step Number */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-dark-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-dark-900 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-accent-neon text-sm font-semibold mb-3">
                        {step.subtitle}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                      
                      {activeStep === index && (
                        <motion.div
                          className="mt-4 flex items-center text-accent-green text-sm font-semibold"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          {step.highlight}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Active Indicator */}
                {activeStep === index && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-neon to-accent-green rounded-r"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Interactive Visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-dark-900 rounded-3xl p-8 shadow-premium">
              
              {/* Chart Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {currentStep.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Live Market Simulation
                  </p>
                </div>
                <motion.div
                  className={`w-4 h-4 rounded-full bg-gradient-to-r ${currentStep.color}`}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Animated Chart */}
              <div className="h-64 relative bg-dark-800/50 rounded-2xl p-6 overflow-hidden mb-6">
                <div className="flex items-end justify-between h-full space-x-2">
                  {currentStep.chartData.map((value, index) => (
                    <motion.div
                      key={`${activeStep}-${index}`}
                      className={`bg-gradient-to-t ${currentStep.color} rounded-t-lg flex-1 relative`}
                      initial={{ height: 0 }}
                      animate={{ height: `${value}%` }}
                      transition={{ 
                        delay: index * 0.1,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100
                      }}
                    >
                      {/* Highlight Active Bar */}
                      {index === Math.floor(currentStep.chartData.length / 2) && (
                        <motion.div
                          className="absolute inset-0 bg-white/20 rounded-t-lg"
                          animate={{ opacity: [0, 0.5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
                
                {/* Chart Labels */}
                <div className="absolute bottom-2 left-6 right-6 flex justify-between text-xs text-gray-400">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>

                {/* Live Indicator */}
                <motion.div
                  className="absolute top-4 right-4 flex items-center space-x-2"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-accent-green rounded-full" />
                  <span className="text-xs text-accent-green font-medium">LIVE</span>
                </motion.div>
              </div>

              {/* Performance Metrics */}
              <motion.div
                className="grid grid-cols-3 gap-4"
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {Object.entries(currentStep.stats).map(([key, value], index) => (
                  <div key={key} className="text-center p-4 bg-dark-800/30 rounded-xl border border-white/10">
                    <div className="text-2xl font-bold text-accent-neon mb-1">
                      {value}
                    </div>
                    <div className="text-xs text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-12 h-12 bg-accent-green rounded-full opacity-20"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-8 h-8 bg-accent-neon rounded-full opacity-20"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="btn-primary group text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center space-x-2">
              <span>Learn More</span>
              <motion.div
                className="group-hover:translate-x-1 transition-transform"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
