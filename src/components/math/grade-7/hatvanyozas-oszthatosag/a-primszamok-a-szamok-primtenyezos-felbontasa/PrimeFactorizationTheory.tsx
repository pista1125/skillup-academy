import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Boxes,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  Hash,
  Filter,
  Calculator,
  RotateCcw,
  ShieldCheck,
  Binary
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface PrimeFactorizationTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

// 1-100 primes list for sieve & checks
const PRIMES_UNDER_100 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

interface FactorStep {
  current: number;
  divisor: number;
}

export const PrimeFactorizationTheory: React.FC<PrimeFactorizationTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Factorization Lab State ---
  const [labNumberInput, setLabNumberInput] = useState<string>('360');
  const [activePreset, setActivePreset] = useState<number>(360);
  const [sieveFilter, setSieveFilter] = useState<'all' | 'primes' | 'composites'>('all');

  const parsedLabNumber = useMemo(() => {
    const n = parseInt(labNumberInput, 10);
    if (isNaN(n) || n < 2 || n > 10000) return 360;
    return n;
  }, [labNumberInput]);

  // Factorization calculation
  const factorizationResult = useMemo(() => {
    let n = parsedLabNumber;
    const steps: FactorStep[] = [];
    const factorCounts: Record<number, number> = {};

    let d = 2;
    while (n > 1) {
      while (n % d === 0) {
        steps.push({ current: n, divisor: d });
        factorCounts[d] = (factorCounts[d] || 0) + 1;
        n /= d;
      }
      d++;
      if (d * d > n && n > 1) {
        steps.push({ current: n, divisor: n });
        factorCounts[n] = (factorCounts[n] || 0) + 1;
        break;
      }
    }

    const factors = Object.entries(factorCounts)
      .map(([f, count]) => ({ factor: parseInt(f, 10), count }))
      .sort((a, b) => a.factor - b.factor);

    const productString = steps.map(s => s.divisor).join(' · ');
    const canonicalString = factors
      .map(f => (f.count === 1 ? `${f.factor}` : `${f.factor}^${f.count}`))
      .join(' · ');

    const totalDivisorsCount = factors.reduce((acc, f) => acc * (f.count + 1), 1);

    return {
      steps,
      factors,
      productString,
      canonicalString,
      totalDivisorsCount,
      isPrime: factors.length === 1 && factors[0].count === 1
    };
  }, [parsedLabNumber]);

  return (
    <TheoryTemplate
      title="5. A prímszámok. A számok prímtényezős felbontása"
      subtitle="A prímszámok és összetett számok világa, Eratoszthenész szitája 100-ig, a számelmélet alaptétele és a prímtényezős felbontás (kanonikus alak) lépésről lépésre."
      badgeText="7. Osztály • Matematika IV. Témakör • 5. Lecke"
      topicBadge="Hatványozás és oszthatóság"
      emoji="🧱"
      themeColor="emerald"
      documentId="g7-powers-prime-factors-theory-doc"
      pdfFilename="7_osztaly_primszamok_primtenyezos_felbontas.pdf"
      quickRule={{
        label: 'Fontos Szabályok – Prímszámok & Prímfelbontás',
        formula: '1: se nem prím, se nem összetett  |  2: egyetlen páros prím  |  Számelmélet alaptétele: n = p₁^{α₁} · p₂^{α₂} ... p_k^{α_k}'
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      readTime="18 perc"
    >
      {/* 1. SZEKCIÓ: PRÍMSZÁMOK ÉS ÖSSZETETT SZÁMOK */}
      <TheorySection
        number={1}
        title="1. Prímszámok és Összetett Számok Fogalma"
        badgeColor="emerald"
        icon={<Boxes className="w-6 h-6 text-emerald-600" />}
      >
        <TheoryCard title="A természetes számok csoportosítása osztóik száma szerint">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Ha megvizsgáljuk, hogy az 1-nél nagyobb természetes számoknak hány pozitív osztójuk van, észrevehetjük, hogy a számok nem egyformán viselkednek. Az <strong>osztók száma szerint</strong> a pozitív egész számokat pontosan <strong>három csoportra</strong> osztjuk:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Az 1-es szám */}
            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-amber-900 dark:text-amber-200">1. Az 1-es szám</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300">1 osztó</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Az 1-nek <strong>egyetlenegy osztója van</strong>: önmaga. Mivel nincs két különböző osztója, ezért:
              </p>
              <div className="p-2 bg-white/80 dark:bg-slate-900 rounded-xl text-center font-bold text-xs text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                ⚠️ SE NEM PRÍM, SE NEM ÖSSZETETT!
              </div>
            </div>

            {/* Prímszámok */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border-2 border-emerald-300 dark:border-emerald-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-emerald-900 dark:text-emerald-200">2. Prímszámok (törzsszámok)</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-200 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300">2 osztó</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Azokat a természetes számokat nevezzük <strong>prímszámoknak</strong>, amelyeknek <strong>pontosan két pozitív osztójuk van</strong>: az 1 és önmaguk.
              </p>
              <div className="p-2 bg-white/80 dark:bg-slate-900 rounded-xl text-center font-bold text-xs text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-mono">
                2, 3, 5, 7, 11, 13, 17, 19, 23, 29...
              </div>
            </div>

            {/* Összetett számok */}
            <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-blue-900 dark:text-blue-200">3. Összetett számok</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300">2-nél több</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Azokat az 1-nél nagyobb természetes számokat nevezzük <strong>összetett számoknak</strong>, amelyeknek <strong>kettőnél több osztójuk van</strong> (felbonthatók kisebb számok szorzatára).
              </p>
              <div className="p-2 bg-white/80 dark:bg-slate-900 rounded-xl text-center font-bold text-xs text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 font-mono">
                4, 6, 8, 9, 10, 12, 14, 15, 16, 18...
              </div>
            </div>
          </div>
        </TheoryCard>

        {/* Fontos megjegyzések & tételek */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCallout
            type="info"
            title="A 2 különleges szerepe a számelméletben"
            icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              • A <strong>2 a legkisebb prímszám</strong>.<br />
              • A <strong>2 az EGYETLEN páros prímszám</strong>! Minden más páros szám osztható 2-vel is, így legalább 3 osztója van (1, 2 és önmaga), tehát összetett szám!
            </p>
          </TheoryCallout>

          <TheoryCallout
            type="tip"
            title="Eukleidész tétele: Végtelen sok prímszám létezik"
            icon={<Lightbulb className="w-5 h-5 text-amber-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Már az ókori görög matematikus, Eukleidész bebizonyította (i. e. 300 körül), hogy <strong>nincs legnagyobb prímszám</strong>: akármilyen messzire megyünk a számegyenesen, mindig találunk újabb és újabb prímszámokat.
            </p>
          </TheoryCallout>
        </div>

        {/* Tipikus csapda */}
        <TheoryTrapBox
          title="Gyakori tévhitek a prímszámok körül"
          traps={[
            {
              wrong: 'Az 1 prímszám, mert csak 1-gyel osztható.',
              correct: 'A prímeknek PONTOSAN 2 különböző osztójuk kell hogy legyen (1 és önmaga). Az 1-nek csak 1 osztója van, ezért se nem prím, se nem összetett!'
            },
            {
              wrong: 'Minden páratlan szám prímszám.',
              correct: 'A 9, 15, 21, 25, 27, 33 mind páratlan számok, mégis összetettek, mert van 1-en és önmagukon kívül más osztójuk is (pl. 9 = 3 · 3).'
            },
            {
              wrong: 'Minden prímszám páratlan.',
              correct: 'A 2 páros szám, mégis prímszám, mert csak 1-gyel és 2-vel osztható!'
            }
          ]}
        />
      </TheorySection>

      {/* 2. SZEKCIÓ: ERATOSZTHENÉSZ SZITÁJA */}
      <TheorySection
        number={2}
        title="2. Eratoszthenész Szitája – Prímszámok Keresése 100-ig"
        badgeColor="emerald"
        icon={<Filter className="w-6 h-6 text-emerald-600" />}
      >
        <TheoryCard title="Hogyan szűrhetjük ki a prímszámokat gyorsan és biztosan?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Eratoszthenész görög tudós (i. e. 3. század) kidolgozott egy rendkívül szemléletes szűrési módszert, amellyel mechanikusan „kihullathatók” az összetett számok, és csak a prímszámok maradnak fenn a szitán.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 mb-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
              A szitálási eljárás lépései 1-től 100-ig:
            </h4>
            <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-decimal list-inside">
              <li><strong>Az 1-et áthúzzuk</strong>, mert nem prímszám.</li>
              <li><strong>A 2-t bekarikázzuk</strong> (ez az első prím), majd az összes nála nagyobb 2-vel osztható számot (páros számokat) <strong>kihúzzuk</strong>: 4, 6, 8, 10, ...</li>
              <li>A legkisebb megmaradt szám a <strong>3 (prím)</strong>, bekarikázzuk, és kihúzzuk a nála nagyobb 3-mal osztható számokat: 9, 15, 21, ...</li>
              <li>A következő megmaradt szám az <strong>5 (prím)</strong>, bekarikázzuk, és kihúzzuk a nála nagyobb 5-tel oszthatókat: 25, 35, 55, ...</li>
              <li>A következő megmaradt szám a <strong>7 (prím)</strong>, bekarikázzuk, és kihúzzuk a nála nagyobb 7-tel oszthatókat: 49, 77, 91.</li>
            </ol>
          </div>

          <div className="p-4 bg-emerald-500/10 rounded-2xl border-2 border-emerald-300 dark:border-emerald-700/60 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs text-emerald-800 dark:text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Miért állhatunk meg a 7-nél 100-ig? (A gyökszabály)</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Mivel <MathText>10 · 10 = 100</MathText>, ha egy 100-nál nem nagyobb szám összetett, akkor a prímtényezői közül a legkisebbnek <strong>legfeljebb 10-nek</strong> kell lennie! A 10 alatti prímek pedig: <strong>2, 3, 5, 7</strong>. Mivel ezek többszöröseit mind kihúztuk, a táblázatban megmaradt <strong>minden bekarikázatlan szám garantáltan prímszám</strong>!
            </p>
          </div>
        </TheoryCard>

        {/* 100 alatti 25 prím tabló */}
        <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800 shadow-sm space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="font-black text-xs text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
              A 100-nál kisebb 25 prímszám táblázata:
            </span>
            <span className="text-[11px] font-bold text-slate-500">
              Összesen 25 darab prím van 100 alatt
            </span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 text-center font-mono">
            {PRIMES_UNDER_100.map(p => (
              <div
                key={p}
                className="py-1.5 px-1 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-black text-xs border border-emerald-200 dark:border-emerald-800"
              >
                {p}
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
            💡 <strong>Tipp a kvízhez és dolgozathoz:</strong> Különösen vigyázz a <strong>51, 57, 87 és 91</strong> számokra! Sokan prímnek hiszik őket, pedig 51 = 3 · 17, 57 = 3 · 19, 87 = 3 · 29 és 91 = 7 · 13!
          </p>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: A SZÁMELMÉLET ALAPTÉTELE */}
      <TheorySection
        number={3}
        title="3. A Számelmélet Alaptétele és a Kanonikus Alak"
        badgeColor="emerald"
        icon={<Hash className="w-6 h-6 text-emerald-600" />}
      >
        <TheoryCard title="A természetes számok „DNS-kódja”">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Ahogyan a kémiában minden molekula atomokból épül fel, a matematikában minden összetett szám <strong>prímszámok szorzataként</strong> épül fel. Ezt mondja ki a matematika egyik legfontosabb tétele:
          </p>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border-2 border-emerald-300 dark:border-emerald-700/60 text-center space-y-2 mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              A Számelmélet Alaptétele
            </span>
            <div className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
              Minden 1-nél nagyobb összetett szám – a tényezők sorrendjétől eltekintve – <br />
              <strong className="text-emerald-700 dark:text-emerald-400">egyértelműen felírható prímszámok szorzataként</strong>.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                1. Tényezős szorzatalak (kifejtve)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Minden azonos prímtényezőt külön kiírunk egymás mellé:
              </p>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono font-bold text-xs text-center text-slate-800 dark:text-slate-200">
                360 = 2 · 2 · 2 · 3 · 3 · 5
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                2. Kanonikus alak (hatványalak)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Az azonos prímtényezőket hatványként vonjuk össze nagyság szerinti növekvő sorrendben:
              </p>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 font-mono font-black text-sm text-center text-emerald-700 dark:text-emerald-300">
                360 = 2³ · 3² · 5¹
              </div>
            </div>
          </div>
        </TheoryCard>

        {/* Mire jó a kanonikus alak? */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Mire használjuk a prímtényezős felbontást?</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-3 bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-emerald-600">Oszthatósági vizsgálat:</strong>
              <p>Egy szám pontosan akkor osztója egy másiknak, ha annak prímtényezői legalább akkora kitevőn szerepelnek.</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-emerald-600">LNKO és LKKT számolás:</strong>
              <p>A közös prímtényezők legkisebb kitevőjű szorzata adja a legnagyobb közös osztót, a legnagyobb kitevőjű pedig a legkisebb közös többszöröst.</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-emerald-600">Osztók darabszáma:</strong>
              <p>Ha <MathText>n = p₁^a · p₂^b</MathText>, akkor az osztók száma pontosan <MathText>(a+1) · (b+1)</MathText>.</p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: A GYAKORLATI FELBONTÁS LÉPÉSEI */}
      <TheorySection
        number={4}
        title="4. A Felbontás Gyakorlata – A Függőleges Vonalas Módszer"
        badgeColor="emerald"
        icon={<Binary className="w-6 h-6 text-emerald-600" />}
      >
        <TheoryCard title="Lépésről lépésre a függőleges választóvonallal">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A legbiztosabb és legáttekinthetőbb módszer a szám felbontására a <strong>függőleges vonal</strong> használata. A bal oldalra írjuk az osztandó számot és az egymást követő hányadosokat, a jobb oldalra pedig a prímosztókat.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Vonalas ábra szemléltetése */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-300 dark:border-emerald-700 shadow-md">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center mb-2">
                Példa: A 360 prímtényezős felbontása
              </div>
              <div className="flex justify-center">
                <div className="font-mono text-sm leading-relaxed tracking-wider">
                  <div className="grid grid-cols-2 gap-x-4 border-b border-emerald-200 dark:border-emerald-800 py-0.5">
                    <span className="text-right font-bold text-slate-800 dark:text-slate-100 border-r-2 border-emerald-500 pr-4">360</span>
                    <span className="text-left font-black text-emerald-600">2</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 border-b border-emerald-200 dark:border-emerald-800 py-0.5">
                    <span className="text-right font-bold text-slate-800 dark:text-slate-100 border-r-2 border-emerald-500 pr-4">180</span>
                    <span className="text-left font-black text-emerald-600">2</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 border-b border-emerald-200 dark:border-emerald-800 py-0.5">
                    <span className="text-right font-bold text-slate-800 dark:text-slate-100 border-r-2 border-emerald-500 pr-4">90</span>
                    <span className="text-left font-black text-emerald-600">2</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 border-b border-emerald-200 dark:border-emerald-800 py-0.5">
                    <span className="text-right font-bold text-slate-800 dark:text-slate-100 border-r-2 border-emerald-500 pr-4">45</span>
                    <span className="text-left font-black text-emerald-600">3</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 border-b border-emerald-200 dark:border-emerald-800 py-0.5">
                    <span className="text-right font-bold text-slate-800 dark:text-slate-100 border-r-2 border-emerald-500 pr-4">15</span>
                    <span className="text-left font-black text-emerald-600">3</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 border-b border-emerald-200 dark:border-emerald-800 py-0.5">
                    <span className="text-right font-bold text-slate-800 dark:text-slate-100 border-r-2 border-emerald-500 pr-4">5</span>
                    <span className="text-left font-black text-emerald-600">5</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 py-0.5">
                    <span className="text-right font-bold text-slate-400 border-r-2 border-emerald-500 pr-4">1</span>
                    <span className="text-left text-slate-400 italic text-[11px]">Vége</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">
                360 = 2³ · 3² · 5
              </div>
            </div>

            {/* Szabályok listája */}
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1">
                <span className="font-bold text-xs text-emerald-900 dark:text-emerald-300">1. Lépés: Oszd a legkisebb prímmel!</span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Mindig a legkisebb prímszámmal (általában 2-vel) kezdjük az osztást, amíg a kapott hányados páros.
                </p>
              </div>

              <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1">
                <span className="font-bold text-xs text-emerald-900 dark:text-emerald-300">2. Lépés: Lépj a következő prímre!</span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Ha 2-vel már nem osztható, próbáld a 3-at (számjegyek összege), majd az 5-öt (végződés 0 vagy 5), végül a 7-et, 11-et, stb.
                </p>
              </div>

              <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1">
                <span className="font-bold text-xs text-emerald-900 dark:text-emerald-300">3. Lépés: Állj meg az 1-nél!</span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Amikor a bal oldalon elérjük az 1-et, a felbontás befejeződött. A jobb oldali oszlop számai a prímtényezők.
                </p>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* INTERAKTÍV LABORATÓRIUM A TANANYAG ALJÁN */}
      <div className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-emerald-600/10 border-2 border-emerald-300 dark:border-emerald-700/60 shadow-lg space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-200 dark:border-emerald-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Interaktív Prímtényezős Felbontó és Eratoszthenész Labor
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Írj be tetszőleges számot (2–10 000), vagy válassz mintát, és kövesd végig az élő felbontást!
              </p>
            </div>
          </div>
        </div>

        {/* Gyors mintaszám választó */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Gyors mintaszámok kipróbáláshoz:
          </label>
          <div className="flex flex-wrap gap-2">
            {[24, 60, 72, 100, 180, 210, 360, 504, 1000].map(val => (
              <Button
                key={val}
                size="sm"
                variant={parsedLabNumber === val ? 'default' : 'outline'}
                onClick={() => {
                  setLabNumberInput(val.toString());
                  setActivePreset(val);
                }}
                className={cn(
                  'h-8 px-3 rounded-xl font-bold text-xs',
                  parsedLabNumber === val && 'bg-emerald-600 hover:bg-emerald-700 text-white'
                )}
              >
                {val}
              </Button>
            ))}
          </div>
        </div>

        {/* Egyéni számbeviteli mező */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="w-full sm:w-64">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Saját szám beírása:
            </label>
            <Input
              type="number"
              min={2}
              max={10000}
              value={labNumberInput}
              onChange={e => setLabNumberInput(e.target.value)}
              className="font-mono text-base font-bold bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-700 rounded-xl"
              placeholder="pl. 360"
            />
          </div>

          <div className="text-xs text-slate-500 pt-5">
            A labor azonnal kiszámítja a függőleges vonalas lépéseket, a kanonikus alakot és az osztók számát!
          </div>
        </div>

        {/* Eredmény panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          {/* Függőleges vonal levezetés */}
          <div className="md:col-span-5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
              Függőleges vonalas felbontás:
            </div>
            <div className="flex justify-center max-h-72 overflow-y-auto">
              <div className="font-mono text-sm leading-relaxed tracking-wider w-48">
                {factorizationResult.steps.map((st, i) => (
                  <div key={i} className="grid grid-cols-2 gap-x-4 border-b border-emerald-100 dark:border-emerald-900/60 py-0.5">
                    <span className="text-right font-bold text-slate-800 dark:text-slate-100 border-r-2 border-emerald-500 pr-4">
                      {st.current}
                    </span>
                    <span className="text-left font-black text-emerald-600">
                      {st.divisor}
                    </span>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-x-4 py-0.5">
                  <span className="text-right font-bold text-slate-400 border-r-2 border-emerald-500 pr-4">1</span>
                  <span className="text-left text-slate-400 italic text-[11px]">Kész</span>
                </div>
              </div>
            </div>
          </div>

          {/* Eredmények és kanonikus összefoglaló */}
          <div className="md:col-span-7 space-y-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Kanonikus alak (prímhatványok):</span>
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-bold",
                  factorizationResult.isPrime
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                )}>
                  {factorizationResult.isPrime ? '🌟 PRÍMSZÁM' : 'ÖSSZETETT SZÁM'}
                </span>
              </div>

              <div className="text-xl sm:text-2xl font-mono font-black text-emerald-700 dark:text-emerald-300 break-words">
                {parsedLabNumber} = <MathText>{factorizationResult.canonicalString}</MathText>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div><strong>Kifejtett szorzatalak:</strong> <span className="font-mono">{parsedLabNumber} = {factorizationResult.productString}</span></div>
                <div><strong>Pozitív osztók száma:</strong> <span className="font-mono font-bold text-emerald-600">{factorizationResult.totalDivisorsCount} darab</span></div>
              </div>
            </div>

            {/* Tényezők bontása */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs space-y-2">
              <span className="font-bold text-emerald-900 dark:text-emerald-200">Prímtényezők összegzése:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {factorizationResult.factors.map(f => (
                  <div key={f.factor} className="p-2 rounded-xl bg-white dark:bg-slate-850 border border-emerald-200 dark:border-emerald-800 text-center">
                    <div className="font-bold text-emerald-700 dark:text-emerald-300 font-mono text-sm">{f.factor}</div>
                    <div className="text-[10px] text-slate-500">{f.count} db tényező ({f.factor}^{f.count})</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TheoryTemplate>
  );
};

export default PrimeFactorizationTheory;
