import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { DiffChangesG3Matcher } from './DiffChangesG3Matcher';
import { DiffChangesG3Sorter } from './DiffChangesG3Sorter';
import { INK, UP, DOWN, C_MIN, C_SUB, C_DIF, QFig, NumBox, Coin, PriceTag, DiffRowsFig, DiffTableFig, CompareFig, DiffBarsG, diffBarsHeight } from './DiffChangesG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

/** Pénztárca érmékkel, két árcédula: az elsőnél látszik, mennyi marad, a másodiknál „?”. */
const WalletFig: React.FC<{ coins: number[]; total: number; p1: number; p2: number }> = ({ coins, total, p1, p2 }) => (
  <QFig h={120}>
    <rect x="10" y="16" width="96" height="56" rx="10" fill="#a78bfa" stroke="#5b21b6" strokeWidth="1.8" />
    <rect x="10" y="16" width="96" height="18" rx="9" fill="#8b5cf6" stroke="#5b21b6" strokeWidth="1.8" />
    {coins.map((c, i) => (
      <Coin key={i} cx={30 + i * 28} cy={54} v={c} r={13} />
    ))}
    <text x="58" y="92" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>{total} Ft</text>
    <PriceTag x={118} y={18} text={`${p1} Ft`} w={62} fs={12.5} fill="#e0f2fe" />
    <text x="186" y="34" fontSize="12" fontWeight="bold" fill="#475569">→</text>
    <NumBox cx={214} cy={30} v={total - p1} w={40} h={24} fs={13} fill={C_DIF.fill} stroke={C_DIF.stroke} />
    <PriceTag x={118} y={62} text={`${p2} Ft`} w={62} fs={12.5} fill="#fee2e2" />
    <text x="186" y="78" fontSize="12" fontWeight="bold" fill="#475569">→</text>
    <NumBox cx={214} cy={74} v="?" w={40} h={24} fs={13} />
    <text x="176" y="108" textAnchor="middle" fontSize="11" fill="#475569">ennyi pénz marad</text>
  </QFig>
);

/** Két gyerek: ugyanannyi pénz, más-más árú vásárlás. */
const TwoBuyFig: React.FC<{ have: number; rows: { name: string; price: number }[] }> = ({ have, rows }) => (
  <QFig h={24 + rows.length * 40}>
    {rows.map((r, i) => (
      <g key={i}>
        <text x="12" y={34 + i * 40} fontSize="13" fontWeight="bold" fill="#334155">{r.name}</text>
        <NumBox cx={98} cy={30 + i * 40} v={`${have} Ft`} w={64} h={26} fs={13} fill={C_MIN.fill} stroke={C_MIN.stroke} />
        <text x="138" y={35 + i * 40} textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>−</text>
        <PriceTag x={150} y={18 + i * 40} text={`${r.price} Ft`} w={70} fs={13} fill={C_SUB.fill} />
      </g>
    ))}
  </QFig>
);

/** Életkor-táblázat: most és később; „?” = keresett. */
const AgeFig: React.FC<{ rows: { name: string; now: number | string; later: number | string }[]; laterTitle: string }> = ({ rows, laterTitle }) => (
  <QFig h={34 + rows.length * 34}>
    <text x="130" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">most</text>
    <text x="196" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">{laterTitle}</text>
    {rows.map((r, i) => (
      <g key={i}>
        <text x="16" y={47 + i * 34} fontSize="13.5" fontWeight="bold" fill="#334155">{r.name}</text>
        <NumBox cx={130} cy={42 + i * 34} v={r.now} w={50} h={26} fs={15} fill={i === 0 ? C_MIN.fill : C_SUB.fill} stroke={i === 0 ? C_MIN.stroke : C_SUB.stroke} />
        <text x="163" y={47 + i * 34} textAnchor="middle" fontSize="14" fontWeight="bold" fill={UP}>→</text>
        <NumBox cx={196} cy={42 + i * 34} v={r.later} w={50} h={26} fs={15} fill={i === 0 ? C_MIN.fill : C_SUB.fill} stroke={i === 0 ? C_MIN.stroke : C_SUB.stroke} />
      </g>
    ))}
  </QFig>
);

