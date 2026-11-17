import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { LengthG3Matcher } from './LengthG3Matcher';
import { LengthG3Sorter } from './LengthG3Sorter';
import { FONT, Ruler, Seg, Pencil, GridPath, Ant, Door, BookSide, Dir } from './LengthG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Szakasz (vagy ceruza) vonalzó fölött. from/to cm-ben, tizedessel = mm. */
const RulerQ: React.FC<{ from?: number; to: number; cm?: number; mm?: boolean; pencil?: boolean }> = ({ from = 0, to, cm = 8, mm = false, pencil = false }) => {
  const pad = 8;
  const s = (224 - 2 * pad) / cm;
  const X = 8;
  const x0 = X + pad;
  return (
    <QFig h={104}>
      {pencil ? (
        <Pencil x1={x0 + from * s} x2={x0 + to * s} y={30} t={14} />
      ) : (
        <Seg x1={x0 + from * s} x2={x0 + to * s} y={30} color="#2563eb" w={4} />
      )}
      <Ruler x={X} y={50} cm={cm} s={s} mm={mm} h={40} fontSize={13} />
    </QFig>
  );
};

/** 1 cm kinagyítva, 10 kis rész. */
const MmZoomFig: React.FC = () => (
  <QFig h={110}>
    <rect x="20" y="30" width="200" height="40" fill="#fde047" stroke="#a16207" strokeWidth="1.5" />
    {Array.from({ length: 11 }, (_, i) => (
      <line key={i} x1={20 + i * 20} y1={30} x2={20 + i * 20} y2={i % 10 === 0 ? 58 : i === 5 ? 50 : 44} stroke="#1e293b" strokeWidth={i % 10 === 0 ? 2 : 1.2} />
    ))}
    <text x="20" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b">0</text>
    <text x="220" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b">1 cm</text>
    <text x="120" y="96" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>1 cm = ? mm</text>
  </QFig>
);

/** Egyforma darabok egymás után (pl. dm-ek), a végén „?”. */
const PiecesFig: React.FC<{ n: number; label: string; ask: string; color?: string }> = ({ n, label, ask, color = '#fb923c' }) => {
  const w = Math.min(50, 200 / n);
  const x0 = (240 - n * w) / 2;
  return (
    <QFig h={100}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={x0 + i * w} y={26} width={w} height={22} fill={i % 2 ? '#ffffff' : color} stroke="#334155" strokeWidth="1.4" />
          <text x={x0 + i * w + w / 2} y={41} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{label}</text>
        </g>
      ))}
      <text x="120" y="80" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>{ask}</text>
    </QFig>
  );
};

/** 2 méterrúd és néhány dm-es darab. */
const MetersAndDmFig: React.FC<{ m: number; dm: number }> = ({ m, dm }) => {
  const mW = 70;
  const dW = 7;
  const total = m * mW + dm * dW;
  const x0 = (240 - total) / 2;
  return (
    <QFig h={100}>
      {Array.from({ length: m }, (_, i) => (
        <g key={i}>
          <rect x={x0 + i * mW} y={26} width={mW} height={22} fill={i % 2 ? '#bbf7d0' : '#22c55e'} stroke="#14532d" strokeWidth="1.4" />
          <text x={x0 + i * mW + mW / 2} y={42} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#052e16">1 m</text>
        </g>
      ))}
      {Array.from({ length: dm }, (_, i) => (
        <rect key={`d${i}`} x={x0 + m * mW + i * dW} y={26} width={dW} height={22} fill={i % 2 ? '#ffffff' : '#fb923c'} stroke="#334155" strokeWidth="1" />
      ))}
      <text x={x0 + m * mW + (dm * dW) / 2} y={64} textAnchor="middle" fontSize="11" fill="#c2410c">{dm} dm</text>
      <text x="120" y="88" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>Összesen ? dm</text>
    </QFig>
  );
};

