import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    ArrowLeft,
    RotateCcw,
    Zap,
    MousePointer2,
    Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DecimalShifterToolProps {
    onBack: () => void;
}

export default function DecimalShifterTool({ onBack }: DecimalShifterToolProps) {
    // ONES_IDX is the fixed "Egyes" (Ones) column
    const ONES_IDX = 10;
    const [digits, setDigits] = useState<string[]>(Array(21).fill(''));
    const [inputValue, setInputValue] = useState('');
    const [history, setHistory] = useState<string[][]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [lastAction, setLastAction] = useState<string | null>(null);

    useEffect(() => {
        handleReset();
    }, []);

    const handleReset = () => {
        const initialDigits = Array(21).fill('');
        initialDigits[ONES_IDX] = '3';
        initialDigits[ONES_IDX + 1] = '5';
        setDigits(initialDigits);
        setInputValue('');
        setHistory([]);
        setLastAction(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(',', '.');
        if (isNaN(Number(val)) && val !== '' && val !== '.') return;
        setInputValue(e.target.value);
    };

    const applyInput = () => {
        if (!inputValue) return;

        const cleanVal = inputValue.replace(',', '.');
        const num = parseFloat(cleanVal);
        if (isNaN(num)) return;

        const [whole, frac] = cleanVal.split('.');
        const newDigits = Array(21).fill('');

        // Place whole part ending at ONES_IDX
        if (whole && whole !== '0') {
            const wholeDigits = whole.split('');
            for (let i = 0; i < wholeDigits.length; i++) {
                const pos = ONES_IDX - (wholeDigits.length - 1 - i);
                if (pos >= 0) newDigits[pos] = wholeDigits[i];
            }
        } else {
            newDigits[ONES_IDX] = '0';
        }

        // Place fractional part starting at ONES_IDX + 1
        if (frac) {
            const fracDigits = frac.split('');
            for (let i = 0; i < fracDigits.length; i++) {
                const pos = ONES_IDX + 1 + i;
                if (pos < 21) newDigits[pos] = fracDigits[i];
            }
        }

        setDigits(newDigits);
        setInputValue('');
        setHistory([]);
        setLastAction(null);
    };

    const shiftDigits = (steps: number) => {
        if (isAnimating) return;

        setHistory([...history, [...digits]]);
        setIsAnimating(true);
        // Multiplier labels: steps 1 -> *10, steps -1 -> /10
        setLastAction(steps > 0 ? `×${Math.pow(10, steps)}` : `÷${Math.pow(10, Math.abs(steps))}`);

        setTimeout(() => {
            setDigits(prev => {
                const next = Array(21).fill('');
                for (let i = 0; i < 21; i++) {
                    const oldPos = i + steps;
                    if (oldPos >= 0 && oldPos < 21) {
                        next[i] = prev[oldPos];
                    }
                }
                return next;
            });
            setIsAnimating(false);
        }, 500);
    };

    const undo = () => {
        if (history.length === 0) return;
        const last = history[history.length - 1];
        setDigits(last);
        setHistory(history.slice(0, -1));
        setLastAction('Visszavonás');
    };

    const getCurrentValue = () => {
        let leftArr = digits.slice(0, ONES_IDX + 1);
        let left = leftArr.join('').replace(/^0+/, '');
        if (!left) left = '0';

        let rightArr = digits.slice(ONES_IDX + 1);
        let right = rightArr.join('').replace(/0+$/, '');

        return right ? `${left},${right}` : left;
    };

    return (
        <div className="max-w-5xl mx-auto p-4 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
                <Button variant="ghost" onClick={onBack} className="rounded-xl text-slate-600">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Vissza a hangszerekhez
                </Button>

                <div className="flex gap-2">
                    <Button variant="outline" onClick={undo} disabled={history.length === 0} className="rounded-xl">
                        <RotateCcw className="w-4 h-4 mr-2" /> Visszavonás
                    </Button>
                    <Button variant="outline" onClick={handleReset} className="rounded-xl text-rose-600 hover:text-rose-700">
                        Alaphelyzet
                    </Button>
                </div>
            </div>

            <div className="text-center mb-10">
                <div className="inline-flex p-4 bg-blue-100 rounded-3xl text-blue-600 mb-4">
                    <Zap className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-black text-slate-800 mb-2">Tizedesvessző-eltoló</h1>
                <p className="text-slate-500">Figyeld meg, hogyan változnak a helyiértékek szorzásnál és osztásnál!</p>
            </div>

            <Card className="p-8 md:p-12 rounded-[40px] shadow-2xl border-none bg-white mb-8 overflow-hidden relative">
                <div className="flex flex-col items-center">
                    <div className="mb-12 text-center">
                        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Aktuális érték</div>
                        <div className="text-5xl md:text-7xl font-black text-primary tracking-tighter">
                            {getCurrentValue()}
                        </div>
                    </div>

                    <div className="w-full overflow-x-auto pb-4">
                        <div className="flex justify-center min-w-max gap-1 md:gap-2 px-4 relative">
                            {Array.from({ length: 11 }).map((_, i) => {
                                const idx = ONES_IDX - 5 + i;
                                const hasDigit = digits[idx] !== '';

                                const label = idx === ONES_IDX - 3 ? 'EZ' :
                                    idx === ONES_IDX - 2 ? 'SZ' :
                                        idx === ONES_IDX - 1 ? 'T' :
                                            idx === ONES_IDX ? 'E' :
                                                idx === ONES_IDX + 1 ? 't' :
                                                    idx === ONES_IDX + 2 ? 'sz' :
                                                        idx === ONES_IDX + 3 ? 'ez' : '';

                                return (
                                    <div key={i} className="flex flex-col items-center relative">
                                        <div className="mb-2 h-6 text-[10px] font-bold text-slate-400 uppercase">
                                            {label}
                                        </div>

                                        <div className={cn(
                                            "w-12 h-16 md:w-16 md:h-20 rounded-2xl flex items-center justify-center text-3xl md:text-4xl font-black transition-all duration-500",
                                            "bg-slate-50 border-2",
                                            hasDigit ? "border-slate-100 text-slate-800 scale-100" : "border-dashed border-slate-100 text-slate-200"
                                        )}>
                                            {digits[idx] || '0'}
                                        </div>

                                        {idx === ONES_IDX && (
                                            <div className="absolute -right-2 md:-right-3 top-[50%] md:top-[60%] z-20">
                                                <div className="w-3 h-3 md:w-4 md:h-4 bg-rose-500 rounded-full shadow-lg shadow-rose-200 shadow-xl" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {lastAction && (
                        <div className="mt-8 px-6 py-2 bg-blue-50 text-blue-700 rounded-full font-bold animate-in fade-in zoom-in">
                            {lastAction} elvégezve
                        </div>
                    )}
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-8 rounded-[32px] border-none shadow-xl bg-white">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <MousePointer2 className="w-5 h-5 text-primary" /> Műveletek
                    </h3>

                    <div className="space-y-6">
                        <div className="flex flex-col gap-3">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Szorzás (Szám mozgatása BALRA)</span>
                            <div className="flex gap-2">
                                <Button onClick={() => shiftDigits(1)} className="flex-1 bg-emerald-500 hover:bg-emerald-600 h-14 text-lg font-black rounded-2xl">×10</Button>
                                <Button onClick={() => shiftDigits(2)} className="flex-1 bg-emerald-600 hover:bg-emerald-700 h-14 text-lg font-black rounded-2xl">×100</Button>
                                <Button onClick={() => shiftDigits(3)} className="flex-1 bg-emerald-700 hover:bg-emerald-800 h-14 text-lg font-black rounded-2xl">×1000</Button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Osztás (Szám mozgatása JOBBRA)</span>
                            <div className="flex gap-2">
                                <Button onClick={() => shiftDigits(-1)} className="flex-1 bg-rose-500 hover:bg-rose-600 h-14 text-lg font-black rounded-2xl">÷10</Button>
                                <Button onClick={() => shiftDigits(-2)} className="flex-1 bg-rose-600 hover:bg-rose-700 h-14 text-lg font-black rounded-2xl">÷100</Button>
                                <Button onClick={() => shiftDigits(-3)} className="flex-1 bg-rose-700 hover:bg-rose-800 h-14 text-lg font-black rounded-2xl">÷1000</Button>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="space-y-6">
                    <Card className="p-8 rounded-[32px] border-none shadow-xl bg-white">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Info className="w-5 h-5 text-blue-500" /> Új szám megadása
                        </h3>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Pl: 12,5"
                                className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 font-bold text-lg focus:outline-none focus:border-primary transition-colors"
                            />
                            <Button onClick={applyInput} className="rounded-2xl h-12 px-6 font-bold">Beállít</Button>
                        </div>
                    </Card>

                    <Card className="p-8 rounded-[32px] border-none shadow-xl bg-primary text-white">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            💡 Tudtad?
                        </h3>
                        <div className="space-y-3 text-sm opacity-90 leading-relaxed font-medium">
                            <p>• Ha 10, 100 vagy 1000-zel <b>szorzunk</b>, a tizedesvessző annyi helyet ugrik <b>jobbra</b>, ahány nulla van a szorzóban.</p>
                            <p>• Ha 10, 100 vagy 1000-zel <b>osztunk</b>, a tizedesvessző annyi helyet ugrik <b>balra</b>, ahány nulla van az osztóban.</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
