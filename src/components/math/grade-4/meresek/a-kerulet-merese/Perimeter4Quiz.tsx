import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Perimeter4Matcher } from './Perimeter4Matcher';
import { Perimeter4Sorter } from './Perimeter4Sorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek (nem exportált)
// ---------------------------------------------------------------------------
const UNK = '#dc2626';
const LINE = '#0f766e';
const FILL = '#ccfbf1';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const Lbl: React.FC<{ x: number; y: number; t: string; anchor?: 'start' | 'middle' | 'end'; size?: number }> = ({ x, y, t, anchor = 'middle', size = 12 }) => (
  <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight="bold" fill={t.includes('?') ? UNK : '#0f172a'}>
    {t}
  </text>
);

/** Téglalap, alul és jobbra felirattal; középen opcionális szöveg */
const RectFig: React.FC<{ w: number; h: number; a: string; b: string; mid?: string; fill?: string }> = ({ w, h, a, b, mid = 'K = ?', fill = FILL }) => {
  const x = (240 - w) / 2 - 15;
  const y = (150 - h) / 2 - 5;
  return (
    <QFig>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={LINE} strokeWidth="2.5" />
      <Lbl x={x + w / 2} y={y + h + 16} t={a} />
      <Lbl x={x + w + 6} y={y + h / 2 + 4} t={b} anchor="start" />
      {mid && <Lbl x={x + w / 2} y={y + h / 2 + 5} t={mid} size={13} />}
    </QFig>
  );
};

/** Szabályos n-szög, egy oldalán felirat */
const RegularFig: React.FC<{ n: number; side: string; mid?: string }> = ({ n, side, mid = 'K = ?' }) => {
  const cx = 120;
  const cy = 72;
  const r = 52;
  const pts = Array.from({ length: n }, (_, i) => {
    const ang = Math.PI / 2 + Math.PI / n + (2 * Math.PI * i) / n;
    return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)];
  });
  const p0 = pts[0];
  const p1 = pts[n - 1];
  return (
    <QFig>
      <polygon points={pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')} fill={FILL} stroke={LINE} strokeWidth="2.5" />
      <Lbl x={(p0[0] + p1[0]) / 2} y={Math.max(p0[1], p1[1]) + 16} t={side} />
      <Lbl x={cx} y={cy + 5} t={mid} size={13} />
    </QFig>
  );
};

const TriFig: React.FC = () => (
  <QFig>
    <polygon points="50,120 170,120 170,30" fill={FILL} stroke={LINE} strokeWidth="2.5" />
    <path d="M 157 120 A 13 13 0 0 1 170 107" fill="none" stroke="#475569" strokeWidth="1.4" />
    <circle cx="165" cy="115" r="1.8" fill="#475569" />
    <Lbl x={110} y={137} t="4 cm" />
    <Lbl x={176} y={80} t="3 cm" anchor="start" />
    <Lbl x={100} y={68} t="5 cm" anchor="end" />
    <Lbl x={140} y={108} t="K = ?" size={11} />
  </QFig>
);

const GridFig: React.FC<{ cells: [number, number][] }> = ({ cells }) => {
  const u = 22;
  const x0 = 32;
  const y0 = 18;
  return (
    <QFig>
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} x1={x0 + i * u} y1={y0} x2={x0 + i * u} y2={y0 + 5 * u} stroke="#e2e8f0" />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={`h${i}`} x1={x0} y1={y0 + i * u} x2={x0 + 8 * u} y2={y0 + i * u} stroke="#e2e8f0" />
      ))}
      {cells.map(([cx, cy]) => (
        <rect key={`${cx}-${cy}`} x={x0 + cx * u} y={y0 + cy * u} width={u} height={u} fill="#a78bfa" stroke="#6d28d9" />
      ))}
      <line x1="150" y1="138" x2={150 + u} y2="138" stroke="#6d28d9" strokeWidth="3" />
      <text x={156 + u} y="142" fontSize="10" fontWeight="bold" fill="#4c1d95">= 1 egység</text>
      <text x="40" y="142" fontSize="11" fontWeight="bold" fill={UNK}>K = ?</text>
    </QFig>
  );
};

