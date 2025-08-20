export * from './supabase';
export * from './components';
export declare const APP_NAME = "Tailwind Monorepo";
export declare const VERSION = "1.0.0";
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
