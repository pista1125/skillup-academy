import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    ArrowLeft,
    RotateCcw,
    CheckCircle2,
    XCircle,
    Trophy,
    Target,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

type AngleType = 'nullszög' | 'hegyesszög' | 'derékszög' | 'tompaszög' | 'egyenesszög' | 'domború szög' | 'teljes szög';

interface AngleChallenge {
    angle: number;
    correctType: AngleType;
    options: AngleType[];
}

const ANGLE_TYPES: { type: AngleType; label: string; description: string; color: string }[] = [
    { type: 'nullszög', label: 'Nullszög', description: 'Pontosan 0°', color: 'bg-slate-100 text-slate-700' },
    { type: 'hegyesszög', label: 'Hegyesszög', description: '0° és 90° között', color: 'bg-blue-100 text-blue-700' },
    { type: 'derékszög', label: 'Derékszög', description: 'Pontosan 90°', color: 'bg-emerald-100 text-emerald-700' },
    { type: 'tompaszög', label: 'Tompaszög', description: '90° és 180° között', color: 'bg-orange-100 text-orange-700' },
    { type: 'egyenesszög', label: 'Egyenesszög', description: 'Pontosan 180°', color: 'bg-purple-100 text-purple-700' },
    { type: 'domború szög', label: 'Domború szög', description: '180° és 360° között', color: 'bg-rose-100 text-rose-700' },
    { type: 'teljes szög', label: 'Teljes szög', description: 'Pontosan 360°', color: 'bg-indigo-100 text-indigo-700' },
];

