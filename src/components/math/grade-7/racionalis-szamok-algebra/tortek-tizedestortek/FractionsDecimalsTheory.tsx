import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sparkles,
  Calculator,
  Layers,
  ArrowRightLeft,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  Scale,
  Binary,
  Compass,
  ArrowRight,
  HelpCircle,
  Percent,
  Divide
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FractionsDecimalsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

// Helper GCD function
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

export const FractionsDecimalsTheory: React.FC<FractionsDecimalsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Fraction Lab State
  const [numerator, setNumerator] = useState<number>(3);
  const [denominator, setDenominator] = useState<number>(8);

  const currentGcd = gcd(numerator, denominator);
  const simpNum = numerator / currentGcd;
  const simpDen = denominator / currentGcd;
  const isSimplified = currentGcd === 1;

  // Decimal check
  const decimalVal = denominator !== 0 ? numerator / denominator : 0;
  
  // Check if denominator's prime factors are only 2 and 5
  const isFiniteDecimal = (den: number): boolean => {
    let d = Math.abs(den);
    if (d === 0) return false;
    while (d % 2 === 0) d /= 2;
    while (d % 5 === 0) d /= 5;
    return d === 1;
  };

  const isFinite = denominator !== 0 && isFiniteDecimal(simpDen);

  // Periodic decimal string format
  const getDecimalDisplay = (): string => {
    if (denominator === 0) return 'Értelmetlen (0 nevező)';
    if (isFinite) {
      return decimalVal.toString().replace('.', ',');
    }
    // Periodic representation
    const full = decimalVal.toFixed(6).replace('.', ',');
    return `${full}... (végtelen szakaszos)`;
  };

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-fractions-decimals-theory-doc"
      pdfFilename="7_osztaly_tortek_tizedestortek.pdf"
      badgeText="7. Osztály • Matematika II. Témakör"
      title="2. Törtek, tizedes törtek – minden, amit erről tudni kell"
      subtitle="Törtek alapjai, bővítés, egyszerűsítés, véges és szakaszos tizedestörtek, átváltások és összehasonlítás"
      quickRule={{
        label: 'Véges tizedestört szabálya',
        formula: 'Egyszerűsített alakban a nevező prímtényezői CSAK 2 és/vagy 5 lehetnek'
      }}
      themeColor="purple"
      practiceTitle="Készen állsz a törtek és tizedestörtek mesterszintű tesztelésére?"
      practiceSubtitle="30 válogatott feladat 3 nehézségi szinten részletes levezetésekkel, kártyás párosítóval és csoportosítóval!"
    >
      {/* SECTION 1: A tört fogalma és felépítése */}
      <TheorySection
        number={1}
        title="A tört fogalma, fajtái és az értelmezési tartomány"
        icon={<Divide className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A tört felépítése és jelentése"
            badge="Alapfogalom"
            variant="purple"
          >
            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 text-center mb-3">
              <div className="text-xl font-black text-purple-800 dark:text-purple-300 font-mono">
                {"a"} / {"b"} &nbsp;= &nbsp;{"a"} : {"b"}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                <strong>a (számláló):</strong> hány részt veszünk &nbsp;|&nbsp; <strong>b (nevező):</strong> hány egyenlő részre osztottuk az egészet
              </div>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600 min-w-[18px]">•</span>
                <span><strong>Törtvonal mint osztásjel:</strong> A törtvonal pontosan a számláló és a nevező hányadosát (osztását) jelöli.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-600 min-w-[18px]">•</span>
                <span><strong>Értelmezési tartomány:</strong> A nevező soha nem lehet 0 ($b \neq 0$), mert nullával való osztás nincs értelmezve!</span>
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="A törtek fajtái és a vegyes számok"
            badge="Csoportosítás"
            variant="indigo"
          >
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li className="p-2 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-emerald-600 dark:text-emerald-400">1. Valódi tört:</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  A számláló abszolútértéke kisebb a nevezőénél (|a| &lt; |b|). Értéke 0 és 1 (vagy -1 és 0) közé esik. Pl.: 3/5, -2/7.
                </div>
              </li>
              <li className="p-2 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-amber-600 dark:text-amber-400">2. Áltört (Nemvalódi tört):</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  A számláló abszolútértéke nagyobb vagy egyenlő a nevezővel (|a| ≥ |b|). Pl.: 7/4, 5/5 = 1, -11/3.
                </div>
              </li>
              <li className="p-2 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-purple-600 dark:text-purple-400">3. Vegyes szám:</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Egész szám és valódi tört összege: 2 és 3/4 = 2 + 3/4 = 11/4. Negatívnál: -(2 és 3/4) = -11/4.
                </div>
              </li>
            </ul>
          </TheoryCard>
        </div>

        <TheoryTrapBox
          title="Gyakori Hiba: Negatív vegyes szám átírása áltörtté"
          trap="Sokan azt hiszik, hogy -2 3/4 = (-2 · 4 + 3)/4 = -5/4."
          correction="A helyes eljárás: az előjel az egész számra vonatkozik! -(2 · 4 + 3)/4 = -11/4. Mindig az abszolútértéket számold ki, és tedd elé a mínusz előjelet!"
        />
      </TheorySection>

      {/* SECTION 2: Bővítés és Egyszerűsítés */}
      <TheorySection
        number={2}
        title="Törtek bővítése és egyszerűsítése"
        icon={<Layers className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Törtek bővítése"
            badge="Szorzás"
            variant="indigo"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2">
              A tört értéke nem változik, ha a számlálót és a nevezőt <strong>ugyanazzal a nullától különböző számmal szorozzuk</strong>:
            </p>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center font-mono text-sm font-bold text-indigo-900 dark:text-indigo-200 mb-2">
              {"(a · k) / (b · k) = a / b"} &nbsp; (k ≠ 0)
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <div><strong>Példa:</strong> Bővítsük a 3/4 törtet 5-tel: (3 · 5) / (4 · 5) = 15/20.</div>
              <div>Alkalmazása: közös nevezőre hozásnál elengedhetetlen művelet!</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Törtek egyszerűsítése és egyszerűsített alak"
            badge="Osztás & LNKO"
            variant="emerald"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2">
              A tört értéke nem változik, ha a számlálót és a nevezőt <strong>ugyanazzal a közös osztóval osztjuk</strong>:
            </p>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center font-mono text-sm font-bold text-emerald-900 dark:text-emerald-200 mb-2">
              {"(a : m) / (b : m) = a / b"} &nbsp; (m közös osztó)
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <div><strong>Tovább nem egyszerűsíthető (legegyszerűbb) alak:</strong> amikor a számláló és nevező legnagyobb közös osztója 1 (lnko(a, b) = 1, relatív prímek).</div>
              <div><strong>Példa:</strong> 24/36 = (24 : 12) / (36 : 12) = 2/3.</div>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout
          variant="tip"
          title="Hogyan egyszerűsíts a leggyorsabban?"
          text="Határozd meg a számláló és nevező legnagyobb közös osztóját (LNKO), és egyszerre oszd el vele mindkettőt! Ha nem látod azonnal, egyszerűsíthetsz lépésről lépésre is (pl. először 2-vel, majd 3-mal)."
        />
      </TheorySection>

      {/* SECTION 3: Törtek és tizedestörtek kapcsolata */}
      <TheorySection
        number={3}
        title="Törtek átírása tizedestörtté: Véges és szakaszos tizedestörtek"
        icon={<Sparkles className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Véges tizedestörtek"
            badge="2 és 5 szabály"
            variant="emerald"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2">
              Egy tovább már nem egyszerűsíthető törtből <strong>akkor és csak akkor lesz véges tizedestört</strong>, ha a nevező prímtényezős felbontásában <strong>kizárólag a 2 és/vagy az 5</strong> szerepel.
            </p>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <strong>1/2</strong> = 0,5 &nbsp;|&nbsp; <strong>1/4</strong> = 0,25 &nbsp;|&nbsp; <strong>3/4</strong> = 0,75
              </div>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <strong>1/8</strong> = 0,125 &nbsp;|&nbsp; <strong>3/8</strong> = 0,375 &nbsp;|&nbsp; <strong>5/8</strong> = 0,625
              </div>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <strong>1/5</strong> = 0,2 &nbsp;|&nbsp; <strong>2/5</strong> = 0,4 &nbsp;|&nbsp; <strong>7/20</strong> = 0,35 (20 = 2² · 5)
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Végtelen szakaszos (periodikus) tizedestörtek"
            badge="Más prímek"
            variant="amber"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2">
              Ha az egyszerűsített alak nevezőjében <strong>2-n és 5-ön kívül más prímszám is szerepel</strong> (pl. 3, 7, 11, 13), akkor végtelen szakaszos tizedestörtet kapunk.
            </p>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                <strong>Tiszta szakaszos:</strong> a vessző után azonnal ismétlődik:<br/>
                1/3 = 0,333... = 0,3̇ &nbsp;|&nbsp; 2/3 = 0,6̇ &nbsp;|&nbsp; 4/11 = 0,3̇6̇
              </div>
              <div className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                <strong>Vegyes szakaszos:</strong> van nem ismétlődő előtag is:<br/>
                1/6 = 0,1666... = 0,16̇ &nbsp;|&nbsp; 5/6 = 0,83̇ &nbsp;|&nbsp; 7/15 = 0,46̇
              </div>
            </div>
          </TheoryCard>
        </div>

        <TheoryTable
          title="A legfontosabb nevezetes törtek, tizedestörtek és százalékok"
          columns={['Közönséges tört', 'Tizedestört alak', 'Százalékos érték', 'Típus']}
          rows={[
            ['1/2', '0,5', '50%', 'Véges'],
            ['1/4', '0,25', '25%', 'Véges'],
            ['3/4', '0,75', '75%', 'Véges'],
            ['1/5', '0,2', '20%', 'Véges'],
            ['2/5', '0,4', '40%', 'Véges'],
            ['1/8', '0,125', '12,5%', 'Véges'],
            ['3/8', '0,375', '37,5%', 'Véges'],
            ['1/10', '0,1', '10%', 'Véges'],
            ['1/3', '0,333... (0,3̇)', '33,33%', 'Tiszta szakaszos'],
            ['2/3', '0,666... (0,6̇)', '66,67%', 'Tiszta szakaszos'],
            ['1/6', '0,166... (0,16̇)', '16,67%', 'Vegyes szakaszos'],
          ]}
        />
      </TheorySection>

      {/* SECTION 4: Tizedestört átírása közönséges törtté */}
      <TheorySection
        number={4}
        title="Tizedestört átírása közönséges törtté és törtek összehasonlítása"
        icon={<Scale className="w-5 h-5 text-blue-600" />}
        badgeColor="blue"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Véges tizedestört átírása törtté"
            badge="Helyiérték szerint"
            variant="blue"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2">
              A tizedestörtet a helyiértéknek megfelelő nevezővel (10, 100, 1000...) írjuk fel, majd egyszerűsítjük:
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200">
              <li className="p-1.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-100 dark:border-blue-900">
                0,6 = 6/10 = <strong>3/5</strong>
              </li>
              <li className="p-1.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-100 dark:border-blue-900">
                0,35 = 35/100 = <strong>7/20</strong>
              </li>
              <li className="p-1.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-100 dark:border-blue-900">
                0,125 = 125/1000 = <strong>1/8</strong>
              </li>
              <li className="p-1.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-100 dark:border-blue-900">
                1,75 = 175/100 = 7/4 = <strong>1 és 3/4</strong>
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Törtek összehasonlítása és rendezése"
            badge="Módszerek"
            variant="purple"
          >
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li className="p-2 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-purple-600 dark:text-purple-400">1. Azonos nevezőre hozás (Közös nevező):</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  3/4 vs 5/6 ⟹ 9/12 &lt; 10/12 ⟹ 3/4 &lt; 5/6.
                </div>
              </li>
              <li className="p-2 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-indigo-600 dark:text-indigo-400">2. Azonos számlálóra hozás:</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Azonos számláló esetén a kisebb nevezőjű a nagyobb (pl. 5/7 &gt; 5/9).
                </div>
              </li>
              <li className="p-2 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-red-600 dark:text-red-400">3. Negatív törtek rendezése:</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  A számegyenesen a balra lévő a kisebb: -3/4 &lt; -1/2, mert -3/4 = -0,75 &lt; -0,5.
                </div>
              </li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 5: Interaktív Tört és Tizedestört Labor */}
      <TheorySection
        number={5}
        title="Interaktív Tört- és Tizedestört Laboratórium"
        icon={<Calculator className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <Card className="border-2 border-purple-200 dark:border-purple-850 bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 shadow-md">
          <CardContent className="p-4 sm:p-6 space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Dinamikus Tört és Tizedestört Vizsgáló
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Állítsd be a számlálót és a nevezőt, figyeld meg az egyszerűsítést, a tizedestört alakot és a típus meghatározását!
              </p>
            </div>

            {/* Input Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              {/* Numerator */}
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-purple-100 dark:border-slate-700 shadow-xs">
                <label className="text-xs font-bold text-purple-700 dark:text-purple-300 block mb-1">
                  Számláló (a): <span className="font-mono text-sm">{numerator}</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="-20"
                    max="30"
                    value={numerator}
                    onChange={(e) => setNumerator(parseInt(e.target.value) || 0)}
                    className="w-full accent-purple-600"
                  />
                  <input
                    type="number"
                    value={numerator}
                    onChange={(e) => setNumerator(parseInt(e.target.value) || 0)}
                    className="w-16 h-8 text-xs font-bold text-center border rounded-lg dark:bg-slate-900 dark:border-slate-700"
                  />
                </div>
              </div>

              {/* Denominator */}
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-purple-100 dark:border-slate-700 shadow-xs">
                <label className="text-xs font-bold text-indigo-700 dark:text-indigo-300 block mb-1">
                  Nevező (b): <span className="font-mono text-sm">{denominator}</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="40"
                    value={denominator}
                    onChange={(e) => setDenominator(parseInt(e.target.value) || 1)}
                    className="w-full accent-indigo-600"
                  />
                  <input
                    type="number"
                    value={denominator}
                    onChange={(e) => setDenominator(parseInt(e.target.value) || 1)}
                    className="w-16 h-8 text-xs font-bold text-center border rounded-lg dark:bg-slate-900 dark:border-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400">Példák:</span>
              {[
                { n: 3, d: 8, label: '3/8 (véges)' },
                { n: 1, d: 3, label: '1/3 (szakaszos)' },
                { n: 1, d: 6, label: '1/6 (vegyes szak.)' },
                { n: 12, d: 18, label: '12/18 (egyszerűsíthető)' },
                { n: 9, d: 4, label: '9/4 (vegyes szám)' },
                { n: -7, d: 20, label: '-7/20 (negatív)' }
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setNumerator(preset.n);
                    setDenominator(preset.d);
                  }}
                  className="px-2 py-1 rounded-lg text-xs font-bold bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Live Result Display Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {/* Card 1: Eredeti Tört */}
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">Eredeti Tört</div>
                <div className="text-xl font-black text-slate-800 dark:text-white font-mono mt-1">
                  {numerator} / {denominator}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {Math.abs(numerator) < denominator ? 'Valódi tört' : Math.abs(numerator) === denominator ? 'Egész (1 egység)' : 'Áltört (>1)'}
                </div>
              </div>

              {/* Card 2: Egyszerűsített Alak */}
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-purple-200 dark:border-purple-800 text-center">
                <div className="text-[11px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">Legegyszerűbb Alak</div>
                <div className="text-xl font-black text-purple-700 dark:text-purple-300 font-mono mt-1">
                  {simpNum} / {simpDen}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {isSimplified ? 'Már a legegyszerűbb alak' : `LNKO = ${currentGcd} (osztva ${currentGcd}-vel)`}
                </div>
              </div>

              {/* Card 3: Tizedestört Alak */}
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center">
                <div className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Tizedestört Érték</div>
                <div className="text-lg font-black text-indigo-700 dark:text-indigo-300 font-mono mt-1 truncate" title={getDecimalDisplay()}>
                  {getDecimalDisplay()}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {isFinite ? '🟢 Véges tizedestört' : '🟡 Végtelen szakaszos'}
                </div>
              </div>

              {/* Card 4: Vegyes Szám / Százalék */}
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center">
                <div className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Százalék / Vegyes alak</div>
                <div className="text-lg font-black text-emerald-700 dark:text-emerald-300 font-mono mt-1">
                  {denominator !== 0 ? `${(decimalVal * 100).toFixed(1).replace('.', ',')}%` : '-'}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {Math.abs(numerator) >= denominator && denominator !== 0 ? (
                    <span>Vegyes: {Math.trunc(numerator / denominator)} egész {Math.abs(numerator % denominator)}/{denominator}</span>
                  ) : (
                    <span>Valódi tört</span>
                  )}
                </div>
              </div>
            </div>

            {/* Explanation box */}
            <div className="p-3.5 bg-purple-50/80 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800 text-xs sm:text-sm text-purple-900 dark:text-purple-200">
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <Zap className="w-4 h-4 text-purple-600" />
                Matematikai elemzés:
              </div>
              <div>
                A(z) <strong>{numerator}/{denominator}</strong> tört legegyszerűbb alakja <strong>{simpNum}/{simpDen}</strong>.
                Az egyszerűsített nevező ({simpDen}) prímtényezős felbontása miatt a tizedestört alakja{' '}
                <strong>{isFinite ? 'VÉGES TIZEDESTÖRT (csak 2 és/vagy 5 szerepel)' : 'VÉGTELEN SZAKASZOS TIZEDESTÖRT (2-n és 5-ön kívül más prímszám is osztja)'}</strong>.
              </div>
            </div>
          </CardContent>
        </Card>
      </TheorySection>
    </TheoryTemplate>
  );
};
