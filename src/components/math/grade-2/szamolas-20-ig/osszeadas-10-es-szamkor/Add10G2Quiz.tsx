import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Add10G2Matcher } from './Add10G2Matcher';
import { Add10G2Sorter } from './Add10G2Sorter';
import { ADD10_FONT, BeadString10G, DiscGroupSvg, TenFrameG } from './Add10G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák (240 széles viewBox, világos kártya háttér, sötét szöveg)
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 110 }) => (
  <svg
    viewBox={`0 0 240 ${h}`}
    className="w-full max-w-[280px] h-auto mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fontFamily={ADD10_FONT}
  >
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const DiscFig: React.FC<{
  a: number;
  b: number;
  colorA?: string;
  strokeA?: string;
  colorB?: string;
  strokeB?: string;
}> = ({ a, b, colorA, strokeA, colorB, strokeB }) => (
  <QFig h={84}>
    <DiscGroupSvg
      a={a}
      b={b}
      cx={120}
      cy={42}
      r={8}
      gap={20}
      colorA={colorA}
      strokeA={strokeA}
      colorB={colorB}
      strokeB={strokeB}
    />
  </QFig>
);

const PIP_POS: Record<number, [number, number][]> = {
  1: [[0.5, 0.5]],
  2: [[0.28, 0.28], [0.72, 0.72]],
  3: [[0.28, 0.28], [0.5, 0.5], [0.72, 0.72]],
  4: [[0.28, 0.28], [0.72, 0.28], [0.28, 0.72], [0.72, 0.72]],
  5: [[0.28, 0.28], [0.72, 0.28], [0.5, 0.5], [0.28, 0.72], [0.72, 0.72]],
  6: [[0.28, 0.24], [0.72, 0.24], [0.28, 0.5], [0.72, 0.5], [0.28, 0.76], [0.72, 0.76]],
};

const DiceFig: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const s = 48;
  const y = 18;
  const drawDie = (x: number, v: number, fill: string) => (
    <g>
      <rect x={x} y={y} width={s} height={s} rx="8" fill={fill} stroke="#334155" strokeWidth="2" />
      {(PIP_POS[v] || []).map(([px, py], i) => (
        <circle key={i} cx={x + px * s} cy={y + py * s} r="4.2" fill="#0f172a" />
      ))}
    </g>
  );
  return (
    <QFig h={84}>
      {drawDie(56, a, '#fef9c3')}
      <text x="120" y="50" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#334155">
        +
      </text>
      {drawDie(136, b, '#e0f2fe')}
    </QFig>
  );
};

const LineJumpFig: React.FC<{ start: number; jump: number; askJump?: boolean }> = ({
  start,
  jump,
  askJump = false,
}) => {
  const x0 = 20;
  const x1 = 220;
  const X = (v: number) => x0 + ((x1 - x0) * v) / 10;
  const y = 66;
  const end = start + jump;
  return (
    <QFig h={104}>
      <line x1={x0 - 6} y1={y} x2={x1 + 8} y2={y} stroke="#334155" strokeWidth="2" />
      <path d={`M ${x1 + 8} ${y - 4} L ${x1 + 14} ${y} L ${x1 + 8} ${y + 4} Z`} fill="#334155" />
      {Array.from({ length: 11 }, (_, v) => (
        <g key={v}>
          <line
            x1={X(v)}
            y1={v % 5 === 0 ? y - 7 : y - 4}
            x2={X(v)}
            y2={v % 5 === 0 ? y + 7 : y + 4}
            stroke="#334155"
            strokeWidth={v % 5 === 0 ? 1.8 : 1.1}
          />
          <text x={X(v)} y={y + 20} textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#334155">
            {v}
          </text>
        </g>
      ))}
      <circle cx={X(start)} cy={y} r="4.5" fill="#2563eb" />
      <path
        d={`M ${X(start)} ${y - 6} Q ${(X(start) + X(end)) / 2} 18 ${X(end) - 2} ${y - 10}`}
        fill="none"
        stroke="#16a34a"
        strokeWidth="2.2"
      />
      <text
        x={(X(start) + X(end)) / 2}
        y="28"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill={askJump ? UNK : '#15803d'}
      >
        {askJump ? '+ ?' : `+${jump}`}
      </text>
      <circle cx={X(end)} cy={y} r="4.5" fill={askJump ? '#16a34a' : UNK} />
      {!askJump && (
        <text x={X(end)} y={y - 14} textAnchor="middle" fontSize="14" fontWeight="bold" fill={UNK}>
          ?
        </text>
      )}
    </QFig>
  );
};

