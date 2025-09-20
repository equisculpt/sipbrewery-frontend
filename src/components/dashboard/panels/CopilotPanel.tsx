"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, TrendingUp, Shield, Target, Zap, Brain, MessageSquare, Lightbulb, AlertCircle, CheckCircle } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const aiInsights = [
  {
    type: 'opportunity',
    icon: TrendingUp,
    title: 'Rebalancing Opportunity',
    description: 'Your large-cap allocation is 8% overweight. Consider reallocating ₹25,000 to mid-cap funds.',
    confidence: 92,
    impact: 'High',
    action: 'Rebalance Now'
  },
  {
    type: 'risk',
    icon: Shield,
    title: 'Risk Concentration Alert',
    description: 'Technology sector exposure at 28% exceeds optimal 20% threshold. Diversify across sectors.',
    confidence: 87,
    impact: 'Medium',
    action: 'Review Allocation'
  },
  {
    type: 'performance',
    icon: Target,
    title: 'Tax Optimization',
    description: 'Switch to ELSS funds can save ₹18,000 in taxes while maintaining similar returns.',
    confidence: 95,
    impact: 'High',
    action: 'Optimize Taxes'
  }
];

const quickActions = [
  { label: 'Analyze my portfolio risk', query: 'What are the main risks in my current portfolio allocation?' },
  { label: 'Suggest rebalancing strategy', query: 'How should I rebalance my portfolio for optimal returns?' },
  { label: 'Tax optimization ideas', query: 'What tax-saving investment opportunities do I have?' },
  { label: 'Market outlook impact', query: 'How will current market conditions affect my investments?' }
];

export default function CopilotPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI Strategy Copilot. I\'ve analyzed your portfolio and identified 3 key optimization opportunities. How can I help you today?',
      timestamp: new Date(),
      suggestions: ['Show portfolio analysis', 'Risk assessment', 'Rebalancing suggestions', 'Tax optimization']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(content),
        timestamp: new Date(),
        suggestions: generateSuggestions(content)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('risk')) {
      return 'Based on my analysis, your portfolio has a moderate risk profile with a Sharpe ratio of 1.84. Key risks include: 28% technology sector concentration (optimal: 20%), 65% equity allocation (suitable for your age), and currency exposure of 12%. I recommend diversifying tech holdings and adding defensive sectors like healthcare and utilities.';
    } else if (lowerQuery.includes('rebalanc')) {
      return 'Your portfolio needs strategic rebalancing. Current allocation: Large Cap 45% (target: 35%), Mid Cap 25% (target: 30%), Small Cap 15% (target: 15%), International 15% (target: 20%). Recommended actions: Reduce large cap by ₹25,000, increase mid cap by ₹15,000, add ₹10,000 to international funds. This will improve your risk-adjusted returns by an estimated 2.3%.';
    } else if (lowerQuery.includes('tax')) {
      return 'Excellent tax optimization opportunities identified! You can save ₹18,000 annually by: 1) Switching ₹50,000 to ELSS funds (80C benefit), 2) Moving ₹30,000 to debt funds for indexation benefits, 3) Harvesting ₹15,000 in losses from underperforming funds. Your effective tax rate on investments can drop from 30% to 18% with these changes.';
    } else if (lowerQuery.includes('market')) {
      return 'Current market analysis suggests cautious optimism. Fed policy normalization and strong corporate earnings support equity markets, but inflation concerns persist. For your portfolio: Maintain 65% equity allocation, increase defensive positions by 5%, consider adding commodity exposure (3-5%). Expected 12-month returns: 12-15% with 18% volatility. Key risks: Geopolitical tensions, interest rate volatility.';
    }
    
    return 'I\'ve analyzed your query and here are my insights: Your portfolio shows strong fundamentals with room for optimization. Current performance is above benchmark by 3.2% with controlled risk metrics. I recommend focusing on sector diversification and tax efficiency. Would you like me to elaborate on any specific aspect?';
  };

  const generateSuggestions = (query: string): string[] => {
    return ['Tell me more details', 'Show specific recommendations', 'What are the risks?', 'How do I implement this?'];
  };

  return (
    <div id="panel-copilot" role="tabpanel" aria-labelledby="tab-copilot" className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 relative">
            <Bot className="w-6 h-6 text-white"/>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              AI Strategy Copilot
            </h2>
            <p className="text-purple-200/90 text-sm">Institutional-grade AI for portfolio optimization & strategy</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span>AI Online</span>
        </div>
      </div>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {aiInsights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className="p-4 transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  insight.type === 'opportunity' ? 'bg-emerald-500/20 text-emerald-400' :
                  insight.type === 'risk' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium text-sm">{insight.title}</h3>
                    <span className="text-xs text-purple-300">{insight.confidence}% confidence</span>
                  </div>
                  <p className="text-purple-200 text-xs leading-relaxed mb-3">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      insight.impact === 'High' ? 'bg-red-500/20 text-red-300' :
                      insight.impact === 'Medium' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {insight.impact} Impact
                    </span>
                    <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                      {insight.action}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat Interface */}
      <div className="overflow-hidden">
        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${
                message.type === 'user' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                  : 'bg-slate-700/50 text-purple-100'
              } rounded-2xl px-4 py-3`}>
                {message.type === 'ai' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-blue-400 font-medium">AI Copilot</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>
                {message.suggestions && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(suggestion)}
                        className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-700/50 text-purple-100 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-blue-400 font-medium">AI Copilot is thinking...</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="p-4">
          <div className="text-xs text-purple-300 mb-3">Quick Actions:</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(action.query)}
                className="text-xs px-3 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                placeholder="Ask me about portfolio optimization, risk analysis, or market insights..."
                className="w-full px-4 py-3 rounded-xl bg-slate-700/30 text-white placeholder-purple-300/60 focus:outline-none"
              />
              <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
            </div>
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-blue-400" />
          <span className="text-white font-medium text-sm">AI Powered by Advanced Models</span>
        </div>
        <p className="text-xs text-purple-200 leading-relaxed">
          This AI copilot uses institutional-grade quantitative models, real-time market data, and behavioral finance principles 
          to provide personalized investment strategies. All recommendations are based on your risk profile, goals, and current market conditions.
        </p>
      </div>
    </div>
  );
}
