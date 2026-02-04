import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dices, RotateCcw, TrendingUp, BarChart3, MoveLeft, MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const NUM_POSITIONS = 21; // -10 to +10
const CENTER_INDEX = 10;

export function RandomWalkSimulation() {
    const [position, setPosition] = useState(0); // Relative to zero
    const [lastRoll, setLastRoll] = useState<number | null>(null);
    const [stepCount, setStepCount] = useState(0);
    const [history, setHistory] = useState<number[]>([]);
    const [isSimulating, setIsSimulating] = useState(false);

    const rollDice = () => {
        const roll = Math.floor(Math.random() * 6) + 1;
        setLastRoll(roll);

        // Even = Right, Odd = Left (matching python logic)
        const move = roll % 2 === 0 ? 1 : -1;

        const newPos = Math.max(-10, Math.min(10, position + move));
        setPosition(newPos);
        setStepCount(prev => prev + 1);
        setHistory(prev => [...prev.slice(-10), newPos]);
        return move;
    };

    const reset = () => {
        setPosition(CENTER_INDEX - 10);
        setPosition(0);
        setLastRoll(null);
        setStepCount(0);
        setHistory([]);
        setIsSimulating(false);
    };

    const runMultiSim = async () => {
        setIsSimulating(true);
        let count = 0;
        const interval = setInterval(() => {
            rollDice();
            count++;
            if (count >= 20) {
                clearInterval(interval);
                setIsSimulating(false);
            }
        }, 100);
    };

    return (
        <div className="space-y-6">
            <Card className="bg-white shadow-xl border-physics/20">
                <CardHeader className="pb-2 border-b bg-slate-50/50">
                    <CardTitle className="text-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-physics" />
                            <span>Bolyongás a számegyenesen</span>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={reset}>
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Visszaállítás
                            </Button>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-10 pb-16 relative overflow-x-auto">
                    {/* Number Line */}
                    <div className="relative h-20 min-w-[600px] flex items-center px-10">
                        {/* Main Axis */}
                        <div className="absolute left-10 right-10 h-1 bg-slate-300 rounded-full" />

                        {/* Ticks and Numbers */}
                        {Array.from({ length: NUM_POSITIONS }).map((_, i) => {
                            const val = i - 10;
                            const isCurrent = val === position;
                            return (
                                <div
                                    key={i}
                                    className="absolute flex flex-col items-center transition-all duration-300"
                                    style={{ left: `calc(40px + ${((i) / (NUM_POSITIONS - 1)) * 100}% - 40px)` }}
                                >
                                    <div className={cn("h-4 w-0.5 mb-2", val % 5 === 0 ? "bg-slate-800 h-6" : "bg-slate-400")} />
                                    <span className={cn(
                                        "text-xs font-mono font-bold",
                                        val === 0 ? "text-slate-900 scale-125" : "text-slate-400",
                                        isCurrent && "text-physics scale-150"
                                    )}>
                                        {val}
                                    </span>

                                    {/* The Ball */}
                                    {isCurrent && (
                                        <div className="absolute -top-16 flex flex-col items-center animate-bounce-in">
                                            <div className="w-10 h-10 bg-physics rounded-full shadow-lg border-4 border-white flex items-center justify-center text-white scale-110">
                                                {lastRoll && (
                                                    <span className="text-xs font-bold">
                                                        {lastRoll % 2 === 0 ? <MoveRight className="w-4 h-4" /> : <MoveLeft className="w-4 h-4" />}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-physics mt-1" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Dice Card */}
                <Card className="bg-gradient-to-br from-physics/10 to-transparent border-physics/20">
                    <CardContent className="pt-6 flex flex-col items-center gap-4">
                        <div className={cn(
                            "w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center text-4xl font-bold text-physics transition-all duration-300",
                            lastRoll ? "rotate-12 scale-110" : "opacity-50"
                        )}>
                            {lastRoll || "?"}
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <Button
                                onClick={rollDice}
                                disabled={isSimulating}
                                className="w-full bg-physics hover:bg-physics/90 h-12"
                            >
                                <Dices className="w-5 h-5 mr-2" />
                                Dobás
                            </Button>
                            <Button
                                variant="outline"
                                onClick={runMultiSim}
                                disabled={isSimulating}
                                className="w-full h-10"
                            >
                                <BarChart3 className="w-5 h-5 mr-2" />
                                20 gyors lépés
                            </Button>
                        </div>
                        <p className="text-[10px] text-muted-foreground text-center">
                            Páros dobás (2, 4, 6) = Jobbra (+1)<br />
                            Páratlan dobás (1, 3, 5) = Balra (-1)
                        </p>
                    </CardContent>
                </Card>

                {/* Info Card */}
                <Card className="md:col-span-2 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex justify-between mb-4">
                            <div className="text-center flex-1">
                                <div className="text-2xl font-bold text-physics">{stepCount}</div>
                                <div className="text-[10px] uppercase text-muted-foreground font-bold">Lépések száma</div>
                            </div>
                            <div className="w-px bg-slate-200 h-10 self-center" />
                            <div className="text-center flex-1">
                                <div className="text-2xl font-bold text-physics">{position}</div>
                                <div className="text-[10px] uppercase text-muted-foreground font-bold">Jelenlegi hely</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                                <span>Utolsó mozgások</span>
                                <div className="h-px flex-1 bg-slate-100" />
                            </div>
                            <div className="flex gap-1 h-8">
                                {history.map((h, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-mono font-bold"
                                    >
                                        {h > 0 ? `+${h}` : h}
                                    </div>
                                ))}
                                {history.length === 0 && (
                                    <div className="w-full text-[10px] text-slate-300 flex items-center justify-center italic">
                                        Dobj a kockával a kezdéshez!
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 p-3 bg-blue-50 rounded-lg text-blue-700 text-[10px] leading-tight flex gap-2">
                            <TrendingUp className="w-4 h-4 shrink-0" />
                            <p>
                                A <strong>véletlen bolyongás</strong> a statisztikai fizika egyik alapfogalma. Érdekesség, hogy sok lépés után a pozíciók eloszlása egy haranggörbét (normál eloszlást) fog mutatni 0 körül.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
