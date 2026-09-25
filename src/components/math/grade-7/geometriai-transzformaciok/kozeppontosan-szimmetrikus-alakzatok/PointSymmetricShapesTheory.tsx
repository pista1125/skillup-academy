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
import { Slider } from '@/components/ui/slider';
import {
  RotateCcw,
  Target,
  Sparkles,
  Compass,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCw,
  Shapes,
  Maximize2,
  BookOpen,
  Scale,
  Eye,
  Type,
  Shuffle
} from 'lucide-react';
import { MathText, Fraction } from '@/components/math/shared/MathText';

interface PointSymmetricShapesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

type ShapeKey = 'segment' | 'parallelogram' | 'regular-triangle' | 'regular-hexagon' | 'letter-z' | 'letter-s' | 'trapezoid' | 'circle';

export const PointSymmetricShapesTheory: React.FC<PointSymmetricShapesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Lab state
  const [selectedShape, setSelectedShape] = useState<ShapeKey>('parallelogram');
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [showCenter, setShowCenter] = useState<boolean>(true);
  const [showConnectors, setShowConnectors] = useState<boolean>(true);

  // Shape definitions for Interactive Lab
  const shapeData: Record<
    ShapeKey,
    {
      name: string;
      category: string;
      isSymmetric: boolean;
      centerType: string;
      description: string;
      axesCount: number;
    }
  > = {
    segment: {
      name: 'Szakasz (AB)',
      category: 'Alapvonal',
      isSymmetric: true,
      centerType: 'A szakasz F felezőpontja',
      description: 'A szakasz saját felezőpontjára 180°-kal elforgatva pontosan önmagára fordul (A pont B helyére, B pont A helyére kerül).',
      axesCount: 2
    },
    parallelogram: {
      name: 'Általános paralelogramma',
      category: 'Négyszög',
      isSymmetric: true,
      centerType: 'Átlók metszéspontja (O)',
      description: 'Az átlók metszéspontja szimmetriaközéppont. 180°-os forgatással a szemközti csúcsok és párhuzamos oldalak felcserélődnek.',
      axesCount: 0
    },
    'regular-triangle': {
      name: 'Szabályos háromszög',
      category: 'Sokszög',
      isSymmetric: false,
      centerType: 'NINCS szimmetriaközéppontja!',
      description: '180°-os forgatás után a csúcsa lefelé áll (fejtetőre áll), így sohasem fedi önmagát. Egyetlen háromszög sem középpontosan szimmetrikus!',
      axesCount: 3
    },
    'regular-hexagon': {
      name: 'Szabályos hatszög',
      category: 'Sokszög',
      isSymmetric: true,
      centerType: 'Köré írt kör középpontja (O)',
      description: 'Minden páros oldalszámú szabályos sokszög középpontosan szimmetrikus a középpontjára. 180°-os forgatás után 3 csúcsnyi elfordulással önmagába megy át.',
      axesCount: 6
    },
    'letter-z': {
      name: '„Z” betű',
      category: 'Betűalakzat',
      isSymmetric: true,
      centerType: 'Az átló felezőpontja',
      description: 'Nincs egyetlen szimmetriatengelye sem, de a középpontjára vonatkozó 180°-os forgatás után pontosan az eredeti Z betűt kapjuk vissza!',
      axesCount: 0
    },
    'letter-s': {
      name: '„S” betű',
      category: 'Betűalakzat',
      isSymmetric: true,
      centerType: 'A betű középpontja',
      description: 'Tipikus példa a tisztán forgásszimmetrikus alakra: 0 szimmetriatengely, 1 szimmetriaközéppont.',
      axesCount: 0
    },
    trapezoid: {
      name: 'Húrtrapéz (Egyenlő szárú)',
      category: 'Négyszög',
      isSymmetric: false,
      centerType: 'NINCS szimmetriaközéppontja!',
      description: 'Van 1 szimmetriatengelye, de 180°-os forgatás után a hosszabbik alap kerül felülre, így nem fedi önmagát!',
      axesCount: 1
    },
    circle: {
      name: 'Körlap és körvonal',
      category: 'Görbe alakzat',
      isSymmetric: true,
      centerType: 'A kör O középpontja',
      description: 'A kör a legtökéletesebb szimmetriájú alakzat: középpontosan szimmetrikus az O pontjára, és végtelen sok szimmetriatengelye van.',
      axesCount: 999
    }
  };

  const currentShape = shapeData[selectedShape];

  // Helper to render the SVG shape
  const renderShapeSvg = (angle: number, isGhost: boolean = false) => {
    const opacity = isGhost ? 0.35 : 1;
    const strokeDash = isGhost ? '4 2' : 'none';

    return (
      <g
        transform={`rotate(${angle}, 140, 100)`}
        opacity={opacity}
        strokeDasharray={strokeDash}
        className="transition-transform duration-100 ease-out"
      >
        {selectedShape === 'segment' && (
          <g>
            <line x1="60" y1="130" x2="220" y2="70" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
            <circle cx="60" cy="130" r="5" fill="#0284c7" />
            <circle cx="220" cy="70" r="5" fill="#0284c7" />
            <text x="45" y="145" className="text-xs font-bold fill-sky-800 dark:fill-sky-300">A</text>
            <text x="228" y="70" className="text-xs font-bold fill-sky-800 dark:fill-sky-300">B</text>
          </g>
        )}

        {selectedShape === 'parallelogram' && (
          <g>
            <polygon
              points="70,140 190,140 210,60 90,60"
              fill={isGhost ? '#f1f5f9' : '#e0e7ff'}
              stroke="#4f46e5"
              strokeWidth="2.5"
            />
            {/* Diagonals */}
            <line x1="70" y1="140" x2="210" y2="60" stroke="#818cf8" strokeWidth="1.2" strokeDasharray="3 2" />
            <line x1="90" y1="60" x2="190" y2="140" stroke="#818cf8" strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx="70" cy="140" r="4" fill="#4f46e5" />
            <circle cx="190" cy="140" r="4" fill="#4f46e5" />
            <circle cx="210" cy="60" r="4" fill="#4f46e5" />
            <circle cx="90" cy="60" r="4" fill="#4f46e5" />
            <text x="55" y="152" className="text-[11px] font-bold fill-indigo-800 dark:fill-indigo-300">A</text>
            <text x="195" y="152" className="text-[11px] font-bold fill-indigo-800 dark:fill-indigo-300">B</text>
            <text x="216" y="60" className="text-[11px] font-bold fill-indigo-800 dark:fill-indigo-300">C</text>
            <text x="75" y="60" className="text-[11px] font-bold fill-indigo-800 dark:fill-indigo-300">D</text>
          </g>
        )}

        {selectedShape === 'regular-triangle' && (
          <g>
            <polygon
              points="140,40 65,160 215,160"
              fill={isGhost ? '#f1f5f9' : '#fef3c7'}
              stroke="#d97706"
              strokeWidth="2.5"
            />
            <circle cx="140" cy="40" r="4" fill="#d97706" />
            <circle cx="65" cy="160" r="4" fill="#d97706" />
            <circle cx="215" cy="160" r="4" fill="#d97706" />
            <text x="135" y="30" className="text-[11px] font-bold fill-amber-800 dark:fill-amber-300">A</text>
            <text x="50" y="170" className="text-[11px] font-bold fill-amber-800 dark:fill-amber-300">B</text>
            <text x="220" y="170" className="text-[11px] font-bold fill-amber-800 dark:fill-amber-300">C</text>
          </g>
        )}

        {selectedShape === 'regular-hexagon' && (
          <g>
            <polygon
              points="140,45 195,75 195,135 140,165 85,135 85,75"
              fill={isGhost ? '#f1f5f9' : '#dcfce7'}
              stroke="#16a34a"
              strokeWidth="2.5"
            />
            {/* Opposite vertices lines passing through O */}
            <line x1="140" y1="45" x2="140" y2="165" stroke="#86efac" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="85" y1="75" x2="195" y2="135" stroke="#86efac" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="85" y1="135" x2="195" y2="75" stroke="#86efac" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="140" cy="45" r="3.5" fill="#16a34a" />
            <circle cx="195" cy="75" r="3.5" fill="#16a34a" />
            <circle cx="195" cy="135" r="3.5" fill="#16a34a" />
            <circle cx="140" cy="165" r="3.5" fill="#16a34a" />
            <circle cx="85" cy="135" r="3.5" fill="#16a34a" />
            <circle cx="85" cy="75" r="3.5" fill="#16a34a" />
          </g>
        )}

        {selectedShape === 'letter-z' && (
          <g>
            <polyline
              points="90,65 190,65 90,135 190,135"
              fill="none"
              stroke="#db2777"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="90" cy="65" r="4" fill="#db2777" />
            <circle cx="190" cy="65" r="4" fill="#db2777" />
            <circle cx="90" cy="135" r="4" fill="#db2777" />
            <circle cx="190" cy="135" r="4" fill="#db2777" />
          </g>
        )}

        {selectedShape === 'letter-s' && (
          <g>
            <path
              d="M 180,65 C 150,50 100,55 100,85 C 100,115 180,105 180,135 C 180,165 130,160 100,145"
              fill="none"
              stroke="#9333ea"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        )}

        {selectedShape === 'trapezoid' && (
          <g>
            <polygon
              points="100,60 180,60 215,145 65,145"
              fill={isGhost ? '#f1f5f9' : '#fee2e2'}
              stroke="#ef4444"
              strokeWidth="2.5"
            />
            <circle cx="100" cy="60" r="4" fill="#ef4444" />
            <circle cx="180" cy="60" r="4" fill="#ef4444" />
            <circle cx="215" cy="145" r="4" fill="#ef4444" />
            <circle cx="65" cy="145" r="4" fill="#ef4444" />
          </g>
        )}

        {selectedShape === 'circle' && (
          <g>
            <circle
              cx="140"
              cy="100"
              r="55"
              fill={isGhost ? '#f1f5f9' : '#ccfbf1'}
              stroke="#0d9488"
              strokeWidth="2.5"
            />
            <line x1="85" y1="100" x2="195" y2="100" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="140" y1="45" x2="140" y2="155" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="3 2" />
          </g>
        )}
      </g>
    );
  };

  const isCoinciding = rotationAngle === 180 && currentShape.isSymmetric;

  return (
    <TheoryTemplate
      title="10. Középpontosan Szimmetrikus Alakzatok"
      subtitle="A szimmetriaközéppont fogalma, 180°-os forgatási szimmetria, síkbeli alakzatok és betűk szimmetriája"
      badgeText="7. OSZTÁLY • GEOMETRIA • 📖 TANANYAG"
      themeColor="rose"
      pdfFilename="7_osztaly_kozeppontosan_szimmetrikus_alakzatok.pdf"
      quickRule={{
        label: 'A középpontos szimmetria alapszabályai',
        formula: '180°-os forgatásra önmagába megy | Szabályos sokszögek: páros csúcsszám (n) ⟹ szimmetrikus, páratlan n ⟹ NEM! | Minden paralelogramma szimmetrikus (átlók felezőpontja) | Betűk: H, I, N, O, S, X, Z'
      }}
      estimatedTime="30-35 perc"
      difficulty="Közepes"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: INTERAKTÍV FORGATÁSI ÉS SZIMMETRIA LABORATÓRIUM */}
      <TheorySection
        number={1}
        title="Interaktív Laboratórium: 180°-os Forgatási Teszt"
        badgeColor="rose"
        icon={<RotateCw className="w-5 h-5 text-rose-600" />}
      >
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-rose-50/40 via-white to-pink-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-rose-950/20 border-rose-200 dark:border-rose-900/50 shadow-sm">
          <div className="flex flex-wrap gap-2 items-center justify-between mb-4 pb-3 border-b border-rose-100 dark:border-rose-900/40">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-600" />
                Fedésvizsgálat a Centrum (O) Körül
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Forgasd el az alakzatot a szimmetriaközéppontja körül, és figyeld meg, mikor fedi pontosan önmagát!
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant={rotationAngle === 0 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRotationAngle(0)}
                className="text-xs h-8"
              >
                0° (Kezdő)
              </Button>
              <Button
                variant={rotationAngle === 90 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRotationAngle(90)}
                className="text-xs h-8"
              >
                90° (Negyed)
              </Button>
              <Button
                variant={rotationAngle === 180 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRotationAngle(180)}
                className="text-xs h-8 bg-rose-600 hover:bg-rose-700 text-white"
              >
                180° (Félfordulat)
              </Button>
            </div>
          </div>

          {/* Shape selector pill buttons */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {(Object.keys(shapeData) as ShapeKey[]).map((key) => {
              const item = shapeData[key];
              const isSelected = selectedShape === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedShape(key);
                    setRotationAngle(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-rose-600 text-white border-rose-600 shadow-sm shadow-rose-500/20'
                      : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-rose-300'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.isSymmetric ? (
                    <span className="text-[10px] px-1 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                      ✓ Szimm.
                    </span>
                  ) : (
                    <span className="text-[10px] px-1 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300">
                      ✗ Nem
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Visual Canvas */}
            <div className="md:col-span-7 bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[260px] relative shadow-inner">
              <svg viewBox="0 0 280 200" className="w-full max-w-[320px] h-56 select-none">
                {/* Background grid */}
                <defs>
                  <pattern id="grid-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#cbd5e1" opacity="0.4" />
                  </pattern>
                </defs>
                <rect width="280" height="200" fill="url(#grid-dots)" />

                {/* Fixed original ghost outline when rotated */}
                {rotationAngle > 0 && renderShapeSvg(0, true)}

                {/* Rotated Active Shape */}
                {renderShapeSvg(rotationAngle, false)}

                {/* Connectors between original and rotated shape if not coinciding */}
                {showConnectors && rotationAngle > 0 && rotationAngle < 180 && (
                  <circle cx="140" cy="100" r={45} fill="none" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                )}

                {/* Symmetry Center Point O */}
                {showCenter && (
                  <g>
                    <circle cx="140" cy="100" r="5" fill="#e11d48" className="animate-pulse" />
                    <circle cx="140" cy="100" r="8" fill="none" stroke="#e11d48" strokeWidth="1.5" opacity="0.5" />
                    <text x="148" y="96" className="text-[11px] font-black fill-rose-700 dark:fill-rose-300">O</text>
                  </g>
                )}
              </svg>

              {/* Status banner under canvas */}
              <div className="w-full mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-500">
                  Forgásszög: <strong className="text-slate-800 dark:text-slate-200">{rotationAngle}°</strong>
                </span>
                {rotationAngle === 180 ? (
                  currentShape.isSymmetric ? (
                    <span className="px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Pontos fedés! Középpontosan szimmetrikus.
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      NEM fedi önmagát! Nem szimmetrikus.
                    </span>
                  )
                ) : (
                  <span className="text-slate-400 italic">
                    Forgasd el 180°-ig az ellenőrzéshez!
                  </span>
                )}
              </div>
            </div>

            {/* Controls and Explanation Panel */}
            <div className="md:col-span-5 space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      Forgatási szög szabályozása:
                    </span>
                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                      {rotationAngle}°
                    </span>
                  </div>
                  <Slider
                    value={[rotationAngle]}
                    min={0}
                    max={180}
                    step={5}
                    onValueChange={(vals) => setRotationAngle(vals[0])}
                    className="py-1"
                  />
                </div>

                <div className="flex gap-4 pt-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                    <input
                      type="checkbox"
                      checked={showCenter}
                      onChange={(e) => setShowCenter(e.target.checked)}
                      className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                    />
                    O centrum mutatása
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                    <input
                      type="checkbox"
                      checked={showConnectors}
                      onChange={(e) => setShowConnectors(e.target.checked)}
                      className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                    />
                    Forgási pálya íve
                  </label>
                </div>
              </div>

              {/* Informational card on selected shape */}
              <div className={`p-4 rounded-xl border space-y-2 text-xs ${
                currentShape.isSymmetric
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50/60 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-slate-500">
                    {currentShape.category}
                  </span>
                  <span className={`font-black px-2 py-0.5 rounded text-[10px] uppercase ${
                    currentShape.isSymmetric
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white'
                  }`}>
                    {currentShape.isSymmetric ? 'Középpontosan szimmetrikus' : 'Nem szimmetrikus'}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {currentShape.name}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentShape.description}
                </p>
                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex flex-col gap-1 text-[11px]">
                  <div>
                    <strong>Centrum helye:</strong> {currentShape.centerType}
                  </div>
                  <div>
                    <strong>Szimmetriatengelyek száma:</strong> {currentShape.axesCount === 999 ? 'Végtelen sok' : `${currentShape.axesCount} db`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </TheorySection>

      {/* 2. SZEKCIÓ: A KÖZÉPPONTOS SZIMMETRIA FOGALMA ÉS ALAPTULAJDONSÁGAI */}
      <TheorySection
        number={2}
        title="A Középpontos Szimmetria Lényege és Tulajdonságai"
        badgeColor="indigo"
        icon={<Target className="w-5 h-5 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TheoryCard
            title="1. A Fogalom Pontos Értelmezése"
            badge="Definíció"
            badgeColor="indigo"
            figure={
              <svg viewBox="0 0 200 90" className="w-48 h-22 mx-auto">
                <circle cx="100" cy="45" r="4" fill="#6366f1" />
                <text x="106" y="42" className="text-[11px] font-black fill-indigo-700">O</text>
                <line x1="40" y1="25" x2="160" y2="65" stroke="#4f46e5" strokeWidth="1.8" />
                <circle cx="40" cy="25" r="3.5" fill="#4f46e5" />
                <circle cx="160" cy="65" r="3.5" fill="#4f46e5" />
                <text x="25" y="25" className="text-[10px] font-bold fill-slate-700">P</text>
                <text x="168" y="70" className="text-[10px] font-bold fill-slate-700">P'</text>
                {/* Felező jelek */}
                <line x1="68" y1="32" x2="72" y2="38" stroke="#6366f1" strokeWidth="1.5" />
                <line x1="128" y1="52" x2="132" y2="58" stroke="#6366f1" strokeWidth="1.5" />
              </svg>
            }
          >
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <p>
                Egy síkbeli alakzat akkor <strong>középpontosan szimmetrikus</strong>, ha létezik olyan <MathText>{'O'}</MathText> pont a síkban, amelyre vonatkozó középpontos tükrözés az alakzatot <strong>önmagába viszi át</strong>:
              </p>
              <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 text-center font-mono font-bold text-indigo-900 dark:text-indigo-200">
                T_O(Alakzat) = Alakzat
              </div>
              <p>
                Ez azt jelenti, hogy az alakzat tetszőleges <MathText>{'P'}</MathText> pontjának tükörképe (<MathText>{'P\''}</MathText>) szintén az alakzat egy pontja, és az <MathText>{'O'}</MathText> pont pontosan a <MathText>{'PP\''}</MathText> szakasz <strong>felezőpontja</strong>.
              </p>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Egyenértékűség 180°-os Forgatással"
            badge="Forgásszimmetria"
            badgeColor="rose"
            figure={
              <svg viewBox="0 0 200 90" className="w-48 h-22 mx-auto">
                <circle cx="100" cy="45" r="4" fill="#e11d48" />
                <text x="106" y="42" className="text-[11px] font-black fill-rose-700">O</text>
                <path d="M 50,45 A 50,50 0 1,1 150,45" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
                <polygon points="152,43 148,52 143,45" fill="#f43f5e" />
                <text x="90" y="20" className="text-[10px] font-bold fill-rose-700">180°</text>
              </svg>
            }
          >
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <p>
                A síkban a pontra vonatkozó tükrözés pontosan megegyezik a pont körüli <strong>180°-os (félfordulatú) elforgatással</strong>.
              </p>
              <p>
                Ezért a középpontosan szimmetrikus alakzatok <strong>forgásszimmetrikusak</strong> is, legkisebb forgásszögük <MathText>{'180°'}</MathText> (vagy annak osztója, pl. 90°, 60°).
              </p>
              <p>
                <strong>Gyakorlati ellenőrzés:</strong> Ha a lapot fejtetőre állítod (180°-kal elfordítod), az alakzatnak pontosan ugyanolyannak kell látszania!
              </p>
            </div>
          </TheoryCard>

          <TheoryCard
            title="3. Hány Centruma Lehet egy Alakzatnak?"
            badge="Centrumok száma"
            badgeColor="amber"
            figure={
              <svg viewBox="0 0 200 90" className="w-48 h-22 mx-auto">
                <rect x="50" y="25" width="100" height="45" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                <circle cx="100" cy="47.5" r="4" fill="#b45309" />
                <text x="108" y="46" className="text-[10px] font-bold fill-amber-900">Egyetlen O!</text>
              </svg>
            }
          >
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <p>
                <strong>Korlátos alakzatok:</strong> Minden véges méretű (korlátos) alakzatnak (mint szakasz, négyszög, sokszög, körlap, betű) <strong>pontosan egyetlen szimmetriaközéppontja</strong> lehet!
              </p>
              <p>
                <em>Bizonyítás:</em> Ha két különböző centrum lenne, a két tükrözés egymásutánja eltolást eredményezne, így az alakzat végtelen sok példányban ismétlődne a végtelenbe.
              </p>
              <p>
                <strong>Kivétel:</strong> Az <em>egyenes</em> végtelen, így rajta <em>bármelyik pont</em> szimmetriaközéppont.
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: GEOMETRIAI ALAKZATOK SZIMMETRIÁJA (HÁROMSZÖGEK, NÉGYSZÖGEK, SOKSZÖGEK) */}
      <TheorySection
        number={3}
        title="Mely Geometriai Alakzatok Középpontosan Szimmetrikusak?"
        badgeColor="purple"
        icon={<Shapes className="w-5 h-5 text-purple-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. Szakasz és egyenes */}
          <TheoryCard
            title="1. Szakasz és Egyenes"
            badge="Vonalak"
            badgeColor="blue"
            figure={
              <svg viewBox="0 0 160 70" className="w-40 h-16 mx-auto">
                <line x1="25" y1="50" x2="135" y2="20" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
                <circle cx="80" cy="35" r="3.5" fill="#e11d48" />
                <text x="75" y="24" className="text-[10px] font-bold fill-rose-700">F (felezőpont)</text>
              </svg>
            }
          >
            <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
              <p><strong>Szakasz:</strong> Középpontosan szimmetrikus a saját <strong>felezőpontjára</strong> (<MathText>{'F'}</MathText>).</p>
              <p><strong>Egyenes:</strong> Bármely pontjára szimmetrikus (végtelen sok centrum).</p>
              <p><strong>Félegyenes:</strong> NEM szimmetrikus (van kezdőpontja).</p>
            </div>
          </TheoryCard>

          {/* 2. Háromszögek */}
          <TheoryCard
            title="2. Háromszögek"
            badge="SOHA NEM szimmetrikus!"
            badgeColor="rose"
            figure={
              <svg viewBox="0 0 160 70" className="w-40 h-16 mx-auto">
                <polygon points="80,10 30,60 130,60" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
                <circle cx="80" cy="43" r="3" fill="#64748b" />
                <text x="86" y="45" className="text-[9px] font-bold fill-slate-600">S (nem centrum!)</text>
              </svg>
            }
          >
            <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-bold text-rose-700 dark:text-rose-400">
                Egyetlen háromszög sem középpontosan szimmetrikus!
              </p>
              <p>
                Sem az általános, sem a derékszögű, sem az egyenlő szárú, <strong>még a szabályos háromszög sem!</strong>
              </p>
              <p className="text-[11px] text-slate-500">
                180°-os forgatás után a csúcs ellenkező irányba mutat (fejtetőre áll).
              </p>
            </div>
          </TheoryCard>

          {/* 3. Paralelogrammák */}
          <TheoryCard
            title="3. Paralelogramma család"
            badge="MINDIG szimmetrikus!"
            badgeColor="emerald"
            figure={
              <svg viewBox="0 0 160 70" className="w-40 h-16 mx-auto">
                <polygon points="25,55 110,55 135,18 50,18" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
                <line x1="25" y1="55" x2="135" y2="18" stroke="#86efac" strokeWidth="1" strokeDasharray="2 1" />
                <line x1="50" y1="18" x2="110" y2="55" stroke="#86efac" strokeWidth="1" strokeDasharray="2 1" />
                <circle cx="80" cy="36.5" r="3.5" fill="#15803d" />
                <text x="85" y="34" className="text-[9px] font-bold fill-emerald-900">O</text>
              </svg>
            }
          >
            <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-bold text-emerald-800 dark:text-emerald-300">
                Minden paralelogramma középpontosan szimmetrikus!
              </p>
              <p>
                <strong>Általános paralelogramma, téglalap, rombusz és négyzet:</strong> mind szimmetrikus az <strong>átlók metszéspontjára</strong>.
              </p>
              <p className="text-[11px] text-slate-500">
                Trapéz és deltoid általában NEM!
              </p>
            </div>
          </TheoryCard>

          {/* 4. Szabályos sokszögek */}
          <TheoryCard
            title="4. Szabályos sokszögek"
            badge="Páros vs. Páratlan"
            badgeColor="purple"
            figure={
              <svg viewBox="0 0 160 70" className="w-40 h-16 mx-auto">
                {/* Regular hexagon */}
                <polygon points="80,12 110,28 110,55 80,68 50,55 50,28" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" />
                <circle cx="80" cy="40" r="3.5" fill="#7e22ce" />
                <text x="86" y="38" className="text-[9px] font-bold fill-purple-900">O</text>
              </svg>
            }
          >
            <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
              <p>
                <strong>Páros oldalszámú (2n):</strong> Szabályos 4, 6, 8, 10, 12-szög <strong>KÖZÉPPONTOSAN SZIMMETRIKUS</strong>.
              </p>
              <p>
                <strong>Páratlan oldalszámú (2n+1):</strong> Szabályos 3, 5, 7, 9-szög <strong>NEM SZIMMETRIKUS</strong>!
              </p>
              <p className="text-[11px] text-slate-500">
                Páros sokszögnél a szemközti csúcsok átellenesek.
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: BETŰK ÉS SZIMBÓLUMOK SZIMMETRIÁJA */}
      <TheorySection
        number={4}
        title="Betűk, Szimbólumok és a Mindennapi Élet Szimmetriája"
        badgeColor="amber"
        icon={<Type className="w-5 h-5 text-amber-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Csak középpontosan szimmetrikus betűk */}
          <TheoryCard
            title="Csak Középpontosan Szimmetrikus Betűk"
            badge="0 tengely, 1 centrum"
            badgeColor="rose"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex justify-center gap-4 py-2 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900 font-serif font-black text-2xl text-rose-700 dark:text-rose-300">
                <span className="p-1 px-3 bg-white dark:bg-slate-900 rounded-lg shadow-xs">N</span>
                <span className="p-1 px-3 bg-white dark:bg-slate-900 rounded-lg shadow-xs">S</span>
                <span className="p-1 px-3 bg-white dark:bg-slate-900 rounded-lg shadow-xs">Z</span>
              </div>
              <p>
                Ezeknek a nyomtatott nagybetűknek <strong>egyetlen szimmetriatengelyük sincs</strong> (ha tükrözzük őket, megfordul a száruk), viszont a középpontjukra vonatkozó 180°-os forgatás pontosan önmagukba viszi őket!
              </p>
              <p className="text-[11px] text-slate-500">
                Megjegyzés: Tipikus vizsgacsapda! Sokan azt hiszik, ha nincs tengelyük, nem is szimmetrikusak.
              </p>
            </div>
          </TheoryCard>

          {/* Tengelyesen és középpontosan is szimmetrikus betűk */}
          <TheoryCard
            title="Középpontosan ÉS Tengelyesen is Szimmetrikus"
            badge="2 tengely, 1 centrum"
            badgeColor="purple"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex justify-center gap-4 py-2 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-900 font-serif font-black text-2xl text-purple-700 dark:text-purple-300">
                <span className="p-1 px-3 bg-white dark:bg-slate-900 rounded-lg shadow-xs">H</span>
                <span className="p-1 px-3 bg-white dark:bg-slate-900 rounded-lg shadow-xs">I</span>
                <span className="p-1 px-3 bg-white dark:bg-slate-900 rounded-lg shadow-xs">O</span>
                <span className="p-1 px-3 bg-white dark:bg-slate-900 rounded-lg shadow-xs">X</span>
              </div>
              <p>
                Ezek a betűk <strong>mindkét fő irányban</strong> (vízszintesen és függőlegesen is) tengelyesen szimmetrikusak, és a két tengely metszéspontja egyben <strong>szimmetriaközéppont</strong> is!
              </p>
              <p className="text-[11px] text-purple-700 dark:text-purple-400 font-medium">
                Matematikai tétel: Ha egy alakzatnak van 2 egymásra merőleges szimmetriatengelye, akkor szükségképpen középpontosan is szimmetrikus a metszéspontjukra!
              </p>
            </div>
          </TheoryCard>

          {/* Szimbólumok a valóságban */}
          <TheoryCard
            title="Kártyák, Logók és Forgó Elemek"
            badge="Gyakorlati élet"
            badgeColor="emerald"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  <strong>Francia kártyalapok:</strong> A figurás lapok (király, dáma, bubi, ász) rajzolata mindig középpontosan szimmetrikus, hogy a játékos bárhogyan vegye kézbe, helyesen álljon.
                </li>
                <li>
                  <strong>Kétfejű figurák:</strong> A sakkban és jelvényekben gyakori a 180°-os szimmetria.
                </li>
                <li>
                  <strong>Szélkerék, propeller:</strong> Páros lapátú rotorok (2, 4 vagy 6 lapátos) középpontosan szimmetrikusak a tengelyre.
                </li>
                <li>
                  <strong>Digitális kijelző:</strong> A 2-es és 5-ös számjegy egymás 180°-os forgatottja, a 6-os és 9-es szintén!
                </li>
              </ul>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: ÁTFOGÓ ÖSSZEHASONLÍTÓ TÁBLÁZAT */}
      <TheorySection
        number={5}
        title="Alakzatok Rendszerező Szimmetria Mátrixa"
        badgeColor="indigo"
        icon={<Scale className="w-5 h-5 text-indigo-600" />}
      >
        <TheoryTable
          title="Alakzatok tengelyes és középpontos szimmetriájának összehasonlítása"
          headers={['Alakzat neve', 'Szimmetriatengelyek száma', 'Középpontosan szimmetrikus?', 'Szimmetriaközéppont']}
          rows={[
            ['Szakasz', '2 db (felezőmerőleges + egyenes)', 'IGEN', 'A szakasz F felezőpontja'],
            ['Egyenes', 'Végtelen sok', 'IGEN', 'Az egyenes BÁRMELY pontja'],
            ['Bármilyen háromszög', '0, 1 vagy 3 db', 'NEM!', 'Nincs középpontja'],
            ['Általános paralelogramma', '0 db (nincs tengelye)', 'IGEN', 'Átlók metszéspontja (O)'],
            ['Téglalap', '2 db (oldalfelezők)', 'IGEN', 'Átlók metszéspontja (O)'],
            ['Rombusz', '2 db (a két átló)', 'IGEN', 'Átlók metszéspontja (O)'],
            ['Négyzet', '4 db (2 oldalfelező + 2 átló)', 'IGEN', 'Átlók metszéspontja (O)'],
            ['Húrtrapéz', '1 db (alapok felezőmerőlegese)', 'NEM', 'Nincs középpontja'],
            ['Konvex deltoid', '1 db (főátló egyenese)', 'NEM (kivéve rombusz)', 'Nincs középpontja'],
            ['Szabályos ötszög', '5 db', 'NEM (páratlan oldalszám)', 'Nincs középpontja'],
            ['Szabályos hatszög', '6 db', 'IGEN (páros oldalszám)', 'Köré írt kör középpontja (O)'],
            ['Körlap és körvonal', 'Végtelen sok (átmérők)', 'IGEN', 'A kör geometriai középpontja (O)'],
            ['„Z” és „S” betű', '0 db (nincs tengelyük)', 'IGEN', 'A betű centruma'],
            ['„H” és „X” betű', '2 db (vízszintes és függőleges)', 'IGEN', 'A két tengely metszéspontja']
          ]}
        />
      </TheorySection>

      {/* 6. SZEKCIÓ: KIDOLGOZOTT MINTAPÉLDÁK */}
      <TheorySection
        number={6}
        title="Kidolgozott Mintafeladatok Lépésről Lépésre"
        badgeColor="emerald"
        icon={<BookOpen className="w-5 h-5 text-emerald-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mintafeladat 1 */}
          <TheoryCard
            title="1. Feladat: Szakasz és Paralelogramma Centruma"
            badge="Mintapélda"
            badgeColor="emerald"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">
                Hogyan szerkeszthetjük meg egy adott szakasz, illetve egy általános paralelogramma szimmetriaközéppontját?
              </p>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 space-y-1.5 font-mono text-[11px]">
                <p><strong>1. Lépés (Szakasz esetén):</strong></p>
                <p>A szakasz szimmetriaközéppontja a szakasz felezőpontja (F).</p>
                <p>Szerkesztése: a szakasz felezőmerőlegesének megrajzolásával, ahol a felezőmerőleges metszi a szakaszt, ott van az F pont.</p>
                <p className="pt-1"><strong>2. Lépés (Paralelogramma esetén):</strong></p>
                <p>Kösd össze a szemközti csúcsokat: húzd be az AC és BD átlókat!</p>
                <p>Az átlók metszéspontja az O szimmetriaközéppont, mivel a paralelogramma átlói kölcsönösen felezik egymást.</p>
              </div>
            </div>
          </TheoryCard>

          {/* Mintafeladat 2 */}
          <TheoryCard
            title="2. Feladat: Szabályos Sokszögek Összehasonlítása"
            badge="Mintapélda"
            badgeColor="purple"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">
                Középpontosan szimmetrikus-e a szabályos ötszög, illetve a szabályos nyolcszög? Mi az általános szabály a szabályos sokszögekre?
              </p>
              <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-800 space-y-1.5 font-mono text-[11px]">
                <p><strong>1. Lépés (Szabályos ötszög - n = 5):</strong></p>
                <p>Az oldalszám páratlan. Minden csúccsal szemben egy oldal fekszik, nem pedig egy csúcs! 180°-os forgatás után a csúcs egy oldalra esne, ezért <strong>NEM középpontosan szimmetrikus</strong>.</p>
                <p className="pt-1"><strong>2. Lépés (Szabályos nyolcszög - n = 8):</strong></p>
                <p>Az oldalszám páros (2n = 8). Minden csúccsal pontosan szemben átellenes csúcs helyezkedik el. 180°-os forgatáskor az átellenes csúcsok helyet cserélnek, így <strong>KÖZÉPPONTOSAN SZIMMETRIKUS</strong>.</p>
                <p className="pt-1 text-purple-900 dark:text-purple-200">
                  <strong>Ökölszabály:</strong> Szabályos sokszög akkor és csak akkor középpontosan szimmetrikus, ha oldalszáma PÁROS!
                </p>
              </div>
            </div>
          </TheoryCard>

          {/* Mintafeladat 3 */}
          <TheoryCard
            title="3. Feladat: Szimmetriák a Betűk Világában"
            badge="Mintapélda"
            badgeColor="pink"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">
                Elemezd a „SZIMMETRIA” szó betűit! Mely betűk rendelkeznek szimmetriaközépponttal?
              </p>
              <div className="p-2.5 bg-pink-50 dark:bg-pink-950/40 rounded-lg border border-pink-200 dark:border-pink-800 space-y-1.5 font-mono text-[11px]">
                <p><strong>A szó betűi:</strong> S, Z, I, M, E, T, R, A</p>
                <p><strong>1. Lépés (Középpontos szimmetria vizsgálata):</strong></p>
                <p>• <strong>S:</strong> Középpontosan szimmetrikus (180°-os forgatásra önmaga).</p>
                <p>• <strong>Z:</strong> Középpontosan szimmetrikus (180°-os forgatásra önmaga).</p>
                <p>• <strong>I:</strong> Középpontosan szimmetrikus (és 2 tengelye is van).</p>
                <p>• <strong>M, E, T, A:</strong> Csak tengelyesen szimmetrikusak, középpontosan NEM!</p>
                <p>• <strong>R:</strong> Egyáltalán nem szimmetrikus.</p>
                <p className="pt-1 font-bold text-pink-900 dark:text-pink-200">
                  Válasz: Az S, Z és I betűk középpontosan szimmetrikusak.
                </p>
              </div>
            </div>
          </TheoryCard>

          {/* Mintafeladat 4 */}
          <TheoryCard
            title="4. Feladat: Szimmetriaközéppont Koordinátái"
            badge="Mintapélda"
            badgeColor="blue"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">
                Egy szakasz végpontjai a koordináta-rendszerben <MathText>{'A(-2; 6)'}</MathText> és <MathText>{'B(4; -2)'}</MathText>. Számítsd ki a szakasz szimmetriaközéppontjának koordinátáit!
              </p>
              <div className="p-2.5 bg-sky-50 dark:bg-sky-950/40 rounded-lg border border-sky-200 dark:border-sky-800 space-y-1.5 font-mono text-[11px]">
                <p><strong>1. Lépés (Felezőpont képlete):</strong></p>
                <p>A szakasz szimmetriaközéppontja az F felezőpont, melynek koordinátái a végpontok koordinátáinak számtani közepei.</p>
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  <span>x_F = </span>
                  <Fraction num="x_A + x_B" den="2" size="md" />
                  <span> = </span>
                  <Fraction num="-2 + 4" den="2" size="md" />
                  <span> = </span>
                  <Fraction num="2" den="2" size="md" />
                  <span> = </span>
                  <strong className="text-sky-900 dark:text-sky-200">1</strong>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  <span>y_F = </span>
                  <Fraction num="y_A + y_B" den="2" size="md" />
                  <span> = </span>
                  <Fraction num="6 + (-2)" den="2" size="md" />
                  <span> = </span>
                  <Fraction num="4" den="2" size="md" />
                  <span> = </span>
                  <strong className="text-sky-900 dark:text-sky-200">2</strong>
                </div>
                <p className="pt-1 font-bold text-sky-900 dark:text-sky-200">
                  Válasz: A szimmetriaközéppont koordinátái: F(1; 2).
                </p>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. SZEKCIÓ: GYAKORI TÉVHITEK ÉS CSAPDÁK */}
      <TheorySection
        number={7}
        title="Gyakori Tévhitek, Csapdák és Megjegyzések"
        badgeColor="rose"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TheoryTrapBox
            title="Tipikus Szimmetria Félreértések"
            traps={[
              {
                mistake: '„A szabályos háromszög középpontosan szimmetrikus, mert minden oldala és szöge egyenlő.”',
                correction: 'ÓRIÁSI TÉVHIT! A szabályos háromszögnek van 3 szimmetriatengelye, de NINCS szimmetriaközéppontja! 180°-os forgatás után lefelé néz a csúcsa, tehát fejtetőre áll.'
              },
              {
                mistake: '„Ha egy alakzatnak nincs szimmetriatengelye, akkor középpontosan sem lehet szimmetrikus.”',
                correction: 'HAMIS! Az általános paralelogrammának, valamint az N, S, Z betűknek egyetlen szimmetriatengelyük sincs (0 db), mégis középpontosan szimmetrikusak!'
              },
              {
                mistake: '„A deltoid és a húrtrapéz középpontosan szimmetrikus.”',
                correction: 'TÉVEDÉS! Mindkettő tengelyesen szimmetrikus (1-1 szimmetriatengellyel), de sem a trapéz, sem az általános deltoid NEM középpontosan szimmetrikus.'
              },
              {
                mistake: '„A körnek végtelen sok szimmetriaközéppontja van.”',
                correction: 'PONTATLAN! A körnek végtelen sok SZIMMETRIATENGELYE van (minden átmérője), de pontosan EGYETLEN szimmetriaközéppontja van: az O geometriai középpontja. Végtelen sok centruma csak az egyenesnek van!'
              },
              {
                mistake: '„A középpontos tükrözés a síkban megfordítja a körüljárási irányt.”',
                correction: 'NEM IGAZ! A síkbeli középpontos tükrözés egyenértékű egy 180°-os forgatással, így MEGTARTJA a körüljárási irányt (irányítástartó mozgás a síkban)!'
              }
            ]}
          />

          <TheoryCallout
            title="Aranyszabályok a Gyors Felismeréshez"
            variant="purple"
            icon={<Sparkles className="w-5 h-5 text-purple-600" />}
          >
            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                <strong>Hogyan döntsd el pillanatok alatt, hogy egy alakzat középpontosan szimmetrikus-e?</strong>
              </p>
              <ul className="list-disc pl-4 space-y-1.5">
                <li>
                  <strong className="text-purple-700 dark:text-purple-300">180°-os fejtetőre állítási teszt:</strong> Képzeld el az alakzatot fejjel lefelé! Ha pont ugyanúgy néz ki, akkor középpontosan szimmetrikus.
                </li>
                <li>
                  <strong className="text-emerald-700 dark:text-emerald-300">Átellenes párok keresése:</strong> Minden csúcsnak, saroknak, szárnak lennie kell egy pontosan átellenes párjának az O centrum túloldalán, azonos távolságra.
                </li>
                <li>
                  <strong className="text-indigo-700 dark:text-indigo-300">Páros vs. Páratlan sokszögek:</strong> Szabályos sokszögeknél csak a párosak (4, 6, 8, 10...) szimmetrikusak, a páratlanok (3, 5, 7...) soha!
                </li>
                <li>
                  <strong className="text-pink-700 dark:text-pink-300">Háromszögek aranyszabálya:</strong> Háromszög soha, semmilyen körülmények között nem lehet középpontosan szimmetrikus!
                </li>
              </ul>
            </div>
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PointSymmetricShapesTheory;
