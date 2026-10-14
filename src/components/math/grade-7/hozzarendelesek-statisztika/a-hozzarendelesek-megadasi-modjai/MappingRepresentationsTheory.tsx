import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Table, FileText, LineChart, Hash, CheckCircle2, Info, Sparkles } from 'lucide-react';

interface MappingRepresentationsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface RepresentationPreset {
  id: string;
  name: string;
  textRule: string;
  formula: string;
  domainName: string;
  pairs: { x: number; y: number }[];
  isContinuous: boolean;
  graphPoints: { cx: number; cy: number; x: number; y: number }[];
  pathD: string;
}

const PRESETS: RepresentationPreset[] = [
  {
    id: 'linear-1',
    name: '1. Kétszerezés és hozzáadás (f(x) = 2x + 1)',
    textRule: 'Minden számhoz rendeljük hozzá a kétszeresénél 1-gyel nagyobb számot!',
    formula: 'f(x) = 2x + 1  vagy  y = 2x + 1',
    domainName: 'Valós számok (R) - folytonos egyenes',
    pairs: [
      { x: -2, y: -3 },
      { x: -1, y: -1 },
      { x: 0, y: 1 },
      { x: 1, y: 3 },
      { x: 2, y: 5 },
    ],
    isContinuous: true,
    // Coordinate system: center (100, 100), scale: 1 unit = 16 px
    graphPoints: [
      { cx: 100 - 2 * 16, cy: 100 - (-3) * 16, x: -2, y: -3 },
      { cx: 100 - 1 * 16, cy: 100 - (-1) * 16, x: -1, y: -1 },
      { cx: 100, cy: 100 - 1 * 16, x: 0, y: 1 },
      { cx: 100 + 1 * 16, cy: 100 - 3 * 16, x: 1, y: 3 },
      { cx: 100 + 2 * 16, cy: 100 - 5 * 16, x: 2, y: 5 },
    ],
    pathD: 'M 52 180 L 148 20',
  },
  {
    id: 'linear-2',
    name: '2. Kivonás a 4-ből (f(x) = 4 - x)',
    textRule: 'Minden számhoz rendeljük hozzá a 4-ből levont értékét (csökkenő szabály)!',
    formula: 'f(x) = 4 - x  vagy  y = 4 - x',
    domainName: 'Egész számok (Z) - pontszerű diszkrét grafikon',
    pairs: [
      { x: -1, y: 5 },
      { x: 0, y: 4 },
      { x: 1, y: 3 },
      { x: 2, y: 2 },
      { x: 3, y: 1 },
    ],
    isContinuous: false,
    graphPoints: [
      { cx: 100 - 1 * 16, cy: 100 - 5 * 16, x: -1, y: 5 },
      { cx: 100, cy: 100 - 4 * 16, x: 0, y: 4 },
      { cx: 100 + 1 * 16, cy: 100 - 3 * 16, x: 1, y: 3 },
      { cx: 100 + 2 * 16, cy: 100 - 2 * 16, x: 2, y: 2 },
      { cx: 100 + 3 * 16, cy: 100 - 1 * 16, x: 3, y: 1 },
    ],
    pathD: '',
  },
  {
    id: 'quadratic',
    name: '3. Négyzetes szabály (f(x) = x² - 2)',
    textRule: 'Minden számhoz rendeljük hozzá a négyzeténél 2-vel kisebb számot!',
    formula: 'f(x) = x² - 2  vagy  y = x² - 2',
    domainName: 'Valós számok (R) - parabola görbe',
    pairs: [
      { x: -2, y: 2 },
      { x: -1, y: -1 },
      { x: 0, y: -2 },
      { x: 1, y: -1 },
      { x: 2, y: 2 },
    ],
    isContinuous: true,
    graphPoints: [
      { cx: 100 - 2 * 16, cy: 100 - 2 * 16, x: -2, y: 2 },
      { cx: 100 - 1 * 16, cy: 100 - (-1) * 16, x: -1, y: -1 },
      { cx: 100, cy: 100 - (-2) * 16, x: 0, y: -2 },
      { cx: 100 + 1 * 16, cy: 100 - (-1) * 16, x: 1, y: -1 },
      { cx: 100 + 2 * 16, cy: 100 - 2 * 16, x: 2, y: 2 },
    ],
    pathD: 'M 60 40 Q 100 155 140 40',
  },
];

