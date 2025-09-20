'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Brain, 
  Shield, 
  Zap, 
  Target, 
  Activity, 
  TrendingUp, 
  BarChart3, 
  Smartphone,
  Award,
  Clock,
  DollarSign,
  ArrowRight
} from 'lucide-react';

const FeaturesSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      title: "AI-Powered Market Analysis",
      description: "Advanced machine learning algorithms analyze 15+ market indicators, economic data, and global events in real-time to identify optimal investment opportunities.",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      stats: { accuracy: "99.7%", sources: "15+", speed: "3.2s" },
      benefits: ["Real-time market monitoring", "Predictive analytics", "Risk assessment", "Opportunity detection"],
      gradient: "from-purple-500/10 to-pink-500/10"
    },
    {
      id: 2,
      title: "Dynamic SIP Adjustment",
      description: "Automatically adjusts your SIP amount based on market conditions - invest more during dips and maintain discipline during peaks for superior returns.",
      icon: BarChart3,
      color: "from-accent-neon to-blue-500",
      stats: { adjustment: "40%", timing: "24h", automation: "100%" },
      benefits: ["Automatic optimization", "Market timing", "Disciplined investing", "Enhanced returns"],
      gradient: "from-accent-neon/10 to-blue-500/10"
    },
    {
      id: 3,
      title: "SEBI Compliant Security",
      description: "Bank-grade security with SEBI compliance, encrypted transactions, and regulatory adherence to keep your investments safe and compliant.",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      stats: { compliance: "100%", encryption: "256-bit", uptime: "99.9%" },
      benefits: ["SEBI registered", "Bank-grade security", "Encrypted data", "Regulatory compliance"],
      gradient: "from-green-500/10 to-emerald-500/10"
    },
    {
      id: 4,
      title: "Lightning Fast Execution",
      description: "Execute trades and adjustments in milliseconds with our high-performance infrastructure, ensuring you never miss market opportunities.",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      stats: { speed: "50ms", uptime: "99.99%", capacity: "10K/s" },
      benefits: ["Instant execution", "High availability", "Scalable infrastructure", "Real-time processing"],
      gradient: "from-yellow-500/10 to-orange-500/10"
    },
    {
      id: 5,
      title: "Precision Goal Tracking",
      description: "Set and track your financial goals with precision. Our AI helps you stay on track with personalized recommendations and progress monitoring.",
      icon: Target,
      color: "from-red-500 to-pink-500",
      stats: { accuracy: "98%", tracking: "24/7", goals: "Unlimited" },
      benefits: ["Goal-based investing", "Progress tracking", "Personalized advice", "Milestone alerts"],
      gradient: "from-red-500/10 to-pink-500/10"
    },
    {
      id: 6,
      title: "Real-Time Performance",
      description: "Monitor your portfolio performance in real-time with detailed analytics, insights, and actionable recommendations for continuous improvement.",
      icon: Activity,
      color: "from-accent-green to-green-500",
      stats: { updates: "Real-time", metrics: "50+", insights: "Daily" },
      benefits: ["Live portfolio tracking", "Performance analytics", "Detailed insights", "Action recommendations"],
      gradient: "from-accent-green/10 to-green-500/10"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  return (
    <section id="features" className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent-neon rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-green rounded-full blur-3xl" />
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
            Powerful Features for <span className="text-gradient">Smart Investing</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Experience the future of mutual fund investing with AI-powered intelligence, automated optimization, and enterprise-grade security.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="group relative"
              variants={itemVariants}
              onHoverStart={() => setHoveredFeature(feature.id)}
              onHoverEnd={() => setHoveredFeature(null)}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`relative p-8 rounded-3xl bg-white border-2 border-gray-200 shadow-soft transition-all duration-300 overflow-hidden ${
                hoveredFeature === feature.id 
                  ? 'border-accent-neon/50 shadow-neon' 
                  : 'group-hover:border-accent-neon/30'
              }`}>
                
                {/* Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300`}
                  animate={{ opacity: hoveredFeature === feature.id ? 1 : 0 }}
                />

                {/* Animated Background Pattern */}
                {hoveredFeature === feature.id && (
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-full h-full bg-grid" />
                  </motion.div>
                )}

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 relative`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                    
                    {/* Pulse Effect */}
                    {hoveredFeature === feature.id && (
                      <motion.div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-30`}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-dark-900 mb-4 group-hover:text-accent-neon transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {Object.entries(feature.stats).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="text-lg font-bold text-accent-neon">
                          {value}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Benefits */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredFeature === feature.id ? 1 : 0,
                      height: hoveredFeature === feature.id ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.benefits.map((benefit, index) => (
                      <motion.div
                        key={benefit}
                        className="flex items-center space-x-2 text-sm text-gray-600"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: hoveredFeature === feature.id ? 1 : 0,
                          x: hoveredFeature === feature.id ? 0 : -10
                        }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 bg-accent-green rounded-full" />
                        <span>{benefit}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Learn More Button */}
                  <motion.button
                    className="mt-6 flex items-center space-x-2 text-accent-neon font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Hover Glow Effect */}
                {hoveredFeature === feature.id && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent-neon/10 to-accent-green/10 blur-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section - Why Choose Us */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-dark-900 mb-8">
              Why 1,00,000+ Investors Choose <span className="text-gradient">SIPBrewery</span>
            </h3>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Award, title: "SEBI Registered", desc: "Fully compliant platform" },
                { icon: Clock, title: "24/7 Monitoring", desc: "Round-the-clock market watch" },
                { icon: DollarSign, title: "Zero Hidden Fees", desc: "Transparent pricing model" },
                { icon: Smartphone, title: "Mobile First", desc: "Invest anywhere, anytime" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-neon rounded-2xl flex items-center justify-center mx-auto mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-6 h-6 text-dark-900" />
                  </motion.div>
                  <h4 className="text-lg font-semibold text-dark-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
