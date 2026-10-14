import React, { useState } from 'react';
import { TheoryTemplate } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dices, HelpCircle, CheckCircle2, Sparkles, CircleDot, Layers, Percent } from 'lucide-react';

interface ProbabilityTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface ExperimentPreset {
  id: string;
  name: string;
  category: string;
  totalN: number;
  description: string;
  outcomes: {
    label: string;
    favorableK: number;
    fraction: string;
    decimal: number;
    percent: number;
    favorableItems: string[];
    color: string;
  }[];
}

const PRESETS: ExperimentPreset[] = [
  {
    id: 'dice',
    name: '1. Szabályos dobókocka (n = 6 kimenetel)',
    category: 'Kockadobás',
    totalN: 6,
    description: 'A kocka oldalai: 1, 2, 3, 4, 5, 6. Mindegyik szám dobásának azonos az esélye (1/6).',
    outcomes: [
      {
        label: 'Páros szám dobása',
        favorableK: 3,
        fraction: '3/6 = 1/2',
        decimal: 0.5,
        percent: 50,
        favorableItems: ['2', '4', '6'],
        color: '#f59e0b',
      },
      {
        label: 'Prímszám dobása',
        favorableK: 3,
        fraction: '3/6 = 1/2',
        decimal: 0.5,
        percent: 50,
        favorableItems: ['2', '3', '5'],
        color: '#10b981',
      },
      {
        label: '4-nél nagyobb szám (5 vagy 6)',
        favorableK: 2,
        fraction: '2/6 = 1/3',
        decimal: 0.333,
        percent: 33.3,
        favorableItems: ['5', '6'],
        color: '#3b82f6',
      },
      {
        label: 'Hatost dobunk',
        favorableK: 1,
        fraction: '1/6',
        decimal: 0.167,
        percent: 16.7,
        favorableItems: ['6'],
        color: '#8b5cf6',
      },
      {
        label: '7-nél kisebb szám (Biztos esemény)',
        favorableK: 6,
        fraction: '6/6 = 1',
        decimal: 1.0,
        percent: 100,
        favorableItems: ['1', '2', '3', '4', '5', '6'],
        color: '#059669',
      },
      {
        label: '7-est dobunk (Lehetetlen esemény)',
        favorableK: 0,
        fraction: '0/6 = 0',
        decimal: 0.0,
        percent: 0,
        favorableItems: [],
        color: '#ef4444',
      },
    ],
  },
  {
    id: 'coin',
    name: '2. Pénzérme feldobása (n = 2 kimenetel)',
    category: 'Érmedobás',
    totalN: 2,
    description: 'Egy szabályos érmének 2 lehetséges oldala van: Fej (F) vagy Írás (Í). Mindkettő esélye 1/2 = 50%.',
    outcomes: [
      {
        label: 'Fej dobása (F)',
        favorableK: 1,
        fraction: '1/2',
        decimal: 0.5,
        percent: 50,
        favorableItems: ['Fej'],
        color: '#f59e0b',
      },
      {
        label: 'Írás dobása (Í)',
        favorableK: 1,
        fraction: '1/2',
        decimal: 0.5,
        percent: 50,
        favorableItems: ['Írás'],
        color: '#3b82f6',
      },
      {
        label: 'Fej VAGY Írás (Biztos esemény)',
        favorableK: 2,
        fraction: '2/2 = 1',
        decimal: 1.0,
        percent: 100,
        favorableItems: ['Fej', 'Írás'],
        color: '#10b981',
      },
    ],
  },
  {
    id: 'urn',
    name: '3. Golyóhúzás urnából (n = 10 golyó)',
    category: 'Urnamodell',
    totalN: 10,
    description: 'Egy dobozban 10 egyforma tapintású golyó van: 5 piros, 3 kék és 2 sárga.',
    outcomes: [
      {
        label: 'Piros golyó húzása',
        favorableK: 5,
        fraction: '5/10 = 1/2',
        decimal: 0.5,
        percent: 50,
        favorableItems: ['P1', 'P2', 'P3', 'P4', 'P5'],
        color: '#ef4444',
      },
      {
        label: 'Kék golyó húzása',
        favorableK: 3,
        fraction: '3/10',
        decimal: 0.3,
        percent: 30,
        favorableItems: ['K1', 'K2', 'K3'],
        color: '#3b82f6',
      },
      {
        label: 'Sárga golyó húzása',
        favorableK: 2,
        fraction: '2/10 = 1/5',
        decimal: 0.2,
        percent: 20,
        favorableItems: ['S1', 'S2'],
        color: '#eab308',
      },
      {
        label: 'NEM sárga húzása (Ellentett esemény)',
        favorableK: 8,
        fraction: '8/10 = 4/5',
        decimal: 0.8,
        percent: 80,
        favorableItems: ['P1', 'P2', 'P3', 'P4', 'P5', 'K1', 'K2', 'K3'],
        color: '#8b5cf6',
      },
      {
        label: 'Zöld golyó húzása (Lehetetlen esemény)',
        favorableK: 0,
        fraction: '0/10 = 0',
        decimal: 0.0,
        percent: 0,
        favorableItems: [],
        color: '#94a3b8',
      },
    ],
  },
  {
    id: 'cards',
    name: '4. Magyar kártya húzás (n = 32 lap)',
    category: 'Kártyahúzás',
    totalN: 32,
    description: 'Egy 32 lapos pakli: 4 szín (piros, tök, zöld, makk), színenként 8 lap (VII, VIII, IX, X, alsó, felső, király, ász).',
    outcomes: [
      {
        label: 'Ász húzása (4 db ász van)',
        favorableK: 4,
        fraction: '4/32 = 1/8',
        decimal: 0.125,
        percent: 12.5,
        favorableItems: ['Piros Ász', 'Tök Ász', 'Zöld Ász', 'Makk Ász'],
        color: '#f59e0b',
      },
      {
        label: 'Piros színű lap húzása (8 lap)',
        favorableK: 8,
        fraction: '8/32 = 1/4',
        decimal: 0.25,
        percent: 25,
        favorableItems: ['8 db piros lap'],
        color: '#ef4444',
      },
      {
        label: 'Figura lap húzása (alsó, felső, király, ász = 16 lap)',
        favorableK: 16,
        fraction: '16/32 = 1/2',
        decimal: 0.5,
        percent: 50,
        favorableItems: ['4 alsó', '4 felső', '4 király', '4 ász'],
        color: '#10b981',
      },
      {
        label: 'Piros ász húzása (pontosan 1 db van)',
        favorableK: 1,
        fraction: '1/32',
        decimal: 0.03125,
        percent: 3.1,
        favorableItems: ['Piros Ász'],
        color: '#ec4899',
      },
    ],
  },
];

