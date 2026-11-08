import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  MathText
} from '../TheoryTemplate';
import {
  Zap,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Calculator,
  Compass,
  Layers,
  Sparkles,
  ArrowRight,
  Scale
} from 'lucide-react';
import {
  AlgebraicFractionSimplificationSvg,
  PrimeFactorizationPowersSvg,
  PowersComparisonSvg,
  FactoringPowersSvg
} from './PowersPracticeFigures';

interface PowersPracticeTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PowersPracticeTheory: React.FC<PowersPracticeTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív laboratórium állapot: Összehasonlító és kiemelő szimulátor
  const [labTab, setLabTab] = useState<'compare' | 'factoring'>('compare');

  // Compare state
  const [compBaseA, setCompBaseA] = useState<number>(2);
  const [compExpA, setCompExpA] = useState<number>(60);
  const [compBaseB, setCompBaseB] = useState<number>(3);
  const [compExpB, setCompExpB] = useState<number>(40);

  // Factoring state
  const [factorBase, setFactorBase] = useState<number>(3);
  const [factorShift, setFactorShift] = useState<number>(2);

  // GCD calculation helper
  const gcd = (x: number, y: number): number => {
    let a = Math.abs(x);
    let b = Math.abs(y);
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  };

  const commonGcd = gcd(compExpA, compExpB);
  const redExpA = commonGcd > 1 ? compExpA / commonGcd : compExpA;
  const redExpB = commonGcd > 1 ? compExpB / commonGcd : compExpB;
  const redValA = Math.pow(compBaseA, redExpA);
  const redValB = Math.pow(compBaseB, redExpB);

  // Factoring calculations
  const factorBracketVal = Math.pow(factorBase, factorShift) - 1;

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • III. HATVÁNYOZÁS ÉS A NÉGYZETGYÖK"
      title="3. Hatványozás gyakorlása"
      subtitle="Összetett egész kitevőjű kifejezések, prímhatványokra bontás, algebrai törtek egyszerűsítése és hatványok összehasonlítása"
      themeColor="purple"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-purple-600 dark:text-purple-400 font-black">Prímbontás:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>12ⁿ = (2² · 3)ⁿ = 2²ⁿ · 3ⁿ</MathText></span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-indigo-600 dark:text-indigo-400 font-black">Törtek egyszerűsítése:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>a⁻ᵏ / b⁻ᵐ = bᵐ / aᵏ</MathText> &nbsp;(a, b ≠ 0)</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-rose-600 dark:text-rose-400 font-black">Összegnél kiemelés:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>2¹⁰ + 2¹⁰ = 2 · 2¹⁰ = 2¹¹</MathText> &nbsp;|&nbsp; <MathText>aⁿ⁺ᵏ - aⁿ = aⁿ(aᵏ - 1)</MathText></span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
    >
      {/* 1. SZEKCIÓ: ÖSSZETETT ALGEBRAI TÖRTEK */}
      <TheorySection
        number={1}
        title="Összetett algebrai törtek és negatív kitevők egyszerűsítése"
        icon={<Layers className="w-5 h-5 text-purple-500" />}
        badge="STRATÉGIA"
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              A magasabb szintű algebrai feladatokban gyakran találkozunk olyan törtekkel, amelyekben
              egyszerre több betűs változó szerepel, negatív és pozitív egész kitevőkkel, sőt a tört maga
              is külső hatványra van emelve. Az ilyen kifejezések egyszerűsítése szigorú algoritmus szerint zajlik:
            </p>

            <TheoryCard
              title="A törtek egyszerűsítésének 3 arany lépése"
              icon={<BookOpen className="w-4 h-4 text-purple-500" />}
            >
              <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li>
                  <strong>1. Külső kitevő szétbontása:</strong> Bontsd fel a zárójelet a szorzat és hányados
                  hatványozásának szabályával: <MathText>((X · Y) / Z)ⁿ = (Xⁿ · Yⁿ) / Zⁿ</MathText>. A kitevőket szorozd össze:
                  <MathText>(aᵖ)ⁿ = aᵖ·ⁿ</MathText>.
                </li>
                <li>
                  <strong>2. Negatív kitevők reciprok átrendezése:</strong> Minden olyan tényező, amelynek negatív
                  a kitevője, átkerül a törtvonal túloldalára ellentétes (pozitív) kitevővel: <MathText>a⁻ᵏ = 1 / aᵏ</MathText>.
                </li>
                <li>
                  <strong>3. Azonos alapok összevonása és egyszerűsítés:</strong> Vond össze az azonos alapú
                  hatványokat a számlálóban és a nevezőben külön-külön, majd egyszerűsíts a közös tényezőkkel:
                  <MathText>aⁿ / aᵐ = aⁿ⁻ᵐ</MathText>.
                </li>
              </ol>
            </TheoryCard>

            <TheoryCallout
              type="danger"
              title="Tipikus buktató: Az együttható száma is kap kitevőt!"
            >
              A diákok több mint 40%-a elfelejti a számegyütthatót hatványozni! Például:{' '}
              <strong><MathText>(2a⁻³)² = 2² · a⁻⁶ = 4a⁻⁶</MathText></strong>, NEM pedig <MathText>2a⁻⁶</MathText>! Ugyanígy: <MathText>(3x)⁻² = 1 / (9x²)</MathText>.
            </TheoryCallout>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center w-full">
            <AlgebraicFractionSimplificationSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              1. ábra: Az algebrai törtek egyszerűsítésének lépésről lépésre történő menete
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: PRÍMHATVÁNYOKRA BONTÁS */}
      <TheorySection
        number={2}
        title="Összetett számalapok prímhatványokra bontása"
        icon={<Calculator className="w-5 h-5 text-indigo-500" />}
        badge="MÓDSZER"
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 flex flex-col items-center w-full order-2 lg:order-1">
            <PrimeFactorizationPowersSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              2. ábra: Összetett számok felbontása prímek hatványainak szorzatára
            </span>
          </div>

          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base order-1 lg:order-2">
            <p>
              Gyakran kapunk olyan numerikus hatványos feladatokat, amelyekben az alapok látszólag teljesen
              különböznek (pl. 12, 18, 6, 24, 36, 50). Mivel a hatványozási azonosságok csak <strong>azonos alapú</strong>{' '}
              vagy <strong>azonos kitevőjű</strong> kifejezésekre alkalmazhatók közvetlenül, a megoldás kulcsa:
            </p>

            <TheoryCard
              title="A prímhatvány-bontás elméleti alapja"
              icon={<Zap className="w-4 h-4 text-indigo-500" />}
            >
              <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-lg border border-indigo-200/60 dark:border-indigo-900/40 space-y-2">
                <div className="text-sm sm:text-base font-bold text-indigo-900 dark:text-indigo-200">
                  Minden összetett számot bontsunk fel a prímtényezős szorzatára:
                </div>
                <div className="font-mono text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                  <div>• 12 = 2² · 3 ⟹ 12ⁿ = (2² · 3)ⁿ = 2²ⁿ · 3ⁿ</div>
                  <div>• 18 = 2 · 3² ⟹ 18ⁿ = (2 · 3²)ⁿ = 2ⁿ · 3²ⁿ</div>
                  <div>• 50 = 2 · 5² ⟹ 50ⁿ = (2 · 5²)ⁿ = 2ⁿ · 5²ⁿ</div>
                  <div>• 72 = 2³ · 3² ⟹ 72ⁿ = (2³ · 3²)ⁿ = 2³ⁿ · 3²ⁿ</div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
                A felbontás után az összes szorzótényező mindössze 2, 3 vagy 5 prímhatványaként jelenik meg,
                így a kitevők a már ismert aⁿ · aᵐ = aⁿ⁺ᵐ és aⁿ : aᵐ = aⁿ⁻ᵐ azonosságokkal egyszerűen összevonhatók.
              </p>
            </TheoryCard>

            <TheoryCallout
              type="tip"
              title="Gyakorlati jó tanács számológép nélküli feladatokhoz"
            >
              Érettségi I. részében és felvételiken kifejezetten tilos a számológép használata olyan példáknál,
              mint (24³ · 16⁻²) / 36². Ha prímekre bontasz, nem kell hatalmas számokat (pl. 13824) összeszoroznod,
              hiszen a prímkitevők egyszerű kivonásokká és összeadásokká szelídülnek!
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: HATVÁNYOK ÖSSZEGE ÉS A KIEMELÉS */}
      <TheorySection
        number={3}
        title="Hatványok összege és különbsége: a kiemelés művészete"
        icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
        badge="ÉRETTSÉGI TÍPUS"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              A matematika egyik legfontosabb alapszabálya:{' '}
              <strong className="text-rose-600 dark:text-rose-400">
                NINCS OLYAN AZONOSSÁG, AMELY HATVÁNYOK ÖSSZEADÁSÁRA VONATKOZNA!
              </strong>
            </p>
            <p>
              A kitevők csak szorzáskor adódnak össze: aⁿ · aᵐ = aⁿ⁺ᵐ. Ha hatványok összeadása vagy kivonása
              szerepel (aⁿ + aᵐ), a műveletet kizárólag <strong>közös tényező kiemelésével</strong> vagy
              összevonással tudjuk elvégezni.
            </p>

            <TheoryCard
              title="A legkisebb kitevőjű hatvány kiemelése"
              icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            >
              <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <p>
                  Írjuk fel a nagyobb kitevőt a kisebb kitevő és egy konstans összegeként:{' '}
                  <strong>aⁿ⁺ᵏ = aⁿ · aᵏ</strong>. Ekkor aⁿ kiemelhető a zárójel elé:
                </p>
                <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-lg border border-emerald-200/60 dark:border-emerald-900/40 text-center font-bold text-emerald-800 dark:text-emerald-200 text-sm sm:text-base flex items-center justify-center">
                  <MathText>aⁿ⁺ᵏ ± aⁿ = aⁿ · (aᵏ ± 1)</MathText>
                </div>
                <div className="space-y-1.5 pt-1">
                  <div>• <strong>Példa 1:</strong> <MathText>2¹⁰ + 2¹⁰ = 2 · 2¹⁰ = 2¹ · 2¹⁰ = 2¹¹</MathText>.</div>
                  <div>• <strong>Példa 2:</strong> <MathText>5ⁿ⁺² - 5ⁿ = 5ⁿ · (5² - 1) = 5ⁿ · (25 - 1) = 24 · 5ⁿ</MathText>.</div>
                  <div>• <strong>Példa 3:</strong> <MathText>3²⁰²⁵ - 3²⁰²³ = 3²⁰²³ · (3² - 1) = 8 · 3²⁰²³</MathText>.</div>
                </div>
              </div>
            </TheoryCard>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center w-full">
            <FactoringPowersSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              3. ábra: Miért nem adódnak össze a kitevők összegnél, és hogyan segít a kiemelés?
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: HATVÁNYOK ÖSSZEHASONLÍTÁSA */}
      <TheorySection
        number={4}
        title="Különböző alapú és kitevőjű hatványok összehasonlítása"
        icon={<Scale className="w-5 h-5 text-amber-500" />}
        badge="LOGIKA"
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 flex flex-col items-center w-full order-2 lg:order-1">
            <PowersComparisonSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              4. ábra: Két mesteri stratégia hatványok nagyságának összevetésére
            </span>
          </div>

          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base order-1 lg:order-2">
            <p>
              Hogyan dönthetjük el két hatalmas számról, hogy melyik a nagyobb, ha nem áll rendelkezésre
              számológép? (Például: 2⁶⁰ vagy 3⁴⁰?) Erre két klasszikus matematikai stratégia létezik:
            </p>

            <TheoryCard
              title="1. Stratégia: Közös alapra hozás"
              icon={<Sparkles className="w-4 h-4 text-amber-500" />}
            >
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Ha az alapok maguk is felírhatók egy közös alapszám hatványaként (pl. 4 és 8 mindkettő a 2 hatványa;
                9 és 27 mindkettő a 3 hatványa):
              </p>
              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900/50 font-mono text-xs sm:text-sm text-amber-900 dark:text-amber-200 mt-2">
                4¹⁵ = (2²)¹⁵ = 2³⁰ &nbsp;|&nbsp; 8¹⁰ = (2³)¹⁰ = 2³⁰ ⟹ 4¹⁵ = 8¹⁰
              </div>
            </TheoryCard>

            <TheoryCard
              title="2. Stratégia: Közös kitevőre hozás (LNKO trükk)"
              icon={<Compass className="w-4 h-4 text-purple-500" />}
            >
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Ha az alapok nem rokonok (pl. 2 és 3), de a kitevőknek van 1-nél nagyobb közös osztójuk:
                vegyük a kitevők <strong>legnagyobb közös osztóját (LNKO)</strong>!
              </p>
              <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-900/50 font-mono text-xs sm:text-sm text-purple-900 dark:text-purple-200 mt-2 space-y-1">
                <div>lnko(60, 40) = 20</div>
                <div>2⁶⁰ = (2³)²⁰ = 8²⁰</div>
                <div>3⁴⁰ = (3²)²⁰ = 9²⁰</div>
                <div className="font-bold text-purple-950 dark:text-purple-100">
                  Mivel 8 &lt; 9 és az alapok &gt; 1 ⟹ 8²⁰ &lt; 9²⁰ ⟹ 2⁶⁰ &lt; 3⁴⁰.
                </div>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* INTERAKTÍV LABORATÓRIUM */}
      <div className="p-5 sm:p-6 bg-gradient-to-br from-purple-50/60 via-slate-50 to-indigo-50/60 dark:from-purple-950/20 dark:via-slate-900 dark:to-indigo-950/20 rounded-2xl border-2 border-purple-200/80 dark:border-purple-900/50 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-200/60 dark:border-purple-900/40 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 mb-1">
              <Calculator className="w-3.5 h-3.5" />
              Interaktív Laboratórium
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Összetett Hatvány-Kalkulátor & Összehasonlító Stúdió
            </h3>
          </div>

          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
            <button
              onClick={() => setLabTab('compare')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${labTab === 'compare'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              Összehasonlító
            </button>
            <button
              onClick={() => setLabTab('factoring')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${labTab === 'factoring'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              Kiemelés szimulátor
            </button>
          </div>
        </div>

        {labTab === 'compare' ? (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Teszteld a közös kitevőre hozás (LNKO) trükköt bármilyen két hatványon!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 'A' hatvány beállítása */}
              <div className="p-4 bg-white dark:bg-slate-800/90 rounded-xl border border-purple-200 dark:border-purple-800/50 space-y-3">
                <span className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                  „A” Kifejezés: {compBaseA}^{compExpA}
                </span>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Alap (a): {compBaseA}</span>
                    <span className="text-slate-500">Kitevő: {compExpA}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={compBaseA}
                      onChange={(e) => setCompBaseA(Number(e.target.value))}
                      className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
                    >
                      <option value={2}>Alap: 2</option>
                      <option value={3}>Alap: 3</option>
                      <option value={4}>Alap: 4</option>
                      <option value={5}>Alap: 5</option>
                      <option value={6}>Alap: 6</option>
                      <option value={7}>Alap: 7</option>
                    </select>
                    <select
                      value={compExpA}
                      onChange={(e) => setCompExpA(Number(e.target.value))}
                      className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
                    >
                      <option value={20}>Kitevő: 20</option>
                      <option value={30}>Kitevő: 30</option>
                      <option value={40}>Kitevő: 40</option>
                      <option value={50}>Kitevő: 50</option>
                      <option value={60}>Kitevő: 60</option>
                      <option value={75}>Kitevő: 75</option>
                      <option value={100}>Kitevő: 100</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 'B' hatvány beállítása */}
              <div className="p-4 bg-white dark:bg-slate-800/90 rounded-xl border border-indigo-200 dark:border-indigo-800/50 space-y-3">
                <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                  „B” Kifejezés: {compBaseB}^{compExpB}
                </span>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Alap (b): {compBaseB}</span>
                    <span className="text-slate-500">Kitevő: {compExpB}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={compBaseB}
                      onChange={(e) => setCompBaseB(Number(e.target.value))}
                      className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
                    >
                      <option value={2}>Alap: 2</option>
                      <option value={3}>Alap: 3</option>
                      <option value={4}>Alap: 4</option>
                      <option value={5}>Alap: 5</option>
                      <option value={6}>Alap: 6</option>
                      <option value={7}>Alap: 7</option>
                    </select>
                    <select
                      value={compExpB}
                      onChange={(e) => setCompExpB(Number(e.target.value))}
                      className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
                    >
                      <option value={20}>Kitevő: 20</option>
                      <option value={30}>Kitevő: 30</option>
                      <option value={40}>Kitevő: 40</option>
                      <option value={50}>Kitevő: 50</option>
                      <option value={60}>Kitevő: 60</option>
                      <option value={75}>Kitevő: 75</option>
                      <option value={100}>Kitevő: 100</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Eredmény levezetés doboz */}
            <div className="p-4 bg-purple-900/10 dark:bg-purple-950/40 rounded-xl border border-purple-300/80 dark:border-purple-800 space-y-2 text-center">
              <div className="text-xs text-purple-700 dark:text-purple-300 font-bold uppercase tracking-wider">
                Matematikai levezetés LNKO segítségével:
              </div>
              <div className="text-sm sm:text-base text-slate-800 dark:text-slate-100 font-medium">
                lnko({compExpA}, {compExpB}) = <strong>{commonGcd}</strong> ⟹ Közös külső kitevő: <strong>{commonGcd}</strong>
              </div>
              <div className="flex items-center justify-center gap-4 text-sm sm:text-lg font-mono font-bold flex-wrap">
                <span className="text-purple-600 dark:text-purple-400">
                  {compBaseA}^{compExpA} = ({compBaseA}^{redExpA})^{commonGcd} = {redValA}^{commonGcd}
                </span>
                <span className="text-slate-400 font-sans">vs</span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  {compBaseB}^{compExpB} = ({compBaseB}^{redExpB})^{commonGcd} = {redValB}^{commonGcd}
                </span>
              </div>
              <div className="pt-2 text-base sm:text-lg font-black">
                {redValA > redValB ? (
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Mivel {redValA} &gt; {redValB} ⟹ {compBaseA}^{compExpA} &gt; {compBaseB}^{compExpB}
                  </span>
                ) : redValA < redValB ? (
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Mivel {redValA} &lt; {redValB} ⟹ {compBaseA}^{compExpA} &lt; {compBaseB}^{compExpB}
                  </span>
                ) : (
                  <span className="text-indigo-600 dark:text-indigo-400">
                    Mivel {redValA} = {redValB} ⟹ A két kifejezés PONTOSAN EGYENLŐ! ({compBaseA}^{compExpA} = {compBaseB}^{compExpB})
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Vizsgáld meg, hogyan emelhető ki a kisebb kitevőjű hatvány az aⁿ⁺ᵏ - aⁿ különbségből!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Alap (a): {factorBase}
                </label>
                <input
                  type="range"
                  min={2}
                  max={6}
                  value={factorBase}
                  onChange={(e) => setFactorBase(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Kitevő-különbség (k): +{factorShift}
                </label>
                <input
                  type="range"
                  min={1}
                  max={4}
                  value={factorShift}
                  onChange={(e) => setFactorShift(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-4 bg-purple-900/10 dark:bg-purple-950/40 rounded-xl border border-purple-300/80 dark:border-purple-800 text-center space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                A levezetés algebrai alakja:
              </div>
              <div className="font-mono text-base sm:text-xl font-bold text-slate-900 dark:text-white">
                {factorBase}ⁿ⁺{factorShift} - {factorBase}ⁿ = {factorBase}ⁿ · ({factorBase}^{factorShift} - 1) = {factorBase}ⁿ · ({Math.pow(factorBase, factorShift)} - 1) = <span className="text-purple-600 dark:text-purple-400 font-black">{factorBracketVal} · {factorBase}ⁿ</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Látható, hogy az összeg/különbség mindig a kisebb hatvány egy egész számszorosára egyszerűsödik!
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. SZEKCIÓ: VÁLTOZÓK KIKÖTÉSE ÉS KIDOLGOZOTT MINTAPÉLDÁK */}
      <TheorySection
        number={5}
        title="Változók kikötései és kidolgozott érettségi feladatok"
        icon={<CheckCircle2 className="w-5 h-5 text-teal-500" />}
        badge="MINTAPÉLDÁK"
        badgeColor="teal"
      >
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            Minden olyan feladatban, ahol betűs kifejezések szerepelnek a nevezőben vagy negatív hatványként,
            <strong> kötelező a változók kikötése</strong>. Mivel nullával való osztás és nulladik/negatív
            hatvány (0⁻ᵏ) nem értelmezett, az alapok nem lehetnek nullák (pl. a ≠ 0, b ≠ 0, x ≠ y).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mintapélda 1 */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                  1. Mintapélda: Algebrai tört
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 font-bold">
                  Középszint
                </span>
              </div>
              <div className="font-bold text-slate-900 dark:text-white">
                Hozd a legegyszerűbb alakra: ((2x⁻² · y³) / (4x⁴ · y⁻¹))⁻²
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/80 dark:border-slate-800 font-mono">
                <div>1. Tört belső egyszerűsítése: (2/4) · x⁻²⁻⁴ · y³⁻⁽⁻¹⁾ = ½ · x⁻⁶ · y⁴</div>
                <div>2. Külső (-2) hatványra emelés: (½)⁻² · (x⁻⁶)⁻² · (y⁴)⁻²</div>
                <div>3. Számítás: 2² · x¹² · y⁻⁸ = 4 · x¹² · y⁻⁸</div>
                <div className="text-purple-600 dark:text-purple-400 font-bold">
                  Végeredmény: (4 · x¹²) / y⁸ &nbsp; (x, y ≠ 0)
                </div>
              </div>
            </div>

            {/* Mintapélda 2 */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                  2. Mintapélda: Kiemelés törtben
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 font-bold">
                  Érettségi klasszikus
                </span>
              </div>
              <div className="font-bold text-slate-900 dark:text-white">
                Számítsd ki: (5ⁿ⁺² + 5ⁿ⁺¹) / (6 · 5ⁿ)
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/80 dark:border-slate-800 font-mono">
                <div>1. Számlálóból emeljük ki 5ⁿ-t: 5ⁿ · (5² + 5¹) = 5ⁿ · (25 + 5) = 5ⁿ · 30</div>
                <div>2. Írjuk be a törtbe: (5ⁿ · 30) / (6 · 5ⁿ)</div>
                <div>3. Egyszerűsítsünk 5ⁿ-nel és 6-tal: 30 / 6 = 5</div>
                <div className="text-indigo-600 dark:text-indigo-400 font-bold">
                  Végeredmény: 5 &nbsp; (bármely n egész szám esetén!)
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

