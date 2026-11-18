import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Mult2G2Matcher } from './Mult2G2Matcher';
import { Mult2G2Sorter } from './Mult2G2Sorter';
import { MULT2_FONT, BagsPart, ArrayPart, JumpLinePart, BikePart, SockPairPart } from './Mult2G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 100 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT2_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const QBags: React.FC<{ groups: number; caption?: string; plus?: number }> = ({ groups, caption, plus }) => {
  const bagW = groups > 6 ? 20 : 32;
  const gap = groups > 6 ? 4 : 6;
  const total = groups * (bagW + gap) - gap + (plus ? 50 : 0);
  const x0 = (260 - total) / 2;
  return (
    <QFig h={caption ? 92 : 72}>
      <BagsPart x={x0} y={14} groups={groups} each={2} bagW={bagW} gap={gap} />
      {plus !== undefined && (
        <g>
          <text x={x0 + groups * (bagW + gap) + 4} y={48} fontSize="20" fontWeight="900" fill="#0f172a">+</text>
          <circle cx={x0 + groups * (bagW + gap) + 28} cy={42} r="5" fill="#22c55e" stroke="#1e293b" strokeWidth="1.2" />
          <circle cx={x0 + groups * (bagW + gap) + 40} cy={42} r="5" fill="#22c55e" stroke="#1e293b" strokeWidth="1.2" />
        </g>
      )}
      {caption && (
        <text x="130" y="82" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
          {caption}
        </text>
      )}
    </QFig>
  );
};

const QArray: React.FC<{ cols: number; colHighlight?: boolean; caption?: string }> = ({ cols, colHighlight, caption }) => {
  const step = 22;
  const x0 = 130 - ((cols - 1) * step) / 2;
  return (
    <QFig h={caption ? 92 : 74}>
      <ArrayPart x={x0} y={24} rows={2} cols={cols} step={step} r={8} colHighlight={colHighlight} />
      {caption && (
        <text x="130" y="84" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
          {caption}
        </text>
      )}
    </QFig>
  );
};

const QJumps: React.FC<{ jumps: number; showEnd?: boolean }> = ({ jumps, showEnd = false }) => (
  <QFig h={96}>
    <JumpLinePart x0={14} y={60} unit={11.4} jumps={jumps} showEnd={showEnd} />
    <text x="130" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6b21a8">
      {jumps} ugrás, mindegyik 2
    </text>
  </QFig>
);

const QBikes: React.FC<{ n: number; extra?: string }> = ({ n, extra }) => {
  const step = 46;
  const x0 = (260 - (n * step - 6) - (extra ? 50 : 0)) / 2;
  return (
    <QFig h={66}>
      {Array.from({ length: n }, (_, i) => (
        <BikePart key={i} x={x0 + i * step} y={18} color={['#2563eb', '#dc2626', '#16a34a', '#9333ea', '#ea580c'][i % 5]} />
      ))}
      {extra && (
        <g>
          <text x={x0 + n * step - 2} y={42} fontSize="18" fontWeight="900" fill="#0f172a">+</text>
          <text x={x0 + n * step + 32} y={42} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">{extra}</text>
        </g>
      )}
    </QFig>
  );
};

const QSocks: React.FC<{ pairs: number }> = ({ pairs }) => {
  const step = 36;
  const x0 = (260 - (pairs * step - 12)) / 2;
  return (
    <QFig h={66}>
      <line x1="10" y1="18" x2="250" y2="18" stroke="#64748b" strokeWidth="1.5" />
      {Array.from({ length: pairs }, (_, i) => (
        <SockPairPart key={i} x={x0 + i * step} y={20} color={['#ec4899', '#3b82f6', '#22c55e', '#f59e0b', '#a855f7', '#ef4444', '#14b8a6'][i % 7]} />
      ))}
    </QFig>
  );
};

