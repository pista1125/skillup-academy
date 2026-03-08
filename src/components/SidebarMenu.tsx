import React, { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { Menu, Info, Mail, ShieldCheck, FileText, ChevronRight, LogOut, UserCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './auth/AuthModal';
import { Avatar, AvatarFallback } from './ui/avatar';

export function SidebarMenu() {
    const { user, profile, signOut } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const menuItems = [
        { label: 'Rólunk', icon: <Info className="w-5 h-5" />, href: '#' },
        { label: 'Beszélj velünk', icon: <Mail className="w-5 h-5" />, href: '#' },
        { label: 'Adatkezelési tájékoztató', icon: <ShieldCheck className="w-5 h-5" />, href: '#' },
        { label: 'Felhasználási feltételek', icon: <FileText className="w-5 h-5" />, href: '#' },
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
                        className="bg-white/10 text-white hover:bg-white/20 border border-white/20 shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 rounded-xl h-10 w-10 flex-shrink-0"
                    >
                        <Menu className="w-6 h-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-0 flex flex-col">
                    <SheetHeader className="p-6 border-b border-slate-100 dark:border-slate-900 bg-gradient-math text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        <div className="flex items-center gap-3 relative z-10">
                            <img src="/logo_header.png" alt="DiákZóna" className="h-10 object-contain" />
                            <SheetTitle className="text-xl font-black tracking-tighter text-white uppercase">DIÁKZÓNA</SheetTitle>
                        </div>
                    </SheetHeader>

                    <div className="flex-1 py-4 overflow-y-auto">
                        {/* User Profile Section in Sidebar */}
                        <div className="px-6 mb-6">
                            {user ? (
                                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Avatar className="h-10 w-10 border border-white shadow-sm">
                                            <AvatarFallback className="bg-primary text-white text-xs font-black">
                                                {initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-black text-slate-800 dark:text-slate-100 leading-none mb-1 truncate">
                                                {profile?.full_name || 'Felhasználó'}
                                            </p>
                                            <p className="text-[10px] font-medium text-slate-400 truncate">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2">
                                        <Button variant="outline" size="sm" className="w-full justify-start text-xs font-bold rounded-xl h-9">
                                            <UserCircle className="w-3.5 h-3.5 mr-2 text-primary" />
                                            Profilom
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-2xl border border-primary/10 text-center">
                                    <p className="text-xs font-bold text-slate-500 mb-3">Lépj be az extra funkciókért!</p>
                                    <Button
                                        onClick={() => setIsAuthModalOpen(true)}
                                        className="w-full rounded-xl bg-gradient-math font-bold shadow-lg"
                                    >
                                        <LogIn className="w-4 h-4 mr-2" />
                                        Bejelentkezés
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="px-6 py-2">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Menüpontok</p>
                            <nav className="space-y-1">
                                {menuItems.map((item, index) => (
                                    <SheetClose asChild key={index}>
                                        <a
                                            href={item.href}
                                            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-all group text-slate-700 dark:text-slate-300"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                                    {item.icon}
                                                </div>
                                                <span className="font-bold text-sm tracking-tight">{item.label}</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-all" />
                                        </a>
                                    </SheetClose>
                                ))}
                            </nav>
                        </div>
                    </div>

                    <div className="p-6 border-t border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
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
                                    className="w-full justify-start text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl font-bold transition-all"
                                >
                                    <LogOut className="w-5 h-5 mr-3" />
                                    Kijelentkezés
                                </Button>
                            </SheetClose>
                        )}
                        <p className="text-[10px] text-slate-400 text-center font-medium lowercase">
                            © 2026 DiákZóna Akadémia. Minden jog fenntartva.
                        </p>
                    </div>
                </SheetContent>
            </Sheet>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    );
}
