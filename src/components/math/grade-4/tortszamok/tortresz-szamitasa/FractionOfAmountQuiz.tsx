import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { FractionOfAmountMatcher } from './FractionOfAmountMatcher';
import { FractionOfAmountSorter } from './FractionOfAmountSorter';
import { DiscGroupsG, ClockFaceG } from './FractionOfAmountFigures';
import { BarG } from '../tortek-osszehasonlitasa/FractionCompare4Figures';

// ---------------------------------------------------------------------------
// Kérdésábrák – kis SVG-k, az ismeretlent „?” jelöli
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; title?: string; h?: number }> = ({ children, title, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {title && (
      <text x="120" y="17" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#334155">
        {title}
      </text>
    )}
    {children}
  </svg>
);

const T: React.FC<{ x: number; y: number; t: string; s?: number; c?: string; a?: 'start' | 'middle' | 'end' }> = ({ x, y, t, s = 12, c, a = 'middle' }) => (
  <text x={x} y={y} fontSize={s} fontWeight="bold" textAnchor={a} fill={t.includes('?') ? '#dc2626' : c ?? '#0f172a'}>
    {t}
  </text>
);

/** Korongok egy sorban vagy rácsban, színezés nélkül. */
const Discs: React.FC<{ total: number; cols: number; title: string; note?: string; color?: string; h?: number }> = ({ total, cols, title, note, color = '#fbbf24', h = 130 }) => {
  const rows = Math.ceil(total / cols);
  const step = Math.min(22, 200 / cols);
  const x0 = 120 - ((cols - 1) * step) / 2;
  return (
    <QFig title={title} h={h}>
      {Array.from({ length: total }, (_, i) => (
        <circle key={i} cx={x0 + (i % cols) * step} cy={36 + Math.floor(i / cols) * step} r={step * 0.4} fill={color} stroke="#92400e" strokeWidth={1.2} />
      ))}
      {note && <T x={120} y={36 + rows * step + 8} t={note} />}
    </QFig>
  );
};

/** Egy csík egyenlő részekre osztva, alatta felirat. */
const OneBar: React.FC<{ parts: number; filled: number; title: string; note: string; color?: string; left?: string; right?: string }> = ({ parts, filled, title, note, color = '#10b981', left, right }) => (
  <QFig title={title} h={110}>
    <BarG x={20} y={34} w={200} h={28} parts={parts} filled={filled} color={color} />
    {left && <T x={20} y={78} t={left} s={10} a="start" />}
    {right && <T x={220} y={78} t={right} s={10} a="end" />}
    <T x={120} y={98} t={note} />
  </QFig>
);

const FIG_Q1 = <Discs total={12} cols={6} title="12 bonbon, 4 gyerek" note="1 gyereknek: ? bonbon" />;
const FIG_Q2 = <Discs total={24} cols={8} title="24 pogácsa a tepsiben" note="a negyede: ? pogácsa" color="#f59e0b" h={140} />;
const FIG_Q3 = <OneBar parts={10} filled={1} title="200 cm 1 tizede" note="1 tized = ? cm" left="0" right="200 cm" color="#f97316" />;
const FIG_Q4 = (
  <QFig title="1 óra = 60 perc" h={140}>
    <ClockFaceG cx={120} cy={74} r={46} minutes={15} />
    <T x={120} y={134} t="negyed óra = ? perc" />
  </QFig>
);
const FIG_Q8 = <OneBar parts={2} filled={1} title="300 Ft-nak a fele" note="a ceruza ára: ? Ft" left="0 Ft" right="300 Ft" color="#3b82f6" />;
const FIG_Q11 = (
  <QFig title="12-nek a 3 negyede" h={150}>
    <DiscGroupsG x={60} y={36} total={12} groups={4} colored={3} r={9} gap={26} />
    <T x={180} y={70} t="12 : 4 = ?" s={12} />
    <T x={180} y={100} t="? · 3 = ?" s={12} />
  </QFig>
);
const FIG_Q12 = <OneBar parts={3} filled={2} title="A radír 300 Ft-nak a 2 harmadába kerül" note="Melyik művelet?" left="0 Ft" right="300 Ft" color="#3b82f6" />;
const FIG_Q13 = <OneBar parts={4} filled={3} title="4000 Ft-nak a 3 negyede" note="a tolltartó ára: ? Ft" left="0 Ft" right="4000 Ft" color="#2563eb" />;
const FIG_Q15 = (
  <QFig title="1 m = 100 cm" h={110}>
    <rect x={20} y={34} width={200} height={26} fill="#fde047" stroke="#a16207" strokeWidth={1.5} />
    {Array.from({ length: 21 }, (_, i) => (
      <line key={i} x1={20 + i * 10} y1={34} x2={20 + i * 10} y2={34 + (i % 2 === 0 ? 12 : 7)} stroke="#713f12" strokeWidth={1} />
    ))}
    {[1, 2, 3].map((k) => (
      <line key={k} x1={20 + k * 50} y1={30} x2={20 + k * 50} y2={64} stroke="#dc2626" strokeWidth={2} strokeDasharray="4 3" />
    ))}
    <T x={20} y={76} t="0" s={10} a="start" />
    <T x={220} y={76} t="100 cm" s={10} a="end" />
    <T x={120} y={98} t="a méter 3 negyede = ? cm" />
  </QFig>
);
const FIG_Q16 = (
  <QFig title="1 óra = 60 perc" h={140}>
    <ClockFaceG cx={120} cy={74} r={46} minutes={45} />
    <T x={120} y={134} t="3 negyed óra = ? perc" />
  </QFig>
);
const FIG_Q18 = (
  <QFig title="Az egész téglalap értéke 2400" h={120}>
    {Array.from({ length: 12 }, (_, i) => (
      <rect key={i} x={50 + (i % 6) * 24} y={30 + Math.floor(i / 6) * 28} width={24} height={28} fill={i === 3 ? '#84cc16' : '#ffffff'} stroke="#334155" strokeWidth={1.3} />
    ))}
    <T x={120} y={106} t="a zöld rész értéke: ?" />
  </QFig>
);
const FIG_Q19 = <OneBar parts={10} filled={3} title="1 m = 100 cm, 10 egyenlő rész" note="3 tized m = ? cm" left="0" right="100 cm" color="#f97316" />;
const FIG_Q21 = (
  <QFig title="24 papírtányér" h={150}>
    {Array.from({ length: 24 }, (_, i) => (
      <circle key={i} cx={34 + (i % 8) * 24} cy={38 + Math.floor(i / 8) * 26} r={10} fill="#ffffff" stroke="#334155" strokeWidth={1.2} />
    ))}
    <T x={20} y={122} t="fiúk: fele • lányok: harmada" s={11} a="start" c="#334155" />
    <T x={20} y={140} t="felnőttek: ? tányér" s={11} a="start" />
  </QFig>
);
const FIG_Q24 = (
  <QFig title="15 liter szörp" h={120}>
    <rect x={20} y={32} width={200} height={28} fill="#ffffff" stroke="#334155" strokeWidth={2} />
    <rect x={20} y={32} width={66.7} height={28} fill="#f43f5e" stroke="#334155" strokeWidth={1.2} />
    <T x={53} y={51} t="málna" s={10} c="#ffffff" />
    <line x1={86.7} y1={46} x2={220} y2={46} stroke="#94a3b8" strokeDasharray="3 3" />
    <T x={153} y={78} t="a maradék: fele eper, a többi szeder" s={10} c="#334155" />
    <T x={120} y={104} t="szeder: ? ml" />
  </QFig>
);
const FIG_Q26 = (
  <QFig title="A 400 literes dézsa" h={150}>
    <rect x={80} y={26} width={80} height={110} rx={6} fill="#ffffff" stroke="#334155" strokeWidth={2} />
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={80} y={26 + i * 11} width={80} height={11} fill={i >= 4 ? '#60a5fa' : '#ffffff'} stroke="#94a3b8" strokeWidth={0.8} />
    ))}
    <T x={40} y={100} t="6 tized" s={11} c="#1d4ed8" />
    <T x={200} y={58} t="? liter" s={12} />
  </QFig>
);
const FIG_Q27 = (
  <QFig title="Palkó 60 autója" h={130}>
    {[
      { l: '1 tizede kék', c: '#3b82f6' },
      { l: '1 hatoda sárga', c: '#facc15' },
      { l: '1 negyede zöld', c: '#22c55e' },
      { l: '1 harmada piros', c: '#ef4444' },
      { l: 'a többi fehér: ?', c: '#ffffff' }
    ].map((g, i) => (
      <g key={g.l}>
        <rect x={40} y={26 + i * 20} width={20} height={12} rx={3} fill={g.c} stroke="#334155" />
        <T x={70} y={36 + i * 20} t={g.l} s={11} a="start" />
      </g>
    ))}
  </QFig>
);

