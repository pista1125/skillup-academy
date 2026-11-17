import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { OrderOps100G3Matcher } from './OrderOps100G3Matcher';
import { OrderOps100G3Sorter } from './OrderOps100G3Sorter';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/**
 * Műveletsor nagy betűkkel; a műveleti jelek fölött kis kör.
 * bubbles: a műveletek sorrendjében a körbe írt jel ('?' vagy '' vagy '1.').
 */
const ExprFig: React.FC<{ toks: string[]; bubbles?: string[]; tail?: string }> = ({ toks, bubbles, tail = '= ?' }) => {
  const all = [...toks, ...(tail ? tail.split(' ') : [])];
  const step = Math.min(30, 216 / all.length);
  const x0 = 120 - ((all.length - 1) * step) / 2;
  let opN = 0;
  return (
    <QFig h={90}>
      {all.map((t, i) => {
        const x = x0 + i * step;
        const isOp = i < toks.length && ['+', '−', '·', ':'].includes(t);
        const b = isOp && bubbles ? bubbles[opN++] : undefined;
        return (
          <g key={i}>
            {b !== undefined && (
              <g>
                <circle cx={x} cy="26" r="11" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
                <text x={x} y="31" textAnchor="middle" fontSize="11" fontWeight="bold" fill={b === '?' ? UNK : '#c2410c'}>{b}</text>
              </g>
            )}
            <text x={x} y="66" textAnchor="middle" fontSize={t.length > 2 ? 16 : 20} fontWeight="bold" fill={t.includes('?') || t === '□' ? UNK : '#0f172a'}>{t}</text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Kis vonat: kezdőszám és műveletek, a végén ?. */
const TrainFig: React.FC<{ start: string; ops: string[] }> = ({ start, ops }) => {
  const n = ops.length + 1;
  const w = 216 / n;
  return (
    <QFig h={100}>
      <line x1="8" y1="78" x2="232" y2="78" stroke="#94a3b8" strokeWidth="2" />
      {Array.from({ length: n }, (_, i) => {
        const x = 12 + i * w;
        const label = i === 0 ? start : i === n - 1 ? '?' : '';
        return (
          <g key={i}>
            <rect x={x} y="44" width={w - 22} height="30" rx="5" fill={['#38bdf8', '#f87171', '#4ade80', '#c084fc'][i % 4]} stroke="#1e293b" />
            <text x={x + (w - 22) / 2} y="65" textAnchor="middle" fontSize="14" fontWeight="bold" fill={label === '?' ? UNK : '#0f172a'}>{label}</text>
            <circle cx={x + 8} cy="78" r="4" fill="#334155" />
            <circle cx={x + w - 30} cy="78" r="4" fill="#334155" />
            {i < n - 1 && (
              <text x={x + w - 11} y="36" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b91c1c">{ops[i]}</text>
            )}
          </g>
        );
      })}
    </QFig>
  );
};

/** Dobozok pöttyökkel, + külön darabok. */
const BoxesFig: React.FC<{ groups: number; per: number; extra?: number; minus?: number; label: string; color?: string }> = ({ groups, per, extra, minus, label, color = '#f59e0b' }) => {
  const w = Math.min(42, (extra !== undefined || minus !== undefined ? 168 : 212) / groups);
  return (
    <QFig h={112}>
      {Array.from({ length: groups }, (_, i) => {
        const x = 12 + i * w;
        return (
          <g key={i}>
            <rect x={x} y="12" width={w - 4} height="66" rx="6" fill="#ede9fe" stroke="#7c3aed" />
            {Array.from({ length: per }, (_, j) => (
              <circle key={j} cx={x + 9 + (j % 2) * (w - 22)} cy={22 + Math.floor(j / 2) * 11} r="3.6" fill={color} stroke="#78350f" strokeWidth="0.5" />
            ))}
          </g>
        );
      })}
      {extra !== undefined && (
        <g>
          <rect x="186" y="12" width="44" height="66" rx="6" fill="#fef3c7" stroke="#d97706" />
          <text x="208" y="44" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">+ {extra}</text>
          <text x="208" y="62" textAnchor="middle" fontSize="9" fill="#92400e">külön</text>
        </g>
      )}
      {minus !== undefined && (
        <g>
          <rect x="186" y="12" width="44" height="66" rx="6" fill="#fee2e2" stroke="#dc2626" />
          <text x="208" y="44" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#991b1b">− {minus}</text>
          <text x="208" y="62" textAnchor="middle" fontSize="9" fill="#991b1b">elfogyott</text>
        </g>
      )}
      <text x="120" y="98" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#5b21b6">{label}</text>
    </QFig>
  );
};

/** Két gyerek két eredménnyel. */
const KidsFig: React.FC<{ expr: string; a: { n: string; v: string }; b: { n: string; v: string } }> = ({ expr, a, b }) => (
  <QFig h={130}>
    <text x="120" y="24" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">{expr}</text>
    {[a, b].map((k, i) => {
      const cx = 60 + i * 120;
      return (
        <g key={k.n}>
          <circle cx={cx} cy="98" r="16" fill="#fde68a" stroke="#92400e" />
          <circle cx={cx - 5} cy="95" r="2" fill="#1e293b" />
          <circle cx={cx + 5} cy="95" r="2" fill="#1e293b" />
          <path d={`M ${cx - 6} 103 Q ${cx} 108 ${cx + 6} 103`} fill="none" stroke="#1e293b" />
          <text x={cx} y="124" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">{k.n}</text>
          <rect x={cx - 34} y="38" width="68" height="34" rx="10" fill="#fff" stroke="#64748b" />
          <path d={`M ${cx - 6} 72 L ${cx} 80 L ${cx + 6} 72`} fill="#fff" stroke="#64748b" />
          <text x={cx} y="61" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">{k.v}</text>
        </g>
      );
    })}
  </QFig>
);

const Die: React.FC<{ x: number; y: number; n: number }> = ({ x, y, n }) => {
  const p: Record<number, [number, number][]> = {
    3: [[0.25, 0.25], [0.5, 0.5], [0.75, 0.75]],
    6: [[0.28, 0.22], [0.28, 0.5], [0.28, 0.78], [0.72, 0.22], [0.72, 0.5], [0.72, 0.78]]
  };
  return (
    <g>
      <rect x={x} y={y} width="50" height="50" rx="8" fill="#fff" stroke="#1e293b" strokeWidth="2" />
      {p[n].map(([u, v], i) => (
        <circle key={i} cx={x + u * 50} cy={y + v * 50} r="4.5" fill="#1e293b" />
      ))}
    </g>
  );
};

const DiceFig: React.FC = () => (
  <QFig h={100}>
    <Die x={30} y={18} n={6} />
    <Die x={95} y={18} n={6} />
    <Die x={160} y={18} n={3} />
    <text x="120" y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>Hány pötty?</text>
  </QFig>
);

const BirdsFig: React.FC = () => (
  <QFig h={120}>
    <rect x="46" y="70" width="12" height="40" fill="#92400e" />
    <circle cx="52" cy="48" r="38" fill="#86efac" stroke="#15803d" strokeWidth="2" />
    <text x="52" y="46" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#14532d">30</text>
    <text x="52" y="62" textAnchor="middle" fontSize="11" fill="#14532d">madár</text>
    {[0, 1, 2].map((g) => (
      <g key={g}>
        <rect x="112" y={10 + g * 32} width="78" height="26" rx="8" fill="#e0f2fe" stroke="#0284c7" />
        {[0, 1, 2, 3].map((j) => (
          <path key={j} d={`M ${120 + j * 17} ${26 + g * 32} q 4 -7 8 0 q 4 -7 8 0`} fill="none" stroke="#1e3a8a" strokeWidth="2" />
        ))}
      </g>
    ))}
    <text x="215" y="48" textAnchor="middle" fontSize="10" fill="#334155">3 ágról</text>
    <text x="215" y="62" textAnchor="middle" fontSize="10" fill="#334155">4-4</text>
    <text x="215" y="76" textAnchor="middle" fontSize="10" fill="#334155">elrepül</text>
    <text x="150" y="112" textAnchor="middle" fontSize="11" fontWeight="bold" fill={UNK}>Hány maradt?</text>
  </QFig>
);

const BookFig: React.FC = () => (
  <QFig h={110}>
    <rect x="18" y="16" width="70" height="80" rx="4" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" />
    <text x="53" y="52" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">40</text>
    <text x="53" y="68" textAnchor="middle" fontSize="11" fill="#1e3a8a">oldal</text>
    {[0, 1, 2].map((d) => (
      <g key={d}>
        <rect x={104 + d * 44} y="30" width="38" height="40" rx="6" fill="#fef3c7" stroke="#d97706" />
        <text x={123 + d * 44} y="48" textAnchor="middle" fontSize="10" fill="#92400e">{d + 1}. nap</text>
        <text x={123 + d * 44} y="63" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">8</text>
      </g>
    ))}
    <text x="166" y="92" textAnchor="middle" fontSize="11" fontWeight="bold" fill={UNK}>hátra van: ?</text>
  </QFig>
);

export const ORDER_OPS_100_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'oo100-q1',
    level: 1,
    questionTypeBadge: 'Balról jobbra',
    figure: <TrainFig start="40" ops={['− 15', '+ 8']} />,
    question: '40 − 15 + 8 = ?',
    options: ['33', '17', '63', '32'],
    correctAnswer: 0,
    explanation: 'Csak kivonás és összeadás van, ezért balról jobbra: 40 − 15 = 25, aztán 25 + 8 = 33. (A 17 akkor jön ki, ha hátulról kezded.)'
  },
  {
    id: 'oo100-q2',
    level: 1,
    questionTypeBadge: 'Balról jobbra',
    figure: <TrainFig start="36" ops={[': 6', '· 2']} />,
    question: '36 : 6 · 2 = ?',
    options: ['12', '3', '18', '24'],
    correctAnswer: 0,
    explanation: 'Csak osztás és szorzás van, ezért balról jobbra: 36 : 6 = 6, aztán 6 · 2 = 12. (A 3 akkor jön ki, ha hátulról kezded.)'
  },
  {
    id: 'oo100-q3',
    level: 1,
    questionTypeBadge: 'Mi az első?',
    figure: <ExprFig toks={['7', '+', '4', '·', '5']} bubbles={['?', '?']} tail="" />,
    question: 'Melyik műveletet végzed el először? 7 + 4 · 5',
    options: ['a szorzást: 4 · 5', 'az összeadást: 7 + 4', 'mindegy, melyiket', 'a bal oldalit, mert az van elöl'],
    correctAnswer: 0,
    explanation: 'Először szorzunk és osztunk, csak utána adunk össze. Tehát először 4 · 5 = 20, aztán 7 + 20 = 27.'
  },
  {
    id: 'oo100-q4',
    level: 1,
    questionTypeBadge: 'Vegyes',
    figure: <ExprFig toks={['8', '+', '3', '·', '2']} bubbles={['2.', '1.']} />,
    question: '8 + 3 · 2 = ?',
    options: ['14', '22', '13', '16'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 3 · 2 = 6. Utána: 8 + 6 = 14. (A 22 rossz sorrend: 11 · 2.)'
  },
  {
    id: 'oo100-q5',
    level: 1,
    questionTypeBadge: 'Vegyes',
    figure: <ExprFig toks={['20', '−', '12', ':', '4']} bubbles={['2.', '1.']} />,
    question: '20 − 12 : 4 = ?',
    options: ['17', '2', '8', '16'],
    correctAnswer: 0,
    explanation: 'Először az osztás: 12 : 4 = 3. Utána: 20 − 3 = 17. (A 2 rossz sorrend: 8 : 4.)'
  },
  {
    id: 'oo100-q6',
    level: 1,
    questionTypeBadge: 'Vegyes',
    question: '5 · 4 + 6 = ?',
    options: ['26', '50', '15', '30'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 5 · 4 = 20. Utána: 20 + 6 = 26. (Az 50 akkor jön ki, ha előbb összeadsz: 5 · 10.)'
  },
  {
    id: 'oo100-q7',
    level: 1,
    questionTypeBadge: 'Balról jobbra',
    question: '50 − 20 − 10 = ?',
    options: ['20', '40', '30', '80'],
    correctAnswer: 0,
    explanation: 'Balról jobbra: 50 − 20 = 30, aztán 30 − 10 = 20.'
  },
  {
    id: 'oo100-q8',
    level: 1,
    questionTypeBadge: 'Balról jobbra',
    question: '2 · 5 · 3 = ?',
    options: ['30', '10', '25', '13'],
    correctAnswer: 0,
    explanation: 'Balról jobbra: 2 · 5 = 10, aztán 10 · 3 = 30.'
  },
  {
    id: 'oo100-q9',
    level: 1,
    questionTypeBadge: 'Mi az első?',
    figure: <ExprFig toks={['60', '−', '18', '+', '7']} bubbles={['?', '?']} tail="" />,
    question: 'Melyik műveletet végzed el először? 60 − 18 + 7',
    options: ['a kivonást: 60 − 18', 'az összeadást: 18 + 7', 'egyszerre mindkettőt', 'amelyik könnyebb'],
    correctAnswer: 0,
    explanation: 'Csak kivonás és összeadás van, ezért balról jobbra: először 60 − 18 = 42, aztán 42 + 7 = 49.'
  },
  {
    id: 'oo100-q10',
    level: 1,
    questionTypeBadge: 'Vegyes',
    question: '6 · 7 − 2 = ?',
    options: ['40', '30', '42', '44'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 6 · 7 = 42. Utána: 42 − 2 = 40. (A 30 rossz sorrend: 6 · 5.)'
  },

  // ---------------------------- 2. szint ----------------------------
  {
    id: 'oo100-q11',
    level: 2,
    questionTypeBadge: 'Vegyes',
    figure: <ExprFig toks={['35', '+', '24', ':', '3']} bubbles={['2.', '1.']} />,
    question: '35 + 24 : 3 = ?',
    options: ['43', '59', '11', '41'],
    correctAnswer: 0,
    explanation: 'Először az osztás: 24 : 3 = 8. Utána: 35 + 8 = 43.'
  },
  {
    id: 'oo100-q12',
    level: 2,
    questionTypeBadge: 'Vegyes',
    figure: <ExprFig toks={['64', '−', '7', '·', '8']} />,
    question: '64 − 7 · 8 = ?',
    options: ['8', '56', '57', '18'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 7 · 8 = 56. Utána: 64 − 56 = 8.'
  },
  {
    id: 'oo100-q13',
    level: 2,
    questionTypeBadge: 'Két szorzás',
    figure: <ExprFig toks={['4', '·', '6', '+', '3', '·', '5']} bubbles={['1.', '3.', '2.']} />,
    question: '4 · 6 + 3 · 5 = ?',
    options: ['39', '18', '49', '38'],
    correctAnswer: 0,
    explanation: 'Mindkét szorzás előbb jön: 4 · 6 = 24 és 3 · 5 = 15. Utána: 24 + 15 = 39.'
  },
  {
    id: 'oo100-q14',
    level: 2,
    questionTypeBadge: 'Balról jobbra',
    question: '48 : 6 · 3 = ?',
    options: ['24', '8', '18', '21'],
    correctAnswer: 0,
    explanation: 'Csak osztás és szorzás van: balról jobbra. 48 : 6 = 8, aztán 8 · 3 = 24.'
  },
  {
    id: 'oo100-q15',
    level: 2,
    questionTypeBadge: 'Vegyes',
    question: '8 · 9 − 35 = ?',
    options: ['37', '47', '72', '27'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 8 · 9 = 72. Utána: 72 − 35 = 37.'
  },
  {
    id: 'oo100-q16',
    level: 2,
    questionTypeBadge: 'Sorrend',
    figure: <ExprFig toks={['50', '−', '6', '·', '4', '+', '9']} bubbles={['?', '?', '?']} tail="" />,
    question: 'Milyen sorrendben számolsz? 50 − 6 · 4 + 9',
    options: ['· először, utána −, végül +', '− először, utána ·, végül +', '+ először, utána ·, végül −', '· először, utána +, végül −'],
    correctAnswer: 0,
    explanation: 'A szorzás az első: 6 · 4 = 24. Aztán balról jobbra: 50 − 24 = 26, végül 26 + 9 = 35.'
  },
  {
    id: 'oo100-q17',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <ExprFig toks={['30', '+', '7', '·', '□']} tail="= 65" />,
    question: 'Melyik szám illik a □ helyére? 30 + 7 · □ = 65',
    options: ['5', '35', '4', '6'],
    correctAnswer: 0,
    explanation: 'A 30-hoz 35-öt kell adni, hogy 65 legyen. 7 · □ = 35, tehát □ = 5. Ellenőrzés: 30 + 7 · 5 = 30 + 35 = 65.'
  },
  {
    id: 'oo100-q18',
    level: 2,
    questionTypeBadge: 'Melyik az?',
    question: 'Melyik műveletsor eredménye 20?',
    options: ['4 + 4 · 4', '4 · 4 + 4 · 4', '4 · 4 − 4', '4 + 4 + 4'],
    correctAnswer: 0,
    explanation: '4 + 4 · 4 = 4 + 16 = 20. A többi: 16 + 16 = 32, 16 − 4 = 12, 4 + 4 + 4 = 12.'
  },
  {
    id: 'oo100-q19',
    level: 2,
    questionTypeBadge: 'Igaz?',
    question: 'Melyik igaz?',
    options: ['7 + 3 · 2 = 13', '7 + 3 · 2 = 20', '7 + 3 · 2 = 12', '7 + 3 · 2 = 23'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 3 · 2 = 6. Utána 7 + 6 = 13. (A 20 rossz sorrend: 10 · 2.)'
  },
  {
    id: 'oo100-q20',
    level: 2,
    questionTypeBadge: 'Két osztás',
    figure: <ExprFig toks={['72', ':', '8', '+', '36', ':', '4']} bubbles={['1.', '3.', '2.']} />,
    question: '72 : 8 + 36 : 4 = ?',
    options: ['18', '9', '27', '81'],
    correctAnswer: 0,
    explanation: 'Mindkét osztás előbb jön: 72 : 8 = 9 és 36 : 4 = 9. Utána: 9 + 9 = 18.'
  },

  // ---------------------------- 3. szint ----------------------------
  {
    id: 'oo100-q21',
    level: 3,
    questionTypeBadge: 'Történet',
    figure: <BoxesFig groups={4} per={6} extra={5} label="4 doboz, mindegyikben 6 rúd" color="#f472b6" />,
    question: 'Lili 4 doboz gyurmát vett. Mindegyikben 6 rúd van. Kapott még 5 rudat. Hány rúd gyurmája van? (4 · 6 + 5)',
    options: ['29', '44', '15', '24'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 4 · 6 = 24 rúd a dobozokban. Utána: 24 + 5 = 29. Lilinek 29 rúd gyurmája van.'
  },
  {
    id: 'oo100-q22',
    level: 3,
    questionTypeBadge: 'Melyik műveletsor?',
    figure: <BirdsFig />,
    question: 'A fán 30 madár ült. 3 ágról 4-4 madár elrepült. Melyik műveletsor adja meg, hány madár maradt?',
    options: ['30 − 3 · 4', '30 − 3 + 4', '30 + 3 · 4', '3 · 4 − 30'],
    correctAnswer: 0,
    explanation: '3 · 4 = 12 madár repült el. 30 − 3 · 4 = 30 − 12 = 18 madár maradt.'
  },
  {
    id: 'oo100-q23',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    question: 'Melyik számra gondoltam? A 9 hétszeresénél 15-tel kisebb.',
    options: ['48', '63', '78', '58'],
    correctAnswer: 0,
    explanation: '9 · 7 − 15 = 63 − 15 = 48. (A 78-at akkor kapod, ha hozzáadsz.)'
  },
  {
    id: 'oo100-q24',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    figure: <ExprFig toks={['42', ':', '6', '+', '8', '·', '4']} />,
    question: 'A 42 és a 6 hányadosához add hozzá a 8 négyszeresét! Mennyi lesz? (42 : 6 + 8 · 4)',
    options: ['39', '60', '15', '40'],
    correctAnswer: 0,
    explanation: '42 : 6 = 7 és 8 · 4 = 32. Utána: 7 + 32 = 39. (A 60 rossz sorrend: 15 · 4.)'
  },
  {
    id: 'oo100-q25',
    level: 3,
    questionTypeBadge: 'Történet',
    figure: <BookFig />,
    question: 'A könyv 40 oldalas. Bence 3 napig olvasott, naponta 8 oldalt. Hány oldal van még hátra?',
    options: ['16', '24', '29', '32'],
    correctAnswer: 0,
    explanation: '40 − 3 · 8 = 40 − 24 = 16. Még 16 oldal van hátra. (A 24 az elolvasott oldalak száma.)'
  },
  {
    id: 'oo100-q26',
    level: 3,
    questionTypeBadge: 'Történet',
    figure: <BoxesFig groups={5} per={6} minus={12} label="5 tálca, mindegyiken 6 kifli" color="#d6a35c" />,
    question: 'A pékségben 5 tálcán 6-6 kifli volt. Eladtak 12-t. Hány kifli maradt? (5 · 6 − 12)',
    options: ['18', '30', '23', '42'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 5 · 6 = 30 kifli. Utána: 30 − 12 = 18. 18 kifli maradt.'
  },
  {
    id: 'oo100-q27',
    level: 3,
    questionTypeBadge: 'Ki számolt jól?',
    figure: <KidsFig expr="6 + 4 · 5 = ?" a={{ n: 'Dani', v: '50' }} b={{ n: 'Vivi', v: '26' }} />,
    question: 'Dani és Vivi kiszámolta: 6 + 4 · 5. Kinek van igaza?',
    options: ['Vivinek, mert előbb szorzunk', 'Daninak, mert balról jobbra számolunk', 'Mindkettőjüknek', 'Egyiküknek sem'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 4 · 5 = 20, utána 6 + 20 = 26. Dani előbb összeadott (10 · 5 = 50), ez rossz sorrend.'
  },
  {
    id: 'oo100-q28',
    level: 3,
    questionTypeBadge: 'Melyik a legnagyobb?',
    question: 'Melyik műveletsor eredménye a legnagyobb?',
    options: ['10 · 5 + 3', '10 + 5 · 3', '10 · 5 − 3', '10 − 5 + 3'],
    correctAnswer: 0,
    explanation: '10 · 5 + 3 = 53, 10 + 5 · 3 = 25, 10 · 5 − 3 = 47, 10 − 5 + 3 = 8. A legnagyobb az 53.'
  },
  {
    id: 'oo100-q29',
    level: 3,
    questionTypeBadge: 'Hiányzó szám',
    figure: <ExprFig toks={['8', '·', '8', '−', '□']} tail="= 39" />,
    question: 'Melyik szám illik a □ helyére? 8 · 8 − □ = 39',
    options: ['25', '24', '35', '15'],
    correctAnswer: 0,
    explanation: '8 · 8 = 64. A 64-ből 25-öt kell elvenni, hogy 39 legyen: 64 − 25 = 39.'
  },
  {
    id: 'oo100-q30',
    level: 3,
    questionTypeBadge: 'Dobókocka',
    figure: <DiceFig />,
    question: 'Két kockán 6-6 pötty van, egy kockán 3. Hány pötty van összesen? (2 · 6 + 3)',
    options: ['15', '18', '11', '12'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 2 · 6 = 12. Utána: 12 + 3 = 15. (A 18 rossz sorrend: 2 · 9.)'
  }
];

export const OrderOps100G3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId="g3-c100-sorrend-quiz"
      subtopicId="a-muveletek-sorrendje"
      title="6. A műveletek sorrendje – Kvíz"
      subtitle="30 feladat 3 szinten: balról jobbra, előbb szorzás és osztás, műveletsor történetekhez."
      badge="3. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 100-IG • KVÍZ"
      questions={ORDER_OPS_100_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'A sorrend',
          items: ['1. szorzás · és osztás :', '2. összeadás + és kivonás −', 'Egyforma rangú műveletek: balról jobbra']
        },
        {
          title: 'Példák',
          items: ['40 − 15 + 8 = 25 + 8 = 33', '36 : 6 · 2 = 6 · 2 = 12', '8 + 3 · 2 = 8 + 6 = 14', '20 − 12 : 4 = 20 − 3 = 17']
        },
        {
          title: 'Vigyázz!',
          items: ['10 + 2 · 5 nem 60, hanem 20!', 'Írd a műveletek fölé: 1., 2., 3.', 'Két szorzás: mindkettő előbb jön (4 · 6 + 3 · 5)']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <OrderOps100G3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <OrderOps100G3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default OrderOps100G3Quiz;
