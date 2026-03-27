import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    ArrowLeft,
    RotateCcw,
    CheckCircle2,
    XCircle,
    Trophy,
    ChevronRight,
    MoveHorizontal,
    Plus,
    X,
    Box
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

type LineRelation = 'párhuzamos' | 'merőleges' | 'metsző' | 'kitérő';

interface LineChallenge {
    id: string;
    relation: LineRelation;
    description: string;
    render: () => React.ReactNode;
}

const CHALLENGES: LineChallenge[] = [
    // Parallel
    {
        id: 'p1',
        relation: 'párhuzamos',
        description: 'Két egyenes, amelyek soha nem metszik egymást.',
        render: () => (
            <svg width="200" height="200" viewBox="0 0 200 200" className="text-slate-800">
                <line x1="40" y1="60" x2="160" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <line x1="40" y1="100" x2="160" y2="100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
        )
    },
    {
        id: 'p2',
        relation: 'párhuzamos',
        description: 'Függőleges párhuzamosok.',
        render: () => (
            <svg width="200" height="200" viewBox="0 0 200 200" className="text-slate-800">
                <line x1="80" y1="40" x2="80" y2="160" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <line x1="120" y1="40" x2="120" y2="160" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
        )
    },
    // Perpendicular
    {
        id: 'm1',
        relation: 'merőleges',
        description: 'Derékszöget zárnak be.',
        render: () => (
            <svg width="200" height="200" viewBox="0 0 200 200" className="text-slate-800">
                <line x1="40" y1="100" x2="160" y2="100" stroke="currentColor" strokeWidth="3" />
                <line x1="100" y1="40" x2="100" y2="160" stroke="currentColor" strokeWidth="3" />
                <rect x="100" y="85" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2" />
            </svg>
        )
    },
    {
        id: 'm2',
        relation: 'merőleges',
        description: 'L-alakú merőleges.',
        render: () => (
            <svg width="200" height="200" viewBox="0 0 200 200" className="text-slate-800">
                <line x1="100" y1="40" x2="100" y2="100" stroke="currentColor" strokeWidth="3" />
                <line x1="100" y1="100" x2="160" y2="100" stroke="currentColor" strokeWidth="3" />
                <rect x="100" y="85" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
        )
    },
    // Intersecting (not perp)
    {
        id: 'x1',
        relation: 'metsző',
        description: 'Egy pontban metszik egymást, de nem derékszögben.',
        render: () => (
            <svg width="200" height="200" viewBox="0 0 200 200" className="text-slate-800">
                <line x1="40" y1="60" x2="160" y2="140" stroke="currentColor" strokeWidth="3" />
                <line x1="40" y1="140" x2="160" y2="60" stroke="currentColor" strokeWidth="3" />
            </svg>
        )
    },
    {
        id: 'x2',
        relation: 'metsző',
        description: 'Hegyesszögű metszés.',
        render: () => (
            <svg width="200" height="200" viewBox="0 0 200 200" className="text-slate-800">
                <line x1="100" y1="40" x2="100" y2="160" stroke="currentColor" strokeWidth="3" />
                <line x1="50" y1="70" x2="150" y2="130" stroke="currentColor" strokeWidth="3" />
            </svg>
        )
    },
    // Skew Lines (Kitérő) - using a cube representation
    {
        id: 'k1',
        relation: 'kitérő',
        description: 'Nem párhuzamosak és nem is metszik egymást (különböző síkokban vannak).',
        render: () => (
            <svg width="200" height="200" viewBox="0 0 200 200" className="text-slate-400">
                {/* Cube wireframe */}
                <rect x="50" y="70" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1" />
                <rect x="80" y="40" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1" />
                <line x1="50" y1="70" x2="80" y2="40" stroke="currentColor" strokeWidth="1" />
                <line x1="130" y1="70" x2="160" y2="40" stroke="currentColor" strokeWidth="1" />
                <line x1="50" y1="150" x2="80" y2="120" stroke="currentColor" strokeWidth="1" />
                <line x1="130" y1="150" x2="160" y2="120" stroke="currentColor" strokeWidth="1" />

                {/* Skew lines highlighted */}
                <line x1="50" y1="70" x2="130" y2="70" stroke="#f43f5e" strokeWidth="4" /> {/* Front top horizontal */}
                <line x1="160" y1="40" x2="160" y2="120" stroke="#f43f5e" strokeWidth="4" /> {/* Back right vertical */}
            </svg>
        )
    },
    {
        id: 'k2',
        relation: 'kitérő',
        description: 'Kocka élein bemutatva.',
        render: () => (
            <svg width="200" height="200" viewBox="0 0 200 200" className="text-slate-400">
                <rect x="50" y="70" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1" />
                <rect x="80" y="40" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1" />
                <line x1="50" y1="70" x2="80" y2="40" stroke="currentColor" strokeWidth="1" />
                <line x1="130" y1="70" x2="160" y2="40" stroke="currentColor" strokeWidth="1" />
                <line x1="50" y1="150" x2="80" y2="120" stroke="currentColor" strokeWidth="1" />
                <line x1="130" y1="150" x2="160" y2="120" stroke="currentColor" strokeWidth="1" />

                <line x1="50" y1="70" x2="50" y2="150" stroke="#0ea5e9" strokeWidth="4" /> {/* Front left vertical */}
                <line x1="80" y1="40" x2="160" y2="40" stroke="#0ea5e9" strokeWidth="4" />   {/* Back top horizontal */}
            </svg>
        )
    }
];

