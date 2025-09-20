"use client";

import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ActionsPanel from './dashboard/panels/ActionsPanel';
import ReportsPanel from './dashboard/panels/ReportsPanel';
import FundsPanel from './dashboard/panels/FundsPanel';
import CopilotPanel from './dashboard/panels/CopilotPanel';
import BacktestPanel from './dashboard/panels/BacktestPanel';
import RiskPanel from './dashboard/panels/RiskPanel';
import GoalsPanel from './dashboard/panels/GoalsPanel';
import SandboxPanel from './dashboard/panels/SandboxPanel';
import PortfolioDetailsPanel from './dashboard/panels/PortfolioDetailsPanel';
import NewSipModal from './dashboard/modals/NewSipModal';
import NewLumpsumModal from './dashboard/modals/NewLumpsumModal';
import ReportModal from './dashboard/modals/ReportModal';

export type PanelKey = 'actions' | 'reports' | 'portfolio' | 'copilot' | 'backtest' | 'risk' | 'goals' | 'invest';

export default function DemoDashboardModular() {
  const prefersReducedMotion = useReducedMotion();
  const [activePanel, setActivePanel] = useState<PanelKey>('actions');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showNewSIP, setShowNewSIP] = useState(false);
  const [showNewLumpsum, setShowNewLumpsum] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const tablistRef = useRef<HTMLDivElement>(null);

  const toast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(()=> setToastMsg(null), 2500);
  };

  const tabs: { key: PanelKey; label: string }[] = [
    { key: 'actions', label: 'Actions' },
    { key: 'reports', label: 'Reports' },
    { key: 'portfolio', label: 'Portfolio Details' },
    { key: 'copilot', label: 'Strategy Copilot' },
    { key: 'backtest', label: 'Regret Backtest' },
    { key: 'risk', label: 'Risk Lens' },
    { key: 'goals', label: 'Goal Engine' },
    { key: 'invest', label: 'Invest' },
  ];

  const onTabKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const keys = tabs.map(t => t.key) as PanelKey[];
      const currentIndex = keys.indexOf(activePanel);
      const nextIndex = e.key === 'ArrowRight'
        ? (currentIndex + 1) % keys.length
        : (currentIndex - 1 + keys.length) % keys.length;
      const nextKey = keys[nextIndex];
      setActivePanel(nextKey);
      document.getElementById(`tab-${nextKey}`)?.focus();
    }
    if (e.key === 'Home') { e.preventDefault(); setActivePanel(tabs[0].key); document.getElementById(`tab-${tabs[0].key}`)?.focus(); }
    if (e.key === 'End') { e.preventDefault(); setActivePanel(tabs[tabs.length-1].key); document.getElementById(`tab-${tabs[tabs.length-1].key}`)?.focus(); }
  };

  return (
    <div className="py-8">
      <div className="mb-8">
        <div className="mb-6">
        </div>
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div ref={tablistRef} role="tablist" aria-label="ASI Command Center Tabs" className="flex flex-wrap gap-3 p-2 bg-white/5 rounded-2xl backdrop-blur-xl border border-purple-500/20" onKeyDown={onTabKeyDown}>
              {tabs.map((t)=> (
                <button
                  key={t.key}
                  id={`tab-${t.key}`}
                  role="tab"
                  aria-selected={activePanel === t.key}
                  aria-controls={`panel-${t.key}`}
                  onClick={()=>setActivePanel(t.key)}
                  className={`relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activePanel===t.key 
                      ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-violet-600 text-white shadow-2xl shadow-purple-500/50 border-2 border-pink-400 transform scale-110 z-10' 
                      : 'text-purple-200 hover:text-white hover:bg-purple-500/20 border border-transparent hover:scale-105'
                  }`}
                >
                  {/* Active Glow Effect */}
                  {activePanel === t.key && (
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-600 to-violet-600 rounded-xl blur-lg opacity-75 animate-pulse -z-10"></div>
                  )}
                  
                  {/* Active Sparkle Effect */}
                  {activePanel === t.key && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-pink-300/30 to-purple-300/20 rounded-xl animate-ping -z-10"></div>
                  )}
                  
                  <span className="relative z-10">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Panels */}
        <motion.div initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {activePanel === 'actions' && (
            <ActionsPanel onNewSIP={()=>setShowNewSIP(true)} onNewLumpsum={()=>setShowNewLumpsum(true)} onGenerateReport={()=>setShowReportModal(true)} />
          )}
          {activePanel === 'reports' && (<ReportsPanel onGenerate={()=>setShowReportModal(true)} />)}
          {activePanel === 'portfolio' && (<PortfolioDetailsPanel />)}
          {activePanel === 'copilot' && (<CopilotPanel />)}
          {activePanel === 'backtest' && (<BacktestPanel />)}
          {activePanel === 'risk' && (<RiskPanel />)}
          {activePanel === 'goals' && (<GoalsPanel />)}
          {activePanel === 'invest' && (<FundsPanel />)}
          {/* Sandbox replaced by Invest (FundsPanel) */}
        </motion.div>

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-[60] px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg">
          {toastMsg}
        </div>
      )}

      {/* Modals */}
      <NewSipModal open={showNewSIP} onClose={()=>setShowNewSIP(false)} onCreate={()=>{ setShowNewSIP(false); toast('SIP created successfully'); }} />
      <NewLumpsumModal open={showNewLumpsum} onClose={()=>setShowNewLumpsum(false)} onProceed={()=>{ setShowNewLumpsum(false); toast('Lumpsum plan ready'); }} />
      <ReportModal open={showReportModal} onClose={()=>setShowReportModal(false)} toast={toast} />
    </div>
  );
}
