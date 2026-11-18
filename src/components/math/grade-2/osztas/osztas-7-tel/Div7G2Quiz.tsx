import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Div7G2Matcher } from './Div7G2Matcher';
import { Div7G2Sorter } from './Div7G2Sorter';
import { DIV7_FONT, DAY_LABELS, PLATE_COLORS, PlatePart, DotRowsPart, DayGridPart, JumpLinePart } from './Div7G2Parts';
import { Tulip } from './Div7G2Figures';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV7_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** n tulipán soronként 7-esével (nincs bekarikázva). */
const FlowersFig: React.FC<{ n: number }> = ({ n }) => {
  const rows = Math.ceil(n / 7);
  const h = 22 + rows * 34;
  return (
    <QFig h={h}>
      {Array.from({ length: n }, (_, i) => (
        <Tulip key={i} x={40 + (i % 7) * 30} y={22 + Math.floor(i / 7) * 34} s={1} color={['#e11d48', '#f59e0b', '#a855f7'][Math.floor(i / 7) % 3]} />
      ))}
    </QFig>
  );
};

/** total darab (kupac) → 7 tányér, egy tányéron ? */
const PlatesQFig: React.FC<{ total: number; label: string }> = ({ total, label }) => (
  <QFig h={110}>
    <circle cx="96" cy="28" r="10" fill="#e11d48" stroke="#881337" strokeWidth="1.5" />
    <text x="140" y="35" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#9f1239">
      {total} {label}
    </text>
    {Array.from({ length: 7 }, (_, i) => (
      <g key={i}>
        <PlatePart cx={28 + i * 34} cy={76} w={30} question={i === 0} />
        <text x={28 + i * 34} y={102} textAnchor="middle" fontSize="11" fontWeight="bold" fill={PLATE_COLORS[i]}>
          {i + 1}.
        </text>
      </g>
    ))}
  </QFig>
);

/** Naptár n nappal. */
const CalendarFig: React.FC<{ n: number; restFrom?: number }> = ({ n, restFrom }) => {
  const rows = Math.ceil(n / 7);
  const cell = rows > 6 ? 13 : rows > 4 ? 16 : 22;
  const h = 30 + rows * cell;
  return (
    <QFig h={h}>
      <DayGridPart x={130 - 3.5 * cell} y={22} n={n} cell={cell} restFrom={restFrom} />
    </QFig>
  );
};

/** Szöcske-számegyenes: `jumps` ugrás, „? ugrás” felirat. */
const JumpsFig: React.FC<{ jumps: number }> = ({ jumps }) => (
  <QFig h={110}>
    <JumpLinePart x={16} y={74} w={222} jumps={jumps} askJumps />
  </QFig>
);

/** n fekete petty egy kupacban, mellette: 1 katica = 7 petty. */
const SpotsFig: React.FC<{ n: number }> = ({ n }) => {
  const perRow = 7;
  const rows = Math.ceil(n / perRow);
  const h = Math.max(96, 30 + rows * 14);
  return (
    <QFig h={h}>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={26 + (i % perRow) * 15 + (Math.floor(i / perRow) % 2) * 6} cy={22 + Math.floor(i / perRow) * 14} r="5" fill="#1e293b" />
      ))}
      <g transform="translate(196 44)">
        <ellipse cx="0" cy="0" rx="16" ry="18" fill="#ef4444" stroke="#1e293b" strokeWidth="2" />
        <circle cx="0" cy="-18" r="6.5" fill="#1e293b" />
        <line x1="0" y1="-14" x2="0" y2="18" stroke="#1e293b" strokeWidth="1.5" />
        {[
          [0, -9],
          [-8, -3],
          [8, -3],
          [-9, 7],
          [9, 7],
          [-5, 13],
          [5, 13]
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.6" fill="#1e293b" />
        ))}
      </g>
      <text x="196" y="82" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#991b1b">
        = 7 petty
      </text>
    </QFig>
  );
};

/** a → (op) → ? */
const ArrowFig: React.FC<{ from: number; op: string }> = ({ from, op }) => (
  <QFig h={90}>
    <rect x="22" y="38" width="62" height="38" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="2.5" />
    <text x="53" y="64" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#164e63">
      {from}
    </text>
    <path d="M 86 46 Q 130 6 174 46" fill="none" stroke="#e11d48" strokeWidth="3" />
    <polygon points="174,46 162,42 168,34" fill="#e11d48" />
    <text x="130" y="22" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#be123c">
      {op}
    </text>
    <rect x="176" y="38" width="62" height="38" rx="10" fill="#fee2e2" stroke={UNK} strokeWidth="2.5" />
    <text x="207" y="64" textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>
      ?
    </text>
  </QFig>
);

