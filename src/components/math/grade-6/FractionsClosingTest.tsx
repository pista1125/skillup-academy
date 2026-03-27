import { useState, useEffect, useCallback, useMemo } from 'react';
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
    Star,
    Medal,
    Crown,
    ChevronRight,
    Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Question, QuestionType, Fraction, CLOSING_TEST_DATA } from "@/components/math/grade-6/FractionsClosingTestData";

interface FractionsClosingTestProps {
    onBack: () => void;
}

export function FractionsClosingTest({ onBack }: FractionsClosingTestProps) {
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [xpEarned, setXpEarned] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [userAnswer, setUserAnswer] = useState<any>(null);
    const [isCorrect, setIsCorrect] = useState(false);

    const questions = useMemo(() => {
        if (!difficulty) return [];
        // Filter and shuffle 30 questions for the selected level
        return CLOSING_TEST_DATA
            .filter(q => q.difficulty === difficulty)
            .sort(() => Math.random() - 0.5)
            .slice(0, 30);
    }, [difficulty]);

    const currentQuestion = questions[currentIndex];

    const handleAnswer = (answer: any, correct: boolean) => {
        if (showFeedback) return;
        setUserAnswer(answer);
        setIsCorrect(correct);
        setShowFeedback(true);
        if (correct) {
            setCorrectCount(prev => prev + 1);
            setXpEarned(prev => prev + currentQuestion.points);
        }
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setShowFeedback(false);
            setUserAnswer(null);
            setIsCorrect(false);
        } else {
            setQuizComplete(true);
        }
    };

    if (!difficulty) {
        return (
            <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between px-2">
                    <Button variant="ghost" onClick={onBack} size="sm" className="hover:bg-slate-100 text-xs text-slate-500">
                        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                        Vissza a modulhoz
                    </Button>
                    <h2 className="text-3xl font-black text-slate-800 text-center flex-1">Záró Összefoglaló Teszt</h2>
                    <div className="w-24"></div>
                </div>

                <div className="text-center space-y-2 mb-4">
                    <p className="text-slate-500 font-medium max-w-lg mx-auto">
                        Ez a teszt összefoglalja az összes eddigi tudásodat a törtekről.
                        30 változatos feladat vár rád!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DifficultyCard
                        level="easy"
                        title="Alapszint"
                        description="Egyszerű műveletek, ábrák és alapfogalmak"
                        icon={<Star className="w-12 h-12" />}
                        color="emerald"
                        onClick={() => setDifficulty('easy')}
                    />
                    <DifficultyCard
                        level="medium"
                        title="Középszint"
                        description="Bővítés, tizedes törtek és szöveges feladatok"
                        icon={<Medal className="w-12 h-12" />}
                        color="amber"
                        onClick={() => setDifficulty('medium')}
                    />
                    <DifficultyCard
                        level="hard"
                        title="Emelt szint"
                        description="Összetett műveletek és nehezebb gondolkodtatók"
                        icon={<Crown className="w-12 h-12" />}
                        color="rose"
                        onClick={() => setDifficulty('hard')}
                    />
                </div>
            </div>
        );
    }

    if (quizComplete) {
        const percentage = Math.round((correctCount / questions.length) * 100);
        return <QuizResult
            percentage={percentage}
            correctCount={correctCount}
            total={questions.length}
            xp={xpEarned}
            onRestart={() => setDifficulty(null)}
        />;
    }

    return (
        <div className="max-w-3xl mx-auto space-y-3">
            {/* Header / Progress */}
            <div className="flex items-center justify-between bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-slate-100 shadow-sm z-10 transition-all">
                <div className="flex gap-4 items-center flex-1 pr-8">
                    <Button variant="ghost" size="icon" onClick={() => setDifficulty(null)} className="shrink-0 hover:bg-slate-50 rounded-xl">
                        <ArrowLeft className="w-5 h-5 text-slate-400" />
                    </Button>
                    <div className="hidden sm:block">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                            Kérdés {currentIndex + 1} / {questions.length}
                        </div>
                        <div className="w-32">
                            <ProgressBar current={currentIndex + 1} total={questions.length} variant="math" size="sm" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end mr-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{currentIndex + 1}. FELADAT</span>
                        <span className="text-sm font-bold text-slate-700 truncate max-w-[150px]">{currentQuestion.question.slice(0, 20)}...</span>
                    </div>
                    <XPBadge xp={xpEarned} />
                </div>
            </div>

            {/* Question Area */}
            <Card className="border-2 border-slate-100 shadow-2xl rounded-[2.5rem] overflow-hidden bg-white animate-in fade-in slide-in-from-bottom-8 duration-500">
                <CardContent className="p-4 sm:p-6 space-y-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "flex items-center justify-center w-10 h-10 rounded-2xl text-white shadow-lg",
                                difficulty === 'easy' ? "bg-emerald-500" : difficulty === 'medium' ? "bg-amber-500" : "bg-rose-500"
                            )}>
                                <Target className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-black text-slate-800 leading-tight">
                                {currentQuestion.question}
                            </h3>
                        </div>

                        {/* Rendering different question types */}
                        <div className="min-h-[150px] flex items-center justify-center">
                            {currentQuestion.type === 'multiple-choice' && (
                                <MultipleChoice
                                    options={currentQuestion.options || []}
                                    correctOption={currentQuestion.correctOption!}
                                    showFeedback={showFeedback}
                                    onAnswer={(opt, isCorrect) => handleAnswer(opt, isCorrect)}
                                />
                            )}
                            {currentQuestion.type === 'written-calculation' && (
                                <WrittenCalculation
                                    correctAnswer={currentQuestion.correctAnswer}
                                    showFeedback={showFeedback}
                                    onAnswer={(ans, isCorrect) => handleAnswer(ans, isCorrect)}
                                />
                            )}
                            {currentQuestion.type === 'number-line' && (
                                <NumberLineQuestion
                                    target={currentQuestion.targetValue!}
                                    showFeedback={showFeedback}
                                    onAnswer={(val, isCorrect) => handleAnswer(val, isCorrect)}
                                />
                            )}
                            {currentQuestion.type === 'matching' && (
                                <MatchingQuestion
                                    pairs={currentQuestion.pairs || []}
                                    showFeedback={showFeedback}
                                    onAnswer={(ans, isCorrect) => handleAnswer(ans, isCorrect)}
                                />
                            )}
                            {currentQuestion.type === 'word-problem' && (
                                <WordProblem
                                    options={currentQuestion.options}
                                    correctOption={currentQuestion.correctOption}
                                    correctAnswer={currentQuestion.correctAnswer}
                                    hint={currentQuestion.hint}
                                    showFeedback={showFeedback}
                                    onAnswer={(ans, isCorrect) => handleAnswer(ans, isCorrect)}
                                />
                            )}
                        </div>
                    </div>

                    {showFeedback && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300 border-t pt-4">
                            <div className={cn(
                                "p-4 rounded-3xl border-2 flex flex-col items-center gap-2",
                                isCorrect ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-rose-50 border-rose-100 text-rose-800"
                            )}>
                                <div className="flex items-center gap-3">
                                    {isCorrect ? (
                                        <><CheckCircle2 className="w-6 h-6 text-emerald-600" /><span className="text-xl font-black uppercase">Szuper!</span></>
                                    ) : (
                                        <><XCircle className="w-6 h-6 text-rose-600" /><span className="text-xl font-black uppercase">Javítsd legközelebb!</span></>
                                    )}
                                </div>
                                {!isCorrect && currentQuestion.hint && (
                                    <p className="text-center font-bold opacity-80 mt-1 max-w-sm text-sm">
                                        Segítség: {currentQuestion.hint}
                                    </p>
                                )}
                            </div>
                            <Button
                                onClick={nextQuestion}
                                className="w-full h-12 text-xl font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-xl rounded-[1.5rem] group"
                            >
                                {currentIndex < questions.length - 1 ? (
                                    <>Következő feladat <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" /></>
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

// --- Sub-components (Drafts) ---

function MultipleChoice({ options, correctOption, onAnswer, showFeedback }: any) {
    const [selected, setSelected] = useState<number | null>(null);

    const handleClick = (idx: number) => {
        if (showFeedback) return;
        setSelected(idx);
        onAnswer(idx, idx === correctOption);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {options.map((opt: string, i: number) => (
                <button
                    key={i}
                    onClick={() => handleClick(i)}
                    disabled={showFeedback}
                    className={cn(
                        "p-6 text-left rounded-2xl border-2 font-bold transition-all text-lg",
                        selected === i
                            ? (i === correctOption ? "bg-emerald-50 border-emerald-500 text-emerald-900 ring-4 ring-emerald-50" : "bg-rose-50 border-rose-500 text-rose-900 ring-4 ring-rose-50")
                            : (showFeedback && i === correctOption ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-white border-slate-100 hover:border-orange-200 hover:bg-orange-50/30")
                    )}
                >
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center border-2 text-sm",
                            selected === i ? "bg-white border-current" : "bg-slate-50 border-slate-200"
                        )}>
                            {String.fromCharCode(65 + i)}
                        </div>
                        {opt}
                    </div>
                </button>
            ))}
        </div>
    );
}

function WrittenCalculation({ correctAnswer, onAnswer, showFeedback }: any) {
    const [num, setNum] = useState('');
    const [den, setDen] = useState('');
    const [val, setVal] = useState('');

    const isFraction = typeof correctAnswer === 'object' && 'num' in correctAnswer;

    const handleSubmit = () => {
        if (isFraction) {
            const n = parseInt(num);
            const d = parseInt(den);
            const isCorrect = n * (correctAnswer as Fraction).den === d * (correctAnswer as Fraction).num;
            onAnswer({ num: n, den: d }, isCorrect);
        } else {
            const v = parseFloat(val.replace(',', '.'));
            const isCorrect = Math.abs(v - (correctAnswer as number)) < 0.001;
            onAnswer(v, isCorrect);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <div className="flex items-center gap-4 text-4xl font-black">
                {isFraction ? (
                    <div className="flex flex-col items-center gap-2">
                        <Input
                            type="number"
                            value={num}
                            onChange={e => setNum(e.target.value)}
                            disabled={showFeedback}
                            className="w-20 h-20 text-center text-3xl font-black rounded-2xl border-2"
                        />
                        <div className="w-20 h-1.5 bg-slate-800 rounded-full" />
                        <Input
                            type="number"
                            value={den}
                            onChange={e => setDen(e.target.value)}
                            disabled={showFeedback}
                            className="w-20 h-20 text-center text-3xl font-black rounded-2xl border-2"
                        />
                    </div>
                ) : (
                    <Input
                        type="text"
                        value={val}
                        onChange={e => setVal(e.target.value)}
                        disabled={showFeedback}
                        placeholder="Szám vagy tizedes"
                        className="w-48 h-20 text-center text-3xl font-black rounded-2xl border-2"
                    />
                )}
            </div>
            {!showFeedback && (
                <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600 rounded-2xl h-14 w-48 font-bold text-lg">
                    Beküldés
                </Button>
            )}
        </div>
    );
}

function NumberLineQuestion({ target, onAnswer, showFeedback }: any) {
    const [pos, setPos] = useState(0); // 0 to 1 scaling, simple slider for interactive feel

    // We'll use a simpler version of the NumberLineTool logic
    return (
        <div className="w-full space-y-12 py-10">
            <div className="relative h-20 w-full group">
                {/* Axis */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 rounded-full" />

                {/* Ticks */}
                {[0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(t => (
                    <div key={t} className="absolute top-1/2 h-4 w-0.5 bg-slate-300 -translate-y-1/2" style={{ left: `${(t / 2) * 100}%` }}>
                        <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">{t}</span>
                    </div>
                ))}

                {/* Slider Input */}
                <input
                    type="range"
                    min="0" max="2" step="0.01"
                    value={pos}
                    onChange={e => setPos(parseFloat(e.target.value))}
                    disabled={showFeedback}
                    className="absolute top-1/2 left-0 w-full h-10 -translate-y-1/2 appearance-none bg-transparent cursor-pointer z-20"
                />

                {/* Thumb/Pointer */}
                <div
                    className={cn(
                        "absolute top-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white shadow-xl transition-transform",
                        showFeedback ? (Math.abs(pos - target) < 0.1 ? "bg-emerald-500" : "bg-rose-500") : "bg-orange-500 group-hover:scale-125"
                    )}
                    style={{ left: `${(pos / 2) * 100}%` }}
                />

                {/* Target Marker (if feedback) */}
                {showFeedback && Math.abs(pos - target) >= 0.1 && (
                    <div
                        className="absolute top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/50"
                        style={{ left: `${(target / 2) * 100}%` }}
                    />
                )}
            </div>

            {!showFeedback && (
                <div className="flex flex-col items-center gap-4">
                    <div className="text-xl font-bold text-orange-600">Kiválasztott érték: {pos.toFixed(2)}</div>
                    <Button onClick={() => onAnswer(pos, Math.abs(pos - target) < 0.1)} className="bg-orange-500 hover:bg-orange-600 rounded-2xl h-14 w-44 font-bold">
                        Itt van!
                    </Button>
                </div>
            )}
        </div>
    );
}

function MatchingQuestion({ pairs, onAnswer, showFeedback }: any) {
    const [matches, setMatches] = useState<Record<string, string>>({});
    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

    const handleLeftClick = (id: string) => {
        if (showFeedback) return;
        setSelectedLeft(id);
    };

    const handleRightClick = (text: string) => {
        if (!selectedLeft || showFeedback) return;
        setMatches(prev => ({ ...prev, [selectedLeft]: text }));
        setSelectedLeft(null);
    };

    const isAllCorrect = () => {
        return pairs.every((p: any) => matches[p.id] === p.right);
    };

    return (
        <div className="w-full space-y-8">
            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                    {pairs.map((p: any) => (
                        <button
                            key={p.id}
                            onClick={() => handleLeftClick(p.id)}
                            className={cn(
                                "w-full p-4 rounded-xl border-2 font-black transition-all",
                                selectedLeft === p.id ? "border-orange-500 bg-orange-50" : (matches[p.id] ? "border-emerald-100 bg-emerald-50/30 text-emerald-800" : "border-slate-100 bg-white")
                            )}
                        >
                            {p.left}
                        </button>
                    ))}
                </div>
                <div className="space-y-3">
                    {pairs.map((p: any, i: number) => (
                        <button
                            key={i}
                            onClick={() => handleRightClick(p.right)}
                            className={cn(
                                "w-full p-4 rounded-xl border-2 font-bold transition-all",
                                Object.values(matches).includes(p.right) ? "border-emerald-100 bg-emerald-50/30 text-emerald-800" : "border-slate-100 bg-white"
                            )}
                        >
                            {p.right}
                        </button>
                    ))}
                </div>
            </div>
            {!showFeedback && Object.keys(matches).length === pairs.length && (
                <div className="flex justify-center">
                    <Button onClick={() => onAnswer(matches, isAllCorrect())} className="bg-orange-500 hover:bg-orange-600 rounded-2xl h-12 px-12 font-bold">
                        Ellenőrzés
                    </Button>
                </div>
            )}
        </div>
    );
}

function WordProblem({ options, correctOption, correctAnswer, showFeedback, onAnswer }: any) {
    if (options) {
        return <MultipleChoice options={options} correctOption={correctOption} onAnswer={onAnswer} showFeedback={showFeedback} />;
    }
    return <WrittenCalculation correctAnswer={correctAnswer} onAnswer={onAnswer} showFeedback={showFeedback} />;
}

// Result Component
function QuizResult({ percentage, correctCount, total, xp, onRestart }: any) {
    return (
        <div className="max-w-md mx-auto animate-in fade-in zoom-in duration-500">
            <Card className="border-none shadow-2xl overflow-hidden rounded-[2.5rem] bg-white">
                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-10 text-center text-white relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl rotate-3">
                        <Trophy className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-4xl font-black mb-2 tracking-tight">Gratulálok!</h2>
                    <p className="text-indigo-100 font-medium opacity-90">Sikeresen teljesítetted a záró tesztet!</p>
                </div>
                <CardContent className="p-8 space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-5 rounded-3xl text-center border border-slate-100 group hover:scale-105 transition-transform">
                            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Eredmény</span>
                            <span className="text-3xl font-black text-slate-800">{percentage}%</span>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-3xl text-center border border-slate-100 group hover:scale-105 transition-transform">
                            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Helyes</span>
                            <span className="text-3xl font-black text-slate-800">{correctCount}/{total}</span>
                        </div>
                    </div>
                    <div className="flex justify-center scale-110">
                        <XPBadge xp={xp} />
                    </div>
                    <div className="space-y-3 pt-4">
                        <Button
                            onClick={onRestart}
                            className="w-full h-14 text-lg font-bold bg-slate-900 border-none shadow-xl hover:bg-slate-800 rounded-2xl"
                        >
                            <RotateCcw className="w-5 h-5 mr-2" /> Újrakezdés
                        </Button>
                        <Button variant="ghost" onClick={onRestart} className="w-full h-12 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl">
                            Vissza a szintekhez
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function DifficultyCard({ level, title, description, icon, color, onClick }: any) {
    const colors: any = {
        emerald: "bg-emerald-100 text-emerald-600 border-emerald-100 hover:border-emerald-400 ring-emerald-50 text-emerald-900",
        amber: "bg-amber-100 text-amber-600 border-amber-100 hover:border-amber-400 ring-amber-50 text-amber-900",
        rose: "bg-rose-100 text-rose-600 border-rose-100 hover:border-rose-400 ring-rose-50 text-rose-900"
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center p-8 bg-white border-2 rounded-[2rem] transition-all group relative overflow-hidden",
                colors[color].split(' ').slice(2).join(' ')
            )}
        >
            <div className={cn(
                "p-5 rounded-2xl mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all shadow-md",
                colors[color].split(' ').slice(0, 2).join(' ')
            )}>
                {icon}
            </div>
            <h3 className={cn("text-2xl font-black mb-3", colors[color].split(' ').pop())}>{title}</h3>
            <p className="text-center text-slate-500 font-medium text-sm leading-relaxed">{description}</p>
            <div className={cn(
                "mt-6 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full",
                colors[color].split(' ').slice(0, 2).join(' ')
            )}>
                30 feladat
            </div>
        </button>
    );
}
