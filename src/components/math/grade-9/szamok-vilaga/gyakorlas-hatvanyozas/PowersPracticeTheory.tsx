import React, { useState } from 'react';
import {
  Brain,
  Sliders,
  Layers,
  ArrowRightLeft,
  AlertTriangle,
  Sparkles,
  Calculator,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Scale
} from 'lucide-react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  PrimeBaseDecompositionSvg,
  FractionMovementSvg,
  FactoringStrategySvg,
  PowerComparisonSvg
} from './PowersPracticeFigures';

interface PowersPracticeTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PowersPracticeTheory: React.FC<PowersPracticeTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV LABOR ÁLLAPOTOK ---
  const [labTab, setLabTab] = useState<'simplify' | 'compare'>('simplify');

  // Simplify fül: Mintafeladat kiválasztása
  const [simplifyPresetId, setSimplifyPresetId] = useState<number>(0);

  // Compare fül: A és B hatványok
  const [compPresetId, setCompPresetId] = useState<number>(0);

  const simplifyPresets = [
    {
      id: 0,
      title: '1. Prímtényezős Tört: (6⁴ · 8²) / (12³ · 2²)',
      original: '\\frac{6^4 \\cdot 8^2}{12^3 \\cdot 2^2}',
      originalText: '(6⁴ · 8²) / (12³ · 2²)',
      step1: 'Prímalapokra bontás: 6 = 2 · 3, 8 = 2³, 12 = 2² · 3',
      step1Math: '= \\frac{(2 \\cdot 3)^4 \\cdot (2^3)^2}{(2^2 \\cdot 3)^3 \\cdot 2^2}',
      step2: 'Kifejtés az azonosságokkal: (ab)ⁿ = aⁿbⁿ és (aⁿ)ᵐ = aⁿᵐ',
      step2Math: '= \\frac{2^4 \\cdot 3^4 \\cdot 2^6}{2^6 \\cdot 3^3 \\cdot 2^2} = \\frac{2^{10} \\cdot 3^4}{2^8 \\cdot 3^3}',
      step3: 'Kitevők kivonása azonos alapoknál (számláló - nevező)',
      step3Math: '= 2^{10-8} \\cdot 3^{4-3} = 2^2 \\cdot 3^1 = 4 \\cdot 3 = 12',
      finalResult: '12'
    },
    {
      id: 1,
      title: '2. Kiemelés Hatványösszegből: (2ⁿ⁺³ + 2ⁿ⁺¹) / 2ⁿ',
      original: '\\frac{2^{n+3} + 2^{n+1}}{2^n}',
      originalText: '(2ⁿ⁺³ + 2ⁿ⁺¹) / 2ⁿ',
      step1: 'Kifejtjük az összetett kitevőket: 2ⁿ⁺³ = 2ⁿ · 2³ és 2ⁿ⁺¹ = 2ⁿ · 2¹',
      step1Math: '= \\frac{2^n \\cdot 2^3 + 2^n \\cdot 2^1}{2^n}',
      step2: 'Közös tényező kiemelése a számlálóban (a legkisebb kitevőjű tag: 2ⁿ)',
      step2Math: '= \\frac{2^n \\cdot (2^3 + 2^1)}{2^n}',
      step3: 'Egyszerűsítés 2ⁿ-nel és a zárójel kiszámítása',
      step3Math: '= 2^3 + 2^1 = 8 + 2 = 10',
      finalResult: '10 (tetszőleges n-re érvényes!)'
    },
    {
      id: 2,
      title: '3. Negatív Kitevős Tört: (3⁻² · x⁴ · y⁻³) / (9⁻¹ · x⁻² · y)',
      original: '\\frac{3^{-2} \\cdot x^4 \\cdot y^{-3}}{9^{-1} \\cdot x^{-2} \\cdot y}',
      originalText: '(3⁻² · x⁴ · y⁻³) / (9⁻¹ · x⁻² · y)',
      step1: 'Prímalapra hozás: 9⁻¹ = (3²)⁻¹ = 3⁻²',
      step1Math: '= \\frac{3^{-2} \\cdot x^4 \\cdot y^{-3}}{3^{-2} \\cdot x^{-2} \\cdot y^1}',
      step2: 'Törtvonalon átmozgatás vagy kitevők kivonása alapok szerint',
      step2Math: '3^{-2 - (-2)} \\cdot x^{4 - (-2)} \\cdot y^{-3 - 1}',
      step3: 'Kitevők kiszámítása: 3⁰ = 1, x⁶, y⁻⁴',
      step3Math: '= 1 \\cdot x^6 \\cdot y^{-4} = \\frac{x^6}{y^4}',
      finalResult: 'x⁶ / y⁴'
    },
    {
      id: 3,
      title: '4. Algebrai Kifejezés Hatványozása: (2a³ b⁻²)³ / (4a⁴ b⁻⁴)',
      original: '\\frac{(2a^3 b^{-2})^3}{4a^4 b^{-4}}',
      originalText: '(2a³ b⁻²)³ / (4a⁴ b⁻⁴)',
      step1: 'A számláló köbre emelése minden tényezőre: 2³ · (a³)³ · (b⁻²)³',
      step1Math: '= \\frac{8 \\cdot a^9 \\cdot b^{-6}}{4 \\cdot a^4 \\cdot b^{-4}}',
      step2: 'Együtthatók osztása és azonos betűk kitevőinek kivonása',
      step2Math: '= (8 / 4) \\cdot a^{9 - 4} \\cdot b^{-6 - (-4)}',
      step3: 'Összegzés és negatív kitevő átírása pozitívvá',
      step3Math: '= 2 \\cdot a^5 \\cdot b^{-2} = \\frac{2a^5}{b^2}',
      finalResult: '(2a⁵) / b²'
    }
  ];

  const compPresets = [
    {
      id: 0,
      title: '2³⁰⁰ vs 3²⁰⁰',
      expA: '2³⁰⁰',
      expB: '3²⁰⁰',
      method: 'Közös Kitevőre Hozás (lnko(300, 200) = 100)',
      stepA: '2³⁰⁰ = (2³)¹⁰⁰ = 8¹⁰⁰',
      stepB: '3²⁰⁰ = (3²)¹⁰⁰ = 9¹⁰⁰',
      explanation: 'Mivel a kitevők megegyeznek (100) és mindkettő pozitív, az alapok döntenek: 8 < 9, ezért 8¹⁰⁰ < 9¹⁰⁰.',
      winner: '3²⁰⁰ a nagyobb (2³⁰⁰ < 3²⁰⁰)'
    },
    {
      id: 1,
      title: '4¹⁵ vs 8¹⁰',
      expA: '4¹⁵',
      expB: '8¹⁰',
      method: 'Közös Alapra Hozás (közös alap: 2)',
      stepA: '4¹⁵ = (2²)¹⁵ = 2³⁰',
      stepB: '8¹⁰ = (2³)¹⁰ = 2³⁰',
      explanation: 'Mindkét szám átírható 2-es alapú hatvánnyá. Az átalakítás után mindkét érték pontosan 2³⁰.',
      winner: 'A két kifejezés egyenlő! (4¹⁵ = 8¹⁰)'
    },
    {
      id: 2,
      title: '(0,5)⁴ vs (0,5)²',
      expA: '(0,5)⁴ = 1/16',
      expB: '(0,5)² = 1/4',
      method: 'Tört Alapú Szabály (0 < a < 1)',
      stepA: '(1/2)⁴ = 1/16 = 0,0625',
      stepB: '(1/2)² = 1/4 = 0,25',
      explanation: 'Ha az alap 0 és 1 közötti tört, a nagyobb kitevő KISEBB értéket eredményez, mert minden szorzással egyre kisebb szeletet kapunk!',
      winner: '(0,5)² a nagyobb ((0,5)⁴ < (0,5)²)'
    },
    {
      id: 3,
      title: '5²⁰ vs 25⁹',
      expA: '5²⁰',
      expB: '25⁹',
      method: 'Közös Alapra Hozás (közös alap: 5)',
      stepA: '5²⁰ változatlan',
      stepB: '25⁹ = (5²)⁹ = 5¹⁸',
      explanation: 'Mivel az alap (5) nagyobb 1-nél, a nagyobb kitevő adja a nagyobb értéket: 20 > 18, így 5²⁰ > 5¹⁸.',
      winner: '5²⁰ a nagyobb (5²⁰ > 25⁹)'
    }
  ];

  const currentSimplify = simplifyPresets[simplifyPresetId];
  const currentComp = compPresets[compPresetId];

  return (
    <TheoryTemplate
      title="Hatványozás Gyakorlása és Algebrai Kifejezések"
      subtitle="Összetett törtkifejezések egyszerűsítése, közös alapra hozás, kiemelés és hatványok nagyságrendi összehasonlítása."
      badge="8. TÉMAKÖR"
      badgeColor="rose"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quizButtonText="Gyakorló Kvíz Indítása"
      quickRule={{
        label: 'A Hatványozás Gyakorlati Aranyszabályai',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1 text-left font-bold text-xs sm:text-sm">
            <div>
              <span className="text-rose-600 dark:text-rose-400 font-black">Prímalapra hozás: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">4ⁿ = 2²ⁿ &nbsp;|&nbsp; 8ⁿ = 2³ⁿ &nbsp;|&nbsp; 9ⁿ = 3²ⁿ &nbsp;|&nbsp; 6ⁿ = 2ⁿ · 3ⁿ</span>
            </div>
            <div>
              <span className="text-amber-600 dark:text-amber-400 font-black">Kiemelés: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">2ⁿ⁺² + 2ⁿ = 2ⁿ · (2² + 1) = 5 · 2ⁿ</span>
            </div>
          </div>
        )
      }}
    >
      {/* 1. SZEKCIÓ: ÖSSZETETT TÖRTES HATVÁNYKIFEJEZÉSEK */}
      <TheorySection
        number={1}
        title="Összetett Törtes Hatványkifejezések Egyszerűsítése"
        icon={<Brain className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="Algebrai Módszertan"
        badgeColor="rose"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Az érettségi és felvételi feladatokban a leggyakrabban olyan törtes kifejezésekkel találkozunk, ahol látszólag
            különböző számok szerepelnek a számlálóban és a nevezőben (pl. 4, 6, 8, 9, 12).
            A megoldás kulcsa: <strong>a számokat prímhatványok szorzatára kell bontani</strong>, így az 5 alapazonosság
            közvetlenül alkalmazhatóvá válik!
          </p>

          <PrimeBaseDecompositionSvg />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <TheoryCard
              title="1. Lépés: Prímtényezős Felbontás"
              badge="Alapozás"
              badgeColor="purple"
            >
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <li>• <strong>4</strong> átírása: $4 = 2^2 \implies 4^n = 2^{2n}$</li>
                <li>• <strong>6</strong> átírása: $6 = 2 \cdot 3 \implies 6^n = 2^n \cdot 3^n$</li>
                <li>• <strong>8</strong> átírása: $8 = 2^3 \implies 8^n = 2^{3n}$</li>
                <li>• <strong>9</strong> átírása: $9 = 3^2 \implies 9^n = 3^{2n}$</li>
                <li>• <strong>12</strong> átírása: $12 = 4 \cdot 3 = 2^2 \cdot 3 \implies 12^n = 2^{2n} \cdot 3^n$</li>
              </ul>
            </TheoryCard>

            <TheoryCard
              title="2. Lépés: Törtvonalon Átmozgatás"
              badge="Negatív Kitevők"
              badgeColor="rose"
            >
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A negatív kitevőjű tényezőket a törtvonalon átléptetve azonnal pozitívvá tehetjük:
              </p>
              <div className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs my-2 font-bold text-rose-600 dark:text-rose-400">
                a⁻ⁿ / b⁻ᵐ = bᵐ / aⁿ
              </div>
              <p className="text-xs text-slate-500">
                Így nem kell bajlódni a bonyolult negatív előjelek kivonásával!
              </p>
            </TheoryCard>
          </div>

          <FractionMovementSvg />
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: KIEMELÉS HATVÁNYÖSSZEGEKBŐL */}
      <TheorySection
        number={2}
        title="Közös Tényező Kiemelése Összegekből és Különbségekből"
        icon={<Layers className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badge="Kulcstechnika"
        badgeColor="amber"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Gyakori diákhiba: összeadásnál is összeadják a kitevőket ($2^3 + 2^4 = 2^7$).
            <strong>Összeadásra és kivonásra nincs hatványozási azonosság!</strong> Egyetlen szabályos algebrai út létezik:
            a <strong>legkisebb kitevőjű közös hatványtényező kiemelése</strong>.
          </p>

          <FactoringStrategySvg />

          <TheoryCallout
            type="tip"
            title="A Kiemelés Aranyszabálya"
          >
            <div className="text-sm leading-relaxed space-y-1">
              Ha egy tört számlálójában hatványok összege vagy különbsége szerepel (pl. $2^{20} + 2^{22}$),
              mindig a <strong>kisebbik kitevőjű hatványt</strong> emeljük ki:
              $$2^{20} + 2^{22} = 2^{20}(1 + 2^2) = 2^{20} \cdot 5$$
              Ezután a szorzattá alakított számlálóban a $2^{20}$ azonnal egyszerűsíthető a nevezővel!
            </div>
          </TheoryCallout>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Gyakori Érettségi Típuspélda: Változós Kiemelés
            </h4>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200 space-y-1">
              <p>Feladat: Egyszerűsítsd a (3ⁿ⁺² - 3ⁿ) / 3ⁿ⁻¹ kifejezést!</p>
              <p className="text-amber-600 dark:text-amber-400">1. Kiemeljük 3ⁿ-t a számlálóban: [3ⁿ(3² - 1)] / 3ⁿ⁻¹</p>
              <p className="text-blue-600 dark:text-blue-400">2. A zárójel értéke: 3² - 1 = 9 - 1 = 8</p>
              <p className="text-emerald-600 dark:text-emerald-400">3. Osztás azonos alapú hatvánnyal: (3ⁿ · 8) / 3ⁿ⁻¹ = 3ⁿ⁻⁽ⁿ⁻¹⁾ · 8 = 3¹ · 8 = 24</p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: HATVÁNYOK ÖSSZEHASONLÍTÁSA ÉS EGYENLETEK */}
      <TheorySection
        number={3}
        title="Hatványok Nagyságrendi Összehasonlítása és Exponenciális Egyenletek"
        icon={<TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        badge="Összehasonlítás"
        badgeColor="blue"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Hogyan döntsük el, hogy $2^{300}$ vagy $3^{200}$ a nagyobb számológép nélkül?
            A hatalmas számok közvetlen kiszámítása lehetetlen (több száz jegyű számok), de két zseniális stratégia mindig működik:
          </p>

          <PowerComparisonSvg />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <TheoryCard
              title="1. Közös Alap Stratégia"
              badge="Ha az alapok rokonok"
              badgeColor="blue"
            >
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha az alapok azonos prím hatványai (pl. 4 és 8 mindkettő 2 hatványa, vagy 9 és 27 mindkettő 3 hatványa):
              </p>
              <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded font-mono text-center text-xs my-2 font-bold text-blue-600">
                4¹⁵ = (2²)¹⁵ = 2³⁰ = (2³)¹⁰ = 8¹⁰
              </div>
              <p className="text-xs text-slate-500">
                Mivel mindkét oldal 2³⁰, a két érték pontosan egyenlő!
              </p>
            </TheoryCard>

            <TheoryCard
              title="2. Közös Kitevő Stratégia"
              badge="Ha a kitevők oszthatók"
              badgeColor="indigo"
            >
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha a kitevőknek van közös osztója (pl. lnko(300, 200) = 100):
              </p>
              <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded font-mono text-center text-xs my-2 font-bold text-indigo-600">
                2³⁰⁰ = (2³)¹⁰⁰ = 8¹⁰⁰ <br />
                3²⁰⁰ = (3²)¹⁰⁰ = 9¹⁰⁰
              </div>
              <p className="text-xs text-slate-500">
                Mivel 8 &lt; 9, így 8¹⁰⁰ &lt; 9¹⁰⁰, tehát 3²⁰⁰ a nagyobb!
              </p>
            </TheoryCard>
          </div>

          <TheoryCallout
            type="warning"
            title="A Tört Alapok Veszélye: 0 < a < 1"
          >
            <div className="text-sm leading-relaxed">
              Ha az alap 1-nél kisebb pozitív szám (pl. 1/2 vagy 0,5), akkor <strong>a nagyobb kitevőhöz KISEBB érték tartozik</strong>!
              Például:
              <div className="font-mono text-center my-2 font-bold">(0,5)² = 0,25 &gt; (0,5)⁴ = 0,0625</div>
              Érettségin erre mindig különösen figyeljünk!
            </div>
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: INTERAKTÍV HATVÁNY-GYAKORLÓ ÉS ÖSSZEHASONLÍTÓ LABOR */}
      <TheorySection
        number={4}
        title="Interaktív Hatvány-Gyakorló és Összehasonlító Labor"
        icon={<Sliders className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="Interaktív Labor"
        badgeColor="rose"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Kattints a fülre a kívánt labor kiválasztásához: elemezd az összetett törtes kifejezések levezetését lépésről lépésre, vagy teszteld a hatványok összehasonlító arénáját!
          </p>

          {/* Fülválasztó gombok */}
          <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setLabTab('simplify')}
              className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                labTab === 'simplify'
                  ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-4 h-4" />
              1. Törtkifejezés Egyszerűsítő Vizualizáló
            </button>
            <button
              onClick={() => setLabTab('compare')}
              className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                labTab === 'compare'
                  ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Scale className="w-4 h-4" />
              2. Hatvány-Összehasonlító Aréna
            </button>
          </div>

          {/* 1. FÜL: TÖRTKIFEJEZÉS EGYSZERŰSÍTŐ */}
          {labTab === 'simplify' && (
            <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Válassz egy érettségi típuspéldát:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {simplifyPresets.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => setSimplifyPresetId(preset.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        simplifyPresetId === preset.id
                          ? 'bg-rose-600 text-white font-bold shadow-xs'
                          : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {preset.id + 1}. Típus
                    </button>
                  ))}
                </div>
              </div>

              {/* Aktuális feladat kártya */}
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {currentSimplify.title}
                </div>
                <div className="bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 font-mono text-center p-3 rounded-lg text-sm sm:text-base font-black my-2 border border-rose-200 dark:border-rose-900/40">
                  ${currentSimplify.original}$
                </div>
              </div>

              {/* Lépésről lépésre levezetés */}
              <div className="space-y-2.5">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-purple-500 shadow-xs">
                  <div className="text-xs font-bold text-purple-700 dark:text-purple-300">
                    1. Lépés: {currentSimplify.step1}
                  </div>
                  <div className="font-mono text-xs text-slate-800 dark:text-slate-200 mt-1 pl-2">
                    ${currentSimplify.step1Math}$
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-blue-500 shadow-xs">
                  <div className="text-xs font-bold text-blue-700 dark:text-blue-300">
                    2. Lépés: {currentSimplify.step2}
                  </div>
                  <div className="font-mono text-xs text-slate-800 dark:text-slate-200 mt-1 pl-2">
                    ${currentSimplify.step2Math}$
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-emerald-500 shadow-xs">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    3. Lépés: {currentSimplify.step3}
                  </div>
                  <div className="font-mono text-xs text-slate-800 dark:text-slate-200 mt-1 pl-2">
                    ${currentSimplify.step3Math}$
                  </div>
                </div>
              </div>

              {/* Végeredmény kiemelés */}
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center">
                <span className="text-xs text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider block">
                  Egyszerűsített Legegyszerűbb Alak:
                </span>
                <span className="text-lg font-black text-emerald-700 dark:text-emerald-200 font-mono">
                  {currentSimplify.finalResult}
                </span>
              </div>
            </div>
          )}

          {/* 2. FÜL: HATVÁNY-ÖSSZEHASONLÍTÓ ARÉNA */}
          {labTab === 'compare' && (
            <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Válassz egy összehasonlító párt:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {compPresets.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => setCompPresetId(preset.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        compPresetId === preset.id
                          ? 'bg-rose-600 text-white font-bold shadow-xs'
                          : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {preset.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mérleg nézet */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">"A" Kifejezés</span>
                  <div className="text-xl font-black text-rose-600 dark:text-rose-400 font-mono my-2">
                    {currentComp.expA}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 font-mono bg-slate-50 dark:bg-slate-800 p-2 rounded">
                    {currentComp.stepA}
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">"B" Kifejezés</span>
                  <div className="text-xl font-black text-blue-600 dark:text-blue-400 font-mono my-2">
                    {currentComp.expB}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 font-mono bg-slate-50 dark:bg-slate-800 p-2 rounded">
                    {currentComp.stepB}
                  </div>
                </div>
              </div>

              {/* Alkalmazott stratégia magyarázata */}
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Alkalmazott Stratégia: {currentComp.method}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentComp.explanation}
                </p>
              </div>

              {/* Győztes kihirdetése */}
              <div className="p-3 bg-gradient-to-r from-rose-500 to-indigo-600 text-white rounded-xl text-center shadow-xs">
                <span className="text-xs uppercase tracking-wider font-bold opacity-90 block">
                  Matematikai Ítélet:
                </span>
                <span className="text-base sm:text-lg font-black tracking-wide">
                  {currentComp.winner}
                </span>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: TIPIKUS ÉRETTSÉGI BUKTATÓK ÉS CSAPDÁK */}
      <TheorySection
        number={5}
        title="Tipikus Érettségi Buktatók és Csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="Csapdák"
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Buktató: Zárójel elhagyása szorzat hatványánál: (2x)⁴ ≠ 2x⁴"
            trap="Mennyi (2x)⁴ értéke, ha zárójel nélkül írjuk le?"
            wrong="(2x)⁴ = 2x⁴"
            wrongExplanation="Óriási hiba! A hatványozás a zárójel miatt az egész (2x) szorzatra vonatkozik, tehát a 2-est is 4. hatványra kell emelni: 2⁴ · x⁴ = 16x⁴! A 2x⁴ kifejezésben csak az x van a negyediken!"
            correct="(2x)⁴ = 2⁴ · x⁴ = 16x⁴"
            correctExplanation="A szorzat hatványozási azonossága szerint (a · b)ⁿ = aⁿ · bⁿ. Minden belső tényező megkapja a kitevőt!"
            tip="Aranyszabály: Ha az alap szorzat vagy tört, MINDIG zárójelezd!"
          />

          <TheoryTrapBox
            title="2. Buktató: Tört negatív kitevőn: (2/3)⁻² nem negatív szám!"
            trap="Mennyi (2/3)⁻² értéke?"
            wrong="(2/3)⁻² = -4/9 vagy -(2/3)²"
            wrongExplanation="Gyakori tévhit, hogy a negatív kitevő negatívvá teszi a számot! A negatív kitevő nem az előjelet változtatja meg, hanem a szám RECI PROKÁT képezi: (2/3)⁻¹ = 3/2!"
            correct="(2/3)⁻² = (3/2)² = 9/4 = 2,25"
            correctExplanation="A tört negatív kitevője megfordítja a számlálót és a nevezőt, a kitevő pedig pozitívvá válik!"
            tip="Tipp: Tört negatív kitevőn = Fordítsd meg a törtet, és vedd a pozitív hatványát!"
          />

          <TheoryTrapBox
            title="3. Buktató: Részleges egyszerűsítés összegből"
            trap="Lehet-e a (2⁵ + 3⁵) / 2⁵ törtből egyszerűsíteni a 2⁵-t?"
            wrong="(2⁵ + 3⁵) / 2⁵ = 1 + 3⁵ = 1 + 243 = 244"
            wrongExplanation="Végzetes algebrai hiba! Összegből vagy különbségből tilos egyetlen tagot leegyszerűsíteni a nevezővel! Csak akkor lehet egyszerűsíteni, ha a számláló TELJES szorzattá van alakítva, vagy mindkét tagot osztjuk: 2⁵/2⁵ + 3⁵/2⁵ = 1 + (3/2)⁵ = 1 + 7,59 = 8,59!"
            correct="(2⁵ + 3⁵) / 2⁵ = 1 + (3/2)⁵ ≈ 8,59"
            correctExplanation="Törtet csak szorzattényezővel szabad egyszerűsíteni, összeg tagjaival soha!"
            tip="Jegyezd meg a mondókát: 'Összegből nem egyszerűsítünk!'"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PowersPracticeTheory;
