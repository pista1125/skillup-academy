import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AuthModal } from './AuthModal';
import { User, LogOut, Settings, LogIn, UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function UserMenu() {
    const { user, profile, signOut, loading } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    if (loading) {
        return <div className="w-10 h-10 rounded-xl bg-white/10 animate-pulse" />;
    }

    if (!user) {
        return (
            <>
                <Button
                    variant="ghost"
                    onClick={() => setIsAuthModalOpen(true)}
                    className="bg-white/10 text-white hover:bg-white/20 font-bold px-4 border border-white/20 shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2 rounded-xl h-10"
                >
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Bejelentkez├ęs</span>
                </Button>
                <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            </>
        );
    }

    // Get initials for avatar
    const initials = profile?.full_name
        ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
        : user.email?.substring(0, 2).toUpperCase() || '??';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="bg-white/10 text-white hover:bg-white/20 font-bold pl-2 pr-4 border border-white/20 shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center gap-3 rounded-xl h-10 ring-offset-primary focus:ring-2 focus:ring-white/50"
                >
                    <Avatar className="h-7 w-7 border border-white/30 shadow-sm">
                        <AvatarFallback className="bg-primary text-white text-[10px] font-black">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-sm tracking-tight hidden sm:inline truncate max-w-[120px]">
                        {profile?.full_name || user.email}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2 rounded-2xl p-2 shadow-2xl border-slate-100 dark:border-slate-800" align="end">
                <DropdownMenuLabel className="font-bold text-xs uppercase tracking-widest text-slate-400 p-3 pb-2">
                    Saj├ít Fi├│k
                </DropdownMenuLabel>
                <div className="px-3 pb-3">
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100 leading-none mb-1">
                        {profile?.full_name || 'Nincs n├ęv megadva'}
                    </p>
                    <p className="text-[10px] font-medium text-slate-400 truncate">
                        {user.email}
                    </p>
                </div>
                <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 mx-1" />
                <DropdownMenuItem className="rounded-xl p-3 focus:bg-primary/5 cursor-pointer group transition-all">
                    <UserCircle className="w-4 h-4 mr-3 text-slate-400 group-hover:text-primary" />
                    <span className="font-bold text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary">Profilom</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl p-3 focus:bg-primary/5 cursor-pointer group transition-all">
                    <Settings className="w-4 h-4 mr-3 text-slate-400 group-hover:text-primary" />
                    <span className="font-bold text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary">Be├íll├şt├ísok</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 mx-1" />
                <DropdownMenuItem
                    onClick={() => signOut()}
                    className="rounded-xl p-3 focus:bg-rose-50 dark:focus:bg-rose-950/20 cursor-pointer group transition-all"
                >
                    <LogOut className="w-4 h-4 mr-3 text-slate-400 group-hover:text-rose-500" />
                    <span className="font-bold text-sm text-slate-700 dark:text-slate-300 group-hover:text-rose-500">Kijelentkez├ęs</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
