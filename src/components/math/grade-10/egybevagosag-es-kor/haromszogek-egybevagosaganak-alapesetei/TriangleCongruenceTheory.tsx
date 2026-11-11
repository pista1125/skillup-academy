import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  MathText
} from '../TheoryTemplate';
import {
  FourCongruenceCasesSvg,
  AmbiguousSsaCounterexampleSvg,
  RightAngleWithDotSvg
} from './TriangleCongruenceFigures';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sliders,
  Sparkles,
  Layers,
  Scale,
  RotateCcw,
  Check,
  XCircle,
  ShieldAlert,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TriangleCongruenceTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const TriangleCongruenceTheory: React.FC<TriangleCongruenceTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab State: SSA Csapda & Alapeset Vizsgáló ---
  const [bVal, setBVal] = useState<number>(8); // ismert oldal b (szög szára)
  const [alphaVal, setAlphaVal] = useState<number>(30); // ismert szög alpha (fokban)
  const [aVal, setAVal] = useState<number>(5); // szemközti oldal a
  const [activePreset, setActivePreset] = useState<string>('two-solutions');

  // Geometriai számítások az SSA esethez:
  // b oldal, alpha szög csúcsban, a oldal a szemközti csúcsból induló körív
  const alphaRad = (alphaVal * Math.PI) / 180;
  const heightM = bVal * Math.sin(alphaRad); // magasság: m = b * sin(alpha)

  let ssaStatus: 'no-triangle' | 'right-triangle' | 'two-triangles' | 'one-unique';
  let ssaStatusText = '';
  let ssaStatusColor = '';

  if (aVal < heightM - 0.001) {
    ssaStatus = 'no-triangle';
    ssaStatusText = 'NEM létezik ilyen háromszög! (a < m, a körív el sem éri a harmadik oldal egyenesét)';
    ssaStatusColor = 'text-rose-600 bg-rose-50 border-rose-200';
  } else if (Math.abs(aVal - heightM) <= 0.05) {
    ssaStatus = 'right-triangle';
    ssaStatusText = 'Pontosan 1 derékszögű háromszög létezik (a = m, a körív érinti az egyenest).';
    ssaStatusColor = 'text-blue-600 bg-blue-50 border-blue-200';
  } else if (aVal < bVal) {
    ssaStatus = 'two-triangles';
    ssaStatusText = 'CSAPDA! Pontosan 2 NEM egybevágó háromszög létezik (egy hegyesszögű és egy tompaszögű)!';
    ssaStatusColor = 'text-amber-700 bg-amber-50 border-amber-300';
  } else {
    ssaStatus = 'one-unique';
    ssaStatusText = 'Egyértelmű (1 háromszög)! Mivel a ≥ b (a szög a nagyobb oldallal szemközti), a háromszög egybevágóságilag meghatározott.';
    ssaStatusColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
  }

  const applyPreset = (preset: 'two' | 'unique' | 'none') => {
    if (preset === 'two') {
      setBVal(8);
      setAlphaVal(30);
      setAVal(5); // m = 4, so 4 < 5 < 8 -> 2 triangles!
      setActivePreset('two-solutions');
    } else if (preset === 'unique') {
      setBVal(8);
      setAlphaVal(30);
      setAVal(10); // a >= b -> 1 unique triangle!
      setActivePreset('unique-solution');
    } else {
      setBVal(8);
      setAlphaVal(30);
      setAVal(3); // a < 4 -> 0 triangles!
      setActivePreset('no-solution');
    }
  };

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • VI. EGYBEVÁGÓSÁG ÉS KÖR • TANANYAG"
      title="Háromszögek egybevágóságának alapesetei"
      subtitle="Mikor egybevágó két háromszög? A négy alapeset (SSS, SAS, ASA, SSA), a szerkesztési egyértelműség és az SSA csapda elkerülése."
      themeColor="emerald"
      pdfFilename="10_osztaly_haromszogek_egybevagosaganak_alapesetei_tananyag.pdf"
      quickRule={{
        label: 'A HÁROMSZÖGEK EGYBEVÁGÓSÁGÁNAK 4 ALAPESETE',
        align: 'left',
        formula: (
          <div className="space-y-2.5 text-slate-800 text-xs sm:text-sm">
            <div className="bg-emerald-50/90 p-2.5 rounded-xl border border-emerald-200">
              <span className="font-black text-emerald-900 block mb-0.5">
                Két háromszög egybevágó (△ABC ≅ △A'B'C'), ha az alábbiak egyike teljesül:
              </span>
              <ul className="space-y-1 font-medium text-emerald-950 mt-1">
                <li>• <strong>1. (o, o, o) / SSS:</strong> Mindhárom oldaluk páronként egyenlő.</li>
                <li>• <strong>2. (o, sz, o) / SAS:</strong> Két oldal és a közbezárt szögük egyenlő.</li>
                <li>• <strong>3. (sz, o, sz) / ASA:</strong> Egy oldal és a rajta fekvő két szögük egyenlő.</li>
                <li>• <strong>4. (o, o, sz) / SSA:</strong> Két oldal és a <u>NAGYOBB</u> oldallal szemközti szög egyenlő!</li>
              </ul>
            </div>
            <div className="bg-rose-50 p-2 rounded-lg border border-rose-200 text-rose-800 text-[11px] leading-tight">
              <strong>⚠️ VIGYÁZAT:</strong> Ha a szög a <em>kisebb</em> oldallal szemközti, a feladatnak 2 különböző, nem egybevágó megoldása is lehet (SSA határozatlan eset)!
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz a háromszögek egybevágóságának feladataira?"
      practiceSubtitle="Gyakorold a 4 alapeset felismerését, a bizonyításokat és a hibák kiszűrését a kvízben!"
      interactiveSection={
        <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 border-2 border-emerald-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500 text-slate-950 rounded-2xl shadow-lg">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-emerald-100">
                  Interaktív Egybevágósági &amp; SSA Csapda Labor
                </h3>
                <p className="text-xs text-emerald-300/80">
                  Próbáld ki a két oldal és egy szög (o, o, sz) esetet! Miért kötelező, hogy a szög a nagyobb oldallal szemben legyen?
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${activePreset === 'two-solutions' ? 'bg-amber-500 text-slate-950 font-bold border-amber-300' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => applyPreset('two')}
              >
                ⚠️ 2 megoldás (SSA csapda)
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${activePreset === 'unique-solution' ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-300' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => applyPreset('unique')}
              >
                ✓ Egyértelmű (a ≥ b)
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${activePreset === 'no-solution' ? 'bg-rose-500 text-white font-bold border-rose-300' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => applyPreset('none')}
              >
                ✕ Nincs háromszög
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Vezérlők */}
            <div className="lg:col-span-5 space-y-4 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-emerald-800/40">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                Paraméterek beállítása
              </span>

              {/* b oldal */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-200">
                  <span>Ismert szomszédos oldal (b):</span>
                  <span className="font-mono text-emerald-300 font-bold">{bVal} cm</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="12"
                  step="1"
                  value={bVal}
                  onChange={(e) => {
                    setBVal(Number(e.target.value));
                    setActivePreset('custom');
                  }}
                  className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* alpha szög */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-200">
                  <span>Ismert szög (α):</span>
                  <span className="font-mono text-amber-300 font-bold">{alphaVal}°</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="75"
                  step="5"
                  value={alphaVal}
                  onChange={(e) => {
                    setAlphaVal(Number(e.target.value));
                    setActivePreset('custom');
                  }}
                  className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* a oldal (szemközti oldal) */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-200">
                  <span>Szemközti oldal (a):</span>
                  <span className="font-mono text-cyan-300 font-bold">{aVal} cm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="14"
                  step="0.5"
                  value={aVal}
                  onChange={(e) => {
                    setAVal(Number(e.target.value));
                    setActivePreset('custom');
                  }}
                  className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* Elméleti magasság ellenőrzés */}
              <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 text-xs space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Kritikus magasság (m = b · sin α):</span>
                  <span className="font-mono font-bold text-amber-400">{heightM.toFixed(2)} cm</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Oldalak viszonya:</span>
                  <span className="font-mono font-bold text-cyan-300">
                    {aVal < bVal ? 'a < b (kisebb oldallal szemközti szög!)' : 'a ≥ b (nagyobb oldallal szemközti szög)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Dinamikus Geometriai Értékelő & Vizuális Magyarázat */}
            <div className="lg:col-span-7 space-y-4">
              <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-start gap-2.5 ${ssaStatusColor}`}>
                {ssaStatus === 'two-triangles' && <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />}
                {ssaStatus === 'one-unique' && <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />}
                {ssaStatus === 'no-triangle' && <XCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />}
                {ssaStatus === 'right-triangle' && <Sparkles className="w-5 h-5 shrink-0 text-blue-600 mt-0.5" />}
                <div className="leading-snug">
                  {ssaStatusText}
                </div>
              </div>

              {/* SVG Dinamikus szemléltetés */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                <svg viewBox="0 0 420 180" className="w-full max-w-[400px] h-auto select-none">
                  {/* Alapegyenes */}
                  <line x1="30" y1="140" x2="390" y2="140" stroke="#64748b" strokeWidth="2" strokeDasharray="4 3" />
                  <text x="395" y="144" fill="#94a3b8" fontSize="11">e</text>

                  {/* Csúcs A */}
                  <circle cx="60" cy="140" r="4" fill="#38bdf8" />
                  <text x="50" y="160" fill="#38bdf8" fontSize="12" fontWeight="bold">A</text>

                  {/* Szög ív alpha */}
                  <path d="M 85 140 A 25 25 0 0 0 78 126" fill="none" stroke="#f59e0b" strokeWidth="2" />
                  <text x="92" y="134" fill="#f59e0b" fontSize="11" fontWeight="bold">α={alphaVal}°</text>

                  {/* b oldal vonala C csúcsig */}
                  {/* C koordinátái: x = 60 + b * cos(alpha), y = 140 - b * sin(alpha) (skálázva) */}
                  {(() => {
                    const scale = 14;
                    const cx = 60 + bVal * Math.cos(alphaRad) * scale;
                    const cy = 140 - bVal * Math.sin(alphaRad) * scale;
                    const scaledM = heightM * scale;
                    const scaledA = aVal * scale;

                    return (
                      <g>
                        {/* b oldal */}
                        <line x1="60" y1="140" x2={cx} y2={cy} stroke="#10b981" strokeWidth="3" />
                        <text x={(60 + cx) / 2 - 12} y={(140 + cy) / 2 - 8} fill="#34d399" fontSize="11" fontWeight="bold">
                          b={bVal}
                        </text>

                        {/* C csúcs */}
                        <circle cx={cx} cy={cy} r="4" fill="#34d399" />
                        <text x={cx - 5} y={cy - 10} fill="#34d399" fontSize="12" fontWeight="bold">C</text>

                        {/* Magasságvonal m (szaggatott) */}
                        <line x1={cx} y1={cy} x2={cx} y2="140" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                        <text x={cx + 4} y={(cy + 140) / 2} fill="#f59e0b" fontSize="10">m={heightM.toFixed(1)}</text>

                        {/* Körív a C csúcsból rajzolva 'a' sugárral */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={scaledA}
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="1.5"
                          strokeDasharray="4 3"
                          opacity="0.6"
                        />

                        {/* Metszéspontok az e egyenessel (y = 140) */}
                        {/* (x - cx)^2 + (140 - cy)^2 = scaledA^2  => deltaX = sqrt(scaledA^2 - scaledM^2) */}
                        {scaledA >= scaledM ? (
                          (() => {
                            const deltaX = Math.sqrt(Math.max(0, scaledA * scaledA - scaledM * scaledM));
                            const x1 = cx - deltaX;
                            const x2 = cx + deltaX;

                            return (
                              <g>
                                {/* Ha x1 >= 60, az érvényes metszéspont a félegyenesen */}
                                {x1 >= 60 && (
                                  <g>
                                    <line x1={cx} y1={cy} x2={x1} y2="140" stroke="#f43f5e" strokeWidth="2.5" />
                                    <circle cx={x1} cy="140" r="4" fill="#f43f5e" />
                                    <text x={x1 - 8} y="158" fill="#f43f5e" fontSize="11" fontWeight="bold">B₁</text>
                                  </g>
                                )}
                                {/* x2 mindig érvényes */}
                                {x2 >= 60 && (
                                  <g>
                                    <line x1={cx} y1={cy} x2={x2} y2="140" stroke="#06b6d4" strokeWidth="2.5" />
                                    <circle cx={x2} cy="140" r="4" fill="#06b6d4" />
                                    <text x={x2 + 4} y="158" fill="#06b6d4" fontSize="11" fontWeight="bold">B₂</text>
                                  </g>
                                )}
                              </g>
                            );
                          })()
                        ) : null}
                      </g>
                    );
                  })()}
                </svg>
                <div className="text-[11px] text-slate-400 mt-2 text-center">
                  A kék szaggatott kör a C pontból rajzolt <span className="text-cyan-300 font-bold">a sugarú körív</span>.
                  {ssaStatus === 'two-triangles' && ' Világosan látható, hogy két különböző pontban (B₁ és B₂) metszi az alapvonalat!'}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {/* 1. Szakasz: Az egybevágóság fogalma és geometriai lényege */}
      <TheorySection
        id="egybevagosag-alapjai"
        number={1}
        title="Az egybevágóság fogalma a síkgeometriában"
        badge="ALAPFOGALOM"
        badgeColor="emerald"
      >
        <TheoryCard title="Mit jelent az, hogy két síkidom egybevágó?" color="emerald">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Két síkidomot <strong>egybevágónak</strong> nevezünk, ha létezik olyan <em>egybevágósági transzformáció</em> 
            (eltolás, elforgatás, tengelyes vagy középpontos tükrözés, illetve ezek egymásutánja), amely az egyik síkidomot 
            pontosan a másikba viszi át. Hétköznapi nyelven: <strong>alakjuk és méretük teljesen azonos</strong>, egymásra fektetve 
            fedésbe hozhatók.
          </p>
          <div className="my-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 font-mono text-center text-emerald-900 dark:text-emerald-300 font-bold text-sm sm:text-base">
            △ABC ≅ △A'B'C' &nbsp; (olvasd: az ABC háromszög egybevágó az A'B'C' háromszöggel)
          </div>

          <TheoryCallout type="info" title="Csúcsok és oldalak kölcsönös megfeleltetése">
            Ha két háromszög egybevágó, akkor megfelelő oldalaik és megfelelő belső szögeik páronként egyenlőek:
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 font-mono text-xs sm:text-sm">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold">
                Oldalak egyenlősége: a = a', b = b', c = c'
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold">
                Szögek egyenlősége: α = α', β = β', γ = γ'
              </div>
            </div>
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* 2. Szakasz: A 4 egybevágósági alapeset */}
      <TheorySection
        id="negy-alapeset"
        number={2}
        title="A négy egybevágósági alapeset részletesen"
        badge="TÉTELEK"
        badgeColor="teal"
      >
        <TheoryCard title="Miért nem kell mind a 6 adatot (3 oldal, 3 szög) lemérnünk?" color="teal">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Egy háromszöget 6 független geometriai adat jellemez (3 oldal és 3 szög). A geometriai tételek csodája, hogy 
            már <strong>3 megfelelő adat egyenlősége</strong> is elegendő ahhoz, hogy a két háromszög egybevágóságát garantálja. 
            Ezek a háromszögek szerkeszthetőségének alaptételei:
          </p>

          <div className="flex justify-center my-4">
            <FourCongruenceCasesSvg size={460} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* 1. eset */}
            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2">
              <span className="font-black text-emerald-900 dark:text-emerald-200 text-sm">
                1. Alapeset: (o, o, o) vagy SSS (Side-Side-Side)
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Két háromszög egybevágó, ha <strong>három oldaluk páronként egyenlő</strong> (<MathText>{'a = a\', b = b\', c = c\''}</MathText>).
              </p>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold bg-white dark:bg-slate-900 p-2 rounded-lg border border-emerald-100">
                Példa: Ha egy háromszög oldalai 5 cm, 7 cm, 9 cm, akkor a világ bármely pontján ugyanekkora oldalakkal megszerkesztett háromszög garantáltan egybevágó vele!
              </div>
            </div>

            {/* 2. eset */}
            <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 space-y-2">
              <span className="font-black text-blue-900 dark:text-blue-200 text-sm">
                2. Alapeset: (o, sz, o) vagy SAS (Side-Angle-Side)
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Két háromszög egybevágó, ha <strong>két oldaluk és a közbezárt szögük egyenlő</strong> (<MathText>{'a = a\', b = b\', \\gamma = \\gamma\''}</MathText>).
              </p>
              <div className="text-[11px] text-blue-700 dark:text-blue-400 font-semibold bg-white dark:bg-slate-900 p-2 rounded-lg border border-blue-100">
                Lényeg: A közbezárt szög mereven rögzíti a két oldal által bezárt ollót, így a harmadik oldal távolsága egyértelműen meghatározott (kosinusztétel alapja).
              </div>
            </div>

            {/* 3. eset */}
            <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20 space-y-2">
              <span className="font-black text-purple-900 dark:text-purple-200 text-sm">
                3. Alapeset: (sz, o, sz) vagy ASA / AAS
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Két háromszög egybevágó, ha <strong>egy oldaluk és a rajta fekvő két szögük egyenlő</strong> (vagy egy oldaluk és bármely két szögük egyenlő).
              </p>
              <div className="text-[11px] text-purple-700 dark:text-purple-400 font-semibold bg-white dark:bg-slate-900 p-2 rounded-lg border border-purple-100">
                Miért mindegy, melyik két szög? Mivel a belső szögek összege mindig <MathText>{'180^\\circ'}</MathText>, két szög ismeretében a harmadik szög automatikusan adott!
              </div>
            </div>

            {/* 4. eset */}
            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 space-y-2">
              <span className="font-black text-amber-900 dark:text-amber-200 text-sm">
                4. Alapeset: (o, o, sz) vagy SSA (Side-Side-Angle)
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Két háromszög egybevágó, ha két oldaluk és a <strong>NAGYOBBIK oldallal szemközti szögük</strong> páronként egyenlő (<MathText>{'a = a\', b = b\', \\alpha = \\alpha\''}</MathText> ahol <MathText>{'a \\ge b'}</MathText>).
              </p>
              <div className="text-[11px] text-amber-800 dark:text-amber-400 font-bold bg-white dark:bg-slate-900 p-2 rounded-lg border border-amber-200">
                ÉLETVÉDELMI KIEGÉSZÍTÉS: A "nagyobbik oldallal szemközti" feltétel nélkül a tétel HAMIS!
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. Szakasz: Az SSA csapda mélyebb geometriai magyarázata */}
      <TheorySection
        id="ssa-csapda"
        number={3}
        title="Az SSA csapda: Miért életveszélyes a kisebbik oldallal szemközti szög?"
        badge="KRITIKUS BUKTATÓ"
        badgeColor="rose"
      >
        <TheoryCard title="Két oldal és a kisebbikkel szemközti szög (A határozatlan eset)" color="rose">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Ha két adott oldal <MathText>{'a = 5\\text{ cm}'}</MathText> és <MathText>{'b = 8\\text{ cm}'}</MathText>, és a megadott szög 
            <MathText>{'\\alpha = 30^\\circ'}</MathText> (amely a <em>kisebbik</em> <MathText>{'a'}</MathText> oldallal szemközti), akkor 
            a szerkesztés során a <MathText>{'C'}</MathText> pontból rajzolt <MathText>{'a'}</MathText> sugarú körív 
            <strong>két különböző pontban</strong> metszi az alapvonal egyenesét!
          </p>

          <div className="flex justify-center my-4">
            <AmbiguousSsaCounterexampleSvg size={440} />
          </div>

          <TheoryTrapBox
            title="A 3 szög (sz, sz, sz) és a hibás (o, o, sz) használata"
            trap="Két háromszögben 3 szög egyenlő, vagy két oldal és egy tetszőleges szög egyenlő. Akkor ők egybevágók!"
            wrong="△ABC ≅ △A'B'C', mert a = a', b = b' és α = α'."
            wrongExplanation="HIBA! Nem ellenőrizted, hogy α a nagyobbik oldallal (a-val) szemben van-e! Ha a < b, akkor létezik egy hegyesszögű és egy tompaszögű háromszög is ugyanilyen adatokkal!"
            correct="△ABC ≅ △A'B'C', mert a = a', b = b', α = α' ÉS a ≥ b."
            correctExplanation="HELYES! Mivel igazoltuk, hogy a szemközti oldal nem kisebb a másiknál (a ≥ b), a körív csak 1 pontban metszi a félegyenest, így az egybevágóság garantált."
            tip="Ha mindhárom szög egyenlő (sz, sz, sz), a háromszögek csak HASONLÓAK, de NEM feltétlenül egybevágók (pl. nagyítás, kicsinyítés)!"
          />
        </TheoryCard>
      </TheorySection>

      {/* 4. Szakasz: Derékszögű háromszögek speciális esetei */}
      <TheorySection
        id="derekoszogu-esetek"
        number={4}
        title="Derékszögű háromszögek egybevágósága"
        badge="SPECIÁLIS ESETEK"
        badgeColor="cyan"
      >
        <TheoryCard title="Miért elegendő 2 adat a derékszögű háromszögeknél?" color="cyan">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Derékszögű háromszög esetén a derékszög (<MathText>{'90^\\circ'}</MathText>) mindig fixen adott. 
            Mivel a derékszög a háromszög legnagyobb szöge, és a vele szemközti oldal az átfogó (<MathText>{'c'}</MathText>), 
            a Pitagorasz-tétel (<MathText>{'a^2 + b^2 = c^2'}</MathText>) révén a hiányzó oldal mindig egyértelműen kiszámítható.
          </p>

          <div className="flex items-center justify-center gap-4 my-4 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700">
            <RightAngleWithDotSvg size={80} />
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <span className="font-bold text-slate-900 dark:text-white block">Magyar jelölési szabvány:</span>
              A derékszöget ívvel és benne egy jól látható ponttal jelöljük (<MathText>{'\\sphericalangle + \\cdot'}</MathText>).
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-800 space-y-1">
              <span className="font-bold text-cyan-800 dark:text-cyan-300 block">1. Két befogó egyenlő (b-b):</span>
              <p className="text-slate-600 dark:text-slate-400">
                Ez az (o, sz, o) eset speciális formája, mert a két befogó közbezárt szöge mindig <MathText>{'90^\\circ'}</MathText>.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-800 space-y-1">
              <span className="font-bold text-cyan-800 dark:text-cyan-300 block">2. Átfogó és egy befogó (á-b):</span>
              <p className="text-slate-600 dark:text-slate-400">
                Ez az (o, o, sz) eset speciális formája! Mivel az átfogó mindig a leghosszabb oldal, a szög automatikusan a nagyobbik oldallal szemközti.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-800 space-y-1">
              <span className="font-bold text-cyan-800 dark:text-cyan-300 block">3. Átfogó és hegyesszög (á-sz):</span>
              <p className="text-slate-600 dark:text-slate-400">
                Ez az (sz, o, sz) eset formája, mert a hegyesszögből a másik szög <MathText>{'90^\\circ - \\alpha'}</MathText> azonnal adott.
              </p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. Szakasz: Részletesen levezetett mintapéldák */}
      <TheorySection
        id="mintapeldak"
        number={5}
        title="Kidolgozott mintapéldák lépésről lépésre"
        badge="MINTAPÉLDÁK"
        badgeColor="emerald"
      >
        {/* 1. Mintapélda */}
        <TheoryCard title="1. Mintapélda: Folyó szélességének mérése átkelés nélkül" color="emerald">
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Feladat:</strong> Egy folyó túlsó partján áll egy fa (<MathText>{'A'}</MathText> pont). 
              A mi partunkon kijelölünk vele szemben egy <MathText>{'B'}</MathText> pontot úgy, hogy az <MathText>{'AB'}</MathText> szakasz 
              merőleges legyen a partvonalra. A part mentén elmegyünk 20 métert egy <MathText>{'C'}</MathText> pontig, majd további 
              20 métert egy <MathText>{'D'}</MathText> pontig. <MathText>{'D'}</MathText>-ből merőlegesen eltávolodunk a parttól, 
              amíg az <MathText>{'E'}</MathText> pontba érve az <MathText>{'E'}</MathText>, <MathText>{'C'}</MathText> és <MathText>{'A'}</MathText> 
              pontok egy egyenesbe nem esnek. Lemérjük a <MathText>{'DE'}</MathText> szakaszt: pontosan 35 méter. Mennyi a folyó szélessége?
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white block">Megoldás lépései:</span>
              <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                <li>
                  <strong>Háromszögek azonosítása:</strong> Tekintsük a <MathText>{'\\Delta ABC'}</MathText> és <MathText>{'\\Delta EDC'}</MathText> háromszögeket!
                </li>
                <li>
                  <strong>Közös és egyenlő adatok feltárása:</strong>
                  <ul className="list-disc list-inside ml-4 space-y-0.5 mt-1 font-mono text-xs">
                    <li><MathText>{'BC = CD = 20\\text{ m}'}</MathText> (kijelölés szerint egyenlő oldalak)</li>
                    <li><MathText>{'\\sphericalangle B = \\sphericalangle D = 90^\\circ'}</MathText> (merőleges kitűzések miatt)</li>
                    <li><MathText>{'\\sphericalangle BCA = \\sphericalangle DCE'}</MathText> (csúcsszögek, ezért egyenlőek!)</li>
                  </ul>
                </li>
                <li>
                  <strong>Egybevágóság kimondása:</strong> A két háromszög egybevágó a <strong>(sz, o, sz)</strong> alapeset alapján: 
                  egy oldaluk (<MathText>{'BC = CD'}</MathText>) és a rajta fekvő két szög (<MathText>{'90^\\circ'}</MathText> és a csúcsszög) páronként egyenlő!
                </li>
                <li>
                  <strong>Következtetés:</strong> Mivel <MathText>{'\\Delta ABC \\cong \\Delta EDC'}</MathText>, a megfelelő oldalaik is egyenlőek: 
                  <MathText>{'AB = DE = 35\\text{ m}'}</MathText>.
                </li>
              </ol>
              <div className="mt-2 p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold text-xs">
                Válasz: A folyó szélessége (AB távolság) pontosan 35 méter.
              </div>
            </div>
          </div>
        </TheoryCard>

        {/* 2. Mintapélda */}
        <TheoryCard title="2. Mintapélda: Egybevágóság vizsgálata adathármasokból" color="teal">
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Feladat:</strong> Egybevágó-e a két háromszög?
              <br />
              1. háromszög: <MathText>{'a = 6\\text{ cm}, b = 10\\text{ cm}, \\beta = 65^\\circ'}</MathText>
              <br />
              2. háromszög: <MathText>{'a\' = 6\\text{ cm}, b\' = 10\\text{ cm}, \\beta\' = 65^\\circ'}</MathText>
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white block">Elemzés:</span>
              <p>
                Két oldal és egy szög adott: <MathText>{'a = a\' = 6'}</MathText>, <MathText>{'b = b\' = 10'}</MathText>, és a megadott szög <MathText>{'\\beta = 65^\\circ'}</MathText>.
                Vizsgáljuk meg, melyik oldallal van szemben a megadott szög!
              </p>
              <p>
                A <MathText>{'\\beta'}</MathText> szög a <MathText>{'b'}</MathText> oldallal szemközti. Mivel <MathText>{'b = 10\\text{ cm}'}</MathText> és <MathText>{'a = 6\\text{ cm}'}</MathText>, 
                ezért <MathText>{'b > a'}</MathText>, vagyis <strong>a szög a nagyobbik oldallal szemben fekszik</strong>!
              </p>
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold text-xs">
                Eredmény: IGEN, a két háromszög egybevágó az (o, o, sz) alapeset alapján, mert a megadott szög a két oldal közül a nagyobbikkal szemközti!
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 6. Szakasz: Rendszerező összefoglaló táblázat */}
      <TheorySection
        id="osszegzes"
        number={6}
        title="Rendszerező összefoglalás: Mikor egybevágó és mikor NEM?"
        badge="ÖSSZEFOGLALÁS"
        badgeColor="slate"
      >
        <TheoryTable
          headers={['Adott adatok', 'Jelölés', 'Egybevágóak?', 'Feltétel / Magyarázat']}
          rows={[
            ['3 oldal', 'o-o-o (SSS)', 'IGEN', 'Mindhárom oldal páronként egyenlő. Háromszög-egyenlőtlenség szükséges (a+b > c).'],
            ['2 oldal + közbezárt szög', 'o-sz-o (SAS)', 'IGEN', 'A szög a két megadott oldal között helyezkedik el.'],
            ['1 oldal + 2 szög', 'sz-o-sz (ASA/AAS)', 'IGEN', 'Bármelyik két szög egyenlősége elegendő, mert a harmadik 180° - (α+β).'],
            ['2 oldal + NAGYOBB szemközti szög', 'o-o-sz (SSA)', 'IGEN', 'Kifejezetten csak akkor, ha a szög a hosszabb oldallal szemközti (a ≥ b).'],
            ['2 oldal + KISEBB szemközti szög', 'SSA (hibás)', 'NEM BIZTOS', 'CSAPDA! 2 különböző háromszög is létezhet (1 tompaszögű és 1 hegyesszögű).'],
            ['3 szög', 'sz-sz-sz (AAA)', 'NEM', 'Csak HASONLÓAK! Méretük eltérhet (pl. 2-szeres nagyítás).']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
