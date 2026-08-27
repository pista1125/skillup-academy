import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    ArrowLeft,
    RotateCcw,
    CheckCircle2,
    XCircle,
    Trophy,
    HelpCircle,
    Star,
    Medal,
    Crown,
    Check,
    X,
    AlertCircle,
    Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface Connection {
    from: string;
    to: string;
}

interface ArrowCoordinate {
    from: string;
    to: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

interface LevelData {
    id: number;
    title: string;
    ruleDesc: string;
    domain: string[];
    codomain: string[];
    correctConnections: Connection[];
    isFunction: boolean;
    functionExplain: string;
}

const LEVELS: LevelData[] = [
    {
        id: 1,
        title: "1. szint: Országok és fővárosok",
        ruleDesc: "Kösd össze az országokat a hozzájuk tartozó fővárossal!",
        domain: ["Svájc", "Németország", "Finnország", "Franciaország", "Ausztria", "Izland"],
        codomain: ["Bécs", "Párizs", "Berlin", "Helsinki", "Reykjavík", "Bern"],
        correctConnections: [
            { from: "Svájc", to: "Bern" },
            { from: "Németország", to: "Berlin" },
            { from: "Finnország", to: "Helsinki" },
            { from: "Franciaország", to: "Párizs" },
            { from: "Ausztria", to: "Bécs" },
            { from: "Izland", to: "Reykjavík" }
        ],
        isFunction: true,
        functionExplain: "Ez a hozzárendelés függvény, mert az alaphalmaz (országok) minden egyes eleméhez pontosan egy képhalmazbeli elem (főváros) tartozik."
    },
    {
        id: 2,
        title: "2. szint: Földrészek",
        ruleDesc: "Kösd össze az országokat azzal a kontinenssel, ahol elhelyezkednek!",
        domain: ["Botswana", "Szlovénia", "Afganisztán", "Olaszország", "Banglades"],
        codomain: ["Európa", "Ázsia", "Afrika"],
        correctConnections: [
            { from: "Botswana", to: "Afrika" },
            { from: "Szlovénia", to: "Európa" },
            { from: "Afganisztán", to: "Ázsia" },
            { from: "Olaszország", to: "Európa" },
            { from: "Banglades", to: "Ázsia" }
        ],
        isFunction: true,
        functionExplain: "Ez a hozzárendelés függvény, mert az alaphalmaz (országok) minden eleméhez pontosan egy képhalmazbeli elem (kontinens) tartozik. Az nem akadály, hogy a képhalmazban van olyan elem (pl. Európa), amelyhez több ország is kapcsolódik, a lényeg, hogy minden kiinduló országból pontosan egy nyíl indul ki."
    },
    {
        id: 3,
        title: "3. szint: Szerzők és műveik",
        ruleDesc: "Kösd össze a híres magyar szerzőket a megadott műveikkel!",
        domain: ["Petőfi Sándor", "Arany János", "Vörösmarty Mihály", "József Attila", "Móricz Zsigmond"],
        codomain: ["János vitéz", "Toldi", "Csongor és Tünde", "Óda", "Hét krajcár"],
        correctConnections: [
            { from: "Petőfi Sándor", to: "János vitéz" },
            { from: "Arany János", to: "Toldi" },
            { from: "Vörösmarty Mihály", to: "Csongor és Tünde" },
            { from: "József Attila", to: "Óda" },
            { from: "Móricz Zsigmond", to: "Hét krajcár" }
        ],
        isFunction: true,
        functionExplain: "Ez a hozzárendelés függvény, mert az alaphalmaz (szerzők) minden egyes eleméhez pontosan egy képhalmazbeli elem (mű) tartozik."
    },
    {
        id: 4,
        title: "4. szint: Kétszerese",
        ruleDesc: "Kösd össze a számokat a kétszeresükkel! (x ↦ 2x)",
        domain: ["2", "3", "5", "7", "10"],
        codomain: ["4", "6", "8", "10", "14", "15", "20"],
        correctConnections: [
            { from: "2", to: "4" },
            { from: "3", to: "6" },
            { from: "5", to: "10" },
            { from: "7", to: "14" },
            { from: "10", to: "20" }
        ],
        isFunction: true,
        functionExplain: "Ez a hozzárendelés függvény, mert az alaphalmaz minden egyes számához pontosan egy darab kétszeres érték tartozik a képhalmazban. (Az, hogy a képhalmazban vannak kimaradt számok, mint a 8 vagy 15, nem rontja el a függvény tulajdonságot.)"
    },
    {
        id: 5,
        title: "5. szint: Négyzete",
        ruleDesc: "Kösd össze a számokat a négyzetükkel! (x ↦ x²)",
        domain: ["1", "2", "3", "4", "5", "6"],
        codomain: ["1", "4", "9", "12", "16", "25", "36"],
        correctConnections: [
            { from: "1", to: "1" },
            { from: "2", to: "4" },
            { from: "3", to: "9" },
            { from: "4", to: "16" },
            { from: "5", to: "25" },
            { from: "6", to: "36" }
        ],
        isFunction: true,
        functionExplain: "Ez a hozzárendelés függvény, mert az alaphalmaz minden egyes számához pontosan egy négyzetérték tartozik a képhalmazban."
    },
    {
        id: 6,
        title: "6. szint: Osztója a...",
        ruleDesc: "Kösd össze az alaphalmaz elemeit azokkal a számokkal, amelyeknek osztói! (x osztója y-nak)",
        domain: ["2", "3", "5", "7"],
        codomain: ["6", "9", "10", "14", "21", "25"],
        correctConnections: [
            { from: "2", to: "6" },
            { from: "2", to: "10" },
            { from: "2", to: "14" },
            { from: "3", to: "6" },
            { from: "3", to: "9" },
            { from: "3", to: "21" },
            { from: "5", to: "10" },
            { from: "5", to: "25" },
            { from: "7", to: "14" },
            { from: "7", to: "21" }
        ],
        isFunction: false,
        functionExplain: "Ez a hozzárendelés NEM függvény (hanem reláció), mert van olyan alaphalmazbeli elem, amihez több képhalmazbeli elem is tartozik (például a 2 osztója a 6-nak, a 10-nek és a 14-nek is, így belőle három nyíl is indul)."
    }
];

export function MappingQuiz({ onBack }: { onBack: () => void }) {
    const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    
    // Function question state
    const [selectedFunctionAnswer, setSelectedFunctionAnswer] = useState<boolean | null>(null);
    
    // Feedback and solution states
    const [isVerified, setIsVerified] = useState(false);
    const [showSolutions, setShowSolutions] = useState(false);
    const [isCorrectResult, setIsCorrectResult] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [score, setScore] = useState(0);
    
    // Tracks completed level IDs
    const [completedLevels, setCompletedLevels] = useState<number[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);
    const [arrowCoords, setArrowCoords] = useState<ArrowCoordinate[]>([]);

    const currentLevel = LEVELS.find(l => l.id === selectedLevelId);

    // Initialize/reset a level
    const startLevel = (levelId: number) => {
        setSelectedLevelId(levelId);
        setConnections([]);
        setSelectedLeft(null);
        setSelectedFunctionAnswer(null);
        setIsVerified(false);
        setShowSolutions(false);
        setIsCorrectResult(false);
        setArrowCoords([]);
    };

    // Toggle connection between elements
    const handleLeftClick = (value: string) => {
        if (isVerified || showSolutions) return;
        setSelectedLeft(value === selectedLeft ? null : value);
    };

    const handleRightClick = (value: string) => {
        if (isVerified || showSolutions) return;
        if (!selectedLeft) return;

        // Check if connection already exists
        const exists = connections.some(c => c.from === selectedLeft && c.to === value);
        
        let newConnections: Connection[];
        if (exists) {
            // Remove connection
            newConnections = connections.filter(c => !(c.from === selectedLeft && c.to === value));
        } else {
            // Add connection
            newConnections = [...connections, { from: selectedLeft, to: value }];
        }
        
        setConnections(newConnections);
        setSelectedLeft(null); // Reset selection
    };

    // Clear all connections
    const clearConnections = () => {
        if (isVerified || showSolutions) return;
        setConnections([]);
        setSelectedLeft(null);
    };

    // Calculate positions of SVG arrows
    const recalculateCoords = () => {
        if (!containerRef.current || !currentLevel) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        
        // 1. Calculate user connections coords
        const userCoords = connections.map(conn => {
            const leftEl = document.getElementById(`left-${conn.from}`);
            const rightEl = document.getElementById(`right-${conn.to}`);
            
            if (!leftEl || !rightEl) return null;
            
            const leftRect = leftEl.getBoundingClientRect();
            const rightRect = rightEl.getBoundingClientRect();
            
            return {
                from: conn.from,
                to: conn.to,
                x1: leftRect.right - containerRect.left,
                y1: leftRect.top + leftRect.height / 2 - containerRect.top,
                x2: rightRect.left - containerRect.left,
                y2: rightRect.top + rightRect.height / 2 - containerRect.top
            };
        }).filter(Boolean) as ArrowCoordinate[];

        // 2. If showing solutions, include correct but missing connections as dashed purple lines
        if (showSolutions) {
            const solutionCoords = currentLevel.correctConnections.map(conn => {
                // If user already connected this, don't draw duplicate
                const alreadyConnected = connections.some(c => c.from === conn.from && c.to === conn.to);
                if (alreadyConnected) return null;

                const leftEl = document.getElementById(`left-${conn.from}`);
                const rightEl = document.getElementById(`right-${conn.to}`);
                
                if (!leftEl || !rightEl) return null;
                
                const leftRect = leftEl.getBoundingClientRect();
                const rightRect = rightEl.getBoundingClientRect();
                
                return {
                    from: conn.from,
                    to: conn.to,
                    x1: leftRect.right - containerRect.left,
                    y1: leftRect.top + leftRect.height / 2 - containerRect.top,
                    x2: rightRect.left - containerRect.left,
                    y2: rightRect.top + rightRect.height / 2 - containerRect.top
                };
            }).filter(Boolean) as ArrowCoordinate[];

            setArrowCoords([...userCoords, ...solutionCoords]);
        } else {
            setArrowCoords(userCoords);
        }
    };

    // Handle recalculation on mount/resize/changes
    useEffect(() => {
        if (selectedLevelId) {
            recalculateCoords();
            // A tiny timeout helps when rendering layout changes
            const timer = setTimeout(recalculateCoords, 100);
            
            window.addEventListener('resize', recalculateCoords);
            return () => {
                clearTimeout(timer);
                window.removeEventListener('resize', recalculateCoords);
            };
        }
    }, [selectedLevelId, connections, showSolutions, isVerified]);

    // Check answers
    const verifyLevel = () => {
        if (!currentLevel || isVerified) return;

        setAttempts(prev => prev + 1);

        // Check arrow connections
        const allUserConnectionsCorrect = connections.every(userConn => 
            currentLevel.correctConnections.some(corrConn => 
                corrConn.from === userConn.from && corrConn.to === userConn.to
            )
        );

        const allCorrectConnectionsDrawn = currentLevel.correctConnections.every(corrConn => 
            connections.some(userConn => 
                userConn.from === corrConn.from && userConn.to === corrConn.to
            )
        );

        const connectionsPerfect = allUserConnectionsCorrect && allCorrectConnectionsDrawn && connections.length === currentLevel.correctConnections.length;

        // Check if function question is correct
        const functionAnswerCorrect = selectedFunctionAnswer === currentLevel.isFunction;

        const isEverythingCorrect = connectionsPerfect && functionAnswerCorrect;

        setIsVerified(true);
        setIsCorrectResult(isEverythingCorrect);

        if (isEverythingCorrect) {
            setScore(prev => prev + 1);
            if (!completedLevels.includes(currentLevel.id)) {
                setCompletedLevels(prev => [...prev, currentLevel.id]);
            }
            confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#3b82f6', '#10b981', '#f59e0b', '#a855f7']
            });
        }
    };

    const handleRevealSolution = () => {
        if (!currentLevel) return;
        setShowSolutions(true);
        setIsVerified(true);
        setSelectedFunctionAnswer(currentLevel.isFunction);
        // Load the actual connections to state
        setConnections(currentLevel.correctConnections);
    };

    if (!selectedLevelId) {
        return (
            <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between px-2">
                    <Button variant="ghost" onClick={onBack} size="sm" className="hover:bg-slate-100 text-xs font-bold">
                        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                        Vissza
                    </Button>
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">Hozzárendelés és Függvény Kvíz</h2>
                    <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-2xl border border-amber-200 shadow-sm text-xs font-black text-amber-700">
                        <Trophy className="w-3.5 h-3.5" />
                        <span>{completedLevels.length}/{LEVELS.length} Kész</span>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg flex items-center gap-4">
                    <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm hidden sm:block">
                        <HelpCircle className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-sm mb-0.5">Hogyan kell játszani?</h3>
                        <p className="text-blue-100 text-xs leading-normal">
                            Válaszd ki az egyik szintet! Kattints a bal oldali alaphalmaz egyik elemére, 
                            majd a jobb oldali képhalmaz egy elemére az összekötéshez. 
                            Végül döntsd el, hogy a hozzárendelés függvény-e!
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {LEVELS.map((level) => {
                        const isCompleted = completedLevels.includes(level.id);
                        const isNumeric = level.id >= 4;

                        return (
                            <button
                                key={level.id}
                                onClick={() => startLevel(level.id)}
                                className={cn(
                                    "flex flex-col items-start p-5 bg-white border-2 rounded-2xl text-left hover:shadow-md hover:scale-[1.01] transition-all group relative overflow-hidden",
                                    isCompleted 
                                        ? "border-emerald-100 hover:border-emerald-400 bg-emerald-50/20" 
                                        : "border-slate-100 hover:border-blue-400"
                                )}
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100/50 rounded-full translate-x-8 -translate-y-8 group-hover:scale-125 transition-transform duration-500" />
                                
                                <div className="flex items-center justify-between w-full mb-2 z-10">
                                    <span className={cn(
                                        "text-[10px] font-black px-2 py-0.5 rounded-full",
                                        isNumeric 
                                            ? "bg-purple-100 text-purple-700" 
                                            : "bg-blue-100 text-blue-700"
                                    )}>
                                        {isNumeric ? "Számos" : "Szöveges"}
                                    </span>
                                    {isCompleted && (
                                        <div className="p-0.5 bg-emerald-100 text-emerald-600 rounded-full">
                                            <Check className="w-3 h-3 stroke-[3]" />
                                        </div>
                                    )}
                                </div>

                                <h4 className="text-sm font-black text-slate-800 mb-0.5 z-10 leading-tight">
                                    {level.title}
                                </h4>
                                <p className="text-[11px] text-slate-500 font-medium mb-3 line-clamp-1 z-10">
                                    {level.ruleDesc}
                                </p>
                                
                                <span className={cn(
                                    "mt-auto text-[10px] font-bold px-2.5 py-0.5 rounded-lg transition-colors z-10",
                                    isCompleted 
                                        ? "bg-emerald-100 text-emerald-700" 
                                        : "bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white"
                                )}>
                                    {isCompleted ? "Teljesítve" : "Indítás"}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Determine correct status of arrows for styling elements
    const getLeftItemStatus = (val: string) => {
        if (!isVerified) return 'default';
        const userConns = connections.filter(c => c.from === val);
        if (userConns.length === 0) {
            const shouldHave = currentLevel?.correctConnections.some(c => c.from === val);
            return shouldHave ? 'missing' : 'correct-empty';
        }

        const allCorrect = userConns.every(uc => 
            currentLevel?.correctConnections.some(cc => cc.from === uc.from && cc.to === uc.to)
        );
        
        const totalCorrectNeeded = currentLevel?.correctConnections.filter(c => c.from === val).length || 0;
        const correctMade = userConns.filter(uc => 
            currentLevel?.correctConnections.some(cc => cc.from === uc.from && cc.to === uc.to)
        ).length;
        
        if (allCorrect && totalCorrectNeeded === correctMade) return 'correct';
        return 'incorrect';
    };

    const getRightItemStatus = (val: string) => {
        if (!isVerified) return 'default';
        const userConns = connections.filter(c => c.to === val);
        if (userConns.length === 0) {
            const shouldHave = currentLevel?.correctConnections.some(c => c.to === val);
            return shouldHave ? 'missing' : 'correct-empty';
        }

        const allCorrect = userConns.every(uc => 
            currentLevel?.correctConnections.some(cc => cc.from === uc.from && cc.to === uc.to)
        );
        
        const totalCorrectNeeded = currentLevel?.correctConnections.filter(c => c.to === val).length || 0;
        const correctMade = userConns.filter(uc => 
            currentLevel?.correctConnections.some(cc => cc.from === uc.from && cc.to === uc.to)
        ).length;

        if (allCorrect && totalCorrectNeeded === correctMade) return 'correct';
        return 'incorrect';
    };

    return (
        <div className="flex flex-col gap-3 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header & Subtitle */}
            <div className="flex items-center justify-between px-1">
                <Button 
                    variant="ghost" 
                    onClick={() => setSelectedLevelId(null)} 
                    size="sm" 
                    className="hover:bg-slate-100 text-xs font-bold h-8"
                >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    Szintek
                </Button>
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-base font-black text-slate-800 leading-tight">
                        {currentLevel.title}
                    </h2>
                    <span className="text-[11px] text-slate-500 font-bold max-w-xs sm:max-w-md line-clamp-1">
                        {currentLevel.ruleDesc}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Button 
                        variant="ghost" 
                        onClick={() => startLevel(currentLevel.id)} 
                        size="sm" 
                        className="text-slate-500 hover:bg-slate-100 text-xs font-bold h-8"
                    >
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        Újra
                    </Button>
                </div>
            </div>

            {/* Main Interactive Board Card */}
            <Card className="border-2 shadow-lg bg-slate-50/40 p-4 relative overflow-hidden flex flex-col items-stretch">
                
                {/* Arrow instructions overlay when left is selected */}
                {selectedLeft && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-black text-[10px] py-1 px-3 rounded-full shadow-md animate-bounce z-20">
                        Válassz egy elemet a Képhalmazból (B) az összekötéshez!
                    </div>
                )}

                {/* Side-by-side Layout on lg, stacked on smaller screens */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 w-full relative">
                    
                    {/* Left Column: Mappings Board (Ovals + SVG) */}
                    <div 
                        ref={containerRef}
                        className="flex-1 w-full max-w-lg flex flex-row justify-between items-center gap-3 relative py-4"
                    >
                        {/* SVG Arrow layer */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none select-none z-10" style={{ overflow: 'visible' }}>
                            <defs>
                                <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3b82f6" />
                                </marker>
                                <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
                                </marker>
                                <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444" />
                                </marker>
                                <marker id="arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#a855f7" />
                                </marker>
                            </defs>
                            
                            {arrowCoords.map((coord, idx) => {
                                let strokeColor = '#3b82f6';
                                let markerId = 'arrow-blue';
                                let isDashed = false;
                                
                                if (isVerified) {
                                    const isCorrect = currentLevel.correctConnections.some(
                                        cc => cc.from === coord.from && cc.to === coord.to
                                    );
                                    if (isCorrect) {
                                        strokeColor = '#10b981';
                                        markerId = 'arrow-green';
                                    } else {
                                        strokeColor = '#ef4444';
                                        markerId = 'arrow-red';
                                    }
                                } else if (showSolutions) {
                                    strokeColor = '#a855f7';
                                    markerId = 'arrow-purple';
                                    isDashed = true;
                                }
                                
                                return (
                                    <g key={idx}>
                                        <line
                                            x1={coord.x1}
                                            y1={coord.y1}
                                            x2={coord.x2 - 10}
                                            y2={coord.y2}
                                            stroke="white"
                                            strokeWidth={5}
                                            className="opacity-70"
                                        />
                                        <line
                                            x1={coord.x1}
                                            y1={coord.y1}
                                            x2={coord.x2 - 10}
                                            y2={coord.y2}
                                            stroke={strokeColor}
                                            strokeWidth={2.5}
                                            strokeDasharray={isDashed ? "4,4" : undefined}
                                            markerEnd={`url(#${markerId})`}
                                            className="transition-all duration-300 animate-fade-in"
                                        />
                                    </g>
                                );
                            })}
                        </svg>

                        {/* ALAPHALMAZ (A) */}
                        <div className="flex flex-col items-center gap-1.5 flex-1">
                            <div className="text-amber-900 font-extrabold text-[10px] uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200 shadow-sm">
                                Alaphalmaz (A)
                            </div>
                            <div className="w-full h-[18rem] border-3 border-amber-800/60 bg-amber-50/80 rounded-[50%_/_30%] shadow-md flex flex-col justify-around items-center py-4 px-2 z-10">
                                {currentLevel.domain.map((item, idx) => {
                                    const isSelected = selectedLeft === item;
                                    const status = getLeftItemStatus(item);

                                    return (
                                        <button
                                            key={`left-${idx}`}
                                            id={`left-${item}`}
                                            onClick={() => handleLeftClick(item)}
                                            className={cn(
                                                "w-22 sm:w-28 min-h-[2.1rem] py-1 px-1.5 bg-white border-2 font-extrabold rounded-xl shadow-sm transition-all text-[10px] sm:text-xs text-center flex items-center justify-center leading-tight select-none",
                                                isSelected 
                                                    ? "border-blue-600 bg-blue-50 text-blue-900 ring-3 ring-blue-100 scale-105" 
                                                    : "border-amber-900/10 text-slate-800 hover:border-blue-400 hover:scale-102",
                                                status === 'correct' && "border-emerald-500 bg-emerald-50 text-emerald-900",
                                                status === 'incorrect' && "border-rose-500 bg-rose-50 text-rose-900",
                                                status === 'missing' && "border-purple-300 bg-purple-50/50 text-purple-900 border-dashed"
                                            )}
                                        >
                                            {item}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* KÉPHALMAZ (B) */}
                        <div className="flex flex-col items-center gap-1.5 flex-1">
                            <div className="text-amber-900 font-extrabold text-[10px] uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200 shadow-sm">
                                Képhalmaz (B)
                            </div>
                            <div className="w-full h-[18rem] border-3 border-amber-800/60 bg-amber-50/80 rounded-[50%_/_30%] shadow-md flex flex-col justify-around items-center py-4 px-2 z-10">
                                {currentLevel.codomain.map((item, idx) => {
                                    const status = getRightItemStatus(item);
                                    const isClickable = selectedLeft !== null;

                                    return (
                                        <button
                                            key={`right-${idx}`}
                                            id={`right-${item}`}
                                            onClick={() => handleRightClick(item)}
                                            disabled={!isClickable}
                                            className={cn(
                                                "w-22 sm:w-28 min-h-[2.1rem] py-1 px-1.5 bg-white border-2 font-extrabold rounded-xl shadow-sm transition-all text-[10px] sm:text-xs text-center flex items-center justify-center leading-tight select-none",
                                                isClickable
                                                    ? "border-amber-900/10 hover:border-blue-500 hover:scale-102 cursor-pointer text-slate-800 hover:bg-blue-50/20"
                                                    : "border-amber-900/5 text-slate-400 cursor-default",
                                                status === 'correct' && "border-emerald-500 bg-emerald-50 text-emerald-900",
                                                status === 'incorrect' && "border-rose-500 bg-rose-50 text-rose-900",
                                                status === 'missing' && "border-purple-300 bg-purple-50/50 text-purple-900 border-dashed"
                                            )}
                                        >
                                            {item}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Question Panel + Actions + Pedagogy */}
                    <div className="w-full lg:w-72 xl:w-80 flex flex-col gap-3 z-20">
                        
                        {/* Question: Is it a function? */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                            <h4 className="text-xs font-black text-slate-800 mb-2.5 flex items-center gap-1.5">
                                <HelpCircle className="w-4 h-4 text-indigo-500" />
                                Függvény-e ez a hozzárendelés?
                            </h4>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => !isVerified && setSelectedFunctionAnswer(true)}
                                    disabled={isVerified}
                                    className={cn(
                                        "py-2 px-3 rounded-xl border font-bold text-xs transition-all flex items-center justify-center gap-1.5",
                                        selectedFunctionAnswer === true
                                            ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                                            : "border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/20 text-slate-700",
                                        isVerified && currentLevel.isFunction && "bg-emerald-500 border-emerald-500 text-white shadow-none",
                                        isVerified && !currentLevel.isFunction && selectedFunctionAnswer === true && "bg-rose-500 border-rose-500 text-white shadow-none"
                                    )}
                                >
                                    {isVerified && currentLevel.isFunction && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                    {isVerified && !currentLevel.isFunction && selectedFunctionAnswer === true && <X className="w-3.5 h-3.5 stroke-[3]" />}
                                    Igen, függvény
                                </button>
                                <button
                                    onClick={() => !isVerified && setSelectedFunctionAnswer(false)}
                                    disabled={isVerified}
                                    className={cn(
                                        "py-2 px-3 rounded-xl border font-bold text-xs transition-all flex items-center justify-center gap-1.5",
                                        selectedFunctionAnswer === false
                                            ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                                            : "border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/20 text-slate-700",
                                        isVerified && !currentLevel.isFunction && "bg-emerald-500 border-emerald-500 text-white shadow-none",
                                        isVerified && currentLevel.isFunction && selectedFunctionAnswer === false && "bg-rose-500 border-rose-500 text-white shadow-none"
                                    )}
                                >
                                    {isVerified && !currentLevel.isFunction && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                    {isVerified && currentLevel.isFunction && selectedFunctionAnswer === false && <X className="w-3.5 h-3.5 stroke-[3]" />}
                                    Nem, nem függvény
                                </button>
                            </div>
                        </div>

                        {/* Validation Feedback & Pedagogy */}
                        {isVerified && (
                            <div className={cn(
                                "rounded-2xl p-3 border animate-in fade-in duration-300 text-[11px]",
                                isCorrectResult 
                                    ? "bg-emerald-50 border-emerald-200 text-emerald-900" 
                                    : "bg-rose-50 border-rose-200 text-rose-900"
                            )}>
                                <div className="flex gap-2">
                                    {isCorrectResult ? (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    ) : (
                                        <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                                    )}
                                    <div>
                                        <h5 className="font-extrabold mb-0.5">
                                            {isCorrectResult ? "Hibátlan megoldás!" : "Próbáld újra!"}
                                        </h5>
                                        <p className="opacity-90 leading-tight mb-2">
                                            {isCorrectResult 
                                                ? "Sikeresen bekötötted és helyesen megválaszoltad a kérdést!" 
                                                : "Ellenőrizd az összekötéseket és a függvény kérdést."}
                                        </p>
                                        <div className="p-2 bg-white/75 rounded-lg border border-black/5 text-[10px] font-medium text-slate-700 leading-snug">
                                            <span className="font-bold block mb-0.5">Magyarázat:</span>
                                            {currentLevel.functionExplain}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons Panel */}
                        <div className="flex flex-col gap-2 w-full mt-auto">
                            {!isVerified ? (
                                <div className="grid grid-cols-2 gap-2">
                                    <Button 
                                        onClick={clearConnections}
                                        variant="outline"
                                        className="rounded-xl font-bold text-xs border-slate-300 hover:bg-slate-100 py-1.5 h-9"
                                    >
                                        Törlés
                                    </Button>
                                    <Button
                                        onClick={verifyLevel}
                                        disabled={connections.length === 0 || selectedFunctionAnswer === null}
                                        className="rounded-xl font-black text-xs bg-blue-600 hover:bg-blue-700 text-white py-1.5 h-9 shadow"
                                    >
                                        Ellenőrzés
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {!isCorrectResult && !showSolutions && (
                                        <Button 
                                            onClick={handleRevealSolution}
                                            variant="outline"
                                            className="rounded-xl font-bold text-xs border-purple-300 text-purple-700 hover:bg-purple-50 py-1.5 h-9"
                                        >
                                            Megoldás mutatása
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => {
                                            if (currentLevel.id < LEVELS.length) {
                                                startLevel(currentLevel.id + 1);
                                            } else {
                                                setSelectedLevelId(null);
                                            }
                                        }}
                                        className="rounded-xl font-black text-xs bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 h-9 w-full"
                                    >
                                        {currentLevel.id < LEVELS.length ? "Következő szint" : "Vissza a szintekhez"}
                                    </Button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </Card>
        </div>
    );
}
