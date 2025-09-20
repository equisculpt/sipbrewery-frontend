"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, LineChart, Line, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, Eye, Zap, Crown } from 'lucide-react';

const growthData = [
  { date: 'Jan', invested: 10000, value: 10000 },
  { date: 'Feb', invested: 20000, value: 22000 },
  { date: 'Mar', invested: 30000, value: 31500 },
  { date: 'Apr', invested: 40000, value: 43200 },
  { date: 'May', invested: 50000, value: 56800 },
  { date: 'Jun', invested: 60000, value: 69500 },
  { date: 'Jul', invested: 70000, value: 83200 },
  { date: 'Aug', invested: 80000, value: 96800 },
  { date: 'Sep', invested: 90000, value: 112500 },
  { date: 'Oct', invested: 100000, value: 127200 },
  { date: 'Nov', invested: 110000, value: 143800 },
  { date: 'Dec', invested: 120000, value: 165000 },
];

const xirrSeries = growthData.map((d, i) => ({ month: d.date, xirr: 8 + i * 1.7 }));
const mergedGrowth = growthData.map((d, i) => ({ date: d.date, value: d.value, invested: d.invested, xirr: xirrSeries[i].xirr }));

const allocationData = [
  { name: 'Large Cap Equity', value: 35, color: '#00FF87' },
  { name: 'Mid Cap Equity', value: 25, color: '#4AE3F7' },
  { name: 'Small Cap Equity', value: 15, color: '#FF6B6B' },
  { name: 'International Funds', value: 10, color: '#FFD93D' },
  { name: 'Debt Funds', value: 10, color: '#A78BFA' },
  { name: 'ELSS', value: 5, color: '#FB7185' }
];

const totalAllocation = allocationData.reduce((s, a) => s + a.value, 0);

function getPercent(val: number) {
  return ((val / totalAllocation) * 100).toFixed(0) + '%';
}

// Custom legend to improve density and responsiveness
function AllocationLegend({ payload, vertical }: { payload?: any[]; vertical?: boolean }) {
  if (!payload) return null;
  return (
    <div style={{ display: 'flex', flexWrap: vertical ? 'nowrap' : 'wrap', alignItems: 'center', gap: vertical ? 8 : 12, color: '#e5e7eb', fontSize: 12, lineHeight: 1.2 }}>
      {payload.map((entry, idx) => {
        const item = allocationData.find(a => a.name === entry.value);
        const pct = item ? getPercent(item.value) : '';
        return (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: vertical ? undefined : 160 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: entry.color as string, display: 'inline-block' }} />
            <span style={{ color: '#cbd5e1' }}>{entry.value}</span>
            <span style={{ color: '#94a3b8' }}>· {pct}</span>
          </div>
        );
      })}
    </div>
  );
}

// Inside-slice percentage labels with contrast. Disabled on narrow screens for collision avoidance.
const renderPieLabel = (isNarrow: boolean) => (props: any) => {
  if (isNarrow) return null;
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.62;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const label = `${Math.round(percent * 100)}%`;
  return (
    <text x={x} y={y} fill="#f8fafc" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 12, fontWeight: 600, paintOrder: 'stroke', stroke: 'rgba(0,0,0,0.35)', strokeWidth: 2 }}>
      {label}
    </text>
  );
};

