import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FractionVisualizer } from './FractionVisualizer';
import { FractionsQuiz } from './FractionsQuiz';
import { FractionMultiplicationMatcher } from './FractionMultiplicationMatcher';
import { FractionVisualMatcher } from './FractionVisualMatcher';
import { FractionDivisionMatcher } from './FractionDivisionMatcher';
import { DecimalFractionsTool } from './DecimalFractionsTool';
import { NumberLineTool } from './NumberLineTool';
import { SectionHeader } from './SectionHeader';
import { ActivityPlaceholder } from './ActivityPlaceholder';
import {
    Pizza,
    Calculator,
    ArrowLeft,
    BookOpen,
    Target,
    Zap,
    MoveHorizontal,
    Sparkles,
    Shapes,
    Binary
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FractionsModuleProps {
    onBack: () => void;
    onStartActivity?: (type: string) => void;
    isInline?: boolean;
}

type ViewType = 'menu' | 'visualizer' | 'quiz' | 'multiplier' | 'visual-matcher' | 'divider' | 'decimal-fractions' | 'number-line';

export function FractionsModule({ onBack, onStartActivity, isInline = false }: FractionsModuleProps) {
    const [view, setView] = useState<ViewType | string>('menu');
    const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | undefined>(undefined);

    const handleBackToMenu = () => {
        setView('menu');
        setSelectedDifficulty(undefined);
    };

    if (view === 'menu') {
        return (
            <div className={cn(
                "flex flex-col animate-in fade-in duration-500",
                isInline ? "gap-6 py-2" : "gap-10 py-6 slide-in-from-bottom-4"
            )}>
                {!isInline && (
                    <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-orange-100 shadow-sm sticky top-0 z-10 mx-1">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl text-white shadow-lg shadow-orange-200">
                                <Pizza className="w-7 h-7" />
                            </div>
                            <div>
                                <h2 className="font-display text-2xl font-black text-slate-800 tracking-tight">Törtek, tizedes törtek</h2>
                                <p className="text-sm font-medium text-slate-500">Ismerd meg és gyakorold a törteket!</p>
                            </div>
                        </div>
                        <Button variant="ghost" onClick={onBack} size="sm" className="rounded-xl hover:bg-orange-50 text-orange-600 font-bold">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Vissza
                        </Button>
                    </div>
                )}

                <div className="space-y-12">
                    <section>
                        <SectionHeader number={1} title="Ismerkedés a törtekkel" color="blue" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ActivityPlaceholder
                                title="Törtek felismerése"
                                subtitle="Párosítsd a diagramokat"
                                type="Gyakorlás"
                                icon={<Shapes className="w-6 h-6" />}
                                color="blue"
                                onClick={() => setView('visual-matcher')}
                            />
                        </div>
                    </section>

                    <section>
                        <SectionHeader number={2} title="Törtek bővítése, egyszerűsítése, összehasonlítása" color="orange" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ActivityPlaceholder
                                title="Törtmegjelenítő"
                                subtitle="Bővítés és egyszerűsítés"
                                type="Kezdés"
                                icon={<Target className="w-6 h-6" />}
                                color="amber"
                                onClick={() => setView('visualizer')}
                            />
                        </div>
                    </section>

                    <section>
                        <SectionHeader number={3} title="Törtek ábrázolása számegyenesen, vegyes törtek" color="indigo" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ActivityPlaceholder
                                title="Számegyenes"
                                subtitle="Törtek helyének keresése"
                                type="Gyakorlás"
                                icon={<MoveHorizontal className="w-6 h-6" />}
                                color="indigo"
                                onClick={() => setView('number-line')}
                            />
                        </div>
                    </section>

                    <section>
                        <SectionHeader number={4} title="Egyenlő nevezőjű törtek összeadása és kivonása" color="emerald" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ActivityPlaceholder
                                title="Összeadás-Kivonás"
                                subtitle="Kezdő szint"
                                type="Teszt"
                                icon={<Calculator className="w-6 h-6" />}
                                color="emerald"
                                onClick={() => { setSelectedDifficulty('easy'); setView('quiz'); }}
                            />
                        </div>
                    </section>

                    <section>
                        <SectionHeader number={5} title="Különböző nevezőjű törtek összeadása és kivonása" color="amber" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ActivityPlaceholder
                                title="Közös nevező"
                                subtitle="Haladó szint"
                                type="Teszt"
                                icon={<Calculator className="w-6 h-6" />}
                                color="amber"
                                onClick={() => { setSelectedDifficulty('medium'); setView('quiz'); }}
                            />
                        </div>
                    </section>

                    <section>
                        <SectionHeader number={6} title="Tört szorzása természetes számmal" color="violet" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ActivityPlaceholder
                                title="Szorzás párkereső"
                                subtitle="Tört szorzása egészszel"
                                type="Gyakorlás"
                                icon={<Zap className="w-6 h-6" />}
                                color="violet"
                                onClick={() => setView('multiplier')}
                            />
                        </div>
                    </section>

                    <section>
                        <SectionHeader number={7} title="Tört osztása pozitív egész számmal" color="rose" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ActivityPlaceholder
                                title="Osztás párkereső"
                                subtitle="Tört osztása egészszel"
                                type="Gyakorlás"
                                icon={<Zap className="w-6 h-6" />}
                                color="rose"
                                onClick={() => setView('divider')}
                            />
                        </div>
                    </section>

                    <section>
                        <SectionHeader number={8} title="Műveletek sorrendje, zárójelfelbontás" color="slate" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ActivityPlaceholder
                                title="Zárójeles feladatok"
                                subtitle="Több művelet egyszerre"
                                type="Hamarosan"
                                icon={<BookOpen className="w-6 h-6" />}
                                color="slate"
                                disabled
                            />
                        </div>
                    </section>

                    <section>
                        <SectionHeader number={9} title="Mit tanultunk eddig? Gyakoroljunk!" color="teal" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ActivityPlaceholder
                                title="Mester szint"
                                subtitle="Vegyes feladatsor"
                                type="Teszt"
                                icon={<Sparkles className="w-6 h-6" />}
                                color="teal"
                                onClick={() => setView('quiz')}
                            />
                        </div>
                    </section>

                    <section>
                        <SectionHeader number={10} title="Tizedes törtek" color="amber" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ActivityPlaceholder
                                title="Helyiérték korongok"
                                subtitle="Ismerkedés a tizedesekkel"
                                type="Kezdés"
                                icon={<span className="text-2xl">🪙</span>}
                                color="amber"
                                onClick={() => setView('decimal-fractions')}
                            />
                            <ActivityPlaceholder
                                title="Olvasás gyakorlása"
                                subtitle="Betűvel írt -> számjegy"
                                type="Teszt"
                                icon={<Sparkles className="w-6 h-6 text-amber-500" />}
                                color="amber"
                                onClick={() => onStartActivity?.('decimal-quiz')}
                            />
                        </div>
                    </section>

                    <section>
                        <SectionHeader number={11} title="Tizedes törtek ábrázolása, kerekítése és összehasonlítása" color="blue" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ActivityPlaceholder
                                title="Kerekítés"
                                subtitle="Helyiérték szerint"
                                type="Gyakorlás"
                                icon={<Target className="w-6 h-6" />}
                                color="blue"
                                onClick={() => setView('decimal-fractions')}
                            />
                        </div>
                    </section>

                    <section>
                        <SectionHeader number={12} title="Tizedes törtek összeadása és kivonása" color="emerald" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ActivityPlaceholder
                                title="Műveletek tizedesekkel"
                                subtitle="Írásbeli összeadás"
                                type="Hamarosan"
                                icon={<Calculator className="w-6 h-6" />}
                                color="emerald"
                                disabled
                            />
                        </div>
                    </section>

                    <section>
                        <SectionHeader number={13} title="Tizedes törtek szorzása természetes számmal" color="violet" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ActivityPlaceholder
                                title="Többszörösek"
                                subtitle="Tizedes szorzása"
                                type="Hamarosan"
                                icon={<Calculator className="w-6 h-6" />}
                                color="violet"
                                disabled
                            />
                        </div>
                    </section>

                    <section>
                        <SectionHeader number={14} title="Tizedes törtek osztása pozitív egész számmal" color="rose" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ActivityPlaceholder
                                title="Osztás"
                                subtitle="Tizedes osztása"
                                type="Hamarosan"
                                icon={<Calculator className="w-6 h-6" />}
                                color="rose"
                                disabled
                            />
                        </div>
                    </section>

                    <section>
                        <SectionHeader number={15} title="Közönséges törtek tizedes tört alakja" color="indigo" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ActivityPlaceholder
                                title="Átváltás"
                                subtitle="Tört alak -> Tizedes alak"
                                type="Hamarosan"
                                icon={<Binary className="w-6 h-6" />}
                                color="indigo"
                                disabled
                            />
                        </div>
                    </section>

                    <section>
                        <SectionHeader number={16} title="Összefoglalás" color="red" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ActivityPlaceholder
                                title="Záró feladatsor"
                                subtitle="Teljes fejezet áttekintése"
                                type="Hamarosan"
                                icon={<Target className="w-6 h-6" />}
                                color="red"
                                disabled
                            />
                        </div>
                    </section>
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
                <FractionsQuiz
                    onBack={handleBackToMenu}
                    initialDifficulty={selectedDifficulty as any}
                />
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

            {view === 'decimal-fractions' && (
                <DecimalFractionsTool onBack={handleBackToMenu} />
            )}

            {view === 'number-line' && (
                <NumberLineTool onBack={handleBackToMenu} />
            )}
        </div>
    );
}
