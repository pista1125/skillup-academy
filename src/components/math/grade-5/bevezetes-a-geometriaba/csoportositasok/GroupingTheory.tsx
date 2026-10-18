import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  GeometryFigureCard,
  GeometryFigureGrid
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shapes,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Box,
  Layers,
  ArrowRight,
  Filter,
  Check,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GroupingTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

// Interactive Shape Item Type
interface InteractiveShape {
  id: string;
  name: string;
  dimension: '2D' | '3D';
  boundary: 'egyenes' | 'gorbe';
  sides: number; // 0 for curves/3D or non-polygons
  color: 'blue' | 'emerald' | 'amber' | 'rose' | 'purple';
  renderSvg: (className?: string) => React.ReactNode;
}

const SAMPLE_SHAPES: InteractiveShape[] = [
  {
    id: 's1',
    name: 'Egyenlő oldalú háromszög',
    dimension: '2D',
    boundary: 'egyenes',
    sides: 3,
    color: 'blue',
    renderSvg: (cls) => (
      <svg className={cn("w-14 h-14", cls)} viewBox="0 0 60 60" fill="none">
        <polygon points="30,8 52,48 8,48" className="fill-blue-100 stroke-blue-600 dark:fill-blue-950/60 dark:stroke-blue-400" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="30" cy="8" r="2.5" className="fill-blue-600" />
        <circle cx="52" cy="48" r="2.5" className="fill-blue-600" />
        <circle cx="8" cy="48" r="2.5" className="fill-blue-600" />
      </svg>
    )
  },
  {
    id: 's2',
    name: 'Négyzet',
    dimension: '2D',
    boundary: 'egyenes',
    sides: 4,
    color: 'emerald',
    renderSvg: (cls) => (
      <svg className={cn("w-14 h-14", cls)} viewBox="0 0 60 60" fill="none">
        <rect x="10" y="10" width="40" height="40" rx="2" className="fill-emerald-100 stroke-emerald-600 dark:fill-emerald-950/60 dark:stroke-emerald-400" strokeWidth="2.5" />
        <circle cx="10" cy="10" r="2.5" className="fill-emerald-600" />
        <circle cx="50" cy="10" r="2.5" className="fill-emerald-600" />
        <circle cx="50" cy="50" r="2.5" className="fill-emerald-600" />
        <circle cx="10" cy="50" r="2.5" className="fill-emerald-600" />
      </svg>
    )
  },
  {
    id: 's3',
    name: 'Kör',
    dimension: '2D',
    boundary: 'gorbe',
    sides: 0,
    color: 'rose',
    renderSvg: (cls) => (
      <svg className={cn("w-14 h-14", cls)} viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="22" className="fill-rose-100 stroke-rose-600 dark:fill-rose-950/60 dark:stroke-rose-400" strokeWidth="2.5" />
        <circle cx="30" cy="30" r="3" className="fill-rose-600" />
      </svg>
    )
  },
  {
    id: 's4',
    name: 'Szabályos ötszög',
    dimension: '2D',
    boundary: 'egyenes',
    sides: 5,
    color: 'purple',
    renderSvg: (cls) => (
      <svg className={cn("w-14 h-14", cls)} viewBox="0 0 60 60" fill="none">
        <polygon points="30,8 52,24 43,50 17,50 8,24" className="fill-purple-100 stroke-purple-600 dark:fill-purple-950/60 dark:stroke-purple-400" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 's5',
    name: 'Kocka',
    dimension: '3D',
    boundary: 'egyenes',
    sides: 0,
    color: 'blue',
    renderSvg: (cls) => (
      <svg className={cn("w-14 h-14", cls)} viewBox="0 0 60 60" fill="none">
        {/* Cube faces */}
        <path d="M12 22 L32 10 L50 20 L30 32 Z" className="fill-blue-200/80 stroke-blue-600" strokeWidth="2" />
        <path d="M12 22 L30 32 L30 52 L12 42 Z" className="fill-blue-300/80 stroke-blue-700" strokeWidth="2" />
        <path d="M30 32 L50 20 L50 40 L30 52 Z" className="fill-blue-100/90 stroke-blue-600" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: 's6',
    name: 'Henger',
    dimension: '3D',
    boundary: 'gorbe',
    sides: 0,
    color: 'amber',
    renderSvg: (cls) => (
      <svg className={cn("w-14 h-14", cls)} viewBox="0 0 60 60" fill="none">
        <path d="M14 18 L14 42 C14 48 46 48 46 42 L46 18 Z" className="fill-amber-100 stroke-amber-600" strokeWidth="2" />
        <ellipse cx="30" cy="42" rx="16" ry="6" className="fill-amber-200 stroke-amber-600" strokeWidth="2" />
        <ellipse cx="30" cy="18" rx="16" ry="6" className="fill-amber-200 stroke-amber-600" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: 's7',
    name: 'Téglalap',
    dimension: '2D',
    boundary: 'egyenes',
    sides: 4,
    color: 'emerald',
    renderSvg: (cls) => (
      <svg className={cn("w-14 h-14", cls)} viewBox="0 0 60 60" fill="none">
        <rect x="8" y="16" width="44" height="28" rx="2" className="fill-emerald-100 stroke-emerald-600 dark:fill-emerald-950/60 dark:stroke-emerald-400" strokeWidth="2.5" />
      </svg>
    )
  },
  {
    id: 's8',
    name: 'Gömb',
    dimension: '3D',
    boundary: 'gorbe',
    sides: 0,
    color: 'rose',
    renderSvg: (cls) => (
      <svg className={cn("w-14 h-14", cls)} viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="20" className="fill-rose-100 stroke-rose-600" strokeWidth="2" />
        <ellipse cx="30" cy="30" rx="20" ry="6" className="stroke-rose-400 stroke-dasharray-2-2" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M10 30 C10 37 50 37 50 30" className="stroke-rose-500" strokeWidth="1.5" />
      </svg>
    )
  }
];

export function GroupingTheory({ onBack, onStartQuiz }: GroupingTheoryProps) {
  // Filter state for interactive demo
  const [dimFilter, setDimFilter] = useState<'all' | '2D' | '3D'>('all');
  const [boundaryFilter, setBoundaryFilter] = useState<'all' | 'egyenes' | 'gorbe'>('all');

  const filteredShapes = SAMPLE_SHAPES.filter(s => {
    if (dimFilter !== 'all' && s.dimension !== dimFilter) return false;
    if (boundaryFilter !== 'all' && s.boundary !== boundaryFilter) return false;
    return true;
  });

  return (
    <TheoryTemplate
      title="1. Csoportosítások"
      subtitle="Tárgyak és geometriai alakzatok rendszerezése, tulajdonságok és szempontok szerinti szétválogatása"
      documentId="g5-geom-grouping-theory-content"
      pdfFilename="5_osztaly_III_geometria_1_csoportositasok_tananyag.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      themeColor="blue"
      badgeText="📐 5. Osztály • III. Bevezetés a geometriába"
      quickRule={{
        label: "Fontos szabály",
        formula: "Síkidom (2D) ≠ Test (3D) • Sokszög = egyenes szakaszok"
      }}
      practiceTitle="Készen állsz a geometriai csoportosítás gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod a 3 szintű kvízben, az interaktív párosítóban vagy a csoportosítóban!"
    >
      {/* ======================================================== */}
      {/* 1. SZEKCIÓ: A CSOPORTOSÍTÁS ALAPJAI ÉS A TULAJDONSÁGOK */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-grouping-basics"
        number={1}
        title="A csoportosítás alapjai és a tulajdonságok"
        badge="Fogalmak és elvek"
        themeColor="blue"
      >
        <TheoryCard
          title="Mit jelent a csoportosítás a geometriában?"
          subtitle="Tárgyak és alakzatok rendszerezése megfigyelhető tulajdonságaik alapján"
          themeColor="blue"
          icon={<Shapes className="w-5 h-5 text-blue-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A mindennapi életben és a matematikában is lépten-nyomon <strong>csoportosítunk</strong>: a szekrényben külön tesszük a zoknikat és a pólókat, a könyvespolcon tantárgyanként rendezzük a könyveket, a zöldségesnél pedig fajta szerint válogatjuk a gyümölcsöket.
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A geometriában az alakzatokat a legfontosabb <strong>geometriai tulajdonságaik</strong> (attribútumaik) szerint különítjük el és soroljuk csoportokba.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-900">
              <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Hétköznapi tulajdonságok
              </h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                <li><strong>Szín:</strong> piros, kék, sárga, zöld tárgyak</li>
                <li><strong>Méret:</strong> kicsi, közepes, nagy</li>
                <li><strong>Anyag:</strong> fa, fém, műanyag, üveg</li>
                <li><strong>Funkció:</strong> írószerek, játékok, edények</li>
              </ul>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-200 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Matematikai, geometriai tulajdonságok
              </h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                <li><strong>Kiterjedés:</strong> síkbeli alakzat (2D) vagy test (3D)</li>
                <li><strong>Határvonal:</strong> csak egyenes szakaszok vagy görbék is</li>
                <li><strong>Oldalak / csúcsok száma:</strong> 3, 4, 5, 6, sok...</li>
                <li><strong>Szögek fajtája:</strong> hegyesszögű, derékszögű, tompaszögű</li>
              </ul>
            </div>
          </div>
        </TheoryCard>

        {/* 2D vs 3D vizuális összehasonlító kártyák */}
        <GeometryFigureGrid columns={2}>
          <GeometryFigureCard
            title="Síkidomok (2D alakzatok)"
            subtitle="Csak hossza és szélessége van, a síkra rásimul"
            badge="Két dimenzió (2D)"
            themeColor="blue"
            figure={
              <svg className="w-full h-36" viewBox="0 0 300 120" fill="none">
                {/* Square */}
                <rect x="25" y="30" width="60" height="60" rx="3" className="fill-blue-100 stroke-blue-600 dark:fill-blue-950/50" strokeWidth="2.5" />
                <text x="55" y="105" textAnchor="middle" className="text-[12px] font-bold fill-slate-700 dark:fill-slate-300">Négyzet</text>

                {/* Triangle */}
                <polygon points="150,25 185,90 115,90" className="fill-emerald-100 stroke-emerald-600 dark:fill-emerald-950/50" strokeWidth="2.5" />
                <text x="150" y="105" textAnchor="middle" className="text-[12px] font-bold fill-slate-700 dark:fill-slate-300">Háromszög</text>

                {/* Circle */}
                <circle cx="240" cy="58" r="32" className="fill-rose-100 stroke-rose-600 dark:fill-rose-950/50" strokeWidth="2.5" />
                <text x="240" y="105" textAnchor="middle" className="text-[12px] font-bold fill-slate-700 dark:fill-slate-300">Kör</text>
              </svg>
            }
          >
            <p className="text-sm text-slate-600 dark:text-slate-400">
              A <strong>síkidomok</strong> vastagság nélküli, lapos geometriai alakzatok. Területük van, de térfogatuk nincs.
            </p>
          </GeometryFigureCard>

          <GeometryFigureCard
            title="Térbeli testek (3D alakzatok)"
            subtitle="Hossza, szélessége és magassága is van, teret tölt be"
            badge="Három dimenzió (3D)"
            themeColor="emerald"
            figure={
              <svg className="w-full h-36" viewBox="0 0 300 120" fill="none">
                {/* Cube */}
                <g transform="translate(15, 20)">
                  <path d="M15 22 L42 8 L72 20 L45 34 Z" className="fill-blue-200/80 stroke-blue-600" strokeWidth="2" />
                  <path d="M15 22 L45 34 L45 68 L15 54 Z" className="fill-blue-400/80 stroke-blue-700" strokeWidth="2" />
                  <path d="M45 34 L72 20 L72 54 L45 68 Z" className="fill-blue-300/80 stroke-blue-600" strokeWidth="2" />
                  <text x="43" y="85" textAnchor="middle" className="text-[12px] font-bold fill-slate-700 dark:fill-slate-300">Kocka</text>
                </g>

                {/* Cylinder */}
                <g transform="translate(115, 20)">
                  <path d="M15 20 L15 54 C15 62 55 62 55 54 L55 20 Z" className="fill-amber-100 stroke-amber-600" strokeWidth="2" />
                  <ellipse cx="35" cy="54" rx="20" ry="7" className="fill-amber-200 stroke-amber-600" strokeWidth="2" />
                  <ellipse cx="35" cy="20" rx="20" ry="7" className="fill-amber-200 stroke-amber-600" strokeWidth="2" />
                  <text x="35" y="85" textAnchor="middle" className="text-[12px] font-bold fill-slate-700 dark:fill-slate-300">Henger</text>
                </g>

                {/* Sphere */}
                <g transform="translate(205, 18)">
                  <circle cx="40" cy="38" r="28" className="fill-rose-100 stroke-rose-600" strokeWidth="2" />
                  <ellipse cx="40" cy="38" rx="28" ry="9" className="stroke-rose-400" strokeWidth="1.5" strokeDasharray="4 3" />
                  <path d="M12 38 C12 48 68 48 68 38" className="stroke-rose-500" strokeWidth="1.5" />
                  <text x="40" y="87" textAnchor="middle" className="text-[12px] font-bold fill-slate-700 dark:fill-slate-300">Gömb</text>
                </g>
              </svg>
            }
          >
            <p className="text-sm text-slate-600 dark:text-slate-400">
              A <strong>testek</strong> térbeli alakzatok. Határfelületek (lapok) zárják körül őket. Felszínük és térfogatuk (űrtartalmuk) van.
            </p>
          </GeometryFigureCard>
        </GeometryFigureGrid>
      </TheorySection>

      {/* ======================================================== */}
      {/* 2. SZEKCIÓ: INTERAKTÍV CSOPORTOSÍTÓ SZŰRŐ LABOR */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-grouping-interactive"
        number={2}
        title="Interaktív labor: Csoportosítás szempontok szerint"
        badge="Kipróbálható szűrők"
        themeColor="indigo"
      >
        <TheoryCard
          title="Próbáld ki a szempontok szerinti szétválogatást!"
          subtitle="Válassz ki egy vagy több szempontot, és figyeld meg, mely alakzatok felelnek meg a szabálynak!"
          themeColor="indigo"
          icon={<Filter className="w-5 h-5 text-indigo-600" />}
        >
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Kiterjedés:</span>
              <div className="flex gap-1">
                {(['all', '2D', '3D'] as const).map(option => (
                  <Button
                    key={option}
                    size="sm"
                    variant={dimFilter === option ? 'default' : 'outline'}
                    className={cn(
                      "text-xs h-8 px-3 rounded-xl font-bold",
                      dimFilter === option ? "bg-indigo-600 text-white" : ""
                    )}
                    onClick={() => setDimFilter(option)}
                  >
                    {option === 'all' ? 'Mind (2D és 3D)' : option}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Határvonal:</span>
              <div className="flex gap-1">
                {(['all', 'egyenes', 'gorbe'] as const).map(option => (
                  <Button
                    key={option}
                    size="sm"
                    variant={boundaryFilter === option ? 'default' : 'outline'}
                    className={cn(
                      "text-xs h-8 px-3 rounded-xl font-bold",
                      boundaryFilter === option ? "bg-indigo-600 text-white" : ""
                    )}
                    onClick={() => setBoundaryFilter(option)}
                  >
                    {option === 'all' ? 'Mindkettő' : option === 'egyenes' ? 'Csak egyenes' : 'Görbe is'}
                  </Button>
                ))}
              </div>
            </div>

            {(dimFilter !== 'all' || boundaryFilter !== 'all') && (
              <Button
                size="sm"
                variant="ghost"
                className="text-xs text-slate-500 hover:text-slate-800 h-8 ml-auto"
                onClick={() => {
                  setDimFilter('all');
                  setBoundaryFilter('all');
                }}
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Szűrők törlése
              </Button>
            )}
          </div>

          {/* Results Display */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SAMPLE_SHAPES.map(shape => {
              const matches = filteredShapes.some(fs => fs.id === shape.id);
              return (
                <div
                  key={shape.id}
                  className={cn(
                    "flex flex-col items-center p-4 rounded-2xl border transition-all text-center",
                    matches
                      ? "bg-white dark:bg-slate-900 border-indigo-300 dark:border-indigo-700 shadow-md ring-2 ring-indigo-400/20 scale-100 opacity-100"
                      : "bg-slate-100/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-30 grayscale scale-95"
                  )}
                >
                  <div className="mb-2">
                    {shape.renderSvg()}
                  </div>
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200 leading-tight mb-1">
                    {shape.name}
                  </span>
                  <div className="flex flex-wrap gap-1 justify-center mt-auto">
                    <Badge variant="outline" className="text-[10px] py-0 px-1.5 font-bold">
                      {shape.dimension}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                      {shape.boundary === 'egyenes' ? 'Egyenes' : 'Görbe'}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-200 flex items-center justify-between">
            <span>
              Kiválasztott alakzatok száma: <strong>{filteredShapes.length} / {SAMPLE_SHAPES.length}</strong>
            </span>
            <span className="text-slate-500 font-medium">
              Szűrés: {dimFilter === 'all' ? 'bármilyen dimenzió' : dimFilter} + {boundaryFilter === 'all' ? 'bármilyen határ' : boundaryFilter}
            </span>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 3. SZEKCIÓ: EGY ÉS KÉT SZEMPONT SZERINTI CSOPORTOSÍTÁS */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-grouping-tables"
        number={3}
        title="Csoportosítás táblázattal (egy és két szempont)"
        badge="Rendszerezés"
        themeColor="emerald"
      >
        <TheoryCard
          title="Kétirányú táblázat használata"
          subtitle="Ha egyszerre két szempontot vizsgálunk, a táblázat sora és oszlopa mutatja a közös tulajdonságokat"
          themeColor="emerald"
          icon={<Layers className="w-5 h-5 text-emerald-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Amikor egyszerre <strong>két tulajdonságot</strong> vizsgálunk (például: <em>Kiterjedés: síkidom vagy test</em> ÉS <em>Határoló vonal: csak egyenes vagy görbe is</em>), a leghatékonyabb eszköz a <strong>kétirányú táblázat</strong>.
          </p>

          <TheoryTable
            headers={['Tulajdonság', 'Csak egyenes szakaszok / síklapok határolják', 'Görbe vonal / görbe felület is határolja']}
            rows={[
              [
                <span className="font-bold text-blue-600 dark:text-blue-400">Síkidom (2D)</span>,
                <div className="space-y-1">
                  <strong>Sokszögek:</strong>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    Háromszög, négyzet, téglalap, ötszög, hatszög, trapéz, rombusz
                  </div>
                </div>,
                <div className="space-y-1">
                  <strong>Görbe vonalú síkidomok:</strong>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    Kör, ellipszis, félkör, cseppalak, körgyűrű
                  </div>
                </div>
              ],
              [
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Térbeli test (3D)</span>,
                <div className="space-y-1">
                  <strong>Soklapú testek (Poliéderek):</strong>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    Kocka, téglatest, négyzetes gúla (piramis), háromoldalú prizma
                  </div>
                </div>,
                <div className="space-y-1">
                  <strong>Forgástestek és görbe felületűek:</strong>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    Henger, kúp, gömb, félgömb
                  </div>
                </div>
              ]
            ]}
          />

          <TheoryCallout
            title="Hogyan olvassuk a táblázatot?"
            variant="tip"
            className="mt-4"
          >
            A táblázat minden egyes cellája olyan elemeket tartalmaz, amelyekre <strong>egyszerre mindkét feltétel</strong> teljesül! Például a <em>Kocka</em> a <em>Térbeli test</em> sorában és a <em>Csak egyenes / síklap</em> oszlopában van, mert test ÉS nincsenek görbe részei.
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 4. SZEKCIÓ: RENDEZÉSI ELVEK ÉS A KAKUKKTOJÁS */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-grouping-odd-one-out"
        number={4}
        title="Rendezési elvek és a „Kakukktojás”"
        badge="Logika és kizárás"
        themeColor="purple"
      >
        <TheoryCard
          title="1. Rendezés sorrendbe állítással"
          subtitle="Alakzatok sorba rendezése növekvő vagy csökkenő tulajdonság szerint"
          themeColor="purple"
          icon={<ArrowRight className="w-5 h-5 text-purple-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A csoportosítás mellett fontos készség a <strong>sorba rendezés</strong>. Gyakori geometriai rendezési szempontok:
          </p>
          <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 mb-4">
            <h4 className="font-bold text-purple-900 dark:text-purple-200 mb-2">Példa: Sokszögek sorba rendezése az oldalak száma szerint (növekvő):</h4>
            <div className="flex items-center justify-between flex-wrap gap-2 text-center pt-2">
              <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 shadow-sm flex-1 min-w-[70px]">
                <div className="text-xs text-slate-500">1. hely</div>
                <div className="font-black text-purple-600 text-lg">3 oldal</div>
                <div className="text-xs font-semibold">Háromszög</div>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-400 shrink-0" />
              <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 shadow-sm flex-1 min-w-[70px]">
                <div className="text-xs text-slate-500">2. hely</div>
                <div className="font-black text-purple-600 text-lg">4 oldal</div>
                <div className="text-xs font-semibold">Négyszög</div>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-400 shrink-0" />
              <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 shadow-sm flex-1 min-w-[70px]">
                <div className="text-xs text-slate-500">3. hely</div>
                <div className="font-black text-purple-600 text-lg">5 oldal</div>
                <div className="text-xs font-semibold">Ötszög</div>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-400 shrink-0" />
              <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 shadow-sm flex-1 min-w-[70px]">
                <div className="text-xs text-slate-500">4. hely</div>
                <div className="font-black text-purple-600 text-lg">6 oldal</div>
                <div className="text-xs font-semibold">Hatszög</div>
              </div>
            </div>
          </div>
        </TheoryCard>

        <TheoryCard
          title="2. A „Kakukktojás” szabály (Melyik nem illik a sorba?)"
          subtitle="Kizárási elv megfogalmazása pontos indoklással"
          themeColor="rose"
          icon={<Lightbulb className="w-5 h-5 text-rose-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A kakukktojás keresésekor egy alakzatcsoportban egy kivételével minden tag rendelkezik egy közös tulajdonsággal. A mi feladatunk megtalálni a kilógót, és <strong>pontosan megfogalmazni</strong> a kizáró tulajdonságot!
          </p>

          <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900 mb-4">
            <h4 className="font-bold text-rose-900 dark:text-rose-200 mb-3">Gondolkodtató feladat: Melyik a kakukktojás az alábbi 4 alakzat közül?</h4>
            <div className="grid grid-cols-4 gap-2 mb-3 text-center">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200">
                <div className="font-black text-slate-800 dark:text-slate-200">A</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Négyzet</div>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200">
                <div className="font-black text-slate-800 dark:text-slate-200">B</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Téglalap</div>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-300 bg-rose-50/50">
                <div className="font-black text-rose-600">C</div>
                <div className="text-xs font-bold text-rose-700">Kör</div>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200">
                <div className="font-black text-slate-800 dark:text-slate-200">D</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Trapéz</div>
              </div>
            </div>
            <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white/80 dark:bg-slate-900/80 p-3 rounded-lg border border-rose-200">
              <strong>Megoldás és indoklás:</strong> A <strong>C (Kör)</strong> a kakukktojás, mert azt görbe vonal határolja, míg az A, B és D mindegyike 4 oldalú sokszög (négyszög), amelyeket egyenes szakaszok határolnak.
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 5. SZEKCIÓ: GYAKORI CSAPDÁK ÉS TÉVHITEK */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-grouping-traps"
        number={5}
        title="Gyakori tévhitek és csapdák"
        badge="Mire figyelj nagyon?"
        themeColor="amber"
      >
        <TheoryTrapBox
          title="Gyakori csapdák & tipikus tévhitek a csoportosításban"
          traps={[
            {
              title: '1. Csapda: Síkidom (2D) és test (3D) összekeverése',
              wrong: 'A papírra rajzolt négyzetet vagy téglalapot kockának, a kört pedig gömbnek/labdának nevezni.',
              correct: 'A négyzet síkbeli alakzat (2D, lapos, nincs vastagsága). A kocka egy térbeli test (3D, kiterjedése és 6 határoló lapja van).',
              explanation: 'A síkidomnak csak kerülete és területe van, míg a térbeli testnek felülete és térfogata (űrtartalma) is van!'
            },
            {
              title: '2. Csapda: Elforgatott alakzat tulajdonsága megváltozik',
              wrong: '„Ha egy négyzetet 45 fokkal a csúcsára állítunk, az már nem négyzet, hanem rombusz vagy gyémánt.”',
              correct: 'Az elforgatástól a négyzet oldalai mind egyenlők maradnak, és mind a 4 szöge derékszög (90°) marad, így továbbra is négyzet!',
              explanation: 'Az alakzat helyzete a térben vagy a síkon (elforgatás, eltolás, tükrözés) nem változtatja meg a geometriai alaptulajdonságait.'
            },
            {
              title: '3. Csapda: Önkényes „kakukktojás” kiválasztás',
              wrong: 'Ránézésre, indoklás nélkül rávágni: „Nekem a sárga nem tetszik, az a kakukktojás”.',
              correct: 'A kakukktojást és a csoportosítást mindig egzakt geometriai tulajdonsággal és szabállyal kell indokolni!',
              explanation: 'Például: „A kör a kakukktojás, mert azt görbe vonal határolja, míg a többi alakzat egyenes szakaszokból álló sokszög”.'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
}

export default GroupingTheory;
