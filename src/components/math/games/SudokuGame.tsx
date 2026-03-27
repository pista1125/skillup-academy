import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, RefreshCw, Trophy, X, Flame, Check, Info, Timer, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import {
    generateSudoku,
    SudokuDifficulty,
    SudokuType,
    SudokuCell,
    isValid
} from '@/lib/sudokuUtils';

export function SudokuGame({ onBack }: { onBack: () => void }) {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'won'>('menu');
    const [type, setType] = useState<SudokuType>('classic');
    const [difficulty, setDifficulty] = useState<SudokuDifficulty>('medium');

    const [board, setBoard] = useState<number[][]>([]);
    const [initialBoard, setInitialBoard] = useState<number[][]>([]);
    const [solution, setSolution] = useState<number[][]>([]);
    const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
    const [lastError, setLastError] = useState<[number, number] | null>(null);

    const [mistakes, setMistakes] = useState(0);
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);

    // Timer logic
    useEffect(() => {
        let interval: any = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const startNewGame = (gameType: SudokuType, gameDifficulty: SudokuDifficulty) => {
        const { board: newBoard, solution: newSolution } = generateSudoku(gameType, gameDifficulty);
        setBoard(newBoard);
        setInitialBoard(newBoard.map(row => [...row]));
        setSolution(newSolution);
        setGameState('playing');
        setType(gameType);
        setDifficulty(gameDifficulty);
        setSelectedCell(null);
        setMistakes(0);
        setTime(0);
        setIsActive(true);
    };

    const handleCellClick = (row: number, col: number) => {
        if (gameState !== 'playing') return;
        setSelectedCell([row, col]);
    };

    const handleNumberInput = useCallback((num: number) => {
        if (!selectedCell || gameState !== 'playing') return;
        const [r, c] = selectedCell;

        // Don't overwrite initial clues
        if (initialBoard[r][c] !== 0) return;

        // Check if correct
        if (solution[r][c] === num) {
            const newBoard = board.map(row => [...row]);
            newBoard[r][c] = num;
            setBoard(newBoard);
            setLastError(null);

            // Check for win
            const isComplete = newBoard.every((row, ri) =>
                row.every((val, ci) => val === solution[ri][ci])
            );

            if (isComplete) {
                setGameState('won');
                setIsActive(false);
                confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
            }
        } else {
            setMistakes(prev => prev + 1);
            setLastError([r, c]);
            // Clear error after animation
            setTimeout(() => setLastError(null), 1000);
        }
    }, [selectedCell, board, solution, initialBoard, gameState]);

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key >= '1' && e.key <= '9') {
                handleNumberInput(parseInt(e.key));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNumberInput]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const renderGrid = () => {
        const size = type === 'mini4' ? 4 : type === 'mini6' ? 6 : 9;
        const subW = type === 'mini4' ? 2 : type === 'mini6' ? 3 : 3;
        const subH = type === 'mini4' ? 2 : type === 'mini6' ? 2 : 3;

        return (
            <div
                className={cn(
                    "grid gap-0 bg-slate-200 border-4 border-slate-800 rounded-xl overflow-hidden shadow-2xl mx-auto",
                    size === 4 ? "grid-cols-4 w-64 h-64" :
                        size === 6 ? "grid-cols-6 w-80 h-64" :
                            "grid-cols-9 w-[320px] h-[320px] sm:w-[450px] sm:h-[450px]"
                )}
            >
                {board.map((row, r) =>
                    row.map((val, c) => {
                        const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
                        const isRelated = selectedCell && (selectedCell[0] === r || selectedCell[1] === c);
                        const isSameValue = selectedCell && val !== 0 && val === board[selectedCell[0]][selectedCell[1]];
                        const isInitial = initialBoard[r][c] !== 0;
                        const isDiagonal = type === 'extreme' && (r === c || r + c === size - 1);
                        const isError = lastError?.[0] === r && lastError?.[1] === c;

                        return (
                            <div
                                key={`${r}-${c}`}
                                onClick={() => handleCellClick(r, c)}
                                className={cn(
                                    "flex items-center justify-center text-xl sm:text-2xl font-bold cursor-pointer transition-all border border-slate-300 relative",
                                    "hover:bg-primary/10",
                                    isSelected ? "bg-indigo-600 text-white ring-2 ring-inset ring-indigo-400 z-20 shadow-[0_0_15px_rgba(79,70,229,0.3)]" :
                                        isError ? "bg-rose-100 text-rose-600 animate-shake" :
                                            isSameValue ? "bg-indigo-100" :
                                                isRelated ? "bg-slate-50" : "bg-white",
                                    isInitial ? (isSelected ? "text-white" : "text-slate-900") : (isSelected ? "text-indigo-100" : "text-indigo-600"),
                                    // Thick borders for subgrids
                                    (c + 1) % subW === 0 && c < size - 1 && "border-r-4 border-r-slate-800",
                                    (r + 1) % subH === 0 && r < size - 1 && "border-b-4 border-b-slate-800",
                                    // Diagonal highlight for extreme
                                    isDiagonal && !isSelected && !isRelated && "bg-rose-50/50"
                                )}
                            >
                                {val !== 0 ? val : ""}
                                {isDiagonal && <div className="absolute inset-0 opacity-10 pointer-events-none border-t border-rose-200" />}
                            </div>
                        );
                    })
                )}
            </div>
        );
    };

    if (gameState === 'menu') {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 mb-12">
                    <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full bg-white shadow-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-4xl font-black text-slate-800">Sudoku Mester</h1>
                        <p className="text-slate-500 font-medium">Válaszd ki a játékmódot!</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Classic Mode */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-t-8 border-blue-500 hover:scale-[1.02] transition-transform">
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 font-bold text-2xl">9x9</div>
                        <h3 className="text-2xl font-black mb-2 text-slate-800">Klasszikus Sudoku</h3>
                        <p className="text-slate-500 mb-8 leading-relaxed">A hagyományos 9x9-es tábla 3x3-as blokkokkal. Tökéletes a logikus gondolkodás fejlesztéséhez.</p>

                        <div className="grid grid-cols-2 gap-3">
                            <Button onClick={() => startNewGame('classic', 'easy')} variant="outline" className="rounded-xl border-blue-100 hover:bg-blue-50 text-blue-700 font-bold">Kezdő</Button>
                            <Button onClick={() => startNewGame('classic', 'medium')} variant="outline" className="rounded-xl border-blue-100 hover:bg-blue-50 text-blue-700 font-bold">Közepes</Button>
                            <Button onClick={() => startNewGame('classic', 'hard')} variant="outline" className="rounded-xl border-blue-100 hover:bg-blue-50 text-blue-700 font-bold">Haladó</Button>
                            <Button onClick={() => startNewGame('classic', 'expert')} variant="outline" className="rounded-xl border-blue-100 hover:bg-blue-50 text-blue-700 font-bold">Profi</Button>
                        </div>
                    </div>

                    {/* Extreme Mode */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-xl border-t-8 border-rose-500 hover:scale-[1.02] transition-transform relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4">
                            <Flame className="w-8 h-8 text-rose-500 animate-pulse" />
                        </div>
                        <div className="w-16 h-16 bg-rose-500/20 rounded-2xl flex items-center justify-center text-rose-500 mb-6 font-bold text-2xl">X</div>
                        <h3 className="text-2xl font-black mb-2 text-white">Extrém Sudoku-X</h3>
                        <p className="text-slate-400 mb-8 leading-relaxed">Extra szabály! A két főátló mentén is szerepelnie kell minden számnak 1-től 9-ig egyszer.</p>

                        <div className="grid grid-cols-2 gap-3">
                            <Button onClick={() => startNewGame('extreme', 'medium')} className="rounded-xl bg-rose-600 hover:bg-rose-700 font-bold shadow-lg shadow-rose-900/40 border-none">Játék</Button>
                            <Button onClick={() => startNewGame('extreme', 'hard')} variant="outline" className="rounded-xl border-rose-500/30 hover:bg-rose-500/10 text-rose-400 font-bold">Haladó</Button>
                        </div>
                    </div>

                    {/* Mini Modes */}
                    <div className="bg-emerald-50 rounded-[2rem] p-6 shadow-md border border-emerald-100">
                        <h3 className="text-xl font-bold mb-4 text-emerald-800">Junior Sudoku (Kisebbeknek)</h3>
                        <div className="flex gap-4">
                            <Button onClick={() => startNewGame('mini4', 'easy')} className="flex-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-bold">4x4 Feladat</Button>
                            <Button onClick={() => startNewGame('mini6', 'medium')} className="flex-1 rounded-xl bg-teal-500 hover:bg-teal-600 font-bold">6x6 Feladat</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 overflow-x-auto gap-4 pb-2">
                <div className="flex items-center gap-3 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => setGameState('menu')} className="rounded-full bg-white">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-black text-slate-800 whitespace-nowrap">
                                {type === 'classic' ? 'Klasszikus' : type === 'extreme' ? 'Extrém-X' : 'Junior'} Sudoku
                            </h2>
                            <span className={cn(
                                "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                difficulty === 'easy' ? "bg-emerald-100 text-emerald-700" :
                                    difficulty === 'medium' ? "bg-blue-100 text-blue-700" :
                                        difficulty === 'hard' ? "bg-orange-100 text-orange-700" : "bg-rose-100 text-rose-700"
                            )}>
                                {difficulty === 'easy' ? 'Kezdő' : difficulty === 'medium' ? 'Közepes' : difficulty === 'hard' ? 'Haladó' : 'Profi'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <Timer className="w-4 h-4 text-primary" />
                        <span className="font-mono font-bold text-slate-700 tabular-nums">{formatTime(time)}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <AlertCircle className="w-4 h-4 text-rose-500" />
                        <span className="font-bold text-slate-700">Hibák: <span className="text-rose-500">{mistakes}</span></span>
                    </div>
                    <Button variant="ghost" onClick={() => startNewGame(type, difficulty)} className="p-2 h-auto rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                        <RefreshCw className="w-5 h-5 text-slate-400" />
                    </Button>
                </div>
            </div>

            {/* Main Game Area */}
            <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
                {renderGrid()}

                {/* Controls */}
                <div className="w-full max-w-[320px] shrink-0">
                    <div className="grid grid-cols-3 gap-3 mb-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => {
                            const size = type === 'mini4' ? 4 : type === 'mini6' ? 6 : 9;
                            if (num > size) return null;
                            return (
                                <button
                                    key={num}
                                    onClick={() => handleNumberInput(num)}
                                    className="h-16 rounded-2xl bg-white border-2 border-slate-100 text-2xl font-black text-slate-700 hover:border-primary hover:text-primary hover:shadow-lg transition-all active:scale-95"
                                >
                                    {num}
                                </button>
                            );
                        })}
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                            <p className="text-xs text-blue-700 font-medium leading-relaxed">
                                Kattints egy mezőre a kijelöléshez, majd válaszd ki a számot alulról, vagy gépeld be a billentyűzeten!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Victory Modal */}
            {gameState === 'won' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
                            <Trophy className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-2">Szép munka!</h2>
                        <p className="text-slate-500 mb-8">Sikeresen kitöltötted a rácsot!</p>

                        <div className="flex flex-col gap-4 mb-8">
                            <div className="flex items-center justify-between px-6 py-3 bg-slate-50 rounded-2xl">
                                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Időeredmény</span>
                                <span className="font-mono text-xl font-bold text-slate-700">{formatTime(time)}</span>
                            </div>
                            <div className="flex items-center justify-between px-6 py-3 bg-slate-50 rounded-2xl">
                                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Összes hiba</span>
                                <span className="text-xl font-bold text-rose-500">{mistakes}</span>
                            </div>
                        </div>

                        <Button
                            onClick={() => setGameState('menu')}
                            className="w-full rounded-2xl h-14 text-lg font-black bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                        >
                            Vissza a menübe
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
