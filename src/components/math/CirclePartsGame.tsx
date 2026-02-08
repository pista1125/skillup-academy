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
    Target,
    ChevronRight,
    Circle,
    Brain
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

type Difficulty = 'könnyű' | 'közepes' | 'nehéz';

interface CirclePart {
    id: string;
    label: string;
    description: string;
    difficulty: Difficulty;
}

const CIRCLE_PARTS: CirclePart[] = [
    // Könnyű
    { id: 'center', label: 'Középpont', description: 'A kör középső pontja, minden ponttól egyenlő távolságra.', difficulty: 'könnyű' },
    { id: 'radius', label: 'Sugár (r)', description: 'A középpontot a körvonal egy pontjával összekötő szakasz.', difficulty: 'könnyű' },
    { id: 'diameter', label: 'Átmérő (d)', description: 'A középponton áthaladó, két végpontjával a körvonalra illeszkedő szakasz.', difficulty: 'könnyű' },
    { id: 'circumference', label: 'Körvonal', description: 'A középponttól adott távolságra lévő pontok halmaza.', difficulty: 'könnyű' },

    // Közepes
    { id: 'chord', label: 'Húr', description: 'Két végpontjával a körvonalra illeszkedő szakasz.', difficulty: 'közepes' },
    { id: 'tangent', label: 'Érintő', description: 'A körvonalat pontosan egy pontban érintő egyenes.', difficulty: 'közepes' },
    { id: 'arc', label: 'Körív', description: 'A körvonal egy tetszőleges darabja.', difficulty: 'közepes' },
    { id: 'sector', label: 'Körcikk', description: 'Két sugár és az általuk határolt körív közötti rész.', difficulty: 'közepes' },

    // Nehéz
    { id: 'segment', label: 'Körszelet', description: 'Egy húr és az általa levágott körív közötti rész.', difficulty: 'nehéz' },
    { id: 'secant', label: 'Szelő', description: 'A körvonalat két pontban metsző egyenes.', difficulty: 'nehéz' },
    { id: 'central-angle', label: 'Középponti szög', description: 'A csúcsa a kör középpontja, szárai a kör sugarai.', difficulty: 'nehéz' },
    { id: 'circle-area', label: 'Körlap', description: 'A körvonal és a belső pontjainak összessége.', difficulty: 'nehéz' },
];

