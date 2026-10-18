import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  GeometryFigureCard,
  GeometryFigureGrid,
  GeometrySvgFrame
} from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Box,
  Layers,
  CircleDot,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Maximize2,
  Minimize2,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Shapes,
  Ruler,
  Compass,
  Sliders,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BodiesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

type BodyKey = 'kocka' | 'teglatest' | 'prizma' | 'gula' | 'henger' | 'kup' | 'gomb';
type HighlightMode = 'mind' | 'lapok' | 'elek' | 'csucsok';

interface BodyInfo {
  name: string;
  category: 'Poliéder (síklapú)' | 'Forgástest (görbe)';
  faces: number;
  faceDesc: string;
  edges: number;
  edgeDesc: string;
  vertices: number;
  vertexDesc: string;
  isPolyhedron: boolean;
  eulerFormula: string;
  eulerResult: number | null;
  description: string;
  example: string;
}

const BODIES_DATA: Record<BodyKey, BodyInfo> = {
  kocka: {
    name: 'Kocka',
    category: 'Poliéder (síklapú)',
    faces: 6,
    faceDesc: '6 egybevágó négyzetlap',
    edges: 12,
    edgeDesc: '12 egyenlő hosszúságú él (szakasz)',
    vertices: 8,
    vertexDesc: '8 csúcspont (mindenhol 3 él találkozik)',
    isPolyhedron: true,
    eulerFormula: '8 + 6 - 12',
    eulerResult: 2,
    description: 'Szabályos test, minden szomszédos lapja derékszöget zár be.',
    example: 'Dobókocka, Rubik-kocka, doboz.'
  },
  teglatest: {
    name: 'Téglatest',
    category: 'Poliéder (síklapú)',
    faces: 6,
    faceDesc: '6 téglalap lap (3 pár egybevágó)',
    edges: 12,
    edgeDesc: '12 él (3×4 egyenlő hosszúságú: a, b, c)',
    vertices: 8,
    vertexDesc: '8 csúcspont derékszögekkel',
    isPolyhedron: true,
    eulerFormula: '8 + 6 - 12',
    eulerResult: 2,
    description: 'Háromdimenziós doboz. A kocka egy speciális téglatest!',
    example: 'Tégla, cipősdoboz, könyv, gyufásdoboz.'
  },
  prizma: {
    name: '3 oldalú prizma (hasáb)',
    category: 'Poliéder (síklapú)',
    faces: 5,
    faceDesc: '2 háromszög alaplap + 3 téglalap palástlap',
    edges: 9,
    edgeDesc: '9 él (6 alapél + 3 oldalél)',
    vertices: 6,
    vertexDesc: '6 csúcspont (2 × 3)',
    isPolyhedron: true,
    eulerFormula: '6 + 5 - 9',
    eulerResult: 2,
    description: 'Két párhuzamos háromszög lap és három összekötő oldallap.',
    example: 'Toblerone csoki, sátor, háztető.'
  },
  gula: {
    name: 'Négyzetes gúla (piramis)',
    category: 'Poliéder (síklapú)',
    faces: 5,
    faceDesc: '1 négyzet alaplap + 4 háromszög oldallap',
    edges: 8,
    edgeDesc: '8 él (4 alapél + 4 oldalél)',
    vertices: 5,
    vertexDesc: '5 csúcspont (4 az alapon + 1 közös csúcs)',
    isPolyhedron: true,
    eulerFormula: '5 + 5 - 8',
    eulerResult: 2,
    description: 'Négyzet alapú, a lapok egyetlen közös csúcsban futnak össze.',
    example: 'Egyiptomi piramisok, sátortető, templomtorony.'
  },
  henger: {
    name: 'Henger (körhenger)',
    category: 'Forgástest (görbe)',
    faces: 3,
    faceDesc: '2 sík körlap (alap- és fedőlap) + 1 görbe palást',
    edges: 2,
    edgeDesc: '2 görbe él (körvonal, nem egyenes szakasz!)',
    vertices: 0,
    vertexDesc: '0 csúcs (egyetlen hegyes sarokpontja sincs!)',
    isPolyhedron: false,
    eulerFormula: '0 + 3 - 2 = 1 ≠ 2',
    eulerResult: null,
    description: 'Görbe felületű test, téglalap tengely körüli megforgatásából keletkezik.',
    example: 'Konzervdoboz, üdítős doboz, ceruzatest.'
  },
  kup: {
    name: 'Kúp (körkúp)',
    category: 'Forgástest (görbe)',
    faces: 2,
    faceDesc: '1 sík körlap + 1 görbe kúppalást',
    edges: 1,
    edgeDesc: '1 görbe kör él az alap körül',
    vertices: 1,
    vertexDesc: '1 csúcspont (a kúp csúcsa)',
    isPolyhedron: false,
    eulerFormula: '1 + 2 - 1 = 2 (de nem poliéder!)',
    eulerResult: null,
    description: 'Derékszögű háromszög egyik befogó körüli megforgatásából jön létre.',
    example: 'Fagylaltos tölcsér, bóják, indián sátor.'
  },
  gomb: {
    name: 'Gömb',
    category: 'Forgástest (görbe)',
    faces: 1,
    faceDesc: '1 zárt, egybefüggő görbe gömbfelület',
    edges: 0,
    edgeDesc: '0 él (nincs semmilyen metszésvonal)',
    vertices: 0,
    vertexDesc: '0 csúcs (tökéletesen sima, nincs sarka)',
    isPolyhedron: false,
    eulerFormula: '0 + 1 - 0 = 1 ≠ 2',
    eulerResult: null,
    description: 'Minden felületi pontja egyenlő távolságra van a középponttól (r sugár).',
    example: 'Focilabda, golyó, bolygók.'
  }
};

