import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Box,
  Cylinder,
  Layers,
  Calculator,
  Compass,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Maximize2,
  Droplets,
  Ruler,
  Scale,
  ArrowRight
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface SolidsReviewTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const SolidsReviewTheory: React.FC<SolidsReviewTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív Térgeometriai Labor állapot
  const [activeSolidTab, setActiveSolidTab] = useState<'cube' | 'cuboid' | 'cylinder' | 'converter'>('cube');

  // Kocka állapot
  const [cubeA, setCubeA] = useState<number>(4);

  // Téglatest állapot
  const [cuboidA, setCuboidA] = useState<number>(3);
  const [cuboidB, setCuboidB] = useState<number>(4);
  const [cuboidC, setCuboidC] = useState<number>(6);

  // Henger állapot
  const [cylR, setCylR] = useState<number>(3);
  const [cylM, setCylM] = useState<number>(7);

  // Mértékegység átváltó állapot
  const [convertVal, setConvertVal] = useState<number>(2.5);
  const [convertUnit, setConvertUnit] = useState<'m3' | 'dm3' | 'cm3' | 'liter'>('m3');

  // Számítások
  const cubeArea = 6 * cubeA * cubeA;
  const cubeVol = cubeA * cubeA * cubeA;
  const cubeFaceDiag = (cubeA * Math.SQRT2).toFixed(2);
  const cubeSpaceDiag = (cubeA * Math.sqrt(3)).toFixed(2);

  const cuboidArea = 2 * (cuboidA * cuboidB + cuboidB * cuboidC + cuboidA * cuboidC);
  const cuboidVol = cuboidA * cuboidB * cuboidC;
  const cuboidDiag = Math.sqrt(cuboidA * cuboidA + cuboidB * cuboidB + cuboidC * cuboidC).toFixed(2);

  const cylBaseArea = (Math.PI * cylR * cylR).toFixed(1);
  const cylPerimeter = (2 * Math.PI * cylR).toFixed(1);
  const cylLateralArea = (2 * Math.PI * cylR * cylM).toFixed(1);
  const cylTotalArea = (2 * Math.PI * cylR * (cylR + cylM)).toFixed(1);
  const cylVol = (Math.PI * cylR * cylR * cylM).toFixed(1);

  // Átváltó számítások m3 bázisra
  const getConvertedResults = () => {
    let m3Val = convertVal;
    if (convertUnit === 'dm3' || convertUnit === 'liter') m3Val = convertVal / 1000;
    else if (convertUnit === 'cm3') m3Val = convertVal / 1000000;

    return {
      m3: m3Val,
      dm3: m3Val * 1000,
      liter: m3Val * 1000,
      cm3: m3Val * 1000000,
      ml: m3Val * 1000000,
      hl: m3Val * 10
    };
  };

  const converted = getConvertedResults();

  return (
    <TheoryTemplate
      title="Mit tanultunk eddig? (Térgeometriai Ismétlés)"
      subtitle="Mértékegység-váltások, kocka, téglatest, egyenes hasábok és forgáshenger felszíne és térfogata"
      badge="8. OSZTÁLY • VI. TESTEK • 📐 1. LECKE"
      badgeText="8. OSZTÁLY • VI. TESTEK • 📐 1. LECKE"
      themeColor="indigo"
      pdfFilename="8_osztaly_testek_ismetles_tananyag.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz a térgeometriai ismétlő kvízre?"
      practiceSubtitle="Tedd próbára tudásodat 3 szintre bontott, 30 feladatos interaktív kvízben levezetésekkel, párosítóval és csoportosítóval!"
      practiceButtonText="Ismétlő Kvíz indítása"
      quickRule={{
        label: 'A Térgeometria Két Aranyképlete',
        formula: 'V = T_a \\cdot m \\quad \\text{és} \\quad A = 2T_a + T_p = 2T_a + K_a \\cdot m'
      }}
    >
      {/* 1. INTERAKTÍV TEST ÉS MÉRTÉKEGYSÉG LABOR */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Maximize2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100">
              Interaktív Térgeometriai és Mértékegység Labor
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Változtasd az éleket és sugarakat, figyeld a 3D hálót és az élő felszín- és térfogatszámítást!
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
          <button
            onClick={() => setActiveSolidTab('cube')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSolidTab === 'cube'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Box className="w-4 h-4" />
            1. Kocka (a)
          </button>
          <button
            onClick={() => setActiveSolidTab('cuboid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSolidTab === 'cuboid'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            2. Téglatest (a, b, c)
          </button>
          <button
            onClick={() => setActiveSolidTab('cylinder')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSolidTab === 'cylinder'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Cylinder className="w-4 h-4" />
            3. Körhenger (r, m)
          </button>
          <button
            onClick={() => setActiveSolidTab('converter')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSolidTab === 'converter'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Droplets className="w-4 h-4" />
            4. Űrmérték Átváltó
          </button>
        </div>

        {/* Tab 1: KOCKA */}
        {activeSolidTab === 'cube' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border-2 border-indigo-100 dark:border-indigo-950 shadow-md">
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
                Izometrikus 3D Kocka Rajz (élhossz: a = {cubeA} cm)
              </span>
              <svg viewBox="0 0 240 200" className="w-64 h-56">
                <defs>
                  <linearGradient id="cubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c7d2fe" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                  <linearGradient id="cubeFront" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                  <linearGradient id="cubeRight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4338ca" />
                    <stop offset="100%" stopColor="#3730a3" />
                  </linearGradient>
                </defs>
                {/* Rejtett hátsó élek */}
                <line x1="60" y1="90" x2="60" y2="150" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="60" y1="150" x2="130" y2="180" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="60" y1="90" x2="130" y2="60" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Testátló (belső térbeli átló) */}
                <line x1="60" y1="150" x2="180" y2="90" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
                <text x="110" y="115" className="text-[10px] font-black fill-rose-500">d = a√3</text>

                {/* Előlap */}
                <polygon points="60,90 130,120 130,180 60,150" fill="url(#cubeFront)" opacity="0.85" stroke="#312e81" strokeWidth="2" />
                {/* Jobb oldallap */}
                <polygon points="130,120 180,90 180,150 130,180" fill="url(#cubeRight)" opacity="0.85" stroke="#312e81" strokeWidth="2" />
                {/* Fedőlap */}
                <polygon points="60,90 110,60 180,90 130,120" fill="url(#cubeTop)" opacity="0.9" stroke="#312e81" strokeWidth="2" />

                {/* Címkék */}
                <text x="95" y="165" className="text-[11px] font-black fill-white text-center">a = {cubeA} cm</text>
                <text x="160" y="145" className="text-[10px] font-bold fill-indigo-200">a</text>
                <text x="80" y="75" className="text-[10px] font-bold fill-indigo-900">a</text>
              </svg>
            </div>

            <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
              <div>
                <label className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <span>Élhossz beállítása (a):</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-sm">
                    {cubeA} cm
                  </span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={cubeA}
                  onChange={(e) => setCubeA(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900">
                  <div className="text-slate-500 dark:text-slate-400 text-[11px] uppercase font-bold">1 lap területe:</div>
                  <div className="text-lg font-black text-indigo-700 dark:text-indigo-300">
                    {cubeA * cubeA} cm²
                  </div>
                  <div className="text-[11px] text-slate-500">T = a² = {cubeA}²</div>
                </div>

                <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900">
                  <div className="text-slate-500 dark:text-slate-400 text-[11px] uppercase font-bold">Lapátló (dlap):</div>
                  <div className="text-lg font-black text-indigo-700 dark:text-indigo-300">
                    {cubeFaceDiag} cm
                  </div>
                  <div className="text-[11px] text-slate-500">dl = a√2 ≈ {cubeFaceDiag}</div>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900">
                  <div className="text-emerald-700 dark:text-emerald-400 text-[11px] uppercase font-bold">Teljes Felszín (A):</div>
                  <div className="text-xl font-black text-emerald-800 dark:text-emerald-200">
                    {cubeArea} cm²
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400">A = 6 · a² = 6 · {cubeA * cubeA}</div>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900">
                  <div className="text-blue-700 dark:text-blue-400 text-[11px] uppercase font-bold">Térfogat (V):</div>
                  <div className="text-xl font-black text-blue-800 dark:text-blue-200">
                    {cubeVol} cm³
                  </div>
                  <div className="text-[11px] text-blue-600 dark:text-blue-400">V = a³ = {cubeA}³ = {cubeVol}</div>
                </div>
              </div>

              <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900/60 flex items-center justify-between">
                <span className="text-xs font-bold text-rose-800 dark:text-rose-300">Belső Testátló (Pitagorasz-tétel térben):</span>
                <span className="text-sm font-black text-rose-700 dark:text-rose-400 font-mono">
                  d = a√3 ≈ {cubeSpaceDiag} cm
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: TÉGLATEST */}
        {activeSolidTab === 'cuboid' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border-2 border-indigo-100 dark:border-indigo-950 shadow-md">
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
                Téglatest (a = {cuboidA} cm, b = {cuboidB} cm, c = {cuboidC} cm)
              </span>
              <svg viewBox="0 0 240 180" className="w-64 h-48">
                {/* Hátsó szaggatott vonalak */}
                <line x1="40" y1="80" x2="40" y2="140" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="40" y1="140" x2="150" y2="160" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="40" y1="80" x2="150" y2="60" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Testátló */}
                <line x1="40" y1="140" x2="200" y2="80" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
                <text x="120" y="105" className="text-[10px] font-black fill-rose-500">d = √(a²+b²+c²)</text>

                {/* Lapok */}
                <polygon points="40,80 150,100 150,160 40,140" fill="#6366f1" opacity="0.85" stroke="#312e81" strokeWidth="2" />
                <polygon points="150,100 200,80 200,140 150,160" fill="#4338ca" opacity="0.85" stroke="#312e81" strokeWidth="2" />
                <polygon points="40,80 90,60 200,80 150,100" fill="#818cf8" opacity="0.9" stroke="#312e81" strokeWidth="2" />

                <text x="95" y="145" className="text-[10px] font-black fill-white">a = {cuboidA}</text>
                <text x="175" y="130" className="text-[10px] font-bold fill-indigo-200">b = {cuboidB}</text>
                <text x="155" y="125" className="text-[10px] font-bold fill-white">c = {cuboidC}</text>
              </svg>
            </div>

            <div className="lg:col-span-6 space-y-3.5">
              <div>
                <label className="flex items-between justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Hosszúság (a): {cuboidA} cm</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={cuboidA}
                  onChange={(e) => setCuboidA(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div>
                <label className="flex items-between justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Szélesség (b): {cuboidB} cm</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={cuboidB}
                  onChange={(e) => setCuboidB(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div>
                <label className="flex items-between justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Magasság (c): {cuboidC} cm</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={cuboidC}
                  onChange={(e) => setCuboidC(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900">
                  <div className="text-emerald-700 dark:text-emerald-400 text-[11px] uppercase font-bold">Felszín (A):</div>
                  <div className="text-xl font-black text-emerald-800 dark:text-emerald-200">{cuboidArea} cm²</div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400">2·(ab + bc + ac)</div>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900">
                  <div className="text-blue-700 dark:text-blue-400 text-[11px] uppercase font-bold">Térfogat (V):</div>
                  <div className="text-xl font-black text-blue-800 dark:text-blue-200">{cuboidVol} cm³</div>
                  <div className="text-[10px] text-blue-600 dark:text-blue-400">a · b · c = {cuboidA}·{cuboidB}·{cuboidC}</div>
                </div>
              </div>

              <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900/60 flex items-center justify-between text-xs">
                <span className="font-bold text-rose-800 dark:text-rose-300">Testátló hossza (d):</span>
                <span className="font-black text-rose-700 dark:text-rose-400 font-mono text-sm">
                  d = √({cuboidA}² + {cuboidB}² + {cuboidC}²) ≈ {cuboidDiag} cm
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: KÖRHENGER */}
        {activeSolidTab === 'cylinder' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border-2 border-indigo-100 dark:border-indigo-950 shadow-md">
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
                Forgáshenger (r = {cylR} cm, m = {cylM} cm)
              </span>
              <svg viewBox="0 0 200 180" className="w-56 h-48">
                {/* Palást test */}
                <rect x="50" y="45" width="100" height="90" fill="#6366f1" opacity="0.3" stroke="#4f46e5" strokeWidth="2" />
                {/* Alsó fedőkör szaggatott hátsó fele */}
                <path d="M 50 135 A 50 15 0 0 1 150 135" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Alsó fedőkör látható első fele */}
                <path d="M 50 135 A 50 15 0 0 0 150 135" fill="#4f46e5" opacity="0.8" stroke="#312e81" strokeWidth="2" />
                {/* Felső fedőlap teljes ellipszis */}
                <ellipse cx="100" cy="45" rx="50" ry="15" fill="#818cf8" opacity="0.9" stroke="#312e81" strokeWidth="2" />
                {/* Sugár és magasság berajzolása */}
                <line x1="100" y1="45" x2="150" y2="45" stroke="#ffffff" strokeWidth="2" />
                <circle cx="100" cy="45" r="2" fill="#ffffff" />
                <text x="120" y="40" className="text-[10px] font-black fill-white">r = {cylR}</text>
                <text x="160" y="95" className="text-[11px] font-black fill-indigo-700">m = {cylM}</text>
              </svg>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div>
                <label className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Alapkör sugara (r): {cylR} cm</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={cylR}
                  onChange={(e) => setCylR(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div>
                <label className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Testmagasság (m): {cylM} cm</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="12"
                  value={cylM}
                  onChange={(e) => setCylM(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900">
                  <div className="text-slate-500 dark:text-slate-400 text-[11px] uppercase font-bold">Alapterület (Ta):</div>
                  <div className="text-base font-black text-indigo-700 dark:text-indigo-300">{cylBaseArea} cm²</div>
                  <div className="text-[10px] text-slate-500">Ta = r²π = {cylR}² · π</div>
                </div>

                <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900">
                  <div className="text-slate-500 dark:text-slate-400 text-[11px] uppercase font-bold">Palást (Tp):</div>
                  <div className="text-base font-black text-indigo-700 dark:text-indigo-300">{cylLateralArea} cm²</div>
                  <div className="text-[10px] text-slate-500">Tp = 2rπ · m</div>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900">
                  <div className="text-emerald-700 dark:text-emerald-400 text-[11px] uppercase font-bold">Teljes Felszín (A):</div>
                  <div className="text-lg font-black text-emerald-800 dark:text-emerald-200">{cylTotalArea} cm²</div>
                  <div className="text-[10px] text-emerald-600">A = 2Ta + Tp</div>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900">
                  <div className="text-blue-700 dark:text-blue-400 text-[11px] uppercase font-bold">Térfogat (V):</div>
                  <div className="text-lg font-black text-blue-800 dark:text-blue-200">{cylVol} cm³</div>
                  <div className="text-[10px] text-blue-600">V = r²π · m</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: MÉRTÉKEGYSÉG ÁTVÁLTÓ */}
        {activeSolidTab === 'converter' && (
          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border-2 border-indigo-100 dark:border-indigo-950 shadow-md space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Átváltandó Mennyiség:
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={convertVal}
                  onChange={(e) => setConvertVal(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-base text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Kiindulási Mértékegység:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['m3', 'dm3', 'liter', 'cm3'] as const).map((unit) => (
                    <button
                      key={unit}
                      onClick={() => setConvertUnit(unit)}
                      className={`py-2 rounded-xl text-xs font-black transition-all ${
                        convertUnit === unit
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {unit === 'm3' ? 'm³' : unit === 'dm3' ? 'dm³' : unit === 'cm3' ? 'cm³' : 'liter'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Élő átváltási kártyák */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Köbméter (m³)</div>
                <div className="text-base sm:text-lg font-black text-indigo-600 dark:text-indigo-400 font-mono mt-1">
                  {converted.m3.toLocaleString('hu-HU')}
                </div>
              </div>

              <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 text-center">
                <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">Liter (l)</div>
                <div className="text-base sm:text-lg font-black text-indigo-700 dark:text-indigo-300 font-mono mt-1">
                  {converted.liter.toLocaleString('hu-HU')}
                </div>
                <div className="text-[9px] text-slate-400">= dm³</div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Köbdeciméter</div>
                <div className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-200 font-mono mt-1">
                  {converted.dm3.toLocaleString('hu-HU')} dm³
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Köbcentiméter</div>
                <div className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-200 font-mono mt-1">
                  {converted.cm3.toLocaleString('hu-HU')} cm³
                </div>
                <div className="text-[9px] text-slate-400">= ml</div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Milliliter (ml)</div>
                <div className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-200 font-mono mt-1">
                  {converted.ml.toLocaleString('hu-HU')}
                </div>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 text-center">
                <div className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase">Hektoliter (hl)</div>
                <div className="text-base sm:text-lg font-black text-amber-800 dark:text-amber-300 font-mono mt-1">
                  {converted.hl.toLocaleString('hu-HU')}
                </div>
                <div className="text-[9px] text-amber-600">1 hl = 100 l</div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SZEKCIÓ 1: MÉRTÉKEGYSÉGEK ÉS VÁLTÓSZÁMOK */}
      <TheorySection
        title="1. Térfogat- és Felszínmértékegységek Rendszere"
        badge="ALAPOK"
        badgeColor="indigo"
        icon={<Ruler className="w-5 h-5 text-indigo-600" />}
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Amikor a síkból (2D) belépünk a térbe (3D), a mértékegységek váltószámai hatványozódnak. Míg a hosszúságnál <MathText>10</MathText>, a területnél <MathText>10^2 = 100</MathText>, addig a térfogatnál már <MathText>10^3 = 1000</MathText> a váltószám a szomszédos egységek között!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard
              title="Felszín (Terület): Váltószám 100"
              badge="2D SÍKBELI"
              color="indigo"
              formula="1\text{ m}^2 = 100\text{ dm}^2 = 10\,000\text{ cm}^2 = 1\,000\,000\text{ mm}^2"
              properties={[
                'Minden szomszédos lépésben 100-zal szorzunk (kisebbre váltás) vagy osztunk (nagyobbra váltás).',
                '1 hektár (ha) = 10 000 m² (egy 100 m × 100 m-es négyzet területe).',
                'A test felszíne a határoló lapok területeinek összege.'
              ]}
            />

            <TheoryCard
              title="Térfogat és Űrtartalom: Váltószám 1000"
              badge="3D TÉRBELI"
              color="blue"
              formula="1\text{ m}^3 = 1000\text{ dm}^3 = 1\,000\,000\text{ cm}^3"
              properties={[
                'Hétköznapi híd: 1 dm³ = 1 liter (1 dm³-es kockába pont 1 liter víz fér bele).',
                '1 cm³ = 1 milliliter (ml).',
                '1 m³ = 1000 liter = 10 hektoliter (hl).',
                '1 liter = 10 deciliter (dl) = 100 centiliter (cl) = 1000 milliliter (ml).'
              ]}
            />
          </div>

          <TheoryCallout title="Hogyan jegyezd meg könnyen a váltószámokat?" color="indigo">
            Gondolj egy <MathText>{'1\\text{ m}'}</MathText> élű kockára! Ha felbontod <MathText>{'1\\text{ dm}'}</MathText>-es kiskockákra, az alján egy <MathText>{'10 \\times 10 = 100'}</MathText> darabból álló réteg lesz, és ebből <MathText>10</MathText> emeletet tudsz egymásra rakni: <MathText>{'100 \\times 10 = 1000\\text{ db}'}</MathText> kiskocka fér el benne! Ezért <MathText>{'1\\text{ m}^3 = 1000\\text{ dm}^3'}</MathText>.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* SZEKCIÓ 2: KOCKA ÉS TÉGLATEST */}
      <TheorySection
        title="2. A Kocka és a Téglatest Vizsgálata"
        badge="SZABÁLYOS TESTEK"
        badgeColor="indigo"
        icon={<Box className="w-5 h-5 text-indigo-600" />}
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            A kocka és a téglatest a legegyszerűbb, derékszögű paralelepipedonok. Határoló lapjaik páronként párhuzamosak és egymásra merőlegesek.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard
              title="A Kocka (a)"
              badge="6 NÉGYZETLAP"
              color="indigo"
              formula="A = 6a^2, \quad V = a^3, \quad d_{test} = a\sqrt{3}"
              properties={[
                '6 egybevágó négyzetlap határolja, 12 egyenlő éle és 8 csúcsa van.',
                'Egy lap területe: Tlap = a².',
                'Lapátló: a derékszögű háromszög átfogója: dlap = √(a² + a²) = a√2.',
                'Testátló: a lapátlóból és egy oldalból alkotott háromszögre Pitagorasz-tétel: d = √((a√2)² + a²) = √(3a²) = a√3.'
              ]}
            />

            <TheoryCard
              title="A Téglatest (a, b, c)"
              badge="6 TÉGLALAP"
              color="indigo"
              formula="A = 2(ab + bc + ac), \quad V = a \cdot b \cdot c, \quad d = \sqrt{a^2 + b^2 + c^2}"
              properties={[
                '6 téglalap határolja, szemközti lapjai egybevágók és párhuzamosak.',
                'Felszín: 3 különböző lapfajta kétszerese: 2 · (ab + bc + ac).',
                'Térfogat: Alapterület · testmagasság: V = (a · b) · c.',
                'Térbeli testátló Pitagorasz-tétellel: d = √(a² + b² + c²).'
              ]}
            />
          </div>

          <TheoryTrapBox
            trap="Gyakori hiba: a lapátló és a testátló összekeverése!"
            wrong="d = a√2 egy kocka testátlója (hibás, mert a√2 csak egyetlen négyzetlap átlója!)."
            wrongExplanation="A lapátló a kocka felületén fekszik, a testátló viszont átszeli a belső teret a szemközti csúcsok között."
            correct="Lapátló: dlap = a√2. Testátló: dtest = a√3."
            correctExplanation="A testátló mindig hosszabb a lapátlónál, mert mindhárom dimenzió (a² + a² + a²) hozzájárul a hosszához."
          />
        </div>
      </TheorySection>

      {/* SZEKCIÓ 3: EGYENES HASÁBOK */}
      <TheorySection
        title="3. Egyenes Hasábok Felszíne és Térfogata"
        badge="ÁLTALÁNOS HASÁBOK"
        badgeColor="indigo"
        icon={<Layers className="w-5 h-5 text-indigo-600" />}
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Az <strong>egyenes hasáb</strong> olyan test, amelynek alaplapja és fedőlapja két egybevágó és párhuzamos síkidom (háromszög, négyszög, sokszög), az oldallapjai pedig az alaplapra merőleges téglalapok. Ezek a téglalapok alkotják a <strong>palástot</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard
              title="A Hasáb Felszíne (A)"
              badge="HÁLÓ KITERÍTÉSE"
              color="indigo"
              formula="A = 2T_a + T_p = 2T_a + K_a \cdot m"
              properties={[
                '2Ta: az alsó alaplap és a felső fedőlap területe összesen.',
                'Tp (palástterület): ha kiterítjük a hasáb palástját, egyetlen nagy téglalapot kapunk!',
                'Ennek a téglalapnak az egyik oldala az alaplap kerülete (Ka), a másik pedig a testmagasság (m).',
                'Így: Tp = Ka · m.'
              ]}
            />

            <TheoryCard
              title="A Hasáb Térfogata (V)"
              badge="CAVALIERI-ELV"
              color="indigo"
              formula="V = T_a \cdot m"
              properties={[
                'Ta: az alaplap területe (háromszögnél (a · ma)/2, téglalapnál a · b, trapéznál ((a+c)·m)/2).',
                'm: a test magassága (a két alaplap közötti merőleges távolság).',
                'Képi analógia: Képzelj el egy kártyapaklit! Az alapterület egy kártyalap területe, a magasság a pakli vastagsága.'
              ]}
            />
          </div>
        </div>
      </TheorySection>

      {/* SZEKCIÓ 4: FORGÁSHENGER */}
      <TheorySection
        title="4. Az Egyenes Körhenger"
        badge="FORGÁSTEST"
        badgeColor="indigo"
        icon={<Cylinder className="w-5 h-5 text-indigo-600" />}
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Az <strong>egyenes körhenger</strong> úgy keletkezik, hogy egy téglalapot az egyik oldala körül megforgatunk a térben. Alaplapja és fedőlapja egy-egy <MathText>r</MathText> sugarú kör.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard
              title="A Henger Felszíne (A)"
              badge="2 KÖR + 1 TÉGLALAP"
              color="indigo"
              formula="A = 2 \cdot r^2\pi + 2r\pi \cdot m = 2r\pi(r + m)"
              properties={[
                'Alapterület: Ta = r²π (két kör: 2 · r²π).',
                'Alapkerület: Ka = 2rπ.',
                'Palást területe: Tp = Ka · m = 2rπ · m (kiterítve egy 2rπ széles és m magas téglalap).',
                'Kiemeléssel: A = 2rπ(r + m).'
              ]}
            />

            <TheoryCard
              title="A Henger Térfogata (V)"
              badge="ALAPTERÜLET · MAGASSÁG"
              color="indigo"
              formula="V = T_a \cdot m = r^2\pi \cdot m"
              properties={[
                'Ugyanaz az alapszabály érvényes, mint a hasáboknál: Alapterület szorozva magassággal.',
                'Ta = r²π, ezért V = r²π · m.',
                'Számológépes vagy feladatbeli közelítés: π ≈ 3,14 vagy π ≈ 22/7.'
              ]}
            />
          </div>

          <TheoryTrapBox
            trap="Csapdahelyzet szöveges feladatoknál: Nyitott tetejű tartály, hordó vagy cső!"
            wrong="Egy felül nyitott henger alakú fazék zománcozásához A = 2r²π + 2rπ·m zománc kell."
            wrongExplanation="Ha az edény felül nyitott, nincs fedőlapja! Csak 1 alapkört kell beszámítani a felszínbe."
            correct="Nyitott henger felszíne: A = r²π + 2rπ·m. Mindkét végén nyitott cső felszíne pedig csak a palást: A = 2rπ·m."
            correctExplanation="Mindig olvasd el figyelmesen a feladatot, hogy van-e fedele a testnek!"
          />
        </div>
      </TheorySection>

      {/* SZEKCIÓ 5: GYAKORLATI ALKALMAZÁSOK ÉS SŰRŰSÉG */}
      <TheorySection
        title="5. Felszín vs Térfogat a Gyakorlatban"
        badge="ÉLETSZERŰ MATEMATIKA"
        badgeColor="indigo"
        icon={<Scale className="w-5 h-5 text-indigo-600" />}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Mikor számolunk FELSZÍNT (A)?
              </div>
              <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Ajándékdoboz csomagolásakor (csomagolópapír szükséglet).</li>
                <li>Épület falainak, szoba mennyezetének festésekor, csempézésekor.</li>
                <li>Konzervdoboz vagy tartály felületének bádogozásakor, lakkozásakor.</li>
                <li>Mértékegység mindig felület: <MathText>{'\\text{m}^2, \\text{dm}^2, \\text{cm}^2'}</MathText>.</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-2xl border border-blue-200 dark:border-blue-800 space-y-2">
              <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Mikor számolunk TÉRFOGATOT (V)?
              </div>
              <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Medence feltöltése vízzel (hány liter víz kell bele?).</li>
                <li>Földkiemelés alapásáskor, sóder vagy beton rendelésekor.</li>
                <li>Testek tömegének meghatározásakor: <MathText>{'m = ρ · V'}</MathText> (sűrűség · térfogat).</li>
                <li>Mértékegység mindig űrmérték / köb: <MathText>{'\\text{m}^3, \\text{liter}, \\text{dm}^3, \\text{cm}^3'}</MathText>.</li>
              </ul>
            </div>
          </div>

          <TheoryCallout title="A Sűrűség és Tömeg Képlete (Fizika & Matek Kapcsolat)" color="indigo">
            Ha ismert a test térfogata (<MathText>V</MathText>) és anyagi sűrűsége (<MathText>ρ</MathText>), a tömege közvetlenül kiszámítható:
            <div className="my-2 text-base font-black text-center text-indigo-700 dark:text-indigo-300 font-mono">
              <MathText>{'m = ρ · V \\quad [\\text{kg} = \\frac{\\text{kg}}{\\text{dm}^3} · \\text{dm}^3]'}</MathText>
            </div>
            Például egy <MathText>{'2\\text{ dm}^3'}</MathText> térfogatú vasdarab tömege (<MathText>{'ρ_{\\text{vas}} \\approx 7,8\\text{ kg/dm}^3'}</MathText>): <MathText>{'m = 7,8 · 2 = 15,6\\text{ kg}'}</MathText>.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* ÖSSZEFOGLALÓ KÉPLETTÁBLÁZAT */}
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-indigo-600" />
          Térgeometriai Képlettár és Összegzés
        </h3>
        <TheoryTable
          headers={['Test Típusa', 'Alapterület (Ta)', 'Palástterület (Tp)', 'Felszín (A)', 'Térfogat (V)']}
          rows={[
            ['Kocka (a)', 'Ta = a²', 'Tp = 4a²', 'A = 6a²', 'V = a³'],
            ['Téglatest (a, b, c)', 'Ta = a · b', 'Tp = 2(a+b) · c', 'A = 2(ab + bc + ac)', 'V = a · b · c'],
            ['Egyenes hasáb', 'Ta (alapsokszög területe)', 'Tp = Ka · m', 'A = 2Ta + Tp', 'V = Ta · m'],
            ['Körhenger (r, m)', 'Ta = r²π', 'Tp = 2rπ · m', 'A = 2r²π + 2rπm', 'V = r²π · m']
          ]}
        />
      </section>
    </TheoryTemplate>
  );
};

export default SolidsReviewTheory;