const QPod: React.FC<{ product: number }> = ({ product }) => (
  <QFig h={92}>
    <path d="M 70 40 Q 130 0 190 36 Q 130 62 70 40 Z" fill="#4ade80" stroke="#166534" strokeWidth="2.5" />
    <text x="130" y="42" textAnchor="middle" fontSize="20" fontWeight="900" fill="#14532d">{product}</text>
    <circle cx="105" cy="70" r="14" fill="#bbf7d0" stroke="#166534" strokeWidth="2.5" />
    <text x="105" y="77" textAnchor="middle" fontSize="18" fontWeight="900" fill={UNK}>?</text>
    <text x="130" y="76" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">·</text>
    <circle cx="155" cy="70" r="14" fill="#bbf7d0" stroke="#166534" strokeWidth="2.5" />
    <text x="155" y="77" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">2</text>
  </QFig>
);

const QSeq: React.FC<{ items: string[] }> = ({ items }) => {
  const w = 40;
  const gap = 8;
  const x0 = (260 - (items.length * (w + gap) - gap)) / 2;
  return (
    <QFig h={64}>
      {items.map((t, i) => (
        <g key={i}>
          <rect x={x0 + i * (w + gap)} y={14} width={w} height={36} rx="8" fill={t === '?' ? '#fee2e2' : '#ede9fe'} stroke={t === '?' ? UNK : '#7c3aed'} strokeWidth="2" />
          <text x={x0 + i * (w + gap) + w / 2} y={39} textAnchor="middle" fontSize="18" fontWeight="900" fill={t === '?' ? UNK : '#4c1d95'}>{t}</text>
        </g>
      ))}
    </QFig>
  );
};

const QBenches: React.FC<{ n: number }> = ({ n }) => {
  const step = 30;
  const x0 = (260 - (n * step - 4)) / 2;
  return (
    <QFig h={70}>
      {Array.from({ length: n }, (_, i) => {
        const bx = x0 + i * step;
        return (
          <g key={i}>
            <circle cx={bx + 7} cy={24} r="5.5" fill="#fcd34d" stroke="#92400e" strokeWidth="1.3" />
            <circle cx={bx + 19} cy={24} r="5.5" fill="#fca5a5" stroke="#991b1b" strokeWidth="1.3" />
            <rect x={bx + 3} y={31} width="20" height="9" rx="3" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="1.2" />
            <rect x={bx} y={40} width="26" height="6" rx="2" fill="#a16207" />
            <line x1={bx + 4} y1={46} x2={bx + 4} y2={56} stroke="#713f12" strokeWidth="2.4" />
            <line x1={bx + 22} y1={46} x2={bx + 22} y2={56} stroke="#713f12" strokeWidth="2.4" />
          </g>
        );
      })}
    </QFig>
  );
};

