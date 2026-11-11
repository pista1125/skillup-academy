import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  MathText
} from '../TheoryTemplate';
import {
  CompletingSquareGeometricSvg,
  GeneralToCanonicalParabolaSvg,
  TwoParabolasSameVertexSvg
} from './QuadraticFunctionsFigures';
import {
  Boxes,
  Layers,
  ArrowRight,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Maximize2,
  TrendingDown,
  TrendingUp,
  Calculator,
  Square
} from 'lucide-react';

interface QuadraticFunctionsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const QuadraticFunctionsTheory: React.FC<QuadraticFunctionsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab 1: Teljes Négyzetté Alakító Szimulátor ---
  const [coeffA, setCoeffA] = useState<number>(1);
  const [coeffB, setCoeffB] = useState<number>(-6);
  const [coeffC, setCoeffC] = useState<number>(5);

  // Számítások lépésről lépésre:
  // u = -b / (2a)
  const uVal = -coeffB / (2 * coeffA);
  // v = c - b² / (4a)
  const vVal = coeffC - (coeffB * coeffB) / (4 * coeffA);

  const bHalf = coeffB / (2 * coeffA);
  const bHalfSquared = bHalf * bHalf;

  // Előjeles string formázások
  const formatSign = (val: number) => (val >= 0 ? `+ ${val}` : `- ${Math.abs(val)}`);
  const formatInside = (u: number) => (u >= 0 ? `x - ${u}` : `x + ${Math.abs(u)}`);

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • IV. FÜGGVÉNYTRANSZFORMÁCIÓK • TANANYAG"
      title="Másodfokú függvények"
      subtitle="Az f(x) = ax² + bx + c általános alak átírása a(x - u)² + v kanonikus alakra teljes négyzetté kiegészítéssel, és a parabola csúcspontjának algebrai meghatározása."
      themeColor="amber"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-amber-600 dark:text-amber-400 font-black">Általános (polinom) alak:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>f(x) = ax² + bx + c</MathText> &nbsp;(<MathText>a \neq 0</MathText>, <MathText>(0; c)</MathText> az y-metszéspont)
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-indigo-600 dark:text-indigo-400 font-black">Kanonikus alak:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>f(x) = a(x - u)² + v</MathText> &nbsp;|&nbsp; Csúcspont: <MathText>T(u; v)</MathText>
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Csúcspont képlete:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>{"u = -b / (2a)"}</MathText> &nbsp;|&nbsp; <MathText>{"v = f(u) = c - b² / (4a)"}</MathText>
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-rose-600 dark:text-rose-400 font-black">Teljes négyzet:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>{"x² + bx = (x + b/2)² - (b/2)²"}</MathText>
              </span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
    >
      {/* 1. SZEKCIÓ: A KÉT MEGADÁSI MÓD */}
      <TheorySection
        number={1}
        title="A másodfokú függvény alakjai: Általános vs. Kanonikus forma"
        icon={<Boxes className="w-5 h-5 text-amber-500" />}
        badge="ALAPOK"
        badgeColor="amber"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A másodfokú függvényeket a matematikában két alapvető formában adjuk meg.
          Mindkét alaknak megvan a maga sajátos előnye, és a feladatok sikeres megoldásához elengedhetetlen, hogy tetszőlegesen tudjunk váltani közöttük!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <TheoryCard title="1. Általános (polinom) alak: ax² + bx + c">
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              A zárójelek felbontása és összevonása után kapott standard algebrai forma.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li><strong>a (főegyüttható):</strong> Meghatározza a meredekséget és a nyílás irányát (+ felfelé, - lefelé).</li>
              <li><strong>b (elsőfokú tag):</strong> A vízszintes eltolódásért felelős (a csúcs x-koordinátájában szerepel).</li>
              <li><strong>c (konstans tag):</strong> Azonnal megadja az <strong>y-tengelymetszetet</strong>: <code>f(0) = c ⟹ (0; c)</code>!</li>
            </ul>
          </TheoryCard>

          <TheoryCard title="2. Kanonikus (teljes négyzetes) alak: a(x - u)² + v">
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              A függvénytranszformációk alapján felírt geometriai forma.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li><strong>u és v:</strong> Közvetlenül megadja a parabola <strong>csúcspontját: T(u; v)</strong>!</li>
              <li><strong>Szélsőérték:</strong> Számolás nélkül látszik a minimum vagy maximum helye (<code>x = u</code>) és értéke (<code>v</code>).</li>
              <li><strong>Grafikon azonnali rajzolása:</strong> A csúcspontból a páratlan lépések szabályával ($1a, 3a, 5a$) rögtön felrajzolható!</li>
            </ul>
          </TheoryCard>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 my-2">
          <GeneralToCanonicalParabolaSvg size={280} />
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: A NEVEZETES AZONOSSÁGOK */}
      <TheorySection
        number={2}
        title="A nevezetes azonosságok felismerése másodfokú kifejezésekben"
        icon={<Square className="w-5 h-5 text-indigo-500" />}
        badge="NEVEZETES AZONOSSÁG"
        badgeColor="indigo"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A legegyszerűbb eset az, amikor az <code>ax² + bx + c</code> kifejezés maga egy <strong>pontos teljes négyzet</strong>:
          <code>(x + d)² = x² + 2dx + d²</code> vagy <code>(x - d)² = x² - 2dx + d²</code>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3 text-xs">
          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-indigo-600 block mb-1">x² + 6x + 9</span>
            <p className="text-slate-600 dark:text-slate-300">
              Mivel <code>6x = 2 · 3x</code> és <code>9 = 3²</code>:<br />
              <strong>f(x) = (x + 3)²</strong><br />
              Csúcspont: <code>T(-3; 0)</code>, érinti a tengelyt!
            </p>
          </div>

          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-indigo-600 block mb-1">x² - 8x + 16</span>
            <p className="text-slate-600 dark:text-slate-300">
              Mivel <code>-8x = 2 · (-4)x</code> és <code>16 = (-4)²</code>:<br />
              <strong>f(x) = (x - 4)²</strong><br />
              Csúcspont: <code>T(4; 0)</code>, érinti a tengelyt!
            </p>
          </div>

          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-indigo-600 block mb-1">x² + 10x + 25</span>
            <p className="text-slate-600 dark:text-slate-300">
              Mivel <code>10x = 2 · 5x</code> és <code>25 = 5²</code>:<br />
              <strong>f(x) = (x + 5)²</strong><br />
              Csúcspont: <code>T(-5; 0)</code>, érinti a tengelyt!
            </p>
          </div>
        </div>

        <TheoryCallout title="Mit tegyünk, ha a konstans tag nem egyezik a négyzettel?" variant="tip">
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            A valóságban az esetek 95%-ában a konstans tag nem felel meg a pontos négyzetnek (pl. <code>x² - 6x + 5</code>).
            Ilyenkor alkalmazzuk a <strong>teljes négyzetté kiegészítés</strong> zseniális módszerét!
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* 3. SZEKCIÓ: TELJES NÉGYZETTÉ KIEGÉSZÍTÉS (a = 1 ESETÉN) */}
      <TheorySection
        number={3}
        title="A teljes négyzetté kiegészítés algebrai és geometriai lépései"
        icon={<Calculator className="w-5 h-5 text-emerald-500" />}
        badge="ALGEBRAI MÓDSZER"
        badgeColor="emerald"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Hogyan alakítjuk át az <code>f(x) = x² - 6x + 5</code> függvényt?
          Nézzük meg a 3 egyszerű lépést:
        </p>

        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 my-3">
          <CompletingSquareGeometricSvg size={240} />
        </div>

        <div className="space-y-3 my-3">
          <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
            <span className="font-bold text-emerald-800 dark:text-emerald-300 text-xs block mb-1">
              1. Lépés: Az elsőfokú tag felezése
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Az <code>x² - 6x</code> kifejezésben az <code>x</code> együtthatója <code>-6</code>. Ennek a fele: <code>-3</code>.
              A keresett teljes négyzet alapja tehát: <code>(x - 3)²</code>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
            <span className="font-bold text-amber-800 dark:text-amber-300 text-xs block mb-1">
              2. Lépés: A felesleges négyzet levonása
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Mivel <code>(x - 3)² = x² - 6x + 9</code>, a kifejtés során bejött egy felesleges <code>+9</code>!
              Hogy az egyenlőség megmaradjon, ezt azonnal le kell vonnunk:
              <code>x² - 6x = (x - 3)² - 9</code>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
            <span className="font-bold text-indigo-800 dark:text-indigo-300 text-xs block mb-1">
              3. Lépés: A konstans tag hozzáadása és összevonás
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Hozzáírjuk az eredeti konstans <code>+5</code>-öt:
              <code>f(x) = (x - 3)² - 9 + 5 = (x - 3)² - 4</code>!
              Kész a kanonikus alak! Csúcspont: <strong>T(3; -4)</strong>.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: ÁLTALÁNOS ESET: a ≠ 1 */}
      <TheorySection
        number={4}
        title="Teljes négyzetté kiegészítés általános esetben (a ≠ 1)"
        icon={<Layers className="w-5 h-5 text-purple-500" />}
        badge="ÁLTALÁNOS ESET"
        badgeColor="purple"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Ha a főegyüttható nem 1 (pl. <code>f(x) = 2x² + 8x + 6</code> vagy <code>f(x) = -x² + 4x - 1</code>),
          akkor az első lépésben <strong>kiemeljük az a-t az x²-es és az x-es tagból</strong>:
        </p>

        <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 my-2 text-xs font-mono space-y-1.5">
          <div className="text-slate-500">1. Példa: f(x) = 2x² + 8x + 6</div>
          <div>= 2 · [x² + 4x] + 6 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <em>(2 kiemelése a változós tagokból)</em></div>
          <div>= 2 · [(x + 2)² - 4] + 6 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <em>(4 fele 2, levonva 2² = 4)</em></div>
          <div>= 2(x + 2)² - 8 + 6 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <em>(zárójel felbontása a 2-vel: 2 · (-4) = -8)</em></div>
          <div className="text-emerald-600 font-bold">= 2(x + 2)² - 2 ⟹ Csúcspont: T(-2; -2)</div>
        </div>

        <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 my-2 text-xs font-mono space-y-1.5">
          <div className="text-slate-500">2. Példa negatív főegyütthatóval: f(x) = -x² + 4x - 1</div>
          <div>= -[x² - 4x] - 1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <em>(-1 kiemelése: a +4x-ből -4x lesz!)</em></div>
          <div>= -[(x - 2)² - 4] - 1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <em>(-4 fele -2, levonva (-2)² = 4)</em></div>
          <div>= -(x - 2)² + 4 - 1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <em>(-(-4) = +4 lesz!)</em></div>
          <div className="text-purple-600 font-bold">= -(x - 2)² + 3 ⟹ Csúcspont: T(2; 3), maximuma van!</div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: A CSÚCSPONT UNIVERZÁLIS KÉPLETE */}
      <TheorySection
        number={5}
        title="A csúcspont koordinátáinak univerzális képlete"
        icon={<Sparkles className="w-5 h-5 text-amber-500" />}
        badge="GYORS KÉPLET"
        badgeColor="amber"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Az általános <code>ax² + bx + c</code> kifejezést betűkkel teljes négyzetté alakítva egy univerzális képletet kapunk,
          amellyel a csúcspont koordinátái <strong>másodpercek alatt kiszámolhatók</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 text-center">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase block mb-1">Csúcs x-koordinátája (u)</span>
            <div className="text-lg font-black text-slate-800 dark:text-slate-100 font-mono">
              <MathText>{"u = -b / (2a)"}</MathText>
            </div>
            <span className="text-xs text-slate-600 dark:text-slate-400 mt-1 block">
              Ez a szimmetriatengely egyenlete is: <code>x = -b / (2a)</code>.
            </span>
          </div>

          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-200 dark:border-indigo-800 text-center">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase block mb-1">Csúcs y-koordinátája (v)</span>
            <div className="text-lg font-black text-slate-800 dark:text-slate-100 font-mono">
              <MathText>{"v = f(u) = c - b² / (4a)"}</MathText>
            </div>
            <span className="text-xs text-slate-600 dark:text-slate-400 mt-1 block">
              Egyszerűen behelyettesítjük <code>u</code>-t a függvény képletébe: <code>f(u)</code>!
            </span>
          </div>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 my-2">
          <TwoParabolasSameVertexSvg size={280} />
        </div>
      </TheorySection>

      {/* INTERAKTÍV LABOR 1: KIEGÉSZÍTŐ KALKULÁTOR */}
      <TheorySection
        number={6}
        title="Interaktív Labor: Teljes Négyzetté Kiegészítés és Csúcspont Szimulátor"
        icon={<Sliders className="w-5 h-5 text-amber-500" />}
        badge="INTERAKTÍV ESZKÖZ"
        badgeColor="amber"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          Állítsd be az <code>a</code>, <code>b</code> és <code>c</code> együtthatókat!
          A rendszer automatikusan levezeti a teljes négyzetté alakítás minden fázisát és kirajzolja az eredményt!
        </p>

        {/* Gyors sablon gombok */}
        <div className="flex flex-wrap gap-2 my-3">
          {[
            { label: 'x² - 6x + 5', a: 1, b: -6, c: 5 },
            { label: 'x² + 4x + 7', a: 1, b: 4, c: 7 },
            { label: '-x² + 6x - 5', a: -1, b: 6, c: -5 },
            { label: '2x² - 8x + 6', a: 2, b: -8, c: 6 }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setCoeffA(item.a);
                setCoeffB(item.b);
                setCoeffC(item.c);
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/40 text-slate-700 dark:text-slate-300 transition-all"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vezérlők */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700 dark:text-slate-300">Főegyüttható (a):</span>
                  <span className="font-mono text-amber-600 font-bold">{coeffA}</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="1"
                  value={coeffA}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setCoeffA(val === 0 ? 1 : val);
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700 dark:text-slate-300">Elsőfokú együttható (b):</span>
                  <span className="font-mono text-indigo-600 font-bold">{coeffB}</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  step="2"
                  value={coeffB}
                  onChange={(e) => setCoeffB(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700 dark:text-slate-300">Konstans tag (c):</span>
                  <span className="font-mono text-emerald-600 font-bold">{coeffC}</span>
                </div>
                <input
                  type="range"
                  min="-8"
                  max="8"
                  step="1"
                  value={coeffC}
                  onChange={(e) => setCoeffC(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Részletes levezetés */}
              <div className="p-3 bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1 font-mono">
                <div className="text-slate-400 text-[11px] mb-1">Átalakítás lépései:</div>
                <div>u = -b / (2a) = -({coeffB}) / {2 * coeffA} = <strong>{uVal}</strong></div>
                <div>v = c - b² / (4a) = {coeffC} - {coeffB * coeffB} / {4 * coeffA} = <strong>{vVal}</strong></div>
                <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700 text-amber-700 dark:text-amber-300 font-bold">
                  Kanonikus alak: {coeffA === 1 ? '' : coeffA === -1 ? '-' : `${coeffA}`}({formatInside(uVal)})² {formatSign(vVal)}
                </div>
                <div className="text-slate-800 dark:text-slate-100 font-black">
                  Csúcspont: T({uVal}; {vVal}) &nbsp;|&nbsp; y-metszet: (0; {coeffC})
                </div>
              </div>
            </div>

            {/* Dinamikus SVG grafikon */}
            <div className="flex flex-col items-center justify-center p-2 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <svg viewBox="-80 -80 160 160" width={220} height={220} className="overflow-visible select-none drop-shadow-sm">
                <line x1="-70" y1="0" x2="70" y2="0" stroke="#94a3b8" strokeWidth="1" />
                <line x1="0" y1="70" x2="0" y2="-70" stroke="#94a3b8" strokeWidth="1" />
                <text x="64" y="10" fill="#64748b" fontSize="8">x</text>
                <text x="-10" y="-62" fill="#64748b" fontSize="8">y</text>

                {(() => {
                  const pxU = uVal * 10;
                  const pxV = -vVal * 10;
                  const spanY = -35 * coeffA;
                  const strokeColor = coeffA > 0 ? '#d97706' : '#e11d48';

                  return (
                    <path
                      d={`M ${pxU - 35} ${pxV + spanY} Q ${pxU} ${pxV - spanY} ${pxU + 35} ${pxV + spanY}`}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth="2.5"
                    />
                  );
                })()}

                {/* Csúcspont */}
                <circle cx={uVal * 10} cy={-vVal * 10} r="3.5" fill="#d97706" />
                {/* y metszet (0; c) */}
                <circle cx="0" cy={-coeffC * 10} r="3" fill="#2563eb" />
              </svg>
              <span className="text-[11px] text-slate-500 mt-2 font-mono">
                T({uVal}; {vVal}), y-metszet: (0; {coeffC})
              </span>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 7. SZEKCIÓ: TIPIKUS VIZSGATÉVESZTÉSEK */}
      <TheorySection
        number={7}
        title="Tipikus buktatók a teljes négyzetté alakításnál"
        icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
        badge="CSAPDÁK"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox title="1. Buktató: A levonás előjele mindig negatív!">
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              Gyakori tévedés, hogy ha a zárójelben pluszjel van: <code>(x + 3)²</code>, akkor a levonásnál is hozzáadnak 9-et.
              <strong>Ez végzetes hiba!</strong> Mivel <code>(x + 3)² = x² + 6x + 9</code>, a plusz 9-et el kell tüntetni:
              <code>x² + 6x = (x + 3)² - 9</code>! A levonandó tag <strong>mindig mínusz</strong>!
            </p>
          </TheoryTrapBox>

          <TheoryTrapBox title="2. Buktató: Főegyüttható kiemelésének elfelejtése a konstansból">
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <code>2x² + 8x + 6 = 2[(x + 2)² - 4] + 6</code> esetén a zárójel felbontásakor a <code>-4</code> megszorzódik 2-vel:
              <code>2(x + 2)² - 8 + 6 = 2(x + 2)² - 2</code>. Nem szabad elfelejteni a <code>2 · (-4) = -8</code> beszorzást!
            </p>
          </TheoryTrapBox>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

