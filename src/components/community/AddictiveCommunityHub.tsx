'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ADDICTIVE COMMUNITY HUB
 * The Most Engaging Financial Community Interface Ever Built
 * 
 * This component creates such compelling interactions that users will
 * keep this page open in their office 24/7. Features designed for maximum addiction:
 * 
 * - Real-time live discussions with instant notifications
 * - Gamified point system with badges and leaderboards
 * - Exclusive alpha drops that create FOMO
 * - Live market events and competitions
 * - Social trading groups and portfolio battles
 * - Fund manager direct interactions
 * - Breaking news with instant community reactions
 * - Personalized content feeds that adapt to user behavior
 */

interface User {
  id: string;
  name: string;
  role: 'INVESTOR' | 'FUND_MANAGER' | 'ANALYST' | 'TRADER';
  level: number;
  points: number;
  badges: string[];
  online: boolean;
  avatar: string;
}

interface LiveDiscussion {
  id: string;
  title: string;
  type: 'BREAKING_NEWS' | 'MARKET_PULSE' | 'FUND_MANAGER_INSIGHTS' | 'IPO_ANALYSIS';
  participants: number;
  messages: Message[];
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  exclusivity: 'PUBLIC' | 'PREMIUM' | 'VIP' | 'ELITE';
}

interface Message {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies: number;
  exclusive: boolean;
  alpha: boolean;
}

interface MarketEvent {
  id: string;
  title: string;
  type: 'EARNINGS_LIVE' | 'IPO_LISTING' | 'MARKET_CRASH' | 'FUND_MANAGER_AMA';
  participants: number;
  reward: number;
  timeLeft: number;
  status: 'UPCOMING' | 'LIVE' | 'ENDED';
}

