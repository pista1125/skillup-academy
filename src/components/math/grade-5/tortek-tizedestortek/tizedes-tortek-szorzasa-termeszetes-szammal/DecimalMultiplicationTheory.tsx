import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  X,
  ArrowRight,
  HelpCircle,
  RefreshCw,
  BookOpen,
  Calculator,
  Sliders,
  MoveRight,
  TrendingUp,
  Coins
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

export interface DecimalMultiplicationTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const DecimalMultiplicationTheory: React.FC<DecimalMultiplicationTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleStartQuiz = onStartQuiz || onSwitchToQuiz;

  // Interactive Multiplication Lab State
  const [decNum, setDecNum] = useState<number>(2.35);
  const [multiplier, setMultiplier] = useState<number>(4);

  // Quick preset scenarios
  const presets = [
    { dec: 2.35, mult: 4, label: '2,35 · 4 (Átlépéssel és 0 elhagyással)' },
    { dec: 3.4, mult: 100, label: '3,4 · 100 (0 pótlása jobbra)' },
    { dec: 0.08, mult: 25, multLabel: '0,08 · 25 (Egész szám lesz)', label: '0,08 · 25 (Törtből egész)' },
    { dec: 0.005, mult: 8, label: '0,005 · 8 (Ezredek szorzása)' },
    { dec: 12.05, mult: 6, label: '12,05 · 6 (Többjegyű szorzás)' }
  ];

  const applyPreset = (p: typeof presets[0]) => {
    setDecNum(p.dec);
    setMultiplier(p.mult);
  };

  const calcResult = Math.round(decNum * multiplier * 10000) / 10000;
  const decStr = decNum.toString().replace('.', ',');
  const resStr = calcResult.toString().replace('.', ',');

  // Calculate decimals count of the factor
  const decPart = decNum.toString().split('.')[1] || '';
  const decimalPlaces = decPart.length;

  // Integer multiplication simulation
  const intDec = Math.round(decNum * Math.pow(10, decimalPlaces));
  const intProd = intDec * multiplier;

  return (
    <TheoryTemplate
      title="Tizedes törtek szorzása természetes számmal"
      subtitle="Sajátítsd el a 10-zel, 100-zal, 1000-rel való gyors szorzást és a tetszőleges egész számmal történő írásbeli szorzás aranyszabályát!"
      badgeText="✖️ 5. Osztály • II. Törtek, tizedes törtek"
      documentId="decimal-multiplication-theory-content"
      pdfFilename="5_osztaly_tizedes_tortek_szorzasa_termeszetes_szammal_tananyag.pdf"
      quickRule={{
        label: 'TIZEDES TÖRT SZORZÁSA EGÉSSZEL',
        formula: '· 10, 100, 1000 → vessző jobbra | 2,35 · 4 = 9,40 = 9,4'
      }}
      themeColor="emerald"
      onBack={onBack}
      onStartQuiz={handleStartQuiz}
    >
      {/* 1. SZAKASZ: SZORZÁS 10-ZEL, 100-ZAL, 1000-REL */}
      <TheorySection
        number={1}
        title="Szorzás 10-zel, 100-zal, 1000-rel – A tizedesvessző léptetése"
        icon={<MoveRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <TheoryCard
          title="Mi történik a helyiértékekkel, ha 10-szeresére növelünk egy számot?"
          icon={<Lightbulb className="w-5 h-5 text-amber-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              Mivel a tízes számrendszerben minden szomszédos helyiérték <strong>10-szerese</strong> az attól jobbra állónak, 
              ezért ha egy tizedes törtet <MathText>10</MathText>-zel, <MathText>100</MathText>-zal vagy <MathText>1000</MathText>-rel szorzunk, 
              a számjegyek 1, 2, illetve 3 hellyel balra tolódnak a helyiérték-táblázatban.
            </p>
            <p className="leading-relaxed font-semibold text-emerald-800 dark:text-emerald-300">
              Gyakorlatban ez azt jelenti, hogy a tizedesvesszőt <strong>jobbra léptetjük</strong> annyi hellyel, ahány nulla van a szorzóban!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-2">
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <div className="text-xs font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                  · 10 (1 nulla)
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                  1 hellyel jobbra
                </div>
                <div className="mt-2 p-2 bg-white dark:bg-slate-900 rounded-lg text-center font-mono font-black text-emerald-800 dark:text-emerald-200 border border-emerald-100 dark:border-emerald-800 text-sm">
                  <MathText>4,567 · 10 = 45,67</MathText>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
                <div className="text-xs font-black text-teal-700 dark:text-teal-300 uppercase tracking-wider">
                  · 100 (2 nulla)
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                  2 hellyel jobbra
                </div>
                <div className="mt-2 p-2 bg-white dark:bg-slate-900 rounded-lg text-center font-mono font-black text-teal-800 dark:text-teal-200 border border-teal-100 dark:border-teal-800 text-sm">
                  <MathText>4,567 · 100 = 456,7</MathText>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800">
                <div className="text-xs font-black text-cyan-700 dark:text-cyan-300 uppercase tracking-wider">
                  · 1000 (3 nulla)
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                  3 hellyel jobbra
                </div>
                <div className="mt-2 p-2 bg-white dark:bg-slate-900 rounded-lg text-center font-mono font-black text-cyan-800 dark:text-cyan-200 border border-cyan-100 dark:border-cyan-800 text-sm">
                  <MathText>4,567 · 1000 = 4567</MathText>
                </div>
              </div>
            </div>

            {/* Nullák pótlása jobbra */}
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
              <div className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Mi van, ha elfogynak a tizedesjegyek? → Nullák pótlása!</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Ha a tizedesvesszőt több hellyel kell jobbra léptetnünk, mint ahány tizedesjegy van, a hiányzó helyekre <strong>nullákat írunk</strong>:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-amber-700 text-center font-bold">
                  <MathText>3,4 · 100 = 3,40 · 100 = 340</MathText>
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-amber-700 text-center font-bold">
                  <MathText>0,5 · 1000 = 0,500 · 1000 = 500</MathText>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZAKASZ: SZORZÁS TETSZŐLEGES TERMÉSZETES SZÁMMAL */}
      <TheorySection
        number={2}
        title="Tizedes tört szorzása természetes számmal"
        icon={<Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <TheoryCard
          title="A szorzás aranyszabálya: 3 egyszerű lépés"
          icon={<Lightbulb className="w-5 h-5 text-emerald-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              Egy tizedes törtet úgy szorzunk meg egy természetes számmal (egész számmal), mint a természetes számokat, 
              majd a szorzatban <strong>jobbról levágunk annyi tizedesjegyet</strong>, amennyi a tizedes tört szorzótényezőben volt.
            </p>

            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3">
              <div className="font-black text-emerald-900 dark:text-emerald-200 text-sm">
                📌 A szorzás 3 lépése részletesen:
              </div>
              <ol className="list-decimal list-inside text-xs text-slate-800 dark:text-slate-200 space-y-2 leading-relaxed">
                <li>
                  <strong>Szorzás vessző nélkül:</strong> A számokat úgy szorozzuk össze, mintha mindkettő természetes szám lenne (figyelmen kívül hagyjuk a tizedesvesszőt).
                </li>
                <li>
                  <strong>Tizedesjegyek megszámlálása:</strong> Megszámoljuk, hány tizedesjegy (számjegy a vessző után) szerepelt a tizedes törtben.
                </li>
                <li>
                  <strong>A tizedesvessző elhelyezése:</strong> A kapott szorzatban <strong>jobbról balra haladva</strong> levágunk pontosan ugyanennyi tizedesjegyet, és kitesszük a tizedesvesszőt!
                </li>
              </ol>
            </div>

            {/* Részletes kidolgozott példa kártya */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                Kidolgozott mintapélda: <MathText>3,42 · 4 = ?</MathText>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1 text-xs">
                <div className="p-2.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800">
                  <div className="font-bold text-emerald-900 dark:text-emerald-200">1. Lépés: Vessző nélkül</div>
                  <div className="mt-1 font-mono font-black text-slate-800 dark:text-slate-200"><MathText>342 · 4 = 1368</MathText></div>
                </div>
                <div className="p-2.5 rounded-lg bg-teal-50/70 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-800">
                  <div className="font-bold text-teal-900 dark:text-teal-200">2. Lépés: Tizedesjegyek</div>
                  <div className="mt-1 text-slate-700 dark:text-slate-300">A 3,42-ben <strong className="text-teal-700 dark:text-teal-300">2 tizedesjegy</strong> van.</div>
                </div>
                <div className="p-2.5 rounded-lg bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-800">
                  <div className="font-bold text-cyan-900 dark:text-cyan-200">3. Lépés: Vessző letétele</div>
                  <div className="mt-1 font-mono font-black text-cyan-800 dark:text-cyan-300">Jobbról 2 jegy: <MathText>13,68</MathText></div>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZAKASZ: NULLÁK KEZELÉSE A SZORZATBAN */}
      <TheorySection
        number={3}
        title="Nullák kezelése és felesleges nullák elhagyása"
        icon={<Coins className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <TheoryCard
          title="Mikor és hogyan hagyhatjuk el a záró nullákat?"
          icon={<Sparkles className="w-5 h-5 text-amber-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              Szorzás során két nagyon fontos speciális eset fordul elő a nullákkal:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-1">
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
                <div className="text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase">
                  1. Eset: Záró nullák a tizedesvessző után
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  A tizedesvessző letétele <strong>után</strong> a tizedes tört legvégén álló nullákat elhagyhatjuk, a szám értéke nem változik!
                </p>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg font-mono text-xs font-bold text-center border border-emerald-100 dark:border-emerald-800">
                  <MathText>2,35 · 4 = 9,40 = 9,4</MathText>
                  <div className="text-[11px] text-slate-500 font-sans mt-0.5 font-normal">
                    (Először kitesszük a vesszőt: 9,40, majd egyszerűsítünk: 9,4)
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
                <div className="text-xs font-black text-indigo-800 dark:text-indigo-300 uppercase">
                  2. Eset: Vezető nullák pótlása
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Ha a szorzat kevesebb számjegyből áll, mint ahány tizedesjegyet le kell vágni, <strong>balról nullákkal pótoljuk</strong> a hiányzó helyeket!
                </p>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg font-mono text-xs font-bold text-center border border-indigo-100 dark:border-indigo-800">
                  <MathText>0,004 · 3 = 0,012</MathText>
                  <div className="text-[11px] text-slate-500 font-sans mt-0.5 font-normal">
                    (<MathText>4 · 3 = 12</MathText>, 3 tizedesjegy kell → balra 0 pótlása: <MathText>0,012</MathText>)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZAKASZ: INTERAKTÍV SZORZÓ LABORATÓRIUM */}
      <TheorySection
        number={4}
        title="Interaktív szorzó laboratórium"
        icon={<Sliders className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <TheoryCard
          title="Próbáld ki a szorzást tetszőleges számokkal!"
          icon={<Calculator className="w-5 h-5 text-emerald-500" />}
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Válassz a kész mintapéldák közül, vagy állítsd be a tizedes törtet és az egész szorzót, hogy lásd a lépésről lépésre történő levezetést!
            </p>

            {/* Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              {presets.map((p, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(p)}
                  className={cn(
                    'text-xs font-mono transition-all',
                    decNum === p.dec && multiplier === p.mult
                      ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                      : 'hover:bg-emerald-50 dark:hover:bg-emerald-950/50'
                  )}
                >
                  {p.label}
                </Button>
              ))}
            </div>

            {/* Interactive sliders & inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
              <div>
                <label className="text-xs font-bold text-emerald-900 dark:text-emerald-300 block mb-1">
                  Tizedes tört tényező: <span className="font-mono text-base font-black text-emerald-700 dark:text-emerald-300">{decStr}</span>
                </label>
                <input
                  type="range"
                  min="0.05"
                  max="15.0"
                  step="0.05"
                  value={decNum}
                  onChange={(e) => setDecNum(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>0,05</span>
                  <span>7,50</span>
                  <span>15,00</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-emerald-900 dark:text-emerald-300 block mb-1">
                  Természetes szám szorzó: <span className="font-mono text-base font-black text-emerald-700 dark:text-emerald-300">{multiplier}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={multiplier}
                  onChange={(e) => setMultiplier(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>1</span>
                  <span>25</span>
                  <span>50</span>
                </div>
              </div>
            </div>

            {/* Calculation Walkthrough Box */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-xs font-black uppercase text-emerald-700 dark:text-emerald-400">Lépésről lépésre számolás</span>
                <span className="font-mono text-lg font-black text-emerald-700 dark:text-emerald-300">
                  <MathText>{`${decStr} · ${multiplier} = ${resStr}`}</MathText>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-700 dark:text-slate-300">1. Egész számként szorozva:</div>
                  <div className="font-mono font-black text-emerald-600 dark:text-emerald-400 mt-1">
                    <MathText>{`${intDec} · ${multiplier} = ${intProd}`}</MathText>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-700 dark:text-slate-300">2. Levágandó tizedesjegyek:</div>
                  <div className="font-mono font-black text-teal-600 dark:text-teal-400 mt-1">
                    {decimalPlaces} tizedesjegy
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <div className="font-bold text-emerald-900 dark:text-emerald-200">3. Pontos végeredmény:</div>
                  <div className="font-mono font-black text-emerald-700 dark:text-emerald-300 mt-1 text-sm">
                    <MathText>{resStr}</MathText>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. SZAKASZ: GYAKORI CSAPDÁK ÉS TIPPEK */}
      <TheorySection
        number={5}
        title="Tipikus hibák és csapdák elkerülése"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Csapda: A záró nullák túl korai letörlése a szorzat végéről"
            wrong="2,35 · 4 esetén a 235 · 4 = 940. Ha a nullát azonnal letörlik (94), akkor a 2 tizedesjegy levágásakor tévesen 0,94-et kapnak végeredménynek!"
            correct="Először MINDIG kitesszük a tizedesvesszőt: 9,40, és CSAK EZUTÁN hagyjuk el a felesleges záró nullát: 9,40 = 9,4."
            explanation="Helyes sorrend: 1. Egész szorzat felírása: 940 → 2. Vessző letétele jobbról 2 jegyre: 9,40 → 3. Záró nulla elhagyása: 9,4."
          />

          <TheoryTrapBox
            title="2. Csapda: A tizedesvessző balra léptetése szorzáskor"
            wrong="3,45 · 10 esetén balra tolják a vesszőt: 0,345. Így a szám értéke lecsökkent, pedig szoroztunk!"
            correct="Szorzáskor a szám értéke NŐ, ezért a tizedesvesszőt MINDIG JOBBRA léptetjük: 3,45 · 10 = 34,5."
            explanation="Aranyszabály: Szorzásnál (érték nő) jobbra lép a vessző annyi hellyel, ahány nulla van a szorzóban."
          />

          <TheoryTrapBox
            title="3. Csapda: Elfelejtett vezető nullák (0,0...) a szorzat elején"
            wrong="0,04 · 2 esetén a 4 · 2 = 8, és tévesen 0,8-at vagy 8-at írnak le végeredménynek."
            correct="Mivel a 0,04-ben 2 tizedesjegy van, a kapott 8 elé kötelező bepótolni a hiányzó nullát és a vesszőt: 0,08."
            explanation="Gondolj a helyiértékre: 4 század szorozva 2-vel = 8 század, azaz tizedes tört alakban pontosan 0,08."
          />

          <TheoryTrapBox
            title="4. Csapda: Nullák pótlásának elfelejtése, ha elfogynak a tizedesjegyek"
            wrong="5,6 · 100 esetén csak 56-ot írnak, mert a 6 után elfogyott a számjegy."
            correct="Ha 2 hellyel kell jobbra léptetni, de csak 1 tizedesjegy van, nullával pótoljuk a helyet: 5,6 · 100 = 5,60 · 100 = 560."
            explanation="Mindig pótold a hiányzó helyiértékeket: 5,6 = 5,60 → 100-zal szorozva 560."
          />
        </div>
      </TheorySection>

      {/* 6. SZAKASZ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        number={6}
        title="Összefoglaló szorzási példatár és útmutató"
        icon={<BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <TheoryTable
          headers={['Szorzás', 'Egész szorzat', 'Tizedesjegyek', 'Vessző letétele után', 'Végeredmény (egyszerűsítve)']}
          rows={[
            ['3,4 · 10', '—', '1 hely jobbra', '34,', '34'],
            ['0,56 · 100', '—', '2 hely jobbra', '56,', '56'],
            ['4,2 · 100', '—', '2 hely jobbra (0 pótlása)', '420,', '420'],
            ['1,25 · 4', '125 · 4 = 500', '2 tizedesjegy', '5,00', '5'],
            ['2,35 · 4', '235 · 4 = 940', '2 tizedesjegy', '9,40', '9,4'],
            ['0,004 · 3', '4 · 3 = 12', '3 tizedesjegy', '0,012', '0,012'],
            ['12,05 · 6', '1205 · 6 = 7230', '2 tizedesjegy', '72,30', '72,3']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
