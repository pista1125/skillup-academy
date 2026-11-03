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
  PlottingStepsSvg,
  DiscreteVsContinuousSvg,
  PointsOnGraphSvg
} from './PlottingFigures';
import {
  Sliders,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Hash,
  Compass,
  ArrowRight,
  Calculator,
  HelpCircle,
  TrendingUp,
  Layers
} from 'lucide-react';

interface PlottingTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PlottingTheory: React.FC<PlottingTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV GRAFIKONKÉSZÍTŐ ÉS PONTVIZSGÁLÓ LABOR ---
  const [funcSlope, setFuncSlope] = useState<number>(2); // m
  const [funcIntercept, setFuncIntercept] = useState<number>(-1); // b
  const [testPx, setTestPx] = useState<number>(2);
  const [testPy, setTestPy] = useState<number>(3);
  const [domainMode, setDomainMode] = useState<'real' | 'integer' | 'interval'>('real');

  // Táblázat x értékei
  const tableX = [-2, -1, 0, 1, 2, 3];
  const tableData = useMemo(() => {
    return tableX.map((x) => ({
      x,
      y: funcSlope * x + funcIntercept
    }));
  }, [funcSlope, funcIntercept]);

  // Pontilleszkedés ellenőrzése
  const expectedY = funcSlope * testPx + funcIntercept;
  const isPointOnGraph = expectedY === testPy;

  // Intervallum feltétel
  const intervalMin = -1;
  const intervalMax = 2;
  const isPointInDomain =
    domainMode === 'real'
      ? true
      : domainMode === 'integer'
      ? Number.isInteger(testPx)
      : testPx >= intervalMin && testPx <= intervalMax;

  // SVG koordinátatranszformáció: x in [-4, 4], y in [-6, 6] -> viewBox 0 0 320 240
  // center: (160, 120), 1 egység = 24 px
  const toSvgX = (x: number) => 160 + x * 24;
  const toSvgY = (y: number) => 120 - y * 24;

  return (
    <TheoryTemplate
      title="6. Készítsünk grafikont!"
      subtitle="A hozzárendelési szabálytól a koordinátarendszerbeli görbéig: táblázatkészítés, skálázás, folytonos és diszkrét ábrázolás."
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      estimatedTime="25-30 perc"
      quickRule={{
        label: "A pontábrázolás aranyszabálya",
        formula: "P(x; y): az 1. koordináta a vízszintes (x), a 2. a függőleges (y) tengelyen!",
        align: "right"
      }}
    >
      {/* 1. SZEKCIÓ: A GRAFIKONKÉSZÍTÉS 4 ALAPLÉPÉSE */}
      <TheorySection
        title="A grafikonkészítés 4 arany lépése"
        subtitle="Hogyan jutunk el a hozzárendelési szabálytól a pontos ábráig?"
        icon={<TrendingUp className="w-6 h-6 text-indigo-500" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4 text-slate-700 leading-relaxed">
            <p>
              A függvény grafikonja azoknak a síkbeli <code className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-mono font-semibold">P(x; y)</code> pontoknak
              az összessége, ahol az első koordináta az értelmezési tartomány egy eleme (<code className="font-mono text-indigo-600">x ∈ D_f</code>),
              a második koordináta pedig a hozzá rendelt függvényérték (<code className="font-mono text-indigo-600">y = f(x)</code>).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">1. Tartomány tisztázása</span>
                <p className="text-xs text-blue-900 mt-1">
                  Milyen értékeket vehet fel <code className="font-semibold">x</code>? Egészeket (ℤ), valósakat (ℝ), vagy csak egy szűk intervallumot?
                </p>
              </div>
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">2. Értéktáblázat</span>
                <p className="text-xs text-emerald-900 mt-1">
                  Válasszunk 3–5 kényelmes <code className="font-semibold">x</code> értéket (pl. 0, pozitív, negatív), és számítsuk ki a hozzájuk tartozó <code className="font-semibold">y</code> értékeket.
                </p>
              </div>
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">3. Pontok berajzolása</span>
                <p className="text-xs text-amber-900 mt-1">
                  Minden <code className="font-semibold">(x; y)</code> számpárt jelöljünk meg pontként a koordináta-rendszerben.
                </p>
              </div>
              <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl">
                <span className="text-xs font-bold text-purple-800 uppercase tracking-wider block">4. Vonalbehúzás / Pontok</span>
                <p className="text-xs text-purple-900 mt-1">
                  Ha <code className="font-semibold">D_f = ℝ</code>, folytonos vonallal összekötjük. Ha diszkrét (pl. ℤ), pontozva hagyjuk!
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <PlottingStepsSvg size={280} />
            <span className="text-xs text-slate-500 mt-2 text-center">
              Grafikonkészítés algoritmusa a képlettől a koordináta-rendszerig
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: INTERAKTÍV GRAFIKON- ÉS PONTVIZSGÁLÓ LABOR */}
      <TheorySection
        title="Interaktív Grafikon- és Pontvizsgáló Labor"
        subtitle="Módosítsd a függvény meredekségét, tengelymetszetét, és ellenőrizd a pontok illeszkedését!"
        icon={<Sliders className="w-6 h-6 text-indigo-500" />}
      >
        <div className="bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/40 p-6 rounded-2xl border border-indigo-100 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Meredekség és metszet */}
            <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Függvény paraméterei: <span className="font-mono text-indigo-600 font-bold text-sm">f(x) = {funcSlope}x {funcIntercept >= 0 ? `+ ${funcIntercept}` : `- ${Math.abs(funcIntercept)}`}</span>
              </label>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Meredekség (m):</span>
                  <span className="font-bold text-indigo-600 font-mono">{funcSlope}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="1"
                  value={funcSlope}
                  onChange={(e) => setFuncSlope(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Y-metszet (b):</span>
                  <span className="font-bold text-purple-600 font-mono">{funcIntercept}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="1"
                  value={funcIntercept}
                  onChange={(e) => setFuncIntercept(parseInt(e.target.value, 10))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Értelmezési tartomány típus */}
            <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Értelmezési tartomány (D_f):
              </label>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setDomainMode('real')}
                  className={`px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                    domainMode === 'real'
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  D_f = ℝ (Folytonos egyenes)
                </button>
                <button
                  type="button"
                  onClick={() => setDomainMode('integer')}
                  className={`px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                    domainMode === 'integer'
                      ? 'bg-amber-600 text-white font-bold shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  D_f = ℤ (Csak diszkrét pontok!)
                </button>
                <button
                  type="button"
                  onClick={() => setDomainMode('interval')}
                  className={`px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                    domainMode === 'interval'
                      ? 'bg-indigo-600 text-white font-bold shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  D_f = [-1; 2] (Szakasz végpontokkal)
                </button>
              </div>
            </div>

            {/* Tesztpont P(x, y) */}
            <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Tesztpont: <span className="font-mono text-blue-600 font-bold">P({testPx}; {testPy})</span>
              </label>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>x koordináta:</span>
                  <span className="font-bold text-blue-600 font-mono">{testPx}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="1"
                  value={testPx}
                  onChange={(e) => setTestPx(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>y koordináta:</span>
                  <span className="font-bold text-blue-600 font-mono">{testPy}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="1"
                  value={testPy}
                  onChange={(e) => setTestPy(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Vizualizáció + Táblázat és Illeszkedés vizsgálat */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG grafikon */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-200 shadow-inner">
              <svg
                width={320}
                height={240}
                viewBox="0 0 320 240"
                className="select-none bg-slate-50 rounded-lg"
              >
                {/* Rácsvonalak */}
                {[-4, -3, -2, -1, 1, 2, 3, 4].map((i) => (
                  <line
                    key={`gx-${i}`}
                    x1={toSvgX(i)}
                    y1={10}
                    x2={toSvgX(i)}
                    y2={230}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                ))}
                {[-4, -3, -2, -1, 1, 2, 3, 4].map((i) => (
                  <line
                    key={`gy-${i}`}
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

                {/* Grafikon rajzolása a domaintől függően */}
                {domainMode === 'real' && (
                  <line
                    x1={toSvgX(-4)}
                    y1={toSvgY(funcSlope * -4 + funcIntercept)}
                    x2={toSvgX(4)}
                    y2={toSvgY(funcSlope * 4 + funcIntercept)}
                    stroke="#4f46e5"
                    strokeWidth="3"
                  />
                )}

                {domainMode === 'interval' && (
                  <>
                    <line
                      x1={toSvgX(intervalMin)}
                      y1={toSvgY(funcSlope * intervalMin + funcIntercept)}
                      x2={toSvgX(intervalMax)}
                      y2={toSvgY(funcSlope * intervalMax + funcIntercept)}
                      stroke="#4f46e5"
                      strokeWidth="3.5"
                    />
                    {/* Zárt végpontok */}
                    <circle
                      cx={toSvgX(intervalMin)}
                      cy={toSvgY(funcSlope * intervalMin + funcIntercept)}
                      r={5}
                      fill="#4f46e5"
                    />
                    <circle
                      cx={toSvgX(intervalMax)}
                      cy={toSvgY(funcSlope * intervalMax + funcIntercept)}
                      r={5}
                      fill="#4f46e5"
                    />
                  </>
                )}

                {/* Diszkrét pontok jelölése */}
                {domainMode === 'integer'
                  ? [-3, -2, -1, 0, 1, 2, 3].map((xVal) => {
                      const yVal = funcSlope * xVal + funcIntercept;
                      if (yVal < -5 || yVal > 5) return null;
                      return (
                        <circle
                          key={`dp-${xVal}`}
                          cx={toSvgX(xVal)}
                          cy={toSvgY(yVal)}
                          r={5}
                          fill="#d97706"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                        />
                      );
                    })
                  : /* Folytonos esetén segéd kis pontok */
                    [-2, 0, 2].map((xVal) => {
                      const yVal = funcSlope * xVal + funcIntercept;
                      if (yVal < -5 || yVal > 5) return null;
                      return (
                        <circle
                          key={`hp-${xVal}`}
                          cx={toSvgX(xVal)}
                          cy={toSvgY(yVal)}
                          r={3.5}
                          fill="#4f46e5"
                        />
                      );
                    })}

                {/* Tesztpont P(testPx, testPy) */}
                <circle
                  cx={toSvgX(testPx)}
                  cy={toSvgY(testPy)}
                  r={6}
                  fill={isPointOnGraph && isPointInDomain ? '#10b981' : '#ef4444'}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <text
                  x={toSvgX(testPx) + 8}
                  y={toSvgY(testPy) - 8}
                  fill={isPointOnGraph && isPointInDomain ? '#047857' : '#b91c1c'}
                  fontSize="11"
                  fontWeight="bold"
                >
                  P({testPx}; {testPy})
                </text>
              </svg>
              <div className="flex items-center gap-4 text-xs mt-2 text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" /> Függvény
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Illeszkedő pont
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /> Nem illeszkedő pont
                </span>
              </div>
            </div>

            {/* Kiértékelés & Értéktáblázat */}
            <div className="lg:col-span-5 space-y-4">
              <div
                className={`p-4 rounded-xl border ${
                  isPointOnGraph && isPointInDomain
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50/80 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                  {isPointOnGraph && isPointInDomain ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>A pont rajta van a grafikonon!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      <span>A pont NINCS a grafikonon!</span>
                    </>
                  )}
                </div>
                <div className="text-xs space-y-1 font-mono">
                  <p>f({testPx}) = {funcSlope} · ({testPx}) {funcIntercept >= 0 ? `+ ${funcIntercept}` : `- ${Math.abs(funcIntercept)}`} = <span className="font-bold">{expectedY}</span></p>
                  <p>Megadott y koordináta = <span className="font-bold">{testPy}</span></p>
                  {!isPointInDomain && (
                    <p className="text-rose-700 font-sans font-semibold pt-1">
                      Figyelem: x = {testPx} kívül esik a választott értelmezési tartományon!
                    </p>
                  )}
                </div>
              </div>

              {/* Értéktáblázat miniatúra */}
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Számított értéktáblázat:
                </span>
                <div className="grid grid-cols-6 gap-1 text-center font-mono text-xs">
                  <div className="font-bold text-slate-400 bg-slate-100 py-1 rounded">x</div>
                  {tableData.map((d) => (
                    <div
                      key={`tx-${d.x}`}
                      className={`py-1 rounded ${
                        d.x === testPx ? 'bg-indigo-100 text-indigo-900 font-bold' : 'bg-slate-50 text-slate-700'
                      }`}
                    >
                      {d.x}
                    </div>
                  ))}
                  <div className="font-bold text-slate-400 bg-slate-100 py-1 rounded">y</div>
                  {tableData.map((d) => (
                    <div
                      key={`ty-${d.x}`}
                      className={`py-1 rounded ${
                        d.x === testPx ? 'bg-indigo-100 text-indigo-900 font-bold' : 'bg-slate-50 text-slate-700'
                      }`}
                    >
                      {d.y}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: DISZKRÉT VS FOLYTONOS ÁBRÁZOLÁS */}
      <TheorySection
        title="Diszkrét vs. Folytonos ábrázolás"
        subtitle="Mikor szabad összekötni a pontokat, és mikor szigorúan tilos?"
        icon={<Layers className="w-6 h-6 text-indigo-500" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4 text-slate-700 leading-relaxed">
            <p>
              A kezdő matematikusok leggyakoribb hibája, hogy az értéktáblázat pontjait <em>automatikusan összekötik egy folytonos vonallal</em>.
              Ez azonban csak akkor helyes, ha a függvény az összekötött szakasz minden pontján értelmezve van!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
                <span className="text-xs font-black text-amber-800 uppercase tracking-wider block">
                  Diszkrét tartomány (pl. D_f = ℤ vagy ℕ)
                </span>
                <p className="text-xs text-amber-950 leading-relaxed">
                  Ha a bemeneti változó pl. tanulók száma, darabszám vagy egész napok, a pontok között nincsenek értékek.
                  A grafikon <strong>kizárólag különálló, izolált pontokból áll</strong>. Összekötni tilos!
                </p>
              </div>
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block">
                  Folytonos tartomány (pl. D_f = ℝ vagy intervallum)
                </span>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  Ha a bemenet idő, hőmérséklet, hosszúság vagy bármilyen valós szám, a kiszámított pontokat <strong>folytonos vonallal kötjük össze</strong>,
                  mert a köztes pontoknak is van érvényes függvényértékük.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <DiscreteVsContinuousSvg size={280} />
            <span className="text-xs text-slate-500 mt-2 text-center">
              Diszkrét függvény (csak pontok) vs Folytonos függvény (összekötött egyenes)
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: PONT ILLESZKEDÉSE A GRAFIKONRA */}
      <TheorySection
        title="Pont illeszkedése a grafikonra"
        subtitle="Hogyan dönthető el rajzolás nélkül, pusztán számolással, hogy egy pont rajta van-e a grafikonon?"
        icon={<Compass className="w-6 h-6 text-indigo-500" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3 text-slate-700 text-sm leading-relaxed">
            <p>
              Egy tetszőleges <code className="bg-slate-100 font-mono px-1.5 py-0.5 rounded font-bold text-slate-800">P(x_0; y_0)</code> pont akkor és csak akkor illeszkedik
              az <code className="font-mono text-indigo-600 font-bold">f</code> függvény grafikonjára, ha:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-800">
              <li>Az első koordináta benne van az értelmezési tartományban: <code className="font-mono text-indigo-700 font-bold">x_0 ∈ D_f</code></li>
              <li>A hozzárendelési szabályba behelyettesítve pontosan a második koordinátát kapjuk: <code className="font-mono text-indigo-700 font-bold">f(x_0) = y_0</code></li>
            </ol>
            <TheoryCallout title="Mintapélda pontilleszkedésre" variant="idea">
              <p className="text-xs leading-relaxed text-slate-700">
                Függvény: <code className="font-mono font-bold text-slate-900">f(x) = 3x - 5</code>. Rajta van-e a <code className="font-mono font-bold">P(4; 7)</code> és a <code className="font-mono font-bold">Q(2; 3)</code> pont?
                <br />
                • <strong>P(4; 7):</strong> f(4) = 3·4 - 5 = 12 - 5 = 7. Mivel az eredmény 7, <span className="text-emerald-700 font-bold">P rajta van a grafikonon!</span>
                <br />
                • <strong>Q(2; 3):</strong> f(2) = 3·2 - 5 = 6 - 5 = 1 ≠ 3. Mivel 1 ≠ 3, <span className="text-rose-700 font-bold">Q nincs rajta a grafikonon!</span>
              </p>
            </TheoryCallout>
          </div>
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <PointsOnGraphSvg size={270} />
            <span className="text-xs text-slate-500 mt-2 text-center">
              A pontok koordinátáinak behelyettesítése a hozzárendelési szabályba
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: TIPUSHIBA BUKTATÓK */}
      <TheorySection
        title="Gyakori grafikonrajzolási buktatók"
        subtitle="Figyelj ezekre, hogy ne veszíts pontot a dolgozatban!"
        icon={<AlertTriangle className="w-6 h-6 text-amber-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Koordináták (x; y) felcserélése"
            trap="A P(1; 3) pontnál 1-et lépünk felfelé és 3-at jobbra."
            solution="Mindig a vízszintes x tengelyen lépünk először (jobbra/balra), és utána a függőleges y tengelyen (fel/le)! Tehát 1 jobbra, 3 fel."
          />
          <TheoryTrapBox
            title="2. Egyenetlen tengelybeosztás (hibás skálázás)"
            trap="A tengelyre a kiszámított y értékeket írjuk fel egymás után egyforma távolságra: pl. 1, 4, 9, 16."
            solution="A tengely beosztása mindig egyenletes léptékű kell legyen (pl. minden rácsnégyzet 1 egység). Nem a függvényértékekhez torzítjuk a rácsot!"
          />
          <TheoryTrapBox
            title="3. Zárt vs. Nyílt intervallum végpontok"
            trap="Az f: ]-2; 3] -> R függvénynél mindkét végpontba teli karikát rajzolunk."
            solution="A szigorú kacsacsőr vagy nyílt zárójel nyílt végpontot jelent: üres karikával (○) jelöljük! Csak a megengedett zárt végpont teli karika (●)."
          />
          <TheoryTrapBox
            title="4. Túl kevés pont görbe esetén"
            trap="Másodfokú függvényt (pl. f(x) = x²) csak 2 pont alapján kötünk össze egyenes vonalzóval."
            solution="Egyeneshez elég 2 pont (3 ajánlott ellenőrzésnek). Görbékhez (parabola, hiperbola) legalább 5-7 pontot kell kiszámítani a helyes ívhez!"
          />
        </div>
      </TheorySection>

      {/* 6. SZEKCIÓ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        title="Grafikonkészítési összefoglaló"
        subtitle="A különböző függvénytípusok rajzolási sajátosságai"
        icon={<Lightbulb className="w-6 h-6 text-indigo-500" />}
      >
        <TheoryTable
          headers={['Függvénytípus', 'Grafikon alakja', 'Szükséges pontok száma', 'Végpontok / Megjelenés']}
          rows={[
            ['Lineáris: f(x) = mx + b (Df = ℝ)', 'Egyenes vonal', '2 pont (3 ajánlott)', 'Mindkét irányban a végtelenbe nyúlik'],
            ['Lineáris zárt szakaszon (Df = [a; b])', 'Vonal szakasz', 'A két végpont és 1 köztes', 'Két teli karika (●) határolja'],
            ['Diszkrét függvény (Df = ℤ)', 'Izolált pontok', '3-5 reprezentatív pont', 'TILOS összekötni, csak pontok!'],
            ['Abszolútérték: f(x) = |x|', 'V alakú törött vonal', 'Töréspont + 2-2 pont kétoldalt', 'A tengelyponton megtörik a meredekség'],
            ['Másodfokú: f(x) = x²', 'Parabola (görbe ív)', 'Legalább 5 pont (tengelypont + szimmetria)', 'Sima görbe, vonalzóval nem rajzolható']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