export const ProbabilityTheory: React.FC<ProbabilityTheoryProps> = ({
  onBack,
  onStartQuiz,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('dice');
  const [activeOutcomeIndex, setActiveOutcomeIndex] = useState<number>(0);

  const preset = PRESETS.find(p => p.id === selectedPresetId) || PRESETS[0];
  const currentOutcome = preset.outcomes[activeOutcomeIndex] || preset.outcomes[0];

  return (
    <TheoryTemplate
      title="6. Valószínűségszámítás"
      subtitle="Véletlen kísérletek, eseményfajták és a klasszikus valószínűségi modell alapjai"
      topicBadge="7. OSZTÁLY • VIII. HOZZÁRENDELÉSEK, STATISZTIKA"
      themeColor="amber"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
      practiceSubtitle="30 feladat kockákkal, érmékkel, urnákkal, komplementer eseményekkel és magyarázatokkal"
      practiceButtonText="Teszteld a tudásod (30 kérdés)"
      quickRule={{
        label: 'A klasszikus valószínűség alapképlete',
        formula: 'P(A) = kedvező esetek (k) / összes eset (n) = k / n | 0 ≤ P(A) ≤ 1'
      }}
      sections={[
        {
          id: 'sec-concepts',
          title: 'Véletlen kísérlet és eseményfajták',
          badge: 'Alapfogalmak',
          badgeColor: 'amber',
          content: (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                A mindennapi életben sok olyan jelenséggel találkozunk, amelynek kimenetelét a véletlen irányítja. A matematikában ezeket <strong>véletlen kísérleteknek</strong> nevezzük, és valószínűségszámítással vizsgáljuk az esélyeiket.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Card className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 rounded-xl space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    1. Biztos esemény ($I$)
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    A kísérlet során <strong>minden esetben bekövetkezik</strong>. Valószínűsége:
                  </p>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300 font-bold">
                    P(I) = 1 = 100%
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    Pl.: Szabályos kockával 7-nél kisebb pozitív egész számot dobunk.
                  </p>
                </Card>

                <Card className="p-4 bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 rounded-xl space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    2. Véletlen esemény ($A$)
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    A kísérlet során <strong>vagy bekövetkezik, vagy nem</strong>. Valószínűsége:
                  </p>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300 font-bold">
                    0 &lt; P(A) &lt; 1 (0% és 100% között)
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    Pl.: Kockadobáskor páros számot vagy hatost dobunk.
                  </p>
                </Card>

                <Card className="p-4 bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 rounded-xl space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 text-rose-900 dark:text-rose-200 font-bold text-sm">
                    <HelpCircle className="w-4 h-4 text-rose-600" />
                    3. Lehetetlen esemény ($\emptyset$)
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    A kísérlet során <strong>soha nem következhet be</strong>. Valószínűsége:
                  </p>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-300 font-bold">
                    P(∅) = 0 = 0%
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    Pl.: Szabályos kockával 8-ast vagy negatív számot dobunk.
                  </p>
                </Card>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-300 dark:border-amber-700 rounded-xl flex items-start gap-3">
                <Layers className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950 dark:text-amber-200">
                  <strong className="font-bold">Ellentett (komplementer) esemény (Ā):</strong> pontosan akkor következik be, amikor az A esemény NEM következik be. Valószínűségük összege mindig 1 (100%):
                  <div className="mt-1 font-mono font-bold text-amber-800 dark:text-amber-300">
                    P(A) + P(Ā) = 1 &rArr; P(Ā) = 1 - P(A)
                  </div>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400">
                    Példa: Ha a 6-os dobás valószínűsége 1/6, akkor a „nem 6-os” dobás valószínűsége: 1 - 1/6 = 5/6.
                  </span>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'sec-classical-model',
          title: 'A klasszikus valószínűségi modell kiszámítása',
          badge: 'Képlet és Feltételek',
          badgeColor: 'amber',
          content: (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                A <strong>klasszikus valószínűségszámítás</strong> akkor alkalmazható, ha a kísérletnek véges sok lehetséges kimenetele van, és ezek mindegyike <strong>egyenlően valószínű</strong> (szabályos dobókocka, szabályos érme, egyforma golyók).
              </p>

              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-xs space-y-3">
                <div className="text-center font-mono text-base md:text-lg font-black text-amber-900 dark:text-amber-200">
                  P(A) = kedvező esetek száma (k) / összes eset száma (n) = k / n
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900 border border-amber-200/60 dark:border-amber-900/60">
                    <span className="font-bold text-amber-700 dark:text-amber-300">n (összes eset):</span> A kísérlet összes lehetséges elemi kimenetelének száma (pl. kockánál n = 6).
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900 border border-amber-200/60 dark:border-amber-900/60">
                    <span className="font-bold text-amber-700 dark:text-amber-300">k (kedvező esetek):</span> Azok a kimenetelek, amelyeknél a vizsgált esemény bekövetkezik (pl. páros számok: 2, 4, 6 &rarr; k = 3).
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500 uppercase font-semibold">Tört alak</div>
                  <div className="text-lg font-black text-amber-600 mt-0.5">3 / 6 = 1 / 2</div>
                  <div className="text-[11px] text-slate-400">Egyszerűsített tört</div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500 uppercase font-semibold">Tizedestört alak</div>
                  <div className="text-lg font-black text-amber-600 mt-0.5">0,5</div>
                  <div className="text-[11px] text-slate-400">0 és 1 közötti érték</div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500 uppercase font-semibold">Százalékos alak</div>
                  <div className="text-lg font-black text-amber-600 mt-0.5">50%</div>
                  <div className="text-[11px] text-slate-400">0% és 100% közötti érték</div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'sec-interactive-lab',
          title: 'Valószínűségi Kísérleti Laboratórium',
          badge: 'Interaktív szimulátor',
          badgeColor: 'amber',
          content: (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                Válaszd ki az alábbi kísérletek egyikét, majd kattints az eseményekre, hogy lásd a kedvező kimeneteleket és a valószínűség kiszámítását lépésről lépésre!
              </p>

              {/* Preset Selector */}
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <Button
                    key={p.id}
                    variant={p.id === selectedPresetId ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setSelectedPresetId(p.id);
                      setActiveOutcomeIndex(0);
                    }}
                    className={p.id === selectedPresetId 
                      ? 'bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs' 
                      : 'rounded-xl text-xs hover:bg-amber-50 dark:hover:bg-amber-950/40 text-slate-700 dark:text-slate-300'}
                  >
                    {p.name.split(' (')[0]}
                  </Button>
                ))}
              </div>

              {/* Active Preset Card */}
              <Card className="p-5 bg-white/95 dark:bg-slate-900/90 border-amber-200 dark:border-amber-800 rounded-2xl shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                      <Dices className="w-4 h-4 text-amber-600" />
                      {preset.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{preset.description}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 self-start sm:self-auto">
                    Összes eset: n = {preset.totalN}
                  </span>
                </div>

                {/* Outcome Buttons */}
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Kattints egy eseményre a kiszámításához:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {preset.outcomes.map((out, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveOutcomeIndex(idx)}
                        className={`p-2.5 rounded-xl text-left transition-all border text-xs font-medium ${
                          activeOutcomeIndex === idx
                            ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-400 dark:border-amber-600 shadow-xs ring-1 ring-amber-400'
                            : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800 dark:text-slate-200">{out.label}</span>
                          <span className="font-mono text-amber-600 font-bold ml-1">{out.fraction}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculation Detail Display */}
                <div className="p-4 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-200/80 dark:border-amber-800/80 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-amber-800 dark:text-amber-400 font-bold">
                        Vizsgált esemény:
                      </div>
                      <div className="text-base font-black text-slate-900 dark:text-white">
                        {currentOutcome.label}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Valószínűség:</div>
                      <div className="text-xl font-black text-amber-600">
                        {currentOutcome.percent}% ({currentOutcome.fraction})
                      </div>
                    </div>
                  </div>

                  {/* Favorable items chips */}
                  <div>
                    <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <CircleDot className="w-3.5 h-3.5 text-amber-600" />
                      Kedvező kimenetelek (k = {currentOutcome.favorableK} db a {preset.totalN}-ből):
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentOutcome.favorableItems.length > 0 ? (
                        currentOutcome.favorableItems.map((item, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 shadow-2xs"
                          >
                            {item}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs italic text-rose-500">
                          Nincs kedvező kimenetel (0 db) &rarr; Lehetetlen esemény!
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Visual Progress Bar (0 to 100%) */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-slate-500">
                      <span>0% (Lehetetlen)</span>
                      <span>50% (Egyenlő esély)</span>
                      <span>100% (Biztos)</span>
                    </div>
                    <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(0, currentOutcome.percent))}%` }}
                      />
                    </div>
                  </div>

                  {/* Formula step by step */}
                  <div className="p-2.5 rounded-lg bg-white/90 dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-xs text-slate-700 dark:text-slate-300 font-mono">
                    P = k / n = {currentOutcome.favorableK} / {preset.totalN} = {currentOutcome.decimal} = <strong>{currentOutcome.percent}%</strong>
                  </div>
                </div>
              </Card>
            </div>
          )
        },
        {
          id: 'sec-relative-freq-vs-prob',
          title: 'Tapasztalati relatív gyakoriság vs. Elméleti valószínűség',
          badge: 'Nagy számok törvénye',
          badgeColor: 'amber',
          content: (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                Gyakori kérdés: ha egy pénzérmét 10-szer feldobunk, biztosan pontosan 5 fejet kapunk? <strong>Nem feltétlenül!</strong> Lehet, hogy 7 fej és 3 írás jön ki, ekkor a relatív gyakoriság 7/10 = 70%.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    <Percent className="w-4 h-4 text-sky-600" />
                    Kevés kísérlet esetén (pl. 10 dobás)
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    A véletlen ingadozás nagy szerepet játszik. A relatív gyakoriság még jelentősen eltérhet az 50%-os elméleti valószínűségtől.
                  </p>
                </Card>

                <Card className="p-4 bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 rounded-xl space-y-2">
                  <div className="font-bold text-amber-900 dark:text-amber-200 text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Nagyszámú kísérlet esetén (pl. 1000 dobás)
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <strong>A nagy számok törvénye:</strong> minél többször ismételjük meg a kísérletet, a relatív gyakoriság ($g$) annál jobban megközelíti az elméleti valószínűséget ($P$).
                  </p>
                </Card>
              </div>

              <div className="p-3 bg-amber-100/60 dark:bg-amber-900/30 rounded-xl border border-amber-300 dark:border-amber-700 text-xs text-amber-950 dark:text-amber-200">
                <strong>Megfigyelés:</strong> 1000 dobásnál már szinte biztosan 48% és 52% közé esik a fej dobások relatív gyakorisága, 10 000 dobásnál pedig még közelebb lesz az 50%-hoz!
              </div>
            </div>
          )
        },
        {
          id: 'sec-self-check',
          title: 'Gyakorló villámkérdések önellenőrzéshez',
          badge: 'Önellenőrzés',
          badgeColor: 'amber',
          content: (
            <div className="space-y-3">
              {[
                {
                  q: '1. Mennyi a valószínűsége annak, hogy egy dobókockával 5-nél nem nagyobb számot dobunk?',
                  a: 'Az 5-nél nem nagyobb számok: 1, 2, 3, 4, 5. Ez k = 5 kedvező eset a 6-ból. Tehát P = 5/6 (kb. 83,3%).',
                },
                {
                  q: '2. Egy dobozban 4 piros és 6 kék golyó van. Mekkora eséllyel húzunk pirosat?',
                  a: 'Összesen n = 4 + 6 = 10 golyó van. Kedvező eset: k = 4. Így P(piros) = 4/10 = 2/5 = 40%.',
                },
                {
                  q: '3. Mi a biztos esemény ellentett eseménye?',
                  a: 'A biztos esemény ellentettje a lehetetlen esemény! Valószínűsége: 1 - 1 = 0.',
                },
                {
                  q: '4. Két pénzérmét feldobva mekkora a valószínűsége, hogy mindkettő Fej lesz?',
                  a: 'Az összes lehetséges kimenetel (n = 4): (Fej, Fej), (Fej, Írás), (Írás, Fej), (Írás, Írás). Kedvező eset csak 1 db (FF). Így P = 1/4 = 25%.',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
                  <div className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    {item.q}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 pl-6 border-l-2 border-amber-300 dark:border-amber-700 ml-1 mt-1">
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

export default ProbabilityTheory;
