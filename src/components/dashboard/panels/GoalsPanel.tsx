"use client";

import React, { useState } from 'react';
import { Target, Home, GraduationCap, Car, Plane, Heart, TrendingUp, Calendar, DollarSign, AlertTriangle, CheckCircle, Clock, Zap, Plus, X } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, LineChart, Line, BarChart, Bar, Tooltip, Legend, ComposedChart, ReferenceLine } from 'recharts';

interface Goal {
  id: string;
  name: string;
  icon: any;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  monthlyContribution: number;
  probability: number;
  status: 'on-track' | 'behind' | 'ahead' | 'at-risk';
  priority: 'high' | 'medium' | 'low';
  category: 'retirement' | 'education' | 'property' | 'travel' | 'emergency';
}

const goals: Goal[] = [
  {
    id: '1',
    name: 'Retirement Fund',
    icon: Heart,
    targetAmount: 50000000,
    currentAmount: 8500000,
    targetDate: '2045-12-31',
    monthlyContribution: 25000,
    probability: 87,
    status: 'on-track',
    priority: 'high',
    category: 'retirement'
  },
  {
    id: '2',
    name: 'Child Education',
    icon: GraduationCap,
    targetAmount: 15000000,
    currentAmount: 3200000,
    targetDate: '2035-06-15',
    monthlyContribution: 15000,
    probability: 92,
    status: 'on-track',
    priority: 'high',
    category: 'education'
  },
  {
    id: '3',
    name: 'Dream Home',
    icon: Home,
    targetAmount: 8000000,
    currentAmount: 1800000,
    targetDate: '2030-03-31',
    monthlyContribution: 20000,
    probability: 73,
    status: 'behind',
    priority: 'medium',
    category: 'property'
  },
  {
    id: '4',
    name: 'Emergency Fund',
    icon: AlertTriangle,
    targetAmount: 1200000,
    currentAmount: 850000,
    targetDate: '2025-12-31',
    monthlyContribution: 8000,
    probability: 95,
    status: 'ahead',
    priority: 'high',
    category: 'emergency'
  }
];

const goalProjectionData = [
  { year: '2024', retirement: 8.5, education: 3.2, home: 1.8, emergency: 0.85, retirementTarget: 50, educationTarget: 15, homeTarget: 8, emergencyTarget: 1.2 },
  { year: '2025', retirement: 11.2, education: 4.1, home: 2.6, emergency: 1.2, retirementTarget: 50, educationTarget: 15, homeTarget: 8, emergencyTarget: 1.2 },
  { year: '2026', retirement: 14.8, education: 5.3, home: 3.5, emergency: 1.2, retirementTarget: 50, educationTarget: 15, homeTarget: 8, emergencyTarget: 1.2 },
  { year: '2027', retirement: 19.1, education: 6.8, home: 4.6, emergency: 1.2, retirementTarget: 50, educationTarget: 15, homeTarget: 8, emergencyTarget: 1.2 },
  { year: '2028', retirement: 24.2, education: 8.6, home: 5.9, emergency: 1.2, retirementTarget: 50, educationTarget: 15, homeTarget: 8, emergencyTarget: 1.2 },
  { year: '2030', retirement: 32.1, education: 11.8, home: 8.0, emergency: 1.2, retirementTarget: 50, educationTarget: 15, homeTarget: 8, emergencyTarget: 1.2 },
  { year: '2035', retirement: 42.5, education: 15.0, home: 8.0, emergency: 1.2, retirementTarget: 50, educationTarget: 15, homeTarget: 8, emergencyTarget: 1.2 },
  { year: '2045', retirement: 50.0, education: 15.0, home: 8.0, emergency: 1.2, retirementTarget: 50, educationTarget: 15, homeTarget: 8, emergencyTarget: 1.2 }
];