export default function AddictiveCommunityHub() {
  const [user, setUser] = useState<User | null>(null);
  const [liveDiscussions, setLiveDiscussions] = useState<LiveDiscussion[]>([]);
  const [marketEvents, setMarketEvents] = useState<MarketEvent[]>([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState<LiveDiscussion | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [points, setPoints] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [exclusiveAlpha, setExclusiveAlpha] = useState<any[]>([]);
  const [addictionLevel, setAddictionLevel] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data for demonstration
  const mockUser: User = {
    id: 'user_001',
    name: 'Rakesh Jhunjhunwala Jr.',
    role: 'INVESTOR',
    level: 15,
    points: 12450,
    badges: ['Market Prophet', 'Alpha Hunter', 'Community Leader'],
    online: true,
    avatar: '🏆'
  };

  const mockDiscussions: LiveDiscussion[] = [
    {
      id: 'disc_001',
      title: '🚨 BREAKING: Adani Group Stocks Surge 15% - Live Reactions',
      type: 'BREAKING_NEWS',
      participants: 1247,
      urgency: 'CRITICAL',
      exclusivity: 'PUBLIC',
      messages: [
        {
          id: 'msg_001',
          userId: 'fm_001',
          userName: 'Prashant Jain',
          userRole: 'FUND_MANAGER',
          content: '🔥 This is exactly what I predicted last week! Check my analysis from Tuesday.',
          timestamp: new Date(Date.now() - 120000),
          likes: 234,
          replies: 45,
          exclusive: false,
          alpha: true
        },
        {
          id: 'msg_002',
          userId: 'analyst_001',
          userName: 'Motilal Oswal',
          userRole: 'ANALYST',
          content: '💎 EXCLUSIVE ALPHA: More positive news coming in next 48 hours. My sources confirm regulatory approval.',
          timestamp: new Date(Date.now() - 60000),
          likes: 567,
          replies: 89,
          exclusive: true,
          alpha: true
        }
      ]
    },
    {
      id: 'disc_002',
      title: '📊 Live Market Pulse: Nifty Testing 22,000 Resistance',
      type: 'MARKET_PULSE',
      participants: 892,
      urgency: 'HIGH',
      exclusivity: 'PREMIUM',
      messages: []
    },
    {
      id: 'disc_003',
      title: '💰 Fund Manager Exclusive: Portfolio Rebalancing Strategies',
      type: 'FUND_MANAGER_INSIGHTS',
      participants: 456,
      urgency: 'MEDIUM',
      exclusivity: 'VIP',
      messages: []
    }
  ];

  const mockEvents: MarketEvent[] = [
    {
      id: 'event_001',
      title: '🎪 TCS Earnings Live Reaction Party',
      type: 'EARNINGS_LIVE',
      participants: 2341,
      reward: 500,
      timeLeft: 1800, // 30 minutes
      status: 'LIVE'
    },
    {
      id: 'event_002',
      title: '🚀 IPO Prediction Tournament: Tata Technologies',
      type: 'IPO_LISTING',
      participants: 1876,
      reward: 750,
      timeLeft: 7200, // 2 hours
      status: 'UPCOMING'
    }
  ];

  useEffect(() => {
    setUser(mockUser);
    setLiveDiscussions(mockDiscussions);
    setMarketEvents(mockEvents);
    setSelectedDiscussion(mockDiscussions[0]);

    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update session time (addiction tracking)
      setSessionTime(prev => prev + 1);
      
      // Update addiction level based on engagement
      setAddictionLevel(prev => Math.min(prev + 0.1, 100));
      
      // Add random notifications to create FOMO
      if (Math.random() > 0.7) {
        addNotification();
      }
      
      // Update points randomly (variable reward schedule)
      if (Math.random() > 0.8) {
        setPoints(prev => prev + Math.floor(Math.random() * 50) + 10);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const addNotification = () => {
    const notifications = [
      { type: 'ALPHA', message: '💎 Exclusive alpha just dropped in VIP room!', urgency: 'HIGH' },
      { type: 'ACHIEVEMENT', message: '🏆 You earned "Quick Responder" badge!', urgency: 'MEDIUM' },
      { type: 'FOMO', message: '🚨 Fund manager sharing portfolio secrets - 2 min left!', urgency: 'CRITICAL' },
      { type: 'SOCIAL', message: '👥 5 fund managers just joined your discussion!', urgency: 'MEDIUM' }
    ];
    
    const notification = notifications[Math.floor(Math.random() * notifications.length)];
    setNotifications(prev => [...prev, { ...notification, id: Date.now() }]);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 10000);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedDiscussion) return;
    
    const message: Message = {
      id: `msg_${Date.now()}`,
      userId: user?.id || '',
      userName: user?.name || '',
      userRole: user?.role || 'INVESTOR',
      content: newMessage,
      timestamp: new Date(),
      likes: 0,
      replies: 0,
      exclusive: false,
      alpha: false
    };
    
    setSelectedDiscussion(prev => ({
      ...prev!,
      messages: [...prev!.messages, message]
    }));
    
    setNewMessage('');
    setPoints(prev => prev + 25); // Reward for participation
    
    // Scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'CRITICAL': return 'text-red-400 bg-red-900/30 border-red-400';
      case 'HIGH': return 'text-orange-400 bg-orange-900/30 border-orange-400';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-900/30 border-yellow-400';
      default: return 'text-green-400 bg-green-900/30 border-green-400';
    }
  };

  const getExclusivityIcon = (exclusivity: string) => {
    switch (exclusivity) {
      case 'ELITE': return '💎';
      case 'VIP': return '👑';
      case 'PREMIUM': return '⭐';
      default: return '🌟';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'FUND_MANAGER': return 'text-purple-400 bg-purple-900/30';
      case 'ANALYST': return 'text-blue-400 bg-blue-900/30';
      case 'TRADER': return 'text-green-400 bg-green-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Addiction Status Bar */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-b border-purple-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🌟</span>
                <div>
                  <div className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    SIP BREWERY COMMUNITY
                  </div>
                  <div className="text-xs text-gray-400">The Most Addictive Financial Hub</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                  <span>Session: {formatTime(sessionTime)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🎯</span>
                  <span>Addiction: {addictionLevel.toFixed(1)}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>⚡</span>
                  <span>{points.toLocaleString()} Points</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{user?.avatar}</span>
                <div>
                  <div className="font-semibold">{user?.name}</div>
                  <div className="text-xs text-gray-400">Level {user?.level}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="fixed top-20 right-6 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className={`p-4 rounded-lg border backdrop-blur-sm ${
                notification.urgency === 'CRITICAL' 
                  ? 'bg-red-900/80 border-red-400' 
                  : notification.urgency === 'HIGH'
                  ? 'bg-orange-900/80 border-orange-400'
                  : 'bg-blue-900/80 border-blue-400'
              }`}
            >
              <div className="font-semibold">{notification.message}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Live Discussions Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-bold mb-4 text-purple-400">🔥 Live Discussions</h2>
              
              <div className="space-y-3">
                {liveDiscussions.map((discussion) => (
                  <motion.div
                    key={discussion.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedDiscussion?.id === discussion.id
                        ? 'bg-purple-600/30 border-purple-400 border'
                        : 'bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600'
                    }`}
                    onClick={() => setSelectedDiscussion(discussion)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg">{getExclusivityIcon(discussion.exclusivity)}</span>
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold border ${getUrgencyColor(discussion.urgency)}`}>
                        {discussion.urgency}
                      </div>
                    </div>
                    
                    <div className="font-semibold text-white text-sm mb-2 line-clamp-2">
                      {discussion.title}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>👥 {discussion.participants.toLocaleString()}</span>
                      <span>💬 {discussion.messages.length}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Live Events */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 mt-6">
              <h2 className="text-xl font-bold mb-4 text-yellow-400">🎪 Live Events</h2>
              
              <div className="space-y-3">
                {marketEvents.map((event) => (
                  <div key={event.id} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="font-semibold text-white text-sm mb-2">
                      {event.title}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                      <span>👥 {event.participants.toLocaleString()}</span>
                      <span>🏆 {event.reward} pts</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        event.status === 'LIVE' 
                          ? 'bg-red-600 text-white' 
                          : 'bg-yellow-600 text-black'
                      }`}>
                        {event.status}
                      </div>
                      <span className="text-xs text-gray-400">
                        {Math.floor(event.timeLeft / 60)}m left
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Discussion Area */}
          <div className="lg:col-span-2">
            {selectedDiscussion && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 h-[800px] flex flex-col">
                {/* Discussion Header */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{getExclusivityIcon(selectedDiscussion.exclusivity)}</span>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getUrgencyColor(selectedDiscussion.urgency)}`}>
                      {selectedDiscussion.urgency}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-2">
                    {selectedDiscussion.title}
                  </h2>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>👥 {selectedDiscussion.participants.toLocaleString()} participants</span>
                    <span>💬 {selectedDiscussion.messages.length} messages</span>
                    <span className="text-green-400">🟢 LIVE</span>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {selectedDiscussion.messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg ${
                        message.exclusive 
                          ? 'bg-purple-900/30 border border-purple-600' 
                          : 'bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleColor(message.userRole)}`}>
                            {message.userRole}
                          </span>
                          <span className="font-semibold text-white">{message.userName}</span>
                          {message.alpha && <span className="text-xs bg-yellow-600 text-black px-2 py-1 rounded-full">ALPHA</span>}
                          {message.exclusive && <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">EXCLUSIVE</span>}
                        </div>
                        <span className="text-xs text-gray-400">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <p className="text-gray-200 mb-3">{message.content}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <button className="flex items-center space-x-1 hover:text-red-400">
                          <span>❤️</span>
                          <span>{message.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-blue-400">
                          <span>💬</span>
                          <span>{message.replies}</span>
                        </button>
                        <button className="hover:text-green-400">🔄 Share</button>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-gray-700">
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Share your insights with the community..."
                      className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Leaderboards & Alpha */}
          <div className="lg:col-span-1">
            {/* Leaderboard */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-green-400">🏆 Today's Leaders</h2>
              
              <div className="space-y-3">
                {[
                  { name: 'Prashant Jain', role: 'FUND_MANAGER', points: 2450, change: '+15%' },
                  { name: 'Rakesh Jhunjhunwala Jr.', role: 'INVESTOR', points: 2340, change: '+12%' },
                  { name: 'Motilal Oswal', role: 'ANALYST', points: 2180, change: '+8%' },
                  { name: 'Rajeev Thakkar', role: 'FUND_MANAGER', points: 1950, change: '+5%' }
                ].map((leader, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}
                      </span>
                      <div>
                        <div className="font-semibold text-white text-sm">{leader.name}</div>
                        <div className="text-xs text-gray-400">{leader.role}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-400">{leader.points}</div>
                      <div className="text-xs text-green-400">{leader.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exclusive Alpha */}
            <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6">
              <h3 className="text-xl font-bold text-green-400 mb-4">
                📚 Educational Content Sharing
              </h3>
              <p className="text-gray-300 mb-4">
                Share and discuss educational investment content and market insights for learning.
              </p>
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 mb-4">
                <p className="text-yellow-300 text-xs font-semibold">
                  ⚠️ Community discussions are for educational purposes only, not investment advice.
                </p>
              </div>
              <div className="bg-purple-900/30 border border-purple-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">VIP ONLY</span>
                  <span className="text-xs text-gray-400">2 min ago</span>
                </div>
                <p className="text-sm text-gray-200">
                  🚨 Major institutional buying detected in IT sector. Sources confirm 500+ Cr inflow expected this week.
                </p>
              </div>
              <div className="bg-blue-500/20 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">HDFC Top 100 Discussion</span>
                  <span className="text-blue-400">Educational</span>
                </div>
                <p className="text-sm text-gray-400">Community educational discussion</p>
                <p className="text-xs text-yellow-300 mt-1">
                  Past performance: +15.2% (does not guarantee future returns)
                </p>
              </div>
              <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-yellow-600 text-black px-2 py-1 rounded-full">ALPHA</span>
                  <span className="text-xs text-gray-400">5 min ago</span>
                </div>
                <p className="text-sm text-gray-200">
                  💰 Upcoming IPO pipeline: 3 unicorns planning Q2 listings. Early intel suggests oversubscription likely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
