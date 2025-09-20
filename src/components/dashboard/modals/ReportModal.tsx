"use client";

import React, { useRef, useState } from 'react';
import { useModalFocusTrap } from '../../hooks/useModalFocusTrap';
import { exportReport, ReportFormat, REPORT_TYPES, ReportKey } from '../../utils/exportReport';

type Props = {
  open: boolean;
  onClose: () => void;
  toast: (msg: string) => void;
};

export default function ReportModal({ open, onClose, toast }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [reportType, setReportType] = useState<ReportKey>('performance');
  const [reportFormat, setReportFormat] = useState<ReportFormat>('PDF');
  useModalFocusTrap<HTMLDivElement>(open, ref, onClose);
  if (!open) return null;

  const onExport = async () => {
    const res = await exportReport(reportType, reportFormat);
    toast(res.ok ? `${reportType} report exported successfully!` : 'Export failed. Please try again.');
    if (res.ok) onClose();
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Report" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div ref={ref} className="relative z-10 w-full max-w-2xl mx-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/15 ring-1 ring-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Generate Report</h3>
          <button onClick={onClose} className="text-purple-200 hover:text-white">×</button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="text-sm text-purple-200">Report Type
            <select value={reportType} onChange={(e)=>setReportType(e.target.value as ReportKey)} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white">
              {REPORT_TYPES.map(rt => (
                <option key={rt.key} value={rt.key}>{rt.label}</option>
              ))}
            </select>
          </label>
          <label className="text-sm text-purple-200">Date Range
            <input type="month" className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white" />
          </label>
          <label className="text-sm text-purple-200">Format
            <select value={reportFormat} onChange={(e)=>setReportFormat(e.target.value as ReportFormat)} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white">
              <option value="PDF">PDF</option>
              <option value="CSV">CSV</option>
            </select>
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-purple-200">
            <input type="checkbox" className="accent-cyan-400" defaultChecked /> Include insights
          </label>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15">Close</button>
          <button onClick={onExport} className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30">Export</button>
        </div>
      </div>
    </div>
  );
}
