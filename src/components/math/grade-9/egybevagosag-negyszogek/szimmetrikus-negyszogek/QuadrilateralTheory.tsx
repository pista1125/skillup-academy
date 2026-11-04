import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import {
  QuadrilateralHierarchySvg,
  QuadrilateralDiagonalsSvg,
  CyclicTangentialSvg
} from './QuadrilateralFigures';
import {
  Boxes,
  Split,
  CircleDot,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';

interface QuadrilateralTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

type QuadType = 'trapezoid' | 'isosceles-trapezoid' | 'parallelogram' | 'rhombus' | 'rectangle' | 'square' | 'kite';

export const QuadrilateralTheory: React.FC<QuadrilateralTheoryProps> = ({
  onBack,
  onStartQuiz,
  topicId = 'g9-trans-negyszogek',
  topicTitle = '6. Szimmetrikus négyszögek'
}) => {
  // Labor kiválasztott négyszögtípusa
  const [selectedQuad, setSelectedQuad] = useState<QuadType>('rhombus');

  const quadDetails: Record<QuadType, {
    name: string;
    description: string;
    sides: string;
    angles: string;
    diagonals: string;
    axes: number;
    central: boolean;
    cyclic: boolean;
    tangential: boolean;
    svgPoints: string;
  }> = {
    'trapezoid': {
      name: 'Általános Trapéz',
      description: 'Legalább egy párhuzamos oldalpárja van (alapok: a || c).',
      sides: 'a || c, szárak általában nem egyenlők',
      angles: 'Egy száron fekvő szögek összege 180°',
      diagonals: 'Különböző hosszúak, nem felezik egymást',
      axes: 0,
      central: false,
      cyclic: false,
      tangential: false,
      svgPoints: '30,120 180,120 140,40 60,40'
    },
    'isosceles-trapezoid': {
      name: 'Húrtrapéz (Szimmetrikus trapéz)',
      description: 'A szárai egyenlő hosszúak, az alapon fekvő szögek egyenlők.',
      sides: 'a || c, szárak b = d',
      angles: 'Alapokon fekvő szögek egyenlők (α = β, γ = δ)',
      diagonals: 'Egyenlő hosszúak (e = f), de nem felezik egymást',
      axes: 1,
      central: false,
      cyclic: true,
      tangential: false,
      svgPoints: '25,120 175,120 145,40 55,40'
    },
    'parallelogram': {
      name: 'Paralelogramma',
      description: 'Két párhuzamos oldalpárja van. Átlói felezik egymást.',
      sides: 'Szemközti oldalak párhuzamosak és egyenlők (a = c, b = d)',
      angles: 'Szemközti szögek egyenlők, szomszédosak összege 180°',
      diagonals: 'Átlói felezik egymást (nem egyenlők, nem merőlegesek)',
      axes: 0,
      central: true,
      cyclic: false,
      tangential: false,
      svgPoints: '25,120 155,120 175,40 45,40'
    },
    'rhombus': {
      name: 'Rombusz',
      description: 'Minden oldala egyenlő hosszúságú paralelogramma.',
      sides: 'Minden oldala egyenlő (a = b = c = d)',
      angles: 'Szemközti szögek egyenlők, az átlók felezik a szögeket',
      diagonals: 'Merőlegesen felezik egymást (e ⊥ f) és szögfelezők',
      axes: 2,
      central: true,
      cyclic: false,
      tangential: true,
      svgPoints: '100,25 175,80 100,135 25,80'
    },
    'rectangle': {
      name: 'Téglalap',
      description: 'Minden szöge derékszögű paralelogramma.',
      sides: 'Szemközti oldalak egyenlők és párhuzamosak (a = c, b = d)',
      angles: 'Minden belső szöge pontosan 90°',
      diagonals: 'Egyenlő hosszúak (e = f) és felezik egymást',
      axes: 2,
      central: true,
      cyclic: true,
      tangential: false,
      svgPoints: '35,35 165,35 165,125 35,125'
    },
    'square': {
      name: 'Négyzet',
      description: 'Egyszerre rombusz és téglalap: minden oldala és szöge egyenlő.',
      sides: 'Minden oldala egyenlő (a = b = c = d) és párhuzamos',
      angles: 'Minden belső szöge 90°',
      diagonals: 'Egyenlők (e = f), merőlegesek (e ⊥ f), felezik egymást és szögfelezők',
      axes: 4,
      central: true,
      cyclic: true,
      tangential: true,
      svgPoints: '45,35 155,35 155,145 45,145'
    },
    'kite': {
      name: 'Deltoid',
      description: 'Két-két szomszédos oldala egyenlő hosszú. Átlói merőlegesek.',
      sides: 'Két szomszédos oldalpár egyenlő (a = b, c = d)',
      angles: 'A szimmetriatengelyre nem eső két szemközti szög egyenlő',
      diagonals: 'Merőlegesek (e ⊥ f), a szimmetriaátló felezi a másikat',
      axes: 1,
      central: false,
      cyclic: false,
      tangential: true,
      svgPoints: '100,20 165,65 100,140 35,65'
    }
  };

  const current = quadDetails[selectedQuad];

  return (
    <TheoryTemplate
      title="6. Szimmetrikus négyszögek"
      subtitle="A négyszögek hierarchiája, átlók és oldalak tulajdonságai, szimmetriák, húr- és érintőnégyszögek (Pitot-tétel)"
      badge="9. Osztály • VI. Egybevágóság, négyszögek"
      topicBadge="9. OSZTÁLY • VI. EGYBEVÁGÓSÁG • 6. SZIMMETRIKUS NÉGYSZÖGEK"
      themeColor="violet"
      topicId={topicId}
      topicTitle={topicTitle}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz a szimmetrikus négyszögek feladványaira?"
      practiceSubtitle="Tedd próbára tudásodat a 30 válogatott feladatból álló, 3 szintre bontott interaktív kvízben!"
      practiceButtonText="Kvíz indítása"
      quickRule={{
        label: "Aranyszabály: Húr- és Érintőnégyszögek",
        formula: "Húrnégyszög: α + γ = β + δ = 180° | Érintőnégyszög: a + c = b + d (Pitot)",
        align: "center"
      }}
    >
      {/* 1. RÉSZ: Négyszögek Családfája és Hierarchiája */}
      <TheorySection
        title="1. Négyszögek Osztályozása és Családfája"
        badge="Hierarchia"
        icon={<Boxes className="w-5 h-5 text-indigo-600" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A négyszögek világa szigorúan egymásba ágyazott halmazokból áll. Minden speciális négyszög örökli az őseinek minden tulajdonságát, és további szimmetriákkal bővül!
        </p>

        <div className="flex justify-center my-6">
          <QuadrilateralHierarchySvg size={440} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
              A Három Fő Vonal
            </h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1.5 list-disc list-inside">
              <li><strong>Trapéz-vonal:</strong> Legalább egy párhuzamos oldalpár → Paralelogramma (két párhuzamos pár) → Téglalap / Rombusz → Négyzet.</li>
              <li><strong>Húrtrapéz ág:</strong> Egyenlő szárak, egy szimmetriatengely az alapok felezőmerőlegese mentén.</li>
              <li><strong>Deltoid-vonal:</strong> Két-két szomszédos oldal egyenlő → ha minden oldal egyenlővé válik, rombuszt kapunk!</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
            <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" />
              A Négyzet Mint a Geometria Királya
            </h4>
            <p className="text-sm text-purple-800 dark:text-purple-300 leading-relaxed">
              A <strong>négyzet</strong> a téglalap és a rombusz közös metszete: egyszerre rendelkezik a téglalap minden erényével (minden szöge 90°, egyenlő átlók) és a rombusz minden tulajdonságával (minden oldala egyenlő, merőleges szögfelező átlók).
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 2. RÉSZ: Átlók és Szimmetriák Rendszere */}
      <TheorySection
        title="2. Átlók és Szimmetriák Rendszere"
        badge="Átlók & Tengelyek"
        icon={<Split className="w-5 h-5 text-violet-600" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A négyszögek legkönnyebben az <strong>átlóik viszonya</strong> és <strong>szimmetriáik</strong> alapján különböztethetők meg.
        </p>

        <div className="flex justify-center my-6">
          <QuadrilateralDiagonalsSvg size={440} />
        </div>

        {/* Összehasonlító táblázat */}
        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs border-collapse border border-slate-200 dark:border-slate-700">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">
                <th className="p-2.5 border border-slate-200 dark:border-slate-700">Négyszög</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-700">Átlók Felezik Egymást?</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-700">Átlók Egyenlők? (e = f)</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-700">Átlók Merőlegesek? (e ⊥ f)</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-700">Tengelyek Száma</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-700">Középpontosan Szimmetrikus?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-600 dark:text-slate-300">
              <tr>
                <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700">Trapéz</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Nem</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Nem</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Nem</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">0</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Nem</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">Húrtrapéz</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Nem</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-emerald-600">✓ IGEN</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Nem</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold">1 (oldalfelező)</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Nem</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700 text-amber-600 dark:text-amber-400">Deltoid</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Csak az egyiket</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Nem</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-emerald-600">✓ IGEN</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold">1 (szimmetriaátló)</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Nem</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700 text-green-600 dark:text-green-400">Paralelogramma</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-emerald-600">✓ IGEN</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Nem</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Nem</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">0</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-emerald-600">✓ IGEN (O pont)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700 text-purple-600 dark:text-purple-400">Rombusz</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-emerald-600">✓ IGEN</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Nem</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-emerald-600">✓ IGEN (⊥)</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold">2 (a két átló)</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-emerald-600">✓ IGEN</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400">Téglalap</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-emerald-600">✓ IGEN</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-emerald-600">✓ IGEN (=)</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Nem</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold">2 (oldalfelezők)</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-emerald-600">✓ IGEN</td>
              </tr>
              <tr className="bg-rose-50/70 dark:bg-rose-950/30 font-semibold">
                <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700 text-rose-600 dark:text-rose-400">NÉGYZET</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-emerald-600">✓ IGEN</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-emerald-600">✓ IGEN</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-emerald-600">✓ IGEN</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-rose-600">4 (2 átló + 2 oldalfelező)</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-emerald-600">✓ IGEN</td>
              </tr>
            </tbody>
          </table>
        </div>
      </TheorySection>

      {/* 3. RÉSZ: Húrnégyszögek és Érintőnégyszögek */}
      <TheorySection
        title="3. Húrnégyszögek és Érintőnégyszögek"
        badge="Kör & Négyszög"
        icon={<CircleDot className="w-5 h-5 text-emerald-600" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A négyszögek és körök kapcsolata két alapvető tételcsoportra oszlik: van-e körülírt köre (húrnégyszög), illetve van-e beírt köre (érintőnégyszög).
        </p>

        <div className="flex justify-center my-6">
          <CyclicTangentialSvg size={440} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {/* Húrnégyszög doboz */}
          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              Húrnégyszög-Tétel
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed mb-2">
              Egy négyszög akkor és csak akkor húrnégyszög (írható köré kör), ha a <strong>szemközti szögeinek összege 180°</strong>:
            </p>
            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg text-center font-mono font-bold text-blue-950 dark:text-blue-100 text-sm border border-blue-200 dark:border-blue-800 mb-2">
              α + γ = β + δ = 180°
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-400">
              <strong>Húrnégyszögek:</strong> Húrtrapéz, Téglalap, Négyzet. (Általános paralelogramma nem az!)
            </p>
          </div>

          {/* Érintőnégyszög doboz */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-200 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Érintőnégyszög-Tétel (Pithot-tétel)
            </h4>
            <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed mb-2">
              Egy négyszög akkor és csak akkor érintőnégyszög (írható bele kör), ha a <strong>szemközti oldalainak összege egyenlő</strong>:
            </p>
            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg text-center font-mono font-bold text-emerald-950 dark:text-emerald-100 text-sm border border-emerald-200 dark:border-emerald-800 mb-2">
              a + c = b + d
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              <strong>Érintőnégyszögek:</strong> Deltoid, Rombusz, Négyzet. (Általános téglalap nem az!)
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 4. RÉSZ: Interaktív Labor (A tananyag végén!) */}
      <TheorySection
        title="4. Interaktív Labor: Négyszög Vizsgáló Műhely"
        badge="Interaktív Labor"
        icon={<Sparkles className="w-5 h-5 text-amber-500" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Válassz ki egy négyszögtípust az alábbi gombokkal! A labor automatikusan kirajzolja a formát, elemzi az átlóit, megmutatja a szimmetriáit, és ellenőrzi a kör-illeszkedési tételeket.
        </p>

        {/* Négyszög választó gombok */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(Object.keys(quadDetails) as QuadType[]).map((qKey) => (
            <button
              key={qKey}
              onClick={() => setSelectedQuad(qKey)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                selectedQuad === qKey
                  ? 'bg-indigo-600 text-white shadow-indigo-200 dark:shadow-none scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {quadDetails[qKey].name}
            </button>
          ))}
        </div>

        {/* Labor Vászon és Elemző Kártya */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
          {/* SVG Kirajzolás */}
          <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center">
            <svg viewBox="0 0 200 160" className="w-48 h-40 select-none">
              {/* Rács háttérként */}
              <defs>
                <pattern id="quad-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="200" height="160" fill="url(#quad-grid)" />

              {/* Négyszög poligon */}
              <polygon
                points={current.svgPoints}
                fill="#e0e7ff"
                stroke="#4f46e5"
                strokeWidth="2.5"
                className="transition-all duration-300"
              />

              {/* Csúcsok */}
              {current.svgPoints.split(' ').map((p, idx) => {
                const [x, y] = p.split(',').map(Number);
                return (
                  <circle
                    key={idx}
                    cx={x}
                    cy={y}
                    r="3.5"
                    fill="#312e81"
                  />
                );
              })}
            </svg>
            <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 mt-2">
              {current.name}
            </span>
          </div>

          {/* Tulajdonság-kártya */}
          <div className="space-y-3">
            <div className="bg-white dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 block mb-1">Geometriai leírás:</span>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {current.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 block">Szimmetriatengelyek:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                  {current.axes} tengely
                </span>
              </div>
              <div className="bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 block">Középpontos szimmetria:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {current.central ? '✓ IGEN' : '❌ NEM'}
                </span>
              </div>
              <div className="bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 block">Húrnégyszög (Köré írható):</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">
                  {current.cyclic ? '✓ IGEN' : '❌ NEM'}
                </span>
              </div>
              <div className="bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 block">Érintőnégyszög (Beírt kör):</span>
                <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">
                  {current.tangential ? '✓ IGEN' : '❌ NEM'}
                </span>
              </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-950/40 p-3 rounded-lg border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200">
              <strong>Átlók viszonya:</strong> {current.diagonals}
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

