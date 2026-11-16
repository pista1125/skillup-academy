import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MeasurementsExamMatcher } from './MeasurementsExamMatcher';
import { MeasurementsExamSorter } from './MeasurementsExamSorter';
import { ClockFace, TIMETABLE } from '../az-ido-merese/TimeMeasureFigures';
import { MOTORWAYS, ANIMALS, BALLOON, BOARD_TASKS, BoardField } from './MeasurementsExamFigures';

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

/** Vonalzó 0–10 cm, rajta egy szakasz (mm-ben) */
const RulerFig: React.FC<{ mm: number }> = ({ mm }) => {
  const x0 = 20;
  const pxmm = 2;
  return (
    <QFig h={100}>
      <line x1={x0} y1="30" x2={x0 + mm * pxmm} y2="30" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
      <rect x={x0 - 8} y="44" width="216" height="38" rx="4" fill="#fde68a" stroke="#a16207" />
      {Array.from({ length: 101 }, (_, i) => (
        <line key={i} x1={x0 + i * pxmm} y1="44" x2={x0 + i * pxmm} y2={i % 10 === 0 ? 60 : i % 5 === 0 ? 55 : 50} stroke="#713f12" strokeWidth={i % 10 === 0 ? 1.4 : 0.6} />
      ))}
      {Array.from({ length: 11 }, (_, i) => (
        <text key={i} x={x0 + i * 20} y="74" textAnchor="middle" fontSize="9" fill="#713f12">{i}</text>
      ))}
      <text x="220" y="94" textAnchor="end" fontSize="9" fill="#713f12">cm</text>
      <text x={x0 + mm} y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>? mm</text>
    </QFig>
  );
};

/** Téglalap (vagy négyzet) méretekkel */
const RectFig: React.FC<{ w: number; h: number; top: string; side: string; note?: string }> = ({ w, h, top, side, note }) => (
  <QFig h={140}>
    <rect x={120 - w / 2} y={70 - h / 2} width={w} height={h} fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2.5" />
    <text x="120" y={70 - h / 2 - 6} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">{top}</text>
    <text x={120 + w / 2 + 6} y="74" fontSize="12" fontWeight="bold" fill="#1e3a8a">{side}</text>
    {note && <text x="120" y="132" textAnchor="middle" fontSize="12" fontWeight="bold" fill={note.includes('?') ? UNK : '#0f172a'}>{note}</text>}
  </QFig>
);

/** Négyzetrács kiszínezett mezőkkel */
const GridFig: React.FC<{ cols: number; rows: number; cells?: [number, number][]; note: string; domino?: boolean; triangle?: boolean }> = ({
  cols,
  rows,
  cells,
  note,
  domino,
  triangle
}) => {
  const s = Math.min(22, Math.floor(150 / Math.max(cols, rows)));
  const ox = domino ? 30 : 120 - (cols * s) / 2;
  const oy = 14;
  const filled = cells ?? Array.from({ length: cols * rows }, (_, i) => [i % cols, Math.floor(i / cols)] as [number, number]);
  return (
    <QFig h={oy + rows * s + 34}>
      {Array.from({ length: cols * rows }, (_, i) => (
        <rect key={`g${i}`} x={ox + (i % cols) * s} y={oy + Math.floor(i / cols) * s} width={s} height={s} fill="#ffffff" stroke="#cbd5e1" />
      ))}
      {!triangle &&
        filled.map(([c, r]) => (
          <rect key={`f${c}-${r}`} x={ox + c * s} y={oy + r * s} width={s} height={s} fill="#86efac" stroke="#15803d" strokeWidth="1.2" />
        ))}
      {triangle && (
        <polygon
          points={`${ox},${oy + rows * s} ${ox + cols * s},${oy + rows * s} ${ox + (cols * s) / 2},${oy}`}
          fill="#fca5a5"
          stroke="#b91c1c"
          strokeWidth="2"
        />
      )}
      {triangle && <rect x={ox} y={oy} width={cols * s} height={rows * s} fill="none" stroke="#1d4ed8" strokeWidth="2" />}
      {domino && (
        <g>
          <text x="196" y={oy + 12} textAnchor="middle" fontSize="10" fill="#334155">egység:</text>
          <rect x={196 - s} y={oy + 20} width={s} height={s} fill="#fde68a" stroke="#a16207" />
          <rect x={196} y={oy + 20} width={s} height={s} fill="#fde68a" stroke="#a16207" />
          <text x="196" y={oy + 20 + s + 14} textAnchor="middle" fontSize="10" fill="#334155">dominó</text>
        </g>
      )}
      <text x="120" y={oy + rows * s + 22} textAnchor="middle" fontSize="12" fontWeight="bold" fill={note.includes('?') ? UNK : '#0f172a'}>{note}</text>
    </QFig>
  );
};

/** Kétkarú mérleg egyensúlyban */
const BalanceFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <QFig h={130}>
    <polygon points="120,40 106,112 134,112" fill="#64748b" />
    <rect x="92" y="110" width="56" height="9" rx="4" fill="#334155" />
    <line x1="40" y1="40" x2="200" y2="40" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
    <circle cx="120" cy="40" r="5" fill="#f59e0b" />
    {[40, 200].map((x) => (
      <g key={x}>
        <line x1={x} y1="40" x2={x - 22} y2="82" stroke="#475569" />
        <line x1={x} y1="40" x2={x + 22} y2="82" stroke="#475569" />
        <path d={`M ${x - 34} 82 Q ${x} 100 ${x + 34} 82 Z`} fill="#94a3b8" stroke="#334155" strokeWidth="1.5" />
      </g>
    ))}
    <rect x="12" y="56" width="56" height="24" rx="5" fill="#fde68a" stroke="#a16207" />
    <text x="40" y="73" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#713f12">{left}</text>
    <rect x="166" y="56" width="68" height="24" rx="5" fill="#dbeafe" stroke="#1e40af" />
    <text x="200" y="73" textAnchor="middle" fontSize="11" fontWeight="bold" fill={right.includes('?') ? UNK : '#1e3a8a'}>{right}</text>
    <text x="120" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">egyensúlyban van</text>
  </QFig>
);

/** Beosztásos mérőkancsó */
const JugFig: React.FC<{ ticks: number; fill: number; label: (i: number) => string; bottom: string }> = ({ ticks, fill, label, bottom }) => {
  const x = 90;
  const y = 18;
  const w = 64;
  const h = 96;
  const level = y + h - h * fill;
  return (
    <QFig h={146}>
      <rect x={x} y={level} width={w} height={y + h - level} fill="#38bdf8" opacity="0.75" />
      <path d={`M ${x} ${y} L ${x} ${y + h} L ${x + w} ${y + h} L ${x + w} ${y}`} fill="none" stroke="#334155" strokeWidth="2.5" />
      <path d={`M ${x + w} ${y + 15} q 24 0 24 30 q 0 30 -24 30`} fill="none" stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: ticks }, (_, i) => {
        const ty = y + h - (h * (i + 1)) / ticks;
        return (
          <g key={i}>
            <line x1={x} y1={ty} x2={x + 12} y2={ty} stroke="#0f172a" strokeWidth="1.5" />
            <text x={x - 4} y={ty + 3} textAnchor="end" fontSize="8" fill="#0f172a">{label(i + 1)}</text>
          </g>
        );
      })}
      <text x="120" y="136" textAnchor="middle" fontSize="13" fontWeight="bold" fill={bottom.includes('?') ? UNK : '#0f172a'}>{bottom}</text>
    </QFig>
  );
};

