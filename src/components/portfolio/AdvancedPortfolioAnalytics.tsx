'use client';

import { useState, useEffect } from 'react';

interface PortfolioHolding {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  allocation: number;
  pnl: number;
  pnlPercent: number;
  riskScore: number;
  beta: number;
  sharpeRatio: number;
}

interface RiskMetrics {
  portfolioValue: number;
  totalPnL: number;
  totalPnLPercent: number;
  sharpeRatio: number;
  beta: number;
  var95: number;
  maxDrawdown: number;
  volatility: number;
  correlation: number;
}

interface SectorAllocation {
  sector: string;
  allocation: number;
  value: number;
  color: string;
  performance: number;
}

import BehavioralAnalysisSection from '../sentiment/BehavioralAnalysisSection';
import BehavioralAlerts from '../sentiment/BehavioralAlerts';
import PersonalizedBehavioralProfile from '../sentiment/PersonalizedBehavioralProfile';
import BehavioralAnomalyDetection from '../sentiment/BehavioralAnomalyDetection';
import BehavioralHeatmap from '../sentiment/BehavioralHeatmap';
import BehavioralTradeRecommendations from '../sentiment/BehavioralTradeRecommendations';
import GlobalBehavioralMap from '../sentiment/GlobalBehavioralMap';
import CohortBehavioralAnalysis from '../sentiment/CohortBehavioralAnalysis';
import ExplainableAISignals from '../sentiment/ExplainableAISignals';
import AlphaSignalGeneration from '../sentiment/AlphaSignalGeneration';
import RiskOverlaySignals from '../sentiment/RiskOverlaySignals';
import ConversationalAIEnhancements from '../sentiment/ConversationalAIEnhancements';
import RegulatoryAIAssistant from '../sentiment/RegulatoryAIAssistant';
import GlobalEventOverlay from '../sentiment/GlobalEventOverlay';
import ExplainablePortfolioOptimization from '../sentiment/ExplainablePortfolioOptimization';

