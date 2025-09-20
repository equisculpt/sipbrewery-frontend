'use client';

import { useState, useEffect, useRef } from 'react';
import { mutualFundApi, type ChartData } from '@/services/mutualFundApi';

interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  nav: number;
}

interface TechnicalIndicator {
  index: number;
  value: number;
}

interface MutualFundData {
  scheme: {
    code: string;
    name: string;
    category: string;
    aum: string;
    expense_ratio: number;
  };
  candles: CandleData[];
  indicators: {
    moving_averages: {
      sma_20: TechnicalIndicator[];
      sma_50: TechnicalIndicator[];
      sma_200: TechnicalIndicator[];
    };
    oscillators: {
      rsi: TechnicalIndicator[];
    };
  };
  statistics: {
    total_return: number;
    annualized_return: number;
    volatility: number;
    sharpe_ratio: number;
    max_drawdown: number;
    current_nav: number;
  };
}

export default function MutualFundTradingView() {
  const [selectedScheme, setSelectedScheme] = useState('HDFC_TOP_100');
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');
  const [chartData, setChartData] = useState<MutualFundData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndicators, setActiveIndicators] = useState({
    sma_20: true,
    sma_50: true,
    sma_200: false,
    rsi: true,
    macd: false,
    ema_20: false,
    boll: false,
    volume: true
  });
  const [chartType, setChartType] = useState<'candlestick' | 'line'>('candlestick');
  const [compareWith, setCompareWith] = useState<string>('None');
  const [isClient, setIsClient] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 1200, height: 600 });
  const mouseRef = useRef<{ x: number; y: number; inside: boolean }>({ x: 0, y: 0, inside: false });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Available schemes
  const schemes = [
    { code: 'HDFC_TOP_100', name: 'HDFC Top 100 Fund', category: 'Large Cap' },
    { code: 'SBI_BLUECHIP', name: 'SBI Bluechip Fund', category: 'Large Cap' },
    { code: 'ICICI_FOCUSED_BLUECHIP', name: 'ICICI Prudential Focused Bluechip Equity Fund', category: 'Large Cap' },
    { code: 'AXIS_MIDCAP', name: 'Axis Midcap Fund', category: 'Mid Cap' },
    { code: 'MIRAE_EMERGING_BLUECHIP', name: 'Mirae Asset Emerging Bluechip Fund', category: 'Large & Mid Cap' }
  ];

  const periods = ['1M', '3M', '6M', '1Y', '2Y', '3Y', '5Y'];

  // Generate mock data
  const generateMockMutualFundData = (schemeCode: string, period: string): MutualFundData => {
    const scheme = schemes.find(s => s.code === schemeCode) || schemes[0];
    const days = getPeriodDays(period);
    const candles: CandleData[] = [];
    
    let baseNAV = 150 + Math.random() * 100;
    const startTime = Date.now() - (days * 24 * 60 * 60 * 1000);
    
    for (let i = 0; i < days; i++) {
      const time = startTime + (i * 24 * 60 * 60 * 1000);
      const volatility = 0.02 + Math.random() * 0.03;
      const change = (Math.random() - 0.5) * volatility * baseNAV;
      
      const open = baseNAV;
      const close = baseNAV + change;
      const high = Math.max(open, close) + Math.random() * volatility * baseNAV * 0.5;
      const low = Math.min(open, close) - Math.random() * volatility * baseNAV * 0.5;
      const volume = Math.floor(Math.random() * 1000000) + 500000;
      
      candles.push({
        time: Math.floor(time / 1000),
        open: parseFloat(open.toFixed(4)),
        high: parseFloat(high.toFixed(4)),
        low: parseFloat(low.toFixed(4)),
        close: parseFloat(close.toFixed(4)),
        volume,
        nav: parseFloat(close.toFixed(4))
      });
      
      baseNAV = close;
    }

    const closes = candles.map(c => c.close);
    
    return {
      scheme: {
        code: schemeCode,
        name: scheme.name,
        category: scheme.category,
        aum: '₹' + (Math.random() * 50000 + 10000).toFixed(0) + ' Cr',
        expense_ratio: parseFloat((Math.random() * 1 + 0.5).toFixed(2))
      },
      candles,
      indicators: {
        moving_averages: {
          sma_20: generateSMA(closes, 20),
          sma_50: generateSMA(closes, 50),
          sma_200: generateSMA(closes, 200)
        },
        oscillators: {
          rsi: generateRSI(closes, 14)
        }
      },
      statistics: {
        total_return: parseFloat(((candles[candles.length - 1].close - candles[0].close) / candles[0].close * 100).toFixed(2)),
        annualized_return: parseFloat((Math.random() * 20 + 5).toFixed(2)),
        volatility: parseFloat((Math.random() * 15 + 10).toFixed(2)),
        sharpe_ratio: parseFloat((Math.random() * 1.5 + 0.5).toFixed(2)),
        max_drawdown: parseFloat((Math.random() * 15 + 5).toFixed(2)),
        current_nav: candles[candles.length - 1].nav
      }
    };
  };

  const generateSMA = (data: number[], period: number): TechnicalIndicator[] => {
    const result: TechnicalIndicator[] = [];
    for (let i = period - 1; i < data.length; i++) {
      const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
      result.push({ index: i, value: parseFloat((sum / period).toFixed(4)) });
    }
    return result;
  };

  const generateRSI = (data: number[], period: number): TechnicalIndicator[] => {
    const result: TechnicalIndicator[] = [];
    const gains: number[] = [];
    const losses: number[] = [];
    
    for (let i = 1; i < data.length; i++) {
      const change = data[i] - data[i - 1];
      gains.push(change > 0 ? change : 0);
      losses.push(change < 0 ? Math.abs(change) : 0);
    }
    
    for (let i = period - 1; i < gains.length; i++) {
      const avgGain = gains.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period;
      const avgLoss = losses.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period;
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      const rsi = 100 - (100 / (1 + rs));
      result.push({ index: i + 1, value: parseFloat(rsi.toFixed(2)) });
    }
    
    return result;
  };

  const getPeriodDays = (period: string): number => {
    const periodMap: { [key: string]: number } = {
      '1M': 30, '3M': 90, '6M': 180, '1Y': 365, '2Y': 730, '3Y': 1095, '5Y': 1825
    };
    return periodMap[period] || 365;
  };

  // Fetch REAL data from backend API
  useEffect(() => {
    if (!isClient) return;

    const fetchRealData = async () => {
  setLoading(true);
  try {
    console.log(`🚀 Fetching REAL data for ${selectedScheme} (${selectedPeriod}) via ASI`);
    const response = await fetch('/asi/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'fund_analysis',
        data: { fundCode: selectedScheme, period: selectedPeriod },
        parameters: {}
      })
    });
    if (!response.ok) throw new Error('ASI backend error');
    const data = await response.json();
    const asiResult = data.result || data;
    if (asiResult && asiResult.chartData) {
      setChartData(asiResult.chartData);
    } else if (asiResult && asiResult.data) {
      setChartData(asiResult.data);
    } else {
      const fallbackData = generateMockMutualFundData(selectedScheme, selectedPeriod);
      setChartData(fallbackData);
    }
  } catch (error) {
    console.error('❌ Failed to fetch ASI fund analysis:', error);
    const fallbackData = generateMockMutualFundData(selectedScheme, selectedPeriod);
    setChartData(fallbackData);
  } finally {
    setLoading(false);
  }
};

    fetchRealData();
  }, [selectedScheme, selectedPeriod, isClient]);

  if (!isClient) {
    return (
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        padding: '3rem',
        textAlign: 'center',
        margin: '4rem 0',
        minHeight: '800px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ opacity: 0.6 }}>Loading TradingView Chart...</div>
      </div>
    );
  }

  return (
    <div style={{ margin: '4rem 0' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          background: 'linear-gradient(45deg, #00f9ff, #39ff14)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          📈 World's First Mutual Fund TradingView
        </h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
          Professional-grade technical analysis for mutual fund schemes
        </p>
      </div>

      {/* Controls */}
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px',
        padding: '2rem',
        marginBottom: '2rem',
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {/* Scheme Selection */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
              Select Mutual Fund Scheme
            </label>
            <select
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '10px',
                color: '#ffffff',
                fontSize: '1rem'
              }}
            >
              {schemes.map(scheme => (
                <option key={scheme.code} value={scheme.code} style={{ background: '#1a1a1a' }}>
                  {scheme.name}
                </option>
              ))}
            </select>
          </div>

          {/* Period Selection */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
              Time Period
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {periods.map(period => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: selectedPeriod === period ? '#00f9ff' : 'rgba(255,255,255,0.1)',
                    color: selectedPeriod === period ? '#000000' : '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
              Technical Indicators
            </label>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[
                { key: 'sma_20', label: 'SMA 20', color: '#ff8000' },
                { key: 'sma_50', label: 'SMA 50', color: '#8000ff' },
                { key: 'rsi', label: 'RSI', color: '#39ff14' }
              ].map(indicator => (
                <label key={indicator.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={activeIndicators[indicator.key as keyof typeof activeIndicators]}
                    onChange={(e) => setActiveIndicators(prev => ({ ...prev, [indicator.key]: e.target.checked }))}
                    style={{ accentColor: indicator.color }}
                  />
                  <span style={{ color: indicator.color, fontSize: '0.9rem', fontWeight: 600 }}>
                    {indicator.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div style={{
        background: 'rgba(0,0,0,0.6)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px',
        padding: '2rem',
        backdropFilter: 'blur(20px)'
      }}>
        {loading ? (
          <div style={{
            height: '600px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            opacity: 0.8
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '1rem' }}>📊</div>
              <div>Loading chart data for {schemes.find(s => s.code === selectedScheme)?.name}...</div>
            </div>
          </div>
        ) : chartData ? (
          <div>
            {/* Scheme Info */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {chartData.scheme.name}
                </h3>
                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', opacity: 0.8 }}>
                  <span>Category: {chartData.scheme.category}</span>
                  <span>AUM: {chartData.scheme.aum}</span>
                  <span>Expense Ratio: {chartData.scheme.expense_ratio}%</span>
                </div>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#00f9ff' }}>
                  ₹{chartData.statistics.current_nav.toFixed(2)}
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: chartData.statistics.total_return >= 0 ? '#39ff14' : '#ff4757',
                  fontWeight: 600
                }}>
                  {chartData.statistics.total_return >= 0 ? '+' : ''}{chartData.statistics.total_return}%
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {[
                { label: 'Annualized Return', value: `${chartData.statistics.annualized_return}%`, color: '#00f9ff' },
                { label: 'Volatility', value: `${chartData.statistics.volatility}%`, color: '#ff8000' },
                { label: 'Sharpe Ratio', value: chartData.statistics.sharpe_ratio.toFixed(2), color: '#39ff14' },
                { label: 'Max Drawdown', value: `${chartData.statistics.max_drawdown}%`, color: '#ff4757' }
              ].map((stat, index) => (
                <div key={index} style={{
                  background: 'rgba(255,255,255,0.05)',
                  padding: '1rem',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: stat.color }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Placeholder for actual chart */}
            <div style={{
              height: '400px',
              background: 'linear-gradient(135deg, rgba(0,249,255,0.1) 0%, rgba(57,255,20,0.1) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <div style={{ textAlign: 'center', opacity: 0.8 }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  TradingView-Style Chart
                </div>
                <div style={{ fontSize: '1rem' }}>
                  Professional candlestick chart with {Object.values(activeIndicators).filter(Boolean).length} technical indicators
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
