import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, Binary, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FactorResult {
    number: number;
    factors: { factor: number; count: number }[];
    steps: { current: number; divisor: number }[];
}

export function PrimeFactorization() {
    const [inputNum, setInputNum] = useState<string>('');
    const [result, setResult] = useState<FactorResult | null>(null);

    const calculateFactorization = () => {
        let n = parseInt(inputNum);
        if (isNaN(n) || n < 2) return;

        const original = n;
        const factorCounts: Record<number, number> = {};
        const steps: { current: number; divisor: number }[] = [];

        let d = 2;
        while (n > 1) {
            while (n % d === 0) {
                steps.push({ current: n, divisor: d });
                factorCounts[d] = (factorCounts[d] || 0) + 1;
                n /= d;
            }
            d++;
            if (d * d > n && n > 1) {
                steps.push({ current: n, divisor: n });
                factorCounts[n] = (factorCounts[n] || 0) + 1;
                break;
            }
        }

        setResult({
            number: original,
            factors: Object.entries(factorCounts).map(([f, c]) => ({
                factor: parseInt(f),
                count: c as number,
            })).sort((a, b) => a.factor - b.factor),
            steps,
        });
    };

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Input & Logic Column */}
                <div className="md:col-span-7 space-y-4">
                    <Card className="border shadow-sm">
                        <CardContent className="p-4 space-y-4">
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Szám felbontása</label>
                                <div className="flex gap-2">
                                    <Input
                                        type="number"
                                        placeholder="Írj be egy számot (pl. 120)..."
                                        value={inputNum}
                                        onChange={(e) => setInputNum(e.target.value)}
                                        className="h-10 text-base font-bold bg-slate-50/50"
                                    />
                                    <Button
                                        className="h-10 px-6 font-bold bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                                        onClick={calculateFactorization}
                                        disabled={!inputNum || parseInt(inputNum) < 2}
                                    >
                                        Felbontás
                                    </Button>
                                </div>
                            </div>

                            {result && (
                                <div className="pt-2 animate-in zoom-in-95 duration-200">
                                    <div className="rounded-xl border border-indigo-100 bg-indigo-50/30 p-4 space-y-4">
                                        <div className="text-center">
                                            <div className="text-[10px] text-slate-400 uppercase font-black mb-1">Eredmény</div>
                                            <div className="text-xl md:text-2xl font-black text-slate-800 break-all">
                                                {result.number} = {result.factors.map((f, i) => (
                                                    <span key={f.factor}>
                                                        {f.factor}{f.count > 1 && <sup className="text-indigo-600 ml-0.5">{f.count}</sup>}
                                                        {i < result.factors.length - 1 && <span className="mx-1 text-slate-400">×</span>}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-slate-900 text-white p-3 rounded-lg font-mono text-xs md:text-sm text-center shadow-inner overflow-hidden">
                                            {result.number} = {result.steps.map((s, i) => (
                                                <span key={i}>
                                                    {s.divisor}{i < result.steps.length - 1 ? " × " : ""}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Visual Steps Column */}
                <div className="md:col-span-5">
                    <Card className="h-full border border-indigo-200 bg-indigo-50/50 shadow-none overflow-hidden flex flex-col">
                        <div className="p-3 border-b border-indigo-100 bg-indigo-100/30 flex items-center gap-2">
                            <Binary className="w-4 h-4 text-indigo-600" />
                            <span className="text-xs font-black text-indigo-800 uppercase tracking-wider">Levezetés</span>
                        </div>
                        <CardContent className="p-4 flex-1 overflow-y-auto max-h-[300px]">
                            {result ? (
                                <div className="flex flex-col items-center">
                                    <div className="inline-grid grid-cols-[1fr_auto_1fr] gap-x-4 font-mono text-sm md:text-base">
                                        {result.steps.map((step, i) => (
                                            <div key={i} className="contents">
                                                <div className="text-right py-1 text-slate-600">{step.current}</div>
                                                <div className="w-px bg-slate-300 mx-auto" />
                                                <div className="text-left py-1 text-indigo-600 font-bold">{step.divisor}</div>
                                            </div>
                                        ))}
                                        <div className="contents">
                                            <div className="text-right py-1 text-slate-600 font-bold">1</div>
                                            <div className="w-px bg-slate-300 mx-auto" />
                                            <div />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-400">
                                    <Hash className="w-8 h-8 mb-2 opacity-20" />
                                    <p className="text-[10px] italic leading-relaxed">
                                        Írj be egy számot balra, és itt láthatod majd a prímtényezőkre való bontás lépéseit!
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
