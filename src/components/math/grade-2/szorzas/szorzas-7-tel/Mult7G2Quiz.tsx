import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Mult7G2Matcher } from './Mult7G2Matcher';
import { Mult7G2Sorter } from './Mult7G2Sorter';
import { C5, C2, DotArrayPart, JumpLinePart, MULT7_FONT, WeekStripPart } from './Mult7G2Parts';
import { Ladybug } from './Mult7G2Figures';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT7_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** n hetes csík (napcímkékkel), opcionálisan `extra` külön nap zölddel. */
const WeeksFig: React.FC<{ n: number; extra?: number }> = ({ n, extra = 0 }) => {
  const rows = n + (extra > 0 ? 1 : 0);
  const gy = rows > 5 ? 16 : 24;
  const cell = rows > 5 ? 20 : 26;
  const h = 24 + rows * gy;
  const x0 = 130 - (7 * cell) / 2;
  return (
    <QFig h={h}>
      {Array.from({ length: n }, (_, i) => (
        <WeekStripPart key={i} x={x0} y={12 + i * gy} cell={cell} h={gy - 4} labels={rows <= 5} />
      ))}
      {extra > 0 && <WeekStripPart x={x0} y={12 + n * gy} cell={cell} h={gy - 4} count={extra} colorA="#22c55e" colorB="#22c55e" />}
    </QFig>
  );
};

/** n katica; ha `split` meg van adva, két gyerek katicái. */
const BugsFig: React.FC<{ n: number; split?: number; names?: [string, string] }> = ({ n, split, names }) => {
  if (split !== undefined && names) {
    const m = n - split;
    return (
      <QFig h={110}>
        <text x="66" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
          {names[0]}
        </text>
        {Array.from({ length: split }, (_, i) => (
          <Ladybug key={`a${i}`} cx={30 + i * 36} cy={66} s={0.75} />
        ))}
        <line x1="134" y1="10" x2="134" y2="100" stroke="#cbd5e1" strokeWidth="2" />
        <text x="196" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
          {names[1]}
        </text>
        {Array.from({ length: m }, (_, i) => (
          <Ladybug key={`b${i}`} cx={170 + i * 40} cy={66} s={0.75} />
        ))}
      </QFig>
    );
  }
  const gap = Math.min(64, 230 / n);
  const x0 = 130 - ((n - 1) * gap) / 2;
  return (
    <QFig h={100}>
      {Array.from({ length: n }, (_, i) => (
        <Ladybug key={i} cx={x0 + i * gap} cy={56} s={0.95} />
      ))}
    </QFig>
  );
};

