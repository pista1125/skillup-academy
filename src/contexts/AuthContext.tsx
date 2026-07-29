import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { auth, db } from '@/lib/firebase';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { syncPistaData } from '@/lib/firebaseSync';

export interface Profile {
    id: string;
    full_name: string | null;
    username: string | null;
    role: 'teacher' | 'student';
    avatar_url: string | null;
    updated_at: string;
    email?: string | null;
}

interface AuthContextType {
    session: { user: User } | null;
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
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = useCallback(async (firebaseUser: User) => {
        try {
            const userRef = doc(db, 'profiles', firebaseUser.uid);
            let docSnap = await getDoc(userRef);

            // Special check for pista1125@gmail.com (or teacher accounts migrated from Supabase)
            const isPista = firebaseUser.email?.toLowerCase() === 'pista1125@gmail.com';
            if (isPista) {
                syncPistaData(firebaseUser.uid);
            }

            if (docSnap.exists()) {
                const data = docSnap.data() as Profile;
                if (isPista) {
                    data.role = 'teacher';
                    data.full_name = data.full_name || 'Orsós István';
                }
                setProfile(data);
            } else {
                const newProfile: Profile = {
                    id: firebaseUser.uid,
                    full_name: isPista ? 'Orsós István' : (firebaseUser.displayName || null),
                    username: firebaseUser.email?.split('@')[0] || null,
                    role: isPista ? 'teacher' : 'student',
                    avatar_url: firebaseUser.photoURL || null,
                    updated_at: new Date().toISOString(),
                    email: firebaseUser.email || null,
                };
                await setDoc(userRef, newProfile);
                setProfile(newProfile);
            }
        } catch (err) {
            console.error('Error fetching/creating profile in Firestore:', err);
            const isPista = firebaseUser.email?.toLowerCase() === 'pista1125@gmail.com';
            setProfile({
                id: firebaseUser.uid,
                full_name: isPista ? 'Orsós István' : (firebaseUser.displayName || null),
                username: firebaseUser.email?.split('@')[0] || null,
                role: isPista ? 'teacher' : 'student',
                avatar_url: firebaseUser.photoURL || null,
                updated_at: new Date().toISOString(),
                email: firebaseUser.email || null,
            });
        } finally {
            setLoading(false);
        }
    }, []);

    const refreshProfile = useCallback(async () => {
        if (user) {
            await fetchProfile(user);
        }
    }, [user, fetchProfile]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                await fetchProfile(firebaseUser);
            } else {
                setProfile(null);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [fetchProfile]);

    const signOut = useCallback(async () => {
        try {
            await firebaseSignOut(auth);
            setUser(null);
            setProfile(null);
        } catch (err) {
            console.error('Error signing out of Firebase:', err);
        }
    }, []);

    const value = {
        session: user ? { user } : null,
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
