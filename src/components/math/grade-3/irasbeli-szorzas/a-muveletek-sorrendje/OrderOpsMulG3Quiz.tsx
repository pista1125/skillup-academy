import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { OrderOpsMulG3Matcher } from './OrderOpsMulG3Matcher';
import { OrderOpsMulG3Sorter } from './OrderOpsMulG3Sorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – a keresett szám mindig piros „?”
// ---------------------------------------------------------------------------
const UNK = '#dc2626';
const INK = '#0f172a';
const FONT = 'system-ui, sans-serif';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 140 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Műveletsor nagyban: a műveleti jelek színes lapokon, a □ piros. */
const ExprFig: React.FC<{ expr: string }> = ({ expr }) => {
  const fs = Math.min(28, Math.floor(400 / expr.length));
  return (
    <QFig h={80}>
      <text x="120" y="50" textAnchor="middle" fontSize={fs} fontWeight="bold" fill={INK}>
        {expr.split(/(\s+|[()])/).filter((p) => p !== '').map((p, i) => {
          const color = p === '·' || p === ':' ? '#ea580c' : p === '+' || p === '−' ? '#0284c7' : p === '(' || p === ')' ? '#9333ea' : p === '□' ? UNK : INK;
          return (
            <tspan key={i} fill={color}>
              {p}
            </tspan>
          );
        })}
      </text>
    </QFig>
  );
};

/** n egyforma doboz (v), és még e (plus), vagy e-t elvittek (minus). */
const GroupsFig: React.FC<{ n: number; v: number; e: number; mode: 'plus' | 'minus'; unit?: string }> = ({ n, v, e, mode, unit = 'db' }) => {
  const w = 40;
  return (
    <QFig h={120}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={12 + i * (w + 6)} y="24" width={w} height="50" rx="6" fill="#fdba74" stroke="#9a3412" strokeWidth="2.5" />
          <text x={12 + i * (w + 6) + w / 2} y="55" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#431407">{v}</text>
        </g>
      ))}
      <circle cx="200" cy="49" r="26" fill={mode === 'plus' ? '#bbf7d0' : '#fee2e2'} stroke={mode === 'plus' ? '#15803d' : '#b91c1c'} strokeWidth="2.5" />
      <text x="200" y="55" textAnchor="middle" fontSize="17" fontWeight="bold" fill={INK}>{e}</text>
      {mode === 'minus' && <line x1="181" y1="68" x2="219" y2="30" stroke="#b91c1c" strokeWidth="3" />}
      <text x="120" y="104" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
        {mode === 'plus' ? `${n} doboz, és még ${e} ${unit}` : `${n} doboz, ${e} ${unit} elfogyott`}
      </text>
    </QFig>
  );
};

/** n csomag, mindegyikben a és b (felirat: la, lb). */
const PackFig: React.FC<{ n: number; a: number; b: number; la?: string; lb?: string }> = ({ n, a, b, la, lb }) => {
  const w = 46;
  const total = n * w + (n - 1) * 8;
  const x0 = (240 - total) / 2;
  return (
    <QFig h={130}>
      {Array.from({ length: n }, (_, i) => {
        const x = x0 + i * (w + 8);
        return (
          <g key={i}>
            <path d={`M ${x} 14 L ${x + w} 14 L ${x + w - 4} 96 L ${x + 4} 96 Z`} fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" />
            <rect x={x + 5} y="22" width={w - 10} height="30" rx="5" fill="#fecaca" />
            <text x={x + w / 2} y="43" textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>{a}</text>
            <rect x={x + 6} y="58" width={w - 12} height="30" rx="5" fill="#bae6fd" />
            <text x={x + w / 2} y="79" textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>{b}</text>
          </g>
        );
      })}
      {la && lb && (
        <text x="120" y="118" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
          <tspan fill="#b91c1c">piros: {la}</tspan>
          <tspan>{'  '}</tspan>
          <tspan fill="#0369a1">kék: {lb}</tspan>
        </text>
      )}
    </QFig>
  );
};