/** Négyzetrácsos út. */
const PathFig: React.FC<{ start: [number, number]; path: Dir[]; cols?: number; rows?: number; note?: string }> = ({ start, path, cols = 8, rows = 4, note = '1 kis négyzet oldala 10 cm' }) => {
  const s = 22;
  const x = (240 - cols * s) / 2;
  return (
    <QFig h={rows * s + 44}>
      <GridPath x={x} y={10} cols={cols} rows={rows} s={s} start={start} path={path} w={3.5} />
      <text x="120" y={rows * s + 34} textAnchor="middle" fontSize="12" fill="#334155">{note}</text>
    </QFig>
  );
};

/** Ugrások egy egyenes mentén, az utolsó ismeretlen. */
const JumpsFig: React.FC<{ parts: string[]; ws: number[]; total: string }> = ({ parts, ws, total }) => {
  const sum = ws.reduce((a, b) => a + b, 0);
  const k = 210 / sum;
  let x = 15;
  const xs = ws.map((w) => {
    const a = x;
    x += w * k;
    return a;
  });
  return (
    <QFig h={110}>
      <line x1="15" y1="40" x2="225" y2="40" stroke="#0369a1" strokeWidth="2.5" />
      {[...xs, 225].map((p, i) => (
        <line key={i} x1={p} y1={32} x2={p} y2={48} stroke="#0369a1" strokeWidth="2.5" />
      ))}
      {ws.map((w, i) => (
        <g key={i}>
          <path d={`M ${xs[i] + 2} 30 q ${(w * k) / 2 - 2} -22 ${w * k - 4} 0`} fill="none" stroke="#16a34a" strokeWidth="1.8" />
          <text x={xs[i] + (w * k) / 2} y={64} textAnchor="middle" fontSize="12" fontWeight="bold" fill={parts[i].includes('?') ? UNK : '#1e293b'}>{parts[i]}</text>
        </g>
      ))}
      <path d="M 15 74 q 0 8 10 8 h 85 q 10 0 10 8 q 0 -8 10 -8 h 85 q 10 0 10 -8" fill="none" stroke="#475569" strokeWidth="1.5" />
      <text x="120" y="104" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">összesen {total}</text>
    </QFig>
  );
};

/** Szalag: az egészből levágunk egy darabot. */
const RibbonFig: React.FC<{ whole: string; cut: string; cutFrac: number }> = ({ whole, cut, cutFrac }) => {
  const W = 200;
  const c = W * cutFrac;
  return (
    <QFig h={104}>
      <text x="120" y="20" textAnchor="middle" fontSize="12" fill="#334155">az egész szalag: {whole}</text>
      <rect x="20" y="30" width={c} height="20" fill="#f472b6" stroke="#9d174d" strokeWidth="1.5" />
      <rect x={20 + c} y="30" width={W - c} height="20" fill="#fbcfe8" stroke="#9d174d" strokeWidth="1.5" />
      <line x1={20 + c} y1="24" x2={20 + c} y2="56" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 2" />
      <text x={20 + c / 2} y="72" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9d174d">levágjuk: {cut}</text>
      <text x={20 + c + (W - c) / 2} y="72" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>marad: ?</text>
    </QFig>
  );
};

/** Számegyenes két egész méter között, dm-es osztással. */
const MeterLineFig: React.FC<{ a: number; dm: number }> = ({ a, dm }) => (
  <QFig h={100}>
    <line x1="20" y1="50" x2="220" y2="50" stroke="#334155" strokeWidth="2.5" />
    {Array.from({ length: 11 }, (_, i) => (
      <line key={i} x1={20 + i * 20} y1={i % 10 === 0 ? 38 : i === 5 ? 42 : 45} x2={20 + i * 20} y2={i % 10 === 0 ? 62 : i === 5 ? 58 : 55} stroke="#334155" strokeWidth={i % 10 === 0 ? 2.5 : 1.4} />
    ))}
    <text x="20" y="80" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{a} m</text>
    <text x="220" y="80" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{a + 1} m</text>
    <circle cx={20 + dm * 20} cy="50" r="6" fill={UNK} stroke="#fff" strokeWidth="1.5" />
    <text x={20 + dm * 20} y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>a kígyó</text>
  </QFig>
);

