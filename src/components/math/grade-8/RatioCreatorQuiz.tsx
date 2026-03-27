import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import {
    CheckCircle2,
    XCircle,
    ArrowLeft,
    Trophy,
    ChevronRight,
    Star,
    Medal,
    Crown,
    Plus,
    Minus,
    RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Difficulty = 'easy' | 'medium' | 'hard';

interface CreatorProblem {
    id: string;
    type: 'color' | 'mixture' | 'distribute';
    target: string;
    description: string;
    data: any;
    check: (state: any) => boolean;
    getDisplay: (state: any) => string;
}

const PROBLEMS: Record<Difficulty, CreatorProblem[]> = {
    easy: [
        {
            id: 'ec1',
            type: 'color',
            target: '1:1',
            description: 'Színezd ki a sávokat úgy, hogy a kék és a sárga aránya 1:1 legyen!',
            data: { slots: 2, colors: ['#3b82f6', '#fbbf24'], labels: ['kék', 'sárga'] },
            check: (s) => s.filter((c: number) => c === 0).length === 1 && s.filter((c: number) => c === 1).length === 1,
            getDisplay: (s) => `${s.filter((c: number) => c === 0).length} : ${s.filter((c: number) => c === 1).length}`
        },
        {
            id: 'ec2',
            type: 'color',
            target: '2:1',
            description: 'Színezd ki a sávokat úgy, hogy a piros és a fehér aránya 2:1 legyen!',
            data: { slots: 3, colors: ['#ef4444', '#ffffff'], labels: ['piros', 'fehér'] },
            check: (s) => s.filter((c: number) => c === 0).length === 2 && s.filter((c: number) => c === 1).length === 1,
            getDisplay: (s) => `${s.filter((c: number) => c === 0).length} : ${s.filter((c: number) => c === 1).length}`
        },
        {
            id: 'ec3',
            type: 'color',
            target: '1:2',
            description: 'Színezd ki a sávokat úgy, hogy a zöld és a fehér aránya 1:2 legyen!',
            data: { slots: 3, colors: ['#22c55e', '#ffffff'], labels: ['zöld', 'fehér'] },
            check: (s) => s.filter((c: number) => c === 0).length === 1 && s.filter((c: number) => c === 1).length === 2,
            getDisplay: (s) => `${s.filter((c: number) => c === 0).length} : ${s.filter((c: number) => c === 1).length}`
        },
        {
            id: 'ec4',
            type: 'color',
            target: '1:1',
            description: 'Színezd ki a sávokat úgy, hogy a kék és a piros aránya 1:1 legyen!',
            data: { slots: 4, colors: ['#3b82f6', '#ef4444'], labels: ['kék', 'piros'] },
            check: (s) => s.filter((c: number) => c === 0).length === 2 && s.filter((c: number) => c === 1).length === 2,
            getDisplay: (s) => `${s.filter((c: number) => c === 0).length} : ${s.filter((c: number) => c === 1).length}`
        },
        {
            id: 'ec5',
            type: 'color',
            target: '1:3',
            description: 'Színezd ki a sávokat úgy, hogy a sárga és a kék aránya 1:3 legyen!',
            data: { slots: 4, colors: ['#fbbf24', '#3b82f6'], labels: ['sárga', 'kék'] },
            check: (s) => s.filter((c: number) => c === 0).length === 1 && s.filter((c: number) => c === 1).length === 3,
            getDisplay: (s) => `${s.filter((c: number) => c === 0).length} : ${s.filter((c: number) => c === 1).length}`
        },
        {
            id: 'ec6',
            type: 'color',
            target: '1:1:1',
            description: 'Színezd a sávokat pirosra, fehérre és zöldre 1:1:1 arányban!',
            data: { slots: 3, colors: ['#ef4444', '#ffffff', '#22c55e'], labels: ['piros', 'fehér', 'zöld'] },
            check: (s) => s.filter((c: number) => c === 0).length === 1 && s.filter((c: number) => c === 1).length === 1 && s.filter((c: number) => c === 2).length === 1,
            getDisplay: (s) => `${s.filter((c: number) => c === 0).length}:${s.filter((c: number) => c === 1).length}:${s.filter((c: number) => c === 2).length}`
        },
        {
            id: 'ec7',
            type: 'color',
            target: '3:1',
            description: 'Színezd ki a sávokat úgy, hogy a fehér és a piros aránya 3:1 legyen!',
            data: { slots: 4, colors: ['#ffffff', '#ef4444'], labels: ['fehér', 'piros'] },
            check: (s) => s.filter((c: number) => c === 0).length === 3 && s.filter((c: number) => c === 1).length === 1,
            getDisplay: (s) => `${s.filter((c: number) => c === 0).length} : ${s.filter((c: number) => c === 1).length}`
        },
        {
            id: 'ec8',
            type: 'color',
            target: '1:1:1',
            description: 'Színezd a sávokat zöldre, fehérre és pirosra 1:1:1 arányban!',
            data: { slots: 6, colors: ['#22c55e', '#ffffff', '#ef4444'], labels: ['zöld', 'fehér', 'piros'] },
            check: (s) => s.filter((c: number) => c === 0).length === 2 && s.filter((c: number) => c === 1).length === 2 && s.filter((c: number) => c === 2).length === 2,
            getDisplay: (s) => `${s.filter((c: number) => c === 0).length / 2}:${s.filter((c: number) => c === 1).length / 2}:${s.filter((c: number) => c === 2).length / 2}`
        },
        {
            id: 'ec9',
            type: 'color',
            target: '1:4',
            description: 'Színezd ki a sávokat úgy, hogy a sárga és a kék aránya 1:4 legyen!',
            data: { slots: 5, colors: ['#fbbf24', '#3b82f6'], labels: ['sárga', 'kék'] },
            check: (s) => s.filter((c: number) => c === 0).length === 1 && s.filter((c: number) => c === 1).length === 4,
            getDisplay: (s) => `${s.filter((c: number) => c === 0).length} : ${s.filter((c: number) => c === 1).length}`
        },
        {
            id: 'ec10',
            type: 'color',
            target: '2:3',
            description: 'Színezd ki a sávokat úgy, hogy a piros és a fehér aránya 2:3 legyen!',
            data: { slots: 5, colors: ['#ef4444', '#ffffff'], labels: ['piros', 'fehér'] },
            check: (s) => s.filter((c: number) => c === 0).length === 2 && s.filter((c: number) => c === 1).length === 3,
            getDisplay: (s) => `${s.filter((c: number) => c === 0).length} : ${s.filter((c: number) => c === 1).length}`
        }
    ],
    medium: [
        {
            id: 'mc1',
            type: 'mixture',
            target: '1:1',
            description: 'Készíts egy keveréket, amiben a szörp és a víz aránya 1:1!',
            data: { liquids: [{ color: '#e11d48', label: 'szörp' }, { color: '#60a5fa', label: 'víz' }] },
            check: (s) => s[0] > 0 && s[0] === s[1],
            getDisplay: (s) => `${s[0]} : ${s[1]}`
        },
        {
            id: 'mc2',
            type: 'mixture',
            target: '2:1',
            description: 'Keverj szörpöt és vizet 2:1 arányban!',
            data: { liquids: [{ color: '#e11d48', label: 'szörp' }, { color: '#60a5fa', label: 'víz' }] },
            check: (s) => s[0] > 0 && s[1] > 0 && s[0] === s[1] * 2,
            getDisplay: (s) => `${s[0]} : ${s[1]}`
        },
        {
            id: 'mc3',
            type: 'mixture',
            target: '1:3',
            description: 'Keverj szörpöt és vizet 1:3 arányban!',
            data: { liquids: [{ color: '#e11d48', label: 'szörp' }, { color: '#60a5fa', label: 'víz' }] },
            check: (s) => s[0] > 0 && s[1] > 0 && s[1] === s[0] * 3,
            getDisplay: (s) => `${s[0]} : ${s[1]}`
        },
        {
            id: 'mc4',
            type: 'mixture',
            target: '2:3',
            description: 'Keverj narancslevet és vizet 2:3 arányban!',
            data: { liquids: [{ color: '#f97316', label: 'narancs' }, { color: '#60a5fa', label: 'víz' }] },
            check: (s) => s[0] > 0 && s[1] > 0 && s[0] * 3 === s[1] * 2,
            getDisplay: (s) => `${s[0]} : ${s[1]}`
        },
        {
            id: 'mc5',
            type: 'mixture',
            target: '3:1',
            description: 'Keverj tejet és kávét 3:1 arányban!',
            data: { liquids: [{ color: '#fef3c7', label: 'tej' }, { color: '#451a03', label: 'kávé' }] },
            check: (s) => s[0] > 0 && s[1] > 0 && s[0] === s[1] * 3,
            getDisplay: (s) => `${s[0]} : ${s[1]}`
        },
        {
            id: 'mc6',
            type: 'mixture',
            target: '1:1:1',
            description: 'Keverj narancslevet, szirupot és vizet 1:1:1 arányban!',
            data: { liquids: [{ color: '#f97316', label: 'narancs' }, { color: '#be123c', label: 'szirup' }, { color: '#60a5fa', label: 'víz' }] },
            check: (s) => s[0] > 0 && s[0] === s[1] && s[1] === s[2],
            getDisplay: (s) => `${s[0]} : ${s[1]} : ${s[2]}`
        },
        {
            id: 'mc7',
            type: 'mixture',
            target: '2:1:2',
            description: 'Keverj narancslevet, szirupot és vizet 2:1:2 arányban!',
            data: { liquids: [{ color: '#f97316', label: 'narancs' }, { color: '#be123c', label: 'szirup' }, { color: '#60a5fa', label: 'víz' }] },
            check: (s) => s[0] > 0 && s[1] > 0 && s[2] > 0 && s[0] === s[1] * 2 && s[2] === s[1] * 2,
            getDisplay: (s) => `${s[0]} : ${s[1]} : ${s[2]}`
        },
        {
            id: 'mc8',
            type: 'mixture',
            target: '3:2',
            description: 'Keverj almalevet és vizet 3:2 arányban!',
            data: { liquids: [{ color: '#fbbf24', label: 'almalé' }, { color: '#60a5fa', label: 'víz' }] },
            check: (s) => s[0] > 0 && s[1] > 0 && s[0] * 2 === s[1] * 3,
            getDisplay: (s) => `${s[0]} : ${s[1]}`
        },
        {
            id: 'mc9',
            type: 'mixture',
            target: '1:4',
            description: 'Keverj tejet és kakaót 1:4 arányban!',
            data: { liquids: [{ color: '#fef3c7', label: 'tej' }, { color: '#451a03', label: 'kakaó' }] },
            check: (s) => s[0] > 0 && s[1] > 0 && s[1] === s[0] * 4,
            getDisplay: (s) => `${s[0]} : ${s[1]}`
        },
        {
            id: 'mc10',
            type: 'mixture',
            target: '5:1',
            description: 'Keverj vizet és sót (oldat) 5:1 arányban!',
            data: { liquids: [{ color: '#60a5fa', label: 'víz' }, { color: '#ffffff', label: 'só' }] },
            check: (s) => s[0] > 0 && s[1] > 0 && s[0] === s[1] * 5,
            getDisplay: (s) => `${s[0]} : ${s[1]}`
        }
    ],
    hard: [
        {
            id: 'hc1',
            type: 'distribute',
            target: '1:1',
            description: 'Ossz el 10 golyót a két dobozba 1:1 arányban!',
            data: { total: 10, labels: ['A doboz', 'B doboz'] },
            check: (s) => s[0] === 5 && s[1] === 5,
            getDisplay: (s) => `${s[0]} : ${s[1]}`
        },
        {
            id: 'hc2',
            type: 'distribute',
            target: '2:1',
            description: 'Ossz el 12 golyót 2:1 arányban!',
            data: { total: 12, labels: ['A doboz', 'B doboz'] },
            check: (s) => s[0] === 8 && s[1] === 4,
            getDisplay: (s) => `${s[0]} : ${s[1]}`
        },
        {
            id: 'hc3',
            type: 'distribute',
            target: '2:3',
            description: 'Ossz el 15 golyót 2:3 arányban!',
            data: { total: 15, labels: ['A doboz', 'B doboz'] },
            check: (s) => s[0] === 6 && s[1] === 9,
            getDisplay: (s) => `${s[0]} : ${s[1]}`
        },
        {
            id: 'hc4',
            type: 'distribute',
            target: '1:4',
            description: 'Ossz el 20 golyót 1:4 arányban!',
            data: { total: 20, labels: ['A doboz', 'B doboz'] },
            check: (s) => s[0] === 4 && s[1] === 16,
            getDisplay: (s) => `${s[0]} : ${s[1]}`
        },
        {
            id: 'hc5',
            type: 'distribute',
            target: '1:2',
            description: 'Ossz el 9 golyót 1:2 arányban!',
            data: { total: 9, labels: ['A doboz', 'B doboz'] },
            check: (s) => s[0] === 3 && s[1] === 6,
            getDisplay: (s) => `${s[0]} : ${s[1]}`
        },
        {
            id: 'hc6',
            type: 'distribute',
            target: '3:1',
            description: 'Ossz el 16 golyót 3:1 arányban!',
            data: { total: 16, labels: ['A doboz', 'B doboz'] },
            check: (s) => s[0] === 12 && s[1] === 4,
            getDisplay: (s) => `${s[0]} : ${s[1]}`
        },
        {
            id: 'hc7',
            type: 'distribute',
            target: '5:2',
            description: 'Ossz el 14 golyót 5:2 arányban!',
            data: { total: 14, labels: ['A doboz', 'B doboz'] },
            check: (s) => s[0] === 10 && s[1] === 4,
            getDisplay: (s) => `${s[0]} : ${s[1]}`
        },
        {
            id: 'hc8',
            type: 'distribute',
            target: '1:5',
            description: 'Ossz el 18 golyót 1:5 arányban!',
            data: { total: 18, labels: ['A doboz', 'B doboz'] },
            check: (s) => s[0] === 3 && s[1] === 15,
            getDisplay: (s) => `${s[0]} : ${s[1]}`
        },
        {
            id: 'hc9',
            type: 'distribute',
            target: '4:3',
            description: 'Ossz el 21 golyót 4:3 arányban!',
            data: { total: 21, labels: ['A doboz', 'B doboz'] },
            check: (s) => s[0] === 12 && s[1] === 9,
            getDisplay: (s) => `${s[0]} : ${s[1]}`
        },
        {
            id: 'hc10',
            type: 'distribute',
            target: '2:3',
            description: 'Ossz el 25 golyót 2:3 arányban!',
            data: { total: 25, labels: ['A doboz', 'B doboz'] },
            check: (s) => s[0] === 10 && s[1] === 15,
            getDisplay: (s) => `${s[0]} : ${s[1]}`
        }
    ]
};

export function RatioCreatorQuiz({ onBack }: { onBack: () => void }) {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [problems, setProblems] = useState<CreatorProblem[]>([]);
    const [problemState, setProblemState] = useState<any>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [xpEarned, setXpEarned] = useState(0);

    const TOTAL_QUESTIONS = 5;

    const startQuiz = useCallback(() => {
        if (!difficulty) return;
        const available = [...PROBLEMS[difficulty]];
        const shuffled = available.sort(() => Math.random() - 0.5).slice(0, TOTAL_QUESTIONS);
        setProblems(shuffled);
        setCurrentIndex(0);
        setShowFeedback(false);
        setCorrectCount(0);
        setQuizComplete(false);
        setXpEarned(0);
        
        // Init state for first problem
        const first = shuffled[0];
        if (first.type === 'color') setProblemState(new Array(first.data.slots).fill(-1));
        else if (first.type === 'mixture') setProblemState(new Array(first.data.liquids.length).fill(0));
        else if (first.type === 'distribute') setProblemState([first.data.total, 0]);
    }, [difficulty]);

    useEffect(() => {
        if (difficulty) startQuiz();
    }, [difficulty, startQuiz]);

    const checkAnswer = () => {
        if (showFeedback) return;
        const current = problems[currentIndex];
        const isCorrect = current.check(problemState);

        if (isCorrect) {
            setCorrectCount(prev => prev + 1);
            setXpEarned(prev => prev + (difficulty === 'easy' ? 15 : difficulty === 'medium' ? 20 : 25));
        }
        setShowFeedback(true);
    };

    const nextQuestion = () => {
        if (currentIndex < problems.length - 1) {
            const nextIdx = currentIndex + 1;
            setCurrentIndex(nextIdx);
            setShowFeedback(false);
            
            const next = problems[nextIdx];
            if (next.type === 'color') setProblemState(new Array(next.data.slots).fill(-1));
            else if (next.type === 'mixture') setProblemState(new Array(next.data.liquids.length).fill(0));
            else if (next.type === 'distribute') setProblemState([next.data.total, 0]);
        } else {
            setQuizComplete(true);
        }
    };

    if (!difficulty) {
        return (
            <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between px-2">
                    <Button variant="ghost" onClick={onBack} size="sm" className="hover:bg-slate-100 text-xs">
                        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                        Vissza
                    </Button>
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Arány Alkotó - Építs arányokat!</h2>
                    <div className="w-16"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <DifficultyCard
                        level="easy"
                        title="Zászlófestő"
                        desc="Színezd ki a sávokat!"
                        icon={<Star className="w-10 h-10" />}
                        color="emerald"
                        onClick={() => setDifficulty('easy')}
                    />
                    <DifficultyCard
                        level="medium"
                        title="Koktélművész"
                        desc="Keverd be a pontos arányt!"
                        icon={<Medal className="w-10 h-10" />}
                        color="amber"
                        onClick={() => setDifficulty('medium')}
                    />
                    <DifficultyCard
                        level="hard"
                        title="Logisztikus"
                        desc="Oszd el a golyókat!"
                        icon={<Crown className="w-10 h-10" />}
                        color="rose"
                        onClick={() => setDifficulty('hard')}
                    />
                </div>
            </div>
        );
    }

    if (quizComplete) {
        return (
            <div className="max-w-md mx-auto animate-in fade-in zoom-in duration-500">
                <Card className="border-2 border-indigo-100 shadow-xl overflow-hidden rounded-3xl">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-center text-white">
                        <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
                        <h2 className="text-3xl font-black mb-1">Mestermű!</h2>
                        <p className="opacity-90">Minden arány a helyén!</p>
                    </div>
                    <CardContent className="p-8 space-y-6 bg-white">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="bg-slate-50 p-4 rounded-2xl">
                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pontosság</span>
                                <span className="text-3xl font-black text-slate-800">{Math.round((correctCount / TOTAL_QUESTIONS) * 100)}%</span>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl">
                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">XP</span>
                                <XPBadge xp={xpEarned} />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => setDifficulty(null)} className="flex-1 rounded-2xl h-12 font-bold ring-offset-2 transition-all hover:bg-slate-50">Szintválasztás</Button>
                            <Button onClick={startQuiz} className="flex-1 h-12 font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-lg ring-offset-2 transition-all active:scale-95">Újrakezdés</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (problems.length === 0 || !problemState) return null;
    const current = problems[currentIndex];
    const isCorrect = current.check(problemState);

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-indigo-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                <Button variant="ghost" size="icon" onClick={() => setDifficulty(null)} className="text-indigo-600 hover:bg-indigo-50">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex-1 px-8">
                    <ProgressBar current={currentIndex + 1} total={problems.length} variant="math" size="md" />
                </div>
                <XPBadge xp={xpEarned} />
            </div>

            <Card className="border-2 border-slate-100 shadow-xl rounded-3xl overflow-hidden bg-white">
                <CardContent className="p-8 space-y-8">
                    <div className="text-center space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                            Cél arány: {current.target}
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 leading-tight">{current.description}</h3>
                    </div>

                    {/* Interactive Surface */}
                    <div className="flex flex-col items-center gap-8 py-4">
                        {current.type === 'color' && (
                            <div className="flex flex-col gap-4 w-full items-center">
                                <div className="w-64 h-40 border-4 border-slate-100 rounded-2xl overflow-hidden flex flex-col shadow-inner">
                                    {problemState.map((colorIdx: number, i: number) => (
                                        <div
                                            key={i}
                                            onClick={() => {
                                                if (showFeedback) return;
                                                const newState = [...problemState];
                                                newState[i] = (newState[i] + 1) % current.data.colors.length;
                                                setProblemState(newState);
                                            }}
                                            className={cn(
                                                "flex-1 cursor-pointer transition-colors duration-200 border-b border-white/20 last:border-0",
                                                colorIdx === -1 ? "bg-slate-100" : ""
                                            )}
                                            style={{ backgroundColor: colorIdx === -1 ? undefined : current.data.colors[colorIdx] }}
                                        />
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    {current.data.labels.map((l: string, i: number) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full border border-slate-200" style={{ backgroundColor: current.data.colors[i] }} />
                                            <span className="text-xs font-bold text-slate-500">{l}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {current.type === 'mixture' && (
                            <div className="flex items-center gap-12">
                                <div className="relative w-28 h-48 border-x-4 border-b-4 border-slate-300 rounded-b-2xl bg-slate-50 flex flex-col-reverse overflow-hidden shadow-md">
                                    {problemState.map((parts: number, i: number) => (
                                        <div
                                            key={i}
                                            className="w-full transition-all duration-300"
                                            style={{
                                                height: `${(parts / Math.max(1, problemState.reduce((a:number, b:number) => a+b, 0))) * 100}%`,
                                                backgroundColor: current.data.liquids[i].color
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className="flex flex-col gap-3">
                                    {current.data.liquids.map((l: any, i: number) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-12 text-right text-sm font-black text-slate-400">{problemState[i]}</div>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                disabled={showFeedback}
                                                onClick={() => {
                                                    const newState = [...problemState];
                                                    newState[i] = Math.max(0, newState[i] - 1);
                                                    setProblemState(newState);
                                                }}
                                                className="w-8 h-8 rounded-lg"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                disabled={showFeedback || problemState.reduce((a:number, b:number) => a+b, 0) >= 10}
                                                onClick={() => {
                                                    const newState = [...problemState];
                                                    newState[i] = newState[i] + 1;
                                                    setProblemState(newState);
                                                }}
                                                className="w-8 h-8 rounded-lg"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                            <span className="text-sm font-bold text-slate-600">{l.label}</span>
                                        </div>
                                    ))}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setProblemState(new Array(current.data.liquids.length).fill(0))}
                                        className="mt-2 text-slate-400 hover:text-indigo-600"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5 mr-1" /> Újra
                                    </Button>
                                </div>
                            </div>
                        )}

                        {current.type === 'distribute' && (
                            <div className="w-full space-y-8">
                                <div className="flex justify-around items-start min-h-[120px]">
                                    <div className="flex flex-col items-center gap-3 group">
                                        <div className="w-32 h-24 border-2 border-dashed border-indigo-200 rounded-2xl bg-indigo-50/30 flex flex-wrap gap-1 p-2 items-start content-start transition-all group-hover:border-indigo-400 group-hover:bg-indigo-50">
                                            {Array.from({ length: problemState[0] }).map((_, i) => (
                                                <div key={i} className="w-3 h-3 rounded-full bg-indigo-500 shadow-sm animate-in zoom-in duration-300" />
                                            ))}
                                        </div>
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">{current.data.labels[0]} ({problemState[0]})</span>
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            disabled={showFeedback || problemState[0] <= 0}
                                            onClick={() => {
                                                setProblemState([problemState[0] - 1, problemState[1] + 1]);
                                            }}
                                            className="rounded-xl w-full"
                                        >
                                            Áthelyez <ChevronRight className="ml-1 w-4 h-4" />
                                        </Button>
                                    </div>

                                    <div className="flex flex-col items-center gap-3 group">
                                         <div className="w-32 h-24 border-2 border-dashed border-purple-200 rounded-2xl bg-purple-50/30 flex flex-wrap gap-1 p-2 items-start content-start transition-all group-hover:border-purple-400 group-hover:bg-purple-50">
                                            {Array.from({ length: problemState[1] }).map((_, i) => (
                                                <div key={i} className="w-3 h-3 rounded-full bg-purple-500 shadow-sm animate-in zoom-in duration-300" />
                                            ))}
                                        </div>
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">{current.data.labels[1]} ({problemState[1]})</span>
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            disabled={showFeedback || problemState[1] <= 0}
                                            onClick={() => {
                                                setProblemState([problemState[0] + 1, problemState[1] - 1]);
                                            }}
                                            className="rounded-xl w-full"
                                        >
                                            <ArrowLeft className="mr-1 w-4 h-4" /> Áthelyez
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center gap-6 pt-4 border-t border-slate-50">
                        <div className="text-slate-400 font-black text-2xl tracking-widest italic opacity-50">
                            Aktuális: {current.getDisplay(problemState)}
                        </div>

                        {!showFeedback ? (
                            <Button
                                onClick={checkAnswer}
                                className="w-full max-w-sm h-14 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                            >
                                Készen vagyok!
                            </Button>
                        ) : (
                            <div className="w-full space-y-4 animate-in slide-in-from-bottom-2 duration-300">
                                <div className={cn(
                                    "p-6 rounded-2xl border-2 flex flex-col items-center gap-2",
                                    isCorrect ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-rose-50 border-rose-100 text-rose-800"
                                )}>
                                    <div className="flex items-center gap-2 font-black text-lg uppercase">
                                        {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                                        {isCorrect ? 'Tökéletes!' : 'Valami nem stimmel...'}
                                    </div>
                                    <p className="text-center font-bold">
                                        {isCorrect ? 'Az arány pontosan megegyezik a feladattal.' : `A cél ${current.target} volt, de te ${current.getDisplay(problemState)} arányt hoztál létre.`}
                                    </p>
                                </div>
                                <Button
                                    onClick={nextQuestion}
                                    className="w-full h-14 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 shadow-xl active:scale-95"
                                >
                                    Következő feladat <ChevronRight className="ml-2 w-6 h-6" />
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function DifficultyCard({ level, title, desc, icon, color, onClick }: { level: string, title: string, desc: string, icon: React.ReactNode, color: string, onClick: () => void }) {
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
