import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DivisibilityTool } from './DivisibilityTool';
import { PrimeFactorization } from './PrimeFactorization';
import { DivisibilityQuiz } from './DivisibilityQuiz';
import { PrimeFactorizationMatcher } from './PrimeFactorizationMatcher';
import {
    Calculator,
    Zap,
    Binary,
    BookOpen,
    Lightbulb,
    CheckCircle2,
    Gamepad2,
    ArrowLeft,
    Sparkles,
    Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DivisibilityPowersModuleProps {
    onBack: () => void;
}

type ViewType = 'menu' | 'theory' | 'divisibility' | 'factorization' | 'quiz' | 'matcher';

export function DivisibilityPowersModule({ onBack }: DivisibilityPowersModuleProps) {
    const [view, setView] = useState<ViewType>('menu');

    const handleBackToMenu = () => setView('menu');

    if (view === 'menu') {
        return (
            <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between bg-white/50 p-4 rounded-2xl border border-amber-100 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-100 rounded-xl text-amber-600">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-display text-xl font-bold text-slate-800">Hatványozás és Oszthatóság</h2>
                            <p className="text-sm text-slate-500">Válassz egy tevékenységet!</p>
                        </div>
                    </div>
                    <Button variant="outline" onClick={onBack} size="sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Vissza
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MenuCard
                        title="Tananyag"
                        description="Hatványozás és oszthatóság elmélete"
                        icon={<BookOpen className="w-10 h-10" />}
                        color="bg-amber-50 text-amber-600"
                        onClick={() => setView('theory')}
                    />
                    <MenuCard
                        title="Oszthatóság"
                        description="Szabályok és interaktív ellenőrző"
                        icon={<Calculator className="w-10 h-10" />}
                        color="bg-emerald-50 text-emerald-600"
                        onClick={() => setView('divisibility')}
                    />
                    <MenuCard
                        title="Prímtényezők"
                        description="Számok felbontása prímszámokra"
                        icon={<Binary className="w-10 h-10" />}
                        color="bg-indigo-50 text-indigo-600"
                        onClick={() => setView('factorization')}
                    />
                    <MenuCard
                        title="Kvíz Játék"
                        description="Tedd próbára a tudásod!"
                        icon={<Gamepad2 className="w-10 h-10" />}
                        color="bg-rose-50 text-rose-600"
                        onClick={() => setView('quiz')}
                        highlight
                    />
                    <MenuCard
                        title="Párosító Játék"
                        description="Prímtényezők gyakorlása"
                        icon={<Target className="w-10 h-10" />}
                        color="bg-violet-50 text-violet-600"
                        onClick={() => setView('matcher')}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={handleBackToMenu} className="hover:bg-slate-100">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Vissza a menübe
                </Button>
                <div className="h-8 w-px bg-slate-200" />
                <h3 className="font-bold text-slate-600 capitalize">
                    {view === 'theory' && 'Tananyag'}
                    {view === 'divisibility' && 'Oszthatósági szabályok'}
                    {view === 'factorization' && 'Prímtényezős felbontás'}
                    {view === 'quiz' && 'Oszthatósági Kvíz'}
                    {view === 'matcher' && 'Prímtényezős Párosító'}
                </h3>
            </div>

            {view === 'theory' && (
                <div className="mt-6 space-y-6 animate-in slide-up-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-2 border-amber-50 shadow-sm hover:border-amber-100 transition-colors">
                            <CardHeader className="bg-amber-50/50 border-b pb-4">
                                <CardTitle className="text-lg font-bold flex items-center gap-2 text-amber-900">
                                    <Zap className="w-5 h-5" />
                                    Hatványozás fogalma
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-4 space-y-4">
                                <div className="bg-slate-900 text-white p-6 rounded-2xl text-center shadow-inner">
                                    <div className="text-4xl font-serif mb-2">
                                        a<sup>n</sup>
                                    </div>
                                    <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                                        a: alap, n: kitevő
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed italic border-l-4 border-amber-200 pl-4">
                                    "A hatványozás azonos tényezők szorzásának rövidített írásmódja."
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        <span>Példa: 2<sup>3</sup> = 2 × 2 × 2 = 8</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        <span>5<sup>2</sup> = 5 × 5 = 25</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-indigo-50 shadow-sm hover:border-indigo-100 transition-colors">
                            <CardHeader className="bg-indigo-50/50 border-b pb-4">
                                <CardTitle className="text-lg font-bold flex items-center gap-2 text-indigo-900">
                                    <Lightbulb className="w-5 h-5" />
                                    Műveletek hatványokkal
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-4 space-y-3">
                                <ul className="space-y-3">
                                    <li className="p-3 bg-white border rounded-xl shadow-sm group hover:bg-slate-50 transition-colors">
                                        <div className="text-xs font-bold text-indigo-600 mb-1">Azonos alapúak szorzása</div>
                                        <div className="font-mono text-sm">a<sup>n</sup> × a<sup>m</sup> = a<sup>n+m</sup></div>
                                    </li>
                                    <li className="p-3 bg-white border rounded-xl shadow-sm group hover:bg-slate-50 transition-colors">
                                        <div className="text-xs font-bold text-indigo-600 mb-1">Azonos alapúak osztása</div>
                                        <div className="font-mono text-sm">a<sup>n</sup> ÷ a<sup>m</sup> = a<sup>n-m</sup></div>
                                    </li>
                                    <li className="p-3 bg-white border rounded-xl shadow-sm group hover:bg-slate-50 transition-colors">
                                        <div className="text-xs font-bold text-indigo-600 mb-1">Hatvány hatványozása</div>
                                        <div className="font-mono text-sm">(a<sup>n</sup>)<sup>m</sup> = a<sup>n×m</sup></div>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="bg-emerald-50/30 border-2 border-emerald-100">
                        <CardContent className="p-8 text-center space-y-4">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Binary className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-emerald-900">Prímtényezős felbontás</h3>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                Minden 1-nél nagyobb természetes szám felbontható prímszámok szorzatára.
                                Ez a felbontás a tényezők sorrendjétől eltekintve egyértelmű.
                            </p>
                            <div className="flex justify-center gap-4 pt-2">
                                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setView('factorization')}>
                                    Próbáld ki az eszközt!
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-4 pt-4">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Lightbulb className="w-6 h-6 text-amber-500" />
                            Oszthatósági szabályok
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <RuleCard
                                divisor={2}
                                rule="Az utolsó számjegy páros (0, 2, 4, 6, 8)."
                                example="124, 50, 98"
                            />
                            <RuleCard
                                divisor={3}
                                rule="A számjegyek összege osztható 3-mal."
                                example="123 (1+2+3=6), 51 (5+1=6)"
                            />
                            <RuleCard
                                divisor={4}
                                rule="Az utolsó két számjegyből képzett szám osztható 4-gyel."
                                example="512 (12 osztható 4-gyel), 100"
                            />
                            <RuleCard
                                divisor={5}
                                rule="Az utolsó számjegy 0 vagy 5."
                                example="65, 110, 255"
                            />
                            <RuleCard
                                divisor={8}
                                rule="Az utolsó három számjegyből képzett szám osztható 8-cal."
                                example="1000 (000 oszh.), 1016 (16 oszh.)"
                            />
                            <RuleCard
                                divisor={9}
                                rule="A számjegyek összege osztható 9-cel."
                                example="189 (1+8+9=18), 72 (7+2=9)"
                            />
                            <RuleCard
                                divisor={10}
                                rule="A szám utolsó számjegye 0."
                                example="120, 500, 10"
                            />
                            <RuleCard
                                divisor={25}
                                rule="Az utolsó két számjegy 00, 25, 50 vagy 75."
                                example="125, 350, 1000"
                            />
                            <RuleCard
                                divisor={100}
                                rule="A szám utolsó két számjegye 00."
                                example="300, 1500, 100"
                            />
                        </div>
                    </div>
                </div>
            )}

            {view === 'divisibility' && (
                <DivisibilityTool onBack={handleBackToMenu} />
            )}

            {view === 'factorization' && (
                <PrimeFactorization />
            )}

            {view === 'quiz' && (
                <DivisibilityQuiz />
            )}

            {view === 'matcher' && (
                <PrimeFactorizationMatcher onBack={handleBackToMenu} />
            )}
        </div>
    );
}

interface MenuCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    onClick: () => void;
    highlight?: boolean;
}

