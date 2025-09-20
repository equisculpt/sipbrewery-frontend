import React from 'react';
import { X } from 'lucide-react';

interface FilterPanelProps {
  showFilters: boolean;
  selectedCategory: string;
  selectedRisk: string;
  selectedReturns: string;
  selectedAUM: string;
  onCategoryChange: (category: string) => void;
  onRiskChange: (risk: string) => void;
  onReturnsChange: (returns: string) => void;
  onAUMChange: (aum: string) => void;
  onClearFilters: () => void;
  filteredCount: number;
  activeFiltersCount: number;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  showFilters,
  selectedCategory,
  selectedRisk,
  selectedReturns,
  selectedAUM,
  onCategoryChange,
  onRiskChange,
  onReturnsChange,
  onAUMChange,
  onClearFilters,
  filteredCount,
  activeFiltersCount
}) => {
  const categories = ['All', 'Large Cap', 'Mid Cap', 'Small Cap', 'Large & Mid Cap', 'Flexi Cap', 'Debt', 'Hybrid'];
  const riskLevels = ['All', 'Low', 'Moderately Low', 'Moderate', 'Moderately High', 'High', 'Very High'];
  const returnRanges = ['All', '0-10%', '10-15%', '15-20%', '20%+'];
  const aumRanges = ['All', '0-1000 Cr', '1000-5000 Cr', '5000-10000 Cr', '10000+ Cr'];

  if (!showFilters) return null;

  return (
    <div className="mb-8 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl animate-in slide-in-from-top duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-all"
          >
            {categories.map(category => (
              <option key={category} value={category} className="bg-gray-800">
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Risk Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">Risk Level</label>
          <select
            value={selectedRisk}
            onChange={(e) => onRiskChange(e.target.value)}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-all"
          >
            {riskLevels.map(risk => (
              <option key={risk} value={risk} className="bg-gray-800">
                {risk}
              </option>
            ))}
          </select>
        </div>

        {/* Returns Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">1Y Returns</label>
          <select
            value={selectedReturns}
            onChange={(e) => onReturnsChange(e.target.value)}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-all"
          >
            {returnRanges.map(range => (
              <option key={range} value={range} className="bg-gray-800">
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* AUM Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">AUM Size</label>
          <select
            value={selectedAUM}
            onChange={(e) => onAUMChange(e.target.value)}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-all"
          >
            {aumRanges.map(range => (
              <option key={range} value={range} className="bg-gray-800">
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Actions */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
        <div className="text-sm text-gray-400">
          <span className="text-white font-semibold">{filteredCount}</span> funds found
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1 hover:bg-blue-400/10 rounded-lg"
          >
            <X className="w-4 h-4" />
            <span>Clear All Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
