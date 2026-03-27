import { Button } from '@/components/ui/button';
import { SectionHeader } from "@/components/math/shared/SectionHeader";
import { ActivityPlaceholder } from "@/components/math/shared/ActivityPlaceholder";
import {
    ArrowLeft,
    Shapes,
    Pencil,
    MoveHorizontal,
    Target,
    Zap,
    BookOpen,
    Ruler,
    Box,
    Layers,
    Triangle,
    Square
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Grade7GeometryModuleProps {
    onBack: () => void;
    onStartActivity?: (type: string) => void;
    isInline?: boolean;
}

export function Grade7GeometryModule({ onBack, onStartActivity, isInline = false }: Grade7GeometryModuleProps) {
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
                            <h2 className="font-display text-2xl font-black text-slate-800 tracking-tight">VI. Geometria</h2>
                            <p className="text-sm font-medium text-slate-500">Szerkesztések, területszámítás és testek</p>
                        </div>
                    </div>
                    <Button variant="ghost" onClick={onBack} size="sm" className="rounded-xl hover:bg-green-50 text-green-600 font-bold">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Vissza
                    </Button>
                </div>
            )}

            <div className="space-y-12">
                {/* 1. Egybevágó háromszögek, szerkesztések */}
                <section>
                    <SectionHeader number={1} title="Egybevágó háromszögek, szerkesztések" color="blue" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Egybevágóság"
                            subtitle="Szerkesztési alapesetek"
                            type="Gyakorlás"
                            icon={<Triangle className="w-6 h-6" />}
                            color="blue"
                            onClick={() => onStartActivity?.('triangle-congruence')}
                        />
                        <ActivityPlaceholder
                            title="Alapszerkesztések"
                            subtitle="Körző és vonalzó"
                            type="Eszköz"
                            icon={<Pencil className="w-6 h-6" />}
                            color="indigo"
                            onClick={() => onStartActivity?.('construction')}
                        />
                    </div>
                </section>

                {/* 2. Összefüggések a háromszög oldalai, szögei között */}
                <section>
                    <SectionHeader number={2} title="Összefüggések a háromszögben" color="indigo" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Háromszög-egyenlőtlenség"
                            subtitle="Oldalak és szögek kapcsolata"
                            type="Hamarosan"
                            icon={<MoveHorizontal className="w-6 h-6" />}
                            color="indigo"
                            disabled
                        />
                        <ActivityPlaceholder
                            title="Szögösszeg"
                            subtitle="Belső és külső szögek"
                            type="Gyakorlás"
                            icon={<Target className="w-6 h-6" />}
                            color="purple"
                            onClick={() => onStartActivity?.('triangle-angles-quiz')}
                        />
                    </div>
                </section>

                {/* 3. Sokszögek szögei és átlói */}
                <section>
                    <SectionHeader number={3} title="Sokszögek szögei és átlói" color="purple" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Átlók száma"
                            subtitle="Kiszámítási módszerek"
                            type="Hamarosan"
                            icon={<Shapes className="w-6 h-6" />}
                            color="purple"
                            disabled
                        />
                        <ActivityPlaceholder
                            title="Sokszögek szögei"
                            subtitle="Belső szögek összege"
                            type="Hamarosan"
                            icon={<Zap className="w-6 h-6" />}
                            color="violet"
                            disabled
                        />
                    </div>
                </section>

                {/* 4. A terület és a térfogat mértékegységei */}
                <section>
                    <SectionHeader number={4} title="Mértékegységek" color="cyan" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Területmérés"
                            subtitle="Átváltások gyakorlása"
                            type="Eszköz"
                            icon={<Ruler className="w-6 h-6" />}
                            color="cyan"
                            onClick={() => onStartActivity?.('area-conversion')}
                        />
                        <ActivityPlaceholder
                            title="Térfogatmérés"
                            subtitle="Mm³, cm³, dm³, m³"
                            type="Eszköz"
                            icon={<Box className="w-6 h-6" />}
                            color="blue"
                            onClick={() => onStartActivity?.('volume-conversion')}
                        />
                    </div>
                </section>

                {/* 5. A paralelogramma területe */}
                <section>
                    <SectionHeader number={5} title="A paralelogramma területe" color="emerald" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Paralelogramma"
                            subtitle="Alap × magasság"
                            type="Gyakorlás"
                            icon={<Square className="w-6 h-6" />}
                            color="emerald"
                            onClick={() => onStartActivity?.('parallelogram-area')}
                        />
                    </div>
                </section>

                {/* 6. A háromszög területe */}
                <section>
                    <SectionHeader number={6} title="A háromszög területe" color="teal" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Háromszög területe"
                            subtitle="Kiszámítás és logikája"
                            type="Gyakorlás"
                            icon={<Triangle className="w-6 h-6" />}
                            color="teal"
                            onClick={() => onStartActivity?.('triangle-area')}
                        />
                    </div>
                </section>

                {/* 7. A trapéz területe */}
                <section>
                    <SectionHeader number={7} title="A trapéz területe" color="green" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Trapéz"
                            subtitle="Középvonal és terület"
                            type="Hamarosan"
                            icon={<Shapes className="w-6 h-6" />}
                            color="green"
                            disabled
                        />
                    </div>
                </section>

                {/* 8. A deltoid területe */}
                <section>
                    <SectionHeader number={8} title="A deltoid területe" color="lime" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Deltoid"
                            subtitle="Átlók szorzata per kettő"
                            type="Hamarosan"
                            icon={<Shapes className="w-6 h-6" />}
                            color="lime"
                            disabled
                        />
                    </div>
                </section>

                {/* 9. A hasáb felszíne és térfogata */}
                <section>
                    <SectionHeader number={9} title="A hasáb felszíne és térfogata" color="amber" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Hasábok"
                            subtitle="Felszín és térfogat számítás"
                            type="Gyakorlás"
                            icon={<Box className="w-6 h-6" />}
                            color="amber"
                            onClick={() => onStartActivity?.('prism-calculations')}
                        />
                    </div>
                </section>

                {/* 10. Testek térben és síkban */}
                <section>
                    <SectionHeader number={10} title="Testek térben és síkban" color="orange" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Hálók és nézetek"
                            subtitle="Téri orientáció"
                            type="Hamarosan"
                            icon={<Layers className="w-6 h-6" />}
                            color="orange"
                            disabled
                        />
                    </div>
                </section>

                {/* 11. Összefoglalás */}
                <section>
                    <SectionHeader number={11} title="Összefoglalás" color="rose" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Geometria Kvíz"
                            subtitle="Vegyes ismétlő feladatok"
                            type="Teszt"
                            icon={<BookOpen className="w-6 h-6" />}
                            color="rose"
                            onClick={() => onStartActivity?.('g7-geometry-summary')}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
