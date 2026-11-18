import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Div2G2Matcher } from './Div2G2Matcher';
import { Div2G2Sorter } from './Div2G2Sorter';
import { DIV2_FONT, DotsPart, PlatePart, DivArrayPart, HalfDoublePart } from './Div2G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 100 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV2_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** `n` korong sorban, opcionálisan kettes keretekkel. */
const QDots: React.FC<{ n: number; pairs?: number; caption?: string; color?: string }> = ({ n, pairs = 0, caption, color = '#3b82f6' }) => {
  const perRow = 10;
  const rows = Math.ceil(n / perRow);
  const step = 22;
  const inFirst = Math.min(n, perRow);
  const x0 = 130 - ((inFirst - 1) * step) / 2;
  const h = 26 + rows * 30 + (caption ? 18 : 0);
  return (
    <QFig h={h}>
      <DotsPart x={x0} y={24} n={n} pairs={pairs} perRow={perRow} step={step} r={8} color={color} />
      {caption && (
        <text x="130" y={h - 10} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
          {caption}
        </text>
      )}
    </QFig>
  );
};

/** Két tányér: `each` darab mindkettőn, vagy „?” és fölötte az összes. */
const QPlates: React.FC<{ each?: number; total?: number; q?: boolean; leftover?: number }> = ({ each = 0, total, q = false, leftover = 0 }) => (
  <QFig h={total !== undefined ? 104 : 84}>
    {total !== undefined && (
      <text x="130" y="22" textAnchor="middle" fontSize="15" fontWeight="900" fill="#0f172a">
        {total} darab, 2 tányér
      </text>
    )}
    <PlatePart cx={72} cy={total !== undefined ? 64 : 44} w={112} items={each} q={q} />
    <PlatePart cx={188} cy={total !== undefined ? 64 : 44} w={112} items={each} q={q} plateColor="#fce7f3" />
    {leftover > 0 && (
      <text x="130" y={total !== undefined ? 98 : 78} textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>
        Marad?
      </text>
    )}
  </QFig>
);

const QHalf: React.FC<{ big: string; small: string }> = ({ big, small }) => (
  <QFig h={112}>
    <HalfDoublePart x={40} y={12} big={big} small={small} />
  </QFig>
);

const QArray: React.FC<{ cols: number }> = ({ cols }) => {
  const step = 22;
  const x0 = 130 - ((cols - 1) * step) / 2;
  return (
    <QFig h={74}>
      <DivArrayPart x={x0} y={26} rows={2} cols={cols} step={step} r={8} />
    </QFig>
  );
};

const QBackJumps: React.FC<{ from: number }> = ({ from }) => {
  const x0 = 16;
  const unit = 11.4;
  const y = 62;
  const X = (v: number) => x0 + v * unit;
  return (
    <QFig h={96}>
      <line x1={X(0) - 4} y1={y} x2={X(20) + 6} y2={y} stroke="#334155" strokeWidth="2" />
      {Array.from({ length: 21 }, (_, v) => (
        <line key={v} x1={X(v)} y1={v % 10 === 0 ? y - 7 : y - 4} x2={X(v)} y2={v % 10 === 0 ? y + 7 : y + 4} stroke="#334155" strokeWidth={v % 10 === 0 ? 1.8 : 1.1} />
      ))}
      {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20].map((v) => (
        <text key={v} x={X(v)} y={y + 18} textAnchor="middle" fontSize="9.5" fontWeight="bold" fill={v === from ? UNK : '#475569'}>
          {v}
        </text>
      ))}
      {Array.from({ length: from / 2 }, (_, j) => {
        const a = X(from - 2 * j);
        const b = X(from - 2 * j - 2);
        return (
          <g key={j}>
            <path d={`M ${a} ${y - 4} Q ${(a + b) / 2} ${y - 26} ${b} ${y - 4}`} fill="none" stroke="#7c3aed" strokeWidth="2.2" />
            <path d={`M ${b + 5} ${y - 9} L ${b} ${y - 4} L ${b + 6} ${y - 3}`} fill="none" stroke="#7c3aed" strokeWidth="2" />
          </g>
        );
      })}
      <circle cx={X(from)} cy={y} r="5" fill={UNK} />
      <text x="130" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6b21a8">
        Vissza kettesével: {from}-tól 0-ig
      </text>
    </QFig>
  );
};

