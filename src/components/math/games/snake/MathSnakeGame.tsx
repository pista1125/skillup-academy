import { useState, useEffect, useCallback, useRef, TouchEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    ArrowLeft,
    RotateCcw,
    Trophy,
    Heart,
    ArrowUp,
    ArrowDown,
    ArrowLeftIcon,
    ArrowRightIcon,
    Flame,
    Pause,
    Play,
    ChevronRight,
    School,
    CheckCircle2,
    Maximize2,
    Minimize2,
    Palette
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import {
    OperationType,
    DifficultyType,
    MathProblem,
    OPERATION_DEFINITIONS,
    DIFFICULTY_CONFIG,
    getAvailableOperationsForGrade,
    generateSnakeProblem,
    generateSnakeDistractors
} from './mathSnakeGenerator';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };
type MenuStep = 'GRADE' | 'OPERATION' | 'DIFFICULTY' | 'PLAYING';
type BoardTheme = 'DARK' | 'BLACK';

const GRID_SIZE = 15;

interface GradeCategory {
    title: string;
    description: string;
    badgeColor: string;
    grades: Array<{ grade: number; label: string; desc: string; icon: string }>;
}

const GRADE_CATEGORIES: GradeCategory[] = [
    {
        title: 'Alsó tagozat',
        description: '1–4. osztály: Alapműveletek, szorzótáblák és bennfoglalás',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        grades: [
            { grade: 1, label: '1. osztály', desc: 'Összeadás és kivonás 20-ig', icon: '🌱' },
            { grade: 2, label: '2. osztály', desc: 'Szorzótábla alapok (2, 5, 10) & 100-as kör', icon: '🌿' },
            { grade: 3, label: '3. osztály', desc: 'Teljes szorzótábla és bennfoglalás 1000-ig', icon: '🌳' },
            { grade: 4, label: '4. osztály', desc: 'Szorzás, osztás és fejszámolás 10 000-ig', icon: '🍎' }
        ]
    },
    {
        title: 'Felső tagozat',
        description: '5–8. osztály: Többjegyű szorzás-osztás, negatív számok és hatványozás',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
        grades: [
            { grade: 5, label: '5. osztály', desc: 'Minden szám szorzása & osztása', icon: '📐' },
            { grade: 6, label: '6. osztály', desc: 'Negatív számok és törtrészek', icon: '⚡' },
            { grade: 7, label: '7. osztály', desc: 'Hatványozás (xⁿ) & negatív műveletek', icon: '🚀' },
            { grade: 8, label: '8. osztály', desc: 'Összetett hatványok és algebra', icon: '🌌' }
        ]
    },
    {
        title: 'Középiskola',
        description: '9–12. osztály: 6 művelet (+, −, ×, ÷, xⁿ, √x) és érettségi szint',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
        grades: [
            { grade: 9, label: '9. osztály', desc: 'Gyökvonás (√x) bevezetése, 6 művelet', icon: '💎' },
            { grade: 10, label: '10. osztály', desc: 'Gyökök, hatványok, logaritmus', icon: '🔮' },
            { grade: 11, label: '11. osztály', desc: 'Felsőfokú gyökvonás és kombinatorika', icon: '👑' },
            { grade: 12, label: '12. osztály', desc: 'Érettségi szintű összetett feladatok', icon: '🏆' }
        ]
    }
];

const INITIAL_SNAKE: Position[] = [
    { x: 7, y: 7 },
    { x: 6, y: 7 },
    { x: 5, y: 7 }
];

const isOppositeDirection = (dir1: Direction, dir2: Direction): boolean => {
    return (
        (dir1 === 'UP' && dir2 === 'DOWN') ||
        (dir1 === 'DOWN' && dir2 === 'UP') ||
        (dir1 === 'LEFT' && dir2 === 'RIGHT') ||
        (dir1 === 'RIGHT' && dir2 === 'LEFT')
    );
};

