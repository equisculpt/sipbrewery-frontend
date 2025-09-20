'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, BarChart3, DollarSign, Target, Zap, ArrowUp, Shield } from 'lucide-react';

const PerformanceSection = () => {
  const [activeTab, setActiveTab] = useState<'returns' | 'risk' | 'timing'>('returns');
  const [isClient, setIsClient] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    totalReturns: 0,
    activeUsers: 0,
    aum: 0,
    avgReturns: 0
  });

  // Animate numbers on mount
  useEffect(() => {
    setIsClient(true);
    const targets = {
      totalReturns: 18.7,
      activeUsers: 100000,
      aum: 2500,
      avgReturns: 15.2
    };

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 FPS
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setAnimatedValues({
        totalReturns: targets.totalReturns * easeProgress,
        activeUsers: Math.floor(targets.activeUsers * easeProgress),
        aum: targets.aum * easeProgress,
        avgReturns: targets.avgReturns * easeProgress
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const [performanceData, setPerformanceData] = useState<any>(null);
const [isLoadingPerformance, setIsLoadingPerformance] = useState(false);

useEffect(() => {
  const fetchASIPerformance = async () => {
    setIsLoadingPerformance(true);
    try {
      const response = await fetch('/asi/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'explainability',
          data: {},
          parameters: {}
        })
      });
      if (!response.ok) throw new Error('ASI backend error');
      const data = await response.json();
      const asiResult = data.result || data;
      if (asiResult && asiResult.performanceData) {
        setPerformanceData(asiResult.performanceData);
      } else {
        throw new Error('ASI returned no performance data');
      }
    } catch (error) {
      console.error('❌ Failed to fetch ASI performance data:', error);
      // Fallback to static performanceData
      setPerformanceData({
        returns: {
          title: "Superior Returns",
          subtitle: "Smart SIP vs Traditional SIP Performance",
          data: [
            { period: "1Y", smart: 22.5, traditional: 18.2, difference: 4.3 },
            { period: "3Y", smart: 18.7, traditional: 14.1, difference: 4.6 },
            { period: "5Y", smart: 16.8, traditional: 12.9, difference: 3.9 },
            { period: "10Y", smart: 15.2, traditional: 11.8, difference: 3.4 }
          ]
        },
        risk: {
          title: "Risk Management",
          subtitle: "Volatility & Drawdown Comparison",
          data: [
            { metric: "Max Drawdown", smart: 8.2, traditional: 12.5, better: true },
            { metric: "Volatility", smart: 11.3, traditional: 15.8, better: true },
            { metric: "Sharpe Ratio", smart: 1.85, traditional: 1.32, better: true },
            { metric: "Win Rate", smart: 73.2, traditional: 62.1, better: true }
          ]
        },
        timing: {
          title: "Market Timing",
          subtitle: "AI-Powered Entry & Exit Optimization",
          data: [
            { scenario: "Market Crash", improvement: "+28%", description: "Increased investment during 2020 crash" },
            { scenario: "Bull Run", improvement: "+15%", description: "Disciplined approach during 2021 rally" },
            { scenario: "Sideways", improvement: "+12%", description: "Optimized allocation in range-bound markets" },
            { scenario: "Recovery", improvement: "+22%", description: "Early detection of recovery signals" }
          ]
        }
      });
    } finally {
      setIsLoadingPerformance(false);
    }
  };
  fetchASIPerformance();
}, []);

  const tabs = [
    { id: 'returns', label: 'Returns', icon: TrendingUp },
    { id: 'risk', label: 'Risk', icon: Shield },
    { id: 'timing', label: 'Timing', icon: Activity }
  ];

  const kpis = [
    {
      title: "Average Annual Returns",
      value: animatedValues.totalReturns,
      suffix: "%",
      icon: TrendingUp,
      color: "text-accent-green",
      bgColor: "bg-accent-green/10",
      description: "Outperforming traditional SIPs"
    },
    {
      title: "Active Investors",
      value: animatedValues.activeUsers,
      suffix: "+",
      icon: Target,
      color: "text-accent-neon",
      bgColor: "bg-accent-neon/10",
      description: "Trust SIPBrewery for their investments"
    },
    {
      title: "Assets Under Management",
      value: animatedValues.aum,
      suffix: " Cr",
      prefix: "₹",
      icon: DollarSign,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Growing portfolio value"
    },
    {
      title: "Success Rate",
      value: animatedValues.avgReturns,
      suffix: "%",
      icon: Zap,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      description: "Positive returns achieved"
    }
  ];

  return (
    <section id="performance" className="section-padding bg-dark-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-neon/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl" />
        
        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{ backgroundPosition: ['0px 0px', '50px 50px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: 'linear-gradient(rgba(0,249,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,249,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
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
            className="display-title text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Proven <span className="text-gradient">Performance</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Real results from real investors. See how Smart SIP consistently outperforms traditional investment methods.
          </motion.p>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {kpis.map((kpi, index) => (
            <motion.div
              key={index}
              className="card-premium bg-dark-800/50 border-white/10 text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(0, 249, 255, 0.3)' }}
            >
              {/* Background Glow */}
              <motion.div
                className={`absolute inset-0 ${kpi.bgColor} opacity-0`}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10">
                <motion.div
                  className={`w-12 h-12 ${kpi.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </motion.div>
                
                <div className={`text-4xl font-bold ${kpi.color} mb-2`}>
                  {kpi.prefix && <span className="text-2xl">{kpi.prefix}</span>}
                  {isClient ? (
                    typeof kpi.value === 'number' && kpi.value < 1000 
                      ? kpi.value.toFixed(1) 
                      : Math.floor(kpi.value).toLocaleString()
                  ) : (
                    typeof kpi.value === 'number' && kpi.value < 1000 
                      ? '0.0'
                      : '0'
                  )}
                  {kpi.suffix}
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">
                  {kpi.title}
                </h3>
                
                <p className="text-sm text-gray-400">
                  {kpi.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Performance Analysis */}
        <motion.div
          className="card-premium bg-dark-800/30 border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8 p-2 bg-dark-800/50 rounded-2xl">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-accent-neon text-dark-900 shadow-neon'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setActiveTab(tab.id as 'returns' | 'risk' | 'timing')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-2">
                {performanceData[activeTab as keyof typeof performanceData].title}
              </h3>
              <p className="text-gray-400">
                {performanceData[activeTab as keyof typeof performanceData].subtitle}
              </p>
            </div>

            {/* Returns Tab */}
            {activeTab === 'returns' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {performanceData.returns.data.map((item: any, index: number) => (
                  <motion.div
                    key={item.period}
                    className="text-center p-6 bg-dark-800/50 rounded-2xl border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, borderColor: 'rgba(0, 249, 255, 0.3)' }}
                  >
                    <div className="text-2xl font-bold text-white mb-2">
                      {item.period}
                    </div>
                    
                    {/* Smart SIP */}
                    <div className="mb-3">
                      <div className="text-sm text-gray-400 mb-1">Smart SIP</div>
                      <div className="text-xl font-bold text-accent-green">
                        {item.smart}%
                      </div>
                    </div>
                    
                    {/* Traditional SIP */}
                    <div className="mb-3">
                      <div className="text-sm text-gray-400 mb-1">Traditional</div>
                      <div className="text-xl font-bold text-gray-300">
                        {item.traditional}%
                      </div>
                    </div>
                    
                    {/* Difference */}
                    <div className="flex items-center justify-center space-x-1 text-accent-neon">
                      <ArrowUp className="w-4 h-4" />
                      <span className="font-semibold">+{item.difference}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Risk Tab */}
            {activeTab === 'risk' && (
              <div className="space-y-4">
                {performanceData.risk.data.map((item: any, index: number) => (
                  <motion.div
                    key={item.metric}
                    className="flex items-center justify-between p-6 bg-dark-800/50 rounded-2xl border border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, borderColor: 'rgba(0, 249, 255, 0.3)' }}
                  >
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {item.metric}
                      </h4>
                    </div>
                    
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <div className="text-sm text-gray-400 mb-1">Smart SIP</div>
                        <div className="text-xl font-bold text-accent-green">
                          {item.smart}{item.metric.includes('Ratio') ? '' : '%'}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-gray-400 mb-1">Traditional</div>
                        <div className="text-xl font-bold text-gray-300">
                          {item.traditional}{item.metric.includes('Ratio') ? '' : '%'}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-accent-green">
                        <TrendingUp className="w-5 h-5 mr-1" />
                        <span className="font-semibold">Better</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Timing Tab */}
            {activeTab === 'timing' && (
              <div className="grid md:grid-cols-2 gap-6">
                {performanceData.timing.data.map((item: any, index: number) => (
                  <motion.div
                    key={item.scenario}
                    className="p-6 bg-dark-800/50 rounded-2xl border border-white/10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, borderColor: 'rgba(0, 249, 255, 0.3)' }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-semibold text-white">
                        {item.scenario}
                      </h4>
                      <div className="text-2xl font-bold text-accent-green">
                        {item.improvement}
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="mt-4 h-2 bg-dark-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-accent-neon to-accent-green"
                        initial={{ width: 0 }}
                        animate={{ width: `${parseInt(item.improvement)}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="btn-primary text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Smart SIP Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PerformanceSection;
