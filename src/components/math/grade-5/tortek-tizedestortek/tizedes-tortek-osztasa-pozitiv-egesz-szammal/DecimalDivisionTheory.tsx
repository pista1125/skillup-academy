import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Divide,
  ArrowRight,
  HelpCircle,
  RefreshCw,
  BookOpen,
  Calculator,
  Sliders,
  MoveLeft,
  Coins
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

export interface DecimalDivisionTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const DecimalDivisionTheory: React.FC<DecimalDivisionTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleStartQuiz = onStartQuiz || onSwitchToQuiz;

  // Interactive Division Lab State
  const [dividend, setDividend] = useState<number>(14.7);
  const [divisor, setDivisor] = useState<number>(3);

  // Quick preset scenarios
  const presets = [
    { div: 14.7, by: 3, label: '14,7 : 3 (Alaposztás egész és tizeddel)' },
    { div: 4.5, by: 10, label: '4,5 : 10 (Vessző balra léptetése)' },
    { div: 7, by: 2, label: '7 : 2 (Egészből tizedes: 3,5)' },
    { div: 6.18, by: 6, label: '6,18 : 6 (0 a tizedek helyén: 1,03)' },
    { div: 1, by: 8, label: '1 : 8 (Tört átváltása: 0,125)' },
    { div: 1.25, by: 5, label: '1,25 : 5 (0 egész a hányadosban: 0,25)' }
  ];

  const applyPreset = (p: typeof presets[0]) => {
    setDividend(p.div);
    setDivisor(p.by);
  };

  const calcResult = Math.round((dividend / divisor) * 10000) / 10000;
  const divStr = dividend.toString().replace('.', ',');
  const resStr = calcResult.toString().replace('.', ',');

  // Step calculations for walkthrough
  const wholePart = Math.floor(dividend);
  const wholeDiv = Math.floor(wholePart / divisor);
  const wholeRem = wholePart % divisor;

  return (
    <TheoryTemplate
      title="Tizedes törtek osztása pozitív egész számmal"
      subtitle="Tanuld meg a 10-zel, 100-zal, 1000-rel való gyors osztást, a tizedesvessző hányadosba tételének szabályát és a maradék nélküli tizedes osztást!"
      badgeText="➗ 5. Osztály • II. Törtek, tizedes törtek"
      documentId="decimal-division-theory-content"
      pdfFilename="5_osztaly_tizedes_tortek_osztasa_pozitiv_egesz_szammal_tananyag.pdf"
      quickRule={{
        label: 'TIZEDES TÖRT OSZTÁSA EGÉSZ SZÁMMAL',
        formula: ': 10, 100, 1000 → vessző balra | 14,7 : 3 = 4,9'
      }}
      themeColor="indigo"
      onBack={onBack}
      onStartQuiz={handleStartQuiz}
    >
      {/* 1. SZAKASZ: OSZTÁS 10-ZEL, 100-ZAL, 1000-REL */}
      <TheorySection
        number={1}
        title="Osztás 10-zel, 100-zal, 1000-rel – A tizedesvessző léptetése balra"
        icon={<MoveLeft className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <TheoryCard
          title="Mi történik a helyiértékekkel, ha tizedére, századára csökkentünk egy számot?"
          icon={<Lightbulb className="w-5 h-5 text-amber-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              Amikor egy számot <MathText>10</MathText>-zel, <MathText>100</MathText>-zal vagy <MathText>1000</MathText>-rel osztunk, 
              minden számjegy helyiértéke 1, 2, illetve 3 hellyel kisebb helyiértékre kerül (jobbra vándorol a helyiérték-táblázatban).
            </p>
            <p className="leading-relaxed font-semibold text-indigo-800 dark:text-indigo-300">
              Gyakorlatban ez azt jelenti, hogy a tizedesvesszőt <strong>balra léptetjük</strong> annyi hellyel, ahány nulla van az osztóban!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-2">
              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <div className="text-xs font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                  : 10 (1 nulla)
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                  1 hellyel balra
                </div>
                <div className="mt-2 p-2 bg-white dark:bg-slate-900 rounded-lg text-center font-mono font-black text-indigo-800 dark:text-indigo-200 border border-indigo-100 dark:border-indigo-800 text-sm">
                  <MathText>45,6 : 10 = 4,56</MathText>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                <div className="text-xs font-black text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                  : 100 (2 nulla)
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                  2 hellyel balra
                </div>
                <div className="mt-2 p-2 bg-white dark:bg-slate-900 rounded-lg text-center font-mono font-black text-blue-800 dark:text-blue-200 border border-blue-100 dark:border-blue-800 text-sm">
                  <MathText>45,6 : 100 = 0,456</MathText>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                <div className="text-xs font-black text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                  : 1000 (3 nulla)
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                  3 hellyel balra
                </div>
                <div className="mt-2 p-2 bg-white dark:bg-slate-900 rounded-lg text-center font-mono font-black text-purple-800 dark:text-purple-200 border border-purple-100 dark:border-purple-800 text-sm">
                  <MathText>45,6 : 1000 = 0,0456</MathText>
                </div>
              </div>
            </div>

            {/* Nullák pótlása balra */}
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
              <div className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Nullák pótlása balra (0,0...)</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Ha balra léptetéskor elfogynak az egész számjegyek, a szám elejére <strong>nullákat írunk</strong>, és az egész rész elé kitesszük a 0-t:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-amber-700 text-center font-bold">
                  <MathText>3,2 : 100 = 0,032</MathText>
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-amber-700 text-center font-bold">
                  <MathText>7 : 1000 = 0,007</MathText>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZAKASZ: TIZEDES TÖRT OSZTÁSA TERMÉSZETES SZÁMMAL */}
      <TheorySection
        number={2}
        title="Tizedes tört írásbeli osztása természetes számmal"
        icon={<Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <TheoryCard
          title="Az írásbeli osztás menete és aranyszabálya"
          icon={<Lightbulb className="w-5 h-5 text-indigo-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              Tizedes törtet úgy osztunk egész számmal, mint a természetes számokat, de egyetlen rendkívül fontos lépésre szigorúan ügyelnünk kell:
            </p>

            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200 dark:border-indigo-800 space-y-3">
              <div className="font-black text-indigo-950 dark:text-indigo-200 text-sm flex items-center gap-2">
                <span>🔑 Az írásbeli osztás 4 lépése:</span>
              </div>
              <ol className="list-decimal list-inside text-xs text-slate-800 dark:text-slate-200 space-y-2 leading-relaxed">
                <li>
                  <strong>Az egész rész osztása:</strong> Balról indulva elosztjuk a szám egész részét az osztóval.
                </li>
                <li>
                  <strong>A tizedesvessző azonnali letétele:</strong> Amikor az osztandóban elérjük a <strong>tizedesvesszőt</strong> (azaz a tizedek helyiértékére lépünk), a hányadosban (az eredményben) <strong>AZONNAL kitesszük a tizedesvesszőt</strong>!
                </li>
                <li>
                  <strong>Tizedesjegyek lehozása:</strong> Egymás után hozzuk le a tizedeket, századokat, és folytatjuk az osztást.
                </li>
                <li>
                  <strong>Nulla melléírása maradék esetén:</strong> Ha az összes tizedesjegy elfogyott, de még maradt valami, a maradék mellé <strong>0-t írunk</strong>, és addig folytatjuk az osztást, míg a maradék 0 nem lesz!
                </li>
              </ol>
            </div>

            {/* Kidolgozott mintapélda */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 space-y-2">
              <div className="text-xs font-black text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
                Kidolgozott mintapélda: <MathText>14,7 : 3 = 4,9</MathText>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1 text-xs">
                <div className="p-2.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-800">
                  <div className="font-bold text-indigo-900 dark:text-indigo-200">1. Egész rész osztása</div>
                  <div className="mt-1 text-slate-700 dark:text-slate-300">
                    <MathText>14 : 3 = 4</MathText>, maradék a <MathText>2</MathText>.
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-800">
                  <div className="font-bold text-purple-900 dark:text-purple-200">2. Vessző kirakása</div>
                  <div className="mt-1 text-slate-700 dark:text-slate-300">
                    Vesszőhöz értünk → a hányadosban a 4 után kitesszük: <strong className="text-purple-600 dark:text-purple-300 font-mono">4,</strong>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800">
                  <div className="font-bold text-emerald-900 dark:text-emerald-200">3. Tizedek lehozása</div>
                  <div className="mt-1 text-slate-700 dark:text-slate-300">
                    Lehozzuk a 7-et: <MathText>27 : 3 = 9</MathText>, maradék 0. Végeredmény: <strong className="text-emerald-600 dark:text-emerald-300 font-mono">4,9</strong>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZAKASZ: EGÉSZ SZÁMOK OSZTÁSA ÉS NULLÁK A HÁNYADOSBAN */}
      <TheorySection
        number={3}
        title="Egész számok osztása tizedes eredménnyel és a nulla szerepe"
        icon={<Coins className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <TheoryCard
          title="Két különleges eset: Törtből tizedes tört és köztes nullák"
          icon={<Sparkles className="w-5 h-5 text-amber-500" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Eset 1: Egész szám osztása egész számmal */}
              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
                <div className="text-xs font-black text-indigo-800 dark:text-indigo-300 uppercase">
                  1. Egész számok osztása (maradék esetén folytatjuk)
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Ha két egész szám osztásakor maradék keletkezik, az egész rész után kitesszük a tizedesvesszőt, és a maradék mellé írt 0-val folytatjuk:
                </p>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg font-mono text-xs font-bold text-center border border-indigo-100 dark:border-indigo-800">
                  <MathText>7 : 2 = 3,5</MathText>
                  <div className="text-[11px] text-slate-500 font-sans mt-0.5 font-normal">
                    (<MathText>7 : 2 = 3</MathText>, maradék 1 → kitesszük a vesszőt: 3, → 10 : 2 = 5 → 3,5)
                  </div>
                </div>
              </div>

              {/* Eset 2: Nulla a hányadosban */}
              <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-2">
                <div className="text-xs font-black text-purple-800 dark:text-purple-300 uppercase">
                  2. Nulla a hányadosban (helyiérték megőrzése)
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Ha egy lehozott számjegyben nincs meg az osztó (0-szor van meg), <strong>kötelező 0-t írni a hányadosba</strong> a helyiérték megtartásához!
                </p>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg font-mono text-xs font-bold text-center border border-purple-100 dark:border-purple-800">
                  <MathText>6,18 : 6 = 1,03</MathText>
                  <div className="text-[11px] text-slate-500 font-sans mt-0.5 font-normal">
                    (6:6=1, vessző letétele: 1, → lehozzuk az 1-et: 1:6 = 0, maradék 1 → 18:6 = 3 → 1,03)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZAKASZ: INTERAKTÍV OSZTÓ LABORATÓRIUM */}
      <TheorySection
        number={4}
        title="Interaktív osztó laboratórium"
        icon={<Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <TheoryCard
          title="Próbáld ki az osztást tetszőleges számokkal!"
          icon={<Calculator className="w-5 h-5 text-indigo-500" />}
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Válassz az előre beállított feladatok közül, vagy állítsd be az osztandót és az osztót csúszkával, hogy lásd a lépésről lépésre történő levezetést!
            </p>

            {/* Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              {presets.map((p, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(p)}
                  className={cn(
                    'text-xs font-mono transition-all',
                    dividend === p.div && divisor === p.by
                      ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
                      : 'hover:bg-indigo-50 dark:hover:bg-indigo-950/50'
                  )}
                >
                  {p.label}
                </Button>
              ))}
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
              <div>
                <label className="text-xs font-bold text-indigo-900 dark:text-indigo-300 block mb-1">
                  Osztandó: <span className="font-mono text-base font-black text-indigo-700 dark:text-indigo-300">{divStr}</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="60"
                  step="0.5"
                  value={dividend}
                  onChange={(e) => setDividend(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>0,5</span>
                  <span>30,0</span>
                  <span>60,0</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-indigo-900 dark:text-indigo-300 block mb-1">
                  Egész szám osztó: <span className="font-mono text-base font-black text-indigo-700 dark:text-indigo-300">{divisor}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={divisor}
                  onChange={(e) => setDivisor(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>1</span>
                  <span>10</span>
                  <span>20</span>
                </div>
              </div>
            </div>

            {/* Walkthrough Box */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-xs font-black uppercase text-indigo-700 dark:text-indigo-400">Lépésről lépésre megoldás</span>
                <span className="font-mono text-lg font-black text-indigo-700 dark:text-indigo-300">
                  <MathText>{`${divStr} : ${divisor} = ${resStr}`}</MathText>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-700 dark:text-slate-300">1. Egész rész osztása:</div>
                  <div className="font-mono font-black text-indigo-600 dark:text-indigo-400 mt-1">
                    <MathText>{`${wholePart} : ${divisor} = ${wholeDiv} (maradék: ${wholeRem})`}</MathText>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-700 dark:text-slate-300">2. Vessző elhelyezése:</div>
                  <div className="font-mono font-black text-purple-600 dark:text-purple-400 mt-1">
                    {wholeDiv},...
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                  <div className="font-bold text-indigo-900 dark:text-indigo-200">3. Pontos végeredmény:</div>
                  <div className="font-mono font-black text-indigo-700 dark:text-indigo-300 mt-1 text-sm">
                    <MathText>{resStr}</MathText>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. SZAKASZ: TIPIKUS HIBÁK ÉS CSAPDÁK */}
      <TheorySection
        number={5}
        title="Tipikus hibák és csapdák elkerülése"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Csapda: A köztes nulla elhagyása a hányadosban"
            wrong="6,18 : 6 esetén a 6:6=1 után lehozzák a 18-at: 18:6=3, és 1,3-at írnak le eredménynek!"
            correct="Az 1-ben a 6 nincs meg (0-szor van meg), ezért kötelező kiírni a 0-t: 6,18 : 6 = 1,03."
            explanation="Gondolj a helyiértékre: 6 egész 18 század osztva 6-tal az 1 egész és 3 század (1,03), nem pedig 3 tized (1,3)!"
          />

          <TheoryTrapBox
            title="2. Csapda: A tizedesvessző jobbra léptetése osztáskor"
            wrong="45,6 : 10 esetén jobbra tolják a vesszőt: 456. Így a szám tízszer akkora lett, holott osztottunk!"
            correct="Osztáskor a szám értéke CSÖKKEN, ezért a tizedesvesszőt MINDIG BALRA léptetjük: 45,6 : 10 = 4,56."
            explanation="Szabály: Osztás (érték csökken) → vessző BALRA lép. (Szorzásnál lépett jobbra!)."
          />

          <TheoryTrapBox
            title="3. Csapda: Maradéknál való megállás egész számok osztásakor"
            wrong="7 : 2 feladatnál megállnak: '3, maradék az 1'."
            correct="Ötödik osztályban tizedes tört alakban fejezzük be: 7 : 2 = 3,5 (az 1 maradék mellé 0-t írunk: 10 : 2 = 5)."
            explanation="Példa: 7 pizzát 2 ember között elosztva mindenkinek 3 és fél (3,5) pizza jut."
          />

          <TheoryTrapBox
            title="4. Csapda: Elfelejtett nulla az egész részben, ha a tört kisebb 1-nél"
            wrong="1,2 : 4 esetén az egész rész (1) kisebb mint 4, ezért csak a 12-t osztják: 1,2 : 4 = 3 vagy ,3."
            correct="Mivel az 1-ben a 4 0-szor van meg, a hányados 0-val kezdődik: 1,2 : 4 = 0,3."
            explanation="Ha az osztandó kisebb mint az osztó, a hányados egész része MINDIG 0 (0,...)."
          />
        </div>
      </TheorySection>

      {/* 6. SZAKASZ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        number={6}
        title="Összefoglaló osztási példatár és útmutató"
        icon={<BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <TheoryTable
          headers={['Osztási feladat', 'Lépés / Átalakítás', 'Hányados', 'Ellenőrzés szorzással']}
          rows={[
            ['45,6 : 10', '1 hellyel balra lép a vessző', '4,56', '4,56 · 10 = 45,6'],
            ['3,2 : 100', '2 hellyel balra (0 pótlása)', '0,032', '0,032 · 100 = 3,2'],
            ['14,7 : 3', '14:3 = 4 (maradék 2) → vessző → 27:3 = 9', '4,9', '4,9 · 3 = 14,7'],
            ['7 : 2', '7:2 = 3 (maradék 1) → vessző → 10:2 = 5', '3,5', '3,5 · 2 = 7'],
            ['6,18 : 6', '6:6 = 1 → vessző → 1:6 = 0 → 18:6 = 3', '1,03', '1,03 · 6 = 6,18'],
            ['1 : 8', '1:8 = 0 → 10:8 = 1 (m:2) → 20:8 = 2 (m:4) → 40:8 = 5', '0,125', '0,125 · 8 = 1'],
            ['1,25 : 5', '1:5 = 0 → vessző → 12:5 = 2 (m:2) → 25:5 = 5', '0,25', '0,25 · 5 = 1,25']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
export default DecimalDivisionTheory;
