import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { NumberPropertiesMatcher } from './NumberPropertiesMatcher';
import { NumberPropertiesSorter } from './NumberPropertiesSorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek
// ---------------------------------------------------------------------------
const C_UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Halmazábra (2 és 5 többszörösei), a kérdéses rész „?”-lel jelölve. */
const QVenn: React.FC<{ mark: 'two' | 'five' | 'both' | 'none' | null; number?: string }> = ({ mark, number }) => {
  const pos = { five: [52, 104], both: [120, 96], two: [180, 80], none: [205, 140] } as const;
  return (
    <QFig h={number ? 174 : 160}>
      <rect x="8" y="8" width="224" height="144" rx="12" fill="#fed7aa" stroke="#ea580c" />
      <text x="120" y="22" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#9a3412">10 000-nél kisebb számok</text>
      <rect x="20" y="60" width="130" height="82" rx="10" fill="#c7d2fe" stroke="#3730a3" />
      <rect x="95" y="32" width="125" height="82" rx="10" fill="#bae6fd" stroke="#0369a1" opacity="0.9" />
      <rect x="95" y="60" width="55" height="54" fill="#86efac" stroke="#15803d" />
      <text x="26" y="136" fontSize="9" fontWeight="bold" fill="#3730a3">5 többszörösei</text>
      <text x="148" y="44" fontSize="9" fontWeight="bold" fill="#0369a1">2 többszörösei</text>
      {number && (
        <text x="120" y="166" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">Hová kerül {/^[15]/.test(number) ? 'az' : 'a'} {number}?</text>
      )}
      {mark && (
        <text x={pos[mark][0]} y={pos[mark][1]} textAnchor="middle" fontSize="20" fontWeight="bold" fill={C_UNK}>?</text>
      )}
    </QFig>
  );
};

