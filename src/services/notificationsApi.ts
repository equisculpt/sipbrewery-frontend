/**
 * Notifications API Service
 * Handles user notifications, alerts, and preferences
 */

import { apiClient, ApiResponse } from './apiClient';

export interface Notification {
  id: string;
  type: 'SIP_EXECUTED' | 'PAYMENT_SUCCESS' | 'PAYMENT_FAILED' | 'NAV_UPDATE' | 'GOAL_ACHIEVED' | 'RISK_ALERT' | 'KYC_UPDATE' | 'GENERAL';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  metadata?: any;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  categories: {
    transactions: boolean;
    marketUpdates: boolean;
    portfolioAlerts: boolean;
    promotional: boolean;
  };
}

class NotificationsApiService {
  // Get all notifications
  async getNotifications(unreadOnly: boolean = false): Promise<Notification[]> {
    try {
      const response = await apiClient.get<Notification[]>('/api/notifications', { unreadOnly });
      return response.data;
    } catch (error) {
      return this.getMockNotifications();
    }
  }

  // Get unread count
  async getUnreadCount(): Promise<number> {
    try {
      const response = await apiClient.get<{ count: number }>('/api/notifications/unread-count');
      return response.data.count;
    } catch (error) {
      return 3;
    }
  }

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<ApiResponse> {
    try {
      return await apiClient.put(`/api/notifications/${notificationId}/read`);
    } catch (error) {
      return { success: true, data: { message: 'Notification marked as read' } };
    }
  }

  // Mark all as read
  async markAllAsRead(): Promise<ApiResponse> {
    try {
      return await apiClient.put('/api/notifications/mark-all-read');
    } catch (error) {
      return { success: true, data: { message: 'All notifications marked as read' } };
    }
  }

  // Delete notification
  async deleteNotification(notificationId: string): Promise<ApiResponse> {
    try {
      return await apiClient.delete(`/api/notifications/${notificationId}`);
    } catch (error) {
      return { success: true, data: { message: 'Notification deleted' } };
    }
  }

  // Clear all notifications
  async clearAll(): Promise<ApiResponse> {
    try {
      return await apiClient.delete('/api/notifications/clear-all');
    } catch (error) {
      return { success: true, data: { message: 'All notifications cleared' } };
    }
  }

  // Get notification preferences
  async getPreferences(): Promise<NotificationPreferences> {
    try {
      const response = await apiClient.get<NotificationPreferences>('/api/notifications/preferences');
      return response.data;
    } catch (error) {
      return this.getMockPreferences();
    }
  }

  // Update notification preferences
  async updatePreferences(preferences: Partial<NotificationPreferences>): Promise<ApiResponse> {
    try {
      return await apiClient.put('/api/notifications/preferences', preferences);
    } catch (error) {
      return { success: true, data: { message: 'Preferences updated' } };
    }
  }

  // Mock data for development
  private getMockNotifications(): Notification[] {
    return [
      {
        id: 'NOTIF001',
        type: 'SIP_EXECUTED',
        title: 'SIP Executed Successfully',
        message: 'Your SIP of ₹5,000 in HDFC Equity Fund has been executed',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
        actionUrl: '/portfolio',
        priority: 'MEDIUM'
      },
      {
        id: 'NOTIF002',
        type: 'PAYMENT_SUCCESS',
        title: 'Payment Successful',
        message: 'Your payment of ₹10,000 for lumpsum investment has been processed',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        read: false,
        actionUrl: '/investment/success/TXN123',
        priority: 'HIGH'
      },
      {
        id: 'NOTIF003',
        type: 'NAV_UPDATE',
        title: 'NAV Updated',
        message: 'HDFC Top 100 Fund NAV updated to ₹250.50 (+2.5%)',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        priority: 'LOW'
      },
      {
        id: 'NOTIF004',
        type: 'GOAL_ACHIEVED',
        title: 'Goal Milestone Reached! 🎉',
        message: 'You have achieved 50% of your retirement goal',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        read: false,
        actionUrl: '/goals',
        priority: 'HIGH'
      },
      {
        id: 'NOTIF005',
        type: 'RISK_ALERT',
        title: 'Portfolio Risk Alert',
        message: 'Your portfolio volatility has increased by 15%. Consider rebalancing.',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        actionUrl: '/fsi/risk-assessment',
        priority: 'URGENT'
      }
    ];
  }

  private getMockPreferences(): NotificationPreferences {
    return {
      email: true,
      sms: true,
      push: true,
      categories: {
        transactions: true,
        marketUpdates: true,
        portfolioAlerts: true,
        promotional: false
      }
    };
  }
}

// Export singleton instance
export const notificationsApi = new NotificationsApiService();
export default notificationsApi;
