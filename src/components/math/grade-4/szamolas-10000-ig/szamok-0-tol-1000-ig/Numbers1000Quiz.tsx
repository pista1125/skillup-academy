import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Numbers1000Matcher } from './Numbers1000Matcher';
import { Numbers1000Sorter } from './Numbers1000Sorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – kis belső SVG-segédek (nem exportált)
// ---------------------------------------------------------------------------
const C_SZ = '#dc2626';
const C_T = '#0ea5e9';
const C_E = '#eab308';
const C_UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Golyós számológép: piros = 100, kék = 10, sárga = 1. */
const QAbacus: React.FC<{ sz: number; t: number; e: number }> = ({ sz, t, e }) => {
  const rods = [
    { x: 60, n: sz, c: C_SZ, l: '100' },
    { x: 120, n: t, c: C_T, l: '10' },
    { x: 180, n: e, c: C_E, l: '1' }
  ];
  return (
    <QFig>
      {rods.map((r) => (
        <g key={r.x}>
          <line x1={r.x} y1="12" x2={r.x} y2="122" stroke="#1e3a8a" strokeWidth="2.5" />
          {Array.from({ length: r.n }).map((_, i) => (
            <circle key={i} cx={r.x} cy={116 - i * 11} r="5" fill={r.c} stroke="#0f172a" strokeWidth="0.6" />
          ))}
          <text x={r.x} y="140" textAnchor="middle" fontSize="11" fontWeight="bold" fill={r.c}>
            {r.l}
          </text>
        </g>
      ))}
      <rect x="30" y="122" width="180" height="5" rx="2" fill="#1e3a8a" />
      <text x="225" y="70" textAnchor="middle" fontSize="18" fontWeight="bold" fill={C_UNK}>?</text>
    </QFig>
  );
};

/** Számegyenes from–to, minor lépésköz, címkék; a jelölt pontok felirata lehet „?”. */
const QLine: React.FC<{
  from: number;
  to: number;
  minor: number;
  labels: number[];
  marks: { v: number; t: string }[];
}> = ({ from, to, minor, labels, marks }) => {
  const x0 = 18;
  const x1 = 214;
  const sx = (v: number) => x0 + ((x1 - x0) * (v - from)) / (to - from);
  const n = Math.round((to - from) / minor);
  return (
    <QFig h={100}>
      <line x1={x0} y1="55" x2={x1 + 10} y2="55" stroke="#0f172a" strokeWidth="1.8" />
      <polygon points={`${x1 + 14},55 ${x1 + 7},51 ${x1 + 7},59`} fill="#0f172a" />
      {Array.from({ length: n + 1 }).map((_, i) => {
        const v = from + i * minor;
        const big = labels.includes(v);
        return <line key={i} x1={sx(v)} x2={sx(v)} y1={big ? 47 : 51} y2={big ? 63 : 59} stroke="#334155" strokeWidth={big ? 1.4 : 0.7} />;
      })}
      {labels.map((v) => (
        <text key={v} x={sx(v)} y="78" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">
          {v}
        </text>
      ))}
      {marks.map((m) => (
        <g key={m.v}>
          <circle cx={sx(m.v)} cy="55" r="4.5" fill={m.t.includes('?') ? C_UNK : '#7c3aed'} />
          <text x={sx(m.v)} y="35" textAnchor="middle" fontSize="13" fontWeight="bold" fill={m.t.includes('?') ? C_UNK : '#7c3aed'}>
            {m.t}
          </text>
        </g>
      ))}
    </QFig>
  );
};

