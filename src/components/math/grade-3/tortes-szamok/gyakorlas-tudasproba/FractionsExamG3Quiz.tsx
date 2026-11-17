import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { FractionsExamG3Matcher } from './FractionsExamG3Matcher';
import { FractionsExamG3Sorter } from './FractionsExamG3Sorter';
import { Pie, Bar, Grid, Rod, ROD, UNK } from './FractionsExamG3Parts';
import { QFig, ObjRows, Strip, ClockPie, Jug, SegmentRuler, Road } from '../osszehasonlitas/FractionAmountsG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const PieQ: React.FC<{ n?: number; k?: number; bounds?: number[]; colored?: number[]; color?: string }> = ({ n, k, bounds, colored, color }) => (
  <QFig h={150}>
    <Pie cx={120} cy={75} r={60} n={n} k={k} bounds={bounds} colored={colored} color={color} />
  </QFig>
);

const BarQ: React.FC<{ n: number; k?: number; fold?: boolean }> = ({ n, k = 0, fold }) => (
  <QFig h={90}>
    <Bar x={20} y={22} w={200} h={46} n={n} k={k} color="#ef4444" base="#fef3c7" />
    {fold && <line x1={120} y1={12} x2={120} y2={78} stroke={UNK} strokeWidth="3" strokeDasharray="6 4" />}
  </QFig>
);

const GridQ: React.FC<{ rows: number; cols: number; k: number }> = ({ rows, cols, k }) => (
  <QFig h={130}>
    <Grid x={50} y={15} w={140} h={100} rows={rows} cols={cols} k={k} />
  </QFig>
);

/** Két kör egymás mellett, A és B betűvel. */
const TwoPies: React.FC<{ a: [number, number]; b: [number, number]; la?: string; lb?: string }> = ({ a, b, la = 'A', lb = 'B' }) => (
  <QFig h={140}>
    <Pie cx={65} cy={62} r={44} n={a[0]} k={a[1]} />
    <Pie cx={175} cy={62} r={44} n={b[0]} k={b[1]} />
    <text x={65} y={128} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">{la}</text>
    <text x={175} y={128} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">{lb}</text>
  </QFig>
);

/** Két csík egymás alatt, A és B. */
const TwoBars: React.FC<{ n: number; a: number; b: number }> = ({ n, a, b }) => (
  <QFig h={120}>
    <text x={20} y={42} fontSize="15" fontWeight="bold" fill="#0f172a">A</text>
    <Bar x={40} y={18} w={180} h={34} n={n} k={a} />
    <text x={20} y={92} fontSize="15" fontWeight="bold" fill="#0f172a">B</text>
    <Bar x={40} y={68} w={180} h={34} n={n} k={b} />
  </QFig>
);

/** Színes rudak: fent az egész, alatta a rész. */
const RodsQ: React.FC<{ whole: number; part: number; showPartName?: boolean }> = ({ whole, part, showPartName = true }) => {
  const u = 200 / whole;
  return (
    <QFig h={110}>
      <Rod x={20} y={18} len={whole} u={u} h={30} />
      <text x={120} y={38} textAnchor="middle" fontSize="13" fontWeight="bold" fill={whole === 8 ? '#ffffff' : '#0f172a'}>{ROD[whole].name}: 1 egész</text>
      <Rod x={20} y={62} len={part} u={u} h={30} />
      {showPartName && (
        <text x={20 + part * u + 8} y={82} fontSize="13" fontWeight="bold" fill="#0f172a">{ROD[part].name}: ?</text>
      )}
    </QFig>
  );
};

const Objs: React.FC<{ n: number; k: number; kind?: 'apple' | 'candy'; faded?: number }> = ({ n, k, kind = 'apple', faded = 0 }) => {
  const m = n / k;
  const gap = Math.min(26, 190 / m);
  const rowGap = Math.min(30, 110 / k);
  const r = Math.min(9, gap / 2 - 2, rowGap / 2 - 3);
  return (
    <QFig h={150}>
      <ObjRows x={120 - ((m - 1) * gap) / 2} y={75 - ((k - 1) * rowGap) / 2} n={n} k={k} gap={gap} rowGap={rowGap} r={r} kind={kind} fadedRows={faded} />
    </QFig>
  );
};

