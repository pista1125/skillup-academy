import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryTrapBox,
  TheoryCallout
} from '../TheoryTemplate';
import {
  EquationSimplificationTreeSvg,
  FractionalEquationCheckSvg,
  RootsSimplificationTreeSvg,
  VieteVerificationCardSvg
} from './ApplyFormulaFigures';
import {
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Calculator,
  Sliders,
  Scale,
  TrendingUp,
  FileText,
  Filter
} from 'lucide-react';

interface ApplyFormulaTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ApplyFormulaTheory: React.FC<ApplyFormulaTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív labor állapota: ax² + bx + c = 0
  const [aParam, setAParam] = useState<number>(1);
  const [bParam, setBParam] = useState<number>(-7);
  const [cParam, setCParam] = useState<number>(10);

  const safeA = aParam === 0 ? 1 : aParam;
  const dVal = bParam * bParam - 4 * safeA * cParam;
  const sqrtD = dVal >= 0 ? Math.sqrt(dVal) : NaN;
  const x1 = dVal >= 0 ? (-bParam + sqrtD) / (2 * safeA) : NaN;
  const x2 = dVal >= 0 ? (-bParam - sqrtD) / (2 * safeA) : NaN;

  // Viète értékek
  const vieteSum = -bParam / safeA;
  const vieteProd = cParam / safeA;

  const setPreset = (a: number, b: number, c: number) => {
    setAParam(a);
    setBParam(b);
    setCParam(c);
  };

  return (
    <TheoryTemplate
      grade={10}
      chapterId="masodfoku-egyenletek"
      topicId="alkalmazzuk-a-megoldokepletet"
      title="Alkalmazzuk a megoldóképletet!"
      subtitle="Bonyolultabb algebrai kifejezések 0-ra rendezése, törtek eltüntetése, egyszerűsítések, irracionális gyökök és az önellenőrzés mesterfogásai."
      badge="32. LECKE"
      color="rose"
      estimatedReadTime="25 perc"
      heroCard={{
        title: 'A Megoldóképlet Mesteri Alkalmazása',
        description:
          'A való életben és a dolgozatokban a másodfokú egyenletek ritkán érkeznek tálcán kínálva, kész kanonikus alakban. Gyakran zárójeleket kell bontani, törteket eltüntetni, kikötéseket tenni és az irracionális gyököket pontos zárt alakban egyszerűsíteni.',
        formula: 'ax² + bx + c = 0 ⟹ x₁,₂ = (-b ± √(b² - 4ac)) / (2a)',
        extraContent: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="font-bold text-rose-700">1. Alakra hozás:</span>
              <p className="text-slate-600 mt-0.5">Zárójelbontás, összevonás és kötelező 0-ra rendezés</p>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="font-bold text-rose-700">2. Kikötés &amp; Szűrés:</span>
              <p className="text-slate-600 mt-0.5">Törtes egyenletnél a nevező ≠ 0, hamis gyökök kizárása</p>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="font-bold text-rose-700">3. Viète-önellenőrzés:</span>
              <p className="text-slate-600 mt-0.5">x₁ + x₂ = -b/a és x₁ · x₂ = c/a azonnali próbaként</p>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz az alkalmazási feladatokra?"
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
                  Interaktív Egyenlet-Átalakító és Viète-Ellenőrző Laboratórium
                </h3>
                <p className="text-xs text-slate-600">
                  Válassz mintatípust vagy állítsd be az együtthatókat, és kövesd végig a gyökök kiszámítását és a Viète-formulákkal való villámgyors önellenőrzést!
                </p>
              </div>
            </div>

            {/* Mintapélda gombok */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setPreset(1, -1, -20)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  aParam === 1 && bParam === -1 && cParam === -20
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
                }`}
              >
                Zárójeles ((x-3)(x+2)=14)
              </button>
              <button
                onClick={() => setPreset(1, -7, 6)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  aParam === 1 && bParam === -7 && cParam === 6
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
                }`}
              >
                Törtes (x/2 + 3/x = 7/2)
              </button>
              <button
                onClick={() => setPreset(1, -5, 6)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  aParam === 1 && bParam === -5 && cParam === 6
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
                }`}
              >
                Közös osztós (3x²-15x+18=0)
              </button>
              <button
                onClick={() => setPreset(1, -6, 7)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  aParam === 1 && bParam === -6 && cParam === 7
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
                }`}
              >
                Irracionális (x²-6x+7=0)
              </button>
              <button
                onClick={() => setPreset(4, -12, 9)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  aParam === 4 && bParam === -12 && cParam === 9
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
                }`}
              >
                Kettős gyök (4x²-12x+9=0)
              </button>
            </div>
          </div>

          {/* Csúszkák */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/80 p-5 rounded-2xl border border-rose-100">
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

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">Elsőfokú tag (b):</label>
                <span className="text-sm font-mono font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
                  b = {bParam > 0 ? `+${bParam}` : bParam}
                </span>
              </div>
              <input
                type="range"
                min="-15"
                max="15"
                step="1"
                value={bParam}
                onChange={(e) => setBParam(parseInt(e.target.value, 10))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>-15</span>
                <span>0</span>
                <span>+15</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">Konstans tag (c):</label>
                <span className="text-sm font-mono font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
                  c = {cParam > 0 ? `+${cParam}` : cParam}
                </span>
              </div>
              <input
                type="range"
                min="-25"
                max="25"
                step="1"
                value={cParam}
                onChange={(e) => setCParam(parseInt(e.target.value, 10))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>-25</span>
                <span>0</span>
                <span>+25</span>
              </div>
            </div>
          </div>

          {/* Élő kiértékelés */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-inner space-y-4 font-mono text-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-3">
              <div>
                <span className="text-xs text-slate-400 font-sans uppercase tracking-wider block">
                  Kanonikus Alak (ax² + bx + c = 0):
                </span>
                <span className="text-xl sm:text-2xl font-black text-amber-400">
                  {safeA === 1 ? '' : safeA === -1 ? '-' : `${safeA}`}x²{' '}
                  {bParam >= 0 ? `+ ${bParam}` : `- ${Math.abs(bParam)}`}x{' '}
                  {cParam >= 0 ? `+ ${cParam}` : `- ${Math.abs(cParam)}`} = 0
                </span>
              </div>
              <div>
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

            {/* Számított adatok és Viète próba */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-1.5">
                <span className="text-rose-400 font-bold block">1. Megoldóképlet és Gyökök</span>
                <p className="text-slate-300">
                  D = ({bParam})² - 4 · ({safeA}) · ({cParam}) = <strong>{dVal}</strong>
                </p>
                {dVal >= 0 ? (
                  <>
                    <p className="text-slate-300">
                      x₁,₂ = [-({bParam}) ± {Number.isInteger(sqrtD) ? `${sqrtD}` : `√${dVal}`}] / [{2 * safeA}]
                    </p>
                    <p className="text-emerald-400 font-bold text-sm">
                      x₁ = {Number.isInteger(x1) ? x1 : x1.toFixed(3)} &nbsp;|&nbsp; x₂ ={' '}
                      {Number.isInteger(x2) ? x2 : x2.toFixed(3)}
                    </p>
                  </>
                ) : (
                  <p className="text-rose-400 font-bold">Nincs valós gyök (D &lt; 0)</p>
                )}
              </div>

              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-1.5">
                <span className="text-amber-400 font-bold block">2. Viète-Önellenőrzés</span>
                {dVal >= 0 ? (
                  <>
                    <p className="text-slate-300">
                      Gyökök összege: x₁ + x₂ = { (x1 + x2).toFixed(2) }
                    </p>
                    <p className="text-slate-400">
                      Képlet szerint: -b / a = -({bParam}) / {safeA} = {vieteSum.toFixed(2)} ✓
                    </p>
                    <p className="text-slate-300 pt-1">
                      Gyökök szorzata: x₁ · x₂ = { (x1 * x2).toFixed(2) }
                    </p>
                    <p className="text-slate-400">
                      Képlet szerint: c / a = {cParam} / {safeA} = {vieteProd.toFixed(2)} ✓
                    </p>
                  </>
                ) : (
                  <p className="text-slate-400 italic">Mivel nincsenek valós gyökök, valós Viète-próba nincs.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      }
      sections={[
        {
          id: 'sec-prep',
          title: '1. Az egyenlet előkészítése a megoldóképletre',
          description:
            'Zárójelfelbontás, azonos nemű tagok összevonása és a kötelező 0-ra rendezés lépései.',
          color: 'rose',
          badge: 'Előkészítés',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A megoldás 4 lépéses algoritmusa összetett egyenleteknél"
                color="rose"
                icon={<Layers className="w-5 h-5 text-rose-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <p>
                    A legtöbb valós és érettségi feladatban az egyenlet nem kész formában érkezik. Mielőtt felírnánk a megoldóképletet, <strong>mindig kanonikus alakra ($ax^2 + bx + c = 0$) kell hozni</strong> a kifejezést:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-rose-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <EquationSimplificationTreeSvg size={500} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      Az egyenlet átalakításának standard útvonala: zárójelbontás, összevonás, 0-ra rendezés, egyszerűsítés
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1.5 text-xs">
                      <span className="font-bold text-rose-950 block text-sm">Mintafeladat: Zárójelbontás</span>
                      <p className="text-slate-700 font-mono font-bold">(x - 3)(x + 2) = 14</p>
                      <p className="text-slate-600">1. Felbontjuk a szorzatot: x² + 2x - 3x - 6 = 14</p>
                      <p className="text-slate-600">2. Összevonunk: x² - x - 6 = 14</p>
                      <p className="text-slate-600">3. Kivonunk 14-et: x² - x - 20 = 0</p>
                      <p className="text-emerald-700 font-bold">4. Képlettel: a = 1, b = -1, c = -20 ⟹ x₁ = 5, x₂ = -4.</p>
                    </div>

                    <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1.5 text-xs">
                      <span className="font-bold text-blue-950 block text-sm">Mintafeladat: Kéttagú négyzet</span>
                      <p className="text-slate-700 font-mono font-bold">(2x - 1)² = x + 5</p>
                      <p className="text-slate-600">1. Kifejtjük a négyzetet: 4x² - 4x + 1 = x + 5</p>
                      <p className="text-slate-600">2. Kivonunk x-et és 5-öt: 4x² - 5x - 4 = 0</p>
                      <p className="text-emerald-700 font-bold">3. Képlettel: a = 4, b = -5, c = -4 ⟹ D = 25 + 64 = 89.</p>
                      <p className="text-slate-600">x₁,₂ = (5 ± √89) / 8.</p>
                    </div>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-fractions',
          title: '2. Törtes másodfokú egyenletek és a kötelező kikötések',
          description:
            'Hogyan szabaduljunk meg a törtektől, és miért elengedhetetlen a hamis gyökök azonnali kizárása?',
          color: 'blue',
          badge: 'Törtes egyenletek',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="Törtes egyenletek megoldása és a hamis gyökök kiszűrése"
                color="blue"
                icon={<Filter className="w-5 h-5 text-blue-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <p>
                    Ha az ismeretlen a nevezőben is szerepel, az egyenlet <strong>törtes egyenlet</strong>. Itt a legelső és legfontosabb lépés mindig az <strong>értelmezési tartomány (kikötés)</strong> rögzítése, hiszen nullával osztani tilos:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-blue-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <FractionalEquationCheckSvg size={500} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A törtes egyenlet megoldásának lánca a kikötéstől a hamis gyökök kizárásáig
                    </p>
                  </div>

                  <TheoryCard
                    title="Részletesen kidolgozott törtes mintapélda"
                    color="blue"
                    variant="example"
                  >
                    <div className="space-y-2 text-xs leading-relaxed">
                      <p className="font-bold text-slate-800 text-sm">
                        Oldjuk meg a következő egyenletet: (x² + 3) / (x - 1) = 4
                      </p>
                      <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                        <li>
                          <strong>Kikötés:</strong> A nevező nem lehet nulla: x - 1 ≠ 0 ⟹ <strong>x ≠ 1</strong>.
                        </li>
                        <li>
                          <strong>Beszorzás a nevezővel:</strong> Mindkét oldalt megszorozzuk (x - 1)-gyel:<br />
                          x² + 3 = 4 · (x - 1) ⟹ x² + 3 = 4x - 4.
                        </li>
                        <li>
                          <strong>0-ra rendezés:</strong> x² - 4x + 7 = 0.
                        </li>
                        <li>
                          <strong>Megoldóképlet:</strong> D = (-4)² - 4 · 1 · 7 = 16 - 28 = -12 &lt; 0.
                        </li>
                      </ol>
                      <p className="font-bold text-rose-700">
                        Mivel D &lt; 0, az egyenletnek nincs valós megoldása (x ∈ ∅).
                      </p>
                    </div>
                  </TheoryCard>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-simplification',
          title: '3. Együtthatók egyszerűsítése közös osztóval',
          description:
            'Hogyan spórolhatsz rengeteg időt és számolási hibát az egyenlet előzetes leosztásával?',
          color: 'emerald',
          badge: 'Egyszerűsítés',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="Közös osztó kiemelése és leosztás a számolás előtt"
                color="emerald"
                icon={<Scale className="w-5 h-5 text-emerald-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <p>
                    Ha a másodfokú egyenlet együtthatóinak ($a, b, c$) van közös osztója, a megoldóképlet előtt <strong>érdemes az egész egyenletet elosztani ezzel a közös számmal</strong>. A gyökök pontosan ugyanazok maradnak, de sokkal kisebb számokkal kell dolgoznunk:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-200 space-y-2 text-xs">
                      <span className="font-bold text-rose-950 block text-sm">❌ Nehézkes út: Hatalmas számok</span>
                      <p className="font-mono font-bold text-slate-800">6x² - 18x - 24 = 0</p>
                      <p className="text-slate-600">a = 6, b = -18, c = -24</p>
                      <p className="text-slate-600">D = (-18)² - 4 · 6 · (-24) = 324 + 576 = <strong>900</strong></p>
                      <p className="text-slate-600">√900 = 30</p>
                      <p className="text-slate-600">x = (18 ± 30) / 12 ⟹ x₁ = 48/12 = 4, x₂ = -12/12 = -1.</p>
                      <p className="text-rose-700 italic">Hatalmas számok, könnyű elszámolni a szorzást!</p>
                    </div>

                    <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-2 text-xs">
                      <span className="font-bold text-emerald-950 block text-sm">✓ Okos út: Előzetes osztás 6-tal</span>
                      <p className="font-mono font-bold text-slate-800">x² - 3x - 4 = 0</p>
                      <p className="text-slate-600">a = 1, b = -3, c = -4</p>
                      <p className="text-slate-600">D = (-3)² - 4 · 1 · (-4) = 9 + 16 = <strong>25</strong></p>
                      <p className="text-slate-600">√25 = 5</p>
                      <p className="text-emerald-800 font-bold">x = (3 ± 5) / 2 ⟹ x₁ = 4, x₂ = -1.</p>
                      <p className="text-emerald-700 font-bold">Ugyanaz az eredmény, de fejben is 5 másodperc alatt kész!</p>
                    </div>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-irrationals',
          title: '4. Irracionális gyökök pontos zárt alakja és egyszerűsítése',
          description:
            'Hogyan kezeljük a nem négyzetszám diszkriminánsokat, és hogyan egyszerűsítsük a gyökös törteket?',
          color: 'purple',
          badge: 'Irracionális gyökök',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="Irracionális gyökök egyszerűsítése 3 lépésben"
                color="purple"
                icon={<Sparkles className="w-5 h-5 text-purple-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <p>
                    Ha a diszkrimináns pozitív, de nem négyzetszám (pl. $D = 8, 12, 20, 72$), a gyökök <strong>irracionális számok</strong> lesznek. Az érettségin nem tizedestörtre kerekítve kérik az eredményt, hanem <strong>pontos, egyszerűsített zárt alakban</strong>:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-purple-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <RootsSimplificationTreeSvg size={500} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      Négyzetszám szorzó kiemelése a gyökjel elé és a közös osztó egyszerűsítése
                    </p>
                  </div>

                  <TheoryTrapBox
                    title="HALÁLOS HIBA: Részleges egyszerűsítés a számlálóból!"
                    color="rose"
                  >
                    <p>
                      Ha a tört: <strong>(4 ± √12) / 2</strong>, sokan a 4-et leegyszerűsítik a 2-vel, és azt írják: <code>2 ± √12</code>.
                    </p>
                    <p className="font-bold text-rose-900 mt-1">
                      Ez súlyos algebrai hiba! Összeadásból és kivonásból csak úgy szabad egyszerűsíteni, ha MINDEN tagot osztunk!
                    </p>
                    <p className="mt-1">
                      Helyesen: √12 = 2√3, így a tört (4 ± 2√3) / 2 = <strong>2 ± √3</strong>!
                    </p>
                  </TheoryTrapBox>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-viete',
          title: '5. A villámgyors önellenőrzés: a Viète-formulák',
          description:
            'Hogyan ellenőrizheted le a dolgozatban a gyökeidet 5 másodperc alatt behelyettesítés nélkül?',
          color: 'amber',
          badge: 'Viète-formulák',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A gyökök és együtthatók kapcsolata (Viète-formulák)"
                color="amber"
                icon={<TrendingUp className="w-5 h-5 text-amber-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <p>
                    François Viète francia matematikus fedezte fel, hogy a másodfokú egyenlet gyökei és az együtthatók között közvetlen összefüggés áll fenn. Ez a leghatékonyabb eszköz a kiszámított gyökök <strong>fejben történő ellenőrzésére</strong>:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-amber-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <VieteVerificationCardSvg size={500} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A Viète-formulák: a gyökök összege -b/a, a gyökök szorzata c/a
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-xs">
                    <span className="font-bold text-amber-950 block text-sm">Hogyan használd a dolgozatban?</span>
                    <p className="text-slate-700">
                      Tegyük fel, hogy megoldottad az <strong>x² - 8x + 15 = 0</strong> egyenletet, és azt kaptad: <strong>x₁ = 3</strong> és <strong>x₂ = 5</strong>.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono">
                      <div className="p-2.5 bg-white rounded-lg border border-amber-200">
                        <span className="font-bold text-blue-700 block">Összeg-teszt:</span>
                        3 + 5 = 8. Egyenletből: -(-8)/1 = 8. ✓ EGYEZIK!
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-amber-200">
                        <span className="font-bold text-emerald-700 block">Szorzat-teszt:</span>
                        3 · 5 = 15. Egyenletből: 15/1 = 15. ✓ EGYEZIK!
                      </div>
                    </div>
                    <p className="text-slate-600 font-bold pt-1">
                      Ha mindkét teszt stimmel, a megoldásod 100%-os biztonsággal hibátlan!
                    </p>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        }
      ]}
    />
  );
};

export default ApplyFormulaTheory;

