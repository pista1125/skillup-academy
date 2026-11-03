import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  DistanceTimeSvg,
  SpeedTimeAreaSvg,
  HeartRateOrWeatherSvg
} from './EverydayGraphsFigures';
import {
  Car,
  Clock,
  Sliders,
  TrendingUp,
  Activity,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Compass,
  ArrowRight,
  Hash,
  HeartPulse,
  Flame
} from 'lucide-react';

interface EverydayGraphsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const EverydayGraphsTheory: React.FC<EverydayGraphsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV UTAZÁS ÉS ÁTLAGSEBESSÉG LABOR ---
  const [dist1, setDist1] = useState<number>(60);
  const [speed1, setSpeed1] = useState<number>(60); // 1 óra
  const [restTime, setRestTime] = useState<number>(30); // 30 perc = 0.5 óra
  const [dist2, setDist2] = useState<number>(80);
  const [speed2, setSpeed2] = useState<number>(80); // 1 óra

  const tripStats = useMemo(() => {
    const time1Hours = speed1 > 0 ? dist1 / speed1 : 0;
    const restHours = restTime / 60;
    const time2Hours = speed2 > 0 ? dist2 / speed2 : 0;

    const totalDist = dist1 + dist2;
    const drivingTimeHours = time1Hours + time2Hours;
    const totalTimeHours = drivingTimeHours + restHours;

    const drivingAvgSpeed = drivingTimeHours > 0 ? (totalDist / drivingTimeHours).toFixed(1) : '0';
    const totalAvgSpeed = totalTimeHours > 0 ? (totalDist / totalTimeHours).toFixed(1) : '0';

    return {
      time1Hours: time1Hours.toFixed(2),
      time2Hours: time2Hours.toFixed(2),
      restHours: restHours.toFixed(2),
      totalDist,
      drivingTimeHours: drivingTimeHours.toFixed(2),
      totalTimeHours: totalTimeHours.toFixed(2),
      drivingAvgSpeed,
      totalAvgSpeed
    };
  }, [dist1, speed1, restTime, dist2, speed2]);

  return (
    <TheoryTemplate
      title="4. Grafikonok a mindennapokban"
      subtitle="Út-idő, sebesség-idő, élettani és pénzügyi diagramok értelmezése, a görbe alatti terület és a valóság kapcsolata"
      badge="9. Osztály • V. Függvények"
      topicBadge="9. OSZTÁLY • V. FÜGGVÉNYEK • 4. GRAFIKONOK A MINDENNAPOKBAN"
      onBack={onBack}
      onSwitchToQuiz={onStartQuiz}
      practiceTitle="Készen állsz a mindennapi grafikonok feladványaira?"
      practiceSubtitle="Tedd próbára tudásodat a 30 válogatott feladatból álló, 3 szintre bontott interaktív kvízben!"
      practiceButtonText="Kvíz indítása"
      quickRule={{
        label: "Sebesség-idő alatti terület szabálya",
        formula: "Megtett út (s) = a v-t grafikon görbéje alatti síkidom területe",
        align: "center"
      }}
    >
      {/* =========================================================================
          1. RÉSZ: ÚT-IDŐ (s-t) GRAFIKONOK
      ========================================================================= */}
      <TheorySection
        title="1. Út-idő (s-t) grafikonok elemzése"
        icon={<Car className="w-6 h-6 text-blue-600" />}
      >
        <TheoryCard
          title="Mozgások, pihenők és találkozások a koordinátasíkon"
          icon={<Car className="w-5 h-5 text-blue-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Az út-idő grafikonon a vízszintes tengely az eltelt időt ($t$), a függőleges tengely a kiindulóponttól mért távolságot vagy a megtett utat ($s$) jelöli.
          </p>

          <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 my-4">
            <DistanceTimeSvg size={300} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs my-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900">
              <span className="font-bold text-blue-800 dark:text-blue-300 block mb-1">Meredekség = Sebesség:</span>
              Minél meredekebb az egyenes szakasz, annál nagyobb a test sebessége: {'$v = \\frac{\\Delta s}{\\Delta t}$'}.
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900">
              <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">Vízszintes = Álló helyzet:</span>
              A távolság nem változik ($\Delta s = 0$), vagyis a jármű áll (pihenő, dugó, parkolás).
            </div>
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-lg border border-rose-200 dark:border-rose-900">
              <span className="font-bold text-rose-800 dark:text-rose-300 block mb-1">Metszéspont = Találkozás:</span>
              A két görbe metszéspontja adja meg a két mozgó test találkozásának pontos helyét és idejét.
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          2. RÉSZ: SEBESSÉG-IDŐ (v-t) GRAFIKON ÉS A GÖRBE ALATTI TERÜLET
      ========================================================================= */}
      <TheorySection
        title="2. Sebesség-idő (v-t) grafikon és a megtett út"
        icon={<Clock className="w-6 h-6 text-indigo-600" />}
      >
        <TheoryCard
          title="Miért egyenlő a megtett út a grafikon alatti területtel?"
          icon={<Clock className="w-5 h-5 text-indigo-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Egyenletes mozgásnál $s = v \cdot t$. Ha a sebesség-idő diagramon egy vízszintes szakaszt nézünk, a görbe alatti terület egy téglalap, melynek szélessége az idő ($t$), magassága a sebesség ($v$). A téglalap területe éppen $v \cdot t$, vagyis a megtett út!
          </p>

          <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 my-4">
            <SpeedTimeAreaSvg size={300} />
          </div>

          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl border border-indigo-200 dark:border-indigo-800 text-sm">
            <span className="font-bold text-indigo-900 dark:text-indigo-300 block mb-2">Területszámítás szakaszosan:</span>
            <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-xs">
              <li><strong>Egyenletes gyorsulás (0-ról indulva):</strong> Derékszögű háromszög területe: {'$s_1 = \\frac{v \\cdot t}{2}$'}.</li>
              <li><strong>Állandó sebességű haladás:</strong> Téglalap területe: {'$s_2 = v \\cdot \\Delta t$'}.</li>
              <li><strong>Teljes út:</strong> Az egyes idomok részterületeinek összege: {'$s_{\\text{összes}} = s_1 + s_2$'}.</li>
            </ul>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          3. RÉSZ: INTERAKTÍV UTAZÁSI ÉS ÁTLAGSEBESSÉG LABOR
      ========================================================================= */}
      <TheorySection
        title="3. Interaktív Utazási Laboratórium"
        icon={<Sliders className="w-6 h-6 text-emerald-600" />}
      >
        <TheoryCard
          title="Menetidők, pihenők és átlagsebesség vizsgálata valós időben"
          icon={<Sliders className="w-5 h-5 text-emerald-600" />}
        >
          <div className="p-5 bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/70 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800/80 shadow-md">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              Egy két szakaszból és egy köztes pihenőből álló utazást vizsgálunk. Figyeld meg a tiszta mozgási és a teljes utazási átlagsebesség közötti különbséget!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>1. Szakasz: {dist1} km ({speed1} km/h mellett)</span>
                    <span className="text-blue-600">{tripStats.time1Hours} óra</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="150"
                    value={dist1}
                    onChange={(e) => setDist1(parseInt(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Közbenső Pihenő: {restTime} perc</span>
                    <span className="text-amber-600">{tripStats.restHours} óra</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="120"
                    step="10"
                    value={restTime}
                    onChange={(e) => setRestTime(parseInt(e.target.value))}
                    className="w-full accent-amber-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>2. Szakasz: {dist2} km ({speed2} km/h mellett)</span>
                    <span className="text-emerald-600">{tripStats.time2Hours} óra</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="150"
                    value={dist2}
                    onChange={(e) => setDist2(parseInt(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>

              {/* Összesítő statisztika */}
              <div className="space-y-2.5 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <div className="flex justify-between pb-1.5 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-400">Teljes megtett út:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{tripStats.totalDist} km</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-400">Tiszta vezetési idő:</span>
                  <span className="font-mono font-bold">{tripStats.drivingTimeHours} óra</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-400">Teljes idő (pihenővel):</span>
                  <span className="font-mono font-bold">{tripStats.totalTimeHours} óra</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-slate-100 dark:border-slate-700 bg-blue-50/60 dark:bg-blue-950/30 p-1.5 rounded">
                  <span className="font-semibold text-blue-900 dark:text-blue-300">Tiszta mozgási átlagsebesség:</span>
                  <span className="font-mono font-black text-blue-700 dark:text-blue-400">{tripStats.drivingAvgSpeed} km/h</span>
                </div>
                <div className="flex justify-between bg-emerald-50/60 dark:bg-emerald-950/30 p-1.5 rounded">
                  <span className="font-semibold text-emerald-900 dark:text-emerald-300">Teljes utazási átlagsebesség:</span>
                  <span className="font-mono font-black text-emerald-700 dark:text-emerald-400">{tripStats.totalAvgSpeed} km/h</span>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          TIPIKUS HIBÁK ÉS CSAPDÁK DOBOZ
      ========================================================================= */}
      <TheoryTrapBox
        title="Tipikus hibák a mindennapi grafikonok olvasásakor"
        traps={[
          {
            wrong: 'Az út-idő grafikont úgy nézzük, mint a bicikli fizikai útvonalát (pl. lefelé tartó egyenesnél azt gondoljuk, lejtőn gurul le).',
            correct: 'A grafikon nem a domborzat rajza! A lefelé tartó egyenes azt jelenti, hogy a kiindulási pont felé KÖZELEDÜNK (csökken a távolság).',
            explanation: 'Gondolj a koordinátákra: s(t) a startponttól mért pillanatnyi távolságot jelzi.'
          },
          {
            wrong: 'Sebesség-idő grafikonon a vízszintes szakaszra azt mondjuk, hogy a test „áll”.',
            correct: 'Sebesség-idő grafikonon a vízszintes szakasz ÁLLANDÓ SEBESSÉGŰ MOZGÁST jelent (pl. 90 km/h-s tempomattal suhanunk)!',
            explanation: 'Csak az út-idő grafikonon jelent a vízszintes szakasz álló helyzetet. A v-t grafikonon az álló helyzet a v = 0 tengelyen fekszik.'
          },
          {
            wrong: 'Pulzus- vagy hőmérséklet-grafikonon az ingadozás nagyságát a teljes átlaggal tévesztjük össze.',
            correct: 'Az ingadozás mértéke a TERJEDELEM (maximum - minimum), míg az átlag az összes érték súlyozott számtani közepe.',
            explanation: 'Például egy 60 és 160 bpm közötti pulzusnál az ingadozás 100 bpm, az átlag pedig kb. 110 bpm.'
          }
        ]}
      />

      {/* =========================================================================
          ÖSSZEFOGLALÓ TÁBLÁZAT
      ========================================================================= */}
      <TheoryCard
        title="Út-idő és Sebesség-idő Grafikonok Összehasonlítója"
        icon={<Hash className="w-6 h-6 text-blue-600" />}
      >
        <TheoryTable
          headers={['Jellemző', 'Út-idő grafikon (s-t)', 'Sebesség-idő grafikon (v-t)']}
          rows={[
            ['Függőleges tengely', 'Megtett út vagy távolság (s)', 'Pillanatnyi sebesség (v)'],
            ['Vízszintes szakasz', 'A test áll (v = 0)', 'Egyenletes mozgás (v = állandó)'],
            ['Felfelé emelkedő egyenes', 'Egyenletes sebességű távolodás', 'Egyenletesen gyorsuló mozgás'],
            ['Lefelé tartó egyenes', 'Egyenletes sebességű visszatérés', 'Egyenletesen fékező mozgás'],
            ['Görbe alatti terület', 'Fizikailag nincs közvetlen jelentése', 'Megadja a teljes megtett utat (s)'],
            ['Meredekség (m)', 'A mozgás sebessége (v)', 'A mozgás gyorsulása (a)']
          ]}
        />
      </TheoryCard>
    </TheoryTemplate>
  );
};

