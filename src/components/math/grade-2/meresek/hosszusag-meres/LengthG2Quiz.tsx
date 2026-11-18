import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { LengthG2Matcher } from './LengthG2Matcher';
import { LengthG2Sorter } from './LengthG2Sorter';
import { LEN_FONT, RulerPart, StripePart, PencilPart, CubeRowPart, DmRodPart } from './LengthG2Parts';
import { HandSpanPart } from './LengthG2Figures';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 110 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={LEN_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Csík a vonalzó fölött. */
const RulerQ: React.FC<{ start: number; len: number; from?: number; to?: number; broken?: boolean; color?: string }> = ({
  start,
  len,
  from = 0,
  to,
  broken = false,
  color = '#3b82f6'
}) => {
  const end = to ?? Math.max(start + len + 2, 10);
  const unit = 220 / (end - from);
  const x0 = 20;
  const px = (v: number) => x0 + (v - from) * unit;
  return (
    <QFig h={92}>
      <StripePart x1={px(start)} x2={px(start + len)} y={28} color={color} h={14} />
      <RulerPart x={x0} y={48} unit={unit} from={from} to={end} h={32} fontSize={end - from > 12 ? 10 : 12} broken={broken} />
    </QFig>
  );
};

const HandQ: React.FC = () => (
  <QFig h={110}>
    <HandSpanPart x={140} y={78} s={1.3} />
    <line x1="88" y1="98" x2="166" y2="20" stroke={UNK} strokeWidth="3" />
    <text x="220" y="60" textAnchor="middle" fontSize="28" fontWeight="900" fill={UNK}>
      ?
    </text>
  </QFig>
);

const CubesDmQ: React.FC = () => (
  <QFig h={96}>
    <path d="M 30 34 L 30 26 L 230 26 L 230 34" fill="none" stroke="#ea580c" strokeWidth="2.5" />
    <text x="130" y="20" textAnchor="middle" fontSize="15" fontWeight="900" fill="#c2410c">
      1 dm
    </text>
    <CubeRowPart x={30} y={40} n={10} unit={20} />
    <text x="130" y="86" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a">
      1 dm = <tspan fill={UNK}>?</tspan> cm
    </text>
  </QFig>
);

const MeterQ: React.FC<{ blue?: number; green?: number; caption: React.ReactNode }> = ({ blue = 0, green = 0, caption }) => (
  <QFig h={92}>
    {Array.from({ length: 10 }, (_, i) => (
      <rect
        key={i}
        x={20 + i * 22}
        y={22}
        width="22"
        height="24"
        fill={i < blue ? '#3b82f6' : i < blue + green ? '#22c55e' : '#fdba74'}
        stroke="#1e293b"
        strokeWidth="1.4"
      />
    ))}
    <text x="31" y="62" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">
      1 dm
    </text>
    <text x="130" y="82" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a">
      {caption}
    </text>
  </QFig>
);

const ComparePencilsQ: React.FC = () => {
  const unit = 22;
  return (
    <QFig h={112}>
      <PencilPart x1={20} x2={20 + 6 * unit} y={20} color="#3b82f6" />
      <PencilPart x1={20} x2={20 + 9 * unit} y={44} color="#ef4444" />
      <RulerPart x={20} y={62} unit={unit} from={0} to={10} h={32} fontSize={12} />
    </QFig>
  );
};

const PencilRodsQ: React.FC = () => {
  const u = 24;
  return (
    <QFig h={84}>
      <PencilPart x1={34} x2={34 + 8 * u} y={26} />
      {Array.from({ length: 4 }, (_, i) => (
        <rect key={i} x={34 + i * 2 * u} y={42} width={2 * u} height={22} fill="#f9a8d4" stroke="#9d174d" strokeWidth="1.6" />
      ))}
    </QFig>
  );
};

const RodsQ: React.FC<{ dm: number; cm: number; caption: React.ReactNode }> = ({ dm, cm, caption }) => {
  const cell = 7.5;
  const used = dm * 20 + (cm > 0 ? 12 : 0);
  const x0 = 130 - used / 2;
  return (
    <QFig h={118}>
      {Array.from({ length: dm }, (_, i) => (
        <DmRodPart key={i} x={x0 + i * 20} y={12} cell={cell} w={15} />
      ))}
      {Array.from({ length: cm }, (_, i) => (
        <rect key={`c${i}`} x={x0 + dm * 20 + 2} y={12 + (9 - i) * cell} width={cell + 1} height={cell} fill="#fff" stroke="#334155" strokeWidth="1.2" />
      ))}
      <text x="130" y="108" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a">
        {caption}
      </text>
    </QFig>
  );
};

const ArcRow: React.FC<{ x: number; y: number; n: number; w: number; color: string }> = ({ x, y, n, w, color }) => (
  <g>
    {Array.from({ length: n }, (_, i) => (
      <path key={i} d={`M ${x + i * w} ${y} Q ${x + i * w + w / 2} ${y - w * 0.45} ${x + (i + 1) * w} ${y}`} fill="none" stroke={color} strokeWidth="2.6" />
    ))}
  </g>
);

const AraszQ: React.FC = () => (
  <QFig h={112}>
    <text x="14" y="44" fontSize="14" fontWeight="900" fill="#be185d">
      Dóri
    </text>
    <ArcRow x={66} y={46} n={6} w={30} color="#db2777" />
    <rect x="66" y="47" width="180" height="8" rx="2" fill="#a16207" />
    <text x="14" y="92" fontSize="14" fontWeight="900" fill="#1d4ed8">
      Apa
    </text>
    <ArcRow x={66} y={94} n={3} w={60} color="#2563eb" />
    <rect x="66" y="95" width="180" height="8" rx="2" fill="#a16207" />
  </QFig>
);

const PencilCubesRodQ: React.FC = () => {
  const u = 22;
  return (
    <QFig h={116}>
      <PencilPart x1={20} x2={20 + 8 * u} y={20} />
      <CubeRowPart x={20} y={34} n={8} unit={u} />
      <rect x={20} y={74} width={2 * u} height={u} fill="#f9a8d4" stroke="#9d174d" strokeWidth="1.6" />
      <text x={20 + 2 * u + 10} y={90} fontSize="14" fontWeight="900" fill="#9d174d">
        = 1 rúd
      </text>
      <text x="236" y="58" textAnchor="middle" fontSize="26" fontWeight="900" fill={UNK}>
        ?
      </text>
    </QFig>
  );
};

const TrackQ: React.FC<{ done: number }> = ({ done }) => {
  const u = 22;
  const x0 = 20;
  return (
    <QFig h={86}>
      <line x1={x0} y1={40} x2={x0 + 10 * u} y2={40} stroke="#cbd5e1" strokeWidth="5" />
      <line x1={x0} y1={40} x2={x0 + done * u} y2={40} stroke="#16a34a" strokeWidth="9" strokeLinecap="round" />
      <circle cx={x0 + done * u} cy={26} r="9" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1.5" />
      <circle cx={x0 + done * u - 3} cy={24} r="1.8" fill="#111827" />
      <circle cx={x0 + done * u + 3} cy={29} r="1.8" fill="#111827" />
      <rect x={x0 + 10 * u - 2} y={14} width="5" height="26" fill="#111827" />
      {Array.from({ length: 11 }, (_, i) => (
        <g key={i}>
          <line x1={x0 + i * u} y1={46} x2={x0 + i * u} y2={54} stroke="#334155" strokeWidth="1.6" />
          <text x={x0 + i * u} y={70} textAnchor="middle" fontSize="12" fontWeight="900" fill="#334155">
            {i}
          </text>
        </g>
      ))}
    </QFig>
  );
};

const TableQ: React.FC = () => (
  <QFig h={84}>
    {['Becslés', 'Mérés', 'Eltérés'].map((h, i) => (
      <g key={h}>
        <rect x={16 + i * 76} y={14} width="76" height="26" fill="#0ea5e9" stroke="#0369a1" />
        <text x={54 + i * 76} y={32} textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff">
          {h}
        </text>
        <rect x={16 + i * 76} y={40} width="76" height="30" fill="#ecfccb" stroke="#0369a1" />
        <text x={54 + i * 76} y={61} textAnchor="middle" fontSize="16" fontWeight="900" fill={i === 2 ? UNK : '#0f172a'}>
          {['30 cm', '34 cm', '?'][i]}
        </text>
      </g>
    ))}
  </QFig>
);

const TapeQ: React.FC = () => {
  const x0 = 20;
  const w = 220;
  const cut = x0 + (35 / 100) * w;
  return (
    <QFig h={96}>
      <rect x={x0} y={30} width={cut - x0} height="20" fill="#f9a8d4" stroke="#9d174d" strokeWidth="1.5" />
      <rect x={cut} y={30} width={x0 + w - cut} height="20" fill="#c4b5fd" stroke="#5b21b6" strokeWidth="1.5" />
      <line x1={cut} y1={20} x2={cut} y2={60} stroke="#0f172a" strokeWidth="2" strokeDasharray="4 3" />
      <text x={(x0 + cut) / 2} y={22} textAnchor="middle" fontSize="14" fontWeight="900" fill="#9d174d">
        35 cm
      </text>
      <text x={(cut + x0 + w) / 2} y={22} textAnchor="middle" fontSize="18" fontWeight="900" fill={UNK}>
        ?
      </text>
      <path d={`M ${x0} 64 L ${x0} 70 L ${x0 + w} 70 L ${x0 + w} 64`} fill="none" stroke="#334155" strokeWidth="2" />
      <text x="130" y="88" textAnchor="middle" fontSize="15" fontWeight="900" fill="#334155">
        1 m
      </text>
    </QFig>
  );
};

const StripeAddQ: React.FC = () => {
  const u = 12;
  const x0 = 24;
  return (
    <QFig h={100}>
      <rect x={x0} y={18} width={12 * u} height="16" rx="3" fill="#3b82f6" stroke="#1e3a8a" />
      <text x={x0 + 12 * u + 8} y={31} fontSize="13" fontWeight="900" fill="#1e3a8a">
        1 dm 2 cm
      </text>
      <rect x={x0} y={52} width={12 * u} height="16" rx="3" fill="#ef4444" stroke="#7f1d1d" />
      <rect x={x0 + 12 * u} y={52} width={5 * u} height="16" rx="3" fill="#fca5a5" stroke="#7f1d1d" strokeDasharray="3 2" />
      <text x={x0 + 14.5 * u} y={64} textAnchor="middle" fontSize="11" fontWeight="900" fill="#7f1d1d">
        5 cm
      </text>
      <text x={x0 + 17 * u + 10} y={66} fontSize="20" fontWeight="900" fill={UNK}>
        ?
      </text>
      <text x="130" y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">
        kék csík és piros csík
      </text>
    </QFig>
  );
};

const TwoStripesQ: React.FC = () => {
  const unit = 220 / 14;
  const x0 = 20;
  return (
    <QFig h={108}>
      <StripePart x1={x0 + 1 * unit} x2={x0 + 6 * unit} y={20} color="#3b82f6" h={12} />
      <StripePart x1={x0 + 4 * unit} x2={x0 + 12 * unit} y={44} color="#ef4444" h={12} />
      <RulerPart x={x0} y={66} unit={unit} from={0} to={14} h={32} fontSize={10} />
    </QFig>
  );
};

const SticksQ: React.FC = () => (
  <QFig h={84}>
    {Array.from({ length: 4 }, (_, i) => (
      <g key={i}>
        <rect x={22 + i * 54} y={26} width="54" height="14" rx="3" fill={i % 2 === 0 ? '#a16207' : '#ca8a04'} stroke="#422006" strokeWidth="1.4" />
        <text x={49 + i * 54} y={20} textAnchor="middle" fontSize="12" fontWeight="900" fill="#422006">
          2 dm
        </text>
      </g>
    ))}
    <path d="M 22 48 L 22 54 L 238 54 L 238 48" fill="none" stroke="#334155" strokeWidth="2" />
    <text x="130" y="76" textAnchor="middle" fontSize="20" fontWeight="900" fill={UNK}>
      ?
    </text>
  </QFig>
);

const EraserQ: React.FC = () => {
  const u = 22;
  return (
    <QFig h={104}>
      <PencilPart x1={20} x2={20 + 9 * u} y={20} />
      <CubeRowPart x={20} y={34} n={9} unit={u} />
      <rect x={20} y={70} width={5 * u} height="22" rx="4" fill="#f9a8d4" stroke="#9d174d" strokeWidth="1.6" />
      <rect x={20} y={70} width={2 * u} height="22" rx="4" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="1.6" />
      <text x={20 + 5 * u + 16} y={88} fontSize="14" fontWeight="900" fill="#9d174d">
        radír: <tspan fill={UNK}>?</tspan>
      </text>
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const LENGTH_G2_QUESTIONS: QuizQuestion[] = [
  // ---- 1. szint ----
  {
    id: 'leng2-q1',
    level: 1,
    questionTypeBadge: 'Régi mérés',
    figure: <HandQ />,
    question: 'Régen így is mértek. Mi a neve ennek a mértékegységnek?',
    options: ['arasz', 'láb', 'öl', 'lépés'],
    correctAnswer: 0,
    explanation: 'Kitárt kézzel, a hüvelykujjtól a kisujjig mérünk. Ez az arasz.'
  },
  {
    id: 'leng2-q2',
    level: 1,
    questionTypeBadge: 'Mértékegységek',
    question: 'Melyik a leghosszabb?',
    options: ['1 m', '1 dm', '1 cm', 'mind egyforma'],
    correctAnswer: 0,
    explanation: '1 m = 10 dm = 100 cm. A méter a leghosszabb.'
  },
  {
    id: 'leng2-q3',
    level: 1,
    questionTypeBadge: 'Deciméter',
    figure: <CubesDmQ />,
    question: 'Hány centiméter 1 deciméter?',
    options: ['10', '100', '1', '5'],
    correctAnswer: 0,
    explanation: '10 kis kocka van egymás mellett. 1 dm = 10 cm.'
  },
  {
    id: 'leng2-q4',
    level: 1,
    questionTypeBadge: 'Vonalzó',
    figure: <RulerQ start={0} len={7} />,
    question: 'Milyen hosszú a kék csík?',
    options: ['7 cm', '8 cm', '6 cm', '70 cm'],
    correctAnswer: 0,
    explanation: 'A csík a 0-nál kezdődik és a 7-nél végződik. Ez 7 cm.'
  },
  {
    id: 'leng2-q5',
    level: 1,
    questionTypeBadge: 'Mérőeszköz',
    question: 'Mivel mérnéd meg a legkönnyebben a tanterem hosszát?',
    options: ['mérőszalaggal', 'mérleggel', 'mérőpohárral', 'órával'],
    correctAnswer: 0,
    explanation: 'A hosszú dolgokat mérőszalaggal mérjük. A mérleg, a pohár és az óra mást mér.'
  },
  {
    id: 'leng2-q6',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    figure: <ComparePencilsQ />,
    question: 'Melyik ceruza hosszabb?',
    options: ['a piros', 'a kék', 'egyformák', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'Mindkettő a 0-nál kezdődik. A kék 6 cm, a piros 9 cm. A piros hosszabb.'
  },
  {
    id: 'leng2-q7',
    level: 1,
    questionTypeBadge: 'Méter',
    figure: <MeterQ caption={<>1 m = <tspan fill={UNK}>?</tspan> cm</>} />,
    question: 'Hány centiméter 1 méter?',
    options: ['100', '10', '1000', '50'],
    correctAnswer: 0,
    explanation: '1 m = 10 dm, és minden dm 10 cm. Így 1 m = 100 cm.'
  },
  {
    id: 'leng2-q8',
    level: 1,
    questionTypeBadge: 'Becslés',
    question: 'Milyen hosszú lehet egy új ceruza?',
    options: ['15 cm', '15 m', '15 dm', '1 cm'],
    correctAnswer: 0,
    explanation: 'Egy ceruza kicsit hosszabb, mint a tenyered. Kb. 15 cm.'
  },
  {
    id: 'leng2-q9',
    level: 1,
    questionTypeBadge: 'Mérés rúddal',
    figure: <PencilRodsQ />,
    question: 'Hány rózsaszín rúd hosszú a ceruza?',
    options: ['4', '3', '5', '2'],
    correctAnswer: 0,
    explanation: 'Számold meg a rudakat a ceruza alatt: 1, 2, 3, 4.'
  },
  {
    id: 'leng2-q10',
    level: 1,
    questionTypeBadge: 'Becslés',
    question: 'Milyen magas lehet egy ajtó?',
    options: ['2 m', '2 cm', '2 dm', '20 cm'],
    correctAnswer: 0,
    explanation: 'Egy felnőtt is átfér alatta. Az ajtó kb. 2 m magas.'
  },

  // ---- 2. szint ----
  {
    id: 'leng2-q11',
    level: 2,
    questionTypeBadge: 'Nem a 0-tól',
    figure: <RulerQ start={2} len={7} color="#22c55e" />,
    question: 'Milyen hosszú a zöld csík?',
    options: ['7 cm', '9 cm', '11 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'A csík a 2-nél kezdődik, a 9-nél végződik. 9 − 2 = 7, tehát 7 cm.'
  },
  {
    id: 'leng2-q12',
    level: 2,
    questionTypeBadge: 'Átváltás',
    figure: <RodsQ dm={3} cm={0} caption={<>3 dm = <tspan fill={UNK}>?</tspan> cm</>} />,
    question: 'Hány centiméter 3 dm?',
    options: ['30', '3', '300', '13'],
    correctAnswer: 0,
    explanation: 'Minden rúd 10 cm. 10 + 10 + 10 = 30, tehát 3 dm = 30 cm.'
  },
  {
    id: 'leng2-q13',
    level: 2,
    questionTypeBadge: 'dm és cm',
    figure: <RodsQ dm={1} cm={6} caption={<>1 dm 6 cm = <tspan fill={UNK}>?</tspan> cm</>} />,
    question: 'Hány centiméter 1 dm 6 cm?',
    options: ['16', '7', '61', '106'],
    correctAnswer: 0,
    explanation: '1 dm = 10 cm. 10 cm + 6 cm = 16 cm.'
  },
  {
    id: 'leng2-q14',
    level: 2,
    questionTypeBadge: 'Bontás',
    question: 'Mennyi 45 cm deciméterrel és centiméterrel?',
    options: ['4 dm 5 cm', '5 dm 4 cm', '45 dm', '40 dm 5 cm'],
    correctAnswer: 0,
    explanation: '45 cm = 40 cm + 5 cm. 40 cm = 4 dm. Tehát 4 dm 5 cm.'
  },
  {
    id: 'leng2-q15',
    level: 2,
    questionTypeBadge: 'Relációjel',
    question: 'Melyik jel kerül a ○ helyére? 1 m ○ 90 cm',
    options: ['>', '<', '='],
    correctAnswer: 0,
    explanation: '1 m = 100 cm. A 100 több, mint 90, ezért 1 m > 90 cm.'
  },
  {
    id: 'leng2-q16',
    level: 2,
    questionTypeBadge: 'Arasz',
    figure: <AraszQ />,
    question: 'Dóri és Apa ugyanazt a padot mérte arasszal. Kinek nagyobb az arasza?',
    options: ['Apának', 'Dórinak', 'egyforma', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'Apának csak 3 arasz kellett, Dórinak 6. Akinek kevesebb kell, annak nagyobb az arasza.'
  },
  {
    id: 'leng2-q17',
    level: 2,
    questionTypeBadge: 'Mérés rúddal',
    figure: <PencilCubesRodQ />,
    question: 'A ceruza 8 kis kocka hosszú. Egy rúd 2 kocka hosszú. Hány rúd hosszú a ceruza?',
    options: ['4', '8', '16', '6'],
    correctAnswer: 0,
    explanation: '2 + 2 + 2 + 2 = 8. Tehát 4 rúd kell. A nagyobb egységből kevesebb kell!'
  },
  {
    id: 'leng2-q18',
    level: 2,
    questionTypeBadge: 'Hátralévő út',
    figure: <TrackQ done={6} />,
    question: 'A katica 1 dm-es úton megy. Már 6 cm-t ment. Hány cm van még hátra?',
    options: ['4 cm', '6 cm', '10 cm', '5 cm'],
    correctAnswer: 0,
    explanation: '1 dm = 10 cm. 10 − 6 = 4, még 4 cm van hátra.'
  },
  {
    id: 'leng2-q19',
    level: 2,
    questionTypeBadge: 'Eltérés',
    figure: <TableQ />,
    question: 'Bálint 30 cm-re becsülte a könyvét. Megmérte: 34 cm. Mennyi az eltérés?',
    options: ['4 cm', '34 cm', '64 cm', '3 cm'],
    correctAnswer: 0,
    explanation: 'Az eltérés a különbség: 34 − 30 = 4 cm.'
  },
  {
    id: 'leng2-q20',
    level: 2,
    questionTypeBadge: 'Összeadás',
    figure: <MeterQ blue={7} green={3} caption={<>7 dm + 3 dm = <tspan fill={UNK}>?</tspan></>} />,
    question: 'Mennyi 7 dm + 3 dm?',
    options: ['1 m', '10 cm', '1 dm', '100 dm'],
    correctAnswer: 0,
    explanation: '7 dm + 3 dm = 10 dm. 10 dm = 1 m.'
  },

  // ---- 3. szint ----
  {
    id: 'leng2-q21',
    level: 3,
    questionTypeBadge: 'Sorba rendezés',
    question: 'Melyik a jó sorrend? Kezdd a legrövidebbel!',
    options: ['25 cm, 3 dm, 1 m', '3 dm, 25 cm, 1 m', '1 m, 3 dm, 25 cm', '1 m, 25 cm, 3 dm'],
    correctAnswer: 0,
    explanation: 'Írd át centiméterre: 25 cm, 3 dm = 30 cm, 1 m = 100 cm. Így 25 cm < 30 cm < 100 cm.'
  },
  {
    id: 'leng2-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <TapeQ />,
    question: 'Lili szalagja 1 m hosszú. Levágott belőle 35 cm-t. Mennyi maradt?',
    options: ['65 cm', '75 cm', '35 cm', '55 cm'],
    correctAnswer: 0,
    explanation: '1 m = 100 cm. 100 − 35 = 65, tehát 65 cm maradt.'
  },
  {
    id: 'leng2-q23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <StripeAddQ />,
    question: 'A kék csík 1 dm 2 cm. A piros 5 cm-rel hosszabb. Milyen hosszú a piros csík?',
    options: ['17 cm', '7 cm', '15 cm', '16 cm'],
    correctAnswer: 0,
    explanation: '1 dm 2 cm = 12 cm. 12 + 5 = 17, a piros csík 17 cm.'
  },
  {
    id: 'leng2-q24',
    level: 3,
    questionTypeBadge: 'Két csík',
    figure: <TwoStripesQ />,
    question: 'Mennyivel hosszabb a piros csík, mint a kék?',
    options: ['3 cm', '6 cm', '8 cm', '2 cm'],
    correctAnswer: 0,
    explanation: 'A kék 1-től 6-ig tart: 5 cm. A piros 4-től 12-ig: 8 cm. 8 − 5 = 3 cm.'
  },
  {
    id: 'leng2-q25',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <SticksQ />,
    question: 'Ábel 4 pálcát tett egymás után. Mindegyik 2 dm. Milyen hosszú a sor?',
    options: ['8 dm', '6 dm', '80 dm', '8 cm'],
    correctAnswer: 0,
    explanation: '2 dm + 2 dm + 2 dm + 2 dm = 8 dm. (Ez 80 cm.)'
  },
  {
    id: 'leng2-q26',
    level: 3,
    questionTypeBadge: 'Melyik nem?',
    question: 'Melyik NEM 1 méter?',
    options: ['10 cm', '100 cm', '10 dm', '50 cm + 50 cm'],
    correctAnswer: 0,
    explanation: '1 m = 100 cm = 10 dm. A 10 cm csak 1 dm, az nem 1 méter.'
  },
  {
    id: 'leng2-q27',
    level: 3,
    questionTypeBadge: 'Rövidebb',
    figure: <EraserQ />,
    question: 'A ceruza 9 kis kocka hosszú. A radír 4 kockával rövidebb. Hány cm a radír, ha 1 kocka 1 cm?',
    options: ['5 cm', '13 cm', '4 cm', '9 cm'],
    correctAnswer: 0,
    explanation: 'Rövidebb, ezért kivonunk: 9 − 4 = 5. A radír 5 cm.'
  },
  {
    id: 'leng2-q28',
    level: 3,
    questionTypeBadge: 'Relációjel',
    question: 'Melyik jel kerül a ○ helyére? 56 cm ○ 5 dm 6 cm',
    options: ['=', '<', '>'],
    correctAnswer: 0,
    explanation: '5 dm 6 cm = 50 cm + 6 cm = 56 cm. A két oldal egyenlő.'
  },
  {
    id: 'leng2-q29',
    level: 3,
    questionTypeBadge: 'Törött vonalzó',
    figure: <RulerQ start={5} len={8} from={4} to={15} broken color="#a855f7" />,
    question: 'Eltört a vonalzó, nincs rajta 0. Milyen hosszú a lila csík?',
    options: ['8 cm', '13 cm', '18 cm', '7 cm'],
    correctAnswer: 0,
    explanation: 'A csík az 5-nél kezdődik, a 13-nál végződik. 13 − 5 = 8 cm.'
  },
  {
    id: 'leng2-q30',
    level: 3,
    questionTypeBadge: 'Igaz mondat',
    question: 'Melyik mondat igaz?',
    options: ['Egy szék kb. 5 dm magas.', 'Egy ceruza kb. 15 m hosszú.', 'Egy ajtó kb. 2 cm magas.', 'Egy radír kb. 4 dm hosszú.'],
    correctAnswer: 0,
    explanation: '5 dm = 50 cm, ez egy szék magassága. A ceruza 15 cm, az ajtó 2 m, a radír pár cm.'
  }
];

export const LengthG2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={2}
      chapterId="meresek"
      topicId="g2-meres-hosszusag-quiz"
      subtopicId="hosszusag-meres"
      title="1. A hosszúság mérése – Kvíz"
      subtitle="30 feladat 3 szinten: régi mértékegységek, cm, dm, m, mérés vonalzóval, becslés és átváltás."
      badge="2. OSZTÁLY • VIII. MÉRÉSEK • KVÍZ"
      questions={LENGTH_G2_QUESTIONS}
      cheatSheets={[
        {
          title: 'Mértékegységek',
          items: ['1 dm = 10 cm', '1 m = 10 dm', '1 m = 100 cm', 'Régen: arasz, láb, hüvelyk, lépés, öl']
        },
        {
          title: 'Mérés vonalzóval',
          items: ['A 0-t tedd a dolog elejéhez!', 'Ahol a vége van, az a hossza', 'Ha nem a 0-tól: vég − eleje', '9 − 2 = 7 cm']
        },
        {
          title: 'Átváltás, összehasonlítás',
          items: ['1 dm 6 cm = 16 cm', '45 cm = 4 dm 5 cm', 'Előbb írd át cm-re, aztán hasonlíts!', 'Eltérés = mérés és becslés különbsége']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <LengthG2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <LengthG2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default LengthG2Quiz;
