import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    ArrowLeft,
    Check,
    Trophy,
    RotateCcw,
    Sparkles,
    ChevronRight,
    School,
    Flame,
    HelpCircle,
    Plus,
    Minus,
    CheckCircle2,
    XCircle,
    Layers,
    Play,
    Maximize2,
    Minimize2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import {
    TowerOperationType,
    TowerDifficultyType,
    TowerRoundData,
    TOWER_OPERATION_DEFINITIONS,
    TOWER_DIFFICULTY_CONFIG,
    getAvailableOperationsForTowerGrade,
    getAvailableBlocksForGrade,
    generateTowerRound
} from './towerProblemGenerator';

type MenuStep = 'GRADE' | 'OPERATION' | 'DIFFICULTY' | 'PLAYING';

interface GradeCategoryInfo {
    grade: number;
    label: string;
    desc: string;
    icon: string;
    color: string;
    badge: string;
}

const TOWER_GRADES: GradeCategoryInfo[] = [
    {
        grade: 1,
        label: '1. osztály',
        desc: 'Számkör 20-ig • 1-es egységek és 10-es hasábok',
        icon: '🌱',
        color: 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50',
        badge: '1–20'
    },
    {
        grade: 2,
        label: '2. osztály',
        desc: 'Számkör 100-ig • Szorzótáblák alapjai & 100-as lapok',
        icon: '🌿',
        color: 'border-blue-200 bg-blue-50/40 hover:bg-blue-50',
        badge: '1–100'
    },
    {
        grade: 3,
        label: '3. osztály',
        desc: 'Számkör 1000-ig • Szorzás, osztás & 1000-es tömbök',
        icon: '🌳',
        color: 'border-amber-200 bg-amber-50/40 hover:bg-amber-50',
        badge: '1–1 000'
    },
    {
        grade: 4,
        label: '4. osztály',
        desc: 'Számkör 10 000-ig • Többjegyű összetett toronyépítés',
        icon: '🏰',
        color: 'border-purple-200 bg-purple-50/40 hover:bg-purple-50',
        badge: '1–10 000'
    }
];

const BLOCK_CONFIGS: Record<number, { label: string; name: string; bg: string; border: string; text: string; shadow: string }> = {
    1: {
        label: '+1',
        name: 'Egyes kocka',
        bg: 'bg-amber-400',
        border: 'border-amber-600',
        text: 'text-amber-950',
        shadow: 'shadow-amber-200'
    },
    10: {
        label: '+10',
        name: 'Tízes rúd',
        bg: 'bg-sky-400',
        border: 'border-sky-600',
        text: 'text-sky-950',
        shadow: 'shadow-sky-200'
    },
    100: {
        label: '+100',
        name: 'Százas lap',
        bg: 'bg-rose-400',
        border: 'border-rose-600',
        text: 'text-rose-950',
        shadow: 'shadow-rose-200'
    },
    1000: {
        label: '+1000',
        name: 'Ezres tömb',
        bg: 'bg-emerald-500',
        border: 'border-emerald-700',
        text: 'text-emerald-950',
        shadow: 'shadow-emerald-200'
    }
};

