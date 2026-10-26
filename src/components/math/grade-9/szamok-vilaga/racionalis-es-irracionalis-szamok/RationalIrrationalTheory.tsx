import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Binary,
  Compass,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Divide,
  Scale,
  Calculator,
  Layers,
  ArrowRightLeft,
  RotateCw
} from 'lucide-react';
import {
  DecimalsClassificationTreeSvg,
  Sqrt2ConstructionSvg,
  PeriodicRemainderCycleSvg
} from './RationalIrrationalFigures';

interface RationalIrrationalTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

// LNKO
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

// Prímtényezős felbontás szövegesen
function primeFactors(n: number): { factors: number[]; only2and5: boolean; text: string } {
  let temp = Math.abs(n);
  const factors: number[] = [];
  let d = 2;
  while (d * d <= temp) {
    while (temp % d === 0) {
      factors.push(d);
      temp = Math.floor(temp / d);
    }
    d++;
  }
  if (temp > 1) {
    factors.push(temp);
  }

  const counts: Record<number, number> = {};
  factors.forEach(f => {
    counts[f] = (counts[f] || 0) + 1;
  });

  const parts = Object.entries(counts).map(([prime, exp]) =>
    exp === 1 ? prime : `${prime}^${exp}`
  );

  const only2and5 = factors.every(f => f === 2 || f === 5);

  return {
    factors,
    only2and5,
    text: parts.join(' · ') || '1'
  };
}