export const FRACTION_OF_AMOUNT_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint: 1 rész kiszámítása ----------------
  {
    id: 'foa-q1',
    questionTypeBadge: 'Osztozkodás',
    figure: FIG_Q1,
    level: 1,
    question: 'Manó 12 darabos bonbont kapott. Négyen osztoznak rajta igazságosan. Hány bonbon jut egy gyereknek?',
    options: ['3', '4', '8', '48'],
    correctAnswer: 0,
    explanation: 'Négy egyenlő részre osztjuk: 12 : 4 = 3. Mindenki a bonbonok 1 negyedét, 3 darabot kap.'
  },
  {
    id: 'foa-q2',
    questionTypeBadge: 'Darab',
    figure: FIG_Q2,
    level: 1,
    question: 'Manó a 24 pogácsa negyedét ette meg. Hány pogácsát evett?',
    options: ['6', '4', '8', '20'],
    correctAnswer: 0,
    explanation: 'A negyede: 4 egyenlő részre osztjuk: 24 : 4 = 6 pogácsa.'
  },
  {
    id: 'foa-q3',
    questionTypeBadge: 'Hosszúság',
    figure: FIG_Q3,
    level: 1,
    question: 'Mennyi 200 cm 1 tizede?',
    options: ['20 cm', '2 cm', '10 cm', '190 cm'],
    correctAnswer: 0,
    explanation: 'Tized rész: 10 egyenlő részre osztunk. 200 : 10 = 20 cm.'
  },
  {
    id: 'foa-q4',
    questionTypeBadge: 'Idő',
    figure: FIG_Q4,
    level: 1,
    question: 'Hány perc a negyed óra?',
    options: ['15 perc', '4 perc', '25 perc', '30 perc'],
    correctAnswer: 0,
    explanation: '1 óra = 60 perc. A negyede: 60 : 4 = 15 perc.'
  },
  {
    id: 'foa-q5',
    questionTypeBadge: 'Utazás',
    level: 1,
    question: 'Mona családja a 684 km-re lévő Münchenbe utazik. Az út felét már megtették. Hány kilométert kell még utazniuk?',
    options: ['342 km-t', '684 km-t', '332 km-t', '1368 km-t'],
    correctAnswer: 0,
    explanation: 'Ha a felét megtették, a másik fele van még hátra: 684 : 2 = 342 km.'
  },
  {
    id: 'foa-q6',
    questionTypeBadge: 'Darab',
    level: 1,
    question: 'Palkónak 60 játékautója van. Az autók 1 harmada piros. Hány piros autója van?',
    options: ['20', '30', '15', '57'],
    correctAnswer: 0,
    explanation: 'Harmad rész: 3 egyenlő részre osztunk. 60 : 3 = 20 piros autó.'
  },
  {
    id: 'foa-q7',
    questionTypeBadge: 'Hosszúság',
    level: 1,
    question: 'Félbehajtottad a mérőszalagot. Hány centiméter a fél méter?',
    options: ['50 cm', '5 cm', '25 cm', '500 cm'],
    correctAnswer: 0,
    explanation: '1 m = 100 cm. A fele: 100 : 2 = 50 cm. A hajtásvonal az 50 cm-nél van.'
  },
  {
    id: 'foa-q8',
    questionTypeBadge: 'Pénz',
    figure: FIG_Q8,
    level: 1,
    question: 'A ceruza 300 Ft-nak a felébe kerül. Mennyibe kerül a ceruza?',
    options: ['150 Ft', '100 Ft', '200 Ft', '600 Ft'],
    correctAnswer: 0,
    explanation: 'A fele: 300 : 2 = 150 Ft.'
  },
  {
    id: 'foa-q9',
    questionTypeBadge: 'Tömeg',
    level: 1,
    question: 'A pogácsába a 30 dkg vaj 1 harmad részét tették. Hány dekagramm vajat tettek bele?',
    options: ['10 dkg', '3 dkg', '15 dkg', '27 dkg'],
    correctAnswer: 0,
    explanation: '30 : 3 = 10 dkg vajat tettek a pogácsába.'
  },
  {
    id: 'foa-q10',
    questionTypeBadge: 'Mértékváltás',
    level: 1,
    question: '1 dm = 10 cm. Hány centiméter az 1 tized dm?',
    options: ['1 cm', '10 cm', '100 cm', '1 mm'],
    correctAnswer: 0,
    explanation: '10 cm : 10 = 1 cm. Tehát 1 tized dm = 1 cm = 10 mm.'
  },

  // ---------------- 2. szint: több rész kiszámítása ----------------
  {
    id: 'foa-q11',
    questionTypeBadge: 'Két lépés',
    figure: FIG_Q11,
    level: 2,
    question: 'Mennyi 12-nek a 3 negyede?',
    options: ['9', '3', '16', '4'],
    correctAnswer: 0,
    explanation: '1. lépés: 12 : 4 = 3 (ez 1 negyed). 2. lépés: 3 · 3 = 9 (ez 3 negyed). Röviden: 12 : 4 · 3 = 9.'
  },
  {
    id: 'foa-q12',
    questionTypeBadge: 'Műveletkártya',
    figure: FIG_Q12,
    level: 2,
    question: 'A radír 300 Ft-nak a 2 harmadába kerül. Melyik művelettel számolod ki az árát?',
    options: ['300 : 3 · 2', '300 : 2 · 3', '300 : 3', '300 · 3 : 2'],
    correctAnswer: 0,
    explanation: 'Harmad rész: előbb 3-mal osztunk (300 : 3 = 100), aztán 2 rész kell, ezért 2-vel szorzunk: 100 · 2 = 200 Ft.'
  },
  {
    id: 'foa-q13',
    questionTypeBadge: 'Pénz',
    figure: FIG_Q13,
    level: 2,
    question: 'A tolltartó 4000 Ft-nak a 3 negyedébe kerül. Mennyibe kerül?',
    options: ['3000 Ft', '1000 Ft', '2000 Ft', '12 000 Ft'],
    correctAnswer: 0,
    explanation: '4000 : 4 = 1000 Ft (1 negyed). 1000 · 3 = 3000 Ft (3 negyed).'
  },
  {
    id: 'foa-q14',
    questionTypeBadge: 'Pénz',
    level: 2,
    question: 'A színes ceruzák 4000 Ft-nak a 2 nyolcadába kerülnek. Mennyibe kerülnek?',
    options: ['1000 Ft', '500 Ft', '2000 Ft', '800 Ft'],
    correctAnswer: 0,
    explanation: '4000 : 8 = 500 Ft (1 nyolcad). 500 · 2 = 1000 Ft (2 nyolcad).'
  },
  {
    id: 'foa-q15',
    questionTypeBadge: 'Hosszúság',
    figure: FIG_Q15,
    level: 2,
    question: 'Hány centiméter a méter 3 negyede?',
    options: ['75 cm', '25 cm', '30 cm', '300 cm'],
    correctAnswer: 0,
    explanation: '1 m = 100 cm. 100 : 4 = 25 cm (1 negyed). 25 · 3 = 75 cm (3 negyed).'
  },
  {
    id: 'foa-q16',
    questionTypeBadge: 'Idő',
    figure: FIG_Q16,
    level: 2,
    question: 'Hány perc a 3 negyed óra?',
    options: ['45 perc', '15 perc', '30 perc', '75 perc'],
    correctAnswer: 0,
    explanation: '60 : 4 = 15 perc (negyed óra). 15 · 3 = 45 perc (3 negyed óra).'
  },
  {
    id: 'foa-q17',
    questionTypeBadge: 'Hosszúság',
    level: 2,
    question: 'A vágtán az egyik zászló 1 km 3 ötödénél áll. Hányadik méternél van?',
    options: ['600 m-nél', '200 m-nél', '300 m-nél', '350 m-nél'],
    correctAnswer: 0,
    explanation: '1 km = 1000 m. 1000 : 5 = 200 m (1 ötöd). 200 · 3 = 600 m (3 ötöd).'
  },
  {
    id: 'foa-q18',
    questionTypeBadge: 'Téglalap',
    figure: FIG_Q18,
    level: 2,
    question: 'Az egész téglalap értéke 2400. Mennyit ér a zöldre színezett rész?',
    options: ['200', '400', '1200', '240'],
    correctAnswer: 0,
    explanation: 'A téglalap 12 egyenlő részből áll, ebből 1 zöld: ez 1 tizenketted. 2400 : 12 = 200.'
  },
  {
    id: 'foa-q19',
    questionTypeBadge: 'Mértékváltás',
    figure: FIG_Q19,
    level: 2,
    question: 'Hány centiméter a 3 tized méter?',
    options: ['30 cm', '3 cm', '300 cm', '70 cm'],
    correctAnswer: 0,
    explanation: '100 cm : 10 = 10 cm (1 tized m = 1 dm). 10 · 3 = 30 cm. Tehát 3 tized m = 3 dm = 30 cm.'
  },
  {
    id: 'foa-q20',
    questionTypeBadge: 'Mértékváltás',
    level: 2,
    question: 'Hány centiméter a 4 ötöd méter?',
    options: ['80 cm', '20 cm', '40 cm', '125 cm'],
    correctAnswer: 0,
    explanation: '100 : 5 = 20 cm (1 ötöd m). 20 · 4 = 80 cm. Tehát 4 ötöd m = 8 dm = 80 cm.'
  },

  // ---------------- 3. szint: szöveges feladatok ----------------
  {
    id: 'foa-q21',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_Q21,
    level: 3,
    question: 'Édesanya 24 papírtányért vett. A fiúknak a tányérok felét, a lányoknak a harmadát adta, a többit a felnőtteknek. Hány tányér jutott a felnőtteknek?',
    options: ['4', '8', '12', '20'],
    correctAnswer: 0,
    explanation: 'Fiúk: 24 : 2 = 12. Lányok: 24 : 3 = 8. Felnőttek: 24 − 12 − 8 = 4 tányér.'
  },
  {
    id: 'foa-q22',
    questionTypeBadge: 'Tömeg',
    level: 3,
    question: 'Az 1 kg-os liszt 5 tizedét használták fel a pogácsához. Hány gramm liszt maradt?',
    options: ['500 g', '5 g', '995 g', '50 g'],
    correctAnswer: 0,
    explanation: '1 kg = 1000 g. Felhasználták: 1000 : 10 · 5 = 500 g. Maradt: 1000 − 500 = 500 g.'
  },
  {
    id: 'foa-q23',
    questionTypeBadge: 'Idő',
    level: 3,
    question: 'A pogácsát 1 és negyed óra alatt készítették el. Hány perc alatt készült el?',
    options: ['75 perc', '125 perc', '90 perc', '45 perc'],
    correctAnswer: 0,
    explanation: '1 óra = 60 perc, negyed óra = 60 : 4 = 15 perc. 60 + 15 = 75 perc.'
  },
  {
    id: 'foa-q24',
    questionTypeBadge: 'Űrtartalom',
    figure: FIG_Q24,
    level: 3,
    question: 'A rokonoknak 15 liter szörpöt vittek. Az 1 harmada málna, a maradék fele eper, a többi szeder. Hány milliliter szederszörpöt vittek?',
    options: ['5000 ml', '7500 ml', '2500 ml', '10 000 ml'],
    correctAnswer: 0,
    explanation: 'Málna: 15 : 3 = 5 l. Maradék: 15 − 5 = 10 l. Eper: 10 : 2 = 5 l. Szeder: 10 − 5 = 5 l = 5000 ml.'
  },
  {
    id: 'foa-q25',
    questionTypeBadge: 'Szöveges feladat',
    level: 3,
    question: 'A nomád táborban 180 diák volt. A fele kék sátrakban lakott, a maradék gyerekek harmada zöld sátrakban, a többiek jurtában. Hány diák lakott jurtában?',
    options: ['60', '30', '90', '120'],
    correctAnswer: 0,
    explanation: 'Kék: 180 : 2 = 90. Maradék: 180 − 90 = 90. Zöld: 90 : 3 = 30. Jurta: 90 − 30 = 60 diák.'
  },
  {
    id: 'foa-q26',
    questionTypeBadge: 'Űrtartalom',
    figure: FIG_Q26,
    level: 3,
    question: 'Fanniék 400 literes dézsájának 6 tized része megtelt vízzel. Hány liter víz hiányzik még, hogy tele legyen?',
    options: ['160 liter', '240 liter', '60 liter', '340 liter'],
    correctAnswer: 0,
    explanation: 'Benne van: 400 : 10 · 6 = 240 liter. Hiányzik: 400 − 240 = 160 liter (ez a 4 tized rész).'
  },
  {
    id: 'foa-q27',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_Q27,
    level: 3,
    question: 'Palkó 60 autójának 1 tizede kék, 1 hatoda sárga, 1 negyede zöld, 1 harmada piros, a többi fehér. Hány fehér autója van?',
    options: ['9', '51', '11', '19'],
    correctAnswer: 0,
    explanation: 'Kék: 60 : 10 = 6. Sárga: 60 : 6 = 10. Zöld: 60 : 4 = 15. Piros: 60 : 3 = 20. Színes: 6 + 10 + 15 + 20 = 51. Fehér: 60 − 51 = 9.'
  },
  {
    id: 'foa-q28',
    questionTypeBadge: 'Mértékváltás',
    level: 3,
    question: 'A 30 dkg vaj 1 harmadát tették a tésztába. Hány gramm vaj ez?',
    options: ['100 g', '10 g', '1000 g', '90 g'],
    correctAnswer: 0,
    explanation: '30 : 3 = 10 dkg. 1 dkg = 10 g, ezért 10 dkg = 100 g.'
  },
  {
    id: 'foa-q29',
    questionTypeBadge: 'Pénz',
    level: 3,
    question: 'Az egész pizza 2400 Ft. Mennyibe kerül 2 darab ötöd szelet?',
    options: ['960 Ft', '480 Ft', '1200 Ft', '1000 Ft'],
    correctAnswer: 0,
    explanation: '1 ötöd szelet: 2400 : 5 = 480 Ft. 2 szelet: 480 · 2 = 960 Ft.'
  },
  {
    id: 'foa-q30',
    questionTypeBadge: 'Társasjáték',
    level: 3,
    question: 'A társasjátékban a zöld szín a 6000-et jelenti. A zöld „3 tized” mezőn mennyi a 6000 megadott része?',
    options: ['1800', '600', '2000', '18 000'],
    correctAnswer: 0,
    explanation: '6000 : 10 = 600 (1 tized). 600 · 3 = 1800 (3 tized).'
  }
];

