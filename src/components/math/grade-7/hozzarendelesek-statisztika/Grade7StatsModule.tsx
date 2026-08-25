import { Button } from '@/components/ui/button';
import { SectionHeader } from "@/components/math/shared/SectionHeader";
import { ActivityPlaceholder } from "@/components/math/shared/ActivityPlaceholder";
import { MaterialGallery } from "@/components/math/shared/MaterialGallery";
import {
    ArrowLeft,
    TrendingUp,
    LineChart,
    ArrowRightLeft,
    BookOpen,
    HelpCircle,
    BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Grade7StatsModuleProps {
    onBack: () => void;
    onStartActivity?: (type: string) => void;
    onViewMaterial?: (material: any) => void;
    isInline?: boolean;
    initialMaterialId?: string | null;
}

export function Grade7StatsModule({ 
    onBack, 
    onStartActivity, 
    onViewMaterial,
    isInline = false,
    initialMaterialId = null
}: Grade7StatsModuleProps) {
    return (
        <div className={cn(
            "flex flex-col animate-in fade-in duration-500",
            isInline ? "gap-6 py-2" : "gap-10 py-6 slide-in-from-bottom-4"
        )}>
            {!isInline && (
                <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-cyan-100 shadow-sm mx-1">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl text-white shadow-lg shadow-cyan-200">
                            <TrendingUp className="w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="font-display text-2xl font-black text-slate-800 tracking-tight">VII. Hozzárendelések, statisztika</h2>
                            <p className="text-sm font-medium text-slate-500">Függvények fogalma és az adatok elemzése</p>
                        </div>
                    </div>
                    <Button variant="ghost" onClick={onBack} size="sm" className="rounded-xl hover:bg-cyan-50 text-cyan-600 font-bold">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Vissza
                    </Button>
                </div>
            )}

            <div className="space-y-12">
                {/* 1. Hozzárendelések, függvények */}
                <section>
                    <SectionHeader number={1} title="Hozzárendelések és függvények" color="blue" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Hozzárendelés Kvíz"
                            subtitle="Halmazok összekötése nyilakkal"
                            type="Kvíz / Játék"
                            icon={<ArrowRightLeft className="w-6 h-6" />}
                            color="blue"
                            onClick={() => onStartActivity?.('g7-mapping-quiz')}
                        />
                        <ActivityPlaceholder
                            title="Függvény leolvasás"
                            subtitle="Táblázat kitöltése grafikonról"
                            type="Kvíz / Játék"
                            icon={<LineChart className="w-6 h-6" />}
                            color="cyan"
                            onClick={() => onStartActivity?.('g7-function-table-quiz')}
                        />
                    </div>
                </section>

                {/* 2. Statisztika, adatábrázolás */}
                <section>
                    <SectionHeader number={2} title="Statisztika és adatábrázolás" color="indigo" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <ActivityPlaceholder
                            title="Adatfeldolgozás"
                            subtitle="Átlag, módusz, medián"
                            type="Hamarosan"
                            icon={<BarChart3 className="w-6 h-6" />}
                            color="indigo"
                            disabled
                        />
                        <ActivityPlaceholder
                            title="Grafikonok"
                            subtitle="Oszlop- és kördiagramok"
                            type="Hamarosan"
                            icon={<LineChart className="w-6 h-6" />}
                            color="violet"
                            disabled
                        />
                    </div>
                </section>

                {/* 3. Letölthető tananyagok */}
                <section>
                    <SectionHeader number={3} title="Letölthető tankönyvek és segédletek" color="emerald" />
                    <div className="bg-white/40 p-4 rounded-3xl border border-slate-100 shadow-sm">
                        <MaterialGallery
                            grade={7}
                            onView={onViewMaterial}
                            initialMaterialId={initialMaterialId || undefined}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