export function TowerBuilderGame({ onBack, grade: initialGrade }: { onBack: () => void; grade?: number }) {
    // Navigation state
    const [step, setStep] = useState<MenuStep>('GRADE');
    const [selectedGrade, setSelectedGrade] = useState<number>(initialGrade || 1);
    const [selectedOperation, setSelectedOperation] = useState<TowerOperationType | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<TowerDifficultyType>('MEDIUM');

    // Gameplay state
    const [round, setRound] = useState(1);
    const [maxRounds] = useState(10);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [roundData, setRoundData] = useState<TowerRoundData | null>(null);
    const [activeTowerId, setActiveTowerId] = useState<1 | 2>(1);
    const [selectedComparison, setSelectedComparison] = useState<'<' | '=' | '>' | null>(null);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | 'comparison-wrong' | 'missing-comparison' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Fullscreen listeners
    useEffect(() => {
        const handleFsChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    // Escape key listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFullscreen) {
                if (document.fullscreenElement) {
                    document.exitFullscreen().catch(() => {});
                }
                setIsFullscreen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullscreen]);

    // Toggle Fullscreen handler
    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                if (containerRef.current?.requestFullscreen) {
                    await containerRef.current.requestFullscreen();
                }
                setIsFullscreen(true);
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                }
                setIsFullscreen(false);
            }
        } catch (err) {
            // Fallback to CSS fullscreen
            setIsFullscreen(prev => !prev);
        }
    };

    // Scroll to top on step change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

    // Available operations for grade
    const availableOps = getAvailableOperationsForTowerGrade(selectedGrade);

    // Start a new round
    const startNewRound = useCallback((op: TowerOperationType, gr: number, diff: TowerDifficultyType) => {
        const newRound = generateTowerRound(op, gr, diff);
        setRoundData(newRound);
        setActiveTowerId(1);
        setSelectedComparison(null);
        setFeedback(null);
    }, []);

    // Start Game Session
    const handleStartGame = (diff: TowerDifficultyType) => {
        setSelectedDifficulty(diff);
        setStep('PLAYING');
        setRound(1);
        setScore(0);
        setStreak(0);
        setSelectedComparison(null);
        setIsComplete(false);

        if (selectedOperation) {
            startNewRound(selectedOperation, selectedGrade, diff);
        }
    };

    // Restart game with current settings
    const resetGame = () => {
        setRound(1);
        setScore(0);
        setStreak(0);
        setSelectedComparison(null);
        setIsComplete(false);
        if (selectedOperation) {
            startNewRound(selectedOperation, selectedGrade, selectedDifficulty);
        }
    };

    // Cycle comparison on click
    const cycleComparison = () => {
        if (feedback === 'correct') return;
        setSelectedComparison(prev => {
            if (prev === null) return '<';
            if (prev === '<') return '=';
            if (prev === '=') return '>';
            return '<';
        });
        setFeedback(null);
    };

    // Update active tower height
    const updateTowerHeight = (amount: number) => {
        if (!roundData || feedback === 'correct') return;

        setRoundData(prev => {
            if (!prev) return null;

            if (activeTowerId === 1) {
                const newCurrent = Math.max(0, prev.tower1.current + amount);
                return {
                    ...prev,
                    tower1: { ...prev.tower1, current: newCurrent }
                };
            } else {
                const newCurrent = Math.max(0, prev.tower2.current + amount);
                return {
                    ...prev,
                    tower2: { ...prev.tower2, current: newCurrent }
                };
            }
        });
        setFeedback(null);
    };

    // Clear active tower height
    const clearActiveTower = () => {
        if (!roundData || feedback === 'correct') return;

        setRoundData(prev => {
            if (!prev) return null;
            if (activeTowerId === 1) {
                return { ...prev, tower1: { ...prev.tower1, current: 0 } };
            } else {
                return { ...prev, tower2: { ...prev.tower2, current: 0 } };
            }
        });
        setFeedback(null);
    };

    // Check solution
    const handleCheck = () => {
        if (!roundData) return;

        if (selectedComparison === null) {
            setFeedback('missing-comparison');
            return;
        }

        const trueComparison: '<' | '=' | '>' =
            roundData.tower1.target < roundData.tower2.target ? '<' :
            roundData.tower1.target > roundData.tower2.target ? '>' : '=';

        const isTower1Correct = roundData.tower1.current === roundData.tower1.target;
        const isTower2Correct = roundData.tower2.current === roundData.tower2.target;
        const isComparisonCorrect = selectedComparison === trueComparison;

        if (isTower1Correct && isTower2Correct && isComparisonCorrect) {
            setFeedback('correct');
            setScore(prev => prev + 10 + Math.min(streak * 2, 20));
            setStreak(prev => prev + 1);

            confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 }
            });

            setTimeout(() => {
                if (round < maxRounds) {
                    setRound(r => r + 1);
                    if (selectedOperation) {
                        startNewRound(selectedOperation, selectedGrade, selectedDifficulty);
                    }
                } else {
                    setIsComplete(true);
                }
            }, 2000);
        } else if (isTower1Correct && isTower2Correct && !isComparisonCorrect) {
            setFeedback('comparison-wrong');
            setStreak(0);
        } else {
            setFeedback('wrong');
            setStreak(0);
        }
    };

    // Render 3D-styled physical block tower visuals
    const renderTowerBlocks = (value: number) => {
        const thousands = Math.floor(value / 1000);
        const hundreds = Math.floor((value % 1000) / 100);
        const tens = Math.floor((value % 100) / 10);
        const ones = value % 10;

        const totalItems = thousands + hundreds + tens + ones;

        if (totalItems === 0) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-slate-300 select-none">
                    <Layers className="w-8 h-8 mb-1 opacity-40 animate-pulse" />
                    <span className="text-[11px] font-bold">Üres talapzat</span>
                </div>
            );
        }

        return (
            <div className="flex flex-col-reverse items-center justify-start w-full h-full gap-1 p-2 overflow-y-auto">
                {/* 1s (Yellow unit cubes) */}
                {Array.from({ length: ones }).map((_, i) => (
                    <div
                        key={`one-${i}`}
                        className="w-10 h-3.5 bg-amber-400 border border-amber-600 rounded-sm shadow-sm flex items-center justify-center text-[9px] font-black text-amber-950 flex-shrink-0 animate-in zoom-in-75 duration-150"
                    >
                        1
                    </div>
                ))}

                {/* 10s (Sky blue rods) */}
                {Array.from({ length: tens }).map((_, i) => (
                    <div
                        key={`ten-${i}`}
                        className="w-20 h-6 bg-sky-400 border border-sky-600 rounded-md shadow-sm flex items-center justify-center text-[10px] font-black text-sky-950 flex-shrink-0 animate-in zoom-in-75 duration-150"
                    >
                        10
                    </div>
                ))}

                {/* 100s (Rose flat plates) */}
                {Array.from({ length: hundreds }).map((_, i) => (
                    <div
                        key={`hundred-${i}`}
                        className="w-28 h-10 bg-rose-400 border border-rose-600 rounded-lg shadow-sm flex items-center justify-center text-xs font-black text-rose-950 flex-shrink-0 animate-in zoom-in-75 duration-150"
                    >
                        100
                    </div>
                ))}

                {/* 1000s (Emerald large cubes) */}
                {Array.from({ length: thousands }).map((_, i) => (
                    <div
                        key={`thousand-${i}`}
                        className="w-36 h-14 bg-emerald-500 border border-emerald-700 rounded-xl shadow-md flex items-center justify-center text-xs font-black text-emerald-950 flex-shrink-0 animate-in zoom-in-75 duration-150"
                    >
                        1 000
                    </div>
                ))}
            </div>
        );
    };

    // ==========================================
    // STEP 1: GRADE SELECTION SCREEN (1-4)
    // ==========================================
    if (step === 'GRADE') {
        return (
            <div className="flex flex-col gap-4 w-full px-1 sm:px-3 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-blue-100 shadow-sm w-full">
                    <Button variant="ghost" onClick={onBack} size="sm" className="hover:bg-slate-100 text-xs sm:text-sm font-bold h-9 px-3.5 rounded-xl">
                        <ArrowLeft className="w-4 h-4 mr-1.5" />
                        Vissza a játékokhoz
                    </Button>
                    <div className="text-center">
                        <h1 className="text-base sm:text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent flex items-center justify-center gap-2">
                            <span>🏗️</span> Toronyépítő 1–4. Osztály
                        </h1>
                    </div>
                    <div className="w-28 hidden sm:block"></div>
                </div>

                {/* Grade Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                    {TOWER_GRADES.map(g => {
                        const isSelected = selectedGrade === g.grade;

                        return (
                            <button
                                key={g.grade}
                                onClick={() => {
                                    setSelectedGrade(g.grade);
                                    setStep('OPERATION');
                                }}
                                className={cn(
                                    "group relative flex items-center justify-between p-5 sm:p-6 rounded-3xl bg-white border-2 text-left transition-all duration-200 hover:shadow-xl hover:-translate-y-1",
                                    g.color,
                                    isSelected && "ring-2 ring-blue-400"
                                )}
                            >
                                <div className="flex items-center gap-4 min-w-0 flex-1">
                                    <span className="text-3xl p-2.5 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform flex-shrink-0">
                                        {g.icon}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-black text-slate-800 text-base sm:text-lg group-hover:text-blue-700 transition-colors">
                                                {g.label}
                                            </h3>
                                            <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                                                {g.badge}
                                            </span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-500 font-medium">
                                            {g.desc}
                                        </p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2" />
                            </button>
                        );
                    })}
                </div>

                {/* Information Card */}
                <div className="bg-blue-50/80 rounded-2xl p-4 border border-blue-200 text-xs sm:text-sm text-blue-900 flex items-center gap-3">
                    <span className="text-xl">💡</span>
                    <p className="leading-relaxed">
                        A Toronyépítő játékban a matematikai feladatok eredményeit vizuális <strong>Dienes-tömbökből</strong> építed fel! Számolj fejben és emeld magasba a tornyokat!
                    </p>
                </div>
            </div>
        );
    }

    // ==========================================
    // STEP 2: OPERATION SELECTION SCREEN
    // ==========================================
    if (step === 'OPERATION') {
        return (
            <div className="flex flex-col gap-4 w-full px-1 sm:px-3 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-blue-100 shadow-sm w-full">
                    <Button
                        variant="ghost"
                        onClick={() => setStep('GRADE')}
                        size="sm"
                        className="hover:bg-slate-100 text-xs sm:text-sm font-bold h-9 px-3.5 rounded-xl"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1.5" />
                        Osztály módosítása
                    </Button>
                    <div className="text-center flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs sm:text-sm font-bold px-3 py-1">
                            🎓 {selectedGrade}. osztály
                        </Badge>
                        <span className="text-base sm:text-lg font-black text-slate-800">
                            Válassz műveletet!
                        </span>
                    </div>
                    <div className="w-28 hidden sm:block"></div>
                </div>

                {/* Operations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 w-full">
                    {availableOps.map(opKey => {
                        const meta = TOWER_OPERATION_DEFINITIONS[opKey];
                        return (
                            <button
                                key={opKey}
                                onClick={() => {
                                    setSelectedOperation(opKey);
                                    setStep('DIFFICULTY');
                                }}
                                className={cn(
                                    "group relative flex flex-col items-center text-center p-5 sm:p-6 rounded-3xl bg-white border-2 transition-all duration-200 hover:shadow-xl hover:-translate-y-1",
                                    meta.borderColor
                                )}
                            >
                                <div className={cn(
                                    "w-14 h-14 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-md mb-3 group-hover:scale-110 transition-transform bg-gradient-to-br",
                                    meta.color
                                )}>
                                    {meta.symbol}
                                </div>
                                <h3 className="text-base sm:text-lg font-black text-slate-800 mb-1 group-hover:text-blue-700 transition-colors">
                                    {meta.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                                    {meta.description}
                                </p>
                                <div className="mt-auto w-full py-2 px-3 rounded-xl bg-slate-50 font-bold text-xs sm:text-sm text-slate-700 flex items-center justify-center gap-1 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <span>Kiválasztás</span>
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    // ==========================================
    // STEP 3: DIFFICULTY SELECTION SCREEN
    // ==========================================
    if (step === 'DIFFICULTY') {
        const opMeta = selectedOperation ? TOWER_OPERATION_DEFINITIONS[selectedOperation] : null;

        return (
            <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto px-1 sm:px-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-blue-100 shadow-sm w-full">
                    <Button
                        variant="ghost"
                        onClick={() => setStep('OPERATION')}
                        size="sm"
                        className="hover:bg-slate-100 text-xs sm:text-sm font-bold h-9 px-3.5 rounded-xl"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1.5" />
                        Műveletváltás
                    </Button>
                    <div className="text-center flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 text-xs sm:text-sm font-bold">
                            🎓 {selectedGrade}. osztály
                        </Badge>
                        {opMeta && (
                            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-300 text-xs sm:text-sm font-bold">
                                {opMeta.symbol} {opMeta.title}
                            </Badge>
                        )}
                        <span className="text-sm sm:text-base font-black text-slate-800 hidden sm:inline">
                            Nehézség választása
                        </span>
                    </div>
                    <div className="w-28 hidden sm:block"></div>
                </div>

                {/* Difficulty Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full">
                    {(['EASY', 'MEDIUM', 'HARD'] as TowerDifficultyType[]).map(diffKey => {
                        const config = TOWER_DIFFICULTY_CONFIG[diffKey];

                        return (
                            <button
                                key={diffKey}
                                onClick={() => handleStartGame(diffKey)}
                                className={cn(
                                    "group relative flex flex-col p-5 sm:p-6 rounded-3xl bg-white border-2 text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
                                    config.color
                                )}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-black px-3 py-1 rounded-full bg-white shadow-sm border border-slate-200">
                                        {config.badge}
                                    </span>
                                    <Flame className="w-5 h-5 text-amber-500" />
                                </div>
                                <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1.5">
                                    {config.label}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                                    {config.desc}
                                </p>
                                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-blue-600">
                                    <span>Építés Indítása</span>
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    // ==========================================
    // STEP 4: PLAYING ARENA
    // ==========================================
    if (isComplete) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 max-w-md mx-auto p-6 bg-white rounded-3xl shadow-xl border-2 border-amber-200 text-center animate-in zoom-in-95 duration-300">
                <div className="p-6 bg-amber-100 rounded-full animate-bounce">
                    <Trophy className="w-20 h-20 text-amber-600" />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-slate-800 mb-1">Fantasztikus Építész!</h2>
                    <p className="text-sm text-slate-500">
                        Sikeresen teljesítetted a {selectedGrade}. osztályos toronyépítő kihívást!
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full bg-slate-50 p-3.5 rounded-2xl border">
                    <div>
                        <p className="text-xs text-slate-400 font-bold">Összpontszám</p>
                        <p className="text-2xl font-black text-blue-600">{score} pont</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-bold">Hibátlan széria</p>
                        <p className="text-2xl font-black text-emerald-600">{streak}x</p>
                    </div>
                </div>

                <div className="space-y-2 w-full pt-2">
                    <Button
                        onClick={resetGame}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-3 rounded-2xl shadow-lg"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Új játék ezzel a beállítással
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setStep('DIFFICULTY')}
                            className="text-xs font-bold rounded-xl h-9"
                        >
                            Nehézség váltás
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setStep('OPERATION')}
                            className="text-xs font-bold rounded-xl h-9"
                        >
                            Művelet váltás
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (!roundData) {
        return null;
    }

    const activeTower = activeTowerId === 1 ? roundData.tower1 : roundData.tower2;
    const isTower1Ready = roundData.tower1.current > 0;
    const isTower2Ready = roundData.tower2.current > 0;

    return (
        <div
            ref={containerRef}
            className={cn(
                "flex flex-col gap-3.5 w-full mx-auto animate-in fade-in duration-300",
                isFullscreen
                    ? "fixed inset-0 z-50 bg-slate-950/95 text-slate-100 p-3 sm:p-6 overflow-y-auto max-w-none backdrop-blur-xl"
                    : "max-w-5xl px-1 sm:px-3"
            )}
        >
            {/* Top Navigation & Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 rounded-2xl bg-white/95 text-slate-900 border border-blue-100 shadow-sm backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            if (isFullscreen) {
                                if (document.fullscreenElement) {
                                    document.exitFullscreen().catch(() => {});
                                }
                                setIsFullscreen(false);
                            }
                            setStep('OPERATION');
                        }}
                        size="sm"
                        className="text-xs font-bold h-8 px-2.5 hover:bg-slate-100 rounded-xl"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                        Menü
                    </Button>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 font-bold text-xs px-2.5 py-0.5">
                        🎓 {selectedGrade}. osztály
                    </Badge>
                    <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-300 font-bold text-xs px-2.5 py-0.5">
                        Kör: {round} / {maxRounds}
                    </Badge>
                </div>

                <div className="flex items-center gap-2">
                    <Badge className="bg-amber-500 text-white font-black text-xs px-3 py-1 shadow-sm">
                        🏆 {score} pont
                    </Badge>
                    {streak > 1 && (
                        <Badge className="bg-gradient-to-r from-orange-500 to-rose-500 text-white font-black text-xs px-2.5 py-1 animate-bounce">
                            🔥 {streak}x széria
                        </Badge>
                    )}
                    <Button
                        variant="ghost"
                        onClick={resetGame}
                        size="sm"
                        className="text-xs font-bold h-8 px-2.5 text-slate-600 hover:bg-slate-100 rounded-xl"
                    >
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        Újra
                    </Button>

                    {/* Fullscreen Toggle Button */}
                    <Button
                        variant="ghost"
                        onClick={toggleFullscreen}
                        size="sm"
                        className={cn(
                            "text-xs font-bold h-8 px-2.5 rounded-xl transition-all flex items-center gap-1.5 border",
                            isFullscreen
                                ? "bg-amber-500 text-white border-amber-600 hover:bg-amber-600 shadow-sm"
                                : "text-slate-700 border-slate-200 hover:bg-slate-100"
                        )}
                        title={isFullscreen ? "Kilépés a teljes képernyőből (Esc)" : "Teljes képernyős mód"}
                    >
                        {isFullscreen ? (
                            <>
                                <Minimize2 className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Kicsinyítés</span>
                            </>
                        ) : (
                            <>
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Teljes képernyő</span>
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Main Tower Construction Arena */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start w-full">
                {/* LEFT: Dual Physical Towers Visual Display (lg:col-span-7) */}
                <div className="lg:col-span-7 flex flex-col gap-3 w-full">
                    {/* Tower Switcher Tabs with Center Comparison Box */}
                    <div className="grid grid-cols-12 gap-2 items-stretch w-full">
                        {/* Tower 1 Tab (col-span-5) */}
                        <button
                            onClick={() => { setActiveTowerId(1); setFeedback(null); }}
                            className={cn(
                                "col-span-5 flex flex-col p-3 rounded-2xl border-2 text-left transition-all",
                                activeTowerId === 1
                                    ? "bg-blue-50/90 border-blue-500 shadow-md ring-2 ring-blue-300/50"
                                    : "bg-white border-slate-200 hover:border-blue-300"
                            )}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[11px] font-black uppercase text-blue-700 flex items-center gap-1">
                                    <span>🏰</span> 1. Torony
                                </span>
                                {roundData.tower1.current === roundData.tower1.target && (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                )}
                            </div>
                            <p className="text-sm sm:text-base font-black text-slate-900 truncate">
                                {roundData.tower1.question} = <span className="text-blue-600">?</span>
                            </p>
                            <div className="mt-1 flex items-center justify-between text-[11px] font-bold text-slate-500">
                                <span>Épített: <strong>{roundData.tower1.current}</strong></span>
                            </div>
                        </button>

                        {/* Center Comparison Cube (col-span-2) */}
                        <div
                            onClick={cycleComparison}
                            title="Kattints ide a relációs jel módosításához!"
                            className={cn(
                                "col-span-2 flex flex-col items-center justify-center h-full min-h-[76px] p-2 rounded-2xl border-2 cursor-pointer transition-all shadow-sm group select-none",
                                selectedComparison === null
                                    ? "bg-amber-50/80 border-dashed border-amber-300 text-amber-500 hover:bg-amber-100/70"
                                    : "bg-gradient-to-br from-amber-400 to-orange-500 border-amber-600 text-amber-950 shadow-md scale-105"
                            )}
                        >
                            <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500 group-hover:text-slate-800">
                                {selectedComparison === null ? 'Jel' : 'Reláció'}
                            </span>
                            <span className={cn(
                                "text-2xl sm:text-3xl font-black transition-transform group-hover:scale-110",
                                selectedComparison === null ? "text-amber-500 animate-pulse" : "text-white drop-shadow"
                            )}>
                                {selectedComparison || '?'}
                            </span>
                        </div>

                        {/* Tower 2 Tab (col-span-5) */}
                        <button
                            onClick={() => { setActiveTowerId(2); setFeedback(null); }}
                            className={cn(
                                "col-span-5 flex flex-col p-3 rounded-2xl border-2 text-left transition-all",
                                activeTowerId === 2
                                    ? "bg-purple-50/90 border-purple-500 shadow-md ring-2 ring-purple-300/50"
                                    : "bg-white border-slate-200 hover:border-purple-300"
                            )}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[11px] font-black uppercase text-purple-700 flex items-center gap-1">
                                    <span>🏰</span> 2. Torony
                                </span>
                                {roundData.tower2.current === roundData.tower2.target && (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                )}
                            </div>
                            <p className="text-sm sm:text-base font-black text-slate-900 truncate">
                                {roundData.tower2.question} = <span className="text-purple-600">?</span>
                            </p>
                            <div className="mt-1 flex items-center justify-between text-[11px] font-bold text-slate-500">
                                <span>Épített: <strong>{roundData.tower2.current}</strong></span>
                            </div>
                        </button>
                    </div>

                    {/* Quick Comparison Sign Selector Toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 p-2 px-3.5 rounded-2xl bg-white text-slate-900 border-2 border-amber-200/80 shadow-sm">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <span>⚖️</span> <strong>Válaszd ki a jelet a tornyok közé:</strong>
                        </span>
                        <div className="flex items-center gap-2">
                            {(['<', '=', '>'] as const).map(op => (
                                <button
                                    key={op}
                                    onClick={() => { setSelectedComparison(op); setFeedback(null); }}
                                    className={cn(
                                        "w-11 h-9 rounded-xl font-black text-lg border-2 transition-all flex items-center justify-center shadow-sm",
                                        selectedComparison === op
                                            ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white border-amber-600 shadow-md scale-105"
                                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50 hover:border-amber-300"
                                    )}
                                >
                                    {op}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* The Visual Physical Towers Ground */}
                    <div className={cn(
                        "grid grid-cols-12 gap-2 bg-gradient-to-b from-slate-900 to-slate-950 p-3 rounded-3xl border-4 border-slate-800 shadow-2xl relative transition-all duration-300",
                        isFullscreen ? "h-[48vh] sm:h-[58vh]" : "h-[380px] sm:h-[440px]"
                    )}>
                        {/* Column 1: Tower 1 (col-span-5) */}
                        <div
                            onClick={() => { setActiveTowerId(1); setFeedback(null); }}
                            className={cn(
                                "col-span-5 flex flex-col h-full rounded-2xl border-2 transition-all cursor-pointer relative bg-slate-950/60 overflow-hidden",
                                activeTowerId === 1
                                    ? "border-blue-400 ring-2 ring-blue-500/30"
                                    : "border-slate-800 opacity-80 hover:opacity-100"
                            )}
                        >
                            <div className="p-2 text-center border-b border-slate-800 bg-slate-900/80">
                                <span className="text-xs font-black text-blue-400">1. Torony</span>
                                <p className="text-xs text-white font-bold">{roundData.tower1.current}</p>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                {renderTowerBlocks(roundData.tower1.current)}
                            </div>
                            <div className="h-2 bg-slate-800 w-full rounded-b-xl"></div>
                        </div>

                        {/* Central Comparison Slot in Arena (col-span-2) */}
                        <div
                            onClick={cycleComparison}
                            title="Kattints ide a relációs jel módosításához!"
                            className="col-span-2 flex flex-col items-center justify-center gap-2 relative z-10 cursor-pointer select-none"
                        >
                            <div className="w-0.5 h-full bg-slate-800/80 absolute top-0 bottom-0 left-1/2 -translate-x-1/2 -z-10"></div>
                            <div className={cn(
                                "w-11 h-11 sm:w-14 sm:h-14 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-black shadow-xl transition-all hover:scale-110",
                                selectedComparison === null
                                    ? "bg-slate-900/90 border-dashed border-amber-400/70 text-amber-400 animate-pulse"
                                    : "bg-gradient-to-br from-amber-400 to-orange-500 border-amber-300 text-white ring-4 ring-amber-500/30"
                            )}>
                                {selectedComparison || '?'}
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-full border border-slate-800 text-center">
                                {selectedComparison === '<' ? 'Kisebb' : selectedComparison === '>' ? 'Nagyobb' : selectedComparison === '=' ? 'Egyenlő' : 'Válassz!'}
                            </span>
                        </div>

                        {/* Column 2: Tower 2 (col-span-5) */}
                        <div
                            onClick={() => { setActiveTowerId(2); setFeedback(null); }}
                            className={cn(
                                "col-span-5 flex flex-col h-full rounded-2xl border-2 transition-all cursor-pointer relative bg-slate-950/60 overflow-hidden",
                                activeTowerId === 2
                                    ? "border-purple-400 ring-2 ring-purple-500/30"
                                    : "border-slate-800 opacity-80 hover:opacity-100"
                            )}
                        >
                            <div className="p-2 text-center border-b border-slate-800 bg-slate-900/80">
                                <span className="text-xs font-black text-purple-400">2. Torony</span>
                                <p className="text-xs text-white font-bold">{roundData.tower2.current}</p>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                {renderTowerBlocks(roundData.tower2.current)}
                            </div>
                            <div className="h-2 bg-slate-800 w-full rounded-b-xl"></div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Active Tower Control Panel & Building Blocks (lg:col-span-5) */}
                <div className="lg:col-span-5 flex flex-col gap-3.5 w-full">
                    {/* Active Question Banner */}
                    <Card className="p-4 rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/80 shadow-sm text-center">
                        <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                            🎯 {activeTowerId}. Torony Feladata:
                        </div>
                        <div className="py-2.5 px-3 bg-white rounded-2xl border border-blue-100 shadow-inner">
                            <p className="text-2xl sm:text-3xl font-black text-slate-900">
                                {activeTower.question} = <span className="text-blue-600">?</span>
                            </p>
                        </div>
                        <div className="mt-2 flex items-center justify-between px-2 text-xs font-bold text-slate-600">
                            <span>Jelenlegi magasság:</span>
                            <span className="text-base font-black text-blue-600">{activeTower.current}</span>
                        </div>
                    </Card>

                    {/* Dienes Block Building Buttons */}
                    <Card className="p-4 rounded-3xl border shadow-sm bg-white space-y-3">
                        <div className="flex items-center justify-between border-b pb-2">
                            <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                                <span>🧱</span> Építőelemek hozzáadása
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearActiveTower}
                                className="text-[11px] font-bold text-slate-500 hover:text-rose-600 h-7 px-2"
                            >
                                Torony nullázása
                            </Button>
                        </div>

                        {/* Block Action Buttons Grid */}
                        <div className="grid grid-cols-2 gap-2.5">
                            {roundData.availableBlocks.map(blockVal => {
                                const conf = BLOCK_CONFIGS[blockVal];
                                if (!conf) return null;

                                return (
                                    <div key={blockVal} className="flex flex-col gap-1">
                                        {/* Add block button */}
                                        <Button
                                            onClick={() => updateTowerHeight(blockVal)}
                                            className={cn(
                                                "h-12 rounded-2xl font-black text-sm shadow-md transition-transform active:scale-95 flex items-center justify-between px-3.5 text-white",
                                                conf.bg,
                                                conf.border
                                            )}
                                        >
                                            <span className="flex items-center gap-1">
                                                <Plus className="w-4 h-4" />
                                                {blockVal}
                                            </span>
                                            <span className="text-[10px] opacity-80 font-bold">{conf.name}</span>
                                        </Button>

                                        {/* Subtract block button */}
                                        <Button
                                            variant="outline"
                                            onClick={() => updateTowerHeight(-blockVal)}
                                            disabled={activeTower.current < blockVal}
                                            className="h-7 rounded-xl text-[11px] font-bold border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                                        >
                                            <Minus className="w-3 h-3 mr-1" />
                                            −{blockVal}
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Feedback and Check Button */}
                    <div className="space-y-2">
                        {feedback === 'correct' && (
                            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center font-bold text-sm flex items-center justify-center gap-2 animate-in zoom-in-95">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                <span>Helyes! Mindkét torony és a relációs jel ({selectedComparison}) is hibátlan! 🎉</span>
                            </div>
                        )}

                        {feedback === 'comparison-wrong' && (
                            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-center font-bold text-xs sm:text-sm flex items-center justify-center gap-2 animate-in shake">
                                <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                                <span>A tornyok magassága jó, de a relációs jel (&lt;, =, &gt;) nem stimmel!</span>
                            </div>
                        )}

                        {feedback === 'missing-comparison' && (
                            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-center font-bold text-xs sm:text-sm flex items-center justify-center gap-2 animate-in shake">
                                <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                                <span>Kérlek válaszd ki a relációs jelet (&lt;, =, &gt;) a két torony közé!</span>
                            </div>
                        )}

                        {feedback === 'wrong' && (
                            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-center font-bold text-xs sm:text-sm flex items-center justify-center gap-2 animate-in shake">
                                <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                                <span>Még nem pontos! Ellenőrizd a tornyok magasságát!</span>
                            </div>
                        )}

                        <Button
                            onClick={handleCheck}
                            disabled={!isTower1Ready || !isTower2Ready || feedback === 'correct'}
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-base sm:text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            <Check className="w-6 h-6 mr-2" />
                            Tornyok Ellenőrzése!
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
