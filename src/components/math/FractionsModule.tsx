import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FractionVisualizer } from './FractionVisualizer';
import { FractionsQuiz } from './FractionsQuiz';
import {
    Pizza,
    Calculator,
    Binary,
    Gamepad2,
    ArrowLeft,
    Sparkles,
    Shapes
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FractionsModuleProps {
    onBack: () => void;
}

type ViewType = 'menu' | 'visualizer' | 'quiz-same' | 'quiz-different';

export function FractionsModule({ onBack }: FractionsModuleProps) {
    const [view, setView] = useState<ViewType>('menu');

    const handleBackToMenu = () => setView('menu');

    if (view === 'menu') {
        return (
            <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between bg-white/50 p-4 rounded-2xl border border-orange-100 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
                            <Pizza className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-display text-xl font-bold text-slate-800">Törtek Világa</h2>
                            <p className="text-sm text-slate-500">Ismerd meg és gyakorold a törteket!</p>
                        </div>
                    </div>
                    <Button variant="outline" onClick={onBack} size="sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Vissza
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ChapterCard
                        title="Törtek megjelenítése"
                        description="Húzd be a tört szeleteket és hasonlítsd össze őket!"
                        icon={<Shapes className="w-10 h-10" />}
                        color="bg-blue-50 text-blue-600"
                        onClick={() => setView('visualizer')}
                    />
                    <ChapterCard
                        title="Egyszerű gyakorlás"
                        description="Összeadás és kivonás azonos nevezőkkel"
                        icon={<Calculator className="w-10 h-10" />}
                        color="bg-emerald-50 text-emerald-600"
                        onClick={() => setView('quiz-same')}
                    />
                    <ChapterCard
                        title="Profi gyakorlás"
                        description="Összeadás és kivonás különböző nevezőkkel"
                        icon={<Gamepad2 className="w-10 h-10" />}
                        color="bg-rose-50 text-rose-600"
                        onClick={() => setView('quiz-different')}
                        highlight
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {view === 'visualizer' && (
                <FractionVisualizer onBack={handleBackToMenu} />
            )}

            {view === 'quiz-same' && (
                <FractionsQuiz difficulty="same" onBack={handleBackToMenu} />
            )}

            {view === 'quiz-different' && (
                <FractionsQuiz difficulty="different" onBack={handleBackToMenu} />
            )}
        </div>
    );
}

interface ChapterCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    onClick: () => void;
    highlight?: boolean;
}

function ChapterCard({ title, description, icon, color, onClick, highlight }: ChapterCardProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center gap-4 p-8 bg-white rounded-3xl border-2 border-slate-100 transition-all group relative overflow-hidden",
                highlight ? "hover:border-rose-300 hover:shadow-2xl shadow-rose-100" : "hover:border-primary hover:shadow-xl shadow-slate-200"
            )}
        >
            {highlight && (
                <div className="absolute top-0 right-0 p-2">
                    <Sparkles className="w-5 h-5 text-rose-500 animate-pulse" />
                </div>
            )}
            <div className={cn("p-6 rounded-2xl transition-all group-hover:scale-110 group-hover:rotate-3 shadow-inner", color)}>
                {icon}
            </div>
            <div className="text-center">
                <h3 className="font-black text-xl mb-2 text-slate-800 tracking-tight">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{description}</p>
            </div>
        </button>
    );
}
