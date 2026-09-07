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
  History,
  FileText,
  Printer,
  ChevronRight,
  Calculator,
  Info,
  ArrowRightLeft,
  AlertCircle,
  Delete,
  Check,
  X as CloseIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportElementToPDF } from '@/utils/pdfExport';

interface RomanNumeralsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function RomanNumeralsTheory({ onBack, onStartQuiz }: RomanNumeralsTheoryProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Converter state
  const [converterMode, setConverterMode] = useState<'arabic-to-roman' | 'roman-to-arabic'>('arabic-to-roman');
  const [inputNum, setInputNum] = useState<string>('44');
  const [inputRoman, setInputRoman] = useState<string>('XLIX');

  // Convert Arabic (1-100) to Roman with steps
  const toRoman = (num: number): { roman: string; tensPart: string; onesPart: string; steps: string[]; explanation: string } => {
    if (isNaN(num) || num < 1 || num > 100) {
      return { roman: '—', tensPart: '', onesPart: '', steps: [], explanation: 'Adj meg egy 1 és 100 közötti egész számot!' };
    }

    if (num === 100) {
      return {
        roman: 'C',
        tensPart: 'C',
        onesPart: '',
        steps: ['100 = C (egy darab 100-as alapjel)'],
        explanation: '100 = C'
      };
    }

    const tens = Math.floor(num / 10) * 10;
    const ones = num % 10;

    const tensMap: { [key: number]: { r: string; desc: string } } = {
      0: { r: '', desc: '' },
      10: { r: 'X', desc: '10 = X' },
      20: { r: 'XX', desc: '20 = X + X' },
      30: { r: 'XXX', desc: '30 = X + X + X' },
      40: { r: 'XL', desc: '40 = 50 - 10 (XL, kivonás)' },
      50: { r: 'L', desc: '50 = L' },
      60: { r: 'LX', desc: '60 = 50 + 10 (LX, összeadás)' },
      70: { r: 'LXX', desc: '70 = 50 + 10 + 10 (LXX, összeadás)' },
      80: { r: 'LXXX', desc: '80 = 50 + 10 + 10 + 10 (LXXX, összeadás)' },
      90: { r: 'XC', desc: '90 = 100 - 10 (XC, kivonás)' }
    };

    const onesMap: { [key: number]: { r: string; desc: string } } = {
      0: { r: '', desc: '' },
      1: { r: 'I', desc: '1 = I' },
      2: { r: 'II', desc: '2 = I + I' },
      3: { r: 'III', desc: '3 = I + I + I' },
      4: { r: 'IV', desc: '4 = 5 - 1 (IV, kivonás)' },
      5: { r: 'V', desc: '5 = V' },
      6: { r: 'VI', desc: '6 = 5 + 1 (VI, összeadás)' },
      7: { r: 'VII', desc: '7 = 5 + 1 + 1 (VII, összeadás)' },
      8: { r: 'VIII', desc: '8 = 5 + 1 + 1 + 1 (VIII, összeadás)' },
      9: { r: 'IX', desc: '9 = 10 - 1 (IX, kivonás)' }
    };

    const tensData = tensMap[tens] || { r: '', desc: '' };
    const onesData = onesMap[ones] || { r: '', desc: '' };
    const fullRoman = tensData.r + onesData.r;

    const steps: string[] = [];
    if (tens > 0) steps.push(`Tízesek: ${tensData.desc}`);
    if (ones > 0) steps.push(`Egyesek: ${onesData.desc}`);

    let explanation = '';
    if (tens > 0 && ones > 0) {
      explanation = `${num} = ${tens} + ${ones} → ${tensData.r} + ${onesData.r} = ${fullRoman}`;
    } else if (tens > 0) {
      explanation = `${num} = ${tens} → ${tensData.r}`;
    } else {
      explanation = `${num} = ${ones} → ${onesData.r}`;
    }

    return {
      roman: fullRoman,
      tensPart: tensData.r,
      onesPart: onesData.r,
      steps,
      explanation
    };
  };

  // Convert Roman to Arabic with strict validation & pedagogical feedback
  const fromRoman = (romanRaw: string): {
    arabic: number | null;
    isValid: boolean;
    error?: string;
    steps: string[];
    explanation?: string;
  } => {
    const clean = romanRaw.trim().toUpperCase();
    if (!clean) {
      return { arabic: null, isValid: false, steps: [] };
    }

    // Check invalid letters
    if (!/^[IVXLC]+$/.test(clean)) {
      return {
        arabic: null,
        isValid: false,
        error: 'Csak érvényes római számjegyek használhatók: I, V, X, L, C!',
        steps: []
      };
    }

    // Generate lookup of valid 1-100 numerals
    const lookup = new Map<string, number>();
    for (let i = 1; i <= 100; i++) {
      lookup.set(toRoman(i).roman, i);
    }

    if (lookup.has(clean)) {
      const arabic = lookup.get(clean)!;
      const decomp = toRoman(arabic);
      return {
        arabic,
        isValid: true,
        steps: decomp.steps,
        explanation: `${clean} = ${decomp.explanation}`
      };
    }

    // Specific error explanations for common learner mistakes
    let specificError = 'Nem szabályos római szám az 1–100-as tartományban!';
    if (clean.includes('IIII')) {
      specificError = 'Szabálytalan: Az „I” alapjel nem ismétlődhet 4-szer! (4 helyesen: IV)';
    } else if (clean.includes('XXXX')) {
      specificError = 'Szabálytalan: Az „X” alapjel nem ismétlődhet 4-szer! (40 helyesen: XL)';
    } else if (clean.includes('VV')) {
      specificError = 'Szabálytalan: A „V” segédjel soha nem ismétlődhet! (10 helyesen: X)';
    } else if (clean.includes('LL')) {
      specificError = 'Szabálytalan: Az „L” segédjel soha nem ismétlődhet! (100 helyesen: C)';
    } else if (clean === 'IL') {
      specificError = 'Szabálytalan kivonás: 50-ből nem vonunk ki 1-et közvetlenül! A 49 helyesen: XLIX (40 + 9).';
    } else if (clean === 'IC') {
      specificError = 'Szabálytalan kivonás: 100-ból nem vonunk ki 1-et közvetlenül! A 99 helyesen: XCIX (90 + 9).';
    } else if (clean.includes('VX') || clean.includes('VL') || clean.includes('VC')) {
      specificError = 'Szabálytalan: A „V” segédjelből nem vonunk ki (nem állhat nagyobb jel előtt)!';
    } else if (clean.includes('LC')) {
      specificError = 'Szabálytalan: Az „L” segédjelből nem vonunk ki (nem állhat C előtt)!';
    }

    return {
      arabic: null,
      isValid: false,
      error: specificError,
      steps: []
    };
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await exportElementToPDF('roman-numerals-theory-content', 'Romai_Szamok_Tananyag');
    setIsDownloading(false);
  };

  const arabicResult = toRoman(parseInt(inputNum, 10));
  const romanResult = fromRoman(inputRoman);

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-2 animate-in fade-in duration-300 text-left">
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
        id="roman-numerals-theory-content"
        className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 p-5 sm:p-8 shadow-sm space-y-8"
      >
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 mb-2 border border-amber-200 dark:border-amber-800">
              <span>🏛️ 5. Osztály • I. Az egész számok</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              A számok kialakulása, a római számok
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Részletes elméleti összefoglaló, alapjelek, számolási szabályok és példatár
            </p>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-slate-800/80 rounded-2xl border border-amber-200/60 dark:border-slate-700 text-center shrink-0">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Számkör</div>
            <div className="text-lg font-black text-amber-700 dark:text-amber-300">1 – 100</div>
          </div>
        </div>

        {/* Section 1: History of numbers */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 flex items-center justify-center font-serif text-sm font-black">
              1.
            </div>
            <h2>A számok kialakulásának története</h2>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2 bg-slate-50/70 dark:bg-slate-850/50 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800">
            <p>
              Az ősember eleinte nem használt elvont számfogalmakat. A megszámlálandó dolgokat (pl. állatokat, zsákmányt) <strong>egy-egyértelmű megfeleltetéssel</strong> párosította kavicsokkal, ujjakkal vagy fadarabra vésett rovásokkal (<em>rovásírás</em>).
            </p>
            <p>
              Ahogy fejlődött a kereskedelem és a társadalom, szükségessé vált a nagyobb mennyiségek egyszerűbb, írásos rögzítése. Az ókori Rómában alakult ki a latin ábécé betűit felhasználó <strong>római számírás</strong>, amelyet évszázadokon át használtak Európában, és mind a mai napig találkozhatunk vele (órák számlapján, könyvek fejezetszámozásánál, uralkodók nevénél, emlékműveken).
            </p>
          </div>
        </section>

        {/* Section 2: Symbols (Alapjelek és Segédjelek) */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 flex items-center justify-center font-serif text-sm font-black">
              2.
            </div>
            <h2>A római számírás jelei (1–100-ig)</h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            A rómaiak nem használtak helyiértékes rendszert, és <strong>nem volt 0 (nulla) számjegyük sem</strong>. Kétféle jelet különböztetünk meg:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Alapjelek */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/60 dark:from-slate-850 dark:to-slate-800 border-2 border-amber-200/80 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h3 className="text-sm font-black text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                  Alapjelek (10 hatványai)
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Ezek a jelek <strong>legfeljebb háromszor</strong> ismétlődhetnek egymás mellett!
              </p>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-amber-200 dark:border-slate-700 shadow-xs">
                  <div className="font-serif font-black text-2xl text-amber-700 dark:text-amber-400">I</div>
                  <div className="text-sm font-black text-slate-800 dark:text-slate-100">= 1</div>
                  <div className="text-[10px] text-slate-400">egy (unus)</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-amber-200 dark:border-slate-700 shadow-xs">
                  <div className="font-serif font-black text-2xl text-amber-700 dark:text-amber-400">X</div>
                  <div className="text-sm font-black text-slate-800 dark:text-slate-100">= 10</div>
                  <div className="text-[10px] text-slate-400">tíz (decem)</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-amber-200 dark:border-slate-700 shadow-xs">
                  <div className="font-serif font-black text-2xl text-amber-700 dark:text-amber-400">C</div>
                  <div className="text-sm font-black text-slate-800 dark:text-slate-100">= 100</div>
                  <div className="text-[10px] text-slate-400">száz (centum)</div>
                </div>
              </div>
            </div>

            {/* Segédjelek */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/60 dark:from-slate-850 dark:to-slate-800 border-2 border-blue-200/80 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <h3 className="text-sm font-black text-blue-900 dark:text-blue-200 uppercase tracking-wider">
                  Segédjelek (5-szörös értékek)
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Ezek a jelek <strong>soha nem ismétlődhetnek</strong> és nem állhatnak egymás mellett!
              </p>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-blue-200 dark:border-slate-700 shadow-xs">
                  <div className="font-serif font-black text-2xl text-blue-700 dark:text-blue-400">V</div>
                  <div className="text-sm font-black text-slate-800 dark:text-slate-100">= 5</div>
                  <div className="text-[10px] text-slate-400">öt (quinque)</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-blue-200 dark:border-slate-700 shadow-xs">
                  <div className="font-serif font-black text-2xl text-blue-700 dark:text-blue-400">L</div>
                  <div className="text-sm font-black text-slate-800 dark:text-slate-100">= 50</div>
                  <div className="text-[10px] text-slate-400">ötven (quinquaginta)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Rules */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 flex items-center justify-center font-serif text-sm font-black">
              3.
            </div>
            <h2>A római számírás 3 alapszabálya</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Rule 1 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800/80 shadow-xs space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-black uppercase">
                1. Összeadás elve
              </div>
              <h4 className="text-xs font-black text-slate-900 dark:text-white">Kisebb jel a nagyobb UTÁN</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Ha egy kisebb vagy egyenlő értékű jel egy nagyobb jel <strong>után (jobbra)</strong> áll, akkor az értéküket <strong>összeadjuk</strong>.
              </p>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 space-y-1">
                <div>VI = 5 + 1 = 6</div>
                <div>XV = 10 + 5 = 15</div>
                <div>LXX = 50 + 10 + 10 = 70</div>
              </div>
            </div>

            {/* Rule 2 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-rose-800/80 shadow-xs space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-[11px] font-black uppercase">
                2. Kivonás elve
              </div>
              <h4 className="text-xs font-black text-slate-900 dark:text-white">Kisebb jel a nagyobb ELŐTT</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Ha egy kisebb értékű jel egy nagyobb jel <strong>előtt (balra)</strong> áll, akkor értékét <strong>kivonjuk</strong> a nagyobból.
              </p>
              <div className="p-2 bg-rose-50 dark:bg-rose-950/40 rounded-xl text-xs font-mono font-bold text-rose-800 dark:text-rose-300 space-y-1">
                <div>IV = 5 - 1 = 4</div>
                <div>IX = 10 - 1 = 9</div>
                <div>XL = 50 - 10 = 40</div>
                <div>XC = 100 - 10 = 90</div>
              </div>
            </div>

            {/* Rule 3 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800/80 shadow-xs space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[11px] font-black uppercase">
                3. Ismétlési szabály
              </div>
              <h4 className="text-xs font-black text-slate-900 dark:text-white">Legfeljebb 3 azonos jel</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Az alapjelek (<strong>I, X, C</strong>) egymás mellett <strong>legfeljebb 3-szor</strong> állhatnak. A segédjelek (<strong>V, L</strong>) sosem ismétlődnek!
              </p>
              <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-xs font-mono font-bold text-amber-800 dark:text-amber-300 space-y-1">
                <div>III = 3 (megengedett)</div>
                <div>IIII = HIBÁS! (helyette: IV)</div>
                <div>VV = HIBÁS! (helyette: X)</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Critical Pitfall (Helyiértékes bontás szabálya) */}
        <section className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-2 border-amber-300 dark:border-amber-700/80 space-y-2">
          <div className="flex items-center gap-2 font-black text-sm text-amber-900 dark:text-amber-200">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
            <h3>Fontos csapda: Hogyan írjuk le a 49-et vagy 99-et?</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            A római számok leírásakor a számokat <strong>helyiértékek szerint bontjuk fel</strong> (tízesekre és egyesekre):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">49 = 40 + 9</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">✓ XL + IX = XLIX (Helyes!)</div>
              <div className="text-rose-500 dark:text-rose-400">✗ IL (Szabálytalan, mert 50-ből nem vonunk ki 1-et közvetlenül!)</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">99 = 90 + 9</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">✓ XC + IX = XCIX (Helyes!)</div>
              <div className="text-rose-500 dark:text-rose-400">✗ IC (Szabálytalan!)</div>
            </div>
          </div>
        </section>

        {/* Section 5: Reference Table (Példatár 1-100) */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 flex items-center justify-center font-serif text-sm font-black">
              4.
            </div>
            <h2>Gyakori számok áttekintő táblázata (1–100)</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {[
              { a: '1', r: 'I' },
              { a: '2', r: 'II' },
              { a: '3', r: 'III' },
              { a: '4', r: 'IV' },
              { a: '5', r: 'V' },
              { a: '6', r: 'VI' },
              { a: '7', r: 'VII' },
              { a: '8', r: 'VIII' },
              { a: '9', r: 'IX' },
              { a: '10', r: 'X' },
              { a: '14', r: 'XIV' },
              { a: '19', r: 'XIX' },
              { a: '20', r: 'XX' },
              { a: '30', r: 'XXX' },
              { a: '40', r: 'XL' },
              { a: '44', r: 'XLIV' },
              { a: '49', r: 'XLIX' },
              { a: '50', r: 'L' },
              { a: '60', r: 'LX' },
              { a: '70', r: 'LXX' },
              { a: '80', r: 'LXXX' },
              { a: '90', r: 'XC' },
              { a: '94', r: 'XCIV' },
              { a: '100', r: 'C' }
            ].map((item, idx) => (
              <div key={idx} className="p-2 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700 text-center">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{item.a}</div>
                <div className="text-base font-serif font-black text-amber-700 dark:text-amber-300">{item.r}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Interactive Bidirectional Live Converter (no-pdf) */}
        <section className="p-4 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 space-y-4 no-pdf">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-700/80 pb-3">
            <div className="flex items-center gap-2 font-black text-sm sm:text-base text-slate-900 dark:text-white">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                <Calculator className="w-4 h-4" />
              </div>
              <h3>Interaktív Kétirányú Számváltó (1–100)</h3>
            </div>

            {/* Mode Switcher Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setConverterMode('arabic-to-roman')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
                  converterMode === 'arabic-to-roman'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <span>🔢 Arab ➔ Római</span>
              </button>
              <button
                type="button"
                onClick={() => setConverterMode('roman-to-arabic')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
                  converterMode === 'roman-to-arabic'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <span>🏛️ Római ➔ Arab</span>
              </button>
            </div>
          </div>

          {/* Mode 1: Arabic to Roman */}
          {converterMode === 'arabic-to-roman' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Adj meg egy tetszőleges egész számot <strong>1 és 100</strong> között, és nézd meg a helyiértékes felbontását:
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative w-full sm:w-44">
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Arab szám (1–100):</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={inputNum}
                    onChange={(e) => setInputNum(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold text-lg text-slate-900 dark:text-white text-center focus:border-amber-500 focus:outline-hidden"
                    placeholder="1-100"
                  />
                </div>

                <div className="flex-1 p-3.5 bg-white dark:bg-slate-900 rounded-2xl border-2 border-amber-300 dark:border-amber-800/80 flex items-center justify-between shadow-xs">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Római alak:</span>
                    <span className="text-2xl sm:text-3xl font-serif font-black text-amber-600 dark:text-amber-400">
                      {arabicResult.roman}
                    </span>
                  </div>
                  {arabicResult.steps.length > 0 && (
                    <div className="text-right hidden sm:block">
                      <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 block">
                        {arabicResult.explanation}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-400 mr-1">Gyakori példák:</span>
                {['4', '9', '14', '39', '44', '49', '78', '89', '94', '99', '100'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setInputNum(preset)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-colors',
                      inputNum === preset
                        ? 'bg-amber-100 border-amber-400 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-amber-300'
                    )}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Step details */}
              {arabicResult.steps.length > 0 && (
                <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200/80 dark:border-amber-800/50 space-y-1 text-xs">
                  <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Lépésről lépésre:</span>
                  </div>
                  <div className="space-y-0.5 font-mono text-slate-700 dark:text-slate-300 pl-4">
                    {arabicResult.steps.map((st, i) => (
                      <div key={i}>• {st}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mode 2: Roman to Arabic */}
          {converterMode === 'roman-to-arabic' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Írj be egy római számot, vagy kattints a betűgombokra az arab érték és szabályosság ellenőrzéséhez:
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative w-full sm:w-56">
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Római szám:</label>
                  <input
                    type="text"
                    value={inputRoman}
                    onChange={(e) => setInputRoman(e.target.value.toUpperCase())}
                    className="w-full h-12 px-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-serif font-black text-xl text-slate-900 dark:text-white text-center uppercase tracking-wider focus:border-amber-500 focus:outline-hidden"
                    placeholder="Pl. XLIX"
                  />
                </div>

                <div
                  className={cn(
                    'flex-1 p-3.5 rounded-2xl border-2 flex items-center justify-between shadow-xs transition-colors',
                    romanResult.isValid
                      ? 'bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-800/80'
                      : inputRoman.trim() === ''
                      ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'
                      : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800/80'
                  )}
                >
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Arab érték:</span>
                    <span
                      className={cn(
                        'text-2xl sm:text-3xl font-black',
                        romanResult.isValid
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-slate-400'
                      )}
                    >
                      {romanResult.isValid && romanResult.arabic !== null ? romanResult.arabic : '—'}
                    </span>
                  </div>

                  {romanResult.isValid ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-800">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Szabályos római szám</span>
                    </div>
                  ) : inputRoman.trim() !== '' ? (
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs font-bold border border-rose-300 dark:border-rose-800">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                      <span>Hibás felírás</span>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* On-screen touch buttons for Roman letters */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-bold text-slate-400 mr-1">Római jelek beszúrása:</span>
                {['I', 'V', 'X', 'L', 'C'].map((letter) => (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => setInputRoman((prev) => prev + letter)}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 font-serif font-black text-lg text-slate-800 dark:text-slate-100 shadow-xs active:scale-95 transition-all"
                  >
                    {letter}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setInputRoman((prev) => prev.slice(0, -1))}
                  className="h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1 active:scale-95 transition-all"
                  title="Utolsó jel törlése"
                >
                  <Delete className="w-3.5 h-3.5" /> ⌫ Törlés
                </button>
                <button
                  type="button"
                  onClick={() => setInputRoman('')}
                  className="h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-500 font-bold text-xs active:scale-95 transition-all"
                  title="Mező kiürítése"
                >
                  Kiürítés
                </button>
              </div>

              {/* Quick Roman Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-400 mr-1">Gyakori minták:</span>
                {['IV', 'IX', 'XIV', 'XXXIX', 'XLIV', 'XLIX', 'LXXVIII', 'XCIX', 'C'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setInputRoman(preset)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-xs font-serif font-black border transition-colors',
                      inputRoman === preset
                        ? 'bg-amber-100 border-amber-400 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-300'
                    )}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Validation Feedback */}
              {romanResult.isValid && romanResult.steps.length > 0 && (
                <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-200/80 dark:border-emerald-800/50 space-y-1 text-xs">
                  <div className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Helyes felbontás és magyarázat:</span>
                  </div>
                  <div className="space-y-0.5 font-mono text-slate-700 dark:text-slate-300 pl-4">
                    {romanResult.steps.map((st, i) => (
                      <div key={i}>• {st}</div>
                    ))}
                    {romanResult.explanation && (
                      <div className="font-bold text-emerald-800 dark:text-emerald-300 pt-1">
                        ➜ {romanResult.explanation}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Error Explanation */}
              {!romanResult.isValid && romanResult.error && (
                <div className="p-3 bg-rose-50/80 dark:bg-rose-950/30 rounded-xl border border-rose-300 dark:border-rose-800 space-y-1 text-xs">
                  <div className="font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Szabálysértés magyarázata:</span>
                  </div>
                  <p className="text-rose-800 dark:text-rose-300 pl-5 leading-relaxed font-medium">
                    {romanResult.error}
                  </p>
                </div>
              )}
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

export default RomanNumeralsTheory;