const BeadFig: React.FC<{ a: number; b?: number }> = ({ a, b = 0 }) => (
  <QFig h={76}>
    <BeadString10G a={a} b={b} x0={24} y={38} step={21} r={8.5} />
  </QFig>
);

const FrameFig: React.FC<{ a: number; b?: number; askMissing?: boolean }> = ({ a, b = 0, askMissing = false }) => (
  <QFig h={84}>
    <TenFrameG a={a} b={b} x={55} y={16} cell={26} questionInRest={askMissing} />
  </QFig>
);

const BondFig: React.FC<{ total: number; part: number; label?: string }> = ({ total, part, label }) => (
  <QFig h={102}>
    <line x1="120" y1="30" x2="72" y2="66" stroke="#334155" strokeWidth="2.2" />
    <line x1="120" y1="30" x2="168" y2="66" stroke="#334155" strokeWidth="2.2" />
    <circle cx="120" cy="24" r="16" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="120" y="30" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0f172a">
      {total}
    </text>
    <circle cx="72" cy="70" r="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
    <text x="72" y="76" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0f172a">
      {part}
    </text>
    <circle cx="168" cy="70" r="16" fill="#fee2e2" stroke={UNK} strokeWidth="2" />
    <text x="168" y="76" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>
      ?
    </text>
    {label && (
      <text x="120" y="96" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">
        {label}
      </text>
    )}
  </QFig>
);

const HouseFig: React.FC<{ top: number; rows: [string, string, boolean][] }> = ({ top, rows }) => (
  <QFig h={134}>
    <polygon points="120,8 62,38 178,38" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
    <text x="120" y="31" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#ffffff">
      {top}
    </text>
    {rows.map(([l, r, isQ], i) => {
      const y = 40 + i * 26;
      return (
        <g key={i}>
          <rect x="70" y={y} width="50" height="26" fill="#ffffff" stroke="#fb923c" strokeWidth="1.3" />
          <rect x="120" y={y} width="50" height="26" fill={isQ ? '#fee2e2' : '#ffedd5'} stroke="#fb923c" strokeWidth="1.3" />
          <text x="95" y={y + 18} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">
            {l}
          </text>
          <text x="145" y={y + 18} textAnchor="middle" fontSize="14" fontWeight="bold" fill={isQ ? UNK : '#1e293b'}>
            {r}
          </text>
        </g>
      );
    })}
  </QFig>
);

const CardsSumFig: React.FC<{ nums: number[]; target?: number }> = ({ nums, target }) => (
  <QFig h={target !== undefined ? 96 : 76}>
    {nums.map((n, i) => {
      const x = 120 + (i - (nums.length - 1) / 2) * 46 - 17;
      return (
        <g key={i}>
          <rect
            x={x}
            y="14"
            width="34"
            height="46"
            rx="6"
            fill={['#fee2e2', '#dcfce7', '#dbeafe', '#fef3c7'][i % 4]}
            stroke="#475569"
            strokeWidth="1.5"
          />
          <text x={x + 17} y="45" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">
            {n}
          </text>
        </g>
      );
    })}
    {target !== undefined && (
      <text x="120" y="84" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#6b21a8">
        Célösszeg (3 kártya): {target}
      </text>
    )}
  </QFig>
);

