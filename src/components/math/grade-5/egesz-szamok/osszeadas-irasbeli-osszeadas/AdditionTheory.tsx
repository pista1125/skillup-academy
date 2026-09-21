import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Plus,
  Equal,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Calculator,
  RotateCcw,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface AdditionTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function AdditionTheory({ onBack, onStartQuiz }: AdditionTheoryProps) {
  // Interactive Simulator State
  const [num1, setNum1] = useState<string>('4785');
  const [num2, setNum2] = useState<string>('3648');
  const [stepIndex, setStepIndex] = useState<number>(0);

  // Helper for column addition steps
  const getAdditionSteps = (val1Str: string, val2Str: string) => {
    const n1 = parseInt(val1Str, 10);
    const n2 = parseInt(val2Str, 10);
    if (isNaN(n1) || isNaN(n2) || n1 < 0 || n2 < 0 || n1 > 9999999 || n2 > 9999999) {
      return null;
    }

    const s1 = n1.toString();
    const s2 = n2.toString();
    const maxLen = Math.max(s1.length, s2.length);

    const pad1 = s1.padStart(maxLen, '0');
    const pad2 = s2.padStart(maxLen, '0');

    let carry = 0;
    const steps = [];
    const sumDigits = [];

    for (let i = maxLen - 1; i >= 0; i--) {
      const d1 = parseInt(pad1[i], 10);
      const d2 = parseInt(pad2[i], 10);
      const colSum = d1 + d2 + carry;
      const resultDigit = colSum % 10;
      const nextCarry = Math.floor(colSum / 10);

      const placeName =
        maxLen - 1 - i === 0
          ? 'egyesek'
          : maxLen - 1 - i === 1
          ? 'tízesek'
          : maxLen - 1 - i === 2
          ? 'százasok'
          : maxLen - 1 - i === 3
          ? 'ezresek'
          : maxLen - 1 - i === 4
          ? 'tízezresek'
          : 'százezresek';

      steps.push({
        colIndex: maxLen - 1 - i,
        placeName,
        d1,
        d2,
        prevCarry: carry,
        colSum,
        resultDigit,
        nextCarry,
        explanation: `${d1} + ${d2}${carry > 0 ? ` + ${carry} (maradék)` : ''} = ${colSum}. Leírjuk a(z) ${resultDigit}-t, maradt a(z) ${nextCarry}.`
      });

      sumDigits.unshift(resultDigit);
      carry = nextCarry;
    }

    if (carry > 0) {
      steps.push({
        colIndex: maxLen,
        placeName: 'legnagyobb helyiérték',
        d1: 0,
        d2: 0,
        prevCarry: carry,
        colSum: carry,
        resultDigit: carry,
        nextCarry: 0,
        explanation: `Az utolsó maradékot (${carry}) leírjuk az összeg elejére.`
      });
      sumDigits.unshift(carry);
    }

    return {
      n1,
      n2,
      totalSum: n1 + n2,
      maxLen,
      pad1,
      pad2,
      steps,
      finalResult: sumDigits.join('')
    };
  };

  const additionData = getAdditionSteps(num1, num2);

  return (
    <TheoryTemplate
      title="Összeadás és Írásbeli Összeadás"
      subtitle="Összeadás fogalma, műveleti tulajdonságok (felcserélhetőség, csoportosíthatóság), fejben számolás és írásbeli algoritmus átvitellel"
      topicBadge="5. Osztály • I. Az egész számok"
      topicNumber="8."
      documentId="addition-theory-content"
      pdfFileName="Osszeadas_Tananyag"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'Összeadási Szabály',
        formula: 'Tag + Tag = Összeg  (a + b = b + a)',
        detail: 'Tetszőlegesen felcserélhető és csoportosítható!'
      }}
    >
      {/* 1. Szakasz: Az összeadás fogalma és tagjai */}
      <TheorySection
        number={1}
        title="Az összeadás fogalma és elnevezései"
        badgeColor="emerald"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Az <strong>összeadás</strong> két vagy több mennyiség egyesítését, összegzését jelenti. A művelet jele a <strong>+ (plusz)</strong> jel, az eredménye az <strong>összeg</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TheoryCard
              title="1. tag (Összeadandó)"
              badge="Első szám"
              variant="emerald"
            >
              <div className="text-xs text-slate-600 dark:text-slate-400">
                A bal oldali vagy felső szám, amihez hozzáadunk.
              </div>
            </TheoryCard>

            <TheoryCard
              title="2. tag (Összeadandó)"
              badge="Második szám"
              variant="blue"
            >
              <div className="text-xs text-slate-600 dark:text-slate-400">
                A hozzáadott mennyiség.
              </div>
            </TheoryCard>

            <TheoryCard
              title="Összeg (Eredmény)"
              badge="Végeredmény"
              variant="amber"
            >
              <div className="text-xs text-slate-600 dark:text-slate-400">
                A művelet eredménye (pl. 24 + 16 = <strong>40</strong>).
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 2. Szakasz: Az összeadás alaptulajdonságai */}
      <TheorySection
        number={2}
        title="Az összeadás műveleti tulajdonságai"
        badgeColor="emerald"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TheoryCard
              title="1. Felcserélhetőség (Kommutativitás)"
              badge="a + b = b + a"
              variant="emerald"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                A tagok sorrendje felcserélhető, az összeg nem változik:
              </p>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl font-mono text-xs font-bold text-emerald-800 dark:text-emerald-300">
                17 + 25 = 25 + 17 = 42
              </div>
            </TheoryCard>

            <TheoryCard
              title="2. Csoportosíthatóság (Asszociativitás)"
              badge="(a + b) + c = a + (b + c)"
              variant="blue"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                A tagok tetszőlegesen csoportosíthatók a könnyebb számoláshoz:
              </p>
              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-xl font-mono text-xs font-bold text-blue-800 dark:text-blue-300">
                (28 + 14) + 16 = 28 + (14 + 16) = 28 + 30 = 58
              </div>
            </TheoryCard>

            <TheoryCard
              title="3. A nulla szerepe (Semleges elem)"
              badge="a + 0 = a"
              variant="amber"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Bármely számhoz 0-t adva az eredeti számot kapjuk:
              </p>
              <div className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded-xl font-mono text-xs font-bold text-amber-800 dark:text-amber-300">
                348 + 0 = 348
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 3. Szakasz: Írásbeli összeadás lépései */}
      <TheorySection
        number={3}
        title="Az írásbeli összeadás algoritmusa és az átvitel"
        badgeColor="emerald"
      >
        <div className="space-y-4">
          <TheoryCallout
            title="Hogyan végzünk írásbeli összeadást?"
            variant="tip"
          >
            <ol className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 list-decimal list-inside">
              <li><strong>Helyiérték szerint egymás alá írjuk a számokat:</strong> egyes alá egyes, tízes alá tízes, százas alá százas!</li>
              <li><strong>Jobbról balra (az egyesektől kezdve)</strong> oszloponként összeadjuk a számjegyeket.</li>
              <li>Ha egy oszlop összege <strong>legalább 10</strong>, az egyeseket leírjuk alulra, a tízeseket pedig <strong>maradékként (átvitelként)</strong> hozzáadjuk a balra lévő következő oszlophoz!</li>
            </ol>
          </TheoryCallout>

          <TheoryTable
            headers={['Lépés', 'Oszlop', 'Összeadandók + Maradék', 'Leírt számjegy', 'Továbbvitt maradék']}
            rows={[
              ['1. lépés', 'Egyesek', '5 + 8 = 13', '3', '1 (átvitel a tízesekhez)'],
              ['2. lépés', 'Tízesek', '8 + 4 + 1 = 13', '3', '1 (átvitel a százasokhoz)'],
              ['3. lépés', 'Százasok', '7 + 6 + 1 = 14', '4', '1 (átvitel az ezresekhez)'],
              ['4. lépés', 'Ezresek', '4 + 3 + 1 = 8', '8', '0 (nincs továbbvitel)']
            ]}
          />
        </div>
      </TheorySection>

      {/* 4. Szakasz: Tipikus Hibák és Csapdák */}
      <TheorySection
        number={4}
        title="Tipikus Tévhitek és Csapdák"
        badgeColor="emerald"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TheoryTrapBox
            title="Számok helytelen egymás alá rendezése"
            wrong="Balra zárva egymás alá írni a különböző hosszúságú számokat (pl. 345 és 28)"
            correct="Mindig JOBBRA zárva (egyes alá egyes) írjuk fel a tagokat!"
            explanation="Ha elcsúsznak a helyiértékek, teljesen hibás összeget kapunk."
          />
          <TheoryTrapBox
            title="Az átvitel (maradék) elfelejtése"
            wrong="7 + 8 = 15 esetén leírjuk az 5-öt, de az 1-est nem adjuk hozzá a tízesekhez"
            correct="A keletkező tízest azonnal felírjuk/hozzáadjuk a következő oszlophoz!"
            explanation="Az átvitel elhagyása tipikus hiba az írásbeli műveleteknél."
          />
          <TheoryTrapBox
            title="Balról jobbra kezdett írásbeli összeadás"
            wrong="A legnagyobb helyiérték felől kezdeni a számolást"
            correct="Mindig az EGYESEKTŐL (jobbról balra) haladunk!"
            explanation="Az átvitelek jobbról balra vándorolnak, ezért kötelező az egyesekkel kezdeni."
          />
          <TheoryTrapBox
            title="Becslés elhagyása ellenőrzésként"
            wrong="Csak egyszer kiszámolni ellenőrzés nélkül"
            correct="Mindig végezz gyors kerekített becslést (B), hogy lásd a nagyságrendet!"
            explanation="A becslés azonnal lebuktatja a nagyságrendi tévedéseket."
          />
        </div>
      </TheorySection>

      {/* 5. Szakasz: Interaktív Írásbeli Összeadás Szimulátor (no-pdf) */}
      <TheorySection
        number={5}
        title="Interaktív Írásbeli Összeadás Labor"
        badgeColor="emerald"
        className="no-pdf"
      >
        <div className="p-5 bg-gradient-to-br from-emerald-50/60 to-teal-50/60 dark:from-slate-800/80 dark:to-slate-900/80 rounded-2xl border border-emerald-200/80 dark:border-slate-700 space-y-4 no-pdf">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
              1. és 2. összeadandó tag:
            </label>
            <input
              type="number"
              min="0"
              max="999999"
              value={num1}
              onChange={(e) => {
                setNum1(e.target.value);
                setStepIndex(0);
              }}
              className="w-full sm:w-28 px-3 py-1.5 text-sm font-mono font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl"
            />
            <span className="font-bold text-slate-500">+</span>
            <input
              type="number"
              min="0"
              max="999999"
              value={num2}
              onChange={(e) => {
                setNum2(e.target.value);
                setStepIndex(0);
              }}
              className="w-full sm:w-28 px-3 py-1.5 text-sm font-mono font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl"
            />
          </div>

          {additionData && (
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-xs font-bold text-slate-400">Lépésről lépésre végrehajtás:</span>
                <span className="font-mono text-base font-black text-emerald-700 dark:text-emerald-300">
                  {additionData.n1.toLocaleString('hu-HU')} + {additionData.n2.toLocaleString('hu-HU')} = {additionData.totalSum.toLocaleString('hu-HU')}
                </span>
              </div>

              <div className="space-y-2">
                {additionData.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-lg text-xs font-mono flex items-center justify-between"
                  >
                    <span className="font-bold text-emerald-700 dark:text-emerald-300">
                      {idx + 1}. {step.placeName}:
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {step.explanation}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}

export default AdditionTheory;
