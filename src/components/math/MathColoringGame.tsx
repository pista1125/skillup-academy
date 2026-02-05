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
    operator?: 'addition' | 'subtraction' | 'multiplication';
    color: string;
    lx: number; // Label X
    ly: number; // Label Y
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
            { id: 'sun', name: 'Napocska', path: 'M400,80 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0', num1: 2, num2: 3, color: '#fbbf24', lx: 440, ly: 85 },
            { id: 'cloud1', name: 'Felhő 1', path: 'M150,80 Q180,50 210,80 T270,80 T330,80 Q330,120 150,120 Z', num1: 1, num2: 3, color: '#bae6fd', lx: 240, ly: 90 },
            { id: 'house-body', name: 'Házfal', path: 'M250,300 L550,300 L550,450 L250,450 Z', num1: 3, num2: 2, color: '#fca5a5', lx: 400, ly: 375 },
            { id: 'roof', name: 'Tető', path: 'M230,300 L400,200 L570,300 Z', num1: 1, num2: 4, color: '#ef4444', lx: 400, ly: 260 },
            { id: 'door', name: 'Ajtó', path: 'M370,370 L430,370 L430,450 L370,450 Z', num1: 2, num2: 0, color: '#92400e', lx: 400, ly: 410 },
            { id: 'grass', name: 'Fű', path: 'M0,450 L800,450 L800,500 L0,500 Z', num1: 2, num2: 2, color: '#4ade80', lx: 400, ly: 475 },
            { id: 'tree-leaves', name: 'Lombok', path: 'M600,350 Q665,250 730,350 Z', num1: 3, num2: 1, color: '#166534', lx: 665, ly: 310 },
        ]
    },
    {
        id: 'rocket',
        name: 'Űrhajó',
        icon: '🚀',
        grade: 1,
        operation: 'addition',
        areas: [
            { id: 'space', name: 'Világűr', path: 'M0,0 L800,0 L800,500 L0,500 Z', num1: 1, num2: 1, color: '#1e1b4b', lx: 100, ly: 100 },
            { id: 'body', name: 'Űrhajó test', path: 'M350,150 L450,150 L450,350 L350,350 Z', num1: 2, num2: 2, color: '#e2e8f0', lx: 400, ly: 250 },
            { id: 'nose', name: 'Orrkúp', path: 'M350,150 L400,50 L450,150 Z', num1: 2, num2: 3, color: '#ef4444', lx: 400, ly: 110 },
            { id: 'fin-l', name: 'Szárny (bal)', path: 'M350,250 L300,350 L350,350 Z', num1: 1, num2: 4, color: '#ef4444', lx: 330, ly: 310 },
            { id: 'fin-r', name: 'Szárny (jobb)', path: 'M450,250 L500,350 L450,350 Z', num1: 4, num2: 1, color: '#ef4444', lx: 470, ly: 310 },
            { id: 'window', name: 'Ablak', path: 'M375,200 a25,25 0 1,0 50,0 a25,25 0 1,0 -50,0', num1: 0, num2: 5, color: '#38bdf8', lx: 400, ly: 205 },
            { id: 'fire', name: 'Hajtómű láng', path: 'M360,350 L400,450 L440,350 Z', num1: 3, num2: 2, color: '#f97316', lx: 400, ly: 400 },
        ]
    },
    {
        id: 'flower',
        name: 'Virág',
        icon: '🌻',
        grade: 1,
        operation: 'addition',
        areas: [
            { id: 'sky', name: 'Égbolt', path: 'M0,0 L800,300 L0,300 Z', num1: 4, num2: 4, color: '#bae6fd', lx: 400, ly: 100 },
            { id: 'ground', name: 'Föld', path: 'M0,300 L800,300 L800,500 L0,500 Z', num1: 3, num2: 7, color: '#854d0e', lx: 400, ly: 400 },
            { id: 'stem', name: 'Szár', path: 'M390,200 L410,200 L410,480 L390,480 Z', num1: 5, num2: 4, color: '#166534', lx: 400, ly: 340 },
            { id: 'leaf-l', name: 'Levél (bal)', path: 'M390,350 Q300,300 390,400 Z', num1: 2, num2: 5, color: '#22c55e', lx: 350, ly: 360 },
            { id: 'leaf-r', name: 'Levél (jobb)', path: 'M410,380 Q500,330 410,430 Z', num1: 1, num2: 6, color: '#22c55e', lx: 450, ly: 380 },
            { id: 'petal-1', name: 'Szirom 1', path: 'M400,100 Q450,20 500,100 T400,180 Z', num1: 2, num2: 7, color: '#facc15', lx: 450, ly: 100 },
            { id: 'petal-2', name: 'Szirom 2', path: 'M400,100 Q350,20 300,100 T400,180 Z', num1: 4, num2: 5, color: '#facc15', lx: 350, ly: 100 },
            { id: 'center', name: 'Virág közepe', path: 'M360,140 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0', num1: 5, num2: 5, color: '#713f12', lx: 400, ly: 145 },
        ]
    },
    {
        id: 'car',
        name: 'Autó',
        icon: '🚗',
        grade: 1,
        operation: 'addition',
        areas: [
            { id: 'bg', name: 'Út', path: 'M0,0 L800,0 L800,500 L0,500 Z', num1: 2, num2: 2, color: '#f8fafc', lx: 100, ly: 50 },
            { id: 'body', name: 'Autó test', path: 'M150,300 L650,300 L600,200 L200,200 Z', num1: 4, num2: 6, color: '#3b82f6', lx: 400, ly: 250 },
            { id: 'window-f', name: 'Első ablak', path: 'M405,210 L585,210 L635,300 L405,300 Z', num1: 3, num2: 5, color: '#bae6fd', lx: 500, ly: 255 },
            { id: 'window-b', name: 'Hátsó ablak', path: 'M165,300 L215,210 L395,210 L395,300 Z', num1: 4, num2: 4, color: '#bae6fd', lx: 300, ly: 255 },
            { id: 'wheel-l', name: 'Első kerék', path: 'M200,350 a50,50 0 1,0 100,0 a50,50 0 1,0 -100,0', num1: 5, num2: 1, color: '#1e293b', lx: 250, ly: 355 },
            { id: 'wheel-r', name: 'Hátsó kerék', path: 'M500,350 a50,50 0 1,0 100,0 a50,50 0 1,0 -100,0', num1: 4, num2: 2, color: '#1e293b', lx: 550, ly: 355 },
        ]
    },
    {
        id: 'butterfly-g1',
        name: 'Pillangó',
        icon: '🦋',
        grade: 1,
        operation: 'addition',
        areas: [
            { id: 'bg', name: 'Rét', path: 'M0,0 L800,0 L800,500 L0,500 Z', num1: 5, num2: 5, color: '#f0fdf4', lx: 100, ly: 50 },
            { id: 'wing-l', name: 'Bal szárny', path: 'M380,250 Q200,50 150,250 T380,450 Z', num1: 10, num2: 2, operator: 'subtraction', color: '#f472b6', lx: 250, ly: 250 },
            { id: 'wing-r', name: 'Jobb szárny', path: 'M420,250 Q600,50 650,250 T420,450 Z', num1: 4, num2: 4, color: '#f472b6', lx: 550, ly: 250 },
            { id: 'body', name: 'Test', path: 'M380,150 L420,150 L420,450 L380,450 Z', num1: 8, num2: 3, operator: 'subtraction', color: '#475569', lx: 400, ly: 300 },
            { id: 'spot-1', name: 'Pötty 1', path: 'M250,200 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0', num1: 5, num2: 3, operator: 'subtraction', color: '#fbbf24', lx: 270, ly: 205 },
            { id: 'spot-2', name: 'Pötty 2', path: 'M510,200 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0', num1: 3, num2: 4, color: '#fbbf24', lx: 530, ly: 205 },
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
            { id: 'bg', name: 'Háttér', path: 'M0,0 L800,0 L800,500 L0,500 Z', num1: 2, num2: 2, color: '#f0f9ff', lx: 100, ly: 50 },
            { id: 'wing-l', name: 'Bal szárny', path: 'M380,250 Q200,50 150,250 T380,450 Z', num1: 2, num2: 5, color: '#f472b6', lx: 250, ly: 250 },
            { id: 'wing-r', name: 'Jobb szárny', path: 'M420,250 Q600,50 650,250 T420,450 Z', num1: 5, num2: 2, color: '#f472b6', lx: 550, ly: 250 },
            { id: 'body', name: 'Test', path: 'M380,150 L420,150 L420,450 L380,450 Z', num1: 1, num2: 10, color: '#475569', lx: 400, ly: 300 },
            { id: 'spot-1', name: 'Pötty 1', path: 'M250,200 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0', num1: 2, num2: 4, color: '#fbbf24', lx: 270, ly: 205 },
            { id: 'spot-2', name: 'Pötty 2', path: 'M510,200 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0', num1: 4, num2: 2, color: '#fbbf24', lx: 530, ly: 205 },
        ]
    },
    {
        id: 'fish',
        name: 'Halacska',
        icon: '🐠',
        grade: 2,
        operation: 'multiplication',
        areas: [
            { id: 'water', name: 'Víz', path: 'M0,0 L800,0 L800,500 L0,500 Z', num1: 3, num2: 3, color: '#e0f2fe', lx: 100, ly: 100 },
            { id: 'body', name: 'Hal test', path: 'M200,250 Q400,100 600,250 T200,400 Z', num1: 5, num2: 4, color: '#fb923c', lx: 400, ly: 250 },
            { id: 'tail', name: 'Farokúszó', path: 'M600,250 L750,150 L750,350 Z', num1: 2, num2: 3, color: '#f97316', lx: 700, ly: 250 },
            { id: 'eye', name: 'Szem', path: 'M300,220 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0', num1: 1, num2: 5, color: '#ffffff', lx: 310, ly: 225 },
            { id: 'bubble-1', name: 'Buborék 1', path: 'M150,150 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0', num1: 3, num2: 2, color: '#ffffff', lx: 165, ly: 155 },
            { id: 'bubble-2', name: 'Buborék 2', path: 'M100,100 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0', num1: 2, num2: 2, color: '#ffffff', lx: 110, ly: 105 },
        ]
    },
    {
        id: 'castle',
        name: 'Várkastély',
        icon: '🏰',
        grade: 2,
        operation: 'multiplication',
        areas: [
            { id: 'sky', name: 'Égbolt', path: 'M0,0 L800,400 L0,400 Z', num1: 4, num2: 4, color: '#ecfeff', lx: 100, ly: 100 },
            { id: 'grass', name: 'Fű', path: 'M0,400 L800,400 L800,500 L0,500 Z', num1: 5, num2: 5, color: '#22c55e', lx: 400, ly: 450 },
            { id: 'main', name: 'Várfal', path: 'M300,250 L500,250 L500,400 L300,400 Z', num1: 3, num2: 10, color: '#94a3b8', lx: 400, ly: 325 },
            { id: 'tower-l', name: 'Bal torony', path: 'M250,200 L300,200 L300,400 L250,400 Z', num1: 2, num2: 6, color: '#64748b', lx: 275, ly: 300 },
            { id: 'tower-r', name: 'Jobb torony', path: 'M500,200 L550,200 L550,400 L500,400 Z', num1: 6, num2: 2, color: '#64748b', lx: 525, ly: 300 },
            { id: 'door', name: 'Kapu', path: 'M380,330 L420,330 L420,400 L380,400 Z', num1: 3, num2: 4, color: '#451a03', lx: 400, ly: 365 },
            { id: 'flag', name: 'Zászló', path: 'M400,150 L450,180 L400,210 Z', num1: 1, num2: 8, color: '#ef4444', lx: 415, ly: 180 },
        ]
    },
    {
        id: 'robot',
        name: 'Robot',
        icon: '🤖',
        grade: 2,
        operation: 'multiplication',
        areas: [
            { id: 'bg', name: 'Laboratórium', path: 'M0,0 L800,0 L800,500 L0,500 Z', num1: 0, num2: 10, color: '#f8fafc', lx: 100, ly: 100 },
            { id: 'head', name: 'Fej', path: 'M350,50 L450,50 L450,130 L350,130 Z', num1: 2, num2: 8, color: '#94a3b8', lx: 400, ly: 90 },
            { id: 'body', name: 'Robot test', path: 'M320,130 L480,130 L480,350 L320,350 Z', num1: 5, num2: 5, color: '#cbd5e1', lx: 400, ly: 250 },
            { id: 'arm-l', name: 'Bal kar', path: 'M250,150 L320,180 L320,220 L250,190 Z', num1: 3, num2: 3, color: '#64748b', lx: 285, ly: 185 },
            { id: 'arm-r', name: 'Jobb kar', path: 'M480,180 L550,150 L550,190 L480,220 Z', num1: 3, num2: 3, color: '#64748b', lx: 515, ly: 185 },
            { id: 'leg-l', name: 'Bal láb', path: 'M340,350 L380,350 L380,450 L340,450 Z', num1: 2, num2: 9, color: '#64748b', lx: 360, ly: 400 },
            { id: 'leg-r', name: 'Jobb láb', path: 'M420,350 L460,350 L460,450 L420,450 Z', num1: 9, num2: 2, color: '#64748b', lx: 440, ly: 400 },
            { id: 'chest', name: 'Gomb', path: 'M380,200 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0', num1: 10, num2: 10, color: '#ef4444', lx: 400, ly: 205 },
        ]
    },
    {
        id: 'ship',
        name: 'Hajó',
        icon: '⛵',
        grade: 2,
        operation: 'multiplication',
        areas: [
            { id: 'sky', name: 'Égbolt', path: 'M0,0 L800,350 L0,350 Z', num1: 1, num2: 1, color: '#bae6fd', lx: 100, ly: 100 },
            { id: 'sea', name: 'Tenger', path: 'M0,350 L800,350 L800,500 L0,500 Z', num1: 4, num2: 5, color: '#0369a1', lx: 400, ly: 425 },
            { id: 'hull', name: 'Hajótest', path: 'M250,350 L550,350 L500,450 L300,450 Z', num1: 5, num2: 6, color: '#78350f', lx: 400, ly: 400 },
            { id: 'mast', name: 'Árboc', path: 'M395,150 L405,150 L405,350 L395,350 Z', num1: 2, num2: 2, color: '#451a03', lx: 400, ly: 250 },
            { id: 'sail', name: 'Vitorla', path: 'M405,160 L500,300 L405,300 Z', num1: 3, num2: 8, color: '#f8fafc', lx: 440, ly: 240 },
            { id: 'flag', name: 'Zászló', path: 'M405,150 L430,165 L405,180 Z', num1: 1, num2: 6, color: '#ef4444', lx: 415, ly: 165 },
        ]
    }
];