const CompareFig: React.FC<{ left: string; right: string; sign?: string }> = ({ left, right, sign = '?' }) => (
  <QFig h={76}>
    <rect x="14" y="18" width="84" height="40" rx="8" fill="#ffffff" stroke="#64748b" strokeWidth="1.5" />
    <text x="56" y="44" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
      {left}
    </text>
    <circle cx="120" cy="38" r="14" fill={sign === '?' ? '#fee2e2' : '#ede9fe'} stroke={sign === '?' ? UNK : '#7c3aed'} strokeWidth="1.8" />
    <text x="120" y="44" textAnchor="middle" fontSize="17" fontWeight="bold" fill={sign === '?' ? UNK : '#5b21b6'}>
      {sign}
    </text>
    <rect x="142" y="18" width="84" height="40" rx="8" fill="#ffffff" stroke="#64748b" strokeWidth="1.5" />
    <text x="184" y="44" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
      {right}
    </text>
  </QFig>
);

// ---------------------------------------------------------------------------
// 30 kérdés (10 / szint), correctAnswer: 0, minden szám és eredmény 0–10!
// ---------------------------------------------------------------------------
export const ADD10_G2_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'a10g2-q1',
    level: 1,
    questionTypeBadge: 'Képről összeadás',
    figure: <DiscFig a={3} b={5} />,
    question: 'Hány korong látható összesen a képen?',
    options: ['8', '7', '9', '6'],
    correctAnswer: 0,
    explanation: '3 piros korong és 5 kék korong együtt: 3 + 5 = 8 korong.',
  },
  {
    id: 'a10g2-q2',
    level: 1,
    questionTypeBadge: 'Összeadás',
    figure: <DiceFig a={4} b={3} />,
    question: 'Mennyi a két dobókockán látható pöttyök összege?',
    options: ['7', '6', '8', '5'],
    correctAnswer: 0,
    explanation: 'Az egyik kockán 4, a másikon 3 pötty van: 4 + 3 = 7.',
  },
  {
    id: 'a10g2-q3',
    level: 1,
    questionTypeBadge: 'Összeadás 0-val',
    figure: <DiscFig a={7} b={0} />,
    question: 'Mennyi 7 + 0?',
    options: ['7', '0', '70', '8'],
    correctAnswer: 0,
    explanation: 'Ha 0-t adunk hozzá, a szám nem változik: 7 + 0 = 7.',
  },
  {
    id: 'a10g2-q4',
    level: 1,
    questionTypeBadge: 'Felcserélés',
    question: 'Melyik szám kerül a négyzet helyére? 2 + 6 = 6 + □',
    options: ['2', '6', '8', '4'],
    correctAnswer: 0,
    explanation: 'Az összeadásnál a tagok sorrendje felcserélhető: 2 + 6 = 6 + 2 = 8.',
  },
  {
    id: 'a10g2-q5',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <LineJumpFig start={2} jump={5} />,
    question: 'A 2-ről 5-öt ugrunk jobbra a számegyenesen. Hová érkezünk?',
    options: ['7', '6', '8', '5'],
    correctAnswer: 0,
    explanation: '2 + 5 = 7. A 7-es pontra érkezünk.',
  },
  {
    id: 'a10g2-q6',
    level: 1,
    questionTypeBadge: 'A 10 bontása',
    figure: <BeadFig a={6} />,
    question: 'A 10-es gyöngysoron 6 zöld gyöngy van. Hány gyöngy hiányzik még a 10-hez?',
    options: ['4', '5', '3', '6'],
    correctAnswer: 0,
    explanation: '6 + 4 = 10, tehát 4 gyöngy hiányzik.',
  },
  {
    id: 'a10g2-q7',
    level: 1,
    questionTypeBadge: 'Összeadás',
    question: 'Mennyi 5 + 4?',
    options: ['9', '8', '10', '7'],
    correctAnswer: 0,
    explanation: '5 + 4 = 9.',
  },
  {
    id: 'a10g2-q8',
    level: 1,
    questionTypeBadge: 'Tízes keret',
    figure: <FrameFig a={8} b={2} />,
    question: 'Melyik összeadás tartozik a tízes kerethez?',
    options: ['8 + 2 = 10', '7 + 3 = 10', '8 + 1 = 9', '6 + 4 = 10'],
    correctAnswer: 0,
    explanation: 'A keretben 8 piros és 2 kék korong van: 8 + 2 = 10.',
  },
  {
    id: 'a10g2-q9',
    level: 1,
    questionTypeBadge: 'Összeadás 0-val',
    question: 'Mennyi 0 + 9?',
    options: ['9', '0', '10', '8'],
    correctAnswer: 0,
    explanation: 'Ha 0-hoz adunk 9-et, az összeg 9: 0 + 9 = 9.',
  },
  {
    id: 'a10g2-q10',
    level: 1,
    questionTypeBadge: 'A 10 bontása',
    figure: <FrameFig a={5} askMissing />,
    question: 'Mennyi hiányzik a 10-hez? 5 + □ = 10',
    options: ['5', '4', '6', '10'],
    correctAnswer: 0,
    explanation: '5 teli hely és 5 üres hely van a keretben: 5 + 5 = 10.',
  },

  // ---------------- 2. szint ----------------
  {
    id: 'a10g2-q11',
    level: 2,
    questionTypeBadge: 'Pótlás',
    figure: <BondFig total={8} part={3} />,
    question: 'Melyik szám hiányzik a négyzet helyéről? 3 + □ = 8',
    options: ['5', '4', '6', '10'],
    correctAnswer: 0,
    explanation: '3-tól 8-ig 5-öt számolunk: 3 + 5 = 8.',
  },
  {
    id: 'a10g2-q12',
    level: 2,
    questionTypeBadge: 'Pótlás',
    question: 'Melyik szám kerül a négyzetbe? □ + 4 = 10',
    options: ['6', '4', '5', '7'],
    correctAnswer: 0,
    explanation: '6 + 4 = 10, ezért a hiányzó tag 6.',
  },
  {
    id: 'a10g2-q13',
    level: 2,
    questionTypeBadge: 'Számház',
    figure: (
      <HouseFig
        top={10}
        rows={[
          ['2', '8', false],
          ['7', '?', true],
          ['4', '6', false],
        ]}
      />
    ),
    question: 'A számház minden emeletén az összeg 10. Melyik szám áll a „?” helyén?',
    options: ['3', '2', '4', '5'],
    correctAnswer: 0,
    explanation: '7 + 3 = 10, tehát a „?” helyén a 3 áll.',
  },
  {
    id: 'a10g2-q14',
    level: 2,
    questionTypeBadge: 'Három tag',
    figure: <CardsSumFig nums={[2, 4, 3]} />,
    question: 'Mennyi a három számkártya összege? 2 + 4 + 3',
    options: ['9', '8', '10', '7'],
    correctAnswer: 0,
    explanation: '2 + 4 = 6, és 6 + 3 = 9.',
  },
  {
    id: 'a10g2-q15',
    level: 2,
    questionTypeBadge: 'Három tag',
    question: 'Mennyi 1 + 6 + 3?',
    options: ['10', '9', '8', '7'],
    correctAnswer: 0,
    explanation: '1 + 6 = 7, és 7 + 3 = 10.',
  },
  {
    id: 'a10g2-q16',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig left="3 + 5" right="4 + 4" />,
    question: 'Melyik jel illik a négyzetbe? 3 + 5 □ 4 + 4',
    options: ['=', '<', '>', '+'],
    correctAnswer: 0,
    explanation: '3 + 5 = 8 és 4 + 4 = 8. A két oldal egyenlő, ezért = jel kell.',
  },
  {
    id: 'a10g2-q17',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig left="2 + 7" right="5 + 3" />,
    question: 'Melyik jel illik a négyzetbe? 2 + 7 □ 5 + 3',
    options: ['>', '<', '=', '−'],
    correctAnswer: 0,
    explanation: '2 + 7 = 9, míg 5 + 3 = 8. Mivel 9 > 8, a > jel helyes.',
  },
  {
    id: 'a10g2-q18',
    level: 2,
    questionTypeBadge: 'Páros, páratlan',
    figure: <DiscFig a={4} b={3} />,
    question: 'Páros vagy páratlan a 4 + 3 összege?',
    options: ['páratlan', 'páros', 'mindkettő', 'egyik sem'],
    correctAnswer: 0,
    explanation: '4 + 3 = 7. A 7 páratlan szám, mert párokba rakva 1 kimarad.',
  },
  {
    id: 'a10g2-q19',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <LineJumpFig start={4} jump={6} askJump />,
    question: 'A 4-ről indulva mennyit kell ugrani jobbra, hogy a 10-re érj?',
    options: ['6', '5', '4', '7'],
    correctAnswer: 0,
    explanation: '4 + 6 = 10, tehát 6-ot kell ugrani jobbra.',
  },
  {
    id: 'a10g2-q20',
    level: 2,
    questionTypeBadge: 'Páros, páratlan',
    question: 'Melyik összeadás eredménye PÁROS szám?',
    options: ['3 + 5', '4 + 5', '2 + 7', '0 + 3'],
    correctAnswer: 0,
    explanation: '3 + 5 = 8 (páros). A többi összeg: 9, 9 és 3 (mind páratlan).',
  },

  // ---------------- 3. szint ----------------
  {
    id: 'a10g2-q21',
    level: 3,
    questionTypeBadge: 'Célszám',
    figure: <CardsSumFig nums={[5, 2, 1, 3]} target={10} />,
    question: 'Melyik 3 számkártya összege pontosan 10?',
    options: ['5 + 2 + 3', '5 + 2 + 1', '5 + 3 + 1', '2 + 1 + 3'],
    correctAnswer: 0,
    explanation: '5 + 2 + 3 = 10. A többi összeg: 8, 9 és 6.',
  },
  {
    id: 'a10g2-q22',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    figure: <CompareFig left="2 + 4" right="△" sign="<" />,
    question: 'Melyik számok tehetik igazzá a 0-tól 10-ig terjedő számok közül: 2 + 4 < △?',
    options: ['7, 8, 9, 10', '6, 7, 8, 9, 10', '0, 1, 2, 3, 4, 5', '5, 6, 7, 8'],
    correctAnswer: 0,
    explanation: '2 + 4 = 6, tehát 6 < △. A 6-nál nagyobb számok 10-ig: 7, 8, 9, 10.',
  },
  {
    id: 'a10g2-q23',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Melyik a LEGNAGYOBB szám, amely igazzá teszi az állítást: ○ < 3 + 5?',
    options: ['7', '8', '9', '6'],
    correctAnswer: 0,
    explanation: '3 + 5 = 8, így ○ < 8. A 8-nál kisebb számok közül a legnagyobb a 7.',
  },
  {
    id: 'a10g2-q24',
    level: 3,
    questionTypeBadge: 'Egyenlet',
    question: 'Melyik szám hiányzik a négyzetből? 4 + 3 = 2 + □',
    options: ['5', '7', '3', '4'],
    correctAnswer: 0,
    explanation: 'A bal oldal 4 + 3 = 7. A jobb oldalnak is 7-nek kell lennie: 2 + 5 = 7.',
  },
  {
    id: 'a10g2-q25',
    level: 3,
    questionTypeBadge: 'Három tag pótlása',
    figure: <BondFig total={10} part={6} label="2 + 4 + ? = 10" />,
    question: 'Mennyi hiányzik? 2 + 4 + □ = 10',
    options: ['4', '3', '5', '6'],
    correctAnswer: 0,
    explanation: '2 + 4 = 6, és 6 + 4 = 10. Tehát □ = 4.',
  },
  {
    id: 'a10g2-q26',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <DiscFig a={3} b={4} colorA="#f59e0b" strokeA="#b45309" colorB="#16a34a" strokeB="#14532d" />,
    question: 'Bence kosarában 3 sárga és 4 zöld körte van. Hány körte van összesen a kosárban?',
    options: ['7', '6', '8', '5'],
    correctAnswer: 0,
    explanation: 'A két csoportot összeadjuk: 3 + 4 = 7 körte.',
  },
  {
    id: 'a10g2-q27',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BeadFig a={6} />,
    question: 'Lilla 10 gyöngyből fűz karkötőt. 6 gyöngyöt már felfűzött. Hányat kell még felfűznie?',
    options: ['4', '5', '3', '6'],
    correctAnswer: 0,
    explanation: '6 + 4 = 10, tehát még 4 gyöngyöt kell felfűznie.',
  },
  {
    id: 'a10g2-q28',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A tóban 2 fehér, 5 barna és 2 tarka kiskacsa úszik. Hány kiskacsa van összesen a tóban?',
    options: ['9', '8', '10', '7'],
    correctAnswer: 0,
    explanation: '2 + 5 = 7, és 7 + 2 = 9 kiskacsa van a tóban.',
  },
  {
    id: 'a10g2-q29',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Nóra 4 matricát gyűjtött, Gergő pedig 3-mal többet. Hány matricája van Gergőnek?',
    options: ['7', '6', '8', '1'],
    correctAnswer: 0,
    explanation: 'Gergőnek 3-mal több van, ezért összeadunk: 4 + 3 = 7 matrica.',
  },
  {
    id: 'a10g2-q30',
    level: 3,
    questionTypeBadge: 'Logika',
    figure: <CompareFig left="0 + 3 + 4" right="□ + 5" sign="=" />,
    question: 'Melyik szám áll a négyzet helyén? 0 + 3 + 4 = □ + 5',
    options: ['2', '3', '7', '1'],
    correctAnswer: 0,
    explanation: 'A bal oldal: 0 + 3 + 4 = 7. A jobb oldalon 2 + 5 = 7, tehát □ = 2.',
  },
];

