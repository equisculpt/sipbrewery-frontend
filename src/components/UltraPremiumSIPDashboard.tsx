import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { 
  BarChart3, PieChart, Target, TrendingUp, Brain, Activity, ArrowUpRight, Zap, Eye, AlertTriangle, Star, ChevronRight, Sparkles, TrendingDown, DollarSign, Calendar, Award, Shield, Lightbulb, Cpu, Network, Layers, Gauge, Radar, Atom, Hexagon, Triangle, Circle, Square, Wifi, Radio, Satellite, Orbit, Waves, Infinity, Flame, Codesandbox, GitBranch, Compass, Globe, Telescope, Microscope, Beaker, Dna, Fingerprint, Scan, Crosshair, Focus, Aperture, Camera, Video, Play, Pause, SkipForward, Rewind, FastForward, Volume2, VolumeX, Mic, MicOff, Phone, PhoneCall, MessageSquare, Mail, Send, Download, Upload, Share, Link, Copy, Clipboard, Save, FileText, Folder, FolderOpen, Archive, Package, Box, Layers2, Grid, Layout, Maximize, Minimize, Expand, Shrink, ZoomIn, ZoomOut, RotateCw, RotateCcw, Shuffle, Repeat, SkipBack, Volume1, Volume, VolumeOff, Headphones, Speaker, Disc, Music, PlayCircle, PauseCircle, StopCircle, Heart, HeartHandshake, ThumbsUp, ThumbsDown, Bookmark, Flag, Tag, Hash, AtSign, Percent, Bitcoin, CreditCard, Wallet, ShoppingCart, ShoppingBag, Gift, Medal, Trophy, Crown, Gem, Diamond, Coins, Banknote, Receipt, Calculator, PiggyBank, Vault, Lock, Unlock, Key, ShieldCheck, ShieldAlert, ShieldX, EyeOff, Glasses, Search, SearchCheck, SearchX, Filter, FilterX, SortAsc, SortDesc, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ArrowUpLeft, ArrowDownLeft, ArrowDownRight, ChevronsUp, ChevronsDown, ChevronsLeft, ChevronsRight, ChevronUp, ChevronDown, ChevronLeft, CornerUpLeft, CornerUpRight, CornerDownLeft, CornerDownRight, Move, Move3d, MousePointer, MousePointer2, Hand, Grab, Pointer, FlipHorizontal, FlipVertical, Crop, Scissors, Eraser, Paintbrush, Palette, Pipette, Brush, Pen, PenTool, Edit, Edit2, Edit3, Type, Text, Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Quote, List, ListOrdered, Indent, Outdent, AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline, Strikethrough, Subscript, Superscript, Code, Code2, Terminal, Command, Option, Home, Menu, MoreHorizontal, MoreVertical, Plus, Minus, X, Check, CheckCircle, CheckCircle2, CheckSquare, XCircle, XSquare, AlertCircle, AlertOctagon, Info, HelpCircle, Loader, Loader2, RefreshCw, RefreshCcw, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Gamepad, Gamepad2, Joystick, Keyboard, Mouse, Tablet, Smartphone, Laptop, Monitor, Tv, Tv2, Headset, Webcam, Film, Image, Images, FileImage, FileVideo, FileAudio, File, Files, FolderPlus, FolderMinus, FolderX, FolderCheck, Package2, PackageOpen, PackageCheck, PackageX, PackagePlus, PackageMinus, PackageSearch, Boxes, Container, Truck, Car, Bike, Bus, Train, Plane, Ship, Anchor, Map, MapPin, Navigation, Navigation2, Route, Milestone, Signpost, TrafficCone, Construction, Hammer, Wrench, Drill, Ruler, Pentagon, Octagon, Disc2, Disc3, Donut, ArrowBigUp, ArrowBigDown, ArrowBigLeft, ArrowBigRight, BarChart, BarChart2, BarChart4, LineChart, AreaChart, ScatterChart, CalendarDays, CalendarCheck, CalendarX, CalendarPlus, CalendarMinus, CalendarClock, CalendarHeart, CalendarRange, Clock, Clock1, Clock2, Clock3, Clock4, Clock5, Clock6, Clock7, Clock8, Clock9, Clock10, Clock11, Clock12, Timer, TimerOff, TimerReset, Hourglass, Sunrise, Sunset, Sun, Moon, Stars, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, CloudHail, CloudFog, CloudOff, Umbrella, Rainbow, Thermometer, ThermometerSun, ThermometerSnowflake, Wind, Tornado, Mountain, Leaf, Flower, Flower2, Sprout, Apple, Banana, Grape, Cherry
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart as RechartsBarChart, Bar, RadialBarChart, RadialBar, ScatterChart as RechartsScatterChart, Scatter, ComposedChart, ReferenceLine, Brush, FunnelChart, Funnel, Treemap, Sankey as SankeyChart
} from 'recharts';

