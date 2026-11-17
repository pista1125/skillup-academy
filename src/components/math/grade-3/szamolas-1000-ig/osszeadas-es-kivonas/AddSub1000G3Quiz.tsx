import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { AddSub1000G3Matcher } from './AddSub1000G3Matcher';
import { AddSub1000G3Sorter } from './AddSub1000G3Sorter';
import { UNK, QFig, HundredFlat, Note, RowFig } from '../szamok-1000-ig/Numbers1000G3Parts';
import { JumpLine, Jump, PartBar, Tag } from './AddSub1000G3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

/** Százas lapok: két csoport „+” jellel, vagy 10 lap, ebből néhány áthúzva. */
const FlatsFig: React.FC<{ a: number; b: number; minus?: boolean }> = ({ a, b, minus }) => {
  const s = 2;
  const f = s * 10;
  if (minus) {
    const x0 = (240 - (a * (f + 4) - 4)) / 2;
    return (
      <QFig h={64}>
        {Array.from({ length: a }, (_, i) => (
          <g key={i}>
            <HundredFlat x={x0 + i * (f + 4)} y={18} s={s} color={i >= a - b ? '#fca5a5' : '#ef4444'} />
            {i >= a - b && <line x1={x0 + i * (f + 4) - 2} y1={18 + f + 2} x2={x0 + i * (f + 4) + f + 2} y2={16} stroke="#0f172a" strokeWidth="2.5" />}
          </g>
        ))}
      </QFig>
    );
  }
  const w = (a + b) * (f + 4) + 18;
  const x0 = (240 - w) / 2;
  return (
    <QFig h={64}>
      {Array.from({ length: a }, (_, i) => (
        <HundredFlat key={`a${i}`} x={x0 + i * (f + 4)} y={18} s={s} />
      ))}
      <text x={x0 + a * (f + 4) + 6} y={38} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">+</text>
      {Array.from({ length: b }, (_, i) => (
        <HundredFlat key={`b${i}`} x={x0 + a * (f + 4) + 18 + i * (f + 4)} y={18} s={s} color="#3b82f6" />
      ))}
    </QFig>
  );
};

const JumpFig: React.FC<{ lo: number; hi: number; tick?: number; labels: number[]; start: number; jumps: Jump[] }> = ({ lo, hi, tick = 10, labels, start, jumps }) => (
  <QFig h={118}>
    <JumpLine lo={lo} hi={hi} tick={tick} labels={labels} start={start} jumps={jumps} y={64} />
  </QFig>
);

const BarFig: React.FC<{ total: string; known: number; whole: number; unknownLabel?: string }> = ({ total, known, whole, unknownLabel }) => (
  <QFig h={84}>
    <PartBar x={20} y={36} w={200} total={total} known={known} whole={whole} unknownLabel={unknownLabel} />
  </QFig>
);

/** Két ismert rész, az egész „?”. */
const SumBarFig: React.FC<{ a: number; b: number; la: string; lb: string }> = ({ a, b, la, lb }) => {
  const W = 200;
  const wa = (W * a) / (a + b);
  return (
    <QFig h={96}>
      <path d="M 20 30 L 20 24 L 220 24 L 220 30" fill="none" stroke="#334155" strokeWidth="1.5" />
      <text x="120" y="19" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>?</text>
      <rect x="20" y="36" width={wa} height="30" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.8" />
      <rect x={20 + wa} y="36" width={W - wa} height="30" fill="#fde68a" stroke="#a16207" strokeWidth="1.8" />
      <text x={20 + wa / 2} y="56" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">{a}</text>
      <text x={20 + wa + (W - wa) / 2} y="56" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#713f12">{b}</text>
      <text x={20 + wa / 2} y="84" textAnchor="middle" fontSize="11" fill="#334155">{la}</text>
      <text x={20 + wa + (W - wa) / 2} y="84" textAnchor="middle" fontSize="11" fill="#334155">{lb}</text>
    </QFig>
  );
};