/** Pénz: bankjegyek és érmék (Ft). */
const QMoney: React.FC<{ items: number[] }> = ({ items }) => {
  let x = 12;
  return (
    <QFig h={110}>
      {items.map((v, i) => {
        const isNote = v >= 500;
        const w = isNote ? 66 : 30;
        const el = isNote ? (
          <g key={i}>
            <rect x={x} y="28" width="62" height="34" rx="4" fill="#fecaca" stroke="#b91c1c" strokeWidth="1.2" />
            <text x={x + 31} y="50" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7f1d1d">
              {v} Ft
            </text>
          </g>
        ) : (
          <g key={i}>
            <circle cx={x + 14} cy="45" r="13" fill={v >= 100 ? '#e5e7eb' : '#fde68a'} stroke={v >= 100 ? '#6b7280' : '#b45309'} strokeWidth="1.5" />
            <text x={x + 14} y="49" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">
              {v}
            </text>
          </g>
        );
        x += w;
        return el;
      })}
      <text x="120" y="92" textAnchor="middle" fontSize="13" fontWeight="bold" fill={C_UNK}>
        Összesen: ? Ft
      </text>
    </QFig>
  );
};

/** Dobozok sorban (számsorozat vagy számkártyák). */
const QBoxes: React.FC<{ items: string[]; caption?: string }> = ({ items, caption }) => {
  const w = Math.min(44, 216 / items.length - 4);
  const total = items.length * (w + 4) - 4;
  const start = 120 - total / 2;
  return (
    <QFig h={caption ? 100 : 80}>
      {items.map((t, i) => (
        <g key={i}>
          <rect
            x={start + i * (w + 4)}
            y="22"
            width={w}
            height="34"
            rx="6"
            fill={t.includes('?') ? '#fee2e2' : '#e0f2fe'}
            stroke={t.includes('?') ? C_UNK : '#0369a1'}
            strokeWidth="1.5"
          />
          <text x={start + i * (w + 4) + w / 2} y="44" textAnchor="middle" fontSize={w < 36 ? 11 : 13} fontWeight="bold" fill={t.includes('?') ? C_UNK : '#0f172a'}>
            {t}
          </text>
        </g>
      ))}
      {caption && (
        <text x="120" y="82" textAnchor="middle" fontSize="11" fill="#334155">
          {caption}
        </text>
      )}
    </QFig>
  );
};

