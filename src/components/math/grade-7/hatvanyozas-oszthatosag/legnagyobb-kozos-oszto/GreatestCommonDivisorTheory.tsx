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
  Target,
  Calculator,
  ShieldCheck,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  Split,
  Layers,
  ArrowRight,
  HelpCircle,
  Hash
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GreatestCommonDivisorTheoryProps {
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

export const GreatestCommonDivisorTheory: React.FC<GreatestCommonDivisorTheoryProps> = ({
  onBack,
  onStartQuiz,
}) => {
  // Interactive Lab State: Two numbers to compare
  const [numAInput, setNumAInput] = useState<string>('60');
  const [numBInput, setNumBInput] = useState<string>('84');

  const parsedA = useMemo(() => {
    const val = parseInt(numAInput, 10);
    if (isNaN(val) || val < 1 || val > 10000) return 60;
    return val;
  }, [numAInput]);

  const parsedB = useMemo(() => {
    const val = parseInt(numBInput, 10);
    if (isNaN(val) || val < 1 || val > 10000) return 84;
    return val;
  }, [numBInput]);

  // Calculations for interactive lab
  const labData = useMemo(() => {
    const a = parsedA;
    const b = parsedB;
    const gcdVal = computeGcd(a, b);
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

    const commonPrimesData = allPrimes
      .map(p => {
        const expA = mapA[p] || 0;
        const expB = mapB[p] || 0;
        const minExp = Math.min(expA, expB);
        return {
          prime: p,
          expA,
          expB,
          minExp,
          isCommon: minExp > 0
        };
      });

    const gcdFactors = commonPrimesData.filter(item => item.isCommon);

    const canonicalA = factorsA.length > 0
      ? factorsA.map(f => (f.exponent === 1 ? `${f.prime}` : `${f.prime}^${f.exponent}`)).join(' · ')
      : '1';

    const canonicalB = factorsB.length > 0
      ? factorsB.map(f => (f.exponent === 1 ? `${f.prime}` : `${f.prime}^${f.exponent}`)).join(' · ')
      : '1';

    const gcdFormula = gcdFactors.length > 0
      ? gcdFactors.map(f => (f.minExp === 1 ? `${f.prime}` : `${f.prime}^${f.minExp}`)).join(' · ')
      : '1';

    const simplifiedNum = a / gcdVal;
    const simplifiedDen = b / gcdVal;

    // Divisors of a and b
    const divisorsA: number[] = [];
    for (let i = 1; i <= a; i++) {
      if (a % i === 0) divisorsA.push(i);
    }

    const divisorsB: number[] = [];
    for (let i = 1; i <= b; i++) {
      if (b % i === 0) divisorsB.push(i);
    }

    const commonDivisors = divisorsA.filter(d => divisorsB.includes(d));

    return {
      a,
      b,
      gcdVal,
      isRelPrime,
      canonicalA,
      canonicalB,
      gcdFormula,
      simplifiedNum,
      simplifiedDen,
      divisorsA,
      divisorsB,
      commonDivisors,
      commonPrimesData
    };
  }, [parsedA, parsedB]);

  return (
    <TheoryTemplate
      title="8. Legnagyobb közös osztó (LNKO)"
      subtitle="Két vagy több szám közös osztóinak felderítése, az LNKO kiszámítása prímfelbontással (a legkisebb kitevők szabálya), a relatív prímek világa és a törtek egyszerűsítése."
      badgeText="7. Osztály • Matematika IV. Témakör • 8. Lecke"
      topicBadge="Hatványozás és oszthatóság"
      emoji="🎯"
      themeColor="violet"
      documentId="g7-powers-gcd-theory-doc"
      pdfFilename="7_osztaly_legnagyobb_kozos_oszto.pdf"
      quickRule={{
        label: 'Fontos Szabályok – LNKO és Relatív Prímek',
        formula: 'LNKO(a, b): közös prímek legkisebb kitevőn | LNKO(a, b) = 1 ⟺ relatív prímek | Tört egyszerűsítés: a/b : LNKO'
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      readTime="18 perc"
    >
      {/* 1. SZEKCIÓ: A LEGNAGYOBB KÖZÖS OSZTÓ DEFINÍCIÓJA */}
      <TheorySection
        number={1}
        title="1. A Legnagyobb Közös Osztó Fogalma és Keresése"
        badgeColor="violet"
        icon={<Target className="w-6 h-6 text-violet-600" />}
      >
        <TheoryCard title="Mit jelent a közös osztó és melyik a legnagyobb közülük?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Gyakran felmerül a kérdés: ha több különböző mennyiséget (pl. 24 db piros és 36 db kék ceruzát) szeretnénk egyenlő dobozokba elosztani úgy, hogy semmi se maradjon ki, mekkora lehet a legnagyobb közös csomagméret? Ekkor olyan számot keresünk, amely <strong>mindkét számnak osztója</strong>.
          </p>

          <div className="p-4 rounded-2xl bg-violet-50/80 dark:bg-violet-950/30 border-2 border-violet-200 dark:border-violet-800 space-y-2 mb-4 text-center">
            <span className="text-xs font-black uppercase tracking-wider text-violet-800 dark:text-violet-300">
              A Legnagyobb Közös Osztó Definíciója
            </span>
            <div className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
              Két vagy több pozitív egész szám közös osztói közül a legnagyobbat a számok <strong>legnagyobb közös osztójának</strong> nevezzük.
            </div>
            <div className="text-base sm:text-lg font-mono font-black text-violet-700 dark:text-violet-300">
              Jelölése: LNKO(a, b) &nbsp;vagy röviden:&nbsp; (a, b)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Közvetlen felsorolásos módszer */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-violet-600" />
                <span>1. Módszer: Osztóhalmazok felírása</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Kis számok esetén egyszerűen kiírjuk mindkét szám összes osztóját növekvő sorrendben, megkeressük a közös elemeket, és kiválasztjuk a legnagyobbat:
              </p>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1.5 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <div>24 osztói: {'{1, 2, 3, 4, 6, 8, 12, 24}'}</div>
                <div>36 osztói: {'{1, 2, 3, 4, 6, 9, 12, 18, 36}'}</div>
                <div className="text-violet-700 dark:text-violet-300 font-bold pt-1 border-t border-slate-200 dark:border-slate-700">
                  Közös osztók: {'{1, 2, 3, 4, 6, 12}'} ➔ LNKO = 12
                </div>
              </div>
            </div>

            {/* Tulajdonságok */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-violet-800 dark:text-violet-300 uppercase tracking-wider">
                Fontos Alaptulajdonságok
              </span>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-violet-600 font-bold">•</span>
                  <span><strong>Az 1 mindig közös osztó:</strong> Bármely két pozitív egész számnak létezik közös osztója, hiszen az 1 mindegyiket osztja (LNKO legalább 1).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-600 font-bold">•</span>
                  <span><strong>Felső korlát:</strong> LNKO(a, b) nem lehet nagyobb a kisebbik számnál: <MathText>LNKO(a, b) ≤ min(a, b)</MathText>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-600 font-bold">•</span>
                  <span><strong>Ha az egyik osztja a másikat:</strong> Ha <MathText>a | b</MathText>, akkor <MathText>LNKO(a, b) = a</MathText>. Pl. LNKO(6, 18) = 6!</span>
                </li>
              </ul>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: LNKO MEGHATÁROZÁSA PRÍMTÉNYEZŐS FELBONTÁSBÓL */}
      <TheorySection
        number={2}
        title="2. LNKO Kiszámítása Prímtényezős Felbontással (A legkisebb kitevő elve)"
        badgeColor="violet"
        icon={<Calculator className="w-6 h-6 text-violet-600" />}
      >
        <TheoryCard title="Hogyan számoljuk ki az LNKO-t nagy számok esetén gyorsan és tévedhetetlenül?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Nagy számoknál (pl. 360 és 840) az összes osztó felírása túl sok időt venne igénybe. A <strong>számelmélet alaptétele</strong> segítségével a prímtényezős felbontásból közvetlenül leolvashatjuk a legnagyobb közös osztót!
          </p>

          <div className="p-5 rounded-2xl bg-violet-500/10 border-2 border-violet-300 dark:border-violet-700/60 text-center space-y-2 mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-violet-800 dark:text-violet-300">
              A Legkisebb Kitevő Szabálya
            </span>
            <div className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
              Két szám legnagyobb közös osztóját úgy kapjuk meg, hogy összeszorozzuk a <br />
              <strong className="text-violet-700 dark:text-violet-300">KÖZÖS prímtényezőket az előforduló KISEBB kitevőjükön</strong>!
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              Nem közös prím nem kerülhet az LNKO-ba (mert az nem osztaná mindkét számot)!
            </p>
          </div>

          {/* Részletes levezetés lépésről lépésre */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="font-bold text-xs text-violet-800 dark:text-violet-300 uppercase tracking-wider">
                Mesterpélda: LNKO(360, 840) kiszámítása 4 egyszerű lépésben
              </span>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="font-bold text-violet-700 dark:text-violet-300">1. Lépés: Prímfelbontás</div>
                  <div className="font-mono text-slate-600 dark:text-slate-300">
                    360 = 2³ · 3² · 5¹<br />
                    840 = 2³ · 3¹ · 5¹ · 7¹
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="font-bold text-violet-700 dark:text-violet-300">2. Lépés: Közös prímek</div>
                  <div className="text-slate-600 dark:text-slate-300">
                    Közös alapok: <strong>2, 3, 5</strong><br />
                    A <strong>7</strong> nem közös (360-ban nincs)!
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="font-bold text-violet-700 dark:text-violet-300">3. Lépés: Kisebb kitevők</div>
                  <div className="font-mono text-slate-600 dark:text-slate-300">
                    2-esnél: min(3, 3) = <strong>2³</strong><br />
                    3-asnál: min(2, 1) = <strong>3¹</strong><br />
                    5-ösnél: min(1, 1) = <strong>5¹</strong>
                  </div>
                </div>

                <div className="p-3 bg-violet-100 dark:bg-violet-950/60 rounded-xl border border-violet-300 dark:border-violet-700 space-y-1 font-bold">
                  <div className="text-violet-900 dark:text-violet-200">4. Lépés: Szorzás</div>
                  <div className="font-mono text-violet-800 dark:text-violet-300 text-sm">
                    2³ · 3¹ · 5¹<br />
                    = 8 · 3 · 5<br />
                    = <strong>120</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Szemléltetés halmazokkal (Venn-diagram) */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-200 dark:border-violet-800 space-y-3">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-800 dark:text-slate-200">
                <Layers className="w-4 h-4 text-violet-600" />
                <span>Halmazos szemlélet (Venn-diagram): A prímtényezők metszete</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha elképzeljük a két szám prímtényezőit kártyákként egy-egy halmazban: az <strong>LNKO pontosan a két halmaz metszete</strong> (közös része)! Ami mindkét halmazban benne van, azok szorzata adja az LNKO-t.
              </p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZEKCIÓ: RELATÍV PRÍMEK ÉS TÖRTEK EGYSZERŰSÍTÉSE */}
      <TheorySection
        number={3}
        title="3. Relatív Prím Számok és a Törtek Egyszerűsítése"
        badgeColor="violet"
        icon={<Sparkles className="w-6 h-6 text-violet-600" />}
      >
        <TheoryCard title="Mit jelent a relatív prím fogalom és mire használjuk a mindennapokban?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Két szám kapcsolatában a legfontosabb határeset, amikor egyáltalán nincs 1-nél nagyobb közös osztójuk:
          </p>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-violet-500/10 border-2 border-violet-300 dark:border-violet-700/60 text-center space-y-2 mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-violet-800 dark:text-violet-300">
              Relatív Prímek Definíciója
            </span>
            <div className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
              Két pozitív egész számot <strong>relatív prímnek</strong> nevezünk, ha a legnagyobb közös osztójuk 1:
            </div>
            <div className="text-base sm:text-lg font-mono font-black text-violet-700 dark:text-violet-300">
              LNKO(a, b) = 1
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Relatív prím meglepő példák */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-violet-800 dark:text-violet-300 uppercase tracking-wider">
                Meglepő és fontos példák relatív prímekre
              </span>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <strong>Nem kell, hogy maguk a számok prímek legyenek!</strong><br />
                  A 8 = 2³ (összetett) és a 9 = 3² (összetett) ➔ <strong>LNKO(8, 9) = 1</strong>, tehát 8 és 9 relatív prímek!
                </li>
                <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <strong>Két szomszédos egész szám mindig relatív prím:</strong><br />
                  Bármilyen egész n esetén: <MathText>LNKO(n, n+1) = 1</MathText> (pl. 20 és 21, 99 és 100).
                </li>
                <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <strong>Két különböző prímszám mindig relatív prím:</strong><br />
                  Pl. LNKO(7, 13) = 1, LNKO(11, 23) = 1.
                </li>
              </ul>
            </div>

            {/* Alkalmazás: Tört egyszerűsítés */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-violet-800 dark:text-violet-300 uppercase tracking-wider">
                Gyakorlati Csúcsalkalmazás: Törtek Legegyszerűbb Alakja
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Egy törtet a lehető leggyorsabban úgy hozhatunk <strong>tovább nem egyszerűsíthető</strong> alakra, ha a számlálót és a nevezőt elosztjuk a legnagyobb közös osztójukkal:
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-2">
                <div className="text-slate-600 dark:text-slate-300">
                  Példa: Egyszerűsítsük a 360 / 840 törtet!
                </div>
                <div className="text-violet-700 dark:text-violet-300 font-bold text-sm">
                  (360 : 120) / (840 : 120) = 3 / 7
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Mivel LNKO(3, 7) = 1, a 3/7 tovább már semmivel nem egyszerűsíthető!
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>

        {/* Tipikus tévhitek */}
        <TheoryTrapBox
          title="Gyakori buktatók a Legnagyobb Közös Osztó témakörben"
          traps={[
            {
              wrong: 'A relatív prímeknek kötelezően prímszámoknak kell lenniük.',
              correct: 'Egyáltalán nem! A 8 és 9 mindketten összetett számok, de egymáshoz képest nincs 1-nél nagyobb közös osztójuk: LNKO(8, 9) = 1, tehát relatív prímek!'
            },
            {
              wrong: 'Az LNKO-ba az összes előforduló prímtényezőt bele kell szorozni a legnagyobb kitevővel.',
              correct: 'Nem! Csak a KÖZÖS prímeket vesszük a KISEBB kitevőn! (A legnagyobb kitevőket a legkisebb közös többszörösnél – LKKT – fogjuk használni).'
            },
            {
              wrong: 'Ha két szám páros, akkor lehetnek relatív prímek.',
              correct: 'Soha nem lehetnek relatív prímek! Ha mindkét szám páros, akkor a 2 közös osztójuk, így az LNKO-juk legalább 2!'
            }
          ]}
        />
      </TheorySection>

      {/* INTERAKTÍV LNKO ÉS RELATÍV PRÍM LABORATÓRIUM */}
      <div className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-indigo-600/10 border-2 border-violet-300 dark:border-violet-700/60 shadow-lg space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-violet-200 dark:border-violet-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-violet-600 text-white flex items-center justify-center shadow-md">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Interaktív LNKO és Prímtényező Laboratórium
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Állíts be két tetszőleges számot (1–10 000): nézd meg a prímfelbontásaikat, a közös metszetet és az azonnali tört-egyszerűsítést!
              </p>
            </div>
          </div>
        </div>

        {/* Gyors mintapárok */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Klasszikus mintapárok:
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { a: 24, b: 36, label: '(24; 36)' },
              { a: 60, b: 84, label: '(60; 84)' },
              { a: 360, b: 840, label: '(360; 840)' },
              { a: 8, b: 9, label: '(8; 9) relatív prím' },
              { a: 72, b: 108, label: '(72; 108)' },
              { a: 15, b: 45, label: '(15; 45) osztója' },
              { a: 48, b: 60, label: '(48; 60)' },
              { a: 77, b: 91, label: '(77; 91)' }
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
                  parsedA === pair.a && parsedB === pair.b && 'bg-violet-600 hover:bg-violet-700 text-white'
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
              className="font-mono text-base font-bold bg-white dark:bg-slate-900 border-violet-300 dark:border-violet-700 rounded-xl"
              placeholder="pl. 60"
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
              className="font-mono text-base font-bold bg-white dark:bg-slate-900 border-violet-300 dark:border-violet-700 rounded-xl"
              placeholder="pl. 84"
            />
          </div>
        </div>

        {/* Eredmény kártyák és levezetés */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          {/* Fő LNKO Kártya */}
          <div className="md:col-span-5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="font-black text-xs text-violet-800 dark:text-violet-300 uppercase tracking-wider">
                Eredmény és Állapot:
              </span>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-[11px] font-bold",
                labData.isRelPrime
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                  : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
              )}>
                {labData.isRelPrime ? 'RELATÍV PRÍMEK' : 'VAN KÖZÖS OSZTÓ'}
              </span>
            </div>

            <div className="text-center py-2 space-y-1">
              <div className="text-xs text-slate-500">Legnagyobb közös osztó:</div>
              <div className="text-3xl font-mono font-black text-violet-700 dark:text-violet-300">
                LNKO({labData.a}, {labData.b}) = {labData.gcdVal}
              </div>
              <div className="text-xs text-slate-500 pt-1">
                Képlettel: {labData.gcdFormula} = <strong>{labData.gcdVal}</strong>
              </div>
            </div>

            {/* Tört egyszerűsítés */}
            <div className="p-3 bg-violet-50/70 dark:bg-violet-950/40 rounded-xl border border-violet-200 dark:border-violet-800/80 space-y-1 text-xs">
              <div className="font-bold text-violet-900 dark:text-violet-200">
                Tört legegyszerűbb alakja:
              </div>
              <div className="font-mono text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span>{labData.a} / {labData.b}</span>
                <ArrowRight className="w-4 h-4 text-violet-600" />
                <span className="font-bold text-violet-700 dark:text-violet-300">
                  {labData.simplifiedNum} / {labData.simplifiedDen}
                </span>
              </div>
              <div className="text-[10px] text-slate-400">
                Mindkét tagot elosztottuk az LNKO-val ({labData.gcdVal}).
              </div>
            </div>

            {/* Közös osztók felsorolása */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Összes közös osztó ({labData.commonDivisors.length} db):
              </span>
              <div className="flex flex-wrap gap-1 font-mono text-xs">
                {labData.commonDivisors.map(cd => (
                  <span
                    key={cd}
                    className={cn(
                      "px-2 py-0.5 rounded-lg border",
                      cd === labData.gcdVal
                        ? "bg-violet-200 text-violet-900 font-black border-violet-400"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                    )}
                  >
                    {cd}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Részletes prímtényezős táblázat */}
          <div className="md:col-span-7 space-y-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-800 space-y-3">
              <span className="font-bold text-xs text-violet-800 dark:text-violet-300 uppercase tracking-wider block">
                Prímtényezők Kitevő-Összehasonlítása:
              </span>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg flex justify-between items-center">
                  <span><strong>{labData.a}</strong> felbontása:</span>
                  <span className="font-bold text-violet-700 dark:text-violet-300">{labData.canonicalA}</span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg flex justify-between items-center">
                  <span><strong>{labData.b}</strong> felbontása:</span>
                  <span className="font-bold text-violet-700 dark:text-violet-300">{labData.canonicalB}</span>
                </div>
              </div>

              {/* Prímtényező kitevő mátrix */}
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-xs text-center border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300">
                      <th className="py-2 text-left">Prímalap</th>
                      {labData.commonPrimesData.map(item => (
                        <th key={item.prime} className="py-2 px-2 font-mono text-violet-700 dark:text-violet-300">
                          {item.prime}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="font-mono divide-y divide-slate-100 dark:divide-slate-800">
                    <tr>
                      <td className="py-2 text-left font-sans text-slate-500">"{labData.a}" kitevője</td>
                      {labData.commonPrimesData.map(item => (
                        <td key={item.prime} className="py-2 px-2">
                          {item.expA}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 text-left font-sans text-slate-500">"{labData.b}" kitevője</td>
                      {labData.commonPrimesData.map(item => (
                        <td key={item.prime} className="py-2 px-2">
                          {item.expB}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-violet-50 dark:bg-violet-950/40 font-bold">
                      <td className="py-2 text-left font-sans text-violet-900 dark:text-violet-200">
                        min kitevő (LNKO)
                      </td>
                      {labData.commonPrimesData.map(item => (
                        <td
                          key={item.prime}
                          className={cn(
                            "py-2 px-2",
                            item.isCommon
                              ? "text-violet-700 dark:text-violet-300 font-black text-sm"
                              : "text-slate-300 dark:text-slate-600"
                          )}
                        >
                          {item.minExp}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TheoryTemplate>
  );
};

export default GreatestCommonDivisorTheory;
