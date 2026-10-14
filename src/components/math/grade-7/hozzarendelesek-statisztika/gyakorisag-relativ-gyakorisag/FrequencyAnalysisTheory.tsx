import React, { useState } from 'react';
import { TheoryTemplate } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, BarChart3, Percent, CheckCircle2, AlertTriangle, Sparkles, Table } from 'lucide-react';

interface FrequencyAnalysisTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface FrequencyPreset {
  id: string;
  name: string;
  category: string;
  totalN: number;
  description: string;
  rows: {
    label: string;
    k: number;
    fraction: string;
    decimal: number;
    percent: number;
    angle: number;
    color: string;
  }[];
}

const PRESETS: FrequencyPreset[] = [
  {
    id: 'grades',
    name: '1. Dolgozatjegyek megoszlása (n = 20 diák)',
    category: 'Iskola',
    totalN: 20,
    description: 'Egy 20 fős osztály matematika témazáró dolgozatának eredményei érdemjegyenként.',
    rows: [
      { label: '5 (jeles)', k: 6, fraction: '6/20 = 3/10', decimal: 0.30, percent: 30, angle: 108, color: '#10b981' },
      { label: '4 (jó)', k: 8, fraction: '8/20 = 2/5', decimal: 0.40, percent: 40, angle: 144, color: '#3b82f6' },
      { label: '3 (közepes)', k: 4, fraction: '4/20 = 1/5', decimal: 0.20, percent: 20, angle: 72, color: '#f59e0b' },
      { label: '2 (elégséges)', k: 2, fraction: '2/20 = 1/10', decimal: 0.10, percent: 10, angle: 36, color: '#ef4444' },
    ],
  },
  {
    id: 'commute',
    name: '2. Iskolába járás módja (n = 25 diák)',
    category: 'Közlekedés',
    totalN: 25,
    description: 'Hogyan érkeznek a 7. osztályos diákok az iskolába reggelente?',
    rows: [
      { label: 'Gyalog', k: 10, fraction: '10/25 = 2/5', decimal: 0.40, percent: 40, angle: 144, color: '#14b8a6' },
      { label: 'Busszal / villamossal', k: 8, fraction: '8/25', decimal: 0.32, percent: 32, angle: 115.2, color: '#6366f1' },
      { label: 'Biciklivel / rollerrel', k: 5, fraction: '5/25 = 1/5', decimal: 0.20, percent: 20, angle: 72, color: '#8b5cf6' },
      { label: 'Autóval (szülőkkel)', k: 2, fraction: '2/25', decimal: 0.08, percent: 8, angle: 28.8, color: '#ec4899' },
    ],
  },
  {
    id: 'coin',
    name: '3. Pénzérme-dobás (n = 50 kísérlet)',
    category: 'Valószínűségi kísérlet',
    totalN: 50,
    description: 'Egy szabályos pénzérmét 50-szer feldobva rögzítettük a kapott eredményeket.',
    rows: [
      { label: 'Fej', k: 27, fraction: '27/50', decimal: 0.54, percent: 54, angle: 194.4, color: '#0ea5e9' },
      { label: 'Írás', k: 23, fraction: '23/50', decimal: 0.46, percent: 46, angle: 165.6, color: '#f97316' },
    ],
  },
];

