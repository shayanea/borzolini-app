import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Token Management Service
 * Handles SecureStore-based token storage and retrieval
 */

export interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export class TokenService {
  private static readonly ACCESS_TOKEN_KEY = 'clinic_native_access_token';
  private static readonly REFRESH_TOKEN_KEY = 'clinic_native_refresh_token';
  private static readonly TOKEN_EXPIRY_KEY = 'clinic_native_token_expiry';

  /**
   * Store tokens in SecureStore
   */
  static async setTokens(
    accessToken: string,
    refreshToken: string,
    expiresIn: number = 30 * 60 * 1000
  ): Promise<void> {
    try {
      const expiresAt = Date.now() + expiresIn;

      if (Platform.OS === 'web') {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
        localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiresAt.toString());
      } else {
        await SecureStore.setItemAsync(this.ACCESS_TOKEN_KEY, accessToken);
        await SecureStore.setItemAsync(this.REFRESH_TOKEN_KEY, refreshToken);
        await SecureStore.setItemAsync(
          this.TOKEN_EXPIRY_KEY,
          expiresAt.toString()
        );
      }

      console.log('TokenService: Tokens stored successfully');
    } catch (error) {
      console.error('TokenService: Failed to store tokens:', error);
      throw new Error('Failed to store authentication tokens');
    }
  }

  /**
   * Get access token from SecureStore
   */
  static async getAccessToken(): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(this.ACCESS_TOKEN_KEY);
      }
      return await SecureStore.getItemAsync(this.ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('TokenService: Failed to get access token:', error);
      return null;
    }
  }

  /**
   * Get refresh token from SecureStore
   */
  static async getRefreshToken(): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
      }
      return await SecureStore.getItemAsync(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('TokenService: Failed to get refresh token:', error);
      return null;
    }
  }

  /**
   * Get all token data
   */
  static async getTokenData(): Promise<TokenData | null> {
    try {
      const accessToken = await this.getAccessToken();
      const refreshToken = await this.getRefreshToken();
      
      let expiresAtStr: string | null = null;
      if (Platform.OS === 'web') {
        expiresAtStr = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
      } else {
        expiresAtStr = await SecureStore.getItemAsync(this.TOKEN_EXPIRY_KEY);
      }

      const hasAccessToken = !!accessToken;
      const hasRefreshToken = !!refreshToken;
      const hasExpiryStr = !!expiresAtStr;

      if (!hasAccessToken) return null;
      if (!hasRefreshToken) return null;
      if (!hasExpiryStr) return null;

      return {
        accessToken: accessToken!,
        refreshToken: refreshToken!,
        expiresAt: parseInt(expiresAtStr!, 10),
      };
    } catch (error) {
      console.error('TokenService: Failed to get token data:', error);
      return null;
    }
  }

  /**
   * Check if access token is valid (not expired)
   */
  static async isAccessTokenValid(): Promise<boolean> {
    try {
      let expiresAtStr: string | null = null;
      if (Platform.OS === 'web') {
        expiresAtStr = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
      } else {
        expiresAtStr = await SecureStore.getItemAsync(this.TOKEN_EXPIRY_KEY);
      }

      if (!expiresAtStr) {
        return false;
      }

      const expiresAt = parseInt(expiresAtStr, 10);
      const now = Date.now();
      const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds
      const isValid = now < expiresAt - bufferTime;

      return isValid;
    } catch (error) {
      console.error('TokenService: Failed to check token validity:', error);
      return false;
    }
  }

  /**
   * Clear all tokens from SecureStore
   */
  static async clearTokens(): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(this.ACCESS_TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
        localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
      } else {
        await SecureStore.deleteItemAsync(this.ACCESS_TOKEN_KEY);
        await SecureStore.deleteItemAsync(this.REFRESH_TOKEN_KEY);
        await SecureStore.deleteItemAsync(this.TOKEN_EXPIRY_KEY);
      }

      console.log('TokenService: Tokens cleared successfully');
    } catch (error) {
      console.error('TokenService: Failed to clear tokens:', error);
    }
  }

  /**
   * Check if user has any stored tokens
   */
  static async hasTokens(): Promise<boolean> {
    const accessToken = await this.getAccessToken();
    const refreshToken = await this.getRefreshToken();
    return accessToken !== null && refreshToken !== null;
  }

  /**
   * Get Authorization header value
   */
  static async getAuthorizationHeader(): Promise<string | null> {
    const accessToken = await this.getAccessToken();
    return accessToken ? `Bearer ${accessToken}` : null;
  }
}

export default TokenService;

