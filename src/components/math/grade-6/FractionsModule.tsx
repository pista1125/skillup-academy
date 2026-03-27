import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FractionVisualizer } from "@/components/math/tools/FractionVisualizer";
import { FractionsQuiz } from "@/components/math/grade-6/FractionsQuiz";
import { FractionMultiplicationMatcher } from "@/components/math/grade-6/FractionMultiplicationMatcher";
import { FractionVisualMatcher } from "@/components/math/grade-6/FractionVisualMatcher";
import { FractionDivisionMatcher } from "@/components/math/grade-6/FractionDivisionMatcher";
import { DecimalFractionsTool } from "@/components/math/tools/DecimalFractionsTool";
import DecimalFractionsQuiz from "@/components/math/grade-6/DecimalFractionsQuiz";
import DecimalMultiplicationQuiz from "@/components/math/grade-6/DecimalMultiplicationQuiz";
import DecimalDivisionQuiz from "@/components/math/grade-6/DecimalDivisionQuiz";
import DecimalShifterTool from "@/components/math/tools/DecimalShifterTool";
import { DecimalMultiplicationMatcher } from "@/components/math/grade-6/DecimalMultiplicationMatcher";
import { DecimalDivisionMatcher } from "@/components/math/grade-6/DecimalDivisionMatcher";
import { NumberLineTool } from "@/components/math/tools/NumberLineTool";
import { FractionToDecimalMatcher } from "@/components/math/grade-6/FractionToDecimalMatcher";
import { FractionsClosingTest } from "@/components/math/grade-6/FractionsClosingTest";
import { SectionHeader } from "@/components/math/shared/SectionHeader";
import { ActivityPlaceholder } from "@/components/math/shared/ActivityPlaceholder";
import {
    Binary,
    ChevronRight,
    ChevronLeft,
    Star,
    Medal,
    Crown,
    HelpCircle,
    Pizza,
    Calculator,
    ArrowLeft,
    BookOpen,
    Target,
    Zap,
    MoveHorizontal,
    Sparkles,
    Shapes
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FractionsModuleProps {
    onBack: () => void;
    onStartActivity?: (type: string) => void;
    isInline?: boolean;
    initialView?: string;
}

type ViewType = 'menu' | 'visualizer' | 'quiz' | 'multiplier' | 'visual-matcher' | 'divider' | 'decimal-fractions' | 'number-line' | 'decimal-multiplier' | 'decimal-divider' | 'decimal-multiplier-select' | 'decimal-divider-select' | 'decimal-quiz' | 'decimal-multiplication-quiz' | 'decimal-division-quiz' | 'decimal-shifter' | 'to-decimal-matcher' | 'closing-test';

export function FractionsModule({ onBack, onStartActivity, isInline = false, initialView }: FractionsModuleProps) {
    const [view, setView] = useState<ViewType | string>(() => {
        if (!initialView || initialView === 'fractions' || initialView === 'g5-fractions-decimals') {
            return 'menu';
        }
        return initialView.replace('fractions-', '');
    });
    const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | undefined>(undefined);

    const handleBackToMenu = () => {
        if (onStartActivity) {
            onStartActivity('fractions');
        } else {
            setView('menu');
        }
        setSelectedDifficulty(undefined);
    };

    // Keep internal view in sync with prop from parent (for deep-linking and browser navigation)
    useEffect(() => {
        if (initialView && initialView !== view) {
            if (initialView === 'fractions' || initialView === 'g5-fractions-decimals') {
                setView('menu');
            } else if (initialView.startsWith('fractions-') || initialView.startsWith('decimal-')) {
                // If it's a sub-activity like fractions-quiz, we might need to strip the prefix
                // for internal module state
                setView(initialView.replace('fractions-', ''));
            }
        } else if (!initialView && view !== 'menu') {
            setView('menu');
        }
    }, [initialView]);


    if (view === 'menu') {
        return (
            <div className={cn(
                "flex flex-col animate-in fade-in duration-500",
                isInline ? "gap-6 py-2" : "gap-10 py-6 slide-in-from-bottom-4"
            )}>
                {!isInline && (
                    <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-orange-100 shadow-sm mx-1">
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
                                onClick={() => onStartActivity?.('fractions-visual-matcher')}
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
                                onClick={() => onStartActivity?.('fractions-visualizer')}
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
                                onClick={() => onStartActivity?.('number-line')}
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
                                onClick={() => { setSelectedDifficulty('easy'); onStartActivity?.('fractions-quiz'); }}
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
                                onClick={() => { setSelectedDifficulty('medium'); onStartActivity?.('fractions-quiz'); }}
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
                                onClick={() => onStartActivity?.('fractions-multiplier')}
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
                                onClick={() => onStartActivity?.('fractions-divider')}
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
                                onClick={() => onStartActivity?.('fractions-quiz')}
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
                                onClick={() => onStartActivity?.('decimal-fractions')}
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
                                onClick={() => onStartActivity?.('decimal-fractions')}
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
                                title="Tizedestörtek szorzása"
                                subtitle="10-zel, 100-zal, 1000-rel"
                                type="Teszt"
                                icon={<Calculator className="w-6 h-6" />}
                                color="violet"
                                onClick={() => onStartActivity?.('decimal-multiplication-quiz')}
                            />
                            <ActivityPlaceholder
                                title="Vessző-eltoló"
                                subtitle="Szorzás szemléltetése"
                                type="Eszköz"
                                icon={<ChevronRight className="w-6 h-6" />}
                                color="violet"
                                onClick={() => onStartActivity?.('decimal-shifter')}
                            />
                            <ActivityPlaceholder
                                title="Szorzás párkereső"
                                subtitle="Párosítós játék"
                                type="Gyakorlás"
                                icon={<Zap className="w-6 h-6" />}
                                color="violet"
                                onClick={() => onStartActivity?.('decimal-multiplier-select')}
                            />
                        </div>
                    </section>

                    <section>
                        <SectionHeader number={14} title="Tizedes törtek osztása pozitív egész számmal" color="rose" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ActivityPlaceholder
                                title="Tizedestörtek osztása"
                                subtitle="10-zel, 100-zal, 1000-rel"
                                type="Teszt"
                                icon={<Calculator className="w-6 h-6" />}
                                color="rose"
                                onClick={() => onStartActivity?.('decimal-division-quiz')}
                            />
                            <ActivityPlaceholder
                                title="Vessző-eltoló"
                                subtitle="Osztás szemléltetése"
                                type="Eszköz"
                                icon={<ChevronLeft className="w-6 h-6" />}
                                color="rose"
                                onClick={() => onStartActivity?.('decimal-shifter')}
                            />
                            <ActivityPlaceholder
                                title="Osztás párkereső"
                                subtitle="Párosítós játék"
                                type="Gyakorlás"
                                icon={<Zap className="w-6 h-6" />}
                                color="rose"
                                onClick={() => onStartActivity?.('decimal-divider-select')}
                            />
                        </div>
                    </section>

                    <section>
                        <SectionHeader number={15} title="Közönséges törtek tizedes tört alakja" color="indigo" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ActivityPlaceholder
                                title="Átváltás"
                                subtitle="Tört alak -> Tizedes alak"
                                type="Gyakorlás"
                                icon={<Binary className="w-6 h-6" />}
                                color="indigo"
                                onClick={() => onStartActivity?.('fractions-to-decimal-matcher')}
                            />
                        </div>
                    </section>

                    <section>
                        <SectionHeader number={16} title="Összefoglalás" color="red" />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ActivityPlaceholder
                                title="Záró feladatsor"
                                subtitle="Teljes fejezet áttekintése"
                                type="Kezdés"
                                icon={<Target className="w-6 h-6" />}
                                color="red"
                                onClick={() => onStartActivity?.('fractions-closing-test')}
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

            {view === 'decimal-multiplier-select' && (
                <LevelSelectView
                    title="Szorzás Párkereső"
                    onBack={handleBackToMenu}
                    onSelect={(d) => { setSelectedDifficulty(d); setView('decimal-multiplier'); }}
                    color="violet"
                />
            )}

            {view === 'decimal-multiplier' && selectedDifficulty && (
                <DecimalMultiplicationMatcher
                    difficulty={selectedDifficulty as any}
                    onBack={() => setView('decimal-multiplier-select')}
                />
            )}

            {view === 'decimal-divider-select' && (
                <LevelSelectView
                    title="Osztás Párkereső"
                    onBack={handleBackToMenu}
                    onSelect={(d) => { setSelectedDifficulty(d); setView('decimal-divider'); }}
                    color="rose"
                />
            )}

            {view === 'decimal-divider' && selectedDifficulty && (
                <DecimalDivisionMatcher
                    difficulty={selectedDifficulty as any}
                    onBack={() => setView('decimal-divider-select')}
                />
            )}

            {view === 'decimal-quiz' && (
                <DecimalFractionsQuiz onBack={handleBackToMenu} />
            )}

            {view === 'decimal-multiplication-quiz' && (
                <DecimalMultiplicationQuiz onBack={handleBackToMenu} />
            )}

            {view === 'decimal-division-quiz' && (
                <DecimalDivisionQuiz onBack={handleBackToMenu} />
            )}

            {view === 'decimal-shifter' && (
                <DecimalShifterTool onBack={handleBackToMenu} />
            )}

            {view === 'to-decimal-matcher' && (
                <FractionToDecimalMatcher onBack={handleBackToMenu} />
            )}

            {view === 'closing-test' && (
                <FractionsClosingTest onBack={handleBackToMenu} />
            )}
        </div>
    );
}

interface LevelSelectViewProps {
    title: string;
    onBack: () => void;
    onSelect: (d: 'easy' | 'medium' | 'hard') => void;
    color: string;
}

function LevelSelectView({ title, onBack, onSelect, color }: LevelSelectViewProps) {
    const colorClasses: Record<string, string> = {
        violet: 'border-violet-100 hover:border-violet-400 text-violet-600 bg-violet-50',
        rose: 'border-rose-100 hover:border-rose-400 text-rose-600 bg-rose-50',
    };

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between px-2">
                <Button variant="ghost" onClick={onBack} size="sm" className="hover:bg-slate-100 text-xs">
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    Vissza
                </Button>
                <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
                <div className="w-16"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <DifficultyCard
                    title="Kezdő"
                    desc="Egyszerű feladatok"
                    icon={<Star className="w-12 h-12" />}
                    badge="Könnyű"
                    color="emerald"
                    onClick={() => onSelect('easy')}
                />
                <DifficultyCard
                    title="Haladó"
                    desc="Közepes kihívás"
                    icon={<Medal className="w-12 h-12" />}
                    badge="Közepes"
                    color="amber"
                    onClick={() => onSelect('medium')}
                />
                <DifficultyCard
                    title="Mester"
                    desc="Profi szint"
                    icon={<Crown className="w-12 h-12" />}
                    badge="Nehéz"
                    color="rose"
                    onClick={() => onSelect('hard')}
                />
            </div>
        </div>
    );
}

function DifficultyCard({ title, desc, icon, badge, color, onClick }: any) {
    const colors: Record<string, any> = {
        emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-100 hover:border-emerald-400', badge: 'bg-emerald-50 text-emerald-600' },
        amber: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-100 hover:border-amber-400', badge: 'bg-amber-50 text-amber-600' },
        rose: { bg: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-100 hover:border-rose-400', badge: 'bg-rose-50 text-rose-600' },
    };

    const c = colors[color];

    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center p-8 bg-white border-2 rounded-3xl hover:shadow-xl hover:scale-105 transition-all group",
                c.border
            )}
        >
            <div className={cn("p-4 rounded-full mb-6 group-hover:rotate-12 transition-transform", c.bg, c.text)}>
                {icon}
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">{title}</h3>
            <p className="text-center text-slate-500 font-medium">{desc}</p>
            <span className={cn("mt-4 text-xs font-bold px-3 py-1 rounded-full", c.badge)}>{badge}</span>
        </button>
    );
}
