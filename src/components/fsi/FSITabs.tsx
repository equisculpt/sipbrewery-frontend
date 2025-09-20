import { Eye, TrendingUp, BarChart3, Shield, PieChart } from 'lucide-react';

interface FSITabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function FSITabs({ activeTab, setActiveTab }: FSITabsProps) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'future', label: 'Future Outlook', icon: TrendingUp },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'risk', label: 'Risk Analysis', icon: Shield },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart }
  ];

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-3 mb-12 border border-gray-800/50">
      <div className="flex space-x-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-3 py-5 px-8 rounded-2xl font-semibold transition-all duration-300 relative overflow-hidden group ${
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl shadow-blue-500/25 transform scale-[1.02]' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60 hover:shadow-lg hover:shadow-gray-900/20 hover:scale-[1.01]'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            <tab.icon className={`w-6 h-6 relative z-10 transition-all duration-300 ${
              activeTab === tab.id ? 'text-white' : 'group-hover:text-blue-400'
            }`} />
            <span className="relative z-10 text-base">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
