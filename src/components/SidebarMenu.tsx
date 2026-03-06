import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { Menu, Info, Mail, ShieldCheck, FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SidebarMenu() {
    const menuItems = [
        { label: 'Rólunk', icon: <Info className="w-5 h-5" />, href: '#' },
        { label: 'Beszélj velünk', icon: <Mail className="w-5 h-5" />, href: '#' },
        { label: 'Adatkezelési tájékoztató', icon: <ShieldCheck className="w-5 h-5" />, href: '#' },
        { label: 'Felhasználási feltételek', icon: <FileText className="w-5 h-5" />, href: '#' },
    ];

    return (
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
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-0">
                <SheetHeader className="p-6 border-b border-slate-100 dark:border-slate-900 bg-gradient-math text-white">
                    <div className="flex items-center gap-3">
                        <img src="/logo_header.png" alt="DiákZóna" className="h-10 object-contain" />
                        <SheetTitle className="text-xl font-black tracking-tighter text-white">DIÁKZÓNA</SheetTitle>
                    </div>
                </SheetHeader>
                <div className="py-4">
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
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/50">
                    <p className="text-[10px] text-slate-400 text-center font-medium lowercase">
                        © 2026 DiákZóna Akadémia. Minden jog fenntartva.
                    </p>
                </div>
            </SheetContent>
        </Sheet>
    );
}
