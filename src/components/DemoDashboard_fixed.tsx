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
  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  const toast = (msg: string) => {
    setToastMsg(msg);
  };

  // Export to backend and download
  const exportReport = async (key: string, format: 'PDF'|'CSV' = 'PDF') => {
    try {
      const response = await fetch('/api/reports/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportType: key, format })
      });
      if (!response.ok) throw new Error('Export failed');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${key}_report.${format.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast(`${key} report exported successfully!`);
    } catch (error) {
      console.error('Export error:', error);
      toast('Export failed. Please try again.');
    }
  };

  // Tab navigation with keyboard support
  const onTabKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const tabs = ['actions', 'reports', 'copilot', 'backtest', 'risk', 'goals', 'sandbox'] as const;
      const currentIndex = tabs.indexOf(activePanel);
      const nextIndex = e.key === 'ArrowRight' 
        ? (currentIndex + 1) % tabs.length 
        : (currentIndex - 1 + tabs.length) % tabs.length;
      const nextKey = tabs[nextIndex];
      setActivePanel(nextKey);
      const el = document.getElementById(`tab-${nextKey}`);
      el?.focus();
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            SIP Brewery
          </motion.h1>
          <motion.p 
            className="text-xl text-purple-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your AI-Powered Investment Dashboard
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-green-400 text-sm font-medium">+{currentXIRR}%</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-1">Portfolio Value</h3>
            <p className="text-2xl font-bold text-white">₹{currentPortfolioValue.toLocaleString()}</p>
            <p className="text-purple-300 text-sm">Total Profit: ₹{totalProfit.toLocaleString()}</p>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <IndianRupee className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-blue-400 text-sm font-medium">Monthly</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-1">Total Invested</h3>
            <p className="text-2xl font-bold text-white">₹{totalInvested.toLocaleString()}</p>
            <p className="text-purple-300 text-sm">12 months SIP</p>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <PieChartIcon className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-purple-400 text-sm font-medium">6 Funds</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-1">Diversification</h3>
            <p className="text-2xl font-bold text-white">Optimal</p>
            <p className="text-purple-300 text-sm">Risk Score: 7/10</p>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Target className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="text-yellow-400 text-sm font-medium">2027</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-1">Goal Progress</h3>
            <p className="text-2xl font-bold text-white">68%</p>
            <p className="text-purple-300 text-sm">₹10L House Fund</p>
          </motion.div>
        </div>

        <PayTMStyleNavigation 
          activePanel={activePanel} 
          setActivePanel={setActivePanel} 
          onTabKeyDown={onTabKeyDown}
        />

        <div className="mt-8">
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
                  <GitBranch className="w-5 h-5 text-white/90" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Execution Sandbox</h2>
                  <p className="text-purple-200/90 text-sm">Draft, simulate, and stage changes. Commit in one click with audit trail.</p>
                </div>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-3">
                    {['Rebalance to target weights','Shift ₹3,000 SIP from Fund A → B','Enable tax-harvest for ELSS'].map((item,i) => (
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
