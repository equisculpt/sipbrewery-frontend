"use client";

import React, { useRef } from 'react';
import { useModalFocusTrap } from '../../hooks/useModalFocusTrap';

type Props = {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
};

export default function NewLumpsumModal({ open, onClose, onProceed }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useModalFocusTrap<HTMLDivElement>(open, ref, onClose);
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="New Lumpsum" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div ref={ref} className="relative z-10 w-full max-w-lg mx-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/15 ring-1 ring-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Invest Lumpsum</h3>
          <button onClick={onClose} className="text-purple-200 hover:text-white">×</button>
        </div>
        <div className="grid gap-4">
          <label className="text-sm text-purple-200">Amount (₹)
            <input type="number" className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white" defaultValue={50000} />
          </label>
          <label className="text-sm text-purple-200">Smart Allocation (ASI)
            <select className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white">
              <option>Auto-allocate across current portfolio</option>
              <option>Equity-heavy (aggressive)</option>
              <option>Balanced</option>
              <option>Conservative</option>
            </select>
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-purple-200">
            <input type="checkbox" className="accent-cyan-400" defaultChecked /> Avoid overlap &gt; 15%
          </label>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15">Cancel</button>
          <button onClick={onProceed} className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30">Proceed</button>
        </div>
      </div>
    </div>
  );
}