interface MathColoringGameProps {
    onBack: () => void;
    grade?: number;
    operation?: 'addition' | 'multiplication';
}

const COLOR_MAP: Record<number, string> = {
    // Basic sums
    1: '#f87171', // Red
    2: '#fb923c', // Orange
    3: '#fbbf24', // Amber
    4: '#facc15', // Yellow
    5: '#a3e635', // Lime
    6: '#4ade80', // Green
    7: '#2dd4bf', // Teal
    8: '#22d3ee', // Cyan
    9: '#38bdf8', // Sky
    10: '#60a5fa', // Blue
    11: '#818cf8', // Indigo
    12: '#a78bfa', // Violet
    13: '#c084fc', // Purple
    14: '#e879f9', // Fuchsia
    15: '#f472b6', // Pink
    16: '#fb7185', // Rose
    18: '#94a3b8', // Slate
    20: '#64748b', // Slate Dark
    24: '#475569', // Slate Darker
    25: '#334155', // Slate Deep
    30: '#1e293b', // Slate Deeper
    40: '#0f172a', // Slate Deepest
    50: '#ec4899', // Pink Dark
    60: '#be185d', // Pink Deeper
    80: '#9d174d', // Pink Deepest
    100: '#711a44', // Maroon
};

function getAreaResult(area: Area, sceneOp: 'addition' | 'multiplication'): number {
    const op = area.operator || sceneOp;
    if (op === 'addition') return area.num1 + area.num2;
    if (op === 'subtraction') return area.num1 - area.num2;
    return area.num1 * area.num2;
}

