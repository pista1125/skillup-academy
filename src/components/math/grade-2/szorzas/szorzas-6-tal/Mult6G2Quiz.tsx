import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Mult6G2Matcher } from './Mult6G2Matcher';
import { Mult6G2Sorter } from './Mult6G2Sorter';
import { MULT6_FONT, EggBoxesPart, DicePart, JumpLinePart, ArrayPart, BeePart, ChainPart } from './Mult6G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 100 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT6_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const QBoxes: React.FC<{ groups: number; caption?: string }> = ({ groups, caption }) => {
  const perRow = groups > 5 ? 5 : groups;
  const rows = Math.ceil(groups / perRow);
  const w = rows > 1 ? 38 : 42;
  const gap = 6;
  const h = w * 0.66;
  const x0 = (260 - (perRow * (w + gap) - gap)) / 2;
  const boxesH = rows * (h + gap) - gap;
  const H = 16 + boxesH + (caption ? 30 : 12);
  return (
    <QFig h={H}>
      <EggBoxesPart x={x0} y={12} groups={groups} w={w} gap={gap} perRow={perRow} />
      {caption && (
        <text x="130" y={12 + boxesH + 22} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
          {caption}
        </text>
      )}
    </QFig>
  );
};

const QDice: React.FC<{ pips: number[] }> = ({ pips }) => {
  const s = 34;
  const gap = 10;
  const x0 = (260 - (pips.length * (s + gap) - gap)) / 2;
  return (
    <QFig h={60}>
      {pips.map((p, i) => (
        <DicePart key={i} x={x0 + i * (s + gap)} y={13} s={s} pips={p} color={['#fff', '#fef9c3', '#dbeafe', '#fce7f3', '#dcfce7', '#ede9fe'][i % 6]} />
      ))}
    </QFig>
  );
};

const QJumps: React.FC<{ jumps: number; showEnd?: boolean }> = ({ jumps, showEnd = false }) => (
  <QFig h={96}>
    <JumpLinePart x0={12} y={60} unit={3.8} jumps={jumps} showEnd={showEnd} />
    <text x="130" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6b21a8">
      {jumps} ugrás, mindegyik 6
    </text>
  </QFig>
);

const QArray: React.FC<{ rows: number; cols: number; split?: boolean }> = ({ rows, cols, split }) => {
  const step = rows > 3 ? 13 : 20;
  const r = rows > 3 ? 5 : 7.5;
  const x0 = 130 - ((cols - 1) * step) / 2;
  const H = 30 + (rows - 1) * step + 2 * r;
  const colors = split ? ['#3b82f6', '#3b82f6', '#3b82f6', '#ef4444', '#ef4444', '#ef4444'] : ['#f97316', '#0ea5e9', '#a855f7'];
  return (
    <QFig h={H}>
      <ArrayPart x={x0} y={15 + r} rows={rows} cols={cols} step={step} r={r} rowColors={colors} />
    </QFig>
  );
};

const QSeq: React.FC<{ items: string[] }> = ({ items }) => {
  const w = 40;
  const gap = 8;
  const x0 = (260 - (items.length * (w + gap) - gap)) / 2;
  return (
    <QFig h={64}>
      {items.map((t, i) => (
        <g key={i}>
          <rect x={x0 + i * (w + gap)} y={14} width={w} height={36} rx="8" fill={t === '?' ? '#fee2e2' : '#ffe4e6'} stroke={t === '?' ? UNK : '#be123c'} strokeWidth="2" />
          <text x={x0 + i * (w + gap) + w / 2} y={39} textAnchor="middle" fontSize="18" fontWeight="900" fill={t === '?' ? UNK : '#881337'}>{t}</text>
        </g>
      ))}
    </QFig>
  );
};

const QBees: React.FC<{ n: number }> = ({ n }) => {
  const step = 52;
  const x0 = (260 - (n * step - 14)) / 2;
  return (
    <QFig h={56}>
      {Array.from({ length: n }, (_, i) => (
        <BeePart key={i} x={x0 + i * step} y={12} />
      ))}
    </QFig>
  );
};

