import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ShapesExamMatcher } from './ShapesExamMatcher';
import { ShapesExamSorter } from './ShapesExamSorter';
import { ExamAngle, ExamCuboid, ExamSphere, ExamCylinder, ExamPyramid, EXAM_FLAG, examPoly, examRotQ, XP } from './ShapesExamFigures';
import { TownMap, ChessBoard } from '../tajekozodas/Orientation4Figures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek (nem exportált)
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const T: React.FC<{ x: number; y: number; t: string; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }> = ({
  x,
  y,
  t,
  size = 12,
  color,
  anchor = 'middle'
}) => (
  <text x={x} y={y} fontSize={size} fontWeight="bold" textAnchor={anchor} fill={t.includes('?') ? UNK : color ?? '#0f172a'}>
    {t}
  </text>
);

const Grid: React.FC<{ x0: number; y0: number; cols: number; rows: number; u: number }> = ({ x0, y0, cols, rows, u }) => (
  <g>
    {Array.from({ length: cols + 1 }, (_, i) => (
      <line key={`v${i}`} x1={x0 + i * u} y1={y0} x2={x0 + i * u} y2={y0 + rows * u} stroke="#e2e8f0" />
    ))}
    {Array.from({ length: rows + 1 }, (_, i) => (
      <line key={`h${i}`} x1={x0} y1={y0 + i * u} x2={x0 + cols * u} y2={y0 + i * u} stroke="#e2e8f0" />
    ))}
  </g>
);

const Dot: React.FC<{ x: number; y: number; l: string; color?: string }> = ({ x, y, l, color = '#7c3aed' }) => (
  <g>
    <circle cx={x} cy={y} r="4.5" fill={color} />
    <text x={x + 6} y={y - 6} fontSize="11" fontWeight="bold" fill={color}>
      {l}
    </text>
  </g>
);

const Poly: React.FC<{ pts: XP[]; fill?: string; stroke?: string }> = ({ pts, fill = '#c7d2fe', stroke = '#3730a3' }) => (
  <polygon points={pts.map((p) => p.join(',')).join(' ')} fill={fill} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
);

const MapFig: React.FC<{ highlight?: string }> = ({ highlight }) => (
  <svg viewBox="0 0 310 262" className="w-full max-w-[300px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="308" height="260" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    <TownMap highlight={highlight} />
  </svg>
);
const ChessFig: React.FC<{ pieces?: boolean; highlight?: string }> = ({ pieces = true, highlight }) => (
  <svg viewBox="0 0 210 206" className="w-full max-w-[240px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="208" height="204" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    <ChessBoard u={22} x0={24} y0={8} pieces={pieces} highlight={highlight} />
  </svg>
);

const PlanFig: React.FC<{ rows: number[][]; note: string }> = ({ rows, note }) => (
  <QFig h={140}>
    {rows.map((r, i) =>
      r.map((h, j) => (
        <g key={`${i}-${j}`}>
          <rect x={60 + j * 36} y={14 + i * 36} width={36} height={36} fill="#fdf2f8" stroke="#831843" strokeWidth="1.5" />
          <T x={78 + j * 36} y={38 + i * 36} t={String(h)} size={16} color="#831843" />
        </g>
      ))
    )}
    <T x={120} y={130} t={note} size={11} />
  </QFig>
);

const ClockFig: React.FC<{ hour: number; label: string; minute?: boolean }> = ({ hour, label, minute }) => {
  const c: XP = [120, 66];
  const ang = (h: number) => ((h % 12) * 30 - 90) * (Math.PI / 180);
  return (
    <QFig>
      <circle cx={c[0]} cy={c[1]} r="50" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
      {Array.from({ length: 12 }, (_, i) => (
        <text key={i} x={c[0] + 39 * Math.cos(ang(i + 1))} y={c[1] + 39 * Math.sin(ang(i + 1)) + 4} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">
          {i + 1}
        </text>
      ))}
      {minute ? (
        <>
          <line x1={c[0]} y1={c[1]} x2={c[0]} y2={c[1] - 32} stroke="#94a3b8" strokeWidth="3" strokeDasharray="4 3" />
          <line x1={c[0]} y1={c[1]} x2={c[0] + 32 * Math.cos(ang(hour))} y2={c[1] + 32 * Math.sin(ang(hour))} stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1={c[0]} y1={c[1]} x2={c[0]} y2={c[1] - 34} stroke="#0f766e" strokeWidth="3" strokeLinecap="round" />
          <line x1={c[0]} y1={c[1]} x2={c[0] + 22 * Math.cos(ang(hour))} y2={c[1] + 22 * Math.sin(ang(hour))} stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
        </>
      )}
      <circle cx={c[0]} cy={c[1]} r="4" fill="#0f172a" />
      <T x={120} y={140} t={label} size={11} />
    </QFig>
  );
};

const ArrowFig: React.FC<{ dir: number; text: string }> = ({ dir, text }) => {
  const c: XP = [70, 70];
  const pts: XP[] = [[0, -36], [-14, -14], [-6, -14], [-6, 30], [6, 30], [6, -14], [14, -14]];
  return (
    <QFig>
      <polygon points={pts.map((p) => examRotQ(p, dir)).map(([x, y]) => `${c[0] + x},${c[1] + y}`).join(' ')} fill="#5eead4" stroke="#0f766e" strokeWidth="2" />
      <circle cx={c[0]} cy={c[1]} r="3.5" fill={UNK} />
      <T x={175} y={62} t={text} size={11} color="#0f766e" />
      <T x={175} y={86} t="Merre mutat? ?" size={11} />
    </QFig>
  );
};

// --- Ábrák (1. szint) ---
const FIG_PENTAGON = (
  <QFig h={140}>
    <Poly pts={[[120, 18], [168, 52], [150, 108], [90, 108], [72, 52]]} fill="#bbf7d0" stroke="#15803d" />
    <T x={120} y={132} t="Hány csúcsa van? ?" size={11} />
  </QFig>
);
const FIG_ACUTE = (
  <QFig h={130}>
    <ExamAngle v={[70, 100]} a1={0} a2={-40} len={110} />
    <T x={120} y={122} t="Milyen szög? ?" size={11} />
  </QFig>
);
const FIG_CUBE = (
  <QFig h={140}>
    <ExamCuboid x={80} y={110} w={60} h={60} d={36} />
    <T x={120} y={132} t="Hány lapja van? ?" size={11} />
  </QFig>
);
const FIG_SPHERE = (
  <QFig h={140}>
    <ExamSphere cx={120} cy={64} r={44} />
    <T x={120} y={132} t="Melyik test? ?" size={11} />
  </QFig>
);
const FIG_SOLID_PICK = (
  <QFig h={130}>
    <ExamCuboid x={14} y={80} w={34} h={24} d={20} />
    <rect x={80} y={48} width={32} height={32} fill="#fee2e2" stroke="#b91c1c" strokeWidth="2" />
    <circle cx={150} cy={64} r={17} fill="#fee2e2" stroke="#b91c1c" strokeWidth="2" />
    <polygon points="180,80 192,48 230,48 218,80" fill="#fee2e2" stroke="#b91c1c" strokeWidth="2" />
    <T x={38} y={104} t="téglatest" size={10} />
    <T x={96} y={104} t="négyzet" size={10} />
    <T x={150} y={104} t="kör" size={10} />
    <T x={206} y={104} t="ferde négyszög" size={9} />
    <T x={120} y={122} t="Melyik a test? ?" size={11} />
  </QFig>
);
const FIG_MIRROR_FLAG = (
  <QFig h={150}>
    <Grid x0={10} y0={10} cols={22} rows={10} u={10} />
    <polygon points={examPoly(EXAM_FLAG, 30, 60, 10)} fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.5" />
    <line x1={60} y1={10} x2={60} y2={110} stroke={UNK} strokeWidth="2" strokeDasharray="5 3" />
    <T x={30} y={78} t="eredeti" size={9} />
    <polygon points={examPoly(EXAM_FLAG.map(([x, y]) => [-x, y] as XP), 90, 60, 10)} fill="#fdba74" stroke="#c2410c" strokeWidth="1.5" />
    <polygon points={examPoly(EXAM_FLAG, 120, 60, 10)} fill="#fdba74" stroke="#c2410c" strokeWidth="1.5" />
    <polygon points={examPoly(EXAM_FLAG.map((p) => examRotQ(p, 1)), 160, 70, 10)} fill="#fdba74" stroke="#c2410c" strokeWidth="1.5" />
    <polygon points={examPoly(EXAM_FLAG.map(([x, y]) => [x, -y] as XP), 205, 30, 10)} fill="#fdba74" stroke="#c2410c" strokeWidth="1.5" />
    <T x={80} y={78} t="A" size={11} />
    <T x={130} y={78} t="B" size={11} />
    <T x={175} y={98} t="C" size={11} />
    <T x={210} y={78} t="D" size={11} />
    <T x={120} y={135} t="A piros szaggatott vonal a tükör. ?" size={10} />
  </QFig>
);
const FIG_SHIFT_4 = (
  <QFig>
    <Grid x0={20} y0={20} cols={10} rows={6} u={18} />
    <polygon points={examPoly(EXAM_FLAG, 20 + 18, 20 + 5 * 18, 18)} fill="#fed7aa" stroke="#9a3412" strokeWidth="1.5" />
    <polygon points={examPoly(EXAM_FLAG, 20 + 5 * 18, 20 + 5 * 18, 18)} fill="#fdba74" stroke="#9a3412" strokeWidth="2" />
    <T x={120} y={142} t="Hány négyzettel keletre? ?" size={11} />
  </QFig>
);
const FIG_CLOCK_3 = <ClockFig hour={3} minute label="nagymutató: 12 → 3. Mekkora fordulat? ?" />;
const FIG_ARROW_UP = <ArrowFig dir={0} text="negyed fordulat jobbra" />;
const FIG_MAP = <MapFig />;
const FIG_CHESS = <ChessFig />;
const FIG_SEG = (
  <QFig h={100}>
    <Grid x0={20} y0={20} cols={10} rows={3} u={20} />
    <line x1={40} y1={40} x2={100} y2={40} stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round" />
    <T x={70} y={33} t="3 egység" size={10} color="#1d4ed8" />
    <T x={150} y={75} t="kétszeresére: ?" size={11} />
  </QFig>
);

