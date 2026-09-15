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
  Scissors,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Calculator,
  Layers,
  ArrowLeftRight,
  Boxes
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FactoringTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const FactoringTheory: React.FC<FactoringTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive distribution / factoring simulator state
  const [outerFactor, setOuterFactor] = useState<number>(3);
  const [hasOuterX, setHasOuterX] = useState<boolean>(true);
  const [innerA, setInnerA] = useState<number>(2);
  const [innerB, setInnerB] = useState<number>(-4);

  // Self-test question state
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Calculation for simulator
  // Outer term: (outerFactor * (hasOuterX ? 'x' : '1'))
  // Inner expression: (innerA * x + innerB)
  // Expanded: outerFactor * innerA * (hasOuterX ? x^2 : x) + outerFactor * innerB * (hasOuterX ? x : 1)
  const term1Coeff = outerFactor * innerA;
  const term2Coeff = outerFactor * innerB;
  const term1Power = hasOuterX ? 2 : 1;
  const term2Power = hasOuterX ? 1 : 0;

  const formatTerm = (coeff: number, power: number, isFirst: boolean = false) => {
    if (coeff === 0) return isFirst ? '0' : '';
    let signStr = '';
    if (!isFirst) {
      signStr = coeff > 0 ? ' + ' : ' - ';
    } else if (coeff < 0) {
      signStr = '-';
    }
    const absCoeff = Math.abs(coeff);
    const coeffStr = (absCoeff === 1 && power > 0) ? '' : `${absCoeff}`;
    let varStr = '';
    if (power === 2) varStr = 'x²';
    else if (power === 1) varStr = 'x';

    return `${signStr}${coeffStr}${varStr}`;
  };

  const expandedString = `${formatTerm(term1Coeff, term1Power, true)}${formatTerm(term2Coeff, term2Power, false)}`;
  const outerTermStr = hasOuterX
    ? (outerFactor === 1 ? 'x' : outerFactor === -1 ? '-x' : `${outerFactor}x`)
    : `${outerFactor}`;
  const innerTermStr = `${formatTerm(innerA, 1, true)}${formatTerm(innerB, 0, false)}`;
  const factorizedString = `${outerTermStr} · (${innerTermStr})`;

  return (
    <TheoryTemplate
      title="10. Betűs kifejezések szorzása és a kiemelés"
      subtitle="Egytagú kifejezések szorzata, zárójelfelbontás (disztributivitás) és a közös tényező kiemelése (szorzattá alakítás)"
      badgeColor="purple"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: Egytagú szorzása egytagúval */}
      <TheorySection
        title="1. Egytagú algebrai kifejezések szorzása"
        subtitle="Számok a számokkal, betűk a betűkkel – a hatványozás azonosságának alkalmazása"
        badge="Alapvető Szorzás"
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A Szorzás Szabálya"
            badge="Szabály"
            badgeColor="purple"
            icon={<Scissors className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
              Egytagú kifejezések szorzásakor:
            </p>
            <ol className="list-decimal list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1.5 mb-3 font-medium">
              <li>Az <strong>együtthatókat (számokat)</strong> összeszorozzuk az előjelek figyelembevételével.</li>
              <li>Az <strong>azonos változók kitevőit</strong> összeadjuk: $a^n \cdot a^m = a^{n+m}$.</li>
              <li>A különböző változókat egymás mellé írjuk szorzatként (pl. $x \cdot y = xy$).</li>
            </ol>
            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-800 text-center font-mono font-bold text-purple-800 dark:text-purple-300">
              (A · xⁿ) · (B · xᵐ) = (A · B) · xⁿ⁺ᵐ
            </div>
          </TheoryCard>

          <TheoryCard
            title="Mintapéldák Lépésről Lépésre"
            badge="Példák"
            badgeColor="emerald"
            icon={<Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          >
            <div className="space-y-2.5 text-sm">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-800 dark:text-slate-200">1. Egyszerű eset:</span>
                <div className="font-mono text-purple-700 dark:text-purple-300 font-semibold mt-0.5">
                  3x · 4y = (3 · 4) · (x · y) = 12xy
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-800 dark:text-slate-200">2. Azonos változók kitevőivel:</span>
                <div className="font-mono text-purple-700 dark:text-purple-300 font-semibold mt-0.5">
                  2a² · 5a³ = (2 · 5) · a²⁺³ = 10a⁵
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-800 dark:text-slate-200">3. Negatív előjelekkel és több betűvel:</span>
                <div className="font-mono text-purple-700 dark:text-purple-300 font-semibold mt-0.5">
                  (-4x²y) · (3xy³) = (-4 · 3) · x²⁺¹ · y¹⁺³ = -12x³y⁴
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>

        <TheoryTrapBox title="Gyakori Hiba: Összeadás és Szorzás Keverése!">
          <div className="space-y-2 text-sm">
            <p>
              ❌ <strong>HIBA:</strong> $3x + 4x = 7x^2$ vagy $3x \cdot 4x = 12x$<br />
              ✔️ <strong>HELYESEN:</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
              <div className="p-2 bg-rose-50 dark:bg-rose-950/40 rounded border border-rose-200 dark:border-rose-800">
                <strong>ÖSSZEADÁS:</strong> $3x + 4x = (3+4)x = 7x$<br />
                <span className="text-slate-600 dark:text-slate-400 font-sans">Csak az együtthatók adódnak össze, a kitevő nem változik!</span>
              </div>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-200 dark:border-emerald-800">
                <strong>SZORZÁS:</strong> $3x \cdot 4x = (3 \cdot 4) \cdot x^{1+1} = 12x^2$<br />
                <span className="text-slate-600 dark:text-slate-400 font-sans">A számok szorzódnak, és a kitevők összeadódnak!</span>
              </div>
            </div>
          </div>
        </TheoryTrapBox>
      </TheorySection>

      {/* 2. SZEKCIÓ: Egytagú szorzása többtagúval (Zárójelbontás) */}
      <TheorySection
        title="2. Egytagú szorzása többtagúval (Zárójelfelbontás)"
        subtitle="A disztributív tulajdonság: minden tagot megszorzunk a külső tényezővel"
        badge="Zárójelbontás"
        badgeColor="indigo"
      >
        <TheoryCard
          title="A Zárójelfelbontás Alapszabálya"
          badge="Disztributivitás"
          badgeColor="indigo"
          icon={<Boxes className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        >
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
            Ha egy zárójelben lévő összeget vagy különbséget egy számmal vagy egytagú kifejezéssel szorzunk meg, akkor a zárójel <strong>minden egyes tagját</strong> meg kell szoroznunk a külső tényezővel:
          </p>
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center font-mono text-base font-bold text-indigo-900 dark:text-indigo-200 mb-4">
            k · (a + b - c) = k·a + k·b - k·c
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Pozitív számmal:</div>
              <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                3 · (2x + 5) = 3·2x + 3·5<br />
                = 6x + 15
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Negatív számmal:</div>
              <div className="font-mono text-xs text-rose-600 dark:text-rose-400 font-bold">
                -2 · (3x - 4) = -2·3x + (-2)·(-4)<br />
                = -6x + 8
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Változós tényezővel:</div>
              <div className="font-mono text-xs text-purple-600 dark:text-purple-400 font-bold">
                4x · (2x² - 3x + 1) =<br />
                = 8x³ - 12x² + 4x
              </div>
            </div>
          </div>
        </TheoryCard>

        <TheoryCallout variant="warning" title="Előjelcsapda: Negatív tényezővel való szorzás">
          Amikor a külső tényező negatív (pl. $-3x$), az a zárójelben lévő <strong>összes tag előjelét megfordítja</strong>!
          <div className="font-mono text-sm mt-1 text-amber-900 dark:text-amber-200 font-bold">
            -3x · (2x - 5) = -3x · (2x) - 3x · (-5) = -6x² + 15x
          </div>
          Gyakori hiba a második tagnál az előjelet lehagyni vagy mínuszt írni: $(-3x) \cdot (-5) = +15x$.
        </TheoryCallout>
      </TheorySection>

      {/* 3. SZEKCIÓ: Kiemelés a zárójel elé (Szorzattá alakítás) */}
      <TheorySection
        title="3. Közös tényező kiemelése zárójel elé (Szorzattá alakítás)"
        subtitle="A zárójelbontás fordított művelete: a legnagyobb közös osztó kiemelése"
        badge="Kiemelés"
        badgeColor="emerald"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Hogyan Kiemelünk Közös Tényezőt?"
            badge="Módszer"
            badgeColor="emerald"
            icon={<ArrowLeftRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          >
            <ol className="list-decimal list-inside text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-3">
              <li>
                <strong>Számegyütthatók LNKO-ja:</strong> Megkeressük az együtthatók legnagyobb közös osztóját (pl. 6 és 9 esetén 3).
              </li>
              <li>
                <strong>Közös változók:</strong> Kikeressük azokat a betűket, amelyek <em>minden tagban</em> szerepelnek, és kiemeljük őket a <strong>legkisebb előforduló kitevőjükön</strong> (pl. $x^3$ és $x^2$ esetén $x^2$).
              </li>
              <li>
                <strong>A zárójel feltöltése:</strong> Az eredeti tagokat elosztjuk a kiemelt tényezővel.
              </li>
            </ol>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 text-center font-mono font-bold text-emerald-800 dark:text-emerald-300 text-sm">
              6x² + 9x = 3x · (2x + 3)
            </div>
          </TheoryCard>

          <TheoryCard
            title="Kiemelési Mintapéldák"
            badge="Példatár"
            badgeColor="blue"
            icon={<Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
          >
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700">
                <div className="font-semibold text-slate-800 dark:text-slate-200">1. Csak szám kiemelése:</div>
                <div className="font-mono text-blue-700 dark:text-blue-300 font-bold">
                  8x - 12 = 4 · (2x - 3)
                </div>
              </div>

              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700">
                <div className="font-semibold text-slate-800 dark:text-slate-200">2. Szám és változó kiemelése:</div>
                <div className="font-mono text-blue-700 dark:text-blue-300 font-bold">
                  10x² - 15x = 5x · (2x - 3)
                </div>
              </div>

              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700">
                <div className="font-semibold text-slate-800 dark:text-slate-200">3. Többváltozós kiemelés:</div>
                <div className="font-mono text-blue-700 dark:text-blue-300 font-bold">
                  12a²b + 18ab² = 6ab · (2a + 3b)
                </div>
              </div>

              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700">
                <div className="font-semibold text-slate-800 dark:text-slate-200">4. Negatív előjel kiemelése:</div>
                <div className="font-mono text-rose-600 dark:text-rose-400 font-bold">
                  -4x - 8 = -4 · (x + 2)
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout variant="info" title="Hogyan ellenőrizheted a kiemelést?">
          A kiemelést mindig ellenőrizheted <strong>fejben történő visszaszorzással (zárójelbontással)</strong>! Ha a zárójel felbontása után pontosan az eredeti kifejezést kapod vissza, akkor a kiemelésed helyes.
        </TheoryCallout>
      </TheorySection>

      {/* 4. SZEKCIÓ: Interaktív Demonstrátor és Önellenőrző */}
      <TheorySection
        title="4. Interaktív Szorzó & Kiemelő Demonstrátor"
        subtitle="Próbáld ki a zárójelbontás és kiemelés kétirányú működését dinamikusan változtatható paraméterekkel!"
        badge="Interaktív Gyakorló"
        badgeColor="amber"
      >
        <div className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 rounded-2xl border border-purple-200 dark:border-purple-800/60 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h4 className="font-bold text-slate-900 dark:text-slate-100">
              Kifejezés Paraméterezése: <span className="font-mono text-purple-700 dark:text-purple-300">{factorizedString}</span>
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                Külső együttható (k):
              </label>
              <div className="flex gap-1 flex-wrap">
                {[-3, -2, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => setOuterFactor(val)}
                    className={cn(
                      'px-2.5 py-1 text-xs font-mono font-bold rounded-md transition-all',
                      outerFactor === val
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-purple-300'
                    )}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                Külső változó:
              </label>
              <div className="flex gap-1">
                <button
                  onClick={() => setHasOuterX(false)}
                  className={cn(
                    'px-3 py-1 text-xs font-semibold rounded-md transition-all',
                    !hasOuterX
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  )}
                >
                  Csak szám ({outerFactor})
                </button>
                <button
                  onClick={() => setHasOuterX(true)}
                  className={cn(
                    'px-3 py-1 text-xs font-semibold rounded-md transition-all',
                    hasOuterX
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  )}
                >
                  Betűs ({outerFactor}x)
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                Belső 1. tag (a · x):
              </label>
              <div className="flex gap-1 flex-wrap">
                {[1, 2, 3, 4].map((val) => (
                  <button
                    key={val}
                    onClick={() => setInnerA(val)}
                    className={cn(
                      'px-2.5 py-1 text-xs font-mono font-bold rounded-md transition-all',
                      innerA === val
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                    )}
                  >
                    {val === 1 ? 'x' : `${val}x`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                Belső 2. tag (b):
              </label>
              <div className="flex gap-1 flex-wrap">
                {[-5, -4, -3, 2, 3, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => setInnerB(val)}
                    className={cn(
                      'px-2.5 py-1 text-xs font-mono font-bold rounded-md transition-all',
                      innerB === val
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                    )}
                  >
                    {val > 0 ? `+${val}` : `${val}`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Eredmény kétirányú bemutatása */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1 flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5" />
                Irány 1: Zárójel felbontása (Szorzás)
              </div>
              <div className="font-mono text-sm text-slate-800 dark:text-slate-200 space-y-1">
                <div>Kezdő alak: <span className="font-bold text-purple-700 dark:text-purple-300">{factorizedString}</span></div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Lépés: ({outerTermStr} · {formatTerm(innerA, 1, true)}) + ({outerTermStr} · {innerB > 0 ? innerB : `(${innerB})`})
                </div>
                <div className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1 border-t border-slate-100 dark:border-slate-800">
                  Kifejtett alak: <span className="text-indigo-600 dark:text-indigo-400">{expandedString}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-indigo-200 dark:border-indigo-800">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1 flex items-center gap-1.5">
                <ArrowLeftRight className="w-3.5 h-3.5" />
                Irány 2: Kiemelés (Szorzattá alakítás)
              </div>
              <div className="font-mono text-sm text-slate-800 dark:text-slate-200 space-y-1">
                <div>Kezdő összeg: <span className="font-bold text-indigo-600 dark:text-indigo-400">{expandedString}</span></div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  LNKO és közös változó: <span className="font-semibold text-purple-600 dark:text-purple-400">{outerTermStr}</span>
                </div>
                <div className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1 border-t border-slate-100 dark:border-slate-800">
                  Szorzat alak: <span className="text-purple-700 dark:text-purple-300">{factorizedString}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Önellenőrző kérdés */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h4 className="font-bold text-slate-900 dark:text-slate-100">
              Gondolkodtató Önellenőrző Kérdés
            </h4>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
            Melyik a <strong>12x³ - 18x²</strong> kifejezés <em>teljes</em>, legnagyobb közös tényezőt tartalmazó szorzattá alakított alakja?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            {[
              { id: 0, text: '6x · (2x² - 3x)', correct: false, note: 'Nem teljes kiemelés: a zárójelben maradt még közös \'x\' változó!' },
              { id: 1, text: '6x² · (2x - 3)', correct: true, note: 'HELYES! LNKO(12, 18) = 6, és a közös változó legkisebb kitevője x².' },
              { id: 2, text: '3x² · (4x - 6)', correct: false, note: 'Nem a legnagyobb szám lett kiemelve: a 4 és 6 még osztható 2-vel!' },
              { id: 3, text: '2x² · (6x - 9)', correct: false, note: 'A 6 és 9 osztható még 3-mal, így 6x² emelhető ki!' }
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
              {quizAnswer === 1 ? '🎉 Helyes válasz! ' : '❌ Nem a legteljesebb alak! '}
              A 12 és 18 legnagyobb közös osztója a 6, az x³ és x² legkisebb kitevőjű közös része pedig az x², így a legnagyobb kiemelhető tényező a <strong>6x²</strong>.
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FactoringTheory;