const QChain: React.FC<{ a: string; b: string; c: string }> = ({ a, b, c }) => (
  <QFig h={92}>
    <ChainPart x={20} y={12} a={a} b={b} c={c} op1="· 3" op2="· 2" opAll="· 6" />
  </QFig>
);

const QArrow: React.FC<{ from: string; to: string }> = ({ from, to }) => (
  <QFig h={84}>
    {[
      { x: 50, t: from },
      { x: 170, t: to }
    ].map((b, i) => (
      <g key={i}>
        <rect x={b.x} y={36} width="40" height="34" rx="8" fill={b.t === '?' ? '#fee2e2' : '#fff'} stroke={b.t === '?' ? UNK : '#be123c'} strokeWidth="2.2" />
        <text x={b.x + 20} y={60} textAnchor="middle" fontSize="18" fontWeight="900" fill={b.t === '?' ? UNK : '#0f172a'}>{b.t}</text>
      </g>
    ))}
    <path d="M 74 34 Q 130 2 186 34" fill="none" stroke="#16a34a" strokeWidth="2.4" />
    <path d="M 178 30 L 186 34 L 182 25" fill="none" stroke="#16a34a" strokeWidth="2.4" />
    <text x="130" y="30" textAnchor="middle" fontSize="12" fontWeight="900" fill="#15803d">hatszorosa</text>
  </QFig>
);

