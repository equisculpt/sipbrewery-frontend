'use client';

import { useState, useEffect, useRef } from 'react';

interface CandlestickData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface TechnicalIndicator {
  name: string;
  values: number[];
  color: string;
  type: 'line' | 'histogram' | 'area';
}

interface ChartConfig {
  symbol: string;
  interval: '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
  indicators: string[];
  overlays: string[];
}

export default function AdvancedTradingChart() {
  const [candleData, setCandleData] = useState<CandlestickData[]>([]);
  const [indicators, setIndicators] = useState<TechnicalIndicator[]>([]);
  const [config, setConfig] = useState<ChartConfig>({
    symbol: 'NIFTY',
    interval: '1h',
    indicators: ['SMA20', 'EMA50', 'RSI', 'MACD'],
    overlays: ['Volume', 'Bollinger Bands']
  });
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingTool, setDrawingTool] = useState<'trendline' | 'fibonacci' | 'rectangle' | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 1200, height: 600 });

  // Generate sophisticated market data
  useEffect(() => {
  const fetchASIChartData = async () => {
    try {
      const response = await fetch('/asi/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'alpha_signal',
          data: { symbol: config.symbol, interval: config.interval },
          parameters: { indicators: config.indicators }
        })
      });
      if (!response.ok) throw new Error('ASI backend error');
      const data = await response.json();
      const asiResult = data.result || data;
      if (asiResult && asiResult.candles) {
        setCandleData(asiResult.candles);
        if (asiResult.indicators) {
          setIndicators(asiResult.indicators);
        } else {
          generateTechnicalIndicators(asiResult.candles);
        }
      } else {
        throw new Error('ASI returned no chart data');
      }
    } catch (error) {
      console.error('❌ Failed to fetch ASI chart data:', error);
      // Fallback to demo/mock data
      const data: CandlestickData[] = [];
      let basePrice = 21800;
      const now = Date.now();
      for (let i = 0; i < 200; i++) {
        const time = now - (200 - i) * 3600000;
        const volatility = 0.02 + Math.random() * 0.03;
        const trend = Math.sin(i * 0.1) * 0.001;
        const open = basePrice;
        const change = (Math.random() - 0.5) * volatility * basePrice + trend * basePrice;
        const close = open + change;
        const high = Math.max(open, close) + Math.random() * 0.01 * basePrice;
        const low = Math.min(open, close) - Math.random() * 0.01 * basePrice;
        const volume = 1000000 + Math.random() * 5000000;
        data.push({ time, open, high, low, close, volume });
        basePrice = close;
      }
      setCandleData(data);
      generateTechnicalIndicators(data);
    }
  };

  fetchASIChartData();
}, [config.symbol, config.interval]);

  // Generate technical indicators
  const generateTechnicalIndicators = (data: CandlestickData[]) => {
    const newIndicators: TechnicalIndicator[] = [];
    
    if (config.indicators.includes('SMA20')) {
      const sma20 = calculateSMA(data.map(d => d.close), 20);
      newIndicators.push({
        name: 'SMA20',
        values: sma20,
        color: '#00f9ff',
        type: 'line'
      });
    }
    
    if (config.indicators.includes('EMA50')) {
      const ema50 = calculateEMA(data.map(d => d.close), 50);
      newIndicators.push({
        name: 'EMA50',
        values: ema50,
        color: '#39ff14',
        type: 'line'
      });
    }
    
    if (config.indicators.includes('RSI')) {
      const rsi = calculateRSI(data.map(d => d.close), 14);
      newIndicators.push({
        name: 'RSI',
        values: rsi,
        color: '#8000ff',
        type: 'line'
      });
    }
    
    if (config.indicators.includes('MACD')) {
      const macd = calculateMACD(data.map(d => d.close));
      newIndicators.push({
        name: 'MACD',
        values: macd.macd,
        color: '#ff8000',
        type: 'line'
      });
      newIndicators.push({
        name: 'Signal',
        values: macd.signal,
        color: '#ff4757',
        type: 'line'
      });
      newIndicators.push({
        name: 'Histogram',
        values: macd.histogram,
        color: '#ffff00',
        type: 'histogram'
      });
    }
    
    setIndicators(newIndicators);
  };

  // Technical Analysis Calculations
  const calculateSMA = (prices: number[], period: number): number[] => {
    const sma = [];
    for (let i = 0; i < prices.length; i++) {
      if (i < period - 1) {
        sma.push(NaN);
      } else {
        const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
        sma.push(sum / period);
      }
    }
    return sma;
  };

  const calculateEMA = (prices: number[], period: number): number[] => {
    const ema = [];
    const multiplier = 2 / (period + 1);
    ema[0] = prices[0];
    
    for (let i = 1; i < prices.length; i++) {
      ema[i] = (prices[i] * multiplier) + (ema[i - 1] * (1 - multiplier));
    }
    return ema;
  };

  const calculateRSI = (prices: number[], period: number): number[] => {
    const rsi = [];
    const gains = [];
    const losses = [];
    
    for (let i = 1; i < prices.length; i++) {
      const change = prices[i] - prices[i - 1];
      gains.push(change > 0 ? change : 0);
      losses.push(change < 0 ? Math.abs(change) : 0);
    }
    
    for (let i = 0; i < gains.length; i++) {
      if (i < period - 1) {
        rsi.push(NaN);
      } else {
        const avgGain = gains.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period;
        const avgLoss = losses.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period;
        const rs = avgGain / avgLoss;
        rsi.push(100 - (100 / (1 + rs)));
      }
    }
    
    return [NaN, ...rsi];
  };

  const calculateMACD = (prices: number[]) => {
    const ema12 = calculateEMA(prices, 12);
    const ema26 = calculateEMA(prices, 26);
    const macd = ema12.map((val, i) => val - ema26[i]);
    const signal = calculateEMA(macd, 9);
    const histogram = macd.map((val, i) => val - signal[i]);
    
    return { macd, signal, histogram };
  };

  // Advanced Chart Rendering
  const renderChart = () => {
    if (!chartRef.current || candleData.length === 0) return;
    
    const canvas = chartRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, chartDimensions.width, chartDimensions.height);
    
    // Calculate price range
    const prices = candleData.flatMap(d => [d.high, d.low]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    const padding = priceRange * 0.1;
    
    const chartHeight = chartDimensions.height * 0.7; // Reserve space for indicators
    const candleWidth = chartDimensions.width / candleData.length * 0.8;
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 10; i++) {
      const y = (i / 9) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartDimensions.width, y);
      ctx.stroke();
    }
    
    // Draw candlesticks
    candleData.forEach((candle, index) => {
      const x = (index / candleData.length) * chartDimensions.width;
      const openY = chartHeight - ((candle.open - minPrice - padding) / (priceRange + 2 * padding)) * chartHeight;
      const closeY = chartHeight - ((candle.close - minPrice - padding) / (priceRange + 2 * padding)) * chartHeight;
      const highY = chartHeight - ((candle.high - minPrice - padding) / (priceRange + 2 * padding)) * chartHeight;
      const lowY = chartHeight - ((candle.low - minPrice - padding) / (priceRange + 2 * padding)) * chartHeight;
      
      const isGreen = candle.close > candle.open;
      ctx.fillStyle = isGreen ? '#39ff14' : '#ff4757';
      ctx.strokeStyle = isGreen ? '#39ff14' : '#ff4757';
      
      // Draw wick
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();
      
      // Draw body
      const bodyHeight = Math.abs(closeY - openY);
      ctx.fillRect(x - candleWidth / 2, Math.min(openY, closeY), candleWidth, bodyHeight || 1);
    });
    
    // Draw technical indicators
    indicators.forEach(indicator => {
      if (indicator.type === 'line') {
        ctx.strokeStyle = indicator.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        indicator.values.forEach((value, index) => {
          if (!isNaN(value)) {
            const x = (index / candleData.length) * chartDimensions.width;
            const y = chartHeight - ((value - minPrice - padding) / (priceRange + 2 * padding)) * chartHeight;
            
            if (index === 0 || isNaN(indicator.values[index - 1])) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
        });
        ctx.stroke();
      }
    });
  };

  // Mouse interaction for drawing tools
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = chartRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  useEffect(() => {
    renderChart();
  }, [candleData, indicators, chartDimensions]);

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(10,25,47,0.9) 100%)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '20px',
      padding: '2rem',
      margin: '2rem 0',
      backdropFilter: 'blur(20px)'
    }}>
      {/* Chart Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            background: 'linear-gradient(45deg, #00f9ff, #39ff14)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            📈 Advanced Trading Chart
          </h2>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '1.1rem' }}>
            <span style={{ color: '#00f9ff' }}>Symbol: {config.symbol}</span>
            <span style={{ color: '#39ff14' }}>Interval: {config.interval}</span>
            <span style={{ color: '#8000ff' }}>
              Price: ₹{candleData[candleData.length - 1]?.close.toFixed(2) || '0.00'}
            </span>
          </div>
        </div>
        
        {/* Chart Controls */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {['1m', '5m', '15m', '1h', '4h', '1d'].map(interval => (
            <button
              key={interval}
              onClick={() => setConfig(prev => ({ ...prev, interval: interval as any }))}
              style={{
                background: config.interval === interval 
                  ? 'linear-gradient(45deg, #00f9ff, #39ff14)'
                  : 'rgba(255,255,255,0.1)',
                color: config.interval === interval ? '#000000' : '#ffffff',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
            >
              {interval}
            </button>
          ))}
        </div>
      </div>

      {/* Drawing Tools */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
        flexWrap: 'wrap'
      }}>
        {[
          { tool: 'trendline', icon: '📏', name: 'Trendline' },
          { tool: 'fibonacci', icon: '🌀', name: 'Fibonacci' },
          { tool: 'rectangle', icon: '⬜', name: 'Rectangle' }
        ].map(({ tool, icon, name }) => (
          <button
            key={tool}
            onClick={() => setDrawingTool(drawingTool === tool ? null : tool as any)}
            style={{
              background: drawingTool === tool 
                ? 'rgba(0,249,255,0.3)' 
                : 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#ffffff',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            {icon} {name}
          </button>
        ))}
      </div>

      {/* Technical Indicators Panel */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
        flexWrap: 'wrap'
      }}>
        {['SMA20', 'EMA50', 'RSI', 'MACD', 'Bollinger Bands', 'Stochastic'].map(indicator => (
          <label
            key={indicator}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            <input
              type="checkbox"
              checked={config.indicators.includes(indicator)}
              onChange={(e) => {
                if (e.target.checked) {
                  setConfig(prev => ({
                    ...prev,
                    indicators: [...prev.indicators, indicator]
                  }));
                } else {
                  setConfig(prev => ({
                    ...prev,
                    indicators: prev.indicators.filter(i => i !== indicator)
                  }));
                }
              }}
              style={{ accentColor: '#00f9ff' }}
            />
            {indicator}
          </label>
        ))}
      </div>

      {/* Chart Canvas */}
      <div style={{
        position: 'relative',
        background: 'rgba(0,0,0,0.5)',
        borderRadius: '15px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <canvas
          ref={chartRef}
          width={chartDimensions.width}
          height={chartDimensions.height}
          onMouseMove={handleMouseMove}
          style={{
            width: '100%',
            height: 'auto',
            cursor: drawingTool ? 'crosshair' : 'default'
          }}
        />
        
        {/* Crosshair */}
        <div
          style={{
            position: 'absolute',
            left: mousePosition.x,
            top: 0,
            width: '1px',
            height: '100%',
            background: 'rgba(255,255,255,0.3)',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: mousePosition.y,
            width: '100%',
            height: '1px',
            background: 'rgba(255,255,255,0.3)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Chart Statistics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        {[
          { label: 'Volume', value: '₹45,234 Cr', color: '#00f9ff' },
          { label: '24h High', value: '₹21,890.45', color: '#39ff14' },
          { label: '24h Low', value: '₹21,756.23', color: '#ff4757' },
          { label: 'Volatility', value: '2.34%', color: '#8000ff' }
        ].map(stat => (
          <div
            key={stat.label}
            style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '1rem',
              borderRadius: '10px',
              textAlign: 'center'
            }}
          >
            <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>{stat.label}</div>
            <div style={{ 
              color: stat.color, 
              fontSize: '1.2rem', 
              fontWeight: 700,
              marginTop: '0.5rem'
            }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
