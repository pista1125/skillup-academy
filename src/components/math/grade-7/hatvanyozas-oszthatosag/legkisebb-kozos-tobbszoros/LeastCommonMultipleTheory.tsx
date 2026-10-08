import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryTrapBox
} from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  TrendingUp,
  Calculator,
  ShieldCheck,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  Split,
  Layers,
  ArrowRight,
  Clock,
  HelpCircle,
  Hash
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeastCommonMultipleTheoryProps {
  onBack: () => void;
  onStartQuiz: () => void;
}

interface FactorPower {
  prime: number;
  exponent: number;
}

function getPrimeFactors(num: number): FactorPower[] {
  if (num <= 1) return [];
  const counts: Record<number, number> = {};
  let temp = num;
  let d = 2;
  while (temp > 1) {
    while (temp % d === 0) {
      counts[d] = (counts[d] || 0) + 1;
      temp /= d;
    }
    d++;
    if (d * d > temp && temp > 1) {
      counts[temp] = (counts[temp] || 0) + 1;
      break;
    }
  }
  return Object.entries(counts)
    .map(([p, exp]) => ({ prime: parseInt(p, 10), exponent: exp }))
    .sort((a, b) => a.prime - b.prime);
}

function computeGcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function computeLcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return (Math.abs(a) * Math.abs(b)) / computeGcd(a, b);
}

