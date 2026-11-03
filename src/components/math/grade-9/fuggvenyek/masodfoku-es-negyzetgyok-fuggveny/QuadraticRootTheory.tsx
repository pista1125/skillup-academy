import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  ParabolaTransformSvg,
  SquareRootSvg,
  TransformComparisonSvg
} from './QuadraticRootFigures';
import {
  Sparkles,
  BookOpen,
  Sliders,
  AlertTriangle,
  Zap,
  Target,
  Layers,
  ArrowRight
} from 'lucide-react';

export interface QuadraticRootTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

type FunctionMode = 'quadratic' | 'root';

export const QuadraticRootTheory: React.FC<QuadraticRootTheoryProps> = ({
  onBack,
  onStartQuiz,
}) => {
  const [mode, setMode] = useState<FunctionMode>('quadratic');
  const [paramA, setParamA] = useState<number>(1);
  const [paramU, setParamU] = useState<number>(2);
  const [paramV, setParamV] = useState<number>(-1);

  // SVG méretezés a szimulációhoz
  const svgWidth = 460;
  const svgHeight = 280;
  const minX = -6;
  const maxX = 8;
  const minY = -6;
  const maxY = 8;

  const toSvgX = (x: number) => {
    return 40 + ((x - minX) / (maxX - minX)) * (svgWidth - 80);
  };

  const toSvgY = (y: number) => {
    return svgHeight - 40 - ((y - minY) / (maxY - minY)) * (svgHeight - 80);
  };

  const zeroAxisX = toSvgX(0);
  const zeroAxisY = toSvgY(0);

  // Pontos görbe generálása
  const numPoints = 80;
  const curvePath = (() => {
    let d = '';
    if (mode === 'quadratic') {
      const step = (maxX - minX) / numPoints;
      for (let i = 0; i <= numPoints; i++) {
        const x = minX + i * step;
        const y = paramA * Math.pow(x - paramU, 2) + paramV;
        const sx = toSvgX(x);
        const sy = toSvgY(y);
        if (i === 0) d += `M ${sx} ${sy}`;
        else d += ` L ${sx} ${sy}`;
      }
    } else {
      // Gyökfüggvény: csak x >= paramU esetén
      const startX = paramU;
      const endX = maxX;
      if (endX >= startX) {
        const step = (endX - startX) / numPoints;
        for (let i = 0; i <= numPoints; i++) {
          const x = startX + i * step;
          const y = paramA * Math.sqrt(Math.max(0, x - paramU)) + paramV;
          const sx = toSvgX(x);
          const sy = toSvgY(y);
          if (i === 0) d += `M ${sx} ${sy}`;
          else d += ` L ${sx} ${sy}`;
        }
      }
    }
    return d;
  })();

  // Képlet felirata
  const formulaStr = (() => {
    if (mode === 'quadratic') {
      const aStr = paramA === 1 ? '' : paramA === -1 ? '-' : `${paramA}`;
      const uStr = paramU === 0 ? 'x²' : paramU > 0 ? `(x - ${paramU})²` : `(x + ${Math.abs(paramU)})²`;
      const vStr = paramV === 0 ? '' : paramV > 0 ? ` + ${paramV}` : ` - ${Math.abs(paramV)}`;
      return `f(x) = ${aStr}${uStr}${vStr}`;
    } else {
      const aStr = paramA === 1 ? '' : paramA === -1 ? '-' : `${paramA}`;
      const uStr = paramU === 0 ? 'x' : paramU > 0 ? `x - ${paramU}` : `x + ${Math.abs(paramU)}`;
      const vStr = paramV === 0 ? '' : paramV > 0 ? ` + ${paramV}` : ` - ${Math.abs(paramV)}`;
      return `g(x) = ${aStr}√(${uStr})${vStr}`;
    }
  })();

  const vertexSvgX = toSvgX(paramU);
  const vertexSvgY = toSvgY(paramV);

  return (
    <TheoryTemplate
      title="13. Másodfokú és Négyzetgyök-függvény"
      subtitle="A parabola transzformációi, csúcsponti alak, teljes négyzetté alakítás és a négyzetgyök-függvény szigorú korlátai"
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      topicBadge="9. OSZTÁLY • V. FÜGGVÉNYEK • 13. MÁSODFOKÚ ÉS NÉGYZETGYÖK"
      themeColor="indigo"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onSwitchToQuiz={onStartQuiz}
      quickRule={{
        label: "Csúcspont és Kezdőpont Aranyszabálya",
        formula: "Parabola: f(x) = a(x - u)² + v ➔ C(u; v) | Gyökív: g(x) = a√(x - u) + v ➔ K(u; v), x ≥ u",
        align: "center"
      }}
      practiceTitle="Készen állsz a parabolák és gyökök feladványaira?"
      practiceSubtitle="30 válogatott feladat 3 szinten: a csúcspontok leolvasásától a teljes négyzetté kiegészítésen át a gyökös kikötésekig"
      practiceButtonText="Gyakorló Kvíz Indítása"
    >
      {/* =========================================================================
          1. SZEKCIÓ: ÁTTEKINTÉS ÉS ALAPFOGALMAK
      ========================================================================= */}
      <TheorySection
        title="1. Áttekintés: A Parabola és a Fekvő Félparabola"
        subtitle="Hogyan formálják a paraméterek a másodfokú és a négyzetgyökös görbét?"
        icon={<Zap className="w-6 h-6 text-indigo-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <ParabolaTransformSvg size={240} className="mb-2" />
            <h4 className="text-sm font-bold text-indigo-700 dark:text-indigo-300">Parabola Transzformációk</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              $f(x) = a(x - u)^2 + v$: csúcspont $C(u; v)$, tengely $x = u$, a nyílás irányát $a$ előjele szabja meg.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <SquareRootSvg size={240} className="mb-2" />
            <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Négyzetgyök-függvény</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {'$g(x) = \\sqrt{x}$'}: csak $x \ge 0$ esetén értelmezett, értéke nemnegatív, grafikonja fekvő félparabola.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <TransformComparisonSvg size={240} className="mb-2" />
            <h4 className="text-sm font-bold text-amber-700 dark:text-amber-300">Inverz Kapcsolat</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Nemnegatív számokon ($x \ge 0$) a négyzetre emelés és a négyzetgyökvonás egymás tükörképei az $y = x$ egyenesre.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          2. SZEKCIÓ: INTERAKTÍV FÜGGVÉNYSTÚDIÓ
      ========================================================================= */}
      <TheorySection
        title="2. Interaktív Függvénystúdió"
        subtitle="Mozgasd a csúszkákat és figyeld a csúcspont, a szimmetriatengely és az értelmezési tartomány változását!"
        icon={<Sliders className="w-6 h-6 text-indigo-500" />}
      >
        <div className="bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-700 shadow-md space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span className="text-base font-bold text-white">Függvénytípus kiválasztása:</span>
            </div>
            <div className="flex rounded-lg bg-slate-800 p-1 border border-slate-700">
              <button
                type="button"
                onClick={() => setMode('quadratic')}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${mode === 'quadratic'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                Parabola: a(x - u)² + v
              </button>
              <button
                type="button"
                onClick={() => setMode('root')}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${mode === 'root'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                Gyökív: a√(x - u) + v
              </button>
            </div>
          </div>

          {/* Csúszkák */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Nyílás / Meredekség (a):</span>
                <strong className="text-indigo-400 font-mono text-sm">{paramA}</strong>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.5"
                value={paramA}
                onChange={e => {
                  const val = parseFloat(e.target.value);
                  setParamA(val === 0 ? 0.5 : val);
                }}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block mt-1">Pozitív = felfelé nyíló, negatív = lefelé tükrözött</span>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Vízszintes eltolás (u):</span>
                <strong className="text-amber-400 font-mono text-sm">{paramU}</strong>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="1"
                value={paramU}
                onChange={e => setParamU(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block mt-1">Pozitív = jobbra, negatív = balra</span>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Függőleges eltolás (v):</span>
                <strong className="text-emerald-400 font-mono text-sm">{paramV}</strong>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="1"
                value={paramV}
                onChange={e => setParamV(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block mt-1">Pozitív = felfelé, negatív = lefelé</span>
            </div>
          </div>

          {/* Vizuális szimuláció és infó panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG grafikon */}
            <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-auto max-h-[300px] select-none"
              >
                {/* Tengelyek */}
                <line x1="30" y1={zeroAxisY} x2={svgWidth - 30} y2={zeroAxisY} stroke="#475569" strokeWidth="1.5" />
                <line x1={zeroAxisX} y1={svgHeight - 30} x2={zeroAxisX} y2="30" stroke="#475569" strokeWidth="1.5" />
                <text x={svgWidth - 25} y={zeroAxisY + 4} fill="#94a3b8" fontSize="11" fontWeight="bold">x</text>
                <text x={zeroAxisX - 6} y="22" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">y</text>

                {/* Ha gyökfüggvény: tiltott tartomány x < paramU */}
                {mode === 'root' && (
                  <rect
                    x="30"
                    y="30"
                    width={Math.max(0, vertexSvgX - 30)}
                    height={svgHeight - 60}
                    fill="#ef4444"
                    fillOpacity="0.1"
                  />
                )}

                {/* Ha parabola: szimmetriatengely x = u */}
                {mode === 'quadratic' && (
                  <line
                    x1={vertexSvgX}
                    y1="30"
                    x2={vertexSvgX}
                    y2={svgHeight - 30}
                    stroke="#6366f1"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                  />
                )}

                {/* Görbe */}
                <path
                  d={curvePath}
                  fill="none"
                  stroke={mode === 'quadratic' ? '#818cf8' : '#34d399'}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Csúcspont / Kezdőpont */}
                <line x1={vertexSvgX} y1={vertexSvgY} x2={vertexSvgX} y2={zeroAxisY} stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 3" />
                <line x1={zeroAxisX} y1={vertexSvgY} x2={vertexSvgX} y2={vertexSvgY} stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 3" />
                <circle cx={vertexSvgX} cy={vertexSvgY} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                <text
                  x={vertexSvgX}
                  y={vertexSvgY - 10}
                  fill="#fbbf24"
                  fontSize="11"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {mode === 'quadratic' ? 'C' : 'K'}({paramU}; {paramV})
                </text>
              </svg>
              <div className="flex items-center gap-6 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> {mode === 'quadratic' ? 'Csúcspont C(u; v)' : 'Kezdőpont K(u; v)'}
                </span>
                {mode === 'quadratic' && (
                  <span className="flex items-center gap-1.5">
                    <span className="w-4 h-0.5 bg-indigo-500 border border-dashed inline-block" /> Szimmetriatengely (x = u)
                  </span>
                )}
              </div>
            </div>

            {/* Elemző panel */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
                <span className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Hozzárendelési szabály</span>
                <div className="text-xl font-bold text-indigo-300 font-mono mt-0.5">{formulaStr}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block">{mode === 'quadratic' ? 'Csúcspont:' : 'Kezdőpont:'}</span>
                  <span className="text-base font-bold text-amber-400 font-mono">({paramU}; {paramV})</span>
                </div>
                <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block">Nyílás iránya:</span>
                  <span className={`text-sm font-bold ${paramA > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {paramA > 0 ? 'Felfelé nyílik' : 'Lefelé nyílik'}
                  </span>
                </div>
                <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block">Értelmezési tartomány:</span>
                  <span className="text-xs font-bold text-white font-mono">
                    {mode === 'quadratic' ? 'x ∈ ℝ' : `x ∈ [${paramU}; ∞[`}
                  </span>
                </div>
                <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block">Értékkészlet:</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    {paramA > 0 ? `y ∈ [${paramV}; ∞[` : `y ∈ ]-∞; ${paramV}]`}
                  </span>
                </div>
              </div>

              <div className="bg-indigo-950/40 border border-indigo-500/30 p-3.5 rounded-xl text-xs text-slate-300 leading-relaxed">
                <strong className="text-indigo-300 block mb-1">Módszertani megjegyzés:</strong>
                {mode === 'quadratic' ? (
                  <>
                    A parabola szimmetrikus az $x = {paramU}$ egyenesre. A szélsőérték {paramA > 0 ? 'minimum' : 'maximum'}, melynek helye $x = {paramU}$, értéke $y = {paramV}$.
                  </>
                ) : (
                  <>
                    A gyök alatt negatív szám nem állhat, ezért a kifejezés csak akkor értelmezett, ha $x - ({paramU}) \ge 0 \implies x \ge {paramU}$. A kezdőpontból kiinduló görbe szigorúan monoton {paramA > 0 ? 'növekvő' : 'csökkenő'}.
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          3. SZEKCIÓ: A MÁSODFOKÚ FÜGGVÉNY ÉS A TELJES NÉGYZETTÉ ALAKÍTÁS
      ========================================================================= */}
      <TheorySection
        title="3. A Csúcsponti Alak és a Teljes Négyzetté Kiegészítés"
        subtitle="Hogyan jutunk el az ax² + bx + c alakból a rajzolható a(x - u)² + v csúcsponti formulához?"
        icon={<BookOpen className="w-6 h-6 text-indigo-500" />}
      >
        <TheoryCard
          title="A paraméterek közvetlen geometriai jelentése"
          icon={<Sparkles className="w-5 h-5 text-indigo-500" />}
        >
          <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              Az alapfüggvény $f(x) = x^2$ egy origó csúcspontú parabola. Az $f(x) = a(x - u)^2 + v$ csúcsponti alakból a paraméterek azonnal leolvashatók:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-900/50">
                <span className="text-amber-800 dark:text-amber-300 font-bold block mb-1 text-sm">u: Vízszintes eltolás (x)</span>
                <p className="text-slate-600 dark:text-slate-400">
                  A zárójelben lévő előjel <strong>ellentétes</strong> a tolás irányával!
                  <br />
                  $(x - 3)^2 \implies$ 3 egységgel <strong>jobbra</strong> tolás ($u = 3$).
                  <br />
                  $(x + 2)^2 \implies$ 2 egységgel <strong>balra</strong> tolás ($u = -2$).
                </p>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50">
                <span className="text-emerald-800 dark:text-emerald-300 font-bold block mb-1 text-sm">v: Függőleges eltolás (y)</span>
                <p className="text-slate-600 dark:text-slate-400">
                  A hozzáadott konstans megegyezik a tolás irányával:
                  <br />
                  $+ 4 \implies$ 4 egységgel <strong>felfelé</strong> ($v = 4$).
                  <br />
                  $- 5 \implies$ 5 egységgel <strong>lefelé</strong> ($v = -5$).
                </p>
              </div>

              <div className="bg-sky-50 dark:bg-sky-950/30 p-4 rounded-xl border border-sky-200 dark:border-sky-900/50">
                <span className="text-sky-800 dark:text-sky-300 font-bold block mb-1 text-sm">a: Nyílás és meredekség</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Ha $a &gt; 0$: felfelé nyílik (minimum van a csúcsban).
                  <br />
                  Ha $a &lt; 0$: lefelé nyílik (maximum van a csúcsban).
                  <br />
                  Ha $|a| &gt; 1$: szűkebb/meredekebb; ha $|a| &lt; 1$: szélesebb/laposabb.
                </p>
              </div>
            </div>

            {/* Teljes négyzet példa */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm block">
                Mintapélda: $f(x) = x^2 - 8x + 19$ átalakítása teljes négyzetté
              </span>
              <div className="font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
                <p><strong>1. Lépés:</strong> A $b = -8$ fele $-4$, így az $(x - 4)^2$ képletéből indulunk ki (mert $(x - 4)^2 = x^2 - 8x + 16$).</p>
                <p><strong>2. Lépés:</strong> Kivonjuk a felesleges $16$-ot, és hozzáadjuk a $+19$-et: $(x - 4)^2 - 16 + 19 = (x - 4)^2 + 3$.</p>
                <p className="text-emerald-700 dark:text-emerald-400 font-bold"><strong>3. Eredmény:</strong> Csúcspont: $C(4; 3)$, $a = 1 &gt; 0$ felfelé nyílik, minimum értéke $y = 3$ az $x = 4$ helyen.</p>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          4. SZEKCIÓ: A NÉGYZETGYÖK-FÜGGVÉNY ÉS SZIGORÚ KORLÁTAI
      ========================================================================= */}
      <TheorySection
        title="4. A Négyzetgyök-függvény és Szigorú Korlátai"
        subtitle="Miért nem kaphatunk negatív számot a gyökjel alól, és hogyan határozzuk meg az értelmezési tartományt?"
        icon={<Sparkles className="w-6 h-6 text-emerald-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
            <span className="text-emerald-700 dark:text-emerald-400 font-bold block text-sm">
              1. Aranyszabály: A gyök alatt nem állhat negatív szám!
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              A valós számok körében csak nemnegatív számból vonhatunk négyzetgyököt ({'$k \\ge 0$'}).
            </p>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900 font-mono text-emerald-800 dark:text-emerald-300">
              {'$g(x) = \\sqrt{x - 3} \\implies x - 3 \\ge 0 \\implies x \\ge 3$'}.
              <br />
              <strong>{'$D_g = [3; \\infty[$'}</strong>. A kezdőpont $x$-koordinátája $u = 3$.
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
            <span className="text-emerald-700 dark:text-emerald-400 font-bold block text-sm">
              2. Aranyszabály: A négyzetgyök értéke soha nem negatív!
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Definíció szerint a számtani négyzetgyök mindig nemnegatív ({'$\\sqrt{A} \\ge 0$'}), így az alapfüggvény értékkészlete {'$R_g = [0; \\infty[$'}.
            </p>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900 font-mono text-emerald-800 dark:text-emerald-300">
              {'$g(x) = \\sqrt{x} + 2 \\implies y \\ge 2 \\implies R_g = [2; \\infty[$'}.
              <br />
              A kezdőpont $K(0; 2)$, ettől jobbra és felfelé ível a görbe.
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          5. SZEKCIÓ: TIPIKUS VIZSGACSAPDÁK
      ========================================================================= */}
      <TheorySection
        title="5. Tipikus Diákcsapdák és Hibák"
        subtitle="Ezeket a végzetes tévedéseket kerüld el a dolgozatban!"
        icon={<AlertTriangle className="w-6 h-6 text-amber-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. -x² és (-x)² összekeverése"
            trap="Sokan azt hiszik, a -x² ugyanaz, mint a (-x)²."
            solution="-x² = -(x²) mindig nempozitív (≤ 0), grafikonja lefelé nyíló parabola. Ezzel szemben (-x)² = x² mindig nemnegatív (≥ 0), felfelé nyíló!"
          />
          <TheoryTrapBox
            title="2. √(x²) = x téves általánosítása"
            trap="Azt gondoljuk, a négyzetgyök és a négyzet kiejti egymást: √(x²) = x minden valós számra."
            solution="Valójában √(x²) = |x|! Ha például x = -5, akkor √((-5)²) = √25 = 5 = |-5| ≠ -5!"
          />
          <TheoryTrapBox
            title="3. A vízszintes eltolás előjelének elnézése"
            trap="Az f(x) = (x - 4)² képletet látva 4 egységgel balra toljuk a parabolát."
            solution="A zárójeles tagban a -4 jobbra tolást jelent: a csúcspont x-koordinátája u = +4!"
          />
          <TheoryTrapBox
            title="4. Gyök alatti negatív tartomány megengedése"
            trap="A g(x) = √(2 - x) függvény értelmezési tartományát [2; ∞[-nek vesszük."
            solution="A feltétel: 2 - x ≥ 0 ⟹ 2 ≥ x, azaz x ≤ 2! Így az értelmezési tartomány helyesen: D_g = ]-∞; 2]!"
          />
        </div>
      </TheorySection>

      {/* =========================================================================
          6. SZEKCIÓ: ÖSSZEHASONLÍTÓ NAGYTÁBLÁZAT
      ========================================================================= */}
      <TheorySection
        title="6. Parabola és Négyzetgyök Összehasonlító Nagytáblázat"
        subtitle="Minden lényeges tulajdonság párhuzamba állítva"
        icon={<Layers className="w-6 h-6 text-indigo-500" />}
      >
        <TheoryTable
          headers={['Tulajdonság', 'Másodfokú: f(x) = a(x - u)² + v', 'Négyzetgyök: g(x) = a√(x - u) + v']}
          rows={[
            ['Alapképlet', 'f(x) = x²', 'g(x) = √x'],
            ['Grafikon alakja', 'U-alakú szimmetrikus parabola', 'Fekvő félparabola (jobbra ívelő gyökív)'],
            ['Nevezetes pont', 'Csúcspont: C(u; v)', 'Kezdőpont: K(u; v)'],
            ['Értelmezési tartomány (D)', 'x ∈ ℝ (minden valós szám)', 'x ≥ u (csak nemnegatív gyök alatti kifejezés)'],
            ['Értékkészlet (R) (ha a > 0)', 'y ∈ [v; ∞[ (alulról korlátos)', 'y ∈ [v; ∞[ (alulról korlátos)'],
            ['Értékkészlet (R) (ha a < 0)', 'y ∈ ]-∞; v] (felülről korlátos)', 'y ∈ ]-∞; v] (felülről korlátos)'],
            ['Szimmetria', 'Tengelyesen szimmetrikus az x = u egyenesre', 'Nem szimmetrikus'],
            ['Monotonitás', 'Csúcspontig csökken, majd nő (vagy fordítva)', 'Teljes tartományán szigorúan monoton nő (vagy csökken)'],
            ['Szélsőérték', 'Globális minimum (a > 0) vagy maximum (a < 0)', 'Kezdőpontban minimum (a > 0) vagy maximum (a < 0)']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