/** Okos kivonás: m − s, fölötte a kerekítő változás, alatta „? − ? = ?”. */
const CleverFig: React.FC<{ m: number; s: number; k: number }> = ({ m, s, k }) => (
  <QFig h={112}>
    <NumBox cx={56} cy={30} v={m} w={60} h={30} fs={17} fill={C_MIN.fill} stroke={C_MIN.stroke} />
    <text x="100" y="37" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>−</text>
    <NumBox cx={144} cy={30} v={s} w={60} h={30} fs={17} fill={C_SUB.fill} stroke={C_SUB.stroke} />
    <line x1="56" y1="47" x2="56" y2="71" stroke={UP} strokeWidth="2.4" />
    <path d="M 51 66 L 56 73 L 61 66" fill="none" stroke={UP} strokeWidth="2.4" />
    <text x="64" y="64" fontSize="13" fontWeight="bold" fill={UP}>+{k}</text>
    <line x1="144" y1="47" x2="144" y2="71" stroke={UP} strokeWidth="2.4" />
    <path d="M 139 66 L 144 73 L 149 66" fill="none" stroke={UP} strokeWidth="2.4" />
    <text x="152" y="64" fontSize="13" fontWeight="bold" fill={UP}>+{k}</text>
    <NumBox cx={56} cy={90} v={m + k} w={60} h={28} fs={16} fill={C_MIN.fill} stroke={C_MIN.stroke} />
    <text x="100" y="97" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>−</text>
    <NumBox cx={144} cy={90} v={s + k} w={60} h={28} fs={16} fill={C_SUB.fill} stroke={C_SUB.stroke} />
    <text x="186" y="97" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>=</text>
    <NumBox cx={216} cy={90} v="?" w={36} h={28} fs={16} />
  </QFig>
);

/** Csíkos ábra: kisebbítendő (kék + zöld) és kivonandó (narancs). */
const BarsFig: React.FC<{ m: number; s: number; max: number; note?: string }> = ({ m, s, max, note }) => {
  const h = diffBarsHeight(24) + (note ? 30 : 8);
  return (
    <QFig h={h}>
      <DiffBarsG m={m} s={s} x={12} y={6} W={216} max={max} h={24} fs={13} />
      {note && <text x="120" y={h - 9} textAnchor="middle" fontSize="12" fontWeight="bold" fill={UP}>{note}</text>}
    </QFig>
  );
};