const ClockFig: React.FC<{ h: number; m: number; caption: string }> = ({ h, m, caption }) => (
  <QFig h={150}>
    <ClockFace cx={120} cy={66} r={52} hour={h} minute={m} />
    <text x="120" y="140" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>{caption}</text>
  </QFig>
);

const TimetableFig: React.FC = () => (
  <QFig h={160}>
    <rect x="50" y="10" width="140" height="140" rx="8" fill="#ffffff" stroke="#1e3a8a" strokeWidth="2" />
    <text x="120" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">Menetrend</text>
    {TIMETABLE.map((r, i) => (
      <g key={r.stop}>
        <text x="62" y={52 + i * 17} fontSize="11" fontWeight="bold" fill="#0f172a">{r.stop}</text>
        <text x="178" y={52 + i * 17} textAnchor="end" fontSize="11" fontWeight="bold" fill="#0f172a">{r.time}</text>
      </g>
    ))}
  </QFig>
);

const StationFig: React.FC<{ name: string; a: string; b: string }> = ({ name, a, b }) => (
  <QFig h={110}>
    <rect x="70" y="14" width="100" height="84" rx="10" fill="#ffffff" stroke="#ea580c" strokeWidth="2" />
    <text x="120" y="34" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ea580c">{name}</text>
    <rect x="88" y="42" width="64" height="22" rx="4" fill="#f5d0fe" />
    <text x="120" y="58" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">{a}</text>
    <rect x="88" y="68" width="64" height="22" rx="4" fill="#e9d5ff" />
    <text x="120" y="84" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">{b}</text>
    <text x="40" y="58" textAnchor="middle" fontSize="9" fill="#475569">érkezés</text>
    <text x="200" y="84" textAnchor="middle" fontSize="9" fill="#475569">indulás</text>
  </QFig>
);

const MotorwayFig: React.FC = () => (
  <QFig h={140}>
    {MOTORWAYS.map((d, i) => (
      <g key={d.n}>
        <text x="80" y={26 + i * 22} textAnchor="end" fontSize="9.5" fill="#334155">{d.n}</text>
        <rect x="84" y={15 + i * 22} width={d.v * 0.055} height="14" rx="2" fill={d.c} />
        <text x={88 + d.v * 0.055} y={26 + i * 22} fontSize="9" fontWeight="bold" fill="#0f172a">{d.v}</text>
      </g>
    ))}
    <text x="120" y="132" textAnchor="middle" fontSize="9" fill="#475569">autópályák hossza (km)</text>
  </QFig>
);

const AnimalsFig: React.FC = () => (
  <QFig h={110}>
    {ANIMALS.map((a, i) => (
      <g key={a.n}>
        <text x={26 + i * 47} y="44" textAnchor="middle" fontSize="26">{a.e}</text>
        <text x={26 + i * 47} y="66" textAnchor="middle" fontSize="9" fill="#334155">{a.n}</text>
        <text x={26 + i * 47} y="84" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0c4a6e">{a.v}</text>
      </g>
    ))}
    <text x="120" y="102" textAnchor="middle" fontSize="8.5" fill="#475569">napi vízigény</text>
  </QFig>
);

const BalloonFig: React.FC = () => (
  <QFig h={34 + BALLOON.length * 17}>
    <text x="120" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9f1239">a hőlégballon részei</text>
    {BALLOON.map((b, i) => (
      <g key={b.n}>
        <rect x="30" y={27 + i * 17} width="180" height="16" fill={i % 2 ? '#ffe4e6' : '#fff1f2'} />
        <text x="38" y={39 + i * 17} fontSize="10.5" fill="#0f172a">{b.n}</text>
        <text x="202" y={39 + i * 17} textAnchor="end" fontSize="10.5" fontWeight="bold" fill="#0f172a">{b.v} kg</text>
      </g>
    ))}
  </QFig>
);

const FieldFig: React.FC<{ f: BoardField }> = ({ f }) => (
  <QFig h={120}>
    <circle cx="120" cy="52" r="36" fill={BOARD_TASKS[f.color].fill} stroke="#ffffff" strokeWidth="3" />
    <text x="120" y="57" textAnchor="middle" fontSize={f.q.length > 6 ? 12 : 15} fontWeight="bold" fill={f.color === 'yellow' ? '#713f12' : '#ffffff'}>{f.q}</text>
    <text x="120" y="108" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">{BOARD_TASKS[f.color].text}</text>
  </QFig>
);

/** Szabályos sokszög oldalfelirattal */
const PolyFig: React.FC<{ n: number; side: string; note: string }> = ({ n, side, note }) => {
  const r = 48;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2 + (n % 2 === 0 ? Math.PI / n : 0);
    return [120 + r * Math.cos(a), 64 + r * Math.sin(a)];
  });
  const [p0, p1] = [pts[0], pts[1]];
  return (
    <QFig h={140}>
      <polygon points={pts.map((p) => p.join(',')).join(' ')} fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" />
      <text x={(p0[0] + p1[0]) / 2 + 14} y={(p0[1] + p1[1]) / 2 + 2} fontSize="12" fontWeight="bold" fill="#78350f">{side}</text>
      <text x="120" y="132" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>{note}</text>
    </QFig>
  );
};

const KERESZT: [number, number][] = [
  [1, 0],
  [0, 1],
  [1, 1],
  [2, 1],
  [1, 2]
];

