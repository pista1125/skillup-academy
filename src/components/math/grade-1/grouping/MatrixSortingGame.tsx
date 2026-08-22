import { useState, useCallback, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';

import {
    ArrowLeft,
    Trophy,
    ChevronRight,
    Star,
    Medal,
    Crown,
    Table,
    CheckCircle2,
    RefreshCw,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

type Difficulty = 'easy' | 'medium' | 'hard';

interface TableItem {
    id: string;
    content: string;
    type: 'emoji' | 'text';
    correctRow: number;
    correctCol: number;
}

interface MatrixTask {
    id: string;
    title: string;
    rowLabels: [string, string];
    colLabels: [string, string];
    items: TableItem[];
}

const TASKS: Record<Difficulty, MatrixTask[]> = {
    easy: [
        {
            id: 'e1',
            title: 'Állatok kategóriái',
            rowLabels: ['Kétlábú / Lábatlan', 'Négylábú'],
            colLabels: ['Háziállat', 'Vadállat'],
            items: [
                { id: '1', content: '🐔 Tyúk', type: 'emoji', correctRow: 0, correctCol: 0 },
                { id: '2', content: '🦆 Kacsa', type: 'emoji', correctRow: 0, correctCol: 0 },
                { id: '3', content: '🦅 Sas', type: 'emoji', correctRow: 0, correctCol: 1 },
                { id: '4', content: '🐍 Kígyó', type: 'emoji', correctRow: 0, correctCol: 1 },
                { id: '5', content: '🐕 Kutya', type: 'emoji', correctRow: 1, correctCol: 0 },
                { id: '6', content: '🐄 Tehén', type: 'emoji', correctRow: 1, correctCol: 0 },
                { id: '7', content: '🦁 Oroszlán', type: 'emoji', correctRow: 1, correctCol: 1 },
                { id: '8', content: '🐺 Farkas', type: 'emoji', correctRow: 1, correctCol: 1 },
            ]
        },
        {
            id: 'e2',
            title: 'Számok válogatása',
            rowLabels: ['10-nél kisebb', '10 vagy nagyobb'],
            colLabels: ['Páros szám', 'Páratlan szám'],
            items: [
                { id: '1', content: '4', type: 'text', correctRow: 0, correctCol: 0 },
                { id: '2', content: '8', type: 'text', correctRow: 0, correctCol: 0 },
                { id: '3', content: '3', type: 'text', correctRow: 0, correctCol: 1 },
                { id: '4', content: '7', type: 'text', correctRow: 0, correctCol: 1 },
                { id: '5', content: '12', type: 'text', correctRow: 1, correctCol: 0 },
                { id: '6', content: '20', type: 'text', correctRow: 1, correctCol: 0 },
                { id: '7', content: '15', type: 'text', correctRow: 1, correctCol: 1 },
                { id: '8', content: '21', type: 'text', correctRow: 1, correctCol: 1 },
            ]
        },
        {
            id: 'e3',
            title: 'Ételek és italok',
            rowLabels: ['Folyékony (ital)', 'Szilárd (étel)'],
            colLabels: ['Édes', 'Sós / Sós ízvilág'],
            items: [
                { id: '1', content: '🥤 Kóla', type: 'emoji', correctRow: 0, correctCol: 0 },
                { id: '2', content: '🧃 Almalé', type: 'emoji', correctRow: 0, correctCol: 0 },
                { id: '3', content: '🍲 Húsleves', type: 'emoji', correctRow: 0, correctCol: 1 },
                { id: '4', content: '🍫 Csokoládé', type: 'emoji', correctRow: 1, correctCol: 0 },
                { id: '5', content: '🥨 Perec', type: 'emoji', correctRow: 1, correctCol: 1 },
                { id: '6', content: '🍕 Pizza', type: 'emoji', correctRow: 1, correctCol: 1 },
            ]
        },
        {
            id: 'e4',
            title: 'Járművek',
            rowLabels: ['Szárazföldi', 'Nem szárazföldi'],
            colLabels: ['Motor hajtja', 'Természet/Ember hajtja'],
            items: [
                { id: '1', content: '🚗 Autó', type: 'emoji', correctRow: 0, correctCol: 0 },
                { id: '2', content: '🚌 Busz', type: 'emoji', correctRow: 0, correctCol: 0 },
                { id: '3', content: '🚲 Bicikli', type: 'emoji', correctRow: 0, correctCol: 1 },
                { id: '4', content: '🛹 Gördeszka', type: 'emoji', correctRow: 0, correctCol: 1 },
                { id: '5', content: '✈️ Repülő', type: 'emoji', correctRow: 1, correctCol: 0 },
                { id: '6', content: '🚁 Helikopter', type: 'emoji', correctRow: 1, correctCol: 0 },
                { id: '7', content: '⛵ Vitorlás', type: 'emoji', correctRow: 1, correctCol: 1 },
            ]
        },
        {
            id: 'e5',
            title: 'Nyári és téli holmik',
            rowLabels: ['Téli', 'Nyári'],
            colLabels: ['Felsőruházat/Kiegészítő', 'Lábbeli'],
            items: [
                { id: '1', content: '🧥 Nagykabát', type: 'emoji', correctRow: 0, correctCol: 0 },
                { id: '2', content: '🧣 Sál', type: 'emoji', correctRow: 0, correctCol: 0 },
                { id: '3', content: '👢 Hótaposó', type: 'emoji', correctRow: 0, correctCol: 1 },
                { id: '4', content: '⛸️ Jégkorcsolya', type: 'emoji', correctRow: 0, correctCol: 1 },
                { id: '5', content: '👕 Póló', type: 'emoji', correctRow: 1, correctCol: 0 },
                { id: '6', content: '🧢 Baseball sapka', type: 'emoji', correctRow: 1, correctCol: 0 },
                { id: '7', content: '🩴 Papucs', type: 'emoji', correctRow: 1, correctCol: 1 },
            ]
        }
    ],
    medium: [
        {
            id: 'm1',
            title: 'Súly és Élőhely (Állatok)',
            rowLabels: ['Vízi / Kétéltű', 'Szárazföldi'],
            colLabels: ['100 kg felett', '100 kg alatt'],
            items: [
                { id: '1', content: '🐳 Bálna', type: 'emoji', correctRow: 0, correctCol: 0 },
                { id: '2', content: '🦈 Fehércápa', type: 'emoji', correctRow: 0, correctCol: 0 },
                { id: '3', content: '🐸 Béka', type: 'emoji', correctRow: 0, correctCol: 1 },
                { id: '4', content: '🐠 Bohóchal', type: 'emoji', correctRow: 0, correctCol: 1 },
                { id: '5', content: '🐘 Elefánt', type: 'emoji', correctRow: 1, correctCol: 0 },
                { id: '6', content: '🦏 Orrszarvú', type: 'emoji', correctRow: 1, correctCol: 0 },
                { id: '7', content: '🐈 Macska', type: 'emoji', correctRow: 1, correctCol: 1 },
                { id: '8', content: '🐁 Egér', type: 'emoji', correctRow: 1, correctCol: 1 },
            ]
        },
        {
            id: 'm2',
            title: 'Oszthatóság',
            rowLabels: ['Osztható 5-tel', 'Nem osztható 5-tel'],
            colLabels: ['Páros (Osztható 2-vel)', 'Páratlan'],
            items: [
                { id: '1', content: '10', type: 'text', correctRow: 0, correctCol: 0 },
                { id: '2', content: '30', type: 'text', correctRow: 0, correctCol: 0 },
                { id: '3', content: '15', type: 'text', correctRow: 0, correctCol: 1 },
                { id: '4', content: '35', type: 'text', correctRow: 0, correctCol: 1 },
                { id: '5', content: '12', type: 'text', correctRow: 1, correctCol: 0 },
                { id: '6', content: '8', type: 'text', correctRow: 1, correctCol: 0 },
                { id: '7', content: '7', type: 'text', correctRow: 1, correctCol: 1 },
                { id: '8', content: '19', type: 'text', correctRow: 1, correctCol: 1 },
            ]
        },
        {
            id: 'm3',
            title: 'Növények tulajdonságai',
            rowLabels: ['Fás szárú', 'Lágyszárú'],
            colLabels: ['Van ehető termése (embernek)', 'Nincs ehető termése'],
            items: [
                { id: '1', content: '🍎 Almafa', type: 'emoji', correctRow: 0, correctCol: 0 },
                { id: '2', content: '🍒 Cseresznyefa', type: 'emoji', correctRow: 0, correctCol: 0 },
                { id: '3', content: '🌲 Fenyőfa', type: 'emoji', correctRow: 0, correctCol: 1 },
                { id: '4', content: '🌳 Tölgyfa', type: 'emoji', correctRow: 0, correctCol: 1 },
                { id: '5', content: '🍓 Szamóca', type: 'emoji', correctRow: 1, correctCol: 0 },
                { id: '6', content: '🍅 Paradicsom', type: 'emoji', correctRow: 1, correctCol: 0 },
                { id: '7', content: '🌼 Pitypang', type: 'emoji', correctRow: 1, correctCol: 1 },
                { id: '8', content: '🌿 Fű', type: 'emoji', correctRow: 1, correctCol: 1 },
            ]
        },
        {
            id: 'm4',
            title: 'Páros vagy páratlan testrészek',
            rowLabels: ['Fejen található', 'Törzsön vagy végtagon'],
            colLabels: ['Páros (2 db van)', 'Páratlan (1 db van)'],
            items: [
                { id: '1', content: '👀 Szem', type: 'emoji', correctRow: 0, correctCol: 0 },
                { id: '2', content: '👂 Fül', type: 'emoji', correctRow: 0, correctCol: 0 },
                { id: '3', content: '👃 Orr', type: 'emoji', correctRow: 0, correctCol: 1 },
                { id: '4', content: '👅 Nyelv', type: 'emoji', correctRow: 0, correctCol: 1 },
                { id: '5', content: '✋ Kéz', type: 'emoji', correctRow: 1, correctCol: 0 },
                { id: '6', content: '🦵 Láb', type: 'emoji', correctRow: 1, correctCol: 0 },
                { id: '7', content: '❤️ Szív', type: 'emoji', correctRow: 1, correctCol: 1 },
                { id: '8', content: 'Nyak', type: 'text', correctRow: 1, correctCol: 1 },
            ]
        },
        {
            id: 'm5',
            title: 'Napi tevékenységek',
            rowLabels: ['Hétköznap délelőtt', 'Hétköznap délután/este'],
            colLabels: ['Munka vagy tanulás', 'Szórakozás és pihenés'],
            items: [
                { id: '1', content: 'Matematika óra', type: 'text', correctRow: 0, correctCol: 0 },
                { id: '2', content: 'Olvasás óra', type: 'text', correctRow: 0, correctCol: 0 },
                { id: '3', content: 'Udvari szünet', type: 'text', correctRow: 0, correctCol: 1 },
                { id: '4', content: 'Tízórai', type: 'text', correctRow: 0, correctCol: 1 },
                { id: '5', content: 'Házi feladat írás', type: 'text', correctRow: 1, correctCol: 0 },
                { id: '6', content: 'Edzés/Különóra', type: 'text', correctRow: 1, correctCol: 0 },
                { id: '7', content: 'TV nézés', type: 'text', correctRow: 1, correctCol: 1 },
                { id: '8', content: 'Játék a barátokkal', type: 'text', correctRow: 1, correctCol: 1 },
            ]
        }
    ],
    hard: [
        {
            id: 'h1',
            title: 'Geometriai tulajdonságok',
            rowLabels: ['Van párhuzamos oldala', 'Nincs párhuzamos oldala'],
            colLabels: ['Van derékszöge', 'Nincs derékszöge'],
            items: [
                { id: '1', content: 'Téglalap', type: 'text', correctRow: 0, correctCol: 0 },
                { id: '2', content: 'Négyzet', type: 'text', correctRow: 0, correctCol: 0 },
                { id: '3', content: 'Rombusz', type: 'text', correctRow: 0, correctCol: 1 },
                { id: '4', content: 'Paralelogramma', type: 'text', correctRow: 0, correctCol: 1 },
                { id: '5', content: 'Derékszögű háromszög', type: 'text', correctRow: 1, correctCol: 0 },
                { id: '6', content: 'Derékszögű trapéz', type: 'text', correctRow: 0, correctCol: 0 }, // wait, trapez has parallel sides!
                { id: '7', content: 'Szabályos háromszög', type: 'text', correctRow: 1, correctCol: 1 },
                { id: '8', content: 'Univerzális (általános) háromszög', type: 'text', correctRow: 1, correctCol: 1 },
            ]
        },
        {
            id: 'h2',
            title: 'Műveletek eredménye',
            rowLabels: ['Eredmény > 100', 'Eredmény ≤ 100'],
            colLabels: ['Páratlan az eredmény', 'Páros az eredmény'],
            items: [
                { id: '1', content: '150 - 25', type: 'text', correctRow: 0, correctCol: 0 }, // 125
                { id: '2', content: '11 × 11', type: 'text', correctRow: 0, correctCol: 0 }, // 121
                { id: '3', content: '60 × 2', type: 'text', correctRow: 0, correctCol: 1 },  // 120
                { id: '4', content: '200 - 50', type: 'text', correctRow: 0, correctCol: 1 }, // 150
                { id: '5', content: '3 × 25', type: 'text', correctRow: 1, correctCol: 0 },  // 75
                { id: '6', content: '99 ÷ 1', type: 'text', correctRow: 1, correctCol: 0 },  // 99
                { id: '7', content: '10 × 10', type: 'text', correctRow: 1, correctCol: 1 }, // 100
                { id: '8', content: '4 × 20', type: 'text', correctRow: 1, correctCol: 1 },  // 80
            ]
        },
        {
            id: 'h3',
            title: 'Nyelvtan: Szófajok és hangrend',
            rowLabels: ['Főnév', 'Ige'],
            colLabels: ['Magas hangrendű', 'Mély hangrendű'],
            items: [
                { id: '1', content: 'Szék', type: 'text', correctRow: 0, correctCol: 0 },
                { id: '2', content: 'Szemüveg', type: 'text', correctRow: 0, correctCol: 0 },
                { id: '3', content: 'Asztal', type: 'text', correctRow: 0, correctCol: 1 },
                { id: '4', content: 'Autó', type: 'text', correctRow: 0, correctCol: 1 },
                { id: '5', content: 'Ír', type: 'text', correctRow: 1, correctCol: 0 }, // Í is magas
                { id: '6', content: 'Néz', type: 'text', correctRow: 1, correctCol: 0 },
                { id: '7', content: 'Fut', type: 'text', correctRow: 1, correctCol: 1 },
                { id: '8', content: 'Gondol', type: 'text', correctRow: 1, correctCol: 1 },
            ]
        },
        {
            id: 'h4',
            title: 'Hosszúságmérték',
            rowLabels: ['1 méternél hosszabb', '1 méternél rövidebb'],
            colLabels: ['Alapmértékegységben: "cm"', 'Más egységben ("m", "mm", "dm")'],
            items: [
                { id: '1', content: '150 cm', type: 'text', correctRow: 0, correctCol: 0 },
                { id: '2', content: '2 m', type: 'text', correctRow: 0, correctCol: 1 },
                { id: '3', content: '30 dm', type: 'text', correctRow: 0, correctCol: 1 },
                { id: '4', content: '50 cm', type: 'text', correctRow: 1, correctCol: 0 },
                { id: '5', content: '90 cm', type: 'text', correctRow: 1, correctCol: 0 },
                { id: '6', content: '5 dm', type: 'text', correctRow: 1, correctCol: 1 },
                { id: '7', content: '800 mm', type: 'text', correctRow: 1, correctCol: 1 },
            ]
        },
        {
            id: 'h5',
            title: 'Törtek és Szavak',
            rowLabels: ['Nagyobb, mint 1', 'Kisebb, minta 1 (valódi tört)'],
            colLabels: ['Szerepel benne a "fél" szó', 'Nem szerepel benne'],
            items: [
                { id: '1', content: 'Másfél', type: 'text', correctRow: 0, correctCol: 0 },
                { id: '2', content: 'Két és fél', type: 'text', correctRow: 0, correctCol: 0 },
                { id: '3', content: 'Öt negyed', type: 'text', correctRow: 0, correctCol: 1 },
                { id: '4', content: 'Három ketted', type: 'text', correctRow: 0, correctCol: 1 },
                { id: '5', content: 'Fél (1/2)', type: 'text', correctRow: 1, correctCol: 0 },
                { id: '6', content: 'Egy ketted', type: 'text', correctRow: 1, correctCol: 1 }, // no "fél" word
                { id: '7', content: 'Három negyed', type: 'text', correctRow: 1, correctCol: 1 },
                { id: '8', content: 'Két harmad', type: 'text', correctRow: 1, correctCol: 1 },
            ]
        }
    ]
};

export function MatrixSortingGame({ onBack }: { onBack: () => void }) {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [taskIndex, setTaskIndex] = useState(0);
    const [tasks, setTasks] = useState<MatrixTask[]>([]);
    
    // key: task index -> item id -> {row, col}
    const [allPlacedItems, setAllPlacedItems] = useState<Record<number, Record<string, { row: number, col: number }>>>({});
    const [solvedTasks, setSolvedTasks] = useState<Record<number, boolean>>({});
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    
    // Evaluation state
    const [hasChecked, setHasChecked] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);
    const [correctCount, setCorrectCount] = useState(0); // whole tasks completely correct
    const [xpEarned, setXpEarned] = useState(0);

    const placedItems = allPlacedItems[taskIndex] || {};

    const updatePlacedItems = useCallback((updater: Record<string, { row: number, col: number }> | ((prev: Record<string, { row: number, col: number }>) => Record<string, { row: number, col: number }>)) => {
        setAllPlacedItems(prev => {
            const prevForTask = prev[taskIndex] || {};
            const nextForTask = typeof updater === 'function' ? updater(prevForTask) : updater;
            return { ...prev, [taskIndex]: nextForTask };
        });
    }, [taskIndex]);

    const startQuiz = useCallback((level: Difficulty) => {
        setDifficulty(level);
        // Shuffle tasks randomly but take 5 (all of them since there are 5 per level)
        const shuffled = [...TASKS[level]].sort(() => Math.random() - 0.5);
        setTasks(shuffled);
        setTaskIndex(0);
        setAllPlacedItems({});
        setSolvedTasks({});
        setSelectedItemId(null);
        setHasChecked(false);
        setQuizComplete(false);
        setCorrectCount(0);
        setXpEarned(0);
    }, []);

    const currentTask = tasks[taskIndex];

    const unplacedItems = useMemo(() => {
        if (!currentTask) return [];
        return currentTask.items.filter(item => !placedItems[item.id]);
    }, [currentTask, placedItems]);

    const handleItemClick = (id: string) => {
        if (hasChecked || solvedTasks[taskIndex]) return;
        // If clicking an already placed item, move it back to bank
        if (placedItems[id]) {
            updatePlacedItems(prev => {
                const next = { ...prev };
                delete next[id];
                return next;
            });
            setSelectedItemId(null);
            return;
        }

        // Toggle selection
        if (selectedItemId === id) {
            setSelectedItemId(null);
        } else {
            setSelectedItemId(id);
        }
    };

    const handleCellClick = (r: number, c: number) => {
        if (hasChecked || !selectedItemId || solvedTasks[taskIndex]) return;

        updatePlacedItems(prev => ({
            ...prev,
            [selectedItemId]: { row: r, col: c }
        }));
        setSelectedItemId(null);
    };

    const checkAnswers = () => {
        if (!currentTask) return;
        
        let allCorrect = true;
        const currentMismatches: string[] = [];
        
        currentTask.items.forEach(item => {
            const placement = placedItems[item.id];
            if (!placement || placement.row !== item.correctRow || placement.col !== item.correctCol) {
                allCorrect = false;
                currentMismatches.push(item.id);
            }
        });

        if (allCorrect) {
            triggerConfetti();
            if (!solvedTasks[taskIndex]) {
                setCorrectCount(prev => prev + 1);
                setXpEarned(prev => prev + (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20));
                setSolvedTasks(prev => ({ ...prev, [taskIndex]: true }));
            }
            
            setTimeout(() => {
                const newSolved = { ...solvedTasks, [taskIndex]: true };
                if (Object.keys(newSolved).length === tasks.length) {
                    setQuizComplete(true);
                    setTimeout(triggerConfetti, 100);
                } else {
                    if (taskIndex < tasks.length - 1) {
                        handleNext();
                    }
                }
            }, 2500);
        } else {
            // Flash wrong items and return them to the bank after a short delay
            setHasChecked(true); // locks UI
            setTimeout(() => {
                updatePlacedItems(prev => {
                    const next = { ...prev };
                    currentMismatches.forEach(id => delete next[id]);
                    return next;
                });
                setHasChecked(false);
            }, 1000);
        }
    };

    const handlePrev = () => {
        if (taskIndex > 0) {
            setTaskIndex(prev => prev - 1);
            setSelectedItemId(null);
            setHasChecked(false);
        }
    };

    const handleNext = () => {
        if (taskIndex < tasks.length - 1) {
            setTaskIndex(prev => prev + 1);
            setSelectedItemId(null);
            setHasChecked(false);
        } else {
            setQuizComplete(true);
            setTimeout(triggerConfetti, 100);
        }
    };

    const triggerConfetti = () => {
        const duration = 2 * 1000;
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
                        <Table className="w-8 h-8 text-indigo-500" />
                        <h2 className="text-3xl font-black text-slate-800 tracking-tighter">Táblázatos válogatás</h2>
                    </div>
                    <div className="w-24"></div>
                </div>
                
                <div className="text-center max-w-2xl mx-auto space-y-4">
                    <p className="text-lg text-slate-600 font-medium">Kattints egy elemre, majd helyezd el a 2x2-es táblázat megfelelő mezőjébe!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <DifficultyCard
                        level="easy"
                        title="Egyszerű"
                        desc="Könnyű kategóriák, hétköznapi dolgok"
                        icon={<Star className="w-10 h-10" />}
                        color="emerald"
                        onClick={() => startQuiz('easy')}
                    />
                    <DifficultyCard
                        level="medium"
                        title="Közepes"
                        desc="Több szempontú mérlegelés, számok"
                        icon={<Medal className="w-10 h-10" />}
                        color="amber"
                        onClick={() => startQuiz('medium')}
                    />
                    <DifficultyCard
                        level="hard"
                        title="Nehéz"
                        desc="Geometria, matematika és fogalmak"
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
                <Card className="border-2 border-indigo-100 shadow-xl overflow-hidden rounded-[2rem]">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-center text-white relative">
                        <Trophy className="w-16 h-16 mx-auto mb-4 text-white drop-shadow-md" />
                        <h2 className="text-4xl font-black mb-2 tracking-tighter">Gratulálok!</h2>
                        <p className="text-indigo-100 font-medium">Befejezted ezt a szintet!</p>
                    </div>
                    <CardContent className="p-8 space-y-8 bg-white/50 backdrop-blur-sm">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="bg-emerald-50 border-2 border-emerald-100 p-4 rounded-[1.5rem]">
                                <span className="block text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Eredmény</span>
                                <span className="text-4xl font-black text-emerald-600">{Object.keys(solvedTasks).length}/{tasks.length}</span>
                            </div>
                            <div className="bg-blue-50 border-2 border-blue-100 p-4 rounded-[1.5rem] flex flex-col justify-center items-center">
                                <span className="block text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">XP szerzett</span>
                                <XPBadge xp={xpEarned} />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline" onClick={() => setDifficulty(null)} className="flex-1 rounded-2xl h-14 font-black border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800">Menü</Button>
                            <Button onClick={() => startQuiz(difficulty)} className="flex-1 h-14 font-black bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-500/30">Újra</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!currentTask) return null;

    const allPlaced = Object.keys(placedItems).length === currentTask.items.length;

    // Helper to render items in a cell
    const renderCellItems = (row: number, col: number) => {
        const items = currentTask.items.filter(item => {
            const p = placedItems[item.id];
            return p && p.row === row && p.col === col;
        });

        return (
            <div className="flex flex-wrap gap-2 p-3 min-h-[100px] items-start justify-start content-start">
                {items.map(item => {
                    const isError = hasChecked && (item.correctRow !== row || item.correctCol !== col);
                    return (
                        <button
                            key={item.id}
                            onClick={(e) => { e.stopPropagation(); handleItemClick(item.id); }}
                            className={cn(
                                "relative group inline-flex items-center justify-center px-3 py-1.5 rounded-xl border-2 shadow-sm font-bold text-sm transition-all animate-in fade-in zoom-in duration-300",
                                item.type === 'emoji' ? "text-xl px-2.5 py-1" : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                                item.type === 'emoji' && !isError && "bg-white border-slate-100",
                                isError && "border-rose-400 bg-rose-50 text-rose-600 shadow-rose-100 animate-pulse",
                                hasChecked && !isError && "border-emerald-400 bg-emerald-50 text-emerald-700"
                            )}>
                            {item.content}
                            {!hasChecked && (
                                <div className="absolute -top-2 -right-2 w-5 h-5 bg-slate-800 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <X className="w-3 h-3" />
                                </div>
                            )}
                        </button>
                    )
                })}
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-4 bg-white border-2 border-slate-100 rounded-[2rem] shadow-sm">
                <Button variant="ghost" size="icon" className="hover:bg-slate-100 text-slate-400" onClick={() => setDifficulty(null)}>
                    <ArrowLeft className="w-6 h-6" />
                </Button>
                <div className="flex-1 px-8 hidden md:block">
                    <ProgressBar current={taskIndex + 1} total={tasks.length} variant="math" size="lg" />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={handlePrev} disabled={taskIndex === 0} className="rounded-xl h-10 w-10">
                        <ChevronRight className="w-5 h-5 rotate-180" />
                    </Button>
                    <div className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-xl font-bold">
                        <span>{taskIndex + 1} / {tasks.length}</span>
                    </div>
                    <Button 
                       variant={taskIndex === tasks.length - 1 ? "default" : "outline"} 
                       onClick={handleNext} 
                       className={cn("rounded-xl h-10 px-3", taskIndex === tasks.length - 1 && "bg-indigo-500 hover:bg-indigo-600 text-white")}
                    >
                        {taskIndex === tasks.length - 1 ? "Befejezés" : <ChevronRight className="w-5 h-5" />}
                    </Button>
                </div>
            </div>

            <Card className="border-4 border-slate-100 shadow-xl rounded-[2.5rem] overflow-hidden bg-white">
                <CardContent className="p-6 md:p-8 flex flex-col gap-6 font-display">
                    
                    <h3 className="text-2xl font-black text-center text-slate-700 mb-2">{currentTask.title}</h3>

                    {/* Bank / Unplaced items */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-inner min-h-[100px]">
                        <p className="text-xs font-bold uppercase text-slate-400 mb-3 text-center tracking-wider">Erre váró elemek</p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {unplacedItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => handleItemClick(item.id)}
                                    className={cn(
                                        "px-4 py-2 rounded-xl text-sm font-bold border-b-4 transition-all duration-200 active:scale-95",
                                        selectedItemId === item.id 
                                            ? "bg-indigo-500 border-indigo-700 text-white scale-110 shadow-lg shadow-indigo-200 -translate-y-1" 
                                            : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-sm"
                                    )}
                                >
                                    {item.content}
                                </button>
                            ))}
                            {unplacedItems.length === 0 && (
                                <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Minden elem elhelyezve! Kattints az Ellenőrzésre!
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="w-full flex-1">
                        <div className="grid grid-cols-[auto_1fr_1fr] grid-rows-[auto_1fr_1fr] text-slate-800 font-medium">
                            {/* Top-left empty block */}
                            <div className="p-4 rounded-tl-3xl bg-indigo-600 flex items-center justify-center border-b border-r border-indigo-400">
                                <Table className="w-8 h-8 text-white/50" />
                            </div>

                            {/* Col headers */}
                            <div className="bg-indigo-600 text-white font-black text-lg p-4 flex items-center justify-center text-center border-b border-r border-indigo-400">
                                {currentTask.colLabels[0]}
                            </div>
                            <div className="bg-indigo-600 text-white font-black text-lg p-4 rounded-tr-3xl flex items-center justify-center text-center border-b border-indigo-400">
                                {currentTask.colLabels[1]}
                            </div>

                            {/* Row 1 */}
                            <div className="bg-indigo-600 text-white font-black text-lg p-4 flex items-center justify-center text-center border-b border-r border-indigo-400">
                                {currentTask.rowLabels[0]}
                            </div>
                            <button 
                                onClick={() => handleCellClick(0, 0)}
                                className={cn(
                                    "bg-blue-50/50 hover:bg-blue-100/50 transition-colors border-r border-b border-indigo-200",
                                    selectedItemId && "cursor-pointer ring-inset ring-2 ring-indigo-400"
                                )}
                            >
                                {renderCellItems(0, 0)}
                            </button>
                            <button 
                                onClick={() => handleCellClick(0, 1)}
                                className={cn(
                                    "bg-blue-50/50 hover:bg-blue-100/50 transition-colors border-b border-indigo-200",
                                    selectedItemId && "cursor-pointer ring-inset ring-2 ring-indigo-400"
                                )}
                            >
                                {renderCellItems(0, 1)}
                            </button>

                            {/* Row 2 */}
                            <div className="bg-indigo-600 text-white font-black text-lg p-4 flex flex-col justify-center items-center text-center border-r border-indigo-400 rounded-bl-3xl">
                                {currentTask.rowLabels[1]}
                            </div>
                            <button 
                                onClick={() => handleCellClick(1, 0)}
                                className={cn(
                                    "bg-blue-50/50 hover:bg-blue-100/50 transition-colors border-r border-indigo-200",
                                    selectedItemId && "cursor-pointer ring-inset ring-2 ring-indigo-400"
                                )}
                            >
                                {renderCellItems(1, 0)}
                            </button>
                            <button 
                                onClick={() => handleCellClick(1, 1)}
                                className={cn(
                                    "bg-blue-50/50 hover:bg-blue-100/50 transition-colors rounded-br-3xl",
                                    selectedItemId && "cursor-pointer ring-inset ring-2 ring-indigo-400"
                                )}
                            >
                                {renderCellItems(1, 1)}
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                        {!solvedTasks[taskIndex] && (
                            <Button 
                                disabled={!allPlaced || hasChecked}
                                onClick={checkAnswers}
                                className={cn(
                                    "h-14 px-10 font-black text-lg rounded-2xl w-full md:w-auto shadow-xl transition-all",
                                    allPlaced 
                                        ? "bg-emerald-500 hover:bg-emerald-600 text-white hover:-translate-y-1 shadow-emerald-500/30" 
                                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                )}
                            >
                                {!hasChecked ? 'Kész, ellenőrzés!' : 'Ellenőrzés folyamatban...'}
                            </Button>
                        )}
                        {solvedTasks[taskIndex] && (
                            <div className="h-14 px-8 rounded-2xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center gap-2 border-2 border-emerald-200">
                                <CheckCircle2 className="w-6 h-6" />
                                Helyes megoldás!
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
