import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    ArrowLeft,
    RotateCcw,
    CheckCircle2,
    XCircle,
    Trophy,
    Shapes,
    ChevronRight,
    Box,
    Square
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

type ShapeCategory = 'síkidom' | 'test';

interface ShapeItem {
    id: string;
    name: string;
    category: ShapeCategory;
    icon: React.ReactNode;
}

const SHAPES: ShapeItem[] = [
    { id: 'sq', name: 'Négyzet', category: 'síkidom', icon: <Square className="w-24 h-24" /> },
    {
        id: 'tri', name: 'Háromszög', category: 'síkidom', icon: (
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 22h20L12 2z" />
            </svg>
        )
    },
    {
        id: 'cir', name: 'Kör', category: 'síkidom', icon: (
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
            </svg>
        )
    },
    {
        id: 'rec', name: 'Téglalap', category: 'síkidom', icon: (
            <svg width="96" height="64" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="12" />
            </svg>
        )
    },
    { id: 'cube', name: 'Kocka', category: 'test', icon: <Box className="w-24 h-24" /> },
    {
        id: 'sph', name: 'Gömb', category: 'test', icon: (
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <ellipse cx="12" cy="12" rx="10" ry="3" strokeDasharray="4 2" />
            </svg>
        )
    },
    {
        id: 'cyl', name: 'Henger', category: 'test', icon: (
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <ellipse cx="12" cy="4" rx="8" ry="3" />
                <path d="M4 4v16c0 1.66 3.58 3 8 3s8-1.34 8-3V4" />
            </svg>
        )
    },
    {
        id: 'pyr', name: 'Piramis', category: 'test', icon: (
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                <path d="M12 2L2 18h20L12 2z" />
                <path d="M12 2l4 19M12 2l-4 19" />
                <path d="M2 18l10 3 10-3" />
            </svg>
        )
    }
];

export function ShapeClassifier({ onBack }: { onBack: () => void }) {
    const [currentItem, setCurrentItem] = useState<ShapeItem | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<ShapeCategory | null>(null);
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

    const handleSelect = (category: ShapeCategory) => {
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
                    <Shapes className="w-4 h-4 text-emerald-600" />
                    Síkidom vagy Test?
                </h2>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                        <Trophy className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-700">{score}/{totalAttempts}</span>
                    </div>
                    <Button variant="ghost" onClick={() => { setScore(0); setTotalAttempts(0); generateChallenge(); }} size="sm" className="text-muted-foreground text-xs">
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        Reset
                    </Button>
                </div>
            </div>

            <Card className="border-2 shadow-sm overflow-hidden bg-white">
                <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Visual Part */}
                        <div className="p-12 bg-slate-50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r">
                            <div className="w-48 h-48 bg-white rounded-full shadow-lg border-2 border-slate-100 flex items-center justify-center text-slate-800 mb-6 group transition-transform hover:scale-105">
                                {currentItem?.icon}
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">{currentItem?.name}</h3>
                        </div>

                        {/* Answer Part */}
                        <div className="p-12 flex flex-col justify-center space-y-8">
                            <div className="text-center space-y-2">
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Válaszd ki a megfelelőt!</p>
                                <h4 className="text-lg font-medium text-slate-600">Ez az alakzat egy...</h4>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <button
                                    onClick={() => handleSelect('síkidom')}
                                    disabled={selectedCategory !== null}
                                    className={cn(
                                        "group p-6 rounded-2xl border-4 transition-all flex items-center justify-between",
                                        selectedCategory === null && "border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 bg-white",
                                        selectedCategory === 'síkidom' && isCorrect && "border-emerald-500 bg-emerald-50 ring-8 ring-emerald-500/10",
                                        selectedCategory === 'síkidom' && !isCorrect && "border-rose-500 bg-rose-50 ring-8 ring-rose-500/10",
                                        selectedCategory !== null && selectedCategory !== 'síkidom' && currentItem?.category === 'síkidom' && "border-emerald-500/30 scale-95",
                                        selectedCategory !== null && selectedCategory !== 'síkidom' && currentItem?.category !== 'síkidom' && "opacity-30 border-slate-100 bg-slate-50 scale-90"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600 group-hover:bg-emerald-200 transition-colors">
                                            <Square className="w-6 h-6" />
                                        </div>
                                        <span className="text-xl font-black text-slate-800">Síkidom</span>
                                    </div>
                                    {selectedCategory === 'síkidom' && (
                                        isCorrect ? <CheckCircle2 className="w-8 h-8 text-emerald-600" /> : <XCircle className="w-8 h-8 text-rose-600" />
                                    )}
                                </button>

                                <button
                                    onClick={() => handleSelect('test')}
                                    disabled={selectedCategory !== null}
                                    className={cn(
                                        "group p-6 rounded-2xl border-4 transition-all flex items-center justify-between",
                                        selectedCategory === null && "border-slate-100 hover:border-blue-500 hover:bg-blue-50 bg-white",
                                        selectedCategory === 'test' && isCorrect && "border-emerald-500 bg-emerald-50 ring-8 ring-emerald-500/10",
                                        selectedCategory === 'test' && !isCorrect && "border-rose-500 bg-rose-50 ring-8 ring-rose-500/10",
                                        selectedCategory !== null && selectedCategory !== 'test' && currentItem?.category === 'test' && "border-emerald-500/30 scale-95",
                                        selectedCategory !== null && selectedCategory !== 'test' && currentItem?.category !== 'test' && "opacity-30 border-slate-100 bg-slate-50 scale-90"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-blue-100 rounded-xl text-blue-600 group-hover:bg-blue-200 transition-colors">
                                            <Box className="w-6 h-6" />
                                        </div>
                                        <span className="text-xl font-black text-slate-800">Test</span>
                                    </div>
                                    {selectedCategory === 'test' && (
                                        isCorrect ? <CheckCircle2 className="w-8 h-8 text-emerald-600" /> : <XCircle className="w-8 h-8 text-rose-600" />
                                    )}
                                </button>
                            </div>

                            {selectedCategory !== null && (
                                <Button
                                    onClick={generateChallenge}
                                    className="w-full h-14 text-xl font-bold bg-slate-900 hover:bg-slate-800 shadow-xl"
                                >
                                    Következő alakzat
                                    <ChevronRight className="w-6 h-6 ml-2" />
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <Shapes className="w-4 h-4" />
                    Mi a különbség?
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800/80">
                    <div className="p-3 bg-white/50 rounded-xl">
                        <span className="font-black text-blue-900">Síkidom:</span> Kétdimenziós lapos alakzat, aminek csak kiterjedése (hossza, szélessége) van, de vastagsága nincs.
                    </div>
                    <div className="p-3 bg-white/50 rounded-xl">
                        <span className="font-black text-blue-900">Test:</span> Háromdimenziós alakzat, aminek hossza, szélessége és magassága (vastagsága) is van, tehát helyet foglal el a térben.
                    </div>
                </div>
            </div>
        </div>
    );
}