/** Szakaszos ábra: felül az alap, alatta „times”-szor annyi; ask: 'total' | 'diff'. */
const BarFig: React.FC<{ base: number; times: number; l1: string; l2: string; ask?: 'total' | 'diff' }> = ({ base, times, l1, l2, ask = 'total' }) => {
  const u = 48;
  return (
    <QFig h={ask === 'total' ? 130 : 120}>
      <text x="10" y="36" fontSize="13" fontWeight="bold" fill="#334155">{l1}</text>
      <rect x="64" y="20" width={u} height="24" rx="4" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
      <text x={64 + u / 2} y="37" textAnchor="middle" fontSize="14" fontWeight="bold" fill={INK}>{base}</text>
      <text x="10" y="74" fontSize="13" fontWeight="bold" fill="#334155">{l2}</text>
      {Array.from({ length: times }, (_, i) => (
        <rect key={i} x={64 + i * u} y="58" width={u} height="24" rx="4" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" />
      ))}
      {ask === 'total' ? (
        <g>
          <path d={`M 230 20 Q 236 20 236 30 L 236 72 Q 236 82 230 82`} fill="none" stroke={UNK} strokeWidth="2.5" />
          <text x="150" y="114" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>összesen: ?</text>
        </g>
      ) : (
        <g>
          <line x1={64 + u} y1="50" x2={64 + times * u} y2="50" stroke={UNK} strokeWidth="2.5" />
          <text x={64 + u + ((times - 1) * u) / 2} y="104" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>mennyivel több? ?</text>
        </g>
      )}
    </QFig>
  );
};

/** Bolt: n db árcédula (price Ft), fizetés pay Ft-tal, visszajár: ? */
const ShopFig: React.FC<{ n: number; price: number; pay: number }> = ({ n, price, pay }) => (
  <QFig h={130}>
    {Array.from({ length: n }, (_, i) => (
      <g key={i}>
        <path d={`M ${14 + i * 50} 20 L ${54 + i * 50} 20 L ${54 + i * 50} 62 L ${14 + i * 50} 62 Z`} fill="#fef9c3" stroke="#a16207" strokeWidth="2.5" />
        <circle cx={34 + i * 50} cy="28" r="3" fill="#a16207" />
        <text x={34 + i * 50} y="52" textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>{price}</text>
      </g>
    ))}
    <rect x="166" y="18" width="64" height="44" rx="5" fill="#bbf7d0" stroke="#15803d" strokeWidth="2.5" />
    <text x="198" y="46" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#14532d">{pay}</text>
    <text x="70" y="88" textAnchor="middle" fontSize="13" fill="#334155">{`${n} db, ára Ft-ban`}</text>
    <text x="198" y="80" textAnchor="middle" fontSize="13" fill="#334155">fizetek</text>
    <text x="120" y="116" textAnchor="middle" fontSize="17" fontWeight="bold" fill={UNK}>visszajár: ? Ft</text>
  </QFig>
);

