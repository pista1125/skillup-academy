import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MulRelationsG3Matcher } from './MulRelationsG3Matcher';
import { MulRelationsG3Sorter } from './MulRelationsG3Sorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – a keresett szám mindig piros „?”
// ---------------------------------------------------------------------------
const UNK = '#dc2626';
const INK = '#0f172a';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 140 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Ismert szorzás fent, új szorzás lent. opA / opB: a tényezők változása (nyíl a tényező alatt). */
const ChangeFig: React.FC<{ a: string; b: string; p: string; a2: string; b2: string; opA?: string; opB?: string }> = ({ a, b, p, a2, b2, opA, opB }) => {
  const xs = [58, 92, 126, 160, 200];
  const row = (y: number, t: string[]) =>
    t.map((s, i) => (
      <text key={i} x={xs[i]} y={y} textAnchor="middle" fontSize="22" fontWeight="bold" fill={s === '?' ? UNK : INK}>
        {s}
      </text>
    ));
  const arrow = (x: number, op: string) => (
    <g>
      <line x1={x} y1="44" x2={x} y2="76" stroke={op.startsWith(':') ? '#7c3aed' : '#ea580c'} strokeWidth="3" />
      <polygon points={`${x},82 ${x - 6},73 ${x + 6},73`} fill={op.startsWith(':') ? '#7c3aed' : '#ea580c'} />
      <text x={x - 10} y="66" textAnchor="end" fontSize="15" fontWeight="bold" fill={op.startsWith(':') ? '#6d28d9' : '#c2410c'}>
        {op}
      </text>
    </g>
  );
  return (
    <QFig h={124}>
      {row(36, [a, '·', b, '=', p])}
      {opA && arrow(xs[0], opA)}
      {opB && arrow(xs[2], opB)}
      {row(108, [a2, '·', b2, '=', '?'])}
    </QFig>
  );
};

