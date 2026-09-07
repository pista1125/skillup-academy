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
  Pencil,
  Check,
  RotateCcw,
  Calendar,
  X as CloseIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportElementToPDF } from '@/utils/pdfExport';

interface NumberSpellingTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function NumberSpellingTheory({ onBack, onStartQuiz }: NumberSpellingTheoryProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Interactive Tool State
  const [toolMode, setToolMode] = useState<'converter' | 'rulesChecker'>('converter');
  const [inputNum, setInputNum] = useState<string>('45320');

  // Rules checker test string
  const [testText, setTestText] = useState<string>('háromezer ötszáz');

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await exportElementToPDF('number-spelling-theory-content', 'Szamok_Helyesirasa_Tananyag');
    setIsDownloading(false);
  };

  // Convert chunk 1-999 to Hungarian words
  const chunkToWords = (n: number): string => {
    if (n === 0) return '';
    const ones = ['', 'egy', 'kettő', 'három', 'négy', 'öt', 'hat', 'hét', 'nyolc', 'kilenc'];
    const tensTizen = ['', 'tizen', 'huszon', 'harminc', 'negyven', 'ötven', 'hatvan', 'hetven', 'nyolcvan', 'kilencven'];
    const tensExact = ['', 'tíz', 'húsz', 'harminc', 'negyven', 'ötven', 'hatvan', 'hetven', 'nyolcvan', 'kilencven'];
    const hundreds = ['', 'száz', 'kétszáz', 'háromszáz', 'négyszáz', 'ötszáz', 'hatszáz', 'hétszáz', 'nyolcszáz', 'kilencszáz'];

    let res = '';
    const h = Math.floor(n / 100);
    const rem = n % 100;
    const t = Math.floor(rem / 10);
    const o = rem % 10;

    if (h > 0) res += hundreds[h];
    if (t > 0) {
      if (o === 0) res += tensExact[t];
      else res += tensTizen[t] + ones[o];
    } else if (o > 0) {
      res += ones[o];
    }
    return res;
  };

  // Complete spelling analysis
  const spellNumber = (num: number) => {
    if (isNaN(num) || num < 0 || num > 999999999) {
      return null;
    }
    if (num === 0) {
      return {
        formattedNum: '0',
        spelledText: 'nulla',
        ruleApplied: 'Alapszám',
        hasHyphen: false,
        parts: [{ label: 'Egyesek', text: 'nulla', isHyphen: false }]
      };
    }

    const mil = Math.floor(num / 1000000);
    const thou = Math.floor((num % 1000000) / 1000);
    const uni = num % 1000;

    const parts: string[] = [];
    if (mil > 0) parts.push(chunkToWords(mil) + 'millió');
    if (thou > 0) {
      if (thou === 1 && mil === 0) parts.push('ezer');
      else parts.push(chunkToWords(thou) + 'ezer');
    }
    if (uni > 0) parts.push(chunkToWords(uni));

    let spelledText = '';
    let ruleApplied = '';
    let hasHyphen = false;

    if (num <= 2000) {
      spelledText = parts.join('');
      ruleApplied = 'Kétezres szabály (≤ 2 000): Egybeírjuk!';
      hasHyphen = false;
    } else {
      // Check if it is a round thousand/million with no lower parts
      if (parts.length === 1) {
        spelledText = parts[0];
        ruleApplied = 'Kerek ezres / milliós: Egybeírjuk!';
        hasHyphen = false;
      } else {
        spelledText = parts.join('-');
        ruleApplied = 'Kétezres szabály (> 2 000 összetett): Kötőjel az osztályhatárokon!';
        hasHyphen = true;
      }
    }

    return {
      formattedNum: num.toLocaleString('hu-HU'),
      spelledText,
      ruleApplied,
      hasHyphen,
      parts
    };
  };

  const currentSpelling = spellNumber(parseInt(inputNum.replace(/\s+/g, ''), 10));

  // Common errors tester database
  const knownErrors: { [key: string]: { correct: string; explanation: string } } = {
    'háromezer ötszáz': {
      correct: 'háromezer-ötszáz',
      explanation: '2000 felett az osztályok határán kötőjelet teszünk, nem szóközt!'
    },
    'kétezer egy': {
      correct: 'kétezer-egy',
      explanation: '2000 felett az ezres és az egyes osztály közé kötőjelet teszünk!'
    },
    'ezer-ötszáz': {
      correct: 'ezerötszáz',
      explanation: '2000-ig minden összetett természetes számot egybeírunk kötőjel nélkül!'
    },
    'öt-ezer': {
      correct: 'ötezer',
      explanation: 'A kerek ezreseket egybeírjuk!'
    },
    '45-ezer': {
      correct: '45 ezer vagy 45 000 vagy negyvenötezer',
      explanation: 'Számjeggyel és betűvel keverve szóközzel írjuk (45 ezer), nem kötőjellel!'
    },
    '5.-ik': {
      correct: '5. vagy 5-ödik',
      explanation: 'A pont már magában jelöli az „-ik” képzőt! A pont után nem teszünk még egyszer toldalékot.'
    }
  };

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
              className="rounded-xl h-9 px-3 border-violet-300 bg-violet-50/60 text-violet-800 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800 hover:bg-violet-100 text-xs sm:text-sm font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-violet-600" />
              Gyakorló Kvíz indítása
            </Button>
          )}

          <Button
            size="sm"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="rounded-xl h-9 px-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-violet-600 dark:hover:bg-violet-700 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            {isDownloading ? 'Letöltés...' : 'Tananyag letöltése (PDF)'}
          </Button>
        </div>
      </div>

      {/* Main Printable Theory Container */}
      <div
        id="number-spelling-theory-content"
        className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 p-5 sm:p-8 shadow-sm space-y-8"
      >
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 mb-2 border border-violet-200 dark:border-violet-800">
              <span>✍️ 5. Osztály • I. Az egész számok</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              A természetes számok helyesírása
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              A kétezres szabály, kötőjelezés, sorszámnevek, dátumok és tipikus helyesírási csapdák
            </p>
          </div>

          <div className="p-3 bg-violet-50 dark:bg-slate-800/80 rounded-2xl border border-violet-200/60 dark:border-slate-700 text-center shrink-0">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Főszabály</div>
            <div className="text-xl font-black text-violet-700 dark:text-violet-300 font-mono">2 000-es határ</div>
            <div className="text-[10px] text-slate-400">egybeírás / kötőjelezés</div>
          </div>
        </div>

        {/* Section 1: Introduction to Number Spelling */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300 flex items-center justify-center font-serif text-sm font-black">
              1.
            </div>
            <h2>A számnevek fajtái és leírásuk</h2>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2 bg-slate-50/70 dark:bg-slate-850/50 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800">
            <p>
              A magyar nyelvben a számokat nemcsak számjegyekkel, hanem <strong>betűvel leírt számnevekként</strong> is kifejezhetjük:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-violet-700 dark:text-violet-300">Tőszámnevek:</span>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Mennyiséget fejeznek ki (pl. <em>egy, tíz, negyvenöt, háromszáz</em>). Kérdése: <em>Hány? Mennyi?</em>
                </p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-indigo-700 dark:text-indigo-300">Sorszámnevek:</span>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Sorrendi helyet jelölnek (pl. <em>első, ötödik, huszadik</em>). Kérdése: <em>Hányadik?</em> Számjegy után <strong>ponttal</strong> jelöljük (pl. <em>5.</em>).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The 2000-Rule (Detailed) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300 flex items-center justify-center font-serif text-sm font-black">
              2.
            </div>
            <h2>A „Kétezres szabály” (A magyar helyesírás alapszabálya)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Rule A: <= 2000 */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-slate-850 dark:to-slate-800 border-2 border-emerald-200 dark:border-emerald-800/80 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase">
                A) 2 000-ig (Kétezerig): Mindig egybeírjuk!
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Kétezerig <strong>minden összetett tőszámnevet egyetlen szóba írunk</strong>, kötőjel nélkül:
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800 font-mono text-xs space-y-1">
                <div>• 15 = <strong>tizenöt</strong></div>
                <div>• 482 = <strong>négyszáznyolcvankettő</strong></div>
                <div>• 1 500 = <strong>ezerötszáz</strong></div>
                <div>• 1 999 = <strong>ezerkilencszázkilencvenkilenc</strong></div>
                <div>• 2 000 = <strong>kétezer</strong></div>
              </div>
            </div>

            {/* Rule B: > 2000 */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50/50 dark:from-slate-850 dark:to-slate-800 border-2 border-violet-200 dark:border-violet-800/80 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-300 text-xs font-black uppercase">
                B) 2 000 felett: Kötőjel az osztályhatáron!
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                A 2000-nél nagyobb összetett számokat a <strong>hármas csoportok (számosztályok) határán kötőjellel tagoljuk</strong>:
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-violet-200 dark:border-violet-800 font-mono text-xs space-y-1">
                <div>• 2 001 = <strong>kétezer-egy</strong></div>
                <div>• 45 320 = <strong>negyvenötezer-háromszázhúsz</strong></div>
                <div>• 1 250 000 = <strong>egymillió-kétszázötvenezer</strong></div>
                <div>• 4 520 030 = <strong>négymillió-ötszázhúszezer-harminc</strong></div>
              </div>
            </div>
          </div>

          {/* Special Exception: Round thousands and millions */}
          <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800/60 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-xs text-amber-900 dark:text-amber-200">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Kivétel: Kerek ezresek, milliók, milliárdok</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Ha a 2000-nél nagyobb szám <strong>kerek ezres vagy kerek milliós</strong> (azaz a kisebb osztályok csupa nullák), akkor <strong>egybeírjuk</strong> kötőjel nélkül:
              <br />
              <code className="font-bold text-amber-900 dark:text-amber-200 font-mono">
                3 000 = háromezer • 40 000 = negyvenezer • 5 000 000 = ötmillió
              </code>
            </p>
          </div>
        </section>

        {/* Section 3: Ordinal Numbers and Dates */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300 flex items-center justify-center font-serif text-sm font-black">
              3.
            </div>
            <h2>Sorszámnevek, dátumok és toldalékolás</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ordinals */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                <span>Sorszámnevek írása ponttal:</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A sorszámnevek után <strong>mindig pontot teszünk</strong>. A pont maga fejezi ki az <em>-ik</em> toldalékot:
              </p>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-mono space-y-1">
                <div>✓ <strong>5.</strong> = ötödik (Helyes!)</div>
                <div>✗ <strong>5.-ik</strong> (HIBÁS, a pont már jelöli az -ik-et!)</div>
                <div>✓ <strong>5.-nek</strong> vagy <strong>5-nek</strong> = ötödiknek</div>
              </div>
            </div>

            {/* Dates */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span>Évszámok és dátumok:</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Az évszámokat <strong>nem tagoljuk szóközzel</strong> (pl. <em>2026</em>). Dátumokban az év és a nap után pontot teszünk:
              </p>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-mono space-y-1">
                <div>✓ <strong>2026. szeptember 7.</strong></div>
                <div>✓ <strong>2026. 09. 07.</strong> vagy <strong>2026. IX. 7.</strong></div>
                <div>✗ <strong>2 026</strong> (Az évszámot nem tagoljuk!)</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Critical Pitfalls */}
        <section className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-500/10 via-orange-500/10 to-rose-500/10 border-2 border-rose-300 dark:border-rose-700/80 space-y-2">
          <div className="flex items-center gap-2 font-black text-sm text-rose-900 dark:text-rose-200">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <h3>Leggyakoribb helyesírási hibák (Kerüld el őket!)</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-800 space-y-1">
              <div className="font-bold text-rose-600 dark:text-rose-400">1. Szóköz a kötőjel helyett:</div>
              <div className="text-slate-600 dark:text-slate-300 font-mono">
                ✗ háromezer ötszáz<br />
                ✓ <strong>háromezer-ötszáz</strong>
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-800 space-y-1">
              <div className="font-bold text-rose-600 dark:text-rose-400">2. Felesleges kötőjel 2000 alatt:</div>
              <div className="text-slate-600 dark:text-slate-300 font-mono">
                ✗ ezer-ötszáz<br />
                ✓ <strong>ezerötszáz</strong>
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-800 space-y-1">
              <div className="font-bold text-rose-600 dark:text-rose-400">3. Kötőjel rossz helyen:</div>
              <div className="text-slate-600 dark:text-slate-300 font-mono">
                ✗ huszon-ötezer<br />
                ✓ <strong>huszonötezer</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Interactive Two-Way Spelling Tool (no-pdf) */}
        <section className="p-4 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 space-y-4 no-pdf">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-700/80 pb-3">
            <div className="flex items-center gap-2 font-black text-sm sm:text-base text-slate-900 dark:text-white">
              <div className="w-7 h-7 rounded-lg bg-violet-600 text-white flex items-center justify-center">
                <Pencil className="w-4 h-4" />
              </div>
              <h3>Interaktív Helyesírási Segéd és Elemző</h3>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setToolMode('converter')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
                  toolMode === 'converter'
                    ? 'bg-violet-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <span>🔢 Számból Betűs Alak</span>
              </button>
              <button
                type="button"
                onClick={() => setToolMode('rulesChecker')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
                  toolMode === 'rulesChecker'
                    ? 'bg-violet-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <span>🔍 Hibajavító Minta-tesztelő</span>
              </button>
            </div>
          </div>

          {/* Mode 1: Number to Word Spelling */}
          {toolMode === 'converter' && currentSpelling && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Írj be egy számot (1 – 999 999 999), és nézd meg a helyes betűs leírását és a szabálymagyarázatot:
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative w-full sm:w-56">
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Szám beírása:</label>
                  <input
                    type="number"
                    min="0"
                    max="999999999"
                    value={inputNum}
                    onChange={(e) => setInputNum(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold text-lg text-slate-900 dark:text-white text-center focus:border-violet-500 focus:outline-hidden"
                    placeholder="Pl. 45320"
                  />
                </div>

                <div className="flex-1 p-3 bg-white dark:bg-slate-900 rounded-2xl border-2 border-violet-300 dark:border-violet-800/80 flex items-center justify-between shadow-xs">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Szabály:</span>
                    <span className="text-xs sm:text-sm font-bold text-violet-700 dark:text-violet-300">
                      {currentSpelling.ruleApplied}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-400 mr-1">Minták:</span>
                {['15', '482', '1500', '2000', '2001', '3000', '45320', '1250000', '4520030'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setInputNum(preset)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-colors',
                      inputNum === preset
                        ? 'bg-violet-100 border-violet-400 text-violet-900 dark:bg-violet-950 dark:text-violet-300'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-violet-300'
                    )}
                  >
                    {parseInt(preset, 10).toLocaleString('hu-HU')}
                  </button>
                ))}
              </div>

              {/* Spelled Word Output Box */}
              <div className="p-4 bg-violet-50/80 dark:bg-violet-950/40 rounded-2xl border-2 border-violet-200 dark:border-violet-800 space-y-1.5">
                <div className="text-[11px] font-bold text-violet-900 dark:text-violet-200 uppercase tracking-wider">
                  Helyes betűs leírás:
                </div>
                <div className="text-xl sm:text-2xl font-serif font-black text-violet-950 dark:text-white">
                  „{currentSpelling.spelledText}”
                </div>
              </div>
            </div>
          )}

          {/* Mode 2: Rules & Error Checker */}
          {toolMode === 'rulesChecker' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Válassz ki egy tipikus felírást, és nézd meg, miért helytelen vagy hogyan kell helyesen leírni:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {Object.keys(knownErrors).map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => setTestText(sample)}
                    className={cn(
                      'p-3 rounded-xl border text-left space-y-1 transition-all shadow-2xs',
                      testText === sample
                        ? 'bg-violet-50 dark:bg-violet-950/40 border-violet-400 text-violet-950 dark:text-white'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-violet-300'
                    )}
                  >
                    <div className="text-xs font-mono font-bold">{sample}</div>
                  </button>
                ))}
              </div>

              {knownErrors[testText] && (
                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-violet-300 dark:border-violet-800/80 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">Helyes alak:</span>
                    <span className="text-lg font-serif font-black text-emerald-600 dark:text-emerald-400">
                      „{knownErrors[testText].correct}”
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {knownErrors[testText].explanation}
                  </div>
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

export default NumberSpellingTheory;