const QProduct: React.FC<{ product: number }> = ({ product }) => (
  <QFig h={92}>
    <circle cx="130" cy="32" r="21" fill="#fecdd3" stroke="#9f1239" strokeWidth="2.5" />
    <text x="130" y="39" textAnchor="middle" fontSize="20" fontWeight="900" fill="#881337">{product}</text>
    <circle cx="105" cy="72" r="13" fill="#ffe4e6" stroke="#9f1239" strokeWidth="2.5" />
    <text x="105" y="79" textAnchor="middle" fontSize="18" fontWeight="900" fill={UNK}>?</text>
    <text x="130" y="78" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">·</text>
    <circle cx="155" cy="72" r="13" fill="#ffe4e6" stroke="#9f1239" strokeWidth="2.5" />
    <text x="155" y="79" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">6</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const MULT6_G2_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'mult6g2-q1',
    level: 1,
    questionTypeBadge: 'Tojásdobozok',
    figure: <QBoxes groups={3} />,
    question: 'Minden dobozban 6 tojás van. Hány tojás van összesen?',
    options: ['18', '9', '15', '24'],
    correctAnswer: 0,
    explanation: '6 + 6 + 6 = 18. Röviden: 3 · 6 = 18.'
  },
  {
    id: 'mult6g2-q2',
    level: 1,
    questionTypeBadge: 'Összeadásból szorzás',
    figure: <QBoxes groups={5} caption="6 + 6 + 6 + 6 + 6" />,
    question: 'Melyik szorzás illik a képhez?',
    options: ['5 · 6', '6 · 6', '5 + 6', '4 · 6'],
    correctAnswer: 0,
    explanation: '5 doboz, mindegyikben 6. Ötször adtuk össze a 6-ot: 5 · 6.'
  },
  {
    id: 'mult6g2-q3',
    level: 1,
    questionTypeBadge: 'Dobókockák',
    figure: <QDice pips={[6, 6, 6, 6]} />,
    question: 'Mind a 4 kockán 6-os van. Hány pötty ez összesen?',
    options: ['24', '10', '20', '28'],
    correctAnswer: 0,
    explanation: 'Számolj hatosával: 6, 12, 18, 24. Tehát 4 · 6 = 24.'
  },
  {
    id: 'mult6g2-q4',
    level: 1,
    questionTypeBadge: 'Szorzótábla',
    question: '2 · 6 = ?',
    options: ['12', '8', '18', '10'],
    correctAnswer: 0,
    explanation: 'Kétszer hat: 6 + 6 = 12.'
  },
  {
    id: 'mult6g2-q5',
    level: 1,
    questionTypeBadge: 'Hatos ugrások',
    figure: <QJumps jumps={5} />,
    question: 'Ötször ugrasz 6-ot. Hová érkezel?',
    options: ['30', '25', '36', '11'],
    correctAnswer: 0,
    explanation: '6, 12, 18, 24, 30. Tehát 5 · 6 = 30.'
  },
  {
    id: 'mult6g2-q6',
    level: 1,
    questionTypeBadge: 'Olvasás',
    question: 'Hogyan olvassuk ezt: 4 · 6?',
    options: ['négyszer hat', 'hatszor négy', 'négy meg hat', 'hat mínusz négy'],
    correctAnswer: 0,
    explanation: 'Az első szám mondja meg, hányszor: négyszer. A második, mennyit: hat.'
  },
  {
    id: 'mult6g2-q7',
    level: 1,
    questionTypeBadge: '10 doboz',
    figure: <QBoxes groups={10} />,
    question: '10 doboz, mindegyikben 6 tojás. 10 · 6 = ?',
    options: ['60', '16', '50', '66'],
    correctAnswer: 0,
    explanation: 'Tízszer hat: 10 · 6 = 60.'
  },
  {
    id: 'mult6g2-q8',
    level: 1,
    questionTypeBadge: 'Sorozat',
    figure: <QSeq items={['6', '12', '18', '?', '30']} />,
    question: 'Mindig 6-tal több. Melyik szám hiányzik?',
    options: ['24', '20', '22', '26'],
    correctAnswer: 0,
    explanation: '18 + 6 = 24. Utána 24 + 6 = 30.'
  },
  {
    id: 'mult6g2-q9',
    level: 1,
    questionTypeBadge: 'Rácspontok',
    figure: <QArray rows={2} cols={6} />,
    question: '2 sor, mindegyikben 6 pötty. Hány pötty van?',
    options: ['12', '8', '6', '14'],
    correctAnswer: 0,
    explanation: '2 · 6 = 6 + 6 = 12 pötty.'
  },
  {
    id: 'mult6g2-q10',
    level: 1,
    questionTypeBadge: 'Nulla',
    question: '0 · 6 = ?',
    options: ['0', '6', '60', '1'],
    correctAnswer: 0,
    explanation: 'Ha nincs egy doboz sem, tojás sincs. 0 · 6 = 0.'
  },

  // ----- 2. szint -----
  {
    id: 'mult6g2-q11',
    level: 2,
    questionTypeBadge: 'Szorzótábla',
    figure: <QBoxes groups={7} />,
    question: '7 · 6 = ?',
    options: ['42', '13', '36', '48'],
    correctAnswer: 0,
    explanation: '7 · 3 = 21. Duplázd meg: 21 + 21 = 42.'
  },
  {
    id: 'mult6g2-q12',
    level: 2,
    questionTypeBadge: 'Dobókockák',
    figure: <QDice pips={[6, 6, 6, 6, 6]} />,
    question: 'Mind az 5 kockán 6-os van. Hány pötty ez?',
    options: ['30', '11', '25', '36'],
    correctAnswer: 0,
    explanation: '5 · 6 = 30 pötty.'
  },
  {
    id: 'mult6g2-q13',
    level: 2,
    questionTypeBadge: 'Hatos ugrások',
    figure: <QJumps jumps={8} />,
    question: '8 · 6 = ?',
    options: ['48', '14', '42', '54'],
    correctAnswer: 0,
    explanation: '8 ugrás, mindegyik 6: 6, 12, 18, 24, 30, 36, 42, 48.'
  },
  {
    id: 'mult6g2-q14',
    level: 2,
    questionTypeBadge: 'Szorzótábla',
    figure: <QBoxes groups={9} />,
    question: '9 · 6 = ?',
    options: ['54', '15', '56', '60'],
    correctAnswer: 0,
    explanation: '10 · 6 = 60. Egy dobozzal kevesebb: 60 − 6 = 54.'
  },
  {
    id: 'mult6g2-q15',
    level: 2,
    questionTypeBadge: 'Hány ugrás?',
    figure: <QJumps jumps={5} showEnd />,
    question: 'Hány hatos ugrással érsz el a 30-ig?',
    options: ['5', '6', '24', '36'],
    correctAnswer: 0,
    explanation: '□ · 6 = 30. Mivel 5 · 6 = 30, 5 ugrás kell.'
  },
  {
    id: 'mult6g2-q16',
    level: 2,
    questionTypeBadge: 'Hiányzó tényező',
    figure: <QProduct product={24} />,
    question: '□ · 6 = 24. Melyik szám a □?',
    options: ['4', '3', '18', '30'],
    correctAnswer: 0,
    explanation: 'Számolj hatosával: 6, 12, 18, 24. Ez 4 lépés: 4 · 6 = 24.'
  },
  {
    id: 'mult6g2-q17',
    level: 2,
    questionTypeBadge: 'Duplázás',
    figure: <QChain a="3" b="9" c="?" />,
    question: '3 · 3 = 9. Mennyi a 3 · 6?',
    options: ['18', '12', '9', '15'],
    correctAnswer: 0,
    explanation: 'A 3 · 6 a 3 · 3 kétszerese: 9 + 9 = 18.'
  },
  {
    id: 'mult6g2-q18',
    level: 2,
    questionTypeBadge: 'Rácspontok',
    figure: <QArray rows={3} cols={6} />,
    question: 'Melyik szorzás illik a képhez?',
    options: ['3 · 6', '3 + 6', '3 · 3', '6 · 6'],
    correctAnswer: 0,
    explanation: '3 sor van, mindegyikben 6 pötty: 3 · 6 = 18.'
  },
  {
    id: 'mult6g2-q19',
    level: 2,
    questionTypeBadge: 'Felcserélés',
    question: 'Melyik a több: 5 · 6 vagy 6 · 5?',
    options: ['Egyenlők', '5 · 6', '6 · 5', 'Nem tudjuk'],
    correctAnswer: 0,
    explanation: 'A tényezők felcserélhetők. Mindkettő 30.'
  },
  {
    id: 'mult6g2-q20',
    level: 2,
    questionTypeBadge: 'Hatszorosa',
    figure: <QArrow from="7" to="?" />,
    question: 'Mennyi a 7 hatszorosa?',
    options: ['42', '13', '49', '36'],
    correctAnswer: 0,
    explanation: 'Hatszor annyi: 6 · 7 = 7 · 6 = 42.'
  },

  // ----- 3. szint -----
  {
    id: 'mult6g2-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QBoxes groups={8} />,
    question: 'Nagyi 8 doboz tojást vett. Egy dobozban 6 tojás van. Hány tojás ez?',
    options: ['48', '14', '42', '54'],
    correctAnswer: 0,
    explanation: '8 · 6 = 48 tojás.'
  },
  {
    id: 'mult6g2-q22',
    level: 3,
    questionTypeBadge: 'Méhecskék',
    figure: <QBees n={4} />,
    question: 'Egy méhecskének 6 lába van. Hány lába van 4 méhecskének?',
    options: ['24', '10', '18', '28'],
    correctAnswer: 0,
    explanation: '4 · 6 = 24 láb.'
  },
  {
    id: 'mult6g2-q23',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'Boróka 4 doboz krétát kapott. Mindegyikben 6 kréta van. 5 kréta eltört. Hány ép kréta maradt?',
    options: ['19', '29', '24', '15'],
    correctAnswer: 0,
    explanation: '4 · 6 = 24 kréta. 24 − 5 = 19 ép kréta.'
  },
  {
    id: 'mult6g2-q24',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'A tornateremben 7 sor szék van, egy sorban 6. Még 4 szék áll a falnál. Hány szék van összesen?',
    options: ['46', '42', '38', '17'],
    correctAnswer: 0,
    explanation: '7 · 6 = 42 szék a sorokban. 42 + 4 = 46 szék.'
  },
  {
    id: 'mult6g2-q25',
    level: 3,
    questionTypeBadge: 'Hiányzó tényező',
    figure: <QProduct product={54} />,
    question: '□ · 6 = 54. Melyik szám a □?',
    options: ['9', '8', '48', '60'],
    correctAnswer: 0,
    explanation: '10 · 6 = 60, és 60 − 6 = 54. Tehát 9 · 6 = 54, □ = 9.'
  },
  {
    id: 'mult6g2-q26',
    level: 3,
    questionTypeBadge: 'Kapcsolat',
    figure: <QArray rows={6} cols={8} split />,
    question: 'Melyik egyenlő a 8 · 6-tal?',
    options: ['8 · 3 + 8 · 3', '8 · 3 + 3', '8 + 6', '8 · 2 + 6'],
    correctAnswer: 0,
    explanation: 'Kék: 8 · 3 = 24. Piros: 8 · 3 = 24. Összesen 24 + 24 = 48 = 8 · 6.'
  },
  {
    id: 'mult6g2-q27',
    level: 3,
    questionTypeBadge: 'Többszörös',
    question: 'Melyik szám a 6 többszöröse?',
    options: ['36', '32', '26', '16'],
    correctAnswer: 0,
    explanation: '6 · 6 = 36. A 32, a 26 és a 16 nincs benne a 6-os táblában.'
  },
  {
    id: 'mult6g2-q28',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik jel kerül a □ helyére? 7 · 6 □ 40',
    options: ['>', '<', '='],
    correctAnswer: 0,
    explanation: '7 · 6 = 42, és a 42 több, mint 40. Tehát 7 · 6 > 40.'
  },
  {
    id: 'mult6g2-q29',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    figure: <QArrow from="?" to="60" />,
    question: 'Gondoltam egy számot. A hatszorosa 60. Melyik számra gondoltam?',
    options: ['10', '54', '66', '6'],
    correctAnswer: 0,
    explanation: '10 · 6 = 60, tehát a 10-re.'
  },
  {
    id: 'mult6g2-q30',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <QDice pips={[6, 6, 6, 2]} />,
    question: 'Hány pötty van összesen a 4 kockán?',
    options: ['20', '24', '18', '26'],
    correctAnswer: 0,
    explanation: 'Három 6-os: 3 · 6 = 18. Meg a 2: 18 + 2 = 20.'
  }
];