const smartNudges = [
  {
    type: 'increase-sip',
    icon: TrendingUp,
    title: 'Boost Dream Home SIP',
    description: 'Increase monthly SIP by ₹5,000 to improve probability from 73% to 89%',
    impact: '+16% success probability',
    urgency: 'high',
    action: 'Increase SIP'
  },
  {
    type: 'rebalance',
    icon: Target,
    title: 'Rebalance for Education Goal',
    description: 'Shift 5% from equity to debt funds to reduce volatility near target date',
    impact: 'Lower risk, stable returns',
    urgency: 'medium',
    action: 'Rebalance Now'
  },
  {
    type: 'tax-optimize',
    icon: DollarSign,
    title: 'Tax Harvest Opportunity',
    description: 'Book losses in underperforming funds to save ₹12,000 in taxes',
    impact: '₹12,000 tax savings',
    urgency: 'low',
    action: 'Optimize Taxes'
  }
];

const formatCurrency = (amount: number) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return `₹${(amount / 1000).toFixed(0)}K`;
};

export default function GoalsPanel() {
  const [selectedGoal, setSelectedGoal] = useState<string>('1');
  const [viewMode, setViewMode] = useState<'overview' | 'projections' | 'nudges'>('overview');
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [goalsList, setGoalsList] = useState<Goal[]>(goals);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    targetDate: '',
    monthlyContribution: '',
    category: 'retirement' as Goal['category'],
    priority: 'medium' as Goal['priority']
  });

  const selectedGoalData = goalsList.find(g => g.id === selectedGoal);

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.targetDate || !newGoal.monthlyContribution) {
      return;
    }

    const goalIcons = {
      retirement: Heart,
      education: GraduationCap,
      property: Home,
      travel: Plane,
      emergency: AlertTriangle
    };

    const goal: Goal = {
      id: Date.now().toString(),
      name: newGoal.name,
      icon: goalIcons[newGoal.category],
      targetAmount: parseInt(newGoal.targetAmount),
      currentAmount: 0,
      targetDate: newGoal.targetDate,
      monthlyContribution: parseInt(newGoal.monthlyContribution),
      probability: 85, // Default probability
      status: 'on-track',
      priority: newGoal.priority,
      category: newGoal.category
    };

    setGoalsList([...goalsList, goal]);
    setNewGoal({
      name: '',
      targetAmount: '',
      targetDate: '',
      monthlyContribution: '',
      category: 'retirement',
      priority: 'medium'
    });
    setShowAddGoal(false);
  };

  return (
    <div id="panel-goals" role="tabpanel" aria-labelledby="tab-goals" className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20">
            <Target className="w-6 h-6 text-white"/>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              Goal Engine
            </h2>
            <p className="text-purple-200/90 text-sm">Intelligent goal-based investment planning with probability analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddGoal(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Goal
          </button>
          {['overview', 'projections', 'nudges'].map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as any)}
              className={`px-3 py-2 rounded-xl text-sm transition-all capitalize ${
                viewMode === mode
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                  : 'bg-white/10 text-purple-200 hover:bg-white/15'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Goals Overview */}
      {viewMode === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {goalsList.map((goal) => {
              const Icon = goal.icon;
              const progress = (goal.currentAmount / goal.targetAmount) * 100;
              const yearsLeft = new Date(goal.targetDate).getFullYear() - new Date().getFullYear();
              
              return (
                <div
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedGoal === goal.id ? 'ring-2 ring-emerald-400' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      goal.status === 'on-track' ? 'bg-emerald-500/20 text-emerald-400' :
                      goal.status === 'ahead' ? 'bg-blue-500/20 text-blue-400' :
                      goal.status === 'behind' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-medium text-sm">{goal.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          goal.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                          goal.priority === 'medium' ? 'bg-amber-500/20 text-amber-300' :
                          'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {goal.priority}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-purple-200">Progress</span>
                          <span className="text-white">{progress.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              goal.status === 'on-track' ? 'bg-emerald-400' :
                              goal.status === 'ahead' ? 'bg-blue-400' :
                              goal.status === 'behind' ? 'bg-amber-400' :
                              'bg-red-400'
                            }`}
                            style={{ width: `${Math.min(100, progress)}%` }}
                          />
                        </div>
                        
                        <div className="flex justify-between text-xs">
                          <span className="text-purple-200">Current</span>
                          <span className="text-white">{formatCurrency(goal.currentAmount)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-purple-200">Target</span>
                          <span className="text-white">{formatCurrency(goal.targetAmount)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-purple-200">Years Left</span>
                          <span className="text-white">{yearsLeft} years</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-purple-200">Probability</span>
                          <span className={`font-semibold ${
                            goal.probability >= 85 ? 'text-emerald-400' :
                            goal.probability >= 70 ? 'text-amber-400' :
                            'text-red-400'
                          }`}>
                            {goal.probability}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Goal Details */}
          {selectedGoalData && (
            <div className="space-y-4">
              <div className="text-white font-medium">
                {selectedGoalData.name} - Detailed Analysis
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4">
                  <div className="text-emerald-300 text-sm mb-2">Monthly Contribution</div>
                  <div className="text-2xl font-bold text-emerald-400">
                    {formatCurrency(selectedGoalData.monthlyContribution)}/mo
                  </div>
                  <div className="text-xs text-emerald-300/70">Current SIP amount</div>
                </div>
                <div className="p-4">
                  <div className="text-blue-300 text-sm mb-2">Expected Returns</div>
                  <div className="text-2xl font-bold text-blue-400">12.5%</div>
                  <div className="text-xs text-blue-300/70">Annualized return assumption</div>
                </div>
                <div className="p-4">
                  <div className="text-purple-300 text-sm mb-2">Shortfall Risk</div>
                  <div className="text-2xl font-bold text-purple-400">
                    {100 - selectedGoalData.probability}%
                  </div>
                  <div className="text-xs text-purple-300/70">Probability of missing target</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Goal Projections */}
      {viewMode === 'projections' && (
        <div className="space-y-8">
          <div className="h-96">
            <div className="text-white font-medium mb-3">Goal Projection Timeline</div>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={goalProjectionData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                <XAxis dataKey="year" stroke="rgba(255,255,255,0.6)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 30, 50, 0.95)', 
                    border: '1px solid rgba(124, 58, 237, 0.3)',
                    borderRadius: '12px',
                    color: 'white'
                  }} 
                />
                <Legend 
                  wrapperStyle={{ 
                    paddingTop: '30px', 
                    fontSize: '11px',
                    lineHeight: '16px'
                  }}
                  iconSize={8}
                  layout="horizontal"
                  align="center"
                />
                <Area type="monotone" dataKey="retirement" stackId="1" stroke="#10B981" fill="rgba(16, 185, 129, 0.3)" name="Retirement" />
                <Area type="monotone" dataKey="education" stackId="1" stroke="#3B82F6" fill="rgba(59, 130, 246, 0.3)" name="Education" />
                <Area type="monotone" dataKey="home" stackId="1" stroke="#F59E0B" fill="rgba(245, 158, 11, 0.3)" name="Home" />
                <Area type="monotone" dataKey="emergency" stackId="1" stroke="#EF4444" fill="rgba(239, 68, 68, 0.3)" name="Emergency" />
                <Line type="monotone" dataKey="retirementTarget" stroke="#10B981" strokeDasharray="5 5" name="Ret. Target" />
                <Line type="monotone" dataKey="educationTarget" stroke="#3B82F6" strokeDasharray="5 5" name="Edu. Target" />
                <Line type="monotone" dataKey="homeTarget" stroke="#F59E0B" strokeDasharray="5 5" name="Home Target" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="text-white font-medium">Probability Analysis</div>
              {goalsList.map(goal => (
                <div key={goal.id} className="flex items-center justify-between p-3">
                  <span className="text-purple-200">{goal.name}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-slate-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          goal.probability >= 85 ? 'bg-emerald-400' :
                          goal.probability >= 70 ? 'bg-amber-400' :
                          'bg-red-400'
                        }`}
                        style={{ width: `${goal.probability}%` }}
                      />
                    </div>
                    <span className={`font-semibold text-sm ${
                      goal.probability >= 85 ? 'text-emerald-400' :
                      goal.probability >= 70 ? 'text-amber-400' :
                      'text-red-400'
                    }`}>
                      {goal.probability}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="text-white font-medium">Risk Factors</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2">
                  <span className="text-purple-200">Market Volatility</span>
                  <span className="text-amber-400">Medium</span>
                </div>
                <div className="flex items-center justify-between p-2">
                  <span className="text-purple-200">Inflation Impact</span>
                  <span className="text-red-400">High</span>
                </div>
                <div className="flex items-center justify-between p-2">
                  <span className="text-purple-200">Interest Rate Risk</span>
                  <span className="text-emerald-400">Low</span>
                </div>
                <div className="flex items-center justify-between p-2">
                  <span className="text-purple-200">Contribution Consistency</span>
                  <span className="text-emerald-400">Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Smart Nudges */}
      {viewMode === 'nudges' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {smartNudges.map((nudge, index) => {
              const Icon = nudge.icon;
              return (
                <div key={index} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      nudge.urgency === 'high' ? 'bg-red-500/20 text-red-400' :
                      nudge.urgency === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-medium text-sm">{nudge.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          nudge.urgency === 'high' ? 'bg-red-500/20 text-red-300' :
                          nudge.urgency === 'medium' ? 'bg-amber-500/20 text-amber-300' :
                          'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {nudge.urgency}
                        </span>
                      </div>
                      <p className="text-purple-200 text-xs leading-relaxed mb-3">{nudge.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-emerald-400 font-medium">{nudge.impact}</span>
                        <button className="px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all text-xs">
                          {nudge.action}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-4">
            <div className="text-white font-medium">Automated Optimization Suggestions</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="text-white text-sm font-medium">Auto-Rebalancing</div>
                    <div className="text-purple-200 text-xs">Quarterly rebalancing based on goal proximity</div>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all text-sm">
                  Enable
                </button>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-white text-sm font-medium">Dynamic SIP Adjustment</div>
                    <div className="text-purple-200 text-xs">Increase SIP by 10% annually to beat inflation</div>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all text-sm">
                  Enable
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Add New Goal</h3>
              <button
                onClick={() => setShowAddGoal(false)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">Goal Name</label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                  placeholder="e.g., Dream Car, Vacation Fund"
                  className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">Target Amount (₹)</label>
                <input
                  type="number"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                  placeholder="1000000"
                  className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">Target Date</label>
                <input
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">Monthly SIP (₹)</label>
                <input
                  type="number"
                  value={newGoal.monthlyContribution}
                  onChange={(e) => setNewGoal({...newGoal, monthlyContribution: e.target.value})}
                  placeholder="10000"
                  className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">Category</label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({...newGoal, category: e.target.value as Goal['category']})}
                  className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="retirement">Retirement</option>
                  <option value="education">Education</option>
                  <option value="property">Property</option>
                  <option value="travel">Travel</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">Priority</label>
                <select
                  value={newGoal.priority}
                  onChange={(e) => setNewGoal({...newGoal, priority: e.target.value as Goal['priority']})}
                  className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddGoal(false)}
                className="flex-1 px-4 py-2 rounded-xl bg-slate-600 text-white hover:bg-slate-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGoal}
                className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all"
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4">
        <div className="text-white font-medium mb-2">Goal Engine Intelligence</div>
        <div className="text-sm text-purple-200 leading-relaxed">
          Our advanced goal engine uses Monte Carlo simulations, behavioral finance models, and real-time market data 
          to provide probability-based projections and intelligent nudges. All recommendations are personalized based 
          on your risk profile, time horizon, and financial capacity.
        </div>
      </div>
    </div>
  );
}
