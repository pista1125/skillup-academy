import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FractionVisualizer } from './FractionVisualizer';
import { FractionsQuiz } from './FractionsQuiz';
import { FractionMultiplicationMatcher } from './FractionMultiplicationMatcher';
import { FractionVisualMatcher } from './FractionVisualMatcher';
import { FractionDivisionMatcher } from './FractionDivisionMatcher';
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

type ViewType = 'menu' | 'visualizer' | 'quiz' | 'multiplier' | 'visual-matcher' | 'divider';

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <ChapterCard
                        title="Törtek megjelenítése"
                        description="Húzd be a tört szeleteket és hasonlítsd össze őket!"
                        icon={<Shapes className="w-10 h-10" />}
                        color="bg-blue-50 text-blue-600"
                        onClick={() => setView('visualizer')}
                    />
                    <ChapterCard
                        title="Törtek felismerése"
                        description="Kördiagramok és törtek párosítása"
                        icon={<Shapes className="w-10 h-10" />}
                        color="bg-orange-50 text-orange-600"
                        onClick={() => setView('visual-matcher')}
                    />
                    <ChapterCard
                        title="Összeadás és kivonás"
                        description="Törtek összeadása és kivonása - 3 szint"
                        icon={<Calculator className="w-10 h-10" />}
                        color="bg-emerald-50 text-emerald-600"
                        onClick={() => setView('quiz')}
                    />
                    <ChapterCard
                        title="Szorzás gyakorlása"
                        description="Tört szorzása egész számmal - Párkereső"
                        icon={<Calculator className="w-10 h-10" />}
                        color="bg-violet-50 text-violet-600"
                        onClick={() => setView('multiplier')}
                    />
                    <ChapterCard
                        title="Osztás gyakorlása"
                        description="Tört osztása egész számmal - Párkereső"
                        icon={<Calculator className="w-10 h-10" />}
                        color="bg-pink-50 text-pink-600"
                        onClick={() => setView('divider')}
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

            {view === 'quiz' && (
                <FractionsQuiz onBack={handleBackToMenu} />
            )}

            {view === 'multiplier' && (
                <FractionMultiplicationMatcher onBack={handleBackToMenu} />
            )}

            {view === 'visual-matcher' && (
                <FractionVisualMatcher onBack={handleBackToMenu} />
            )}

            {view === 'divider' && (
                <FractionDivisionMatcher onBack={handleBackToMenu} />
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
