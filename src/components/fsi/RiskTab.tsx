import { Shield, AlertTriangle } from 'lucide-react';
import { RiskMetrics } from '@/types/fsi';

interface RiskTabProps {
  riskMetrics: RiskMetrics | null;
}

export default function RiskTab({ riskMetrics }: RiskTabProps) {
  if (!riskMetrics) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400">Loading risk metrics...</div>
      </div>
    );
  }

  const getRiskLevel = (value: number, metric: string) => {
    switch (metric) {
      case 'volatility':
        if (value < 10) return { level: 'Low', color: 'text-green-400' };
        if (value < 20) return { level: 'Medium', color: 'text-yellow-400' };
        return { level: 'High', color: 'text-red-400' };
      case 'beta':
        if (value < 0.8) return { level: 'Low', color: 'text-green-400' };
        if (value < 1.2) return { level: 'Medium', color: 'text-yellow-400' };
        return { level: 'High', color: 'text-red-400' };
      case 'maxDrawdown':
        if (value > -10) return { level: 'Low', color: 'text-green-400' };
        if (value > -20) return { level: 'Medium', color: 'text-yellow-400' };
        return { level: 'High', color: 'text-red-400' };
      default:
        return { level: 'Medium', color: 'text-yellow-400' };
    }
  };

  const riskMetricsData = [
    {
      name: 'Volatility',
      value: `${riskMetrics.volatility.toFixed(2)}%`,
      description: 'Measure of price fluctuation',
      risk: getRiskLevel(riskMetrics.volatility, 'volatility')
    },
    {
      name: 'Beta',
      value: riskMetrics.beta.toFixed(2),
      description: 'Sensitivity to market movements',
      risk: getRiskLevel(riskMetrics.beta, 'beta')
    },
    {
      name: 'Sharpe Ratio',
      value: riskMetrics.sharpeRatio.toFixed(2),
      description: 'Risk-adjusted returns',
      risk: { level: riskMetrics.sharpeRatio > 1 ? 'Good' : 'Fair', color: riskMetrics.sharpeRatio > 1 ? 'text-green-400' : 'text-yellow-400' }
    },
    {
      name: 'Max Drawdown',
      value: `${riskMetrics.maxDrawdown.toFixed(2)}%`,
      description: 'Largest peak-to-trough decline',
      risk: getRiskLevel(riskMetrics.maxDrawdown, 'maxDrawdown')
    },
    {
      name: 'Value at Risk (95%)',
      value: `${riskMetrics.var95.toFixed(2)}%`,
      description: 'Potential loss in worst 5% scenarios',
      risk: { level: 'Monitor', color: 'text-orange-400' }
    },
    {
      name: 'Information Ratio',
      value: riskMetrics.informationRatio.toFixed(2),
      description: 'Active return per unit of active risk',
      risk: { level: riskMetrics.informationRatio > 0.5 ? 'Good' : 'Fair', color: riskMetrics.informationRatio > 0.5 ? 'text-green-400' : 'text-yellow-400' }
    }
  ];

  return (
    <div className="space-y-12">
      {/* Risk Metrics Overview */}
      <div className="bg-gray-900/30 rounded-3xl p-10 border border-gray-700/50">
        <div className="flex items-center space-x-6 mb-10">
          <div className="w-16 h-16 flex items-center justify-center bg-orange-500/10 rounded-3xl">
            <Shield className="w-8 h-8 text-orange-500" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-2">Risk Analysis</h3>
            <p className="text-gray-300 text-lg">Comprehensive risk assessment and metrics</p>
          </div>
        </div>

        {/* Risk Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {riskMetricsData.map((metric, index) => (
            <div key={metric.name} className="bg-gray-900/40 rounded-2xl p-6 border border-gray-700/30">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-bold text-lg">{metric.name}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  metric.risk.level === 'Low' || metric.risk.level === 'Good' ? 'bg-green-500/20 text-green-400' :
                  metric.risk.level === 'Medium' || metric.risk.level === 'Fair' ? 'bg-yellow-500/20 text-yellow-400' :
                  metric.risk.level === 'High' ? 'bg-red-500/20 text-red-400' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  {metric.risk.level}
                </span>
              </div>
              
              <div className={`text-3xl font-bold mb-2 ${metric.risk.color}`}>
                {metric.value}
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Assessment Summary */}
      <div className="bg-orange-500/5 rounded-3xl p-10 border border-orange-500/10">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-16 h-16 flex items-center justify-center bg-orange-500/10 rounded-3xl">
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-2">Risk Assessment Summary</h3>
            <p className="text-gray-300 text-lg">Key risk factors and recommendations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Risk Factors */}
          <div>
            <h4 className="text-orange-400 font-bold text-xl mb-6">Key Risk Factors</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-orange-400 font-bold mt-1">•</span>
                <span className="text-gray-300 leading-relaxed">
                  Market volatility may impact short-term performance
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-orange-400 font-bold mt-1">•</span>
                <span className="text-gray-300 leading-relaxed">
                  Concentration risk in specific sectors or stocks
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-orange-400 font-bold mt-1">•</span>
                <span className="text-gray-300 leading-relaxed">
                  Interest rate sensitivity affecting fund performance
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-orange-400 font-bold mt-1">•</span>
                <span className="text-gray-300 leading-relaxed">
                  Liquidity risk during market stress periods
                </span>
              </div>
            </div>
          </div>

          {/* Risk Mitigation */}
          <div>
            <h4 className="text-blue-400 font-bold text-xl mb-6">Risk Mitigation Strategies</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-blue-400 font-bold mt-1">•</span>
                <span className="text-gray-300 leading-relaxed">
                  Diversified portfolio across sectors and market caps
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-blue-400 font-bold mt-1">•</span>
                <span className="text-gray-300 leading-relaxed">
                  Active fund management with risk monitoring
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-blue-400 font-bold mt-1">•</span>
                <span className="text-gray-300 leading-relaxed">
                  Regular portfolio rebalancing and position sizing
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-blue-400 font-bold mt-1">•</span>
                <span className="text-gray-300 leading-relaxed">
                  Systematic investment approach for volatility averaging
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
