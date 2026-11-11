import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryTrapBox,
  TheoryCallout
} from '../TheoryTemplate';
import {
  FormulaAnatomySvg,
  DerivationStepsTreeSvg,
  DiscriminantCasesComparisonSvg,
  FormulaStepByStepMethodSvg
} from './QuadraticFormulaFigures';
import {
  Divide,
  Sparkles,
  Calculator,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Layers,
  HelpCircle,
  TrendingUp,
  Scale
} from 'lucide-react';

interface QuadraticFormulaTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const QuadraticFormulaTheory: React.FC<QuadraticFormulaTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív labor állapota: ax² + bx + c = 0
  const [aParam, setAParam] = useState<number>(1);
  const [bParam, setBParam] = useState<number>(-5);
  const [cParam, setCParam] = useState<number>(6);

  // Biztosítjuk, hogy a ≠ 0 legyen a szimulátorban
  const safeA = aParam === 0 ? 1 : aParam;

  // Számítások
  const dVal = bParam * bParam - 4 * safeA * cParam;
  const sqrtD = dVal >= 0 ? Math.sqrt(dVal) : NaN;
  const x1 = dVal >= 0 ? (-bParam + sqrtD) / (2 * safeA) : NaN;
  const x2 = dVal >= 0 ? (-bParam - sqrtD) / (2 * safeA) : NaN;

  // Gyors beállító segédfüggvény
  const setPreset = (a: number, b: number, c: number) => {
    setAParam(a);
    setBParam(b);
    setCParam(c);
  };

  return (
    <TheoryTemplate
      grade={10}
      chapterId="masodfoku-egyenletek"
      topicId="a-masodfoku-egyenlet-megoldokeplete"
      title="A másodfokú egyenlet megoldóképlete"
      subtitle="Az általános ax² + bx + c = 0 egyenlet univerzális megoldóképletének levezetése, a diszkrimináns szerepe és a számolás biztos lépései."
      badge="10. OSZTÁLY • V. MÁSODFOKÚ EGYENLETEK • TANANYAG"
      themeColor="rose"
      quickRule={{
        label: 'A Megoldóképlet Aranyszabálya',
        align: 'left',
        formula: (
          <div className="space-y-1.5 text-slate-800 dark:text-slate-100">
            <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50">
              <span className="text-[11px] font-bold text-rose-800 dark:text-rose-300 block">Univerzális formula (a ≠ 0, 0-ra rendezve):</span>
              <span className="font-mono text-xs sm:text-sm font-black text-rose-700 dark:text-rose-400 block mt-0.5">
                x₁,₂ = (-b ± √(b² - 4ac)) / (2a)
              </span>
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center justify-between gap-2 pt-0.5">
              <span><strong>D &gt; 0:</strong> 2 valós gyök</span>
              <span><strong>D = 0:</strong> 1 kettős gyök</span>
              <span><strong>D &lt; 0:</strong> nincs valós gyök</span>
            </div>
          </div>
        )
      }}
      estimatedReadTime="25 perc"
      heroCard={{
        title: 'A Másodfokú Egyenlet Megoldóképlete',
        description:
          'Bármely másodfokú egyenlet azonnal megoldható a formula segítségével, amennyiben az egyenlet 0-ra van rendezve. Nincs szükség egyedi trükkökre: a képlet univerzális és megbízható.',
        formula: 'x₁,₂ = (-b ± √(b² - 4ac)) / (2a)',
        extraContent: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="font-bold text-rose-700">1. Diszkrimináns (D):</span>
              <p className="font-mono text-slate-700 mt-0.5">D = b² - 4ac</p>
              <p className="text-slate-500 text-[11px]">D &gt; 0: 2 gyök, D = 0: 1 gyök, D &lt; 0: 0 gyök</p>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="font-bold text-rose-700">2. Számláló (-b ± √D):</span>
              <p className="font-mono text-slate-700 mt-0.5">-b a lineáris tag ellentettje</p>
              <p className="text-slate-500 text-[11px]">A ± jel adja a két szimmetrikus ágat</p>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="font-bold text-rose-700">3. Nevező (2a):</span>
              <p className="font-mono text-slate-700 mt-0.5">Mindig 2 · a szorzattal osztunk</p>
              <p className="text-slate-500 text-[11px]">Gyakori hiba: nem szabad csak a-val osztani!</p>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz a megoldóképlet feladataira?"
      practiceSubtitle="Tedd próbára tudásodat a 30 feladatos interaktív kvízben és a játékos feladatokban!"
      interactiveSection={
        <div className="bg-gradient-to-br from-rose-500/10 via-amber-500/5 to-rose-500/10 border-2 border-rose-200/80 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-600 text-white rounded-2xl shadow-md">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Interaktív Megoldóképlet és Diszkrimináns Laboratórium
                </h3>
                <p className="text-xs text-slate-600">
                  Állítsd be az együtthatókat (a, b, c), és kövesd végig a diszkrimináns és a gyökök kiszámítását élőben!
                </p>
              </div>
            </div>

            {/* Mintapélda gombok */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setPreset(1, -5, 6)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  aParam === 1 && bParam === -5 && cParam === 6
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
                }`}
              >
                2 egész gyök (x² - 5x + 6)
              </button>
              <button
                onClick={() => setPreset(1, -6, 9)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  aParam === 1 && bParam === -6 && cParam === 9
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
                }`}
              >
                Kettős gyök (x² - 6x + 9)
              </button>
              <button
                onClick={() => setPreset(1, 2, 5)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  aParam === 1 && bParam === 2 && cParam === 5
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
                }`}
              >
                0 gyök (x² + 2x + 5)
              </button>
              <button
                onClick={() => setPreset(2, -7, 3)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  aParam === 2 && bParam === -7 && cParam === 3
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
                }`}
              >
                Tört gyök (2x² - 7x + 3)
              </button>
              <button
                onClick={() => setPreset(-1, 4, -3)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  aParam === -1 && bParam === 4 && cParam === -3
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
                }`}
              >
                Negatív a (-x² + 4x - 3)
              </button>
            </div>
          </div>

          {/* Csúszkák */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/80 p-5 rounded-2xl border border-rose-100">
            {/* a csúszka */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">Főegyüttható (a ≠ 0):</label>
                <span className="text-sm font-mono font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
                  a = {safeA > 0 ? `+${safeA}` : safeA}
                </span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={aParam}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setAParam(val === 0 ? 1 : val);
                }}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>-5</span>
                <span className="text-rose-500 font-bold">a ≠ 0</span>
                <span>+5</span>
              </div>
            </div>

            {/* b csúszka */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">Elsőfokú tag (b):</label>
                <span className="text-sm font-mono font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
                  b = {bParam > 0 ? `+${bParam}` : bParam}
                </span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                step="1"
                value={bParam}
                onChange={(e) => setBParam(parseInt(e.target.value, 10))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>-10</span>
                <span>0</span>
                <span>+10</span>
              </div>
            </div>

            {/* c csúszka */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">Konstans tag (c):</label>
                <span className="text-sm font-mono font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
                  c = {cParam > 0 ? `+${cParam}` : cParam}
                </span>
              </div>
              <input
                type="range"
                min="-15"
                max="15"
                step="1"
                value={cParam}
                onChange={(e) => setCParam(parseInt(e.target.value, 10))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>-15</span>
                <span>0</span>
                <span>+15</span>
              </div>
            </div>
          </div>

          {/* Élő számítás és levezetés kártya */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-inner space-y-4 font-mono text-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-3">
              <div>
                <span className="text-xs text-slate-400 font-sans uppercase tracking-wider block">
                  Aktuális Másodfokú Egyenlet:
                </span>
                <span className="text-xl sm:text-2xl font-black text-amber-400">
                  {safeA === 1 ? '' : safeA === -1 ? '-' : `${safeA}`}x²{' '}
                  {bParam >= 0 ? `+ ${bParam}` : `- ${Math.abs(bParam)}`}x{' '}
                  {cParam >= 0 ? `+ ${cParam}` : `- ${Math.abs(cParam)}`} = 0
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black font-sans ${
                    dVal > 0
                      ? 'bg-emerald-600 text-white'
                      : dVal === 0
                      ? 'bg-blue-600 text-white'
                      : 'bg-rose-600 text-white'
                  }`}
                >
                  {dVal > 0 ? '✓ 2 valós gyök' : dVal === 0 ? '✓ 1 kettős gyök' : '✕ 0 valós gyök'}
                </span>
              </div>
            </div>

            {/* Lépésenkénti kiértékelés */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-1.5">
                <span className="text-rose-400 font-bold block">1. Lépés: Diszkrimináns (D)</span>
                <p className="text-slate-300">
                  D = b² - 4ac = ({bParam})² - 4 · ({safeA}) · ({cParam})
                </p>
                <p className="text-slate-300">
                  D = {bParam * bParam} - ({4 * safeA * cParam}) ={' '}
                  <strong className={dVal >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                    {dVal}
                  </strong>
                </p>
                {dVal >= 0 && (
                  <p className="text-amber-300 font-bold">
                    √D = √{dVal} {Number.isInteger(sqrtD) ? `= ${sqrtD}` : `≈ ${sqrtD.toFixed(3)}`}
                  </p>
                )}
              </div>

              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-1.5">
                <span className="text-rose-400 font-bold block">2. Lépés: Megoldóképlet behelyettesítés</span>
                <p className="text-slate-300">
                  x₁,₂ = [-({bParam}) ± √{dVal}] / [2 · ({safeA})]
                </p>
                <p className="text-slate-300">
                  x₁,₂ = [{ -bParam } ± {dVal >= 0 ? (Number.isInteger(sqrtD) ? `${sqrtD}` : `√${dVal}`) : '√negatív'}] / [{ 2 * safeA }]
                </p>
              </div>
            </div>

            {/* Végeredmény sáv */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-slate-400 font-sans block">A MEGOLDÁSHALMAZ:</span>
                <div className="text-lg font-black mt-0.5">
                  {dVal > 0 && (
                    <span className="text-emerald-400">
                      x₁ = {Number.isInteger(x1) ? x1 : x1.toFixed(3)} &nbsp;&nbsp;|&nbsp;&nbsp; x₂ ={' '}
                      {Number.isInteger(x2) ? x2 : x2.toFixed(3)}
                    </span>
                  )}
                  {dVal === 0 && (
                    <span className="text-blue-400">
                      x₁ = x₂ = {Number.isInteger(x1) ? x1 : x1.toFixed(3)} (egyetlen valós gyök)
                    </span>
                  )}
                  {dVal < 0 && (
                    <span className="text-rose-400">
                      Nincs valós gyök (D = {dVal} &lt; 0), a valós számok körében x ∈ ∅.
                    </span>
                  )}
                </div>
              </div>
              <div className="text-xs text-slate-400 font-sans text-right">
                {safeA > 0 ? 'Parabola nyílása: ⬆ Felfelé' : 'Parabola nyílása: ⬇ Lefelé'}
              </div>
            </div>
          </div>
        </div>
      }
      sections={[
        {
          id: 'sec-formula-anatomy',
          title: '1. A megoldóképlet felépítése és anatómiája',
          description:
            'Hogyan épül fel a másodfokú egyenlet univerzális képlete, és mit jelentenek az egyes tagjai?',
          color: 'rose',
          badge: 'Alapképlet',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A másodfokú egyenlet kanonikus alakja és megoldóképlete"
                color="rose"
                icon={<Layers className="w-5 h-5 text-rose-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <p>
                    Az egyismeretlenes másodfokú egyenletek megoldásának legáltalánosabb eszköze a <strong>megoldóképlet</strong>. Bármilyen valós együtthatójú egyenletre alkalmazható, amennyiben az egyenlet 0-ra van rendezve:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-rose-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <FormulaAnatomySvg size={500} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A megoldóképlet felépítése, a számláló, a diszkrimináns és a nevező kulcsfontosságú elemei
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                    <div className="p-3.5 bg-rose-50/80 rounded-xl border border-rose-200">
                      <span className="font-bold text-rose-950 block text-xs uppercase">-b: A lineáris együttható ellentettje</span>
                      <p className="text-xs text-rose-900 mt-1">
                        Ha az egyenletben például <strong>-6x</strong> szerepel (b = -6), akkor a képletben <strong>-(-6) = +6</strong> áll! Ez a leggyakoribb előjelhiba forrása.
                      </p>
                    </div>
                    <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200">
                      <span className="font-bold text-amber-950 block text-xs uppercase">±: A két megoldási ág</span>
                      <p className="text-xs text-amber-900 mt-1">
                        A parabola tengelyes szimmetriája miatt a két gyök a szimmetriatengelytől (-b / 2a) azonos távolságra (±√D / 2a) helyezkedik el.
                      </p>
                    </div>
                    <div className="p-3.5 bg-emerald-50/80 rounded-xl border border-emerald-200">
                      <span className="font-bold text-emerald-950 block text-xs uppercase">2a: A nevező kétszerese</span>
                      <p className="text-xs text-emerald-900 mt-1">
                        A nevező mindig <strong>2 · a</strong>! Soha ne feledkezz meg a 2-es szorzóról, még akkor sem, ha a = 1 (ekkor a nevező 2).
                      </p>
                    </div>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-derivation',
          title: '2. A megoldóképlet elegáns levezetése (4a-s szorzási módszer)',
          description:
            'Honnan származik a megoldóképlet? Hogyan vezethető le a teljes négyzetté kiegészítésből törtek nélkül?',
          color: 'indigo',
          badge: 'Levezetés',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A megoldóképlet levezetése 6 lépésben"
                color="indigo"
                icon={<Sparkles className="w-5 h-5 text-indigo-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <p>
                    A megoldóképlet nem egy önkényes varázsformula: a <strong>teljes négyzetté kiegészítés</strong> közvetlen következménye. Ha az $ax^2 + bx + c = 0$ egyenletet szorozzuk $4a$-val, elkerülhetjük a kényelmetlen törteket, és azonnal felbukkan a jól ismert képlet:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-indigo-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <DerivationStepsTreeSvg size={500} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A megoldóképlet levezetésének folyamata a 4a-val való beszorzástól a gyökvonásig
                    </p>
                  </div>

                  <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl space-y-2 text-xs text-indigo-950">
                    <span className="font-bold text-sm block">Algebrai lépések részletesen:</span>
                    <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
                      <li>
                        <strong>Kiindulás:</strong> $ax^2 + bx + c = 0 \quad (a \neq 0)$.
                      </li>
                      <li>
                        <strong>Beszorzás 4a-val:</strong> $4a^2 x^2 + 4abx + 4ac = 0$.
                      </li>
                      <li>
                        <strong>Teljes négyzet:</strong> Mivel $(2ax)^2 = 4a^2 x^2$ és $2 \cdot (2ax) \cdot b = 4abx$, így a bal oldal átírható: $(2ax + b)^2 - b^2 + 4ac = 0$.
                      </li>
                      <li>
                        <strong>Átrendezés:</strong> A konstansokat a jobb oldalra visszük: $(2ax + b)^2 = b^2 - 4ac$.
                      </li>
                      <li>
                        <strong>Négyzetgyökvonás:</strong> Ha b² - 4ac ≥ 0: 2ax + b = ±√(b² - 4ac).
                      </li>
                      <li>
                        <strong>x kifejezése:</strong> Kivonunk b-t, majd osztunk 2a-val: x₁,₂ = (-b ± √(b² - 4ac)) / (2a).
                      </li>
                    </ol>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-discriminant',
          title: '3. A diszkrimináns (D = b² - 4ac) és a gyökök száma',
          description:
            'A gyökjel alatti kifejezés előjele határozza meg, hogy hány valós megoldása van a másodfokú egyenletnek.',
          color: 'blue',
          badge: 'Diszkrimináns',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A gyökök számának eldöntése a diszkrimináns előjeléből"
                color="blue"
                icon={<Scale className="w-5 h-5 text-blue-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <p>
                    A gyökjel alatt álló $b^2 - 4ac$ kifejezést <strong>diszkriminánsnak</strong> nevezzük (jele: $D$). A latin <em>discriminare</em> (megkülönböztetni) szóból ered, ugyanis ez különbözteti meg a másodfokú egyenlet lehetséges kimeneteleit:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-blue-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <DiscriminantCasesComparisonSvg size={500} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A diszkrimináns 3 esete: metsző, érintő vagy tengelyt elkerülő parabola
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
                      <span className="font-bold text-emerald-950 block text-xs uppercase">1. Ha D &gt; 0</span>
                      <p className="text-xs text-emerald-800 mt-1">
                        Pozitív számnak két valós négyzetgyöke van (±√D), így az egyenletnek <strong>2 különböző valós gyöke</strong> van. A parabola 2 pontban metszi az x-tengelyt.
                      </p>
                    </div>
                    <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200">
                      <span className="font-bold text-blue-950 block text-xs uppercase">2. Ha D = 0</span>
                      <p className="text-xs text-blue-800 mt-1">
                        Mivel √0 = 0, a ± 0 nem ad két ágat: <strong>1 valós gyök (kettős gyök)</strong> létezik: x = -b / (2a). A parabola csúcsa érinti az x-tengelyt.
                      </p>
                    </div>
                    <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200">
                      <span className="font-bold text-rose-950 block text-xs uppercase">3. Ha D &lt; 0</span>
                      <p className="text-xs text-rose-800 mt-1">
                        A valós számok körében negatív számból nem vonhatunk négyzetgyököt, így az egyenletnek <strong>nincs valós gyöke</strong> ($x \in \emptyset$). A parabola nem éri el az x-tengelyt.
                      </p>
                    </div>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-method-and-examples',
          title: '4. A megoldás menete és kidolgozott mintapéldák',
          description:
            'A megoldóképlet alkalmazásának 4 aranyszabálya és lépésről lépésre kidolgozott feladatok.',
          color: 'amber',
          badge: 'Mintapéldák',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A megoldóképlet alkalmazásának 4 aranyszabálya"
                color="amber"
                icon={<TrendingUp className="w-5 h-5 text-amber-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-amber-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <FormulaStepByStepMethodSvg size={500} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A megbízható megoldás 4 lépése: 0-ra rendezés, együtthatók, diszkrimináns, két ág
                    </p>
                  </div>
                </div>
              </TheoryCard>

              {/* Mintapélda 1: Két különböző valós gyök */}
              <TheoryCard
                title="1. Mintapélda: Két különböző valós gyök (D > 0)"
                badge="Két gyök"
                color="emerald"
                variant="example"
              >
                <div className="space-y-2 text-xs leading-relaxed">
                  <p className="font-bold text-slate-800">
                    Oldjuk meg a 2x² - 7x + 3 = 0 egyenletet a valós számok halmazán!
                  </p>
                  <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                    <li>
                      <strong>Együtthatók azonosítása:</strong> a = 2, b = -7, c = 3.
                    </li>
                    <li>
                      <strong>Diszkrimináns kiszámítása:</strong><br />
                      D = b² - 4ac = (-7)² - 4 · 2 · 3 = 49 - 24 = <strong>25</strong>.<br />
                      Mivel D = 25 &gt; 0, ezért 2 különböző valós gyök van, és √D = √25 = <strong>5</strong>.
                    </li>
                    <li>
                      <strong>Behelyettesítés a megoldóképletbe:</strong><br />
                      x₁,₂ = [-(-7) ± 5] / [2 · 2] = (7 ± 5) / 4.
                    </li>
                    <li>
                      <strong>A két gyök kiszámítása:</strong><br />
                      • x₁ = (7 + 5) / 4 = 12 / 4 = <strong>3</strong><br />
                      • x₂ = (7 - 5) / 4 = 2 / 4 = <strong>1/2</strong> (vagy 0,5).
                    </li>
                  </ol>
                  <div className="p-2 bg-emerald-100/60 rounded-lg text-emerald-900 font-bold">
                    ✓ Ellenőrzés: 2·3² - 7·3 + 3 = 18 - 21 + 3 = 0. Mindkét gyök helyes!
                  </div>
                </div>
              </TheoryCard>

              {/* Mintapélda 2: Egyetlen valós gyök */}
              <TheoryCard
                title="2. Mintapélda: Kettős gyök (D = 0)"
                badge="Egy gyök"
                color="blue"
                variant="example"
              >
                <div className="space-y-2 text-xs leading-relaxed">
                  <p className="font-bold text-slate-800">
                    Oldjuk meg a 9x² - 12x + 4 = 0 egyenletet!
                  </p>
                  <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                    <li>
                      <strong>Együtthatók:</strong> a = 9, b = -12, c = 4.
                    </li>
                    <li>
                      <strong>Diszkrimináns:</strong><br />
                      D = (-12)² - 4 · 9 · 4 = 144 - 144 = <strong>0</strong>.<br />
                      Mivel D = 0, pontosan 1 valós gyök (kettős gyök) létezik.
                    </li>
                    <li>
                      <strong>Megoldóképlet:</strong><br />
                      x = [-(-12) ± 0] / [2 · 9] = 12 / 18 = <strong>2/3</strong>.
                    </li>
                  </ol>
                  <div className="p-2 bg-blue-100/60 rounded-lg text-blue-900 font-bold">
                    💡 Megjegyzés: Észrevehető volt a (3x - 2)² = 0 azonosság is!
                  </div>
                </div>
              </TheoryCard>

              {/* Mintapélda 3: Nincs valós gyök */}
              <TheoryCard
                title="3. Mintapélda: Nincs valós megoldás (D < 0)"
                badge="Nulla gyök"
                color="rose"
                variant="example"
              >
                <div className="space-y-2 text-xs leading-relaxed">
                  <p className="font-bold text-slate-800">
                    Oldjuk meg az x² + 2x + 6 = 0 egyenletet a valós számok körében!
                  </p>
                  <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                    <li>
                      <strong>Együtthatók:</strong> a = 1, b = 2, c = 6.
                    </li>
                    <li>
                      <strong>Diszkrimináns:</strong><br />
                      D = 2² - 4 · 1 · 6 = 4 - 24 = <strong>-20</strong>.
                    </li>
                    <li>
                      <strong>Következtetés:</strong><br />
                      Mivel D = -20 &lt; 0, a valós számok körében a √(-20) nem értelmezhető.
                    </li>
                  </ol>
                  <div className="p-2 bg-rose-100/60 rounded-lg text-rose-900 font-bold">
                    ✕ Válasz: Az egyenletnek a valós számok halmazán nincs megoldása: x ∈ ∅.
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-traps',
          title: '5. Tipikus hibák és veszélyes csapdák a megoldóképletben',
          description:
            'A leggyakoribb diákhigák, amelyek pontvesztéshez vezetnek a dolgozatokban és az érettségin.',
          color: 'red',
          badge: 'Csapdák',
          content: (
            <div className="space-y-6">
              <TheoryTrapBox
                title="1. CSAPDA: Nem 0-ra rendezett egyenletből veszik az együtthatókat!"
                color="rose"
              >
                <p>
                  Ha az egyenlet pl. <strong>x² - 4x = 5</strong>, sokan azonnal felírják: a = 1, b = -4, c = 5.
                </p>
                <p className="font-bold text-rose-900 mt-1">
                  Ez súlyos hiba! A kanonikus alak jobb oldalán kötelezően 0-nak kell állnia!
                </p>
                <p className="mt-1">
                  Helyesen: mindkét oldalból kivonunk 5-öt: <strong>x² - 4x - 5 = 0</strong>, így a valódi konstans tag: <strong>c = -5</strong>!
                </p>
              </TheoryTrapBox>

              <TheoryTrapBox
                title="2. CSAPDA: Negatív szám négyzetének előjelhibája: (-b)²"
                color="rose"
              >
                <p>
                  Ha b = -5, sok diák a számológépbe úgy írja be: <code>-5² = -25</code>.
                </p>
                <p className="font-bold text-rose-900 mt-1">
                  Bármilyen valós szám négyzete NEMNEGATÍV: (-5)² = (-5) · (-5) = +25!
                </p>
                <p className="mt-1">
                  A diszkrimináns képletében a b² tag <strong>mindig pozitív (vagy nulla)</strong>, soha nem lehet negatív!
                </p>
              </TheoryTrapBox>

              <TheoryTrapBox
                title="3. CSAPDA: A nevezőben csak a-val osztanak 2a helyett"
                color="rose"
              >
                <p>
                  Ha az egyenlet <strong>2x² - 5x + 2 = 0</strong>, a nevező <strong>2 · a = 2 · 2 = 4</strong>.
                </p>
                <p className="font-bold text-rose-900 mt-1">
                  Gyakori hiba, hogy a diákok a nevezőbe csak 2-t írnak (a helyett), vagy elfelejtik a 2-szeres szorzót.
                </p>
              </TheoryTrapBox>

              <TheoryTrapBox
                title="4. CSAPDA: A törtvonal lerövidítése"
                color="rose"
              >
                <p>
                  Gyakori íráshiba: <code>-b ± √D / 2a</code>. Emiatt sokan csak a gyökös kifejezést osztják el 2a-val, a -b-t nem!
                </p>
                <p className="font-bold text-rose-900 mt-1">
                  A főtörtvonal a teljes számláló alatt húzódik: a 2a mind a (-b)-t, mind a (±√D)-t osztja!
                </p>
              </TheoryTrapBox>
            </div>
          )
        }
      ]}
    />
  );
};

export default QuadraticFormulaTheory;
