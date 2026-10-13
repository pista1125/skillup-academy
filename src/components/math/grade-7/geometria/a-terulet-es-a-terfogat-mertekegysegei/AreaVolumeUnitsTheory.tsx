import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  GeometryFigureGrid,
  GeometrySvgFrame,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Ruler,
  Box,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Check,
  X,
  Target,
  Sparkles,
  Calculator,
  Compass,
  Scale,
  Maximize2,
  Droplets
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface AreaVolumeUnitsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const AreaVolumeUnitsTheory: React.FC<AreaVolumeUnitsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive converter state
  const [convCategory, setConvCategory] = useState<'area' | 'volume'>('area');
  const [inputValue, setInputValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('m2');
  const [toUnit, setToUnit] = useState<string>('dm2');

  // Conversion rates relative to base unit (m2 for area, dm3/liter for volume)
  const areaRates: Record<string, { label: string; toBase: number }> = {
    km2: { label: 'km²', toBase: 1000000 },
    ha: { label: 'ha (hektár)', toBase: 10000 },
    a: { label: 'a (ár)', toBase: 100 },
    m2: { label: 'm²', toBase: 1 },
    dm2: { label: 'dm²', toBase: 0.01 },
    cm2: { label: 'cm²', toBase: 0.0001 },
    mm2: { label: 'mm²', toBase: 0.000001 }
  };

  const volumeRates: Record<string, { label: string; toBase: number }> = {
    m3: { label: 'm³', toBase: 1000 },
    hl: { label: 'hl (hektoliter)', toBase: 100 },
    dm3: { label: 'dm³ (= liter)', toBase: 1 },
    l: { label: 'liter (l)', toBase: 1 },
    dl: { label: 'dl (deciliter)', toBase: 0.1 },
    cl: { label: 'cl (centiliter)', toBase: 0.01 },
    cm3: { label: 'cm³ (= ml)', toBase: 0.001 },
    ml: { label: 'ml (milliliter)', toBase: 0.001 },
    mm3: { label: 'mm³', toBase: 0.000001 }
  };

  const currentRates = convCategory === 'area' ? areaRates : volumeRates;
  const rateFrom = currentRates[fromUnit]?.toBase || 1;
  const rateTo = currentRates[toUnit]?.toBase || 1;
  const convertedValue = (inputValue * rateFrom) / rateTo;

  // Format nicely
  const formattedConverted = Number.isFinite(convertedValue)
    ? convertedValue >= 1000000 || (convertedValue > 0 && convertedValue < 0.0001)
      ? convertedValue.toExponential(4)
      : parseFloat(convertedValue.toFixed(6)).toString()
    : '0';

  return (
    <TheoryTemplate
      title="4. A terület és a térfogat mértékegységei"
      subtitle="Terület- és térfogategységek váltószámai, mezőgazdasági mértékek (ár, hektár) és űrmérték-kapcsolatok"
      badgeText="7. OSZTÁLY • VII. GEOMETRIA • 📖 4. LECKE"
      quickRule={{
        label: 'Fontos szabály',
        formula: '1\\text{ ha} = 100\\text{ a} = 10\\ 000\\text{ m}^2 \\quad • \\quad 1\\text{ dm}^3 = 1\\text{ l} = 1000\\text{ cm}^3 \\quad • \\quad 1\\text{ m}^3 = 1000\\text{ l} = 10\\text{ hl}'
      }}
      topicId="g7-geom-units"
      chapterId="geometria"
      grade={7}
      themeColor="cyan"
      estimatedReadTime="14 perc"
      difficulty="Közepes"
      pdfFilename="7_osztaly_4_terulet_es_terfogat_mertekegysegei.pdf"
      practiceTitle="Készen állsz a terület- és térfogat-átváltások gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod a 30 feladatos interaktív kvízben, a párosítóban és a csoportosítóban!"
      onBack={onBack}
      onStartPractice={onStartQuiz}
    >
      {/* 1. FEJEZET: TERÜLETMÉRTÉKEGYSÉGEK */}
      <TheorySection
        id="fejezet-1"
        number={1}
        title="Területmértékegységek és váltószámaik"
        badge="VÁLTÓSZÁM: 100"
      >
        <TheoryCallout type="rule" title="Fontos alapszabályok összefoglalása">
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li>
              <strong>A területmértékegységek szomszédos váltószáma: 100</strong>.
              (Mert a hosszúság 10-szeresére nő, így a terület <MathText text="10 \times 10 = 100" inline />-szorosára).
            </li>
            <li>
              <strong>Területlétránk:</strong> <MathText text="\text{km}^2 \xrightarrow{\cdot 100} \text{ha} \xrightarrow{\cdot 100} \text{a} \xrightarrow{\cdot 100} \text{m}^2 \xrightarrow{\cdot 100} \text{dm}^2 \xrightarrow{\cdot 100} \text{cm}^2 \xrightarrow{\cdot 100} \text{mm}^2" inline />
            </li>
            <li>
              <strong>Mezőgazdasági mértékek:</strong>
              <ul className="list-circle pl-4 mt-1 space-y-0.5">
                <li><MathText text="1\text{ a (ár)} = 100\text{ m}^2" inline /> (egy <MathText text="10\text{ m} \times 10\text{ m}" inline />-es négyzet).</li>
                <li><MathText text="1\text{ ha (hektár)} = 100\text{ a} = 10\ 000\text{ m}^2" inline /> (egy <MathText text="100\text{ m} \times 100\text{ m}" inline />-es négyzet).</li>
                <li><MathText text="1\text{ km}^2 = 100\text{ ha} = 1\ 000\ 000\text{ m}^2" inline />.</li>
              </ul>
            </li>
            <li>
              <strong>A térfogatmértékegységek szomszédos váltószáma: 1000</strong> (<MathText text="10 \times 10 \times 10 = 1000" inline />).
            </li>
            <li>
              <strong>Az űrmérték és térfogat aranykapcsa:</strong> <MathText text="1\text{ dm}^3 = 1\text{ liter}" inline />, <MathText text="1\text{ cm}^3 = 1\text{ ml}" inline />, <MathText text="1\text{ m}^3 = 1000\text{ l} = 10\text{ hl}" inline />!
            </li>
          </ul>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <TheoryCard
            title="Miért pont 100 a terület váltószáma?"
            icon={<Ruler className="w-5 h-5 text-cyan-600" />}
          >
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Vegyünk egy <MathText text="1\text{ dm}" inline /> oldalú négyzetet! Ennek területe definíció szerint <MathText text="1\text{ dm}^2" inline />.
            </p>
            <div className="mt-3 flex items-center gap-4 p-3 bg-cyan-50 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-800 text-xs">
              <svg viewBox="0 0 100 100" className="w-20 h-20 shrink-0">
                <rect x="5" y="5" width="90" height="90" fill="none" className="stroke-cyan-600 stroke-2" />
                {/* 10x10 grid */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                  <g key={i}>
                    <line x1={5 + i * 9} y1="5" x2={5 + i * 9} y2="95" className="stroke-cyan-300 stroke-[0.5]" />
                    <line x1="5" y1={5 + i * 9} x2="95" y2={5 + i * 9} className="stroke-cyan-300 stroke-[0.5]" />
                  </g>
                ))}
                <rect x="5" y="5" width="9" height="9" className="fill-rose-500" />
                <text x="50" y="55" textAnchor="middle" className="text-[10px] font-black fill-cyan-900">100 db</text>
              </svg>
              <div>
                <p className="text-slate-700 dark:text-slate-300">
                  Mivel <MathText text="1\text{ dm} = 10\text{ cm}" inline />, a négyzetet mindkét irányban 10 részre osztva <MathText text="10 \times 10 = 100" inline /> darab <MathText text="1\text{ cm}^2" inline />-es kis négyzetet kapunk.
                </p>
                <div className="mt-1 font-bold text-cyan-700 dark:text-cyan-300">
                  <MathText text="1\text{ dm}^2 = 100\text{ cm}^2" inline />
                </div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Mezőgazdasági mértékegységek: ár és hektár"
            icon={<Layers className="w-5 h-5 text-emerald-600" />}
          >
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              A földterületek, telkek és szántóföldek mérésére a négyzetméter gyakran túl kicsi, a négyzetkilométer pedig túl nagy. Ezért használjuk az <strong>ár</strong> és a <strong>hektár</strong> egységeket.
            </p>
            <div className="mt-3 space-y-2 text-xs">
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <strong className="text-emerald-900 dark:text-emerald-200">1 ár (a):</strong>
                <p className="text-slate-700 dark:text-slate-300 mt-0.5">
                  Egy <MathText text="10\text{ m} \times 10\text{ m}" inline />-es kert mérete: <MathText text="1\text{ a} = 100\text{ m}^2" inline />.
                </p>
              </div>
              <div className="p-2.5 bg-teal-50 dark:bg-teal-950/40 rounded-lg border border-teal-200 dark:border-teal-800">
                <strong className="text-teal-900 dark:text-teal-200">1 hektár (ha):</strong>
                <p className="text-slate-700 dark:text-slate-300 mt-0.5">
                  Egy <MathText text="100\text{ m} \times 100\text{ m}" inline />-es szántóföld területe: <MathText text="1\text{ ha} = 100\text{ a} = 10\ 000\text{ m}^2" inline /> (kb. 1,5 focipálya).
                </p>
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* Terület átváltási táblázat */}
        <div className="mt-6">
          <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-2">
            Területmértékegységek átváltási rendszere (100-as lépésekben)
          </h4>
          <TheoryTable
            headers={['Mértékegység', 'Jele', 'Váltása m²-re', 'Szemléltetés']}
            rows={[
              ['Négyzetmilliméter', 'mm²', '0,000 001 m²', 'Gombostűfej keresztmetszete'],
              ['Négyzetcentiméter', 'cm²', '0,0001 m²', 'Bélyeg területe'],
              ['Négyzetdeciméter', 'dm²', '0,01 m²', 'CD-tok területe'],
              ['Négyzetméter', 'm²', '1 m²', 'Tanári asztal felülete'],
              ['Ár', 'a', '100 m²', 'Kisebb családi ház telke'],
              ['Hektár', 'ha', '10 000 m²', 'Nagyobb szántóföld (~1,5 focipálya)'],
              ['Négyzetkilométer', 'km²', '1 000 000 m²', 'Község vagy kerület területe']
            ]}
          />
        </div>
      </TheorySection>

      {/* 2. FEJEZET: TÉRFOGATMÉRTÉKEGYSÉGEK ÉS ŰRMÉRTÉK */}
      <TheorySection
        id="fejezet-2"
        number={2}
        title="Térfogatmértékegységek és az űrmérték kapcsolata"
        badge="VÁLTÓSZÁM: 1000"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Miért 1000 a térfogat váltószáma?"
            icon={<Box className="w-5 h-5 text-indigo-600" />}
          >
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Egy <MathText text="1\text{ dm}" inline /> élhosszúságú kocka térfogata <MathText text="1\text{ dm}^3" inline />. Mivel <MathText text="1\text{ dm} = 10\text{ cm}" inline />, az élek mentén:
            </p>
            <div className="my-2 p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center font-bold text-indigo-700 dark:text-indigo-300 text-xs">
              <MathText text="V = 10\text{ cm} \times 10\text{ cm} \times 10\text{ cm} = 1000\text{ cm}^3" inline />
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              A kocka 10 rétegből áll, mindegyik rétegben <MathText text="10 \times 10 = 100" inline /> darab <MathText text="1\text{ cm}^3" inline />-es kiskocka van, így összesen pontosan <strong>1000 darab</strong>.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Az Aranykapocs: Térfogat és Űrmérték"
            icon={<Droplets className="w-5 h-5 text-blue-600" />}
          >
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              A folyadékok űrtartalmát literben mérjük. A fizikai térfogat és az űrmérték pontosan megegyezik a következő alapegységeknél:
            </p>
            <div className="mt-3 space-y-2 text-xs">
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800 flex items-center justify-between">
                <div>
                  <strong className="text-blue-900 dark:text-blue-200">1 dm³ = 1 liter (l)</strong>
                  <div className="text-[11px] text-slate-500">Tejesdoboz űrtartalma</div>
                </div>
                <div className="text-base font-black text-blue-600">1 l</div>
              </div>

              <div className="p-2.5 bg-sky-50 dark:bg-sky-950/40 rounded-lg border border-sky-200 dark:border-sky-800 flex items-center justify-between">
                <div>
                  <strong className="text-sky-900 dark:text-sky-200">1 cm³ = 1 milliliter (ml)</strong>
                  <div className="text-[11px] text-slate-500">Kockacukor / orvosi fecskendő</div>
                </div>
                <div className="text-base font-black text-sky-600">1 ml</div>
              </div>

              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
                <div>
                  <strong className="text-indigo-900 dark:text-indigo-200">1 m³ = 1000 l = 10 hl</strong>
                  <div className="text-[11px] text-slate-500">Úszómedence / tartálykocsi</div>
                </div>
                <div className="text-base font-black text-indigo-600">10 hl</div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. FEJEZET: INTERAKTÍV MÉRTÉKEGYSÉG ÁTVÁLTÓ LABOR */}
      <TheorySection
        id="fejezet-3"
        number={3}
        title="Interaktív Mértékegység-Átváltó Labor"
        badge="INTERAKTÍV ESZKÖZ"
      >
        <div className="p-5 bg-gradient-to-br from-cyan-50/70 via-white to-blue-50/70 dark:from-slate-900 dark:via-slate-800 dark:to-cyan-950/40 rounded-2xl border border-cyan-200 dark:border-cyan-800 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-100 dark:border-cyan-800/60 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-cyan-600 text-white rounded-lg">
                  <Calculator className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Valós idejű Átváltó Kalkulátor
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Próbáld ki a terület- és térfogat-átváltásokat bármilyen számmal!
              </p>
            </div>

            {/* Toggle category */}
            <div className="flex gap-1.5">
              <button
                onClick={() => {
                  setConvCategory('area');
                  setFromUnit('m2');
                  setToUnit('dm2');
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  convCategory === 'area'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                }`}
              >
                Terület (m², ha, a, dm²...)
              </button>
              <button
                onClick={() => {
                  setConvCategory('volume');
                  setFromUnit('m3');
                  setToUnit('l');
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  convCategory === 'volume'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                }`}
              >
                Térfogat & Űrmérték (m³, l, dm³, ml...)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-5 items-center">
            {/* Input field */}
            <div className="sm:col-span-4">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                Átváltandó mennyiség:
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={e => setInputValue(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <div className="mt-2">
                <span className="text-[10px] text-slate-400">Gyors gombok:</span>
                <div className="flex gap-1 mt-1">
                  {[1, 5, 12, 0.5, 2.5].map(val => (
                    <button
                      key={val}
                      onClick={() => setInputValue(val)}
                      className="px-2 py-0.5 text-[10px] bg-slate-100 dark:bg-slate-700 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* From unit */}
            <div className="sm:col-span-3">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                Ebből:
              </label>
              <select
                value={fromUnit}
                onChange={e => setFromUnit(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl"
              >
                {Object.entries(currentRates).map(([key, info]) => (
                  <option key={key} value={key}>
                    {info.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Arrow */}
            <div className="sm:col-span-1 flex justify-center">
              <ArrowRight className="w-5 h-5 text-cyan-600" />
            </div>

            {/* To unit */}
            <div className="sm:col-span-4">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                Ebbe:
              </label>
              <select
                value={toUnit}
                onChange={e => setToUnit(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl"
              >
                {Object.entries(currentRates).map(([key, info]) => (
                  <option key={key} value={key}>
                    {info.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Banner */}
          <div className="mt-5 p-4 bg-white dark:bg-slate-800 rounded-xl border border-cyan-200 dark:border-cyan-800 text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400">Eredmény:</div>
            <div className="text-xl sm:text-2xl font-black text-cyan-700 dark:text-cyan-300 my-1">
              {inputValue} {currentRates[fromUnit]?.label} = {formattedConverted} {currentRates[toUnit]?.label}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {rateFrom > rateTo ? (
                <span>
                  Nagyobb egységből kisebbe váltottunk: a számérték megnőtt ({Math.round(rateFrom / rateTo * 1000) / 1000}-szeresére).
                </span>
              ) : rateFrom < rateTo ? (
                <span>
                  Kisebb egységből nagyobba váltottunk: a számérték csökkent (osztottunk {Math.round(rateTo / rateFrom * 1000) / 1000}-vel).
                </span>
              ) : (
                <span>Azonos mértékegységek!</span>
              )}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. FEJEZET: GYAKORI HIBÁK ÉS TIPPEK */}
      <TheorySection
        id="fejezet-4"
        number={4}
        title="Gyakori hibák és típusfeladatok"
        badge="CSAPDÁK ÉS TIPPEK"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="Csapda: A hosszúság váltószámát használni területnél!"
            trap="„1 m = 100 cm, tehát 1 m² = 100 cm².” – ÓRIÁSI HIBÁS!"
            solution="A területnél mindkét dimenzió (szélesség és hosszúság) 100-szorosára nő! Ezért 1 m² = 100 cm · 100 cm = 10 000 cm²!"
          />

          <TheoryTrapBox
            title="Csapda: Összekeverni az árt a hektárral!"
            trap="„1 hektár az 100 m².” – HIBÁS!"
            solution="1 ár (a) = 100 m² (10 m × 10 m). A hektár (ha) 100-szor nagyobb: 1 ha = 100 a = 10 000 m² (100 m × 100 m)!"
          />
        </div>

        <div className="mt-4 p-4 bg-cyan-50 dark:bg-cyan-950/40 rounded-2xl border border-cyan-200 dark:border-cyan-800 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <strong className="text-cyan-900 dark:text-cyan-200">A tizedesvessző eltolásának szabálya:</strong>
          </div>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 dark:text-slate-300">
            <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <strong className="text-cyan-700 dark:text-cyan-300">Területnél (váltószám 100 = 10²):</strong>
              <p className="mt-1">
                Minden egyes egységlépésnél <strong>2 tizedesjeggyel</strong> toljuk el a vesszőt! (pl. <MathText text="3,5\text{ m}^2 = 350\text{ dm}^2 = 35\ 000\text{ cm}^2" inline />).
              </p>
            </div>
            <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <strong className="text-blue-700 dark:text-blue-300">Térfogatnál (váltószám 1000 = 10³):</strong>
              <p className="mt-1">
                Minden egyes egységlépésnél <strong>3 tizedesjeggyel</strong> toljuk el a vesszőt! (pl. <MathText text="2,4\text{ m}^3 = 2400\text{ dm}^3 = 2\ 400\ 000\text{ cm}^3" inline />).
              </p>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default AreaVolumeUnitsTheory;
