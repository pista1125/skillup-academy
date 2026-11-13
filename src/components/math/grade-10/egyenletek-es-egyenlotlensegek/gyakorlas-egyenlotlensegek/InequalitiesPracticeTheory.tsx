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
  FractionSignChartSvg,
  AbsoluteValueInequalityBandSvg,
  DenominatorDangerTrapSvg,
  ComplexIntervalIntersectionSvg,
  AbsoluteQuadraticParabolaSvg
} from './InequalitiesPracticeFigures';
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
  ShieldAlert,
  Percent,
  Check,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InequalitiesPracticeTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const InequalitiesPracticeTheory: React.FC<InequalitiesPracticeTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 6. SZEKCIÓ: Interaktív szimulátor állapotai ---
  // Törtes mód: (x - a) / (x - b) ≶ 0
  const [paramA, setParamA] = useState<number>(2); // számláló gyöke
  const [paramB, setParamB] = useState<number>(-3); // nevező gyöke
  const [fractionRel, setFractionRel] = useState<'gt' | 'gte' | 'lt' | 'lte'>('gt');

  // Abszolútértékes mód: |x - center| <= radius
  const [absCenter, setAbsCenter] = useState<number>(1);
  const [absRadius, setAbsRadius] = useState<number>(4);

  // Számítások a törtes egyenlőtlenséghez:
  const root1 = Math.min(paramA, paramB);
  const root2 = Math.max(paramA, paramB);
  const isIdenticalRoots = paramA === paramB;

  // Megoldáshalmaz szövege:
  const getFractionSolution = () => {
    if (isIdenticalRoots) {
      if (fractionRel === 'gt' || fractionRel === 'gte') return `x ∈ ℝ \\ {${paramA}} (mindig pozitív, kivéve x = ${paramA})`;
      return `M = ∅ (egy teljes négyzet/négyzetes hányados sosem negatív)`;
    }
    const isStrict = fractionRel === 'gt' || fractionRel === 'lt';
    const isPositive = fractionRel === 'gt' || fractionRel === 'gte';

    if (isPositive) {
      // Két gyökön kívül: ]-inf; root1[ U ]root2; inf[
      // Ha megengedő, a számláló lehet zárt, de a nevező soha!
      const leftBracket = !isStrict && paramA === root1 ? ']' : '[';
      const rightBracket = !isStrict && paramA === root2 ? '[' : ']';
      return `x ∈ ]-∞; ${root1}${leftBracket} ∪ ${rightBracket}${root2}; ∞[ (a gyökökön kívül)`;
    } else {
      // Két gyök között:
      const leftBracket = !isStrict && paramA === root1 ? '[' : ']';
      const rightBracket = !isStrict && paramA === root2 ? ']' : '[';
      return `x ∈ ${leftBracket}${root1}; ${root2}${rightBracket} (a két gyök között)`;
    }
  };

  // Interaktív villám-teszt állapot
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  return (
    <TheoryTemplate
      title="Törtes és abszolútértékes egyenlőtlenségek"
      subtitle="10. osztály • VIII. Témakör • 63. lecke: Gyakorlás: Törtes kifejezések, közös nevező, abszolútérték és egyenlőtlenség-rendszerek"
      badge="10. OSZTÁLY • VIII. EGYENLETEK ÉS EGYENLŐTLENSÉGEK • TANANYAG"
      themeColor="indigo"
      topicId="g10-eq-gyakorlas-egyenlotlensegek-theory"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80">
              <span className="text-xs font-black text-indigo-900 dark:text-indigo-200 block mb-1">
                ✓ A törtes és abszolútértékes egyenlőtlenségek 4 aranyszabálya:
              </span>
              <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300 font-medium list-none">
                <li>• <strong>Tilos ismeretlennel beszorozni:</strong> Nullára rendezünk és közös nevezőre hozunk!</li>
                <li>• <strong>Nevező kikötése szigorúan kötelező:</strong> A nevező zérushelye még megengedő (≤, ≥) relációnál is MINDIG nyílt zárójeles!</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/50 text-teal-900 dark:text-teal-200">
                <span className="font-bold text-teal-700 dark:text-teal-300 block mb-0.5">📏 Abszolútérték felbontása:</span>
                <span>|A| ≤ d ⟺ -d ≤ A ≤ d (közös sáv). |A| ≥ d ⟺ A ≤ -d VAGY A ≥ d (két külső félegyenes).</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200">
                <span className="font-bold text-amber-700 dark:text-amber-300 block mb-0.5">🔗 Rendszerek megoldása:</span>
                <span>Több feltétel egyidejű fennállásakor a rész-megoldáshalmazok METSZETÉT (I₁ ∩ I₂) képezzük.</span>
              </div>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* ==========================================
          1. SZEKCIÓ: TÖRTES EGYENLŐTLENSÉGEK
      ========================================== */}
      <TheorySection
        title="1. Törtes egyenlőtlenségek megoldásának alapstratégiája"
        subtitle="Miért tilos ismeretlennel beszorozni, és hogyan rendezünk nullára?"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard
              title="A leggyakoribb érettségi hiba: Átbeszorzás a nevezővel"
              color="rose"
            >
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-3">
                Tekintsük a következő egyszerű egyenlőtlenséget:
              </p>
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900 text-center font-mono font-bold text-rose-900 dark:text-rose-200 text-base mb-3">
                3 / (x - 2) &gt; 1
              </div>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-2">
                Sok diák reflexből megszorozza mindkét oldalt a nevezővel <span className="font-mono text-rose-600">(x - 2)</span>-vel:
              </p>
              <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono text-xs text-rose-600 dark:text-rose-400 font-bold text-center mb-3">
                3 &gt; x - 2 ⟹ x &lt; 5 &nbsp; (HIBÁS!)
              </div>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <strong>Mi a hiba?</strong> Az egyenlőtlenségek alapszabálya szerint negatív számmal szorozva a relációjel megfordul.
                Mivel <span className="font-mono">x - 2</span> előjele nem ismert (ha <span className="font-mono">x &lt; 2</span>, akkor a nevező negatív!),
                ezért <strong>tilos közvetlenül átbeszorozni</strong> az ismeretlent tartalmazó kifejezéssel!
              </p>
            </TheoryCard>

            <TheoryCard
              title="A helyes 3-lépéses módszer: Nullára rendezés és közös nevező"
              color="emerald"
            >
              <ol className="text-sm space-y-2 text-slate-700 dark:text-slate-300 list-decimal list-inside font-medium">
                <li>
                  <strong>Nullára rendezés:</strong> Minden tagot a bal oldalra viszünk át:
                  <div className="font-mono text-xs p-1.5 bg-slate-100 dark:bg-slate-800 rounded my-1 text-emerald-800 dark:text-emerald-300 font-bold">
                    3 / (x - 2) - 1 &gt; 0
                  </div>
                </li>
                <li>
                  <strong>Közös nevezőre hozás:</strong> Egyetlen tört alakjába rendezzük:
                  <div className="font-mono text-xs p-1.5 bg-slate-100 dark:bg-slate-800 rounded my-1 text-emerald-800 dark:text-emerald-300 font-bold">
                    [3 - (x - 2)] / (x - 2) &gt; 0 ⟹ (5 - x) / (x - 2) &gt; 0
                  </div>
                </li>
                <li>
                  <strong>Előjelvizsgálat:</strong> Megkeressük a számláló és a nevező zérushelyeit (itt x = 5 és x = 2), majd előjeltáblázattal megadjuk a megoldást:
                  <div className="font-mono text-xs p-1.5 bg-emerald-50 dark:bg-emerald-950/40 rounded my-1 text-emerald-900 dark:text-emerald-200 font-black">
                    Megoldáshalmaz: x ∈ ]2; 5[
                  </div>
                </li>
              </ol>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center shadow-xs">
              <DenominatorDangerTrapSvg size={260} />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
                A nevezővel való beszorzás téves tartományokat adhat, vagy elveszíthet megoldásokat.
              </p>
            </div>

            <TheoryCallout
              title="A Hányados és Szorzat kapcsolata"
              type="tip"
            >
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Két kifejezés hányadosa <MathText text="P(x) / Q(x)" /> pontosan akkor pozitív, ha a szorzatuk <MathText text="P(x) · Q(x)" /> pozitív!
                A kettő közötti egyetlen óriási különbség: <strong>a nevező zérushelye (Q(x) = 0) soha nem lehet része a megoldásnak</strong>,
                míg a szorzatnál mindkét tényező felveheti a nullát.
              </p>
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* ==========================================
          2. SZEKCIÓ: ELŐJELTÁBLÁZAT ÉS KIKÖTÉSEK
      ========================================== */}
      <TheorySection
        title="2. Előjeltáblázat készítése és a kritikus pontok kezelése"
        subtitle="Hogyan készítsünk precíz táblázatot és zárjuk ki a nevező zérushelyét?"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard
              title="A táblázatkészítés lépései"
              color="indigo"
            >
              <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li>
                  <strong>Zérushelyek sorrendbe állítása:</strong> Számítsuk ki a számláló és a nevező zérushelyeit, majd rendezzük őket növekvő sorrendbe a számegyenesen. Ezek a kritikus pontok bontják szakaszokra az értelmezési tartományt.
                </li>
                <li>
                  <strong>Tényezők előjele:</strong> Minden sávban határozzuk meg az egyes tényezők előjelét (tesztérték behelyettesítésével vagy az elsőfokú függvény meredekségéből).
                </li>
                <li>
                  <strong>Eredő előjel:</strong> Páros számú mínuszjel esetén a hányados <strong>pozitív (+)</strong>, páratlan számú mínuszjel esetén <strong>negatív (-)</strong>.
                </li>
              </ul>
            </TheoryCard>

            <TheoryTrapBox
              title="A Megengedő (≤, ≥) Relációk Legfőbb Csapdája!"
            >
              <div className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
                <p>
                  Tegyük fel, hogy a feladat: <strong className="font-mono text-rose-600">(x - 1) / (x - 4) ≥ 0</strong>.
                </p>
                <p>
                  Mivel a reláció megengedő (≥), a diákok gyakran mindkét határnál szögletes zárt zárójelet tesznek:
                  <span className="font-mono text-rose-600 font-bold block mt-1">]-∞; 1] ∪ [4; ∞[ &nbsp; ❌ HIBÁS!</span>
                </p>
                <p className="font-bold text-emerald-700 dark:text-emerald-300">
                  ✓ A helyes megoldás: <span className="font-mono">]-∞; 1] ∪ ]4; ∞[</span>!
                  Az x = 4 pontban a tört nevezője 0 lenne, ezért a 4-nél a zárójelnek <strong>kötelezően NYÍLTNAK</strong> kell lennie!
                </p>
              </div>
            </TheoryTrapBox>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center shadow-xs">
              <FractionSignChartSvg size={260} />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
                Az előjeltáblázatban a tiltott nevezőnél szaggatott/dupla vonallal jelöljük a kizárást.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ==========================================
          3. SZEKCIÓ: ABSZOLÚTÉRTÉKES EGYENLŐTLENSÉGEK
      ========================================== */}
      <TheorySection
        title="3. Abszolútértékes egyenlőtlenségek megoldása"
        subtitle="A geometriai távolság-elv és a kétoldali egyenlőtlenségek felírása"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard
              title="Az abszolútérték geometriai jelentése"
              color="blue"
            >
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-3">
                A számegyenesen <span className="font-mono font-bold">|x - u|</span> azt jelenti:
                <strong> az x pont távolsága az u ponttól</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900">
                  <span className="font-black text-blue-900 dark:text-blue-200 block mb-1">1. Eset: |A| ≤ d (Távolság legfeljebb d)</span>
                  <p className="text-slate-700 dark:text-slate-300">
                    A pont nem távolodhat el d-nél messzebbre. Ez egy <strong>egyetlen zárt/nyílt intervallum</strong> a középpont körül:
                  </p>
                  <div className="font-mono font-bold text-blue-700 dark:text-blue-300 mt-2 text-center">
                    -d ≤ A ≤ d
                  </div>
                </div>

                <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-900">
                  <span className="font-black text-purple-900 dark:text-purple-200 block mb-1">2. Eset: |A| ≥ d (Távolság legalább d)</span>
                  <p className="text-slate-700 dark:text-slate-300">
                    A pontnak legalább d távolságra kell lennie. Ez <strong>két végtelenbe nyúló szakasz uniója</strong>:
                  </p>
                  <div className="font-mono font-bold text-purple-700 dark:text-purple-300 mt-2 text-center">
                    A ≤ -d &nbsp;VAGY&nbsp; A ≥ d
                  </div>
                </div>
              </div>
            </TheoryCard>

            <TheoryCard
              title="Abszolútértékes másodfokú kifejezések: |ax² + bx + c| < d"
              color="indigo"
            >
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-2">
                Ha az abszolútérték alatt másodfokú kifejezés áll (pl. <span className="font-mono">|x² - 4| &lt; 5</span>), a definíció alapján két egyenlőtlenséget kell egyidejűleg megoldani:
              </p>
              <div className="font-mono text-xs p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-indigo-900 dark:text-indigo-200 font-bold text-center">
                -5 &lt; x² - 4 &lt; 5 ⟺ &#123; x² - 4 &gt; -5 ÉS x² - 4 &lt; 5 &#125;
              </div>
              <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300 mt-2 list-disc list-inside">
                <li>1. feltétel: x² &gt; -1 ⟹ Minden valós x-re igaz (ℝ).</li>
                <li>2. feltétel: x² &lt; 9 ⟹ x ∈ ]-3; 3[.</li>
                <li><strong>Közös metszet:</strong> ℝ ∩ ]-3; 3[ = ]-3; 3[.</li>
              </ul>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center shadow-xs">
              <AbsoluteValueInequalityBandSvg size={260} />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
                |x - 3| ≤ 2: A 3-as számtól jobbra és balra mérünk 2 egység sugarú sávot: [1; 5].
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center shadow-xs">
              <AbsoluteQuadraticParabolaSvg size={260} />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
                Az y = |x² - 4| függvény negatív hurka felhajlik az x-tengely fölé.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ==========================================
          4. SZEKCIÓ: EGYENLŐTLENSÉG-RENDSZEREK
      ========================================== */}
      <TheorySection
        title="4. Egyenlőtlenség-rendszerek megoldása és számegyeneses metszetképzés"
        subtitle="Hogyan keresünk közös megoldást több egyenlőtlenség egyidejű fennállásakor?"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard
              title="A rendszermegoldás aranyszabálya: A METSZET (ÉS kapcsolat)"
              color="teal"
            >
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-3">
                Egyenlőtlenség-rendszerről akkor beszélünk, ha több egyenlőtlenségnek <strong>egyszerre</strong> kell teljesülnie:
              </p>
              <div className="font-mono text-xs p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-900 text-teal-950 dark:text-teal-200 mb-3 space-y-1">
                <div>(1) x² ≥ 4</div>
                <div>(2) x &lt; 5</div>
              </div>
              <ol className="text-sm space-y-2 text-slate-700 dark:text-slate-300 list-decimal list-inside font-medium">
                <li>
                  <strong>1. lépés:</strong> Megoldjuk az (1) egyenlőtlenséget külön:
                  <span className="font-mono text-xs block pl-4 text-blue-600 dark:text-blue-400">
                    I₁ = ]-∞; -2] ∪ [2; ∞[
                  </span>
                </li>
                <li>
                  <strong>2. lépés:</strong> Megoldjuk a (2) egyenlőtlenséget külön:
                  <span className="font-mono text-xs block pl-4 text-amber-600 dark:text-amber-400">
                    I₂ = ]-∞; 5[
                  </span>
                </li>
                <li>
                  <strong>3. lépés:</strong> Ábrázoljuk a részeredményeket közös számegyenesen, és vesszük a kettő <strong>metszetét (I₁ ∩ I₂)</strong>:
                  <span className="font-mono text-xs block pl-4 text-emerald-600 dark:text-emerald-400 font-black">
                    M = I₁ ∩ I₂ = ]-∞; -2] ∪ [2; 5[
                  </span>
                </li>
              </ol>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center shadow-xs">
              <ComplexIntervalIntersectionSvg size={260} />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
                Közös számegyenesen a két sáv átfedése adja a végső megoldáshalmazt.
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
        subtitle="Gyakori, lépésről lépésre levezetett típusfeladatok részletes magyarázattal"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Mintapélda */}
          <TheoryCard
            title="1. Mintapélda: Törtes egyenlőtlenség konstans jobb oldallal"
            color="indigo"
          >
            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <p className="font-bold text-slate-900 dark:text-white">
                Feladat: Oldd meg a valós számok halmazán a <span className="font-mono">(2x - 3) / (x + 1) ≤ 1</span> egyenlőtlenséget!
              </p>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl space-y-2 text-xs">
                <div>
                  <strong className="text-indigo-600 dark:text-indigo-400">1. Lépés: Nullára rendezés:</strong>
                  <div className="font-mono mt-0.5">(2x - 3) / (x + 1) - 1 ≤ 0</div>
                </div>
                <div>
                  <strong className="text-indigo-600 dark:text-indigo-400">2. Lépés: Közös nevező:</strong>
                  <div className="font-mono mt-0.5">[(2x - 3) - (x + 1)] / (x + 1) ≤ 0 ⟹ (x - 4) / (x + 1) ≤ 0</div>
                </div>
                <div>
                  <strong className="text-indigo-600 dark:text-indigo-400">3. Lépés: Zérushelyek és kikötés:</strong>
                  <p>Számláló: x = 4 (beletartozhat, mert ≤ 0).</p>
                  <p>Nevező: x = -1 (KIKÖTÉS: x ≠ -1, itt nyílt a zárójel!).</p>
                </div>
                <div>
                  <strong className="text-indigo-600 dark:text-indigo-400">4. Lépés: Megoldás leolvasása:</strong>
                  <p>A két zérushely között negatív a tört: <strong>x ∈ ]-1; 4]</strong>.</p>
                </div>
              </div>
            </div>
          </TheoryCard>

          {/* 2. Mintapélda */}
          <TheoryCard
            title="2. Mintapélda: Abszolútértékes másodfokú egyenlőtlenség"
            color="purple"
          >
            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <p className="font-bold text-slate-900 dark:text-white">
                Feladat: Oldd meg a valós számok halmazán az <span className="font-mono">|x² - 5x| &lt; 6</span> egyenlőtlenséget!
              </p>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl space-y-2 text-xs">
                <div>
                  <strong className="text-purple-600 dark:text-purple-400">1. Lépés: Kétirányú egyenlőtlenség:</strong>
                  <div className="font-mono mt-0.5">-6 &lt; x² - 5x &lt; 6</div>
                </div>
                <div>
                  <strong className="text-purple-600 dark:text-purple-400">2. Lépés: Bal oldali ág (x² - 5x &gt; -6):</strong>
                  <div className="font-mono mt-0.5">x² - 5x + 6 &gt; 0 ⟹ (x - 2)(x - 3) &gt; 0 ⟹ x ∈ ]-∞; 2[ ∪ ]3; ∞[</div>
                </div>
                <div>
                  <strong className="text-purple-600 dark:text-purple-400">3. Lépés: Jobb oldali ág (x² - 5x &lt; 6):</strong>
                  <div className="font-mono mt-0.5">x² - 5x - 6 &lt; 0 ⟹ (x - 6)(x + 1) &lt; 0 ⟹ x ∈ ]-1; 6[</div>
                </div>
                <div>
                  <strong className="text-purple-600 dark:text-purple-400">4. Lépés: A két ág metszete:</strong>
                  <p>M = (]-∞; 2[ ∪ ]3; ∞[) ∩ ]-1; 6[ = <strong>]-1; 2[ ∪ ]3; 6[</strong>.</p>
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ==========================================
          6. SZEKCIÓ: INTERAKTÍV GYAKORLÓ LABORATÓRIUM
      ========================================== */}
      <TheorySection
        title="6. Interaktív Törtes és Abszolútérték Laboratórium"
        subtitle="Kísérletezz a paraméterekkel, figyeld meg a zérushelyeket és teszteld tudásodat!"
      >
        <div className="p-6 bg-slate-100/80 dark:bg-slate-900/80 rounded-3xl border border-slate-300 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Dinamikus Törtes Egyenlőtlenség Szimulátor
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Állítsd be a számláló (a) és a nevező (b) zérushelyeit, valamint a relációjelet!
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setParamA(2);
                setParamB(-3);
                setFractionRel('gt');
              }}
              className="text-xs gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Alaphelyzet
            </Button>
          </div>

          {/* Vezérlők */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Számláló zérushelye (a):</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">x = {paramA}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={paramA}
                onChange={(e) => setParamA(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <span className="text-[10px] text-slate-500 block">Számláló: (x - {paramA})</span>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Nevező zérushelye (b):</span>
                <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">x = {paramB} (KIKÖTÉS!)</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={paramB}
                onChange={(e) => setParamB(Number(e.target.value))}
                className="w-full accent-rose-600"
              />
              <span className="text-[10px] text-slate-500 block">Nevező: (x - {paramB}) ≠ 0</span>
            </div>
          </div>

          {/* Relációs gombok */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Reláció:</span>
            {(['gt', 'gte', 'lt', 'lte'] as const).map((rel) => {
              const label = rel === 'gt' ? '> 0' : rel === 'gte' ? '≥ 0' : rel === 'lt' ? '< 0' : '≤ 0';
              return (
                <button
                  key={rel}
                  onClick={() => setFractionRel(rel)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                    fractionRel === rel
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Eredmény kártya */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border-2 border-indigo-300 dark:border-indigo-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
              <div>
                <span className="text-xs font-bold uppercase text-slate-500">Vizsgált egyenlőtlenség:</span>
                <div className="text-xl font-black font-mono text-indigo-700 dark:text-indigo-300">
                  (x - {paramA}) / (x - {paramB}) {fractionRel === 'gt' ? '> 0' : fractionRel === 'gte' ? '≥ 0' : fractionRel === 'lt' ? '< 0' : '≤ 0'}
                </div>
              </div>
              <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 font-bold">
                Kikötés: x ≠ {paramB}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 block mb-0.5">
                Kalkulált valós megoldáshalmaz:
              </span>
              <div className="text-lg font-black font-mono text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-900/50">
                {getFractionSolution()}
              </div>
            </div>
          </div>

          {/* Villám Parabola-Döntő Kvíz */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                ⚡ Villám Törtes Ellenőrző Kérdés
              </h4>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              Miért nem lehet az <strong className="font-mono text-slate-900 dark:text-white">(x + 2) / (x - 3) ≤ 0</strong> egyenlőtlenség megoldása <span className="font-mono">[-2; 3]</span>?
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
                <strong>A)</strong> Mert a számláló nem lehet nulla (x ≠ -2).
              </button>
              <button
                onClick={() => setQuizAnswer('B')}
                className={`p-3 rounded-xl text-left transition-all border ${
                  quizAnswer === 'B'
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <strong>B)</strong> Mert az x = 3 esetén a nevező 0 lenne, így 3-nál kötelezően nyílt a zárójel: [-2; 3[!
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
                      <strong>Tökéletes válasz!</strong> A számláló zérushelye (x = -2) megengedett, mert 0 / (-5) = 0 ≤ 0 teljesül.
                      A nevezőben viszont x = 3 esetén nullával való osztás keletkezne, ami matematikai képtelenség! Ezért a 3-nál mindig nyílt a zárójel.
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Nem egészen!</strong> A számláló felveheti a 0-t megengedő (≤) reláció esetén, mert 0 értéket ad.
                      A nevező viszont SOHA nem lehet nulla, ezért az x = 3-at ki kell zárni (nyílt zárójellel).
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tananyag végi cselekvésre ösztönzés */}
        <div className="mt-8 p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl text-white text-center space-y-3 shadow-lg">
          <h3 className="text-lg font-black tracking-tight">
            Készen állsz a törtes és abszolútértékes feladványokra?
          </h3>
          <p className="text-xs text-indigo-100 max-w-lg mx-auto">
            Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben, a párosító és rendszerező játékokban!
          </p>
          <div className="pt-2">
            <Button
              onClick={onStartQuiz}
              size="lg"
              className="bg-white text-indigo-700 hover:bg-indigo-50 font-black shadow-md hover:shadow-lg transition-all rounded-xl"
            >
              Kvíz és Gyakorló Feladatok Indítása <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

