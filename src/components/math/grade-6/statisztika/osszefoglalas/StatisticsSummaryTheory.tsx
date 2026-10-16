import React, { useState, useMemo } from 'react';
import { TheoryTemplate } from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Trophy,
  BarChart2,
  PieChart,
  TrendingUp,
  Scale,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Layers,
  HelpCircle,
  Check
} from 'lucide-react';
import {
  StatOverviewRoadmapSvg,
  ChartComparisonMatrixSvg
} from './StatisticsSummaryDiagrams';

interface StatisticsSummaryTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const StatisticsSummaryTheory: React.FC<StatisticsSummaryTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív Műhely: Szcenárió kiválasztása
  type ScenarioKey = 'buffet' | 'grades' | 'runners';
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>('buffet');
  const [activeView, setActiveView] = useState<'column' | 'pie' | 'metrics'>('column');

  const scenarios = {
    buffet: {
      name: 'Iskolai büfé felmérés',
      description: '40 megkérdezett diák kedvenc tízóraija',
      items: [
        { label: 'Szendvics', val: 18, color: '#0284c7' },
        { label: 'Gyümölcs', val: 12, color: '#10b981' },
        { label: 'Müzli', val: 6, color: '#f59e0b' },
        { label: 'Saláta', val: 4, color: '#8b5cf6' }
      ]
    },
    grades: {
      name: 'Matematika dolgozat',
      description: '30 fős osztály érdemjegyei (1-től 5-ig)',
      items: [
        { label: '1-es', val: 2, color: '#ef4444' },
        { label: '2-es', val: 4, color: '#f97316' },
        { label: '3-as', val: 8, color: '#eab308' },
        { label: '4-es', val: 10, color: '#3b82f6' },
        { label: '5-ös', val: 6, color: '#10b981' }
      ]
    },
    runners: {
      name: 'Futóverseny kiugró adattal',
      description: '60 méteres futás időeredményei másodpercben',
      items: [
        { label: '9,2 s', val: 1, color: '#06b6d4' },
        { label: '9,4 s', val: 1, color: '#06b6d4' },
        { label: '9,5 s', val: 1, color: '#06b6d4' },
        { label: '9,8 s', val: 1, color: '#06b6d4' },
        { label: '24,0 s (elesett)', val: 1, color: '#ef4444' }
      ]
    }
  };

  const currentScen = scenarios[activeScenario];
  const totalCount = useMemo(() => {
    return currentScen.items.reduce((acc, curr) => acc + curr.val, 0);
  }, [currentScen]);

  const sections = [
    {
      id: 'sec-roadmap',
      title: '1. A statisztikai folyamat 4 fő lépése',
      badge: 'Rendszer',
      icon: <Layers className="w-5 h-5 text-sky-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A statisztika a valós világ jelenségeinek számszerű megfigyelésével, rendszerezésével és elemzésével foglalkozik.
            Bármilyen kutatás vagy vizsgálat a következő 4 egymásra épülő lépésből áll:
          </p>

          <StatOverviewRoadmapSvg />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-sky-600 dark:text-sky-400 block mb-1">1. Adatgyűjtés</span>
              Mérések, kérdőívek, kísérletek, számlálás.
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">2. Csoportosítás</span>
              Gyakorisági táblázat, Venn-diagram készítése.
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">3. Ábrázolás</span>
              Oszlop-, vonal- vagy kördiagram szerkesztése.
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-teal-600 dark:text-teal-400 block mb-1">4. Elemzés</span>
              Átlag, medián, módusz és terjedelem számítása.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-chart-selection',
      title: '2. Diagramválasztó döntési mátrix: Mikor melyiket használjuk?',
      badge: 'Vizualizáció',
      icon: <BarChart2 className="w-5 h-5 text-indigo-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Az egyik leggyakoribb felvételi feladat annak eldöntése, hogy egy adott típusú adatsorhoz
            <strong>melyik diagram illik a legjobban</strong>.
          </p>

          <ChartComparisonMatrixSvg />

          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2 text-xs sm:text-sm">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200">Gyors döntési szabály:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Ha <strong>egy egész részeit</strong> mutatjuk be százalékosan $\to$ <strong>Kördiagram</strong> ($100\% = 360^\circ$).</li>
              <li>Ha <strong>időbeli változást, folytonos folyamatot</strong> ábrázolunk $\to$ <strong>Vonalgrafikon</strong>.</li>
              <li>Ha <strong>különböző csoportok, kategóriák</strong> értékeit hasonlítjuk össze $\to$ <strong>Oszlopdiagram</strong>.</li>
              <li>Ha <strong>hosszúak a feliratok vagy rangsorolunk</strong> $\to$ <strong>Fekvő sávdiagram</strong>.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'sec-pie-mastery',
      title: '3. A Kördiagram kulcsfontosságú összefüggései',
      badge: 'Szögek és Százalékok',
      icon: <PieChart className="w-5 h-5 text-purple-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A kördiagram alapja, hogy a teljes körlap ($360^\circ$) felel meg a $100\%$-nak.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <span className="text-xs text-purple-600 dark:text-purple-400 font-bold block uppercase">1% értéke</span>
              <span className="text-xl font-black font-mono text-purple-900 dark:text-purple-100">3,6°</span>
              <p className="text-[11px] text-slate-500 mt-1">{"360° : 100 = 3,6°"}</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <span className="text-xs text-purple-600 dark:text-purple-400 font-bold block uppercase">Százalékból szög</span>
              <span className="text-xl font-black font-mono text-purple-900 dark:text-purple-100">{"$\\alpha = p \\cdot 3,6^\\circ$"}</span>
              <p className="text-[11px] text-slate-500 mt-1">{"Pl. $20\\% \\to 20 \\cdot 3,6^\\circ = 72^\\circ$"}</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <span className="text-xs text-purple-600 dark:text-purple-400 font-bold block uppercase">Szögből százalék</span>
              <span className="text-xl font-black font-mono text-purple-900 dark:text-purple-100">{"$p = \\alpha : 3,6^\\circ$"}</span>
              <p className="text-[11px] text-slate-500 mt-1">{"Pl. $90^\\circ \\to 90 : 3,6 = 25\\%$"}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
            <strong>Nevezetes szögek és törtrészek:</strong>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold ml-1">
              $90^\circ = 25\%$ (negyed) • $180^\circ = 50\%$ (félkör) • $270^\circ = 75\%$ (háromnegyed) • $36^\circ = 10\%$ (tizedrész)
            </span>
          </div>
        </div>
      )
    },
    {
      id: 'sec-metrics-synthesis',
      title: '4. A 4 Fő Statisztikai Mutató Szintézise',
      badge: 'Mutatók',
      icon: <Scale className="w-5 h-5 text-teal-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A 4 legfontosabb statisztikai mutató összefoglaló táblázata:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse rounded-xl overflow-hidden shadow-xs">
              <thead className="bg-slate-800 text-white font-bold">
                <tr>
                  <th className="p-2.5">Mutató</th>
                  <th className="p-2.5">Matematikai Jelentés</th>
                  <th className="p-2.5">Kiszámítás / Megtalálás</th>
                  <th className="p-2.5">Érzékenység a kiugróra</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900">
                <tr>
                  <td className="p-2.5 font-bold text-blue-600">{"Átlag ($\\bar{x}$)"}</td>
                  <td className="p-2.5">Kiegyenlített érték, fizikai súlypont</td>
                  <td className="p-2.5 font-mono">{"$\\frac{\\sum x}{n} = \\frac{\\text{összeg}}{\\text{darabszám}}$"}</td>
                  <td className="p-2.5 text-rose-600 font-bold">Nagyon érzékeny!</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-emerald-600">Medián ($Me$)</td>
                  <td className="p-2.5">A rendezett sokaság felező eleme</td>
                  <td className="p-2.5">Növekvő sorba rendezve a középső (párosnál 2 átlaga)</td>
                  <td className="p-2.5 text-emerald-600 font-bold">Stabil (nem érzékeny)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-amber-600">Módusz ($Mo$)</td>
                  <td className="p-2.5">A leggyakoribb, legnépszerűbb érték</td>
                  <td className="p-2.5">A legtöbbször előforduló szám (lehet több is)</td>
                  <td className="p-2.5 text-slate-500">Nem érzékeny</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-pink-600">Terjedelem ($R$)</td>
                  <td className="p-2.5">A szóródás szélessége (fesztáv)</td>
                  <td className="p-2.5 font-mono">{"$x_{\\max} - x_{\\min}$"}</td>
                  <td className="p-2.5 text-rose-600 font-bold">Nagyon érzékeny!</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 'sec-outliers-misleading',
      title: '5. Csapdák leleplezése: Kiugró értékek és Csalóka diagramok',
      badge: 'Kritikus gondolkodás',
      icon: <AlertTriangle className="w-5 h-5 text-rose-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A statisztika nemcsak számolás, hanem a megtévesztések és torzítások felismerésének művészete is.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
              <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-black">!</span>
                Csonkított tengelyek (Truncated axis)
              </h5>
              <p className="text-xs sm:text-sm">
                Ha az oszlopdiagram függőleges tengelye nem 0-ról indul, hanem pl. 98-ról, egy 4%-os apró növekedés
                háromszoros ugrásnak tűnhet a szemlélő számára! Mindig ellenőrizd az origót!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
              <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-black">!</span>
                3D perspektivikus torzítás kördiagramnál
              </h5>
              <p className="text-xs sm:text-sm">
                A megdöntött, 3D hatású kördiagramokon az elöl lévő körcikk optikailag jóval nagyobbnak látszik,
                mint a valóságos százalékos értéke. A tudományos statisztikában mindig sík (2D) diagramot használunk!
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-exam-tips',
      title: '6. Ellenőrző lista és vizsgatippek a témazáróhoz',
      badge: 'Felkészülés',
      icon: <Trophy className="w-5 h-5 text-amber-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-700 space-y-3">
            <h4 className="font-bold text-amber-400 flex items-center gap-2 text-sm sm:text-base">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              A 6 legfontosabb ellenőrzési pont dolgozatíráskor:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Medián előtt mindig rendezz:</strong> Soha ne keresd a középsőt rendezetlen adatsorból!</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Páros elemszám:</strong> A két középső szám számtani közepét kell venni!</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Relatív gyakoriságok összege:</strong> Mindig pontosan 1,0 vagy 100%!</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Kördiagram szögek összege:</strong> Minden esetben pontosan 360°-nak kell kijönnie!</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Átlag mértékegysége:</strong> Ugyanaz a mértékegység, mint az eredeti adatoké!</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Átlagtól vett eltérések:</strong> Az előjeles eltérések összege mindig 0.</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            {onStartQuiz && (
              <Button
                onClick={onStartQuiz}
                size="lg"
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold gap-2 shadow-md"
              >
                Tovább az összefoglaló kvízre <ArrowRight className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="5. Összefoglalás – VI. Statisztika"
      subtitle="Átfogó szintézis: adatgyűjtés, diagramtípusok, kördiagram mesterfogások és statisztikai mutatók"
      badge="6. OSZTÁLY • VI. STATISZTIKA • 5. ALTÉMA"
      themeColor="slate"
      interactiveLab={
        <div className="p-5 rounded-2xl bg-slate-900 border-2 border-slate-700 text-white space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base sm:text-lg text-slate-100">
                  Összefoglaló Statisztikai Műhely & Diagramváltó
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Válassz szcenáriót, és vizsgáld meg ugyanazt az adathalmazt oszlopdiagramon, kördiagramon vagy mutatókként!
              </p>
            </div>

            {/* Szcenárió gombok */}
            <div className="flex flex-wrap gap-1.5">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setActiveScenario('buffet')}
                className={`text-[11px] h-7 ${activeScenario === 'buffet' ? 'bg-sky-600 text-white border-sky-400' : 'bg-slate-800 text-slate-300'}`}
              >
                Büfé választás
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setActiveScenario('grades')}
                className={`text-[11px] h-7 ${activeScenario === 'grades' ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-800 text-slate-300'}`}
              >
                Dolgozatjegyek
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setActiveScenario('runners')}
                className={`text-[11px] h-7 ${activeScenario === 'runners' ? 'bg-rose-600 text-white border-rose-400' : 'bg-slate-800 text-slate-300'}`}
              >
                Kiugró futóidő
              </Button>
            </div>
          </div>

          {/* Nézetváltó fülek */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <span className="text-xs text-slate-400 font-semibold mr-2">Nézet kiválasztása:</span>
            <button
              onClick={() => setActiveView('column')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                activeView === 'column' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Oszlopdiagram nézet
            </button>
            <button
              onClick={() => setActiveView('pie')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                activeView === 'pie' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Kördiagram nézet
            </button>
            <button
              onClick={() => setActiveView('metrics')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                activeView === 'metrics' ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Mutatók és gyakoriságok
            </button>
          </div>

          {/* Dinamikus megjelenítés a választott nézet szerint */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 min-h-[160px] flex items-center justify-center">
            {activeView === 'column' && (
              <div className="w-full space-y-2">
                <div className="text-xs text-slate-300 font-semibold mb-2 flex justify-between">
                  <span>{currentScen.name} – Oszlopdiagram (Összesen: {totalCount} fő)</span>
                  <span className="text-sky-400">100%-ról induló sávok</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {currentScen.items.map((it, idx) => {
                    const pct = Math.round((it.val / totalCount) * 100);
                    return (
                      <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-700 space-y-1">
                        <div className="flex justify-between text-xs font-bold" style={{ color: it.color }}>
                          <span>{it.label}</span>
                          <span>{it.val} db</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: it.color }} />
                        </div>
                        <div className="text-[11px] text-slate-400 flex justify-between">
                          <span>{pct}%</span>
                          <span>{Math.round(pct * 3.6)}°</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeView === 'pie' && (
              <div className="w-full flex flex-col sm:flex-row items-center justify-around gap-4">
                <div className="text-center space-y-1">
                  <div className="text-xs font-bold text-slate-300">Körcikkek középponti szögei:</div>
                  <div className="text-xs text-slate-400">Összes szög = 360° • Összes % = 100%</div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center max-w-md">
                  {currentScen.items.map((it, idx) => {
                    const pct = Math.round((it.val / totalCount) * 100);
                    const deg = Math.round(pct * 3.6);
                    return (
                      <div key={idx} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: it.color }} />
                        <span className="text-xs font-bold text-white">{it.label}:</span>
                        <span className="text-xs font-mono text-purple-300">{pct}% ({deg}°)</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeView === 'metrics' && (
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-1 text-center">
                  <div className="text-xs text-slate-400">Mintanagyság (n)</div>
                  <div className="text-xl font-bold font-mono text-white">{totalCount} db</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-1 text-center">
                  <div className="text-xs text-slate-400">Leggyakoribb (Módusz)</div>
                  <div className="text-base font-bold text-amber-400 truncate">
                    {currentScen.items.reduce((max, it) => it.val > max.val ? it : max, currentScen.items[0]).label}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-1 text-center">
                  <div className="text-xs text-slate-400">Kategóriák száma</div>
                  <div className="text-xl font-bold font-mono text-sky-400">{currentScen.items.length} db</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-1 text-center">
                  <div className="text-xs text-slate-400">Arány (Legnagyobb)</div>
                  <div className="text-xl font-bold font-mono text-emerald-400">
                    {Math.round((Math.max(...currentScen.items.map(i => i.val)) / totalCount) * 100)}%
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      }
      sections={sections}
      ruleTitle="Kiemelt statisztikai alapszabályok"
      ruleFormula="1% = 3,6° • x̄ = Σx / n • R = x_{max} - x_{min}"
      quickRule={{
        label: 'Kiemelt statisztikai alapszabályok',
        formula: '1\\% = 3,6^\\circ \\quad • \\quad \\bar{x} = \\frac{\\sum x}{n} \\quad • \\quad R = x_{\\max} - x_{\\min}'
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    />
  );
};

export default StatisticsSummaryTheory;