/** Zsebkendők: 100-as doboz, 10-es csomag, darab. */
const QTissue: React.FC<{ boxes: number; packs: number; singles: number }> = ({ boxes, packs, singles }) => (
  <QFig h={120}>
    {Array.from({ length: boxes }).map((_, i) => (
      <g key={`b${i}`}>
        <rect x="12" y={14 + i * 32} width="56" height="28" rx="4" fill="#60a5fa" stroke="#1e3a8a" />
        <text x="40" y={32 + i * 32} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff">100 db</text>
      </g>
    ))}
    {Array.from({ length: packs }).map((_, i) => (
      <g key={`p${i}`}>
        <rect x={80 + (i % 4) * 22} y={18 + Math.floor(i / 4) * 34} width="18" height="28" rx="3" fill="#93c5fd" stroke="#1e3a8a" />
        <text x={89 + (i % 4) * 22} y={36 + Math.floor(i / 4) * 34} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1e3a8a">10</text>
      </g>
    ))}
    {Array.from({ length: singles }).map((_, i) => (
      <rect key={`s${i}`} x={178 + (i % 4) * 13} y={22 + Math.floor(i / 4) * 13} width="10" height="10" rx="2" fill="#fff" stroke="#64748b" />
    ))}
    <text x="120" y="110" textAnchor="middle" fontSize="12" fontWeight="bold" fill={C_UNK}>Hány zsebkendő? ?</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const NUMBERS_1000_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'n1000-q1',
    level: 1,
    questionTypeBadge: 'Golyós számológép',
    figure: <QAbacus sz={3} t={4} e={6} />,
    question: 'Melyik számot raktuk ki? A piros golyó 100-at, a kék 10-et, a sárga 1-et ér.',
    options: ['346', '643', '364', '13'],
    correctAnswer: 0,
    explanation: '3 piros golyó = 300, 4 kék = 40, 6 sárga = 6. Együtt: 300 + 40 + 6 = 346.'
  },
  {
    id: 'n1000-q2',
    level: 1,
    questionTypeBadge: 'Helyi érték',
    question: 'Melyik számjegy áll a tízesek helyén az 582-ben?',
    options: ['8', '5', '2', '80'],
    correctAnswer: 0,
    explanation: 'Jobbról az első hely az egyeseké (2), a második a tízeseké (8), a harmadik a százasoké (5).'
  },
  {
    id: 'n1000-q3',
    level: 1,
    questionTypeBadge: 'Valódi érték',
    question: 'Mennyi a 7-es számjegy valódi értéke a 274-ben?',
    options: ['70', '7', '700', '4'],
    correctAnswer: 0,
    explanation: 'A 7-es a tízesek helyén áll, ezért 7 tízest, azaz 70-et ér. Az alaki értéke 7.'
  },
  {
    id: 'n1000-q4',
    level: 1,
    questionTypeBadge: 'Szám betűvel',
    question: 'Melyik szám a „hatszáznegyvenegy”?',
    options: ['641', '614', '461', '6401'],
    correctAnswer: 0,
    explanation: 'Hatszáz = 600, negyven = 40, egy = 1. 600 + 40 + 1 = 641.'
  },
  {
    id: 'n1000-q5',
    level: 1,
    questionTypeBadge: 'Csomagok',
    figure: <QTissue boxes={2} packs={3} singles={4} />,
    question: 'Egy dobozban 100, egy csomagban 10 zsebkendő van. Hány zsebkendő van a képen?',
    options: ['234', '9', '324', '2340'],
    correctAnswer: 0,
    explanation: '2 doboz = 200, 3 csomag = 30, 4 darab = 4. Együtt 234 zsebkendő.'
  },
  {
    id: 'n1000-q6',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <QLine from={0} to={100} minor={10} labels={[0, 50, 100]} marks={[{ v: 70, t: '?' }]} />,
    question: 'Melyik szám helyét jelöli a kérdőjel a számegyenesen?',
    options: ['70', '60', '80', '7'],
    correctAnswer: 0,
    explanation: 'Egy kis beosztás 10-et ér. Az 50-től még 2 lépés jobbra: 50, 60, 70.'
  },
  {
    id: 'n1000-q7',
    level: 1,
    questionTypeBadge: 'Számszomszéd',
    question: 'Melyik a 459 nagyobb egyes szomszédja?',
    options: ['460', '458', '450', '469'],
    correctAnswer: 0,
    explanation: 'A nagyobb egyes szomszéd 1-gyel nagyobb: 459 + 1 = 460.'
  },
  {
    id: 'n1000-q8',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a legnagyobb szám?',
    options: ['790', '709', '779', '97'],
    correctAnswer: 0,
    explanation: 'Mindhárom háromjegyű szám 7 százassal kezdődik. A tízeseket hasonlítjuk: a 790-ben 9 tízes van, ez a legtöbb.'
  },
  {
    id: 'n1000-q9',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <QMoney items={[500, 100, 100, 50, 10, 10]} />,
    question: 'Mennyi pénz van a pénztárcában?',
    options: ['770 Ft', '6 Ft', '750 Ft', '720 Ft'],
    correctAnswer: 0,
    explanation: 'Kezdd a legnagyobbal: 500 + 100 + 100 = 700, majd + 50 = 750, + 10 + 10 = 770 Ft.'
  },
  {
    id: 'n1000-q10',
    level: 1,
    questionTypeBadge: 'Sorozat',
    figure: <QBoxes items={['96', '106', '116', '?']} caption="tízesével növekvő sorozat" />,
    question: 'A sorozat 96-tól tízesével nő. Melyik szám jön a kérdőjel helyére?',
    options: ['126', '117', '120', '136'],
    correctAnswer: 0,
    explanation: 'Mindig 10-et adunk hozzá: 116 + 10 = 126.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'n1000-q11',
    level: 2,
    questionTypeBadge: 'Helyi érték',
    question: 'Melyik szám áll 9 százasból és 4 egyesből?',
    options: ['904', '94', '940', '9004'],
    correctAnswer: 0,
    explanation: 'Nincs tízes, ezért a tízesek helyére 0 kerül: 9 százas, 0 tízes, 4 egyes = 904.'
  },
  {
    id: 'n1000-q12',
    level: 2,
    questionTypeBadge: 'Kerekítés',
    figure: <QLine from={590} to={600} minor={1} labels={[590, 600]} marks={[{ v: 595, t: '595' }]} />,
    question: 'Mennyi a 595 tízesre kerekített értéke?',
    options: ['600', '590', '500', '610'],
    correctAnswer: 0,
    explanation: 'A 595 pont középen van az 590 és a 600 között. Ilyenkor a nagyobb tízes szomszédra kerekítünk: 595 ≈ 600.'
  },
  {
    id: 'n1000-q13',
    level: 2,
    questionTypeBadge: 'Kerekítés',
    question: 'Mennyi a 950 százasra kerekített értéke?',
    options: ['1000', '900', '950', '960'],
    correctAnswer: 0,
    explanation: 'A 950 pont középen van a 900 és az 1000 között, ezért a nagyobb százasra kerekítünk: 950 ≈ 1000.'
  },
  {
    id: 'n1000-q14',
    level: 2,
    questionTypeBadge: 'Számszomszéd',
    question: 'Melyik a 372 kisebb tízes szomszédja?',
    options: ['370', '360', '380', '371'],
    correctAnswer: 0,
    explanation: 'A 372 a 370 és a 380 között van. A kisebb tízes szomszéd a 370. (A 371 a kisebb egyes szomszéd.)'
  },
  {
    id: 'n1000-q15',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <QLine from={600} to={700} minor={10} labels={[600, 700]} marks={[{ v: 640, t: '?' }]} />,
    question: 'Melyik szám helyét jelöli a kérdőjel?',
    options: ['640', '604', '650', '660'],
    correctAnswer: 0,
    explanation: 'Egy kis lépés 10. A 600-tól 4 lépést tettünk jobbra: 610, 620, 630, 640.'
  },
  {
    id: 'n1000-q16',
    level: 2,
    questionTypeBadge: 'Golyós számológép',
    figure: <QAbacus sz={4} t={0} e={7} />,
    question: 'Melyik számot mutatja a golyós számológép?',
    options: ['407', '47', '470', '704'],
    correctAnswer: 0,
    explanation: '4 piros = 400, kék golyó nincs, ezért a tízesek helyére 0 kerül, 7 sárga = 7. A szám: 407.'
  },
  {
    id: 'n1000-q17',
    level: 2,
    questionTypeBadge: 'Nyitott mondat',
    figure: <QLine from={443} to={450} minor={1} labels={[445, 448]} marks={[]} />,
    question: 'Mely számok teszik igazzá a nyitott mondatot? 445 < □ < 448',
    options: ['446 és 447', '445, 446, 447 és 448', '446, 447 és 448', 'csak a 447'],
    correctAnswer: 0,
    explanation: 'A 445-nél nagyobb, de 448-nál kisebb számok kellenek. A 445 és a 448 nem jó, mert azok egyenlők a határokkal.'
  },
  {
    id: 'n1000-q18',
    level: 2,
    questionTypeBadge: 'Bontás',
    question: 'Hogyan bonthatjuk fel a 641-et százasok, tízesek és egyesek összegére?',
    options: ['600 + 40 + 1', '6 + 4 + 1', '60 + 40 + 1', '600 + 4 + 10'],
    correctAnswer: 0,
    explanation: '6 százas = 600, 4 tízes = 40, 1 egyes = 1. Tehát 641 = 600 + 40 + 1.'
  },
  {
    id: 'n1000-q19',
    level: 2,
    questionTypeBadge: 'Helyi érték',
    question: 'Mennyi 24 tízes és 8 egyes értéke?',
    options: ['248', '2408', '32', '284'],
    correctAnswer: 0,
    explanation: '24 tízes = 240. Hozzáadjuk a 8 egyest: 240 + 8 = 248.'
  },
  {
    id: 'n1000-q20',
    level: 2,
    questionTypeBadge: 'Kerekítés',
    figure: <QLine from={200} to={300} minor={10} labels={[200, 300]} marks={[{ v: 250, t: '250' }]} />,
    question: 'Mennyi a 250 százasra kerekített értéke?',
    options: ['300', '200', '250', '350'],
    correctAnswer: 0,
    explanation: 'A 250 pont a 200 és a 300 közepén van. Középen a nagyobb százasra kerekítünk: 250 ≈ 300.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'n1000-q21',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    figure: <QBoxes items={['9', '7', '0', '8']} caption="Mindegyik kártyát legfeljebb egyszer használhatod." />,
    question: 'Melyik a legnagyobb háromjegyű szám, amit ezekből a kártyákból kirakhatsz?',
    options: ['987', '978', '908', '9870'],
    correctAnswer: 0,
    explanation: 'A legnagyobb számjegyet tesszük a százasok helyére (9), aztán a következőt (8), végül a 7-et: 987.'
  },
  {
    id: 'n1000-q22',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    figure: <QBoxes items={['9', '7', '0', '8']} caption="Mindegyik kártyát legfeljebb egyszer használhatod." />,
    question: 'Melyik a legkisebb háromjegyű szám, amit ezekből a kártyákból kirakhatsz?',
    options: ['708', '78', '780', '789'],
    correctAnswer: 0,
    explanation: 'A 0 nem állhat a szám elején, mert akkor nem háromjegyű lenne. Elöl a 7, utána a 0, végül a 8: 708.'
  },
  {
    id: 'n1000-q23',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    question:
      'Az úszóverseny győztese mondja: „Rajtszámom háromjegyű. A százasok helyén álló számjegy valódi értéke 600, a tízesek helyén a legnagyobb számjegy áll. A számjegyek összege 20.” Mi a rajtszáma?',
    options: ['695', '659', '690', '596'],
    correctAnswer: 0,
    explanation: 'A szám 6-tal kezdődik, a tízesek helyén 9 áll. 6 + 9 = 15, az összeg 20, tehát még 5 kell: 695.'
  },
  {
    id: 'n1000-q24',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    question:
      'A kerékpáros rajtszáma háromjegyű kerek tízes. A tízesek helyén 6 áll, a százasok helyén ennek a fele. Mi a rajtszáma?',
    options: ['360', '630', '306', '36'],
    correctAnswer: 0,
    explanation: 'Kerek tízes, tehát 0-ra végződik. Tízesek: 6, százasok: 6 fele = 3. A szám: 360.'
  },
  {
    id: 'n1000-q25',
    level: 3,
    questionTypeBadge: 'Kerekítés',
    question: 'Melyik a legnagyobb szám, amelynek százasra kerekített értéke 300?',
    options: ['349', '350', '399', '300'],
    correctAnswer: 0,
    explanation: 'A 350-et már 400-ra kerekítjük (középen a nagyobbhoz). Az utolsó szám, amely még 300-ra kerekedik: 349.'
  },
  {
    id: 'n1000-q26',
    level: 3,
    questionTypeBadge: 'Kerekítés',
    figure: <QLine from={250} to={270} minor={1} labels={[250, 260, 270]} marks={[]} />,
    question: 'Melyik a legkisebb szám, amelynek tízesre kerekített értéke 260?',
    options: ['255', '251', '256', '260'],
    correctAnswer: 0,
    explanation: 'A 255 pont középen van a 250 és a 260 között, ezért 260-ra kerekítjük. A 254 még 250-re kerekedik. Tehát a legkisebb a 255.'
  },
  {
    id: 'n1000-q27',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question:
      'Az iskolába színes papír érkezett: 4 darab 100 lapos doboz, 3 darab 10 lapos köteg és még 35 különálló lap. Hány lap érkezett összesen?',
    options: ['465', '435', '42', '475'],
    correctAnswer: 0,
    explanation: '4 doboz = 400, 3 köteg = 30, plusz 35 lap. 400 + 30 + 35 = 465.'
  },
  {
    id: 'n1000-q28',
    level: 3,
    questionTypeBadge: 'Sorozat',
    figure: <QBoxes items={['820', '750', '680', '?']} caption="hetvenesével csökkenő sorozat" />,
    question: 'A sorozat 820-tól hetvenesével csökken. Melyik szám jön a kérdőjel helyére?',
    options: ['610', '620', '600', '540'],
    correctAnswer: 0,
    explanation: 'Mindig 70-et veszünk el: 680 − 70 = 610.'
  },
  {
    id: 'n1000-q29',
    level: 3,
    questionTypeBadge: 'Sorozat szabálya',
    figure: <QBoxes items={['10', '30', '90', '?', '810']} />,
    question: 'Fedezd fel a sorozat szabályát! Melyik szám kerül a kérdőjel helyére?',
    options: ['270', '150', '180', '120'],
    correctAnswer: 0,
    explanation: 'Minden szám az előző háromszorosa: 10 · 3 = 30, 30 · 3 = 90, 90 · 3 = 270, 270 · 3 = 810.'
  },
  {
    id: 'n1000-q30',
    level: 3,
    questionTypeBadge: 'Logika',
    figure: <QBoxes items={['354', '228', '174', '232', '451', '333']} />,
    question:
      'Melyik rajtszám nyerte a főnyereményt? 200-nál nagyobb, vannak azonos számjegyei, páros, és számjegyeinek összege 10-nél több.',
    options: ['228', '232', '333', '354'],
    correctAnswer: 0,
    explanation: 'A 232 számjegyeinek összege csak 7. A 333 páratlan. A 354-ben nincs két egyforma számjegy. A 228 mindennek megfelel: 2 + 2 + 8 = 12.'
  }
];

