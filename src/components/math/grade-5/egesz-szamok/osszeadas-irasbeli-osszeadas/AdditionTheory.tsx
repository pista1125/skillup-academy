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
  ArrowRight,
  ArrowLeft
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
    const trimmed1 = val1Str.trim();
    const trimmed2 = val2Str.trim();
    if (!trimmed1 || !trimmed2) {
      return { error: 'Kérlek adj meg mindkét mezőbe egy számot!' };
    }
    const n1 = parseInt(trimmed1, 10);
    const n2 = parseInt(trimmed2, 10);
    if (isNaN(n1) || isNaN(n2) || n1 < 0 || n2 < 0 || n1 > 9999999 || n2 > 9999999) {
      return { error: 'Kérlek nemnegatív egész számokat adj meg (legfeljebb 7 számjegyig)!' };
    }

    const s1 = n1.toString();
    const s2 = n2.toString();
    const totalSum = n1 + n2;
    const sumStr = totalSum.toString();
    const targetLen = Math.max(s1.length, s2.length, sumStr.length);

    const pad1 = s1.padStart(targetLen, ' ');
    const pad2 = s2.padStart(targetLen, ' ');

    let carry = 0;
    const steps: {
      stepIdx: number;
      colIndex: number;
      placeIndex: number;
      placeName: string;
      d1Char: string;
      d2Char: string;
      d1: number;
      d2: number;
      prevCarry: number;
      colSum: number;
      resultDigit: number;
      nextCarry: number;
      explanation: string;
    }[] = [];

    const placeNames = [
      'egyesek',
      'tízesek',
      'százasok',
      'ezresek',
      'tízezresek',
      'százezresek',
      'milliósok',
      'tízmilliósok'
    ];

    for (let i = targetLen - 1; i >= 0; i--) {
      const char1 = pad1[i];
      const char2 = pad2[i];
      const d1 = char1 === ' ' ? 0 : parseInt(char1, 10);
      const d2 = char2 === ' ' ? 0 : parseInt(char2, 10);
      const hasDigit1 = char1 !== ' ';
      const hasDigit2 = char2 !== ' ';

      if (!hasDigit1 && !hasDigit2 && carry === 0) {
        continue;
      }

      const colSum = d1 + d2 + carry;
      const resultDigit = colSum % 10;
      const nextCarry = Math.floor(colSum / 10);
      const placeIndex = targetLen - 1 - i;
      const placeName = placeNames[placeIndex] || `${placeIndex + 1}. helyiérték`;

      let calculationText = '';
      if (hasDigit1 && hasDigit2) {
        calculationText = carry > 0
          ? `${d1} + ${d2} + ${carry} (átvitel) = ${colSum}`
          : `${d1} + ${d2} = ${colSum}`;
      } else if (hasDigit1 && !hasDigit2) {
        calculationText = carry > 0
          ? `${d1} + ${carry} (átvitel) = ${colSum}`
          : `${d1} (csak az 1. tagban van számjegy) = ${colSum}`;
      } else if (!hasDigit1 && hasDigit2) {
        calculationText = carry > 0
          ? `${d2} + ${carry} (átvitel) = ${colSum}`
          : `${d2} (csak a 2. tagban van számjegy) = ${colSum}`;
      } else {
        calculationText = `A megmaradt ${carry} átvitel kerül leírásra`;
      }

      let carryText = '';
      if (nextCarry > 0) {
        carryText = `Leírjuk a(z) ${resultDigit}-t, maradt az átvitel: ${nextCarry}.`;
      } else {
        carryText = `Leírjuk a(z) ${resultDigit}-t, nincs átvitel (0 maradék).`;
      }

      const explanation = `${calculationText}. ${carryText}`;

      steps.push({
        stepIdx: steps.length,
        colIndex: i,
        placeIndex,
        placeName,
        d1Char: char1,
        d2Char: char2,
        d1,
        d2,
        prevCarry: carry,
        colSum,
        resultDigit,
        nextCarry,
        explanation
      });

      carry = nextCarry;
    }

    return {
      n1,
      n2,
      totalSum,
      targetLen,
      pad1,
      pad2,
      steps
    };
  };

  const additionData = getAdditionSteps(num1, num2);
  const safeStepIndex = additionData && additionData.steps && additionData.steps.length > 0
    ? Math.min(stepIndex, additionData.steps.length - 1)
    : 0;
  const currentStep = additionData && !additionData.error && additionData.steps && additionData.steps.length > 0
    ? additionData.steps[safeStepIndex]
    : null;

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

      {/* 5. RÉSZ: INTERAKTÍV ÍRÁSBELI ÖSSZEADÁS SZIMULÁTOR */}
      <TheorySection
        number={5}
        title="Interaktív Lépésről Lépésre Írásbeli Összeadás Szimulátor"
        icon={<Calculator className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
        className="no-pdf"
      >
        <TheoryCallout variant="tip" title="Próbáld ki tetszőleges számokkal!">
          Írj be két számot, és léptesd végig az írásbeli összeadást oszlopról oszlopra, figyelve a helyiértékekre és az átvitelekre (maradékokra)!
        </TheoryCallout>

        <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 my-4">
          {/* Gyors példák (Presets) */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">Gyors minták:</span>
            {[
              { label: '4785 + 3648 (több átvitel)', v1: '4785', v2: '3648' },
              { label: '294 + 857 (új helyiérték)', v1: '294', v2: '857' },
              { label: '9876 + 543 (eltérő hossz)', v1: '9876', v2: '543' },
              { label: '654 + 235 (átvitel nélkül)', v1: '654', v2: '235' }
            ].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setNum1(preset.v1);
                  setNum2(preset.v2);
                  setStepIndex(0);
                }}
                className={cn(
                  "px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all",
                  num1 === preset.v1 && num2 === preset.v2
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Számbeviteli mezők */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">1. összeadandó tag (felső szám):</label>
              <input
                type="number"
                min="0"
                max="9999999"
                value={num1}
                onChange={(e) => {
                  setNum1(e.target.value);
                  setStepIndex(0);
                }}
                className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">2. összeadandó tag (alsó szám):</label>
              <input
                type="number"
                min="0"
                max="9999999"
                value={num2}
                onChange={(e) => {
                  setNum2(e.target.value);
                  setStepIndex(0);
                }}
                className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {additionData && !additionData.error && additionData.steps && additionData.steps.length > 0 && (
            <div className="space-y-4 pt-2">
              {/* Vizuális oszlopos elrendezés kártya */}
              <div className="flex justify-center">
                <div className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm inline-block font-mono font-bold tracking-wider">
                  {/* Átvitel / maradék sor (amber) */}
                  <div className="flex justify-end text-xs font-black text-amber-500 min-h-[1.25rem] pr-2">
                    <span className="w-4 text-center mr-1"></span>
                    {Array.from({ length: additionData.targetLen }).map((_, cIdx) => {
                      const step = additionData.steps.find((s) => s.colIndex === cIdx);
                      const hasCarry = step && step.prevCarry > 0 && safeStepIndex >= step.stepIdx;
                      return (
                        <span key={cIdx} className="w-5 sm:w-6 text-center text-amber-500 dark:text-amber-400">
                          {hasCarry ? `¹` : ''}
                        </span>
                      );
                    })}
                  </div>

                  {/* 1. összeadandó sor */}
                  <div className="flex justify-end text-slate-800 dark:text-slate-200 text-lg sm:text-xl pr-2">
                    <span className="w-4 text-center mr-1"></span>
                    {additionData.pad1.split('').map((ch, idx) => {
                      const step = additionData.steps.find((s) => s.colIndex === idx);
                      const isCurrent = step?.stepIdx === safeStepIndex;
                      return (
                        <span
                          key={idx}
                          className={cn(
                            "w-5 sm:w-6 text-center transition-colors rounded",
                            isCurrent ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 font-black" : ""
                          )}
                        >
                          {ch === ' ' ? '\u00A0' : ch}
                        </span>
                      );
                    })}
                  </div>

                  {/* 2. összeadandó sor (+ jellel és aláhúzással) */}
                  <div className="flex justify-end text-emerald-600 dark:text-emerald-400 text-lg sm:text-xl border-b-2 border-slate-800 dark:border-slate-200 pr-2 pb-0.5">
                    <span className="w-4 text-center mr-1 text-emerald-600 dark:text-emerald-400 font-bold">+</span>
                    {additionData.pad2.split('').map((ch, idx) => {
                      const step = additionData.steps.find((s) => s.colIndex === idx);
                      const isCurrent = step?.stepIdx === safeStepIndex;
                      return (
                        <span
                          key={idx}
                          className={cn(
                            "w-5 sm:w-6 text-center transition-colors rounded",
                            isCurrent ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 font-black" : ""
                          )}
                        >
                          {ch === ' ' ? '\u00A0' : ch}
                        </span>
                      );
                    })}
                  </div>

                  {/* Összeg / Eredmény sor */}
                  <div className="flex justify-end text-emerald-600 dark:text-emerald-400 text-lg sm:text-xl font-black pt-1 pr-2">
                    <span className="w-4 text-center mr-1"></span>
                    {Array.from({ length: additionData.targetLen }).map((_, cIdx) => {
                      const step = additionData.steps.find((s) => s.colIndex === cIdx);
                      const isComputed = step && step.stepIdx <= safeStepIndex;
                      const isCurrent = step && step.stepIdx === safeStepIndex;
                      return (
                        <span
                          key={cIdx}
                          className={cn(
                            "w-5 sm:w-6 text-center transition-all rounded",
                            isCurrent ? "bg-emerald-500 text-white shadow-sm scale-110" : ""
                          )}
                        >
                          {isComputed && step ? step.resultDigit : '\u00A0'}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Lépés magyarázata */}
              {currentStep && (
                <div className="p-3 sm:p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900/60 text-xs sm:text-sm">
                  <div className="font-bold text-emerald-800 dark:text-emerald-300 mb-1 flex items-center justify-between">
                    <span>
                      {safeStepIndex + 1}. Lépés ({currentStep.placeName}):
                    </span>
                    {currentStep.nextCarry > 0 && (
                      <span className="text-[11px] font-bold px-2 py-0.5 bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 rounded-full border border-amber-300 dark:border-amber-800">
                        Átvitel a következő helyiértékre: +{currentStep.nextCarry}
                      </span>
                    )}
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentStep.explanation}
                  </div>
                </div>
              )}

              {/* Vezérlő gombok */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                  disabled={safeStepIndex === 0}
                  className="rounded-xl text-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Előző lépés
                </Button>
                <div className="text-xs font-bold text-slate-500">
                  {safeStepIndex + 1} / {additionData.steps.length} lépés
                </div>
                {safeStepIndex < additionData.steps.length - 1 ? (
                  <Button
                    size="sm"
                    onClick={() => setStepIndex((prev) => Math.min(additionData.steps.length - 1, prev + 1))}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs shadow-sm"
                  >
                    Következő lépés <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => setStepIndex(0)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs shadow-sm"
                  >
                    Újraindítás <RotateCcw className="w-3.5 h-3.5 ml-1" />
                  </Button>
                )}
              </div>

              {/* Összegzés a legvégén */}
              {safeStepIndex === additionData.steps.length - 1 && (
                <div className="p-3 bg-emerald-100/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-300 dark:border-emerald-800 text-center text-xs font-bold text-emerald-800 dark:text-emerald-200">
                  🎉 Az írásbeli összeadás elkészült: <span className="font-mono text-sm">{additionData.n1.toLocaleString('hu-HU')} + {additionData.n2.toLocaleString('hu-HU')} = {additionData.totalSum.toLocaleString('hu-HU')}</span>
                </div>
              )}
            </div>
          )}

          {additionData?.error && (
            <div className="p-3 bg-rose-100 dark:bg-rose-900/40 rounded-xl text-rose-800 dark:text-rose-200 text-xs font-bold">
              ⚠️ {additionData.error}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}

export default AdditionTheory;
