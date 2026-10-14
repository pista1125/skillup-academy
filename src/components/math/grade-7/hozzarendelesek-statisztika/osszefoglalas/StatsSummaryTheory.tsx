import React, { useState } from 'react';
import { TheoryTemplate } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, ArrowRightLeft, LineChart, BarChart3, Dices, Target, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';

interface StatsSummaryTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const StatsSummaryTheory: React.FC<StatsSummaryTheoryProps> = ({
  onBack,
  onStartQuiz,
}) => {
  // Simple interactive demo state for Pillar 2 (Central Tendency demo)
  const [dataSample, setDataSample] = useState<number[]>([2, 3, 5, 5, 10]);

  // Calculations for current sample
  const n = dataSample.length;
  const sorted = [...dataSample].sort((a, b) => a - b);
  const sum = sorted.reduce((acc, val) => acc + val, 0);
  const mean = n > 0 ? (sum / n).toFixed(1) : '0';
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const range = max - min;
  const median = n % 2 === 1 ? sorted[Math.floor(n / 2)] : ((sorted[n / 2 - 1] + sorted[n / 2]) / 2).toFixed(1);

  // Mode calculation
  const freqMap: Record<number, number> = {};
  sorted.forEach(num => { freqMap[num] = (freqMap[num] || 0) + 1; });
  let maxFreq = 0;
  let modeArr: number[] = [];
  Object.entries(freqMap).forEach(([numStr, count]) => {
    const num = Number(numStr);
    if (count > maxFreq) {
      maxFreq = count;
      modeArr = [num];
    } else if (count === maxFreq) {
      modeArr.push(num);
    }
  });
  const modeText = maxFreq > 1 ? modeArr.join(', ') : 'Nincs egyértelmű módusz';

  return (
    <TheoryTemplate
      title="8. Összefoglalás"
      subtitle="A Hozzárendelések, statisztika fejezet átfogó, rendszerező áttekintése és összefoglalása"
      topicBadge="7. OSZTÁLY • VIII. HOZZÁRENDELÉSEK, STATISZTIKA"
      themeColor="slate"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Összefoglaló Kvíz indítása"
      practiceSubtitle="30 feladat a teljes fejezetből, ábrákkal, számításokkal és részletes magyarázatokkal"
      practiceButtonText="Teszteld a tudásod (30 kérdés)"
      quickRule={{
        label: 'A fejezet 3 legfontosabb alapképlete',
        formula: 'Átlag: x̄ = Σx / n | Relatív gyakoriság: g = k / n (Σg = 100%) | Valószínűség: P = k / n (0 ≤ P ≤ 1)'
      }}
      sections={[
        {
          id: 'sec-pillar1',
          title: '1. Pillér: Hozzárendelések, függvények és grafikonok',
          badge: '1-3. Altémák',
          badgeColor: 'slate',
          content: (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                A hozzárendelés alapvető matematikai kapcsolat két halmaz elemei között. Ha az alaphalmaz minden eleméhez <strong>pontosan egy</strong> képelem tartozik, akkor a hozzárendelést <strong>függvénynek</strong> nevezzük.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Card className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 rounded-xl space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs">
                    <ArrowRightLeft className="w-4 h-4 text-cyan-600" />
                    Hozzárendelési módok
                  </div>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                    <li>Szöveges szabály (pl. „hozzáadunk 3-at”)</li>
                    <li>Képlet: <em>y = 2x + 1</em></li>
                    <li>Értéktáblázat (x és y értékpárok)</li>
                    <li>Rendezett számpárok halmaza</li>
                    <li>Grafikon koordináta-rendszerben</li>
                  </ul>
                </Card>

                <Card className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 rounded-xl space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs">
                    <LineChart className="w-4 h-4 text-indigo-600" />
                    Függvények fajtái
                  </div>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                    <li><strong>Egyértelmű:</strong> minden x-hez pontosan 1 y</li>
                    <li><strong>Kölcsönösen egyértelmű:</strong> oda-vissza 1-1 kapcsolat</li>
                    <li><strong>Lineáris függvény:</strong> grafikonja egyenes vonal</li>
                    <li><strong>Egyenes arányosság:</strong> origón átmenő egyenes (y = ax)</li>
                  </ul>
                </Card>

                <Card className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 rounded-xl space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs">
                    <Target className="w-4 h-4 text-emerald-600" />
                    Grafikon leolvasása
                  </div>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                    <li><strong>Zérushely:</strong> ahol a grafikon metszi az x tengelyt</li>
                    <li><strong>Meredekség:</strong> növekvő vagy csökkenő</li>
                    <li><strong>Szélsőértékek:</strong> maximum és minimum pontok</li>
                    <li><strong>Értelmezési tartomány:</strong> x határai</li>
                  </ul>
                </Card>
              </div>
            </div>
          )
        },
        {
          id: 'sec-pillar2',
          title: '2. Pillér: Leíró statisztika, mutatók és diagramok',
          badge: '4-5. Altémák',
          badgeColor: 'slate',
          content: (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                A statisztika adatok gyűjtésével, rendszerezésével és elemzésével foglalkozik. Az adatsorok legfontosabb jellemzőit mutatókkal írjuk le.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Átlag (x̄)</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">Σx / n</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Számtani közép</div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Módusz (Mo)</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">Leggyakoribb</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Csúcsgyakoriság</div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Medián (Me)</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">Középső adat</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Rendezett sorban</div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Terjedelem (R)</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">Max - Min</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Szóródási sáv</div>
                </div>
              </div>

              {/* Interactive Statistical Sample Box */}
              <Card className="p-4 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                    Interaktív Adatminta Mutatói:
                  </div>
                  <div className="flex gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDataSample([2, 3, 5, 5, 10])}
                      className="text-[11px] h-7 rounded-lg"
                    >
                      Minta 1: [2, 3, 5, 5, 10]
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDataSample([1, 4, 4, 8, 9, 10])}
                      className="text-[11px] h-7 rounded-lg"
                    >
                      Minta 2: [1, 4, 4, 8, 9, 10]
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDataSample([3, 5, 7, 8, 12])}
                      className="text-[11px] h-7 rounded-lg"
                    >
                      Minta 3: [3, 5, 7, 8, 12]
                    </Button>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px]">Elemszám:</span>
                    <div className="font-bold font-mono">n = {n}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Átlag:</span>
                    <div className="font-bold text-indigo-600 font-mono">x̄ = {mean}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Módusz:</span>
                    <div className="font-bold text-teal-600 font-mono">Mo = {modeText}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Medián:</span>
                    <div className="font-bold text-amber-600 font-mono">Me = {median}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Terjedelem:</span>
                    <div className="font-bold text-rose-600 font-mono">R = {range}</div>
                  </div>
                </div>
              </Card>

              <div className="p-3 bg-slate-100 dark:bg-slate-800/60 rounded-xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>Gyakoriság és Kördiagram:</strong> A relatív gyakoriság <em>g = k / n</em>, összege mindig 100%. A kördiagram középponti szöge egyenesen arányos: <em>α = g · 360°</em> (pl. 25% &rarr; 90°, 50% &rarr; 180°).
              </div>
            </div>
          )
        },
        {
          id: 'sec-pillar3',
          title: '3. Pillér: Valószínűségszámítás és kísérleti statisztika',
          badge: '6-7. Altémák',
          badgeColor: 'slate',
          content: (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                A valószínűségszámítás a véletlen események bekövetkezési esélyét számszerűsíti 0 és 1 (0% és 100%) között.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Card className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 rounded-xl space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Eseményfajták
                  </div>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                    <li><strong>Biztos esemény:</strong> P(I) = 1 = 100%</li>
                    <li><strong>Véletlen esemény:</strong> 0 &lt; P(A) &lt; 1</li>
                    <li><strong>Lehetetlen esemény:</strong> P(∅) = 0 = 0%</li>
                    <li><strong>Ellentett esemény:</strong> P(Ā) = 1 - P(A)</li>
                  </ul>
                </Card>

                <Card className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 rounded-xl space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs">
                    <Dices className="w-4 h-4 text-amber-600" />
                    Klasszikus valószínűség
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    <div className="font-mono font-bold text-slate-900 dark:text-slate-200">P(A) = k / n</div>
                    <div>k = kedvező esetek száma</div>
                    <div>n = összes eset száma</div>
                    <div className="text-[11px] text-slate-500">Feltétel: egyenlően valószínű kimenetelek</div>
                  </div>
                </Card>

                <Card className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 rounded-xl space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                    Nagy számok törvénye
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    <div className="font-mono font-bold text-slate-900 dark:text-slate-200">g &rarr; P, ha N &rarr; &infin;</div>
                    <div>Sok kísérletnél a mért relatív gyakoriság kisimul az elméleti értékhez.</div>
                    <div className="text-[11px] text-slate-500">Kis minta (N=10) &rarr; ingadozás</div>
                  </div>
                </Card>
              </div>
            </div>
          )
        },
        {
          id: 'sec-self-check',
          title: 'Összefoglaló önellenőrző kérdések',
          badge: 'Önellenőrzés',
          badgeColor: 'slate',
          content: (
            <div className="space-y-3">
              {[
                {
                  q: '1. Mi a különbség egy tetszőleges hozzárendelés és egy függvény között?',
                  a: 'Egy hozzárendelésnél egy bemenő értékhez több kimenő érték is tartozhatna, míg a függvénynél az alaphalmaz minden eleméhez szigorúan pontosan egy képelem rendelődik hozzá.',
                },
                {
                  q: '2. Ha egy adatsor elemei: 4, 7, 7, 10, mennyi az átlag, a módusz és a medián?',
                  a: 'Átlag: (4 + 7 + 7 + 10) / 4 = 28 / 4 = 7. Módusz: 7 (kétszer szerepel). Medián: (7 + 7) / 2 = 7. Mindhárom mutató pontosan 7!',
                },
                {
                  q: '3. Mennyi egy kördiagramban a 40%-os relatív gyakorisághoz tartozó középponti szög?',
                  a: 'α = 0,40 · 360° = 144°.',
                },
                {
                  q: '4. Egy urnában 6 piros és 4 kék golyó van. Mekkora eséllyel húzunk pirosat?',
                  a: 'Összesen n = 10 golyó van. Kedvező k = 6. Tehát P = 6/10 = 3/5 = 60%.',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
                  <div className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-slate-600 shrink-0" />
                    {item.q}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 pl-6 border-l-2 border-slate-300 dark:border-slate-700 ml-1 mt-1">
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

export default StatsSummaryTheory;
