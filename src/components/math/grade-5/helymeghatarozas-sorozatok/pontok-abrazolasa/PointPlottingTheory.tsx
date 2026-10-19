import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  FormulaBox,
  ExampleBox
} from '../TheoryTemplate';
import {
  Target,
  Pencil,
  Eye,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Maximize2,
  ArrowRight,
  Shapes,
  Move,
  Lightbulb,
  Crosshair,
  Compass,
  Footprints
} from 'lucide-react';

export interface PointPlottingTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const PointPlottingTheory: React.FC<PointPlottingTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- 1. Interaktív Pontábrázoló Szimulátor Állapot ---
  const [targetPoint, setTargetPoint] = useState<{ x: number; y: number }>({ x: 3, y: 2 });
  const [currentStep, setCurrentStep] = useState<number>(3); // 0: origó, 1: x elmozdulás, 2: y elmozdulás, 3: pont kész

  // --- 2. Interaktív Alakzat Rajzoló Állapot ---
  type PresetShape = 'triangle' | 'rectangle' | 'house' | 'custom';
  const [activeShape, setActiveShape] = useState<PresetShape>('rectangle');
  const [customPoints, setCustomPoints] = useState<{ x: number; y: number; label: string }[]>([
    { x: -2, y: -1, label: 'A' },
    { x: 3, y: -1, label: 'B' },
    { x: 3, y: 3, label: 'C' },
    { x: -2, y: 3, label: 'D' }
  ]);

  const setShapePreset = (shape: PresetShape) => {
    setActiveShape(shape);
    if (shape === 'triangle') {
      setCustomPoints([
        { x: -3, y: -2, label: 'A' },
        { x: 3, y: -2, label: 'B' },
        { x: 0, y: 3, label: 'C' }
      ]);
    } else if (shape === 'rectangle') {
      setCustomPoints([
        { x: -2, y: -1, label: 'A' },
        { x: 3, y: -1, label: 'B' },
        { x: 3, y: 3, label: 'C' },
        { x: -2, y: 3, label: 'D' }
      ]);
    } else if (shape === 'house') {
      setCustomPoints([
        { x: -2, y: -3, label: 'A' },
        { x: 2, y: -3, label: 'B' },
        { x: 2, y: 1, label: 'C' },
        { x: 0, y: 4, label: 'D' },
        { x: -2, y: 1, label: 'E' }
      ]);
    }
  };

  return (
    <TheoryTemplate
      documentId="grade-5-point-plotting-theory"
      pdfFilename="5_osztaly_V_4_pontok_abrazolasa.pdf"
      title="Pontok ábrázolása a derékszögű koordináta-rendszerben"
      subtitle="Rendezett számpárok felvétele és leolvasása lépésről lépésre, tengelyekkel párhuzamos egyenesek, sokszögek csúcsainak ábrázolása és alakzatok rajzolása pontok összekötésével"
      themeColor="violet"
      emoji="📍"
      badge="5. OSZTÁLY • V. HELYMEGHATÁROZÁS, SOROZATOK • 4. TANANYAG"
      quickRule={{
        label: 'A pontábrázolás aranyszabálya',
        formula: 'P(x; y) \\quad \\Longrightarrow \\quad \\text{Origóból: } x \\text{ egység vízszintesen, majd } y \\text{ egység függőlegesen!}'
      }}
      practiceTitle="Készen állsz a pontábrázolás gyakorlására?"
      practiceSubtitle="Teszteld tudásodat a 30 kérdéses kvízben, a koordináták párosításában és a csoportosító kihívásban!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: A PONTFELVÉTEL LÉPÉSRŐL LÉPÉSRE */}
      <TheorySection
        id="pontfelvetel-lepesei"
        title="1. Pontok felvétele a koordináta-rendszerben"
        subtitle="Hogyan jelölünk ki egy pontot pontosan a megadott P(x; y) számpár alapján?"
        badge="LÉPÉSRŐL LÉPÉSRE"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="1. lépés: Az origó (0; 0)"
            badge="KIINDULÓPONT"
            color="amber"
            icon={<Target className="w-5 h-5 text-amber-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Minden pont felvételét <strong>mindig az origóból, azaz a (0; 0) pontból indítjuk</strong>, ceruzánk hegyét ide helyezzük.
            </p>
            <div className="mt-2 text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 p-2 rounded">
              Az origó a mérések „nulla” pontja.
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. lépés: Vízszintes lépés (x)"
            badge="ELSŐ KOORDINÁTA"
            color="blue"
            icon={<Move className="w-5 h-5 text-blue-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Az $x$ koordináta szerint elmozdulunk a vízszintes tengely mentén:
            </p>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 mt-2">
              <li>&bull; Ha <strong>pozitív</strong> (+): <strong>jobbra</strong> lépünk</li>
              <li>&bull; Ha <strong>negatív</strong> (-): <strong>balra</strong> lépünk</li>
              <li>&bull; Ha <strong>nulla</strong> (0): helyben maradunk</li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="3. lépés: Függőleges lépés (y)"
            badge="MÁSODIK KOORDINÁTA"
            color="emerald"
            icon={<ArrowRight className="w-5 h-5 text-emerald-600 rotate-[-90deg]" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A vízszintes megérkezési pontból rögtön függőlegesen indulunk tovább:
            </p>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 mt-2">
              <li>&bull; Ha <strong>pozitív</strong> (+): <strong>felfelé</strong> lépünk</li>
              <li>&bull; Ha <strong>negatív</strong> (-): <strong>lefelé</strong> lépünk</li>
              <li>&bull; Ha <strong>nulla</strong> (0): helyben maradunk</li>
            </ul>
          </TheoryCard>
        </div>

        {/* 1. INTERAKTÍV ESZKÖZ: LÉPÉSRŐL LÉPÉSRE PONTÁBRÁZOLÓ */}
        <div className="mt-6 p-4 md:p-6 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/30 rounded-2xl border-2 border-violet-300 dark:border-violet-800 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-violet-600 text-white">
                  Interaktív Szimulátor
                </span>
                <h4 className="text-base font-bold text-slate-800 dark:text-white">
                  Lépésről Lépésre Pontábrázoló
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Állítsd be a pont koordinátáit, és nézd meg az ábrázolás menetét lépésről lépésre!
              </p>
            </div>

            {/* Lépés vezérlő gombok */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Lépés:</span>
              {[
                { step: 0, label: 'Origó' },
                { step: 1, label: '1. x lépés' },
                { step: 2, label: '2. y lépés' },
                { step: 3, label: '3. Pont kész' }
              ].map(s => (
                <button
                  key={s.step}
                  onClick={() => setCurrentStep(s.step)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    currentStep === s.step
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-violet-400'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG Megjelenítő */}
            <div className="lg:col-span-7 flex justify-center bg-white dark:bg-slate-900 p-3 rounded-xl border border-violet-200 dark:border-violet-800/60 shadow-inner">
              <svg viewBox="-160 -140 320 280" className="w-full max-w-[340px] h-72 select-none">
                {/* Rács */}
                {[-120, -90, -60, -30, 30, 60, 90, 120].map((pos) => (
                  <g key={`g-${pos}`}>
                    <line x1={pos} y1={-120} x2={pos} y2={120} stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" />
                    <line x1={-140} y1={pos} x2={140} y2={pos} stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" />
                  </g>
                ))}

                {/* Tengelyek */}
                <line x1={-145} y1={0} x2={145} y2={0} stroke="#2563eb" strokeWidth="2" />
                <polygon points="145,0 137,-3 137,3" fill="#2563eb" />
                <text x="146" y="3" className="text-[10px] font-bold fill-blue-600" dominantBaseline="middle">x</text>

                <line x1={0} y1={125} x2={0} y2={-125} stroke="#059669" strokeWidth="2" />
                <polygon points="0,-125 -3,-117 3,-117" fill="#059669" />
                <text x="-1" y="-130" className="text-[10px] font-bold fill-emerald-600" textAnchor="middle">y</text>

                {/* Beosztások */}
                {[-4, -3, -2, -1, 1, 2, 3, 4].map((num) => (
                  <g key={`xnum-${num}`}>
                    <line x1={num * 30} y1={-3} x2={num * 30} y2={3} stroke="#2563eb" strokeWidth="1.5" />
                    <text x={num * 30} y={14} textAnchor="middle" className="text-[9px] fill-slate-500 font-semibold">{num}</text>
                  </g>
                ))}
                {[-3, -2, -1, 1, 2, 3].map((num) => (
                  <g key={`ynum-${num}`}>
                    <line x1={-3} y1={-num * 30} x2={3} y2={-num * 30} stroke="#059669" strokeWidth="1.5" />
                    <text x={-9} y={-num * 30 + 3} textAnchor="end" className="text-[9px] fill-slate-500 font-semibold">{num}</text>
                  </g>
                ))}

                {/* 0. LÉPÉS: Origó jelölése */}
                <circle cx={0} cy={0} r={4.5} fill="#f59e0b" />
                <text x={8} y={-8} className="text-[9px] font-black fill-amber-600">O(0; 0)</text>

                {/* 1. LÉPÉS: Vízszintes elmozdulás nyil */}
                {currentStep >= 1 && (
                  <g>
                    <line
                      x1={0}
                      y1={0}
                      x2={targetPoint.x * 30}
                      y2={0}
                      stroke="#2563eb"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle cx={targetPoint.x * 30} cy={0} r={3.5} fill="#2563eb" />
                    <text
                      x={(targetPoint.x * 30) / 2}
                      y={targetPoint.x >= 0 ? -8 : 16}
                      textAnchor="middle"
                      className="text-[10px] font-black fill-blue-700"
                    >
                      {targetPoint.x > 0 ? `+${targetPoint.x} jobbra` : `${targetPoint.x} balra`}
                    </text>
                  </g>
                )}

                {/* 2. LÉPÉS: Függőleges elmozdulás nyil */}
                {currentStep >= 2 && (
                  <g>
                    <line
                      x1={targetPoint.x * 30}
                      y1={0}
                      x2={targetPoint.x * 30}
                      y2={-targetPoint.y * 30}
                      stroke="#059669"
                      strokeWidth="3"
                      strokeDasharray="4 2"
                    />
                    <text
                      x={targetPoint.x * 30 + (targetPoint.x >= 0 ? 8 : -8)}
                      y={(-targetPoint.y * 30) / 2}
                      textAnchor={targetPoint.x >= 0 ? 'start' : 'end'}
                      className="text-[10px] font-black fill-emerald-700"
                    >
                      {targetPoint.y > 0 ? `+${targetPoint.y} fel` : `${targetPoint.y} le`}
                    </text>
                  </g>
                )}

                {/* 3. LÉPÉS: Pont kirajzolása */}
                {currentStep >= 3 && (
                  <g>
                    <circle
                      cx={targetPoint.x * 30}
                      cy={-targetPoint.y * 30}
                      r={6}
                      fill="#7c3aed"
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="animate-bounce"
                    />
                    <text
                      x={targetPoint.x * 30 + (targetPoint.x >= 0 ? 10 : -10)}
                      y={-targetPoint.y * 30 - 10}
                      textAnchor={targetPoint.x >= 0 ? 'start' : 'end'}
                      className="text-xs font-black fill-violet-700 dark:fill-violet-300"
                    >
                      P({targetPoint.x}; {targetPoint.y})
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Interaktív Pont Beállító Panel */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-violet-200 dark:border-violet-800 shadow-sm space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Célpont kiválasztása
                </div>
                <div className="text-2xl font-black text-violet-700 dark:text-violet-300">
                  P({targetPoint.x}; {targetPoint.y})
                </div>

                {/* Előre definiált érdekes mintapontok */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {[
                    { x: 3, y: 2, label: 'I. negyed (3; 2)' },
                    { x: -3, y: 3, label: 'II. negyed (-3; 3)' },
                    { x: -2, y: -3, label: 'III. negyed (-2; -3)' },
                    { x: 4, y: -2, label: 'IV. negyed (4; -2)' },
                    { x: 4, y: 0, label: 'x-tengelyen (4; 0)' },
                    { x: 0, y: -3, label: 'y-tengelyen (0; -3)' }
                  ].map((pt) => (
                    <button
                      key={`${pt.x}-${pt.y}`}
                      onClick={() => {
                        setTargetPoint({ x: pt.x, y: pt.y });
                        setCurrentStep(3);
                      }}
                      className={`px-2 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors border ${
                        targetPoint.x === pt.x && targetPoint.y === pt.y
                          ? 'bg-violet-100 dark:bg-violet-900/60 text-violet-900 dark:text-violet-200 border-violet-400'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-violet-300'
                      }`}
                    >
                      {pt.label}
                    </button>
                  ))}
                </div>

                <div className="p-3 bg-violet-50 dark:bg-violet-950/40 rounded-lg border border-violet-200 dark:border-violet-800 text-xs text-violet-900 dark:text-violet-200">
                  <div className="font-bold mb-1">
                    {currentStep === 0 && '📍 Kezdés: Állj az origóra: O(0; 0)!'}
                    {currentStep === 1 && `➡️ 1. lépés: Lépj az x-tengelyen ${targetPoint.x} egységet (${targetPoint.x >= 0 ? 'jobbra' : 'balra'})!`}
                    {currentStep === 2 && `⬆️ 2. lépés: Innen fordulj és lépj ${targetPoint.y} egységet (${targetPoint.y >= 0 ? 'felfelé' : 'lefelé'})!`}
                    {currentStep === 3 && `🎯 3. lépés: Megérkeztél a P(${targetPoint.x}; ${targetPoint.y}) pontba! Jelöld meg egy ponttal és betűvel!`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: TENGELYEKKEL PÁRHUZAMOS EGYENESEK PONTJAI */}
      <TheorySection
        id="tengelyekkel-parhuzamos-egyenesek"
        title="2. Tengelyekkel párhuzamos egyenesek pontjai"
        subtitle="Milyen közös tulajdonságuk van a vízszintes és függőleges egyeneseken fekvő pontoknak?"
        badge="ÖSSZEFÜGGÉSEK"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Vízszintes egyenesek (y = állandó)"
            badge="y KOORDINÁTA AZONOS"
            color="indigo"
            icon={<Move className="w-5 h-5 text-indigo-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Ha egy egyenes párhuzamos a vízszintes $x$-tengellyel, akkor rajta minden pont ugyanolyan magasan helyezkedik el:
            </p>
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-200 dark:border-indigo-800 text-xs font-mono font-bold text-indigo-900 dark:text-indigo-200 text-center">
              A második koordinátájuk (y) egyenlő!
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              Példa: az $A(-3; 2)$, $B(0; 2)$, $C(4; 2)$ pontok mind egy vízszintes egyenesre illeszkednek, ahol $y = 2$.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Függőleges egyenesek (x = állandó)"
            badge="x KOORDINÁTA AZONOS"
            color="emerald"
            icon={<ArrowRight className="w-5 h-5 text-emerald-600 rotate-[-90deg]" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Ha egy egyenes párhuzamos a függőleges $y$-tengellyel, akkor rajta minden pont ugyanakkora vízszintes távolságra van az origótól:
            </p>
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs font-mono font-bold text-emerald-900 dark:text-emerald-200 text-center">
              Az első koordinátájuk (x) egyenlő!
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              Példa: az $A(3; -2)$, $B(3; 0)$, $C(3; 4)$ pontok mind egy függőleges egyenesre illeszkednek, ahol $x = 3$.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: ALAKZATOK ÉS SOKSZÖGEK RAJZOLÁSA PONTOKKAL */}
      <TheorySection
        id="alakzatok-pontokkal"
        title="3. Alakzatok és sokszögek ábrázolása pontok összekötésével"
        subtitle="Hogyan adhatunk meg síkidomokat és rajzokat a csúcspontjaik koordinátáival?"
        badge="GEOMETRIAI ALAKZATOK"
      >
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A derékszögű koordináta-rendszerben a síkidomokat a <strong>csúcspontjaik rendezett számpárjaival</strong> határozzuk meg. Ha a pontokat egymás után egyenes szakaszokkal összekötjük, sokszögeket, ábrákat kapunk!
        </p>

        {/* 2. INTERAKTÍV ESZKÖZ: SOKSZÖG ÉPÍTŐ ÉS VIZSGÁLÓ */}
        <div className="p-4 md:p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-indigo-600 text-white">
                  Interaktív Alakzatépítő
                </span>
                <h4 className="text-base font-bold text-slate-800 dark:text-white">
                  Geometriai Formák Pontokból
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Válassz egy alakzatot, és figyeld meg a csúcspontok koordinátáit és az oldalhosszakat!
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShapePreset('rectangle')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeShape === 'rectangle'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Téglalap
              </button>
              <button
                onClick={() => setShapePreset('triangle')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeShape === 'triangle'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Háromszög
              </button>
              <button
                onClick={() => setShapePreset('house')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeShape === 'house'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Házikó ábra
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG Alakzat megjelenítő */}
            <div className="lg:col-span-7 flex justify-center bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
              <svg viewBox="-160 -150 320 300" className="w-full max-w-[340px] h-72 select-none">
                {/* Rácsháló */}
                {[-120, -90, -60, -30, 30, 60, 90, 120].map((pos) => (
                  <g key={`grid-s-${pos}`}>
                    <line x1={pos} y1={-130} x2={pos} y2={130} stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" />
                    <line x1={-140} y1={pos} x2={140} y2={pos} stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" />
                  </g>
                ))}

                {/* Tengelyek */}
                <line x1={-145} y1={0} x2={145} y2={0} stroke="#94a3b8" strokeWidth="1.5" />
                <line x1={0} y1={135} x2={0} y2={-135} stroke="#94a3b8" strokeWidth="1.5" />
                <circle cx={0} cy={0} r={3} fill="#f59e0b" />

                {/* Sokszög kitöltése és vonalai */}
                <polygon
                  points={customPoints.map(p => `${p.x * 30},${-p.y * 30}`).join(' ')}
                  fill="#8b5cf6"
                  fillOpacity="0.2"
                  stroke="#7c3aed"
                  strokeWidth="2.5"
                />

                {/* Csúcspontok és felirataik */}
                {customPoints.map((pt) => (
                  <g key={pt.label}>
                    <circle
                      cx={pt.x * 30}
                      cy={-pt.y * 30}
                      r={5}
                      fill="#7c3aed"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <text
                      x={pt.x * 30 + (pt.x >= 0 ? 8 : -8)}
                      y={-pt.y * 30 - 8}
                      textAnchor={pt.x >= 0 ? 'start' : 'end'}
                      className="text-xs font-black fill-violet-700 dark:fill-violet-300"
                    >
                      {pt.label}({pt.x}; {pt.y})
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Alakzat részletes adatai */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-sm text-slate-800 dark:text-white">
                  Csúcspontok listája:
                </div>
                <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {customPoints.map((p) => (
                    <div key={p.label} className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="font-bold text-violet-600 dark:text-violet-400">{p.label} csúcs:</span>
                      <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-semibold">
                        ({p.x}; {p.y})
                      </span>
                    </div>
                  ))}
                </div>

                {activeShape === 'rectangle' && (
                  <div className="mt-3 p-2.5 bg-violet-50 dark:bg-violet-950/40 rounded-lg text-xs text-violet-900 dark:text-violet-200 space-y-1">
                    <div><strong>Vízszintes oldal hossza (AB):</strong> 3 - (-2) = 5 egység</div>
                    <div><strong>Függőleges oldal hossza (BC):</strong> 3 - (-1) = 4 egység</div>
                    <div><strong>Terület:</strong> 5 · 4 = 20 területegység</div>
                  </div>
                )}

                {activeShape === 'triangle' && (
                  <div className="mt-3 p-2.5 bg-violet-50 dark:bg-violet-950/40 rounded-lg text-xs text-violet-900 dark:text-violet-200 space-y-1">
                    <div><strong>Alap hossza (AB):</strong> 3 - (-3) = 6 egység</div>
                    <div><strong>Magasság:</strong> 3 - (-2) = 5 egység</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
