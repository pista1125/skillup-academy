import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Sliders,
  Compass,
  Check,
  BookOpen,
  HelpCircle,
  Hash,
  Divide,
  Circle as CircleIcon,
  CircleDot,
  Disc,
  Lightbulb,
  Maximize2,
  Minimize2,
  Ruler,
  Layers,
  PieChart
} from 'lucide-react';
import { MathText, Fraction } from '@/components/math/shared/MathText';

interface CircleTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const CircleTheory: React.FC<CircleTheoryProps> = ({ onBack, onStartQuiz }) => {
  // Laboratory tab state: 'parts' | 'line' | 'two-circles'
  const [labTab, setLabTab] = useState<'parts' | 'line' | 'two-circles'>('parts');

  // Lab 1: Parts controls
  const [radius, setRadius] = useState<number>(60);
  const [showRadius, setShowRadius] = useState<boolean>(true);
  const [showDiameter, setShowDiameter] = useState<boolean>(true);
  const [showChord, setShowChord] = useState<boolean>(false);
  const [showSector, setShowSector] = useState<boolean>(false);
  const [showSegment, setShowSegment] = useState<boolean>(false);
  const [showAnnulus, setShowAnnulus] = useState<boolean>(false);
  const [sectorAngle, setSectorAngle] = useState<number>(75);

  // Lab 2: Line and circle controls
  const [lineDist, setLineDist] = useState<number>(60); // distance from center (0 to 100)

  // Lab 3: Two circles controls
  const [circleDist, setCircleDist] = useState<number>(80); // distance between centers (0 to 110)
  const r1 = 50;
  const r2 = 30;

  // Helpers for Lab 1 SVG
  const cx = 150;
  const cy = 150;
  const radAngle = (sectorAngle * Math.PI) / 180;
  const arcX = cx + radius * Math.cos(radAngle);
  const arcY = cy - radius * Math.sin(radAngle);
  const largeArcFlag = sectorAngle > 180 ? 1 : 0;

  // Lab 2 Line position calculations
  const circleR = 60;
  let lineStatusText = '';
  let lineStatusColor = '';
  let lineIntersections = 0;
  if (lineDist < circleR) {
    lineIntersections = 2;
    lineStatusText = 'Szelő egyenes (2 közös pont)';
    lineStatusColor = 'text-sky-600 bg-sky-50 dark:bg-sky-950/40 border-sky-300';
  } else if (lineDist === circleR) {
    lineIntersections = 1;
    lineStatusText = 'Érintő egyenes (1 közös pont, e ⊥ r)';
    lineStatusColor = 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-300';
  } else {
    lineIntersections = 0;
    lineStatusText = 'Elkerülő egyenes (0 közös pont)';
    lineStatusColor = 'text-slate-600 bg-slate-50 dark:bg-slate-900 border-slate-300';
  }

  // Lab 3 Two circles status
  let twoCirclesStatus = '';
  let twoCirclesBadgeColor = '';
  let twoCirclesIntersections = 0;
  if (circleDist === 0) {
    twoCirclesIntersections = 0;
    twoCirclesStatus = 'Koncentrikus körök (közös középpont, d = 0)';
    twoCirclesBadgeColor = 'text-purple-700 bg-purple-50 border-purple-300';
  } else if (circleDist < r1 - r2) {
    twoCirclesIntersections = 0;
    twoCirclesStatus = `Egymásban fekvő belső körök (d < r₁ - r₂ = ${r1 - r2} cm)`;
    twoCirclesBadgeColor = 'text-indigo-700 bg-indigo-50 border-indigo-300';
  } else if (circleDist === r1 - r2) {
    twoCirclesIntersections = 1;
    twoCirclesStatus = `Belülről érintkező körök (d = r₁ - r₂ = ${r1 - r2} cm, 1 pont)`;
    twoCirclesBadgeColor = 'text-amber-700 bg-amber-50 border-amber-300';
  } else if (circleDist < r1 + r2) {
    twoCirclesIntersections = 2;
    twoCirclesStatus = `Metsző körök (${r1 - r2} cm < d < ${r1 + r2} cm, 2 pont)`;
    twoCirclesBadgeColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
  } else if (circleDist === r1 + r2) {
    twoCirclesIntersections = 1;
    twoCirclesStatus = `Kívülről érintkező körök (d = r₁ + r₂ = ${r1 + r2} cm, 1 pont)`;
    twoCirclesBadgeColor = 'text-amber-700 bg-amber-50 border-amber-300';
  } else {
    twoCirclesIntersections = 0;
    twoCirclesStatus = `Egymáson kívül lévő körök (d > r₁ + r₂ = ${r1 + r2} cm, 0 pont)`;
    twoCirclesBadgeColor = 'text-slate-700 bg-slate-50 border-slate-300';
  }

  return (
    <TheoryTemplate
      title="12. A Kör"
      subtitle="A kör vonalai és elemei, síkrészei, a kör és körlap definíciója, szimmetriái, valamint egyenes és két kör kölcsönös helyzete"
      badgeText="7. OSZTÁLY • GEOMETRIA • 📖 TANANYAG"
      themeColor="rose"
      pdfFilename="7_osztaly_a_kor.pdf"
      quickRule={{
        label: 'A kör aranyszabályai',
        formula: 'd = 2 · r | r = d / 2 | Érintő: e ⊥ r (d = r) | Szelő: 2 pont (d < r) | Elkerülő: 0 pont (d > r) | Két kör: Kívül d = r₁ + r₂, Belül d = |r₁ - r₂| | Thalész: γ = 90° | ∞ tengely'
      }}
      estimatedTime="35-40 perc"
      difficulty="Közepes"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: A KÖR VONALAI ÉS ELEMEI (ÁBRÁKKAL) */}
      <TheorySection
        number={1}
        title="A Kör Vonalai és Elemei: Szakaszok, Ívek és Síkrészek"
        badgeColor="rose"
        icon={<Compass className="w-5 h-5 text-rose-600" />}
      >
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          A kör és a körlap alapvető geometriai elemeinek és síkrészeinek pontos ismerete a felsőbb matematikai számítások kulcsa.
          Az alábbi nagy áttekintő ábrán egyetlen közös képen látjuk az összes fontos vonalas és területi elemet, majd alatta mindegyiket részletesen, egyedi ábrával és képlettel tekintjük át.
        </p>

