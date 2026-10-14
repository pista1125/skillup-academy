import React, { useState } from 'react';
import { TheoryTemplate } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FlaskConical, Target, CheckCircle2, Sparkles, RefreshCw, BarChart2, TrendingUp, HelpCircle } from 'lucide-react';

interface ExperimentSimulationTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface SimPreset {
  id: string;
  name: string;
  category: string;
  theoreticalP: number;
  theoreticalPercent: string;
  theoreticalFormula: string;
  symmetric: boolean;
  toolDescription: string;
  trials: {
    n: number;
    k: number;
    gPercent: number;
    diff: string;
    description: string;
  }[];
}

const SIM_PRESETS: SimPreset[] = [
  {
    id: 'coin',
    name: '1. Pénzérmedobás (Fej esélye)',
    category: 'Szabályos érme',
    theoreticalP: 0.5,
    theoreticalPercent: '50%',
    theoreticalFormula: 'P(Fej) = 1/2 = 50%',
    symmetric: true,
    toolDescription: 'A szabályos érme két lapja egyenlő valószínűséggel következik be.',
    trials: [
      { n: 10, k: 7, gPercent: 70, diff: '+20%', description: 'Kis minta: a véletlen kilengés miatt 70% lett a relatív gyakoriság.' },
      { n: 50, k: 28, gPercent: 56, diff: '+6%', description: 'Közepes minta: az érték már közelebb került az 50%-hoz.' },
      { n: 200, k: 104, gPercent: 52, diff: '+2%', description: 'Nagyobb minta: az eltérés mindössze 2%-ra csökkent.' },
      { n: 1000, k: 497, gPercent: 49.7, diff: '-0,3%', description: 'Nagy minta: szinte hajszálpontosan megközelítette az 50%-os elméletet!' },
    ],
  },
  {
    id: 'dice6',
    name: '2. Kockadobás (Hatost dobunk)',
    category: 'Szabályos dobókocka',
    theoreticalP: 0.167,
    theoreticalPercent: '16,7%',
    theoreticalFormula: 'P(6-os) = 1/6 ≈ 16,7%',
    symmetric: true,
    toolDescription: 'A szabályos kocka 6 oldala egyforma esélyű (1/6 = 16,7%).',
    trials: [
      { n: 12, k: 4, gPercent: 33.3, diff: '+16,6%', description: '12 dobásból 4 hatos: a tapasztalati gyakoriság kétszerese az elméletnek!' },
      { n: 60, k: 13, gPercent: 21.7, diff: '+5,0%', description: '60 dobásnál a relatív gyakoriság közelebb simul a 16,7%-hoz.' },
      { n: 300, k: 54, gPercent: 18.0, diff: '+1,3%', description: '300 dobásnál az eltérés már minimális.' },
      { n: 1200, k: 198, gPercent: 16.5, diff: '-0,2%', description: '1200 dobás: a relatív gyakoriság szinte tökéletesen 16,7% lett!' },
    ],
  },
  {
    id: 'thumbtack',
    name: '3. Rajzszög feldobása (Hegyével felfelé áll meg)',
    category: 'Aszimmetrikus test',
    theoreticalP: 0.62,
    theoreticalPercent: 'kb. 62% (kísérleti)',
    theoreticalFormula: 'Nincs elméleti képlet! Csak méréssel becsülhető!',
    symmetric: false,
    toolDescription: 'A rajzszög aszimmetrikus test, a klasszikus P = k/n képlet NEM alkalmazható rá.',
    trials: [
      { n: 10, k: 4, gPercent: 40, diff: 'előzetes', description: '10 próbából 4-szer állt hegyével fel: korai becslés.' },
      { n: 50, k: 32, gPercent: 64, diff: 'stabilizálódik', description: '50 dobásból már tisztán látszik, hogy a hegyes állás gyakoribb.' },
      { n: 200, k: 125, gPercent: 62.5, diff: 'pontosul', description: '200 dobás alapján a tapasztalati valószínűség 62-63% közé tehető.' },
      { n: 1000, k: 618, gPercent: 61.8, diff: 'kísérleti érték', description: 'Nagy kísérlet: a tapasztalati valószínűség rendkívül stabil (kb. 62%).' },
    ],
  },
  {
    id: 'twoCoins',
    name: '4. Két érme (Két Fej dobása egyszerre)',
    category: 'Összetett kísérlet',
    theoreticalP: 0.25,
    theoreticalPercent: '25%',
    theoreticalFormula: 'P(FF) = 1/4 = 25% (FF, FÍ, ÍF, ÍÍ)',
    symmetric: true,
    toolDescription: 'A négy lehetséges kimenetelből csak az FF felel meg.',
    trials: [
      { n: 20, k: 7, gPercent: 35, diff: '+10%', description: '20 dobásból 7 alkalommal jött két fej (35%).' },
      { n: 100, k: 28, gPercent: 28, diff: '+3%', description: '100 dobásnál már alig tér el a 25%-tól.' },
      { n: 400, k: 103, gPercent: 25.8, diff: '+0,8%', description: '400 dobásnál kiválóan megközelíti a negyedrészt.' },
      { n: 1000, k: 249, gPercent: 24.9, diff: '-0,1%', description: '1000 dobásnál 24,9% lett a relatív gyakoriság!' },
    ],
  },
];

