import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import {
    CheckCircle2,
    XCircle,
    ArrowRight,
    ArrowLeft,
    RotateCcw,
    Trophy,
    HelpCircle,
    Sparkles,
    Zap,
    ChevronRight,
    Star,
    Medal,
    Crown,
    Percent
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type Difficulty = 'easy' | 'medium' | 'hard';
type QuizMode = 'calculate-value' | 'calculate-rate' | 'calculate-base';

interface PercentProblem {
    id: string;
    base: number;      // 100%
    rate: number;      // %
    value: number;     // result
    mode: QuizMode;
    difficulty: Difficulty;
}

function generateProblem(mode: QuizMode, difficulty: Difficulty): PercentProblem {
    const id = Math.random().toString(36).substring(2, 9);
    let base = 0, rate = 0, value = 0;

    if (mode === 'calculate-value') {
        if (difficulty === 'easy') {
            base = [10, 20, 40, 50, 100, 200, 500][Math.floor(Math.random() * 7)];
            rate = [10, 20, 25, 50][Math.floor(Math.random() * 4)];
        } else if (difficulty === 'medium') {
            base = (Math.floor(Math.random() * 18) + 2) * 5; // 10-100 step 5
            rate = (Math.floor(Math.random() * 19) + 1) * 5; // 5-95 step 5
        } else {
            base = Math.floor(Math.random() * 900) + 100;
            rate = Math.floor(Math.random() * 99) + 1;
        }
        value = (base * rate) / 100;
        // Ensure value is "nice" for easy/medium
        if (difficulty !== 'hard') {
            value = Math.round(value);
            base = (value * 100) / rate;
        }
    } else if (mode === 'calculate-rate') {
        if (difficulty === 'easy') {
            base = [20, 40, 50, 100, 200][Math.floor(Math.random() * 5)];
            rate = [5, 10, 20, 25, 50][Math.floor(Math.random() * 5)];
        } else if (difficulty === 'medium') {
            base = (Math.floor(Math.random() * 20) + 1) * 10;
            rate = (Math.floor(Math.random() * 15) + 1) * 5;
        } else {
            base = Math.floor(Math.random() * 400) + 50;
            rate = Math.floor(Math.random() * 80) + 5;
        }
        value = (base * rate) / 100;
        // Adjust for nice numbers
        if (difficulty !== 'hard') {
            value = Math.round(value);
            rate = (value / base) * 100;
            // If rate isn't nice, retry or force it
            if (rate % 1 !== 0) {
                // simplest fix: make base 100
                base = 100;
                rate = Math.floor(Math.random() * 90) + 5;
                value = rate;
            }
        }
    } else { // calculate-base
        if (difficulty === 'easy') {
            rate = [10, 20, 25, 50][Math.floor(Math.random() * 4)];
            base = [50, 100, 200, 500][Math.floor(Math.random() * 4)];
        } else if (difficulty === 'medium') {
            rate = (Math.floor(Math.random() * 10) + 1) * 5; // 5, 10... 50
            base = (Math.floor(Math.random() * 40) + 1) * 10;
        } else {
            rate = Math.floor(Math.random() * 80) + 5;
            base = Math.floor(Math.random() * 500) + 100;
        }
        value = (base * rate) / 100;
        if (difficulty !== 'hard') {
            value = Math.round(value);
            base = (value * 100) / rate;
            if (base % 1 !== 0) {
                // Adjust value to make base whole
                base = Math.round(base);
                value = (base * rate) / 100;
            }
        }
    }

    return { id, base: Number(base.toFixed(1)), rate: Number(rate.toFixed(1)), value: Number(value.toFixed(1)), mode, difficulty };
}

interface PercentagesQuizProps {
    onBack: () => void;
    initialMode?: QuizMode | null;
}

export function PercentagesQuiz({ onBack, initialMode = null }: PercentagesQuizProps) {
    const [mode, setMode] = useState<QuizMode | null>(initialMode);
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [problems, setProblems] = useState<PercentProblem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [xpEarned, setXpEarned] = useState(0);

    const TOTAL_QUESTIONS = 10;
    const XP_PER_CORRECT = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20;

    const startQuiz = useCallback(() => {
        if (!mode || !difficulty) return;
        const newProblems = Array.from({ length: TOTAL_QUESTIONS }, () => generateProblem(mode, difficulty));
        setProblems(newProblems);
        setCurrentIndex(0);
        setUserAnswer('');
        setShowFeedback(false);
        setCorrectCount(0);
        setQuizComplete(false);
        setXpEarned(0);
    }, [mode, difficulty]);

    useEffect(() => {
        if (mode && difficulty) {
            startQuiz();
        }
    }, [mode, difficulty, startQuiz]);

    const checkAnswer = () => {
        if (showFeedback) return;

        const val = parseFloat(userAnswer.replace(',', '.'));
        if (isNaN(val)) {
            toast.error('Kérlek adj meg egy érvényes számot!');
            return;
        }

        const current = problems[currentIndex];
        let correct = false;

        if (mode === 'calculate-value') correct = Math.abs(val - current.value) < 0.1;
        else if (mode === 'calculate-rate') correct = Math.abs(val - current.rate) < 0.1;
        else if (mode === 'calculate-base') correct = Math.abs(val - current.base) < 0.1;

        if (correct) {
            setCorrectCount(prev => prev + 1);
            setXpEarned(prev => prev + XP_PER_CORRECT);
        }

        setShowFeedback(true);
    };

    const nextQuestion = () => {
        if (currentIndex < TOTAL_QUESTIONS - 1) {
            setCurrentIndex(prev => prev + 1);
            setUserAnswer('');
            setShowFeedback(false);
        } else {
            setQuizComplete(true);
        }
    };

    if (!mode) {
        return (
            <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between px-2">
                    <Button variant="ghost" onClick={onBack} size="sm" className="hover:bg-slate-100 text-xs">
                        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                        Vissza
                    </Button>
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Válassz feladattípust!</h2>
                    <div className="w-16"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <TypeCard
                        title="Százalékérték"
                        description="Mennyi az alap adott százaléka?"
                        example="50-nek a 20%-a mennyi?"
                        icon={<Percent className="w-10 h-10 text-rose-500" />}
                        onClick={() => setMode('calculate-value')}
                    />
                    <TypeCard
                        title="Százalékláb"
                        description="A rész az egésznek hány százaléka?"
                        example="40-nek a 20 hány százaléka?"
                        icon={<Percent className="w-10 h-10 text-emerald-500" />}
                        onClick={() => setMode('calculate-rate')}
                    />
                    <TypeCard
                        title="Alap kiszámítása"
                        description="Mennyi a 100%, ha ismerjük egy részét?"
                        example="A 30 az minek az 50%-a?"
                        icon={<Percent className="w-10 h-10 text-blue-500" />}
                        onClick={() => setMode('calculate-base')}
                    />
                </div>
            </div>
        );
    }

    if (!difficulty) {
        return (
            <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between px-2">
                    <Button variant="ghost" onClick={() => initialMode ? onBack() : setMode(null)} size="sm" className="hover:bg-slate-100 text-xs">
                        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                        {initialMode ? 'Vissza' : 'Típusválasztás'}
                    </Button>
                    <h2 className="text-2xl font-bold text-slate-800">Válassz nehézségi szintet!</h2>
                    <div className="w-16"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <DifficultyCard
                        level="easy"
                        title="Kezdő"
                        desc="Kerek számok, egyszerű arányok"
                        icon={<Star className="w-10 h-10" />}
                        color="emerald"
                        onClick={() => setDifficulty('easy')}
                    />
                    <DifficultyCard
                        level="medium"
                        title="Haladó"
                        desc="Változatosabb számok"
                        icon={<Medal className="w-10 h-10" />}
                        color="amber"
                        onClick={() => setDifficulty('medium')}
                    />
                    <DifficultyCard
                        level="hard"
                        title="Mester"
                        desc="Bármilyen szám, tizedesek is"
                        icon={<Crown className="w-10 h-10" />}
                        color="rose"
                        onClick={() => setDifficulty('hard')}
                    />
                </div>
            </div>
        );
    }

    if (problems.length === 0) return null;

    if (quizComplete) {
        const percentage = Math.round((correctCount / TOTAL_QUESTIONS) * 100);
        return (
            <div className="max-w-md mx-auto animate-in fade-in zoom-in duration-500">
                <Card className="border-2 border-rose-100 shadow-xl overflow-hidden rounded-3xl">
                    <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-8 text-center text-white">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Trophy className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-black mb-1">Szép munka!</h2>
                        <p className="text-rose-100 opacity-90 text-sm">Sikeresen teljesítetted a kvízt</p>
                    </div>
                    <CardContent className="p-8 space-y-8 bg-white">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pontosság</span>
                                <span className="text-3xl font-black text-slate-800">{percentage}%</span>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Helyes válasz</span>
                                <span className="text-3xl font-black text-slate-800">{correctCount}/{TOTAL_QUESTIONS}</span>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <XPBadge xp={xpEarned} />
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => setDifficulty(null)} className="flex-1 rounded-2xl h-12 font-bold text-slate-600">
                                Szintválasztás
                            </Button>
                            <Button
                                onClick={startQuiz}
                                className="flex-1 h-12 text-lg font-bold bg-gradient-to-r from-rose-500 to-pink-600 shadow-lg shadow-rose-500/20 rounded-2xl text-white hover:opacity-90 active:scale-95 transition-all"
                            >
                                Új játék
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const current = problems[currentIndex];
    const isCorrect = showFeedback && (
        mode === 'calculate-value' ? Math.abs(parseFloat(userAnswer.replace(',', '.')) - current.value) < 0.1 :
            mode === 'calculate-rate' ? Math.abs(parseFloat(userAnswer.replace(',', '.')) - current.rate) < 0.1 :
                Math.abs(parseFloat(userAnswer.replace(',', '.')) - current.base) < 0.1
    );

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-rose-100 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
                <div className="flex gap-4 items-center flex-1 pr-8">
                    <Button variant="ghost" size="icon" onClick={() => setDifficulty(null)} className="shrink-0 hover:bg-rose-50 text-rose-600">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="text-[10px] font-black text-slate-400 whitespace-nowrap uppercase tracking-widest">
                        {currentIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                    <div className="flex-1">
                        <ProgressBar
                            current={currentIndex + 1}
                            total={TOTAL_QUESTIONS}
                            variant="math"
                            size="md"
                        />
                    </div>
                </div>
                <XPBadge xp={xpEarned} />
            </div>

            <Card className="border-2 border-slate-100 shadow-xl rounded-3xl overflow-hidden bg-white">
                <CardContent className="p-10 text-center space-y-10">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            {mode === 'calculate-value' && 'Százalékérték kiszámítása'}
                            {mode === 'calculate-rate' && 'Százalékláb kiszámítása'}
                            {mode === 'calculate-base' && 'Alap kiszámítása'}
                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                            {difficulty === 'easy' && 'Kezdő'}
                            {difficulty === 'medium' && 'Haladó'}
                            {difficulty === 'hard' && 'Mester'}
                        </div>

                        <div className="py-6">
                            {mode === 'calculate-value' && (
                                <div className="text-3xl sm:text-4xl font-black text-slate-800 leading-relaxed">
                                    Mennyi <span className="text-rose-500">{current.base}</span>-nak a <span className="text-rose-500">{current.rate}%</span>-a?
                                </div>
                            )}
                            {mode === 'calculate-rate' && (
                                <div className="text-3xl sm:text-4xl font-black text-slate-800 leading-relaxed">
                                    <span className="text-emerald-500">{current.base}</span>-nak a <span className="text-emerald-500">{current.value}</span> hány százaléka?
                                </div>
                            )}
                            {mode === 'calculate-base' && (
                                <div className="text-3xl sm:text-4xl font-black text-slate-800 leading-relaxed">
                                    Minek a <span className="text-blue-500">{current.rate}%</span>-a a <span className="text-blue-500">{current.value}</span>?
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center items-center gap-4">
                            <div className="relative group">
                                <Input
                                    type="text"
                                    inputMode="decimal"
                                    value={userAnswer}
                                    onChange={e => setUserAnswer(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && checkAnswer()}
                                    disabled={showFeedback}
                                    className="w-32 h-16 text-center text-3xl font-black border-4 focus:ring-0 focus:border-rose-500 rounded-2xl transition-all"
                                    placeholder="..."
                                    autoFocus
                                />
                                {mode === 'calculate-rate' && (
                                    <span className="absolute -right-8 top-1/2 -translate-y-1/2 text-3xl font-black text-slate-300">%</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {!showFeedback ? (
                        <Button
                            onClick={checkAnswer}
                            disabled={!userAnswer}
                            className="w-full max-w-sm h-16 text-xl font-black bg-slate-900 text-white shadow-lg shadow-slate-200 rounded-2xl hover:bg-slate-800 active:scale-[0.98] transition-all"
                        >
                            Ellenőrzés
                        </Button>
                    ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className={cn(
                                "p-6 rounded-3xl border-4 flex flex-col items-center gap-3",
                                isCorrect ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-rose-50 border-rose-100 text-rose-800"
                            )}>
                                <div className="flex items-center gap-3">
                                    {isCorrect ? (
                                        <>
                                            <div className="p-2 bg-emerald-500 rounded-full">
                                                <CheckCircle2 className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-2xl font-black uppercase tracking-tight">Helyes!</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="p-2 bg-rose-500 rounded-full">
                                                <XCircle className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-2xl font-black uppercase tracking-tight">Hoppá!</span>
                                        </>
                                    )}
                                </div>
                                {!isCorrect && (
                                    <p className="font-bold text-lg leading-tight">
                                        A helyes válasz: <span className="px-2 py-1 bg-white rounded-lg shadow-sm">
                                            {mode === 'calculate-value' ? current.value :
                                                mode === 'calculate-rate' ? `${current.rate}%` :
                                                    current.base}
                                        </span>
                                    </p>
                                )}
                            </div>
                            <Button
                                onClick={nextQuestion}
                                className="w-full h-16 text-xl font-black bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-xl shadow-rose-200 rounded-2xl group active:scale-[0.98] transition-all"
                            >
                                {currentIndex < TOTAL_QUESTIONS - 1 ? (
                                    <>
                                        Következő feladat
                                        <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </>
                                ) : (
                                    'Eredmények megtekintése'
                                )}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

function TypeCard({ title, description, example, icon, onClick }: { title: string, description: string, example: string, icon: React.ReactNode, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center p-8 bg-white border-2 border-slate-100 rounded-3xl hover:border-slate-300 hover:shadow-xl hover:scale-[1.03] transition-all group text-center"
        >
            <div className="p-5 bg-slate-50 rounded-2xl mb-6 group-hover:rotate-6 transition-transform shadow-inner">
                {icon}
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">{title}</h3>
            <p className="text-sm font-medium text-slate-500 mb-4">{description}</p>
            <div className="bg-slate-50 px-4 py-2 rounded-xl text-xs font-mono text-slate-400 italic">
                "{example}"
            </div>
        </button>
    );
}

function DifficultyCard({ level, title, desc, icon, color, onClick }: { level: Difficulty, title: string, desc: string, icon: React.ReactNode, color: string, onClick: () => void }) {
    const colors = {
        emerald: "border-emerald-100 hover:border-emerald-400 bg-emerald-50/30 text-emerald-600",
        amber: "border-amber-100 hover:border-amber-400 bg-amber-50/30 text-amber-600",
        rose: "border-rose-100 hover:border-rose-400 bg-rose-50/30 text-rose-600"
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center p-8 bg-white border-2 rounded-3xl hover:shadow-xl hover:scale-[1.03] transition-all group",
                colors[color as keyof typeof colors]
            )}
        >
            <div className={cn("p-5 rounded-2xl mb-6 group-hover:rotate-12 transition-transform shadow-lg",
                color === 'emerald' ? 'bg-emerald-100' : color === 'amber' ? 'bg-amber-100' : 'bg-rose-100'
            )}>
                {icon}
            </div>
            <h3 className="text-2xl font-black mb-1 uppercase tracking-tight">{title}</h3>
            <p className="text-sm font-medium text-slate-500 text-center">{desc}</p>
        </button>
    );
}
