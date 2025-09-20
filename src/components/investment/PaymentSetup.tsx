import React, { useState } from 'react';
import { 
  CreditCard, Building2, Smartphone, Globe, 
  Shield, CheckCircle, AlertCircle, Lock,
  Calendar, Clock, Award, Star
} from 'lucide-react';
import { PaymentMethod, AutoDebitSetup } from '../../types/investment';

interface PaymentSetupProps {
  onPaymentMethodSelect: (method: PaymentMethod) => void;
  onAutoDebitSetup: (setup: AutoDebitSetup) => void;
  selectedMethod: PaymentMethod | null;
  investmentType: 'sip' | 'lumpsum';
  amount: number;
  sipDate?: number;
}

export default function PaymentSetup({ 
  onPaymentMethodSelect, 
  onAutoDebitSetup, 
  selectedMethod,
  investmentType,
  amount,
  sipDate 
}: PaymentSetupProps) {
  const [autoDebitForm, setAutoDebitForm] = useState<AutoDebitSetup>({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    bankName: '',
    sipDate: sipDate || 5,
    mandateAmount: amount * 12 // Annual mandate
  });

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'netbanking',
      type: 'netbanking',
      name: 'Net Banking',
      details: 'Pay securely through your bank',
      isDefault: true,
      icon: '🏦'
    },
    {
      id: 'upi',
      type: 'upi',
      name: 'UPI Payment',
      details: 'Quick payment via UPI',
      isDefault: false,
      icon: '📱'
    },
    {
      id: 'debit_card',
      type: 'debit_card',
      name: 'Debit Card',
      details: 'Pay with your debit card',
      isDefault: false,
      icon: '💳'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Payment Method Selection */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800/50">
        <div className="flex items-center mb-6">
          <CreditCard className="w-6 h-6 text-blue-400 mr-3" />
          <h3 className="text-xl font-bold text-white">Select Payment Method</h3>
        </div>

        <div className="grid gap-4">
          {paymentMethods.map(method => (
            <button
              key={method.id}
              onClick={() => onPaymentMethodSelect(method)}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                selectedMethod?.id === method.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-3xl mr-4">{method.icon}</span>
                  <div>
                    <div className="font-bold text-white text-lg">{method.name}</div>
                    <div className="text-gray-400">{method.details}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {method.isDefault && (
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                      Recommended
                    </span>
                  )}
                  {selectedMethod?.id === method.id && (
                    <CheckCircle className="w-6 h-6 text-blue-400" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Security Features */}
        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
          <div className="flex items-center mb-3">
            <Shield className="w-5 h-5 text-green-400 mr-2" />
            <span className="text-green-400 font-semibold">Secure Payment</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="flex items-center">
              <Lock className="w-4 h-4 mr-2 text-green-400" />
              256-bit SSL Encryption
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2 text-green-400" />
              PCI DSS Compliant
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              RBI Approved Gateway
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-green-400" />
              99.9% Success Rate
            </div>
          </div>
        </div>
      </div>

      {/* Auto-Debit Setup for SIP */}
      {investmentType === 'sip' && (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800/50">
          <div className="flex items-center mb-6">
            <Calendar className="w-6 h-6 text-purple-400 mr-3" />
            <h3 className="text-xl font-bold text-white">Auto-Debit Setup</h3>
            <span className="ml-3 bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-semibold">
              Required for SIP
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-semibold mb-2">Account Holder Name</label>
              <input
                type="text"
                value={autoDebitForm.accountHolderName}
                onChange={(e) => setAutoDebitForm({...autoDebitForm, accountHolderName: e.target.value})}
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                placeholder="Enter account holder name"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Bank Name</label>
              <select
                value={autoDebitForm.bankName}
                onChange={(e) => setAutoDebitForm({...autoDebitForm, bankName: e.target.value})}
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select Bank</option>
                <option value="SBI">State Bank of India</option>
                <option value="HDFC">HDFC Bank</option>
                <option value="ICICI">ICICI Bank</option>
                <option value="AXIS">Axis Bank</option>
                <option value="KOTAK">Kotak Mahindra Bank</option>
                <option value="PNB">Punjab National Bank</option>
                <option value="BOB">Bank of Baroda</option>
                <option value="CANARA">Canara Bank</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Account Number</label>
              <input
                type="text"
                value={autoDebitForm.accountNumber}
                onChange={(e) => setAutoDebitForm({...autoDebitForm, accountNumber: e.target.value})}
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                placeholder="Enter account number"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">IFSC Code</label>
              <input
                type="text"
                value={autoDebitForm.ifscCode}
                onChange={(e) => setAutoDebitForm({...autoDebitForm, ifscCode: e.target.value.toUpperCase()})}
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                placeholder="Enter IFSC code"
              />
            </div>
          </div>

          {/* Mandate Information */}
          <div className="mt-6 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
            <h4 className="text-white font-bold mb-4">Auto-Debit Mandate Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Monthly Debit Amount:</span>
                <div className="text-white font-bold text-lg">₹{amount.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-gray-400">Debit Date:</span>
                <div className="text-white font-bold text-lg">
                  {autoDebitForm.sipDate}{autoDebitForm.sipDate === 1 ? 'st' : autoDebitForm.sipDate === 2 ? 'nd' : autoDebitForm.sipDate === 3 ? 'rd' : 'th'} of every month
                </div>
              </div>
              <div>
                <span className="text-gray-400">Annual Mandate Limit:</span>
                <div className="text-white font-bold text-lg">₹{autoDebitForm.mandateAmount.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-gray-400">Mandate Validity:</span>
                <div className="text-white font-bold text-lg">Until Cancelled</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onAutoDebitSetup(autoDebitForm)}
            disabled={!autoDebitForm.accountNumber || !autoDebitForm.ifscCode || !autoDebitForm.accountHolderName || !autoDebitForm.bankName}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 disabled:cursor-not-allowed"
          >
            Setup Auto-Debit Mandate
          </button>
        </div>
      )}

      {/* Important Notes */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
        <div className="flex items-start">
          <AlertCircle className="w-6 h-6 text-amber-400 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-amber-400 font-bold mb-2">Important Information</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Mutual fund investments are subject to market risks</li>
              <li>• Please read all scheme related documents carefully</li>
              <li>• Past performance is not indicative of future returns</li>
              {investmentType === 'sip' && (
                <>
                  <li>• Auto-debit mandate will be registered with your bank</li>
                  <li>• Ensure sufficient balance on SIP debit date</li>
                  <li>• You can modify or cancel SIP anytime</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
