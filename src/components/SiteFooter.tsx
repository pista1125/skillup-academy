import React from 'react';
import { Mail, ShieldCheck, FileText, Info, Sparkles, Instagram, Facebook, Youtube } from "lucide-react";

export function SiteFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-20 bg-[#0a0c10] text-slate-400 py-16 px-6 relative overflow-hidden border-t border-slate-800/50">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none" />

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">

                    {/* Column 1: DiákZóna */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <img src="/logo_header.png" alt="DiákZóna Logo" className="h-10 object-contain" />
                            <h3 className="text-2xl font-black tracking-tighter text-[#10b981]">DIÁKZÓNA</h3>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400 font-medium max-w-xs">
                            Magyarország legdinamikusabb matematikai és fizikai oktatási platformja. Szenvedélyünk a tanítás és az interaktív élményalapú tanulás.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <a href="#" className="p-2 bg-slate-800/50 rounded-lg hover:bg-emerald-500/20 hover:text-emerald-500 transition-all border border-slate-700/50">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-slate-800/50 rounded-lg hover:bg-emerald-500/20 hover:text-emerald-500 transition-all border border-slate-700/50">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-slate-800/50 rounded-lg hover:bg-emerald-500/20 hover:text-emerald-500 transition-all border border-slate-700/50">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Legal & Trust */}
                    <div className="space-y-6">
                        <h4 className="text-[#10b981] font-black uppercase tracking-widest text-xs flex items-center gap-2">
                            Jogi Információk
                        </h4>
                        <nav className="flex flex-col gap-4">
                            <a href="#" className="flex items-center gap-3 text-sm font-bold text-slate-300 hover:text-white transition-all group">
                                <Info className="w-4 h-4 text-slate-500 group-hover:text-emerald-500 transition-all" /> Rólunk
                            </a>
                            <a href="#" className="flex items-center gap-3 text-sm font-bold text-slate-300 hover:text-white transition-all group">
                                <Mail className="w-4 h-4 text-slate-500 group-hover:text-emerald-500 transition-all" /> Beszélj velünk
                            </a>
                            <a href="#" className="flex items-center gap-3 text-sm font-bold text-slate-300 hover:text-white transition-all group">
                                <ShieldCheck className="w-4 h-4 text-slate-500 group-hover:text-emerald-500 transition-all" /> Adatkezelési tájékoztató
                            </a>
                            <a href="#" className="flex items-center gap-3 text-sm font-bold text-slate-300 hover:text-white transition-all group">
                                <FileText className="w-4 h-4 text-slate-500 group-hover:text-emerald-500 transition-all" /> Felhasználási feltételek
                            </a>
                        </nav>
                    </div>

                    {/* Column 3: Contact */}
                    <div className="space-y-6">
                        <h4 className="text-[#10b981] font-black uppercase tracking-widest text-xs flex items-center gap-2">
                            Kapcsolat
                        </h4>
                        <div className="space-y-4">
                            <p className="text-sm text-slate-400 font-medium">Bármilyen kérdésed van? Írj nekünk:</p>
                            <a
                                href="mailto:kapcsolat@diakzona.hu"
                                className="text-xl font-black text-emerald-500 hover:text-emerald-400 transition-all underline decoration-slate-800 decoration-2 underline-offset-8"
                            >
                                kapcsolat@diakzona.hu
                            </a>
                            <div className="pt-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                    <Sparkles className="w-3 h-3 text-emerald-500" /> Tanulj Felelősséggel
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        © {currentYear} DiákZóna Akadémia. Minden jog fenntartva.
                    </p>
                    <div className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em] hidden sm:block">
                        Tanulj • Fejlődj • Valósítsd meg önmagad
                    </div>
                </div>
            </div>
        </footer>
    );
}
