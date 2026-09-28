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
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MultiplicationTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function MultiplicationTheory({ onBack, onStartQuiz }: MultiplicationTheoryProps) {
  // Interactive Simulator State
  // Interactive Simulator State (default 165 · 4 matching user's textbook photo)
  const [factorA, setFactorA] = useState<string>('165');
  const [factorB, setFactorB] = useState<string>('4');
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'leftToRight' | 'rightToLeft'>('leftToRight');

  // Helper for column multiplication steps matching the Hungarian notebook grid method
  const getMultiplicationData = (aStr: string, bStr: string, dir: 'leftToRight' | 'rightToLeft') => {
    const trimmedA = aStr.trim();
    const trimmedB = bStr.trim();
    if (!trimmedA || !trimmedB) {
      return { error: 'Kérlek adj meg mindkét mezőbe egy számot!', steps: [] };
    }
    const a = parseInt(trimmedA, 10);
    const b = parseInt(trimmedB, 10);
    if (isNaN(a) || isNaN(b) || a < 0 || b < 0 || a > 999999 || b > 9999) {
      return {
        error: 'Kérlek adj meg érvényes természetes számokat (első legfeljebb 6 jegyű, második legfeljebb 4 jegyű)!',
        steps: []
      };
    }

    const sA = a.toString();
    const sB = b.toString();
    const product = a * b;
    const sP = product.toString();
    const isSingleDigit = sB.length === 1;

    // Estimation
    const estA = a >= 10 ? Math.round(a / 10) * 10 : a;
    const estB = b >= 10 ? Math.round(b / 10) * 10 : b;
    const estProd = estA * estB;

    const placeNames = ['egyesek', 'tízesek', 'százasok', 'ezresek', 'tízezresek', 'százezresek', 'milliósok'];

    // Alignment geometry:
    // Leftmost column is 0.
    // The ones digit of A is at column index:
    const onesCol = Math.max(sA.length - 1, sP.length - 1);
    const dotCol = onesCol + 1;
    const bStartCol = dotCol + 1;
    const totalCols = bStartCol + sB.length;

    type Step = {
      title: string;
      desc: string;
      carryIn?: number;
      carryOut?: number;
      activeColA?: number;
      activeColB?: number;
      revealedResultDigits?: { col: number; char: string; isNew?: boolean }[];
      revealedPartialRows?: { rowIdx: number; cells: { col: number; char: string }[] }[];
      showSumUnderline?: boolean;
      revealedSumDigits?: { col: number; char: string }[];
      isFinal?: boolean;
    };

    const steps: Step[] = [];

    // Step 0: Előkészítés és becslés
    steps.push({
      title: '1. Előkészítés és becslés',
      desc: `Felírjuk a műveletet a négyzetrácsos füzetbe: ${a} · ${b}. Előzetes kerekített becslés: ${estA} · ${estB} ≈ ${estProd}. Meghúzzuk a vonalat a szorzandó alatt.`
    });

    if (isSingleDigit) {
      // Single-digit multiplier: step-by-step through each digit of A from right to left
      const multDigit = parseInt(sB, 10);
      let carry = 0;
      const resultDigits: { col: number; char: string; isNew?: boolean }[] = [];

      for (let i = 0; i < sA.length; i++) {
        const placeIdx = i;
        const digitChar = sA[sA.length - 1 - i];
        const digitVal = parseInt(digitChar, 10);
        const colA = onesCol - i;

        const prod = multDigit * digitVal;
        const total = prod + carry;
        const writeDigit = total % 10;
        const nextCarry = Math.floor(total / 10);

        let descText = '';
        if (carry > 0) {
          descText = `${multDigit} · ${digitVal} = ${prod}. Hozzáadjuk az előző maradékot: ${prod} + ${carry} = ${total}. Leírjuk a(z) ${writeDigit}-t a ${placeNames[placeIdx]} alá, ${nextCarry > 0 ? `maradt a(z) ${nextCarry} (átvisszük a következő helyiértékre)` : 'nincs újabb maradék'}.`;
        } else {
          descText = `${multDigit} · ${digitVal} = ${prod}. Leírjuk a(z) ${writeDigit}-t a ${placeNames[placeIdx]} alá, ${nextCarry > 0 ? `maradt a(z) ${nextCarry} (átvisszük a következő helyiértékre)` : 'nincs maradék'}.`;
        }

        const isLastA = (i === sA.length - 1);
        if (isLastA && nextCarry > 0) {
          descText += ` Mivel elfogytak a szorzandó számjegyei, a megmaradt ${nextCarry}-t is leírjuk elé.`;
        }

        const currentRevealed = resultDigits.map(d => ({ ...d, isNew: false }));
        currentRevealed.unshift({ col: colA, char: writeDigit.toString(), isNew: true });

        if (isLastA && nextCarry > 0) {
          const nextCarryStr = nextCarry.toString();
          for (let c = nextCarryStr.length - 1; c >= 0; c--) {
            currentRevealed.unshift({
              col: colA - 1 - (nextCarryStr.length - 1 - c),
              char: nextCarryStr[c],
              isNew: true
            });
          }
        }

        steps.push({
          title: `${steps.length + 1}. Lépés (${placeNames[placeIdx]}): ${multDigit} · ${digitVal}`,
          desc: descText,
          carryIn: carry,
          carryOut: nextCarry,
          activeColA: colA,
          activeColB: bStartCol,
          revealedResultDigits: [...currentRevealed]
        });

        resultDigits.unshift({ col: colA, char: writeDigit.toString() });
        if (isLastA && nextCarry > 0) {
          const nextCarryStr = nextCarry.toString();
          for (let c = nextCarryStr.length - 1; c >= 0; c--) {
            resultDigits.unshift({
              col: colA - 1 - (nextCarryStr.length - 1 - c),
              char: nextCarryStr[c]
            });
          }
        }

        carry = nextCarry;
      }

      // Final step: Summary
      steps.push({
        title: `${steps.length + 1}. Befejezés és ellenőrzés`,
        desc: `A szorzás befejeződött: ${a} · ${b} = ${product}. A becslésünk (${estProd}) megerősíti az eredmény nagyságrendi pontosságát.`,
        revealedResultDigits: [...resultDigits],
        isFinal: true
      });
    } else {
      // Multi-digit multiplier:
      const bDigitsWithPower: { digit: number; power: number; colB: number; idx: number }[] = [];
      if (dir === 'leftToRight') {
        for (let i = 0; i < sB.length; i++) {
          bDigitsWithPower.push({
            digit: parseInt(sB[i], 10),
            power: sB.length - 1 - i,
            colB: bStartCol + i,
            idx: i
          });
        }
      } else {
        for (let i = sB.length - 1; i >= 0; i--) {
          bDigitsWithPower.push({
            digit: parseInt(sB[i], 10),
            power: sB.length - 1 - i,
            colB: bStartCol + i,
            idx: sB.length - 1 - i
          });
        }
      }

      const partialRows: { rowIdx: number; cells: { col: number; char: string }[] }[] = [];

      bDigitsWithPower.forEach((bItem, pIdx) => {
        const partialVal = a * bItem.digit;
        const sPartial = partialVal.toString();
        const partialRightCol = onesCol - bItem.power;
        const rowCells: { col: number; char: string }[] = [];
        for (let c = 0; c < sPartial.length; c++) {
          rowCells.push({
            col: partialRightCol - (sPartial.length - 1 - c),
            char: sPartial[c]
          });
        }

        partialRows.push({ rowIdx: pIdx, cells: rowCells });

        const pName = placeNames[bItem.power] || `${bItem.power}. helyiérték`;
        let shiftDesc = '';
        if (dir === 'leftToRight') {
          shiftDesc = bItem.power > 0
            ? `A részszorzat értéke: ${partialVal} ${pName} (${partialVal * Math.pow(10, bItem.power)}), a szorzó ${bItem.digit} számjegye alá igazítva.`
            : `A szorzást 1 hellyel jobbra tolva az egyesek alá írjuk.`;
        } else {
          shiftDesc = bItem.power > 0
            ? `${bItem.power} hellyel balra tolva a(z) ${pName} alá igazítjuk.`
            : `Közvetlenül az egyesek alá írjuk.`;
        }

        steps.push({
          title: `${steps.length + 1}. Lépés: ${pIdx + 1}. részszorzat (${bItem.digit}-val való szorzás)`,
          desc: `A felső ${a}-t jobbról balra megszorozzuk ${bItem.digit}-val (${bItem.digit * Math.pow(10, bItem.power)} valós érték). Részszorzat: ${partialVal}. ${shiftDesc}`,
          activeColB: bItem.colB,
          revealedPartialRows: JSON.parse(JSON.stringify(partialRows))
        });
      });

      const sumCells: { col: number; char: string }[] = [];
      for (let c = 0; c < sP.length; c++) {
        sumCells.push({
          col: onesCol - (sP.length - 1 - c),
          char: sP[c]
        });
      }

      steps.push({
        title: `${steps.length + 1}. Lépés: Részszorzatok összeadása`,
        desc: `Meghúzzuk a vonalat a részszorzatok alatt és helyiérték szerint oszloponként összeadjuk őket. Végeredmény: ${product}.`,
        revealedPartialRows: JSON.parse(JSON.stringify(partialRows)),
        showSumUnderline: true,
        revealedSumDigits: sumCells
      });

      steps.push({
        title: `${steps.length + 1}. Befejezés és ellenőrzés`,
        desc: `Az írásbeli szorzás befejeződött: ${a} · ${b} = ${product}. A becslésünk (${estProd}) igazolja a nagyságrendet!`,
        revealedPartialRows: JSON.parse(JSON.stringify(partialRows)),
        showSumUnderline: true,
        revealedSumDigits: sumCells,
        isFinal: true
      });
    }

    return {
      a,
      b,
      sA,
      sB,
      product,
      sP,
      isSingleDigit,
      estA,
      estB,
      estProd,
      onesCol,
      dotCol,
      bStartCol,
      totalCols,
      steps
    };
  };

  const simData = getMultiplicationData(factorA, factorB, direction);
  const safeStepIndex = simData && simData.steps && simData.steps.length > 0
    ? Math.min(stepIndex, simData.steps.length - 1)
    : 0;
  const currentStep = simData && !simData.error && simData.steps && simData.steps.length > 0
    ? simData.steps[safeStepIndex]
    : null;

  return (
    <TheoryTemplate
      title="Szorzás, írásbeli szorzás"
      subtitle="A szorzás fogalma, tényezők és szorzat, a szorzás tulajdonságai, szorzás 10-zel, 100-zal, egy- és többjegyű írásbeli szorzás"
      documentId="multiplication-theory-content"
      pdfFileName="Szorzas_Irasbeli_Szorzas_Tananyag"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      badgeColor="emerald"
      quickRule={{
        label: "Szorzási Alapszabály",
        formula: "1. Tényező · 2. Tényező = Szorzat  (a · b = b · a)",
        detail: "a · (b + c) = a·b + a·c (tagolási azonosság) • 0-val szorozva 0"
      }}
    >
      {/* 1. RÉSZ: A SZORZÁS FOGALMA ÉS TAGJAI */}
      <TheorySection
        number={1}
        title="A szorzás fogalma, tagjai és a 0, 1 szerepe"
        icon={<Zap className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
      >
        <TheoryCallout variant="info" title="Mit jelent a szorzás?">
          A szorzás <strong>egyenlő tagok ismételt összeadásának</strong> rövidítése: <span className="font-mono font-bold">4 · 5 = 5 + 5 + 5 + 5 = 20</span>.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <TheoryCard title="1. Tényező (Szorzandó)" icon={<BookOpen className="w-4 h-4 text-blue-600" />} badge="Első tag">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A szám, amelyet megszorzunk, vagy amely megmutatja az egyenlő csoportok számát.
            </p>
            <div className="mt-2 text-center py-1 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-blue-700 dark:text-blue-300 font-mono font-bold text-xs">
              Példa: 24 · 5 ⟹ 24
            </div>
          </TheoryCard>

          <TheoryCard title="2. Tényező (Szorzó)" icon={<Zap className="w-4 h-4 text-emerald-600" />} badge="Második tag">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A szám, amellyel szorzunk.
            </p>
            <div className="mt-2 text-center py-1 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs">
              Példa: 24 · 5 ⟹ 5
            </div>
          </TheoryCard>

          <TheoryCard title="Szorzat (Eredmény)" icon={<CheckCircle2 className="w-4 h-4 text-purple-600" />} badge="Eredmény">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A szorzás végeredménye.
            </p>
            <div className="mt-2 text-center py-1 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-purple-700 dark:text-purple-300 font-mono font-bold text-xs">
              24 · 5 = 120 ⟹ 120
            </div>
          </TheoryCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="A 0 és az 1 a szorzásban" icon={<ShieldCheck className="w-4 h-4 text-amber-600" />}>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
              <li>• <strong>Szorzás 1-gyel:</strong> bármely számot 1-gyel szorozva önmagát kapjuk (<span className="font-mono font-bold">a · 1 = a</span>). Az 1 a szorzás semleges eleme.</li>
              <li>• <strong>Szorzás 0-val:</strong> bármely számot 0-val szorozva az eredmény mindig 0 (<span className="font-mono font-bold">a · 0 = 0</span>).</li>
            </ul>
          </TheoryCard>

          <TheoryCard title="A szorzás mint ismételt összeadás" icon={<Sparkles className="w-4 h-4 text-emerald-600" />}>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A szorzás valójában azonos tagok gyors összeadását jelenti:
            </p>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs mt-1 text-center">
              4 · 6 = 6 + 6 + 6 + 6 = 24
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. RÉSZ: A SZORZÁS TULAJDONSÁGAI */}
      <TheorySection
        number={2}
        title="A szorzás alapvető tulajdonságai és a széttagolás"
        icon={<Sparkles className="w-5 h-5 text-blue-600" />}
        badgeColor="blue"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="1. Felcserélhetőség" badge="Kommutativitás">
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              A tényezők sorrendje felcserélhető, a szorzat nem változik:
            </p>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-center font-mono font-bold text-xs text-blue-800 dark:text-blue-300">
              a · b = b · a <br />(4 · 7 = 7 · 4 = 28)
            </div>
          </TheoryCard>

          <TheoryCard title="2. Csoportosíthatóság" badge="Asszociativitás">
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              Több tényező szorzatakor a tagok tetszőlegesen párosíthatók:
            </p>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-center font-mono font-bold text-xs text-emerald-800 dark:text-emerald-300">
              (a · b) · c = a · (b · c) <br />(2 · 5) · 9 = 10 · 9 = 90
            </div>
          </TheoryCard>

          <TheoryCard title="3. Széttagolhatóság (Disztributivitás)" badge="Kulcsszabály!">
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              Összeget vagy különbséget tagonként szorozhatunk:
            </p>
            <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-center font-mono font-bold text-xs text-purple-800 dark:text-purple-300">
              a · (b + c) = a·b + a·c <br />6 · 23 = 6·20 + 6·3 = 138
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. RÉSZ: SZORZÁS 10-ZEL, 100-ZAL, 1000-REL */}
      <TheorySection
        number={3}
        title="Gyors szorzás 10-zel, 100-zal, 1000-rel és kerek tízesekkel"
        icon={<Zap className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <TheoryTable
          title="Helyiérték-eltolás szabálya 10 hatványaival történő szorzáskor"
          headers={['Szorzó', 'Szabály', 'Példa', 'Eredmény']}
          rows={[
            ['· 10', 'A szám végére 1 nullát írunk (minden helyiérték 10x lesz)', '45 · 10', '450'],
            ['· 100', 'A szám végére 2 nullát írunk', '72 · 100', '7 200'],
            ['· 1 000', 'A szám végére 3 nullát írunk', '38 · 1 000', '38 000'],
            ['· Kerek tízes (pl. 30)', 'Szorozzuk a számmal (3), majd 1 nullát a végére', '14 · 30 = (14 · 3) · 10', '420']
          ]}
        />
      </TheorySection>

      {/* 4. RÉSZ: AZ ÍRÁSBELI SZORZÁS LÉPÉSEI */}
      <TheorySection
        number={4}
        title="Az írásbeli szorzás menete (Egy- és többjegyű szorzóval)"
        icon={<Layers className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="1. Egyjegyű szorzóval (pl. 348 · 6)" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <p>• <strong>Jobbról balra haladunk:</strong> egyesek, tízesek, százasok.</p>
              <p>• 6 · 8 = 48 ⟹ leírjuk a <strong>8</strong>-at, maradt a <strong>4</strong>.</p>
              <p>• 6 · 4 = 24 + 4 = 28 ⟹ leírjuk a <strong>8</strong>-at, maradt a <strong>2</strong>.</p>
              <p>• 6 · 3 = 18 + 2 = 20 ⟹ leírjuk a <strong>20</strong>-at.</p>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-800 dark:text-emerald-300 font-mono font-bold text-center">
                348 · 6 = 2 088
              </div>
            </div>
          </TheoryCard>

          <TheoryCard title="2. Kétjegyű szorzóval (pl. 36 · 23)" icon={<Layers className="w-4 h-4 text-purple-600" />}>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <p>• <strong>1. részszorzat (20-szal):</strong> 2 · 36 = 72 (tízes helyiértéken: 720).</p>
              <p>• <strong>2. részszorzat (3-mal):</strong> 3 · 36 = 108 (egyesek alá igazítva).</p>
              <p>• <strong>Összeadás:</strong> 720 + 108 = 828.</p>
              <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-purple-800 dark:text-purple-300 font-mono font-bold text-center">
                36 · 23 = 828
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. RÉSZ: TIPIKUS HIBÁK ÉS CSAPDÁK */}
      <TheorySection
        number={5}
        title="Tipikus Tévhitek és Gyakori Csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TheoryTrapBox
            title="A 0 és az 1 szorzásának keverése az összeadással"
            wrong="7 · 0 = 7  vagy  7 · 1 = 1"
            correct="7 · 0 = 0 (bármi · 0 = 0)  és  7 · 1 = 7 (az 1 semleges elem)!"
            explanation="Nullával szorozva semmi sem marad (0), 1-gyel szorozva pedig az eredeti szám marad meg."
          />
          <TheoryTrapBox
            title="A 2. részszorzat eltolásának elfelejtése kétjegyű szorzónál"
            wrong="34 · 23 esetén a 2-vel (20-szal) vett szorzatot közvetlenül az egyesek alá írni"
            correct="A tízesekkel szorzott sort (2 · 34 = 68) 1 hellyel balra tolva, a tízesek alá kell írni (680)!"
            explanation="Mivel a szorzó tízes helyiértékével szorzunk, a részszorzat értéke tízesekben értendő."
          />
          <TheoryTrapBox
            title="Maradék (átvitel) hozzáadása a szorzás ELŐTT"
            wrong="36 · 4 esetén 4 · 6 = 24 (maradt 2), majd a tízesnél (3 + 2) · 4 = 20-at számolni"
            correct="Előbb szorzunk, utána adjuk hozzá az átvitelt: 4 · 3 = 12, és 12 + 2 = 14 (eredmény: 144)!"
            explanation="Az írásbeli algoritmusban a műveleti sorrend kötött: először szorzás, utána a maradék hozzáadása."
          />
          <TheoryTrapBox
            title="Szorzás 10-zel / 100-zal: felesleges írásbeli algoritmus"
            wrong="58 · 100-at hosszas írásbeli szorzással kiszámolni"
            correct="Csak írj 2 nullát a szám végére: 58 · 100 = 5 800!"
            explanation="10 hatványaival való szorzáskor a számjegyek balra lépnek, így annyi nullát teszünk mögé, ahány 0 a szorzóban van."
          />
        </div>
      </TheorySection>

      {/* 6. RÉSZ: INTERAKTÍV ÍRÁSBELI SZORZÁS SZIMULÁTOR */}
      <TheorySection
        number={6}
        title="Interaktív Lépésről Lépésre Írásbeli Szorzás Szimulátor"
        icon={<Calculator className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
        className="no-pdf"
      >
        <TheoryCallout variant="tip" title="Próbáld ki tetszőleges számokkal!">
          Írj be két számot, és léptesd végig a valódi magyar füzetbeli írásbeli szorzást lépésről lépésre, figyelve a helyiértékekre és az átvitelekre (maradékokra)!
        </TheoryCallout>

        <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 my-4">
          {/* Gyors minták (Presets) */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">Gyors minták:</span>
            {[
              { label: '165 · 4 (füzetlap példa)', a: '165', b: '4' },
              { label: '36 · 23 (kétjegyű szorzó)', a: '36', b: '23' },
              { label: '348 · 6 (3 jegyű szorzandó)', a: '348', b: '6' },
              { label: '245 · 32 (többjegyű szorzás)', a: '245', b: '32' },
              { label: '58 · 10 (szorzás 10-zel)', a: '58', b: '10' }
            ].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setFactorA(preset.a);
                  setFactorB(preset.b);
                  setStepIndex(0);
                }}
                className={cn(
                  "px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all",
                  factorA === preset.a && factorB === preset.b
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Szorzás iránya (csak többjegyű szorzónál releváns) */}
          {factorB.trim().length > 1 && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="font-bold text-slate-500 dark:text-slate-400">Szorzás iránya a szorzóban:</span>
              <button
                type="button"
                onClick={() => {
                  setDirection('leftToRight');
                  setStepIndex(0);
                }}
                className={cn(
                  "px-2.5 py-1 font-semibold rounded-lg border transition-all",
                  direction === 'leftToRight'
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                )}
              >
                Balról jobbra (magasabb helyiértéktől - klasszikus magyar)
              </button>
              <button
                type="button"
                onClick={() => {
                  setDirection('rightToLeft');
                  setStepIndex(0);
                }}
                className={cn(
                  "px-2.5 py-1 font-semibold rounded-lg border transition-all",
                  direction === 'rightToLeft'
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                )}
              >
                Jobbról balra (egyesektől)
              </button>
            </div>
          )}

          {/* Beviteli mezők */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">1. Tényező (Szorzandó):</label>
              <input
                type="number"
                min="0"
                max="999999"
                value={factorA}
                onChange={(e) => {
                  setFactorA(e.target.value);
                  setStepIndex(0);
                }}
                className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">2. Tényező (Szorzó):</label>
              <input
                type="number"
                min="0"
                max="9999"
                value={factorB}
                onChange={(e) => {
                  setFactorB(e.target.value);
                  setStepIndex(0);
                }}
                className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {simData && !simData.error && simData.steps && simData.steps.length > 0 && (
            <div className="space-y-4 pt-2">
              {/* Vizuális Négyzetrácsos Füzetlap Kártya */}
              <div className="flex justify-center">
                <div className="bg-[#fafbfd] dark:bg-slate-900/90 p-4 sm:p-6 rounded-2xl border-2 border-sky-200/80 dark:border-slate-700 shadow-sm inline-block select-none overflow-x-auto max-w-full">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-sky-100 dark:border-slate-800 text-xs font-bold text-sky-800 dark:text-sky-300">
                    <span className="flex items-center gap-1.5">
                      <span>📓</span> Négyzetrácsos füzetlap
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {simData.isSingleDigit ? 'Egyjegyű szorzó' : 'Többjegyű szorzó'}
                    </span>
                  </div>

                  {/* Kockás rács mátrix */}
                  <div className="flex flex-col gap-0 border border-sky-200/70 dark:border-slate-700/80 rounded-lg overflow-hidden bg-white dark:bg-slate-950 font-mono text-lg sm:text-xl font-bold">
                    {/* 1. Sor: Felírás (Szorzandó · Szorzó) és Aláhúzás a szorzandó alatt */}
                    <div className="flex flex-row">
                      {Array.from({ length: simData.totalCols }).map((_, c) => {
                        let char = '';
                        let isHighlighted = false;

                        if (c === simData.dotCol) {
                          char = '·';
                        } else if (c >= simData.bStartCol && c < simData.bStartCol + simData.sB.length) {
                          char = simData.sB[c - simData.bStartCol];
                          if (currentStep?.activeColB === c) {
                            isHighlighted = true;
                          }
                        } else if (c <= simData.onesCol && c >= simData.onesCol - (simData.sA.length - 1)) {
                          char = simData.sA[c - (simData.onesCol - (simData.sA.length - 1))];
                          if (currentStep?.activeColA === c) {
                            isHighlighted = true;
                          }
                        }

                        // Magyar füzet szabály: a vonalat a szorzandó alatt húzzuk meg (0-tól onesCol-ig)
                        const hasUnderline = c <= simData.onesCol;

                        return (
                          <div
                            key={c}
                            className={cn(
                              "w-8 h-9 sm:w-10 sm:h-11 flex items-center justify-center border border-sky-100 dark:border-slate-800/80 transition-colors",
                              hasUnderline ? "border-b-[3px] border-b-slate-900 dark:border-b-slate-100" : "",
                              isHighlighted ? "bg-amber-100 dark:bg-amber-950/70 text-amber-950 dark:text-amber-100 font-black ring-1 ring-amber-400" : "text-slate-900 dark:text-slate-100",
                              char === '·' ? "text-slate-700 dark:text-slate-300 font-black" : ""
                            )}
                          >
                            {char}
                          </div>
                        );
                      })}
                    </div>

                    {/* 2. Egyjegyű szorzó esetén: Eredmény sor (kék toll színnel) */}
                    {simData.isSingleDigit && (
                      <div className="flex flex-row">
                        {Array.from({ length: simData.totalCols }).map((_, c) => {
                          const resItem = currentStep?.revealedResultDigits?.find((d) => d.col === c);
                          return (
                            <div
                              key={c}
                              className={cn(
                                "w-8 h-9 sm:w-10 sm:h-11 flex items-center justify-center border border-sky-100 dark:border-slate-800/80 transition-all font-black text-blue-700 dark:text-blue-400",
                                resItem?.isNew ? "bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 scale-105" : ""
                              )}
                            >
                              {resItem ? resItem.char : ''}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* 3. Többjegyű szorzó esetén: Részszorzat sorok és Összeg */}
                    {!simData.isSingleDigit && (
                      <>
                        {Array.from({ length: simData.sB.length }).map((_, rIdx) => {
                          const pRow = currentStep?.revealedPartialRows?.find((r) => r.rowIdx === rIdx);
                          const isLastPartialRow = rIdx === simData.sB.length - 1;
                          const hasSumUnderline = isLastPartialRow && currentStep?.showSumUnderline;

                          const rowColors = [
                            'text-blue-700 dark:text-blue-400',
                            'text-rose-700 dark:text-rose-400',
                            'text-purple-700 dark:text-purple-400',
                            'text-amber-700 dark:text-amber-400'
                          ];
                          const colorClass = rowColors[rIdx % rowColors.length];

                          return (
                            <div key={rIdx} className="flex flex-row">
                              {Array.from({ length: simData.totalCols }).map((_, c) => {
                                const cell = pRow?.cells?.find((cell) => cell.col === c);
                                const cellUnderline = hasSumUnderline && c <= simData.onesCol;

                                return (
                                  <div
                                    key={c}
                                    className={cn(
                                      "w-8 h-9 sm:w-10 sm:h-11 flex items-center justify-center border border-sky-100 dark:border-slate-800/80 transition-colors font-bold",
                                      cellUnderline ? "border-b-[3px] border-b-slate-900 dark:border-b-slate-100" : "",
                                      cell ? colorClass : ""
                                    )}
                                  >
                                    {cell ? cell.char : ''}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}

                        {/* Összeg sor */}
                        {currentStep?.revealedSumDigits && (
                          <div className="flex flex-row bg-emerald-50/50 dark:bg-emerald-950/20">
                            {Array.from({ length: simData.totalCols }).map((_, c) => {
                              const sumCell = currentStep.revealedSumDigits?.find((d) => d.col === c);
                              return (
                                <div
                                  key={c}
                                  className="w-8 h-9 sm:w-10 sm:h-11 flex items-center justify-center border border-sky-100 dark:border-slate-800/80 text-emerald-600 dark:text-emerald-400 font-black"
                                >
                                  {sumCell ? sumCell.char : ''}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Maradék (Átvitel) ujjjelző kártya egyjegyű szorzásnál */}
                  {simData.isSingleDigit && currentStep && currentStep.carryOut !== undefined && currentStep.carryOut > 0 && (
                    <div className="mt-3 flex items-center justify-center gap-2 p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs font-bold text-amber-800 dark:text-amber-300">
                      <span className="text-lg">🖐️</span>
                      <span>
                        Kezünkön mutatjuk a maradékot: <span className="font-mono text-base font-black text-amber-600 dark:text-amber-400">{currentStep.carryOut}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Lépés magyarázó kártya */}
              {currentStep && (
                <div className="p-3 sm:p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900/60 text-xs sm:text-sm">
                  <div className="font-bold text-emerald-800 dark:text-emerald-300 mb-1 flex items-center justify-between flex-wrap gap-1">
                    <span>{currentStep.title}</span>
                    {currentStep.carryIn !== undefined && currentStep.carryIn > 0 && (
                      <span className="text-[11px] font-bold px-2 py-0.5 bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 rounded-full border border-blue-300 dark:border-blue-800">
                        Előző maradék: +{currentStep.carryIn}
                      </span>
                    )}
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

              {/* Összegző siker kártya az utolsó lépésnél */}
              {safeStepIndex === simData.steps.length - 1 && (
                <div className="p-3 bg-emerald-100/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-300 dark:border-emerald-800 text-center text-xs font-bold text-emerald-800 dark:text-emerald-200">
                  🎉 Az írásbeli szorzás sikeresen elkészült: <span className="font-mono text-sm">{simData.a.toLocaleString('hu-HU')} · {simData.b.toLocaleString('hu-HU')} = {simData.product.toLocaleString('hu-HU')}</span>
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

export default MultiplicationTheory;
