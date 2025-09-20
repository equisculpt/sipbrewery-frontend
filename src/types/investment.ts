// Investment/SIP Setup Types

export interface FundDetails {
  id: string;
  name: string;
  category: string;
  nav: number;
  aum: string;
  expenseRatio: number;
  rating: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  fundManager: string;
  benchmark: string;
  minSipAmount: number;
  minLumpsumAmount: number;
}

export interface InvestmentGoal {
  id: string;
  name: string;
  targetAmount: number;
  timeHorizon: number; // in years
  priority: 'High' | 'Medium' | 'Low';
  category: 'Retirement' | 'Education' | 'House' | 'Emergency' | 'Wealth Creation' | 'Other';
  icon: string;
}

export interface SipCalculation {
  monthlyAmount: number;
  duration: number; // in years
  expectedReturn: number;
  totalInvestment: number;
  maturityAmount: number;
  wealthGain: number;
}

export interface LumpsumCalculation {
  amount: number;
  duration: number;
  expectedReturn: number;
  maturityAmount: number;
  wealthGain: number;
}

export interface PaymentMethod {
  id: string;
  type: 'bank_account' | 'upi' | 'netbanking' | 'debit_card';
  name: string;
  details: string;
  isDefault: boolean;
  icon: string;
}

export interface AutoDebitSetup {
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  bankName: string;
  sipDate: number; // 1-28
  mandateAmount: number;
}

export interface InvestmentSummary {
  fundDetails: FundDetails;
  investmentType: 'sip' | 'lumpsum';
  amount: number;
  frequency?: 'monthly' | 'quarterly' | 'yearly';
  duration?: number;
  sipDate?: number;
  goal?: InvestmentGoal;
  expectedReturns: SipCalculation | LumpsumCalculation;
  paymentMethod: PaymentMethod;
  autoDebit?: AutoDebitSetup;
}

export interface RiskProfile {
  score: number;
  category: 'Conservative' | 'Moderate' | 'Aggressive';
  description: string;
  recommendations: string[];
}

export interface TaxBenefit {
  section: string;
  maxDeduction: number;
  currentUtilization: number;
  potentialSaving: number;
}

export interface PortfolioImpact {
  currentValue: number;
  newAllocation: {
    equity: number;
    debt: number;
    hybrid: number;
    international: number;
  };
  diversificationScore: number;
  riskScore: number;
  expectedReturn: number;
}