const QWheels: React.FC<{ n: number }> = ({ n }) => {
  const step = 26;
  const x0 = 130 - ((n - 1) * step) / 2;
  return (
    <QFig h={70}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <circle cx={x0 + i * step} cy={34} r="10" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
          <circle cx={x0 + i * step} cy={34} r="2.5" fill="#0f172a" />
        </g>
      ))}
      <text x="130" y="62" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
        {n} kerék
      </text>
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const DIV2_G2_QUESTIONS: QuizQuestion[] = [
  // ---- 1. szint ----
  {
    id: 'div2g2-q1',
    level: 1,
    questionTypeBadge: 'Csomagolás',
    figure: <QDots n={8} pairs={4} />,
    question: 'Kettesével csomagoltunk. Hány csomag lett?',
    options: ['4', '8', '6', '2'],
    correctAnswer: 0,
    explanation: 'Számold a kereteket: 4 csomag. 8 : 2 = 4.'
  },
  {
    id: 'div2g2-q2',
    level: 1,
    questionTypeBadge: 'Szétosztás',
    figure: <QPlates each={3} />,
    question: '6 sütit szétosztottunk 2 tányérra. Mennyi jutott egy tányérra?',
    options: ['3', '6', '2', '4'],
    correctAnswer: 0,
    explanation: 'Mindkét tányéron 3 süti van: 3 + 3 = 6. Tehát 6 : 2 = 3.'
  },
  {
    id: 'div2g2-q3',
    level: 1,
    questionTypeBadge: 'Olvasás',
    question: 'Hogyan olvassuk ezt: 10 : 2 = 5?',
    options: ['10 osztva 2-vel egyenlő 5', '10 meg 2 egyenlő 5', 'tízszer kettő egyenlő 5', '10 mínusz 2 egyenlő 5'],
    correctAnswer: 0,
    explanation: 'A : jel osztást jelent. Így olvassuk: 10 osztva 2-vel egyenlő 5.'
  },
  {
    id: 'div2g2-q4',
    level: 1,
    questionTypeBadge: 'Osztás 2-vel',
    figure: <QDots n={4} pairs={2} />,
    question: 'Mennyi 4 : 2?',
    options: ['2', '4', '6', '1'],
    correctAnswer: 0,
    explanation: 'A 4-ben a 2 megvan 2-szer: 2 + 2 = 4. Tehát 4 : 2 = 2.'
  },
  {
    id: 'div2g2-q5',
    level: 1,
    questionTypeBadge: 'A fele',
    figure: <QHalf big="6" small="?" />,
    question: 'Mennyi a 6 fele?',
    options: ['3', '12', '4', '2'],
    correctAnswer: 0,
    explanation: 'A 6-ot két egyenlő részre osztjuk: 3 és 3. A 6 fele 3.'
  },
  {
    id: 'div2g2-q6',
    level: 1,
    questionTypeBadge: 'Szétosztás',
    figure: <QPlates q total={10} />,
    question: '10 cukrot 2 gyerek kap, egyenlően. Mennyit kap egy gyerek?',
    options: ['5', '10', '8', '2'],
    correctAnswer: 0,
    explanation: '10 : 2 = 5, mert 5 + 5 = 10. Mindkét gyerek 5 cukrot kap.'
  },
  {
    id: 'div2g2-q7',
    level: 1,
    questionTypeBadge: 'Osztás 2-vel',
    question: 'Mennyi 2 : 2?',
    options: ['1', '0', '2', '4'],
    correctAnswer: 0,
    explanation: 'A 2-ben a 2 egyszer van meg. 2 : 2 = 1.'
  },
  {
    id: 'div2g2-q8',
    level: 1,
    questionTypeBadge: 'Képből osztás',
    figure: <QDots n={12} pairs={6} />,
    question: 'Melyik osztás illik a képhez?',
    options: ['12 : 2 = 6', '12 − 2 = 10', '12 + 2 = 14', '6 : 2 = 3'],
    correctAnswer: 0,
    explanation: '12 korong van, kettesével csomagolva 6 csomag: 12 : 2 = 6.'
  },
  {
    id: 'div2g2-q9',
    level: 1,
    questionTypeBadge: 'Nulla',
    question: 'Mennyi 0 : 2?',
    options: ['0', '2', '1', '20'],
    correctAnswer: 0,
    explanation: 'Ha nincs semmi, 2 gyereknek sem jut semmi: 0 : 2 = 0.'
  },
  {
    id: 'div2g2-q10',
    level: 1,
    questionTypeBadge: 'Marad-e?',
    figure: <QDots n={5} color="#ef4444" caption="5 alma, 2 tányér" />,
    question: '5 almát osztasz 2 tányérra egyenlően. Marad alma?',
    options: ['Igen, 1 marad.', 'Nem marad.', 'Igen, 2 marad.', 'Igen, 3 marad.'],
    correctAnswer: 0,
    explanation: 'Mindkét tányérra 2 alma jut: 2 + 2 = 4. Az 5-ből 1 marad.'
  },

  // ---- 2. szint ----
  {
    id: 'div2g2-q11',
    level: 2,
    questionTypeBadge: 'Osztás 2-vel',
    figure: <QDots n={14} pairs={7} />,
    question: 'Mennyi 14 : 2?',
    options: ['7', '12', '16', '6'],
    correctAnswer: 0,
    explanation: '7 csomag lett, mert 7 · 2 = 14. A 12 a 14 − 2 lenne!'
  },
  {
    id: 'div2g2-q12',
    level: 2,
    questionTypeBadge: 'Osztás 2-vel',
    question: 'Mennyi 18 : 2?',
    options: ['9', '16', '8', '10'],
    correctAnswer: 0,
    explanation: '18 : 2 = 9, mert 9 · 2 = 18.'
  },
  {
    id: 'div2g2-q13',
    level: 2,
    questionTypeBadge: 'Ellenőrzés',
    question: '16 : 2 = 8. Melyik szorzással ellenőrizheted?',
    options: ['8 · 2 = 16', '16 − 2 = 14', '8 + 2 = 10', '16 · 2 = 8'],
    correctAnswer: 0,
    explanation: 'Az eredményt szorozd vissza 2-vel: 8 · 2 = 16. Jó!'
  },
  {
    id: 'div2g2-q14',
    level: 2,
    questionTypeBadge: 'A fele',
    figure: <QHalf big="20" small="?" />,
    question: 'Mennyi a 20 fele?',
    options: ['10', '18', '5', '12'],
    correctAnswer: 0,
    explanation: '10 + 10 = 20, ezért a 20 fele 10. 20 : 2 = 10.'
  },
  {
    id: 'div2g2-q15',
    level: 2,
    questionTypeBadge: 'Párok',
    figure: <QDots n={14} color="#ec4899" caption="14 kesztyű" />,
    question: '14 kesztyű van. Hány pár ez?',
    options: ['7', '14', '12', '6'],
    correctAnswer: 0,
    explanation: 'Egy pár = 2 kesztyű. 14 : 2 = 7 pár.'
  },
  {
    id: 'div2g2-q16',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <QPlates each={6} />,
    question: 'Mindkét tányéron 6 meggy van. Hány meggy volt összesen? □ : 2 = 6',
    options: ['12', '3', '8', '4'],
    correctAnswer: 0,
    explanation: '6 + 6 = 12, vagyis 6 · 2 = 12. Tehát 12 : 2 = 6.'
  },
  {
    id: 'div2g2-q17',
    level: 2,
    questionTypeBadge: 'Melyik osztás?',
    question: 'Melyik osztás eredménye 5?',
    options: ['10 : 2', '12 : 2', '8 : 2', '6 : 2'],
    correctAnswer: 0,
    explanation: '10 : 2 = 5, mert 5 · 2 = 10. A többi: 6, 4, 3.'
  },
  {
    id: 'div2g2-q18',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <QBackJumps from={12} />,
    question: 'A béka a 12-ről kettesével ugrál vissza a 0-ig. Hányat ugrik?',
    options: ['6', '12', '5', '10'],
    correctAnswer: 0,
    explanation: '12, 10, 8, 6, 4, 2, 0 — ez 6 ugrás. 12 : 2 = 6.'
  },
  {
    id: 'div2g2-q19',
    level: 2,
    questionTypeBadge: 'Maradék',
    figure: <QDots n={9} pairs={4} />,
    question: '9 korongot csomagolsz kettesével. Hány csomag lesz, és mennyi marad?',
    options: ['4 csomag, 1 marad', '5 csomag, 0 marad', '4 csomag, 2 marad', '3 csomag, 1 marad'],
    correctAnswer: 0,
    explanation: '4 · 2 = 8, és 9 − 8 = 1. Tehát 4 csomag lesz, és 1 marad.'
  },
  {
    id: 'div2g2-q20',
    level: 2,
    questionTypeBadge: 'Páros szám',
    question: 'Melyik számot lehet maradék nélkül 2 egyenlő részre osztani?',
    options: ['16', '15', '13', '11'],
    correctAnswer: 0,
    explanation: 'A 16 páros: 8 + 8 = 16. A 15, 13, 11 páratlan, ott 1 marad.'
  },

  // ---- 3. szint ----
  {
    id: 'div2g2-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QPlates q total={12} />,
    question: '12 ceruzát 2 tolltartóba teszel, egyenlően. Mennyi kerül egybe?',
    options: ['6', '10', '14', '4'],
    correctAnswer: 0,
    explanation: '12 : 2 = 6, mert 6 · 2 = 12. Mindkét tolltartóba 6 ceruza kerül.'
  },
  {
    id: 'div2g2-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy csónakba 2 gyerek ül. 16 gyerek csónakázik. Hány csónak kell?',
    options: ['8', '14', '18', '16'],
    correctAnswer: 0,
    explanation: '16-ban a 2 megvan 8-szor: 16 : 2 = 8 csónak.'
  },
  {
    id: 'div2g2-q23',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik jel kerül a □ helyére? 14 : 2 □ 6',
    options: ['>', '<', '='],
    correctAnswer: 0,
    explanation: '14 : 2 = 7, és 7 nagyobb, mint 6. Ezért 7 > 6.'
  },
  {
    id: 'div2g2-q24',
    level: 3,
    questionTypeBadge: 'Maradék',
    figure: <QDots n={11} color="#a16207" caption="11 dió, 2 gyerek" />,
    question: '11 diót osztasz el 2 gyerek között egyenlően. Mennyi jut egynek, mennyi marad?',
    options: ['5 jut, 1 marad', '6 jut, 0 marad', '5 jut, 0 marad', '4 jut, 3 marad'],
    correctAnswer: 0,
    explanation: '5 + 5 = 10. A 11-ből 1 marad. Egy gyereknek 5 jut.'
  },
  {
    id: 'div2g2-q25',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'Mennyi 10 : 2 + 3?',
    options: ['8', '5', '13', '7'],
    correctAnswer: 0,
    explanation: 'Először oszd el: 10 : 2 = 5. Aztán adj hozzá 3-at: 5 + 3 = 8.'
  },
  {
    id: 'div2g2-q26',
    level: 3,
    questionTypeBadge: 'A fele',
    question: 'Vilmának 18 matricája volt. A felét odaadta a húgának. Hány matricája maradt?',
    options: ['9', '16', '8', '10'],
    correctAnswer: 0,
    explanation: 'A 18 fele 9, mert 9 + 9 = 18. Vilmának 9 matricája maradt.'
  },
  {
    id: 'div2g2-q27',
    level: 3,
    questionTypeBadge: 'Fele és kétszerese',
    figure: <QHalf big="?" small="7" />,
    question: 'Melyik szám fele a 7?',
    options: ['14', '3', '9', '7'],
    correctAnswer: 0,
    explanation: 'A 7 kétszerese: 7 + 7 = 14. Tehát a 14 fele 7.'
  },
  {
    id: 'div2g2-q28',
    level: 3,
    questionTypeBadge: 'Kerekek',
    figure: <QWheels n={8} />,
    question: 'Biciklik állnak az udvaron. Összesen 8 kerekük van. Hány bicikli áll ott?',
    options: ['4', '8', '6', '16'],
    correctAnswer: 0,
    explanation: 'Egy biciklinek 2 kereke van. 8 : 2 = 4 bicikli.'
  },
  {
    id: 'div2g2-q29',
    level: 3,
    questionTypeBadge: 'Szorzás és osztás',
    figure: <QArray cols={7} />,
    question: 'Melyik osztás tartozik ehhez: 7 · 2 = 14?',
    options: ['14 : 2 = 7', '14 − 2 = 12', '7 : 2 = 14', '14 : 7 = 14'],
    correctAnswer: 0,
    explanation: 'Ha 7 · 2 = 14, akkor a 14-ben a 2 megvan 7-szer: 14 : 2 = 7.'
  },
  {
    id: 'div2g2-q30',
    level: 3,
    questionTypeBadge: 'Teli csomagok',
    figure: <QDots n={13} color="#dc2626" caption="13 szem cseresznye" />,
    question: '13 szem cseresznyét csomagolsz kettesével. Hány teli csomag lesz?',
    options: ['6', '7', '5', '13'],
    correctAnswer: 0,
    explanation: '6 · 2 = 12, és 1 szem marad. Tehát 6 teli csomag lesz.'
  }
];