// 🚀 ULTIMATE QUANTUM-NEURAL DESIGN SYSTEM - 200+ YEARS UI MASTERY
const QUANTUM_NEURAL_SYSTEM = {
  colors: {
    quantum: {
      core: '#0a0a0f',
      void: '#000000',
      plasma: '#1a1a2e',
      neural: '#16213e',
      matrix: '#0f3460',
      cosmic: '#533483',
      aurora: '#7209b7',
      infinity: '#a663cc',
      transcend: '#4cc9f0'
    },
    neural: {
      synapse: '#ff006e',
      dendrite: '#fb5607',
      axon: '#ffbe0b',
      neuron: '#8338ec',
      cortex: '#3a86ff',
      cerebrum: '#06ffa5',
      stem: '#ff9500',
      lobe: '#c77dff'
    },
    ai: {
      intelligence: '#00f5ff',
      learning: '#7209b7',
      prediction: '#ff006e',
      analysis: '#06ffa5',
      insight: '#ffbe0b',
      wisdom: '#8338ec',
      consciousness: '#fb5607',
      singularity: '#ffffff'
    }
  },
  gradients: {
    quantum: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
    neural: 'linear-gradient(135deg, #ff006e 0%, #fb5607 20%, #ffbe0b 40%, #8338ec 60%, #3a86ff 80%, #06ffa5 100%)',
    consciousness: 'linear-gradient(135deg, #000000 0%, #7209b7 25%, #a663cc 50%, #4cc9f0 75%, #ffffff 100%)',
    transcendence: 'linear-gradient(135deg, #ff006e 0%, #8338ec 33%, #06ffa5 66%, #ffffff 100%)',
    infinity: 'linear-gradient(135deg, #0a0a0f 0%, #533483 50%, #a663cc 100%)',
    singularity: 'radial-gradient(circle, #ffffff 0%, #4cc9f0 25%, #8338ec 50%, #7209b7 75%, #000000 100%)',
    matrix: 'linear-gradient(45deg, #06ffa5 0%, #00f5ff 25%, #3a86ff 50%, #8338ec 75%, #7209b7 100%)',
    plasma: 'linear-gradient(135deg, #ff006e 0%, #ffbe0b 50%, #06ffa5 100%)',
    cosmic: 'conic-gradient(from 0deg, #ff006e, #fb5607, #ffbe0b, #8338ec, #3a86ff, #06ffa5, #ff006e)',
    aurora: 'linear-gradient(135deg, #7209b7 0%, #a663cc 33%, #4cc9f0 66%, #06ffa5 100%)',
    void: 'radial-gradient(ellipse, #000000 0%, #0a0a0f 50%, #1a1a2e 100%)',
    hyperspace: 'linear-gradient(135deg, #000000 0%, #16213e 25%, #533483 50%, #a663cc 75%, #ffffff 100%)'
  },
  effects: {
    neuralGlow: '0 0 20px rgba(255, 0, 110, 0.5), 0 0 40px rgba(131, 56, 236, 0.3), 0 0 60px rgba(6, 255, 165, 0.2)',
    quantumShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    plasmaBlur: 'blur(20px) saturate(1.5) brightness(1.2)',
    matrixDistortion: 'hue-rotate(90deg) saturate(2) brightness(1.5)',
    cosmicRipple: 'drop-shadow(0 0 10px rgba(255, 0, 110, 0.8)) drop-shadow(0 0 20px rgba(131, 56, 236, 0.6))',
    infinityWarp: 'perspective(1000px) rotateX(15deg) rotateY(-15deg) scale3d(1.05, 1.05, 1.05)',
    transcendentAura: '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(76, 201, 240, 0.6), 0 0 90px rgba(131, 56, 236, 0.4)',
    voidAbsorption: 'invert(1) hue-rotate(180deg) saturate(0.5) brightness(0.8)',
    hyperspaceShift: 'sepia(1) hue-rotate(270deg) saturate(3) brightness(1.2)',
    singularityPull: 'radial-gradient(circle, transparent 30%, rgba(0, 0, 0, 0.8) 70%)'
  },
  animations: {
    quantumFluctuation: {
      scale: [1, 1.05, 0.95, 1.02, 1],
      rotate: [0, 2, -1, 1, 0],
      opacity: [0.8, 1, 0.9, 1, 0.8]
    },
    neuralPulse: {
      boxShadow: [
        '0 0 20px rgba(255, 0, 110, 0.3)',
        '0 0 40px rgba(255, 0, 110, 0.8)',
        '0 0 60px rgba(255, 0, 110, 0.5)',
        '0 0 40px rgba(255, 0, 110, 0.8)',
        '0 0 20px rgba(255, 0, 110, 0.3)'
      ]
    },
    consciousnessExpansion: {
      scale: [1, 1.2, 1.1, 1.3, 1],
      filter: [
        'brightness(1) saturate(1)',
        'brightness(1.5) saturate(2)',
        'brightness(1.2) saturate(1.5)',
        'brightness(1.8) saturate(2.5)',
        'brightness(1) saturate(1)'
      ]
    },
    matrixRain: {
      y: [-100, window.innerHeight + 100],
      opacity: [0, 1, 1, 0]
    },
    plasmaFlow: {
      background: [
        'linear-gradient(0deg, #ff006e, #8338ec)',
        'linear-gradient(90deg, #8338ec, #06ffa5)',
        'linear-gradient(180deg, #06ffa5, #ffbe0b)',
        'linear-gradient(270deg, #ffbe0b, #ff006e)',
        'linear-gradient(360deg, #ff006e, #8338ec)'
      ]
    },
    infinityRotation: {
      rotate: [0, 360],
      scale: [1, 1.1, 1, 0.9, 1]
    },
    voidConsumption: {
      scale: [1, 0.8, 1.2, 0.9, 1],
      opacity: [1, 0.3, 0.8, 0.5, 1],
      filter: [
        'brightness(1)',
        'brightness(0.3)',
        'brightness(1.5)',
        'brightness(0.7)',
        'brightness(1)'
      ]
    },
    hyperspaceJump: {
      x: [0, -20, 20, -10, 0],
      y: [0, -30, 15, -5, 0],
      scale: [1, 0.8, 1.3, 0.9, 1],
      rotate: [0, -5, 10, -2, 0]
    },
    singularityCollapse: {
      scale: [1, 2, 0.1, 1.5, 1],
      rotate: [0, 180, 360, 540, 720],
      opacity: [1, 0.5, 0.1, 0.8, 1]
    }
  },
  typography: {
    quantum: 'font-black tracking-tighter text-transparent bg-clip-text',
    neural: 'font-bold tracking-tight',
    consciousness: 'font-medium tracking-normal',
    transcendent: 'font-light tracking-widest',
    infinity: 'font-extrabold tracking-tightest',
    void: 'font-thin tracking-wider',
    singularity: 'font-black tracking-tightest text-shadow-lg'
  }
};

