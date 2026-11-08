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
  PermanenceZeroPowerSvg,
  NegativePowerDefinitionSvg,
  PowersOfTenSvg,
  NegativeExponentTrapsSvg
} from './IntegerPowersFigures';
import {
  Zap,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Scale,
  Layers,
  TrendingUp,
  BarChart2,
  BookOpen,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface IntegerPowersTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const IntegerPowersTheory: React.FC<IntegerPowersTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab: Integer Exponents Explorer ---
  const [baseA, setBaseA] = useState<number>(2);
  const [expK, setExpK] = useState<number>(-3);

  // Preset scenarios
  const applyPreset = (preset: 'neg-int' | 'neg-base-odd' | 'neg-base-even' | 'frac-neg' | 'zero-exp' | 'ten-neg') => {
    if (preset === 'neg-int') {
      setBaseA(2);
      setExpK(-3);
    } else if (preset === 'neg-base-odd') {
      setBaseA(-2);
      setExpK(-3);
    } else if (preset === 'neg-base-even') {
      setBaseA(-2);
      setExpK(-4);
    } else if (preset === 'frac-neg') {
      setBaseA(4);
      setExpK(-2);
    } else if (preset === 'zero-exp') {
      setBaseA(5);
      setExpK(0);
    } else if (preset === 'ten-neg') {
      setBaseA(10);
      setExpK(-3);
    }
  };

  // Evaluation logic
  const isZeroBase = baseA === 0;
  const isZeroExp = expK === 0;
  const isZeroBaseZeroExp = isZeroBase && isZeroExp;
  const isZeroBaseNegExp = isZeroBase && expK < 0;
  const isUndefined = isZeroBaseZeroExp || isZeroBaseNegExp;

  let calcResultStr = '';
  let fractionStr = '';
  let decimalVal: number | null = null;
  let explanation = '';

  if (isZeroBaseZeroExp) {
    calcResultStr = 'NEM ÉRTELMEZETT (0⁰ határozatlan)';
    explanation = 'A nulla nulladik hatványa a matematikában ellentmondásra vezet, ezért nincs értelmezve!';
  } else if (isZeroBaseNegExp) {
    calcResultStr = 'NEM ÉRTELMEZETT (Nullával való osztás!)';
    explanation = `0^(${expK}) = 1 / 0^${Math.abs(expK)} = 1 / 0, ami a nullával való osztás miatt értelmetlen!`;
  } else if (isZeroExp) {
    calcResultStr = '1';
    decimalVal = 1;
    explanation = `Bármely nullától különböző valós szám 0. hatványa pontosan 1: (${baseA})⁰ = 1.`;
  } else if (expK > 0) {
    decimalVal = Math.pow(baseA, expK);
    calcResultStr = `${decimalVal}`;
    const factors = Array.from({ length: expK }, () => (baseA < 0 ? `(${baseA})` : `${baseA}`)).join(' · ');
    explanation = `Pozitív kitevő esetén ismételt szorzás: ${factors} = ${decimalVal}`;
  } else {
    // expK < 0
    const absExp = Math.abs(expK);
    const denom = Math.pow(baseA, absExp);
    decimalVal = 1 / denom;
    calcResultStr = `1 / ${baseA < 0 ? `(${baseA})^${absExp}` : `${baseA}^${absExp}`} = 1 / ${denom}`;
    fractionStr = `1 / ${denom}`;
    explanation = `Negatív kitevő definíciója: az alap reciprokát emeljük pozitív hatványra: (${baseA})^(${expK}) = 1 / (${baseA})^${absExp} = 1 / ${denom} = ${Number(decimalVal.toFixed(6))}`;
  }

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • III. HATVÁNYOZÁS ÉS A NÉGYZETGYÖK"
      title="2. Egész kitevőjű hatványok"
      subtitle="A hatványfogalom kiterjesztése a permanencia-elvvel, nulla és negatív egész kitevők, azonosságok és tízes hatványok"
      themeColor="indigo"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-indigo-600 dark:text-indigo-400 font-black">Nulladik hatvány:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>a⁰ = 1</MathText> &nbsp;(a ≠ 0)</span>
              <span className="text-rose-500 text-[11px] font-semibold">(0⁰ NEM ÉRTELMEZETT!)</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sky-600 dark:text-sky-400 font-black">Negatív kitevő:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>a⁻ⁿ = 1 / aⁿ = (1 / a)ⁿ</MathText> &nbsp;(a ≠ 0)</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-purple-600 dark:text-purple-400 font-black">Törtek reciprok szabálya:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>(a / b)⁻ⁿ = (b / a)ⁿ</MathText> &nbsp;(a, b ≠ 0)</span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
    >
      {/* 1. SZEKCIÓ: A PERMANENCIA-ELV ÉS A NULLA KITEVŐ */}
      <TheorySection
        number={1}
        title="A permanencia-elv és a nulla kitevő"
        icon={<Zap className="w-5 h-5 text-indigo-500" />}
        badge="FOGALOMKITERJESZTÉS"
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              A 9. osztályban megismert hatványfogalom csak <strong>pozitív egész kitevőkre</strong> volt értelmezve
              (hiszen egy számot legkevesebb egyszer szorozhatunk önmagával). Felmerül a kérdés: lehet-e értelme a{' '}
              <strong>nulla</strong> vagy <strong>negatív egész kitevőjű</strong> hatványoknak?
            </p>

            <TheoryCard
              title="A permanencia-elv (a megmaradás elve)"
              icon={<BookOpen className="w-4 h-4 text-indigo-500" />}
            >
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                A matematikában, amikor egy fogalmat bővítünk, a <strong>permanencia-elvet</strong> követjük (latin{' '}
                <em>permanens = állandó, megmaradó</em>): az új definíciókat úgy kell bevezetnünk, hogy a korábban
                már bizonyított <strong>műveleti azonosságok változatlanul érvényben maradjanak</strong>.
              </p>
            </TheoryCard>

            <TheoryCard
              title="A nulladik hatvány levezetése és definíciója"
              icon={<Sparkles className="w-4 h-4 text-indigo-500" />}
            >
              <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-lg border border-indigo-200/60 dark:border-indigo-900/40 text-center space-y-2">
                <div className="text-xl sm:text-2xl font-black text-indigo-700 dark:text-indigo-300 tracking-wide">
                  <MathText>a⁰ = 1</MathText> &nbsp; (minden a ≠ 0 valós számra)
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Bármely nullától különböző szám nulladik hatványa pontosan 1.
                </div>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1.5 mt-2">
                <div>
                  <strong>Levezetés azonos alapúak hányadosával:</strong>
                </div>
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded text-xs text-center">
                  <MathText>aⁿ / aⁿ = 1</MathText> &nbsp; és egyben &nbsp; <MathText>aⁿ / aⁿ = aⁿ⁻ⁿ = a⁰ ⟹ a⁰ = 1</MathText>
                </div>
                <div>
                  Például: <MathText>5⁰ = 1</MathText>, &nbsp; <MathText>(-12)⁰ = 1</MathText>, &nbsp; <MathText>(3/7)⁰ = 1</MathText>, &nbsp; <MathText>(√2)⁰ = 1</MathText>.
                </div>
              </div>
            </TheoryCard>

            <TheoryTrapBox
              title="Súlyos hiba: 0⁰ nem 1 és nem 0!"
              explanation="A 0⁰ kifejezés a matematikában NEM ÉRTELMEZETT (határozatlan alak). A 0ⁿ / 0ⁿ = 0/0 tört nullával való osztást jelentene, ami ellentmondáshoz vezet."
            />
          </div>

          <div className="lg:col-span-6 flex flex-col items-center w-full">
            <PermanenceZeroPowerSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              1. ábra: A permanencia-elv és a nulla kitevő levezetése
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: A NEGATÍV EGÉSZ KITEVŐ ÉS A RECIPROK */}
      <TheorySection
        number={2}
        title="A negatív egész kitevő definíciója és a reciprok szabály"
        icon={<Scale className="w-5 h-5 text-sky-500" />}
        badge="RECIPROK SZABÁLY"
        badgeColor="sky"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 flex flex-col items-center order-2 lg:order-1 w-full">
            <NegativePowerDefinitionSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              2. ábra: A negatív kitevő definíciója és törtek hatványozása
            </span>
          </div>

          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base order-1 lg:order-2">
            <p>
              Vizsgáljuk meg a <MathText>2⁸ : 2¹¹</MathText> hányadost! Az azonosság szerint <MathText>2⁸⁻¹¹ = 2⁻³</MathText>.
              Másrészt törttel felírva és egyszerűsítve: <MathText>2⁸ / 2¹¹ = 1 / 2³ = 1 / 8</MathText>.
              A permanencia-elv megköveteli, hogy ez a két kifejezés egyenlő legyen!
            </p>

            <TheoryCard title="A negatív egész kitevő definíciója">
              <div className="p-3 bg-sky-50/70 dark:bg-sky-950/30 rounded-lg border border-sky-200/60 dark:border-sky-900/40 text-center space-y-2">
                <div className="text-xl sm:text-2xl font-black text-sky-700 dark:text-sky-300 tracking-wide">
                  <MathText>a⁻ⁿ = 1 / aⁿ = (1 / a)ⁿ</MathText>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  ha a valós szám (a ≠ 0) és n pozitív egész (n ∈ ℤ⁺).
                </div>
              </div>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
                <li>
                  <strong>Szavakban:</strong> Bármely nullától különböző szám negatív egész kitevőjű hatványa
                  megegyezik a szám <strong>reciprokának ellentett (pozitív) kitevőjű</strong> hatványával.
                </li>
                <li>
                  <strong>Alappéldák:</strong> 2⁻¹ = 1/2 = 0,5; &nbsp; 3⁻² = 1/3² = 1/9; &nbsp; 10⁻² = 1/100 = 0,01.
                </li>
              </ul>
            </TheoryCard>

            <TheoryCard title="Törtek negatív kitevőjű hatványozása (A reciprok trükk)">
              <div className="p-2.5 rounded bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-center font-bold text-purple-700 dark:text-purple-300 text-base flex items-center justify-center">
                <MathText>(a / b)⁻ⁿ = (b / a)ⁿ = bⁿ / aⁿ</MathText> &nbsp; (a ≠ 0, b ≠ 0)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                Ha egy törtet negatív kitevőre kell emelnünk, a legegyszerűbb lépés: <strong>megfordítjuk a törtet</strong>{' '}
                (reciprok), és a <strong>kitevő előjelét pozitívra váltjuk</strong>!
              </p>
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-slate-700 dark:text-slate-200">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded text-center flex items-center justify-center">
                  <MathText>(2 / 3)⁻¹ = (3 / 2)¹ = 1,5</MathText>
                </div>
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded text-center flex items-center justify-center">
                  <MathText>(3 / 4)⁻² = (4 / 3)² = 16 / 9</MathText>
                </div>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: MŰVELETI AZONOSSÁGOK EGÉSZ KITEVŐKRE */}
      <TheorySection
        number={3}
        title="Műveleti azonosságok egész kitevőkre"
        icon={<TrendingUp className="w-5 h-5 text-indigo-500" />}
        badge="AZONOSSÁGOK"
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              A definíciók kiterjesztésének köszönhetően a korábban megismert <strong>mind az 5 hatványazonosság</strong>{' '}
              érvényes marad <strong>tetszőleges egész kitevőkre</strong> (pozitívra, nullára és negatívra is)!
            </p>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="font-bold text-indigo-600 dark:text-indigo-400 text-base flex items-center">
                  <span className="mr-1.5">1.</span>
                  <MathText>aᵐ · aⁿ = aᵐ⁺ⁿ</MathText>
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  Azonos alapok szorzásakor a kitevők előjelesen összeadódnak:
                  <br />
                  <span className="text-slate-700 dark:text-slate-200 block mt-1">
                    <MathText>2⁵ · 2⁻³ = 2⁵⁺⁽⁻³⁾ = 2² = 4</MathText>
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="font-bold text-indigo-600 dark:text-indigo-400 text-base flex items-center">
                  <span className="mr-1.5">2.</span>
                  <MathText>aᵐ : aⁿ = aᵐ⁻ⁿ</MathText>
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  Azonos alapok osztásakor a kitevők kivonódnak (ügyelj a kettős mínuszra!):
                  <br />
                  <span className="text-slate-700 dark:text-slate-200 block mt-1">
                    <MathText>3⁻² : 3⁻⁵ = 3⁻²⁻⁽⁻⁵⁾ = 3⁻²⁺⁵ = 3³ = 27</MathText>
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="font-bold text-indigo-600 dark:text-indigo-400 text-base flex items-center">
                  <span className="mr-1.5">3.</span>
                  <MathText>(aᵐ)ⁿ = aᵐ·ⁿ</MathText>
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  Hatvány hatványozásakor a kitevők összeszorzódnak:
                  <br />
                  <span className="text-slate-700 dark:text-slate-200 block mt-1">
                    <MathText>(2⁻²)⁻³ = 2⁽⁻²⁾·⁽⁻³⁾ = 2⁶ = 64</MathText>
                  </span>
                </div>
              </div>
            </div>

            <TheoryCallout type="tip" title="Törtvonal és a negatív kitevők átmozgatása">
              Ha egy törtkifejezésben a nevezőben van negatív kitevős tag, az a számlálóba pozitív kitevővel mozoghat át,
              és fordítva: <strong>1 / a⁻ⁿ = aⁿ</strong> és <strong>a⁻ⁿ / 1 = 1 / aⁿ</strong>.
            </TheoryCallout>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center w-full">
            <NegativeExponentTrapsSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              3. ábra: A leggyakoribb érettségi csapdák negatív kitevőknél
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: A 10 NEGATÍV HATVÁNYAI ÉS TIZEDESTÖRTEK */}
      <TheorySection
        number={4}
        title="A 10 negatív hatványai és helyiértékes felbontás"
        icon={<BarChart2 className="w-5 h-5 text-emerald-500" />}
        badge="HELYIÉRTÉKEK"
        badgeColor="emerald"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 flex flex-col items-center order-2 lg:order-1 w-full">
            <PowersOfTenSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              4. ábra: A 10 hatványai, tizedestörtek és metrikus prefixumok
            </span>
          </div>

          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base order-1 lg:order-2">
            <p>
              A tízes számrendszerben a tizedesvessző utáni helyi értékeket közvetlenül a <strong>10 negatív egész kitevőjű hatványai</strong>{' '}
              határozzák meg:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
              <div className="p-2.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">10⁻¹</div>
                <div className="text-slate-600 dark:text-slate-300">0,1 (tized)</div>
              </div>
              <div className="p-2.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">10⁻²</div>
                <div className="text-slate-600 dark:text-slate-300">0,01 (század)</div>
              </div>
              <div className="p-2.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">10⁻³</div>
                <div className="text-slate-600 dark:text-slate-300">0,001 (ezred)</div>
              </div>
              <div className="p-2.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">10⁻⁴</div>
                <div className="text-slate-600 dark:text-slate-300">0,0001 (tízezred)</div>
              </div>
              <div className="p-2.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">10⁻⁶</div>
                <div className="text-slate-600 dark:text-slate-300">milliomod (mikro)</div>
              </div>
              <div className="p-2.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">10⁻⁹</div>
                <div className="text-slate-600 dark:text-slate-300">milliárdod (nano)</div>
              </div>
            </div>

            <TheoryCard title="Számok helyiértékes alakja 10 hatványaival">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Minden tizedestört egyértelműen felírható a helyi értékeinek és a 10 hatványainak szorzataként:
              </p>
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-slate-800 dark:text-slate-200 mt-2 space-y-1">
                <div>5065,8 = 5 · 10³ + 0 · 10² + 6 · 10¹ + 5 · 10⁰ + 8 · 10⁻¹</div>
                <div>3,085 = 3 · 10⁰ + 0 · 10⁻¹ + 8 · 10⁻² + 5 · 10⁻³</div>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: INTERAKTÍV LABOR */}
      <TheorySection
        number={5}
        title="Interaktív Egész Kitevős Számológép és Vizsgáló"
        icon={<Calculator className="w-5 h-5 text-indigo-500" />}
        badge="INTERAKTÍV LABOR"
        badgeColor="indigo"
      >
        <div className="p-5 sm:p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-800 space-y-6">
          <div>
            <h4 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-400" />
              Hatványérték és levezetés tetszőleges egész kitevőre
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Állítsd az alap (a) és a kitevő (k) értékét, vagy válassz a tipikus érettségi mintapéldák közül!
            </p>
          </div>

          {/* Gyorsbeállítás minták (Presets) */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-xs text-slate-400 self-center font-semibold mr-1">Minták:</span>
            <button
              onClick={() => applyPreset('neg-int')}
              className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-indigo-900/60 border border-slate-700 text-indigo-300 transition-colors"
            >
              2⁻³ = 1/8
            </button>
            <button
              onClick={() => applyPreset('neg-base-odd')}
              className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-indigo-900/60 border border-slate-700 text-indigo-300 transition-colors"
            >
              (-2)⁻³ = -1/8
            </button>
            <button
              onClick={() => applyPreset('neg-base-even')}
              className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-indigo-900/60 border border-slate-700 text-indigo-300 transition-colors"
            >
              (-2)⁻⁴ = +1/16
            </button>
            <button
              onClick={() => applyPreset('frac-neg')}
              className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-indigo-900/60 border border-slate-700 text-indigo-300 transition-colors"
            >
              4⁻² = 1/16
            </button>
            <button
              onClick={() => applyPreset('zero-exp')}
              className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-indigo-900/60 border border-slate-700 text-indigo-300 transition-colors"
            >
              5⁰ = 1
            </button>
            <button
              onClick={() => applyPreset('ten-neg')}
              className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-indigo-900/60 border border-slate-700 text-indigo-300 transition-colors"
            >
              10⁻³ = 0,001
            </button>
          </div>

          {/* Csúszkák */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            {/* Alap 'a' csúszka */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Hatványalap (a):</span>
                <span className="font-mono font-bold text-sky-400 text-base">{baseA}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={baseA}
                onChange={(e) => setBaseA(parseInt(e.target.value, 10))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>-5</span>
                <span>-2</span>
                <span>0</span>
                <span>2</span>
                <span>5</span>
              </div>
            </div>

            {/* Kitevő 'k' csúszka */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Egész kitevő (k):</span>
                <span className="font-mono font-bold text-indigo-400 text-base">{expK}</span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="1"
                value={expK}
                onChange={(e) => setExpK(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>-4 (negatív)</span>
                <span>-2</span>
                <span>0 (nulla)</span>
                <span>+2</span>
                <span>+4 (pozitív)</span>
              </div>
            </div>
          </div>

          {/* Eredményjelző kártya */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-indigo-900/50 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Kifejezés:</span>
                <div className="text-2xl font-black font-mono text-white mt-0.5">
                  {baseA < 0 ? `(${baseA})` : `${baseA}`}
                  <sup className="text-indigo-400 text-lg ml-0.5">{expK}</sup>
                </div>
              </div>
              <div className="sm:text-right">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Pontos érték:</span>
                <div className={`text-xl sm:text-2xl font-black font-mono mt-0.5 ${isUndefined ? 'text-rose-400 text-base sm:text-lg' : 'text-emerald-400'}`}>
                  {calcResultStr}
                </div>
              </div>
            </div>

            {/* Részletes magyarázat */}
            <div className="text-xs sm:text-sm text-slate-300 space-y-1">
              <div className="font-semibold text-indigo-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Lépésről lépésre:
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200">
                {explanation}
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

