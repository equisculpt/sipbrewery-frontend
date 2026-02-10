/**
 * WebSocket Service for Real-Time Updates
 * Handles market data, portfolio updates, ML predictions, and risk alerts
 */

const WS_URL = typeof window !== 'undefined' 
  ? (window as any).NEXT_PUBLIC_WS_URL || 'ws://localhost:5100'
  : 'ws://localhost:5100';

export type WebSocketTopic = 
  | 'market-data' 
  | 'portfolio-updates' 
  | 'ml-predictions' 
  | 'risk-alerts'
  | 'user-events';

export interface WebSocketMessage {
  type: WebSocketTopic;
  payload: any;
  timestamp: string;
}

export interface MarketDataPayload {
  schemeCode: string;
  nav: number;
  change: number;
  changePercent: number;
  timestamp: string;
}

export interface PortfolioUpdatePayload {
  totalValue: number;
  change: number;
  changePercent: number;
  timestamp: string;
}

export interface MLPredictionPayload {
  schemeCode: string;
  prediction: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  expectedReturn: number;
  timestamp: string;
}

export interface RiskAlertPayload {
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  recommendation: string;
  timestamp: string;
}

type MessageHandler = (data: any) => void;

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private messageHandlers: Map<WebSocketTopic, Set<MessageHandler>> = new Map();
  private subscribedTopics: Set<WebSocketTopic> = new Set();
  private isConnecting = false;
  private heartbeatInterval: ReturnType<typeof setInterval> | null = null;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

  // Event handlers
  public onMarketData: ((data: MarketDataPayload) => void) | null = null;
  public onPortfolioUpdate: ((data: PortfolioUpdatePayload) => void) | null = null;
  public onMLPrediction: ((data: MLPredictionPayload) => void) | null = null;
  public onRiskAlert: ((data: RiskAlertPayload) => void) | null = null;

  constructor() {
    // Initialize handlers map
    this.messageHandlers.set('market-data', new Set());
    this.messageHandlers.set('portfolio-updates', new Set());
    this.messageHandlers.set('ml-predictions', new Set());
    this.messageHandlers.set('risk-alerts', new Set());
    this.messageHandlers.set('user-events', new Set());
  }

  /**
   * Connect to WebSocket server
   */
  connect(token?: string): void {
    if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) {
      console.log('WebSocket already connected or connecting');
      return;
    }

    this.isConnecting = true;
    const url = token ? `${WS_URL}/ws?token=${token}` : `${WS_URL}/ws`;

    try {
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log('✅ WebSocket connected');
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        this.reconnectDelay = 1000;

        // Resubscribe to topics
        if (this.subscribedTopics.size > 0) {
          this.subscribe(Array.from(this.subscribedTopics));
        }

        // Start heartbeat
        this.startHeartbeat();
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        this.isConnecting = false;
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        this.isConnecting = false;
        this.stopHeartbeat();
        this.attemptReconnect(token);
      };

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      this.isConnecting = false;
      this.attemptReconnect(token);
    }
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect(): void {
    this.stopHeartbeat();
    
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws) {
      this.ws.close(1000, 'Client disconnect');
      this.ws = null;
    }

    this.reconnectAttempts = 0;
    this.subscribedTopics.clear();
  }

  /**
   * Subscribe to topics
   */
  subscribe(topics: WebSocketTopic[]): void {
    topics.forEach(topic => this.subscribedTopics.add(topic));

    if (this.ws?.readyState === WebSocket.OPEN) {
      this.send({
        type: 'subscribe',
        topics: topics
      });
    }
  }

  /**
   * Unsubscribe from topics
   */
  unsubscribe(topics: WebSocketTopic[]): void {
    topics.forEach(topic => this.subscribedTopics.delete(topic));

    if (this.ws?.readyState === WebSocket.OPEN) {
      this.send({
        type: 'unsubscribe',
        topics: topics
      });
    }
  }

  /**
   * Add message handler for a specific topic
   */
  addMessageHandler(topic: WebSocketTopic, handler: MessageHandler): () => void {
    const handlers = this.messageHandlers.get(topic);
    if (handlers) {
      handlers.add(handler);
    }

    // Return unsubscribe function
    return () => {
      const handlers = this.messageHandlers.get(topic);
      if (handlers) {
        handlers.delete(handler);
      }
    };
  }

  /**
   * Send message to server
   */
  private send(data: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket not connected, cannot send message');
    }
  }

  /**
   * Handle incoming messages
   */
  private handleMessage(message: WebSocketMessage): void {
    const { type, payload } = message;

    // Call registered handlers
    const handlers = this.messageHandlers.get(type);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(payload);
        } catch (error) {
          console.error(`Error in message handler for ${type}:`, error);
        }
      });
    }

    // Call specific event handlers
    switch (type) {
      case 'market-data':
        if (this.onMarketData) {
          this.onMarketData(payload as MarketDataPayload);
        }
        break;

      case 'portfolio-updates':
        if (this.onPortfolioUpdate) {
          this.onPortfolioUpdate(payload as PortfolioUpdatePayload);
        }
        break;

      case 'ml-predictions':
        if (this.onMLPrediction) {
          this.onMLPrediction(payload as MLPredictionPayload);
        }
        break;

      case 'risk-alerts':
        if (this.onRiskAlert) {
          this.onRiskAlert(payload as RiskAlertPayload);
        }
        break;

      default:
        console.log('Unhandled message type:', type);
    }
  }

  /**
   * Attempt to reconnect with exponential backoff
   */
  private attemptReconnect(token?: string): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

    this.reconnectTimeout = setTimeout(() => {
      this.connect(token);
    }, delay);
  }

  /**
   * Start heartbeat to keep connection alive
   */
  private startHeartbeat(): void {
    this.stopHeartbeat();

    this.heartbeatInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.send({ type: 'ping' });
      }
    }, 30000); // Send ping every 30 seconds
  }

  /**
   * Stop heartbeat
   */
  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  /**
   * Get connection status
   */
  getStatus(): 'connected' | 'connecting' | 'disconnected' {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return 'connected';
    } else if (this.isConnecting) {
      return 'connecting';
    } else {
      return 'disconnected';
    }
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

// Export singleton instance
export const websocketService = new WebSocketService();
export default websocketService;
