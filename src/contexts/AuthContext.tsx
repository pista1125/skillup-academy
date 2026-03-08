import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface Profile {
    id: string;
    full_name: string | null;
    updated_at: string;
}

interface AuthContextType {
    session: Session | null;
    user: User | null;
    profile: Profile | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    profile: null,
    loading: true,
    signOut: async () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = useCallback(async (userId: string, userMetaName?: string | null) => {
        // Immediate fallback from auth metadata so the name appears right away
        if (userMetaName) {
            setProfile(prev => prev ?? { id: userId, full_name: userMetaName, updated_at: '' });
        }
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
            } else {
                setProfile(data);
            }
        } catch (err) {
            console.error('Unexpected error fetching profile:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let mounted = true;

        const initAuth = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) {
                    console.error('Error getting session:', error);
                }
                if (!mounted) return;

                setSession(session);
                setUser(session?.user ?? null);

                if (session?.user) {
                    const metaName = session.user.user_metadata?.full_name as string | undefined;
                    await fetchProfile(session.user.id, metaName);
                } else {
                    setLoading(false);
                }
            } catch (err) {
                console.error('Unexpected error in initAuth:', err);
                if (mounted) setLoading(false);
            }
        };

        initAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (!mounted) return;
            // INITIAL_SESSION is handled by getSession() above to avoid race conditions.
            if (_event === 'INITIAL_SESSION') return;

            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                const metaName = session.user.user_metadata?.full_name as string | undefined;
                await fetchProfile(session.user.id, metaName);
            } else {
                setProfile(null);
                setLoading(false);
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [fetchProfile]);

    const signOut = useCallback(async () => {
        try {
            // First, clear UI state immediately for responsive feel
            setSession(null);
            setUser(null);
            setProfile(null);

            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error signing out of Supabase:', error);
            }
        } catch (err) {
            console.error('Unexpected error signing out:', err);
        }
    }, []);

    const value = {
        session,
        user,
        profile,
        loading,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
