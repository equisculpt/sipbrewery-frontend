import { FSIAnalysis } from '@/types/fsi';

interface FSIScoreCardProps {
  fsiAnalysis: FSIAnalysis | null;
}

export default function FSIScoreCard({ fsiAnalysis }: FSIScoreCardProps) {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
        return 'bg-green-500/20 text-green-400';
      case 'A':
        return 'bg-blue-500/20 text-blue-400';
      case 'B+':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'STRONG BUY':
        return 'text-green-400';
      case 'BUY':
        return 'text-blue-400';
      case 'HOLD':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-8 mb-12 border border-blue-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="text-center lg:text-left">
          <div className="text-6xl font-black text-blue-400 mb-2">
            {fsiAnalysis?.overallScore || '--'}
          </div>
          <div className="text-2xl font-bold text-white mb-2">FSI Score</div>
          <div className={`inline-flex px-4 py-2 rounded-full font-bold text-lg ${
            fsiAnalysis?.grade ? getGradeColor(fsiAnalysis.grade) : 'bg-gray-500/20 text-gray-400'
          }`}>
            Grade: {fsiAnalysis?.grade || '--'}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-2">Expected Returns</div>
          <div className="text-4xl font-bold text-green-400 mb-2">
            {fsiAnalysis?.expectedReturns || '--'}
          </div>
          <div className="text-gray-400">Annual Returns</div>
        </div>
        
        <div className="text-center lg:text-right">
          <div className="text-2xl font-bold text-white mb-2">Recommendation</div>
          <div className={`text-2xl font-bold mb-2 ${
            fsiAnalysis?.recommendation ? getRecommendationColor(fsiAnalysis.recommendation) : 'text-gray-400'
          }`}>
            {fsiAnalysis?.recommendation || '--'}
          </div>
          <div className="text-gray-400">
            Holding Period: {fsiAnalysis?.holdingPeriod || '--'}
          </div>
        </div>
      </div>
    </div>
  );
}