export const ExperimentSimulationTheory: React.FC<ExperimentSimulationTheoryProps> = ({
  onBack,
  onStartQuiz,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('coin');
  const [selectedTrialIndex, setSelectedTrialIndex] = useState<number>(0);

  const preset = SIM_PRESETS.find(p => p.id === selectedPresetId) || SIM_PRESETS[0];
  const trial = preset.trials[selectedTrialIndex] || preset.trials[0];

  return (
    <TheoryTemplate
      title="7. Tippelj, kísérletezz, ellenőrizz!"
      subtitle="Kísérleti statisztika, a nagy számok törvénye és a klasszikus modell gyakorlati tesztelése"
      topicBadge="7. OSZTÁLY • VIII. HOZZÁRENDELÉSEK, STATISZTIKA"
      themeColor="orange"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
      practiceSubtitle="30 feladat szimulációkkal, nagy számok törvényével, kísérleti hibaszámítással és magyarázatokkal"
      practiceButtonText="Teszteld a tudásod (30 kérdés)"
      quickRule={{
        label: 'A nagy számok törvénye (Bernoulli-tétel)',
        formula: 'Ha a kísérletek száma (N) nagy, akkor a relatív gyakoriság (g = k/N) megközelíti az elméleti valószínűséget (P): g ≈ P'
      }}
      sections={[
        {
          id: 'sec-methodology',
          title: 'A 3 lépéses statisztikai módszertan',
          badge: 'Módszertan',
          badgeColor: 'orange',
          content: (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                A valószínűségszámítás nemcsak elméleti képletek felírásából áll. A tudományban és a gyakorlatban a modellünket kísérletekkel ellenőrizzük, és fordítva: a mérési tapasztalatokból építünk elméletet.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Card className="p-4 bg-orange-50/70 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800 rounded-xl space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 text-orange-900 dark:text-orange-200 font-bold text-sm">
                    <Target className="w-4 h-4 text-orange-600" />
                    1. Tippelj (Elmélet)
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Számold ki az elméleti klasszikus valószínűséget: <strong>P = k / n</strong>, ha a kísérleti eszköz szimmetrikus.
                  </p>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-orange-200 dark:border-orange-900 text-[11px] text-orange-800 dark:text-orange-300 font-mono">
                    Pl.: P(Fej) = 1/2 = 50%
                  </div>
                </Card>

                <Card className="p-4 bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 rounded-xl space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-sm">
                    <FlaskConical className="w-4 h-4 text-amber-600" />
                    2. Kísérletezz (Mérés)
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Végezz el sok próbát (N = 50, 100, 500), és rögzítsd az eredményeket gyakorisági táblázatban.
                  </p>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900 text-[11px] text-amber-800 dark:text-amber-300 font-mono">
                    Pl.: 100 dobásból k = 53 fej
                  </div>
                </Card>

                <Card className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 rounded-xl space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    3. Ellenőrizz (Elemzés)
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Számítsd ki a kapott relatív gyakoriságot (g = k / N), és vesd össze az elméleti értékkel.
                  </p>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900 text-[11px] text-emerald-800 dark:text-emerald-300 font-mono">
                    g = 53% &rarr; Hiba: |53% - 50%| = 3%
                  </div>
                </Card>
              </div>
            </div>
          )
        },
        {
          id: 'sec-law-of-large-numbers',
          title: 'A nagy számok törvénye és a minta mérete',
          badge: 'Alaptörvény',
          badgeColor: 'orange',
          content: (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                A statisztika legfontosabb tapasztalata: <strong>a véletlen rövid távon szeszélyes, hosszú távon viszont rendkívül szabályos!</strong>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-rose-500" />
                    Kis kísérletszám (N ≤ 20)
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    A véletlen ingadozás óriási. 10 dobásból simán előfordulhat 8 fej (g = 80%), holott az elméleti érték 50%. Ebből téves következtetést vonnánk le!
                  </p>
                  <div className="text-[11px] font-mono text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg">
                    Eltérés: akár ±20-30%
                  </div>
                </Card>

                <Card className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 rounded-xl space-y-2">
                  <div className="font-bold text-emerald-900 dark:text-emerald-200 text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    Nagyszámú kísérlet (N ≥ 500)
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    A relatív gyakoriság egyre szűkebb sávban ingadozik az elméleti valószínűség körül. 1000 dobásból szinte biztosan 48% és 52% közé esik a fejek aránya.
                  </p>
                  <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/60 p-2 rounded-lg">
                    Eltérés: tipikusan &lt; 1%
                  </div>
                </Card>
              </div>

              <div className="p-3.5 bg-orange-500/10 border border-orange-300 dark:border-orange-700 rounded-xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div className="text-xs text-orange-950 dark:text-orange-200 leading-relaxed">
                  <strong>Szimmetrikus vs. Aszimmetrikus eszközök:</strong> Szabályos kockánál vagy érménél a szimmetria miatt előre tudjuk az elméleti valószínűséget. De egy aszimmetrikus testnél (pl. rajzszög, gyufásdoboz, cinkelt kocka) <strong>kizárólag sok kísérlet elvégzésével</strong> határozható meg az események valószínűsége!
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'sec-interactive-lab',
          title: 'Kísérleti Szimulátor Laboratórium',
          badge: 'Interaktív labor',
          badgeColor: 'orange',
          content: (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                Válaszd ki az alábbi kísérletek egyikét, majd nézd meg a különböző mintaméretek (N) esetén kapott eredményeket és az elméleti értéktől való eltérést!
              </p>

              {/* Preset buttons */}
              <div className="flex flex-wrap gap-2">
                {SIM_PRESETS.map((p) => (
                  <Button
                    key={p.id}
                    variant={p.id === selectedPresetId ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setSelectedPresetId(p.id);
                      setSelectedTrialIndex(0);
                    }}
                    className={p.id === selectedPresetId 
                      ? 'bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-xs' 
                      : 'rounded-xl text-xs hover:bg-orange-50 dark:hover:bg-orange-950/40 text-slate-700 dark:text-slate-300'}
                  >
                    {p.name.split(' (')[0]}
                  </Button>
                ))}
              </div>

              {/* Active Preset Box */}
              <Card className="p-5 bg-white/95 dark:bg-slate-900/90 border-orange-200 dark:border-orange-800 rounded-2xl shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-orange-600" />
                      {preset.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{preset.toolDescription}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400">Elméleti érték (P):</span>
                    <div className="text-sm font-black text-orange-600 font-mono">
                      {preset.theoreticalPercent}
                    </div>
                  </div>
                </div>

                {/* Trial Sample Size selector */}
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Válassz mintaméretet (kísérletek száma - N):
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {preset.trials.map((t, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedTrialIndex(idx)}
                        className={`p-2.5 rounded-xl text-center transition-all border text-xs font-medium ${
                          selectedTrialIndex === idx
                            ? 'bg-orange-50 dark:bg-orange-950/50 border-orange-400 dark:border-orange-600 shadow-xs ring-1 ring-orange-400'
                            : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="font-bold text-slate-900 dark:text-slate-100">N = {t.n} próba</div>
                        <div className="text-orange-600 font-mono text-[11px] font-bold mt-0.5">g = {t.gPercent}%</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Trial Result Display */}
                <div className="p-4 bg-orange-50/60 dark:bg-orange-950/30 rounded-xl border border-orange-200/80 dark:border-orange-800/80 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Kísérletek száma</div>
                      <div className="text-base font-black text-slate-800 dark:text-slate-200 font-mono mt-0.5">N = {trial.n}</div>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Kedvező dobások</div>
                      <div className="text-base font-black text-slate-800 dark:text-slate-200 font-mono mt-0.5">k = {trial.k} db</div>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Relatív gyakoriság (g)</div>
                      <div className="text-base font-black text-orange-600 font-mono mt-0.5">{trial.gPercent}%</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-900/70 p-2.5 rounded-lg border border-orange-200/60 dark:border-orange-900/60">
                    <strong>Értékelés:</strong> {trial.description}
                  </p>

                  {/* Progress comparison */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-slate-500">
                      <span>Mért érték: {trial.gPercent}%</span>
                      <span>Elméleti célérték: {preset.theoreticalPercent}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-orange-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(0, trial.gPercent))}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )
        },
        {
          id: 'sec-self-check',
          title: 'Gyakorló villámkérdések önellenőrzéshez',
          badge: 'Önellenőrzés',
          badgeColor: 'orange',
          content: (
            <div className="space-y-3">
              {[
                {
                  q: '1. Ha egy szabályos pénzérmét 10-szer feldobva 7 fejet kapunk, az érme hibás?',
                  a: 'Nem feltétlenül! 10 dobás nagyon kis minta, a véletlen ingadozás miatt a 70%-os relatív gyakoriság teljesen természetes. Csak sokszáz dobás után lehetne megállapítani, ha az érme cinkelt.',
                },
                {
                  q: '2. Mi a különbség a relatív gyakoriság és az elméleti valószínűség között?',
                  a: 'Az elméleti valószínűség (P) a modellből kiszámított matematikai érték (pl. P = 1/2), míg a relatív gyakoriság (g = k/N) a ténylegesen elvégzett kísérlet során mért arány.',
                },
                {
                  q: '3. Miért nem számítható ki a klasszikus P = k/n képlettel egy rajzszög leesésének valószínűsége?',
                  a: 'Mert a rajzszög aszimmetrikus test: a kétféle kimenetel (hegyével felfelé vagy fekve) NEM egyenlően valószínű. Ezért csak kísérleti méréssel határozható meg a valószínűsége.',
                },
                {
                  q: '4. Mit mond ki a nagy számok törvénye?',
                  a: 'Ha egy véletlen kísérletet nagyon sokszor (N növekedésével) megismétlünk, akkor az esemény relatív gyakorisága (g) egyre jobban megközelíti az elméleti valószínűséget (P).',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
                  <div className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-orange-600 shrink-0" />
                    {item.q}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 pl-6 border-l-2 border-orange-300 dark:border-orange-700 ml-1 mt-1">
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          )
        }
      ]}
    />
  );
};

export default ExperimentSimulationTheory;