const SticksFig: React.FC<{ kind: 'rect' | 'trap' }> = ({ kind }) => {
  const s = 40;
  const st = (x1: number, y1: number, x2: number, y2: number, k: number) => (
    <g key={k}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d97706" strokeWidth="6" strokeLinecap="round" />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
  const segs: number[][] =
    kind === 'rect'
      ? [
          [80, 40, 120, 40],
          [120, 40, 160, 40],
          [160, 40, 160, 80],
          [160, 80, 120, 80],
          [120, 80, 80, 80],
          [80, 80, 80, 40]
        ]
      : [
          [100, 45, 140, 45],
          [140, 45, 160, 80],
          [160, 80, 120, 80],
          [120, 80, 80, 80],
          [80, 80, 100, 45]
        ];
  return (
    <QFig h={130}>
      {segs.map((g, i) => st(g[0], g[1], g[2], g[3], i))}
      <line x1="40" y1="108" x2={40 + s} y2="108" stroke="#d97706" strokeWidth="6" strokeLinecap="round" />
      <text x={48 + s} y="112" fontSize="11" fontWeight="bold" fill="#78350f">1 pálcika = 8 cm</text>
      <text x="200" y="66" fontSize="13" fontWeight="bold" fill={UNK}>K = ?</text>
    </QFig>
  );
};

const GardenFig: React.FC<{ hl: 'all' | 'veg' | 'grass' }> = ({ hl }) => {
  const x0 = 20;
  const y0 = 22;
  const u = 8.4;
  const W = 22 * u;
  const H = 12 * u;
  return (
    <QFig>
      <rect x={x0} y={y0} width={W} height={H} fill="#bbf7d0" stroke={hl === 'all' ? UNK : '#14532d'} strokeWidth={hl === 'all' ? 3.5 : 1.5} />
      <rect x={x0 + 17 * u} y={y0} width={5 * u} height={H} fill="#65a30d" stroke={hl === 'veg' ? UNK : '#14532d'} strokeWidth={hl === 'veg' ? 3.5 : 1.5} />
      {hl === 'grass' && <rect x={x0} y={y0} width={17 * u} height={H} fill="none" stroke={UNK} strokeWidth="3.5" />}
      <rect x={x0 + 3 * u} y={y0 + 2 * u} width={9 * u} height={6 * u} fill="#fde68a" stroke="#78350f" />
      <text x={x0 + 7.5 * u} y={y0 + 5.5 * u} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350f">ház</text>
      <Lbl x={x0 + W / 2} y={y0 + H + 16} t="22 m" size={11} />
      <Lbl x={x0 + 19.5 * u} y={y0 - 6} t="5 m" size={11} />
      <Lbl x={x0 + W + 4} y={y0 + H / 2 + 4} t="12 m" anchor="start" size={11} />
    </QFig>
  );
};

const PoolFig: React.FC = () => (
  <QFig>
    <rect x="30" y="25" width="150" height="90" fill="#7dd3fc" stroke="#0369a1" strokeWidth="2.5" />
    {[1, 2, 3, 4].map((i) => (
      <line key={i} x1="34" y1={25 + i * 18} x2="176" y2={25 + i * 18} stroke="#fff" strokeDasharray="6 4" />
    ))}
    <Lbl x={105} y={134} t="33 m" />
    <Lbl x={186} y={74} t="21 m" anchor="start" />
    <Lbl x={105} y={74} t="K = ?" size={13} />
  </QFig>
);

const HexSandFig: React.FC = () => (
  <RegularFig n={6} side="3 m" mid="K = ?" />
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const PERIMETER4_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'p4-q1',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Mit jelent egy síkidom kerülete?',
    options: [
      'Az oldalai hosszának összegét',
      'Hány négyzet fedi le a belsejét',
      'A leghosszabb oldala hosszát',
      'Hány oldala van'
    ],
    correctAnswer: 0,
    explanation: 'A kerület a síkidomot körbevevő vonal hossza: összeadjuk az összes oldalát. A belsejét lefedő négyzetek a területhez tartoznak.'
  },
  {
    id: 'p4-q2',
    level: 1,
    questionTypeBadge: 'Háromszög',
    figure: <TriFig />,
    question: 'Mennyi a háromszög kerülete?',
    options: ['12 cm', '7 cm', '9 cm', '60 cm'],
    correctAnswer: 0,
    explanation: 'Összeadjuk a három oldalt: 3 cm + 4 cm + 5 cm = 12 cm.'
  },
  {
    id: 'p4-q3',
    level: 1,
    questionTypeBadge: 'Négyzet',
    figure: <RectFig w={90} h={90} a="5 cm" b="5 cm" />,
    question: 'Mennyi az 5 cm oldalú négyzet kerülete?',
    options: ['20 cm', '25 cm', '10 cm', '15 cm'],
    correctAnswer: 0,
    explanation: 'A négyzetnek 4 egyenlő oldala van: 4 · 5 cm = 20 cm. (A 25 a terület mérőszáma lenne.)'
  },
  {
    id: 'p4-q4',
    level: 1,
    questionTypeBadge: 'Téglalap',
    figure: <RectFig w={130} h={86} a="6 cm" b="4 cm" />,
    question: 'Mennyi a 6 cm és 4 cm oldalú téglalap kerülete?',
    options: ['20 cm', '10 cm', '24 cm', '14 cm'],
    correctAnswer: 0,
    explanation: 'K = 6 cm + 4 cm + 6 cm + 4 cm = 20 cm. Ha csak 6 + 4-et számolsz, az csak a kerület fele.'
  },
  {
    id: 'p4-q5',
    level: 1,
    questionTypeBadge: 'Négyzetrács',
    figure: (
      <GridFig
        cells={[
          [2, 1],
          [3, 1],
          [4, 1],
          [2, 2],
          [3, 2],
          [4, 2]
        ]}
      />
    ),
    question: 'Hány egység a lila téglalap kerülete?',
    options: ['10 egység', '6 egység', '5 egység', '12 egység'],
    correctAnswer: 0,
    explanation: 'A téglalap 3 egység hosszú és 2 egység széles: 3 + 2 + 3 + 2 = 10 egység. (6 a kis négyzetek száma, az a terület.)'
  },
  {
    id: 'p4-q6',
    level: 1,
    questionTypeBadge: 'Pálcikák',
    question: 'Négy 8 cm-es pálcikából négyzetet raksz ki. Mennyi a kerülete?',
    options: ['32 cm', '8 cm', '16 cm', '64 cm'],
    correctAnswer: 0,
    explanation: 'A négyzet minden oldala egy pálcika: 4 · 8 cm = 32 cm.'
  },
  {
    id: 'p4-q7',
    level: 1,
    questionTypeBadge: 'Egyenlő oldalú sokszög',
    figure: <RegularFig n={3} side="40 mm" />,
    question: 'Az egyenlő oldalú háromszög minden oldala 40 mm. Mennyi a kerülete?',
    options: ['120 mm', '40 mm', '80 mm', '160 mm'],
    correctAnswer: 0,
    explanation: 'Három egyforma oldal: 3 · 40 mm = 120 mm (= 12 cm).'
  },
  {
    id: 'p4-q8',
    level: 1,
    questionTypeBadge: 'Egyenlő oldalú sokszög',
    figure: <HexSandFig />,
    question: 'A hatszög alakú homokozó minden oldala 3 m. Hány méter deszka kell a körbekerítéséhez?',
    options: ['18 m', '9 m', '12 m', '6 m'],
    correctAnswer: 0,
    explanation: 'A hatszögnek 6 oldala van: 6 · 3 m = 18 m.'
  },
  {
    id: 'p4-q9',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Melyik mértékegységben adhatjuk meg egy kert kerületét?',
    options: ['méterben', 'kilogrammban', 'literben', 'percben'],
    correctAnswer: 0,
    explanation: 'A kerület hosszúság, ezért hosszúság-mértékegységben (mm, cm, m, km) adjuk meg.'
  },
  {
    id: 'p4-q10',
    level: 1,
    questionTypeBadge: 'Egyenlő oldalú sokszög',
    figure: <RegularFig n={5} side="4 cm" />,
    question: 'Az ötszög minden oldala 4 cm. Mennyi a kerülete?',
    options: ['20 cm', '16 cm', '24 cm', '9 cm'],
    correctAnswer: 0,
    explanation: 'Öt egyforma oldal: 5 · 4 cm = 20 cm.'
  },

  // ---------- 2. szint ----------
  {
    id: 'p4-q11',
    level: 2,
    questionTypeBadge: 'Téglalap',
    figure: <PoolFig />,
    question: 'Hány métert tesz meg Manó, ha körbejárja a 33 m hosszú és 21 m széles medencét?',
    options: ['108 m', '54 m', '87 m', '693 m'],
    correctAnswer: 0,
    explanation: '33 m + 21 m + 33 m + 21 m = 108 m. Az 54 m csak két oldal, a 87 m-nél egy oldal kimaradt.'
  },
  {
    id: 'p4-q12',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    figure: <RectFig w={90} h={90} a="2000 mm" b="2000 mm" mid="? m" fill="#fde68a" />,
    question: 'A négyzet alakú homokozó oldala 2000 mm. Hány méter deszka kell köré?',
    options: ['8 m', '4 m', '2 m', '8000 m'],
    correctAnswer: 0,
    explanation: '2000 mm = 2 m. A négyzet kerülete 4 · 2 m = 8 m.'
  },
  {
    id: 'p4-q13',
    level: 2,
    questionTypeBadge: 'Téglalap',
    figure: <RectFig w={130} h={90} a="500 mm" b="350 mm" mid="keret = ?" fill="#fef3c7" />,
    question: 'Milyen hosszú keret kell az 500 mm × 350 mm-es tablóhoz?',
    options: ['1700 mm', '850 mm', '1350 mm', '1200 mm'],
    correctAnswer: 0,
    explanation: '500 + 350 + 500 + 350 = 1700 mm.'
  },
  {
    id: 'p4-q14',
    level: 2,
    questionTypeBadge: 'Téglalap',
    question: 'Milyen hosszú keret kell a 420 mm × 297 mm-es papírhoz?',
    options: ['1434 mm', '717 mm', '1334 mm', '1137 mm'],
    correctAnswer: 0,
    explanation: '420 + 297 = 717, és ez kétszer kell: 717 + 717 = 1434 mm. Vigyázz az átvitelre!'
  },
  {
    id: 'p4-q15',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    figure: <RectFig w={90} h={90} a="2 m 50 cm" b="2 m 50 cm" fill="#bae6fd" />,
    question: 'A négyzet alakú kerti tó oldala 2 m 50 cm. Mennyi a kerülete?',
    options: ['10 m', '8 m 50 cm', '9 m', '5 m'],
    correctAnswer: 0,
    explanation: '2 m 50 cm = 250 cm. 4 · 250 cm = 1000 cm = 10 m. (A 8 m 50 cm-nél csak a métereket szorozták 4-gyel.)'
  },
  {
    id: 'p4-q16',
    level: 2,
    questionTypeBadge: 'Pálcikák',
    figure: <SticksFig kind="rect" />,
    question: 'Mennyi a pálcikákból kirakott téglalap kerülete?',
    options: ['48 cm', '24 cm', '16 cm', '32 cm'],
    correctAnswer: 0,
    explanation: 'A téglalap határán 6 pálcika van: 6 · 8 cm = 48 cm.'
  },
  {
    id: 'p4-q17',
    level: 2,
    questionTypeBadge: 'Négyzetrács',
    figure: (
      <GridFig
        cells={[
          [2, 1],
          [2, 2],
          [3, 2],
          [4, 2]
        ]}
      />
    ),
    question: 'Hány egység a lila alakzat kerülete?',
    options: ['10 egység', '4 egység', '8 egység', '12 egység'],
    correctAnswer: 0,
    explanation: 'Járd körbe, és számold a határ darabjait: 10 egység. (A 4 a négyzetek száma.)'
  },
  {
    id: 'p4-q18',
    level: 2,
    questionTypeBadge: 'Pálcikák',
    figure: <SticksFig kind="trap" />,
    question: 'Mennyi a pálcikákból kirakott trapéz kerülete?',
    options: ['40 cm', '32 cm', '48 cm', '5 cm'],
    correctAnswer: 0,
    explanation: 'A határon 5 pálcika van (alul kettő): 5 · 8 cm = 40 cm.'
  },
  {
    id: 'p4-q19',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyiknek hosszabb a kerülete: az 5 cm oldalú négyzetnek vagy a 6 cm és 3 cm oldalú téglalapnak?',
    options: ['A négyzetnek, 2 cm-rel', 'A téglalapnak, 2 cm-rel', 'Egyenlő a kerületük', 'A téglalapnak, 1 cm-rel'],
    correctAnswer: 0,
    explanation: 'Négyzet: 4 · 5 = 20 cm. Téglalap: 6 + 3 + 6 + 3 = 18 cm. A négyzeté 2 cm-rel hosszabb.'
  },
  {
    id: 'p4-q20',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'Egy háromszög oldalai 2 dm, 15 cm és 25 cm. Mennyi a kerülete?',
    options: ['60 cm', '42 cm', '40 cm', '600 cm'],
    correctAnswer: 0,
    explanation: 'Előbb váltsunk: 2 dm = 20 cm. 20 cm + 15 cm + 25 cm = 60 cm. (A 42 akkor jön ki, ha a 2 dm-t 2 cm-nek veszed.)'
  },

  // ---------- 3. szint ----------
  {
    id: 'p4-q21',
    level: 3,
    questionTypeBadge: 'Kerítés',
    figure: <GardenFig hl="all" />,
    question: 'Hány méter drótkerítés kell a 22 m hosszú és 12 m széles telek körbekerítéséhez?',
    options: ['68 m', '34 m', '46 m', '264 m'],
    correctAnswer: 0,
    explanation: '22 m + 12 m + 22 m + 12 m = 68 m.'
  },
  {
    id: 'p4-q22',
    level: 3,
    questionTypeBadge: 'Kerítés',
    figure: <GardenFig hl="all" />,
    question: 'A 68 m-es kerítéshez 2 méterenként állítanak oszlopot körben. Hány oszlop kell?',
    options: ['34 oszlop', '35 oszlop', '68 oszlop', '17 oszlop'],
    correctAnswer: 0,
    explanation: '68 : 2 = 34 szakasz. Körben ahány szakasz, annyi oszlop: 34. (Egyenes vonalon kellene még egy, de itt körbeér.)'
  },
  {
    id: 'p4-q23',
    level: 3,
    questionTypeBadge: 'Kerítés',
    figure: <GardenFig hl="veg" />,
    question: 'A veteményeskert 5 m széles és 12 m hosszú. Hány méter drót kell, ha csak ezt kerítik körbe?',
    options: ['34 m', '17 m', '29 m', '60 m'],
    correctAnswer: 0,
    explanation: '5 m + 12 m + 5 m + 12 m = 34 m.'
  },
  {
    id: 'p4-q24',
    level: 3,
    questionTypeBadge: 'Kerítés',
    figure: <GardenFig hl="grass" />,
    question: 'Hány méter drót kell a ház körüli füves terület (a telek a veteményes nélkül) körbekerítéséhez?',
    options: ['58 m', '68 m', '46 m', '29 m'],
    correctAnswer: 0,
    explanation: 'A füves rész szélessége 22 m − 5 m = 17 m. K = 17 + 12 + 17 + 12 = 58 m.'
  },
  {
    id: 'p4-q25',
    level: 3,
    questionTypeBadge: 'Hiányzó oldal',
    figure: <RectFig w={130} h={80} a="6 cm" b="? cm" mid="K = 20 cm" />,
    question: 'Egy téglalap kerülete 20 cm, egyik oldala 6 cm. Milyen hosszú a másik oldala?',
    options: ['4 cm', '14 cm', '8 cm', '10 cm'],
    correctAnswer: 0,
    explanation: 'Egy hosszú és egy rövid oldal együtt a kerület fele: 20 : 2 = 10 cm. 10 cm − 6 cm = 4 cm.'
  },
  {
    id: 'p4-q26',
    level: 3,
    questionTypeBadge: 'Hiányzó oldal',
    figure: <RectFig w={90} h={90} a="? m" b="" mid="K = 36 m" />,
    question: 'Egy négyzet alakú kert kerülete 36 m. Milyen hosszú egy oldala?',
    options: ['9 m', '18 m', '6 m', '32 m'],
    correctAnswer: 0,
    explanation: 'A négyzetnek 4 egyenlő oldala van: 36 m : 4 = 9 m.'
  },
  {
    id: 'p4-q27',
    level: 3,
    questionTypeBadge: 'Hiányzó oldal',
    question: 'Egy négyzet kerülete 2 m 40 cm. Hány centiméter egy oldala?',
    options: ['60 cm', '6 cm', '120 cm', '80 cm'],
    correctAnswer: 0,
    explanation: '2 m 40 cm = 240 cm. 240 cm : 4 = 60 cm.'
  },
  {
    id: 'p4-q28',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Az egyik kerti tó négyzet alakú, oldala 2500 mm. A másik téglalap, oldalai 3 m és 2 m. Melyiknek hosszabb a kerülete?',
    options: ['Egyenlő a kerületük', 'A négyzeté 2 m-rel', 'A téglalapé 1 m-rel', 'A négyzeté 500 mm-rel'],
    correctAnswer: 0,
    explanation: 'Négyzet: 2500 mm = 2 m 50 cm, 4 · 250 cm = 1000 cm = 10 m. Téglalap: 3 + 2 + 3 + 2 = 10 m. Egyenlők!'
  },
  {
    id: 'p4-q29',
    level: 3,
    questionTypeBadge: 'Változás',
    question: 'Egy 3 cm oldalú négyzet oldalait kétszeresére növeljük. Mi történik a kerületével?',
    options: ['A kétszeresére nő', 'A négyszeresére nő', 'Nem változik', '3 cm-rel nő'],
    correctAnswer: 0,
    explanation: 'Előtte: 4 · 3 = 12 cm. Utána: 4 · 6 = 24 cm. A 24 a 12-nek a kétszerese.'
  },
  {
    id: 'p4-q30',
    level: 3,
    questionTypeBadge: 'Egyenlő oldalú sokszög',
    question: 'Egy egyenlő oldalú sokszög minden oldala 40 mm, a kerülete 240 mm. Milyen sokszög ez?',
    options: ['hatszög', 'ötszög', 'nyolcszög', 'négyszög'],
    correctAnswer: 0,
    explanation: '240 mm : 40 mm = 6, tehát 6 oldala van: hatszög.'
  }
];

