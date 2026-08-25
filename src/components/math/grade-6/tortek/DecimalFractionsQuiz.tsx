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
    Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
    word: string;
    value: number;
    options: number[];
}

type Difficulty = 'easy' | 'medium' | 'hard';

interface DecimalFractionsQuizProps {
    onBack: () => void;
}

export default function DecimalFractionsQuiz({ onBack }: DecimalFractionsQuizProps) {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const generateQuestions = (diff: Difficulty) => {
        const newQuestions: Question[] = [];
        const usedValues = new Set<number>();

        const numberToWords = (num: number) => {
            const roundedVal = Math.round(num * 100);
            const whole = Math.floor(roundedVal / 100);
            const fraction = roundedVal % 100;

            const hungarianUnits = ["", "egy", "kettő", "három", "négy", "öt", "hat", "hét", "nyolc", "kilenc"];
            const hungarianTens = ["", "tíz", "húsz", "harminc", "negyven", "ötven", "hatvan", "hetven", "nyolcvan", "kilencven"];

            const getWords = (n: number) => {
                if (n === 0) return "nulla";
                if (n < 10) return hungarianUnits[n];
                if (n === 10) return "tíz";
                if (n === 20) return "húsz";
                const t = Math.floor(n / 10);
                const e = n % 10;
                const prefix = t === 1 ? "tizen" : t === 2 ? "huszon" : hungarianTens[t];
                return prefix + hungarianUnits[e];
            };

            let result = "";
            if (whole > 0) {
                result += getWords(whole) + " egész ";
            } else if (fraction > 0) {
                result += "nulla egész ";
            }

            if (diff === 'hard') {
                if (fraction % 10 === 0) {
                    result += getWords(fraction / 10) + " tized";
                } else {
                    result += getWords(fraction) + " század";
                }
            } else {
                result += getWords(fraction / 10) + " tized";
            }

            return result.trim();
        };

        while (newQuestions.length < 10) {
            let val = 0;
            if (diff === 'easy') {
                val = (Math.floor(Math.random() * 19) + 1) / 10;
            } else if (diff === 'medium') {
                val = Math.floor(Math.random() * 9) + 1 + (Math.floor(Math.random() * 9) + 1) / 10;
            } else {
                val = Math.floor(Math.random() * 20) + (Math.floor(Math.random() * 99) + 1) / 100;
            }

            val = parseFloat(val.toFixed(2));

            if (!usedValues.has(val)) {
                usedValues.add(val);

                const options = [val];
                while (options.length < 4) {
                    let offset = (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 0.1 : -0.1);
                    if (diff === 'hard') offset = (Math.floor(Math.random() * 10) + 1) * (Math.random() > 0.5 ? 0.01 : -0.01);

                    const opt = parseFloat((val + offset).toFixed(2));
                    if (opt >= 0 && !options.includes(opt)) {
                        options.push(opt);
                    }
                }

                newQuestions.push({
                    word: numberToWords(val),
                    value: val,
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
        const correct = answer === questions[currentIndex].value;
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
        }, 1500);
    };

    if (!difficulty) {
        return (
            <div className="max-w-4xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Button variant="ghost" onClick={onBack} className="mb-6 rounded-xl">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Vissza
                </Button>

                <div className="text-center mb-12">
                    <div className="inline-flex p-4 bg-orange-100 rounded-3xl text-orange-600 mb-6">
                        <Calculator className="w-12 h-12" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">Tizedes törtek olvasása</h1>
                    <p className="text-slate-500 text-lg">Válaszd ki a nehézségi szintet a kezdéshez!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { id: 'easy' as Difficulty, title: 'Kezdő', desc: 'Csak tizedek (0,x)', color: 'blue' },
                        { id: 'medium' as Difficulty, title: 'Haladó', desc: 'Egészek és tizedek (x,y)', color: 'emerald' },
                        { id: 'hard' as Difficulty, title: 'Mester', desc: 'Századok is (x,yz)', color: 'orange' }
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
                    <h2 className="text-4xl font-black text-slate-800 mb-4">Gratulálunk!</h2>
                    <p className="text-xl text-slate-500 mb-8">Sikeresen befejezted a tizedes tört kvízt!</p>

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

            <Card className="p-12 rounded-[40px] shadow-xl border-none bg-white mb-8 text-center">
                <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Írd le számmal:</p>
                <h2 className="text-3xl md:text-5xl font-black text-slate-800 leading-tight">
                    "{currentQuestion?.word}"
                </h2>
            </Card>

            <div className="grid grid-cols-2 gap-4">
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
                        "inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-lg shadow-sm",
                        isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                    )}>
                        {isCorrect ? (
                            <>🎉 Kiváló! Helyes válasz.</>
                        ) : (
                            <>😕 Sajnos nem jó. A helyes: {currentQuestion.value.toString().replace('.', ',')}</>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
