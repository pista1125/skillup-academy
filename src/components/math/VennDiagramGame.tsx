import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, RefreshCw, CheckCircle2, XCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

type Region = 'leftOnly' | 'rightOnly' | 'intersection' | 'outside';

interface PlacedNumber {
    value: number;
    region: Region;
    x: number;
    y: number;
}

const TOTAL_NUMBERS = 15;

export function VennDiagramGame({ onBack }: { onBack: () => void }) {
    const [numbers, setNumbers] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [placedNumbers, setPlacedNumbers] = useState<PlacedNumber[]>([]);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | 'info' } | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);

    // Animation state
    const [animatingNumber, setAnimatingNumber] = useState<{ value: number, targetRegion: Region } | null>(null);

    // Refs for regions to calculate random positions inside them
    const leftCircleRef = useRef<HTMLDivElement>(null);
    const rightCircleRef = useRef<HTMLDivElement>(null);
    const intersectionRef = useRef<HTMLDivElement>(null);
    const outsideRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        initGame();
    }, []);

    const initGame = () => {
        // Generate numbers ensuring at least one in each category
        const newNumbers: number[] = [];

        // Helper to get random int
        const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

        // 1. Even and >= 20 (Left only) -> e.g. 24, 30
        newNumbers.push(getRandom(10, 25) * 2); // 20 to 50 even

        // 2. Odd and < 20 (Right only) -> e.g. 13, 7
        newNumbers.push(getRandom(0, 9) * 2 + 1); // 1 to 19 odd

        // 3. Even and < 20 (Intersection) -> e.g. 14, 8
        newNumbers.push(getRandom(0, 9) * 2); // 0 to 18 even

        // 4. Odd and >= 20 (Outside) -> e.g. 25, 33
        newNumbers.push(getRandom(10, 24) * 2 + 1); // 21 to 49 odd

        // Fill the rest randomly between 0 and 50
        while (newNumbers.length < TOTAL_NUMBERS) {
            newNumbers.push(getRandom(0, 50));
        }

        // Shuffle
        for (let i = newNumbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newNumbers[i], newNumbers[j]] = [newNumbers[j], newNumbers[i]];
        }

        setNumbers(newNumbers);
        setCurrentIndex(0);
        setPlacedNumbers([]);
        setMessage({ text: 'Kattints arra a területre, ahová a szám tartozik!', type: 'info' });
        setIsCompleted(false);
        setAnimatingNumber(null);
    };

    const getCorrectRegion = (num: number): Region => {
        const isEven = num % 2 === 0;
        const isLessThan20 = num < 20;

        if (isEven && isLessThan20) return 'intersection';
        if (isEven && !isLessThan20) return 'leftOnly';
        if (!isEven && isLessThan20) return 'rightOnly';
        return 'outside';
    };

    const handleRegionClick = (region: Region) => {
        if (isCompleted || animatingNumber || currentIndex >= numbers.length) return;

        const currentNum = numbers[currentIndex];
        const correctRegion = getCorrectRegion(currentNum);

        if (region === correctRegion) {
            // Correct placement
            setAnimatingNumber({ value: currentNum, targetRegion: region });
            setMessage({ text: 'Helyes!', type: 'success' });

            // Wait for animation to finish before updating state
            setTimeout(() => {
                // Calculate position to prevent stacking.
                // We'll use a simple deterministic spiral or grid based on the number
                // of items already in that specific region.
                setPlacedNumbers(prev => {
                    const regionItemsCount = prev.filter(p => p.region === region).length;

                    let offsetX = 0;
                    let offsetY = 0;

                    if (region === 'intersection') {
                        // Intersection is narrow, stack them vertically
                        offsetX = 0;
                        offsetY = (regionItemsCount * 30) - 40; // Starts slightly high, goes down
                    } else if (region === 'leftOnly' || region === 'rightOnly') {
                        // Outer circles are wider, use a wider spiral/grid spacing
                        // Center is 0,0. We want to place them around the center but not in the intersection area.
                        // We push 'leftOnly' to the left (negative X) and 'rightOnly' to the right (positive X)

                        const baseOffsetDirection = region === 'leftOnly' ? -1 : 1;

                        // First item is centered (but shifted away from intersection)
                        // Subsequent items form a ring or grid
                        const positions = [
                            { x: 30 * baseOffsetDirection, y: 0 },
                            { x: 70 * baseOffsetDirection, y: -30 },
                            { x: 70 * baseOffsetDirection, y: 30 },
                            { x: 20 * baseOffsetDirection, y: -40 },
                            { x: 20 * baseOffsetDirection, y: 40 },
                            { x: 60 * baseOffsetDirection, y: -60 },
                            { x: 60 * baseOffsetDirection, y: 60 },
                            { x: 100 * baseOffsetDirection, y: 0 },
                            { x: 90 * baseOffsetDirection, y: -40 },
                            { x: 90 * baseOffsetDirection, y: 40 },
                        ];

                        // Fallback to random if we have more items than planned positions
                        if (regionItemsCount < positions.length) {
                            offsetX = positions[regionItemsCount].x;
                            offsetY = positions[regionItemsCount].y;
                        } else {
                            offsetX = (Math.random() - 0.5) * 80 + (50 * baseOffsetDirection);
                            offsetY = (Math.random() - 0.5) * 80;
                        }
                    } else {
                        // outside is handled separately in render, x y don't matter as much here
                        offsetX = 0;
                        offsetY = 0;
                    }

                    return [...prev, { value: currentNum, region, x: offsetX, y: offsetY }];
                });

                setAnimatingNumber(null);

                if (currentIndex + 1 >= numbers.length) {
                    setIsCompleted(true);
                    setMessage({ text: 'Gratulálok! Az összes számot a helyére tetted!', type: 'success' });
                    confetti({
                        particleCount: 150,
                        spread: 100,
                        origin: { y: 0.6 }
                    });
                } else {
                    setCurrentIndex(prev => prev + 1);
                    setMessage({ text: 'Kattints arra a területre, ahová a szám tartozik!', type: 'info' });
                }
            }, 500); // 500ms matches CSS transition duration

        } else {
            // Incorrect placement
            setMessage({ text: 'Hoppá! Gondold át újra, milyen tulajdonságai vannak ennek a számnak!', type: 'error' });
        }
    };

    const renderPlacedNumbers = (region: Region) => {
        return placedNumbers
            .filter(pn => pn.region === region)
            .map((pn, i) => (
                <div
                    key={i}
                    className="absolute font-bold text-slate-800 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow-sm text-sm"
                    style={{
                        transform: `translate(calc(-50% + ${pn.x}px), calc(-50% + ${pn.y}px))`,
                        left: '50%',
                        top: '50%',
                        zIndex: 10
                    }}
                >
                    {pn.value}
                </div>
            ));
    };

    const currentNumber = numbers[currentIndex];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-500 relative select-none">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full shadow-sm bg-white/50 backdrop-blur hover:bg-white hover:shadow-md transition-all">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Button>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Csoportosítások (Venn-diagram)</h2>
                </div>
                <Button onClick={initGame} variant="outline" className="rounded-xl shadow-sm bg-white text-slate-600 hover:text-slate-900 border-slate-200 gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Újra
                </Button>
            </div>

            {message && (
                <div className={cn(
                    "mb-8 p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-4 font-medium max-w-2xl mx-auto",
                    message.type === 'success' ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                        message.type === 'error' ? "bg-rose-50 text-rose-700 border border-rose-200" :
                            "bg-blue-50 text-blue-700 border border-blue-200"
                )}>
                    {message.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                    {message.type === 'error' && <XCircle className="w-5 h-5 shrink-0" />}
                    {message.type === 'info' && <Info className="w-5 h-5 shrink-0" />}
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Side: Current Number and Info */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    {/* Game Header / Current Number */}
                    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden min-h-[300px]">
                        <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                            <div
                                className="h-full bg-primary transition-all duration-500"
                                style={{ width: `${(currentIndex / Math.max(1, numbers.length)) * 100}%` }}
                            />
                        </div>

                        <div className="uppercase tracking-widest text-sm font-bold text-slate-400 mb-6 font-display">Beosztandó szám</div>

                        <div className="relative w-32 h-32 flex items-center justify-center">
                            {!isCompleted && !animatingNumber && currentNumber !== undefined && (
                                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-blue-600 text-white shadow-xl flex items-center justify-center text-5xl font-black animate-in zoom-in-50 duration-300">
                                    {currentNumber}
                                </div>
                            )}

                            {animatingNumber && (
                                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-xl flex items-center justify-center text-5xl font-black absolute z-50 animate-out zoom-out-50 duration-500">
                                    {animatingNumber.value}
                                </div>
                            )}

                            {isCompleted && (
                                <div className="text-emerald-500 font-bold text-2xl">Kész!</div>
                            )}
                        </div>

                        <div className="mt-8 text-sm font-bold text-slate-400 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                            {Math.min(currentIndex + 1, TOTAL_NUMBERS)} / {TOTAL_NUMBERS}
                        </div>
                    </div>

                    <div className="text-left text-slate-500 text-sm italic flex items-start gap-3 bg-white/60 p-5 rounded-2xl border border-slate-200/60 shadow-sm">
                        <Info className="w-5 h-5 shrink-0 mt-0.5 text-blue-500" />
                        A körökön kívüli területre (Egyik sem) kattintva teheted le a számokat, amik egyik feltételnek sem felelnek meg.
                    </div>
                </div>

                {/* Right Side: Venn Diagram Area */}
                <div className="lg:col-span-2">
                    <div
                        className="relative bg-white/60 backdrop-blur rounded-3xl border-2 border-slate-200 border-dashed p-4 md:p-12 min-h-[400px] flex items-center justify-center overflow-hidden group hover:bg-slate-50 transition-colors"
                        onClick={() => handleRegionClick('outside')}
                        ref={outsideRef}
                    >
                        {/* Background label for outside */}
                        <div className="absolute top-4 right-4 text-slate-400 font-bold uppercase tracking-widest text-sm bg-white/80 px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                            Egyik sem
                        </div>

                        <div className="w-full max-w-xl relative flex items-center justify-center aspect-[2/1] my-8" onClick={(e) => e.stopPropagation()}>
                            {/* Intersection (Center) Area Logic layer */}
                            <div
                                className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer pointer-events-none"
                            >
                                {/* We use a specific clipping path for the intersection click area to be accurate */}
                                <div
                                    className="w-[30%] h-[70%] bg-transparent rounded-[100%] pointer-events-auto hover:bg-white/30 transition-colors"
                                    onClick={() => handleRegionClick('intersection')}
                                    title="Páros és Kisebb mint 20"
                                    ref={intersectionRef}
                                ></div>
                            </div>

                            {/* Left Circle: Even Numbers */}
                            <div
                                className="absolute left-[5%] w-[55%] pb-[55%] rounded-full border-4 border-blue-500/80 bg-blue-500/10 cursor-pointer hover:bg-blue-500/20 transition-all z-10"
                                onClick={() => handleRegionClick('leftOnly')}
                                ref={leftCircleRef}
                            >
                                <div className="absolute top-[-30px] md:top-[-40px] left-1/2 -translate-x-1/2 bg-blue-100 text-blue-700 font-bold border border-blue-200 px-4 py-1.5 rounded-xl shadow-sm text-sm md:text-base whitespace-nowrap">
                                    Páros számok
                                </div>
                                {renderPlacedNumbers('leftOnly')}
                            </div>

                            {/* Right Circle: Less than 20 */}
                            <div
                                className="absolute right-[5%] w-[55%] pb-[55%] rounded-full border-4 border-amber-500/80 bg-amber-500/10 cursor-pointer hover:bg-amber-500/20 transition-all z-10"
                                onClick={() => handleRegionClick('rightOnly')}
                                style={{ mixBlendMode: 'multiply' }}
                                ref={rightCircleRef}
                            >
                                <div className="absolute top-[-30px] md:top-[-40px] left-1/2 -translate-x-1/2 bg-amber-100 text-amber-700 font-bold border border-amber-200 px-4 py-1.5 rounded-xl shadow-sm text-sm md:text-base whitespace-nowrap">
                                    20-nál kisebb
                                </div>
                                {renderPlacedNumbers('rightOnly')}
                            </div>
                        </div>

                        {/* Render intersection numbers centrally */}
                        <div className="absolute inset-0 pointer-events-none z-30">
                            {renderPlacedNumbers('intersection')}
                        </div>

                        {/* Render outside numbers scattered */}
                        {placedNumbers.filter(pn => pn.region === 'outside').map((pn, i) => (
                            <div
                                key={i}
                                className="absolute font-bold text-slate-800 bg-white/90 backdrop-blur shadow-md rounded-full w-10 h-10 flex items-center justify-center text-sm z-10 border border-slate-200 hover:scale-110 transition-transform"
                                style={{
                                    // Fixed positions around the edges for outside numbers
                                    left: `${8 + (i * 17) % 84}%`,
                                    top: `${80 - (i % 2) * 60}%`
                                }}
                            >
                                {pn.value}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