export function AngleMatcher({ onBack }: { onBack: () => void }) {
    const [challenge, setChallenge] = useState<AngleChallenge | null>(null);
    const [selectedType, setSelectedType] = useState<AngleType | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);

    const generateChallenge = useCallback(() => {
        // Pick a random type to ensure variety
        const randomTypeEntry = ANGLE_TYPES[Math.floor(Math.random() * ANGLE_TYPES.length)];
        let angle = 0;

        switch (randomTypeEntry.type) {
            case 'nullszög': angle = 0; break;
            case 'hegyesszög': angle = Math.floor(Math.random() * 80) + 5; break;
            case 'derékszög': angle = 90; break;
            case 'tompaszög': angle = Math.floor(Math.random() * 80) + 95; break;
            case 'egyenesszög': angle = 180; break;
            case 'domború szög': angle = Math.floor(Math.random() * 160) + 190; break;
            case 'teljes szög': angle = 360; break;
        }

        setChallenge({
            angle,
            correctType: randomTypeEntry.type,
            options: ANGLE_TYPES.map(t => t.type).sort(() => Math.random() - 0.5)
        });
        setSelectedType(null);
        setIsCorrect(null);
    }, []);

    useEffect(() => {
        generateChallenge();
    }, [generateChallenge]);

    const handleSelect = (type: AngleType) => {
        if (selectedType !== null) return;

        setSelectedType(type);
        const correct = type === challenge?.correctType;
        setIsCorrect(correct);
        setTotalAttempts(prev => prev + 1);

        if (correct) {
            setScore(prev => prev + 1);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#10b981', '#3b82f6', '#6366f1']
            });
        }
    };

    const renderAngleIcon = (angle: number) => {
        const size = 200;
        const center = size / 2;
        const radius = 80;
        const rad = (angle * Math.PI) / 180;

        // Points
        const x1 = center + radius;
        const y1 = center;
        const x2 = center + radius * Math.cos(-rad);
        const y2 = center + radius * Math.sin(-rad);

        // Large arc flag for reflex angles
        const largeArcFlag = angle > 180 ? 1 : 0;

        return (
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto drop-shadow-sm">
                {/* Grid/Context lines */}
                <line x1={center - 90} y1={center} x2={center + 90} y2={center} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                <line x1={center} y1={center - 90} x2={center} y2={center + 90} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />

                {/* Angle Arc */}
                {angle > 0 && angle < 360 && (
                    <path
                        d={`M ${center + 25} ${center} A 25 25 0 ${largeArcFlag} 0 ${center + 25 * Math.cos(-rad)} ${center + 25 * Math.sin(-rad)}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-primary/30"
                    />
                )}
                {angle === 360 && (
                    <circle cx={center} cy={center} r="25" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary/30" />
                )}

                {/* Rays */}
                <line x1={center} y1={center} x2={x1} y2={y1} stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-slate-800" />
                <line x1={center} y1={center} x2={x2} y2={y2} stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary" />

                {/* Vertex */}
                <circle cx={center} cy={center} r="6" fill="white" stroke="#1e293b" strokeWidth="2" />
            </svg>
        );
    };

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between px-2">
                <Button variant="ghost" onClick={onBack} size="sm" className="hover:bg-slate-100 text-xs">
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    Vissza
                </Button>
                <h2 className="text-lg font-bold flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Szögek felismerése
                </h2>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                        <Trophy className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-xs font-bold text-amber-700">{score}/{totalAttempts}</span>
                    </div>
                    <Button variant="ghost" onClick={() => { setScore(0); setTotalAttempts(0); generateChallenge(); }} size="sm" className="text-muted-foreground text-xs">
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        Újrakezdés
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Question Area */}
                <div className="md:col-span-12">
                    <Card className="border shadow-sm overflow-hidden bg-white">
                        <CardContent className="p-0">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                {/* Left: Visualization */}
                                <div className="p-8 bg-slate-50/50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r">
                                    <div className="bg-white p-6 rounded-3xl shadow-inner border border-slate-100 mb-6">
                                        {challenge && renderAngleIcon(challenge.angle)}
                                    </div>
                                    <Badge variant="outline" className="text-lg px-4 py-1 font-mono bg-white shadow-sm">
                                        α = {challenge?.angle}°
                                    </Badge>
                                </div>

                                {/* Right: Options */}
                                <div className="p-8 space-y-6">
                                    <div>
                                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">
                                            Milyen típusú ez a szög?
                                        </h3>
                                        <div className="grid grid-cols-1 gap-2">
                                            {ANGLE_TYPES.map((option) => (
                                                <button
                                                    key={option.type}
                                                    disabled={selectedType !== null}
                                                    onClick={() => handleSelect(option.type)}
                                                    className={cn(
                                                        "w-full p-4 rounded-xl border-2 text-left transition-all relative group",
                                                        selectedType === null && "hover:border-primary hover:bg-primary/5 active:scale-[0.98]",
                                                        selectedType === option.type && isCorrect && "border-emerald-500 bg-emerald-50 ring-4 ring-emerald-500/10",
                                                        selectedType === option.type && !isCorrect && "border-rose-500 bg-rose-50 ring-4 ring-rose-500/10",
                                                        selectedType !== null && option.type === challenge?.correctType && !isCorrect && "border-emerald-500/50 bg-emerald-50/30",
                                                        selectedType !== null && selectedType !== option.type && option.type !== challenge?.correctType && "opacity-40 grayscale"
                                                    )}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h4 className="font-bold text-slate-800">{option.label}</h4>
                                                            <p className="text-[10px] text-slate-500">{option.description}</p>
                                                        </div>
                                                        {selectedType === option.type && (
                                                            isCorrect ? <CheckCircle2 className="w-6 h-6 text-emerald-600" /> : <XCircle className="w-6 h-6 text-rose-600" />
                                                        )}
                                                        {selectedType !== null && option.type === challenge?.correctType && !isCorrect && (
                                                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                                        )}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {selectedType !== null && (
                                        <Button
                                            onClick={generateChallenge}
                                            className="w-full h-12 text-lg font-bold bg-slate-900 hover:bg-slate-800 animate-in slide-in-from-bottom-2"
                                        >
                                            Következő szög
                                            <ChevronRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
