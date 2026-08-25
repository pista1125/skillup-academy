import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import {
    CheckCircle2,
    XCircle,
    ArrowLeft,
    RotateCcw,
    Trophy,
    Sparkles,
    ChevronRight,
    Star,
    Medal,
    Crown,
    FlaskConical,
    Flag,
    Search,
    Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type Difficulty = 'easy' | 'medium' | 'hard';

interface RatioProblem {
    id: string;
    type: 'flag' | 'mixture' | 'recipe';
    question: string;
    description: string;
    visualData: any;
    answers: string[]; // Possible correct formats: "1:2", "1 : 2", etc.
    explanation: string;
}

const PROBLEMS: Record<Difficulty, RatioProblem[]> = {
    easy: [
        {
            id: 'e1',
            type: 'flag',
            question: 'Milyen arányban aránylik a piros, a fehér és a zöld rész egymáshoz a magyar zászlóban?',
            description: 'A zászló három egyenlő sávból áll.',
            visualData: { colors: ['#ff0000', '#ffffff', '#008000'], type: 'stripes' },
            answers: ['1:1:1'],
            explanation: 'Mivel mindhárom sáv egyforma széles, az arányuk 1:1:1.'
        },
        {
            id: 'e2',
            type: 'flag',
            question: 'Hogyan aránylik a piros rész az egész zászlóhoz?',
            description: 'A magyar zászló három egyenlő sávjából csak az egyik piros.',
            visualData: { colors: ['#ff0000', '#ffffff', '#008000'], highlight: 0, type: 'stripes' },
            answers: ['1:3'],
            explanation: 'A 3 egyenlő részből 1 rész piros, így az arány 1:3.'
        },
        {
            id: 'e3',
            type: 'mixture',
            question: 'Milyen az aránya a szörpnek a vízhez ebben a pohárban?',
            description: '1 egység szörphöz 4 egység vizet öntöttünk.',
            visualData: { liquids: [{ color: '#e11d48', label: 'szörp', parts: 1 }, { color: '#60a5fa', label: 'víz', parts: 4 }] },
            answers: ['1:4'],
            explanation: 'A szörp 1 rész, a víz 4 rész, tehát az arányuk 1:4.'
        },
        {
            id: 'e4',
            type: 'mixture',
            question: 'Milyen az aránya a szörpnek az egész italhoz?',
            description: '1 rész szörp és 4 rész víz keveréke.',
            visualData: { liquids: [{ color: '#e11d48', label: 'szörp', parts: 1 }, { color: '#60a5fa', label: 'víz', parts: 4 }], highlight: 0 },
            answers: ['1:5'],
            explanation: '1 rész szörp + 4 rész víz = 5 rész összesen. Így a szörp aránya az egészhez 1:5.'
        },
        {
            id: 'e5',
            type: 'flag',
            question: 'Milyen az aránya a színeknek az olasz zászlóban (zöld, fehér, piros)?',
            description: 'Három egyenlő függőleges sáv.',
            visualData: { colors: ['#008C45', '#F4F5F0', '#CD212A'], type: 'stripes' },
            answers: ['1:1:1'],
            explanation: 'Az olasz zászló három egyenlő sávból áll, így az arány 1:1:1.'
        },
        {
            id: 'e6',
            type: 'flag',
            question: 'Milyen az aránya a színeknek a lengyel zászlóban (fehér, piros)?',
            description: 'Két egyenlő vízszintes sáv.',
            visualData: { colors: ['#ffffff', '#dc143c'], type: 'stripes' },
            answers: ['1:1'],
            explanation: 'Két egyenlő rész esetén az arány 1:1.'
        },
        {
            id: 'e7',
            type: 'mixture',
            question: 'Milyen az aránya a tejnek a kávéhoz, ha félig van tejjel és félig kávéval?',
            description: 'Tej : Kávé',
            visualData: { liquids: [{ color: '#fef3c7', label: 'tej', parts: 1 }, { color: '#451a03', label: 'kávé', parts: 1 }] },
            answers: ['1:1'],
            explanation: 'Mivel mindkettőből ugyanannyi van, az arány 1:1.'
        },
        {
            id: 'e8',
            type: 'mixture',
            question: 'Milyen az aránya a víznek a szörphöz, ha 3 rész vízhez 1 rész szörpöt öntünk?',
            description: 'Víz : Szörp',
            visualData: { liquids: [{ color: '#60a5fa', label: 'víz', parts: 3 }, { color: '#e11d48', label: 'szörp', parts: 1 }] },
            answers: ['3:1'],
            explanation: '3 egység víz és 1 egység szörp esetén az arány 3:1.'
        },
        {
            id: 'e9',
            type: 'flag',
            question: 'Milyen az aránya a kék, sárga és piros sávoknak a román zászlóban?',
            description: 'Három egyenlő függőleges sáv.',
            visualData: { colors: ['#002B7F', '#FCD116', '#CE1126'], type: 'stripes' },
            answers: ['1:1:1'],
            explanation: 'Három egyenlő sáv aránya 1:1:1.'
        },
        {
            id: 'e10',
            type: 'flag',
            question: 'Hogyan aránylik a fehér rész az egész lengyel zászlóhoz?',
            description: 'Fehér fenti rész : Egész zászló',
            visualData: { colors: ['#ffffff', '#dc143c'], highlight: 0, type: 'stripes' },
            answers: ['1:2'],
            explanation: 'A két egyenlő részből egy a fehér, így az arány az egészhez 1:2.'
        }
    ],
    medium: [
        {
            id: 'm1',
            type: 'flag',
            question: 'Egy kitalált zászló 2 sávja kék és 3 sávja sárga. Mi a kék és a sárga sávok aránya?',
            description: 'A sávok egyforma szélesek.',
            visualData: { colors: ['#3b82f6', '#3b82f6', '#fbbf24', '#fbbf24', '#fbbf24'], type: 'stripes' },
            answers: ['2:3'],
            explanation: '2 kék és 3 sárga sáv van, az arányuk 2:3.'
        },
        {
            id: 'm2',
            type: 'mixture',
            question: 'Egy koktélhoz 2 rész narancslevet, 1 rész szirupot és 3 rész vizet használunk. Mi az arányuk ebben a sorrendben?',
            description: 'Narancslé : Szirup : Víz',
            visualData: { liquids: [{ color: '#f97316', label: 'narancs', parts: 2 }, { color: '#be123c', label: 'szirup', parts: 1 }, { color: '#60a5fa', label: 'víz', parts: 3 }] },
            answers: ['2:1:3'],
            explanation: 'A megadott részek alapján az arány 2:1:3.'
        },
        {
            id: 'm3',
            type: 'recipe',
            question: 'Egy tálban 12 alma és 18 körte van. Mi az alma és a körte számának legegyszerűbb aránya?',
            description: 'Válaszolj a legegyszerűbb alakban!',
            visualData: { type: 'apple-pear', items: [{ type: 'apple', count: 12 }, { type: 'pear', count: 18 }] },
            answers: ['2:3'],
            explanation: '12:18 = (12/6):(18/6) = 2:3.'
        },
        {
            id: 'm4',
            type: 'flag',
            question: 'Egy zászlóban 4 fehér és 2 zöld sáv van. Mi a fehér és a zöld sávok legegyszerűbb aránya?',
            description: 'Fehér : Zöld',
            visualData: { colors: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#22c55e', '#22c55e'], type: 'stripes' },
            answers: ['2:1'],
            explanation: '4:2 egyszerűsítve 2:1.'
        },
        {
            id: 'm5',
            type: 'recipe',
            question: 'Egy tolltartóban 8 piros és 12 kék toll van. Mi az arányuk?',
            description: 'Piros : Kék (egyszerűsítve)',
            visualData: { type: 'pens', items: [{ type: 'red', count: 8 }, { type: 'blue', count: 12 }] },
            answers: ['2:3'],
            explanation: '8:12 = 2:3.'
        },
        {
            id: 'm6',
            type: 'mixture',
            question: 'Egy limonádéhoz 3 rész vizet, 2 rész citromlevet és 1 rész mézet keverünk. Mi az arány?',
            description: 'Víz : Citromlé : Méz',
            visualData: { liquids: [{ color: '#60a5fa', label: 'víz', parts: 3 }, { color: '#fef08a', label: 'citrom', parts: 2 }, { color: '#d97706', label: 'méz', parts: 1 }] },
            answers: ['3:2:1'],
            explanation: 'A részek alapján az arány 3:2:1.'
        },
        {
            id: 'm7',
            type: 'recipe',
            question: 'Egy osztályban 15 fiú és 10 lány van. Mi a fiúk és a lányok aránya?',
            description: 'Fiúk : Lányok (egyszerűsítve)',
            visualData: { type: 'students', items: [{ type: 'boy', count: 15 }, { type: 'girl', count: 10 }] },
            answers: ['3:2'],
            explanation: '15:10 egyszerűsítve 3:2.'
        },
        {
            id: 'm8',
            type: 'recipe',
            question: 'Egy sütihez 30 dkg lisztet és 20 dkg vajat kell mérni. Mi az arányuk?',
            description: 'Liszt : Vaj (egyszerűsítve)',
            visualData: { type: 'baking-simple', items: [{ label: 'liszt', weight: 30 }, { label: 'vaj', weight: 20 }] },
            answers: ['3:2'],
            explanation: '30:20 egyszerűsítve 3:2.'
        },
        {
            id: 'm9',
            type: 'mixture',
            question: 'Hogyan aránylik a citromlé az egész limonádéhoz?',
            description: '3 rész víz, 2 rész citromlé, 1 rész méz.',
            visualData: { liquids: [{ color: '#60a5fa', label: 'víz', parts: 3 }, { color: '#fef08a', label: 'citrom', parts: 2 }, { color: '#d97706', label: 'méz', parts: 1 }], highlight: 1 },
            answers: ['2:6', '1:3'],
            explanation: 'Összesen 3+2+1=6 rész van, amiből 2 a citromlé. 2:6, egyszerűsítve 1:3.'
        },
        {
            id: 'm10',
            type: 'recipe',
            question: 'Egy zsákban 20 kg búza és 30 kg kukorica van. Mi az arányuk?',
            description: 'Búza : Kukorica (egyszerűsítve)',
            visualData: { type: 'grain', items: [{ label: 'búza', weight: 20 }, { label: 'kukorica', weight: 30 }] },
            answers: ['2:3'],
            explanation: '20:30 egyszerűsítve 2:3.'
        }
    ],
    hard: [
        {
            id: 'h1',
            type: 'recipe',
            question: 'Egy betonozáshoz 5 lapát cementet, 10 lapát homokot és 15 lapát kavicsot keverünk össze. Mi a legegyszerűbb arányuk?',
            description: 'Cement : Homok : Kavics',
            visualData: { type: 'concrete' },
            answers: ['1:2:3'],
            explanation: '5:10:15 mindegyiket elosztva 5-tel: 1:2:3.'
        },
        {
            id: 'h2',
            type: 'recipe',
            question: 'A motorfűrész üzemanyagához 1 dl olajat keverünk 5 liter (50 dl) benzinhez. Mi az olaj és a benzin aránya?',
            description: 'Figyelj a mértékegységekre!',
            visualData: { type: 'fuel' },
            answers: ['1:50'],
            explanation: '1 dl olaj és 5 liter = 50 dl benzin. Az arány 1:50.'
        },
        {
            id: 'h3',
            type: 'recipe',
            question: 'Egy süteményhez 250 g lisztet és 100 g cukrot használunk. Mi a liszt és a cukor legegyszerűbb aránya?',
            description: 'Oszd le a legnagyobb közös osztóval!',
            visualData: { type: 'baking' },
            answers: ['5:2'],
            explanation: '250:100 = 25:10 = 5:2.'
        },
        {
            id: 'h4',
            type: 'recipe',
            question: 'Egy térképen 2 cm távolság a valóságban 1 km (100 000 cm). Mekkora a térkép méretaránya?',
            description: 'Tipp: egyenlő mértékegységek kellenek!',
            visualData: { type: 'map-scale', map: 2, real: '1 km' },
            answers: ['1:50000'],
            explanation: '2 cm : 100 000 cm = 1 : 50 000.'
        },
        {
            id: 'h5',
            type: 'recipe',
            question: 'Egy bronz szobor 9 kg rézből és 1 kg ónból készült. Mi az alkotóelemek aránya az egész szoborhoz?',
            description: 'Réz : Ón : Egész',
            visualData: { items: [{ label: 'réz', val: 9 }, { label: 'ón', val: 1 }] },
            answers: ['9:1:10'],
            explanation: '9 rész réz, 1 rész ón. Összesen 10 rész. Az arány 9:1:10.'
        },
        {
            id: 'h6',
            type: 'recipe',
            question: 'Fugázó anyag készítésekor 1 kg vizet adunk 4 kg porhoz. Mi az arány?',
            description: 'Víz : Por',
            visualData: { type: 'mortar', water: 1, powder: 4 },
            answers: ['1:4'],
            explanation: '1 rész víz és 4 rész por aránya 1:4.'
        },
        {
            id: 'h7',
            type: 'recipe',
            question: 'Egy faluban 2000 férfi és 2100 nő él. Mi az arányuk?',
            description: 'Férfiak : Nők (egyszerűsítve)',
            visualData: { type: 'population', men: 2000, women: 2100 },
            answers: ['20:21'],
            explanation: '2000:2100 egyszerűsítve 20:21.'
        },
        {
            id: 'h8',
            type: 'recipe',
            question: 'Egy térképen 5 cm távolság a valóságban 100 m (10 000 cm). Mekkora a méretarány?',
            description: 'Egyszerűsítsd az arányt!',
            visualData: { type: 'map-scale', map: 5, real: '100 m' },
            answers: ['1:2000'],
            explanation: '5 : 10 000 = 1 : 2 000.'
        },
        {
            id: 'h9',
            type: 'recipe',
            question: 'A betonhoz 1 rész cement, 2 rész homok és 4 rész sóder kell. Hogyan aránylik a cement az egészhez?',
            description: 'Cement : Egész',
            visualData: { type: 'concrete-v2', parts: [1, 2, 4] },
            answers: ['1:7'],
            explanation: '1+2+4=7 rész összesen. A cement 1 rész, így az arány 1:7.'
        },
        {
            id: 'h10',
            type: 'recipe',
            question: 'A sós vízhez 10 dkg sót adunk 90 dkg vízhez. Mi a só és a víz aránya?',
            description: 'Só : Víz (egyszerűsítve)',
            visualData: { type: 'salt-water', salt: 10, water: 90 },
            answers: ['1:9'],
            explanation: '10:90 = 1:9.'
        }
    ]
};

export function RatioIntroQuiz({ onBack }: { onBack: () => void }) {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [problems, setProblems] = useState<RatioProblem[]>([]);
    const [userAnswer, setUserAnswer] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [xpEarned, setXpEarned] = useState(0);

    const TOTAL_QUESTIONS = 5;

    const startQuiz = useCallback(() => {
        if (!difficulty) return;
        // Shuffle and take 5
        const available = [...PROBLEMS[difficulty]];
        const shuffled = available.sort(() => Math.random() - 0.5).slice(0, TOTAL_QUESTIONS);
        setProblems(shuffled);
        setCurrentIndex(0);
        setUserAnswer('');
        setShowFeedback(false);
        setCorrectCount(0);
        setQuizComplete(false);
        setXpEarned(0);
    }, [difficulty]);

    useEffect(() => {
        if (difficulty) startQuiz();
    }, [difficulty, startQuiz]);

    const checkAnswer = () => {
        if (showFeedback) return;
        const normalizedUser = userAnswer.replace(/\s+/g, '');
        const current = problems[currentIndex];
        const isCorrect = current.answers.some(a => a.replace(/\s+/g, '') === normalizedUser);

        if (isCorrect) {
            setCorrectCount(prev => prev + 1);
            setXpEarned(prev => prev + (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20));
        }
        setShowFeedback(true);
    };

    const nextQuestion = () => {
        if (currentIndex < problems.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setUserAnswer('');
            setShowFeedback(false);
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
                    <h2 className="text-2xl font-bold text-slate-800">Az arány fogalma - Teszt</h2>
                    <div className="w-16"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <DifficultyCard
                        level="easy"
                        title="Kezdő"
                        desc="Zászlók és poharak, egyszerű arányok"
                        icon={<Star className="w-10 h-10" />}
                        color="emerald"
                        onClick={() => setDifficulty('easy')}
                    />
                    <DifficultyCard
                        level="medium"
                        title="Haladó"
                        desc="Több rész, egyszerűsítés"
                        icon={<Medal className="w-10 h-10" />}
                        color="amber"
                        onClick={() => setDifficulty('medium')}
                    />
                    <DifficultyCard
                        level="master"
                        title="Mester"
                        desc="Keverési arányok, receptek"
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
                <Card className="border-2 border-orange-100 shadow-xl overflow-hidden rounded-3xl">
                    <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-8 text-center text-white">
                        <Trophy className="w-12 h-12 mx-auto mb-4" />
                        <h2 className="text-3xl font-black mb-1">Gratulálok!</h2>
                        <p className="opacity-90">Sikeresen teljesítetted a szintet!</p>
                    </div>
                    <CardContent className="p-8 space-y-6 bg-white">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="bg-slate-50 p-4 rounded-2xl">
                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Helyes</span>
                                <span className="text-3xl font-black text-slate-800">{correctCount}/{problems.length}</span>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl text-center">
                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">XP</span>
                                <XPBadge xp={xpEarned} />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => setDifficulty(null)} className="flex-1 rounded-2xl h-12 font-bold ring-offset-2">Szintválasztás</Button>
                            <Button onClick={startQuiz} className="flex-1 h-12 font-bold bg-orange-500 hover:bg-orange-600 text-white rounded-2xl shadow-lg ring-offset-2">Újrakezdés</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (problems.length === 0) return null;
    const current = problems[currentIndex];

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-orange-100 shadow-sm">
                <Button variant="ghost" size="icon" onClick={() => setDifficulty(null)}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex-1 px-8">
                    <ProgressBar current={currentIndex + 1} total={problems.length} variant="math" size="md" />
                </div>
                <XPBadge xp={xpEarned} />
            </div>

            <Card className="border-2 border-slate-100 shadow-xl rounded-3xl overflow-hidden bg-white">
                <CardContent className="p-8 space-y-8 animate-in fade-in duration-500">
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold text-slate-800">{current.question}</h3>
                        <p className="text-sm text-slate-500 italic">{current.description}</p>
                    </div>

                    {/* Visual Area */}
                    <div className="flex justify-center py-4">
                        <VisualRepresentation problem={current} />
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <div className="flex items-center gap-3">
                            <Input
                                value={userAnswer}
                                onChange={e => setUserAnswer(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && checkAnswer()}
                                disabled={showFeedback}
                                className="w-40 h-14 text-center text-2xl font-black border-4 focus:border-orange-500 rounded-2xl"
                                placeholder="pl. 1:2"
                                autoFocus
                            />
                        </div>

                        {!showFeedback ? (
                            <Button
                                onClick={checkAnswer}
                                disabled={!userAnswer}
                                className="w-full max-w-xs h-12 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800"
                            >
                                Ellenőrzés
                            </Button>
                        ) : (
                            <div className="w-full space-y-4 animate-in slide-in-from-bottom-2 blur-in-0 duration-300">
                                <div className={cn(
                                    "p-6 rounded-2xl border-2 flex flex-col items-center gap-2",
                                    current.answers.some(a => a.replace(/\s/g, '') === userAnswer.replace(/\s/g, ''))
                                        ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                                        : "bg-rose-50 border-rose-100 text-rose-800"
                                )}>
                                    <div className="flex items-center gap-2 font-black text-lg">
                                        {current.answers.some(a => a.replace(/\s/g, '') === userAnswer.replace(/\s/g, ''))
                                            ? <CheckCircle2 className="w-6 h-6" />
                                            : <XCircle className="w-6 h-6" />}
                                        {current.answers.some(a => a.replace(/\s/g, '') === userAnswer.replace(/\s/g, '')) ? 'Helyes!' : 'Sajnos nem...'}
                                    </div>
                                    <p className="text-center font-medium">{current.explanation}</p>
                                </div>
                                <Button
                                    onClick={nextQuestion}
                                    className="w-full h-12 bg-orange-500 text-white font-black rounded-2xl hover:bg-orange-600 shadow-md"
                                >
                                    Következő <ChevronRight className="ml-2 w-5 h-5" />
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function VisualRepresentation({ problem }: { problem: RatioProblem }) {
    if (problem.type === 'flag') {
        const { colors, highlight } = problem.visualData;
        return (
            <div className="w-48 h-32 border-2 border-slate-200 rounded-lg overflow-hidden flex flex-col shadow-inner">
                {colors.map((c: string, i: number) => (
                    <div
                        key={i}
                        className="flex-1 flex items-center justify-center relative"
                        style={{ backgroundColor: c }}
                    >
                        {highlight === i && (
                            <div className="absolute inset-0 border-4 border-amber-400 animate-pulse bg-white/10" />
                        )}
                    </div>
                ))}
            </div>
        );
    }

    if (problem.type === 'mixture') {
        const { liquids, highlight } = problem.visualData;
        const totalParts = liquids.reduce((acc: number, l: any) => acc + l.parts, 0);
        
        return (
            <div className="relative w-24 h-40 border-x-2 border-b-2 border-slate-400 rounded-b-xl bg-slate-50 flex flex-col-reverse overflow-hidden shadow-md">
                {liquids.map((l: any, i: number) => (
                    <div
                        key={i}
                        className="relative group w-full"
                        style={{
                            height: `${(l.parts / totalParts) * 100}%`,
                            backgroundColor: l.color
                        }}
                    >
                         {highlight === i && (
                             <div className="absolute inset-x-0 inset-y-0 border-y-4 border-amber-300 animate-pulse bg-white/20" />
                         )}
                         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                             <span className="text-[10px] font-bold text-white drop-shadow-md opacity-60 uppercase tracking-tighter">{l.label}</span>
                         </div>
                    </div>
                ))}
            </div>
        );
    }

    if (problem.type === 'recipe') {
        return (
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                {problem.visualData.type === 'concrete' && (
                    <div className="col-span-2 p-4 bg-slate-100 rounded-2xl border-2 border-slate-200 flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-slate-600" />
                            <span className="font-bold text-slate-700">5 lapát cement</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-slate-400" />
                            <span className="font-bold text-slate-700">10 lapát homok</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-slate-300" />
                            <span className="font-bold text-slate-700">15 lapát kavics</span>
                        </div>
                    </div>
                )}
                {problem.visualData.type === 'fuel' && (
                    <div className="col-span-2 p-6 bg-amber-50 rounded-2xl border-2 border-amber-200 flex items-center justify-around">
                        <div className="text-center">
                            <FlaskConical className="w-10 h-10 text-rose-500 mx-auto" />
                            <span className="block font-bold text-rose-700">1 dl olaj</span>
                        </div>
                        <div className="text-2xl font-black text-amber-300">+</div>
                        <div className="text-center">
                            <span className="text-3xl">⛽</span>
                            <span className="block font-bold text-amber-700">5 liter benzin</span>
                        </div>
                    </div>
                )}
                {problem.visualData.type === 'apple-pear' && (
                    <div className="col-span-2 p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-200 flex justify-around items-center">
                        <div className="text-center">
                             <span className="text-3xl">🍎</span>
                             <span className="block font-bold mt-1">12 alma</span>
                        </div>
                        <div className="text-center">
                             <span className="text-3xl">🍐</span>
                             <span className="block font-bold mt-1">18 körte</span>
                        </div>
                    </div>
                )}
                {problem.visualData.type === 'baking' && (
                    <div className="col-span-2 p-4 bg-orange-50 rounded-2xl border-2 border-orange-200 flex justify-center gap-8 text-center">
                         <div>
                             <span className="block text-2xl font-black text-orange-800">250g</span>
                             <span className="text-xs font-bold text-orange-600 uppercase">liszt</span>
                         </div>
                         <div className="text-2xl font-black text-orange-300 self-center">+</div>
                         <div>
                             <span className="block text-2xl font-black text-orange-800">100g</span>
                             <span className="text-xs font-bold text-orange-600 uppercase">cukor</span>
                         </div>
                    </div>
                )}
                {problem.visualData.type === 'map-scale' && (
                    <div className="col-span-2 p-6 bg-blue-50 rounded-2xl border-2 border-blue-200 space-y-3">
                        <div className="flex items-center justify-between px-4">
                            <div className="flex flex-col items-center">
                                <Search className="w-8 h-8 text-blue-500" />
                                <span className="text-sm font-bold text-blue-700">Térképen</span>
                                <span className="text-xl font-black text-blue-900">{problem.visualData.map} cm</span>
                            </div>
                            <div className="h-0.5 flex-1 bg-blue-200 mx-4 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[10px] font-bold text-blue-400 uppercase">aránylik</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <Target className="w-8 h-8 text-slate-500" />
                                <span className="text-sm font-bold text-slate-700">Valóságban</span>
                                <span className="text-xl font-black text-slate-900">{problem.visualData.real}</span>
                            </div>
                        </div>
                    </div>
                )}
                {problem.visualData.type === 'mortar' && (
                    <div className="col-span-2 p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 flex items-center justify-around">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-400 rounded-lg mx-auto mb-2 shadow-sm" />
                            <span className="block font-bold text-slate-700">{problem.visualData.water} rész víz</span>
                        </div>
                        <div className="text-xl font-black text-slate-300">+</div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-slate-400 rounded-lg mx-auto mb-2 shadow-sm" />
                            <span className="block font-bold text-slate-700">{problem.visualData.powder} rész por</span>
                        </div>
                    </div>
                )}
                {problem.visualData.type === 'population' && (
                    <div className="col-span-2 p-4 bg-purple-50 rounded-2xl border-2 border-purple-200 flex justify-around">
                        <div className="text-center">
                            <div className="text-3xl mb-1">👨</div>
                            <span className="block font-bold text-purple-900">{problem.visualData.men}</span>
                            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">férfi</span>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-1">👩</div>
                            <span className="block font-bold text-purple-900">{problem.visualData.women}</span>
                            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">nő</span>
                        </div>
                    </div>
                )}
                {problem.visualData.type === 'concrete-v2' && (
                    <div className="col-span-2 p-4 bg-stone-100 rounded-2xl border-2 border-stone-300 grid grid-cols-3 gap-2">
                        <div className="p-2 bg-stone-50 rounded-xl text-center shadow-sm">
                            <span className="block text-lg font-black text-stone-700">{problem.visualData.parts[0]}</span>
                            <span className="text-[8px] font-bold text-stone-400 uppercase tracking-tighter">cement</span>
                        </div>
                        <div className="p-2 bg-stone-50 rounded-xl text-center shadow-sm">
                            <span className="block text-lg font-black text-stone-700">{problem.visualData.parts[1]}</span>
                            <span className="text-[8px] font-bold text-stone-400 uppercase tracking-tighter">homok</span>
                        </div>
                        <div className="p-2 bg-stone-50 rounded-xl text-center shadow-sm">
                            <span className="block text-lg font-black text-stone-700">{problem.visualData.parts[2]}</span>
                            <span className="text-[8px] font-bold text-stone-400 uppercase tracking-tighter">sóder</span>
                        </div>
                    </div>
                )}
                {problem.visualData.type === 'salt-water' && (
                    <div className="col-span-2 p-4 bg-blue-50/50 rounded-2xl border-2 border-blue-100 flex items-center justify-center gap-6">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center font-bold text-slate-400">Só</div>
                            <span className="font-black text-blue-900 mt-1">{problem.visualData.salt} dkg</span>
                        </div>
                        <div className="text-xl font-black text-blue-200">+</div>
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 bg-blue-300 rounded-lg shadow-sm" />
                            <span className="font-black text-blue-900 mt-1">{problem.visualData.water} dkg</span>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return null;
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
            <h3 className="text-2xl font-black mb-1 tracking-tight uppercase">{title}</h3>
            <p className="text-sm font-medium text-slate-500 text-center">{desc}</p>
        </button>
    );
}
