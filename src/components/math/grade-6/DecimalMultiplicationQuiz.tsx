import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Calculator,
    ArrowLeft,
    CheckCircle2,
    XCircle,
    Sparkles,
    Trophy,
    Target,
    Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
    num: number;
    multiplier: number;
    value: number;
    options: number[];
}

type Difficulty = 'easy' | 'medium' | 'hard';

interface DecimalMultiplicationQuizProps {
    onBack: () => void;
}

export default function DecimalMultiplicationQuiz({ onBack }: DecimalMultiplicationQuizProps) {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const generateQuestions = (diff: Difficulty) => {
        const newQuestions: Question[] = [];
        const usedPairs = new Set<string>();

        while (newQuestions.length < 10) {
            let num = 0;
            let multiplier = 10;

            if (diff === 'easy') {
                // Easy: 1 decimal place, multiply by 10
                num = (Math.floor(Math.random() * 90) + 1) / 10; // 0.1 to 9.0
                multiplier = 10;
            } else if (diff === 'medium') {
                // Medium: 1-2 decimal places, multiply by 10 or 100
                num = (Math.floor(Math.random() * 500) + 1) / (Math.random() > 0.5 ? 10 : 100);
                multiplier = Math.random() > 0.5 ? 10 : 100;
            } else {
                // Hard: 1-3 decimal places, multiply by 10, 100, or 1000
                const rand = Math.random();
                const div = rand > 0.66 ? 10 : (rand > 0.33 ? 100 : 1000);
                num = (Math.floor(Math.random() * 1000) + 1) / div;
                const mRand = Math.random();
                multiplier = mRand > 0.66 ? 10 : (mRand > 0.33 ? 100 : 1000);
            }

            // Fix floating point issues
            num = parseFloat(num.toFixed(3));
            const value = parseFloat((num * multiplier).toFixed(3));
            const pairKey = `${num}*${multiplier}`;

            if (!usedPairs.has(pairKey)) {
                usedPairs.add(pairKey);

                const options = [value];
                while (options.length < 4) {
                    // Generate distractors by shifting decimal point or slight offsets
                    let opt = value;
                    const strategy = Math.floor(Math.random() * 4);

                    if (strategy === 0) opt = value * 10;
                    else if (strategy === 1) opt = value / 10;
                    else if (strategy === 2) opt = value * 100;
                    else if (strategy === 3) opt = value / 100;

                    // Ensure opt is valid and not already in options
                    opt = parseFloat(opt.toFixed(3));
                    if (opt !== value && !options.includes(opt) && opt > 0 && opt < value * 1000) {
                        options.push(opt);
                    } else {
                        // Fallback: slight offset
                        const offset = (Math.floor(Math.random() * 9) + 1) * (Math.random() > 0.5 ? 1 : -1);
                        opt = parseFloat((value + offset).toFixed(3));
                        if (opt !== value && !options.includes(opt) && opt > 0) {
                            options.push(opt);
                        }
                    }
                }

                newQuestions.push({
                    num,
                    multiplier,
                    value,
                    options: options.sort(() => Math.random() - 0.5)
                });
            }
        }
        setQuestions(newQuestions);
    };

    const handleStart = (diff: Difficulty) => {
        setDifficulty(diff);
        generateQuestions(diff);
    };

    const handleAnswer = (answer: number) => {
        if (selectedAnswer !== null) return;

        setSelectedAnswer(answer);
        const correct = Math.abs(answer - questions[currentIndex].value) < 0.0001;
        setIsCorrect(correct);
        if (correct) setScore(score + 1);

        setTimeout(() => {
            if (currentIndex < 9) {
                setCurrentIndex(currentIndex + 1);
                setSelectedAnswer(null);
                setIsCorrect(null);
            } else {
                setShowResult(true);
            }
        }, 2000);
    };

    if (!difficulty) {
        return (
            <div className="max-w-4xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Button variant="ghost" onClick={onBack} className="mb-6 rounded-xl">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Vissza
                </Button>

                <div className="text-center mb-12">
                    <div className="inline-flex p-4 bg-violet-100 rounded-3xl text-violet-600 mb-6">
                        <Zap className="w-12 h-12" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">Tizedestörtek szorzása 10-zel, 100-zal, 1000-rel</h1>
                    <p className="text-slate-500 text-lg">Válaszd ki a nehézségi szintet a kezdéshez!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { id: 'easy' as Difficulty, title: 'Kezdő', desc: 'Szorzás 10-zel (1 tizedesjegy)', color: 'blue' },
                        { id: 'medium' as Difficulty, title: 'Haladó', desc: 'Szorzás 10-zel, 100-zal', color: 'emerald' },
                        { id: 'hard' as Difficulty, title: 'Mester', desc: 'Szorzás 10, 100, 1000-rel', color: 'orange' }
                    ].map((level) => (
                        <button
                            key={level.id}
                            onClick={() => handleStart(level.id)}
                            className="group p-8 bg-white rounded-3xl border-2 border-slate-100 hover:border-primary hover:shadow-xl transition-all text-left"
                        >
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform",
                                level.color === 'blue' ? "bg-blue-50 text-blue-600" :
                                    level.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                                        "bg-orange-50 text-orange-600"
                            )}>
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{level.title}</h3>
                            <p className="text-slate-500 text-sm">{level.desc}</p>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    if (showResult) {
        return (
            <div className="max-w-2xl mx-auto p-4 text-center animate-in zoom-in duration-500">
                <div className="bg-white p-12 rounded-[40px] shadow-2xl border border-slate-100">
                    <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Trophy className="w-12 h-12" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-800 mb-4">Szép munka!</h2>
                    <p className="text-xl text-slate-500 mb-8">Sikeresen gyakoroltad a tizedesek szorzását!</p>

                    <div className="bg-slate-50 p-6 rounded-3xl mb-10 flex justify-around">
                        <div>
                            <div className="text-sm text-slate-400 uppercase font-bold tracking-widest mb-1">Pontszám</div>
                            <div className="text-3xl font-black text-primary">{score} / 10</div>
                        </div>
                        <div>
                            <div className="text-sm text-slate-400 uppercase font-bold tracking-widest mb-1">Szint</div>
                            <div className="text-3xl font-black text-slate-700 capitalize">
                                {difficulty === 'easy' ? 'Kezdő' : difficulty === 'medium' ? 'Haladó' : 'Mester'}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button onClick={() => {
                            setDifficulty(null);
                            setCurrentIndex(0);
                            setScore(0);
                            setShowResult(false);
                            setSelectedAnswer(null);
                        }} className="flex-1 h-14 rounded-2xl text-lg font-bold">
                            Újrapróbálom
                        </Button>
                        <Button variant="outline" onClick={onBack} className="flex-1 h-14 rounded-2xl text-lg font-bold">
                            Vissza a menübe
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];

    return (
        <div className="max-w-4xl mx-auto p-4 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
                <Button variant="ghost" onClick={onBack} className="rounded-xl">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Kilépés
                </Button>
                <div className="flex items-center gap-4 bg-white px-6 py-2 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" />
                        <span className="font-bold text-slate-700">{currentIndex + 1} / 10</span>
                    </div>
                    <div className="w-px h-4 bg-slate-200" />
                    <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold text-slate-700">{score} pont</span>
                    </div>
                </div>
            </div>

            <Card className="p-12 rounded-[40px] shadow-xl border-none bg-white mb-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
                    <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${(currentIndex / 10) * 100}%` }}
                    />
                </div>
                <p className="text-sm font-bold text-primary uppercase tracking-widest mb-6">Mennyi az eredmény?</p>
                <div className="flex items-center justify-center gap-6 md:gap-12">
                    <div className="text-4xl md:text-6xl font-black text-slate-800">
                        {currentQuestion?.num.toString().replace('.', ',')}
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-slate-400">×</div>
                    <div className="text-4xl md:text-6xl font-black text-slate-800">
                        {currentQuestion?.multiplier}
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQuestion?.options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(opt)}
                        disabled={selectedAnswer !== null}
                        className={cn(
                            "h-24 rounded-3xl text-3xl font-black transition-all border-4",
                            selectedAnswer === null
                                ? "bg-white border-slate-100 hover:border-primary hover:shadow-lg text-slate-700"
                                : opt === currentQuestion.value
                                    ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                                    : selectedAnswer === opt
                                        ? "bg-rose-50 border-rose-500 text-rose-600"
                                        : "bg-white border-slate-100 text-slate-300"
                        )}
                    >
                        <div className="flex items-center justify-center gap-3">
                            {opt.toString().replace('.', ',')}
                            {selectedAnswer !== null && opt === currentQuestion.value && <CheckCircle2 className="w-8 h-8" />}
                            {selectedAnswer === opt && opt !== currentQuestion.value && <XCircle className="w-8 h-8" />}
                        </div>
                    </button>
                ))}
            </div>

            {selectedAnswer !== null && (
                <div className="mt-8 animate-in fade-in slide-in-from-top-4 text-center">
                    <div className={cn(
                        "inline-flex flex-col items-center gap-2 px-8 py-4 rounded-[32px] font-bold text-lg shadow-xl",
                        isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                    )}>
                        <div className="flex items-center gap-2">
                            {isCorrect ? (
                                <>🎉 Kiváló! Helyes válasz.</>
                            ) : (
                                <>😕 Sajnos nem jó. A helyes: {currentQuestion.value.toString().replace('.', ',')}</>
                            )}
                        </div>
                        <p className="text-sm opacity-80 mt-1 font-medium italic">
                            {currentQuestion.multiplier === 10 ? "Tipp: Szorzásnál 10-zel a tizedesvessző 1 hellyel jobbra ugrik!" :
                                currentQuestion.multiplier === 100 ? "Tipp: Szorzásnál 100-zal a tizedesvessző 2 hellyel jobbra ugrik!" :
                                    "Tipp: Szorzásnál 1000-rel a tizedesvessző 3 hellyel jobbra ugrik!"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
