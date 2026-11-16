import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WrittenMulTwoDigitMatcher } from './WrittenMulTwoDigitMatcher';
import { WrittenMulTwoDigitSorter } from './WrittenMulTwoDigitSorter';
import { WrittenMul2Layout, WrittenMul2LayoutProps, BridgeSvg } from './WrittenMulTwoDigitFigures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek
// ---------------------------------------------------------------------------
const C_UNK = '#dc2626';
const FIG = 'w-full max-w-[280px] h-auto mx-auto';

/** Írásbeli szorzás elrendezése a kvízben (a „?” a keresett sor). */
const QMul2: React.FC<WrittenMul2LayoutProps> = (props) => <WrittenMul2Layout {...props} className={FIG} />;

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className={FIG} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Kerekítés tízesre: két kis számegyenes. */
const QRound: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const one = (n: number, y: number) => {
    const from = Math.floor(n / 10) * 10;
    const x = (v: number) => 30 + ((v - from) / 10) * 180;
    return (
      <g key={`${n}-${y}`}>
        <line x1="30" y1={y} x2="210" y2={y} stroke="#334155" strokeWidth="2" />
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={i} x1={30 + i * 18} y1={y - (i % 5 === 0 ? 6 : 3)} x2={30 + i * 18} y2={y + (i % 5 === 0 ? 6 : 3)} stroke="#334155" />
        ))}
        <text x="30" y={y + 18} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">{from}</text>
        <text x="210" y={y + 18} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">{from + 10}</text>
        <circle cx={x(n)} cy={y} r="5" fill="#f97316" />
        <text x={x(n)} y={y - 9} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c2410c">{n}</text>
      </g>
    );
  };
  return (
    <QFig h={140}>
      {one(a, 34)}
      {one(b, 88)}
      <text x="120" y="130" textAnchor="middle" fontSize="13" fontWeight="bold" fill={C_UNK}>{a} · {b} ≈ ?</text>
    </QFig>
  );
};

/** Egyszerű adattáblázat. */
const QTable: React.FC<{ title: string; rows: { k: string; v: string }[] }> = ({ title, rows }) => (
  <QFig h={38 + rows.length * 22}>
    <text x="120" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b">{title}</text>
    {rows.map((r, i) => (
      <g key={r.k}>
        <rect x="16" y={30 + i * 22} width="208" height="20" rx="4" fill={i % 2 ? '#fff7ed' : '#ffedd5'} />
        <text x="24" y={44 + i * 22} fontSize="11" fontWeight="bold" fill="#334155">{r.k}</text>
        <text x="216" y={44 + i * 22} textAnchor="end" fontSize="12" fontWeight="bold" fill={r.v.includes('?') ? C_UNK : '#9a3412'}>{r.v}</text>
      </g>
    ))}
  </QFig>
);

/** Ismétlődő csoportok: n doboz, mindegyikben ugyanannyi. */
const QGroups: React.FC<{ count: string; each: string; unit: string }> = ({ count, each, unit }) => (
  <QFig h={120}>
    {Array.from({ length: 5 }).map((_, i) => (
      <g key={i}>
        <rect x={14 + i * 44} y="16" width="38" height="44" rx="6" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
        <text x={33 + i * 44} y="43" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9a3412">{i === 3 ? '…' : each}</text>
      </g>
    ))}
    <text x="120" y="82" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{count} × {each}</text>
    <text x="120" y="104" textAnchor="middle" fontSize="13" fontWeight="bold" fill={C_UNK}>Összesen: ? {unit}</text>
  </QFig>
);

