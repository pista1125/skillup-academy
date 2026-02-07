import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Grade1Addition } from './Grade1Addition';
import { MathSnakeGame } from './MathSnakeGame';
import {
    Gamepad2,
    ArrowLeft,
    Sparkles,
    Star,
    Zap,
    Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Grade1MathModuleProps {
    onBack: () => void;
}

type ViewType = 'menu' | 'addition10' | 'snake';

export function Grade1MathModule({ onBack }: Grade1MathModuleProps) {
    const [view, setView] = useState<ViewType>('menu');

    const handleBackToMenu = () => setView('menu');

    if (view === 'menu') {
        return (
            <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between bg-white p-6 rounded-[32px] border-4 border-pink-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-pink-100 rounded-2xl text-pink-600">
                            <Sparkles className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="font-display text-2xl font-black text-slate-800">Elsős Matek Tanoda</h2>
                            <p className="text-slate-500 font-bold">Válassz egy izgalmas játékot!</p>
                        </div>
                    </div>
                    <Button variant="outline" onClick={onBack} className="rounded-2xl border-2 font-bold px-6">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Vissza
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <KidsCard
                        title="Számoljunk 10-ig!"
                        description="Segíts az állatkáknak összeszámolni a jutalomfalatokat!"
                        icon={<Star className="w-12 h-12" />}
                        color="bg-amber-50 text-amber-500 border-amber-100"
                        onClick={() => setView('addition10')}
                        badge="ÜGYESSÉGI"
                    />
                    <KidsCard
                        title="Matek Kígyó 🐍"
                        description="Irányítsd a kígyót és edd meg a helyes válaszokat!"
                        icon={<Target className="w-12 h-12" />}
                        color="bg-emerald-50 text-emerald-500 border-emerald-100"
                        onClick={() => setView('snake')}
                        badge="JÁTÉK"
                        highlight
                    />

                </div>

                <div className="bg-blue-50/50 p-8 rounded-[40px] border-4 border-blue-100 flex items-center gap-6">
                    <div className="p-4 bg-blue-500 rounded-3xl text-white shadow-lg shadow-blue-500/30">
                        <Zap className="w-8 h-8" />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-blue-900 mb-1">Tudtad?</h4>
                        <p className="text-blue-800/80 font-bold">Minden helyes válasszal értékes pontokat (XP) gyűjtesz!</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {view === 'addition10' && (
                <Grade1Addition onBack={handleBackToMenu} />
            )}

            {view === 'snake' && (
                <MathSnakeGame onBack={handleBackToMenu} grade={1} />
            )}
        </div>
    );
}

interface KidsCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    onClick: () => void;
    highlight?: boolean;
    badge?: string;
}

function KidsCard({ title, description, icon, color, onClick, highlight, badge }: KidsCardProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center gap-6 p-10 bg-white rounded-[40px] border-4 transition-all group relative overflow-hidden",
                highlight ? "hover:border-pink-300 hover:shadow-2xl shadow-pink-100" : "hover:border-primary hover:shadow-xl shadow-slate-200",
                color.split(' ')[2] // Use the border color from props as default
            )}
        >
            {badge && (
                <div className={cn(
                    "absolute top-6 right-6 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest text-white shadow-sm",
                    highlight ? "bg-pink-500" : "bg-amber-500"
                )}>
                    {badge}
                </div>
            )}
            <div className={cn("p-8 rounded-[32px] transition-all group-hover:scale-110 group-hover:rotate-6 shadow-inner", color.split(' ').slice(0, 2).join(' '))}>
                {icon}
            </div>
            <div className="text-center">
                <h3 className="font-black text-3xl mb-3 text-slate-800 tracking-tight">{title}</h3>
                <p className="text-lg text-slate-500 leading-relaxed font-bold px-4">{description}</p>
            </div>
        </button>
    );
}
