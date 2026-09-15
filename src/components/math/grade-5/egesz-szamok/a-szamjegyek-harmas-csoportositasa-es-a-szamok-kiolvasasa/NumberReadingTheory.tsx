import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Volume2,
  RotateCcw,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NumberReadingTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function NumberReadingTheory({ onBack, onStartQuiz }: NumberReadingTheoryProps) {
  // Interactive Tool State
  const [toolMode, setToolMode] = useState<'reader' | 'builder'>('reader');
  const [inputNum, setInputNum] = useState<string>('4520030');

  // Builder mode: Class components
  const [millions, setMillions] = useState<string>('4');
  const [thousands, setThousands] = useState<string>('520');
  const [units, setUnits] = useState<string>('30');

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
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="number-reading-theory-content"
      pdfFilename="5_osztaly_szamok_kiolvasasa_tananyag.pdf"
      badgeText="🗣️ 5. Osztály • I. Az egész számok"
      title="A számjegyek hármas csoportosítása és a számok kiolvasása"
      subtitle="Hármas tagolás, számosztályok (egyesek, ezresek, milliók) és a helyes kiolvasási szabályok"
      themeColor="indigo"
      quickRule={{
        label: "Tagolási Szabály",
        formula: "Jobbról balra hármasával tagolunk (szóközzel)!"
      }}
      practiceTitle="Készen állsz a számok kiolvasásának gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod a 3 szintű kvízben, a kártyás párosítóban vagy a csoportosító játékban!"
    >
      {/* 1. Szakasz: A hármas csoportosítás aranyszabálya */}
      <TheorySection number={1} title="A hármas csoportosítás (tagolás) aranyszabálya" badgeColor="indigo">
        <TheoryCard variant="default">
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
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
        </TheoryCard>
      </TheorySection>

      {/* 2. Szakasz: A számosztályok rendszere */}
      <TheorySection number={2} title="A számosztályok rendszere" badgeColor="indigo">
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3">
          Minden egyes hármas csoportot egy <strong>számosztálynak</strong> nevezünk. Minden osztályon belül megtalálható az egyes, tízes és százas helyiérték:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Milliók osztálya */}
          <TheoryCard
            variant="purple"
            badge="3. Milliók osztálya (M)"
            title="7–9. helyiértékek"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Százmilliós (SzM), Tízmilliós (TM), Egymilliós (M).
            </p>
            <div className="p-2.5 bg-white/80 dark:bg-slate-900/80 rounded-xl text-xs font-mono font-bold text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              Kiolvasáskor utána mondjuk:<br />
              <span className="text-base text-purple-600 dark:text-purple-400">„...millió”</span>
            </div>
          </TheoryCard>

          {/* Ezresek osztálya */}
          <TheoryCard
            variant="blue"
            badge="2. Ezresek osztálya (e)"
            title="4–6. helyiértékek"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Százezres (Sze), Tízezres (Té), Egyezres (E).
            </p>
            <div className="p-2.5 bg-white/80 dark:bg-slate-900/80 rounded-xl text-xs font-mono font-bold text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Kiolvasáskor utána mondjuk:<br />
              <span className="text-base text-blue-600 dark:text-blue-400">„...ezer”</span>
            </div>
          </TheoryCard>

          {/* Egyesek osztálya */}
          <TheoryCard
            variant="indigo"
            badge="1. Egyesek osztálya (E)"
            title="1–3. helyiértékek"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Százas (Sz), Tízes (T), Egyes (e).
            </p>
            <div className="p-2.5 bg-white/80 dark:bg-slate-900/80 rounded-xl text-xs font-mono font-bold text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              Kiolvasáskor:<br />
              <span className="text-base text-indigo-600 dark:text-indigo-400">Nem mondunk osztálynevet!</span>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Szakasz: A számok kiolvasásának lépései */}
      <TheorySection number={3} title="A számok kiolvasásának lépései" badgeColor="indigo">
        <div className="space-y-3">
          <TheoryCard variant="default">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-1">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-black">
                1.
              </span>
              <span>Tagoljuk a számot jobbról balra hármasával:</span>
            </div>
            <div className="pl-8 font-mono text-base text-indigo-700 dark:text-indigo-300 font-black">
              4520030 ➜ 4 520 030
            </div>
          </TheoryCard>

          <TheoryCard variant="default">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-1">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-black">
                2.
              </span>
              <span>Balról jobbra kiolvassuk az egyes osztályokat, majd utána mondjuk az osztály nevét:</span>
            </div>
            <div className="pl-8 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg text-purple-800 dark:text-purple-300 border">
                <strong>4</strong> ➜ „négy<strong>millió</strong>”
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-blue-800 dark:text-blue-300 border">
                <strong>520</strong> ➜ „ötszázhúsz<strong>ezer</strong>”
              </div>
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg text-indigo-800 dark:text-indigo-300 border">
                <strong>030</strong> ➜ „harminc”
              </div>
            </div>
          </TheoryCard>

          <TheoryCard variant="indigo">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-1">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-black">
                3.
              </span>
              <span>Összeolvasva és helyesen leírva:</span>
            </div>
            <div className="pl-8 font-serif text-base text-slate-900 dark:text-white font-bold">
              „négymillió-ötszázhúszezer-harminc”
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Szakasz: Helyesírási szabály (A 2000-es szabály) */}
      <TheorySection number={4} title="Helyesírási szabály: A „Kétezres szabály” és a kötőjel" badgeColor="indigo">
        <TheoryCallout variant="tip" title="Hogyan írjuk le a számokat betűvel?">
          A magyar helyesírás szabálya alapján:
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            <div className="p-2.5 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs space-y-1">
              <div className="font-bold text-emerald-700 dark:text-emerald-300">1. Kétezerig (2 000-ig): Egybeírjuk!</div>
              <div className="text-slate-600 dark:text-slate-300 font-mono">
                • 1550 ➜ <strong>ezerötszázötven</strong><br />
                • 1999 ➜ <strong>ezerkilencszázkilencvenkilenc</strong><br />
                • 2000 ➜ <strong>kétezer</strong>
              </div>
            </div>
            <div className="p-2.5 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs space-y-1">
              <div className="font-bold text-indigo-700 dark:text-indigo-300">2. Kétezer felett: Kötőjelezünk az osztályok határán!</div>
              <div className="text-slate-600 dark:text-slate-300 font-mono">
                • 2001 ➜ <strong>kétezer-egy</strong><br />
                • 45 800 ➜ <strong>negyvenötezer-nyolcszáz</strong><br />
                • 3 500 020 ➜ <strong>hárommillió-ötszázezer-húsz</strong>
              </div>
            </div>
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* 5. Szakasz: Tipikus hibák és csapdák */}
      <TheorySection number={5} title="Tipikus hibák és csapdák" badgeColor="indigo">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TheoryTrapBox
            title="Tagolás balról jobbra kezdve"
            wrong="45200 tagolva mint 452 00"
            correct="45200 tagolva mint 45 200"
            explanation="Mindig HÁTULRÓL (jobbról balra) csoportosítunk hármasával!"
          />

          <TheoryTrapBox
            title="Kötőjel használata 2000 alatt"
            wrong="1500 leírva: ezer-ötszáz"
            correct="1500 leírva: ezerötszáz (egybeírva)"
            explanation="2000-ig (beleértve a 2000-et is) a számokat teljes egészében egybeírjuk!"
          />
        </div>
      </TheorySection>

      {/* 6. Szakasz: Interaktív Számkiolvasó és Osztályelemző (no-pdf) */}
      <TheorySection number={6} title="Interaktív Számkiolvasó és Osztályelemző" badgeColor="indigo" className="no-pdf">
        <div className="p-4 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-700/80 pb-3">
            <div className="flex items-center gap-2 font-black text-sm sm:text-base text-slate-900 dark:text-white">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <Volume2 className="w-4 h-4" />
              </div>
              <span>Válassz működési módot:</span>
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
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}

export default NumberReadingTheory;
