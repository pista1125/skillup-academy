import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, RotateCcw, Play, Calculator } from 'lucide-react';

interface DivisionStep {
    currentDividend: number;
    digitToBringDown: string | null;
    quotientDigit: number;
    remainder: number;
    displayValue: string; // The value we are dividing in this step
}

interface LongDivisionToolProps {
    onBack: () => void;
}

export function LongDivisionTool({ onBack }: LongDivisionToolProps) {
    const [dividendStr, setDividendStr] = useState<string>('');
    const [divisorStr, setDivisorStr] = useState<string>('');
    const [active, setActive] = useState(false);

    const calculation = useMemo(() => {
        if (!active || !dividendStr || !divisorStr) return null;
        const divisor = parseInt(divisorStr);
        if (isNaN(divisor) || divisor < 1 || divisor > 9) return null;

        const steps: DivisionStep[] = [];
        let currentRemainder = 0;
        const digits = dividendStr.split('');
        let quotient = '';

        // Process digits
        let i = 0;
        let tempDividendStr = '';

        while (i < digits.length) {
            tempDividendStr += digits[i];
            let val = parseInt(tempDividendStr);

            if (val < divisor && i < digits.length - 1 && steps.length === 0) {
                // Initial skip (e.g. 1 / 4) - we wait for next digit
                i++;
                continue;
            }

            const q = Math.floor(val / divisor);
            const r = val % divisor;

            steps.push({
                currentDividend: val,
                digitToBringDown: i < digits.length - 1 ? digits[i + 1] : null,
                quotientDigit: q,
                remainder: r,
                displayValue: tempDividendStr
            });

            quotient += q.toString();
            currentRemainder = r;
            tempDividendStr = r.toString();
            i++;
        }

        return {
            dividend: dividendStr,
            divisor,
            quotient: parseInt(quotient) || 0,
            remainder: currentRemainder,
            steps
        };
    }, [active, dividendStr, divisorStr]);

    const handleCalculate = () => {
        const d = parseInt(divisorStr);
        if (d >= 1 && d <= 9) {
            setActive(true);
        }
    };

    const handleReset = () => {
        setDividendStr('');
        setDivisorStr('');
        setActive(false);
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
                    <Calculator className="w-4 h-4 text-primary" />
                    Írásbeli osztás (egyjegyűvel)
                </h2>
                <Button variant="ghost" onClick={handleReset} size="sm" className="text-muted-foreground text-xs">
                    <RotateCcw className="w-3.5 h-3.5 mr-1" />
                    Alaphelyzet
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Input Card */}
                <div className="md:col-span-5 space-y-4">
                    <Card className="border shadow-sm">
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Osztandó</label>
                                    <Input
                                        type="number"
                                        placeholder="Pl. 1254"
                                        value={dividendStr}
                                        onChange={(e) => {
                                            setDividendStr(e.target.value);
                                            setActive(false);
                                        }}
                                        className="h-12 text-xl font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Osztó (egyjegyű)</label>
                                    <Input
                                        type="number"
                                        placeholder="1-9"
                                        max="9"
                                        min="1"
                                        value={divisorStr}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val.length <= 1) {
                                                setDivisorStr(val);
                                                setActive(false);
                                            }
                                        }}
                                        className="h-12 text-xl font-bold"
                                    />
                                </div>
                            </div>
                            <Button
                                onClick={handleCalculate}
                                className="w-full h-12 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 shadow-md"
                                disabled={!dividendStr || !divisorStr || divisorStr === '0'}
                            >
                                <Play className="w-5 h-5 mr-2" />
                                Számítás
                            </Button>

                            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                                <h4 className="text-xs font-bold text-amber-800 uppercase mb-2">Tipp</h4>
                                <p className="text-xs text-amber-700 leading-relaxed italic">
                                    Az írásbeli osztást balról jobbra végezzük. Először megnézzük, hányszor van meg az osztó az első (vagy első két) számjegyben, leírjuk a hányadost, majd a maradékhoz "lehozzuk" a következő számjegyet.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Visualization Card */}
                <div className="md:col-span-7">
                    <Card className="h-full border border-indigo-100 bg-white shadow-sm overflow-hidden flex flex-col">
                        <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Levezetés (lépcsősen)</span>
                            {calculation && (
                                <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                                    {dividendStr} : {divisorStr}
                                </div>
                            )}
                        </div>
                        <CardContent className="p-8 flex-1 overflow-auto">
                            {calculation ? (
                                <div className="font-mono text-2xl md:text-3xl leading-relaxed animate-in fade-in duration-700">
                                    {/* Result Header */}
                                    <div className="flex items-center gap-2 mb-8 border-b-2 border-slate-100 pb-4">
                                        <span className="text-slate-800">{calculation.dividend}</span>
                                        <span className="text-slate-400">:</span>
                                        <span className="text-indigo-600 font-black">{calculation.divisor}</span>
                                        <span className="text-slate-400">=</span>
                                        <span className="text-emerald-600 font-black tracking-widest">{calculation.quotient}</span>
                                    </div>

                                    {/* Staircase steps */}
                                    <div className="relative pl-2">
                                        {calculation.steps.map((step, idx) => (
                                            <div key={idx} className="relative mb-2">
                                                {/* The remainder of the previous step with the brought down digit */}
                                                <div className="flex">
                                                    <span className="text-slate-700">
                                                        {idx === 0 ? '' : ' '}
                                                        {step.displayValue}
                                                    </span>
                                                </div>
                                                {/* The new remainder */}
                                                <div className="text-indigo-600 font-bold ml-4">
                                                    {step.remainder}
                                                    {step.digitToBringDown && (
                                                        <span className="text-slate-300 ml-1 italic group relative">
                                                            {step.digitToBringDown}
                                                            <div className="absolute -top-6 left-0 text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">lehozva</div>
                                                        </span>
                                                    )}
                                                    {/* Final remainder marker */}
                                                    {!step.digitToBringDown && (
                                                        <span className="text-[10px] text-slate-400 uppercase ml-2 font-black tracking-tighter">(maradék)</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Visual Connector Lines (Staircase) */}
                                        {calculation.steps.map((_, idx) => (
                                            idx < calculation.steps.length - 1 && (
                                                <div
                                                    key={`line-${idx}`}
                                                    className="absolute border-l-2 border-slate-100"
                                                    style={{
                                                        left: '0.2rem',
                                                        top: `${(idx + 1) * 4}rem`,
                                                        height: '1.5rem'
                                                    }}
                                                />
                                            )
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-12 text-slate-300">
                                    <Calculator className="w-16 h-16 mb-4 opacity-10" />
                                    <p className="text-sm font-medium">Adj meg egy osztandót és egy egyjegyű osztót a kezdéshez!</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
