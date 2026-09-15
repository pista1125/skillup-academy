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
  Binary,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  Calculator,
  ArrowRight,
  HelpCircle,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RationalSetTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const RationalSetTheory: React.FC<RationalSetTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive fraction to decimal converter
  const [numerator, setNumerator] = useState<number>(3);
  const [denominator, setDenominator] = useState<number>(4);

  // Self-test question state
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const getDecimalRepresentation = (num: number, den: number) => {
    if (den === 0) return 'Nem értelmezhető (0-val nem osztunk!)';
    const val = num / den;
    
    // Check if finite decimal (denominator factors only 2 and 5)
    let tempDen = Math.abs(den);
    // reduce by gcd
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const g = gcd(Math.abs(num), tempDen);
    tempDen = tempDen / g;

    while (tempDen % 2 === 0) tempDen /= 2;
    while (tempDen % 5 === 0) tempDen /= 5;

    const isFinite = tempDen === 1;

    if (isFinite) {
      return `${val} (Véges tizedestört)`;
    } else {
      return `${val.toFixed(6)}... (Végtelen szakaszos tizedestört)`;
    }
  };

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="grade-8-szamok-betuk-racionalis-halmaz"
      pdfFilename="8_osztaly_a_racionalis_szamok_halmaza_tananyag.pdf"
      title="4. A racionális számok halmaza"
      subtitle="A számhalmazok hierarchiája (ℕ ⊂ ℤ ⊂ ℚ), törtek és tizedestörtek átváltása, végtelen szakaszos tizedestörtek törtté alakítása, ellentett és abszolútérték"
      quickRule={{
        label: "Racionális szám (ℚ) definíciója",
        formula: "ℚ = { a/b | a, b ∈ ℤ, b ≠ 0 }  (Két egész szám hányadosa)"
      }}
      themeColor="emerald"
    >
      {/* 1. FEJEZET: A SZÁMHALMAZOK HIERARCHIÁJA */}
      <TheorySection
        number={1}
        title="A számhalmazok hierarchiája és bővülése"
        icon={<Binary className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
      >
        <TheoryCallout variant="info" title="Miért kellett bővíteni a számhalmazokat?">
          A matematika történetében minden új számhalmazt azért vezettek be, mert bizonyos műveletek nem voltak elvégezhetők a korábbi halmazban:
          <br />
          • A <strong>természetes számokban (ℕ)</strong> a kivonás nem mindig végezhető el ($3 - 5 = ?$) ⟹ bevezették az <strong>egész számokat (ℤ)</strong>.
          <br />
          • Az <strong>egész számokban (ℤ)</strong> az osztás nem mindig végezhető el ($3 : 4 = ?$) ⟹ bevezették a <strong>racionális számokat (ℚ)</strong>.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <TheoryCard
            title="Természetes számok (ℕ)"
            badge="ℕ = {0, 1, 2, ...}"
            badgeColor="emerald"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A megszámlálásra használt 0 és pozitív egész számok. Zárt az összeadásra és szorzásra.
            </p>
            <div className="mt-2 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">
              Példák: 0, 1, 7, 24, 105
            </div>
          </TheoryCard>

          <TheoryCard
            title="Egész számok (ℤ)"
            badge="ℤ = {..., -1, 0, 1, ...}"
            badgeColor="blue"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A természetes számok és azok negatív ellentettjei. Zárt a kivonásra is.
            </p>
            <div className="mt-2 text-xs font-mono font-bold text-blue-700 dark:text-blue-300">
              Példák: -18, -3, 0, 5, 42
            </div>
          </TheoryCard>

          <TheoryCard
            title="Racionális számok (ℚ)"
            badge="ℚ = a/b alakú számok"
            badgeColor="purple"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Két egész szám hányadosaként ($a/b, b \neq 0$) felírható számok. Zárt a 0-val való osztást kivéve minden alapműveletre.
            </p>
            <div className="mt-2 text-xs font-mono font-bold text-purple-700 dark:text-purple-300">
              Példák: 3/4, -2.5, 0.8, -1/3
            </div>
          </TheoryCard>
        </div>

        <div className="mt-4 p-3.5 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            A halmazok egymásba ágyazottsága (Részhalmaz-lánc):
          </span>
          <div className="text-lg sm:text-xl font-mono font-black text-emerald-900 dark:text-emerald-100 mt-1">
            ℕ ⊂ ℤ ⊂ ℚ
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Minden természetes szám egyben egész szám is, és minden egész szám egyben racionális szám is (pl. $5 = 5/1$).
          </p>
        </div>
      </TheorySection>

      {/* 2. FEJEZET: TÖRT ÉS TIZEDESTÖRT ALAKOK */}
      <TheorySection
        number={2}
        title="Tört és tizedestört alakok (Véges és Végtelen szakaszos)"
        icon={<Calculator className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Minden racionális szám felírható tizedestört alakban. A tizedestört alak kétféle lehet:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <TheoryCard
            title="1. Véges tizedestört"
            badge="Csak 2 és 5 a nevezőben"
            badgeColor="emerald"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Egy tovább már nem egyszerűsíthető tört pontosan akkor véges tizedestört, ha a nevezőjének prímtényezős felbontásában <strong>kizárólag a 2 és az 5</strong> szerepel.
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
              <div>• 3/4 = 0.75 (nevező: 4 = 2²)</div>
              <div>• 7/8 = 0.875 (nevező: 8 = 2³)</div>
              <div>• 9/20 = 0.45 (nevező: 20 = 2² · 5)</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Végtelen szakaszos tizedestört"
            badge="Más prím is van a nevezőben"
            badgeColor="purple"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Ha a nevezőben 2-n és 5-ön kívül más prímszám (pl. 3, 7, 11, 13) is szerepel, az osztás sosem ér véget, hanem a tizedesjegyek egy idő után <strong>ciklikusan ismétlődnek (szakasz)</strong>.
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-purple-800 dark:text-purple-300">
              <div>• 1/3 = 0.333... = 0.3̇ (tiszta szakaszos)</div>
              <div>• 5/6 = 0.833... = 0.83̇ (vegyes szakaszos)</div>
              <div>• 4/7 = 0.5̇71428̇ (6 jegyű szakasz)</div>
            </div>
          </TheoryCard>
        </div>

        {/* Interaktív Tört-átváltó kalkulátor */}
        <div className="mt-5 p-5 bg-slate-50 dark:bg-slate-850 rounded-2xl border-2 border-emerald-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
            <Sparkles className="w-4 h-4" />
            Interaktív Tört ⟹ Tizedestört Számoló
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Számláló (a):</label>
              <input
                type="number"
                value={numerator}
                onChange={(e) => setNumerator(parseInt(e.target.value) || 0)}
                className="w-20 h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-center"
              />
            </div>

            <span className="text-lg font-bold text-slate-400">/</span>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Nevező (b ≠ 0):</label>
              <input
                type="number"
                value={denominator}
                onChange={(e) => setDenominator(parseInt(e.target.value) || 1)}
                className="w-20 h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-center"
              />
            </div>

            <div className="p-2.5 px-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-slate-700 font-mono font-bold text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">
              = {getDecimalRepresentation(numerator, denominator)}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. FEJEZET: SZAKASZOS TIZEDESTÖRT ÁTÍRÁSA TÖRTTÉ */}
      <TheorySection
        number={3}
        title="Végtelen szakaszos tizedestört átírása közönséges törtté"
        icon={<Sparkles className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
      >
        <TheoryCallout variant="info" title="Hogyan szabadulhatunk meg a végtelen sok ismétlődő tizedesjegytől?">
          A trükk: szorozzuk meg a számot 10-nek megfelelő hatványával, hogy a szakasz pontosan eltolódjon, majd <strong>vonjuk ki az eredeti számból</strong>! Ezzel a végtelen szakaszok teljesen kiejtik egymást.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard
            title="1. Tiszta szakaszos tört átírása (pl. 0.7̇ = 0.777...)"
            badge="10-szeres szorzás"
            badgeColor="indigo"
          >
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <div>1. Legyen $x = 0.777...$</div>
              <div>2. Szorozzuk 10-zel: $10x = 7.777...$</div>
              <div>3. Vonjuk ki: $10x - x = 7.777... - 0.777...$</div>
              <div>4. $9x = 7 \implies x = \mathbf{7/9}$.</div>
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-indigo-700 dark:text-indigo-300 font-bold font-mono mt-2">
                Szabály: 0.ȧ = a/9,  0.aḃ = ab/99 (pl. 0.45̇ = 45/99 = 5/11)
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Vegyes szakaszos tört átírása (pl. 0.25̇ = 0.2555...)"
            badge="100-as és 10-es szorzás"
            badgeColor="purple"
          >
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <div>1. Legyen $y = 0.2555...$</div>
              <div>2. Szorozzuk 100-zal: $100y = 25.555...$</div>
              <div>3. Szorozzuk 10-zel: $10y = 2.555...$</div>
              <div>4. Vonjuk ki: $100y - 10y = 25.555... - 2.555...$</div>
              <div>5. $90y = 23 \implies y = \mathbf{23/90}$.</div>
              <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-purple-700 dark:text-purple-300 font-bold font-mono mt-2">
                Szabály: A nevezőben annyi 9-es van, ahány szakaszos jegy, és annyi 0, ahány előtag!
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. FEJEZET: ELLENTETT, ABSZOLÚTÉRTÉK ÉS RECIPROK */}
      <TheorySection
        number={4}
        title="Ellentett, Abszolútérték és Reciprok"
        icon={<HelpCircle className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
      >
        <TheoryTable
          headers={['Fogalom', 'Matematikai Jelölés', 'Definíció és Szabály', 'Példa']}
          rows={[
            ['Ellentett', '-a', 'A számmal ellentétes előjelű szám. Összegük mindig 0: a + (-a) = 0.', '5 ellentettje -5; -3/4 ellentettje +3/4'],
            ['Abszolútérték', '|a|', 'A szám távolsága a 0-tól a számegyenesen. Soha nem negatív (|a| ≥ 0).', '|+7| = 7; |-7| = 7; |0| = 0'],
            ['Reciprok', '1/a', 'Az a szám, amivel megszorozva a-t 1-et kapunk (a ≠ 0). a · (1/a) = 1.', '4 reciproka 1/4; 2/3 reciproka 3/2; -5/7 reciproka -7/5']
          ]}
        />

        <TheoryTrapBox title="Csapdahelyzet: Az abszolútérték és a negatív előjel">
          <p>
            Vigyázat! A -|a| és |-a| nem ugyanaz!
            <br />
            • |-5| = +5 (pozitív, mert az abszolútérték távolságot jelent)
            <br />
            • -|-5| = -5 (először elvégezzük a belsőt: |-5| = 5, majd elé tesszük a mínuszt: -5)
          </p>
        </TheoryTrapBox>

        {/* Önellenőrző kérdés */}
        <div className="mt-5 p-5 bg-gradient-to-br from-emerald-50/70 to-teal-50/70 dark:from-slate-850 dark:to-slate-900 rounded-2xl border-2 border-emerald-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              Önellenőrző Kérdés: Mennyi a 0.6̇ (tiszta szakaszos tizedestört) egyszerűsített tört alakja?
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Írd fel a 0.666... végtelen szakaszos tizedestörtet tovább már nem egyszerűsíthető közönséges törtként!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {[
              { text: '6/10', value: 1 },
              { text: '2/3', value: 2 },
              { text: '6/99', value: 3 },
              { text: '3/5', value: 4 }
            ].map((opt, idx) => (
              <button
                key={idx}
                disabled={quizSubmitted}
                onClick={() => setQuizAnswer(opt.value)}
                className={cn(
                  'p-2.5 rounded-xl text-xs font-bold transition-all border text-center',
                  quizAnswer === opt.value
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-400'
                )}
              >
                {opt.text}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            {!quizSubmitted ? (
              <Button
                size="sm"
                disabled={quizAnswer === null}
                onClick={() => setQuizSubmitted(true)}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4"
              >
                Válasz ellenőrzése
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold">
                {quizAnswer === 2 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Helyes! 0.6̇ = 6/9, amit 3-mal egyszerűsítve 2/3-ot kapunk.
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Nem jó! 0.6̇ = 6/9, egyszerűsítve 2/3.
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default RationalSetTheory;
