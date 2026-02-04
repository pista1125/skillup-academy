import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calculator, CheckCircle2, XCircle, RotateCcw, Lightbulb, Binary, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PrimeFactorization } from './PrimeFactorization';

interface DivisibilityToolProps {
    onBack: () => void;
}

type ToolMode = 'divisibility' | 'factorization';

interface Result {
    dividend: number;
    divisor: number;
    quotient: number;
    remainder: number;
    isDivisible: boolean;
}

const DIVISIBILITY_RULES: Record<number, string> = {
    // ... (keep all rules)
    1: "Minden egész szám osztható 1-gyel.",
    2: "Páros számok oszthatók 2-vel (utolsó számjegy: 0, 2, 4, 6, 8).",
    3: "A számjegyek összege osztható 3-mal.",
    4: "Az utolsó két számjegyből képzett szám osztható 4-gyel.",
    5: "Az utolsó számjegy 0 vagy 5.",
    6: "A szám osztható 2-vel és 3-mal is.",
    7: "A számjegyeit hátulról hármasával csoportosítjuk, a csoportokból képzett számokat váltakozó előjellel összeadjuk. Ha az eredmény osztható 7-tel, az eredeti szám is.",
    8: "Az utolsó három számjegyből képzett szám osztható 8-cal.",
    9: "A számjegyek összege osztható 9-cel.",
    10: "A szám 0-ra végződik.",
    11: "A számjegyek váltakozó előjelű összege osztható 11-gyel.",
    12: "Osztható 3-mal és 4-gyel is.",
    13: "Az utolsó számjegy négyszeresét hozzáadjuk a többi számjegyhez, az eredmény osztható 13-mal.",
    14: "Osztható 2-vel és 7-tel is.",
    15: "Osztható 3-mal és 5-tel is.",
    16: "Az utolsó négy számjegyből képzett szám osztható 16-tal.",
    17: "Az utolsó számjegy ötszörösét kivonjuk a többi számjegyből, az eredmény osztható 17-tel.",
    18: "Osztható 2-vel és 9-cel is.",
    19: "Az utolsó számjegy kétszeresét hozzáadjuk a többi számjegyhez, az eredmény osztható 19-cel.",
    20: "Utolsó két számjegye 00, 20, 40, 60 vagy 80.",
    21: "Osztható 3-mal és 7-tel is.",
    22: "Osztható 2-vel és 11-gyel is.",
    23: "Az utolsó számjegy hétszeresét hozzáadjuk a többi számjegyhez, az eredmény osztható 23-mal.",
    24: "Osztható 3-mal és 8-cal is.",
    25: "Utolsó két számjegye 00, 25, 50 vagy 75.",
    26: "Osztható 2-vel és 13-mal is.",
    27: "A szám utolsó számjegyének nyolcszorosát kivonjuk a maradékból, az eredmény osztható 27-tel.",
    28: "Osztható 4-gyel és 7-tel is.",
    29: "Az utolsó számjegy háromszorosát hozzáadjuk a többi számjegyhez, az eredmény osztható 29-cel.",
    30: "Osztható 3-mal és 10-zel is."
};

