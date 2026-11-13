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
  ParabolaCasesDgt0Svg,
  ParabolaCasesDeq0Svg,
  ParabolaCasesDlt0Svg,
  SignTableChartSvg,
  InequalityIntervalNumberLineSvg
} from './QuadraticInequalitiesFigures';
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
  LineChart,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuadraticInequalitiesTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const QuadraticInequalitiesTheory: React.FC<QuadraticInequalitiesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interaktív Szimulátor Állapot (ax² + bx + c) ---
  const [paramA, setParamA] = useState<number>(1);
  const [paramB, setParamB] = useState<number>(-4);
  const [paramC, setParamC] = useState<number>(3);
  const [selectedRel, setSelectedRel] = useState<'gt' | 'gte' | 'lt' | 'lte'>('lt');

  // Számítások
  const safeA = paramA === 0 ? 1 : paramA;
  const discriminant = paramB * paramB - 4 * safeA * paramC;
  const sqrtD = discriminant >= 0 ? Math.sqrt(discriminant) : NaN;
  const rawRoot1 = discriminant >= 0 ? (-paramB - sqrtD) / (2 * safeA) : NaN;
  const rawRoot2 = discriminant >= 0 ? (-paramB + sqrtD) / (2 * safeA) : NaN;
  const r1 = Math.min(rawRoot1, rawRoot2);
  const r2 = Math.max(rawRoot1, rawRoot2);

  // Megoldáshalmaz szövege a kiválasztott relációra
  let solutionText = '';
  if (discriminant > 0) {
    const isUp = safeA > 0;
    if (selectedRel === 'gt') {
      solutionText = isUp
        ? `x ∈ ]-∞; ${r1.toFixed(1)}[ ∪ ]${r2.toFixed(1)}; ∞[`
        : `x ∈ ]${r1.toFixed(1)}; ${r2.toFixed(1)}[`;
    } else if (selectedRel === 'gte') {
      solutionText = isUp
        ? `x ∈ ]-∞; ${r1.toFixed(1)}] ∪ [${r2.toFixed(1)}; ∞[`
        : `x ∈ [${r1.toFixed(1)}; ${r2.toFixed(1)}]`;
    } else if (selectedRel === 'lt') {
      solutionText = isUp
        ? `x ∈ ]${r1.toFixed(1)}; ${r2.toFixed(1)}[`
        : `x ∈ ]-∞; ${r1.toFixed(1)}[ ∪ ]${r2.toFixed(1)}; ∞[`;
    } else {
      solutionText = isUp
        ? `x ∈ [${r1.toFixed(1)}; ${r2.toFixed(1)}]`
        : `x ∈ ]-∞; ${r1.toFixed(1)}] ∪ [${r2.toFixed(1)}; ∞[`;
    }
  } else if (discriminant === 0) {
    const isUp = safeA > 0;
    const r0 = (-paramB / (2 * safeA)).toFixed(1);
    if (selectedRel === 'gt') solutionText = isUp ? `x ∈ ℝ \\ {${r0}}` : `M = ∅ (Üres halmaz)`;
    else if (selectedRel === 'gte') solutionText = isUp ? `x ∈ ℝ (Minden valós szám)` : `x = ${r0}`;
    else if (selectedRel === 'lt') solutionText = isUp ? `M = ∅ (Üres halmaz)` : `x ∈ ℝ \\ {${r0}}`;
    else solutionText = isUp ? `x = ${r0}` : `x ∈ ℝ (Minden valós szám)`;
  } else {
    // D < 0
    const isUp = safeA > 0;
    if (selectedRel === 'gt' || selectedRel === 'gte') {
      solutionText = isUp ? 'x ∈ ℝ (Minden valós szám)' : 'M = ∅ (Üres halmaz)';
    } else {
      solutionText = isUp ? 'M = ∅ (Üres halmaz)' : 'x ∈ ℝ (Minden valós szám)';
    }
  }

  // Interaktív Kvízkérdés állapot
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [showQuizResult, setShowQuizResult] = useState<boolean>(false);

  return (
    <TheoryTemplate
      title="Másodfokú egyenlőtlenségek megoldása"
      subtitle="10. osztály • VIII. Témakör • 62. lecke: Grafikus megoldás (parabola zérushelyei és állása), előjeltáblázat és intervallumok"
      badge="10. OSZTÁLY • VIII. EGYENLETEK ÉS EGYENLŐTLENSÉGEK • TANANYAG"
      themeColor="blue"
      topicId="g10-eq-masodfoku-egyenlotlensegek-theory"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80">
              <span className="text-xs font-black text-blue-900 dark:text-blue-200 block mb-1">
                ✓ A grafikus (parabola) módszer alapszabálya (a &gt; 0 esetén):
              </span>
              <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300 font-medium list-none">
                <li>• <strong>Mindig 0-ra rendezünk:</strong> ax² + bx + c ≶ 0 alakra hozunk mindent!</li>
                <li>• <strong>Két zérushelynél (D &gt; 0):</strong> &gt; 0 a két gyökön KÍVÜL, &lt; 0 a két gyök KÖZÖTT.</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/50 text-teal-900 dark:text-teal-200">
                <span className="font-bold text-teal-700 dark:text-teal-300 block mb-0.5">📈 Parabola állása:</span>
                <span>a &gt; 0: felfelé nyíló (∪). a &lt; 0: lefelé nyíló (∩) vagy szorozzuk be -1-gyel és fordítsuk meg a jelet!</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200">
                <span className="font-bold text-amber-700 dark:text-amber-300 block mb-0.5">⚠ Különleges esetek:</span>
                <span>D = 0: érinti a tengelyt (ℝ \ &#123;x₀&#125; vagy 1 pont). D &lt; 0: lebeg (megoldás: ℝ vagy ∅).</span>
              </div>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* ==========================================
          1. SZEKCIÓ: A MÁSODFOKÚ EGYENLŐTLENSÉG FOGALMA
      ========================================== */}
      <TheorySection
        title="1. A másodfokú egyenlőtlenség fogalma és az alapvető csapdák"
        subtitle="Miért tilos közvetlenül négyzetgyököt vonni mindkét oldalból?"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard title="Definíció és standard alak">
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-3">
                <strong>Másodfokú egyenlőtlenségnek</strong> nevezzük az olyan egyenlőtlenségeket, amelyek ekvivalens átalakításokkal
                az alábbi négy alapalak valamelyikére hozhatók:
              </p>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-xs sm:text-sm font-mono text-blue-950 dark:text-blue-200 space-y-1">
                <div>ax² + bx + c &gt; 0 &nbsp;|&nbsp; ax² + bx + c ≥ 0</div>
                <div>ax² + bx + c &lt; 0 &nbsp;|&nbsp; ax² + bx + c ≤ 0 &nbsp;&nbsp;(ahol a ≠ 0, a, b, c ∈ ℝ)</div>
              </div>

              <TheoryCallout type="warning" title="A legveszélyesebb érettségi tévhit: x² > 9">
                Gyakori hiba, hogy az x² &gt; 9 egyenlőtlenségből a diákok azt a következtetést vonják le, hogy x &gt; 3.
                <div className="mt-1 font-normal text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Ez súlyos tévedés, mert például az x = -5 esetén is (-5)² = 25 &gt; 9!
                  A helyes megoldás: <strong>x &gt; 3 VAGY x &lt; -3</strong>, azaz x ∈ ]-∞; -3[ ∪ ]3; ∞[!
                </div>
              </TheoryCallout>

              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2">
                <p>
                  <strong>Szigorú (&gt;, &lt;) és Megengedő (≥, ≤) egyenlőtlenségek:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Szigorú (&gt; vagy &lt;):</strong> A határérték zérushelyek nem tartoznak a megoldáshalmazhoz (nyílt karika ○, fordított zárójel: ]x₁; x₂[).</li>
                  <li><strong>Megengedő (≥ vagy ≤):</strong> Ahol a kifejezés 0 lehet, a határértékek beletartoznak a megoldáshalmazba (teli karika ●, szögletes zárójel: [x₁; x₂]).</li>
                </ul>
              </div>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <TheoryCard title="Intervallumok és számegyenes" variant="highlight">
              <div className="w-full flex justify-center p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-800/60 shadow-xs mb-3">
                <InequalityIntervalNumberLineSvg size={250} />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A fenti számegyeneseken látható a különbség: szigorú relációnál (x² - 4 &lt; 0) a -2 és 2 kizárva,
                míg megengedő relációnál (x² - 4 ≤ 0) a végpontok is a megoldás részei.
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* ==========================================
          2. SZEKCIÓ: A GRAFIKUS PARABOLA-MÓDSZER
      ========================================== */}
      <TheorySection
        title="2. A grafikus megoldás algoritmusa (A Parabola-módszer)"
        subtitle="Hogyan olvasható le azonnal a megoldáshalmaz egy gyors vázlatrajzból?"
      >
        <TheoryCard title="A 4-lépéses biztos grafikus stratégia" variant="highlight">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                A másodfokú kifejezés grafikonja egy parabola (f(x) = ax² + bx + c).
                Az egyenlőtlenség megoldása geometriailag azt jelenti: az x mely értékeire fekszik a parabola az x-tengely felett (&gt; 0) vagy alatt (&lt; 0).
              </p>
              <ol className="text-xs sm:text-sm space-y-2 text-slate-700 dark:text-slate-300 list-decimal list-inside font-medium">
                <li>
                  <strong>Nullára rendezés:</strong> Minden tagot egy oldalra hozunk: ax² + bx + c ≶ 0.
                </li>
                <li>
                  <strong>Zérushelyek keresése:</strong> Megoldjuk az ax² + bx + c = 0 egyenletet (megoldóképlettel vagy kiemeléssel).
                </li>
                <li>
                  <strong>Parabola állásának megállapítása:</strong>
                  <br />
                  • Ha a &gt; 0: a parabola <strong>felfelé nyílik</strong> (∪).
                  <br />
                  • Ha a &lt; 0: a parabola <strong>lefelé nyílik</strong> (∩) (vagy szorozzunk be -1-gyel és fordítsuk meg a relációt!).
                </li>
                <li>
                  <strong>Vázlatkészítés és leolvasás:</strong> Berajzoljuk az x-tengelyt és a parabolát, majd leolvassuk a keresett intervallumot.
                </li>
              </ol>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <ParabolaCasesDgt0Svg size={260} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ==========================================
          3. SZEKCIÓ: A DISZKRIMINÁNS 3 ESETE
      ========================================== */}
      <TheorySection
        title="3. A diszkrimináns 3 esete: D > 0, D = 0, D < 0"
        subtitle="A zérushelyek száma határozza meg a megoldáshalmaz szerkezetét"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* D = 0 eset */}
          <TheoryCard title="D = 0: A parabola érinti a tengelyt (x₀ kettős gyök)">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2.5 leading-relaxed">
              Ha a diszkrimináns 0, a másodfokú polinom teljes négyzetté alakítható: a(x - x₀)².
              A parabola csúcspontja pontosan az x-tengelyre esik, így sosem lépi át azt!
            </p>
            <div className="w-full flex justify-center my-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-blue-200 dark:border-blue-900/40">
              <ParabolaCasesDeq0Svg size={240} />
            </div>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800">
                • <strong>(x - 3)² ≥ 0:</strong> Minden valós x-re igaz (M = ℝ).
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800">
                • <strong>(x - 3)² &gt; 0:</strong> Minden valós szám, kivéve az x = 3-at (M = ℝ \ &#123;3&#125;).
              </div>
              <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800">
                • <strong>(x - 3)² ≤ 0:</strong> Egyetlen megoldás: x = 3 (ahol éppen 0).
              </div>
              <div className="p-2 bg-rose-50 dark:bg-rose-950/40 rounded-lg border border-rose-200 dark:border-rose-800">
                • <strong>(x - 3)² &lt; 0:</strong> Lehetetlen! Nincs megoldás (M = ∅).
              </div>
            </div>
          </TheoryCard>

          {/* D < 0 eset */}
          <TheoryCard title="D < 0: A parabola a tengely felett vagy alatt lebeg">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2.5 leading-relaxed">
              Ha a diszkrimináns negatív, az ax² + bx + c = 0 egyenletnek nincs valós gyöke.
              Ez azt jelenti, hogy a grafikon <strong>nem metszi és nem érinti az x-tengelyt</strong>:
            </p>
            <div className="w-full flex justify-center my-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-blue-200 dark:border-blue-900/40">
              <ParabolaCasesDlt0Svg size={240} />
            </div>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800">
                • Ha a &gt; 0, a parabola a tengely <strong>felett lebeg</strong>, értéke mindenütt pozitív:
                <br />
                x² + 2x + 5 &gt; 0 ⟹ M = ℝ &nbsp;|&nbsp; x² + 2x + 5 &lt; 0 ⟹ M = ∅.
              </div>
              <div className="p-2 bg-rose-50 dark:bg-rose-950/40 rounded-lg border border-rose-200 dark:border-rose-800">
                • Ha a &lt; 0, a parabola a tengely <strong>alatt lebeg</strong>, értéke mindenütt negatív:
                <br />
                -x² + x - 3 &lt; 0 ⟹ M = ℝ &nbsp;|&nbsp; -x² + x - 3 &gt; 0 ⟹ M = ∅.
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ==========================================
          4. SZEKCIÓ: ELŐJELTÁBLÁZAT ÉS TÖRTES EGYENLŐTLENSÉGEK
      ========================================== */}
      <TheorySection
        title="4. Algebrai módszer: Gyöktényezős alak és előjeltáblázat"
        subtitle="Hogyan határozható meg a szorzat és a hányados előjele algebrai úton?"
      >
        <TheoryCard title="Szorzattá alakítás és előjeltáblázat">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Ha az ax² + bx + c kifejezésnek két zérushelye van (x₁ és x₂), gyöktényezős alakba írható: a(x - x₁)(x - x₂).
                Egy szorzat akkor pozitív, ha a tényezők azonos előjelűek (+ · + vagy - · -), és akkor negatív, ha ellentétes előjelűek.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
                <div className="font-bold text-slate-900 dark:text-white">Kapcsolat a törtes egyenlőtlenségekkel:</div>
                <div>
                  Egy hányados előjele pontosan megegyezik a szorzat előjelével!
                  <div className="font-mono font-bold text-blue-700 dark:text-blue-300 mt-1">
                    (x - 1) / (x - 4) &gt; 0 ⟺ (x - 1)(x - 4) &gt; 0 &nbsp;&nbsp;(x ≠ 4 kikötéssel)
                  </div>
                </div>
              </div>
              <TheoryTrapBox title="Miért tilos beszorozni az ismeretlent tartalmazó nevezővel?">
                Ha az egyenlőtlenséget beszorzod (x - 4)-gyel, nem tudod, hogy a relációs jel megfordul-e,
                hiszen az (x - 4) kifejezés x &lt; 4 esetén negatív! Ehelyett mindig közös nevezőre hozunk és előjeltáblázatot készítünk.
              </TheoryTrapBox>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <SignTableChartSvg size={260} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ==========================================
          5. SZEKCIÓ: KIDOLGOZOTT MINTAFELADATOK
      ========================================== */}
      <TheorySection
        title="5. Kidolgozott érettségi mintafeladatok"
        subtitle="Tipikus feladattípusok részletes lépésről lépésre történő levezetéssel"
      >
        <div className="space-y-4">
          {/* 1. Minta */}
          <TheoryCard title="1. Mintapélda: Standard másodfokú egyenlőtlenség (D > 0)" variant="example">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="font-bold text-slate-900 dark:text-white">
                Feladat: Oldd meg a valós számok halmazán az x² - 4x - 5 ≤ 0 egyenlőtlenséget!
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div>
                  <strong>1. Lépés: Zérushelyek megkeresése</strong>
                  <br />
                  x² - 4x - 5 = 0 ⟹ (x - 5)(x + 1) = 0 ⟹ x₁ = -1 és x₂ = 5.
                </div>

                <div>
                  <strong>2. Lépés: Parabola állásának vizsgálata</strong>
                  <br />
                  A főegyüttható a = 1 &gt; 0, ezért a parabola <strong>felfelé nyílik</strong> (∪).
                </div>

                <div>
                  <strong>3. Lépés: A reláció és az intervallum meghatározása</strong>
                  <br />
                  A feladat a ≤ 0 részt kérdezi (hol fekszik a parabola a tengely alatt vagy rajta).
                  Felfelé nyíló parabolánál a tengely alatti rész a <strong>két zérushely KÖZÖTT</strong> van!
                  Mivel megengedő relációról van szó (≤), a végpontok is beletartoznak.
                </div>

                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-800 dark:text-emerald-300 font-bold">
                  Megoldáshalmaz: M = [-1; 5].
                </div>
              </div>
            </div>
          </TheoryCard>

          {/* 2. Minta */}
          <TheoryCard title="2. Mintapélda: Negatív főegyüttható (-a)" variant="example">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="font-bold text-slate-900 dark:text-white">
                Feladat: Oldd meg a valós számok halmazán a -2x² + 7x - 3 &gt; 0 egyenlőtlenséget!
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div>
                  <strong>1. Megoldási módszer: Szorzás (-1)-gyel (reláció megfordításával)</strong>
                  <br />
                  Szorozzuk be mindkét oldalt (-1)-gyel, és fordítsuk meg a relációt:
                  <br />
                  2x² - 7x + 3 &lt; 0.
                </div>

                <div>
                  <strong>2. Lépés: Zérushelyek</strong>
                  <br />
                  D = (-7)² - 4 · 2 · 3 = 49 - 24 = 25.
                  <br />
                  x₁,₂ = (7 ± 5) / 4 ⟹ x₁ = 0,5 és x₂ = 3.
                </div>

                <div>
                  <strong>3. Lépés: Megoldás leolvasása</strong>
                  <br />
                  A 2x² - 7x + 3 &lt; 0 kifejezés felfelé nyíló parabola, és a &lt; 0 részt keressük, ami a két zérushely között van!
                </div>

                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-800 dark:text-emerald-300 font-bold">
                  Megoldáshalmaz: M = ]0,5; 3[.
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ==========================================
          6. SZEKCIÓ: INTERAKTÍV LABORATÓRIUM (A TANANYAG VÉGÉN!)
      ========================================== */}
      <TheorySection
        title="6. Interaktív Parabola és Egyenlőtlenség Laboratórium"
        subtitle="Kísérletezz a paraméterekkel, figyeld a diszkriminánst és a megoldáshalmaz dinamikus változását!"
      >
        <div className="space-y-6">
          <TheoryCard title="📈 Parabola Egyenlőtlenség Szimulátor" variant="highlight">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
              Állítsd be az ax² + bx + c együtthatóit és válaszd ki a vizsgálni kívánt relációs jelet:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>a együttható:</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">{paramA}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="1"
                  value={paramA}
                  onChange={(e) => setParamA(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <span className="text-[10px] text-slate-500">{paramA > 0 ? '∪ Felfelé nyíló' : paramA < 0 ? '∩ Lefelé nyíló' : 'a ≠ 0 kell'}</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>b együttható:</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">{paramB}</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  step="1"
                  value={paramB}
                  onChange={(e) => setParamB(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>c konstans:</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">{paramC}</span>
                </div>
                <input
                  type="range"
                  min="-8"
                  max="8"
                  step="1"
                  value={paramC}
                  onChange={(e) => setParamC(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            {/* Relációs jel választó gombok */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Reláció:</span>
              {(['gt', 'gte', 'lt', 'lte'] as const).map((rel) => {
                const label = rel === 'gt' ? '> 0' : rel === 'gte' ? '≥ 0' : rel === 'lt' ? '< 0' : '≤ 0';
                return (
                  <button
                    key={rel}
                    onClick={() => setSelectedRel(rel)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                      selectedRel === rel
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Eredmény doboz */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-blue-300 dark:border-blue-800 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                <div>
                  <span className="text-xs font-bold uppercase text-slate-500">Egyenlőtlenség:</span>
                  <div className="text-xl font-black font-mono text-slate-900 dark:text-white">
                    {safeA}x² {paramB >= 0 ? `+ ${paramB}x` : `- ${Math.abs(paramB)}x`} {paramC >= 0 ? `+ ${paramC}` : `- ${Math.abs(paramC)}`} {selectedRel === 'gt' ? '> 0' : selectedRel === 'gte' ? '≥ 0' : selectedRel === 'lt' ? '< 0' : '≤ 0'}
                  </div>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 font-mono">
                    D = {discriminant} ({discriminant > 0 ? '2 gyök' : discriminant === 0 ? '1 kettős gyök' : 'nincs valós gyök'})
                  </span>
                  {discriminant >= 0 && (
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-mono font-bold">
                      x₁ = {r1.toFixed(1)}, x₂ = {r2.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 block mb-0.5">
                  Megoldáshalmaz:
                </span>
                <div className="text-lg sm:text-xl font-black font-mono text-emerald-700 dark:text-emerald-300">
                  {solutionText}
                </div>
              </div>
            </div>
          </TheoryCard>

          {/* Villámkvíz */}
          <TheoryCard title="⚡ Villám Parabola-Döntő Kvíz">
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                Adott a következő egyenlőtlenség: <strong className="font-mono text-slate-900 dark:text-white">x² - 9 &gt; 0</strong>.
              </p>
              <div className="font-bold text-slate-900 dark:text-white">
                Melyik a helyes valós megoldáshalmaz?
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuizAnswer('wrong');
                    setShowQuizResult(true);
                  }}
                  className={`h-auto py-2.5 px-3 text-left justify-start text-xs font-bold border-slate-300 dark:border-slate-700 ${
                    showQuizResult && quizAnswer === 'wrong'
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800'
                      : ''
                  }`}
                >
                  A) x &gt; 3 (mert négyzetgyököt vonunk mindkét oldalból)
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setQuizAnswer('correct');
                    setShowQuizResult(true);
                  }}
                  className={`h-auto py-2.5 px-3 text-left justify-start text-xs font-bold border-slate-300 dark:border-slate-700 ${
                    showQuizResult && quizAnswer === 'correct'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800'
                      : ''
                  }`}
                >
                  B) x ∈ ]-∞; -3[ ∪ ]3; ∞[ (a két zérushelyen KÍVÜL)
                </Button>
              </div>

              {showQuizResult && (
                <div
                  className={`p-3 rounded-xl border text-xs font-medium animate-in fade-in ${
                    quizAnswer === 'correct'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-900 dark:text-rose-200'
                  }`}
                >
                  {quizAnswer === 'correct' ? (
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Tökéletes válasz!</strong> A zérushelyek -3 és 3. Mivel a = 1 &gt; 0, a parabola felfelé nyílik,
                        így a &gt; 0 rész a két zérushelyen kívül esik: x &lt; -3 vagy x &gt; 3.
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Nem jó!</strong> Ez a leggyakoribb csapda: a négyzetre emelés elfelejti a negatív számokat!
                        Pl. x = -5 esetén (-5)² = 25 &gt; 9, ami igaz állítás. Ezért a -3-nál kisebb számok is beletartoznak a megoldásba!
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