// --- Ábrák (2. szint) ---
const FIG_HEXAGON = (
  <QFig h={150}>
    <Poly pts={[[90, 20], [150, 20], [180, 72], [150, 124], [90, 124], [60, 72]]} fill="#fde68a" stroke="#a16207" />
    <circle cx={90} cy={20} r="4" fill={UNK} />
    <T x={120} y={142} t="Átlók a piros csúcsból: ?" size={11} />
  </QFig>
);
const FIG_OBTUSE = (
  <QFig h={130}>
    <ExamAngle v={[130, 100]} a1={-150} a2={0} len={90} />
    <T x={120} y={122} t="Milyen szög? ?" size={11} />
  </QFig>
);
const FIG_L_HEX = (
  <QFig h={150}>
    <Poly pts={[[60, 20], [110, 20], [110, 80], [180, 80], [180, 125], [60, 125]]} fill="#c7d2fe" stroke="#3730a3" />
    <T x={210} y={60} t="Hány" size={11} />
    <T x={210} y={76} t="oldala? ?" size={11} />
  </QFig>
);
const FIG_CUBOID = (
  <QFig h={140}>
    <ExamCuboid x={60} y={110} w={90} h={50} d={44} />
    <T x={120} y={132} t="Hány éle van? ?" size={11} />
  </QFig>
);
const FIG_PLAN_7 = <PlanFig rows={[[2, 1], [3, 1]]} note="Hány kis kocka? ?" />;
const FIG_MIRROR_POINT = (
  <QFig>
    <Grid x0={20} y0={15} cols={10} rows={6} u={20} />
    <line x1={120} y1={15} x2={120} y2={135} stroke={UNK} strokeWidth="2.5" strokeDasharray="6 3" />
    <Dot x={80} y={75} l="P" color="#0f172a" />
    <Dot x={160} y={75} l="A" />
    <Dot x={140} y={75} l="B" />
    <Dot x={180} y={75} l="C" />
    <Dot x={160} y={55} l="D" />
    <T x={120} y={146} t="P tükörképe: ?" size={11} />
  </QFig>
);
const FIG_RECT_3x2 = (
  <QFig>
    <Grid x0={12} y0={12} cols={18} rows={8} u={12} />
    <rect x={24} y={36} width={36} height={24} fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
    <T x={42} y={30} t="3" size={10} color="#1d4ed8" />
    <T x={68} y={52} t="2" size={10} color="#1d4ed8" />
    <T x={160} y={70} t="kétszeresére: ?" size={12} />
  </QFig>
);
const FIG_POINT_3K2D = (
  <QFig h={160}>
    <Grid x0={30} y0={10} cols={9} rows={7} u={18} />
    <Dot x={30 + 2 * 18} y={10 + 2 * 18} l="P" color="#0f172a" />
    <Dot x={30 + 5 * 18} y={10 + 4 * 18} l="A" />
    <Dot x={30 + 5 * 18} y={10 + 0 * 18} l="B" />
    <Dot x={30 + 4 * 18} y={10 + 5 * 18} l="C" />
    <Dot x={30 + 0 * 18} y={10 + 4 * 18} l="D" />
    <T x={120} y={152} t="P: 3 keletre, 2 délre → ? (észak fent)" size={10} />
  </QFig>
);
const FIG_ROT_OPTIONS = (
  <QFig h={165}>
    <polygon points={examPoly(EXAM_FLAG, 120, 50, 7)} fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.5" />
    <circle cx={120} cy={50} r="3" fill={UNK} />
    <T x={150} y={40} t="eredeti" size={10} anchor="start" />
    <polygon points={examPoly(EXAM_FLAG.map((p) => examRotQ(p, 2)), 40, 98, 7)} fill="#5eead4" stroke="#0f766e" strokeWidth="1.5" />
    <polygon points={examPoly(EXAM_FLAG.map((p) => examRotQ(p, 1)), 82, 115, 7)} fill="#5eead4" stroke="#0f766e" strokeWidth="1.5" />
    <polygon points={examPoly(EXAM_FLAG.map(([x, y]) => [-x, y] as XP), 165, 130, 7)} fill="#5eead4" stroke="#0f766e" strokeWidth="1.5" />
    <polygon points={examPoly(EXAM_FLAG.map((p) => examRotQ(p, 3)), 222, 120, 7)} fill="#5eead4" stroke="#0f766e" strokeWidth="1.5" />
    {[[40, 98], [82, 115], [165, 130], [222, 120]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="3" fill={UNK} />
    ))}
    <T x={32} y={155} t="A" size={11} />
    <T x={98} y={155} t="B" size={11} />
    <T x={158} y={155} t="C" size={11} />
    <T x={208} y={155} t="D" size={11} />
    <T x={55} y={30} t="negyed jobbra: ?" size={11} />
  </QFig>
);
const FIG_CLOCK_45 = <ClockFig hour={9} minute label="45 perc alatt: ? fordulat" />;
const FIG_MAP_F5 = <MapFig highlight="F5" />;

