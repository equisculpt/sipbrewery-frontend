'use client';

import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, BarChart3, PieChart, Activity, Award, Shield, Users, Calendar, DollarSign, Target, Zap, Brain, Eye, AlertTriangle, CheckCircle, Star, ArrowRight, Download, Share2, Search, Filter } from 'lucide-react';
import PayTMStyleNavigation from '../../../components/PayTMStyleNavigation';
import { useRouter, useParams } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const FSIAnalysisPage = () => {
  const router = useRouter();
  const params = useParams();
  const fundId = params.fundId as string;
  
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock comprehensive fund data with FSI analysis
  const fundData = {
    id: fundId,
    name: "HDFC Top 100 Fund",
    fullName: "HDFC Top 100 Fund - Direct Growth",
    category: "Large Cap Equity",
    nav: 847.32,
    navChange: 2.45,
    navChangePercent: 0.29,
    aum: 45678,
    expenseRatio: 0.45,
    rating: 4.5,
    benchmark: "NIFTY 100 TRI",
    fundManager: "Rahul Baijal",
    launchDate: "Jan 2010",
    riskLevel: "Moderate",
    fsiScore: 8.7,
    fsiGrade: "A+",
    recommendation: "STRONG BUY",
    confidence: 92,
    expectedReturns: "15-18%",
    holdingPeriod: "3-5 years"
  };

  // Performance data for different time periods
  const performanceDataSets = {
    '1M': [
      { period: 'Week 1', fund: 2.1, benchmark: 1.8, category: 1.9 },
      { period: 'Week 2', fund: 3.2, benchmark: 2.5, category: 2.8 },
      { period: 'Week 3', fund: 1.8, benchmark: 2.1, category: 2.0 },
      { period: 'Week 4', fund: 2.9, benchmark: 2.3, category: 2.4 }
    ],
    '3M': [
      { period: 'Month 1', fund: 8.2, benchmark: 7.1, category: 7.5 },
      { period: 'Month 2', fund: 12.5, benchmark: 10.2, category: 11.1 },
      { period: 'Month 3', fund: 15.8, benchmark: 12.8, category: 13.9 }
    ],
    '6M': [
      { period: 'Jan', fund: 12.5, benchmark: 10.2, category: 11.1 },
      { period: 'Feb', fund: 15.8, benchmark: 12.1, category: 13.5 },
      { period: 'Mar', fund: 18.2, benchmark: 14.5, category: 16.1 },
      { period: 'Apr', fund: 16.9, benchmark: 13.8, category: 15.2 },
      { period: 'May', fund: 19.4, benchmark: 15.2, category: 17.1 },
      { period: 'Jun', fund: 22.1, benchmark: 17.6, category: 19.8 }
    ],
    '1Y': [
      { period: 'Q1', fund: 15.8, benchmark: 12.1, category: 13.5 },
      { period: 'Q2', fund: 22.1, benchmark: 17.6, category: 19.8 },
      { period: 'Q3', fund: 18.9, benchmark: 15.4, category: 17.2 },
      { period: 'Q4', fund: 25.3, benchmark: 20.1, category: 22.4 }
    ],
    '3Y': [
      { period: 'Year 1', fund: 25.3, benchmark: 20.1, category: 22.4 },
      { period: 'Year 2', fund: 18.7, benchmark: 15.9, category: 17.3 },
      { period: 'Year 3', fund: 22.9, benchmark: 18.5, category: 20.1 }
    ],
    '5Y': [
      { period: '2020', fund: 18.2, benchmark: 14.9, category: 16.5 },
      { period: '2021', fund: 25.3, benchmark: 20.1, category: 22.4 },
      { period: '2022', fund: -8.5, benchmark: -12.1, category: -10.3 },
      { period: '2023', fund: 18.7, benchmark: 15.9, category: 17.3 },
      { period: '2024', fund: 22.9, benchmark: 18.5, category: 20.1 }
    ]
  };

  const [selectedTimePeriod, setSelectedTimePeriod] = useState('6M');
  const performanceData = performanceDataSets[selectedTimePeriod];

  // Performance comparison table data
  const performanceComparison = {
    '1M': { fund: 2.9, benchmark: 2.3, category: 2.4, rank: 12, totalFunds: 45 },
    '3M': { fund: 15.8, benchmark: 12.8, category: 13.9, rank: 8, totalFunds: 45 },
    '6M': { fund: 22.1, benchmark: 17.6, category: 19.8, rank: 5, totalFunds: 45 },
    '1Y': { fund: 25.3, benchmark: 20.1, category: 22.4, rank: 3, totalFunds: 45 },
    '3Y': { fund: 22.3, benchmark: 18.2, category: 19.9, rank: 4, totalFunds: 45 },
    '5Y': { fund: 15.3, benchmark: 11.3, category: 12.8, rank: 6, totalFunds: 45 }
  };

  const sectorData = [
    { name: 'Financial Services', value: 25.4, color: '#3B82F6' },
    { name: 'Information Technology', value: 18.7, color: '#8B5CF6' },
    { name: 'Energy', value: 12.3, color: '#10B981' },
    { name: 'Healthcare', value: 10.8, color: '#F59E0B' },
    { name: 'Consumer Goods', value: 8.9, color: '#EF4444' },
    { name: 'Others', value: 23.9, color: '#6B7280' }
  ];

  // Expanded portfolio holdings with full stock details
  const portfolioHoldings = [
    { id: 'RELIANCE', name: 'Reliance Industries Ltd', symbol: 'RELIANCE', allocation: 8.5, price: 2456.75, change: 2.3, sector: 'Energy', marketCap: '16.6L Cr', pe: 24.5, asiScore: 8.9, asiGrade: 'A+', recommendation: 'STRONG BUY' },
    { id: 'HDFCBANK', name: 'HDFC Bank Ltd', symbol: 'HDFCBANK', allocation: 7.2, price: 1654.30, change: 1.8, sector: 'Financial Services', marketCap: '12.5L Cr', pe: 18.2, asiScore: 8.7, asiGrade: 'A+', recommendation: 'BUY' },
    { id: 'INFY', name: 'Infosys Ltd', symbol: 'INFY', allocation: 6.8, price: 1789.45, change: -0.5, sector: 'Information Technology', marketCap: '7.4L Cr', pe: 28.7, asiScore: 7.8, asiGrade: 'A', recommendation: 'HOLD' },
    { id: 'ICICIBANK', name: 'ICICI Bank Ltd', symbol: 'ICICIBANK', allocation: 5.9, price: 987.60, change: 3.2, sector: 'Financial Services', marketCap: '6.9L Cr', pe: 16.4, asiScore: 8.2, asiGrade: 'A', recommendation: 'BUY' },
    { id: 'TCS', name: 'Tata Consultancy Services', symbol: 'TCS', allocation: 5.4, price: 3842.15, change: 1.1, sector: 'Information Technology', marketCap: '14.2L Cr', pe: 26.8, asiScore: 8.1, asiGrade: 'A', recommendation: 'BUY' },
    { id: 'KOTAKBANK', name: 'Kotak Mahindra Bank', symbol: 'KOTAKBANK', allocation: 4.8, price: 1756.90, change: 0.9, sector: 'Financial Services', marketCap: '3.5L Cr', pe: 20.1, asiScore: 7.9, asiGrade: 'A', recommendation: 'BUY' },
    { id: 'BHARTIARTL', name: 'Bharti Airtel Ltd', symbol: 'BHARTIARTL', allocation: 4.2, price: 1234.50, change: -1.2, sector: 'Telecom', marketCap: '7.1L Cr', pe: 22.3, asiScore: 7.5, asiGrade: 'B+', recommendation: 'HOLD' },
    { id: 'ITC', name: 'ITC Ltd', symbol: 'ITC', allocation: 3.9, price: 456.80, change: 0.7, sector: 'FMCG', marketCap: '5.7L Cr', pe: 28.9, asiScore: 7.2, asiGrade: 'B+', recommendation: 'HOLD' },
    { id: 'SBIN', name: 'State Bank of India', symbol: 'SBIN', allocation: 3.7, price: 789.25, change: 2.8, sector: 'Financial Services', marketCap: '7.0L Cr', pe: 12.4, asiScore: 7.6, asiGrade: 'B+', recommendation: 'BUY' },
    { id: 'HCLTECH', name: 'HCL Technologies Ltd', symbol: 'HCLTECH', allocation: 3.5, price: 1567.40, change: -0.8, sector: 'Information Technology', marketCap: '4.2L Cr', pe: 24.6, asiScore: 7.4, asiGrade: 'B+', recommendation: 'HOLD' },
    { id: 'LT', name: 'Larsen & Toubro Ltd', symbol: 'LT', allocation: 3.2, price: 3456.20, change: 1.5, sector: 'Infrastructure', marketCap: '4.8L Cr', pe: 31.2, asiScore: 7.7, asiGrade: 'B+', recommendation: 'BUY' },
    { id: 'AXISBANK', name: 'Axis Bank Ltd', symbol: 'AXISBANK', allocation: 3.0, price: 1098.75, change: 0.4, sector: 'Financial Services', marketCap: '3.4L Cr', pe: 14.8, asiScore: 7.3, asiGrade: 'B+', recommendation: 'HOLD' },
    { id: 'MARUTI', name: 'Maruti Suzuki India Ltd', symbol: 'MARUTI', allocation: 2.8, price: 11234.60, change: -0.3, sector: 'Automobile', marketCap: '3.4L Cr', pe: 26.7, asiScore: 7.1, asiGrade: 'B', recommendation: 'HOLD' },
    { id: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries', symbol: 'SUNPHARMA', allocation: 2.6, price: 1678.90, change: 1.9, sector: 'Pharmaceuticals', marketCap: '4.0L Cr', pe: 32.1, asiScore: 7.0, asiGrade: 'B', recommendation: 'HOLD' },
    { id: 'TITAN', name: 'Titan Company Ltd', symbol: 'TITAN', allocation: 2.4, price: 3210.45, change: 2.1, sector: 'Consumer Durables', marketCap: '2.8L Cr', pe: 45.6, asiScore: 6.9, asiGrade: 'B', recommendation: 'HOLD' }
  ];

  // ASI Analysis function
  const handleASIAnalysis = async (stockId: string, stockName: string) => {
    // This would typically make an API call to get detailed ASI analysis
    console.log(`Fetching ASI Analysis for ${stockName} (${stockId})`);
    // For now, we'll show an alert - in production this would open a modal or navigate to detailed analysis
    alert(`ASI Analysis for ${stockName}\n\nThis would show:\n• AI-powered price predictions\n• Technical analysis\n• Fundamental analysis\n• Risk assessment\n• Investment recommendations\n• Market sentiment analysis`);
  };

  // Comprehensive AI Analysis Data
  const comprehensiveAnalysis = {
    strengths: [
      {
        title: 'Outstanding Long-term Performance',
        description: 'This fund has consistently beaten its benchmark (NIFTY 100) by an average of 2.3% annually over the past 5 years. This means if the market gave 12% returns, this fund delivered 14.3%.',
        impact: 'High',
        evidence: ['5-year alpha: +2.3%', 'Beat benchmark in 4 out of 5 years', 'Consistent top-quartile performance'],
        whyItMatters: 'Superior performance means your money grows faster than average market returns, leading to significantly higher wealth creation over time.',
        confidence: 95
      },
      {
        title: 'Expert Fund Management',
        description: 'Managed by Rahul Baijal, who has 15+ years of experience and a proven track record. The fund management team uses advanced research and stock selection techniques.',
        impact: 'High',
        evidence: ['Fund manager tenure: 8 years', 'Team research coverage: 200+ stocks', 'Disciplined investment process'],
        whyItMatters: 'Experienced management reduces investment risks and increases chances of making profitable investment decisions.',
        confidence: 92
      },
      {
        title: 'Low Cost Structure',
        description: 'With an expense ratio of just 0.45%, this fund charges much less than the category average of 1.2%. Lower fees mean more money stays invested for you.',
        impact: 'Medium',
        evidence: ['Expense ratio: 0.45% vs category avg 1.2%', 'Direct plan benefits', 'No hidden charges'],
        whyItMatters: 'Over 20 years, this low fee structure can save you ₹2-3 lakhs on every ₹10 lakh invested compared to high-fee funds.',
        confidence: 98
      },
      {
        title: 'Quality Stock Selection',
        description: 'The fund invests in high-quality companies with strong fundamentals, stable earnings, and good growth prospects. 80% of holdings are in companies with consistent profit growth.',
        impact: 'High',
        evidence: ['Average ROE of holdings: 18%', 'Debt-to-equity ratio: Low', '85% large-cap stable companies'],
        whyItMatters: 'Quality companies are more likely to survive market downturns and provide steady long-term growth.',
        confidence: 89
      }
    ],
    weaknesses: [
      {
        title: 'High Concentration Risk',
        description: 'Top 10 holdings make up 65% of the portfolio. If these few companies perform poorly, it significantly impacts your returns.',
        impact: 'Medium',
        evidence: ['Top 10 concentration: 65%', 'Single stock max: 8.5%', 'Sector concentration in Financial Services'],
        whyItMatters: 'High concentration means higher risk - if key holdings fall, your entire investment suffers more than a diversified fund.',
        confidence: 87,
        mitigation: 'The fund manager actively monitors concentration and has risk management protocols in place.'
      },
      {
        title: 'Market Volatility Exposure',
        description: 'With a beta of 0.95, this fund moves almost as much as the overall market. During market crashes, you can expect similar losses.',
        impact: 'Medium',
        evidence: ['Beta: 0.95', 'Standard deviation: 16.8%', 'Max drawdown: -23.4%'],
        whyItMatters: 'In bear markets (like 2020 or 2008), you might see 20-25% temporary losses in your investment value.',
        confidence: 91,
        mitigation: 'Long-term investors (5+ years) typically recover from such downturns with positive returns.'
      },
      {
        title: 'Limited Small-Cap Exposure',
        description: 'The fund focuses mainly on large-cap stocks and has minimal exposure to high-growth small and mid-cap companies.',
        impact: 'Low',
        evidence: ['Large-cap allocation: 85%', 'Mid-cap: 12%', 'Small-cap: 3%'],
        whyItMatters: 'You might miss out on explosive growth opportunities that smaller companies can provide during bull markets.',
        confidence: 78,
        mitigation: 'Large-cap focus provides stability and is suitable for conservative investors.'
      }
    ],
    predictions: [
      {
        timeframe: '1 Year',
        expectedReturn: '12-15%',
        confidence: 78,
        scenario: 'Base Case',
        reasoning: 'Based on current market conditions, earnings growth expectations, and fund\'s historical performance pattern.',
        risks: ['Market correction', 'Interest rate changes', 'Global economic slowdown']
      },
      {
        timeframe: '3 Years',
        expectedReturn: '14-17%',
        confidence: 85,
        scenario: 'Base Case',
        reasoning: 'Long-term earnings growth of portfolio companies, India\'s economic growth trajectory, and fund manager\'s consistent performance.',
        risks: ['Prolonged bear market', 'Regulatory changes', 'Fund manager change']
      },
      {
        timeframe: '5 Years',
        expectedReturn: '15-18%',
        confidence: 82,
        scenario: 'Base Case',
        reasoning: 'India\'s long-term growth story, demographic dividend, and the fund\'s focus on quality companies with sustainable business models.',
        risks: ['Economic recession', 'Structural market changes', 'Technology disruption']
      }
    ],
    marketSentiment: {
      overall: 'Bullish',
      reasoning: 'Strong corporate earnings growth, stable government policies, and increasing retail investor participation are driving positive sentiment.',
      supportingFactors: [
        'GDP growth forecast: 6.5-7%',
        'Corporate earnings growth: 15-20%',
        'FII/DII net buying trend',
        'Low interest rate environment'
      ],
      risks: [
        'Global inflation concerns',
        'Geopolitical tensions',
        'Currency fluctuation',
        'Oil price volatility'
      ]
    },
    recommendations: {
      idealFor: [
        'First-time mutual fund investors seeking stable growth',
        'Investors with 5+ year investment horizon',
        'Those wanting exposure to India\'s top companies',
        'Conservative investors who want equity exposure with lower risk'
      ],
      notIdealFor: [
        'Investors seeking quick returns (less than 2 years)',
        'Those wanting high-risk, high-reward investments',
        'Investors already heavily invested in large-cap funds',
        'Those needing regular income (dividends)'
      ],
      investmentStrategy: {
        sip: {
          recommended: true,
          amount: '₹5,000 - ₹25,000 per month',
          reasoning: 'SIP helps average out market volatility and is perfect for this fund\'s long-term growth potential.'
        },
        lumpsum: {
          recommended: 'Conditional',
          condition: 'Only during market corrections (when markets fall 10-15%)',
          reasoning: 'Large investments are better made when markets are down to maximize long-term returns.'
        }
      }
    }
  };

  const tabs = [
    { key: 'overview', label: 'Overview', icon: Eye },
    { key: 'performance', label: 'Performance', icon: TrendingUp },
    { key: 'portfolio', label: 'Portfolio', icon: PieChart },
    { key: 'risk', label: 'Risk Analysis', icon: Shield },
    { key: 'ai-insights', label: 'FSI AI Insights', icon: Brain }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strength': return CheckCircle;
      case 'opportunity': return Star;
      case 'risk': return AlertTriangle;
      case 'recommendation': return Target;
      default: return Brain;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'strength': return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'opportunity': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      case 'risk': return 'from-red-500/20 to-pink-500/20 border-red-500/30';
      case 'recommendation': return 'from-purple-500/20 to-indigo-500/20 border-purple-500/30';
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-900">
      <PayTMStyleNavigation />
      
      <div className="pt-40 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Funds</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="p-3 rounded-xl border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white transition-all duration-300">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-xl border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white transition-all duration-300">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Fund Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {fundData.name}
            </h1>
            <p className="text-xl text-gray-300 mb-4">{fundData.fullName}</p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <span>{fundData.category}</span>
              <span>•</span>
              <span>Fund Manager: {fundData.fundManager}</span>
              <span>•</span>
              <span>Since {fundData.launchDate}</span>
            </div>
          </div>

          {/* FSI Score - Completely No Container */}
          <div className="text-center mb-12 space-y-8">
            <div>
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {fundData.fsiScore}
              </div>
              <div className="text-lg font-bold text-white">FSI Score</div>
              <div className="text-green-400 font-bold">Grade: {fundData.fsiGrade}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">₹{fundData.nav.toFixed(2)}</div>
                <div className="text-gray-400">Current NAV</div>
                <div className={`font-semibold ${fundData.navChangePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {fundData.navChangePercent >= 0 ? '+' : ''}{fundData.navChangePercent}% today
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{fundData.expectedReturns}</div>
                <div className="text-gray-400">Expected Returns</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 font-bold text-2xl">{fundData.recommendation}</div>
                <div className="text-gray-400">Recommendation</div>
                <div className="text-sm text-gray-500">Confidence: {fundData.confidence}%</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs - No Containers */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all duration-300 ${
                    activeTab === tab.key
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <div className="space-y-12">
                {/* Key Metrics - No Containers */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center flex flex-col items-center">
                    <Award className="w-12 h-12 text-blue-400 mb-4" />
                    <div className="text-3xl font-bold text-blue-400 mb-2">{fundData.rating}/5</div>
                    <h3 className="text-lg font-semibold text-white mb-1">Fund Rating</h3>
                    <p className="text-gray-400 text-sm">Morningstar Rating</p>
                  </div>
                  
                  <div className="text-center flex flex-col items-center">
                    <DollarSign className="w-12 h-12 text-green-400 mb-4" />
                    <div className="text-3xl font-bold text-green-400 mb-2">{fundData.expenseRatio}%</div>
                    <h3 className="text-lg font-semibold text-white mb-1">Expense Ratio</h3>
                    <p className="text-gray-400 text-sm">Annual Fee</p>
                  </div>
                  
                  <div className="text-center flex flex-col items-center">
                    <Users className="w-12 h-12 text-purple-400 mb-4" />
                    <div className="text-3xl font-bold text-purple-400 mb-2">₹{(fundData.aum/1000).toFixed(0)}K Cr</div>
                    <h3 className="text-lg font-semibold text-white mb-1">AUM</h3>
                    <p className="text-gray-400 text-sm">Assets Under Management</p>
                  </div>
                  
                  <div className="text-center flex flex-col items-center">
                    <Shield className="w-12 h-12 text-orange-400 mb-4" />
                    <div className="text-3xl font-bold text-orange-400 mb-2">{fundData.riskLevel}</div>
                    <h3 className="text-lg font-semibold text-white mb-1">Risk Level</h3>
                    <p className="text-gray-400 text-sm">Investment Risk</p>
                  </div>
                </div>

                {/* AI Insights - No Containers */}
                <div>
                  <div className="text-center mb-8">
                    <Brain className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-white mb-2">AI-Powered Insights</h3>
                    <p className="text-gray-300 text-lg">Advanced analysis powered by FSI Engine</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {comprehensiveAnalysis.strengths.slice(0, 4).map((strength, index) => (
                      <div key={index} className="text-center flex flex-col items-center">
                        <CheckCircle className="w-12 h-12 text-green-400 mb-4" />
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <h4 className="text-xl font-bold text-white">{strength.title}</h4>
                          <span className="text-sm font-semibold text-gray-300">({strength.confidence}%)</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{strength.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="space-y-8">
                {/* Time Period Selection */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-6">Performance Analysis</h3>
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {Object.keys(performanceDataSets).map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedTimePeriod(period)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          selectedTimePeriod === period
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="period" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '12px',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Line type="monotone" dataKey="fund" stroke="#3B82F6" strokeWidth={3} name="This Fund" />
                      <Line type="monotone" dataKey="benchmark" stroke="#6B7280" strokeWidth={2} name="Benchmark" />
                      <Line type="monotone" dataKey="category" stroke="#F59E0B" strokeWidth={2} name="Category Average" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Performance Comparison Table */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-4">Returns Comparison (%)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="text-left py-3 px-4 text-gray-300 font-semibold">Period</th>
                          <th className="text-right py-3 px-4 text-blue-400 font-semibold">This Fund</th>
                          <th className="text-right py-3 px-4 text-gray-400 font-semibold">Benchmark</th>
                          <th className="text-right py-3 px-4 text-yellow-400 font-semibold">Category Avg</th>
                          <th className="text-right py-3 px-4 text-purple-400 font-semibold">Rank</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(performanceComparison).map(([period, data]) => (
                          <tr key={period} className="border-b border-gray-700 hover:bg-gray-800/50">
                            <td className="py-3 px-4 text-white font-medium">{period}</td>
                            <td className={`py-3 px-4 text-right font-bold ${
                              data.fund > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {data.fund > 0 ? '+' : ''}{data.fund.toFixed(1)}%
                            </td>
                            <td className={`py-3 px-4 text-right ${
                              data.benchmark > 0 ? 'text-green-300' : 'text-red-300'
                            }`}>
                              {data.benchmark > 0 ? '+' : ''}{data.benchmark.toFixed(1)}%
                            </td>
                            <td className={`py-3 px-4 text-right ${
                              data.category > 0 ? 'text-yellow-300' : 'text-red-300'
                            }`}>
                              {data.category > 0 ? '+' : ''}{data.category.toFixed(1)}%
                            </td>
                            <td className="py-3 px-4 text-right text-purple-300">
                              {data.rank}/{data.totalFunds}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center flex flex-col items-center">
                    <TrendingUp className="w-12 h-12 text-green-400 mb-4" />
                    <div className="text-2xl font-bold text-green-400 mb-2">+3.2%</div>
                    <h4 className="text-lg font-semibold text-white mb-1">Alpha</h4>
                    <p className="text-gray-400 text-sm">vs Benchmark</p>
                  </div>
                  
                  <div className="text-center flex flex-col items-center">
                    <Target className="w-12 h-12 text-blue-400 mb-4" />
                    <div className="text-2xl font-bold text-blue-400 mb-2">1.24</div>
                    <h4 className="text-lg font-semibold text-white mb-1">Sharpe Ratio</h4>
                    <p className="text-gray-400 text-sm">Risk-Adjusted Return</p>
                  </div>
                  
                  <div className="text-center flex flex-col items-center">
                    <Award className="w-12 h-12 text-purple-400 mb-4" />
                    <div className="text-2xl font-bold text-purple-400 mb-2">78%</div>
                    <h4 className="text-lg font-semibold text-white mb-1">Win Rate</h4>
                    <p className="text-gray-400 text-sm">Months Outperformed</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="space-y-8">
                {/* Sector Allocation - No Containers */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Sector Allocation</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {sectorData.map((sector, index) => (
                      <div key={index} className="text-center flex flex-col items-center">
                        <div className="w-4 h-4 rounded mb-2" style={{ backgroundColor: sector.color }}></div>
                        <div className="text-white font-semibold">{sector.value}%</div>
                        <div className="text-xs text-gray-400">{sector.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Complete Portfolio Holdings */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">Complete Portfolio Holdings</h3>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search stocks..."
                          className="pl-10 pr-4 py-2 border-b border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <button className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white border-b border-gray-600">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                      </button>
                    </div>
                  </div>

                  {/* Portfolio Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-4 px-4 text-gray-400 font-medium">Stock</th>
                          <th className="text-left py-4 px-4 text-gray-400 font-medium">Allocation</th>
                          <th className="text-left py-4 px-4 text-gray-400 font-medium">Price</th>
                          <th className="text-left py-4 px-4 text-gray-400 font-medium">Change</th>
                          <th className="text-left py-4 px-4 text-gray-400 font-medium">Sector</th>
                          <th className="text-left py-4 px-4 text-gray-400 font-medium">ASI Score</th>
                          <th className="text-left py-4 px-4 text-gray-400 font-medium">Recommendation</th>
                          <th className="text-left py-4 px-4 text-gray-400 font-medium">Analysis</th>
                        </tr>
                      </thead>
                      <tbody>
                        {portfolioHoldings.map((stock, index) => (
                          <tr key={stock.id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                            <td className="py-4 px-4 text-center">
                              <div>
                                <div className="font-semibold text-white">{stock.name}</div>
                                <div className="text-sm text-gray-400">{stock.symbol}</div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-semibold text-white">{stock.allocation}%</div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-semibold text-white">₹{stock.price.toLocaleString()}</div>
                              <div className="text-xs text-gray-400">Market Cap: {stock.marketCap}</div>
                            </td>
                            <td className="py-4 px-4">
                              <div className={`font-semibold ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {stock.change >= 0 ? '+' : ''}{stock.change}%
                              </div>
                              <div className="text-xs text-gray-400">P/E: {stock.pe}</div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                                {stock.sector}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-2">
                                <div className="font-bold text-white">{stock.asiScore}</div>
                                <div className={`px-2 py-1 rounded text-xs font-bold ${
                                  stock.asiGrade.startsWith('A') ? 'bg-green-500/20 text-green-400' :
                                  stock.asiGrade.startsWith('B') ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-red-500/20 text-red-400'
                                }`}>
                                  {stock.asiGrade}
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                stock.recommendation === 'STRONG BUY' ? 'bg-green-600/20 text-green-400' :
                                stock.recommendation === 'BUY' ? 'bg-green-500/20 text-green-400' :
                                stock.recommendation === 'HOLD' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {stock.recommendation}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <button
                                onClick={() => handleASIAnalysis(stock.id, stock.name)}
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2"
                              >
                                <Brain className="w-4 h-4" />
                                <span>ASI Analysis</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'risk' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center flex flex-col items-center">
                  <Activity className="w-12 h-12 text-red-400 mb-4" />
                  <div className="text-3xl font-bold text-red-400 mb-2">16.8%</div>
                  <h3 className="text-lg font-semibold text-white mb-1">Volatility</h3>
                  <p className="text-gray-400 text-sm">Standard Deviation</p>
                </div>
                
                <div className="text-center flex flex-col items-center">
                  <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
                  <div className="text-3xl font-bold text-blue-400 mb-2">1.24</div>
                  <h3 className="text-lg font-semibold text-white mb-1">Sharpe Ratio</h3>
                  <p className="text-gray-400 text-sm">Risk-Adjusted Return</p>
                </div>
                
                <div className="text-center flex flex-col items-center">
                  <BarChart3 className="w-12 h-12 text-purple-400 mb-4" />
                  <div className="text-3xl font-bold text-purple-400 mb-2">0.95</div>
                  <h3 className="text-lg font-semibold text-white mb-1">Beta</h3>
                  <p className="text-gray-400 text-sm">Market Sensitivity</p>
                </div>
              </div>
            )}

            {activeTab === 'ai-insights' && (
              <div className="space-y-12">
                <div className="text-center mb-8">
                  <Brain className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-white mb-2">FSI AI Analysis</h3>
                  <p className="text-gray-300 text-lg">Comprehensive AI-driven fund evaluation</p>
                </div>

                {/* Fund Strengths */}
                <div>
                  <div className="flex items-center mb-6">
                    <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
                    <h4 className="text-2xl font-bold text-white">What's Great About This Fund</h4>
                  </div>
                  <div className="space-y-8">
                    {comprehensiveAnalysis.strengths.map((strength, index) => (
                      <div key={index} className="border-l-4 border-green-400 pl-6">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-xl font-bold text-white">{strength.title}</h5>
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              strength.impact === 'High' ? 'bg-green-500/20 text-green-400' :
                              strength.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {strength.impact} Impact
                            </span>
                            <span className="text-sm text-gray-400">{strength.confidence}% confident</span>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-4 leading-relaxed">{strength.description}</p>
                        
                        <div className="mb-4">
                          <h6 className="text-sm font-semibold text-gray-400 mb-2">Supporting Evidence:</h6>
                          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                            {strength.evidence.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-green-500/10 p-4 rounded-lg border-l-2 border-green-400">
                          <h6 className="text-sm font-semibold text-green-400 mb-1">Why This Matters to You:</h6>
                          <p className="text-sm text-gray-300">{strength.whyItMatters}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fund Weaknesses */}
                <div>
                  <div className="flex items-center mb-6">
                    <AlertTriangle className="w-8 h-8 text-red-400 mr-3" />
                    <h4 className="text-2xl font-bold text-white">Potential Concerns & Risks</h4>
                  </div>
                  <div className="space-y-8">
                    {comprehensiveAnalysis.weaknesses.map((weakness, index) => (
                      <div key={index} className="border-l-4 border-red-400 pl-6">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-xl font-bold text-white">{weakness.title}</h5>
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              weakness.impact === 'High' ? 'bg-red-500/20 text-red-400' :
                              weakness.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {weakness.impact} Risk
                            </span>
                            <span className="text-sm text-gray-400">{weakness.confidence}% confident</span>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-4 leading-relaxed">{weakness.description}</p>
                        
                        <div className="mb-4">
                          <h6 className="text-sm font-semibold text-gray-400 mb-2">Risk Indicators:</h6>
                          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                            {weakness.evidence.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-red-500/10 p-4 rounded-lg border-l-2 border-red-400 mb-4">
                          <h6 className="text-sm font-semibold text-red-400 mb-1">Impact on Your Investment:</h6>
                          <p className="text-sm text-gray-300">{weakness.whyItMatters}</p>
                        </div>

                        {weakness.mitigation && (
                          <div className="bg-blue-500/10 p-4 rounded-lg border-l-2 border-blue-400">
                            <h6 className="text-sm font-semibold text-blue-400 mb-1">Risk Mitigation:</h6>
                            <p className="text-sm text-gray-300">{weakness.mitigation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Predictions */}
                <div>
                  <div className="flex items-center mb-6">
                    <Target className="w-8 h-8 text-purple-400 mr-3" />
                    <h4 className="text-2xl font-bold text-white">AI-Powered Return Predictions</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {comprehensiveAnalysis.predictions.map((prediction, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold text-purple-400 mb-2">{prediction.expectedReturn}</div>
                        <div className="text-lg font-semibold text-white mb-1">{prediction.timeframe}</div>
                        <div className="text-sm text-gray-400 mb-4">Confidence: {prediction.confidence}%</div>
                        
                        <div className="text-left space-y-3">
                          <div>
                            <h6 className="text-sm font-semibold text-gray-400 mb-1">AI Reasoning:</h6>
                            <p className="text-sm text-gray-300">{prediction.reasoning}</p>
                          </div>
                          
                          <div>
                            <h6 className="text-sm font-semibold text-gray-400 mb-1">Key Risks:</h6>
                            <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                              {prediction.risks.map((risk, i) => (
                                <li key={i}>{risk}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Market Sentiment */}
                <div>
                  <div className="flex items-center mb-6">
                    <TrendingUp className="w-8 h-8 text-blue-400 mr-3" />
                    <h4 className="text-2xl font-bold text-white">Current Market Sentiment</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="text-2xl font-bold text-green-400 mr-3">{comprehensiveAnalysis.marketSentiment.overall}</div>
                        <div className="text-gray-400">Overall Market Outlook</div>
                      </div>
                      <p className="text-gray-300 mb-4">{comprehensiveAnalysis.marketSentiment.reasoning}</p>
                      
                      <div>
                        <h6 className="text-sm font-semibold text-green-400 mb-2">Positive Factors:</h6>
                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                          {comprehensiveAnalysis.marketSentiment.supportingFactors.map((factor, i) => (
                            <li key={i}>{factor}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h6 className="text-sm font-semibold text-red-400 mb-2">Watch Out For:</h6>
                      <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                        {comprehensiveAnalysis.marketSentiment.risks.map((risk, i) => (
                          <li key={i}>{risk}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Investment Recommendations */}
                <div>
                  <div className="flex items-center mb-6">
                    <Star className="w-8 h-8 text-yellow-400 mr-3" />
                    <h4 className="text-2xl font-bold text-white">Investment Recommendations</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-6">
                        <h5 className="text-lg font-bold text-green-400 mb-3">✅ This Fund is Ideal For:</h5>
                        <ul className="space-y-2">
                          {comprehensiveAnalysis.recommendations.idealFor.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-lg font-bold text-red-400 mb-3">❌ Not Recommended For:</h5>
                        <ul className="space-y-2">
                          {comprehensiveAnalysis.recommendations.notIdealFor.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <AlertTriangle className="w-5 h-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-lg font-bold text-blue-400 mb-4">Investment Strategy Recommendations</h5>
                      
                      <div className="space-y-4">
                        <div className="border-l-4 border-green-400 pl-4">
                          <div className="flex items-center mb-2">
                            <h6 className="font-semibold text-white mr-2">SIP (Systematic Investment Plan)</h6>
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Recommended</span>
                          </div>
                          <p className="text-sm text-gray-300 mb-2">Amount: {comprehensiveAnalysis.recommendations.investmentStrategy.sip.amount}</p>
                          <p className="text-xs text-gray-400">{comprehensiveAnalysis.recommendations.investmentStrategy.sip.reasoning}</p>
                        </div>
                        
                        <div className="border-l-4 border-yellow-400 pl-4">
                          <div className="flex items-center mb-2">
                            <h6 className="font-semibold text-white mr-2">Lump Sum Investment</h6>
                            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">Conditional</span>
                          </div>
                          <p className="text-sm text-gray-300 mb-2">Condition: {comprehensiveAnalysis.recommendations.investmentStrategy.lumpsum.condition}</p>
                          <p className="text-xs text-gray-400">{comprehensiveAnalysis.recommendations.investmentStrategy.lumpsum.reasoning}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FSIAnalysisPage;