/** Számegyenes-szakasz két határral. */
const QBetween: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <QFig h={100}>
    <line x1="20" y1="55" x2="220" y2="55" stroke="#0f172a" strokeWidth="2" />
    <circle cx="50" cy="55" r="5" fill="#fff" stroke="#0f172a" strokeWidth="2" />
    <circle cx="190" cy="55" r="5" fill="#fff" stroke="#0f172a" strokeWidth="2" />
    <line x1="58" y1="55" x2="182" y2="55" stroke="#7c3aed" strokeWidth="5" opacity="0.4" />
    <text x="50" y="82" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{left}</text>
    <text x="190" y="82" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{right}</text>
    <text x="120" y="45" textAnchor="middle" fontSize="18" fontWeight="bold" fill={C_UNK}>?</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const WRITTEN_MUL2_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'wm2-q1',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul2 a={12} b={14} showZero hide={['product']} />,
    question: 'Mona minden este 12 oldalt olvas. Hány oldalt olvas el 14 este alatt? (12 · 14)',
    options: ['168', '60', '158', '178'],
    correctAnswer: 0,
    explanation: '12 · 4 = 48 (1. részletszorzat). 12 · 1 tízes = 12 tízes, egy hellyel balra írva: 120. 48 + 120 = 168. (A 60 akkor jön ki, ha a 12-t nem tolod el.)'
  },
  {
    id: 'wm2-q2',
    level: 1,
    questionTypeBadge: 'Becslés',
    figure: <QRound a={12} b={14} />,
    question: 'Becsüld meg a 12 · 14 szorzatot úgy, hogy mindkét tényezőt tízesre kerekíted!',
    options: ['100', '200', '150', '140'],
    correctAnswer: 0,
    explanation: '12 ≈ 10 és 14 ≈ 10, így 10 · 10 = 100. A pontos szorzat ennél nagyobb lesz, mert mindkét számot lefelé kerekítettük.'
  },
  {
    id: 'wm2-q3',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul2 a={21} b={14} showZero hide={['product']} />,
    question: 'Mennyi 21 · 14?',
    options: ['294', '105', '284', '304'],
    correctAnswer: 0,
    explanation: '21 · 4 = 84, 21 · 1 tízes = 210. 84 + 210 = 294.'
  },
  {
    id: 'wm2-q4',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    question: 'Mennyi 13 · 13?',
    options: ['169', '52', '159', '139'],
    correctAnswer: 0,
    explanation: '13 · 3 = 39, 13 · 1 tízes = 130. 39 + 130 = 169.'
  },
  {
    id: 'wm2-q5',
    level: 1,
    questionTypeBadge: 'Részletszorzat',
    figure: <QMul2 a={23} b={31} showZero hide={['p1', 'p2', 'product']} />,
    question: 'Számold ki a 23 · 31 szorzatot az egyesekkel kezdve! Mi lesz az első részletszorzat?',
    options: ['23', '69', '690', '713'],
    correctAnswer: 0,
    explanation: 'Az egyesekkel kezdünk: a szorzó egyese 1, és 23 · 1 = 23. (A 69 a 23 · 3, ez a második részletszorzat, a 713 pedig már a szorzat.)'
  },
  {
    id: 'wm2-q6',
    level: 1,
    questionTypeBadge: 'Eltolás',
    figure: <QMul2 a={12} b={14} labels />,
    question: 'Miért írjuk a második részletszorzatot egy hellyel balra?',
    options: ['Mert a szorzó tízesével szoroztunk.', 'Mert így szebben néz ki.', 'Mert az a nagyobb szám.', 'Mert az egyesekkel szoroztunk.'],
    correctAnswer: 0,
    explanation: '12 · 1 tízes = 12 tízes = 120. Ezért a 12-t a tízesek helyétől kezdve írjuk, az egyesek helyére 0 kerülhet.'
  },
  {
    id: 'wm2-q7',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    question: 'Mennyi 22 · 11?',
    options: ['242', '44', '222', '252'],
    correctAnswer: 0,
    explanation: '22 · 1 = 22, 22 · 1 tízes = 220. 22 + 220 = 242.'
  },
  {
    id: 'wm2-q8',
    level: 1,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Hogyan ellenőrizheted a 12 · 14 = 168 szorzást?',
    options: ['Kiszámolom a 14 · 12-t is.', 'Kiszámolom a 12 + 14-et.', 'Kiszámolom a 14 − 12-t.', 'Kiszámolom a 12 · 4-et.'],
    correctAnswer: 0,
    explanation: 'A tényezők felcserélhetők, a szorzat nem változik. 14 · 12 = 28 + 140 = 168, tehát jól számoltunk.'
  },
  {
    id: 'wm2-q9',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul2 a={32} b={13} showZero hide={['product']} />,
    question: 'Mennyi 32 · 13?',
    options: ['416', '128', '406', '426'],
    correctAnswer: 0,
    explanation: '32 · 3 = 96, 32 · 1 tízes = 320. 96 + 320 = 416.'
  },
  {
    id: 'wm2-q10',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    question: 'Mennyi 24 · 12?',
    options: ['288', '72', '278', '298'],
    correctAnswer: 0,
    explanation: '24 · 2 = 48, 24 · 1 tízes = 240. 48 + 240 = 288.'
  },

  // ---------------------------- 2. szint ----------------------------
  {
    id: 'wm2-q11',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QGroups count="26" each="24 db" unit="filctoll" />,
    question: 'A 26 gyerek mindegyike egy 24 darabos filctollkészletet kapott. Hány filctollat kaptak összesen?',
    options: ['624', '192', '600', '524'],
    correctAnswer: 0,
    explanation: '24 · 26: 24 · 6 = 144, 24 · 2 tízes = 480. 144 + 480 = 624. (A 192 akkor jön ki, ha a 48-at nem tolod el; a 600 csak a becslés.)'
  },
  {
    id: 'wm2-q12',
    level: 2,
    questionTypeBadge: 'Becslés',
    figure: <QRound a={26} b={24} />,
    question: 'Tízesre kerekített értékekkel mennyi a 26 · 24 becsült értéke?',
    options: ['600', '500', '700', '800'],
    correctAnswer: 0,
    explanation: '26 ≈ 30 (a 6 miatt felfelé), 24 ≈ 20 (a 4 miatt lefelé). 30 · 20 = 600.'
  },
  {
    id: 'wm2-q13',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul2 a={75} b={27} hide={['product']} />,
    question: 'Mennyi 75 · 27?',
    options: ['2025', '675', '1925', '2125'],
    correctAnswer: 0,
    explanation: '75 · 7 = 525, 75 · 2 = 150 (tízes), eltolva 1500. 525 + 1500 = 2025. Becslés: 80 · 30 = 2400.'
  },
  {
    id: 'wm2-q14',
    level: 2,
    questionTypeBadge: 'Rövidebb írásmód',
    figure: <QMul2 a={85} b={16} mode="tens" shortcut hide={['product']} />,
    question: '85 önkéntes mindegyike 16 facsemetét ültetett. Hány facsemetét ültettek összesen?',
    options: ['1360', '595', '1260', '1350'],
    correctAnswer: 0,
    explanation: 'Az 1 tízessel szorozva a részletszorzat maga a 85 (vagyis 850). 85 · 6 = 510. 850 + 510 = 1360. (A 595 akkor jön ki, ha nem tolod el a 85-öt.)'
  },
  {
    id: 'wm2-q15',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    question: 'Mennyi 29 · 48?',
    options: ['1392', '348', '1292', '1402'],
    correctAnswer: 0,
    explanation: '29 · 8 = 232, 29 · 4 = 116 tízes = 1160. 232 + 1160 = 1392. Becslés: 30 · 50 = 1500.'
  },
  {
    id: 'wm2-q16',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    question: 'Mennyi 59 · 12?',
    options: ['708', '177', '698', '718'],
    correctAnswer: 0,
    explanation: '59 · 2 = 118, 59 · 1 tízes = 590. 118 + 590 = 708.'
  },
  {
    id: 'wm2-q17',
    level: 2,
    questionTypeBadge: 'Részletszorzat',
    figure: <QMul2 a={47} b={32} hide={['p2', 'product']} />,
    question: 'A 47 · 32 szorzásánál az első részletszorzat 94. Melyik számot írod a második sorba (egy hellyel balra tolva)?',
    options: ['141', '94', '128', '1504'],
    correctAnswer: 0,
    explanation: 'A második sorban a 3 tízessel szorzunk: 47 · 3 = 141. Ez 141 tízes, ezért egy hellyel balra írjuk. A szorzat: 94 + 1410 = 1504.'
  },
  {
    id: 'wm2-q18',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Kitti júniusban és júliusban minden nap 85 Ft-ot tesz félre (június 30, július 31 nap). Mennyi pénzt gyűjt össze?',
    options: ['5185 Ft', '595 Ft', '5100 Ft', '5285 Ft'],
    correctAnswer: 0,
    explanation: '30 + 31 = 61 nap. 85 · 61: 85 · 1 = 85, 85 · 6 tízes = 5100. 85 + 5100 = 5185 Ft.'
  },
  {
    id: 'wm2-q19',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Bendegúz minden munkanapon 17 km-t biciklizik. Hány kilométert tett meg egy hónapban, amikor 21 napot dolgozott?',
    options: ['357 km', '51 km', '347 km', '367 km'],
    correctAnswer: 0,
    explanation: '17 · 21: 17 · 1 = 17, 17 · 2 tízes = 340. 17 + 340 = 357 km.'
  },
  {
    id: 'wm2-q20',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QGroups count="28" each="350 Ft" unit="Ft" />,
    question: 'A bivalyrezervátumban a belépő fejenként 350 Ft. Mennyit fizet a 28 fős osztály?',
    options: ['9800 Ft', '3500 Ft', '980 Ft', '9600 Ft'],
    correctAnswer: 0,
    explanation: '350 · 28: 350 · 8 = 2800, 350 · 2 tízes = 7000. 2800 + 7000 = 9800 Ft.'
  },

  // ---------------------------- 3. szint ----------------------------
  {
    id: 'wm2-q21',
    level: 3,
    questionTypeBadge: 'Páros, páratlan',
    question: 'Melyik szorzat páratlan szám?',
    options: ['75 · 27', '29 · 48', '55 · 34', '96 · 24'],
    correctAnswer: 0,
    explanation: 'Egy szorzat csak akkor páratlan, ha mindkét tényező páratlan. 75 · 27 = 2025, ez páratlan. A többiben van páros tényező (48, 34, 96 és 24).'
  },
  {
    id: 'wm2-q22',
    level: 3,
    questionTypeBadge: 'Kilenclyukú híd',
    figure: <BridgeSvg className={FIG} />,
    question: 'A híd nyílásaiban lévő számok közül melyik az 58 · 85 szorzata?',
    options: ['4930', '4897', '4416', '4278'],
    correctAnswer: 0,
    explanation: '58 · 5 = 290, 58 · 8 tízes = 4640. 290 + 4640 = 4930. Becslés: 60 · 90 = 5400.'
  },
  {
    id: 'wm2-q23',
    level: 3,
    questionTypeBadge: 'Műveleti sorrend',
    question: 'Mennyi 36 · (9140 − 8872)?',
    options: ['9648', '268', '9548', '9658'],
    correctAnswer: 0,
    explanation: 'Előbb a zárójel: 9140 − 8872 = 268. Aztán szorzunk: 36 · 268 = 268 · 36 = 1608 + 8040 = 9648.'
  },
  {
    id: 'wm2-q24',
    level: 3,
    questionTypeBadge: 'Műveleti sorrend',
    question: 'Mennyi 2088 + 223 · 34?',
    options: ['9670', '7582', '9570', '9660'],
    correctAnswer: 0,
    explanation: 'Előbb szorzunk: 223 · 34 = 892 + 6690 = 7582. Utána adunk össze: 2088 + 7582 = 9670.'
  },
  {
    id: 'wm2-q25',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A Baradla barlangba a belépő 700 Ft/fő. A 26 fős osztály fele, 13 gyerek választotta ezt a programot. Mennyibe kerültek a belépők összesen?',
    options: ['9100 Ft', '910 Ft', '9800 Ft', '8400 Ft'],
    correctAnswer: 0,
    explanation: '700 · 13 = 7 · 13 · 100 = 91 · 100 = 9100 Ft.'
  },
  {
    id: 'wm2-q26',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy túravezető egy éven át minden héten egyszer megteszi a 15 km-es túrát. Hány km-t gyalogol egy év alatt? (1 év = 52 hét)',
    options: ['780 km', '5475 km', '105 km', '750 km'],
    correctAnswer: 0,
    explanation: 'Hetente egyszer, tehát 52-szer: 15 · 52 = 30 + 750 = 780 km. (A 5475 a 365 napra számolt hibás eredmény.)'
  },
  {
    id: 'wm2-q27',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Melyik szám teszi igazzá a nyitott mondatot? 329 · 27 > □',
    options: ['8800', '8883', '8900', '9000'],
    correctAnswer: 0,
    explanation: '329 · 27 = 2303 + 6580 = 8883. A □ helyére 8883-nál kisebb szám kell: a 8800 jó. A 8883 nem jó, mert nem kisebb önmagánál.'
  },
  {
    id: 'wm2-q28',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    figure: <QBetween left="462 · 12" right="6413" />,
    question: 'Melyik szám teszi igazzá? 6413 > □ > 462 · 12',
    options: ['5929', '5544', '6413', '7057'],
    correctAnswer: 0,
    explanation: '462 · 12 = 924 + 4620 = 5544. A □ 5544-nél nagyobb és 6413-nál kisebb: az 5929 jó. Az 5544 és a 6413 nem, mert a jel „nagyobb”, nem „egyenlő”.'
  },
  {
    id: 'wm2-q29',
    level: 3,
    questionTypeBadge: 'Láncszorzás',
    question: 'Mennyi 23 · 35 · 12?',
    options: ['9660', '805', '9560', '8660'],
    correctAnswer: 0,
    explanation: 'Balról jobbra: 23 · 35 = 115 + 690 = 805. Aztán 805 · 12 = 1610 + 8050 = 9660.'
  },
  {
    id: 'wm2-q30',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <QTable
        title="Rackajuhok átlagos tömege"
        rows={[
          { k: '1 kos', v: '65 kg' },
          { k: '1 anyajuh', v: '44 kg' },
          { k: '149 kos − 149 anyajuh', v: '? kg' }
        ]}
      />
    ),
    question: 'Mennyivel nagyobb 149 kos tömege, mint 149 anyajuh tömege?',
    options: ['3129 kg', '9685 kg', '6556 kg', '21 kg'],
    correctAnswer: 0,
    explanation: 'Egy kos 65 − 44 = 21 kg-mal nehezebb. 149 kosnál: 149 · 21 = 149 + 2980 = 3129 kg. (Kiszámolhatod így is: 9685 − 6556 = 3129.)'
  }
];

