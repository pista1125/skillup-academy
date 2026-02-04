import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sparkles, Trophy, RefreshCcw, PartyPopper } from 'lucide-react';
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

const AREAS: Area[] = [
    { id: 'sun', name: 'Napocska', path: 'M400,100 a50,50 0 1,0 100,0 a50,50 0 1,0 -100,0', num1: 5, num2: 5, color: '#fbbf24' },
    { id: 'cloud1', name: 'Felhő 1', path: 'M150,80 Q180,50 210,80 T270,80 T330,80 Q330,120 150,120 Z', num1: 2, num2: 4, color: '#bae6fd' },
    { id: 'house-body', name: 'Házfal', path: 'M250,300 L550,300 L550,450 L250,450 Z', num1: 6, num2: 2, color: '#fca5a5' },
    { id: 'roof', name: 'Tető', path: 'M230,300 L400,200 L570,300 Z', num1: 3, num2: 4, color: '#ef4444' },
    { id: 'door', name: 'Ajtó', path: 'M370,370 L430,370 L430,450 L370,450 Z', num1: 4, num2: 1, color: '#92400e' },
    { id: 'grass', name: 'Fű', path: 'M0,450 L800,450 L800,500 L0,500 Z', num1: 7, num2: 3, color: '#4ade80' },
    { id: 'tree-trunk', name: 'Fatörzs', path: 'M650,350 L680,350 L680,450 L650,450 Z', num1: 1, num2: 5, color: '#78350f' },
    { id: 'tree-leaves', name: 'Lombok', path: 'M600,350 Q665,250 730,350 Z', num1: 8, num2: 1, color: '#166534' },
];

export function MathColoringGame({ onBack }: { onBack: () => void }) {
    const [solved, setSolved] = useState<Set<string>>(new Set());
    const [activeId, setActiveId] = useState<string | null>(null);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState<{ type: 'error' | 'success', msg: string } | null>(null);
    const [gameWon, setGameWon] = useState(false);

    const activeArea = AREAS.find(a => a.id === activeId);

    const handleAreaClick = (id: string) => {
        if (solved.has(id) || gameWon) return;
        setActiveId(id);
        setAnswer('');
        setFeedback(null);
    };

    const checkAnswer = () => {
        if (!activeArea) return;

        if (parseInt(answer) === activeArea.num1 + activeArea.num2) {
            const newSolved = new Set(solved).add(activeArea.id);
            setSolved(newSolved);
            setFeedback({ type: 'success', msg: 'Szuper! Ügyesen számoltál!' });
            setActiveId(null);

            if (newSolved.size === AREAS.length) {
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
                <CardContent className="p-0 relative bg-sky-50">
                    {/* SVG Canvas */}
                    <svg viewBox="0 0 800 500" className="w-full h-auto cursor-pointer drop-shadow-sm">
                        {AREAS.map((area) => (
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
                                        {activeArea.num1} + {activeArea.num2} = ?
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
                    {AREAS.map(a => (
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
