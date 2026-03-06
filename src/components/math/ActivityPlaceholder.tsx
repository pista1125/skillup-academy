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
    emoji?: string;
}

export function ActivityPlaceholder({ title, subtitle, type, icon, color, onClick, disabled, emoji }: ActivityPlaceholderProps) {
    const gradientClasses: Record<string, string> = {
        blue: "from-blue-400 to-blue-600",
        purple: "from-purple-400 to-purple-600",
        emerald: "from-emerald-400 to-emerald-600",
        amber: "from-amber-400 to-amber-600",
        indigo: "from-indigo-400 to-indigo-600",
        violet: "from-violet-400 to-violet-600",
        rose: "from-rose-400 to-rose-600",
        teal: "from-teal-400 to-teal-600",
        red: "from-red-400 to-red-600",
        slate: "from-slate-300 to-slate-400",
        green: "from-green-400 to-green-600",
        sky: "from-sky-400 to-sky-600",
        pink: "from-pink-400 to-pink-600",
        cyan: "from-cyan-400 to-cyan-600",
        orange: "from-orange-400 to-orange-600",
        lime: "from-lime-400 to-lime-600",
    };

    const typeBadgeClasses: Record<string, string> = {
        "Játék": "bg-emerald-500 text-white",
        "Teszt": "bg-rose-500 text-white",
        "Gyakorlás": "bg-blue-500 text-white",
        "Hamarosan": "bg-slate-400 text-white",
        "Kezdés": "bg-emerald-500 text-white",
        "Feladat": "bg-violet-500 text-white",
        "Kvíz": "bg-amber-500 text-white",
    };

    const typeLabel: Record<string, string> = {
        "Játék": "INDÍTÁS »",
        "Teszt": "FELADATOK »",
        "Gyakorlás": "GYAKORLAT »",
        "Hamarosan": "HAMAROSAN...",
        "Kezdés": "INDÍTÁS »",
        "Feladat": "MEGOLDÁS »",
        "Kvíz": "KVÍZ »",
    };

    const badgeClass = type && typeBadgeClasses[type] ? typeBadgeClasses[type] : "bg-slate-400 text-white";
    const labelText = type && typeLabel[type] ? typeLabel[type] : "INDÍTÁS »";
    const gradientClass = gradientClasses[color] || gradientClasses.slate;

    return (
        <button
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={cn(
                "flex flex-col bg-white rounded-2xl border border-slate-200 transition-all text-left overflow-hidden group h-full shadow-sm",
                !disabled ? "hover:border-transparent hover:-translate-y-1 hover:shadow-xl active:translate-y-0 cursor-pointer" : "cursor-not-allowed opacity-60"
            )}
        >
            {/* Gradient header with emoji or icon */}
            <div className={cn(
                "h-24 w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br",
                gradientClass
            )}>
                {/* Decorative blobs */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
                <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-white/10 rounded-full" />

                {emoji ? (
                    <span className="text-4xl drop-shadow-sm group-hover:scale-110 transition-transform duration-300 z-10">{emoji}</span>
                ) : (
                    <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300 text-white z-10">
                        {icon}
                    </div>
                )}

                {type && (
                    <div className={cn(
                        "absolute top-2 right-2 px-2 py-0.5 rounded-full text-[8px] font-black shadow-sm tracking-wide",
                        badgeClass
                    )}>
                        {type.toUpperCase()}
                    </div>
                )}
            </div>

            {/* Text content */}
            <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                    <h4 className="font-bold text-[10px] text-slate-800 group-hover:text-primary transition-colors leading-tight line-clamp-2">{title}</h4>
                    <p className="text-[8px] text-slate-400 mt-0.5 line-clamp-1">{subtitle}</p>
                </div>
                <div className="mt-1.5 pt-1.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[7px] font-black tracking-wider text-emerald-600 group-hover:text-primary transition-colors">
                        {labelText}
                    </span>
                </div>
            </div>
        </button>
    );
}