/** n korong hetes sorokban, az első `groups` sor bekarikázva. */
const RemainderFig: React.FC<{ n: number; groups?: number }> = ({ n, groups = 0 }) => {
  const rows = Math.ceil(n / 7);
  const gap = rows > 5 ? 15 : 20;
  const h = 26 + rows * gap;
  return (
    <QFig h={h}>
      <DotRowsPart x={130 - 3 * gap} y={20} n={n} gap={gap} r={gap * 0.33} groups={groups} />
    </QFig>
  );
};

const CompareFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <QFig h={80}>
    <rect x="12" y="18" width="94" height="44" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="2" />
    <text x="59" y="47" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#164e63">
      {left}
    </text>
    <circle cx="130" cy="40" r="17" fill="#fee2e2" stroke={UNK} strokeWidth="2" />
    <text x="130" y="47" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>
      ?
    </text>
    <rect x="154" y="18" width="94" height="44" rx="10" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
    <text x="201" y="47" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#9a3412">
      {right}
    </text>
  </QFig>
);

/** Csónakok: 7 hely mindegyikben, és `kids` gyerek vár a parton. */
const BoatsQFig: React.FC<{ kids: number }> = ({ kids }) => (
  <QFig h={100}>
    {Array.from({ length: kids }, (_, i) => (
      <circle key={i} cx={20 + (i % 12) * 19} cy={20 + Math.floor(i / 12) * 16} r="6" fill={PLATE_COLORS[i % 7]} stroke="#1e293b" strokeWidth="1" />
    ))}
    <path d="M 8 74 Q 40 68 72 74 T 136 74 T 200 74 T 252 74" fill="none" stroke="#38bdf8" strokeWidth="3" />
    <path d="M 96 66 L 164 66 L 154 86 L 106 86 Z" fill="#a16207" stroke="#422006" strokeWidth="2" />
    <text x="130" y="81" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
      7 hely
    </text>
  </QFig>
);

