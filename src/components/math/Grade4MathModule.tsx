import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MathQuiz } from './MathQuiz';
import { MathColoringGame } from './MathColoringGame';
import { MathSnakeGame } from './MathSnakeGame';
import {
    Calculator,
    Palette,
    ArrowLeft,
    Sparkles,
    Zap,
    Trophy,
    Blocks,
    Target
} from 'lucide-react';
import { BuildingBlocksComparison } from './BuildingBlocksComparison';
import { cn } from '@/lib/utils';

interface Grade2MathModuleProps {
    onBack: () => void;
}

type ViewType = 'menu' | 'coloring' | 'quiz' | 'blocks' | 'snake';

export function Grade2MathModule({ onBack }: Grade2MathModuleProps) {
    const [view, setView] = useState<ViewType>('menu');

    const handleBackToMenu = () => setView('menu');

    if (view === 'menu') {
        return (
            <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between bg-white p-6 rounded-[32px] border-4 border-indigo-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-indigo-100 rounded-2xl text-indigo-600">
                            <Trophy className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="font-display text-2xl font-black text-slate-800">Negyedikes Matek Kaland</h2>
                            <p className="text-slate-500 font-bold">Gyakorold a műveleteket játékosan!</p>
                        </div>
                    </div>
                    <Button variant="outline" onClick={onBack} className="rounded-2xl border-2 font-bold px-6">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Vissza
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <MathCard
                        title="Alapműveletek"
                        description="Mélyítsd el a tudásod az összeadás, kivonás és szorzás világában!"
                        icon={<Calculator className="w-12 h-12" />}
                        color="bg-emerald-50 text-emerald-500 border-emerald-100"
                        onClick={() => setView('quiz')}
                    />
                    <KidsCard
                        title="Szorzó-Színező"
                        description="Számold ki a szorzatot és színezz ki 5 izgalmas új képet!"
                        icon={<Palette className="w-12 h-12" />}
                        color="bg-indigo-50 text-indigo-500 border-indigo-100"
                        onClick={() => setView('coloring')}
                        highlight
                        badge="PRÉMIUM"
                    />
                    <KidsCard
                        title="Toronyépítő"
                        description="Építs tornyokat és hasonlítsd össze őket! Melyik a több?"
                        icon={<Blocks className="w-12 h-12" />}
                        color="bg-blue-50 text-blue-500 border-blue-100"
                        onClick={() => setView('blocks')}
                        highlight
                        badge="ÚJ JÁTÉK"
                    />
                    <KidsCard
                        title="Matek Kígyó 🐍"
                        description="Irányítsd a kígyót és edd meg a helyes válaszokat!"
                        icon={<Target className="w-12 h-12" />}
                        color="bg-rose-50 text-rose-500 border-rose-100"
                        onClick={() => setView('snake')}
                        highlight
                        badge="JÁTÉK"
                    />
                </div>

                <div className="bg-amber-50/50 p-8 rounded-[40px] border-4 border-amber-100 flex items-center gap-6">
                    <div className="p-4 bg-amber-500 rounded-3xl text-white shadow-lg shadow-amber-500/30">
                        <Sparkles className="w-8 h-8" />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-amber-900 mb-1">Újdonság!</h4>
                        <p className="text-amber-800/80 font-bold">Már az 5-ös, 10-es és 2-es szorzótáblát is gyakorolhatod nálunk!</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {view === 'coloring' && (
                <MathColoringGame grade={2} operation="multiplication" onBack={handleBackToMenu} />
            )}

            {view === 'quiz' && (
                <MathQuiz
                    grade={2}
                    type="mixed"
                    onBack={handleBackToMenu}
                    onComplete={(res) => {
                        console.log('Quiz complete:', res);
                        handleBackToMenu();
                    }}
                />
            )}

            {view === 'blocks' && (
                <BuildingBlocksComparison onBack={handleBackToMenu} />
            )}

            {view === 'snake' && (
                <MathSnakeGame onBack={handleBackToMenu} grade={4} />
            )}
        </div>
    );
}

function MathCard({ title, description, icon, color, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center gap-6 p-10 bg-white rounded-[40px] border-4 transition-all group relative overflow-hidden",
                "hover:border-emerald-300 hover:shadow-xl shadow-slate-200 border-emerald-100"
            )}
        >
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

function KidsCard({ title, description, icon, color, onClick, highlight, badge }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center gap-6 p-10 bg-white rounded-[40px] border-4 transition-all group relative overflow-hidden",
                highlight ? "hover:border-indigo-300 hover:shadow-2xl shadow-indigo-100" : "hover:border-primary hover:shadow-xl shadow-slate-200",
                color.split(' ')[2]
            )}
        >
            {badge && (
                <div className={cn(
                    "absolute top-6 right-6 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest text-white shadow-sm",
                    highlight ? "bg-indigo-500" : "bg-amber-500"
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
