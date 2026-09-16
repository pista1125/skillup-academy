import { cn } from '@/lib/utils';
import React from 'react';
import { CheckCircle2, Trophy, RotateCcw } from 'lucide-react';

interface ActivityPlaceholderProps {
    title: string;
    subtitle: string;
    type?: string;
    icon: React.ReactNode;
    color: string;
    onClick?: () => void;
    disabled?: boolean;
    emoji?: string;
    isCompleted?: boolean;
    hasStarted?: boolean;
    bestScore?: number;
    attemptsCount?: number;
    completedLevelsCount?: number;
    levelScores?: {
        1?: number;
        2?: number;
        3?: number;
    };
}

export function ActivityPlaceholder({
    title,
    subtitle,
    type,
    icon,
    color,
    onClick,
    disabled,
    emoji,
    isCompleted,
    hasStarted,
    bestScore,
    attemptsCount,
    completedLevelsCount = 0,
    levelScores
}: ActivityPlaceholderProps) {
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
        "Tananyag": "bg-blue-600 text-white",
    };

    const typeLabel: Record<string, string> = {
        "Játék": "INDÍTÁS »",
        "Teszt": "FELADATOK »",
        "Gyakorlás": "GYAKORLAT »",
        "Hamarosan": "HAMAROSAN...",
        "Kezdés": "INDÍTÁS »",
        "Feladat": "MEGOLDÁS »",
        "Kvíz": "KVÍZ »",
        "Tananyag": "MEGNYITÁS »",
    };

    const isQuizOrTest = type === 'Kvíz' || type === 'Teszt';
    const badgeClass = type && typeBadgeClasses[type] ? typeBadgeClasses[type] : "bg-slate-400 text-white";
    const labelText = (isQuizOrTest && isCompleted)
        ? "ÚJRAPRÓBÁLÁS »" 
        : (isQuizOrTest && hasStarted)
        ? "FOLYTATÁS »" 
        : (type && typeLabel[type] ? typeLabel[type] : "INDÍTÁS »");
    const gradientClass = gradientClasses[color] || gradientClasses.slate;

    return (
        <button
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={cn(
                "flex flex-col bg-white dark:bg-slate-900 rounded-2xl border transition-all text-left overflow-hidden group h-full shadow-sm relative",
                (isQuizOrTest && isCompleted)
                    ? "border-emerald-300/80 dark:border-emerald-800/80 ring-1 ring-emerald-400/20" 
                    : (isQuizOrTest && hasStarted)
                    ? "border-amber-300/80 dark:border-amber-800/80 ring-1 ring-amber-400/20"
                    : "border-slate-200 dark:border-slate-800",
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

                {/* Status Badge in Top Left */}
                {isQuizOrTest && (isCompleted ? (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/95 text-emerald-600 dark:text-emerald-400 text-[9px] font-black shadow-md backdrop-blur-sm flex items-center gap-1 z-20 animate-in zoom-in-75">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>3/3 szint • {bestScore !== undefined ? `${bestScore}%` : '100%'}</span>
                    </div>
                ) : hasStarted ? (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/95 text-amber-600 dark:text-amber-400 text-[9px] font-black shadow-md backdrop-blur-sm flex items-center gap-1.5 z-20 animate-in zoom-in-75">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                        <span>{completedLevelsCount}/3 szint • {bestScore !== undefined ? `${bestScore}%` : ''}</span>
                    </div>
                ) : null)}

                {emoji ? (
                    <span className="text-4xl drop-shadow-sm group-hover:scale-110 transition-transform duration-300 z-10">{emoji}</span>
                ) : (
                    <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300 text-white z-10">
                        {icon}
                    </div>
                )}

                {type && (
                    <div className={cn(
                        "absolute top-2 right-2 px-2 py-0.5 rounded-full text-[8px] font-black shadow-sm tracking-wide z-10",
                        badgeClass
                    )}>
                        {type.toUpperCase()}
                    </div>
                )}
            </div>

            {/* Text content */}
            <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                    <h4 className="font-bold text-[11px] text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors leading-tight line-clamp-2">{title}</h4>
                    <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1">{subtitle}</p>

                    {/* 3 Difficulty Level Status Pills for Quizzes */}
                    {isQuizOrTest && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                            <div className="grid grid-cols-3 gap-1">
                                {([1, 2, 3] as const).map((lvl) => {
                                    const scoreVal = levelScores?.[lvl];
                                    const isDone = scoreVal !== undefined;
                                    return (
                                        <div
                                            key={lvl}
                                            className={cn(
                                                "flex flex-col items-center justify-center py-1 px-1 rounded-lg text-center font-mono transition-all",
                                                isDone
                                                    ? scoreVal === 100
                                                        ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shadow-2xs"
                                                        : scoreVal >= 70
                                                        ? "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800 shadow-2xs"
                                                        : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 shadow-2xs"
                                                    : hasStarted
                                                    ? "bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-dashed border-rose-200 dark:border-rose-900/50"
                                                    : "bg-slate-50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 border border-slate-200/60 dark:border-slate-800"
                                            )}
                                            title={isDone ? `${lvl}. szint: ${scoreVal}%` : (hasStarted ? `${lvl}. szint: Még hiányzik` : `${lvl}. szint: Még nincs kitöltve`)}
                                        >
                                            <span className="text-[7.5px] font-black uppercase tracking-tight text-slate-400 dark:text-slate-500">
                                                {lvl}. szint
                                            </span>
                                            <span className={cn(
                                                "font-black text-[10px] leading-tight",
                                                !isDone && hasStarted && "text-[8px] font-bold"
                                            )}>
                                                {isDone ? `${scoreVal}%` : (hasStarted ? 'Hiányzik' : '—')}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-2.5 pt-1.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <span className={cn(
                        "text-[8px] font-black tracking-wider transition-colors",
                        (isQuizOrTest && isCompleted)
                            ? "text-emerald-600 dark:text-emerald-400 flex items-center gap-1" 
                            : (isQuizOrTest && hasStarted)
                            ? "text-amber-600 dark:text-amber-400 flex items-center gap-1"
                            : "text-indigo-600 group-hover:text-primary"
                    )}>
                        {isQuizOrTest && (isCompleted || hasStarted) && <RotateCcw className="w-2.5 h-2.5" />}
                        {labelText}
                    </span>
                    {attemptsCount && attemptsCount > 1 ? (
                        <span className="text-[8px] text-slate-400 font-bold">
                            {attemptsCount}x
                        </span>
                    ) : null}
                </div>
            </div>
        </button>
    );
}