// Interactive Representation Explorer component
const RepresentationExplorer: React.FC = () => {
  const [activePresetId, setActivePresetId] = useState<string>('linear-1');
  const current = PRESETS.find((p) => p.id === activePresetId) || PRESETS[0];

  return (
    <Card className="p-4 sm:p-5 bg-gradient-to-br from-indigo-50/70 via-slate-50 to-blue-50/60 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/40 border border-indigo-200 dark:border-indigo-800 shadow-sm rounded-2xl mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
              Interaktív Megadási Mód Labor
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Válassz egy szabályt, és nézd meg, hogyan jelenik meg mind az 5 különböző módon!
          </p>
        </div>
      </div>

      {/* Preset selector pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActivePresetId(p.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              activePresetId === p.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* 5 Representations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {/* 1. Szöveges utasítás */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/90 border border-indigo-100 dark:border-slate-700 shadow-2xs">
          <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            <span>1. Szöveges Utasítás</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 italic font-medium leading-relaxed bg-indigo-50/50 dark:bg-slate-900/60 p-2.5 rounded-lg border border-indigo-100/70 dark:border-indigo-900/40">
            „{current.textRule}”
          </p>
        </div>

        {/* 2. Hozzárendelési szabály / képlet */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/90 border border-blue-100 dark:border-slate-700 shadow-2xs">
          <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-blue-700 dark:text-blue-300">
            <Hash className="w-3.5 h-3.5 text-blue-500" />
            <span>2. Képlet (Hozzárendelési szabály)</span>
          </div>
          <div className="p-2.5 rounded-lg bg-blue-50/50 dark:bg-slate-900/60 border border-blue-100/70 dark:border-blue-900/40 text-center">
            <span className="font-mono text-sm sm:text-base font-bold text-blue-800 dark:text-blue-300">
              {current.formula}
            </span>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
              x: független változó ➔ y: függő változó
            </div>
          </div>
        </div>

        {/* 3. Rendezett számpárok */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/90 border border-purple-100 dark:border-slate-700 shadow-2xs">
          <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-purple-700 dark:text-purple-300">
            <span className="text-purple-500 font-mono font-bold">(x; y)</span>
            <span>3. Rendezett Számpárok Halmaza</span>
          </div>
          <div className="p-2 rounded-lg bg-purple-50/50 dark:bg-slate-900/60 border border-purple-100/70 dark:border-purple-900/40 font-mono text-xs text-purple-900 dark:text-purple-200 break-words">
            H = &#123;{' '}
            {current.pairs.map((p, i) => (
              <span key={i} className="inline-block mr-1">
                ({p.x}; {p.y}){i < current.pairs.length - 1 ? ',' : ''}
              </span>
            ))}{' '}
            &#125;
          </div>
        </div>

        {/* 4. Értéktáblázat */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/90 border border-teal-100 dark:border-slate-700 shadow-2xs">
          <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-teal-700 dark:text-teal-300">
            <Table className="w-3.5 h-3.5 text-teal-500" />
            <span>4. Értéktáblázat</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr className="bg-teal-50 dark:bg-slate-900 border-b border-teal-200 dark:border-slate-700">
                  <th className="py-1 px-2 font-mono font-bold text-teal-800 dark:text-teal-300 border-r border-teal-200 dark:border-slate-700">
                    x
                  </th>
                  {current.pairs.map((p, i) => (
                    <th key={i} className="py-1 px-2 font-mono text-slate-700 dark:text-slate-300">
                      {p.x}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200 dark:border-slate-700">
                  <td className="py-1 px-2 font-mono font-bold text-teal-800 dark:text-teal-300 border-r border-teal-200 dark:border-slate-700 bg-teal-50/50 dark:bg-slate-900/50">
                    y
                  </td>
                  {current.pairs.map((p, i) => (
                    <td key={i} className="py-1 px-2 font-mono font-semibold text-teal-700 dark:text-teal-400">
                      {p.y}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Grafikon / Koordináta-rendszer */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/90 border border-amber-100 dark:border-slate-700 shadow-2xs md:col-span-2 lg:col-span-2">
          <div className="flex items-center justify-between gap-2 mb-1.5 text-xs font-bold text-amber-700 dark:text-amber-300">
            <div className="flex items-center gap-1.5">
              <LineChart className="w-3.5 h-3.5 text-amber-500" />
              <span>5. Grafikon a Koordináta-rendszerben</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
              {current.domainName}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 bg-amber-50/30 dark:bg-slate-900/60 p-2 rounded-xl border border-amber-100/60 dark:border-slate-700">
            {/* SVG Graph View */}
            <svg viewBox="0 0 200 200" className="w-48 h-48 bg-white dark:bg-slate-950 rounded-lg shadow-2xs border border-slate-200 dark:border-slate-800">
              {/* Grid lines */}
              <defs>
                <pattern id="grid-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#e2e8f0" strokeWidth="0.8" className="dark:stroke-slate-800" />
                </pattern>
              </defs>
              <rect width="200" height="200" fill="url(#grid-pattern)" />

              {/* Main Axes */}
              <line x1="100" y1="10" x2="100" y2="190" stroke="#475569" strokeWidth="1.5" />
              <line x1="10" y1="100" x2="190" y2="100" stroke="#475569" strokeWidth="1.5" />
              {/* Arrowheads */}
              <polygon points="100,5 96,15 104,15" fill="#475569" />
              <polygon points="195,100 185,96 185,104" fill="#475569" />
              <text x="190" y="93" className="text-[9px] font-bold fill-slate-700 dark:fill-slate-300">x</text>
              <text x="106" y="14" className="text-[9px] font-bold fill-slate-700 dark:fill-slate-300">y</text>
              <text x="92" y="112" className="text-[8px] fill-slate-400">0</text>

              {/* Continuous Line if applicable */}
              {current.isContinuous && current.pathD && (
                <path d={current.pathD} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
              )}

              {/* Points */}
              {current.graphPoints.map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.cx} cy={pt.cy} r="4" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                  <text
                    x={pt.cx + 5}
                    y={pt.cy - 5}
                    className="text-[8px] font-mono font-bold fill-indigo-900 dark:fill-indigo-200"
                  >
                    ({pt.x};{pt.y})
                  </text>
                </g>
              ))}
            </svg>

            {/* Explanation side note */}
            <div className="text-xs space-y-2 text-slate-600 dark:text-slate-300">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-800 dark:text-slate-100 block mb-0.5">Pontok felmérése:</strong>
                Minden táblázatos oszlop egy pont: az első szám az <strong>x tengelyen</strong> (vízszintes), a második az <strong>y tengelyen</strong> (függőleges) mérendő fel.
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-800 dark:text-slate-100 block mb-0.5">Összekötés szabálya:</strong>
                {current.isContinuous ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    Mivel az alaphalmaz a valós számok halmaza (R), a pontok folytonos vonallal össze vannak kötve!
                  </span>
                ) : (
                  <span className="text-amber-700 dark:text-amber-400 font-semibold">
                    Mivel az alaphalmaz az egész számok (Z), a grafikon csak diszkrét, különálló pontokból áll!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const MappingRepresentationsTheory: React.FC<MappingRepresentationsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const sections: TheorySection[] = [
    {
      id: 'rep-overview',
      title: '1. Az 5 alapvető megadási mód áttekintése',
      icon: <FileText className="w-5 h-5 text-indigo-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Egy és ugyanazt a matematikai hozzárendelést (függvényt) <strong>többféle formában</strong> is megfogalmazhatjuk.
            Bármelyik megadási módból kiindulva könnyedén átválthatunk egy másikra!
          </p>

          <RepresentationExplorer />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800">
              <h5 className="font-bold text-xs sm:text-sm text-indigo-900 dark:text-indigo-300 mb-1 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-600" />
                1. Szöveges utasítás
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Természetes nyelven leírt szabály. Pl.: <em>„Minden számhoz a háromszorosánál 2-vel kisebb számot rendelünk.”</em>
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-slate-900 border border-blue-200 dark:border-blue-800">
              <h5 className="font-bold text-xs sm:text-sm text-blue-900 dark:text-blue-300 mb-1 flex items-center gap-1.5">
                <Hash className="w-4 h-4 text-blue-600" />
                2. Képlet / Hozzárendelési szabály
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Tömör algebrai formula. Pl.: <code className="bg-blue-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono font-bold text-blue-800 dark:text-blue-200">f(x) = 3x - 2</code> vagy <code className="bg-blue-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono font-bold text-blue-800 dark:text-blue-200">y = 3x - 2</code>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-50/70 dark:bg-slate-900 border border-teal-200 dark:border-teal-800">
              <h5 className="font-bold text-xs sm:text-sm text-teal-900 dark:text-teal-300 mb-1 flex items-center gap-1.5">
                <Table className="w-4 h-4 text-teal-600" />
                3. Értéktáblázat
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A felső sorban a független változók (x), az alsó sorban a kiszámolt képelemek (y) szerepelnek.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-slate-900 border border-purple-200 dark:border-purple-800">
              <h5 className="font-bold text-xs sm:text-sm text-purple-900 dark:text-purple-300 mb-1 flex items-center gap-1.5">
                <span className="font-mono text-purple-600 font-bold">(x; y)</span>
                4. Rendezett számpárok
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A táblázat oszlopainak felírása pontpárokként: <code className="bg-purple-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-purple-800 dark:text-purple-200">&#123; (1; 1), (2; 4), (3; 7) &#125;</code>.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'rep-flow',
      title: '2. Átjárhatóság: Hogyan számolunk és váltunk megadási módot?',
      icon: <ArrowRight className="w-5 h-5 text-blue-500" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <p className="leading-relaxed">
            A leggyakoribb feladattípus az, amikor a megadott <strong>képlet alapján el kell készíteni az értéktáblázatot</strong>, majd azt <strong>ábrázolni kell a grafikonon</strong>.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h5 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">1</span>
              Képletből ➔ Értéktáblázat készítése
            </h5>
            <p className="text-slate-600 dark:text-slate-400">
              Válasszunk ki néhány tetszőleges x értéket (általában érdemes negatív, nulla és pozitív számokat is választani: pl. -2, -1, 0, 1, 2).
              Minden x értéket helyettesítsünk be a képletbe:
            </p>
            <div className="bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
              <div>Példa: f(x) = 3x - 1</div>
              <div className="text-indigo-600 dark:text-indigo-400">• x = -1 ➔ f(-1) = 3 · (-1) - 1 = -3 - 1 = -4</div>
              <div className="text-indigo-600 dark:text-indigo-400">• x = 0  ➔ f(0)  = 3 · 0 - 1 = 0 - 1 = -1</div>
              <div className="text-indigo-600 dark:text-indigo-400">• x = 1  ➔ f(1)  = 3 · 1 - 1 = 3 - 1 = 2</div>
              <div className="text-indigo-600 dark:text-indigo-400">• x = 2  ➔ f(2)  = 3 · 2 - 1 = 6 - 1 = 5</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h5 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold">2</span>
              Táblázatból ➔ Számpárok és Grafikon
            </h5>
            <p className="text-slate-600 dark:text-slate-400">
              A kiszámolt x és y értékek egy-egy pont koordinátái a derékszögű koordináta-rendszerben:
            </p>
            <div className="bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs text-teal-800 dark:text-teal-300">
              P₁(-1; -4),  P₂(0; -1),  P₃(1; 2),  P₄(2; 5)
            </div>
            <p className="text-[11px] text-slate-500">
              Figyelem: A derékszögű síkban a pont első száma mindig az <strong>x (vízszintes)</strong>, a második száma pedig az <strong>y (függőleges)</strong> tengelyen keresendő meg!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'rep-discrete-vs-cont',
      title: '3. Diszkrét pontok vagy folytonos vonal? Az alaphalmaz szerepe',
      icon: <LineChart className="w-5 h-5 text-amber-500" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <p className="leading-relaxed">
            Egy függvény grafikonjának megrajzolásakor kulcsfontosságú, hogy <strong>milyen halmazon értelmezzük</strong> a szabályt!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-amber-800 space-y-2">
              <strong className="text-amber-800 dark:text-amber-300 block text-sm">Diszkrét alaphalmaz (pl. Z, N vagy véges halmaz)</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Ha x csak egész szám vagy kiválasztott különálló értékek lehetnek, a grafikon <strong>NEM köthető össze</strong> folytonos vonallal.
                A grafikon ilyenkor <strong>különálló, magányos pontok halmaza</strong>.
              </p>
              <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                Példa: x a megvásárolt könyvek száma (csak egész darabszám lehet: 1, 2, 3...).
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 space-y-2">
              <strong className="text-indigo-800 dark:text-indigo-300 block text-sm">Folytonos alaphalmaz (a valós számok, R)</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Ha x bármilyen valós szám lehet (törtek, tizedestörtek is), akkor a pontok közötti végtelen sok közbenső pont is létezik.
                A pontokat ilyenkor <strong>egyenes vonallal vagy sima görbével kötjük össze</strong>.
              </p>
              <div className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-400">
                Példa: x a jármű sebessége vagy a megtett út ideje (bármilyen tört másodperc lehet).
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'rep-mistakes',
      title: '4. Típushibák és ellenőrzési tanácsok',
      icon: <Info className="w-5 h-5 text-rose-500" />,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <div className="p-3 bg-rose-50 dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-800">
            <strong className="text-rose-700 dark:text-rose-300 block mb-1">1. Koordináták felcserélése (x és y tévesztése):</strong>
            A rendezett számpárban az <strong>első helyen mindig az x</strong> (jobbra-balra lépés), a <strong>második helyen az y</strong> (fel-le lépés) áll: (x; y). A P(2; 5) pont nem ugyanaz, mint a Q(5; 2)!
          </div>

          <div className="p-3 bg-amber-50 dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-800">
            <strong className="text-amber-700 dark:text-amber-300 block mb-1">2. Negatív szám behelyettesítése előjeles műveletbe:</strong>
            Ha f(x) = 2 - 3x és x = -2, akkor: f(-2) = 2 - 3·(-2) = 2 - (-6) = 2 + 6 = 8. Ne feledkezz meg a „mínusz szorozva mínusszal az plusz” szabályról!
          </div>

          <div className="p-3 bg-emerald-50 dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <strong className="text-emerald-700 dark:text-emerald-300 block mb-1">3. Ellenőrzési trükk (egyenesség):</strong>
            Egy elsőfokú (lineáris) szabály, mint az y = ax + b, mindig egyenes grafikonhoz vezet! Ha az értéktáblázatból felmért pontok nem esnek egy egyenesre, valamelyik koordináta kiszámításánál hiba történt.
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="2. A hozzárendelések megadási módjai"
      subtitle="Ismerd meg és tanuld meg használni az 5 reprezentációs formát: szöveg, képlet, táblázat, számpárok és grafikon!"
      topicBadge="7. OSZTÁLY • HOZZÁRENDELÉSEK, STATISZTIKA • 📖 TANANYAG"
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      selfCheckQuestions={[
        {
          id: 'sc-rep-1',
          question: 'Melyik az a megadási mód, ahol a hozzárendelés összetartozó értékei egy (x; y) formátumú zárójeles kifejezésként jelennek meg?',
          options: [
            'Rendezett számpár',
            'Értéktáblázat',
            'Szöveges utasítás',
            'Függvény-definíció'
          ],
          correctAnswer: 0,
          explanation: 'Az (x; y) alak a rendezett számpár, ahol az x az őskép (bemenet), az y pedig a képelem (kimenet).'
        },
        {
          id: 'sc-rep-2',
          question: 'A hozzárendelés képlete f(x) = 4x - 3. Mennyi az y értéke, ha x = -2?',
          options: [
            '-11',
            '-5',
            '5',
            '11'
          ],
          correctAnswer: 0,
          explanation: 'Behelyettesítve: f(-2) = 4 · (-2) - 3 = -8 - 3 = -11.'
        },
        {
          id: 'sc-rep-3',
          question: 'Mikor szabad egy függvény grafikonjának pontjait folytonos vonallal összekötni a koordináta-rendszerben?',
          options: [
            'Ha az értelmezési tartomány a valós számok halmaza (R), ahol a törtszámok is megengedettek',
            'Mindig kötelező összekötni, akármilyen halmazon dolgozunk',
            'Csak akkor, ha az összes kiszámolt érték pozitív',
            'Csak ha a grafikon átmegy az origón (0; 0)'
          ],
          correctAnswer: 0,
          explanation: 'Csak folytonos értelmezési tartomány (pl. valós számok halmaza) esetén kötjük össze a pontokat. Ha az alaphalmaz pl. az egész számok (Z), a grafikon kizárólag különálló pontokból áll!'
        },
        {
          id: 'sc-rep-4',
          question: 'A táblázatban x = 3 esetén y = 7 szerepel. Hogyan írjuk fel ezt a hozzárendelést pontként a grafikonon?',
          options: [
            'P(3; 7)',
            'P(7; 3)',
            'P(3; 3)',
            'P(7; 7)'
          ],
          correctAnswer: 0,
          explanation: 'A rendezett számpárban az első helyen mindig a független változó (x = 3), a második helyen a függő változó (y = 7) áll: P(3; 7).'
        }
      ]}
    />
  );
};

export default MappingRepresentationsTheory;