/** Áthúzott árcédula, mellette az olcsóbb ár. */
const CheaperFig: React.FC<{ have: number; price: number; less: number }> = ({ have, price, less }) => (
  <QFig h={100}>
    <text x="44" y="22" textAnchor="middle" fontSize="12" fill="#475569">pénze:</text>
    <NumBox cx={44} cy={42} v={`${have} Ft`} w={66} h={28} fs={14} fill={C_MIN.fill} stroke={C_MIN.stroke} />
    <text x="128" y="22" textAnchor="middle" fontSize="12" fill="#475569">a könyv ára:</text>
    <PriceTag x={92} y={29} text={`${price} Ft`} w={74} fs={13.5} fill="#fff" />
    <line x1="94" y1="56" x2="160" y2="28" stroke={DOWN} strokeWidth="3" strokeLinecap="round" />
    <text x="128" y="82" textAnchor="middle" fontSize="13" fontWeight="bold" fill={DOWN}>{less} Ft-tal olcsóbb</text>
    <text x="204" y="22" textAnchor="middle" fontSize="12" fill="#475569">marad:</text>
    <NumBox cx={204} cy={42} v="?" w={50} h={28} fs={15} />
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const DIFF_CHANGES_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'dcg3-q1',
    level: 1,
    questionTypeBadge: 'Kisebbítendő nő',
    figure: <DiffRowsFig names rows={[[350, 130, 220], [450, 130, '?']]} changes={[['+100', null, '?']]} />,
    question: 'A kisebbítendő 100-zal nőtt. Mennyi az új különbség?',
    options: ['320', '120', '220', '330'],
    correctAnswer: 0,
    explanation: 'Ha a kisebbítendő 100-zal nő, a különbség is 100-zal nő. 220 + 100 = 320.'
  },
  {
    id: 'dcg3-q2',
    level: 1,
    questionTypeBadge: 'Kisebbítendő csökken',
    figure: <DiffRowsFig names rows={[[386, 152, 234], [376, 152, '?']]} changes={[['−10', null, '?']]} />,
    question: 'A kisebbítendő 10-zel csökkent. Mennyi az új különbség?',
    options: ['224', '244', '234', '214'],
    correctAnswer: 0,
    explanation: 'Ha a kisebbítendő 10-zel csökken, a különbség is 10-zel csökken. 234 − 10 = 224.'
  },
  {
    id: 'dcg3-q3',
    level: 1,
    questionTypeBadge: 'Kivonandó nő',
    figure: <DiffRowsFig names rows={[[475, 230, 245], [475, 240, '?']]} changes={[[null, '+10', '?']]} />,
    question: 'A kivonandó 10-zel nőtt. Mennyi az új különbség?',
    options: ['235', '255', '245', '225'],
    correctAnswer: 0,
    explanation: 'Többet veszünk el, ezért kevesebb marad. A különbség 10-zel csökken: 245 − 10 = 235.'
  },
  {
    id: 'dcg3-q4',
    level: 1,
    questionTypeBadge: 'Kivonandó csökken',
    figure: <DiffRowsFig names rows={[[480, 350, 130], [480, 250, '?']]} changes={[[null, '−100', '?']]} />,
    question: 'A kivonandó 100-zal csökkent. Mennyi az új különbség?',
    options: ['230', '30', '130', '220'],
    correctAnswer: 0,
    explanation: 'Kevesebbet veszünk el, ezért több marad. A különbség 100-zal nő: 130 + 100 = 230.'
  },
  {
    id: 'dcg3-q5',
    level: 1,
    questionTypeBadge: 'Szabály',
    question: 'A kivonandót 10-zel növelem. A kisebbítendő marad. Mi lesz a különbséggel?',
    options: ['10-zel csökken', '10-zel nő', 'nem változik', '20-szal csökken'],
    correctAnswer: 0,
    explanation: 'Ha többet veszel el, kevesebb marad. A kivonandó nő, a különbség csökken: fordítva változik.'
  },
  {
    id: 'dcg3-q6',
    level: 1,
    questionTypeBadge: 'Szabály',
    question: 'A kisebbítendőt 100-zal csökkentem. A kivonandó marad. Mi lesz a különbséggel?',
    options: ['100-zal csökken', '100-zal nő', 'nem változik', '200-zal csökken'],
    correctAnswer: 0,
    explanation: 'A kisebbítendő és a különbség ugyanarra változik. A kisebbítendő 100-zal kisebb, a különbség is 100-zal kisebb.'
  },
  {
    id: 'dcg3-q7',
    level: 1,
    questionTypeBadge: 'Hogyan változik?',
    figure: <DiffRowsFig names rows={[[247, 125, 122], [257, 135, '?']]} changes={[['+10', '+10', '?']]} />,
    question: 'Mindkét szám 10-zel nőtt. Hogyan változik a különbség?',
    options: ['nem változik', '20-szal nő', '10-zel nő', '20-szal csökken'],
    correctAnswer: 0,
    explanation: 'Ha mindkét szám ugyanannyival nő, a különbség marad. 257 − 135 = 122, ugyanannyi, mint 247 − 125.'
  },
  {
    id: 'dcg3-q8',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <WalletFig coins={[200, 200, 100]} total={500} p1={200} p2={300} />,
    question: 'A 200 Ft-os füzet helyett egy 300 Ft-osat veszel. Mennyi pénzed marad?',
    options: ['200 Ft', '400 Ft', '300 Ft', '100 Ft'],
    correctAnswer: 0,
    explanation: 'A füzet 100 Ft-tal drágább, ezért 100 Ft-tal kevesebb marad: 300 Ft − 100 Ft = 200 Ft.'
  },
  {
    id: 'dcg3-q9',
    level: 1,
    questionTypeBadge: 'Életkor',
    figure: <DiffRowsFig rows={[[9, 6, 3], [14, 11, '?']]} changes={[['+5', '+5', '?']]} />,
    question: 'Panni 9 éves, az öccse 6 éves. Hány év lesz köztük a különbség 5 év múlva?',
    options: ['3 év', '8 év', '5 év', '13 év'],
    correctAnswer: 0,
    explanation: 'Mindketten 5 évvel idősebbek lesznek. A korkülönbség nem változik: 14 − 11 = 3 év.'
  },
  {
    id: 'dcg3-q10',
    level: 1,
    questionTypeBadge: 'Táblázat',
    figure: <DiffTableFig a={[300, 310, 320, 330]} b={[100, 110, 120, 130]} s={[200, 200, 200, '?']} />,
    question: 'Mi kerül a ? helyére?',
    options: ['200', '230', '210', '330'],
    correctAnswer: 0,
    explanation: 'Mindkét szám mindig 10-zel nő. A különbség nem változik: 330 − 130 = 200.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'dcg3-q11',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig l={[465, 230]} r={[465, 250]} />,
    question: 'Melyik különbség a nagyobb, és mennyivel?',
    options: ['Az első, 20-szal', 'A második, 20-szal', 'Egyenlők.', 'Az első, 40-nel'],
    correctAnswer: 0,
    explanation: 'A kisebbítendő ugyanaz. A második kivonásban 20-szal többet veszünk el, ott 20-szal kevesebb marad. 235 > 215.'
  },
  {
    id: 'dcg3-q12',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig l={[438, 214]} r={[448, 224]} />,
    question: 'Melyik különbség a nagyobb?',
    options: ['Egyenlők.', 'A második, 10-zel', 'A második, 20-szal', 'Az első, 10-zel'],
    correctAnswer: 0,
    explanation: 'Mindkét szám 10-zel nagyobb a második kivonásban. Ilyenkor a különbség nem változik: mindkettő 224.'
  },
  {
    id: 'dcg3-q13',
    level: 2,
    questionTypeBadge: 'Táblázat',
    figure: <DiffTableFig a={[350, '?']} b={[150, 250]} s={[200, 200]} />,
    question: 'A különbség nem változott. Melyik szám kell a ? helyére?',
    options: ['450', '250', '350', '400'],
    correctAnswer: 0,
    explanation: 'A kivonandó 100-zal nőtt. Hogy a különbség maradjon, a kisebbítendőnek is 100-zal kell nőnie: 350 + 100 = 450.'
  },
  {
    id: 'dcg3-q14',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <TwoBuyFig have={500} rows={[{ name: 'Lili', price: 180 }, { name: 'Bence', price: 280 }]} />,
    question: 'Lilinek és Bencének is 500 Ft-ja van. Kinek marad több pénze, és mennyivel?',
    options: ['Lilinek, 100 Ft-tal', 'Bencének, 100 Ft-tal', 'Ugyanannyi marad.', 'Lilinek, 200 Ft-tal'],
    correctAnswer: 0,
    explanation: 'Bence 100 Ft-tal többet költ, ezért neki 100 Ft-tal kevesebb marad. Lilinek 320 Ft, Bencének 220 Ft marad.'
  },
  {
    id: 'dcg3-q15',
    level: 2,
    questionTypeBadge: 'Kivonandó nő',
    figure: <DiffRowsFig names rows={[[412, 145, 267], [412, 146, '?']]} changes={[[null, '+1', '?']]} />,
    question: 'Mennyi az új különbség?',
    options: ['266', '268', '267', '256'],
    correctAnswer: 0,
    explanation: 'A kivonandó 1-gyel nőtt, ezért a különbség 1-gyel csökken: 267 − 1 = 266.'
  },
  {
    id: 'dcg3-q16',
    level: 2,
    questionTypeBadge: 'Hogyan változik?',
    figure: <DiffRowsFig names rows={[[403, 160, 243], [393, 150, '?']]} changes={[['−10', '−10', '?']]} />,
    question: 'Hogyan változik a különbség?',
    options: ['nem változik', '20-szal csökken', '10-zel csökken', '20-szal nő'],
    correctAnswer: 0,
    explanation: 'Mindkét szám 10-zel csökkent. Ugyanannyival, ugyanarra: a különbség marad 243.'
  },
  {
    id: 'dcg3-q17',
    level: 2,
    questionTypeBadge: 'Okos kivonás',
    figure: <CleverFig m={424} s={199} k={1} />,
    question: 'Számolj okosan! 424 − 199 = ?',
    options: ['225', '223', '224', '235'],
    correctAnswer: 0,
    explanation: 'Mindkét számhoz 1-et adok: 425 − 200 = 225. A különbség nem változik.'
  },
  {
    id: 'dcg3-q18',
    level: 2,
    questionTypeBadge: 'Ugyanannyi',
    question: 'Melyik kivonásnak ugyanannyi a különbsége, mint a 436 − 198-nak?',
    options: ['438 − 200', '434 − 200', '436 − 200', '438 − 196'],
    correctAnswer: 0,
    explanation: 'Mindkét számhoz 2-t adtunk: 436 + 2 = 438 és 198 + 2 = 200. A különbség marad: 238.'
  },
  {
    id: 'dcg3-q19',
    level: 2,
    questionTypeBadge: 'Csíkos ábra',
    figure: <BarsFig m={430} s={180} max={500} note="A kék-zöld csík 20-szal hosszabb lesz." />,
    question: 'A kisebbítendő 20-szal nő, a kivonandó marad. Mennyi lesz a különbség?',
    options: ['270', '230', '250', '290'],
    correctAnswer: 0,
    explanation: 'A zöld rész a különbség. Ha a felső csík 20-szal hosszabb, a zöld rész is 20-szal hosszabb: 250 + 20 = 270.'
  },
  {
    id: 'dcg3-q20',
    level: 2,
    questionTypeBadge: 'Életkor',
    question: 'Anya 34 évvel idősebb Emmánál. Hány évvel lesz idősebb nála 10 év múlva?',
    options: ['34 évvel', '44 évvel', '24 évvel', '10 évvel'],
    correctAnswer: 0,
    explanation: 'Mindketten 10 évvel lesznek idősebbek. A korkülönbség nem változik: 34 év.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'dcg3-q21',
    level: 3,
    questionTypeBadge: 'Mindkettő változik',
    figure: <DiffRowsFig names rows={[[360, 130, 230], [460, 140, '?']]} changes={[['+100', '+10', '?']]} />,
    question: 'Mennyi az új különbség?',
    options: ['320', '340', '240', '220'],
    correctAnswer: 0,
    explanation: 'A kisebbítendő +100: a különbség 100-zal nő. A kivonandó +10: a különbség 10-zel csökken. Együtt 90-nel nő: 230 + 90 = 320.'
  },
  {
    id: 'dcg3-q22',
    level: 3,
    questionTypeBadge: 'Mindkettő változik',
    figure: <DiffRowsFig names rows={[[445, 220, 225], [435, 240, '?']]} changes={[['−10', '+20', '?']]} />,
    question: 'Mennyi az új különbség?',
    options: ['195', '215', '235', '205'],
    correctAnswer: 0,
    explanation: 'A kisebbítendő −10: a különbség 10-zel csökken. A kivonandó +20: még 20-szal csökken. Együtt 30-cal: 225 − 30 = 195.'
  },
  {
    id: 'dcg3-q23',
    level: 3,
    questionTypeBadge: 'Változtasd meg!',
    question: 'A 438 − 216 különbsége legyen 10-zel nagyobb! Melyik kivonás jó?',
    options: ['438 − 206', '438 − 226', '428 − 216', '448 − 226'],
    correctAnswer: 0,
    explanation: 'Ha a kivonandó 10-zel kisebb, 10-zel több marad. 438 − 216 = 222, 438 − 206 = 232.'
  },
  {
    id: 'dcg3-q24',
    level: 3,
    questionTypeBadge: 'Változtasd meg!',
    question: 'Melyik kivonásnak ugyanannyi a különbsége, mint a 372 − 135-nek?',
    options: ['382 − 145', '382 − 125', '362 − 145', '372 − 145'],
    correctAnswer: 0,
    explanation: 'Mindkét szám 10-zel nőtt, ugyanarra. A különbség marad: 382 − 145 = 237 és 372 − 135 = 237.'
  },
  {
    id: 'dcg3-q25',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <CheaperFig have={500} price={250} less={50} />,
    question: 'Botondnak 500 Ft-ja van. Egy 250 Ft-os könyv helyett 50 Ft-tal olcsóbbat vesz. Mennyi pénze marad?',
    options: ['300 Ft', '200 Ft', '250 Ft', '350 Ft'],
    correctAnswer: 0,
    explanation: 'A könyv ára: 250 Ft − 50 Ft = 200 Ft. Marad: 500 Ft − 200 Ft = 300 Ft. (A 250 Ft-osnál 250 Ft maradt volna, most 50 Ft-tal több.)'
  },
  {
    id: 'dcg3-q26',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig l={[413, 287]} r={[423, 277]} />,
    question: 'Melyik különbség a nagyobb, és mennyivel?',
    options: ['A második, 20-szal', 'Egyenlők.', 'A második, 10-zel', 'Az első, 20-szal'],
    correctAnswer: 0,
    explanation: 'A második kivonásban a kisebbítendő +10 (a különbség 10-zel nő), a kivonandó −10 (még 10-zel nő). Együtt 20-szal nagyobb: 146 > 126.'
  },
  {
    id: 'dcg3-q27',
    level: 3,
    questionTypeBadge: 'Okos kivonás',
    question: 'Számolj okosan! 402 − 296 = ?',
    options: ['106', '98', '116', '206'],
    correctAnswer: 0,
    explanation: 'Mindkét számhoz 4-et adok: 406 − 300 = 106. Vigyázz, a 402-ből nem 4-et kell elvenni!'
  },
  {
    id: 'dcg3-q28',
    level: 3,
    questionTypeBadge: 'Táblázat',
    figure: <DiffTableFig a={[500, 500, 500, 500]} b={[200, 210, 220, 230]} s={[300, 290, 280, '?']} />,
    question: 'Mi kerül a ? helyére?',
    options: ['270', '310', '280', '330'],
    correctAnswer: 0,
    explanation: 'A kisebbítendő marad, a kivonandó mindig 10-zel nő. Ezért a különbség mindig 10-zel csökken: 280 − 10 = 270.'
  },
  {
    id: 'dcg3-q29',
    level: 3,
    questionTypeBadge: 'Életkor',
    figure: <AgeFig laterTitle="később" rows={[{ name: 'Márk', now: 13, later: '?' }, { name: 'Hanga', now: 8, later: 15 }]} />,
    question: 'Márk 13 éves, a húga, Hanga 8 éves. Hány éves lesz Márk, amikor Hanga 15 éves lesz?',
    options: ['20', '15', '18', '28'],
    correctAnswer: 0,
    explanation: 'Márk 5 évvel idősebb (13 − 8 = 5). Ez mindig így marad. Ha Hanga 15 éves, Márk 15 + 5 = 20 éves.'
  },
  {
    id: 'dcg3-q30',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Az egyik kosárban 150 alma van, a másikban 90. Mindkettőből kiveszünk 30 almát. Mennyivel több alma marad az elsőben?',
    options: ['60-nal', '30-cal', '90-nel', '120-szal'],
    correctAnswer: 0,
    explanation: 'Mindkettőből ugyanannyit vettünk ki, a különbség nem változik: 150 − 90 = 60. (120 − 60 = 60.)'
  }
];

export const DiffChangesG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="irasbeli-kivonas"
      topicId="g3-wsub-valtozasok-quiz"
      subtopicId="a-kulonbseg-valtozasai"
      title="4. A különbség változásai – Kvíz"
      subtitle="30 feladat 3 szinten: a kisebbítendő változik, a kivonandó változik, a különbség nem változik, összehasonlítás számolás nélkül, okos kivonás."
      badge="3. OSZTÁLY • VIII. ÍRÁSBELI KIVONÁS • KVÍZ"
      questions={DIFF_CHANGES_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'A kisebbítendő változik',
          items: ['Ugyanarra változik a különbség.', 'kisebbítendő +10 → különbség +10', '350 − 120 = 230 → 450 − 120 = 330']
        },
        {
          title: 'A kivonandó változik',
          items: ['Fordítva változik a különbség!', 'kivonandó +10 → különbség −10', '450 − 120 = 330 → 450 − 220 = 230']
        },
        {
          title: 'Mindkettő változik',
          items: ['+10 és +10 → a különbség marad', 'Korkülönbség: mindig ugyanannyi', 'Okos kivonás: 435 − 198 = 437 − 200 = 237']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <DiffChangesG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <DiffChangesG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default DiffChangesG3Quiz;
