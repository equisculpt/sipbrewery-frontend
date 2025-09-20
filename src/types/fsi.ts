// Types for FSI Analysis Page

export interface FundBasicInfo {
  id: string;
  name: string;
  category: string;
  aum: string;
  nav: number;
  expenseRatio: number;
  fundManager: string;
  launchDate: string;
}

export interface FSIAnalysis {
  overallScore: number;
  grade: string;
  recommendation: string;
  expectedReturns: string;
  holdingPeriod: string;
  confidence: string;
  keyStrengths: string[];
  areasOfConcern: string[];
  aiRecommendations: string[];
}

export interface MarketMetric {
  value: string;
  percentage: number;
  trend: string;
  confidence: string;
}

export interface MarketSentiment {
  overallMarket: MarketMetric;
  sectorPerformance: MarketMetric;
  fundCategory: MarketMetric;
  volatilityIndex: MarketMetric;
  timingScore: MarketMetric;
}

export interface Holding {
  id: string;
  name: string;
  allocation: number;
  currentPrice: number;
  prediction: number;
  confidence: string;
  peRatio: number;
  marketCap: string;
  sector: string;
  asiRating: string;
  futureOutlook: string;
  strengths: string[];
  weaknesses: string[];
}

export interface SectorAllocation {
  name: string;
  allocation: number;
  performance: string;
  outlook: string;
  prediction: string;
  analysis: string;
  keyFactors: string[];
  risks: string[];
}

export interface PerformanceData {
  returns: {
    '1M': number;
    '3M': number;
    '6M': number;
    '1Y': number;
    '3Y': number;
    '5Y': number;
  };
  benchmark: {
    '1M': number;
    '3M': number;
    '6M': number;
    '1Y': number;
    '3Y': number;
    '5Y': number;
  };
  navHistory: Array<{
    date: string;
    nav: number;
  }>;
}

export interface RiskMetrics {
  volatility: number;
  sharpeRatio: number;
  beta: number;
  maxDrawdown: number;
  var95: number;
  informationRatio: number;
  treynorRatio: number;
  alpha: number;
}

export interface StockAnalysis {
  id: string;
  name: string;
  currentPrice: number;
  targetPrice: number;
  asiRating: string;
  portfolioWeight: number;
  technicalIndicators: {
    rsi: number;
    macd: string;
    movingAverages: string;
  };
  fundamentalMetrics: {
    peRatio: number;
    roe: number;
    debtEquity: number;
  };
  aiPrediction: {
    marketSentiment: string;
    sectorAnalysis: string;
    riskFactors: string[];
  };
  recommendation: string;
  keyStrengths: string[];
  actionPlan: string[];
}
