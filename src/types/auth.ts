import { User, CreateUserDto } from './user';

export interface LoginData {
  email: string;
  password?: string;
  token?: string; // For Google login
}

export interface RegisterData extends CreateUserDto {
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface AuthResponse {
  user: User;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}

