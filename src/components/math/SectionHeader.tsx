import { cn } from '@/lib/utils';

interface SectionHeaderProps {
    number: number;
    title: string;
    color: string;
    id?: string;
    subtitle?: string;
}

export function SectionHeader({ number, title, color, id, subtitle }: SectionHeaderProps) {
    const colorMap: Record<string, string> = {
        blue: "bg-blue-100 text-blue-600 border-blue-200",
        emerald: "bg-emerald-100 text-emerald-600 border-emerald-200",
        amber: "bg-amber-100 text-amber-600 border-amber-200",
        indigo: "bg-indigo-100 text-indigo-600 border-indigo-200",
        violet: "bg-violet-100 text-violet-600 border-violet-200",
        rose: "bg-rose-100 text-rose-600 border-rose-200",
        teal: "bg-teal-100 text-teal-600 border-teal-200",
        red: "bg-red-100 text-red-600 border-red-200"
    };

    return (
        <div id={id} className="flex items-center gap-3 mb-6 scroll-mt-24">
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border", colorMap[color] || colorMap.blue)}>
                {number}
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800">{title}</h3>
                {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
        </div>
    );
}
