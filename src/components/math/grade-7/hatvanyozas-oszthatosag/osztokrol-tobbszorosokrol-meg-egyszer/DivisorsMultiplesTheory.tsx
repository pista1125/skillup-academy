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
  Table as TableIcon,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  Hash,
  Calculator,
  ShieldCheck,
  Binary,
  Layers,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface DivisorsMultiplesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

interface FactorPower {
  prime: number;
  exponent: number;
}

export const DivisorsMultiplesTheory: React.FC<DivisorsMultiplesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Divisor Explorer State ---
  const [labNumberInput, setLabNumberInput] = useState<string>('60');

  const parsedNum = useMemo(() => {
    const val = parseInt(labNumberInput, 10);
    if (isNaN(val) || val < 1 || val > 10000) return 60;
    return val;
  }, [labNumberInput]);

  // Calculate prime factorization, all divisors, pairs, and squareness
  const analysis = useMemo(() => {
    const n = parsedNum;
    if (n === 1) {
      return {
        n: 1,
        divisors: [1],
        pairs: [{ a: 1, b: 1 }],
        count: 1,
        isSquare: true,
        root: 1,
        canonical: '1',
        formulaBreakdown: '1',
        factorPowers: []
      };
    }

    // Factorization
    let temp = n;
    const factorCounts: Record<number, number> = {};
    let d = 2;
    while (temp > 1) {
      while (temp % d === 0) {
        factorCounts[d] = (factorCounts[d] || 0) + 1;
        temp /= d;
      }
      d++;
      if (d * d > temp && temp > 1) {
        factorCounts[temp] = (factorCounts[temp] || 0) + 1;
        break;
      }
    }

    const factorPowers: FactorPower[] = Object.entries(factorCounts)
      .map(([p, exp]) => ({ prime: parseInt(p, 10), exponent: exp }))
      .sort((a, b) => a.prime - b.prime);

    const canonical = factorPowers
      .map(fp => (fp.exponent === 1 ? `${fp.prime}` : `${fp.prime}^${fp.exponent}`))
      .join(' · ');

    const formulaBreakdown = factorPowers
      .map(fp => `(${fp.exponent} + 1)`)
      .join(' · ');

    // Divisors & pairs up to sqrt(n)
    const divisors: number[] = [];
    const pairs: { a: number; b: number }[] = [];
    const limit = Math.floor(Math.sqrt(n));

    for (let i = 1; i <= limit; i++) {
      if (n % i === 0) {
        divisors.push(i);
        const partner = n / i;
        pairs.push({ a: i, b: partner });
        if (partner !== i) {
          divisors.push(partner);
        }
      }
    }

    divisors.sort((a, b) => a - b);
    const isSquare = limit * limit === n;

    return {
      n,
      divisors,
      pairs,
      count: divisors.length,
      isSquare,
      root: limit,
      canonical,
      formulaBreakdown,
      factorPowers
    };
  }, [parsedNum]);

  return (
    <TheoryTemplate
      title="7. Osztókról, többszörösökről még egyszer"
      subtitle="Egy szám összes osztójának felírása osztópárokkal, az osztók számának kiszámítása a kanonikus alakból, és a négyzetszámok páratlan osztószámának titka."
      badgeText="7. Osztály • Matematika IV. Témakör • 7. Lecke"
      topicBadge="Hatványozás és oszthatóság"
      emoji="📊"
      themeColor="cyan"
      documentId="g7-powers-divisors-multiples-theory-doc"
      pdfFilename="7_osztaly_osztokrol_tobbszorosokrol_meg_egyszer.pdf"
      quickRule={{
        label: 'Fontos Szabályok – Osztópárok & Osztók Száma',
        formula: 'd · d′ = n (elég √n-ig keresni)  |  d(n) = (α₁+1)(α₂+1)...(α_k+1)  |  Páratlan sok osztó ⟺ n négyzetszám'
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      readTime="17 perc"
    >
      {/* 1. SZEKCIÓ: AZ OSZTÓPÁROK MÓDSZERE ÉS A NÉGYZETGYÖK HATÁR */}
      <TheorySection
        number={1}
        title="1. Az Osztópárok Módszere és a Keresési Határ"
        badgeColor="cyan"
        icon={<TableIcon className="w-6 h-6 text-cyan-600" />}
      >
        <TheoryCard title="Hogyan találhatjuk meg egy szám ÖSSZES osztóját biztosan és gyorsan?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Amikor egy szám összes pozitív osztóját keressük, a legrosszabb stratégia a találomra való próbálkozás, mert könnyen kihagyhatunk egyet. A matematika elegáns eszköze az <strong>osztópárok képzése</strong>:
          </p>

          <div className="p-4 rounded-2xl bg-cyan-50/80 dark:bg-cyan-950/30 border-2 border-cyan-200 dark:border-cyan-800 space-y-2 mb-4 text-center">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-800 dark:text-cyan-300">
              Az Osztópár Törvénye
            </span>
            <div className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
              Ha a <MathText>d</MathText> szám osztója <MathText>n</MathText>-nek, akkor létezik egy hozzá tartozó <MathText>d' = n / d</MathText> osztópár is, amelyre:
            </div>
            <div className="text-base sm:text-lg font-mono font-black text-cyan-700 dark:text-cyan-300">
              d · d' = n
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Miért elég a gyökig vizsgálni? */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-800 dark:text-slate-200">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                <span>Miért elegendő csak <MathText>√n</MathText>-ig keresni?</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Tegyük fel, hogy mindkét osztó nagyobb lenne, mint <MathText>√n</MathText>. Ekkor a szorzatuk nagyobb lenne, mint <MathText>√n · √n = n</MathText>, ami lehetetlen!<br />
                Tehát <strong>minden osztópárban legalább az egyik osztónak legfeljebb <MathText>√n</MathText>-nek kell lennie</strong>. Így elegendő a tesztelést <MathText>√n</MathText>-nél befejezni!
              </p>
            </div>

            {/* Szemléletes példa 60-ra */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-cyan-800 dark:text-cyan-300 uppercase tracking-wider">
                Gyakorlati példa: A 60 összes osztója
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Mivel <MathText>7 · 7 = 49 &lt; 60</MathText>, de <MathText>8 · 8 = 64 &gt; 60</MathText>, elég csak <strong>7-ig</strong> vizsgálnunk a számokat:
              </p>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-0.5 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <div>1 · 60 = 60</div>
                <div>2 · 30 = 60</div>
                <div>3 · 20 = 60</div>
                <div>4 · 15 = 60</div>
                <div>5 · 12 = 60</div>
                <div>6 · 10 = 60</div>
                <div className="text-slate-400">7 nem osztója ➔ KÉSZ!</div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: AZ OSZTÓK SZÁMÁNAK KISZÁMÍTÁSA KANONIKUS ALAKBÓL */}
      <TheorySection
        number={2}
        title="2. Az Osztók Számának Kiszámítása Prímfelbontásból"
        badgeColor="cyan"
        icon={<Calculator className="w-6 h-6 text-cyan-600" />}
      >
        <TheoryCard title="A d(n) képlet – Hogyan tudjuk meg az osztók számát anélkül, hogy felírnánk őket?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Nagy számoknál (pl. 360 vagy 1000) az összes osztó egyenkénti felírása fárasztó és könnyen hibához vezet. A prímtényezős felbontás segítségével azonban <strong>másodpercek alatt kiszámítható az osztók pontos darabszáma</strong>!
          </p>

          <div className="p-5 rounded-2xl bg-cyan-500/10 border-2 border-cyan-300 dark:border-cyan-700/60 text-center space-y-2 mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-800 dark:text-cyan-300">
              Az Osztók Számának Képlete: d(n)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Ha egy szám kanonikus prímhatvány-alakja: <MathText>{"n = p₁^{α₁} · p₂^{α₂} · ... · p_k^{α_k}"}</MathText>, akkor:
            </p>
            <div className="text-base sm:text-xl font-mono font-black text-cyan-700 dark:text-cyan-300">
              d(n) = (α₁ + 1) · (α₂ + 1) · ... · (α_k + 1)
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              <strong>Szabály:</strong> Növeld meg mindegyik prímtényező kitevőjét 1-gyel, majd szorozd össze ezeket a számokat!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Miért kell hozzáadni 1-et? */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-800 dark:text-slate-200">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Miért adjuk hozzá az 1-et minden kitevőhöz?</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Mert minden osztó felépítésekor az adott prím szerepelhet <strong>0-szor is</strong> (ugye <MathText>p⁰ = 1</MathText>)! <br />
                Ha például a 2-es kitevője 3 (vagyis <MathText>2³</MathText>), akkor az osztóba a 2-esből választhatunk:
                <br />
                • <MathText>2⁰ = 1</MathText> (nem szerepel)<br />
                • <MathText>2¹ = 2</MathText><br />
                • <MathText>2² = 4</MathText><br />
                • <MathText>2³ = 8</MathText><br />
                Ez összesen <strong className="text-cyan-700 dark:text-cyan-300">3 + 1 = 4 választási lehetőség</strong>!
              </p>
            </div>

            {/* Mintapéldák táblázata */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-cyan-800 dark:text-cyan-300 uppercase tracking-wider">
                Gyakori példák a képlet használatára:
              </span>
              <div className="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <strong>60</strong> = 2² · 3¹ · 5¹<br />
                  d(60) = (2+1)(1+1)(1+1) = 3 · 2 · 2 = <strong className="text-cyan-600">12 osztó</strong>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <strong>100</strong> = 2² · 5²<br />
                  d(100) = (2+1)(2+1) = 3 · 3 = <strong className="text-cyan-600">9 osztó</strong>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <strong>360</strong> = 2³ · 3² · 5¹<br />
                  d(360) = (3+1)(2+1)(1+1) = 4 · 3 · 2 = <strong className="text-cyan-600">24 osztó</strong>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZEKCIÓ: A NÉGYZETSZÁMOK ARANYSZABÁLYA */}
      <TheorySection
        number={3}
        title="3. A Négyzetszámok Aranyszabálya: Páratlan Számú Osztó"
        badgeColor="cyan"
        icon={<Sparkles className="w-6 h-6 text-cyan-600" />}
      >
        <TheoryCard title="Miért kivételesek a négyzetszámok osztói?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Egy rendkívül mély és elegáns összefüggés a számelméletben, amellyel ránézésre megállapíthatjuk egy számról, hogy négyzetszám-e:
          </p>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 border-2 border-cyan-300 dark:border-cyan-700/60 text-center space-y-2 mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-800 dark:text-cyan-300">
              A Négyzetszámok Oszthatósági Alaptétele
            </span>
            <div className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
              Egy pozitív egész számnak <strong className="text-cyan-700 dark:text-cyan-300">akkor és csak akkor van PÁRATLAN számú osztója</strong>, <br />
              ha a szám <strong>NÉGYZETSZÁM</strong>!
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Indoklás: Osztópárokkal */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-cyan-800 dark:text-cyan-300 uppercase tracking-wider">
                1. Magyarázat: Az osztópárokból
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Általában minden osztóhoz tartozik egy tőle <em>különböző</em> pár (<MathText>d \neq d'</MathText>), így az osztók kettesével csoportosíthatók ➔ a darabszám <strong>mindig páros</strong>.<br /><br />
                <strong>Kivétel a négyzetszám:</strong> a négyzetgyökénél <MathText>k · k = n</MathText>, vagyis a számnak önmaga a párja! Ezért az a „pár” egyetlenegy önálló osztóként jelenik meg:
                <br />
                <em>Példa (36):</em> 1·36, 2·18, 3·12, 4·9 és a magányos <strong>6·6</strong> ➔ 9 darab osztó!
              </p>
            </div>

            {/* 2. Indoklás: A d(n) képletből */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-cyan-800 dark:text-cyan-300 uppercase tracking-wider">
                2. Magyarázat: A d(n) képletből
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Egy szám pontosan akkor négyzetszám, ha a prímtényezős felbontásában <strong>minden kitevő páros szám</strong>:
                <br />
                <MathText>{"n = p₁^{2a} · p₂^{2b} · ..."}</MathText><br /><br />
                Ekkor a képletben minden tényező: <MathText>(2a + 1)</MathText>, <MathText>(2b + 1)</MathText>... <strong>páratlan szám</strong>!<br />
                Mivel páratlan számok szorzata mindig páratlan: <br />
                <strong className="text-cyan-700 dark:text-cyan-300">d(n) garantáltan páratlan szám lesz!</strong>
              </p>
            </div>
          </div>
        </TheoryCard>

        {/* Tipikus tévhitek */}
        <TheoryTrapBox
          title="Gyakori buktatók az osztók és többszörösök témakörben"
          traps={[
            {
              wrong: 'Ha a 6 osztója 12-nek, akkor a 12 is osztója a 6-nak.',
              correct: 'Nem fordítható meg! A 6 osztója a 12-nek, a 12 viszont TÖBBSZÖRÖSE a 6-nak!'
            },
            {
              wrong: 'A 0-nak nincs többszöröse és nem többszöröse semminek.',
              correct: 'A 0 minden nemnulla egész számnak többszöröse (0 = 0 · a), de a 0-val nem osztunk!'
            },
            {
              wrong: 'Nagyobb számnak mindig több osztója van.',
              correct: 'Egyáltalán nem igaz! Pl. a prím 101-nek csak 2 osztója van, míg a nála kisebb 12-nek 6 osztója van, a 60-nak pedig 12 osztója!'
            }
          ]}
        />
      </TheorySection>

      {/* INTERAKTÍV OSZTÓKUTATÓ LABORATÓRIUM */}
      <div className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-blue-600/10 border-2 border-cyan-300 dark:border-cyan-700/60 shadow-lg space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-200 dark:border-cyan-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-600 text-white flex items-center justify-center shadow-md">
              <TableIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Interaktív Osztókutató és Osztópár Laboratórium
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Írj be tetszőleges számot (1–10 000), vagy válassz mintát: nézd meg az összes osztópárt és a d(n) képlet élő levezetését!
              </p>
            </div>
          </div>
        </div>

        {/* Gyors mintaválasztó */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Gyors mintaszámok:
          </label>
          <div className="flex flex-wrap gap-2">
            {[12, 16, 24, 36, 49, 60, 100, 144, 360, 1000].map(val => (
              <Button
                key={val}
                size="sm"
                variant={parsedNum === val ? 'default' : 'outline'}
                onClick={() => setLabNumberInput(val.toString())}
                className={cn(
                  'h-8 px-3 rounded-xl font-bold text-xs',
                  parsedNum === val && 'bg-cyan-600 hover:bg-cyan-700 text-white'
                )}
              >
                {val} {val === 16 || val === 36 || val === 49 || val === 100 || val === 144 ? '(négyzetszám)' : ''}
              </Button>
            ))}
          </div>
        </div>

        {/* Számbeviteli mező */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="w-full sm:w-64">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Saját szám beírása:
            </label>
            <Input
              type="number"
              min={1}
              max={10000}
              value={labNumberInput}
              onChange={e => setLabNumberInput(e.target.value)}
              className="font-mono text-base font-bold bg-white dark:bg-slate-900 border-cyan-300 dark:border-cyan-700 rounded-xl"
              placeholder="pl. 60"
            />
          </div>

          <div className="text-xs text-slate-500 pt-1 sm:pt-4">
            Keresési határ: <strong className="font-mono text-cyan-700 dark:text-cyan-300">√{parsedNum} ≈ {Math.sqrt(parsedNum).toFixed(2)}</strong> (elég {Math.floor(Math.sqrt(parsedNum))}-ig vizsgálni!)
          </div>
        </div>

        {/* Eredmény kártyák */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          {/* Osztópárok listája */}
          <div className="md:col-span-5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="font-black text-xs text-cyan-800 dark:text-cyan-300 uppercase tracking-wider">
                Osztópárok (d · d' = {parsedNum}):
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {analysis.pairs.length} pár
              </span>
            </div>

            <div className="space-y-1.5 font-mono text-xs max-h-64 overflow-y-auto">
              {analysis.pairs.map((p, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "p-2 rounded-xl flex justify-between items-center border",
                    p.a === p.b
                      ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-900 dark:text-amber-200 font-bold"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                  )}
                >
                  <span>{p.a} · {p.b}</span>
                  <span className="text-slate-400 text-[10px]">
                    {p.a === p.b ? '🌟 önmaga párja!' : `= ${parsedNum}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Elemzés és képlet */}
          <div className="md:col-span-7 space-y-4">
            {/* Fő összefoglaló kártya */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Pozitív osztók száma:</span>
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-bold",
                  analysis.isSquare
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                    : "bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300"
                )}>
                  {analysis.count} DARAB ({analysis.isSquare ? 'PÁRATLAN ➔ NÉGYZETSZÁM' : 'PÁROS SZÁMÚ'})
                </span>
              </div>

              {/* d(n) képlet */}
              {analysis.factorPowers.length > 0 && (
                <div className="p-3 bg-cyan-50/60 dark:bg-cyan-950/30 rounded-xl border border-cyan-200 dark:border-cyan-800/80 space-y-1 text-xs">
                  <div className="font-mono text-slate-700 dark:text-slate-300">
                    <strong>Kanonikus alak:</strong> {parsedNum} = <MathText>{analysis.canonical}</MathText>
                  </div>
                  <div className="font-mono font-bold text-cyan-700 dark:text-cyan-300">
                    d({parsedNum}) = {analysis.formulaBreakdown} = <strong>{analysis.count}</strong>
                  </div>
                </div>
              )}

              {/* Összes osztó növekvő sorrendben */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Összes osztó ({analysis.count} db):
                </label>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {analysis.divisors.map(div => (
                    <span
                      key={div}
                      className={cn(
                        "px-2 py-0.5 rounded-lg border",
                        div === analysis.root && analysis.isSquare
                          ? "bg-amber-200 text-amber-900 font-black border-amber-400"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                      )}
                    >
                      {div}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TheoryTemplate>
  );
};

export default DivisorsMultiplesTheory;
