import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  GeometryFigureGrid,
  FormulaFigureCard,
  GeometrySvgFrame,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Compass,
  Shapes,
  Maximize2,
  Box,
  Target,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Ruler,
  Check,
  X,
  HelpCircle,
  Pencil
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface TriangleCongruenceTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

type CongruenceCase = 'sss' | 'sas' | 'asa' | 'ssa';

export const TriangleCongruenceTheory: React.FC<TriangleCongruenceTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // State for interactive Congruence Case Visualizer
  const [activeCase, setActiveCase] = useState<CongruenceCase>('sss');

  return (
    <TheoryTemplate
      badgeText="7. OSZTÁLY • VII. GEOMETRIA • 📖 1. LECKE"
      title="1. Egybevágó háromszögek, szerkesztések"
      subtitle="Ismerd meg az alakzatok egybevágóságának fogalmát, a háromszögek egybevágóságának 4 alapesetét és az egyértelmű szerkesztés lépéseit körzővel és vonalzóval!"
      themeColor="teal"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      pdfFilename="7_osztaly_1_egybevago_haromszogek_szerkesztesek.pdf"
      quickRule={{
        label: 'A 4 Egybevágósági Alapeset',
        formula: 'o-o-o (SSS) • o-sz-o (SAS) • sz-o-sz (ASA) • o-o-sz (SsA)'
      }}
    >
      {/* 1. FEJEZET: AZ EGYBEVÁGÓSÁG FOGALMA */}
      <TheorySection
        number={1}
        title="Az egybevágóság fogalma és alaptulajdonságai"
        icon={<Shapes className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badge="ALAPFOGALOM"
        badgeColor="teal"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-7 space-y-3">
            <TheoryCard
              title="Mikor egybevágó két síkidom?"
              variant="teal"
            >
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Két geometriai alakzatot (pl. két háromszöget) <strong>egybevágónak</strong> nevezünk, ha létezik olyan egybevágósági transzformáció (tengelyes tükrözés, középpontos tükrözés, elforgatás, eltolás vagy ezek egymásutánja), amely az egyik alakzatot <strong>pontról pontra átviszi a másikba</strong>.
              </p>
              <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200 font-mono font-bold text-xs sm:text-sm">
                Jelölés: <MathText>{"\\Delta ABC \\cong \\Delta A'B'C'"}</MathText>
              </div>
            </TheoryCard>

            <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Egybevágó háromszögekben feltétlenül megegyezik:</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <li className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  <span><strong>Megfelelő oldalak:</strong> <MathText>a = a', b = b', c = c'</MathText></span>
                </li>
                <li className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  <span><strong>Megfelelő szögek:</strong> <MathText>{"\\alpha = \\alpha', \\beta = \\beta', \\gamma = \\gamma'"}</MathText></span>
                </li>
                <li className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span><strong>Kerület:</strong> <MathText>K = K'</MathText></span>
                </li>
                <li className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span><strong>Terület:</strong> <MathText>T = T'</MathText></span>
                </li>
              </ul>
            </div>
          </div>

          {/* SVG Illustration: Congruent triangles with rotation & translation */}
          <div className="md:col-span-5">
            <GeometrySvgFrame
              caption="ΔABC és a forgatással-eltolással létrejött ΔA'B'C' egybevágó: oldalaik és szögeik páronként egyenlők."
              badge="EGYBEVÁGÓ HÁROMSZÖGEK"
              grid={true}
              minHeight="min-h-[190px]"
            >
              <svg viewBox="0 0 280 150" className="w-full h-auto max-h-[170px]">
                {/* Triangle 1: ABC */}
                <g className="transition-all">
                  <polygon
                    points="35,120 115,120 75,35"
                    className="fill-teal-500/20 stroke-teal-600 dark:stroke-teal-400 stroke-2"
                  />
                  {/* Angle arcs */}
                  <path d="M 50,120 A 15,15 0 0,0 43,105" fill="none" className="stroke-amber-500 stroke-[1.5]" />
                  <path d="M 100,120 A 15,15 0 0,1 107,105" fill="none" className="stroke-blue-500 stroke-[1.5]" />
                  <path d="M 68,50 A 15,15 0 0,0 82,50" fill="none" className="stroke-rose-500 stroke-[1.5]" />

                  {/* Vertices */}
                  <circle cx="35" cy="120" r="3" className="fill-teal-700 dark:fill-teal-300" />
                  <circle cx="115" cy="120" r="3" className="fill-teal-700 dark:fill-teal-300" />
                  <circle cx="75" cy="35" r="3" className="fill-teal-700 dark:fill-teal-300" />

                  {/* Labels */}
                  <text x="22" y="132" className="text-[11px] font-black fill-slate-700 dark:fill-slate-200">A</text>
                  <text x="122" y="132" className="text-[11px] font-black fill-slate-700 dark:fill-slate-200">B</text>
                  <text x="75" y="24" textAnchor="middle" className="text-[11px] font-black fill-slate-700 dark:fill-slate-200">C</text>

                  {/* Side hash marks */}
                  <line x1="72" y1="117" x2="72" y2="123" className="stroke-slate-700 dark:stroke-slate-200 stroke-[1.5]" />
                  <line x1="77" y1="117" x2="77" y2="123" className="stroke-slate-700 dark:stroke-slate-200 stroke-[1.5]" />
                  <line x1="75" y1="134" x2="75" y2="134" textAnchor="middle" className="text-[10px] font-bold fill-teal-700">c</line>
                </g>

                {/* Congruence symbol in center */}
                <g>
                  <circle cx="140" cy="75" r="16" className="fill-white dark:fill-slate-800 stroke-teal-300 dark:stroke-teal-700 stroke-1 shadow-xs" />
                  <text x="140" y="81" textAnchor="middle" className="text-base font-black fill-teal-600 dark:fill-teal-400">≅</text>
                </g>

                {/* Triangle 2: A'B'C' (Rotated and translated) */}
                <g transform="translate(170, 20) rotate(35, 45, 60)">
                  <polygon
                    points="10,105 90,105 50,20"
                    className="fill-indigo-500/20 stroke-indigo-600 dark:stroke-indigo-400 stroke-2"
                  />
                  {/* Angle arcs */}
                  <path d="M 25,105 A 15,15 0 0,0 18,90" fill="none" className="stroke-amber-500 stroke-[1.5]" />
                  <path d="M 75,105 A 15,15 0 0,1 82,90" fill="none" className="stroke-blue-500 stroke-[1.5]" />
                  <path d="M 43,35 A 15,15 0 0,0 57,35" fill="none" className="stroke-rose-500 stroke-[1.5]" />

                  {/* Vertices */}
                  <circle cx="10" cy="105" r="3" className="fill-indigo-700 dark:fill-indigo-300" />
                  <circle cx="90" cy="105" r="3" className="fill-indigo-700 dark:fill-indigo-300" />
                  <circle cx="50" cy="20" r="3" className="fill-indigo-700 dark:fill-indigo-300" />

                  {/* Labels */}
                  <text x="-2" y="117" className="text-[11px] font-black fill-slate-700 dark:fill-slate-200">A'</text>
                  <text x="96" y="117" className="text-[11px] font-black fill-slate-700 dark:fill-slate-200">B'</text>
                  <text x="50" y="10" textAnchor="middle" className="text-[11px] font-black fill-slate-700 dark:fill-slate-200">C'</text>
                </g>
              </svg>
            </GeometrySvgFrame>
          </div>
        </div>
      </TheorySection>

      {/* 2. FEJEZET: A HÁROMSZÖGEK EGYBEVÁGÓSÁGÁNAK 4 ALAPESETE */}
      <TheorySection
        number={2}
        title="A háromszögek egybevágóságának 4 alapesete"
        icon={<Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="TÉTELEK"
        badgeColor="indigo"
      >
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Nem szükséges mind a 6 adatot (3 oldal, 3 szög) ellenőrizni! Az alábbi 4 eset bármelyike már <strong>egyértelműen garantálja</strong> az egybevágóságot:
        </p>

        {/* 4 Cards Grid with Clean Geometry Diagrams */}
        <GeometryFigureGrid columns={4}>
          {/* 1. eset: SSS (o-o-o) */}
          <GeometryFigureCard
            title="1. o-o-o (SSS)"
            subtitle="Oldal - Oldal - Oldal"
            badge="1. ESET"
            variant="teal"
            formula="a = a',  b = b',  c = c'"
            properties={[
              'Mindhárom oldal páronként egyenlő hosszúságú.',
              'Feltétel: a háromszög-egyenlőtlenség teljesülése (a+b>c).'
            ]}
          >
            <svg viewBox="0 0 160 100" className="w-full h-auto max-h-[85px]">
              <polygon points="20,80 140,80 75,20" className="fill-teal-500/15 stroke-teal-600 dark:stroke-teal-400 stroke-2" />
              {/* Hash marks on sides */}
              {/* Base c: 1 mark */}
              <line x1="80" y1="77" x2="80" y2="83" className="stroke-teal-800 dark:stroke-teal-200 stroke-[2]" />
              {/* Side a (right): 2 marks */}
              <line x1="105" y1="48" x2="111" y2="52" className="stroke-teal-800 dark:stroke-teal-200 stroke-[2]" />
              <line x1="108" y1="45" x2="114" y2="49" className="stroke-teal-800 dark:stroke-teal-200 stroke-[2]" />
              {/* Side b (left): 3 marks */}
              <line x1="44" y1="47" x2="50" y2="51" className="stroke-teal-800 dark:stroke-teal-200 stroke-[2]" />
              <line x1="47" y1="50" x2="53" y2="54" className="stroke-teal-800 dark:stroke-teal-200 stroke-[2]" />
              <line x1="50" y1="53" x2="56" y2="57" className="stroke-teal-800 dark:stroke-teal-200 stroke-[2]" />

              <text x="80" y="94" textAnchor="middle" className="text-[10px] font-black fill-teal-700">c</text>
              <text x="35" y="45" className="text-[10px] font-black fill-teal-700">b</text>
              <text x="120" y="45" className="text-[10px] font-black fill-teal-700">a</text>
            </svg>
          </GeometryFigureCard>

          {/* 2. eset: SAS (o-sz-o) */}
          <GeometryFigureCard
            title="2. o-sz-o (SAS)"
            subtitle="Oldal - Szög - Oldal"
            badge="2. ESET"
            variant="blue"
            formula="a = a',  b = b',  γ = γ'"
            properties={[
              'Két oldal és a KÖZBEZÁRT szögük páronként egyenlő.',
              'Kulcs: a szögnek a két megadott oldal között KELL lennie!'
            ]}
          >
            <svg viewBox="0 0 160 100" className="w-full h-auto max-h-[85px]">
              <polygon points="20,80 140,80 60,25" className="fill-blue-500/15 stroke-blue-600 dark:stroke-blue-400 stroke-2" />
              {/* Highlighted sides b and a */}
              <line x1="20" y1="80" x2="60" y2="25" className="stroke-blue-600 stroke-[3.5]" />
              <line x1="60" y1="25" x2="140" y2="80" className="stroke-blue-600 stroke-[3.5]" />
              {/* Included angle arc at C (60,25) */}
              <path d="M 48,42 A 18,18 0 0,0 75,35" fill="none" className="stroke-amber-500 stroke-[2.5]" />
              <circle cx="60" cy="25" r="3" className="fill-amber-500" />
              <text x="60" y="52" textAnchor="middle" className="text-[10px] font-black fill-amber-600">γ</text>
              <text x="25" y="45" className="text-[10px] font-bold fill-blue-700">b</text>
              <text x="110" y="45" className="text-[10px] font-bold fill-blue-700">a</text>
              <text x="80" y="93" textAnchor="middle" className="text-[9px] fill-slate-400">c (harmadik)</text>
            </svg>
          </GeometryFigureCard>

          {/* 3. eset: ASA (sz-o-sz) */}
          <GeometryFigureCard
            title="3. sz-o-sz (ASA)"
            subtitle="Szög - Oldal - Szög"
            badge="3. ESET"
            variant="indigo"
            formula="c = c',  α = α',  β = β'"
            properties={[
              'Egy oldal és a rajta fekvő KÉT szög páronként egyenlő.',
              'Feltétel: α + β < 180° (belső szögek összege 180°).'
            ]}
          >
            <svg viewBox="0 0 160 100" className="w-full h-auto max-h-[85px]">
              <polygon points="25,80 135,80 85,25" className="fill-indigo-500/15 stroke-indigo-600 dark:stroke-indigo-400 stroke-2" />
              {/* Base c highlighted */}
              <line x1="25" y1="80" x2="135" y2="80" className="stroke-indigo-600 stroke-[3.5]" />
              {/* Angles alpha at A and beta at B */}
              <path d="M 45,80 A 20,20 0 0,0 37,63" fill="none" className="stroke-amber-500 stroke-[2.5]" />
              <path d="M 115,80 A 20,20 0 0,1 123,66" fill="none" className="stroke-rose-500 stroke-[2.5]" />
              <text x="48" y="74" className="text-[10px] font-black fill-amber-600">α</text>
              <text x="106" y="74" className="text-[10px] font-black fill-rose-600">β</text>
              <text x="80" y="94" textAnchor="middle" className="text-[10px] font-black fill-indigo-700">c (adott oldal)</text>
            </svg>
          </GeometryFigureCard>

          {/* 4. eset: SsA (o-o-sz) */}
          <GeometryFigureCard
            title="4. o-o-sz (SsA)"
            subtitle="Oldal - Oldal - Szög"
            badge="4. ESET"
            variant="emerald"
            formula="a = a',  b = b',  α = α'  (a ≥ b)"
            properties={[
              'Két oldal és a NAGYOBBIK oldallal szemközti szög egyenlő.',
              'Kritikus: ha a kisebbikkel szemközti adott, 2 háromszög is lehet!'
            ]}
          >
            <svg viewBox="0 0 160 100" className="w-full h-auto max-h-[85px]">
              <polygon points="20,80 145,80 50,25" className="fill-emerald-500/15 stroke-emerald-600 dark:stroke-emerald-400 stroke-2" />
              {/* Sides b (short) and a (long) */}
              <line x1="20" y1="80" x2="50" y2="25" className="stroke-emerald-600 stroke-[2.5]" />
              <line x1="50" y1="25" x2="145" y2="80" className="stroke-emerald-600 stroke-[4]" />
              {/* Angle alpha opposite to larger side 'a' */}
              <path d="M 40,80 A 20,20 0 0,0 31,62" fill="none" className="stroke-amber-500 stroke-[2.5]" />
              <text x="44" y="74" className="text-[10px] font-black fill-amber-600">α</text>
              <text x="22" y="47" className="text-[9px] font-bold fill-emerald-800">b (kisebb)</text>
              <text x="105" y="45" className="text-[10px] font-black fill-emerald-800">a (nagyobb!)</text>
            </svg>
          </GeometryFigureCard>
        </GeometryFigureGrid>

        {/* Interactive Congruence Case Visualizer Studio */}
        <Card className="rounded-3xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-900/50 mt-4">
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-teal-600" />
                  <span>Interaktív Eset-Bemutató Stúdió</span>
                </h3>
                <p className="text-xs text-slate-500">Kattints a gombokra, és nézd meg az adott eset kiemelt elemeit!</p>
              </div>

              {/* Selector buttons */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                {(['sss', 'sas', 'asa', 'ssa'] as CongruenceCase[]).map((cKey) => {
                  const labels: Record<CongruenceCase, string> = {
                    sss: 'o-o-o (SSS)',
                    sas: 'o-sz-o (SAS)',
                    asa: 'sz-o-sz (ASA)',
                    ssa: 'o-o-sz (SsA)'
                  };
                  const isSelected = activeCase === cKey;
                  return (
                    <button
                      key={cKey}
                      type="button"
                      onClick={() => setActiveCase(cKey)}
                      className={cn(
                        'px-2.5 sm:px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer',
                        isSelected
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700'
                      )}
                    >
                      {labels[cKey]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Display Pane */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-7 space-y-2.5">
                {activeCase === 'sss' && (
                  <div className="space-y-2 animate-in fade-in duration-200">
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 text-xs font-black">
                      o-o-o ESET (Oldal - Oldal - Oldal)
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      Ha két háromszögnek mindhárom oldala páronként egyenlő, akkor a két háromszög egybevágó.
                      A szerkesztéskor az alapszakasz felmérése után a két végpontból körívezünk a megadott sugarakkal; ezek metszéspontja adja a 3. csúcsot.
                    </p>
                    <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 text-xs font-semibold text-teal-900 dark:text-teal-200">
                      💡 <strong>Feltétel:</strong> Bármely két oldal összege nagyobb kell legyen a harmadiknál: <MathText>a + b &gt; c, a + c &gt; b, b + c &gt; a</MathText>.
                    </div>
                  </div>
                )}

                {activeCase === 'sas' && (
                  <div className="space-y-2 animate-in fade-in duration-200">
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-xs font-black">
                      o-sz-o ESET (Oldal - Szög - Oldal)
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      Ha két háromszögnek két oldala és a <strong>közbezárt szögük</strong> páronként egyenlő, akkor a két háromszög egybevágó.
                      A szög "rögzíti" a két oldal által bezárt nyílást, így a harmadik oldal hossza és a többi szög már automatikusan meghatározott!
                    </p>
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 text-xs font-semibold text-blue-900 dark:text-blue-200">
                      ⚠️ <strong>Vigyázat:</strong> Ha a megadott szög NEM a két oldal között van, akkor az nem ez az eset, hanem az o-o-sz eset!
                    </div>
                  </div>
                )}

                {activeCase === 'asa' && (
                  <div className="space-y-2 animate-in fade-in duration-200">
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 text-xs font-black">
                      sz-o-sz ESET (Szög - Oldal - Szög)
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      Ha két háromszögnek egy oldala és a <strong>rajta fekvő két szöge</strong> páronként egyenlő, akkor a két háromszög egybevágó.
                      Mivel a háromszög belső szögeinek összege mindig 180°, ezért két szög ismeretében a harmadik szög is azonnal adott: <MathText>{"\\gamma = 180^\\circ - (\\alpha + \\beta)"}</MathText>.
                    </p>
                    <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 text-xs font-semibold text-indigo-900 dark:text-indigo-200">
                      💡 <strong>Feltétel:</strong> A két megadott szög összege szigorúan kisebb kell legyen 180°-nál!
                    </div>
                  </div>
                )}

                {activeCase === 'ssa' && (
                  <div className="space-y-2 animate-in fade-in duration-200">
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-black">
                      o-o-sz ESET (Oldal - Oldal - Szög a nagyobbikkal szemben)
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      Ha két háromszögnek két oldala és a <strong>nagyobbik oldallal szemközti szöge</strong> páronként egyenlő, akkor egybevágók.
                      Azért kötelező a nagyobbik oldal, mert a szerkesztés során a körív így pontosan egyetlen pontban metszi a másik szögszárat a pozitív félegyenesen!
                    </p>
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                      🛑 <strong>Miért fontos?</strong> Ha a kisebbikkel szemközti szög lenne adva, a körív két pontban is metszhetné a szögszárat (két különböző megoldás lenne).
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic SVG Studio Canvas */}
              <div className="md:col-span-5 flex items-center justify-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 min-h-[170px] shadow-inner">
                <svg viewBox="0 0 240 140" className="w-full h-auto max-h-[150px]">
                  {/* Base Triangle Polygon */}
                  <polygon
                    points="30,115 210,115 110,25"
                    className="fill-slate-100/60 dark:fill-slate-800/40 stroke-slate-300 dark:stroke-slate-700 stroke-2"
                  />

                  {/* SSS Highlight */}
                  {activeCase === 'sss' && (
                    <g>
                      <line x1="30" y1="115" x2="210" y2="115" className="stroke-teal-600 stroke-[4]" />
                      <line x1="30" y1="115" x2="110" y2="25" className="stroke-blue-600 stroke-[4]" />
                      <line x1="110" y1="25" x2="210" y2="115" className="stroke-indigo-600 stroke-[4]" />
                      <text x="120" y="128" textAnchor="middle" className="text-[11px] font-black fill-teal-700">c (adott)</text>
                      <text x="50" y="65" className="text-[11px] font-black fill-blue-700">b (adott)</text>
                      <text x="175" y="65" className="text-[11px] font-black fill-indigo-700">a (adott)</text>
                    </g>
                  )}

                  {/* SAS Highlight */}
                  {activeCase === 'sas' && (
                    <g>
                      <line x1="30" y1="115" x2="110" y2="25" className="stroke-blue-600 stroke-[4]" />
                      <line x1="110" y1="25" x2="210" y2="115" className="stroke-indigo-600 stroke-[4]" />
                      <path d="M 94,43 A 22,22 0 0,0 128,41" fill="none" className="stroke-amber-500 stroke-[3.5]" />
                      <circle cx="110" cy="25" r="4" className="fill-amber-500" />
                      <text x="110" y="58" textAnchor="middle" className="text-xs font-black fill-amber-600">γ (közbezárt)</text>
                      <text x="50" y="65" className="text-[11px] font-black fill-blue-700">b</text>
                      <text x="175" y="65" className="text-[11px] font-black fill-indigo-700">a</text>
                    </g>
                  )}

                  {/* ASA Highlight */}
                  {activeCase === 'asa' && (
                    <g>
                      <line x1="30" y1="115" x2="210" y2="115" className="stroke-indigo-600 stroke-[4]" />
                      <path d="M 55,115 A 25,25 0 0,0 46,93" fill="none" className="stroke-amber-500 stroke-[3.5]" />
                      <path d="M 185,115 A 25,25 0 0,1 195,95" fill="none" className="stroke-rose-500 stroke-[3.5]" />
                      <circle cx="30" cy="115" r="4" className="fill-amber-500" />
                      <circle cx="210" cy="115" r="4" className="fill-rose-500" />
                      <text x="60" y="108" className="text-xs font-black fill-amber-600">α</text>
                      <text x="170" y="108" className="text-xs font-black fill-rose-600">β</text>
                      <text x="120" y="129" textAnchor="middle" className="text-[11px] font-black fill-indigo-700">c (közös oldal)</text>
                    </g>
                  )}

                  {/* SsA Highlight */}
                  {activeCase === 'ssa' && (
                    <g>
                      <line x1="30" y1="115" x2="110" y2="25" className="stroke-emerald-600 stroke-[3]" />
                      <line x1="110" y1="25" x2="210" y2="115" className="stroke-emerald-600 stroke-[5]" />
                      <path d="M 55,115 A 25,25 0 0,0 46,93" fill="none" className="stroke-amber-500 stroke-[3.5]" />
                      <circle cx="30" cy="115" r="4" className="fill-amber-500" />
                      <text x="60" y="108" className="text-xs font-black fill-amber-600">α</text>
                      <text x="45" y="65" className="text-[10px] font-bold fill-emerald-800">b (kisebb)</text>
                      <text x="170" y="65" className="text-[11px] font-black fill-emerald-800">a (nagyobb!)</text>
                      <line x1="30" y1="115" x2="210" y2="115" className="stroke-slate-400 stroke-[1.5] stroke-dasharray-[3,3]" />
                    </g>
                  )}

                  {/* Vertices */}
                  <circle cx="30" cy="115" r="3" className="fill-slate-800 dark:fill-slate-100" />
                  <circle cx="210" cy="115" r="3" className="fill-slate-800 dark:fill-slate-100" />
                  <circle cx="110" cy="25" r="3" className="fill-slate-800 dark:fill-slate-100" />
                  <text x="18" y="125" className="text-[11px] font-black fill-slate-700 dark:fill-slate-300">A</text>
                  <text x="218" y="125" className="text-[11px] font-black fill-slate-700 dark:fill-slate-300">B</text>
                  <text x="110" y="15" textAnchor="middle" className="text-[11px] font-black fill-slate-700 dark:fill-slate-300">C</text>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </TheorySection>

      {/* 3. FEJEZET: GYAKORI TÉVHITEK ÉS NEM-EGYBEVÁGÓSÁGI ESETEK */}
      <TheorySection
        number={3}
        title="Tipikus tévhitek: miért NEM alapeset a sz-sz-sz (AAA) és a hibás o-o-sz?"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="CSAPDÁK"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {/* Trap 1: AAA is similarity, NOT congruence */}
          <TheoryTrapBox
            title="1. Csapda: sz-sz-sz (AAA) NEM egybevágósági eset!"
            trap="Három szög egyenlősége még NEM garantálja, hogy a háromszögek egybevágók!"
            wrong="Ha α = α', β = β', γ = γ', akkor a két háromszög feltétlenül egybevágó."
            wrongExplanation="Tévhit: a szögek csak a háromszög ALAKJÁT határozzák meg, a MÉRETÉT nem! Két háromszög lehet kicsinyített és nagyított másolat is (hasonlóak, de nem egybevágók)."
            correct="Csak akkor egybevágók, ha legalább egy megfelelő oldaluk is egyenlő (sz-o-sz eset)."
            correctExplanation="Ha csak 3 szög van megadva, a háromszögek HASONLÓAK, de a méretük tetszőleges lehet!"
          />

          {/* SVG comparison for AAA showing scaled triangles */}
          <GeometryFigureCard
            title="Szemléltetés: sz-sz-sz (AAA) = Hasonlóság, NEM egybevágóság!"
            badge="AAA ≠ EGYBEVÁGÓ"
            variant="rose"
          >
            <svg viewBox="0 0 240 120" className="w-full h-auto max-h-[105px]">
              {/* Small triangle */}
              <polygon points="20,100 80,100 50,45" className="fill-rose-500/20 stroke-rose-600 stroke-2" />
              <text x="50" y="85" textAnchor="middle" className="text-[9px] font-bold fill-rose-700">Kicsi Δ</text>
              <text x="50" y="112" textAnchor="middle" className="text-[8px] fill-slate-500">60°, 60°, 60°</text>

              {/* Big triangle (same angles!) */}
              <polygon points="120,100 220,100 170,10" className="fill-rose-500/10 stroke-rose-600 stroke-2" />
              <text x="170" y="70" textAnchor="middle" className="text-[10px] font-bold fill-rose-700">Nagy Δ</text>
              <text x="170" y="112" textAnchor="middle" className="text-[8px] fill-slate-500">60°, 60°, 60°</text>

              {/* Not equal symbol */}
              <text x="100" y="75" textAnchor="middle" className="text-xl font-black fill-rose-600">≇</text>
            </svg>
          </GeometryFigureCard>
        </div>

        {/* Trap 2: SsA with smaller side creates 2 triangles */}
        <div className="pt-2">
          <TheoryCallout
            type="warning"
            title="2. Csapda: o-o-sz esetében miért KÖTELEZŐ a NAGYOBBIK oldallal szemközti szög?"
          >
            Ha két oldal és a <strong>kisebbikkel</strong> szemközti szög van adva, akkor a körzővel rajzolt körív a szemközti szárat <strong>két pontban is metszheti</strong>, vagy egyáltalán el sem éri!
            Ez azt jelenti, hogy <strong>két teljesen különböző (nem egybevágó) háromszög is létezhet</strong> ugyanazokkal az adatokkal!
            Ezért a tétel csak akkor érvényes, ha a szög a <strong>nagyobbik oldallal</strong> néz szembe ($a \ge b$).
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 4. FEJEZET: SZERKESZTÉSEK KÖRZŐVEL ÉS VONALZÓVAL */}
      <TheorySection
        number={4}
        title="Szerkesztések körzővel és vonalzóval: A 4 kötelező lépés"
        icon={<Ruler className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badge="SZERKESZTÉS"
        badgeColor="teal"
      >
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          A geometriai feladatok megoldásakor a szerkesztés nem egyszerű rajzolás, hanem logikai folyamat. Minden szerkesztést az alábbi <strong>4 kötelező lépésben</strong> végzünk el:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {/* Step 1 */}
          <div className="p-3.5 rounded-2xl border-2 border-teal-200 dark:border-teal-900/60 bg-white dark:bg-slate-850 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-lg bg-teal-600 text-white font-black text-xs flex items-center justify-center">1</span>
              <span className="text-[10px] font-black uppercase text-teal-700 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">VÁZLAT</span>
            </div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">Vázlatkészítés</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Szabadkézi háromszög rajzolása. Az <strong>adott adatokat színessel</strong> kihúzzuk (oldalak, szögek), a keresetteket megjelöljük.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-3.5 rounded-2xl border-2 border-blue-200 dark:border-blue-900/60 bg-white dark:bg-slate-850 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">2</span>
              <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">TERV</span>
            </div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">Szerkesztési terv</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A szerkesztési lépések <strong>szöveges és logikai sorrendje</strong> (pl. 1. felveszem az AB szakaszt; 2. körívezek A-ból; 3. körívezek B-ből; 4. metszéspont C).
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-3.5 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-white dark:bg-slate-850 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center">3</span>
              <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">KIVITELEZÉS</span>
            </div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">Pontos szerkesztés</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Pontos rajzolás <strong>kizárólag körzővel és vonalzóval</strong>. A szerkesztési segédköríveket tilos kiradírozni!
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-3.5 rounded-2xl border-2 border-purple-200 dark:border-purple-900/60 bg-white dark:bg-slate-850 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center">4</span>
              <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded">ELEMZÉS</span>
            </div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">Diszkusszió</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Megvizsgáljuk, hogy a megadott adatokkal <strong>létezik-e megoldás</strong>, és <strong>hány egybevágó háromszög</strong> szerkeszthető a síkban.
            </p>
          </div>
        </div>

        {/* Compass construction illustration with SVG */}
        <div className="pt-4 flex justify-center">
          <div className="w-full max-w-[460px]">
            <GeometryFigureCard
              title="Példa: Háromszög szerkesztése 3 megadott oldalból (o-o-o eset)"
              subtitle="a = 5 cm, b = 4 cm, c = 6 cm adatokkal körzővel és vonalzóval"
              badge="KÖRZŐS SZERKESZTÉS"
              variant="teal"
              grid={true}
              figureHeight="min-h-[145px]"
            >
              <svg viewBox="0 0 300 165" className="w-full h-auto max-h-[145px] max-w-[320px] mx-auto">
                {/* Baseline AB = c = 6 cm */}
                <line x1="70" y1="135" x2="230" y2="135" className="stroke-teal-600 dark:stroke-teal-400 stroke-[3]" />
                <circle cx="70" cy="135" r="3.5" className="fill-teal-700 dark:fill-teal-300" />
                <circle cx="230" cy="135" r="3.5" className="fill-teal-700 dark:fill-teal-300" />
                <text x="58" y="140" className="text-[11px] font-black fill-slate-800 dark:fill-slate-200">A</text>
                <text x="238" y="140" className="text-[11px] font-black fill-slate-800 dark:fill-slate-200">B</text>
                <text x="150" y="152" textAnchor="middle" className="text-[10px] font-bold fill-teal-700 dark:fill-teal-300">c = 6 cm</text>

                {/* Compass arc from A with radius b = 4cm (exact radius 106.7px) */}
                <path
                  d="M 103,34 A 106.7,106.7 0 0,1 154,69"
                  fill="none"
                  className="stroke-blue-400 dark:stroke-blue-400 stroke-[1.5] stroke-dasharray-[3,3]"
                />
                <text x="96" y="26" textAnchor="end" className="text-[9px] fill-blue-600 dark:fill-blue-400 font-bold">k₁(A, r=4 cm)</text>

                {/* Compass arc from B with radius a = 5cm (exact radius 133.3px) */}
                <path
                  d="M 163,20 A 133.3,133.3 0 0,0 106,85"
                  fill="none"
                  className="stroke-indigo-400 dark:stroke-indigo-400 stroke-[1.5] stroke-dasharray-[3,3]"
                />
                <text x="168" y="18" textAnchor="start" className="text-[9px] fill-indigo-600 dark:fill-indigo-400 font-bold">k₂(B, r=5 cm)</text>

                {/* Intersection point C at exact coordinates (130, 46.8) */}
                <circle cx="130" cy="46.8" r="4.5" className="fill-rose-600 stroke-white dark:stroke-slate-900 stroke-2 shadow-xs" />
                <text x="130" y="37" textAnchor="middle" className="text-[11px] font-black fill-rose-600">C (metszéspont)</text>

                {/* Completed sides AC and BC */}
                <line x1="70" y1="135" x2="130" y2="46.8" className="stroke-blue-600 dark:stroke-blue-400 stroke-[2.5]" />
                <line x1="230" y1="135" x2="130" y2="46.8" className="stroke-indigo-600 dark:stroke-indigo-400 stroke-[2.5]" />
                <text x="86" y="87" textAnchor="end" className="text-[10px] font-bold fill-blue-700 dark:fill-blue-300">b = 4 cm</text>
                <text x="194" y="87" textAnchor="start" className="text-[10px] font-bold fill-indigo-700 dark:fill-indigo-300">a = 5 cm</text>
              </svg>
            </GeometryFigureCard>
          </div>
        </div>
      </TheorySection>

      {/* 5. FEJEZET: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        number={5}
        title="Összefoglaló táblázat: Az egybevágóság esetei és szerkeszthetősége"
        icon={<Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="ÖSSZEFOGLALÁS"
        badgeColor="indigo"
      >
        <TheoryTable
          title="A 4 Egybevágósági Alapeset gyors áttekintése"
          headers={['Rövidítés', 'Megnevezés', 'Ismert adatok', 'Kulcsfeltétel', 'Egyértelmű szerkesztés?']}
          rows={[
            [
              <strong>o-o-o (SSS)</strong>,
              'Három oldal',
              'a, b, c oldalak',
              'a + b > c, a + c > b, b + c > a (háromszög-egyenlőtlenség)',
              <span className="font-bold text-emerald-600 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Igen, 1 megoldás</span>
            ],
            [
              <strong>o-sz-o (SAS)</strong>,
              'Két oldal és közbezárt szög',
              'a, b és γ szög',
              'A szögnek pontosan a két oldal között kell feküdnie!',
              <span className="font-bold text-emerald-600 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Igen, 1 megoldás</span>
            ],
            [
              <strong>sz-o-sz (ASA)</strong>,
              'Egy oldal és rajta fekvő két szög',
              'c oldal és α, β szögek',
              'α + β < 180° (belső szögek összege)',
              <span className="font-bold text-emerald-600 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Igen, 1 megoldás</span>
            ],
            [
              <strong>o-o-sz (SsA)</strong>,
              'Két oldal és a nagyobbikkal szemközti szög',
              'a, b és α szög',
              'A szög a NAGYOBB oldallal néz szembe (a ≥ b)',
              <span className="font-bold text-emerald-600 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Igen, 1 megoldás</span>
            ],
            [
              <span className="text-rose-600 font-bold">sz-sz-sz (AAA)</span>,
              'Három szög',
              'α, β, γ szögek',
              'NEM egybevágósági eset! (Csak hasonlóság)',
              <span className="font-bold text-rose-600 flex items-center gap-1"><X className="w-3.5 h-3.5" /> Nem (végtelen sok méret)</span>
            ]
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default TriangleCongruenceTheory;
