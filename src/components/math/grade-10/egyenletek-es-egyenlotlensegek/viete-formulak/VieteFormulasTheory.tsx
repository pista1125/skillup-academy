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
  VieteFormulasDuoSvg,
  SignOfRootsDeductionSvg,
  SymmetricExpressionsSquareSvg,
  SymmetricExpressionsReciprocalSvg,
  MentalRootGuesserSvg
} from './VieteFormulasFigures';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Sliders,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Zap,
  Calculator,
  Check,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VieteFormulasTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const VieteFormulasTheory: React.FC<VieteFormulasTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 6. SZEKCIÓ: Interaktív labor állapot ---
  const [paramA, setParamA] = useState<number>(1);
  const [paramB, setParamB] = useState<number>(-5);
  const [paramC, setParamC] = useState<number>(6);

  const safeA = paramA === 0 ? 1 : paramA;
  const discriminant = paramB * paramB - 4 * safeA * paramC;

  // Viète értékek
  const sumRoots = -paramB / safeA;
  const prodRoots = paramC / safeA;
  const squareSum = sumRoots * sumRoots - 2 * prodRoots;
  const recipSum = paramC !== 0 ? -paramB / paramC : null;

  // Interaktív villám-teszt állapot
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  return (
    <TheoryTemplate
      title="Ráadás – Viète-formulák!"
      subtitle="10. osztály • VIII. Témakör • 65. lecke előtti ráadás: A gyökök és együtthatók összefüggései, szimmetrikus kifejezések és fejben számolás"
      badge="10. OSZTÁLY • VIII. EGYENLETEK ÉS EGYENLŐTLENSÉGEK • TANANYAG"
      themeColor="amber"
      topicId="g10-eq-viete-formulak-theory"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80">
              <span className="text-xs font-black text-amber-900 dark:text-amber-200 block mb-1">
                ✓ A két aranyszabály (ax² + bx + c = 0, D ≥ 0):
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs font-black text-amber-900 dark:text-amber-200">
                <div className="p-1 bg-white/70 dark:bg-slate-900/60 rounded border border-amber-300">
                  x₁ + x₂ = -b / a
                </div>
                <div className="p-1 bg-white/70 dark:bg-slate-900/60 rounded border border-amber-300">
                  x₁ · x₂ = c / a
                </div>
              </div>
              <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300 font-medium list-none mt-1.5">
                <li>• <strong>Előjelcsapda:</strong> Az összeg előjele mindig a b együttható ELLENTETTJE (-b/a)!</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/50 text-teal-900 dark:text-teal-200">
                <span className="font-bold text-teal-700 dark:text-teal-300 block mb-0.5">📐 Szimmetrikus kifejezések:</span>
                <span>x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂. Reciprok: 1/x₁ + 1/x₂ = -b / c.</span>
              </div>
              <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-900 dark:text-rose-200">
                <span className="font-bold text-rose-700 dark:text-rose-300 block mb-0.5">⚠ Létezési feltétel:</span>
                <span>A formulák csak akkor jelentenek valós gyököket, ha D = b² - 4ac ≥ 0!</span>
              </div>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* ==========================================
          1. SZEKCIÓ: A VIÈTE-FORMULÁK TÉTELE
      ========================================== */}
      <TheorySection
        title="1. A Viète-formulák tétele és algebrai bizonyítása"
        subtitle="Hogyan függ össze a másodfokú egyenlet két gyökének összege és szorzata az együtthatókkal?"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard
              title="A tétel kimondása"
              color="amber"
            >
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-3">
                Ha az <span className="font-mono font-bold">ax² + bx + c = 0</span> (<span className="font-mono">a ≠ 0</span>) másodfokú egyenletnek léteznek <span className="font-mono">x₁</span> és <span className="font-mono">x₂</span> valós gyökei (azaz <span className="font-mono">D ≥ 0</span>), akkor érvényesek a következő összefüggések:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center font-mono font-black text-sm mb-3">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-300 text-amber-900 dark:text-amber-200">
                  x₁ + x₂ = -b / a
                </div>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-300 text-emerald-900 dark:text-emerald-200">
                  x₁ · x₂ = c / a
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Különösen egyszerű az összefüggés, ha a főegyüttható <span className="font-mono">a = 1</span> (normált egyenlet: <span className="font-mono">x² + px + q = 0</span>):
                <span className="font-bold text-slate-900 dark:text-white block mt-1 font-mono">x₁ + x₂ = -p &nbsp;&nbsp;és&nbsp;&nbsp; x₁ · x₂ = q</span>.
              </p>
            </TheoryCard>

            <TheoryCard
              title="A bizonyítás a gyöktényezős alakból"
              color="indigo"
            >
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-2">
                A gyöktényezős alak tételéből tudjuk:
              </p>
              <div className="font-mono text-xs p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-200 space-y-1 mb-2">
                <div>a(x - x₁)(x - x₂) = a · [x² - (x₁ + x₂)x + x₁x₂] = ax² - a(x₁ + x₂)x + a(x₁x₂)</div>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                Mivel ennek meg kell egyeznie az <span className="font-mono">ax² + bx + c</span> polinommal minden x-re, az azonos fokú tagok együtthatóinak egyenlőknek kell lenniük:
              </p>
              <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li>x együtthatója: <span className="font-mono">-a(x₁ + x₂) = b ⟹ x₁ + x₂ = -b/a</span></li>
                <li>Konstans tag: <span className="font-mono">a(x₁x₂) = c ⟹ x₁ · x₂ = c/a</span></li>
              </ul>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center shadow-xs">
              <VieteFormulasDuoSvg size={260} />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
                Az összeg ellentétes előjelű a középső taggal, a szorzat pedig azonos a konstanssal.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ==========================================
          2. SZEKCIÓ: FEJBEN SZÁMOLÁS ÉS GYORS MEGOLDÁS
      ========================================== */}
      <TheorySection
        title="2. Gyökök gyors megsejtése és ellenőrzése fejben"
        subtitle="Hogyan oldhatunk meg másodfokú egyenleteket másodpercek alatt a megoldóképlet nélkül?"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard
              title="A 2-lépéses szorzat-összeg fejben számolási technika"
              color="emerald"
            >
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-2">
                Legyen az egyenlet: <span className="font-mono font-bold">x² - 7x + 10 = 0</span>.
              </p>
              <ol className="text-sm space-y-2 text-slate-700 dark:text-slate-300 list-decimal list-inside font-medium">
                <li>
                  <strong>1. lépés (A szorzat):</strong> Olyan két egész számot keresünk, amelyek szorzata <span className="font-mono">q = 10</span>.
                  Lehetséges egész párok: <span className="font-mono">(1; 10)</span> és <span className="font-mono">(2; 5)</span> (vagy mindkettő negatív).
                </li>
                <li>
                  <strong>2. lépés (Az összeg):</strong> A két szám összegének <span className="font-mono">-p = -(-7) = 7</span>-nek kell lennie.
                  Mivel <span className="font-mono">2 + 5 = 7</span> és <span className="font-mono">2 · 5 = 10</span>, a gyökök azonnal adódnak:
                  <div className="font-mono text-xs font-black text-emerald-800 dark:text-emerald-300 p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg mt-1 text-center">
                    x₁ = 2 &nbsp;&nbsp;és&nbsp;&nbsp; x₂ = 5
                  </div>
                </li>
              </ol>
            </TheoryCard>

            <TheoryTrapBox
              title="A leggyakoribb hiba: A 'b' előjelének elfelejtése"
            >
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Az <span className="font-mono">x² + 5x + 6 = 0</span> egyenletnél sokan 2-t és 3-at gondolnak megoldásnak.
                Azonban itt az összeg <span className="font-mono">x₁ + x₂ = -5</span> kell legyen!
                Ezért a helyes gyökök: <strong className="font-mono text-emerald-700 dark:text-emerald-300">x₁ = -2 és x₂ = -3</strong>, hiszen <span className="font-mono">(-2) + (-3) = -5</span> és <span className="font-mono">(-2)(-3) = 6</span>.
              </p>
            </TheoryTrapBox>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center shadow-xs">
              <MentalRootGuesserSvg size={260} />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
                Először a szorzótényezőket vizsgáljuk, majd az összeggel kiválasztjuk a helyes párt.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ==========================================
          3. SZEKCIÓ: A GYÖKÖK ELŐJELE MEGOLDÁS NÉLKÜL
      ========================================== */}
      <TheorySection
        title="3. A gyökök előjelének eldöntése megoldás nélkül"
        subtitle="Hogyan határozható meg a gyökök előjele kizárólag az együtthatókból?"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard
              title="A 3 alapeset vizsgálata"
              color="blue"
            >
              <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200">
                  <strong className="text-blue-900 dark:text-blue-200 block mb-0.5">1. Ha c/a &gt; 0 és -b/a &gt; 0:</strong>
                  Mivel a szorzat pozitív, a két gyök azonos előjelű. Mivel az összegük is pozitív, mindkét gyök szigorúan pozitív: <strong>x₁ &gt; 0 és x₂ &gt; 0</strong>.
                </div>

                <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200">
                  <strong className="text-purple-900 dark:text-purple-200 block mb-0.5">2. Ha c/a &gt; 0 és -b/a &lt; 0:</strong>
                  A szorzat pozitív (azonos előjelek), de az összegük negatív, így mindkét gyök szigorúan negatív: <strong>x₁ &lt; 0 és x₂ &lt; 0</strong>.
                </div>

                <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200">
                  <strong className="text-rose-900 dark:text-rose-200 block mb-0.5">3. Ha c/a &lt; 0:</strong>
                  Két valós szám szorzata csak akkor lehet negatív, ha ellentétes előjelűek. Így az egyenletnek <strong>egy pozitív és egy negatív gyöke van</strong>.
                </div>
              </div>
            </TheoryCard>

            <TheoryCallout
              title="Gyakorlati Érettségi Kérdés"
              type="tip"
            >
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                „Milyen előjelűek a 3x² - 17x + 2 = 0 egyenlet gyökei anélkül, hogy megoldanád?”
                <br />
                Válasz: D = 289 - 24 = 265 &gt; 0 (léteznek valós gyökök). c/a = 2/3 &gt; 0 (azonos előjel), -b/a = 17/3 &gt; 0 (pozitív összeg). <strong>Tehát mindkét gyök szigorúan pozitív!</strong>
              </p>
            </TheoryCallout>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center shadow-xs">
              <SignOfRootsDeductionSvg size={260} />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
                A konstans tag (c/a) előjele mutatja meg, hogy a gyökök azonosak vagy ellentétesek.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ==========================================
          4. SZEKCIÓ: SZIMMETRIKUS KIFEJEZÉSEK
      ========================================== */}
      <TheorySection
        title="4. Szimmetrikus kifejezések kiszámítása"
        subtitle="Hogyan számolható ki x₁² + x₂² és 1/x₁ + 1/x₂ értéke anélkül, hogy ismernénk a konkrét gyököket?"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard
              title="A szimmetrikus kifejezés fogalma"
              color="purple"
            >
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-2">
                Egy kétváltozós kifejezést <strong>szimmetrikusnak</strong> nevezünk, ha a változók (<span className="font-mono">x₁</span> és <span className="font-mono">x₂</span>) felcserélésével a kifejezés értéke nem változik meg.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Minden szimmetrikus kifejezés átalakítható úgy, hogy kizárólag a gyökök összege (<span className="font-mono">x₁ + x₂</span>) és szorzata (<span className="font-mono">x₁x₂</span>) szerepeljen benne!
              </p>
            </TheoryCard>

            <TheoryCard
              title="A legfontosabb szimmetrikus azonosságok"
              color="indigo"
            >
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">
                  <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-0.5">1. Négyzetösszeg:</span>
                  x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂
                </div>
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">
                  <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-0.5">2. Reciprok összeg:</span>
                  1/x₁ + 1/x₂ = (x₁ + x₂) / (x₁x₂) = -b / c
                </div>
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">
                  <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-0.5">3. Különbség négyzete:</span>
                  (x₁ - x₂)² = (x₁ + x₂)² - 4x₁x₂ = D / a²
                </div>
              </div>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center shadow-xs">
              <SymmetricExpressionsSquareSvg size={260} />
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center shadow-xs">
              <SymmetricExpressionsReciprocalSvg size={260} />
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ==========================================
          5. SZEKCIÓ: KIDOLGOZOTT ÉRETTSÉGI MINTAPÉLDÁK
      ========================================== */}
      <TheorySection
        title="5. Kidolgozott érettségi és emelt szintű mintapéldák"
        subtitle="Részletesen levezetett típusfeladatok megoldása a Viète-formulák segítségével"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Minta */}
          <TheoryCard
            title="1. Minta: Négyzetösszeg kiszámítása gyökök nélkül"
            color="amber"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-bold text-slate-900 dark:text-white">
                Feladat: Számítsd ki a <span className="font-mono">2x² - 6x - 1 = 0</span> egyenlet gyökeinek négyzetösszegét (<span className="font-mono">x₁² + x₂²</span>) a gyökök kiszámítása nélkül!
              </p>
              <p><strong>1. Lépés: Viète-értékek felírása:</strong></p>
              <div className="font-mono p-1.5 bg-slate-100 dark:bg-slate-800 rounded">
                x₁ + x₂ = -(-6)/2 = 3
                <br />
                x₁ · x₂ = -1/2 = -0,5
              </div>
              <p><strong>2. Lépés: Szimmetrikus azonosság:</strong></p>
              <div className="font-mono p-1.5 bg-amber-50 dark:bg-amber-950/40 rounded font-bold text-amber-900 dark:text-amber-200">
                x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂ = 3² - 2·(-0,5) = 9 + 1 = 10
              </div>
            </div>
          </TheoryCard>

          {/* 2. Minta */}
          <TheoryCard
            title="2. Minta: Paraméteres feladat (Egyenlő gyökök vagy reciprok gyökök)"
            color="teal"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-bold text-slate-900 dark:text-white">
                Feladat: Milyen <span className="font-mono">m</span> valós paraméter esetén lesznek a <span className="font-mono">3x² - 8x + m = 0</span> egyenlet gyökei egymás reciprokai?
              </p>
              <p><strong>1. Lépés: A feltétel felírása:</strong></p>
              <div className="font-mono p-1.5 bg-slate-100 dark:bg-slate-800 rounded">
                Két szám egymás reciproka ⟺ x₁ · x₂ = 1
              </div>
              <p><strong>2. Lépés: Viète-szorzat alkalmazása:</strong></p>
              <div className="font-mono p-1.5 bg-teal-50 dark:bg-teal-950/40 rounded font-bold text-teal-900 dark:text-teal-200">
                x₁ · x₂ = m / 3 = 1 ⟹ m = 3
                <br />
                Ellenőrzés (D ≥ 0): D = 64 - 4·3·3 = 64 - 36 = 28 &gt; 0 ✓
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ==========================================
          6. SZEKCIÓ: INTERAKTÍV VIÈTE LABORATÓRIUM
      ========================================== */}
      <TheorySection
        title="6. Interaktív Viète Laboratórium"
        subtitle="Állítsd be az egyenlet együtthatóit, figyeld meg az összeg, szorzat és négyzetösszeg alakulását valós időben!"
      >
        <div className="p-6 bg-slate-100/80 dark:bg-slate-900/80 rounded-3xl border border-slate-300 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Dinamikus Viète és Szimmetrikus Kifejezés Kalkulátor
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Állítsd be az ax² + bx + c együtthatóit!
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setParamA(1);
                setParamB(-5);
                setParamC(6);
              }}
              className="text-xs gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Alaphelyzet
            </Button>
          </div>

          {/* Csúszkák */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>'a' együttható:</span>
                <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{paramA}</span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="1"
                value={paramA}
                onChange={(e) => setParamA(Number(e.target.value) === 0 ? 1 : Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>'b' együttható:</span>
                <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{paramB}</span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                step="1"
                value={paramB}
                onChange={(e) => setParamB(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>'c' konstans:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{paramC}</span>
              </div>
              <input
                type="range"
                min="-12"
                max="12"
                step="1"
                value={paramC}
                onChange={(e) => setParamC(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>
          </div>

          {/* Eredmény tábla */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border-2 border-amber-300 dark:border-amber-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
              <div>
                <span className="text-xs font-bold uppercase text-slate-500">Vizsgált egyenlet:</span>
                <div className="text-xl font-black font-mono text-slate-900 dark:text-white">
                  {safeA}x² {paramB >= 0 ? `+ ${paramB}x` : `- ${Math.abs(paramB)}x`} {paramC >= 0 ? `+ ${paramC}` : `- ${Math.abs(paramC)}`} = 0
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono border ${
                discriminant >= 0
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300'
                  : 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300'
              }`}>
                D = {discriminant} ({discriminant >= 0 ? 'Valós gyökök léteznek' : 'Nincs valós gyök!'})
              </div>
            </div>

            {/* Számított értékek rácsa */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
                <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 block">x₁ + x₂ (-b/a):</span>
                <span className="text-base font-black text-amber-950 dark:text-amber-100">{sumRoots.toFixed(2)}</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 block">x₁ · x₂ (c/a):</span>
                <span className="text-base font-black text-emerald-950 dark:text-emerald-100">{prodRoots.toFixed(2)}</span>
              </div>

              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900">
                <span className="text-[10px] font-bold text-purple-800 dark:text-purple-300 block">x₁² + x₂²:</span>
                <span className="text-base font-black text-purple-950 dark:text-purple-100">{squareSum.toFixed(2)}</span>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
                <span className="text-[10px] font-bold text-blue-800 dark:text-blue-300 block">1/x₁ + 1/x₂ (-b/c):</span>
                <span className="text-base font-black text-blue-950 dark:text-blue-100">
                  {recipSum !== null ? recipSum.toFixed(2) : 'Nem értelmezett (c=0)'}
                </span>
              </div>
            </div>
          </div>

          {/* Villám Parabola-Döntő Kvíz */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                ⚡ Villám Viète Ellenőrző Kérdés
              </h4>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              Mennyi az <span className="font-mono font-bold">x² + 6x - 7 = 0</span> egyenlet gyökeinek összege?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setQuizAnswer('A')}
                className={`p-3 rounded-xl text-left transition-all border ${
                  quizAnswer === 'A'
                    ? 'bg-rose-100 dark:bg-rose-950/60 border-rose-400 text-rose-900 dark:text-rose-200'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <strong>A)</strong> +6 (mert b = 6)
              </button>
              <button
                onClick={() => setQuizAnswer('B')}
                className={`p-3 rounded-xl text-left transition-all border ${
                  quizAnswer === 'B'
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <strong>B)</strong> -6 (mert x₁ + x₂ = -b/a = -6/1 = -6)
              </button>
            </div>

            {quizAnswer && (
              <div className={`p-3 rounded-xl text-xs font-medium flex items-start gap-2 ${
                quizAnswer === 'B'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-300'
              }`}>
                {quizAnswer === 'B' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Tökéletes válasz!</strong> A Viète-formula szerint a gyökök összege -b/a, tehát az x együtthatójának ellentettje: -6. A gyökök egyébként 1 és -7, amelyek összege valóban 1 + (-7) = -6!
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Előjelhiba!</strong> A Viète-formula aranyszabálya, hogy a gyökök összege a középső tag ellentettje (-b/a). Tehát +6 helyett -6 a helyes összeg.
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tananyag végi cselekvésre ösztönzés */}
        <div className="mt-8 p-6 bg-gradient-to-r from-amber-600 to-indigo-600 rounded-3xl text-white text-center space-y-3 shadow-lg">
          <h3 className="text-lg font-black tracking-tight">
            Készen állsz a Viète-formulák gyakorlására?
          </h3>
          <p className="text-xs text-amber-100 max-w-lg mx-auto">
            Mélyítsd el a tudásodat a 3 szintre bontott interaktív kvízben, a párosítóban és a rendszerezőben!
          </p>
          <div className="pt-2">
            <Button
              onClick={onStartQuiz}
              size="lg"
              className="bg-white text-amber-700 hover:bg-amber-50 font-black shadow-md hover:shadow-lg transition-all rounded-xl"
            >
              Kvíz és Gyakorló Feladatok Indítása <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

