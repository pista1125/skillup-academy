import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, LineChart, Compass, TrendingUp, TrendingDown, Minus, CheckCircle2, Info, Sparkles, AlertTriangle } from 'lucide-react';

interface GraphReadingTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface ProcessPreset {
  id: string;
  name: string;
  category: string;
  xAxisLabel: string;
  yAxisLabel: string;
  description: string;
  dataPoints: { x: number; y: number; label?: string }[];
  pathD: string;
  keyFeatures: { label: string; value: string }[];
}

const PRESETS: ProcessPreset[] = [
  {
    id: 'trip',
    name: '1. Kiránduló út–idő grafikonja (s - t)',
    category: 'Fizikai mozgás',
    xAxisLabel: 'Eltelt idő (óra)',
    yAxisLabel: 'Megtett út (km)',
    description: 'A kiránduló 2 órán át egyenletesen halad (8 km-ig), 1 órát pihen a réten (vízszintes szakasz), majd 2 óra alatt visszatér a kiindulópontra.',
    dataPoints: [
      { x: 0, y: 0, label: 'Indulás (0; 0)' },
      { x: 2, y: 8, label: 'Érkezés a rétre (2; 8)' },
      { x: 3, y: 8, label: 'Pihenő vége (3; 8)' },
      { x: 5, y: 0, label: 'Visszaérkezés (5; 0)' },
    ],
    // SVG coordinate mapping:
    // ViewBox: 0 0 340 220
    // x range: 0 to 6 -> origin at (40, 180), dx = 48 px/unit
    // y range: 0 to 10 -> dy = 15 px/unit
    pathD: 'M 40 180 L 136 60 L 184 60 L 280 180',
    keyFeatures: [
      { label: 'Nyugvó (állandó) szakasz', value: '2 és 3 óra között (pihenés, s = 8 km változatlan)' },
      { label: 'Legnagyobb távolság (maximum)', value: '8 km (2 és 3 óra között)' },
      { label: 'Zérushelyek', value: 't = 0 óra (indulás) és t = 5 óra (visszaérkezés)' },
      { label: 'Meredekség (sebesség)', value: 'Odafelé: 8 km / 2 h = 4 km/h' },
    ],
  },
  {
    id: 'temperature',
    name: '2. Napi hőmérséklet-változás (T - t)',
    category: 'Időjárás',
    xAxisLabel: 'Napszak / Idő (óra)',
    yAxisLabel: 'Hőmérséklet (°C)',
    description: 'A hajnali fagy (-2 °C) után a nap folyamán melegszik a levegő, 14:00-kor eléri a napi csúcsot (6 °C), majd este ismét lehűl 0 °C-ra.',
    dataPoints: [
      { x: 0, y: -2, label: 'Hajnal (0; -2)' },
      { x: 1, y: 0, label: 'Fagyáspont átlépése (1; 0)' },
      { x: 3, y: 6, label: 'Napi maximum (3; 6)' },
      { x: 5, y: 0, label: 'Esti lehűlés (5; 0)' },
      { x: 6, y: -1, label: 'Késő este (6; -1)' },
    ],
    // Origin at (40, 130), dy = 14 px/unit
    pathD: 'M 40 158 L 88 130 Q 184 46 184 46 L 280 130 L 328 144',
    keyFeatures: [
      { label: 'Napi maximum (legmelegebb)', value: '6 °C (3. időpontban / kora délután)' },
      { label: 'Napi minimum (leghidegebb)', value: '-2 °C (0. időpontban / hajnalban)' },
      { label: 'Zérushelyek (0 °C átlépése)', value: 't = 1 óránál és t = 5 óránál (fagyáspont)' },
      { label: 'Melegedési szakasz', value: '0 és 3 között szigorúan növekvő' },
    ],
  },
  {
    id: 'tank',
    name: '3. Víztartály feltöltése és leengedése',
    category: 'Műszaki folyamat',
    xAxisLabel: 'Eltelt idő (perc)',
    yAxisLabel: 'Vízmennyiség (liter)',
    description: 'Egy 50 literes tartályt üres állapotból 20 perc alatt egyenletesen feltöltenek, 10 percig tele áll, majd gyorsabban, 10 perc alatt leeresztik.',
    dataPoints: [
      { x: 0, y: 0, label: 'Üres tartály (0; 0)' },
      { x: 2, y: 50, label: 'Tele tartály (20; 50)' },
      { x: 3, y: 50, label: 'Várakozás vége (30; 50)' },
      { x: 4, y: 0, label: 'Kiürült (40; 0)' },
    ],
    pathD: 'M 40 180 L 160 55 L 220 55 L 280 180',
    keyFeatures: [
      { label: 'Feltöltési sebesség', value: '50 liter / 20 perc = 2,5 liter/perc' },
      { label: 'Leengedési sebesség', value: '50 liter / 10 perc = 5 liter/perc (meredekebb lejtő!)' },
      { label: 'Maximális tartalom', value: '50 liter (a 20. és 30. perc között)' },
      { label: 'Zérushelyek', value: '0 percnél és 40 percnél üres a tartály' },
    ],
  },
];