// Advanced AI-Powered Data with Predictive Analytics
const ULTRA_PORTFOLIO_DATA = [
  { month: 'Jan', value: 185000, growth: 12.5, prediction: 195000, volatility: 8.2, sharpe: 1.45, alpha: 2.3, beta: 0.89 },
  { month: 'Feb', value: 195000, growth: 15.2, prediction: 208000, volatility: 9.1, sharpe: 1.52, alpha: 2.8, beta: 0.92 },
  { month: 'Mar', value: 210000, growth: 18.7, prediction: 225000, volatility: 7.8, sharpe: 1.68, alpha: 3.1, beta: 0.87 },
  { month: 'Apr', value: 225000, growth: 22.1, prediction: 240000, volatility: 8.9, sharpe: 1.71, alpha: 3.4, beta: 0.91 },
  { month: 'May', value: 240000, growth: 19.8, prediction: 258000, volatility: 9.5, sharpe: 1.63, alpha: 2.9, beta: 0.94 },
  { month: 'Jun', value: 275000, growth: 24.3, prediction: 295000, volatility: 8.1, sharpe: 1.78, alpha: 3.7, beta: 0.88 },
  { month: 'Jul', value: 0, growth: 0, prediction: 310000, volatility: 7.9, sharpe: 1.82, alpha: 4.1, beta: 0.86 },
  { month: 'Aug', value: 0, growth: 0, prediction: 325000, volatility: 8.3, sharpe: 1.85, alpha: 4.3, beta: 0.89 }
];

