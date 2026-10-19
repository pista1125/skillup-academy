import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  FormulaBox,
  ExampleBox
} from '../TheoryTemplate';
import {
  Brain,
  Sparkles,
  Grid,
  Triangle,
  Flower2,
  TrendingUp,
  HelpCircle,
  CheckCircle2,
  ListOrdered,
  Layers,
  ArrowRight
} from 'lucide-react';

export interface FamousSequencesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const FamousSequencesTheory: React.FC<FamousSequencesTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- 1. Interaktív Pöttyrács Állapot (Négyzetszám / Háromszögszám) ---
  const [shapeMode, setShapeMode] = useState<'square' | 'triangle'>('square');
  const [dotN, setDotN] = useState<number>(4);

  const squareVal = dotN * dotN;
  const triangleVal = (dotN * (dotN + 1)) / 2;

  // --- 2. Interaktív Fibonacci Lépés Állapot ---
  const [fibStep, setFibStep] = useState<number>(6); // 1-től 10-ig
  const fibSeries = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

  return (
    <TheoryTemplate
      documentId="grade-5-famous-sequences-theory"
      pdfFilename="5_osztaly_V_9_nevezetes_erdekes_sorozatok.pdf"
      title="Nevezetes, érdekes sorozatok"
      subtitle="Páros és páratlan számok, a négyzetszámok és háromszögszámok geometriai világa, a híres Fibonacci-sorozat és lenyűgöző természeti csodái"
      themeColor="rose"
      emoji="🌀"
      badge="5. OSZTÁLY • V. HELYMEGHATÁROZÁS, SOROZATOK • 9. TANANYAG"
      quickRule={{
        label: 'A 3 legfontosabb nevezetes sorozat',
        formula: '\\text{Négyzetszámok: } n^2 \\quad | \\quad \\text{Háromszögszámok: } \\frac{n(n+1)}{2} \\quad | \\quad \\text{Fibonacci: } F_n = F_{n-1} + F_{n-2}'
      }}
      practiceTitle="Készen állsz a híres sorozatok próbájára?"
      practiceSubtitle="Teszteld tudásodat a 30 kérdéses kvízben és az interaktív párosító-csoportosító játékokban!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: PÁROS ÉS PÁRATLAN SZÁMOK ÉS TITKUK */}
      <TheorySection
        id="paros-paratlan"
        title="1. Páros és Páratlan Számok és a Titkos Összefüggés"
        subtitle="A matematika két legalapvetőbb sorozata és meglepő kapcsolata a négyzetszámokkal"
        badge="ALAPOK ÉS TITKOK"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TheoryCard
            title="Páros számok sorozata"
            badge="KÉPLET: 2n"
            color="blue"
            icon={<ListOrdered className="w-5 h-5 text-blue-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A 2-vel maradék nélkül osztható egész számok. Minden lépésben 2-t adunk hozzá.
            </p>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded text-xs font-mono text-blue-900 dark:text-blue-200">
              2, 4, 6, 8, 10, 12, 14, 16, 18, 20... (2n)
            </div>
          </TheoryCard>

          <TheoryCard
            title="Páratlan számok sorozata"
            badge="KÉPLET: 2n - 1"
            color="rose"
            icon={<Sparkles className="w-5 h-5 text-rose-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A 2-vel osztva 1 maradékot adó számok. Szintén 2-es lépésközzel nőnek.
            </p>
            <div className="p-2 bg-rose-50 dark:bg-rose-950/40 rounded text-xs font-mono text-rose-900 dark:text-rose-200">
              1, 3, 5, 7, 9, 11, 13, 15, 17, 19... (2n - 1)
            </div>
          </TheoryCard>
        </div>

        {/* Érdekesség kártya: Páratlan számok összege */}
        <div className="p-4 bg-gradient-to-r from-amber-50 to-rose-50 dark:from-amber-950/30 dark:to-rose-950/30 rounded-2xl border border-rose-200 dark:border-rose-900 shadow-sm text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-rose-900 dark:text-rose-200">
            <Sparkles className="w-4 h-4 text-rose-600" />
            <span>Matematikai Varázslat: A páratlan számok összege mindig négyzetszám!</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-center pt-1">
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-rose-200 dark:border-rose-800">
              <span className="text-slate-500 block text-[10px]">1 szám:</span>
              <strong className="text-rose-600">1 = 1²</strong>
            </div>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-rose-200 dark:border-rose-800">
              <span className="text-slate-500 block text-[10px]">Első 2 szám:</span>
              <strong className="text-rose-600">1 + 3 = 4 = 2²</strong>
            </div>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-rose-200 dark:border-rose-800">
              <span className="text-slate-500 block text-[10px]">Első 3 szám:</span>
              <strong className="text-rose-600">1+3+5 = 9 = 3²</strong>
            </div>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-rose-200 dark:border-rose-800">
              <span className="text-slate-500 block text-[10px]">Első 4 szám:</span>
              <strong className="text-rose-600">1+3+5+7 = 16 = 4²</strong>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: NÉGYZETSZÁMOK ÉS HÁROMSZÖGSZÁMOK (ALAKZATSZÁMOK) */}
      <TheorySection
        id="alakzatszamok"
        title="2. Alakzatszámok: Négyzetszámok és Háromszögszámok"
        subtitle="Számok, amelyek geometriai formákban rendezhetők el pöttyökként"
        badge="GEOMETRIAI SZÁMOK"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <TheoryCard
            title="Négyzetszámok (n²)"
            badge="PÖTTY-NÉGYZETEK"
            color="purple"
            icon={<Grid className="w-5 h-5 text-purple-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Egy természetes szám önmagával való szorzata: $1, 4, 9, 16, 25, 36, 49, 64, 81, 100...$
            </p>
            <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded text-xs text-purple-900 dark:text-purple-200">
              Lépésközök a páratlan számok: +3, +5, +7, +9, +11...
            </div>
          </TheoryCard>

          <TheoryCard
            title="Háromszögszámok"
            badge="PÖTTY-HÁROMSZÖGEK"
            color="teal"
            icon={<Triangle className="w-5 h-5 text-teal-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Egymást követő természetes számok összege: $1, 3, 6, 10, 15, 21, 28, 36, 45, 55...$
            </p>
            <div className="p-2 bg-teal-50 dark:bg-teal-950/40 rounded text-xs text-teal-900 dark:text-teal-200">
              Példa: tekebábuk felállítása (1 + 2 + 3 + 4 = 10 db bábu = 4. háromszögszám).
            </div>
          </TheoryCard>
        </div>

        {/* 1. INTERAKTÍV ESZKÖZ: PÖTTYRÁCS SZEMLÉLTETŐ */}
        <div className="p-4 md:p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-rose-600 text-white">
                  Interaktív Alakzatok
                </span>
                <h4 className="text-base font-bold text-slate-800 dark:text-white">
                  Alakzatszám Pöttyrács Labor
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Válts a négyzetszám és a háromszögszám között, és figyeld meg a pöttyök elrendeződését!
              </p>
            </div>

            {/* Alakzat választó gombok */}
            <div className="flex gap-1.5">
              <button
                onClick={() => setShapeMode('square')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  shapeMode === 'square'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Négyzetszám (n²)
              </button>
              <button
                onClick={() => setShapeMode('triangle')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  shapeMode === 'triangle'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Háromszögszám
              </button>
            </div>
          </div>

          {/* n beállító gombok */}
          <div className="mb-4 flex items-center justify-between flex-wrap gap-2 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Sorszám (n):
            </span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5, 6].map(val => (
                <button
                  key={val}
                  onClick={() => setDotN(val)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    dotN === val
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Pöttyrács Megjelenítés */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 flex justify-center bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
              <svg viewBox="0 0 200 160" className="h-40 select-none">
                {shapeMode === 'square' ? (
                  // Négyzetes pöttyrács
                  Array.from({ length: dotN }).map((_, r) =>
                    Array.from({ length: dotN }).map((_, c) => {
                      const spacing = 140 / (dotN + 1);
                      const startX = 100 - ((dotN - 1) * spacing) / 2;
                      const startY = 80 - ((dotN - 1) * spacing) / 2;
                      return (
                        <circle
                          key={`${r}-${c}`}
                          cx={startX + c * spacing}
                          cy={startY + r * spacing}
                          r={dotN > 4 ? 6 : 8}
                          fill="#9333ea"
                          className="animate-pulse"
                        />
                      );
                    })
                  )
                ) : (
                  // Háromszöges pöttyrács
                  Array.from({ length: dotN }).map((_, r) =>
                    Array.from({ length: r + 1 }).map((_, c) => {
                      const rowCount = r + 1;
                      const spacingX = 22;
                      const spacingY = 22;
                      const startX = 100 - ((rowCount - 1) * spacingX) / 2;
                      const startY = 30 + r * spacingY;
                      return (
                        <circle
                          key={`${r}-${c}`}
                          cx={startX + c * spacingX}
                          cy={startY}
                          r={dotN > 4 ? 6 : 8}
                          fill="#0d9488"
                          className="animate-pulse"
                        />
                      );
                    })
                  )
                )}
              </svg>
            </div>

            {/* Számítási eredmény doboz */}
            <div className="md:col-span-4 p-4 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900 text-center space-y-2">
              <div className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider">
                {shapeMode === 'square' ? `${dotN}. Négyzetszám:` : `${dotN}. Háromszögszám:`}
              </div>
              <div className="text-3xl font-black text-rose-950 dark:text-rose-100">
                {shapeMode === 'square' ? squareVal : triangleVal}
              </div>
              <div className="text-xs text-rose-900 dark:text-rose-200 font-mono">
                {shapeMode === 'square'
                  ? `${dotN} · ${dotN} = ${squareVal}`
                  : Array.from({ length: dotN }, (_, i) => i + 1).join(' + ') + ` = ${triangleVal}`}
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: A FIBONACCI-SOROZAT ÉS A TERMÉSZET */}
      <TheorySection
        id="fibonacci"
        title="3. A Fibonacci-sorozat: A Természet Matematikai Kódja"
        subtitle="A leghíresebb rekurzív sorozat, amely a növényekben és állatokban is felbukkan"
        badge="A TERMÉSZET KÓDJA"
      >
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A Fibonacci-sorozatban az első két tag 1 és 1, majd <strong>minden további tag az előtte álló két tag összege</strong>:
        </p>

        {/* 2. INTERAKTÍV ESZKÖZ: FIBONACCI LÉPÉS-LEVEZETŐ */}
        <div className="p-4 md:p-6 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/30 rounded-2xl border-2 border-rose-300 dark:border-rose-800 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-rose-600 text-white">
                  Interaktív Levezető
                </span>
                <h4 className="text-base font-bold text-slate-800 dark:text-white">
                  Fibonacci Lépésszámláló
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Kattints a tagokra az összeadás lépésenkénti animálásához!
              </p>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {[3, 4, 5, 6, 7, 8].map(step => (
                <button
                  key={step}
                  onClick={() => setFibStep(step)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                    fibStep === step
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {step}.
                </button>
              ))}
            </div>
          </div>

          {/* Vizuális kártyák a Fibonacci összeadáshoz */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-800 shadow-inner">
            <div className="flex items-center justify-center gap-2 md:gap-4 py-3 flex-wrap">
              {/* Előző előtti tag */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 font-mono">F_{fibStep - 2}</span>
                <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center text-xl font-bold text-slate-700 dark:text-slate-200">
                  {fibSeries[fibStep - 3]}
                </div>
              </div>

              <span className="text-xl font-black text-rose-500">+</span>

              {/* Közvetlen előző tag */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 font-mono">F_{fibStep - 1}</span>
                <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center text-xl font-bold text-slate-700 dark:text-slate-200">
                  {fibSeries[fibStep - 2]}
                </div>
              </div>

              <span className="text-xl font-black text-rose-500">=</span>

              {/* Új Fibonacci tag */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-rose-600 font-mono font-bold">F_{fibStep} (új tag)</span>
                <div className="w-16 h-16 rounded-xl bg-rose-500 border-2 border-rose-600 flex items-center justify-center text-2xl font-black text-white shadow-md animate-bounce">
                  {fibSeries[fibStep - 1]}
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-slate-600 dark:text-slate-300 mt-2 font-mono">
              {fibSeries[fibStep - 3]} + {fibSeries[fibStep - 2]} = <strong>{fibSeries[fibStep - 1]}</strong>
            </div>
          </div>
        </div>

        {/* Megjelenés a természetben */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="Virágszirmok száma"
            badge="BOTANIKA"
            color="rose"
            icon={<Flower2 className="w-5 h-5 text-rose-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A legtöbb virág szirmainak száma Fibonacci-szám: liliom (3), boglárka (5), delphinium (8), körömvirág (13), őszirózsa (21).
            </p>
          </TheoryCard>

          <TheoryCard
            title="Napraforgó spiráljai"
            badge="MAGELRENDEZŐDÉS"
            color="amber"
            icon={<Sparkles className="w-5 h-5 text-amber-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A napraforgó tányérjában a magok óramutatóval egyező és ellentétes spirálokat alkotnak, száruk szinte mindig szomszédos Fibonacci-pár (pl. 34 és 55).
            </p>
          </TheoryCard>

          <TheoryCard
            title="Fenyőtoboz és Ananász"
            badge="SZERKEZET"
            color="emerald"
            icon={<Layers className="w-5 h-5 text-emerald-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A fenyőtoboz pikkelyei és az ananász héjának hatszögei szintén 5, 8, illetve 13 párhuzamos spirálba rendeződnek.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
