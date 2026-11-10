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
  LeadingCoeffStrategySvg,
  ExtremumParabolaSvg,
  FractionalSquareMethodSvg,
  NegativeLeadingCoeffSvg
} from './CompletingSquareAppFigures';
import {
  Calculator,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Scale,
  Layers,
  Sparkles,
  Maximize2,
  Sliders,
  RotateCcw,
  Compass,
  ArrowRight
} from 'lucide-react';

interface CompletingSquareAppTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const CompletingSquareAppTheory: React.FC<CompletingSquareAppTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab State: a, b, c együtthatók ---
  const [aVal, setAVal] = useState<number>(2);
  const [bVal, setBVal] = useState<number>(-8);
  const [cVal, setCVal] = useState<number>(-10);

  // Számítások
  // ax² + bx + c = a(x - u)² + v
  // u = -b / (2a)
  // v = c - a * u² = c - b² / (4a)
  const safeA = aVal === 0 ? 1 : aVal;
  const uVal = -bVal / (2 * safeA);
  const uSquared = uVal * uVal;
  const vVal = cVal - safeA * uSquared;

  // Egyenletmegoldás: a(x - u)² + v = 0  =>  (x - u)² = -v / a
  const kVal = -vVal / safeA;

  const setPreset = (a: number, b: number, c: number) => {
    setAVal(a);
    setBVal(b);
    setCVal(c);
  };

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • V. MÁSODFOKÚ EGYENLETEK • 30. LECKE"
      title="Teljes négyzetté kiegészítés alkalmazása"
      subtitle="Nem 1 főegyütthatójú (a ≠ 1) egyenletek, törtekkel való számolás, negatív főegyüttható és a szélsőértékek (minimum / maximum) algebrai meghatározása."
      themeColor="orange"
      pdfFilename="10_osztaly_masodfoku_egyenletek_teljes_negyzet_alkalmazasa_tananyag.pdf"
      quickRule={{
        label: 'A FŐEGYÜTTHETŐS NÉGYZETKIEGÉSZÍTÉS 2 FŐ SZABÁLYA',
        align: 'left',
        formula: (
          <div className="space-y-3 text-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-orange-50/80 p-3 rounded-xl border border-orange-200">
                <span className="font-bold text-orange-900 block mb-1">1. Egyenletmegoldásnál: Végigosztás a-val!</span>
                <p className="font-mono text-xs font-bold text-orange-800">
                  ax² + bx + c = 0 &nbsp; / : a &nbsp; ⟹ &nbsp; x² + (b/a)x + (c/a) = 0
                </p>
                <p className="text-[11px] text-orange-700 mt-1">
                  Az egyenlet mindkét oldalát leosztva az ismert normált alakra jutunk, ahol már könnyű a felezés.
                </p>
              </div>
              <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-200">
                <span className="font-bold text-blue-900 block mb-1">2. Szélsőértéknél: a kiemelése a zárójel elé!</span>
                <p className="font-mono text-xs font-bold text-blue-800">
                  f(x) = a · [ (x - u)² ] + v
                </p>
                <p className="text-[11px] text-blue-700 mt-1">
                  Csúcspont M(u; v). Ha a &gt; 0: minimum = v. Ha a &lt; 0: maximum = v.
                </p>
              </div>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz a főegyütthatós feladatok tesztelésére?"
      practiceSubtitle="Gyakorold az a ≠ 1 egyenletek megoldását és a szélsőérték-feladatokat a kvízben és a Wordwall játékokban!"
      interactiveSection={
        <div className="bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-orange-500/10 border-2 border-orange-200/80 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500 text-white rounded-2xl shadow-md">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Főegyütthatós Négyzetkiegészítő és Szélsőérték Szimulátor
                </h3>
                <p className="text-xs text-slate-600">
                  Változtasd az a, b, c paramétereket, és figyeld meg az átalakítás lépéseit és a szélsőértéket!
                </p>
              </div>
            </div>

            {/* Mintapélda gombok */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setPreset(2, -8, -10)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  aVal === 2 && bVal === -8 && cVal === -10
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-orange-50'
                }`}
              >
                Osztható: 2x² - 8x - 10
              </button>
              <button
                onClick={() => setPreset(-1, 6, -5)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  aVal === -1 && bVal === 6 && cVal === -5
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-orange-50'
                }`}
              >
                Negatív a: -x² + 6x - 5
              </button>
              <button
                onClick={() => setPreset(2, 5, -3)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  aVal === 2 && bVal === 5 && cVal === -3
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-orange-50'
                }`}
              >
                Törtes: 2x² + 5x - 3
              </button>
              <button
                onClick={() => setPreset(3, -12, 12)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  aVal === 3 && bVal === -12 && cVal === 12
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-orange-50'
                }`}
              >
                Kettős gyök: 3x² - 12x + 12
              </button>
            </div>
          </div>

          {/* Csúszkák */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-white/80 p-5 rounded-2xl border border-orange-100">
            {/* a csúszka */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">Főegyüttható (a ≠ 0):</label>
                <span className="text-sm font-mono font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-200">
                  a = {aVal}
                </span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="1"
                value={aVal}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setAVal(val === 0 ? 1 : val);
                }}
                className="w-full accent-orange-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>-4</span>
                <span>1</span>
                <span>+4</span>
              </div>
            </div>

            {/* b csúszka */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">Lineáris tag (b):</label>
                <span className="text-sm font-mono font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                  b = {bVal > 0 ? `+${bVal}` : bVal}
                </span>
              </div>
              <input
                type="range"
                min="-12"
                max="12"
                step="1"
                value={bVal}
                onChange={(e) => setBVal(parseInt(e.target.value, 10))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>-12</span>
                <span>0</span>
                <span>+12</span>
              </div>
            </div>

            {/* c csúszka */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">Konstans tag (c):</label>
                <span className="text-sm font-mono font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
                  c = {cVal > 0 ? `+${cVal}` : cVal}
                </span>
              </div>
              <input
                type="range"
                min="-20"
                max="20"
                step="1"
                value={cVal}
                onChange={(e) => setCVal(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>-20</span>
                <span>0</span>
                <span>+20</span>
              </div>
            </div>
          </div>

          {/* Dinamikus levezetés */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Kifejezés / Egyenlet:
              </span>
              <span className="text-lg font-mono font-black text-slate-900">
                {aVal === -1 ? '-x²' : aVal === 1 ? 'x²' : `${aVal}x²`}{' '}
                {bVal >= 0 ? `+ ${bVal}x` : `- ${Math.abs(bVal)}x`}{' '}
                {cVal >= 0 ? `+ ${cVal}` : `- ${Math.abs(cVal)}`} = 0
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* 1. Lépés: Normált alak */}
              <div className="p-3 bg-orange-50 rounded-xl border border-orange-200">
                <span className="text-[11px] font-bold text-orange-900 block">
                  1. Lépés: Végigosztás a-val ({aVal})
                </span>
                <p className="font-mono text-sm font-bold text-orange-800 mt-1">
                  x² {bVal / aVal >= 0 ? `+ ${(bVal / aVal).toFixed(2)}x` : `- ${Math.abs(bVal / aVal).toFixed(2)}x`} {cVal / aVal >= 0 ? `+ ${(cVal / aVal).toFixed(2)}` : `- ${Math.abs(cVal / aVal).toFixed(2)}`} = 0
                </p>
                <p className="text-[11px] text-orange-700 mt-0.5">
                  Normált alak: p = {(bVal / aVal).toFixed(2)}, q = {(cVal / aVal).toFixed(2)}
                </p>
              </div>

              {/* 2. Lépés: Teljes négyzet alak */}
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <span className="text-[11px] font-bold text-blue-900 block">
                  2. Lépés: Négyzetes alak
                </span>
                <p className="font-mono text-sm font-bold text-blue-800 mt-1">
                  (x {uVal <= 0 ? `+ ${Math.abs(uVal).toFixed(2)}` : `- ${uVal.toFixed(2)}`})² = {kVal.toFixed(2)}
                </p>
                <p className="text-[11px] text-blue-700 mt-0.5">
                  Felezett érték d = {(bVal / (2 * safeA)).toFixed(2)}
                </p>
              </div>

              {/* 3. Lépés: Szélsőérték & Csúcspont */}
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                <span className="text-[11px] font-bold text-purple-900 block">
                  3. Parabola Csúcspont M(u; v)
                </span>
                <p className="font-mono text-sm font-bold text-purple-800 mt-1">
                  M({uVal.toFixed(2)}; {vVal.toFixed(2)})
                </p>
                <p className="text-[11px] text-purple-700 mt-0.5">
                  {safeA > 0 ? 'Minimum érték = ' : 'Maximum érték = '} {vVal.toFixed(2)} (hely: x = {uVal.toFixed(2)})
                </p>
              </div>
            </div>

            {/* Megoldások kimenet */}
            <div
              className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                kVal > 0.0001
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : Math.abs(kVal) <= 0.0001
                  ? 'bg-blue-50 border-blue-200 text-blue-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block">
                  {kVal > 0.0001
                    ? 'Az egyenletnek 2 valós gyöke van:'
                    : Math.abs(kVal) <= 0.0001
                    ? 'Az egyenletnek 1 valós gyöke van (kettős gyök):'
                    : 'Nincs valós megoldás a valós számok halmazán:'}
                </span>
                <p className="text-base font-bold mt-1">
                  {kVal > 0.0001 && (
                    <>
                      x₁ = {(uVal + Math.sqrt(kVal)).toFixed(2)}
                      <span className="mx-3 text-slate-400">|</span>
                      x₂ = {(uVal - Math.sqrt(kVal)).toFixed(2)}
                    </>
                  )}
                  {Math.abs(kVal) <= 0.0001 && (
                    <>x₁ = x₂ = {uVal.toFixed(2)}</>
                  )}
                  {kVal < -0.0001 && (
                    <>A négyzet nem lehet negatív (k = {kVal.toFixed(2)} &lt; 0), így x ∈ ∅.</>
                  )}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className="px-3 py-1 bg-white text-slate-800 text-xs font-black rounded-lg border border-slate-200">
                  {safeA > 0 ? '⬇ Minimuma van' : '⬆ Maximuma van'}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black text-white ${
                    kVal > 0.0001
                      ? 'bg-emerald-600'
                      : Math.abs(kVal) <= 0.0001
                      ? 'bg-blue-600'
                      : 'bg-rose-600'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {kVal > 0.0001 ? '2 gyök' : Math.abs(kVal) <= 0.0001 ? '1 gyök' : '0 gyök'}
                </span>
              </div>
            </div>
          </div>
        </div>
      }
      sections={[
        {
          id: 'sec-strategies',
          title: '1. A főegyüttható (a ≠ 1) kezelésének két fő módszere',
          description:
            'Mikor érdemes végigosztani az egyenletet a-val, és mikor kell kiemelni a másodfokú és elsőfokú tagból?',
          color: 'orange',
          badge: 'Stratégiák',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="Végigosztás vs. Kiemelés összehasonlítása"
                color="orange"
                icon={<Scale className="w-5 h-5 text-orange-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <p>
                    Ha a másodfokú tag előtt nem 1 áll ($a \neq 1$), a közvetlen négyzetkiegészítés nehézkes lenne. Két bevált stratégia létezik:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-orange-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <LeadingCoeffStrategySvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      Egyenletmegoldáskor a végigosztás a leggyorsabb, függvényeknél és szélsőértéknél a kiemelés elengedhetetlen
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-orange-50/70 border border-orange-200 rounded-2xl space-y-2">
                      <span className="font-bold text-orange-950 text-sm block">1. Módszer: Végigosztás a-val</span>
                      <p className="text-xs text-slate-600">
                        Ha egy <strong>egyenletet</strong> oldunk meg ($= 0$), az egyenlet mindkét oldalát bátran eloszthatjuk a nullától különböző $a$ számmal:
                      </p>
                      <div className="bg-white p-3 rounded-xl border border-orange-100 font-mono text-xs text-orange-900 space-y-1">
                        <p>2x² - 8x - 10 = 0 &nbsp;&nbsp; / : 2</p>
                        <p className="font-bold text-orange-700">x² - 4x - 5 = 0</p>
                        <p className="text-slate-600">(x - 2)² - 4 - 5 = 0</p>
                        <p className="text-slate-600">(x - 2)² = 9</p>
                        <p className="text-emerald-700 font-bold">x - 2 = ±3 ⟹ x₁ = 5, x₂ = -1</p>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2">
                      <span className="font-bold text-blue-950 text-sm block">2. Módszer: a kiemelése</span>
                      <p className="text-xs text-slate-600">
                        Ha egy <strong>kifejezést</strong> kell átalakítani (pl. szélsőérték vizsgálathoz), nem oszthatunk, mert megváltozna a kifejezés értéke! Ilyenkor kiemeljük $a$-t:
                      </p>
                      <div className="bg-white p-3 rounded-xl border border-blue-100 font-mono text-xs text-blue-900 space-y-1">
                        <p>2x² - 8x - 10 = 2 · [x² - 4x] - 10</p>
                        <p>= 2 · [(x - 2)² - 4] - 10</p>
                        <p>= 2(x - 2)² - 8 - 10</p>
                        <p className="font-bold text-blue-700">= 2(x - 2)² - 18</p>
                        <p className="text-emerald-700 font-bold">Minimum: -18 (helye: x = 2)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-fractions',
          title: '2. Törtekkel való számolás a négyzetkiegészítésnél',
          description:
            'Hogyan számolunk pontosan, ha a felezéskor vagy az osztáskor törtes együtthatók (pl. 5/2, 25/4) keletkeznek?',
          color: 'amber',
          badge: 'Törtes számolás',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="Páratlan együtthatók és a törtek kezelése"
                color="amber"
                icon={<Calculator className="w-5 h-5 text-amber-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <p>
                    Sokan megijednek, ha az elsőfokú tag együtthatója páratlan szám (pl. $x^2 + 5x$). Tizedestörtek helyett érdemes <strong>közönséges törtekkel</strong> számolni, mert azok pontosak és átláthatóbbak:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-amber-50/30 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <FractionalSquareMethodSvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A tört felezése: a számláló marad, a nevezőt szorozzuk 2-vel; négyzetre emeléskor számláló és nevező is négyzetre kerül
                    </p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs space-y-2">
                    <span className="font-bold text-amber-950 uppercase block">Mintalevezetés: 2x² + 5x - 3 = 0</span>
                    <ol className="list-decimal pl-5 space-y-1 font-mono text-amber-900">
                      <li>Osszunk 2-vel: x² + (5/2)x - 3/2 = 0</li>
                      <li>Felezzük az 5/2-et: d = 5/4. Ennek négyzete d² = 25/16.</li>
                      <li>Kiegészítés: (x + 5/4)² - 25/16 - 3/2 = 0</li>
                      <li>Közös nevezőre hozás (3/2 = 24/16): -25/16 - 24/16 = -49/16</li>
                      <li>Átrendezés: (x + 5/4)² = 49/16</li>
                      <li>Gyökvonás: x + 5/4 = ±7/4 ⟹ <strong>x₁ = 2/4 = 0,5</strong>, <strong>x₂ = -12/4 = -3</strong></li>
                    </ol>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-negative',
          title: '3. Negatív főegyüttható (a < 0) és a (-1)-gyel szorzás',
          description:
            'A leggyakoribb dolgozathiba megelőzése: mit tegyünk, ha -x² vagy negatív szám áll az egyenlet élén?',
          color: 'purple',
          badge: 'Negatív főegyüttható',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A negatív előjel megszüntetése egyetlen lépésben"
                color="purple"
                icon={<RotateCcw className="w-5 h-5 text-purple-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <p>
                    Ha a másodfokú tag előjele negatív (pl. $-x^2 + 6x - 5 = 0$), a legtisztább lépés az egyenlet <strong>mindkét oldalát beszorozni (-1)-gyel</strong>:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-purple-50/30 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <NegativeLeadingCoeffSvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A (-1)-gyel való szorzás minden tag előjelét megfordítja, így az egyenlet azonnal megszokott normált alakra változik
                    </p>
                  </div>

                  <TheoryTrapBox
                    title="Vigyázat szélsőértéknél: Nem szabad szorozni (-1)-gyel!"
                    color="rose"
                  >
                    <p className="text-xs text-rose-900 leading-relaxed">
                      Ha a feladat az $f(x) = -x^2 + 6x - 5$ függvény <strong>szélsőértékét</strong> kérdezi, TILOS beszorozni (-1)-gyel! A $(-1)$-gyel való szorzás ugyanis megfordítaná a parabolát (a maximumból minimum lenne, az értékek ellentettjükre változnának). Szélsőértéknél <strong>kiemeljük a (-1)-et</strong>:
                      <span className="font-mono block bg-white/80 p-2 my-1 rounded border border-rose-300 text-rose-800">
                        f(x) = -[x² - 6x] - 5 = -[(x - 3)² - 9] - 5 = -(x - 3)² + 9 - 5 = -(x - 3)² + 4
                      </span>
                      Itt a maximum értéke <strong>+4</strong>, a helye <strong>x = 3</strong>!
                    </p>
                  </TheoryTrapBox>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-extremum',
          title: '4. Szélsőérték-feladatok: Minimum és maximum megállapítása',
          description:
            'Hogyan olvasható le azonnal a legkisebb vagy legnagyobb érték a teljes négyzetes alakból differenciálszámítás nélkül?',
          color: 'emerald',
          badge: 'Szélsőérték',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A teljes négyzet tulajdonsága és a parabola csúcspontja"
                color="emerald"
                icon={<Maximize2 className="w-5 h-5 text-emerald-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <p>
                    Mivel bármely valós szám négyzete nemnegatív: $(x - u)^2 \ge 0$, és a legkisebb értéke pontosan 0 (amikor $x = u$), ezért az $f(x) = a(x - u)^2 + v$ kanonikus alak azonnal elárulja a szélsőértéket:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-emerald-50/30 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <ExtremumParabolaSvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      Ha a &gt; 0, a parabola felfelé nyílik ⟹ Minimum. Ha a &lt; 0, a parabola lefelé nyílik ⟹ Maximum.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                      <span className="font-bold text-emerald-950 block">Példa 1: Minimum keresése</span>
                      <p className="font-mono text-emerald-900">f(x) = 3x² - 12x + 19</p>
                      <p className="font-mono text-slate-700">= 3 · [x² - 4x] + 19</p>
                      <p className="font-mono text-slate-700">= 3 · [(x - 2)² - 4] + 19</p>
                      <p className="font-mono text-slate-700">= 3(x - 2)² - 12 + 19 = <strong>3(x - 2)² + 7</strong></p>
                      <p className="text-emerald-800 font-bold mt-1">
                        Mivel a = 3 &gt; 0: Minimum értéke = <strong>7</strong>, helye: <strong>x = 2</strong>.
                      </p>
                    </div>

                    <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200 space-y-1">
                      <span className="font-bold text-rose-950 block">Példa 2: Maximum keresése</span>
                      <p className="font-mono text-rose-900">g(x) = -2x² + 8x + 1</p>
                      <p className="font-mono text-slate-700">= -2 · [x² - 4x] + 1</p>
                      <p className="font-mono text-slate-700">= -2 · [(x - 2)² - 4] + 1</p>
                      <p className="font-mono text-slate-700">= -2(x - 2)² + 8 + 1 = <strong>-2(x - 2)² + 9</strong></p>
                      <p className="text-rose-800 font-bold mt-1">
                        Mivel a = -2 &lt; 0: Maximum értéke = <strong>9</strong>, helye: <strong>x = 2</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-traps',
          title: '5. Tipikus dolgozathibák a főegyütthatós egyenleteknél',
          description:
            'A leggyakoribb hibák elkerülése kiemelésnél, visszaszorzásnál és a konstans tag kezelésénél.',
          color: 'rose',
          badge: 'Csapdák elkerülése',
          content: (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TheoryTrapBox
                  title="1. Csapda: A kiemelt 'a' visszaszorzásának elfelejtése"
                  color="rose"
                >
                  <p className="text-xs text-rose-900 leading-relaxed">
                    $2x^2 - 12x + 10$ alakításakor a zárójelből levont tagot sokan elfelejtik megszorozni $2$-vel:
                    <span className="block font-mono bg-white/70 p-1.5 my-1 rounded border border-rose-300 line-through">
                      2 · [(x - 3)² - 9] + 10 = 2(x - 3)² - 9 + 10 = 2(x - 3)² + 1 (HIBÁS!)
                    </span>
                    <strong>Helyesen:</strong> A zárójelbontáskor a $-9$-et is meg kell szorozni 2-vel: $2 \cdot (-9) = -18$, így $2(x - 3)^2 - 18 + 10 = 2(x - 3)^2 - 8$!
                  </p>
                </TheoryTrapBox>

                <TheoryTrapBox
                  title="2. Csapda: Negatív szám kiemelésekor az előjel nem vált át"
                  color="rose"
                >
                  <p className="text-xs text-rose-900 leading-relaxed">
                    $-x^2 + 8x$ kifejezésből $(-1)$-et kiemelve a belső tag előjelének kötelező megfordulnia:
                    <span className="block font-mono bg-white/70 p-1.5 my-1 rounded border border-rose-300 line-through">
                      -x² + 8x = -[x² + 8x]  (HIBÁS ELŐJEL!)
                    </span>
                    <strong>Helyesen:</strong> $-x^2 + 8x = -[x^2 - 8x] = -[(x - 4)^2 - 16] = -(x - 4)^2 + 16$!
                  </p>
                </TheoryTrapBox>
              </div>

              <TheoryCallout
                title="Gyakorlati jótanács a dolgozathoz"
                color="orange"
                icon={<Lightbulb className="w-5 h-5 text-orange-600" />}
              >
                <p className="text-xs text-slate-700 leading-relaxed">
                  Egyenletmegoldásnál az első teendőd mindig legyen: <strong>van-e közös osztó?</strong> Ha például $3x^2 + 18x - 21 = 0$, ne kezdj el rögtön nehézkesen számolni! Ossz le azonnal 3-mal, így a kapott $x^2 + 6x - 7 = 0$ egyenlet másodpercek alatt megoldhatóvá válik fejben is!
                </p>
              </TheoryCallout>
            </div>
          )
        }
      ]}
    />
  );
};

