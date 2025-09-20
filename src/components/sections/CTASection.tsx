'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp, Shield, Clock, CheckCircle } from 'lucide-react';

const CTASection = () => {
  const benefits = [
    { icon: Zap, text: "Start in 2 minutes" },
    { icon: TrendingUp, text: "AI-powered optimization" },
    { icon: Shield, text: "SEBI registered & secure" },
    { icon: Clock, text: "24/7 market monitoring" }
  ];

  const steps = [
    { number: "01", title: "Sign Up", description: "Create your account in under 2 minutes" },
    { number: "02", title: "Set Goals", description: "Define your investment objectives" },
    { number: "03", title: "Start Smart SIP", description: "Let AI optimize your investments" }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-green-900/20 to-cyan-900/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Gradient Overlay */}
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
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent-neon rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * -100 - 25],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
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

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5 bg-grid" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Main CTA Content */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="display-title text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Ready to <span className="text-gradient">Transform</span> Your Investments?
            </motion.h2>
            
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join 1,00,000+ smart investors who have already upgraded to AI-powered investing. 
              Start your Smart SIP journey today and experience the future of wealth creation.
            </motion.p>

            {/* Benefits */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(0, 249, 255, 0.5)' }}
                >
                  <benefit.icon className="w-4 h-4 text-accent-neon" />
                  <span className="text-white text-sm font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Main CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
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
                  <span>Schedule a Demo</span>
                  <Clock className="w-5 h-5" />
                </span>
              </motion.button>
            </motion.div>

            {/* Trust Indicator */}
            <motion.p
              className="text-sm text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              ✨ No commitment required • Start with as low as ₹500/month • SEBI registered platform
            </motion.p>
          </motion.div>

          {/* How It Works Steps */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Get Started in 3 Simple Steps
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                It takes less than 5 minutes to set up your Smart SIP and start your journey towards smarter investing.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Step Number */}
                  <motion.div
                    className="relative inline-block mb-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-20 h-20 bg-gradient-neon rounded-full flex items-center justify-center text-dark-900 text-2xl font-bold relative z-10">
                      {step.number}
                    </div>
                    
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-neon rounded-full blur-xl opacity-50"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Content */}
                  <h4 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h4>
                  <p className="text-gray-300">
                    {step.description}
                  </p>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-accent-neon to-transparent"
                      style={{ marginLeft: '2.5rem' }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                      viewport={{ once: true }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Final Urgency Section */}
          <motion.div
            className="text-center bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-accent-green/20 text-accent-green px-4 py-2 rounded-full text-sm font-semibold mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-4 h-4" />
              <span>Limited Time: Zero Setup Fees</span>
            </motion.div>

            <h3 className="text-2xl font-bold text-white mb-4">
              Don't Let Market Opportunities Pass You By
            </h3>
            
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Every day you wait is a day of potential returns lost. Our AI has already identified the next market opportunity. 
              Join now and let Smart SIP work for you 24/7.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-6">
              {[
                "✓ No lock-in period",
                "✓ Start/stop anytime", 
                "✓ Full transparency",
                "✓ Expert support"
              ].map((feature, index) => (
                <motion.span
                  key={index}
                  className="flex items-center space-x-1"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle className="w-4 h-4 text-accent-green" />
                  <span>{feature}</span>
                </motion.span>
              ))}
            </div>

            <motion.button
              className="btn-primary text-xl px-12 py-5 font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <span>Claim Your Smart SIP Now</span>
                <ArrowRight className="w-6 h-6" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