export const LeastCommonMultipleTheory: React.FC<LeastCommonMultipleTheoryProps> = ({
  onBack,
  onStartQuiz,
}) => {
  // Interactive Lab State: Two numbers to compare
  const [numAInput, setNumAInput] = useState<string>('24');
  const [numBInput, setNumBInput] = useState<string>('36');

  const parsedA = useMemo(() => {
    const val = parseInt(numAInput, 10);
    if (isNaN(val) || val < 1 || val > 10000) return 24;
    return val;
  }, [numAInput]);

  const parsedB = useMemo(() => {
    const val = parseInt(numBInput, 10);
    if (isNaN(val) || val < 1 || val > 10000) return 36;
    return val;
  }, [numBInput]);

  // Calculations for interactive lab
  const labData = useMemo(() => {
    const a = parsedA;
    const b = parsedB;
    const gcdVal = computeGcd(a, b);
    const lcmVal = computeLcm(a, b);
    const isRelPrime = gcdVal === 1;

    const factorsA = getPrimeFactors(a);
    const factorsB = getPrimeFactors(b);

    const mapA: Record<number, number> = {};
    factorsA.forEach(f => { mapA[f.prime] = f.exponent; });

    const mapB: Record<number, number> = {};
    factorsB.forEach(f => { mapB[f.prime] = f.exponent; });

    const allPrimes = Array.from(new Set([...Object.keys(mapA), ...Object.keys(mapB)]))
      .map(Number)
      .sort((x, y) => x - y);

    const comparisonMatrix = allPrimes.map(p => {
      const expA = mapA[p] || 0;
      const expB = mapB[p] || 0;
      const minExp = Math.min(expA, expB);
      const maxExp = Math.max(expA, expB);
      return {
        prime: p,
        expA,
        expB,
        minExp,
        maxExp
      };
    });

    const canonicalA = factorsA.length > 0
      ? factorsA.map(f => (f.exponent === 1 ? `${f.prime}` : `${f.prime}^${f.exponent}`)).join(' · ')
      : '1';

    const canonicalB = factorsB.length > 0
      ? factorsB.map(f => (f.exponent === 1 ? `${f.prime}` : `${f.prime}^${f.exponent}`)).join(' · ')
      : '1';

    const lcmFormula = comparisonMatrix
      .filter(item => item.maxExp > 0)
      .map(item => (item.maxExp === 1 ? `${item.prime}` : `${item.prime}^${item.maxExp}`))
      .join(' · ') || '1';

    // First 5 common multiples
    const multiplesSample = [1, 2, 3, 4, 5].map(k => k * lcmVal);

    // Fraction addition demonstration: 1/a + 1/b with common denominator = lcm
    const multA = lcmVal / a;
    const multB = lcmVal / b;
    const sumNumerator = multA + multB;
    const sumGcd = computeGcd(sumNumerator, lcmVal);
    const finalNum = sumNumerator / sumGcd;
    const finalDen = lcmVal / sumGcd;

    return {
      a,
      b,
      gcdVal,
      lcmVal,
      productAB: a * b,
      productGcdLcm: gcdVal * lcmVal,
      isRelPrime,
      canonicalA,
      canonicalB,
      lcmFormula,
      comparisonMatrix,
      multiplesSample,
      multA,
      multB,
      sumNumerator,
      finalNum,
      finalDen
    };
  }, [parsedA, parsedB]);

  return (
    <TheoryTemplate
      title="9. Legkisebb közös többszörös (LKKT)"
      subtitle="Két vagy több szám közös többszörösei, az LKKT meghatározása a prímtényezős felbontásból (a legnagyobb kitevő elve), az LNKO · LKKT = a · b alaptétel és a közös nevező."
      badgeText="7. Osztály • Matematika IV. Témakör • 9. Lecke"
      topicBadge="Hatványozás és oszthatóság"
      emoji="📈"
      themeColor="purple"
      documentId="g7-powers-lcm-theory-doc"
      pdfFilename="7_osztaly_legkisebb_kozos_tobbszoros.pdf"
      quickRule={{
        label: 'Fontos Szabályok – LKKT és Közös Nevező',
        formula: 'LKKT(a, b): összes prím legnagyobb kitevőn | LNKO · LKKT = a · b | Relatív prímeknél: LKKT = a · b'
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      readTime="18 perc"
    >
      {/* 1. SZEKCIÓ: A LEGKISEBB KÖZÖS TÖBBSZÖRÖS DEFINÍCIÓJA */}
      <TheorySection
        number={1}
        title="1. A Legkisebb Közös Többszörös Fogalma és Keresése"
        badgeColor="purple"
        icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
      >
        <TheoryCard title="Mit jelent a közös többszörös és miért a legkisebbet keressük?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Míg egy pozitív egész számnak csak véges sok osztója van, addig <strong>pozitív többszöröse végtelen sok létezik</strong> (pl. a 6 többszörösei: 6, 12, 18, 24, ...). Ha két szám közös többszöröseit keressük, azokból is végtelen sok van. Ezért a legnagyobbat lehetetlen megnevezni — a matematika így a <strong>legkisebb pozitív közös többszörösre</strong> épít!
          </p>

          <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/30 border-2 border-purple-200 dark:border-purple-800 space-y-2 mb-4 text-center">
            <span className="text-xs font-black uppercase tracking-wider text-purple-800 dark:text-purple-300">
              A Legkisebb Közös Többszörös Definíciója
            </span>
            <div className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
              Két vagy több pozitív egész szám pozitív közös többszörösei közül a legkisebbet a számok <strong>legkisebb közös többszörösének</strong> nevezzük.
            </div>
            <div className="text-base sm:text-lg font-mono font-black text-purple-700 dark:text-purple-300">
              Jelölése: LKKT(a, b) &nbsp;vagy röviden:&nbsp; [a, b]
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Közvetlen felsorolás */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>1. Módszer: Többszörösök sorozata</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Kis számok esetén egyszerűen kiírjuk a pozitív többszörösöket sorban mindkét számnál, amíg meg nem találjuk az első egyezést:
              </p>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <div>6 többszörösei: 6, 12, 18, <strong>24</strong>, 30, 36, ...</div>
                <div>8 többszörösei: 8, 16, <strong>24</strong>, 32, 40, ...</div>
                <div className="text-purple-700 dark:text-purple-300 font-bold pt-1 border-t border-slate-200 dark:border-slate-700">
                  Első közös többszörös: LKKT(6, 8) = 24
                </div>
              </div>
            </div>

            {/* Alaptulajdonságok */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-purple-800 dark:text-purple-300 uppercase tracking-wider">
                Fontos Alaptulajdonságok
              </span>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Alsó korlát:</strong> Az LKKT sosem lehet kisebb a nagyobbik számnál: <MathText>LKKT(a, b) ≥ max(a, b)</MathText>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Ha az egyik osztója a másiknak:</strong> Ha <MathText>a | b</MathText>, akkor <MathText>LKKT(a, b) = b</MathText>. Pl. LKKT(6, 18) = 18!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Az összes közös többszörös:</strong> Két szám BÁRMELY közös többszöröse az LKKT-nek is többszöröse (pl. 24, 48, 72, 96...).</span>
                </li>
              </ul>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: LKKT KISZÁMÍTÁSA PRÍMTÉNYEZŐS FELBONTÁSBÓL */}
      <TheorySection
        number={2}
        title="2. LKKT Kiszámítása Prímtényezős Felbontással (A legnagyobb kitevő elve)"
        badgeColor="purple"
        icon={<Calculator className="w-6 h-6 text-purple-600" />}
      >
        <TheoryCard title="Hogyan kapjuk meg az LKKT-t prímfelbontásból?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Nagy számoknál (pl. 360 és 840) a többszörösök kiírása túlságosan hosszadalmas lenne. A prímtényezős felbontás segítségével azonban azonnal felépíthetjük a legkisebb közös többszöröst:
          </p>

          <div className="p-5 rounded-2xl bg-purple-500/10 border-2 border-purple-300 dark:border-purple-700/60 text-center space-y-2 mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-purple-800 dark:text-purple-300">
              A Legnagyobb Kitevő Szabálya
            </span>
            <div className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
              Két szám legkisebb közös többszörösét úgy kapjuk meg, hogy összeszorozzuk az <br />
              <strong className="text-purple-700 dark:text-purple-300">ÖSSZES előforduló prímtényezőt a LEGNAGYOBB kitevőjükön</strong>!
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              Nem csak a közös prímeket vesszük! Azokat is bele kell szorozni, amelyek csak az egyik számban szerepelnek!
            </p>
          </div>

          {/* Részletes levezetés */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="font-bold text-xs text-purple-800 dark:text-purple-300 uppercase tracking-wider">
                Mesterpélda: LKKT(360, 840) levezetése 4 lépésben
              </span>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="font-bold text-purple-700 dark:text-purple-300">1. Lépés: Prímfelbontás</div>
                  <div className="font-mono text-slate-600 dark:text-slate-300">
                    360 = 2³ · 3² · 5¹<br />
                    840 = 2³ · 3¹ · 5¹ · 7¹
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="font-bold text-purple-700 dark:text-purple-300">2. Lépés: Összes prím</div>
                  <div className="text-slate-600 dark:text-slate-300">
                    Minden előforduló prím:<br />
                    <strong>2, 3, 5, 7</strong> (a 7 is kell!)
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="font-bold text-purple-700 dark:text-purple-300">3. Lépés: Nagyobb kitevők</div>
                  <div className="font-mono text-slate-600 dark:text-slate-300">
                    2: max(3, 3) = <strong>2³</strong><br />
                    3: max(2, 1) = <strong>3²</strong><br />
                    5: max(1, 1) = <strong>5¹</strong><br />
                    7: max(0, 1) = <strong>7¹</strong>
                  </div>
                </div>

                <div className="p-3 bg-purple-100 dark:bg-purple-950/60 rounded-xl border border-purple-300 dark:border-purple-700 space-y-1 font-bold">
                  <div className="text-purple-900 dark:text-purple-200">4. Lépés: Szorzás</div>
                  <div className="font-mono text-purple-800 dark:text-purple-300 text-sm">
                    2³ · 3² · 5¹ · 7¹<br />
                    = 8 · 9 · 5 · 7<br />
                    = <strong>2520</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Halmazos összehasonlítás LNKO vs LKKT */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-violet-500/10 border border-purple-200 dark:border-purple-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-800 dark:text-slate-200">
                <Layers className="w-4 h-4 text-purple-600" />
                <span>Halmazos szemlélet (Venn-diagram): Metszet vs Unió</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <strong className="text-violet-700 dark:text-violet-300">LNKO = METSZET (A ∩ B)</strong><br />
                  Csak a közös prímek a kisebb (min) kitevőn.
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <strong className="text-purple-700 dark:text-purple-300">LKKT = UNIÓ (A ∪ B)</strong><br />
                  Minden prím a nagyobb (max) kitevőn.
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZEKCIÓ: AZ ALAPTÉTEL ÉS A GYAKORLATI ALKALMAZÁSOK */}
      <TheorySection
        number={3}
        title="3. Az LNKO · LKKT = a · b Alaptétel és a Közös Nevező"
        badgeColor="purple"
        icon={<Sparkles className="w-6 h-6 text-purple-600" />}
      >
        <TheoryCard title="A számelmélet egyik legszebb összefüggése és mindennapi haszna">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Létezik egy csodálatos kapcsolat az osztók és a többszörösök világa között, amely bármely két pozitív egész számra érvényes:
          </p>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-purple-500/10 border-2 border-purple-300 dark:border-purple-700/60 text-center space-y-2 mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-purple-800 dark:text-purple-300">
              A Két Számra Érvényes Alaptétel
            </span>
            <div className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
              Bármely két pozitív egész szám esetén a legnagyobb közös osztójuk és a legkisebb közös többszörösük szorzata egyenlő a két szám szorzatával:
            </div>
            <div className="text-base sm:text-xl font-mono font-black text-purple-700 dark:text-purple-300">
              LNKO(a, b) · LKKT(a, b) = a · b
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              <strong>Közvetlen következmény:</strong> Ha két szám relatív prím (LNKO = 1), akkor <MathText>LKKT(a, b) = a · b</MathText>! (Pl. LKKT(8, 9) = 72).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Alkalmazás: Törtek közös nevezője */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-purple-800 dark:text-purple-300 uppercase tracking-wider">
                1. Alkalmazás: A Legkisebb Közös Nevező
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Különböző nevezőjű törtek összeadásakor és kivonásakor a nevezők <strong>legkisebb közös többszöröse</strong> adja meg a legkisebb közös nevezőt. Ezzel a módszerrel kerülhetjük el a feleslegesen óriási számokkal való számolást:
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
                <div>Példa: 5/12 + 7/18 = ?</div>
                <div className="text-slate-500">LKKT(12, 18) = 36 (a legkisebb közös nevező)</div>
                <div className="text-purple-700 dark:text-purple-300 font-bold">
                  (5·3)/36 + (7·2)/36 = 15/36 + 14/36 = 29/36
                </div>
              </div>
            </div>

            {/* 2. Alkalmazás: Periodikus találkozások */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-purple-800 dark:text-purple-300 uppercase tracking-wider">
                2. Alkalmazás: Periodikus Események Találkozása
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Mikor indulnak újra egyszerre a buszok? Mikor villannak fel együtt a jelzőfények?
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <div className="text-slate-600 dark:text-slate-300">
                  Az egyik járat 15 percenként, a másik 20 percenként indul.
                </div>
                <div className="font-mono text-purple-700 dark:text-purple-300 font-bold">
                  LKKT(15, 20) = 60 perc (pontosan 1 óra múlva!)
                </div>
                <div className="text-[11px] text-slate-500">
                  Az első járatnak ez a 4. köre (4 · 15 = 60), a másodiknak a 3. köre (3 · 20 = 60).
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>

        {/* Tipikus tévhitek */}
        <TheoryTrapBox
          title="Gyakori buktatók a Legkisebb Közös Többszörös témakörben"
          traps={[
            {
              wrong: 'Az LKKT mindig egyenlő a két szám szorzatával (a · b).',
              correct: 'Csak akkor egyenlő a szorzattal, ha a két szám relatív prím (LNKO = 1)! Ha van közös osztójuk, az LKKT jóval kisebb a szorzatnál (pl. LKKT(6, 8) = 24, nem 48!).'
            },
            {
              wrong: 'Az LNKO · LKKT = a · b tétel három vagy több számra is érvényes.',
              correct: 'Nem igaz! Három szám esetén (a, b, c) az LNKO · LKKT szorzat általában NEM egyenlő a · b · c-vel! Ez a tétel kizárólag KÉT számra igaz.'
            },
            {
              wrong: 'Összekeverni az LNKO és LKKT szabályát: melyiknél van a min és a max kitevő?',
              correct: 'Megjegyzési trükk: Osztó = kisebb szám ➔ KISEBB kitevők (min). Többszörös = nagyobb szám ➔ NAGYOBB kitevők (max).'
            }
          ]}
        />
      </TheorySection>

      {/* INTERAKTÍV LKKT ÉS KÖZÖS NEVEZŐ LABORATÓRIUM */}
      <div className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-violet-600/10 border-2 border-purple-300 dark:border-purple-700/60 shadow-lg space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-200 dark:border-purple-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Interaktív LKKT és Közös Nevező Laboratórium
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Írj be két számot: figyeld meg a prímfelbontások legnagyobb kitevőit, az LNKO · LKKT = a · b tételt és a törtek közös nevezőre hozását!
              </p>
            </div>
          </div>
        </div>

        {/* Gyors mintapárok */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Gyakori mintapárok:
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { a: 12, b: 18, label: '(12; 18)' },
              { a: 24, b: 36, label: '(24; 36)' },
              { a: 15, b: 20, label: '(15; 20)' },
              { a: 8, b: 9, label: '(8; 9) relatív prím' },
              { a: 60, b: 84, label: '(60; 84)' },
              { a: 14, b: 21, label: '(14; 21)' },
              { a: 15, b: 45, label: '(15; 45) osztója' },
              { a: 360, b: 840, label: '(360; 840)' }
            ].map(pair => (
              <Button
                key={pair.label}
                size="sm"
                variant={parsedA === pair.a && parsedB === pair.b ? 'default' : 'outline'}
                onClick={() => {
                  setNumAInput(pair.a.toString());
                  setNumBInput(pair.b.toString());
                }}
                className={cn(
                  'h-8 px-3 rounded-xl font-bold text-xs',
                  parsedA === pair.a && parsedB === pair.b && 'bg-purple-600 hover:bg-purple-700 text-white'
                )}
              >
                {pair.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Számbeviteli mezők */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              "a" szám értéke:
            </label>
            <Input
              type="number"
              min={1}
              max={10000}
              value={numAInput}
              onChange={e => setNumAInput(e.target.value)}
              className="font-mono text-base font-bold bg-white dark:bg-slate-900 border-purple-300 dark:border-purple-700 rounded-xl"
              placeholder="pl. 24"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              "b" szám értéke:
            </label>
            <Input
              type="number"
              min={1}
              max={10000}
              value={numBInput}
              onChange={e => setNumBInput(e.target.value)}
              className="font-mono text-base font-bold bg-white dark:bg-slate-900 border-purple-300 dark:border-purple-700 rounded-xl"
              placeholder="pl. 36"
            />
          </div>
        </div>

        {/* Eredmény kártyák */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          {/* Fő LKKT Kártya */}
          <div className="md:col-span-5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="font-black text-xs text-purple-800 dark:text-purple-300 uppercase tracking-wider">
                Eredmény és Kiszámítás:
              </span>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-[11px] font-bold",
                labData.isRelPrime
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                  : "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
              )}>
                {labData.isRelPrime ? 'RELATÍV PRÍM (LKKT = a · b)' : 'ÖSSZETETT KAPCSOLAT'}
              </span>
            </div>

            <div className="text-center py-2 space-y-1">
              <div className="text-xs text-slate-500">Legkisebb közös többszörös:</div>
              <div className="text-3xl font-mono font-black text-purple-700 dark:text-purple-300">
                LKKT({labData.a}, {labData.b}) = {labData.lcmVal}
              </div>
              <div className="text-xs text-slate-500 pt-1">
                Képlettel: {labData.lcmFormula} = <strong>{labData.lcmVal}</strong>
              </div>
            </div>

            {/* Az Alaptétel ellenőrzése */}
            <div className="p-3 bg-purple-50/70 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800/80 space-y-1 text-xs">
              <div className="font-bold text-purple-900 dark:text-purple-200 flex items-center justify-between">
                <span>Alaptétel ellenőrzése:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ TELJESÜL</span>
              </div>
              <div className="font-mono text-slate-700 dark:text-slate-300">
                LNKO · LKKT = {labData.gcdVal} · {labData.lcmVal} = <strong>{labData.productGcdLcm}</strong>
              </div>
              <div className="font-mono text-slate-700 dark:text-slate-300">
                a · b = {labData.a} · {labData.b} = <strong>{labData.productAB}</strong>
              </div>
            </div>

            {/* Közös többszörösök mintája */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Első pozitív közös többszörösök:
              </span>
              <div className="flex flex-wrap gap-1 font-mono text-xs">
                {labData.multiplesSample.map((m, idx) => (
                  <span
                    key={m}
                    className={cn(
                      "px-2 py-0.5 rounded-lg border",
                      idx === 0
                        ? "bg-purple-200 text-purple-900 font-black border-purple-400"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                    )}
                  >
                    {m} {idx === 0 ? '(LKKT)' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Részletes kitevő mátrix és törtek közös nevezője */}
          <div className="md:col-span-7 space-y-4">
            {/* Prímtényezők összehasonlító táblázata */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 space-y-3">
              <span className="font-bold text-xs text-purple-800 dark:text-purple-300 uppercase tracking-wider block">
                Prímtényezők Kitevő-Összehasonlítása:
              </span>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg flex justify-between items-center">
                  <span><strong>{labData.a}</strong> felbontása:</span>
                  <span className="font-bold text-purple-700 dark:text-purple-300">{labData.canonicalA}</span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg flex justify-between items-center">
                  <span><strong>{labData.b}</strong> felbontása:</span>
                  <span className="font-bold text-purple-700 dark:text-purple-300">{labData.canonicalB}</span>
                </div>
              </div>

              {/* Mátrix */}
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-xs text-center border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300">
                      <th className="py-2 text-left">Prímalap</th>
                      {labData.comparisonMatrix.map(item => (
                        <th key={item.prime} className="py-2 px-2 font-mono text-purple-700 dark:text-purple-300">
                          {item.prime}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="font-mono divide-y divide-slate-100 dark:divide-slate-800">
                    <tr>
                      <td className="py-2 text-left font-sans text-slate-500">"{labData.a}" kitevője</td>
                      {labData.comparisonMatrix.map(item => (
                        <td key={item.prime} className="py-2 px-2">
                          {item.expA}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 text-left font-sans text-slate-500">"{labData.b}" kitevője</td>
                      {labData.comparisonMatrix.map(item => (
                        <td key={item.prime} className="py-2 px-2">
                          {item.expB}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-purple-50 dark:bg-purple-950/40 font-bold">
                      <td className="py-2 text-left font-sans text-purple-900 dark:text-purple-200">
                        max kitevő (LKKT)
                      </td>
                      {labData.comparisonMatrix.map(item => (
                        <td key={item.prime} className="py-2 px-2 text-purple-700 dark:text-purple-300 font-black text-sm">
                          {item.maxExp}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Közös nevező bemutató */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 space-y-2">
              <span className="font-bold text-xs text-purple-800 dark:text-purple-300 uppercase tracking-wider block">
                Gyakorlati Példa: Törtek Összeadása Közös Nevezővel
              </span>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1.5">
                <div className="text-slate-600 dark:text-slate-300">
                  Számítsuk ki: 1/{labData.a} + 1/{labData.b}
                </div>
                <div className="text-purple-700 dark:text-purple-300 font-bold text-sm">
                  = ({labData.multA} / {labData.lcmVal}) + ({labData.multB} / {labData.lcmVal}) = {labData.sumNumerator} / {labData.lcmVal}
                </div>
                <div className="text-[11px] text-slate-500">
                  Egyszerűsítve: <strong>{labData.finalNum} / {labData.finalDen}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TheoryTemplate>
  );
};

export default LeastCommonMultipleTheory;
