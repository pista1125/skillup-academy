import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    ArrowLeft,
    RotateCcw,
    CheckCircle2,
    XCircle,
    Trophy,
    Triangle,
    ChevronRight,
    HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

type TriangleCategory = 'általános' | 'egyenlő szárú' | 'szabályos' | 'derékszögű' | 'hegyesszögű' | 'tompaszögű';

interface TriangleItem {
    id: string;
    description?: string;
    category: TriangleCategory;
    icon: React.ReactNode;
    explanation: string;
}

const TRIANGLES: TriangleItem[] = [
    {
        id: 'equilateral',
        category: 'szabályos',
        explanation: 'Minden oldala egyenlő és minden szöge 60°.',
        icon: (
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                {/* Equilateral triangle: sides approx 80, height approx 69.28 */}
                <path d="M50 15 L15 84 L85 84 Z" className="text-emerald-600 fill-emerald-50/50" />
                {/* Angle arcs */}
                <path d="M46 23 A 10 10 0 0 0 54 23" strokeWidth="1" />
                <path d="M22 78 A 10 10 0 0 0 28 72" strokeWidth="1" />
                <path d="M72 72 A 10 10 0 0 0 78 78" strokeWidth="1" />
                {/* Side markers */}
                <path d="M30 46 L36 50" strokeWidth="2" />
                <path d="M64 50 L70 46" strokeWidth="2" />
                <path d="M47 80 L53 88" strokeWidth="2" />
            </svg>
        )
    },
    {
        id: 'isosceles',
        category: 'egyenlő szárú',
        explanation: 'Két oldala egyenlő hosszúságú (szárak), az alapon fekvő szögek egyenlők.',
        icon: (
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                 {/* Isosceles triangle: tall and narrow */}
                <path d="M50 10 L20 90 L80 90 Z" className="text-blue-600 fill-blue-50/50" />
                 {/* Side markers */}
                <path d="M32 48 L38 52" strokeWidth="2" />
                <path d="M62 52 L68 48" strokeWidth="2" />
            </svg>
        )
    },
    {
        id: 'right',
        category: 'derékszögű',
        explanation: 'Van egy 90°-os szöge.',
        icon: (
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 20 L20 80 L80 80 Z" className="text-indigo-600 fill-indigo-50/50" />
                {/* Right angle marker */}
                <path d="M20 70 L30 70 L30 80" strokeWidth="2" className="text-indigo-600" />
            </svg>
        )
    },
     {
        id: 'obtuse',
        category: 'tompaszögű',
        explanation: 'Van egy 90°-nál nagyobb szöge.',
        icon: (
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 80 L90 80 L40 30 Z" className="text-purple-600 fill-purple-50/50" />
                {/* Arc for obtuse angle at (40,30) is tricky, let's mark the one at (20,80) if that was the obtuse one, but here (20,80) is acute.
                 Wait, 20,80 -> 90,80 (length 70). 40,30 is the top point.
                 Vector 1: 90,80 to 20,80 = (-70, 0).
                 Vector 2: 40,30 to 20,80 = (-20, 50).
                 Actually let's make a clear obtuse triangle.
                 Point A: 10,80. Point B: 90,80. Point C: 30, 30.
                 Side AB is horizontal. Angle at C? If C x is between A and B x, it might be acute depending on height.
                 Let's do: A(10, 80), B(50, 80), C(0, 30).
                 Vector BA = (-40, 0). Vector BC = (-50, -50).
                 Actually simpler: Base horizontal. One side goes excessively out.
                 */}
                 <path d="M10 80 L60 80 L20 20 Z" className="text-purple-600 fill-purple-50/50" />
                 {/* Angle at (20,20) visual approximation */}
            </svg>
        )
    },
     {
        id: 'acute',
        category: 'hegyesszögű',
        explanation: 'Minden szöge 90°-nál kisebb.',
        icon: (
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                 {/* A generic acute triangle */}
                <path d="M20 80 L80 80 L60 20 Z" className="text-amber-600 fill-amber-50/50" />
            </svg>
        )
    },
    {
        id: 'general',
        category: 'általános',
        explanation: 'Nincs egyenlő oldala, és nincs speciális szöge (pl. derékszög).',
        icon: (
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                {/* Scalene triangle */}
                <path d="M10 80 L90 70 L40 10 Z" className="text-slate-600 fill-slate-50/50" />
            </svg>
        )
    }
];

export function TriangleClassifier({ onBack }: { onBack: () => void }) {
    const [currentItem, setCurrentItem] = useState<TriangleItem | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<TriangleCategory | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);

    const generateChallenge = useCallback(() => {
        const randomItem = TRIANGLES[Math.floor(Math.random() * TRIANGLES.length)];
        setCurrentItem(randomItem);
        setSelectedCategory(null);
        setIsCorrect(null);
    }, []);

    useEffect(() => {
        generateChallenge();
    }, [generateChallenge]);

    const handleSelect = (category: TriangleCategory) => {
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
                    <Triangle className="w-4 h-4 text-emerald-600" />
                    Háromszögek Csoportosítása
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
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Milyen háromszög ez?</h3>
                                    <p className="text-slate-500">Válaszd ki a helyes kategóriát!</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {TRIANGLES.map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => handleSelect(t.category)}
                                            disabled={selectedCategory !== null}
                                            className={cn(
                                                "p-4 rounded-xl border-2 text-sm font-bold transition-all hover:scale-105 active:scale-95",
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
                        <li><strong>Szabályos:</strong> Minden oldal és minden szög egyenlő (60°).</li>
                        <li><strong>Egyenlő szárú:</strong> Két oldal egyenlő.</li>
                        <li><strong>Derékszögű:</strong> Van egy 90°-os szöge.</li>
                        <li><strong>Hegyesszögű:</strong> Minden szöge 90°-nál kisebb.</li>
                        <li><strong>Tompaszögű:</strong> Van egy szöge, ami nagyobb mint 90°.</li>
                    </ul>
                 </div>
            </div>
        </div>
    );
}
