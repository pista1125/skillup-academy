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
  Calculator,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Layers,
  BookOpen,
  Zap,
  Target,
  Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DivisionTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function DivisionTheory({ onBack, onStartQuiz }: DivisionTheoryProps) {
  // Interactive Simulator State
  const [dividendStr, setDividendStr] = useState<string>('842');
  const [divisorStr, setDivisorStr] = useState<string>('26');
  const [stepIndex, setStepIndex] = useState<number>(0);

  const computeDivisionData = (divStr: string, dvrStr: string) => {
    const trimmedDiv = divStr.trim();
    const trimmedDvr = dvrStr.trim();
    if (!trimmedDiv || !trimmedDvr) {
      return { error: 'Kérlek adj meg mindkét mezőbe egy számot!', steps: [] };
    }
    const dividend = parseInt(trimmedDiv, 10);
    const divisor = parseInt(trimmedDvr, 10);

    if (isNaN(dividend) || isNaN(divisor) || dividend < 0 || divisor <= 0 || dividend > 999999 || divisor > 999) {
      return {
        error: 'Kérlek adj meg érvényes számokat (osztandó nemnegatív legfeljebb 6 jegyű, osztó pozitív legfeljebb 3 jegyű)!',
        steps: []
      };
    }

    const sDiv = dividend.toString();
    const sDvr = divisor.toString();
    const finalQuotient = Math.floor(dividend / divisor);
    const finalRemainder = dividend % divisor;
    const sQ = finalQuotient.toString();

    // Estimation
    const estDiv = dividend >= 100 ? Math.round(dividend / 100) * 100 : (dividend >= 10 ? Math.round(dividend / 10) * 10 : dividend);
    const estDvr = divisor >= 10 ? Math.round(divisor / 10) * 10 : divisor;
    const estQuot = Math.floor(estDiv / estDvr);

    // Initial prefix selection (kijelölés)
    let initialPrefixLen = 1;
    let initialPart = parseInt(sDiv.substring(0, initialPrefixLen), 10);
    while (initialPart < divisor && initialPrefixLen < sDiv.length) {
      initialPrefixLen++;
      initialPart = parseInt(sDiv.substring(0, initialPrefixLen), 10);
    }

    type Step = {
      title: string;
      desc: string;
      activeQuotientLen: number;
      activeDividendRange?: [number, number];
      revealedSubRows: {
        cells: { col: number; char: string; isDropped?: boolean }[];
        isRemainder?: boolean;
      }[];
      currentRemainderVal?: number;
      isFinal?: boolean;
    };

    const steps: Step[] = [];

    // Step 0: Előkészítés, kijelölés és becslés
    const initialPrefixStr = sDiv.substring(0, initialPrefixLen);
    steps.push({
      title: '1. Előkészítés, kijelölés és becslés',
      desc: `Felírjuk az osztást a négyzetrácsos füzetbe: ${dividend} : ${divisor}. Balról kijelöljük az első olyan részt, amiben az osztó már megvan legalább egyszer: ${initialPrefixStr} (kijelölő ív a ${initialPrefixStr} fölé). Előzetes becslés: ${estDiv} : ${estDvr} ≈ ${estQuot}.`,
      activeQuotientLen: 0,
      activeDividendRange: [0, initialPrefixLen - 1],
      revealedSubRows: []
    });

    const subRowsAccum: {
      cells: { col: number; char: string; isDropped?: boolean }[];
      isRemainder?: boolean;
    }[] = [];

    let currentPart = initialPart;
    let nextDropIdx = initialPrefixLen;
    let quotientDigitsRevealed = 0;
    let currentPartEndCol = initialPrefixLen - 1;

    // Loop through division steps
    while (true) {
      const qDigit = Math.floor(currentPart / divisor);
      const subProduct = qDigit * divisor;
      const rem = currentPart - subProduct;
      quotientDigitsRevealed++;

      const hasNextDrop = nextDropIdx < sDiv.length;

      let desc = '';
      if (qDigit === 0 && subRowsAccum.length > 0) {
        desc = `${currentPart}-ben a(z) ${divisor} megvan 0-szor. Nagyon fontos: a hányadosba leírjuk a 0-t! Maradék: ${rem}.`;
      } else {
        desc = `${currentPart}-ben a(z) ${divisor} megvan ${qDigit}-szer (${qDigit} · ${divisor} = ${subProduct}). A hányadosba leírjuk a(z) ${qDigit}-t. Maradék: ${currentPart} – ${subProduct} = ${rem}.`;
      }

      if (hasNextDrop) {
        const dropChar = sDiv[nextDropIdx];
        const nextPartVal = rem * 10 + parseInt(dropChar, 10);
        desc += ` Lehozzuk a következő számjegyet (${dropChar}) a maradék mellé ⟹ ${nextPartVal}.`;

        const remStr = rem.toString();
        const dropCol = nextDropIdx;
        const rowCells: { col: number; char: string; isDropped?: boolean }[] = [];
        rowCells.push({ col: dropCol, char: dropChar, isDropped: true });

        for (let r = 0; r < remStr.length; r++) {
          rowCells.unshift({
            col: dropCol - 1 - (remStr.length - 1 - r),
            char: remStr[r]
          });
        }

        subRowsAccum.push({ cells: rowCells });

        steps.push({
          title: `${steps.length + 1}. Lépés: ${currentPart} : ${divisor} = ${qDigit}`,
          desc,
          activeQuotientLen: quotientDigitsRevealed,
          activeDividendRange: [nextDropIdx, nextDropIdx],
          revealedSubRows: JSON.parse(JSON.stringify(subRowsAccum)),
          currentRemainderVal: rem
        });

        currentPart = nextPartVal;
        currentPartEndCol = nextDropIdx;
        nextDropIdx++;
      } else {
        const remStr = rem.toString();
        const rowCells: { col: number; char: string; isDropped?: boolean }[] = [];
        for (let r = 0; r < remStr.length; r++) {
          rowCells.push({
            col: currentPartEndCol - (remStr.length - 1 - r),
            char: remStr[r]
          });
        }

        subRowsAccum.push({ cells: rowCells, isRemainder: true });

        desc += ` Elfogyott a lehozható számjegy, az osztás véget ért. A maradék: ${rem}.`;

        steps.push({
          title: `${steps.length + 1}. Lépés: ${currentPart} : ${divisor} = ${qDigit}`,
          desc,
          activeQuotientLen: quotientDigitsRevealed,
          revealedSubRows: JSON.parse(JSON.stringify(subRowsAccum)),
          currentRemainderVal: rem
        });

        break;
      }
    }

    // Final Step: Ellenőrzés és összegzés
    let checkDesc = `Az írásbeli osztás befejeződött: ${dividend} : ${divisor} = ${finalQuotient}`;
    if (finalRemainder > 0) {
      checkDesc += `, maradék ${finalRemainder}.`;
      checkDesc += ` A maradék (${finalRemainder}) kisebb az osztónál (${divisor}), így a maradékképzés szabályos (0 ≤ ${finalRemainder} < ${divisor}).`;
      checkDesc += ` Ellenőrzés: ${finalQuotient} · ${divisor} + ${finalRemainder} = ${finalQuotient * divisor} + ${finalRemainder} = ${dividend} ✓.`;
    } else {
      checkDesc += ` (maradék nélkül).`;
      checkDesc += ` Ellenőrzés visszaszorzással: ${finalQuotient} · ${divisor} = ${dividend} ✓.`;
    }

    steps.push({
      title: `${steps.length + 1}. Befejezés és ellenőrzés`,
      desc: checkDesc,
      activeQuotientLen: sQ.length,
      revealedSubRows: JSON.parse(JSON.stringify(subRowsAccum)),
      currentRemainderVal: finalRemainder,
      isFinal: true
    });

    // Grid columns calculation:
    // dividend: sDiv.length
    // colon: 1
    // divisor: sDvr.length
    // equals: 1
    // quotient: sQ.length
    const colonCol = sDiv.length;
    const dvrStartCol = colonCol + 1;
    const equalsCol = dvrStartCol + sDvr.length;
    const qStartCol = equalsCol + 1;
    const totalCols = qStartCol + sQ.length;

    return {
      dividend,
      divisor,
      sDiv,
      sDvr,
      finalQuotient,
      finalRemainder,
      sQ,
      estDiv,
      estDvr,
      estQuot,
      initialPrefixLen,
      colonCol,
      dvrStartCol,
      equalsCol,
      qStartCol,
      totalCols,
      steps
    };
  };

  const simData = computeDivisionData(dividendStr, divisorStr);
  const safeStepIndex = simData && simData.steps && simData.steps.length > 0
    ? Math.min(stepIndex, simData.steps.length - 1)
    : 0;
  const currentStep = simData && !simData.error && simData.steps && simData.steps.length > 0
    ? simData.steps[safeStepIndex]
    : null;

  return (
    <TheoryTemplate
      title="Osztás, írásbeli osztás kétjegyű osztóval"
      subtitle="Az osztás fogalma, tagjai, maradékos osztás alaptétele, osztás 10 hatványaival, egy- és kétjegyű írásbeli osztás és ellenőrzés"
      documentId="division-theory-content"
      pdfFileName="Osztas_Irasbeli_Osztas_Tananyag"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      badgeColor="purple"
      quickRule={{
        label: "Maradékos Osztás Alaptétele",
        formula: "Osztandó = Hányados · Osztó + Maradék",
        detail: "0 ≤ Maradék < Osztó  •  0-val osztani szigorúan TILOS!"
      }}
    >
      {/* 1. RÉSZ: AZ OSZTÁS FOGALMA ÉS TAGJAI */}
      <TheorySection
        number={1}
        title="Az osztás fogalma, tagjai és a 0, 1 viselkedése"
        icon={<BookOpen className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <TheoryCallout variant="info" title="Mit jelent az osztás?">
          Az osztás a szorzás <strong>megfordított (inverz) művelete</strong>. Két alapvető értelmezése van:<br />
          • <strong>Részekre osztás:</strong> egy mennyiség felosztása adott számú egyenlő részre.<br />
          • <strong>Bennfoglalás:</strong> megmutatja, hogy egy mennyiségben hányszor van meg egy másik.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <TheoryCard title="Osztandó (a)" icon={<BookOpen className="w-4 h-4 text-blue-600" />} badge="Első tag">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A szám, <strong>amelyet elosztunk</strong> részekre.
            </p>
            <div className="mt-2 text-center py-1 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-blue-700 dark:text-blue-300 font-mono font-bold text-xs">
              Példa: 84 : 4 ⟹ 84
            </div>
          </TheoryCard>

          <TheoryCard title="Osztó (b)" icon={<Zap className="w-4 h-4 text-purple-600" />} badge="Második tag">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A szám, <strong>amellyel osztunk</strong>. Értéke soha nem lehet 0!
            </p>
            <div className="mt-2 text-center py-1 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-purple-700 dark:text-purple-300 font-mono font-bold text-xs">
              Példa: 84 : 4 ⟹ 4
            </div>
          </TheoryCard>

          <TheoryCard title="Hányados (q)" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />} badge="Eredmény">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Az osztás <strong>végeredménye</strong>.
            </p>
            <div className="mt-2 text-center py-1 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs">
              84 : 4 = 21 ⟹ 21
            </div>
          </TheoryCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="A 0 és az 1 az osztásban" icon={<ShieldCheck className="w-4 h-4 text-rose-600" />}>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
              <li>• <strong>Osztás 1-gyel:</strong> bármely számot 1-gyel osztva önmagát kapjuk (<span className="font-mono font-bold">a : 1 = a</span>).</li>
              <li>• <strong>Önmagával osztás:</strong> bármely nem-nulla szám önmagával osztva 1 (<span className="font-mono font-bold">a : a = 1</span>).</li>
              <li>• <strong>0 osztása:</strong> <span className="font-mono font-bold">0 : a = 0</span> (ha a ≠ 0).</li>
            </ul>
          </TheoryCard>

          <TheoryCard title="Az osztás és szorzás kapcsolata" icon={<Scale className="w-4 h-4 text-emerald-600" />}>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Az osztás a szorzás megfordított művelete:
            </p>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs mt-1 text-center">
              Ha a : b = c, akkor c · b = a (ha r = 0)
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. RÉSZ: MARADÉKOS OSZTÁS */}
      <TheorySection
        number={2}
        title="A maradékos osztás és alaptétele"
        icon={<Scale className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
      >
        <TheoryCallout variant="tip" title="A maradékos osztás alapszabálya">
          Ha az osztandó nem osztható maradék nélkül az osztóval, a megmaradt rész a <strong>maradék (r)</strong>.<br />
          <strong>Szigorú szabály:</strong> A maradék mindig <strong>kisebb</strong> kell legyen az osztónál (<span className="font-mono font-bold">0 ≤ r &lt; Osztó</span>)!
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="Példa maradékos osztásra" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-center font-mono font-bold text-sm text-emerald-800 dark:text-emerald-300">
                29 : 6 = 4, maradék 5
              </div>
              <p>• A 29-ben a 6 megvan 4-szer (mert 4 · 6 = 24).</p>
              <p>• A 29 – 24 = <strong>5 a maradék</strong>.</p>
              <p>• Mivel 5 &lt; 6, a számolás helyes!</p>
            </div>
          </TheoryCard>

          <TheoryCard title="Ellenőrzés képlete" icon={<ShieldCheck className="w-4 h-4 text-blue-600" />}>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              A hányadost megszorozzuk az osztóval, és hozzáadjuk a maradékot:
            </p>
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-center font-mono font-bold text-xs text-blue-800 dark:text-blue-300">
              Hányados (4) · Osztó (6) + Maradék (5) = 24 + 5 = 29 ✓
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. RÉSZ: OSZTÁS 10-ZEL, 100-ZAL, 1000-REL */}
      <TheorySection
        number={3}
        title="Gyors osztás 10-zel, 100-zal, 1000-rel"
        icon={<Zap className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <TheoryTable
          title="Nullák elhagyásának szabálya 10 hatványaival történő osztáskor"
          headers={['Osztó', 'Szabály', 'Példa', 'Hányados és Maradék']}
          rows={[
            [': 10', '1 nullát elhagyunk (utolsó számjegy a maradék)', '450 : 10 = 45', '458 : 10 = 45, m 8'],
            [': 100', '2 nullát elhagyunk (utolsó 2 számjegy a maradék)', '7 200 : 100 = 72', '7 245 : 100 = 72, m 45'],
            [': 1 000', '3 nullát elhagyunk (utolsó 3 számjegy a maradék)', '38 000 : 1 000 = 38', '38 650 : 1 000 = 38, m 650'],
            [': Kerek tízes (pl. 20)', 'Előbb osztunk 10-zel, majd a számmal (2)', '840 : 20', '(840 : 10) : 2 = 84 : 2 = 42']
          ]}
        />
      </TheorySection>

      {/* 4. RÉSZ: ÍRÁSBELI OSZTÁS KÉTJEGYŰ OSZTÓVAL */}
      <TheorySection
        number={4}
        title="Az írásbeli osztás menete kétjegyű osztóval"
        icon={<Layers className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <TheoryCallout variant="tip" title="A 4 aranylépés kétjegyű osztásnál">
          1. <strong>Kijelölés:</strong> Balról kijelölünk annyi számjegyet, amiben az osztó már megvan legalább egyszer.<br />
          2. <strong>Becslés (Kerekítéssel):</strong> Kerekítjük az osztót kerek tízesre, és megbecsüljük a hányados következő jegyét.<br />
          3. <strong>Visszaszorzás és maradék:</strong> Visszaszorzunk, és pótlással kiírjuk a maradékot.<br />
          4. <strong>Következő számjegy lehozása:</strong> Lehozzuk a következő számjegyet a maradék mellé, és ismételjük a lépéseket.
        </TheoryCallout>
      </TheorySection>

      {/* 5. RÉSZ: TIPIKUS HIBÁK ÉS CSAPDÁK */}
      <TheorySection
        number={5}
        title="Tipikus Tévhitek és Gyakori Csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TheoryTrapBox
            title="Nullával való osztás kísérlete"
            wrong="8 : 0 = 0  vagy  8 : 0 = 8"
            correct="Nullával való osztás ÉRTELMEZHETETLEN és TILOS a matematikában!"
            explanation="Nincs olyan szám, amit 0-val megszorozva 8-at kapnánk. Viszont 0 : 8 = 0 (a nullát eloszthatjuk)."
          />
          <TheoryTrapBox
            title="A maradék nagyobb vagy egyenlő az osztónál"
            wrong="23 : 4 = 4, maradék 7 (mert 4·4 + 7 = 23)"
            correct="23 : 4 = 5, maradék 3 (mert 0 ≤ r < 4)!"
            explanation="Ha a maradék eléri vagy meghaladja az osztót, a hányados értéke még tovább növelhető volt."
          />
          <TheoryTrapBox
            title="A 0 beírásának kihagyása a hányadosba (pl. 618 : 6)"
            wrong="618 : 6 = 13 (kihagyva a 0-t, amikor az 1-ben nincs meg a 6)"
            correct="618 : 6 = 103! Minden lehozott számjegy után kötelező egy jegyet írni a hányadosba!"
            explanation="Ha lehozunk egy jegyet és a rész nem osztható, a hányadosba 0 kerül, mielőtt a következő jegyet lehoznánk."
          />
          <TheoryTrapBox
            title="Az ellenőrzés elhagyása"
            wrong="Csak egyszer kiszámolni ellenőrzés nélkül"
            correct="Mindig ellenőrizzük: Hányados · Osztó + Maradék = Osztandó!"
            explanation="A visszaszorzásos ellenőrzés pillanatok alatt felfedi a számolási és maradékképzési hibákat."
          />
        </div>
      </TheorySection>

      {/* 6. RÉSZ: INTERAKTÍV ÍRÁSBELI OSZTÁS SZIMULÁTOR */}
      <TheorySection
        number={6}
        title="Interaktív Lépésről Lépésre Írásbeli Osztás Szimulátor"
        icon={<Calculator className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
        className="no-pdf"
      >
        <TheoryCallout variant="tip" title="Próbáld ki tetszőleges számokkal!">
          Írj be két számot, és léptesd végig a valódi magyar füzetbeli írásbeli osztást lépésről lépésre, figyelve a kijelölésre, a részszorzatokra, a lehozott jegyekre és a maradékra!
        </TheoryCallout>

        <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 my-4">
          {/* Gyors minták (Presets) */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">Gyors minták:</span>
            {[
              { label: '842 : 26 (kétjegyű osztó maradékkal)', div: '842', dvr: '26' },
              { label: '952 : 7 (egyjegyű osztó, m: 0)', div: '952', dvr: '7' },
              { label: '618 : 6 (0 a hányadosban! csapda)', div: '618', dvr: '6' },
              { label: '1584 : 12 (4 jegyű osztandó)', div: '1584', dvr: '12' },
              { label: '458 : 10 (osztás 10-zel)', div: '458', dvr: '10' }
            ].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDividendStr(preset.div);
                  setDivisorStr(preset.dvr);
                  setStepIndex(0);
                }}
                className={cn(
                  "px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all",
                  dividendStr === preset.div && divisorStr === preset.dvr
                    ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-purple-50 dark:hover:bg-purple-950/40"
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Számbeviteli mezők */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Osztandó:</label>
              <input
                type="number"
                min="0"
                max="999999"
                value={dividendStr}
                onChange={(e) => {
                  setDividendStr(e.target.value);
                  setStepIndex(0);
                }}
                className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Osztó:</label>
              <input
                type="number"
                min="1"
                max="999"
                value={divisorStr}
                onChange={(e) => {
                  setDivisorStr(e.target.value);
                  setStepIndex(0);
                }}
                className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>

          {simData && !simData.error && simData.steps && simData.steps.length > 0 && (
            <div className="space-y-4 pt-2">
              {/* Vizuális Négyzetrácsos Füzetlap Kártya */}
              <div className="flex justify-center">
                <div className="bg-[#fafbfd] dark:bg-slate-900/90 p-4 sm:p-6 rounded-2xl border-2 border-purple-200/80 dark:border-slate-700 shadow-sm inline-block select-none overflow-x-auto max-w-full">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-purple-100 dark:border-slate-800 text-xs font-bold text-purple-800 dark:text-purple-300">
                    <span className="flex items-center gap-1.5">
                      <span>📓</span> Négyzetrácsos füzetlap • Írásbeli osztás
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {simData.divisor < 10 ? 'Egyjegyű osztó' : 'Kétjegyű osztó'}
                    </span>
                  </div>

                  {/* Kockás rács mátrix */}
                  <div className="flex flex-col gap-0 border border-purple-200/70 dark:border-slate-700/80 rounded-lg overflow-hidden bg-white dark:bg-slate-950 font-mono text-lg sm:text-xl font-bold">
                    {/* 1. Sor: Osztandó : Osztó = Hányados */}
                    <div className="flex flex-row">
                      {Array.from({ length: simData.totalCols }).map((_, c) => {
                        let char = '';
                        let isSelectedPrefix = false;
                        let isQuotient = false;
                        let isJustRevealedQ = false;
                        let isHighlightedDrop = false;

                        if (c < simData.sDiv.length) {
                          char = simData.sDiv[c];
                          // Kijelölő ív az első lépésben
                          if (safeStepIndex === 0 && c < simData.initialPrefixLen) {
                            isSelectedPrefix = true;
                          }
                          // Aktuálisan lehozott jegy kiemelése
                          if (currentStep?.activeDividendRange && c >= currentStep.activeDividendRange[0] && c <= currentStep.activeDividendRange[1]) {
                            isHighlightedDrop = true;
                          }
                        } else if (c === simData.colonCol) {
                          char = ':';
                        } else if (c >= simData.dvrStartCol && c < simData.dvrStartCol + simData.sDvr.length) {
                          char = simData.sDvr[c - simData.dvrStartCol];
                        } else if (c === simData.equalsCol) {
                          char = '=';
                        } else if (c >= simData.qStartCol && c < simData.qStartCol + simData.sQ.length) {
                          const qDigitIdx = c - simData.qStartCol;
                          if (currentStep && qDigitIdx < currentStep.activeQuotientLen) {
                            char = simData.sQ[qDigitIdx];
                            isQuotient = true;
                            if (qDigitIdx === currentStep.activeQuotientLen - 1) {
                              isJustRevealedQ = true;
                            }
                          }
                        }

                        return (
                          <div
                            key={c}
                            className={cn(
                              "w-8 h-9 sm:w-10 sm:h-11 flex items-center justify-center border border-purple-100 dark:border-slate-800/80 transition-all",
                              isSelectedPrefix
                                ? "bg-purple-100 dark:bg-purple-950/70 text-purple-950 dark:text-purple-100 border-t-2 border-t-purple-600 ring-1 ring-purple-400"
                                : isHighlightedDrop
                                ? "bg-amber-100 dark:bg-amber-950/70 text-amber-950 dark:text-amber-100 font-black ring-1 ring-amber-400"
                                : isQuotient
                                ? "text-purple-700 dark:text-purple-400 font-black"
                                : "text-slate-900 dark:text-slate-100",
                              isJustRevealedQ ? "bg-purple-100 dark:bg-purple-900/60 scale-105" : "",
                              char === ':' || char === '=' ? "text-slate-700 dark:text-slate-300 font-black" : ""
                            )}
                          >
                            {char}
                          </div>
                        );
                      })}
                    </div>

                    {/* 2. Részletszámolási sorok (maradékok és lehozott jegyek) */}
                    {currentStep?.revealedSubRows?.map((subRow, rIdx) => {
                      const isRemainderRow = subRow.isRemainder;

                      return (
                        <div key={rIdx} className="flex flex-row">
                          {Array.from({ length: simData.totalCols }).map((_, c) => {
                            const cell = subRow.cells.find((cell) => cell.col === c);

                            return (
                              <div
                                key={c}
                                className={cn(
                                  "w-8 h-9 sm:w-10 sm:h-11 flex items-center justify-center border border-purple-100 dark:border-slate-800/80 transition-all font-bold",
                                  cell?.isDropped
                                    ? "text-blue-700 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-950/30 font-black ring-1 ring-blue-300"
                                    : isRemainderRow && cell
                                    ? "text-amber-600 dark:text-amber-400 font-black"
                                    : cell
                                    ? "text-slate-800 dark:text-slate-200"
                                    : ""
                                )}
                              >
                                {cell ? cell.char : ''}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>

                  {/* Kijelölési segédlet az 1. lépésnél */}
                  {safeStepIndex === 0 && (
                    <div className="mt-3 flex items-center justify-center gap-2 p-2 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-xl text-xs font-bold text-purple-800 dark:text-purple-300">
                      <span>🏷️ Kijelölt kezdő rész:</span>
                      <span className="font-mono text-sm font-black text-purple-600 dark:text-purple-400">
                        {simData.sDiv.substring(0, simData.initialPrefixLen)}
                      </span>
                      <span>(itt már megvan a(z) {simData.divisor})</span>
                    </div>
                  )}

                  {/* Maradék jelző a végén vagy közben */}
                  {currentStep && currentStep.currentRemainderVal !== undefined && (
                    <div className="mt-3 flex items-center justify-center gap-2 p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs font-bold text-amber-800 dark:text-amber-300">
                      <span>📌 Aktuális maradék:</span>
                      <span className="font-mono text-sm font-black text-amber-600 dark:text-amber-400">
                        {currentStep.currentRemainderVal}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Lépés magyarázó kártya */}
              {currentStep && (
                <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-900/60 text-xs sm:text-sm">
                  <div className="font-bold text-purple-800 dark:text-purple-300 mb-1 flex items-center justify-between flex-wrap gap-1">
                    <span>{currentStep.title}</span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentStep.desc}
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
                  {safeStepIndex + 1} / {simData.steps.length} lépés
                </div>
                {safeStepIndex < simData.steps.length - 1 ? (
                  <Button
                    size="sm"
                    onClick={() => setStepIndex((prev) => Math.min(simData.steps.length - 1, prev + 1))}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs shadow-sm"
                  >
                    Következő lépés <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => setStepIndex(0)}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs shadow-sm"
                  >
                    Újraindítás <RotateCcw className="w-3.5 h-3.5 ml-1" />
                  </Button>
                )}
              </div>

              {/* Összegző siker kártya az utolsó lépésnél */}
              {safeStepIndex === simData.steps.length - 1 && (
                <div className="p-3 bg-purple-100/70 dark:bg-purple-950/40 rounded-xl border border-purple-300 dark:border-purple-800 text-center text-xs font-bold text-purple-800 dark:text-purple-200">
                  🎉 Az írásbeli osztás sikeresen elkészült: <span className="font-mono text-sm">{simData.dividend} : {simData.divisor} = {simData.finalQuotient}{simData.finalRemainder > 0 ? ` (maradék: ${simData.finalRemainder})` : ''}</span>
                </div>
              )}
            </div>
          )}

          {simData?.error && (
            <div className="p-3 bg-rose-100 dark:bg-rose-900/40 rounded-xl text-rose-800 dark:text-rose-200 text-xs font-bold">
              ⚠️ {simData.error}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}

export default DivisionTheory;
