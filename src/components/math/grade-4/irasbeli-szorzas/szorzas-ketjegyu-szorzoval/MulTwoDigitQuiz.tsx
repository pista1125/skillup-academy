import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MulTwoDigitMatcher } from './MulTwoDigitMatcher';
import { MulTwoDigitSorter } from './MulTwoDigitSorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek
// ---------------------------------------------------------------------------
const C_UNK = '#dc2626';
const COLS = ['#16a34a', '#dc2626', '#0ea5e9', '#eab308'];
const HEADS = ['E', 'sz', 't', 'e'];

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Helyiérték-táblázat: felül a szám, alatta a „?” szorzat. */
const QPlace: React.FC<{ top: string; label: string }> = ({ top, label }) => {
  const xs = [60, 100, 140, 180];
  return (
    <QFig h={140}>
      {HEADS.map((hd, i) => (
        <g key={hd}>
          <rect x={xs[i] - 18} y="12" width="36" height="18" fill={COLS[i]} />
          <text x={xs[i]} y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">{hd}</text>
          <rect x={xs[i] - 18} y="30" width="36" height="74" fill={COLS[i]} opacity="0.13" />
        </g>
      ))}
      {top
        .padStart(4, ' ')
        .split('')
        .map((d, i) => (
          <text key={i} x={xs[i]} y="56" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#0f172a">{d.trim()}</text>
        ))}
      <text x="120" y="92" textAnchor="middle" fontSize="20" fontWeight="bold" fill={C_UNK}>?</text>
      <text x="120" y="126" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">{label}</text>
    </QFig>
  );
};

/** Érmék: n darab v forintos. */
const QCoins: React.FC<{ groups: { n: number; v: number; name: string; fill: string }[]; note?: string }> = ({ groups, note }) => {
  const h = 30 + groups.length * 58 + (note ? 18 : 0);
  return (
    <QFig h={h}>
      {groups.map((g, gi) => {
        const shown = Math.min(g.n, 8);
        return (
          <g key={g.name}>
            <text x="14" y={26 + gi * 58} fontSize="11" fontWeight="bold" fill="#334155">
              {g.name}: {g.n} db
            </text>
            {Array.from({ length: shown }).map((_, i) => (
              <g key={i}>
                <circle cx={24 + i * 26} cy={50 + gi * 58} r="11" fill={g.fill} stroke="#475569" strokeWidth="1.2" />
                <text x={24 + i * 26} y={54 + gi * 58} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e293b">{g.v}</text>
              </g>
            ))}
            {g.n > shown && (
              <text x={24 + shown * 26} y={54 + gi * 58} fontSize="12" fontWeight="bold" fill="#475569">…</text>
            )}
          </g>
        );
      })}
      {note && (
        <text x="120" y={h - 10} textAnchor="middle" fontSize="12" fontWeight="bold" fill={C_UNK}>{note}</text>
      )}
    </QFig>
  );
};

