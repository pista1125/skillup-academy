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
  ArrowRight,
  MoveHorizontal,
  Target,
  Ruler,
  Compass,
  Check,
  RotateCcw,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportElementToPDF } from '@/utils/pdfExport';

interface NumberLineTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function NumberLineTheory({ onBack, onStartQuiz }: NumberLineTheoryProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Interactive Explorer State
  type ScaleMode = 'units' | 'tens' | 'hundreds';
  const [scaleMode, setScaleMode] = useState<ScaleMode>('units');
  const [pointA, setPointA] = useState<number>(3);
  const [pointB, setPointB] = useState<number>(14);

  // Neighbor lookup calculator state
  const [calcInput, setCalcInput] = useState<string>('348');

  // Mini-game placement state
  const [gameTarget, setGameTarget] = useState<number>(47);
  const [gameClicked, setGameClicked] = useState<number | null>(null);
  const [gameFeedback, setGameFeedback] = useState<string | null>(null);

  // Scales configurations
  const scaleConfigs = {
    units: { min: 0, max: 20, step: 1, majorStep: 5, label: '0 – 20 (Egyesével)' },
    tens: { min: 0, max: 100, step: 5, majorStep: 10, label: '0 – 100 (Tízesével)' },
    hundreds: { min: 0, max: 1000, step: 50, majorStep: 100, label: '0 – 1000 (Százasával)' }
  };

  const currentCfg = scaleConfigs[scaleMode];

  // Adjust point values on scale change
  const handleScaleChange = (mode: ScaleMode) => {
    setScaleMode(mode);
    if (mode === 'units') {
      setPointA(3);
      setPointB(14);
    } else if (mode === 'tens') {
      setPointA(20);
      setPointB(75);
    } else {
      setPointA(200);
      setPointB(850);
    }
  };

  // Calculations
  const distance = Math.abs(pointB - pointA);
  const midpoint = (pointA + pointB) / 2;

  // Neighbor calculations for calcInput
  const parsedNum = parseInt(calcInput, 10);
  const isValidNum = !isNaN(parsedNum);
  const lowerUnit = isValidNum ? parsedNum - 1 : 0;
  const upperUnit = isValidNum ? parsedNum + 1 : 0;
  const lowerTen = isValidNum ? Math.floor(parsedNum / 10) * 10 : 0;
  const upperTen = isValidNum ? Math.ceil((parsedNum + 1) / 10) * 10 : 0;
  const lowerHundred = isValidNum ? Math.floor(parsedNum / 100) * 100 : 0;
  const upperHundred = isValidNum ? Math.ceil((parsedNum + 1) / 100) * 100 : 0;
  const lowerThousand = isValidNum ? Math.floor(parsedNum / 1000) * 1000 : 0;
  const upperThousand = isValidNum ? Math.ceil((parsedNum + 1) / 1000) * 1000 : 0;

  // Mini-game handler
  const handleMiniGameClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const padding = 30;
    const lineW = rect.width - padding * 2;
    const clampedX = Math.max(0, Math.min(lineW, clickX - padding));
    const ratio = clampedX / lineW;
    const guessedVal = Math.round(ratio * 100);

    setGameClicked(guessedVal);
    const diff = Math.abs(guessedVal - gameTarget);
    if (diff === 0) {
      setGameFeedback('Tökéletes eltalálás! Pontosan a számra kattintottál! 🎯');
    } else if (diff <= 2) {
      setGameFeedback(`Nagyon pontos! Csak ${diff} pontnyi az eltérés! 🌟 (Te ide kattintottál: ${guessedVal})`);
    } else if (diff <= 6) {
      setGameFeedback(`Jó próbálkozás! ${diff} volt az eltérés. (Te ide kattintottál: ${guessedVal})`);
    } else {
      setGameFeedback(`Egy kicsit még pontosíts! Eltérés: ${diff}. (Te ide kattintottál: ${guessedVal})`);
    }
  };

  const handleNewTarget = () => {
    const next = Math.floor(Math.random() * 95) + 3;
    setGameTarget(next);
    setGameClicked(null);
    setGameFeedback(null);
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await exportElementToPDF('number-line-theory-content', 'Szamok_Abrazolasa_Szamegyenesen_Tananyag.pdf', {
      title: 'A számok ábrázolása a számegyenesen - Elméleti Tananyag',
      subject: 'Matematika 5. osztály - I. Egész számok',
      author: 'SkillUp Academy'
    });
    setIsDownloading(false);
  };

  return (
    <div className="w-full px-2 sm:px-4 py-4 space-y-6 text-left animate-in fade-in duration-300">
      {/* Top Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="rounded-xl h-9 px-3 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Vissza a témakörökhöz
        </Button>

        <div className="flex items-center gap-2">
          {onStartQuiz && (
            <Button
              onClick={onStartQuiz}
              className="rounded-xl h-9 px-4 text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" /> Kvíz indítása
            </Button>
          )}

          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="rounded-xl h-9 px-4 text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 shadow-xs flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'PDF generálása...' : 'Letöltés PDF-ben'}
          </Button>
        </div>
      </div>

      {/* Main Printable Theory Container */}
      <div id="number-line-theory-content" className="space-y-6">
        {/* Title Header Card */}
        <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 dark:from-emerald-950/30 dark:to-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 dark:border-emerald-800/60 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider mb-3">
            <Ruler className="w-3.5 h-3.5" />
            5. Osztály • I. Fejezet / 6. Altéma
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            A számok ábrázolása a számegyenesen 📏
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            A számegyenes a matematika egyik legfontosabb szemléltető eszköze. Segítségével a számokat geometriai pontokként
            tudjuk elhelyezni, könnyen összehasonlíthatjuk nagyságukat, megkereshetjük szomszédaikat és kiszámíthatjuk távolságukat.
          </p>
        </div>

        {/* 1. Alapfogalmak Section */}
        <Card className="rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <CardContent className="p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  1. A számegyenes 3 alapvető eleme
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Mi tesz egy egyenest számegyenessé?</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Ahhoz, hogy egy egyszerű egyenesből <strong className="text-emerald-600 dark:text-emerald-400">számegyenes</strong> legyen,
              három dolgot kell rögzítenünk:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="bg-emerald-50/60 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/50">
                <div className="text-xs font-black text-emerald-800 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-200 dark:bg-emerald-800 flex items-center justify-center text-[11px]">1</span>
                  Kezdőpont (Origó - 0)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  A kiindulási pont, amelyhez a <strong>0</strong> számot rendeljük. Ettől a ponttól mérjük a távolságokat.
                </p>
              </div>

              <div className="bg-teal-50/60 dark:bg-teal-950/30 p-4 rounded-2xl border border-teal-200/80 dark:border-teal-800/50">
                <div className="text-xs font-black text-teal-800 dark:text-teal-300 mb-1 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-teal-200 dark:bg-teal-800 flex items-center justify-center text-[11px]">2</span>
                  Pozitív Irány (Nyíl)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  A számegyenes végén lévő nyíl mutatja, hogy <strong>merre növekednek</strong> a számok (hagyományosan jobbra).
                </p>
              </div>

              <div className="bg-cyan-50/60 dark:bg-cyan-950/30 p-4 rounded-2xl border border-cyan-200/80 dark:border-cyan-800/50">
                <div className="text-xs font-black text-cyan-800 dark:text-cyan-300 mb-1 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-cyan-200 dark:bg-cyan-800 flex items-center justify-center text-[11px]">3</span>
                  Egységhossz / Lépésköz
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  A szomszédos fő beosztások közötti rögzített távolság. Nem változhat az egyenes mentén!
                </p>
              </div>
            </div>

            {/* Static visual representation */}
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-bold text-slate-500 mb-2">Példa számegyenes: Pontok elhelyezkedése</div>
              <svg viewBox="0 0 700 80" className="w-full h-auto">
                {/* Main Axis Line */}
                <line x1="40" y1="40" x2="660" y2="40" stroke="#64748b" strokeWidth="3" />
                {/* Arrowhead */}
                <polygon points="660,35 675,40 660,45" fill="#64748b" />

                {/* Ticks and Numbers */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => {
                  const x = 50 + val * 58;
                  const isOrigin = val === 0;
                  return (
                    <g key={val}>
                      <line x1={x} y1="30" x2={x} y2="50" stroke={isOrigin ? '#059669' : '#94a3b8'} strokeWidth={isOrigin ? "3" : "2"} />
                      <text x={x} y="68" textAnchor="middle" fontSize="13" fontWeight="bold" fill={isOrigin ? '#059669' : '#475569'}>
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Example labeled points: A(3), B(7) */}
                <g>
                  <circle cx={50 + 3 * 58} cy="40" r="6" fill="#059669" stroke="#ffffff" strokeWidth="2" />
                  <text x={50 + 3 * 58} y="22" textAnchor="middle" fontSize="13" fontWeight="900" fill="#059669">
                    A (3)
                  </text>
                </g>

                <g>
                  <circle cx={50 + 7 * 58} cy="40" r="6" fill="#d97706" stroke="#ffffff" strokeWidth="2" />
                  <text x={50 + 7 * 58} y="22" textAnchor="middle" fontSize="13" fontWeight="900" fill="#d97706">
                    B (7)
                  </text>
                </g>
              </svg>
              <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                <span>Origó: <strong>0</strong></span>
                <span>$A$ pont koordinátája: <strong>$A(3)$</strong></span>
                <span>$B$ pont koordinátája: <strong>$B(7)$</strong></span>
                <span>Távolságuk: $d = 7 - 3 =$ <strong>4 egység</strong></span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Lépésköz és Skálák Section */}
        <Card className="rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <CardContent className="p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-950/80 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <MoveHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  2. Lépésközök és beosztások kiszámítása
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Nem minden számegyenes lépked egyesével!</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Hogyan számoljuk ki az ismeretlen lépésközt?
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Ha a számegyenesen két ismert felirat között több beosztás (szakasz) van, a lépésközt így határozzuk meg:
                </p>
                <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-800 font-mono text-xs font-bold text-teal-900 dark:text-teal-200">
                  Lépésköz = (Nagyobb felirat - Kisebb felirat) ÷ Szakaszok száma
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <strong>Példa:</strong> Ha a 0 és a 50 között 5 egyenlő szakasz van, akkor egyetlen beosztás értéke:
                  <div className="font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                    Lépésköz = (50 - 0) ÷ 5 = 10
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Gyakori skálázási típusok:</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex justify-between">
                    <span className="font-bold text-slate-700 dark:text-slate-200">Kettesével lépkedő:</span>
                    <span className="font-mono text-emerald-600">0, 2, 4, 6, 8, 10...</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex justify-between">
                    <span className="font-bold text-slate-700 dark:text-slate-200">Ötösével lépkedő:</span>
                    <span className="font-mono text-teal-600">0, 5, 10, 15, 20...</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex justify-between">
                    <span className="font-bold text-slate-700 dark:text-slate-200">Tízesével lépkedő:</span>
                    <span className="font-mono text-cyan-600">0, 10, 20, 30, 40...</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex justify-between">
                    <span className="font-bold text-slate-700 dark:text-slate-200">Százasával lépkedő:</span>
                    <span className="font-mono text-indigo-600">0, 100, 200, 300...</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Szomszédok a számegyenesen & Kalkulátor */}
        <Card className="rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <CardContent className="p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  3. Szomszédos számok (Egyes, Tízes, Százas, Ezres)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">A számegyenesen közvetlenül és kerekítve szomszédos értékek</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Egy tetszőleges természetes számhoz ($n$) többféle szomszédos számot is megkülönböztetünk:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-xs font-black text-slate-900 dark:text-white mb-1">Egyes szomszédok ($E$)</div>
                <div className="text-[11px] text-slate-500 mb-2">Közvetlen előtte és utána</div>
                <div className="text-xs font-mono font-bold text-emerald-600">n - 1 &lt; n &lt; n + 1</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-xs font-black text-slate-900 dark:text-white mb-1">Tízes szomszédok ($T$)</div>
                <div className="text-[11px] text-slate-500 mb-2">Legközelebbi kerek tízesek</div>
                <div className="text-xs font-mono font-bold text-teal-600">340 &lt; 348 &lt; 350</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-xs font-black text-slate-900 dark:text-white mb-1">Százas szomszédok ($Sz$)</div>
                <div className="text-[11px] text-slate-500 mb-2">Legközelebbi kerek százasok</div>
                <div className="text-xs font-mono font-bold text-cyan-600">300 &lt; 348 &lt; 400</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-xs font-black text-slate-900 dark:text-white mb-1">Ezres szomszédok ($Ez$)</div>
                <div className="text-[11px] text-slate-500 mb-2">Legközelebbi kerek ezresek</div>
                <div className="text-xs font-mono font-bold text-indigo-600">0 &lt; 348 &lt; 1000</div>
              </div>
            </div>

            {/* Interactive Neighbor Calculator */}
            <div className="mt-4 p-4 sm:p-5 bg-gradient-to-br from-cyan-50/60 to-emerald-50/60 dark:from-slate-850 dark:to-slate-800 rounded-2xl border-2 border-cyan-200 dark:border-slate-700">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-cyan-600" />
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Interaktív Szomszéd-Kereső:
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Írj be egy számot:</span>
                  <input
                    type="number"
                    value={calcInput}
                    onChange={(e) => setCalcInput(e.target.value)}
                    className="w-28 h-8 px-2.5 rounded-lg border border-cyan-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-mono font-bold text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              {isValidNum ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                  <div className="bg-white/90 dark:bg-slate-900/90 p-2.5 rounded-xl border border-cyan-100 dark:border-slate-700">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Egyes szomszédok</span>
                    <div className="text-xs font-mono font-black text-slate-800 dark:text-slate-200 mt-0.5">
                      <span className="text-emerald-600">{lowerUnit}</span> &lt; {parsedNum} &lt; <span className="text-emerald-600">{upperUnit}</span>
                    </div>
                  </div>

                  <div className="bg-white/90 dark:bg-slate-900/90 p-2.5 rounded-xl border border-cyan-100 dark:border-slate-700">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Tízes szomszédok</span>
                    <div className="text-xs font-mono font-black text-slate-800 dark:text-slate-200 mt-0.5">
                      <span className="text-teal-600">{lowerTen}</span> &lt; {parsedNum} &lt; <span className="text-teal-600">{upperTen}</span>
                    </div>
                  </div>

                  <div className="bg-white/90 dark:bg-slate-900/90 p-2.5 rounded-xl border border-cyan-100 dark:border-slate-700">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Százas szomszédok</span>
                    <div className="text-xs font-mono font-black text-slate-800 dark:text-slate-200 mt-0.5">
                      <span className="text-cyan-600">{lowerHundred}</span> &lt; {parsedNum} &lt; <span className="text-cyan-600">{upperHundred}</span>
                    </div>
                  </div>

                  <div className="bg-white/90 dark:bg-slate-900/90 p-2.5 rounded-xl border border-cyan-100 dark:border-slate-700">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Ezres szomszédok</span>
                    <div className="text-xs font-mono font-black text-slate-800 dark:text-slate-200 mt-0.5">
                      <span className="text-indigo-600">{lowerThousand}</span> &lt; {parsedNum} &lt; <span className="text-indigo-600">{upperThousand}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-rose-500 font-bold">Kérlek, adj meg egy érvényes számot!</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 4. Távolság és Felezőpont */}
        <Card className="rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <CardContent className="p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  4. Két pont távolsága és a felezőpont (Középérték)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Hogyan számolunk távolságot és felezőpontot a számegyenesen?</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Két pont távolsága
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  A nagyobb szám koordinátájából kivonjuk a kisebb számét:
                </p>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs font-bold text-amber-600">
                  Távolság: d = B - A (ha B &gt; A)
                </div>
                <div className="text-[11px] text-slate-500">
                  Példa: $A(25)$ és $B(80)$ távolsága: $80 - 25 = \mathbf{55}$ egység.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Felezőpont (Középpont)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  A két koordináta átlaga (összegük fele):
                </p>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs font-bold text-emerald-600">
                  Felezőpont: F = (A + B) ÷ 2
                </div>
                <div className="text-[11px] text-slate-500">
                  Példa: $20$ és $80$ felezőpontja: $(20 + 80) \div 2 = 100 \div 2 = \mathbf{50}$.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5. Interactive Number Line Explorer Tool */}
        <Card className="rounded-3xl border-2 border-emerald-300 dark:border-emerald-800/80 bg-white dark:bg-slate-900 shadow-md overflow-hidden">
          <CardContent className="p-6 sm:p-7 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Ruler className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    5. Interaktív Számegyenes Felfedező
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Mozgasd a pontokat és figyeld a távolságot és a felezőpontot!</p>
                </div>
              </div>

              {/* Scale mode switcher */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                {(['units', 'tens', 'hundreds'] as ScaleMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => handleScaleChange(mode)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-bold transition-all",
                      scaleMode === mode
                        ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-xs"
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    {mode === 'units' ? '0–20' : mode === 'tens' ? '0–100' : '0–1000'}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders for Point A and Point B */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800/60">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-900 dark:text-emerald-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
                    „A” pont helye:
                  </span>
                  <span className="font-mono text-base font-black text-emerald-700 dark:text-emerald-300">A({pointA})</span>
                </div>
                <input
                  type="range"
                  min={currentCfg.min}
                  max={currentCfg.max}
                  step={currentCfg.step}
                  value={pointA}
                  onChange={(e) => setPointA(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="p-3.5 bg-amber-50/50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800/60">
                <div className="flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-amber-600 inline-block" />
                    „B” pont helye:
                  </span>
                  <span className="font-mono text-base font-black text-amber-700 dark:text-amber-300">B({pointB})</span>
                </div>
                <input
                  type="range"
                  min={currentCfg.min}
                  max={currentCfg.max}
                  step={currentCfg.step}
                  value={pointB}
                  onChange={(e) => setPointB(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Dynamic SVG Number Line Visualization */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700">
              <svg viewBox="0 0 760 110" className="w-full h-auto select-none">
                {/* Main Axis Line */}
                <line x1="40" y1="60" x2="720" y2="60" stroke="#475569" strokeWidth="3" />
                <polygon points="720,54 735,60 720,66" fill="#475569" />

                {/* Major and minor ticks */}
                {Array.from({ length: Math.floor((currentCfg.max - currentCfg.min) / currentCfg.step) + 1 }).map((_, i) => {
                  const val = currentCfg.min + i * currentCfg.step;
                  const x = 50 + (val / currentCfg.max) * 650;
                  const isMajor = val % currentCfg.majorStep === 0;

                  return (
                    <g key={val}>
                      <line
                        x1={x}
                        y1={isMajor ? "45" : "52"}
                        x2={x}
                        y2={isMajor ? "75" : "68"}
                        stroke={isMajor ? "#334155" : "#94a3b8"}
                        strokeWidth={isMajor ? "2" : "1"}
                      />
                      {isMajor && (
                        <text
                          x={x}
                          y="92"
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="bold"
                          fill="#64748b"
                          className="font-mono"
                        >
                          {val}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Distance bracket between Point A and Point B */}
                {pointA !== pointB && (
                  <g>
                    {(() => {
                      const xA = 50 + (pointA / currentCfg.max) * 650;
                      const xB = 50 + (pointB / currentCfg.max) * 650;
                      const minX = Math.min(xA, xB);
                      const maxX = Math.max(xA, xB);
                      const midX = (minX + maxX) / 2;
                      return (
                        <>
                          <line x1={minX} y1="30" x2={maxX} y2="30" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 2" />
                          <line x1={minX} y1="25" x2={minX} y2="35" stroke="#6366f1" strokeWidth="2" />
                          <line x1={maxX} y1="25" x2={maxX} y2="35" stroke="#6366f1" strokeWidth="2" />
                          <text x={midX} y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6366f1">
                            d = {distance}
                          </text>
                        </>
                      );
                    })()}
                  </g>
                )}

                {/* Midpoint Marker (F) */}
                <g>
                  {(() => {
                    const xM = 50 + (midpoint / currentCfg.max) * 650;
                    return (
                      <g>
                        <line x1={xM} y1="40" x2={xM} y2="80" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="2 2" />
                        <circle cx={xM} cy="60" r="4.5" fill="#0ea5e9" stroke="#ffffff" strokeWidth="1.5" />
                        <text x={xM} y="44" textAnchor="middle" fontSize="10" fontWeight="black" fill="#0ea5e9">
                          F ({midpoint})
                        </text>
                      </g>
                    );
                  })()}
                </g>

                {/* Point A Marker */}
                <g>
                  {(() => {
                    const xA = 50 + (pointA / currentCfg.max) * 650;
                    return (
                      <g>
                        <circle cx={xA} cy="60" r="7" fill="#059669" stroke="#ffffff" strokeWidth="2" />
                        <text x={xA} y="44" textAnchor="middle" fontSize="12" fontWeight="900" fill="#059669">
                          A ({pointA})
                        </text>
                      </g>
                    );
                  })()}
                </g>

                {/* Point B Marker */}
                <g>
                  {(() => {
                    const xB = 50 + (pointB / currentCfg.max) * 650;
                    return (
                      <g>
                        <circle cx={xB} cy="60" r="7" fill="#d97706" stroke="#ffffff" strokeWidth="2" />
                        <text x={xB} y="44" textAnchor="middle" fontSize="12" fontWeight="900" fill="#d97706">
                          B ({pointB})
                        </text>
                      </g>
                    );
                  })()}
                </g>
              </svg>

              {/* Dynamic metrics card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-700">
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">„A” pont</span>
                  <div className="text-sm font-black text-emerald-600">{pointA}</div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">„B” pont</span>
                  <div className="text-sm font-black text-amber-600">{pointB}</div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Távolság (d)</span>
                  <div className="text-sm font-black text-indigo-600">{distance} egység</div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Felezőpont (F)</span>
                  <div className="text-sm font-black text-cyan-600">{midpoint}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6. Mini Placement Challenge Game */}
        <Card className="rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <CardContent className="p-6 sm:p-7 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/80 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    6. „Hol a szám?” – Gyors Kereső Játék 🎯
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Kattints a számegyenes azon pontjára, ahol szerinted a célpont van!</p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNewTarget}
                className="h-8 rounded-xl text-xs font-bold border-purple-300 text-purple-700 dark:text-purple-300 hover:bg-purple-50"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Új célszám
              </Button>
            </div>

            <div className="flex items-center justify-center gap-3 p-3 bg-purple-50/60 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-900/60">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Keresd meg ezt a számot a 0–100-as skálán:</span>
              <span className="px-4 py-1.5 rounded-xl bg-purple-600 text-white font-mono font-black text-xl shadow-xs">
                {gameTarget}
              </span>
            </div>

            {/* Clickable SVG number line */}
            <div className="relative p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-crosshair">
              <svg
                viewBox="0 0 760 90"
                className="w-full h-auto"
                onClick={handleMiniGameClick}
              >
                {/* Axis line */}
                <line x1="30" y1="45" x2="730" y2="45" stroke="#64748b" strokeWidth="3" />
                <polygon points="730,40 745,45 730,50" fill="#64748b" />

                {/* Major ticks at 0, 10, 20... 100 */}
                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((val) => {
                  const x = 30 + (val / 100) * 700;
                  return (
                    <g key={val}>
                      <line x1={x} y1="35" x2={x} y2="55" stroke="#334155" strokeWidth="2" />
                      <text x={x} y="72" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#64748b">
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* User Clicked Marker */}
                {gameClicked !== null && (
                  <g>
                    {(() => {
                      const x = 30 + (gameClicked / 100) * 700;
                      return (
                        <g>
                          <line x1={x} y1="20" x2={x} y2="70" stroke="#f43f5e" strokeWidth="2" />
                          <circle cx={x} cy="45" r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
                          <text x={x} y="18" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#f43f5e">
                            Te: {gameClicked}
                          </text>
                        </g>
                      );
                    })()}
                  </g>
                )}

                {/* Actual Target Marker (Shown after click) */}
                {gameClicked !== null && (
                  <g>
                    {(() => {
                      const x = 30 + (gameTarget / 100) * 700;
                      return (
                        <g>
                          <line x1={x} y1="20" x2={x} y2="70" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
                          <circle cx={x} cy="45" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                          <text x={x} y="34" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#10b981">
                            Cél: {gameTarget}
                          </text>
                        </g>
                      );
                    })()}
                  </g>
                )}
              </svg>
            </div>

            {gameFeedback && (
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-purple-200 dark:border-purple-900/60 text-xs font-bold text-center text-purple-900 dark:text-purple-200">
                {gameFeedback}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default NumberLineTheory;