export const Perimeter4Quiz: React.FC<{
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
      topicId="g4-meas-kerulet-quiz"
      subtopicId="a-kerulet-merese"
      title="2. A kerület mérése – Kvíz"
      subtitle="30 feladat 3 szinten: kerület négyzetrácson, téglalap, négyzet, sokszögek, kerítések és hiányzó oldalak."
      badge="4. OSZTÁLY • II. MÉRÉSEK • KVÍZ"
      questions={PERIMETER4_QUESTIONS}
      cheatSheets={[
        {
          title: 'Mi a kerület?',
          items: [
            'A kerület a síkidomot körbevevő vonal hossza.',
            'Kiszámítása: összeadjuk az összes oldalt.',
            'Mértékegysége hosszúság: mm, cm, dm, m, km.',
            'Négyzetrácson: számold a határ darabjait.'
          ]
        },
        {
          title: 'Téglalap és négyzet',
          items: [
            'Téglalap: K = a + b + a + b',
            'Négyzet: K = 4 · a',
            'Egyenlő oldalú sokszög: oldalak száma · oldal',
            'Hiányzó oldal: K : 2, majd kivonjuk az ismert oldalt.'
          ]
        },
        {
          title: 'Figyelj rá!',
          items: [
            'Összeadás előtt válts azonos mértékegységre!',
            '2000 mm = 200 cm = 2 m',
            'Körben ahány szakasz, annyi oszlop.',
            'Kerület ≠ terület: a terület a belső négyzetek száma.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Perimeter4Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Perimeter4Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Perimeter4Quiz;
