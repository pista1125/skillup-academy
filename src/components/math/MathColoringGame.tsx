import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sparkles, Trophy, RefreshCcw, PartyPopper, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';

interface Area {
    id: string;
    name: string;
    path: string;
    num1: number;
    num2: number;
    color: string;
}

interface Scene {
    id: string;
    name: string;
    icon: string;
    grade: number;
    operation: 'addition' | 'multiplication';
    areas: Area[];
}

const SCENES: Scene[] = [
    // 1st Grade Addition Scenes
    {
        id: 'house',
        name: 'Házikó',
        icon: '🏠',
        grade: 1,
        operation: 'addition',
        areas: [
            { id: 'sun', name: 'Napocska', path: 'M400,80 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0', num1: 5, num2: 5, color: '#fbbf24' },
            { id: 'cloud1', name: 'Felhő 1', path: 'M150,80 Q180,50 210,80 T270,80 T330,80 Q330,120 150,120 Z', num1: 2, num2: 4, color: '#bae6fd' },
            { id: 'house-body', name: 'Házfal', path: 'M250,300 L550,300 L550,450 L250,450 Z', num1: 6, num2: 2, color: '#fca5a5' },
            { id: 'roof', name: 'Tető', path: 'M230,300 L400,200 L570,300 Z', num1: 3, num2: 4, color: '#ef4444' },
            { id: 'door', name: 'Ajtó', path: 'M370,370 L430,370 L430,450 L370,450 Z', num1: 4, num2: 1, color: '#92400e' },
            { id: 'grass', name: 'Fű', path: 'M0,450 L800,450 L800,500 L0,500 Z', num1: 7, num2: 3, color: '#4ade80' },
            { id: 'tree-leaves', name: 'Lombok', path: 'M600,350 Q665,250 730,350 Z', num1: 8, num2: 1, color: '#166534' },
        ]
    },
    {
        id: 'rocket',
        name: 'Űrhajó',
        icon: '🚀',
        grade: 1,
        operation: 'addition',
        areas: [
            { id: 'space', name: 'Világűr', path: 'M0,0 L800,0 L800,500 L0,500 Z', num1: 1, num2: 1, color: '#1e1b4b' },
            { id: 'body', name: 'Űrhajó test', path: 'M350,150 L450,150 L450,350 L350,350 Z', num1: 4, num2: 4, color: '#e2e8f0' },
            { id: 'nose', name: 'Orrkúp', path: 'M350,150 L400,50 L450,150 Z', num1: 3, num2: 2, color: '#ef4444' },
            { id: 'fin-l', name: 'Szárny (bal)', path: 'M350,250 L300,350 L350,350 Z', num1: 2, num2: 5, color: '#ef4444' },
            { id: 'fin-r', name: 'Szárny (jobb)', path: 'M450,250 L500,350 L450,350 Z', num1: 5, num2: 2, color: '#ef4444' },
            { id: 'window', name: 'Ablak', path: 'M375,200 a25,25 0 1,0 50,0 a25,25 0 1,0 -50,0', num1: 3, num2: 3, color: '#38bdf8' },
            { id: 'fire', name: 'Hajtómű láng', path: 'M360,350 L400,450 L440,350 Z', num1: 5, num2: 5, color: '#f97316' },
        ]
    },
    {
        id: 'flower',
        name: 'Virág',
        icon: '🌻',
        grade: 1,
        operation: 'addition',
        areas: [
            { id: 'sky', name: 'Égbolt', path: 'M0,0 L800,300 L0,300 Z', num1: 2, num2: 2, color: '#bae6fd' },
            { id: 'ground', name: 'Föld', path: 'M0,300 L800,300 L800,500 L0,500 Z', num1: 1, num2: 5, color: '#854d0e' },
            { id: 'stem', name: 'Szár', path: 'M390,200 L410,200 L410,480 L390,480 Z', num1: 4, num2: 2, color: '#166534' },
            { id: 'leaf-l', name: 'Levél (bal)', path: 'M390,350 Q300,300 390,400 Z', num1: 3, num2: 5, color: '#22c55e' },
            { id: 'leaf-r', name: 'Levél (jobb)', path: 'M410,380 Q500,330 410,430 Z', num1: 5, num2: 3, color: '#22c55e' },
            { id: 'petal-1', name: 'Szirom 1', path: 'M400,100 Q450,20 500,100 T400,180 Z', num1: 2, num2: 7, color: '#facc15' },
            { id: 'petal-2', name: 'Szirom 2', path: 'M400,100 Q350,20 300,100 T400,180 Z', num1: 4, num2: 5, color: '#facc15' },
            { id: 'center', name: 'Virág közepe', path: 'M360,140 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0', num1: 5, num2: 0, color: '#713f12' },
        ]
    },
    // 2nd Grade Multiplication Scenes
    {
        id: 'butterfly',
        name: 'Pillangó',
        icon: '🦋',
        grade: 2,
        operation: 'multiplication',
        areas: [
            { id: 'bg', name: 'Háttér', path: 'M0,0 L800,0 L800,500 L0,500 Z', num1: 2, num2: 2, color: '#f0f9ff' },
            { id: 'wing-l', name: 'Bal szárny', path: 'M380,250 Q200,50 150,250 T380,450 Z', num1: 2, num2: 5, color: '#f472b6' },
            { id: 'wing-r', name: 'Jobb szárny', path: 'M420,250 Q600,50 650,250 T420,450 Z', num1: 5, num2: 2, color: '#f472b6' },
            { id: 'body', name: 'Test', path: 'M380,150 L420,150 L420,450 L380,450 Z', num1: 1, num2: 10, color: '#475569' },
            { id: 'spot-1', name: 'Pötty 1', path: 'M250,200 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0', num1: 2, num2: 4, color: '#fbbf24' },
            { id: 'spot-2', name: 'Pötty 2', path: 'M510,200 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0', num1: 4, num2: 2, color: '#fbbf24' },
        ]
    },
    {
        id: 'fish',
        name: 'Halacska',
        icon: '🐠',
        grade: 2,
        operation: 'multiplication',
        areas: [
            { id: 'water', name: 'Víz', path: 'M0,0 L800,0 L800,500 L0,500 Z', num1: 3, num2: 3, color: '#e0f2fe' },
            { id: 'body', name: 'Hal test', path: 'M200,250 Q400,100 600,250 T200,400 Z', num1: 5, num2: 4, color: '#fb923c' },
            { id: 'tail', name: 'Farokúszó', path: 'M600,250 L750,150 L750,350 Z', num1: 2, num2: 3, color: '#f97316' },
            { id: 'eye', name: 'Szem', path: 'M300,220 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0', num1: 1, num2: 5, color: '#ffffff' },
            { id: 'bubble-1', name: 'Buborék 1', path: 'M150,150 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0', num1: 3, num2: 2, color: '#ffffff' },
            { id: 'bubble-2', name: 'Buborék 2', path: 'M100,100 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0', num1: 2, num2: 2, color: '#ffffff' },
        ]
    },
    {
        id: 'castle',
        name: 'Várkastély',
        icon: '🏰',
        grade: 2,
        operation: 'multiplication',
        areas: [
            { id: 'sky', name: 'Égbolt', path: 'M0,0 L800,400 L0,400 Z', num1: 4, num2: 4, color: '#ecfeff' },
            { id: 'grass', name: 'Fű', path: 'M0,400 L800,400 L800,500 L0,500 Z', num1: 5, num2: 5, color: '#22c55e' },
            { id: 'main', name: 'Várfal', path: 'M300,250 L500,250 L500,400 L300,400 Z', num1: 3, num2: 10, color: '#94a3b8' },
            { id: 'tower-l', name: 'Bal torony', path: 'M250,200 L300,200 L300,400 L250,400 Z', num1: 2, num2: 6, color: '#64748b' },
            { id: 'tower-r', name: 'Jobb torony', path: 'M500,200 L550,200 L550,400 L500,400 Z', num1: 6, num2: 2, color: '#64748b' },
            { id: 'door', name: 'Kapu', path: 'M380,330 L420,330 L420,400 L380,400 Z', num1: 3, num2: 4, color: '#451a03' },
            { id: 'flag', name: 'Zászló', path: 'M400,150 L450,180 L400,210 Z', num1: 1, num2: 8, color: '#ef4444' },
        ]
    },
    {
        id: 'robot',
        name: 'Robot',
        icon: '🤖',
        grade: 2,
        operation: 'multiplication',
        areas: [
            { id: 'bg', name: 'Laboratórium', path: 'M0,0 L800,0 L800,500 L0,500 Z', num1: 0, num2: 10, color: '#f8fafc' },
            { id: 'head', name: 'Fej', path: 'M350,50 L450,50 L450,130 L350,130 Z', num1: 2, num2: 8, color: '#94a3b8' },
            { id: 'body', name: 'Robot test', path: 'M320,130 L480,130 L480,350 L320,350 Z', num1: 5, num2: 5, color: '#cbd5e1' },
            { id: 'arm-l', name: 'Bal kar', path: 'M250,150 L320,180 L320,220 L250,190 Z', num1: 3, num2: 3, color: '#64748b' },
            { id: 'arm-r', name: 'Jobb kar', path: 'M480,180 L550,150 L550,190 L480,220 Z', num1: 3, num2: 3, color: '#64748b' },
            { id: 'leg-l', name: 'Bal láb', path: 'M340,350 L380,350 L380,450 L340,450 Z', num1: 2, num2: 9, color: '#64748b' },
            { id: 'leg-r', name: 'Jobb láb', path: 'M420,350 L460,350 L460,450 L420,450 Z', num1: 9, num2: 2, color: '#64748b' },
            { id: 'chest', name: 'Gomb', path: 'M380,200 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0', num1: 10, num2: 10, color: '#ef4444' },
        ]
    },
    {
        id: 'ship',
        name: 'Hajó',
        icon: '⛵',
        grade: 2,
        operation: 'multiplication',
        areas: [
            { id: 'sky', name: 'Égbolt', path: 'M0,0 L800,350 L0,350 Z', num1: 1, num2: 1, color: '#bae6fd' },
            { id: 'sea', name: 'Tenger', path: 'M0,350 L800,350 L800,500 L0,500 Z', num1: 4, num2: 5, color: '#0369a1' },
            { id: 'hull', name: 'Hajótest', path: 'M250,350 L550,350 L500,450 L300,450 Z', num1: 5, num2: 6, color: '#78350f' },
            { id: 'mast', name: 'Árboc', path: 'M395,150 L405,150 L405,350 L395,350 Z', num1: 2, num2: 2, color: '#451a03' },
            { id: 'sail', name: 'Vitorla', path: 'M405,160 L500,300 L405,300 Z', num1: 3, num2: 8, color: '#f8fafc' },
            { id: 'flag', name: 'Zászló', path: 'M405,150 L430,165 L405,180 Z', num1: 1, num2: 6, color: '#ef4444' },
        ]
    }
];