export function MathSnakeGame({ onBack, grade: initialGrade }: { onBack: () => void; grade?: number }) {
    // Menu navigation state
    const [step, setStep] = useState<MenuStep>('GRADE');
    const [selectedGrade, setSelectedGrade] = useState<number>(initialGrade || 1);
    const [selectedOperation, setSelectedOperation] = useState<OperationType | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyType>('MEDIUM');

    // Visual preferences
    const [boardTheme, setBoardTheme] = useState<BoardTheme>('DARK');
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [cellSize, setCellSize] = useState<number>(32);

    // Snake game state
    const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
    const [direction, setDirection] = useState<Direction>('RIGHT');
    const [numbers, setNumbers] = useState<Array<{ pos: Position; value: number }>>([]);
    const [problem, setProblem] = useState<MathProblem | null>(null);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [speed, setSpeed] = useState(DIFFICULTY_CONFIG.MEDIUM.speed);

    const directionRef = useRef<Direction>('RIGHT');
    const lastMovedDirectionRef = useRef<Direction>('RIGHT');
    const directionQueueRef = useRef<Direction[]>([]);
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);
    const SWIPE_THRESHOLD = 20;

    // Available operations for the chosen grade
    const availableOps = getAvailableOperationsForGrade(selectedGrade);

    // Responsive cell size calculator
    const updateCellSize = useCallback(() => {
        if (typeof window === 'undefined') return;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;

        // Calculate available space
        const availableW = screenW - 24;
        // In fullscreen, also consider vertical height constraints on mobile
        const maxDim = isFullscreen
            ? Math.min(availableW, screenH - 180, 520)
            : Math.min(availableW, 480);

        const calculated = Math.max(18, Math.min(32, Math.floor(maxDim / GRID_SIZE)));
        setCellSize(calculated);
    }, [isFullscreen]);

    useEffect(() => {
        updateCellSize();
        window.addEventListener('resize', updateCellSize);
        return () => window.removeEventListener('resize', updateCellSize);
    }, [updateCellSize]);

    // Scroll to top whenever step / menu screen changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

    // Fullscreen toggle handler
    const toggleFullscreen = () => {
        setIsFullscreen(prev => !prev);
    };

    // Safe direction queue handler
    const queueDirection = useCallback((newDirection: Direction) => {
        if (gameOver || isPaused) return;

        const lastPlannedDirection = directionQueueRef.current.length > 0
            ? directionQueueRef.current[directionQueueRef.current.length - 1]
            : lastMovedDirectionRef.current;

        if (!isOppositeDirection(lastPlannedDirection, newDirection) && lastPlannedDirection !== newDirection) {
            if (directionQueueRef.current.length < 2) {
                directionQueueRef.current.push(newDirection);
            }
        }
    }, [gameOver, isPaused]);

    // Spawn numbers on the board
    const spawnNumbers = useCallback((targetProblem: MathProblem) => {
        const distractors = generateSnakeDistractors(targetProblem.answer, 3);
        const allValues = [targetProblem.answer, ...distractors].sort(() => Math.random() - 0.5);
        const newNumbers: Array<{ pos: Position; value: number }> = [];

        allValues.forEach(value => {
            let pos: Position;
            let attempts = 0;

            do {
                pos = {
                    x: Math.floor(Math.random() * GRID_SIZE),
                    y: Math.floor(Math.random() * GRID_SIZE)
                };
                attempts++;
            } while (
                attempts < 60 &&
                (newNumbers.some(n => n.pos.x === pos.x && n.pos.y === pos.y) ||
                 snake.some(s => s.x === pos.x && s.y === pos.y))
            );

            if (attempts < 60) {
                newNumbers.push({ pos, value });
            }
        });

        setNumbers(newNumbers);
    }, [snake]);

    // Start a new round / problem
    const nextRound = useCallback((op: OperationType, gr: number, diff: DifficultyType) => {
        const newProb = generateSnakeProblem(op, gr, diff);
        setProblem(newProb);
        spawnNumbers(newProb);
    }, [spawnNumbers]);

    // Reset game session
    const resetGame = useCallback(() => {
        if (!selectedOperation) return;
        setSnake(INITIAL_SNAKE);
        setDirection('RIGHT');
        directionRef.current = 'RIGHT';
        lastMovedDirectionRef.current = 'RIGHT';
        directionQueueRef.current = [];
        setScore(0);
        setStreak(0);
        setCorrectCount(0);
        setGameOver(false);
        setIsPaused(false);
        setIsStarted(false);
        setSpeed(DIFFICULTY_CONFIG[selectedDifficulty].speed);
        nextRound(selectedOperation, selectedGrade, selectedDifficulty);
    }, [selectedOperation, selectedGrade, selectedDifficulty, nextRound]);

    // Launch game when difficulty is selected
    const startGame = (diff: DifficultyType) => {
        setSelectedDifficulty(diff);
        setSpeed(DIFFICULTY_CONFIG[diff].speed);
        setStep('PLAYING');
        setSnake(INITIAL_SNAKE);
        setDirection('RIGHT');
        directionRef.current = 'RIGHT';
        lastMovedDirectionRef.current = 'RIGHT';
        directionQueueRef.current = [];
        setScore(0);
        setStreak(0);
        setCorrectCount(0);
        setGameOver(false);
        setIsPaused(false);
        setIsStarted(false);

        if (selectedOperation) {
            const newProb = generateSnakeProblem(selectedOperation, selectedGrade, diff);
            setProblem(newProb);
            spawnNumbers(newProb);
        }
    };

    // Snake movement loop
    const moveSnake = useCallback(() => {
        if (gameOver || isPaused || !isStarted || !problem || !selectedOperation) return;

        // Dequeue next queued direction if available
        if (directionQueueRef.current.length > 0) {
            const nextDirection = directionQueueRef.current.shift()!;
            directionRef.current = nextDirection;
            setDirection(nextDirection);
        }

        const currentDir = directionRef.current;
        lastMovedDirectionRef.current = currentDir;

        setSnake(prevSnake => {
            const head = prevSnake[0];
            let newHead: Position;

            switch (currentDir) {
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
                    // Correct answer!
                    setStreak(prev => {
                        const newStreak = prev + 1;
                        if (newStreak > bestStreak) setBestStreak(newStreak);
                        return newStreak;
                    });
                    setCorrectCount(prev => prev + 1);

                    const points = 10 + Math.min(streak * 2, 20);
                    setScore(prev => prev + points);

                    // Speed up slightly
                    setSpeed(prev => Math.max(90, prev - 4));

                    confetti({
                        particleCount: 35,
                        spread: 55,
                        origin: { y: 0.6 },
                        colors: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899']
                    });

                    // Advance problem
                    const nextProb = generateSnakeProblem(selectedOperation, selectedGrade, selectedDifficulty);
                    setProblem(nextProb);
                    spawnNumbers(nextProb);

                    return [newHead, ...prevSnake];
                } else {
                    // Wrong answer!
                    setStreak(0);
                    setScore(prev => Math.max(0, prev - 5));

                    // Regenerate problem
                    const nextProb = generateSnakeProblem(selectedOperation, selectedGrade, selectedDifficulty);
                    setProblem(nextProb);
                    spawnNumbers(nextProb);

                    if (prevSnake.length > 1) {
                        return [newHead, ...prevSnake.slice(0, -1)];
                    } else {
                        return [newHead];
                    }
                }
            }

            return [newHead, ...prevSnake.slice(0, -1)];
        });
    }, [gameOver, isPaused, isStarted, problem, selectedOperation, numbers, streak, bestStreak, selectedGrade, selectedDifficulty, spawnNumbers]);

    // Game loop timer
    useEffect(() => {
        if (gameLoopRef.current) {
            clearInterval(gameLoopRef.current);
        }

        if (step === 'PLAYING' && !gameOver && !isPaused && isStarted) {
            gameLoopRef.current = setInterval(moveSnake, speed);
        }

        return () => {
            if (gameLoopRef.current) {
                clearInterval(gameLoopRef.current);
            }
        };
    }, [step, moveSnake, speed, gameOver, isPaused, isStarted]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (step !== 'PLAYING' || gameOver) return;

            const key = e.key.toLowerCase();

            if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd', ' '].includes(key)) {
                e.preventDefault();
            }

            if (key === 'arrowup' || key === 'w') {
                queueDirection('UP');
            } else if (key === 'arrowdown' || key === 's') {
                queueDirection('DOWN');
            } else if (key === 'arrowleft' || key === 'a') {
                queueDirection('LEFT');
            } else if (key === 'arrowright' || key === 'd') {
                queueDirection('RIGHT');
            } else if (key === ' ' || key === 'p') {
                setIsPaused(prev => !prev);
            } else if (key === 'escape' && isFullscreen) {
                setIsFullscreen(false);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [step, gameOver, isFullscreen, queueDirection]);

    const handleDirectionClick = (newDirection: Direction) => {
        queueDirection(newDirection);
    };

    const handleTouchStart = (e: TouchEvent) => {
        touchStartRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    };

    const handleTouchEnd = (e: TouchEvent) => {
        if (!touchStartRef.current) return;

        const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
        const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
                if (deltaX > 0) {
                    queueDirection('RIGHT');
                } else {
                    queueDirection('LEFT');
                }
            }
        } else {
            if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
                if (deltaY > 0) {
                    queueDirection('DOWN');
                } else {
                    queueDirection('UP');
                }
            }
        }

        touchStartRef.current = null;
    };

    // ==========================================
    // STEP 1: GRADE SELECTION SCREEN (1-12)
    // ==========================================
    if (step === 'GRADE') {
        return (
            <div className="flex flex-col gap-3 w-full px-1 sm:px-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-emerald-100 shadow-sm w-full">
                    <Button variant="ghost" onClick={onBack} size="sm" className="hover:bg-slate-100 text-xs sm:text-sm font-bold h-9 px-3.5 rounded-xl">
                        <ArrowLeft className="w-4 h-4 mr-1.5" />
                        Vissza a játékokhoz
                    </Button>
                    <div className="text-center">
                        <h1 className="text-base sm:text-xl font-black bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent flex items-center justify-center gap-2">
                            <span>🐍</span> Matek Kígyó 1–12. Osztály
                        </h1>
                    </div>
                    <div className="w-28 hidden sm:block"></div>
                </div>

                {/* Grade Sections */}
                <div className="space-y-3 w-full">
                    {GRADE_CATEGORIES.map((cat, idx) => (
                        <div key={idx} className="bg-white/95 rounded-2xl p-3.5 sm:p-4 border-2 shadow-sm space-y-2 w-full">
                            <div className="flex items-center justify-between gap-2 border-b pb-1.5">
                                <h2 className="text-sm sm:text-base font-black text-slate-800 flex items-center gap-2">
                                    <School className="w-4 h-4 text-emerald-600" />
                                    {cat.title}
                                </h2>
                                <span className={cn("text-xs font-bold px-2.5 py-0.5 rounded-full border", cat.badgeColor)}>
                                    {cat.grades[0].grade}–{cat.grades[cat.grades.length - 1].grade}. évfolyam
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                                {cat.grades.map(g => {
                                    const isSelected = selectedGrade === g.grade;
                                    return (
                                        <button
                                            key={g.grade}
                                            onClick={() => {
                                                setSelectedGrade(g.grade);
                                                setStep('OPERATION');
                                            }}
                                            className={cn(
                                                "group flex items-center justify-between p-3 sm:p-3.5 rounded-2xl text-left border-2 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 bg-white",
                                                isSelected
                                                    ? "border-emerald-500 ring-2 ring-emerald-400/40 bg-emerald-50/50 shadow-sm"
                                                    : "border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/20"
                                            )}
                                        >
                                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                                <span className="text-2xl p-1.5 bg-slate-100 rounded-xl group-hover:scale-110 transition-transform flex-shrink-0">
                                                    {g.icon}
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <div className="font-black text-slate-800 text-sm sm:text-base group-hover:text-emerald-700 transition-colors truncate">
                                                        {g.label}
                                                    </div>
                                                    <div className="text-xs text-slate-500 font-medium truncate mt-0.5">
                                                        {g.desc}
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-colors flex-shrink-0 ml-1" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // ==========================================
    // STEP 2: OPERATION SELECTION SCREEN - 2 ROWS & LARGER CARDS
    // ==========================================
    if (step === 'OPERATION') {
        return (
            <div className="flex flex-col gap-4 w-full px-1 sm:px-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-emerald-100 shadow-sm w-full">
                    <Button
                        variant="ghost"
                        onClick={() => setStep('GRADE')}
                        size="sm"
                        className="hover:bg-slate-100 text-xs sm:text-sm font-bold h-9 px-3.5 rounded-xl"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1.5" />
                        Osztály módosítása
                    </Button>
                    <div className="text-center flex items-center gap-2">
                        <Badge variant="outline" className="bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold px-3 py-1">
                            🎓 {selectedGrade}. osztály
                        </Badge>
                        <span className="text-base sm:text-lg font-black text-slate-800">
                            Válassz műveletet!
                        </span>
                    </div>
                    <div className="w-28 hidden sm:block"></div>
                </div>

                {/* Operations Grid: 2-Row Layout with Larger Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 w-full">
                    {availableOps.map(opKey => {
                        const meta = OPERATION_DEFINITIONS[opKey];
                        return (
                            <button
                                key={opKey}
                                onClick={() => {
                                    setSelectedOperation(opKey);
                                    setStep('DIFFICULTY');
                                }}
                                className={cn(
                                    "group relative flex flex-col items-center text-center p-5 sm:p-6 rounded-3xl bg-white border-2 transition-all duration-200 hover:shadow-xl hover:-translate-y-1",
                                    meta.borderColor
                                )}
                            >
                                <div className={cn(
                                    "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-black text-white shadow-md mb-3 group-hover:scale-110 transition-transform bg-gradient-to-br",
                                    meta.color
                                )}>
                                    {meta.symbol}
                                </div>
                                <h3 className="text-base sm:text-lg font-black text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">
                                    {meta.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                                    {meta.description}
                                </p>
                                <div className="mt-auto w-full py-2 px-3 rounded-xl bg-slate-50 font-bold text-xs sm:text-sm text-slate-700 flex items-center justify-center gap-1 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <span>Kiválasztás</span>
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Info Box about Grade Unlocks */}
                <div className="bg-amber-50/90 rounded-2xl p-3 border border-amber-200 text-xs text-amber-900 flex items-center gap-2.5 w-full">
                    <span className="text-base">💡</span>
                    <p className="text-amber-800">
                        1. o: +, − • 2. o: × (alapok) • 3. o: ÷ • 7. o: Hatványozás (xⁿ) • 9. o: Gyökvonás (√x).
                    </p>
                </div>
            </div>
        );
    }

    // ==========================================
    // STEP 3: DIFFICULTY SELECTION SCREEN
    // ==========================================
    if (step === 'DIFFICULTY') {
        const opMeta = selectedOperation ? OPERATION_DEFINITIONS[selectedOperation] : null;

        return (
            <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto px-1 sm:px-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-emerald-100 shadow-sm w-full">
                    <Button
                        variant="ghost"
                        onClick={() => setStep('OPERATION')}
                        size="sm"
                        className="hover:bg-slate-100 text-xs sm:text-sm font-bold h-9 px-3.5 rounded-xl"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1.5" />
                        Műveletváltás
                    </Button>
                    <div className="text-center flex items-center gap-2">
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-300 text-xs sm:text-sm font-bold">
                            🎓 {selectedGrade}. osztály
                        </Badge>
                        {opMeta && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 text-xs sm:text-sm font-bold">
                                {opMeta.symbol} {opMeta.title}
                            </Badge>
                        )}
                        <span className="text-sm sm:text-base font-black text-slate-800 hidden sm:inline">
                            Nehézség választása
                        </span>
                    </div>
                    <div className="w-28 hidden sm:block"></div>
                </div>

                {/* Difficulty Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full">
                    {(['EASY', 'MEDIUM', 'HARD'] as DifficultyType[]).map(diffKey => {
                        const config = DIFFICULTY_CONFIG[diffKey];
                        const isSelected = selectedDifficulty === diffKey;

                        return (
                            <button
                                key={diffKey}
                                onClick={() => startGame(diffKey)}
                                className={cn(
                                    "group relative flex flex-col p-5 sm:p-6 rounded-3xl bg-white border-2 text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
                                    config.color,
                                    isSelected && "ring-2 ring-emerald-400"
                                )}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-black px-3 py-1 rounded-full bg-white shadow-sm border border-slate-200">
                                        {config.badge}
                                    </span>
                                    <Flame className={cn(
                                        "w-5 h-5",
                                        diffKey === 'EASY' ? "text-emerald-500" : diffKey === 'MEDIUM' ? "text-blue-500" : "text-rose-500"
                                    )} />
                                </div>
                                <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1.5">
                                    {config.label}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                                    {config.desc}
                                </p>
                                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-emerald-600">
                                    <span>Indítás</span>
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    // ==========================================
    // STEP 4: PLAYING SCREEN
    // ==========================================
    const opMeta = selectedOperation ? OPERATION_DEFINITIONS[selectedOperation] : null;
    const boardBgClass = boardTheme === 'BLACK' ? 'bg-black' : 'bg-slate-950';

    // ----------------------------------------------------
    // DEDICATED FULLSCREEN MODE (Clean, No-Distraction View)
    // ----------------------------------------------------
    if (isFullscreen) {
        return (
            <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-between p-2 sm:p-4 overflow-y-auto select-none min-h-screen">
                {/* Minimal Top Control Bar */}
                <div className="flex items-center justify-between w-full max-w-lg px-1 pt-1 pb-1">
                    <div className="flex items-center gap-1.5">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setIsFullscreen(false);
                                setStep('OPERATION');
                            }}
                            className="text-slate-300 hover:text-white text-xs font-bold h-7 px-2"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                            Menü
                        </Button>
                        <Badge variant="outline" className="text-emerald-400 border-emerald-400/40 text-xs font-bold px-2 py-0.5">
                            🏆 {score} pont
                        </Badge>
                        {streak > 1 && (
                            <Badge className="bg-amber-500 text-white text-[11px] font-black px-2 py-0.5 animate-bounce">
                                🔥 {streak}x
                            </Badge>
                        )}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setBoardTheme(prev => prev === 'DARK' ? 'BLACK' : 'DARK')}
                            className="text-xs h-7 px-2 border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
                        >
                            <Palette className="w-3 h-3 mr-1 text-emerald-400" />
                            <span>{boardTheme === 'DARK' ? 'Kék' : 'Fekete'}</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleFullscreen}
                            className="text-xs h-7 px-2 border-slate-700 bg-slate-900 text-amber-400 hover:bg-slate-800 font-bold"
                        >
                            <Minimize2 className="w-3.5 h-3.5 mr-1" />
                            <span>Kilépés</span>
                        </Button>
                    </div>
                </div>

                {/* Big Prominent Question Banner Directly on Top of the Board */}
                <div className="w-full max-w-lg mx-auto bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-2.5 sm:p-3 text-center shadow-lg my-1">
                    <p className="text-2xl sm:text-4xl font-black text-white tracking-wide">
                        {problem ? problem.question : ''} = <span className="text-emerald-400">?</span>
                    </p>
                </div>

                {/* Centered Board */}
                <div className="flex items-center justify-center my-auto">
                    <div
                        className={cn(
                            "relative rounded-2xl shadow-2xl touch-none overflow-hidden transition-colors duration-300 border-2",
                            boardBgClass,
                            boardTheme === 'BLACK' ? "border-slate-800" : "border-slate-700"
                        )}
                        style={{
                            width: GRID_SIZE * cellSize,
                            height: GRID_SIZE * cellSize
                        }}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Snake Body Segments */}
                        {snake.map((segment, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "absolute rounded-lg transition-all duration-75 flex items-center justify-center",
                                    index === 0
                                        ? "bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 shadow-md z-10 ring-1 ring-emerald-300"
                                        : "bg-gradient-to-br from-emerald-400 to-emerald-600 opacity-90"
                                )}
                                style={{
                                    left: segment.x * cellSize + 1,
                                    top: segment.y * cellSize + 1,
                                    width: cellSize - 2,
                                    height: cellSize - 2,
                                }}
                            >
                                {index === 0 && (
                                    <div className="text-xs select-none">
                                        {direction === 'UP' && '👀'}
                                        {direction === 'DOWN' && '👀'}
                                        {direction === 'LEFT' && '👀'}
                                        {direction === 'RIGHT' && '👀'}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Number Food Items */}
                        {numbers.map((num, index) => (
                            <div
                                key={index}
                                className="absolute rounded-lg flex items-center justify-center font-black shadow-md transition-transform duration-200 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 text-white border border-amber-200/80 select-none"
                                style={{
                                    left: num.pos.x * cellSize + 1,
                                    top: num.pos.y * cellSize + 1,
                                    width: cellSize - 2,
                                    height: cellSize - 2,
                                    fontSize: cellSize < 24 ? '11px' : '13px',
                                }}
                            >
                                {num.value}
                            </div>
                        ))}

                        {/* Start Game Overlay */}
                        {!isStarted && !gameOver && (
                            <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-xl backdrop-blur-md z-30 p-3">
                                <div className="bg-white p-5 rounded-2xl shadow-2xl text-center max-w-xs w-full animate-in zoom-in-95 duration-200">
                                    <div className="text-3xl mb-1.5">🐍</div>
                                    <h3 className="text-lg font-black text-slate-800 mb-0.5">Készen állsz?</h3>
                                    <p className="text-[11px] text-slate-500 mb-3">
                                        {selectedGrade}. osztály • {opMeta?.title}
                                    </p>
                                    <Button
                                        onClick={() => setIsStarted(true)}
                                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black py-2.5 rounded-xl shadow text-xs"
                                    >
                                        <Play className="w-4 h-4 mr-1" />
                                        Játék Indítása!
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Pause Overlay */}
                        {isPaused && !gameOver && isStarted && (
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-xl backdrop-blur-sm z-30">
                                <div className="bg-white p-4 rounded-2xl shadow-2xl text-center max-w-xs w-full">
                                    <Pause className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                                    <p className="text-base font-black text-slate-800">Szünet</p>
                                    <Button
                                        onClick={() => setIsPaused(false)}
                                        size="sm"
                                        className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs"
                                    >
                                        Folytatás
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Game Over Overlay */}
                        {gameOver && (
                            <div className="absolute inset-0 bg-black/85 flex items-center justify-center rounded-xl backdrop-blur-md z-30 p-3">
                                <div className="bg-white p-5 rounded-2xl shadow-2xl text-center max-w-xs w-full space-y-2.5">
                                    <div className="text-3xl">🏆</div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-800">Játék Vége!</h3>
                                        <p className="text-xs text-slate-500">Pontszám: <strong className="text-emerald-600 font-black">{score}</strong></p>
                                    </div>
                                    <Button
                                        onClick={resetGame}
                                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-2 rounded-xl text-xs"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                                        Új játék
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom simple hint */}
                <div className="text-center text-slate-400 text-[11px] pb-1">
                    <span>📱 Irányítás: Ujjhúzás (swipe) a játéktéren vagy nyilak</span>
                </div>
            </div>
        );
    }

    // ----------------------------------------------------
    // STANDARD / REGULAR PLAYING VIEW (Responsive)
    // ----------------------------------------------------
    return (
        <div className="flex flex-col gap-3 w-full px-1 sm:px-2 transition-all duration-300">
            {/* Top Bar / Navigation and Status */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-2xl border shadow-sm backdrop-blur-md w-full bg-white/90 border-emerald-100">
                <div className="flex items-center gap-1.5">
                    <Button
                        variant="ghost"
                        onClick={() => setStep('OPERATION')}
                        size="sm"
                        className="text-xs font-bold px-2 h-7.5 hover:bg-slate-100"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                        Menü
                    </Button>
                    <div className="flex items-center gap-1">
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 font-bold text-[11px] px-2 py-0.5">
                            {selectedGrade}. osztály
                        </Badge>
                        {opMeta && (
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/30 font-bold text-[11px] px-2 py-0.5">
                                {opMeta.title}
                            </Badge>
                        )}
                        <Badge variant="outline" className="bg-slate-500/10 text-slate-500 border-slate-500/30 font-bold text-[11px] px-2 py-0.5 hidden sm:inline-flex">
                            {DIFFICULTY_CONFIG[selectedDifficulty].label}
                        </Badge>
                    </div>
                </div>

                {/* Top Controls & Action Buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setBoardTheme(prev => prev === 'DARK' ? 'BLACK' : 'DARK')}
                        className="text-xs font-bold px-2.5 h-7.5 rounded-xl"
                        title="Téma váltása (Sötétkék / Fekete)"
                    >
                        <Palette className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                        <span>{boardTheme === 'DARK' ? 'Sötétkék' : 'Fekete'}</span>
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleFullscreen}
                        className="text-xs font-bold px-2.5 h-7.5 rounded-xl text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                        title="Teljes képernyős mód"
                    >
                        <Maximize2 className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                        <span>Teljes Képernyő</span>
                    </Button>

                    <Button
                        variant="ghost"
                        onClick={resetGame}
                        size="sm"
                        className="text-xs font-bold h-7.5 px-2 text-slate-600 hover:bg-slate-100"
                    >
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        Újra
                    </Button>
                </div>
            </div>

            {/* Mobile View: Question shown FIRST on top */}
            <div className="lg:hidden w-full">
                <Card className="border p-3.5 rounded-2xl shadow-sm text-center bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/80 border-emerald-200">
                    <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mb-1">
                        🎯 Keresd ezt az eredményt:
                    </div>
                    <div className="py-2 px-2 bg-white rounded-xl border border-emerald-100 shadow-inner">
                        <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            {problem ? problem.question : ''} = <span className="text-emerald-500">?</span>
                        </p>
                    </div>
                </Card>
            </div>

            {/* Main Game Arena: Responsive Columns Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start w-full">
                {/* LEFT / CENTER: The Snake Game Board */}
                <div className="lg:col-span-7 flex flex-col items-center justify-center w-full">
                    <div
                        className={cn(
                            "relative rounded-3xl shadow-2xl touch-none overflow-hidden transition-colors duration-300 border-4",
                            boardBgClass,
                            boardTheme === 'BLACK' ? "border-slate-800" : "border-slate-700"
                        )}
                        style={{
                            width: GRID_SIZE * cellSize,
                            height: GRID_SIZE * cellSize
                        }}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Snake Body Segments */}
                        {snake.map((segment, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "absolute rounded-xl transition-all duration-75 flex items-center justify-center",
                                    index === 0
                                        ? "bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 shadow-lg z-10 ring-2 ring-emerald-300"
                                        : "bg-gradient-to-br from-emerald-400 to-emerald-600 opacity-90"
                                )}
                                style={{
                                    left: segment.x * cellSize + 1,
                                    top: segment.y * cellSize + 1,
                                    width: cellSize - 2,
                                    height: cellSize - 2,
                                }}
                            >
                                {index === 0 && (
                                    <div className="text-xs select-none">
                                        {direction === 'UP' && '👀'}
                                        {direction === 'DOWN' && '👀'}
                                        {direction === 'LEFT' && '👀'}
                                        {direction === 'RIGHT' && '👀'}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Number Food Items */}
                        {numbers.map((num, index) => (
                            <div
                                key={index}
                                className="absolute rounded-xl flex items-center justify-center font-black shadow-lg transition-transform duration-200 hover:scale-105 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 text-white border-2 border-amber-200/80 select-none"
                                style={{
                                    left: num.pos.x * cellSize + 1,
                                    top: num.pos.y * cellSize + 1,
                                    width: cellSize - 2,
                                    height: cellSize - 2,
                                    fontSize: cellSize < 24 ? '11px' : '13px',
                                }}
                            >
                                {num.value}
                            </div>
                        ))}

                        {/* Start Game Overlay */}
                        {!isStarted && !gameOver && (
                            <div className="absolute inset-0 bg-black/75 flex items-center justify-center rounded-2xl backdrop-blur-md z-30 p-4">
                                <div className="bg-white p-5 rounded-3xl shadow-2xl text-center max-w-xs w-full animate-in zoom-in-95 duration-300">
                                    <div className="text-3xl mb-1.5">🐍</div>
                                    <h3 className="text-xl font-black text-slate-800 mb-0.5">Készen állsz?</h3>
                                    <p className="text-xs text-slate-500 mb-3">
                                        {selectedGrade}. osztály • {opMeta?.title}
                                    </p>
                                    <Button
                                        onClick={() => setIsStarted(true)}
                                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black py-3 rounded-2xl shadow hover:scale-105 active:scale-95 transition-all text-xs"
                                    >
                                        <Play className="w-4 h-4 mr-1.5" />
                                        Játék Indítása!
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Pause Overlay */}
                        {isPaused && !gameOver && isStarted && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-2xl backdrop-blur-sm z-30">
                                <div className="bg-white p-5 rounded-3xl shadow-2xl text-center max-w-xs w-full">
                                    <Pause className="w-8 h-8 text-emerald-600 mx-auto mb-1.5" />
                                    <p className="text-lg font-black text-slate-800">Szünet</p>
                                    <p className="text-xs text-slate-500 mt-0.5 mb-3">Nyomd meg a SPACE-t a folytatáshoz</p>
                                    <Button
                                        onClick={() => setIsPaused(false)}
                                        size="sm"
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs"
                                    >
                                        Folytatás
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Game Over Overlay */}
                        {gameOver && (
                            <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-2xl backdrop-blur-md z-30 p-4">
                                <div className="bg-white p-5 rounded-3xl shadow-2xl text-center max-w-xs w-full animate-in zoom-in-95 duration-300 space-y-3">
                                    <div className="text-4xl">🏆</div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-800">Játék Vége!</h3>
                                        <p className="text-xs text-slate-500 mt-0.5">Szép munka, gyakorolj tovább!</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-100 text-center">
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold">Pontszám</p>
                                            <p className="text-lg font-black text-emerald-600">{score}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold">Megoldások</p>
                                            <p className="text-lg font-black text-blue-600">{correctCount}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 pt-1">
                                        <Button
                                            onClick={resetGame}
                                            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-2.5 rounded-2xl shadow text-xs"
                                        >
                                            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                                            Új játék ezzel a beállítással
                                        </Button>
                                        <div className="grid grid-cols-2 gap-1.5">
                                            <Button
                                                variant="outline"
                                                onClick={() => setStep('DIFFICULTY')}
                                                className="text-[11px] font-bold rounded-xl h-8"
                                            >
                                                Nehézség váltás
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => setStep('OPERATION')}
                                                className="text-[11px] font-bold rounded-xl h-8"
                                            >
                                                Művelet váltás
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN (Desktop): Big Question Card & Live Status Dashboard (lg:col-span-5) */}
                <div className="lg:col-span-5 flex flex-col gap-3 w-full">
                    {/* Big Prominent Math Question Card (Desktop) */}
                    <Card className="hidden lg:block border p-5 rounded-3xl shadow-sm text-center bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/80 border-emerald-200">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                            <span>🎯</span> Keresd ezt a helyes számot:
                        </div>

                        <div className="my-1 py-3 px-3 bg-white rounded-2xl border-2 border-emerald-100 shadow-inner">
                            <p className="text-4xl font-black tracking-tight text-slate-900">
                                {problem ? problem.question : ''} = <span className="text-emerald-500">?</span>
                            </p>
                        </div>

                        {streak > 1 && (
                            <div className="mt-1.5 inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2.5 py-0.5 rounded-full text-[11px] font-black shadow-sm animate-bounce">
                                <Flame className="w-3.5 h-3.5" />
                                <span>{streak}x Pontszorzó!</span>
                            </div>
                        )}
                    </Card>

                    {/* Stats Dashboard */}
                    <div className="grid grid-cols-2 gap-2.5">
                        <div className="p-3 rounded-2xl border shadow-sm text-center bg-white border-amber-100">
                            <div className="flex items-center justify-center gap-1 mb-0.5 text-amber-500">
                                <Trophy className="w-3.5 h-3.5" />
                                <span className="text-[11px] font-bold">Pontszám</span>
                            </div>
                            <p className="text-xl font-black text-amber-600">{score}</p>
                        </div>

                        <div className="p-3 rounded-2xl border shadow-sm text-center bg-white border-emerald-100">
                            <div className="flex items-center justify-center gap-1 mb-0.5 text-emerald-500">
                                <Heart className="w-3.5 h-3.5" />
                                <span className="text-[11px] font-bold">Kígyó hossza</span>
                            </div>
                            <p className="text-xl font-black text-emerald-600">{snake.length}</p>
                        </div>

                        <div className="p-3 rounded-2xl border shadow-sm text-center bg-white border-blue-100">
                            <div className="flex items-center justify-center gap-1 mb-0.5 text-blue-500">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span className="text-[11px] font-bold">Megoldások</span>
                            </div>
                            <p className="text-xl font-black text-blue-600">{correctCount}</p>
                        </div>

                        <div className="p-3 rounded-2xl border shadow-sm text-center bg-white border-purple-100">
                            <div className="flex items-center justify-center gap-1 mb-0.5 text-purple-500">
                                <Flame className="w-3.5 h-3.5" />
                                <span className="text-[11px] font-bold">Legjobb széria</span>
                            </div>
                            <p className="text-xl font-black text-purple-600">{bestStreak}x</p>
                        </div>
                    </div>

                    {/* Controls & Quick Tips */}
                    <Card className="p-3 rounded-2xl border text-[11px] shadow-sm bg-slate-50 border-slate-200 text-slate-700">
                        <p className="font-bold mb-0.5 flex items-center gap-1 text-slate-900">
                            <span>🎮</span> Irányítás:
                        </p>
                        <p className="leading-snug">
                            <strong>Nyilak</strong> vagy <strong>W, A, S, D</strong> mozgatás • <strong>Ujjhúzás (swipe)</strong> mobilon • <strong>SPACE</strong> szünet
                        </p>
                    </Card>

                    {/* Mobile Touch Arrow Pad */}
                    <div className="lg:hidden mt-1">
                        <div className="grid grid-cols-3 gap-2 max-w-[180px] mx-auto">
                            <div></div>
                            <Button
                                onClick={() => handleDirectionClick('UP')}
                                disabled={gameOver || !isStarted}
                                className="h-11 bg-emerald-600 text-white rounded-xl shadow active:scale-95"
                            >
                                <ArrowUp className="w-5 h-5" />
                            </Button>
                            <div></div>
                            <Button
                                onClick={() => handleDirectionClick('LEFT')}
                                disabled={gameOver || !isStarted}
                                className="h-11 bg-emerald-600 text-white rounded-xl shadow active:scale-95"
                            >
                                <ArrowLeftIcon className="w-5 h-5" />
                            </Button>
                            <Button
                                onClick={() => handleDirectionClick('DOWN')}
                                disabled={gameOver || !isStarted}
                                className="h-11 bg-emerald-600 text-white rounded-xl shadow active:scale-95"
                            >
                                <ArrowDown className="w-5 h-5" />
                            </Button>
                            <Button
                                onClick={() => handleDirectionClick('RIGHT')}
                                disabled={gameOver || !isStarted}
                                className="h-11 bg-emerald-600 text-white rounded-xl shadow active:scale-95"
                            >
                                <ArrowRightIcon className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