/** rows sor, soronként 7 korong. `split`: 5 kék + 2 narancs. */
const ArrayFig: React.FC<{ rows: number; split?: boolean }> = ({ rows, split = false }) => {
  const gap = rows > 6 ? 12 : 15;
  const h = 26 + rows * gap;
  return (
    <QFig h={h}>
      <DotArrayPart x={88} y={20} rows={rows} cols={7} gap={gap} r={gap * 0.37} splitCol={split ? 5 : 99} />
      <text x="40" y={20 + ((rows - 1) * gap) / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">
        {rows} sor
      </text>
    </QFig>
  );
};

/** Szöcske-számegyenes 0–70. */
const JumpsFig: React.FC<{ jumps: number; endQuestion?: boolean; target?: number; band?: [number, number] }> = ({
  jumps,
  endQuestion = true,
  target,
  band
}) => {
  const x = 16;
  const w = 222;
  const u = w / 70;
  return (
    <QFig h={110}>
      {band && <rect x={x + band[0] * u} y={34} width={(band[1] - band[0]) * u} height={44} fill="#fde68a" opacity="0.7" rx="4" />}
      {target !== undefined ? (
        <>
          <JumpLinePart x={x} y={72} w={w} max={70} jumps={1} step={7} color="#16a34a" />
          <text x={x + 3.5 * u} y={34} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#16a34a">
            7
          </text>
          <circle cx={x + target * u} cy={72} r="5" fill={UNK} />
          <text x={x + target * u} y={52} textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>
            {target}
          </text>
        </>
      ) : (
        <JumpLinePart x={x} y={72} w={w} max={70} jumps={jumps} step={7} color="#16a34a" endQuestion={endQuestion} />
      )}
    </QFig>
  );
};

/** Számsor dobozokban. */
const SeqFig: React.FC<{ items: string[] }> = ({ items }) => {
  const w = 44;
  const gap = 6;
  const x0 = 130 - (items.length * w + (items.length - 1) * gap) / 2;
  return (
    <QFig h={70}>
      {items.map((t, i) => (
        <g key={i}>
          <rect x={x0 + i * (w + gap)} y={16} width={w} height={38} rx="8" fill={t === '?' ? '#fee2e2' : '#cffafe'} stroke={t === '?' ? UNK : '#0891b2'} strokeWidth="2" />
          <text x={x0 + i * (w + gap) + w / 2} y={43} textAnchor="middle" fontSize="20" fontWeight="bold" fill={t === '?' ? UNK : '#164e63'}>
            {t}
          </text>
        </g>
      ))}
    </QFig>
  );
};

/** ? darab hét = total nap */
const HowManyWeeksFig: React.FC<{ total: number }> = ({ total }) => (
  <QFig h={80}>
    <text x="30" y="50" textAnchor="middle" fontSize="30" fontWeight="bold" fill={UNK}>
      ?
    </text>
    <text x="52" y="50" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#334155">
      ·
    </text>
    <WeekStripPart x={64} y={26} cell={17} h={24} />
    <text x="216" y="49" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#334155">
      = {total}
    </text>
  </QFig>
);

const CommuteFig: React.FC = () => (
  <QFig h={120}>
    <DotArrayPart x={20} y={44} rows={3} cols={7} gap={14} r={5} colorA="#0ea5e9" />
    <text x="62" y="106" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#075985">
      3 · 7
    </text>
    <text x="134" y="64" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#334155">
      =
    </text>
    <DotArrayPart x={180} y={14} rows={7} cols={3} gap={12} r={4.6} colorA="#f97316" />
    <text x="212" y="114" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9a3412">
      7 · <tspan fill={UNK}>?</tspan>
    </text>
  </QFig>
);

/** n doboz zsírkréta, mindegyikben 7 színes kréta. */
const CrayonBoxesFig: React.FC<{ n: number }> = ({ n }) => {
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#a855f7'];
  const perRow = Math.min(n, 3);
  const rows = Math.ceil(n / perRow);
  const bw = 66;
  const gx = 78;
  const x0 = 130 - ((perRow - 1) * gx + bw) / 2;
  const h = 20 + rows * 50;
  return (
    <QFig h={h}>
      {Array.from({ length: n }, (_, b) => {
        const bx = x0 + (b % perRow) * gx;
        const by = 12 + Math.floor(b / perRow) * 50;
        return (
          <g key={b}>
            {colors.map((c, i) => (
              <g key={i}>
                <rect x={bx + 5 + i * 8.2} y={by + 4} width="6" height="22" rx="1.5" fill={c} stroke="#1e293b" strokeWidth="0.8" />
                <path d={`M ${bx + 5 + i * 8.2} ${by + 4} L ${bx + 8 + i * 8.2} ${by - 2} L ${bx + 11 + i * 8.2} ${by + 4} Z`} fill={c} stroke="#1e293b" strokeWidth="0.8" />
              </g>
            ))}
            <rect x={bx} y={by + 16} width={bw} height="24" rx="4" fill="#fde68a" stroke="#92400e" strokeWidth="2" />
          </g>
        );
      })}
    </QFig>
  );
};

const MachineFig: React.FC<{ start: number; ops: string[] }> = ({ start, ops }) => {
  const n = ops.length + 1;
  const w = 40;
  const gap = (240 - n * w) / ops.length;
  return (
    <QFig h={84}>
      {Array.from({ length: n }, (_, i) => {
        const bx = 10 + i * (w + gap);
        const label = i === 0 ? String(start) : i === n - 1 ? '?' : '';
        return (
          <g key={i}>
            <rect x={bx} y={36} width={w} height={34} rx="8" fill={label === '?' ? '#fee2e2' : '#cffafe'} stroke={label === '?' ? UNK : '#0891b2'} strokeWidth="2" />
            <text x={bx + w / 2} y={60} textAnchor="middle" fontSize="18" fontWeight="bold" fill={label === '?' ? UNK : '#164e63'}>
              {label}
            </text>
            {i < ops.length && (
              <>
                <path d={`M ${bx + w + 2} 46 Q ${bx + w + gap / 2} 22 ${bx + w + gap - 2} 46`} fill="none" stroke="#ea580c" strokeWidth="2" />
                <text x={bx + w + gap / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#c2410c">
                  {ops[i]}
                </text>
              </>
            )}
          </g>
        );
      })}
    </QFig>
  );
};

/** Szakaszos ábra: az egyik 1 egység, a másik `times` egység. */
const BarsFig: React.FC<{ unit: string; times: number; names: [string, string] }> = ({ unit, times, names }) => {
  const uw = Math.min(26, 168 / times);
  return (
    <QFig h={96}>
      <text x="12" y="34" fontSize="13" fontWeight="bold" fill="#334155">
        {names[0]}
      </text>
      <rect x="74" y="18" width={uw} height="24" rx="4" fill="#a5f3fc" stroke="#0e7490" strokeWidth="2" />
      <text x={74 + uw / 2} y="35" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#164e63">
        {unit}
      </text>
      <text x="12" y="74" fontSize="13" fontWeight="bold" fill="#334155">
        {names[1]}
      </text>
      {Array.from({ length: times }, (_, i) => (
        <rect key={i} x={74 + i * uw} y="58" width={uw} height="24" rx="4" fill="#fed7aa" stroke="#c2410c" strokeWidth="2" />
      ))}
      <text x={74 + times * uw + 12} y="76" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>
        ?
      </text>
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const MULT7_G2_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'mult7g2-q1',
    level: 1,
    questionTypeBadge: 'Hetes csíkok',
    figure: <WeeksFig n={2} />,
    question: 'Egy csík egy hét, 7 nap. Hány nap van a 2 csíkon?',
    options: ['14', '9', '12', '21'],
    correctAnswer: 0,
    explanation: '7 + 7 = 14. Szorzással: 2 · 7 = 14 nap.'
  },
  {
    id: 'mult7g2-q2',
    level: 1,
    questionTypeBadge: 'Katicák pettyei',
    figure: <BugsFig n={3} />,
    question: 'Minden katicának 7 pettye van. Hány petty van összesen?',
    options: ['21', '10', '18', '24'],
    correctAnswer: 0,
    explanation: '7 + 7 + 7 = 21. Ez 3 · 7 = 21 petty. A 10 az lenne, ha 3 + 7-et számolnál.'
  },
  {
    id: 'mult7g2-q3',
    level: 1,
    questionTypeBadge: 'Összeadásból szorzás',
    figure: <WeeksFig n={4} />,
    question: 'Melyik szorzás illik ide? 7 + 7 + 7 + 7',
    options: ['4 · 7', '7 · 7', '4 + 7', '3 · 7'],
    correctAnswer: 0,
    explanation: '4 darab 7-es van. Ez 4 · 7.'
  },
  {
    id: 'mult7g2-q4',
    level: 1,
    questionTypeBadge: 'Pontrács',
    figure: <ArrayFig rows={5} />,
    question: 'Soronként 7 korong van. Hány korong van összesen?',
    options: ['35', '30', '12', '42'],
    correctAnswer: 0,
    explanation: '5 sor, soronként 7. 5 · 7 = 35 korong.'
  },
  {
    id: 'mult7g2-q5',
    level: 1,
    questionTypeBadge: 'Szorzótábla',
    question: 'Mennyi 6 · 7?',
    options: ['42', '36', '13', '48'],
    correctAnswer: 0,
    explanation: '5 · 7 = 35, és még egy 7: 35 + 7 = 42.'
  },
  {
    id: 'mult7g2-q6',
    level: 1,
    questionTypeBadge: 'Szöcske ugrik',
    figure: <JumpsFig jumps={4} />,
    question: 'A szöcske mindig 7-et ugrik. Hová ér 4 ugrás után?',
    options: ['28', '11', '24', '21'],
    correctAnswer: 0,
    explanation: '7, 14, 21, 28. Tehát 4 · 7 = 28.'
  },
  {
    id: 'mult7g2-q7',
    level: 1,
    questionTypeBadge: 'Tízszer',
    question: 'Mennyi 10 · 7?',
    options: ['70', '17', '77', '60'],
    correctAnswer: 0,
    explanation: '10 darab hetes: 10 · 7 = 70. A 17 az 10 + 7 lenne.'
  },
  {
    id: 'mult7g2-q8',
    level: 1,
    questionTypeBadge: 'Számsor',
    figure: <SeqFig items={['7', '14', '21', '?']} />,
    question: 'Hetesével lépünk. Melyik szám jön?',
    options: ['28', '22', '27', '35'],
    correctAnswer: 0,
    explanation: '21 + 7 = 28. A sorban mindig 7-tel több jön.'
  },
  {
    id: 'mult7g2-q9',
    level: 1,
    questionTypeBadge: 'Nulla',
    question: 'Mennyi 0 · 7?',
    options: ['0', '7', '70', '1'],
    correctAnswer: 0,
    explanation: 'Nulla darab hetes: semmi. 0 · 7 = 0.'
  },
  {
    id: 'mult7g2-q10',
    level: 1,
    questionTypeBadge: 'Hetek és napok',
    figure: <WeeksFig n={5} />,
    question: 'Egy hét 7 nap. Hány nap 5 hét?',
    options: ['35', '12', '30', '40'],
    correctAnswer: 0,
    explanation: '5 · 7 = 35 nap. A 12 az 5 + 7 lenne.'
  },

  // ----- 2. szint -----
  {
    id: 'mult7g2-q11',
    level: 2,
    questionTypeBadge: 'Szorzótábla',
    figure: <ArrayFig rows={8} split />,
    question: 'Mennyi 8 · 7?',
    options: ['56', '54', '63', '15'],
    correctAnswer: 0,
    explanation: '8 · 5 = 40 és 8 · 2 = 16. 40 + 16 = 56.'
  },
  {
    id: 'mult7g2-q12',
    level: 2,
    questionTypeBadge: '5 + 2 trükk',
    figure: <ArrayFig rows={6} split />,
    question: '6 · 5 = 30 és 6 · 2 = 12. Mennyi 6 · 7?',
    options: ['42', '37', '32', '48'],
    correctAnswer: 0,
    explanation: 'Add össze a kéket és a narancsot: 30 + 12 = 42.'
  },
  {
    id: 'mult7g2-q13',
    level: 2,
    questionTypeBadge: 'Szorzótábla',
    question: 'Mennyi 9 · 7?',
    options: ['63', '56', '16', '61'],
    correctAnswer: 0,
    explanation: '10 · 7 = 70, és egy 7-tel kevesebb: 70 − 7 = 63.'
  },
  {
    id: 'mult7g2-q14',
    level: 2,
    questionTypeBadge: 'Hány hét?',
    figure: <HowManyWeeksFig total={49} />,
    question: 'Hány hetes csík kell 49 naphoz? Mi kerül a ? helyére?',
    options: ['7', '6', '8', '42'],
    correctAnswer: 0,
    explanation: '7 · 7 = 49. Tehát 49 nap 7 hét.'
  },
  {
    id: 'mult7g2-q15',
    level: 2,
    questionTypeBadge: 'Hány ugrás?',
    figure: <JumpsFig jumps={0} target={35} />,
    question: 'A szöcske 0-ról indul, és mindig 7-et ugrik. Hány ugrással ér a 35-re?',
    options: ['5', '7', '35', '6'],
    correctAnswer: 0,
    explanation: '7, 14, 21, 28, 35: ez 5 ugrás. 5 · 7 = 35.'
  },
  {
    id: 'mult7g2-q16',
    level: 2,
    questionTypeBadge: '7-es tábla',
    question: 'Melyik szám van a 7-es szorzótáblában?',
    options: ['56', '27', '54', '62'],
    correctAnswer: 0,
    explanation: '8 · 7 = 56. A 27, az 54 és a 62 nincs benne: 28, 49, 63 a közeli 7-es számok.'
  },
  {
    id: 'mult7g2-q17',
    level: 2,
    questionTypeBadge: 'Felcserélés',
    figure: <CommuteFig />,
    question: 'Mi kerül a ? helyére? 3 · 7 = 7 · ?',
    options: ['3', '7', '21', '10'],
    correctAnswer: 0,
    explanation: 'Elfordítva ugyanannyi korong: 3 · 7 = 7 · 3 = 21.'
  },
  {
    id: 'mult7g2-q18',
    level: 2,
    questionTypeBadge: 'Hétszer hét',
    figure: <ArrayFig rows={7} />,
    question: 'Mennyi 7 · 7?',
    options: ['49', '14', '42', '56'],
    correctAnswer: 0,
    explanation: '7 darab hetes: 7 · 7 = 49. A 14 csak 7 + 7.'
  },
  {
    id: 'mult7g2-q19',
    level: 2,
    questionTypeBadge: 'Krétásdobozok',
    figure: <CrayonBoxesFig n={6} />,
    question: 'Egy dobozban 7 zsírkréta van. Hány kréta van 6 dobozban?',
    options: ['42', '13', '36', '49'],
    correctAnswer: 0,
    explanation: '6 · 7 = 42 kréta. A 36 a 6 · 6 lenne.'
  },
  {
    id: 'mult7g2-q20',
    level: 2,
    questionTypeBadge: 'Melyik több?',
    question: 'Melyik a több? 5 · 7 vagy 6 · 6?',
    options: ['6 · 6', '5 · 7', 'Egyformák'],
    correctAnswer: 0,
    explanation: '5 · 7 = 35 és 6 · 6 = 36. A 36 eggyel több.'
  },

  // ----- 3. szint -----
  {
    id: 'mult7g2-q21',
    level: 3,
    questionTypeBadge: 'Hetek és napok',
    figure: <WeeksFig n={2} extra={3} />,
    question: 'Mira 2 hét és 3 nap múlva megy táborba. Hány nap múlva megy?',
    options: ['17', '12', '21', '14'],
    correctAnswer: 0,
    explanation: '2 hét = 2 · 7 = 14 nap. 14 + 3 = 17 nap.'
  },
  {
    id: 'mult7g2-q22',
    level: 3,
    questionTypeBadge: 'Két gyerek katicái',
    figure: <BugsFig n={5} split={3} names={['Peti', 'Lili']} />,
    question: 'Peti 3, Lili 2 katicát rajzolt. Mindegyiknek 7 pettye van. Hány petty van összesen?',
    options: ['35', '12', '28', '42'],
    correctAnswer: 0,
    explanation: '3 + 2 = 5 katica. 5 · 7 = 35 petty. (Vagy: 21 + 14 = 35.)'
  },
  {
    id: 'mult7g2-q23',
    level: 3,
    questionTypeBadge: 'Szorzás és kivonás',
    question: 'Mennyi 8 · 7 − 6?',
    options: ['50', '56', '62', '8'],
    correctAnswer: 0,
    explanation: 'Előbb szorozz: 8 · 7 = 56. Aztán vonj ki: 56 − 6 = 50.'
  },
  {
    id: 'mult7g2-q24',
    level: 3,
    questionTypeBadge: 'Számológép',
    figure: <MachineFig start={4} ops={['· 7', '+ 5']} />,
    question: 'Kezdd a 4-gyel! Szorozd meg 7-tel, aztán adj hozzá 5-öt! Mit kapsz?',
    options: ['33', '16', '48', '28'],
    correctAnswer: 0,
    explanation: '4 · 7 = 28, és 28 + 5 = 33. Figyelj a sorrendre!'
  },
  {
    id: 'mult7g2-q25',
    level: 3,
    questionTypeBadge: 'Hétszer annyi',
    figure: <BarsFig unit="6" times={7} names={['Bence', 'Dóri']} />,
    question: 'Bence 6 virágot szedett. Dóri 7-szer annyit. Hány virágot szedett Dóri?',
    options: ['42', '13', '36', '49'],
    correctAnswer: 0,
    explanation: '7-szer 6 = 7 · 6 = 42. Ez ugyanannyi, mint 6 · 7 = 42.'
  },
  {
    id: 'mult7g2-q26',
    level: 3,
    questionTypeBadge: 'Csigák és hangyák',
    figure: <BarsFig unit="5" times={7} names={['Csiga', 'Hangya']} />,
    question: 'A fán 5 csiga van. Hangya 7-szer annyi. Hány csiga és hangya van összesen?',
    options: ['40', '35', '12', '30'],
    correctAnswer: 0,
    explanation: 'Hangya: 5 · 7 = 35. Összesen: 35 + 5 = 40.'
  },
  {
    id: 'mult7g2-q27',
    level: 3,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Mi kerül a □ helyére? 7 · □ = 56',
    options: ['8', '7', '9', '49'],
    correctAnswer: 0,
    explanation: '7 · 8 = 8 · 7 = 56. A 7 rossz, mert 7 · 7 = 49.'
  },
  {
    id: 'mult7g2-q28',
    level: 3,
    questionTypeBadge: 'Melyik igaz?',
    question: 'Melyik egyenlőség igaz?',
    options: ['7 · 4 = 2 · 14', '7 · 3 = 3 · 8', '7 · 2 = 7 + 2', '7 · 5 = 30'],
    correctAnswer: 0,
    explanation: '7 · 4 = 28 és 2 · 14 = 14 + 14 = 28. Mindkét oldalon 28.'
  },
  {
    id: 'mult7g2-q29',
    level: 3,
    questionTypeBadge: 'Számegyenes',
    figure: <JumpsFig jumps={10} endQuestion={false} band={[20, 50]} />,
    question: 'A szöcske 0-tól 70-ig ugrál. Hány helyen ér le a sárga részen, 20 és 50 között?',
    options: ['5', '4', '3', '30'],
    correctAnswer: 0,
    explanation: 'A 20 és 50 közötti 7-es számok: 21, 28, 35, 42, 49. Ez 5 hely.'
  },
  {
    id: 'mult7g2-q30',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Melyik szám illik a □ helyére? 4 · 7 < □ · 7 < 6 · 7',
    options: ['5', '4', '6', '29'],
    correctAnswer: 0,
    explanation: '4 · 7 = 28 és 6 · 7 = 42. 5 · 7 = 35, ez a kettő között van.'
  }
];

export const Mult7G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="szorzas"
    topicId="g2-szorzas-7-quiz"
    subtopicId="szorzas-7-tel"
    title="6. Szorzás 7-tel – Kvíz"
    subtitle="30 feladat 3 szinten: hetes csoportok, a 7-es szorzótábla, az 5 + 2 trükk, hetek és napok, bogaras szöveges feladatok."
    badge="2. OSZTÁLY • IV. SZORZÁS • KVÍZ"
    questions={MULT7_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'A 7-es szorzótábla',
        items: ['1 · 7 = 7, 2 · 7 = 14, 3 · 7 = 21', '4 · 7 = 28, 5 · 7 = 35, 6 · 7 = 42', '7 · 7 = 49, 8 · 7 = 56', '9 · 7 = 63, 10 · 7 = 70']
      },
      {
        title: '5 + 2 trükk',
        items: ['7 = 5 + 2', 'Előbb · 5, aztán · 2, végül add össze!', '6 · 5 = 30, 6 · 2 = 12 → 42', '8 · 5 = 40, 8 · 2 = 16 → 56']
      },
      {
        title: 'Jó tudni',
        items: ['1 hét = 7 nap', '0 · 7 = 0', '3 · 7 = 7 · 3', 'Előbb szorozz, aztán adj hozzá!']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<Mult7G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<Mult7G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default Mult7G2Quiz;
