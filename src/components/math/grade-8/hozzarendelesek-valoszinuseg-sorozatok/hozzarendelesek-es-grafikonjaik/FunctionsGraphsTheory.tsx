import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import {
  LineChart,
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Calculator,
  Compass,
  Maximize2,
  Table as TableIcon,
  HelpCircle,
  Sliders
} from 'lucide-react';

export interface FunctionsGraphsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const FunctionsGraphsTheory: React.FC<FunctionsGraphsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív labor állapota: f(x) = a * x + b
  const [aFactor, setAFactor] = useState<number>(2);
  const [bOffset, setBOffset] = useState<number>(-1);

  // Előre beállított minták
  const presets = [
    { label: 'f(x) = 2x - 1', a: 2, b: -1 },
    { label: 'f(x) = -x + 3', a: -1, b: 3 },
    { label: 'f(x) = 0,5x + 2', a: 0.5, b: 2 },
    { label: 'f(x) = -2x - 2', a: -2, b: -2 },
    { label: 'f(x) = 3 (konstans)', a: 0, b: 3 },
    { label: 'f(x) = x (alapfüggvény)', a: 1, b: 0 }
  ];

  // Koordináta-rendszer SVG méretezése (középpont: 150, 150; 1 egység = 22px)
  const originX = 150;
  const originY = 150;
  const unitPx = 22;

  // x pontok a vonal rajzolásához (-5.5-től +5.5-ig)
  const lineX1 = -5.5;
  const lineY1 = aFactor * lineX1 + bOffset;
  const lineX2 = 5.5;
  const lineY2 = aFactor * lineX2 + bOffset;

  // SVG koordináták (y tengely lefelé növekszik a képernyőn)
  const svgX1 = originX + lineX1 * unitPx;
  const svgY1 = originY - lineY1 * unitPx;
  const svgX2 = originX + lineX2 * unitPx;
  const svgY2 = originY - lineY2 * unitPx;

  // Y-tengelymetszet koordinátája: (0; b)
  const yInterceptSvgX = originX;
  const yInterceptSvgY = originY - bOffset * unitPx;

  // Zérushely számítása: a * x + b = 0 => x = -b / a (ha a !== 0)
  const hasZero = aFactor !== 0;
  const zeroX = hasZero ? -bOffset / aFactor : null;
  const zeroSvgX = zeroX !== null ? originX + zeroX * unitPx : null;
  const zeroSvgY = originY;

  // Meredekség lépésháromszög: (0; b) pontból 1 egység jobbra => fel/le a egységet
  const triStartX = originX;
  const triStartY = originY - bOffset * unitPx;
  const triCornerX = originX + 1 * unitPx;
  const triCornerY = triStartY;
  const triTargetX = triCornerX;
  const triTargetY = triStartY - aFactor * unitPx;

  // Táblázat adatai
  const tableXValues = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <TheoryTemplate
      title="Hozzárendelések és Grafikonjaik"
      subtitle="A lineáris függvény általános alakja: f(x) = ax + b, a meredekség (a), a tengelymetszet (b), a zérushely és a nevezetes függvények"
      badgeText="8. OSZTÁLY • VI. HOZZÁRENDELÉSEK • 📊 TANANYAG"
      documentId="functions-graphs-theory-doc"
      pdfFilename="8_osztaly_fuggvenyek_grafikonok_tananyag.pdf"
      quickRule={{
        label: 'Lineáris függvény alapegyenlete',
        formula: 'f(x) = a · x + b (a: meredekség, b: y-metszet)'
      }}
      themeColor="blue"
      practiceTitle="Gyakorold a függvények és grafikonok feladatait!"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben részletes levezetésekkel, zérushely- és meredekségszámítással!"
      practiceButtonText="Gyakorló Kvíz Indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onStartPractice={onStartQuiz}
    >
      {/* 1. RÉSZ: A HOZZÁRENDELÉS ÉS A LINEÁRIS FÜGGVÉNY ALAKJA */}
      <TheorySection
        title="1. A Hozzárendelés Fogalma és az f(x) = ax + b Alak"
        subtitle="Hogyan rendeljünk számokhoz számokat egyértelmű szabállyal, és mit jelentenek a paraméterek?"
        icon={<Activity className="w-5 h-5 text-blue-600" />}
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A matematikában <strong>függvénynek (hozzárendelésnek)</strong> nevezzük azt a szabályt, amely egy alaphalmaz (az <em>értelmezési tartomány</em>, <MathText>{"D_f"}</MathText>) minden egyes eleméhez pontosan egyetlen értéket rendel hozzá egy másik halmazból (az <em>értékkészlet</em>, <MathText>{"R_f"}</MathText>).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="Az Elsőfokú (Lineáris) Függvény"
            badge="Képlet"
            formula="f(x) = a · x + b"
            description="Az elsőfokú függvény hozzárendelési szabályában az x változó az 1. hatványon szerepel. Grafikonja a derékszögű koordináta-rendszerben mindig egy egyenes."
            properties={[
              'a: a meredekség (iránytényező), megadja a dőlést',
              'b: az y-tengelymetszet, eltolja az egyenest függőlegesen',
              'x: a független változó (bemenet)',
              'f(x) vagy y: a függő változó (hozzárendelt érték)'
            ]}
            themeColor="blue"
          />

          <TheoryCard
            title="A Megadási Módok és Értelmezés"
            badge="Formátumok"
            formula="Szabály ⟺ Táblázat ⟺ Grafikon"
            description="Ugyanazt a függvénykapcsolatot négyféle egyenértékű módon fejezhetjük ki:"
            properties={[
              'Hozzárendelési szabállyal: f(x) = 2x - 3 vagy x ↦ 2x - 3',
              'Értéktáblázattal: x és az összetartozó f(x) értékpárok sora',
              'Koordináta-rendszerben pontok halmazaként (grafikon)',
              'Szöveges megfogalmazással: „minden számnak a kétszeresénél 3-mal kevesebb”'
            ]}
            themeColor="blue"
          />
        </div>

        <TheoryCallout type="info" title="Mi a különbség az egyenes arányosság és az általános lineáris függvény között?">
          Az egyenes arányosság (<MathText>{"y = k · x"}</MathText>) a lineáris függvény egy <strong>speciális esete</strong>, ahol a tengelymetszet <MathText>{"b = 0"}</MathText>. Az egyenes arányosság grafikonja mindig átmegy a <MathText>{"(0; 0)"}</MathText> origón, míg az általános lineáris függvény (<MathText>{"y = ax + b"}</MathText>) a <MathText>{"b"}</MathText> értékével fel- vagy le van tolva az origóhoz képest!
        </TheoryCallout>
      </TheorySection>

      {/* 2. RÉSZ: INTERAKTÍV FÜGGVÉNY- ÉS GRAFIKONLABOR */}
      <TheorySection
        title="2. Interaktív Labor: Meredekség (a) és Tengelymetszet (b)"
        subtitle="Kísérletezz a csúszkákkal és figyeld meg az egyenes elfordulását, eltolását és zérushelyét valós időben!"
        icon={<Sliders className="w-5 h-5 text-blue-600" />}
      >
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Valós Idejű Szimuláció
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                Az <span className="font-mono text-blue-600 dark:text-blue-400">
                  f(x) = {aFactor === 0 ? '' : aFactor === 1 ? 'x' : aFactor === -1 ? '-x' : `${aFactor}x`}
                  {bOffset > 0 ? (aFactor === 0 ? `${bOffset}` : ` + ${bOffset}`) : bOffset < 0 ? ` - ${Math.abs(bOffset)}` : aFactor === 0 ? '0' : ''}
                </span> függvény grafikonja
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs rounded-xl border border-blue-300 dark:border-blue-800">
                a = {aFactor}
              </span>
              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 font-mono font-bold text-xs rounded-xl border border-amber-300 dark:border-amber-800">
                b = {bOffset}
              </span>
              {hasZero && zeroX !== null && (
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs rounded-xl border border-emerald-300 dark:border-emerald-800">
                  Zérushely: x = {Number(zeroX.toFixed(2))}
                </span>
              )}
            </div>
          </div>

          {/* Gyorsbeállító gombok */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {presets.map((preset) => {
              const isSelected = aFactor === preset.a && bOffset === preset.b;
              return (
                <button
                  key={preset.label}
                  onClick={() => {
                    setAFactor(preset.a);
                    setBOffset(preset.b);
                  }}
                  className={`px-2.5 py-2 text-xs font-bold rounded-xl border transition-all text-center ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-102'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Manuális vezérlő csúszkák */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600 dark:text-slate-300">Meredekség (a): {aFactor}</span>
                <span className="text-slate-400">Dőlésszög</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.5"
                value={aFactor}
                onChange={(e) => setAFactor(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>-3 (meredek lejtő)</span>
                <span>0 (vízszintes)</span>
                <span>+3 (meredek emelkedő)</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600 dark:text-slate-300">Y-tengelymetszet (b): {bOffset}</span>
                <span className="text-slate-400">Függőleges eltolás</span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="1"
                value={bOffset}
                onChange={(e) => setBOffset(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>-4 (lefelé tolva)</span>
                <span>0 (origóban metsz)</span>
                <span>+4 (felfelé tolva)</span>
              </div>
            </div>
          </div>

          {/* SVG és kiértékelés oszlopok */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative p-2 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner w-full max-w-[340px]">
                <svg viewBox="0 0 300 300" className="w-full h-auto select-none overflow-hidden">
                  {/* Négyzetháló */}
                  {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((tick) => (
                    <React.Fragment key={`grid-${tick}`}>
                      <line
                        x1={originX + tick * unitPx}
                        y1="10"
                        x2={originX + tick * unitPx}
                        y2="290"
                        stroke="#e2e8f0"
                        strokeWidth="0.8"
                        strokeDasharray={tick === 0 ? undefined : '2 2'}
                        className="dark:stroke-slate-800"
                      />
                      <line
                        x1="10"
                        y1={originY + tick * unitPx}
                        x2="290"
                        y2={originY + tick * unitPx}
                        stroke="#e2e8f0"
                        strokeWidth="0.8"
                        strokeDasharray={tick === 0 ? undefined : '2 2'}
                        className="dark:stroke-slate-800"
                      />
                    </React.Fragment>
                  ))}

                  {/* Tengelyek */}
                  <line x1="10" y1={originY} x2="290" y2={originY} stroke="#475569" strokeWidth="2" />
                  <polygon points="290,150 282,146 282,154" fill="#475569" />
                  <text x="284" y="165" className="text-[10px] font-black fill-slate-600 dark:fill-slate-400">x</text>

                  <line x1={originX} y1="290" x2={originX} y2="10" stroke="#475569" strokeWidth="2" />
                  <polygon points="150,10 146,18 154,18" fill="#475569" />
                  <text x="135" y="18" className="text-[10px] font-black fill-slate-600 dark:fill-slate-400">y</text>

                  {/* Számozás */}
                  {[-4, -2, 2, 4].map((n) => (
                    <text
                      key={`xtick-${n}`}
                      x={originX + n * unitPx}
                      y={originY + 13}
                      textAnchor="middle"
                      className="text-[8px] font-bold fill-slate-400"
                    >
                      {n}
                    </text>
                  ))}
                  {[-4, -2, 2, 4].map((n) => (
                    <text
                      key={`ytick-${n}`}
                      x={originX - 10}
                      y={originY - n * unitPx + 3}
                      textAnchor="end"
                      className="text-[8px] font-bold fill-slate-400"
                    >
                      {n}
                    </text>
                  ))}

                  {/* Meredekség lépésháromszög ha a !== 0 */}
                  {aFactor !== 0 && (
                    <>
                      <line x1={triStartX} y1={triStartY} x2={triCornerX} y2={triCornerY} stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="3 2" />
                      <line x1={triCornerX} y1={triCornerY} x2={triTargetX} y2={triTargetY} stroke="#ea580c" strokeWidth="1.8" strokeDasharray="3 2" />
                      <text x={originX + 10} y={triStartY - 4} className="text-[7.5px] font-black fill-amber-600">+1</text>
                      <text
                        x={triCornerX + (aFactor > 0 ? 5 : -14)}
                        y={(triCornerY + triTargetY) / 2 + 2}
                        className="text-[7.5px] font-black fill-orange-600"
                      >
                        {aFactor > 0 ? `+${aFactor}` : aFactor}
                      </text>
                    </>
                  )}

                  {/* Egyenes vonala */}
                  <line
                    x1={svgX1}
                    y1={svgY1}
                    x2={svgX2}
                    y2={svgY2}
                    stroke="#2563eb"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Y-metszet pont: (0; b) */}
                  <circle cx={yInterceptSvgX} cy={yInterceptSvgY} r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                  <text
                    x={yInterceptSvgX - (bOffset === 0 ? 18 : 12)}
                    y={yInterceptSvgY + 4}
                    textAnchor="end"
                    className="text-[7.5px] font-black fill-amber-700 dark:fill-amber-300"
                  >
                    (0; {bOffset})
                  </text>

                  {/* Zérushely pont ha a koordinátákon belül van */}
                  {zeroSvgX !== null && Math.abs(zeroX || 0) <= 6 && (
                    <>
                      <circle cx={zeroSvgX} cy={zeroSvgY} r="4" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                      <text
                        x={zeroSvgX}
                        y={zeroSvgY + (bOffset < 0 ? -6 : 14)}
                        textAnchor="middle"
                        className="text-[7.5px] font-black fill-emerald-700 dark:fill-emerald-300"
                      >
                        Zéró ({Number((zeroX || 0).toFixed(1))}; 0)
                      </text>
                    </>
                  )}
                </svg>
              </div>
            </div>

            {/* Tulajdonságok és értéktáblázat */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Függvényelemzés Pontról Pontra
                </h4>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">Meredekség (a):</span>
                    <strong className={aFactor > 0 ? 'text-emerald-600' : aFactor < 0 ? 'text-rose-600' : 'text-blue-600'}>
                      {aFactor > 0 ? 'Szigorúan növekvő (a > 0)' : aFactor < 0 ? 'Szigorúan csökkenő (a < 0)' : 'Konstans, vízszintes (a = 0)'}
                    </strong>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">Y-tengelymetszet:</span>
                    <strong className="text-amber-600 font-mono">(0; {bOffset})</strong>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">Zérushely (f(x) = 0):</span>
                    <strong className="text-emerald-600 font-mono">
                      {hasZero && zeroX !== null ? `x = ${Number(zeroX.toFixed(2))}` : 'Nincs (párhuzamos az x-tengellyel)'}
                    </strong>
                  </div>

                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Origón átmegy?</span>
                    <strong>{bOffset === 0 ? 'Igen (b = 0, egyenes arányosság)' : 'Nem (b ≠ 0)'}</strong>
                  </div>
                </div>
              </div>

              {/* Értéktáblázat */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-center border-collapse bg-white dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                  <thead>
                    <tr className="bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 border-b border-slate-200 dark:border-slate-800">
                      <th className="py-1.5 px-2 font-bold border-r border-slate-200 dark:border-slate-800">x</th>
                      {tableXValues.map((val) => (
                        <th key={`th-x-${val}`} className="py-1.5 px-2 font-semibold">
                          {val}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-slate-800 dark:text-slate-200">
                      <td className="py-1.5 px-2 font-bold bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-blue-700 dark:text-blue-300">
                        f(x)
                      </td>
                      {tableXValues.map((val) => (
                        <td
                          key={`td-y-${val}`}
                          className={`py-1.5 px-2 font-mono font-medium ${
                            val === 0 ? 'bg-amber-100/60 dark:bg-amber-900/30 font-bold text-amber-700' : ''
                          }`}
                        >
                          {aFactor * val + bOffset}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. RÉSZ: ZÉRUSHELY ÉS PÁRHUZAMOS EGYENESEK */}
      <TheorySection
        title="3. A Zérushely és a Párhuzamos Egyenesek"
        subtitle="Hogyan számoljuk ki algebrai úton az x-tengelymetszetet, és mikor nem metszi két egyenes egymást?"
        icon={<Compass className="w-5 h-5 text-blue-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="A Zérushely Kiszámítása"
            badge="X-Metszet"
            formula="f(x) = 0 ⟺ ax + b = 0 ⟺ x = -b / a"
            description="A zérushely az a bemeneti x érték, ahol a függvény értéke (y) pontosan nulla. Geometriailag itt metszi a grafikon az x-tengelyt."
            properties={[
              'Példa: f(x) = 2x - 8 zérushelye: 2x - 8 = 0 => 2x = 8 => x = 4',
              'Koordinátája az x-tengelyen: (x₀; 0), pl. (4; 0)',
              'Ha a = 0 és b ≠ 0: nincs zérushely (vízszintes egyenes nem metszi az x tengelyt)'
            ]}
            themeColor="emerald"
          />

          <TheoryCard
            title="Párhuzamos és Metsző Egyenesek"
            badge="Geometriai Szabály"
            formula="a₁ = a₂ ⟺ e₁ ∥ e₂"
            description="Két egyenes kölcsönös helyzetét a derékszögű síkban a meredekségeik határozzák meg:"
            properties={[
              'Párhuzamosak: ha a₁ = a₂ és b₁ ≠ b₂ (pl. y = 3x + 1 és y = 3x - 5)',
              'Egybeesők: ha a₁ = a₂ és b₁ = b₂ (ugyanaz a függvény)',
              'Metszők: ha a₁ ≠ a₂ (mindig pontosan egyetlen metszéspontjuk van!)',
              'Merőlegesek: ha a₁ · a₂ = -1 (pl. y = 2x és y = -0,5x)'
            ]}
            themeColor="blue"
          />
        </div>

        <TheoryCallout type="warning" title="Gyakori tévesztés: Zérushely vs. Y-tengelymetszet!">
          Nagyon fontos, hogy ne keverd össze a két metszéspontot:
          <br />
          • Az <strong>Y-tengelymetszetnél</strong> <MathText>{"x = 0"}</MathText>, és a pont koordinátája <MathText>{"(0; b)"}</MathText>. Ezt a képletből azonnal leolvashatod a konstans tagból!
          <br />
          • A <strong>zérushelynél (X-tengelymetszetnél)</strong> az <MathText>{"y = 0"}</MathText>, és egyenletet kell megoldanod: <MathText>{"ax + b = 0"}</MathText>. A pont koordinátája <MathText>{"(x_0; 0)"}</MathText>!
        </TheoryCallout>
      </TheorySection>

      {/* 4. RÉSZ: NEVEZETES FÜGGVÉNYEK 8. OSZTÁLYBAN */}
      <TheorySection
        title="4. Nevezetes Függvények a 8. Osztályos Tananyagban"
        subtitle="A másodfokú alapfüggvény és az abszolútérték-függvény jellegzetes alakja"
        icon={<Layers className="w-5 h-5 text-blue-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <TheoryCard
            title="f(x) = x² (Másodfokú)"
            badge="Parabola"
            formula="f(x) = x^2"
            description="Minden számhoz a négyzetét rendeli hozzá. Grafikonja parabola, amely az y-tengelyre szimmetrikus."
            properties={[
              'Tengelypont (minimum): (0; 0) origó',
              'Értékkészlete: nemnegatív számok (y ≥ 0)',
              'x < 0 esetén csökkenő, x > 0 esetén növekvő',
              'Értékpárok: (-2; 4), (-1; 1), (0; 0), (1; 1), (2; 4)'
            ]}
            themeColor="indigo"
          />

          <TheoryCard
            title="f(x) = |x| (Abszolútérték)"
            badge="„V” Alakzat"
            formula="f(x) = |x|"
            description="Minden számhoz az abszolútértékét (nullától vett távolságát) rendeli. Grafikonja egy origóban törő „V” alakú vonal."
            properties={[
              'Csúcspontja az origóban van: (0; 0)',
              'Nemnegatív értékek: |x| ≥ 0 minden x-re',
              'Két félegyenesből áll: y = -x (balra) és y = x (jobbra)',
              'Értékpárok: (-3; 3), (-1; 1), (0; 0), (1; 1), (3; 3)'
            ]}
            themeColor="cyan"
          />

          <TheoryCard
            title="f(x) = c (Konstans)"
            badge="Vízszintes Egyenes"
            formula="f(x) = c (a = 0)"
            description="Bármi is legyen a bemeneti x érték, a függvény értéke mindig állandó c szám. Grafikonja vízszintes egyenes."
            properties={[
              'Meredeksége: a = 0 (nem dől se fel, se le)',
              'Párhuzamos az x-tengellyel (távolsága |c|)',
              'Példa: f(x) = 3 egyenes a (0; 3) ponton át',
              'Ha c ≠ 0, egyáltalán nincs zérushelye'
            ]}
            themeColor="blue"
          />
        </div>
      </TheorySection>

      {/* 5. RÉSZ: TIPIKUS HIBÁK ÉS CSAPDÁK */}
      <TheorySection
        title="5. Tipikus Buktatók és Hogyan Kerüld El Őket"
        subtitle="A dolgozatokban leggyakrabban előforduló meredekség- és előjelhibák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
      >
        <div className="space-y-4">
          <TheoryTrapBox
            trap="A meredekség leolvasása: x együtthatója vagy az első tag?"
            wrong="Az f(x) = 7 - 2x függvény meredeksége 7, mert az van elöl."
            wrongExplanation="HIBA: A meredekség MINDIG az x szorzótényezője (előjellel együtt!), nem pedig a sorrendben első szám!"
            correct="Az x szorzója itt a = -2, az y-tengelymetszet pedig b = 7."
            correctExplanation="Átírva f(x) = -2x + 7 alakra egyértelmű, hogy a = -2 és b = 7. A függvény csökkenő!"
            tip="Mindig keresd meg az x betűt: ami közvetlenül előtte áll (előjellel együtt), az a meredekség!"
          />

          <TheoryTrapBox
            trap="Pont illeszkedésének ellenőrzése: felcserélt koordináták!"
            wrong="A P(2; -1) pont illeszkedik-e az y = 3x - 7 egyenesre? Behelyettesítés: 2 = 3 · (-1) - 7 => 2 = -10 (hibás sorrend)."
            wrongExplanation="HIBA: A pont koordinátái P(x; y), vagyis x = 2 és y = -1! Nem szabad felcserélni a két értéket!"
            correct="Helyes behelyettesítés: y helyére -1, x helyére 2 kerül: -1 = 3 · 2 - 7 => -1 = 6 - 7 = -1. Igaz!"
            correctExplanation="Mivel a kapott egyenlőség igaz (-1 = -1), a P pont rajta van az egyenesen."
            tip="Mindig írd a pont fölé: (x ; y), hogy ne keverd össze a koordinátákat!"
          />

          <TheoryTrapBox
            trap="Negatív előjel a zérushely számításánál"
            wrong="Az f(x) = -3x + 12 zérushelye x = -4, mert -3 · (-4) = 12."
            wrongExplanation="HIBA: -3 · (-4) + 12 = 12 + 12 = 24 ≠ 0! Nem lett nulla a függvényérték!"
            correct="Egyenletrendezés: -3x + 12 = 0 => 12 = 3x => x = 4."
            correctExplanation="Ellenőrzés: f(4) = -3 · 4 + 12 = -12 + 12 = 0. A helyes zérushely x = 4!"
            tip="Ha a meredekség negatív, add hozzá a tagot mindkét oldalhoz az egyenletrendezéskor!"
          />
        </div>
      </TheorySection>

      {/* 6. RÉSZ: KIDOLGOZOTT MINTAPÉLDÁK */}
      <TheorySection
        title="6. Kidolgozott Mintapéldák Lépésről Lépésre"
        subtitle="Gyakorlati feladatok levezetése és ellenőrzése"
        icon={<Calculator className="w-5 h-5 text-blue-600" />}
      >
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-bold text-xs rounded-full">
                1. MINTAPÉLDA
              </span>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Függvény Hozzárendelési Szabályának Felírása Két Pontból
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Egy egyenes átmegy az <MathText>{"A(0; -3)"}</MathText> és a <MathText>{"B(2; 5)"}</MathText> pontokon. Írd fel a függvény hozzárendelési szabályát, és határozd meg a zérushelyét!
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs">
              <div className="font-bold text-slate-700 dark:text-slate-300">Lépésről lépésre:</div>
              <div className="space-y-2 text-slate-600 dark:text-slate-400">
                <div>
                  <strong>1. Lépés: Tengelymetszet (b):</strong>
                  <br />
                  Mivel a grafikon átmegy az <MathText>{"A(0; -3)"}</MathText> ponton (<MathText>{"x = 0"}</MathText>), ez maga az y-tengelymetszet: <strong>b = -3</strong>.
                </div>
                <div>
                  <strong>2. Lépés: Meredekség (a):</strong>
                  <br />
                  A képlet: <MathText>{"f(x) = ax - 3"}</MathText>. Helyettesítsük be a <MathText>{"B(2; 5)"}</MathText> pont koordinátáit:
                  <div className="my-1 font-mono font-bold text-blue-700 dark:text-blue-300">
                    <MathText>{"5 = a · 2 - 3 ⟹ 8 = 2a ⟹ a = 4"}</MathText>
                  </div>
                  A keresett hozzárendelési szabály tehát: <strong>f(x) = 4x - 3</strong>.
                </div>
                <div>
                  <strong>3. Lépés: Zérushely:</strong>
                  <br />
                  Ahol <MathText>{"f(x) = 0"}</MathText>:
                  <div className="my-1 font-mono font-bold text-emerald-700 dark:text-emerald-300">
                    <MathText>{"4x - 3 = 0 ⟹ 4x = 3 ⟹ x = 3/4 = 0,75"}</MathText>
                  </div>
                </div>
                <p className="text-emerald-600 font-bold">
                  Válasz: A szabály f(x) = 4x - 3, a zérushely pedig x = 0,75.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-bold text-xs rounded-full">
                2. MINTAPÉLDA
              </span>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Párhuzamos Egyenes Keresése Adott Ponton Keresztül
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Add meg annak az egyenesnek az egyenletét, amely párhuzamos az <MathText>{"y = -2x + 7"}</MathText> egyenessel, és átmegy a <MathText>{"P(3; 4)"}</MathText> ponton!
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs">
              <div className="space-y-2 text-slate-600 dark:text-slate-400">
                <div>
                  <strong>1. Lépés:</strong> A párhuzamosság feltétele, hogy a meredekségek megegyeznek: <strong>a = -2</strong>.
                  Az egyenlet alakja: <MathText>{"y = -2x + b"}</MathText>.
                </div>
                <div>
                  <strong>2. Lépés:</strong> Helyettesítsük be a <MathText>{"P(3; 4)"}</MathText> pont koordinátáit (<MathText>{"x = 3, y = 4"}</MathText>):
                  <div className="my-1 font-mono font-bold text-indigo-700 dark:text-indigo-300">
                    <MathText>{"4 = -2 · 3 + b ⟹ 4 = -6 + b ⟹ b = 10"}</MathText>
                  </div>
                </div>
                <p className="text-emerald-600 font-bold">
                  Válasz: A keresett párhuzamos egyenes egyenlete y = -2x + 10.
                </p>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FunctionsGraphsTheory;
