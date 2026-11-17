import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Brackets100G3Matcher } from './Brackets100G3Matcher';
import { Brackets100G3Sorter } from './Brackets100G3Sorter';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';
const PAR = '#7c3aed';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/**
 * Műveletsor zárójelekkel. A szöveget szóközök mentén bontjuk; a ( és ) a számhoz tapadhat.
 * bubbles: a műveleti jelek fölötti körök felirata sorban. shade: a zárójeles rész kiemelése.
 */
const ExprFig: React.FC<{ expr: string; bubbles?: string[]; shade?: boolean }> = ({ expr, bubbles, shade }) => {
  // tokenekre bontás: ( ) külön
  const toks = expr.replace(/\(/g, '( ').replace(/\)/g, ' )').split(' ').filter(Boolean);
  const wOf = (t: string) => (t === '(' || t === ')' ? 9 : ['+', '−', '·', ':', '='].includes(t) ? 20 : 11 * t.length + 6);
  const total = toks.reduce((s, t) => s + wOf(t), 0);
  const scale = Math.min(1, 224 / total);
  let x = 120 - (total * scale) / 2;
  let opN = 0;
  const pos = toks.map((t) => {
    const w = wOf(t) * scale;
    const cx = x + w / 2;
    x += w;
    return { t, cx, w };
  });
  const open = pos.findIndex((p) => p.t === '(');
  const close = pos.findIndex((p) => p.t === ')');
  const fs = Math.round(20 * scale);
  return (
    <QFig h={90}>
      {shade && open >= 0 && close > open && (
        <rect x={pos[open].cx - 6} y="44" width={pos[close].cx - pos[open].cx + 12} height="32" rx="8" fill="#ede9fe" />
      )}
      {pos.map((p, i) => {
        const isOp = ['+', '−', '·', ':'].includes(p.t);
        const b = isOp && bubbles ? bubbles[opN++] : undefined;
        const color = p.t === '(' || p.t === ')' ? PAR : p.t.includes('?') || p.t === '□' ? UNK : '#0f172a';
        return (
          <g key={i}>
            {b !== undefined && (
              <g>
                <circle cx={p.cx} cy="24" r="10" fill="#f5f3ff" stroke={PAR} strokeWidth="1.5" />
                <text x={p.cx} y="28.5" textAnchor="middle" fontSize="10" fontWeight="bold" fill={b === '?' ? UNK : '#5b21b6'}>{b}</text>
              </g>
            )}
            <text x={p.cx} y="68" textAnchor="middle" fontSize={fs} fontWeight="bold" fill={color}>{p.t}</text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Két kifejezés egymás mellett. */
const TwoExprFig: React.FC<{ a: string; b: string }> = ({ a, b }) => (
  <QFig h={84}>
    <rect x="10" y="16" width="104" height="52" rx="10" fill="#fff7ed" stroke="#ea580c" />
    <text x="62" y="47" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{a}</text>
    <text x="120" y="47" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>?</text>
    <rect x="126" y="16" width="104" height="52" rx="10" fill="#f5f3ff" stroke={PAR} />
    <text x="178" y="47" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{b}</text>
  </QFig>
);

const PlatesFig: React.FC<{ n: number; pears: number; plums: number }> = ({ n, pears, plums }) => {
  const w = 228 / n;
  return (
    <QFig h={84}>
      {Array.from({ length: n }, (_, i) => {
        const cx = 6 + w * i + w / 2;
        return (
          <g key={i}>
            <ellipse cx={cx} cy="40" rx={w / 2 - 3} ry="20" fill="#fff" stroke="#94a3b8" strokeWidth="1.5" />
            {Array.from({ length: pears }, (_, j) => (
              <circle key={'p' + j} cx={cx - 14 + j * 9} cy="34" r="4" fill="#a3e635" stroke="#4d7c0f" />
            ))}
            {Array.from({ length: plums }, (_, j) => (
              <circle key={'s' + j} cx={cx - 14 + j * 9} cy="46" r="4" fill="#7c3aed" stroke="#4c1d95" />
            ))}
          </g>
        );
      })}
      <text x="120" y="76" textAnchor="middle" fontSize="11" fill="#475569">{n} tányér: {pears} körte és {plums} szilva</text>
    </QFig>
  );
};

const SeatsFig: React.FC = () => (
  <QFig h={120}>
    <rect x="40" y="8" width="160" height="16" rx="3" fill="#cbd5e1" />
    <text x="120" y="20" textAnchor="middle" fontSize="10" fill="#334155">vászon</text>
    {Array.from({ length: 4 }, (_, r) => (
      <g key={r}>
        {Array.from({ length: 9 }, (_, j) => (
          <rect key={j} x={34 + j * 20} y={34 + r * 18} width="14" height="12" rx="3" fill={j < 6 ? '#3b82f6' : '#ef4444'} stroke="#1e293b" strokeWidth="0.6" />
        ))}
      </g>
    ))}
    <text x="120" y="112" textAnchor="middle" fontSize="11" fill="#475569">soronként 6 kék és 3 piros szék</text>
  </QFig>
);

const NutsFig: React.FC = () => (
  <QFig h={110}>
    {[{ n: 18, x: 14, c: '#fce7f3' }, { n: 22, x: 84, c: '#dbeafe' }].map((g) => (
      <g key={g.n}>
        <rect x={g.x} y="12" width="62" height="62" rx="8" fill={g.c} stroke="#64748b" />
        {Array.from({ length: g.n }, (_, i) => (
          <circle key={i} cx={g.x + 8 + (i % 5) * 11.5} cy={20 + Math.floor(i / 5) * 11} r="4" fill="#b45309" />
        ))}
        <text x={g.x + 31} y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{g.n} dió</text>
      </g>
    ))}
    {[0, 1, 2, 3, 4].map((k) => (
      <g key={k}>
        <circle cx={172 + (k % 3) * 22} cy={30 + Math.floor(k / 3) * 30} r="10" fill="#fef3c7" stroke="#d97706" />
        <text x={172 + (k % 3) * 22} y={34 + Math.floor(k / 3) * 30} textAnchor="middle" fontSize="10" fontWeight="bold" fill={UNK}>?</text>
      </g>
    ))}
    <text x="194" y="96" textAnchor="middle" fontSize="11" fill="#475569">5 egyenlő rész</text>
  </QFig>
);

const MarblesFig: React.FC = () => (
  <QFig h={110}>
    {Array.from({ length: 15 }, (_, i) => (
      <circle key={i} cx={18 + (i % 8) * 15} cy={22 + Math.floor(i / 8) * 15} r="6" fill="#38bdf8" stroke="#0369a1" />
    ))}
    {Array.from({ length: 9 }, (_, i) => (
      <circle key={'n' + i} cx={18 + (i % 8) * 15} cy={62 + Math.floor(i / 8) * 15} r="6" fill="#f472b6" stroke="#9d174d" />
    ))}
    <text x="70" y="102" textAnchor="middle" fontSize="10" fill="#475569">15 volt + 9 kaptam</text>
    {[0, 1, 2, 3].map((k) => (
      <g key={k}>
        <ellipse cx={170 + (k % 2) * 44} cy={32 + Math.floor(k / 2) * 40} rx="18" ry="12" fill="#f1f5f9" stroke="#64748b" />
        <text x={170 + (k % 2) * 44} y={36 + Math.floor(k / 2) * 40} textAnchor="middle" fontSize="11" fontWeight="bold" fill={UNK}>?</text>
      </g>
    ))}
    <text x="192" y="102" textAnchor="middle" fontSize="10" fill="#475569">4 egyforma kupac</text>
  </QFig>
);

const BusFig: React.FC = () => (
  <QFig h={110}>
    <rect x="16" y="20" width="150" height="56" rx="10" fill="#facc15" stroke="#854d0e" strokeWidth="2" />
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x={26 + i * 27} y="30" width="20" height="18" rx="3" fill="#e0f2fe" stroke="#0369a1" />
    ))}
    <circle cx="48" cy="80" r="9" fill="#334155" />
    <circle cx="136" cy="80" r="9" fill="#334155" />
    <text x="91" y="68" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#713f12">45 utas</text>
    <text x="204" y="38" textAnchor="middle" fontSize="11" fill="#334155">1. megálló:</text>
    <text x="204" y="52" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b91c1c">8 le</text>
    <text x="204" y="70" textAnchor="middle" fontSize="11" fill="#334155">2. megálló:</text>
    <text x="204" y="84" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b91c1c">12 le</text>
    <text x="91" y="104" textAnchor="middle" fontSize="11" fontWeight="bold" fill={UNK}>Hányan maradtak?</text>
  </QFig>
);

const RentFig: React.FC = () => (
  <QFig h={120}>
    {[
      { h: '', a: 'roller', b: 'gördeszka', bold: true },
      { h: 'volt', a: '34', b: '28' },
      { h: 'kivitték', a: '9', b: '7' }
    ].map((r, i) => (
      <g key={i}>
        <rect x="10" y={10 + i * 28} width="70" height="28" fill="#fef3c7" stroke="#d97706" />
        <text x="16" y={29 + i * 28} fontSize="11" fontWeight="bold" fill="#78350f">{r.h}</text>
        <rect x="80" y={10 + i * 28} width="74" height="28" fill="#fff" stroke="#d97706" />
        <text x="117" y={29 + i * 28} textAnchor="middle" fontSize={r.bold ? 11 : 13} fontWeight="bold" fill="#0f172a">{r.a}</text>
        <rect x="154" y={10 + i * 28} width="76" height="28" fill="#fff" stroke="#d97706" />
        <text x="192" y={29 + i * 28} textAnchor="middle" fontSize={r.bold ? 11 : 13} fontWeight="bold" fill="#0f172a">{r.b}</text>
      </g>
    ))}
    <text x="120" y="110" textAnchor="middle" fontSize="11" fontWeight="bold" fill={UNK}>Hány maradt összesen?</text>
  </QFig>
);

export const BRACKETS_100_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'br100-q1',
    level: 1,
    questionTypeBadge: 'Zárójel',
    figure: <ExprFig expr="(6 + 4) · 3 = ?" bubbles={['1.', '2.']} shade />,
    question: '(6 + 4) · 3 = ?',
    options: ['30', '18', '13', '24'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 6 + 4 = 10. Utána: 10 · 3 = 30. (A 18 akkor jön ki, ha nem figyelsz a zárójelre: 6 + 12.)'
  },
  {
    id: 'br100-q2',
    level: 1,
    questionTypeBadge: 'Zárójel',
    figure: <ExprFig expr="(20 − 8) : 4 = ?" shade />,
    question: '(20 − 8) : 4 = ?',
    options: ['3', '18', '12', '4'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 20 − 8 = 12. Utána: 12 : 4 = 3. (A 18 zárójel nélkül jönne ki: 20 − 2.)'
  },
  {
    id: 'br100-q3',
    level: 1,
    questionTypeBadge: 'Mi az első?',
    figure: <ExprFig expr="5 · (9 − 2)" bubbles={['?', '?']} />,
    question: 'Melyik műveletet végzed el először? 5 · (9 − 2)',
    options: ['a kivonást: 9 − 2', 'a szorzást: 5 · 9', 'balról jobbra haladok', 'mindegy, melyiket'],
    correctAnswer: 0,
    explanation: 'Ami zárójelben van, azzal kezdünk: 9 − 2 = 7. Utána 5 · 7 = 35.'
  },
  {
    id: 'br100-q4',
    level: 1,
    questionTypeBadge: 'Zárójel',
    figure: <ExprFig expr="30 − (10 + 5) = ?" shade />,
    question: '30 − (10 + 5) = ?',
    options: ['15', '25', '35', '5'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 10 + 5 = 15. Utána: 30 − 15 = 15. (A 25 akkor jön ki, ha elhagyod a zárójelet: 30 − 10 + 5.)'
  },
  {
    id: 'br100-q5',
    level: 1,
    questionTypeBadge: 'Zárójel',
    question: '(35 + 5) : 8 = ?',
    options: ['5', '40', '4', '6'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 35 + 5 = 40. Utána: 40 : 8 = 5.'
  },
  {
    id: 'br100-q6',
    level: 1,
    questionTypeBadge: 'Zárójel',
    figure: <ExprFig expr="7 · (2 + 3) = ?" bubbles={['2.', '1.']} shade />,
    question: '7 · (2 + 3) = ?',
    options: ['35', '17', '12', '21'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 2 + 3 = 5. Utána: 7 · 5 = 35. (A 17 zárójel nélkül jönne ki: 14 + 3.)'
  },
  {
    id: 'br100-q7',
    level: 1,
    questionTypeBadge: 'Zárójel',
    question: '(16 + 24) − 15 = ?',
    options: ['25', '40', '55', '35'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 16 + 24 = 40. Utána: 40 − 15 = 25.'
  },
  {
    id: 'br100-q8',
    level: 1,
    questionTypeBadge: 'Mi van benne?',
    figure: <ExprFig expr="(45 − 9) : 4" shade />,
    question: 'Mennyi lesz a zárójelben? (45 − 9) : 4',
    options: ['36', '9', '54', '41'],
    correctAnswer: 0,
    explanation: 'A zárójelben 45 − 9 van, ez 36. Utána jön az osztás: 36 : 4 = 9.'
  },
  {
    id: 'br100-q9',
    level: 1,
    questionTypeBadge: 'Zárójel',
    figure: <ExprFig expr="8 · (10 − 5) = ?" shade />,
    question: '8 · (10 − 5) = ?',
    options: ['40', '75', '13', '50'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 10 − 5 = 5. Utána: 8 · 5 = 40. (A 75 zárójel nélkül jönne ki: 80 − 5.)'
  },
  {
    id: 'br100-q10',
    level: 1,
    questionTypeBadge: 'Zárójel',
    question: '(9 + 9) : 2 = ?',
    options: ['9', '18', '11', '8'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 9 + 9 = 18. Utána: 18 : 2 = 9.'
  },

  // ---------------------------- 2. szint ----------------------------
  {
    id: 'br100-q11',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <TwoExprFig a="(60 − 30) : 3" b="60 − 30 : 3" />,
    question: 'Melyiknek nagyobb az eredménye?',
    options: ['60 − 30 : 3', '(60 − 30) : 3', 'Egyenlők.', 'Nem lehet eldönteni.'],
    correctAnswer: 0,
    explanation: '(60 − 30) : 3 = 30 : 3 = 10. 60 − 30 : 3 = 60 − 10 = 50. Az 50 a nagyobb.'
  },
  {
    id: 'br100-q12',
    level: 2,
    questionTypeBadge: 'Történet',
    figure: <PlatesFig n={5} pears={2} plums={4} />,
    question: '5 tányéron 2 körte és 4 szilva van. Melyik műveletsor adja meg a gyümölcsök számát?',
    options: ['5 · (2 + 4)', '5 · 2 + 4', '5 + 2 + 4', '(5 + 2) · 4'],
    correctAnswer: 0,
    explanation: 'Egy tányéron 2 + 4 = 6 gyümölcs van. 5 tányéron: 5 · (2 + 4) = 5 · 6 = 30.'
  },
  {
    id: 'br100-q13',
    level: 2,
    questionTypeBadge: 'Hova a zárójel?',
    figure: <ExprFig expr="2 + 3 · 4 = 20" />,
    question: 'Hova kell a zárójel, hogy igaz legyen? 2 + 3 · 4 = 20',
    options: ['(2 + 3) · 4 = 20', '2 + (3 · 4) = 20', 'Nem kell zárójel.', 'Sehogy sem lehet.'],
    correctAnswer: 0,
    explanation: '(2 + 3) · 4 = 5 · 4 = 20. Zárójel nélkül 2 + 12 = 14 lenne, és 2 + (3 · 4) is 14.'
  },
  {
    id: 'br100-q14',
    level: 2,
    questionTypeBadge: 'Felesleges zárójel',
    question: 'Melyiknél NEM változtat a zárójel az eredményen?',
    options: ['(6 · 3) + 4', '6 · (3 + 4)', '(6 + 3) · 4', '(10 − 3) · 2'],
    correctAnswer: 0,
    explanation: 'A 6 · 3-at zárójel nélkül is először számolnánk. (6 · 3) + 4 = 6 · 3 + 4 = 22. A többinél más lenne az eredmény.'
  },
  {
    id: 'br100-q15',
    level: 2,
    questionTypeBadge: 'Két zárójel',
    figure: <ExprFig expr="(50 − 42) · (15 − 6) = ?" />,
    question: '(50 − 42) · (15 − 6) = ?',
    options: ['72', '81', '63', '17'],
    correctAnswer: 0,
    explanation: 'Mindkét zárójel előbb: 50 − 42 = 8 és 15 − 6 = 9. Utána: 8 · 9 = 72.'
  },
  {
    id: 'br100-q16',
    level: 2,
    questionTypeBadge: 'Zárójel',
    figure: <ExprFig expr="90 − (37 + 28) = ?" shade />,
    question: '90 − (37 + 28) = ?',
    options: ['25', '81', '65', '35'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 37 + 28 = 65. Utána: 90 − 65 = 25. (A 81 zárójel nélkül jönne ki: 53 + 28.)'
  },
  {
    id: 'br100-q17',
    level: 2,
    questionTypeBadge: 'Szóból művelet',
    question: 'Mennyi a 7 és a 3 összegének a hatszorosa?',
    options: ['60', '25', '16', '42'],
    correctAnswer: 0,
    explanation: 'Az összeg: 7 + 3 = 10. Ennek a hatszorosa: (7 + 3) · 6 = 10 · 6 = 60.'
  },
  {
    id: 'br100-q18',
    level: 2,
    questionTypeBadge: 'Szóból művelet',
    question: 'A 36 és a 27 különbségét szorozd meg 8-cal! Mennyi lesz?',
    options: ['72', '9', '80', '64'],
    correctAnswer: 0,
    explanation: 'A különbség: 36 − 27 = 9. Ezt szorozzuk 8-cal: (36 − 27) · 8 = 9 · 8 = 72.'
  },
  {
    id: 'br100-q19',
    level: 2,
    questionTypeBadge: 'Szóból művelet',
    question: 'A 48 és a 24 összegét oszd el 8-cal! Melyik műveletsor ez?',
    options: ['(48 + 24) : 8', '48 + 24 : 8', '48 : 8 + 24', '(48 − 24) : 8'],
    correctAnswer: 0,
    explanation: 'Előbb az összeg kell, ezért zárójelbe tesszük: (48 + 24) : 8 = 72 : 8 = 9.'
  },
  {
    id: 'br100-q20',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <ExprFig expr="□ − (12 + 18) = 40" shade />,
    question: 'Melyik szám illik a □ helyére? □ − (12 + 18) = 40',
    options: ['70', '10', '58', '52'],
    correctAnswer: 0,
    explanation: 'A zárójelben 12 + 18 = 30. Melyik számból elvéve a 30-at marad 40? 40 + 30 = 70. Ellenőrzés: 70 − 30 = 40.'
  },

  // ---------------------------- 3. szint ----------------------------
  {
    id: 'br100-q21',
    level: 3,
    questionTypeBadge: 'Történet',
    figure: <SeatsFig />,
    question: 'A moziban 4 sor van. Minden sorban 6 kék és 3 piros szék áll. Hány szék van összesen?',
    options: ['36', '27', '18', '13'],
    correctAnswer: 0,
    explanation: 'Egy sorban 6 + 3 = 9 szék. 4 sorban: 4 · (6 + 3) = 4 · 9 = 36. (A 27 a 4 · 6 + 3 hibás műveletsor eredménye.)'
  },
  {
    id: 'br100-q22',
    level: 3,
    questionTypeBadge: 'Történet',
    figure: <RentFig />,
    question: 'A kölcsönzőben 34 roller és 28 gördeszka volt. Kivittek 9 rollert és 7 gördeszkát. Hány maradt összesen?',
    options: ['46', '60', '78', '16'],
    correctAnswer: 0,
    explanation: '(34 + 28) − (9 + 7) = 62 − 16 = 46. Másképp: (34 − 9) + (28 − 7) = 25 + 21 = 46.'
  },
  {
    id: 'br100-q23',
    level: 3,
    questionTypeBadge: 'Történet',
    figure: <NutsFig />,
    question: 'Bence 18, Kata 22 diót szedett. Az összeset 5 egyenlő kupacba rakják. Hány dió lesz egy kupacban?',
    options: ['8', '40', '7', '9'],
    correctAnswer: 0,
    explanation: '(18 + 22) : 5 = 40 : 5 = 8. Egy kupacban 8 dió lesz.'
  },
  {
    id: 'br100-q24',
    level: 3,
    questionTypeBadge: 'Két út',
    question: 'Melyik két műveletsornak ugyanannyi az eredménye?',
    options: ['3 · 4 + 3 · 5  és  3 · (4 + 5)', '3 · 4 + 5  és  3 · (4 + 5)', '3 + 4 · 5  és  (3 + 4) · 5', '3 · 4 · 5  és  3 · (4 + 5)'],
    correctAnswer: 0,
    explanation: '3 · 4 + 3 · 5 = 12 + 15 = 27 és 3 · (4 + 5) = 3 · 9 = 27. A többi párban más-más az eredmény.'
  },
  {
    id: 'br100-q25',
    level: 3,
    questionTypeBadge: 'Hova a zárójel?',
    figure: <ExprFig expr="4 · 5 + 4 = 36" />,
    question: 'Hova tegyük a zárójelet, hogy igaz legyen? 4 · 5 + 4 = 36',
    options: ['4 · (5 + 4) = 36', '(4 · 5) + 4 = 36', 'Nem kell zárójel.', '(4 · 5 + 4) = 36'],
    correctAnswer: 0,
    explanation: '4 · (5 + 4) = 4 · 9 = 36. Zárójel nélkül 20 + 4 = 24 lenne.'
  },
  {
    id: 'br100-q26',
    level: 3,
    questionTypeBadge: 'Melyik a legnagyobb?',
    question: 'Melyik műveletsor eredménye a legnagyobb?',
    options: ['(10 + 2) · 5', '10 + 2 · 5', '10 · 2 + 5', '(10 − 2) · 5'],
    correctAnswer: 0,
    explanation: '(10 + 2) · 5 = 60, 10 + 2 · 5 = 20, 10 · 2 + 5 = 25, (10 − 2) · 5 = 40. A legnagyobb a 60.'
  },
  {
    id: 'br100-q27',
    level: 3,
    questionTypeBadge: 'Történet',
    figure: <MarblesFig />,
    question: '15 üveggolyóm volt, kaptam még 9-et. Mindet 4 egyforma kupacba rakom. Hány golyó lesz egy kupacban?',
    options: ['6', '24', '5', '8'],
    correctAnswer: 0,
    explanation: '(15 + 9) : 4 = 24 : 4 = 6. Egy kupacban 6 golyó lesz.'
  },
  {
    id: 'br100-q28',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    question: 'Melyik számra gondoltam? A 9 és a 4 különbségének a hétszereséhez adj hozzá 6-ot!',
    options: ['41', '35', '65', '47'],
    correctAnswer: 0,
    explanation: '(9 − 4) · 7 + 6 = 5 · 7 + 6 = 35 + 6 = 41.'
  },
  {
    id: 'br100-q29',
    level: 3,
    questionTypeBadge: 'Két zárójel',
    figure: <ExprFig expr="(4 + 6) · (9 − 2) = ?" />,
    question: '(4 + 6) · (9 − 2) = ?',
    options: ['70', '56', '21', '63'],
    correctAnswer: 0,
    explanation: 'Mindkét zárójel előbb: 4 + 6 = 10 és 9 − 2 = 7. Utána: 10 · 7 = 70. (Zárójelek nélkül 4 + 54 − 2 = 56 lenne.)'
  },
  {
    id: 'br100-q30',
    level: 3,
    questionTypeBadge: 'Melyik műveletsor?',
    figure: <BusFig />,
    question: 'A busz 45 utassal indult. Az 1. megállóban 8-an, a 2.-ban 12-en szálltak le. Melyik műveletsor jó?',
    options: ['45 − (8 + 12)', '45 − 8 + 12', '45 − (12 − 8)', '45 + 8 − 12'],
    correctAnswer: 0,
    explanation: 'Összesen 8 + 12 = 20-an szálltak le. 45 − (8 + 12) = 45 − 20 = 25 utas maradt.'
  }
];

export const Brackets100G3Quiz: React.FC<{
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
      topicId="g3-c100-zarojel-quiz"
      subtopicId="a-zarojel-hasznalata"
      title="7. A zárójel használata – Kvíz"
      subtitle="30 feladat 3 szinten: zárójel először, zárójellel és nélküle, műveletsor szövegből és történetből."
      badge="3. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 100-IG • KVÍZ"
      questions={BRACKETS_100_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'A zárójel',
          items: ['Ami zárójelben van, azzal kezdünk.', '(6 + 4) · 3 = 10 · 3 = 30', '30 − (10 + 5) = 30 − 15 = 15']
        },
        {
          title: 'Zárójellel és nélküle',
          items: ['5 + 3 · 4 = 17', '(5 + 3) · 4 = 32', '(3 · 4) + 5 = 3 · 4 + 5: itt nem változtat']
        },
        {
          title: 'Szóból művelet',
          items: ['a 7 és 3 összegének hatszorosa: (7 + 3) · 6', 'a 48 és 24 összegét oszd el 8-cal: (48 + 24) : 8', 'Többen visznek el: 45 − (8 + 12)']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Brackets100G3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Brackets100G3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Brackets100G3Quiz;