export const Mult6G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="szorzas"
    topicId="g2-szorzas-6-quiz"
    subtopicId="szorzas-6-tal"
    title="5. Szorzás 6-tal – Kvíz"
    subtitle="30 feladat 3 szinten: hatos csoportok, a 6-os szorzótábla, duplázás a 3-as táblából, szöveges feladatok."
    badge="2. OSZTÁLY • IV. SZORZÁS • KVÍZ"
    questions={MULT6_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'A 6-os szorzótábla',
        items: ['1 · 6 = 6, 2 · 6 = 12, 3 · 6 = 18', '4 · 6 = 24, 5 · 6 = 30, 6 · 6 = 36', '7 · 6 = 42, 8 · 6 = 48, 9 · 6 = 54', '10 · 6 = 60, 0 · 6 = 0']
      },
      {
        title: 'Duplázd a 3-as táblát!',
        items: ['4 · 3 = 12, és 12 + 12 = 24', 'tehát 4 · 6 = 24', '7 · 3 = 21, és 21 + 21 = 42', 'tehát 7 · 6 = 42']
      },
      {
        title: 'Jó tudni',
        items: ['4 · 6 = 6 + 6 + 6 + 6', 'Olvasd: négyszer hat', '3 · 6 = 6 · 3 (felcserélhetők)', 'A 7 hatszorosa: 6 · 7 = 42']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={
      <Mult6G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
    }
    sorterComponent={
      <Mult6G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
    }
  />
);

export default Mult6G2Quiz;