export function CirclePartsGame({ onBack }: { onBack: () => void }) {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<CirclePart | null>(null);
    const [options, setOptions] = useState<CirclePart[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [gameFinished, setGameFinished] = useState(false);

    const startNewRound = useCallback((level: Difficulty) => {
        const filtered = CIRCLE_PARTS.filter(p => p.difficulty === level);
        const randomPart = filtered[Math.floor(Math.random() * filtered.length)];

        // Pick 4 random options (including the correct one)
        const otherOptions = CIRCLE_PARTS.filter(p => p.id !== randomPart.id);
        const shuffledOptions = [randomPart, ...otherOptions.sort(() => 0.5 - Math.random()).slice(0, 3)]
            .sort(() => 0.5 - Math.random());

        setCurrentQuestion(randomPart);
        setOptions(shuffledOptions);
        setSelectedId(null);
        setIsCorrect(null);
    }, []);

    useEffect(() => {
        if (difficulty && !currentQuestion) {
            startNewRound(difficulty);
        }
    }, [difficulty, currentQuestion, startNewRound]);

    const handleAnswer = (id: string) => {
        if (selectedId !== null) return;

        setSelectedId(id);
        const correct = id === currentQuestion?.id;
        setIsCorrect(correct);
        setTotalQuestions(prev => prev + 1);

        if (correct) {
            setScore(prev => prev + 1);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    };

    const nextQuestion = () => {
        if (difficulty) startNewRound(difficulty);
    };

    const renderCircleIllustration = (partId: string) => {
        const center = 150;
        const radius = 100;

        return (
            <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto drop-shadow-md">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                    </marker>
                </defs>

                {/* Background Base Circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill={partId === 'circle-area' ? 'rgba(59, 130, 246, 0.2)' : 'none'}
                    stroke="#e2e8f0"
                    strokeWidth="2"
                />

                {/* Specific Part Highlighting */}

                {/* Circumference */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={partId === 'circumference' ? '#3b82f6' : '#94a3b8'}
                    strokeWidth={partId === 'circumference' ? '6' : '3'}
                    className="transition-all duration-300"
                />

                {/* Center */}
                <circle
                    cx={center}
                    cy={center}
                    r={partId === 'center' ? '8' : '4'}
                    fill={partId === 'center' ? '#3b82f6' : '#475569'}
                    className="transition-all duration-300"
                />

                {/* Radius */}
                <line
                    x1={center} y1={center}
                    x2={center + radius * Math.cos(Math.PI / 4)}
                    y2={center - radius * Math.sin(Math.PI / 4)}
                    stroke={partId === 'radius' ? '#3b82f6' : '#94a3b8'}
                    strokeWidth={partId === 'radius' ? '6' : '2'}
                    strokeDasharray={partId === 'radius' ? '0' : '4'}
                    className="transition-all duration-300"
                />

                {/* Diameter */}
                <line
                    x1={center - radius} y1={center}
                    x2={center + radius} y2={center}
                    stroke={partId === 'diameter' ? '#3b82f6' : '#94a3b8'}
                    strokeWidth={partId === 'diameter' ? '6' : '2'}
                    strokeDasharray={partId === 'diameter' ? '0' : '4'}
                    className="transition-all duration-300"
                />

                {/* Chord */}
                <line
                    x1={center + radius * Math.cos(2.5)} y1={center - radius * Math.sin(2.5)}
                    x2={center + radius * Math.cos(0.5)} y2={center - radius * Math.sin(0.5)}
                    stroke={partId === 'chord' ? '#3b82f6' : '#94a3b8'}
                    strokeWidth={partId === 'chord' ? '6' : '2'}
                    strokeDasharray={partId === 'chord' ? '0' : '4'}
                    className={cn("transition-all duration-300", partId !== 'chord' && partId !== 'segment' && "opacity-0")}
                />

                {/* Tangent */}
                <line
                    x1={center + radius - 40} y1={center - radius - 20}
                    x2={center + radius + 40} y2={center + radius - 180}
                    stroke={partId === 'tangent' ? '#3b82f6' : '#94a3b8'}
                    strokeWidth={partId === 'tangent' ? '6' : '2'}
                    className={cn("transition-all duration-300", partId !== 'tangent' && "opacity-0")}
                    transform={`rotate(-45, ${center + radius}, ${center})`}
                />

                {/* Secant */}
                <line
                    x1={center - radius - 20} y1={center - 30}
                    x2={center + radius + 20} y2={center + 50}
                    stroke={partId === 'secant' ? '#3b82f6' : '#94a3b8'}
                    strokeWidth={partId === 'secant' ? '6' : '2'}
                    className={cn("transition-all duration-300", partId !== 'secant' && "opacity-0")}
                />

                {/* Arc */}
                <path
                    d={`M ${center + radius * Math.cos(0.2)} ${center - radius * Math.sin(0.2)} A ${radius} ${radius} 0 0 0 ${center + radius * Math.cos(1.2)} ${center - radius * Math.sin(1.2)}`}
                    fill="none"
                    stroke={partId === 'arc' ? '#3b82f6' : 'none'}
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="transition-all duration-300"
                />

                {/* Sector */}
                <path
                    d={`M ${center} ${center} L ${center + radius * Math.cos(3.5)} ${center - radius * Math.sin(3.5)} A ${radius} ${radius} 0 0 0 ${center + radius * Math.cos(4.2)} ${center - radius * Math.sin(4.2)} Z`}
                    fill={partId === 'sector' ? 'rgba(59, 130, 246, 0.4)' : 'none'}
                    stroke={partId === 'sector' ? '#3b82f6' : 'none'}
                    strokeWidth="2"
                    className="transition-all duration-300"
                />

                {/* Segment */}
                <path
                    d={`M ${center + radius * Math.cos(2.5)} ${center - radius * Math.sin(2.5)} A ${radius} ${radius} 0 0 1 ${center + radius * Math.cos(0.5)} ${center - radius * Math.sin(0.5)} Z`}
                    fill={partId === 'segment' ? 'rgba(59, 130, 246, 0.4)' : 'none'}
                    stroke={partId === 'segment' ? '#3b82f6' : 'none'}
                    strokeWidth="2"
                    className="transition-all duration-300"
                />

                {/* Central Angle */}
                <g className={cn("transition-all duration-300", partId !== 'central-angle' && "opacity-0")}>
                    <line x1={center} y1={center} x2={center + radius * Math.cos(-0.5)} y2={center - radius * Math.sin(-0.5)} stroke="#3b82f6" strokeWidth="3" />
                    <line x1={center} y1={center} x2={center + radius * Math.cos(-1.5)} y2={center - radius * Math.sin(-1.5)} stroke="#3b82f6" strokeWidth="3" />
                    <path d={`M ${center + 30 * Math.cos(-0.5)} ${center - 30 * Math.sin(-0.5)} A 30 30 0 0 1 ${center + 30 * Math.cos(-1.5)} ${center - 30 * Math.sin(-1.5)}`} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" />
                </g>
            </svg>
        );
    };

    if (!difficulty) {
        return (
            <div className="flex flex-col items-center justify-center gap-8 py-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
                <div className="text-center space-y-4">
                    <div className="inline-flex p-4 bg-blue-50 rounded-3xl text-blue-600 mb-2">
                        <Circle className="w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800">Kör és részei</h2>
                    <p className="text-slate-500 max-w-md mx-auto">
                        Tanuld meg felismerni a kör különböző elemeit játékos formában! Válassz nehézségi szintet:
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl px-4">
                    <Button
                        onClick={() => setDifficulty('könnyű')}
                        className="h-32 flex flex-col gap-2 rounded-3xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-2 border-emerald-100 hover:border-emerald-200 transition-all group"
                    >
                        <span className="text-2xl font-black">Könnyű</span>
                        <span className="text-xs font-medium opacity-70 group-hover:scale-110 transition-transform">Alapfogalmak</span>
                    </Button>
                    <Button
                        onClick={() => setDifficulty('közepes')}
                        className="h-32 flex flex-col gap-2 rounded-3xl bg-amber-50 text-amber-700 hover:bg-amber-100 border-2 border-amber-100 hover:border-amber-200 transition-all group"
                    >
                        <span className="text-2xl font-black">Közepes</span>
                        <span className="text-xs font-medium opacity-70 group-hover:scale-110 transition-transform">Vonalak és ívek</span>
                    </Button>
                    <Button
                        onClick={() => setDifficulty('nehéz')}
                        className="h-32 flex flex-col gap-2 rounded-3xl bg-rose-50 text-rose-700 hover:bg-rose-100 border-2 border-rose-100 hover:border-rose-200 transition-all group"
                    >
                        <span className="text-2xl font-black">Nehéz</span>
                        <span className="text-xs font-medium opacity-70 group-hover:scale-110 transition-transform">Szeletek és szögek</span>
                    </Button>
                </div>

                <Button variant="ghost" onClick={onBack} className="text-slate-500">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Vissza a menübe
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between px-2">
                <Button variant="ghost" onClick={() => setDifficulty(null)} size="sm" className="hover:bg-slate-100 text-xs">
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    Váltás (szint: {difficulty})
                </Button>
                <h2 className="text-lg font-bold flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Párosító: Kör részei
                </h2>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                        <Trophy className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-xs font-bold text-amber-700">{score}/{totalQuestions}</span>
                    </div>
                </div>
            </div>

            <Card className="border-2 shadow-xl overflow-hidden bg-white rounded-[2rem]">
                <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Visualization Area */}
                        <div className="p-8 bg-slate-50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r relative overflow-hidden">
                            <div className="absolute top-4 left-4">
                                <Badge variant="secondary" className="capitalize">
                                    {difficulty} szint
                                </Badge>
                            </div>

                            <div className="bg-white p-8 rounded-full shadow-2xl border-4 border-white mb-6 relative">
                                {currentQuestion && renderCircleIllustration(currentQuestion.id)}

                                {isCorrect === true && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/10 rounded-full animate-in zoom-in-50 duration-300">
                                        <CheckCircle2 className="w-32 h-32 text-emerald-500 opacity-20" />
                                    </div>
                                )}
                                {isCorrect === false && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-rose-500/10 rounded-full animate-in zoom-in-50 duration-300">
                                        <XCircle className="w-32 h-32 text-rose-500 opacity-20" />
                                    </div>
                                )}
                            </div>

                            {currentQuestion && (
                                <div className="text-center max-w-xs">
                                    <p className="text-slate-400 text-xs uppercase font-black tracking-widest mb-1">Meghatározás</p>
                                    <p className="text-slate-600 italic leading-relaxed text-sm">
                                        "{currentQuestion.description}"
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Interaction Area */}
                        <div className="p-8 space-y-8 flex flex-col justify-center">
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                    <Brain className="w-4 h-4" />
                                    Melyik fogalom látható a képen?
                                </h3>

                                <div className="grid grid-cols-1 gap-3">
                                    {options.map((option) => (
                                        <button
                                            key={option.id}
                                            disabled={selectedId !== null}
                                            onClick={() => handleAnswer(option.id)}
                                            className={cn(
                                                "w-full p-4 rounded-2xl border-2 text-left transition-all relative group overflow-hidden",
                                                selectedId === null && "hover:border-primary hover:bg-primary/5 active:scale-[0.98] border-slate-100 bg-slate-50/50",
                                                selectedId === option.id && isCorrect && "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-lg shadow-emerald-500/10",
                                                selectedId === option.id && !isCorrect && "border-rose-500 bg-rose-50 text-rose-700 shadow-lg shadow-rose-500/10",
                                                selectedId !== null && option.id === currentQuestion?.id && !isCorrect && "border-emerald-500/50 bg-emerald-50/30 text-emerald-600",
                                                selectedId !== null && selectedId !== option.id && option.id !== currentQuestion?.id && "opacity-40 grayscale scale-95"
                                            )}
                                        >
                                            <div className="flex items-center justify-between relative z-10">
                                                <span className="font-bold text-lg">{option.label}</span>
                                                {selectedId === option.id && (
                                                    isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />
                                                )}
                                                {selectedId !== null && option.id === currentQuestion?.id && !isCorrect && (
                                                    <CheckCircle2 className="w-5 h-5" />
                                                )}
                                            </div>

                                            {/* Decoration */}
                                            {selectedId === null && (
                                                <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-slate-200/20 to-transparent transform translate-x-12 group-hover:translate-x-0 transition-transform duration-300" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {selectedId !== null && (
                                <div className="animate-in slide-in-from-bottom-4 flex flex-col gap-4">
                                    <div className={cn(
                                        "p-4 rounded-2xl border flex items-start gap-3",
                                        isCorrect ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-rose-50 border-rose-100 text-rose-800"
                                    )}
                                    >
                                        <div className={cn(
                                            "mt-1 p-1 rounded-lg",
                                            isCorrect ? "bg-emerald-200/50" : "bg-rose-200/50"
                                        )}>
                                            {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{isCorrect ? 'Nagyszerű munkát végeztél!' : 'Bumm! Majdnem sikerült.'}</p>
                                            <p className="text-xs opacity-80 leading-relaxed mt-1">
                                                {isCorrect
                                                    ? `Helyesen azonosítottad a következőt: ${currentQuestion?.label}.`
                                                    : `Ez nem a(z) ${options.find(o => o.id === selectedId)?.label} volt. A helyes válasz: ${currentQuestion?.label}.`}
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={nextQuestion}
                                        className="w-full h-14 text-lg font-bold bg-slate-900 hover:bg-slate-800 rounded-2xl shadow-lg border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 transition-all"
                                    >
                                        Kérem a következőt!
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex items-center justify-center gap-8 py-4 opacity-40">
                <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${(score / Math.max(1, totalQuestions)) * 100}%` }} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-tighter">Pontosság</span>
                </div>
            </div>
        </div>
    );
}