/** Két csík összehasonlítása. */
const CompareFig: React.FC<{ a: number; b: number; la: string; lb: string; bLabel?: string; diffLabel?: string }> = ({ a, b, la, lb, bLabel, diffLabel = '?' }) => {
  const W = 160;
  const wa = W;
  const wb = (W * b) / a;
  return (
    <QFig h={92}>
      <text x="14" y="32" fontSize="11" fill="#334155">{la}</text>
      <rect x="64" y="16" width={wa} height="24" fill="#fca5a5" stroke="#b91c1c" strokeWidth="1.8" />
      <text x={64 + wa / 2} y="33" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7f1d1d">{a}</text>
      <text x="14" y="68" fontSize="11" fill="#334155">{lb}</text>
      <rect x="64" y="52" width={wb} height="24" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.8" />
      <text x={64 + wb / 2} y="69" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">{bLabel ?? b}</text>
      <rect x={64 + wb} y="52" width={wa - wb} height="24" fill="none" stroke={UNK} strokeWidth="1.5" strokeDasharray="4 3" />
      <text x={64 + wb + (wa - wb) / 2} y="69" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>{diffLabel}</text>
    </QFig>
  );
};

/** Árcédulák és egy 1000 Ft-os. */
const ShopFig: React.FC<{ prices: number[]; labels: string[] }> = ({ prices, labels }) => (
  <QFig h={84}>
    {prices.map((p, i) => (
      <Tag key={i} x={14 + i * 76} y={16} price={p} w={70} label={labels[i]} />
    ))}
    <Note x={168} y={18} v={1000} w={60} />
  </QFig>
);

