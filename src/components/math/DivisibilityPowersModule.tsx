import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DivisibilityTool } from './DivisibilityTool';
import { PrimeFactorization } from './PrimeFactorization';
import { Calculator, Zap, Binary, BookOpen, Lightbulb, CheckCircle2 } from 'lucide-react';

interface DivisibilityPowersModuleProps {
    onBack: () => void;
}

export function DivisibilityPowersModule({ onBack }: DivisibilityPowersModuleProps) {
    const [activeTab, setActiveTab] = useState('theory');

    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between bg-white/50 p-4 rounded-2xl border border-amber-100 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-100 rounded-xl text-amber-600">
                        <Zap className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-display text-xl font-bold text-slate-800">Hatványozás és Oszthatóság</h2>
                        <p className="text-sm text-slate-500">7. osztályos tananyag</p>
                    </div>
                </div>
                <Button variant="outline" onClick={onBack} size="sm">
                    Vissza a témakörökhöz
                </Button>
            </div>

            <Tabs defaultValue="theory" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 h-12 bg-white/50 border p-1 rounded-xl">
                    <TabsTrigger value="theory" className="rounded-lg data-[state=active]:bg-amber-500 data-[state=active]:text-white transition-all">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Tananyag
                    </TabsTrigger>
                    <TabsTrigger value="divisibility" className="rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition-all">
                        <Calculator className="w-4 h-4 mr-2" />
                        Oszthatóság
                    </TabsTrigger>
                    <TabsTrigger value="factorization" className="rounded-lg data-[state=active]:bg-indigo-500 data-[state=active]:text-white transition-all">
                        <Binary className="w-4 h-4 mr-2" />
                        Prímtényezők
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="theory" className="mt-6 space-y-6">
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
                                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setActiveTab('factorization')}>
                                    Próbáld ki az eszközt!
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="divisibility" className="mt-6">
                    <DivisibilityTool onBack={() => setActiveTab('theory')} />
                </TabsContent>

                <TabsContent value="factorization" className="mt-6">
                    <PrimeFactorization />
                </TabsContent>
            </Tabs>
        </div>
    );
}
