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
  Thermometer,
  Compass,
  Zap,
  Layers,
  Snowflake,
  TrendingUp,
  Info,
  AlertTriangle,
  Sparkles,
  Calculator
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NegativeNumbersTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function NegativeNumbersTheory({ onBack, onStartQuiz }: NegativeNumbersTheoryProps) {
  // Interactive Thermometer & Number Line State (-20 to +30)
  const [tempValue, setTempValue] = useState<number>(-5);

  // Helper for real-life interpretation of tempValue
  const getTempDescription = (val: number) => {
    if (val < -15) {
      return {
        title: 'Extrém sarkvidéki fagy! 🥶❄️',
        desc: `Mínusz ${Math.abs(val)} °C: Vastag télikabát, sapka, sál és kesztyű kötelező. A vizek vastagon befagynak.`,
        badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300',
        sign: 'Negatív szám (< 0)'
      };
    }
    if (val < 0) {
      return {
        title: 'Fagypont alatti hideg tél ❄️',
        desc: `Mínusz ${Math.abs(val)} °C: A csapadék havazásként hullhat, jég képződik az utakon.`,
        badgeBg: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border-cyan-300',
        sign: 'Negatív szám (< 0)'
      };
    }
    if (val === 0) {
      return {
        title: 'Pontosan a Fagypont (Origó) 🧊💧',
        desc: '0 °C: A víz fagyáspontja és a jég olvadáspontja. Semleges kiindulási pont: se nem pozitív, se nem negatív!',
        badgeBg: 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-400',
        sign: 'Semleges (Origó = 0)'
      };
    }
    if (val <= 15) {
      return {
        title: 'Hűvös tavaszi / őszi idő 🍂🌱',
        desc: `Plusz ${val} °C: Vékony kabát vagy pulóver ajánlott. A fagypont felett vagyunk.`,
        badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300',
        sign: 'Pozitív szám (> 0)'
      };
    }
    return {
      title: 'Kellemes nyári meleg ☀️🌻',
      desc: `Plusz ${val} °C: Pólóidő, strandolásra alkalmas hőmérséklet a fagypont jóval felett.`,
      badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300',
      sign: 'Pozitív szám (> 0)'
    };
  };

  const currentDesc = getTempDescription(tempValue);

  return (
    <TheoryTemplate
      title="Negatív számok"
      subtitle="A negatív számok mindennapi megjelenése, előjelek, a nulla szerepe és a számegyenes felépítése"
      documentId="negative-numbers-theory-content"
      pdfFilename="5_osztaly_negativ_szamok_tananyag.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      themeColor="cyan"
      badgeText="❄️ 5. Osztály • I. Az egész számok"
      quickRule={{
        label: "Számkör",
        formula: "Negatív (< 0) | 0 (origó) | Pozitív (> 0)"
      }}
      practiceTitle="Készen állsz a negatív számok gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod a 3 szintű kvízben, a kártyanyitogató párosítóban vagy a csoportosítóban!"
    >
      {/* 1. SZAKASZ: NEGATÍV SZÁMOK A MINDENNAPOKBAN */}
      <TheorySection
        number={1}
        title="A negatív számok a mindennapi életben"
        icon={<Snowflake className="w-5 h-5 text-cyan-600" />}
        badgeColor="cyan"
      >
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          A természetes számok (0, 1, 2, 3, ...) elegendőek dolgok megszámlálásához, de a valóságban sok olyan jelenség van, ahol egy <strong>viszonyítási alaphoz (nullához)</strong> képest ellentétes irányú vagy hiányt jelentő mennyiségekkel találkozunk:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-3">
          <TheoryCard title="Hőmérséklet" icon={<Thermometer className="w-4 h-4 text-cyan-600" />} variant="cyan">
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-cyan-100 dark:border-slate-800 text-xs space-y-1">
              <div><strong>0 °C:</strong> Víz fagyáspontja</div>
              <div className="text-cyan-600 dark:text-cyan-400 font-bold"><strong>-8 °C:</strong> 8 fok fagy (hidegebb)</div>
              <div className="text-amber-600 dark:text-amber-400 font-bold"><strong>+15 °C:</strong> 15 fok meleg</div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Minél nagyobb a szám a mínuszjel után, annál nagyobb a hideg (-15 °C hidegebb, mint -3 °C).
            </p>
          </TheoryCard>

          <TheoryCard title="Tengerszint" icon={<Compass className="w-4 h-4 text-blue-600" />} variant="blue">
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 text-xs space-y-1">
              <div><strong>0 m:</strong> Tenger felszíne</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold"><strong>+1014 m:</strong> Kékes-tető (hegy)</div>
              <div className="text-blue-600 dark:text-blue-400 font-bold"><strong>-28 m:</strong> Holt-tenger (mélyföld)</div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              A negatív magasságok a tengerszint alatti szárazföldi mélyföldeket vagy tenger alatti mélységeket jelzik.
            </p>
          </TheoryCard>

          <TheoryCard title="Pénzügy / Egyenleg" icon={<Zap className="w-4 h-4 text-emerald-600" />} variant="emerald">
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 text-xs space-y-1">
              <div><strong>0 Ft:</strong> Nincs pénz, nincs adósság</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold"><strong>+5 000 Ft:</strong> Megtakarítás</div>
              <div className="text-rose-600 dark:text-rose-400 font-bold"><strong>-2 000 Ft:</strong> Tartozás, hitel</div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              A negatív egyenleg azt mutatja, hogy tartozunk a banknak vagy másnak (tartozás).
            </p>
          </TheoryCard>

          <TheoryCard title="Lift / Szintek" icon={<Layers className="w-4 h-4 text-purple-600" />} variant="purple">
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 text-xs space-y-1">
              <div><strong>0:</strong> Földszint (bejárat)</div>
              <div className="text-purple-600 dark:text-purple-400 font-bold"><strong>+3:</strong> 3. emelet</div>
              <div className="text-indigo-600 dark:text-indigo-400 font-bold"><strong>-2:</strong> 2. alagsor / mélygarázs</div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              A földszint alatti szinteket (pincék, alagutak) negatív számokkal számozzák a liftekben.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZAKASZ: ELŐJELEK ÉS A SZÁMEGYENES */}
      <TheorySection
        number={2}
        title="Előjelek, a nulla szerepe és a számegyenes"
        icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
        badgeColor="blue"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Negatív számok (< 0)" icon={<Snowflake className="w-4 h-4 text-cyan-600" />} variant="cyan">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A nullánál kisebb számok. A számegyenesen a <strong>nullától balra</strong> helyezkednek el.
            </p>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg text-xs font-mono font-bold text-cyan-700 dark:text-cyan-300 text-center">
              -1, -2, -3, -4, -5, ...
            </div>
            <div className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 text-[11px]">
              <strong>Szabály:</strong> A mínusz (-) előjelet <em>mindig kötelező</em> kiírni!
            </div>
          </TheoryCard>

          <TheoryCard title="A Nulla (0) szerepe" icon={<Info className="w-4 h-4 text-amber-500" />} variant="amber">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A nulla a számegyenes középpontja (<strong>origó</strong>), a viszonyítási alap.
            </p>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg text-xs font-mono font-bold text-slate-900 dark:text-white text-center">
              0 (semleges origó)
            </div>
            <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-[11px]">
              <strong>Fontos:</strong> A 0 <em>se nem pozitív, se nem negatív</em> szám!
            </div>
          </TheoryCard>

          <TheoryCard title="Pozitív számok (> 0)" icon={<TrendingUp className="w-4 h-4 text-emerald-600" />} variant="emerald">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A nullánál nagyobb számok. A számegyenesen a <strong>nullától jobbra</strong> helyezkednek el.
            </p>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 text-center">
              +1 (1), +2 (2), +3 (3), ...
            </div>
            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-[11px]">
              <strong>Szabály:</strong> A plusz (+) előjel <em>elhagyható</em> (+5 = 5).
            </div>
          </TheoryCard>
        </div>

        {/* Vizuális számegyenes grafika */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-50 via-slate-50 to-emerald-50 dark:from-cyan-950/30 dark:via-slate-900 dark:to-emerald-950/30 border-2 border-slate-200 dark:border-slate-800 text-center space-y-3 mt-4">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            A számegyenes felépítése és a rendezés szabálya
          </div>

          <div className="overflow-x-auto py-2">
            <div className="min-w-[500px] flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-xs font-bold px-4 mb-2">
                <span className="text-cyan-700 dark:text-cyan-400 flex items-center gap-1">
                  ◀ BALRA: Csökkenő értékek (hidegebb, mélyebb)
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  JOBBRA: Növekvő értékek (melegebb, magasabb) ▶
                </span>
              </div>

              <div className="w-full relative flex items-center justify-between h-10 border-b-2 border-slate-800 dark:border-slate-200 px-6">
                {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="flex flex-col items-center relative -bottom-2.5">
                    <div className={cn(
                      "w-0.5",
                      num === 0 ? "h-6 bg-slate-900 dark:bg-white w-1" : "h-3.5 bg-slate-400 dark:bg-slate-500"
                    )} />
                    <span className={cn(
                      "text-xs font-mono font-black mt-1",
                      num === 0
                        ? "text-slate-950 dark:text-white text-sm bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded-md"
                        : num < 0
                        ? "text-cyan-700 dark:text-cyan-400"
                        : "text-emerald-700 dark:text-emerald-400"
                    )}>
                      {num > 0 ? `+${num}` : num}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300">
            <strong>Aranyszabály:</strong> Két szám közül a számegyenesen az a <strong>nagyobb</strong>, amelyik <em>jobbra</em> helyezkedik el! (Például: <span className="font-mono font-bold text-cyan-600">-2 &gt; -5</span>, mert a -2 jobbrább van, mint a -5).
          </p>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        number={3}
        title="Összefoglaló táblázat"
        icon={<Layers className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <TheoryTable
          title="Negatív, semleges és pozitív számok tulajdonságai"
          headers={['Kategória', 'Előjel', 'Hely a számegyenesen', 'Gyakorlati példa']}
          rows={[
            ['Negatív számok', '- (mínusz, kötelező)', 'Nullától balra (< 0)', '-5 °C hideg, -2 000 Ft tartozás'],
            ['Nulla (Origó)', 'Nincs előjele (semleges)', 'Középpont (= 0)', '0 °C víz fagyáspontja, tengerszint'],
            ['Pozitív számok', '+ (plusz, elhagyható)', 'Nullától jobbra (> 0)', '+25 °C meleg, +1014 m hegycsúcs']
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
            title="A -10 nagyobb mint a -2, mert 10 > 2 tévhite"
            wrong="-10 > -2"
            correct="-10 < -2 (mert a -10 balrább van a számegyenesen és jóval hidegebb!)"
            explanation="Negatív számoknál minél nagyobb a szám abszolút értéke, valójában annál kisebb a szám maga."
          />
          <TheoryTrapBox
            title="A nulla előjelének tévesztése"
            wrong="A nulla pozitív szám vagy van +0 és -0"
            correct="A nulla semleges: se nem pozitív, se nem negatív, előjel nélkül áll!"
            explanation="A nulla az elválasztó origó a pozitív és negatív számok tartománya között."
          />
          <TheoryTrapBox
            title="A negatív előjel elhagyása"
            wrong="-7 = 7"
            correct="A plusz (+) elhagyható (+7 = 7), de a mínusz (-) KIÍRÁSA MINDIG KÖTELEZŐ (-7 ≠ 7)!"
            explanation="Előjel nélkül a számot automatikusan pozitívnak tekintjük, így a -7-ből 7-et írva az érték teljesen megváltozik."
          />
          <TheoryTrapBox
            title="Változások irányának tévesztése"
            wrong="Ha -3 °C-ról melegszik 5 °C-ot, az -8 °C lesz"
            correct="Melegedéskor jobbra lépünk a számegyenesen: -3 + 5 = +2 °C!"
            explanation="A melegedés/emelkedés jobbra (+), a hűlés/csökkenés/mélyülés balra (-) mozdítja el a pontot."
          />
        </div>
      </TheorySection>

      {/* 5. SZAKASZ: INTERAKTÍV HŐMÉRŐ ÉS SZÁMEGYENES SZIMULÁTOR */}
      <TheorySection
        number={5}
        title="Interaktív Hőmérő és Számegyenes Kísérletező"
        icon={<Calculator className="w-5 h-5 text-cyan-600" />}
        badgeColor="cyan"
        className="no-pdf"
      >
        <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 my-4 no-pdf">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Állítsd be a hőmérsékletet és figyeld a számegyenes helyzetét:
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Kattints a gyorsgombokra vagy használd a léptetőt!
              </p>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5">
              {[-20, -10, -5, 0, 5, 15, 25].map((val) => (
                <button
                  key={val}
                  onClick={() => setTempValue(val)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all",
                    tempValue === val
                      ? "bg-cyan-600 text-white shadow-xs"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  {val > 0 ? `+${val}°C` : `${val}°C`}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
            {/* Thermometer column */}
            <div className="md:col-span-4 flex flex-col items-center justify-center bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-black uppercase text-slate-400 mb-2">Hőmérő higanyszála</div>

              <div className="relative w-12 h-56 bg-slate-100 dark:bg-slate-900 rounded-full border-4 border-slate-300 dark:border-slate-700 flex flex-col justify-end items-center p-1 overflow-hidden shadow-inner">
                {/* Scale marks */}
                <div className="absolute inset-y-2 left-1 flex flex-col justify-between text-[9px] font-mono text-slate-400">
                  <span>+30</span>
                  <span>+20</span>
                  <span>+10</span>
                  <span className="font-bold text-slate-900 dark:text-white">0</span>
                  <span>-10</span>
                  <span>-20</span>
                </div>

                {/* Zero line indicator */}
                <div className="absolute top-[60%] w-full h-0.5 bg-slate-400 z-10" />

                {/* Liquid fill */}
                <div
                  className={cn(
                    "w-6 rounded-b-full transition-all duration-300",
                    tempValue > 0
                      ? "bg-gradient-to-t from-orange-500 to-rose-500"
                      : tempValue === 0
                      ? "bg-slate-400"
                      : "bg-gradient-to-t from-blue-700 to-cyan-400"
                  )}
                  style={{
                    height: `${Math.max(8, Math.min(100, ((tempValue + 20) / 50) * 100))}%`
                  }}
                />
              </div>

              <div className="mt-3 text-2xl font-mono font-black text-slate-900 dark:text-white">
                {tempValue > 0 ? `+${tempValue} °C` : `${tempValue} °C`}
              </div>
            </div>

            {/* Description & Controls */}
            <div className="md:col-span-8 space-y-4">
              <div className={cn("p-4 rounded-2xl border-2 space-y-2", currentDesc.badgeBg)}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-900/80 border">
                    {currentDesc.sign}
                  </span>
                  <span className="text-xs font-mono font-bold">
                    Helyzet a 0-hoz képest: {tempValue < 0 ? `${Math.abs(tempValue)} egységgel balra` : tempValue === 0 ? 'Origóban' : `${tempValue} egységgel jobbra`}
                  </span>
                </div>

                <h4 className="text-base font-black">
                  {currentDesc.title}
                </h4>

                <p className="text-xs sm:text-sm leading-relaxed font-medium">
                  {currentDesc.desc}
                </p>
              </div>

              {/* Slider Control */}
              <div className="space-y-2 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                  <span>-20 °C (Fagyos)</span>
                  <span>0 °C (Fagypont)</span>
                  <span>+30 °C (Meleg)</span>
                </div>
                <input
                  type="range"
                  min={-20}
                  max={30}
                  value={tempValue}
                  onChange={(e) => setTempValue(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
                <div className="flex items-center justify-between pt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setTempValue((prev) => Math.max(-20, prev - 1))}
                    className="rounded-xl h-8 px-2.5 text-xs"
                  >
                    -1 °C hűlés
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setTempValue(0)}
                    className="rounded-xl h-8 px-2.5 text-xs text-slate-500"
                  >
                    Fagypontra (0 °C)
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setTempValue((prev) => Math.min(30, prev + 1))}
                    className="rounded-xl h-8 px-2.5 text-xs"
                  >
                    +1 °C melegedés
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}

export default NegativeNumbersTheory;
