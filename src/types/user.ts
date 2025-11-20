export enum UserRole {
  ADMIN = 'admin',
  VETERINARIAN = 'veterinarian',
  STAFF = 'staff',
  PATIENT = 'patient',
}

export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  passwordHash?: string; // Only included in backend responses, not for frontend use
  role: UserRole;
  avatar?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  preferredLanguage?: string;
  timezone?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  medicalHistory?: string;
  allergies?: string;
  medications?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  insuranceGroupNumber?: string;
  insuranceExpiryDate?: string;
  notes?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isActive: boolean;
  refreshToken?: string; // Only included in backend responses, not for frontend use
  refreshTokenExpiresAt?: Date;
  emailVerificationToken?: string; // Only included in backend responses, not for frontend use
  emailVerificationExpiresAt?: Date;
  phoneVerificationOTP?: string; // Only included in backend responses, not for frontend use
  phoneVerificationExpiresAt?: Date;
  passwordResetToken?: string; // Only included in backend responses, not for frontend use
  passwordResetExpiresAt?: Date;
  passwordUpdatedAt?: Date;
  loginAttempts?: number;
  lockedUntil?: Date;
  lastLoginAt?: Date;
  profileCompletionPercentage: number;
  accountStatus: string;
  createdAt: Date;
  updatedAt: Date;
  isFirstTime?: boolean;
  hasPets?: boolean;
  petCount?: number;
}

// DTOs for API requests
export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: UserRole;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  medicalHistory?: string;
  allergies?: string;
  medications?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  insuranceGroupNumber?: string;
  insuranceExpiryDate?: string;
  notes?: string;
}

export interface UpdateUserDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  isActive?: boolean;
  role?: UserRole;
  notes?: string;
}

// API Response DTOs
export interface UserResponseDto {
  data: User;
  message: string;
  timestamp: string;
}

export interface UsersListResponseDto {
  data: User[];
  total: number;
  page: number;
  totalPages: number;
  message: string;
  timestamp: string;
}

export interface UserProfileCompletionResponseDto {
  data: {
    profileCompletionPercentage: number;
  };
  message: string;
  timestamp: string;
}

export interface PhoneVerificationResponseDto {
  data: {
    message: string;
    phone: string;
    expiresIn: string;
  };
  message: string;
  timestamp: string;
}

export interface PhoneVerificationStatusResponseDto {
  data: {
    phone: string;
    isVerified: boolean;
    verificationDate?: string;
  };
  message: string;
  timestamp: string;
}

