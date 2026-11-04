import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import {
  ParallelogramDissectionSvg,
  TrapezoidDissectionSvg,
  RhombusKiteAreaSvg
} from './AreaFigures';
import {
  Calculator,
  Layers,
  Sparkles,
  Maximize2,
  CheckCircle2,
  Compass
} from 'lucide-react';

interface AreaTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

export const AreaTheory: React.FC<AreaTheoryProps> = ({
  onBack,
  onStartQuiz,
  topicId = 'g9-trans-terulet',
  topicTitle = '7. Nevezetes négyszögek területe'
}) => {
  // Interaktív Labor State
  const [labShape, setLabShape] = useState<'parallelogram' | 'trapezoid' | 'rhombus' | 'kite'>('parallelogram');

  // Paraméterek a számoláshoz
  const [paramA, setParamA] = useState<number>(8); // alap vagy átló e
  const [paramB, setParamB] = useState<number>(5); // magasság m vagy átló f
  const [paramC, setParamC] = useState<number>(4); // trapéz felső alap c

  // Területszámítások a laborban
  let calculatedArea = 0;
  let formulaText = '';

  if (labShape === 'parallelogram') {
    calculatedArea = paramA * paramB;
    formulaText = `T = a · m = ${paramA} · ${paramB} = ${calculatedArea} cm²`;
  } else if (labShape === 'trapezoid') {
    calculatedArea = ((paramA + paramC) / 2) * paramB;
    formulaText = `T = ((a + c) / 2) · m = ((${paramA} + ${paramC}) / 2) · ${paramB} = ${calculatedArea} cm²`;
  } else if (labShape === 'rhombus' || labShape === 'kite') {
    calculatedArea = (paramA * paramB) / 2;
    formulaText = `T = (e · f) / 2 = (${paramA} · ${paramB}) / 2 = ${calculatedArea} cm²`;
  }

  return (
    <TheoryTemplate
      title="7. Nevezetes négyszögek területe"
      subtitle="Átdarabolási elv, téglalap, négyzet, paralelogramma, trapéz, rombusz és deltoid területe, valamint a Varignon-tétel"
      badge="9. Osztály • VI. Egybevágóság, négyszögek"
      topicBadge="9. OSZTÁLY • VI. EGYBEVÁGÓSÁG • 7. NÉGYSZÖGEK TERÜLETE"
      themeColor="emerald"
      topicId={topicId}
      topicTitle={topicTitle}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz a területképletek feladványaira?"
      practiceSubtitle="Tedd próbára tudásodat a 30 válogatott feladatból álló, 3 szintre bontott interaktív kvízben!"
      practiceButtonText="Kvíz indítása"
      quickRule={{
        label: "Aranyszabály: Területképletek mestertára",
        formula: "Trapéz: ((a+c)/2)·m | Rombusz, Deltoid: (e·f)/2 | Varignon-tétel: T_v = T/2",
        align: "center"
      }}
    >
      {/* 1. RÉSZ: Téglalap, Négyzet és Paralelogramma területe */}
      <TheorySection
        title="1. Téglalap, Négyzet és Paralelogramma Területe"
        badge="Átdarabolás Elve"
        icon={<Layers className="w-5 h-5 text-emerald-600" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A geometriában minden területmérés a <strong>téglalap területéből</strong> indul ki: az egységnégyzetek megszámlálásából. A többi négyszög területét erre vezetjük vissza <em>átdarabolással</em> (egybevágó részek áthelyezésével).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Téglalap és Négyzet
            </h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
              <li>
                <strong>Téglalap:</strong> <MathText>{"$T = a \\cdot b$"}</MathText> (szomszédos oldalak szorzata).
              </li>
              <li>
                <strong>Négyzet:</strong> <MathText>{"$T = a^2$"}</MathText> vagy az átlóval <MathText>{"$T = \\frac{d^2}{2}$"}</MathText> (mivel a négyzet átlója <MathText>{"$d = a\\sqrt{2}$"}</MathText>, és átlói merőlegesek).
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <h4 className="font-semibold text-emerald-900 dark:text-emerald-200 mb-2">
              Paralelogramma Területe
            </h4>
            <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed mb-2">
              Bármely paralelogramma átdarabolható azonos alapú és magasságú téglalappá: a levágott derékszögű háromszöget párhuzamosan a másik oldalra tolva a terület nem változik!
            </p>
            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg text-center font-mono font-bold text-emerald-900 dark:text-emerald-100 text-sm border border-emerald-300 dark:border-emerald-700">
              T = a · m_a = b · m_b
            </div>
          </div>
        </div>

        <div className="flex justify-center my-6">
          <ParallelogramDissectionSvg size={440} />
        </div>
      </TheorySection>

      {/* 2. RÉSZ: Trapéz Területe és a Középvonal */}
      <TheorySection
        title="2. Trapéz Területe és a Középvonal Szerepe"
        badge="Trapéz Képlet"
        icon={<Maximize2 className="w-5 h-5 text-blue-600" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Ha egy trapézt megkettőzünk és a másolatát 180°-kal elforgatva hozzáillesztjük, egy olyan nagy paralelogrammát kapunk, amelynek alapja az eredeti alapok összege ($a + c$), magassága pedig megegyezik a trapéz magasságával ($m$).
        </p>

        <div className="flex justify-center my-6">
          <TrapezoidDissectionSvg size={440} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-2">
              A Trapéz Területképlete
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed mb-2">
              Mivel a nagy paralelogramma területe két egybevágó trapéz területével egyenlő:
            </p>
            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg text-center font-mono font-bold text-blue-950 dark:text-blue-100 text-sm border border-blue-200 dark:border-blue-800 mb-2">
              <MathText>{"$T = \\frac{a + c}{2} \\cdot m = k \\cdot m$"}</MathText>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-400">
              Ahol <MathText>{"$k = \\frac{a + c}{2}$"}</MathText> a szárak felezőpontjait összekötő <strong>középpárhuzamos</strong> (középvonal) hossza.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-600" />
              Húrtrapéz Magassága Pitagorasz-tétellel
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              Húrtrapéznál a két magasságvonal az $a$ alapból levág két egyenlő hosszúságú darabot:
            </p>
            <div className="bg-white dark:bg-slate-900 p-2 rounded-lg text-center font-mono text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 mb-2">
              <MathText>{"$x = \\frac{a - c}{2} \\implies m = \\sqrt{b^2 - x^2}$"}</MathText>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              A derékszögű háromszög átfogója a $b$ szár, egyik befogója az $x$, a másik a keresett $m$ magasság!
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 3. RÉSZ: Merőleges Átlójú Négyszögek (Rombusz és Deltoid) */}
      <TheorySection
        title="3. Merőleges Átlójú Négyszögek: Rombusz és Deltoid"
        badge="Átlók Szorzata"
        icon={<Calculator className="w-5 h-5 text-purple-600" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Minden olyan négyszög területe, amelynek átlói <strong>merőlegesek egymásra</strong>, pontosan fele az átlók által kifeszített téglalap területének.
        </p>

        <div className="flex justify-center my-6">
          <RhombusKiteAreaSvg size={440} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
            <h4 className="font-bold text-purple-900 dark:text-purple-200 mb-2">
              Általános Képlet Merőleges Átlókra
            </h4>
            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg text-center font-mono font-bold text-purple-950 dark:text-purple-100 text-sm border border-purple-200 dark:border-purple-800 mb-2">
              <MathText>{"$T = \\frac{e \\cdot f}{2}$"}</MathText>
            </div>
            <p className="text-xs text-purple-800 dark:text-purple-300 leading-relaxed">
              Ez a képlet érvényes minden <strong>deltoidra</strong>, minden <strong>rombuszra</strong>, a <strong>négyzetre</strong>, sőt bármely konkáv vagy általános merőleges átlójú négyszögre is!
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">
              Rombusz Speciális Összefüggései
            </h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc list-inside">
              <li><MathText>{"$T = a \\cdot m$"}</MathText> (mint minden paralelogramma)</li>
              <li><MathText>{"$T = \\frac{e \\cdot f}{2}$"}</MathText> (az átlók merőlegessége miatt)</li>
              <li><strong>Pitagorasz-tétel a felezésből:</strong> <MathText>{"$(\\frac{e}{2})^2 + (\\frac{f}{2})^2 = a^2$"}</MathText></li>
              <li>Az átlók a rombuszt 4 egybevágó derékszögű háromszögre osztják.</li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 4. RÉSZ: Interaktív Labor (A tananyag végén!) */}
      <TheorySection
        title="4. Interaktív Labor: Négyszög Terület Műhely"
        badge="Interaktív Labor"
        icon={<Sparkles className="w-5 h-5 text-amber-500" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Válassz ki egy négyszögtípust, állítsd be a paramétereit a csúszkákkal, és figyeld meg a terület azonnali grafikus és numerikus kiszámítását!
        </p>

        {/* Négyszög választó fülek */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setLabShape('parallelogram')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              labShape === 'parallelogram' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-slate-800 border text-slate-700 dark:text-slate-300'
            }`}
          >
            Paralelogramma (a · m)
          </button>
          <button
            onClick={() => setLabShape('trapezoid')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              labShape === 'trapezoid' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 border text-slate-700 dark:text-slate-300'
            }`}
          >
            Trapéz (((a + c)/2) · m)
          </button>
          <button
            onClick={() => setLabShape('rhombus')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              labShape === 'rhombus' ? 'bg-purple-600 text-white' : 'bg-white dark:bg-slate-800 border text-slate-700 dark:text-slate-300'
            }`}
          >
            Rombusz ((e · f) / 2)
          </button>
          <button
            onClick={() => setLabShape('kite')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              labShape === 'kite' ? 'bg-amber-600 text-white' : 'bg-white dark:bg-slate-800 border text-slate-700 dark:text-slate-300'
            }`}
          >
            Deltoid ((e · f) / 2)
          </button>
        </div>

        {/* Labor Vászon és Csúszkák */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
          {/* Csúszkák */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>{labShape === 'rhombus' || labShape === 'kite' ? 'e átló hossza:' : 'a alap hossza:'}</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{paramA} cm</span>
              </div>
              <input
                type="range"
                min="4"
                max="16"
                value={paramA}
                onChange={(e) => setParamA(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>{labShape === 'rhombus' || labShape === 'kite' ? 'f átló hossza:' : 'm magasság:'}</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{paramB} cm</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                value={paramB}
                onChange={(e) => setParamB(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {labShape === 'trapezoid' && (
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>c felső alap hossza:</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{paramC} cm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  value={paramC}
                  onChange={(e) => setParamC(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            )}

            {/* Számítási eredmény doboz */}
            <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-2xs text-slate-400 font-bold uppercase tracking-wider block mb-1">
                Kiszámított Terület:
              </span>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {calculatedArea.toFixed(1)} cm²
              </p>
              <p className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-1">
                {formulaText}
              </p>
            </div>
          </div>

          {/* Dinamikus SVG illusztráció */}
          <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center">
            <svg viewBox="0 0 240 180" className="w-56 h-44 select-none">
              {labShape === 'parallelogram' && (
                <g transform="translate(20, 20)">
                  <polygon
                    points={`10,120 ${10 + paramA * 10},120 ${35 + paramA * 10},${120 - paramB * 8} 35,${120 - paramB * 8}`}
                    fill="#dcfce7"
                    stroke="#16a34a"
                    strokeWidth="2"
                  />
                  <line x1="35" y1="120" x2="35" y2={120 - paramB * 8} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
                  <text x="42" y={120 - (paramB * 8) / 2} fontSize="10" fontWeight="bold" fill="#dc2626">m={paramB}</text>
                  <text x={10 + (paramA * 10) / 2} y="135" fontSize="10" fontWeight="bold" fill="#15803d" textAnchor="middle">a={paramA}</text>
                </g>
              )}

              {labShape === 'trapezoid' && (
                <g transform="translate(20, 20)">
                  <polygon
                    points={`15,120 ${15 + paramA * 10},120 ${15 + paramA * 10 - 20},${120 - paramB * 8} ${15 + paramA * 10 - 20 - paramC * 10},${120 - paramB * 8}`}
                    fill="#dbeafe"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                  <line x1="45" y1="120" x2="45" y2={120 - paramB * 8} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
                  <text x="50" y={120 - (paramB * 8) / 2} fontSize="10" fontWeight="bold" fill="#dc2626">m={paramB}</text>
                  <text x={15 + (paramA * 10) / 2} y="135" fontSize="10" fontWeight="bold" fill="#1d4ed8" textAnchor="middle">a={paramA}</text>
                  <text x={15 + (paramA * 10) / 2} y={110 - paramB * 8} fontSize="10" fontWeight="bold" fill="#1d4ed8" textAnchor="middle">c={paramC}</text>
                </g>
              )}

              {(labShape === 'rhombus' || labShape === 'kite') && (
                <g transform="translate(30, 20)">
                  {/* Befoglaló doboz halványan */}
                  <rect x="0" y="0" width={paramA * 10} height={paramB * 10} fill="none" stroke="#e2e8f0" strokeDasharray="2 2" />
                  {/* Rombusz vagy Deltoid */}
                  <polygon
                    points={`${(paramA * 10) / 2},0 ${paramA * 10},${(paramB * 10) / 2} ${(paramA * 10) / 2},${paramB * 10} 0,${(paramB * 10) / 2}`}
                    fill="#f3e8ff"
                    stroke="#9333ea"
                    strokeWidth="2"
                  />
                  {/* Átlók */}
                  <line x1={(paramA * 10) / 2} y1="0" x2={(paramA * 10) / 2} y2={paramB * 10} stroke="#dc2626" strokeWidth="1.5" />
                  <line x1="0" y1={(paramB * 10) / 2} x2={paramA * 10} y2={(paramB * 10) / 2} stroke="#2563eb" strokeWidth="1.5" />
                  <text x={(paramA * 10) / 2 + 5} y="15" fontSize="10" fontWeight="bold" fill="#dc2626">f={paramB}</text>
                  <text x="15" y={(paramB * 10) / 2 - 5} fontSize="10" fontWeight="bold" fill="#2563eb">e={paramA}</text>
                </g>
              )}
            </svg>
            <span className="text-2xs text-slate-500 font-semibold mt-1">
              A grafika a csúszkák értékével arányosan változik
            </span>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

