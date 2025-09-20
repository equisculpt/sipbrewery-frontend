import { useState } from 'react';
import { PieChart, Building, TrendingUp } from 'lucide-react';
import { SectorAllocation, Holding } from '@/types/fsi';

interface PortfolioTabProps {
  sectorAllocation: SectorAllocation[];
  holdings: Holding[];
}

export default function PortfolioTab({ sectorAllocation, holdings }: PortfolioTabProps) {
  const [showAllHoldings, setShowAllHoldings] = useState(false);

  const getSectorColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600',
      'from-red-500 to-red-600',
      'from-yellow-500 to-yellow-600'
    ];
    return colors[index % colors.length];
  };

  const getASIRatingColor = (rating: string) => {
    switch (rating) {
      case 'A+':
        return 'bg-green-500/20 text-green-400';
      case 'A':
        return 'bg-blue-500/20 text-blue-400';
      case 'B+':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'B':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const displayedHoldings = showAllHoldings ? holdings : holdings.slice(0, 10);

  return (
    <div className="space-y-12">
      {/* Sector Allocation & Future Outlook */}
      <div className="bg-gray-900/30 rounded-3xl p-10 border border-gray-700/50">
        <div className="flex items-center space-x-6 mb-10">
          <div className="w-16 h-16 flex items-center justify-center bg-blue-500/10 rounded-3xl">
            <PieChart className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-2">Sector Allocation & Future Outlook</h3>
            <p className="text-gray-300 text-lg">Comprehensive sector-wise analysis with AI-powered insights</p>
          </div>
        </div>

        {/* Row-wise Sector Cards */}
        <div className="space-y-8">
          {sectorAllocation.map((sector, index) => (
            <div key={sector.name} className="bg-gray-900/40 rounded-2xl border border-gray-700/30 overflow-hidden">
              {/* Sector Header */}
              <div className={`bg-gradient-to-r ${getSectorColor(index)} p-6`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Building className="w-8 h-8 text-white" />
                    <div>
                      <h4 className="text-2xl font-bold text-white">{sector.name}</h4>
                      <p className="text-white/80">Portfolio Allocation: {sector.allocation}%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-xl">{sector.prediction}</div>
                    <div className="text-white/80 text-sm">Expected Growth</div>
                  </div>
                </div>
              </div>

              {/* Sector Content */}
              <div className="p-8">
                {/* Sector Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">{sector.performance}</div>
                    <div className="text-gray-400">Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{sector.outlook}</div>
                    <div className="text-gray-400">Outlook</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">{sector.prediction}</div>
                    <div className="text-gray-400">Prediction</div>
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="mb-8">
                  <h5 className="text-white font-bold text-lg mb-4">AI Analysis</h5>
                  <p className="text-gray-300 leading-relaxed">{sector.analysis}</p>
                </div>

                {/* Key Growth Factors and Risks */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Key Growth Factors */}
                  <div>
                    <h6 className="text-green-400 font-semibold text-lg mb-4">Key Growth Factors</h6>
                    <div className="space-y-3">
                      {sector.keyFactors.map((factor, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <span className="text-green-400 font-bold mt-1">•</span>
                          <span className="text-gray-300 leading-relaxed">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Risks */}
                  <div>
                    <h6 className="text-orange-400 font-semibold text-lg mb-4">Key Risks</h6>
                    <div className="space-y-3">
                      {sector.risks.map((risk, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <span className="text-orange-400 font-bold mt-1">•</span>
                          <span className="text-gray-300 leading-relaxed">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Detailed Sector Analysis Button */}
                <div className="text-center">
                  <button className={`px-8 py-3 bg-gradient-to-r ${getSectorColor(index)} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                    Detailed Sector Analysis
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Complete Portfolio Holdings */}
      <div className="bg-gray-900/30 rounded-3xl p-10 border border-gray-700/50">
        <div className="flex items-center space-x-6 mb-10">
          <div className="w-16 h-16 flex items-center justify-center bg-green-500/10 rounded-3xl">
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-2">Complete Portfolio Holdings</h3>
            <p className="text-gray-300 text-lg">Detailed analysis of all fund holdings with ASI ratings</p>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="bg-gray-900/40 rounded-2xl border border-gray-700/50 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 px-6 py-4 border-b border-gray-600/30">
            <div className="grid grid-cols-6 gap-4 text-gray-200 font-bold text-sm">
              <div>Stock Name</div>
              <div className="text-center">Allocation</div>
              <div className="text-center">Current Price</div>
              <div className="text-center">ASI Rating</div>
              <div className="text-center">Future Outlook</div>
              <div className="text-center">Analysis</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-700/30">
            {displayedHoldings.map((holding, index) => (
              <div key={holding.id} className="px-6 py-4 hover:bg-gray-800/30 transition-colors">
                <div className="grid grid-cols-6 gap-4 items-center">
                  <div>
                    <div className="text-white font-semibold">{holding.name}</div>
                    <div className="text-gray-400 text-sm">{holding.sector}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold">{holding.allocation}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold">₹{holding.currentPrice}</div>
                  </div>
                  <div className="text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getASIRatingColor(holding.asiRating)}`}>
                      {holding.asiRating}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className={`font-semibold ${
                      holding.futureOutlook === 'Very Positive' ? 'text-green-400' :
                      holding.futureOutlook === 'Positive' ? 'text-blue-400' :
                      holding.futureOutlook === 'Neutral' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {holding.futureOutlook}
                    </div>
                  </div>
                  <div className="text-center">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
                      Analyze
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {holdings.length > 10 && (
            <div className="p-6 text-center border-t border-gray-700/30">
              <button 
                onClick={() => setShowAllHoldings(!showAllHoldings)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                {showAllHoldings ? 'Show Less' : `Show All ${holdings.length} Holdings`}
              </button>
            </div>
          )}
        </div>

        {/* ASI Rating Legend */}
        <div className="mt-8 p-6 bg-gray-900/40 rounded-2xl border border-gray-700/30">
          <h4 className="text-white font-bold text-lg mb-4">ASI Rating Legend</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full text-sm font-bold bg-green-500/20 text-green-400">A+</span>
              <span className="text-gray-300">Exceptional Growth</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full text-sm font-bold bg-blue-500/20 text-blue-400">A</span>
              <span className="text-gray-300">Strong Performance</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full text-sm font-bold bg-yellow-500/20 text-yellow-400">B+</span>
              <span className="text-gray-300">Moderate Growth</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full text-sm font-bold bg-red-500/20 text-red-400">B</span>
              <span className="text-gray-300">Conservative</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