export const Add10G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId="g2-c20-osszeadas10-quiz"
      subtopicId="osszeadas-10-es-szamkor"
      title="2. Összeadás 10-es számkör – Kvíz"
      subtitle="30 feladat 3 szinten: összeadás 0-tól 10-ig, felcserélés, a 10 bontása, három tag, pótlás és nyitott mondatok."
      badge="2. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 20-IG • KVÍZ"
      themeColor="emerald"
      questions={ADD10_G2_QUESTIONS}
      cheatSheets={[
        {
          title: 'Összeadás és csere',
          items: [
            'tag + tag = összeg (pl. 4 + 5 = 9)',
            'A tagok felcserélhetők: 3 + 6 = 6 + 3',
            'Nullát adva hozzá nem változik: 7 + 0 = 7',
            'A számegyenesen jobbra ugrunk',
          ],
        },
        {
          title: 'A 10 bontása',
          items: ['0 + 10 = 10   és   1 + 9 = 10', '2 + 8 = 10   és   3 + 7 = 10', '4 + 6 = 10   és   5 + 5 = 10'],
        },
        {
          title: 'Pótlás és jelek',
          items: [
            '3 + □ = 8 → számolj 3-tól 8-ig (5)',
            'Előbb számold ki mindkét oldalt: 2 + 7 > 5 + 3',
            'Nyitott mondatnál figyelj a 0-ra is!',
          ],
        },
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Add10G2Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Add10G2Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Add10G2Quiz;