export const FrequencyAnalysisTheory: React.FC<FrequencyAnalysisTheoryProps> = ({
  onBack,
  onStartQuiz,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('grades');
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  const preset = PRESETS.find(p => p.id === selectedPresetId) || PRESETS[0];

  // Helper for generating SVG pie chart slices
  let currentAngle = 0;
  const pieSlices = preset.rows.map((row, idx) => {
    const startAngle = currentAngle;
    const endAngle = currentAngle + row.angle;
    currentAngle = endAngle;

    // Convert angles to radians
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);

    const cx = 90;
    const cy = 90;
    const r = 70;

    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const largeArcFlag = row.angle > 180 ? 1 : 0;
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

    return {
      ...row,
      d,
      isHovered: hoveredRowIndex === idx,
    };
  });

  return (
    <TheoryTemplate
      title="5. Gyakoriság, relatív gyakoriság és diagramok"
      subtitle="Adatelemzés, relatív gyakorisági táblázatok, százalékos alak és kördiagram készítése"
      topicBadge="7. OSZTÁLY • VIII. HOZZÁRENDELÉSEK, STATISZTIKA"
      themeColor="teal"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
      practiceSubtitle="30 feladat táblázatokkal, körcikk-szögekkel, diagramokkal és magyarázatokkal"
      practiceButtonText="Teszteld a tudásod (30 kérdés)"
      quickRule={{
        label: 'A relatív gyakoriság és körcikk-szög alapképlete',
        formula: 'g = k / n (összegük = 1 = 100%) | Kördiagram középponti szög: α = g · 360°'
      }}
      sections={[
        {
          id: 'sec-concepts',
          title: 'Gyakoriság ($k$) vs. Relatív gyakoriság ($g$)',
          badge: 'Alapfogalmak',
          badgeColor: 'teal',
          content: (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                Egy statisztikai felmérés során a legfontosabb kérdés: hányszor fordult elő egy adott adat, és ez az előfordulás mekkora hányadát teszi ki a teljes mintának?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 bg-teal-50/70 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800 rounded-xl space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 text-teal-900 dark:text-teal-200 font-bold text-sm">
                    <Table className="w-4 h-4 text-teal-600" />
                    1. Gyakoriság ($k$) – Abszolút darabszám
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Megmutatja, hogy egy adott érték vagy kategória <strong>hányszor fordult elő</strong> a mintában.
                  </p>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900 text-xs text-teal-800 dark:text-teal-300">
                    Példa: <em>„8 tanuló kapott négyest a dolgozatra.”</em> $\to k = 8$.
                  </div>
                </Card>

                <Card className="p-4 bg-sky-50/70 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800 rounded-xl space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 text-sky-900 dark:text-sky-200 font-bold text-sm">
                    <Percent className="w-4 h-4 text-sky-600" />
                    2. Relatív gyakoriság ($g$) – Arány a teljes egészhez
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    A gyakoriság (k) és a teljes megfigyelési létszám (n) hányadosa: g = k / n.
                  </p>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-900 text-xs text-sky-800 dark:text-sky-300">
                    Példa: <em>„A 20 fős osztályban 8 / 20 = 0,40, vagyis a diákok 40%-a kapott négyest.”</em>
                  </div>
                </Card>
              </div>

              <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
                  <strong>Miért jobb a relatív gyakoriság?</strong> Mert különböző méretű csoportok összehasonlítását is lehetővé teszi! Például ha az A osztályban 10-en, a B osztályban 15-en kaptak ötöst, ebből még nem tudjuk, hol volt jobb az eredmény. Ha viszont tudjuk, hogy az A-ban a diákok 50%-a, a B-ben csak 30%-a kapott ötöst, a relatív gyakoriság azonnal mutatja a valódi arányt!
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'sec-pie-chart',
          title: 'Hogyan szerkesztünk kördiagramot? (Középponti szögek)',
          badge: 'Geometria & Statisztika',
          badgeColor: 'sky',
          content: (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                A kördiagram a kategóriák egymáshoz és a teljes egészhez viszonyított arányát szemlélteti. A teljes kör $360^\circ$-os teljes szöget zár be (ez felel meg a $100\%$-nak):
              </p>

              <div className="p-3.5 rounded-xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-center space-y-1">
                <div className="text-xs text-teal-800 dark:text-teal-300 font-semibold">
                  A körcikk középponti szögének képlete:
                </div>
                <div className="text-sm sm:text-base font-bold font-mono text-teal-900 dark:text-teal-200">
                  α = g · 360° = (k / n) · 360°
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-[10px] text-slate-500">50% (félkör)</span>
                  <div className="text-sm font-bold text-teal-600 dark:text-teal-400 mt-0.5">180°</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-[10px] text-slate-500">25% (negyedkör)</span>
                  <div className="text-sm font-bold text-sky-600 dark:text-sky-400 mt-0.5">90° (derékszög)</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-[10px] text-slate-500">10% (tizedkör)</span>
                  <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">36°</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-[10px] text-slate-500">1% (egységnyi szög)</span>
                  <div className="text-sm font-bold text-purple-600 dark:text-purple-400 mt-0.5">3,6°</div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'sec-interactive-lab',
          title: 'Interaktív Gyakorisági és Kördiagram Laboratórium',
          badge: 'Élő táblázat & Diagram',
          badgeColor: 'teal',
          content: (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Válassz ki egy statisztikai felmérést! Vidd az egeret a táblázat sorai vagy a kördiagram szeletei fölé a kapcsolat megfigyeléséhez:
              </p>

              {/* Preset Selector */}
              <div className="flex flex-wrap gap-2">
                {PRESETS.map(p => (
                  <Button
                    key={p.id}
                    variant={selectedPresetId === p.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setSelectedPresetId(p.id);
                      setHoveredRowIndex(null);
                    }}
                    className={
                      selectedPresetId === p.id
                        ? 'bg-teal-600 hover:bg-teal-700 text-white border-teal-600'
                        : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }
                  >
                    {p.name}
                  </Button>
                ))}
              </div>

              {/* Interactive Visual Dashboard */}
              <Card className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-4 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800">
                      {preset.category}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">{preset.name}</h3>
                  </div>
                  <div className="text-xs text-slate-400">
                    Összes megfigyelés: <strong className="text-white">n = {preset.totalN}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Left: SVG Pie Chart */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center py-2">
                    <svg viewBox="0 0 180 180" className="w-44 h-44 select-none drop-shadow-md">
                      {pieSlices.map((slice, idx) => (
                        <path
                          key={idx}
                          d={slice.d}
                          fill={slice.color}
                          stroke="#0f172a"
                          strokeWidth="2"
                          className="cursor-pointer transition-all duration-200 hover:opacity-90"
                          style={{
                            transform: slice.isHovered ? 'scale(1.05)' : 'scale(1)',
                            transformOrigin: '90px 90px',
                          }}
                          onMouseEnter={() => setHoveredRowIndex(idx)}
                          onMouseLeave={() => setHoveredRowIndex(null)}
                        />
                      ))}
                      <circle cx="90" cy="90" r="28" fill="#0f172a" />
                      <text x="90" y="93" textAnchor="middle" className="text-[10px] font-bold fill-white">
                        100%
                      </text>
                    </svg>
                    <span className="text-[11px] text-slate-400 mt-1">Kördiagram (360°)</span>
                  </div>

                  {/* Right: Full Frequency Table */}
                  <div className="md:col-span-7 overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse rounded-xl overflow-hidden border border-slate-800">
                      <thead className="bg-slate-800/80 text-slate-300 font-bold">
                        <tr>
                          <th className="p-2 border-b border-slate-700">Kategória</th>
                          <th className="p-2 border-b border-slate-700 text-center">k (db)</th>
                          <th className="p-2 border-b border-slate-700 text-center">Tört</th>
                          <th className="p-2 border-b border-slate-700 text-center">g (%)</th>
                          <th className="p-2 border-b border-slate-700 text-center">Szög (α)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {preset.rows.map((row, idx) => {
                          const isHovered = hoveredRowIndex === idx;
                          return (
                            <tr
                              key={idx}
                              className={`transition-colors cursor-pointer ${
                                isHovered ? 'bg-teal-950/60 text-teal-200' : 'hover:bg-slate-800/40'
                              }`}
                              onMouseEnter={() => setHoveredRowIndex(idx)}
                              onMouseLeave={() => setHoveredRowIndex(null)}
                            >
                              <td className="p-2 font-medium flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                                {row.label}
                              </td>
                              <td className="p-2 text-center font-bold">{row.k}</td>
                              <td className="p-2 text-center text-slate-400 font-mono text-[11px]">{row.fraction}</td>
                              <td className="p-2 text-center font-bold text-teal-400">{row.percent}%</td>
                              <td className="p-2 text-center text-sky-400 font-mono text-[11px]">{row.angle}°</td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot className="bg-slate-850 font-bold border-t border-slate-700 text-slate-300">
                        <tr>
                          <td className="p-2">Összesen</td>
                          <td className="p-2 text-center text-teal-400">{preset.totalN}</td>
                          <td className="p-2 text-center text-slate-400">1,00</td>
                          <td className="p-2 text-center text-teal-400">100%</td>
                          <td className="p-2 text-center text-sky-400">360°</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </Card>
            </div>
          )
        }
      ]}
      selfCheckQuestions={[
        {
          id: 'sc-fa-1',
          question: 'Egy 25 fős osztályban 5 diák kitűnő bizonyítványt kapott. Mennyi a kitűnők relatív gyakorisága százalékos alakban?',
          options: [
            '20%',
            '5%',
            '25%',
            '50%'
          ],
          correctAnswer: 0,
          explanation: 'A relatív gyakoriság: g = k / n = 5 / 25 = 1 / 5 = 0,20 = 20%.'
        },
        {
          id: 'sc-fa-2',
          question: 'Mennyi a relatív gyakoriságok összege egy teljes statisztikai mintában?',
          options: [
            'Mindig pontosan 1 (vagyis 100%)',
            'Mindig megegyezik a minta darabszámával (n)',
            'Mindig 360',
            'Bármekkora szám lehet a mintától függően'
          ],
          correctAnswer: 0,
          explanation: 'Mivel a részek az egész minta felosztását alkotják, a relatív gyakoriságok összege mindig pontosan 1, azaz 100%.'
        },
        {
          id: 'sc-fa-3',
          question: 'Egy kördiagramban mekkora középponti szög tartozik egy 30%-os részarányú kategóriához?',
          options: [
            '108° (mert 0,30 · 360° = 108°)',
            '30°',
            '60°',
            '120°'
          ],
          correctAnswer: 0,
          explanation: 'A kördiagram teljes szöge 360°. A 30%-os szelet szöge: α = 0,30 · 360° = 108°.'
        },
        {
          id: 'sc-fa-4',
          question: 'Egy kördiagramban egy körcikk szöge pontosan 90°. A minta mekkora hányadát képviseli ez a körcikk?',
          options: [
            'A minta 25%-át (negyedrészét)',
            'A minta 90%-át',
            'A minta 50%-át',
            'A minta 10%-át'
          ],
          correctAnswer: 0,
          explanation: 'A 90° a teljes 360°-os körnek a 90 / 360 = 1 / 4 része, ami 25%-nak felel meg.'
        }
      ]}
    />
  );
};

export default FrequencyAnalysisTheory;
