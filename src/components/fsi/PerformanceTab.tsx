import { BarChart3, TrendingUp } from 'lucide-react';
import { PerformanceData } from '@/types/fsi';

interface PerformanceTabProps {
  performance: PerformanceData | null;
}

export default function PerformanceTab({ performance }: PerformanceTabProps) {
  if (!performance) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400">Loading performance data...</div>
      </div>
    );
  }

  const periods = ['1M', '3M', '6M', '1Y', '3Y', '5Y'];

  const getPerformanceColor = (fundReturn: number, benchmarkReturn: number) => {
    if (fundReturn > benchmarkReturn) return 'text-green-400';
    if (fundReturn < benchmarkReturn) return 'text-red-400';
    return 'text-yellow-400';
  };

  return (
    <div className="space-y-12">
      {/* Performance Comparison */}
      <div className="bg-gray-900/30 rounded-3xl p-10 border border-gray-700/50">
        <div className="flex items-center space-x-6 mb-10">
          <div className="w-16 h-16 flex items-center justify-center bg-blue-500/10 rounded-3xl">
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-2">Performance Analysis</h3>
            <p className="text-gray-300 text-lg">Fund performance vs benchmark comparison</p>
          </div>
        </div>

        {/* Performance Table */}
        <div className="bg-gray-900/40 rounded-2xl border border-gray-700/50 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 px-8 py-6 border-b border-gray-600/30">
            <h4 className="text-2xl font-bold text-white">Returns Comparison</h4>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-800/60 to-slate-700/60">
                  <th className="text-left py-5 px-8 text-slate-200 font-bold text-lg border-b-2 border-slate-600/40">Period</th>
                  <th className="text-center py-5 px-8 text-slate-200 font-bold text-lg border-b-2 border-slate-600/40">Fund Returns</th>
                  <th className="text-center py-5 px-8 text-slate-200 font-bold text-lg border-b-2 border-slate-600/40">Benchmark Returns</th>
                  <th className="text-center py-5 px-8 text-slate-200 font-bold text-lg border-b-2 border-slate-600/40">Outperformance</th>
                  <th className="text-right py-5 px-8 text-slate-200 font-bold text-lg border-b-2 border-slate-600/40">Status</th>
                </tr>
              </thead>
              <tbody>
                {periods.map((period) => {
                  const fundReturn = performance.returns[period as keyof typeof performance.returns];
                  const benchmarkReturn = performance.benchmark[period as keyof typeof performance.benchmark];
                  const outperformance = fundReturn - benchmarkReturn;
                  
                  return (
                    <tr key={period} className="hover:bg-gray-800/30 transition-colors border-b border-gray-700/20">
                      <td className="py-6 px-8 text-white font-semibold text-lg">{period}</td>
                      <td className="py-6 px-8 text-center">
                        <span className={`font-bold text-xl ${getPerformanceColor(fundReturn, benchmarkReturn)}`}>
                          {fundReturn > 0 ? '+' : ''}{fundReturn.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-6 px-8 text-center">
                        <span className="font-bold text-xl text-gray-300">
                          {benchmarkReturn > 0 ? '+' : ''}{benchmarkReturn.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-6 px-8 text-center">
                        <span className={`font-bold text-xl ${
                          outperformance > 0 ? 'text-green-400' : 
                          outperformance < 0 ? 'text-red-400' : 'text-yellow-400'
                        }`}>
                          {outperformance > 0 ? '+' : ''}{outperformance.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-6 px-8 text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          outperformance > 0 ? 'bg-green-500/20 text-green-400' :
                          outperformance < 0 ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {outperformance > 0 ? 'Outperformed' : 
                           outperformance < 0 ? 'Underperformed' : 'Matched'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* NAV Chart Placeholder */}
      <div className="bg-gray-900/30 rounded-3xl p-10 border border-gray-700/50">
        <div className="flex items-center space-x-6 mb-10">
          <div className="w-16 h-16 flex items-center justify-center bg-green-500/10 rounded-3xl">
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-2">NAV Growth Chart</h3>
            <p className="text-gray-300 text-lg">Historical NAV performance visualization</p>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-gray-900/40 rounded-2xl border border-gray-700/50 p-8 h-96 flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-400 mb-2">Interactive Chart</h4>
            <p className="text-gray-500">NAV growth visualization will be integrated here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
