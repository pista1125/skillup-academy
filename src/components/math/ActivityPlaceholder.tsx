import { cn } from '@/lib/utils';
import React from 'react';

interface ActivityPlaceholderProps {
    title: string;
    subtitle: string;
    type?: string;
    icon: React.ReactNode;
    color: string;
    onClick?: () => void;
    disabled?: boolean;
}

export function ActivityPlaceholder({ title, subtitle, type, icon, color, onClick, disabled }: ActivityPlaceholderProps) {
    const colorClasses: Record<string, string> = {
        blue: "bg-blue-50 text-blue-600 border-blue-100 group-hover:border-blue-300",
        purple: "bg-purple-50 text-purple-600 border-purple-100 group-hover:border-purple-300",
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:border-emerald-300",
        amber: "bg-amber-50 text-amber-600 border-amber-100 group-hover:border-amber-300",
        indigo: "bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:border-indigo-300",
        violet: "bg-violet-50 text-violet-600 border-violet-100 group-hover:border-violet-300",
        rose: "bg-rose-50 text-rose-600 border-rose-100 group-hover:border-rose-300",
        teal: "bg-teal-50 text-teal-600 border-teal-100 group-hover:border-teal-300",
        red: "bg-red-50 text-red-600 border-red-100 group-hover:border-red-300",
        slate: "bg-slate-50 text-slate-400 border-slate-100 opacity-60"
    };

    const typeClasses: Record<string, string> = {
        "Kezdés": "text-emerald-600",
        "Teszt": "text-rose-600",
        "Gyakorlás": "text-blue-600",
        "Hamarosan": "text-slate-400"
    };

    return (
        <button
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={cn(
                "flex flex-col bg-white rounded-xl border-b-2 border border-slate-200 transition-all text-left overflow-hidden group h-full",
                !disabled ? "hover:border-primary hover:-translate-y-0.5 active:translate-y-0 active:border-b-0 cursor-pointer shadow-sm hover:shadow-md" : "cursor-not-allowed"
            )}
        >
            <div className={cn("h-24 w-full flex items-center justify-center transition-colors relative overflow-hidden", colorClasses[color] || colorClasses.slate)}>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-2.5 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                {type && (
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-white/90 backdrop-blur-sm rounded text-[8px] font-bold shadow-sm">
                        {type}
                    </div>
                )}
            </div>
            <div className="p-2.5 flex-1 flex flex-col justify-between">
                <div>
                    <h4 className="font-bold text-[11px] text-slate-800 group-hover:text-primary transition-colors leading-tight line-clamp-2">{title}</h4>
                    <p className="text-[9px] text-slate-400 mt-0.5 line-clamp-1">{subtitle}</p>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-50 flex items-center justify-between">
                    <span className={cn("text-[8px] font-bold tracking-wider", type && typeClasses[type] ? typeClasses[type] : "text-slate-400")}>
                        {type === 'Kezdés' ? 'INDÍTÁS »' : (type === 'Teszt' ? 'FELADATOK »' : (type === 'Gyakorlás' ? 'GYAKORLAT »' : 'VÁRÓ...'))}
                    </span>
                </div>
            </div>
        </button>
    );
}
