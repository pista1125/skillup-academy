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
  PowerStructureSvg,
  SignRulesSvg,
  PowerIdentitiesSvg,
  DistributivePowerSvg
} from './PowerBasicsFigures';
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
  Sparkles
} from 'lucide-react';

interface PowerBasicsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PowerBasicsTheory: React.FC<PowerBasicsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab 1: Power Calculator state ---
  const [baseA, setBaseA] = useState<number>(2);
  const [expN, setExpN] = useState<number>(4);

  // --- Interactive Lab 2: Comparison state ---
  const [compPreset, setCompPreset] = useState<'ex1' | 'ex2' | 'ex3'>('ex1');
  const [compLeft, setCompLeft] = useState<{ label: string; val: number; explanation: string }>({
    label: '(2³)⁴',
    val: Math.pow(2, 12),
    explanation: 'Hatvány hatványozása: kitevők szorzódnak ⟹ 2³·⁴ = 2¹² = 4096'
  });
  const [compRight, setCompRight] = useState<{ label: string; val: number; explanation: string }>({
    label: '2⁴ · 2³',
    val: Math.pow(2, 7),
    explanation: 'Azonos alapúak szorzása: kitevők összeadódnak ⟹ 2⁴⁺³ = 2⁷ = 128'
  });

  // Calculate current power value
  const powerVal = Math.pow(baseA, expN);
  const signIsNegative = baseA < 0 && expN % 2 === 1;

  // Compute repeated multiplication string
  const factorsArray = Array.from({ length: expN }, () => (baseA < 0 ? `(${baseA})` : `${baseA}`));
  const factorsStr = factorsArray.join(' · ');

  // Compute bracketless contrast value: -a^n
  const bracketlessVal = -1 * Math.pow(Math.abs(baseA), expN);

  const handleSelectPreset = (preset: 'ex1' | 'ex2' | 'ex3') => {
    setCompPreset(preset);
    if (preset === 'ex1') {
      setCompLeft({
        label: '(2³)⁴',
        val: Math.pow(2, 12),
        explanation: 'Hatvány hatványozása: kitevők szorzódnak ⟹ 2³·⁴ = 2¹² = 4096'
      });
      setCompRight({
        label: '2⁴ · 2³',
        val: Math.pow(2, 7),
        explanation: 'Azonos alapúak szorzása: kitevők összeadódnak ⟹ 2⁴⁺³ = 2⁷ = 128'
      });
    } else if (preset === 'ex2') {
      setCompLeft({
        label: '2¹⁰ · 3⁵',
        val: Math.pow(2, 10) * Math.pow(3, 5),
        explanation: '2¹⁰ · 3⁵ = 1024 · 243 = 248 832 (vagy osztással: (2¹⁰·3⁵)/(2¹¹·3⁴) = 3/2 = 1,5 > 1)'
      });
      setCompRight({
        label: '2¹¹ · 3⁴',
        val: Math.pow(2, 11) * Math.pow(3, 4),
        explanation: '2¹¹ · 3⁴ = 2048 · 81 = 165 888'
      });
    } else if (preset === 'ex3') {
      setCompLeft({
        label: '2⁵ (a = 2, b = 5)',
        val: 32,
        explanation: '2⁵ = 2 · 2 · 2 · 2 · 2 = 32'
      });
      setCompRight({
        label: '5² (a = 5, b = 2)',
        val: 25,
        explanation: '5² = 5 · 5 = 25'
      });
    }
  };

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • III. HATVÁNYOZÁS ÉS A NÉGYZETGYÖK"
      title="1. A hatványozás (ismétlés)"
      subtitle="A hatványozás alapfogalma, műveleti azonosságai, előjelszabályai és gyakorlati számítási stratégiák"
      themeColor="blue"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-blue-600 dark:text-blue-400 font-black">Definíció:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>aⁿ = a · a · … · a</MathText> &nbsp;(n tényező)</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Azonos alapúak:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>aⁿ · aᵐ = aⁿ⁺ᵐ</MathText> &nbsp;|&nbsp; <MathText>aⁿ : aᵐ = aⁿ⁻ᵐ</MathText> &nbsp;|&nbsp; <MathText>(aⁿ)ᵐ = aⁿ·ᵐ</MathText></span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-amber-600 dark:text-amber-400 font-black">Előjelek és zárójelek:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>(-a)² = +a²</MathText> &nbsp;|&nbsp; <MathText>(-a)³ = -a³</MathText> &nbsp;|&nbsp; <MathText>-a² ≠ (-a)²</MathText></span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
    >
      {/* 1. SZEKCIÓ: A HATVÁNYOZÁS FOGALMA */}
      <TheorySection
        number={1}
        title="A hatványozás alapfogalma és felépítése"
        icon={<Zap className="w-5 h-5 text-blue-500" />}
        badge="ALAPFOGALOM"
        badgeColor="blue"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              A matematikában gyakran van szükség arra, hogy ugyanazt a számot többször egymás után
              önmagával megszorozzuk. Ahogyan az <strong>azonos tagú összeadást</strong> szorzással
              rövidítjük (a + a + a = 3 · a), úgy az <strong>azonos tényezőjű szorzást</strong> a{' '}
              <strong>hatványozás</strong> tömör jelölésrendszerével fejezzük ki.
            </p>

            <TheoryCard
              title="A pozitív egész kitevőjű hatvány definíciója"
              icon={<BookOpen className="w-4 h-4 text-blue-500" />}
            >
              <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 rounded-lg border border-blue-200/60 dark:border-blue-900/40 text-center space-y-2">
                <div className="text-xl sm:text-2xl font-black text-blue-700 dark:text-blue-300 tracking-wide">
                  <MathText>aⁿ = a · a · a · … · a</MathText> &nbsp; (n darab tényező)
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  ahol a valós szám (<MathText>a ∈ ℝ</MathText>) a <strong>hatványalap</strong>, a pozitív egész (<MathText>n ∈ ℤ⁺</MathText>) a{' '}
                  <strong>hatványkitevő</strong>, és <MathText>aⁿ</MathText> maga a <strong>hatványérték</strong>.
                </div>
              </div>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
                <li>
                  <strong>Egytényezős eset (n = 1):</strong> Megállapodás szerint bármely szám első
                  hatványa önmaga: <MathText>a¹ = a</MathText>.
                </li>
                <li>
                  <strong>Egyes és nulla hatványai:</strong> 1ⁿ = 1 minden n-re, valamint{' '}
                  0ⁿ = 0 (ha n &gt; 0).
                </li>
                <li>
                  <strong>A sorrend számít:</strong> 2⁵ = 32, de 5² = 25! A hatványalap és a kitevő
                  nem felcserélhető (a hatványozás nem felcserélhető / kommutatív művelet).
                </li>
              </ul>
            </TheoryCard>

            <TheoryCallout
              type="tip"
              title="Történeti érdekesség: Az algebra fejlődése"
            >
              Alexandriai Diophantosz a III. században még szavakkal és rövidítésekkel írta körül a
              hatványokat (szinkopikus algebra). A ma használt elegáns index-jelölést (aⁿ){' '}
              <strong>René Descartes</strong> francia matematikus és filozófus vezette be 1637-ben az{' '}
              <em>Értekezés a módszerről</em> című művének geometriai függelékében.
            </TheoryCallout>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center w-full">
            <PowerStructureSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              1. ábra: A hatvány anatómiai felépítése és ismételt szorzása
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: ELŐJELSZABÁLYOK ÉS A ZÁRÓJEL */}
      <TheorySection
        number={2}
        title="Előjelszabályok és a végzetes zárójelezési csapda"
        icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
        badge="BUKTATÓK"
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 flex flex-col items-center order-2 lg:order-1 w-full">
            <SignRulesSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              2. ábra: Páros és páratlan kitevők előjele, valamint a zárójelezés szerepe
            </span>
          </div>

          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base order-1 lg:order-2">
            <p>
              A hatványozás során a leggyakoribb dolgozatbeli és érettségi hibák a <strong>negatív előjelek</strong> és a{' '}
              <strong>zárójelek helytelen értelmezéséből</strong> fakadnak.
            </p>

            <TheoryCard title="A hatványozás előjelszabályai">
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-emerald-800 dark:text-emerald-300">
                      Pozitív alap (a &gt; 0):
                    </span>{' '}
                    Minden pozitív valós szám bármely pozitív egész kitevőjű hatványa <strong>mindig szigorúan pozitív</strong> (aⁿ &gt; 0).
                  </div>
                </div>

                <div className="p-2.5 rounded bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-blue-800 dark:text-blue-300">
                      Negatív alap páros kitevővel [(-a)²ᵏ]:
                    </span>{' '}
                    A páros számú negatív tényező szorzata mindig <strong>pozitív</strong>: (-a)²ᵏ = +a²ᵏ &gt; 0. Pl. (-2)⁴ = (-2) · (-2) · (-2) · (-2) = +16.
                  </div>
                </div>

                <div className="p-2.5 rounded bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-amber-800 dark:text-amber-300">
                      Negatív alap páratlan kitevővel [(-a)²ᵏ⁺¹]:
                    </span>{' '}
                    A páratlan számú negatív tényező szorzata mindig <strong>negatív</strong>: (-a)²ᵏ⁺¹ = -a²ᵏ⁺¹ &lt; 0. Pl. (-2)³ = (-2) · (-2) · (-2) = -8.
                  </div>
                </div>
              </div>
            </TheoryCard>

            <TheoryTrapBox
              title="A leggyakoribb csapda: (-3)² ≠ -3²"
              explanation="A hatványozás magasabb rendű művelet, mint az ellentettképzés (előjel levonás). Zárójel nélkül a kitevő CSAK a számra vonatkozik, az előjelre nem!"
            >
              <div className="grid grid-cols-2 gap-3 text-center text-xs sm:text-sm font-mono mt-2">
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">(-3)²</div>
                  <div className="text-slate-600 dark:text-slate-300 text-xs mt-1">(-3) · (-3) = <strong>+9</strong></div>
                </div>
                <div className="p-2 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                  <div className="font-bold text-rose-600 dark:text-rose-400">-3²</div>
                  <div className="text-slate-600 dark:text-slate-300 text-xs mt-1">-(3 · 3) = <strong>-9</strong></div>
                </div>
              </div>
            </TheoryTrapBox>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: AZONOS ALAPÚ HATVÁNYOK MŰVELETEI */}
      <TheorySection
        number={3}
        title="Azonos alapú hatványok szorzása és osztása"
        icon={<TrendingUp className="w-5 h-5 text-indigo-500" />}
        badge="AZONOSSÁGOK"
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              Ha a hatványok alapja megegyezik, a műveletek elvégzéséhez nem szükséges kiszámolni
              a hatalmas hatványértékeket: a <strong>kitevőkkel végezhetünk műveleteket</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TheoryCard title="1. Azonos alapúak szorzása">
                <div className="text-center font-bold text-lg text-indigo-600 dark:text-indigo-400 py-1 flex items-center justify-center">
                  <MathText>aⁿ · aᵐ = aⁿ⁺ᵐ</MathText>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  <strong>Indoklás:</strong> Az első tényezőben n darab a, a másodikban m darab a szorzódik, összesen (n + m) darab a tényező van:
                  <br />
                  <span className="font-semibold text-slate-700 dark:text-slate-200 mt-1 block">
                    <MathText>2³ · 2⁴ = (2 · 2 · 2) · (2 · 2 · 2 · 2) = 2⁷ = 128</MathText>
                  </span>
                </p>
              </TheoryCard>

              <TheoryCard title="2. Azonos alapúak osztása">
                <div className="text-center font-bold text-lg text-indigo-600 dark:text-indigo-400 py-1 flex items-center justify-center">
                  <MathText>aⁿ : aᵐ = aⁿ⁻ᵐ</MathText> &nbsp; (a ≠ 0, n &gt; m)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  <strong>Indoklás:</strong> A törtet egyszerűsítjük m darab a tényezővel, így a számlálóban (n − m) darab a marad:
                  <br />
                  <span className="font-semibold text-slate-700 dark:text-slate-200 mt-1 block">
                    <MathText>5⁶ : 5² = 5⁶⁻² = 5⁴ = 625</MathText>
                  </span>
                </p>
              </TheoryCard>
            </div>

            <TheoryCard title="3. Hatvány hatványozása">
              <div className="text-center font-bold text-lg text-indigo-600 dark:text-indigo-400 py-1 flex items-center justify-center">
                <MathText>(aⁿ)ᵐ = aⁿ·ᵐ</MathText>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Ha egy aⁿ hatványt emelünk m-edik hatványra, akkor m darab olyan szorzótényezőt szorzunk össze, amely mindegyike n darab a-ból áll. Ezért összesen n · m darab a tényező keletkezik:
                <br />
                <span className="font-semibold text-slate-800 dark:text-slate-100 mt-1 block">
                  <MathText>(2³)² = 2³ · 2³ = 2³·² = 2⁶ = 64</MathText>
                </span>
              </p>
            </TheoryCard>

            <TheoryTrapBox
              title="Vigyázat: (aⁿ)ᵐ ≠ a^(nᵐ)"
              explanation="A zárójelezett hatvány hatványozásánál a kitevők szorzódnak, míg ha nincs zárójel az emeleten (pl. 2^(3²)), akkor először a felső kitevőt számoljuk ki!"
            >
              <div className="text-xs font-mono text-slate-700 dark:text-slate-300 space-y-1 mt-1">
                <div>(2³)² = 2³·² = 2⁶ = <strong>64</strong></div>
                <div>2^(3²) = 2⁹ = <strong>512</strong> (Óriási különbség!)</div>
              </div>
            </TheoryTrapBox>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center w-full">
            <PowerIdentitiesSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              3. ábra: Azonos alapú hatványok műveleti szabályai
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: SZORZAT ÉS HÁNYADOS HATVÁNYOZÁSA */}
      <TheorySection
        number={4}
        title="Szorzat és hányados hatványozása, azonos kitevők"
        icon={<Layers className="w-5 h-5 text-purple-500" />}
        badge="DISZTRIBUTIVITÁS"
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 flex flex-col items-center order-2 lg:order-1 w-full">
            <DistributivePowerSvg className="w-full" />
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
              4. ábra: Szorzat, hányados és a nullára végződés szabálya
            </span>
          </div>

          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base order-1 lg:order-2">
            <p>
              Gyakran előfordul, hogy a hatványok alapja különböző, de a <strong>kitevőjük megegyezik</strong>.
              Ilyenkor a szorzás és osztás disztributív tulajdonságát alkalmazhatjuk.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TheoryCard title="Szorzat hatványa">
                <div className="text-center font-bold text-base text-purple-600 dark:text-purple-400 py-1 flex items-center justify-center">
                  <MathText>(a · b)ⁿ = aⁿ · bⁿ</MathText>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  A szorzótényezőket tetszőlegesen átcsoportosíthatjuk:
                  <br />
                  <span className="font-semibold text-slate-700 dark:text-slate-200 mt-1 block">
                    <MathText>(2 · 5)³ = 10³ = 1000 = 2³ · 5³ = 8 · 125</MathText>
                  </span>
                </p>
              </TheoryCard>

              <TheoryCard title="Hányados hatványa">
                <div className="text-center font-bold text-base text-purple-600 dark:text-purple-400 py-1 flex items-center justify-center">
                  <MathText>(a / b)ⁿ = aⁿ / bⁿ</MathText> &nbsp; (b ≠ 0)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  A számlálót és a nevezőt is a megadott kitevőre emeljük:
                  <br />
                  <span className="font-semibold text-slate-700 dark:text-slate-200 mt-1 block">
                    <MathText>(3 / 4)³ = 3³ / 4³ = 27 / 64</MathText>
                  </span>
                </p>
              </TheoryCard>
            </div>

            <TheoryCard title="Mesterfogás: Hány nullára végződik egy szám?">
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2">
                <p>
                  A tízes számrendszerben egy szám pontosan annyi nullára végződik, ahányszor a <strong>10</strong> szerepel
                  a prímtényezős felbontásában. Mivel 10 = 2 · 5, ezért a <strong>2-es és 5-ös prímfaktorok párjai</strong> határozzák meg a végződő nullák számát:
                </p>
                <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded border border-purple-200 dark:border-purple-800 font-mono text-center text-xs sm:text-sm">
                  2ᵃ · 5ᵇ ⟹ min(a, b) darab 0 a szám végén
                </div>
                <p className="text-xs text-slate-500 italic">
                  Példa: 2⁸ · 5⁶ = 2² · (2⁶ · 5⁶) = 4 · 10⁶ = 4 000 000 ⟹ 6 nullára végződik!
                </p>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: INTERAKTÍV LABOR */}
      <TheorySection
        number={5}
        title="Interaktív Laboratórium: Hatványkalkulátor & Összehasonlító"
        icon={<Calculator className="w-5 h-5 text-emerald-500" />}
        badge="INTERAKTÍV"
        badgeColor="emerald"
      >
        <div className="space-y-6">
          {/* Labor 1: Hatványkalkulátor */}
          <div className="p-4 sm:p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base sm:text-lg text-emerald-300">
                  1. Dinamikus Hatványérték & Előjelelemző
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 font-mono">
                a = {baseA}, n = {expN}
              </span>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Hatványalap (a):</span>
                  <span className="font-mono text-blue-400 font-bold text-sm">{baseA}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="1"
                  value={baseA}
                  onChange={(e) => setBaseA(parseInt(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>-5</span>
                  <span>0</span>
                  <span>+5</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Hatványkitevő (n):</span>
                  <span className="font-mono text-pink-400 font-bold text-sm">{expN}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={expN}
                  onChange={(e) => setExpN(parseInt(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>1</span>
                  <span>4</span>
                  <span>8</span>
                </div>
              </div>
            </div>

            {/* Result Display Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* Product expansion */}
              <div className="sm:col-span-2 p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-1">
                <div className="text-xs text-slate-400 font-medium">Ismételt szorzat alak:</div>
                <div className="font-mono text-sm sm:text-base text-slate-100 font-semibold truncate">
                  {factorsStr}
                </div>
                <div className="text-xs text-emerald-400 font-bold pt-1">
                  = {powerVal.toLocaleString('hu-HU')}
                </div>
              </div>

              {/* Sign rule card */}
              <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-1">
                <div className="text-xs text-slate-400 font-medium">Előjel tulajdonság:</div>
                <div className="text-xs font-bold">
                  {baseA === 0 ? (
                    <span className="text-slate-400">Nulla értéke = 0</span>
                  ) : signIsNegative ? (
                    <span className="text-rose-400">Negatív (páratlan n)</span>
                  ) : (
                    <span className="text-emerald-400">Pozitív ({baseA < 0 ? 'páros n' : 'alap > 0'})</span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {baseA < 0
                    ? `(${baseA})^${expN} = ${powerVal > 0 ? '+' : ''}${powerVal}`
                    : `${baseA}^${expN} = ${powerVal}`}
                </div>
              </div>
            </div>

            {/* Zárójelezési kontraszt figyelmeztető */}
            {baseA < 0 && (
              <div className="p-3 bg-rose-950/40 rounded-xl border border-rose-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="text-slate-200">
                    Zárójeles: <strong>({baseA})^{expN} = {powerVal}</strong>
                  </span>
                </div>
                <div className="text-rose-300 font-mono">
                  Zárójel nélküli: <strong>{baseA}^{expN} = {bracketlessVal}</strong>
                </div>
                <span className="text-[11px] text-rose-400 font-bold">
                  {powerVal === bracketlessVal ? 'Kivételesen egyeznek (mert páratlan n)' : 'Különböző értékek!'}
                </span>
              </div>
            )}
          </div>

          {/* Labor 2: Hatványok Összehasonlítója */}
          <div className="p-4 sm:p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base sm:text-lg text-indigo-300">
                  2. Hatványok Összehasonlítója (Számológép nélkül)
                </h3>
              </div>
              <span className="text-xs text-slate-400">Tankönyvi mintafeladatok elemzése</span>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSelectPreset('ex1')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  compPreset === 'ex1'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                (2³)⁴ vs 2⁴ · 2³
              </button>
              <button
                onClick={() => handleSelectPreset('ex2')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  compPreset === 'ex2'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                2¹⁰ · 3⁵ vs 2¹¹ · 3⁴
              </button>
              <button
                onClick={() => handleSelectPreset('ex3')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  compPreset === 'ex3'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                2⁵ vs 5² (Alap-Kitevő csere)
              </button>
            </div>

            {/* Comparison Visual Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 items-center">
              {/* Left Side */}
              <div className="sm:col-span-3 p-4 bg-slate-800/80 rounded-xl border border-indigo-500/40 text-center space-y-1">
                <div className="text-xs text-indigo-300 font-semibold">Bal oldali kifejezés</div>
                <div className="text-lg sm:text-xl font-black text-white font-mono">{compLeft.label}</div>
                <div className="text-xs text-slate-400 pt-1 font-mono">Érték: {compLeft.val.toLocaleString('hu-HU')}</div>
              </div>

              {/* Operator */}
              <div className="sm:col-span-1 flex flex-col items-center justify-center py-2 sm:py-0">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-xl text-amber-400">
                  {compLeft.val > compRight.val ? '>' : compLeft.val < compRight.val ? '<' : '='}
                </div>
              </div>

              {/* Right Side */}
              <div className="sm:col-span-3 p-4 bg-slate-800/80 rounded-xl border border-purple-500/40 text-center space-y-1">
                <div className="text-xs text-purple-300 font-semibold">Jobb oldali kifejezés</div>
                <div className="text-lg sm:text-xl font-black text-white font-mono">{compRight.label}</div>
                <div className="text-xs text-slate-400 pt-1 font-mono">Érték: {compRight.val.toLocaleString('hu-HU')}</div>
              </div>
            </div>

            {/* Explanation box */}
            <div className="p-3.5 bg-slate-800/50 rounded-xl border border-slate-700/60 text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Matematikai levezetés:
              </div>
              <p>Bal oldal: {compLeft.explanation}</p>
              <p>Jobb oldal: {compRight.explanation}</p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 6. SZEKCIÓ: VIZSGATIPPEK ÉS MEGOLDÁSI STRATÉGIÁK */}
      <TheorySection
        number={6}
        title="Gyakorlati tanácsok és érettségi stratégiák"
        icon={<Sparkles className="w-5 h-5 text-amber-500" />}
        badge="STRATÉGIA"
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="1. Alakíts közös alapra!">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ha 4, 8, 16 vagy 27, 81 szerepel egy feladatban, azonnal írd át prímhatványként:
              4 = 2², 8 = 2³, 27 = 3³, 81 = 3⁴. Így azonnal alkalmazhatod a szorzás és osztás azonosságait!
            </p>
          </TheoryCard>

          <TheoryCard title="2. Törteknél egyszerűsíts!">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Bonyolult törtes kifejezéseknél ne számold ki az óriási számértékeket! Külön-külön vond össze az azonos betűs és szám alapú tényezőket a kitevők kivonásával (aⁿ / aᵐ = aⁿ⁻ᵐ).
            </p>
          </TheoryCard>

          <TheoryCard title="3. Ellenőrizz előjelet először!">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Mielőtt nekikezdenél a számolásnak, határozd meg a végeredmény előjelét! Számold meg a negatív tényezők számát: páros darab esetén pozitív, páratlan darab esetén negatív lesz az eredmény.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
