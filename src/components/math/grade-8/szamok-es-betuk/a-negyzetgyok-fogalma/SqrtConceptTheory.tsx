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
  Square,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Calculator,
  ShieldAlert,
  Compass,
  Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SqrtConceptTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const SqrtConceptTheory: React.FC<SqrtConceptTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive square and square root explorer state
  const [inputNumber, setInputNumber] = useState<number>(9);

  // Self-test question state
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const calculateSqrtInfo = (num: number) => {
    const squareVal = num * num;
    const sqrtOfSquare = Math.abs(num);
    const isNumNonNeg = num >= 0;
    const sqrtVal = isNumNonNeg ? Math.sqrt(num) : null;

    return {
      squareVal,
      sqrtOfSquare,
      isNumNonNeg,
      sqrtVal: sqrtVal !== null ? (Number.isInteger(sqrtVal) ? String(sqrtVal) : sqrtVal.toFixed(4)) : 'Nem értelmezhető (a < 0)'
    };
  };

  const sqrtInfo = calculateSqrtInfo(inputNumber);

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="grade-8-szamok-betuk-negyzetgyok-fogalom"
      pdfFilename="8_osztaly_negyzetgyok_fogalma_tananyag.pdf"
      title="7. A négyzetgyök fogalma"
      subtitle="A négyzetgyök matematikai definíciója, nemnegativitási szabályok, értelmezési tartomány, √(a²) = |a| és becslések"
      quickRule={{
        label: "Négyzetgyök alapszabályai",
        formula: "a ≥ 0  |  √a ≥ 0  |  (√a)² = a  |  √(a²) = |a|  |  √0 = 0"
      }}
      themeColor="rose"
    >
      {/* 1. FEJEZET: A NÉGYZETGYÖK DEFINÍCIÓJA ÉS A KÉT ALAPSZABÁLY */}
      <TheorySection
        number={1}
        title="A négyzetgyök definíciója és a két aranyszabály"
        icon={<Square className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <TheoryCallout variant="info" title="Mit nevezünk egy szám négyzetgyökének?">
          Egy nemnegatív <strong>a</strong> szám négyzetgyöke (jele: <strong>√a</strong>) az a <strong>nemnegatív szám</strong>, amelynek a négyzete pontosan <strong>a</strong>.
          <div className="mt-2 p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-slate-800 font-mono font-bold text-xs sm:text-sm text-center text-rose-900 dark:text-rose-200">
            (√a)² = a &nbsp;&nbsp;és&nbsp;&nbsp; √a ≥ 0 &nbsp;&nbsp;(ahol a ≥ 0)
          </div>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <TheoryCard
            title="1. Szabály: A gyök alatti szám nemnegatív"
            badge="a ≥ 0"
            badgeColor="rose"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Mivel egyetlen valós szám négyzete sem lehet negatív, a valós számok körében <strong>negatív számból nem lehet négyzetgyököt vonni</strong>.
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-rose-800 dark:text-rose-300">
              <div>• √25 = 5 (létezik)</div>
              <div>• √0 = 0 (létezik)</div>
              <div>• √(-16) ⟶ Nem értelmezhető!</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Szabály: A gyökvonás eredménye nemnegatív"
            badge="√a ≥ 0"
            badgeColor="emerald"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Bár 5² = 25 és (-5)² = 25 is igaz, a <strong>√25 szimbólum definíció szerint csak a +5-öt jelenti</strong> (és NEM ±5-öt!).
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
              <div>• √49 = +7 (mindig pozitív vagy 0)</div>
              <div>• √1 = +1</div>
              <div>• -√49 = -7 (előjel a gyök előtt van)</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="3. Egyenlet vs. Négyzetgyök szimbólum"
            badge="x² = 25 vs √25"
            badgeColor="amber"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Fontos megkülönböztetni az egyenlet megoldását a gyökvonás műveletétől:
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-amber-800 dark:text-amber-300">
              <div>• x² = 25 ⟹ x₁ = +5, x₂ = -5</div>
              <div>• De maga a √25 = 5 (egyértelmű szám)</div>
            </div>
          </TheoryCard>
        </div>

        {/* Interaktív Négyzet & Négyzetgyök szimulátor */}
        <div className="mt-5 p-5 bg-slate-50 dark:bg-slate-850 rounded-2xl border-2 border-rose-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-300">
            <Sparkles className="w-4 h-4" />
            Interaktív Négyzet és Négyzetgyök Vizualizáló
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Válassz egy x számot:</label>
              <input
                type="number"
                value={inputNumber}
                onChange={(e) => setInputNumber(parseFloat(e.target.value) || 0)}
                className="w-20 h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-center"
              />
            </div>

            <div className="p-2.5 px-4 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-slate-700 font-mono font-bold text-xs sm:text-sm text-rose-800 dark:text-rose-300">
              x² = ({inputNumber})² = <strong>{sqrtInfo.squareVal}</strong> &nbsp;⟶&nbsp; √(x²) = √({sqrtInfo.squareVal}) = <strong>{sqrtInfo.sqrtOfSquare} = |{inputNumber}|</strong>
            </div>

            {inputNumber >= 0 && (
              <div className="p-2.5 px-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-slate-700 font-mono font-bold text-xs sm:text-sm text-emerald-800 dark:text-emerald-300">
                √x = √({inputNumber}) = <strong>{sqrtInfo.sqrtVal}</strong>
              </div>
            )}
          </div>
        </div>
      </TheorySection>

      {/* 2. FEJEZET: ÉRTELMEZÉSI TARTOMÁNY */}
      <TheorySection
        number={2}
        title="Négyzetgyökös kifejezések értelmezési tartománya (Kikötések)"
        icon={<ShieldAlert className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <TheoryCallout variant="tip" title="Hogyan határozzuk meg az értelmezési tartományt?">
          Ha egy kifejezésben négyzetgyök szerepel, mindig fel kell írnunk a kikötést: <strong>a gyökjel alatti kifejezésnek nagyobbnak vagy egyenlőnek kell lennie 0-nál (nemnegatív)</strong>!
        </TheoryCallout>

        <TheoryTable
          headers={['Kifejezés', 'Kikötés (Gyök alatti ≥ 0)', 'Értelmezési Tartomány (Megoldás)', 'Példa behelyettesítés']}
          rows={[
            ['√x', 'x ≥ 0', 'x ∈ [0; ∞) (nemnegatív számok)', 'x = 9 ⟹ √9 = 3, de x = -4 esetén nem értelmezett'],
            ['√(x - 4)', 'x - 4 ≥ 0 ⟹ x ≥ 4', 'x ≥ 4', 'x = 4 ⟹ √0 = 0;  x = 13 ⟹ √9 = 3;  x = 2 ⟹ √(-2) ✗'],
            ['√(6 - 2x)', '6 - 2x ≥ 0 ⟹ 2x ≤ 6 ⟹ x ≤ 3', 'x ≤ 3', 'x = 3 ⟹ √0 = 0;  x = 1 ⟹ √4 = 2;  x = 5 ⟹ √(-4) ✗'],
            ['√(-x)', '-x ≥ 0 ⟹ x ≤ 0', 'x ≤ 0 (nempozitív számok)', 'x = -9 ⟹ √(-(-9)) = √9 = 3;  x = 4 ⟹ √(-4) ✗'],
            ['√(x² + 5)', 'x² + 5 ≥ 0 (mindig igaz!)', 'Minden valós számra értelmezett (x ∈ ℝ)', 'Bármely valós szám négyzete ≥ 0, így x² + 5 ≥ 5 > 0']
          ]}
        />
      </TheorySection>

      {/* 3. FEJEZET: AZONOSSÁGOK: (√a)² = a ÉS √(a²) = |a| */}
      <TheorySection
        number={3}
        title="A négyzet és négyzetgyök kapcsolata: (√a)² = a és √(a²) = |a|"
        icon={<Scale className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="1. Kívül van a négyzet: (√a)² = a"
            badge="Csak ha a ≥ 0"
            badgeColor="emerald"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Mivel a belső gyökvonás csak nemnegatív számra végezhető el, ez az összefüggés csak <strong>a ≥ 0</strong> esetén érvényes.
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
              <div>• (√7)² = 7</div>
              <div>• (√15)² = 15</div>
              <div>• (√(-5))² ⟶ Nem létezik!</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Belül van a négyzet: √(a²) = |a|"
            badge="Minden valós a-ra!"
            badgeColor="rose"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Mivel a² mindig nemnegatív, bármely valós számból gyököt vonhatunk. Az eredmény a szám <strong>abszolút értéke</strong>:
            </p>
            <div className="mt-2 space-y-1 text-xs font-mono font-bold text-rose-800 dark:text-rose-300">
              <div>• √(5²) = √25 = 5 = |5|</div>
              <div>• √((-5)²) = √25 = 5 = |-5| (NEM -5!)</div>
              <div>• √((-12)²) = 12</div>
            </div>
          </TheoryCard>
        </div>

        <TheoryTrapBox title="Gyakori csapdák: Összeg gyöke és az előjelek">
          <div className="space-y-1">
            <p>
              • <strong>VIGYÁZAT: √(a + b) ≠ √a + √b!</strong> Összegből és különbségből tilos tagonként gyököt vonni!
              <br />
              <span className="text-rose-700 dark:text-rose-300 font-mono font-bold">
                Példa: √(9 + 16) = √25 = 5, míg √9 + √16 = 3 + 4 = 7 (5 ≠ 7!).
              </span>
            </p>
            <p>
              • <strong>-√a vs √(-a):</strong> A -√25 értéke -5 (szabályos, negatív szám). A √(-25) viszont nem értelmezhető!
            </p>
          </div>
        </TheoryTrapBox>
      </TheorySection>

      {/* 4. FEJEZET: NÉGYZETGYÖKÖK BECSLÉSE ÉS ÖNELLENŐRZÉS */}
      <TheorySection
        number={4}
        title="Négyzetgyökök becslése és önellenőrző feladat"
        icon={<Compass className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <TheoryCallout variant="info" title="Hogyan becsüljük meg a nem négyzetszámok gyökét?">
          Zárjuk a számot a két legközelebbi ismert négyzetszám közé:
          <div className="mt-2 p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-slate-800 font-mono font-bold text-xs text-rose-900 dark:text-rose-200">
            36 &lt; 45 &lt; 49 &nbsp;⟹&nbsp; √36 &lt; √45 &lt; √49 &nbsp;⟹&nbsp; <strong>6 &lt; √45 &lt; 7</strong>
          </div>
        </TheoryCallout>

        {/* Önellenőrző kérdés */}
        <div className="mt-5 p-5 bg-gradient-to-br from-rose-50/70 to-pink-50/70 dark:from-slate-850 dark:to-slate-900 rounded-2xl border-2 border-rose-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-rose-600" />
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              Önellenőrző Kérdés: Mennyi a √((-8)²) - (√8)² kifejezés pontos értéke?
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Alkalmazd a √(a²) = |a| és a (√a)² = a azonosságokat!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {[
              { text: '0', value: 1 },
              { text: '-16', value: 2 },
              { text: '16', value: 3 },
              { text: 'Nem értelmezhető', value: 4 }
            ].map((opt, idx) => (
              <button
                key={idx}
                disabled={quizSubmitted}
                onClick={() => setQuizAnswer(opt.value)}
                className={cn(
                  'p-2.5 rounded-xl text-xs font-bold transition-all border text-center',
                  quizAnswer === opt.value
                    ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-rose-400'
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
                className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4"
              >
                Válasz ellenőrzése
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold">
                {quizAnswer === 1 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Helyes! √((-8)²) = |-8| = 8, és (√8)² = 8. Ekkor 8 - 8 = 0.
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Nem jó! √((-8)²) = |-8| = 8, és (√8)² = 8 ⟹ 8 - 8 = 0.
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

export default SqrtConceptTheory;