const ULTRA_ALLOCATION_DATA = [
  { name: 'Large Cap Equity', value: 35, color: '#667eea', risk: 'Low', expectedReturn: 12.5, correlation: 0.85 },
  { name: 'Mid Cap Growth', value: 25, color: '#764ba2', risk: 'Medium', expectedReturn: 18.2, correlation: 0.72 },
  { name: 'Small Cap Value', value: 15, color: '#f093fb', risk: 'High', expectedReturn: 24.8, correlation: 0.65 },
  { name: 'International', value: 15, color: '#4facfe', risk: 'Medium', expectedReturn: 15.7, correlation: 0.58 },
  { name: 'Fixed Income', value: 10, color: '#43e97b', risk: 'Low', expectedReturn: 6.8, correlation: -0.12 }
];

const ULTRA_AI_INSIGHTS = [
  {
    type: 'predictive',
    title: 'Market Regime Change Detected',
    description: 'AI models predict a shift to low-volatility regime in next 30 days. Optimal rebalancing window identified.',
    impact: '+3.2% alpha potential',
    confidence: 94,
    urgency: 'high',
    aiModel: 'Neural Ensemble v2.1',
    dataPoints: 15420,
    lastUpdated: '2 minutes ago'
  },
  {
    type: 'risk',
    title: 'Correlation Spike Alert',
    description: 'Cross-asset correlations increasing. Portfolio diversification effectiveness declining by 15%.',
    impact: 'Risk-adjusted returns at risk',
    confidence: 89,
    urgency: 'medium',
    aiModel: 'Risk Quantum AI',
    dataPoints: 8750,
    lastUpdated: '5 minutes ago'
  },
  {
    type: 'opportunity',
    title: 'Momentum Factor Strength',
    description: 'Momentum signals strengthening across mid-cap segment. 12-month forward returns projected +28%.',
    impact: '+4.7% portfolio enhancement',
    confidence: 91,
    urgency: 'high',
    aiModel: 'Alpha Discovery Engine',
    dataPoints: 12340,
    lastUpdated: '1 minute ago'
  }
];

const ULTRA_PERFORMANCE_METRICS = [
  { fund: 'Axis Bluechip Fund', returns: 18.5, risk: 'Low', allocation: 25, sharpe: 1.42, alpha: 2.8, beta: 0.89, tracking: 1.2, info: 0.45 },
  { fund: 'HDFC Mid Cap Opportunities', returns: 24.2, risk: 'Medium', allocation: 20, sharpe: 1.68, alpha: 4.1, beta: 1.15, tracking: 2.8, info: 0.67 },
  { fund: 'SBI Small Cap Fund', returns: 31.8, risk: 'High', allocation: 15, sharpe: 1.89, alpha: 6.2, beta: 1.34, tracking: 4.1, info: 0.82 },
  { fund: 'ICICI Prudential Bluechip', returns: 16.9, risk: 'Low', allocation: 20, sharpe: 1.35, alpha: 1.9, beta: 0.92, tracking: 1.5, info: 0.38 },
  { fund: 'Kotak Emerging Equity', returns: 28.4, risk: 'High', allocation: 20, sharpe: 1.76, alpha: 5.3, beta: 1.28, tracking: 3.6, info: 0.74 }
];

const UltraPremiumSIPDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [marketPulse, setMarketPulse] = useState(0);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [neuralActivity, setNeuralActivity] = useState(0);
  const [quantumState, setQuantumState] = useState('stable');
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Advanced real-time simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    const pulseInterval = setInterval(() => {
      setMarketPulse(prev => (prev + 1) % 100);
      setNeuralActivity(Math.random() * 100);
      setQuantumState(prev => prev === 'stable' ? 'processing' : 'stable');
    }, 2000);
    
    const aiInterval = setInterval(() => {
      setAiProcessing(prev => !prev);
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(pulseInterval);
      clearInterval(aiInterval);
    };
  }, []);

  // Mouse tracking for neural interactions
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const tabs = [
    { id: 'overview', name: 'Neural Overview', icon: Cpu, color: 'from-blue-600 via-purple-600 to-indigo-600' },
    { id: 'quantum', name: 'Quantum Analytics', icon: Atom, color: 'from-purple-600 via-pink-600 to-red-600' },
    { id: 'matrix', name: 'Matrix Portfolio', icon: Network, color: 'from-green-600 via-teal-600 to-blue-600' },
    { id: 'ai-core', name: 'AI Core', icon: Brain, color: 'from-violet-600 via-purple-600 to-indigo-600' },
    { id: 'insights', name: 'Predictive Engine', icon: Radar, color: 'from-amber-600 via-orange-600 to-red-600' }
  ];

  // Ultra-Premium Loading with Neural Network Animation
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 flex items-center justify-center overflow-hidden">
        <motion.div 
          className="text-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Neural Network Background */}
          <div className="absolute inset-0 -m-32">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                initial={{ 
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200,
                  opacity: 0
                }}
                animate={{
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200,
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
          
          {/* Central Neural Core */}
          <motion.div 
            className="relative w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mx-auto mb-8 flex items-center justify-center"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 0 20px rgba(59, 130, 246, 0.5)',
                '0 0 40px rgba(147, 51, 234, 0.7)',
                '0 0 20px rgba(59, 130, 246, 0.5)'
              ]
            }}
            transition={{ 
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity },
              boxShadow: { duration: 2, repeat: Infinity }
            }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center"
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Cpu className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl font-black text-white mb-4 tracking-tight"
            animate={{ 
              opacity: [0.5, 1, 0.5],
              textShadow: [
                '0 0 10px rgba(255, 255, 255, 0.5)',
                '0 0 20px rgba(147, 51, 234, 0.8)',
                '0 0 10px rgba(255, 255, 255, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            SIP Brewery Ultra
          </motion.h2>
          
          <motion.p 
            className="text-purple-300 text-lg mb-8"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            Initializing Neural Financial Intelligence...
          </motion.p>
          
          {/* Loading Progress */}
          <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/10 to-slate-950 font-['Inter',system-ui,sans-serif] overflow-hidden"
    >
      {/* Ultra-Advanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Neural Grid */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="neural-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(147, 51, 234, 0.1)" strokeWidth="1"/>
                <circle cx="30" cy="30" r="1" fill="rgba(147, 51, 234, 0.3)"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural-grid)" />
          </svg>
        </div>
        
        {/* Quantum Particles */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 60% 30%, rgba(245, 101, 101, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Neural Connections */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-32 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + i * 15}%`
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </div>
      
      {/* Ultra-Premium Header with Neural Interface */}
      <motion.header 
        className="relative z-10 bg-black/20 backdrop-blur-3xl border-b border-white/10"
        style={{
          boxShadow: ULTRA_DESIGN_SYSTEM.shadows.neural
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-8xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {/* Neural Logo */}
              <motion.div 
                className="relative w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.5)',
                    '0 0 30px rgba(147, 51, 234, 0.7)',
                    '0 0 20px rgba(59, 130, 246, 0.5)'
                  ]
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Atom className="w-8 h-8 text-white" />
                </motion.div>
                
                {/* Neural Activity Indicator */}
                <motion.div 
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
              </motion.div>
              
              <div>
                <motion.h1 
                  className="text-4xl font-black text-white tracking-tighter"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  SIP Brewery Ultra
                </motion.h1>
                <div className="flex items-center space-x-4 mt-2">
                  <motion.p 
                    className="text-purple-300 text-sm font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Neural Financial Intelligence Platform
                  </motion.p>
                  
                  {/* AI Status Indicators */}
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div 
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <span className="text-green-400 text-xs font-bold">Neural Active</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center space-x-2 px-3 py-1 bg-blue-500/20 rounded-full border border-blue-500/30"
                      animate={{ 
                        opacity: aiProcessing ? [0.7, 1, 0.7] : 0.5,
                        scale: aiProcessing ? [1, 1.05, 1] : 1
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Cpu className="w-3 h-3 text-blue-400" />
                      <span className="text-blue-400 text-xs font-bold">
                        {aiProcessing ? 'Processing' : 'Standby'}
                      </span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center space-x-2 px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        <Radar className="w-3 h-3 text-purple-400" />
                      </motion.div>
                      <span className="text-purple-400 text-xs font-bold">Quantum Sync</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-8">
              {/* Neural Activity Monitor */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-sm text-purple-300 font-medium mb-1">Neural Activity</div>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      animate={{ width: `${neuralActivity}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="text-white text-xs font-bold">{Math.round(neuralActivity)}%</span>
                </div>
              </motion.div>
              
              {/* Portfolio Value with Quantum Effects */}
              <div className="text-right">
                <motion.div 
                  className="text-4xl font-black text-white tracking-tighter"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                  whileHover={{
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
                    scale: 1.02
                  }}
                >
                  ₹27,50,000
                </motion.div>
                <div className="flex items-center justify-end space-x-3 mt-1">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </motion.div>
                  <span className="text-green-400 text-sm font-bold">+19.7% • ₹4,52,000</span>
                  <motion.div
                    className="px-2 py-1 bg-green-500/20 rounded-full border border-green-500/30"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-green-400 text-xs font-bold">Alpha: +3.2%</span>
                  </motion.div>
                </div>
              </div>
              
              {/* Neural Action Button */}
              <motion.button 
                className="relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-2xl font-bold shadow-2xl overflow-hidden group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  boxShadow: ULTRA_DESIGN_SYSTEM.shadows.quantum
                }}
              >
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-6 h-6" />
                  </motion.div>
                  <span>Neural SIP</span>
                </div>
                
                {/* Particle Effects */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      animate={{
                        x: [0, 100, 0],
                        y: [0, -20, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                      style={{
                        left: `${20 + i * 20}%`,
                        top: '50%'
                      }}
                    />
                  ))}
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Ultra-Premium Neural Navigation */}
      <motion.nav 
        className="relative z-10 bg-black/10 backdrop-blur-3xl border-b border-white/5"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          boxShadow: ULTRA_DESIGN_SYSTEM.shadows.matrix
        }}
      >
        <div className="max-w-8xl mx-auto px-8">
          <div className="flex justify-center space-x-1">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center space-x-4 px-8 py-6 rounded-t-2xl transition-all duration-500 group overflow-hidden ${
                    isActive
                      ? 'bg-white/10 text-white shadow-2xl'
                      : 'text-purple-300 hover:text-white hover:bg-white/5'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Neural Background Effect */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-r ${tab.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    initial={false}
                  />
                  
                  {/* Quantum Particle Effects */}
                  {isActive && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          animate={{
                            x: [0, Math.random() * 100 - 50],
                            y: [0, Math.random() * 100 - 50],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                          }}
                        />
                      ))}
                    </div>
                  )}
                  
                  <motion.div 
                    className={`relative p-3 rounded-xl bg-gradient-to-r ${tab.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    animate={isActive ? {
                      boxShadow: [
                        '0 0 20px rgba(59, 130, 246, 0.5)',
                        '0 0 30px rgba(147, 51, 234, 0.7)',
                        '0 0 20px rgba(59, 130, 246, 0.5)'
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </motion.div>
                  
                  <div className="relative">
                    <span className="font-bold text-lg">{tab.name}</span>
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full"
                        layoutId="activeTabIndicator"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </div>
                  
                  {/* Neural Connection Lines */}
                  {isActive && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Ultra-Premium Neural Main Content */}
      <main className="relative z-10 max-w-8xl mx-auto px-8 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="neural-overview"
              className="space-y-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              {/* Ultra-Premium Neural KPI Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { 
                    icon: Activity, 
                    value: '24', 
                    label: 'Active Neural SIPs', 
                    change: '+12%', 
                    trend: 'up',
                    color: 'from-blue-600 via-indigo-600 to-purple-600',
                    bgColor: 'from-blue-500/10 via-indigo-500/10 to-purple-500/10',
                    metric: 'Sharpe: 1.68',
                    neural: 'Neural Score: 94%'
                  },
                  { 
                    icon: Target, 
                    value: '₹45,000', 
                    label: 'Quantum SIP Flow', 
                    change: '+8%', 
                    trend: 'up',
                    color: 'from-purple-600 via-pink-600 to-red-600',
                    bgColor: 'from-purple-500/10 via-pink-500/10 to-red-500/10',
                    metric: 'Alpha: +3.2%',
                    neural: 'AI Confidence: 91%'
                  },
                  { 
                    icon: TrendingUp, 
                    value: '22.4%', 
                    label: 'Neural XIRR', 
                    change: 'Quantum Enhanced', 
                    trend: 'up',
                    color: 'from-emerald-600 via-green-600 to-teal-600',
                    bgColor: 'from-emerald-500/10 via-green-500/10 to-teal-500/10',
                    metric: 'Beta: 0.89',
                    neural: 'Risk Adjusted: 98%'
                  },
                  { 
                    icon: Award, 
                    value: '₹4.52L', 
                    label: 'Quantum Gains', 
                    change: '+19.7%', 
                    trend: 'up',
                    color: 'from-amber-600 via-orange-600 to-red-600',
                    bgColor: 'from-amber-500/10 via-orange-500/10 to-red-500/10',
                    metric: 'Info Ratio: 0.74',
                    neural: 'Predictive: 96%'
                  }
                ].map((kpi, index) => (
                  <motion.div
                    key={index}
                    className={`relative overflow-hidden bg-gradient-to-br ${kpi.bgColor} backdrop-blur-3xl border border-white/10 rounded-3xl p-8 group hover:scale-105 transition-all duration-700`}
                    initial={{ opacity: 0, y: 60, rotateX: -15 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ 
                      delay: 0.1 * index, 
                      type: "spring", 
                      stiffness: 100,
                      duration: 0.8
                    }}
                    whileHover={{ 
                      y: -8, 
                      rotateY: 5,
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                    style={{
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Neural Grid Background */}
                    <div className="absolute inset-0 opacity-30">
                      <svg width="100%" height="100%" className="absolute inset-0">
                        <defs>
                          <pattern id={`neural-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="10" cy="10" r="0.5" fill="rgba(255, 255, 255, 0.1)"/>
                            <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#neural-${index})`} />
                      </svg>
                    </div>
                    
                    {/* Quantum Particle Effects */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${kpi.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                      initial={false}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <motion.div 
                          className={`p-4 rounded-2xl bg-gradient-to-r ${kpi.color} shadow-2xl`}
                          whileHover={{ scale: 1.15, rotate: 15 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          animate={{
                            boxShadow: [
                              '0 10px 20px rgba(0, 0, 0, 0.1)',
                              '0 20px 40px rgba(147, 51, 234, 0.3)',
                              '0 10px 20px rgba(0, 0, 0, 0.1)'
                            ]
                          }}
                        >
                          <kpi.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        
                        <div className="text-right">
                          <motion.div
                            animate={{ rotate: kpi.trend === 'up' ? 0 : 180 }}
                            transition={{ duration: 0.5 }}
                          >
                            <ArrowUpRight className={`w-6 h-6 ${
                              kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'
                            }`} />
                          </motion.div>
                          <motion.div
                            className="text-xs text-purple-300 mt-1"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {kpi.neural}
                          </motion.div>
                        </div>
                      </div>
                      
                      <motion.div 
                        className="text-4xl font-black text-white mb-3 tracking-tighter"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 * index, type: "spring", stiffness: 200 }}
                        whileHover={{
                          textShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
                          scale: 1.05
                        }}
                      >
                        {kpi.value}
                      </motion.div>
                      
                      <div className="text-purple-200 text-sm font-medium mb-4">{kpi.label}</div>
                      
                      <div className="flex items-center justify-between">
                        <motion.div 
                          className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold ${
                            kpi.trend === 'up' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 * index }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {kpi.change}
                        </motion.div>
                        
                        <div className="text-xs text-purple-400 font-semibold">
                          {kpi.metric}
                        </div>
                      </div>
                    </div>
                    
                    {/* Neural Glow Effect */}
                    <motion.div 
                      className={`absolute -inset-1 bg-gradient-to-r ${kpi.color} rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-700`}
                      animate={{
                        opacity: [0, 0.2, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                  </motion.div>
                ))}
              </div>
