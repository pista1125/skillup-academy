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
  FlipHorizontal,
  Shapes,
  Maximize2,
  Sliders,
  Scale
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface SymmetryComparisonTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

type ShapeType =
  | 'isosceles-triangle'
  | 'equilateral-triangle'
  | 'general-triangle'
  | 'parallelogram'
  | 'rectangle'
  | 'rhombus'
  | 'square'
  | 'deltoid'
  | 'isosceles-trapezoid'
  | 'regular-hexagon'
  | 'circle';

interface ShapeInfo {
  name: string;
  category: 'triangle' | 'quadrilateral' | 'polygon' | 'other';
  axialAxes: number | string; // e.g. 1, 2, 4, 'végtelen'
  hasCenter: boolean;
  notes: string;
  axesDescription: string;
}

const SHAPE_DATA: Record<ShapeType, ShapeInfo> = {
  'isosceles-triangle': {
    name: 'Egyenlő szárú háromszög',
    category: 'triangle',
    axialAxes: 1,
    hasCenter: false,
    notes: 'Egyetlen tengelye az alaphoz tartozó felezőmerőleges (egyben szögfelező és magasságvonal).',
    axesDescription: '1 szimmetriatengely (alap felezőmerőlegese)'
  },
  'equilateral-triangle': {
    name: 'Szabályos háromszög',
    category: 'triangle',
    axialAxes: 3,
    hasCenter: false,
    notes: 'Mindhárom oldal felezőmerőlegese szimmetriatengely. Nincs szimmetriaközéppontja (háromszög sosem középpontos)!',
    axesDescription: '3 szimmetriatengely'
  },
  'general-triangle': {
    name: 'Általános háromszög',
    category: 'triangle',
    axialAxes: 0,
    hasCenter: false,
    notes: 'Sem tengelyes, sem középpontos szimmetriával nem rendelkezik.',
    axesDescription: '0 szimmetriatengely'
  },
  'parallelogram': {
    name: 'Általános paralelogramma',
    category: 'quadrilateral',
    axialAxes: 0,
    hasCenter: true,
    notes: 'Nincs szimmetriatengelye! Viszont KÖZÉPPONTOSAN SZIMMETRIKUS az átlók metszéspontjára!',
    axesDescription: '0 szimmetriatengely, 1 szimmetriaközéppont'
  },
  'rectangle': {
    name: 'Téglalap',
    category: 'quadrilateral',
    axialAxes: 2,
    hasCenter: true,
    notes: '2 szimmetriatengelye van: a szemközti oldalak felezőmerőlegesei. (Az átlók NEM tengelyek!) Kettős szimmetria miatt középpontos is.',
    axesDescription: '2 szimmetriatengely (oldalfelezők) + 1 középpont'
  },
  'rhombus': {
    name: 'Rombusz',
    category: 'quadrilateral',
    axialAxes: 2,
    hasCenter: true,
    notes: '2 szimmetriatengelye van: az átlók egyenesei. (Az átlók merőlegesek egymásra!) Kettős szimmetria miatt középpontos is.',
    axesDescription: '2 szimmetriatengely (átlók) + 1 középpont'
  },
  'square': {
    name: 'Négyzet',
    category: 'quadrilateral',
    axialAxes: 4,
    hasCenter: true,
    notes: '4 szimmetriatengelye van: 2 oldalfelező + 2 átló. Szuper-szimmetrikus, középpontos is.',
    axesDescription: '4 szimmetriatengely + 1 középpont'
  },
  'deltoid': {
    name: 'Deltoid (konvex)',
    category: 'quadrilateral',
    axialAxes: 1,
    hasCenter: false,
    notes: '1 szimmetriatengelye van: a szimmetriaátló (főátló) egyenese. Nem középpontosan szimmetrikus.',
    axesDescription: '1 szimmetriatengely (főátló)'
  },
  'isosceles-trapezoid': {
    name: 'Szimmetrikus (húr)trapéz',
    category: 'quadrilateral',
    axialAxes: 1,
    hasCenter: false,
    notes: '1 szimmetriatengelye van: a párhuzamos alapok közös felezőmerőlegese. Nem középpontos.',
    axesDescription: '1 szimmetriatengely (alapok felezőmerőlegese)'
  },
  'regular-hexagon': {
    name: 'Szabályos hatszög',
    category: 'polygon',
    axialAxes: 6,
    hasCenter: true,
    notes: '6 szimmetriatengelye van (3 főátló + 3 oldalfelező). Mivel páros oldalszámú szabályos sokszög, középpontos is!',
    axesDescription: '6 szimmetriatengely + 1 középpont'
  },
  'circle': {
    name: 'Kör',
    category: 'other',
    axialAxes: 'végtelen',
    hasCenter: true,
    notes: 'Minden átmérő egyenese szimmetriatengely (végtelen sok). A kör középpontja pedig szimmetriaközéppont.',
    axesDescription: 'Végtelen sok tengely + 1 középpont'
  }
};