export const Div2G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="osztas"
    topicId="g2-osztas-2-quiz"
    subtopicId="osztas-2-vel"
    title="1. Osztás 2-vel – Kvíz"
    subtitle="30 feladat 3 szinten: csomagolás, szétosztás, a fele, ellenőrzés szorzással, maradék."
    badge="2. OSZTÁLY • V. OSZTÁS • KVÍZ"
    questions={DIV2_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'Kétféle osztás',
        items: ['Csomagolás: hányszor van meg a 2?', 'Szétosztás: mennyi jut egy részre?', 'Mindkettő jele: :', 'Olvasd: 12 osztva 2-vel egyenlő 6']
      },
      {
        title: 'Osztás 2-vel',
        items: ['2 : 2 = 1, 4 : 2 = 2, 6 : 2 = 3', '8 : 2 = 4, 10 : 2 = 5, 12 : 2 = 6', '14 : 2 = 7, 16 : 2 = 8, 18 : 2 = 9', '20 : 2 = 10, 0 : 2 = 0']
      },
      {
        title: 'Jó tudni',
        items: ['Ellenőrizz szorzással: 6 · 2 = 12', 'A 18 fele 9, a 9 kétszerese 18', 'Páros szám: nem marad semmi', 'Páratlan szám: 1 marad']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={
      <Div2G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
    }
    sorterComponent={
      <Div2G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
    }
  />
);

export default Div2G2Quiz;