// --- Ábrák (3. szint) ---
const FIG_VENN = (
  <QFig h={150}>
    <rect x="8" y="8" width="224" height="134" rx="4" fill="#ffffff" stroke="#15803d" strokeWidth="2" />
    <T x={50} y={24} t="SOKSZÖGEK" size={10} color="#15803d" />
    <ellipse cx="90" cy="85" rx="66" ry="46" fill="#dcfce7" fillOpacity="0.6" stroke="#16a34a" strokeWidth="2" />
    <ellipse cx="150" cy="85" rx="66" ry="46" fill="#fee2e2" fillOpacity="0.6" stroke="#dc2626" strokeWidth="2" />
    <T x={70} y={46} t="párhuzamos oldalak" size={8.5} color="#166534" />
    <T x={175} y={46} t="négyszögek" size={8.5} color="#b91c1c" />
    <T x={55} y={90} t="1" size={14} color="#166534" />
    <T x={120} y={90} t="2" size={14} color="#78350f" />
    <T x={185} y={90} t="3" size={14} color="#b91c1c" />
    <T x={210} y={132} t="4" size={14} color="#3730a3" />
  </QFig>
);
const FIG_CUBES_12 = (
  <QFig h={150}>
    {[0, 1].map((layer) =>
      [1, 0].map((depth) =>
        [0, 1, 2].map((c) => {
          const u = 28;
          const X = 50 + c * u + depth * 14;
          const Y = 125 - layer * u - depth * 11;
          return (
            <g key={`${layer}-${depth}-${c}`}>
              <rect x={X} y={Y - u} width={u} height={u} fill="#a5b4fc" stroke="#312e81" strokeWidth="1.2" />
              <polygon points={`${X},${Y - u} ${X + 14},${Y - u - 11} ${X + u + 14},${Y - u - 11} ${X + u},${Y - u}`} fill="#c7d2fe" stroke="#312e81" strokeWidth="1.2" />
              <polygon points={`${X + u},${Y} ${X + u + 14},${Y - 11} ${X + u + 14},${Y - u - 11} ${X + u},${Y - u}`} fill="#818cf8" stroke="#312e81" strokeWidth="1.2" />
            </g>
          );
        })
      )
    )}
    <T x={190} y={70} t="Hány kis" size={11} />
    <T x={190} y={86} t="kocka? ?" size={11} />
  </QFig>
);
const FIG_PLAN_10 = <PlanFig rows={[[3, 2, 1], [2, 1, 1]]} note="Hány kis kocka? ?" />;
const FIG_MIRROR_H = (
  <QFig>
    <Grid x0={30} y0={10} cols={9} rows={7} u={18} />
    <line x1={30} y1={10 + 4 * 18} x2={30 + 9 * 18} y2={10 + 4 * 18} stroke={UNK} strokeWidth="2.5" strokeDasharray="6 3" />
    <Dot x={30 + 3 * 18} y={10 + 1 * 18} l="P" color="#0f172a" />
    <Dot x={30 + 3 * 18} y={10 + 7 * 18} l="A" />
    <Dot x={30 + 6 * 18} y={10 + 7 * 18} l="B" />
    <Dot x={30 + 3 * 18} y={10 + 5 * 18} l="C" />
    <Dot x={30 + 6 * 18} y={10 + 1 * 18} l="D" />
    <T x={120} y={146} t="P tükörképe: ?" size={11} />
  </QFig>
);
const FIG_GRID_HALF = (() => {
  const u = 18;
  const o: XP = [120, 72];
  const cell = (dx: number, dy: number, fill: string, label?: string) => (
    <g>
      <rect x={o[0] + dx * u} y={o[1] + dy * u} width={u} height={u} fill={fill} stroke="#475569" />
      {label && <T x={o[0] + dx * u + u / 2} y={o[1] + dy * u + u / 2 + 4} t={label} size={11} color="#4c1d95" />}
    </g>
  );
  return (
    <QFig>
      <Grid x0={o[0] - 6 * u} y0={o[1] - 3 * u} cols={12} rows={6} u={u} />
      {cell(1, -2, '#5eead4')}
      {cell(-2, 1, '#ede9fe', 'A')}
      {cell(-2, -2, '#ede9fe', 'B')}
      {cell(1, 1, '#ede9fe', 'C')}
      {cell(2, -1, '#ede9fe', 'D')}
      <circle cx={o[0]} cy={o[1]} r="4.5" fill={UNK} />
      <T x={o[0] - 6} y={o[1] - 6} t="O" size={11} color={UNK} anchor="end" />
      <T x={120} y={142} t="Fél fordulat az O körül: ?" size={11} />
    </QFig>
  );
})();
const FIG_CHESS_E4 = <ChessFig pieces={false} highlight="e4" />;


// --- Kiegészítő ábrák ---
const FIG_SHAPES_ROW = (
  <QFig h={110}>
    <circle cx={35} cy={50} r={20} fill="#bbf7d0" stroke="#15803d" strokeWidth="2" />
    <Poly pts={[[70, 70], [92, 30], [114, 70]]} />
    <rect x={130} y={32} width={38} height={38} fill="#c7d2fe" stroke="#3730a3" strokeWidth="2" />
    <Poly pts={[[205, 28], [228, 45], [220, 72], [190, 72], [182, 45]]} />
    <T x={35} y={92} t="kör" size={10} />
    <T x={92} y={92} t="háromszög" size={10} />
    <T x={149} y={92} t="négyzet" size={10} />
    <T x={205} y={92} t="ötszög" size={10} />
  </QFig>
);
const FIG_SQUARE_Q = (
  <QFig h={130}>
    <rect x={80} y={20} width={80} height={80} fill="#fde68a" stroke="#a16207" strokeWidth="2.5" />
    <T x={120} y={120} t="szimmetriatengelyek: ?" size={11} />
  </QFig>
);
const FIG_POLY_ROW = (
  <QFig h={110}>
    <Poly pts={[[15, 75], [35, 35], [55, 75]]} fill="#fecaca" stroke="#b91c1c" />
    <rect x={70} y={38} width={38} height={37} fill="#c7d2fe" stroke="#3730a3" strokeWidth="2" />
    <Poly pts={[[145, 30], [167, 46], [159, 75], [131, 75], [123, 46]]} fill="#bbf7d0" stroke="#15803d" />
    <Poly pts={[[195, 32], [217, 32], [228, 53], [217, 74], [195, 74], [184, 53]]} fill="#fde68a" stroke="#a16207" />
    <T x={120} y={98} t="Melyiknek nincs átlója? ?" size={11} />
  </QFig>
);
const FIG_CUBE_V = (
  <QFig h={140}>
    <ExamCuboid x={80} y={110} w={60} h={60} d={36} fill="#fbcfe8" stroke="#9d174d" />
    <T x={120} y={132} t="? csúcs" size={11} />
  </QFig>
);
const FIG_CUBE_E = (
  <QFig h={140}>
    <ExamCuboid x={80} y={110} w={60} h={60} d={36} fill="#fef3c7" stroke="#92400e" />
    <T x={120} y={132} t="Hány pálcika? ?" size={11} />
  </QFig>
);
const FIG_SOLIDS_ROW = (
  <QFig h={130}>
    <ExamCylinder cx={36} by={88} r={18} h={44} />
    <ExamSphere cx={92} cy={62} r={22} />
    <ExamCuboid x={128} y={86} w={34} h={34} d={20} />
    <T x={36} y={110} t="henger" size={10} />
    <T x={92} y={110} t="gömb" size={10} />
    <T x={150} y={110} t="kocka" size={10} />
    <T x={210} y={110} t="gúla" size={10} />
    <ExamPyramid x={190} y={88} w={34} h={56} />
  </QFig>
);
const FIG_RECT_PLAIN = (
  <QFig h={130}>
    <rect x={50} y={30} width={140} height={60} fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2.5" />
    <T x={120} y={118} t="szimmetriatengelyek: ?" size={11} />
  </QFig>
);
const FIG_CIRCLE_O = (
  <QFig h={130}>
    <circle cx={120} cy={60} r={44} fill="#ffe4e6" stroke="#be123c" strokeWidth="2.5" />
    <circle cx={120} cy={60} r="3.5" fill="#0f172a" />
    <T x={128} y={56} t="O" size={11} anchor="start" />
    <T x={120} y={122} t="szimmetriatengelyek: ?" size={11} />
  </QFig>
);
const FIG_HEX_ALL = (
  <QFig h={150}>
    <Poly pts={[[90, 20], [150, 20], [180, 72], [150, 124], [90, 124], [60, 72]]} fill="#fde68a" stroke="#a16207" />
    <T x={120} y={142} t="összes átló: ?" size={11} />
  </QFig>
);
const FIG_TRIANGLE_EQ = (
  <QFig h={140}>
    <Poly pts={[[120, 18], [175, 113], [65, 113]]} fill="#fed7aa" stroke="#c2410c" />
    <T x={120} y={133} t="szimmetriatengelyek: ?" size={11} />
  </QFig>
);
const FIG_L4 = (
  <QFig h={130}>
    <Grid x0={30} y0={15} cols={9} rows={5} u={20} />
    {[[1, 1], [1, 2], [1, 3], [2, 3]].map(([c, r]) => (
      <rect key={`${c}${r}`} x={30 + c * 20} y={15 + r * 20} width={20} height={20} fill="#fcd34d" stroke="#a16207" />
    ))}
    <T x={175} y={60} t="kétszeresére:" size={11} />
    <T x={175} y={80} t="? kis négyzet" size={11} />
  </QFig>
);
const FIG_RECT_8x4 = (
  <QFig h={130}>
    <rect x={30} y={30} width={120} height={60} fill="#fde68a" stroke="#a16207" strokeWidth="2.5" />
    <T x={90} y={24} t="8 cm" size={11} color="#a16207" />
    <T x={158} y={65} t="4 cm" size={11} color="#a16207" anchor="start" />
    <T x={120} y={115} t="felére kicsinyítve: K = ?" size={11} />
  </QFig>
);