/** Nyíllánc: kezdő szám → műveletek → dobozok (a „?” piros). */
const QChain: React.FC<{ start: string; ops: string[]; boxes: string[] }> = ({ start, ops, boxes }) => {
  const step = 200 / (ops.length + 0.4);
  return (
    <QFig h={96}>
      <defs>
        <marker id="qcArr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill="#2563eb" />
        </marker>
      </defs>
      <text x="22" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">{start}</text>
      {ops.map((op, i) => {
        const x0 = 36 + i * step;
        const bx = x0 + step - 42;
        return (
          <g key={i}>
            <line x1={x0} y1="55" x2={bx - 2} y2="55" stroke="#2563eb" strokeWidth="1.8" markerEnd="url(#qcArr)" />
            <text x={(x0 + bx) / 2} y="44" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563eb">{op}</text>
            <rect x={bx} y="40" width="42" height="28" rx="4" fill="#fff" stroke="#0f172a" strokeWidth="1.4" />
            <text x={bx + 21} y="59" textAnchor="middle" fontSize={boxes[i].length > 4 ? 11 : 13} fontWeight="bold" fill={boxes[i] === '?' ? C_UNK : '#1d4ed8'}>
              {boxes[i]}
            </text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Egyszerű adattáblázat. */
const QTable: React.FC<{ title: string; rows: { k: string; v: string }[] }> = ({ title, rows }) => (
  <QFig h={38 + rows.length * 22}>
    <text x="120" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b">{title}</text>
    {rows.map((r, i) => (
      <g key={r.k}>
        <rect x="16" y={30 + i * 22} width="208" height="20" rx="4" fill={i % 2 ? '#eff6ff' : '#dbeafe'} />
        <text x="24" y={44 + i * 22} fontSize="11" fontWeight="bold" fill="#334155">{r.k}</text>
        <text x="216" y={44 + i * 22} textAnchor="end" fontSize="12" fontWeight="bold" fill={r.v.includes('?') ? C_UNK : '#1e40af'}>{r.v}</text>
      </g>
    ))}
  </QFig>
);

/** Számkártyák. */
const QCards: React.FC<{ digits: string[]; note: string }> = ({ digits, note }) => (
  <QFig h={110}>
    {digits.map((d, i) => {
      const x = 120 - (digits.length * 44) / 2 + i * 44 + 4;
      return (
        <g key={i}>
          <rect x={x} y="18" width="36" height="46" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.8" />
          <text x={x + 18} y="50" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#92400e">{d}</text>
        </g>
      );
    })}
    <text x="120" y="92" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{note}</text>
  </QFig>
);

/** Téglalap két részre bontva (szorzás tagonként). */
const QSplit: React.FC<{ a: string; b: string; m: string }> = ({ a, b, m }) => (
  <QFig h={130}>
    <rect x="20" y="20" width="130" height="60" fill="#fdba74" stroke="#c2410c" strokeWidth="1.6" />
    <rect x="150" y="20" width="50" height="60" fill="#fed7aa" stroke="#c2410c" strokeWidth="1.6" />
    <text x="85" y="55" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c2d12">{a} · {m}</text>
    <text x="175" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c2d12">{b} · {m}</text>
    <text x="85" y="96" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9a3412">{a}</text>
    <text x="175" y="96" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9a3412">{b}</text>
    <text x="214" y="54" fontSize="11" fontWeight="bold" fill="#9a3412">{m}</text>
    <text x="120" y="120" textAnchor="middle" fontSize="13" fontWeight="bold" fill={C_UNK}>Összesen: ?</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const MUL_TWO_DIGIT_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'm2d-q1',
    level: 1,
    questionTypeBadge: 'Szorzás 10-zel',
    figure: <QPlace top="71" label="71 · 10 = ?" />,
    question: 'Mennyi 71 · 10?',
    options: ['710', '71', '7100', '701'],
    correctAnswer: 0,
    explanation: '10-zel szorzáskor minden számjegy egy hellyel balra lép: a 7 tízesből 7 százas, az 1 egyesből 1 tízes lesz, az egyesek helyére 0 kerül. 71 · 10 = 710.'
  },
  {
    id: 'm2d-q2',
    level: 1,
    questionTypeBadge: 'Tízesek',
    question: 'Mennyit ér 25 tízes?',
    options: ['250', '25', '2500', '205'],
    correctAnswer: 0,
    explanation: '1 tízes 10-et ér, ezért 25 tízes 25 · 10 = 250.'
  },
  {
    id: 'm2d-q3',
    level: 1,
    questionTypeBadge: 'Kerek tízes',
    question: 'Mennyi 41 · 20?',
    options: ['820', '82', '8200', '802'],
    correctAnswer: 0,
    explanation: '20 = 2 · 10. Előbb 2-vel szorzok: 41 · 2 = 82, aztán 10-zel: 82 · 10 = 820.'
  },
  {
    id: 'm2d-q4',
    level: 1,
    questionTypeBadge: 'Szorzás 10-zel',
    question: 'Mennyi 10 · 64?',
    options: ['640', '64', '6400', '614'],
    correctAnswer: 0,
    explanation: 'A tényezők felcserélhetők: 10 · 64 = 64 · 10 = 640.'
  },
  {
    id: 'm2d-q5',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <QCoins groups={[{ n: 12, v: 20, name: 'Barnabás', fill: '#d9c56b' }]} note="Összesen: ? Ft" />,
    question: 'Barnabásnak 12 darab 20 forintos érméje van. Hány forintja van?',
    options: ['240 Ft', '24 Ft', '2400 Ft', '32 Ft'],
    correctAnswer: 0,
    explanation: '12 · 20 = 12 · 2 tízes = 24 tízes = 240. Barnabásnak 240 Ft-ja van. (A 32 akkor jönne ki, ha összeadnád: 12 + 20.)'
  },
  {
    id: 'm2d-q6',
    level: 1,
    questionTypeBadge: 'Kerek tízes',
    figure: <QChain start="9" ops={['· 7', '· 10']} boxes={['63', '?']} />,
    question: '9 · 7 = 63. Mennyi 9 · 70?',
    options: ['630', '63', '6300', '79'],
    correctAnswer: 0,
    explanation: 'A 70 a 7-nek a 10-szerese, ezért a szorzat is 10-szeres lesz: 63 · 10 = 630.'
  },
  {
    id: 'm2d-q7',
    level: 1,
    questionTypeBadge: 'Szorzás 10-zel',
    figure: <QPlace top="893" label="893 · 10 = ?" />,
    question: 'Mennyi 893 · 10?',
    options: ['8930', '893', '9830', '8903'],
    correctAnswer: 0,
    explanation: 'Minden számjegy egy hellyel balra lép: 8 százasból 8 ezres, 9 tízesből 9 százas, 3 egyesből 3 tízes lesz, a végére 0 kerül: 8930.'
  },
  {
    id: 'm2d-q8',
    level: 1,
    questionTypeBadge: 'Kerek tízes',
    question: 'Mennyi 16 · 20?',
    options: ['320', '32', '3200', '360'],
    correctAnswer: 0,
    explanation: '16 · 2 = 32, és 10-zel szorozva 320.'
  },
  {
    id: 'm2d-q9',
    level: 1,
    questionTypeBadge: 'Tízesek',
    question: 'Mennyit ér 100 tízes?',
    options: ['1000', '100', '10 000', '110'],
    correctAnswer: 0,
    explanation: '100 · 10 = 1000. Száz darab tízes egy ezrest ér.'
  },
  {
    id: 'm2d-q10',
    level: 1,
    questionTypeBadge: 'Szorzat változása',
    figure: <QChain start="8" ops={['· 2', '· 100']} boxes={['16', '?']} />,
    question: '8 · 2 = 16. Mennyi 8 · 200?',
    options: ['1600', '160', '1200', '208'],
    correctAnswer: 0,
    explanation: 'A 200 a 2-nek a 100-szorosa, ezért a szorzat is 100-szoros: 16 · 100 = 1600.'
  },

  // ---------------------------- 2. szint ----------------------------
  {
    id: 'm2d-q11',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <QCoins groups={[{ n: 23, v: 50, name: 'Eszter', fill: '#cbd5e1' }]} note="Összesen: ? Ft" />,
    question: 'Eszternek 23 darab 50 forintos érméje van. Hány forintja van?',
    options: ['1150 Ft', '115 Ft', '1100 Ft', '1250 Ft'],
    correctAnswer: 0,
    explanation: '23 · 50: előbb 5-tel szorzok: 23 · 5 = 115, aztán 10-zel: 115 · 10 = 1150. Eszternek 1150 Ft-ja van.'
  },
  {
    id: 'm2d-q12',
    level: 2,
    questionTypeBadge: 'Kerek tízes',
    question: 'Mennyi 43 · 40?',
    options: ['1720', '172', '1620', '1600'],
    correctAnswer: 0,
    explanation: '43 · 4 = 172 (4 · 3 = 12, leírom a 2-t, maradt 1; 4 · 4 = 16, és még 1: 17). Aztán 10-zel: 1720.'
  },
  {
    id: 'm2d-q13',
    level: 2,
    questionTypeBadge: 'Kerek tízes',
    question: 'Mennyi 32 · 50?',
    options: ['1600', '160', '1500', '1650'],
    correctAnswer: 0,
    explanation: '32 · 5 = 160, és 10-zel szorozva 1600. Vigyázz, itt két 0 van a végén!'
  },
  {
    id: 'm2d-q14',
    level: 2,
    questionTypeBadge: 'Szorzás tagonként',
    figure: <QSplit a="100" b="30" m="60" />,
    question: 'Számold ki tagonként: 130 · 60 = 100 · 60 + 30 · 60 = ?',
    options: ['7800', '6180', '780', '6600'],
    correctAnswer: 0,
    explanation: '100 · 60 = 6000 és 30 · 60 = 1800. Összeadva: 6000 + 1800 = 7800. (A 6180-nál a 30 · 60-at 180-nak számolták, lemaradt egy 0.)'
  },
  {
    id: 'm2d-q15',
    level: 2,
    questionTypeBadge: 'Szorzás tagonként',
    question: 'Mennyi 140 · 20?',
    options: ['2800', '280', '2080', '2400'],
    correctAnswer: 0,
    explanation: '140 · 20 = 100 · 20 + 40 · 20 = 2000 + 800 = 2800. Vagy: 14 · 2 = 28, és két 0 kerül a végére.'
  },
  {
    id: 'm2d-q16',
    level: 2,
    questionTypeBadge: 'Kerek százas',
    question: 'Mennyi 12 · 800?',
    options: ['9600', '960', '8600', '9800'],
    correctAnswer: 0,
    explanation: '800 = 8 · 100. 12 · 8 = 96, és 100-zal szorozva 9600.'
  },
  {
    id: 'm2d-q17',
    level: 2,
    questionTypeBadge: 'Szorzat változása',
    question: 'Hogyan változik a szorzat, ha a szorzót a 10-szeresére változtatjuk, a szorzandó marad?',
    options: ['A szorzat is a 10-szeresére nő.', 'A szorzat nem változik.', 'A szorzat 10-zel nő.', 'A szorzat a tizedére csökken.'],
    correctAnswer: 0,
    explanation: 'Például 9 · 7 = 63 és 9 · 70 = 630. A 630 a 63-nak a 10-szerese, nem 10-zel több.'
  },
  {
    id: 'm2d-q18',
    level: 2,
    questionTypeBadge: 'Szorzat változása',
    figure: <QChain start="9" ops={['· 7', '· 10', '· 10']} boxes={['63', '630', '?']} />,
    question: '9 · 7 = 63 és 9 · 70 = 630. Mennyi 9 · 700?',
    options: ['6300', '630', '763', '9700'],
    correctAnswer: 0,
    explanation: 'A 700 a 70-nek a 10-szerese, ezért a szorzat is 10-szeres: 630 · 10 = 6300.'
  },
  {
    id: 'm2d-q19',
    level: 2,
    questionTypeBadge: 'Kerek százas',
    question: 'Mennyi 28 · 200?',
    options: ['5600', '560', '4600', '5800'],
    correctAnswer: 0,
    explanation: '28 · 2 = 56, és 100-zal szorozva 5600.'
  },
  {
    id: 'm2d-q20',
    level: 2,
    questionTypeBadge: 'Kerek tízes',
    question: 'Mennyi 150 · 50?',
    options: ['7500', '750', '5500', '7050'],
    correctAnswer: 0,
    explanation: '150 · 5 = 750, és 10-zel szorozva 7500. Vagy: 100 · 50 + 50 · 50 = 5000 + 2500 = 7500.'
  },

  // ---------------------------- 3. szint ----------------------------
  {
    id: 'm2d-q21',
    level: 3,
    questionTypeBadge: 'Verseny',
    figure: (
      <QTable
        title="Manó szorzásai"
        rows={[
          { k: '120 · 20', v: '?' },
          { k: '330 · 30', v: '?' },
          { k: '430 · 10', v: '?' },
          { k: '150 · 50', v: '?' }
        ]}
      />
    ),
    question: 'Manó szorzásai a táblázatban vannak. Hány szorzata nagyobb 5000-nél?',
    options: ['2', '1', '3', '4'],
    correctAnswer: 0,
    explanation: '120 · 20 = 2400, 330 · 30 = 9900, 430 · 10 = 4300, 150 · 50 = 7500. 5000-nél nagyobb: 9900 és 7500, vagyis 2 szorzat.'
  },
  {
    id: 'm2d-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Az osztály 26 tanulója kirándulni megy. A belépőjegy fejenként 300 Ft. Mennyit fizetnek összesen?',
    options: ['7800 Ft', '780 Ft', '6800 Ft', '5200 Ft'],
    correctAnswer: 0,
    explanation: '26 · 300: 26 · 3 = 78, és 100-zal szorozva 7800. Összesen 7800 Ft-ot fizetnek.'
  },
  {
    id: 'm2d-q23',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    figure: <QCards digits={['4', '8', '7', '3']} note="legnagyobb kétjegyű páratlan szám · 100 = ?" />,
    question: 'A 4, 8, 7, 3 kártyákból kirakod a legnagyobb kétjegyű páratlan számot (egy kártyát egyszer használhatsz). Mennyi ennek a 100-szorosa?',
    options: ['8700', '870', '8400', '8300'],
    correctAnswer: 0,
    explanation: 'Páratlan szám 7-re vagy 3-ra végződik. A legnagyobb: 87. 87 · 100 = 8700. (A 84 páros, a 83 kisebb, mint 87.)'
  },
  {
    id: 'm2d-q24',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik szorzat a legnagyobb?',
    options: ['11 · 900', '27 · 300', '19 · 400', '15 · 500'],
    correctAnswer: 0,
    explanation: '11 · 900 = 9900, 27 · 300 = 8100, 19 · 400 = 7600, 15 · 500 = 7500. A legnagyobb a 9900.'
  },
  {
    id: 'm2d-q25',
    level: 3,
    questionTypeBadge: 'Hiányzó szorzó',
    question: 'Melyik kerek tízessel kell megszorozni a 24-et, hogy 720 legyen? 24 · □ = 720',
    options: ['30', '3', '300', '70'],
    correctAnswer: 0,
    explanation: '24 · 3 = 72, és 72 · 10 = 720. Tehát 24 · 30 = 720, a □ = 30.'
  },
  {
    id: 'm2d-q26',
    level: 3,
    questionTypeBadge: 'Láncszorzás',
    figure: <QChain start="61" ops={['· 10', '· 10']} boxes={['610', '6100']} />,
    question: '61 · 10 · 10 = 6100. Melyik egyetlen szorzással kapod meg ugyanezt 61-ből?',
    options: ['61 · 100', '61 · 20', '61 · 11', '61 · 1000'],
    correctAnswer: 0,
    explanation: 'Kétszer 10-zel szorozni ugyanaz, mint egyszer 100-zal (10 · 10 = 100). 61 · 100 = 6100.'
  },
  {
    id: 'm2d-q27',
    level: 3,
    questionTypeBadge: 'Láncszorzás',
    figure: <QChain start="14" ops={['· 20', '· 20']} boxes={['280', '?']} />,
    question: '14-et megszorzod 20-szal, majd az eredményt újra 20-szal. Mennyit kapsz?',
    options: ['5600', '560', '280', '2800'],
    correctAnswer: 0,
    explanation: '14 · 20 = 280, aztán 280 · 20 = 5600 (28 · 2 = 56, és két 0). Ez ugyanaz, mint 14 · 400.'
  },
  {
    id: 'm2d-q28',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: (
      <QCoins
        groups={[
          { n: 16, v: 10, name: 'Éva', fill: '#cbd5e1' },
          { n: 14, v: 20, name: 'Zsombor', fill: '#d9c56b' }
        ]}
        note="Mennyivel több? ? Ft"
      />
    ),
    question: 'Évának 16 darab 10 forintosa, Zsombornak 14 darab 20 forintosa van. Mennyivel több pénze van Zsombornak?',
    options: ['120 Ft-tal', '2 Ft-tal', '140 Ft-tal', '440 Ft-tal'],
    correctAnswer: 0,
    explanation: 'Éva: 16 · 10 = 160 Ft. Zsombor: 14 · 20 = 280 Ft. A különbség: 280 − 160 = 120 Ft. (A 2 csak az érmék darabszámának különbsége.)'
  },
  {
    id: 'm2d-q29',
    level: 3,
    questionTypeBadge: 'Pénz',
    question: 'Hány darab 20 forintos érme kell 500 Ft-hoz?',
    options: ['25', '250', '20', '30'],
    correctAnswer: 0,
    explanation: '25 · 20 = 500 (25 · 2 = 50, és 10-zel szorozva 500). Tehát 25 érme kell.'
  },
  {
    id: 'm2d-q30',
    level: 3,
    questionTypeBadge: 'Szorzás tagonként',
    question: 'Melyik egyenlő 130 · 40-nel?',
    options: ['100 · 40 + 30 · 40', '100 · 40 + 30', '130 · 4', '13 · 40'],
    correctAnswer: 0,
    explanation: '130 = 100 + 30, és mindkét részt meg kell szorozni 40-nel: 4000 + 1200 = 5200. A 130 · 4 és a 13 · 40 csak 520.'
  }
];

export const MulTwoDigitQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="irasbeli-szorzas"
      topicId="g4-wmult-ketjegyu-quiz"
      subtopicId="szorzas-ketjegyu-szorzoval"
      title="1. Szorzás kétjegyű szorzóval – Kvíz"
      subtitle="30 feladat 3 szinten: szorzás 10-zel, 100-zal, kerek tízesekkel, szorzás tagonként, szöveges feladatok."
      badge="4. OSZTÁLY • VII. ÍRÁSBELI SZORZÁS • KVÍZ"
      questions={MUL_TWO_DIGIT_QUESTIONS}
      cheatSheets={[
        {
          title: 'Szorzás 10-zel, 100-zal',
          items: [
            '· 10: a számjegyek egy hellyel balra lépnek, a végére 0 kerül: 71 · 10 = 710',
            '· 100: két hellyel lépnek balra, a végére 00 kerül: 87 · 100 = 8700',
            '25 tízes = 25 · 10 = 250',
            'A tényezők felcserélhetők: 10 · 64 = 64 · 10'
          ]
        },
        {
          title: 'Kerek tízessel',
          items: [
            '23 · 50 → 23 · 5 = 115 → 115 · 10 = 1150',
            'Szorozz a tízesek számával, aztán 10-zel!',
            'Ha a szorzó 10-szeres lesz, a szorzat is 10-szeres lesz.',
            'Figyelj: 25 · 20 = 500, két 0 van a végén!'
          ]
        },
        {
          title: 'Szorzás tagonként',
          items: [
            '130 · 60 = 100 · 60 + 30 · 60',
            '= 6000 + 1800 = 7800',
            'Mindkét tagot szorozd meg!',
            '„Fejenként 300 Ft, 26 fő” → 26 · 300'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <MulTwoDigitMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <MulTwoDigitSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default MulTwoDigitQuiz;
