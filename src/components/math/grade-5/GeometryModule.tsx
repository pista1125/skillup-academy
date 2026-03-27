import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from "@/components/math/shared/SectionHeader";
import { ActivityPlaceholder } from "@/components/math/shared/ActivityPlaceholder";
import {
    ChevronRight,
    ArrowLeft,
    BookOpen,
    Target,
    Zap,
    MoveHorizontal,
    Shapes,
    Pencil,
    Circle,
    Triangle,
    Square
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GeometryModuleProps {
    onBack: () => void;
    onStartActivity?: (type: string) => void;
    isInline?: boolean;
}

export function GeometryModule({ onBack, onStartActivity, isInline = false }: GeometryModuleProps) {
    return (
        <div className={cn(
            "flex flex-col animate-in fade-in duration-500",
            isInline ? "gap-6 py-2" : "gap-10 py-6 slide-in-from-bottom-4"
        )}>
            {!isInline && (
                <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-green-100 shadow-sm mx-1">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl text-white shadow-lg shadow-green-200">
                            <Shapes className="w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="font-display text-2xl font-black text-slate-800 tracking-tight">Geometria, tengelyes tükrözés</h2>
                            <p className="text-sm font-medium text-slate-500">Alakzatok, szerkesztések és szimmetria</p>
                        </div>
                    </div>
                    <Button variant="ghost" onClick={onBack} size="sm" className="rounded-xl hover:bg-green-50 text-green-600 font-bold">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Vissza
                    </Button>
                </div>
            )}

            <div className="space-y-12">
                <section>
                    <SectionHeader number={1} title="Síkbeli alakzatok" color="blue" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Sokszögek"
                            subtitle="Alakzatok csoportosítása"
                            type="Gyakorlás"
                            icon={<Shapes className="w-6 h-6" />}
                            color="blue"
                            onClick={() => onStartActivity?.('shape-classification')}
                        />
                        <ActivityPlaceholder
                            title="Egyenesek"
                            subtitle="Kapcsolatok vizsgálata"
                            type="Gyakorlás"
                            icon={<MoveHorizontal className="w-6 h-6" />}
                            color="indigo"
                            onClick={() => onStartActivity?.('line-relationships')}
                        />
                        <ActivityPlaceholder
                            title="Szögek párosítása"
                            subtitle="Gyakorló játék"
                            type="Gyakorlás"
                            icon={<Target className="w-6 h-6" />}
                            color="emerald"
                            onClick={() => onStartActivity?.('angle-matching')}
                        />
                    </div>
                </section>

                <section>
                    <SectionHeader number={2} title="Egybevágóság" color="orange" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Egybevágó alakzatok"
                            subtitle="Keresd a párokat!"
                            type="Hamarosan"
                            icon={<Zap className="w-6 h-6" />}
                            color="orange"
                            disabled
                        />
                    </div>
                </section>

                <section>
                    <SectionHeader number={3} title="A kör" color="purple" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Kör részei"
                            subtitle="Interaktív felismerő"
                            type="Gyakorlás"
                            icon={<Circle className="w-6 h-6" />}
                            color="purple"
                            onClick={() => onStartActivity?.('circle-parts')}
                        />
                    </div>
                </section>

                <section>
                    <SectionHeader number={4} title="A szakasz felezőmerőlegese" color="cyan" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Felezőmerőleges"
                            subtitle="Szerkesztési lépések"
                            type="Hamarosan"
                            icon={<Pencil className="w-6 h-6" />}
                            color="cyan"
                            disabled
                        />
                    </div>
                </section>

                <section>
                    <SectionHeader number={5} title="Szerkesztések" color="indigo" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Alapszerkesztés"
                            subtitle="Körzővel és vonalzóval"
                            type="Eszköz"
                            icon={<Pencil className="w-6 h-6" />}
                            color="indigo"
                            onClick={() => onStartActivity?.('construction')}
                        />
                    </div>
                </section>

                <section>
                    <SectionHeader number={6} title="Tengelyes tükrözés" color="emerald" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Tükörkép keresése"
                            subtitle="Interaktív játék"
                            type="Gyakorlás"
                            icon={<Target className="w-6 h-6" />}
                            color="emerald"
                            onClick={() => onStartActivity?.('reflection-quiz')}
                        />
                        <ActivityPlaceholder
                            title="Húzd a helyére!"
                            subtitle="Tükrözés pontról pontra"
                            type="Gyakorlás"
                            icon={<Zap className="w-6 h-6 text-amber-500" />}
                            color="emerald"
                            onClick={() => onStartActivity?.('axial-symmetry')}
                        />
                        <ActivityPlaceholder
                            title="Találd meg a hibát!"
                            subtitle="Diagnosztikai feladat"
                            type="Gyakorlás"
                            icon={<Target className="w-6 h-6 text-rose-500" />}
                            color="emerald"
                            onClick={() => onStartActivity?.('symmetry-error')}
                        />
                    </div>
                </section>

                <section>
                    <SectionHeader number={7} title="A tengelyes tükrözés tulajdonságai" color="amber" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Tulajdonságok"
                            subtitle="Mit tanultunk?"
                            type="Hamarosan"
                            icon={<BookOpen className="w-6 h-6" />}
                            color="amber"
                            disabled
                        />
                    </div>
                </section>

                <section>
                    <SectionHeader number={8} title="Tengelyes szimmetria" color="violet" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Szimmetriatengely"
                            subtitle="Keresd meg a tengelyt!"
                            type="Gyakorlás"
                            icon={<MoveHorizontal className="w-6 h-6" />}
                            color="violet"
                            onClick={() => onStartActivity?.('axial-symmetry-quiz')}
                        />
                        <ActivityPlaceholder
                            title="A szimmetria körbevesz"
                            subtitle="Interaktív bemutató"
                            type="Bemutató"
                            icon={<BookOpen className="w-6 h-6" />}
                            color="violet"
                            onClick={() => onStartActivity?.('axial-symmetry-presentation')}
                        />
                    </div>
                </section>

                <section>
                    <SectionHeader number={9} title="Szimmetrikus alakzatok" color="rose" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Háromszögek"
                            subtitle="Típusok és szimmetria"
                            type="Gyakorlás"
                            icon={<Triangle className="w-6 h-6" />}
                            color="rose"
                            onClick={() => onStartActivity?.('triangle-classification')}
                        />
                        <ActivityPlaceholder
                            title="Négyszögek"
                            subtitle="Tulajdonságok alapján"
                            type="Gyakorlás"
                            icon={<Square className="w-6 h-6" />}
                            color="amber"
                            onClick={() => onStartActivity?.('quadrilateral-classification')}
                        />
                    </div>
                </section>

                <section>
                    <SectionHeader number={10} title="Szerkesztési feladatok" color="slate" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Összetett szerkesztés"
                            subtitle="Gyakorló feladatok"
                            type="Hamarosan"
                            icon={<Pencil className="w-6 h-6" />}
                            color="slate"
                            disabled
                        />
                    </div>
                </section>

                <section>
                    <SectionHeader number={11} title="Összefoglalás" color="red" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Szögek Kvíz"
                            subtitle="Év végi ismétlés"
                            type="Teszt"
                            icon={<Target className="w-6 h-6" />}
                            color="red"
                            onClick={() => onStartActivity?.('triangle-angles-quiz')}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
