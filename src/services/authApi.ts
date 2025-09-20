/**
 * Authentication API Service
 * Handles user authentication, registration, and profile management
 */

import { apiClient, ApiResponse } from './apiClient';

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface AuthResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    isVerified: boolean;
    profileComplete: boolean;
    kycStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
    createdAt: string;
  };
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  panNumber?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  investmentProfile?: {
    riskTolerance: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE';
    investmentExperience: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';
    monthlyIncome: number;
    investmentGoals: string[];
    timeHorizon: string;
  };
  preferences?: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    language: string;
    currency: string;
  };
  kycStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
  isVerified: boolean;
  profileComplete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface OTPRequest {
  email?: string;
  phone?: string;
  type: 'EMAIL_VERIFICATION' | 'PHONE_VERIFICATION' | 'PASSWORD_RESET' | '2FA';
}

export interface OTPVerification {
  email?: string;
  phone?: string;
  otp: string;
  type: 'EMAIL_VERIFICATION' | 'PHONE_VERIFICATION' | 'PASSWORD_RESET' | '2FA';
}

class AuthApiService {
  // Authentication
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/login', credentials);
      
      // Store auth token
      if (response.data.token) {
        apiClient.setAuthToken(response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/register', userData);
      
      // Store auth token
      if (response.data.token) {
        apiClient.setAuthToken(response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/api/auth/logout');
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      // Clear auth token regardless of API call success
      apiClient.clearAuth();
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/api/auth/refresh-token');
    
    if (response.data.token) {
      apiClient.setAuthToken(response.data.token);
    }
    
    return response.data;
  }

  // Password Management
  async requestPasswordReset(data: PasswordResetRequest): Promise<ApiResponse> {
    return apiClient.post('/api/auth/password-reset/request', data);
  }

  async confirmPasswordReset(data: PasswordResetConfirm): Promise<ApiResponse> {
    return apiClient.post('/api/auth/password-reset/confirm', data);
  }

  async changePassword(data: ChangePasswordRequest): Promise<ApiResponse> {
    return apiClient.post('/api/auth/password/change', data);
  }

  // OTP Management
  async sendOTP(data: OTPRequest): Promise<ApiResponse> {
    return apiClient.post('/api/auth/otp/send', data);
  }

  async verifyOTP(data: OTPVerification): Promise<ApiResponse> {
    return apiClient.post('/api/auth/otp/verify', data);
  }

  // Profile Management
  async getProfile(): Promise<UserProfile> {
    const response = await apiClient.get<UserProfile>('/api/auth/profile');
    return response.data;
  }

  async updateProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    const response = await apiClient.put<UserProfile>('/api/auth/profile', profileData);
    return response.data;
  }

  async uploadProfilePicture(file: File): Promise<ApiResponse> {
    return apiClient.uploadFile('/api/auth/profile/picture', file);
  }

  // Email Verification
  async sendEmailVerification(): Promise<ApiResponse> {
    return apiClient.post('/api/auth/email/verify/send');
  }

  async verifyEmail(token: string): Promise<ApiResponse> {
    return apiClient.post('/api/auth/email/verify/confirm', { token });
  }

  // Phone Verification
  async sendPhoneVerification(): Promise<ApiResponse> {
    return apiClient.post('/api/auth/phone/verify/send');
  }

  async verifyPhone(otp: string): Promise<ApiResponse> {
    return apiClient.post('/api/auth/phone/verify/confirm', { otp });
  }

  // KYC Management
  async uploadKYCDocument(documentType: string, file: File): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('documentType', documentType);
    formData.append('file', file);

    return apiClient.post('/api/auth/kyc/upload', formData);
  }

  async getKYCStatus(): Promise<ApiResponse> {
    return apiClient.get('/api/auth/kyc/status');
  }

  async submitKYCForReview(): Promise<ApiResponse> {
    return apiClient.post('/api/auth/kyc/submit');
  }

  // Two-Factor Authentication
  async enable2FA(): Promise<ApiResponse<{ qrCode: string; backupCodes: string[] }>> {
    return apiClient.post('/api/auth/2fa/enable');
  }

  async verify2FASetup(token: string): Promise<ApiResponse> {
    return apiClient.post('/api/auth/2fa/verify-setup', { token });
  }

  async disable2FA(token: string): Promise<ApiResponse> {
    return apiClient.post('/api/auth/2fa/disable', { token });
  }

  // Session Management
  async getCurrentSession(): Promise<ApiResponse> {
    return apiClient.get('/api/auth/session');
  }

  async getActiveSessions(): Promise<ApiResponse> {
    return apiClient.get('/api/auth/sessions');
  }

  async revokeSession(sessionId: string): Promise<ApiResponse> {
    return apiClient.delete(`/api/auth/sessions/${sessionId}`);
  }

  async revokeAllSessions(): Promise<ApiResponse> {
    return apiClient.post('/api/auth/sessions/revoke-all');
  }

  // Account Management
  async deleteAccount(password: string): Promise<ApiResponse> {
    return apiClient.post('/api/auth/account/delete', { password });
  }

  async deactivateAccount(): Promise<ApiResponse> {
    return apiClient.post('/api/auth/account/deactivate');
  }

  async reactivateAccount(token: string): Promise<ApiResponse> {
    return apiClient.post('/api/auth/account/reactivate', { token });
  }

  // Utility Methods
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('auth_token');
  }

  getStoredUser(): UserProfile | null {
    if (typeof window === 'undefined') return null;
    
    const userStr = localStorage.getItem('user_profile');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  storeUser(user: UserProfile): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_profile', JSON.stringify(user));
    }
  }

  clearStoredUser(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_profile');
    }
  }
}

// Export singleton instance
export const authApi = new AuthApiService();
export default authApi;
