import { useState, useCallback } from 'react';
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
    Scale,
    Activity,
    AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

type Difficulty = 'easy' | 'medium' | 'hard';

interface ProportionTask {
    id: string;
    q1: string;
    q2: string;
    isDirectlyProportional: boolean;
    explanation: string;
}

const TASKS: Record<Difficulty, ProportionTask[]> = {
    easy: [
        { id: 'e1', q1: 'A vásárolt azonos kiflik száma', q2: 'A fizetendő összeg', isDirectlyProportional: true, explanation: 'Kétszer annyi kifli kétszer annyiba kerül.' },
        { id: 'e2', q1: 'Egy gyerek életkora', q2: 'A cipőmérete', isDirectlyProportional: false, explanation: 'Ahogy nő a gyerek, nő a cipőmérete, de nem egyenletesen: egy 10 éves gyerek lába nem 5-ször akkora, mint egy 2 évesé.' },
        { id: 'e3', q1: 'A megtett út hossza', q2: 'A séta ideje (állandó sebesség mellett)', isDirectlyProportional: true, explanation: 'Ha kétszer addig sétálsz ugyanolyan gyorsan, kétszer akkora utat teszel meg.' },
        { id: 'e4', q1: 'A négyzet oldalának hossza', q2: 'A nényzet kerülete', isDirectlyProportional: true, explanation: 'A kerület K=4·a. Ha az oldalt duplázod, a kerület is duplázódik.' },
        { id: 'e5', q1: 'Egy ember hajszálainak száma', q2: 'Az intelligenciája', isDirectlyProportional: false, explanation: 'Nincs matematikai (vagy logikai) összefüggés a kettő között.' },
        { id: 'e6', q1: 'A vásárolt azonos tábla csokik száma', q2: 'A csokik összes kalóriatartalma', isDirectlyProportional: true, explanation: 'Minden tábla csokiban ugyanannyi kalória van, így a kalóriák összege egyenesen arányos a számmal.' },
        { id: 'e7', q1: 'A nyári meleg fokozata', q2: 'A fagyizók száma naponta', isDirectlyProportional: false, explanation: 'Bár nő a számuk melegben, az összefüggés nem szigorúan egyenesen arányos.' },
        { id: 'e8', q1: 'A téglalap egyik oldalának hossza', q2: 'A területe (ha a másik oldal változatlan)', isDirectlyProportional: true, explanation: 'T = a·b. Ha a "b" állandó, és az "a"-t duplázod, a terület is duplázódik.' },
        { id: 'e9', q1: 'Egy ember magassága', q2: 'A testtömege', isDirectlyProportional: false, explanation: 'Nem igaz, hogy aki kétszer olyan magas, az pontosan kétszer olyan nehéz.' },
        { id: 'e10', q1: 'A kifestett falfelület', q2: 'A felhasznált festék mennyisége', isDirectlyProportional: true, explanation: 'Kétszer akkora falhoz kétszer annyi festék kell (ha ugyanolyan vastagon kenjük).' }
    ],
    medium: [
        { id: 'm1', q1: 'Egy csapból egyenletesen folyó víz mennyisége', q2: 'A nyitva tartás ideje', isDirectlyProportional: true, explanation: 'Ha percenként ugyanannyi víz folyik ki, akkor az idővel egyenesen arányos az összes víz.' },
        { id: 'm2', q1: 'Az egyforma tempóban dolgozó munkások száma', q2: 'A munka elvégzéséhez szükséges idő', isDirectlyProportional: false, explanation: 'Ez fordított arányosság: többen ugyanazt a munkát rövidebb idő alatt végzik el.' },
        { id: 'm3', q1: 'Egy rugó megnyúlása', q2: 'A rugóra akasztott súly nagysága', isDirectlyProportional: true, explanation: 'A fizika szerint (Hooke-törvény) a megnyúlás egyenesen arányos a húzóerővel.' },
        { id: 'm4', q1: 'A jármű kerekének átmérője', q2: 'A kerék fordulatszáma ugyanazon az úton', isDirectlyProportional: false, explanation: 'Ez fordított arányosság: nagyobb kerék kevesebbet fordul ugyanakkora úton.' },
        { id: 'm5', q1: 'A térképen mért távolság', q2: 'A valóságos út hossza a terepen', isDirectlyProportional: true, explanation: 'A méretarány pontosan ezt az egyenes arányosságot fejezi ki.' },
        { id: 'm6', q1: 'Peti életkora', q2: 'A húga életkora', isDirectlyProportional: false, explanation: 'Peti életkora (x) és a húgáé (x-k) közötti különbség állandó, de a hányadosuk az idő múlásával változik.' },
        { id: 'm7', q1: 'Kocka élhossza', q2: 'A kocka térfogata', isDirectlyProportional: false, explanation: 'Ha a kocka élét kétszeresére növeljük, a térfogata nyolcszorosára (2^3) nő, tehát köbösen arányos.' },
        { id: 'm8', q1: 'Kapcsolódó fogaskerekek fogszáma', q2: 'A fogaskerekek fordulatszáma', isDirectlyProportional: false, explanation: 'Minél több foga van egy keréknek (minél nagyobb), annál kevesebbet fordul. Ez fordított arányosság.' },
        { id: 'm9', q1: 'Egy recepthez használt liszt', q2: 'A megsütött sütemények száma', isDirectlyProportional: true, explanation: 'Kétszer annyi sütihez az összes hozzávalóból (így lisztből is) kétszer annyi kell.' },
        { id: 'm10', q1: 'A kör sugara', q2: 'A kör kerülete', isDirectlyProportional: true, explanation: 'Kerület = 2·r·π. Mivel a 2π állandó, a sugár növelésével a kerület vele egyenes arányban nő.' }
    ],
    hard: [
        { id: 'h1', q1: 'A kör sugara', q2: 'A kör területe', isDirectlyProportional: false, explanation: 'Terület = r²·π. A terület a sugár négyzetével arányos, nem a sugárral!' },
        { id: 'h2', q1: 'Egy autó sebessége', q2: 'A jármű fékútja (ugyanazon az úton)', isDirectlyProportional: false, explanation: 'A fékút hossza a sebesség négyzetével arányos. (Kétszeres sebesség -> négyszeres fékút).' },
        { id: 'h3', q1: 'Pénzbetét után járó kamat', q2: 'A lekötési idő (sima, nem kamatos kamat esetén)', isDirectlyProportional: true, explanation: 'Minden hónapban ugyanannyi fix kamat adódik hozzá, tehát arányosan nő.' },
        { id: 'h4', q1: 'A négyzet oldala', q2: 'A négyzet átlója', isDirectlyProportional: true, explanation: 'Az átló = a·√2. Mivel a √2 egy állandó szorzó, így egyenesen arányosak.' },
        { id: 'h5', q1: 'Egy könyvből elolvasott oldalak száma', q2: 'A hátralévő oldalak száma', isDirectlyProportional: false, explanation: 'Összegük állandó (a könyv oldalszáma), egyik nő, másik csökken, de nem osztási az összefüggésük.' },
        { id: 'h6', q1: 'Egy adott falazáshoz szükséges téglák hossza', q2: 'A sorban elférő téglák száma', isDirectlyProportional: false, explanation: 'Fordított arányosság: minél hosszabb a tégla, annál kevesebb fér el ugyanazon a falszakaszon.' },
        { id: 'h7', q1: 'Feszültség (U)', q2: 'Áramerősség (I) egy állandó ellenállású vezetőn', isDirectlyProportional: true, explanation: 'Ohm törvénye (U=R·I) alapján az R állandó lévén egyenes az arányosság.' },
        { id: 'h8', q1: 'Egy egészséges szív dobbanásainak száma (nyugalomban)', q2: 'Az eltelt idő', isDirectlyProportional: true, explanation: 'Percenként állandó számút dobban (pl. 70-et), így az idővel egyenesen arányos az összdobbanás.' },
        { id: 'h9', q1: 'A letöltött internetes fájl mérete', q2: 'A letöltési idő (állandó sávszélesség esetén)', isDirectlyProportional: true, explanation: 'Ha a sebesség egyenletes, kétszer akkora fájl letöltése kétszer annyi időbe telik.' },
        { id: 'h10', q1: 'A szabályos sokszög oldalainak száma', q2: 'A sokszög egy belső szöge', isDirectlyProportional: false, explanation: 'A belső szög sosem lehet 180 foknál nagyobb, de az oldalszám bármeddig nőhet. A képletük (n-2)*180/n, nem egyenes arányosság.' }
    ]
};