/** Egyforma könyvek egymáson. */
const BooksFig: React.FC<{ n: number; each: string }> = ({ n, each }) => {
  const t = 16;
  const colors = ['#2563eb', '#16a34a', '#db2777', '#f59e0b', '#7c3aed'];
  const top = 96 - n * t;
  return (
    <QFig h={110}>
      {Array.from({ length: n }, (_, i) => (
        <BookSide key={i} x={30 + (i % 2) * 4} y={96 - (i + 1) * t} w={90} t={t} color={colors[i % colors.length]} />
      ))}
      <line x1="20" y1="96" x2="140" y2="96" stroke="#334155" strokeWidth="2" />
      <path d={`M 132 ${top} h 8 v ${n * t} h -8`} fill="none" stroke={UNK} strokeWidth="2" />
      <text x="146" y={top + (n * t) / 2 + 5} fontSize="16" fontWeight="bold" fill={UNK}>?</text>
      <text x="170" y="40" textAnchor="middle" fontSize="12" fill="#334155">1 könyv:</text>
      <text x="196" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">{each}</text>
    </QFig>
  );
};

/** Két magasság egymás mellett. */
const TwoHeightsFig: React.FC = () => (
  <QFig h={130}>
    <line x1="20" y1="116" x2="220" y2="116" stroke="#334155" strokeWidth="2" />
    <rect x="40" y="12" width="60" height="104" fill="#a16207" stroke="#713f12" strokeWidth="2" />
    <line x1="70" y1="16" x2="70" y2="112" stroke="#713f12" strokeWidth="1.4" />
    <text x="70" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">2 m 10 cm</text>
    <rect x="140" y="54" width="60" height="62" fill="#d97706" stroke="#713f12" strokeWidth="2" />
    <line x1="140" y1="85" x2="200" y2="85" stroke="#713f12" strokeWidth="1.4" />
    <text x="170" y="78" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#ffffff">?</text>
    <line x1="210" y1="12" x2="210" y2="54" stroke="#7c3aed" strokeWidth="2" />
    <line x1="204" y1="12" x2="216" y2="12" stroke="#7c3aed" strokeWidth="2" />
    <line x1="204" y1="54" x2="216" y2="54" stroke="#7c3aed" strokeWidth="2" />
    <line x1="100" y1="12" x2="206" y2="12" stroke="#7c3aed" strokeWidth="1" strokeDasharray="3 2" />
    <text x="168" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">85 cm</text>
    <text x="168" y="45" textAnchor="middle" fontSize="11" fill="#7c3aed">alacsonyabb</text>
  </QFig>
);

/** Kiegészítés 1 dm-re. */
const ExtendFig: React.FC = () => {
  const k = 2;
  return (
    <QFig h={110}>
      <Seg x1={20} x2={20 + 68 * k} y={36} color="#2563eb" w={4} />
      <Seg x1={20 + 68 * k} x2={20 + 100 * k} y={36} color={UNK} w={4} />
      <text x={20 + 34 * k} y="60" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">68 mm</text>
      <text x={20 + 84 * k} y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill={UNK}>?</text>
      <path d="M 20 70 q 0 8 10 8 h 80 q 10 0 10 8 q 0 -8 10 -8 h 80 q 10 0 10 -8" fill="none" stroke="#475569" strokeWidth="1.5" />
      <text x="120" y="98" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">összesen 1 dm</text>
    </QFig>
  );
};

/** Lábnyomok: n lépés. */
const StepsFig: React.FC<{ n: number; each: string }> = ({ n, each }) => (
  <QFig h={100}>
    {Array.from({ length: n }, (_, i) => (
      <g key={i} transform={`translate(${28 + i * 32},${i % 2 ? 34 : 50})`}>
        <ellipse cx="0" cy="0" rx="10" ry="6" fill="#92400e" />
        <circle cx="12" cy="-3" r="2.4" fill="#92400e" />
        <circle cx="12" cy="3" r="2.4" fill="#92400e" />
      </g>
    ))}
    <text x="120" y="80" textAnchor="middle" fontSize="13" fill="#334155">{n} lépés, egy lépés {each}</text>
    <text x="120" y="96" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>összesen ?</text>
  </QFig>
);

