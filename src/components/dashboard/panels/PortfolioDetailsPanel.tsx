"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { analyzePortfolio as analyzePortfolioAPI } from '../../services/mutualFunds';

type Holding = {
  symbol: string;
  name: string;
  category: string;
  qty: number;
  avgPrice: number;
  ltp: number;
  // Enhanced institutional metrics
  sharpeRatio: number;
  beta: number;
  alpha: number;
  maxDrawdown: number;
  volatility: number;
  trackingError: number;
  informationRatio: number;
  treynorRatio: number;
  calmarRatio: number;
  sortinoRatio: number;
  expenseRatio: number;
  aum: number;
  fundAge: number;
  morningstarRating: number;
  valueResearchRating: number;
  riskGrade: string;
  fundManager: string;
  benchmark: string;
};

const sampleHoldings: Holding[] = [
  { 
    symbol: "HDFCBF", 
    name: "HDFC Balanced Advantage", 
    category: "Hybrid", 
    qty: 120.5, 
    avgPrice: 287.3, 
    ltp: 312.9,
    sharpeRatio: 1.84,
    beta: 0.65,
    alpha: 2.8,
    maxDrawdown: 6.2,
    volatility: 9.8,
    trackingError: 3.1,
    informationRatio: 0.90,
    treynorRatio: 15.2,
    calmarRatio: 4.52,
    sortinoRatio: 2.41,
    expenseRatio: 1.05,
    aum: 28450,
    fundAge: 12.5,
    morningstarRating: 4,
    valueResearchRating: 4,
    riskGrade: "Moderate",
    fundManager: "Prashant Jain",
    benchmark: "CRISIL Hybrid 35+65 - Aggressive Index"
  },
  { 
    symbol: "NIFTY50", 
    name: "Nifty 50 Index Fund", 
    category: "Large Cap", 
    qty: 80.0, 
    avgPrice: 182.4, 
    ltp: 201.6,
    sharpeRatio: 1.67,
    beta: 1.00,
    alpha: 0.1,
    maxDrawdown: 8.9,
    volatility: 14.2,
    trackingError: 0.2,
    informationRatio: 0.50,
    treynorRatio: 16.8,
    calmarRatio: 2.89,
    sortinoRatio: 2.12,
    expenseRatio: 0.10,
    aum: 45670,
    fundAge: 8.3,
    morningstarRating: 4,
    valueResearchRating: 3,
    riskGrade: "Moderate",
    fundManager: "Index Fund",
    benchmark: "NIFTY 50 TRI"
  },
  { 
    symbol: "PARAGP", 
    name: "Parag Parikh Flexi Cap", 
    category: "Flexi Cap", 
    qty: 64.2, 
    avgPrice: 67.8, 
    ltp: 74.1,
    sharpeRatio: 2.08,
    beta: 0.87,
    alpha: 5.6,
    maxDrawdown: 7.3,
    volatility: 13.2,
    trackingError: 4.8,
    informationRatio: 1.17,
    treynorRatio: 25.9,
    calmarRatio: 5.14,
    sortinoRatio: 2.84,
    expenseRatio: 0.68,
    aum: 18920,
    fundAge: 7.8,
    morningstarRating: 5,
    valueResearchRating: 5,
    riskGrade: "Moderate",
    fundManager: "Rajeev Thakkar",
    benchmark: "NIFTY 500 TRI"
  },
  { 
    symbol: "AXISSM", 
    name: "Axis Small Cap", 
    category: "Small Cap", 
    qty: 150.0, 
    avgPrice: 63.0, 
    ltp: 59.5,
    sharpeRatio: 1.45,
    beta: 1.28,
    alpha: 6.2,
    maxDrawdown: 18.7,
    volatility: 24.1,
    trackingError: 6.8,
    informationRatio: 0.91,
    treynorRatio: 19.8,
    calmarRatio: 2.01,
    sortinoRatio: 1.89,
    expenseRatio: 1.75,
    aum: 4320,
    fundAge: 12.3,
    morningstarRating: 3,
    valueResearchRating: 3,
    riskGrade: "Very High",
    fundManager: "Jinesh Gopani",
    benchmark: "NIFTY Smallcap 100 TRI"
  },
  { 
    symbol: "KOTAKMD", 
    name: "Kotak Midcap", 
    category: "Mid Cap", 
    qty: 95.0, 
    avgPrice: 124.2, 
    ltp: 139.8,
    sharpeRatio: 1.67,
    beta: 1.15,
    alpha: 4.8,
    maxDrawdown: 12.5,
    volatility: 18.9,
    trackingError: 4.2,
    informationRatio: 1.14,
    treynorRatio: 21.3,
    calmarRatio: 2.56,
    sortinoRatio: 2.08,
    expenseRatio: 1.45,
    aum: 8750,
    fundAge: 6.2,
    morningstarRating: 5,
    valueResearchRating: 4,
    riskGrade: "High",
    fundManager: "Harsha Upadhyaya",
    benchmark: "NIFTY Midcap 100 TRI"
  }
];

