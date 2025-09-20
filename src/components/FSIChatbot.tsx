'use client';

import React, { useState, useEffect, useRef } from 'react';
import { fsiApi, ChatMessage, ChatResponse } from '../services/fsiApi';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  analysisData?: any;
  suggestions?: string[];
}

const InvioraChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      // Send message to FSI backend
      const response: ChatResponse = await fsiApi.sendChatMessage(currentInput, {
        conversationHistory: messages.slice(-5) // Send last 5 messages for context
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        isUser: false,
        timestamp: new Date(),
        analysisData: response.analysis,
        suggestions: response.suggestions
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat API error:', error);
      
      // Fallback to local responses
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getFallbackResponse(currentInput),
        isUser: false,
        timestamp: new Date(),
        suggestions: getFallbackSuggestions(currentInput)
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const getFallbackResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return "✨ Hello! I'm Inviora - your personal ASI financial advisor. What can I help you with today?";
    } else if (lowerInput.includes('invest') || lowerInput.includes('fund') || lowerInput.includes('portfolio')) {
      return "📈 I can help you analyze investment opportunities and portfolio optimization strategies. Would you like me to analyze a specific fund or help optimize your portfolio?";
    } else if (lowerInput.includes('sip') || lowerInput.includes('systematic')) {
      return "🍺 SIP Brewery specializes in systematic investment plans. I can help you calculate optimal SIP amounts, analyze fund performance, or create a goal-based investment strategy.";
    } else if (lowerInput.includes('risk') || lowerInput.includes('assessment')) {
      return "🛡️ I can perform a comprehensive risk assessment of your portfolio and provide recommendations to optimize your risk-return profile.";
    } else {
      return "💜 I'm Inviora - your personal ASI financial advisor. I can help with fund analysis, portfolio optimization, SIP planning, risk assessment, and market insights. What would you like to explore?";
    }
  };

  const getFallbackSuggestions = (input: string): string[] => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('fund') || lowerInput.includes('invest')) {
      return ["Analyze a specific fund", "Compare multiple funds", "Get top fund recommendations"];
    } else if (lowerInput.includes('sip')) {
      return ["Calculate SIP returns", "Find best SIP funds", "Create SIP strategy"];
    } else if (lowerInput.includes('portfolio')) {
      return ["Optimize my portfolio", "Assess portfolio risk", "Rebalance suggestions"];
    } else {
      return ["Analyze funds", "SIP calculator", "Portfolio optimizer", "Market insights"];
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
      if (messages.length === 0) {
        setTimeout(() => {
          const welcomeMessage: Message = {
            id: Date.now().toString(),
            text: "✨ Hello! I'm Inviora - your personal ASI financial advisor. What can I help you with today?",
            isUser: false,
            timestamp: new Date()
          };
          setMessages([welcomeMessage]);
        }, 500);
      }
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
            boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)'
          }}
        >
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
          <div className="text-2xl">✨</div>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 flex flex-col z-50">
          {/* Header */}
          <div className="p-4 border-b border-gray-700 bg-gray-800 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center">
                  ✨
                </div>
                <div>
                  <h3 className="text-white font-semibold">Inviora</h3>
                  <p className="text-purple-400 text-xs">Your Personal ASI Financial Advisor</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Inviora about your investments..."
                className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-xl border border-gray-600 focus:border-green-400 focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="px-4 py-2 rounded-xl font-medium transition-all disabled:opacity-50"
                style={{
                  background: inputText.trim() && !isTyping 
                    ? 'linear-gradient(135deg, #00FF87 0%, #4AE3F7 100%)'
                    : '#4B5563',
                  color: inputText.trim() && !isTyping ? '#000' : '#9CA3AF'
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InvioraChatbot;