const LEVEL1: QuizQuestion[] = [
  { id: 'se-q1', level: 1, questionTypeBadge: 'Síkidomok', figure: FIG_SHAPES_ROW, question: 'Melyik NEM sokszög?', options: ['a kör', 'a háromszög', 'a négyzet', 'az ötszög'], correctAnswer: 0, explanation: 'A sokszöget csak egyenes szakaszok határolják. A kört görbe vonal határolja: síkidom, de nem sokszög.' },
  { id: 'se-q2', level: 1, questionTypeBadge: 'Sokszögek', figure: FIG_PENTAGON, question: 'Hány csúcsa van ennek a sokszögnek?', options: ['5', '4', '6', '10'], correctAnswer: 0, explanation: 'Számold meg a sarkokat: 5 csúcsa (és 5 oldala) van. Ez ötszög.' },
  { id: 'se-q3', level: 1, questionTypeBadge: 'Téglalap', question: 'Melyik a téglalap meghatározása?', options: ['Olyan négyszög, amelynek minden szöge derékszög.', 'Olyan négyszög, amelynek minden oldala egyenlő.', 'Olyan sokszög, amelynek 3 oldala van.', 'Olyan síkidom, amelynek nincs csúcsa.'], correctAnswer: 0, explanation: 'A téglalap olyan négyszög, amelynek minden szöge derékszög. (Az egyenlő oldalak még nem elegek!)' },
  { id: 'se-q4', level: 1, questionTypeBadge: 'Szögek', figure: FIG_ACUTE, question: 'Milyen ez a szög?', options: ['derékszögnél kisebb', 'derékszög', 'derékszögnél nagyobb', 'egyenes vonal'], correctAnswer: 0, explanation: 'A két szár között kisebb a nyílás, mint a derékszögű vonalzó sarkánál: derékszögnél kisebb.' },
  { id: 'se-q5', level: 1, questionTypeBadge: 'Párhuzamos', question: 'Mit tudunk a párhuzamos egyenesekről?', options: ['Sosem találkoznak.', 'Egy pontban metszik egymást.', 'Mindig derékszöget zárnak be.', 'Mindig függőlegesek.'], correctAnswer: 0, explanation: 'A párhuzamos egyenesek akármeddig húzzuk őket, sosem találkoznak – mint a létra két szára vagy a sín.' },
  { id: 'se-q6', level: 1, questionTypeBadge: 'Kör', question: 'Melyik eszközzel rajzolunk kört?', options: ['körzővel', 'vonalzóval', 'derékszögű vonalzóval', 'radírral'], correctAnswer: 0, explanation: 'A körzőt a középpontba szúrjuk, és körbeforgatjuk.' },
  { id: 'se-q7', level: 1, questionTypeBadge: 'Kör', question: 'A kör minden pontja ugyanolyan messze van a kör…', options: ['középpontjától.', 'csúcsától.', 'oldalától.', 'átlójától.'], correctAnswer: 0, explanation: 'Ez teszi a kört körré: minden pontja ugyanolyan messze van a középponttól (O).' },
  { id: 'se-q8', level: 1, questionTypeBadge: 'Kör', question: 'Melyik tárgy kör alakú?', options: ['a pénzérme', 'a könyv', 'az ajtó', 'a tejesdoboz'], correctAnswer: 0, explanation: 'A pénzérme széle kör. A könyv és az ajtó téglalap alakú, a tejesdoboz téglatest.' },
  { id: 'se-q9', level: 1, questionTypeBadge: 'Testek', figure: FIG_CUBE, question: 'Hány lapja van a kockának?', options: ['6', '4', '8', '12'], correctAnswer: 0, explanation: 'Elöl, hátul, fent, lent, jobbra, balra: 6 egyforma négyzetlap. (8 a csúcsok, 12 az élek száma.)' },
  { id: 'se-q10', level: 1, questionTypeBadge: 'Testek', figure: FIG_SPHERE, question: 'Melyik test ez?', options: ['gömb', 'kör', 'henger', 'kúp'], correctAnswer: 0, explanation: 'A gömböt görbe felület határolja, mint a labdát. A kör síkidom, nem test.' },
  { id: 'se-q11', level: 1, questionTypeBadge: 'Testek', question: 'Melyik test minden lapja egyforma négyzet?', options: ['a kocka', 'a téglatest', 'a gúla', 'a henger'], correctAnswer: 0, explanation: 'A kocka 6 lapja egyforma négyzet. A téglatest lapjai téglalapok.' },
  { id: 'se-q12', level: 1, questionTypeBadge: 'Testek', question: 'Melyik testet határolja csak görbe felület?', options: ['a gömböt', 'a kockát', 'a téglatestet', 'a gúlát'], correctAnswer: 0, explanation: 'A gömbnek nincs síklapja. A kockát, a téglatestet és a gúlát síklapok határolják.' },
  { id: 'se-q13', level: 1, questionTypeBadge: 'Test vagy síkidom?', figure: FIG_SOLID_PICK, question: 'Melyik test, és nem síkidom?', options: ['a téglatest', 'a négyzet', 'a kör', 'a ferde négyszög'], correctAnswer: 0, explanation: 'A téglatest térbeli: van mélysége, a takart élei szaggatottak. A többi a papír síkjában fekszik: síkidom.' },
  { id: 'se-q14', level: 1, questionTypeBadge: 'Tükrözés', figure: FIG_MIRROR_FLAG, question: 'Melyik a kék zászló tükörképe a piros vonalra?', options: ['A', 'B', 'C', 'D'], correctAnswer: 0, explanation: 'Az A ugyanolyan messze van a tükörtől, és fordított: a zászló a rúd másik oldalára került. A B eltolás, a C elforgatás, a D fejjel lefelé áll.' },
  { id: 'se-q15', level: 1, questionTypeBadge: 'Szimmetria', figure: FIG_SQUARE_Q, question: 'Hány szimmetriatengelye van a négyzetnek?', options: ['4', '2', '1', '0'], correctAnswer: 0, explanation: 'Függőleges, vízszintes és a két átló mentén is összehajtható: 4 szimmetriatengelye van.' },
  { id: 'se-q16', level: 1, questionTypeBadge: 'Tükrözés', question: 'Milyen a tükörkép az eredetihez képest?', options: ['Ugyanakkora, de fordított.', 'Nagyobb.', 'Kisebb.', 'Ugyanúgy áll, csak arrébb van.'], correctAnswer: 0, explanation: 'A tükörkép ugyanakkora és ugyanolyan alakú, de fordított: ami jobbra mutatott, az balra mutat.' },
  { id: 'se-q17', level: 1, questionTypeBadge: 'Szimmetria', question: 'Melyik nagybetűnek van függőleges szimmetriatengelye?', options: ['A', 'F', 'G', 'R'], correctAnswer: 0, explanation: 'Az A betűt középen függőlegesen összehajtva a két fele fedi egymást. Az F, G, R nem ilyen.' },
  { id: 'se-q18', level: 1, questionTypeBadge: 'Nagyítás', figure: FIG_SEG, question: 'Egy 3 egység hosszú szakaszt kétszeresére nagyítunk. Milyen hosszú lesz?', options: ['6 egység', '5 egység', '3 egység', '9 egység'], correctAnswer: 0, explanation: '3 · 2 = 6 egység. Az 5 akkor jönne ki, ha 2-t adnál hozzá – az nem nagyítás.' },
  { id: 'se-q19', level: 1, questionTypeBadge: 'Kicsinyítés', question: 'A térkép a valóság … mása.', options: ['kicsinyített', 'nagyított', 'tükrözött', 'elforgatott'], correctAnswer: 0, explanation: 'A térképen egy egész ország elfér: a valóság kicsinyített mása.' },
  { id: 'se-q20', level: 1, questionTypeBadge: 'Hasonlóság', question: 'Mit jelent, hogy két alakzat hasonló?', options: ['Ugyanolyan alakúak, de nem feltétlenül ugyanakkorák.', 'Ugyanakkorák, de más alakúak.', 'Ugyanolyan színűek.', 'Ugyanannyi csúcsuk van, bármilyen alakúak.'], correctAnswer: 0, explanation: 'Az eredeti és a nagyított rajz ugyanolyan alakú, de nem ugyanakkora: hasonlók.' },
  { id: 'se-q21', level: 1, questionTypeBadge: 'Eltolás', question: 'Mit kell megmondani egy eltoláshoz?', options: ['Az irányt és a távolságot.', 'Csak a távolságot.', 'Csak az irányt.', 'A tükörtengelyt.'], correctAnswer: 0, explanation: 'Mekkora távolságra? Milyen irányban? Mindkettő kell, különben nem tudjuk, hová kerül.' },
  { id: 'se-q22', level: 1, questionTypeBadge: 'Világtájak', question: 'Melyik NEM fővilágtáj?', options: ['délnyugat', 'észak', 'kelet', 'dél'], correctAnswer: 0, explanation: 'Fővilágtájak: észak, kelet, dél, nyugat. A délnyugat mellékvilágtáj.' },
  { id: 'se-q23', level: 1, questionTypeBadge: 'Eltolás', figure: FIG_SHIFT_4, question: 'A világos zászlót eltoltuk. Hány négyzettel keletre?', options: ['4', '3', '5', '6'], correctAnswer: 0, explanation: 'Kövesd a zászló rúdját: 4 négyzetet lépett jobbra (keletre).' },
  { id: 'se-q24', level: 1, questionTypeBadge: 'Elforgatás', question: 'Hány negyed fordulat egy fél fordulat?', options: ['2', '4', '1', '3'], correctAnswer: 0, explanation: 'Két negyed együtt egy fél fordulat.' },
  { id: 'se-q25', level: 1, questionTypeBadge: 'Elforgatás', figure: FIG_CLOCK_3, question: 'A nagymutató a 12-esről a 3-asra fordult. Mekkora fordulatot tett?', options: ['negyed fordulatot', 'fél fordulatot', 'háromnegyed fordulatot', 'egész fordulatot'], correctAnswer: 0, explanation: '12-től 3-ig az óralap negyede: negyed fordulat, 15 perc.' },
  { id: 'se-q26', level: 1, questionTypeBadge: 'Elforgatás', figure: FIG_ARROW_UP, question: 'A felfelé mutató nyilat negyed fordulattal jobbra forgatjuk. Merre mutat?', options: ['jobbra', 'balra', 'lefelé', 'felfelé'], correctAnswer: 0, explanation: 'Jobbra forgatás = az óramutató irányába: a 12-es felől a 3-as felé, vagyis jobbra.' },
  { id: 'se-q27', level: 1, questionTypeBadge: 'Térkép', figure: FIG_MAP, question: 'Mi található a C3 mezőben?', options: ['a posta', 'az iskola', 'a park', 'a mozi'], correctAnswer: 0, explanation: 'A C oszlop és a 3. sor találkozásánál a posta van.' },
  { id: 'se-q28', level: 1, questionTypeBadge: 'Mezőkód', question: 'A térképen mit jelent a G1 kód?', options: ['A G jelű oszlop 1-es mezőjét.', 'Az 1. oszlop G jelű sorát.', 'A G oszlop minden mezőjét.', 'A G betűtől 1 lépést.'], correctAnswer: 0, explanation: 'Előbb az oszlop betűje, aztán a sor száma: G oszlop, 1-es mező.' },
  { id: 'se-q29', level: 1, questionTypeBadge: 'Sakktábla', figure: FIG_CHESS, question: 'Melyik mezőn áll a sötét király?', options: ['e8', '8e', 'e1', 'd8'], correctAnswer: 0, explanation: 'A fekete király az e oszlopban, a 8. sorban áll: e8. (Az e1-en a világos király, a d8-on a sötét vezér áll.)' },
  { id: 'se-q30', level: 1, questionTypeBadge: 'Sakkbábuk', question: 'Melyik sakkbábunak van lófeje?', options: ['a huszárnak', 'a futónak', 'a bástyának', 'a királynak'], correctAnswer: 0, explanation: 'A huszár bábu lófejet formáz. A bástya várfal, a futó csúcsos süveg, a király koronás.' }
];

