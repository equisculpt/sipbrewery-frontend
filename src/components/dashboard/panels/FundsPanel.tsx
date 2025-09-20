"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Shield, 
  Target, 
  Zap, 
  Star, 
  ArrowUpRight, 
  DollarSign,
  PieChart,
  BarChart3,
  Sparkles,
  Crown,
  Award
} from 'lucide-react';
// Tiny inline sparkline to avoid extra deps
function Sparkline({ data = [] as number[] }: { data?: number[] }) {
  const w = 80, h = 28, pad = 2;
  const vals = (data || []).filter(v => typeof v === 'number');
  if (vals.length < 2) return <div className="h-7 w-20 text-[10px] text-purple-400/70">—</div>;
  const min = Math.min(...vals), max = Math.max(...vals);
  const scaleX = (i: number) => pad + (i * (w - pad * 2)) / (vals.length - 1);
  const scaleY = (v: number) => pad + (h - pad * 2) * (1 - (v - min) / Math.max(1e-9, (max - min)));
  const d = vals.map((v, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(v)}`).join(' ');
  const last = vals[vals.length - 1];
  const first = vals[0];
  const up = last >= first;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <path d={d} fill="none" stroke={up ? '#34d399' : '#f43f5e'} strokeWidth={1.5} />
    </svg>
  );
}
// Virtualization via dynamic import to avoid hard dependency during build
const useVirtualList = () => {
  const [ListComp, setListComp] = useState<any>(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const m = await import('react-window');
        if (mounted) setListComp(() => m.FixedSizeList);
      } catch {
        if (mounted) setListComp(null);
      }
    })();
    return () => { mounted = false; };
  }, []);
  return ListComp;
};

export default function FundsPanel() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [amcs, setAmcs] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('ALL');
  const [period, setPeriod] = useState<Period>('1Y');
  const [top, setTop] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [comparison, setComparison] = useState<any|null>(null);
  const [suggestions, setSuggestions] = useState<any[]|null>(null);
  const [asi, setAsi] = useState<any|null>(null);

  // Screener filter states
  const [amc, setAmc] = useState<string>('ALL');
  const [expenseMax, setExpenseMax] = useState<number>(2.5); // %
  const [aumMin, setAumMin] = useState<number>(100); // in cr
  const [trackMin, setTrackMin] = useState<number>(3); // years
  const cacheRef = useRef<{ key: string; items: Scheme[] } | null>(null);
  const ListComp = useVirtualList();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getSchemes();
        if (!mounted) return;
        const list: Scheme[] = res.schemes || [];
        setSchemes(list);
        setCategories(['ALL', ...Array.from(new Set((res.categories || []).filter(Boolean)))]);
        setAmcs(['ALL', ...Array.from(new Set(list.map(s => (s as any)?.amc).filter(Boolean) as string[]))]);
      } catch (e: any) {
        setError(e?.message || 'Failed to load schemes');
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getTopPerformers(category, period, 9);
        if (!mounted) return;
        setTop(res.items || res.top_performers || res);
      } catch (e: any) {
        // soft fail
      }
    })();
    return () => { mounted = false; };
  }, [category, period]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const key = `${category}|${amc}|${expenseMax}|${aumMin}|${trackMin}|${q}`;
    if (cacheRef.current?.key === key) return cacheRef.current.items;
    // Note: expense/aum/track filters require backend data; here we keep placeholders until wired.
    const items = schemes
      .filter(s => (category === 'ALL' ? true : s.category === category))
      .filter(s => (amc === 'ALL' ? true : (s as any)?.amc === amc))
      .filter(s => !q || s.name.toLowerCase().includes(q) || s.scheme_code.toLowerCase().includes(q));
    cacheRef.current = { key, items };
    return items;
  }, [schemes, query, category, amc, expenseMax, aumMin, trackMin]);

  const toggleSelect = (code: string) => {
    setSelected(prev => prev.includes(code) ? prev.filter(c => c !== code) : prev.length < 5 ? [...prev, code] : prev);
  };

  const onCompare = async () => {
    if (selected.length < 2) return;
    setLoading(true); setError(null); setComparison(null);
    try {
      const res = await compareSchemes(selected, period);
      setComparison(res);
    } catch (e: any) {
      setError(e?.message || 'Comparison failed');
    } finally {
      setLoading(false);
    }
  };

  const onSuggest = async () => {
    setLoading(true); setError(null); setSuggestions(null);
    try {
      const res = await getTopPerformers(category, period, 9);
      setSuggestions(res.items || res.top_performers || res);
    } catch (e: any) {
      setError(e?.message || 'Suggestion fetch failed');
    } finally {
      setLoading(false);
    }
  };

  const onAsiAnalyze = async () => {
    if (selected.length < 1) { setError('Select at least 1 scheme'); return; }
    setLoading(true); setError(null); setAsi(null);
    try {
      const res = await getTechnicalAnalysis(selected[0], period);
      setAsi(res);
    } catch (e: any) {
      setError(e?.message || 'ASI analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="panel-funds" role="tabpanel" aria-labelledby="tab-funds" className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Funds Universe</h2>
        <div className="flex items-center gap-2">
          <select value={period} onChange={e=>setPeriod(e.target.value as Period)} className="p-4">
            {['1M','3M','6M','1Y','2Y','3Y','5Y','MAX'].map(p => (<option key={p} value={p}>{p}</option>))}
          </select>
          <select value={category} onChange={e=>setCategory(e.target.value)} className="p-4">
            {categories.map(c => (<option key={c} value={c}>{c}</option>))}
          </select>
          <select value={amc} onChange={e=>setAmc(e.target.value)} className="p-4">
            {amcs.map(a => (<option key={a} value={a}>{a}</option>))}
          </select>
          <div className="hidden lg:flex items-center gap-2 text-xs text-purple-200">
            <label className="flex items-center gap-1">ER≤ <input type="number" step="0.1" value={expenseMax} onChange={e=>setExpenseMax(Number(e.target.value) || 0)} className="p-4" />%</label>
            <label className="flex items-center gap-1">AUM≥ <input type="number" step="50" value={aumMin} onChange={e=>setAumMin(Number(e.target.value) || 0)} className="p-4" />cr</label>
            <label className="flex items-center gap-1">Track≥ <input type="number" step="1" value={trackMin} onChange={e=>setTrackMin(Number(e.target.value) || 0)} className="p-4" />y</label>
          </div>
          <div className="w-60 sm:w-72">
            <SearchInput
              ariaLabel="Search schemes"
              placeholder="Search schemes"
              value={query}
              onChange={setQuery}
              onChangeDebounced={setQuery}
            />
          </div>
          <button onClick={onSuggest} className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30 text-sm">Suggest</button>
          <button onClick={onAsiAnalyze} className="px-3 py-2 rounded-xl bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30 text-sm">1‑click ASI</button>
        </div>
      </div>

      {/* Top performers */}
      {top && Array.isArray(top) && top.length > 0 && (
        <div className="mb-6">
          <div className="text-sm text-purple-200 mb-2 flex items-center gap-2"><Star className="w-4 h-4"/> Top performers</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {top.map((t: any, i: number) => (
              <div key={i} className="p-4">
                <div className="text-white font-medium truncate" title={t.name || t.scheme_name}>{t.name || t.scheme_name}</div>
                <div className="text-xs text-purple-300">{t.category || category}</div>
                <div className="mt-2 text-sm"><span className="text-emerald-300">{(t.return_1y ?? t.cagr ?? 0).toFixed?.(2) ?? t.return_1y}%</span> in {period}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {suggestions && (
        <div className="mb-6">
          <div className="text-sm text-purple-200 mb-2">Suggestions</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {suggestions.map((s: any, i: number) => (
              <div key={i} className="p-4">
                <div className="text-white font-medium truncate" title={s.name || s.scheme_name}>{s.name || s.scheme_name}</div>
                <div className="text-xs text-purple-300">{s.category || category}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Schemes list */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden">
            <div className="max-h-[420px]">
              {/* Virtualized list */}
              {filtered.length > 0 ? (
                ListComp ? (
                <ListComp height={420} itemCount={filtered.length} itemSize={56} width={'100%'} className="divide-y divide-white/10">
                  {({ index, style }: { index: number; style: React.CSSProperties }) => {
                    const s = filtered[index];
                    const selectedCls = selected.includes(s.scheme_code) ? 'bg-white/10' : '';
                    return (
                      <div style={style} key={s.scheme_code} className={`flex items-center justify-between px-4 py-3 hover:bg-white/5 ${selectedCls}`}>
                        <div className="min-w-0">
                          <div className="text-white font-medium truncate" title={s.name}>{s.name}</div>
                          <div className="text-xs text-purple-300 truncate">{s.scheme_code} · {s.category || '—'} {(s as any)?.amc ? `· ${(s as any).amc}` : ''}</div>
                          <div className="flex gap-2 mt-1">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300">5Y Consistency: N/A</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300">Tax-efficiency: —</span>
                          </div>
                        </div>
                        <button onClick={()=>toggleSelect(s.scheme_code)} className="p-4">{selected.includes(s.scheme_code) ? 'Selected' : 'Select'}</button>
                      </div>
                    );
                  }}
                </ListComp>
                ) : (
                  <div className="max-h-[420px] overflow-auto divide-y divide-white/10">
                    {filtered.slice(0, 400).map(s => {
                      const selectedCls = selected.includes(s.scheme_code) ? 'bg-white/10' : '';
                      return (
                        <div key={s.scheme_code} className={`flex items-center justify-between px-4 py-3 hover:bg-white/5 ${selectedCls}`}>
                          <div className="min-w-0">
                            <div className="text-white font-medium truncate" title={s.name}>{s.name}</div>
                            <div className="text-xs text-purple-300 truncate">{s.scheme_code} · {s.category || '—'} {(s as any)?.amc ? `· ${(s as any).amc}` : ''}</div>
                            <div className="flex gap-2 mt-1">
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300">5Y Consistency: N/A</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300">Tax-efficiency: —</span>
                            </div>
                          </div>
                          <button onClick={()=>toggleSelect(s.scheme_code)} className="p-4">{selected.includes(s.scheme_code) ? 'Selected' : 'Select'}</button>
                        </div>
                      );
                    })}
                  </div>
                )
              ) : (
                <div className="p-6 text-sm text-purple-300">No schemes found.</div>
              )}
            </div>
          </div>
        </div>

        {/* Compare box */}
        <div>
          <div className="p-4">
            <div className="text-white font-medium mb-2 flex items-center gap-2"><ArrowRightLeft className="w-4 h-4"/> Compare (2-5)</div>
            <div className="flex flex-wrap gap-2 mb-3">
              {selected.map(code => (
                <span key={code} className="p-4">{code}</span>
              ))}
            </div>
            <button onClick={onCompare} disabled={selected.length < 2} className="w-full px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed">Run Comparison</button>

            {loading && <div className="mt-3 text-xs text-purple-300">Running comparison…</div>}
            {error && <div className="mt-3 text-xs text-rose-300">{error}</div>}

            {/* Compare Matrix */}
            {comparison && selected.length >= 2 && (
              <div className="mt-4 overflow-auto">
                <table className="min-w-full text-xs">
                  <thead>
                    <tr>
                      <th className="text-left text-purple-300 font-semibold pr-4">Metric</th>
                      {selected.map(code => (
                        <th key={code} className="text-left text-white font-semibold pr-4 truncate">{code}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="align-top">
                    {/* Mini sparklines if timeseries is available in comparison */}
                    {comparison?.timeseries && (
                      <tr className="border-t border-white/10">
                        <td className="text-purple-300 pr-4 py-2 uppercase">sparkline</td>
                        {selected.map(code => (
                          <td key={'sp'+code} className="pr-4 py-2">
                            <Sparkline data={comparison.timeseries?.[code] || []} />
                          </td>
                        ))}
                      </tr>
                    )}
                    {['return_1y','return_3y','return_5y','cagr','volatility','sharpe','sortino','max_dd'].map(metric => (
                      <tr key={metric} className="border-t border-white/10">
                        <td className="text-purple-300 pr-4 py-2 uppercase">{metric.replace('_',' ')}</td>
                        {(() => {
                          const vals = selected.map(code => {
                            const v = comparison?.metrics?.[code]?.[metric] ?? comparison?.[code]?.[metric];
                            return typeof v === 'number' ? v : Number.isFinite(Number(v)) ? Number(v) : null;
                          });
                          const valid = vals.filter((v): v is number => v != null && Number.isFinite(v));
                          const max = valid.length ? Math.max(...valid) : null;
                          const min = valid.length ? Math.min(...valid) : null;
                          const isBenefit = !['volatility','max_dd'].includes(metric);
                          return selected.map((code, i) => {
                            const raw = comparison?.metrics?.[code]?.[metric] ?? comparison?.[code]?.[metric];
                            const v = vals[i];
                            let cls = 'text-purple-400/70';
                            if (v != null && max != null && min != null) {
                              const isBest = isBenefit ? v === max : v === min;
                              const isWorst = isBenefit ? v === min : v === max;
                              cls = isBest ? 'text-emerald-300' : isWorst ? 'text-rose-300' : 'text-white';
                            }
                            const txt = v != null ? v.toFixed(2) : (raw != null ? String(raw) : '—');
                            return (<td key={code+metric} className={`pr-4 py-2 ${cls}`}>{txt}</td>);
                          });
                        })()}
                      </tr>
                    ))}
                    {/* Correlation row (if available) */}
                    {comparison?.correlation && (
                      <tr className="border-t border-white/10">
                        <td className="text-purple-300 pr-4 py-2 uppercase">correlation</td>
                        {selected.map(code => (
                          <td key={'corr'+code} className="pr-4 py-2">
                            <div className="flex gap-1 flex-wrap">
                              {selected.filter(c=>c!==code).map(other => (
                                <span key={other} className="p-4">{other}: {comparison.correlation?.[code]?.[other]?.toFixed?.(2) ?? '—'}</span>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-4 p-4">
            <div className="text-white font-medium mb-2 flex items-center gap-2"><LineChartIcon className="w-4 h-4"/> Chart preview</div>
            <div className="text-xs text-purple-300">Select a scheme and open detailed chart in the hero area (future enhancement).</div>
          </div>

          {/* ASI tiles */}
          {asi && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { key: 'trend', label: 'Trend', val: asi?.trend ?? asi?.trend_analysis?.summary },
                { key: 'momentum', label: 'Momentum', val: asi?.momentum ?? asi?.oscillators?.summary },
                { key: 'breadth', label: 'Breadth', val: asi?.breadth },
                { key: 'regime', label: 'Regime', val: asi?.regime },
                { key: 'valuation', label: 'Valuation %', val: asi?.valuation_percentile ?? asi?.valuation?.percentile },
                { key: 'conviction', label: 'Conviction', val: asi?.conviction }
              ].filter(t => t.val != null).map(t => (
                <div key={t.key} className="p-3" title={String(t.val)}>
                  <div className="text-xs text-purple-300">{t.label}</div>
                  <div className="text-white text-sm mt-1 truncate">{String(typeof t.val === 'number' ? (t.val as number).toFixed?.(2) ?? t.val : t.val)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
