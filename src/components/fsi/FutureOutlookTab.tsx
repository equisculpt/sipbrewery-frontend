import { Building, Brain } from 'lucide-react';
import { Holding, MarketSentiment } from '@/types/fsi';

interface FutureOutlookTabProps {
  holdings: Holding[];
  marketSentiment: MarketSentiment | null;
}

export default function FutureOutlookTab({ holdings, marketSentiment }: FutureOutlookTabProps) {
  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 70) return 'bg-gradient-to-r from-green-500 to-green-400';
    if (percentage >= 50) return 'bg-gradient-to-r from-blue-500 to-blue-400';
    return 'bg-gradient-to-r from-red-500 to-red-400';
  };

  const getRowBgColor = (percentage: number) => {
    if (percentage >= 70) return 'bg-green-500/8 hover:bg-green-500/12';
    if (percentage >= 50) return 'bg-blue-500/6 hover:bg-blue-500/10';
    return 'bg-red-500/6 hover:bg-red-500/10';
  };

  const getTextColor = (percentage: number) => {
    if (percentage >= 70) return 'text-green-300';
    if (percentage >= 50) return 'text-blue-300';
    return 'text-red-300';
  };

  return (
    <div className="space-y-12">
      {/* Top Holdings Future Analysis */}
      <div className="bg-gray-900/30 rounded-3xl p-10 border border-gray-700/50">
        <div className="flex items-center space-x-6 mb-10">
          <div className="w-16 h-16 flex items-center justify-center bg-green-500/10 rounded-3xl">
            <Building className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-2">Top Holdings Future Analysis</h3>
            <p className="text-gray-300 text-lg">AI-powered analysis of portfolio's major holdings</p>
          </div>
        </div>
        
        <div className="space-y-20">
          {holdings.slice(0, 10).map((stock, index) => (
            <div key={stock.id}>
              {/* Company Header */}
              <h4 className="text-white font-bold text-3xl mb-8">{index + 1}) {stock.name}</h4>
              
              {/* Metrics Table */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10 p-6 bg-gray-900/20 rounded-xl border border-gray-800/50">
                <div className="text-center">
                  <div className={`text-xl font-bold mb-1 ${
                    stock.prediction > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>+{stock.prediction}%</div>
                  <div className="text-gray-400 text-sm">Prediction</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold mb-1 ${
                    stock.confidence === 'Very High' ? 'text-green-400' :
                    stock.confidence === 'High' ? 'text-blue-400' :
                    'text-yellow-400'
                  }`}>{stock.confidence}</div>
                  <div className="text-gray-400 text-sm">Confidence</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-lg mb-1">{stock.allocation}%</div>
                  <div className="text-gray-400 text-sm">Portfolio</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-lg mb-1">₹{stock.currentPrice}</div>
                  <div className="text-gray-400 text-sm">Current Price</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-lg mb-1">{stock.peRatio}</div>
                  <div className="text-gray-400 text-sm">P/E Ratio</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-lg mb-1">{stock.marketCap}</div>
                  <div className="text-gray-400 text-sm">Market Cap</div>
                </div>
              </div>
              
              {/* Comprehensive Analysis */}
              <div className="mb-12">
                <h5 className="text-white font-bold text-xl mb-8">Comprehensive Analysis</h5>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Strengths */}
                  <div>
                    <h6 className="text-green-400 font-semibold text-lg mb-6">Key Strengths</h6>
                    <div className="space-y-4">
                      {stock.strengths.map((strength, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <span className="text-green-400 font-bold mt-1">•</span>
                          <span className="text-gray-300 leading-relaxed">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Weaknesses */}
                  <div>
                    <h6 className="text-orange-400 font-semibold text-lg mb-6">Key Concerns</h6>
                    <div className="space-y-4">
                      {stock.weaknesses.map((weakness, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <span className="text-orange-400 font-bold mt-1">•</span>
                          <span className="text-gray-300 leading-relaxed">{weakness}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Separator Line - Only show if not the last item */}
              {index < 9 && (
                <div className="flex items-center justify-center my-16">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                  <div className="mx-6 text-gray-500 text-sm font-medium">• • •</div>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Market Sentiment Analysis */}
      {marketSentiment && (
        <div className="bg-green-500/5 rounded-3xl p-12 border border-green-500/10">
          <div className="flex items-center space-x-8 mb-16">
            <div className="w-20 h-20 flex items-center justify-center bg-green-500/10 rounded-3xl">
              <Brain className="w-10 h-10 text-green-500" />
            </div>
            <div>
              <h3 className="text-4xl font-bold text-white mb-3">AI Market Sentiment & Timing Analysis</h3>
              <p className="text-gray-300 text-xl">Advanced market intelligence and optimal investment timing insights</p>
            </div>
          </div>
          
          {/* Market Metrics Table */}
          <div className="bg-gray-900/40 rounded-3xl border border-gray-700/50 overflow-hidden mb-12 shadow-2xl">
            <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 px-8 py-6 border-b border-gray-600/30">
              <h4 className="text-2xl font-bold text-white flex items-center">
                <div className="w-2 h-8 bg-blue-400 rounded-full mr-4"></div>
                Current Market Metrics
              </h4>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-800/60 to-slate-700/60">
                    <th className="text-left py-5 px-8 text-slate-200 font-bold text-lg border-b-2 border-slate-600/40">Market Parameter</th>
                    <th className="text-center py-5 px-8 text-slate-200 font-bold text-lg border-b-2 border-slate-600/40">Current Value</th>
                    <th className="text-center py-5 px-8 text-slate-200 font-bold text-lg border-b-2 border-slate-600/40">Trend</th>
                    <th className="text-center py-5 px-8 text-slate-200 font-bold text-lg border-b-2 border-slate-600/40">Signal Strength</th>
                    <th className="text-right py-5 px-8 text-slate-200 font-bold text-lg border-b-2 border-slate-600/40">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`${getRowBgColor(marketSentiment.overallMarket.percentage)} transition-all duration-300 border-b border-gray-700/20`}>
                    <td className="py-6 px-8 text-white font-semibold text-lg">Overall Market Sentiment</td>
                    <td className="py-6 px-8 text-center">
                      <span className={`font-bold text-xl ${getTextColor(marketSentiment.overallMarket.percentage)}`}>
                        {marketSentiment.overallMarket.value}
                      </span>
                    </td>
                    <td className="py-6 px-8 text-center">
                      <span className={`font-semibold text-lg ${getTextColor(marketSentiment.overallMarket.percentage)}`}>
                        {marketSentiment.overallMarket.trend}
                      </span>
                    </td>
                    <td className="py-6 px-8 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-20 bg-gray-700/50 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${getProgressBarColor(marketSentiment.overallMarket.percentage)}`}
                            style={{ width: `${marketSentiment.overallMarket.percentage}%` }}
                          ></div>
                        </div>
                        <span className={`font-bold text-sm ${getTextColor(marketSentiment.overallMarket.percentage)}`}>
                          {marketSentiment.overallMarket.percentage}%
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-8 text-right">
                      <span className={`font-bold text-lg ${getTextColor(marketSentiment.overallMarket.percentage)}`}>
                        {marketSentiment.overallMarket.confidence}
                      </span>
                    </td>
                  </tr>
                  
                  {/* Additional market metrics rows */}
                  {Object.entries(marketSentiment).slice(1).map(([key, metric]) => (
                    <tr key={key} className={`${getRowBgColor(metric.percentage)} transition-all duration-300 border-b border-gray-700/20`}>
                      <td className="py-6 px-8 text-white font-semibold text-lg">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </td>
                      <td className="py-6 px-8 text-center">
                        <span className={`font-bold text-xl ${getTextColor(metric.percentage)}`}>
                          {metric.value}
                        </span>
                      </td>
                      <td className="py-6 px-8 text-center">
                        <span className={`font-semibold text-lg ${getTextColor(metric.percentage)}`}>
                          {metric.trend}
                        </span>
                      </td>
                      <td className="py-6 px-8 text-center">
                        <div className="flex items-center justify-center space-x-3">
                          <div className="w-20 bg-gray-700/50 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full ${getProgressBarColor(metric.percentage)}`}
                              style={{ width: `${metric.percentage}%` }}
                            ></div>
                          </div>
                          <span className={`font-bold text-sm ${getTextColor(metric.percentage)}`}>
                            {metric.percentage}%
                          </span>
                        </div>
                      </td>
                      <td className="py-6 px-8 text-right">
                        <span className={`font-bold text-lg ${getTextColor(metric.percentage)}`}>
                          {metric.confidence}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
