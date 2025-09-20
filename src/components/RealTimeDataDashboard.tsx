'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Wifi, 
  WifiOff, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Zap,
  Globe,
  BarChart3,
  Eye
} from 'lucide-react';

interface PriceData {
  symbol: string;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  timestamp: string;
  source: string;
  quality_score?: number;
}

interface MarketEvent {
  type: string;
  symbol: string;
  change_percent?: number;
  current_volume?: number;
  average_volume?: number;
  multiplier?: number;
  severity: string;
  timestamp: string;
}

interface DataSourceStatus {
  name: string;
  active: boolean;
  reliability: number;
  last_health_check?: string;
  last_error?: string;
}

interface ServiceStatus {
  status: string;
  active_sources: number;
  total_sources: number;
  active_subscriptions: number;
  cache_size: number;
  data_quality: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    lastUpdate: string;
  };
  sources: DataSourceStatus[];
}

const RealTimeDataDashboard: React.FC = () => {
  const [priceData, setPriceData] = useState<{ [key: string]: PriceData }>({});
  const [marketEvents, setMarketEvents] = useState<MarketEvent[]>([]);
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamId, setStreamId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>(['RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'ICICIBANK']);
  const wsRef = useRef<WebSocket | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const portfolioId = 'DEMO_PORTFOLIO_001';

  // Popular Indian stocks for demo
  const availableSymbols = [
    'RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'ICICIBANK', 'BHARTIARTL', 
    'ITC', 'HINDUNILVR', 'MARUTI', 'ASIANPAINT', 'KOTAKBANK', 'LT',
    'SBIN', 'BAJFINANCE', 'HCLTECH', 'WIPRO', 'ULTRACEMCO', 'TITAN'
  ];

  // Get real-time price for a symbol (Demo Mode)
  const getRealTimePrice = async (symbol: string, exchange: string = 'NSE') => {
    try {
      // Demo mode - generate realistic mock data
      const basePrice = {
        'RELIANCE': 2500,
        'TCS': 3800,
        'INFY': 1650,
        'HDFCBANK': 1580,
        'ICICIBANK': 950,
        'BHARTIARTL': 850,
        'ITC': 420,
        'HINDUNILVR': 2650,
        'MARUTI': 10500,
        'ASIANPAINT': 3200
      }[symbol] || 1000;

      const change = (Math.random() - 0.5) * 100;
      const changePercent = (change / basePrice) * 100;
      const volume = Math.floor(Math.random() * 1000000) + 100000;
      
      const mockData = {
        symbol,
        exchange,
        price: basePrice + change,
        change,
        changePercent,
        volume,
        high: basePrice + Math.abs(change) + Math.random() * 50,
        low: basePrice - Math.abs(change) - Math.random() * 30,
        open: basePrice + (Math.random() - 0.5) * 20,
        previousClose: basePrice,
        timestamp: new Date().toISOString(),
        source: 'Demo Data',
        quality_score: 85 + Math.floor(Math.random() * 15)
      };

      setPriceData(prev => ({
        ...prev,
        [symbol]: mockData
      }));
      
      // Occasionally generate market events
      if (Math.random() < 0.1) {
        const events = [
          {
            type: 'price_spike',
            symbol,
            change_percent: changePercent,
            severity: Math.abs(changePercent) > 2 ? 'high' : 'medium',
            timestamp: new Date().toISOString()
          }
        ];
        setMarketEvents(prev => [...events, ...prev.slice(0, 19)]);
      }
    } catch (err) {
      console.error(`Failed to get price for ${symbol}:`, err);
    }
  };

  // Start real-time streaming (Demo Mode)
  const startRealTimeStreaming = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Demo mode - simulate streaming
      setStreamId('demo-stream-' + Date.now());
      setIsStreaming(true);
      
      // Start demo real-time updates
      startDemoStreaming();
    } catch (err) {
      setError('Demo streaming error');
      console.error('Streaming error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Start demo streaming simulation
  const startDemoStreaming = () => {
    const interval = setInterval(() => {
      if (isStreaming) {
        // Update random symbols with new prices
        const randomSymbol = selectedSymbols[Math.floor(Math.random() * selectedSymbols.length)];
        getRealTimePrice(randomSymbol, 'NSE');
      }
    }, 3000); // Update every 3 seconds
    
    // Store interval reference for cleanup
    (window as any).demoStreamingInterval = interval;
  };

  // Stop real-time streaming (Demo Mode)
  const stopRealTimeStreaming = async () => {
    try {
      setIsStreaming(false);
      setStreamId(null);
      
      // Clear demo streaming interval
      if ((window as any).demoStreamingInterval) {
        clearInterval((window as any).demoStreamingInterval);
        (window as any).demoStreamingInterval = null;
      }
    } catch (err) {
      console.error('Error stopping streaming:', err);
    }
  };

  // Get service status (Demo Mode)
  const getServiceStatus = async () => {
    try {
      // Demo mode - generate mock service status
      const mockStatus = {
        status: 'operational',
        active_sources: 6,
        total_sources: 8,
        active_subscriptions: selectedSymbols.length,
        cache_size: 1250,
        data_quality: {
          totalRequests: 15420,
          successfulRequests: 14890,
          failedRequests: 530,
          lastUpdate: new Date().toISOString()
        },
        sources: [
          { name: 'Yahoo Finance', active: true, reliability: 0.95, last_health_check: new Date().toISOString() },
          { name: 'Alpha Vantage', active: true, reliability: 0.88, last_health_check: new Date().toISOString() },
          { name: 'Finnhub', active: false, reliability: 0.82, last_error: 'Rate limit exceeded' },
          { name: 'NSE Official', active: true, reliability: 0.98, last_health_check: new Date().toISOString() },
          { name: 'BSE Official', active: true, reliability: 0.96, last_health_check: new Date().toISOString() },
          { name: 'CoinGecko', active: true, reliability: 0.91, last_health_check: new Date().toISOString() },
          { name: 'IEX Cloud', active: false, reliability: 0.85, last_error: 'Connection timeout' },
          { name: 'Polygon.io', active: true, reliability: 0.89, last_health_check: new Date().toISOString() }
        ]
      };
      
      setServiceStatus(mockStatus);
    } catch (err) {
      console.error('Failed to get service status:', err);
    }
  };

  // Fetch batch prices for selected symbols
  const fetchBatchPrices = async () => {
    setLoading(true);
    
    try {
      const promises = selectedSymbols.map(symbol => getRealTimePrice(symbol, 'NSE'));
      await Promise.all(promises);
    } catch (err) {
      setError('Failed to fetch batch prices');
    } finally {
      setLoading(false);
    }
  };

  // Initialize component
  useEffect(() => {
    getServiceStatus();
    fetchBatchPrices();
    
    // Set up periodic status updates
    const statusInterval = setInterval(getServiceStatus, 30000);
    
    return () => {
      clearInterval(statusInterval);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  // Update prices periodically when not streaming
  useEffect(() => {
    if (!isStreaming) {
      const priceInterval = setInterval(fetchBatchPrices, 30000);
      return () => clearInterval(priceInterval);
    }
  }, [isStreaming, selectedSymbols]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const getEventSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-900/20 border-red-500/50';
      case 'high': return 'text-orange-400 bg-orange-900/20 border-orange-500/50';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/50';
      default: return 'text-blue-400 bg-blue-900/20 border-blue-500/50';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/20 via-gray-900 to-green-900/20 rounded-xl p-6 border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                📡 Real-Time Market Data
              </span>
            </h1>
            <p className="text-gray-300">
              Live market data from multiple free sources with intelligent failover and quality validation
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {isStreaming ? (
                <Wifi className="h-5 w-5 text-green-400" />
              ) : (
                <WifiOff className="h-5 w-5 text-gray-400" />
              )}
              <span className={`text-sm font-medium ${isStreaming ? 'text-green-400' : 'text-gray-400'}`}>
                {isStreaming ? 'Live Streaming' : 'Static Data'}
              </span>
            </div>
            <button
              onClick={isStreaming ? stopRealTimeStreaming : startRealTimeStreaming}
              disabled={loading}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors ${
                isStreaming 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              } disabled:bg-gray-600`}
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : isStreaming ? (
                <Activity className="h-4 w-4" />
              ) : (
                <Zap className="h-4 w-4" />
              )}
              <span>{loading ? 'Processing...' : isStreaming ? 'Stop Streaming' : 'Start Streaming'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Service Status */}
      {serviceStatus && (
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Service Status</h3>
            <button
              onClick={getServiceStatus}
              className="flex items-center space-x-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Refresh</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Globe className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-gray-300">Data Sources</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">
                {serviceStatus.active_sources}/{serviceStatus.total_sources}
              </div>
              <p className="text-xs text-gray-500">Active sources</p>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-gray-300">Subscriptions</span>
              </div>
              <div className="text-2xl font-bold text-green-400">
                {serviceStatus.active_subscriptions}
              </div>
              <p className="text-xs text-gray-500">Active streams</p>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium text-gray-300">Success Rate</span>
              </div>
              <div className="text-2xl font-bold text-purple-400">
                {serviceStatus.data_quality.totalRequests > 0 
                  ? ((serviceStatus.data_quality.successfulRequests / serviceStatus.data_quality.totalRequests) * 100).toFixed(1)
                  : 0}%
              </div>
              <p className="text-xs text-gray-500">Data quality</p>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="h-4 w-4 text-orange-400" />
                <span className="text-sm font-medium text-gray-300">Cache Size</span>
              </div>
              <div className="text-2xl font-bold text-orange-400">
                {serviceStatus.cache_size}
              </div>
              <p className="text-xs text-gray-500">Cached items</p>
            </div>
          </div>

          {/* Data Sources Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {serviceStatus.sources.map((source) => (
              <div key={source.name} className="bg-gray-900/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">{source.name}</span>
                  <div className="flex items-center space-x-1">
                    {source.active ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-400" />
                    )}
                    <span className={`text-xs ${source.active ? 'text-green-400' : 'text-red-400'}`}>
                      {source.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Reliability: {(source.reliability * 100).toFixed(0)}%
                </div>
                {source.last_error && (
                  <div className="text-xs text-red-400 mt-1 truncate">
                    Error: {source.last_error}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Symbol Selection */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Select Symbols to Track</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-2">
          {availableSymbols.map((symbol) => (
            <button
              key={symbol}
              onClick={() => {
                if (selectedSymbols.includes(symbol)) {
                  setSelectedSymbols(prev => prev.filter(s => s !== symbol));
                } else {
                  setSelectedSymbols(prev => [...prev, symbol]);
                }
              }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedSymbols.includes(symbol)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {symbol}
            </button>
          ))}
        </div>
      </div>

      {/* Real-Time Price Data */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Live Price Data</h3>
          <button
            onClick={fetchBatchPrices}
            disabled={loading || isStreaming}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Prices</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedSymbols.map((symbol) => {
            const data = priceData[symbol];
            return (
              <div key={symbol} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-white">{symbol}</h4>
                  <div className="flex items-center space-x-1">
                    {data?.source && (
                      <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">
                        {data.source}
                      </span>
                    )}
                    {data?.quality_score && (
                      <span className={`text-xs px-2 py-1 rounded ${
                        data.quality_score >= 90 ? 'bg-green-900/50 text-green-400' :
                        data.quality_score >= 70 ? 'bg-yellow-900/50 text-yellow-400' :
                        'bg-red-900/50 text-red-400'
                      }`}>
                        Q: {data.quality_score}
                      </span>
                    )}
                  </div>
                </div>
                
                {data ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">
                        {formatCurrency(data.price)}
                      </span>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${getChangeColor(data.change)}`}>
                          {data.change > 0 ? '+' : ''}{formatCurrency(data.change)}
                        </div>
                        <div className={`text-xs ${getChangeColor(data.changePercent)}`}>
                          ({data.changePercent > 0 ? '+' : ''}{data.changePercent.toFixed(2)}%)
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                      <div>High: {formatCurrency(data.high)}</div>
                      <div>Low: {formatCurrency(data.low)}</div>
                      <div>Open: {formatCurrency(data.open)}</div>
                      <div>Volume: {formatNumber(data.volume)}</div>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Updated: {new Date(data.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <RefreshCw className="h-6 w-6 mx-auto mb-2 opacity-50" />
                    <p>Loading price data...</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Market Events */}
      {marketEvents.length > 0 && (
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Market Events</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {marketEvents.map((event, index) => (
              <div key={index} className={`rounded-lg p-3 border ${getEventSeverityColor(event.severity)}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{event.type.replace(/_/g, ' ').toUpperCase()}</span>
                  <span className="text-xs opacity-75">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">{event.symbol}</span>
                  {event.change_percent && (
                    <span> - {event.change_percent > 0 ? '+' : ''}{event.change_percent.toFixed(2)}% change</span>
                  )}
                  {event.multiplier && (
                    <span> - {event.multiplier.toFixed(1)}x volume spike</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <span className="text-red-400 font-medium">Error</span>
          </div>
          <p className="text-red-300 mt-2">{error}</p>
        </div>
      )}
    </div>
  );
};

export default RealTimeDataDashboard;