// ---------------------------------------------------------------------------
// Kérdések – 30 / 30 / 30
// ---------------------------------------------------------------------------
const MEASUREMENTS_EXAM_QUESTIONS: QuizQuestion[] = [
  // ======================= 1. szint =======================
  {
    id: 'mx-q1',
    level: 1,
    questionTypeBadge: 'Hosszúság',
    question: '1 m = ? cm',
    options: ['100 cm', '10 cm', '1000 cm', '50 cm'],
    correctAnswer: 0,
    explanation: '1 m = 10 dm = 100 cm.'
  },
  {
    id: 'mx-q2',
    level: 1,
    questionTypeBadge: 'Hosszúság',
    question: '1 km = ? m',
    options: ['1000 m', '100 m', '10 m', '10 000 m'],
    correctAnswer: 0,
    explanation: '1 km = 1000 m.'
  },
  {
    id: 'mx-q3',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Melyik mértékegységgel mérnéd meg egy logikai lap vastagságát?',
    options: ['milliméterrel (mm)', 'kilométerrel (km)', 'méterrel (m)', 'literrel (l)'],
    correctAnswer: 0,
    explanation: 'A logikai lap nagyon vékony, csak néhány milliméter. A liter űrtartalom-egység.'
  },
  {
    id: 'mx-q4',
    level: 1,
    questionTypeBadge: 'Vonalzó',
    figure: <RulerFig mm={64} />,
    question: 'Milyen hosszú a piros szakasz milliméterben?',
    options: ['64 mm', '604 mm', '46 mm', '6 mm'],
    correctAnswer: 0,
    explanation: 'A szakasz 6 cm 4 mm hosszú. 6 cm = 60 mm, 60 mm + 4 mm = 64 mm.'
  },
  {
    id: 'mx-q5',
    level: 1,
    questionTypeBadge: 'Hosszúság',
    question: '1 cm = ? mm',
    options: ['10 mm', '100 mm', '1 mm', '1000 mm'],
    correctAnswer: 0,
    explanation: '1 cm = 10 mm. A vonalzón 1 cm-en belül 10 kis osztás van.'
  },
  {
    id: 'mx-q6',
    level: 1,
    questionTypeBadge: 'Kerület',
    question: 'Mit jelent egy síkidom kerülete?',
    options: [
      'a síkidomot határoló oldalak hosszának összegét',
      'azt, hogy hány kis négyzet fedi le',
      'a leghosszabb oldalának hosszát',
      'két szomszédos oldalának összegét'
    ],
    correctAnswer: 0,
    explanation: 'A kerület az összes oldal hosszának összege – mintha körbejárnánk a síkidomot.'
  },
  {
    id: 'mx-q7',
    level: 1,
    questionTypeBadge: 'Kerület',
    figure: <RectFig w={80} h={80} top="5 cm" side="5 cm" note="K = ?" />,
    question: 'Mekkora az 5 cm oldalú négyzet kerülete?',
    options: ['20 cm', '25 cm', '10 cm', '15 cm'],
    correctAnswer: 0,
    explanation: 'A négyzetnek 4 egyenlő oldala van: 4 · 5 cm = 20 cm. (A 25 a lefedő négyzetek száma lenne.)'
  },
  {
    id: 'mx-q8',
    level: 1,
    questionTypeBadge: 'Kerület',
    figure: <RectFig w={120} h={80} top="6 cm" side="4 cm" note="K = ?" />,
    question: 'Mekkora a 6 cm és 4 cm oldalú téglalap kerülete?',
    options: ['20 cm', '24 cm', '10 cm', '14 cm'],
    correctAnswer: 0,
    explanation: '6 + 4 + 6 + 4 = 20 cm. Ha csak két oldalt adsz össze (10 cm), az csak a kerület fele.'
  },
  {
    id: 'mx-q9',
    level: 1,
    questionTypeBadge: 'Kerület',
    figure: <GridFig cols={3} rows={2} note="kerület: ? egység" />,
    question: 'Hány egység a kiszínezett téglalap kerülete? (Egy kis négyzet oldala 1 egység.)',
    options: ['10 egység', '6 egység', '5 egység', '12 egység'],
    correctAnswer: 0,
    explanation: '3 + 2 + 3 + 2 = 10 egység. A 6 a területe lenne (6 kis négyzet).'
  },
  {
    id: 'mx-q10',
    level: 1,
    questionTypeBadge: 'Kerület',
    figure: <PolyFig n={3} side="4 cm" note="K = ?" />,
    question: 'Egy egyenlő oldalú háromszög minden oldala 4 cm. Mekkora a kerülete?',
    options: ['12 cm', '8 cm', '16 cm', '7 cm'],
    correctAnswer: 0,
    explanation: 'Három egyenlő oldal: 3 · 4 cm = 12 cm.'
  },
  {
    id: 'mx-q11',
    level: 1,
    questionTypeBadge: 'Terület',
    figure: <GridFig cols={4} rows={3} note="terület: ? kis négyzet" />,
    question: 'Hány kis négyzet fedi le a téglalapot?',
    options: ['12', '14', '7', '16'],
    correctAnswer: 0,
    explanation: 'Egy sorban 4 négyzet van, 3 sor van: 4 · 3 = 12. A 14 a kerület lenne.'
  },
  {
    id: 'mx-q12',
    level: 1,
    questionTypeBadge: 'Terület',
    question: 'A füzetet először nagy, aztán kis négyzet alakú lapokkal fedjük le. Melyikből kell több?',
    options: ['a kis lapokból', 'a nagy lapokból', 'mindkettőből ugyanannyi', 'nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: 'Kisebb egységből több darab kell ugyanakkora terület lefedéséhez.'
  },
  {
    id: 'mx-q13',
    level: 1,
    questionTypeBadge: 'Terület',
    figure: <GridFig cols={5} rows={2} note="terület: ? kis négyzet" />,
    question: 'Mekkora a téglalap területe kis négyzetekben?',
    options: ['10', '7', '14', '12'],
    correctAnswer: 0,
    explanation: '5 · 2 = 10 kis négyzet.'
  },
  {
    id: 'mx-q14',
    level: 1,
    questionTypeBadge: 'Terület',
    question: 'Mit mutat meg a terület?',
    options: [
      'hány egység fedi le a síkidomot hézag és átfedés nélkül',
      'milyen hosszú a síkidom határa',
      'milyen nehéz a síkidom',
      'hány oldala van a síkidomnak'
    ],
    correctAnswer: 0,
    explanation: 'A területet lefedéssel mérjük: megszámoljuk, hány egység fér rá hézag és átfedés nélkül.'
  },
  {
    id: 'mx-q15',
    level: 1,
    questionTypeBadge: 'Terület',
    question: 'Egy téglalap minden sorában 6 kis négyzet van, és 2 sor van. Hány kis négyzetből áll?',
    options: ['12', '8', '16', '14'],
    correctAnswer: 0,
    explanation: '6 · 2 = 12 kis négyzet.'
  },
  {
    id: 'mx-q16',
    level: 1,
    questionTypeBadge: 'Tömeg',
    figure: <BalanceFig left="1 kg" right="? dkg" />,
    question: 'A mérleg egyensúlyban van. Hány dkg van a jobb oldalon?',
    options: ['100 dkg', '10 dkg', '1000 dkg', '50 dkg'],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg.'
  },
  {
    id: 'mx-q17',
    level: 1,
    questionTypeBadge: 'Tömeg',
    question: '1 dkg = ? g',
    options: ['10 g', '100 g', '1 g', '1000 g'],
    correctAnswer: 0,
    explanation: '1 dkg = 10 g.'
  },
  {
    id: 'mx-q18',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Melyik mértékegységgel mérnéd meg egy táska tömegét?',
    options: ['kilogrammal (kg)', 'grammal (g)', 'centiméterrel (cm)', 'deciliterrel (dl)'],
    correctAnswer: 0,
    explanation: 'Egy iskolatáska néhány kilogramm. A gramm túl kicsi egység, a cm és a dl nem tömeg.'
  },
  {
    id: 'mx-q19',
    level: 1,
    questionTypeBadge: 'Tömeg',
    question: '1 kg = ? g',
    options: ['1000 g', '100 g', '10 g', '10 000 g'],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg = 1000 g.'
  },
  {
    id: 'mx-q20',
    level: 1,
    questionTypeBadge: 'Tömeg',
    question: 'Melyik a legkönnyebb?',
    options: ['egy zacskó bazsalikom: 8 g', 'egy darab sajt: 25 dkg', 'egy zacskó liszt: 1 kg', 'egy alma: 230 g'],
    correctAnswer: 0,
    explanation: 'Grammban: 8 g, 250 g, 1000 g, 230 g. A 8 g a legkevesebb.'
  },
  {
    id: 'mx-q21',
    level: 1,
    questionTypeBadge: 'Űrtartalom',
    figure: <JugFig ticks={10} fill={1} label={(i) => `${i}`} bottom="1 l = ? dl" />,
    question: 'A kancsóban 1 l víz van. Hány deciliter ez?',
    options: ['10 dl', '100 dl', '1 dl', '1000 dl'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl.'
  },
  {
    id: 'mx-q22',
    level: 1,
    questionTypeBadge: 'Űrtartalom',
    question: '1 cl = ? ml',
    options: ['10 ml', '100 ml', '1 ml', '1000 ml'],
    correctAnswer: 0,
    explanation: '1 cl = 10 ml.'
  },
  {
    id: 'mx-q23',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Melyik mértékegységgel mérnéd meg egy bögre víz űrtartalmát?',
    options: ['deciliterrel (dl)', 'kilométerrel (km)', 'kilogrammal (kg)', 'milliméterrel (mm)'],
    correctAnswer: 0,
    explanation: 'Egy bögrébe kb. 2–3 dl fér, ezért deciliterrel mérjük.'
  },
  {
    id: 'mx-q24',
    level: 1,
    questionTypeBadge: 'Leolvasás',
    figure: <JugFig ticks={10} fill={0.6} label={(i) => `${i} dl`} bottom="? dl" />,
    question: 'Mennyi víz van a mérőkancsóban?',
    options: ['6 dl', '4 dl', '60 dl', '7 dl'],
    correctAnswer: 0,
    explanation: 'A víz a 6 dl-es vonásig ér.'
  },
  {
    id: 'mx-q25',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Melyik űrtartalom-mértékegység?',
    options: ['cl', 'cm', 'g', 'mm'],
    correctAnswer: 0,
    explanation: 'A cl (centiliter) űrtartalom-egység. A cm és a mm hosszúság, a g tömeg.'
  },
  {
    id: 'mx-q26',
    level: 1,
    questionTypeBadge: 'Idő',
    question: '1 óra = ? perc',
    options: ['60 perc', '100 perc', '24 perc', '30 perc'],
    correctAnswer: 0,
    explanation: '1 óra = 60 perc.'
  },
  {
    id: 'mx-q27',
    level: 1,
    questionTypeBadge: 'Idő',
    question: '1 nap = ? óra',
    options: ['24 óra', '12 óra', '60 óra', '7 óra'],
    correctAnswer: 0,
    explanation: '1 nap = 24 óra.'
  },
  {
    id: 'mx-q28',
    level: 1,
    questionTypeBadge: 'Óra',
    figure: <ClockFig h={9} m={15} caption="Hány óra van?" />,
    question: 'Mennyit mutat az óra?',
    options: ['negyed 10', 'negyed 9', 'háromnegyed 9', 'fél 10'],
    correctAnswer: 0,
    explanation: 'A nagymutató a 3-on (15 perc), a kismutató a 9 után: 9 óra 15 perc = negyed 10.'
  },
  {
    id: 'mx-q29',
    level: 1,
    questionTypeBadge: 'Idő',
    question: '1 perc = ? másodperc',
    options: ['60 másodperc', '100 másodperc', '10 másodperc', '30 másodperc'],
    correctAnswer: 0,
    explanation: '1 perc = 60 másodperc.'
  },
  {
    id: 'mx-q30',
    level: 1,
    questionTypeBadge: 'Idő',
    question: '1 hét = ? nap',
    options: ['7 nap', '5 nap', '10 nap', '30 nap'],
    correctAnswer: 0,
    explanation: 'Egy hétben 7 nap van: hétfőtől vasárnapig.'
  },

  // ======================= 2. szint =======================
  {
    id: 'mx-q31',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '2 km 400 m = ? m',
    options: ['2400 m', '2040 m', '240 m', '6400 m'],
    correctAnswer: 0,
    explanation: '2 km = 2000 m. 2000 m + 400 m = 2400 m.'
  },
  {
    id: 'mx-q32',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik állítás igaz?',
    options: ['32 cm > 230 mm', '32 cm < 230 mm', '32 cm = 230 mm', '32 cm = 32 mm'],
    correctAnswer: 0,
    explanation: '32 cm = 320 mm, és 320 mm több, mint 230 mm.'
  },
  {
    id: 'mx-q33',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '1200 cm = ? dm',
    options: ['120 dm', '12 dm', '1200 dm', '12 000 dm'],
    correctAnswer: 0,
    explanation: '10 cm = 1 dm, ezért 1200 cm = 1200 : 10 = 120 dm.'
  },
  {
    id: 'mx-q34',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '4900 dm = ? m',
    options: ['490 m', '49 m', '4900 m', '49 000 m'],
    correctAnswer: 0,
    explanation: '10 dm = 1 m, ezért 4900 dm = 4900 : 10 = 490 m.'
  },
  {
    id: 'mx-q35',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik állítás igaz?',
    options: ['7 km > 700 m', '7 km < 700 m', '7 km = 700 m', '7 km = 70 m'],
    correctAnswer: 0,
    explanation: '7 km = 7000 m, ez sokkal több, mint 700 m.'
  },
  {
    id: 'mx-q36',
    level: 2,
    questionTypeBadge: 'Kerület',
    figure: <RectFig w={150} h={90} top="33 m" side="21 m" note="a medence kerülete: ?" />,
    question: 'Az uszodamedence 33 m hosszú és 21 m széles. Mekkora a kerülete?',
    options: ['108 m', '54 m', '693 m', '96 m'],
    correctAnswer: 0,
    explanation: '33 + 21 + 33 + 21 = 108 m. Az 54 m csak a fele.'
  },
  {
    id: 'mx-q37',
    level: 2,
    questionTypeBadge: 'Kerület',
    figure: <RectFig w={80} h={80} top="2000 mm" side="2000 mm" note="K = ? m" />,
    question: 'Egy négyzet alakú kerti tó oldala 2000 mm. Hány méter a kerülete?',
    options: ['8 m', '8000 m', '80 m', '2 m'],
    correctAnswer: 0,
    explanation: '2000 mm = 2 m. 4 · 2 m = 8 m.'
  },
  {
    id: 'mx-q38',
    level: 2,
    questionTypeBadge: 'Kerület',
    figure: <PolyFig n={6} side="3 m" note="K = ?" />,
    question: 'Egy hatszög alakú homokozó minden oldala 3 m. Mekkora a kerülete?',
    options: ['18 m', '9 m', '12 m', '24 m'],
    correctAnswer: 0,
    explanation: 'A hatszögnek 6 oldala van: 6 · 3 m = 18 m.'
  },
  {
    id: 'mx-q39',
    level: 2,
    questionTypeBadge: 'Kerület',
    question: 'Egy tablókeret 500 mm × 350 mm-es téglalap. Mekkora a kerülete?',
    options: ['1700 mm', '850 mm', '1750 mm', '1500 mm'],
    correctAnswer: 0,
    explanation: '500 + 350 + 500 + 350 = 1700 mm.'
  },
  {
    id: 'mx-q40',
    level: 2,
    questionTypeBadge: 'Kerület',
    figure: <GridFig cols={5} rows={1} note="kerület: ? egység" />,
    question: 'Hány egység a kiszínezett csík kerülete?',
    options: ['12 egység', '5 egység', '10 egység', '6 egység'],
    correctAnswer: 0,
    explanation: '5 + 1 + 5 + 1 = 12 egység. A területe csak 5 kis négyzet.'
  },
  {
    id: 'mx-q41',
    level: 2,
    questionTypeBadge: 'Terület',
    figure: <RectFig w={140} h={70} top="18 m" side="9 m" note="? db 1 m-es négyzet" />,
    question: 'A röplabdapálya 18 m hosszú és 9 m széles. Hány 1 m oldalú négyzet fedi le?',
    options: ['162', '54', '27', '172'],
    correctAnswer: 0,
    explanation: '18 · 9 = 162. Az 54 a kerület lenne (18 + 9 + 18 + 9).'
  },
  {
    id: 'mx-q42',
    level: 2,
    questionTypeBadge: 'Terület',
    figure: <GridFig cols={4} rows={4} note="? dominó fedi le" domino />,
    question: 'A 4 · 4-es négyzetet dominókkal (2 kis négyzet) fedjük le. Hány dominó kell?',
    options: ['8', '16', '4', '32'],
    correctAnswer: 0,
    explanation: '4 · 4 = 16 kis négyzet. Egy dominó 2 kis négyzet, ezért 16 : 2 = 8 dominó.'
  },
  {
    id: 'mx-q43',
    level: 2,
    questionTypeBadge: 'Terület',
    figure: <RectFig w={140} h={70} top="16 m" side="8 m" note="? db 1 m-es négyzet" />,
    question: 'A strandröplabdapálya 16 m × 8 m. Hány 1 m oldalú négyzet fedi le?',
    options: ['128', '48', '24', '136'],
    correctAnswer: 0,
    explanation: '16 · 8 = 128.'
  },
  {
    id: 'mx-q44',
    level: 2,
    questionTypeBadge: 'Terület',
    question: 'Egy terülőminta területe nagyobb 17 színes lapnál, de kisebb 25 színes lapnál. Mennyi lehet?',
    options: ['20 színes lap', '17 színes lap', '25 színes lap', '30 színes lap'],
    correctAnswer: 0,
    explanation: '17 < 20 < 25. A 17 és a 25 nem jó, mert ott egyenlőség lenne.'
  },
  {
    id: 'mx-q45',
    level: 2,
    questionTypeBadge: 'Terület',
    figure: <GridFig cols={6} rows={3} note="terület: ? kis négyzet" />,
    question: 'Hány kis négyzetből áll a téglalap?',
    options: ['18', '9', '12', '20'],
    correctAnswer: 0,
    explanation: '6 · 3 = 18 kis négyzet. Ha összeadod 6 + 3-at, az 9 – az nem a terület.'
  },
  {
    id: 'mx-q46',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '2300 dkg = ? kg',
    options: ['23 kg', '230 kg', '2 kg 30 dkg', '2300 kg'],
    correctAnswer: 0,
    explanation: '100 dkg = 1 kg, ezért 2300 dkg = 2300 : 100 = 23 kg.'
  },
  {
    id: 'mx-q47',
    level: 2,
    questionTypeBadge: 'Tömeg',
    question: '50 dkg keksz + 10 g vaníliás cukor = ?',
    options: ['51 dkg', '60 dkg', '60 g', '150 dkg'],
    correctAnswer: 0,
    explanation: '10 g = 1 dkg. 50 dkg + 1 dkg = 51 dkg.'
  },
  {
    id: 'mx-q48',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '27 g = ?',
    options: ['2 dkg 7 g', '27 dkg', '2 kg 7 g', '20 dkg 7 g'],
    correctAnswer: 0,
    explanation: '20 g = 2 dkg, marad 7 g. 27 g = 2 dkg 7 g.'
  },
  {
    id: 'mx-q49',
    level: 2,
    questionTypeBadge: 'Mérleg',
    figure: <BalanceFig left="1 kg" right="? · 200 g" />,
    question: 'Hány 200 g-os súly tartja egyensúlyban az 1 kg-ot?',
    options: ['5', '2', '10', '4'],
    correctAnswer: 0,
    explanation: '1 kg = 1000 g. 1000 : 200 = 5.'
  },
  {
    id: 'mx-q50',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'Az őrölt paprika 250 g. Hány dkg ez?',
    options: ['25 dkg', '2500 dkg', '250 dkg', '2 dkg 5 g'],
    correctAnswer: 0,
    explanation: '10 g = 1 dkg, ezért 250 g = 250 : 10 = 25 dkg.'
  },
  {
    id: 'mx-q51',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '3000 cl = ? l',
    options: ['30 l', '300 l', '3 l', '3000 l'],
    correctAnswer: 0,
    explanation: '100 cl = 1 l, ezért 3000 cl = 30 l.'
  },
  {
    id: 'mx-q52',
    level: 2,
    questionTypeBadge: 'Űrtartalom',
    figure: <JugFig ticks={10} fill={0.8} label={(i) => `${i * 100}`} bottom="1000 ml-es üveg: még ? dl" />,
    question: 'Egy 1000 ml-es üvegbe már beletöltöttek 80 cl málnaszörpöt. Hány deciliter fér még bele?',
    options: ['2 dl', '20 dl', '920 dl', '8 dl'],
    correctAnswer: 0,
    explanation: '80 cl = 800 ml. 1000 ml − 800 ml = 200 ml = 2 dl.'
  },
  {
    id: 'mx-q53',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '3900 dl = ? l',
    options: ['390 l', '39 l', '3900 l', '39 000 l'],
    correctAnswer: 0,
    explanation: '10 dl = 1 l, ezért 3900 dl = 3900 : 10 = 390 l.'
  },
  {
    id: 'mx-q54',
    level: 2,
    questionTypeBadge: 'Űrtartalom',
    figure: <AnimalsFig />,
    question: 'A macska napi vízigénye 20–30 cl. Mennyi ez milliliterben?',
    options: ['200–300 ml', '20–30 ml', '2000–3000 ml', '2–3 ml'],
    correctAnswer: 0,
    explanation: '1 cl = 10 ml, ezért 20 cl = 200 ml és 30 cl = 300 ml.'
  },
  {
    id: 'mx-q55',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a legtöbb? 170 dl, 707 dl, 71 l, 770 cl',
    options: ['71 l', '707 dl', '770 cl', '170 dl'],
    correctAnswer: 0,
    explanation: 'Deciliterben: 71 l = 710 dl, 770 cl = 77 dl. A 710 dl a legtöbb.'
  },
  {
    id: 'mx-q56',
    level: 2,
    questionTypeBadge: 'Idő',
    question: '120 másodperc = ? perc',
    options: ['2 perc', '12 perc', '20 perc', '1 perc 20 másodperc'],
    correctAnswer: 0,
    explanation: '60 másodperc = 1 perc, ezért 120 másodperc = 2 perc.'
  },
  {
    id: 'mx-q57',
    level: 2,
    questionTypeBadge: 'Menetrend',
    figure: <TimetableFig />,
    question: 'Hány perc a busz menetideje a Dombtetőtől a Ligetig?',
    options: ['19 perc', '21 perc', '40 perc', '29 perc'],
    correctAnswer: 0,
    explanation: 'Dombtető: 7:21, Liget: 7:40. 40 − 21 = 19 perc.'
  },
  {
    id: 'mx-q58',
    level: 2,
    questionTypeBadge: 'Óra',
    question: 'Délután „fél 5 múlt 10 perccel” van. Hogyan írjuk ezt számokkal?',
    options: ['16 óra 40 perc', '17 óra 40 perc', '16 óra 10 perc', '4 óra 10 perc'],
    correctAnswer: 0,
    explanation: 'Fél 5 = 4 óra 30 perc, 10 perccel később 4 óra 40 perc. Délután +12: 16 óra 40 perc.'
  },
  {
    id: 'mx-q59',
    level: 2,
    questionTypeBadge: 'Idő',
    question: '48 óra = ? nap',
    options: ['2 nap', '4 nap', '24 nap', '3 nap'],
    correctAnswer: 0,
    explanation: '1 nap = 24 óra. 48 : 24 = 2 nap.'
  },
  {
    id: 'mx-q60',
    level: 2,
    questionTypeBadge: 'Időtartam',
    figure: <StationFig name="oroszlánok" a="10:10" b="10:28" />,
    question: 'A Kovács család 10:10-kor ért az oroszlánokhoz, és 10:28-kor ment tovább. Mennyi ideig voltak ott?',
    options: ['18 perc', '28 perc', '38 perc', '10 perc'],
    correctAnswer: 0,
    explanation: '28 − 10 = 18 perc.'
  },

  // ======================= 3. szint =======================
  {
    id: 'mx-q61',
    level: 3,
    questionTypeBadge: 'Táblázat',
    figure: <MotorwayFig />,
    question: 'Csökkenő sorrendben melyik ország autópályája áll a 2. helyen?',
    options: ['Ausztria', 'Magyarország', 'Törökország', 'Horvátország'],
    correctAnswer: 0,
    explanation: 'Csökkenő sorrend: Törökország 2127, Ausztria 1719, Magyarország 1563, Horvátország 1295, Dánia 1186 km.'
  },
  {
    id: 'mx-q62',
    level: 3,
    questionTypeBadge: 'Kerekítés',
    figure: <MotorwayFig />,
    question: 'Tízesre kerekített értékekkel számolva mekkora a különbség a leghosszabb és a legrövidebb autópálya között?',
    options: ['940 km', '941 km', '1000 km', '930 km'],
    correctAnswer: 0,
    explanation: '2127 ≈ 2130, 1186 ≈ 1190. 2130 − 1190 = 940 km. (Kerekítés nélkül 941 km jönne ki.)'
  },
  {
    id: 'mx-q63',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question:
      'A zöldségszállítóknak 700 km-t kell vezetniük. Az első 220 km autópálya. Hány km van még hátra, ha az autópályán már 180 km-t megtettek?',
    options: ['520 km', '480 km', '300 km', '40 km'],
    correctAnswer: 0,
    explanation: 'Összesen 180 km-t tettek meg: 700 − 180 = 520 km. (A 40 km csak az autópályából van hátra.)'
  },
  {
    id: 'mx-q64',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Betti egy 1000 cm-es szalagot 10 cm-es darabokra vág, és 3-3 darabot összefon. Hány fonatot készíthet?',
    options: ['33', '100', '30', '34'],
    correctAnswer: 0,
    explanation: '1000 : 10 = 100 darab. 100 : 3 = 33, maradék 1. Tehát 33 fonat készül.'
  },
  {
    id: 'mx-q65',
    level: 3,
    questionTypeBadge: 'Tömeg',
    figure: <BalloonFig />,
    question: 'Mennyi a hőlégballon össztömege?',
    options: ['3702 kg', '702 kg', '3602 kg', '4702 kg'],
    correctAnswer: 0,
    explanation: '113 + 22 + 184 + 63 + 320 = 702 kg, ehhez jön a 3000 kg levegő: 3702 kg.'
  },
  {
    id: 'mx-q66',
    level: 3,
    questionTypeBadge: 'Tömeg',
    figure: <BalloonFig />,
    question: 'Mennyivel nehezebb a léggömbben lévő levegő, mint a ballon összes többi része együtt?',
    options: ['2298 kg', '2398 kg', '2302 kg', '3702 kg'],
    correctAnswer: 0,
    explanation: 'A többi rész: 113 + 22 + 184 + 63 + 320 = 702 kg. 3000 − 702 = 2298 kg.'
  },
  {
    id: 'mx-q67',
    level: 3,
    questionTypeBadge: 'Mértékegység',
    question: 'Befőzés: „A szilvát 7 ■-es üvegekbe tesszük.” Melyik mértékegység illik a ■ helyére?',
    options: ['dl', 'kg', 'm', 'perc'],
    correctAnswer: 0,
    explanation: 'Az üveg űrtartalmát adjuk meg: 7 dl-es üveg. A kg tömeg, a m hosszúság, a perc idő.'
  },
  {
    id: 'mx-q68',
    level: 3,
    questionTypeBadge: 'Mértékegység',
    question: 'Befőzés: „Az üvegeket a forrástól számított 20 ■-ig főzzük.” Melyik mértékegység illik a ■ helyére?',
    options: ['perc', 'óra', 'nap', 'dl'],
    correctAnswer: 0,
    explanation: 'A befőttet 20 percig főzzük. 20 óra vagy 20 nap túl hosszú lenne, a dl pedig nem idő.'
  },
  {
    id: 'mx-q69',
    level: 3,
    questionTypeBadge: 'Társasjáték',
    figure: <FieldFig f={{ q: '2500 cl', color: 'blue', ans: 25, unit: 'l' }} />,
    question: 'Erre a kék mezőre léptél. Mi a helyes válasz?',
    options: ['25 l', '250 l', '2500 l', '2 l 5 cl'],
    correctAnswer: 0,
    explanation: '100 cl = 1 l, ezért 2500 cl = 2500 : 100 = 25 l.'
  },
  {
    id: 'mx-q70',
    level: 3,
    questionTypeBadge: 'Társasjáték',
    figure: <FieldFig f={{ q: '6000 dm', color: 'red', ans: 600, unit: 'm' }} />,
    question: 'Erre a piros mezőre léptél. Mi a helyes válasz?',
    options: ['600 m', '60 m', '6 m', '60 000 m'],
    correctAnswer: 0,
    explanation: '10 dm = 1 m, ezért 6000 dm = 600 m.'
  },
  {
    id: 'mx-q71',
    level: 3,
    questionTypeBadge: 'Társasjáték',
    figure: <FieldFig f={{ q: '3500 dkg', color: 'green', ans: 35, unit: 'kg' }} />,
    question: 'Erre a zöld mezőre léptél. Mi a helyes válasz?',
    options: ['35 kg', '350 kg', '3 kg 50 dkg', '3500 kg'],
    correctAnswer: 0,
    explanation: '100 dkg = 1 kg, ezért 3500 dkg = 35 kg.'
  },
  {
    id: 'mx-q72',
    level: 3,
    questionTypeBadge: 'Társasjáték',
    figure: <FieldFig f={{ q: '328 cl', color: 'orange', ans: 3280, unit: 'ml' }} />,
    question: 'Erre a narancssárga mezőre léptél. Mi a helyes válasz?',
    options: ['3280 ml', '32 800 ml', '328 ml', '3208 ml'],
    correctAnswer: 0,
    explanation: '1 cl = 10 ml, ezért 328 cl = 3280 ml.'
  },
  {
    id: 'mx-q73',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Apu talált egy 7100 mm-es drótot. Petivel játékot hajtogattak belőle, és egy 20 cm-es darab maradt. Hány millimétert használtak fel?',
    options: ['6900 mm', '7080 mm', '5100 mm', '7120 mm'],
    correctAnswer: 0,
    explanation: '20 cm = 200 mm. 7100 mm − 200 mm = 6900 mm. (A 7080 akkor jön ki, ha elfelejted átváltani a 20 cm-t.)'
  },
  {
    id: 'mx-q74',
    level: 3,
    questionTypeBadge: 'Kerület',
    figure: <RectFig w={80} h={80} top="30 cm" side="30 cm" note="1250 cm szalag" />,
    question: 'Vera 30 cm oldalú, négyzet alakú terítők szélére varr szalagot. 1250 cm szalagja van. Hány terítőt tud beszegni, és mennyi szalag marad?',
    options: ['10 terítőt, 50 cm marad', '41 terítőt, 20 cm marad', '10 terítőt, 5 cm marad', '12 terítőt, 50 cm marad'],
    correctAnswer: 0,
    explanation: 'Egy terítő kerülete 4 · 30 = 120 cm. 1250 : 120 = 10, maradék 50 (10 · 120 = 1200). 10 terítő, 50 cm marad.'
  },
  {
    id: 'mx-q75',
    level: 3,
    questionTypeBadge: 'Pótlás',
    question: 'Egészítsd ki 5 km-re: 3 km 340 m + ? = 5 km',
    options: ['1 km 660 m', '2 km 660 m', '1 km 760 m', '2 km 340 m'],
    correctAnswer: 0,
    explanation: '5 km = 5000 m, 3 km 340 m = 3340 m. 5000 − 3340 = 1660 m = 1 km 660 m.'
  },
  {
    id: 'mx-q76',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A futóversenyen elfogyott 100 üveg 5 dl-es ásványvíz, 85 l bodzaszörp és 3470 dl tea. Hány liter ital fogyott összesen?',
    options: ['482 l', '4055 l', '437 l', '532 l'],
    correctAnswer: 0,
    explanation: '100 · 5 dl = 500 dl = 50 l, 3470 dl = 347 l. 50 + 85 + 347 = 482 l.'
  },
  {
    id: 'mx-q77',
    level: 3,
    questionTypeBadge: 'Kerület és terület',
    figure: <GridFig cols={3} rows={3} cells={KERESZT} note="kerület: ? • terület: ?" />,
    question: 'Mekkora a kereszt alakú síkidom kerülete és területe? (Egy kis négyzet oldala 1 egység.)',
    options: ['kerület 12 egység, terület 5 kis négyzet', 'kerület 5 egység, terület 12 kis négyzet', 'kerület 9 egység, terület 5 kis négyzet', 'kerület 12 egység, terület 9 kis négyzet'],
    correctAnswer: 0,
    explanation: 'Körbejárva 12 egységnyi oldalt számolunk. 5 kis négyzet fedi le, tehát a területe 5.'
  },
  {
    id: 'mx-q78',
    level: 3,
    questionTypeBadge: 'Kerület',
    figure: <RectFig w={150} h={80} top="22 m" side="12 m" note="oszlop 2 méterenként: ? db" />,
    question: 'A 22 m × 12 m-es telket drótkerítéssel kerítik be, és 2 méterenként oszlopot raknak le. Hány oszlop kell?',
    options: ['34', '68', '35', '17'],
    correctAnswer: 0,
    explanation: 'A kerület 22 + 12 + 22 + 12 = 68 m. Körbe 2 méterenként: 68 : 2 = 34 oszlop.'
  },
  {
    id: 'mx-q79',
    level: 3,
    questionTypeBadge: 'Terület',
    figure: <GridFig cols={6} rows={4} note="a háromszög területe: ?" triangle />,
    question: 'A 6 · 4-es téglalapba rajzolt háromszög területe a téglalap területének a fele. Hány kis négyzet a háromszög területe?',
    options: ['12', '24', '10', '20'],
    correctAnswer: 0,
    explanation: 'A téglalap 6 · 4 = 24 kis négyzet. Ennek a fele 24 : 2 = 12.'
  },
  {
    id: 'mx-q80',
    level: 3,
    questionTypeBadge: 'Tömeg',
    question: 'A konténer össztömege legfeljebb 6000 kg lehet, üresen 3800 kg. Már 1600 kg sárgarépa van benne. Mennyi fér még bele?',
    options: ['600 kg', '2200 kg', '4400 kg', '1600 kg'],
    correctAnswer: 0,
    explanation: 'Rakomány legfeljebb 6000 − 3800 = 2200 kg. 2200 − 1600 = 600 kg fér még bele.'
  },
  {
    id: 'mx-q81',
    level: 3,
    questionTypeBadge: 'Tömeg',
    question: 'Nagyi receptje szerint 5 púpozott evőkanál liszt 10 dkg. Hány gramm liszt fér 1 evőkanálba?',
    options: ['20 g', '2 g', '50 g', '200 g'],
    correctAnswer: 0,
    explanation: '10 dkg = 100 g. 100 g : 5 = 20 g.'
  },
  {
    id: 'mx-q82',
    level: 3,
    questionTypeBadge: 'Menetrend',
    figure: <TimetableFig />,
    question: 'Kitti a Hídnál száll fel, és az Iskolánál le. Mennyit utazik naponta oda és vissza (visszafelé ugyanannyi a menetidő)?',
    options: ['68 perc', '34 perc', '58 perc', '46 perc'],
    correctAnswer: 0,
    explanation: 'Híd 7:12 → Iskola 7:46: 34 perc. Oda és vissza: 2 · 34 = 68 perc.'
  },
  {
    id: 'mx-q83',
    level: 3,
    questionTypeBadge: 'Időpont',
    question: '24 lángost rendelnek. Egyszerre 3 lángos sül, egy sütés 3 perc. 10 óra 8 perckor rendeltek. Mikor lesz kész mind?',
    options: ['10 óra 32 perckor', '11 óra 20 perckor', '10 óra 11 perckor', '10 óra 24 perckor'],
    correctAnswer: 0,
    explanation: '24 : 3 = 8 sütés, 8 · 3 = 24 perc. 10 óra 8 perc + 24 perc = 10 óra 32 perc.'
  },
  {
    id: 'mx-q84',
    level: 3,
    questionTypeBadge: 'Időeredmény',
    question: 'A maratonon a legjobb magyar ideje 2:38:47, a világrekord 2:03:38 (óra:perc:másodperc). Mennyi a különbség?',
    options: ['35 perc 9 másodperc', '36 perc 9 másodperc', '35 perc 49 másodperc', '41 perc 9 másodperc'],
    correctAnswer: 0,
    explanation: '38 perc − 3 perc = 35 perc, 47 mp − 38 mp = 9 mp. A különbség 35 perc 9 másodperc.'
  },
  {
    id: 'mx-q85',
    level: 3,
    questionTypeBadge: 'Időeredmény',
    question: '1000 m gyaloglásban a legjobb idő 7:03, a leggyengébb 8:53 (perc:másodperc). Hány másodperc a különbség?',
    options: ['110 másodperc', '150 másodperc', '190 másodperc', '50 másodperc'],
    correctAnswer: 0,
    explanation: '7:03 = 423 mp, 8:53 = 533 mp. 533 − 423 = 110 másodperc. (A 150 akkor jön ki, ha 853 − 703-at számolsz.)'
  },
  {
    id: 'mx-q86',
    level: 3,
    questionTypeBadge: 'Időtartam',
    question: 'Hanna útja: negyedóra + 24 perc + 660 másodperc + 10 perc. Hány perc alatt ért célba?',
    options: ['60 perc', '115 perc', '49 perc', '45 perc'],
    correctAnswer: 0,
    explanation: 'Negyedóra = 15 perc, 660 másodperc = 11 perc. 15 + 24 + 11 + 10 = 60 perc.'
  },
  {
    id: 'mx-q87',
    level: 3,
    questionTypeBadge: 'Űrtartalom',
    question: 'Matyi akváriumába 110 dl víz fér. Eddig 30 dl-rel többet töltött bele, mint amennyi még belefér. Hány liter kell még?',
    options: ['4 l', '7 l', '8 l', '40 l'],
    correctAnswer: 0,
    explanation: '110 − 30 = 80, 80 : 2 = 40 dl fér még bele. 40 dl = 4 l.'
  },
  {
    id: 'mx-q88',
    level: 3,
    questionTypeBadge: 'Űrtartalom',
    question: 'A 2100 literes dísztóba a szivattyú percenként 300 l vizet tölt. Hányadik percben telik meg?',
    options: ['a 7. percben', 'a 6. percben', 'a 8. percben', 'a 21. percben'],
    correctAnswer: 0,
    explanation: '2100 : 300 = 7, tehát a 7. percben.'
  },
  {
    id: 'mx-q89',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: <AnimalsFig />,
    question: 'Melyik állatnak lehet a legnagyobb a napi vízigénye?',
    options: ['a libának', 'a macskának', 'a galambnak', 'a kígyónak'],
    correctAnswer: 0,
    explanation: 'Milliliterben: liba 800–1000 ml, kutya 800 ml, macska 200–300 ml, kígyó 50–100 ml, galamb 80 ml. A liba igényelhet a legtöbbet.'
  },
  {
    id: 'mx-q90',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a leghosszabb időtartam?',
    options: ['5400 másodperc', '1 óra 20 perc', '85 perc', '4800 másodperc'],
    correctAnswer: 0,
    explanation: 'Percben: 5400 mp = 90 perc, 1 óra 20 perc = 80 perc, 85 perc, 4800 mp = 80 perc. A 90 perc a leghosszabb.'
  }
];

export const MeasurementsExamQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="meresek"
      topicId="g4-meas-tudasproba-quiz"
      subtopicId="megallo"
      title="7. Megálló – tudáspróba – Kvíz"
      subtitle="Fejezetzáró kvíz: 90 feladat 3 szinten – hosszúság, kerület, terület, tömeg, űrtartalom és idő."
      badge="4. OSZTÁLY • II. MÉRÉSEK • KVÍZ"
      questions={MEASUREMENTS_EXAM_QUESTIONS}
      cheatSheets={[
        {
          title: 'Hosszúság, kerület, terület',
          items: [
            '1 km = 1000 m; 1 m = 10 dm = 100 cm = 1000 mm',
            'Kerület: az oldalak összege (téglalap: a + b + a + b)',
            'Terület: hány kis négyzet fedi le (sor · sorok száma)',
            'A kerület hosszúság, a terület darabszám egységekben'
          ]
        },
        {
          title: 'Tömeg és űrtartalom',
          items: ['1 kg = 100 dkg = 1000 g; 1 dkg = 10 g', '1 l = 10 dl = 100 cl = 1000 ml', '1 dl = 10 cl; 1 cl = 10 ml', 'Összeadás előtt válts azonos egységre!']
        },
        {
          title: 'Idő',
          items: ['1 perc = 60 másodperc; 1 óra = 60 perc', '1 nap = 24 óra; 1 hét = 7 nap; 1 év = 12 hónap', 'negyed 10 = 9:15; fél 8 = 7:30; háromnegyed 7 = 6:45', 'Időtartam = vége − kezdete']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <MeasurementsExamMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <MeasurementsExamSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default MeasurementsExamQuiz;