export const Numbers1000Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId="g4-count-szamok-1000-quiz"
      subtopicId="szamok-0-tol-1000-ig"
      title="1. Számok 0-tól 1000-ig – Kvíz"
      subtitle="30 feladat 3 szinten: helyi érték, számegyenes, számszomszédok, kerekítés és fejtörők."
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • KVÍZ"
      questions={NUMBERS_1000_QUESTIONS}
      cheatSheets={[
        {
          title: 'Helyi érték',
          items: [
            'százas (sz) – tízes (t) – egyes (e)',
            'Alaki érték: a leírt számjegy. Valódi érték: amennyit a helyén ér.',
            '641 = 6 sz + 4 t + 1 e = 600 + 40 + 1',
            'Ha nincs tízes, a helyére 0 kerül: négyszázhat = 406.'
          ]
        },
        {
          title: 'Számszomszédok',
          items: [
            'Egyes szomszédok: 371 < 372 < 373',
            'Tízes szomszédok: 370 < 372 < 380',
            'Százas szomszédok: 300 < 372 < 400',
            'Számegyenesen jobbra haladva nőnek a számok.'
          ]
        },
        {
          title: 'Kerekítés',
          items: [
            'A közelebbi szomszédhoz kerekítünk: 608 ≈ 610, 920 ≈ 900.',
            'Pont középen a nagyobbhoz: 595 ≈ 600, 950 ≈ 1000.',
            'Kerek számnál maga a szám: 600 ≈ 600.',
            'Jele: ≈ (közelítőleg egyenlő)'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Numbers1000Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Numbers1000Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Numbers1000Quiz;
