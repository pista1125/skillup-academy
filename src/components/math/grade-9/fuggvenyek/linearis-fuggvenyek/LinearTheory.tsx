import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  LinearGeneralFormSvg,
  FastPlottingSvg,
  LinearParametersSvg
} from './LinearFigures';
import {
  TrendingUp,
  Sliders,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Compass,
  ArrowRight,
  Calculator,
  Zap,
  Target
} from 'lucide-react';

interface LinearTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const LinearTheory: React.FC<LinearTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV LINEÁRIS FÜGGVÉNY LABOR ---
  const [slopeM, setSlopeM] = useState<number>(2);
  const [interceptB, setInterceptB] = useState<number>(-1);

  // Zérushely számítása: mx + b = 0 -> x = -b / m
  const isConstant = slopeM === 0;
  const zeroPoint = isConstant ? null : -interceptB / slopeM;

  // Koordináta transzformáció: SVG 320 x 240, origó (160, 120), 1 egység = 22px
  const toSvgX = (x: number) => 160 + x * 22;
  const toSvgY = (y: number) => 120 - y * 22;

  return (
    <TheoryTemplate
      title="9. Lineáris függvények"
      subtitle="Az elsőfokú függvény általános alakja f(x) = mx + b, a zérushely algebrai kiszámítása, gyors ábrázolás táblázat nélkül és a konstans függvények."
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      estimatedTime="25-30 perc"
      quickRule={{
        label: "A lineáris függvény alapegyenlete",
        formula: "f(x) = m · x + b  ➔  m: meredekség, b: y-tengelymetszet (0; b)",
        align: "right"
      }}
    >
      {/* 1. SZEKCIÓ: ÁLTALÁNOS ALAK ÉS PARAMÉTEREK */}
      <TheorySection
        title="Az általános alak: f(x) = mx + b"
        subtitle="Mit jelentenek a paraméterek, és hogyan határozzák meg az egyenes elhelyezkedését?"
        icon={<TrendingUp className="w-6 h-6 text-purple-500" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4 text-slate-700 leading-relaxed text-xs">
            <p className="text-sm">
              Minden olyan valós függvényt, amelynek hozzárendelési szabálya <code className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded font-mono font-bold text-base">f(x) = m·x + b</code> alakú,
              <strong> lineáris függvénynek</strong> nevezünk. Grafikonja mindig egy egyenes vonal.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1">
                <span className="font-black text-purple-900 uppercase tracking-wider block">
                  'm' = Meredekség (iránymutató)
                </span>
                <p>
                  Megadja az egyenes meredekségét: 1 egységet jobbra lépve <code className="font-mono font-bold text-purple-800">m</code> egységet emelkedik (ha m &gt; 0) vagy süllyed (ha m &lt; 0).
                </p>
              </div>
              <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1">
                <span className="font-black text-rose-900 uppercase tracking-wider block">
                  'b' = y-tengelymetszet
                </span>
                <p>
                  Megmutatja, hol metszi az egyenes az y tengelyt: a metszéspont mindig az <code className="font-mono font-bold text-rose-800">M_y(0; b)</code> koordinátájú pont.
                </p>
              </div>
            </div>
            <p className="text-slate-600 italic">
              • Ha <code className="font-bold">b = 0</code>: a függvény <code className="font-bold">f(x) = mx</code> (egyenes arányosság, átmegy az origón).
              <br />
              • Ha <code className="font-bold">m = 0</code>: a függvény <code className="font-bold">f(x) = b</code> (konstans függvény, vízszintes egyenes).
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <LinearGeneralFormSvg size={280} />
            <span className="text-xs text-slate-500 mt-2 text-center">
              Az f(x) = mx + b geometriai felépítése: (0; b) metszet, irányháromszög és zérushely
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: INTERAKTÍV LINEÁRIS FÜGGVÉNY LABOR */}
      <TheorySection
        title="Interaktív Lineáris Függvény Labor"
        subtitle="Módosítsd az m meredekséget és a b tengelymetszetet, figyeld a grafikon forgását és a zérushely elmozdulását!"
        icon={<Sliders className="w-6 h-6 text-purple-500" />}
      >
        <div className="bg-gradient-to-br from-purple-50/40 via-white to-blue-50/40 p-6 rounded-2xl border border-purple-100 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* m meredekség vezérlő */}
            <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Meredekség (m):
                </label>
                <span className={`font-mono font-black text-xs px-2 py-0.5 rounded ${
                  slopeM > 0 ? 'bg-emerald-100 text-emerald-800' : slopeM < 0 ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  m = {slopeM}
                </span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.5"
                value={slopeM}
                onChange={(e) => setSlopeM(parseFloat(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>m = -3 (süllyedő)</span>
                <span>m = 0 (vízszintes)</span>
                <span>m = +3 (emelkedő)</span>
              </div>
            </div>

            {/* b tengelymetszet vezérlő */}
            <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Y-tengelymetszet (b):
                </label>
                <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                  b = {interceptB}
                </span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="1"
                value={interceptB}
                onChange={(e) => setInterceptB(parseInt(e.target.value, 10))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>b = -4 (alul metszi)</span>
                <span>b = 0 (origó)</span>
                <span>b = +4 (felül metszi)</span>
              </div>
            </div>
          </div>

          {/* Vizualizáció + Algebrai Elemzés */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG koordinátasík */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-200 shadow-inner">
              <svg
                width={320}
                height={240}
                viewBox="0 0 320 240"
                className="select-none bg-slate-50 rounded-lg"
              >
                {/* Rács */}
                {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={`lx-${i}`}
                    x1={toSvgX(i)}
                    y1={10}
                    x2={toSvgX(i)}
                    y2={230}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                ))}
                {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={`ly-${i}`}
                    x1={20}
                    y1={toSvgY(i)}
                    x2={300}
                    y2={toSvgY(i)}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                ))}

                {/* Főtengelyek */}
                <line x1={20} y1={120} x2={300} y2={120} stroke="#475569" strokeWidth="2" />
                <line x1={160} y1={10} x2={160} y2={230} stroke="#475569" strokeWidth="2" />
                <text x={295} y={115} fill="#475569" fontSize="11" fontWeight="bold">x</text>
                <text x={166} y={20} fill="#475569" fontSize="11" fontWeight="bold">y</text>
                <text x={164} y={134} fill="#94a3b8" fontSize="10">0</text>

                {/* Egyenes vonal */}
                <line
                  x1={toSvgX(-5)}
                  y1={toSvgY(slopeM * -5 + interceptB)}
                  x2={toSvgX(5)}
                  y2={toSvgY(slopeM * 5 + interceptB)}
                  stroke="#7c3aed"
                  strokeWidth="3"
                />

                {/* Irányháromszög (ha m != 0) */}
                {!isConstant && (
                  <>
                    <line
                      x1={toSvgX(0)}
                      y1={toSvgY(interceptB)}
                      x2={toSvgX(1)}
                      y2={toSvgY(interceptB)}
                      stroke="#059669"
                      strokeWidth="1.8"
                      strokeDasharray="3 2"
                    />
                    <line
                      x1={toSvgX(1)}
                      y1={toSvgY(interceptB)}
                      x2={toSvgX(1)}
                      y2={toSvgY(interceptB + slopeM)}
                      stroke="#2563eb"
                      strokeWidth="1.8"
                      strokeDasharray="3 2"
                    />
                    <circle cx={toSvgX(1)} cy={toSvgY(interceptB + slopeM)} r={3.5} fill="#2563eb" />
                  </>
                )}

                {/* y-metszet M_y(0; b) */}
                <circle cx={toSvgX(0)} cy={toSvgY(interceptB)} r={5.5} fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                <text x={toSvgX(0) - 30} y={toSvgY(interceptB) - 6} fill="#b91c1c" fontSize="10" fontWeight="bold">
                  (0; {interceptB})
                </text>

                {/* Zérushely (x0; 0) */}
                {zeroPoint !== null && zeroPoint >= -5 && zeroPoint <= 5 && (
                  <>
                    <circle cx={toSvgX(zeroPoint)} cy={toSvgY(0)} r={5} fill="#d97706" stroke="#ffffff" strokeWidth="1.5" />
                    <text x={toSvgX(zeroPoint) + 5} y={toSvgY(0) + 14} fill="#b45309" fontSize="10" fontWeight="bold">
                      x₀={zeroPoint.toFixed(1)}
                    </text>
                  </>
                )}
              </svg>
              <div className="flex items-center gap-4 text-xs mt-2 text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /> y-metszet: (0; {interceptB})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  {zeroPoint !== null ? `Zérushely: x₀ = ${zeroPoint.toFixed(2)}` : 'Nincs zérushely'}
                </span>
              </div>
            </div>

            {/* Kiértékelő kártyák */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5 text-xs font-mono">
                <span className="font-sans font-bold text-slate-700 uppercase tracking-wider block text-[11px]">
                  Függvény egyenlete:
                </span>
                <p className="text-base font-bold text-purple-700 font-mono">
                  f(x) = {slopeM !== 0 ? `${slopeM}x` : ''} {interceptB >= 0 && slopeM !== 0 ? `+ ${interceptB}` : interceptB < 0 ? `- ${Math.abs(interceptB)}` : slopeM === 0 ? interceptB : ''}
                </p>
                <div className="pt-2 border-t border-slate-100 space-y-1 text-slate-600">
                  <p>Meredekség: <span className="font-bold text-slate-800">m = {slopeM}</span></p>
                  <p>y-tengelymetszet: <span className="font-bold text-rose-700">M_y(0; {interceptB})</span></p>
                  <p>
                    Zérushely: {zeroPoint !== null ? (
                      <span className="font-bold text-amber-700">x₀ = -b/m = -({interceptB})/{slopeM} = {zeroPoint.toFixed(2)}</span>
                    ) : interceptB === 0 ? (
                      <span className="font-bold text-emerald-700">Minden valós szám zérushely (f(x) = 0)</span>
                    ) : (
                      <span className="font-bold text-rose-700">Nincs zérushely (f(x) = {interceptB} ≠ 0)</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-purple-50/60 border border-purple-200 rounded-xl space-y-1 text-xs">
                <span className="font-bold text-purple-900 uppercase tracking-wider block text-[11px]">
                  Függvénytani Jellemzés:
                </span>
                <p className="text-slate-700">
                  • <strong>Értelmezési tartomány:</strong> <code className="font-bold font-mono">D_f = ℝ</code>
                </p>
                <p className="text-slate-700">
                  • <strong>Értékkészlet:</strong> {isConstant ? (
                    <code className="font-bold font-mono text-purple-800">R_f = {'{'}{interceptB}{'}'} (egyetlen érték)</code>
                  ) : (
                    <code className="font-bold font-mono">R_f = ℝ (minden valós szám)</code>
                  )}
                </p>
                <p className="text-slate-700">
                  • <strong>Monotonitás:</strong> {slopeM > 0 ? 'Szigorúan növekvő' : slopeM < 0 ? 'Szigorúan csökkenő' : 'Konstans (állandó)'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: GYORS GRAFIKONRAJZOLÁS TÁBLÁZAT NÉLKÜL */}
      <TheorySection
        title="Gyors grafikonrajzolás 3 másodperc alatt"
        subtitle="Hogyan rajzolhatunk le bármilyen lineáris függvényt pillanatok alatt, értéktáblázat számolgatása nélkül?"
        icon={<Zap className="w-6 h-6 text-purple-500" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3 text-slate-700 leading-relaxed text-xs">
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
              <strong className="text-rose-900 text-sm block mb-0.5">1. Lépés: A b felmérése az y tengelyre</strong>
              Keresd meg a függőleges y tengelyen a <code className="font-bold">(0; b)</code> pontot. Ez a kiindulópontod!
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <strong className="text-blue-900 text-sm block mb-0.5">2. Lépés: Lépcsőzés a meredekséggel</strong>
              A kiindulópontból lépj <strong>1 egységet jobbra (+1)</strong>, majd:
              <br />
              • Ha <code className="font-bold">m &gt; 0</code>: lépj <code className="font-bold">m</code> egységet felfelé.
              <br />
              • Ha <code className="font-bold">m &lt; 0</code>: lépj <code className="font-bold">|m|</code> egységet lefelé.
              <br />
              • Ha <code className="font-bold">m tört (pl. 2/3)</code>: a nevezőnyit (3) lépsz jobbra, és a számlálónyit (2) fel!
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <strong className="text-emerald-900 text-sm block mb-0.5">3. Lépés: Az egyenes meghúzása</strong>
              A megkapott két pontot vonalzóval kösd össze, és húzd át mindkét irányban. Kész a pontos grafikon!
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <FastPlottingSvg size={280} />
            <span className="text-xs text-slate-500 mt-2 text-center">
              Gyors ábrázolás algoritmusa táblázat nélkül
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: A ZÉRUSHELY KISZÁMÍTÁSA */}
      <TheorySection
        title="A zérushely algebrai és geometriai jelentése"
        subtitle="Hol metszi a grafikon az x tengelyt?"
        icon={<Target className="w-6 h-6 text-purple-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A zérushely definíciója"
            subtitle="f(x) = 0 megoldása"
            icon={<Calculator className="w-5 h-5 text-purple-600" />}
          >
            <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
              <p>A zérushely az a független változó érték (<code className="font-bold font-mono">x₀</code>), amelynél a függvény értéke 0 lesz:</p>
              <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-lg font-mono text-center text-purple-900 font-bold text-sm">
                m · x + b = 0 &nbsp;➔&nbsp; x₀ = -b / m &nbsp;(ha m ≠ 0)
              </div>
              <p>
                <strong>Geometriai jelentés:</strong> A grafikon és az <strong>x tengely</strong> metszéspontjának első koordinátája: <code className="font-bold font-mono">M_x(-b/m; 0)</code>.
              </p>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Mintapélda levezetéssel"
            subtitle="f(x) = 3x - 12 zérushelye"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          >
            <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
              <p>Írjuk fel az egyenletet és oldjuk meg lépésről lépésre:</p>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono space-y-1 text-slate-800">
                <p>3x - 12 = 0</p>
                <p>3x = 12 &nbsp;&nbsp;(hozzáadtunk 12-t)</p>
                <p className="font-bold text-emerald-700">x₀ = 4 &nbsp;&nbsp;(osztottunk 3-mal)</p>
              </div>
              <p>
                A grafikon az <code className="font-bold font-mono">(4; 0)</code> pontban metszi az x tengelyt.
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: GYAKORI TÉVEDÉSEK */}
      <TheorySection
        title="Gyakori tévedések és buktatók"
        subtitle="Ne hagyd magad becsapni a dolgozatban!"
        icon={<AlertTriangle className="w-6 h-6 text-amber-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. 'm' és 'b' összekeverése fordított sorrendnél"
            trap="Az f(x) = 5 - 2x függvénynél azt mondjuk, hogy m = 5 és b = -2."
            solution="Az 'm' mindig az x EGYÜTTHATÓJA (szorzója), a 'b' pedig a magában álló konstans! Itt m = -2 és b = 5."
          />
          <TheoryTrapBox
            title="2. Zérushely előjelhibája"
            trap="Az f(x) = 2x + 6 zérushelyét x₀ = +6 / 2 = +3-nak számoljuk."
            solution="A képletben mínusz előjel van: x₀ = -b / m = -6 / 2 = -3! Ellenőrzés: f(-3) = 2·(-3) + 6 = -6 + 6 = 0."
          />
          <TheoryTrapBox
            title="3. Tört meredekség lépésirányai"
            trap="m = 3/4 esetén 3-at lépünk jobbra és 4-et fel."
            solution="A nevező a vízszintes (Δx), a számláló a függőleges (Δy)! Tehát 4-et lépünk jobbra, és 3-at fel."
          />
          <TheoryTrapBox
            title="4. Konstans függvény értékkészlete"
            trap="Az f(x) = 4 konstans függvény értékkészlete R_f = [0; 4]."
            solution="Mivel a függvény bármilyen x-re kizárólag a 4-et adja eredményül, az értékkészlet egyetlen elemből áll: R_f = {4}!"
          />
        </div>
      </TheorySection>

      {/* 6. SZEKCIÓ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        title="Lineáris függvények összefoglaló táblázata"
        subtitle="Minden fontos képlet és jellemző áttekintése"
        icon={<Lightbulb className="w-6 h-6 text-purple-500" />}
      >
        <TheoryTable
          headers={['Típus', 'Képlet', 'Meredekség (m)', 'Tengelymetszetek', 'Monotonitás', 'Értékkészlet (Rf)']}
          rows={[
            ['Elsőfokú növekvő', 'f(x) = mx + b', 'm > 0', 'My(0; b), Mx(-b/m; 0)', 'Szigorúan növekvő', 'Rf = ℝ'],
            ['Elsőfokú csökkenő', 'f(x) = mx + b', 'm < 0', 'My(0; b), Mx(-b/m; 0)', 'Szigorúan csökkenő', 'Rf = ℝ'],
            ['Egyenes arányosság', 'f(x) = mx (b=0)', 'm ≠ 0', 'Origó: (0; 0)', 'Szigorúan monoton', 'Rf = ℝ'],
            ['Konstans függvény', 'f(x) = b (m=0)', 'm = 0', 'My(0; b), x-metszet nincs (ha b≠0)', 'Konstans (állandó)', 'Rf = {b}']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

