import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  BarChart3,
  LineChart,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  Eye,
  Layers,
  Sparkles,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import {
  ColumnChartSvg,
  BarChartSvg,
  LineChartSvg,
  DoubleColumnChartSvg,
  MisleadingChartSvg
} from './ChartsDiagramsDiagrams';

interface ChartsDiagramsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ChartsDiagramsTheory: React.FC<ChartsDiagramsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív labor állapota: 4 nap adatai (pl. napi olvasott oldalszám vagy fagylalt eladás)
  const [dataPoints, setDataPoints] = useState<number[]>([12, 18, 15, 25]);
  const [chartType, setChartType] = useState<'column' | 'line'>('column');

  const days = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök'];
  const maxVal = Math.max(...dataPoints);
  const minVal = Math.min(...dataPoints);
  const sumVal = dataPoints.reduce((a, b) => a + b, 0);
  const avgVal = (sumVal / dataPoints.length).toFixed(1);

  const sections: TheorySection[] = [
    {
      id: 'sec-intro',
      title: '1. Miért használunk diagramokat? Az adatok vizuális ereje',
      badge: 'Alapgondolat',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A mindennapi életben – az időjárás-jelentéstől a sportstatisztikákon át a gazdasági hírekig – hatalmas mennyiségű adattal találkozunk. Egy hosszú számtáblázatot nehéz és lassú átlátni. A <strong>diagramok és grafikonok</strong> célja, hogy a száraz számadatokat azonnal érthető, képi formába öntsék: egyetlen pillantással felmérhetjük az arányokat, a szélsőértékeket és a változási trendeket.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center">
              <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider block">
                1. Gyors összehasonlítás
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Azonnal látszik, melyik kategória a legnagyobb (legmagasabb oszlop) és melyik a legkisebb.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-center">
              <span className="text-[11px] font-bold text-cyan-700 dark:text-cyan-300 uppercase tracking-wider block">
                2. Időbeli trendek
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Láthatóvá válik, hogy egy mennyiség növekszik, csökken, vagy éppen stagnál.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center">
              <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block">
                3. Összefüggések feltárása
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Két összetartozó adat (pl. eltelt idő és megtett út) közötti kapcsolat könnyen leolvasható.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-column-chart',
      title: '2. Az oszlopdiagram: Különálló csoportok összevetése',
      badge: 'Gyakori típus',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Az <strong>oszlopdiagram</strong> esetén függőleges téglalapok (oszlopok) jelenítik meg a mért adatokat. Az oszlopok alapjai azonos szélességűek, a <strong>magasságuk pedig egyenesen arányos</strong> a kifejezett mennyiséggel.
          </p>

          <ColumnChartSvg />

          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-2">
            <div className="font-bold text-sm text-blue-900 dark:text-blue-200 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" /> Az oszlopdiagram kötelező elemei:
            </div>
            <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong>Vízszintes tengely (X-tengely):</strong> A vizsgált kategóriák neve (pl. tantárgyak, sportágak, hónapok).</li>
              <li><strong>Függőleges tengely (Y-tengely):</strong> A mért mennyiség skálája (pl. létszám főben, magasság cm-ben).</li>
              <li><strong>Egyenletes skálabeosztás:</strong> A jelöléseknek egyenlő távolságra kell lenniük, és mindig a 0 értéktől kell indulniuk!</li>
              <li><strong>Rácsvonalak:</strong> Segítik a pontos értékek szemmel történő leolvasását.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'sec-bar-chart',
      title: '3. A sávdiagram: Vízszintes elrendezés',
      badge: 'Elrendezés',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A <strong>sávdiagram</strong> az oszlopdiagram "elforgatott" változata: itt a téglalapok vízszintesen nyúlnak el. A sávok <strong>hosszúsága</strong> mutatja az érték nagyságát.
          </p>

          <BarChartSvg />

          <div className="p-3.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 flex items-start gap-2.5">
            <Lightbulb className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <strong>Mikor érdemes sávdiagramot választani?</strong>
              <br />
              Ha a kategóriák nevei hosszúak (pl. "Természettudományi és környezetvédelmi szakkör", "Kalandregények"), a függőleges oszlopok alatt a feliratok egymásba lógnának vagy ferdén kellene írni őket. A sávdiagram bal oldalán bőséges hely van a hosszabb szövegeknek is!
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-line-chart',
      title: '4. A vonaldiagram: Folytonos változások és időbeli folyamatok',
      badge: 'Folyamatok',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Amikor egy mennyiség <strong>az idő múlásával folyamatosan változik</strong> (például a levegő hőmérséklete egy nap során, egy kiránduló által megtett távolság vagy a vízállás a Dunán), a legkiválóbb eszköz a <strong>vonaldiagram</strong> (vagy grafikon).
          </p>

          <LineChartSvg />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
              <strong className="text-emerald-900 dark:text-emerald-300 block mb-1">Hogyan készítjük?</strong>
              1. A vízszintes tengelyre az időpontokat, a függőlegesre az értékeket jelöljük be.<br />
              2. Minden időponthoz felmérjük a hozzá tartozó pontot.<br />
              3. A pontokat egyenes szakaszokkal kötjük össze.
            </div>
            <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800">
              <strong className="text-teal-900 dark:text-teal-300 block mb-1">Mit árul el a vonal lefutása?</strong>
              • <strong>Felfelé haladó szakasz:</strong> Növekedés, emelkedés (melegedés, gyorsulás).<br />
              • <strong>Vízszintes szakasz:</strong> Állandó érték (stagnálás, pihenő).<br />
              • <strong>Lefelé haladó szakasz:</strong> Csökkenés (hűlés, lassulás).<br />
              • <strong>Legmagasabb pont:</strong> Maximum; <strong>Legalsó pont:</strong> Minimum.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-double-column',
      title: '5. Csoportosított (kettős) oszlopdiagram és a jelmagyarázat',
      badge: 'Összehasonlítás',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Gyakran két vagy több csoportot szeretnénk ugyanazon szempont szerint összehasonlítani – például két párhuzamos osztály (6.A és 6.B) dolgozatainak eredményét, vagy fiúk és lányok sporteredményeit. Ekkor egymás mellé helyezett, eltérő színű oszlopcsoportokat használunk.
          </p>

          <DoubleColumnChartSvg />

          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-xs sm:text-sm">
            <strong>A Jelmagyarázat (Legenda) szerepe:</strong><br />
            Ha több színű vagy mintázatú oszlop van a diagramon, elengedhetetlen egy kis magyarázó doboz (általában a jobb felső sarokban), amely egyértelműen bemutatja, hogy melyik szín melyik csoporthoz tartozik.
          </div>
        </div>
      )
    },
    {
      id: 'sec-interactive-lab',
      title: '6. Interaktív diagramlaboratórium',
      badge: 'Dinamikus labor',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Állítsd be a négy nap mért értékeit a csúszkákkal, és válts az oszlop- és vonaldiagram között! Figyeld meg a számított statisztikai mutatókat valós időben:
          </p>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-blue-800 shadow-sm space-y-4">
            {/* Nézetváltó gombok */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Nézet kiválasztása:
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={chartType === 'column' ? 'default' : 'outline'}
                  onClick={() => setChartType('column')}
                  className={chartType === 'column' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                >
                  <BarChart3 className="w-4 h-4 mr-1.5" /> Oszlopdiagram
                </Button>
                <Button
                  size="sm"
                  variant={chartType === 'line' ? 'default' : 'outline'}
                  onClick={() => setChartType('line')}
                  className={chartType === 'line' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                >
                  <LineChart className="w-4 h-4 mr-1.5" /> Vonaldiagram
                </Button>
              </div>
            </div>

            {/* Csúszkák */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {days.map((day, idx) => (
                <div key={day} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200 mb-1">
                    <span>{day}</span>
                    <span className="text-blue-600 font-black">{dataPoints[idx]} pont</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="35"
                    value={dataPoints[idx]}
                    onChange={(e) => {
                      const next = [...dataPoints];
                      next[idx] = Number(e.target.value);
                      setDataPoints(next);
                    }}
                    className="w-full accent-blue-600"
                  />
                </div>
              ))}
            </div>

            {/* Dinamikus SVG megjelenítés */}
            <div className="w-full max-w-[560px] mx-auto bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <svg viewBox="0 0 500 200" className="w-full h-auto">
                {/* Vízszintes rácsvonalak (0, 10, 20, 30, 40) */}
                {[0, 10, 20, 30, 40].map((v) => {
                  const y = 160 - v * 3.5;
                  return (
                    <g key={v}>
                      <line x1="40" y1={y} x2="470" y2={y} stroke="#cbd5e1" strokeDasharray="3,3" strokeWidth="1" />
                      <text x="32" y={y + 3} fill="#64748b" fontSize="9" textAnchor="end">{v}</text>
                    </g>
                  );
                })}

                {/* Tengelyek */}
                <line x1="40" y1="160" x2="40" y2="15" stroke="#334155" strokeWidth="1.5" />
                <line x1="40" y1="160" x2="480" y2="160" stroke="#334155" strokeWidth="1.5" />

                {chartType === 'column' ? (
                  // Oszlopdiagram rajzolása
                  days.map((day, idx) => {
                    const x = 70 + idx * 105;
                    const h = dataPoints[idx] * 3.5;
                    const y = 160 - h;
                    return (
                      <g key={day}>
                        <rect x={x} y={y} width="55" height={h} rx="4" fill="#3b82f6" />
                        <text x={x + 27} y={y - 6} fill="#1d4ed8" fontSize="11" fontWeight="bold" textAnchor="middle">
                          {dataPoints[idx]}
                        </text>
                        <text x={x + 27} y="176" fill="#334155" fontSize="10" fontWeight="semibold" textAnchor="middle">
                          {day}
                        </text>
                      </g>
                    );
                  })
                ) : (
                  // Vonaldiagram rajzolása
                  <>
                    <polyline
                      points={days
                        .map((_, idx) => `${97 + idx * 105},${160 - dataPoints[idx] * 3.5}`)
                        .join(' ')}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {days.map((day, idx) => {
                      const cx = 97 + idx * 105;
                      const cy = 160 - dataPoints[idx] * 3.5;
                      const isMax = dataPoints[idx] === maxVal;
                      const isMin = dataPoints[idx] === minVal;
                      return (
                        <g key={day}>
                          <circle
                            cx={cx}
                            cy={cy}
                            r={isMax || isMin ? 6 : 4}
                            fill={isMax ? '#dc2626' : isMin ? '#2563eb' : '#10b981'}
                            stroke="#ffffff"
                            strokeWidth="2"
                          />
                          <text x={cx} y={cy - 10} fill="#1e293b" fontSize="10" fontWeight="bold" textAnchor="middle">
                            {dataPoints[idx]}
                          </text>
                          <text x={cx} y="176" fill="#334155" fontSize="10" fontWeight="semibold" textAnchor="middle">
                            {day}
                          </text>
                        </g>
                      );
                    })}
                  </>
                )}
              </svg>
            </div>

            {/* Számított statisztikák */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200">
                <span className="text-[10px] uppercase font-bold text-blue-600 block">Összérték</span>
                <span className="text-base font-black text-blue-900 dark:text-blue-200">{sumVal} pont</span>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200">
                <span className="text-[10px] uppercase font-bold text-emerald-600 block">Átlag</span>
                <span className="text-base font-black text-emerald-900 dark:text-emerald-200">{avgVal} pont</span>
              </div>
              <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200">
                <span className="text-[10px] uppercase font-bold text-red-600 block">Maximum</span>
                <span className="text-base font-black text-red-900 dark:text-red-200">{maxVal} pont</span>
              </div>
              <div className="p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200">
                <span className="text-[10px] uppercase font-bold text-cyan-600 block">Minimum</span>
                <span className="text-base font-black text-cyan-900 dark:text-cyan-200">{minVal} pont</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-misleading',
      title: '7. Kritikus gondolkodás: Félrevezető diagramok felismerése',
      badge: 'Fontos figyelmeztetés',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A statisztika nemcsak a matematika, hanem a mindennapi tájékozódás alapja is. A reklámokban és a médiában gyakran találkozhatunk olyan diagramokkal, amelyek <strong>szándékosan vagy felületességből eltorzítják a valóságot</strong>, hogy egy apró változást óriásinak tüntessenek fel.
          </p>

          <MisleadingChartSvg />

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 space-y-2 text-xs sm:text-sm">
            <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" /> A három leggyakoribb diagramos manipuláció:
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Csonkolt függőleges tengely:</strong> Ha a tengely nem 0-ról indul, hanem például 95-ről, akkor egy 96 és 98 közötti elenyésző (2%-os) különbség háromszoros-négyszeres aránynak látszik a képen!
              </li>
              <li>
                <strong>Hiányzó vagy egyenetlen skála:</strong> Ha nincsenek feltüntetve a számértékek a tengelyen, a vonalak emelkedése semmit sem bizonyít.
              </li>
              <li>
                <strong>Térbeli (3D) torzítás:</strong> A döntött, térhatású diagramokon a képernyő elejéhez közelebb eső szeletek/oszlopok optikailag jóval nagyobbnak látszanak, mint a hátrébb lévők.
              </li>
            </ol>
          </div>
        </div>
      )
    },
    {
      id: 'sec-summary-tips',
      title: '8. Összefoglaló táblázat: Melyik diagramot mikor használjuk?',
      badge: 'Szintézis',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200">
                <tr>
                  <th className="p-3">Diagramtípus</th>
                  <th className="p-3">Mire a legjobb?</th>
                  <th className="p-3">Jellemző példa</th>
                  <th className="p-3">Mire figyelj?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr>
                  <td className="p-3 font-semibold text-blue-600">Oszlopdiagram</td>
                  <td className="p-3">Különálló csoportok, kategóriák összehasonlítására</td>
                  <td className="p-3">Kedvenc tantárgyak, érdemjegyek megoszlása</td>
                  <td className="p-3">A tengelynek 0-ról kell indulnia!</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-cyan-600">Sávdiagram</td>
                  <td className="p-3">Hosszabb nevű kategóriák, sorrendbe állítás</td>
                  <td className="p-3">Könyvtári kölcsönzések műfajonként</td>
                  <td className="p-3">A sávok vízszintes hossza arányos az adattal</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-emerald-600">Vonaldiagram</td>
                  <td className="p-3">Időbeli folyamatos változások, trendek szemléltetésére</td>
                  <td className="p-3">Napi hőmérséklet, vízállás, megtett út</td>
                  <td className="p-3">A meredekség a változás gyorsaságát mutatja</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-indigo-600">Kettős oszlopdiagram</td>
                  <td className="p-3">Két csoport egyidejű összevetésére</td>
                  <td className="p-3">6.A és 6.B eredményei tantárgyanként</td>
                  <td className="p-3">Mindig kötelező a Jelmagyarázat (legenda)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex justify-end">
            {onStartQuiz && (
              <Button
                onClick={onStartQuiz}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2 shadow-md"
              >
                Tovább a gyakorló kvízre <ArrowRight className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Grafikonok, diagramok, összefüggések"
      subtitle="Oszlop-, sáv- és vonaldiagramok készítése és elemzése, összefüggések leolvasása és kritikus statisztikai gondolkodás"
      badge="6. OSZTÁLY • VI. STATISZTIKA • 2. ALTÉMA"
      themeColor="blue"
      pdfFilename="6_osztaly_VI_grafikonok_diagramok_tananyag.pdf"
      quickRule={{
        label: 'A Diagramkészítés Aranyszabályai',
        formula: 'Oszlop: y_{\\text{kezdés}} = 0 \\quad • \\quad \\text{Vonal: időbeli folyamat (trend)} \\quad • \\quad \\text{Origó ellenőrzése!}'
      }}
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    />
  );
};

export default ChartsDiagramsTheory;
