import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Download,
  BookOpen,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  FileText,
  Calculator,
  Info,
  ArrowRightLeft,
  AlertCircle,
  Layers,
  Target,
  ArrowRight,
  RotateCcw,
  Zap,
  Minus,
  Equal,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportElementToPDF } from '@/utils/pdfExport';

interface SubtractionTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function SubtractionTheory({ onBack, onStartQuiz }: SubtractionTheoryProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Interactive Simulator State
  const [num1, setNum1] = useState<string>('7432');
  const [num2, setNum2] = useState<string>('2856');
  const [stepIndex, setStepIndex] = useState<number>(0);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await exportElementToPDF('subtraction-theory-content', 'Kivonas_Irasbeli_Kivonas_Tananyag');
    setIsDownloading(false);
  };

  // Helper for column subtraction steps using the Hungarian standard pótlási method
  const getSubtractionSteps = (val1Str: string, val2Str: string) => {
    const n1 = parseInt(val1Str, 10);
    const n2 = parseInt(val2Str, 10);
    if (isNaN(n1) || isNaN(n2) || n1 < 0 || n2 < 0 || n1 > 9999999 || n2 > 9999999) {
      return null;
    }
    if (n1 < n2) {
      return { error: 'A kisebbítendőnek legalább akkorának kell lennie, mint a kivonandó!' };
    }

    const s1 = n1.toString();
    const s2 = n2.toString();
    const maxLen = Math.max(s1.length, s2.length);

    const pad1 = s1.padStart(maxLen, '0');
    const pad2 = s2.padStart(maxLen, '0');

    let carry = 0;
    const steps = [];
    const diffDigits = [];
    const carries = [0];

    // Step by step from right to left
    for (let i = maxLen - 1; i >= 0; i--) {
      const topDigit = parseInt(pad1[i], 10);
      const bottomDigit = parseInt(pad2[i], 10);
      const effectiveBottom = bottomDigit + carry;

      let resultDigit = 0;
      let nextCarry = 0;
      let explanation = '';

      if (topDigit >= effectiveBottom) {
        resultDigit = topDigit - effectiveBottom;
        nextCarry = 0;
        explanation = carry > 0
          ? `${bottomDigit} + ${carry} (maradék) = ${effectiveBottom}. ${effectiveBottom}-hoz hogy ${topDigit} legyen, kell adni ${resultDigit}-t. Maradék: 0.`
          : `${bottomDigit}-hoz hogy ${topDigit} legyen, kell adni ${resultDigit}-t. Maradék: 0.`;
      } else {
        const borrowedTop = topDigit + 10;
        resultDigit = borrowedTop - effectiveBottom;
        nextCarry = 1;
        explanation = carry > 0
          ? `${bottomDigit} + ${carry} (maradék) = ${effectiveBottom}. ${effectiveBottom}-hoz hogy ${borrowedTop} legyen, kell adni ${resultDigit}-t. Leírjuk a(z) ${resultDigit}-t, maradt az 1.`
          : `${bottomDigit}-hoz hogy ${borrowedTop} legyen, kell adni ${resultDigit}-t. Leírjuk a(z) ${resultDigit}-t, maradt az 1.`;
      }

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
        topDigit,
        bottomDigit,
        prevCarry: carry,
        effectiveBottom,
        resultDigit,
        nextCarry,
        explanation
      });

      diffDigits.unshift(resultDigit);
      carry = nextCarry;
      carries.push(carry);
    }

    const exactDiff = n1 - n2;
    const est1 = Math.round(n1 / Math.pow(10, s1.length - 1)) * Math.pow(10, s1.length - 1);
    const est2 = Math.round(n2 / Math.pow(10, s2.length - 1)) * Math.pow(10, s2.length - 1);
    const estDiff = est1 - est2;

    return {
      n1,
      n2,
      pad1,
      pad2,
      maxLen,
      steps,
      diffDigits,
      carries,
      exactDiff,
      est1,
      est2,
      estDiff,
      error: null
    };
  };

  const currentCalc = getSubtractionSteps(num1, num2);
  const totalSteps = currentCalc && !currentCalc.error ? currentCalc.steps.length : 0;
  const safeStep = Math.min(stepIndex, totalSteps);

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
              className="rounded-xl h-9 px-3 border-rose-300 bg-rose-50/60 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800 hover:bg-rose-100 text-xs sm:text-sm font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-rose-600" />
              Gyakorló Kvíz indítása
            </Button>
          )}

          <Button
            size="sm"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="rounded-xl h-9 px-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-rose-600 dark:hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            {isDownloading ? 'Letöltés...' : 'Tananyag letöltése (PDF)'}
          </Button>
        </div>
      </div>

      {/* Main Printable Theory Container */}
      <div
        id="subtraction-theory-content"
        className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 p-5 sm:p-8 shadow-sm space-y-8"
      >
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 mb-2 border border-rose-200 dark:border-rose-800">
              <span>➖ 5. Osztály • I. Az egész számok</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Kivonás, írásbeli kivonás
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Fogalmak, tagok elnevezése, pótlási elv, ellenőrzés és írásbeli kivonás
            </p>
          </div>

          <div className="p-3 bg-rose-50 dark:bg-slate-800/80 rounded-2xl border border-rose-200/60 dark:border-slate-700 text-center shrink-0">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Művelet</div>
            <div className="text-xl font-black text-rose-700 dark:text-rose-300 font-mono">a - b = c</div>
            <div className="text-[10px] text-slate-400">különbségképzés</div>
          </div>
        </div>

        {/* Section 1: Definition and parts */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 flex items-center justify-center font-serif text-sm font-black">
              1.
            </div>
            <h2>A kivonás fogalma és a művelet tagjai</h2>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2 bg-slate-50/70 dark:bg-slate-850/50 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800">
            <p>
              A <strong>kivonás</strong> az összeadás megfordított (inverz) művelete. Segítségével meghatározzuk két mennyiség különbségét, vagy hogy mennyivel kell kiegészíteni egy számot egy másik számhoz.
            </p>
          </div>

          {/* Subtraction Parts Visual Formula Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/60 dark:bg-slate-850/60 border border-rose-200/70 dark:border-slate-800">
            <div className="text-center mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">
                A kivonás tagjainak elnevezése
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-center">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-slate-700 shadow-xs min-w-[120px]">
                <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400">850</div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">Kisebbítendő</div>
                <div className="text-[10px] text-slate-400">(amiből elveszünk)</div>
              </div>

              <div className="text-xl font-black text-rose-500">
                <Minus className="w-5 h-5 inline" />
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-slate-700 shadow-xs min-w-[120px]">
                <div className="text-xl sm:text-2xl font-black text-pink-600 dark:text-pink-400">320</div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">Kivonandó</div>
                <div className="text-[10px] text-slate-400">(amennyit elveszünk)</div>
              </div>

              <div className="text-xl font-black text-rose-500">
                <Equal className="w-5 h-5 inline" />
              </div>

              <div className="p-3 rounded-xl bg-rose-600 text-white shadow-xs min-w-[120px]">
                <div className="text-xl sm:text-2xl font-black">530</div>
                <div className="text-xs font-bold text-rose-100 mt-0.5">Különbség</div>
                <div className="text-[10px] text-rose-200">(az eredmény)</div>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                NEM Felcserélhető és NEM Csoportosítható!
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A tagok sorrendje nem cserélhető fel: <br />
                <span className="font-mono font-bold text-amber-900 dark:text-amber-200">100 - 30 = 70</span>, de{' '}
                <span className="font-mono font-bold text-red-600 dark:text-red-400">30 - 100 ≠ 70</span>!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-bold text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                A 0 Szerepe a Kivonásban
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                • 0-t kivonva a szám változatlan marad: <span className="font-mono font-bold">a - 0 = a</span> (pl. $45 - 0 = 45$).<br />
                • Önmagából kivonva 0-t kapunk: <span className="font-mono font-bold">a - a = 0</span> (pl. $78 - 78 = 0$).
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Checking and missing terms */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 flex items-center justify-center font-serif text-sm font-black">
              2.
            </div>
            <h2>A kivonás ellenőrzése és hiányos műveletek</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-850/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                A Kivonás Ellenőrzése (Próba)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha a különbséghez hozzáadjuk a kivonandót, megkapjuk a kisebbítendőt:
              </p>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-slate-700 font-mono text-center font-bold text-xs text-rose-700 dark:text-rose-300">
                Különbség + Kivonandó = Kisebbítendő
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-slate-900/60 p-2 rounded-lg">
                <strong>Példa:</strong> $640 - 180 = 460$ ➔ <strong>Próba:</strong> $460 + 180 = 640$ ✓
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-850/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-bold text-sm">
                <ArrowRightLeft className="w-4 h-4" />
                Hiányos Műveletek Kiszámítása
              </div>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-purple-800 dark:text-purple-300">1. Ha a kisebbítendő hiányzik:</span><br />
                  <span className="font-mono">🔲 - 350 = 420 ➔ 🔲 = 420 + 350 = <strong>770</strong></span>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-purple-800 dark:text-purple-300">2. Ha a kivonandó hiányzik:</span><br />
                  <span className="font-mono">800 - 🔲 = 260 ➔ 🔲 = 800 - 260 = <strong>540</strong></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Mental math tricks */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 flex items-center justify-center font-serif text-sm font-black">
              3.
            </div>
            <h2>Fejszámolási technikák és villámtrükkök</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-850/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-300 font-bold text-xs sm:text-sm">
                <Zap className="w-3.5 h-3.5" />
                1. Kerekítés & Korrekció
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Közeli kerek számnál vonj le kerek értéket, majd add vissza a többletet!
              </p>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[11px] text-rose-700 dark:text-rose-300">
                $452 - 98 = 452 - 100 + 2 = \mathbf{354}$
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-850/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-bold text-xs sm:text-sm">
                <Scale className="w-3.5 h-3.5" />
                2. Állandó Különbség
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Mindkét taghoz ugyanazt hozzáadva a különbség nem változik!
              </p>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[11px] text-amber-700 dark:text-amber-300">
                $543 - 197 = 546 - 200 = \mathbf{346}$
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-850/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-300 font-bold text-xs sm:text-sm">
                <Layers className="w-3.5 h-3.5" />
                3. Lépcsőzetes Levonás
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Bontsd a kivonandót helyiértékekre és vond le őket sorban!
              </p>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[11px] text-blue-700 dark:text-blue-300">
                $685 - 243 = 485 - 40 - 3 = \mathbf{442}$
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Rules of Column Subtraction (Pótlási elv) */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 flex items-center justify-center font-serif text-sm font-black">
              4.
            </div>
            <h2>Az írásbeli kivonás lépései (A pótlási elv)</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-850/50 border border-slate-200/70 dark:border-slate-800 text-center space-y-1">
              <div className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center mx-auto text-xs">1</div>
              <div className="font-bold text-xs text-slate-800 dark:text-slate-200">Helyiértékek</div>
              <p className="text-[11px] text-slate-500">Egyes az egyes alá, tízes a tízes alá.</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-850/50 border border-slate-200/70 dark:border-slate-800 text-center space-y-1">
              <div className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center mx-auto text-xs">2</div>
              <div className="font-bold text-xs text-slate-800 dark:text-slate-200">Jobbról balra</div>
              <p className="text-[11px] text-slate-500">Mindig az egyeseknél kezdjük a pótlást.</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-850/50 border border-slate-200/70 dark:border-slate-800 text-center space-y-1">
              <div className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center mx-auto text-xs">3</div>
              <div className="font-bold text-xs text-slate-800 dark:text-slate-200">Tízesátlépés</div>
              <p className="text-[11px] text-slate-500">Felsőhöz +10, köv. alsóhoz +1 maradék.</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-850/50 border border-slate-200/70 dark:border-slate-800 text-center space-y-1">
              <div className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center mx-auto text-xs">4</div>
              <div className="font-bold text-xs text-slate-800 dark:text-slate-200">Becslés & Próba</div>
              <p className="text-[11px] text-slate-500">Kerekítéses becslés és összeadásos próba.</p>
            </div>
          </div>
        </section>

        {/* Section 5: Interactive Simulator */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 flex items-center justify-center font-serif text-sm font-black">
              5.
            </div>
            <h2>Interaktív Kockáslap Szimulátor</h2>
          </div>

          <div className="p-4 sm:p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-850/50 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-bold">Mintapéldák:</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7.5 px-2.5 rounded-lg border-slate-200 dark:border-slate-700"
                  onClick={() => {
                    setNum1('7432');
                    setNum2('2856');
                    setStepIndex(0);
                  }}
                >
                  7432 - 2856
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7.5 px-2.5 rounded-lg border-slate-200 dark:border-slate-700"
                  onClick={() => {
                    setNum1('5000');
                    setNum2('1347');
                    setStepIndex(0);
                  }}
                >
                  5000 - 1347 (Nullás)
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7.5 px-2.5 rounded-lg border-slate-200 dark:border-slate-700"
                  onClick={() => {
                    setNum1('84752');
                    setNum2('36819');
                    setStepIndex(0);
                  }}
                >
                  5 jegyű
                </Button>
              </div>

              {currentCalc && !currentCalc.error && (
                <div className="text-xs font-medium text-slate-500">
                  Becslés: <strong className="font-mono text-slate-800 dark:text-slate-200">{currentCalc.est1.toLocaleString('hu-HU')} - {currentCalc.est2.toLocaleString('hu-HU')} ≈ {currentCalc.estDiff.toLocaleString('hu-HU')}</strong>
                </div>
              )}
            </div>

            {/* Input fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1">Kisebbítendő (felső szám):</label>
                <input
                  type="number"
                  value={num1}
                  onChange={(e) => {
                    setNum1(e.target.value);
                    setStepIndex(0);
                  }}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-base font-bold text-rose-600 dark:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1">Kivonandó (alsó szám):</label>
                <input
                  type="number"
                  value={num2}
                  onChange={(e) => {
                    setNum2(e.target.value);
                    setStepIndex(0);
                  }}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-base font-bold text-pink-600 dark:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            {currentCalc?.error && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {currentCalc.error}
              </div>
            )}

            {/* Interactive Grid Board */}
            {currentCalc && !currentCalc.error && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                  <div className="inline-block font-mono text-xl sm:text-2xl font-black tracking-widest text-right select-none">
                    
                    {/* Top Row */}
                    <div className="flex justify-end gap-1.5 sm:gap-2 py-0.5">
                      <span className="w-5 sm:w-6 text-transparent select-none"> </span>
                      {currentCalc.pad1.split('').map((digit, idx) => {
                        const colFromRight = currentCalc.maxLen - 1 - idx;
                        const isCurrentActiveCol = safeStep > 0 && safeStep <= totalSteps && currentCalc.steps[safeStep - 1]?.colIndex === colFromRight;
                        return (
                          <span
                            key={`d1-${idx}`}
                            className={cn(
                              "w-6 sm:w-8 h-8 sm:h-9 flex items-center justify-center rounded-lg transition-all",
                              isCurrentActiveCol
                                ? "bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 ring-2 ring-rose-500"
                                : "text-slate-800 dark:text-slate-100"
                            )}
                          >
                            {digit}
                          </span>
                        );
                      })}
                    </div>

                    {/* Bottom Row */}
                    <div className="flex justify-end gap-1.5 sm:gap-2 py-0.5">
                      <span className="w-5 sm:w-6 text-rose-500 flex items-center justify-center font-bold">-</span>
                      {currentCalc.pad2.split('').map((digit, idx) => {
                        const colFromRight = currentCalc.maxLen - 1 - idx;
                        const isCurrentActiveCol = safeStep > 0 && safeStep <= totalSteps && currentCalc.steps[safeStep - 1]?.colIndex === colFromRight;
                        return (
                          <span
                            key={`d2-${idx}`}
                            className={cn(
                              "w-6 sm:w-8 h-8 sm:h-9 flex items-center justify-center rounded-lg transition-all",
                              isCurrentActiveCol
                                ? "bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 ring-2 ring-pink-500"
                                : "text-slate-700 dark:text-slate-200"
                            )}
                          >
                            {digit}
                          </span>
                        );
                      })}
                    </div>

                    {/* Divider Line */}
                    <div className="h-0.5 bg-slate-800 dark:bg-slate-200 my-1 rounded-full w-full" />

                    {/* Result Row */}
                    <div className="flex justify-end gap-1.5 sm:gap-2 py-0.5">
                      <span className="w-5 sm:w-6 text-transparent select-none"> </span>
                      {currentCalc.pad1.split('').map((_, idx) => {
                        const colFromRight = currentCalc.maxLen - 1 - idx;
                        const isComputed = safeStep > 0 && currentCalc.steps.some(s => s.colIndex === colFromRight && currentCalc.steps.indexOf(s) < safeStep);
                        const digitVal = currentCalc.diffDigits[idx];

                        return (
                          <span
                            key={`res-${idx}`}
                            className={cn(
                              "w-6 sm:w-8 h-8 sm:h-9 flex items-center justify-center rounded-lg font-black transition-all",
                              isComputed
                                ? "bg-rose-600 text-white shadow-xs"
                                : "text-transparent bg-slate-100/50 dark:bg-slate-800/40"
                            )}
                          >
                            {isComputed ? digitVal : '•'}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step Explanation Text */}
                  <div className="mt-4 w-full max-w-md p-3 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-center">
                    {safeStep === 0 ? (
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        Kattints a <strong>„Következő lépés”</strong> gombra a levezetéshez!
                      </p>
                    ) : safeStep <= totalSteps ? (
                      <div className="space-y-0.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                          {currentCalc.steps[safeStep - 1]?.colIndex + 1}. Lépés ({currentCalc.steps[safeStep - 1]?.placeName} oszlopa)
                        </div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                          {currentCalc.steps[safeStep - 1]?.explanation}
                        </p>
                      </div>
                    ) : (
                      <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Számítás befejezve! Pontos különbség: {currentCalc.exactDiff.toLocaleString('hu-HU')}
                      </div>
                    )}
                  </div>
                </div>

                {/* Step controls */}
                <div className="flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={safeStep === 0}
                    onClick={() => setStepIndex(Math.max(0, safeStep - 1))}
                    className="h-8 text-xs rounded-xl"
                  >
                    Előző lépés
                  </Button>
                  <span className="text-xs font-mono font-bold px-2 text-slate-500">
                    {safeStep} / {totalSteps}
                  </span>
                  <Button
                    size="sm"
                    disabled={safeStep === totalSteps}
                    onClick={() => setStepIndex(Math.min(totalSteps, safeStep + 1))}
                    className="h-8 text-xs bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl"
                  >
                    Következő lépés
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setStepIndex(0)}
                    className="h-8 text-xs text-slate-400"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
