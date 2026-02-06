import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    ArrowLeft,
    RotateCcw,
    CheckCircle2,
    XCircle,
    Trophy,
    Square,
    ChevronRight,
    HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

type QuadrilateralCategory = 'négyzet' | 'téglalap' | 'rombusz' | 'paralelogramma' | 'trapéz' | 'deltoid' | 'általános';

interface QuadrilateralItem {
    id: string;
    description?: string;
    category: QuadrilateralCategory;
    icon: React.ReactNode;
    explanation: string;
}

const SHAPES: QuadrilateralItem[] = [
    {
        id: 'square',
        category: 'négyzet',
        explanation: 'Minden oldala egyenlő, minden szöge derékszög (90°). Átlói merőlegesek egymásra és felezik egymást.',
        icon: (
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="25" y="25" width="50" height="50" className="text-emerald-600 fill-emerald-50/50" />
                {/* Right angle markers */}
                <path d="M25 65 L35 65 L35 75" strokeWidth="1" />
                <path d="M65 75 L65 65 L75 65" strokeWidth="1" />
                <path d="M65 25 L65 35 L75 35" strokeWidth="1" />
                <path d="M35 25 L35 35 L25 35" strokeWidth="1" />
                {/* Side markers */}
                <path d="M22 50 L28 50" strokeWidth="2" />
                <path d="M72 50 L78 50" strokeWidth="2" />
                <path d="M50 22 L50 28" strokeWidth="2" />
                <path d="M50 72 L50 78" strokeWidth="2" />
            </svg>
        )
    },
    {
        id: 'rectangle',
        category: 'téglalap',
        explanation: 'Szemközti oldalai párhuzamosak és egyenlők, minden szöge derékszög (90°).',
        icon: (
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="15" y="35" width="70" height="30" className="text-blue-600 fill-blue-50/50" />
                {/* Right angle markers */}
                <path d="M15 55 L25 55 L25 65" strokeWidth="1" />
                <path d="M75 65 L75 55 L85 55" strokeWidth="1" />
            </svg>
        )
    },
    {
        id: 'rhombus',
        category: 'rombusz',
        explanation: 'Minden oldala egyenlő. Átlói merőlegesek egymásra és felezik egymást. Szemközti szögei egyenlők.',
        icon: (
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M50 15 L80 50 L50 85 L20 50 Z" className="text-purple-600 fill-purple-50/50" />
                {/* Side markers */}
                <path d="M32 30 L38 36" strokeWidth="2" />
                <path d="M62 36 L68 30" strokeWidth="2" />
                <path d="M62 64 L68 70" strokeWidth="2" />
                <path d="M32 70 L38 64" strokeWidth="2" />
            </svg>
        )
    },
    {
        id: 'parallelogram',
        category: 'paralelogramma',
        explanation: 'Szemközti oldalai párhuzamosak és egyenlők. Szemközti szögei egyenlők.',
        icon: (
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M25 75 L75 75 L85 25 L35 25 Z" className="text-orange-600 fill-orange-50/50" />
                {/* Parallel arrows */}
                <path d="M40 75 L45 70 L50 75" fill="none" />
                <path d="M50 25 L55 20 L60 25" fill="none" />
            </svg>
        )
    },
    {
        id: 'trapezoid',
        category: 'trapéz',
        explanation: 'Van legalább egy párhuzamos oldalpárja (alapok).',
        icon: (
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 80 L80 80 L70 30 L30 30 Z" className="text-pink-600 fill-pink-50/50" />
            </svg>
        )
    },
    {
        id: 'deltoid',
        category: 'deltoid',
        explanation: 'Két-két szomszédos oldala egyenlő. Átlói merőlegesek egymásra.',
        icon: (
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M50 10 L80 40 L50 90 L20 40 Z" className="text-cyan-600 fill-cyan-50/50" />
                {/* Diagonal */}
                <path d="M50 10 L50 90" strokeDasharray="4 4" className="stroke-slate-400" />
                <path d="M20 40 L80 40" strokeDasharray="4 4" className="stroke-slate-400" />
                {/* Side markers */}
                <path d="M32 22 L38 28" strokeWidth="2" />
                <path d="M62 28 L68 22" strokeWidth="2" />
            </svg>
        )
    },
    {
        id: 'general',
        category: 'általános',
        explanation: 'Nincs speciális tulajdonsága, oldalai és szögei különbözhetnek.',
        icon: (
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 80 L90 70 L80 20 L30 30 Z" className="text-slate-600 fill-slate-50/50" />
            </svg>
        )
    }
];

