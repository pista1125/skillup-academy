import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { auth, db } from '@/lib/firebase';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { syncPistaData } from '@/lib/firebaseSync';
import { isTeacherApprovalActive } from '@/lib/teacherApproval';

export interface Profile {
    id: string;
    full_name: string | null;
    username: string | null;
    role: 'teacher' | 'student';
    /**
     * Az 'expired' csak kliensoldali, virtuális állapot: a Firestore-ban 'approved' áll,
     * de a teacher_approved_until (aug. 31.) már elmúlt. Soha nem írjuk vissza.
     */
    teacher_status?: 'none' | 'pending' | 'approved' | 'rejected' | 'expired';
    /** Firestore Timestamp: meddig érvényes a tanári jóváhagyás (minden év aug. 31.). */
    teacher_approved_until?: { toDate: () => Date } | null;
    teacher_requested_at?: string;
    school_name?: string;
    subject?: string;
    teacher_note?: string;
    teacher_reject_reason?: string | null;
    avatar_url: string | null;
    updated_at: string;
    email?: string | null;
    user_code?: string;
}

const generate6DigitCode = () => Math.floor(100000 + Math.random() * 900000).toString();

export const ADMIN_EMAILS = ['pista1125@gmail.com'];

interface AuthContextType {
    session: { user: User } | null;
    user: User | null;
    profile: Profile | null;
    loading: boolean;
    isAdmin: boolean;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    profile: null,
    loading: true,
    isAdmin: false,
    signOut: async () => { },
    refreshProfile: async () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    const isAdmin = Boolean(
        user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase())
    );

    const fetchProfile = useCallback(async (firebaseUser: User) => {
        try {
            const userRef = doc(db, 'profiles', firebaseUser.uid);
            const docSnap = await getDoc(userRef);

            // Special check for pista1125@gmail.com (admin account)
            const isPista = firebaseUser.email?.toLowerCase() === 'pista1125@gmail.com';
            if (isPista) {
                syncPistaData(firebaseUser.uid);
            }

            if (docSnap.exists()) {
                const data = docSnap.data() as Profile;
                if (isPista) {
                    data.role = 'teacher';
                    data.teacher_status = 'approved';
                    data.full_name = data.full_name || 'Orsós István';
                } else if (data.teacher_status === 'approved' && !isTeacherApprovalActive(data)) {
                    // Lejárt (aug. 31.) tanári jóváhagyás: újra kell kérni az admintól.
                    data.teacher_status = 'expired';
                    data.role = 'student';
                } else if (data.role === 'teacher' && data.teacher_status !== 'approved') {
                    // Security guard: If not approved by admin, keep as student
                    data.role = 'student';
                }

                if (!data.user_code) {
                    const code = generate6DigitCode();
                    data.user_code = code;
                    await setDoc(userRef, { user_code: code }, { merge: true });
                }
                setProfile(data);
            } else {
                const newCode = generate6DigitCode();
                const newProfile: Profile = {
                    id: firebaseUser.uid,
                    full_name: isPista ? 'Orsós István' : (firebaseUser.displayName || null),
                    username: firebaseUser.email?.split('@')[0] || null,
                    role: isPista ? 'teacher' : 'student',
                    teacher_status: isPista ? 'approved' : 'none',
                    avatar_url: firebaseUser.photoURL || null,
                    updated_at: new Date().toISOString(),
                    email: firebaseUser.email || null,
                    user_code: newCode
                };
                // merge + csak a biztosan ismert mezők: a regisztrációs ablak (AuthModal) párhuzamosan
                // beírhatja a nevet és a tanári kérelmet ('pending'), ezeket nem írjuk felül.
                // (A tanári státusz alapértéke a Firestore-szabályokban is 'none'.)
                const { teacher_status: _ts, full_name: _fn, ...baseProfile } = newProfile;
                await setDoc(userRef, {
                    ...baseProfile,
                    ...(newProfile.full_name ? { full_name: newProfile.full_name } : {}),
                    ...(isPista ? { teacher_status: 'approved' } : {}),
                }, { merge: true });
                const saved = await getDoc(userRef);
                setProfile(saved.exists() ? ({ ...newProfile, ...(saved.data() as Profile) }) : newProfile);
            }
        } catch (err) {
            console.error('Error fetching/creating profile in Firestore:', err);
            const isPista = firebaseUser.email?.toLowerCase() === 'pista1125@gmail.com';
            setProfile({
                id: firebaseUser.uid,
                full_name: isPista ? 'Orsós István' : (firebaseUser.displayName || null),
                username: firebaseUser.email?.split('@')[0] || null,
                role: isPista ? 'teacher' : 'student',
                teacher_status: isPista ? 'approved' : 'none',
                avatar_url: firebaseUser.photoURL || null,
                updated_at: new Date().toISOString(),
                email: firebaseUser.email || null,
                user_code: '100000'
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
        isAdmin,
        signOut,
        refreshProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
