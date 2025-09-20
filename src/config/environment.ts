// Environment configuration for frontend-backend integration
export const config = {
  // API Configuration
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  
  // Feature Flags
  useDemoData: process.env.NEXT_PUBLIC_USE_DEMO_DATA === 'true' || false,
  enableRealTimeUpdates: process.env.NEXT_PUBLIC_ENABLE_REALTIME === 'true' || false,
  
  // Backend Service Endpoints
  endpoints: {
    portfolio: '/portfolio',
    funds: '/funds',
    analytics: '/analytics',
    reports: '/reports',
    auth: '/auth'
  },
  
  // Chart Configuration (preserved from demo)
  charts: {
    animationDuration: 1000,
    colors: {
      primary: '#3B82F6',
      success: '#10B981', 
      warning: '#F59E0B',
      danger: '#EF4444',
      purple: '#8B5CF6',
      pink: '#EC4899'
    }
  },
  
  // Demo Mode Settings
  demo: {
    autoRefreshInterval: 30000, // 30 seconds
    simulateLoading: true,
    showDemoIndicator: true
  }
};