function formatINR(n: number) {
  return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
}

export default function PortfolioDetailsPanel() {
  const [filterText, setFilterText] = useState<string>('');
  const [category, setCategory] = useState<string>('ALL');
  const [preset, setPreset] = useState<string>('All');
  const [pinFirstCols, setPinFirstCols] = useState<boolean>(true);
  const [holdings, setHoldings] = useState<Holding[]>(sampleHoldings);
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('symbol');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Editable rebalance trades (qty delta per symbol)
  const [trades, setTrades] = useState<{ symbol: string; deltaQty: number }[]>([]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDir('asc');
    }
  };

  const categories = useMemo(() => ['ALL', ...Array.from(new Set(holdings.map(h => h.category)))], [holdings]);

  const view = useMemo(() => {
    let rows = holdings;
    if (category !== 'ALL') rows = rows.filter(r => r.category === category);
    if (filterText.trim()) {
      const q = filterText.toLowerCase();
      rows = rows.filter(r => r.name.toLowerCase().includes(q) || r.symbol.toLowerCase().includes(q));
    }
    if (preset === 'Winners') rows = rows.filter(r => (r.ltp - r.avgPrice) >= 0);
    if (preset === 'Losers') rows = rows.filter(r => (r.ltp - r.avgPrice) < 0);
    return rows;
  }, [holdings, category, filterText, preset]);

  const onExportCSV = () => {
    const headers = ['Symbol','Name','Category','Qty','AvgPrice','LTP','Invested','Current','PnL','PnL%'];
    const lines = view.map(h => {
      const invested = h.qty * h.avgPrice; const current = h.qty * h.ltp; const pnl = current - invested; const pnlPct = invested ? (pnl/invested*100) : 0;
      return [h.symbol, h.name, h.category, h.qty.toFixed(2), h.avgPrice.toFixed(2), h.ltp.toFixed(2), invested.toFixed(2), current.toFixed(2), pnl.toFixed(2), pnlPct.toFixed(2)].join(',');
    });
    const csv = [headers.join(','), ...lines].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `portfolio_export_${Date.now()}.csv`; a.click(); URL.revokeObjectURL(url);
  };

  const suggestRebalance = async () => {
    setLoading(true);
    try {
      // Compute allocation (%) from current values for backend payload
      const values = holdings.map(h => ({ symbol: h.symbol, value: h.qty * h.ltp }));
      const total = values.reduce((s, v) => s + v.value, 0) || 1;
      const portfolio = values.map(v => ({ scheme_code: v.symbol, allocation: (v.value / total) * 100 }));
      const res = await analyzePortfolioAPI(portfolio, '1Y');
      setAnalysis(res);
      // Optional: pre-fill trades from backend rebalancing suggestions if provided
      const suggested = res?.rebalancing_suggestions?.trades || res?.rebalancing_suggestions || res?.suggested_trades || res?.trades || [];
      if (Array.isArray(suggested) && suggested.length) {
        setTrades(suggested.map((t: any) => ({ symbol: t.symbol || t.scheme_code, deltaQty: Number(t.deltaQty || t.delta || 0) })));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const applyPreview = () => {
    // Non-mutating preview of holdings after trades
    const map = new Map<string, number>();
    trades.forEach(t => map.set(t.symbol, (map.get(t.symbol) || 0) + t.deltaQty));
    const next = holdings.map(h => ({ ...h, qty: h.qty + (map.get(h.symbol) || 0) }));
    setHoldings(next);
  };

  // Calculate portfolio metrics
  const totalInvested = view.reduce((sum, h) => sum + (h.qty * h.avgPrice), 0);
  const totalCurrent = view.reduce((sum, h) => sum + (h.qty * h.ltp), 0);
  const totalPnL = totalCurrent - totalInvested;
  const totalPnLPct = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;
  const avgSharpe = view.reduce((sum, h) => sum + h.sharpeRatio, 0) / view.length;
  const avgAlpha = view.reduce((sum, h) => sum + h.alpha, 0) / view.length;

  return (
    <div id="panel-portfolio" role="tabpanel" aria-labelledby="tab-portfolio" className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
              Portfolio Analytics
            </h2>
            <p className="text-purple-200/90 text-sm">Institutional-grade portfolio analysis & optimization</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onExportCSV} 
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all text-sm"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span className="text-xs text-emerald-300">Total Value</span>
          </div>
          <div className="text-xl font-bold text-emerald-400">{formatINR(totalCurrent)}</div>
          <div className="text-xs text-emerald-300/70">Current portfolio value</div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-xs text-blue-300">Invested</span>
          </div>
          <div className="text-xl font-bold text-blue-400">{formatINR(totalInvested)}</div>
          <div className="text-xs text-blue-300/70">Total amount invested</div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${totalPnL >= 0 ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
            <span className={`text-xs ${totalPnL >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>P&L</span>
          </div>
          <div className={`text-xl font-bold ${totalPnL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {formatINR(totalPnL)}
          </div>
          <div className={`text-xs ${totalPnL >= 0 ? 'text-emerald-300/70' : 'text-red-300/70'}`}>
            {totalPnLPct >= 0 ? '+' : ''}{totalPnLPct.toFixed(1)}%
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <span className="text-xs text-cyan-300">Avg Sharpe</span>
          </div>
          <div className="text-xl font-bold text-cyan-400">{avgSharpe.toFixed(2)}</div>
          <div className="text-xs text-cyan-300/70">Risk-adjusted returns</div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-xs text-purple-300">Avg Alpha</span>
          </div>
          <div className="text-xl font-bold text-purple-400">{avgAlpha.toFixed(1)}%</div>
          <div className="text-xs text-purple-300/70">Excess returns</div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            <span className="text-xs text-amber-300">Holdings</span>
          </div>
          <div className="text-xl font-bold text-amber-400">{view.length}</div>
          <div className="text-xs text-amber-300/70">Active positions</div>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-xl bg-gradient-to-r from-slate-800/30 to-slate-900/20">
        <div className="flex items-center gap-2">
          <span className="text-sm text-purple-200">Category:</span>
          <select 
            value={category} 
            onChange={e=>setCategory(e.target.value)} 
            className="px-3 py-2 rounded-lg bg-slate-700/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            {categories.map(c => (<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-purple-200">Search:</span>
          <input 
            value={filterText} 
            onChange={e=>setFilterText(e.target.value)} 
            placeholder="Filter holdings..." 
            className="px-3 py-2 rounded-lg bg-slate-700/50 text-white text-sm placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
        </div>
        
        <div className="flex items-center gap-1">
          <span className="text-sm text-purple-200 mr-2">View:</span>
          {['All','Winners','Losers'].map(p => (
            <button 
              key={p} 
              onClick={()=>setPreset(p)} 
              className={`px-3 py-2 rounded-lg text-sm transition-all ${
                preset===p 
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg' 
                  : 'bg-slate-700/30 text-purple-200 hover:bg-slate-700/50'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        
        <label className="ml-auto flex items-center gap-2 text-sm text-purple-200">
          <input 
            type="checkbox" 
            checked={pinFirstCols} 
            onChange={e=>setPinFirstCols(e.target.checked)}
            className="rounded bg-slate-700 border-slate-600 text-purple-500 focus:ring-purple-500/50"
          /> 
          Pin columns
        </label>
      </div>

      {/* Holdings table */}
      <div className="overflow-x-auto  backdrop-blur-xl">
        <table className="min-w-full text-sm text-purple-100">
          <thead className="p-4">
            <tr>
              <th className="px-4 py-3 text-left sticky left-0 " style={{ position: pinFirstCols? 'sticky':'static' }}>Instrument</th>
              <th className="px-4 py-3 text-left sticky left-48 " style={{ position: pinFirstCols? 'sticky':'static' }}>Category</th>
              <th className="px-4 py-3 text-right">Qty</th>
              <th className="px-4 py-3 text-right">Avg Price</th>
              <th className="px-4 py-3 text-right">LTP</th>
              <th className="px-4 py-3 text-right">Invested</th>
              <th className="px-4 py-3 text-right">Current</th>
              <th className="px-4 py-3 text-right">P&L</th>
              <th className="px-4 py-3 text-right">P&L%</th>
              <th className="px-4 py-3 text-right">Sharpe</th>
              <th className="px-4 py-3 text-right">Alpha</th>
              <th className="px-4 py-3 text-right">Beta</th>
              <th className="px-4 py-3 text-right">Max DD</th>
              <th className="px-4 py-3 text-right">Volatility</th>
              <th className="px-4 py-3 text-right">AUM (Cr)</th>
              <th className="px-4 py-3 text-right">Expense %</th>
              <th className="px-4 py-3 text-right">Rating</th>
              <th className="px-4 py-3 text-right">Risk Grade</th>
            </tr>
          </thead>
          <tbody>
            {view.map((h, idx) => {
              const invested = h.qty * h.avgPrice;
              const current = h.qty * h.ltp;
              const pnl = current - invested;
              const pnlPct = invested > 0 ? (pnl / invested) * 100 : 0;
              const pnlColor = pnl >= 0 ? "text-emerald-300" : "text-rose-300";
              const pnlBg = pnl >= 0 ? "bg-emerald-500/10" : "bg-rose-500/10";
              return (
                <tr key={idx} className="p-4">
                  <td className="px-4 py-3 whitespace-nowrap sticky left-0 bg-slate-800/50" style={{ position: pinFirstCols? 'sticky':'static' }}>
                    <div className="font-medium text-white">{h.name}</div>
                    <div className="text-[11px] text-purple-300">{h.symbol}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap sticky left-48 bg-slate-800/50" style={{ position: pinFirstCols? 'sticky':'static' }}>{h.category}</td>
                  <td className="px-4 py-3 text-right">{h.qty.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right">{formatINR(h.avgPrice)}</td>
                  <td className="px-4 py-3 text-right">{formatINR(h.ltp)}</td>
                  <td className="px-4 py-3 text-right text-white">{formatINR(invested)}</td>
                  <td className="px-4 py-3 text-right text-white">{formatINR(current)}</td>
                  <td className={`px-4 py-3 text-right font-semibold ${pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{formatINR(pnl)}</td>
                  <td className={`px-4 py-3 text-right font-semibold ${pnlPct >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{pnlPct.toFixed(1)}%</td>
                  <td className="px-4 py-3 text-right text-emerald-400 font-semibold">{h.sharpeRatio}</td>
                  <td className="px-4 py-3 text-right text-cyan-400 font-semibold">{h.alpha}%</td>
                  <td className="px-4 py-3 text-right text-white">{h.beta}</td>
                  <td className="px-4 py-3 text-right text-red-400">{h.maxDrawdown}%</td>
                  <td className="px-4 py-3 text-right text-amber-400">{h.volatility}%</td>
                  <td className="px-4 py-3 text-right text-purple-200">₹{h.aum.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-orange-400">{h.expenseRatio}%</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span className="text-yellow-400">{'★'.repeat(h.morningstarRating)}</span>
                      <span className="text-xs text-purple-300">({h.valueResearchRating})</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      h.riskGrade === 'Low' ? 'bg-emerald-500/20 text-emerald-300' :
                      h.riskGrade === 'Moderate' ? 'bg-yellow-500/20 text-yellow-300' :
                      h.riskGrade === 'High' ? 'bg-orange-500/20 text-orange-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {h.riskGrade}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Risk Lens */}
      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <div className=" p-4">
          <div className="text-white font-medium mb-2">VaR / ES (95%)</div>
          <div className="text-sm text-purple-300">{analysis?.risk?.var95 ?? '—'} / {analysis?.risk?.es95 ?? '—'}</div>
          <div className="text-xs text-purple-400 mt-1">Values show portfolio loss thresholds under normal markets.</div>
        </div>
        <div className=" p-4">
          <div className="text-white font-medium mb-2">Drawdown strip</div>
          <div className="h-16 flex items-end gap-1">
            {(analysis?.drawdowns ?? [5,12,3,20,8,15,6,11,2,9]).map((d:number, i:number)=> (
              <div key={i} className="w-2 bg-rose-400/40" style={{ height: `${Math.min(24, d)}px` }} title={`-${d}%`} />
            ))}
          </div>
          <div className="text-xs text-purple-400 mt-1">Recent peak-to-trough losses (lower is better).</div>
        </div>
        <div className=" p-4">
          <div className="text-white font-medium mb-2">Factor exposures</div>
          <div className="space-y-1">
            {Object.entries(analysis?.factors ?? { Value:0.2, Quality:0.1, Momentum:0.3, Size:-0.1, LowVol:0.15 }).map(([k,v]: any)=> (
              <div key={k} className="flex items-center gap-2 text-xs">
                <div className="w-20 text-purple-300">{k}</div>
                <div className="p-4">
                  <div className={`${Number(v)>=0? 'bg-emerald-400/60':'bg-rose-400/60'} h-2 rounded`} style={{ width: `${Math.min(100, Math.abs(Number(v))*100)}%`}} />
                </div>
                <div className="w-10 text-right text-purple-300">{Number(v).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3  p-4">
          <div className="text-white font-medium mb-2">Diversification heatmap</div>
          <div className="grid grid-cols-10 gap-[2px]">
            {(analysis?.correlation_grid ?? Array.from({length: 50}, (_,i)=> (i%11===0?1:Math.random()*0.8))).map((v:number,i:number)=> (
              <div key={i} className="w-5 h-5" style={{ backgroundColor: `rgba(124, 58, 237, ${0.2+0.6*(v)})`}} />
            ))}
          </div>
          <div className="text-xs text-purple-400 mt-1">Higher diagonal; off-diagonals closer to 0 indicate diversification.</div>
        </div>
      </div>

      {/* Rebalance Simulation */}
      <div className="mt-6  p-4">
        <div className="flex items-center justify-between">
          <div className="text-white font-medium">Rebalance simulation</div>
          <div className="flex items-center gap-2">
            <button onClick={suggestRebalance} className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30 text-sm" disabled={loading}>{loading? 'Suggesting…':'Suggest rebalance'}</button>
            <button onClick={applyPreview} className="px-3 py-2 rounded-xl bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30 text-sm">Apply preview</button>
          </div>
        </div>
        <div className="mt-3 overflow-x-auto rounded-xl bg-gradient-to-br from-slate-800/20 to-slate-900/30 backdrop-blur-sm border border-purple-500/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-purple-500/20 bg-gradient-to-r from-slate-800/50 to-slate-700/30">
                <th className={`text-left p-4 text-purple-200 font-semibold ${pinFirstCols ? 'sticky left-0 bg-slate-800/95 z-10 border-r border-purple-500/20' : ''}`}>
                  <button onClick={() => handleSort('symbol')} className="flex items-center gap-2 hover:text-white transition-colors group">
                    <span>Symbol</span>
                    <div className="w-4 h-4 flex items-center justify-center">
                      {sortBy === 'symbol' && (
                        <span className="text-purple-400">{sortDir === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </button>
                </th>
                <th className={`text-left p-4 text-purple-200 font-semibold ${pinFirstCols ? 'sticky left-48 bg-slate-800/95 z-10' : ''}`}>Name</th>
                <th className="text-right p-4 text-purple-200 font-semibold">Current Qty</th>
                <th className="text-right p-4 text-purple-200 font-semibold">Delta Qty</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map(h => {
                const idx = trades.findIndex(t=>t.symbol===h.symbol);
                const delta = idx>=0 ? trades[idx].deltaQty : 0;
                return (
                  <tr key={h.symbol} className="border-t border-white/10 hover:bg-white/5">
                    <td className={`p-4 font-medium text-white ${pinFirstCols ? 'sticky left-0 bg-slate-800/95 z-10' : ''}`}>{h.symbol}</td>
                    <td className={`p-4 text-purple-200 ${pinFirstCols ? 'sticky left-48 bg-slate-800/95 z-10' : ''}`}>{h.name}</td>
                    <td className="p-4 text-right text-white">{h.qty.toFixed(2)}</td>
                    <td className="p-4 text-right">
                      <input 
                        type="number" 
                        step="0.1" 
                        value={delta} 
                        onChange={e=>{
                          const v = Number(e.target.value)||0; 
                          setTrades(prev=>{ 
                            const copy=[...prev]; 
                            if(idx>=0){ 
                              copy[idx]={...copy[idx], deltaQty:v}; 
                            } else { 
                              copy.push({symbol:h.symbol, deltaQty:v}); 
                            } 
                            return copy; 
                          });
                        }} 
                        className="w-20 px-2 py-1 rounded bg-slate-700/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50" 
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {analysis && (
          <div className="mt-3 text-xs text-purple-300">
            <div className="font-medium text-white mb-1">Backend suggestion summary</div>
            <pre className="max-h-40 overflow-auto whitespace-pre-wrap leading-relaxed">{JSON.stringify(analysis?.summary || analysis?.recommendation || analysis, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="mt-3 text-xs text-purple-300">
        Note: Sample data shown. Connect to backend holdings and portfolio analyzer for exact VaR/ES, factors, correlation, and suggested rebalances.
      </div>
    </div>
  );
}
