'use client';

import React, { useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area, ComposedChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, PieChart as PieChartIcon, Calendar, IndianRupee, Wallet, TrendingDown, BarChart3, Sparkles, Clock, ArrowUpRight, ArrowDownRight, Settings2, Layers, Activity, Target, GitBranch, PlayCircle, Save } from 'lucide-react';
import PayTMStyleNavigation from './PayTMStyleNavigation';

// Sample data for Portfolio Growth with realistic XIRR calculation
// XIRR is calculated based on actual cash flows (investments in, returns out)
const portfolioGrowthData = [
  { date: 'Jan 2023', portfolioValue: 10000, xirr: 0, totalInvested: 10000, profit: 0 },
  { date: 'Feb 2023', portfolioValue: 22000, xirr: 8.5, totalInvested: 20000, profit: 2000 },
  { date: 'Mar 2023', portfolioValue: 31500, xirr: 12.3, totalInvested: 30000, profit: 1500 },
  { date: 'Apr 2023', portfolioValue: 43200, xirr: 15.8, totalInvested: 40000, profit: 3200 },
  { date: 'May 2023', portfolioValue: 56800, xirr: 18.2, totalInvested: 50000, profit: 6800 },
  { date: 'Jun 2023', portfolioValue: 69500, xirr: 19.7, totalInvested: 60000, profit: 9500 },
  { date: 'Jul 2023', portfolioValue: 83200, xirr: 21.4, totalInvested: 70000, profit: 13200 },
  { date: 'Aug 2023', portfolioValue: 96800, xirr: 22.1, totalInvested: 80000, profit: 16800 },
  { date: 'Sep 2023', portfolioValue: 112500, xirr: 23.8, totalInvested: 90000, profit: 22500 },
  { date: 'Oct 2023', portfolioValue: 127200, xirr: 24.9, totalInvested: 100000, profit: 27200 },
  { date: 'Nov 2023', portfolioValue: 143800, xirr: 26.2, totalInvested: 110000, profit: 33800 },
  { date: 'Dec 2023', portfolioValue: 165000, xirr: 27.5, totalInvested: 120000, profit: 45000 }
];

// Sample data for Investment Allocation Pie Chart
const investmentAllocationData = [
  { name: 'Large Cap Equity', value: 35, amount: 57750, color: '#00FF87' },
  { name: 'Mid Cap Equity', value: 25, amount: 41250, color: '#4AE3F7' },
  { name: 'Small Cap Equity', value: 15, amount: 24750, color: '#FF6B6B' },
  { name: 'International Funds', value: 10, amount: 16500, color: '#FFD93D' },
  { name: 'Debt Funds', value: 10, amount: 16500, color: '#A78BFA' },
  { name: 'ELSS (Tax Saving)', value: 5, amount: 8250, color: '#FB7185' }
];