export const SymmetryComparisonTheory: React.FC<SymmetryComparisonTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Lab state
  const [labTab, setLabTab] = useState<'shapes' | 'comparison' | 'double'>('shapes');
  const [selectedShape, setSelectedShape] = useState<ShapeType>('parallelogram');
  const [showAxes, setShowAxes] = useState<boolean>(true);
  const [showCenter, setShowCenter] = useState<boolean>(true);

  // Comparison tab state
  const [transMode, setTransMode] = useState<'axial' | 'central'>('axial');
  const [angleSlider, setAngleSlider] = useState<number>(180);

  const shapeData = SHAPE_DATA[selectedShape];

  // Helper render for SVG shapes in Interactive Lab
  const renderShapeSvg = (shape: ShapeType) => {
    switch (shape) {
      case 'parallelogram':
        return (
          <g>
            <polygon points="50,110 170,110 210,40 90,40" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
            {/* Diagonals */}
            {showCenter && (
              <>
                <line x1="50" y1="110" x2="210" y2="40" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="90" y1="40" x2="170" y2="110" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="130" cy="75" r="4.5" fill="#d97706" />
                <text x="138" y="72" className="text-[10px] font-bold fill-amber-800">O (centrum)</text>
              </>
            )}
            {showAxes && (
              <text x="65" y="130" className="text-[9px] font-bold fill-rose-600">Nincs szimmetriatengely!</text>
            )}
          </g>
        );
      case 'rectangle':
        return (
          <g>
            <rect x="50" y="45" width="160" height="70" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
            {showAxes && (
              <>
                {/* Horizontal axis */}
                <line x1="30" y1="80" x2="230" y2="80" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" />
                {/* Vertical axis */}
                <line x1="130" y1="25" x2="130" y2="135" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" />
                <text x="215" y="75" className="text-[9px] font-bold fill-rose-600">t₁</text>
                <text x="135" y="35" className="text-[9px] font-bold fill-rose-600">t₂</text>
              </>
            )}
            {showCenter && (
              <>
                <circle cx="130" cy="80" r="4.5" fill="#0284c7" />
                <text x="138" y="93" className="text-[10px] font-bold fill-sky-800">O (metszéspont)</text>
              </>
            )}
          </g>
        );
      case 'rhombus':
        return (
          <g>
            <polygon points="130,30 200,80 130,130 60,80" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="2.5" />
            {showAxes && (
              <>
                {/* Vertical diagonal axis */}
                <line x1="130" y1="15" x2="130" y2="145" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" />
                {/* Horizontal diagonal axis */}
                <line x1="45" y1="80" x2="215" y2="80" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" />
                <text x="135" y="25" className="text-[9px] font-bold fill-rose-600">t₁ (átló)</text>
                <text x="200" y="75" className="text-[9px] font-bold fill-rose-600">t₂ (átló)</text>
              </>
            )}
            {showCenter && (
              <>
                <circle cx="130" cy="80" r="4.5" fill="#7c3aed" />
                <text x="136" y="94" className="text-[10px] font-bold fill-purple-900">O</text>
              </>
            )}
          </g>
        );
      case 'square':
        return (
          <g>
            <rect x="75" y="35" width="90" height="90" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5" />
            {showAxes && (
              <>
                <line x1="60" y1="80" x2="180" y2="80" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 2" />
                <line x1="120" y1="20" x2="120" y2="140" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 2" />
                <line x1="65" y1="25" x2="175" y2="135" stroke="#f97316" strokeWidth="1.8" strokeDasharray="4 2" />
                <line x1="65" y1="135" x2="175" y2="25" stroke="#f97316" strokeWidth="1.8" strokeDasharray="4 2" />
                <text x="175" y="75" className="text-[8px] font-bold fill-rose-600">4 tengely!</text>
              </>
            )}
            {showCenter && (
              <>
                <circle cx="120" cy="80" r="4.5" fill="#16a34a" />
                <text x="126" y="93" className="text-[10px] font-bold fill-emerald-800">O</text>
              </>
            )}
          </g>
        );
      case 'deltoid':
        return (
          <g>
            <polygon points="120,25 175,70 120,135 65,70" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2.5" />
            {showAxes && (
              <>
                <line x1="120" y1="10" x2="120" y2="150" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" />
                <text x="125" y="25" className="text-[9px] font-bold fill-rose-600">t (főátló)</text>
              </>
            )}
            {showCenter && (
              <text x="65" y="145" className="text-[9px] font-bold fill-slate-500">Nincs szimmetriaközéppont!</text>
            )}
          </g>
        );
      case 'isosceles-triangle':
        return (
          <g>
            <polygon points="120,30 180,120 60,120" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2.5" />
            {showAxes && (
              <>
                <line x1="120" y1="15" x2="120" y2="135" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" />
                <text x="125" y="25" className="text-[9px] font-bold fill-rose-600">t (felezőmerőleges)</text>
              </>
            )}
            {showCenter && (
              <text x="55" y="145" className="text-[9px] font-bold fill-slate-500">Háromszögnek sosem van centruma!</text>
            )}
          </g>
        );
      case 'equilateral-triangle':
        return (
          <g>
            <polygon points="120,30 185,125 55,125" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2.5" />
            {showAxes && (
              <>
                <line x1="120" y1="15" x2="120" y2="140" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 2" />
                <line x1="45" y1="130" x2="160" y2="65" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 2" />
                <line x1="195" y1="130" x2="80" y2="65" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 2" />
                <text x="125" y="25" className="text-[8px] font-bold fill-rose-600">3 tengely</text>
              </>
            )}
            {showCenter && (
              <text x="50" y="145" className="text-[9px] font-bold fill-slate-500">Középpontos? NEM! (Forgásszimmetrikus 120°-ra, de nem 180°-ra)</text>
            )}
          </g>
        );
      case 'isosceles-trapezoid':
        return (
          <g>
            <polygon points="80,50 160,50 190,120 50,120" fill="#ede9fe" stroke="#6d28d9" strokeWidth="2.5" />
            {showAxes && (
              <>
                <line x1="120" y1="35" x2="120" y2="135" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" />
                <text x="125" y="45" className="text-[9px] font-bold fill-rose-600">t (alapok felezője)</text>
              </>
            )}
            {showCenter && (
              <text x="75" y="145" className="text-[9px] font-bold fill-slate-500">Nincs középpontja!</text>
            )}
          </g>
        );
      case 'regular-hexagon':
        return (
          <g>
            <polygon points="120,30 170,55 170,105 120,130 70,105 70,55" fill="#f0fdf4" stroke="#15803d" strokeWidth="2.5" />
            {showAxes && (
              <>
                <line x1="120" y1="20" x2="120" y2="140" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
                <line x1="60" y1="50" x2="180" y2="110" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
                <line x1="60" y1="110" x2="180" y2="50" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="135" y="25" className="text-[8px] font-bold fill-rose-600">6 tengely</text>
              </>
            )}
            {showCenter && (
              <>
                <circle cx="120" cy="80" r="4" fill="#15803d" />
                <text x="126" y="85" className="text-[9px] font-bold fill-emerald-800">O</text>
              </>
            )}
          </g>
        );
      case 'circle':
        return (
          <g>
            <circle cx="120" cy="80" r="45" fill="#fdf4ff" stroke="#a21caf" strokeWidth="2.5" />
            {showAxes && (
              <>
                <line x1="65" y1="80" x2="175" y2="80" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
                <line x1="120" y1="25" x2="120" y2="135" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
                <line x1="80" y1="40" x2="160" y2="120" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
                <line x1="80" y1="120" x2="160" y2="40" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="125" y="35" className="text-[8px] font-bold fill-rose-600">∞ tengely</text>
              </>
            )}
            {showCenter && (
              <>
                <circle cx="120" cy="80" r="4" fill="#a21caf" />
                <text x="126" y="85" className="text-[9px] font-bold fill-fuchsia-900">O</text>
              </>
            )}
          </g>
        );
      case 'general-triangle':
      default:
        return (
          <g>
            <polygon points="70,40 180,70 100,120" fill="#f1f5f9" stroke="#64748b" strokeWidth="2.5" />
            <text x="60" y="140" className="text-[10px] font-bold fill-slate-500">Sem tengelyes, sem középpontos szimmetriája nincs!</text>
          </g>
        );
    }
  };

  return (
    <TheoryTemplate
      badgeText="7. OSZTÁLY • GEOMETRIA • 📖 TANANYAG"
      title="8. Középpontos és tengelyes szimmetria"
      subtitle="A két alapvető síkbeli szimmetria összehasonlítása, különbségei, szimmetriatulajdonságok és síkidomok osztályozása"
      themeColor="violet"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      pdfFilename="7_osztaly_kozeppontos_es_tengelyes_szimmetria.pdf"
      quickRule={{
        label: 'A szimmetria alaptételei',
        formula: 'Tengelyes: tengely = fixpontok, irányítás megfordul | Középpontos: 1 fixpont (O), párhuzamos kép (e ∥ e\'), irányítástartó | Kettős: 2 merőleges tengely ⟹ centrum!'
      }}
    >
      {/* INTERAKTÍV SZIMMETRIA LABOR */}
      <TheorySection
        number={1}
        title="Interaktív Szimmetria Laboratórium"
        badgeColor="violet"
        icon={<Sliders className="w-5 h-5 text-violet-600" />}
      >
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-violet-50/50 via-white to-purple-50/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-violet-950/30 border-2 border-violet-200 dark:border-violet-800 shadow-md mb-8 rounded-2xl">
          {/* Mode switch */}
          <div className="flex flex-wrap gap-2 mb-5">
            <Button
              variant={labTab === 'shapes' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLabTab('shapes')}
              className={labTab === 'shapes' ? 'bg-violet-600 hover:bg-violet-700 text-white font-bold' : ''}
            >
              <Shapes className="w-4 h-4 mr-1.5" />
              1. Síkidomok szimmetriái
            </Button>
            <Button
              variant={labTab === 'comparison' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLabTab('comparison')}
              className={labTab === 'comparison' ? 'bg-violet-600 hover:bg-violet-700 text-white font-bold' : ''}
            >
              <Scale className="w-4 h-4 mr-1.5" />
              2. Tengelyes vs. Középpontos tükrözés
            </Button>
            <Button
              variant={labTab === 'double' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLabTab('double')}
              className={labTab === 'double' ? 'bg-violet-600 hover:bg-violet-700 text-white font-bold' : ''}
            >
              <RotateCw className="w-4 h-4 mr-1.5" />
              3. Kettős szimmetria tétele
            </Button>
          </div>

          {/* TAB 1: SÍKIDOMOK SZIMMETRIÁI */}
          {labTab === 'shapes' && (
            <div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
                Válassz ki egy síkidomot, kapcsold be a szimmetriatengelyeket és a középpontot, és figyeld meg az alakzat szimmetriaviszonyait!
              </p>

              {/* Shape selection pills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {(Object.keys(SHAPE_DATA) as ShapeType[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedShape(st)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                      selectedShape === st
                        ? 'bg-violet-600 text-white font-bold shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {SHAPE_DATA[st].name}
                  </button>
                ))}
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-4 mb-4 items-center">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showAxes}
                    onChange={(e) => setShowAxes(e.target.checked)}
                    className="rounded text-violet-600 focus:ring-violet-500 w-4 h-4"
                  />
                  Szimmetriatengelyek mutatása
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showCenter}
                    onChange={(e) => setShowCenter(e.target.checked)}
                    className="rounded text-violet-600 focus:ring-violet-500 w-4 h-4"
                  />
                  Szimmetriaközéppont mutatása
                </label>
              </div>

              {/* Shape Visualization and Details */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[220px]">
                  <svg viewBox="0 0 240 160" className="w-full max-w-[280px] h-48">
                    {renderShapeSvg(selectedShape)}
                  </svg>
                </div>

                <div className="md:col-span-5 space-y-3">
                  <div className="p-3.5 bg-violet-100/70 dark:bg-violet-950/60 rounded-xl border border-violet-200 dark:border-violet-800">
                    <div className="text-xs uppercase font-extrabold text-violet-700 dark:text-violet-300 tracking-wider mb-1">
                      Kiválasztott alakzat
                    </div>
                    <div className="text-base font-black text-slate-900 dark:text-white">
                      {shapeData.name}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                      <div className="font-bold text-slate-500 dark:text-slate-400">Tengelyek száma:</div>
                      <div className="font-extrabold text-violet-600 dark:text-violet-400 text-sm mt-0.5">
                        {shapeData.axialAxes === 'végtelen' ? '∞ (végtelen)' : `${shapeData.axialAxes} db`}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                      <div className="font-bold text-slate-500 dark:text-slate-400">Középpont:</div>
                      <div className={`font-extrabold text-sm mt-0.5 ${shapeData.hasCenter ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {shapeData.hasCenter ? '✓ Van centrum' : '✗ Nincs centrum'}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <strong>Megjegyzés:</strong> {shapeData.notes}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TRANSFORMATION COMPARISON */}
          {labTab === 'comparison' && (
            <div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
                Hasonlítsd össze az alakzat képét <strong>tengelyes tükrözés</strong> és <strong>középpontos tükrözés</strong> esetén! Figyeld meg a körüljárási irányt és a párhuzamosságot!
              </p>

              <div className="flex gap-2 mb-4">
                <Button
                  variant={transMode === 'axial' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTransMode('axial')}
                  className={transMode === 'axial' ? 'bg-amber-600 hover:bg-amber-700 text-white' : ''}
                >
                  <FlipHorizontal className="w-4 h-4 mr-1" />
                  Tengelyes tükrözés (t)
                </Button>
                <Button
                  variant={transMode === 'central' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTransMode('central')}
                  className={transMode === 'central' ? 'bg-teal-600 hover:bg-teal-700 text-white' : ''}
                >
                  <RotateCw className="w-4 h-4 mr-1" />
                  Középpontos tükrözés (O)
                </Button>
              </div>

              <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <svg viewBox="0 0 340 160" className="w-full h-48 mx-auto">
                  {transMode === 'axial' ? (
                    <g>
                      {/* Mirror line t */}
                      <line x1="170" y1="15" x2="170" y2="145" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5 3" />
                      <text x="175" y="25" className="text-[10px] font-bold fill-rose-600">t (tengely)</text>

                      {/* Original triangle ABC */}
                      <polygon points="60,40 120,40 60,110" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                      <text x="50" y="35" className="text-[9px] font-bold fill-amber-700">A</text>
                      <text x="125" y="35" className="text-[9px] font-bold fill-amber-700">B</text>
                      <text x="50" y="125" className="text-[9px] font-bold fill-amber-700">C</text>
                      <text x="75" y="70" className="text-[9px] font-black fill-amber-800">Eredeti</text>
                      <text x="55" y="145" className="text-[9px] font-bold fill-amber-800">Irányítás: A ➔ B ➔ C (óramutatóval ellentétes)</text>

                      {/* Mirrored triangle A'B'C' */}
                      <polygon points="280,40 220,40 280,110" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
                      <text x="285" y="35" className="text-[9px] font-bold fill-rose-700">A'</text>
                      <text x="210" y="35" className="text-[9px] font-bold fill-rose-700">B'</text>
                      <text x="285" y="125" className="text-[9px] font-bold fill-rose-700">C'</text>
                      <text x="245" y="70" className="text-[9px] font-black fill-rose-800">Tengelyes kép</text>
                      <text x="200" y="145" className="text-[9px] font-bold fill-rose-700">Irányítás MEGFORDULT! (óramutatóval egyező)</text>

                      {/* Connecting perpendicular dashed lines */}
                      <line x1="120" y1="40" x2="220" y2="40" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="60" y1="110" x2="280" y2="110" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                    </g>
                  ) : (
                    <g>
                      {/* Center O */}
                      <circle cx="170" cy="80" r="4.5" fill="#0d9488" />
                      <text x="175" y="75" className="text-[10px] font-black fill-teal-800">O (centrum)</text>

                      {/* Original triangle ABC */}
                      <polygon points="60,40 120,40 60,100" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
                      <text x="50" y="35" className="text-[9px] font-bold fill-teal-700">A</text>
                      <text x="125" y="35" className="text-[9px] font-bold fill-teal-700">B</text>
                      <text x="50" y="115" className="text-[9px] font-bold fill-teal-700">C</text>
                      <text x="75" y="65" className="text-[9px] font-black fill-teal-800">Eredeti</text>
                      <text x="50" y="140" className="text-[9px] font-bold fill-teal-800">Irányítás: A ➔ B ➔ C (óramutatóval ellentétes)</text>

                      {/* Central reflected triangle A'B'C' (points rotated 180° around (170,80)) */}
                      {/* A(60,40) -> (280,120), B(120,40) -> (220,120), C(60,100) -> (280,60) */}
                      <polygon points="280,120 220,120 280,60" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
                      <text x="285" y="130" className="text-[9px] font-bold fill-emerald-700">A'</text>
                      <text x="210" y="130" className="text-[9px] font-bold fill-emerald-700">B'</text>
                      <text x="285" y="55" className="text-[9px] font-bold fill-emerald-700">C'</text>
                      <text x="245" y="95" className="text-[9px] font-black fill-emerald-800">Középpontos kép</text>
                      <text x="190" y="150" className="text-[9px] font-bold fill-emerald-700">Irányítás MEGMARAD! (óramutatóval ellentétes)</text>

                      {/* Connecting lines through O */}
                      <line x1="60" y1="40" x2="280" y2="120" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="120" y1="40" x2="220" y2="120" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="60" y1="100" x2="280" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />

                      <text x="120" y="20" className="text-[9px] font-bold fill-teal-900">AB ∥ A'B' (mindig párhuzamosak!)</text>
                    </g>
                  )}
                </svg>

                <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  {transMode === 'axial' ? (
                    <p>
                      <strong>Tengelyes tükrözés lényege:</strong> A pont és képe a tengelyre merőleges egyenesen van, attól egyenlő távolságra. <strong>A körüljárási irány megfordul!</strong> (A síkból való 3D kifordításnak felel meg). A tengely pontjai helyben maradnak (végtelen sok fixpont).
                    </p>
                  ) : (
                    <p>
                      <strong>Középpontos tükrözés lényege:</strong> A centrum az összekötő szakasz felezőpontja. <strong>A körüljárási irány megmarad!</strong> (A síkbeli 180°-os elforgatásnak felel meg). <strong>Minden egyenes képe párhuzamos az eredetivel</strong> (<MathText>{'e \\parallel e\''}</MathText>). Egyetlen fixpont van: a centrum.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KETTŐS SZIMMETRIA TÉTELE */}
          {labTab === 'double' && (
            <div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
                <strong>A kettős szimmetria alaptétele:</strong> Ha egy alakzatnak van <strong>két, egymásra merőleges szimmetriatengelye</strong> (<MathText>{'t_1 \\perp t_2'}</MathText>), akkor a két tengely metszéspontja szükségszerűen az alakzat <strong>szimmetriaközéppontja</strong>!
              </p>

              <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <svg viewBox="0 0 320 160" className="w-full h-44 mx-auto">
                  {/* Rectangle centered at (160, 80) */}
                  <rect x="90" y="45" width="140" height="70" fill="#ede9fe" stroke="#6d28d9" strokeWidth="2.5" />

                  {/* t1 horizontal axis */}
                  <line x1="60" y1="80" x2="260" y2="80" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" />
                  <text x="265" y="83" className="text-[10px] font-bold fill-rose-600">t₁</text>

                  {/* t2 vertical axis */}
                  <line x1="160" y1="20" x2="160" y2="140" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 3" />
                  <text x="165" y="30" className="text-[10px] font-bold fill-sky-600">t₂</text>

                  {/* Right angle marker at intersection */}
                  <rect x="160" y="70" width="10" height="10" fill="none" stroke="#64748b" strokeWidth="1" />
                  <circle cx="165" cy="75" r="1.5" fill="#64748b" />

                  {/* Center O */}
                  <circle cx="160" cy="80" r="5" fill="#d97706" />
                  <text x="170" y="95" className="text-[11px] font-black fill-amber-700">O = t₁ ∩ t₂ (Centrum!)</text>

                  {/* Text explanations */}
                  <text x="20" y="30" className="text-[9px] font-bold fill-slate-700">1. Tükrözés t₁-re: megfordul</text>
                  <text x="20" y="45" className="text-[9px] font-bold fill-slate-700">2. Tükrözés t₂-re: újra megfordul</text>
                  <text x="20" y="60" className="text-[9px] font-bold fill-emerald-600">Eredmény: 180°-os forgatás (O körül)</text>
                </svg>

                <div className="mt-3 p-3 bg-violet-50 dark:bg-violet-950/40 rounded-lg text-xs leading-relaxed border border-violet-200 dark:border-violet-800">
                  <strong>Miért igaz ez matematikailag?</strong>
                  <br />
                  A tengelyes tükrözés megfordítja az orientációt. Ha egymás után két, egymásra merőleges tengelyre tükrözünk, az orientáció kétszer fordul meg, tehát <strong>visszaáll</strong>! Két egymást <MathText>{'90^\\circ'}</MathText>-ban metsző tengelyre történő tükrözés egymásutánja (kompozíciója) pontosan egy <MathText>{'2 \\times 90^\\circ = 180^\\circ'}</MathText>-os elforgatás a metszéspont körül — ami definíció szerint a <strong>középpontos tükrözés</strong>!
                  <br />
                  <em>Ezért van szimmetriaközéppontja a téglalapnak, a rombusznak és a négyzetnek is!</em>
                </div>
              </div>
            </div>
          )}
        </Card>
      </TheorySection>

      {/* 2. SZEKCIÓ: A KÉT TRANSZFORMÁCIÓ ÖSSZEHASONLÍTÁSA */}
      <TheorySection
        number={2}
        title="A Tengelyes és Középpontos Tükrözés Alapvető Tulajdonságai"
        badgeColor="indigo"
        icon={<Scale className="w-5 h-5 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TheoryCard
            title="Tengelyes Tükrözés (Alapfogalmak)"
            badge="Tengelyes szimmetria"
            badgeColor="indigo"
          >
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2 mb-3">
              <li>
                <strong>Meghatározó elem:</strong> Egy <MathText>{'t'}</MathText> egyenes (a tükörtengely).
              </li>
              <li>
                <strong>Fixpontok:</strong> A <MathText>{'t'}</MathText> tengely összes pontja helyben marad (<span className="text-indigo-600 dark:text-indigo-400 font-bold">végtelen sok fixpont</span>).
              </li>
              <li>
                <strong>Fixegyenesek:</strong> Maga a <MathText>{'t'}</MathText> tengely (pontonként fix), valamint <em>minden olyan egyenes, amely merőleges a tengelyre</em> (<MathText>{'e \\perp t'}</MathText>).
              </li>
              <li>
                <strong>Körüljárási irány:</strong> <span className="text-rose-600 dark:text-rose-400 font-bold">MEGFORDUL</span> (irányításváltó transzformáció).
              </li>
              <li>
                <strong>Egyenes és képének helyzete:</strong> Vagy metszik egymást a tengelyen, vagy párhuzamosak a tengellyel (<MathText>{'e \\parallel t \\implies e\' \\parallel t'}</MathText>).
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Középpontos Tükrözés (Alapfogalmak)"
            badge="Középpontos szimmetria"
            badgeColor="teal"
          >
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2 mb-3">
              <li>
                <strong>Meghatározó elem:</strong> Egy <MathText>{'O'}</MathText> pont (a tükörközéppont / centrum).
              </li>
              <li>
                <strong>Fixpontok:</strong> <span className="text-teal-600 dark:text-teal-400 font-bold">Egyetlen fixpont van</span>: maga a tükörközéppont (<MathText>{'O'}</MathText>).
              </li>
              <li>
                <strong>Fixegyenesek:</strong> <em>Minden olyan egyenes, amely átmegy az <MathText>{'O'}</MathText> ponton</em>. (Irányuk megfordul, de önmagukba mennek át).
              </li>
              <li>
                <strong>Körüljárási irány:</strong> <span className="text-emerald-600 dark:text-emerald-400 font-bold">MEGMARAD</span> (irányítástartó transzformáció).
              </li>
              <li>
                <strong>Egyenes és képének helyzete:</strong> <span className="text-teal-600 dark:text-teal-400 font-bold">MINDIG PÁRHUZAMOS</span> az eredetivel (<MathText>{'e\' \\parallel e'}</MathText>), kivéve ha átmegy a centrumon!
              </li>
            </ul>
          </TheoryCard>
        </div>

        {/* COMPARISON TABLE */}
        <TheoryTable
          title="Részletes Összehasonlító Táblázat"
          headers={['Tulajdonság', 'Tengelyes Tükrözés', 'Középpontos Tükrözés']}
          rows={[
            ['Meghatározó elem', 't egyenes (tengely)', 'O pont (centrum)'],
            ['Fixpontok száma', 'Végtelen sok (a tengely pontjai)', 'Egyetlen fixpont (az O centrum)'],
            ['Fixegyenesek', 'A tengely és a rá merőleges egyenesek', 'Minden egyenes, ami átmegy O-n'],
            ['Körüljárási irány', 'MEGFORDUL (irányításváltó)', 'MEGMARAD (irányítástartó)'],
            ['Egyenes és képe', 'Metszik egymást a tengelyen, vagy párhuzamosak', 'Mindig párhuzamosak (e ∥ e\')'],
            ['Mozgatási analógia', 'Síkból 3D kifordítás (tükrözés)', 'Síkbeli 180°-os forgatás'],
            ['Távolságtartás', 'Igen (egybevágóság)', 'Igen (egybevágóság)'],
            ['Szögtartás', 'Igen', 'Igen']
          ]}
        />
      </TheorySection>

      {/* 3. SZEKCIÓ: SÍKIDOMOK SZIMMETRIÁINAK RENDSZEREZÉSE */}
      <TheorySection
        number={3}
        title="Síkidomok Szimmetriatáblázata és Csoportosítása"
        badgeColor="purple"
        icon={<Shapes className="w-5 h-5 text-purple-600" />}
      >
        <TheoryTable
          title="Nevezetes síkidomok szimmetriái"
          headers={['Síkidom', 'Szimmetriatengelyek száma', 'Tengelyek jellege', 'Középpontos szimmetria?']}
          rows={[
            ['Általános háromszög', '0', 'Nincs', 'NEM'],
            ['Egyenlő szárú háromszög', '1', 'Alap felezőmerőlegese', 'NEM'],
            ['Szabályos háromszög', '3', 'Oldalfelező merőlegesek', 'NEM'],
            ['Általános négyszög / trapéz', '0', 'Nincs', 'NEM'],
            ['Szimmetrikus (húr)trapéz', '1', 'Alapok közös felezőmerőlegese', 'NEM'],
            ['Deltoid', '1', 'Főátló (szimmetriaátló) egyenese', 'NEM'],
            ['Paralelogramma', '0', 'Nincs tengelye!', 'IGEN (átlók metszéspontja)'],
            ['Téglalap', '2', 'Szemközti oldalak felezőmerőlegesei', 'IGEN (átlók metszéspontja)'],
            ['Rombusz', '2', 'Az átlók egyenesei', 'IGEN (átlók metszéspontja)'],
            ['Négyzet', '4', '2 oldalfelező + 2 átló', 'IGEN (átlók metszéspontja)'],
            ['Szabályos páros sokszög (pl. 6-szög)', 'Páros (pl. 6)', 'Átlók és oldalfelezők', 'IGEN'],
            ['Szabályos páratlan sokszög (pl. 5-szög)', 'Páratlan (pl. 5)', 'Csúcsokat szemközti oldalfelezővel összekötők', 'NEM'],
            ['Kör', 'Végtelen sok (∞)', 'Minden átmérő egyenese', 'IGEN (a kör középpontja)']
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <TheoryCallout
            title="Aranyszabály: Háromszögek szimmetriája"
            type="info"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Egyetlen háromszög sem lehet középpontosan szimmetrikus!</strong>
              <br />
              Miért? Mert ha egy háromszöget középpontosan tükrözünk a belsejében lévő bármely pontra, a képe egy "fejjel lefelé" fordított háromszög lesz, amelynek a csúcsai sosem eshetnek egybe az eredeti háromszög csúcsaival.
            </p>
          </TheoryCallout>

          <TheoryTrapBox
            title="Gyakori Tévhitek és Vizsgacsapdák"
            traps={[
              {
                mistake: 'A paralelogrammának vannak szimmetriatengelyei.',
                correction: 'Az általános paralelogrammának 0 szimmetriatengelye van! Csak KÖZÉPPONTOSAN szimmetrikus az átlók metszéspontjára.'
              },
              {
                mistake: 'A téglalap szimmetriatengelyei az átlói.',
                correction: 'NEM! Ha a téglalapot az átlójára hajtod, a csúcsok kilógnak! A téglalap tengelyei a szemközti oldalak felezőmerőlegesei.'
              },
              {
                mistake: 'A szabályos háromszög középpontosan is szimmetrikus a súlypontjára.',
                correction: 'NEM! 120°-os forgásszimmetriája van, de 180°-os forgatásra (középpontos tükrözésre) fejjel lefelé áll.'
              }
            ]}
          />
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: BETŰK ÉS SZIMBÓLUMOK SZIMMETRIÁI */}
      <TheorySection
        number={4}
        title="Betűk, Szimbólumok és a Koordinátarendszer Szimmetriái"
        badgeColor="emerald"
        icon={<Sparkles className="w-5 h-5 text-emerald-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TheoryCard
            title="A Nyomtatott Nagybetűk Szimmetriája"
            badge="Gyakorlati alkalmazás"
            badgeColor="emerald"
          >
            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-amber-700 dark:text-amber-400">Csak függőleges tengely:</span>
                <span className="ml-2 font-mono font-black text-sm">A, M, T, U, V, W, Y</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-sky-700 dark:text-sky-400">Csak vízszintes tengely:</span>
                <span className="ml-2 font-mono font-black text-sm">B, C, D, E, K</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-teal-700 dark:text-teal-400">Csak KÖZÉPPONTOS (nincs tengely):</span>
                <span className="ml-2 font-mono font-black text-sm text-teal-600">N, S, Z</span>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Mindkettő (2 tengely + középpont):</span>
                <span className="ml-2 font-mono font-black text-sm text-emerald-700 dark:text-emerald-300">H, I, O, X</span>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                <span className="font-bold text-rose-800 dark:text-rose-300">Egyik sem (aszimmetrikus):</span>
                <span className="ml-2 font-mono font-black text-sm text-rose-600">F, G, J, L, P, Q, R</span>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Szimmetriák a Koordinátarendszerben"
            badge="Algebra és Geometria"
            badgeColor="indigo"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-3">
              A síkbeli derékszögű koordinátarendszerben egy tetszőleges <MathText>{'P(x; y)'}</MathText> pont koordinátái a következőképp változnak a tengelyekre és az origóra vett tükrözésnél:
            </p>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 flex justify-between items-center">
                <span className="font-bold text-violet-800 dark:text-violet-300">Tükrözés az x-tengelyre:</span>
                <span className="font-black text-violet-900 dark:text-violet-200">P'(x; -y)</span>
              </div>
              <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 flex justify-between items-center">
                <span className="font-bold text-sky-800 dark:text-sky-300">Tükrözés az y-tengelyre:</span>
                <span className="font-black text-sky-900 dark:text-sky-200">P'(-x; y)</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex justify-between items-center">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Tükrözés az Origóra (0; 0):</span>
                <span className="font-black text-emerald-900 dark:text-emerald-200">P'(-x; -y)</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2.5 leading-tight">
              Megfigyelhető: Az x és y tengelyre vett egymás utáni két tükrözés eredménye pontosan az origóra vett középpontos tükrözés!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SymmetryComparisonTheory;
