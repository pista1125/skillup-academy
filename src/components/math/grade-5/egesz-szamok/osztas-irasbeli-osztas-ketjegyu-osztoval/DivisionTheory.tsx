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
  X,
  AlertTriangle,
  ArrowDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportElementToPDF } from '@/utils/pdfExport';

interface DivisionTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

interface StepDetail {
  stepNumber: number;
  stageType: 'init' | 'select' | 'quotient_digit' | 'remainder' | 'bring_down' | 'finish';
  title: string;
  thoughtProcess: string;
  multiplicationCheck: string;
  revealedQuotientCount: number;
  highlightedDividendIndices: number[];
  revealedRowIndex: number;
  broughtDownIndex?: number;
}

export function DivisionTheory({ onBack, onStartQuiz }: DivisionTheoryProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Interactive Simulator State
  const [dividendStr, setDividendStr] = useState<string>('842');
  const [divisorStr, setDivisorStr] = useState<string>('26');
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [methodType, setMethodType] = useState<'tensFirst' | 'traditional'>('tensFirst');

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await exportElementToPDF('division-theory-content', 'Osztas_Irasbeli_Osztas_Tananyag');
    setIsDownloading(false);
  };

  // Step generator for Hungarian written division with exact grid coordinates
  const computeDivisionData = (divStr: string, dvrStr: string) => {
    const dividend = parseInt(divStr.replace(/\s+/g, ''), 10);
    const divisor = parseInt(dvrStr.replace(/\s+/g, ''), 10);

    if (isNaN(dividend) || isNaN(divisor) || dividend < 0 || divisor <= 0 || dividend > 999999 || divisor > 999) {
      return {
        error: 'Kérlek adj meg érvényes számokat (osztandó legfeljebb 6 jegyű, osztó pozitív legfeljebb 3 jegyű)!',
        steps: [],
        dividendDigits: [],
        divisor: 0,
        quotientDigits: [],
        quotientLength: 0,
        gridRows: [],
        estimationStr: '',
        product: 0,
        finalQuotient: 0,
        finalRemainder: 0
      };
    }

    const dividendDigits = dividend.toString().split('').map(Number);
    const N = dividendDigits.length;

    // Find first prefix >= divisor
    let prefix = 0;
    let ptr = 0;
    while (ptr < N && prefix < divisor) {
      prefix = prefix * 10 + dividendDigits[ptr];
      ptr++;
    }

    // Number of quotient digits
    const quotientLength = N - ptr + 1;
    const finalQuotient = Math.floor(dividend / divisor);
    const finalRemainder = dividend % divisor;
    const quotientDigits = finalQuotient.toString().split('').map(Number);

    // Estimation (B:)
    const estDiv = Math.round(dividend / Math.pow(10, N - 1)) * Math.pow(10, N - 1);
    const estDvr = Math.round(divisor / Math.pow(10, divisor.toString().length - 1)) * Math.pow(10, divisor.toString().length - 1);
    const estQuot = Math.round(estDiv / (estDvr || 1));
    const estimationStr = `B: ${estDiv.toLocaleString('hu-HU')} : ${estDvr} ≈ ${estQuot.toLocaleString('hu-HU')}`;

    // Structure of grid rows
    interface GridStepRow {
      stageIndex: number;
      colEnd: number;
      currentPortion: number;
      qDigit: number;
      multipliedVal: number;
      remVal: number;
      remDigits: number[];
      remColStart: number;
      broughtDownDigit?: number;
      broughtDownCol?: number;
    }

    const gridRows: GridStepRow[] = [];
    const steps: StepDetail[] = [];

    // Step 0: Initial Setup & Estimation
    steps.push({
      stepNumber: 1,
      stageType: 'init',
      title: 'Felírás és Becslés (B:)',
      thoughtProcess: `Felírjuk az osztást a füzetbe: ${dividend.toLocaleString('hu-HU')} : ${divisor}. Először becslést végzünk: ${estimationStr}. A hányados helyére kitesszük a pontokat (${'. '.repeat(quotientLength).trim()}), mert ${quotientLength} jegyű lesz a hányados.`,
      multiplicationCheck: `Várható hányados: kb. ${estQuot}, ${quotientLength} számjegyű`,
      revealedQuotientCount: 0,
      highlightedDividendIndices: Array.from({ length: ptr }, (_, i) => i),
      revealedRowIndex: -1
    });

    let currentPortion = prefix;
    let currentPtr = ptr - 1; // last index of current portion in dividendDigits
    let stageCounter = 0;

    while (currentPtr < N) {
      const qDigit = Math.floor(currentPortion / divisor);
      const multVal = qDigit * divisor;
      const rem = currentPortion - multVal;
      const remDigits = rem.toString().split('').map(Number);
      const remColStart = currentPtr - remDigits.length + 1;

      const divisorTens = Math.floor(divisor / 10) * 10;
      const divisorUnits = divisor % 10;

      // Explanation for tens-first vs traditional
      const tensMultText =
        divisor >= 10
          ? `${qDigit} · ${divisorTens} = ${qDigit * divisorTens}, ${qDigit} · ${divisorUnits} = ${qDigit * divisorUnits} ➔ ${qDigit * divisorTens} + ${qDigit * divisorUnits} = ${multVal}`
          : `${qDigit} · ${divisor} = ${multVal}`;

      const selectedDigitsText = dividendDigits.slice(0, currentPtr + 1).join('');

      // Step: Determine quotient digit
      steps.push({
        stepNumber: steps.length + 1,
        stageType: 'quotient_digit',
        title: `Hányados ${stageCounter + 1}. jegye: ${qDigit}`,
        thoughtProcess:
          stageCounter === 0
            ? `Kijelöljük az első részt: ${currentPortion}. Megkérdezzük: ${currentPortion}-ban a ${divisor} hányszor van meg? Kerekítve becsülünk: megvan ${qDigit}-szor. Beírjuk a ${qDigit}-t a hányados ${stageCounter + 1}. helyére.`
            : `${currentPortion}-ben a ${divisor} megvan ${qDigit}-szor. Beírjuk a ${qDigit}-t a következő helyiértékre.`,
        multiplicationCheck: `Becslés: ${currentPortion} : ${divisor} ≈ ${qDigit}`,
        revealedQuotientCount: stageCounter + 1,
        highlightedDividendIndices: [currentPtr],
        revealedRowIndex: stageCounter
      });

      // Step: Visszaszorzás és maradék leírása
      steps.push({
        stepNumber: steps.length + 1,
        stageType: 'remainder',
        title: `Visszaszorzás és maradék: ${rem}`,
        thoughtProcess: `Visszaszorzunk: ${tensMultText}. Kivonjuk a kijelölt számból: ${currentPortion} - ${multVal} = ${rem}. A(z) ${rem} maradékot pontosan a vizsgált szám utolsó jegye alá írjuk le (maradék < osztó ✓).`,
        multiplicationCheck: `${currentPortion} - ${multVal} = ${rem} (maradék)`,
        revealedQuotientCount: stageCounter + 1,
        highlightedDividendIndices: [currentPtr],
        revealedRowIndex: stageCounter
      });

      const rowObj: GridStepRow = {
        stageIndex: stageCounter,
        colEnd: currentPtr,
        currentPortion,
        qDigit,
        multipliedVal: multVal,
        remVal: rem,
        remDigits,
        remColStart
      };

      // If there is a next digit in dividend, bring it down
      if (currentPtr + 1 < N) {
        const nextDigit = dividendDigits[currentPtr + 1];
        rowObj.broughtDownDigit = nextDigit;
        rowObj.broughtDownCol = currentPtr + 1;

        const nextPortion = rem * 10 + nextDigit;

        steps.push({
          stepNumber: steps.length + 1,
          stageType: 'bring_down',
          title: `Következő számjegy lehozása: ${nextDigit}`,
          thoughtProcess: `Lehozzuk a következő számjegyet (${nextDigit}) a maradék (${rem}) mellé. Így az új osztandó rész a(z) ${nextPortion} lesz.`,
          multiplicationCheck: `Új vizsgált szám: ${nextPortion}`,
          revealedQuotientCount: stageCounter + 1,
          highlightedDividendIndices: [currentPtr + 1],
          revealedRowIndex: stageCounter,
          broughtDownIndex: currentPtr + 1
        });

        currentPortion = nextPortion;
      }

      gridRows.push(rowObj);
      currentPtr++;
      stageCounter++;
    }

    // Final finish step
    steps.push({
      stepNumber: steps.length + 1,
      stageType: 'finish',
      title: 'Osztás befejezve & Ellenőrzés (Ell:)',
      thoughtProcess: `Nincs több lehozható számjegy. A pontos hányados ${finalQuotient.toLocaleString('hu-HU')}${finalRemainder > 0 ? `, a végső maradék pedig ${finalRemainder}` : ''}. Jobb oldalon elvégezzük az írásbeli szorzásos ellenőrzést!`,
      multiplicationCheck: `Ellenőrzés: ${divisor} · ${finalQuotient} + ${finalRemainder} = ${dividend.toLocaleString('hu-HU')}`,
      revealedQuotientCount: quotientDigits.length,
      highlightedDividendIndices: [],
      revealedRowIndex: gridRows.length - 1
    });

    return {
      error: null,
      steps,
      dividendDigits,
      divisor,
      quotientDigits,
      quotientLength,
      gridRows,
      estimationStr,
      product: divisor * finalQuotient,
      finalQuotient,
      finalRemainder
    };
  };

  const currentCalc = computeDivisionData(dividendStr, divisorStr);
  const totalSteps = currentCalc && !currentCalc.error ? currentCalc.steps.length : 0;
  const safeStep = Math.min(stepIndex, Math.max(0, totalSteps - 1));
  const activeStepData = currentCalc?.steps?.[safeStep];

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
              size="sm"
              onClick={onStartQuiz}
              className="rounded-xl h-9 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-xs sm:text-sm shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 mr-1.5 text-amber-300 fill-amber-300" />
              Kvíz indítása
            </Button>
          )}

          <Button
            size="sm"
            variant="outline"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="rounded-xl h-9 px-3 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-indigo-600 dark:text-indigo-400" />
            {isDownloading ? 'Generálás...' : 'Letöltés PDF-ben'}
          </Button>
        </div>
      </div>

      {/* Main Educational Content */}
      <div id="division-theory-content" className="space-y-6">
        {/* Title Header */}
        <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent border border-indigo-200 dark:border-indigo-900/60 relative overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-800 dark:text-indigo-300 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-300 dark:border-indigo-800">
              5. Osztály • I. Az egész számok
            </span>
            <span>• 11. Altéma</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Osztás, írásbeli osztás kétjegyű osztóval
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Az írásbeli osztás lépései kétjegyű osztóval a magyar általános iskolai módszertan szerint: becslés kerekítéssel, a hányados helyiértékeinek bepontozása, kijelölés felülről, visszaszorzás a tízesekkel/egyesekkel, maradékképzés a szám alá, lehozás a maradék mellé, és írásbeli ellenőrzés.
          </p>
        </div>

        {/* Section 1: Az osztás fogalma és tagjai */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-bold text-sm">
              1.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Az osztás fogalma, tagjai és a 0 szabályai
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs sm:text-sm">
                <Calculator className="w-4 h-4" />
                <span>Az osztás tagjai</span>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/40 text-center font-mono text-xs">
                <span className="text-indigo-700 dark:text-indigo-300 font-bold">Osztandó</span> : <span className="text-amber-700 dark:text-amber-300 font-bold">Osztó</span> = <span className="text-emerald-700 dark:text-emerald-300 font-bold">Hányados</span>
                <div className="text-[11px] text-slate-500 mt-1">72 : 8 = 9</div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Az <strong>osztandó</strong> a szétosztandó mennyiség, az <strong>osztó</strong> az egyenlő részek száma, az eredmény pedig a <strong>hányados</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Nullával való osztás tilalma</span>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40 text-center font-mono text-xs font-bold text-rose-700 dark:text-rose-300">
                a : 0 = ÉRTELMETLEN!
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Nullával osztani szigorúan tilos és értelmetlen</strong>, mert nincs olyan szám, amit 0-val szorozva nullától eltérő számot kapnánk!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Nulla osztása számmal</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40 text-center font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300">
                0 : a = 0 (ha a ≠ 0)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Ha nullát osztunk el bármilyen nullától különböző számmal, a hányados mindig <strong>0</strong> lesz (pl. 0 : 7 = 0).
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Maradékos osztás alaptétele és ellenőrzése */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-bold text-sm">
              2.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              A maradékos osztás alaptétele és ellenőrzése
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-2.5">
              <div className="font-bold text-xs sm:text-sm text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>A maradék alapszabálya</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Ha egy számot nem tudunk pontosan elosztani, <strong>maradék</strong> keletkezik. A legfontosabb iskolai alapszabály:
              </p>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/50 text-center font-mono text-xs font-bold text-indigo-800 dark:text-indigo-300">
                0 ≤ Maradék &lt; Osztó
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A maradék mindig <strong>kisebb</strong> kell, hogy legyen az osztónál! Ha a maradék elérné vagy meghaladná az osztót, akkor a hányadosba még legalább 1-gyel többet írhattunk volna.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Az osztás ellenőrzésének képlete</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Az osztás helyességét mindig visszaszorzással és a maradék hozzáadásával ellenőrizzük:
              </p>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-center space-y-1">
                <div className="font-bold text-indigo-700 dark:text-indigo-300">
                  Osztandó = Osztó · Hányados + Maradék
                </div>
                <div className="text-[11px] text-slate-500">
                  Példa: 842 : 26 = 32 (maradék: 10) ➔ 26 · 32 + 10 = 832 + 10 = 842 ✓
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Osztás 10-zel, 100-zal, 1000-rel és kerek számokkal */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-bold text-sm">
              3.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Osztás 10-zel, 100-zal, 1000-rel és nullák elhagyása
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-2.5">
              <div className="font-bold text-xs sm:text-sm text-amber-900 dark:text-amber-200">
                🚀 Helyiértékes eltolás és nullák elhagyása
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Amikor egy nullákra végződő egész számot 10-zel, 100-zal, vagy 1000-rel osztunk, a végéről elhagyunk 1, 2, illetve 3 nullát:
              </p>
              <div className="grid grid-cols-3 gap-2 font-mono text-center text-xs">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/50">
                  <div className="text-slate-400 text-[10px]">: 10 (1 nulla le)</div>
                  <div className="font-bold text-indigo-700 dark:text-indigo-300">540 : 10 = 54</div>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/50">
                  <div className="text-slate-400 text-[10px]">: 100 (2 nulla le)</div>
                  <div className="font-bold text-indigo-700 dark:text-indigo-300">5400 : 100 = 54</div>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/50">
                  <div className="text-slate-400 text-[10px]">: 1000 (3 nulla le)</div>
                  <div className="font-bold text-indigo-700 dark:text-indigo-300">54k : 1k = 54</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                💡 Trükk: Azonos számú nulla elhagyása mindkét tagból
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Ha az osztandó és az osztó is nullákra végződik, a hányados nem változik, ha mindkét tag végéről ugyanannyi nullát elhagyunk:
              </p>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-center space-y-1">
                <div>
                  <span className="text-indigo-700 dark:text-indigo-300 font-bold">2 400 : 60</span> = 240 : 6 = <span className="font-black text-emerald-600 dark:text-emerald-400">40</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  48 000 : 800 = 480 : 8 = 60
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: A magyar iskolai írásbeli osztás lépései */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-bold text-sm">
              4.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Az írásbeli osztás lépései kétjegyű osztóval (OFI módszertan)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>1. Becslés, pontozás és kijelölés</span>
              </div>
              <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pl-4 list-decimal leading-relaxed">
                <li><strong>Becslés (B:):</strong> Kerekítéssel megbecsüljük a várható hányadost (pl. 840 : 30 = 28).</li>
                <li><strong>Pontozás:</strong> A hányados helyére kitesszük a pontokat (. .), hogy tudjuk, hány jegyű lesz az eredmény.</li>
                <li><strong>Kijelölés:</strong> Balról kijelöljük az osztandó legelső olyan részét (egy felső ívvel), amiben az osztó legalább egyszer megvan (pl. 84-et a 842-ből).</li>
              </ol>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs sm:text-sm">
                <Layers className="w-4 h-4" />
                <span>2. Visszaszorzás, maradék és lehozás</span>
              </div>
              <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pl-4 list-decimal leading-relaxed">
                <li><strong>Visszaszorzás:</strong> A hányadosjeggyel visszaszorzunk (először a tízesekkel, majd az egyesekkel: 3 · 20 = 60, 3 · 6 = 18 ➔ 78).</li>
                <li><strong>Maradék leírása:</strong> 84 - 78 = 6. A 6-os maradékot pontosan a 4-es oszlopa alá írjuk le!</li>
                <li><strong>Lehozás:</strong> A következő számjegyet (2) lehozzuk a maradék (6) MELLÉ ➔ 62. Megismételjük a lépéseket.</li>
                <li><strong>Ellenőrzés (Ell:):</strong> Jobb oldalon írásbeli szorzással ellenőrizzük az eredményt.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Section 5: Interaktív Lépésről-lépésre Írásbeli Osztás Szimulátor */}
        <section className="space-y-4 no-pdf">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-xs">
                5.
              </span>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Interaktív Magyar Írásbeli Osztás Szimulátor
                </h2>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Pontos négyzetrácsos füzetlap elrendezés becsléssel, felső kijelölő ívvel, lehozási nyíllal és írásbeli ellenőrzéssel
                </div>
              </div>
            </div>

            {/* Presets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-slate-400 mr-1">Példák:</span>
              {[
                { label: '842 : 26', a: '842', b: '26' },
                { label: '738 : 6', a: '738', b: '6' },
                { label: '945 : 35', a: '945', b: '35' },
                { label: '1 248 : 24', a: '1248', b: '24' },
                { label: '672 : 21', a: '672', b: '21' },
                { label: '1 386 : 42', a: '1386', b: '42' },
                { label: '5 429 : 37', a: '5429', b: '37' }
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDividendStr(preset.a);
                    setDivisorStr(preset.b);
                    setStepIndex(0);
                  }}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border cursor-pointer",
                    dividendStr === preset.a && divisorStr === preset.b
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50/70 via-indigo-50/30 to-slate-50 dark:from-slate-850 dark:to-slate-900 p-4 sm:p-6 rounded-3xl border-2 border-indigo-200/80 dark:border-slate-800 shadow-sm space-y-5">
            {/* Custom Input Controls & Visszaszorzási módszer választó */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-indigo-200/60 dark:border-slate-700">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-500">Osztandó:</span>
                  <input
                    type="number"
                    value={dividendStr}
                    onChange={(e) => {
                      setDividendStr(e.target.value);
                      setStepIndex(0);
                    }}
                    className="w-20 sm:w-28 h-9 px-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono font-bold text-center"
                    placeholder="pl. 842"
                  />
                </div>

                <span className="text-lg font-black text-slate-600 dark:text-slate-400">:</span>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-500">Osztó:</span>
                  <input
                    type="number"
                    value={divisorStr}
                    onChange={(e) => {
                      setDivisorStr(e.target.value);
                      setStepIndex(0);
                    }}
                    className="w-16 sm:w-20 h-9 px-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono font-bold text-center"
                    placeholder="pl. 26"
                  />
                </div>

                {/* Visszaszorzási módszer kapcsoló */}
                <div className="flex items-center gap-1 p-1 rounded-2xl bg-indigo-100/80 dark:bg-slate-800 border-2 border-indigo-300 dark:border-slate-700 shadow-xs">
                  <span className="text-xs font-black text-indigo-900 dark:text-indigo-200 px-2 flex items-center gap-1 select-none">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Módszer:
                  </span>
                  <button
                    type="button"
                    onClick={() => setMethodType('tensFirst')}
                    className={cn(
                      "px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer",
                      methodType === 'tensFirst'
                        ? "bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-700"
                        : "bg-white/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-white hover:text-slate-900"
                    )}
                    title="A szorzást a tízesekkel kezdjük (OFI munkafüzet 56. oldal)"
                  >
                    Tízesekkel kezdve (OFI)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethodType('traditional')}
                    className={cn(
                      "px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer",
                      methodType === 'traditional'
                        ? "bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-700"
                        : "bg-white/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-white hover:text-slate-900"
                    )}
                    title="Fejben visszaszorzás és kiegészítés"
                  >
                    Közvetlen maradékképzés
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
                  className="rounded-xl h-8 px-3 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Következő <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setStepIndex(totalSteps - 1)}
                  className="rounded-xl h-8 px-2 text-xs text-indigo-700 dark:text-indigo-300 font-bold"
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

            {/* Error state */}
            {currentCalc.error ? (
              <div className="p-4 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold">
                {currentCalc.error}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* Left: Hungarian Math Notebook Grid Display */}
                <div className="lg:col-span-7 flex flex-col p-4 sm:p-6 bg-sky-50/40 dark:bg-slate-900/90 rounded-2xl border-2 border-sky-300/70 dark:border-sky-900/60 shadow-inner overflow-x-auto">
                  {/* Becslés Fejléc (B:) a füzet bal felső sarkában */}
                  <div className="flex items-center justify-between pb-3 mb-2 border-b border-sky-200/80 dark:border-slate-800 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-black">
                        {currentCalc.estimationStr}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans font-bold">
                      Hányados: <strong>{currentCalc.quotientLength}</strong> számjegyű
                    </div>
                  </div>

                  {/* Hungarian Graph-paper Division Board */}
                  <div className="inline-block min-w-max space-y-1 font-mono select-none">
                    {/* Top Row: Dividend : Divisor = Quotient */}
                    <div className="flex items-center gap-1 pb-1.5 border-b-2 border-slate-900 dark:border-slate-100 relative">
                      {/* Dividend Digits with Top Arch (Kijelölő ív) */}
                      <div className="flex items-center relative">
                        {currentCalc.dividendDigits?.map((digit, dIdx) => {
                          const isHighlighted = activeStepData?.highlightedDividendIndices?.includes(dIdx);
                          const isBroughtDown = activeStepData?.broughtDownIndex === dIdx;

                          // Show top arch for initial selected portion
                          const isFirstSelected = dIdx === 0 && (activeStepData?.stageType === 'init' || activeStepData?.stageType === 'quotient_digit' || activeStepData?.stageType === 'remainder');

                          return (
                            <div key={dIdx} className="relative flex flex-col items-center">
                              {/* Top selection indicator arc */}
                              {isHighlighted && (
                                <div className="absolute -top-3.5 text-[10px] font-black text-indigo-600 dark:text-indigo-400 animate-pulse">
                                  ⌒
                                </div>
                              )}

                              <div
                                className={cn(
                                  "w-8 h-9 sm:w-10 sm:h-11 flex items-center justify-center font-bold text-xl sm:text-2xl border border-sky-200/80 dark:border-slate-800 bg-white dark:bg-slate-850 transition-all",
                                  isBroughtDown
                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 ring-2 ring-amber-400 scale-105 z-10 font-black"
                                    : isHighlighted
                                    ? "text-indigo-700 dark:text-indigo-300 font-black bg-indigo-100/70 dark:bg-indigo-950/60 ring-1 ring-indigo-400"
                                    : "text-slate-900 dark:text-white"
                                )}
                              >
                                {digit}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Division symbol ':' */}
                      <div className="w-8 h-9 sm:w-10 sm:h-11 flex items-center justify-center font-black text-2xl text-slate-800 dark:text-slate-200 border border-sky-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-850">
                        :
                      </div>

                      {/* Divisor */}
                      <div className="flex items-center">
                        {divisorStr.split('').map((char, cIdx) => (
                          <div
                            key={cIdx}
                            className="w-8 h-9 sm:w-10 sm:h-11 flex items-center justify-center font-bold text-xl sm:text-2xl border border-sky-200/80 dark:border-slate-800 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300"
                          >
                            {char}
                          </div>
                        ))}
                      </div>

                      {/* Equals '=' */}
                      <div className="w-8 h-9 sm:w-10 sm:h-11 flex items-center justify-center font-black text-2xl text-slate-800 dark:text-slate-200 border border-sky-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-850">
                        =
                      </div>

                      {/* Quotient with Dotted Placeholders */}
                      <div className="flex items-center bg-emerald-50/50 dark:bg-emerald-950/20 p-0.5 rounded-lg border border-emerald-200 dark:border-emerald-900/60">
                        {Array.from({ length: currentCalc.quotientLength }).map((_, qIdx) => {
                          const isRevealed = (activeStepData?.revealedQuotientCount || 0) > qIdx;
                          const qChar = currentCalc.quotientDigits?.[qIdx];

                          return (
                            <div
                              key={qIdx}
                              className={cn(
                                "w-8 h-9 sm:w-10 sm:h-11 flex items-center justify-center font-black text-xl sm:text-2xl border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-slate-850 transition-all",
                                isRevealed
                                  ? "text-emerald-700 dark:text-emerald-300 font-black"
                                  : "text-slate-400 dark:text-slate-500 text-sm"
                              )}
                            >
                              {isRevealed ? qChar : '•'}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step-by-Step Remainder Rows with Exact Hungarian Column Alignment */}
                    <div className="pt-2 space-y-1.5">
                      {currentCalc.gridRows?.map((row, rIdx) => {
                        const isVisible = (activeStepData?.revealedRowIndex ?? -1) >= rIdx;
                        if (!isVisible) return null;

                        const isCurrentActiveRow = activeStepData?.revealedRowIndex === rIdx;
                        const hasBroughtDown = row.broughtDownDigit !== undefined && activeStepData?.stageType === 'bring_down' && activeStepData?.revealedRowIndex === rIdx;
                        const isPastRowWithBroughtDown = row.broughtDownDigit !== undefined && (activeStepData?.revealedRowIndex ?? -1) > rIdx;

                        return (
                          <div
                            key={rIdx}
                            className={cn(
                              "flex items-center transition-all animate-in fade-in slide-in-from-top-1 duration-200",
                              isCurrentActiveRow && "bg-indigo-100/30 dark:bg-indigo-950/20 rounded-lg p-0.5"
                            )}
                          >
                            {/* Empty offset cells to align remainder right under its place value */}
                            {Array.from({ length: row.remColStart }).map((_, spIdx) => (
                              <div
                                key={spIdx}
                                className="w-8 h-8 sm:w-10 sm:h-10 border border-transparent"
                              />
                            ))}

                            {/* Remainder Digits */}
                            <div className="flex items-center">
                              {row.remDigits.map((char, chIdx) => (
                                <div
                                  key={chIdx}
                                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-black text-lg sm:text-xl border border-sky-200/80 dark:border-slate-800 bg-white dark:bg-slate-850 text-indigo-700 dark:text-indigo-300"
                                >
                                  {char}
                                </div>
                              ))}

                              {/* Brought down next digit next to remainder */}
                              {(hasBroughtDown || isPastRowWithBroughtDown) && (
                                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-black text-lg sm:text-xl border border-amber-300 dark:border-amber-700 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 animate-in zoom-in-50 duration-200 relative">
                                  {row.broughtDownDigit}
                                  {hasBroughtDown && (
                                    <div className="absolute -top-3 text-[10px] text-amber-600 dark:text-amber-400 font-black animate-bounce">
                                      ↓
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Final Result / Remainder Badge */}
                    {safeStep === totalSteps - 1 && (
                      <div className="mt-4 pt-2 border-t-2 border-emerald-500 text-center font-sans font-bold text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Hányados: <strong>{currentCalc.finalQuotient}</strong> {currentCalc.finalRemainder > 0 && <>(maradék: <strong className="text-amber-600">{currentCalc.finalRemainder}</strong>)</>}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Step Explanation Card & Written Multiplication Check (Ell:) */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Step Explanation Card */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-indigo-200 dark:border-slate-700 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-xs font-black uppercase tracking-wider">
                        {safeStep + 1}. Lépés: {activeStepData?.title}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {safeStep + 1} / {totalSteps}
                      </span>
                    </div>

                    {/* Szóbeli gondolatmenet ("Mit mondunk fejben?") */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        <span>Mit mondunk fejben? (Gondolatmenet):</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                        {activeStepData?.thoughtProcess}
                      </p>
                    </div>

                    {/* Műveleti ellenőrző sáv */}
                    <div className="p-2.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-xs font-mono font-bold text-indigo-900 dark:text-indigo-200">
                      {activeStepData?.multiplicationCheck}
                    </div>
                  </div>

                  {/* Ellenőrzés (Ell:) Doboz - Írásbeli szorzásos levezetés a füzetben */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/60 to-white dark:from-slate-850 dark:to-slate-900 border border-emerald-200 dark:border-slate-700 shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Írásbeli Ellenőrzés (Ell:):</span>
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        {safeStep === totalSteps - 1 ? 'Kész ✓' : 'Folyamatban...'}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-900/60 font-mono text-xs text-center space-y-1">
                      <div className="text-slate-700 dark:text-slate-300">
                        {currentCalc.finalQuotient} · {divisorStr} = {currentCalc.product}
                      </div>
                      {currentCalc.finalRemainder > 0 && (
                        <div className="text-amber-700 dark:text-amber-400 font-bold">
                          + {currentCalc.finalRemainder} (maradék) = {dividendStr}
                        </div>
                      )}
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-black pt-1 border-t border-slate-200 dark:border-slate-800">
                        {currentCalc.product + currentCalc.finalRemainder} = {dividendStr} ✓
                      </div>
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
