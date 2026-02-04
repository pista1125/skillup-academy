import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    ArrowLeft,
    RotateCcw,
    CheckCircle2,
    XCircle,
    Trophy,
    Target,
    Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface Region {
    id: string;
    name: string;
    description: string;
    path: string;
    color: string;
    textColor: string;
}

const REGIONS: Region[] = [
    {
        id: 'alfold',
        name: 'Alföld',
        description: 'Magyarország legnagyobb tájegysége, az ország területének több mint a felét foglalja el. Felszíne sík, legmagasabb pontjai a buckák.',
        path: "M 252 82 L 268 85 L 285 75 L 305 78 L 322 70 L 335 85 L 358 82 L 375 70 L 398 75 L 420 62 L 445 78 L 472 90 L 485 115 L 478 145 L 492 170 L 485 205 L 452 238 L 465 265 L 432 285 L 395 272 L 365 295 L 332 288 L 305 298 L 275 285 L 255 265 L 255 195 L 235 185 L 225 155 L 252 145 L 252 82 Z",
        color: '#fef3c7', // Yellow-50
        textColor: '#92400e' // Amber-800
    },
    {
        id: 'kisalfold',
        name: 'Kisalföld',
        description: 'Az ország északnyugati részén elhelyezkedő síkság. Fontos mezőgazdasági terület és közlekedési folyosó.',
        path: "M 115 52 L 138 45 L 175 48 L 205 60 L 215 95 L 185 118 L 142 122 L 128 105 L 115 52 Z",
        color: '#dcfce7', // Green-50
        textColor: '#166534' // Green-800
    },
    {
        id: 'alpokalja',
        name: 'Alpokalja',
        description: 'Az Alpok legkeletibb nyúlványa Magyarországon. Itt található az ország legcsapadékosabb területe és az Írott-kő is.',
        path: "M 115 52 L 128 105 L 105 138 L 78 142 L 52 135 L 25 118 L 38 75 L 75 55 L 115 52 Z",
        color: '#ecfdf5', // Emerald-50
        textColor: '#065f46' // Emerald-800
    },
    {
        id: 'dunantuli-dombsag',
        name: 'Dunántúli-dombság',
        description: 'Változatos dombvidék a Dunántúli-középhegységtől délre. Itt található a Mecsek és a Villányi-hegység is.',
        path: "M 105 138 L 128 105 L 142 122 L 185 118 L 225 155 L 235 185 L 255 195 L 255 265 L 215 288 L 175 275 L 145 282 L 108 262 L 72 278 L 45 255 L 62 215 L 105 138 Z",
        color: '#ffedd5', // Orange-50
        textColor: '#9a3412' // Orange-800
    },
    {
        id: 'dunantuli-kozephegyseg',
        name: 'Dunántúli-középhegység',
        description: 'A Dunántúlon átlósan végighúzódó hegylánc. Részei a Bakony, a Vértes, a Gerecse és a Pilis.',
        path: "M 185 118 L 215 95 L 252 82 L 252 145 L 225 155 L 185 118 Z",
        color: '#d1fae5', // Emerald-100
        textColor: '#064e3b' // Emerald-900
    },
    {
        id: 'eszaki-kozephegyseg',
        name: 'Északi-középhegység',
        description: 'A Duna kanyarulatától a Bodrogig húzódó hegylánc. Itt található Magyarország legmagasabb pontja, a Kékes (1014 m).',
        path: "M 252 82 L 285 32 L 315 25 L 345 38 L 385 15 L 425 22 L 465 52 L 445 78 L 420 62 L 398 75 L 375 70 L 358 82 L 335 85 L 322 70 L 305 78 L 285 75 L 268 85 L 252 82 Z",
        color: '#e0f2fe', // Blue-50
        textColor: '#075985' // Blue-800
    }
];