export const GraphReadingTheory: React.FC<GraphReadingTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('trip');
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; label?: string } | null>(null);

  const activePreset = PRESETS.find(p => p.id === selectedPresetId) || PRESETS[0];

  return (
    <TheoryTemplate
      title="3. Olvassunk a grafikonról!"
      subtitle="Valós fizikai, természeti és gazdasági folyamatok elemzése derékszögű koordináta-rendszerben"
      topicBadge="7. OSZTÁLY • VIII. HOZZÁRENDELÉSEK, STATISZTIKA"
      themeColor="cyan"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
      practiceSubtitle="30 változatos feladat ábrákkal, koordináta-hálóval és magyarázatokkal"
      practiceButtonText="Teszteld a tudásod (30 kérdés)"
      quickRule={{
        label: 'A grafikonról való leolvasás aranyszabálya',
        formula: 'x megadásakor: x-tengelyről függőlegesen a görbéig, majd vízszintesen az y-tengelyre; y megadásakor: y-tengelyről vízszintesen a görbéig, majd le az x-tengelyre!'
      }}
      sections={[
        {
          id: 'sec-axes',
          title: 'A tengelyek értelmezése és a skálázás fontossága',
          badge: 'Alapismeretek',
          badgeColor: 'cyan',
          content: (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                A grafikon egy olyan vizuális kép, amely két összetartozó mennyiség kapcsolatát ábrázolja a derékszögű koordináta-rendszerben. Mielőtt bármilyen értéket leolvasnánk, mindig meg kell vizsgálnunk a tengelyek elnevezését és beosztását:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 bg-sky-50/70 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-sky-800 dark:text-sky-300 font-bold text-sm">
                    <Compass className="w-4 h-4 text-sky-600" />
                    Vízszintes tengely ($x$-tengely)
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Hagyományosan a <strong>független változó</strong> helye. Ide kerülnek azok az adatok, amelyeket mi választunk meg vagy amelyek maguktól egyenletesen telnek:
                  </p>
                  <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400 pl-4 list-disc">
                    <li>Eltelt idő: másodperc ($s$), perc ($min$), óra ($h$), napok, hónapok.</li>
                    <li>Darabszám, személyek száma, megtett távolság.</li>
                  </ul>
                </Card>

                <Card className="p-4 bg-cyan-50/70 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-800 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-cyan-800 dark:text-cyan-300 font-bold text-sm">
                    <LineChart className="w-4 h-4 text-cyan-600" />
                    Függőleges tengely ($y$-tengely)
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    A <strong>függő változó</strong> tengelye. Ennek értéke az $x$ változásától függ:
                  </p>
                  <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400 pl-4 list-disc">
                    <li>Megtett út ($s$), sebesség ($v$), magasság ($h$).</li>
                    <li>Hőmérséklet ($T$), folyadékszint (liter), költség, fizetendő összeg (Ft).</li>
                  </ul>
                </Card>
              </div>

              <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                  <strong>Vigyázat, skálázási csapda!</strong> Soha ne feltételezd automatikusan, hogy egy rácsnégyzet pontosan 1 egység! Mindig nézd meg a tengelyeken lévő feliratokat: előfordulhat, hogy 1 rácsköz az $x$-tengelyen 2 órát jelent, az $y$-tengelyen pedig 10 km-t vagy 50 litert!
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'sec-reading-steps',
          title: 'Hogyan olvasunk le értékeket a grafikonról?',
          badge: 'Módszertan',
          badgeColor: 'blue',
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 rounded-xl space-y-3 shadow-xs">
                  <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 text-xs flex items-center justify-center font-bold">1</span>
                    Adott $x$-hez tartozó $y$ keresése ($f(x) = ?$)
                  </div>
                  <ol className="text-xs space-y-2 text-slate-700 dark:text-slate-300 pl-4 list-decimal leading-relaxed">
                    <li>Keresd meg az adott értéket a <strong>vízszintes ($x$) tengelyen</strong>!</li>
                    <li>Indulj el onnan <strong>függőlegesen</strong> (felfelé vagy lefelé), amíg el nem éred a grafikon vonalát!</li>
                    <li>A metszéspontból fordulj <strong>vízszintesen a függőleges ($y$) tengely felé</strong>!</li>
                    <li>Olvasd le a skáláról a hozzá tartozó $y$ értéket!</li>
                  </ol>
                  <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-[11px] text-cyan-800 dark:text-cyan-300 font-medium">
                    Példa: <em>„Hány km utat tett meg a 2. órában?”</em> $\to$ $x = 2$-nél a görbén $y = 8$, tehát 8 km-t.
                  </div>
                </Card>

                <Card className="p-4 bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 rounded-xl space-y-3 shadow-xs">
                  <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs flex items-center justify-center font-bold">2</span>
                    Adott $y$-hoz tartozó $x$ keresése ($x = ?$, ha $y = c$)
                  </div>
                  <ol className="text-xs space-y-2 text-slate-700 dark:text-slate-300 pl-4 list-decimal leading-relaxed">
                    <li>Keresd meg az adott értéket a <strong>függőleges ($y$) tengelyen</strong>!</li>
                    <li>Indulj el onnan <strong>vízszintesen</strong> mindkét irányban a grafikonig!</li>
                    <li>A kapott metszéspont(ok)ból indulj <strong>függőlegesen le/fel az $x$-tengelyig</strong>!</li>
                    <li>Olvasd le az $x$ értéke(ke)t! <em>(Több megoldás is lehetséges!)</em></li>
                  </ol>
                  <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-[11px] text-indigo-800 dark:text-indigo-300 font-medium">
                    Példa: <em>„Mikor volt a hőmérséklet pontosan 0 °C?”</em> $\to$ Ahol a vonal metszi az $x$-tengelyt (zérushelyek).
                  </div>
                </Card>
              </div>
            </div>
          )
        },
        {
          id: 'sec-features',
          title: 'Főbb függvényjellemzők és alakzatok leolvasása',
          badge: 'Jellemzők',
          badgeColor: 'teal',
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Card className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    Növekedés (Monoton nő)
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    Balról jobbra haladva a grafikon emelkedik. Ha $x$ nő, akkor $y$ is nő. (Pl. gyorsulás, távolság növekedése, melegedés).
                  </p>
                </Card>

                <Card className="p-3.5 bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-xs">
                    <TrendingDown className="w-4 h-4 text-rose-600" />
                    Csökkenés (Monoton csökken)
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    Balról jobbra haladva a vonal süllyed. Ahogy $x$ nő, az $y$ értéke csökken. (Pl. vízszint csökkenése, lehűlés, lassulás).
                  </p>
                </Card>

                <Card className="p-3.5 bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs">
                    <Minus className="w-4 h-4 text-amber-600" />
                    Állandó (Konstans szakasz)
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    Vízszintes egyenes szakasz. Az $y$ értéke nem változik. (Pl. a jármű áll, a fűtés kikapcsolva, állandó sebesség).
                  </p>
                </Card>

                <Card className="p-3.5 bg-purple-50/60 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-2 text-purple-800 dark:text-purple-300 font-bold text-xs">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    Szélsőérték és Zérushely
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong>Maximum:</strong> a legmagasabb pont (legnagyobb y-érték).<br />
                    <strong>Minimum:</strong> a legmélyebb pont (legkisebb y-érték).<br />
                    <strong>Zérushely:</strong> ahol y = 0 (metszi az x-tengelyt).
                  </p>
                </Card>
              </div>
            </div>
          )
        },
        {
          id: 'sec-interactive-lab',
          title: 'Interaktív Grafikon-elemző Laboratórium',
          badge: 'Vizuális bemutató',
          badgeColor: 'cyan',
          content: (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Válaszd ki az alábbi életszerű folyamatok egyikét, és figyeld meg a grafikon jellegzetes pontjait, szakaszait és leolvasásait!
              </p>

              {/* Preset Selector Buttons */}
              <div className="flex flex-wrap gap-2">
                {PRESETS.map(preset => (
                  <Button
                    key={preset.id}
                    variant={selectedPresetId === preset.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setSelectedPresetId(preset.id);
                      setHoveredPoint(null);
                    }}
                    className={
                      selectedPresetId === preset.id
                        ? 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-600'
                        : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>

              {/* Interactive Visual Graph Canvas */}
              <Card className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-4 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                      {activePreset.category}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">{activePreset.name}</h3>
                  </div>
                  <div className="text-xs text-slate-400">
                    Kattints vagy vidd az egeret a jelölt pontokra!
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {activePreset.description}
                </p>

                {/* SVG Coordinate Grid and Plot */}
                <div className="w-full flex justify-center py-2 overflow-x-auto">
                  <svg viewBox="0 0 360 220" className="w-full max-w-lg h-56 select-none bg-slate-950 rounded-xl border border-slate-800">
                    <defs>
                      <pattern id="grid-pattern" width="24" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 24 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,2" />
                      </pattern>
                    </defs>
                    <rect x="30" y="10" width="310" height="180" fill="url(#grid-pattern)" />

                    {/* Axes */}
                    {/* x-axis */}
                    <line x1="30" y1="180" x2="345" y2="180" stroke="#94a3b8" strokeWidth="1.5" />
                    <polygon points="345,177 352,180 345,183" fill="#94a3b8" />
                    <text x="340" y="200" textAnchor="end" className="text-[9px] font-bold fill-slate-400">
                      {activePreset.xAxisLabel}
                    </text>

                    {/* y-axis */}
                    <line x1="40" y1="195" x2="40" y2="15" stroke="#94a3b8" strokeWidth="1.5" />
                    <polygon points="37,15 40,8 43,15" fill="#94a3b8" />
                    <text x="45" y="20" textAnchor="start" className="text-[9px] font-bold fill-slate-400">
                      {activePreset.yAxisLabel}
                    </text>

                    {/* Origin */}
                    <text x="32" y="194" textAnchor="end" className="text-[9px] fill-slate-500">0</text>

                    {/* Function Path */}
                    <path
                      d={activePreset.pathD}
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                    />

                    {/* Key interactive points */}
                    {activePreset.dataPoints.map((pt, idx) => {
                      // Map to SVG coordinates according to preset
                      let cx = 40 + pt.x * 48;
                      let cy = 180;
                      if (activePreset.id === 'trip') {
                        cy = 180 - pt.y * 15;
                      } else if (activePreset.id === 'temperature') {
                        cx = 40 + pt.x * 48;
                        cy = 130 - pt.y * 14;
                      } else if (activePreset.id === 'tank') {
                        cx = 40 + pt.x * 60;
                        cy = 180 - (pt.y / 50) * 125;
                      }

                      const isHovered = hoveredPoint?.x === pt.x && hoveredPoint?.y === pt.y;

                      return (
                        <g
                          key={idx}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredPoint(pt)}
                          onClick={() => setHoveredPoint(pt)}
                        >
                          {/* Guideline crosshairs when hovered */}
                          {isHovered && (
                            <>
                              <line x1="40" y1={cy} x2={cx} y2={cy} stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,3" />
                              <line x1={cx} y1={cy} x2={cx} y2="180" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,3" />
                            </>
                          )}
                          <circle
                            cx={cx}
                            cy={cy}
                            r={isHovered ? 7 : 5}
                            fill={isHovered ? '#38bdf8' : '#0891b2'}
                            stroke="#ffffff"
                            strokeWidth="2"
                            className="transition-all duration-200"
                          />
                          <text
                            x={cx}
                            y={cy - 10}
                            textAnchor="middle"
                            className="text-[9px] font-bold fill-cyan-300 drop-shadow"
                          >
                            ({pt.x}; {pt.y})
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Hover info banner */}
                {hoveredPoint && (
                  <div className="p-2.5 bg-cyan-950/80 border border-cyan-700/80 rounded-xl flex items-center justify-between text-xs text-cyan-200">
                    <span className="font-bold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      Kiválasztott pont: ({hoveredPoint.x}; {hoveredPoint.y})
                    </span>
                    <span className="text-slate-300">{hoveredPoint.label}</span>
                  </div>
                )}

                {/* Key features of this process */}
                <div className="pt-2 border-t border-slate-800">
                  <div className="text-xs font-bold text-slate-300 mb-2">A folyamat leolvasható jellemzői:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {activePreset.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                        <span className="text-slate-400 text-[11px]">{feat.label}:</span>
                        <span className="font-semibold text-cyan-300 mt-0.5">{feat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )
        }
      ]}
      selfCheckQuestions={[
        {
          id: 'sc-gr-1',
          question: 'Mit jelent egy út–idő (s - t) grafikonon a vízszintes szakasz?',
          options: [
            'A test áll (sebessége 0 km/h, a megtett út nem változik az idő múlásával)',
            'A test a lehető leggyorsabban száguld',
            'A test visszafelé tolat',
            'A test egy hegyre mászik felfelé'
          ],
          correctAnswer: 0,
          explanation: 'Mivel a vízszintes szakaszon az eltelt idő (x) telik, de az út (y) értéke nem növekszik és nem csökken, a jármű vagy személy egy helyben áll (pihen).'
        },
        {
          id: 'sc-gr-2',
          question: 'Hogyan határozzuk meg a grafikon zérushelyét a koordináta-rendszerben?',
          options: [
            'Megkeressük, hogy a grafikon hol metszi a vízszintes x-tengelyt (ahol y = 0)',
            'Megkeressük, hol metszi a grafikon a függőleges y-tengelyt',
            'A grafikon legmagasabb pontjának y értékét olvassuk le',
            'Összeadjuk a kezdőpont és a végpont koordinátáit'
          ],
          correctAnswer: 0,
          explanation: 'A zérushely az a független változó (x) érték, amelynél a függvény értéke (y) pontosan nulla. Geometriailag ez a grafikon és az x-tengely metszéspontja.'
        },
        {
          id: 'sc-gr-3',
          question: 'Egy grafikonon az x-tengely beosztása: 1 rács = 2 óra; az y-tengelyen: 1 rács = 5 km. Egy pont a 3. rácsvonalon jobbra és a 4. rácsvonalon felfelé található. Mik a koordinátái?',
          options: [
            '(6 óra; 20 km)',
            '(3 óra; 4 km)',
            '(5 óra; 7 km)',
            '(10 óra; 12 km)'
          ],
          correctAnswer: 0,
          explanation: 'Mindig a skálát kell figyelembe venni: x = 3 rács · 2 óra = 6 óra; y = 4 rács · 5 km = 20 km. A helyes érték (6; 20).'
        },
        {
          id: 'sc-gr-4',
          question: 'Egy napi hőmérsékleti grafikonon a legmagasabb pont koordinátája (14; 22). Mit jelent ez a valóságban?',
          options: [
            '14:00 órakor volt a legmelegebb, a csúcshőmérséklet 22 °C volt',
            '22:00 órakor a hőmérséklet 14 °C volt',
            'Összesen 14 napig tartott a 22 fokos kánikula',
            'A hőmérséklet 14 és 22 fok között ingadozott egész nap'
          ],
          correctAnswer: 0,
          explanation: 'Az x-tengely az időt jelöli (14 óra), az y-tengely a hőmérsékletet (22 °C). A maximum pont a napi csúcsot jelzi: 14:00-kor 22 °C.'
        }
      ]}
    />
  );
};

export default GraphReadingTheory;
