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
  FileText,
  RotateCcw,
  Layers,
  Pencil,
  Check,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface NumberSpellingTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function NumberSpellingTheory({ onBack, onStartQuiz }: NumberSpellingTheoryProps) {
  // Interactive Tool State
  const [toolMode, setToolMode] = useState<'converter' | 'rulesChecker'>('converter');
  const [inputNum, setInputNum] = useState<string>('45320');

  // Rules checker test string
  const [testText, setTestText] = useState<string>('háromezer ötszáz');

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
        parts: ['nulla']
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
    <TheoryTemplate
      title="A természetes számok helyesírása"
      subtitle="A kétezres szabály, kötőjelezés, sorszámnevek, dátumok és tipikus helyesírási csapdák"
      topicBadge="5. Osztály • I. Az egész számok"
      topicNumber="4."
      documentId="number-spelling-theory-content"
      pdfFileName="Szamok_Helyesirasa_Tananyag"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'Főszabály',
        title: '2 000-es határ',
        detail: '≤ 2 000 egybeírás • > 2 000 kötőjel az osztályhatárokon'
      }}
    >
      {/* 1. Szakasz: Számnevek fajtái */}
      <TheorySection
        number={1}
        title="A számnevek fajtái és leírásuk"
        badge="Szófajok"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            A magyar nyelvben a számokat nemcsak számjegyekkel, hanem <strong>betűvel leírt számnevekként</strong> is kifejezhetjük.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard
              title="Tőszámnevek"
              badge="Mennyiség"
              color="emerald"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Mennyiséget fejeznek ki. Kérdése: <em>Hány? Mennyi?</em>
              </p>
              <div className="p-2.5 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
                Példák: egy, tíz, negyvenöt, háromszáz, kétezer
              </div>
            </TheoryCard>

            <TheoryCard
              title="Sorszámnevek"
              badge="Sorrend"
              color="blue"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Sorrendi helyet jelölnek. Kérdése: <em>Hányadik?</em> Számjegy után <strong>ponttal</strong> jelöljük.
              </p>
              <div className="p-2.5 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800 text-xs font-mono font-bold text-blue-800 dark:text-blue-300">
                Példák: 1. (első), 5. (ötödik), 20. (huszadik)
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 2. Szakasz: A híres 2000-es szabály */}
      <TheorySection
        number={2}
        title="A híres 2 000-es szabály"
        badge="Kulcsszabály"
      >
        <div className="space-y-4">
          <TheoryCallout
            title="A kétezres szabály pontos definíciója"
            type="tip"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              A <strong>2 000-nél nem nagyobb</strong> összetett számokat mindig <strong>egybeírjuk</strong>.<br />
              A <strong>2 000-nél nagyobb</strong> összetett számokat a <strong>hármas számcsoportok (számosztályok) határán kötőjellel</strong> tagoljuk!
            </p>
          </TheoryCallout>

          <TheoryTable
            headers={['Számkör / Kategória', 'Szabály', 'Példa', 'Helyes alak']}
            rows={[
              ['≤ 2 000 (egészen 2000-ig)', 'Minden összetett számot egybeírunk', '15, 482, 1 500, 1 999', 'tizenöt, négyszáznyolcvankettő, ezerötszáz, ezerkilencszázkilencvenkilenc'],
              ['Kerek ezresek, milliók (> 2000 is)', 'Egybeírjuk őket', '3 000, 20 000, 5 000 000', 'háromezer, húszezer, ötmillió'],
              ['> 2 000 összetett számok', 'Kötőjel az osztályhatárokon', '2 001, 4 520, 12 300, 45 800', 'kétezer-egy, négyezer-ötszázhúsz, tizenkétezer-háromszáz, negyvenötezer-nyolcszáz']
            ]}
          />
        </div>
      </TheorySection>

      {/* 3. Szakasz: Milliók és több kötőjeles számok */}
      <TheorySection
        number={3}
        title="Nagy számok: Milliók és milliárdok helyesírása"
        badge="Nagy számok"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Ha egy szám több számosztályból áll (milliók, ezresek, egyesek), akkor <strong>minden osztályhatárra kötőjel kerül</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">1 250 000</div>
              <div className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">
                egymillió<span className="text-rose-500 font-black">-</span>kétszázötvenezer
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                1 kötőjel: a milliók és ezresek osztálya között (egyesek osztálya csupa 0).
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">4 520 030</div>
              <div className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">
                négymillió<span className="text-rose-500 font-black">-</span>ötszázhúszezer<span className="text-rose-500 font-black">-</span>harminc
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                2 kötőjel: milliók ➔ ezresek ➔ egyesek között.
              </p>
            </div>
          </div>

          <TheoryCallout
            title="Kihagyott osztályok esete"
            type="info"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Ha egy közbülső osztály csupa nulla (pl. <strong>5 000 020</strong> = 5 millió + 0 ezer + 20), akkor az ezres osztály kimarad, és a milliók közvetlenül az egyesekhez kötődnek: <strong>ötmillió-húsz</strong>.
            </p>
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 4. Szakasz: Sorszámnevek, dátumok és vegyes írásmód */}
      <TheorySection
        number={4}
        title="Sorszámnevek, toldalékolás és dátumírás"
        badge="Gyakorlati alkalmazás"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TheoryCard
              title="Sorszámnév ponttal"
              badge="Pont szabály"
              color="amber"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                A számjegy utáni pont már tartalmazza az „-ik” képzőt.
              </p>
              <div className="space-y-1 text-xs font-mono">
                <div className="text-emerald-600 dark:text-emerald-400 font-bold">✓ 5. osztály (ötödik)</div>
                <div className="text-rose-600 dark:text-rose-400 line-through">✗ 5.-ik osztály</div>
              </div>
            </TheoryCard>

            <TheoryCard
              title="Toldalékolás"
              badge="Kötőjel számjegyhez"
              color="violet"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Számjegyhez közvetlenül kötőjellel kapcsoljuk a toldalékot.
              </p>
              <div className="space-y-1 text-xs font-mono">
                <div className="text-emerald-600 dark:text-emerald-400 font-bold">✓ 5-tel, 20-szor</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold">✓ 5.-nek / 5-nek</div>
              </div>
            </TheoryCard>

            <TheoryCard
              title="Dátumírás"
              badge="Év, hó, nap"
              color="blue"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Az évszámot nem tagoljuk szóközzel, pont áll utána és a nap után is.
              </p>
              <div className="space-y-1 text-xs font-mono">
                <div className="text-emerald-600 dark:text-emerald-400 font-bold">✓ 2026. szeptember 7.</div>
                <div className="text-rose-600 dark:text-rose-400 line-through">✗ 2 026. szeptember 7</div>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 5. Szakasz: Tipikus Tévhitek és Helyesírási Csapdák */}
      <TheorySection
        number={5}
        title="Tipikus Tévhitek és Csapdák"
        badgeColor="violet"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TheoryTrapBox
            title="Kötőjel használata 2000 alatt"
            wrong="1500 = ezer-ötszáz"
            correct="1500 = ezerötszáz (teljesen egybeírva)"
            explanation="2000-ig MINDEN összetett számot egyetlen szóba írunk, kötőjel nélkül!"
          />
          <TheoryTrapBox
            title="Szóköz kötőjel helyett 2000 felett"
            wrong="3500 = háromezer ötszáz"
            correct="3500 = háromezer-ötszáz (kötőjellel)"
            explanation="2000 felett a hármas számcsoportok (számosztályok) határára kötőjel kerül, nem szóköz."
          />
          <TheoryTrapBox
            title="Számjegy és betű kötőjelezése vegyes alakban"
            wrong="45-ezer Ft"
            correct="45 ezer Ft vagy 45 000 Ft vagy negyvenötezer Ft"
            explanation="Vegyes írásban szóközt használunk (pl. 45 ezer), vagy teljesen betűvel írjuk ki."
          />
          <TheoryTrapBox
            title="Pont és -ik képző együttes használata"
            wrong="5.-ik helyen végzett"
            correct="5. helyen vagy 5-ödik helyen végzett"
            explanation="A pont már magában jelöli az „-ik” sorszámnévképzőt, így a kettő együtt duplázás."
          />
        </div>
      </TheorySection>

      {/* 6. Szakasz: Interaktív Helyesírás Ellenőrző és Átváltó (no-pdf) */}
      <TheorySection
        number={6}
        title="Interaktív Helyesírás Labor"
        badge="Gyakorló modul"
      >
        <div className="space-y-4 no-pdf">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={toolMode === 'converter' ? 'default' : 'outline'}
              onClick={() => setToolMode('converter')}
              className="rounded-xl h-8 text-xs font-bold"
            >
              <Pencil className="w-3.5 h-3.5 mr-1.5" /> Szám ➔ Betűs alakító
            </Button>
            <Button
              size="sm"
              variant={toolMode === 'rulesChecker' ? 'default' : 'outline'}
              onClick={() => setToolMode('rulesChecker')}
              className="rounded-xl h-8 text-xs font-bold"
            >
              <Check className="w-3.5 h-3.5 mr-1.5" /> Tipikus hibák tesztelője
            </Button>
          </div>

          {toolMode === 'converter' ? (
            <div className="p-5 bg-gradient-to-br from-violet-50/50 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-900/80 rounded-2xl border border-violet-200/80 dark:border-slate-700 space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
                  Írj be egy számot (0 – 999 999 999):
                </label>
                <input
                  type="number"
                  min="0"
                  max="999999999"
                  value={inputNum}
                  onChange={(e) => setInputNum(e.target.value)}
                  className="w-full sm:w-48 px-3 py-2 text-base font-mono font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <div className="flex gap-1.5 shrink-0">
                  {['1500', '2001', '45800', '1250000', '4520030'].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setInputNum(preset)}
                      className="px-2 py-1 text-[11px] font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-violet-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                    >
                      {parseInt(preset, 10).toLocaleString('hu-HU')}
                    </button>
                  ))}
                </div>
              </div>

              {currentSpelling && (
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-violet-200 dark:border-slate-700 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-xs font-bold text-slate-400">Számjeggyel:</span>
                    <span className="font-mono text-base font-black text-violet-700 dark:text-violet-300">
                      {currentSpelling.formattedNum}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Helyes betűs leírás:</div>
                    <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono bg-violet-50/50 dark:bg-violet-950/30 p-3 rounded-xl border border-violet-100 dark:border-violet-900/50 break-words">
                      {currentSpelling.spelledText}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span><strong>Alkalmazott szabály:</strong> {currentSpelling.ruleApplied}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-5 bg-gradient-to-br from-indigo-50/50 to-violet-50/50 dark:from-slate-800/80 dark:to-slate-900/80 rounded-2xl border border-indigo-200/80 dark:border-slate-700 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Válassz egy gyakori téves alakot a vizsgálathoz:
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(knownErrors).map((phrase) => (
                    <button
                      key={phrase}
                      onClick={() => setTestText(phrase)}
                      className={cn(
                        "px-3 py-1.5 text-xs font-bold rounded-xl border transition-all",
                        testText === phrase
                          ? "bg-rose-500 text-white border-rose-600 shadow-sm"
                          : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                      )}
                    >
                      {phrase}
                    </button>
                  ))}
                </div>
              </div>

              {knownErrors[testText] && (
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>Hibás forma: „{testText}”</span>
                  </div>
                  <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    Helyesen: {knownErrors[testText].correct}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {knownErrors[testText].explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}

export default NumberSpellingTheory;