function getAreaOperator(area: Area, sceneOp: 'addition' | 'multiplication'): string {
    const op = area.operator || sceneOp;
    if (op === 'addition') return '+';
    if (op === 'subtraction') return '-';
    return '×';
}

function getDisplayColor(result: number): string {
    return COLOR_MAP[result] || '#94a3b8';
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

    const uniqueResults = Array.from(new Set(currentScene.areas.map(a =>
        getAreaResult(a, currentScene.operation)
    ))).sort((a, b) => a - b);

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

        const expectedAnswer = getAreaResult(activeArea, currentScene.operation);

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

                <CardContent className="p-0 relative flex flex-col md:flex-row bg-[#f8fafc]">
                    {/* SVG Canvas Area */}
                    <div className="flex-1 relative bg-white border-r border-slate-100">
                        <div className="absolute top-4 right-4 z-10">
                            <Button variant="ghost" onClick={onBack} size="sm" className="bg-slate-100 hover:bg-slate-200 rounded-full">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Vissza
                            </Button>
                        </div>

                        <svg viewBox="0 0 800 500" className="w-full h-auto cursor-pointer">
                            {currentScene.areas.map((area) => {
                                const result = getAreaResult(area, currentScene.operation);
                                const isSolved = solved.has(area.id);
                                return (
                                    <g key={area.id} onClick={() => handleAreaClick(area.id)}>
                                        <path
                                            d={area.path}
                                            fill={isSolved ? getDisplayColor(result) : '#ffffff'}
                                            stroke="#CBD5E1"
                                            strokeWidth={activeId === area.id ? "4" : "1.5"}
                                            className={cn(
                                                "transition-all duration-500",
                                                !isSolved && !gameWon && "hover:fill-slate-50",
                                                activeId === area.id && "animate-pulse"
                                            )}
                                        />
                                        {!isSolved && !gameWon && (
                                            <text
                                                x={area.lx}
                                                y={area.ly}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                className="fill-slate-400 font-display font-bold pointer-events-none select-none"
                                                fontSize="14"
                                            >
                                                {result}
                                            </text>
                                        )}
                                    </g>
                                );
                            })}
                        </svg>

                        {/* Reward Message Overlay */}
                        {gameWon && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm animate-in fade-in duration-1000 z-50">
                                <div className="bg-white p-8 rounded-[40px] shadow-2xl border-8 border-yellow-400 text-center scale-110">
                                    <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-2" />
                                    <h2 className="text-3xl font-display font-black text-pink-500">Ügyes vagy! 🎉</h2>
                                    <p className="text-slate-600 font-bold">Kiszínezted a teljes képet!</p>
                                    <Button onClick={resetGame} className="mt-4 bg-pink-500 hover:bg-pink-600 rounded-full px-8 h-12 font-bold">
                                        <RefreshCcw className="w-4 h-4 mr-2" /> Újra
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Math Prompt Overlay */}
                        {activeId && activeArea && !solved.has(activeId) && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 z-50">
                                <div className="bg-white/95 backdrop-blur shadow-2xl rounded-[32px] p-6 border-4 border-pink-400 animate-in zoom-in duration-300">
                                    <div className="text-center mb-4">
                                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{activeArea.name}</p>
                                        <div className="text-4xl font-display font-black text-slate-800 flex items-center justify-center gap-2">
                                            {activeArea.num1} {getAreaOperator(activeArea, currentScene.operation)} {activeArea.num2} = ?
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
                    </div>

                    {/* Sidebar Legend */}
                    <div className="w-full md:w-32 bg-slate-100 flex flex-row md:flex-col gap-2 p-3 overflow-auto max-h-[150px] md:max-h-[500px]">
                        {uniqueResults.map((result) => {
                            const isCurrentTarget = activeArea && getAreaResult(activeArea, currentScene.operation) === result;
                            return (
                                <div
                                    key={result}
                                    className={cn(
                                        "flex flex-col items-center gap-1 p-2 rounded-2xl transition-all shrink-0",
                                        isCurrentTarget ? "bg-white shadow-md scale-105" : "opacity-80"
                                    )}
                                >
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black shadow-inner border-2 border-white/20"
                                        style={{ backgroundColor: getDisplayColor(result) }}
                                    >
                                        {result}
                                    </div>
                                    <span className="text-[10px] font-black text-slate-500">{result}</span>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>

                {/* Feedback Toast (Internal) - Moved inside Card but outside CardContent for correct positioning if needed, or keep relative to parent */}
                {feedback && (
                    <div className={cn(
                        "absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full font-bold shadow-lg animate-in slide-in-from-bottom duration-300 z-50",
                        feedback.type === 'success' ? "bg-green-500 text-white" : "bg-orange-400 text-white"
                    )}>
                        {feedback.type === 'success' ? <Sparkles className="inline w-5 h-5 mr-2" /> : <RefreshCcw className="inline w-5 h-5 mr-2" />}
                        {feedback.msg}
                    </div>
                )}
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