export const BodiesTheory: React.FC<BodiesTheoryProps> = ({ onBack, onStartQuiz }) => {
  // ========================================================
  // INTERAKTÍV TESTVIZSGÁLÓ ÁLLAPOTAI
  // ========================================================
  const [selectedBody, setSelectedBody] = useState<BodyKey>('kocka');
  const [highlightMode, setHighlightMode] = useState<HighlightMode>('mind');

  const currentBody = BODIES_DATA[selectedBody];

  return (
    <TheoryTemplate
      title="3. Test, felület, vonal, pont"
      subtitle="A geometriai dimenziók hierarchiája, síklapú és görbe testek, lapok, élek, csúcsok és az Euler-összefüggés"
      documentId="g5-geom-bodies-theory-content"
      pdfFilename="5_osztaly_III_geometria_3_test_felulet_vonal_pont_tananyag.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      themeColor="emerald"
      badgeText="📐 5. Osztály • III. Bevezetés a geometriába"
      quickRule={{
        label: "Euler-formula & Dimenziók",
        formula: "C + L - É = 2 • 0D (pont) → 1D (vonal) → 2D (felület) → 3D (test)"
      }}
      practiceTitle="Készen állsz a testek, felületek, vonalak és pontok gyakorlására?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben, a párosítóban vagy a csoportosítóban!"
    >
      {/* ======================================================== */}
      {/* 1. SZEKCIÓ: A GEOMETRIAI DIMENZIÓK HIERARCHIÁJA */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-bodies-dimensions"
        number={1}
        title="A geometriai dimenziók hierarchiája (0D → 3D)"
        badge="Dimenziók"
        badgeColor="emerald"
      >
        <TheoryCard
          title="Hogyan épül fel a geometriai világ a ponttól a testig?"
          subtitle="A dimenziók lépcsőfokai: minden szint a megelőző mozgásából vagy sokaságából jön létre"
          themeColor="emerald"
          icon={<Layers className="w-5 h-5 text-emerald-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 text-xs sm:text-sm">
            A környezetünkben található tárgyak és a geometriai alakzatok kiterjedésük (dimenziójuk) szerint négy alapvető csoportba sorolhatók: <strong>pont (0D)</strong>, <strong>vonal (1D)</strong>, <strong>felület / síkidom (2D)</strong> és <strong>test (3D)</strong>.
          </p>

          {/* Dimenzió kártyák négyzete */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-4">
            {/* 0D Pont */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-black text-[10px]">
                    0D • PONT
                  </Badge>
                  <span className="text-[11px] font-bold text-slate-400">0 kiterjedés</span>
                </div>
                <div className="h-20 flex items-center justify-center bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 mb-2">
                  <svg className="w-14 h-14" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="4" className="fill-blue-600" />
                    <text x="25" y="15" textAnchor="middle" className="text-[12px] font-black fill-blue-700">P</text>
                  </svg>
                </div>
                <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100">Hely a térben</h5>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Nincs hossza, szélessége, sem magassága. Nagybetűvel jelöljük (<MathText>{'P, A, B'}</MathText>).
                </p>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                Példa: hegyes ceruza nyoma, tű hegye, csillag.
              </p>
            </div>

            {/* 1D Vonal */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 font-black text-[10px]">
                    1D • VONAL
                  </Badge>
                  <span className="text-[11px] font-bold text-slate-400">1 kiterjedés</span>
                </div>
                <div className="h-20 flex items-center justify-center bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 mb-2">
                  <svg className="w-24 h-14" viewBox="0 0 90 40">
                    <line x1="10" y1="20" x2="80" y2="20" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="20" cy="20" r="3" fill="#0f766e" />
                    <circle cx="70" cy="20" r="3" fill="#0f766e" />
                    <text x="20" y="12" textAnchor="middle" className="text-[9px] font-bold fill-teal-800">A</text>
                    <text x="70" y="12" textAnchor="middle" className="text-[9px] font-bold fill-teal-800">B</text>
                  </svg>
                </div>
                <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100">Csak hosszúság</h5>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Mozgó pont nyoma. Van hossza, de nincs szélessége és vastagsága.
                </p>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                Példa: szakasz, egyenes, kifeszített cérnaszál.
              </p>
            </div>

            {/* 2D Felület / Síkidom */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 font-black text-[10px]">
                    2D • FELÜLET
                  </Badge>
                  <span className="text-[11px] font-bold text-slate-400">2 kiterjedés</span>
                </div>
                <div className="h-20 flex items-center justify-center bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 mb-2">
                  <svg className="w-20 h-14" viewBox="0 0 74 44" fill="none">
                    <rect x="5" y="5" width="64" height="34" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                    <text
                      x="37"
                      y="23"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="text-[11px] font-black fill-amber-950 dark:fill-amber-900 tracking-wide"
                    >
                      Terület (T)
                    </text>
                  </svg>
                </div>
                <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100">Hosszúság & szélesség</h5>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Mozgó vonal nyoma. Területe van, de vastagsága nulla (síkbeli).
                </p>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                Példa: papírlap, téglalap, körlap, asztallap.
              </p>
            </div>

            {/* 3D Test */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-black text-[10px]">
                    3D • TEST
                  </Badge>
                  <span className="text-[11px] font-bold text-slate-400">3 kiterjedés</span>
                </div>
                <div className="h-20 flex items-center justify-center bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 mb-2">
                  <svg className="w-12 h-12" viewBox="0 0 50 50" fill="none">
                    <path d="M10 16 L25 8 L40 16 L25 24 Z" fill="#a7f3d0" stroke="#059669" strokeWidth="1.5" />
                    <path d="M10 16 L25 24 L25 40 L10 32 Z" fill="#34d399" stroke="#047857" strokeWidth="1.5" />
                    <path d="M25 24 L40 16 L40 32 L25 40 Z" fill="#6ee7b7" stroke="#059669" strokeWidth="1.5" />
                  </svg>
                </div>
                <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100">Térbeli kiterjedés</h5>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Hosszúság, szélesség és magasság. Teret tölt be, térfogata és felszíne van.
                </p>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                Példa: kocka, tégla, labda, vizes palack.
              </p>
            </div>
          </div>

          <TheoryCallout variant="tip" title="A keletkezés és a metszetek aranyszabálya">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-white/70 dark:bg-slate-900/70 rounded-xl border border-emerald-200/60">
                <strong className="text-emerald-800 dark:text-emerald-300 block mb-1">
                  ▶ Felépülés (mozgás iránya):
                </strong>
                <ul className="space-y-1 list-disc list-inside text-slate-700 dark:text-slate-300">
                  <li>A pont elmozdulásával <strong>vonal</strong> keletkezik.</li>
                  <li>A vonal elmozdulásával <strong>felület</strong> keletkezik.</li>
                  <li>A felület elmozdulásával <strong>test</strong> keletkezik.</li>
                </ul>
              </div>
              <div className="p-2.5 bg-white/70 dark:bg-slate-900/70 rounded-xl border border-emerald-200/60">
                <strong className="text-teal-800 dark:text-teal-300 block mb-1">
                  ◀ Metszetek és határok (visszafelé):
                </strong>
                <ul className="space-y-1 list-disc list-inside text-slate-700 dark:text-slate-300">
                  <li>A testet <strong>felületek (lapok)</strong> határolják.</li>
                  <li>Két felület találkozása (metszete) <strong>vonal (él)</strong>.</li>
                  <li>Két él találkozása (metszete) <strong>pont (csúcs)</strong>.</li>
                </ul>
              </div>
            </div>
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 2. SZEKCIÓ: INTERAKTÍV TESTVIZSGÁLÓ & EULER-KALKULÁTOR */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-bodies-interactive"
        number={2}
        title="Interaktív Testvizsgáló & Euler-Kalkulátor"
        badge="Interaktív Modell"
        badgeColor="emerald"
      >
        <TheoryCard
          title="Kattints a testekre, és vizsgáld meg a lapjaikat, éleiket és csúcsaikat!"
          subtitle="Válassz ki egy geometriai testet, emeld ki a határoló elemeit, és ellenőrizd az Euler-formulát élőben!"
          themeColor="emerald"
          icon={<Sliders className="w-5 h-5 text-emerald-600" />}
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900 border-2 border-emerald-300 dark:border-emerald-800 shadow-sm space-y-4">
            
            {/* Test kiválasztó gombok */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 text-center">
                Válassz egy testet a részletes elemzéshez:
              </span>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {(Object.keys(BODIES_DATA) as BodyKey[]).map((key) => {
                  const b = BODIES_DATA[key];
                  const isSelected = selectedBody === key;
                  return (
                    <Button
                      key={key}
                      size="sm"
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => setSelectedBody(key)}
                      className={cn(
                        "text-xs h-8 px-3 rounded-xl font-bold transition-all",
                        isSelected
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                          : "hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                      )}
                    >
                      {b.name}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Kiemelés mód választó */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 mr-1">
                Kiemelés:
              </span>
              {(['mind', 'lapok', 'elek', 'csucsok'] as HighlightMode[]).map((mode) => (
                <Button
                  key={mode}
                  size="sm"
                  variant={highlightMode === mode ? "default" : "ghost"}
                  onClick={() => setHighlightMode(mode)}
                  className={cn(
                    "text-xs h-7 px-2.5 rounded-lg font-bold capitalize",
                    highlightMode === mode && "bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900"
                  )}
                >
                  {mode === 'mind' ? 'Minden elem' : mode}
                </Button>
              ))}
            </div>

            {/* Középső SVG Rajz & Élő Statisztika */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* 3D SVG Vizuális Modell */}
              <div className="flex items-center justify-center p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 min-h-[220px]">
                {selectedBody === 'kocka' && (
                  <svg className="w-48 h-44 drop-shadow-md" viewBox="0 0 160 150">
                    <line x1="40" y1="40" x2="40" y2="110" stroke="#94a3b8" strokeWidth={highlightMode === 'elek' ? "3" : "1.5"} strokeDasharray="3 3" />
                    <line x1="40" y1="110" x2="110" y2="110" stroke="#94a3b8" strokeWidth={highlightMode === 'elek' ? "3" : "1.5"} strokeDasharray="3 3" />
                    <line x1="40" y1="110" x2="15" y2="85" stroke="#94a3b8" strokeWidth={highlightMode === 'elek' ? "3" : "1.5"} strokeDasharray="3 3" />

                    <path
                      d="M15 40 L40 15 L110 15 L85 40 Z"
                      fill={highlightMode === 'lapok' || highlightMode === 'mind' ? "#a7f3d0" : "#f1f5f9"}
                      stroke={highlightMode === 'elek' ? "#2563eb" : "#059669"}
                      strokeWidth={highlightMode === 'elek' ? "3" : "2"}
                    />
                    <rect
                      x="15"
                      y="40"
                      width="70"
                      height="70"
                      fill={highlightMode === 'lapok' || highlightMode === 'mind' ? "#34d399" : "#e2e8f0"}
                      fillOpacity="0.8"
                      stroke={highlightMode === 'elek' ? "#2563eb" : "#047857"}
                      strokeWidth={highlightMode === 'elek' ? "3" : "2"}
                    />
                    <path
                      d="M85 40 L110 15 L110 85 L85 110 Z"
                      fill={highlightMode === 'lapok' || highlightMode === 'mind' ? "#6ee7b7" : "#cbd5e1"}
                      fillOpacity="0.9"
                      stroke={highlightMode === 'elek' ? "#2563eb" : "#059669"}
                      strokeWidth={highlightMode === 'elek' ? "3" : "2"}
                    />

                    {(highlightMode === 'csucsok' || highlightMode === 'mind') && (
                      <g>
                        <circle cx="15" cy="40" r="4.5" fill="#ef4444" />
                        <circle cx="85" cy="40" r="4.5" fill="#ef4444" />
                        <circle cx="85" cy="110" r="4.5" fill="#ef4444" />
                        <circle cx="15" cy="110" r="4.5" fill="#ef4444" />
                        <circle cx="40" cy="15" r="4" fill="#ef4444" />
                        <circle cx="110" cy="15" r="4" fill="#ef4444" />
                        <circle cx="110" cy="85" r="4.5" fill="#ef4444" />
                        <circle cx="40" cy="110" r="3" fill="#ef4444" opacity="0.6" />
                      </g>
                    )}
                  </svg>
                )}

                {selectedBody === 'teglatest' && (
                  <svg className="w-56 h-40 drop-shadow-md" viewBox="0 0 190 140">
                    <line x1="45" y1="35" x2="45" y2="95" stroke="#94a3b8" strokeWidth={highlightMode === 'elek' ? "3" : "1.5"} strokeDasharray="3 3" />
                    <line x1="45" y1="95" x2="145" y2="95" stroke="#94a3b8" strokeWidth={highlightMode === 'elek' ? "3" : "1.5"} strokeDasharray="3 3" />
                    <line x1="45" y1="95" x2="15" y2="75" stroke="#94a3b8" strokeWidth={highlightMode === 'elek' ? "3" : "1.5"} strokeDasharray="3 3" />

                    <path
                      d="M15 35 L45 15 L145 15 L115 35 Z"
                      fill={highlightMode === 'lapok' || highlightMode === 'mind' ? "#bfdbfe" : "#f1f5f9"}
                      stroke={highlightMode === 'elek' ? "#2563eb" : "#1d4ed8"}
                      strokeWidth={highlightMode === 'elek' ? "3" : "2"}
                    />
                    <rect
                      x="15"
                      y="35"
                      width="100"
                      height="60"
                      fill={highlightMode === 'lapok' || highlightMode === 'mind' ? "#60a5fa" : "#e2e8f0"}
                      fillOpacity="0.8"
                      stroke={highlightMode === 'elek' ? "#2563eb" : "#1e40af"}
                      strokeWidth={highlightMode === 'elek' ? "3" : "2"}
                    />
                    <path
                      d="M115 35 L145 15 L145 75 L115 95 Z"
                      fill={highlightMode === 'lapok' || highlightMode === 'mind' ? "#93c5fd" : "#cbd5e1"}
                      fillOpacity="0.9"
                      stroke={highlightMode === 'elek' ? "#2563eb" : "#1d4ed8"}
                      strokeWidth={highlightMode === 'elek' ? "3" : "2"}
                    />

                    {(highlightMode === 'csucsok' || highlightMode === 'mind') && (
                      <g>
                        <circle cx="15" cy="35" r="4.5" fill="#ef4444" />
                        <circle cx="115" cy="35" r="4.5" fill="#ef4444" />
                        <circle cx="115" cy="95" r="4.5" fill="#ef4444" />
                        <circle cx="15" cy="95" r="4.5" fill="#ef4444" />
                        <circle cx="45" cy="15" r="4" fill="#ef4444" />
                        <circle cx="145" cy="15" r="4" fill="#ef4444" />
                        <circle cx="145" cy="75" r="4.5" fill="#ef4444" />
                      </g>
                    )}
                  </svg>
                )}

                {selectedBody === 'prizma' && (
                  <svg className="w-48 h-44 drop-shadow-md select-none" viewBox="0 0 160 150">
                    {/* Hátsó alsó rejtett él */}
                    <line
                      x1="30"
                      y1="100"
                      x2="130"
                      y2="100"
                      stroke={highlightMode === 'elek' ? "#2563eb" : "#7c3aed"}
                      strokeWidth={highlightMode === 'elek' ? "3" : "1.5"}
                      strokeDasharray="3.5 3.5"
                      opacity="0.7"
                    />

                    {/* Bal oldali téglalap palástlap */}
                    <path
                      d="M30 42 L75 62 L75 120 L30 100 Z"
                      fill={highlightMode === 'lapok' || highlightMode === 'mind' ? "#c4b5fd" : "#e2e8f0"}
                      stroke={highlightMode === 'elek' ? "#2563eb" : "#6d28d9"}
                      strokeWidth={highlightMode === 'elek' ? "3" : "2"}
                    />

                    {/* Jobb oldali téglalap palástlap */}
                    <path
                      d="M75 62 L130 42 L130 100 L75 120 Z"
                      fill={highlightMode === 'lapok' || highlightMode === 'mind' ? "#a78bfa" : "#cbd5e1"}
                      stroke={highlightMode === 'elek' ? "#2563eb" : "#5b21b6"}
                      strokeWidth={highlightMode === 'elek' ? "3" : "2"}
                    />

                    {/* Felső háromszög alaplap */}
                    <path
                      d="M30 42 L75 62 L130 42 Z"
                      fill={highlightMode === 'lapok' || highlightMode === 'mind' ? "#ddd6fe" : "#f1f5f9"}
                      stroke={highlightMode === 'elek' ? "#2563eb" : "#7c3aed"}
                      strokeWidth={highlightMode === 'elek' ? "3" : "2"}
                    />

                    {/* Csúcsok (3 felül, 3 alul) */}
                    {(highlightMode === 'csucsok' || highlightMode === 'mind') && (
                      <g>
                        <circle cx="30" cy="42" r="4.5" fill="#ef4444" />
                        <circle cx="75" cy="62" r="4.5" fill="#ef4444" />
                        <circle cx="130" cy="42" r="4.5" fill="#ef4444" />
                        <circle cx="30" cy="100" r="4.5" fill="#ef4444" />
                        <circle cx="75" cy="120" r="4.5" fill="#ef4444" />
                        <circle cx="130" cy="100" r="4.5" fill="#ef4444" />
                      </g>
                    )}
                  </svg>
                )}

                {selectedBody === 'gula' && (
                  <svg className="w-48 h-44 drop-shadow-md" viewBox="0 0 160 150">
                    <line x1="25" y1="105" x2="135" y2="95" stroke="#9a3412" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="80" y1="20" x2="135" y2="95" stroke="#9a3412" strokeWidth="1.5" strokeDasharray="3 3" />

                    <path
                      d="M80 20 L25 105 L95 125 Z"
                      fill={highlightMode === 'lapok' || highlightMode === 'mind' ? "#fed7aa" : "#f1f5f9"}
                      stroke={highlightMode === 'elek' ? "#2563eb" : "#ea580c"}
                      strokeWidth={highlightMode === 'elek' ? "3" : "2"}
                    />
                    <path
                      d="M80 20 L95 125 L135 95 Z"
                      fill={highlightMode === 'lapok' || highlightMode === 'mind' ? "#fdba74" : "#e2e8f0"}
                      stroke={highlightMode === 'elek' ? "#2563eb" : "#c2410c"}
                      strokeWidth={highlightMode === 'elek' ? "3" : "2"}
                    />

                    {(highlightMode === 'csucsok' || highlightMode === 'mind') && (
                      <g>
                        <circle cx="80" cy="20" r="5" fill="#ef4444" />
                        <circle cx="25" cy="105" r="4.5" fill="#ef4444" />
                        <circle cx="95" cy="125" r="4.5" fill="#ef4444" />
                        <circle cx="135" cy="95" r="4.5" fill="#ef4444" />
                      </g>
                    )}
                  </svg>
                )}

                {selectedBody === 'henger' && (
                  <svg className="w-44 h-44 drop-shadow-md select-none" viewBox="0 0 140 150">
                    {/* Palástfelület (a felső körlap aljától indul lefelé) */}
                    <path
                      d="M26 36 L26 106 A44 15 0 0 0 114 106 L114 36 A44 15 0 0 1 26 36 Z"
                      fill={highlightMode === 'lapok' || highlightMode === 'mind' ? "#5eead4" : "#e2e8f0"}
                      stroke={highlightMode === 'elek' ? "#2563eb" : "#0f766e"}
                      strokeWidth={highlightMode === 'elek' ? "3.5" : "2"}
                    />
                    {/* Alsó hátsó rejtett él (szaggatott) */}
                    <path
                      d="M26 106 A44 15 0 0 1 114 106"
                      fill="none"
                      stroke={highlightMode === 'elek' ? "#2563eb" : "#0d9488"}
                      strokeWidth={highlightMode === 'elek' ? "3" : "1.6"}
                      strokeDasharray="3.5 3.5"
                    />
                    {/* Alsó elülső él (folytonos) */}
                    <path
                      d="M26 106 A44 15 0 0 0 114 106"
                      fill="none"
                      stroke={highlightMode === 'elek' ? "#2563eb" : "#0f766e"}
                      strokeWidth={highlightMode === 'elek' ? "3.5" : "2"}
                    />
                    {/* Felső teljes körlap (mindig a palást tetejére rajzolva!) */}
                    <ellipse
                      cx="70"
                      cy="36"
                      rx="44"
                      ry="15"
                      fill={highlightMode === 'lapok' || highlightMode === 'mind' ? "#99f6e4" : "#f1f5f9"}
                      stroke={highlightMode === 'elek' ? "#2563eb" : "#0d9488"}
                      strokeWidth={highlightMode === 'elek' ? "3.5" : "2"}
                    />
                    <text x="70" y="142" textAnchor="middle" className="text-[11px] font-bold fill-teal-700">
                      Nincs egyetlen csúcsa sem!
                    </text>
                  </svg>
                )}

                {selectedBody === 'kup' && (
                  <svg className="w-44 h-44 drop-shadow-md" viewBox="0 0 140 150">
                    <path
                      d="M70 20 L26 115 A44 14 0 0 0 114 115 Z"
                      fill={highlightMode === 'lapok' || highlightMode === 'mind' ? "#fde68a" : "#e2e8f0"}
                      stroke="#d97706"
                      strokeWidth="2"
                    />
                    <ellipse
                      cx="70"
                      cy="115"
                      rx="44"
                      ry="14"
                      fill="none"
                      stroke={highlightMode === 'elek' ? "#2563eb" : "#d97706"}
                      strokeWidth={highlightMode === 'elek' ? "3.5" : "1.5"}
                      strokeDasharray="3 3"
                    />
                    <circle cx="70" cy="20" r="5" fill="#ef4444" />
                    <text x="86" y="24" className="text-[11px] font-black fill-rose-600">Csúcs (1)</text>
                  </svg>
                )}

                {selectedBody === 'gomb' && (
                  <svg className="w-44 h-44 drop-shadow-md" viewBox="0 0 140 150">
                    <defs>
                      <radialGradient id="sphereGradInteractive" cx="35%" cy="35%" r="65%">
                        <stop offset="0%" stopColor="#fecdd3" />
                        <stop offset="60%" stopColor="#f43f5e" />
                        <stop offset="100%" stopColor="#9f1239" />
                      </radialGradient>
                    </defs>
                    <circle cx="70" cy="70" r="50" fill="url(#sphereGradInteractive)" stroke="#881337" strokeWidth="2" />
                    <ellipse cx="70" cy="70" rx="50" ry="14" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.7" />
                    <text x="70" y="140" textAnchor="middle" className="text-[11px] font-bold fill-rose-700">
                      1 zárt gömbfelület (0 él, 0 csúcs)
                    </text>
                  </svg>
                )}
              </div>

              {/* Részletes Tulajdonságok és Élő Euler Számítás */}
              <div className="space-y-3">
                <div className="p-3.5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-base font-black text-slate-900 dark:text-white">
                      {currentBody.name}
                    </h4>
                    <Badge variant="outline" className="text-[10px] font-bold">
                      {currentBody.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {currentBody.description}
                  </p>
                </div>

                {/* 3 Számláló (Lapok, Élek, Csúcsok) */}
                <div className="grid grid-cols-3 gap-2">
                  <div className={cn(
                    "p-2.5 rounded-xl border text-center transition-all",
                    highlightMode === 'lapok'
                      ? "bg-emerald-100 border-emerald-400 dark:bg-emerald-950 dark:border-emerald-700 ring-2 ring-emerald-400"
                      : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                  )}>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Lapok (L)</span>
                    <span className="text-xl font-black text-emerald-600 block">{currentBody.faces}</span>
                  </div>

                  <div className={cn(
                    "p-2.5 rounded-xl border text-center transition-all",
                    highlightMode === 'elek'
                      ? "bg-blue-100 border-blue-400 dark:bg-blue-950 dark:border-blue-700 ring-2 ring-blue-400"
                      : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                  )}>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Élek (É)</span>
                    <span className="text-xl font-black text-blue-600 block">{currentBody.edges}</span>
                  </div>

                  <div className={cn(
                    "p-2.5 rounded-xl border text-center transition-all",
                    highlightMode === 'csucsok'
                      ? "bg-rose-100 border-rose-400 dark:bg-rose-950 dark:border-rose-700 ring-2 ring-rose-400"
                      : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                  )}>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Csúcsok (C)</span>
                    <span className="text-xl font-black text-rose-600 block">{currentBody.vertices}</span>
                  </div>
                </div>

                {/* Élő Euler formula ellenőrző doboz */}
                <div className={cn(
                  "p-3 rounded-xl border text-xs",
                  currentBody.isPolyhedron
                    ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800"
                    : "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800"
                )}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-700 dark:text-slate-200 uppercase text-[10px]">
                      Euler-formula ellenőrzése:
                    </span>
                    {currentBody.isPolyhedron ? (
                      <span className="inline-flex items-center gap-1 font-black text-emerald-700 dark:text-emerald-300">
                        <Check className="w-3.5 h-3.5" /> Érvényes poliéder
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-bold text-amber-700 dark:text-amber-400">
                        <AlertTriangle className="w-3.5 h-3.5" /> Nem poliéder
                      </span>
                    )}
                  </div>

                  {currentBody.isPolyhedron ? (
                    <div className="font-bold text-slate-900 dark:text-white text-sm">
                      <MathText>{`C + L - \\acute{E} = ${currentBody.vertices} + ${currentBody.faces} - ${currentBody.edges} = ${currentBody.vertices + currentBody.faces - currentBody.edges} \\quad \\checkmark`}</MathText>
                    </div>
                  ) : (
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-snug">
                      Az Euler-tétel (<MathText>{'C + L - \\acute{E} = 2'}</MathText>) csak síklapú konvex poliéderekre alkalmazható, görbe felületű forgástestekre nem!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 3. SZEKCIÓ: A TESTEK HATÁRAI: LAPOK, ÉLEK, CSÚCSOK */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-bodies-elements"
        number={3}
        title="A térbeli testek felépítése: Lapok, élek és csúcsok"
        badge="Alkotóelemek"
        badgeColor="teal"
      >
        <TheoryCard
          title="Mi az a lap, él és csúcs egy testen?"
          subtitle="A testeket határoló elemek pontos matematikai definíciói"
          themeColor="teal"
          icon={<Box className="w-5 h-5 text-teal-600" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-3 h-3 rounded-md bg-emerald-500 inline-block" />
                <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">Lap (L)</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A testet kívülről határoló <strong>sík vagy görbe felületrész</strong>.
                Poliédereknél minden lap egy síkbeli sokszög (pl. négyzet, téglalap, háromszög).
              </p>
            </div>

            <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/30 rounded-2xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-3 h-1 rounded-full bg-blue-600 inline-block" />
                <h4 className="font-bold text-sm text-blue-900 dark:text-blue-200">Él (É)</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Két szomszédos lap <strong>közös határvonala (metszésvonala)</strong>.
                Síklapú testeknél egyenes szakasz, míg a hengernél körvonal.
              </p>
            </div>

            <div className="p-3.5 bg-rose-50/70 dark:bg-rose-950/30 rounded-2xl border border-rose-200 dark:border-rose-800">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <h4 className="font-bold text-sm text-rose-900 dark:text-rose-200">Csúcs (C)</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Három vagy több él (és lap) <strong>találkozási pontja</strong>.
                Pontosan nulla dimenziós kiterjedésű sarokpont a térben.
              </p>
            </div>
          </div>
        </TheoryCard>

        {/* Síklapú vs. Görbe testek összehasonlító kártya */}
        <TheoryCard
          title="A testek két nagy csoportja: Síklapú testek és Görbe felületű testek"
          subtitle="A határoló felületek típusa alapján határozhatjuk meg a testcsaládot"
          themeColor="teal"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-black">
                  POLIÉDEREK
                </span>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Síklapú testek</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Olyan térbeli testek, amelyeket <strong>kizárólag síkbeli sokszöglapok</strong> határolnak. Nincs rajtuk hajlított, görbült felület.
              </p>
              <ul className="text-xs space-y-1 list-disc list-inside text-slate-700 dark:text-slate-300 font-medium">
                <li>Kocka (minden lapja négyzet)</li>
                <li>Téglatest (minden lapja téglalap)</li>
                <li>Prizmák / Hasábok (alaplapjai sokszögek)</li>
                <li>Gúlák / Piramisok (oldallapjai háromszögek)</li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-black">
                  FORGÁSTESTEK
                </span>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Görbe felületű testek</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Olyan testek, amelyek határoló felületei között <strong>legalább egy görbült felület</strong> (palást vagy gömbfelület) található.
              </p>
              <ul className="text-xs space-y-1 list-disc list-inside text-slate-700 dark:text-slate-300 font-medium">
                <li>Henger (2 sík körlap + 1 görbe palást)</li>
                <li>Kúp (1 sík körlap + 1 görbe palást)</li>
                <li>Gömb (1 egybefüggő görbe felület)</li>
              </ul>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 4. SZEKCIÓ: SÍKLAPÚ TESTEK ÉS AZ EULER-FÉLE POLIÉDERTÉTEL */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-bodies-polyhedra"
        number={4}
        title="Síklapú testek (Poliéderek) és az Euler-összefüggés"
        badge="Poliéderek & Képletek"
        badgeColor="blue"
      >
        <TheoryCard
          title="A legfontosabb síklapú testek geometriai felépítése"
          subtitle="Lapok, élek és csúcsok darabszámai a leggyakoribb testeknél"
          themeColor="blue"
        >
          <GeometryFigureGrid columns={4}>
            {/* 1. Kocka */}
            <GeometryFigureCard
              title="Kocka"
              subtitle="Szabályos test"
              badge="6L • 12É • 8C"
              badgeColor="emerald"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-16 h-16 sm:w-18 sm:h-18 mx-auto" viewBox="0 0 80 80">
                  <path d="M20 25 L40 12 L65 25 L45 38 Z" fill="#a7f3d0" stroke="#059669" strokeWidth="1.5" />
                  <path d="M20 25 L45 38 L45 68 L20 55 Z" fill="#34d399" stroke="#047857" strokeWidth="1.5" />
                  <path d="M45 38 L65 25 L65 55 L45 68 Z" fill="#6ee7b7" stroke="#059669" strokeWidth="1.5" />
                </svg>
              }
              properties={[
                { label: 'Lapok', value: '6 egybevágó négyzet' },
                { label: 'Élek', value: '12 egyenlő hosszúságú él' },
                { label: 'Csúcsok', value: '8 csúcs (mindenhol 3 él)' }
              ]}
              caption="Minden szomszédos lapja derékszöget zár be."
            />

            {/* 2. Téglatest */}
            <GeometryFigureCard
              title="Téglatest"
              subtitle="Háromdimenziós doboz"
              badge="6L • 12É • 8C"
              badgeColor="blue"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-18 h-14 sm:w-20 sm:h-16 mx-auto" viewBox="0 0 90 70">
                  <path d="M15 22 L35 10 L80 20 L60 32 Z" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.5" />
                  <path d="M15 22 L60 32 L60 58 L15 48 Z" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="1.5" />
                  <path d="M60 32 L80 20 L80 46 L60 58 Z" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.5" />
                </svg>
              }
              properties={[
                { label: 'Lapok', value: '6 téglalap (3 pár egybevágó)' },
                { label: 'Élek', value: '12 él (3×4 egyenlő hossz)' },
                { label: 'Csúcsok', value: '8 csúcs' }
              ]}
              caption="A kocka a téglatest speciális esete (a = b = c)."
            />

            {/* 3. Háromoldalú prizma */}
            <GeometryFigureCard
              title="3 oldalú prizma"
              subtitle="Háromszög alapú hasáb"
              badge="5L • 9É • 6C"
              badgeColor="purple"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-16 h-16 sm:w-18 sm:h-18 mx-auto" viewBox="0 0 80 80" fill="none">
                  {/* Alsó hátsó rejtett él (szaggatott) */}
                  <line x1="16" y1="56" x2="64" y2="56" stroke="#7c3aed" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
                  {/* Bal oldali téglalap lap */}
                  <path d="M 16 24 L 38 36 L 38 68 L 16 56 Z" fill="#c4b5fd" stroke="#6d28d9" strokeWidth="1.5" />
                  {/* Jobb oldali téglalap lap */}
                  <path d="M 38 36 L 64 24 L 64 56 L 38 68 Z" fill="#a78bfa" stroke="#5b21b6" strokeWidth="1.5" />
                  {/* Felső háromszög alaplap */}
                  <path d="M 16 24 L 38 36 L 64 24 Z" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.6" />
                </svg>
              }
              properties={[
                { label: 'Lapok', value: '2 háromszög + 3 téglalap = 5' },
                { label: 'Élek', value: '9 él (6 alapél + 3 oldalél)' },
                { label: 'Csúcsok', value: '6 csúcs (2 × 3)' }
              ]}
              caption="Példa: Toblerone csoki doboza, háztető."
            />

            {/* 4. Négyoldalú gúla */}
            <GeometryFigureCard
              title="Négyzetes gúla"
              subtitle="Piramis"
              badge="5L • 8É • 5C"
              badgeColor="amber"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-16 h-16 sm:w-18 sm:h-18 mx-auto" viewBox="0 0 80 80">
                  <path d="M40 12 L15 55 L50 65 Z" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
                  <path d="M40 12 L50 65 L70 50 Z" fill="#fdba74" stroke="#c2410c" strokeWidth="1.5" />
                  <line x1="15" y1="55" x2="70" y2="50" stroke="#9a3412" strokeWidth="1" strokeDasharray="3 3" />
                </svg>
              }
              properties={[
                { label: 'Lapok', value: '1 négyzet + 4 háromszög = 5' },
                { label: 'Élek', value: '8 él (4 alapél + 4 oldalél)' },
                { label: 'Csúcsok', value: '5 csúcs (4 alapon + 1 főcsúcs)' }
              ]}
              caption="Példa: egyiptomi piramisok, templomtorony."
            />
          </GeometryFigureGrid>
        </TheoryCard>

        {/* Euler-féle poliédertétel kártya */}
        <TheoryCard
          title="Az Euler-féle poliédertétel (Euler-formula)"
          subtitle="Lenyűgöző matematikai törvény, amely minden konvex síklapú testre igaz"
          themeColor="blue"
        >
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-teal-500/10 border-2 border-blue-300 dark:border-blue-800 text-center mb-4">
            <span className="text-xs uppercase font-black text-blue-600 dark:text-blue-400 tracking-wider">
              Euler-féle összefüggés
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white my-2 tracking-tight">
              <MathText>{'\\text{Csúcsok (C)} + \\text{Lapok (L)} - \\text{Élek (É)} = 2'}</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Vagy másképp átrendezve:{' '}
              <strong className="text-blue-700 dark:text-blue-300">
                <MathText>{'C + L = \\acute{E} + 2'}</MathText>
              </strong>
            </p>
          </div>

          <TheoryTable
            title="Az Euler-formula ellenőrzése a legfontosabb poliéderekre"
            columns={['Poliéder neve', 'Csúcsok (C)', 'Lapok (L)', 'Élek (É)', 'C + L - É = 2']}
            rows={[
              ['Kocka', '8', '6', '12', '8 + 6 - 12 = 14 - 12 = 2 ✓'],
              ['Téglatest', '8', '6', '12', '8 + 6 - 12 = 14 - 12 = 2 ✓'],
              ['3 oldalú prizma', '6', '5', '9', '6 + 5 - 9 = 11 - 9 = 2 ✓'],
              ['Négyzet alapú gúla', '5', '5', '8', '5 + 5 - 8 = 10 - 8 = 2 ✓'],
              ['3 oldalú gúla (tetraéder)', '4', '4', '6', '4 + 4 - 6 = 8 - 6 = 2 ✓'],
              ['5 oldalú prizma', '10', '7', '15', '10 + 7 - 15 = 17 - 15 = 2 ✓']
            ]}
          />

          <TheoryCallout variant="warning" title="Kivételes szabály: Mire NEM érvényes az Euler-formula?" className="mt-4">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Az Euler-tétel <strong>kizárólag konvex síklapú poliéderekre</strong> igaz! Nem alkalmazható görbe felületű testekre (hengerre, kúpra, gömbre), sem olyan testekre, amelyeknek lyuk van a közepén (pl. fánk/tórusz).
            </p>
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 5. SZEKCIÓ: GÖRBE FELÜLETŰ TESTEK ÉS FORGÁSTESTEK */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-bodies-curved"
        number={5}
        title="Görbe felületű testek és forgástestek"
        badge="Görbe felületek"
        badgeColor="amber"
      >
        <TheoryCard
          title="A három alapvető görbe felületű test jellemzői"
          subtitle="Henger, kúp és gömb: lapok, élek és csúcsok pontos számai"
          themeColor="amber"
        >
          <GeometryFigureGrid columns={3}>
            {/* 1. Henger */}
            <GeometryFigureCard
              title="Henger (Körhenger)"
              subtitle="2 sík körlap + görbe palást"
              badge="3L • 2É • 0C"
              badgeColor="teal"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-16 h-16 sm:w-18 sm:h-18 mx-auto" viewBox="0 0 80 80" fill="none">
                  {/* Palást palástteste */}
                  <path
                    d="M 18 22 L 18 58 A 22 8 0 0 0 62 58 L 62 22 A 22 8 0 0 1 18 22 Z"
                    fill="#5eead4"
                    stroke="#0f766e"
                    strokeWidth="1.5"
                  />
                  {/* Alsó hátsó rejtett él (szaggatott) */}
                  <path
                    d="M 18 58 A 22 8 0 0 1 62 58"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="1.3"
                    strokeDasharray="2.5 2.5"
                  />
                  {/* Alsó elülső él (folytonos) */}
                  <path
                    d="M 18 58 A 22 8 0 0 0 62 58"
                    fill="none"
                    stroke="#0f766e"
                    strokeWidth="1.5"
                  />
                  {/* Felső teljes körlap (mindig a palást tetején!) */}
                  <ellipse
                    cx="40"
                    cy="22"
                    rx="22"
                    ry="8"
                    fill="#99f6e4"
                    stroke="#0d9488"
                    strokeWidth="1.5"
                  />
                </svg>
              }
              properties={[
                { label: 'Lapok', value: '3 lap (2 sík körlap + 1 palást)' },
                { label: 'Élek', value: '2 görbe kör él (nincs egyenes él)' },
                { label: 'Csúcsok', value: '0 csúcs (nincs sarokpontja!)' }
              ]}
              caption="Keletkezése: téglalap forgatása az egyik oldala körül."
            />

            {/* 2. Kúp */}
            <GeometryFigureCard
              title="Kúp (Körkúp)"
              subtitle="1 sík körlap + görbe palást"
              badge="2L • 1É • 1C"
              badgeColor="amber"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-16 h-16 sm:w-18 sm:h-18 mx-auto" viewBox="0 0 80 80">
                  <path d="M40 14 L16 58 A24 8 0 0 0 64 58 Z" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
                  <ellipse cx="40" cy="58" rx="24" ry="8" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="40" cy="14" r="3" fill="#b45309" />
                  <text x="52" y="16" className="text-[9px] font-black fill-amber-900">Csúcs</text>
                </svg>
              }
              properties={[
                { label: 'Lapok', value: '2 lap (1 sík kör alaplap + 1 palást)' },
                { label: 'Élek', value: '1 görbe kör él az alap körül' },
                { label: 'Csúcsok', value: '1 csúcs (szemben az alaplappal)' }
              ]}
              caption="Keletkezése: derékszögű háromszög forgatása az egyik befogó körül."
            />

            {/* 3. Gömb */}
            <GeometryFigureCard
              title="Gömb"
              subtitle="Tökéletesen szimmetrikus test"
              badge="1L • 0É • 0C"
              badgeColor="rose"
              figureHeight="h-16 sm:h-20 min-h-0"
              figure={
                <svg className="w-16 h-16 sm:w-18 sm:h-18 mx-auto" viewBox="0 0 80 80">
                  <defs>
                    <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#fecdd3" />
                      <stop offset="60%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#9f1239" />
                    </radialGradient>
                  </defs>
                  <circle cx="40" cy="40" r="28" fill="url(#sphereGrad)" stroke="#881337" strokeWidth="1.5" />
                  <ellipse cx="40" cy="40" rx="28" ry="8" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
                </svg>
              }
              properties={[
                { label: 'Lapok', value: '1 zárt gömbfelület (görbe)' },
                { label: 'Élek', value: '0 él (nincs metszésvonal)' },
                { label: 'Csúcsok', value: '0 csúcs (nincs sarokpont)' }
              ]}
              caption="Keletkezése: félkör forgatása az átmérője körül."
            />
          </GeometryFigureGrid>

          <TheoryTable
            title="Összegző táblázat: a legfontosabb testek tulajdonságai egy pillantásra"
            columns={['Test neve', 'Típus', 'Lapok (L)', 'Élek (É)', 'Csúcsok (C)', 'Határoló lapok']}
            rows={[
              ['Kocka', 'Síklapú (poliéder)', '6', '12', '8', '6 egybevágó négyzet'],
              ['Téglatest', 'Síklapú (poliéder)', '6', '12', '8', '6 téglalap (páronként egybevágók)'],
              ['3 oldalú prizma', 'Síklapú (hasáb)', '5', '9', '6', '2 háromszög + 3 téglalap'],
              ['Négyzetes gúla', 'Síklapú (piramis)', '5', '8', '5', '1 négyzet + 4 háromszög'],
              ['Henger', 'Görbe (forgástest)', '3', '2', '0', '2 körlap + 1 görbe palást'],
              ['Kúp', 'Görbe (forgástest)', '2', '1', '1', '1 körlap + 1 görbe palást'],
              ['Gömb', 'Görbe (forgástest)', '1', '0', '0', '1 zárt görbe gömbfelület']
            ]}
          />
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 6. SZEKCIÓ: PONTOK ÉS VONALAK A SÍKBAN ÉS TÉRBEN */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-bodies-lines"
        number={6}
        title="Pontok és vonalak: egyenes, félegyenes, szakasz és illeszkedés"
        badge="Alakzatok és Jelölések"
        badgeColor="violet"
      >
        <TheoryCard
          title="Az egyenes vonalak három alapvető változata"
          subtitle="Hogyan különböztetjük meg az egyenest, a félegyenest és a szakaszt?"
          themeColor="violet"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="h-16 flex items-center justify-center bg-white dark:bg-slate-950 rounded-xl mb-2">
                <svg className="w-48 h-10" viewBox="0 0 160 30">
                  <line x1="5" y1="15" x2="155" y2="15" stroke="#6366f1" strokeWidth="2" strokeDasharray="none" />
                  <text x="145" y="10" className="text-[10px] font-bold fill-indigo-600">e</text>
                </svg>
              </div>
              <h5 className="font-bold text-sm text-slate-800 dark:text-slate-100">Egyenes (e)</h5>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 mt-1 list-disc list-inside">
                <li>Mindkét irányban a <strong>végtelenbe tart</strong>.</li>
                <li>Nincs kezdő- és végpontja.</li>
                <li>Hossza nem mérhető, végtelen.</li>
                <li>Kisbetűvel jelöljük: <MathText>{'e, f, g'}</MathText>.</li>
              </ul>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="h-16 flex items-center justify-center bg-white dark:bg-slate-950 rounded-xl mb-2">
                <svg className="w-48 h-10" viewBox="0 0 160 30">
                  <line x1="40" y1="15" x2="155" y2="15" stroke="#0ea5e9" strokeWidth="2" />
                  <circle cx="40" cy="15" r="3.5" fill="#0284c7" />
                  <text x="40" y="27" textAnchor="middle" className="text-[10px] font-bold fill-sky-800">A</text>
                </svg>
              </div>
              <h5 className="font-bold text-sm text-slate-800 dark:text-slate-100">Félegyenes</h5>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 mt-1 list-disc list-inside">
                <li>Pontosan <strong>egy kezdőpontja (A)</strong> van.</li>
                <li>A másik irányban végtelen.</li>
                <li>Hossza nem mérhető.</li>
                <li>Az egyenest egy pontja 2 félegyenesre osztja.</li>
              </ul>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="h-16 flex items-center justify-center bg-white dark:bg-slate-950 rounded-xl mb-2">
                <svg className="w-48 h-10" viewBox="0 0 160 30">
                  <line x1="30" y1="15" x2="130" y2="15" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="30" cy="15" r="3.5" fill="#047857" />
                  <circle cx="130" cy="15" r="3.5" fill="#047857" />
                  <text x="30" y="27" textAnchor="middle" className="text-[10px] font-bold fill-emerald-800">A</text>
                  <text x="130" y="27" textAnchor="middle" className="text-[10px] font-bold fill-emerald-800">B</text>
                </svg>
              </div>
              <h5 className="font-bold text-sm text-slate-800 dark:text-slate-100">Szakasz (AB)</h5>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 mt-1 list-disc list-inside">
                <li><strong>Két végpontja (A és B)</strong> van.</li>
                <li>Az egyenes két pont közötti darabja.</li>
                <li><strong>Hossza mérhető</strong> vonalzóval!</li>
                <li>Jelölése: <MathText>{'AB = 5\\text{ cm}'}</MathText> vagy <MathText>{'|AB|'}</MathText>.</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="p-3.5 bg-violet-50/60 dark:bg-violet-950/20 rounded-2xl border border-violet-200 dark:border-violet-800">
              <h4 className="font-bold text-xs uppercase tracking-wider text-violet-800 dark:text-violet-300 mb-2">
                Illeszkedési relációk
              </h4>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                <li>
                  <MathText>{'P \\in e'}</MathText>: A <MathText>{'P'}</MathText> pont rajta van az <MathText>{'e'}</MathText> egyenesen (illeszkedik).
                </li>
                <li>
                  <MathText>{'Q \\notin e'}</MathText>: A <MathText>{'Q'}</MathText> pont nincs rajta az <MathText>{'e'}</MathText> egyenesen.
                </li>
                <li>
                  <strong>Alaptétel:</strong> Bármely két különböző ponton <strong>pontosan egy egyenes</strong> fektethető át!
                </li>
              </ul>
            </div>

            <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/20 rounded-2xl border border-blue-200 dark:border-blue-800">
              <h4 className="font-bold text-xs uppercase tracking-wider text-blue-800 dark:text-blue-300 mb-2">
                Két egyenes kölcsönös helyzete a síkban
              </h4>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                <li>
                  <strong>Metsző egyenesek:</strong> Pontosan 1 közös pontjuk van (<MathText>{'e \\cap f = \\{M\\}'}</MathText>).
                </li>
                <li>
                  <strong>Merőleges egyenesek:</strong> <MathText>{'90^\\circ'}</MathText>-os derékszöget zárnak be (<MathText>{'e \\perp f'}</MathText>).
                </li>
                <li>
                  <strong>Párhuzamos egyenesek:</strong> Nincs közös pontjuk (<MathText>{'e \\parallel f'}</MathText>, <MathText>{'e \\cap f = \\emptyset'}</MathText>).
                </li>
              </ul>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 7. SZEKCIÓ: GYAKORI CSAPDÁK ÉS TÉVHITEK */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-bodies-traps"
        number={7}
        title="Gyakori tévhitek és csapdák a testek és dimenziók témájában"
        badge="Mire figyelj nagyon?"
        badgeColor="rose"
      >
        <TheoryTrapBox
          title="Gyakori csapdák & tipikus tévhitek a testek és határok témakörében"
          traps={[
            {
              title: '1. Csapda: Síkidom vs. Test összekeverése (Négyzet vs. Kocka)',
              wrong: 'Azt mondani egy kockára, hogy „négyzet”, vagy egy gömbre, hogy „kör”.',
              correct: 'A négyzet és a kör lapos síkidomok (2D, nincs térfogatuk). A kocka és a gömb térbeli testek (3D, teret töltenek be és meg lehet őket fogni).',
              explanation: 'A négyzet a kockának csupán az egyik határoló lapja, de maga a kocka egy 3D térbeli test!'
            },
            {
              title: '2. Csapda: A henger csúcsainak a száma',
              wrong: 'Azt hinni, hogy a hengernek van 2 csúcsa (a két körlap közepe vagy pereme).',
              correct: 'A hengernek PONTOSAN 0 CSÚCSA van! A két körlap találkozása a palásttal kör él, csúcs (sarokpont) sehol sincs rajta.',
              explanation: 'Csak ott van csúcs, ahol élek találkoznak egy pontban. A kúpnak 1 csúcsa van, a hengernek és a gömbnek 0.'
            },
            {
              title: '3. Csapda: „Megmérem az egyenes hosszát a füzetemben”',
              wrong: 'Azt mondani, hogy „berajzoltam egy 8 cm hosszú egyenest”.',
              correct: 'Egyenesnek nem mérhető a hossza, mert mindkét irányban a végtelenbe nyúlik. Amit 8 cm hosszúra húztál, az egy 8 cm-es SZAKASZ!',
              explanation: 'A füzetbe húzott vonal a szakasz modellje; az egyenest csak jelképesen tudjuk ábrázolni nyíllal vagy betűvel.'
            },
            {
              title: '4. Csapda: Az Euler-formula fejetlen alkalmazása hengerre vagy gömbre',
              wrong: 'Kiszámolni a hengerre az Euler-formulát: C + L - É = 0 + 3 - 2 = 1, és ráfogni, hogy hibás a tétel.',
              correct: 'Az Euler-formula (C + L - É = 2) KIZÁRÓLAG síklapú poliéderekre érvényes! Görbe felületű testekre (henger, kúp, gömb) tilos alkalmazni.',
              explanation: 'Leonard Euler a tételt kizárólag egyenes élű, síklapú konvex poliéderekre bizonyította be.'
            },
            {
              title: '5. Csapda: „A kocka nem téglatest” tévhit',
              wrong: 'Különálló, egymást kizáró testekként kezelni a kockát és a téglatestet.',
              correct: 'Minden kocka téglatest! A kocka egy olyan speciális téglatest, amelynek minden éle egyenlő hosszú (a = b = c), így minden lapja négyzet.',
              explanation: 'Hasonlóan ahhoz, hogy minden négyzet téglalap: a speciális forma része az általánosabb családnak.'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default BodiesTheory;
