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
  Binary,
  Cpu,
  Clock,
  Check,
  RotateCcw,
  Sliders
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportElementToPDF } from '@/utils/pdfExport';

interface NumberSystemsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function NumberSystemsTheory({ onBack, onStartQuiz }: NumberSystemsTheoryProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Interactive Bit Switcher State (8 bits: 128, 64, 32, 16, 8, 4, 2, 1)
  const [bits, setBits] = useState<number[]>([0, 0, 0, 0, 1, 1, 0, 1]); // default: 13 (8+4+1)

  // Two-way converter state
  const [inputDecimal, setInputDecimal] = useState<string>('42');
  const [inputBinary, setInputBinary] = useState<string>('101010');

  const bitValues = [128, 64, 32, 16, 8, 4, 2, 1];

  const handleToggleBit = (index: number) => {
    const newBits = [...bits];
    newBits[index] = newBits[index] === 1 ? 0 : 1;
    setBits(newBits);
  };

  const calculatedDecimalFromBits = bits.reduce(
    (acc, bit, idx) => acc + bit * bitValues[idx],
    0
  );

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await exportElementToPDF('number-systems-theory-content', 'Szamrendszerek_Tananyag');
    setIsDownloading(false);
  };

  // Convert decimal to binary with division steps
  const getDecimalToBinarySteps = (numStr: string) => {
    const num = parseInt(numStr, 10);
    if (isNaN(num) || num < 0 || num > 1024) return null;
    if (num === 0) {
      return {
        binary: '0',
        steps: [{ quotient: 0, remainder: 0 }]
      };
    }

    let temp = num;
    const steps = [];
    while (temp > 0) {
      const remainder = temp % 2;
      const nextQuotient = Math.floor(temp / 2);
      steps.push({ current: temp, quotient: nextQuotient, remainder });
      temp = nextQuotient;
    }

    const binary = steps
      .map((s) => s.remainder)
      .reverse()
      .join('');
    return { binary, steps };
  };

  // Convert binary to decimal with breakdown
  const getBinaryToDecimalSteps = (binStr: string) => {
    const cleaned = binStr.replace(/[^01]/g, '');
    if (!cleaned) return null;

    let decimal = 0;
    const terms: { bit: string; power: number; placeValue: number; subtotal: number }[] = [];
    const len = cleaned.length;

    for (let i = 0; i < len; i++) {
      const bit = cleaned[i];
      const power = len - 1 - i;
      const placeValue = Math.pow(2, power);
      const subtotal = parseInt(bit, 10) * placeValue;
      decimal += subtotal;
      terms.push({ bit, power, placeValue, subtotal });
    }

    return { decimal, terms, cleaned };
  };

  const decAnalysis = getDecimalToBinarySteps(inputDecimal);
  const binAnalysis = getBinaryToDecimalSteps(inputBinary);

  return (
    <div className="w-full px-2 sm:px-4 py-3 animate-in fade-in duration-300 text-left">
      {/* Top action header */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-5">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="rounded-xl h-9 px-3 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Vissza a témakörökhöz
        </Button>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            variant="outline"
            size="sm"
            className="rounded-xl h-9 px-3.5 border-cyan-300 bg-cyan-50/50 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800 hover:bg-cyan-100 text-xs sm:text-sm font-bold shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-cyan-600 dark:text-cyan-400" />
            {isDownloading ? 'PDF készítése...' : 'Letöltés PDF-ben'}
          </Button>

          {onStartQuiz && (
            <Button
              onClick={onStartQuiz}
              size="sm"
              className="rounded-xl h-9 px-3.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs sm:text-sm font-bold shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Gyakorló Kvíz
            </Button>
          )}
        </div>
      </div>

      {/* Printable Area */}
      <div id="number-systems-theory-content" className="space-y-6">
        {/* Main Hero Header */}
        <div className="bg-gradient-to-br from-cyan-600 via-teal-600 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-cyan-100 text-xs font-black uppercase tracking-wider border border-white/20">
              <Binary className="w-3.5 h-3.5" />
              <span>5. Osztály • I. Az egész számok • 5. Altéma</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Számrendszerek (Tízes és Kettes számrendszer)
            </h1>
            <p className="text-cyan-100 text-xs sm:text-base max-w-3xl leading-relaxed opacity-95">
              Fedezd fel, hogyan működik a helyiértékes számírás, miért a 10-es számrendszert használjuk a mindennapokban, és hogyan gondolkodnak a számítógépek a 2-es (bináris) számrendszer segítségével!
            </p>
          </div>
        </div>

        {/* 1. Mi a számrendszer? & Alapfogalmak */}
        <Card className="rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900 overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500 text-white flex items-center justify-center font-black shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                1. Mi a számrendszer? A számrendszer alapja
              </h2>
              <p className="text-xs text-slate-500">
                A számok leírásának szabályrendszere és a helyiértékek működése
              </p>
            </div>
          </div>

          <CardContent className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              A <strong>számrendszer</strong> olyan szabályok összessége, amelyek meghatározzák, hogy számjegyek segítségével hogyan fejezünk ki számokat. A modern matematikában és informatikában <strong>helyiértékes számrendszereket</strong> használunk.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/60 space-y-2">
                <div className="flex items-center gap-2 font-black text-cyan-900 dark:text-cyan-300">
                  <Cpu className="w-4 h-4 text-cyan-600" />
                  <span>A számrendszer alapja (b)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  A számrendszer alapja megmutatja:
                </p>
                <ul className="text-xs space-y-1 list-disc list-inside text-slate-700 dark:text-slate-300 font-medium">
                  <li>Hány darab különböző alapszámjegyet használhatunk ($0$-tól $b-1$-ig).</li>
                  <li>Hányszorosára növekszik a helyiérték, amikor jobbról balra lépünk egyet.</li>
                  <li>A helyiértékek a számrendszer alapjának növekvő hatványai: $b^0=1, b^1=b, b^2=b\cdot b, \dots$</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-2">
                <div className="flex items-center gap-2 font-black text-blue-900 dark:text-blue-300">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                  <span>Alaki érték és Helyiérték</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Minden leírt számban a számjegy valódi értéke a szorzatuk:
                </p>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200/80 dark:border-slate-700 text-center font-mono font-bold text-xs text-blue-700 dark:text-blue-300">
                  Valódi érték = Alaki érték · Helyiérték
                </div>
                <p className="text-[11px] text-slate-500">
                  Ugyanaz az '1'-es számjegy mást jelent az egyesek ($1$), a tízesek ($10$), vagy kettes számrendszerben a nyolcasok ($8$) helyén!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. A 10-es és a 2-es számrendszer összehasonlítása */}
        <Card className="rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900 overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500 text-white flex items-center justify-center font-black shadow-xs">
              <Binary className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                2. Tízes (decimális) vs. Kettes (bináris) számrendszer
              </h2>
              <p className="text-xs text-slate-500">
                A két legfontosabb számrendszer felépítése és helyiértékei
              </p>
            </div>
          </div>

          <CardContent className="p-5 sm:p-6 space-y-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Decimal Box */}
              <div className="p-4 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-black text-amber-900 dark:text-amber-300 text-base">
                    🔟 Tízes számrendszer (Decimális)
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-[10px] font-black font-mono">
                    Alap: b = 10
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  <strong>Használt számjegyek (10 db):</strong> <code className="font-bold text-amber-800 dark:text-amber-300">0, 1, 2, 3, 4, 5, 6, 7, 8, 9</code>
                </p>
                <div className="space-y-1.5 text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">Helyiértékek (jobbról balra):</span>
                  <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[11px]">
                    <div className="p-1.5 rounded-lg bg-white dark:bg-slate-850 border">
                      <div className="text-slate-400 text-[10px]">10³</div>
                      <div className="font-bold text-amber-700 dark:text-amber-300">1000</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white dark:bg-slate-850 border">
                      <div className="text-slate-400 text-[10px]">10²</div>
                      <div className="font-bold text-amber-700 dark:text-amber-300">100</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white dark:bg-slate-850 border">
                      <div className="text-slate-400 text-[10px]">10¹</div>
                      <div className="font-bold text-amber-700 dark:text-amber-300">10</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white dark:bg-slate-850 border">
                      <div className="text-slate-400 text-[10px]">10⁰</div>
                      <div className="font-bold text-amber-700 dark:text-amber-300">1</div>
                    </div>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-850 border border-amber-200/60 text-xs">
                  <strong>Példa:</strong> $345_{10} = 3 \cdot 100 + 4 \cdot 10 + 5 \cdot 1$
                </div>
              </div>

              {/* Binary Box */}
              <div className="p-4 rounded-2xl border-2 border-cyan-200 dark:border-cyan-900/60 bg-cyan-50/30 dark:bg-cyan-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-black text-cyan-900 dark:text-cyan-300 text-base">
                    💻 Kettes számrendszer (Bináris)
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-200 dark:bg-cyan-900 text-[10px] font-black font-mono">
                    Alap: b = 2
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  <strong>Használt számjegyek (2 db):</strong> <code className="font-bold text-cyan-800 dark:text-cyan-300">0, 1</code> (a számítógép bitjei)
                </p>
                <div className="space-y-1.5 text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">Helyiértékek (jobbról balra, mindig duplázódik):</span>
                  <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[11px]">
                    <div className="p-1.5 rounded-lg bg-white dark:bg-slate-850 border">
                      <div className="text-slate-400 text-[10px]">2³</div>
                      <div className="font-bold text-cyan-700 dark:text-cyan-300">8</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white dark:bg-slate-850 border">
                      <div className="text-slate-400 text-[10px]">2²</div>
                      <div className="font-bold text-cyan-700 dark:text-cyan-300">4</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white dark:bg-slate-850 border">
                      <div className="text-slate-400 text-[10px]">2¹</div>
                      <div className="font-bold text-cyan-700 dark:text-cyan-300">2</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white dark:bg-slate-850 border">
                      <div className="text-slate-400 text-[10px]">2⁰</div>
                      <div className="font-bold text-cyan-700 dark:text-cyan-300">1</div>
                    </div>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-850 border border-cyan-200/60 text-xs">
                  <strong>Példa:</strong> $1101_{2} = 1 \cdot 8 + 1 \cdot 4 + 0 \cdot 2 + 1 \cdot 1 = 13_{10}$
                </div>
              </div>
            </div>

            {/* Why computers use binary */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
              <Cpu className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-black text-slate-900 dark:text-white text-xs sm:text-sm">
                  Miért használ a számítógép kettes számrendszert?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  A mikroprocesszorok több milliárd apró elektronikus tranzisztorból (kapcsolóból) állnak. Egy kapcsolónak csak két állapota lehet: <strong>bekapcsolva (van áram = 1)</strong> vagy <strong>kikapcsolva (nincs áram = 0)</strong>. Egy ilyen elemi információt nevezünk <strong>bitnek (binary digit)</strong>, 8 bit összessége pedig <strong>1 bájt (byte)</strong>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Átváltási módszerek lépésről lépésre */}
        <Card className="rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900 overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500 text-white flex items-center justify-center font-black shadow-xs">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                3. Átváltások a kettes és tízes számrendszer között
              </h2>
              <p className="text-xs text-slate-500">
                Gyakorlati módszerek: helyiértékes összegzés és maradékos osztás
              </p>
            </div>
          </div>

          <CardContent className="p-5 sm:p-6 space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {/* A) Kettesből Tízesbe */}
            <div className="space-y-3">
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-black flex items-center justify-center">A</span>
                Kettesből tízesbe váltás ($2 \rightarrow 10$)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Írd a bináris számjegyek fölé a kettes helyiértékeket ($1, 2, 4, 8, 16, \dots$), majd szorozd meg a jegyeket a helyiértékükkel és add össze őket!
              </p>

              {/* Table calculation example */}
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse text-xs font-mono">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      <th className="p-2 border border-slate-200 dark:border-slate-700">Kettes helyiérték ($2^k$)</th>
                      <th className="p-2 border border-slate-200 dark:border-slate-700">16 ($2^4$)</th>
                      <th className="p-2 border border-slate-200 dark:border-slate-700">8 ($2^3$)</th>
                      <th className="p-2 border border-slate-200 dark:border-slate-700">4 ($2^2$)</th>
                      <th className="p-2 border border-slate-200 dark:border-slate-700">2 ($2^1$)</th>
                      <th className="p-2 border border-slate-200 dark:border-slate-700">1 ($2^0$)</th>
                      <th className="p-2 border border-slate-200 dark:border-slate-700 font-sans font-bold">Összegzés</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-slate-900 font-bold">
                      <td className="p-2 border border-slate-200 dark:border-slate-700 font-sans text-slate-500">Példa: $10110_2$</td>
                      <td className="p-2 border border-slate-200 dark:border-slate-700 text-cyan-600">1</td>
                      <td className="p-2 border border-slate-200 dark:border-slate-700 text-slate-400">0</td>
                      <td className="p-2 border border-slate-200 dark:border-slate-700 text-cyan-600">1</td>
                      <td className="p-2 border border-slate-200 dark:border-slate-700 text-cyan-600">1</td>
                      <td className="p-2 border border-slate-200 dark:border-slate-700 text-slate-400">0</td>
                      <td className="p-2 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 font-black">
                        16 + 0 + 4 + 2 + 0 = 22
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* B) Tízesből Kettesbe */}
            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-black flex items-center justify-center">B</span>
                Tízesből kettesbe váltás ($10 \rightarrow 2$)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white text-xs">
                    1. Módszer: 2-hatványok kivonása
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Keresd meg a legnagyobb beleférő 2-hatványt, vond le, oda írj <strong>1</strong>-est, a kimaradó helyekre pedig <strong>0</strong>-t!
                  </p>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border font-mono text-xs text-slate-800 dark:text-slate-200 space-y-1">
                    <div>Példa: <strong>25</strong> átváltása:</div>
                    <div>25 - <strong>16</strong> = 9 ➔ (van 16-os: <strong>1</strong>)</div>
                    <div>9 - <strong>8</strong> = 1 ➔ (van 8-as: <strong>1</strong>)</div>
                    <div>1 - 4 nem lehet ➔ (nincs 4-es: <strong>0</strong>)</div>
                    <div>1 - 2 nem lehet ➔ (nincs 2-es: <strong>0</strong>)</div>
                    <div>1 - <strong>1</strong> = 0 ➔ (van 1-es: <strong>1</strong>)</div>
                    <div className="font-bold text-cyan-600 dark:text-cyan-400 pt-1 border-t">Eredmény: 25 = 11001₂</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white text-xs">
                    2. Módszer: Folyamatos osztás 2-vel
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Oszd a számot 2-vel egész részig, írd fel a maradékokat (0 vagy 1), majd <strong>alulról felfelé</strong> olvasd ki!
                  </p>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border font-mono text-xs text-slate-800 dark:text-slate-200 space-y-1">
                    <div>25 : 2 = 12, maradék: <strong>1</strong> ↑</div>
                    <div>12 : 2 = 6,  maradék: <strong>0</strong> ↑</div>
                    <div>6  : 2 = 3,  maradék: <strong>0</strong> ↑</div>
                    <div>3  : 2 = 1,  maradék: <strong>1</strong> ↑</div>
                    <div>1  : 2 = 0,  maradék: <strong>1</strong> ↑</div>
                    <div className="font-bold text-indigo-600 dark:text-indigo-400 pt-1 border-t">Alulról felfelé: 11001₂</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Egyéb számrendszerek (5-ös, 12-es, 60-as) */}
        <Card className="rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900 overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black shadow-xs">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                4. Egyéb számrendszerek a történelemben és a mindennapokban
              </h2>
              <p className="text-xs text-slate-500">
                Az 5-ös, 12-es (tucat) és 60-as (idő- és szögmérés) rendszerek
              </p>
            </div>
          </div>

          <CardContent className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-2">
                <div className="font-black text-amber-900 dark:text-amber-300 flex items-center gap-1.5 text-xs">
                  <span>🖐️ 5-ös számrendszer</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Számjegyek: <code className="font-bold">0, 1, 2, 3, 4</code>.<br />
                  Helyiértékek: $1, 5, 25, 125, \dots$<br />
                  <strong>Példa:</strong> $23_5 = 2 \cdot 5 + 3 \cdot 1 = 13_{10}$
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/40 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-900/40 space-y-2">
                <div className="font-black text-purple-900 dark:text-purple-300 flex items-center gap-1.5 text-xs">
                  <span>🥚 12-es számrendszer (Tucat)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  1 tucat = 12 db<br />
                  1 grosz (nagytucat) = 144 db ($12 \times 12$).<br />
                  Gyakori tojásnál, gomboknál, óralap beosztásánál.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-2">
                <div className="font-black text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 text-xs">
                  <span>⏳ 60-as számrendszer (Sexagesimális)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Az ókori mezopotámiaiaktól származik:<br />
                  1 óra = 60 perc, 1 perc = 60 másodperc.<br />
                  A teljes kör = $360^\circ = 6 \times 60^\circ$.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5. INTERAKTÍV BINÁRIS KAPCSOLÓTÁBLA & KÉTIRÁNYÚ ÁTVÁLTÓ */}
        <Card className="rounded-3xl border-2 border-cyan-300 dark:border-cyan-800 shadow-md bg-white dark:bg-slate-900 overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-cyan-100 dark:border-cyan-900/60 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-950/40 dark:to-slate-850 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-600 text-white flex items-center justify-center font-black shadow-xs">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  5. Interaktív Bináris Laboratórium
                </h2>
                <p className="text-xs text-slate-500">
                  Kattints a bitekre és nézd meg az azonnali átváltást!
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-200 text-xs font-bold">
              Kétirányú szimulátor
            </span>
          </div>

          <CardContent className="p-5 sm:p-6 space-y-6">
            {/* A) 8-Bit Switcher Board */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  8-Bites Kapcsolótábla (Kattints a lámpákra!):
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setBits([0, 0, 0, 0, 0, 0, 0, 0])}
                  className="text-xs h-7 px-2 text-slate-500 hover:text-slate-900"
                >
                  <RotateCcw className="w-3 h-3 mr-1" /> Nullázás
                </Button>
              </div>

              {/* 8 Bits Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {bits.map((bit, idx) => {
                  const placeVal = bitValues[idx];
                  const isOn = bit === 1;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleToggleBit(idx)}
                      className={cn(
                        "p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-between gap-2 text-center group cursor-pointer shadow-xs",
                        isOn
                          ? "bg-cyan-500 text-white border-cyan-600 shadow-md scale-102"
                          : "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-cyan-300"
                      )}
                    >
                      <span className="text-[10px] font-mono font-bold opacity-80">
                        2^{7 - idx} = {placeVal}
                      </span>

                      <div
                        className={cn(
                          "w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-lg transition-transform",
                          isOn
                            ? "bg-white text-cyan-700 shadow-sm scale-110"
                            : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                        )}
                      >
                        {bit}
                      </div>

                      <span className="text-[10px] font-bold">
                        {isOn ? 'BE (1)' : 'KI (0)'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Result Summary Bar */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-50 to-indigo-50 dark:from-slate-855 dark:to-slate-800 border-2 border-cyan-200 dark:border-cyan-900/60 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold uppercase text-slate-400">Bináris kód:</div>
                  <div className="text-xl sm:text-2xl font-mono font-black text-cyan-700 dark:text-cyan-300 tracking-wider">
                    {bits.join('')}₂
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] font-bold uppercase text-slate-400">Decimális érték:</div>
                  <div className="text-xl sm:text-2xl font-mono font-black text-slate-900 dark:text-white">
                    {calculatedDecimalFromBits}₁₀
                  </div>
                </div>

                <div className="w-full pt-2 border-t border-cyan-200/60 dark:border-slate-700 text-xs font-mono text-slate-600 dark:text-slate-400 flex flex-wrap items-center gap-1">
                  <span className="font-sans font-bold text-slate-500">Levezetés:</span>
                  {bits
                    .map((b, idx) => (b === 1 ? bitValues[idx] : null))
                    .filter((v) => v !== null)
                    .join(' + ') || '0'}{' '}
                  = <strong>{calculatedDecimalFromBits}</strong>
                </div>
              </div>
            </div>

            {/* B) Two-way Interactive Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              {/* Decimal to Binary Input */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                    Tízes szám ➔ Bináris alak
                  </span>
                  <span className="text-[10px] text-slate-400">0 – 1024</span>
                </div>
                <input
                  type="number"
                  min="0"
                  max="1024"
                  value={inputDecimal}
                  onChange={(e) => setInputDecimal(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Írj be egy számot (pl. 42)"
                />

                {decAnalysis && (
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border text-xs font-mono space-y-1">
                    <div className="text-cyan-700 dark:text-cyan-300 font-bold text-sm">
                      {inputDecimal}₁₀ = {decAnalysis.binary}₂
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Helyiértékek: {parseInt(inputDecimal, 10).toString(5)}₅ (5-ös alapú alak)
                    </div>
                  </div>
                )}
              </div>

              {/* Binary to Decimal Input */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                    Bináris kód ➔ Tízes szám
                  </span>
                  <span className="text-[10px] text-slate-400">Csak 0 és 1</span>
                </div>
                <input
                  type="text"
                  value={inputBinary}
                  onChange={(e) => setInputBinary(e.target.value.replace(/[^01]/g, ''))}
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Pl. 101010"
                />

                {binAnalysis && (
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border text-xs font-mono space-y-1">
                    <div className="text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                      {binAnalysis.cleaned}₂ = {binAnalysis.decimal}₁₀
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Összeg: {binAnalysis.terms.filter((t) => t.subtotal > 0).map((t) => t.subtotal).join(' + ') || '0'} = {binAnalysis.decimal}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6. Összehasonlító referencia táblázat (1–16) */}
        <Card className="rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900 overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                6. Gyors referencia táblázat (Számok 1-től 16-ig)
              </h2>
              <p className="text-xs text-slate-500">
                A leggyakoribb számok decimális, bináris és 5-ös alapú alakjai
              </p>
            </div>
          </div>

          <CardContent className="p-5 sm:p-6 space-y-3">
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-sans font-bold">
                    <th className="p-2 border border-slate-200 dark:border-slate-700">Decimális (10-es)</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-700">Bináris (2-es)</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-700">5-ös alapú</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-700">Római szám</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-700 font-sans">Kettes felbontás</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {[
                    { dec: 1, bin: '1', base5: '1', roman: 'I', sum: '1' },
                    { dec: 2, bin: '10', base5: '2', roman: 'II', sum: '2' },
                    { dec: 3, bin: '11', base5: '3', roman: 'III', sum: '2 + 1' },
                    { dec: 4, bin: '100', base5: '4', roman: 'IV', sum: '4' },
                    { dec: 5, bin: '101', base5: '10', roman: 'V', sum: '4 + 1' },
                    { dec: 6, bin: '110', base5: '11', roman: 'VI', sum: '4 + 2' },
                    { dec: 7, bin: '111', base5: '12', roman: 'VII', sum: '4 + 2 + 1' },
                    { dec: 8, bin: '1000', base5: '13', roman: 'VIII', sum: '8' },
                    { dec: 9, bin: '1001', base5: '14', roman: 'IX', sum: '8 + 1' },
                    { dec: 10, bin: '1010', base5: '20', roman: 'X', sum: '8 + 2' },
                    { dec: 11, bin: '1011', base5: '21', roman: 'XI', sum: '8 + 2 + 1' },
                    { dec: 12, bin: '1100', base5: '22', roman: 'XII', sum: '8 + 4' },
                    { dec: 13, bin: '1101', base5: '23', roman: 'XIII', sum: '8 + 4 + 1' },
                    { dec: 14, bin: '1110', base5: '24', roman: 'XIV', sum: '8 + 4 + 2' },
                    { dec: 15, bin: '1111', base5: '30', roman: 'XV', sum: '8 + 4 + 2 + 1' },
                    { dec: 16, bin: '10000', base5: '31', roman: 'XVI', sum: '16' }
                  ].map((row) => (
                    <tr key={row.dec} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-2 font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">
                        {row.dec}
                      </td>
                      <td className="p-2 font-bold text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-slate-800">
                        {row.bin}₂
                      </td>
                      <td className="p-2 font-bold text-amber-600 dark:text-amber-400 border border-slate-200 dark:border-slate-800">
                        {row.base5}₅
                      </td>
                      <td className="p-2 font-serif font-bold text-purple-600 dark:text-purple-400 border border-slate-200 dark:border-slate-800">
                        {row.roman}
                      </td>
                      <td className="p-2 text-slate-500 dark:text-slate-400 text-[11px] border border-slate-200 dark:border-slate-800">
                        {row.sum}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Quiz CTA */}
        {onStartQuiz && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-600 to-teal-700 text-white shadow-md text-center space-y-3">
            <h3 className="text-xl font-black">Készen állsz a tudásod tesztelésére?</h3>
            <p className="text-xs sm:text-sm text-cyan-100 max-w-xl mx-auto">
              Próbáld ki a 3 nehézségi szintes kvízt vagy a kártyanyitogató párosító játékot az átváltások és a számrendszerek magabiztos elsajátításához!
            </p>
            <Button
              onClick={onStartQuiz}
              size="lg"
              className="rounded-2xl h-11 px-6 bg-white text-cyan-900 hover:bg-cyan-50 font-black text-sm shadow-md transition-all mt-2"
            >
              <Sparkles className="w-4 h-4 mr-2 text-cyan-600" />
              Kvíz és Kártyanyitogató indítása
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NumberSystemsTheory;
