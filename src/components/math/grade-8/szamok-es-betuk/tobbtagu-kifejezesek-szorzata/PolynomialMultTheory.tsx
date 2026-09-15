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
  Boxes,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Calculator,
  Layers,
  Square,
  Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PolynomialMultTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

type IdentityType = 'binomial_mult' | 'sum_sq' | 'diff_sq' | 'diff_of_sq';

export const PolynomialMultTheory: React.FC<PolynomialMultTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive simulator state
  const [selectedType, setSelectedType] = useState<IdentityType>('sum_sq');
  const [paramA, setParamA] = useState<number>(1); // coeff for x
  const [paramB, setParamB] = useState<number>(3); // const 1
  const [paramC, setParamC] = useState<number>(1); // coeff for x (for general)
  const [paramD, setParamD] = useState<number>(5); // const 2 (for general)

  // Self-test question state
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Compute expansion based on type
  const getExpansionDetails = () => {
    if (selectedType === 'sum_sq') {
      // (a*x + b)^2 = a^2*x^2 + 2*a*b*x + b^2
      const a2 = paramA * paramA;
      const mid = 2 * paramA * paramB;
      const b2 = paramB * paramB;
      const termX = paramA === 1 ? 'x' : `${paramA}x`;
      return {
        formula: `(${termX} + ${paramB})²`,
        steps: `(${termX})² + 2 · (${termX}) · (${paramB}) + (${paramB})²`,
        result: `${a2 === 1 ? '' : a2}x² + ${mid}x + ${b2}`,
        typeLabel: 'Kéttagú összeg négyzete: (a + b)² = a² + 2ab + b²'
      };
    } else if (selectedType === 'diff_sq') {
      // (a*x - b)^2 = a^2*x^2 - 2*a*b*x + b^2
      const a2 = paramA * paramA;
      const mid = 2 * paramA * paramB;
      const b2 = paramB * paramB;
      const termX = paramA === 1 ? 'x' : `${paramA}x`;
      return {
        formula: `(${termX} - ${paramB})²`,
        steps: `(${termX})² - 2 · (${termX}) · (${paramB}) + (${paramB})²`,
        result: `${a2 === 1 ? '' : a2}x² - ${mid}x + ${b2}`,
        typeLabel: 'Kéttagú különbség négyzete: (a - b)² = a² - 2ab + b²'
      };
    } else if (selectedType === 'diff_of_sq') {
      // (a*x + b)(a*x - b) = a^2*x^2 - b^2
      const a2 = paramA * paramA;
      const b2 = paramB * paramB;
      const termX = paramA === 1 ? 'x' : `${paramA}x`;
      return {
        formula: `(${termX} + ${paramB}) · (${termX} - ${paramB})`,
        steps: `(${termX})² - (${paramB})²`,
        result: `${a2 === 1 ? '' : a2}x² - ${b2}`,
        typeLabel: 'Négyzetek különbsége: (a + b)(a - b) = a² - b²'
      };
    } else {
      // (a*x + b)(c*x + d) = a*c*x^2 + (a*d + b*c)*x + b*d
      const ac = paramA * paramC;
      const mid = paramA * paramD + paramB * paramC;
      const bd = paramB * paramD;
      const term1 = paramA === 1 ? 'x' : `${paramA}x`;
      const term2 = paramC === 1 ? 'x' : `${paramC}x`;
      const signB = paramB >= 0 ? `+ ${paramB}` : `- ${Math.abs(paramB)}`;
      const signD = paramD >= 0 ? `+ ${paramD}` : `- ${Math.abs(paramD)}`;
      const signMid = mid >= 0 ? `+ ${mid}x` : `- ${Math.abs(mid)}x`;
      const signBd = bd >= 0 ? `+ ${bd}` : `- ${Math.abs(bd)}`;
      return {
        formula: `(${term1} ${signB}) · (${term2} ${signD})`,
        steps: `${paramA * paramC}x² + (${paramA * paramD}x) + (${paramB * paramC}x) + (${bd})`,
        result: `${ac === 1 ? '' : ac === -1 ? '-' : ac}x² ${signMid} ${signBd}`,
        typeLabel: 'Általános kéttagú szorzat: (a + b)(c + d) = ac + ad + bc + bd'
      };
    }
  };

  const currentDetails = getExpansionDetails();

  return (
    <TheoryTemplate
      title="11. Többtagú kifejezések szorzata"
      subtitle="Kéttagú kifejezések szorzása, a 3 nevezetes azonosság, geometriai területmodell és szorzattá alakítás"
      badgeColor="indigo"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: Kéttagú szorzása kéttagúval */}
      <TheorySection
        title="1. Kéttagú kifejezés szorzása kéttagúval"
        subtitle="Az alapelv: minden tagot megszorzunk minden taggal (2 × 2 = 4 tag az összevonás előtt)"
        badge="Alapszabály"
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A Kéttagú Szorzás Szabálya"
            badge="Szabály"
            badgeColor="indigo"
            icon={<Boxes className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
              Két kéttagú kifejezés összeszorzásakor az első zárójel <strong>minden tagját</strong> megszorozzuk a második zárójel <strong>minden tagjával</strong>, ügyelve az előjelekre, majd az egynemű tagokat összevonjuk:
            </p>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-200 dark:border-indigo-800 text-center font-mono font-bold text-indigo-900 dark:text-indigo-200 text-sm mb-3">
              (a + b) · (c + d) = ac + ad + bc + bd
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              💡 <em>Tipp:</em> A szorzás során 4 tag keletkezik, amelyekből a középső kettő (általában az x-es tagok) gyakran egynemű és összevonható.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Mintapéldák Lépésről Lépésre"
            badge="Példák"
            badgeColor="emerald"
            icon={<Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          >
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-800 dark:text-slate-200">1. Pozitív tagok:</span>
                <div className="font-mono text-indigo-700 dark:text-indigo-300 font-semibold mt-0.5">
                  (x + 3)(x + 5) = x² + 5x + 3x + 15<br />
                  <span className="text-emerald-600 dark:text-emerald-400">= x² + 8x + 15</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-800 dark:text-slate-200">2. Negatív előjellel:</span>
                <div className="font-mono text-indigo-700 dark:text-indigo-300 font-semibold mt-0.5">
                  (2x - 1)(3x + 4) = 6x² + 8x - 3x - 4<br />
                  <span className="text-emerald-600 dark:text-emerald-400">= 6x² + 5x - 4</span>
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: A 3 Nevezetes Azonosság */}
      <TheorySection
        title="2. A 3 Nevezetes Azonosság"
        subtitle="A legfontosabb algebrai képletek, amelyek rengeteg számolást és időt spórolnak meg"
        badge="Kiemelt Tananyag"
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Azonosság */}
          <TheoryCard
            title="1. Összeg Négyzete"
            badge="(a + b)²"
            badgeColor="emerald"
            icon={<Square className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          >
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 text-center font-mono font-bold text-emerald-900 dark:text-emerald-200 text-sm mb-2">
              (a + b)² = a² + 2ab + b²
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
              Első tag négyzete + <strong>kétszeres szorzat</strong> + második tag négyzete.
            </p>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700 font-mono text-xs text-emerald-700 dark:text-emerald-300">
              (x + 4)² = x² + 2·x·4 + 4²<br />
              = <strong>x² + 8x + 16</strong>
            </div>
          </TheoryCard>

          {/* 2. Azonosság */}
          <TheoryCard
            title="2. Különbség Négyzete"
            badge="(a - b)²"
            badgeColor="blue"
            icon={<Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
          >
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800 text-center font-mono font-bold text-blue-900 dark:text-blue-200 text-sm mb-2">
              (a - b)² = a² - 2ab + b²
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
              Első tag négyzete - <strong>kétszeres szorzat</strong> + második tag négyzete.
            </p>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700 font-mono text-xs text-blue-700 dark:text-blue-300">
              (x - 5)² = x² - 2·x·5 + 5²<br />
              = <strong>x² - 10x + 25</strong>
            </div>
          </TheoryCard>

          {/* 3. Azonosság */}
          <TheoryCard
            title="3. Négyzetek Különbsége"
            badge="(a+b)(a-b)"
            badgeColor="purple"
            icon={<Boxes className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
          >
            <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-800 text-center font-mono font-bold text-purple-900 dark:text-purple-200 text-sm mb-2">
              (a + b)(a - b) = a² - b²
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
              Összeg és különbség szorzatakor a középső tagok kiejtik egymást ($+ab - ab = 0$).
            </p>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700 font-mono text-xs text-purple-700 dark:text-purple-300">
              (x + 6)(x - 6) = x² - 6²<br />
              = <strong>x² - 36</strong>
            </div>
          </TheoryCard>
        </div>

        <TheoryTrapBox title="A Leggyakoribb Végzetes Hiba: A Kétszeres Szorzat Lehagyása!">
          <div className="text-sm space-y-2">
            <p>
              ❌ <strong>HIBA:</strong> $(a + b)^2 = a^2 + b^2$ &nbsp;és&nbsp; $(a - b)^2 = a^2 - b^2$<br />
              ✔️ <strong>HELYESEN:</strong> Mindig ott van a középső kétszeres szorzat tag: <strong>$+2ab$</strong> vagy <strong>$-2ab$</strong>!
            </p>
            <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-200 dark:border-amber-800 font-mono text-xs text-amber-900 dark:text-amber-200">
              Például: $(x + 3)^2 = x^2 + 6x + 9 \neq x^2 + 9$. Ha $x = 1$, akkor $(1+3)^2 = 4^2 = 16$, míg $1^2 + 9 = 10 \neq 16$!
            </div>
          </div>
        </TheoryTrapBox>
      </TheorySection>

      {/* 3. SZEKCIÓ: Geometriai Területmodell és Gyors Fejszámolás */}
      <TheorySection
        title="3. Geometriai Szemléltetés & Fejszámolási Trükkök"
        subtitle="Miért igaz a képlet a síkban, és hogyan szorozhatunk meg fejben nagy számokat másodpercek alatt?"
        badge="Alkalmazások"
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A Területmodell Szemlélete"
            badge="Geometria"
            badgeColor="indigo"
            icon={<Square className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
              Egy $(a+b)$ oldalú négyzet területe felbontható 4 kisebb téglalapra:
            </p>
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-bold">
                <span>Bal felső négyzet ($a \times a$):</span>
                <span>a²</span>
              </div>
              <div className="flex justify-between items-center text-blue-600 dark:text-blue-400 font-bold">
                <span>2 darab téglalap ($a \times b$):</span>
                <span>2 · ab</span>
              </div>
              <div className="flex justify-between items-center text-purple-600 dark:text-purple-400 font-bold">
                <span>Jobb alsó négyzet ($b \times b$):</span>
                <span>b²</span>
              </div>
              <div className="pt-1.5 border-t border-slate-300 dark:border-slate-600 flex justify-between items-center font-bold text-slate-900 dark:text-slate-100">
                <span>Teljes terület:</span>
                <span>(a + b)² = a² + 2ab + b²</span>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Zseniális Fejszámolási Trükk"
            badge="Gyors Matek"
            badgeColor="amber"
            icon={<Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
              A négyzetek különbsége $(a+b)(a-b) = a^2 - b^2$ segítségével azonnal kiszámolhatsz szorzatokat:
            </p>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-200 dark:border-amber-800">
                <span className="font-bold text-slate-900 dark:text-slate-100">Mennyi 42 · 38?</span><br />
                = (40 + 2) · (40 - 2) = 40² - 2²<br />
                = 1600 - 4 = <strong className="text-amber-700 dark:text-amber-300">1596</strong>
              </div>

              <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-200 dark:border-amber-800">
                <span className="font-bold text-slate-900 dark:text-slate-100">Mennyi 53 · 47?</span><br />
                = (50 + 3) · (50 - 3) = 50² - 3²<br />
                = 2500 - 9 = <strong className="text-amber-700 dark:text-amber-300">2491</strong>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: Interaktív Szimulátor és Önellenőrző */}
      <TheorySection
        title="4. Interaktív Nevezetes Azonosság Szimulátor"
        subtitle="Válaszd ki az azonosság típusát, állítsd be az együtthatókat, és kövesd a levezetést lépésről lépésre!"
        badge="Interaktív Szimulátor"
        badgeColor="indigo"
      >
        <div className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl border border-indigo-200 dark:border-indigo-800/60 shadow-sm mb-6">
          {/* Típusválasztó fülek */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { id: 'sum_sq', label: '(a + b)² Összeg négyzete' },
              { id: 'diff_sq', label: '(a - b)² Különbség négyzete' },
              { id: 'diff_of_sq', label: '(a + b)(a - b) Négyzetek különbsége' },
              { id: 'binomial_mult', label: '(ax + b)(cx + d) Általános szorzat' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id as IdentityType)}
                className={cn(
                  'px-3 py-1.5 text-xs font-bold rounded-xl transition-all',
                  selectedType === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Paraméterek beállítása */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                \'x\' együtthatója (a):
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((val) => (
                  <button
                    key={val}
                    onClick={() => setParamA(val)}
                    className={cn(
                      'px-2.5 py-1 text-xs font-mono font-bold rounded-md transition-all',
                      paramA === val
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    )}
                  >
                    {val === 1 ? '1 (x)' : val}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                Konstans szám (b):
              </label>
              <div className="flex gap-1 flex-wrap">
                {[1, 2, 3, 4, 5, 6].map((val) => (
                  <button
                    key={val}
                    onClick={() => setParamB(val)}
                    className={cn(
                      'px-2.5 py-1 text-xs font-mono font-bold rounded-md transition-all',
                      paramB === val
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    )}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {selectedType === 'binomial_mult' && (
              <>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Második \'x\' együtthatója (c):
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((val) => (
                      <button
                        key={val}
                        onClick={() => setParamC(val)}
                        className={cn(
                          'px-2.5 py-1 text-xs font-mono font-bold rounded-md transition-all',
                          paramC === val
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                        )}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Második konstans (d):
                  </label>
                  <div className="flex gap-1 flex-wrap">
                    {[-3, -2, 2, 4].map((val) => (
                      <button
                        key={val}
                        onClick={() => setParamD(val)}
                        className={cn(
                          'px-2.5 py-1 text-xs font-mono font-bold rounded-md transition-all',
                          paramD === val
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                        )}
                      >
                        {val > 0 ? `+${val}` : val}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Eredmény levezetés kártya */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-indigo-200 dark:border-indigo-800">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              {currentDetails.typeLabel}
            </div>
            <div className="font-mono text-base text-slate-900 dark:text-slate-100 font-bold mb-2">
              Kifejezés: <span className="text-indigo-600 dark:text-indigo-400">{currentDetails.formula}</span>
            </div>
            <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-2">
              Részletes kifejtés: {currentDetails.steps}
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">
              Kifejtett alak: {currentDetails.result}
            </div>
          </div>
        </div>

        {/* Önellenőrző kérdés */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h4 className="font-bold text-slate-900 dark:text-slate-100">
              Önellenőrző Tesztkérdés
            </h4>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
            Mennyi a <strong>(2x - 3)²</strong> kifejezés helyes kifejtett alakja?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            {[
              { id: 0, text: '4x² - 9', correct: false },
              { id: 1, text: '4x² - 12x + 9', correct: true },
              { id: 2, text: '4x² - 6x + 9', correct: false },
              { id: 3, text: '2x² - 12x + 9', correct: false }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setQuizAnswer(option.id);
                  setQuizSubmitted(true);
                }}
                className={cn(
                  'p-3 text-left rounded-lg text-xs sm:text-sm font-mono transition-all border flex items-center justify-between',
                  quizAnswer === option.id
                    ? option.correct
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold'
                      : 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200 font-bold'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                <span>{option.text}</span>
                {quizSubmitted && quizAnswer === option.id && (
                  option.correct
                    ? <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-2" />
                    : <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 ml-2" />
                )}
              </button>
            ))}
          </div>

          {quizSubmitted && quizAnswer !== null && (
            <div className={cn(
              'p-3 rounded-lg text-xs sm:text-sm border',
              quizAnswer === 1
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-800 dark:text-emerald-300'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-800 dark:text-rose-300'
            )}>
              {quizAnswer === 1 ? '🎉 Helyes válasz! ' : '❌ Nem pontos! '}
              (2x - 3)² = (2x)² - 2 · (2x) · 3 + 3² = <strong>4x² - 12x + 9</strong>. Ügyelj arra, hogy mind az első tag (2x), mind a második tag (3) négyzetre emelkedik, a középső tag pedig a kétszeres szorzat (-12x).
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PolynomialMultTheory;
