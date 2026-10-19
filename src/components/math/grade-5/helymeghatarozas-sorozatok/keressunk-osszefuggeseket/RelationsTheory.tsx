import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  FormulaBox,
  ExampleBox
} from '../TheoryTemplate';
import {
  Lightbulb,
  Cpu,
  Table,
  ArrowRight,
  TrendingUp,
  Shapes,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Search
} from 'lucide-react';

export interface RelationsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const RelationsTheory: React.FC<RelationsTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- 1. Interaktív Számgép Állapot ---
  const [machineInput, setMachineInput] = useState<number>(4);
  const [selectedRuleId, setSelectedRuleId] = useState<'double_plus_1' | 'triple_minus_2' | 'half_plus_3'>('double_plus_1');

  const RULES_DATA = {
    'double_plus_1': {
      name: '2 · x + 1',
      verbal: 'Kétszerezd meg a bemenetet, majd adj hozzá 1-et!',
      compute: (x: number) => 2 * x + 1,
      reverse: (y: number) => (y - 1) / 2
    },
    'triple_minus_2': {
      name: '3 · x - 2',
      verbal: 'Háromszorozd meg a bemenetet, majd vonj ki 2-t!',
      compute: (x: number) => 3 * x - 2,
      reverse: (y: number) => (y + 2) / 3
    },
    'half_plus_3': {
      name: 'x : 2 + 3 (páros bemenetek)',
      verbal: 'Felezd meg a számot, majd adj hozzá 3-at!',
      compute: (x: number) => Math.floor(x / 2) + 3,
      reverse: (y: number) => (y - 3) * 2
    }
  };

  const activeRule = RULES_DATA[selectedRuleId];
  const machineOutput = activeRule.compute(machineInput);

  // --- 2. Interaktív Gyufaszál Építő Állapot ---
  const [squareCount, setSquareCount] = useState<number>(3);
  const matchstickCount = 3 * squareCount + 1;

  return (
    <TheoryTemplate
      documentId="grade-5-relations-theory"
      pdfFilename="5_osztaly_V_7_keressunk_osszefuggeseket.pdf"
      title="Keressünk összefüggéseket!"
      subtitle="Szabályfelismerés számokban és táblázatokban, a számgép modell és inverz műveletei, képletek szavakkal és betűkkel, valamint képi-geometriai sorozatok (gyufaszál-feladványok)"
      themeColor="amber"
      emoji="🔍"
      badge="5. OSZTÁLY • V. HELYMEGHATÁROZÁS, SOROZATOK • 7. TANANYAG"
      quickRule={{
        label: 'A számgép működési alapelve',
        formula: '\\text{Bemenet } (x) \\quad \\xrightarrow{\\text{Szabály: pl. } 2x + 1} \\quad \\text{Kimenet } (y) \\qquad \\Longleftrightarrow \\qquad \\text{Visszafelé: } x = \\frac{y - 1}{2}'
      }}
      practiceTitle="Készen állsz a szabálykereső feladványokra?"
      practiceSubtitle="Tedd próbára logikai képességeidet a 30 kérdéses kvízben és az interaktív párosító-csoportosító játékokban!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: A SZÁMGÉP ÉS A SZABÁLYOK */}
      <TheorySection
        id="szamgep-modell"
        title="1. A Számgép Modell és a Szabályok Felismerése"
        subtitle="Hogyan alakítja át a gép a bemenő számot kimenő számmá?"
        badge="ALAPMODELL"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="Bemenet (x vagy ☐)"
            badge="KEZDŐ ÉRTÉK"
            color="blue"
            icon={<ArrowRight className="w-5 h-5 text-blue-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A számgépbe bedobott kiinduló érték. Jelölhetjük üres négyzettel (☐), $x$-szel vagy $n$-nel.
            </p>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded text-xs text-blue-900 dark:text-blue-200">
              Például: bedobunk egy 4-est.
            </div>
          </TheoryCard>

          <TheoryCard
            title="A Számgép Szabálya"
            badge="MŰVELETSOR"
            color="amber"
            icon={<Cpu className="w-5 h-5 text-amber-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A gép belsejében lezajló matematikai művelet, amely <strong>minden bemenetre ugyanúgy működik</strong>.
            </p>
            <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded text-xs text-amber-900 dark:text-amber-200 font-mono">
              Szabály: [ · 2 + 1 ]
            </div>
          </TheoryCard>

          <TheoryCard
            title="Kimenet (y vagy △)"
            badge="EREDMÉNY"
            color="emerald"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A művelet elvégzése után kieső eredmény. Jelölhetjük háromszöggel (△) vagy $y$-nal.
            </p>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded text-xs text-emerald-900 dark:text-emerald-200">
              4 esetén: 2 · 4 + 1 = <strong>9</strong>.
            </div>
          </TheoryCard>
        </div>

        {/* 1. INTERAKTÍV ESZKÖZ: SZÁMGÉP SZIMULÁTOR */}
        <div className="mt-6 p-4 md:p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 rounded-2xl border-2 border-amber-300 dark:border-amber-800 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-amber-600 text-white">
                  Interaktív Szimulátor
                </span>
                <h4 className="text-base font-bold text-slate-800 dark:text-white">
                  Működő Számgép Laboratórium
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Válassz ki egy szabályt, állítsd be a bemenetet, és figyeld meg az átalakulást és a táblázatot!
              </p>
            </div>

            {/* Szabály választó gombok */}
            <div className="flex gap-1.5 flex-wrap">
              {[
                { id: 'double_plus_1', label: '2x + 1' },
                { id: 'triple_minus_2', label: '3x - 2' },
                { id: 'half_plus_3', label: 'x : 2 + 3' }
              ].map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRuleId(r.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedRuleId === r.id
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Számgép Grafikus Ábra */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-800/60 shadow-inner mb-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-2">
              {/* Bemenet doboz */}
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wider">
                  Bemenet (x)
                </span>
                <div className="w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-950 border-2 border-blue-400 flex items-center justify-center text-2xl font-black text-blue-900 dark:text-blue-100 shadow-sm">
                  {machineInput}
                </div>
              </div>

              {/* Nyíl be a gépbe */}
              <div className="text-slate-400 font-black text-xl hidden md:block">&rarr;</div>

              {/* Számgép blokk */}
              <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl text-white shadow-md text-center max-w-xs">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wide opacity-90 mb-1">
                  <Cpu className="w-4 h-4" />
                  Számgép
                </div>
                <div className="text-lg font-black font-mono">
                  {activeRule.name}
                </div>
                <div className="text-[11px] opacity-90 mt-1">
                  {activeRule.verbal}
                </div>
              </div>

              {/* Nyíl ki a gépből */}
              <div className="text-slate-400 font-black text-xl hidden md:block">&rarr;</div>

              {/* Kimenet doboz */}
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-1 uppercase tracking-wider">
                  Kimenet (y)
                </span>
                <div className="w-16 h-16 rounded-xl bg-emerald-100 dark:bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center text-2xl font-black text-emerald-900 dark:text-emerald-100 shadow-sm animate-pulse">
                  {machineOutput}
                </div>
              </div>
            </div>

            {/* Bemenet csúszka */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 max-w-md mx-auto">
              <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                <span>Változtasd a bemeneti számot:</span>
                <span className="text-blue-600 font-bold">{machineInput}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={machineInput}
                onChange={(e) => setMachineInput(parseInt(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Generált Táblázat a szabályhoz */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-800 shadow-sm">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
              <Table className="w-4 h-4 text-amber-600" />
              Értéktáblázat a kiválasztott szabályhoz:
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 font-bold">
                    <th className="p-2 border-r border-slate-200 dark:border-slate-700">x (bemenet)</th>
                    {[1, 2, 3, 4, 5, 6, 8, 10].map(val => (
                      <th key={val} className={`p-2 ${val === machineInput ? 'bg-amber-100 dark:bg-amber-950/60 font-black' : ''}`}>
                        {val}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-slate-800 dark:text-white font-bold">
                    <td className="p-2 bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                      y (kimenet)
                    </td>
                    {[1, 2, 3, 4, 5, 6, 8, 10].map(val => (
                      <td key={val} className={`p-2 font-mono ${val === machineInput ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-black' : ''}`}>
                        {activeRule.compute(val)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: INVERZ MŰVELETEK (VISSZAFELÉ GONDOLKODÁS) */}
      <TheorySection
        id="visszafele-szamolas"
        title="2. A Számgép Fordított Működése: Visszafelé Számolás"
        subtitle="Hogyan deríthetjük ki a bemenetet, ha csak a gép kimenetét ismerjük?"
        badge="INVERZ MŰVELETEK"
      >
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
          Ha tudjuk, hogy a gépből melyik szám esett ki, az eredeti bemenetet <strong>ellentétes műveletekkel, fordított sorrendben</strong> kapjuk meg:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Odafelé: Bemenet &rarr; Kimenet"
            badge="NORMÁL IRÁNY"
            color="amber"
            icon={<ArrowRight className="w-5 h-5 text-amber-600" />}
          >
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <div className="font-semibold text-amber-800 dark:text-amber-300">Példa szabály: $2 \cdot x + 3$</div>
              <div>1. A számot <strong>megszorozzuk 2-vel</strong>.</div>
              <div>2. A kapott eredményhez <strong>hozzáadunk 3-at</strong>.</div>
              <div className="pt-1 font-mono font-bold text-slate-900 dark:text-white">
                5 esetén: 5 · 2 = 10, majd 10 + 3 = 13.
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Visszafelé: Kimenet &rarr; Bemenet"
            badge="INVERZ IRÁNY"
            color="emerald"
            icon={<RefreshCw className="w-5 h-5 text-emerald-600" />}
          >
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <div className="font-semibold text-emerald-800 dark:text-emerald-300">Inverz műveletsor: $(y - 3) : 2$</div>
              <div>1. Először <strong>kivonunk 3-at</strong> a kimenetből.</div>
              <div>2. Majd a különbséget <strong>elosztjuk 2-vel</strong>.</div>
              <div className="pt-1 font-mono font-bold text-slate-900 dark:text-white">
                13 esetén: 13 - 3 = 10, majd 10 : 2 = 5!
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: GEOMETRIAI SOROZATOK ÉS GYUFASZÁLAK */}
      <TheorySection
        id="geometriai-sorozatok"
        title="3. Összefüggések Geometriai Alakzatokban: Gyufaszál-feladványok"
        subtitle="Hogyan írható le egy ábrasorozat darabszáma általános képlettel?"
        badge="ÁBRÁS SZABÁLYOK"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <TheoryCard
            title="Négyzetek Láncolata"
            badge="KÉPLET: 3n + 1"
            color="orange"
            icon={<Shapes className="w-5 h-5 text-orange-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Egyetlen négyzet kirakásához 4 gyufaszál kell. Ha egymáshoz ragasztva fűzünk újabb négyzeteket, a közös oldal miatt minden új négyzethez <strong>már csak 3 új szál kell</strong>!
            </p>
            <div className="p-2 bg-orange-50 dark:bg-orange-950/40 rounded text-xs font-mono text-orange-900 dark:text-orange-200">
              Szálak száma = 3 · n + 1 (ahol n a négyzetek száma)
            </div>
          </TheoryCard>

          <TheoryCard
            title="Háromszögek Láncolata"
            badge="KÉPLET: 2n + 1"
            color="teal"
            icon={<Shapes className="w-5 h-5 text-teal-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Egy háromszög 3 gyufából áll. Ha sorban újabb háromszögeket csatlakoztatunk közös oldallal, minden új háromszöghöz <strong>csak 2 új szál</strong> szükséges.
            </p>
            <div className="p-2 bg-teal-50 dark:bg-teal-950/40 rounded text-xs font-mono text-teal-900 dark:text-teal-200">
              Szálak száma = 2 · n + 1 (ahol n a háromszögek száma)
            </div>
          </TheoryCard>
        </div>

        {/* 2. INTERAKTÍV ESZKÖZ: GYUFASZÁL ÉPÍTŐ */}
        <div className="p-4 md:p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-orange-600 text-white">
                  Építőjáték
                </span>
                <h4 className="text-base font-bold text-slate-800 dark:text-white">
                  Gyufaszál Négyzetlánc Szimulátor
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Állítsd be a négyzetek számát, és nézd meg a gyufaszálak kirakási szabályát!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Négyzetek száma (n):</span>
              {[1, 2, 3, 4, 5].map(val => (
                <button
                  key={val}
                  onClick={() => setSquareCount(val)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                    squareCount === val
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG Gyufaszál lánc ábra */}
            <div className="lg:col-span-8 flex justify-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner overflow-x-auto">
              <svg viewBox={`0 0 ${squareCount * 50 + 20} 80`} className="h-24 select-none">
                {/* Első bal oldali függőleges gyufaszál */}
                <line x1="10" y1="15" x2="10" y2="65" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
                <circle cx="10" cy="15" r="3" fill="#dc2626" />

                {/* Négyzetenként 3 gyufa: felső vízszintes, jobb függőleges, alsó vízszintes */}
                {Array.from({ length: squareCount }).map((_, i) => {
                  const left = 10 + i * 50;
                  const right = left + 50;
                  return (
                    <g key={i}>
                      {/* Felső gyufaszál */}
                      <line x1={left} y1="15" x2={right} y2="15" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                      <circle cx={right} cy="15" r="3" fill="#dc2626" />

                      {/* Jobb oldali gyufaszál */}
                      <line x1={right} y1="15" x2={right} y2="65" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
                      <circle cx={right} cy="65" r="3" fill="#dc2626" />

                      {/* Alsó gyufaszál */}
                      <line x1={left} y1="65" x2={right} y2="65" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                      <circle cx={left} cy="65" r="3" fill="#dc2626" />

                      {/* Négyzet sorszám */}
                      <text x={left + 25} y="44" textAnchor="middle" className="text-[12px] font-black fill-slate-300">
                        {i + 1}.
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Számolási kártya */}
            <div className="lg:col-span-4 p-4 bg-orange-50 dark:bg-orange-950/40 rounded-xl border border-orange-200 dark:border-orange-800 text-center space-y-2">
              <div className="text-xs font-bold text-orange-800 dark:text-orange-300 uppercase tracking-wider">
                Gyufaszálak száma:
              </div>
              <div className="text-3xl font-black text-orange-900 dark:text-orange-100">
                {matchstickCount} db
              </div>
              <div className="text-xs text-orange-800 dark:text-orange-200 font-mono">
                3 · {squareCount} + 1 = {matchstickCount}
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                1 kezdő szál + {squareCount} × 3 új szál
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
