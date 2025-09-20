import React, { useState } from 'react';
import { 
  CheckCircle, Calendar, DollarSign, TrendingUp, 
  Shield, Clock, Award, Building2, CreditCard,
  FileText, Download, Mail, Bell, Star,
  AlertTriangle, Info, Zap
} from 'lucide-react';
import { InvestmentSummary, TaxBenefit } from '../../types/investment';

interface InvestmentConfirmationProps {
  investmentSummary: InvestmentSummary;
  onConfirm: () => void;
  onBack: () => void;
  isProcessing: boolean;
}

export default function InvestmentConfirmation({ 
  investmentSummary, 
  onConfirm, 
  onBack,
  isProcessing 
}: InvestmentConfirmationProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);

  // Mock tax benefits data
  const taxBenefits: TaxBenefit[] = [
    {
      section: '80C',
      maxDeduction: 150000,
      currentUtilization: 75000,
      potentialSaving: investmentSummary.investmentType === 'sip' 
        ? Math.min(investmentSummary.amount * 12, 75000) * 0.3
        : Math.min(investmentSummary.amount, 75000) * 0.3
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Investment Summary Card */}
      <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20">
        <div className="flex items-center mb-6">
          <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Investment Summary</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Fund Details */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Fund Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                <span className="text-gray-400">Fund Name</span>
                <span className="text-white font-semibold text-right max-w-xs">
                  {investmentSummary.fundDetails.name}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                <span className="text-gray-400">Category</span>
                <span className="text-white font-semibold">{investmentSummary.fundDetails.category}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                <span className="text-gray-400">Current NAV</span>
                <span className="text-white font-semibold">₹{investmentSummary.fundDetails.nav}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                <span className="text-gray-400">Risk Level</span>
                <span className={`font-semibold ${
                  investmentSummary.fundDetails.riskLevel === 'Low' ? 'text-green-400' :
                  investmentSummary.fundDetails.riskLevel === 'Moderate' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {investmentSummary.fundDetails.riskLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Investment Details */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Investment Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                <span className="text-gray-400">Investment Type</span>
                <span className="text-white font-semibold capitalize">
                  {investmentSummary.investmentType === 'sip' ? 'SIP' : 'Lumpsum'}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                <span className="text-gray-400">
                  {investmentSummary.investmentType === 'sip' ? 'Monthly Amount' : 'Investment Amount'}
                </span>
                <span className="text-white font-semibold text-lg">
                  {formatCurrency(investmentSummary.amount)}
                </span>
              </div>
              {investmentSummary.investmentType === 'sip' && (
                <>
                  <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white font-semibold">{investmentSummary.duration} Years</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                    <span className="text-gray-400">SIP Date</span>
                    <span className="text-white font-semibold">
                      {investmentSummary.sipDate}{investmentSummary.sipDate === 1 ? 'st' : investmentSummary.sipDate === 2 ? 'nd' : investmentSummary.sipDate === 3 ? 'rd' : 'th'} of every month
                    </span>
                  </div>
                </>
              )}
              <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                <span className="text-gray-400">Payment Method</span>
                <span className="text-white font-semibold">{investmentSummary.paymentMethod.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expected Returns */}
        <div className="mt-8 p-6 bg-green-500/10 border border-green-500/20 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
            Expected Returns Projection
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">
                {formatCurrency(investmentSummary.expectedReturns.maturityAmount)}
              </div>
              <div className="text-gray-400 text-sm">Maturity Amount</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">
                {investmentSummary.investmentType === 'sip' 
                  ? formatCurrency((investmentSummary.expectedReturns as any).totalInvestment)
                  : formatCurrency(investmentSummary.amount)
                }
              </div>
              <div className="text-gray-400 text-sm">Total Investment</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">
                {formatCurrency(investmentSummary.expectedReturns.wealthGain)}
              </div>
              <div className="text-gray-400 text-sm">Wealth Gain</div>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-400 text-sm">
            *Assuming 12% annual returns. Actual returns may vary based on market conditions.
          </div>
        </div>
      </div>

      {/* Goal Linking */}
      {investmentSummary.goal && (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-800/50">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">{investmentSummary.goal.icon}</span>
            <div>
              <h3 className="text-lg font-bold text-white">Linked to Goal: {investmentSummary.goal.name}</h3>
              <p className="text-gray-400">Target: {formatCurrency(investmentSummary.goal.targetAmount)} in {investmentSummary.goal.timeHorizon} years</p>
            </div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Progress towards goal:</span>
              <span className="text-blue-400 font-bold">
                {((investmentSummary.expectedReturns.maturityAmount / investmentSummary.goal.targetAmount) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tax Benefits */}
      {taxBenefits[0].potentialSaving > 0 && (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-800/50">
          <div className="flex items-center mb-4">
            <Award className="w-6 h-6 text-yellow-400 mr-3" />
            <h3 className="text-lg font-bold text-white">Tax Benefits</h3>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-400 text-sm">Potential Tax Saving (Section 80C)</span>
                <div className="text-yellow-400 font-bold text-xl">
                  {formatCurrency(taxBenefits[0].potentialSaving)}
                </div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Remaining 80C Limit</span>
                <div className="text-white font-bold text-xl">
                  {formatCurrency(taxBenefits[0].maxDeduction - taxBenefits[0].currentUtilization)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Preferences */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-800/50">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="mr-3 w-5 h-5 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-white">Email notifications for transactions and NAV updates</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={(e) => setSmsNotifications(e.target.checked)}
              className="mr-3 w-5 h-5 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-white">SMS alerts for SIP debits and important updates</span>
          </label>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-800/50">
        <div className="flex items-start">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mr-4 mt-1 w-5 h-5 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
          />
          <div className="flex-1">
            <p className="text-white mb-4">
              I agree to the <span className="text-blue-400 underline cursor-pointer">Terms & Conditions</span> and 
              <span className="text-blue-400 underline cursor-pointer ml-1">Privacy Policy</span>. 
              I understand that mutual fund investments are subject to market risks.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-amber-200 text-sm">
                  <p className="font-semibold mb-2">Important Disclaimers:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Mutual Fund investments are subject to market risks, read all scheme related documents carefully</li>
                    <li>• Past performance is not indicative of future returns</li>
                    <li>• Please consider your specific investment requirements before choosing a fund</li>
                    <li>• SIP does not assure a profit or guarantee protection against loss in a declining market</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={onBack}
          disabled={isProcessing}
          className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 disabled:cursor-not-allowed"
        >
          Back to Payment
        </button>
        <button
          onClick={onConfirm}
          disabled={!agreedToTerms || isProcessing}
          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              Confirm Investment
              <Zap className="w-5 h-5 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