const DemoDashboard = () => {
  const [selectedSlice, setSelectedSlice] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activePanel, setActivePanel] = useState<'actions'|'reports'|'copilot'|'backtest'|'risk'|'goals'|'sandbox'>('actions');
  // Quick actions modal state
  const [showNewSIP, setShowNewSIP] = useState(false);
  const [showNewLumpsum, setShowNewLumpsum] = useState(false);
  const [showReportModal, setShowReportModal] = useState<null | { type: 'generate' | 'view'; report?: string }>(null);
  const sipModalRef = useRef<HTMLDivElement | null>(null);
  const lumpsumModalRef = useRef<HTMLDivElement | null>(null);
  const reportModalRef = useRef<HTMLDivElement | null>(null);
  // Focus management for modals
  useModalFocusTrap(!!showNewSIP, sipModalRef, () => setShowNewSIP(false));
  useModalFocusTrap(!!showNewLumpsum, lumpsumModalRef, () => setShowNewLumpsum(false));
  useModalFocusTrap(!!showReportModal, reportModalRef, () => setShowReportModal(null));
  // Copilot state (demo simulation)
  const [sipIncrease, setSipIncrease] = useState<number>(10); // percent
  const [riskTilt, setRiskTilt] = useState<number>(0); // -2 defensive .. +2 aggressive
  const [taxRegime, setTaxRegime] = useState<'old' | 'new'>('new');
  const projectedCAGR = Math.min(28, Math.max(6, 12 + sipIncrease * 0.15 + riskTilt * 1.2));
  const riskDelta = Number((riskTilt * 2.5).toFixed(1));

  // Toast + Export helpers
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toast = (msg: string) => { setToastMsg(msg); window.setTimeout(()=>setToastMsg(null), 2500); };
  // Report selection state for Generate Report modal
  const [reportType, setReportType] = useState<string>('performance');
  const [reportFormat, setReportFormat] = useState<'PDF'|'CSV'>('PDF');
  // Export to backend and download
  const exportReport = async (key: string, format: 'PDF'|'CSV' = 'PDF') => {
    try {
      const res = await fetch(`/api/reports/export?type=${encodeURIComponent(key)}&format=${encodeURIComponent(format)}`);
      if (!res.ok) throw new Error(`Export failed (${res.status})`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${key}-${new Date().toISOString().slice(0,10)}.${format.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast(`Export ready: ${key.toUpperCase()} (${format})`);
    } catch (e: any) {
      console.error(e);
      toast(e?.message || 'Export failed');
    }
  };

  // Tabs ARIA: refs and keyboard navigation
  const tabKeys: Array<typeof activePanel> = ['actions','reports','copilot','backtest','risk','goals','sandbox'];
  const tablistRef = useRef<HTMLDivElement | null>(null);
  const onTabKeyDown = (e: React.KeyboardEvent) => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
    e.preventDefault();
    const currentIndex = tabKeys.indexOf(activePanel);
    let nextIndex = currentIndex;
    if (e.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabKeys.length;
    if (e.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabKeys.length) % tabKeys.length;
    if (e.key === 'Home') nextIndex = 0;
    if (e.key === 'End') nextIndex = tabKeys.length - 1;
    const nextKey = tabKeys[nextIndex];
    setActivePanel(nextKey);
    // move focus to the newly selected tab
    const el = document.getElementById(`tab-${nextKey}`);
    el?.focus();
  };

  // Modal focus trap helper
  const useModalFocusTrap = (open: boolean, containerRef: React.RefObject<HTMLDivElement>, onClose: ()=>void) => {
    useEffect(() => {
      if (!open || !containerRef.current) return;
      const container = containerRef.current;
      const focusables = container.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      focusables[0]?.focus();
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') { e.preventDefault(); onClose(); }
        if (e.key === 'Tab') {
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (!first || !last) return;
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      };
      document.addEventListener('keydown', handleKey);
      return () => document.removeEventListener('keydown', handleKey);
    }, [open, containerRef, onClose]);
  };
  
  const currentData = portfolioGrowthData[portfolioGrowthData.length - 1];
  const currentPortfolioValue = currentData.portfolioValue;
  const currentXIRR = currentData.xirr;
  const totalInvested = currentData.totalInvested;
  const totalProfit = currentData.profit;
  const absoluteGrowth = ((totalProfit / totalInvested) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-slate-950 relative overflow-hidden">
      {/* Premium Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/25 via-indigo-950/35 to-purple-950/45" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/10 via-transparent to-purple-950/15" />
        
        {/* Premium floating orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${[
                'rgba(139, 92, 246, 0.3)',
                'rgba(59, 130, 246, 0.3)',
                'rgba(168, 85, 247, 0.3)',
                'rgba(34, 197, 94, 0.2)'
              ][i % 4]} 0%, transparent 70%)`,
            }}
            animate={prefersReducedMotion ? undefined : {
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [1, 1.2, 1],
            }}
            transition={prefersReducedMotion ? undefined : {
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
        
        {/* Enhanced sparkle constellation */}
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, ${[
                  'rgba(255, 255, 255, 0.8)',
                  'rgba(139, 92, 246, 0.6)',
                  'rgba(59, 130, 246, 0.6)',
                  'rgba(168, 85, 247, 0.6)'
                ][i % 4]} 0%, transparent 70%)`,
              }}
              animate={prefersReducedMotion ? undefined : {
                opacity: [0, 1, 0.3, 1, 0],
                scale: [0, 1.5, 1, 1.2, 0],
              }}
              transition={prefersReducedMotion ? undefined : {
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
        
        {/* Premium shimmer waves */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/2 to-transparent"
          animate={prefersReducedMotion ? undefined : { x: ['-200%', '200%'] }}
          transition={prefersReducedMotion ? undefined : { duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
      {/* PayTM Style Navigation */}
      <PayTMStyleNavigation 
        isAuthenticated={false}
        onSignIn={() => console.log('Sign In')}
        onSignUp={() => console.log('Sign Up')}
        onSignOut={() => console.log('Sign Out')}
      />
      
      {/* Hero Section */}
      <div className="pt-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <motion.div 
            className="text-center mb-12 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              Portfolio Dashboard
            </h1>
            <p className="text-center text-purple-100/90 text-base sm:text-lg max-w-2xl mx-auto bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-cyan-200 to-purple-200">
              Build wealth with live, intelligent insights â€” beautifully clear and instantly actionable.
            </p>
            {/* KPI strip */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="inline-flex items-center justify-center gap-2 rounded-full px-3 py-1  text-purple-100 text-sm tabular-nums">
                <span className="text-white/90">â‚¹{currentPortfolioValue.toLocaleString()}</span>
                <span className="text-purple-300">Value</span>
              </div>
              <div className="inline-flex items-center justify-center gap-2 rounded-full px-3 py-1  text-green-200 text-sm tabular-nums">
                <span className="text-green-400">+â‚¹{totalProfit.toLocaleString()}</span>
                <span className="text-green-300/90">Profit</span>
              </div>
              <div className="inline-flex items-center justify-center gap-2 rounded-full px-3 py-1  text-cyan-200 text-sm tabular-nums">
                <span className="text-cyan-300">{currentXIRR}%</span>
                <span className="text-cyan-200/90">XIRR</span>
              </div>
              <div className="inline-flex items-center justify-center gap-2 rounded-full px-3 py-1  text-blue-200 text-sm tabular-nums">
                <span className="text-blue-300">â‚¹{totalInvested.toLocaleString()}</span>
                <span className="text-blue-200/90">Invested</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            
            {/* Portfolio Growth Chart */}
            <motion.div 
              className=" focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.99]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              tabIndex={0}
              aria-label={`Portfolio Growth, value â‚¹${currentPortfolioValue.toLocaleString()}, profit â‚¹${totalProfit.toLocaleString()}, XIRR ${currentXIRR}%`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Portfolio Growth</h3>
                    <p className="text-purple-200 text-sm">Since you joined</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">
                    â‚¹{currentPortfolioValue.toLocaleString()}
                  </div>
                  <div className="text-sm text-purple-200">
                    +â‚¹{totalProfit.toLocaleString()} profit
                  </div>
                </div>
              </div>
              
              <div className="h-64 sm:h-72 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={portfolioGrowthData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="date" 
                      stroke="rgba(255,255,255,0.7)"
                      fontSize={12}
                      tickFormatter={(value) => value.split(' ')[0]}
                    />
                    <YAxis 
                      yAxisId="portfolio"
                      orientation="left"
                      stroke="rgba(255,255,255,0.7)"
                      fontSize={12}
                      tickFormatter={(value) => `â‚¹${(value/1000).toFixed(0)}K`}
                    />
                    <YAxis 
                      yAxisId="xirr"
                      orientation="right"
                      stroke="rgba(255,255,255,0.7)"
                      fontSize={12}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(15, 15, 25, 0.95)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: '500',
                        padding: '12px 16px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(10px)'
                      }}
                      labelStyle={{
                        color: '#ffffff',
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}
                      formatter={(value: any, name: string, props: any) => {
                        if (name === 'portfolioValue') {
                          return [
                            <div style={{ color: '#ffffff' }}>
                              <div style={{ color: '#00FF87', fontWeight: '600', marginBottom: '2px' }}>
                                Portfolio: â‚¹{value.toLocaleString()}
                              </div>
                              <div style={{ color: '#fbbf24', fontSize: '12px' }}>
                                Invested: â‚¹{props.payload.totalInvested.toLocaleString()}
                              </div>
                              <div style={{ color: '#10b981', fontSize: '12px' }}>
                                Profit: â‚¹{props.payload.profit.toLocaleString()}
                              </div>
                            </div>, 
                            ''
                          ];
                        }
                        return [
                          <span style={{ color: '#4AE3F7', fontWeight: '600' }}>
                            {value}% XIRR
                          </span>, 
                          <span style={{ color: '#e2e8f0', fontSize: '12px' }}>Based on cash flows</span>
                        ];
                      }}
                    />
                    <Line 
                      yAxisId="portfolio"
                      type="monotone" 
                      dataKey="portfolioValue" 
                      stroke="#00FF87" 
                      strokeWidth={3}
                      dot={{ fill: '#00FF87', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#00FF87' }}
                    />
                    <Line 
                      yAxisId="xirr"
                      type="monotone" 
                      dataKey="xirr" 
                      stroke="#4AE3F7" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: '#4AE3F7', strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, fill: '#4AE3F7' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-purple-200">Portfolio Value</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-1 bg-cyan-400 rounded-full"></div>
                    <span className="text-sm text-purple-200">XIRR Return</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-cyan-400">
                    {currentXIRR}% XIRR
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Investment Allocation Pie Chart */}
            <motion.div 
              className=" focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.99]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -5 }}
              tabIndex={0}
              aria-label={`Investment Allocation pie, total invested â‚¹${currentPortfolioValue.toLocaleString()}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <PieChartIcon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Investment Allocation</h3>
                    <p className="text-purple-200 text-sm">Portfolio distribution</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    â‚¹{currentPortfolioValue.toLocaleString()}
                  </div>
                  <div className="text-sm text-purple-200">
                    Total invested
                  </div>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                    <Pie
                      data={investmentAllocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="value"
                      onMouseEnter={(data) => setSelectedSlice(data.name)}
                      onMouseLeave={() => setSelectedSlice(null)}
                    >
                      {investmentAllocationData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          stroke={selectedSlice === entry.name ? '#ffffff' : 'transparent'}
                          strokeWidth={selectedSlice === entry.name ? 3 : 0}
                          style={{
                            filter: selectedSlice === entry.name ? 'brightness(1.3) drop-shadow(0 0 10px rgba(255,255,255,0.3))' : 'brightness(1)',
                            transform: selectedSlice === entry.name ? 'scale(1.08)' : 'scale(1)',
                            transformOrigin: 'center',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(15, 15, 25, 0.95)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: '500',
                        padding: '12px 16px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(10px)'
                      }}
                      labelStyle={{
                        color: '#ffffff',
                        fontWeight: '600',
                        marginBottom: '4px'
                      }}
                      formatter={(value: any, name: string, props: any) => {
                        return [
                          <div style={{ color: '#ffffff' }}>
                            <div style={{ 
                              color: props.payload.color, 
                              fontWeight: '700',
                              fontSize: '16px',
                              marginBottom: '4px'
                            }}>
                              {props.payload.name}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: '#ffffff', fontWeight: '600' }}>
                                {value}%
                              </span>
                              <span style={{ color: '#6b7280' }}>â€¢</span>
                              <span style={{ color: '#00FF87', fontWeight: '600' }}>
                                â‚¹{props.payload.amount.toLocaleString()}
                              </span>
                            </div>
                          </div>,
                          ''
                        ];
                      }}
                      labelFormatter={() => null}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Legend */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/10">
                {investmentAllocationData.map((item, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                      selectedSlice === item.name 
                        ? 'bg-white/15 scale-105 shadow-lg' 
                        : 'hover:bg-white/8 hover:scale-102'
                    }`}
                    onMouseEnter={() => setSelectedSlice(item.name)}
                    onMouseLeave={() => setSelectedSlice(null)}
                  >
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0 shadow-md"
                      style={{ 
                        backgroundColor: item.color,
                        boxShadow: selectedSlice === item.name ? `0 0 15px ${item.color}40` : 'none'
                      }}
                    ></div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-white truncate">
                        {item.name}
                      </div>
                      <div className="text-xs text-purple-200">
                        {item.value}% â€¢ â‚¹{(item.amount/1000).toFixed(0)}K
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Portfolio Summary Section */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Portfolio Summary</h2>
                <p className="text-purple-300 text-sm">Real-time insights â€¢ Updated {new Date().toLocaleTimeString()}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-purple-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live Data</span>
              </div>
            </div>
            
            {/* Innovative Portfolio Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-12">
              {/* Amount Invested - Optimized Design */}
              <motion.div 
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 min-h-[150px] border border-white/30 hover:border-blue-400/50 ring-1 ring-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.45)] transition-all duration-500 group overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.99] active:shadow-[0_6px_18px_rgba(0,0,0,0.4)]"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                tabIndex={0}
                aria-label={`Principal â‚¹${(totalInvested/1000).toFixed(0)}K, Invested`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 text-center h-full flex flex-col">
                  {/* Top section */}
                  <div className="mb-4">
                    <div className="text-sm text-blue-300 font-semibold uppercase tracking-wide sm:tracking-wider mb-2">Principal</div>
                    <motion.div 
                      className="text-[1.375rem] sm:text-2xl lg:text-[1.5rem] font-bold text-white tabular-nums"
                      whileHover={{ scale: 1.05 }}
                    >
                      â‚¹{(totalInvested/1000).toFixed(0)}K
                    </motion.div>
                  </div>
                  
                  {/* Icon in perfect middle */}
                  <div className="flex-1 flex items-center justify-center">
                    <motion.div 
                      className="motion-safe:group-hover:scale-110 transition-all duration-300"
                      whileHover={{ rotate: 10 }}
                    >
                      <Wallet aria-hidden className="w-8 h-8 text-blue-300 drop-shadow-[0_2px_10px_rgba(59,130,246,0.35)]" />
                    </motion.div>
                  </div>
                  
                  {/* Bottom section */}
                  <div className="mt-4">
                    <span className="inline-flex items-center justify-center px-3 py-1 text-[13px] text-blue-200/90 bg-blue-500/20 rounded-full font-semibold backdrop-blur-sm mx-auto">
                      Invested
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Today's Change - Optimized Design */}
              <motion.div 
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 min-h-[150px] border border-white/30 hover:border-green-400/50 ring-1 ring-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.45)] transition-all duration-500 group overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.99] active:shadow-[0_6px_18px_rgba(0,0,0,0.4)]"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                tabIndex={0}
                aria-label={`Daily P&L +â‚¹2.45K, up 1.48%`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 text-center h-full flex flex-col">
                  {/* Top section */}
                  <div className="mb-4">
                    <div className="text-sm text-green-300 font-semibold uppercase tracking-wide sm:tracking-wider mb-2">Daily P&L</div>
                    <motion.div 
                      className="text-[1.375rem] sm:text-2xl lg:text-[1.5rem] font-bold text-green-400 tabular-nums"
                      whileHover={{ scale: 1.05 }}
                    >
                      +â‚¹2.45K
                    </motion.div>
                  </div>
                  
                  {/* Icon in perfect middle */}
                  <div className="flex-1 flex items-center justify-center">
                    <motion.div 
                      className="motion-safe:group-hover:scale-110 transition-all duration-300"
                      whileHover={{ rotate: -10 }}
                    >
                      <ArrowUpRight aria-hidden className="w-8 h-8 text-green-300 drop-shadow-[0_2px_10px_rgba(34,197,94,0.35)]" />
                    </motion.div>
                  </div>
                  
                  {/* Bottom section */}
                  <div className="mt-4">
                    <span className="inline-flex items-center justify-center px-3 py-1 text-[13px] bg-green-500/20 text-green-300 rounded-full font-semibold backdrop-blur-sm mx-auto tabular-nums">
                      +1.48%
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Total Gains - Optimized Design */}
              <motion.div 
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 min-h-[150px] border border-white/30 hover:border-cyan-400/50 ring-1 ring-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.45)] transition-all duration-500 group overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.99] active:shadow-[0_6px_18px_rgba(0,0,0,0.4)]"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                tabIndex={0}
                aria-label={`Total Gains â‚¹${(totalProfit/1000).toFixed(0)}K, +${absoluteGrowth.toFixed(1)}%`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 text-center h-full flex flex-col">
                  {/* Top section */}
                  <div className="mb-4">
                    <div className="text-sm text-cyan-300 font-semibold uppercase tracking-wide sm:tracking-wider mb-2">Total Gains</div>
                    <motion.div 
                      className="text-[1.375rem] sm:text-2xl lg:text-[1.5rem] font-bold text-cyan-400 tabular-nums"
                      whileHover={{ scale: 1.05 }}
                    >
                      â‚¹{(totalProfit/1000).toFixed(0)}K
                    </motion.div>
                  </div>
                  
                  {/* Icon in perfect middle */}
                  <div className="flex-1 flex items-center justify-center">
                    <motion.div 
                      className="motion-safe:group-hover:scale-110 transition-all duration-300"
                      whileHover={{ rotate: 10 }}
                    >
                      <BarChart3 aria-hidden className="w-8 h-8 text-cyan-300 drop-shadow-[0_2px_10px_rgba(34,211,238,0.35)]" />
                    </motion.div>
                  </div>
                  
                  {/* Bottom section */}
                  <div className="mt-4">
                    <span className="inline-flex items-center justify-center px-3 py-1 text-[13px] bg-cyan-500/20 text-cyan-300 rounded-full font-semibold backdrop-blur-sm mx-auto tabular-nums">
                      +{absoluteGrowth.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* XIRR Return - Optimized Design */}
              <motion.div 
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 min-h-[150px] border border-white/30 hover:border-purple-400/50 ring-1 ring-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.45)] transition-all duration-500 group overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.99] active:shadow-[0_6px_18px_rgba(0,0,0,0.4)]"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                tabIndex={0}
                aria-label={`IRR ${currentXIRR}% Annualized`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 text-center h-full flex flex-col">
                  {/* Top section */}
                  <div className="mb-4">
                    <div className="text-sm text-purple-300 font-semibold uppercase tracking-wide sm:tracking-wider mb-2">IRR</div>
                    <motion.div 
                      className="text-[1.375rem] sm:text-2xl lg:text-[1.5rem] font-bold text-purple-400 tabular-nums"
                      whileHover={{ scale: 1.05 }}
                    >
                      {currentXIRR}%
                    </motion.div>
                  </div>
                  
                  {/* Icon in perfect middle */}
                  <div className="flex-1 flex items-center justify-center">
                    <motion.div 
                      className="motion-safe:group-hover:scale-110 transition-all duration-300"
                      whileHover={{ rotate: -10 }}
                    >
                      <TrendingUp aria-hidden className="w-8 h-8 text-purple-300 drop-shadow-[0_2px_10px_rgba(168,85,247,0.35)]" />
                    </motion.div>
                  </div>
                  
                  {/* Bottom section */}
                  <div className="mt-4">
                    <span className="inline-flex items-center justify-center px-3 py-1 text-[13px] bg-purple-500/20 text-purple-300 rounded-full font-semibold backdrop-blur-sm mx-auto">
                      Annualized
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Premium ASI Highlight & Ongoing Transactions */}
            <div className="grid lg:grid-cols-2 gap-10 mt-16">
              
              {/* Premium ASI Highlight */}
              <motion.div 
                className="relative bg-gradient-to-br from-white/12 to-white/6 backdrop-blur-2xl rounded-3xl p-8 border border-white/40 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-700 group overflow-hidden"
                whileHover={{ 
                  scale: 1.02, 
                  y: -6,
                  boxShadow: '0 30px 60px -12px rgba(234, 179, 8, 0.3)'
                }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/8 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-gradient-to-br from-yellow-500/40 to-orange-500/30 rounded-2xl group-hover:scale-110 transition-all duration-500 shadow-lg shadow-yellow-500/25">
                      <Sparkles className="w-7 h-7 text-yellow-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-white mb-2 truncate">ASI Market Insight</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse flex-shrink-0" />
                        <p className="text-sm text-yellow-300 font-medium truncate">Today's highlight</p>
                      </div>
                    </div>
                  </div>
                  <motion.div 
                    className="bg-gradient-to-r from-yellow-500/15 to-orange-500/15 rounded-2xl p-6 border border-yellow-500/30 mb-8 relative overflow-hidden"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <p className="text-white text-base leading-relaxed">
                        ðŸš€ <strong className="text-yellow-300 font-semibold">Market Rally Continues:</strong> Nifty 50 surged 1.2% today driven by strong IT sector performance. 
                        Your tech-heavy portfolio is well-positioned to benefit from this momentum. 
                        <span className="text-green-300 font-medium">Consider booking partial profits in overweight positions.</span>
                      </p>
                    </div>
                  </motion.div>
                  <div className="flex items-center justify-between pt-6 border-t border-white/20">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                      <span className="text-sm text-yellow-200 font-medium">Powered by ASI Intelligence</span>
                    </div>
                    <span className="text-sm text-yellow-200/80">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>

              {/* Premium Ongoing Transactions */}
              <motion.div 
                className="relative bg-gradient-to-br from-white/12 to-white/6 backdrop-blur-2xl rounded-3xl p-8 border border-white/40 hover:border-orange-400/60 hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-700 group overflow-hidden"
                whileHover={{ 
                  scale: 1.02, 
                  y: -6,
                  boxShadow: '0 30px 60px -12px rgba(249, 115, 22, 0.3)'
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-gradient-to-br from-orange-500/40 to-red-500/30 rounded-2xl group-hover:scale-110 transition-all duration-500 shadow-lg shadow-orange-500/25">
                      <Clock className="w-7 h-7 text-orange-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-white mb-2 truncate">Ongoing Transactions</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse flex-shrink-0" />
                        <p className="text-sm text-orange-300 font-medium truncate">In progress</p>
                      </div>
                    </div>
                  </div>
                
                <div className="space-y-4">
                  {/* SIP Transaction */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse flex-shrink-0"></div>
                        <span className="text-sm font-medium text-white truncate">SIP - Axis Bluechip Fund</span>
                      </div>
                      <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-medium flex-shrink-0">SIP</span>
                    </div>
                    <div className="flex items-center justify-between text-sm gap-2">
                      <span className="text-purple-300 truncate">â‚¹10,000 â€¢ Next: Jan 15, 2024</span>
                      <span className="text-blue-400 font-medium flex-shrink-0">Processing...</span>
                    </div>
                  </div>

                  {/* Lumpsum Transaction */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
                        <span className="text-sm font-medium text-white truncate">Mirae Asset Large Cap</span>
                      </div>
                      <span className="text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded-full font-medium flex-shrink-0">Lumpsum</span>
                    </div>
                    <div className="flex items-center justify-between text-sm gap-2">
                      <span className="text-purple-300 truncate">â‚¹25,000 â€¢ Jan 8, 2024</span>
                      <span className="text-green-400 font-medium flex-shrink-0">Units Pending</span>
                    </div>
                  </div>

                  {/* Switch Transaction */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse flex-shrink-0"></div>
                        <span className="text-sm font-medium text-white truncate">Switch: HDFC to ICICI</span>
                      </div>
                      <span className="text-xs bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full font-medium flex-shrink-0">Switch</span>
                    </div>
                    <div className="flex items-center justify-between text-sm gap-2">
                      <span className="text-purple-300 truncate">â‚¹15,000 â€¢ Jan 7, 2024</span>
                      <span className="text-yellow-400 font-medium flex-shrink-0">In Progress</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-300 font-medium">3 transactions pending</span>
                    <span className="text-white font-semibold">Total: â‚¹50,000</span>
                  </div>
                </div>
              </div>
              </motion.div>
            </div>

          {/* Toast */}
          {toastMsg && (
            <div className="fixed bottom-6 right-6 z-[60] px-4 py-2 rounded-xl  text-white shadow-lg">
              {toastMsg}
            </div>
          )}

          {/* Quick Actions Modals and Report Modal */}
          {/* Modal component */}
          {showNewSIP && (
            <div role="dialog" aria-modal="true" aria-label="New SIP" className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/60" onClick={()=>setShowNewSIP(false)} />
              <div ref={sipModalRef} className="relative z-10 w-full max-w-lg mx-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/15 ring-1 ring-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Set up New SIP</h3>
                  <button onClick={()=>setShowNewSIP(false)} className="text-purple-200 hover:text-white">âœ•</button>
                </div>
                <div className="grid gap-4">
                  <label className="text-sm text-purple-200">Fund
                    <select className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white">
                      <option>Large Cap Equity</option>
                      <option>Mid Cap Equity</option>
                      <option>Small Cap Equity</option>
                      <option>International Funds</option>
                      <option>Debt Funds</option>
                    </select>
                  </label>
                  <label className="text-sm text-purple-200">Amount (â‚¹)
                    <input type="number" className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white" defaultValue={3000} />
                  </label>
                  <label className="text-sm text-purple-200">Date
                    <input type="date" className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white" />
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm text-purple-200">
                    <input type="checkbox" className="accent-cyan-400" defaultChecked />
                    Autoâ€‘optimize with ASI
                  </label>
                </div>
                <div className="mt-5 flex justify-end gap-2">
                  <button onClick={()=>setShowNewSIP(false)} className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15">Cancel</button>
                  <button onClick={()=>{ setShowNewSIP(false); toast('SIP created successfully'); }} className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30">Create SIP</button>
                </div>
              </div>
            </div>
          )}

          {showNewLumpsum && (
            <div role="dialog" aria-modal="true" aria-label="New Lumpsum" className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/60" onClick={()=>setShowNewLumpsum(false)} />
              <div ref={lumpsumModalRef} className="relative z-10 w-full max-w-lg mx-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/15 ring-1 ring-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Invest Lumpsum</h3>
                  <button onClick={()=>setShowNewLumpsum(false)} className="text-purple-200 hover:text-white">âœ•</button>
                </div>
                <div className="grid gap-4">
                  <label className="text-sm text-purple-200">Amount (â‚¹)
                    <input type="number" className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white" defaultValue={50000} />
                  </label>
                  <label className="text-sm text-purple-200">Smart Allocation (ASI)
                    <select className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white">
                      <option>Autoâ€‘allocate across current portfolio</option>
                      <option>Equityâ€‘heavy (aggressive)</option>
                      <option>Balanced</option>
                      <option>Conservative</option>
                    </select>
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm text-purple-200">
                    <input type="checkbox" className="accent-cyan-400" defaultChecked />
                    Avoid overlap &gt; 15%
                  </label>
                </div>
                <div className="mt-5 flex justify-end gap-2">
                  <button onClick={()=>setShowNewLumpsum(false)} className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15">Cancel</button>
                  <button onClick={()=>{ setShowNewLumpsum(false); toast('Lumpsum plan ready'); }} className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30">Proceed</button>
                </div>
              </div>
            </div>
          )}

          {showReportModal && (
            <div role="dialog" aria-modal="true" aria-label="Report" className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/60" onClick={()=>setShowReportModal(null)} />
              <div ref={reportModalRef} className="relative z-10 w-full max-w-2xl mx-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/15 ring-1 ring-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{showReportModal.type === 'generate' ? 'Generate Report' : 'View Report'}</h3>
                  <button onClick={()=>setShowReportModal(null)} className="text-purple-200 hover:text-white">âœ•</button>
                </div>
                {showReportModal.type === 'generate' ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="text-sm text-purple-200">Report Type
                      <select value={reportType} onChange={(e)=>setReportType(e.target.value)} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white">
                        <option value="performance">Performance</option>
                        <option value="tax">Capital Gains & Tax</option>
                        <option value="transactions">Transactions</option>
                        <option value="risk">Risk & Drawdown</option>
                        <option value="allocation">Allocation & Drift</option>
                        <option value="goals">Goal Progress</option>
                        <option value="dividend">Dividend Ledger</option>
                        <option value="expense">Expense Ratio Drift</option>
                        <option value="cashflow">Cashflow Calendar</option>
                      </select>
                    </label>
                    <label className="text-sm text-purple-200">Date Range
                      <input type="month" className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white" />
                    </label>
                    <label className="text-sm text-purple-200">Format
                      <select value={reportFormat} onChange={(e)=>setReportFormat(e.target.value as any)} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white">
                        <option value="PDF">PDF</option>
                        <option value="CSV">CSV</option>
                      </select>
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm text-purple-200">
                      <input type="checkbox" className="accent-cyan-400" defaultChecked /> Include insights
                    </label>
                  </div>
                ) : (
                  <div className="text-sm text-purple-200">
                    Showing preview for: <span className="text-white font-semibold capitalize">{showReportModal.report}</span>
                    <div className="mt-3 h-64 rounded-xl  flex items-center justify-center text-white/80">Report preview placeholder</div>
                  </div>
                )}
                <div className="mt-5 flex justify-end gap-2">
                  <button onClick={()=>setShowReportModal(null)} className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15">Close</button>
                  <button onClick={()=>{ exportReport(showReportModal?.report || reportType, reportFormat); }} className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30">Export</button>
                </div>
              </div>
            </div>
          )}

          {/* Toast */}
          {toastMsg && (
            <div className="fixed bottom-6 right-6 z-[60] px-4 py-2 rounded-xl  text-white shadow-lg">
              {toastMsg}
            </div>
          )}

          {/* ASI Portfolio Command Center (Unified Menu) */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">ASI Portfolio Command Center</h2>
              <div className="hidden md:flex gap-2">
                <button onClick={()=>setShowNewSIP(true)} className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30 text-sm" aria-label="New SIP">New SIP</button>
                <button onClick={()=>setShowNewLumpsum(true)} className="px-3 py-2 rounded-xl bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30 text-sm" aria-label="New Lumpsum">New Lumpsum</button>
                <button onClick={()=>setShowReportModal({ type:'generate' })} className="px-3 py-2 rounded-xl bg-purple-500/20 text-purple-200 hover:bg-purple-500/30 text-sm" aria-label="Generate Report">Generate Report</button>
              </div>
            </div>
            {/* Tabs */}
            <div ref={tablistRef} role="tablist" aria-label="ASI Command Center Tabs" className="flex flex-wrap gap-2 p-1 rounded-2xl " onKeyDown={onTabKeyDown}>
              {[
                {key:'actions', label:'Actions'},
                {key:'reports', label:'Reports'},
                {key:'copilot', label:'Strategy Copilot'},
                {key:'backtest', label:'Regret Backtest'},
                {key:'risk', label:'Risk Lens'},
                {key:'goals', label:'Goal Engine'},
                {key:'sandbox', label:'Execution Sandbox'},
              ].map((t)=> (
                <button
                  key={t.key}
                  id={`tab-${t.key}`}
                  role="tab"
                  aria-controls={`panel-${t.key}`}
                  aria-selected={activePanel===t.key}
                  tabIndex={activePanel===t.key ? 0 : -1}
                  onClick={()=>setActivePanel(t.key as any)}
                  className={`px-3 py-2 rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/60 ${activePanel===t.key ? 'bg-white/15 text-white' : 'text-purple-200 hover:text-white hover:bg-white/10'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reports Panel */}
          {activePanel === 'reports' && (
            <motion.div id="panel-reports" role="tabpanel" aria-labelledby="tab-reports" className="mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {key:'performance', title:'Performance Report', desc:'Time-weighted, money-weighted, XIRR by fund & category'},
                  {key:'tax', title:'Capital Gains & Tax', desc:'STCG/LTCG, indexation, tax-harvest opportunities'},
                  {key:'transactions', title:'Transactions', desc:'SIP, Lumpsum, Switch, STP/SWP with filters and export'},
                  {key:'risk', title:'Risk & Drawdown', desc:'Volatility, VaR, max drawdown, beta and correlation'},
                  {key:'allocation', title:'Allocation & Drift', desc:'Target vs current weights, rebalance recommendations'},
                  {key:'goals', title:'Goal Progress', desc:'Certainty bands, shortfall risk, next best action'},
                  {key:'dividend', title:'Dividend Ledger', desc:'Payout history, credit reconciliation, growth vs dividend'},
                  {key:'expense', title:'Expense Ratio Drift', desc:'Scheme expense changes and impact on alpha'},
                  {key:'cashflow', title:'Cashflow Calendar', desc:'Expected SIPs, redemptions, STP/SWP schedule'},
                  {key:'amc', title:'AMC Statements', desc:'Fund house statements, folio view, reconciliation'},
                  {key:'cas', title:'CAS Import', desc:'NSDL/CDSL consolidated account statement import'},
                ].map((card, i)=> (
                  <div key={i} className="p-6 hover:ring-white/20 hover:border-white/25 transition-all">
                    <div className="text-white font-semibold mb-1">{card.title}</div>
                    <div className="text-sm text-purple-200/90 mb-4">{card.desc}</div>
                    <div className="flex gap-2">
                      <button onClick={()=>setShowReportModal({ type:'view', report: card.key })} className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-sm hover:bg-white/15">View</button>
                      <button onClick={()=>exportReport(card.key, 'PDF')} className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-200 text-sm hover:bg-cyan-500/30">Export</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Intelligent Action Center */}
          {activePanel === 'actions' && (
          <motion.div id="panel-actions" role="tabpanel" aria-labelledby="tab-actions"
            className="mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 "><Settings2 className="w-5 h-5 text-white/90"/></div>
              <div>
                <h2 className="text-2xl font-bold text-white">Intelligent Action Center</h2>
                <p className="text-purple-200/90 text-sm">High-impact, one-click AI actions prioritized by ASI</p>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="p-6">
                <div className="text-sm text-white mb-2">Cumulative Value</div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={portfolioGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00FF87" stopOpacity={0.6}/>
                          <stop offset="100%" stopColor="#00FF87" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" hide />
                      <YAxis hide />
                      <Area type="monotone" dataKey="portfolioValue" stroke="#00FF87" fill="url(#gradA)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 text-sm text-purple-200">Regret saved: <span className="text-emerald-300 font-semibold">â‚¹{(totalProfit*0.18).toLocaleString()}</span></div>
              </div>
              <div className="p-6">
                <div className="text-sm text-white mb-3">Sharpe vs Drawdown</div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={portfolioGrowthData}>
                      <XAxis dataKey="date" hide /><YAxis hide />
                      <Bar dataKey="profit" fill="#4AE3F7" opacity={0.6} />
                      <Line dataKey="xirr" stroke="#A78BFA" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 text-sm text-purple-200">Max DD improved by <span className="text-emerald-300 font-semibold">2.3%</span></div>
              </div>
              <div className="p-6">
                <div className="text-sm text-white mb-2">Execution Plan</div>
                <ul className="text-sm text-purple-200 space-y-2">
                  <li>â€¢ Rebalance 3 funds to target weights</li>
                  <li>â€¢ Shift â‚¹3,000 SIP from overlapping schemes</li>
                  <li>â€¢ Tax-harvest ELSS lot expiring next month</li>
                </ul>
                <div className="flex items-center gap-3 pt-2">
                  <button className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15">View Diff</button>
                  <button className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30">Apply</button>
                </div>
              </div>
            </div>
          </motion.div>
          )}

          {/* Institutional-grade Risk Lens */}
          {activePanel === 'risk' && (
          <motion.div id="panel-risk" role="tabpanel" aria-labelledby="tab-risk" className="mb-12" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 "><Activity className="w-5 h-5 text-white/90"/></div>
              <div>
                <h2 className="text-2xl font-bold text-white">Institutionalâ€‘grade Risk Lens</h2>
                <p className="text-purple-200/90 text-sm">Correlation heatmaps, regimes, drawdown cones, volatility budgets</p>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-4">
              {/* Correlation heatmap (mock) */}
              <div className="p-6">
                <div className="text-sm text-white mb-3">Correlation Heatmap</div>
                <div className="grid grid-cols-6 gap-1">
                  {[...Array(36)].map((_,i)=>{
                    const val = Math.sin(i)*0.5+0.5; // 0..1
                    const color = `rgba(74, 227, 247, ${0.25+val*0.6})`;
                    return <div key={i} className="h-6 rounded" style={{ background: color }} />
                  })}
                </div>
              </div>
              {/* Drawdown cone */}
              <div className="p-6">
                <div className="text-sm text-white mb-3">Drawdown Cone</div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={portfolioGrowthData}>
                      <XAxis dataKey="date" hide /><YAxis hide />
                      <Area type="monotone" dataKey="portfolioValue" stroke="#A78BFA" fill="#A78BFA55" />
                      <Area type="monotone" dataKey="totalInvested" stroke="#64748B" fill="#64748B33" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              {/* Volatility budget (radar) */}
              <div className="p-6">
                <div className="text-sm text-white mb-3">Volatility Budget</div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                      { metric:'Large', a: 70 }, { metric:'Mid', a: 55 }, { metric:'Small', a: 40 }, { metric:'Intl', a: 35 }, { metric:'Debt', a: 20 }
                    ]}>
                      <PolarGrid stroke="rgba(255,255,255,0.2)" />
                      <PolarAngleAxis dataKey="metric" stroke="rgba(255,255,255,0.6)" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.3)" />
                      <Radar dataKey="a" stroke="#4AE3F7" fill="#4AE3F770" />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
          )}

          {/* Goal Engine with Certainty Bands */}
          {activePanel === 'goals' && (
          <motion.div id="panel-goals" role="tabpanel" aria-labelledby="tab-goals" className="mb-12" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 "><Target className="w-5 h-5 text-white/90"/></div>
              <div>
                <h2 className="text-2xl font-bold text-white">Goal Engine</h2>
                <p className="text-purple-200/90 text-sm">Timelines, certainty bands, shortfall nudges tied to SIP and rebalance</p>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 p-6">
                <div className="text-sm text-white mb-3">Goal Probability Bands</div>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={portfolioGrowthData}>
                      <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" fontSize={12} tickFormatter={(v)=>v.split(' ')[0]} />
                      <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} tickFormatter={(v)=>`â‚¹${(v/1000).toFixed(0)}K`} />
                      <defs>
                        <linearGradient id="band" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22c55e" stopOpacity={0.5} />
                          <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="portfolioValue" stroke="#22c55e" fill="url(#band)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-white mb-2">Next Best Action</div>
                <ul className="text-sm text-purple-200 space-y-2">
                  <li>â€¢ Increase SIP by 10% to reach goal 4 months sooner</li>
                  <li>â€¢ Rebalance equity tilt -1 to lower drawdown risk</li>
                  <li>â€¢ Enable auto-tax-harvest in Q4</li>
                </ul>
                <button className="mt-4 w-full px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30">Apply Nudges</button>
              </div>
            </div>
          </motion.div>
          )}

          {activePanel === 'sandbox' && (
            <motion.div 
              id="panel-sandbox" 
              role="tabpanel" 
              aria-labelledby="tab-sandbox" 
              className="mb-12" 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 ">
                  <GitBranch className="w-5 h-5 text-white/90"/>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Execution Sandbox</h2>
                  <p className="text-purple-200/90 text-sm">Draft, simulate, and stage changes. Commit in one click with audit trail.</p>
                </div>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-3">
                    {['Rebalance to target weights','Shift â‚¹3,000 SIP from Fund A â†’ B','Enable tax-harvest for ELSS'].map((item,i) => (
                      <label key={i} className="flex items-center justify-between p-3 rounded-xl ">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="accent-cyan-400" />
                          <span className="text-sm text-white">{item}</span>
                        </div>
                        <span className="text-xs text-purple-300">Ready</span>
                      </label>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15 inline-flex items-center justify-center gap-2">
                      <PlayCircle className="w-4 h-4" />
                      Simulate
                    </button>
                    <button className="w-full px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30 inline-flex items-center justify-center gap-2">
                      <Save className="w-4 h-4" />
                      Commit
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoDashboard;
