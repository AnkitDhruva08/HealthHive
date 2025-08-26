// src/types.ts

export type UserRole = 'patient' | 'doctor' | 'pharmacy' | 'delivery';

export type AuthMode = 'login' | 'register';

// ✅ Login form interface
export interface LoginFormData {
  email: string;
  password: string;
}

// ✅ Register form interface
export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName?: string;
  phone?: string;
  role: UserRole;
  location?: string;
  licenseNumber?: string;     // doctor
  specialization?: string;    // doctor
  pharmacyName?: string;      // pharmacy
  vehicleNumber?: string;     // delivery
}



// ✅ Role form interface
export interface Role {
  id: number;
  role_name: string;
  is_active: boolean;
}



// login response 
export interface LoginResponse {
  token: string;
  username?: string;
  email?: string;
}