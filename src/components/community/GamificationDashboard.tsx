'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * GAMIFICATION DASHBOARD
 * The Most Addictive Gamification System for Financial Community
 * 
 * This component implements psychological triggers that make users
 * unable to stop using the platform. Features designed for maximum addiction:
 * 
 * - Variable reward schedules that create compulsive behavior
 * - Social comparison and competitive elements
 * - Progress tracking with near-miss psychology
 * - Exclusive access and FOMO triggers
 * - Achievement systems with social validation
 * - Leaderboards that create social pressure
 * - Streak systems that build habits
 * - Surprise rewards and bonuses
 */

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  points: number;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  unlockedAt?: Date;
}

interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  earnedAt: Date;
}

interface Streak {
  type: string;
  current: number;
  best: number;
  target: number;
  reward: string;
  icon: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'SPECIAL';
  progress: number;
  target: number;
  reward: number;
  timeLeft: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXTREME';
  participants: number;
}

export default function GamificationDashboard() {
  const [userStats, setUserStats] = useState({
    level: 15,
    points: 12450,
    nextLevelPoints: 15000,
    rank: 23,
    totalUsers: 50000,
    addictionScore: 94.5
  });
  
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [recentRewards, setRecentRewards] = useState<any[]>([]);
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data initialization
  useEffect(() => {
    initializeMockData();
    
    // Simulate real-time updates for addiction
    const interval = setInterval(() => {
      simulateRealTimeUpdates();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const initializeMockData = () => {
    // Mock achievements
    const mockAchievements: Achievement[] = [
      {
        id: 'market_prophet',
        name: 'Market Prophet',
        description: 'Make 10 accurate market predictions in a row',
        icon: '🔮',
        rarity: 'LEGENDARY',
        points: 1000,
        unlocked: true,
        progress: 10,
        maxProgress: 10,
        unlockedAt: new Date(Date.now() - 86400000)
      },
      {
        id: 'alpha_hunter',
        name: 'Alpha Hunter',
        description: 'Share 50 exclusive insights with the community',
        icon: '🎯',
        rarity: 'EPIC',
        points: 500,
        unlocked: true,
        progress: 50,
        maxProgress: 50,
        unlockedAt: new Date(Date.now() - 172800000)
      },
      {
        id: 'community_leader',
        name: 'Community Leader',
        description: 'Help 100 community members with advice',
        icon: '👑',
        rarity: 'EPIC',
        points: 750,
        unlocked: false,
        progress: 87,
        maxProgress: 100
      },
      {
        id: 'night_owl',
        name: 'Night Owl',
        description: 'Stay active in community after midnight for 7 days',
        icon: '🦉',
        rarity: 'RARE',
        points: 300,
        unlocked: false,
        progress: 5,
        maxProgress: 7
      },
      {
        id: 'fund_manager_whisperer',
        name: 'Fund Manager Whisperer',
        description: 'Get 100 likes from verified fund managers',
        icon: '💼',
        rarity: 'LEGENDARY',
        points: 1500,
        unlocked: false,
        progress: 73,
        maxProgress: 100
      }
    ];
    
    // Mock badges
    const mockBadges: Badge[] = [
      {
        id: 'early_adopter',
        name: 'Early Adopter',
        icon: '🚀',
        color: 'bg-purple-600',
        description: 'Joined the community in first 1000 members',
        earnedAt: new Date(Date.now() - 2592000000) // 30 days ago
      },
      {
        id: 'streak_master',
        name: 'Streak Master',
        icon: '🔥',
        color: 'bg-red-600',
        description: 'Maintained 30-day activity streak',
        earnedAt: new Date(Date.now() - 86400000) // 1 day ago
      },
      {
        id: 'top_contributor',
        name: 'Top Contributor',
        icon: '⭐',
        color: 'bg-yellow-600',
        description: 'Top 1% contributor this month',
        earnedAt: new Date(Date.now() - 604800000) // 7 days ago
      }
    ];
    
    // Mock streaks
    const mockStreaks: Streak[] = [
      {
        type: 'Daily Login',
        current: 23,
        best: 45,
        target: 30,
        reward: '500 bonus points',
        icon: '📅'
      },
      {
        type: 'Discussion Participation',
        current: 12,
        best: 18,
        target: 15,
        reward: 'VIP Alpha Access',
        icon: '💬'
      },
      {
        type: 'Accurate Predictions',
        current: 7,
        best: 12,
        target: 10,
        reward: 'Market Prophet Badge',
        icon: '🎯'
      }
    ];
    
    // Mock challenges
    const mockChallenges: Challenge[] = [
      {
        id: 'daily_predictor',
        title: 'Daily Market Predictor',
        description: 'Make 5 market predictions today',
        type: 'DAILY',
        progress: 3,
        target: 5,
        reward: 100,
        timeLeft: 14400, // 4 hours
        difficulty: 'EASY',
        participants: 1247
      },
      {
        id: 'ipo_expert',
        title: 'IPO Analysis Expert',
        description: 'Analyze 3 upcoming IPOs this week',
        type: 'WEEKLY',
        progress: 1,
        target: 3,
        reward: 500,
        timeLeft: 345600, // 4 days
        difficulty: 'MEDIUM',
        participants: 892
      },
      {
        id: 'community_champion',
        title: 'Community Champion',
        description: 'Help 20 members with investment advice this month',
        type: 'MONTHLY',
        progress: 14,
        target: 20,
        reward: 1000,
        timeLeft: 1209600, // 14 days
        difficulty: 'HARD',
        participants: 456
      }
    ];
    
    setAchievements(mockAchievements);
    setBadges(mockBadges);
    setStreaks(mockStreaks);
    setChallenges(mockChallenges);
  };

  const simulateRealTimeUpdates = () => {
    // Random point increases (variable reward schedule)
    if (Math.random() > 0.7) {
      const pointsGained = Math.floor(Math.random() * 50) + 10;
      setUserStats(prev => ({
        ...prev,
        points: prev.points + pointsGained
      }));
      
      // Show reward animation
      setRecentRewards(prev => [...prev, {
        id: Date.now(),
        type: 'POINTS',
        amount: pointsGained,
        reason: 'Active participation bonus',
        timestamp: new Date()
      }]);
      setShowRewardAnimation(true);
      
      setTimeout(() => setShowRewardAnimation(false), 3000);
    }
    
    // Random achievement progress
    if (Math.random() > 0.8) {
      setAchievements(prev => prev.map(achievement => {
        if (!achievement.unlocked && Math.random() > 0.5) {
          const newProgress = Math.min(achievement.progress + 1, achievement.maxProgress);
          return { ...achievement, progress: newProgress };
        }
        return achievement;
      }));
    }
    
    // Update addiction score
    setUserStats(prev => ({
      ...prev,
      addictionScore: Math.min(prev.addictionScore + (Math.random() * 0.5), 100)
    }));
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'LEGENDARY': return 'from-yellow-400 to-orange-500';
      case 'EPIC': return 'from-purple-400 to-pink-500';
      case 'RARE': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'EXTREME': return 'text-red-400 bg-red-900/30 border-red-400';
      case 'HARD': return 'text-orange-400 bg-orange-900/30 border-orange-400';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-900/30 border-yellow-400';
      default: return 'text-green-400 bg-green-900/30 border-green-400';
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const calculateLevelProgress = () => {
    const currentLevelPoints = (userStats.level - 1) * 1000;
    const progress = ((userStats.points - currentLevelPoints) / (userStats.nextLevelPoints - currentLevelPoints)) * 100;
    return Math.min(progress, 100);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6 rounded-xl border border-gray-700">
      {/* Reward Animation Overlay */}
      <AnimatePresence>
        {showRewardAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-bold text-xl shadow-2xl">
              🎉 +{recentRewards[recentRewards.length - 1]?.amount} Points! 🎉
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            🎮 Gamification Hub
          </h2>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-400">{userStats.points.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Points</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-400">#{userStats.rank}</div>
              <div className="text-sm text-gray-400">Global Rank</div>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold">Level {userStats.level}</span>
            <span className="text-sm text-gray-400">
              {userStats.points.toLocaleString()} / {userStats.nextLevelPoints.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
              style={{ width: `${calculateLevelProgress()}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${calculateLevelProgress()}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="text-center mt-2">
            <span className="text-sm text-gray-400">
              {userStats.nextLevelPoints - userStats.points} points to next level
            </span>
          </div>
        </div>

        {/* Addiction Score */}
        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-red-400">🧠 Addiction Score</h3>
              <p className="text-sm text-gray-400">How addicted you are to our platform</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-red-400">{userStats.addictionScore.toFixed(1)}%</div>
              <div className="text-xs text-red-300">MAXIMUM ENGAGEMENT</div>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
            <div
              className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
              style={{ width: `${userStats.addictionScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-800/50 rounded-lg p-1">
        {['overview', 'achievements', 'challenges', 'leaderboard'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
              selectedTab === tab
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Badges */}
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">🏆 Recent Badges</h3>
              <div className="space-y-3">
                {badges.slice(0, 3).map((badge) => (
                  <motion.div
                    key={badge.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-3 bg-gray-700/50 rounded-lg"
                  >
                    <div className={`w-12 h-12 ${badge.color} rounded-full flex items-center justify-center text-2xl`}>
                      {badge.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{badge.name}</div>
                      <div className="text-sm text-gray-400">{badge.description}</div>
                      <div className="text-xs text-gray-500">
                        Earned {badge.earnedAt.toLocaleDateString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Active Streaks */}
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-orange-400">🔥 Active Streaks</h3>
              <div className="space-y-4">
                {streaks.map((streak, index) => (
                  <div key={index} className="p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{streak.icon}</span>
                        <span className="font-semibold text-white">{streak.type}</span>
                      </div>
                      <span className="text-lg font-bold text-orange-400">{streak.current}</span>
                    </div>
                    
                    <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                        style={{ width: `${(streak.current / streak.target) * 100}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Target: {streak.target}</span>
                      <span>Best: {streak.best}</span>
                    </div>
                    
                    <div className="text-xs text-yellow-400 mt-1">
                      Reward: {streak.reward}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-lg border-2 ${
                  achievement.unlocked
                    ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} bg-opacity-20 border-opacity-50`
                    : 'bg-gray-800/50 border-gray-600'
                }`}
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <h3 className={`font-bold text-lg ${
                    achievement.unlocked ? 'text-white' : 'text-gray-400'
                  }`}>
                    {achievement.name}
                  </h3>
                  <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                    achievement.rarity === 'LEGENDARY' ? 'bg-yellow-600' :
                    achievement.rarity === 'EPIC' ? 'bg-purple-600' :
                    achievement.rarity === 'RARE' ? 'bg-blue-600' : 'bg-gray-600'
                  }`}>
                    {achievement.rarity}
                  </div>
                </div>
                
                <p className="text-sm text-gray-300 text-center mb-4">
                  {achievement.description}
                </p>
                
                {!achievement.unlocked && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="text-center">
                  <span className="text-yellow-400 font-bold">
                    {achievement.points} points
                  </span>
                  {achievement.unlocked && (
                    <div className="text-xs text-green-400 mt-1">
                      ✅ Unlocked {achievement.unlockedAt?.toLocaleDateString()}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {selectedTab === 'challenges' && (
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
                    <p className="text-gray-400">{challenge.description}</p>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {challenge.participants.toLocaleString()} participants
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Progress: {challenge.progress}/{challenge.target}</span>
                    <span>Time left: {formatTime(challenge.timeLeft)}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                      style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-yellow-400 font-bold">
                      🏆 {challenge.reward} points
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      challenge.type === 'DAILY' ? 'bg-green-600' :
                      challenge.type === 'WEEKLY' ? 'bg-blue-600' :
                      challenge.type === 'MONTHLY' ? 'bg-purple-600' : 'bg-red-600'
                    }`}>
                      {challenge.type}
                    </span>
                  </div>
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all">
                    Join Challenge
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {selectedTab === 'leaderboard' && (
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6 text-green-400">🏆 Global Leaderboard</h3>
            <div className="space-y-3">
              {[
                { rank: 1, name: 'Prashant Jain', role: 'FUND_MANAGER', points: 45670, change: '+15%' },
                { rank: 2, name: 'Rakesh Jhunjhunwala Jr.', role: 'INVESTOR', points: 42340, change: '+12%' },
                { rank: 3, name: 'Motilal Oswal', role: 'ANALYST', points: 38950, change: '+8%' },
                { rank: 23, name: 'You', role: 'INVESTOR', points: 12450, change: '+5%', isUser: true }
              ].map((user) => (
                <motion.div
                  key={user.rank}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    user.isUser 
                      ? 'bg-purple-900/30 border border-purple-600' 
                      : 'bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">
                      {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : '🏅'}
                    </div>
                    <div>
                      <div className={`font-semibold ${user.isUser ? 'text-purple-400' : 'text-white'}`}>
                        #{user.rank} {user.name}
                      </div>
                      <div className="text-sm text-gray-400">{user.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-yellow-400">
                      {user.points.toLocaleString()} pts
                    </div>
                    <div className="text-sm text-green-400">{user.change}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
