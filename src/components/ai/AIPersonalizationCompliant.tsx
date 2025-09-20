'use client';

import React, { useState, useEffect } from 'react';
import ComplianceDisclaimer from '../compliance/ComplianceDisclaimer';

interface FundInfo {
  fundName: string;
  category: string;
  riskLevel: string;
  minSIP: number;
  historicalReturn: string;
  description: string;
}

const AIPersonalizationCompliant: React.FC = () => {
  const [userProfile, setUserProfile] = useState({
    riskTolerance: 'moderate',
    investmentGoal: 'wealth_creation',
    timeHorizon: '5-10 years',
    monthlyInvestment: 10000
  });

  const [popularFunds] = useState<FundInfo[]>([
    {
      fundName: 'HDFC Top 100 Fund',
      category: 'Large Cap',
      riskLevel: 'Moderate',
      minSIP: 500,
      historicalReturn: '12.5% (5Y)',
      description: 'Invests in top 100 companies by market cap'
    },
    {
      fundName: 'SBI Small Cap Fund',
      category: 'Small Cap',
      riskLevel: 'High',
      minSIP: 1000,
      historicalReturn: '15.8% (5Y)',
      description: 'Focuses on small-cap companies with growth potential'
    },
    {
      fundName: 'ICICI Prudent Balanced Fund',
      category: 'Hybrid',
      riskLevel: 'Moderate',
      minSIP: 500,
      historicalReturn: '10.2% (5Y)',
      description: 'Balanced allocation between equity and debt'
    }
  ]);

  return (
    <div className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Compliance Notice */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            📚 Educational Fund Information Tool
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Learn about popular mutual funds based on different investor profiles
          </p>
          
          {/* Critical Compliance Notice */}
          <div className="max-w-4xl mx-auto mb-8">
            <ComplianceDisclaimer 
              contentType="ai-insights"
              showBusinessModel={true}
              size="large"
            />
          </div>
        </div>

        {/* Risk Profile Assessment (Educational) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
            <h3 className="text-2xl font-bold text-blue-400 mb-6">
              📊 Investment Profile Assessment (Educational)
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Risk Tolerance (For Educational Purposes)
                </label>
                <select 
                  value={userProfile.riskTolerance}
                  onChange={(e) => setUserProfile({...userProfile, riskTolerance: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                >
                  <option value="conservative">Conservative</option>
                  <option value="moderate">Moderate</option>
                  <option value="aggressive">Aggressive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Investment Goal (Educational)
                </label>
                <select 
                  value={userProfile.investmentGoal}
                  onChange={(e) => setUserProfile({...userProfile, investmentGoal: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                >
                  <option value="wealth_creation">Wealth Creation</option>
                  <option value="retirement">Retirement Planning</option>
                  <option value="child_education">Child Education</option>
                  <option value="tax_saving">Tax Saving</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Time Horizon (Educational)
                </label>
                <select 
                  value={userProfile.timeHorizon}
                  onChange={(e) => setUserProfile({...userProfile, timeHorizon: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                >
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
              <p className="text-yellow-300 text-sm font-semibold">
                ⚠️ This assessment is for educational purposes only. 
                Please consult a qualified financial advisor for personalized advice.
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
            <h3 className="text-2xl font-bold text-purple-400 mb-6">
              🎯 Educational Fund Information (Not Recommendations)
            </h3>
            
            <p className="text-gray-300 mb-4">
              Based on your profile, here's educational information about popular funds:
            </p>

            <div className="space-y-4">
              {popularFunds.map((fund, index) => (
                <div key={index} className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-white">{fund.fundName}</span>
                    <span className="text-blue-400 text-sm">{fund.category}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{fund.description}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Risk: {fund.riskLevel}</span>
                    <span>Min SIP: ₹{fund.minSIP}</span>
                  </div>
                  <div className="mt-2 text-xs">
                    <span className="text-gray-400">Historical Return: {fund.historicalReturn}</span>
                    <span className="text-yellow-300 ml-2">
                      (Past performance does not guarantee future returns)
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-300 text-sm font-semibold">
                🚨 IMPORTANT: This is educational information only. 
                We do not provide investment recommendations. 
                Please make independent investment decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Educational Insights */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
          <h3 className="text-2xl font-bold text-green-400 mb-6 text-center">
            📖 Educational Insights & Learning Resources
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700/50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-blue-400 mb-3">
                📈 Market Basics
              </h4>
              <p className="text-gray-300 text-sm">
                Learn about different types of mutual funds, their risk profiles, 
                and how they fit into various investment strategies.
              </p>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-purple-400 mb-3">
                🎯 Goal Planning
              </h4>
              <p className="text-gray-300 text-sm">
                Understand how to align your investment choices with your 
                financial goals and time horizons.
              </p>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-green-400 mb-3">
                ⚖️ Risk Management
              </h4>
              <p className="text-gray-300 text-sm">
                Learn about diversification, asset allocation, and managing 
                investment risks effectively.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <ComplianceDisclaimer 
              contentType="fund-analysis"
              size="medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPersonalizationCompliant;
