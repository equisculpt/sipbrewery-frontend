"use client";

import React, { useMemo, useState } from 'react';
import { CalendarClock, Clock, FileDown, History, Play } from 'lucide-react';
import { REPORT_TYPES, ReportKey, ReportFormat, exportReport } from '../../utils/exportReport';

type Props = {
  onGenerate: () => void;
};

export default function ReportsPanel({ onGenerate }: Props) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [scheduling, setScheduling] = useState<{ type: ReportKey; cron: string; next: string } | null>(null);
  const [history, setHistory] = useState<{ key: ReportKey; format: ReportFormat; ts: number; status: 'done'|'failed' }[]>([]);

  const thumbnails = useMemo(() => {
    // Lightweight inline thumbnail placeholders (could be replaced by real images)
    const map: Record<ReportKey, string> = Object.fromEntries(REPORT_TYPES.map(rt => [rt.key, rt.label]));
    return map;
  }, []);

  const schedule = (key: ReportKey) => {
    // Open scheduling sheet with a simple cron preset (Daily 06:00)
    setScheduling({ type: key, cron: '0 6 * * *', next: new Date(Date.now()+24*3600*1000).toLocaleString() });
  };

  const runNow = async (key: ReportKey, format: ReportFormat = 'PDF') => {
    const meta = { governance: { timestamp: new Date().toISOString(), version: 'v1.0.0', datasource: 'SIP Brewery Backend' } };
    const res = await exportReport(key, format, meta);
    setHistory(prev => [{ key, format, ts: Date.now(), status: res.ok? 'done':'failed' }, ...prev].slice(0,50));
  };

  return (
    <div id="panel-reports" role="tabpanel" aria-labelledby="tab-reports" className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Reports</h2>
        <div className="flex items-center gap-2">
          <button onClick={()=>setHistoryOpen(true)} className="p-4" aria-haspopup="dialog" aria-expanded={historyOpen}>
            <History className="w-4 h-4"/> History
          </button>
          <button onClick={onGenerate} className="px-3 py-2 rounded-xl bg-purple-500/20 text-purple-200 hover:bg-purple-500/30 text-sm inline-flex items-center gap-2">
            <FileDown className="w-4 h-4"/> Generate Report
          </button>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {REPORT_TYPES.map((rt) => (
          <div key={rt.key} className="p-6">
            <div className="rounded-lg bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/10 aspect-[4/3] mb-3 flex items-center justify-center text-xs text-purple-200">
              {/* Thumbnail placeholder */}
              <div className="text-center">
                <div className="text-white font-semibold mb-1">{thumbnails[rt.key]}</div>
                <div className="opacity-70">Preview</div>
              </div>
            </div>
            <div className="text-white font-semibold">{rt.label}</div>
            <div className="text-xs text-purple-300 mb-3">{rt.description}</div>
            <div className="flex items-center gap-2">
              <button onClick={()=>runNow(rt.key,'PDF')} className="p-4"><Play className="w-3 h-3"/> Run</button>
              <button onClick={()=>schedule(rt.key)} className="p-4"><CalendarClock className="w-3 h-3"/> Schedule</button>
              <button onClick={onGenerate} className="ml-auto text-xs px-2 py-1 rounded-lg bg-purple-500/20 text-purple-100 hover:bg-purple-500/30 inline-flex items-center gap-1"><FileDown className="w-3 h-3"/> Export</button>
            </div>
          </div>
        ))}
      </div>

      {/* Export governance note */}
      <div className="mt-4 text-[11px] text-purple-300">All PDF exports include governance footer: timestamp, version, datasource.</div>

      {/* History Drawer */}
      {historyOpen && (
        <div role="dialog" aria-modal="true" aria-label="Export History" className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setHistoryOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-slate-950 border-l border-white/15 ring-1 ring-white/10 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="text-white font-semibold inline-flex items-center gap-2"><History className="w-4 h-4"/> Export History</div>
              <button className="text-purple-200 hover:text-white" onClick={()=>setHistoryOpen(false)}>×</button>
            </div>
            <div className="space-y-2">
              {history.length===0 && (<div className="text-xs text-purple-300">No exports yet.</div>)}
              {history.map((h, i)=> (
                <div key={i} className="p-4">
                  <div className="flex-1">
                    <div className="text-white">{h.key} · {h.format}</div>
                    <div className="text-[11px] text-purple-300">{new Date(h.ts).toLocaleString()}</div>
                  </div>
                  <div className={`text-[11px] ${h.status==='done'?'text-emerald-300':'text-rose-300'}`}>{h.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scheduling Sheet */}
      {scheduling && (
        <div role="dialog" aria-modal="true" aria-label="Schedule Report" className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setScheduling(null)} />
          <div className="absolute bottom-0 left-0 right-0 bg-slate-950 border-t border-white/15 ring-1 ring-white/10 p-4 rounded-t-2xl">
            <div className="flex items-center justify-between mb-2">
              <div className="text-white font-semibold inline-flex items-center gap-2"><Clock className="w-4 h-4"/> Schedule {scheduling.type}</div>
              <button className="text-purple-200 hover:text-white" onClick={()=>setScheduling(null)}>×</button>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 text-sm">
              <label className="text-purple-200">Cron
                <input value={scheduling.cron} onChange={e=>setScheduling({ ...scheduling, cron: e.target.value })} className="p-4" />
              </label>
              <label className="text-purple-200">Next Run
                <input value={scheduling.next} onChange={e=>setScheduling({ ...scheduling, next: e.target.value })} className="p-4" />
              </label>
              <label className="text-purple-200">Format
                <select className="p-4"><option>PDF</option><option>CSV</option></select>
              </label>
            </div>
            <div className="mt-3 flex justify-end gap-2 text-sm">
              <button onClick={()=>setScheduling(null)} className="p-4">Close</button>
              <button onClick={()=>{ /* TODO: persist schedule */ setScheduling(null); }} className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30">Save Schedule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
