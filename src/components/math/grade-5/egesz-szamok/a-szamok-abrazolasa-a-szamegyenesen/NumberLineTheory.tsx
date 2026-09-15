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
  MoveHorizontal,
  Target,
  Ruler,
  Compass,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Calculator,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface NumberLineTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function NumberLineTheory({ onBack, onStartQuiz }: NumberLineTheoryProps) {
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

  const scaleConfigs = {
    units: { min: 0, max: 20, step: 1, majorStep: 5, label: '0 – 20 (Egyesével)' },
    tens: { min: 0, max: 100, step: 5, majorStep: 10, label: '0 – 100 (Tízesével)' },
    hundreds: { min: 0, max: 1000, step: 50, majorStep: 100, label: '0 – 1000 (Százasával)' }
  };

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
      setGameFeedback('🏆 Tökéletes találat! Pontosan eltaláltad!');
    } else if (diff <= 3) {
      setGameFeedback(`🎯 Fantasztikus! Csak ${diff} egység volt a különbség (tipped: ${guessedVal})!`);
    } else if (diff <= 8) {
      setGameFeedback(`👍 Nagyon jó közelítés! (Tipped: ${guessedVal}, cél: ${gameTarget})`);
    } else {
      setGameFeedback(`Próbáld újra! A tipped: ${guessedVal}, a cél: ${gameTarget}`);
    }
  };

  const handleNewTarget = () => {
    setGameTarget(Math.floor(Math.random() * 91) + 5);
    setGameClicked(null);
    setGameFeedback(null);
  };

  return (
    <TheoryTemplate
      title="A számok ábrázolása a számegyenesen"
      subtitle="Kezdőpont, egység, lépésköz, számok leolvasása, szomszédok és távolság a számegyenesen"
      topicBadge="5. Osztály • I. Az egész számok"
      topicNumber="6."
      documentId="number-line-theory-content"
      pdfFileName="Szamegyenes_Tananyag"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'Alapszabály',
        title: 'Számegyenes 3 kelléke',
        detail: '0 kezdőpont • Nyíl (növekvő irány jobbra) • Beosztási egység'
      }}
    >
      {/* 1. Szakasz: A számegyenes felépítése */}
      <TheorySection
        number={1}
        title="Mi a számegyenes? A számegyenes 3 alapvető kelléke"
        badgeColor="emerald"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            A <strong>számegyenes</strong> egy olyan egyenes, amely a számok vizuális, geometriai ábrázolására szolgál. Segítségével láthatjuk a számok nagyságát, sorrendjét és távolságát.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TheoryCard
              title="1. Kezdőpont (Origo)"
              badge="0 pont"
              variant="emerald"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A számegyenes kiindulópontja a <strong>0 (nulla)</strong>. Innen indulunk ki a számoláskor.
              </p>
            </TheoryCard>

            <TheoryCard
              title="2. Irány (Nyíl)"
              badge="Növekvő irány"
              variant="blue"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A nyíl mindig <strong>jobbra</strong> mutat, ami azt jelzi, hogy jobbra haladva a számok <strong>növekednek</strong>.
              </p>
            </TheoryCard>

            <TheoryCard
              title="3. Egység (Beosztás)"
              badge="Lépésköz"
              variant="amber"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Két szomszédos vonás távolsága a lépésköz (lehet 1, 2, 5, 10, 50, 100 egység).
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 2. Szakasz: Lépésközök és leolvasás */}
      <TheorySection
        number={2}
        title="Hogyan határozzuk meg a lépésközt és olvassuk le a pontokat?"
        badgeColor="emerald"
      >
        <div className="space-y-4">
          <TheoryCallout
            title="A lépésköz kiszámításának 3 aranyszabálya"
            variant="tip"
          >
            <ol className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 list-decimal list-inside">
              <li>Keress meg <strong>két szomszédos feliratozott számot</strong> (pl. 20 és 30)!</li>
              <li>Számold ki a <strong>különbségüket</strong> (30 - 20 = 10)!</li>
              <li>Számold meg, hány <strong>egyenlő részre (közre)</strong> van osztva a szakasz! Lépésköz = Különbség / Közök száma.</li>
            </ol>
          </TheoryCallout>

          <TheoryTable
            headers={['Feliratok a számegyenesen', 'Közök száma', 'Lépésköz számítása', 'Egy beosztás értéke']}
            rows={[
              ['0 és 10', '10 köz', '10 : 10 = 1', '1 egység (egyesével lépked)'],
              ['0 és 20', '10 köz', '20 : 10 = 2', '2 egység (páros számok vonalai)'],
              ['0 és 50', '10 köz', '50 : 10 = 5', '5 egység (ötösével lépked)'],
              ['0 és 100', '10 köz', '100 : 10 = 10', '10 egység (kerek tízesek)'],
              ['0 és 1000', '10 köz', '1000 : 10 = 100', '100 egység (kerek százasok)']
            ]}
          />
        </div>
      </TheorySection>

      {/* 3. Szakasz: Szomszédok a számegyenesen */}
      <TheorySection
        number={3}
        title="Számok szomszédai: Egyes, Tízes, Százas és Ezres szomszédok"
        badgeColor="emerald"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Minden természetes számnak megvannak a közvetlen és a kerekített szomszédai a számegyenesen:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Egyes szomszédok:</span>
              <div className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200">
                347 &lt; <strong>348</strong> &lt; 349
              </div>
              <p className="text-[11px] text-slate-500">Közvetlen előtte és utána álló szám.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Kerek tízes szomszédok:</span>
              <div className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200">
                340 &lt; <strong>348</strong> &lt; 350
              </div>
              <p className="text-[11px] text-slate-500">A közelebbi tízes a 350.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Kerek százas szomszédok:</span>
              <div className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200">
                300 &lt; <strong>348</strong> &lt; 400
              </div>
              <p className="text-[11px] text-slate-500">A közelebbi százas a 300.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400">Kerek ezres szomszédok:</span>
              <div className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200">
                0 &lt; <strong>348</strong> &lt; 1000
              </div>
              <p className="text-[11px] text-slate-500">A közelebbi ezres a 0.</p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. Szakasz: Távolság és Felezőpont */}
      <TheorySection
        number={4}
        title="Távolság és Felezőpont a számegyenesen"
        badgeColor="emerald"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard
              title="Két pont távolsága"
              badge="Különbség"
              variant="emerald"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Két pont távolságát a nagyobb számból a kisebb szám <strong>kivonásával</strong> kapjuk:
              </p>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
                Távolság = Nagyobb szám - Kisebb szám (pl. 14 - 3 = 11 egység)
              </div>
            </TheoryCard>

            <TheoryCard
              title="Felezőpont (Középpont)"
              badge="Átlag"
              variant="blue"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                A két szám közötti pontos felezőpont a számtani közepük (összegük fele):
              </p>
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800 text-xs font-mono font-bold text-blue-800 dark:text-blue-300">
                Felezőpont = (a + b) / 2 (pl. (20 + 80) / 2 = 50)
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 5. Szakasz: Tipikus Hibák és Csapdák */}
      <TheorySection
        number={5}
        title="Tipikus Tévhitek és Csapdák"
        badgeColor="emerald"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TheoryTrapBox
            title="A vonások száma a közök helyett"
            wrong="A vonásokat számoljuk meg a távolság meghatározásakor"
            correct="A vonások közötti SZAKASZOKAT (közöket) számoljuk!"
            explanation="Ha 5 vonás van, az 4 közt jelent. A lépésközt a közök száma határozza meg."
          />
          <TheoryTrapBox
            title="Feltételezni, hogy minden vonás 1 egység"
            wrong="A 0 utáni első vonást mindig 1-nek tekinteni"
            correct="Mindig ellenőrizd a következő feliratot a lépésköz kiszámításához!"
            explanation="Egy beosztás jelenthet 2-t, 5-öt, 10-et vagy akár 100-at is a skálától függően."
          />
          <TheoryTrapBox
            title="Szomszédos számok értelmezése"
            wrong="A 45 kerek tízes szomszédai a 44 és 46"
            correct="Egyes szomszédai a 44 és 46; Kerek tízes szomszédai a 40 és 50!"
            explanation="Figyelj a kérdés pontosságára: egyes vagy kerek tízes/százas szomszédot kérnek!"
          />
          <TheoryTrapBox
            title="Balra és jobbra haladás iránya"
            wrong="Balra haladva nőnek a számok"
            correct="Jobbra haladva NŐNEK, balra haladva CSÖKKENNEK a számok a számegyenesen."
            explanation="A nyíl a pozitív, növekvő irányt jelöli jobbra."
          />
        </div>
      </TheorySection>

      {/* 6. Szakasz: Interaktív Számegyenes Labor (no-pdf) */}
      <TheorySection
        number={6}
        title="Interaktív Számegyenes Labor & Becslő Játék"
        badgeColor="emerald"
        className="no-pdf"
      >
        <div className="space-y-6 no-pdf">
          {/* Scale Switcher Explorer */}
          <div className="p-5 bg-gradient-to-br from-emerald-50/60 to-teal-50/60 dark:from-slate-800/80 dark:to-slate-900/80 rounded-2xl border border-emerald-200/80 dark:border-slate-700 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Válassz skálát a számegyenes vizsgálatához:
              </div>
              <div className="flex gap-1.5">
                {(['units', 'tens', 'hundreds'] as ScaleMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => handleScaleChange(mode)}
                    className={cn(
                      "px-3 py-1 text-xs font-bold rounded-xl border transition-all",
                      scaleMode === mode
                        ? "bg-emerald-600 text-white border-emerald-700 shadow-sm"
                        : "bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                    )}
                  >
                    {scaleConfigs[mode].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Point & Distance info */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-400">A pont értéke: </span>
                <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-sm">
                  {pointA}
                </span>
              </div>
              <div>
                <span className="text-slate-400">B pont értéke: </span>
                <span className="font-mono font-black text-blue-600 dark:text-blue-400 text-sm">
                  {pointB}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Távolság (B - A): </span>
                <span className="font-mono font-black text-amber-600 dark:text-amber-400 text-sm">
                  {distance}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Felezőpont: </span>
                <span className="font-mono font-black text-purple-600 dark:text-purple-400 text-sm">
                  {midpoint}
                </span>
              </div>
            </div>
          </div>

          {/* Mini-game: Guess position on 0-100 line */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-emerald-600" />
                  Keresd meg a számot a számegyenesen!
                </h3>
                <p className="text-xs text-slate-500">
                  Célpont: <strong className="text-emerald-600 font-mono text-sm">{gameTarget}</strong>. Kattints a számegyenes megfelelő helyére!
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNewTarget}
                className="rounded-xl h-8 text-xs font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Új célpont
              </Button>
            </div>

            {/* SVG Clickable Number line */}
            <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700">
              <svg
                viewBox="0 0 600 80"
                className="w-full cursor-crosshair select-none"
                onClick={handleMiniGameClick}
              >
                {/* Axis line */}
                <line x1="30" y1="40" x2="570" y2="40" stroke="currentColor" strokeWidth="3" className="text-slate-400" />
                <polygon points="575,40 565,34 565,46" fill="currentColor" className="text-slate-400" />

                {/* Major ticks 0, 10, 20 ... 100 */}
                {Array.from({ length: 11 }).map((_, i) => {
                  const x = 30 + (540 / 10) * i;
                  return (
                    <g key={i}>
                      <line x1={x} y1="30" x2={x} y2="50" stroke="currentColor" strokeWidth="2" className="text-slate-600 dark:text-slate-300" />
                      <text x={x} y="68" textAnchor="middle" className="text-[11px] font-bold fill-slate-500">
                        {i * 10}
                      </text>
                    </g>
                  );
                })}

                {/* Target Marker (if clicked) */}
                {gameClicked !== null && (
                  <>
                    {/* User Click Pin */}
                    <g transform={`translate(${30 + (540 / 100) * gameClicked}, 25)`}>
                      <circle cx="0" cy="15" r="5" fill="#ef4444" />
                      <text x="0" y="0" textAnchor="middle" className="text-[10px] font-bold fill-rose-600">
                        {gameClicked}
                      </text>
                    </g>
                    {/* Real Target Pin */}
                    <g transform={`translate(${30 + (540 / 100) * gameTarget}, 25)`}>
                      <circle cx="0" cy="15" r="5" fill="#10b981" />
                      <text x="0" y="-8" textAnchor="middle" className="text-[10px] font-bold fill-emerald-600">
                        Cél: {gameTarget}
                      </text>
                    </g>
                  </>
                )}
              </svg>
            </div>

            {gameFeedback && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-300 text-center border border-emerald-200 dark:border-emerald-800">
                {gameFeedback}
              </div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}

export default NumberLineTheory;