export function BlindMapHungary({ onBack }: { onBack: () => void }) {
    const [currentChallenge, setCurrentChallenge] = useState<Region | null>(null);
    const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

    const generateChallenge = useCallback(() => {
        const remainingRegions = REGIONS.filter(r => r.id !== currentChallenge?.id);
        const randomRegion = remainingRegions[Math.floor(Math.random() * remainingRegions.length)];
        setCurrentChallenge(randomRegion);
        setSelectedRegionId(null);
        setIsCorrect(null);
    }, [currentChallenge]);

    useEffect(() => {
        generateChallenge();
    }, []);

    const handleRegionClick = (regionId: string) => {
        if (selectedRegionId !== null) return;

        setSelectedRegionId(regionId);
        const correct = regionId === currentChallenge?.id;
        setIsCorrect(correct);
        setTotalAttempts(prev => prev + 1);

        if (correct) {
            setScore(prev => prev + 1);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#10b981', '#3b82f6', '#f59e0b']
            });
        }
    };

    return (
        <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* HUD */}
            <div className="flex items-center justify-between px-2 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <Button variant="ghost" onClick={onBack} size="sm" className="hover:bg-slate-100">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Vissza
                </Button>
                <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-emerald-500" />
                    <h2 className="text-base font-bold text-slate-700">Hol található?</h2>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
                        <Trophy className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-bold text-emerald-700">{score}/{totalAttempts}</span>
                    </div>
                    <Button variant="ghost" onClick={() => { setScore(0); setTotalAttempts(0); generateChallenge(); }} size="sm" className="text-slate-400">
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Challenge & Info Card */}
                <div className="lg:col-span-1 space-y-4">
                    <Card className="border-2 border-emerald-100 bg-emerald-50/30 overflow-hidden">
                        <CardContent className="p-6 text-center">
                            <span className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-2 block">Keresd meg ezt a tájegységet:</span>
                            <h3 className="text-3xl font-display font-black text-emerald-900 mb-4">{currentChallenge?.name}</h3>
                            <p className="text-sm text-emerald-700/80 leading-relaxed italic">
                                "Kattints a térképen arra a területre, amelyik szerinted a(z) {currentChallenge?.name}!"
                            </p>
                        </CardContent>
                    </Card>

                    {selectedRegionId !== null && (
                        <Card className={cn(
                            "border-2 animate-in slide-in-from-left-4 duration-300",
                            isCorrect ? "border-emerald-200 bg-white" : "border-rose-200 bg-white"
                        )}>
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className={cn(
                                        "p-3 rounded-2xl",
                                        isCorrect ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                                    )}>
                                        {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <h4 className={cn(
                                            "font-bold text-lg mb-1",
                                            isCorrect ? "text-emerald-700" : "text-rose-700"
                                        )}>
                                            {isCorrect ? 'Tökéletes!' : 'Sajnos nem...'}
                                        </h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {isCorrect
                                                ? currentChallenge?.description
                                                : `Amit kijelöltél, az a(z) ${REGIONS.find(r => r.id === selectedRegionId)?.name}. Próbáld meg újra!`
                                            }
                                        </p>
                                    </div>
                                </div>
                                {isCorrect && (
                                    <Button
                                        onClick={generateChallenge}
                                        className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 rounded-2xl text-lg shadow-lg shadow-emerald-600/20"
                                    >
                                        Következő tájegység
                                    </Button>
                                )}
                                {!isCorrect && (
                                    <Button
                                        onClick={() => { setSelectedRegionId(null); setIsCorrect(null); }}
                                        className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold"
                                    >
                                        Megpróbálom újra
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Map Visualization */}
                <Card className="lg:col-span-2 overflow-hidden border-2 border-slate-100 bg-white shadow-xl relative min-h-[400px]">
                    <CardContent className="p-8 flex items-center justify-center h-full">
                        <svg
                            viewBox="0 0 500 320"
                            className="w-full h-auto drop-shadow-2xl"
                            style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.1))' }}
                        >
                            {/* Hungary Outline / Shadow */}
                            <path
                                d="M 115 52 L 138 45 L 175 48 L 205 60 L 215 95 L 252 82 L 285 32 L 315 25 L 345 38 L 385 15 L 425 22 L 465 52 L 472 90 L 485 115 L 478 145 L 492 170 L 485 205 L 452 238 L 465 265 L 432 285 L 395 272 L 365 295 L 332 288 L 305 298 L 275 285 L 255 265 L 215 288 L 175 275 L 145 282 L 108 262 L 72 278 L 45 255 L 62 215 L 105 138 L 78 142 L 52 135 L 25 118 L 38 75 L 75 55 L 115 52 Z"
                                fill="#f1f5f9"
                                stroke="#cbd5e1"
                                strokeWidth="2"
                            />

                            {/* Regions */}
                            {REGIONS.map((region) => (
                                <g
                                    key={region.id}
                                    onClick={() => handleRegionClick(region.id)}
                                    onMouseEnter={() => setHoveredRegion(region.id)}
                                    onMouseLeave={() => setHoveredRegion(null)}
                                    className="cursor-pointer transition-all duration-300"
                                >
                                    <path
                                        d={region.path}
                                        fill={
                                            selectedRegionId === region.id
                                                ? (isCorrect ? '#10b981' : '#ef4444')
                                                : (hoveredRegion === region.id ? '#cbd5e1' : region.color)
                                        }
                                        stroke={selectedRegionId === region.id ? '#fff' : '#94a3b8'}
                                        strokeWidth={selectedRegionId === region.id ? '3' : '1.5'}
                                        className="transition-all duration-300"
                                        style={{
                                            transformOrigin: 'center',
                                            transform: hoveredRegion === region.id && selectedRegionId === null ? 'scale(1.02)' : 'scale(1)'
                                        }}
                                    />
                                    {/* Debug/Hints could be added here if needed */}
                                    {selectedRegionId !== null && (
                                        <text
                                            x={getRegionCenter(region.id).x}
                                            y={getRegionCenter(region.id).y}
                                            textAnchor="middle"
                                            fill={region.textColor}
                                            className="text-[10px] font-black uppercase tracking-tighter pointer-events-none fade-in animate-in"
                                            style={{ filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.5))' }}
                                        >
                                            {region.name}
                                        </text>
                                    )}
                                </g>
                            ))}
                        </svg>

                        {/* Legend / Tooltip */}
                        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-medium text-slate-500 shadow-sm">
                            <Info className="w-3 h-3 text-slate-400" />
                            <span>Magyarország nagytájai</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// Utility to get a visual center for labels
function getRegionCenter(id: string) {
    switch (id) {
        case 'alfold': return { x: 370, y: 180 };
        case 'kisalfold': return { x: 165, y: 85 };
        case 'alpokalja': return { x: 75, y: 100 };
        case 'dunantuli-dombsag': return { x: 155, y: 220 };
        case 'dunantuli-kozephegyseg': return { x: 220, y: 125 };
        case 'eszaki-kozephegyseg': return { x: 350, y: 55 };
        default: return { x: 250, y: 150 };
    }
}