export default function AdvancedPortfolioAnalytics() {
  const [holdings, setHoldings] = useState<PortfolioHolding[]>([]);
  const [riskMetrics, setRiskMetrics] = useState<RiskMetrics | null>(null);
  const [sectorAllocation, setSectorAllocation] = useState<SectorAllocation[]>([]);
  const [selectedView, setSelectedView] = useState<
    | 'overview'
    | 'risk'
    | 'performance'
    | 'optimization'
    | 'behavioral'
    | 'alerts'
    | 'profile'
    | 'anomaly'
    | 'heatmap'
    | 'trade'
    | 'globalmap'
    | 'cohort'
    | 'explainable'
    | 'alpha'
    | 'riskoverlay'
    | 'conversational'
    | 'regulatory'
    | 'eventoverlay'
    | 'explainopt'
  >('overview');
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1M');

  useEffect(() => {
  const fetchASIPortfolioData = async () => {
    try {
      const response = await fetch('/asi/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedView === 'optimization' ? 'portfolio_optimization' : 'risk_analysis',
          data: { timeframe, view: selectedView },
          parameters: {}
        })
      });
      if (!response.ok) throw new Error('ASI backend error');
      const data = await response.json();
      const asiResult = data.result || data;
      if (asiResult) {
        if (asiResult.holdings) setHoldings(asiResult.holdings);
        if (asiResult.riskMetrics) setRiskMetrics(asiResult.riskMetrics);
        if (asiResult.sectorAllocation) setSectorAllocation(asiResult.sectorAllocation);
      } else {
        throw new Error('ASI returned no portfolio data');
      }
    } catch (error) {
      console.error('❌ Failed to fetch ASI portfolio data:', error);
      // Fallback to demo/mock data
      const mockHoldings = [
        {
          symbol: 'RELIANCE', name: 'Reliance Industries Ltd', quantity: 50, avgPrice: 2450.00, currentPrice: 2567.80, allocation: 25.5, pnl: 5890.00, pnlPercent: 4.81, riskScore: 6.2, beta: 1.15, sharpeRatio: 1.23
        },
        {
          symbol: 'TCS', name: 'Tata Consultancy Services', quantity: 30, avgPrice: 3200.00, currentPrice: 3456.90, allocation: 20.8, pnl: 7707.00, pnlPercent: 8.03, riskScore: 4.8, beta: 0.85, sharpeRatio: 1.67
        },
        {
          symbol: 'HDFCBANK', name: 'HDFC Bank Limited', quantity: 40, avgPrice: 1580.00, currentPrice: 1634.50, allocation: 18.2, pnl: 2180.00, pnlPercent: 3.45, riskScore: 5.1, beta: 0.92, sharpeRatio: 1.45
        },
        {
          symbol: 'INFY', name: 'Infosys Limited', quantity: 60, avgPrice: 1420.00, currentPrice: 1389.20, allocation: 15.3, pnl: -1848.00, pnlPercent: -2.17, riskScore: 5.5, beta: 0.78, sharpeRatio: 1.12
        },
        {
          symbol: 'ICICIBANK', name: 'ICICI Bank Limited', quantity: 35, avgPrice: 890.00, currentPrice: 945.60, allocation: 12.1, pnl: 1946.00, pnlPercent: 6.25, riskScore: 6.8, beta: 1.25, sharpeRatio: 1.08
        },
        {
          symbol: 'BHARTIARTL', name: 'Bharti Airtel Limited', quantity: 80, avgPrice: 720.00, currentPrice: 756.30, allocation: 8.1, pnl: 2904.00, pnlPercent: 5.04, riskScore: 7.2, beta: 1.08, sharpeRatio: 0.95
        }
      ];
      const totalValue = mockHoldings.reduce((sum, holding) => sum + (holding.quantity * holding.currentPrice), 0);
      const totalPnL = mockHoldings.reduce((sum, holding) => sum + holding.pnl, 0);
      const mockRiskMetrics = {
        portfolioValue: totalValue,
        totalPnL: totalPnL,
        totalPnLPercent: (totalPnL / (totalValue - totalPnL)) * 100,
        sharpeRatio: 1.28,
        beta: 1.02,
        var95: -45600,
        maxDrawdown: -8.7,
        volatility: 18.5,
        correlation: 0.76
      };
      const mockSectorAllocation = [
        { sector: 'Technology', allocation: 35.3, value: totalValue * 0.353, color: '#00f9ff', performance: 12.4 },
        { sector: 'Banking', allocation: 30.3, value: totalValue * 0.303, color: '#39ff14', performance: 8.7 },
        { sector: 'Energy', allocation: 25.5, value: totalValue * 0.255, color: '#8000ff', performance: 4.8 },
        { sector: 'Telecom', allocation: 8.1, value: totalValue * 0.081, color: '#ff8000', performance: 5.0 },
        { sector: 'Others', allocation: 0.8, value: totalValue * 0.008, color: '#ff4757', performance: -2.1 }
      ];
      setHoldings(mockHoldings);
      setRiskMetrics(mockRiskMetrics);
      setSectorAllocation(mockSectorAllocation);
    }
  };

  fetchASIPortfolioData();
}, [timeframe, selectedView]);
      const mockHoldings: PortfolioHolding[] = [
        {
          symbol: 'RELIANCE',
          name: 'Reliance Industries Ltd',
          quantity: 50,
          avgPrice: 2450.00,
          currentPrice: 2567.80,
          allocation: 25.5,
          pnl: 5890.00,
          pnlPercent: 4.81,
          riskScore: 6.2,
          beta: 1.15,
          sharpeRatio: 1.23
        },
        {
          symbol: 'TCS',
          name: 'Tata Consultancy Services',
          quantity: 30,
          avgPrice: 3200.00,
          currentPrice: 3456.90,
          allocation: 20.8,
          pnl: 7707.00,
          pnlPercent: 8.03,
          riskScore: 4.8,
          beta: 0.85,
          sharpeRatio: 1.67
        },
        {
          symbol: 'HDFCBANK',
          name: 'HDFC Bank Limited',
          quantity: 40,
          avgPrice: 1580.00,
          currentPrice: 1634.50,
          allocation: 18.2,
          pnl: 2180.00,
          pnlPercent: 3.45,
          riskScore: 5.1,
          beta: 0.92,
          sharpeRatio: 1.45
        },
        {
          symbol: 'INFY',
          name: 'Infosys Limited',
          quantity: 60,
          avgPrice: 1420.00,
          currentPrice: 1389.20,
          allocation: 15.3,
          pnl: -1848.00,
          pnlPercent: -2.17,
          riskScore: 5.5,
          beta: 0.78,
          sharpeRatio: 1.12
        },
        {
          symbol: 'ICICIBANK',
          name: 'ICICI Bank Limited',
          quantity: 35,
          avgPrice: 890.00,
          currentPrice: 945.60,
          allocation: 12.1,
          pnl: 1946.00,
          pnlPercent: 6.25,
          riskScore: 6.8,
          beta: 1.25,
          sharpeRatio: 1.08
        },
        {
          symbol: 'BHARTIARTL',
          name: 'Bharti Airtel Limited',
          quantity: 80,
          avgPrice: 720.00,
          currentPrice: 756.30,
          allocation: 8.1,
          pnl: 2904.00,
          pnlPercent: 5.04,
          riskScore: 7.2,
          beta: 1.08,
          sharpeRatio: 0.95
        }
      ];

      const totalValue = mockHoldings.reduce((sum, holding) => 
        sum + (holding.quantity * holding.currentPrice), 0);
      const totalPnL = mockHoldings.reduce((sum, holding) => sum + holding.pnl, 0);

      const mockRiskMetrics: RiskMetrics = {
        portfolioValue: totalValue,
        totalPnL: totalPnL,
        totalPnLPercent: (totalPnL / (totalValue - totalPnL)) * 100,
        sharpeRatio: 1.28,
        beta: 1.02,
        var95: -45600,
        maxDrawdown: -8.7,
        volatility: 18.5,
        correlation: 0.76
      };

      const mockSectorAllocation: SectorAllocation[] = [
        { sector: 'Technology', allocation: 35.3, value: totalValue * 0.353, color: '#00f9ff', performance: 12.4 },
        { sector: 'Banking', allocation: 30.3, value: totalValue * 0.303, color: '#39ff14', performance: 8.7 },
        { sector: 'Energy', allocation: 25.5, value: totalValue * 0.255, color: '#8000ff', performance: 4.8 },
        { sector: 'Telecom', allocation: 8.1, value: totalValue * 0.081, color: '#ff8000', performance: 5.0 },
        { sector: 'Others', allocation: 0.8, value: totalValue * 0.008, color: '#ff4757', performance: -2.1 }
      ];

      setHoldings(mockHoldings);
      setRiskMetrics(mockRiskMetrics);
      setSectorAllocation(mockSectorAllocation);
    };

    generatePortfolioData();
    const interval = setInterval(generatePortfolioData, 10000);
    return () => clearInterval(interval);
  }, []);

  const renderOverviewTab = () => (
    <div style={{ display: 'grid', gap: '2rem' }}>
      {/* Portfolio Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {riskMetrics && [
          {
            title: 'Portfolio Value',
            value: `₹${(riskMetrics.portfolioValue / 100000).toFixed(2)}L`,
            change: `+₹${(riskMetrics.totalPnL / 1000).toFixed(1)}K`,
            changePercent: riskMetrics.totalPnLPercent,
            color: '#00f9ff',
            icon: '💼'
          },
          {
            title: 'Total Returns',
            value: `${riskMetrics.totalPnLPercent.toFixed(2)}%`,
            change: `₹${(riskMetrics.totalPnL / 1000).toFixed(1)}K`,
            changePercent: riskMetrics.totalPnLPercent,
            color: riskMetrics.totalPnL >= 0 ? '#39ff14' : '#ff4757',
            icon: '📈'
          },
          {
            title: 'Sharpe Ratio',
            value: riskMetrics.sharpeRatio.toFixed(2),
            change: 'Excellent',
            changePercent: 0,
            color: '#8000ff',
            icon: '⚡'
          },
          {
            title: 'Portfolio Beta',
            value: riskMetrics.beta.toFixed(2),
            change: 'Market Aligned',
            changePercent: 0,
            color: '#ff8000',
            icon: '🎯'
          }
        ].map((metric, index) => (
          <div
            key={index}
            style={{
              background: `linear-gradient(135deg, ${metric.color}20 0%, rgba(0,0,0,0.3) 100%)`,
              border: `1px solid ${metric.color}40`,
              borderRadius: '20px',
              padding: '2rem',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
              e.currentTarget.style.boxShadow = `0 15px 40px ${metric.color}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem'
            }}>
              <div style={{ fontSize: '2rem' }}>{metric.icon}</div>
              <div style={{
                background: metric.color,
                color: '#000000',
                padding: '0.3rem 0.8rem',
                borderRadius: '15px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                {timeframe}
              </div>
            </div>
            
            <h3 style={{
              fontSize: '1rem',
              opacity: 0.8,
              marginBottom: '0.5rem',
              fontWeight: 500
            }}>
              {metric.title}
            </h3>
            
            <div style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '0.5rem'
            }}>
              {metric.value}
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              color: metric.changePercent >= 0 ? '#39ff14' : '#ff4757'
            }}>
              <span>{metric.changePercent >= 0 ? '↗' : '↘'}</span>
              <span>{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Holdings Table */}
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px',
        padding: '2rem',
        backdropFilter: 'blur(20px)'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '2rem',
          color: '#00f9ff'
        }}>
          📊 Portfolio Holdings
        </h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                {['Symbol', 'Qty', 'Avg Price', 'LTP', 'P&L', 'P&L%', 'Allocation', 'Risk Score'].map(header => (
                  <th key={header} style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    opacity: 0.8
                  }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding, index) => (
                <tr
                  key={holding.symbol}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <td style={{ padding: '1rem' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '1rem' }}>{holding.symbol}</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{holding.name}</div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{holding.quantity}</td>
                  <td style={{ padding: '1rem' }}>₹{holding.avgPrice.toFixed(2)}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>₹{holding.currentPrice.toFixed(2)}</td>
                  <td style={{
                    padding: '1rem',
                    color: holding.pnl >= 0 ? '#39ff14' : '#ff4757',
                    fontWeight: 600
                  }}>
                    {holding.pnl >= 0 ? '+' : ''}₹{holding.pnl.toFixed(0)}
                  </td>
                  <td style={{
                    padding: '1rem',
                    color: holding.pnlPercent >= 0 ? '#39ff14' : '#ff4757',
                    fontWeight: 600
                  }}>
                    {holding.pnlPercent >= 0 ? '+' : ''}{holding.pnlPercent.toFixed(2)}%
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{
                      background: 'rgba(0,249,255,0.2)',
                      borderRadius: '10px',
                      padding: '0.3rem 0.8rem',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      textAlign: 'center'
                    }}>
                      {holding.allocation}%
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '6px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${(holding.riskScore / 10) * 100}%`,
                          height: '100%',
                          background: holding.riskScore <= 5 ? '#39ff14' : 
                                     holding.riskScore <= 7 ? '#ff8000' : '#ff4757',
                          borderRadius: '3px'
                        }} />
                      </div>
                      <span style={{ fontSize: '0.9rem' }}>{holding.riskScore}/10</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSectorAllocation = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      marginTop: '2rem'
    }}>
      {/* Pie Chart Visualization */}
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px',
        padding: '2rem',
        backdropFilter: 'blur(20px)',
        textAlign: 'center'
      }}>
        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: 700,
          marginBottom: '2rem',
          color: '#00f9ff'
        }}>
          🥧 Sector Allocation
        </h3>
        
        {/* Simple Pie Chart Representation */}
        <div style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          margin: '0 auto 2rem',
          background: `conic-gradient(
            ${sectorAllocation.map((sector, index) => {
              const startAngle = sectorAllocation.slice(0, index).reduce((sum, s) => sum + s.allocation, 0) * 3.6;
              const endAngle = startAngle + sector.allocation * 3.6;
              return `${sector.color} ${startAngle}deg ${endAngle}deg`;
            }).join(', ')}
          )`,
          boxShadow: '0 0 30px rgba(0,249,255,0.3)'
        }} />
        
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          {sectorAllocation.map(sector => (
            <div
              key={sector.sector}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.8rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  background: sector.color,
                  borderRadius: '50%'
                }} />
                <span style={{ fontWeight: 600 }}>{sector.sector}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700 }}>{sector.allocation}%</div>
                <div style={{
                  fontSize: '0.8rem',
                  color: sector.performance >= 0 ? '#39ff14' : '#ff4757'
                }}>
                  {sector.performance >= 0 ? '+' : ''}{sector.performance}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ margin: '4rem 0' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            background: 'linear-gradient(45deg, #00f9ff, #39ff14)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            📊 Advanced Portfolio Analytics
          </h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
            Institutional-grade portfolio analysis and risk management
          </p>
        </div>
        
        {/* Timeframe Selector */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['1D', '1W', '1M', '3M', '1Y'] as const).map(period => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              style={{
                background: timeframe === period 
                  ? 'linear-gradient(45deg, #00f9ff, #39ff14)'
                  : 'rgba(255,255,255,0.1)',
                color: timeframe === period ? '#000000' : '#ffffff',
                border: 'none',
                padding: '0.8rem 1.2rem',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '3rem',
        flexWrap: 'wrap'
      }}>
        {[
          { key: 'overview', label: '📈 Overview', icon: '📊' },
          { key: 'risk', label: '⚠️ Risk Analysis', icon: '🛡️' },
          { key: 'performance', label: '🎯 Performance', icon: '📈' },
          { key: 'optimization', label: '🔧 Optimization', icon: '⚙️' },
          { key: 'behavioral', label: '🧠 Behavioral Intelligence', icon: '🧠' },
          { key: 'alerts', label: '🚨 Real-Time Behavioral Alerts', icon: '🚨' },
          { key: 'profile', label: '👤 Personalized Behavioral Profile', icon: '👤' },
          { key: 'anomaly', label: '🔍 Predictive Anomaly Detection', icon: '🔍' },
          { key: 'heatmap', label: '🌡️ Behavioral Heatmap', icon: '🌡️' },
          { key: 'trade', label: '💡 Trade Recommendations', icon: '💡' },
          { key: 'globalmap', label: '🌍 Global Behavioral Map', icon: '🌍' },
          { key: 'cohort', label: '👥 Cohort Analysis', icon: '👥' },
          { key: 'explainable', label: '🧩 Explainable AI Signals', icon: '🧩' },
          { key: 'alpha', label: '⚡ Alpha Signal Generation', icon: '⚡' },
          { key: 'riskoverlay', label: '🛡️ Risk Overlays', icon: '🛡️' },
          { key: 'conversational', label: '💬 Conversational AI', icon: '💬' },
          { key: 'regulatory', label: '🛡️ Regulatory AI', icon: '🛡️' },
          { key: 'eventoverlay', label: '🌐 Global Event Overlay', icon: '🌐' },
          { key: 'explainopt', label: '🧠 Explainable Optimization', icon: '🧠' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setSelectedView(tab.key as any)}
            style={{
              background: selectedView === tab.key 
                ? 'linear-gradient(45deg, #00f9ff, #39ff14)'
                : 'rgba(255,255,255,0.1)',
              color: selectedView === tab.key ? '#000000' : '#ffffff',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '15px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {selectedView === 'overview' && renderOverviewTab()}
      {selectedView === 'overview' && renderSectorAllocation()}

      {selectedView === 'behavioral' && (
        <div>
          <BehavioralAnalysisSection />
        </div>
      )}
      {selectedView === 'alerts' && (
        <div>
          <BehavioralAlerts />
        </div>
      )}
      {selectedView === 'profile' && (
        <div>
          <PersonalizedBehavioralProfile />
        </div>
      )}
      {selectedView === 'anomaly' && (
        <div>
          <BehavioralAnomalyDetection />
        </div>
      )}
      {selectedView === 'heatmap' && (
        <div>
          <BehavioralHeatmap />
        </div>
      )}
      {selectedView === 'trade' && (
        <div>
          <BehavioralTradeRecommendations />
        </div>
      )}
      {selectedView === 'globalmap' && (
        <div>
          <GlobalBehavioralMap />
        </div>
      )}
      {selectedView === 'cohort' && (
        <div>
          <CohortBehavioralAnalysis />
        </div>
      )}
      {selectedView === 'explainable' && (
        <div>
          <ExplainableAISignals />
        </div>
      )}
      {selectedView === 'alpha' && (
        <div>
          <AlphaSignalGeneration />
        </div>
      )}
      {selectedView === 'riskoverlay' && (
        <div>
          <RiskOverlaySignals />
        </div>
      )}
      {selectedView === 'conversational' && (
        <div>
          <ConversationalAIEnhancements />
        </div>
      )}
      {selectedView === 'regulatory' && (
        <div>
          <RegulatoryAIAssistant />
        </div>
      )}
      {selectedView === 'eventoverlay' && (
        <div>
          <GlobalEventOverlay />
        </div>
      )}
      {selectedView === 'explainopt' && (
        <div>
          <ExplainablePortfolioOptimization />
        </div>
      )}
      
      {selectedView === 'risk' && (
          background: 'rgba(255,0,0,0.1)',
          border: '1px solid rgba(255,0,0,0.3)',
          borderRadius: '20px',
          padding: '3rem',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🛡️ Advanced Risk Analysis</h3>
          <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
            VaR, Stress Testing, Monte Carlo Simulations - Coming Soon!
          </p>
        </div>
      )}
      
      {selectedView === 'performance' && (
        <div style={{
          background: 'rgba(0,255,0,0.1)',
          border: '1px solid rgba(0,255,0,0.3)',
          borderRadius: '20px',
          padding: '3rem',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>📈 Performance Attribution</h3>
          <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
            Factor Analysis, Alpha/Beta Decomposition - Coming Soon!
          </p>
        </div>
      )}
      
      {selectedView === 'optimization' && (
        <div style={{
          background: 'rgba(128,0,255,0.1)',
          border: '1px solid rgba(128,0,255,0.3)',
          borderRadius: '20px',
          padding: '3rem',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚙️ Portfolio Optimization</h3>
          <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
            Mean-Variance Optimization, Black-Litterman - Coming Soon!
          </p>
        </div>
      )}
    </div>
  );
}