interface MathColoringGameProps {
    onBack: () => void;
    grade?: number;
    operation?: 'addition' | 'multiplication';
}

export function MathColoringGame({ onBack, grade = 1, operation = 'addition' }: MathColoringGameProps) {
    const availableScenes = SCENES.filter(s => s.grade === grade && s.operation === operation);

    const [currentSceneId, setCurrentSceneId] = useState(availableScenes[0]?.id || SCENES[0].id);
    const [solved, setSolved] = useState<Set<string>>(new Set());
    const [activeId, setActiveId] = useState<string | null>(null);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState<{ type: 'error' | 'success', msg: string } | null>(null);
    const [gameWon, setGameWon] = useState(false);

    const currentScene = availableScenes.find(s => s.id === currentSceneId) || availableScenes[0] || SCENES[0];
    const activeArea = currentScene.areas.find(a => a.id === activeId);

    const handleSceneChange = (id: string) => {
        setCurrentSceneId(id);
        setSolved(new Set());
        setActiveId(null);
        setGameWon(false);
        setFeedback(null);
        setAnswer('');
    };

    const handleAreaClick = (id: string) => {
        if (solved.has(id) || gameWon) return;
        setActiveId(id);
        setAnswer('');
        setFeedback(null);
    };

    const checkAnswer = () => {
        if (!activeArea) return;

        const expectedAnswer = operation === 'addition'
            ? activeArea.num1 + activeArea.num2
            : activeArea.num1 * activeArea.num2;

        if (parseInt(answer) === expectedAnswer) {
            const newSolved = new Set(solved).add(activeArea.id);
            setSolved(newSolved);
            setFeedback({ type: 'success', msg: 'Szuper! Ügyesen számoltál!' });
            setActiveId(null);

            if (newSolved.size === currentScene.areas.length) {
                setGameWon(true);
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        } else {
            setFeedback({ type: 'error', msg: 'Próbáld újra, sikerülni fog!' });
        }
    };

    const resetGame = () => {
        setSolved(new Set());
        setActiveId(null);
        setGameWon(false);
        setFeedback(null);
    };

    return (
        <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto py-4">
            <Card className="w-full bg-white shadow-xl border-t-8 border-t-pink-400 rounded-3xl overflow-hidden">
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-4 border-b border-pink-100 bg-white/50">
                    {availableScenes.map((scene) => (
                        <Button
                            key={scene.id}
                            variant={currentSceneId === scene.id ? "default" : "ghost"}
                            onClick={() => handleSceneChange(scene.id)}
                            className={cn(
                                "rounded-2xl px-4 md:px-6 h-10 md:h-12 font-bold transition-all",
                                currentSceneId === scene.id ? "bg-pink-500 hover:bg-pink-600 shadow-lg shadow-pink-200" : "text-slate-500 hover:bg-pink-50"
                            )}
                        >
                            <span className="text-lg md:text-xl mr-2">{scene.icon}</span>
                            <span className="hidden sm:inline">{scene.name}</span>
                        </Button>
                    ))}
                </div>

                <CardContent className="p-0 relative bg-sky-50">
                    <div className="absolute top-4 right-4 z-10">
                        <Button variant="ghost" onClick={onBack} size="sm" className="bg-white/50 backdrop-blur rounded-full">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Vissza a választóhoz
                        </Button>
                    </div>

                    {/* SVG Canvas */}
                    <svg viewBox="0 0 800 500" className="w-full h-auto cursor-pointer drop-shadow-sm">
                        {currentScene.areas.map((area) => (
                            <path
                                key={area.id}
                                d={area.path}
                                fill={solved.has(area.id) ? area.color : '#ffffff'}
                                stroke="#64748b"
                                strokeWidth={activeId === area.id ? "4" : "2"}
                                className={cn(
                                    "transition-all duration-500",
                                    !solved.has(area.id) && !gameWon && "hover:fill-slate-100",
                                    activeId === area.id && "animate-pulse"
                                )}
                                onClick={() => handleAreaClick(area.id)}
                            />
                        ))}
                    </svg>

                    {/* Win Overlay etc... */}

                    {/* Reward Message Overlay */}
                    {gameWon && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm animate-in fade-in duration-1000">
                            <div className="bg-white p-8 rounded-full shadow-2xl border-8 border-yellow-400 text-center scale-110 animate-bounce-slow">
                                <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-2" />
                                <h2 className="text-3xl font-display font-black text-pink-500">Ügyes vagy! 🎉</h2>
                                <p className="text-slate-600 font-bold">Kiszínezted a teljes képet!</p>
                                <Button onClick={resetGame} className="mt-4 bg-pink-500 hover:bg-pink-600 rounded-full px-8">
                                    <RefreshCcw className="w-4 h-4 mr-2" /> Újra
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Math Prompt Overlay */}
                    {activeId && activeArea && !solved.has(activeId) && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64">
                            <div className="bg-white/95 backdrop-blur shadow-2xl rounded-3xl p-6 border-4 border-pink-400 animate-in zoom-in duration-300">
                                <div className="text-center mb-4">
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{activeArea.name}</p>
                                    <div className="text-4xl font-display font-black text-slate-800 flex items-center justify-center gap-2">
                                        {activeArea.num1} {operation === 'addition' ? '+' : '×'} {activeArea.num2} = ?
                                    </div>
                                </div>
                                <Input
                                    type="number"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                    className="text-2xl h-14 text-center mb-4 border-2 focus:border-pink-500 rounded-2xl"
                                    autoFocus
                                    placeholder="?"
                                />
                                <Button
                                    onClick={checkAnswer}
                                    className="w-full h-12 bg-pink-500 hover:bg-pink-600 text-lg font-bold rounded-2xl"
                                >
                                    Mehet!
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => setActiveId(null)}
                                    className="w-full mt-2 text-slate-400 text-xs"
                                >
                                    Mégsem
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Feedback Toast (Internal) */}
                    {feedback && (
                        <div className={cn(
                            "absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full font-bold shadow-lg animate-in slide-in-from-bottom duration-300 z-50",
                            feedback.type === 'success' ? "bg-green-500 text-white" : "bg-orange-400 text-white"
                        )}>
                            {feedback.type === 'success' ? <Sparkles className="inline w-5 h-5 mr-2" /> : <RefreshCcw className="inline w-5 h-5 mr-2" />}
                            {feedback.msg}
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="flex justify-between w-full items-center px-4">
                <div className="flex gap-2">
                    {currentScene.areas.map(a => (
                        <div
                            key={a.id}
                            className={cn(
                                "w-4 h-4 rounded-full border-2 transition-all duration-300",
                                solved.has(a.id) ? "scale-110 shadow-sm" : "bg-white border-dashed border-slate-300 opacity-30"
                            )}
                            style={{ backgroundColor: solved.has(a.id) ? a.color : '' }}
                        />
                    ))}
                </div>
                {!gameWon && (
                    <p className="text-slate-500 font-medium italic animate-pulse">
                        Kattints egy fehér területre a színezéshez!
                    </p>
                )}
            </div>
        </div>
    );
}