export function QuadrilateralClassifier({ onBack }: { onBack: () => void }) {
    const [currentItem, setCurrentItem] = useState<QuadrilateralItem | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<QuadrilateralCategory | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);

    const generateChallenge = useCallback(() => {
        const randomItem = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        setCurrentItem(randomItem);
        setSelectedCategory(null);
        setIsCorrect(null);
    }, []);

    useEffect(() => {
        generateChallenge();
    }, [generateChallenge]);

    const handleSelect = (category: QuadrilateralCategory) => {
        if (selectedCategory !== null) return;

        setSelectedCategory(category);
        const correct = category === currentItem?.category;
        setIsCorrect(correct);
        setTotalAttempts(prev => prev + 1);

        if (correct) {
            setScore(prev => prev + 1);
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#047857', '#10b981', '#34d399']
            });
        }
    };

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between px-2">
                <Button variant="ghost" onClick={onBack} size="sm" className="hover:bg-slate-100 text-xs">
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    Vissza
                </Button>
                <h2 className="text-lg font-bold flex items-center gap-2">
                    <Square className="w-4 h-4 text-emerald-600" />
                    Négyszögek Csoportosítása
                </h2>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                        <Trophy className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-700">{score}/{totalAttempts}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Question Card */}
                <Card className="border-2 shadow-sm overflow-hidden bg-white md:col-span-2">
                    <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                            <div className="p-12 bg-slate-50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r md:w-1/3">
                                <div className="w-48 h-48 bg-white rounded-full shadow-lg border-2 border-slate-100 flex items-center justify-center text-slate-800 mb-6 group transition-transform hover:scale-105">
                                    {currentItem?.icon}
                                </div>
                            </div>
                            <div className="p-8 flex flex-col justify-center flex-1 space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Milyen négyszög ez?</h3>
                                    <p className="text-slate-500">Válaszd ki a legpontosabb kategóriát!</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {SHAPES.map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => handleSelect(t.category)}
                                            disabled={selectedCategory !== null}
                                            className={cn(
                                                "p-3 rounded-xl border-2 text-sm font-bold transition-all hover:scale-105 active:scale-95",
                                                selectedCategory === null
                                                    ? "border-slate-100 bg-white hover:border-emerald-500 hover:bg-emerald-50"
                                                    : selectedCategory === t.category
                                                        ? (isCorrect ? "border-emerald-500 bg-emerald-100 text-emerald-800" : "border-rose-500 bg-rose-100 text-rose-800")
                                                        : (currentItem?.category === t.category ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200" : "opacity-50 grayscale")
                                            )}
                                        >
                                            {t.category.charAt(0).toUpperCase() + t.category.slice(1)}
                                        </button>
                                    ))}
                                </div>

                                {selectedCategory && (
                                    <div className={cn(
                                        "p-4 rounded-xl border animate-in fade-in zoom-in duration-300",
                                        isCorrect ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-rose-50 border-rose-200 text-rose-800"
                                    )}>
                                        <div className="flex items-center gap-3 mb-1">
                                            {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                                            <span className="font-bold text-lg">{isCorrect ? 'Helyes válasz!' : 'Nem talált!'}</span>
                                        </div>
                                        <p className="ml-8 text-sm">
                                            {currentItem?.explanation}
                                        </p>
                                    </div>
                                )}

                                {selectedCategory && (
                                    <Button
                                        onClick={generateChallenge}
                                        className="w-full mt-4" size="lg"
                                    >
                                        Következő feladat <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex gap-4">
                <HelpCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <div className="text-sm text-amber-900 space-y-2">
                    <p className="font-bold">Emlékeztető:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                        <li><strong>Trapéz:</strong> Legalább egy pár párhuzamos oldala van.</li>
                        <li><strong>Paralelogramma:</strong> Két pár párhuzamos oldala van.</li>
                        <li><strong>Rombusz:</strong> Minden oldala egyenlő.</li>
                        <li><strong>Téglalap:</strong> Minden szöge derékszög.</li>
                        <li><strong>Négyzet:</strong> Szabályos négyszög (minden oldala és szöge egyenlő).</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