/** Szakaszos ábra: a nagyobb szám `times` egyenlő részből áll. */
const BarsFig: React.FC<{ big: string; times: number; names: [string, string] }> = ({ big, times, names }) => {
  const uw = 168 / times;
  return (
    <QFig h={96}>
      <text x="12" y="34" fontSize="13" fontWeight="bold" fill="#334155">
        {names[0]}
      </text>
      {Array.from({ length: times }, (_, i) => (
        <rect key={i} x={78 + i * uw} y="18" width={uw} height="24" rx="3" fill="#fed7aa" stroke="#c2410c" strokeWidth="2" />
      ))}
      <text x="162" y="35" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#7c2d12">
        {big}
      </text>
      <text x="12" y="74" fontSize="13" fontWeight="bold" fill="#334155">
        {names[1]}
      </text>
      <rect x="78" y="58" width={uw} height="24" rx="3" fill="#a5f3fc" stroke="#0e7490" strokeWidth="2" />
      <text x={78 + uw / 2} y="76" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>
        ?
      </text>
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

/** A hét napjai sorban, „Ma” jelöléssel. */
const WeekdaysFig: React.FC<{ today: number }> = ({ today }) => (
  <QFig h={84}>
    {DAY_LABELS.map((d, i) => (
      <g key={i}>
        <rect x={15 + i * 33} y={30} width="30" height="34" rx="6" fill={i === today ? '#0891b2' : '#e0f2fe'} stroke="#0e7490" strokeWidth="2" />
        <text x={30 + i * 33} y={53} textAnchor="middle" fontSize="15" fontWeight="bold" fill={i === today ? '#ffffff' : '#164e63'}>
          {d}
        </text>
      </g>
    ))}
    <text x={30 + today * 33} y={22} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0e7490">
      Ma
    </text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const DIV7_G2_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'div7g2-q1',
    level: 1,
    questionTypeBadge: 'Csokrok',
    figure: <FlowersFig n={21} />,
    question: '21 tulipán van. Egy csokorba 7 kell. Hány csokor lesz?',
    options: ['3', '14', '7', '4'],
    correctAnswer: 0,
    explanation: 'Hetesével: 7, 14, 21. Ez 3 csokor. 21 : 7 = 3.'
  },
  {
    id: 'div7g2-q2',
    level: 1,
    questionTypeBadge: 'Szétosztás',
    figure: <PlatesQFig total={14} label="eper" />,
    question: '14 epret 7 tányérra osztunk egyenlően. Mennyi jut egy tányérra?',
    options: ['2', '7', '21', '3'],
    correctAnswer: 0,
    explanation: '14 : 7 = 2, mert 2 · 7 = 14.'
  },
  {
    id: 'div7g2-q3',
    level: 1,
    questionTypeBadge: 'Bennfoglaló tábla',
    question: 'Mennyi 35 : 7?',
    options: ['5', '28', '6', '7'],
    correctAnswer: 0,
    explanation: '5 · 7 = 35, ezért 35 : 7 = 5. A 28 az lenne, ha 7-et vonnál ki.'
  },
  {
    id: 'div7g2-q4',
    level: 1,
    questionTypeBadge: 'Hány hét?',
    figure: <CalendarFig n={28} />,
    question: 'A naptár egy sora egy hét. Hány hét a 28 nap?',
    options: ['4', '21', '3', '7'],
    correctAnswer: 0,
    explanation: '4 sor van. 28 : 7 = 4, mert 4 · 7 = 28.'
  },
  {
    id: 'div7g2-q5',
    level: 1,
    questionTypeBadge: 'Bennfoglaló tábla',
    question: 'Mennyi 49 : 7?',
    options: ['7', '6', '42', '8'],
    correctAnswer: 0,
    explanation: '7 · 7 = 49, ezért 49 : 7 = 7.'
  },
  {
    id: 'div7g2-q6',
    level: 1,
    questionTypeBadge: 'Szöcske ugrik',
    figure: <JumpsFig jumps={6} />,
    question: 'A szöcske mindig 7-et ugrik. Hány ugrással ér 0-tól a 42-ig?',
    options: ['6', '7', '35', '5'],
    correctAnswer: 0,
    explanation: '7, 14, 21, 28, 35, 42: ez 6 ugrás. 42 : 7 = 6.'
  },
  {
    id: 'div7g2-q7',
    level: 1,
    questionTypeBadge: 'Tíz hetes',
    question: 'Mennyi 70 : 7?',
    options: ['10', '63', '1', '7'],
    correctAnswer: 0,
    explanation: '10 · 7 = 70, ezért 70 : 7 = 10.'
  },
  {
    id: 'div7g2-q8',
    level: 1,
    questionTypeBadge: 'Katicák pettyei',
    figure: <SpotsFig n={14} />,
    question: 'Ennyi petty van. Minden katicának 7 pettye van. Hány katicához elég?',
    options: ['2', '7', '21', '3'],
    correctAnswer: 0,
    explanation: '14 petty, katicánként 7: 14 : 7 = 2 katica.'
  },
  {
    id: 'div7g2-q9',
    level: 1,
    questionTypeBadge: 'Szorzás segít',
    question: 'Melyik szorzás segít? 56 : 7 = ?',
    options: ['8 · 7 = 56', '7 · 7 = 49', '6 · 7 = 42', '9 · 7 = 63'],
    correctAnswer: 0,
    explanation: 'Azt keressük, hányszor 7 az 56. 8 · 7 = 56, tehát 56 : 7 = 8.'
  },
  {
    id: 'div7g2-q10',
    level: 1,
    questionTypeBadge: 'Nulla',
    question: 'Mennyi 0 : 7?',
    options: ['0', '7', '1', '70'],
    correctAnswer: 0,
    explanation: 'Ha nincs mit szétosztani, senki sem kap semmit. 0 : 7 = 0.'
  },

  // ----- 2. szint -----
  {
    id: 'div7g2-q11',
    level: 2,
    questionTypeBadge: 'Hetede',
    figure: <ArrowFig from={63} op=": 7" />,
    question: 'Mennyi a 63 hetede?',
    options: ['9', '56', '8', '70'],
    correctAnswer: 0,
    explanation: 'Hetede: osztunk 7-tel. 63 : 7 = 9, mert 9 · 7 = 63.'
  },
  {
    id: 'div7g2-q12',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Mi kerül a □ helyére? □ : 7 = 6',
    options: ['42', '13', '36', '49'],
    correctAnswer: 0,
    explanation: 'Visszafelé szorzunk: 6 · 7 = 42. Tehát 42 : 7 = 6.'
  },
  {
    id: 'div7g2-q13',
    level: 2,
    questionTypeBadge: 'Maradék',
    figure: <RemainderFig n={9} groups={1} />,
    question: 'Hány korong maradt ki a karikából?',
    options: ['2', '1', '9', '7'],
    correctAnswer: 0,
    explanation: '1 karika = 7 korong. 9 korongból 2 maradt ki. Ez a maradék.'
  },
  {
    id: 'div7g2-q14',
    level: 2,
    questionTypeBadge: 'Osztozkodás',
    figure: <PlatesQFig total={42} label="matrica" />,
    question: '7 gyerek 42 matricán osztozik egyenlően. Mennyi jut egy gyereknek?',
    options: ['6', '35', '7', '49'],
    correctAnswer: 0,
    explanation: '42 : 7 = 6, mert 6 · 7 = 42. Mindenki 6 matricát kap.'
  },
  {
    id: 'div7g2-q15',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Mi kerül a □ helyére? 7 · □ = 63',
    options: ['9', '8', '56', '7'],
    correctAnswer: 0,
    explanation: '7 · 9 = 63. Ezt mutatja az osztás is: 63 : 7 = 9.'
  },
  {
    id: 'div7g2-q16',
    level: 2,
    questionTypeBadge: 'Melyik osztás?',
    question: 'Melyik osztás eredménye 5?',
    options: ['35 : 7', '30 : 7', '42 : 7', '5 : 7'],
    correctAnswer: 0,
    explanation: '5 · 7 = 35, ezért 35 : 7 = 5. A 42 : 7 = 6.'
  },
  {
    id: 'div7g2-q17',
    level: 2,
    questionTypeBadge: 'Csoport és maradék',
    figure: <RemainderFig n={16} groups={2} />,
    question: 'Hány hetes csoport lett, és mennyi maradt?',
    options: ['2 csoport, maradt 2', '1 csoport, maradt 9', '3 csoport, maradt 0', '2 csoport, maradt 1'],
    correctAnswer: 0,
    explanation: '2 karika = 14 korong. 16 − 14 = 2 maradt. Ellenőrzés: 2 · 7 + 2 = 16.'
  },
  {
    id: 'div7g2-q18',
    level: 2,
    questionTypeBadge: 'Hány hét?',
    figure: <CalendarFig n={63} />,
    question: 'Hány hét a 63 nap?',
    options: ['9', '8', '56', '7'],
    correctAnswer: 0,
    explanation: '63 : 7 = 9, mert 9 · 7 = 63. A naptárnak 9 sora van.'
  },
  {
    id: 'div7g2-q19',
    level: 2,
    questionTypeBadge: 'Melyik nagyobb?',
    figure: <CompareFig left="42 : 7" right="28 : 4" />,
    question: 'Melyik a nagyobb?',
    options: ['28 : 4', '42 : 7', 'Egyformák'],
    correctAnswer: 0,
    explanation: '42 : 7 = 6 és 28 : 4 = 7. A 7 a nagyobb.'
  },
  {
    id: 'div7g2-q20',
    level: 2,
    questionTypeBadge: 'Hány katica?',
    figure: <SpotsFig n={35} />,
    question: 'Egy levélen 35 petty látszik. Minden katicának 7 pettye van. Hány katica ül a levélen?',
    options: ['5', '28', '6', '42'],
    correctAnswer: 0,
    explanation: '35 : 7 = 5, mert 5 · 7 = 35.'
  },

  // ----- 3. szint -----
  {
    id: 'div7g2-q21',
    level: 3,
    questionTypeBadge: 'Ceruzakötegek',
    figure: <RemainderFig n={30} />,
    question: '30 ceruzát kötünk össze hetesével. Hány köteg lesz, és mennyi marad?',
    options: ['4 köteg, maradt 2', '3 köteg, maradt 9', '5 köteg, maradt 0', '4 köteg, maradt 3'],
    correctAnswer: 0,
    explanation: '4 · 7 = 28, az 5 · 7 = 35 már túl sok. 30 − 28 = 2 marad.'
  },
  {
    id: 'div7g2-q22',
    level: 3,
    questionTypeBadge: 'Mekkora a maradék?',
    question: 'Ha 7-tel osztunk, melyik szám NEM lehet a maradék?',
    options: ['7', '6', '1', '0'],
    correctAnswer: 0,
    explanation: 'A maradék mindig kevesebb, mint 7. Ha 7 maradna, abból még egy csoport lenne!'
  },
  {
    id: 'div7g2-q23',
    level: 3,
    questionTypeBadge: 'Visszafelé maradékkal',
    figure: <RemainderFig n={33} groups={4} />,
    question: '4 hetes csoport lett, és maradt 5 korong. Hány korong volt?',
    options: ['33', '28', '27', '35'],
    correctAnswer: 0,
    explanation: '4 · 7 = 28, és még 5: 28 + 5 = 33.'
  },
  {
    id: 'div7g2-q24',
    level: 3,
    questionTypeBadge: 'Hány csónak kell?',
    figure: <BoatsQFig kids={23} />,
    question: '23 gyerek csónakázik. Egy csónakba 7 gyerek fér. Hány csónak kell?',
    options: ['4', '3', '2', '5'],
    correctAnswer: 0,
    explanation: '3 csónak tele lesz (21 gyerek), 2 gyerek marad. Nekik is kell egy: 4 csónak.'
  },
  {
    id: 'div7g2-q25',
    level: 3,
    questionTypeBadge: 'Szöcskék és katicák',
    figure: <BarsFig big="42" times={7} names={['Szöcske', 'Katica']} />,
    question: 'A réten 42 szöcske van. Ez 7-szer annyi, mint a katicák száma. Hány szöcske és katica van összesen?',
    options: ['48', '6', '49', '35'],
    correctAnswer: 0,
    explanation: 'Katica: 42 : 7 = 6. Összesen: 42 + 6 = 48.'
  },
  {
    id: 'div7g2-q26',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    figure: <MachineFig start={49} ops={[': 7', '· 2']} />,
    question: 'Gondoltam egy számot. Ez a 49 hetedének a kétszerese. Melyik ez?',
    options: ['14', '7', '9', '21'],
    correctAnswer: 0,
    explanation: '49 : 7 = 7. A 7 kétszerese: 7 · 2 = 14.'
  },
  {
    id: 'div7g2-q27',
    level: 3,
    questionTypeBadge: 'A hét napjai',
    figure: <WeekdaysFig today={0} />,
    question: 'Ma hétfő van. Milyen nap lesz 15 nap múlva?',
    options: ['kedd', 'hétfő', 'szerda', 'vasárnap'],
    correctAnswer: 0,
    explanation: '15 nap = 2 hét és 1 nap (2 · 7 + 1 = 15). 2 hét múlva megint hétfő, 1 nappal később kedd.'
  },
  {
    id: 'div7g2-q28',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Melyik szám illik a □ helyére? 56 : 7 < □ < 2 · 5',
    options: ['9', '8', '10', '7'],
    correctAnswer: 0,
    explanation: '56 : 7 = 8 és 2 · 5 = 10. A 8 és a 10 között csak a 9 van.'
  },
  {
    id: 'div7g2-q29',
    level: 3,
    questionTypeBadge: 'Szétosztás maradékkal',
    figure: <RemainderFig n={38} />,
    question: 'Anna 38 cseresznyét oszt szét 7 barátja között egyenlően. Ami marad, azt ő eszi meg. Mennyi jut egy barátnak, és mennyi marad?',
    options: ['5 jut, maradt 3', '4 jut, maradt 10', '6 jut, maradt 0', '5 jut, maradt 4'],
    correctAnswer: 0,
    explanation: '5 · 7 = 35, a 6 · 7 = 42 már túl sok. 38 − 35 = 3 marad. Ellenőrzés: 5 · 7 + 3 = 38.'
  },
  {
    id: 'div7g2-q30',
    level: 3,
    questionTypeBadge: 'Hetek és napok',
    figure: <CalendarFig n={45} restFrom={42} />,
    question: 'Hány hét és hány nap a 45 nap?',
    options: ['6 hét és 3 nap', '5 hét és 10 nap', '7 hét', '6 hét és 2 nap'],
    correctAnswer: 0,
    explanation: '6 · 7 = 42, és 45 − 42 = 3. Tehát 6 hét és 3 nap.'
  }
];

export const Div7G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="osztas"
    topicId="g2-osztas-7-quiz"
    subtopicId="osztas-7-tel"
    title="6. Osztás 7-tel – Kvíz"
    subtitle="30 feladat 3 szinten: csoportosítás és szétosztás, a 7-es bennfoglaló tábla, hetede, napok és hetek, maradékos osztás 7-tel."
    badge="2. OSZTÁLY • V. OSZTÁS • KVÍZ"
    questions={DIV7_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'A 7-es bennfoglaló tábla',
        items: ['14 : 7 = 2, 21 : 7 = 3, 28 : 7 = 4', '35 : 7 = 5, 42 : 7 = 6, 49 : 7 = 7', '56 : 7 = 8, 63 : 7 = 9', '70 : 7 = 10, 0 : 7 = 0']
      },
      {
        title: 'Maradékos osztás',
        items: ['Karikázz be hetesével!', '25 korong: 3 csoport, maradt 4', 'Ellenőrzés: 3 · 7 + 4 = 25', 'A maradék kevesebb, mint 7!']
      },
      {
        title: 'Jó tudni',
        items: ['1 hét = 7 nap', 'Hetede: osztás 7-tel', '42 : 7 = 6, mert 6 · 7 = 42', 'Ha marad, kell még egy csónak!']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<Div7G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<Div7G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default Div7G2Quiz;