const LEVEL2: QuizQuestion[] = [
  { id: 'se-q31', level: 2, questionTypeBadge: 'Átló', figure: FIG_HEXAGON, question: 'Hány átló húzható a hatszög egy csúcsából?', options: ['3', '6', '4', '9'], correctAnswer: 0, explanation: 'A saját csúcsába és a két szomszédos csúcsba nem húzunk átlót: 6 − 3 = 3 átló.' },
  { id: 'se-q32', level: 2, questionTypeBadge: 'Négyzet', question: 'Melyik a négyzet meghatározása?', options: ['Olyan téglalap, amelynek minden oldala egyenlő hosszú.', 'Bármelyik négyszög, amelynek minden oldala egyenlő hosszú.', 'Olyan téglalap, amelynek két oldala egyenlő.', 'Olyan négyszög, amelynek nincs derékszöge.'], correctAnswer: 0, explanation: 'A négyzet olyan téglalap (minden szöge derékszög), amelynek minden oldala egyenlő. A ferde, egyenlő oldalú négyszög nem négyzet!' },
  { id: 'se-q33', level: 2, questionTypeBadge: 'Szögek', figure: FIG_OBTUSE, question: 'Milyen ez a szög?', options: ['derékszögnél nagyobb', 'derékszögnél kisebb', 'derékszög', 'nem lehet eldönteni'], correctAnswer: 0, explanation: 'A szárak jobban szétnyílnak, mint a derékszögű vonalzó sarka: derékszögnél nagyobb.' },
  { id: 'se-q34', level: 2, questionTypeBadge: 'Sokszögek', figure: FIG_L_HEX, question: 'Hány oldala van ennek a beugró részes sokszögnek?', options: ['6', '4', '5', '8'], correctAnswer: 0, explanation: 'Járd körbe és számold: 6 oldala és 6 csúcsa van. Ez hatszög (van beugró része).' },
  { id: 'se-q35', level: 2, questionTypeBadge: 'Átló', figure: FIG_POLY_ROW, question: 'Melyik sokszögnek nincs átlója?', options: ['a háromszögnek', 'a négyszögnek', 'az ötszögnek', 'a hatszögnek'], correctAnswer: 0, explanation: 'A háromszögben minden csúcs szomszédos a másik kettővel, így nincs két nem szomszédos csúcs.' },
  { id: 'se-q36', level: 2, questionTypeBadge: 'Körzőnyílás', question: 'A kört 3 cm-es körzőnyílással rajzoltuk. Milyen széles a kör a középpontján át?', options: ['6 cm', '3 cm', '9 cm', '12 cm'], correctAnswer: 0, explanation: 'A középponttól jobbra is, balra is 3 cm-re van a körvonal: 3 + 3 = 6 cm.' },
  { id: 'se-q37', level: 2, questionTypeBadge: 'Kör', question: 'Hogy hívjuk a körvonalat a belsejével együtt?', options: ['körlap', 'körvonal', 'középpont', 'körzőnyílás'], correctAnswer: 0, explanation: 'A körvonal csak a kör széle. A körvonal a belsejével együtt a körlap.' },
  { id: 'se-q38', level: 2, questionTypeBadge: 'Körzőnyílás', question: 'Melyik körzőnyílással rajzolsz nagyobb kört: 1 cm vagy 13 mm?', options: ['13 mm', '1 cm', 'egyformák', 'nem lehet eldönteni'], correctAnswer: 0, explanation: '1 cm = 10 mm, és 13 mm > 10 mm. A nagyobb körzőnyílás nagyobb kört ad.' },
  { id: 'se-q39', level: 2, questionTypeBadge: 'Élek', figure: FIG_CUBOID, question: 'Hány éle van a téglatestnek?', options: ['12', '9', '8', '6'], correctAnswer: 0, explanation: 'A rajzon 9 él látszik, de 3 takart (szaggatott) él is van: összesen 12 él.' },
  { id: 'se-q40', level: 2, questionTypeBadge: 'Csúcsok', figure: FIG_CUBE_V, question: 'Hány csúcsa van a kockának?', options: ['8', '6', '12', '4'], correctAnswer: 0, explanation: 'Fent 4 és lent 4 csúcs: 8. (6 a lapok, 12 az élek száma.)' },
  { id: 'se-q41', level: 2, questionTypeBadge: 'Alaprajz', figure: FIG_PLAN_7, question: 'Az alaprajz mezőiben a tornyok magassága áll. Hány kis kockából áll az építmény?', options: ['7', '4', '8', '6'], correctAnswer: 0, explanation: 'Adjuk össze a számokat: 2 + 1 + 3 + 1 = 7 kis kocka. (A 4 csak a mezők száma.)' },
  { id: 'se-q42', level: 2, questionTypeBadge: 'Testek', figure: FIG_SOLIDS_ROW, question: 'Melyik testet határolja síklap és görbe felület is?', options: ['a hengert', 'a gömböt', 'a kockát', 'a gúlát'], correctAnswer: 0, explanation: 'A henger alja és teteje sík kör, a palástja görbe felület.' },
  { id: 'se-q43', level: 2, questionTypeBadge: 'Háló', question: 'Hány téglalapból áll a téglatest hálója?', options: ['6', '4', '8', '12'], correctAnswer: 0, explanation: 'A téglatestnek 6 lapja van, ezért a hálója 6 téglalap (kettő-kettő egyforma).' },
  { id: 'se-q44', level: 2, questionTypeBadge: 'Tükrözés', figure: FIG_MIRROR_POINT, question: 'A P pont 2 négyzetre van a tükörtengelytől balra. Melyik pont a tükörképe?', options: ['A', 'B', 'C', 'D'], correctAnswer: 0, explanation: 'A tükörkép ugyanabban a sorban, ugyanolyan messze (2 négyzet) van a tengelytől, csak jobbra: ez az A.' },
  { id: 'se-q45', level: 2, questionTypeBadge: 'Szimmetria', figure: FIG_RECT_PLAIN, question: 'Hány szimmetriatengelye van a nem négyzet alakú téglalapnak?', options: ['2', '4', '1', '0'], correctAnswer: 0, explanation: 'Egy függőleges és egy vízszintes. Az átlói mentén összehajtva a két fele NEM fedi egymást.' },
  { id: 'se-q46', level: 2, questionTypeBadge: 'Szimmetria', figure: FIG_CIRCLE_O, question: 'Hány szimmetriatengelye van a körnek?', options: ['végtelen sok', '1', '2', '4'], correctAnswer: 0, explanation: 'A kört bármelyik, a középponton átmenő vonal mentén összehajthatjuk: végtelen sok tengelye van.' },
  { id: 'se-q47', level: 2, questionTypeBadge: 'Tükrözés', question: 'Mi a tükörtengely?', options: ['Az a vonal, ahol a tükör áll, és amelyre tükrözünk.', 'A síkidom leghosszabb oldala.', 'A téglalap átlója.', 'A kör középpontja.'], correctAnswer: 0, explanation: 'A tankönyvben a piros vonal jelzi a tükör helyét: ez a tükörtengely.' },
  { id: 'se-q48', level: 2, questionTypeBadge: 'Nagyítás', figure: FIG_RECT_3x2, question: 'A téglalap 3 négyzet széles és 2 magas. Milyen lesz kétszeresére nagyítva?', options: ['6 széles, 4 magas', '5 széles, 4 magas', '6 széles, 2 magas', '9 széles, 6 magas'], correctAnswer: 0, explanation: 'Minden méretet 2-vel szorzunk: 3 · 2 = 6, 2 · 2 = 4.' },
  { id: 'se-q49', level: 2, questionTypeBadge: 'Lépéssor', question: 'Felezd a lépéssor számait: 4f, 2j, 4l, 2b. Mit kapsz?', options: ['2f, 1j, 2l, 1b', '2f, 2j, 2l, 2b', '8f, 4j, 8l, 4b', '2f, 0j, 2l, 0b'], correctAnswer: 0, explanation: 'Minden számot 2-vel osztunk, a betűk (irányok) maradnak: 2f, 1j, 2l, 1b. Ez a felére kicsinyített téglalap.' },
  { id: 'se-q50', level: 2, questionTypeBadge: 'Hasonlóság', question: 'Melyik téglalappár hasonló? (széles · magas)', options: ['2 · 1 és 6 · 3', '2 · 1 és 4 · 3', '3 · 2 és 5 · 4', '4 · 4 és 4 · 2'], correctAnswer: 0, explanation: '2 · 3 = 6 és 1 · 3 = 3: mindkét méret háromszoros. A többinél nem ugyanannyiszorosára változtak a méretek.' },
  { id: 'se-q51', level: 2, questionTypeBadge: 'Eltolás', question: 'A buszmegállók 5 cm-re vannak egymástól. Milyen messze van a 4. megálló az 1.-től?', options: ['15 cm', '20 cm', '10 cm', '5 cm'], correctAnswer: 0, explanation: 'Az 1.-től a 4.-ig 3 szakasz van: 3 · 5 = 15 cm.' },
  { id: 'se-q52', level: 2, questionTypeBadge: 'Eltolás', figure: FIG_POINT_3K2D, question: 'A P pontot 3 négyzettel keletre és 2 négyzettel délre toljuk. Melyik pontba kerül?', options: ['A', 'B', 'C', 'D'], correctAnswer: 0, explanation: '3 jobbra, 2 lefelé: ez az A. A B-nél felfelé ment, a C-nél felcserélték a számokat, a D-nél nyugatra ment.' },
  { id: 'se-q53', level: 2, questionTypeBadge: 'Eltolás', question: 'Egy 2 cm oldalú négyzetet 6 cm-rel eltolunk. Milyen hosszú az eltolt négyzet oldala?', options: ['2 cm', '8 cm', '6 cm', '12 cm'], correctAnswer: 0, explanation: 'Eltoláskor a méret nem változik: az oldal 2 cm marad.' },
  { id: 'se-q54', level: 2, questionTypeBadge: 'Elforgatás', question: 'A háromnegyed fordulat jobbra ugyanoda visz, mint…', options: ['a negyed fordulat balra.', 'a negyed fordulat jobbra.', 'a fél fordulat.', 'az egész fordulat.'], correctAnswer: 0, explanation: 'Jobbra 3 negyed után 1 negyed hiányzik a teljes körhöz – ugyanoda jutunk, mint 1 negyeddel balra.' },
  { id: 'se-q55', level: 2, questionTypeBadge: 'Elforgatás', figure: FIG_ROT_OPTIONS, question: 'Melyik a kék zászló negyed fordulattal JOBBRA elforgatott képe a piros pont körül?', options: ['B', 'A', 'C', 'D'], correctAnswer: 0, explanation: 'Jobbra forgatva a felfelé álló rúd jobbra fordul, a zászló lefelé kerül: B. Az A fél fordulat, a C tükörkép, a D balra forgatás.' },
  { id: 'se-q56', level: 2, questionTypeBadge: 'Óra', figure: FIG_CLOCK_45, question: 'Mekkora fordulatot tesz a nagymutató 45 perc alatt?', options: ['háromnegyed fordulatot', 'fél fordulatot', 'negyed fordulatot', 'egész fordulatot'], correctAnswer: 0, explanation: '15 perc = negyed fordulat, 45 perc = 3 negyed: háromnegyed fordulat.' },
  { id: 'se-q57', level: 2, questionTypeBadge: 'Térkép', figure: FIG_MAP_F5, question: 'Mi a könyvtár kódja (sárgával kiemelve)?', options: ['F5', '5F', 'E5', 'F4'], correctAnswer: 0, explanation: 'Az F oszlopban és az 5. sorban van: F5. Az 5F fordított sorrend.' },
  { id: 'se-q58', level: 2, questionTypeBadge: 'Sakktábla', figure: FIG_CHESS, question: 'Melyik mezőn áll a sötét huszár?', options: ['c6', '6c', 'c3', 'f6'], correctAnswer: 0, explanation: 'A fekete lófejes bábu a c oszlopban és a 6. sorban áll: c6.' },
  { id: 'se-q59', level: 2, questionTypeBadge: 'Térkép', figure: FIG_MAP, question: 'A kúttól (A1) 2 mezőt lépsz keletre, majd 1 mezőt délre. Melyik mezőbe érsz?', options: ['C2', 'B3', 'C1', 'D2'], correctAnswer: 0, explanation: 'Keletre: A → B → C (C1). Délre, a térképen lefelé: C2. Itt az 1. sor van felül.' },
  { id: 'se-q60', level: 2, questionTypeBadge: 'Séta a rácson', question: 'Ezt a lépéssort követed: 2K, 3É, 1NY. Hová érsz a kiindulóponthoz képest?', options: ['1 lépésre keletre és 3 lépésre északra', '3 lépésre keletre és 3 lépésre északra', '1 lépésre nyugatra és 3 lépésre északra', '1 lépésre keletre és 3 lépésre délre'], correctAnswer: 0, explanation: 'Kelet–nyugat: 2 jobbra, 1 balra → 1 keletre. Közben 3-at mentél fel: 3 északra.' }
];

