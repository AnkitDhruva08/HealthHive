// Supabase exports
export * from './supabase';

// Component exports
export * from './components';

// Utility exports
export const APP_NAME = 'Tailwind Monorepo';
export const VERSION = '1.0.0';

// Common types
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}