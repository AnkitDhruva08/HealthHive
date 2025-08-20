import type { User, Session } from '@supabase/supabase-js';
export interface AuthState {
    user: User | null;
    session: Session | null;
    loading: boolean;
}
export declare class AuthService {
    static signUp(email: string, password: string): Promise<{
        user: User | null;
        session: Session | null;
    }>;
    static signIn(email: string, password: string): Promise<{
        user: User;
        session: Session;
        weakPassword?: import("@supabase/supabase-js").WeakPassword;
    }>;
    static signOut(): Promise<void>;
    static getCurrentUser(): Promise<User | null>;
    static getCurrentSession(): Promise<Session | null>;
    static onAuthStateChange(callback: (event: string, session: Session | null) => void): {
        data: {
            subscription: import("@supabase/supabase-js").Subscription;
        };
    };
}
