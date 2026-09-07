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
  Compass
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportElementToPDF } from '@/utils/pdfExport';

interface OppositeAbsoluteTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function OppositeAbsoluteTheory({ onBack, onStartQuiz }: OppositeAbsoluteTheoryProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Interactive Simulator State: value between -12 and +12
  const [simValue, setSimValue] = useState<number>(-5);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await exportElementToPDF('opposite-absolute-theory-content', 'Szamok_Ellentettje_Abszolut_Erteke_Tananyag');
    setIsDownloading(false);
  };

  const oppositeVal = -simValue;
  const absVal = Math.abs(simValue);

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
              className="rounded-xl h-9 px-3 border-orange-300 bg-orange-50/60 text-orange-800 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800 hover:bg-orange-100 text-xs sm:text-sm font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-orange-600" />
              Gyakorló Kvíz indítása
            </Button>
          )}

          <Button
            size="sm"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="rounded-xl h-9 px-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            {isDownloading ? 'Letöltés...' : 'Tananyag letöltése (PDF)'}
          </Button>
        </div>
      </div>

      {/* Main Printable Theory Container */}
      <div
        id="opposite-absolute-theory-content"
        className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 p-5 sm:p-8 shadow-sm space-y-8"
      >
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 mb-2 border border-orange-200 dark:border-orange-800">
              <span>🔄 5. Osztály • I. Az egész számok</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              A számok ellentettje és abszolút értéke
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Nullára vonatkozó szimmetria, távolság az origótól, előjelváltás és abszolútérték-egyenlőségek
            </p>
          </div>

          <div className="p-3 bg-orange-50 dark:bg-slate-800/80 rounded-2xl border border-orange-200/60 dark:border-slate-700 text-center shrink-0">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Szabály</div>
            <div className="text-base sm:text-lg font-mono font-black text-orange-700 dark:text-orange-300">
              a + (-a) = 0 &nbsp;|&nbsp; |a| ≥ 0
            </div>
          </div>
        </div>

        {/* Section 1: A szám ellentettje */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 font-bold text-sm">
              1.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              A szám ellentettje (Szimmetria a számegyenesen)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 shadow-none bg-slate-50/50 dark:bg-slate-850/50">
              <CardContent className="p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400 font-bold text-sm">
                  <ArrowRightLeft className="w-4 h-4" />
                  <span>Mi az ellentett szám?</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Két szám egymás <strong>ellentettje</strong>, ha a számegyenesen a nullától (az origótól) <em>egyforma távolságra</em>, de <em>ellentétes irányban</em> helyezkednek el.
                </p>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1">
                  <div>• <span className="font-bold text-blue-600">+5</span> ellentettje: <span className="font-bold text-rose-600">-5</span></div>
                  <div>• <span className="font-bold text-rose-600">-8</span> ellentettje: <span className="font-bold text-blue-600">+8</span> (mert -(-8) = +8)</div>
                  <div>• <span className="font-bold text-slate-900 dark:text-white">0</span> ellentettje: <span className="font-bold text-slate-900 dark:text-white">0</span> (önmaga)</div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 shadow-none bg-slate-50/50 dark:bg-slate-850/50">
              <CardContent className="p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400 font-bold text-sm">
                  <Lightbulb className="w-4 h-4" />
                  <span>Az ellentettek legfontosabb tulajdonságai</span>
                </div>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50">
                    <strong className="text-orange-900 dark:text-orange-200">1. Összegük mindig 0:</strong>
                    <div className="font-mono font-bold text-orange-700 dark:text-orange-300 text-xs mt-0.5">a + (-a) = 0</div>
                    <div className="text-[11px] text-slate-500">Példa: (+6) + (-6) = 0.</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
                    <strong className="text-emerald-900 dark:text-emerald-200">2. Kétszeres ellentett:</strong>
                    <div className="font-mono font-bold text-emerald-700 dark:text-emerald-300 text-xs mt-0.5">-(-a) = a</div>
                    <div className="text-[11px] text-slate-500">Egy szám ellentettjének az ellentettje az eredeti szám.</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 2: A szám abszolút értéke */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 font-bold text-sm">
              2.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              A szám abszolút értéke (Távolság a nullától)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pozitív szám abszolút értéke */}
            <Card className="rounded-2xl border-emerald-200 dark:border-emerald-900/60 shadow-none bg-emerald-50/40 dark:bg-emerald-950/20">
              <CardContent className="p-4 space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  Pozitív szám (&gt; 0)
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  Önmagával egyenlő
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Pozitív számnál a nullától mért távolság maga a szám:
                </p>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-center font-mono font-bold text-emerald-700 dark:text-emerald-300 text-xs">
                  |+7| = 7 &nbsp;|&nbsp; |+24| = 24
                </div>
              </CardContent>
            </Card>

            {/* Nulla abszolút értéke */}
            <Card className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-none bg-slate-50/60 dark:bg-slate-850/50">
              <CardContent className="p-4 space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Nulla (= 0)
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  Nullával egyenlő
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  A nullának a nullától mért távolsága pontosan 0:
                </p>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-slate-800 dark:text-slate-200 text-xs">
                  |0| = 0
                </div>
              </CardContent>
            </Card>

            {/* Negatív szám abszolút értéke */}
            <Card className="rounded-2xl border-orange-200 dark:border-orange-900/60 shadow-none bg-orange-50/40 dark:bg-orange-950/20">
              <CardContent className="p-4 space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-orange-700 dark:text-orange-300">
                  Negatív szám (&lt; 0)
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  Az ellentettjével egyenlő
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Mivel a távolság sosem negatív, elhagyjuk a mínuszjelet:
                </p>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-orange-200 dark:border-orange-800 text-center font-mono font-bold text-orange-700 dark:text-orange-300 text-xs">
                  |-7| = 7 &nbsp;|&nbsp; |-45| = 45
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 dark:from-slate-850 dark:via-slate-800 dark:to-slate-850 border border-orange-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 font-bold">
              |a|
            </div>
            <div>
              <strong>Kulcsszabály:</strong> Az ellentett számpárok abszolút értéke <em>mindig megegyezik</em>: <span className="font-mono font-bold text-orange-700 dark:text-orange-400">|-a| = |a|</span> (pl. $|-9| = |+9| = 9$).
            </div>
          </div>
        </section>

        {/* Section 3: Interaktív Ellentett és Abszolút Érték Szimulátor */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 font-bold text-sm">
              3.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Interaktív Ellentett és Abszolút Érték Szimulátor
            </h2>
          </div>

          <Card className="rounded-2xl border-2 border-slate-200/80 dark:border-slate-800 shadow-none bg-slate-50/60 dark:bg-slate-850/60 overflow-hidden">
            <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Válassz ki egy számot a számegyenesen:
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Figyeld meg az ellentettjét és a nullától mért távolságát (abszolút értékét)!
                  </p>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-1.5">
                {[-10, -7, -4, 0, 4, 7, 10].map((val) => (
                  <button
                    key={val}
                    onClick={() => setSimValue(val)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all",
                      simValue === val
                        ? "bg-orange-600 text-white shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    {val > 0 ? `+${val}` : val}
                  </button>
                ))}
              </div>
            </div>

            <CardContent className="p-4 sm:p-6 space-y-6">
              {/* Dynamic Values Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-[10px] font-black uppercase text-slate-400">Eredeti szám (a)</div>
                  <div className="text-xl font-mono font-black text-blue-600 dark:text-blue-400 mt-0.5">
                    {simValue > 0 ? `+${simValue}` : simValue}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-[10px] font-black uppercase text-slate-400">Ellentettje (-a)</div>
                  <div className="text-xl font-mono font-black text-rose-600 dark:text-rose-400 mt-0.5">
                    {oppositeVal > 0 ? `+${oppositeVal}` : oppositeVal}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-[10px] font-black uppercase text-slate-400">Abszolút értéke (|a|)</div>
                  <div className="text-xl font-mono font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {absVal}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-[10px] font-black uppercase text-slate-400">Összegük (a + (-a))</div>
                  <div className="text-xl font-mono font-black text-orange-600 dark:text-orange-400 mt-0.5">
                    0
                  </div>
                </div>
              </div>

              {/* Visual Number Line */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="text-xs font-black uppercase tracking-wider text-slate-400 text-center">
                  Szimmetrikus ábrázolás a számegyenesen
                </div>

                <div className="overflow-x-auto py-3">
                  <div className="min-w-[550px] relative flex flex-col items-center">
                    {/* Axis Line */}
                    <div className="w-full relative flex items-center justify-between h-12 border-b-2 border-slate-800 dark:border-slate-200 px-4">
                      {[-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10].map((tick) => {
                        const isOriginal = simValue === tick;
                        const isOpposite = oppositeVal === tick && simValue !== 0;
                        const isZero = tick === 0;

                        return (
                          <div key={tick} className="flex flex-col items-center relative -bottom-3">
                            {/* Pin / Mark */}
                            {isOriginal && (
                              <div className="absolute -top-7 px-2 py-0.5 bg-blue-600 text-white rounded-md text-[10px] font-black animate-bounce shadow-md">
                                a = {tick > 0 ? `+${tick}` : tick}
                              </div>
                            )}
                            {isOpposite && (
                              <div className="absolute -top-7 px-2 py-0.5 bg-rose-600 text-white rounded-md text-[10px] font-black shadow-md">
                                -a = {tick > 0 ? `+${tick}` : tick}
                              </div>
                            )}

                            <div className={cn(
                              "w-0.5 transition-all",
                              isZero ? "h-6 bg-slate-900 dark:bg-white w-1" : "h-3.5 bg-slate-300 dark:bg-slate-600",
                              (isOriginal || isOpposite) && "bg-orange-500 h-5 w-1"
                            )} />

                            <span className={cn(
                              "text-xs font-mono mt-1 font-bold",
                              isOriginal
                                ? "text-blue-600 dark:text-blue-400 font-black text-sm"
                                : isOpposite
                                ? "text-rose-600 dark:text-rose-400 font-black text-sm"
                                : isZero
                                ? "text-slate-900 dark:text-white font-black"
                                : "text-slate-400"
                            )}>
                              {tick > 0 ? `+${tick}` : tick}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-center text-slate-500 space-y-1">
                  <p>
                    A <strong className="text-blue-600">{simValue > 0 ? `+${simValue}` : simValue}</strong> és a <strong className="text-rose-600">{oppositeVal > 0 ? `+${oppositeVal}` : oppositeVal}</strong> pontok egyenlő, <strong>{absVal} egység</strong> távolságra vannak a nullától.
                  </p>
                </div>
              </div>

              {/* Slider Control */}
              <div className="space-y-2 bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                  <span>-10</span>
                  <span className="font-mono text-orange-600 dark:text-orange-400 font-black">Kiválasztott szám: {simValue > 0 ? `+${simValue}` : simValue}</span>
                  <span>+10</span>
                </div>
                <input
                  type="range"
                  min={-10}
                  max={10}
                  value={simValue}
                  onChange={(e) => setSimValue(parseInt(e.target.value, 10))}
                  className="w-full accent-orange-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
                <div className="flex items-center justify-between pt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSimValue((prev) => Math.max(-10, prev - 1))}
                    className="rounded-xl h-8 px-2.5 text-xs"
                  >
                    -1 léptetés
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSimValue(0)}
                    className="rounded-xl h-8 px-2.5 text-xs text-slate-500"
                  >
                    Origóba (0)
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSimValue((prev) => Math.min(10, prev + 1))}
                    className="rounded-xl h-8 px-2.5 text-xs"
                  >
                    +1 léptetés
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 4: Tipikus csapdák és buktatók */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold text-sm">
              4.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Gyakori hibák és tipikus csapdák
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>1. Csapda: „Az ellentett mindig negatív szám”</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <span className="text-rose-600 font-bold">Hibás:</span> -7 ellentettje -7.<br />
                <span className="text-emerald-600 font-bold">Helyes:</span> Egy negatív szám ellentettje <strong>POZITÍV</strong>: -(-7) = <strong>+7</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>2. Csapda: Abszolútértéken kívüli mínuszjel</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <span className="text-rose-600 font-bold">Hibás:</span> -|-5| = 5.<br />
                <span className="text-emerald-600 font-bold">Helyes:</span> Először a vonalak belseje: |-5| = 5, majd a külső mínuszjel megmarad: -5 ➔ <strong>-|-5| = -5</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>3. Csapda: |x| = 6 egyenlet megoldása</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <span className="text-rose-600 font-bold">Hibás:</span> Csak x = 6 a megoldás.<br />
                <span className="text-emerald-600 font-bold">Helyes:</span> Két megoldás van: <strong>x = 6 VAGY x = -6</strong>, mert mindkettő távolsága 6 egység a 0-tól.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>4. Csapda: A nulla ellentettje</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <span className="text-rose-600 font-bold">Hibás:</span> 0 ellentettje nincs vagy -0.<br />
                <span className="text-emerald-600 font-bold">Helyes:</span> A 0 ellentettje <strong>önmaga, azaz 0</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Összefoglaló táblázat */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 font-bold text-sm">
              5.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Összefoglaló táblázat
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black">
                <tr>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Fogalom</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Jelölés</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Geometriai jelentés</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Példa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-bold text-orange-700 dark:text-orange-300">Szám ellentettje</td>
                  <td className="p-3 font-mono font-bold">-a</td>
                  <td className="p-3 font-mono">Tükörkép az origóra (0-ra)</td>
                  <td className="p-3 font-mono">+9 ellentettje -9 | -15 ellentettje +15</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-bold text-emerald-700 dark:text-emerald-300">Abszolút érték</td>
                  <td className="p-3 font-mono font-bold">|a| ≥ 0</td>
                  <td className="p-3 font-mono">Távolság az origótól (0-tól)</td>
                  <td className="p-3 font-mono">|+8| = 8 | |-8| = 8 | |0| = 0</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-bold text-blue-700 dark:text-blue-300">Ellentettek összege</td>
                  <td className="p-3 font-mono font-bold">a + (-a) = 0</td>
                  <td className="p-3 font-mono">Visszatérés a kiindulási 0 pontba</td>
                  <td className="p-3 font-mono">(+12) + (-12) = 0</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-bold text-rose-700 dark:text-rose-300">Külső negatív előjel</td>
                  <td className="p-3 font-mono font-bold">-|a| ≤ 0</td>
                  <td className="p-3 font-mono">Távolság ellentettje</td>
                  <td className="p-3 font-mono">-|+5| = -5 | -|-5| = -5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Practice Callout */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-600 to-orange-600 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-orange-500/20">
          <div>
            <h3 className="text-lg font-black">Készen állsz a gyakorlásra?</h3>
            <p className="text-xs sm:text-sm text-orange-100 mt-0.5">
              Tedd próbára tudásod a 3 szintű kvízben, a kártyanyitogató párosítóban vagy a csoportosítóban!
            </p>
          </div>
          {onStartQuiz && (
            <Button
              onClick={onStartQuiz}
              className="bg-white text-orange-900 hover:bg-orange-50 font-black rounded-xl h-10 px-5 shadow-sm text-sm shrink-0"
            >
              <Sparkles className="w-4 h-4 mr-1.5 text-orange-600" />
              Kvíz indítása
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