export const FractionOfAmountQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="tortszamok"
      topicId="g4-frac-tortresz-quiz"
      subtopicId="tortresz-szamitasa"
      title="5. Törtrész kiszámítása, szöveges feladatok – Kvíz"
      subtitle="30 feladat 3 szinten: 1 rész kiszámítása, több rész két lépésben, pénz, hosszúság, idő, tömeg, szöveges feladatok."
      badge="4. OSZTÁLY • VIII. A TÖRTSZÁMOK • KVÍZ"
      questions={FRACTION_OF_AMOUNT_QUESTIONS}
      cheatSheets={[
        {
          title: 'Két lépésben',
          items: [
            '1. Osztás: hány egyenlő részre vágjuk? (negyed → : 4)',
            '2. Szorzás: hány részt veszünk? (3 negyed → · 3)',
            '12-nek a 3 negyede: 12 : 4 · 3 = 9',
            'Ellenőrzés: 1 egésznél kisebb rész kevesebb, mint az egész!'
          ]
        },
        {
          title: 'Mértékegységek',
          items: [
            '1 m = 10 dm = 100 cm = 1000 mm; 1 km = 1000 m',
            '1 óra = 60 perc: negyed óra 15, fél óra 30, 3 negyed óra 45 perc',
            '1 kg = 100 dkg = 1000 g; 1 dkg = 10 g',
            '1 l = 10 dl = 1000 ml'
          ]
        },
        {
          title: 'Szöveges feladatok',
          items: [
            'Olvasd el figyelmesen: miből kell a törtrész?',
            '„a maradék fele”: előbb a maradékot számold ki!',
            '„a többi”: vond ki az egészből a már kiszámolt részeket!',
            'Írd ki a választ mértékegységgel!'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <FractionOfAmountMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <FractionOfAmountSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default FractionOfAmountQuiz;
