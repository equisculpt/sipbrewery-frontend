// Shared Navigation Configuration
// This file contains the complete navigation menu data used across all pages

export interface NavigationItem {
  name: string;
  href: string;
  dropdown?: DropdownItem[];
}

export interface DropdownItem {
  name: string;
  href: string;
  icon: string;
}

// EXACT navigation menu from home page - single source of truth
export const navigationMenu: NavigationItem[] = [
  { name: 'Home', href: '/' },
  { 
    name: 'Mutual Fund', 
    href: '/mutual-funds',
    dropdown: [
      { name: 'Explore Funds', href: '/funds/explore', icon: '🔍' },
      { name: 'Top SIPs', href: '/funds/top-sips', icon: '🏆' },
      { name: 'Tax Saving ELSS', href: '/funds/elss', icon: '💵' },
      { name: 'Goal-Based Investing', href: '/funds/goals', icon: '🎯' }
    ]
  },
  { 
    name: 'Brew Bot', 
    href: '/brew-bot',
    dropdown: [
      { name: 'Fund Analysis', href: '/fsi/fund-analysis', icon: '📈' },
      { name: 'Stock Analysis', href: '/fsi/stock-analysis', icon: '📉' },
      { name: 'Fund Comparison', href: '/fsi/fund-comparison', icon: '⚖️' },
      { name: 'Stock Comparison', href: '/fsi/stock-comparison', icon: '🏁' },
      { name: 'Quantum Predictions', href: '/fsi/quantum-predictions', icon: '⚛️' },
      { name: 'Market Insights', href: '/fsi/market-insights', icon: '🤖' },
      { name: 'Risk Assessment', href: '/fsi/risk-assessment', icon: '🛡️' },
      { name: 'Portfolio Optimizer', href: '/fsi/portfolio-optimizer', icon: '🎯' }
    ]
  },
  { 
    name: 'Blog', 
    href: '/blog',
    dropdown: [
      { name: 'Latest Articles', href: '/blog/articles', icon: '📝' },
      { name: 'Market Updates', href: '/blog/market-updates', icon: '📊' },
      { name: 'Investment Tips', href: '/blog/investment-tips', icon: '💡' },
      { name: 'FSI Insights', href: '/blog/fsi-insights', icon: '🧠' },
      { name: 'Community Forum', href: '/community/forum', icon: '💬' },
      { name: 'Expert Discussions', href: '/community/experts', icon: '👥' },
      { name: 'Success Stories', href: '/community/stories', icon: '🏆' },
      { name: 'Q&A Hub', href: '/community/qa', icon: '❓' }
    ]
  }
];

// Mega menu section interface
export interface MegaMenuSection {
  title: string;
  gradient: string;
  borderGradient: string;
  itemGradient: string;
  borderColor: string;
  hoverColor: string;
  buttonGradient: string;
  description: string;
  items?: number[];
  customItems?: DropdownItem[];
}

// Mega menu section configurations for consistent styling
export const megaMenuSections: Record<string, MegaMenuSection[]> = {
  'Mutual Fund': [
    {
      title: '💎 Investment Options',
      gradient: 'from-green-400/10 to-emerald-400/10',
      borderGradient: 'from-green-400 to-emerald-400',
      itemGradient: 'rgba(57,255,20,0.08)',
      borderColor: 'rgba(57,255,20,0.15)',
      hoverColor: 'text-green-300',
      buttonGradient: 'from-green-400 to-emerald-400',
      description: 'Premium investment solutions',
      items: [0, 1] // slice indices
    },
    {
      title: '💰 Tax Saving',
      gradient: 'from-amber-400/10 to-orange-400/10',
      borderGradient: 'from-amber-400 to-orange-400',
      itemGradient: 'rgba(251,191,36,0.08)',
      borderColor: 'rgba(251,191,36,0.15)',
      hoverColor: 'text-amber-300',
      buttonGradient: 'from-amber-400 to-orange-400',
      description: 'Tax-efficient strategies',
      items: [2, 3]
    },
    {
      title: '🚀 Tools & Calculators',
      gradient: 'from-blue-400/10 to-purple-400/10',
      borderGradient: 'from-blue-400 to-purple-400',
      itemGradient: 'rgba(59,130,246,0.08)',
      borderColor: 'rgba(59,130,246,0.15)',
      hoverColor: 'text-blue-300',
      buttonGradient: 'from-blue-400 to-purple-400',
      description: 'Advanced planning tools',
      customItems: [
        { name: 'SIP Calculator', href: '/calculator', icon: '🧮' }
      ]
    },
    {
      title: '🎆 Resources',
      gradient: 'from-pink-400/10 to-rose-400/10',
      borderGradient: 'from-pink-400 to-rose-400',
      itemGradient: 'rgba(236,72,153,0.08)',
      borderColor: 'rgba(236,72,153,0.15)',
      hoverColor: 'text-pink-300',
      buttonGradient: 'from-pink-400 to-rose-400',
      description: 'Learning resources',
      customItems: [
        { name: 'Learning Center', href: '/learn', icon: '📚' }
      ]
    }
  ],
  'Brew Bot': [
    {
      title: '🤖 AI Analysis',
      gradient: 'from-cyan-400/10 to-teal-400/10',
      borderGradient: 'from-cyan-400 to-teal-400',
      itemGradient: 'rgba(6,182,212,0.08)',
      borderColor: 'rgba(6,182,212,0.15)',
      hoverColor: 'text-cyan-300',
      buttonGradient: 'from-cyan-400 to-teal-400',
      description: 'AI-powered insights',
      items: [0, 1, 2, 3]
    },
    {
      title: '🔮 Advanced Tools',
      gradient: 'from-purple-400/10 to-pink-400/10',
      borderGradient: 'from-purple-400 to-pink-400',
      itemGradient: 'rgba(168,85,247,0.08)',
      borderColor: 'rgba(168,85,247,0.15)',
      hoverColor: 'text-purple-300',
      buttonGradient: 'from-purple-400 to-pink-400',
      description: 'Quantum predictions',
      items: [4, 5, 6, 7]
    }
  ],
  'Blog': [
    {
      title: '📚 Content Hub',
      gradient: 'from-amber-400/10 to-orange-400/10',
      borderGradient: 'from-amber-400 to-orange-400',
      itemGradient: 'rgba(245,158,11,0.08)',
      borderColor: 'rgba(245,158,11,0.15)',
      hoverColor: 'text-amber-300',
      buttonGradient: 'from-amber-400 to-orange-400',
      description: 'Expert insights',
      items: [0, 1, 2, 3]
    },
    {
      title: '👥 Community',
      gradient: 'from-rose-400/10 to-pink-400/10',
      borderGradient: 'from-rose-400 to-pink-400',
      itemGradient: 'rgba(244,63,94,0.08)',
      borderColor: 'rgba(244,63,94,0.15)',
      hoverColor: 'text-rose-300',
      buttonGradient: 'from-rose-400 to-pink-400',
      description: 'Connect & learn',
      items: [4, 5, 6, 7]
    }
  ]
};