export default function DemoHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const [activeSlice, setActiveSlice] = useState<number | null>(null);
  const [selectedSlice, setSelectedSlice] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
    const checkWidth = () => setIsNarrow(window.innerWidth < 768);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);
  const latest = growthData[growthData.length - 1];
  const profit = Math.max(0, latest.value - latest.invested);
  const currentPortfolioValue = latest.value;
  const totalInvested = latest.invested;
  const currentXIRR = xirrSeries[xirrSeries.length - 1].xirr;
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto px-6 sm:px-8 mt-24 mb-8"
    >
      {/* Hero Header (legacy-inspired) */}
      <div className="text-center mb-10 flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
          Portfolio Dashboard
        </h1>
        <p className="text-center text-purple-100/90 text-base sm:text-lg max-w-2xl mx-auto bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-cyan-200 to-purple-200">
          Build wealth with live, intelligent insights — beautifully clear and instantly actionable.
        </p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="inline-flex items-center justify-center gap-2 rounded-full px-3 py-1 bg-white/5 ring-1 ring-white/10 text-purple-100 text-sm tabular-nums">
            <span className="text-white/90">₹{currentPortfolioValue.toLocaleString()}</span>
            <span className="text-purple-300">Value</span>
          </div>
          <div className="inline-flex items-center justify-center gap-2 rounded-full px-3 py-1 bg-white/5 ring-1 ring-white/10 text-green-200 text-sm tabular-nums">
            <span className="text-green-400">+₹{profit.toLocaleString()}</span>
            <span className="text-green-300/90">Profit</span>
          </div>
          <div className="inline-flex items-center justify-center gap-2 rounded-full px-3 py-1 bg-white/5 ring-1 ring-white/10 text-cyan-200 text-sm tabular-nums">
            <span className="text-cyan-300">{currentXIRR.toFixed(1)}%</span>
            <span className="text-cyan-200/90">XIRR</span>
          </div>
          <div className="inline-flex items-center justify-center gap-2 rounded-full px-3 py-1 bg-white/5 ring-1 ring-white/10 text-blue-200 text-sm tabular-nums">
            <span className="text-blue-300">₹{totalInvested.toLocaleString()}</span>
            <span className="text-blue-200/90">Invested</span>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Combined Portfolio Growth + XIRR */}
        <div className="p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-semibold text-white">Portfolio Growth & XIRR</h2>
            <div className="text-sm text-purple-200">Profit: <span className="text-emerald-300 font-semibold">₹{profit.toLocaleString()}</span></div>
          </div>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mergedGrowth} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" tickFormatter={(v) => String(v).split(' ')[0]} />
                <YAxis yAxisId="left" stroke="#94a3b8" tickFormatter={(v) => `₹${(Number(v)/1000).toFixed(0)}K`} />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(15, 15, 25, 0.95)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 12, color: '#ffffff', padding: '12px 16px' }} 
                  labelStyle={{ color: '#ffffff', fontWeight: 700, marginBottom: 6 }}
                  formatter={(value: any, name: string, props: any) => {
                    if (name === 'value') {
                      const invested = props?.payload?.invested ?? 0;
                      const prof = Math.max(0, Number(value) - Number(invested));
                      return [
                        (
                          <div style={{ color: '#ffffff' }}>
                            <div style={{ color: '#00FF87', fontWeight: 700, marginBottom: 2 }}>
                              Portfolio Value: ₹{Number(value).toLocaleString()}
                            </div>
                            <div style={{ color: '#fbbf24', fontSize: 12 }}>
                              Total Invested: ₹{Number(invested).toLocaleString()}
                            </div>
                            <div style={{ color: '#10b981', fontSize: 12 }}>
                              Profit (Unrealized): ₹{Number(prof).toLocaleString()}
                            </div>
                          </div>
                        ),
                        ''
                      ];
                    }
                    // XIRR series
                    return [
                      <span style={{ color: '#A78BFA', fontWeight: 700 }}>{Number(value).toFixed(1)}% XIRR</span>,
                      <span style={{ color: '#e2e8f0', fontSize: 12 }}>Based on cash flows</span>
                    ];
                  }}
                />
                <Line yAxisId="left" type="monotone" dataKey="value" stroke="#00FF87" strokeWidth={3} dot={{ r: 3, fill: '#00FF87' }} />
                <Line yAxisId="right" type="monotone" dataKey="xirr" stroke="#A78BFA" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Allocation Pie Chart */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className={`group relative text-center p-8 transition-all duration-300 overflow-hidden`}
        >

          <div className="flex items-baseline justify-between relative z-10">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 rounded-full bg-cyan-400"
              />
              <h2 className="text-xl font-semibold text-white group-hover:text-cyan-100 transition-colors duration-300">
                Investment Allocation
              </h2>
            </div>
            <div className="text-sm text-purple-200 group-hover:text-white/80 transition-colors duration-300">
              Diversified • Optimized
            </div>
          </div>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={allocationData} 
                  dataKey="value" 
                  nameKey="name" 
                  innerRadius={56} 
                  outerRadius={isNarrow ? 78 : 90} 
                  paddingAngle={2} 
                  label={renderPieLabel(isNarrow)} 
                  labelLine={false}
                  onMouseEnter={(_, index) => setActiveSlice(index)}
                  onMouseLeave={() => setActiveSlice(null)}
                  onClick={(_, index) => setSelectedSlice(selectedSlice === index ? null : index)}
                  animationBegin={0}
                  animationDuration={1000}
                >
                  {allocationData.map((entry, index) => {
                    const isActive = activeSlice === index;
                    const isSelected = selectedSlice === index;
                    const baseOpacity = isSelected ? 1 : (activeSlice !== null && !isActive) ? 0.6 : 1;
                    
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke={isActive || isSelected ? "#ffffff" : "rgba(255,255,255,0.2)"} 
                        strokeWidth={isActive || isSelected ? 3 : 1}
                        style={{ 
                          filter: isActive ? 'brightness(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.3))' : 'none',
                          opacity: baseOpacity,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    );
                  })}
                </Pie>
                {isNarrow ? (
                  <Legend content={<AllocationLegend vertical />} />
                ) : (
                  <Legend verticalAlign="bottom" height={48} content={<AllocationLegend />} />
                )}
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(17, 24, 39, 0.95)', 
                    border: '1px solid rgba(148,163,184,0.3)', 
                    borderRadius: 12, 
                    color: '#e5e7eb',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(10px)'
                  }} 
                  labelStyle={{ color: '#e5e7eb', fontWeight: 'bold' }} 
                  itemStyle={{ color: '#e5e7eb' }}
                  formatter={(value, name) => [
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>₹{Number(value).toLocaleString()}</span>,
                    <span style={{ color: '#a78bfa' }}>{name}</span>
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Interactive Slice Details */}
          <AnimatePresence>
            {selectedSlice !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {allocationData[selectedSlice].name}
                    </h4>
                    <p className="text-purple-200 text-sm">
                      {allocationData[selectedSlice].percentage}% of portfolio
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-400">
                      ₹{allocationData[selectedSlice].value.toLocaleString()}
                    </div>
                    <div className="text-sm text-purple-300">
                      Click to deselect
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}
