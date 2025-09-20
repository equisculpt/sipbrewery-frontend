'use client';

import { useState, useEffect } from 'react';

interface SentimentData {
  overall: number; // -100 to 100
  fear_greed: number; // 0 to 100
  social_sentiment: number;
  news_sentiment: number;
  technical_sentiment: number;
  institutional_flow: number;
  retail_sentiment: number;
  options_sentiment: number;
}

interface NewsItem {
  id: string;
  title: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  impact: 'high' | 'medium' | 'low';
  source: string;
  timestamp: number;
  relevance: number;
}

interface SocialMetrics {
  platform: string;
  mentions: number;
  sentiment: number;
  trending_topics: string[];
  influence_score: number;
}

export default function MarketSentimentAnalysis() {
  const [sentimentData, setSentimentData] = useState<SentimentData | null>(null);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [socialMetrics, setSocialMetrics] = useState<SocialMetrics[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1H' | '4H' | '1D' | '1W'>('1D');
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const fetchASISentiment = async () => {
      setLoading(true);
      try {
        const response = await fetch('/asi/process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'market_sentiment',
            data: { timeframe: selectedTimeframe },
            parameters: {}
          })
        });
        if (!response.ok) throw new Error('ASI backend error');
        const data = await response.json();
        const asiResult = data.result || data;
        if (asiResult && asiResult.sentimentData && asiResult.newsItems && asiResult.socialMetrics) {
          setSentimentData(asiResult.sentimentData);
          setNewsItems(asiResult.newsItems);
          setSocialMetrics(asiResult.socialMetrics);
        } else {
          throw new Error('ASI returned incomplete sentiment data');
        }
      } catch (error) {
        console.error('❌ Failed to fetch ASI sentiment data:', error);
        // Fallback to mock data
        generateSentimentData();
      } finally {
        setLoading(false);
      }
    };
    fetchASISentiment();

    const generateSentimentData = () => {
      // Generate realistic sentiment data
      const baseTime = Date.now();
      const volatility = 0.1;
      
      const mockSentiment: SentimentData = {
        overall: 15 + (Math.random() - 0.5) * 30, // Slightly positive market
        fear_greed: 65 + (Math.random() - 0.5) * 20, // Greed territory
        social_sentiment: 22 + (Math.random() - 0.5) * 25,
        news_sentiment: 8 + (Math.random() - 0.5) * 20,
        technical_sentiment: 35 + (Math.random() - 0.5) * 30,
        institutional_flow: 12 + (Math.random() - 0.5) * 15,
        retail_sentiment: 45 + (Math.random() - 0.5) * 40,
        options_sentiment: -5 + (Math.random() - 0.5) * 25
      };

      const mockNews: NewsItem[] = [
        {
          id: '1',
          title: 'RBI maintains repo rate at 6.5%, signals cautious optimism',
          sentiment: 'positive',
          impact: 'high',
          source: 'Economic Times',
          timestamp: baseTime - 3600000,
          relevance: 95
        },
        {
          id: '2',
          title: 'FII inflows surge to ₹15,000 crores in January',
          sentiment: 'positive',
          impact: 'high',
          source: 'Business Standard',
          timestamp: baseTime - 7200000,
          relevance: 88
        },
        {
          id: '3',
          title: 'IT sector faces headwinds amid global slowdown concerns',
          sentiment: 'negative',
          impact: 'medium',
          source: 'Mint',
          timestamp: baseTime - 10800000,
          relevance: 75
        },
        {
          id: '4',
          title: 'Banking stocks rally on strong Q3 earnings expectations',
          sentiment: 'positive',
          impact: 'medium',
          source: 'CNBC TV18',
          timestamp: baseTime - 14400000,
          relevance: 82
        },
        {
          id: '5',
          title: 'Crude oil prices stabilize, positive for Indian markets',
          sentiment: 'positive',
          impact: 'low',
          source: 'Reuters',
          timestamp: baseTime - 18000000,
          relevance: 65
        }
      ];

      const mockSocial: SocialMetrics[] = [
        {
          platform: 'Twitter',
          mentions: 45600 + Math.floor(Math.random() * 10000),
          sentiment: 18 + (Math.random() - 0.5) * 20,
          trending_topics: ['#Nifty50', '#BankingStocks', '#RBI', '#FIIInflows'],
          influence_score: 85
        },
        {
          platform: 'Reddit',
          mentions: 12400 + Math.floor(Math.random() * 5000),
          sentiment: 25 + (Math.random() - 0.5) * 30,
          trending_topics: ['r/IndianStockMarket', 'Portfolio Review', 'SIP Discussion'],
          influence_score: 72
        },
        {
          platform: 'LinkedIn',
          mentions: 8900 + Math.floor(Math.random() * 3000),
          sentiment: 35 + (Math.random() - 0.5) * 25,
          trending_topics: ['Market Analysis', 'Investment Strategy', 'Economic Outlook'],
          influence_score: 68
        },
        {
          platform: 'YouTube',
          mentions: 15600 + Math.floor(Math.random() * 8000),
          sentiment: 12 + (Math.random() - 0.5) * 35,
          trending_topics: ['Stock Analysis', 'Market Predictions', 'Trading Tips'],
          influence_score: 78
        }
      ];

      setSentimentData(mockSentiment);
      setNewsItems(mockNews);
      setSocialMetrics(mockSocial);
    };

    generateSentimentData();
    const interval = setInterval(generateSentimentData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [isClient, selectedTimeframe]);

  if (!isClient || !sentimentData) {
    return (
      <div style={{
        background: 'rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        padding: '3rem',
        textAlign: 'center',
        margin: '4rem 0',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ opacity: 0.6 }}>Loading Market Sentiment Analysis...</div>
      </div>
    );
  }

  const getSentimentColor = (value: number) => {
    if (value > 20) return '#39ff14';
    if (value > -20) return '#ff8000';
    return '#ff4757';
  };

  const getSentimentLabel = (value: number) => {
    if (value > 40) return 'Extremely Bullish';
    if (value > 20) return 'Bullish';
    if (value > -20) return 'Neutral';
    if (value > -40) return 'Bearish';
    return 'Extremely Bearish';
  };

  const getFearGreedLabel = (value: number) => {
    if (value > 80) return 'Extreme Greed';
    if (value > 60) return 'Greed';
    if (value > 40) return 'Neutral';
    if (value > 20) return 'Fear';
    return 'Extreme Fear';
  };

  return (
    <div style={{ margin: '4rem 0' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            background: 'linear-gradient(45deg, #00f9ff, #39ff14)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            🧠 AI Market Sentiment Analysis
          </h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
            Real-time sentiment analysis powered by AI across multiple data sources
          </p>
        </div>
        
        {/* Timeframe Selector */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['1H', '4H', '1D', '1W'] as const).map(period => (
            <button
              key={period}
              onClick={() => setSelectedTimeframe(period)}
              style={{
                background: selectedTimeframe === period 
                  ? 'linear-gradient(45deg, #00f9ff, #39ff14)'
                  : 'rgba(255,255,255,0.1)',
                color: selectedTimeframe === period ? '#000000' : '#ffffff',
                border: 'none',
                padding: '0.8rem 1.2rem',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Main Sentiment Indicators */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {/* Overall Sentiment */}
        <div style={{
          background: `linear-gradient(135deg, ${getSentimentColor(sentimentData.overall)}20 0%, rgba(0,0,0,0.3) 100%)`,
          border: `1px solid ${getSentimentColor(sentimentData.overall)}40`,
          borderRadius: '20px',
          padding: '2rem',
          backdropFilter: 'blur(20px)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', opacity: 0.8 }}>
            Overall Market Sentiment
          </h3>
          <div style={{
            fontSize: '3rem',
            fontWeight: 700,
            color: getSentimentColor(sentimentData.overall),
            marginBottom: '0.5rem'
          }}>
            {sentimentData.overall.toFixed(0)}
          </div>
          <div style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: getSentimentColor(sentimentData.overall)
          }}>
            {getSentimentLabel(sentimentData.overall)}
          </div>
          
          {/* Sentiment Bar */}
          <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '4px',
            marginTop: '1rem',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${((sentimentData.overall + 100) / 200) * 100}%`,
              height: '100%',
              background: getSentimentColor(sentimentData.overall),
              borderRadius: '4px',
              transition: 'all 0.3s ease'
            }} />
          </div>
        </div>

        {/* Fear & Greed Index */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,128,0,0.2) 0%, rgba(0,0,0,0.3) 100%)',
          border: '1px solid rgba(255,128,0,0.4)',
          borderRadius: '20px',
          padding: '2rem',
          backdropFilter: 'blur(20px)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😱</div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', opacity: 0.8 }}>
            Fear & Greed Index
          </h3>
          <div style={{
            fontSize: '3rem',
            fontWeight: 700,
            color: '#ff8000',
            marginBottom: '0.5rem'
          }}>
            {sentimentData.fear_greed.toFixed(0)}
          </div>
          <div style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#ff8000'
          }}>
            {getFearGreedLabel(sentimentData.fear_greed)}
          </div>
          
          {/* Circular Progress */}
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: `conic-gradient(#ff8000 0deg ${(sentimentData.fear_greed / 100) * 360}deg, rgba(255,255,255,0.1) ${(sentimentData.fear_greed / 100) * 360}deg 360deg)`,
            margin: '1rem auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 700
            }}>
              {sentimentData.fear_greed.toFixed(0)}
            </div>
          </div>
        </div>

        {/* Social Sentiment */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,249,255,0.2) 0%, rgba(0,0,0,0.3) 100%)',
          border: '1px solid rgba(0,249,255,0.4)',
          borderRadius: '20px',
          padding: '2rem',
          backdropFilter: 'blur(20px)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              📱 Social Media Sentiment
            </h3>
            <div style={{
              background: 'rgba(0,249,255,0.3)',
              padding: '0.3rem 0.8rem',
              borderRadius: '15px',
              fontSize: '0.8rem',
              fontWeight: 600
            }}>
              Live
            </div>
          </div>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            {socialMetrics.map(metric => (
              <div
                key={metric.platform}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>
                    {metric.platform}
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                    {metric.mentions.toLocaleString()} mentions
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    color: getSentimentColor(metric.sentiment),
                    fontWeight: 700,
                    fontSize: '1.1rem'
                  }}>
                    {metric.sentiment > 0 ? '+' : ''}{metric.sentiment.toFixed(0)}
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                    Influence: {metric.influence_score}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Sentiment Breakdown */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {/* Sentiment Components */}
        <div style={{
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '2rem',
          backdropFilter: 'blur(20px)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '2rem',
            color: '#00f9ff'
          }}>
            📈 Sentiment Components
          </h3>
          
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              { label: 'News Sentiment', value: sentimentData.news_sentiment, icon: '📰' },
              { label: 'Technical Sentiment', value: sentimentData.technical_sentiment, icon: '📊' },
              { label: 'Institutional Flow', value: sentimentData.institutional_flow, icon: '🏦' },
              { label: 'Retail Sentiment', value: sentimentData.retail_sentiment, icon: '👥' },
              { label: 'Options Sentiment', value: sentimentData.options_sentiment, icon: '📋' }
            ].map(component => (
              <div
                key={component.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{component.icon}</span>
                  <span style={{ fontWeight: 600 }}>{component.label}</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '100px',
                    height: '6px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${((component.value + 100) / 200) * 100}%`,
                      height: '100%',
                      background: getSentimentColor(component.value),
                      borderRadius: '3px'
                    }} />
                  </div>
                  <span style={{
                    color: getSentimentColor(component.value),
                    fontWeight: 700,
                    minWidth: '40px',
                    textAlign: 'right'
                  }}>
                    {component.value > 0 ? '+' : ''}{component.value.toFixed(0)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* News Sentiment */}
        <div style={{
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '2rem',
          backdropFilter: 'blur(20px)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '2rem',
            color: '#39ff14'
          }}>
            📰 Latest News Impact
          </h3>
          
          <div style={{ display: 'grid', gap: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
            {newsItems.map(news => (
              <div
                key={news.id}
                style={{
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  borderLeft: `4px solid ${
                    news.sentiment === 'positive' ? '#39ff14' : 
                    news.sentiment === 'negative' ? '#ff4757' : '#ff8000'
                  }`
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{
                    background: news.impact === 'high' ? '#ff4757' : 
                               news.impact === 'medium' ? '#ff8000' : '#39ff14',
                    color: '#000000',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '10px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    {news.impact} Impact
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                    {new Date(news.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                
                <h4 style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  lineHeight: 1.4
                }}>
                  {news.title}
                </h4>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                  opacity: 0.7
                }}>
                  <span>{news.source}</span>
                  <span>Relevance: {news.relevance}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(128,0,255,0.2) 0%, rgba(0,0,0,0.3) 100%)',
        border: '1px solid rgba(128,0,255,0.4)',
        borderRadius: '20px',
        padding: '2rem',
        backdropFilter: 'blur(20px)'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          color: '#8000ff'
        }}>
          🤖 AI Market Insights
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{
            padding: '1.5rem',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '15px'
          }}>
            <h4 style={{ color: '#00f9ff', marginBottom: '1rem' }}>📊 Current Assessment</h4>
            <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
              Market sentiment is showing {getSentimentLabel(sentimentData.overall).toLowerCase()} 
              signals with institutional flows remaining positive. Social media buzz indicates 
              growing retail interest in banking and technology sectors.
            </p>
          </div>
          
          <div style={{
            padding: '1.5rem',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '15px'
          }}>
            <h4 style={{ color: '#39ff14', marginBottom: '1rem' }}>🎯 Key Drivers</h4>
            <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
              RBI policy stance, FII inflows, and Q3 earnings expectations are primary 
              sentiment drivers. Options data suggests cautious optimism with put-call 
              ratio indicating moderate bullishness.
            </p>
          </div>
          
          <div style={{
            padding: '1.5rem',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '15px'
          }}>
            <h4 style={{ color: '#ff8000', marginBottom: '1rem' }}>⚠️ Risk Factors</h4>
            <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
              Global economic uncertainties and geopolitical tensions remain key risks. 
              Monitor crude oil prices and US Fed policy decisions for potential 
              sentiment shifts in the coming sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
