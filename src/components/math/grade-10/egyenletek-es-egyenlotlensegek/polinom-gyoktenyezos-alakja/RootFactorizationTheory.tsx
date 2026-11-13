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
  RootFactorFormulaSvg,
  MissingLeadingCoeffTrapSvg,
  FractionSimplificationSvg,
  DiscriminantCasesFactorSvg,
  ConstructEquationFromRootsSvg
} from './RootFactorizationFigures';
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
  Boxes,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RootFactorizationTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const RootFactorizationTheory: React.FC<RootFactorizationTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 6. SZEKCIÓ: Interaktív labor állapot ---
  const [paramA, setParamA] = useState<number>(2);
  const [rootX1, setRootX1] = useState<number>(1);
  const [rootX2, setRootX2] = useState<number>(4);

  // Számítások: a(x - x1)(x - x2) = a(x² - (x1+x2)x + x1*x2) = ax² - a(x1+x2)x + a*x1*x2
  const safeA = paramA === 0 ? 1 : paramA;
  const polyB = -safeA * (rootX1 + rootX2);
  const polyC = safeA * rootX1 * rootX2;
  const isDoubleRoot = rootX1 === rootX2;

  // Interaktív villám-teszt állapot
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  return (
    <TheoryTemplate
      title="A másodfokú polinom gyöktényezős alakja"
      subtitle="10. osztály • VIII. Témakör • 64. lecke: Szorzattá bontás a gyökök segítségével, algebrai törtek egyszerűsítése és egyenletalkotás"
      badge="10. OSZTÁLY • VIII. EGYENLETEK ÉS EGYENLŐTLENSÉGEK • TANANYAG"
      themeColor="purple"
      topicId="g10-eq-polinom-gyoktenyezos-alakja-theory"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-purple-50/90 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/80">
              <span className="text-xs font-black text-purple-900 dark:text-purple-200 block mb-1">
                ✓ A gyöktényezős alak alaptétele:
              </span>
              <div className="font-mono text-xs font-black text-purple-800 dark:text-purple-300">
                ax² + bx + c = a · (x - x₁)(x - x₂)
              </div>
              <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300 font-medium list-none mt-1">
                <li>• <strong>Az 'a' főegyüttható nem felejthető el:</strong> A zárójelek elé kötelező kitenni az x² együtthatóját!</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/50 text-teal-900 dark:text-teal-200">
                <span className="font-bold text-teal-700 dark:text-teal-300 block mb-0.5">⭐ D = 0 és D &lt; 0 esetek:</span>
                <span>D = 0: a(x - x₀)² (teljes négyzet). D &lt; 0: a valós számok felett NEM bontható szorzatra!</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200">
                <span className="font-bold text-amber-700 dark:text-amber-300 block mb-0.5">⚠ Tört egyszerűsítése:</span>
                <span>Egyszerűsítés előtt a nevező zérushelyét kötelező kikötni, és a kikötés egyszerűsítés után is él!</span>
              </div>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* ==========================================
          1. SZEKCIÓ: A GYÖKTÉNYEZŐS ALAK TÉTELE
      ========================================== */}
      <TheorySection
        title="1. A gyöktényezős alak tétele és levezetése"
        subtitle="Hogyan bontható fel egy másodfokú polinom elsőfokú tényezők szorzatára a gyökei ismeretében?"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard
              title="A gyöktényezős alak tétele"
              color="purple"
            >
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-3">
                Ha az <span className="font-mono font-bold">ax² + bx + c</span> másodfokú polinomnak (ahol <span className="font-mono">a ≠ 0</span>) léteznek valós gyökei, és ezek <span className="font-mono">x₁</span> és <span className="font-mono">x₂</span>, akkor a polinom azonosan egyenlő a következő szorzattal:
              </p>
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-900 text-center font-mono font-black text-purple-900 dark:text-purple-200 text-base mb-3">
                ax² + bx + c = a(x - x₁)(x - x₂)
              </div>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                Ahol az <span className="font-mono">(x - x₁)</span> és <span className="font-mono">(x - x₂)</span> kifejezéseket <strong>gyöktényezőknek</strong> nevezzük, mert <span className="font-mono">x = x₁</span> vagy <span className="font-mono">x = x₂</span> esetén értékük nulla lesz.
              </p>
            </TheoryCard>

            <TheoryCard
              title="Miért igaz ez a felbontás? (A bizonyítás logikája)"
              color="indigo"
            >
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-2">
                Bontsuk ki a jobb oldali szorzatot:
              </p>
              <div className="font-mono text-xs p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-200 space-y-1 mb-2">
                <div>a(x - x₁)(x - x₂) = a · [x² - x₁x - x₂x + x₁x₂]</div>
                <div>= a · [x² - (x₁ + x₂)x + x₁x₂]</div>
                <div>= ax² - a(x₁ + x₂)x + a(x₁x₂)</div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A Viète-formulák alapján tudjuk, hogy <span className="font-mono">x₁ + x₂ = -b/a</span> és <span className="font-mono">x₁x₂ = c/a</span>.
                Ezeket behelyettesítve a fenti kifejezésbe pontosan az eredeti <span className="font-mono">ax² + bx + c</span> polinomot kapjuk vissza!
              </p>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center shadow-xs">
              <RootFactorFormulaSvg size={260} />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
                Az 'a' főegyüttható szorzótényezőként áll a két gyöktényező előtt.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ==========================================
          2. SZEKCIÓ: AZ 'a' FŐEGYÜTTHATÓ ÉS CSAPDÁK
      ========================================== */}
      <TheorySection
        title="2. Az 'a' főegyüttható szerepe és a leggyakoribb csapdák"
        subtitle="Miért kapunk hibás eredményt, ha elhagyjuk a szorzat elejéről a főegyütthatót?"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <TheoryTrapBox
              title="A leggyakoribb érettségi pontlevonás: Az 'a' elhagyása"
            >
              <div className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
                <p>
                  Bontsuk szorzatra a <strong className="font-mono text-purple-700 dark:text-purple-300">2x² - 8x + 6</strong> kifejezést!
                </p>
                <p>
                  A megoldóképletből a gyökök: <span className="font-mono font-bold">x₁ = 1</span> és <span className="font-mono font-bold">x₂ = 3</span>.
                </p>
                <div className="p-2 bg-rose-50 dark:bg-rose-950/40 rounded border border-rose-200 text-rose-800 dark:text-rose-300 font-mono">
                  ❌ HIBÁS VÁLASZ: (x - 1)(x - 3)
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Ha az <span className="font-mono">(x - 1)(x - 3)</span> kifejezést beszorozzuk, csak <span className="font-mono">x² - 4x + 3</span>-at kapunk, nem pedig <span className="font-mono">2x² - 8x + 6</span>-ot!
                </p>
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-200 text-emerald-800 dark:text-emerald-300 font-mono font-bold">
                  ✓ HELYES VÁLASZ: 2 · (x - 1)(x - 3)
                </div>
              </div>
            </TheoryTrapBox>

            <TheoryCard
              title="Negatív főegyüttható kezelése"
              color="rose"
            >
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-2">
                Ha a főegyüttható negatív (pl. <span className="font-mono">-x² + 5x - 6</span>), akkor <span className="font-mono">a = -1</span>:
              </p>
              <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono text-xs text-rose-800 dark:text-rose-300 font-bold text-center">
                -x² + 5x - 6 = -(x - 2)(x - 3) &nbsp;vagy&nbsp; (2 - x)(x - 3)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                A mínuszjelet akár be is vihetjük az egyik zárójelbe, így <span className="font-mono">(2 - x)(x - 3)</span> alakban is felírható.
              </p>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center shadow-xs">
              <MissingLeadingCoeffTrapSvg size={260} />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
                Az 'a' főegyüttható biztosítja a másodfokú tag helyes együtthatóját.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ==========================================
          3. SZEKCIÓ: ALGEBRAI TÖRTEK EGYSZERŰSÍTÉSE
      ========================================== */}
      <TheorySection
        title="3. Algebrai törtek egyszerűsítése gyöktényezőkkel"
        subtitle="Hogyan egyszerűsíthetők az emeletes és másodfokú törtes kifejezések, és mi a kikötések sorsa?"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard
              title="Az egyszerűsítés 3-lépéses algoritmusa"
              color="blue"
            >
              <ol className="text-sm space-y-2 text-slate-700 dark:text-slate-300 list-decimal list-inside font-medium">
                <li>
                  <strong>Gyökök meghatározása:</strong> Megkeressük a számláló és a nevező zérushelyeit (megoldóképlettel vagy kiemeléssel).
                </li>
                <li>
                  <strong>Gyöktényezős alak:</strong> Mind a számlálót, mind a nevezőt felírjuk gyöktényezős szorzatként: <span className="font-mono">a(x - x₁)(x - x₂)</span>.
                </li>
                <li>
                  <strong>Közös tényezők egyszerűsítése:</strong> Az azonos <span className="font-mono">(x - x_k)</span> tényezőket kihúzzuk.
                </li>
              </ol>
            </TheoryCard>

            <TheoryCallout
              title="A Kikötés Nem Tűnik El az Egyszerűsítéssel!"
              type="warning"
            >
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Gyakori tévedés azt hinni, hogy ha egyszerűsítettük a törtet, akkor a kizárt érték újra behelyettesíthetővé válik.
                Például a <span className="font-mono">(x² - 5x + 6) / (x - 3)</span> törtből egyszerűsítés után <span className="font-mono">x - 2</span> marad.
                Ennek ellenére az eredeti kifejezésbe <strong>x = 3 soha nem helyettesíthető be</strong>, mert a nevező ott 0 lenne!
              </p>
            </TheoryCallout>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center shadow-xs">
              <FractionSimplificationSvg size={260} />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
                A közös (x - 3) tényező kiejtése után a kikötést (x ≠ 3) kötelező megőrizni!
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ==========================================
          4. SZEKCIÓ: KÜLÖNLEGES ESETEK (D = 0, D < 0)
      ========================================== */}
      <TheorySection
        title="4. Különleges esetek: D = 0 és D < 0"
        subtitle="Mi történik, ha egy kettős gyök van, vagy ha a polinomnak nincs valós zérushelye?"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard
              title="1. Eset: D = 0 (Egy kettős gyök ⟹ Teljes négyzet)"
              color="indigo"
            >
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-2">
                Ha a diszkrimináns nulla (<span className="font-mono">D = 0</span>), a megoldóképletből <span className="font-mono">x₁ = x₂ = x₀</span> egybeeső gyököt kapunk. Ekkor a szorzat alak:
              </p>
              <div className="font-mono text-xs p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-indigo-950 dark:text-indigo-200 font-bold text-center">
                ax² + bx + c = a(x - x₀)(x - x₀) = a(x - x₀)²
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                Példa: <span className="font-mono">4x² - 12x + 9 = 4(x - 1,5)² = (2x - 3)²</span>.
              </p>
            </TheoryCard>

            <TheoryCard
              title="2. Eset: D < 0 (Nincs valós gyök ⟹ Nem bontható szorzatra)"
              color="rose"
            >
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-2">
                Ha a diszkrimináns szigorúan negatív (<span className="font-mono">D &lt; 0</span>), a polinomnak nincs valós gyöke.
                Ezért a valós számok halmazán <strong>nem bontható fel elsőfokú valós tényezők szorzatára</strong> (irreducibilis polinom).
              </p>
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-rose-700 dark:text-rose-300 text-center font-bold">
                x² + 2x + 5: D = 4 - 20 = -16 &lt; 0 ⟹ Nem bontható valós szorzatra!
              </div>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center shadow-xs">
              <DiscriminantCasesFactorSvg size={260} />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
                A diszkrimináns előjele dönti el a szorzattá alakíthatóságot.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ==========================================
          5. SZEKCIÓ: KIDOLGOZOTT ÉRETTSÉGI MINTAPÉLDÁK
      ========================================== */}
      <TheorySection
        title="5. Kidolgozott érettségi mintafeladatok"
        subtitle="Gyakori feladattípusok részletes levezetéssel és magyarázattal"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Minta */}
          <TheoryCard
            title="1. Minta: Szorzattá bontás (a ≠ 1)"
            color="purple"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-bold text-slate-900 dark:text-white">
                Feladat: Bontsd szorzatra a <span className="font-mono">3x² - 5x - 2</span> polinomot!
              </p>
              <p><strong>1. Lépés: Gyökök keresése:</strong></p>
              <div className="font-mono p-1.5 bg-slate-100 dark:bg-slate-800 rounded">
                D = 25 - 4·3·(-2) = 49
                <br />
                x₁,₂ = (5 ± 7) / 6 ⟹ x₁ = 2, x₂ = -1/3
              </div>
              <p><strong>2. Lépés: Képlet alkalmazása:</strong></p>
              <div className="font-mono p-1.5 bg-purple-50 dark:bg-purple-950/40 rounded font-bold text-purple-900 dark:text-purple-200">
                3 · (x - 2)(x - (-1/3)) = (x - 2)(3x + 1)
              </div>
            </div>
          </TheoryCard>

          {/* 2. Minta */}
          <TheoryCard
            title="2. Minta: Tört egyszerűsítése"
            color="blue"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-bold text-slate-900 dark:text-white">
                Feladat: Egyszerűsítsd a <span className="font-mono">(2x² - 8) / (x² - 4x + 4)</span> törtet!
              </p>
              <p><strong>1. Lépés: Számláló és nevező szorzattá bontása:</strong></p>
              <div className="font-mono p-1.5 bg-slate-100 dark:bg-slate-800 rounded">
                Számláló: 2(x² - 4) = 2(x - 2)(x + 2)
                <br />
                Nevező: (x - 2)²
              </div>
              <p><strong>2. Lépés: Kikötés és egyszerűsítés:</strong></p>
              <div className="font-mono p-1.5 bg-blue-50 dark:bg-blue-950/40 rounded font-bold text-blue-900 dark:text-blue-200">
                Kikötés: x ≠ 2
                <br />
                Eredmény: 2(x + 2) / (x - 2)
              </div>
            </div>
          </TheoryCard>

          {/* 3. Minta */}
          <TheoryCard
            title="3. Minta: Egyenletalkotás gyökökből"
            color="emerald"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-bold text-slate-900 dark:text-white">
                Feladat: Írj fel olyan másodfokú egyenletet, amelynek gyökei <span className="font-mono">x₁ = -3</span> és <span className="font-mono">x₂ = 7</span>!
              </p>
              <p><strong>1. Lépés: Gyöktényezős alak:</strong></p>
              <div className="font-mono p-1.5 bg-slate-100 dark:bg-slate-800 rounded">
                (x - (-3))(x - 7) = 0
                <br />
                (x + 3)(x - 7) = 0
              </div>
              <p><strong>2. Lépés: Zárójelek felbontása:</strong></p>
              <div className="font-mono p-1.5 bg-emerald-50 dark:bg-emerald-950/40 rounded font-bold text-emerald-900 dark:text-emerald-200">
                x² - 7x + 3x - 21 = 0
                <br />
                x² - 4x - 21 = 0
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ==========================================
          6. SZEKCIÓ: INTERAKTÍV GYÖKTÉNYEZŐS LABORATÓRIUM
      ========================================== */}
      <TheorySection
        title="6. Interaktív Gyöktényezős Laboratórium"
        subtitle="Kísérletezz a főegyütthatóval és a gyökökkel, figyeld meg a kibontott alakot valós időben!"
      >
        <div className="p-6 bg-slate-100/80 dark:bg-slate-900/80 rounded-3xl border border-slate-300 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Gyöktényezős Polinom és Tört Szimulátor
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Állítsd be az 'a' főegyütthatót és a két valós gyököt (x₁, x₂)!
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setParamA(2);
                setRootX1(1);
                setRootX2(4);
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
                <span>'a' főegyüttható:</span>
                <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">{paramA}</span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="1"
                value={paramA}
                onChange={(e) => setParamA(Number(e.target.value) === 0 ? 1 : Number(e.target.value))}
                className="w-full accent-purple-600"
              />
              <span className="text-[10px] text-slate-500 block">x² szorzója (a ≠ 0)</span>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>1. gyök (x₁):</span>
                <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{rootX1}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={rootX1}
                onChange={(e) => setRootX1(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <span className="text-[10px] text-slate-500 block">Tényező: (x - {rootX1})</span>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>2. gyök (x₂):</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{rootX2}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={rootX2}
                onChange={(e) => setRootX2(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <span className="text-[10px] text-slate-500 block">Tényező: (x - {rootX2})</span>
            </div>
          </div>

          {/* Eredmény doboz */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border-2 border-purple-300 dark:border-purple-800 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-bold uppercase text-purple-600 dark:text-purple-400 block mb-1">
                  Gyöktényezős szorzatalak:
                </span>
                <div className="text-lg font-black font-mono text-slate-900 dark:text-white p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                  {safeA === 1 ? '' : safeA === -1 ? '-' : `${safeA} · `}
                  {isDoubleRoot ? `(x - ${rootX1})²` : `(x - ${rootX1})(x - ${rootX2})`}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400 block mb-1">
                  Kifejtett normál alak (ax² + bx + c):
                </span>
                <div className="text-lg font-black font-mono text-indigo-900 dark:text-indigo-200 p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                  {safeA === 1 ? '' : safeA === -1 ? '-' : safeA}x² {polyB >= 0 ? `+ ${polyB}x` : `- ${Math.abs(polyB)}x`} {polyC >= 0 ? `+ ${polyC}` : `- ${Math.abs(polyC)}`}
                </div>
              </div>
            </div>

            {/* Tört egyszerűsítés minta */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                🧩 Kapcsolódó algebrai tört egyszerűsítése a(z) (x - {rootX1}) nevezővel:
              </span>
              <div className="font-mono text-slate-900 dark:text-slate-100">
                [{safeA === 1 ? '' : safeA === -1 ? '-' : `${safeA}`}x² {polyB >= 0 ? `+ ${polyB}x` : `- ${Math.abs(polyB)}x`} {polyC >= 0 ? `+ ${polyC}` : `- ${Math.abs(polyC)}`}] / (x - {rootX1}) = {safeA === 1 ? '' : safeA === -1 ? '-' : `${safeA} · `}(x - {rootX2}) &nbsp;&nbsp;(Kikötés: x ≠ {rootX1})
              </div>
            </div>
          </div>

          {/* Villám Parabola-Döntő Kvíz */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                ⚡ Villám Gyöktényezős Ellenőrző Kérdés
              </h4>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              Egy másodfokú polinom főegyütthatója <span className="font-mono font-bold">a = 3</span>, gyökei pedig <span className="font-mono font-bold">x₁ = -2</span> és <span className="font-mono font-bold">x₂ = 5</span>. Melyik a helyes gyöktényezős alakja?
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
                <strong>A)</strong> (x + 2)(x - 5)
              </button>
              <button
                onClick={() => setQuizAnswer('B')}
                className={`p-3 rounded-xl text-left transition-all border ${
                  quizAnswer === 'B'
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <strong>B)</strong> 3 · (x + 2)(x - 5)
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
                      <strong>Tökéletes válasz!</strong> A gyöktényezős alak képlete a(x - x₁)(x - x₂). Mivel a = 3, a 3-as szorzó kötelezően a zárójelek elé kerül: 3(x - (-2))(x - 5) = 3(x + 2)(x - 5).
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Csapdába estél!</strong> Elfelejtetted az a = 3 főegyütthatót a szorzat elől! Kibontva az (x + 2)(x - 5) csak x² - 3x - 10-et adna 3x² helyett.
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tananyag végi cselekvésre ösztönzés */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl text-white text-center space-y-3 shadow-lg">
          <h3 className="text-lg font-black tracking-tight">
            Készen állsz a szorzattá bontási és egyszerűsítési feladatokra?
          </h3>
          <p className="text-xs text-purple-100 max-w-lg mx-auto">
            Gyakorold be a gyöktényezős alak alkalmazását a 3 szintes interaktív kvízben, a párosítóban és a rendszerezőben!
          </p>
          <div className="pt-2">
            <Button
              onClick={onStartQuiz}
              size="lg"
              className="bg-white text-purple-700 hover:bg-purple-50 font-black shadow-md hover:shadow-lg transition-all rounded-xl"
            >
              Kvíz és Gyakorló Feladatok Indítása <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