const StripQ: React.FC<{ top: string; n: number; fill?: number[]; cross?: number[]; labels?: (string | null)[] }> = ({ top, n, fill = [0], cross, labels }) => (
  <QFig h={100}>
    <Strip x={20} y={46} w={200} h={36} n={n} fill={fill} cross={cross} labels={labels ?? ['?']} top={top} color="#fbbf24" />
  </QFig>
);

const ClockQ: React.FC<{ n: number; shade: number }> = ({ n, shade }) => (
  <QFig h={150}>
    <ClockPie cx={120} cy={75} r={62} n={n} shade={shade} />
  </QFig>
);

const RoadQ: React.FC<{ n: number; a: number; b: number; total: string }> = (p) => (
  <QFig h={110}>
    <Road x={20} y={58} w={200} {...p} />
  </QFig>
);

type Opt = [string, string, string, string];
let qn = 0;
const q = (level: 1 | 2 | 3, badge: string, question: string, options: Opt, explanation: string, figure?: React.ReactNode): QuizQuestion => ({
  id: `fex-g3-q${++qn}`,
  level,
  questionTypeBadge: badge,
  question,
  options,
  correctAnswer: 0,
  explanation,
  ...(figure ? { figure } : {})
});

const QUESTIONS: QuizQuestion[] = [
  // =============================== 1. szint ===============================
  q(1, 'A rész neve', 'Hányad részét színeztük pirosra?', ['1 negyed', '1 harmad', '1 ketted', '4 negyed'], '4 egyenlő részre osztottuk. 1 rész piros: 1 negyed.', <PieQ n={4} k={1} />),
  q(1, 'A rész neve', 'Hányad részét színeztük pirosra?', ['1 harmad', '1 negyed', '3 harmad', '1 ketted'], '3 egyenlő rész van, 1 piros: 1 harmad.', <PieQ n={3} k={1} />),
  q(1, 'A rész neve', 'Hányad része piros a csíknak?', ['1 ketted', '1 negyed', '2 ketted', '1 harmad'], '2 egyenlő részből 1 piros: 1 ketted, vagyis a fele.', <BarQ n={2} k={1} />),
  q(
    1,
    'Egyenlő részek',
    'Egyenlő részekre vágtuk a tortát?',
    ['Nem, az egyik rész nagyobb.', 'Igen, 2 egyenlő rész.', 'Igen, ez 2 ketted.', 'Igen, ez 1 ketted.'],
    'A két szelet nem egyforma. Törtről csak egyenlő részeknél beszélünk.',
    <PieQ bounds={[0, 220, 360]} />
  ),
  q(1, 'Hány rész?', 'Hány egyenlő részre osztottuk a csíkot?', ['5', '4', '6', '1'], 'Számold a részeket, ne a vonalakat! 5 rész van.', <BarQ n={5} />),
  q(1, 'A rész neve', 'Hányad részét színeztük pirosra?', ['1 nyolcad', '1 hatod', '1 negyed', '8 nyolcad'], '8 egyenlő rész, 1 piros: 1 nyolcad.', <PieQ n={8} k={1} />),
  q(1, 'Az egész', 'Hány harmadból áll az 1 egész kör?', ['3 harmad', '1 harmad', '2 harmad', '4 harmad'], 'A kör 3 egyenlő részből áll. 3 harmad = 1 egész.', <PieQ n={3} />),
  q(1, 'Hajtogatás', 'A lapot egyszer félbehajtod. Hány egyenlő rész lesz?', ['2', '1', '4', '3'], 'Egy hajtás: 2 egyenlő rész, mindkettő 1 ketted.', <BarQ n={1} fold />),
  q(1, 'Fele', 'Mennyi a 6 alma fele?', ['3', '2', '4', '12'], '2 egyenlő sor, egy sorban 3 alma. 6 : 2 = 3.', <Objs n={6} k={2} />),
  q(1, 'Harmada', 'Mennyi a 9 cukorka harmada?', ['3', '6', '4', '1'], '3 egyenlő sor, egy sorban 3. 9 : 3 = 3.', <Objs n={9} k={3} kind="candy" />),
  q(1, 'Fele', 'Mennyi a 16 fele?', ['8', '14', '32', '4'], 'Fele: osztás 2-vel. 16 : 2 = 8.'),
  q(1, 'Negyede', 'Mennyi a 20 negyede?', ['5', '16', '4', '10'], 'Negyede: osztás 4-gyel. 20 : 4 = 5.'),
  q(1, 'Tizede', 'A csík 50-et ér. Mennyi az 50 tizede?', ['5', '40', '10', '500'], '10 egyenlő rész. 50 : 10 = 5.', <StripQ top="50" n={10} />),
  q(1, 'Idő', 'Hány perc a fél óra?', ['30 perc', '20 perc', '15 perc', '50 perc'], '1 óra = 60 perc. 60 : 2 = 30 perc.', <ClockQ n={2} shade={30} />),
  q(1, 'Idő', 'Hány perc a negyed óra?', ['15 perc', '4 perc', '25 perc', '45 perc'], '60 perc : 4 = 15 perc.', <ClockQ n={4} shade={15} />),
  q(
    1,
    'Űrtartalom',
    'Az 1 literes edény félig van. Hány dl víz van benne?',
    ['5 dl', '2 dl', '50 dl', '1 dl'],
    '1 l = 10 dl. 10 : 2 = 5 dl.',
    (
      <QFig h={150}>
        <Jug x={97} y={28} w={46} h={110} level={5} top="1 l" nums />
      </QFig>
    )
  ),
  q(1, 'A rész neve', 'Hányad része piros a négyzetnek?', ['1 negyed', '1 ketted', '1 harmad', '2 negyed'], '4 egyenlő kis négyzet, 1 piros: 1 negyed.', <GridQ rows={2} cols={2} k={1} />),
  q(1, 'A rész neve', 'Hányad részét színeztük pirosra?', ['1 hatod', '1 nyolcad', '1 ötöd', '6 hatod'], '6 egyenlő rész, 1 piros: 1 hatod.', <PieQ n={6} k={1} />),
  q(1, 'A rész neve', 'Hányad része piros a csíknak?', ['1 tized', '1 ötöd', '1 nyolcad', '10 tized'], '10 egyenlő rész, 1 piros: 1 tized.', <BarQ n={10} k={1} />),
  q(1, 'Melyik nagyobb?', 'Két egyforma pizza. Melyik piros szelet a nagyobb?', ['az 1 ketted (A)', 'az 1 negyed (B)', 'egyformák', 'nem lehet tudni'], 'Az A-t 2 részre, a B-t 4 részre vágtuk. Kevesebb rész → nagyobb szelet.', <TwoPies a={[2, 1]} b={[4, 1]} />),
  q(1, 'A rész neve', 'Hányad részét színeztük pirosra?', ['3 negyed', '1 negyed', '3 harmad', '4 negyed'], '4 egyenlő rész, ebből 3 piros: 3 negyed.', <PieQ n={4} k={3} />),
  q(1, 'Az egész', 'Hány negyedből áll az 1 egész?', ['4', '3', '2', '1'], '4 negyed = 1 egész.'),
  q(1, 'Ötöde', 'Mennyi a 10 alma ötöde?', ['2', '5', '8', '10'], '5 egyenlő sor, egy sorban 2 alma. 10 : 5 = 2.', <Objs n={10} k={5} />),
  q(1, 'Fele', 'Mennyi a 30 fele?', ['15', '28', '60', '10'], '30 : 2 = 15.'),
  q(1, 'A rész neve', 'Hányad része piros a csíknak?', ['2 harmad', '1 harmad', '3 harmad', '2 ketted'], '3 egyenlő rész, 2 piros: 2 harmad.', <BarQ n={3} k={2} />),
  q(1, 'A rész neve', 'Hányad részét színeztük pirosra?', ['1 ötöd', '1 hatod', '1 negyed', '5 ötöd'], '5 egyenlő rész, 1 piros: 1 ötöd.', <PieQ n={5} k={1} />),
  q(1, 'Színes rudak', 'A lila rúd az 1 egész. Hányad része a fehér kocka?', ['1 hatod', '1 ötöd', '6 hatod', '1 nyolcad'], '6 fehér kocka fér a lila rúd mellé. 1 kocka: 1 hatod.', <RodsQ whole={6} part={1} />),
  q(1, 'Tizede', 'Mennyi a 100 tizede?', ['10', '90', '1', '50'], '100 : 10 = 10.'),
  q(1, 'Hosszúság', 'Hány cm az 1 m fele?', ['50 cm', '2 cm', '20 cm', '100 cm'], '1 m = 100 cm. 100 : 2 = 50 cm.'),
  q(1, 'A rész neve', 'Hányad része piros a téglalapnak?', ['1 nyolcad', '1 negyed', '1 hatod', '8 nyolcad'], '8 egyenlő kis téglalap, 1 piros: 1 nyolcad.', <GridQ rows={2} cols={4} k={1} />),

  // =============================== 2. szint ===============================
  q(
    2,
    'Egyenlő részek',
    'Melyik kört vágtuk 3 egyenlő részre?',
    ['B', 'A', 'C', 'mindhármat'],
    'A-ban a részek nem egyformák. C-ben 4 rész van. Csak B jó.',
    (
      <QFig h={130}>
        <Pie cx={42} cy={58} r={32} bounds={[0, 80, 230, 360]} />
        <Pie cx={120} cy={58} r={32} n={3} />
        <Pie cx={198} cy={58} r={32} n={4} />
        {['A', 'B', 'C'].map((t, i) => (
          <text key={t} x={42 + i * 78} y={116} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">{t}</text>
        ))}
      </QFig>
    )
  ),
  q(2, 'Hajtogatás', 'A lapot kétszer félbehajtod. Mekkora lesz egy rész?', ['1 negyed', '1 ketted', '1 harmad', '1 nyolcad'], '1. hajtás: 2 rész. 2. hajtás: 4 rész. Egy rész 1 negyed.', <BarQ n={2} fold />),
  q(2, 'Tömeg', 'Hány dkg a negyed kg?', ['25 dkg', '4 dkg', '40 dkg', '75 dkg'], '1 kg = 100 dkg. 100 : 4 = 25 dkg.', <StripQ top="1 kg = 100 dkg" n={4} />),
  q(2, 'Hosszúság', 'Hány cm az 1 m ötöde?', ['20 cm', '5 cm', '50 cm', '80 cm'], '1 m = 100 cm. 100 : 5 = 20 cm.', <StripQ top="1 m = 100 cm" n={5} />),
  q(2, 'Idő', 'Hány perc az 1 óra harmada?', ['20 perc', '3 perc', '30 perc', '15 perc'], '60 : 3 = 20 perc.', <ClockQ n={3} shade={20} />),
  q(2, 'Űrtartalom', 'Hány cl az 1 dl fele?', ['5 cl', '50 cl', '2 cl', '20 cl'], '1 dl = 10 cl. 10 : 2 = 5 cl.'),
  q(2, 'Fele', 'Mennyi a 400 fele?', ['200', '398', '800', '100'], '400 : 2 = 200.'),
  q(2, 'Harmada', 'Mennyi a 90 harmada?', ['30', '87', '60', '3'], '90 : 3 = 30. Gondolj a 9 : 3 = 3-ra!'),
  q(2, 'Tizede', 'A csík 800-at ér. Mennyi a 800 tizede?', ['80', '8', '790', '100'], '800 : 10 = 80.', <StripQ top="800" n={10} />),
  q(2, 'Melyik nagyobb?', 'Ugyanakkora torták. Melyik szelet a nagyobb?', ['1 harmad', '1 ötöd', 'egyformák', 'nem lehet tudni'], '3 részre vágva nagyobbak a szeletek, mint 5 részre vágva.', <TwoPies a={[3, 1]} b={[5, 1]} la="1 harmad" lb="1 ötöd" />),
  q(2, 'Melyik több?', 'Melyik csíkon van több piros?', ['B: 4 ötöd', 'A: 2 ötöd', 'egyformák', 'nem lehet tudni'], 'Mindkét csík 5 egyenlő részből áll. 4 rész több, mint 2.', <TwoBars n={5} a={2} b={4} />),
  q(2, 'Melyik kisebb?', 'Melyik a legkisebb rész?', ['1 tized', '1 ketted', '1 negyed', '1 ötöd'], 'Minél több részre osztjuk az egészet, annál kisebb egy rész. A 10 rész a legtöbb.'),
  q(2, 'A rész neve', 'Hányad részét színeztük pirosra?', ['3 nyolcad', '5 nyolcad', '3 hatod', '1 nyolcad'], '8 egyenlő rész, 3 piros: 3 nyolcad.', <PieQ n={8} k={3} />),
  q(2, 'Ami maradt', 'Hányad része NEM piros a körnek?', ['1 hatod', '5 hatod', '6 hatod', '1 ötöd'], '6 részből 5 piros, 1 fehér: 1 hatod.', <PieQ n={6} k={5} />),
  q(2, 'Színes rudak', 'A bordó rúd az 1 egész. Hányad része a piros rúd?', ['1 ketted', '1 negyed', '1 nyolcad', '1 harmad'], '2 piros rúd ér fel a bordóval. 1 piros: 1 ketted.', <RodsQ whole={8} part={4} />),
  q(2, 'Színes rudak', 'A narancssárga rúd az 1 egész. Hányad része a sárga rúd?', ['1 ketted', '1 ötöd', '1 tized', '1 harmad'], '2 sárga rúd ér fel a narancssárgával: 1 ketted.', <RodsQ whole={10} part={5} />),
  q(
    2,
    'Szakasz',
    'Mérd meg a szakaszt! Milyen hosszú a harmada?',
    ['3 cm', '6 cm', '9 cm', '27 cm'],
    'A szakasz 9 cm. 9 : 3 = 3 cm.',
    (
      <QFig h={105}>
        <SegmentRuler x={21} y={42} cm={9} u={22} />
        <text x={120} y={22} textAnchor="middle" fontSize="14" fontWeight="bold" fill={UNK}>harmada = ?</text>
      </QFig>
    )
  ),
  q(
    2,
    'Egyenlő részek',
    'Hány negyed ugyanannyi, mint 1 ketted?',
    ['2 negyed', '1 negyed', '4 negyed', '3 negyed'],
    'A fél csík ugyanolyan hosszú, mint 2 negyed.',
    (
      <QFig h={110}>
        <Bar x={20} y={16} w={200} h={34} n={2} k={1} color="#fbbf24" />
        <Bar x={20} y={62} w={200} h={34} n={4} />
        <text x={70} y={86} textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
      </QFig>
    )
  ),
  q(2, 'Ami maradt', 'A pizza 1 negyedét megetted. Mennyi maradt?', ['3 negyed', '1 negyed', '4 negyed', '2 negyed'], '4 negyed az egész. 4 − 1 = 3, tehát 3 negyed maradt.', <PieQ n={4} k={1} color="#cbd5e1" />),
  q(2, 'Hatoda', 'Mennyi a 240 hatoda?', ['40', '234', '60', '30'], '240 : 6 = 40, mert 6 · 40 = 240.'),
  q(2, 'Tizede', 'Mennyi az 1000 tizede?', ['100', '10', '990', '500'], '1000 : 10 = 100.'),
  q(2, 'Idő', 'Hány perc a 2 óra fele?', ['60 perc', '30 perc', '120 perc', '90 perc'], '2 óra = 120 perc. 120 : 2 = 60 perc.'),
  q(2, 'Űrtartalom', 'Az 1 l vízből kiöntjük a tizedét. Hány dl ez?', ['1 dl', '10 dl', '9 dl', '5 dl'], '1 l = 10 dl. 10 : 10 = 1 dl.'),
  q(2, 'Negyede', 'Mennyi a 16 alma negyede?', ['4', '12', '8', '2'], '4 egyenlő sor, egy sorban 4 alma. 16 : 4 = 4.', <Objs n={16} k={4} />),
  q(2, 'Hosszúság', 'Hány mm az 1 cm fele?', ['5 mm', '2 mm', '50 mm', '1 mm'], '1 cm = 10 mm. 10 : 2 = 5 mm.'),
  q(2, 'A rész neve', 'Hányad része piros a téglalapnak?', ['5 hatod', '1 hatod', '5 ötöd', '6 hatod'], '6 egyenlő rész, ebből 5 piros: 5 hatod.', <GridQ rows={2} cols={3} k={5} />),
  q(2, 'Az egész', 'Melyik ugyanannyi, mint 1 egész?', ['5 ötöd', '1 ötöd', '4 ötöd', '5 tized'], 'Ha mind az 5 ötödöt veszed, megvan az egész.'),
  q(2, 'Negyede', 'Egy 60 cm-es szalag negyedét levágod. Hány cm-t vágsz le?', ['15 cm', '56 cm', '20 cm', '30 cm'], '60 : 4 = 15 cm.'),
  q(2, 'Színes rudak', 'A lila rúd az 1 egész. Melyik rúd az 1 harmada?', ['rózsaszín (2 kocka)', 'világoszöld (3 kocka)', 'fehér (1 kocka)', 'piros (4 kocka)'], 'A lila 6 kocka. 6 : 3 = 2, ez a rózsaszín rúd.', <RodsQ whole={6} part={2} showPartName={false} />),
  q(2, 'Tömeg', 'Hány dkg a fél kg?', ['50 dkg', '2 dkg', '20 dkg', '25 dkg'], '1 kg = 100 dkg. 100 : 2 = 50 dkg.', <StripQ top="1 kg = 100 dkg" n={2} />),

  // =============================== 3. szint ===============================
  q(3, 'Egymás felé', 'A 800 m-es út két végéről indultok. Te a felét, a barátod a negyedét tette meg. Milyen messze vagytok egymástól?', ['200 m', '600 m', '400 m', '100 m'], 'Fele: 400 m. Negyede: 200 m. 400 + 200 = 600. 800 − 600 = 200 m.', <RoadQ n={4} a={2} b={1} total="800 m" />),
  q(3, 'Mennyi maradt?', 'Van 1 kg lisztünk. A tizedét felhasználtuk. Hány dkg maradt?', ['90 dkg', '10 dkg', '9 dkg', '99 dkg'], '1 kg = 100 dkg. A tizede 10 dkg. 100 − 10 = 90 dkg.', <StripQ top="1 kg = 100 dkg" n={10} fill={[]} cross={[0]} labels={[]} />),
  q(3, 'Az egész', 'Egy szakasz fele 7 cm. Milyen hosszú az egész szakasz?', ['14 cm', '9 cm', '7 cm', '3 cm'], 'Az egész 2 ilyen részből áll: 2 · 7 = 14 cm.', <StripQ top="?" n={2} labels={['7 cm', null]} />),
  q(3, 'Az egész', 'Egy szakasz negyede 3 cm. Milyen hosszú az egész szakasz?', ['12 cm', '7 cm', '6 cm', '1 cm'], 'Az egész 4 ilyen részből áll: 4 · 3 = 12 cm.', <StripQ top="?" n={4} labels={['3 cm', null, null, null]} />),
  q(3, 'Idő', 'A 3 órás kirándulás hatodát pihenéssel töltöttük. Hány percig pihentünk?', ['30 perc', '18 perc', '20 perc', '60 perc'], '3 óra = 180 perc. 180 : 6 = 30 perc.'),
  q(3, 'Két lépés', '24 mandarin volt. A felét megettétek. A maradék negyedét odaadod. Hány mandarin marad?', ['9', '3', '12', '6'], 'Fele: 24 : 2 = 12 maradt. Negyede: 12 : 4 = 3. Marad: 12 − 3 = 9.', <Objs n={24} k={2} faded={1} />),
  q(3, 'Mennyivel több?', 'Az 1 m-es szalag negyedét Lili, a tizedét Dani kapja. Hány cm-rel kap többet Lili?', ['15 cm', '35 cm', '75 cm', '10 cm'], 'Negyede: 25 cm. Tizede: 10 cm. 25 − 10 = 15 cm.'),
  q(3, 'Mértékváltás', 'A kakaóba három és fél dl tejet öntesz. Hány cl ez?', ['35 cl', '350 cl', '30 cl', '53 cl'], '3 dl = 30 cl. Fél dl = 5 cl. Együtt 35 cl.'),
  q(
    3,
    'Idő',
    'A film két és fél óra hosszú. Hány perc ez?',
    ['150 perc', '250 perc', '130 perc', '120 perc'],
    '2 óra = 120 perc. Fél óra = 30 perc. 120 + 30 = 150 perc.',
    (
      <QFig h={110}>
        <ClockPie cx={44} cy={55} r={36} shade={60} nums={false} />
        <ClockPie cx={124} cy={55} r={36} shade={60} nums={false} />
        <ClockPie cx={204} cy={55} r={36} n={2} shade={30} nums={false} />
        <text x={84} y={62} textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">+</text>
        <text x={164} y={62} textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">+</text>
      </QFig>
    )
  ),
  q(3, 'Egymás felé', 'Az 1000 m-es út két végéről indultok. Mindketten az út negyedét tettétek meg. Milyen messze vagytok egymástól?', ['500 m', '250 m', '750 m', '200 m'], 'Negyede: 250 m. Kettőtök együtt 500 m. 1000 − 500 = 500 m.', <RoadQ n={4} a={1} b={1} total="1000 m" />),
  q(3, 'Ami maradt', 'A pizza 8 egyenlő szelet. Te 3 nyolcadát, a testvéred 2 nyolcadát etted meg (szürke). Mennyi maradt?', ['3 nyolcad', '5 nyolcad', '2 nyolcad', '1 nyolcad'], '3 + 2 = 5 nyolcadot ettetek meg. 8 − 5 = 3, tehát 3 nyolcad maradt.', <PieQ n={8} k={5} color="#cbd5e1" />),
  q(3, 'Sorrend', 'Melyik a helyes sorrend a legkisebbtől a legnagyobbig?', ['1 nyolcad, 1 negyed, 1 ketted', '1 ketted, 1 negyed, 1 nyolcad', '1 negyed, 1 nyolcad, 1 ketted', '1 nyolcad, 1 ketted, 1 negyed'], 'Több rész → kisebb rész. A nyolcad a legkisebb, a ketted a legnagyobb.'),
  q(3, 'Melyik több?', 'Melyik a több: a 60 harmada vagy a 60 negyede? Mennyivel?', ['a harmada, 5-tel', 'a negyede, 5-tel', 'a harmada, 1-gyel', 'egyenlők'], 'Harmada: 60 : 3 = 20. Negyede: 60 : 4 = 15. 20 − 15 = 5.'),
  q(3, 'Az egész', 'Egy szám negyede 25. Melyik ez a szám?', ['100', '29', '21', '50'], 'A szám 4 ilyen részből áll: 4 · 25 = 100.'),
  q(3, 'Két lépés', 'Egy szám tizede 30. Mennyi ennek a számnak a fele?', ['150', '15', '60', '300'], 'A szám: 10 · 30 = 300. A fele: 300 : 2 = 150.'),
  q(3, 'Színes rudak', 'A narancssárga rúd az 1 egész (10 kocka). Melyik rúd az 1 ötöde?', ['rózsaszín (2 kocka)', 'sárga (5 kocka)', 'fehér (1 kocka)', 'piros (4 kocka)'], '10 : 5 = 2. A 2 kockás rózsaszín rúd az 1 ötöd.', <RodsQ whole={10} part={2} showPartName={false} />),
  q(3, 'Mennyi maradt?', 'A futópálya 480 m. A negyedénél tartasz. Hány m van még a célig?', ['360 m', '120 m', '240 m', '476 m'], 'Negyede: 480 : 4 = 120 m. Hátra van: 480 − 120 = 360 m.', <StripQ top="480 m" n={4} labels={[]} />),
  q(3, 'Ami hiányzik', 'A csík 2 ötödét kiszínezted. Hány ötödöt kell még kiszínezni, hogy az egész piros legyen?', ['3 ötödöt', '2 ötödöt', '5 ötödöt', '1 ötödöt'], 'Az egész 5 ötöd. 5 − 2 = 3 ötöd hiányzik.', <BarQ n={5} k={2} />),
  q(3, 'Mennyi maradt?', '900 Ft-od volt. A harmadát elköltötted. Mennyi pénzed maradt?', ['600 Ft', '300 Ft', '897 Ft', '450 Ft'], 'Harmada: 900 : 3 = 300 Ft. Maradt: 900 − 300 = 600 Ft.'),
  q(3, 'Mennyi maradt?', 'Egy 2 m-es lécből levágod az ötödét. Hány cm marad?', ['160 cm', '40 cm', '195 cm', '150 cm'], '2 m = 200 cm. Ötöde: 200 : 5 = 40 cm. Marad: 200 − 40 = 160 cm.'),
  q(3, 'Idő', '4 óra szabadidőd nyolcadát olvasással töltöd. Hány percig olvasol?', ['30 perc', '8 perc', '40 perc', '32 perc'], '4 óra = 240 perc. 240 : 8 = 30 perc.'),
  q(3, 'Hajtogatás', 'A lapot háromszor félbehajtod. Hány rész lesz, és mi a neve egy résznek?', ['8 rész, 1 nyolcad', '6 rész, 1 hatod', '3 rész, 1 harmad', '4 rész, 1 negyed'], '1 hajtás: 2 rész, 2 hajtás: 4 rész, 3 hajtás: 8 rész. Egy rész 1 nyolcad.'),
  q(3, 'Egyenlő részek', 'Bori 4 szeletre vágta a tortát. Igaz, hogy minden szelet 1 negyed?', ['Nem, mert a szeletek nem egyenlők.', 'Igen, mert 4 szelet van.', 'Igen, mert 2 + 2 = 4.', 'Nem, mert az 1 harmad.'], 'A negyedek egyforma nagyok. Itt 2 nagy és 2 kicsi szelet van, ezért ezek nem negyedek.', <PieQ bounds={[0, 120, 180, 300, 360]} />),
  q(3, 'Melyik több?', 'Melyik a legtöbb?', ['az 1 m fele', 'a 2 m ötöde', 'a 3 m tizede', 'a 160 cm negyede'], '1 m fele: 50 cm. 2 m ötöde: 40 cm. 3 m tizede: 30 cm. 160 cm negyede: 40 cm. A legtöbb az 50 cm.'),
  q(3, 'Színes rudak', 'A bordó rúd az 1 egész (8 kocka). Hány rózsaszín rúd fér ki a hosszán, és hányad része egy rózsaszín?', ['4 db, 1 negyed', '2 db, 1 ketted', '8 db, 1 nyolcad', '4 db, 1 ketted'], 'A rózsaszín 2 kocka. 8 : 2 = 4 darab fér ki. 4 egyenlő rész: 1 negyed.', <RodsQ whole={8} part={2} />),
  q(
    3,
    'Szakasz',
    'Mérd meg! Mennyi a szakasz ötöde és tizede együtt?',
    ['3 cm', '15 cm', '7 cm', '2 cm'],
    'A szakasz 10 cm. Ötöde: 2 cm. Tizede: 1 cm. 2 + 1 = 3 cm.',
    (
      <QFig h={105}>
        <SegmentRuler x={20} y={42} cm={10} u={20} />
        <text x={120} y={22} textAnchor="middle" fontSize="14" fontWeight="bold" fill={UNK}>ötöde + tizede = ?</text>
      </QFig>
    )
  ),
  q(3, 'Két lépés', 'Egy szakasz harmada 4 cm. Mennyi a szakasz fele?', ['6 cm', '2 cm', '8 cm', '12 cm'], 'Az egész: 3 · 4 = 12 cm. A fele: 12 : 2 = 6 cm.'),
  q(3, 'Egymás felé', 'A 600 m-es út két végéről indultok. Mindketten az út harmadát tettétek meg. Milyen messze vagytok egymástól?', ['200 m', '400 m', '300 m', '100 m'], 'Harmada: 200 m. Együtt 400 m. 600 − 400 = 200 m.', <RoadQ n={3} a={1} b={1} total="600 m" />),
  q(3, 'Mennyi maradt?', 'Az 1 l üdítő 2 ötödét megittátok. Hány dl maradt?', ['6 dl', '4 dl', '8 dl', '2 dl'], '1 l = 10 dl. 1 ötöd: 2 dl, 2 ötöd: 4 dl. Maradt: 10 − 4 = 6 dl.'),
  q(3, 'Mennyi maradt?', '36 golyóból a negyede piros, a többi kék. Hány kék golyó van?', ['27', '9', '32', '12'], 'Piros: 36 : 4 = 9. Kék: 36 − 9 = 27.', <Objs n={36} k={4} kind="candy" />)
];