export const RationalIrrationalTheory: React.FC<RationalIrrationalTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV LABOR 1: TÖRT ELEMZŐ ÁLLAPOTOK ---
  const [numInput, setNumInput] = useState<number>(7);
  const [denInput, setDenInput] = useState<number>(12);

  const fractionAnalysis = useMemo(() => {
    const d = denInput === 0 ? 1 : denInput;
    const g = gcd(numInput, d);
    const simpNum = numInput / g;
    const simpDen = d / g;

    const pf = primeFactors(simpDen);
    const isTerminating = pf.only2and5;

    // Tizedes kifejtés szimuláció (legfeljebb 30 tizedesjegy)
    const intPart = Math.floor(Math.abs(simpNum) / simpDen);
    let rem = Math.abs(simpNum) % simpDen;
    const seenRemainders = new Map<number, number>();
    const decimals: number[] = [];

    let periodStart = -1;

    while (rem !== 0 && !seenRemainders.has(rem) && decimals.length < 35) {
      seenRemainders.set(rem, decimals.length);
      rem *= 10;
      decimals.push(Math.floor(rem / simpDen));
      rem %= simpDen;
    }

    if (rem !== 0 && seenRemainders.has(rem)) {
      periodStart = seenRemainders.get(rem)!;
    }

    let decimalStr = `${simpNum < 0 ? '-' : ''}${intPart},`;
    let explanation = '';

    if (rem === 0) {
      decimalStr += decimals.join('');
      explanation = `Véges tizedestört, mert az egyszerűsített nevező (${simpDen} = ${pf.text}) prímtényezői kizárólag 2 és/vagy 5 közül kerülnek ki!`;
    } else if (periodStart !== -1) {
      const nonPeriodic = decimals.slice(0, periodStart).join('');
      const periodic = decimals.slice(periodStart).join('');
      decimalStr += nonPeriodic ? `${nonPeriodic}(${periodic})` : `(${periodic})`;
      explanation = `Végtelen szakaszos tizedestört! A szakasz hossza ${periodic.length} jegy. Az egyszerűsített nevező (${simpDen} = ${pf.text}) tartalmaz 2-től és 5-től eltérő prímosztót is.`;
    } else {
      decimalStr += `${decimals.slice(0, 10).join('')}...`;
      explanation = 'Hosszú periódusú szakaszos tizedestört.';
    }

    return {
      simpNum,
      simpDen,
      gcd: g,
      pf,
      isTerminating,
      decimalStr,
      explanation
    };
  }, [numInput, denInput]);

  // --- INTERAKTÍV LABOR 2: SZAKASZOS TIZEDESTÖRT ÁTÍRÓ ---
  const [periodPreset, setPeriodPreset] = useState<'0.3' | '0.7' | '0.27' | '0.16' | '0.9'>('0.27');

  const periodicStepData = useMemo(() => {
    switch (periodPreset) {
      case '0.3':
        return {
          original: '0,(3)',
          step1: 'Legyen x = 0,3333...',
          step2: 'Szorozzuk meg 10-zel a periódus hossza miatt: 10x = 3,3333...',
          step3: 'Vonjuk ki az első egyenletet a másodikból: 10x − x = 3,3333... − 0,3333...',
          step4: '9x = 3 ⟹ x = 3/9 = 1/3',
          finalFrac: '1/3'
        };
      case '0.7':
        return {
          original: '0,(7)',
          step1: 'Legyen x = 0,7777...',
          step2: 'Szorozzuk meg 10-zel: 10x = 7,7777...',
          step3: 'Kivonás: 10x − x = 7,7777... − 0,7777...',
          step4: '9x = 7 ⟹ x = 7/9',
          finalFrac: '7/9'
        };
      case '0.27':
        return {
          original: '0,(27)',
          step1: 'Legyen x = 0,272727...',
          step2: 'Mivel a periódus 2 jegyű, szorozzuk meg 100-zal: 100x = 27,272727...',
          step3: 'Kivonás: 100x − x = 27,272727... − 0,272727...',
          step4: '99x = 27 ⟹ x = 27/99 = 3/11',
          finalFrac: '3/11'
        };
      case '0.16':
        return {
          original: '0,1(6)',
          step1: 'Vegyes szakaszos: 1 nem ismétlődő és 1 ismétlődő jegy. Legyen x = 0,16666...',
          step2: 'Szorozzuk 10-zel (szakasz elé tolás): 10x = 1,6666...',
          step3: 'Szorozzuk 100-zal (1 periódussal tovább tolás): 100x = 16,6666...',
          step4: 'Kivonás: 100x − 10x = 16,6666... − 1,6666... ⟹ 90x = 15 ⟹ x = 15/90 = 1/6',
          finalFrac: '1/6'
        };
      case '0.9':
        return {
          original: '0,(9)',
          step1: 'Legyen x = 0,9999...',
          step2: 'Szorozzuk meg 10-zel: 10x = 9,9999...',
          step3: 'Kivonás: 10x − x = 9,9999... − 0,9999...',
          step4: '9x = 9 ⟹ x = 9/9 = 1 ! Bizonyított tény: 0,(9) = 1 !',
          finalFrac: '1'
        };
    }
  }, [periodPreset]);

  return (
    <TheoryTemplate
      title="Racionális és Irracionális Számok – Tizedestört Alakok és a Valós Számegyenes"
      subtitle="Véges és végtelen szakaszos tizedestörtek, irracionális számok felismerése és átírás közönséges törtté"
      badgeText="9. OSZTÁLY • II. A SZÁMOK VILÁGA • √ TANANYAG"
      themeColor="purple"
      documentId="rational-irrational-theory"
      pdfFilename="9_osztaly_racionalis_es_irracionalis_szamok.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      estimatedTime="25-30 perc"
      quickRule={{
        label: 'A Tizedestört Alakok Alaptétele',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1 text-left font-bold text-xs sm:text-sm">
            <div>
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Véges tizedestört (ℚ): </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">Nevező prímei csak 2 és/vagy 5 (pl. 3/8 = 0,375)</span>
            </div>
            <div>
              <span className="text-purple-600 dark:text-purple-400 font-black">Végtelen szakaszos (ℚ): </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">Nevezőben más prímosztó is van (pl. 1/3 = 0,(3))</span>
            </div>
            <div>
              <span className="text-amber-600 dark:text-amber-400 font-black">Irracionális (ℚ*): </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">Végtelen nem szakaszos (pl. √2, π; ℚ ∩ ℚ* = ∅)</span>
            </div>
          </div>
        )
      }}
    >
      {/* 1. SZEKCIÓ: A RACIONÁLIS SZÁMOK ÉS A TIZEDESTÖRT ALAK */}
      <TheorySection
        number={1}
        title="Racionális Számok és a Tizedestört Alak Titka"
        icon={<Divide className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badge="Tizedestört Alakok"
        badgeColor="indigo"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          A tankönyv 50. oldalának definíciója szerint: <strong>Racionális számnak</strong> nevezzük azokat a számokat,
          amelyek felírhatók két egész szám hányadosaként: <strong>a/b</strong> alakban, ahol <em>a, b ∈ ℤ</em> és <em>b ≠ 0</em>.
          A racionális számok jele a <strong>ℚ</strong> (az olasz <em>quoziente</em> = hányados szóból).
        </p>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 my-6">
          <div className="w-full lg:w-1/2 flex items-center justify-center p-3 sm:p-4 bg-white/70 dark:bg-slate-850/60 rounded-3xl border border-indigo-100/80 dark:border-slate-800 shadow-2xs">
            <DecimalsClassificationTreeSvg className="w-full max-w-[580px]" />
          </div>
          <div className="w-full lg:w-1/2 space-y-3">
            <TheoryCard title="Mikor Véges és Mikor Végtelen Szakaszos egy Tört?" variant="purple">
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>
                  Egy közönséges törtet legegyszerűbb alakjára hozva a <strong>nevező prímtényezői</strong> döntik el a sorsát:
                </p>
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <strong className="text-emerald-800 dark:text-emerald-200 block mb-0.5">
                    1. VÉGES TIZEDESTÖRT (Csak 2 és/vagy 5):
                  </strong>
                  Ha a nevező prímtényezős felbontásában <em>kizárólag a 2 és az 5</em> szerepel (pl. 4 = 2², 20 = 2²·5, 125 = 5³).
                  Indok: mivel 10 = 2 · 5, így a tört mindig bővíthető 10 valamely hatványára!
                </div>
                <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                  <strong className="text-purple-800 dark:text-purple-200 block mb-0.5">
                    2. VÉGTELEN SZAKASZOS (Más prím is van):
                  </strong>
                  Ha a nevező prímosztói között <em>bármilyen más prím</em> is szerepel (pl. 3, 7, 11, 13, 37).
                  Ekkor sosem bővíthető 10 hatványára, és tizedesjegyei periodikusan ismétlődnek!
                </div>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: VÉGTELEN SZAKASZOS TIZEDESTÖRT ÁTÍRÁSA TÖRTTÉ */}
      <TheorySection
        number={2}
        title="Végtelen Szakaszos Tizedestört Átírása Közönséges Törtté"
        icon={<ArrowRightLeft className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badge="Átváltási Módszer"
        badgeColor="purple"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Gyakori érettségi és dolgozatfeladat a szakaszos tizedestörtek pontos közönséges tört alakjának megadása.
          A módszer lényege: <strong>az ismeretlen számot x-nek jelöljük</strong>, majd megszorozzuk 10, 100 vagy 1000 hatványaival úgy,
          hogy kivonáskor a végtelenbe nyúló szakasz teljesen kiejtse önmagát!
        </p>



        <TheoryCallout title="Miért egyenlő 0,(9) pontosan 1-gyel?" variant="tip">
          Sok diák számára megdöbbentő, de 0,999... NEM „nagyon közel van az 1-hez”, hanem <strong>PONTOSAN 1</strong>!
          Indoklás: 1/3 = 0,333... Ha mindkét oldalt megszorozzuk 3-mal: 3 · (1/3) = 1, míg a jobb oldalon 3 · 0,333... = 0,999...
          Mivel mindkettő ugyanannak a szorzatnak az eredménye, 0,(9) = 1. A két szám között nincs egyetlen valós szám sem!
        </TheoryCallout>
      </TheorySection>

      {/* 3. SZEKCIÓ: AZ IRRACIONÁLIS SZÁMOK ÉS A √2 INDIREKT BIZONYÍTÁSA */}
      <TheorySection
        number={3}
        title="Az Irracionális Számok és a √2 Indirekt Bizonyítása"
        icon={<Compass className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badge="Irracionális Számok"
        badgeColor="amber"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          A tankönyv 51. oldalán feltett kérdés: <em>„Elképzelhető-e olyan végtelen tizedestört, amely nem szakaszos?”</em>
          Igen! Ilyen számot kapunk például, ha mindig eggyel több nullát írunk az egyesek közé: <strong>0,101001000100001...</strong>,
          vagy ha a természetes számokat írjuk le sorban: <strong>0,123456789101112...</strong>
          Az ilyen számok <strong>NEM írhatók fel két egész szám hányadosaként</strong>, ezért <strong>irracionális számoknak (ℚ*)</strong> nevezzük őket!
        </p>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 my-6">
          <div className="w-full lg:w-1/2 flex items-center justify-center p-3 sm:p-4 bg-white/70 dark:bg-slate-850/60 rounded-3xl border border-amber-100/80 dark:border-slate-800 shadow-2xs">
            <Sqrt2ConstructionSvg className="w-full max-w-[480px]" />
          </div>

          <div className="w-full lg:w-1/2">
            <TheoryCard title="Tétel: A √2 irracionális szám!" variant="amber">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                <strong>Indirekt Bizonyítás (Ellentmondásra vezetés):</strong>
              </p>
              <p className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 text-xs font-mono">
                1. Tegyük fel indirekt, hogy √2 racionális, vagyis felírható √2 = p/q alakban, ahol p és q relatív prímek (lnko(p,q) = 1).
                <br /><br />
                2. Négyzetre emelve: 2 = p² / q²  ⟹  p² = 2·q².
                <br /><br />
                3. Mivel p² osztható 2-vel (páros), ezért <strong>p is páros szám</strong>, vagyis p = 2k.
                <br /><br />
                4. Behelyettesítve: (2k)² = 4k² = 2q²  ⟹  <strong>q² = 2k²</strong>.
                <br /><br />
                5. Ebből q² is páros, tehát <strong>q is páros szám</strong>!
                <br /><br />
                6. <strong>ELLENTMONDÁS!</strong> Ha mind p, mind q páros, akkor mindkettő osztható 2-vel, ami ellentmond annak, hogy p/q tovább nem egyszerűsíthető tört volt!
              </p>
              <p className="font-bold text-amber-700 dark:text-amber-300 text-xs">
                Következtetés: A kiinduló feltevésünk hamis volt, a √2 nem racionális, tehát irracionális szám: √2 ∈ ℚ* !
              </p>
            </div>
          </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: A SKATULYA-ELV ÉS A MARADÉKOK CIKLUSA */}
      <TheorySection
        number={4}
        title="A Skatulya-elv: Miért Ismétlődik Törvényszerűen az Osztás?"
        icon={<RotateCw className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
        badge="Skatulya-elv"
        badgeColor="cyan"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Miért zárhatjuk ki 100%-os bizonyossággal, hogy két egész szám osztásakor végtelen nem szakaszos tizedestört keletkezzen?
          A válasz a matematika egyik legelegánsabb alapelvében, a <strong>Dirichlet-féle skatulya-elvben</strong> rejlik:
        </p>

        <div className="my-6 p-4 bg-white/70 dark:bg-slate-850/60 rounded-3xl border border-cyan-100/80 dark:border-slate-800 shadow-2xs flex justify-center">
          <PeriodicRemainderCycleSvg className="w-full max-w-[520px]" />
        </div>

        <TheoryCard title="A Szakasz Maximális Hossza" variant="cyan">
          <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p>
              Ha egy egész számot elosztunk egy <em>b</em> egész számmal, a lehetséges maradékok köre korlátos:
              csak 0, 1, 2, ..., <em>b − 1</em> lehet.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ha a maradék 0, az osztás véget ér (véges tizedestört).</li>
              <li>Ha a maradék sosem 0, akkor legfeljebb <strong>b − 1 különböző maradék</strong> létezik.</li>
              <li>A skatulya-elv miatt legkésőbb a <em>b</em>-edik lépésben egy már korábban előfordult maradékhoz jutunk vissza!</li>
              <li>Innen a számolás pontosan ugyanúgy folytatódik, mint korábban: a számjegyek ciklikusan ismétlődnek!</li>
            </ul>
            <p className="text-cyan-800 dark:text-cyan-200 font-bold">
              Például: 1/7 esetén 7 − 1 = 6 jegy a szakasz: 1/7 = 0,(142857). 1/13 esetén legfeljebb 12 jegyű lehet a periódus!
            </p>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* --- INTERAKTÍV GYAKORLÓ LABORATÓRIUMOK A LECKE VÉGÉN --- */}
      <div className="space-y-6 my-8">
        {/* INTERAKTÍV LABOR 1: TÖRT ELEMZŐ */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-indigo-200 dark:border-indigo-800/60 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-xs">
                <Calculator className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-black text-base sm:text-lg text-slate-800 dark:text-slate-100">
                  Interaktív Labor 1: Tizedestört Elemző és Prímtényező Vizsgáló
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Válassz számlálót és nevezőt, vagy próbáld ki az előre beállított tankönyvi mintapéldákat!
                </p>
              </div>
            </div>

            {/* Presetek gombok */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { n: 7, d: 4, label: '7/4 (Tankönyv)' },
                { n: 23, d: 37, label: '23/37 (Tankönyv)' },
                { n: 3, d: 8, label: '3/8' },
                { n: 5, d: 6, label: '5/6' },
                { n: 1, d: 7, label: '1/7' },
                { n: 9, d: 60, label: '9/60 (Csapda!)' }
              ].map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setNumInput(p.n);
                    setDenInput(p.d);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Inputok */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Számláló (a):</label>
                <input
                  type="number"
                  value={numInput}
                  onChange={e => setNumInput(parseInt(e.target.value) || 0)}
                  className="w-24 px-3 py-1.5 rounded-lg border text-center font-mono font-bold text-sm bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Nevező (b ≠ 0):</label>
                <input
                  type="number"
                  value={denInput}
                  onChange={e => setDenInput(parseInt(e.target.value) || 1)}
                  className="w-24 px-3 py-1.5 rounded-lg border text-center font-mono font-bold text-sm bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-500">
                {fractionAnalysis.gcd > 1 ? (
                  <span className="text-amber-600 dark:text-amber-400 font-bold">
                    Egyszerűsítve {fractionAnalysis.gcd}-gyel: {fractionAnalysis.simpNum}/{fractionAnalysis.simpDen}
                  </span>
                ) : (
                  <span className="text-slate-400">Tovább már nem egyszerűsíthető.</span>
                )}
              </div>
            </div>

            {/* Eredmény kártya */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-400">Tizedestört alak:</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    fractionAnalysis.isTerminating
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                  }`}
                >
                  {fractionAnalysis.isTerminating ? 'Véges tizedes' : 'Végtelen szakaszos'}
                </span>
              </div>

              <div className="font-mono text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-wide">
                {fractionAnalysis.decimalStr}
              </div>

              <div className="text-xs font-mono text-slate-600 dark:text-slate-300">
                Egyszerűsített nevező: {fractionAnalysis.simpDen} = {fractionAnalysis.pf.text}
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                {fractionAnalysis.explanation}
              </p>
            </div>
          </div>
        </div>

        {/* INTERAKTÍV LABOR 2: ÁTÍRÓ AUTOMATA */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border-2 border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Interaktív Labor 2: Lépésről Lépésre Átírás Automata
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                { id: '0.3', label: '0,(3)' },
                { id: '0.7', label: '0,(7)' },
                { id: '0.27', label: '0,(27)' },
                { id: '0.16', label: '0,1(6) (Vegyes)' },
                { id: '0.9', label: '0,(9) = 1 !' }
              ].map(b => (
                <button
                  key={b.id}
                  onClick={() => setPeriodPreset(b.id as any)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    periodPreset === b.id
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lépések megjelenítése */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800/50 space-y-2.5">
            <div className="flex items-center justify-between border-b pb-2 border-slate-100 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500">Kiinduló tizedestört:</span>
              <span className="font-mono text-base font-black text-purple-600 dark:text-purple-400">
                {periodicStepData.original}
              </span>
            </div>
            <div className="text-xs font-mono space-y-1.5 text-slate-700 dark:text-slate-300">
              <p className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                <strong>1. lépés:</strong> {periodicStepData.step1}
              </p>
              <p className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                <strong>2. lépés:</strong> {periodicStepData.step2}
              </p>
              <p className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                <strong>3. lépés:</strong> {periodicStepData.step3}
              </p>
              <p className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 font-bold">
                <strong>4. lépés (Megoldás):</strong> {periodicStepData.step4}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. SZEKCIÓ: TIPIKUS BUKTATÓK ÉS ÉRETTSÉGI TIPPEK */}
      <TheorySection
        number={5}
        title="Tipikus Buktatók és Érettségi Csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badge="Csapdák"
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Buktató: A π és a 22/7 vagy 3,14 tévhite"
            trap="Racionális szám-e a π, hiszen a számológépen 3,14159265 van, és 22/7-ként is szoktuk közelíteni?"
            wrong="A π racionális, mert felírható 22/7-ként vagy 3,14-ként."
            wrongExplanation="Óriási tévedés! A 22/7 (≈ 3,142857) és a 3,14 csak KÖZELÍTÉSEK a mindennapi életben! A π valójában transzcendens, irracionális szám: π ∈ ℚ*. Tizedesjegyei végtelen sokan vannak és SOHA nem ismétlődnek szakaszosan!"
            correct="π ∈ ℚ* (Irracionális szám)"
            correctExplanation="A π pontos értéke nem írható fel két egész hányadosaként!"
            tip="Szabály: A π, az e és a √2 mindig irracionális számok!"
          />

          <TheoryTrapBox
            title="2. Buktató: A nevező vizsgálata egyszerűsítés NÉLKÜL"
            trap="Véges vagy végtelen szakaszos a 9/60 tizedestört alakja?"
            wrong="Végtelen szakaszos, mert 60 = 2² · 3 · 5, és szerepel benne a 3-as prímszám."
            wrongExplanation="Hiba! A szabály CSAK TOVÁBB NEM EGYSZERŰSÍTHETŐ törtre érvényes! 9/60 = 3/20. A 20 = 2² · 5, amiben már NINCS 3-as! Így 9/60 = 0,15, ami VÉGES tizedestört!"
            correct="9/60 = 3/20 = 0,15 (Véges tizedestört)"
            correctExplanation="A számláló 9-ese kiejti a nevező 3-as prímtényezőjét! Mindig egyszerűsíts a vizsgálat előtt!"
            tip="Aranyszabály: Előbb egyszerűsíts a legnagyobb közös osztóval, csak utána vizsgáld a nevezőt!"
          />

          <TheoryTrapBox
            title="3. Buktató: Gyökjel láttán automatikus irracionálisnak ítélés"
            trap="Melyik számhalmazba tartozik a √49 és a √(144/25) ?"
            wrong="Gyökjel van rajtuk, ezért irracionálisak (ℚ*)."
            wrongExplanation="Hiba! Előbb számold ki a gyökök értékét: √49 = 7 ∈ ℕ, ℤ, ℚ. √(144/25) = 12/5 = 2,4 ∈ ℚ. Mindkettő racionális szám!"
            correct="√49 = 7 ∈ ℕ,  √(144/25) = 12/5 ∈ ℚ"
            correctExplanation="Csak azok a négyzetgyökök irracionálisak, amelyek alatt nem négyzetszám áll (pl. √2, √3, √5, √7)."
            tip="Tipp: Ha a szám négyzetszám, a gyöke racionális (egész vagy tört)!"
          />

          <TheoryTrapBox
            title="4. Buktató: Két irracionális szám műveleteinek zártsága"
            trap="Igaz-e, hogy két irracionális szám összege vagy szorzata mindig irracionális?"
            wrong="Igen, irracionális számokkal számolva csak irracionális szám jöhet ki."
            wrongExplanation="HAMIS! Ellenpéldák: (3 + √2) + (3 − √2) = 6 ∈ ℚ (összeg racionális!). Vagy √8 · √2 = √16 = 4 ∈ ℚ (szorzat racionális!). A ℚ* semelyik alapműveletre sem zárt!"
            correct="Két irracionális szám műveletének eredménye lehet RACIONÁLIS is!"
            correctExplanation="A ℚ* halmaz nem zárt sem az összeadásra, sem a kivonásra, sem a szorzásra, sem az osztásra nézve."
            tip="Jegyezd meg: √3 · √3 = 3 ∈ ℚ,  π − π = 0 ∈ ℚ !"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default RationalIrrationalTheory;