export function DivisibilityTool({ onBack }: DivisibilityToolProps) {
    const [mode, setMode] = useState<ToolMode>('divisibility');
    const [dividend, setDividend] = useState<string>('');
    const [divisor, setDivisor] = useState<string>('');
    const [result, setResult] = useState<Result | null>(null);

    const activeRule = useMemo(() => {
        const div = parseInt(divisor);
        return DIVISIBILITY_RULES[div] || null;
    }, [divisor]);

    const handleCalculate = () => {
        const num = parseInt(dividend);
        const div = parseInt(divisor);

        if (isNaN(num) || isNaN(div) || div === 0) return;

        setResult({
            dividend: num,
            divisor: div,
            quotient: Math.floor(num / div),
            remainder: num % div,
            isDivisible: num % div === 0,
        });
    };

    const handleReset = () => {
        setDividend('');
        setDivisor('');
        setResult(null);
    };

    return (
        <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Top Header */}
            <div className="flex items-center justify-between px-2">
                <Button variant="ghost" onClick={onBack} size="sm" className="hover:bg-slate-100 text-xs">
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    Vissza
                </Button>
                <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                    <Button
                        variant={mode === 'divisibility' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setMode('divisibility')}
                        className={cn("text-xs font-bold rounded-lg transition-all px-4", mode === 'divisibility' && "shadow-sm")}
                    >
                        <Calculator className="w-3.5 h-3.5 mr-2" />
                        Oszthatóság
                    </Button>
                    <Button
                        variant={mode === 'factorization' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setMode('factorization')}
                        className={cn("text-xs font-bold rounded-lg transition-all px-4", mode === 'factorization' && "shadow-sm")}
                    >
                        <Binary className="w-3.5 h-3.5 mr-2" />
                        Prímtényezők
                    </Button>
                </div>
                <Button variant="ghost" onClick={handleReset} size="sm" className="text-muted-foreground text-xs">
                    <RotateCcw className="w-3.5 h-3.5 mr-1" />
                    Alaphelyzet
                </Button>
            </div>

            {mode === 'divisibility' ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 animate-in slide-in-from-left-4 duration-500">
                    {/* Left Column: Input and Basic Result (7 units wide) */}
                    <div className="md:col-span-7 space-y-4">
                        <Card className="border shadow-sm">
                            <CardContent className="p-4 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Osztandó</label>
                                        <Input
                                            type="number"
                                            value={dividend}
                                            onChange={(e) => setDividend(e.target.value)}
                                            className="h-9 text-base font-bold bg-slate-50/50"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Osztó</label>
                                        <Input
                                            type="number"
                                            value={divisor}
                                            onChange={(e) => setDivisor(e.target.value)}
                                            className="h-9 text-base font-bold bg-slate-50/50"
                                        />
                                    </div>
                                </div>
                                <Button
                                    className="w-full h-9 text-sm font-bold bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                                    onClick={handleCalculate}
                                    disabled={!dividend || !divisor || parseInt(divisor) === 0}
                                >
                                    Ellenőrzés
                                </Button>

                                {result && (
                                    <div className="pt-2 animate-in zoom-in-95 duration-200">
                                        <div className={cn(
                                            "rounded-xl border p-4 text-center space-y-3 transition-all",
                                            result.isDivisible ? "bg-green-50/50 border-green-100" : "bg-orange-50/50 border-orange-100"
                                        )}>
                                            <div className="flex items-center justify-center gap-2">
                                                {result.isDivisible ? (
                                                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                                                ) : (
                                                    <XCircle className="w-6 h-6 text-orange-600" />
                                                )}
                                                <span className={cn(
                                                    "text-xl font-black uppercase tracking-tight",
                                                    result.isDivisible ? "text-green-600" : "text-orange-600"
                                                )}>
                                                    {result.isDivisible ? "Osztható!" : "Nem osztható!"}
                                                </span>
                                            </div>

                                            <div className="flex justify-center gap-2">
                                                <div className="bg-white/80 border px-3 py-1 rounded-lg">
                                                    <span className="text-[10px] text-slate-400 block font-bold">Eredmény</span>
                                                    <span className="text-lg font-bold text-slate-700">{result.quotient}</span>
                                                </div>
                                                <div className={cn(
                                                    "border px-3 py-1 rounded-lg",
                                                    result.isDivisible ? "bg-green-100/50 border-green-200" : "bg-orange-100/50 border-orange-200"
                                                )}>
                                                    <span className="text-[10px] text-slate-400 block font-bold">Maradék</span>
                                                    <span className={cn("text-lg font-bold", result.isDivisible ? "text-green-700" : "text-orange-700")}>
                                                        {result.remainder}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="bg-slate-900 text-white py-1 px-4 rounded-lg font-mono text-sm inline-block shadow-inner">
                                                {result.dividend} ÷ {result.divisor} = {result.quotient}
                                                {result.remainder > 0 && <span className="text-orange-400 ml-2">(m: {result.remainder})</span>}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Rules (5 units wide) */}
                    <div className="md:col-span-5">
                        <Card className="h-full border border-primary/20 bg-primary/5 shadow-none flex flex-col">
                            <CardHeader className="p-3 border-b border-primary/10">
                                <CardTitle className="text-xs font-black text-primary uppercase tracking-wider flex items-center gap-2">
                                    <Lightbulb className="w-3.5 h-3.5" />
                                    Oszthatósági szabály
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 flex-1 flex flex-col justify-center text-center">
                                {activeRule ? (
                                    <div className="animate-in fade-in slide-in-from-right-2">
                                        <div className="text-2xl mb-2">💡</div>
                                        <h4 className="text-sm font-bold text-slate-800 mb-2">Hogyan tudhatod meg?</h4>
                                        <p className="text-xs text-slate-600 leading-relaxed font-medium bg-white/80 p-3 rounded-xl border border-primary/10 shadow-sm">
                                            {activeRule}
                                        </p>
                                    </div>
                                ) : divisor ? (
                                    <div className="text-slate-400 flex flex-col items-center gap-2 p-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                            <Calculator className="w-5 h-5 opacity-20" />
                                        </div>
                                        <p className="text-[10px] italic">Ehhez az osztóhoz ({divisor}) nincs konkrét rövid szabály mentve, de az osztás elvégezhető!</p>
                                    </div>
                                ) : (
                                    <div className="text-slate-400 flex flex-col items-center gap-2 p-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                            <Lightbulb className="w-5 h-5 opacity-20" />
                                        </div>
                                        <p className="text-[10px] italic">Adj meg egy osztót (1-30 között), hogy lásd a szabályt!</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            ) : (
                <PrimeFactorization />
            )}
        </div>
    );
}
