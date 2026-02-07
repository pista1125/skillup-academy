import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    ArrowLeft,
    RotateCcw,
    Trophy,
    Heart,
    Star,
    Zap,
    ArrowUp,
    ArrowDown,
    ArrowLeftIcon,
    ArrowRightIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };
type Operation = '+' | '-' | '×' | '÷';

interface MathProblem {
    question: string;
    answer: number;
}

const GRID_SIZE = 15;
const CELL_SIZE = 30;
const INITIAL_SPEED = 200;

function generateProblem(operation: Operation, grade: number): MathProblem {
    let maxNum = 10;

    if (grade === 1) maxNum = 10;
    else if (grade === 2) maxNum = 100;
    else if (grade === 3) maxNum = 100;
    else if (grade === 4) maxNum = 100;

    if (operation === '+') {
        const a = Math.floor(Math.random() * maxNum) + 1;
        const b = Math.floor(Math.random() * maxNum) + 1;
        return { question: `${a} + ${b}`, answer: a + b };
    } else if (operation === '-') {
        const a = Math.floor(Math.random() * maxNum) + 1;
        const b = Math.floor(Math.random() * a) + 1;
        return { question: `${a} - ${b}`, answer: a - b };
    } else if (operation === '×') {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        return { question: `${a} × ${b}`, answer: a * b };
    } else { // division
        const b = Math.floor(Math.random() * 9) + 2;
        const result = Math.floor(Math.random() * 10) + 1;
        const a = b * result;
        return { question: `${a} ÷ ${b}`, answer: result };
    }
}

function generateRandomNumbers(correctAnswer: number, count: number = 3): number[] {
    const numbers = new Set<number>([correctAnswer]);

    while (numbers.size < count) {
        const num = Math.floor(Math.random() * Math.max(20, correctAnswer * 2));
        if (num !== correctAnswer && num > 0) {
            numbers.add(num);
        }
    }

    return Array.from(numbers);
}