export const WrittenMulTwoDigitQuiz: React.FC<{
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
      topicId="g4-wmult-irasbeli-quiz"
      subtopicId="irasbeli-szorzas"
      title="2. Írásbeli szorzás – Kvíz"
      subtitle="30 feladat 3 szinten: becslés, részletszorzatok, írásbeli szorzás kétjegyű szorzóval, ellenőrzés, szöveges feladatok."
      badge="4. OSZTÁLY • VII. ÍRÁSBELI SZORZÁS • KVÍZ"
      questions={WRITTEN_MUL2_QUESTIONS}
      cheatSheets={[
        {
          title: 'Az írásbeli szorzás lépései',
          items: [
            '1. Szorozz a szorzó egyeseivel: 12 · 4 = 48',
            '2. Szorozz a tízeseivel, és told egy hellyel balra: 12 → 120',
            '3. Add össze a részletszorzatokat: 48 + 120 = 168',
            'Kezdheted a tízesekkel is, akkor a 2. sort jobbra tolod.'
          ]
        },
        {
          title: 'Becslés és ellenőrzés',
          items: [
            'Becslés: kerekíts tízesre! 26 · 24 ≈ 30 · 20 = 600',
            'Ellenőrzés: cseréld fel a tényezőket! 14 · 12 = 168',
            'Ha az eredmény messze van a becsléstől, keresd a hibát!',
            'Ha a szorzóban 1-es van, a szorzandó maga a részletszorzat.'
          ]
        },
        {
          title: 'Szöveges feladatok',
          items: [
            'Adatok → terv → becslés → számítás → ellenőrzés → válasz',
            '„fejenként 350 Ft, 28 fő” → 350 · 28',
            'Előbb szorzunk, utána adunk össze vagy vonunk ki.',
            'Zárójel esetén a zárójelben lévő művelet az első.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <WrittenMulTwoDigitMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <WrittenMulTwoDigitSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default WrittenMulTwoDigitQuiz;
