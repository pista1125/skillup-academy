import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryTrapBox
} from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';
import {
  Trophy,
  Zap,
  Calculator,
  Binary,
  Layers,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Hash,
  Scale,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PowersSummaryTheoryProps {
  onBack: () => void;
  onStartQuiz: () => void;
}

// Helper: GCD
function getGcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

// Helper: Prime factorization
function getPrimeFactors(n: number): { prime: number; exp: number }[] {
  if (n <= 1) return [];
  const factors: { prime: number; exp: number }[] = [];
  let d = 2;
  let temp = n;
  while (d * d <= temp) {
    if (temp % d === 0) {
      let count = 0;
      while (temp % d === 0) {
        count++;
        temp = Math.floor(temp / d);
      }
      factors.push({ prime: d, exp: count });
    }
    d++;
  }
  if (temp > 1) {
    factors.push({ prime: temp, exp: 1 });
  }
  return factors;
}

export const PowersSummaryTheory: React.FC<PowersSummaryTheoryProps> = ({
  onBack,
  onStartQuiz,
}) => {
  // Interactive Lab State: Two-number analyzer
  const [numA, setNumA] = useState<number>(36);
  const [numB, setNumB] = useState<number>(48);

  const analysis = useMemo(() => {
    const a = Math.max(1, Math.min(9999, Math.floor(numA || 1)));
    const b = Math.max(1, Math.min(9999, Math.floor(numB || 1)));

    const factorsA = getPrimeFactors(a);
    const factorsB = getPrimeFactors(b);

    const numDivisorsA = factorsA.reduce((acc, f) => acc * (f.exp + 1), 1);
    const numDivisorsB = factorsB.reduce((acc, f) => acc * (f.exp + 1), 1);

    const gcdVal = getGcd(a, b);
    const lcmVal = Math.floor((a * b) / gcdVal);
    const isRelPrime = gcdVal === 1;

    // Scientific notation for a * b
    const product = a * b;
    const sciExp = Math.floor(Math.log10(product));
    const sciMantissa = (product / Math.pow(10, sciExp)).toFixed(2);

    return {
      a,
      b,
      factorsA,
      factorsB,
      numDivisorsA,
      numDivisorsB,
      gcdVal,
      lcmVal,
      isRelPrime,
      product,
      sciStr: `${sciMantissa} · 10^${sciExp}`
    };
  }, [numA, numB]);

  return (
    <TheoryTemplate
      title="11. Összefoglalás: Hatványozás és Oszthatóság"
      subtitle="A 7. osztályos IV. fejezet átfogó szintézise: a hatványozási azonosságok, a normálalak, az oszthatósági szabályrendszer, prímfelbontás, LNKO, LKKT és játékstratégiák."
      badgeText="7. Osztály • Matematika IV. Témakör • 11. Összefoglalás"
      topicBadge="Hatványozás és oszthatóság"
      emoji="🏆"
      themeColor="slate"
      documentId="g7-powers-summary-theory-doc"
      pdfFilename="7_osztaly_hatvanyozas_oszthatosag_osszefoglalas.pdf"
      quickRule={{
        label: 'Fontos Szabályok – IV. Fejezet Törvényei és Képletei',
        formula: 'aⁿ · aᵐ = aⁿ⁺ᵐ | aⁿ : aᵐ = aⁿ⁻ᵐ | a · 10ᵏ | d(n) = ∏(αᵢ+1) | LNKO · LKKT = a · b'
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      readTime="25 perc"
    >
      {/* 1. SZEKCIÓ: A HATVÁNYOZÁS ÉS A NORMÁLALAK RENDSZERE */}
      <TheorySection
        number={1}
        title="1. A Hatványozás Művelete és Azonosságai"
        badgeColor="slate"
        icon={<Zap className="w-6 h-6 text-slate-700 dark:text-slate-300" />}
      >
        <TheoryCard title="A hatványozás alapfogalmai és előjelszabályai">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A hatványozás azonos tényezők ismételt szorzását jelenti: <MathText>aⁿ = a · a · ... · a</MathText> (n tényező), ahol <strong>a az alap</strong> és <strong>n a kitevő</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block mb-1">
                Nulladik és első hatvány
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Bármely nem nulla szám 0. hatványa 1: <MathText>a⁰ = 1 (a ≠ 0)</MathText>. Minden szám 1. hatványa önmaga: <MathText>a¹ = a</MathText>.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block mb-1">
                Negatív alapok és paritás
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Páros kitevőnél az eredmény pozitív: <MathText>(-2)⁴ = +16</MathText>. Páratlan kitevőnél negatív marad: <MathText>(-2)³ = -8</MathText>.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto my-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                  <th className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">Azonosság Neve</th>
                  <th className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">Általános Képlet</th>
                  <th className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">Konkrét Példa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-[11px]">
                <tr>
                  <td className="py-2 px-3 font-sans font-medium text-slate-900 dark:text-slate-100">Azonos alapúak szorzása</td>
                  <td className="py-2 px-3 text-indigo-600 dark:text-indigo-400 font-bold">aⁿ · aᵐ = aⁿ⁺ᵐ</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">2³ · 2⁴ = 2⁷ = 128</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans font-medium text-slate-900 dark:text-slate-100">Azonos alapúak osztása</td>
                  <td className="py-2 px-3 text-indigo-600 dark:text-indigo-400 font-bold">aⁿ : aᵐ = aⁿ⁻ᵐ</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">5⁶ : 5² = 5⁴ = 625</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans font-medium text-slate-900 dark:text-slate-100">Szorzat hatványa</td>
                  <td className="py-2 px-3 text-indigo-600 dark:text-indigo-400 font-bold">(a · b)ⁿ = aⁿ · bⁿ</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">(2 · 5)³ = 2³ · 5³ = 1000</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans font-medium text-slate-900 dark:text-slate-100">Tört hatványa</td>
                  <td className="py-2 px-3 text-indigo-600 dark:text-indigo-400 font-bold">(a / b)ⁿ = aⁿ / bⁿ</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">(3/4)² = 9/16</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans font-medium text-slate-900 dark:text-slate-100">Hatvány hatványozása</td>
                  <td className="py-2 px-3 text-indigo-600 dark:text-indigo-400 font-bold">(aⁿ)ᵐ = aⁿ·ᵐ</td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">(2³)² = 2⁶ = 64</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TheoryCard>

        <TheoryCard title="Nagy számok és a normálalak (Tudományos jelölés)">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            Egy pozitív szám <strong>normálalakja</strong> olyan kéttényezős szorzat:
          </p>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-center font-mono font-bold text-sm text-amber-900 dark:text-amber-200 mb-3">
            a · 10ᵏ, ahol 1 ≤ a &lt; 10 és k egész szám
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Például: <MathText>345 000 = 3,45 · 10⁵</MathText>. Műveleteknél a mantisszákat (<MathText>a</MathText>) összeadjuk, kivonjuk vagy összeszorozzuk, a 10-hatványokra pedig a hatványozási azonosságokat alkalmazzuk.
          </p>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: OSZTHATÓSÁG ÉS PRÍMTÉNYEZŐS FELBONTÁS */}
      <TheorySection
        number={2}
        title="2. Oszthatósági Rendszer és Prímtényezők"
        badgeColor="slate"
        icon={<Binary className="w-6 h-6 text-slate-700 dark:text-slate-300" />}
      >
        <TheoryCard title="Az oszthatósági szabályok gyorskereső táblázata">
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                  <th className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">Osztó</th>
                  <th className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">Vizsgált Feltétel</th>
                  <th className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">Példa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                <tr>
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-slate-100">2, 5, 10</td>
                  <td className="py-2 px-3 text-slate-700 dark:text-slate-300">Utolsó 1 számjegy: páros (2), 0 vagy 5 (5), 0 (10)</td>
                  <td className="py-2 px-3 font-mono text-slate-500">430 mindhárommal osztható</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-slate-100">4, 25, 100</td>
                  <td className="py-2 px-3 text-slate-700 dark:text-slate-300">Utolsó 2 számjegyből álló szám osztható 4-gyel, 25-tel, 100-zal</td>
                  <td className="py-2 px-3 font-mono text-slate-500">1724 (24 osztható 4-gyel)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-slate-100">8, 125</td>
                  <td className="py-2 px-3 text-slate-700 dark:text-slate-300">Utolsó 3 számjegyből álló szám osztható 8-cal, 125-tel</td>
                  <td className="py-2 px-3 font-mono text-slate-500">5120 (120 osztható 8-cal)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-slate-100">3, 9</td>
                  <td className="py-2 px-3 text-slate-700 dark:text-slate-300">Számjegyek összege osztható 3-mal, 9-cel</td>
                  <td className="py-2 px-3 font-mono text-slate-500">468 (4+6+8 = 18 ⟹ 3 és 9)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-slate-100">6, 12, 15, 18</td>
                  <td className="py-2 px-3 text-slate-700 dark:text-slate-300">Relatív prím tényezők: 6 (2 és 3), 12 (3 és 4), 15 (3 és 5), 18 (2 és 9)</td>
                  <td className="py-2 px-3 font-mono text-slate-500">180 osztható mindegyikkel</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TheoryCard>

        <TheoryCard title="A számelmélet alaptétele és az osztók száma: d(n)">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            Minden 1-nél nagyobb összetett szám egyértelműen felírható prímszámok szorzataként:
            <MathText>n = p₁^α₁ · p₂^α₂ · ... · pₖ^αₖ</MathText>.
          </p>
          <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-2 mb-3">
            <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 block">
              Az osztók száma képlet: d(n)
            </span>
            <p className="text-xs text-indigo-800 dark:text-indigo-300 font-mono">
              d(n) = (α₁ + 1)(α₂ + 1)...(αₖ + 1)
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Példa: <MathText>72 = 2³ · 3² ⟹ d(72) = (3 + 1)(2 + 1) = 4 · 3 = 12</MathText> osztó.
            </p>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 font-medium">
            ✨ <strong>Fontos tétel:</strong> Egy számnak akkor és csak akkor van <strong>páratlan sok osztója</strong>, ha a szám <strong>négyzetszám</strong> (mivel ekkor minden kitevő páros, így a tényezők páratlanok).
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZEKCIÓ: LNKO, LKKT ÉS JÁTÉKOK */}
      <TheorySection
        number={3}
        title="3. LNKO, LKKT és Stratégiai Számelmélet"
        badgeColor="slate"
        icon={<Scale className="w-6 h-6 text-slate-700 dark:text-slate-300" />}
      >
        <TheoryCard title="A Legnagyobb Közös Osztó és Legkisebb Közös Többszörös">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="p-3.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800">
              <span className="text-xs font-bold text-violet-900 dark:text-violet-200 block mb-1">
                LNKO (Legnagyobb Közös Osztó)
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A <strong>közös</strong> prímtényezők a <strong>kisebb</strong> kitevőn összeszorozva. Ha <MathText>LNKO(a, b) = 1</MathText>, a számok <strong>relatív prímek</strong>.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <span className="text-xs font-bold text-purple-900 dark:text-purple-200 block mb-1">
                LKKT (Legkisebb Közös Többszörös)
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Az <strong>összes előforduló</strong> prímtényező a <strong>nagyobb</strong> kitevőn összeszorozva. Alkalmazása: közös nevezőre hozás, körforgások találkozása.
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-center font-mono font-bold text-xs sm:text-sm text-amber-900 dark:text-amber-200">
            LNKO(a, b) · LKKT(a, b) = a · b
          </div>
        </TheoryCard>

        <TheoryCard title="Matematikai játékok és az oszthatóság összefonódása">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            A számelméletben gyökereznek a kétszemélyes determinisztikus játékok stratégiái:
          </p>
          <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside">
            <li><strong>21-es és moduláris játékok:</strong> A ciklus hossza <MathText>k + 1</MathText>. A kulcsszámok a célból visszafelé <MathText>cél - m · (k + 1)</MathText> alakúak.</li>
            <li><strong>Paritási invariánsok:</strong> Műveletek során a számok összegének vagy szorzatának párossága megmaradhat, kizárva lehetetlen végállapotokat.</li>
            <li><strong>Szimmetria:</strong> Két egyenlő kupac esetén a második játékos mindig le tudja másolni a kezdő lépéseit.</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      {/* TÉVHITEK ÉS CSAPDÁK */}
      <TheoryTrapBox
        traps={[
          {
            title: 'Zárójel nélküli negatív alap hatványa',
            description: 'A -3² nem egyenlő 9-cel! A kitevő csak a számra vonatkozik, így -3² = -(3 · 3) = -9, míg (-3)² = +9.',
            correct: '(-3)² = +9, de -3² = -9'
          },
          {
            title: 'Azonos alapok szorzásánál az alapok megszorzása',
            description: '2³ · 2⁴ nem 4⁷! Az alap változatlan marad, csak a kitevők adódnak össze: 2³ · 2⁴ = 2³⁺⁴ = 2⁷ = 128.',
            correct: 'aⁿ · aᵐ = aⁿ⁺ᵐ (nem pedig (a·a)ⁿ⁺ᵐ)'
          },
          {
            title: 'Összetett oszthatósági szabály nem relatív prímekkel',
            description: 'Egy szám nem feltétlenül osztható 12-vel, ha osztható 2-vel és 6-tal! Pl. a 18 osztható 2-vel és 6-tal, de 12-vel nem, mert a 2 és 6 nem relatív prímek. A 12-höz 3 és 4 kell!',
            correct: 'Csak relatív prím tényezőkre bomlik szét a szabály!'
          }
        ]}
      />

      {/* SZEKCIÓ VÉGÉN: INTERAKTÍV FEJEZETI SZÁMELMÉLETI LABOR */}
      <div className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white border-2 border-slate-700 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                Fejezeti Számelméleti és Hatvány Labor
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 uppercase tracking-wider">
                  Minden az egyben
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Állíts be két számot, és vizsgáld meg a teljes számelméleti és hatványozási kapcsolataikat!
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setNumA(36);
              setNumB(48);
            }}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600 gap-1.5 self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Alapértékek (36 és 48)
          </Button>
        </div>

        {/* Input sliders / numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Első szám (a)</span>
              <span className="font-mono text-lg font-black text-indigo-300">{analysis.a}</span>
            </div>
            <input
              type="range"
              min="2"
              max="200"
              value={analysis.a}
              onChange={(e) => setNumA(Number(e.target.value))}
              className="w-full accent-indigo-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>2</span>
              <span>100</span>
              <span>200</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Második szám (b)</span>
              <span className="font-mono text-lg font-black text-purple-300">{analysis.b}</span>
            </div>
            <input
              type="range"
              min="2"
              max="200"
              value={analysis.b}
              onChange={(e) => setNumB(Number(e.target.value))}
              className="w-full accent-purple-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>2</span>
              <span>100</span>
              <span>200</span>
            </div>
          </div>
        </div>

        {/* Analysis Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* A felbontása */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">» a « Prímfelbontása & Osztói</span>
            <div className="font-mono text-sm text-indigo-300 font-bold mb-1">
              {analysis.a} = {analysis.factorsA.map(f => `${f.prime}${f.exp > 1 ? `^${f.exp}` : ''}`).join(' · ') || analysis.a}
            </div>
            <div className="text-xs text-slate-400">
              d({analysis.a}) = <strong className="text-white">{analysis.numDivisorsA}</strong> osztó
              {analysis.numDivisorsA % 2 !== 0 && <span className="ml-1 text-amber-400 font-bold">(Négyzetszám!)</span>}
            </div>
          </div>

          {/* B felbontása */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">» b « Prímfelbontása & Osztói</span>
            <div className="font-mono text-sm text-purple-300 font-bold mb-1">
              {analysis.b} = {analysis.factorsB.map(f => `${f.prime}${f.exp > 1 ? `^${f.exp}` : ''}`).join(' · ') || analysis.b}
            </div>
            <div className="text-xs text-slate-400">
              d({analysis.b}) = <strong className="text-white">{analysis.numDivisorsB}</strong> osztó
              {analysis.numDivisorsB % 2 !== 0 && <span className="ml-1 text-amber-400 font-bold">(Négyzetszám!)</span>}
            </div>
          </div>

          {/* LNKO és LKKT */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">LNKO és LKKT</span>
            <div className="text-xs text-slate-300 space-y-1">
              <div>LNKO({analysis.a}, {analysis.b}) = <strong className="text-emerald-400 font-mono text-sm">{analysis.gcdVal}</strong></div>
              <div>LKKT({analysis.a}, {analysis.b}) = <strong className="text-amber-400 font-mono text-sm">{analysis.lcmVal}</strong></div>
              <div className="text-[11px]">
                {analysis.isRelPrime ? (
                  <span className="text-emerald-400 font-semibold">✓ Relatív prímek</span>
                ) : (
                  <span className="text-slate-400">Közös osztók száma &gt; 1</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Identity verification & Scientific notation */}
        <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <div>
            <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider block">
              Alaptétel és Normálalak Ellenőrzése:
            </span>
            <p className="text-xs text-slate-300 font-mono mt-0.5">
              LNKO · LKKT = {analysis.gcdVal} · {analysis.lcmVal} = <strong>{analysis.gcdVal * analysis.lcmVal}</strong> | a · b = {analysis.a} · {analysis.b} = <strong>{analysis.product}</strong>
            </p>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 font-mono text-xs text-amber-300 font-bold">
            Szorzat normálalakban: {analysis.sciStr}
          </div>
        </div>
      </div>
    </TheoryTemplate>
  );
};

export default PowersSummaryTheory;