/** Két út a könyvtártól az uszodáig a parkon vagy a boltnál át. */
const RoutesFig: React.FC = () => (
  <QFig h={130}>
    <circle cx="30" cy="66" r="13" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" />
    <text x="30" y="96" textAnchor="middle" fontSize="10" fill="#1e3a8a">könyvtár</text>
    <circle cx="210" cy="66" r="13" fill="#bbf7d0" stroke="#15803d" strokeWidth="2" />
    <text x="210" y="96" textAnchor="middle" fontSize="10" fill="#166534">uszoda</text>
    <circle cx="120" cy="22" r="9" fill="#fde68a" stroke="#a16207" strokeWidth="2" />
    <circle cx="120" cy="110" r="9" fill="#fecaca" stroke="#b91c1c" strokeWidth="2" />
    <path d="M 42 58 L 111 25" stroke="#7c3aed" strokeWidth="3" />
    <path d="M 129 25 L 198 58" stroke="#7c3aed" strokeWidth="3" />
    <path d="M 42 74 L 111 107" stroke="#ea580c" strokeWidth="3" />
    <path d="M 129 107 L 198 74" stroke="#ea580c" strokeWidth="3" />
    <text x="60" y="32" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#6d28d9">280 m</text>
    <text x="180" y="32" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#6d28d9">350 m</text>
    <text x="60" y="110" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#c2410c">390 m</text>
    <text x="180" y="110" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#c2410c">270 m</text>
    <text x="120" y="45" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6d28d9">A: park</text>
    <text x="120" y="92" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#c2410c">B: bolt</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const ADD_SUB_1000_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'as1000g3-q1',
    level: 1,
    questionTypeBadge: 'Kerek százasok',
    figure: <FlatsFig a={4} b={5} />,
    question: '400 + 500 = ?',
    options: ['900', '90', '800', '450'],
    correctAnswer: 0,
    explanation: '4 százas + 5 százas = 9 százas. 400 + 500 = 900.'
  },
  {
    id: 'as1000g3-q2',
    level: 1,
    questionTypeBadge: 'Kerek százasok',
    figure: <FlatsFig a={10} b={3} minus />,
    question: '1000 − 300 = ?',
    options: ['700', '600', '300', '800'],
    correctAnswer: 0,
    explanation: '10 százasból elveszel 3-at, marad 7 százas: 700.'
  },
  {
    id: 'as1000g3-q3',
    level: 1,
    questionTypeBadge: 'Összeadás',
    question: '650 + 30 = ?',
    options: ['680', '950', '653', '620'],
    correctAnswer: 0,
    explanation: '5 tízes + 3 tízes = 8 tízes. 650 + 30 = 680.'
  },
  {
    id: 'as1000g3-q4',
    level: 1,
    questionTypeBadge: 'Kivonás',
    figure: <JumpFig lo={800} hi={900} labels={[800, 850, 900]} start={870} jumps={[{ by: -50 }]} />,
    question: '870 − 50 = ?',
    options: ['820', '370', '920', '830'],
    correctAnswer: 0,
    explanation: '7 tízesből elveszel 5-öt, marad 2 tízes. 870 − 50 = 820.'
  },
  {
    id: 'as1000g3-q5',
    level: 1,
    questionTypeBadge: 'Pótlás 1000-re',
    figure: <BarFig total="1000" known={600} whole={1000} />,
    question: '600 + □ = 1000. Mennyi a □?',
    options: ['400', '500', '300', '600'],
    correctAnswer: 0,
    explanation: '6 százashoz 4 százas kell, hogy 10 legyen. □ = 400.'
  },
  {
    id: 'as1000g3-q6',
    level: 1,
    questionTypeBadge: 'Átlépés',
    figure: <JumpFig lo={300} hi={420} labels={[300, 350, 400]} start={340} jumps={[{ by: 60 }]} />,
    question: '340 + 60 = ?',
    options: ['400', '300', '410', '306'],
    correctAnswer: 0,
    explanation: '4 tízes + 6 tízes = 10 tízes = 1 százas. 340 + 60 = 400.'
  },
  {
    id: 'as1000g3-q7',
    level: 1,
    questionTypeBadge: 'Kivonás',
    figure: <JumpFig lo={680} hi={740} labels={[680, 700, 720, 740]} start={720} jumps={[{ by: -20 }]} />,
    question: '720 − 20 = ?',
    options: ['700', '740', '500', '710'],
    correctAnswer: 0,
    explanation: '2 tízesből elveszel 2-t, a kerek százas marad: 700.'
  },
  {
    id: 'as1000g3-q8',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <ShopFig prices={[600]} labels={['kirakó']} />,
    question: 'Van 1000 Ft-od. Veszel egy 600 Ft-os kirakót. Mennyi pénzed marad?',
    options: ['400 Ft', '600 Ft', '500 Ft', '300 Ft'],
    correctAnswer: 0,
    explanation: '1000 − 600 = 400. Marad 400 Ft.'
  },
  {
    id: 'as1000g3-q9',
    level: 1,
    questionTypeBadge: 'Az 1000 bontása',
    question: 'Melyik két kerek százas összege 1000?',
    options: ['300 és 700', '400 és 500', '600 és 300', '200 és 900'],
    correctAnswer: 0,
    explanation: '3 százas + 7 százas = 10 százas = 1000.'
  },
  {
    id: 'as1000g3-q10',
    level: 1,
    questionTypeBadge: 'Összeadás',
    question: '800 + 150 = ?',
    options: ['950', '650', '930', '815'],
    correctAnswer: 0,
    explanation: '800 + 100 = 900, és még 50: 950.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'as1000g3-q11',
    level: 2,
    questionTypeBadge: 'Átlépés',
    figure: <JumpFig lo={250} hi={600} labels={[300, 400, 500, 600]} start={280} jumps={[{ by: 200 }, { by: 70 }]} />,
    question: '280 + 270 = ?',
    options: ['550', '450', '540', '650'],
    correctAnswer: 0,
    explanation: 'Előbb a százasok: 280 + 200 = 480. Aztán a tízesek: 480 + 70 = 550.'
  },
  {
    id: 'as1000g3-q12',
    level: 2,
    questionTypeBadge: 'Átlépés',
    figure: <JumpFig lo={250} hi={650} labels={[300, 400, 500, 600]} start={620} jumps={[{ by: -300 }, { by: -30 }]} />,
    question: '620 − 330 = ?',
    options: ['290', '310', '390', '300'],
    correctAnswer: 0,
    explanation: '620 − 300 = 320. Aztán 320 − 30: 320 − 20 = 300, és még 10: 290.'
  },
  {
    id: 'as1000g3-q13',
    level: 2,
    questionTypeBadge: 'Átlépés',
    figure: <JumpFig lo={560} hi={700} labels={[600, 650, 700]} start={590} jumps={[{ by: 80 }]} />,
    question: '590 + 80 = ?',
    options: ['670', '570', '680', '660'],
    correctAnswer: 0,
    explanation: '590 + 10 = 600, és még 70: 670.'
  },
  {
    id: 'as1000g3-q14',
    level: 2,
    questionTypeBadge: 'Kivonás',
    question: '930 − 610 = ?',
    options: ['320', '310', '420', '220'],
    correctAnswer: 0,
    explanation: '930 − 600 = 330, aztán 330 − 10 = 320.'
  },
  {
    id: 'as1000g3-q15',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <BarFig total="970" known={440} whole={970} />,
    question: '□ + 440 = 970. Mennyi a □?',
    options: ['530', '430', '630', '570'],
    correctAnswer: 0,
    explanation: '970 − 440 = 530. Ellenőrzés: 530 + 440 = 970.'
  },
  {
    id: 'as1000g3-q16',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <BarFig total="1000" known={260} whole={1000} />,
    question: '1000 − □ = 260. Mennyi a □?',
    options: ['740', '760', '840', '640'],
    correctAnswer: 0,
    explanation: 'A 260-hoz kell még 740, hogy 1000 legyen. Ellenőrzés: 1000 − 740 = 260.'
  },
  {
    id: 'as1000g3-q17',
    level: 2,
    questionTypeBadge: 'Pótlás 1000-re',
    figure: <BarFig total="1000" known={370} whole={1000} />,
    question: '370 + □ = 1000. Mennyi a □?',
    options: ['630', '730', '670', '600'],
    correctAnswer: 0,
    explanation: '370 + 30 = 400, és 400 + 600 = 1000. 30 + 600 = 630.'
  },
  {
    id: 'as1000g3-q18',
    level: 2,
    questionTypeBadge: 'Összeadás',
    question: 'Melyik összeg 680?',
    options: ['450 + 230', '350 + 230', '450 + 330', '380 + 400'],
    correctAnswer: 0,
    explanation: '450 + 200 = 650, 650 + 30 = 680.'
  },
  {
    id: 'as1000g3-q19',
    level: 2,
    questionTypeBadge: 'Ellenőrzés',
    question: '750 − 280 = 470. Melyik összeadással ellenőrzöd?',
    options: ['470 + 280', '470 + 750', '750 + 280', '470 + 470'],
    correctAnswer: 0,
    explanation: 'Az eredményhez hozzáadod a kivont számot: 470 + 280 = 750. Ez a kezdő szám, tehát jó.'
  },
  {
    id: 'as1000g3-q20',
    level: 2,
    questionTypeBadge: 'Sorozat',
    figure: <RowFig items={['500', '525', '550', '575', '?']} />,
    question: 'Huszonötösével lépünk. Melyik szám jön?',
    options: ['600', '580', '590', '625'],
    correctAnswer: 0,
    explanation: '575 + 25 = 600.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'as1000g3-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <SumBarFig a={460} b={380} la="mesekönyv" lb="regény" />,
    question: 'A könyvtárban 460 mesekönyv és 380 regény van. Hány könyv ez összesen?',
    options: ['840', '740', '830', '80'],
    correctAnswer: 0,
    explanation: '460 + 300 = 760, 760 + 80 = 840.'
  },
  {
    id: 'as1000g3-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <CompareFig a={640} b={380} la="hétfő" lb="kedd" />,
    question: 'Hétfőn 640 néző volt a bábszínházban, kedden 380. Mennyivel kevesebben voltak kedden?',
    options: ['260', '340', '240', '360'],
    correctAnswer: 0,
    explanation: '640 − 300 = 340, 340 − 80 = 260. Kedden 260-nal kevesebben voltak.'
  },
  {
    id: 'as1000g3-q23',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: <ShopFig prices={[450, 230]} labels={['könyv', 'toll']} />,
    question: 'Van 1000 Ft-od. Megveszed a könyvet és a tollat. Mennyi pénzed marad?',
    options: ['320 Ft', '680 Ft', '420 Ft', '220 Ft'],
    correctAnswer: 0,
    explanation: '450 + 230 = 680 Ft-ot fizetsz. 1000 − 680 = 320 Ft marad.'
  },
  {
    id: 'as1000g3-q24',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy építőkészletben 1000 elem van. Előbb 350-et építesz be, aztán még 280-at. Hány elem maradt a dobozban?',
    options: ['370', '630', '470', '270'],
    correctAnswer: 0,
    explanation: '350 + 280 = 630 elemet építettél be. 1000 − 630 = 370 maradt.'
  },
  {
    id: 'as1000g3-q25',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy dobozban 190 gyöngy van. Kétszer teszel bele 300-at. Hány gyöngy lesz benne?',
    options: ['790', '490', '600', '890'],
    correctAnswer: 0,
    explanation: '190 + 300 = 490, aztán 490 + 300 = 790.'
  },
  {
    id: 'as1000g3-q26',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: '490 + □ < 840. Melyik szám írható a □ helyére?',
    options: ['340', '350', '360', '400'],
    correctAnswer: 0,
    explanation: '490 + 350 = 840 pont annyi, nem kevesebb. 490 + 340 = 830, és 830 < 840.'
  },
  {
    id: 'as1000g3-q27',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: '900 − 300 > 770 − □. Melyik szám írható a □ helyére?',
    options: ['180', '170', '160', '100'],
    correctAnswer: 0,
    explanation: '900 − 300 = 600. 770 − 180 = 590, és 600 > 590. A 170-nél 600 = 600 lenne.'
  },
  {
    id: 'as1000g3-q28',
    level: 3,
    questionTypeBadge: 'Útvonal',
    figure: <RoutesFig />,
    question: 'Melyik út rövidebb a könyvtártól az uszodáig, és mennyivel?',
    options: ['Az A, 30 m-rel', 'A B, 30 m-rel', 'Az A, 130 m-rel', 'Egyforma hosszúak'],
    correctAnswer: 0,
    explanation: 'A: 280 + 350 = 630 m. B: 390 + 270 = 660 m. 660 − 630 = 30, az A rövidebb 30 m-rel.'
  },
  {
    id: 'as1000g3-q29',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számra',
    figure: <BarFig total="1000" known={270} whole={1000} />,
    question: 'Gondoltam egy számra. Ha hozzáadok 270-et, 1000-et kapok. Melyik számra gondoltam?',
    options: ['730', '830', '770', '630'],
    correctAnswer: 0,
    explanation: '1000 − 270 = 730. Ellenőrzés: 730 + 270 = 1000.'
  },
  {
    id: 'as1000g3-q30',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <CompareFig a={560} b={390} la="piros" lb="kék" bLabel="?" diffLabel="170" />,
    question: 'A piros szalag 560 cm. A kék 170 cm-rel rövidebb. Milyen hosszú a két szalag együtt?',
    options: ['950 cm', '730 cm', '390 cm', '850 cm'],
    correctAnswer: 0,
    explanation: 'A kék: 560 − 170 = 390 cm. Együtt: 560 + 390 = 950 cm.'
  }
];

