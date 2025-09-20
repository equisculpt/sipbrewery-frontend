"use client";

import React from 'react';
import { GitBranch, PlayCircle, Save } from 'lucide-react';

export default function SandboxPanel() {
  return (
    <div id="panel-sandbox" role="tabpanel" aria-labelledby="tab-sandbox" className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-4"><GitBranch className="w-5 h-5 text-white/90"/></div>
        <div>
          <h2 className="text-2xl font-bold text-white">Execution Sandbox</h2>
          <p className="text-purple-200/90 text-sm">Draft, simulate, and stage changes. Commit in one click with audit trail.</p>
        </div>
      </div>
      <div className="p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-3">
            {["Rebalance to target weights","Shift ₹3,000 SIP from Fund A → B","Enable tax-harvest for ELSS"].map((item,i) => (
              <label key={i} className="p-4">
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="accent-cyan-400" />
                  <span className="text-sm text-white">{item}</span>
                </div>
                <span className="text-xs text-purple-300">Ready</span>
              </label>
            ))}
          </div>
          <div className="space-y-3">
            <button className="p-4">
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
    </div>
  );
}
