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
  Volume2,
  Check,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportElementToPDF } from '@/utils/pdfExport';

interface NumberReadingTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function NumberReadingTheory({ onBack, onStartQuiz }: NumberReadingTheoryProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Interactive Tool State
  const [toolMode, setToolMode] = useState<'reader' | 'builder'>('reader');
  const [inputNum, setInputNum] = useState<string>('4520030');

  // Builder mode: Class components
  const [millions, setMillions] = useState<string>('4');
  const [thousands, setThousands] = useState<string>('520');
  const [units, setUnits] = useState<string>('30');

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await exportElementToPDF('number-reading-theory-content', 'Szamok_Kiolvasasa_Tananyag');
    setIsDownloading(false);
  };

  // Convert 1-999 chunk to Hungarian text
  const chunkToHungarian = (n: number): string => {
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

    if (h > 0) {
      res += hundreds[h];
    }

    if (t > 0) {
      if (o === 0) {
        res += tensExact[t];
      } else {
        res += tensTizen[t] + ones[o];
      }
    } else if (o > 0) {
      res += ones[o];
    }

    return res;
  };

  // Full Hungarian number pronunciation with 2000-rule hyphenation
  const numberToHungarianWords = (num: number): { text: string; formatted: string; classes: { name: string; value: number; text: string; color: string }[] } => {
    if (isNaN(num) || num < 0 || num > 999999999) {
      return { text: '—', formatted: '—', classes: [] };
    }
    if (num === 0) {
      return { text: 'nulla', formatted: '0', classes: [{ name: 'Egyesek', value: 0, text: 'nulla', color: 'indigo' }] };
    }

    const mil = Math.floor(num / 1000000);
    const thou = Math.floor((num % 1000000) / 1000);
    const uni = num % 1000;

    const classList: { name: string; value: number; text: string; color: string }[] = [];
    const parts: string[] = [];

    if (mil > 0) {
      const milWord = chunkToHungarian(mil) + 'millió';
      classList.push({ name: 'Milliók osztálya', value: mil, text: milWord, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-200' });
      parts.push(milWord);
    }
    if (thou > 0) {
      let thouWord = '';
      if (thou === 1 && mil === 0) {
        thouWord = 'ezer';
      } else {
        thouWord = chunkToHungarian(thou) + 'ezer';
      }
      classList.push({ name: 'Ezresek osztálya', value: thou, text: thouWord, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-200' });
      parts.push(thouWord);
    }
    if (uni > 0 || parts.length === 0) {
      const uniWord = chunkToHungarian(uni);
      classList.push({ name: 'Egyesek osztálya', value: uni, text: uniWord, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200' });
      if (uniWord) parts.push(uniWord);
    }

    // 2000-rule: <= 2000 written in one word, > 2000 hyphenated between classes
    let fullText = '';
    if (num <= 2000) {
      fullText = parts.join('');
    } else {
      fullText = parts.join('-');
    }

    return {
      text: fullText,
      formatted: num.toLocaleString('hu-HU'),
      classes: classList
    };
  };

  const parsedNum = parseInt(inputNum.replace(/\s+/g, ''), 10);
  const readerResult = numberToHungarianWords(parsedNum);

  // Compute built number in builder mode
  const bMil = parseInt(millions, 10) || 0;
  const bThou = parseInt(thousands, 10) || 0;
  const bUni = parseInt(units, 10) || 0;
  const builtNumber = bMil * 1000000 + bThou * 1000 + bUni;
  const builderResult = numberToHungarianWords(builtNumber);

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
              className="rounded-xl h-9 px-3 border-indigo-300 bg-indigo-50/60 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800 hover:bg-indigo-100 text-xs sm:text-sm font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
              Gyakorló Kvíz indítása
            </Button>
          )}

          <Button
            size="sm"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="rounded-xl h-9 px-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            {isDownloading ? 'Letöltés...' : 'Tananyag letöltése (PDF)'}
          </Button>
        </div>
      </div>

      {/* Main Printable Theory Container */}
      <div
        id="number-reading-theory-content"
        className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 p-5 sm:p-8 shadow-sm space-y-8"
      >
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 mb-2 border border-indigo-200 dark:border-indigo-800">
              <span>🗣️ 5. Osztály • I. Az egész számok</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              A számjegyek hármas csoportosítása és a számok kiolvasása
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Hármas tagolás, számosztályok (egyesek, ezresek, milliók) és a helyes kiolvasási szabályok
            </p>
          </div>

          <div className="p-3 bg-indigo-50 dark:bg-slate-800/80 rounded-2xl border border-indigo-200/60 dark:border-slate-700 text-center shrink-0">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Szabály</div>
            <div className="text-xl font-black text-indigo-700 dark:text-indigo-300 font-mono">Jobbról balra</div>
            <div className="text-[10px] text-slate-400">3-as csoportok (szóköz)</div>
          </div>
        </div>

        {/* Section 1: Triplet Grouping Rule */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 flex items-center justify-center font-serif text-sm font-black">
              1.
            </div>
            <h2>A hármas csoportosítás (tagolás) aranyszabálya</h2>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2 bg-slate-50/70 dark:bg-slate-850/50 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800">
            <p>
              A nagyobb számok könnyebb áttekinthetősége és helyes kiolvasása érdekében a számjegyeket <strong>hátulról előre (jobbról balra) haladva hármas csoportokba</strong> tagoljuk.
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>
                <strong>Tagolás írásban</strong>: A magyar helyesírás szabályai szerint a hármas csoportokat <strong>szóközzel</strong> választjuk el egymástól (pl. <code className="font-bold text-indigo-700 dark:text-indigo-300">4 520 030</code>), <strong>nem használunk pontot és vesszőt</strong>!
              </li>
              <li>
                <strong>Négyjegyű számok kivétele</strong>: A 4 jegyű számokat folyó szövegben egybe is írhatjuk (pl. <em>1500</em> vagy <em>1 500</em>), de táblázatokban és 5 jegyűtől felfelé mindig kötelező a szóközös tagolás.
              </li>
              <li>
                <strong>Legbaloldalibb csoport</strong>: A legelső (legnagyobb) csoport állhat <strong>1, 2 vagy 3 számjegyből</strong> is (pl. <em>7 000</em>, <em>45 000</em>, <em>320 000</em>).
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: Number Classes System */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 flex items-center justify-center font-serif text-sm font-black">
              2.
            </div>
            <h2>A számosztályok rendszere</h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Minden egyes hármas csoportot egy <strong>számosztálynak</strong> nevezünk. Minden osztályon belül megtalálható az egyes, tízes és százas helyiérték:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Milliók osztálya */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-purple-200 dark:border-purple-800/80 shadow-xs space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 text-[11px] font-black uppercase">
                3. Milliók osztálya (M)
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">7–9. helyiértékek</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Százmilliós (SzM), Tízmilliós (TM), Egymilliós (M).
              </p>
              <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl text-xs font-mono font-bold text-purple-800 dark:text-purple-300">
                Kiolvasáskor utána mondjuk:<br />
                <span className="text-base text-purple-600 dark:text-purple-400">„...millió”</span>
              </div>
            </div>

            {/* Ezresek osztálya */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-blue-800/80 shadow-xs space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[11px] font-black uppercase">
                2. Ezresek osztálya (e)
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">4–6. helyiértékek</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Százezres (Sze), Tízezres (Té), Egyezres (E).
              </p>
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-xs font-mono font-bold text-blue-800 dark:text-blue-300">
                Kiolvasáskor utána mondjuk:<br />
                <span className="text-base text-blue-600 dark:text-blue-400">„...ezer”</span>
              </div>
            </div>

            {/* Egyesek osztálya */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-800/80 shadow-xs space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-[11px] font-black uppercase">
                1. Egyesek osztálya (E)
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">1–3. helyiértékek</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Százas (Sz), Tízes (T), Egyes (e).
              </p>
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-xs font-mono font-bold text-indigo-800 dark:text-indigo-300">
                Kiolvasáskor:<br />
                <span className="text-base text-indigo-600 dark:text-indigo-400">Nem mondunk osztálynevet!</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Reading Algorithm */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-base sm:text-lg">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 flex items-center justify-center font-serif text-sm font-black">
              3.
            </div>
            <h2>A számok kiolvasásának lépései</h2>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-black">
                  1.
                </span>
                <span>Tagoljuk a számot jobbról balra hármasával:</span>
              </div>
              <div className="pl-8 font-mono text-base text-indigo-700 dark:text-indigo-300 font-black">
                4520030 ➜ 4 520 030
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-black">
                  2.
                </span>
                <span>Balról jobbra kiolvassuk az egyes osztályokat, majd utána mondjuk az osztály nevét:</span>
              </div>
              <div className="pl-8 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg text-purple-800 dark:text-purple-300">
                  <strong>4</strong> ➜ „négy<strong>millió</strong>”
                </div>
                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-blue-800 dark:text-blue-300">
                  <strong>520</strong> ➜ „ötszázhúsz<strong>ezer</strong>”
                </div>
                <div className="p-2 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg text-indigo-800 dark:text-indigo-300">
                  <strong>030</strong> ➜ „harminc”
                </div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-black">
                  3.
                </span>
                <span>Összeolvasva és helyesen leírva:</span>
              </div>
              <div className="pl-8 font-serif text-base text-slate-900 dark:text-white font-bold">
                „négymillió-ötszázhúszezer-harminc”
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Spelling & The 2000-Rule */}
        <section className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border-2 border-indigo-300 dark:border-indigo-700/80 space-y-2">
          <div className="flex items-center gap-2 font-black text-sm text-indigo-900 dark:text-indigo-200">
            <Lightbulb className="w-5 h-5 text-indigo-600 shrink-0" />
            <h3>Helyesírási aranyszabály: A „Kétezres szabály” és a kötőjel</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Hogyan írjuk le a számokat betűvel? A magyar helyesírás egyszerű szabályt követ:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div className="font-bold text-emerald-600 dark:text-emerald-400">1. Kétezerig (2 000-ig): Egybeírjuk!</div>
              <div className="text-slate-600 dark:text-slate-300 font-mono">
                • 1550 ➜ <strong>ezerötszázötven</strong><br />
                • 1999 ➜ <strong>ezerkilencszázkilencvenkilenc</strong><br />
                • 2000 ➜ <strong>kétezer</strong>
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div className="font-bold text-indigo-600 dark:text-indigo-400">2. Kétezer felett: Kötőjelezünk az osztályok határán!</div>
              <div className="text-slate-600 dark:text-slate-300 font-mono">
                • 2001 ➜ <strong>kétezer-egy</strong><br />
                • 45 800 ➜ <strong>negyvenötezer-nyolcszáz</strong><br />
                • 3 500 020 ➜ <strong>hárommillió-ötszázezer-húsz</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Interactive Two-Way Number Reading Tool (no-pdf) */}
        <section className="p-4 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 space-y-4 no-pdf">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-700/80 pb-3">
            <div className="flex items-center gap-2 font-black text-sm sm:text-base text-slate-900 dark:text-white">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <Volume2 className="w-4 h-4" />
              </div>
              <h3>Interaktív Számkiolvasó és Osztályelemző</h3>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setToolMode('reader')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
                  toolMode === 'reader'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <span>🗣️ Számból Szöveges Kiolvasás</span>
              </button>
              <button
                type="button"
                onClick={() => setToolMode('builder')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
                  toolMode === 'builder'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <span>🧩 Osztályokból Számépítés</span>
              </button>
            </div>
          </div>

          {/* Mode 1: Number to Speech Text */}
          {toolMode === 'reader' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Írj be egy tetszőleges számot (1 – 999 999 999), és nézd meg az osztályokra bontását és a pontos kiolvasását:
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative w-full sm:w-56">
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Vizsgált szám:</label>
                  <input
                    type="number"
                    min="0"
                    max="999999999"
                    value={inputNum}
                    onChange={(e) => setInputNum(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold text-lg text-slate-900 dark:text-white text-center focus:border-indigo-500 focus:outline-hidden"
                    placeholder="Pl. 4520030"
                  />
                </div>

                <div className="flex-1 p-3 bg-white dark:bg-slate-900 rounded-2xl border-2 border-indigo-300 dark:border-indigo-800/80 flex items-center justify-between shadow-xs">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Hármas tagolás:</span>
                    <span className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                      {readerResult.formatted}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-400 mr-1">Minták:</span>
                {['1550', '2000', '2001', '45800', '320040', '4520030', '10000000', '745020904'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setInputNum(preset)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-colors',
                      inputNum === preset
                        ? 'bg-indigo-100 border-indigo-400 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-300'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300'
                    )}
                  >
                    {parseInt(preset, 10).toLocaleString('hu-HU')}
                  </button>
                ))}
              </div>

              {/* Class badges */}
              {readerResult.classes.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  {readerResult.classes.map((cls, idx) => (
                    <div key={idx} className={cn('p-3 rounded-xl border text-center space-y-1 shadow-2xs', cls.color)}>
                      <div className="text-[11px] font-bold uppercase tracking-wider">{cls.name}</div>
                      <div className="font-mono text-xl font-black">{cls.value}</div>
                      <div className="text-xs font-bold">{cls.text}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Full Speech Text Result */}
              <div className="p-4 bg-indigo-50/80 dark:bg-indigo-950/40 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 space-y-1">
                <div className="text-[11px] font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-indigo-600" />
                  <span>Helyes kiolvasott szöveg (Kétezres szabállyal):</span>
                </div>
                <div className="text-lg sm:text-xl font-serif font-black text-indigo-950 dark:text-white leading-relaxed">
                  „{readerResult.text}”
                </div>
              </div>
            </div>
          )}

          {/* Mode 2: Builder from classes */}
          {toolMode === 'builder' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Állítsd be az egyes osztályok 3-jegyű értékeit, és nézd meg az összerakott számot és kiolvasását:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 dark:border-purple-800/80 text-center space-y-1">
                  <label className="text-[11px] font-bold text-purple-700 dark:text-purple-300 block uppercase">
                    Milliók osztálya (0-999):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="999"
                    value={millions}
                    onChange={(e) => setMillions(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-purple-300 dark:border-purple-700 font-mono font-bold text-center text-base focus:outline-hidden"
                  />
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-800/80 text-center space-y-1">
                  <label className="text-[11px] font-bold text-blue-700 dark:text-blue-300 block uppercase">
                    Ezresek osztálya (0-999):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="999"
                    value={thousands}
                    onChange={(e) => setThousands(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-blue-300 dark:border-blue-700 font-mono font-bold text-center text-base focus:outline-hidden"
                  />
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-200 dark:border-indigo-800/80 text-center space-y-1">
                  <label className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 block uppercase">
                    Egyesek osztálya (0-999):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="999"
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-indigo-300 dark:border-indigo-700 font-mono font-bold text-center text-base focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Reset button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setMillions('0');
                    setThousands('0');
                    setUnits('0');
                  }}
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Nullázás
                </button>
              </div>

              {/* Result card */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-indigo-300 dark:border-indigo-800/80 space-y-2 shadow-xs">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Összerakott szám:</span>
                  <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                    {builderResult.formatted}
                  </span>
                </div>
                <div className="text-sm sm:text-base font-serif font-bold text-slate-800 dark:text-slate-200">
                  „{builderResult.text}”
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

export default NumberReadingTheory;
