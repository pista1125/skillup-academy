import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  GeometryFigureCard,
  GeometryFigureGrid,
  GeometrySvgFrame
} from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CircleDot,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Box,
  Layers,
  ArrowRight,
  Filter,
  Check,
  RotateCcw,
  Target,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SetsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const SetsTheory: React.FC<SetsTheoryProps> = ({ onBack, onStartQuiz }) => {
  // Interaktív Venn-diagram állapot
  const [activeRegion, setActiveRegion] = useState<'all' | 'onlyA' | 'intersection' | 'onlyB' | 'outside'>('all');

  return (
    <TheoryTemplate
      title="2. Halmazok"
      subtitle="A halmaz és elemei, Venn-diagramos ábrázolás, részhalmaz, metszet és unió a geometriában"
      documentId="g5-geom-sets-theory-content"
      pdfFilename="5_osztaly_III_geometria_2_halmazok_tananyag.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      themeColor="violet"
      badgeText="📐 5. Osztály • III. Bevezetés a geometriába"
      quickRule={{
        label: "Fontos szabály",
        formula: "a ∈ A • b ∉ A • A ∩ B (metszet) • A ∪ B (unió) • B ⊆ A (részhalmaz)"
      }}
      practiceTitle="Készen állsz a halmazok és a Venn-diagramok gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod a 3 szintű kvízben, a párosítóban vagy a csoportosítóban!"
    >
      {/* ======================================================== */}
      {/* 1. SZEKCIÓ: A HALMAZ FOGALMA, JELÖLÉSEI ÉS MEGADÁSA */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-sets-basics"
        number={1}
        title="A halmaz fogalma, megadása és jelölései"
        badge="Alapfogalmak"
        badgeColor="violet"
      >
        <TheoryCard
          title="Mi az a halmaz a matematikában?"
          subtitle="Tárgyak, számok vagy alakzatok összessége, egyértelmű tagsági szabállyal"
          themeColor="violet"
          icon={<CircleDot className="w-5 h-5 text-violet-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A matematikában <strong>halmaznak</strong> nevezzük bizonyos dolgok (számok, síkidomok, testek, tárgyak) összességét, ha egyértelműen meg van határozva egy olyan szabály, amely alapján <strong>bármiről kétséget kizáróan el lehet dönteni</strong>, hogy beletartozik-e vagy sem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-200 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Jó halmazmeghatározás (egyértelmű)
              </h4>
              <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-1.5 list-disc list-inside">
                <li>„Az 5. osztályos matematika könyvben szereplő síkidomok halmaza.”</li>
                <li>„A négy oldalú sokszögek halmaza.” (egyértelmű: 4 oldala van vagy sem)</li>
                <li>„A 10-nél kisebb pozitív páros számok halmaza: &#123;2, 4, 6, 8&#125;.”</li>
              </ul>
            </div>

            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900">
              <h4 className="font-bold text-rose-900 dark:text-rose-200 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                NEM halmaz (nem egyértelmű, szubjektív)
              </h4>
              <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-1.5 list-disc list-inside">
                <li>„A szép geometriai alakzatok.” (kinek mi a szép?)</li>
                <li>„A nagy számok.” (mi számít nagynak?)</li>
                <li>„A nehéz geometriai feladatok.” (valakinek könnyű, másnak nehéz)</li>
              </ul>
            </div>
          </div>
        </TheoryCard>

        <TheoryCard
          title="A halmaz jelölései és legfontosabb szimbólumai"
          subtitle="Így írjuk le a halmazelméleti összefüggéseket precízen"
          themeColor="violet"
        >
          <TheoryTable
            title="Halmazelméleti jelölésgyűjtemény példákkal"
            columns={['Jelölés', 'Elnevezés', 'Jelentése', 'Geometriai példa']}
            rows={[
              ['A, B, H', 'Halmaz neve', 'Nagy nyomtatott betűvel jelöljük', 'N = négyszögek halmaza'],
              ['a ∈ A', 'Eleme reláció', 'Az „a” dolog beletartozik az A halmazba', 'Négyzet ∈ Négyszögek'],
              ['b ∉ A', 'Nem eleme reláció', 'A „b” dolog nem tartozik bele az A halmazba', 'Kör ∉ Sokszögek'],
              ['∅ vagy { }', 'Üres halmaz', 'Olyan halmaz, amelynek egyetlen eleme sincs', '5 oldalú háromszögek = ∅'],
              ['|A|', 'Halmaz számossága', 'Az A halmaz elemeinek száma darabban', '|{kör, négyzet, háromszög}| = 3'],
              ['U', 'Alaphalmaz (univerzum)', 'A vizsgált elemek legbővebb köre', 'U = Síkidomok összessége']
            ]}
          />

          <TheoryCallout variant="info" title="Hogyan adhatunk meg egy halmazt?" className="mt-4">
            <div className="space-y-1.5 text-xs sm:text-sm">
              <p>
                <strong>1. Elemek felsorolásával kapcsos zárójelben:</strong>{' '}
                <MathText>{'H = \\{ \\text{háromszög}, \\text{négyzet}, \\text{kör} \\}'}</MathText>.
                A sorrend nem számít, és minden elem csak egyszer szerepelhet benne!
              </p>
              <p>
                <strong>2. Közös tulajdonság megadásával:</strong>{' '}
                <MathText>{'H = \\{ \\text{olyan síkidomok, amelyeknek 4 csúcsuk van} \\}'}</MathText>.
              </p>
            </div>
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 2. SZEKCIÓ: A VENN-DIAGRAM ÉS HALMAZOK ÁBRÁZOLÁSA */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-sets-venn"
        number={2}
        title="A Venn-diagram: Halmazok szemléltetése zárt görbékkel"
        badge="Szemléltetés"
        badgeColor="blue"
      >
        <TheoryCard
          title="John Venn diagramja: Alakzatok a zárt vonalakon belül és kívül"
          subtitle="Kattints az alábbi gombokra az egyes tartományok megtekintéséhez!"
          themeColor="blue"
          icon={<Layers className="w-5 h-5 text-blue-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A <strong>Venn-diagram</strong> a halmazok legnépszerűbb és legszemléletesebb rajzos megjelenítése. Az alaphalmazt ($U$) egy téglalap, az egyes halmazokat pedig zárt görbék (általában körök vagy oválisok) határolják.
          </p>

          {/* Interaktív Venn-diagram szűrő gombok */}
          <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5 text-violet-600" />
              Vizsgált tartomány:
            </span>
            <Button
              size="sm"
              variant={activeRegion === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveRegion('all')}
              className="text-xs h-8 rounded-xl font-bold"
            >
              Teljes ábra
            </Button>
            <Button
              size="sm"
              variant={activeRegion === 'onlyA' ? 'default' : 'outline'}
              onClick={() => setActiveRegion('onlyA')}
              className="text-xs h-8 rounded-xl font-bold border-blue-300"
            >
              Csak A (Négyszögek)
            </Button>
            <Button
              size="sm"
              variant={activeRegion === 'intersection' ? 'default' : 'outline'}
              onClick={() => setActiveRegion('intersection')}
              className="text-xs h-8 rounded-xl font-bold border-purple-400"
            >
              Metszet: A ∩ B (Négyzet, Rombusz)
            </Button>
            <Button
              size="sm"
              variant={activeRegion === 'onlyB' ? 'default' : 'outline'}
              onClick={() => setActiveRegion('onlyB')}
              className="text-xs h-8 rounded-xl font-bold border-emerald-300"
            >
              Csak B (Egyenlő oldalú)
            </Button>
            <Button
              size="sm"
              variant={activeRegion === 'outside' ? 'default' : 'outline'}
              onClick={() => setActiveRegion('outside')}
              className="text-xs h-8 rounded-xl font-bold border-slate-400"
            >
              Kívül: Egyik sem (Kör, Gömb)
            </Button>
          </div>

          {/* Interaktív Venn-diagram SVG Megjelenítés */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-inner">
            <svg className="w-full h-64 mx-auto max-w-xl" viewBox="0 0 500 260" fill="none">
              {/* Alaphalmaz Keret (U) */}
              <rect
                x="10"
                y="10"
                width="480"
                height="240"
                rx="16"
                className={cn(
                  'stroke-slate-300 dark:stroke-slate-700 transition-all',
                  activeRegion === 'outside'
                    ? 'fill-slate-100 dark:fill-slate-800/80 stroke-slate-500 stroke-2'
                    : 'fill-slate-50/60 dark:fill-slate-900/60'
                )}
                strokeWidth="1.5"
              />
              <text x="30" y="36" className="text-sm font-black fill-slate-500">
                U (Alaphalmaz: Síkidomok és testek)
              </text>

              {/* A Halmaz Karika (Négyszögek) */}
              <circle
                cx="195"
                cy="135"
                r="95"
                className={cn(
                  'transition-all stroke-blue-500',
                  activeRegion === 'onlyA' || activeRegion === 'all'
                    ? 'fill-blue-100/70 dark:fill-blue-950/50 stroke-blue-600 stroke-2'
                    : 'fill-blue-50/20 stroke-blue-300'
                )}
                strokeWidth="2"
              />
              <text x="145" y="65" className="text-sm font-black fill-blue-700 dark:fill-blue-300">
                A = Négyszögek
              </text>

              {/* B Halmaz Karika (Minden oldala egyenlő) */}
              <circle
                cx="305"
                cy="135"
                r="95"
                className={cn(
                  'transition-all stroke-emerald-500',
                  activeRegion === 'onlyB' || activeRegion === 'all'
                    ? 'fill-emerald-100/70 dark:fill-emerald-950/50 stroke-emerald-600 stroke-2'
                    : 'fill-emerald-50/20 stroke-emerald-300'
                )}
                strokeWidth="2"
              />
              <text x="275" y="65" className="text-sm font-black fill-emerald-700 dark:fill-emerald-300">
                B = Minden oldala egyenlő
              </text>

              {/* Metszet kiemelése (A ∩ B) */}
              {(activeRegion === 'intersection' || activeRegion === 'all') && (
                <path
                  d="M 250 63 A 95 95 0 0 1 250 207 A 95 95 0 0 1 250 63 Z"
                  className={cn(
                    'transition-all',
                    activeRegion === 'intersection'
                      ? 'fill-purple-300/90 dark:fill-purple-900/90 stroke-purple-600 stroke-2'
                      : 'fill-purple-200/50 dark:fill-purple-950/40'
                  )}
                />
              )}

              {/* Csak A-ban lévő elemek */}
              <g className={cn('transition-opacity', activeRegion === 'onlyA' || activeRegion === 'all' ? 'opacity-100' : 'opacity-25')}>
                {/* Téglalap */}
                <rect x="130" y="100" width="30" height="18" rx="2" className="fill-blue-200 stroke-blue-700" strokeWidth="1.5" />
                <text x="145" y="130" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">Téglalap</text>

                {/* Trapéz */}
                <polygon points="135,150 160,150 168,170 125,170" className="fill-blue-200 stroke-blue-700" strokeWidth="1.5" />
                <text x="145" y="184" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">Trapéz</text>
              </g>

              {/* Metszetben lévő elemek (A ∩ B) */}
              <g className={cn('transition-opacity', activeRegion === 'intersection' || activeRegion === 'all' ? 'opacity-100' : 'opacity-25')}>
                {/* Négyzet */}
                <rect x="238" y="98" width="24" height="24" rx="2" className="fill-purple-200 stroke-purple-700" strokeWidth="2" />
                <text x="250" y="134" textAnchor="middle" className="text-[10px] font-black fill-purple-950 dark:fill-purple-200">Négyzet</text>

                {/* Rombusz */}
                <polygon points="250,146 262,160 250,174 238,160" className="fill-purple-200 stroke-purple-700" strokeWidth="2" />
                <text x="250" y="188" textAnchor="middle" className="text-[10px] font-black fill-purple-950 dark:fill-purple-200">Rombusz</text>
              </g>

              {/* Csak B-ben lévő elemek */}
              <g className={cn('transition-opacity', activeRegion === 'onlyB' || activeRegion === 'all' ? 'opacity-100' : 'opacity-25')}>
                {/* Szabályos háromszög */}
                <polygon points="345,100 362,128 328,128" className="fill-emerald-200 stroke-emerald-700" strokeWidth="1.5" />
                <text x="345" y="142" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">Szabályos 3-szög</text>

                {/* Szabályos ötszög */}
                <polygon points="345,152 358,162 353,178 337,178 332,162" className="fill-emerald-200 stroke-emerald-700" strokeWidth="1.5" />
                <text x="345" y="192" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">Szabályos 5-szög</text>
              </g>

              {/* Külső elemek (U \\ (A ∪ B)) */}
              <g className={cn('transition-opacity', activeRegion === 'outside' || activeRegion === 'all' ? 'opacity-100' : 'opacity-25')}>
                {/* Kör */}
                <circle cx="55" cy="180" r="16" className="fill-rose-100 stroke-rose-600" strokeWidth="1.5" />
                <text x="55" y="210" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">Kör</text>

                {/* Kocka */}
                <g transform="translate(425, 160)">
                  <path d="M5 8 L18 3 L31 8 L18 13 Z" className="fill-amber-100 stroke-amber-600" strokeWidth="1" />
                  <path d="M5 8 L18 13 L18 25 L5 20 Z" className="fill-amber-300 stroke-amber-700" strokeWidth="1" />
                  <path d="M18 13 L31 8 L31 20 L18 25 Z" className="fill-amber-200 stroke-amber-600" strokeWidth="1" />
                  <text x="18" y="37" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">Kocka</text>
                </g>
              </g>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 text-xs">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200">
              <strong className="text-blue-800 dark:text-blue-300">Csak A (Négyszög, de nem minden oldala egyenlő):</strong> Téglalap, Trapéz, Paralelogramma.
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200">
              <strong className="text-purple-800 dark:text-purple-300">Metszet A ∩ B (Négyszög ÉS minden oldala egyenlő):</strong> Négyzet, Rombusz.
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200">
              <strong className="text-emerald-800 dark:text-emerald-300">Csak B (Nem négyszög, de minden oldala egyenlő):</strong> Szabályos háromszög, ötszög.
            </div>
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700">
              <strong className="text-slate-800 dark:text-slate-200">Kívül eső elemek:</strong> Kör (görbe), Kocka (3D térbeli test).
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 3. SZEKCIÓ: KÉT HALMAZ MŰVELETEI ÉS KAPCSOLATAI */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-sets-operations"
        number={3}
        title="Két halmaz műveletei: Metszet, Unió és Diszjunkt halmazok"
        badge="Műveletek"
        badgeColor="purple"
      >
        <GeometryFigureGrid columns={3}>
          {/* Metszet */}
          <GeometryFigureCard
            title="1. Metszet (A ∩ B)"
            subtitle="Közös rész: mindkét halmazba beletartozik"
            badge="ÉS kapcsolat"
            themeColor="purple"
            figure={
              <svg className="w-full h-28" viewBox="0 0 160 90" fill="none">
                <circle cx="65" cy="45" r="32" className="stroke-slate-400" strokeWidth="1.5" />
                <circle cx="95" cy="45" r="32" className="stroke-slate-400" strokeWidth="1.5" />
                <path d="M 80 20 A 32 32 0 0 1 80 70 A 32 32 0 0 1 80 20 Z" className="fill-purple-300 stroke-purple-600" strokeWidth="2" />
                <text x="46" y="48" className="text-[10px] font-black fill-slate-600">A</text>
                <text x="108" y="48" className="text-[10px] font-black fill-slate-600">B</text>
              </svg>
            }
            formula="A ∩ B = {x | x ∈ A és x ∈ B}"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Csak azok az elemek tartoznak ide, amelyek <strong>egyszerre mindkét</strong> halmaz feltételének megfelelnek.
            </p>
          </GeometryFigureCard>

          {/* Unió */}
          <GeometryFigureCard
            title="2. Unió (A ∪ B)"
            subtitle="Egyesítés: legalább az egyikbe beletartozik"
            badge="VAGY kapcsolat"
            themeColor="amber"
            figure={
              <svg className="w-full h-28" viewBox="0 0 160 90" fill="none">
                <circle cx="65" cy="45" r="32" className="fill-amber-200/80 stroke-amber-600" strokeWidth="2" />
                <circle cx="95" cy="45" r="32" className="fill-amber-200/80 stroke-amber-600" strokeWidth="2" />
                <text x="46" y="48" className="text-[10px] font-black fill-amber-900">A</text>
                <text x="108" y="48" className="text-[10px] font-black fill-amber-900">B</text>
              </svg>
            }
            formula="A ∪ B = {x | x ∈ A vagy x ∈ B}"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Minden olyan elem, ami benne van A-ban, B-ben, vagy mindkettőben. Az elemeket nem írjuk le duplán!
            </p>
          </GeometryFigureCard>

          {/* Diszjunkt halmazok */}
          <GeometryFigureCard
            title="3. Diszjunkt halmazok"
            subtitle="Közös elem nélküli, különálló halmazok"
            badge="A ∩ B = ∅"
            themeColor="rose"
            figure={
              <svg className="w-full h-28" viewBox="0 0 160 90" fill="none">
                <circle cx="48" cy="45" r="28" className="fill-blue-50 stroke-blue-500" strokeWidth="2" />
                <circle cx="112" cy="45" r="28" className="fill-rose-50 stroke-rose-500" strokeWidth="2" />
                <text x="48" y="49" textAnchor="middle" className="text-[10px] font-black fill-blue-700">3-szögek</text>
                <text x="112" y="49" textAnchor="middle" className="text-[10px] font-black fill-rose-700">4-szögek</text>
              </svg>
            }
            formula="A ∩ B = ∅ (üres metszet)"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Nincs egyetlen olyan alakzat sem, amelyik egyszerre háromszög és négyszög is lehetne.
            </p>
          </GeometryFigureCard>
        </GeometryFigureGrid>
      </TheorySection>

      {/* ======================================================== */}
      {/* 4. SZEKCIÓ: RÉSZHALMAZ ÉS A GEOMETRIAI ALAKZATOK HIERARCHIÁJA */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-sets-subsets"
        number={4}
        title="Részhalmazok és a geometriai alakzatok osztályozása"
        badge="Hierarchia"
        badgeColor="emerald"
      >
        <TheoryCard
          title="A részhalmaz fogalma (B ⊆ A)"
          subtitle="Ha egy szűkebb csoport minden tagja egyben egy tágabb csoportnak is tagja"
          themeColor="emerald"
          icon={<Box className="w-5 h-5 text-emerald-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Akkor mondjuk, hogy a <strong>B halmaz részhalmaza az A halmaznak</strong> (jelölése: $B \subseteq A$), ha a B halmaz minden eleme egyben az A halmaznak is eleme.
          </p>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 mb-4">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              A geometriai alakzatok nagy egymásba ágyazott hierarchiája:
            </h4>

            {/* Koncentrikus egymásba ágyazott halmazok vizuális rajza */}
            <div className="flex justify-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 mb-3">
              <svg className="w-full h-44 max-w-lg" viewBox="0 0 450 170" fill="none">
                {/* 1. Síkidomok (legkülső) */}
                <ellipse cx="225" cy="85" rx="215" ry="80" className="fill-slate-100/60 stroke-slate-400" strokeWidth="1.5" />
                <text x="35" y="35" className="text-[11px] font-black fill-slate-600">Síkidomok</text>

                {/* 2. Sokszögek */}
                <ellipse cx="245" cy="90" rx="180" ry="68" className="fill-blue-100/60 stroke-blue-400" strokeWidth="1.5" />
                <text x="85" y="50" className="text-[11px] font-black fill-blue-700">Sokszögek</text>

                {/* 3. Négyszögek */}
                <ellipse cx="265" cy="95" rx="145" ry="56" className="fill-emerald-100/60 stroke-emerald-500" strokeWidth="1.5" />
                <text x="140" y="65" className="text-[11px] font-black fill-emerald-800">Négyszögek</text>

                {/* 4. Téglalapok */}
                <ellipse cx="285" cy="100" rx="105" ry="44" className="fill-amber-100/70 stroke-amber-500" strokeWidth="1.5" />
                <text x="200" y="80" className="text-[11px] font-black fill-amber-900">Téglalapok</text>

                {/* 5. Négyzetek (legbelső) */}
                <ellipse cx="310" cy="105" rx="60" ry="30" className="fill-rose-200 stroke-rose-600" strokeWidth="2" />
                <text x="310" y="110" textAnchor="middle" className="text-[11px] font-black fill-rose-950">Négyzetek</text>
              </svg>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                <span><strong>Négyzetek ⊆ Téglalapok:</strong> Minden négyzet téglalap (mert 4 oldala és 4 derékszöge van).</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <span><strong>Téglalapok ⊆ Négyszögek:</strong> Minden téglalap négyszög (mert pontosan 4 oldala van).</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span><strong>Négyszögek ⊆ Sokszögek:</strong> Minden négyszög sokszög (egyenes szakaszok határolják).</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                <span><strong>Sokszögek ⊆ Síkidomok:</strong> Minden sokszög lapos, 2D kiterjedésű síkbeli alakzat.</span>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 5. SZEKCIÓ: GYAKORI CSAPDÁK ÉS TÉVHITEK A HALMAZOKNÁL */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-sets-traps"
        number={5}
        title="Gyakori tévhitek és csapdák a halmazoknál"
        badge="Mire figyelj nagyon?"
        badgeColor="rose"
      >
        <TheoryTrapBox
          title="Gyakori csapdák & tipikus tévhitek a halmazok témakörében"
          traps={[
            {
              title: '1. Csapda: A részhalmaz-mondatok megfordítása („Minden téglalap négyzet”?)',
              wrong: 'Azt mondani, hogy „mivel a négyzetek téglalapok, ezért minden téglalap négyzet is”.',
              correct: 'Minden négyzet téglalap, de NEM minden téglalap négyzet! Csak azok a téglalapok négyzetek, amelyeknek minden oldala egyenlő hosszúságú.',
              explanation: 'A részhalmaz reláció nem fordítható meg: a kutyák állatok, de nem minden állat kutya!'
            },
            {
              title: '2. Csapda: Üres halmaz (∅) vs. a nullát tartalmazó halmaz ({0})',
              wrong: 'Azt hinni, hogy a ∅ (üres halmaz) és a {0} halmaz ugyanaz.',
              correct: 'A ∅ üres halmaznak egyáltalán nincs eleme (|∅| = 0). A {0} halmaznak van 1 eleme: a 0 szám (|{0}| = 1)!',
              explanation: 'Egy üres doboz más, mint egy doboz, amiben egy 0 feliratú kártya lapul.'
            },
            {
              title: '3. Csapda: A metszet (∩) és az unió (∪) jeleinek felcserélése',
              wrong: 'Összekeverni a felfelé (∪) és lefelé (∩) mutató jeleket a feladatokban.',
              correct: '∩ = Metszet (lefelé nyíló kapu/tető: csak a mindkettő alá beférő közös elemek). ∪ = Unió (felfelé nyitott kupa/tálka: mindent beleöntünk).',
              explanation: 'Jegyezd meg: az Unió jele U alakú, mint az „Unió” szó első betűje!'
            },
            {
              title: '4. Csapda: Elemek duplázása és a sorrend túlbecsülése',
              wrong: 'Azt hinni, hogy a {Kör, Négyzet} és a {Négyzet, Kör} két különböző halmaz, vagy hogy a {Kör, Kör} 2 elemből áll.',
              correct: 'A halmazban a sorrend és az ismétlődés egyáltalán NEM számít: {Kör, Négyzet} = {Négyzet, Kör}, és minden elem csak egyszer számít.',
              explanation: 'Egy halmaz egyszerűen megadja, hogy mi van benne: a tagság nem függ a leírás sorrendjétől.'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SetsTheory;