export const ORDER_OPS_MUL_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'oo-q1',
    level: 1,
    questionTypeBadge: 'Melyik az első?',
    figure: <ExprFig expr="250 + 120 · 4" />,
    question: 'Melyik műveletet végzed el először?',
    options: ['120 · 4', '250 + 120', 'Mindegy, melyiket', '4 + 250'],
    correctAnswer: 0,
    explanation: 'A szorzás előbb jön, mint az összeadás. Először 120 · 4 = 480, utána 250 + 480 = 730.'
  },
  {
    id: 'oo-q2',
    level: 1,
    questionTypeBadge: 'Melyik az első?',
    figure: <ExprFig expr="(125 + 205) · 3" />,
    question: 'Melyik műveletet végzed el először?',
    options: ['125 + 205', '205 · 3', '125 · 3', 'Mindegy, melyiket'],
    correctAnswer: 0,
    explanation: 'Ha van zárójel, azt számolod ki először: 125 + 205 = 330. Utána 330 · 3 = 990.'
  },
  {
    id: 'oo-q3',
    level: 1,
    questionTypeBadge: 'Sorrend',
    figure: <GroupsFig n={2} v={150} e={100} mode="plus" unit="gyöngy" />,
    question: 'Számold ki! 100 + 2 · 150 = ?',
    options: ['400', '500', '300', '250'],
    correctAnswer: 0,
    explanation: 'Először szorzunk: 2 · 150 = 300. Utána összeadunk: 100 + 300 = 400.'
  },
  {
    id: 'oo-q4',
    level: 1,
    questionTypeBadge: 'Zárójel',
    figure: <PackFig n={3} a={120} b={80} />,
    question: 'Számold ki! (120 + 80) · 3 = ?',
    options: ['600', '440', '360', '500'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 120 + 80 = 200. Utána 200 · 3 = 600.'
  },
  {
    id: 'oo-q5',
    level: 1,
    questionTypeBadge: 'Sorrend',
    figure: <GroupsFig n={4} v={110} e={60} mode="plus" unit="szög" />,
    question: 'Számold ki! 4 · 110 + 60 = ?',
    options: ['500', '680', '440', '350'],
    correctAnswer: 0,
    explanation: 'Először szorzunk: 4 · 110 = 440. Utána 440 + 60 = 500.'
  },
  {
    id: 'oo-q6',
    level: 1,
    questionTypeBadge: 'Sorrend',
    figure: <ShopFig n={2} price={100} pay={500} />,
    question: 'Számold ki! 500 − 2 · 100 = ?',
    options: ['300', '800', '400', '200'],
    correctAnswer: 0,
    explanation: 'Először szorzunk: 2 · 100 = 200. Utána kivonunk: 500 − 200 = 300.'
  },
  {
    id: 'oo-q7',
    level: 1,
    questionTypeBadge: 'Terv',
    figure: <GroupsFig n={3} v={120} e={40} mode="plus" unit="ceruza" />,
    question: '3 doboz, mindben 120 ceruza, és még 40 ceruza. Melyik a jó terv?',
    options: ['3 · 120 + 40', '(120 + 40) · 3', '120 + 3 + 40', '3 + 120 · 40'],
    correctAnswer: 0,
    explanation: 'A 3 dobozban 3 · 120 ceruza van. Ehhez jön még a 40: 3 · 120 + 40.'
  },
  {
    id: 'oo-q8',
    level: 1,
    questionTypeBadge: 'Terv',
    figure: <PackFig n={2} a={150} b={90} la="alma" lb="körte" />,
    question: '2 kosár, mindben 150 alma és 90 körte. Melyik a jó terv?',
    options: ['(150 + 90) · 2', '150 + 90 · 2', '150 · 2 + 90', '150 + 90 + 2'],
    correctAnswer: 0,
    explanation: 'Egy kosárban 150 + 90 gyümölcs van. 2 kosárban ennek a 2-szerese: (150 + 90) · 2.'
  },
  {
    id: 'oo-q9',
    level: 1,
    questionTypeBadge: 'Sorrend',
    question: 'Számold ki! 3 · 200 − 150 = ?',
    options: ['450', '150', '750', '600'],
    correctAnswer: 0,
    explanation: 'Először szorzunk: 3 · 200 = 600. Utána 600 − 150 = 450.'
  },
  {
    id: 'oo-q10',
    level: 1,
    questionTypeBadge: 'Párok',
    figure: <PackFig n={3} a={100} b={50} />,
    question: 'Melyik ad ugyanannyit, mint 3 · (100 + 50)?',
    options: ['3 · 100 + 3 · 50', '3 · 100 + 50', '100 + 3 · 50', '3 + 100 + 50'],
    correctAnswer: 0,
    explanation: 'A zárójelben lévő mindkét számot 3-szor kell venni: 300 + 150 = 450. És 3 · 150 is 450.'
  },
  // ---------------------------- 2. szint ----------------------------
  {
    id: 'oo-q11',
    level: 2,
    questionTypeBadge: 'Sorrend',
    figure: <ExprFig expr="3 · 250 − 120" />,
    question: 'Számold ki!',
    options: ['630', '390', '870', '130'],
    correctAnswer: 0,
    explanation: 'Először szorzunk: 3 · 250 = 750. Utána 750 − 120 = 630.'
  },
  {
    id: 'oo-q12',
    level: 2,
    questionTypeBadge: 'Sorrend',
    figure: <ExprFig expr="750 − 124 · 3" />,
    question: 'Számold ki!',
    options: ['378', '372', '626', '388'],
    correctAnswer: 0,
    explanation: 'Először szorzunk: 124 · 3 = 372. Utána 750 − 372 = 378.'
  },
  {
    id: 'oo-q13',
    level: 2,
    questionTypeBadge: 'Zárójel',
    figure: <PackFig n={4} a={125} b={95} />,
    question: 'Számold ki! 4 · (125 + 95) = ?',
    options: ['880', '595', '505', '220'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 125 + 95 = 220. Utána 4 · 220 = 880.'
  },
  {
    id: 'oo-q14',
    level: 2,
    questionTypeBadge: 'Sorrend',
    figure: <ExprFig expr="125 + 205 · 3" />,
    question: 'Számold ki!',
    options: ['740', '990', '615', '330'],
    correctAnswer: 0,
    explanation: 'Először szorzunk: 205 · 3 = 615. Utána 125 + 615 = 740. (Zárójellel 990 lenne!)'
  },
  {
    id: 'oo-q15',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyiknek a legnagyobb az eredménye?',
    options: ['(125 + 205) · 3', '125 + 205 · 3', '125 · 3 + 205', '125 + 205 + 3'],
    correctAnswer: 0,
    explanation: '(125 + 205) · 3 = 990, 125 + 205 · 3 = 740, 125 · 3 + 205 = 580, 125 + 205 + 3 = 333. A legnagyobb a 990.'
  },
  {
    id: 'oo-q16',
    level: 2,
    questionTypeBadge: 'Párok',
    question: 'Melyik ad ugyanannyit, mint 2 · (215 + 160)?',
    options: ['2 · 215 + 2 · 160', '2 · 215 + 160', '215 + 2 · 160', '2 · (215 − 160)'],
    correctAnswer: 0,
    explanation: 'A zárójelben lévő mindkét számot 2-szer kell venni: 430 + 320 = 750. És 2 · 375 is 750.'
  },
  {
    id: 'oo-q17',
    level: 2,
    questionTypeBadge: 'Sorrend',
    question: 'Számold ki! 1000 − 4 · 215 = ?',
    options: ['140', '860', '785', '240'],
    correctAnswer: 0,
    explanation: 'Először szorzunk: 4 · 215 = 860. Utána 1000 − 860 = 140.'
  },
  {
    id: 'oo-q18',
    level: 2,
    questionTypeBadge: 'Zárójel',
    question: 'Számold ki! (480 − 330) · 4 = ?',
    options: ['600', '150', '154', '450'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 480 − 330 = 150. Utána 150 · 4 = 600.'
  },
  {
    id: 'oo-q19',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <ExprFig expr="2 · 300 + □ = 750" />,
    question: 'Melyik szám kerül a □ helyére?',
    options: ['150', '450', '350', '75'],
    correctAnswer: 0,
    explanation: '2 · 300 = 600. 600 + □ = 750, tehát □ = 150.'
  },
  {
    id: 'oo-q20',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <ExprFig expr="3 · (□ + 100) = 900" />,
    question: 'Melyik szám kerül a □ helyére?',
    options: ['200', '300', '800', '100'],
    correctAnswer: 0,
    explanation: 'A zárójelben 300 van, mert 3 · 300 = 900. □ + 100 = 300, tehát □ = 200.'
  },
  // ---------------------------- 3. szint ----------------------------
  {
    id: 'oo-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BarFig base={145} times={3} l1="1. doboz" l2="2. doboz" />,
    question: 'Egy dobozban 145 golyó van, egy másikban 3-szor annyi. Hány golyó van a két dobozban összesen?',
    options: ['580', '435', '290', '570'],
    correctAnswer: 0,
    explanation: 'A második dobozban 145 · 3 = 435 golyó van. Összesen: 145 + 435 = 580.'
  },
  {
    id: 'oo-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BarFig base={128} times={2} l1="mese" l2="regény" />,
    question: 'A polcon 128 mesekönyv és 2-szer annyi regény van. Hány könyv van összesen?',
    options: ['384', '256', '130', '374'],
    correctAnswer: 0,
    explanation: 'Regény: 128 · 2 = 256. Összesen: 128 + 256 = 384.'
  },
  {
    id: 'oo-q23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <PackFig n={2} a={70} b={310} la="fent" lb="lent" />,
    question: 'A színházban fent 70, lent 310 hely van. 2 előadás volt, mindig telt házzal. Hány néző volt összesen?',
    options: ['760', '450', '690', '380'],
    correctAnswer: 0,
    explanation: 'Egy előadáson 70 + 310 = 380 néző. 2 előadáson: (70 + 310) · 2 = 760.'
  },
  {
    id: 'oo-q24',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <ShopFig n={3} price={245} pay={1000} />,
    question: 'Veszel 3 füzetet, mindegyik 245 Ft. 1000 Ft-tal fizetsz. Mennyi jár vissza?',
    options: ['265 Ft', '735 Ft', '755 Ft', '275 Ft'],
    correctAnswer: 0,
    explanation: 'A 3 füzet ára: 3 · 245 = 735 Ft. Visszajár: 1000 − 735 = 265 Ft.'
  },
  {
    id: 'oo-q25',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    question: 'Melyik számra gondoltam? A 132 ötszörösénél 120-szal nagyobb.',
    options: ['780', '660', '540', '252'],
    correctAnswer: 0,
    explanation: 'A 132 ötszöröse: 132 · 5 = 660. Ennél 120-szal nagyobb: 660 + 120 = 780.'
  },
  {
    id: 'oo-q26',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    question: 'Melyik számra gondoltam? Az 1000 és a 785 különbségének a háromszorosa.',
    options: ['645', '215', '218', '635'],
    correctAnswer: 0,
    explanation: 'A különbség: 1000 − 785 = 215. A háromszorosa: 215 · 3 = 645.'
  },
  {
    id: 'oo-q27',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    question: 'Melyik számra gondoltam? A 236 és a 175 összegének a kétszerese.',
    options: ['822', '411', '586', '647'],
    correctAnswer: 0,
    explanation: 'Az összeg: 236 + 175 = 411. A kétszerese: (236 + 175) · 2 = 822.'
  },
  {
    id: 'oo-q28',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <GroupsFig n={4} v={135} e={90} mode="minus" unit="kifli" />,
    question: 'A pékségben 4 tálcán 135-135 kifli volt. 90 kiflit eladtak. Hány kifli maradt?',
    options: ['450', '180', '540', '630'],
    correctAnswer: 0,
    explanation: '4 tálcán: 4 · 135 = 540 kifli. Maradt: 540 − 90 = 450.'
  },
  {
    id: 'oo-q29',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BarFig base={185} times={2} l1="hétfő" l2="kedd" ask="diff" />,
    question: 'Hétfőn 185 gyerek úszott a medencében, kedden 2-szer annyi. Mennyivel többen úsztak kedden?',
    options: ['185', '370', '555', '187'],
    correctAnswer: 0,
    explanation: 'Kedden 185 · 2 = 370 gyerek úszott. A különbség: 370 − 185 = 185.'
  },
  {
    id: 'oo-q30',
    level: 3,
    questionTypeBadge: 'Terv',
    question: 'Melyik szöveghez illik a (120 + 90) · 3 terv?',
    options: [
      '3 napon át naponta 120 alma és 90 körte fogy.',
      'Van 120 alma és 3-szor 90 körte.',
      '3 láda alma, mindben 120, és még 90 körte.',
      '120 alma és 90 körte, és még 3 szilva.'
    ],
    correctAnswer: 0,
    explanation: 'Egy nap 120 + 90 gyümölcs fogy. 3 nap alatt ennek a 3-szorosa: (120 + 90) · 3 = 630.'
  }
];

export const OrderOpsMulG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="irasbeli-szorzas"
      topicId="g3-wmul-sorrend-quiz"
      subtopicId="a-muveletek-sorrendje"
      title="5. A műveletek sorrendje – Kvíz"
      subtitle="30 feladat 3 szinten: zárójel, szorzás előbb, terv és szöveges feladat."
      badge="3. OSZTÁLY • XIII. ÍRÁSBELI SZORZÁS • KVÍZ"
      questions={ORDER_OPS_MUL_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'A sorrend',
          items: ['1. zárójel ( )', '2. szorzás, osztás', '3. összeadás, kivonás balról jobbra']
        },
        {
          title: 'Példák',
          items: ['250 + 120 · 4 = 250 + 480 = 730', '(250 + 120) · 2 = 370 · 2 = 740', '1000 − 3 · 245 = 1000 − 735 = 265']
        },
        {
          title: 'Zárójel és párja',
          items: ['3 · (50 + 230) = 3 · 50 + 3 · 230', 'A zárójelben lévő mindkét számot szorozd!', 'Terv: „mindben … és …” → zárójel']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <OrderOpsMulG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <OrderOpsMulG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default OrderOpsMulG3Quiz;