        {/* 1.0 NAGY ÁTTEKINTŐ ÁBRA: A KÖR ANATÓMIÁJA */}
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-rose-50/60 via-white to-pink-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-rose-950/20 border-2 border-rose-200 dark:border-rose-900/60 rounded-3xl shadow-sm mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Master SVG diagram */}
            <div className="w-full md:w-3/5 flex justify-center bg-white dark:bg-slate-950 p-4 rounded-2xl border border-rose-100 dark:border-slate-800 shadow-inner">
              <svg viewBox="0 0 420 260" className="w-full max-w-[400px] aspect-[42/26]">
                <defs>
                  {/* Sector gradient */}
                  <radialGradient id="masterGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffe4e6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#fecdd3" stopOpacity="0.2" />
                  </radialGradient>
                </defs>

                {/* Shaded Körcikk (Sector: 0° to 55°) */}
                <path
                  d="M 190 130 L 285 130 A 95 95 0 0 0 244.5 52.1 Z"
                  fill="#10b981"
                  fillOpacity="0.28"
                  stroke="#059669"
                  strokeWidth="1.8"
                />

                {/* Shaded Körszelet (Segment on top left chord) */}
                <path
                  d="M 122.9 62.9 A 95 95 0 0 1 190 35 Z"
                  fill="#06b6d4"
                  fillOpacity="0.32"
                  stroke="#0891b2"
                  strokeWidth="1.8"
                />

                {/* Main Circle Outline */}
                <circle
                  cx="190"
                  cy="130"
                  r="95"
                  fill="none"
                  stroke="#e11d48"
                  strokeWidth="2.5"
                />

                {/* Diameter (horizontal chord through center AB) */}
                <line x1="95" y1="130" x2="285" y2="130" stroke="#4f46e5" strokeWidth="2.5" />
                <circle cx="95" cy="130" r="3.5" fill="#4f46e5" />
                <circle cx="285" cy="130" r="3.5" fill="#4f46e5" />
                <text x="78" y="134" className="text-[11px] font-black fill-indigo-700">A</text>
                <text x="290" y="134" className="text-[11px] font-black fill-indigo-700">B</text>
                <text x="135" y="123" textAnchor="middle" className="text-[10px] font-mono font-bold fill-indigo-700">
                  d = 2r (átmérő)
                </text>

                {/* Radius (O to P upward-right) */}
                <line x1="190" y1="130" x2="244.5" y2="52.1" stroke="#e11d48" strokeWidth="2.2" strokeDasharray="4 2" />
                <circle cx="244.5" cy="52.1" r="3.5" fill="#e11d48" />
                <text x="250" y="48" className="text-[11px] font-black fill-rose-700">P</text>
                <text x="226" y="88" className="text-[11px] font-serif italic font-bold fill-rose-600">r</text>

                {/* Central angle alpha arc */}
                <path d="M 225 130 A 35 35 0 0 0 210 101" fill="none" stroke="#059669" strokeWidth="1.5" />
                <text x="222" y="118" className="text-[10px] font-bold fill-emerald-800">α</text>

                {/* Highlighted Arc (Körív) on the bottom-right */}
                <path
                  d="M 285 130 A 95 95 0 0 1 257.2 197.2"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                />
                <circle cx="257.2" cy="197.2" r="3.5" fill="#10b981" />
                <text x="264" y="208" className="text-[10px] font-bold fill-emerald-700">C</text>
                <text x="292" y="168" className="text-[10px] font-bold fill-emerald-600">ív (⌢BC)</text>

                {/* Chord (Húr: top left segment boundary) */}
                <line x1="122.9" y1="62.9" x2="190" y2="35" stroke="#f59e0b" strokeWidth="2.5" />
                <circle cx="122.9" cy="62.9" r="3" fill="#f59e0b" />
                <circle cx="190" cy="35" r="3" fill="#f59e0b" />
                <text x="106" y="60" className="text-[10px] font-bold fill-amber-700">D</text>
                <text x="145" y="45" className="text-[10px] font-bold fill-amber-700">húr (h)</text>

                {/* Tangent line (Érintő egyenes: e at top point E(190, 35)) */}
                <line x1="110" y1="35" x2="310" y2="35" stroke="#9333ea" strokeWidth="2" strokeDasharray="3 3" />
                <text x="316" y="38" className="text-[11px] font-black fill-purple-700">e (érintő)</text>
                {/* Right angle symbol at E */}
                <path d="M 190 45 L 180 45 L 180 35" fill="none" stroke="#9333ea" strokeWidth="1.2" />
                <circle cx="185" cy="40" r="1.2" fill="#9333ea" />

                {/* Secant line (Szelő egyenes: s on the bottom left) */}
                <line x1="60" y1="185" x2="260" y2="235" stroke="#0284c7" strokeWidth="2" />
                <text x="30" y="182" className="text-[11px] font-black fill-sky-700">s (szelő)</text>
                <circle cx="118.2" cy="199.5" r="3" fill="#0284c7" />
                <circle cx="198.8" cy="219.7" r="3" fill="#0284c7" />

                {/* Center Point O */}
                <circle cx="190" cy="130" r="4.5" fill="#e11d48" />
                <circle cx="190" cy="130" r="2" fill="#ffffff" />
                <text x="178" y="146" className="text-[12px] font-mono font-black fill-slate-900 dark:fill-white">O</text>
              </svg>
            </div>

            {/* Legend pills & explanation */}
            <div className="w-full md:w-2/5 space-y-2 text-xs">
              <div className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">
                A kör elemeinek összefoglaló jelmagyarázata:
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <span className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 font-bold border border-rose-200/60">
                  🔴 Sugár (<MathText>r</MathText>)
                </span>
                <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 font-bold border border-indigo-200/60">
                  🔵 Átmérő (<MathText>d = 2r</MathText>)
                </span>
                <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold border border-amber-200/60">
                  🟡 Húr (<MathText>h ≤ d</MathText>)
                </span>
                <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-200/60">
                  🟢 Körív (<MathText>⌢BC</MathText>)
                </span>
                <span className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 font-bold border border-purple-200/60">
                  🟣 Érintő (<MathText>e ⊥ r</MathText>)
                </span>
                <span className="p-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 font-bold border border-sky-200/60">
                  🔷 Szelő (<MathText>2 metszéspont</MathText>)
                </span>
                <span className="p-1.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 font-bold border border-emerald-200/60">
                  🍕 Körcikk (<MathText>2 sugár + ív</MathText>)
                </span>
                <span className="p-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-300 font-bold border border-cyan-200/60">
                  ✂️ Körszelet (<MathText>húr + ív</MathText>)
                </span>
              </div>
              <p className="text-[11px] text-slate-500 italic pt-1">
                ⭐ Minden átmérő egyben húr is, méghozzá a körben meghúzható leghosszabb lehetséges húr!
              </p>
            </div>
          </div>
        </Card>

        {/* 1.1 VONALAS ELEMEK (1D SZAKASZOK ÉS ÍVEK) */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 mb-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            1. Vonalas elemek és egyenesek (1D szakaszok, egyenesek és ívek)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Sugár (r) */}
            <Card className="p-3.5 bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Sugár (r)</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">Szakasz</span>
                </div>
                <div className="bg-rose-50/50 dark:bg-slate-950 p-2 rounded-xl border border-rose-100 dark:border-slate-800 mb-2.5 flex justify-center">
                  <svg viewBox="0 0 120 70" className="w-28 h-16">
                    <circle cx="60" cy="35" r="26" fill="none" stroke="#e11d48" strokeWidth="1.8" />
                    <line x1="60" y1="35" x2="86" y2="35" stroke="#e11d48" strokeWidth="2.5" />
                    <circle cx="60" cy="35" r="3" fill="#e11d48" />
                    <circle cx="86" cy="35" r="3" fill="#e11d48" />
                    <text x="56" y="32" className="text-[10px] font-bold fill-slate-700">O</text>
                    <text x="89" y="38" className="text-[10px] font-bold fill-rose-700">P</text>
                    <text x="73" y="30" textAnchor="middle" className="text-[11px] font-serif italic font-bold fill-rose-600">r</text>
                  </svg>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  A kör középpontját (<MathText>O</MathText>) a körvonal tetszőleges pontjával (<MathText>P</MathText>) összekötő szakasz vagy annak hossza.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-rose-100 dark:border-slate-800 flex items-center justify-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50/60 dark:bg-rose-950/30 py-1.5 px-3 rounded-xl">
                <span className="font-serif italic text-sm">r</span>
                <span>=</span>
                <Fraction num={<span className="font-serif italic">d</span>} den="2" size="sm" className="font-bold text-rose-700 dark:text-rose-300" />
                <span className="text-[10px] font-normal text-rose-500">(átmérő fele)</span>
              </div>
            </Card>

            {/* Átmérő (d) */}
            <Card className="p-3.5 bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Átmérő (d)</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">Leghosszabb húr</span>
                </div>
                <div className="bg-indigo-50/50 dark:bg-slate-950 p-2 rounded-xl border border-indigo-100 dark:border-slate-800 mb-2.5 flex justify-center">
                  <svg viewBox="0 0 120 70" className="w-28 h-16">
                    <circle cx="60" cy="35" r="26" fill="none" stroke="#e11d48" strokeWidth="1.8" />
                    <line x1="34" y1="35" x2="86" y2="35" stroke="#4f46e5" strokeWidth="2.5" />
                    <circle cx="60" cy="35" r="2.5" fill="#e11d48" />
                    <circle cx="34" cy="35" r="2.5" fill="#4f46e5" />
                    <circle cx="86" cy="35" r="2.5" fill="#4f46e5" />
                    <text x="27" y="38" className="text-[10px] font-bold fill-indigo-700">A</text>
                    <text x="89" y="38" className="text-[10px] font-bold fill-indigo-700">B</text>
                    <text x="60" y="30" textAnchor="middle" className="text-[10px] font-mono font-bold fill-indigo-600">d = 2r</text>
                  </svg>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  A kör középpontján átmenő húr. Hossza a sugár kétszerese, és a kör két pontja közötti maximális távolság.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-indigo-100 dark:border-slate-800 flex items-center justify-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50/60 dark:bg-indigo-950/30 py-1.5 px-3 rounded-xl">
                <span className="font-serif italic text-sm">d</span>
                <span>= 2 ·</span>
                <span className="font-serif italic text-sm">r</span>
                <span className="text-[10px] font-normal text-indigo-500">(sugár kétszerese)</span>
              </div>
            </Card>

            {/* Húr (h) */}
            <Card className="p-3.5 bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Húr (h)</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Szakasz</span>
                </div>
                <div className="bg-amber-50/50 dark:bg-slate-950 p-2 rounded-xl border border-amber-100 dark:border-slate-800 mb-2.5 flex justify-center">
                  <svg viewBox="0 0 120 70" className="w-28 h-16">
                    <circle cx="60" cy="35" r="26" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
                    <line x1="42" y1="18" x2="84" y2="44" stroke="#f59e0b" strokeWidth="2.5" />
                    <circle cx="42" cy="18" r="2.5" fill="#f59e0b" />
                    <circle cx="84" cy="44" r="2.5" fill="#f59e0b" />
                    <circle cx="60" cy="35" r="2" fill="#94a3b8" />
                    <text x="35" y="16" className="text-[10px] font-bold fill-amber-700">A</text>
                    <text x="88" y="47" className="text-[10px] font-bold fill-amber-700">B</text>
                    <text x="66" y="27" className="text-[10px] font-serif italic font-bold fill-amber-700">h</text>
                  </svg>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  A körvonal bármely két pontját összekötő belső egyenes szakasz. Mindig igaz, hogy <MathText>h ≤ d</MathText>.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-amber-100 dark:border-slate-800 flex items-center justify-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50/60 dark:bg-amber-950/30 py-1.5 px-3 rounded-xl">
                <span className="font-serif italic text-sm">h</span>
                <span>≤ 2 ·</span>
                <span className="font-serif italic text-sm">r</span>
                <span className="text-[10px] font-normal text-amber-600">({<span className="font-serif italic">h</span>} ≤ {<span className="font-serif italic">d</span>})</span>
              </div>
            </Card>

            {/* Körív */}
            <Card className="p-3.5 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Körív</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Görbe</span>
                </div>
                <div className="bg-emerald-50/50 dark:bg-slate-950 p-2 rounded-xl border border-emerald-100 dark:border-slate-800 mb-2.5 flex justify-center">
                  <svg viewBox="0 0 120 70" className="w-28 h-16">
                    <circle cx="60" cy="35" r="26" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
                    <path d="M 78.4 15.8 A 26 26 0 0 1 86 35" fill="none" stroke="#10b981" strokeWidth="3.5" />
                    <circle cx="78.4" cy="15.8" r="3" fill="#10b981" />
                    <circle cx="86" cy="35" r="3" fill="#10b981" />
                    <text x="76" y="10" className="text-[10px] font-bold fill-emerald-700">A</text>
                    <text x="90" y="38" className="text-[10px] font-bold fill-emerald-700">B</text>
                    <text x="88" y="22" className="text-[10px] font-bold fill-emerald-700">ív</text>
                  </svg>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  A körvonal két pontja közé eső darabja. Két pont a körvonalat mindig két ívre bontja (kisebb és nagyobb ív).
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-emerald-100 dark:border-slate-800 flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/30 py-1.5 px-3 rounded-xl">
                <span>Jele: ⌢AB</span>
                <span className="text-[10px] font-normal text-emerald-600">vagy</span>
                <span className="font-serif italic text-sm">i</span>
              </div>
            </Card>

            {/* Középponti szög (α) */}
            <Card className="p-3.5 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Középponti szög</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">Szög (α)</span>
                </div>
                <div className="bg-blue-50/50 dark:bg-slate-950 p-2 rounded-xl border border-blue-100 dark:border-slate-800 mb-2.5 flex justify-center">
                  <svg viewBox="0 0 120 70" className="w-28 h-16">
                    <circle cx="60" cy="35" r="26" fill="none" stroke="#cbd5e1" strokeWidth="1.2" />
                    <line x1="60" y1="35" x2="86" y2="35" stroke="#2563eb" strokeWidth="2" />
                    <line x1="60" y1="35" x2="78.4" y2="15.8" stroke="#2563eb" strokeWidth="2" />
                    <path d="M 72 35 A 12 12 0 0 0 68 27" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                    <circle cx="60" cy="35" r="2.5" fill="#2563eb" />
                    <text x="54" y="39" className="text-[9px] font-bold fill-slate-700">O</text>
                    <text x="73" y="30" className="text-[9px] font-bold fill-blue-700">α</text>
                  </svg>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  Olyan szög, amelynek csúcsa a kör <MathText>O</MathText> középpontja, szárai pedig a kör sugarai.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-blue-100 dark:border-slate-800 flex items-center justify-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50/60 dark:bg-blue-950/30 py-1.5 px-3 rounded-xl">
                <span>Ívhányad:</span>
                <Fraction num="α" den="360°" size="sm" className="font-bold text-blue-700 dark:text-blue-300" />
              </div>
            </Card>

            {/* Érintő egyenes (e) */}
            <Card className="p-3.5 bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/60 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Érintő egyenes</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">1 közös pont</span>
                </div>
                <div className="bg-purple-50/50 dark:bg-slate-950 p-2 rounded-xl border border-purple-100 dark:border-slate-800 mb-2.5 flex justify-center">
                  <svg viewBox="0 0 120 70" className="w-28 h-16">
                    <circle cx="60" cy="38" r="24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
                    <line x1="20" y1="14" x2="100" y2="14" stroke="#9333ea" strokeWidth="2.2" />
                    <line x1="60" y1="38" x2="60" y2="14" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="2 2" />
                    <path d="M 60 20 L 54 20 L 54 14" fill="none" stroke="#9333ea" strokeWidth="1" />
                    <circle cx="60" cy="14" r="3" fill="#9333ea" />
                    <text x="64" y="24" className="text-[9px] font-bold fill-purple-800">E</text>
                    <text x="102" y="16" className="text-[10px] font-bold fill-purple-700">e</text>
                  </svg>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  Pontosan 1 közös pontja van a körrel (az <MathText>E</MathText> érintési pont). Mindig <strong>merőleges a sugárra</strong> (<MathText>e ⊥ r</MathText>).
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-purple-100 dark:border-slate-800 flex items-center justify-center gap-1.5 text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50/60 dark:bg-purple-950/30 py-1.5 px-3 rounded-xl">
                <span>e ⊥ r</span>
                <span className="text-[10px] font-normal text-purple-600">(d = r)</span>
              </div>
            </Card>

            {/* Szelő egyenes (s) */}
            <Card className="p-3.5 bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-900/60 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Szelő egyenes</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800">2 közös pont</span>
                </div>
                <div className="bg-sky-50/50 dark:bg-slate-950 p-2 rounded-xl border border-sky-100 dark:border-slate-800 mb-2.5 flex justify-center">
                  <svg viewBox="0 0 120 70" className="w-28 h-16">
                    <circle cx="60" cy="35" r="25" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
                    <line x1="20" y1="22" x2="105" y2="48" stroke="#0284c7" strokeWidth="2.2" />
                    <circle cx="38" cy="27.5" r="2.5" fill="#0284c7" />
                    <circle cx="82" cy="41" r="2.5" fill="#0284c7" />
                    <text x="32" y="24" className="text-[8px] font-bold fill-sky-800">A</text>
                    <text x="86" y="44" className="text-[8px] font-bold fill-sky-800">B</text>
                    <text x="104" y="46" className="text-[10px] font-bold fill-sky-700">s</text>
                  </svg>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  Két pontban metszi a körvonalat. A körbe eső szakasza a kör egy <strong>húrja</strong>. Távolsága a középponttól: <MathText>d &lt; r</MathText>.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-sky-100 dark:border-slate-800 flex items-center justify-center gap-1.5 text-xs font-bold text-sky-700 dark:text-sky-300 bg-sky-50/60 dark:bg-sky-950/30 py-1.5 px-3 rounded-xl">
                <span>d &lt; r</span>
                <span className="text-[10px] font-normal text-sky-600">(2 metszéspont)</span>
              </div>
            </Card>

            {/* Elkerülő egyenes */}
            <Card className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Elkerülő egyenes</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">0 közös pont</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-100 dark:border-slate-800 mb-2.5 flex justify-center">
                  <svg viewBox="0 0 120 70" className="w-28 h-16">
                    <circle cx="60" cy="40" r="22" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
                    <line x1="15" y1="10" x2="105" y2="10" stroke="#64748b" strokeWidth="2" />
                    <line x1="60" y1="40" x2="60" y2="10" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="2 2" />
                    <text x="64" y="26" className="text-[8px] font-bold fill-slate-500">d &gt; r</text>
                    <text x="107" y="13" className="text-[10px] font-bold fill-slate-600">e</text>
                  </svg>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  Messzebb halad el a középponttól, mint a sugár (<MathText>d &gt; r</MathText>). Nincs egyetlen közös pontja sem a körvonallal.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 py-1.5 px-3 rounded-xl">
                <span>d &gt; r</span>
                <span className="text-[10px] font-normal text-slate-500">(0 közös pont)</span>
              </div>
            </Card>
          </div>
        </div>

        {/* 1.2 SÍKRÉSZEK ÉS TERÜLETEK (2D RÉSZEK A KÖRLAPON) */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 mb-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            2. Síkrészek és területek (2D területek a körlapon)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Körlap (Körlemez) */}
            <Card className="p-3.5 bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Körlap</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">Teljes síkidom</span>
                </div>
                <div className="bg-rose-50/50 dark:bg-slate-950 p-2 rounded-xl border border-rose-100 dark:border-slate-800 mb-2.5 flex justify-center">
                  <svg viewBox="0 0 120 70" className="w-28 h-16">
                    <circle cx="60" cy="35" r="26" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
                    <circle cx="60" cy="35" r="2.5" fill="#e11d48" />
                    <text x="56" y="39" className="text-[9px] font-bold fill-slate-800">O</text>
                  </svg>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  A körvonal és az általa közbezárt teljes belső síkrész együttese. Területe van!
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-rose-100 dark:border-slate-800 flex items-center justify-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50/60 dark:bg-rose-950/30 py-1.5 px-2 rounded-xl text-center">
                <span>T =</span>
                <span className="font-serif italic text-sm">r</span>
                <sup>2</sup>
                <span>· π</span>
              </div>
            </Card>

            {/* Körcikk */}
            <Card className="p-3.5 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Körcikk</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">🍕 Pizzaszelet</span>
                </div>
                <div className="bg-emerald-50/50 dark:bg-slate-950 p-2 rounded-xl border border-emerald-100 dark:border-slate-800 mb-2.5 flex justify-center">
                  <svg viewBox="0 0 120 70" className="w-28 h-16">
                    <circle cx="60" cy="35" r="26" fill="none" stroke="#cbd5e1" strokeWidth="1.2" />
                    <path d="M 60 35 L 86 35 A 26 26 0 0 0 76 14 Z" fill="#10b981" fillOpacity="0.45" stroke="#059669" strokeWidth="2" />
                    <circle cx="60" cy="35" r="2" fill="#059669" />
                    <text x="54" y="38" className="text-[8px] font-bold fill-slate-700">O</text>
                    <text x="68" y="31" className="text-[9px] font-bold fill-emerald-800">α</text>
                  </svg>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  <strong>2 sugár és a hozzájuk tartozó körív</strong> által határolt síkrész. Beér a középpontig!
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-emerald-100 dark:border-slate-800 flex items-center justify-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/30 py-1 px-2 rounded-xl text-center">
                <span>T =</span>
                <span className="font-serif italic text-sm">r</span>
                <sup>2</sup>
                <span>· π ·</span>
                <Fraction num="α" den="360°" size="sm" className="font-bold text-emerald-800 dark:text-emerald-300" />
              </div>
            </Card>

            {/* Körszelet */}
            <Card className="p-3.5 bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/60 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Körszelet</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">✂️ Levágott rész</span>
                </div>
                <div className="bg-teal-50/50 dark:bg-slate-950 p-2 rounded-xl border border-teal-100 dark:border-slate-800 mb-2.5 flex justify-center">
                  <svg viewBox="0 0 120 70" className="w-28 h-16">
                    <circle cx="60" cy="35" r="26" fill="none" stroke="#cbd5e1" strokeWidth="1.2" />
                    <path d="M 41 18 A 26 26 0 0 1 82 23 Z" fill="#14b8a6" fillOpacity="0.45" stroke="#0f766e" strokeWidth="2" />
                    <line x1="41" y1="18" x2="82" y2="23" stroke="#0f766e" strokeWidth="2" />
                    <circle cx="60" cy="35" r="2" fill="#94a3b8" />
                    <text x="58" y="45" className="text-[8px] font-bold fill-slate-400">O</text>
                  </svg>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  <strong>Egy húr és a hozzá tartozó körív</strong> által határolt síkrész. Nem ér be a középpontig!
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-teal-100 dark:border-slate-800 flex items-center justify-center gap-1 text-[11px] font-bold text-teal-800 dark:text-teal-300 bg-teal-50/60 dark:bg-teal-950/30 py-1.5 px-2 rounded-xl text-center">
                <span>T = T<span className="text-[9px]">cikk</span> − T<span className="text-[9px]">háromszög</span></span>
              </div>
            </Card>

            {/* Körgyűrű */}
            <Card className="p-3.5 bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/60 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Körgyűrű</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">⭕ Fánk alak</span>
                </div>
                <div className="bg-purple-50/50 dark:bg-slate-950 p-2 rounded-xl border border-purple-100 dark:border-slate-800 mb-2.5 flex justify-center">
                  <svg viewBox="0 0 120 70" className="w-28 h-16">
                    <circle cx="60" cy="35" r="28" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1.5" />
                    <circle cx="60" cy="35" r="14" fill="#ffffff" stroke="#a855f7" strokeWidth="1.5" />
                    <circle cx="60" cy="35" r="1.5" fill="#a855f7" />
                    <line x1="60" y1="35" x2="74" y2="35" stroke="#7e22ce" strokeWidth="1.2" />
                    <line x1="74" y1="35" x2="88" y2="35" stroke="#e11d48" strokeWidth="2" />
                    <text x="65" y="32" className="text-[8px] font-bold fill-purple-700">r</text>
                    <text x="78" y="32" className="text-[8px] font-bold fill-rose-600">d</text>
                  </svg>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  <strong>2 koncentrikus kör</strong> közötti síkrész. Szélessége: <MathText>R − r</MathText>.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-purple-100 dark:border-slate-800 flex items-center justify-center gap-1 text-[11px] font-bold text-purple-800 dark:text-purple-300 bg-purple-50/60 dark:bg-purple-950/30 py-1.5 px-2 rounded-xl text-center">
                <span>T = (R² − r²) · π</span>
              </div>
            </Card>

            {/* Félkör és Félkörlap */}
            <Card className="p-3.5 bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-900/60 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Félkörlap</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800">Speciális</span>
                </div>
                <div className="bg-sky-50/50 dark:bg-slate-950 p-2 rounded-xl border border-sky-100 dark:border-slate-800 mb-2.5 flex justify-center">
                  <svg viewBox="0 0 120 70" className="w-28 h-16">
                    <path d="M 34 45 A 26 26 0 0 1 86 45 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
                    <line x1="34" y1="45" x2="86" y2="45" stroke="#0284c7" strokeWidth="2" />
                    <circle cx="60" cy="45" r="2" fill="#0284c7" />
                    <text x="57" y="55" className="text-[8px] font-bold fill-sky-800">O</text>
                  </svg>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  Az átmérő és a félkörív által határolt alakzat (180°-os körcikk és körszelet egyszerre).
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-sky-100 dark:border-slate-800 flex items-center justify-center gap-1.5 text-xs font-bold text-sky-800 dark:text-sky-300 bg-sky-50/60 dark:bg-sky-950/30 py-1.5 px-2 rounded-xl text-center">
                <span>T =</span>
                <Fraction num={<span className="font-serif italic">r² · π</span>} den="2" size="sm" className="font-bold text-sky-800 dark:text-sky-300" />
              </div>
            </Card>
          </div>
        </div>

        {/* 1.3 KÖRFOGALMAK ÉS KÉPLETEK MESTER-TÁBLÁZATA */}
        <TheoryTable
          title="A Kör Elemeinek és Képleteinek Összefoglaló Rendszere"
          headers={[
            'Megnevezés',
            'Jelölés',
            'Típus',
            'Pontos képlet / összefüggés',
            'Geometriai jelentés'
          ]}
          rows={[
            ['Sugár', 'r', '1D Szakasz', 'r = d / 2', 'Középpont és körvonal távolsága'],
            ['Átmérő', 'd', '1D Szakasz', 'd = 2 · r', 'Középponton átmenő leghosszabb húr'],
            ['Húr', 'h', '1D Szakasz', 'h ≤ 2r = d', 'Kör két tetszőleges pontját köti össze'],
            ['Kör kerülete', 'K', '1D Hossz', 'K = 2 · r · π = d · π', 'A körvonal teljes hossza'],
            ['Körív hossza', 'i', '1D Hossz', 'i = 2 · r · π · (α / 360°)', 'Az α középponti szöghöz tartozó ív'],
            ['Körlap területe', 'T', '2D Terület', 'T = r² · π', 'A körvonal által bezárt teljes terület'],
            ['Körcikk területe', 'Tcikk', '2D Terület', 'Tcikk = r² · π · (α / 360°)', 'Két sugár és egy körív által határolt síkrész'],
            ['Körgyűrű területe', 'Tgyűrű', '2D Terület', 'Tgyűrű = (R² − r²) · π', 'Két koncentrikus kör közé zárt terület']
          ]}
        />
      </TheorySection>

      {/* 2. SZEKCIÓ: A KÖR ÉS A KÖRLAP DEFINÍCIÓJA, SZIMMETRIÁK */}
      <TheorySection
        number={2}
        title="A Kör és a Körlap Definíciója, Szimmetriái"
        badgeColor="rose"
        icon={<BookOpen className="w-5 h-5 text-rose-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TheoryCard
            title="A Kör (Körvonal)"
            variant="rose"
            badge="Halmaz / 1D Vonal"
            properties={[
              'Középpont: A sík rögzített O pontja.',
              'Sugár (r): Rögzített pozitív valós távolság (r > 0).',
              'Definíció: A sík azon pontjainak halmaza, amelyek az O ponttól pontosan r távolságra vannak: |OP| = r.',
              'Jelölése: k(O, r)'
            ]}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              A kör <strong>egydimenziós zárt görbe</strong>. Területe nulla, pontjai pontosan <MathText>|OP| = r</MathText> távolságra esnek a középponttól.
            </p>
          </TheoryCard>

          <TheoryCard
            title="A Körlap (Körlemez)"
            variant="amber"
            badge="Síkidom / 2D Terület"
            properties={[
              'Definíció: A sík azon pontjai, amelyek távolsága a középponttól legfeljebb r: |OP| ≤ r.',
              'Belső pontok: |OP| < r (a kör belseje).',
              'Határpontok: |OP| = r (maga a körvonal).',
              'Külső pontok: |OP| > r (a körön kívül eső pontok).'
            ]}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              A körlap <strong>kétdimenziós síkrész</strong>, amely a körvonalat és annak egész belső területét magában foglalja.
            </p>
          </TheoryCard>
        </div>

        {/* Kör szimmetriái */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border border-rose-200 dark:border-rose-900/60">
          <h4 className="font-bold text-rose-950 dark:text-rose-200 text-sm sm:text-base flex items-center gap-2 mb-2">
            <RotateCw className="w-5 h-5 text-rose-600" />
            A kör páratlan szimmetriái:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-rose-100 dark:border-slate-800">
              <strong className="text-rose-700 dark:text-rose-300 block mb-1">
                1. Tengelyes szimmetria
              </strong>
              A körnek <strong>végtelen sok szimmetriatengelye</strong> van: minden olyan egyenes tengely, amely átmegy a középpontján (<MathText>O</MathText>).
            </div>
            <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-rose-100 dark:border-slate-800">
              <strong className="text-rose-700 dark:text-rose-300 block mb-1">
                2. Középpontos szimmetria
              </strong>
              A kör <strong>középpontosan szimmetrikus</strong> saját középpontjára (<MathText>O</MathText>), hiszen bármely pont 180°-os elforgatottja is a körön marad.
            </div>
            <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-rose-100 dark:border-slate-800">
              <strong className="text-rose-700 dark:text-rose-300 block mb-1">
                3. Forgásszimmetria
              </strong>
              Az <MathText>O</MathText> pont körül <strong>tetszőleges szöggel</strong> elforgatva a kör mindig önmagába megy át.
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: INTERAKTÍV KÖR LABORATÓRIUM */}
      <TheorySection
        number={3}
        title="Interaktív Kör Laboratórium"
        badgeColor="rose"
        icon={<Sliders className="w-5 h-5 text-rose-600" />}
      >
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-rose-50/40 via-white to-pink-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-rose-950/20 border-rose-200 dark:border-rose-900/50 shadow-sm">
          {/* Lab Tab Buttons */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-rose-100 dark:border-rose-900/40 pb-3">
            <Button
              variant={labTab === 'parts' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLabTab('parts')}
              className={labTab === 'parts' ? 'bg-rose-600 hover:bg-rose-700 text-white' : ''}
            >
              <CircleIcon className="w-4 h-4 mr-1.5" /> 1. Kör elemei & részei
            </Button>
            <Button
              variant={labTab === 'line' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLabTab('line')}
              className={labTab === 'line' ? 'bg-rose-600 hover:bg-rose-700 text-white' : ''}
            >
              <Ruler className="w-4 h-4 mr-1.5" /> 2. Egyenes és kör helyzete
            </Button>
            <Button
              variant={labTab === 'two-circles' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLabTab('two-circles')}
              className={labTab === 'two-circles' ? 'bg-rose-600 hover:bg-rose-700 text-white' : ''}
            >
              <CircleDot className="w-4 h-4 mr-1.5" /> 3. Két kör kölcsönös helyzete
            </Button>
          </div>

          {/* TAB 1: KÖR ELEMEI ÉS RÉSZEI */}
          {labTab === 'parts' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Controls */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Sugár nagysága (r):</span>
                    <span className="text-rose-600 font-mono font-bold">{radius} px (átmérő: {2 * radius} px)</span>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="75"
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Körcikk / ív szöge (α):</span>
                    <span className="text-rose-600 font-mono font-bold">{sectorAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="270"
                    value={sectorAngle}
                    onChange={(e) => setSectorAngle(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>

                <div className="pt-2">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Látható elemek bekapcsolása:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <Button
                      variant={showRadius ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setShowRadius(!showRadius)}
                      className="h-8 justify-start text-[11px]"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-2" />
                      Sugár (r)
                    </Button>
                    <Button
                      variant={showDiameter ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setShowDiameter(!showDiameter)}
                      className="h-8 justify-start text-[11px]"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mr-2" />
                      Átmérő (d = 2r)
                    </Button>
                    <Button
                      variant={showChord ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setShowChord(!showChord)}
                      className="h-8 justify-start text-[11px]"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-2" />
                      Húr (AB)
                    </Button>
                    <Button
                      variant={showSector ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => {
                        setShowSector(!showSector);
                        if (!showSector) setShowSegment(false);
                      }}
                      className="h-8 justify-start text-[11px]"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2" />
                      Körcikk (szektor)
                    </Button>
                    <Button
                      variant={showSegment ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => {
                        setShowSegment(!showSegment);
                        if (!showSegment) setShowSector(false);
                      }}
                      className="h-8 justify-start text-[11px]"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-500 mr-2" />
                      Körszelet (szegmens)
                    </Button>
                    <Button
                      variant={showAnnulus ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setShowAnnulus(!showAnnulus)}
                      className="h-8 justify-start text-[11px]"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500 mr-2" />
                      Körgyűrű
                    </Button>
                  </div>
                </div>
              </div>

              {/* SVG Canvas */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center bg-white dark:bg-slate-950 p-4 rounded-2xl border border-rose-200 dark:border-slate-800 shadow-inner">
                <svg viewBox="0 0 300 300" className="w-full max-w-[280px] sm:max-w-[320px] aspect-square">
                  <defs>
                    <radialGradient id="circleGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffe4e6" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#fecdd3" stopOpacity="0.2" />
                    </radialGradient>
                  </defs>

                  {/* Annulus */}
                  {showAnnulus && (
                    <g>
                      <circle cx={cx} cy={cy} r={radius} fill="#f3e8ff" stroke="#a855f7" strokeWidth="1.5" />
                      <circle cx={cx} cy={cy} r={radius * 0.55} fill="#ffffff" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x={cx} y={cy - radius * 0.72} textAnchor="middle" className="text-[10px] font-bold fill-purple-700">
                        Körgyűrű területe
                      </text>
                    </g>
                  )}

                  {/* Main Circle Disk */}
                  {!showAnnulus && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={radius}
                      fill="url(#circleGrad)"
                      stroke="#e11d48"
                      strokeWidth="2.5"
                    />
                  )}

                  {/* Sector */}
                  {showSector && (
                    <path
                      d={`M ${cx} ${cy} L ${cx + radius} ${cy} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${arcX} ${arcY} Z`}
                      fill="#10b981"
                      fillOpacity="0.35"
                      stroke="#059669"
                      strokeWidth="2"
                    />
                  )}

                  {/* Segment */}
                  {showSegment && (
                    <path
                      d={`M ${cx + radius} ${cy} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${arcX} ${arcY} Z`}
                      fill="#14b8a6"
                      fillOpacity="0.45"
                      stroke="#0d9488"
                      strokeWidth="2"
                    />
                  )}

                  {/* Diameter */}
                  {showDiameter && (
                    <g>
                      <line
                        x1={cx - radius}
                        y1={cy}
                        x2={cx + radius}
                        y2={cy}
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <circle cx={cx - radius} cy={cy} r="3" fill="#6366f1" />
                      <circle cx={cx + radius} cy={cy} r="3" fill="#6366f1" />
                      <text x={cx + radius + 6} y={cy + 4} className="text-[10px] font-bold fill-indigo-600">
                        B
                      </text>
                      <text x={cx - radius - 12} y={cy + 4} className="text-[10px] font-bold fill-indigo-600">
                        A
                      </text>
                      <text x={cx - radius / 2} y={cy - 6} className="text-[10px] font-mono font-bold fill-indigo-700">
                        d = 2r
                      </text>
                    </g>
                  )}

                  {/* Radius */}
                  {showRadius && (
                    <g>
                      <line
                        x1={cx}
                        y1={cy}
                        x2={arcX}
                        y2={arcY}
                        stroke="#e11d48"
                        strokeWidth="2.5"
                      />
                      <circle cx={arcX} cy={arcY} r="3.5" fill="#e11d48" />
                      <text x={arcX + 6} y={arcY - 4} className="text-[10px] font-bold fill-rose-700">
                        P
                      </text>
                      <text
                        x={(cx + arcX) / 2 - 8}
                        y={(cy + arcY) / 2 - 6}
                        className="text-[11px] font-mono font-black fill-rose-600"
                      >
                        r
                      </text>
                    </g>
                  )}

                  {/* Chord */}
                  {showChord && (
                    <g>
                      <line
                        x1={cx + radius}
                        y1={cy}
                        x2={arcX}
                        y2={arcY}
                        stroke="#f59e0b"
                        strokeWidth="2.5"
                        strokeDasharray="4 2"
                      />
                      <text
                        x={(cx + radius + arcX) / 2 + 8}
                        y={(cy + arcY) / 2 + 4}
                        className="text-[10px] font-mono font-bold fill-amber-700"
                      >
                        Húr
                      </text>
                    </g>
                  )}

                  {/* Center O */}
                  <circle cx={cx} cy={cy} r="4.5" fill="#e11d48" />
                  <circle cx={cx} cy={cy} r="2" fill="#ffffff" />
                  <text x={cx - 14} y={cy - 6} className="text-[12px] font-mono font-black fill-slate-800 dark:fill-slate-100">
                    O
                  </text>
                </svg>

                {/* Legend badges */}
                <div className="flex flex-wrap justify-center gap-2 mt-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">
                    Kör: k(O, r)
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold">
                    Átmérő: d = 2 · r
                  </span>
                  {showSector && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      Körcikk (α = {sectorAngle}°)
                    </span>
                  )}
                  {showSegment && (
                    <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">
                      Körszelet (húr + ív)
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EGYENES ÉS KÖR HELYZETE */}
          {labTab === 'line' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="p-3 rounded-xl border font-bold text-sm text-center transition-all">
                  <div className={`p-2 rounded-lg border ${lineStatusColor}`}>
                    {lineStatusText}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Középpont távolsága az egyenestől d(O, e):</span>
                    <span className="text-rose-600 font-mono font-bold">{lineDist} px (r = {circleR} px)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="95"
                    value={lineDist}
                    onChange={(e) => setLineDist(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>d = 0 (átmérő)</span>
                    <span className="font-bold text-amber-600">d = 60 (érintő)</span>
                    <span>d &gt; 60 (elkerülő)</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-sky-500 shrink-0" />
                    <span><strong>d &lt; r: Szelő</strong> – 2 metszéspont, a kör belsejébe metsz.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                    <span><strong>d = r: Érintő</strong> – Pontosan 1 közös pont (E), és <em>e ⊥ r</em>!</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-slate-400 shrink-0" />
                    <span><strong>d &gt; r: Elkerülő</strong> – Nincs közös pont a körvonallal.</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setLineDist(35)} className="text-xs flex-1">
                    Szelő (d=35)
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setLineDist(60)} className="text-xs flex-1 border-amber-300 bg-amber-50/50">
                    Érintő (d=60)
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setLineDist(82)} className="text-xs flex-1">
                    Elkerülő (d=82)
                  </Button>
                </div>
              </div>

              {/* SVG Canvas for Line and Circle */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center bg-white dark:bg-slate-950 p-4 rounded-2xl border border-rose-200 dark:border-slate-800 shadow-inner">
                <svg viewBox="0 0 300 300" className="w-full max-w-[280px] sm:max-w-[320px] aspect-square">
                  <circle
                    cx={cx}
                    cy={cy}
                    r={circleR}
                    fill="#ffe4e6"
                    fillOpacity="0.3"
                    stroke="#e11d48"
                    strokeWidth="2.5"
                  />
                  <circle cx={cx} cy={cy} r="4" fill="#e11d48" />
                  <text x={cx - 14} y={cy - 6} className="text-[11px] font-bold fill-slate-700">
                    O
                  </text>
                  <line
                    x1={cx}
                    y1={cy}
                    x2={cx}
                    y2={cy + lineDist}
                    stroke="#8b5cf6"
                    strokeWidth="1.8"
                    strokeDasharray="3 3"
                  />
                  <text x={cx + 6} y={cy + lineDist / 2 + 3} className="text-[10px] font-bold fill-purple-600">
                    d = {lineDist}
                  </text>
                  <line
                    x1="20"
                    y1={cy + lineDist}
                    x2="280"
                    y2={cy + lineDist}
                    stroke={lineDist === circleR ? '#d97706' : lineDist < circleR ? '#0284c7' : '#64748b'}
                    strokeWidth={lineDist === circleR ? '3' : '2'}
                  />
                  <text x={260} y={cy + lineDist - 6} className="text-[11px] font-bold fill-slate-700">
                    e
                  </text>

                  {/* Intersections */}
                  {lineIntersections === 2 && (
                    <>
                      {(() => {
                        const chordHalf = Math.sqrt(circleR * circleR - lineDist * lineDist);
                        return (
                          <>
                            <circle cx={cx - chordHalf} cy={cy + lineDist} r="4" fill="#0284c7" />
                            <circle cx={cx + chordHalf} cy={cy + lineDist} r="4" fill="#0284c7" />
                            <line
                              x1={cx - chordHalf}
                              y1={cy + lineDist}
                              x2={cx + chordHalf}
                              y2={cy + lineDist}
                              stroke="#0284c7"
                              strokeWidth="3.5"
                            />
                          </>
                        );
                      })()}
                    </>
                  )}

                  {lineIntersections === 1 && (
                    <g>
                      <circle cx={cx} cy={cy + lineDist} r="5" fill="#d97706" />
                      <circle cx={cx} cy={cy + lineDist} r="2" fill="#ffffff" />
                      <text x={cx + 8} y={cy + lineDist + 16} className="text-[11px] font-bold fill-amber-700">
                        E (érintési pont)
                      </text>
                    </g>
                  )}
                </svg>
              </div>
            </div>
          )}

          {/* TAB 3: KÉT KÖR KÖLCSÖNÖS HELYZETE */}
          {labTab === 'two-circles' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className={`p-2.5 rounded-xl border text-center font-bold text-xs sm:text-sm ${twoCirclesBadgeColor}`}>
                  {twoCirclesStatus}
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Középpontok távolsága d = |O₁O₂|:</span>
                    <span className="text-rose-600 font-mono font-bold">{circleDist} px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="115"
                    value={circleDist}
                    onChange={(e) => setCircleDist(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>0 (koncentrikus)</span>
                    <span className="text-amber-600 font-bold">20 (belül érint)</span>
                    <span className="text-emerald-600 font-bold">50 (metsz)</span>
                    <span className="text-amber-600 font-bold">80 (kívül érint)</span>
                    <span>&gt;80</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    Fix sugarak: r₁ = 50 px, r₂ = 30 px
                  </div>
                  <div>• r₁ - r₂ = 20 px (belső érintési határ)</div>
                  <div>• r₁ + r₂ = 80 px (külső érintési határ)</div>
                  <div className="pt-1 font-bold text-rose-600">
                    Közös pontok száma: {twoCirclesIntersections} db
                  </div>
                </div>

                {/* Preset quick buttons */}
                <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                  <Button size="sm" variant="outline" onClick={() => setCircleDist(0)} className="h-7 text-[10px] px-1">
                    d=0 (Koncentrikus)
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setCircleDist(20)} className="h-7 text-[10px] px-1 border-amber-300 bg-amber-50/50">
                    d=20 (Belül érint)
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setCircleDist(50)} className="h-7 text-[10px] px-1 border-emerald-300 bg-emerald-50/50">
                    d=50 (Metsző)
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setCircleDist(80)} className="h-7 text-[10px] px-1 border-amber-300 bg-amber-50/50">
                    d=80 (Kívül érint)
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setCircleDist(105)} className="h-7 text-[10px] px-1">
                    d=105 (Külső)
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setCircleDist(10)} className="h-7 text-[10px] px-1">
                    d=10 (Belső)
                  </Button>
                </div>
              </div>

              {/* SVG Canvas for Two Circles */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center bg-white dark:bg-slate-950 p-4 rounded-2xl border border-rose-200 dark:border-slate-800 shadow-inner">
                <svg viewBox="0 0 320 240" className="w-full max-w-[320px] aspect-[4/3]">
                  <circle
                    cx="110"
                    cy="120"
                    r={r1}
                    fill="#fee2e2"
                    fillOpacity="0.3"
                    stroke="#e11d48"
                    strokeWidth="2"
                  />
                  <circle cx="110" cy="120" r="3.5" fill="#e11d48" />
                  <text x="104" y="112" className="text-[10px] font-bold fill-rose-700">
                    O₁
                  </text>
                  <circle
                    cx={110 + circleDist}
                    cy="120"
                    r={r2}
                    fill="#e0e7ff"
                    fillOpacity="0.3"
                    stroke="#4f46e5"
                    strokeWidth="2"
                  />
                  <circle cx={110 + circleDist} cy="120" r="3.5" fill="#4f46e5" />
                  <text x={110 + circleDist - 6} y="112" className="text-[10px] font-bold fill-indigo-700">
                    O₂
                  </text>
                  <line
                    x1="110"
                    y1="120"
                    x2={110 + circleDist}
                    y2="120"
                    stroke="#059669"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                  />
                  {circleDist > 15 && (
                    <text
                      x={110 + circleDist / 2}
                      y="134"
                      textAnchor="middle"
                      className="text-[10px] font-mono font-bold fill-emerald-700"
                    >
                      d = {circleDist}
                    </text>
                  )}
                </svg>
              </div>
            </div>
          )}
        </Card>
      </TheorySection>

      {/* 4. SZEKCIÓ: EGYENES ÉS KÖR HELYZETE */}
      <TheorySection
        number={4}
        title="Egyenes és Kör Kölcsönös Helyzete"
        badgeColor="rose"
        icon={<Ruler className="w-5 h-5 text-rose-600" />}
      >
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
          Legyen a kör középpontja <MathText>O</MathText>, sugara <MathText>r</MathText>, az <MathText>e</MathText> egyenes távolsága a középponttól pedig <MathText>d = d(O, e)</MathText>.
          A távolság és a sugár nagyságviszonya egyértelműen meghatározza a közös pontok számát:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <TheoryCard
            title="1. Szelő Egyenes (s)"
            variant="sky"
            badge="2 közös pont"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="p-2 rounded-lg bg-sky-50 dark:bg-slate-900 border border-sky-200 font-bold text-sky-800 text-center">
                d &lt; r
              </div>
              <p>
                Az egyenes közelebb van a középponthoz, mint a sugár, ezért <strong>két pontban (A és B)</strong> metszi a körvonalat.
              </p>
              <p className="text-[11px] text-slate-500">
                A két metszéspont közötti szakasz (<MathText>AB</MathText>) a kör húrja.
              </p>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Érintő Egyenes (e)"
            variant="amber"
            badge="1 közös pont"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-slate-900 border border-amber-200 font-bold text-amber-800 text-center">
                d = r
              </div>
              <p>
                Az egyenes távolsága pontosan megegyezik a sugárral. Egyetlen közös pontja van a körrel, az <strong>érintési pont (E)</strong>.
              </p>
              <div className="p-2 rounded-lg bg-amber-100 text-amber-900 text-xs font-bold">
                ⭐ ALAPTÉTEL: Az érintő egyenes mindig merőleges az érintési pontba húzott sugárra: e ⊥ r!
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="3. Elkerülő Egyenes"
            variant="slate"
            badge="0 közös pont"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 font-bold text-slate-700 text-center">
                d &gt; r
              </div>
              <p>
                Az egyenes messzebb van a középponttól, mint a sugár. Egyetlen közös pontja sincs a körvonallal és a körlappal sem.
              </p>
              <p className="text-[11px] text-slate-500">
                Az egyenes összes pontja a kör külső pontja.
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: KÉT KÖR KÖLCSÖNÖS HELYZETE */}
      <TheorySection
        number={5}
        title="Két Kör Kölcsönös Helyzete"
        badgeColor="rose"
        icon={<CircleDot className="w-5 h-5 text-rose-600" />}
      >
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
          Legyen a két kör középpontja <MathText>O₁</MathText> és <MathText>O₂</MathText>, sugaraik <MathText>r₁</MathText> és <MathText>r₂</MathText> (ahol <MathText>r₁ ≥ r₂</MathText>),
          a középpontjaik távolsága pedig <MathText>d = |O₁O₂|</MathText>. Összesen 6 különböző geometriai elrendeződés lehetséges:
        </p>

        <TheoryTable
          title="Két Kör Kölcsönös Helyzetének Teljes Rendszere"
          headers={[
            'Helyzet neve',
            'Középpont-távolság (d)',
            'Közös pontok',
            'Jellemző tulajdonság'
          ]}
          rows={[
            ['1. Koncentrikus körök', 'd = 0', '0 db', 'Közös a középpontjuk (körgyűrű)'],
            ['2. Belső kör (metszés nélkül)', 'd < r₁ - r₂', '0 db', 'A kisebb kör teljesen a nagyobb belsejében van'],
            ['3. Belülről érintkező körök', 'd = r₁ - r₂', '1 db', 'Egyetlen pontban érintik egymást belülről'],
            ['4. Metsző körök', 'r₁ - r₂ < d < r₁ + r₂', '2 db', 'Két pontban metszik egymást (közös húr)'],
            ['5. Kívülről érintkező körök', 'd = r₁ + r₂', '1 db', 'Egyetlen pontban érintik egymást kívülről'],
            ['6. Egymáson kívül lévő körök', 'd > r₁ + r₂', '0 db', 'Teljesen elválnak egymástól, nincs közös pont']
          ]}
        />
      </TheorySection>

      {/* 6. SZEKCIÓ: THALÉSZ-TÉTEL ÉS DERÉKSZÖGEK */}
      <TheorySection
        number={6}
        title="A Thalész-tétel: A Kör és a Derékszög Titka"
        badgeColor="rose"
        icon={<Lightbulb className="w-5 h-5 text-rose-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <p>
              A geometria egyik leghíresebb és leggyakrabban használt tétele Thalész nevéhez fűződik:
            </p>
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-slate-900 border-2 border-rose-300 dark:border-rose-800 text-slate-900 dark:text-white font-bold">
              📐 Thalész-tétel: Ha a kör tetszőleges átmérőjének (AB) két végpontját összekötjük a körvonal bármely más (C) pontjával, a keletkező háromszög mindig DERÉKSZÖGŰ lesz a C csúcsnál (γ = 90°)!
            </div>
            <p className="flex items-center flex-wrap gap-1 leading-relaxed">
              <span><strong>A tétel megfordítása is igaz:</strong> Bármely derékszögű háromszög köré írt körének középpontja az átfogó felezőpontja, a kör sugara pedig az átfogó fele:</span>
              <span className="inline-flex items-center font-bold text-rose-600 gap-1.5 mx-1 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-xl border border-rose-200 dark:border-rose-900/60">
                <span className="font-serif italic text-sm">r</span>
                <span>=</span>
                <Fraction num={<span className="font-serif italic">c</span>} den="2" size="sm" className="font-bold text-rose-600" />
              </span>
              <span>.</span>
            </p>
          </div>

          <div className="md:col-span-5 bg-white dark:bg-slate-950 p-4 rounded-2xl border border-rose-200 dark:border-slate-800 flex flex-col items-center">
            <svg viewBox="0 0 200 130" className="w-full max-w-[200px]">
              <path d="M 20 100 A 80 80 0 0 1 180 100 Z" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
              <line x1="20" y1="100" x2="180" y2="100" stroke="#1e293b" strokeWidth="2.5" />
              <line x1="20" y1="100" x2="140" y2="36" stroke="#2563eb" strokeWidth="2" />
              <line x1="180" y1="100" x2="140" y2="36" stroke="#2563eb" strokeWidth="2" />
              <circle cx="140" cy="36" r="3.5" fill="#2563eb" />
              <text x="144" y="30" className="text-[10px] font-bold fill-blue-700">C (90°)</text>
              <circle cx="20" cy="100" r="3" fill="#1e293b" />
              <text x="12" y="114" className="text-[10px] font-bold fill-slate-700">A</text>
              <circle cx="180" cy="100" r="3" fill="#1e293b" />
              <text x="184" y="114" className="text-[10px] font-bold fill-slate-700">B</text>
              <circle cx="100" cy="100" r="3" fill="#e11d48" />
              <text x="96" y="116" className="text-[10px] font-bold fill-rose-600">O</text>
            </svg>
            <span className="text-[11px] text-slate-500 text-center mt-2">
              Az AB átmérő feletti kerületi szög mindig pontosan 90°.
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 7. SZEKCIÓ: KIDOLGOZOTT MINTAFELADATOK */}
      <TheorySection
        number={7}
        title="Lépésről Lépésre Kidolgozott Mintapéldák"
        badgeColor="rose"
        icon={<BookOpen className="w-5 h-5 text-rose-600" />}
      >
        <div className="space-y-4">
          {/* Example 1 */}
          <Card className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                1. Mintapélda
              </span>
              <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                Sugár, átmérő és húr viszonya
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3">
              Egy kör sugara <MathText>r = 7 cm</MathText>. Mekkora a kör átmérője? Lehet-e ebben a körben egy olyan húr, amelynek hossza <MathText>15 cm</MathText>?
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm space-y-2">
              <div>
                <strong>1. Lépés: Átmérő kiszámítása:</strong>
                <div className="mt-1 pl-3 text-slate-700 dark:text-slate-200">
                  d = 2 · r = 2 · 7 cm = 14 cm.
                </div>
              </div>
              <div>
                <strong>2. Lépés: A 15 cm-es húr vizsgálata:</strong>
                <div className="mt-1 pl-3 text-slate-700 dark:text-slate-200">
                  Tudjuk, hogy a kör leghosszabb húrja az átmérő (<MathText>d = 14 cm</MathText>). Semelyik húr hossza sem haladhatja meg az átmérőt (<MathText>h ≤ d</MathText>).
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-bold">
                Válasz: Az átmérő 14 cm. 15 cm hosszúságú húr nem létezhet ebben a körben, mert a leghosszabb húr legfeljebb 14 cm lehet.
              </div>
            </div>
          </Card>

          {/* Example 2 */}
          <Card className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                2. Mintapélda
              </span>
              <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                Egyenes és kör kölcsönös helyzete
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3">
              Egy kör átmérője <MathText>d = 16 cm</MathText>. Határozzuk meg az egyenes és a kör kölcsönös helyzetét, ha az egyenes távolsága a középponttól: a) 6 cm, b) 8 cm, c) 10 cm!
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm space-y-2">
              <div>
                <strong>Előkészítés: Sugár meghatározása:</strong>
                <div className="mt-1 pl-3 text-slate-700 dark:text-slate-200 flex items-center flex-wrap gap-1.5">
                  <span className="font-serif italic font-bold">r</span>
                  <span className="font-bold">=</span>
                  <Fraction num={<span className="font-serif italic">d</span>} den="2" size="sm" className="font-bold" />
                  <span className="font-bold">=</span>
                  <Fraction num="16 cm" den="2" size="sm" className="font-bold" />
                  <span className="font-bold">= 8 cm.</span>
                </div>
              </div>
              <div>
                <strong>a) d = 6 cm:</strong> Mivel <MathText>6 &lt; 8</MathText> (<MathText>d &lt; r</MathText>), az egyenes <strong>szelő</strong> (2 közös pont).
              </div>
              <div>
                <strong>b) d = 8 cm:</strong> Mivel <MathText>8 = 8</MathText> (<MathText>d = r</MathText>), az egyenes <strong>érintő</strong> (1 közös pont, <MathText>e ⊥ r</MathText>).
              </div>
              <div>
                <strong>c) d = 10 cm:</strong> Mivel <MathText>10 &gt; 8</MathText> (<MathText>d &gt; r</MathText>), az egyenes <strong>elkerülő</strong> (0 közös pont).
              </div>
            </div>
          </Card>

          {/* Example 3 */}
          <Card className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                3. Mintapélda
              </span>
              <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                Két kör sugarai és középpont-távolsága
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3">
              Két kör sugara <MathText>r₁ = 6 cm</MathText> és <MathText>r₂ = 4 cm</MathText>. Hány közös pontja van a két körnek, ha középpontjaik távolsága <MathText>d = 10 cm</MathText>, illetve ha <MathText>d = 2 cm</MathText>?
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm space-y-2">
              <div>
                <strong>Összegek és különbségek felírása:</strong>
                <div className="mt-1 pl-3 text-slate-700 dark:text-slate-200">
                  r₁ + r₂ = 6 + 4 = 10 cm és r₁ - r₂ = 6 - 4 = 2 cm.
                </div>
              </div>
              <div>
                <strong>Ha d = 10 cm:</strong> Mivel <MathText>d = r₁ + r₂</MathText>, a két kör <strong>kívülről érinti egymást</strong>, így pontosan <strong>1 közös pontjuk</strong> van.
              </div>
              <div>
                <strong>Ha d = 2 cm:</strong> Mivel <MathText>d = r₁ - r₂</MathText>, a két kör <strong>belülről érinti egymást</strong>, így szintén pontosan <strong>1 közös pontjuk</strong> van.
              </div>
            </div>
          </Card>
        </div>
      </TheorySection>

      {/* 8. SZEKCIÓ: GYAKORI CSAPDÁK ÉS TÍPUSHIBÁK */}
      <TheorySection
        number={8}
        title="Típushibák és Csapdák a Kör Témakörben"
        badgeColor="rose"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: Kör vs. Körlap összetévesztése"
            trap="„A kör területe pi-szer r-négyzet, és a körnek vannak belső pontjai.”"
            wrong="HIBÁS szóhasználat! A kör kizárólag a határoló vonal (egy görbe), területe nulla, pontjai |OP| = r."
            solution="A belső pontokkal és területtel rendelkező síkidom neve KÖRLAP (vagy körlemez). A körnek kerülete van, a körlapnak területe."
          />

          <TheoryTrapBox
            title="2. Csapda: Körcikk és Körszelet felcserélése"
            trap="„A körszelet a tortaszelet, mert a tortából szeletet vágunk.”"
            wrong="NEM! A hétköznapi pizzacikk vagy tortaszelet a geometriában KÖRCIKK (szektor)!"
            solution="Körcikk = 2 sugár + ív (középpontig beér). Körszelet = húr + ív (csak a levágott szél, nem ér be a középpontig)."
          />

          <TheoryTrapBox
            title="3. Csapda: Érintő merőlegességének figyelmen kívül hagyása"
            trap="„Az érintő egyenes tetszőleges szögben állhat az érintési pontban.”"
            wrong="HAMIS! Csak egyetlen olyan egyenes létezik egy kör adott pontjában, amely érintő."
            solution="Az érintő MINDIG szigorúan merőleges az érintési pontba húzott sugárra: e ⊥ r. Enélkül szelővé válna!"
          />

          <TheoryTrapBox
            title="4. Csapda: Csak külső érintkezés észrevétele"
            trap="„Két kör csak akkor érintheti egymást, ha d = r₁ + r₂.”"
            wrong="FÉLIGAZSÁG! Elfelejtik a belső érintkezést!"
            solution="Két kör belülről is érintheti egymást, ha a kisebb kör a nagyobb belsejében van: ekkor d = |r₁ - r₂|."
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CircleTheory;