/** Kétsoros táblázat: fejléc + értékek; '?' piros. */
const TableFig: React.FC<{ head: string[]; vals: string[]; labels?: [string, string] }> = ({ head, vals, labels }) => {
  const lw = labels ? 82 : 0;
  const cw = (220 - lw) / head.length;
  return (
    <QFig h={100}>
      {labels && (
        <g>
          <rect x="10" y="12" width={lw} height="38" fill="#16a34a" stroke="#fff" strokeWidth="2" />
          <text x={10 + lw / 2} y="37" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">{labels[0]}</text>
          <rect x="10" y="50" width={lw} height="38" fill="#4ade80" stroke="#fff" strokeWidth="2" />
          <text x={10 + lw / 2} y="75" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">{labels[1]}</text>
        </g>
      )}
      {head.map((h, i) => (
        <g key={i}>
          <rect x={10 + lw + i * cw} y="12" width={cw} height="38" fill={!labels && i === 0 ? '#15803d' : '#16a34a'} stroke="#fff" strokeWidth="2" />
          <text x={10 + lw + i * cw + cw / 2} y="38" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">{h}</text>
          <rect x={10 + lw + i * cw} y="50" width={cw} height="38" fill={!labels && i === 0 ? '#4ade80' : '#dcfce7'} stroke="#fff" strokeWidth="2" />
          <text x={10 + lw + i * cw + cw / 2} y="76" textAnchor="middle" fontSize="18" fontWeight="bold" fill={vals[i] === '?' ? UNK : INK}>{vals[i]}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Következtetés: „n1 egység → v1”, „n2 egység → ?” – mindkét oldalon ugyanaz a nyíl. */
const RatioFig: React.FC<{ l1: string; r1: string; l2: string }> = ({ l1, r1, l2 }) => (
  <QFig h={120}>
    <rect x="22" y="14" width="90" height="34" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
    <text x="67" y="38" textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>{l1}</text>
    <line x1="116" y1="31" x2="128" y2="31" stroke="#334155" strokeWidth="2.5" />
    <polygon points="132,31 125,26 125,36" fill="#334155" />
    <rect x="136" y="14" width="90" height="34" rx="8" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
    <text x="181" y="38" textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>{r1}</text>
    <rect x="22" y="72" width="90" height="34" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
    <text x="67" y="96" textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>{l2}</text>
    <line x1="116" y1="89" x2="128" y2="89" stroke="#334155" strokeWidth="2.5" />
    <polygon points="132,89 125,84 125,94" fill="#334155" />
    <rect x="136" y="72" width="90" height="34" rx="8" fill="#fff" stroke="#b45309" strokeWidth="2" strokeDasharray="5 3" />
    <text x="181" y="97" textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

/** Két pöttyrács egymás mellett (a második szorzat eredménye nincs kiírva). */
const DotsFig: React.FC<{ r1: number; c1: number; r2: number; c2: number }> = ({ r1, c1, r2, c2 }) => {
  const s = 12;
  const grid = (x0: number, rows: number, cols: number, color: string) =>
    Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => <circle key={`${r}-${c}`} cx={x0 + c * s} cy={18 + r * s} r="4.5" fill={color} stroke="#1e293b" strokeWidth="0.8" />)
    );
  return (
    <QFig h={140}>
      {grid(30, r1, c1, '#38bdf8')}
      <text x={30 + ((c1 - 1) * s) / 2} y="130" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>{`${r1} · ${c1}`}</text>
      <line x1="104" y1="60" x2="128" y2="60" stroke="#ea580c" strokeWidth="3" />
      <polygon points="134,60 126,55 126,65" fill="#ea580c" />
      {grid(150, r2, c2, '#f472b6')}
      <text x={150 + ((c2 - 1) * s) / 2} y="130" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>{`${r2} · ${c2}`}</text>
    </QFig>
  );
};

/** Egyforma dobozok egy-egy számmal. */
const BoxesFig: React.FC<{ n: number; v: string }> = ({ n, v }) => {
  const w = 44;
  const x0 = 120 - (n * w + (n - 1) * 8) / 2;
  return (
    <QFig h={90}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={x0 + i * (w + 8)} y="22" width={w} height="44" rx="6" fill="#fdba74" stroke="#9a3412" strokeWidth="2.5" />
          <text x={x0 + i * (w + 8) + w / 2} y="51" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#431407">{v}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Négy szorzás-kártya. */
const CardsFig: React.FC<{ items: string[] }> = ({ items }) => (
  <QFig h={110}>
    {items.map((t, i) => (
      <g key={i}>
        <rect x={14 + (i % 2) * 110} y={12 + Math.floor(i / 2) * 48} width="102" height="38" rx="9" fill={['#fce7f3', '#dbeafe', '#dcfce7', '#fef3c7'][i]} stroke="#64748b" strokeWidth="1.5" />
        <text x={65 + (i % 2) * 110} y={38 + Math.floor(i / 2) * 48} textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>{t}</text>
      </g>
    ))}
  </QFig>
);

export const MUL_RELATIONS_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'mr-q1',
    level: 1,
    questionTypeBadge: 'Kétszeres tényező',
    figure: <ChangeFig a="4" b="20" p="80" a2="8" b2="20" opA="· 2" />,
    question: 'Tudjuk: 4 · 20 = 80. Mennyi 8 · 20?',
    options: ['160', '80', '100', '84'],
    correctAnswer: 0,
    explanation: 'A 8 a 4-nek a 2-szerese. Így a szorzat is 2-szeres: 80 · 2 = 160.'
  },
  {
    id: 'mr-q2',
    level: 1,
    questionTypeBadge: 'Tízszeres tényező',
    figure: <ChangeFig a="6" b="5" p="30" a2="6" b2="50" opB="· 10" />,
    question: 'Tudjuk: 6 · 5 = 30. Mennyi 6 · 50?',
    options: ['300', '30', '56', '65'],
    correctAnswer: 0,
    explanation: 'Az 50 az 5-nek a 10-szerese. A szorzat is 10-szeres: 30 · 10 = 300.'
  },
  {
    id: 'mr-q3',
    level: 1,
    questionTypeBadge: 'Felcserélés',
    question: 'Tudjuk: 3 · 9 = 27. Mennyi 9 · 3?',
    options: ['27', '39', '93', '12'],
    correctAnswer: 0,
    explanation: 'A tényezők felcserélhetők. 9 · 3 ugyanannyi, mint 3 · 9, vagyis 27.'
  },
  {
    id: 'mr-q4',
    level: 1,
    questionTypeBadge: 'Táblázat',
    figure: <TableFig labels={['doboz', 'kréta']} head={['1', '2', '5']} vals={['40', '80', '?']} />,
    question: '1 dobozban 40 zsírkréta van. Hány zsírkréta van 5 dobozban?',
    options: ['200', '45', '160', '240'],
    correctAnswer: 0,
    explanation: '5 doboz 5-ször annyi, mint 1 doboz: 40 · 5 = 200.'
  },
  {
    id: 'mr-q5',
    level: 1,
    questionTypeBadge: 'Háromszoros tényező',
    figure: <ChangeFig a="2" b="70" p="140" a2="6" b2="70" opA="· 3" />,
    question: 'Tudjuk: 2 · 70 = 140. Mennyi 6 · 70?',
    options: ['420', '140', '280', '144'],
    correctAnswer: 0,
    explanation: 'A 6 a 2-nek a 3-szorosa. A szorzat is 3-szoros: 140 · 3 = 420.'
  },
  {
    id: 'mr-q6',
    level: 1,
    questionTypeBadge: 'Szabály',
    figure: <DotsFig r1={3} c1={4} r2={6} c2={4} />,
    question: 'Az egyik tényező 2-szeres lesz. Mi lesz a szorzattal?',
    options: ['2-szeres lesz', 'Nem változik', '2-vel nagyobb lesz', '4-szeres lesz'],
    correctAnswer: 0,
    explanation: 'Kétszer annyi sor kétszer annyi pötty: 3 · 4 = 12, 6 · 4 = 24. A szorzat 2-szeres lett.'
  },
  {
    id: 'mr-q7',
    level: 1,
    questionTypeBadge: 'Tízszeres tényező',
    question: 'Tudjuk: 7 · 3 = 21. Mennyi 7 · 30?',
    options: ['210', '21', '31', '73'],
    correctAnswer: 0,
    explanation: 'A 30 a 3-nak a 10-szerese. A szorzat is 10-szeres: 21 · 10 = 210.'
  },
  {
    id: 'mr-q8',
    level: 1,
    questionTypeBadge: 'Táblázat',
    figure: <TableFig labels={['sor', 'szék']} head={['1', '2', '4']} vals={['30', '60', '?']} />,
    question: 'Egy sorban 30 szék van. Hány szék van 4 sorban?',
    options: ['120', '34', '90', '64'],
    correctAnswer: 0,
    explanation: '4 sor 2-szer annyi, mint 2 sor: 60 · 2 = 120. Vagy: 30 · 4 = 120.'
  },
  {
    id: 'mr-q9',
    level: 1,
    questionTypeBadge: 'Nem változik',
    figure: <DotsFig r1={4} c1={6} r2={8} c2={3} />,
    question: 'Az egyik tényező 2-szeres lesz, a másikat 2-vel elosztjuk. Mi lesz a szorzattal?',
    options: ['Nem változik', '2-szeres lesz', '4-szeres lesz', '2-vel kisebb lesz'],
    correctAnswer: 0,
    explanation: '4 · 6 = 24 és 8 · 3 = 24. A kétszerezés és a 2-vel osztás kiegyenlíti egymást.'
  },
  {
    id: 'mr-q10',
    level: 1,
    questionTypeBadge: 'Következtetés',
    figure: <RatioFig l1="1 db" r1="9 Ft" l2="10 db" />,
    question: '1 matrica 9 Ft. Mennyibe kerül 10 matrica?',
    options: ['90 Ft', '19 Ft', '900 Ft', '10 Ft'],
    correctAnswer: 0,
    explanation: '10 matrica 10-szer annyiba kerül: 9 · 10 = 90 Ft.'
  },
  // ---------------------------- 2. szint ----------------------------
  {
    id: 'mr-q11',
    level: 2,
    questionTypeBadge: 'Egyenlő szorzatok',
    figure: <BoxesFig n={4} v="120" />,
    question: 'Melyik szorzat egyenlő ezzel: 120 · 4?',
    options: ['240 · 2', '120 · 2', '240 · 4', '60 · 2'],
    correctAnswer: 0,
    explanation: '120 · 2 = 240, és 4 : 2 = 2. Az egyik tényező 2-szeres, a másik 2-vel osztva: 240 · 2 = 480 = 120 · 4.'
  },
  {
    id: 'mr-q12',
    level: 2,
    questionTypeBadge: 'Egyenlő szorzatok',
    figure: <CardsFig items={['105 · 4', '210 · 2', '105 · 2', '210 · 4']} />,
    question: 'Melyik két szorzat egyenlő? Számolás nélkül gondolkodj!',
    options: ['105 · 4 és 210 · 2', '105 · 2 és 210 · 4', '105 · 4 és 210 · 4', '105 · 2 és 210 · 2'],
    correctAnswer: 0,
    explanation: 'A 210 a 105 kétszerese, a 2 pedig 4 : 2. Ezért ugyanannyi:105 · 4 = 420 és 210 · 2 = 420.'
  },
  {
    id: 'mr-q13',
    level: 2,
    questionTypeBadge: 'Táblázat',
    figure: <TableFig head={['·', '3', '6']} vals={['40', '120', '?']} />,
    question: 'Mi kerül a kérdőjel helyére a táblázatban?',
    options: ['240', '180', '160', '126'],
    correctAnswer: 0,
    explanation: 'A 6 a 3-nak a 2-szerese. A 120 is 2-szeres lesz: 120 · 2 = 240. (40 · 6 = 240.)'
  },
  {
    id: 'mr-q14',
    level: 2,
    questionTypeBadge: 'Következtetés',
    figure: <RatioFig l1="3 db" r1="270 Ft" l2="6 db" />,
    question: '3 mézeskalács 270 Ft. Mennyibe kerül 6 mézeskalács?',
    options: ['540 Ft', '273 Ft', '810 Ft', '276 Ft'],
    correctAnswer: 0,
    explanation: '6 = 3 · 2, tehát 2-szer annyit veszel. 2-szer annyit fizetsz: 270 · 2 = 540 Ft.'
  },
  {
    id: 'mr-q15',
    level: 2,
    questionTypeBadge: 'Következtetés',
    figure: <RatioFig l1="2 kosár" r1="150 alma" l2="6 kosár" />,
    question: '2 kosárban 150 alma van. Hány alma van 6 ugyanilyen kosárban?',
    options: ['450', '900', '300', '156'],
    correctAnswer: 0,
    explanation: '6 kosár 3-szor annyi, mint 2 kosár. Így 150 · 3 = 450 alma. (A 900 rossz: a 150 nem 1 kosár, hanem 2 kosár almája.)'
  },
  {
    id: 'mr-q16',
    level: 2,
    questionTypeBadge: 'Nem változik',
    figure: <ChangeFig a="25" b="8" p="200" a2="50" b2="4" opA="· 2" opB=": 2" />,
    question: 'Tudjuk: 25 · 8 = 200. Mennyi 50 · 4?',
    options: ['200', '400', '100', '800'],
    correctAnswer: 0,
    explanation: 'Az 50 a 25 kétszerese, a 4 a 8 : 2. Ez kiegyenlíti egymást: a szorzat marad 200.'
  },
  {
    id: 'mr-q17',
    level: 2,
    questionTypeBadge: 'Kétszeres tényező',
    question: 'Tudjuk: 9 · 40 = 360. Mennyi 9 · 80?',
    options: ['720', '360', '400', '640'],
    correctAnswer: 0,
    explanation: 'A 80 a 40-nek a 2-szerese. A szorzat is 2-szeres: 360 · 2 = 720.'
  },
  {
    id: 'mr-q18',
    level: 2,
    questionTypeBadge: 'Következtetés',
    figure: <ChangeFig a="2" b="□" p="160" a2="4" b2="□" opA="· 2" />,
    question: 'Egy szám 2-szerese 160. Mennyi a 4-szerese?',
    options: ['320', '80', '162', '640'],
    correctAnswer: 0,
    explanation: 'A 4 a 2-nek a 2-szerese. Így 160 · 2 = 320. (A szám 80, és 4 · 80 = 320.)'
  },
  {
    id: 'mr-q19',
    level: 2,
    questionTypeBadge: 'Nem változik',
    question: 'Tudjuk: 8 · 6 = 48. Mennyi 4 · 12?',
    options: ['48', '96', '24', '52'],
    correctAnswer: 0,
    explanation: 'A 4 a 8 : 2, a 12 a 6 · 2. A szorzat nem változik: 48.'
  },
  {
    id: 'mr-q20',
    level: 2,
    questionTypeBadge: 'Táblázat',
    figure: <TableFig labels={['lap', 'matrica']} head={['10', '20']} vals={['90', '?']} />,
    question: '10 lapon 90 matrica van. Hány matrica van 20 lapon?',
    options: ['180', '100', '110', '900'],
    correctAnswer: 0,
    explanation: '20 lap 2-szer annyi, mint 10 lap. A matrica is 2-szer annyi: 90 · 2 = 180.'
  },
  // ---------------------------- 3. szint ----------------------------
  {
    id: 'mr-q21',
    level: 3,
    questionTypeBadge: 'Következtetés',
    figure: <ChangeFig a="3" b="□" p="240" a2="6" b2="□" opA="· 2" />,
    question: 'Egy szám 3-szorosa 240. Mennyi a 6-szorosa?',
    options: ['480', '720', '243', '80'],
    correctAnswer: 0,
    explanation: 'A 6 a 3-nak a 2-szerese. Így 240 · 2 = 480. (A szám 80, és 6 · 80 = 480.)'
  },
  {
    id: 'mr-q22',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <RatioFig l1="4 db" r1="360 Ft" l2="8 db" />,
    question: '4 képeslap 360 Ft. Mennyivel kerül többe 8 képeslap, mint 4?',
    options: ['360 Ft', '720 Ft', '4 Ft', '180 Ft'],
    correctAnswer: 0,
    explanation: '8 = 4 · 2, ezért 8 képeslap 360 · 2 = 720 Ft. A különbség: 720 − 360 = 360 Ft.'
  },
  {
    id: 'mr-q23',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <RatioFig l1="2 kg" r1="260 Ft" l2="6 kg" />,
    question: '2 kg körte 260 Ft. 6 kg-ot veszel 1000 Ft-tal. Mennyit kapsz vissza?',
    options: ['220 Ft', '780 Ft', '480 Ft', '740 Ft'],
    correctAnswer: 0,
    explanation: '6 kg 3-szor annyi, mint 2 kg: 260 · 3 = 780 Ft. Visszajár: 1000 − 780 = 220 Ft.'
  },
  {
    id: 'mr-q24',
    level: 3,
    questionTypeBadge: 'Szabály',
    figure: <ChangeFig a="3" b="20" p="60" a2="6" b2="40" opA="· 2" opB="· 2" />,
    question: 'Mindkét tényező 2-szeres lett. Mi lett a szorzattal?',
    options: ['4-szeres lett', '2-szeres lett', 'Nem változott', '6-szoros lett'],
    correctAnswer: 0,
    explanation: '3 · 20 = 60, 6 · 40 = 240. A 240 a 60-nak a 4-szerese, mert 2 · 2 = 4.'
  },
  {
    id: 'mr-q25',
    level: 3,
    questionTypeBadge: 'Tényezők változtatása',
    question: '60 · 3 = 180. Melyik szorzásnál lesz a szorzat 2-szeres, vagyis 360?',
    options: ['120 · 3', '30 · 6', '62 · 3', '120 · 6'],
    correctAnswer: 0,
    explanation: 'Elég az egyik tényezőt 2-szeresére növelni: 120 · 3 = 360. A 30 · 6 ugyanannyi marad (180), a 120 · 6 már 4-szeres (720).'
  },
  {
    id: 'mr-q26',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'Egy lapon 20 bélyeg van. Hány bélyeg van 4 lapon és 8 lapon együtt?',
    options: ['240', '160', '80', '200'],
    correctAnswer: 0,
    explanation: '4 lapon 20 · 4 = 80. 8 lapon 2-szer annyi: 160. Együtt: 80 + 160 = 240.'
  },
  {
    id: 'mr-q27',
    level: 3,
    questionTypeBadge: 'Egyenlő szorzatok',
    question: 'Három szorzat egyenlő, egy nem. Melyik az?',
    options: ['210 · 3', '210 · 4', '420 · 2', '105 · 8'],
    correctAnswer: 0,
    explanation: '210 · 4, 420 · 2 és 105 · 8 mind 840 (egyik · 2, másik : 2). A 210 · 3 csak 630.'
  },
  {
    id: 'mr-q28',
    level: 3,
    questionTypeBadge: 'Következtetés',
    figure: <RatioFig l1="5 dkg" r1="150 Ft" l2="15 dkg" />,
    question: '5 dkg cukorka 150 Ft. Mennyibe kerül 15 dkg?',
    options: ['450 Ft', '165 Ft', '750 Ft', '300 Ft'],
    correctAnswer: 0,
    explanation: '15 dkg = 5 dkg · 3. 3-szor annyi cukorka, 3-szor annyi pénz: 150 · 3 = 450 Ft.'
  },
  {
    id: 'mr-q29',
    level: 3,
    questionTypeBadge: 'Következtetés',
    question: '3 · □ = 270. Mennyi 9 · □?',
    options: ['810', '540', '90', '279'],
    correctAnswer: 0,
    explanation: 'A 9 a 3-nak a 3-szorosa. Így 270 · 3 = 810. (□ = 90, és 9 · 90 = 810.)'
  },
  {
    id: 'mr-q30',
    level: 3,
    questionTypeBadge: 'Következtetés',
    question: 'Egy busz 4 fordulóban 180 utast visz, mindig ugyanannyit. Hány utast visz 12 fordulóban?',
    options: ['540', '720', '360', '192'],
    correctAnswer: 0,
    explanation: '12 = 4 · 3, tehát 3-szor annyi forduló. 180 · 3 = 540 utas.'
  }
];

export const MulRelationsG3Quiz: React.FC<{
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
      topicId="g3-wmul-osszefuggesek-quiz"
      subtopicId="osszefuggesek-kovetkeztetesek"
      title="4. Összefüggések, következtetések – Kvíz"
      subtitle="30 feladat 3 szinten: hogyan változik a szorzat, egyenlő szorzatok, következtetés."
      badge="3. OSZTÁLY • XIII. ÍRÁSBELI SZORZÁS • KVÍZ"
      questions={MUL_RELATIONS_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'A szorzat változása',
          items: ['Egyik tényező · 2 → szorzat · 2', 'Egyik tényező · 3 → szorzat · 3', 'Egyik tényező · 10 → szorzat · 10']
        },
        {
          title: 'Nem változik',
          items: ['Egyik · 2, másik : 2 → ugyanannyi', '120 · 4 = 240 · 2 = 480', 'Felcserélés: 6 · 70 = 70 · 6']
        },
        {
          title: 'Következtetés',
          items: ['Hányszor annyit veszel?', '2 db 180 Ft → 6 db: 180 · 3 = 540 Ft', 'Vigyázz: ne a darabszámmal szorozz!']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <MulRelationsG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <MulRelationsG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default MulRelationsG3Quiz;
