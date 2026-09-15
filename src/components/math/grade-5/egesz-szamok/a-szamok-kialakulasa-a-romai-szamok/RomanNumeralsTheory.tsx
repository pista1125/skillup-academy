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
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Calculator,
  Check,
  Delete,
  Clock,
  History,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RomanNumeralsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function RomanNumeralsTheory({ onBack, onStartQuiz }: RomanNumeralsTheoryProps) {
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

  const arabicResult = toRoman(parseInt(inputNum, 10));
  const romanResult = fromRoman(inputRoman);

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="roman-numerals-theory-content"
      pdfFilename="5_osztaly_romai_szamok_tananyag.pdf"
      badgeText="🏛️ 5. Osztály • I. Az egész számok"
      title="A számok kialakulása, a római számok"
      subtitle="Részletes elméleti összefoglaló, alapjelek, alapszabályok, interaktív átváltó és példatár"
      themeColor="amber"
      quickRule={{
        label: "Számkör",
        formula: "1 – 100 (I – C)"
      }}
      practiceTitle="Készen állsz a római számok gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod a 3 szintű kvízben, a kártyás párosítóban vagy a csoportosító játékban!"
    >
      {/* 1. Szakasz: Történet */}
      <TheorySection number={1} title="A számok kialakulásának története" badgeColor="amber">
        <TheoryCard variant="default">
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
            <p>
              Az emberiség hajnalán eleinte nem használtak elvont számfogalmakat. A megszámlálandó dolgokat (pl. vadászzsákmányt, állatokat) <strong>egy-egyértelmű megfeleltetéssel</strong> párosították kavicsokkal, ujjakkal vagy fadarabra, csontra vésett rovásokkal (<em>rovásírás</em>).
            </p>
            <p>
              A kereskedelem fejlődésével szükségessé vált a nagyobb mennyiségek egyszerű, egységes rögzítése. Az ókori Rómában alakult ki a latin ábécé nagybetűit felhasználó <strong>római számírás</strong>, amelyet évszázadokon át használtak Európában, és ma is gyakran találkozhatunk vele (órák számlapján, könyvek fejezetszámozásánál, uralkodók sorszámánál, emlékműveken).
            </p>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. Szakasz: Alapjelek és Segédjelek */}
      <TheorySection number={2} title="A római számírás jelei (1–100-ig)" badgeColor="amber">
        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-2">
          A rómaiak nem használtak helyiértékes rendszert, és <strong>nem volt 0 (nulla) számjegyük sem</strong>. Kétféle jelet különböztetünk meg:
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Alapjelek */}
          <TheoryCard
            title="Alapjelek (10 hatványai)"
            badge="Legfeljebb 3× ismételhető"
            variant="amber"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Ezek a jelek <strong>legfeljebb háromszor</strong> ismétlődhetnek egymás mellett:
            </p>
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-amber-200 dark:border-slate-700">
                <div className="font-serif font-black text-2xl text-amber-700 dark:text-amber-400">I</div>
                <div className="text-sm font-black text-slate-800 dark:text-slate-100">= 1</div>
                <div className="text-[10px] text-slate-400">unus</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-amber-200 dark:border-slate-700">
                <div className="font-serif font-black text-2xl text-amber-700 dark:text-amber-400">X</div>
                <div className="text-sm font-black text-slate-800 dark:text-slate-100">= 10</div>
                <div className="text-[10px] text-slate-400">decem</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-amber-200 dark:border-slate-700">
                <div className="font-serif font-black text-2xl text-amber-700 dark:text-amber-400">C</div>
                <div className="text-sm font-black text-slate-800 dark:text-slate-100">= 100</div>
                <div className="text-[10px] text-slate-400">centum</div>
              </div>
            </div>
          </TheoryCard>

          {/* Segédjelek */}
          <TheoryCard
            title="Segédjelek (5-szörös értékek)"
            badge="Soha nem ismétlődhet"
            variant="blue"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Ezek a jelek <strong>soha nem ismétlődhetnek</strong> és nem állhatnak egymás mellett:
            </p>
            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-blue-200 dark:border-slate-700">
                <div className="font-serif font-black text-2xl text-blue-700 dark:text-blue-400">V</div>
                <div className="text-sm font-black text-slate-800 dark:text-slate-100">= 5</div>
                <div className="text-[10px] text-slate-400">quinque</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-blue-200 dark:border-slate-700">
                <div className="font-serif font-black text-2xl text-blue-700 dark:text-blue-400">L</div>
                <div className="text-sm font-black text-slate-800 dark:text-slate-100">= 50</div>
                <div className="text-[10px] text-slate-400">quinquaginta</div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Szakasz: Alapszabályok */}
      <TheorySection number={3} title="A római számírás alapszabályai" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <TheoryCard title="1. Összeadás elve" variant="emerald">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ha egy kisebb vagy egyenlő értékű jel egy nagyobb jel <strong>után (jobbra)</strong> áll, akkor az értéküket <strong>összeadjuk</strong>.
            </p>
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 space-y-1 mt-2">
              <div>VI = 5 + 1 = 6</div>
              <div>XV = 10 + 5 = 15</div>
              <div>LXX = 50 + 10 + 10 = 70</div>
            </div>
          </TheoryCard>

          <TheoryCard title="2. Kivonás elve" variant="rose">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ha egy kisebb értékű alapjel egy nagyobb jel <strong>előtt (balra)</strong> áll, akkor értékét <strong>kivonjuk</strong> a nagyobból.
            </p>
            <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl text-xs font-mono font-bold text-rose-800 dark:text-rose-300 space-y-1 mt-2">
              <div>IV = 5 - 1 = 4</div>
              <div>IX = 10 - 1 = 9</div>
              <div>XL = 50 - 10 = 40</div>
              <div>XC = 100 - 10 = 90</div>
            </div>
          </TheoryCard>

          <TheoryCard title="3. Ismétlési korlát" variant="amber">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Az alapjelek (<strong>I, X, C</strong>) <strong>legfeljebb 3-szor</strong> állhatnak egymás mellett. A segédjelek (<strong>V, L</strong>) sosem ismétlődnek!
            </p>
            <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-xs font-mono font-bold text-amber-800 dark:text-amber-300 space-y-1 mt-2">
              <div>III = 3 (szabályos)</div>
              <div>IIII = HIBÁS (helyette: IV)</div>
              <div>VV = HIBÁS (helyette: X)</div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Szakasz: Lépésről lépésre: Helyiértékes bontás */}
      <TheorySection number={4} title="Lépésről lépésre: Hogyan írunk fel összetett számokat?" badgeColor="amber">
        <TheoryCallout variant="tip" title="A legfontosabb módszer: Mindig helyiértékekre bontunk!">
          A többjegyű arab számokat először <strong>kerek tízesekre és egyesekre</strong> bontjuk, majd külön-külön átírjuk őket római számra, és egymás mellé illesztjük!
        </TheoryCallout>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <TheoryCard title="Példa: 44 felírása" variant="amber">
            <div className="font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
              <div>1. lépés: 44 felbontása: <strong>40 + 4</strong></div>
              <div>2. lépés: 40 római alakja: <strong>XL</strong> (50 - 10)</div>
              <div>3. lépés: 4 római alakja: <strong>IV</strong> (5 - 1)</div>
              <div className="pt-1 text-amber-700 dark:text-amber-300 font-bold border-t border-slate-200 dark:border-slate-700">
                Eredmény: 44 = XLIV
              </div>
            </div>
          </TheoryCard>

          <TheoryCard title="Példa: 78 felírása" variant="amber">
            <div className="font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
              <div>1. lépés: 78 felbontása: <strong>70 + 8</strong></div>
              <div>2. lépés: 70 római alakja: <strong>LXX</strong> (50 + 20)</div>
              <div>3. lépés: 8 római alakja: <strong>VIII</strong> (5 + 3)</div>
              <div className="pt-1 text-amber-700 dark:text-amber-300 font-bold border-t border-slate-200 dark:border-slate-700">
                Eredmény: 78 = LXXVIII
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Szakasz: Interaktív Átváltó és Ellenőrző Eszköz */}
      <TheorySection number={5} title="Interaktív Kétirányú Átváltó és Ellenőrző" badgeColor="amber">
        <div className="p-4 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-850 border-2 border-slate-200 dark:border-slate-800 space-y-4 no-pdf">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-700/80 pb-3">
            <div className="flex items-center gap-2 font-black text-sm sm:text-base text-slate-900 dark:text-white">
              <Calculator className="w-5 h-5 text-amber-500" />
              <span>Próbáld ki élőben az átváltást:</span>
            </div>

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
                Adj meg egy tetszőleges egész számot <strong>1 és 100</strong> között, és nézd meg a helyiértékes levezetést:
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
                Írj be egy római számot, vagy kattints a betűgombokra az érték és szabályosság ellenőrzéséhez:
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
        </div>
      </TheorySection>

      {/* 6. Szakasz: Gyakori hibák és csapdák */}
      <TheorySection number={6} title="Gyakori hibák és tévhitek" badgeColor="amber">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TheoryTrapBox
            title="A 4 és 40 leírása (Nem ismétlünk 4-szer!)"
            wrong="IIII (4), XXXX (40)"
            correct="IV (4 = 5 - 1), XL (40 = 50 - 10)"
            explanation="Az alapjelekből (I, X, C) legfeljebb 3 darab állhat egymás mellett. A 4-eseket kivonással képezzük."
          />

          <TheoryTrapBox
            title="A 49 és 99 leírása (Csak a közvetlen helyiértékből vonunk ki!)"
            wrong="IL (49), IC (99)"
            correct="XLIX (40 + 9), XCIX (90 + 9)"
            explanation="50-ből nem vonhatunk ki 1-et közvetlenül! Először a tízeseket bontjuk (40 = XL, 90 = XC), majd hozzáadjuk a 9-et (IX)."
          />

          <TheoryTrapBox
            title="A segédjelek (V, L) ismétlése"
            wrong="VV (10), LL (100)"
            correct="X (10), C (100)"
            explanation="A segédjelek (V = 5, L = 50) soha nem ismétlődhetnek és nem állhatnak egymás mellett, mert 2 × 5 = 10 (X) és 2 × 50 = 100 (C)."
          />

          <TheoryTrapBox
            title="Segédjelből való kivonás"
            wrong="VX (10 - 5), LC (100 - 50)"
            correct="V és L elé sosem teszünk kisebb jelet, és ők sem állhatnak nagyobb előtt kivonásként."
            explanation="Kivonni csak alapjelet (I, X) szabad a nála közvetlenül nagyobb alap- vagy segédjelből (IV, IX, XL, XC)."
          />
        </div>
      </TheorySection>

      {/* 7. Szakasz: Gyors referencia táblázat */}
      <TheorySection number={7} title="Gyors referencia táblázat (1–100)" badgeColor="amber">
        <TheoryTable
          headers={["Arab szám", "Római szám", "Szabály / Felbontás", "Arab szám", "Római szám", "Szabály / Felbontás"]}
          rows={[
            ["1", "I", "Alapjel (1)", "20", "XX", "10 + 10"],
            ["2", "II", "1 + 1", "30", "XXX", "10 + 10 + 10"],
            ["3", "III", "1 + 1 + 1", "40", "XL", "50 - 10 (Kivonás)"],
            ["4", "IV", "5 - 1 (Kivonás)", "44", "XLIV", "40 + 4"],
            ["5", "V", "Segédjel (5)", "49", "XLIX", "40 + 9 (Csapda!)"],
            ["6", "VI", "5 + 1", "50", "L", "Segédjel (50)"],
            ["7", "VII", "5 + 2", "60", "LX", "50 + 10"],
            ["8", "VIII", "5 + 3", "70", "LXX", "50 + 20"],
            ["9", "IX", "10 - 1 (Kivonás)", "80", "LXXX", "50 + 30"],
            ["10", "X", "Alapjel (10)", "90", "XC", "100 - 10 (Kivonás)"],
            ["14", "XIV", "10 + 4", "99", "XCIX", "90 + 9 (Csapda!)"],
            ["19", "XIX", "10 + 9", "100", "C", "Alapjel (100)"]
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
}

export default RomanNumeralsTheory;