const LEVEL3: QuizQuestion[] = [
  { id: 'se-q61', level: 3, questionTypeBadge: 'Átló', figure: FIG_HEX_ALL, question: 'Hány átló húzható összesen a hatszögben?', options: ['9', '3', '6', '18'], correctAnswer: 0, explanation: 'Mind a 6 csúcsból 3 átló indul: 6 · 3 = 18, de így minden átlót kétszer számoltunk (mindkét végéről). 18 : 2 = 9.' },
  { id: 'se-q62', level: 3, questionTypeBadge: 'Halmazábra', figure: FIG_VENN, question: 'A halmazábra melyik részébe kerül a téglalap?', options: ['a 2-es részbe (mindkét körbe)', 'az 1-es részbe', 'a 3-as részbe', 'a 4-es részbe (egyik körbe sem)'], correctAnswer: 0, explanation: 'A téglalap négyszög, és vannak párhuzamos oldalai, tehát mindkét körbe tartozik: a közös részbe (2).' },
  { id: 'se-q63', level: 3, questionTypeBadge: 'Halmazábra', figure: FIG_VENN, question: 'A halmazábra melyik részébe kerül a háromszög?', options: ['a 4-es részbe (egyik körbe sem)', 'az 1-es részbe', 'a 2-es részbe', 'a 3-as részbe'], correctAnswer: 0, explanation: 'A háromszög sokszög, de nem négyszög, és nincsenek párhuzamos oldalai. Ezért egyik körbe sem kerül, csak a nagy téglalapba (4).' },
  { id: 'se-q64', level: 3, questionTypeBadge: 'Igaz vagy hamis?', question: 'Melyik állítás igaz?', options: ['Minden négyzet téglalap.', 'Minden téglalap négyzet.', 'Minden síkidom sokszög.', 'A körnek 1 csúcsa van.'], correctAnswer: 0, explanation: 'A négyzetnek minden szöge derékszög, ezért téglalap. Fordítva nem igaz: a téglalap oldalai nem mind egyenlők.' },
  { id: 'se-q65', level: 3, questionTypeBadge: 'Derékszög az órán', question: 'Melyik egész órakor zár be derékszöget a kismutató és a nagymutató?', options: ['3 órakor', '2 órakor', '4 órakor', '6 órakor'], correctAnswer: 0, explanation: '3 órakor a nagymutató a 12-esen, a kismutató a 3-ason áll: negyed kör, derékszög. 6 órakor egyenes vonalat alkotnak.' },
  { id: 'se-q66', level: 3, questionTypeBadge: 'Körzőnyílás', question: 'Ugyanabból a középpontból két kört rajzolunk: 2 cm-es és 3 cm-es körzőnyílással. Milyen messze van egymástól a két körvonal?', options: ['1 cm', '5 cm', '2 cm', '6 cm'], correctAnswer: 0, explanation: 'A középponttól az egyik körvonal 2 cm-re, a másik 3 cm-re van: 3 − 2 = 1 cm a távolságuk.' },
  { id: 'se-q67', level: 3, questionTypeBadge: 'Körzőnyílás', question: 'A kör a középpontján át 10 cm széles. Mekkora körzőnyílással rajzolták?', options: ['5 cm', '10 cm', '20 cm', '2 cm'], correctAnswer: 0, explanation: 'A szélesség a körzőnyílás kétszerese, ezért a körzőnyílás a fele: 10 : 2 = 5 cm.' },
  { id: 'se-q68', level: 3, questionTypeBadge: 'Körök sorban', question: '4 egyforma kört rajzolunk egy sorba, egymás mellé úgy, hogy éppen érintsék egymást. Mindegyiket 2 cm-es körzőnyílással rajzoltuk. Milyen hosszú a sor?', options: ['16 cm', '8 cm', '12 cm', '20 cm'], correctAnswer: 0, explanation: 'Egy kör szélessége 2 + 2 = 4 cm. 4 kör: 4 · 4 = 16 cm.' },
  { id: 'se-q69', level: 3, questionTypeBadge: 'Téglatest kockákból', figure: FIG_CUBES_12, question: 'A téglatest egy rétegében 2 sorban 3-3 kis kocka van, és 2 réteg van. Hány kis kockából áll?', options: ['12', '7', '10', '6'], correctAnswer: 0, explanation: 'Egy réteg: 3 · 2 = 6 kocka. Két réteg: 6 · 2 = 12. A hátsó, takart kockákat is számolni kell!' },
  { id: 'se-q70', level: 3, questionTypeBadge: 'Élváz', figure: FIG_CUBE_E, question: 'A kocka élvázát számolópálcikákból rakjuk ki, minden élhez egy pálcika kell. Hány pálcika kell?', options: ['12', '8', '6', '24'], correctAnswer: 0, explanation: 'A kockának 12 éle van, ezért 12 pálcika kell. (A 8 csúcsnál a pálcikák találkoznak.)' },
  { id: 'se-q71', level: 3, questionTypeBadge: 'Alaprajz', figure: FIG_PLAN_10, question: 'Az alaprajz számai a tornyok magasságai. Hány kis kockából áll az építmény?', options: ['10', '6', '12', '9'], correctAnswer: 0, explanation: '3 + 2 + 1 + 2 + 1 + 1 = 10 kis kocka. A 6 a mezők száma.' },
  { id: 'se-q72', level: 3, questionTypeBadge: 'Háló', question: 'A kocka hálóján a szemben lévő lapokat ugyanolyan színűre színezzük, a többit különbözőre. Hány szín kell?', options: ['3', '6', '2', '4'], correctAnswer: 0, explanation: 'A 6 lap 3 szemközti párt alkot (elöl–hátul, fent–lent, jobbra–balra): 3 szín kell.' },
  { id: 'se-q73', level: 3, questionTypeBadge: 'Nézetek', question: 'Melyik nézetből készül az építmény alaprajza?', options: ['felülnézetből', 'elölnézetből', 'oldalnézetből', 'bármelyikből'], correctAnswer: 0, explanation: 'Az alaprajz azt mutatja, amit felülről látunk; a mezőkbe a tornyok magasságát írjuk.' },
  { id: 'se-q74', level: 3, questionTypeBadge: 'Tükrözés', figure: FIG_MIRROR_H, question: 'A tükörtengely most vízszintes. Melyik pont a P tükörképe?', options: ['A', 'B', 'C', 'D'], correctAnswer: 0, explanation: 'P 3 négyzettel a tengely fölött van. A tükörképe ugyanabban az oszlopban, 3 négyzettel a tengely alatt van: A.' },
  { id: 'se-q75', level: 3, questionTypeBadge: 'Szimmetria', question: 'Melyik síkidomnak nincs szimmetriatengelye?', options: ['a ferde négyszögnek', 'a négyzetnek', 'a körnek', 'az egyenlő oldalú háromszögnek'], correctAnswer: 0, explanation: 'A ferde négyszöget (paralelogrammát) sehogy sem lehet úgy összehajtani, hogy a két fele fedje egymást.' },
  { id: 'se-q76', level: 3, questionTypeBadge: 'Szimmetria', figure: FIG_TRIANGLE_EQ, question: 'Hány szimmetriatengelye van az egyenlő oldalú háromszögnek?', options: ['3', '1', '0', '6'], correctAnswer: 0, explanation: 'Mindhárom csúcsából a szemközti oldal közepéig húzott vonal tengely: 3 szimmetriatengelye van.' },
  { id: 'se-q77', level: 3, questionTypeBadge: 'Csapda', question: 'Gergő szerint a téglalap átlója szimmetriatengely. Igaza van?', options: ['Nem, mert az átló mentén összehajtva a két fele nem fedi egymást.', 'Igen, mert két egyforma háromszögre vágja.', 'Igen, minden átló szimmetriatengely.', 'Csak akkor, ha a téglalap nagy.'], correctAnswer: 0, explanation: 'Az átló két egyforma háromszögre vágja, de összehajtva a sarkok nem esnek egymásra. Csak a négyzetnél tengely az átló.' },
  { id: 'se-q78', level: 3, questionTypeBadge: 'Nagyítás', figure: FIG_L4, question: 'Egy 4 kis négyzetből álló L alakzatot kétszeresére nagyítunk. Hány kis négyzetből áll a nagyított kép?', options: ['16', '8', '4', '12'], correctAnswer: 0, explanation: 'Minden kis négyzetből 2 · 2 = 4 lesz: 4 · 4 = 16.' },
  { id: 'se-q79', level: 3, questionTypeBadge: 'Kerület', figure: FIG_RECT_8x4, question: 'Egy 8 cm hosszú, 4 cm széles téglalapot felére kicsinyítünk. Mekkora a kicsinyített téglalap kerülete?', options: ['12 cm', '24 cm', '6 cm', '8 cm'], correctAnswer: 0, explanation: 'A kicsinyített téglalap 4 cm és 2 cm: 4 + 2 + 4 + 2 = 12 cm. (24 cm az eredeti kerülete.)' },
  { id: 'se-q80', level: 3, questionTypeBadge: 'Szöveges feladat', question: 'Kata kétszeresére nagyította a házat, az ő rajza 8 négyzet magas. Ábel a felére kicsinyítette ugyanazt az eredeti házat. Milyen magas Ábel háza?', options: ['2 négyzet', '4 négyzet', '6 négyzet', '16 négyzet'], correctAnswer: 0, explanation: 'Az eredeti ház 8 : 2 = 4 négyzet magas. Ábel ezt felezte: 4 : 2 = 2.' },
  { id: 'se-q81', level: 3, questionTypeBadge: 'Több eltolás', question: 'A radírt egymás után eltoljuk: keletre 3 cm, északra 2 cm, nyugatra 5 cm. Hová került az indulási helyéhez képest?', options: ['2 cm-rel nyugatra és 2 cm-rel északra', '8 cm-rel nyugatra és 2 cm-rel északra', '2 cm-rel keletre és 2 cm-rel északra', '10 cm-rel északra'], correctAnswer: 0, explanation: 'Kelet–nyugat: 3 keletre, 5 nyugatra → 5 − 3 = 2 cm nyugatra. Észak felé 2 cm.' },
  { id: 'se-q82', level: 3, questionTypeBadge: 'Szöveges feladat', question: 'A széket 4 m-rel keletre kellett volna tolni, de 2 m-rel nyugatra tolták. Most merre és mennyivel kell tolni?', options: ['6 m-rel keletre', '2 m-rel keletre', '4 m-rel keletre', '6 m-rel nyugatra'], correctAnswer: 0, explanation: 'Előbb vissza kell tolni 2 m-t keletre (az eredeti helyére), aztán még 4 m-t: 2 + 4 = 6 m keletre.' },
  { id: 'se-q83', level: 3, questionTypeBadge: 'Mozgások', question: 'Melyik mozgásnál áll az alakzat pontosan ugyanúgy, mint előtte, csak más helyen?', options: ['eltolásnál', 'elforgatásnál', 'tükrözésnél', 'mindháromnál'], correctAnswer: 0, explanation: 'Eltoláskor nem fordul el és nem lesz fordított. Elforgatáskor elfordul, tükrözéskor fordított lesz.' },
  { id: 'se-q84', level: 3, questionTypeBadge: 'Több forgatás', question: 'Egy alakzatot 2 negyed fordulattal jobbra, majd 3 negyed fordulattal balra forgatunk. Összesen mennyit fordult?', options: ['negyed fordulatot balra', 'negyed fordulatot jobbra', 'fél fordulatot', 'egész fordulatot'], correctAnswer: 0, explanation: '2 negyed jobbra, 3 negyed balra: a balra forgatásból 1 negyed marad. Összesen negyed fordulat balra.' },
  { id: 'se-q85', level: 3, questionTypeBadge: 'Szöveges feladat', question: 'A körhinta percenként 2 egész fordulatot tesz. Hány negyed fordulatot tesz 5 perc alatt?', options: ['40', '10', '20', '8'], correctAnswer: 0, explanation: '5 perc alatt 5 · 2 = 10 egész fordulat. Egy egész = 4 negyed: 10 · 4 = 40.' },
  { id: 'se-q86', level: 3, questionTypeBadge: 'Elforgatás', figure: FIG_GRID_HALF, question: 'A türkiz négyzetet az O pont körül fél fordulattal elforgatjuk. Melyik helyre kerül?', options: ['A', 'B', 'C', 'D'], correctAnswer: 0, explanation: 'Fél fordulatnál a négyzet az O túloldalára kerül: ami jobbra fent volt, az balra lent lesz, ugyanolyan messze. Ez az A.' },
  { id: 'se-q87', level: 3, questionTypeBadge: 'Csapda', figure: FIG_CHESS_E4, question: 'A sakktáblán az 1. sor van alul. Melyik mező van közvetlenül az e4 mező ALATT?', options: ['e3', 'e5', 'f4', 'd4'], correctAnswer: 0, explanation: 'A sakktáblán felfelé nőnek a számok, lefelé csökkennek: e4 alatt az e3 van.' },
  { id: 'se-q88', level: 3, questionTypeBadge: 'Térkép', figure: FIG_MAP, question: 'A pékségtől (B5) 3 mezőt mész keletre, majd 1 mezőt északra. Melyik helyre érsz?', options: ['a parkba', 'a focipályára', 'a fagyizóba', 'a könyvtárba'], correctAnswer: 0, explanation: 'B5 → keletre 3: E5. Északra (a térképen felfelé) 1: E4, ez a park.' },
  { id: 'se-q89', level: 3, questionTypeBadge: 'Séta a rácson', question: 'Ezt a lépéssort követed: 1É, 2K, 1D, 2NY. Milyen alakzatot jártál körbe?', options: ['egy 2 · 1-es téglalapot', 'egy négyzetet', 'egy háromszöget', 'nem zárt az út, nem értem vissza'], correctAnswer: 0, explanation: '1 fel, 2 jobbra, 1 le, 2 balra: visszaértél. Az alakzat 2 széles és 1 magas: téglalap, de nem négyzet.' },
  { id: 'se-q90', level: 3, questionTypeBadge: 'Mezők', figure: FIG_MAP, question: 'A Kisváros térképén hány mező van a D oszlopban?', options: ['5', '6', '4', '30'], correctAnswer: 0, explanation: 'Egy oszlopban annyi mező van, ahány sor: 5 (D1, D2, D3, D4, D5). 6 oszlop van, összesen 30 mező.' }
];

