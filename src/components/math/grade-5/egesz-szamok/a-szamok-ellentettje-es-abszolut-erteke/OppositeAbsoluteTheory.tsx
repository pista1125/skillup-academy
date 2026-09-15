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
  ArrowRightLeft,
  Lightbulb,
  Compass,
  AlertTriangle,
  Layers,
  Sparkles,
  Calculator
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface OppositeAbsoluteTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function OppositeAbsoluteTheory({ onBack, onStartQuiz }: OppositeAbsoluteTheoryProps) {
  // Interactive Simulator State: value between -12 and +12
  const [simValue, setSimValue] = useState<number>(-5);

  const oppositeVal = -simValue;
  const absVal = Math.abs(simValue);

  return (
    <TheoryTemplate
      title="A számok ellentettje és abszolút értéke"
      subtitle="Nullára vonatkozó szimmetria, távolság az origótól, előjelváltás és abszolútérték-egyenlőségek"
      documentId="opposite-absolute-theory-content"
      pdfFilename="5_osztaly_ellentett_abszolut_ertek_tananyag.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      themeColor="amber"
      badgeText="🔄 5. Osztály • I. Az egész számok"
      quickRule={{
        label: "Alapszabály",
        formula: "a + (-a) = 0 | |a| ≥ 0 | |-a| = |a|"
      }}
      practiceTitle="Készen állsz a gyakorlásra?"
      practiceSubtitle="Tedd próbára tudásod a 3 szintű kvízben, a kártyanyitogató párosítóban vagy a csoportosítóban!"
    >
      {/* 1. SZAKASZ: A SZÁM ELLENTETTJE */}
      <TheorySection
        number={1}
        title="A szám ellentettje (Szimmetria a számegyenesen)"
        icon={<ArrowRightLeft className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Mi az ellentett szám?" icon={<ArrowRightLeft className="w-4 h-4 text-amber-600" />} variant="amber">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Két szám egymás <strong>ellentettje</strong>, ha a számegyenesen a nullától (az origótól) <em>egyforma távolságra</em>, de <em>ellentétes irányban</em> helyezkednek el.
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1">
              <div>• <span className="font-bold text-blue-600">+5</span> ellentettje: <span className="font-bold text-rose-600">-5</span></div>
              <div>• <span className="font-bold text-rose-600">-8</span> ellentettje: <span className="font-bold text-blue-600">+8</span> (mert -(-8) = +8)</div>
              <div>• <span className="font-bold text-slate-900 dark:text-white">0</span> ellentettje: <span className="font-bold text-slate-900 dark:text-white">0</span> (önmaga)</div>
            </div>
          </TheoryCard>

          <TheoryCard title="Az ellentettek alaptulajdonságai" icon={<Lightbulb className="w-4 h-4 text-amber-600" />} variant="emerald">
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50">
                <strong className="text-amber-900 dark:text-amber-200">1. Összegük mindig 0:</strong>
                <div className="font-mono font-bold text-amber-700 dark:text-amber-300 text-xs mt-0.5">a + (-a) = 0</div>
                <div className="text-[11px] text-slate-500">Példa: (+6) + (-6) = 0.</div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
                <strong className="text-emerald-900 dark:text-emerald-200">2. Kétszeres ellentett:</strong>
                <div className="font-mono font-bold text-emerald-700 dark:text-emerald-300 text-xs mt-0.5">-(-a) = a</div>
                <div className="text-[11px] text-slate-500">Egy szám ellentettjének az ellentettje az eredeti szám.</div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZAKASZ: A SZÁM ABSZOLÚT ÉRTÉKE */}
      <TheorySection
        number={2}
        title="A szám abszolút értéke (Távolság a nullától)"
        icon={<Compass className="w-5 h-5 text-blue-600" />}
        badgeColor="blue"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Pozitív szám (> 0)" badge="Önmagával egyenlő" variant="emerald">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Pozitív számnál a nullától mért távolság maga a szám:
            </p>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-center font-mono font-bold text-emerald-700 dark:text-emerald-300 text-xs">
              |+7| = 7 &nbsp;|&nbsp; |+24| = 24
            </div>
          </TheoryCard>

          <TheoryCard title="Nulla (= 0)" badge="Nullával egyenlő" variant="default">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A nullának a nullától mért távolsága pontosan 0:
            </p>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-slate-800 dark:text-slate-200 text-xs">
              |0| = 0
            </div>
          </TheoryCard>

          <TheoryCard title="Negatív szám (< 0)" badge="Ellentettjével egyenlő" variant="amber">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Mivel a távolság sosem negatív, elhagyjuk a mínuszjelet:
            </p>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-center font-mono font-bold text-amber-700 dark:text-amber-300 text-xs">
              |-7| = 7 &nbsp;|&nbsp; |-45| = 45
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout variant="tip" title="Kulcsszabály az ellentettek abszolút értékéről">
          Az ellentett számpárok abszolút értéke <strong>mindig megegyezik</strong>: <span className="font-mono font-bold text-amber-700 dark:text-amber-400">|-a| = |a|</span> (pl. $|-9| = |+9| = 9$).
        </TheoryCallout>
      </TheorySection>

      {/* 3. SZAKASZ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        number={3}
        title="Összefoglaló táblázat"
        icon={<Layers className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <TheoryTable
          title="Ellentett és abszolút érték összefüggései"
          headers={['Fogalom', 'Jelölés', 'Geometriai jelentés', 'Példa']}
          rows={[
            ['Szám ellentettje', '-a', 'Tükörkép az origóra (0-ra)', '+9 ellentettje -9 | -15 ellentettje +15'],
            ['Abszolút érték', '|a| ≥ 0', 'Távolság az origótól (0-tól)', '|+8| = 8 | |-8| = 8 | |0| = 0'],
            ['Ellentettek összege', 'a + (-a) = 0', 'Visszatérés a kiindulási 0 pontba', '(+12) + (-12) = 0'],
            ['Külső negatív előjel', '-|a| ≤ 0', 'Távolság ellentettje', '-|+5| = -5 | -|-5| = -5']
          ]}
        />
      </TheorySection>

      {/* 4. SZAKASZ: TIPIKUS HIBÁK ÉS CSAPDÁK */}
      <TheorySection
        number={4}
        title="Tipikus Tévhitek és Gyakori Csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TheoryTrapBox
            title="Az ellentett mindig negatív szám tévhite"
            wrong="-7 ellentettje -7"
            correct="Egy negatív szám ellentettje POZITÍV: -(-7) = +7!"
            explanation="Az ellentett nem 'negatív számot' jelent, hanem ellenkező előjelet az origóhoz képest."
          />
          <TheoryTrapBox
            title="Abszolútértéken kívüli mínuszjel feloldása"
            wrong="-|-5| = 5"
            correct="Először a vonalak belseje: |-5| = 5, majd a külső mínuszjel megmarad: -|-5| = -5!"
            explanation="A moduláris vonalak csak a belső számot teszik pozitívvá, a zárójelen kívüli mínuszjel érvényben marad."
          />
          <TheoryTrapBox
            title="|x| = 6 egyenlet félmegoldása"
            wrong="Csak x = 6 a megoldás"
            correct="Két megoldás van: x = 6 VAGY x = -6!"
            explanation="A 0-tól mért 6 egység távolságra mind a +6, mind a -6 megtalálható a számegyenesen."
          />
          <TheoryTrapBox
            title="A nulla ellentettjének keresése"
            wrong="A 0 ellentettje nem létezik vagy -0"
            correct="A 0 ellentettje önmaga, azaz pontosan 0!"
            explanation="A 0 a tükrözés középpontja, távolsága a nullától 0, így önmaga ellentettje és abszolút értéke is 0."
          />
        </div>
      </TheorySection>

      {/* 5. SZAKASZ: INTERAKTÍV ELLENTETT ÉS ABSZOLÚT ÉRTÉK SZIMULÁTOR */}
      <TheorySection
        number={5}
        title="Interaktív Ellentett és Abszolút Érték Szimulátor"
        icon={<Calculator className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
        className="no-pdf"
      >
        <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 my-4 no-pdf">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Válassz ki egy számot a számegyenesen:
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Figyeld meg az ellentettjét és a nullától mért távolságát (abszolút értékét)!
              </p>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5">
              {[-10, -7, -4, 0, 4, 7, 10].map((val) => (
                <button
                  key={val}
                  onClick={() => setSimValue(val)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all",
                    simValue === val
                      ? "bg-amber-600 text-white shadow-xs"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  {val > 0 ? `+${val}` : val}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Values Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[10px] font-black uppercase text-slate-400">Eredeti szám (a)</div>
              <div className="text-xl font-mono font-black text-blue-600 dark:text-blue-400 mt-0.5">
                {simValue > 0 ? `+${simValue}` : simValue}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[10px] font-black uppercase text-slate-400">Ellentettje (-a)</div>
              <div className="text-xl font-mono font-black text-rose-600 dark:text-rose-400 mt-0.5">
                {oppositeVal > 0 ? `+${oppositeVal}` : oppositeVal}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[10px] font-black uppercase text-slate-400">Abszolút értéke (|a|)</div>
              <div className="text-xl font-mono font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                {absVal}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[10px] font-black uppercase text-slate-400">Összegük (a + (-a))</div>
              <div className="text-xl font-mono font-black text-amber-600 dark:text-amber-400 mt-0.5">
                0
              </div>
            </div>
          </div>

          {/* Visual Number Line */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="text-xs font-black uppercase tracking-wider text-slate-400 text-center">
              Szimmetrikus ábrázolás a számegyenesen
            </div>

            <div className="overflow-x-auto py-3">
              <div className="min-w-[550px] relative flex flex-col items-center">
                {/* Axis Line */}
                <div className="w-full relative flex items-center justify-between h-12 border-b-2 border-slate-800 dark:border-slate-200 px-4">
                  {[-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10].map((tick) => {
                    const isOriginal = simValue === tick;
                    const isOpposite = oppositeVal === tick && simValue !== 0;
                    const isZero = tick === 0;

                    return (
                      <div key={tick} className="flex flex-col items-center relative -bottom-3">
                        {/* Pin / Mark */}
                        {isOriginal && (
                          <div className="absolute -top-7 px-2 py-0.5 bg-blue-600 text-white rounded-md text-[10px] font-black animate-bounce shadow-md">
                            a = {tick > 0 ? `+${tick}` : tick}
                          </div>
                        )}
                        {isOpposite && (
                          <div className="absolute -top-7 px-2 py-0.5 bg-rose-600 text-white rounded-md text-[10px] font-black shadow-md">
                            -a = {tick > 0 ? `+${tick}` : tick}
                          </div>
                        )}

                        <div className={cn(
                          "w-0.5 transition-all",
                          isZero ? "h-6 bg-slate-900 dark:bg-white w-1" : "h-3.5 bg-slate-300 dark:bg-slate-600",
                          (isOriginal || isOpposite) && "bg-amber-500 h-5 w-1"
                        )} />

                        <span className={cn(
                          "text-xs font-mono mt-1 font-bold",
                          isOriginal
                            ? "text-blue-600 dark:text-blue-400 font-black text-sm"
                            : isOpposite
                            ? "text-rose-600 dark:text-rose-400 font-black text-sm"
                            : isZero
                            ? "text-slate-900 dark:text-white font-black"
                            : "text-slate-400"
                        )}>
                          {tick > 0 ? `+${tick}` : tick}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="text-xs text-center text-slate-500 dark:text-slate-400 space-y-1">
              <p>
                A <strong className="text-blue-600">{simValue > 0 ? `+${simValue}` : simValue}</strong> és a <strong className="text-rose-600">{oppositeVal > 0 ? `+${oppositeVal}` : oppositeVal}</strong> pontok egyenlő, <strong>{absVal} egység</strong> távolságra vannak a nullától.
              </p>
            </div>
          </div>

          {/* Slider Control */}
          <div className="space-y-2 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
              <span>-10</span>
              <span className="font-mono text-amber-600 dark:text-amber-400 font-black">Kiválasztott szám: {simValue > 0 ? `+${simValue}` : simValue}</span>
              <span>+10</span>
            </div>
            <input
              type="range"
              min={-10}
              max={10}
              value={simValue}
              onChange={(e) => setSimValue(parseInt(e.target.value, 10))}
              className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex items-center justify-between pt-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSimValue((prev) => Math.max(-10, prev - 1))}
                className="rounded-xl h-8 px-2.5 text-xs"
              >
                -1 léptetés
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSimValue(0)}
                className="rounded-xl h-8 px-2.5 text-xs text-slate-500"
              >
                Origóba (0)
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSimValue((prev) => Math.min(10, prev + 1))}
                className="rounded-xl h-8 px-2.5 text-xs"
              >
                +1 léptetés
              </Button>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}

export default OppositeAbsoluteTheory;
