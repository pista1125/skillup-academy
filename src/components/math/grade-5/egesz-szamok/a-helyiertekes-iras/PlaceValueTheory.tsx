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
  Table,
  Check,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportElementToPDF } from '@/utils/pdfExport';

interface PlaceValueTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function PlaceValueTheory({ onBack, onStartQuiz }: PlaceValueTheoryProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Interactive Tool State
  const [toolMode, setToolMode] = useState<'decompose' | 'builder'>('decompose');
  const [inputNum, setInputNum] = useState<string>('458203');

  // Builder mode state: counts for each place value
  const [builderCounts, setBuilderCounts] = useState<{ [key: string]: number }>({
    M: 0,
    Sze: 4,
    Te: 5,
    E: 8,
    Sz: 2,
    T: 0,
    e: 3
  });

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await exportElementToPDF('place-value-theory-content', 'Helyiertekes_Iras_Tananyag');
    setIsDownloading(false);
  };

  // Helper for decomposing a number
  const decomposeNumber = (valStr: string) => {
    const clean = valStr.replace(/\s+/g, '');
    const num = parseInt(clean, 10);
    if (isNaN(num) || num < 0 || num > 9999999) {
      return null;
    }

    const digits = num.toString().split('').map(Number);
    const len = digits.length;
    
    // Place value names and weights from right to left
    const placeDefs = [
      { name: 'egyes', short: 'e', weight: 1, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200' },
      { name: 'tízes', short: 'T', weight: 10, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200' },
      { name: 'százas', short: 'Sz', weight: 100, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-200' },
      { name: 'ezres', short: 'E', weight: 1000, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200' },
      { name: 'tízezres', short: 'Té', weight: 10000, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-200' },
      { name: 'százezres', short: 'Sze', weight: 100000, color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200' },
      { name: 'milliós', short: 'M', weight: 1000000, color: 'text-orange-600 bg-orange-50 dark:bg-orange-950/40 border-orange-200' }
    ];

    const breakdown = digits.map((digit, idx) => {
      const power = len - 1 - idx;
      const def = placeDefs[power] || { name: 'helyiérték', short: '?', weight: Math.pow(10, power), color: '' };
      const realValue = digit * def.weight;
      return {
        digit,
        name: def.name,
        short: def.short,
        weight: def.weight,
        realValue,
        color: def.color,
        formattedWeight: def.weight.toLocaleString('hu-HU'),
        formattedRealValue: realValue.toLocaleString('hu-HU')
      };
    });

    const sumTerms = breakdown
      .filter((b) => b.realValue > 0)
      .map((b) => b.formattedRealValue);

    const productTerms = breakdown
      .filter((b) => b.digit > 0)
      .map((b) => `${b.digit} · ${b.formattedWeight}`);

    return {
      num,
      formattedNum: num.toLocaleString('hu-HU'),
      breakdown,
      sumFormula: sumTerms.length > 0 ? sumTerms.join(' + ') : '0',
      productFormula: productTerms.length > 0 ? productTerms.join(' + ') : '0'
    };
  };

  const decompResult = decomposeNumber(inputNum);

  // Compute built number from builder mode
  const placeWeights: { [key: string]: { name: string; weight: number; short: string } } = {
    M: { name: 'Milliós', weight: 1000000, short: 'M' },
    Sze: { name: 'Százezres', weight: 100000, short: 'Sze' },
    Te: { name: 'Tízezres', weight: 10000, short: 'Té' },
    E: { name: 'Ezres', weight: 1000, short: 'E' },
    Sz: { name: 'Százas', weight: 100, short: 'Sz' },
    T: { name: 'Tízes', weight: 10, short: 'T' },
    e: { name: 'Egyes', weight: 1, short: 'e' }
  };

  let builtTotal = 0;
  const builtFormulaParts: string[] = [];
  Object.keys(placeWeights).forEach((k) => {
    const count = builderCounts[k] || 0;
    const w = placeWeights[k].weight;
    if (count > 0) {
      builtTotal += count * w;
      builtFormulaParts.push(`${count} · ${w.toLocaleString('hu-HU')}`);
    }
  });

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
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Vissza a témakörökhöz
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
        id="place-value-theory-content"
        className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 p-5 sm:p-8 shadow-sm space-y-8"
      >
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 mb-2 border border-blue-200 dark:border-blue-800">
              <span>🔢 5. Osztály • I. Az egész számok</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              A helyiértékes írás
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Alaki érték, helyiérték, valódi érték, helyiérték-táblázat és szorzatos felbontás
            </p>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-slate-800/80 rounded-2xl border border-blue-200/60 dark:border-slate-700 text-center shrink-0">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Számrendszer</div>
            <div className="text-xl font-black text-blue-700 dark:text-blue-300 font-mono">10-es alapú</div>
            <div className="text-[10px] text-slate-400">decimális rendszer</div>
          </div>
        </div>

        {/* Section 1: Decimal System Basics */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center font-serif text-sm font-black">
              1.
            </div>
            <h2>A tízes számrendszer alapelve</h2>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2 bg-slate-50/70 dark:bg-slate-850/50 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800">
            <p>
              A mindennapi életben és a matematikában használt számrendszerünk <strong>helyiértékes tízes számrendszer</strong> (decimális rendszer).
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>
                <strong>Alapszáma a 10</strong>: 10 darab egyes ad 1 tízest, 10 tízes ad 1 százast, 10 százas ad 1 ezrest, és így tovább. Minden helyiérték a tőle jobbra lévő <strong>10-szerese</strong>.
              </li>
              <li>
                <strong>Számjegyek száma (10 db)</strong>: Összesen 10 darab alapszámjegyet használunk a számok leírására: <code className="font-bold text-blue-700 dark:text-blue-300">0, 1, 2, 3, 4, 5, 6, 7, 8, 9</code>.
              </li>
              <li>
                <strong>A helyiérték elve</strong>: Ugyanaz a számjegy teljesen más mennyiséget képvisel attól függően, hogy <strong>melyik helyen áll</strong> a számban!
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: The 3 Values (Alaki, Helyi-, Valódi érték) */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center font-serif text-sm font-black">
              2.
            </div>
            <h2>A 3 féle érték fogalma</h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Minden többjegyű számban minden egyes számjegy három különböző tulajdonsággal (értékkel) bír:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Alaki érték */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800/80 shadow-xs space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-black uppercase">
                1. Alaki érték
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">Maga a leírt számjegy</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A számjegy formája, kinézete, függetlenül attól, hogy hol áll a számban (0, 1, 2, ..., 9).
              </p>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
                Példa a <strong>745</strong>-ben:<br />
                A 7 alaki értéke: <strong>7</strong><br />
                A 4 alaki értéke: <strong>4</strong><br />
                Az 5 alaki értéke: <strong>5</strong>
              </div>
            </div>

            {/* Helyiérték */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-blue-800/80 shadow-xs space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[11px] font-black uppercase">
                2. Helyiérték
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">A pozíció súlya</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Azt adja meg, hogy az adott pozícióban lévő számjegy <strong>hányszorost</strong> ér (egyes, tízes, százas, ezres...).
              </p>
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-xs font-mono font-bold text-blue-800 dark:text-blue-300">
                Példa a <strong>745</strong>-ben:<br />
                A 7 helyiértéke: <strong>100 (százas)</strong><br />
                A 4 helyiértéke: <strong>10 (tízes)</strong><br />
                Az 5 helyiértéke: <strong>1 (egyes)</strong>
              </div>
            </div>

            {/* Valódi érték */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-purple-200 dark:border-purple-800/80 shadow-xs space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 text-[11px] font-black uppercase">
                3. Valódi érték
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">Alaki érték · Helyiérték</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A tényleges mennyiség, amit az adott számjegy kifejez az adott pozícióban.
              </p>
              <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl text-xs font-mono font-bold text-purple-800 dark:text-purple-300">
                Példa a <strong>745</strong>-ben:<br />
                A 7 valódi értéke: <strong>7 · 100 = 700</strong><br />
                A 4 valódi értéke: <strong>4 · 10 = 40</strong><br />
                Az 5 valódi értéke: <strong>5 · 1 = 5</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Place Value Table & Decompositions */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center font-serif text-sm font-black">
              3.
            </div>
            <h2>A helyiérték-táblázat és a számok felbontása</h2>
          </div>

          {/* Place Value Table Reference */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-center text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-black">
                  <th className="p-2 border border-slate-300 dark:border-slate-700">Milliós</th>
                  <th className="p-2 border border-slate-300 dark:border-slate-700">Százezres</th>
                  <th className="p-2 border border-slate-300 dark:border-slate-700">Tízezres</th>
                  <th className="p-2 border border-slate-300 dark:border-slate-700">Ezres</th>
                  <th className="p-2 border border-slate-300 dark:border-slate-700">Százas</th>
                  <th className="p-2 border border-slate-300 dark:border-slate-700">Tízes</th>
                  <th className="p-2 border border-slate-300 dark:border-slate-700">Egyes</th>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-850 text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                  <th className="p-1 border border-slate-300 dark:border-slate-700">M (1 000 000)</th>
                  <th className="p-1 border border-slate-300 dark:border-slate-700">Sze (100 000)</th>
                  <th className="p-1 border border-slate-300 dark:border-slate-700">Té (10 000)</th>
                  <th className="p-1 border border-slate-300 dark:border-slate-700">E (1 000)</th>
                  <th className="p-1 border border-slate-300 dark:border-slate-700">Sz (100)</th>
                  <th className="p-1 border border-slate-300 dark:border-slate-700">T (10)</th>
                  <th className="p-1 border border-slate-300 dark:border-slate-700">e (1)</th>
                </tr>
              </thead>
              <tbody className="font-mono font-bold text-sm">
                <tr className="bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300">
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">—</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">4</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">5</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">8</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">2</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">0</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">3</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Decompositions explanations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="text-[11px] font-black uppercase text-blue-700 dark:text-blue-300 block">
                A) Helyiértékes összeg-alak:
              </span>
              <div className="font-mono text-xs text-slate-800 dark:text-slate-200 font-bold">
                458 203 = 400 000 + 50 000 + 8 000 + 200 + 3
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                A számjegyek valódi értékeinek összegeként írjuk fel. A 0 értékű helyiértéket kihagyjuk.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="text-[11px] font-black uppercase text-indigo-700 dark:text-indigo-300 block">
                B) Helyiértékes szorzatos alak:
              </span>
              <div className="font-mono text-xs text-slate-800 dark:text-slate-200 font-bold">
                458 203 = 4·100 000 + 5·10 000 + 8·1 000 + 2·100 + 3·1
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Minden számjegyet megszorzunk a saját helyiértékével (alaki érték · helyiérték).
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: The Role of 0 and Place Value Shifts */}
        <section className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 border-2 border-blue-300 dark:border-blue-700/80 space-y-2">
          <div className="flex items-center gap-2 font-black text-sm text-blue-900 dark:text-blue-200">
            <Lightbulb className="w-5 h-5 text-blue-600 shrink-0" />
            <h3>A nulla (0) szerepe és a helyiérték eltolódása</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            A <strong>0 (nulla)</strong> alaki értéke 0, valódi értéke is 0, de elengedhetetlen <strong>helykitöltő szerepe</strong> van!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">Nulla nélkül megváltozik az érték:</div>
              <div className="text-slate-600 dark:text-slate-300">
                <strong>503</strong> (ötszázhárom) ≠ <strong>53</strong> (ötvenhárom). A nulla biztosítja, hogy az 5 a százas helyen maradjon!
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">Szorzás 10-zel (eltolódás balra):</div>
              <div className="text-slate-600 dark:text-slate-300">
                Ha egy egész szám végére egy 0-t írunk, minden számjegy <strong>egy hellyel balra lép</strong>, így a valódi értéke a <strong>10-szeresére nő</strong>! (pl. 45 $\rightarrow$ 450).
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Interactive Two-Way Place Value Tool (no-pdf) */}
        <section className="p-4 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 space-y-4 no-pdf">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-700/80 pb-3">
            <div className="flex items-center gap-2 font-black text-sm sm:text-base text-slate-900 dark:text-white">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Calculator className="w-4 h-4" />
              </div>
              <h3>Interaktív Helyiérték Elemző és Építő</h3>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setToolMode('decompose')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
                  toolMode === 'decompose'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <span>🔍 Számból Helyiértékek</span>
              </button>
              <button
                type="button"
                onClick={() => setToolMode('builder')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
                  toolMode === 'builder'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <span>🏗️ Helyiértékekből Szám</span>
              </button>
            </div>
          </div>

          {/* Mode 1: Decompose number into place values */}
          {toolMode === 'decompose' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Írj be egy tetszőleges számot (1 – 9 999 999), és nézd meg az alaki, helyi- és valódi értékek interaktív táblázatát:
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative w-full sm:w-56">
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Vizsgált szám:</label>
                  <input
                    type="number"
                    min="0"
                    max="9999999"
                    value={inputNum}
                    onChange={(e) => setInputNum(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold text-lg text-slate-900 dark:text-white text-center focus:border-blue-500 focus:outline-hidden"
                    placeholder="Pl. 458203"
                  />
                </div>

                {decompResult && (
                  <div className="flex-1 p-3 bg-white dark:bg-slate-900 rounded-2xl border-2 border-blue-300 dark:border-blue-800/80 flex items-center justify-between shadow-xs">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Tagolt alak:</span>
                      <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
                        {decompResult.formattedNum}
                      </span>
                    </div>
                    <div className="text-right text-xs text-slate-500">
                      {decompResult.breakdown.length} számjegyű szám
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-400 mr-1">Minták:</span>
                {['508', '4050', '25840', '458203', '1004500', '7302094'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setInputNum(preset)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-colors',
                      inputNum === preset
                        ? 'bg-blue-100 border-blue-400 text-blue-900 dark:bg-blue-950 dark:text-blue-300'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300'
                    )}
                  >
                    {parseInt(preset, 10).toLocaleString('hu-HU')}
                  </button>
                ))}
              </div>

              {/* Dynamic Place Value Breakdown Table */}
              {decompResult && (
                <div className="space-y-3 pt-2">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-center text-xs">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold">
                          <th className="p-2 border border-slate-300 dark:border-slate-700 text-left">Tulajdonság</th>
                          {decompResult.breakdown.map((item, idx) => (
                            <th key={idx} className="p-2 border border-slate-300 dark:border-slate-700">
                              {item.name} ({item.short})
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="font-mono text-xs">
                        <tr className="bg-white dark:bg-slate-900">
                          <td className="p-2 border border-slate-300 dark:border-slate-700 text-left font-bold text-slate-600 dark:text-slate-300">
                            Alaki érték:
                          </td>
                          {decompResult.breakdown.map((item, idx) => (
                            <td key={idx} className="p-2 border border-slate-300 dark:border-slate-700 font-black text-base text-blue-700 dark:text-blue-400">
                              {item.digit}
                            </td>
                          ))}
                        </tr>
                        <tr className="bg-slate-50/50 dark:bg-slate-850/50">
                          <td className="p-2 border border-slate-300 dark:border-slate-700 text-left font-bold text-slate-600 dark:text-slate-300">
                            Helyiérték:
                          </td>
                          {decompResult.breakdown.map((item, idx) => (
                            <td key={idx} className="p-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                              {item.formattedWeight}
                            </td>
                          ))}
                        </tr>
                        <tr className="bg-white dark:bg-slate-900">
                          <td className="p-2 border border-slate-300 dark:border-slate-700 text-left font-bold text-slate-600 dark:text-slate-300">
                            Valódi érték:
                          </td>
                          {decompResult.breakdown.map((item, idx) => (
                            <td key={idx} className="p-2 border border-slate-300 dark:border-slate-700 font-bold text-purple-700 dark:text-purple-300">
                              {item.formattedRealValue}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Formulas */}
                  <div className="p-3 bg-blue-50/70 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-1.5 text-xs font-mono">
                    <div>
                      <span className="font-bold text-blue-900 dark:text-blue-200">Összegalak: </span>
                      <span className="text-slate-800 dark:text-slate-200">{decompResult.formattedNum} = {decompResult.sumFormula}</span>
                    </div>
                    <div>
                      <span className="font-bold text-indigo-900 dark:text-indigo-200">Szorzatos alak: </span>
                      <span className="text-slate-800 dark:text-slate-200">{decompResult.formattedNum} = {decompResult.productFormula}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mode 2: Place Value Builder */}
          {toolMode === 'builder' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Állítsd be az egyes helyiértékeken lévő darabszámokat, és nézd meg az összerakott számot:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {Object.keys(placeWeights).map((key) => {
                  const info = placeWeights[key];
                  const count = builderCounts[key] || 0;
                  return (
                    <div key={key} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-1 shadow-2xs">
                      <div className="text-[11px] font-bold text-slate-400">{info.name}</div>
                      <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">({info.short})</div>
                      <div className="flex items-center justify-center gap-1 pt-1">
                        <button
                          type="button"
                          onClick={() => setBuilderCounts((prev) => ({ ...prev, [key]: Math.max(0, count - 1) }))}
                          className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-black text-xs"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-black text-sm text-slate-900 dark:text-white font-mono">
                          {count}
                        </span>
                        <button
                          type="button"
                          onClick={() => setBuilderCounts((prev) => ({ ...prev, [key]: Math.min(9, count + 1) }))}
                          className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-black text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reset button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setBuilderCounts({ M: 0, Sze: 0, Te: 0, E: 0, Sz: 0, T: 0, e: 0 })}
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Nullázás
                </button>
              </div>

              {/* Result card */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-emerald-300 dark:border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Összeállított szám:</span>
                  <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {builtTotal.toLocaleString('hu-HU')}
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-300 text-right">
                  {builtFormulaParts.length > 0 ? builtFormulaParts.join(' + ') : '0'}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Footer info */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-4 text-center text-[11px] text-slate-400">
          SkillUp Academy • 5. Osztály Matematika • Oktatási Tananyag
        </div>
      </div>
    </div>
  );
}

export default PlaceValueTheory;