export function DirectProportionQuiz({ onBack }: { onBack: () => void }) {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [problems, setProblems] = useState<ProportionTask[]>([]);
    const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [xpEarned, setXpEarned] = useState(0);

    const TOTAL_QUESTIONS = 10;

    const startQuiz = useCallback((level: Difficulty) => {
        setDifficulty(level);
        const available = [...TASKS[level]];
        const shuffled = available.sort(() => Math.random() - 0.5).slice(0, TOTAL_QUESTIONS);
        setProblems(shuffled);
        setCurrentIndex(0);
        setUserAnswer(null);
        setShowFeedback(false);
        setCorrectCount(0);
        setQuizComplete(false);
        setXpEarned(0);
    }, []);

    const checkAnswer = (answer: boolean) => {
        if (showFeedback) return;
        setUserAnswer(answer);
        const current = problems[currentIndex];
        
        if (answer === current.isDirectlyProportional) {
            setCorrectCount(prev => prev + 1);
            setXpEarned(prev => prev + (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20));
        }
        setShowFeedback(true);
    };

    const nextQuestion = () => {
        if (currentIndex < problems.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setUserAnswer(null);
            setShowFeedback(false);
        } else {
            setQuizComplete(true);
            triggerConfetti();
        }
    };

    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    };

    if (!difficulty) {
        return (
            <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between px-2">
                    <Button variant="ghost" onClick={onBack} size="sm" className="hover:bg-slate-100 text-xs text-slate-500 font-bold px-4 py-2 rounded-xl border border-slate-200">
                        <ArrowLeft className="w-4 h-4 mr-1.5" />
                        Vissza
                    </Button>
                    <div className="flex gap-3 items-center">
                        <Scale className="w-8 h-8 text-orange-500" />
                        <h2 className="text-3xl font-black text-slate-800 tracking-tighter">Egyenes arányosság kvíz</h2>
                    </div>
                    <div className="w-24"></div>
                </div>
                
                <div className="text-center max-w-2xl mx-auto space-y-4">
                    <p className="text-lg text-slate-600 font-medium">Egyenesen arányos a két mennyiség, vagy sem?</p>
                    <div className="p-4 bg-orange-50 text-orange-800 rounded-2xl border border-orange-200 text-sm">
                        <p>Két mennyiség akkor <span className="font-bold">egyenesen arányos</span>, ha ahányszorosára változik (nő vagy csökken) az egyik, ugyanannyiszorosára változik a másik is.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <DifficultyCard
                        level="easy"
                        title="Alapozó szint"
                        desc="Hétköznapi szituációk"
                        icon={<Star className="w-10 h-10" />}
                        color="emerald"
                        onClick={() => startQuiz('easy')}
                    />
                    <DifficultyCard
                        level="medium"
                        title="Gyakorlati"
                        desc="Matematikai éleslátás"
                        icon={<Medal className="w-10 h-10" />}
                        color="amber"
                        onClick={() => startQuiz('medium')}
                    />
                    <DifficultyCard
                        level="hard"
                        title="Mester"
                        desc="Bonyolult összefüggések, fizika, geometria"
                        icon={<Crown className="w-10 h-10" />}
                        color="rose"
                        onClick={() => startQuiz('hard')}
                    />
                </div>
            </div>
        );
    }

    if (quizComplete) {
        return (
            <div className="max-w-md mx-auto animate-in fade-in zoom-in duration-500">
                <Card className="border-2 border-orange-100 shadow-xl overflow-hidden rounded-[2rem]">
                    <div className="bg-gradient-to-br from-orange-400 to-amber-500 p-8 text-center text-white relative">
                        <Trophy className="w-16 h-16 mx-auto mb-4 text-white drop-shadow-md" />
                        <h2 className="text-4xl font-black mb-2 tracking-tighter">Szuper munka!</h2>
                        <p className="text-orange-50 font-medium">Befejezted a szintet!</p>
                    </div>
                    <CardContent className="p-8 space-y-8 bg-white/50 backdrop-blur-sm">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="bg-emerald-50 border-2 border-emerald-100 p-4 rounded-[1.5rem]">
                                <span className="block text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Eredmény</span>
                                <span className="text-4xl font-black text-emerald-600">{correctCount}/{problems.length}</span>
                            </div>
                            <div className="bg-blue-50 border-2 border-blue-100 p-4 rounded-[1.5rem] flex flex-col justify-center items-center">
                                <span className="block text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">XP szerzett</span>
                                <XPBadge xp={xpEarned} />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline" onClick={() => setDifficulty(null)} className="flex-1 rounded-2xl h-14 font-black border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800">Menü</Button>
                            <Button onClick={() => startQuiz(difficulty)} className="flex-1 h-14 font-black bg-orange-500 hover:bg-orange-600 text-white rounded-2xl shadow-lg shadow-orange-500/30">Újra</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (problems.length === 0) return null;
    const current = problems[currentIndex];

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-4 bg-white border-2 border-slate-100 rounded-[2rem] shadow-sm">
                <Button variant="ghost" size="icon" className="hover:bg-slate-100 text-slate-400" onClick={() => setDifficulty(null)}>
                    <ArrowLeft className="w-6 h-6" />
                </Button>
                <div className="flex-1 px-8">
                    <ProgressBar current={currentIndex + 1} total={problems.length} variant="math" size="lg" />
                </div>
                <div className="flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full font-bold">
                    <Activity className="w-4 h-4" />
                    <span>{currentIndex + 1} / {problems.length}</span>
                </div>
            </div>

            <Card className="border-4 border-slate-100 shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                <CardContent className="p-8 md:p-12 space-y-10 animate-in fade-in duration-500">
                    <div className="text-center space-y-8">
                        <div className="inline-block p-4 bg-orange-50 rounded-full border-4 border-orange-100 mb-2">
                             <Scale className="w-12 h-12 text-orange-500" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6">
                             <div className="bg-slate-50 border-2 border-slate-100 p-6 rounded-3xl min-h-[120px] flex items-center justify-center">
                                 <h3 className="text-xl md:text-2xl font-black text-slate-700 leading-tight">{current.q1}</h3>
                             </div>
                             <div className="text-2xl font-black text-slate-300 md:rotate-0 rotate-90">ÉS</div>
                             <div className="bg-slate-50 border-2 border-slate-100 p-6 rounded-3xl min-h-[120px] flex items-center justify-center">
                                 <h3 className="text-xl md:text-2xl font-black text-slate-700 leading-tight">{current.q2}</h3>
                             </div>
                        </div>
                    </div>

                    {!showFeedback ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button
                                onClick={() => checkAnswer(true)}
                                className="h-20 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xl rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform"
                            >
                                Egyenesen arányos
                            </Button>
                            <Button
                                onClick={() => checkAnswer(false)}
                                className="h-20 bg-rose-500 hover:bg-rose-600 text-white font-black text-xl rounded-2xl shadow-lg shadow-rose-500/20 active:scale-95 transition-transform"
                            >
                                Nem egyenesen arányos
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300 bg-slate-50 -mx-8 sm:-mx-12 -mb-8 sm:-mb-12 p-8 sm:p-12 border-t-2 border-slate-100">
                            <div className={cn(
                                "p-6 rounded-3xl border-4 flex flex-col items-center gap-3 shadow-sm",
                                userAnswer === current.isDirectlyProportional
                                    ? "bg-emerald-100/50 border-emerald-200 text-emerald-800"
                                    : "bg-rose-100/50 border-rose-200 text-rose-800"
                            )}>
                                <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
                                    {userAnswer === current.isDirectlyProportional
                                        ? <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                        : <AlertTriangle className="w-8 h-8 text-rose-500" />}
                                    {userAnswer === current.isDirectlyProportional ? 'Helyes válasz!' : 'Sajnos most nem talált!'}
                                </div>
                                
                                <div className="text-center mt-2 space-y-2">
                                    <p className="text-sm font-bold opacity-60 uppercase mb-1">Magyararázat</p>
                                    <p className="font-semibold text-lg max-w-lg mx-auto leading-relaxed">{current.explanation}</p>
                                </div>
                            </div>
                            <Button
                                onClick={nextQuestion}
                                className="w-full h-16 bg-slate-800 text-white font-black text-xl rounded-2xl hover:bg-slate-900 shadow-xl"
                            >
                                Következő <ChevronRight className="ml-2 w-6 h-6" />
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

function DifficultyCard({ level, title, desc, icon, color, onClick }: { level: string, title: string, desc: string, icon: React.ReactNode, color: string, onClick: () => void }) {
    const colors = {
        emerald: "border-emerald-200 hover:border-emerald-500 bg-emerald-50 text-emerald-600",
        amber: "border-amber-200 hover:border-amber-500 bg-amber-50 text-amber-600",
        rose: "border-rose-200 hover:border-rose-500 bg-rose-50 text-rose-600"
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center justify-center p-8 bg-white border-4 rounded-[2.5rem] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group",
                colors[color as keyof typeof colors]
            )}
        >
            <div className={cn("p-6 rounded-3xl mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 relative",
                color === 'emerald' ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white' : 
                color === 'amber' ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white' : 
                'bg-gradient-to-br from-rose-400 to-rose-600 text-white'
            )}>
                {icon}
            </div>
            <h3 className="text-2xl font-black mb-2 tracking-tighter text-slate-800">{title}</h3>
            <p className="text-sm font-semibold text-slate-500 text-center leading-snug">{desc}</p>
        </button>
    );
}
