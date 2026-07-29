import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AuthModal } from './AuthModal';
import { LogOut, Settings, LogIn, UserCircle, Target } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function UserMenu() {
    const { user, profile, signOut, loading } = useAuth();
    const navigate = useNavigate();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, 'feedback_notifications'),
            where('profile_id', '==', user.uid),
            where('status', '==', 'unread')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setNotificationCount(snapshot.size);
        }, (error) => {
            console.error('Error fetching notification count:', error);
        });

        return () => unsubscribe();
    }, [user]);

    if (loading) {
        return <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 animate-pulse" />;
    }

    const initials = profile?.full_name
        ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
        : user?.email?.substring(0, 2).toUpperCase() || '??';

    const displayAvatar = profile?.avatar_url || user?.photoURL || undefined;

    return (
        <>
            {!user ? (
                <Button
                    variant="ghost"
                    onClick={() => setIsAuthModalOpen(true)}
                    className="bg-white/10 text-white hover:bg-white/20 font-bold px-2 sm:px-4 border border-white/20 shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 sm:gap-2 rounded-xl h-9 sm:h-10"
                >
                    <LogIn className="w-4 h-4" />
                    <span className="inline text-sm sm:text-base">Bejelentkezés</span>
                </Button>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="bg-white/10 text-white hover:bg-white/20 font-bold pl-1.5 pr-2 sm:pl-2 sm:pr-4 border border-white/20 shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 sm:gap-3 rounded-xl h-9 sm:h-10 ring-offset-primary focus:ring-2 focus:ring-white/50 relative"
                        >
                            <Avatar className="h-6 w-6 sm:h-7 sm:w-7 border border-white/30 shadow-sm">
                                <AvatarImage src={displayAvatar} />
                                <AvatarFallback className={cn(
                                    "text-[8px] sm:text-[10px] font-black text-white",
                                    profile?.role === 'teacher' ? "bg-rose-500" : "bg-primary"
                                )}>
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-xs sm:text-sm tracking-tight truncate max-w-[60px] xs:max-w-[80px] sm:max-w-[120px]">
                                {profile?.full_name || user?.email}
                            </span>
                            {notificationCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-bounce-subtle">
                                    {notificationCount}
                                </span>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mt-2 rounded-2xl p-2 shadow-2xl border-slate-100 dark:border-slate-800" align="end">
                        <DropdownMenuLabel className="font-bold text-xs uppercase tracking-widest text-slate-400 p-3 pb-2">
                            Saját Fiók
                        </DropdownMenuLabel>
                        <div className="px-3 pb-3">
                            <p className="text-sm font-black text-slate-800 dark:text-slate-100 leading-none mb-1">
                                {profile?.full_name || 'Nincs név megadva'}
                            </p>
                            <p className="text-[10px] font-medium text-slate-400 truncate">
                                {user?.email}
                            </p>
                        </div>
                        <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 mx-1" />
                        
                        {notificationCount > 0 && (
                            <>
                                <DropdownMenuItem 
                                    className="rounded-xl p-3 focus:bg-indigo-50 dark:focus:bg-indigo-950/20 cursor-pointer group transition-all"
                                    onSelect={() => navigate('/eszkozok/student-feedback')}
                                >
                                    <Target className="w-4 h-4 mr-3 text-indigo-500 animate-pulse" />
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm text-indigo-600">Visszajelzés várható!</span>
                                        <span className="text-[10px] text-slate-400">{notificationCount} aktív felkérésed van</span>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 mx-1" />
                            </>
                        )}

                        <DropdownMenuItem 
                            onSelect={() => navigate('/profil')}
                            className="rounded-xl p-3 focus:bg-primary/5 cursor-pointer group transition-all"
                        >
                            <UserCircle className="w-4 h-4 mr-3 text-slate-400 group-hover:text-primary" />
                            <span className="font-bold text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary">Profilom</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl p-3 focus:bg-primary/5 cursor-pointer group transition-all">
                            <Settings className="w-4 h-4 mr-3 text-slate-400 group-hover:text-primary" />
                            <span className="font-bold text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary">Beállítások</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 mx-1" />
                        <DropdownMenuItem
                            onSelect={() => {
                                setTimeout(() => {
                                    document.body.style.pointerEvents = '';
                                    signOut();
                                }, 500);
                            }}
                            className="rounded-xl p-3 focus:bg-rose-50 dark:focus:bg-rose-950/20 cursor-pointer group transition-all"
                        >
                            <LogOut className="w-4 h-4 mr-3 text-slate-400 group-hover:text-rose-500" />
                            <span className="font-bold text-sm text-slate-700 dark:text-slate-300 group-hover:text-rose-500">Kijelentkezés</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    );
}
