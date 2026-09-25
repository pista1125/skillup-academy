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
  Shapes,
  Maximize2,
  Sliders,
  Scale,
  Compass,
  Check,
  BookOpen,
  HelpCircle,
  Hash,
  Divide,
  Eye,
  Layers,
  CircleDot,
  Lightbulb
} from 'lucide-react';
import { MathText, Fraction } from '@/components/math/shared/MathText';

interface RegularPolygonsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

type PolygonSides = 3 | 4 | 5 | 6 | 8 | 10 | 12;

export const RegularPolygonsTheory: React.FC<RegularPolygonsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Lab state
  const [selectedN, setSelectedN] = useState<PolygonSides>(6);
  const [showDiagonals, setShowDiagonals] = useState<boolean>(true);
  const [showCenterLines, setShowCenterLines] = useState<boolean>(true);
  const [showAngles, setShowAngles] = useState<boolean>(true);
  const [showCircumcircle, setShowCircumcircle] = useState<boolean>(false);
  const [showIncircle, setShowIncircle] = useState<boolean>(false);

  // Polygon info database
  const polygonInfo: Record<
    PolygonSides,
    {
      name: string;
      hungarianName: string;
      interiorSum: number;
      oneInteriorAngle: number;
      exteriorAngle: number;
      centralAngle: number;
      diagonalsPerVertex: number;
      totalDiagonals: number;
      symmetryAxes: number;
      isPointSymmetric: boolean;
      canTilePlane: boolean;
      description: string;
      specialFact: string;
    }
  > = {
    3: {
      name: 'Szabályos háromszög',
      hungarianName: 'Egyenlő oldalú háromszög',
      interiorSum: 180,
      oneInteriorAngle: 60,
      exteriorAngle: 120,
      centralAngle: 120,
      diagonalsPerVertex: 0,
      totalDiagonals: 0,
      symmetryAxes: 3,
      isPointSymmetric: false,
      canTilePlane: true,
      description: 'Minden oldala és minden belső szöge (60°) egyenlő. Csúcsai nem rendelkeznek átlóval.',
      specialFact: 'Magasságvonalai, súlyvonalai, szögfelezői és oldalfelező merőlegesei mind egybeesnek egyetlen centrumban.'
    },
    4: {
      name: 'Szabályos négyszög',
      hungarianName: 'Négyzet',
      interiorSum: 360,
      oneInteriorAngle: 90,
      exteriorAngle: 90,
      centralAngle: 90,
      diagonalsPerVertex: 1,
      totalDiagonals: 2,
      symmetryAxes: 4,
      isPointSymmetric: true,
      canTilePlane: true,
      description: 'Egyszerre téglalap (minden szöge 90°) és rombusz (minden oldala egyenlő). 2 db egyenlő, merőleges átlója felezi egymást.',
      specialFact: '4 szimmetriatengelye van (2 átló + 2 oldalfelező merőleges) és az átlók metszéspontja szimmetriaközéppont.'
    },
    5: {
      name: 'Szabályos ötszög',
      hungarianName: 'Pentagon',
      interiorSum: 540,
      oneInteriorAngle: 108,
      exteriorAngle: 72,
      centralAngle: 72,
      diagonalsPerVertex: 2,
      totalDiagonals: 5,
      symmetryAxes: 5,
      isPointSymmetric: false,
      canTilePlane: false,
      description: 'Minden belső szöge tompaszög (108°). Átlói egy ötágú csillagot (pentagrammát) alkotnak.',
      specialFact: 'Mivel a belső szöge (108°) nem osztója a 360°-nak (360 / 108 = 3,33), önmagában NEM parkettázza a síkot!'
    },
    6: {
      name: 'Szabályos hatszög',
      hungarianName: 'Hexagon',
      interiorSum: 720,
      oneInteriorAngle: 120,
      exteriorAngle: 60,
      centralAngle: 60,
      diagonalsPerVertex: 3,
      totalDiagonals: 9,
      symmetryAxes: 6,
      isPointSymmetric: true,
      canTilePlane: true,
      description: 'A geometriában az egyik legfontosabb alakzat: a középpontból a csúcsokhoz húzott szakaszok 6 db egybevágó szabályos háromszögre bontják.',
      specialFact: 'A köré írt kör sugara pontosan megegyezik az oldal hosszával: R = a. Ezért a méhsejt rácsszerkezetének alapja.'
    },
    8: {
      name: 'Szabályos nyolcszög',
      hungarianName: 'Oktagon',
      interiorSum: 1080,
      oneInteriorAngle: 135,
      exteriorAngle: 45,
      centralAngle: 45,
      diagonalsPerVertex: 5,
      totalDiagonals: 20,
      symmetryAxes: 8,
      isPointSymmetric: true,
      canTilePlane: false,
      description: 'Gyakori jelzőtáblák (STOP tábla) és építészeti alaprajzok formája. 8 szimmetriatengelye és 1 szimmetriaközéppontja van.',
      specialFact: 'Négyzetekkel kombinálva hézagmentesen parkettázza a síkot (2 db nyolcszög 135° + 135° + 1 db négyzet 90° = 360°).'
    },
    10: {
      name: 'Szabályos tízszög',
      hungarianName: 'Dekagon',
      interiorSum: 1440,
      oneInteriorAngle: 144,
      exteriorAngle: 36,
      centralAngle: 36,
      diagonalsPerVertex: 7,
      totalDiagonals: 35,
      symmetryAxes: 10,
      isPointSymmetric: true,
      canTilePlane: false,
      description: 'Minden belső szöge 144°, külső és középponti szöge pedig 36°. Összesen 35 átlóval rendelkezik.',
      specialFact: 'Páros csúcsszámú, így a szemközti oldalai párhuzamosak, és a szemközti csúcsokat összekötő átlók a centrumban metszik és felezik egymást.'
    },
    12: {
      name: 'Szabályos tizenkét szög',
      hungarianName: 'Dodekagon',
      interiorSum: 1800,
      oneInteriorAngle: 150,
      exteriorAngle: 30,
      centralAngle: 30,
      diagonalsPerVertex: 9,
      totalDiagonals: 54,
      symmetryAxes: 12,
      isPointSymmetric: true,
      canTilePlane: false,
      description: 'Minden belső szöge 150°, külső szöge 30°. Már nagyon közel áll a kör alakhoz.',
      specialFact: 'Szabályos háromszögekkel és négyzetekkel vegyesen csodálatos arhimédeszi síkfedéseket alkot.'
    }
  };

  const current = polygonInfo[selectedN];

  // Helper to compute vertices of regular n-gon
  const getVertices = (n: number, cx: number, cy: number, r: number) => {
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < n; i++) {
      const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
      pts.push({
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle)
      });
    }
    return pts;
  };

  const renderInteractiveSvg = () => {
    const cx = 150;
    const cy = 150;
    const r = 110;
    const pts = getVertices(selectedN, cx, cy, r);
    const inRadius = r * Math.cos(Math.PI / selectedN);
    const pointsStr = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

    // Collect diagonals
    const diagonals: { x1: number; y1: number; x2: number; y2: number; isMain: boolean }[] = [];
    for (let i = 0; i < selectedN; i++) {
      for (let j = i + 2; j < selectedN; j++) {
        if (i === 0 && j === selectedN - 1) continue; // polygon edge
        const isMain = selectedN % 2 === 0 && (j - i === selectedN / 2);
        diagonals.push({
          x1: pts[i].x,
          y1: pts[i].y,
          x2: pts[j].x,
          y2: pts[j].y,
          isMain
        });
      }
    }

    return (
      <svg viewBox="0 0 300 300" className="w-full max-w-[280px] sm:max-w-[320px] aspect-square mx-auto">
        <defs>
          <radialGradient id="polyGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffedd5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fed7aa" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* Circumscribed circle */}
        {showCircumcircle && (
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        )}

        {/* Inscribed circle */}
        {showIncircle && (
          <circle
            cx={cx}
            cy={cy}
            r={inRadius}
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        )}

        {/* Polygon Face */}
        <polygon
          points={pointsStr}
          fill="url(#polyGrad)"
          stroke="#ea580c"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Diagonals */}
        {showDiagonals &&
          diagonals.map((d, idx) => (
            <line
              key={`diag-${idx}`}
              x1={d.x1}
              y1={d.y1}
              x2={d.x2}
              y2={d.y2}
              stroke={d.isMain ? '#f97316' : '#fdba74'}
              strokeWidth={d.isMain ? '2' : '1'}
              strokeDasharray={d.isMain ? undefined : '2 2'}
              opacity={d.isMain ? 0.9 : 0.6}
            />
          ))}

        {/* Center Lines & Central Angles */}
        {showCenterLines &&
          pts.map((p, idx) => (
            <line
              key={`rad-${idx}`}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="#0284c7"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          ))}

        {/* Central Angle Arc for first sector */}
        {showAngles && (
          <path
            d={`M ${cx} ${cy - 28} A 28 28 0 0 1 ${
              cx + 28 * Math.cos(-Math.PI / 2 + (2 * Math.PI) / selectedN)
            } ${cy + 28 * Math.sin(-Math.PI / 2 + (2 * Math.PI) / selectedN)}`}
            fill="none"
            stroke="#0284c7"
            strokeWidth="2"
          />
        )}

        {/* Center Point */}
        <circle cx={cx} cy={cy} r="4.5" fill="#ea580c" />
        <circle cx={cx} cy={cy} r="2" fill="#ffffff" />
        <text
          x={cx + 8}
          y={cy + 4}
          className="text-[11px] font-mono font-black fill-slate-800 dark:fill-slate-100"
        >
          O
        </text>

        {/* Vertices and labels */}
        {pts.map((p, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const labelDist = 16;
          const angle = -Math.PI / 2 + (2 * Math.PI * idx) / selectedN;
          const lx = p.x + labelDist * Math.cos(angle);
          const ly = p.y + labelDist * Math.sin(angle) + 4;

          return (
            <g key={`vert-${idx}`}>
              <circle cx={p.x} cy={p.y} r="3.5" fill="#ea580c" stroke="#ffffff" strokeWidth="1.5" />
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300"
              >
                {letter}
              </text>
            </g>
          );
        })}

        {/* Angle indicator text */}
        {showAngles && (
          <g>
            <rect x="6" y="6" width="96" height="38" rx="6" fill="#ffffff" opacity="0.9" stroke="#fed7aa" />
            <text x="12" y="20" className="text-[10px] font-bold fill-orange-700">
              α = {current.oneInteriorAngle}°
            </text>
            <text x="12" y="34" className="text-[10px] font-bold fill-sky-700">
              ω = {current.centralAngle}°
            </text>
          </g>
        )}
      </svg>
    );
  };

  return (
    <TheoryTemplate
      title="11. Szabályos Sokszögek"
      subtitle="Belső és külső szögek, középponti szög, átlók száma, szimmetriák és síkparkettázás"
      badgeText="7. OSZTÁLY • GEOMETRIA • 📖 TANANYAG"
      themeColor="orange"
      pdfFilename="7_osztaly_szabalyos_sokszogek.pdf"
      quickRule={{
        label: 'A szabályos sokszögek aranyszabályai',
        formula: 'Belső összeg: Sn = (n-2)·180° | Egy belső szög: α = (n-2)·180° / n | Külső = Középponti: α\' = ω = 360° / n | Átlók száma: An = n·(n-3) / 2 | n db szimmetriatengely'
      }}
      estimatedTime="35-40 perc"
      difficulty="Közepes"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: INTERAKTÍV SOKSZÖG LABORATÓRIUM */}
      <TheorySection
        number={1}
        title="Interaktív Szabályos Sokszög Laboratórium"
        badgeColor="orange"
        icon={<Sliders className="w-5 h-5 text-orange-600" />}
      >
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-orange-50/40 via-white to-amber-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-orange-950/20 border-orange-200 dark:border-orange-900/50 shadow-sm">
          {/* Top Controls: Pick n */}
          <div className="mb-5 pb-4 border-b border-orange-100 dark:border-orange-900/40">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Shapes className="w-4 h-4 text-orange-600" />
                Válassz oldalszámot (<MathText>n</MathText>):
              </span>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border border-orange-200">
                {current.name} ({current.hungarianName})
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {([3, 4, 5, 6, 8, 10, 12] as PolygonSides[]).map((sides) => (
                <Button
                  key={`btn-n-${sides}`}
                  variant={selectedN === sides ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedN(sides)}
                  className={
                    selectedN === sides
                      ? 'bg-orange-600 hover:bg-orange-700 text-white font-bold h-9 px-3.5 shadow-sm'
                      : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 h-9 px-3.5'
                  }
                >
                  n = {sides} ({sides}-szög)
                </Button>
              ))}
            </div>
          </div>

          {/* Interactive display grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG Visualizer */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-950/70 p-4 rounded-2xl border border-orange-200/80 dark:border-slate-800 shadow-inner flex flex-col items-center justify-center">
              {renderInteractiveSvg()}

              {/* Layer toggles */}
              <div className="flex flex-wrap justify-center gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 w-full text-xs">
                <Button
                  variant={showDiagonals ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setShowDiagonals(!showDiagonals)}
                  className="h-7 text-[11px] px-2"
                >
                  <Eye className="w-3 h-3 mr-1 text-orange-600" /> Átlók
                </Button>
                <Button
                  variant={showCenterLines ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setShowCenterLines(!showCenterLines)}
                  className="h-7 text-[11px] px-2"
                >
                  <Eye className="w-3 h-3 mr-1 text-sky-600" /> Sugarak (R)
                </Button>
                <Button
                  variant={showAngles ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setShowAngles(!showAngles)}
                  className="h-7 text-[11px] px-2"
                >
                  <Eye className="w-3 h-3 mr-1 text-amber-600" /> Szögek
                </Button>
                <Button
                  variant={showCircumcircle ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setShowCircumcircle(!showCircumcircle)}
                  className="h-7 text-[11px] px-2"
                >
                  <CircleDot className="w-3 h-3 mr-1 text-blue-600" /> Köré írt kör
                </Button>
                <Button
                  variant={showIncircle ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setShowIncircle(!showIncircle)}
                  className="h-7 text-[11px] px-2"
                >
                  <CircleDot className="w-3 h-3 mr-1 text-emerald-600" /> Beírt kör
                </Button>
              </div>
            </div>

            {/* Polygon Math Inspector Metrics */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-orange-50/70 dark:bg-slate-850 p-4 rounded-2xl border border-orange-200 dark:border-orange-900/60">
                <h4 className="text-sm font-bold text-orange-900 dark:text-orange-200 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  Kiszámított képletek és értékek (<MathText>n = {selectedN}</MathText>):
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-orange-100 dark:border-slate-800">
                    <div className="text-slate-500 text-[11px]">Belső szögek összege:</div>
                    <div className="font-bold text-slate-800 dark:text-white mt-1">
                      <span>{`S${selectedN} = (${selectedN}-2) · 180° =`}</span>{' '}
                      <span className="text-orange-600 font-extrabold">{current.interiorSum}°</span>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-orange-100 dark:border-slate-800">
                    <div className="text-slate-500 text-[11px]">Egy belső szög:</div>
                    <div className="font-bold text-slate-800 dark:text-white mt-1">
                      <span>α = </span>
                      <span className="text-orange-600 font-extrabold text-sm ml-1">
                        {current.oneInteriorAngle}°
                      </span>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-orange-100 dark:border-slate-800">
                    <div className="text-slate-500 text-[11px]">Külső és középponti szög:</div>
                    <div className="font-bold text-slate-800 dark:text-white mt-1">
                      <span>α' = ω = </span>
                      <span className="text-sky-600 font-extrabold text-sm ml-1">
                        {current.centralAngle}°
                      </span>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-orange-100 dark:border-slate-800">
                    <div className="text-slate-500 text-[11px]">1 csúcsból induló átlók:</div>
                    <div className="font-bold text-slate-800 dark:text-white mt-1">
                      <MathText>{`n - 3 = ${selectedN} - 3 = `}</MathText>
                      <span className="text-indigo-600 font-extrabold text-sm ml-1">
                        {current.diagonalsPerVertex} db
                      </span>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-orange-100 dark:border-slate-800">
                    <div className="text-slate-500 text-[11px]">Összes átló száma:</div>
                    <div className="font-bold text-slate-800 dark:text-white mt-1">
                      <MathText>{`A_${selectedN} = `}</MathText>
                      <span className="text-indigo-600 font-extrabold text-sm ml-1">
                        {current.totalDiagonals} db
                      </span>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-orange-100 dark:border-slate-800">
                    <div className="text-slate-500 text-[11px]">Szimmetriatengelyek:</div>
                    <div className="font-bold text-slate-800 dark:text-white mt-1">
                      <span className="text-emerald-600 font-extrabold text-sm">
                        {current.symmetryAxes} db
                      </span>{' '}
                      <span className="text-[10px] text-slate-400">(= n)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Symmetry and Tiling Highlight Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div
                  className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                    current.isPointSymmetric
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                  }`}
                >
                  <div className="text-lg">{current.isPointSymmetric ? '✅' : '❌'}</div>
                  <div>
                    <div className="font-bold">
                      {current.isPointSymmetric
                        ? 'Középpontosan szimmetrikus!'
                        : 'NEM középpontosan szimmetrikus!'}
                    </div>
                    <div className="text-[11px] opacity-80">
                      {current.isPointSymmetric
                        ? 'Mivel páros számú csúcsa van (n páros).'
                        : 'Mivel páratlan számú csúcsa van (n páratlan).'}
                    </div>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                    current.canTilePlane
                      ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="text-lg">{current.canTilePlane ? '🧱' : '🚫'}</div>
                  <div>
                    <div className="font-bold">
                      {current.canTilePlane
                        ? 'Önmagában parkettázza a síkot'
                        : 'Nem parkettázza a síkot'}
                    </div>
                    <div className="text-[11px] opacity-80">
                      {current.canTilePlane
                        ? `A ${current.oneInteriorAngle}° pontos osztója a 360°-nak (${360 / current.oneInteriorAngle} db csatlakozik).`
                        : `A ${current.oneInteriorAngle}° nem osztója a 360°-nak.`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Fun Fact */}
              <div className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 dark:text-slate-200">Érdekesség:</strong>{' '}
                  {current.specialFact}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </TheorySection>

      {/* 2. SZEKCIÓ: DEFINÍCIÓ ÉS A KETTŐS FELTÉTEL */}
      <TheorySection
        number={2}
        title="Mi a Szabályos Sokszög? A Kettős Feltétel"
        badgeColor="orange"
        icon={<BookOpen className="w-5 h-5 text-orange-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A Szabályos Sokszög Definíciója"
            variant="orange"
            badge="Alapfogalom"
            properties={[
              '1. Minden oldala egyenlő hosszú (egyenlő oldalú).',
              '2. Minden belső szöge egyenlő nagyságú (egyenlő szögű).',
              'Fontos: A szabályos sokszög MINDIG konvex (egyik belső szöge sem haladja meg a 180°-ot).'
            ]}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Egy sokszög <strong>csak akkor szabályos</strong>, ha a fenti két feltétel <em>egyidejűleg</em> teljesül.
              Ha bármelyik feltétel hiányzik, az alakzat <strong>nem szabályos</strong>!
            </p>
          </TheoryCard>

          <TheoryCard
            title="A Híres Csapda: Rombusz és Téglalap"
            variant="amber"
            badge="Figyelem!"
          >
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800">
                <strong className="text-amber-700 dark:text-amber-300 block mb-1">
                  🔷 A Rombusz NEM szabályos négyszög!
                </strong>
                Bár minden oldala egyenlő (<MathText>a = b = c = d</MathText>), a szögei nem feltétlenül egyenlők (van hegyesszöge és tompaszöge).
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800">
                <strong className="text-amber-700 dark:text-amber-300 block mb-1">
                  📐 A Téglalap NEM szabályos négyszög!
                </strong>
                Bár minden belső szöge egyenlő (90°), a szomszédos oldalai különböző hosszúságúak lehetnek (a ≠ b).
              </div>
              <p className="text-xs text-slate-500 font-medium">
                👉 Egyetlen négyszög létezik, amely egyszerre egyenlő oldalú és egyenlő szögű: a <strong>NÉGYZET</strong>.
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: BELSŐ SZÖGEK ÉS LEVEZETÉSÜK */}
      <TheorySection
        number={3}
        title="Belső Szögek Összege és Egy Belső Szög Levezetése"
        badgeColor="orange"
        icon={<Hash className="w-5 h-5 text-orange-600" />}
      >
        <TheoryCard
          title="Hogyan bontható háromszögekre egy n-szög?"
          variant="default"
          className="mb-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <p>
                Válasszuk ki a konvex <MathText>n</MathText>-szög egy tetszőleges csúcsát (legyen ez az <MathText>A</MathText> csúcs).
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  Az <MathText>A</MathText> csúcsból a szomszédos csúcsokba él (oldal) vezet, önmagába nem húzható vonal.
                  Így egyetlen csúcsból pontosan <strong><MathText>n - 3</MathText> darab átló</strong> húzható.
                </li>
                <li>
                  Ez az <MathText>n - 3</MathText> darab átló a sokszöget pontosan <strong><MathText>n - 2</MathText> darab háromszögre</strong> vágja fel!
                </li>
                <li>
                  Minden háromszög belső szögeinek összege 180°.
                  Mivel a sokszög belső szögei éppen kiadják ezen háromszögek összes szögét:
                </li>
              </ul>

              <div className="p-3 bg-orange-50 dark:bg-slate-900 rounded-xl border border-orange-200 dark:border-orange-800 text-center">
                <span className="text-xs uppercase tracking-wider text-orange-800 dark:text-orange-300 font-bold block mb-1">
                  Belső szögek összege:
                </span>
                <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  Sn = (n - 2) · 180°
                </div>
              </div>
            </div>

            {/* Visual SVG diagram of triangulation */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center">
              <svg viewBox="0 0 200 180" className="w-full max-w-[200px]">
                {/* 5-gon triangulation from vertex A */}
                <polygon
                  points="100,20 185,75 155,160 45,160 15,75"
                  fill="#ffedd5"
                  stroke="#ea580c"
                  strokeWidth="2.5"
                />
                {/* Diagonals from top vertex (100, 20) */}
                <line x1="100" y1="20" x2="155" y2="160" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="100" y1="20" x2="45" y2="160" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />

                {/* Triangle markers */}
                <text x="65" y="105" className="text-[11px] font-bold fill-blue-600">I.</text>
                <text x="100" y="125" className="text-[11px] font-bold fill-blue-600">II.</text>
                <text x="135" y="105" className="text-[11px] font-bold fill-blue-600">III.</text>

                {/* Vertex letters */}
                <circle cx="100" cy="20" r="3.5" fill="#ea580c" />
                <text x="100" y="12" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">A</text>
                <text x="193" y="78" className="text-[10px] font-bold fill-slate-700">B</text>
                <text x="163" y="172" className="text-[10px] font-bold fill-slate-700">C</text>
                <text x="35" y="172" className="text-[10px] font-bold fill-slate-700">D</text>
                <text x="3" y="78" className="text-[10px] font-bold fill-slate-700">E</text>
              </svg>
              <span className="text-[11px] text-slate-500 text-center mt-2">
                Ötszög (n = 5): 5 - 3 = 2 átló ⟹ 5 - 2 = 3 háromszög (3 · 180° = 540°)
              </span>
            </div>
          </div>
        </TheoryCard>

        {/* Egy belső szög */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-orange-200 dark:border-orange-900/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              Egy Belső Szög Nagysága (α)
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Mivel a szabályos <MathText>n</MathText>-szög mind az <MathText>n</MathText> darab belső szöge egyenlő, az összeg eloszlik <MathText>n</MathText> felé:
            </p>
          </div>

          <div className="px-5 py-3 rounded-xl bg-white dark:bg-slate-950 border border-orange-300 dark:border-orange-800 shadow-sm text-center shrink-0">
            <div className="text-base sm:text-xl font-bold text-orange-600 flex items-center justify-center gap-2">
              <span className="font-bold text-lg">α =</span>
              <Fraction
                num="(n - 2) · 180°"
                den="n"
                size="lg"
                className="font-bold text-orange-600"
              />
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: KÜLSŐ ÉS KÖZÉPPONTI SZÖGEK */}
      <TheorySection
        number={4}
        title="Külső Szögek és Középponti Szögek Csodája"
        badgeColor="orange"
        icon={<Compass className="w-5 h-5 text-orange-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A Külső Szög (α')"
            variant="sky"
            badge="Alaptétel"
          >
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <p>
                A sokszög egy belső szöge és a hozzá tartozó külső szög egy egyenest alkot, vagyis <strong>mellékszögek</strong>:
              </p>
              <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-slate-900 border border-sky-200 dark:border-sky-800 text-center font-bold text-sky-800 dark:text-sky-300">
                α + α' = 180° ⟹ α' = 180° - α
              </div>
              <p>
                <strong>Zseniális tétel:</strong> Bármely konvex sokszög külső szögeinek összege mindig pontosan 360°!
                Ezért a szabályos <MathText>n</MathText>-szögben:
              </p>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-sky-300 dark:border-sky-800 text-center flex items-center justify-center gap-2 font-bold text-sky-700 dark:text-sky-300">
                <span className="text-base font-bold">α' =</span>
                <Fraction num="360°" den="n" size="md" className="font-bold text-sky-700 dark:text-sky-300" />
              </div>
              <p className="text-[11px] text-slate-500 flex items-center flex-wrap gap-1">
                <span>💡 <em>Tipp:</em> Gyakran sokkal gyorsabb egy belső szöget a külső szögön keresztül kiszámolni:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 inline-flex items-center gap-1">
                  <span>α = 180° -</span>
                  <Fraction num="360°" den="n" size="sm" className="font-bold inline-flex" />
                </span>
                <span>!</span>
              </p>
            </div>
          </TheoryCard>

          <TheoryCard
            title="A Középponti Szög (ω)"
            variant="blue"
            badge="Köré írt kör"
          >
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <p>
                A szabályos sokszög köré és beírt körének középpontja megegyezik (<MathText>O</MathText>).
                Ha az <MathText>O</MathText> pontot összekötjük az összes csúccsal, a teljesszöget (360°) <MathText>n</MathText> egyenlő részre osztjuk:
              </p>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-blue-300 dark:border-blue-800 text-center flex items-center justify-center gap-2 font-bold text-blue-700 dark:text-blue-300">
                <span className="text-base font-bold">ω =</span>
                <Fraction num="360°" den="n" size="md" className="font-bold text-blue-700 dark:text-blue-300" />
              </div>
              <div className="p-3 bg-blue-50/80 dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-800 text-xs">
                <strong className="text-blue-900 dark:text-blue-200 block mb-1">
                  ⭐ Rendkívüli észrevétel:
                </strong>
                A szabályos sokszög <strong>egy külső szöge pontosan egyenlő a középponti szögével</strong>!
                <div className="text-center font-bold text-blue-700 dark:text-blue-300 text-sm mt-1 flex items-center justify-center gap-1.5">
                  <span>α' = ω =</span>
                  <Fraction num="360°" den="n" size="sm" className="font-bold inline-flex text-blue-700 dark:text-blue-300" />
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: ÁTLÓK SZÁMA */}
      <TheorySection
        number={5}
        title="Az Átlók Száma: Honnan jön a Képlet?"
        badgeColor="orange"
        icon={<Divide className="w-5 h-5 text-orange-600" />}
      >
        <TheoryCard
          title="Kombinatorikus Levezetés Két Lépésben"
          variant="indigo"
          badge="Levezetés"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <p>
                <strong>1. Lépés:</strong> Egyetlen csúcsból hány átló indulhat?
              </p>
              <p className="pl-4 border-l-2 border-indigo-300">
                Az <MathText>n</MathText> csúcs közül nem húzhatunk átlót önmagába (1 pont), és a két közvetlen szomszédos csúcsba sem (2 pont), mert azok a sokszög oldalai.
                Így egy csúcsból pontosan <strong><MathText>n - 3</MathText> átló</strong> húzható.
              </p>

              <p>
                <strong>2. Lépés:</strong> Hány átló van összesen?
              </p>
              <p className="pl-4 border-l-2 border-indigo-300">
                Mivel <MathText>n</MathText> darab csúcs van, felmerül a kérdés: <MathText>n · (n - 3)</MathText>?
                Vigyázat! Ezzel a szorzattal minden átlót <strong>pontosan kétszer számolnánk</strong> (pl. az AB átlót A-ból is és B-ből is).
                Ezért a szorzatot <strong>kettővel el kell osztanunk</strong>:
              </p>
            </div>

            <div className="md:col-span-4 bg-indigo-50/70 dark:bg-slate-900 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800 text-center flex flex-col items-center justify-center">
              <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider mb-2">
                Összes átló száma (An):
              </span>
              <div className="text-xl sm:text-2xl font-black text-indigo-900 dark:text-white flex items-center justify-center gap-2">
                <span>An =</span>
                <Fraction
                  num="n · (n - 3)"
                  den="2"
                  size="lg"
                  className="font-black text-indigo-900 dark:text-white"
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-2 flex items-center justify-center gap-1">
                <span>Pl. hatszögnél (n = 6):</span>
                <Fraction num="6 · 3" den="2" size="sm" className="font-bold inline-flex" />
                <span>= 9 átló.</span>
              </span>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 6. SZEKCIÓ: SZIMMETRIÁK ÉS SÍKPARKETTÁZÁS */}
      <TheorySection
        number={6}
        title="Szimmetriák és a Síkfedés (Parkettázás) Titka"
        badgeColor="orange"
        icon={<RotateCw className="w-5 h-5 text-orange-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TheoryCard
            title="Tengelyes és Középpontos Szimmetria"
            variant="emerald"
            badge="Szimmetriák"
          >
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Szimmetriatengelyek száma:</strong> Bármely szabályos <MathText>n</MathText>-szögnek pontosan <strong><MathText>n</MathText> darab</strong> szimmetriatengelye van.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Páratlan csúcsszám (<MathText>n = 3, 5, 7, …</MathText>):</strong>
                  A tengelyek a csúcsot kötik össze a szemközti oldal felezőpontjával. <em>Középpontosan NEM szimmetrikusak!</em>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex items-center flex-wrap gap-1">
                  <strong>Páros csúcsszám (<MathText>n = 4, 6, 8, …</MathText>):</strong>
                  <Fraction num="n" den="2" className="text-xs font-bold inline-flex mx-1" />
                  <span>db tengely szemközti csúcsokat,</span>
                  <Fraction num="n" den="2" className="text-xs font-bold inline-flex mx-1" />
                  <span>db pedig szemközti oldalfelezőket köt össze.</span>
                  <em>Mindegyik KÖZÉPPONTOSAN IS SZIMMETRIKUS</em> a középpontjára (<MathText>O</MathText>)!
                </div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Mely Szabályos Sokszögekkel Fedhető le a Sík?"
            variant="purple"
            badge="Parkettázás"
          >
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <p>
                Egy csúcs körül a szögeknek pontosan 360°-ot kell kitölteniük rés és átfedés nélkül.
                Ez csak akkor lehetséges, ha a belső szög (α) osztója a 360°-nak:
              </p>
              <div className="space-y-1.5 pt-1">
                <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-slate-900 border border-purple-200 text-xs flex justify-between items-center">
                  <span>🔺 Szabályos 3-szög (α = 60°):</span>
                  <strong className="text-purple-700">6 db találkozik (6 · 60° = 360°)</strong>
                </div>
                <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-slate-900 border border-purple-200 text-xs flex justify-between items-center">
                  <span>⬛ Négyzet (α = 90°):</span>
                  <strong className="text-purple-700">4 db találkozik (4 · 90° = 360°)</strong>
                </div>
                <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-slate-900 border border-purple-200 text-xs flex justify-between items-center">
                  <span>⬡ Szabályos 6-szög (α = 120°):</span>
                  <strong className="text-purple-700">3 db találkozik (3 · 120° = 360°)</strong>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 italic mt-1">
                Önmagában csak ez a 3 szabályos sokszög képes hézagmentesen parkettázni a síkot! (Ezért méhsejt a méhek kaptára).
              </p>
            </div>
          </TheoryCard>
        </div>

        {/* Master Comparison Matrix Table */}
        <TheoryTable
          title="Nevezetes Szabályos Sokszögek Összehasonlító Adattára"
          headers={[
            'Alakzat',
            'Oldalak (n)',
            'Belső összeg',
            '1 belső szög (α)',
            'Külső / Középponti (α\', ω)',
            'Átlók száma',
            'Tengelyek',
            'Középpontos?'
          ]}
          rows={[
            ['Szabályos 3-szög', '3', '180°', '60°', '120°', '0 db', '3 db', '❌ Nem'],
            ['Négyzet', '4', '360°', '90°', '90°', '2 db', '4 db', '✅ Igen'],
            ['Szabályos 5-szög', '5', '540°', '108°', '72°', '5 db', '5 db', '❌ Nem'],
            ['Szabályos 6-szög', '6', '720°', '120°', '60°', '9 db', '6 db', '✅ Igen'],
            ['Szabályos 8-szög', '8', '1080°', '135°', '45°', '20 db', '8 db', '✅ Igen'],
            ['Szabályos 10-szög', '10', '1440°', '144°', '36°', '35 db', '10 db', '✅ Igen'],
            ['Szabályos 12-szög', '12', '1800°', '150°', '30°', '54 db', '12 db', '✅ Igen']
          ]}
        />
      </TheorySection>

      {/* 7. SZEKCIÓ: KIDOLGOZOTT MINTAFELADATOK */}
      <TheorySection
        number={7}
        title="Lépésről Lépésre Kidolgozott Mintapéldák"
        badgeColor="orange"
        icon={<BookOpen className="w-5 h-5 text-orange-600" />}
      >
        <div className="space-y-4">
          {/* Example 1 */}
          <Card className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300">
                1. Mintapélda
              </span>
              <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                Belső és külső szög kiszámítása szabályos 9-szögben
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3">
              Számítsuk ki egy szabályos kilencszög (<MathText>n = 9</MathText>) belső szögeinek összegét, egy belső szögét és egy külső szögét!
            </p>

            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm space-y-2">
              <div>
                <strong>1. Lépés: Belső szögek összege:</strong>
                <div className="mt-1 pl-3 text-slate-700 dark:text-slate-200">
                  S₉ = (9 - 2) · 180° = 7 · 180° = 1260°
                </div>
              </div>
              <div>
                <strong>2. Lépés: Egy belső szög nagysága:</strong>
                <div className="mt-1 pl-3 text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <span className="font-bold">α =</span>
                  <Fraction num="1260°" den="9" size="md" className="font-bold" />
                  <span>= 140°</span>
                </div>
              </div>
              <div>
                <strong>3. Lépés: Egy külső szög:</strong>
                <div className="mt-1 pl-3 text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <span>α' = 180° - 140° = 40°</span>
                  <span className="text-slate-400">
                    (Ellenőrzés:{' '}
                    <Fraction num="360°" den="9" size="sm" className="font-bold inline-flex" /> = 40°)
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-bold">
                Válasz: Belső szögek összege 1260°, egy belső szög 140°, egy külső szög 40°.
              </div>
            </div>
          </Card>

          {/* Example 2 */}
          <Card className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300">
                2. Mintapélda
              </span>
              <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                Visszakövetkeztetés az oldalszámra a belső szögből
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3">
              Egy szabályos sokszög egyetlen belső szöge α = 150°. Hány oldala van a sokszögnek, és hány átlója húzható összesen?
            </p>

            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm space-y-2">
              <div>
                <strong>1. Lépés: Külső szög kiszámítása (a leggyorsabb trükk!):</strong>
                <div className="mt-1 pl-3 text-slate-700 dark:text-slate-200">
                  α' = 180° - 150° = 30°
                </div>
              </div>
              <div>
                <strong>2. Lépés: Oldalszám (<MathText>n</MathText>) meghatározása:</strong>
                <div className="mt-1 pl-3 text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <span>α' =</span>
                  <Fraction num="360°" den="n" size="md" className="font-bold" />
                  <span>= 30° ⟹ n =</span>
                  <Fraction num="360°" den="30°" size="md" className="font-bold" />
                  <span>= 12</span>
                </div>
                <div className="text-slate-500 text-xs pl-3 mt-0.5">
                  A sokszög egy szabályos 12-szög (dodekagon).
                </div>
              </div>
              <div>
                <strong>3. Lépés: Összes átló száma:</strong>
                <div className="mt-1 pl-3 text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <span>A₁₂ =</span>
                  <Fraction num="12 · (12 - 3)" den="2" size="md" className="font-bold" />
                  <span>=</span>
                  <Fraction num="12 · 9" den="2" size="md" className="font-bold" />
                  <span>= 6 · 9 = 54 db</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-bold">
                Válasz: A sokszögnek 12 oldala és 54 darab átlója van.
              </div>
            </div>
          </Card>

          {/* Example 3 */}
          <Card className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300">
                3. Mintapélda
              </span>
              <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                Átlók számából az oldalszám megkeresése
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3">
              Melyik az a sokszög, amelynek egyetlen csúcsából pontosan 5 átló húzható? Hány összes átlója van, és mennyi a belső szögeinek összege?
            </p>

            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm space-y-2">
              <div>
                <strong>1. Lépés: Oldalszám az egy csúcsból induló átlókból:</strong>
                <div className="mt-1 pl-3 text-slate-700 dark:text-slate-200">
                  n - 3 = 5 ⟹ n = 5 + 3 = 8 (nyolcszög).
                </div>
              </div>
              <div>
                <strong>2. Lépés: Összes átló:</strong>
                <div className="mt-1 pl-3 text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <span>A₈ =</span>
                  <Fraction num="8 · (8 - 3)" den="2" size="md" className="font-bold" />
                  <span>=</span>
                  <Fraction num="8 · 5" den="2" size="md" className="font-bold" />
                  <span>= 20 db</span>
                </div>
              </div>
              <div>
                <strong>3. Lépés: Belső szögek összege:</strong>
                <div className="mt-1 pl-3 text-slate-700 dark:text-slate-200">
                  S₈ = (8 - 2) · 180° = 6 · 180° = 1080°.
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-bold">
                Válasz: Ez a nyolcszög; összesen 20 átlója van, belső szögeinek összege 1080°.
              </div>
            </div>
          </Card>
        </div>
      </TheorySection>

      {/* 8. SZEKCIÓ: GYAKORI CSAPDÁK ÉS TÍPUSHIBÁK */}
      <TheorySection
        number={8}
        title="Típushibák és Csapdák a Szabályos Sokszögeknél"
        badgeColor="orange"
        icon={<AlertTriangle className="w-5 h-5 text-orange-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: Rombusz vagy Téglalap szabályossága"
            trap="„A rombusz szabályos négyszög, mert minden oldala egyenlő!”"
            wrong="HAMIS! A rombusz szögei általában nem egyenlők (pl. 60° és 120°)."
            solution="Szabályos csak akkor lehet, ha mindkét feltétel teljesül: oldalai ÉS belső szögei is mind egyenlők. A négyszögek közül ez egyedül a négyzetre igaz."
          />

          <TheoryTrapBox
            title="2. Csapda: Külső szög definíciója"
            trap="„A külső szög az a szög, ami a belső szöget 360°-ra egészíti ki kívülről.”"
            wrong="ÓRIÁSI TÉVHIT! Az a szög a konkáv kiegészítő szög (360° - α), nem a külső szög!"
            solution="A külső szög egy oldal és a szomszédos oldal meghosszabbítása által bezárt szög. A belső szög mellékszöge, így az összege mindig pontosan 180°: α + α' = 180°."
          />

          <TheoryTrapBox
            title="3. Csapda: Átlók száma képlet felezése"
            trap="„Elfelejtik osztani 2-vel a szorzatot: An = n · (n - 3).”"
            wrong="Ekkor minden átlót duplán számolunk (az A-ból B-be és a B-ből A-ba vezetőt külön-külön)."
            solution="Mivel az átló kétirányú szakasz, mindig kötelező osztani 2-vel: An = n · (n - 3) / 2."
          />

          <TheoryTrapBox
            title="4. Csapda: Szabályos háromszög középpontos szimmetriája"
            trap="„A szabályos háromszög olyan szép és szimmetrikus, biztosan van szimmetriaközéppontja is!”"
            wrong="HAMIS! A súlypontjára 180°-kal elforgatva csúcsával lefelé fordul (fejre áll), nem fedi önmagát."
            solution="Szabályos sokszög csak akkor középpontosan szimmetrikus, ha páros számú csúcsa van (n = 4, 6, 8...). Páratlan csúcsszám esetén (n = 3, 5, 7...) sosem!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