export function MathSnakeGame({ onBack, grade = 1 }: { onBack: () => void; grade?: number }) {
    const [operation, setOperation] = useState<Operation | null>(null);
    const [snake, setSnake] = useState<Position[]>([{ x: 7, y: 7 }]);
    const [direction, setDirection] = useState<Direction>('RIGHT');
    const [numbers, setNumbers] = useState<Array<{ pos: Position; value: number }>>([]);
    const [problem, setProblem] = useState<MathProblem>({ question: '', answer: 0 });
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [speed, setSpeed] = useState(INITIAL_SPEED);
    const directionRef = useRef<Direction>('RIGHT');
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

    const spawnNumbers = useCallback(() => {
        const availableNumbers = generateRandomNumbers(problem.answer, 4);
        const newNumbers: Array<{ pos: Position; value: number }> = [];

        availableNumbers.forEach(value => {
            let pos: Position;
            let attempts = 0;

            do {
                pos = {
                    x: Math.floor(Math.random() * GRID_SIZE),
                    y: Math.floor(Math.random() * GRID_SIZE)
                };
                attempts++;
            } while (
                attempts < 50 &&
                newNumbers.some(n => n.pos.x === pos.x && n.pos.y === pos.y)
            );

            if (attempts < 50) {
                newNumbers.push({ pos, value });
            }
        });

        setNumbers(newNumbers);
    }, [problem.answer]);

    const resetGame = useCallback(() => {
        if (!operation) return;
        setSnake([{ x: 7, y: 7 }]);
        setDirection('RIGHT');
        directionRef.current = 'RIGHT';
        setScore(0);
        setGameOver(false);
        setIsPaused(false);
        setSpeed(INITIAL_SPEED);
        const newProblem = generateProblem(operation, grade);
        setProblem(newProblem);
    }, [operation, grade]);

    useEffect(() => {
        if (operation) {
            const newProblem = generateProblem(operation, grade);
            setProblem(newProblem);
        }
    }, [operation, grade]);

    useEffect(() => {
        spawnNumbers();
    }, [problem, spawnNumbers]);

    const moveSnake = useCallback(() => {
        if (gameOver || isPaused) return;

        setSnake(prevSnake => {
            const head = prevSnake[0];
            let newHead: Position;

            switch (directionRef.current) {
                case 'UP':
                    newHead = { x: head.x, y: head.y - 1 };
                    break;
                case 'DOWN':
                    newHead = { x: head.x, y: head.y + 1 };
                    break;
                case 'LEFT':
                    newHead = { x: head.x - 1, y: head.y };
                    break;
                case 'RIGHT':
                    newHead = { x: head.x + 1, y: head.y };
                    break;
            }

            // Check wall collision
            if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
                setGameOver(true);
                return prevSnake;
            }

            // Check self collision
            if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                setGameOver(true);
                return prevSnake;
            }

            // Check number collision
            const eatenNumber = numbers.find(n => n.pos.x === newHead.x && n.pos.y === newHead.y);

            if (eatenNumber) {
                if (eatenNumber.value === problem.answer) {
                    // Correct answer
                    setScore(prev => prev + 10);
                    setSpeed(prev => Math.max(100, prev - 5));

                    confetti({
                        particleCount: 30,
                        spread: 50,
                        origin: { y: 0.6 },
                        colors: ['#10b981', '#34d399', '#6ee7b7']
                    });

                    const newProblem = generateProblem(operation!, grade);
                    setProblem(newProblem);

                    return [newHead, ...prevSnake];
                } else {
                    // Wrong answer
                    setScore(prev => Math.max(0, prev - 5));

                    // Generate new problem even on wrong answer
                    const newProblem = generateProblem(operation!, grade);
                    setProblem(newProblem);

                    if (prevSnake.length > 1) {
                        return [newHead, ...prevSnake.slice(0, -1)];
                    } else {
                        return [newHead];
                    }
                }
            }

            return [newHead, ...prevSnake.slice(0, -1)];
        });
    }, [gameOver, isPaused, numbers, problem.answer]);

    useEffect(() => {
        if (gameLoopRef.current) {
            clearInterval(gameLoopRef.current);
        }

        if (!gameOver && !isPaused) {
            gameLoopRef.current = setInterval(moveSnake, speed);
        }

        return () => {
            if (gameLoopRef.current) {
                clearInterval(gameLoopRef.current);
            }
        };
    }, [moveSnake, speed, gameOver, isPaused]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (gameOver) return;

            const key = e.key;
            const currentDir = directionRef.current;

            // Prevent default scrolling for arrow keys
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(key)) {
                e.preventDefault();
            }

            if (key === 'ArrowUp' && currentDir !== 'DOWN') {
                directionRef.current = 'UP';
                setDirection('UP');
            } else if (key === 'ArrowDown' && currentDir !== 'UP') {
                directionRef.current = 'DOWN';
                setDirection('DOWN');
            } else if (key === 'ArrowLeft' && currentDir !== 'RIGHT') {
                directionRef.current = 'LEFT';
                setDirection('LEFT');
            } else if (key === 'ArrowRight' && currentDir !== 'LEFT') {
                directionRef.current = 'RIGHT';
                setDirection('RIGHT');
            } else if (key === ' ') {
                setIsPaused(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameOver]);

    const handleDirectionClick = (newDirection: Direction) => {
        if (gameOver || isPaused) return;
        const currentDir = directionRef.current;

        if (newDirection === 'UP' && currentDir !== 'DOWN') {
            directionRef.current = 'UP';
            setDirection('UP');
        } else if (newDirection === 'DOWN' && currentDir !== 'UP') {
            directionRef.current = 'DOWN';
            setDirection('DOWN');
        } else if (newDirection === 'LEFT' && currentDir !== 'RIGHT') {
            directionRef.current = 'LEFT';
            setDirection('LEFT');
        } else if (newDirection === 'RIGHT' && currentDir !== 'LEFT') {
            directionRef.current = 'RIGHT';
            setDirection('RIGHT');
        }
    };

    // Operation selection screen
    if (!operation) {
        return (
            <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between px-2">
                    <Button variant="ghost" onClick={onBack} size="sm" className="hover:bg-slate-100 text-xs">
                        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                        Vissza
                    </Button>
                    <h2 className="text-2xl font-bold text-slate-800">Válassz műveletet!</h2>
                    <div className="w-16"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                    <button
                        onClick={() => setOperation('+')}
                        className="flex flex-col items-center p-8 bg-white border-2 border-blue-100 rounded-3xl hover:border-blue-400 hover:shadow-xl hover:scale-105 transition-all group"
                    >
                        <div className="p-6 bg-blue-100 text-blue-600 rounded-full mb-4 text-5xl font-black group-hover:rotate-12 transition-transform">
                            +
                        </div>
                        <h3 className="text-xl font-black text-blue-900">Összeadás</h3>
                    </button>

                    <button
                        onClick={() => setOperation('-')}
                        className="flex flex-col items-center p-8 bg-white border-2 border-emerald-100 rounded-3xl hover:border-emerald-400 hover:shadow-xl hover:scale-105 transition-all group"
                    >
                        <div className="p-6 bg-emerald-100 text-emerald-600 rounded-full mb-4 text-5xl font-black group-hover:rotate-12 transition-transform">
                            −
                        </div>
                        <h3 className="text-xl font-black text-emerald-900">Kivonás</h3>
                    </button>

                    <button
                        onClick={() => setOperation('×')}
                        className="flex flex-col items-center p-8 bg-white border-2 border-amber-100 rounded-3xl hover:border-amber-400 hover:shadow-xl hover:scale-105 transition-all group"
                    >
                        <div className="p-6 bg-amber-100 text-amber-600 rounded-full mb-4 text-5xl font-black group-hover:rotate-12 transition-transform">
                            ×
                        </div>
                        <h3 className="text-xl font-black text-amber-900">Szorzás</h3>
                    </button>

                    <button
                        onClick={() => setOperation('÷')}
                        className="flex flex-col items-center p-8 bg-white border-2 border-rose-100 rounded-3xl hover:border-rose-400 hover:shadow-xl hover:scale-105 transition-all group"
                    >
                        <div className="p-6 bg-rose-100 text-rose-600 rounded-full mb-4 text-5xl font-black group-hover:rotate-12 transition-transform">
                            ÷
                        </div>
                        <h3 className="text-xl font-black text-rose-900">Osztás</h3>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between bg-white/50 p-4 rounded-2xl border border-pink-100 shadow-sm">
                <Button variant="ghost" onClick={onBack} size="sm" className="hover:bg-slate-100 text-xs">
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    Vissza
                </Button>
                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        🐍 Matek Kígyó
                    </h2>
                    <span className="text-xs text-slate-500">Használd a nyilakat!</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                        <Trophy className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-xs font-bold text-amber-700">{score}</span>
                    </div>
                    <Button variant="ghost" onClick={resetGame} size="sm" className="text-muted-foreground text-xs">
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        Újra
                    </Button>
                </div>
            </div>

            <Card className="border-2 shadow-sm bg-gradient-to-br from-pink-50 to-purple-50 p-6">
                <div className="mb-6 text-center">
                    <div className="inline-block bg-white px-8 py-4 rounded-3xl border-4 border-pink-200 shadow-lg">
                        <p className="text-sm font-bold text-pink-600 mb-1">Melyik a helyes válasz?</p>
                        <p className="text-4xl font-black text-slate-800">{problem.question} = ?</p>
                    </div>
                </div>

                <div
                    className="relative mx-auto bg-white rounded-2xl border-4 border-slate-300 shadow-inner"
                    style={{
                        width: GRID_SIZE * CELL_SIZE,
                        height: GRID_SIZE * CELL_SIZE
                    }}
                >
                    {/* Grid */}
                    {Array.from({ length: GRID_SIZE }).map((_, y) =>
                        Array.from({ length: GRID_SIZE }).map((_, x) => (
                            <div
                                key={`${x}-${y}`}
                                className="absolute border border-slate-100"
                                style={{
                                    left: x * CELL_SIZE,
                                    top: y * CELL_SIZE,
                                    width: CELL_SIZE,
                                    height: CELL_SIZE,
                                }}
                            />
                        ))
                    )}

                    {/* Snake */}
                    {snake.map((segment, index) => (
                        <div
                            key={index}
                            className={cn(
                                "absolute rounded-lg transition-all duration-100",
                                index === 0
                                    ? "bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg z-10"
                                    : "bg-gradient-to-br from-emerald-300 to-emerald-500"
                            )}
                            style={{
                                left: segment.x * CELL_SIZE + 2,
                                top: segment.y * CELL_SIZE + 2,
                                width: CELL_SIZE - 4,
                                height: CELL_SIZE - 4,
                            }}
                        >
                            {index === 0 && (
                                <div className="flex items-center justify-center h-full text-white text-xs">
                                    {direction === 'UP' && '⬆️'}
                                    {direction === 'DOWN' && '⬇️'}
                                    {direction === 'LEFT' && '⬅️'}
                                    {direction === 'RIGHT' && '➡️'}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Numbers */}
                    {numbers.map((num, index) => (
                        <div
                            key={index}
                            className="absolute rounded-xl flex items-center justify-center font-black text-lg shadow-lg transition-all duration-200 hover:scale-110 bg-gradient-to-br from-blue-300 to-blue-500 text-white border-2 border-blue-600"
                            style={{
                                left: num.pos.x * CELL_SIZE + 2,
                                top: num.pos.y * CELL_SIZE + 2,
                                width: CELL_SIZE - 4,
                                height: CELL_SIZE - 4,
                            }}
                        >
                            {num.value}
                        </div>
                    ))}

                    {/* Game Over Overlay */}
                    {gameOver && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl backdrop-blur-sm">
                            <div className="bg-white p-8 rounded-3xl shadow-2xl text-center animate-in zoom-in duration-300">
                                <div className="text-6xl mb-4">😢</div>
                                <h3 className="text-3xl font-black text-slate-800 mb-2">Vége a játéknak!</h3>
                                <p className="text-xl font-bold text-slate-600 mb-4">Pontszám: {score}</p>
                                <Button
                                    onClick={resetGame}
                                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-8 py-3 rounded-2xl shadow-lg"
                                >
                                    Új játék
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Pause Overlay */}
                    {isPaused && !gameOver && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl backdrop-blur-sm">
                            <div className="bg-white p-6 rounded-2xl shadow-xl">
                                <p className="text-2xl font-black text-slate-800">Szünet</p>
                                <p className="text-sm text-slate-500 mt-1">Nyomd meg a SPACE-t a folytatáshoz</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl border-2 border-emerald-100 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Heart className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs font-bold text-emerald-600">Kígyó hossza</span>
                        </div>
                        <p className="text-2xl font-black text-slate-800">{snake.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border-2 border-blue-100 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Zap className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-bold text-blue-600">Sebesség</span>
                        </div>
                        <p className="text-2xl font-black text-slate-800">{Math.round((INITIAL_SPEED / speed) * 100)}%</p>
                    </div>
                </div>

                {/* Mobile Controls */}
                <div className="mt-6 md:hidden">
                    <p className="text-center text-sm font-bold text-slate-600 mb-3">Irányítás</p>
                    <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                        <div></div>
                        <Button
                            onClick={() => handleDirectionClick('UP')}
                            disabled={gameOver}
                            className="h-16 bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white rounded-2xl shadow-lg active:scale-95 transition-transform"
                        >
                            <ArrowUp className="w-8 h-8" />
                        </Button>
                        <div></div>
                        <Button
                            onClick={() => handleDirectionClick('LEFT')}
                            disabled={gameOver}
                            className="h-16 bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white rounded-2xl shadow-lg active:scale-95 transition-transform"
                        >
                            <ArrowLeftIcon className="w-8 h-8" />
                        </Button>
                        <Button
                            onClick={() => handleDirectionClick('DOWN')}
                            disabled={gameOver}
                            className="h-16 bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white rounded-2xl shadow-lg active:scale-95 transition-transform"
                        >
                            <ArrowDown className="w-8 h-8" />
                        </Button>
                        <Button
                            onClick={() => handleDirectionClick('RIGHT')}
                            disabled={gameOver}
                            className="h-16 bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white rounded-2xl shadow-lg active:scale-95 transition-transform"
                        >
                            <ArrowRightIcon className="w-8 h-8" />
                        </Button>
                    </div>
                </div>
            </Card>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4">
                <div className="text-4xl">💡</div>
                <div className="text-sm text-blue-900 space-y-2">
                    <p className="font-bold">Hogyan játssz?</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Használd a <strong>nyíl billentyűket</strong> a kígyó irányításához</li>
                        <li>Edd meg a <strong>helyes választ</strong> (sárga szám) hogy növekedj! 🎉</li>
                        <li>Kerüld a rossz válaszokat (piros számok) - ezek csökkentik a kígyót! 😱</li>
                        <li>Ne ütközz a falba vagy saját magadba!</li>
                        <li><strong>SPACE</strong> - szünet</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