export function LineRelationships({ onBack }: { onBack: () => void }) {
    const [currentChallenge, setCurrentChallenge] = useState<LineChallenge | null>(null);
    const [selectedRelation, setSelectedRelation] = useState<LineRelation | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);

    const generateChallenge = useCallback(() => {
        const randomChallenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
        setCurrentChallenge(randomChallenge);
        setSelectedRelation(null);
        setIsCorrect(null);
    }, []);

    useEffect(() => {
        generateChallenge();
    }, [generateChallenge]);

    const handleSelect = (relation: LineRelation) => {
        if (selectedRelation !== null) return;

        setSelectedRelation(relation);
        const correct = relation === currentChallenge?.relation;
        setIsCorrect(correct);
        setTotalAttempts(prev => prev + 1);

        if (correct) {
            setScore(prev => prev + 1);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#0ea5e9', '#f43f5e', '#fbbf24']
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
                    <MoveHorizontal className="w-5 h-5 text-indigo-600 rotate-45" />
                    Egyenesek helyzete
                </h2>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                        <Trophy className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-xs font-bold text-indigo-700">{score}/{totalAttempts}</span>
                    </div>
                    <Button variant="ghost" onClick={() => { setScore(0); setTotalAttempts(0); generateChallenge(); }} size="sm" className="text-muted-foreground text-xs">
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        Reset
                    </Button>
                </div>
            </div>

            <Card className="border-2 shadow-sm bg-white overflow-hidden">
                <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Visual Part */}
                        <div className="p-12 bg-slate-50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r">
                            <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-slate-100 mb-4 transition-transform hover:scale-105 duration-300">
                                {currentChallenge?.render()}
                            </div>
                            <p className="text-xs text-slate-400 italic text-center max-w-[200px]">
                                {currentChallenge?.relation === 'kitérő' ? 'Figyeld meg a két színes vonal helyzetét a térben!' : 'Vizsgáld meg a két egyenes helyzetét a síkban!'}
                            </p>
                        </div>

                        {/* Selection Part */}
                        <div className="p-8 space-y-6">
                            <div className="text-center md:text-left">
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">Milyen helyzetűek?</h3>
                                <p className="text-slate-600 font-medium">Válaszd ki a két egyenes kapcsolatát!</p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    { id: 'párhuzamos', label: 'Párhuzamos', icon: <MoveHorizontal className="w-5 h-5" />, color: 'blue' },
                                    { id: 'merőleges', label: 'Merőleges', icon: <Plus className="w-5 h-5" />, color: 'emerald' },
                                    { id: 'metsző', label: 'Metsző (nem merőleges)', icon: <X className="w-5 h-5" />, color: 'orange' },
                                    { id: 'kitérő', label: 'Kitérő', icon: <Box className="w-5 h-5" />, color: 'rose' }
                                ].map((option) => (
                                    <button
                                        key={option.id}
                                        disabled={selectedRelation !== null}
                                        onClick={() => handleSelect(option.id as LineRelation)}
                                        className={cn(
                                            "w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group",
                                            selectedRelation === null && "border-slate-100 hover:border-indigo-500 hover:bg-indigo-50",
                                            selectedRelation === option.id && isCorrect && "border-emerald-500 bg-emerald-50 ring-4 ring-emerald-500/10",
                                            selectedRelation === option.id && !isCorrect && "border-rose-500 bg-rose-50 ring-4 ring-rose-500/10",
                                            selectedRelation !== null && option.id === currentChallenge?.relation && !isCorrect && "border-emerald-500/50 bg-emerald-50/20",
                                            selectedRelation !== null && selectedRelation !== option.id && option.id !== currentChallenge?.relation && "opacity-40 grayscale-[50%]"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "p-2 rounded-lg transition-colors",
                                                selectedRelation === option.id ? "bg-white" : "bg-slate-100 group-hover:bg-indigo-100"
                                            )}>
                                                {option.icon}
                                            </div>
                                            <span className="font-bold text-slate-700">{option.label}</span>
                                        </div>
                                        {selectedRelation === option.id && (
                                            isCorrect ? <CheckCircle2 className="w-6 h-6 text-emerald-600" /> : <XCircle className="w-6 h-6 text-rose-600" />
                                        )}
                                        {selectedRelation !== null && option.id === currentChallenge?.relation && !isCorrect && (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {selectedRelation !== null && (
                                <div className="pt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <div className={cn(
                                        "p-4 rounded-xl text-sm leading-relaxed",
                                        isCorrect ? "bg-emerald-50 text-emerald-800 border border-emerald-100" : "bg-rose-50 text-rose-800 border border-rose-100"
                                    )}>
                                        <span className="font-bold">{isCorrect ? 'Ügyes szuper! ' : 'Sajnos nem... '}</span>
                                        {currentChallenge?.description}
                                    </div>
                                    <Button
                                        onClick={generateChallenge}
                                        className="w-full h-12 text-lg font-bold bg-slate-900 hover:bg-slate-800"
                                    >
                                        Következő feladat
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
