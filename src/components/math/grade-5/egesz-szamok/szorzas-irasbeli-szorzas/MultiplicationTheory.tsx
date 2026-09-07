import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Download,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  FileText,
  Calculator,
  Info,
  Layers,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Zap,
  Check,
  ArrowRight,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportElementToPDF } from '@/utils/pdfExport';

interface MultiplicationTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

interface StepInfo {
  stepNumber: number;
  description: string;
  focusDigits: string;
  subTotalText?: string;
}

export function MultiplicationTheory({ onBack, onStartQuiz }: MultiplicationTheoryProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Interactive Simulator State
  const [factorA, setFactorA] = useState<string>('36');
  const [factorB, setFactorB] = useState<string>('23');
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'leftToRight' | 'rightToLeft'>('leftToRight');

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await exportElementToPDF('multiplication-theory-content', 'Szorzas_Irasbeli_Szorzas_Tananyag');
    setIsDownloading(false);
  };

  // Color mapping per multiplier digit (matches Hungarian textbook & notebook color standards)
  const DIGIT_COLORS = [
    {
      text: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-600 text-white',
      cellBg: 'bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-black',
      border: 'border-blue-400 dark:border-blue-600',
      name: 'kék'
    },
    {
      text: 'text-rose-600 dark:text-rose-400',
      badge: 'bg-rose-600 text-white',
      cellBg: 'bg-rose-50/80 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-black',
      border: 'border-rose-400 dark:border-rose-600',
      name: 'piros'
    },
    {
      text: 'text-emerald-600 dark:text-emerald-400',
      badge: 'bg-emerald-600 text-white',
      cellBg: 'bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-black',
      border: 'border-emerald-400 dark:border-emerald-600',
      name: 'zöld'
    },
    {
      text: 'text-purple-600 dark:text-purple-400',
      badge: 'bg-purple-600 text-white',
      cellBg: 'bg-purple-50/80 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-black',
      border: 'border-purple-400 dark:border-purple-600',
      name: 'lila'
    }
  ];

  // Helper to compute exact Hungarian school written multiplication grid and steps
  const getMultiplicationSteps = (aStr: string, bStr: string, dir: 'leftToRight' | 'rightToLeft') => {
    const a = parseInt(aStr.replace(/\s+/g, ''), 10);
    const b = parseInt(bStr.replace(/\s+/g, ''), 10);

    if (isNaN(a) || isNaN(b) || a < 0 || b < 0 || a > 999999 || b > 9999) {
      return {
        error: 'Kérlek adj meg érvényes természetes számokat (első legfeljebb 6 jegyű, második legfeljebb 4 jegyű)!',
        steps: [],
        product: 0,
        totalCols: 0,
        headerCells: [],
        partialRows: [],
        resultCells: [],
        isSingleDigit: false
      };
    }

    const aDigits = a.toString().split('').map(Number);
    const bDigits = b.toString().split('').map(Number);
    const product = a * b;
    const pDigits = product.toString().split('').map(Number);

    const L_A = aDigits.length;
    const L_B = bDigits.length;
    const L_P = pDigits.length;

    // Multiplier order:
    // 'leftToRight' (balról jobbra: tízesekkel/legnagyobb helyiértékkel kezdünk, jobbra tolunk)
    // 'rightToLeft' (jobbról balra: egyesekkel kezdünk, balra tolunk)
    const multOrderIndices: number[] = [];
    if (dir === 'leftToRight') {
      for (let i = 0; i < L_B; i++) multOrderIndices.push(i);
    } else {
      for (let i = L_B - 1; i >= 0; i--) multOrderIndices.push(i);
    }

    // Coordinate calculation:
    // factorA starts at 0, ends at L_A - 1 (col_A_end = L_A - 1).
    // Dot '·' is at L_A.
    // factorB starts at L_A + 1, digit k is at L_A + 1 + k.
    // In 'leftToRight': row orderIdx rightmost digit is at (L_A - 1 + orderIdx).
    // In 'rightToLeft': row orderIdx rightmost digit is at (L_A - 1 - orderIdx).

    let minCol = 0;
    multOrderIndices.forEach((bIdx, orderIdx) => {
      const subVal = a * bDigits[bIdx];
      const subLen = subVal.toString().length;
      const targetColRel = dir === 'leftToRight' ? (L_A - 1 + orderIdx) : (L_A - 1 - orderIdx);
      const leftCol = orderIdx >= 1 ? (targetColRel - subLen - 1) : (targetColRel - subLen + 1);
      if (leftCol < minCol) minCol = leftCol;
    });

    const resultRightRel = dir === 'leftToRight' ? (L_A + L_B - 2) : (L_A - 1);
    const totalLeft = resultRightRel - L_P + 1;
    if (totalLeft < minCol) minCol = totalLeft;

    const offset = -minCol;
    const maxRightColRel = Math.max(L_A + L_B, resultRightRel);
    const totalCols = maxRightColRel + offset + 1;

    // Header cells
    const headerCells: ({ char: string; isDot?: boolean; isMultiplier?: boolean; bIndex?: number; colIndex: number; colorClass?: string } | null)[] = Array(totalCols).fill(null);

    // Factor A digits (black)
    aDigits.forEach((digit, k) => {
      const col = k + offset;
      headerCells[col] = {
        char: digit.toString(),
        colIndex: col,
        colorClass: 'text-slate-900 dark:text-white'
      };
    });

    // Dot '·'
    const dotCol = L_A + offset;
    headerCells[dotCol] = {
      char: '·',
      isDot: true,
      colIndex: dotCol,
      colorClass: 'text-slate-900 dark:text-white'
    };

    // Factor B digits (color-coded per digit!)
    bDigits.forEach((digit, k) => {
      const col = L_A + 1 + k + offset;
      const colorObj = DIGIT_COLORS[k % DIGIT_COLORS.length];
      headerCells[col] = {
        char: digit.toString(),
        isMultiplier: true,
        bIndex: k,
        colIndex: col,
        colorClass: colorObj.text
      };
    });

    // Steps list
    const steps: StepInfo[] = [];
    const estA = Math.round(a / Math.pow(10, L_A - 1)) * Math.pow(10, L_A - 1);
    const estB = Math.round(b / Math.pow(10, L_B - 1)) * Math.pow(10, L_B - 1);
    const estProd = estA * estB;

    steps.push({
      stepNumber: 1,
      description: `Felírjuk az írásbeli szorzást a négyzetrácsba: ${a.toLocaleString('hu-HU')} · ${b.toLocaleString('hu-HU')}. Kerekítési becslés: ${estA.toLocaleString('hu-HU')} · ${estB.toLocaleString('hu-HU')} ≈ ${estProd.toLocaleString('hu-HU')}.`,
      focusDigits: 'Művelet felírása',
      subTotalText: 'Kezdés'
    });

    // Partial rows
    interface PartialRowData {
      digit: number;
      multiplierIndex: number;
      placeName: string;
      value: number;
      cells: ({ char: string; isOperator?: boolean; colIndex: number; colorClass?: string } | null)[];
      stepIndexRequired: number;
      colorObj: typeof DIGIT_COLORS[0];
    }

    const partialRows: PartialRowData[] = [];

    multOrderIndices.forEach((bIdx, orderIdx) => {
      const digit = bDigits[bIdx];
      const subVal = a * digit;
      const subDigits = subVal.toString().split('').map(Number);
      const colorObj = DIGIT_COLORS[bIdx % DIGIT_COLORS.length];

      const placeName =
        L_B === 1
          ? 'egyesekkel'
          : bIdx === 0 && L_B === 2
          ? 'tízesekkel'
          : bIdx === 1 && L_B === 2
          ? 'egyesekkel'
          : bIdx === 0 && L_B === 3
          ? 'százasokkal'
          : bIdx === 1 && L_B === 3
          ? 'tízesekkel'
          : bIdx === 2 && L_B === 3
          ? 'egyesekkel'
          : `${Math.pow(10, L_B - 1 - bIdx)}-es helyiértékkel`;

      const rowCells: ({ char: string; isOperator?: boolean; colIndex: number; colorClass?: string } | null)[] = Array(totalCols).fill(null);
      const targetCol = (dir === 'leftToRight' ? (L_A - 1 + orderIdx) : (L_A - 1 - orderIdx)) + offset;

      // Add '+' sign in front of the row for 2nd and subsequent rows
      if (orderIdx >= 1) {
        const plusCol = targetCol - subDigits.length;
        if (plusCol >= 0 && plusCol < totalCols) {
          rowCells[plusCol] = {
            char: '+',
            isOperator: true,
            colIndex: plusCol,
            colorClass: 'text-slate-900 dark:text-white font-black'
          };
        }
      }

      subDigits.forEach((d, dIdx) => {
        const col = targetCol - (subDigits.length - 1 - dIdx);
        rowCells[col] = {
          char: d.toString(),
          colIndex: col,
          colorClass: colorObj.text
        };
      });

      const stepNum = steps.length + 1;

      // Detailed digit-by-digit explanation
      const digitStepsExplanation: string[] = [];
      let carry = 0;
      for (let k = aDigits.length - 1; k >= 0; k--) {
        const aDigit = aDigits[k];
        const mult = digit * aDigit + carry;
        const writeDigit = mult % 10;
        const newCarry = Math.floor(mult / 10);
        if (k === 0) {
          digitStepsExplanation.push(`${digit} · ${aDigit}${carry > 0 ? ` + ${carry}` : ''} = ${mult} (leírjuk a ${mult}-et)`);
        } else {
          digitStepsExplanation.push(`${digit} · ${aDigit}${carry > 0 ? ` + ${carry}` : ''} = ${mult} (leírjuk a ${writeDigit}-ot, ${newCarry} a maradék)`);
        }
        carry = newCarry;
      }

      const alignmentRuleText =
        orderIdx === 0
          ? `Az 1. részletszorzatot (${subVal}) a szorzandó (${a}) alá írjuk le.`
          : dir === 'leftToRight'
          ? `A(z) ${orderIdx + 1}. részletszorzatot (${subVal}) ${orderIdx} hellyel jobbra eltolva írjuk le, elé + jelet téve.`
          : `A(z) ${orderIdx + 1}. részletszorzatot (${subVal}) ${orderIdx} hellyel balra eltolva írjuk le, elé + jelet téve.`;

      steps.push({
        stepNumber: stepNum,
        description: `Szorzunk a(z) ${digit}-essel (${placeName}): ${a} · ${digit} = ${subVal.toLocaleString('hu-HU')}. ${alignmentRuleText} Lépések: ${digitStepsExplanation.join('; ')}.`,
        focusDigits: `Szorzás: ${digit}-gyel`,
        subTotalText: `Részletszorzat: ${subVal.toLocaleString('hu-HU')}`
      });

      partialRows.push({
        digit,
        multiplierIndex: bIdx,
        placeName,
        value: subVal,
        cells: rowCells,
        stepIndexRequired: stepNum - 1,
        colorObj
      });
    });

    // Result row cells
    const resultCells: ({ char: string; colIndex: number } | null)[] = Array(totalCols).fill(null);
    pDigits.forEach((d, idx) => {
      const col = (resultRightRel + offset) - (pDigits.length - 1 - idx);
      resultCells[col] = {
        char: d.toString(),
        colIndex: col
      };
    });

    if (L_B > 1) {
      steps.push({
        stepNumber: steps.length + 1,
        description: `Összeadjuk a részletszorzatokat egymás alatt helyiérték szerint: a végső pontos szorzat ${product.toLocaleString('hu-HU')}.`,
        focusDigits: 'Részletszorzatok összeadása',
        subTotalText: `Végeredmény: ${product.toLocaleString('hu-HU')}`
      });
    }

    return {
      error: null,
      steps,
      product,
      totalCols,
      headerCells,
      partialRows,
      resultCells,
      isSingleDigit: L_B === 1
    };
  };

  const currentCalc = getMultiplicationSteps(factorA, factorB, direction);
  const totalSteps = currentCalc && !currentCalc.error ? currentCalc.steps.length : 0;
  const safeStep = Math.min(stepIndex, Math.max(0, totalSteps - 1));

  // Active step info
  const activePartial = currentCalc?.partialRows?.find((p) => p.stepIndexRequired === safeStep);
  const activeMultiplierIndex = activePartial ? activePartial.multiplierIndex : null;

  return (
    <div className="w-full px-2 sm:px-4 py-2 animate-in fade-in duration-300 text-left">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 no-pdf">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="rounded-xl h-9 px-3 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
          Vissza a témakörökhöz
        </Button>

        <div className="flex items-center gap-2">
          {onStartQuiz && (
            <Button
              variant="outline"
              size="sm"
              onClick={onStartQuiz}
              className="rounded-xl h-9 px-3 border-amber-300 bg-amber-50/60 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 hover:bg-amber-100 text-xs sm:text-sm font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
              Gyakorló Kvíz indítása
            </Button>
          )}

          <Button
            size="sm"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="rounded-xl h-9 px-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            {isDownloading ? 'Letöltés...' : 'Tananyag letöltése (PDF)'}
          </Button>
        </div>
      </div>

      {/* Main Printable Theory Container */}
      <div
        id="multiplication-theory-content"
        className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 p-5 sm:p-8 shadow-sm space-y-8"
      >
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 mb-2 border border-amber-200 dark:border-amber-800">
              <span>✖️ 5. Osztály • I. Az egész számok</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Szorzás, írásbeli szorzás
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Műveleti tulajdonságok, fejszámolási stratégiák, disztributivitás és többjegyű írásbeli szorzás
            </p>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-slate-800/80 rounded-2xl border border-amber-200/60 dark:border-slate-700 text-center shrink-0">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Képlet</div>
            <div className="text-base sm:text-lg font-mono font-black text-amber-700 dark:text-amber-300">
              tényező · tényező = szorzat
            </div>
          </div>
        </div>

        {/* Section 1: Alapok & Fogalmak */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-sm">
              1.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              A szorzás alapjai és fogalmai
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 shadow-none bg-slate-50/50 dark:bg-slate-850/50">
              <CardContent className="p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                  <Calculator className="w-4 h-4" />
                  <span>A szorzás tagjai és az ismételt összeadás</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  A szorzás olyan egyenlő tagok összeadását rövidíti, amelyek mind megegyeznek:
                </p>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm text-center">
                  <span className="text-amber-700 dark:text-amber-300 font-bold">5 · 4</span> = 4 + 4 + 4 + 4 + 4 = <span className="font-black text-emerald-600 dark:text-emerald-400">20</span>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 pl-4 list-disc">
                  <li><strong>Első tényező (szorzandó):</strong> mutatja, hány darab egyenlő tagot adunk össze.</li>
                  <li><strong>Második tényező (szorzó):</strong> mutatja, mekkora az összeadandó tag értéke.</li>
                  <li><strong>Szorzat:</strong> a szorzási művelet eredménye.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 shadow-none bg-slate-50/50 dark:bg-slate-850/50">
              <CardContent className="p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                  <Lightbulb className="w-4 h-4" />
                  <span>Különleges szorzások: 0 és 1</span>
                </div>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between">
                    <div>
                      <strong className="text-amber-900 dark:text-amber-200">Szorzás 1-gyel:</strong>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Bármely számot 1-gyel szorozva önmagát kapjuk.</div>
                    </div>
                    <span className="font-mono font-bold text-amber-700 dark:text-amber-300">a · 1 = a</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center justify-between">
                    <div>
                      <strong className="text-rose-900 dark:text-rose-200">Szorzás 0-val:</strong>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Ha bármelyik tényező 0, a szorzat mindig 0.</div>
                    </div>
                    <span className="font-mono font-bold text-rose-700 dark:text-rose-300">a · 0 = 0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 2: Műveleti Tulajdonságok */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-sm">
              2.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              A szorzás alaptulajdonságai
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="inline-block px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[11px] font-black uppercase">
                1. Felcserélhetőség (Kommutativitás)
              </div>
              <div className="font-mono font-bold text-xs text-amber-700 dark:text-amber-300">
                a · b = b · a
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A tényezők sorrendje felcserélhető, a szorzat értéke változatlan marad.
              </p>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-900 text-[11px] font-mono border border-slate-200 dark:border-slate-800">
                4 · 25 = 25 · 4 = 100
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="inline-block px-2 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 text-[11px] font-black uppercase">
                2. Csoportosíthatóság (Asszociativitás)
              </div>
              <div className="font-mono font-bold text-xs text-orange-700 dark:text-orange-300">
                (a · b) · c = a · (b · c)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Több tényező szorzatakor a műveletek tetszőlegesen zárójelezhetők és csoportosíthatók.
              </p>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-900 text-[11px] font-mono border border-slate-200 dark:border-slate-800">
                (8 · 5) · 20 = 8 · (5 · 20) = 800
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="inline-block px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-[11px] font-black uppercase">
                3. Szétszedési szabály (Disztributivitás)
              </div>
              <div className="font-mono font-bold text-xs text-rose-700 dark:text-rose-300">
                (a + b) · c = a · c + b · c
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Összeget vagy különbséget úgy szorzunk egy számmal, hogy minden tagot megszorzunk vele.
              </p>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-900 text-[11px] font-mono border border-slate-200 dark:border-slate-800">
                18 · 6 = (10 + 8) · 6 = 60 + 48 = 108
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Szorzás 10-zel, 100-zal, 1000-rel & Fejszámolás */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-sm">
              3.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Szorzás 10-zel, 100-zal, 1000-rel és nullákra végződő számokkal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-2.5">
              <div className="font-bold text-xs sm:text-sm text-amber-900 dark:text-amber-200">
                🚀 A helyiértékes eltolás és a nullák elhelyezése
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Amikor egy egész számot 10-zel, 100-zal, vagy 1000-rel szorzunk, minden számjegy 1, 2, illetve 3 helyiértékkel balra tolódik, és a végére annyi nullát írunk:
              </p>
              <div className="grid grid-cols-3 gap-2 font-mono text-center text-xs">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/50">
                  <div className="text-slate-400 text-[10px]">· 10 (1 nulla)</div>
                  <div className="font-bold text-amber-700 dark:text-amber-300">48 · 10 = 480</div>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/50">
                  <div className="text-slate-400 text-[10px]">· 100 (2 nulla)</div>
                  <div className="font-bold text-amber-700 dark:text-amber-300">48 · 100 = 4 800</div>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/50">
                  <div className="text-slate-400 text-[10px]">· 1000 (3 nulla)</div>
                  <div className="font-bold text-amber-700 dark:text-amber-300">48 · 1k = 48 000</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                💡 Trükk: Kerek számok szorzása (Nullák elpakolása)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Kerek számok szorzásakor szorozzuk össze az értékes jegyeket, majd írjuk a szorzat végére a tényezők összes záró nulláját:
              </p>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-center space-y-1">
                <div>
                  <span className="text-amber-700 dark:text-amber-300 font-bold">40 · 300</span> = (4 · 3) és (1 + 2 = 3 nulla) = <span className="font-black text-emerald-600 dark:text-emerald-400">12 000</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  600 · 80 = (6 · 8) és 3 nulla = 48 000
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Írásbeli szorzás egy- és többjegyűvel */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-sm">
              4.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Az írásbeli szorzás lépései és szabályai
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Egyjegyű szorzóval</span>
              </div>
              <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pl-4 list-decimal leading-relaxed">
                <li><strong>Jobbról balra</strong> haladva szorozzuk a szorzandó számjegyeit (egyesek, tízesek, százasok...).</li>
                <li>Ha a szorzat kétjegyű, az egyeseket leírjuk az oszlopba, a tízeseket pedig <strong>továbbvisszük maradékként</strong> a következő helyiértékhez.</li>
                <li>A következő helyiérték szorzatához hozzáadjuk a maradékot.</li>
              </ol>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400 font-bold text-xs sm:text-sm">
                <Layers className="w-4 h-4" />
                <span>Két- és többjegyű szorzóval</span>
              </div>
              <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pl-4 list-decimal leading-relaxed">
                <li>A szorzást a szorzó jegyeivel balról jobbra végezzük el (részletszorzatok).</li>
                <li><strong>1. részletszorzat:</strong> pontosan a szorzandó alá kerül!</li>
                <li><strong>Következő részletszorzatok:</strong> mindig 1 helyiértékkel jobbra eltolva kerülnek leírásra.</li>
                <li>A részletszorzatokat a végén egymás alatt <strong>összeadjuk</strong>.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Section 5: Interaktív Szimulátor (Magyar Négyzetrácsos Füzet Elrendezés) */}
        <section className="space-y-4 no-pdf">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500 text-white font-bold text-sm shadow-xs">
                5.
              </span>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Interaktív Írásbeli Szorzás Szimulátor
                </h2>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Klasszikus magyar négyzetrácsos füzetlap elrendezés (első részlet a szám alá, a második 1-gyel jobbra tolva)
                </div>
              </div>
            </div>

            {/* Presets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-slate-400 mr-1">Példák:</span>
              {[
                { label: '36 · 23', a: '36', b: '23' },
                { label: '348 · 26', a: '348', b: '26' },
                { label: '362 · 26', a: '362', b: '26' },
                { label: '425 · 34', a: '425', b: '34' },
                { label: '1 245 · 123', a: '1245', b: '123' },
                { label: '605 · 42', a: '605', b: '42' },
                { label: '524 · 7', a: '524', b: '7' }
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setFactorA(preset.a);
                    setFactorB(preset.b);
                    setStepIndex(0);
                  }}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border",
                    factorA === preset.a && factorB === preset.b
                      ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-slate-50 dark:from-slate-850 dark:to-slate-900 p-4 sm:p-6 rounded-3xl border-2 border-amber-200/80 dark:border-slate-800 shadow-sm space-y-5">
            {/* Custom Input Controls & Direction Selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-amber-200/60 dark:border-slate-700">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-500">1. Szám:</span>
                  <input
                    type="number"
                    value={factorA}
                    onChange={(e) => {
                      setFactorA(e.target.value);
                      setStepIndex(0);
                    }}
                    className="w-20 sm:w-24 h-9 px-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono font-bold text-center"
                    placeholder="pl. 36"
                  />
                </div>

                <span className="text-lg font-black text-slate-600 dark:text-slate-400">·</span>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-500">2. Szám:</span>
                  <input
                    type="number"
                    value={factorB}
                    onChange={(e) => {
                      setFactorB(e.target.value);
                      setStepIndex(0);
                    }}
                    className="w-20 sm:w-24 h-9 px-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono font-bold text-center"
                    placeholder="pl. 23"
                  />
                </div>

                {/* Irányválasztó gombok */}
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-amber-100/80 dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 shadow-xs">
                  <span className="text-xs font-black text-amber-900 dark:text-amber-200 px-2 flex items-center gap-1 select-none">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Irány:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setDirection('leftToRight');
                      setStepIndex(0);
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer",
                      direction === 'leftToRight'
                        ? "bg-amber-600 text-white shadow-sm ring-1 ring-amber-700"
                        : "bg-white/90 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-white hover:text-slate-900 dark:hover:text-white"
                    )}
                    title="Balról jobbra: a szorzó legnagyobb helyiértékével (tízesekkel) kezdünk, jobbra tolunk"
                  >
                    <span>Balról jobbra</span>
                    <ArrowRight className="w-3 h-3 opacity-90" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDirection('rightToLeft');
                      setStepIndex(0);
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer",
                      direction === 'rightToLeft'
                        ? "bg-amber-600 text-white shadow-sm ring-1 ring-amber-700"
                        : "bg-white/90 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-white hover:text-slate-900 dark:hover:text-white"
                    )}
                    title="Jobbról balra: a szorzó legkisebb helyiértékével (egyesekkel) kezdünk, balra tolunk"
                  >
                    <ArrowLeft className="w-3 h-3 opacity-90" />
                    <span>Jobbról balra</span>
                  </button>
                </div>
              </div>

              {/* Step Controls */}
              <div className="flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                  disabled={safeStep === 0}
                  className="rounded-xl h-8 px-2.5 text-xs font-bold"
                >
                  <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Előző
                </Button>

                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 px-2 font-mono">
                  {safeStep + 1} / {totalSteps || 1}
                </span>

                <Button
                  size="sm"
                  onClick={() => setStepIndex((prev) => Math.min(totalSteps - 1, prev + 1))}
                  disabled={safeStep >= totalSteps - 1}
                  className="rounded-xl h-8 px-3 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Következő <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setStepIndex(totalSteps - 1)}
                  className="rounded-xl h-8 px-2 text-xs text-amber-700 dark:text-amber-300 font-bold"
                >
                  Vége
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setStepIndex(0)}
                  className="rounded-xl h-8 px-2 text-xs text-slate-500"
                  title="Újrakezdés"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Direction Method Info Banner */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-amber-200/80 dark:border-slate-700 text-xs shadow-xs">
              <span className="font-black text-amber-900 dark:text-amber-300 flex items-center gap-1.5 shrink-0">
                <Info className="w-4 h-4 text-amber-600" />
                {direction === 'leftToRight' ? 'Balról jobbra számolás:' : 'Jobbról balra számolás:'}
              </span>
              <span className="text-slate-700 dark:text-slate-300">
                {direction === 'leftToRight'
                  ? 'A legnagyobb helyiértékkel kezdünk (tízesek/százasok). Az 1. részletszorzat közvetlenül a szám alá kerül, a 2. részletszorzat 1 hellyel jobbra tolódik elé kitett + jellel.'
                  : 'Az egyesekkel kezdünk. Az 1. részletszorzat közvetlenül a szám alá kerül, a 2. részletszorzat 1 hellyel balra tolódik a tízesekhez elé kitett + jellel.'}
              </span>
            </div>

            {/* Error state */}
            {currentCalc.error ? (
              <div className="p-4 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold">
                {currentCalc.error}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* Left: Hungarian Math Notebook Grid Display */}
                <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 sm:p-6 bg-sky-50/40 dark:bg-slate-900/90 rounded-2xl border-2 border-sky-300/70 dark:border-sky-900/60 shadow-inner overflow-x-auto">
                  <div className="inline-block min-w-max space-y-1">
                    {/* Header Row (factorA · factorB) */}
                    <div
                      className="grid items-center pb-1.5 border-b-2 border-slate-900 dark:border-slate-100"
                      style={{
                        gridTemplateColumns: `repeat(${currentCalc.totalCols}, minmax(2.25rem, 2.75rem))`
                      }}
                    >
                      {currentCalc.headerCells.map((cell, cIdx) => {
                        if (!cell) {
                          return (
                            <div
                              key={cIdx}
                              className="w-9 h-10 sm:w-11 sm:h-12 border border-sky-200/60 dark:border-slate-800/80 bg-white/60 dark:bg-slate-850/40"
                            />
                          );
                        }

                        const isFocusedMultiplier = cell.isMultiplier && activeMultiplierIndex === cell.bIndex;

                        return (
                          <div
                            key={cIdx}
                            className={cn(
                              "w-9 h-10 sm:w-11 sm:h-12 flex items-center justify-center font-mono font-black text-2xl sm:text-3xl border border-sky-200/80 dark:border-slate-800 bg-white dark:bg-slate-850 transition-all",
                              cell.colorClass,
                              isFocusedMultiplier && "ring-2 ring-amber-400 bg-amber-50 dark:bg-amber-950/60 scale-105 z-10"
                            )}
                          >
                            <span>{cell.char}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Partial Product Rows */}
                    {currentCalc.partialRows.map((row, rIdx) => {
                      const isRevealed = safeStep >= row.stepIndexRequired;
                      if (!isRevealed) return null;

                      const isCurrentStep = safeStep === row.stepIndexRequired;

                      return (
                        <div
                          key={rIdx}
                          className={cn(
                            "grid items-center animate-in fade-in slide-in-from-top-1 duration-200",
                            isCurrentStep ? "bg-amber-100/30 dark:bg-amber-950/20" : ""
                          )}
                          style={{
                            gridTemplateColumns: `repeat(${currentCalc.totalCols}, minmax(2.25rem, 2.75rem))`
                          }}
                        >
                          {row.cells.map((cell, cIdx) => {
                            if (!cell) {
                              return (
                                <div
                                  key={cIdx}
                                  className="w-9 h-10 sm:w-11 sm:h-12 border border-sky-200/60 dark:border-slate-800/80 bg-white/40 dark:bg-slate-850/30"
                                />
                              );
                            }

                            return (
                              <div
                                key={cIdx}
                                className={cn(
                                  "w-9 h-10 sm:w-11 sm:h-12 flex items-center justify-center font-mono font-black text-2xl sm:text-3xl border border-sky-200/80 dark:border-slate-800 bg-white dark:bg-slate-850 transition-all",
                                  cell.colorClass,
                                  cell.isOperator && "text-slate-800 dark:text-slate-200 font-black text-xl sm:text-2xl",
                                  isCurrentStep && !cell.isOperator && "ring-1 ring-amber-300"
                                )}
                              >
                                <span>{cell.char}</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}

                    {/* Final Result Row (shown on the last step or single digit) */}
                    {safeStep === totalSteps - 1 && (
                      <div className="pt-1 border-t-2 border-slate-900 dark:border-slate-100 animate-in zoom-in-95 duration-200">
                        <div
                          className="grid items-center"
                          style={{
                            gridTemplateColumns: `repeat(${currentCalc.totalCols}, minmax(2.25rem, 2.75rem))`
                          }}
                        >
                          {currentCalc.resultCells.map((cell, cIdx) => {
                            if (!cell) {
                              return (
                                <div
                                  key={cIdx}
                                  className="w-9 h-10 sm:w-11 sm:h-12 border border-sky-200/60 dark:border-slate-800/80 bg-white/40 dark:bg-slate-850/30"
                                />
                              );
                            }

                            return (
                              <div
                                key={cIdx}
                                className="w-9 h-10 sm:w-11 sm:h-12 flex items-center justify-center font-mono font-black text-2xl sm:text-3xl text-slate-900 dark:text-white border-2 border-slate-900 dark:border-slate-200 bg-white dark:bg-slate-850 shadow-xs"
                              >
                                {cell.char}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Legend matching textbook colours */}
                  <div className="mt-4 flex items-center gap-4 text-[11px] font-sans font-bold text-slate-500 uppercase tracking-wider flex-wrap justify-center">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm bg-blue-600 inline-block" />
                      1. Részletszorzat (a szám alá)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm bg-rose-600 inline-block" />
                      2. Részletszorzat (1-gyel jobbra tolva)
                    </span>
                  </div>
                </div>

                {/* Right: Step-by-Step Explanation */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-amber-300/80 dark:border-amber-900/60 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        Lépés {safeStep + 1} / {totalSteps}
                      </span>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        {currentCalc.steps[safeStep]?.focusDigits}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 font-medium leading-relaxed">
                      {currentCalc.steps[safeStep]?.description}
                    </p>

                    {currentCalc.steps[safeStep]?.subTotalText && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-xs font-mono font-bold text-amber-700 dark:text-amber-300 flex items-center justify-between">
                        <span>Aktuális érték:</span>
                        <span className="text-sm font-black text-amber-800 dark:text-amber-200">{currentCalc.steps[safeStep]?.subTotalText}</span>
                      </div>
                    )}
                  </div>

                  {/* Summary tip card */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 leading-relaxed flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>A magyar írásbeli szorzás elve:</strong> Az 1. részletszorzat pontosan a szorzandó száma alá kerül, míg a következő szorzók eredményeit mindig 1-1 helyiértékkel <em>jobbra tolva</em> írjuk le, a sor elé <strong>+</strong> jelet téve!
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MultiplicationTheory;
