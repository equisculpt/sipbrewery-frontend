'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FUND MANAGER INTIMIDATION DASHBOARD
 * 
 * This dashboard is designed to showcase our institutional-grade analysis
 * capabilities that will make fund managers fear our predictive accuracy
 * and seek partnerships with SIP Brewery.
 */

interface FundManagerAnalysis {
  managerId: string;
  managerName: string;
  fundCode: string;
  fundName: string;
  overallGrade: string;
  confidenceScore: number;
  predictiveAccuracy: number;
  riskWarnings: any[];
  futureDecisions: any;
  institutionalRating: string;
}

interface StockPrediction {
  symbol: string;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  timeHorizon: number;
  recommendation: string;
  riskLevel: string;
}

export default function FundManagerIntimidationDashboard() {
  const [selectedManager, setSelectedManager] = useState<string>('');
  const [managerAnalysis, setManagerAnalysis] = useState<FundManagerAnalysis | null>(null);
  const [stockPredictions, setStockPredictions] = useState<StockPrediction[]>([]);
  const [intimidationLevel, setIntimidationLevel] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  // Mock data for demonstration
  const fundManagers = [
    { id: 'FM001', name: 'Prashant Jain', fund: 'HDFC Top 100 Fund', aum: '₹45,000 Cr' },
    { id: 'FM002', name: 'Rajeev Thakkar', fund: 'PPFAS Long Term Equity', aum: '₹12,000 Cr' },
    { id: 'FM003', name: 'Sankaran Naren', fund: 'ICICI Prudential Bluechip', aum: '₹38,000 Cr' },
    { id: 'FM004', name: 'Neelesh Surana', fund: 'Mirae Asset Large Cap', aum: '₹28,000 Cr' },
    { id: 'FM005', name: 'Jinesh Gopani', fund: 'Axis Bluechip Fund', aum: '₹22,000 Cr' }
  ];

  useEffect(() => {
    // Simulate real-time intimidation level calculation
    const interval = setInterval(() => {
      setIntimidationLevel(prev => Math.min(prev + Math.random() * 2, 100));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const analyzeManager = async (managerId: string) => {
    setIsAnalyzing(true);
    
    // Simulate advanced analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockAnalysis: FundManagerAnalysis = {
      managerId,
      managerName: fundManagers.find(m => m.id === managerId)?.name || '',
      fundCode: 'HDFC001',
      fundName: fundManagers.find(m => m.id === managerId)?.fund || '',
      overallGrade: 'A+',
      confidenceScore: 0.94,
      predictiveAccuracy: 0.87,
      riskWarnings: [
        { type: 'SECTOR_CONCENTRATION', severity: 'MEDIUM', message: 'High exposure to IT sector' },
        { type: 'STYLE_DRIFT', severity: 'LOW', message: 'Minor deviation from large-cap mandate' }
      ],
      futureDecisions: {
        '30_days': { likely_actions: ['Reduce IT allocation', 'Increase FMCG exposure'] },
        '90_days': { likely_actions: ['Sector rotation to financials', 'Defensive positioning'] }
      },
      institutionalRating: 'SUPERIOR'
    };

    setManagerAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const generateStockPredictions = () => {
    const stocks = ['RELIANCE', 'TCS', 'INFY', 'HDFC', 'ICICI', 'BAJAJ-AUTO', 'MARUTI', 'BHARTI'];
    const predictions: StockPrediction[] = stocks.map(symbol => ({
      symbol,
      currentPrice: Math.random() * 3000 + 500,
      predictedPrice: Math.random() * 3500 + 600,
      confidence: 0.75 + Math.random() * 0.2,
      timeHorizon: 30,
      recommendation: ['STRONG_BUY', 'BUY', 'HOLD', 'SELL'][Math.floor(Math.random() * 4)],
      riskLevel: ['LOW', 'MEDIUM', 'HIGH'][Math.floor(Math.random() * 3)]
    }));
    
    setStockPredictions(predictions);
  };

  useEffect(() => {
    generateStockPredictions();
    const interval = setInterval(generateStockPredictions, 10000);
    return () => clearInterval(interval);
  }, []);

  const getIntimidationColor = (level: number) => {
    if (level < 30) return 'text-green-400';
    if (level < 60) return 'text-yellow-400';
    if (level < 80) return 'text-orange-400';
    return 'text-red-400';
  };

  const getGradeColor = (grade: string) => {
    const gradeColors: { [key: string]: string } = {
      'A+': 'text-green-400',
      'A': 'text-green-300',
      'B+': 'text-yellow-400',
      'B': 'text-yellow-300',
      'C': 'text-orange-400',
      'D': 'text-red-400'
    };
    return gradeColors[grade] || 'text-gray-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
            🔥 FUND MANAGER INTIMIDATION DASHBOARD
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Institutional-Grade Analysis That Makes Fund Managers Seek Partnerships
          </p>
          <div className="flex justify-center items-center space-x-4">
            <div className="text-sm text-gray-400">
              Intimidation Level:
            </div>
            <div className={`text-2xl font-bold ${getIntimidationColor(intimidationLevel)}`}>
              {intimidationLevel.toFixed(1)}%
            </div>
            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400"
                style={{ width: `${intimidationLevel}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Fund Manager Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-1 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-4 text-orange-400">🎯 Target Fund Manager</h2>
          
          <div className="space-y-3">
            {fundManagers.map((manager) => (
              <motion.div
                key={manager.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedManager === manager.id
                    ? 'bg-orange-600/30 border-orange-400 border'
                    : 'bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600'
                }`}
                onClick={() => setSelectedManager(manager.id)}
              >
                <div className="font-semibold text-white">{manager.name}</div>
                <div className="text-sm text-gray-300">{manager.fund}</div>
                <div className="text-xs text-gray-400">AUM: {manager.aum}</div>
              </motion.div>
            ))}
          </div>

          {selectedManager && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-6 bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all"
              onClick={() => analyzeManager(selectedManager)}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                '🔍 INITIATE INTIMIDATION ANALYSIS'
              )}
            </motion.button>
          )}
        </motion.div>

        {/* Analysis Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:col-span-2 space-y-6"
        >
          {managerAnalysis && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-red-400">
                🎯 INSTITUTIONAL ANALYSIS RESULTS
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="text-sm text-gray-400">Overall Grade</div>
                  <div className={`text-2xl font-bold ${getGradeColor(managerAnalysis.overallGrade)}`}>
                    {managerAnalysis.overallGrade}
                  </div>
                </div>
                
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="text-sm text-gray-400">Confidence Score</div>
                  <div className="text-2xl font-bold text-green-400">
                    {(managerAnalysis.confidenceScore * 100).toFixed(1)}%
                  </div>
                </div>
                
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="text-sm text-gray-400">Predictive Accuracy</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {(managerAnalysis.predictiveAccuracy * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Risk Warnings */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-yellow-400">⚠️ Risk Warnings</h3>
                <div className="space-y-2">
                  {managerAnalysis.riskWarnings.map((warning, index) => (
                    <div key={index} className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-yellow-400">{warning.type}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          warning.severity === 'HIGH' ? 'bg-red-600' :
                          warning.severity === 'MEDIUM' ? 'bg-yellow-600' : 'bg-green-600'
                        }`}>
                          {warning.severity}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300 mt-1">{warning.message}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Future Predictions */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-purple-400">🔮 Future Decision Predictions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-900/30 border border-purple-600 rounded-lg p-4">
                    <div className="font-semibold text-purple-400 mb-2">Next 30 Days</div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {managerAnalysis.futureDecisions['30_days'].likely_actions.map((action: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-purple-900/30 border border-purple-600 rounded-lg p-4">
                    <div className="font-semibold text-purple-400 mb-2">Next 90 Days</div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {managerAnalysis.futureDecisions['90_days'].likely_actions.map((action: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stock Predictions */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">
              📊 REAL-TIME STOCK PREDICTIONS
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stockPredictions.slice(0, 8).map((prediction, index) => (
                <motion.div
                  key={prediction.symbol}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
                >
                  <div className="font-bold text-white mb-2">{prediction.symbol}</div>
                  <div className="text-sm text-gray-400 mb-1">
                    Current: ₹{prediction.currentPrice.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-400 mb-2">
                    Predicted: ₹{prediction.predictedPrice.toFixed(2)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded ${
                      prediction.recommendation === 'STRONG_BUY' ? 'bg-green-600' :
                      prediction.recommendation === 'BUY' ? 'bg-green-500' :
                      prediction.recommendation === 'HOLD' ? 'bg-yellow-600' : 'bg-red-600'
                    }`}>
                      {prediction.recommendation}
                    </span>
                    <span className="text-xs text-gray-400">
                      {(prediction.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Partnership CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-orange-900/50 to-red-900/50 backdrop-blur-sm rounded-xl p-6 border border-orange-600"
          >
            <h2 className="text-2xl font-bold mb-4 text-orange-400">
              🤝 PARTNERSHIP INVITATION
            </h2>
            <p className="text-gray-300 mb-4">
              Our institutional-grade analysis capabilities are now available for fund managers 
              who want to leverage our ASI for superior stock predictions and portfolio optimization.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 px-6 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all">
                Request Partnership
              </button>
              <button className="bg-gray-700 text-white py-2 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-all">
                Schedule Demo
              </button>
              <button className="bg-purple-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-all">
                Access ASI API
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