function MenuCard({ title, description, icon, color, onClick, highlight }: MenuCardProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center gap-4 p-8 bg-white rounded-3xl border-2 border-slate-100 transition-all group relative overflow-hidden",
                highlight ? "hover:border-rose-300 hover:shadow-2xl shadow-rose-100" : "hover:border-primary hover:shadow-xl shadow-slate-200"
            )}
        >
            {highlight && (
                <div className="absolute top-0 right-0 p-2">
                    <Sparkles className="w-5 h-5 text-rose-500 animate-pulse" />
                </div>
            )}
            <div className={cn("p-6 rounded-2xl transition-all group-hover:scale-110 group-hover:rotate-3 shadow-inner", color)}>
                {icon}
            </div>
            <div className="text-center">
                <h3 className="font-black text-xl mb-2 text-slate-800 tracking-tight">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{description}</p>
            </div>
        </button>
    );
}

function RuleCard({ divisor, rule, example }: { divisor: number; rule: string; example: string }) {
    return (
        <Card className="border-2 border-slate-50 shadow-sm hover:border-amber-100 transition-all group">
            <CardContent className="p-4 flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex flex-none items-center justify-center font-black text-xl shadow-inner group-hover:scale-110 transition-transform">
                    {divisor}
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-700 leading-tight">{rule}</p>
                    <p className="text-xs text-slate-400 italic">
                        <span className="font-bold text-amber-600 not-italic mr-1">Pl:</span>
                        {example}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
