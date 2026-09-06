import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { Menu, Info, Mail, ShieldCheck, FileText, ChevronRight, LogOut, UserCircle, LogIn, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './auth/AuthModal';
import { Avatar, AvatarFallback } from './ui/avatar';
import { OnlineTutoringModal } from './tutoring/OnlineTutoringModal';
import { SidebarThemeSelector, ThemeToggle } from './ThemeToggle';

export function SidebarMenu() {
    const { user, profile, signOut } = useAuth();
    const navigate = useNavigate();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isTutoringModalOpen, setIsTutoringModalOpen] = useState(false);

    const menuItems = [
        { label: 'Online Korrepetálás', icon: <Video className="w-5 h-5 text-purple-500" />, href: '/korrepetalas' },
        {
            label: 'Online Kvíz',
            icon: (
                <div className="w-5 h-5 flex items-center justify-center text-purple-600">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <circle cx="12" cy="3" r="1.8" />
                        <path d="M13 6.5L8 14H12.5L10.5 21.5L17 12H12.5L13.5 6.5H13Z" />
                    </svg>
                </div>
            ),
            onClick: () => { window.location.assign('https://kviz.diakzona.hu/'); }
        },
        { label: 'Rólunk', icon: <Info className="w-5 h-5 text-blue-500" />, href: '/rolunk' },
        { label: 'Beszélj velünk', icon: <Mail className="w-5 h-5 text-emerald-500" />, href: '#' },
        { label: 'Adatkezelési tájékoztató', icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />, href: '/adatkezeles' },
        { label: 'Felhasználási feltételek', icon: <FileText className="w-5 h-5 text-amber-500" />, href: '/felhasznalasi-feltetelek' },
    ];

    const initials = profile?.full_name
        ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
        : user?.email?.substring(0, 2).toUpperCase() || '??';

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/10 text-white hover:bg-white/20 border border-white/20 shadow-md backdrop-blur-md transition-all hover:scale-105 active:scale-95 rounded-xl h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
                    >
                        <Menu className="w-4 h-4 sm:w-6 sm:h-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[380px] bg-white dark:bg-black border-r border-slate-200 dark:border-zinc-800 p-0 flex flex-col shadow-2xl">
                    <SheetHeader className="p-5 border-b border-slate-100 dark:border-zinc-800 bg-gradient-math text-white relative overflow-hidden flex flex-row items-center justify-between">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none"></div>
                        <div className="flex items-center gap-3 relative z-10">
                            <img src="/logo_header.png" alt="DiákZóna" className="h-8 sm:h-9 object-contain" />
                            <SheetTitle className="text-lg sm:text-xl font-black tracking-tighter text-white uppercase">DIÁKZÓNA</SheetTitle>
                        </div>
                        <div className="relative z-10">
                            <ThemeToggle className="w-8 h-8 rounded-lg" />
                        </div>
                        <SheetDescription className="sr-only">Navigációs és fiók menü</SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 py-4 overflow-y-auto px-5 space-y-4">
                        {/* Theme switcher card - Always accessible whether logged in or out */}
                        <SidebarThemeSelector />

                        {/* User Profile Section in Sidebar */}
                        <div>
                            {user ? (
                                <div className="p-3.5 bg-slate-50 dark:bg-zinc-900/80 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm">
                                    <div className="flex items-center gap-3 mb-2.5">
                                        <Avatar className="h-9 w-9 border border-white shadow-sm">
                                            <AvatarFallback className="bg-primary text-white text-xs font-black">
                                                {initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs sm:text-sm font-black text-slate-800 dark:text-zinc-100 leading-none mb-1 truncate">
                                                {profile?.full_name || 'Felhasználó'}
                                            </p>
                                            <p className="text-[10px] font-medium text-slate-400 dark:text-zinc-500 truncate">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>
                                    <SheetClose asChild>
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            onClick={() => navigate('/profil')}
                                            className="w-full justify-start text-xs font-bold rounded-xl h-8 border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200"
                                        >
                                            <UserCircle className="w-3.5 h-3.5 mr-2 text-primary" />
                                            Profilom
                                        </Button>
                                    </SheetClose>
                                </div>
                            ) : (
                                <div className="p-4 bg-gradient-to-br from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 rounded-2xl border border-primary/10 dark:border-primary/20 text-center">
                                    <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 mb-2.5">Lépj be az extra funkciókért!</p>
                                    <Button
                                        onClick={() => setIsAuthModalOpen(true)}
                                        className="w-full rounded-xl bg-gradient-math font-bold shadow-md h-9 text-xs"
                                    >
                                        <LogIn className="w-3.5 h-3.5 mr-2" />
                                        Bejelentkezés
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Navigation links */}
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-2 px-1">Menüpontok</p>
                            <nav className="space-y-1">
                                {menuItems.map((item, index) => (
                                    <SheetClose asChild key={index}>
                                        {item.onClick ? (
                                            <button
                                                type="button"
                                                onClick={item.onClick}
                                                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-900 transition-all group text-slate-700 dark:text-zinc-300 text-left"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="p-1.5 bg-slate-50 dark:bg-zinc-900 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                                        {item.icon}
                                                    </div>
                                                    <span className="font-bold text-xs sm:text-sm tracking-tight">{item.label}</span>
                                                </div>
                                                <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-zinc-600 group-hover:text-primary transition-all" />
                                            </button>
                                        ) : (
                                            <a
                                                href={item.href}
                                                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-900 transition-all group text-slate-700 dark:text-zinc-300"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="p-1.5 bg-slate-50 dark:bg-zinc-900 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                                        {item.icon}
                                                    </div>
                                                    <span className="font-bold text-xs sm:text-sm tracking-tight">{item.label}</span>
                                                </div>
                                                <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-zinc-600 group-hover:text-primary transition-all" />
                                            </a>
                                        )}
                                    </SheetClose>
                                ))}
                            </nav>
                        </div>
                    </div>

                    <div className="p-4 border-t border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 space-y-3">
                        {user && (
                            <SheetClose asChild>
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        setTimeout(() => {
                                            document.body.style.pointerEvents = '';
                                            signOut();
                                        }, 500);
                                    }}
                                    className="w-full justify-start text-slate-500 dark:text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl font-bold transition-all h-9 text-xs"
                                >
                                    <LogOut className="w-4 h-4 mr-2.5" />
                                    Kijelentkezés
                                </Button>
                            </SheetClose>
                        )}
                        <p className="text-[10px] text-slate-400 dark:text-zinc-500 text-center font-medium lowercase">
                            © 2026 DiákZóna Akadémia. Minden jog fenntartva.
                        </p>
                    </div>
                </SheetContent>
            </Sheet>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            <OnlineTutoringModal isOpen={isTutoringModalOpen} onClose={() => setIsTutoringModalOpen(false)} />
        </>
    );
}