export const FRACTIONS_EXAM_G3_QUESTIONS: QuizQuestion[] = QUESTIONS;

export const FractionsExamG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="tortes-szamok"
      topicId="g3-frac-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="4. Gyakorlás, tudáspróba – Kvíz"
      subtitle="90 feladat 3 szinten: egyenlő részek, a részek neve, összehasonlítás, színes rudak, törtrész mennyiségekből, az egész, szöveges feladatok."
      badge="3. OSZTÁLY • XIV. ISMERKEDÉS A TÖRTEKKEL • TUDÁSPRÓBA"
      questions={FRACTIONS_EXAM_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'A részek neve',
          items: ['Csak egyenlő részek számítanak!', '2 rész: ketted, 3: harmad, 4: negyed, 5: ötöd', '6: hatod, 8: nyolcad, 10: tized. 4 negyed = 1 egész.']
        },
        {
          title: 'Melyik nagyobb?',
          items: ['Több részre vágod → kisebb egy rész: 1 nyolcad < 1 negyed < 1 ketted.', 'Ugyanannyi részből: több színes = több (3 ötöd > 2 ötöd).', '2 negyed = 1 ketted.']
        },
        {
          title: 'Mennyi a része?',
          items: ['Fele : 2, harmada : 3, negyede : 4, tizede : 10.', 'Előbb válts át: 1 kg = 100 dkg, 1 m = 100 cm, 1 óra = 60 perc.', 'Ha a negyede 25, az egész 4 · 25 = 100.']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<FractionsExamG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<FractionsExamG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default FractionsExamG3Quiz;
