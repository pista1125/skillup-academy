import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  GeometryFigureGrid,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Box,
  Maximize2,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Check,
  X,
  Target,
  Sparkles,
  Calculator,
  Ruler,
  HelpCircle,
  Shapes,
  Grid
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface PrismSurfaceVolumeTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const PrismSurfaceVolumeTheory: React.FC<PrismSurfaceVolumeTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Simulator state
  const [prismType, setPrismType] = useState<'cuboid' | 'cube' | 'triangular'>('cuboid');
  const [dimA, setDimA] = useState<number>(6); // cm
  const [dimB, setDimB] = useState<number>(4); // cm
  const [heightM, setHeightM] = useState<number>(7); // cm
  const [viewMode, setViewMode] = useState<'3d' | 'net'>('3d');

  // Calculations depending on type
  let baseArea = 0;
  let basePerimeter = 0;
  let hypotenuseC = 0;

  if (prismType === 'cube') {
    const s = dimA;
    baseArea = s * s;
    basePerimeter = 4 * s;
  } else if (prismType === 'cuboid') {
    baseArea = dimA * dimB;
    basePerimeter = 2 * (dimA + dimB);
  } else if (prismType === 'triangular') {
    // Derékszögű háromszög alap (a és b befogók)
    baseArea = (dimA * dimB) / 2;
    hypotenuseC = Math.round(Math.sqrt(dimA * dimA + dimB * dimB) * 10) / 10;
    basePerimeter = Math.round((dimA + dimB + hypotenuseC) * 10) / 10;
  }

  const effectiveM = prismType === 'cube' ? dimA : heightM;
  const lateralArea = Math.round(basePerimeter * effectiveM * 10) / 10;
  const surfaceArea = Math.round((2 * baseArea + lateralArea) * 10) / 10;
  const volume = Math.round(baseArea * effectiveM * 10) / 10;

  // Mini self-test states
  const [quiz1Answer, setQuiz1Answer] = useState<number | null>(null);
  const [quiz2Answer, setQuiz2Answer] = useState<number | null>(null);
  const [quiz3Answer, setQuiz3Answer] = useState<number | null>(null);

  return (
    <TheoryTemplate
      title="A hasáb felszíne és térfogata"
      subtitle="Fedezd fel az egyenes hasábok térbeli szerkezetét, a kiterített palást hálóját, a felszín (A) és a térfogat (V) összefüggéseit!"
      badge="7. OSZTÁLY • TÉRGEOMETRIA"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      themeColor="amber"
      quickRule={{
        label: 'Fontos szabály',
        formula: 'A = 2 \\cdot T_a + T_p = 2 \\cdot T_a + K_a \\cdot M \\quad • \\quad V = T_a \\cdot M',
        explanation: (
          <span>
            Bármely egyenes hasáb <strong>felszíne</strong> a két alaplap és a palást területének összege{' '}
            (<MathText>A = 2 \cdot T_a + T_p</MathText>), ahol a palást egy <MathText>K_a \cdot M</MathText> méretű téglalap.
            A <strong>térfogata</strong> pedig az alapterület és a testmagasság szorzata (<MathText>V = T_a \cdot M</MathText>).
          </span>
        )
      }}
    >
      {/* 1. SZAKASZ: Mi az egyenes hasáb? */}
      <TheorySection
        title="1. Mi az egyenes hasáb?"
        subtitle="Alaplapok, palást, testmagasság és élhálózat"
        icon={<Box className="w-5 h-5 text-amber-500" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <TheoryCard
            title="Párhuzamos alaplapok"
            icon={<Layers className="w-4 h-4 text-amber-600" />}
            variant="accent"
          >
            <p className="text-slate-700 dark:text-slate-300">
              A hasáb alsó és felső lapja két <strong>egybevágó és párhuzamos síkban fekvő</strong> sokszög
              (háromszög, téglalap, négyzet, trapéz stb.).
            </p>
            <div className="mt-2 text-xs font-semibold text-amber-700 dark:text-amber-300">
              Alapterület: <MathText>T_a</MathText>, Alapkerület: <MathText>K_a</MathText>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Téglalapokból álló palást"
            icon={<Shapes className="w-4 h-4 text-orange-600" />}
          >
            <p className="text-slate-700 dark:text-slate-300">
              Az oldallapok az alaplap síkjára <strong>merőleges téglalapok</strong>. Ezek összessége alkotja
              a hasáb palástját (<MathText>T_p</MathText>).
            </p>
            <div className="mt-2 text-xs font-semibold text-orange-700 dark:text-orange-300">
              Kiterítve egyetlen nagy téglalap: <MathText>T_p = K_a \cdot M</MathText>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Testmagasság (M)"
            icon={<Ruler className="w-4 h-4 text-emerald-600" />}
          >
            <p className="text-slate-700 dark:text-slate-300">
              A testmagasság (<MathText>M</MathText>) a két alaplap síkja közötti <strong>merőleges távolság</strong>.
              Egyenes hasábnál ez pontosan megegyezik az oldalélek hosszával.
            </p>
            <div className="mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              Oldalél hossza = Testmagasság (<MathText>M</MathText>)
            </div>
          </TheoryCard>
        </div>

        {/* Összehasonlító geometriai ábrák */}
        <GeometryFigureGrid columns={3}>
          <GeometryFigureCard
            title="Téglatest (Négyszög alapú)"
            badge="Téglalap alap"
            badgeColor="amber"
            formula="V = a · b · c"
            figure={
              <svg viewBox="0 0 160 120" className="w-full h-32 overflow-visible">
                {/* 3D Wireframe of Cuboid */}
                {/* Hidden back edges */}
                <line x1="45" y1="42" x2="115" y2="42" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="45" y1="42" x2="45" y2="98" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="45" y1="42" x2="20" y2="65" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Bottom Base (faint) */}
                <polygon points="20,118 90,118 115,98 45,98" fill="#fef3c7" fillOpacity="0.4" stroke="#d97706" strokeWidth="1.5" />

                {/* Top Base */}
                <polygon points="20,65 90,65 115,42 45,42" fill="#fef3c7" fillOpacity="0.85" stroke="#d97706" strokeWidth="2" strokeLinejoin="round" />

                {/* Front Face */}
                <polygon points="20,65 90,65 90,118 20,118" fill="#fef9c3" fillOpacity="0.4" stroke="#b45309" strokeWidth="2" strokeLinejoin="round" />

                {/* Right Face */}
                <polygon points="90,65 115,42 115,98 90,118" fill="#fed7aa" fillOpacity="0.5" stroke="#c2410c" strokeWidth="2" strokeLinejoin="round" />

                {/* Outer front/right edges */}
                <line x1="20" y1="65" x2="20" y2="118" stroke="#b45309" strokeWidth="2" />
                <line x1="90" y1="65" x2="90" y2="118" stroke="#b45309" strokeWidth="2" />
                <line x1="115" y1="42" x2="115" y2="98" stroke="#c2410c" strokeWidth="2" />

                <text x="55" y="114" textAnchor="middle" className="text-[10px] font-bold fill-slate-800 dark:fill-slate-200">a</text>
                <text x="107" y="112" textAnchor="middle" className="text-[10px] font-bold fill-slate-800 dark:fill-slate-200">b</text>
                <text x="14" y="92" textAnchor="end" className="text-[10px] font-bold fill-amber-700 dark:fill-amber-400">c (M)</text>
              </svg>
            }
          >
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Minden lapja téglalap. Szemközti lapjai párhuzamosak és egybevágók.
            </p>
          </GeometryFigureCard>

          <GeometryFigureCard
            title="Háromoldalú hasáb"
            badge="Háromszög alap"
            badgeColor="indigo"
            formula="V = Ta · M"
            figure={
              <svg viewBox="0 0 160 120" className="w-full h-32 overflow-visible">
                {/* Triangular prism wireframe */}
                {/* Hidden back edge */}
                <line x1="50" y1="38" x2="50" y2="96" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="25" y1="116" x2="50" y2="96" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="125" y1="116" x2="50" y2="96" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Bottom Triangle */}
                <polygon points="25,116 125,116 50,96" fill="#e0e7ff" fillOpacity="0.3" stroke="#4f46e5" strokeWidth="1.5" />

                {/* Top Triangle */}
                <polygon points="25,58 125,58 50,38" fill="#e0e7ff" fillOpacity="0.85" stroke="#4f46e5" strokeWidth="2" strokeLinejoin="round" />

                {/* Front Rectangle */}
                <polygon points="25,58 125,58 125,116 25,116" fill="#ede9fe" fillOpacity="0.45" stroke="#4338ca" strokeWidth="2" strokeLinejoin="round" />

                {/* Vertical edges */}
                <line x1="25" y1="58" x2="25" y2="116" stroke="#4338ca" strokeWidth="2" />
                <line x1="125" y1="58" x2="125" y2="116" stroke="#4338ca" strokeWidth="2" />

                <text x="75" y="112" textAnchor="middle" className="text-[10px] font-bold fill-slate-800 dark:fill-slate-200">a</text>
                <text x="133" y="88" textAnchor="start" className="text-[10px] font-bold fill-indigo-700 dark:fill-indigo-400">M</text>
                <text x="70" y="50" textAnchor="middle" className="text-[9px] font-black fill-indigo-900 dark:fill-indigo-300">Ta</text>
              </svg>
            }
          >
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Alaplapja háromszög, palástja 3 téglalapból áll.
            </p>
          </GeometryFigureCard>

          <GeometryFigureCard
            title="Kocka (Minden él egyenlő)"
            badge="Négyzet alapok"
            badgeColor="emerald"
            formula="A = 6a², V = a³"
            figure={
              <svg viewBox="0 0 160 120" className="w-full h-32 overflow-visible">
                {/* Cube Wireframe */}
                {/* Hidden back edges */}
                <line x1="50" y1="38" x2="110" y2="38" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="50" y1="38" x2="50" y2="98" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="50" y1="38" x2="22" y2="60" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Bottom Base */}
                <polygon points="22,118 82,118 110,98 50,98" fill="#dcfce7" fillOpacity="0.4" stroke="#16a34a" strokeWidth="1.5" />

                {/* Top Base */}
                <polygon points="22,60 82,60 110,38 50,38" fill="#dcfce7" fillOpacity="0.85" stroke="#16a34a" strokeWidth="2" strokeLinejoin="round" />

                {/* Front Face */}
                <polygon points="22,60 82,60 82,118 22,118" fill="#f0fdf4" fillOpacity="0.4" stroke="#15803d" strokeWidth="2" strokeLinejoin="round" />

                {/* Right Face */}
                <polygon points="82,60 110,38 110,98 82,118" fill="#bbf7d0" fillOpacity="0.5" stroke="#15803d" strokeWidth="2" strokeLinejoin="round" />

                {/* Labels */}
                <text x="52" y="114" textAnchor="middle" className="text-[10px] font-bold fill-slate-800 dark:fill-slate-200">a</text>
                <text x="16" y="90" textAnchor="end" className="text-[10px] font-bold fill-emerald-700 dark:fill-emerald-400">a</text>
                <text x="100" y="112" textAnchor="middle" className="text-[10px] font-bold fill-slate-800 dark:fill-slate-200">a</text>
              </svg>
            }
          >
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Szabályos hasáb: 6 egybevágó négyzetlap határolja, 12 egyenlő éle van.
            </p>
          </GeometryFigureCard>
        </GeometryFigureGrid>
      </TheorySection>

      {/* 2. SZAKASZ: Interaktív 3D Hasáb és Kiterített Háló Szimulátor */}
      <TheorySection
        title="2. Interaktív Hasáb és Háló Laboratórium"
        subtitle="Kísérletezz a méretekkel, és figyeld a palást kiterítését!"
        icon={<Calculator className="w-5 h-5 text-amber-500" />}
      >
        <div className="bg-gradient-to-br from-amber-50/70 via-white to-orange-50/70 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-amber-200 dark:border-amber-800/60 rounded-3xl p-5 sm:p-6 shadow-sm">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-amber-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Hasáb típusa:</span>
              <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                <button
                  type="button"
                  onClick={() => { setPrismType('cuboid'); setDimA(6); setDimB(4); setHeightM(7); }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    prismType === 'cuboid' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Téglatest
                </button>
                <button
                  type="button"
                  onClick={() => { setPrismType('cube'); setDimA(5); setDimB(5); setHeightM(5); }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    prismType === 'cube' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Kocka
                </button>
                <button
                  type="button"
                  onClick={() => { setPrismType('triangular'); setDimA(6); setDimB(8); setHeightM(7); }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    prismType === 'triangular' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Háromszög alapú
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Nézet:</span>
              <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === '3d' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  3D Test
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('net')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'net' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Kiterített Háló
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mt-5">
            {/* Visual Display */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-950 rounded-2xl border border-amber-100 dark:border-slate-800 shadow-inner min-h-[260px]">
              {viewMode === '3d' ? (
                <svg viewBox="0 0 240 180" className="w-full max-w-[260px] h-auto drop-shadow-md">
                  {/* Axonometric 3D View */}
                  {/* Hidden back lines */}
                  <line x1="60" y1="45" x2="160" y2="45" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="60" y1="45" x2="60" y2="135" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="60" y1="45" x2="25" y2="70" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Bottom Base */}
                  <polygon
                    points={prismType === 'triangular' ? "25,160 180,160 60,135" : "25,160 125,160 160,135 60,135"}
                    fill="#fef3c7"
                    fillOpacity="0.5"
                    stroke="#d97706"
                    strokeWidth="1.5"
                  />
                  {/* Top Base */}
                  <polygon
                    points={prismType === 'triangular' ? "25,70 180,70 60,45" : "25,70 125,70 160,45 60,45"}
                    fill="#fde68a"
                    stroke="#d97706"
                    strokeWidth="2"
                  />

                  {/* Front and side faces */}
                  {prismType === 'triangular' ? (
                    <>
                      <polygon points="25,70 180,70 180,160 25,160" fill="#fef08a" fillOpacity="0.4" stroke="#b45309" strokeWidth="2" />
                      <line x1="25" y1="70" x2="25" y2="160" stroke="#b45309" strokeWidth="2" />
                      <line x1="180" y1="70" x2="180" y2="160" stroke="#b45309" strokeWidth="2" />
                    </>
                  ) : (
                    <>
                      <polygon points="25,70 125,70 125,160 25,160" fill="#fef9c3" fillOpacity="0.35" stroke="#b45309" strokeWidth="2" />
                      <polygon points="125,70 160,45 160,135 125,160" fill="#fed7aa" fillOpacity="0.45" stroke="#c2410c" strokeWidth="2" />
                      <line x1="25" y1="70" x2="25" y2="160" stroke="#b45309" strokeWidth="2" />
                      <line x1="125" y1="70" x2="125" y2="160" stroke="#b45309" strokeWidth="2" />
                      <line x1="160" y1="45" x2="160" y2="135" stroke="#c2410c" strokeWidth="2" />
                    </>
                  )}

                  {/* Dimension Annotations */}
                  <text x="75" y="172" textAnchor="middle" className="text-[10px] font-black fill-slate-800">
                    a = {dimA} cm
                  </text>
                  {prismType !== 'cube' && prismType !== 'triangular' && (
                    <text x="155" y="152" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">
                      b = {dimB} cm
                    </text>
                  )}
                  {prismType === 'triangular' && (
                    <text x="110" y="148" textAnchor="middle" className="text-[9px] font-bold fill-indigo-700">
                      b = {dimB} cm
                    </text>
                  )}
                  <text x="18" y="115" textAnchor="end" className="text-[10px] font-black fill-amber-700">
                    M = {effectiveM} cm
                  </text>
                </svg>
              ) : (
                <svg viewBox="0 0 240 180" className="w-full max-w-[260px] h-auto drop-shadow-md">
                  {/* Unfolded Net View */}
                  {/* Unfolded Lateral Rectangle (Ka × M) */}
                  <rect x="30" y="55" width="180" height="70" fill="#fed7aa" fillOpacity="0.5" stroke="#ea580c" strokeWidth="2" />

                  {/* Lateral subdivisions */}
                  {prismType === 'cuboid' && (
                    <>
                      <line x1="75" y1="55" x2="75" y2="125" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="120" y1="55" x2="120" y2="125" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="165" y1="55" x2="165" y2="125" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 2" />
                    </>
                  )}
                  {prismType === 'cube' && (
                    <>
                      <line x1="75" y1="55" x2="75" y2="125" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="120" y1="55" x2="120" y2="125" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="165" y1="55" x2="165" y2="125" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 2" />
                    </>
                  )}
                  {prismType === 'triangular' && (
                    <>
                      <line x1="85" y1="55" x2="85" y2="125" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="145" y1="55" x2="145" y2="125" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 2" />
                    </>
                  )}

                  {/* Top Base Attached */}
                  {prismType === 'triangular' ? (
                    <polygon points="85,55 145,55 145,15" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
                  ) : (
                    <rect x="75" y="20" width="45" height="35" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
                  )}

                  {/* Bottom Base Attached */}
                  {prismType === 'triangular' ? (
                    <polygon points="85,125 145,125 145,165" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
                  ) : (
                    <rect x="75" y="125" width="45" height="35" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
                  )}

                  {/* Labels on Net */}
                  <text x="120" y="93" textAnchor="middle" className="text-[10px] font-black fill-orange-950">
                    Palást: Tp = Ka · M ({lateralArea} cm²)
                  </text>
                  <text x="97" y="40" textAnchor="middle" className="text-[8px] font-bold fill-amber-900">Ta</text>
                  <text x="97" y="145" textAnchor="middle" className="text-[8px] font-bold fill-amber-900">Ta</text>
                  <text x="120" y="174" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">
                    Palást szélessége = Ka = {basePerimeter} cm
                  </text>
                  <text x="24" y="93" textAnchor="end" className="text-[9px] font-bold fill-amber-700">M</text>
                </svg>
              )}
              <div className="text-[11px] text-slate-500 font-medium mt-1">
                {viewMode === '3d' ? 'Axonometrikus testmodell' : 'Kiterített háló: 2 alaplap + 1 nagy téglalap palást'}
              </div>
            </div>

            {/* Sliders & Step Calculations */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-3">
                {/* a slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">
                      {prismType === 'cube' ? 'Kocka éle (a):' : 'Alapél (a):'}
                    </span>
                    <span className="font-mono text-amber-600 font-black">{dimA} cm</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={dimA}
                    onChange={(e) => setDimA(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                {/* b slider (if not cube) */}
                {prismType !== 'cube' && (
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-700 dark:text-slate-300">Másik alapél (b):</span>
                      <span className="font-mono text-amber-600 font-black">{dimB} cm</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="10"
                      value={dimB}
                      onChange={(e) => setDimB(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                )}

                {/* M slider (if not cube) */}
                {prismType !== 'cube' && (
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-700 dark:text-slate-300">Testmagasság (M):</span>
                      <span className="font-mono text-amber-600 font-black">{heightM} cm</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="14"
                      value={heightM}
                      onChange={(e) => setHeightM(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Calculated Outputs */}
              <div className="p-3.5 bg-amber-50/90 dark:bg-slate-800/80 rounded-2xl border border-amber-200 dark:border-amber-800 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>Alapterület (<MathText>T_a</MathText>):</span>
                  <span className="font-mono font-bold text-amber-800 dark:text-amber-300">{baseArea} cm²</span>
                </div>
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>Alapkerület (<MathText>K_a</MathText>):</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{basePerimeter} cm</span>
                </div>
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>Palást területe (<MathText>T_p = K_a \cdot M</MathText>):</span>
                  <span className="font-mono font-bold text-orange-700 dark:text-orange-300">{lateralArea} cm²</span>
                </div>
                <div className="pt-2 border-t border-amber-200 dark:border-slate-700 flex justify-between items-center text-sm font-black text-amber-900 dark:text-amber-200">
                  <span>Felszín (<MathText>A = 2T_a + T_p</MathText>):</span>
                  <span className="font-mono text-base text-amber-600 dark:text-amber-400">{surfaceArea} cm²</span>
                </div>
                <div className="flex justify-between items-center text-sm font-black text-emerald-900 dark:text-emerald-300">
                  <span>Térfogat (<MathText>V = T_a \cdot M</MathText>):</span>
                  <span className="font-mono text-base text-emerald-600 dark:text-emerald-400">{volume} cm³</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: Részletes Felszín és Térfogat Levezetés */}
      <TheorySection
        title="3. A Képletek Matematikai Háttere"
        subtitle="Hogyan gondolkodjunk a felszínről és a térfogatról?"
        icon={<Sparkles className="w-5 h-5 text-amber-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Felszín magyarázat */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-amber-100 dark:border-slate-800 space-y-3 shadow-xs">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center text-xs font-black">A</span>
              A Felszín Számítása (A = 2Ta + Tp)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Képzeld el, hogy a testet be kell csomagolnod papírral. A teljes felület 3 fő komponensből áll:
            </p>
            <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300 list-disc list-inside">
              <li><strong>Alsó alaplap:</strong> területe <MathText>T_a</MathText></li>
              <li><strong>Felső alaplap:</strong> pontosan megegyezik az alsóval (<MathText>T_a</MathText>), ezért van <MathText>2 \cdot T_a</MathText>.</li>
              <li><strong>Palást (<MathText>T_p</MathText>):</strong> az oldallapok együtt egy nagy téglalapot adnak, melynek hossza az alaplap körbejárási hossza (<MathText>K_a</MathText>), szélessége pedig a magasság (<MathText>M</MathText>).</li>
            </ul>
            <div className="p-2.5 bg-amber-50 dark:bg-slate-800 rounded-xl font-mono text-center text-xs font-bold text-amber-800 dark:text-amber-300">
              A = 2 · Ta + Ka · M
            </div>
          </div>

          {/* Térfogat magyarázat */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-emerald-100 dark:border-slate-800 space-y-3 shadow-xs">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-black">V</span>
              A Térfogat Számítása (V = Ta · M)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Gondolj egy pakli kártyára vagy egy szeletelt kenyérre!
            </p>
            <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300 list-disc list-inside">
              <li>Egyetlen lap területe <MathText>T_a</MathText> (alapterület).</li>
              <li>Ha ezekből <MathText>M</MathText> magasságú oszlopot építünk, a térfogat az alapterület és a magasság szorzata lesz.</li>
              <li><strong>Mértékegység váltás:</strong> 1 dm³ = 1 liter, 1 m³ = 1000 dm³ = 1000 liter.</li>
            </ul>
            <div className="p-2.5 bg-emerald-50 dark:bg-slate-800 rounded-xl font-mono text-center text-xs font-bold text-emerald-800 dark:text-emerald-300">
              V = Ta · M
            </div>
          </div>
        </div>

        {/* Képlettáblázat */}
        <TheoryTable
          headers={['Hasáb típusa', 'Alapterület (Ta)', 'Palást (Tp)', 'Felszín (A)', 'Térfogat (V)']}
          rows={[
            ['Téglatest (a, b, c)', 'a · b', '2(a + b) · c', '2(ab + bc + ac)', 'a · b · c'],
            ['Kocka (a él)', 'a²', '4a²', '6a²', 'a³'],
            ['Háromoldalú hasáb', '(a · ma) / 2', '(a + b + c) · M', '2Ta + (a + b + c)M', 'Ta · M'],
            ['Szabályos 6-oldalú hasáb', '6 · (a²√3 / 4)', '6a · M', '2Ta + 6aM', 'Ta · M']
          ]}
        />
      </TheorySection>

      {/* 4. SZAKASZ: Gyakori Csapdák és Hibák */}
      <TheorySection
        title="4. Gyakori Csapdák és Típushibák"
        subtitle="Mire figyelj a felvételin és a dolgozatokban?"
        icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
      >
        <div className="space-y-3">
          <TheoryTrapBox
            trap="Testmagasság (M) és alaplap magasságának (ma) összekeverése"
            explanation="Háromszög alapú hasábnál a kis m (ma) az alap háromszög magassága, a nagy M pedig a hasáb magassága! Nem ugyanaz a szám!"
            correction="Először számold ki a háromszög alap területét (Ta = (a · ma) / 2), és CSAK utána szorozz a hasáb testmagasságával (V = Ta · M)!"
          />

          <TheoryTrapBox
            trap="A két alaplap megduplázásának elfelejtése felszínszámításkor"
            explanation="Gyakori hiba: A = Ta + Tp (csak az egyik alapot számolják bele). A zárt hasábnak mindig 2 alaplapja van!"
            correction="A felszín képlete: A = 2 · Ta + Tp. (Kivétel, ha nyitott tartályról vagy fedél nélküli dobozról van szó: ott csak 1 · Ta!)."
          />

          <TheoryTrapBox
            trap="Mértékegységek keverése (cm és dm)"
            explanation="Ha a méretek 20 cm, 30 cm és 0,5 dm, nem szabad őket azonnal összeszorozni!"
            correction="Minden adatot válts azonos mértékegységre a számolás előtt! 0,5 dm = 5 cm."
          />
        </div>
      </TheorySection>

      {/* 5. SZAKASZ: Önellenőrző Kérdések */}
      <TheorySection
        title="5. Önellenőrző Kérdések"
        subtitle="Teszteld tudásodat a kvíz megkezdése előtt!"
        icon={<HelpCircle className="w-5 h-5 text-amber-500" />}
      >
        <div className="space-y-4">
          {/* 1. Kérdés */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
              1. Egy kocka éle 4 cm. Mennyi a felszíne és a térfogata?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 0, text: 'A = 96 cm², V = 64 cm³', correct: true },
                { id: 1, text: 'A = 64 cm², V = 96 cm³', correct: false },
                { id: 2, text: 'A = 48 cm², V = 64 cm³', correct: false }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setQuiz1Answer(opt.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                    quiz1Answer === opt.id
                      ? opt.correct
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200'
                        : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-amber-300'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {quiz1Answer !== null && (
              <div className="mt-2.5 text-xs text-slate-600 dark:text-slate-400">
                {quiz1Answer === 0 ? (
                  <span className="text-emerald-600 font-bold">✓ Helyes! A = 6 · 4² = 6 · 16 = 96 cm², V = 4³ = 64 cm³.</span>
                ) : (
                  <span className="text-rose-600 font-bold">✗ Nem jó. Kockánál A = 6a² (6 · 16 = 96) és V = a³ (4³ = 64).</span>
                )}
              </div>
            )}
          </div>

          {/* 2. Kérdés */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
              2. Egy hasáb alapterülete 25 cm², testmagassága 8 cm. Mekkora a térfogata?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 0, text: 'V = 100 cm³', correct: false },
                { id: 1, text: 'V = 200 cm³', correct: true },
                { id: 2, text: 'V = 400 cm³', correct: false }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setQuiz2Answer(opt.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                    quiz2Answer === opt.id
                      ? opt.correct
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200'
                        : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-amber-300'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {quiz2Answer !== null && (
              <div className="mt-2.5 text-xs text-slate-600 dark:text-slate-400">
                {quiz2Answer === 1 ? (
                  <span className="text-emerald-600 font-bold">✓ Helyes! V = Ta · M = 25 · 8 = 200 cm³.</span>
                ) : (
                  <span className="text-rose-600 font-bold">✗ Nem jó. A térfogat az alapterület és magasság szorzata: 25 · 8 = 200 cm³.</span>
                )}
              </div>
            )}
          </div>

          {/* 3. Kérdés */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
              3. Egy téglatest élei 2 cm, 3 cm és 5 cm. Mennyi a felszíne?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 0, text: 'A = 30 cm²', correct: false },
                { id: 1, text: 'A = 62 cm²', correct: true },
                { id: 2, text: 'A = 31 cm²', correct: false }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setQuiz3Answer(opt.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                    quiz3Answer === opt.id
                      ? opt.correct
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200'
                        : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-amber-300'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {quiz3Answer !== null && (
              <div className="mt-2.5 text-xs text-slate-600 dark:text-slate-400">
                {quiz3Answer === 1 ? (
                  <span className="text-emerald-600 font-bold">✓ Helyes! A = 2 · (2·3 + 3·5 + 2·5) = 2 · (6 + 15 + 10) = 2 · 31 = 62 cm². (30 cm³ a térfogata lenne!)</span>
                ) : (
                  <span className="text-rose-600 font-bold">✗ Nem jó. A lapok területei: 6, 15, 10 cm², ezek összege 31, megduplázva A = 62 cm².</span>
                )}
              </div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
