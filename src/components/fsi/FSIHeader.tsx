import { ArrowLeft } from 'lucide-react';
import { FundBasicInfo } from '@/types/fsi';

interface FSIHeaderProps {
  fundInfo: FundBasicInfo | null;
}

export default function FSIHeader({ fundInfo }: FSIHeaderProps) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-400" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {fundInfo?.name || 'Loading...'}
              </h1>
              <p className="text-gray-400">
                {fundInfo?.category} • AUM: {fundInfo?.aum}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-400">
              ₹{fundInfo?.nav || '---'}
            </div>
            <div className="text-gray-400">Current NAV</div>
          </div>
        </div>
      </div>
    </div>
  );
}