const PencilFig: React.FC = () => (
  <QFig h={80}>
    <Pencil x1={30} x2={190} y={32} t={18} />
    <text x="120" y="68" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>17 □</text>
  </QFig>
);

const AntFig: React.FC = () => (
  <QFig h={90}>
    <Ant cx={120} cy={42} k={2.6} />
    <text x="120" y="82" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>Milyen hosszú?</text>
  </QFig>
);

const DoorFig: React.FC = () => (
  <QFig h={130}>
    <Door x={70} y={14} w={50} h={104} />
    <line x1="140" y1="14" x2="140" y2="118" stroke={UNK} strokeWidth="2.5" />
    <line x1="132" y1="14" x2="148" y2="14" stroke={UNK} strokeWidth="2.5" />
    <line x1="132" y1="118" x2="148" y2="118" stroke={UNK} strokeWidth="2.5" />
    <text x="160" y="72" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const LENGTH_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'leng3-q1',
    level: 1,
    questionTypeBadge: 'Vonalzó',
    figure: <RulerQ to={7} pencil />,
    question: 'Milyen hosszú a ceruza?',
    options: ['7 cm', '8 cm', '6 cm', '70 cm'],
    correctAnswer: 0,
    explanation: 'A ceruza a 0-nál kezdődik és a 7-nél ér véget. Tehát 7 cm hosszú.'
  },
  {
    id: 'leng3-q2',
    level: 1,
    questionTypeBadge: 'Milliméter',
    figure: <MmZoomFig />,
    question: 'Hány milliméter 1 centiméter?',
    options: ['10 mm', '100 mm', '1 mm', '1000 mm'],
    correctAnswer: 0,
    explanation: 'Az 1 cm-t 10 kis részre osztották. Egy rész 1 mm. Tehát 1 cm = 10 mm.'
  },
  {
    id: 'leng3-q3',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    question: 'Hány centiméter 1 méter?',
    options: ['100 cm', '10 cm', '1000 cm', '50 cm'],
    correctAnswer: 0,
    explanation: '1 m = 10 dm, és 1 dm = 10 cm. Így 1 m = 100 cm.'
  },
  {
    id: 'leng3-q4',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    question: 'Hány centiméter 1 deciméter?',
    options: ['10 cm', '100 cm', '1 cm', '20 cm'],
    correctAnswer: 0,
    explanation: '1 dm = 10 cm. A vonalzódon a 0-tól a 10-ig pont 1 dm.'
  },
  {
    id: 'leng3-q5',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    figure: <PiecesFig n={4} label="1 dm" ask="4 dm = ? cm" />,
    question: '4 dm = □ cm. Mi kerül a □ helyére?',
    options: ['40', '4', '400', '14'],
    correctAnswer: 0,
    explanation: '1 dm = 10 cm. 4 dm = 4 · 10 cm = 40 cm.'
  },
  {
    id: 'leng3-q6',
    level: 1,
    questionTypeBadge: 'Becslés',
    figure: <AntFig />,
    question: 'Milyen hosszú lehet egy hangya?',
    options: ['4 mm', '4 cm', '4 dm', '4 m'],
    correctAnswer: 0,
    explanation: 'A hangya nagyon kicsi, rövidebb 1 cm-nél. Ezért mm-ben mérjük: kb. 4 mm.'
  },
  {
    id: 'leng3-q7',
    level: 1,
    questionTypeBadge: 'Becslés',
    figure: <DoorFig />,
    question: 'Milyen magas lehet egy szobaajtó?',
    options: ['2 m', '2 dm', '2 cm', '20 m'],
    correctAnswer: 0,
    explanation: 'Egy ajtó magasabb egy felnőttnél. Ez kb. 2 m. A 2 dm csak egy tenyérnyi, a 20 m egy ház magassága.'
  },
  {
    id: 'leng3-q8',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a leghosszabb?',
    options: ['1 m', '90 cm', '9 dm', '99 mm'],
    correctAnswer: 0,
    explanation: 'Váltsuk cm-re! 1 m = 100 cm, 9 dm = 90 cm, 99 mm = 9 cm 9 mm. A leghosszabb az 1 m.'
  },
  {
    id: 'leng3-q9',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    question: '30 mm = □ cm. Mi kerül a □ helyére?',
    options: ['3', '30', '300', '13'],
    correctAnswer: 0,
    explanation: '10 mm = 1 cm. A 30 mm-ben 3-szor van meg a 10 mm. Tehát 30 mm = 3 cm.'
  },
  {
    id: 'leng3-q10',
    level: 1,
    questionTypeBadge: 'Mérőeszköz',
    question: 'Mivel mérnéd meg a tanterem hosszát?',
    options: ['mérőszalaggal', 'konyhai mérleggel', 'mérőpohárral', 'hőmérővel'],
    correctAnswer: 0,
    explanation: 'Hosszúságot mérünk, ezért vonalzó vagy mérőszalag kell. A terem hosszú, ezért a mérőszalag a jó.'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'leng3-q11',
    level: 2,
    questionTypeBadge: 'Milliméter',
    figure: <RulerQ to={3.8} cm={5} mm />,
    question: 'Hány milliméter hosszú a kék szakasz?',
    options: ['38 mm', '3 mm', '83 mm', '48 mm'],
    correctAnswer: 0,
    explanation: 'A szakasz 3 cm és még 8 kis vonás. 3 cm = 30 mm. 30 mm + 8 mm = 38 mm.'
  },
  {
    id: 'leng3-q12',
    level: 2,
    questionTypeBadge: 'Vonalzó',
    figure: <RulerQ from={2} to={9} cm={10} />,
    question: 'Milyen hosszú a kék szakasz? Figyeld meg, hol kezdődik!',
    options: ['7 cm', '9 cm', '11 cm', '2 cm'],
    correctAnswer: 0,
    explanation: 'A szakasz a 2-nél kezdődik és a 9-nél végződik. 9 − 2 = 7. Tehát 7 cm.'
  },
  {
    id: 'leng3-q13',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '3 m = □ dm. Mi kerül a □ helyére?',
    options: ['30', '300', '3', '13'],
    correctAnswer: 0,
    explanation: '1 m = 10 dm. 3 m = 3 · 10 dm = 30 dm.'
  },
  {
    id: 'leng3-q14',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    figure: <MetersAndDmFig m={2} dm={6} />,
    question: '2 m 6 dm = □ dm. Mi kerül a □ helyére?',
    options: ['26', '206', '8', '260'],
    correctAnswer: 0,
    explanation: '2 m = 20 dm. 20 dm + 6 dm = 26 dm.'
  },
  {
    id: 'leng3-q15',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '1 m 45 cm = □ cm. Mi kerül a □ helyére?',
    options: ['145', '1045', '46', '154'],
    correctAnswer: 0,
    explanation: '1 m = 100 cm. 100 cm + 45 cm = 145 cm.'
  },
  {
    id: 'leng3-q16',
    level: 2,
    questionTypeBadge: 'Milliméter',
    figure: <RulerQ to={5.2} cm={6} mm pencil />,
    question: 'A ceruza 5 cm 2 mm hosszú. Hány milliméter ez?',
    options: ['52 mm', '7 mm', '502 mm', '25 mm'],
    correctAnswer: 0,
    explanation: '5 cm = 50 mm. 50 mm + 2 mm = 52 mm.'
  },
  {
    id: 'leng3-q17',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '600 cm = □. Melyik a jó?',
    options: ['6 m', '60 m', '600 m', '6 dm'],
    correctAnswer: 0,
    explanation: '100 cm = 1 m. A 600-ban 6-szor van meg a 100. Tehát 600 cm = 6 m.'
  },
  {
    id: 'leng3-q18',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a hosszabb: 3 dm vagy 25 cm?',
    options: ['3 dm, mert 3 dm = 30 cm', '25 cm, mert 25 több, mint 3', 'Egyforma hosszúak.', 'Nem lehet összehasonlítani.'],
    correctAnswer: 0,
    explanation: 'Előbb azonos egységre váltunk: 3 dm = 30 cm. 30 cm több, mint 25 cm.'
  },
  {
    id: 'leng3-q19',
    level: 2,
    questionTypeBadge: 'Négyzetrács',
    figure: <PathFig start={[1, 3]} path={['u', 'u', 'r', 'r', 'r', 'd', 'r', 'r']} />,
    question: 'Milyen hosszú a zöld út? Egy kis négyzet oldala 10 cm.',
    options: ['80 cm', '8 cm', '70 cm', '90 cm'],
    correctAnswer: 0,
    explanation: 'Számold meg a kis szakaszokat: 2 + 3 + 1 + 2 = 8. 8 · 10 cm = 80 cm.'
  },
  {
    id: 'leng3-q20',
    level: 2,
    questionTypeBadge: 'Mértékegység',
    figure: <PencilFig />,
    question: 'Egy új ceruza hossza 17 □. Melyik egység kerül a □ helyére?',
    options: ['cm', 'mm', 'dm', 'm'],
    correctAnswer: 0,
    explanation: 'A ceruzát cm-ben mérjük: 17 cm. A 17 mm nagyon rövid lenne (2 cm sem). A 17 dm magasabb lenne nálad!'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'leng3-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <JumpsFig parts={['40 cm', '35 cm', '35 cm', '? cm']} ws={[40, 35, 35, 40]} total="1 m 5 dm" />,
    question: 'A béka 4-et ugrik. Összesen 1 m 5 dm-t tesz meg. Milyen hosszú az utolsó ugrás?',
    options: ['40 cm', '110 cm', '45 cm', '30 cm'],
    correctAnswer: 0,
    explanation: '1 m 5 dm = 150 cm. Az első három: 40 + 35 + 35 = 110 cm. 150 − 110 = 40 cm.'
  },
  {
    id: 'leng3-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <RibbonFig whole="1 m" cut="35 cm" cutFrac={0.35} />,
    question: 'Egy szalag 1 m hosszú. Levágunk belőle 35 cm-t. Mennyi marad?',
    options: ['65 cm', '75 cm', '35 cm', '135 cm'],
    correctAnswer: 0,
    explanation: '1 m = 100 cm. 100 cm − 35 cm = 65 cm.'
  },
  {
    id: 'leng3-q23',
    level: 3,
    questionTypeBadge: 'Sorba rendezés',
    question: 'Melyik sor növekvő (a legrövidebbtől a leghosszabbig)?',
    options: ['4 cm, 45 mm, 1 dm, 15 cm', '1 dm, 4 cm, 15 cm, 45 mm', '4 cm, 1 dm, 15 cm, 45 mm', '45 mm, 4 cm, 15 cm, 1 dm'],
    correctAnswer: 0,
    explanation: 'Mind mm-ben: 4 cm = 40 mm, 45 mm, 1 dm = 100 mm, 15 cm = 150 mm. Így 40 < 45 < 100 < 150.'
  },
  {
    id: 'leng3-q24',
    level: 3,
    questionTypeBadge: 'Kerekítés',
    figure: <MeterLineFig a={4} dm={7} />,
    question: 'Egy kígyó 4 m 7 dm hosszú. Kerekítsd egész méterre!',
    options: ['5 m', '4 m', '47 m', '7 m'],
    correctAnswer: 0,
    explanation: '4 m 7 dm = 47 dm. Ez közelebb van az 5 m-hez (50 dm), mint a 4 m-hez (40 dm). Tehát kb. 5 m.'
  },
  {
    id: 'leng3-q25',
    level: 3,
    questionTypeBadge: 'Milliméter',
    figure: <BooksFig n={4} each="15 mm" />,
    question: 'Egy könyv 15 mm vastag. Milyen magas a 4 könyvből épített torony?',
    options: ['6 cm', '60 cm', '19 mm', '4 cm'],
    correctAnswer: 0,
    explanation: '4 · 15 mm = 60 mm. 60 mm = 6 cm.'
  },
  {
    id: 'leng3-q26',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <TwoHeightsFig />,
    question: 'A szekrény 2 m 10 cm magas. A polc 85 cm-rel alacsonyabb. Milyen magas a polc?',
    options: ['1 m 25 cm', '1 m 35 cm', '2 m 95 cm', '125 m'],
    correctAnswer: 0,
    explanation: '2 m 10 cm = 210 cm. 210 cm − 85 cm = 125 cm. Ez 1 m 25 cm.'
  },
  {
    id: 'leng3-q27',
    level: 3,
    questionTypeBadge: 'Négyzetrács',
    figure: <PathFig start={[2, 1]} path={['r', 'r', 'r', 'd', 'd', 'l', 'l', 'l', 'u', 'u']} cols={8} rows={4} />,
    question: 'A katica körbejár a zöld vonalon. Egy kis négyzet oldala 10 cm. Hány métert tesz meg?',
    options: ['1 m', '10 m', '10 cm', '100 m'],
    correctAnswer: 0,
    explanation: '3 + 2 + 3 + 2 = 10 kis szakasz. 10 · 10 cm = 100 cm = 1 m.'
  },
  {
    id: 'leng3-q28',
    level: 3,
    questionTypeBadge: 'Milliméter',
    figure: <ExtendFig />,
    question: 'A kék szakasz 68 mm. Pirossal 1 dm-re egészítjük ki. Milyen hosszú a piros rész?',
    options: ['32 mm', '42 mm', '168 mm', '22 mm'],
    correctAnswer: 0,
    explanation: '1 dm = 100 mm. 100 mm − 68 mm = 32 mm.'
  },
  {
    id: 'leng3-q29',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <StepsFig n={6} each="50 cm" />,
    question: 'Egy lépésed 50 cm. Hány métert teszel meg 6 lépéssel?',
    options: ['3 m', '30 m', '56 cm', '300 m'],
    correctAnswer: 0,
    explanation: '6 · 50 cm = 300 cm. 100 cm = 1 m, ezért 300 cm = 3 m.'
  },
  {
    id: 'leng3-q30',
    level: 3,
    questionTypeBadge: 'Mértékváltás',
    question: 'Melyik NEM egyenlő 1 méterrel?',
    options: ['1000 cm', '100 cm', '10 dm', '1000 mm'],
    correctAnswer: 0,
    explanation: '1 m = 10 dm = 100 cm = 1000 mm. Az 1000 cm már 10 m lenne!'
  }
];

export const LengthG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="meresek"
      topicId="g3-meas-hosszusag-quiz"
      subtopicId="a-hosszusag-merese"
      title="4. A hosszúság mérése – Kvíz"
      subtitle="30 feladat 3 szinten: vonalzó, milliméter, mértékváltás, becslés, négyzetrácsos utak, szöveges feladatok."
      badge="3. OSZTÁLY • IV. MÉRÉSEK • KVÍZ"
      questions={LENGTH_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Egységek',
          items: ['1 m = 10 dm', '1 dm = 10 cm', '1 cm = 10 mm', '1 m = 100 cm = 1000 mm']
        },
        {
          title: 'Vonalzó',
          items: ['A 0-tól mérj!', 'Hosszú vonás: cm', 'Kis vonás: mm', 'Nem a 0-nál kezdődik? vég − eleje']
        },
        {
          title: 'Átváltás',
          items: ['2 m 35 cm = 200 cm + 35 cm = 235 cm', '6 cm 4 mm = 64 mm', '1 m 5 cm = 105 cm', 'Kisebb egység: több lesz a szám']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <LengthG3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <LengthG3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default LengthG3Quiz;