export const AddSub1000G3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="szamolas-1000-ig"
      topicId="g3-c1000-osszeadas-quiz"
      subtopicId="osszeadas-es-kivonas"
      title="3. Összeadás és kivonás – Kvíz"
      subtitle="30 feladat 3 szinten: kerek százasok és tízesek, átlépés, pótlás 1000-re, hiányzó szám, pénz, szöveges feladatok."
      badge="3. OSZTÁLY • XI. SZÁMOLÁS 0-TÓL 1000-IG • KVÍZ"
      questions={ADD_SUB_1000_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Lépésenként',
          items: ['Előbb a százasok, aztán a tízesek', '280 + 270 = 280 + 200 + 70 = 550', '620 − 330 = 620 − 300 − 30 = 290']
        },
        {
          title: 'Átlépés',
          items: ['Ugorj a kerek százasig!', '480 + 70 = 480 + 20 + 50 = 550', '10 tízes = 1 százas']
        },
        {
          title: 'Pótlás és ellenőrzés',
          items: ['740 + 60 = 800, 800 + 200 = 1000 → 1000 − 740 = 260', 'Ellenőrzés: 470 + 280 = 750, tehát 750 − 280 = 470']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <AddSub1000G3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <AddSub1000G3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default AddSub1000G3Quiz;
