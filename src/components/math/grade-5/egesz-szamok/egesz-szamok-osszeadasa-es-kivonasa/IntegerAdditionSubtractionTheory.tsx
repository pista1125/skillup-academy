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
  Flame,
  ArrowRightLeft,
  MoveHorizontal,
  Plus,
  Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportElementToPDF } from '@/utils/pdfExport';

interface IntegerAdditionSubtractionTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function IntegerAdditionSubtractionTheory({
  onBack,
  onStartQuiz
}: IntegerAdditionSubtractionTheoryProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Interactive Number Line Simulator State
  const [startNum, setStartNum] = useState<number>(-3);
  const [operation, setOperation] = useState<'+' | '-'>('+');
  const [secondNum, setSecondNum] = useState<number>(5);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await exportElementToPDF(
      'integer-addition-subtraction-theory-content',
      'Egesz_Szamok_Osszeadasa_Kivonasa_Tananyag'
    );
    setIsDownloading(false);
  };

  // Calculation for the simulator
  // startNum + secondNum or startNum - secondNum
  const resultNum = operation === '+' ? startNum + secondNum : startNum - secondNum;

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
              className="rounded-xl h-9 px-3 border-blue-300 bg-blue-50/60 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800 hover:bg-blue-100 text-xs sm:text-sm font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
              Gyakorló Kvíz indítása
            </Button>
          )}

          <Button
            size="sm"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="rounded-xl h-9 px-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            {isDownloading ? 'Letöltés...' : 'Tananyag letöltése (PDF)'}
          </Button>
        </div>
      </div>

      {/* Main Printable Theory Container */}
      <div
        id="integer-addition-subtraction-theory-content"
        className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 p-5 sm:p-8 shadow-sm space-y-8"
      >
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 mb-2 border border-blue-200 dark:border-blue-800">
              <span>➕➖ 5. Osztály • I. Az egész számok</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              15. Egész számok összeadása és kivonása
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Lépkedés a számegyenesen, előjelek és műveleti jelek összeolvadása, zárójelek felbontása és pénzügyi modellek
            </p>
          </div>

          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 px-4 py-2.5 rounded-2xl border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 font-bold shrink-0">
            <Calculator className="w-4 h-4 text-blue-600" />
            <span>Kulcstéma: Előjeles műveletek</span>
          </div>
        </div>

        {/* Master Formula Box */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white dark:from-slate-850 dark:to-slate-900 p-5 sm:p-6 rounded-3xl border-2 border-blue-200 dark:border-blue-900 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              Aranyszabályok: Az előjelek és műveleti jelek találkozása
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-blue-200 dark:border-slate-700 shadow-xs space-y-1">
              <div className="font-extrabold text-blue-700 dark:text-blue-300">
                1. Pozitív hozzáadása (+)
              </div>
              <div className="font-mono font-black text-slate-900 dark:text-white text-base">
                a + (+b) = a + b
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Jobbra lépünk a számegyenesen (megtakarítás nő, melegszik).
              </div>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-blue-200 dark:border-slate-700 shadow-xs space-y-1">
              <div className="font-extrabold text-amber-700 dark:text-amber-300">
                2. Negatív hozzáadása (-)
              </div>
              <div className="font-mono font-black text-slate-900 dark:text-white text-base">
                a + (-b) = a - b
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Balra lépünk a számegyenesen (tartozás nő, hűl).
              </div>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-blue-200 dark:border-slate-700 shadow-xs space-y-1">
              <div className="font-extrabold text-rose-700 dark:text-rose-300">
                3. Pozitív elvétele (-)
              </div>
              <div className="font-mono font-black text-slate-900 dark:text-white text-base">
                a - (+b) = a - b
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Balra lépünk a számegyenesen (pénz elköltése).
              </div>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-blue-200 dark:border-slate-700 shadow-xs space-y-1">
              <div className="font-extrabold text-emerald-700 dark:text-emerald-300">
                4. Negatív elvétele (+)
              </div>
              <div className="font-mono font-black text-slate-900 dark:text-white text-base">
                a - (-b) = a + b
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Jobbra lépünk (adósság elengedése = tiszta nyereség!).
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: Azonos és Különböző Előjelű Számok Összeadása */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center">
              1
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Előjeles számok összeadása
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Azonos előjelűek */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                  Azonos előjelű számok összeadása
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha mindkét szám előjele megegyezik, **összeadjuk az abszolút értékeiket**, és a végeredmény megkapja a **közös előjelet**:
              </p>
              <div className="space-y-2 text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-emerald-700 dark:text-emerald-300 font-bold">
                  (+4) + (+5) = +(4 + 5) = +9
                </div>
                <div className="text-rose-700 dark:text-rose-300 font-bold">
                  (-3) + (-5) = -(3 + 5) = -8
                </div>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                💡 Pénzügyi példa: Ha 3 000 Ft tartozásod van, és csinálsz még 5 000 Ft új adósságot, összesen 8 000 Ft lesz a tartozásod (-8 000 Ft).
              </div>
            </div>

            {/* Különböző előjelűek */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-amber-600" />
                <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                  Különböző előjelű számok összeadása
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha az egyik pozitív, a másik negatív, a **nagyobb abszolút értékűből kivonjuk a kisebbet**, és az eredmény a **nagyobb abszolút értékű szám előjelét** kapja:
              </p>
              <div className="space-y-2 text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-blue-700 dark:text-blue-300 font-bold">
                  (+7) + (-10) = -(10 - 7) = -3 &nbsp; <span className="text-xs font-sans text-slate-500">(10 &gt; 7 ➔ - előjel)</span>
                </div>
                <div className="text-emerald-700 dark:text-emerald-300 font-bold">
                  (-4) + (+9) = +(9 - 4) = +5 &nbsp; <span className="text-xs font-sans text-slate-500">(9 &gt; 4 ➔ + előjel)</span>
                </div>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                💡 Pénzügyi példa: Ha van 7 000 Ft megtakarításod, de vásárolsz 10 000 Ft-ért, akkor 3 000 Ft mínuszba (tartozásba) kerülsz (-3 000 Ft).
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Kivonás mint az Ellentett Hozzáadása */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center">
              2
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Egész számok kivonása mint ellentett hozzáadása
            </h2>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              A matematika egyik legfontosabb tétele: **Egy számból kivonni egy másik számot pontosan ugyanazt jelenti, mint hozzáadni annak az ellentettjét!**
            </p>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-blue-200 dark:border-blue-900/60 text-center font-mono font-black text-base sm:text-lg text-blue-700 dark:text-blue-300 shadow-xs">
              a - b = a + (-b)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-slate-900 dark:text-white mb-1">1. Pozitív kivonása:</div>
                <div className="font-mono font-bold text-blue-600 dark:text-blue-400">8 - (+5) = 8 + (-5) = 3</div>
                <div className="text-[11px] text-slate-500 mt-1">Egyszerűen: 8 - 5 = 3</div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-slate-900 dark:text-white mb-1">2. Negatívból kivonás:</div>
                <div className="font-mono font-bold text-rose-600 dark:text-rose-400">(-3) - (+4) = -3 + (-4) = -7</div>
                <div className="text-[11px] text-slate-500 mt-1">Egyszerűen: -3 - 4 = -7</div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-slate-900 dark:text-white mb-1">3. Negatív kivonása (csapda!):</div>
                <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">(-6) - (-10) = -6 + (+10) = +4</div>
                <div className="text-[11px] text-slate-500 mt-1">A két mínusz pluszra vált!</div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Interaktív Számegyenes Szimulátor */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center">
              3
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Interaktív Számegyenes Szimulátor
            </h2>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-850 border-2 border-blue-200 dark:border-blue-900/80 space-y-6">
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Állítsd be a kezdőértéket, a műveletet és a második számot, hogy lásd a lépést a számegyenesen!
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Start Number */}
              <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Kezdőérték (a):</span>
                  <span className="font-mono text-sm text-blue-600 font-black">{startNum}</span>
                </div>
                <input
                  type="range"
                  min={-10}
                  max={10}
                  value={startNum}
                  onChange={(e) => setStartNum(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Operation */}
              <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Művelet:</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setOperation('+')}
                    className={cn(
                      'flex-1 py-1.5 rounded-xl font-bold text-xs transition-all border',
                      operation === '+'
                        ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200'
                    )}
                  >
                    + Hozzáadás
                  </button>
                  <button
                    onClick={() => setOperation('-')}
                    className={cn(
                      'flex-1 py-1.5 rounded-xl font-bold text-xs transition-all border',
                      operation === '-'
                        ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200'
                    )}
                  >
                    - Kivonás
                  </button>
                </div>
              </div>

              {/* Second Number */}
              <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Második szám (b):</span>
                  <span className="font-mono text-sm text-blue-600 font-black">
                    {secondNum >= 0 ? `+${secondNum}` : secondNum}
                  </span>
                </div>
                <input
                  type="range"
                  min={-10}
                  max={10}
                  value={secondNum}
                  onChange={(e) => setSecondNum(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Visual Formula Display */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-blue-200 dark:border-blue-800 text-center space-y-1 shadow-sm">
              <div className="text-xs uppercase font-bold text-slate-400">Levezetés és eredmény:</div>
              <div className="text-xl sm:text-2xl font-mono font-black text-slate-900 dark:text-white">
                <span>({startNum})</span>
                <span className="text-blue-600 mx-1.5">{operation}</span>
                <span>({secondNum >= 0 ? `+${secondNum}` : secondNum})</span>
                <span className="text-slate-400 mx-2">=</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-black underline decoration-2">
                  {resultNum}
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {operation === '+' && secondNum >= 0 && `Kezdőpont (${startNum}) ➔ Lépés JOBBRA ${secondNum} egységgel ➔ Érkezés: ${resultNum}`}
                {operation === '+' && secondNum < 0 && `Kezdőpont (${startNum}) ➔ Lépés BALRA ${Math.abs(secondNum)} egységgel ➔ Érkezés: ${resultNum}`}
                {operation === '-' && secondNum >= 0 && `Kezdőpont (${startNum}) ➔ Lépés BALRA ${secondNum} egységgel ➔ Érkezés: ${resultNum}`}
                {operation === '-' && secondNum < 0 && `Kezdőpont (${startNum}) ➔ Negatív kivonása ➔ Lépés JOBBRA ${Math.abs(secondNum)} egységgel ➔ Érkezés: ${resultNum}`}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: Gyakori tévhitek és csapdák */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <span className="w-7 h-7 rounded-xl bg-rose-600 text-white font-black text-xs flex items-center justify-center">
              4
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Gyakori csapdák és tévhitek
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>1. Csapda: „-5 - 3 = -2” (Hibás kivonás)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong className="text-rose-600">HIBÁS:</strong> Sokan azt hiszik, hogy 5 - 3 = 2, így -2 lesz. <br />
                <strong className="text-emerald-600">HELYES:</strong> A -5-től BALRA lépünk 3 egységet: <span className="font-mono font-bold">-5 - 3 = -8</span> (két adósság összeadódik!).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>2. Csapda: „Két mínusz mindig pozitívat ad”</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong className="text-rose-600">HIBÁS:</strong> Összeadásnál <span className="font-mono">(-4) + (-3) = -7</span> (negatív marad!). <br />
                <strong className="text-emerald-600">HELYES:</strong> Csak a műveleti mínusz és az előjel találkozásánál lesz plusz: <span className="font-mono">4 - (-3) = 4 + 3 = 7</span>.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 5: Összefoglaló táblázat */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center">
              5
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Összefoglaló Műveleti Táblázat
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                  <th className="p-3 font-black text-slate-800 dark:text-slate-200">Kifejezés</th>
                  <th className="p-3 font-black text-slate-800 dark:text-slate-200">Zárójel nélkül</th>
                  <th className="p-3 font-black text-slate-800 dark:text-slate-200">Számegyenes lépés</th>
                  <th className="p-3 font-black text-slate-800 dark:text-slate-200">Példa</th>
                  <th className="p-3 font-black text-slate-800 dark:text-slate-200">Végeredmény</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="p-3 font-mono font-bold text-blue-600">a + (+b)</td>
                  <td className="p-3 font-mono">a + b</td>
                  <td className="p-3">Jobbra b egységet</td>
                  <td className="p-3 font-mono">5 + (+3)</td>
                  <td className="p-3 font-bold text-emerald-600">8</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-blue-600">a + (-b)</td>
                  <td className="p-3 font-mono">a - b</td>
                  <td className="p-3">Balra b egységet</td>
                  <td className="p-3 font-mono">5 + (-3)</td>
                  <td className="p-3 font-bold text-emerald-600">2</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-blue-600">a - (+b)</td>
                  <td className="p-3 font-mono">a - b</td>
                  <td className="p-3">Balra b egységet</td>
                  <td className="p-3 font-mono">5 - (+8)</td>
                  <td className="p-3 font-bold text-rose-600">-3</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-blue-600">a - (-b)</td>
                  <td className="p-3 font-mono text-emerald-600 font-bold">a + b</td>
                  <td className="p-3">Jobbra b egységet</td>
                  <td className="p-3 font-mono">5 - (-3)</td>
                  <td className="p-3 font-bold text-emerald-600">8</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-rose-600">-a - (+b)</td>
                  <td className="p-3 font-mono">-a - b</td>
                  <td className="p-3">Még tovább balra</td>
                  <td className="p-3 font-mono">-5 - (+3)</td>
                  <td className="p-3 font-bold text-rose-600">-8</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Banner to Quiz */}
        {onStartQuiz && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 no-pdf shadow-lg shadow-blue-500/10">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-black">
                Készen állsz a tudásod tesztelésére?
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 font-medium">
                Gyakorolj a 3 nehézségi szintű kvízzel, párosító kártyákkal és csoportosítóval!
              </p>
            </div>

            <Button
              onClick={onStartQuiz}
              size="lg"
              className="rounded-2xl h-12 px-6 bg-white text-blue-700 hover:bg-blue-50 font-black text-sm shadow-md shrink-0"
            >
              <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
              Gyakorló Kvíz Megnyitása
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
