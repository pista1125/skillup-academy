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
  Snowflake,
  TrendingDown,
  TrendingUp,
  Thermometer,
  Compass,
  ArrowRightLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportElementToPDF } from '@/utils/pdfExport';

interface NegativeNumbersTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function NegativeNumbersTheory({ onBack, onStartQuiz }: NegativeNumbersTheoryProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Interactive Thermometer & Number Line State (-20 to +30)
  const [tempValue, setTempValue] = useState<number>(-5);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await exportElementToPDF('negative-numbers-theory-content', 'Negativ_Szamok_Tananyag');
    setIsDownloading(false);
  };

  // Helper for real-life interpretation of tempValue
  const getTempDescription = (val: number) => {
    if (val < -15) {
      return {
        title: 'Extrém sarkvidéki fagy! 🥶❄️',
        desc: 'Mínusz ' + Math.abs(val) + ' °C: Vastag télikabát, sapka, sál és kesztyű kötelező. A vizek vastagon befagynak.',
        badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300',
        sign: 'Negatív szám (< 0)'
      };
    }
    if (val < 0) {
      return {
        title: 'Fagypont alatti hideg tél ❄️',
        desc: 'Mínusz ' + Math.abs(val) + ' °C: A csapadék havazásként hullhat, jég képződik az utakon.',
        badgeBg: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border-cyan-300',
        sign: 'Negatív szám (< 0)'
      };
    }
    if (val === 0) {
      return {
        title: 'Pontosan a Fagypont (Origó) 🧊💧',
        desc: '0 °C: A víz fagyáspontja és a jég olvadáspontja. Semleges kiindulási pont: se nem pozitív, se nem negatív!',
        badgeBg: 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-400',
        sign: 'Semleges (Origó = 0)'
      };
    }
    if (val <= 15) {
      return {
        title: 'Hűvös tavaszi / őszi idő 🍂🌱',
        desc: 'Plusz ' + val + ' °C: Vékony kabát vagy pulóver ajánlott. A fagypont felett vagyunk.',
        badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300',
        sign: 'Pozitív szám (> 0)'
      };
    }
    return {
      title: 'Kellemes nyári meleg ☀️🌻',
      desc: 'Plusz ' + val + ' °C: Pólóidő, strandolásra alkalmas hőmérséklet a fagypont jóval felett.',
      badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300',
      sign: 'Pozitív szám (> 0)'
    };
  };

  const currentDesc = getTempDescription(tempValue);

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
              className="rounded-xl h-9 px-3 border-cyan-300 bg-cyan-50/60 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800 hover:bg-cyan-100 text-xs sm:text-sm font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-cyan-600" />
              Gyakorló Kvíz indítása
            </Button>
          )}

          <Button
            size="sm"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="rounded-xl h-9 px-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            {isDownloading ? 'Letöltés...' : 'Tananyag letöltése (PDF)'}
          </Button>
        </div>
      </div>

      {/* Main Printable Theory Container */}
      <div
        id="negative-numbers-theory-content"
        className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 p-5 sm:p-8 shadow-sm space-y-8"
      >
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 mb-2 border border-cyan-200 dark:border-cyan-800">
              <span>❄️ 5. Osztály • I. Az egész számok</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Negatív számok
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              A negatív számok mindennapi megjelenése, előjelek, a nulla szerepe és a számegyenes felépítése
            </p>
          </div>

          <div className="p-3 bg-cyan-50 dark:bg-slate-800/80 rounded-2xl border border-cyan-200/60 dark:border-slate-700 text-center shrink-0">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Számkör</div>
            <div className="text-base sm:text-lg font-mono font-black text-cyan-700 dark:text-cyan-300">
              Negatív (&lt; 0) &nbsp;|&nbsp; 0 &nbsp;|&nbsp; Pozitív (&gt; 0)
            </div>
          </div>
        </div>

        {/* Section 1: Negatív számok a mindennapi életben */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 font-bold text-sm">
              1.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              A negatív számok a mindennapi életben
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            A természetes számok (0, 1, 2, 3, ...) elegendőek dolgok megszámlálásához, de a valóságban sok olyan jelenség van, ahol egy <strong>viszonyítási alaphoz (nullához)</strong> képest ellentétes irányú vagy hiányt jelentő mennyiségekkel találkozunk:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* 1. Hőmérséklet */}
            <Card className="rounded-2xl border-cyan-200/80 dark:border-cyan-900/60 shadow-none bg-cyan-50/40 dark:bg-cyan-950/20">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-bold text-sm">
                  <Thermometer className="w-4 h-4" />
                  <span>Hőmérséklet</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-cyan-100 dark:border-slate-800 text-xs space-y-1">
                  <div><strong>0 °C:</strong> Víz fagyáspontja</div>
                  <div className="text-cyan-600 dark:text-cyan-400 font-bold"><strong>-8 °C:</strong> 8 fok fagy (hidegebb)</div>
                  <div className="text-amber-600 dark:text-amber-400 font-bold"><strong>+15 °C:</strong> 15 fok meleg</div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Minél nagyobb a szám a mínuszjel után, annál nagyobb a hideg (-15 °C hidegebb, mint -3 °C).
                </p>
              </CardContent>
            </Card>

            {/* 2. Tengerszint */}
            <Card className="rounded-2xl border-blue-200/80 dark:border-blue-900/60 shadow-none bg-blue-50/40 dark:bg-blue-950/20">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold text-sm">
                  <Compass className="w-4 h-4" />
                  <span>Tengerszint</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 text-xs space-y-1">
                  <div><strong>0 m:</strong> Tenger felszíne</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold"><strong>+1014 m:</strong> Kékes-tető (hegy)</div>
                  <div className="text-blue-600 dark:text-blue-400 font-bold"><strong>-28 m:</strong> Holt-tenger (mélyföld)</div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  A negatív magasságok a tengerszint alatti szárazföldi mélyföldeket vagy tenger alatti mélységeket jelzik.
                </p>
              </CardContent>
            </Card>

            {/* 3. Pénzügy */}
            <Card className="rounded-2xl border-emerald-200/80 dark:border-emerald-900/60 shadow-none bg-emerald-50/40 dark:bg-emerald-950/20">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                  <Zap className="w-4 h-4" />
                  <span>Pénzügy / Egyenleg</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 text-xs space-y-1">
                  <div><strong>0 Ft:</strong> Nincs pénz, nincs adósság</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold"><strong>+5 000 Ft:</strong> Megtakarítás</div>
                  <div className="text-rose-600 dark:text-rose-400 font-bold"><strong>-2 000 Ft:</strong> Tartozás, hitel</div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  A negatív egyenleg azt mutatja, hogy tartozunk a banknak vagy másnak (tartozás).
                </p>
              </CardContent>
            </Card>

            {/* 4. Épületek szintjei */}
            <Card className="rounded-2xl border-purple-200/80 dark:border-purple-900/60 shadow-none bg-purple-50/40 dark:bg-purple-950/20">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-bold text-sm">
                  <Layers className="w-4 h-4" />
                  <span>Lift / Szintek</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 text-xs space-y-1">
                  <div><strong>0:</strong> Földszint (bejárat)</div>
                  <div className="text-purple-600 dark:text-purple-400 font-bold"><strong>+3:</strong> 3. emelet</div>
                  <div className="text-indigo-600 dark:text-indigo-400 font-bold"><strong>-2:</strong> 2. alagsor / mélygarázs</div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  A földszint alatti szinteket (pincék, alagutak) negatív számokkal számozzák a liftekben.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 2: Előjelek és a számegyenes felépítése */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 font-bold text-sm">
              2.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Előjelek, a nulla szerepe és a számegyenes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Negatív számok */}
            <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 shadow-none bg-slate-50/50 dark:bg-slate-850/50">
              <CardContent className="p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-bold text-sm">
                  <Snowflake className="w-4 h-4" />
                  <span>Negatív számok (&lt; 0)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  A nullánál kisebb számok. A számegyenesen a <strong>nullától balra</strong> helyezkednek el.
                </p>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-cyan-700 dark:text-cyan-300 text-center">
                  -1, -2, -3, -4, -5, ...
                </div>
                <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 text-[11px]">
                  <strong>Szabály:</strong> A mínusz (-) előjelet <em>mindig kötelező</em> kiírni!
                </div>
              </CardContent>
            </Card>

            {/* A nulla */}
            <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 shadow-none bg-slate-50/50 dark:bg-slate-850/50">
              <CardContent className="p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold text-sm">
                  <Info className="w-4 h-4 text-amber-500" />
                  <span>A Nulla (0) szerepe</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  A nulla a számegyenes középpontja (<strong>origó</strong>), a viszonyítási alap.
                </p>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-900 dark:text-white text-center">
                  0 (semleges origó)
                </div>
                <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-[11px]">
                  <strong>Fontos:</strong> A 0 <em>se nem pozitív, se nem negatív</em> szám!
                </div>
              </CardContent>
            </Card>

            {/* Pozitív számok */}
            <Card className="rounded-2xl border-slate-200/80 dark:border-slate-800 shadow-none bg-slate-50/50 dark:bg-slate-850/50">
              <CardContent className="p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>Pozitív számok (&gt; 0)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  A nullánál nagyobb számok. A számegyenesen a <strong>nullától jobbra</strong> helyezkednek el.
                </p>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 text-center">
                  +1 (1), +2 (2), +3 (3), ...
                </div>
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-[11px]">
                  <strong>Szabály:</strong> A plusz (+) előjel <em>elhagyható</em> (+5 = 5).
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vizuális számegyenes grafika */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-50 via-slate-50 to-emerald-50 dark:from-cyan-950/30 dark:via-slate-900 dark:to-emerald-950/30 border-2 border-slate-200 dark:border-slate-800 text-center space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              A számegyenes felépítése és a rendezés szabálya
            </div>

            {/* Number Line Visual */}
            <div className="overflow-x-auto py-2">
              <div className="min-w-[500px] flex flex-col items-center">
                {/* Arrows and labels */}
                <div className="w-full flex items-center justify-between text-xs font-bold px-4 mb-2">
                  <span className="text-cyan-700 dark:text-cyan-400 flex items-center gap-1">
                    ◀ BALRA: Csökkenő értékek (hidegebb, mélyebb)
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    JOBBRA: Növekvő értékek (melegebb, magasabb) ▶
                  </span>
                </div>

                {/* Line axis */}
                <div className="w-full relative flex items-center justify-between h-10 border-b-2 border-slate-800 dark:border-slate-200 px-6">
                  {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex flex-col items-center relative -bottom-2.5">
                      <div className={cn(
                        "w-0.5",
                        num === 0 ? "h-6 bg-slate-900 dark:bg-white w-1" : "h-3.5 bg-slate-400 dark:bg-slate-500"
                      )} />
                      <span className={cn(
                        "text-xs font-mono font-black mt-1",
                        num === 0
                          ? "text-slate-950 dark:text-white text-sm bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded-md"
                          : num < 0
                          ? "text-cyan-700 dark:text-cyan-400"
                          : "text-emerald-700 dark:text-emerald-400"
                      )}>
                        {num > 0 ? `+${num}` : num}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              <strong>Aranyszabály:</strong> Két szám közül a számegyenesen az a <strong>nagyobb</strong>, amelyik <em>jobbra</em> helyezkedik el! (Például: <span className="font-mono font-bold text-cyan-600">-2 &gt; -5</span>, mert a -2 jobbrább van, mint a -5).
            </p>
          </div>
        </section>

        {/* Section 3: Interaktív Hőmérő és Számegyenes Szimulátor */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 font-bold text-sm">
              3.
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Interaktív Hőmérő és Számegyenes Kísérletező
            </h2>
          </div>

          <Card className="rounded-2xl border-2 border-slate-200/80 dark:border-slate-800 shadow-none bg-slate-50/60 dark:bg-slate-850/60 overflow-hidden">
            <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold">
                  <Thermometer className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Állítsd be a hőmérsékletet és figyeld a számegyenes helyzetét:
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Kattints a gyorsgombokra vagy használd a léptetőt!
                  </p>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-1.5">
                {[-20, -10, -5, 0, 5, 15, 25].map((val) => (
                  <button
                    key={val}
                    onClick={() => setTempValue(val)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all",
                      tempValue === val
                        ? "bg-cyan-600 text-white shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    {val > 0 ? `+${val}°C` : `${val}°C`}
                  </button>
                ))}
              </div>
            </div>

            <CardContent className="p-4 sm:p-6 space-y-6">
              {/* Simulator Centerpiece */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Thermometer column */}
                <div className="md:col-span-4 flex flex-col items-center justify-center bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div className="text-xs font-black uppercase text-slate-400 mb-2">Hőmérő higanyszála</div>

                  <div className="relative w-12 h-56 bg-slate-100 dark:bg-slate-800 rounded-full border-4 border-slate-300 dark:border-slate-700 flex flex-col justify-end items-center p-1 overflow-hidden shadow-inner">
                    {/* Scale marks */}
                    <div className="absolute inset-y-2 left-1 flex flex-col justify-between text-[9px] font-mono text-slate-400">
                      <span>+30</span>
                      <span>+20</span>
                      <span>+10</span>
                      <span className="font-bold text-slate-900 dark:text-white">0</span>
                      <span>-10</span>
                      <span>-20</span>
                    </div>

                    {/* Zero line indicator */}
                    <div className="absolute top-[60%] w-full h-0.5 bg-slate-400 z-10" />

                    {/* Liquid fill */}
                    <div
                      className={cn(
                        "w-6 rounded-b-full transition-all duration-300",
                        tempValue > 0
                          ? "bg-gradient-to-t from-orange-500 to-rose-500"
                          : tempValue === 0
                          ? "bg-slate-400"
                          : "bg-gradient-to-t from-blue-700 to-cyan-400"
                      )}
                      style={{
                        height: `${Math.max(8, Math.min(100, ((tempValue + 20) / 50) * 100))}%`
                      }}
                    />
                  </div>

                  <div className="mt-3 text-2xl font-mono font-black text-slate-900 dark:text-white">
                    {tempValue > 0 ? `+${tempValue} °C` : `${tempValue} °C`}
                  </div>
                </div>

                {/* Description & Controls */}
                <div className="md:col-span-8 space-y-4">
                  <div className={cn("p-4 rounded-2xl border-2 space-y-2", currentDesc.badgeBg)}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-900/80 border">
                        {currentDesc.sign}
                      </span>
                      <span className="text-xs font-mono font-bold">
                        Helyzet a 0-hoz képest: {tempValue < 0 ? `${Math.abs(tempValue)} egységgel balra` : tempValue === 0 ? 'Origóban' : `${tempValue} egységgel jobbra`}
                      </span>
                    </div>

                    <h4 className="text-base font-black">
                      {currentDesc.title}
                    </h4>

                    <p className="text-xs sm:text-sm leading-relaxed font-medium">
                      {currentDesc.desc}
                    </p>
                  </div>

                  {/* Slider Control */}
                  <div className="space-y-2 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                      <span>-20 °C (Fagyos)</span>
                      <span>0 °C (Fagypont)</span>
                      <span>+30 °C (Meleg)</span>
                    </div>
                    <input
                      type="range"
                      min={-20}
                      max={30}
                      value={tempValue}
                      onChange={(e) => setTempValue(parseInt(e.target.value, 10))}
                      className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                    <div className="flex items-center justify-between pt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setTempValue((prev) => Math.max(-20, prev - 1))}
                        className="rounded-xl h-8 px-2.5 text-xs"
                      >
                        -1 °C hűlés
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setTempValue(0)}
                        className="rounded-xl h-8 px-2.5 text-xs text-slate-500"
                      >
                        Fagypontra (0 °C)
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setTempValue((prev) => Math.min(30, prev + 1))}
                        className="rounded-xl h-8 px-2.5 text-xs"
                      >
                        +1 °C melegedés
                      </Button>
                    </div>
                  </div>
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
                <span>1. Csapda: „A -10 nagyobb, mint a -2, mert a 10 nagyobb, mint a 2”</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <span className="text-rose-600 font-bold">Hibás:</span> -10 &gt; -2.<br />
                <span className="text-emerald-600 font-bold">Helyes:</span> <strong>-10 &lt; -2</strong>! A -10 °C sokkal hidegebb, mint a -2 °C, és a számegyenesen balrább helyezkedik el.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>2. Csapda: A nulla előjele</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <span className="text-rose-600 font-bold">Hibás:</span> A nulla pozitív szám.<br />
                <span className="text-emerald-600 font-bold">Helyes:</span> A nulla <strong>se nem pozitív, se nem negatív</strong>. Nincs +0 vagy -0 előjele.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>3. Csapda: Mínuszjel elhagyása</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <span className="text-rose-600 font-bold">Hibás:</span> -7 = 7.<br />
                <span className="text-emerald-600 font-bold">Helyes:</span> A plusz (+) előjel elhagyható (+7 = 7), de a negatív (-) előjelet <strong>mindig kötelező kiírni</strong> (-7 ≠ 7).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>4. Csapda: Változások irányának tévesztése</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <span className="text-rose-600 font-bold">Hibás:</span> Ha -3 °C-ról melegszik 5 °C-ot, az -8 °C lesz.<br />
                <span className="text-emerald-600 font-bold">Helyes:</span> Melegedéskor jobbra lépünk a számegyenesen: -3 + 5 = <strong>+2 °C</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Összefoglaló táblázat */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 font-bold text-sm">
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
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Kategória</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Előjel</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Hely a számegyenesen</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Gyakorlati példa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-bold text-cyan-700 dark:text-cyan-300">Negatív számok</td>
                  <td className="p-3 font-mono font-bold text-cyan-600">- (mínusz, kötelező)</td>
                  <td className="p-3 font-mono">Nullától balra (&lt; 0)</td>
                  <td className="p-3 font-mono">-5 °C hideg, -2 000 Ft tartozás</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-bold text-slate-700 dark:text-slate-300">Nulla (Origó)</td>
                  <td className="p-3 font-mono font-bold text-slate-500">Nincs előjele</td>
                  <td className="p-3 font-mono">Középpont (= 0)</td>
                  <td className="p-3 font-mono">0 °C víz fagyáspontja, tengerszint</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-bold text-emerald-700 dark:text-emerald-300">Pozitív számok</td>
                  <td className="p-3 font-mono font-bold text-emerald-600">+ (plusz, elhagyható)</td>
                  <td className="p-3 font-mono">Nullától jobbra (&gt; 0)</td>
                  <td className="p-3 font-mono">+25 °C meleg, +1014 m hegycsúcs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Practice Callout */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-cyan-500/20">
          <div>
            <h3 className="text-lg font-black">Készen állsz a gyakorlásra?</h3>
            <p className="text-xs sm:text-sm text-cyan-100 mt-0.5">
              Tedd próbára tudásod a 3 szintű kvízben, a kártyanyitogató párosítóban vagy a csoportosítóban!
            </p>
          </div>
          {onStartQuiz && (
            <Button
              onClick={onStartQuiz}
              className="bg-white text-cyan-900 hover:bg-cyan-50 font-black rounded-xl h-10 px-5 shadow-sm text-sm shrink-0"
            >
              <Sparkles className="w-4 h-4 mr-1.5 text-cyan-600" />
              Kvíz indítása
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
