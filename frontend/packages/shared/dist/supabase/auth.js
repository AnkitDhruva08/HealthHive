import { supabase } from './client';
export class AuthService {
    static async signUp(email, password) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error)
            throw error;
        return data;
    }
    static async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error)
            throw error;
        return data;
    }
    static async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error)
            throw error;
    }
    static async getCurrentUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error)
            throw error;
        return user;
    }
    static async getCurrentSession() {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error)
            throw error;
        return session;
    }
    static onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange(callback);
    }
}
