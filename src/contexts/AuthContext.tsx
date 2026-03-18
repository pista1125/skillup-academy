import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface Profile {
    id: string;
    full_name: string | null;
    username: string | null;
    role: 'teacher' | 'student';
    avatar_url: string | null;
    updated_at: string;
}

interface AuthContextType {
    session: Session | null;
    user: User | null;
    profile: Profile | null;
    loading: boolean;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    profile: null,
    loading: true,
    signOut: async () => { },
    refreshProfile: async () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = useCallback(async (userId: string, userMetaName?: string | null, userMetaAvatar?: string | null) => {
        // Immediate fallback from auth metadata so the name and avatar appears right away
        if (userMetaName || userMetaAvatar) {
            setProfile(prev => prev ?? { 
                id: userId, 
                full_name: userMetaName || null, 
                username: null,
                role: 'student',
                avatar_url: userMetaAvatar || null,
                updated_at: '' 
            });
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

    const refreshProfile = useCallback(async () => {
        if (user) {
            await fetchProfile(user.id);
        }
    }, [user, fetchProfile]);

    useEffect(() => {
        let mounted = true;
        const initStarted = { current: false };

        // Safety timeout to prevent the app from hanging forever in a loading state
        const safetyTimeout = setTimeout(() => {
            if (mounted && loading) {
                console.warn('Auth initialization timed out, forcing loading to false');
                setLoading(false);
            }
        }, 5000);

        const handleAuthAction = async (currSession: Session | null) => {
            if (!mounted || initStarted.current) return;
            initStarted.current = true;

            setSession(currSession);
            setUser(currSession?.user ?? null);

            if (currSession?.user) {
                const metaName = currSession.user.user_metadata?.full_name as string | undefined;
                const metaAvatar = (currSession.user.user_metadata?.avatar_url || currSession.user.user_metadata?.picture) as string | undefined;
                await fetchProfile(currSession.user.id, metaName, metaAvatar);
            } else {
                setProfile(null);
                setLoading(false);
            }
            clearTimeout(safetyTimeout);
        };

        // Unified auth listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (!mounted) return;
            console.log('Auth state change:', event, !!session);

            // If we already started init, just update the state without re-running full fetchProfile
            // unless it's a fresh event after init.
            if (initStarted.current) {
                setSession(session);
                setUser(session?.user ?? null);
                if (!session) {
                    setProfile(null);
                } else if (event === 'SIGNED_IN') {
                    // Re-fetch profile if a new login happens
                    const metaName = session.user.user_metadata?.full_name as string | undefined;
                    const metaAvatar = (session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture) as string | undefined;
                    fetchProfile(session.user.id, metaName, metaAvatar);
                }
                return;
            }

            // Initial call if getSession hasn't finished yet
            handleAuthAction(session);
        });

        // Check current session immediately
        const checkInitialSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (mounted && !initStarted.current) {
                    handleAuthAction(session);
                }
            } catch (err) {
                console.error('Error in getSession:', err);
                if (mounted) setLoading(false);
            }
        };

        checkInitialSession();

        return () => {
            mounted = false;
            subscription.unsubscribe();
            clearTimeout(safetyTimeout);
        };
    }, [fetchProfile, loading]);

    const signOut = useCallback(async () => {
        try {
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
        refreshProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
