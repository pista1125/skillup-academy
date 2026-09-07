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
  ArrowUpRight,
  ArrowDownRight,
  Sliders,
  RotateCcw,
  Zap,
  TrendingUp,
  Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportElementToPDF } from '@/utils/pdfExport';

interface RoundingTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

type RoundingPlace = 10 | 100 | 1000 | 10000 | 100000;

export function RoundingTheory({ onBack, onStartQuiz }: RoundingTheoryProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Interactive Simulator State
  const [inputNumber, setInputNumber] = useState<string>('4376');
  const [targetPlace, setTargetPlace] = useState<RoundingPlace>(100);

  // Estimation Calculator State
  const [estNum1, setEstNum1] = useState<string>('384');
  const [estNum2, setEstNum2] = useState<string>('195');
  const [estOp, setEstOp] = useState<'+' | '-' | '*' | '/'>('+');
  const [estPlace, setEstPlace] = useState<RoundingPlace>(100);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await exportElementToPDF('rounding-theory-content', 'Becsles_Kerekites_Tananyag');
    setIsDownloading(false);
  };

  // Helper for Rounding logic and explanation
  const getRoundingAnalysis = (numStr: string, place: RoundingPlace) => {
    const num = parseInt(numStr, 10);
    if (isNaN(num) || num < 0 || num > 9999999) return null;

    const rounded = Math.round(num / place) * place;
    const lower = Math.floor(num / place) * place;
    const upper = lower + place;
    const midpoint = lower + place / 2;

    const placeIdxFromRight = Math.log10(place); // 1 for 10, 2 for 100, 3 for 1000...
    const digitString = num.toString();
    const len = digitString.length;

    // Decision digit is the digit immediately to the right of the rounding place
    const decisionIdx = len - placeIdxFromRight;
    const decisionDigit = decisionIdx >= 0 && decisionIdx < len ? parseInt(digitString[decisionIdx], 10) : 0;
    const isRoundUp = decisionDigit >= 5;

    return {
      num,
      rounded,
      lower,
      upper,
      midpoint,
      decisionDigit,
      isRoundUp,
      placeName:
        place === 10
          ? 'tízesekre'
          : place === 100
          ? 'százasokra'
          : place === 1000
          ? 'ezresekre'
          : place === 10000
          ? 'tízezresekre'
          : 'százezresekre'
    };
  };

  const analysis = getRoundingAnalysis(inputNumber, targetPlace);

  // Estimation Calculator helper
  const getEstimationAnalysis = () => {
    const n1 = parseInt(estNum1, 10);
    const n2 = parseInt(estNum2, 10);
    if (isNaN(n1) || isNaN(n2) || (n2 === 0 && estOp === '/')) return null;

    let exact = 0;
    if (estOp === '+') exact = n1 + n2;
    else if (estOp === '-') exact = n1 - n2;
    else if (estOp === '*') exact = n1 * n2;
    else if (estOp === '/') exact = Math.round((n1 / n2) * 100) / 100;

    const r1 = Math.round(n1 / estPlace) * estPlace;
    const r2 = Math.round(n2 / estPlace) * estPlace;

    let estimated = 0;
    if (estOp === '+') estimated = r1 + r2;
    else if (estOp === '-') estimated = r1 - r2;
    else if (estOp === '*') estimated = r1 * r2;
    else if (estOp === '/') estimated = r2 !== 0 ? Math.round((r1 / r2) * 100) / 100 : 0;

    const diff = Math.abs(exact - estimated);

    return { n1, n2, exact, r1, r2, estimated, diff };
  };

  const estAnalysis = getEstimationAnalysis();

  return (
    <div className="w-full px-2 sm:px-4 py-3 animate-in fade-in duration-300 text-left">
      {/* Top action header */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-5">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="rounded-xl h-9 px-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Vissza a témakörökhöz
        </Button>

        <div className="flex items-center gap-2">
          {onStartQuiz && (
            <Button
              variant="outline"
              size="sm"
              onClick={onStartQuiz}
              className="rounded-xl h-9 px-3 border-teal-300 bg-teal-50/60 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800 hover:bg-teal-100 text-xs sm:text-sm font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-teal-600" />
              Gyakorló Kvíz indítása
            </Button>
          )}

          <Button
            size="sm"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="rounded-xl h-9 px-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            {isDownloading ? 'Letöltés...' : 'Tananyag letöltése (PDF)'}
          </Button>
        </div>
      </div>

      {/* Main Printable Theory Container */}
      <div
        id="rounding-theory-content"
        className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 p-5 sm:p-8 shadow-sm space-y-8"
      >
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 mb-2 border border-teal-200 dark:border-teal-800">
              <span>🎯 5. Osztály • I. Az egész számok</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Becslés, kerekítés
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Részletes elméleti összefoglaló, kerekítési szabályok, 9-es átcsapódás, interaktív szimulátor és műveleti becslés
            </p>
          </div>

          <div className="p-3 bg-teal-50 dark:bg-slate-800/80 rounded-2xl border border-teal-200/60 dark:border-slate-700 text-center shrink-0">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Számkör</div>
            <div className="text-lg font-black text-teal-700 dark:text-teal-300">1 – 10 000 000</div>
          </div>
        </div>

        {/* SECTION 1: ELMÉLETI BEVEZETÉS */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300 flex items-center justify-center font-serif text-sm font-black">
              1.
            </div>
            <h2>A kerekítés fogalma, célja és jelentősége</h2>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2 bg-slate-50/70 dark:bg-slate-850/50 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800">
            <p>
              A mindennapi életben és a tudományban sok esetben nincs szükség a számok hajszálpontos értékére. Amikor azt mondjuk, hogy <em>„Budapest lakossága körülbelül 1 700 000 fő”</em> vagy <em>„a két város távolsága kb. 230 km”</em>, akkor <strong>kerekített értékekkel</strong> fejezzük ki a mennyiséget.
            </p>
            <p>
              A <strong>kerekítés</strong> azt jelenti, hogy egy adott számot egy hozzá nagyon közeli, könnyebben megjegyezhető és gyorsabban kezelhető <strong>kerek számmal</strong> (pl. 10-zel, 100-zal, 1 000-rel osztható számmal) helyettesítünk. A kerekített érték jelölésére a hullámos egyenlőségjelet (<strong>≈</strong>) használjuk, amelynek jelentése: <em>„megközelítőleg egyenlő”</em>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 bg-teal-50/60 dark:bg-slate-850 rounded-xl border border-teal-100 dark:border-slate-700 text-xs">
              <strong className="text-teal-800 dark:text-teal-300 block mb-1">🛒 Készpénzfizetés</strong>
              A bolti vásárlásnál a készpénzes végösszeget 5 Ft-ra kerekítjük a gyors fizetésért.
            </div>
            <div className="p-3 bg-teal-50/60 dark:bg-slate-850 rounded-xl border border-teal-100 dark:border-slate-700 text-xs">
              <strong className="text-teal-800 dark:text-teal-300 block mb-1">📊 Statisztikák és adatok</strong>
              Nagy lakosságszámok, hegycsúcsok magassága, országok területe kerekítve szerepel.
            </div>
            <div className="p-3 bg-teal-50/60 dark:bg-slate-850 rounded-xl border border-teal-100 dark:border-slate-700 text-xs">
              <strong className="text-teal-800 dark:text-teal-300 block mb-1">💡 Számolási ellenőrzés</strong>
              Műveletek előtt becslést végzünk, hogy a durva elszámolásokat azonnal észrevegyük.
            </div>
          </div>
        </section>

        {/* SECTION 2: A KEREKÍTÉS ARANYSZABÁLYA */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300 flex items-center justify-center font-serif text-sm font-black">
              2.
            </div>
            <h2>A kerekítés aranyszabálya: A döntő számjegy</h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            A kerekítés iránya sosem találomra dől el: mindig a kerekítendő helyiérték <strong>közvetlenül utána (jobbra)</strong> álló számjegye, a <strong>döntő számjegy</strong> határozza meg a szabályt:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lefelé kerekítés */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50/60 dark:from-slate-850 dark:to-slate-800 border-2 border-blue-200/80 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 font-black text-sm">
                <ArrowDownRight className="w-5 h-5 text-blue-600" />
                <span>Lefelé kerekítés (0, 1, 2, 3, 4)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha a döntő számjegy <strong>0, 1, 2, 3 vagy 4</strong>, akkor a kerekítendő helyiérték <strong>változatlan marad</strong>, és a tőle jobbra lévő összes számjegy helyére <strong>0 (nulla)</strong> kerül.
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded-xl font-mono text-xs font-bold text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-slate-700">
                Példa: 4 3<span className="text-rose-500 underline">2</span>6 százasra ➔ <strong>4 300</strong>
              </div>
            </div>

            {/* Felfelé kerekítés */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/60 dark:from-slate-850 dark:to-slate-800 border-2 border-emerald-200/80 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-black text-sm">
                <ArrowUpRight className="w-5 h-5 text-emerald-600" />
                <span>Felfelé kerekítés (5, 6, 7, 8, 9)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha a döntő számjegy <strong>5, 6, 7, 8 vagy 9</strong>, akkor a kerekítendő helyiértékhez <strong>1-et hozzáadunk</strong>, és a tőle jobbra lévő összes számjegy helyére <strong>0 (nulla)</strong> kerül.
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded-xl font-mono text-xs font-bold text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-slate-700">
                Példa: 4 3<span className="text-emerald-500 underline">7</span>6 százasra ➔ <strong>4 400</strong>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: PÉLDATÁR HELYIÉRTÉKEK SZERINT */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300 flex items-center justify-center font-serif text-sm font-black">
              3.
            </div>
            <h2>Kerekítés helyiértékek szerint (Példatár a 4 376 számra)</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-2.5">Kerekítendő hely</th>
                  <th className="p-2.5">Döntő jegy helye</th>
                  <th className="p-2.5">Döntő jegy</th>
                  <th className="p-2.5">Szabály és irány</th>
                  <th className="p-2.5">Kerekített érték</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850">
                  <td className="p-2.5 font-sans font-bold">Tízesekre (10)</td>
                  <td className="p-2.5 font-sans">Egyesek</td>
                  <td className="p-2.5 font-bold text-teal-600">6</td>
                  <td className="p-2.5 font-sans font-bold text-emerald-600">6 ≥ 5 ➔ Felfelé</td>
                  <td className="p-2.5 font-bold text-slate-900 dark:text-white">4 380</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850">
                  <td className="p-2.5 font-sans font-bold">Százasokra (100)</td>
                  <td className="p-2.5 font-sans">Tízesek</td>
                  <td className="p-2.5 font-bold text-teal-600">7</td>
                  <td className="p-2.5 font-sans font-bold text-emerald-600">7 ≥ 5 ➔ Felfelé</td>
                  <td className="p-2.5 font-bold text-slate-900 dark:text-white">4 400</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850">
                  <td className="p-2.5 font-sans font-bold">Ezresekre (1 000)</td>
                  <td className="p-2.5 font-sans">Százasok</td>
                  <td className="p-2.5 font-bold text-teal-600">3</td>
                  <td className="p-2.5 font-sans font-bold text-blue-600">3 &lt; 5 ➔ Lefelé</td>
                  <td className="p-2.5 font-bold text-slate-900 dark:text-white">4 000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 4: INTERAKTÍV KEREKÍTÉS SZIMULÁTOR */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300 flex items-center justify-center font-serif text-sm font-black">
              4.
            </div>
            <h2>Interaktív Kerekítés Szimulátor és Számegyenes Modell</h2>
          </div>

          <Card className="border-2 border-teal-200 dark:border-teal-900 shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-4 sm:p-6 space-y-5">
              {/* Input and Preset row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="w-full sm:w-auto flex-1 max-w-xs">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                    Kerekítendő szám:
                  </label>
                  <input
                    type="number"
                    value={inputNumber}
                    onChange={(e) => setInputNumber(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-teal-300 dark:border-teal-700 font-mono text-xl font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-teal-500 shadow-inner"
                    placeholder="pl. 4376"
                    min="0"
                    max="9999999"
                  />
                </div>

                {/* Quick Presets */}
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                    Gyors minták kipróbálása:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {['347', '4376', '2985', '496', '18492', '99720'].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setInputNumber(preset)}
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all border",
                          inputNumber === preset
                            ? "bg-teal-600 text-white border-teal-600 shadow-xs"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200"
                        )}
                      >
                        {parseInt(preset, 10).toLocaleString('hu-HU')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Target Place Selector Buttons */}
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-2">
                  Kerekítendő helyiérték kiválasztása:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {([
                    { val: 10, label: 'Tízesekre', note: '10' },
                    { val: 100, label: 'Százasokra', note: '100' },
                    { val: 1000, label: 'Ezresekre', note: '1 000' },
                    { val: 10000, label: 'Tízezresekre', note: '10 000' },
                    { val: 100000, label: 'Százezresekre', note: '100 000' }
                  ] as { val: RoundingPlace; label: string; note: string }[]).map((p) => (
                    <button
                      key={p.val}
                      onClick={() => setTargetPlace(p.val)}
                      className={cn(
                        "p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center",
                        targetPlace === p.val
                          ? "bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-900 dark:text-teal-200 shadow-sm ring-2 ring-teal-500/20"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-teal-300"
                      )}
                    >
                      <span className="text-xs font-black">{p.label}</span>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">({p.note})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Analysis Box */}
              {analysis && (
                <div className="space-y-4 pt-2">
                  {/* Result Highlight Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-850 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                        Kerekítés eredménye ({analysis.placeName}):
                      </div>
                      <div className="flex items-center gap-3 font-mono text-2xl sm:text-3xl font-black">
                        <span className="text-slate-300">{analysis.num.toLocaleString('hu-HU')}</span>
                        <span className="text-teal-400">≈</span>
                        <span className="text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-xl border border-emerald-500/50 shadow-inner">
                          {analysis.rounded.toLocaleString('hu-HU')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {analysis.isRoundUp ? (
                        <div className="px-3.5 py-2 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-black flex items-center gap-1.5">
                          <ArrowUpRight className="w-4 h-4 text-amber-400" />
                          FELFELÉ KEREKÍTÉS (≥ 5)
                        </div>
                      ) : (
                        <div className="px-3.5 py-2 rounded-xl bg-blue-500/20 border border-blue-500/50 text-blue-300 text-xs font-black flex items-center gap-1.5">
                          <ArrowDownRight className="w-4 h-4 text-blue-400" />
                          LEFELÉ KEREKÍTÉS (&lt; 5)
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step by Step Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-slate-50 dark:bg-slate-850 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">1. Döntő számjegy</div>
                      <div className="text-base font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-lg bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 font-mono">
                          {analysis.decisionDigit}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">a közvetlen jobb szomszéd</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-850 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">2. Döntési szabály</div>
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        {analysis.decisionDigit} {analysis.isRoundUp ? '≥ 5 ➔ felfelé kerekítünk' : '< 5 ➔ lefelé kerekítünk'}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-850 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">3. Két szomszédos kerek érték</div>
                      <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                        {analysis.lower.toLocaleString('hu-HU')} és {analysis.upper.toLocaleString('hu-HU')}
                      </div>
                    </div>
                  </div>

                  {/* Number Line Visualizer Bar */}
                  <div className="p-4 bg-teal-50/60 dark:bg-slate-850/80 rounded-2xl border border-teal-200/60 dark:border-slate-700 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
                      <span>Alsó kerek érték: {analysis.lower.toLocaleString('hu-HU')}</span>
                      <span className="text-teal-600 dark:text-teal-400 font-mono">Felezőpont: {analysis.midpoint.toLocaleString('hu-HU')}</span>
                      <span>Felső kerek érték: {analysis.upper.toLocaleString('hu-HU')}</span>
                    </div>

                    <div className="relative h-6 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex items-center">
                      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-amber-400 z-10" />
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-300",
                          analysis.isRoundUp ? "bg-emerald-500" : "bg-blue-500"
                        )}
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(0, ((analysis.num - analysis.lower) / (analysis.upper - analysis.lower || 1)) * 100)
                          )}%`
                        }}
                      />
                    </div>

                    <div className="text-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      A(z) <strong>{analysis.num.toLocaleString('hu-HU')}</strong> szám közelebb van a(z){' '}
                      <strong className="text-teal-700 dark:text-teal-300">{analysis.rounded.toLocaleString('hu-HU')}</strong>-hoz.
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* SECTION 5: KÜLÖNLEGES ESETEK ÉS INTERVALLUMOK */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300 flex items-center justify-center font-serif text-sm font-black">
              5.
            </div>
            <h2>Különleges esetek: A 9-es átcsapódása és kerekítési intervallumok</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 9-es átcsapódása */}
            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border-2 border-amber-200/80 dark:border-amber-900/60 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-black text-sm">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span>A 9-es átcsapódása</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha a kerekítendő helyen <strong>9-es</strong> áll és felfelé kell kerekíteni, a 9-esből 0 lesz, az előtte lévő helyiérték pedig 1-gyel nő (átviteles összeadás):
              </p>
              <div className="space-y-1.5 pt-1 font-mono text-xs">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-slate-700">
                  496 tízesekre ➔ <strong className="text-emerald-600">500</strong> (49 tízes + 1 = 50 tízes)
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-slate-700">
                  9 972 százasokra ➔ <strong className="text-emerald-600">10 000</strong> (99 százas + 1 = 100 százas)
                </div>
              </div>
            </div>

            {/* Kerekítési intervallumok */}
            <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-slate-850 border-2 border-teal-200/80 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-teal-900 dark:text-teal-200 font-black text-sm">
                <Scale className="w-5 h-5 text-teal-600" />
                <span>Kerekítési intervallumok (Visszafelé gondolkodás)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Mely számok kerekíthetők egy adott kerek értékre? Például mely számok kerekített értéke <strong>600</strong> százasokra kerekítve?
              </p>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc list-inside pt-1">
                <li>Legkisebb szám: <strong className="text-teal-600">550</strong> (5 ≥ 5 ➔ 600)</li>
                <li>Legnagyobb szám: <strong className="text-teal-600">649</strong> (4 &lt; 5 ➔ 600)</li>
                <li>Tartomány: <strong>550 ≤ x ≤ 649</strong> (pontosan 100 darab szám).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: MŰVELETI BECSLÉS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300 flex items-center justify-center font-serif text-sm font-black">
              6.
            </div>
            <h2>Műveleti eredmények előzetes becslése</h2>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/70 dark:bg-slate-850/50 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800">
            <p>
              Írásbeli műveletek (összeadás, kivonás, szorzás, osztás) elvégzése előtt mindig érdemes <strong>kerekített értékekkel becslést végezni</strong> ($P \approx B$). Így azonnal észrevehetjük, ha a pontos számolás során nagyságrendi hibát vétettünk (pl. lemaradt egy nulla vagy rossz helyre került egy jegy).
            </p>
          </div>

          {/* Interactive Calculator */}
          <Card className="border-2 border-emerald-200 dark:border-emerald-900 shadow-sm rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-850 dark:to-slate-800 p-4 border-b border-emerald-100 dark:border-slate-700">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                <Calculator className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm sm:text-base font-black">
                  Próbáld ki: Műveleti Becslés Szimulátor
                </h3>
              </div>
            </div>

            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    1. Szám:
                  </label>
                  <input
                    type="number"
                    value={estNum1}
                    onChange={(e) => setEstNum1(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    Művelet:
                  </label>
                  <div className="flex rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900">
                    {(['+', '-', '*', '/'] as const).map((op) => (
                      <button
                        key={op}
                        onClick={() => setEstOp(op)}
                        className={cn(
                          "flex-1 py-2 font-mono font-black text-sm transition-all",
                          estOp === op
                            ? "bg-emerald-600 text-white"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                      >
                        {op === '*' ? '·' : op === '/' ? ':' : op}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    2. Szám:
                  </label>
                  <input
                    type="number"
                    value={estNum2}
                    onChange={(e) => setEstNum2(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    Becslés pontossága:
                  </label>
                  <select
                    value={estPlace}
                    onChange={(e) => setEstPlace(Number(e.target.value) as RoundingPlace)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value={10}>Tízesekre (10)</option>
                    <option value={100}>Százasokra (100)</option>
                    <option value={1000}>Ezresekre (1 000)</option>
                  </select>
                </div>
              </div>

              {estAnalysis && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Pontos eredmény (P)
                    </div>
                    <div className="text-xl font-mono font-black text-slate-900 dark:text-white">
                      {estAnalysis.n1} {estOp === '*' ? '·' : estOp === '/' ? ':' : estOp} {estAnalysis.n2} ={' '}
                      <span className="text-emerald-600 dark:text-emerald-400">{estAnalysis.exact.toLocaleString('hu-HU')}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Becsült érték (B)
                    </div>
                    <div className="text-xl font-mono font-black text-slate-900 dark:text-white">
                      {estAnalysis.r1} {estOp === '*' ? '·' : estOp === '/' ? ':' : estOp} {estAnalysis.r2} ≈{' '}
                      <span className="text-teal-600 dark:text-teal-400">{estAnalysis.estimated.toLocaleString('hu-HU')}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Eltérés (|P - B|)
                    </div>
                    <div className="text-xl font-mono font-black text-slate-700 dark:text-slate-300">
                      Δ = {estAnalysis.diff.toLocaleString('hu-HU')}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default RoundingTheory;