const QSeesaw: React.FC = () => (
  <QFig h={92}>
    <polygon points="90,70 78,86 102,86" fill="#a16207" />
    <line x1="40" y1="64" x2="140" y2="74" stroke="#ea580c" strokeWidth="6" strokeLinecap="round" />
    <circle cx="48" cy="50" r="8" fill="#fcd34d" stroke="#92400e" strokeWidth="1.5" />
    <circle cx="132" cy="60" r="8" fill="#fca5a5" stroke="#991b1b" strokeWidth="1.5" />
    <text x="200" y="40" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">1 hinta: 2 gyerek</text>
    <text x="200" y="64" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">14 gyerek:</text>
    <text x="200" y="84" textAnchor="middle" fontSize="16" fontWeight="900" fill={UNK}>? hinta</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const MULT2_G2_QUESTIONS: QuizQuestion[] = [
  // ---- 1. szint ----
  {
    id: 'mult2g2-q1',
    level: 1,
    questionTypeBadge: 'Képből összeadás',
    figure: <QBags groups={3} />,
    question: 'Melyik összeadás illik a képhez?',
    options: ['2 + 2 + 2', '3 + 2', '2 + 2', '3 + 3 + 3'],
    correctAnswer: 0,
    explanation: '3 zacskó van, mindegyikben 2 golyó. Ezért 2 + 2 + 2.'
  },
  {
    id: 'mult2g2-q2',
    level: 1,
    questionTypeBadge: 'Képből szorzás',
    figure: <QBags groups={4} />,
    question: 'Melyik szorzás illik a képhez?',
    options: ['4 · 2', '4 + 2', '3 · 2', '5 · 2'],
    correctAnswer: 0,
    explanation: '4 zacskó, mindegyikben 2 golyó: négyszer kettő, 4 · 2.'
  },
  {
    id: 'mult2g2-q3',
    level: 1,
    questionTypeBadge: 'Olvasás',
    question: 'Hogyan olvassuk ezt: 5 · 2?',
    options: ['ötször kettő', 'öt meg kettő', 'kétszer öt', 'öt mínusz kettő'],
    correctAnswer: 0,
    explanation: 'A · jel szorzást jelent. Az 5 · 2 olvasva: ötször kettő.'
  },
  {
    id: 'mult2g2-q4',
    level: 1,
    questionTypeBadge: 'Írd szorzással',
    question: 'Írd szorzással: 2 + 2 + 2 + 2 + 2 + 2',
    options: ['6 · 2', '2 · 2', '6 + 2', '12 · 2'],
    correctAnswer: 0,
    explanation: 'Számold meg a 2-eseket: 6 darab van. Ezért 6 · 2.'
  },
  {
    id: 'mult2g2-q5',
    level: 1,
    questionTypeBadge: 'Kerekek',
    figure: <QBikes n={3} />,
    question: 'Hány kereke van 3 biciklinek?',
    options: ['6', '5', '3', '8'],
    correctAnswer: 0,
    explanation: 'Minden biciklinek 2 kereke van: 2 + 2 + 2 = 6. Ez 3 · 2 = 6.'
  },
  {
    id: 'mult2g2-q6',
    level: 1,
    questionTypeBadge: 'Rácspontok',
    figure: <QArray cols={4} />,
    question: 'Hány pötty van összesen?',
    options: ['8', '6', '4', '10'],
    correctAnswer: 0,
    explanation: '2 sor van, mindegyikben 4 pötty: 4 + 4 = 8.'
  },
  {
    id: 'mult2g2-q7',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <QJumps jumps={5} />,
    question: 'A béka 0-ról indul. 5-öt ugrik, mindig 2-t. Hová érkezik?',
    options: ['10', '5', '7', '12'],
    correctAnswer: 0,
    explanation: 'Kettesével: 2, 4, 6, 8, 10. Tehát 5 · 2 = 10.'
  },
  {
    id: 'mult2g2-q8',
    level: 1,
    questionTypeBadge: 'Kétszer kettő',
    figure: <QBags groups={2} />,
    question: 'Mennyi 2 · 2?',
    options: ['4', '2', '6', '3'],
    correctAnswer: 0,
    explanation: 'Kétszer kettő: 2 + 2 = 4.'
  },
  {
    id: 'mult2g2-q9',
    level: 1,
    questionTypeBadge: 'Egyszer kettő',
    question: 'Mennyi 1 · 2?',
    options: ['2', '1', '3', '0'],
    correctAnswer: 0,
    explanation: 'Egyszer kettő: csak 1 darab 2-es van. Ez 2.'
  },
  {
    id: 'mult2g2-q10',
    level: 1,
    questionTypeBadge: 'Fogalmak',
    question: '3 · 2 = 6. Hogy hívjuk a 6-ot?',
    options: ['szorzat', 'tényező', 'összeg', 'különbség'],
    correctAnswer: 0,
    explanation: 'A szorzás eredménye a szorzat. A 3 és a 2 a tényezők.'
  },

  // ---- 2. szint ----
  {
    id: 'mult2g2-q11',
    level: 2,
    questionTypeBadge: '2-es tábla',
    figure: <QBags groups={7} />,
    question: 'Mennyi 7 · 2?',
    options: ['14', '9', '12', '16'],
    correctAnswer: 0,
    explanation: '7 zacskó, mindben 2: 2, 4, 6, 8, 10, 12, 14. Tehát 14.'
  },
  {
    id: 'mult2g2-q12',
    level: 2,
    questionTypeBadge: '2-es tábla',
    figure: <QJumps jumps={9} />,
    question: 'Mennyi 9 · 2?',
    options: ['18', '11', '16', '20'],
    correctAnswer: 0,
    explanation: '9 kettes ugrás a 18-ra visz. A 11 a 9 + 2 lenne!'
  },
  {
    id: 'mult2g2-q13',
    level: 2,
    questionTypeBadge: 'Zoknipárok',
    figure: <QSocks pairs={6} />,
    question: '6 pár zokni lóg a szárítón. Hány darab zokni ez?',
    options: ['12', '6', '8', '14'],
    correctAnswer: 0,
    explanation: 'Egy pár = 2 zokni. 6 · 2 = 12 zokni.'
  },
  {
    id: 'mult2g2-q14',
    level: 2,
    questionTypeBadge: 'Oszlopok',
    figure: <QArray cols={8} colHighlight caption="8 oszlop" />,
    question: 'Melyik szorzás illik a képhez?',
    options: ['8 · 2', '8 + 2', '7 · 2', '9 · 2'],
    correctAnswer: 0,
    explanation: '8 oszlop van, mindegyikben 2 pötty: 8 · 2.'
  },
  {
    id: 'mult2g2-q15',
    level: 2,
    questionTypeBadge: 'Felcserélés',
    figure: <QArray cols={7} />,
    question: 'Melyik egyenlő ezzel: 2 · 7?',
    options: ['7 · 2', '2 + 7', '7 + 7 + 7', '2 · 2'],
    correctAnswer: 0,
    explanation: 'A tényezők felcserélhetők: 2 · 7 = 7 · 2 = 14.'
  },
  {
    id: 'mult2g2-q16',
    level: 2,
    questionTypeBadge: '2-es tábla',
    figure: <QBags groups={10} />,
    question: 'Mennyi 10 · 2?',
    options: ['20', '12', '10', '18'],
    correctAnswer: 0,
    explanation: '10 zacskó, mindben 2 golyó: 10 · 2 = 20.'
  },
  {
    id: 'mult2g2-q17',
    level: 2,
    questionTypeBadge: 'Kétszerese',
    question: 'Mennyi a 8 kétszerese?',
    options: ['16', '10', '4', '18'],
    correctAnswer: 0,
    explanation: 'Kétszerese = kétszer annyi: 8 + 8 = 16.'
  },
  {
    id: 'mult2g2-q18',
    level: 2,
    questionTypeBadge: 'Nulla',
    question: 'Mennyi 0 · 2?',
    options: ['0', '2', '1', '20'],
    correctAnswer: 0,
    explanation: 'Nulla zacskóban nincs golyó: 0 · 2 = 0.'
  },
  {
    id: 'mult2g2-q19',
    level: 2,
    questionTypeBadge: 'Melyik szorzat?',
    question: 'Melyik szám eredmény a 2-es szorzótáblában?',
    options: ['14', '13', '15', '11'],
    correctAnswer: 0,
    explanation: 'A 2-es tábla eredményei párosak: 7 · 2 = 14. A 13, 15, 11 páratlan.'
  },
  {
    id: 'mult2g2-q20',
    level: 2,
    questionTypeBadge: 'Sorozat',
    figure: <QSeq items={['2', '4', '6', '?', '10']} />,
    question: 'Melyik szám hiányzik?',
    options: ['8', '7', '9', '12'],
    correctAnswer: 0,
    explanation: 'Kettesével nő: 6 + 2 = 8, és 8 + 2 = 10.'
  },

  // ---- 3. szint ----
  {
    id: 'mult2g2-q21',
    level: 3,
    questionTypeBadge: 'Hiányzó tényező',
    figure: <QPod product={12} />,
    question: 'Melyik szám kerül a ? helyére? ? · 2 = 12',
    options: ['6', '10', '14', '5'],
    correctAnswer: 0,
    explanation: 'Ugorj kettesével a 12-ig: 2, 4, 6, 8, 10, 12 — ez 6 ugrás. 6 · 2 = 12.'
  },
  {
    id: 'mult2g2-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QBenches n={8} />,
    question: 'Egy padon 2 gyerek ül. 8 pad van. Hány gyerek ül a padokon?',
    options: ['16', '10', '8', '18'],
    correctAnswer: 0,
    explanation: '8 pad, mindegyiken 2 gyerek: 8 · 2 = 16.'
  },
  {
    id: 'mult2g2-q23',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik jel kerül a □ helyére? 5 · 2 □ 9',
    options: ['>', '<', '='],
    correctAnswer: 0,
    explanation: '5 · 2 = 10, és 10 nagyobb, mint 9. Ezért 10 > 9.'
  },
  {
    id: 'mult2g2-q24',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <QBags groups={3} plus={2} />,
    question: 'Mennyi 3 · 2 + 2?',
    options: ['8', '7', '6', '10'],
    correctAnswer: 0,
    explanation: 'Először szorozz: 3 · 2 = 6. Aztán adj hozzá 2-t: 6 + 2 = 8.'
  },
  {
    id: 'mult2g2-q25',
    level: 3,
    questionTypeBadge: 'Hinták',
    figure: <QSeesaw />,
    question: 'Egy hintán 2 gyerek ül. Hány hinta kell 14 gyereknek?',
    options: ['7', '12', '14', '16'],
    correctAnswer: 0,
    explanation: '□ · 2 = 14. Mivel 7 · 2 = 14, 7 hinta kell.'
  },
  {
    id: 'mult2g2-q26',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Boróka 5 pár kesztyűt vett, Ábel 2 párat. Hány darab kesztyű ez összesen?',
    options: ['14', '7', '10', '12'],
    correctAnswer: 0,
    explanation: '5 + 2 = 7 pár. Egy pár 2 darab: 7 · 2 = 14 kesztyű.'
  },
  {
    id: 'mult2g2-q27',
    level: 3,
    questionTypeBadge: 'Kétszer annyi',
    question: 'Olivér 9 éves. A bátyja kétszer annyi idős. Hány éves a bátyja?',
    options: ['18', '11', '9', '16'],
    correctAnswer: 0,
    explanation: 'Kétszer annyi: 2 · 9 = 9 + 9 = 18 év.'
  },
  {
    id: 'mult2g2-q28',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <QBikes n={4} extra="3 kerék" />,
    question: '4 bicikli és 1 tricikli áll az udvaron. A triciklinek 3 kereke van. Hány kerék van összesen?',
    options: ['11', '9', '12', '8'],
    correctAnswer: 0,
    explanation: '4 · 2 = 8 kerék a bicikliken. 8 + 3 = 11 kerék.'
  },
  {
    id: 'mult2g2-q29',
    level: 3,
    questionTypeBadge: 'Igaz állítás',
    figure: <QArray cols={6} />,
    question: 'Melyik igaz?',
    options: ['6 · 2 = 2 · 6', '6 · 2 = 6 + 2', '6 · 2 = 6', '6 · 2 = 14'],
    correctAnswer: 0,
    explanation: 'A tényezők felcserélhetők: 6 · 2 = 2 · 6 = 12.'
  },
  {
    id: 'mult2g2-q30',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    question: 'Gondoltam egy számot. Kétszerese 20. Melyik számra gondoltam?',
    options: ['10', '20', '18', '5'],
    correctAnswer: 0,
    explanation: 'Melyik szám kétszerese 20? 10 · 2 = 20, tehát a 10-re.'
  }
];

export const Mult2G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="szorzas"
    topicId="g2-szorzas-2-quiz"
    subtopicId="szorzas-2-vel"
    title="1. Szorzás 2-vel – Kvíz"
    subtitle="30 feladat 3 szinten: egyenlő tagok, a · jel, sorok és oszlopok, a 2-es szorzótábla."
    badge="2. OSZTÁLY • IV. SZORZÁS • KVÍZ"
    questions={MULT2_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'Mit jelent a szorzás?',
        items: ['3 · 2 = 2 + 2 + 2 = 6', 'Olvasd: háromszor kettő', 'Első szám: hányszor', 'Második szám: mennyit']
      },
      {
        title: 'A 2-es szorzótábla',
        items: ['1 · 2 = 2, 2 · 2 = 4, 3 · 2 = 6', '4 · 2 = 8, 5 · 2 = 10, 6 · 2 = 12', '7 · 2 = 14, 8 · 2 = 16, 9 · 2 = 18', '10 · 2 = 20, 0 · 2 = 0']
      },
      {
        title: 'Jó tudni',
        items: ['2 · 5 = 5 · 2 (felcserélhetők)', 'tényező · tényező = szorzat', 'A 7 kétszerese: 7 + 7 = 14', 'Minden eredmény páros szám']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={
      <Mult2G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
    }
    sorterComponent={
      <Mult2G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
    }
  />
);

export default Mult2G2Quiz;
