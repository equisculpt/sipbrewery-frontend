import { TrendingUp, Shield, Brain } from 'lucide-react';
import { FSIAnalysis } from '@/types/fsi';

interface OverviewTabProps {
  fsiAnalysis: FSIAnalysis | null;
}

export default function OverviewTab({ fsiAnalysis }: OverviewTabProps) {
  if (!fsiAnalysis) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400">Loading analysis data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Key Strengths and Areas of Concern */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Key Strengths */}
        <div className="bg-green-500/5 rounded-3xl p-10 border border-green-500/10">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-16 h-16 flex items-center justify-center bg-green-500/10 rounded-3xl">
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">Key Strengths</h3>
              <p className="text-gray-300 text-lg">Fund's competitive advantages</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {fsiAnalysis.keyStrengths.map((strength, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                  <span className="text-green-400 font-bold text-lg">✓</span>
                </div>
                <div>
                  <p className="text-gray-300 text-lg leading-relaxed">{strength}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Areas of Concern */}
        <div className="bg-orange-500/5 rounded-3xl p-10 border border-orange-500/10">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-16 h-16 flex items-center justify-center bg-orange-500/10 rounded-3xl">
              <Shield className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">Areas of Concern</h3>
              <p className="text-gray-300 text-lg">Risk factors to monitor</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {fsiAnalysis.areasOfConcern.map((concern, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center mt-1">
                  <span className="text-orange-400 font-bold text-lg">!</span>
                </div>
                <div>
                  <p className="text-gray-300 text-lg leading-relaxed">{concern}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-blue-500/5 rounded-3xl p-10 border border-blue-500/10">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-16 h-16 flex items-center justify-center bg-blue-500/10 rounded-3xl">
            <Brain className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-2">AI Recommendations</h3>
            <p className="text-gray-300 text-lg">Data-driven investment insights</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fsiAnalysis.aiRecommendations.map((recommendation, index) => (
            <div key={index} className="bg-gray-900/40 rounded-2xl p-6 border border-gray-700/30">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-1">
                  <span className="text-blue-400 font-bold text-sm">{index + 1}</span>
                </div>
                <p className="text-gray-300 leading-relaxed">{recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
