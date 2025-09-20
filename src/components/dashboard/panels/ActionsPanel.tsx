"use client";

import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, ComposedChart, Bar, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { PlayCircle, Save, PlusCircle, Settings2, Zap, TrendingUp, Shield, Target, Brain, Sparkles, Clock, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

type Props = {
  onNewSIP: () => void;
  onNewLumpsum: () => void;
  onGenerateReport: () => void;
};

export default function ActionsPanel({ onNewSIP, onNewLumpsum, onGenerateReport }: Props) {
  const [activeTab, setActiveTab] = useState('recommendations');
  const [executingAction, setExecutingAction] = useState<string | null>(null);
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  // AI-powered recommendations data
  const aiRecommendations = [
    {
      id: 'rebalance',
      title: 'Portfolio Rebalancing',
      description: 'Optimize allocation to target 65:35 equity-debt ratio',
      impact: 'High',
      timeToExecute: '2 mins',
      potentialGain: '₹12,500',
      confidence: 94,
      urgency: 'Medium',
      category: 'optimization',
      icon: Target,
      color: 'emerald'
    },
    {
      id: 'tax-harvest',
      title: 'Tax Loss Harvesting',
      description: 'Harvest losses in ELSS funds to save ₹8,400 in taxes',
      impact: 'High',
      timeToExecute: '5 mins',
      potentialGain: '₹8,400',
      confidence: 89,
      urgency: 'High',
      category: 'tax',
      icon: Shield,
      color: 'blue'
    },
    {
      id: 'sip-optimize',
      title: 'SIP Route Optimization',
      description: 'Redirect overlapping SIPs to reduce expense ratio by 0.3%',
      impact: 'Medium',
      timeToExecute: '3 mins',
      potentialGain: '₹4,200',
      confidence: 87,
      urgency: 'Low',
      category: 'efficiency',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      id: 'goal-alignment',
      title: 'Goal Realignment',
      description: 'Adjust allocations for retirement goal acceleration',
      impact: 'High',
      timeToExecute: '4 mins',
      potentialGain: '₹18,900',
      confidence: 92,
      urgency: 'Medium',
      category: 'goals',
      icon: Target,
      color: 'cyan'
    }
  ];

  // Performance impact data
  const impactData = [
    { metric: 'Returns', current: 85, optimized: 92 },
    { metric: 'Risk', current: 75, optimized: 65 },
    { metric: 'Tax Efficiency', current: 70, optimized: 88 },
    { metric: 'Diversification', current: 80, optimized: 95 },
    { metric: 'Cost Efficiency', current: 65, optimized: 85 }
  ];

  // Quick actions data
  const quickActions = [
    { id: 'new-sip', title: 'Start New SIP', icon: PlusCircle, action: onNewSIP, color: 'emerald' },
    { id: 'lumpsum', title: 'Invest Lumpsum', icon: Zap, action: onNewLumpsum, color: 'blue' },
    { id: 'report', title: 'Generate Report', icon: PlayCircle, action: onGenerateReport, color: 'purple' },
    { id: 'rebalance', title: 'Auto Rebalance', icon: Target, action: () => executeAction('auto-rebalance'), color: 'cyan' }
  ];

  const executeAction = async (actionId: string) => {
    setExecutingAction(actionId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setExecutingAction(null);
    setCompletedActions(prev => [...prev, actionId]);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'text-red-400 bg-red-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'Low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-emerald-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };
  return (
    <div id="panel-actions" role="tabpanel" aria-labelledby="tab-actions" className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-violet-500/20 to-purple-500/20 relative">
            <Brain className="w-6 h-6 text-white"/>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
              AI Action Center
            </h2>
            <p className="text-purple-200/90 text-sm">Intelligent recommendations powered by ASI Finance Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs">
            <Sparkles className="w-3 h-3"/>
            <span>4 Actions Ready</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 mb-6 p-1 rounded-xl bg-slate-800/30">
        {[
          { id: 'recommendations', label: 'AI Recommendations', icon: Brain },
          { id: 'quick-actions', label: 'Quick Actions', icon: Zap },
          { id: 'impact', label: 'Impact Analysis', icon: TrendingUp }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg'
                : 'text-purple-200 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <tab.icon className="w-4 h-4"/>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          {aiRecommendations.map((rec, index) => {
            const IconComponent = rec.icon;
            const isExecuting = executingAction === rec.id;
            const isCompleted = completedActions.includes(rec.id);
            
            return (
              <div key={rec.id} className="p-6 rounded-2xl bg-white/5 hover:bg-white/8 transition-all duration-300 group border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      rec.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' :
                      rec.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                      rec.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-cyan-500/20 text-cyan-400'
                    }`}>
                      <IconComponent className="w-5 h-5"/>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">{rec.title}</h3>
                      <p className="text-purple-200/70 text-sm">{rec.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-emerald-400 font-semibold">{rec.potentialGain}</div>
                      <div className="text-xs text-purple-300">{rec.timeToExecute}</div>
                    </div>
                    
                    {isCompleted ? (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4"/>
                        <span className="text-sm">Done</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => executeAction(rec.id)}
                        disabled={isExecuting}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          isExecuting
                            ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {isExecuting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                            <span>Running...</span>
                          </div>
                        ) : (
                          'Execute'
                        )}
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-xs">
                  <span className={`px-2 py-1 rounded-full ${getUrgencyColor(rec.urgency)}`}>
                    {rec.urgency}
                  </span>
                  <span className="text-purple-300">{rec.confidence}% confidence</span>
                  <span className={`${getImpactColor(rec.impact)}`}>
                    {rec.impact} Impact
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'quick-actions' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map(action => {
            const IconComponent = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.action}
                className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  action.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' :
                  action.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                  action.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-cyan-500/20 text-cyan-400'
                }`}>
                  <IconComponent className="w-6 h-6"/>
                </div>
                <h3 className="text-white font-medium">{action.title}</h3>
              </button>
            );
          })}
        </div>
      )}

      {activeTab === 'impact' && (
        <div className="space-y-8">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-medium text-white mb-6 text-center">Performance Impact Analysis</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={impactData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="metric" stroke="rgba(255,255,255,0.6)" fontSize={14} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.2)" fontSize={12} />
                  <Radar dataKey="current" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} name="Current" strokeWidth={2} />
                  <Radar dataKey="optimized" stroke="#10B981" fill="#10B981" fillOpacity={0.2} name="Optimized" strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-8 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <span className="text-purple-200">Current Portfolio</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                <span className="text-emerald-200">After Optimization</span>
              </div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400"/>
                </div>
                <h4 className="text-lg font-medium text-white">Expected Benefits</h4>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-purple-200">Additional Annual Returns</span>
                  <span className="text-emerald-400 font-semibold text-lg">+₹43,600</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-purple-200">Risk Reduction</span>
                  <span className="text-emerald-400 font-semibold text-lg">-12%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-purple-200">Tax Savings</span>
                  <span className="text-emerald-400 font-semibold text-lg">₹8,400</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-blue-400"/>
                </div>
                <h4 className="text-lg font-medium text-white">Important Notes</h4>
              </div>
              <div className="space-y-3">
                <p className="text-purple-200/80 text-sm leading-relaxed">
                  Market volatility may affect short-term returns
                </p>
                <p className="text-purple-200/80 text-sm leading-relaxed">
                  Tax harvesting subject to LTCG rules
                </p>
                <p className="text-purple-200/80 text-sm leading-relaxed">
                  Rebalancing may incur transaction costs
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
