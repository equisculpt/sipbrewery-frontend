'use client';

import React, { useState, useEffect } from 'react';
import { Target, Home, GraduationCap, Car, Plane, Heart, Calculator, TrendingUp, Clock, DollarSign } from 'lucide-react';

interface GoalRecommendation {
  timeHorizon: string;
  recommendedFunds: any[];
  strategy: string;
  sipAmount: number;
}

interface Goal {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  timeHorizon: string;
  riskLevel: string;
  color: string;
}

export default function GoalBasedInvesting() {
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [targetAmount, setTargetAmount] = useState<number>(1000000);
  const [timeHorizon, setTimeHorizon] = useState<number>(10);
  const [recommendation, setRecommendation] = useState<GoalRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const goals: Goal[] = [
    {
      id: 'retirement',
      name: 'Retirement Planning',
      icon: <Clock className="w-8 h-8" />,
      description: 'Build a corpus for comfortable retirement',
      timeHorizon: '20+ years',
      riskLevel: 'Moderate',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'child-education',
      name: 'Child Education',
      icon: <GraduationCap className="w-8 h-8" />,
      description: 'Secure your child\'s educational future',
      timeHorizon: '10-15 years',
      riskLevel: 'Moderate',
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'house-purchase',
      name: 'Home Purchase',
      icon: <Home className="w-8 h-8" />,
      description: 'Save for your dream home down payment',
      timeHorizon: '5-10 years',
      riskLevel: 'Moderate',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'emergency-fund',
      name: 'Emergency Fund',
      icon: <Heart className="w-8 h-8" />,
      description: 'Build a safety net for unexpected expenses',
      timeHorizon: '1-3 years',
      riskLevel: 'Low',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'vacation',
      name: 'Dream Vacation',
      icon: <Plane className="w-8 h-8" />,
      description: 'Plan and save for your dream vacation',
      timeHorizon: '2-5 years',
      riskLevel: 'Low-Moderate',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'car-purchase',
      name: 'Car Purchase',
      icon: <Car className="w-8 h-8" />,
      description: 'Save for your next vehicle upgrade',
      timeHorizon: '3-7 years',
      riskLevel: 'Moderate',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const fetchRecommendation = async () => {
    if (!selectedGoal) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/funds/goals?goal=${selectedGoal}&amount=${targetAmount}&timeHorizon=${timeHorizon}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      setRecommendation(data.data.selectedGoal);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError('Failed to load recommendations. Please try again.');
      // Fallback demo data
      setRecommendation({
        timeHorizon: `${timeHorizon} years`,
        recommendedFunds: [
          {
            id: 'FUND001',
            name: 'SBI Bluechip Fund',
            category: 'Large Cap',
            returns: { '3Y': 15.2 },
            rating: 4.5
          },
          {
            id: 'FUND002',
            name: 'HDFC Top 100 Fund',
            category: 'Large Cap',
            returns: { '3Y': 16.1 },
            rating: 5.0
          }
        ],
        strategy: 'Balanced growth with capital protection for your selected goal',
        sipAmount: Math.max(1000, Math.round(targetAmount / (timeHorizon * 12)))
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedGoal) {
      fetchRecommendation();
    }
  }, [selectedGoal, targetAmount, timeHorizon]);

  const calculateFutureValue = (monthlyInvestment: number, years: number, annualReturn: number = 12) => {
    const monthlyReturn = annualReturn / 100 / 12;
    const months = years * 12;
    const futureValue = monthlyInvestment * (((1 + monthlyReturn) ** months - 1) / monthlyReturn) * (1 + monthlyReturn);
    return Math.round(futureValue);
  };

  const getGoalById = (id: string) => goals.find(goal => goal.id === id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">🎯 Goal-Based Investing</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Turn your dreams into achievable financial goals. Get personalized investment recommendations 
            based on your timeline, risk tolerance, and target amount.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Goal Selection */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="w-6 h-6 mr-2 text-purple-600" />
            Choose Your Financial Goal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map(goal => (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  selectedGoal === goal.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${goal.color} flex items-center justify-center text-white mb-4`}>
                  {goal.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{goal.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{goal.timeHorizon}</span>
                  <span>{goal.riskLevel} Risk</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Goal Configuration */}
        {selectedGoal && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-6 h-6 mr-2 text-blue-600" />
              Configure Your Goal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Amount (₹)
                </label>
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="50000"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-center text-2xl font-bold text-blue-600 mt-2">
                  ₹{targetAmount.toLocaleString()}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Horizon (Years)
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={timeHorizon}
                  onChange={(e) => setTimeHorizon(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-center text-2xl font-bold text-purple-600 mt-2">
                  {timeHorizon} Years
                </div>
              </div>
            </div>
            {error && (
              <div className="mt-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                {error} (Showing demo recommendations)
              </div>
            )}
          </div>
        )}

        {/* Recommendations */}
        {recommendation && !loading && (
          <div className="space-y-8">
            {/* SIP Calculation */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Your Investment Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">₹{recommendation.sipAmount.toLocaleString()}</div>
                  <div className="text-sm opacity-90">Monthly SIP</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{timeHorizon}</div>
                  <div className="text-sm opacity-90">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">₹{(recommendation.sipAmount * timeHorizon * 12).toLocaleString()}</div>
                  <div className="text-sm opacity-90">Total Investment</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">₹{calculateFutureValue(recommendation.sipAmount, timeHorizon).toLocaleString()}</div>
                  <div className="text-sm opacity-90">Expected Value</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg">
                <p className="text-sm text-center">
                  <strong>Strategy:</strong> {recommendation.strategy}
                </p>
              </div>
            </div>

            {/* Recommended Funds */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                Recommended Funds for {getGoalById(selectedGoal)?.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendation.recommendedFunds.map(fund => (
                  <div key={fund.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{fund.name}</h4>
                        <p className="text-sm text-gray-600">{fund.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{fund.returns['3Y']}%</div>
                        <div className="text-xs text-gray-500">3Y Returns</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600">Rating: </span>
                        <span className="text-sm font-medium text-yellow-600 ml-1">{fund.rating}★</span>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Start SIP
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Timeline */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Timeline</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                {Array.from({ length: Math.min(timeHorizon, 5) }, (_, i) => {
                  const year = i + 1;
                  const value = calculateFutureValue(recommendation.sipAmount, year);
                  return (
                    <div key={year} className="relative flex items-center mb-6">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold relative z-10">
                        {year}
                      </div>
                      <div className="ml-6 flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Year {year}</span>
                          <span className="text-lg font-bold text-blue-600">₹{value.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                            style={{ width: `${(value / calculateFutureValue(recommendation.sipAmount, timeHorizon)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {timeHorizon > 5 && (
                  <div className="relative flex items-center">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold relative z-10">
                      {timeHorizon}
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Target Year {timeHorizon}</span>
                        <span className="text-xl font-bold text-green-600">₹{calculateFutureValue(recommendation.sipAmount, timeHorizon).toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full w-full"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg text-lg font-semibold">
                <DollarSign className="w-5 h-5 inline mr-2" />
                Start Your {getGoalById(selectedGoal)?.name} Journey
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Analyzing your goal and generating personalized recommendations...</p>
            </div>
          </div>
        )}

        {/* Goal Planning Tips */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Goal-Based Investment Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Planning Strategy</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <Target className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Set specific, measurable, and time-bound goals</span>
                </li>
                <li className="flex items-start">
                  <Calculator className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Calculate the exact amount needed considering inflation</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Start early to benefit from compounding</span>
                </li>
                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Review and adjust your plan annually</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Investment Approach</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <DollarSign className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Use SIP for disciplined and regular investing</span>
                </li>
                <li className="flex items-start">
                  <Heart className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Align risk tolerance with investment timeline</span>
                </li>
                <li className="flex items-start">
                  <Home className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Diversify across different fund categories</span>
                </li>
                <li className="flex items-start">
                  <GraduationCap className="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Stay invested and avoid frequent changes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