/** Számsor kártyákon. */
const QNumbers: React.FC<{ nums: string[]; title: string }> = ({ nums, title }) => {
  const perRow = 4;
  const rows = Math.ceil(nums.length / perRow);
  return (
    <QFig h={34 + rows * 30}>
      <text x="120" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{title}</text>
      {nums.map((n, i) => (
        <g key={n + i}>
          <rect x={14 + (i % perRow) * 54} y={28 + Math.floor(i / perRow) * 30} width="50" height="24" rx="6" fill="#fff" stroke="#94a3b8" />
          <text x={39 + (i % perRow) * 54} y={45 + Math.floor(i / perRow) * 30} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">{n}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Ismétlődő színsorozat, a kérdéses elem „?”. */
const QSeq: React.FC<{ colors: string[]; shown: number; ask: number; shape: 'balloon' | 'bus' | 'boat' }> = ({ colors, shown, ask, shape }) => {
  const w = 200 / shown;
  return (
    <QFig h={110}>
      {Array.from({ length: shown }).map((_, i) => {
        const cx = 20 + i * w + w / 2 - 6;
        const c = colors[i % colors.length];
        return (
          <g key={i}>
            {shape === 'balloon' && <ellipse cx={cx} cy="40" rx="9" ry="12" fill={c} stroke="#334155" />}
            {shape === 'bus' && <rect x={cx - 11} y="30" width="22" height="16" rx="3" fill={c} stroke="#334155" />}
            {shape === 'boat' && <path d={`M ${cx} 26 L ${cx} 48 L ${cx + 11} 48 Z`} fill={c} stroke="#334155" />}
            <text x={cx} y="66" textAnchor="middle" fontSize="9" fill="#475569">{i + 1}.</text>
          </g>
        );
      })}
      <text x="120" y="92" textAnchor="middle" fontSize="13" fontWeight="bold" fill={C_UNK}>… {ask}. elem: ?</text>
    </QFig>
  );
};

/** Folyamatábra (munkafüzet II. 16. o.). */
const QFlow: React.FC<{ start: string }> = ({ start }) => (
  <QFig h={170}>
    <rect x="70" y="10" width="100" height="22" rx="11" fill="#dcfce7" stroke="#16a34a" />
    <text x="120" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#166534">START: {start}</text>
    <line x1="120" y1="32" x2="120" y2="42" stroke="#334155" />
    <rect x="60" y="42" width="120" height="22" rx="4" fill="#fff" stroke="#334155" />
    <text x="120" y="57" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">Szorozd meg 5-tel!</text>
    <line x1="120" y1="64" x2="120" y2="74" stroke="#334155" />
    <polygon points="120,74 170,94 120,114 70,94" fill="#fef9c3" stroke="#a16207" />
    <text x="120" y="98" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#713f12">Páros a szorzat?</text>
    <text x="210" y="80" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#15803d">igen</text>
    <line x1="170" y1="94" x2="186" y2="94" stroke="#334155" />
    <rect x="186" y="84" width="48" height="22" rx="4" fill="#fff" stroke="#334155" />
    <text x="210" y="99" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0f172a">: 10</text>
    <text x="30" y="80" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#b91c1c">nem</text>
    <line x1="70" y1="94" x2="54" y2="94" stroke="#334155" />
    <rect x="6" y="84" width="48" height="22" rx="4" fill="#fff" stroke="#334155" />
    <text x="30" y="99" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0f172a">· 2</text>
    <line x1="30" y1="106" x2="30" y2="140" stroke="#334155" />
    <line x1="210" y1="106" x2="210" y2="140" stroke="#334155" />
    <line x1="30" y1="140" x2="210" y2="140" stroke="#334155" />
    <rect x="80" y="130" width="80" height="22" rx="11" fill="#fee2e2" stroke={C_UNK} />
    <text x="120" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill={C_UNK}>CÉL: ?</text>
  </QFig>
);

/** Számkártyák. */
const QCards: React.FC<{ digits: string[]; note: string }> = ({ digits, note }) => (
  <QFig h={100}>
    {digits.map((d, i) => (
      <g key={i}>
        <rect x={22 + i * 42} y="14" width="34" height="42" rx="7" fill={['#fef3c7', '#dcfce7', '#e0f2fe', '#fce7f3', '#fef3c7'][i % 5]} stroke="#94a3b8" />
        <text x={39 + i * 42} y="43" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1e293b">{d}</text>
      </g>
    ))}
    <text x="120" y="80" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">{note}</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const NUMBER_PROPS_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'np-q1',
    level: 1,
    questionTypeBadge: '2 többszörösei',
    question: 'Melyik szám a 2 többszöröse?',
    options: ['7602', '4561', '2965', '2983'],
    correctAnswer: 0,
    explanation: 'A 2 többszörösei a páros számok: 0, 2, 4, 6 vagy 8 áll az egyesek helyén. A 7602 2-re végződik.'
  },
  {
    id: 'np-q2',
    level: 1,
    questionTypeBadge: '5 többszörösei',
    question: 'Melyik szám az 5 többszöröse?',
    options: ['1175', '4561', '7602', '5218'],
    correctAnswer: 0,
    explanation: 'Az 5 többszörösei 0-ra vagy 5-re végződnek. Az 1175 5-re végződik.'
  },
  {
    id: 'np-q3',
    level: 1,
    questionTypeBadge: '10 többszörösei',
    question: 'Melyik szám a 10 többszöröse?',
    options: ['4310', '2965', '7656', '4802'],
    correctAnswer: 0,
    explanation: 'A 10 többszörösei 0-ra végződnek. A 4310 ilyen. A 2965 csak az 5-nek többszöröse.'
  },
  {
    id: 'np-q4',
    level: 1,
    questionTypeBadge: 'Páros, páratlan',
    figure: <QNumbers title="Melyik páratlan?" nums={['5877', '9100', '3454', '5552']} />,
    question: 'Melyik szám páratlan?',
    options: ['5877', '9100', '3454', '5552'],
    correctAnswer: 0,
    explanation: 'Páratlan az a szám, amelynek az egyesek helyén 1, 3, 5, 7 vagy 9 áll. Az 5877 7-re végződik.'
  },
  {
    id: 'np-q5',
    level: 1,
    questionTypeBadge: 'Szabály',
    question: 'Miről ismered fel a 2 többszöröseit?',
    options: [
      'Az egyesek helyén 0, 2, 4, 6 vagy 8 áll.',
      'Az egyesek helyén 0 vagy 5 áll.',
      'Csak 0-ra végződnek.',
      'Az első számjegyük páros.'
    ],
    correctAnswer: 0,
    explanation: 'Mindig az utolsó (egyesek helyén álló) számjegyet kell nézni. Ha az páros (0, 2, 4, 6, 8), a szám a 2 többszöröse.'
  },
  {
    id: 'np-q6',
    level: 1,
    questionTypeBadge: 'Szabály',
    question: 'Miről ismered fel az 5 többszöröseit?',
    options: ['Az egyesek helyén 0 vagy 5 áll.', 'Az egyesek helyén csak 5 állhat.', 'A számjegyeik összege 5.', 'Az első számjegyük 5.'],
    correctAnswer: 0,
    explanation: 'Az 5 többszörösei: 5, 10, 15, 20, 25 … Mindig 0-ra vagy 5-re végződnek.'
  },
  {
    id: 'np-q7',
    level: 1,
    questionTypeBadge: '100 többszörösei',
    question: 'Melyik szám a 100 többszöröse?',
    options: ['9100', '9240', '4310', '1175'],
    correctAnswer: 0,
    explanation: 'A 100 többszörösei 00-ra végződnek. A 9100 ilyen, a 9240 csak a 10-nek többszöröse.'
  },
  {
    id: 'np-q8',
    level: 1,
    questionTypeBadge: 'Halmazábra',
    figure: <QVenn mark="both" />,
    question: 'Melyik szám kerülhet a halmazábra „?”-lel jelölt közös részébe?',
    options: ['8420', '7656', '2865', '5877'],
    correctAnswer: 0,
    explanation: 'A közös részbe a 2-nek és az 5-nek is többszörösei kerülnek, vagyis a 0-ra végződők. A 8420 ilyen.'
  },
  {
    id: 'np-q9',
    level: 1,
    questionTypeBadge: 'Hiányzó számjegy',
    question: 'Mely számjegyek kerülhetnek a □ helyére, hogy a 131□ az 5 többszöröse legyen?',
    options: ['0 vagy 5', 'csak 5', '0, 2, 4, 6, 8', 'bármelyik'],
    correctAnswer: 0,
    explanation: 'Az 5 többszörösei 0-ra vagy 5-re végződnek: 1310 és 1315.'
  },
  {
    id: 'np-q10',
    level: 1,
    questionTypeBadge: 'Sorozat',
    figure: <QSeq colors={['#ef4444', '#facc15']} shown={6} ask={11} shape="balloon" />,
    question: 'Piros, sárga, piros, sárga… léggömb követi egymást. Milyen színű a 11. léggömb?',
    options: ['piros', 'sárga', 'kék', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'A páratlan sorszámúak (1., 3., 5. …) pirosak, a párosak sárgák. A 11 páratlan, ezért a 11. léggömb piros.'
  },

  // ---------------------------- 2. szint ----------------------------
  {
    id: 'np-q11',
    level: 2,
    questionTypeBadge: 'Halmazábra',
    figure: <QVenn mark="five" />,
    question: 'Bence pontszáma az 5 többszöröse, de nem a 2-é (a „?” helye). Melyik lehet?',
    options: ['2965', '4310', '7602', '4561'],
    correctAnswer: 0,
    explanation: 'Az 5-re végződő számok az 5 többszörösei, de páratlanok. A 2965 ilyen. A 4310 a közös részbe kerülne.'
  },
  {
    id: 'np-q12',
    level: 2,
    questionTypeBadge: 'Halmazábra',
    question: 'Attila pontszáma a 2-nek és az 5-nek is többszöröse. Melyik lehet?',
    options: ['3990', '6755', '5552', '7329'],
    correctAnswer: 0,
    explanation: 'A 2-nek és az 5-nek is csak a 0-ra végződő számok többszörösei. A 3990 ilyen.'
  },
  {
    id: 'np-q13',
    level: 2,
    questionTypeBadge: 'Igaz vagy hamis',
    question: 'Melyik állítás HAMIS?',
    options: [
      'Nincs a 2 többszörösei között olyan szám, amely az 5-nek is többszöröse.',
      'Minden páros szám többszöröse a 2-nek.',
      'Nincs olyan páratlan szám, amely a 2 többszöröse.',
      'Ha egy szám 0-ra végződik, többszöröse a 2-nek, az 5-nek és a 10-nek is.'
    ],
    correctAnswer: 0,
    explanation: 'Van ilyen szám: például a 4310 vagy a 10 a 2-nek és az 5-nek is többszöröse. Ezért az első állítás hamis.'
  },
  {
    id: 'np-q14',
    level: 2,
    questionTypeBadge: '2 többszörösei',
    figure: <QNumbers title="Hány 2 többszöröse van köztük?" nums={['1240', '4543', '1422', '3486', '4304', '5311', '10 000', '1350']} />,
    question: 'Hány szám a 2 többszöröse ezek közül: 1240, 4543, 1422, 3486, 4304, 5311, 10 000, 1350?',
    options: ['6', '5', '7', '4'],
    correctAnswer: 0,
    explanation: 'Párosak: 1240, 1422, 3486, 4304, 10 000, 1350 – ez 6 szám. A 4543 és az 5311 páratlan.'
  },
  {
    id: 'np-q15',
    level: 2,
    questionTypeBadge: '4 többszörösei',
    question: 'Melyik szám a 4 többszöröse? (Oszd el 4-gyel!)',
    options: ['4304', '1422', '3486', '1350'],
    correctAnswer: 0,
    explanation: '4304 : 4 = 1076, nem marad semmi. A többinél marad 2: 1422 : 4 = 355, marad 2; 3486 : 4 = 871, marad 2; 1350 : 4 = 337, marad 2.'
  },
  {
    id: 'np-q16',
    level: 2,
    questionTypeBadge: 'Igaz vagy hamis',
    question: 'Melyik állítás IGAZ?',
    options: [
      'A 4 többszörösei a 2-nek is többszörösei.',
      'Minden páros szám a 4 többszöröse.',
      'Van olyan páratlan szám, amely a 4 többszöröse.',
      'Nincs olyan páros szám, amely a 4 többszöröse.'
    ],
    correctAnswer: 0,
    explanation: 'A 4 többszörösei (4, 8, 12, 16 …) mind párosak, tehát a 2-nek is többszörösei. De pl. a 6 páros, mégsem a 4 többszöröse.'
  },
  {
    id: 'np-q17',
    level: 2,
    questionTypeBadge: 'Halmazábra',
    figure: <QVenn mark={null} number="1975" />,
    question: 'Hová kerül az 1975 a halmazábrán?',
    options: ['Csak az 5 többszörösei közé', 'Csak a 2 többszörösei közé', 'A közös részbe', 'Egyik halmazba sem'],
    correctAnswer: 0,
    explanation: 'Az 1975 5-re végződik: az 5 többszöröse, de páratlan, így a 2-nek nem többszöröse.'
  },
  {
    id: 'np-q18',
    level: 2,
    questionTypeBadge: 'Számkártyák',
    figure: <QCards digits={['0', '5', '3', '4', '0']} note="Négyjegyű szám, a 10 többszöröse" />,
    question: 'Melyik a legnagyobb négyjegyű szám ezekből a kártyákból, amely a 10 többszöröse?',
    options: ['5430', '5403', '5340', '5300'],
    correctAnswer: 0,
    explanation: 'A végére 0 kell. Az elejére a legnagyobb számjegyeket tesszük: 5, 4, 3, és a végére 0 → 5430.'
  },
  {
    id: 'np-q19',
    level: 2,
    questionTypeBadge: 'Hőlégballon',
    question: 'Melyik számjegy írható az A helyére, hogy a 326 + 121A összege a 2 többszöröse legyen?',
    options: ['4', '3', '5', '7'],
    correctAnswer: 0,
    explanation: '326 + 1214 = 1540, ez páros. A páratlan számjegyekkel (3, 5, 7) páratlan összeg jönne ki, pl. 326 + 1213 = 1539.'
  },
  {
    id: 'np-q20',
    level: 2,
    questionTypeBadge: 'Folyamatábra',
    figure: <QFlow start="857" />,
    question: 'Számolj a folyamatábra szerint! Mi lesz a kapott szám, ha 857-ből indulsz?',
    options: ['8570', '4285', '857', '428'],
    correctAnswer: 0,
    explanation: '857 · 5 = 4285. Ez páratlan (5-re végződik), ezért a „nem” ágon megyünk: 4285 · 2 = 8570.'
  },

  // ---------------------------- 3. szint ----------------------------
  {
    id: 'np-q21',
    level: 3,
    questionTypeBadge: 'Folyamatábra',
    figure: <QFlow start="1846" />,
    question: 'Számolj a folyamatábra szerint! Mi lesz a kapott szám, ha 1846-ból indulsz?',
    options: ['923', '9230', '18 460', '3692'],
    correctAnswer: 0,
    explanation: '1846 · 5 = 9230. Ez páros, ezért az „igen” ágon osztunk 10-zel: 9230 : 10 = 923.'
  },
  {
    id: 'np-q22',
    level: 3,
    questionTypeBadge: 'Maradék',
    question: 'A kék túraúton azok mentek, akiknél az osztás maradéka 0. Ki ment a kék úton?',
    options: ['Zoli: 4812 : 2', 'Misi: 7642 : 4', 'Évi: 5759 : 8', 'Beni: 1273 : 6'],
    correctAnswer: 0,
    explanation: '4812 páros, ezért 2-vel osztva 0 a maradék. Misinél 2, Évinél 7, Beninél 1 a maradék.'
  },
  {
    id: 'np-q23',
    level: 3,
    questionTypeBadge: 'Sorozat',
    figure: <QSeq colors={['#2563eb', '#dc2626', '#eab308']} shown={6} ask={28} shape="bus" />,
    question: 'Kék, piros, sárga busz ismétlődik ebben a sorrendben. Milyen színű a 28. busz?',
    options: ['kék', 'piros', 'sárga', 'zöld'],
    correctAnswer: 0,
    explanation: '3 busz ismétlődik. 28 : 3 = 9, marad 1. Az 1-es maradék az első színt jelenti: kék.'
  },
  {
    id: 'np-q24',
    level: 3,
    questionTypeBadge: 'Sorozat',
    figure: <QSeq colors={['#ef4444', '#2563eb', '#facc15', '#16a34a']} shown={8} ask={31} shape="boat" />,
    question: 'Piros, kék, sárga, zöld vitorlás ismétlődik. Milyen színű a 31. vitorlás?',
    options: ['sárga', 'kék', 'zöld', 'piros'],
    correctAnswer: 0,
    explanation: '4 vitorlás ismétlődik. 31 : 4 = 7, marad 3. A 3-as maradék a harmadik színt jelenti: sárga.'
  },
  {
    id: 'np-q25',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    question: 'Gondoltam egy számot: 3000 és 3100 között van, a 10 többszöröse, és a számjegyeinek összege 10. Melyik ez?',
    options: ['3070', '3060', '3700', '3075'],
    correctAnswer: 0,
    explanation: '0-ra kell végződnie, és 30□0 alakú. 3 + 0 + □ + 0 = 10, tehát □ = 7: a szám 3070.'
  },
  {
    id: 'np-q26',
    level: 3,
    questionTypeBadge: '5 többszörösei',
    question: 'Hány 5 többszöröse van 1 és 100 között (az 1-et és a 100-at is beleszámítva)?',
    options: ['20', '10', '19', '50'],
    correctAnswer: 0,
    explanation: '5, 10, 15, … 100. Minden tízesben kettő van (pl. 5 és 10), 10 tízesben 2 · 10 = 20.'
  },
  {
    id: 'np-q27',
    level: 3,
    questionTypeBadge: 'Igaz vagy hamis',
    question: 'Ha egy szám a 10 többszöröse, akkor biztosan…',
    options: ['a 2-nek és az 5-nek is többszöröse.', 'a 100-nak is többszöröse.', 'páratlan.', 'csak az 5-nek többszöröse.'],
    correctAnswer: 0,
    explanation: 'A 10 többszörösei 0-ra végződnek, ezért párosak (2 többszörösei) és az 5-nek is többszörösei. A 100-nak nem mindig: pl. a 4310 nem.'
  },
  {
    id: 'np-q28',
    level: 3,
    questionTypeBadge: 'Halmazábra',
    figure: <QVenn mark="two" />,
    question: 'Melyik szám kerül a „?” helyére: a 2 többszöröse, de NEM az 5 többszöröse?',
    options: ['9428', '3620', '6000', '1975'],
    correctAnswer: 0,
    explanation: 'A 9428 páros, de 8-ra végződik, ezért az 5-nek nem többszöröse. A 3620 és a 6000 a közös részbe, az 1975 az 5 többszörösei közé kerül.'
  },
  {
    id: 'np-q29',
    level: 3,
    questionTypeBadge: 'Hőlégballon',
    question: 'Melyik számjegy írható a D helyére, hogy a 2457 − 135D különbsége a 2 többszöröse legyen?',
    options: ['1', '0', '2', '4'],
    correctAnswer: 0,
    explanation: '2457 − 1351 = 1106, ez páros. Páratlanból páratlant kivonva páros lesz. 0, 2, 4 esetén páratlan jönne ki: 1107, 1105, 1103.'
  },
  {
    id: 'np-q30',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    figure: <QCards digits={['0', '5', '3', '4', '0']} note="Kétjegyű számok: 2 és 5 többszörösei" />,
    question: 'A 0, 5, 3, 4, 0 kártyákból kétjegyű számokat raksz ki. Melyek kerülnek a 2 és az 5 többszöröseinek közös részébe?',
    options: ['30, 40, 50', '30, 40, 50, 35, 45', '35, 45, 53', '34, 54, 30'],
    correctAnswer: 0,
    explanation: 'A közös részbe a 0-ra végződő számok kerülnek. 0-val nem kezdődhet szám, ezért: 30, 40, 50.'
  }
];

export const NumberPropertiesQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId="g4-wops-szamok-tulajdonsagai-quiz"
      subtopicId="a-szamok-tulajdonsagai"
      title="4. A számok tulajdonságai – Kvíz"
      subtitle="30 feladat 3 szinten: páros és páratlan számok, a 2, 5, 10, 100 többszörösei, halmazábra, sorozatok."
      badge="4. OSZTÁLY • III. ÍRÁSBELI MŰVELETEK • KVÍZ"
      questions={NUMBER_PROPS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Mire végződik?',
          items: [
            '2 többszöröse (páros): 0, 2, 4, 6, 8',
            'Páratlan: 1, 3, 5, 7, 9',
            '5 többszöröse: 0 vagy 5',
            '10 többszöröse: 0 · 100 többszöröse: 00'
          ]
        },
        {
          title: 'Halmazábra',
          items: [
            'Közös rész (2 és 5 többszöröse) = 10 többszörösei',
            'Csak 5 többszöröse: 5-re végződik',
            'Csak 2 többszöröse: 2, 4, 6, 8-ra végződik',
            'Egyikbe sem: 1, 3, 7, 9-re végződik'
          ]
        },
        {
          title: '4 többszörösei és sorozatok',
          items: [
            '4 többszöröse: 4-gyel osztva 0 a maradék',
            'A 4 többszörösei mind párosak.',
            'Ismétlődő sorozat: oszd el a sorszámot az ismétlődő elemek számával!',
            'A maradék mutatja a színt (0 maradék = az utolsó elem).'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <NumberPropertiesMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <NumberPropertiesSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default NumberPropertiesQuiz;