const SHAPES_EXAM_QUESTIONS: QuizQuestion[] = [...LEVEL1, ...LEVEL2, ...LEVEL3];

export const ShapesExamQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId="g4-geom-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="9. Gyakorlás, tudáspróba – Kvíz"
      subtitle="Fejezetzáró kvíz: 90 feladat 3 szinten – síkidomok, kör, testek, tükrözés, nagyítás, eltolás, elforgatás, tájékozódás."
      badge="4. OSZTÁLY • V. SÍKIDOMOK ÉS TESTEK • KVÍZ"
      questions={SHAPES_EXAM_QUESTIONS}
      cheatSheets={[
        {
          title: 'Síkidomok, kör, testek',
          items: [
            'Sokszög: csak egyenes szakaszok; átló egy csúcsból: csúcsok száma − 3.',
            'Téglalap: minden szöge derékszög; négyzet: minden oldala is egyenlő.',
            'Kör: minden pontja ugyanolyan messze van a középponttól; körzővel rajzoljuk.',
            'Téglatest, kocka: 6 lap, 12 él, 8 csúcs; alaprajz = felülnézet.'
          ]
        },
        {
          title: 'Tükrözés, nagyítás',
          items: [
            'Tükörkép: ugyanakkora, de fordított; ugyanolyan messze a tengelytől.',
            'Szimmetriatengely: négyzet 4, téglalap 2, kör végtelen sok.',
            'Nagyítás: minden méret · 2 (vagy · 3); kicsinyítés: : 2.',
            'Hasonló: ugyanolyan alakú, de nem ugyanakkora.'
          ]
        },
        {
          title: 'Eltolás, elforgatás, tájékozódás',
          items: [
            'Eltolás: irány (É, K, D, NY, ÉK…) + távolság.',
            'Elforgatás: negyed fordulat = derékszög; jobbra = óramutató iránya.',
            'Mezőkód: oszlop betűje + sor száma (G1, e4).',
            'Sakktábla: a–h, 1–8, 64 mező; az 1. sor alul.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ShapesExamMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <ShapesExamSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default ShapesExamQuiz;
