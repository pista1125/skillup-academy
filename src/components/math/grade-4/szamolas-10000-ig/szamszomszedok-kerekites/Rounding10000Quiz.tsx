import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Rounding10000Matcher } from './Rounding10000Matcher';
import { Rounding10000Sorter } from './Rounding10000Sorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/**
 * Számegyenes-szakasz lo..hi között 10 egyenlő osztással, a szám helyén pötty.
 * Ha hideEnds, a végpontok helyén "?" áll.
 */
const SegFig: React.FC<{ lo: number; hi: number; n: number; hideEnds?: boolean; color?: string }> = ({ lo, hi, n, hideEnds, color = '#ea580c' }) => {
  const x0 = 24;
  const x1 = 216;
  const x = x0 + ((x1 - x0) * (n - lo)) / (hi - lo);
  const lab = (v: number) => (v >= 10000 ? String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(v));
  return (
    <QFig h={90}>
      <line x1={x0} y1="50" x2={x1} y2="50" stroke={color} strokeWidth="2.5" />
      {Array.from({ length: 11 }, (_, j) => (
        <line key={j} x1={x0 + (j * (x1 - x0)) / 10} y1={j === 5 ? 42 : 45} x2={x0 + (j * (x1 - x0)) / 10} y2={j === 5 ? 58 : 55} stroke={color} strokeWidth={j === 5 ? 1.8 : 1} />
      ))}
      <circle cx={x0} cy="50" r="4.5" fill="#fff" stroke={color} strokeWidth="2" />
      <circle cx={x1} cy="50" r="4.5" fill="#fff" stroke={color} strokeWidth="2" />
      <text x={x0} y="74" textAnchor="middle" fontSize="11" fontWeight="bold" fill={hideEnds ? UNK : '#7c2d12'}>{hideEnds ? '?' : lab(lo)}</text>
      <text x={x1} y="74" textAnchor="middle" fontSize="11" fontWeight="bold" fill={hideEnds ? UNK : '#7c2d12'}>{hideEnds ? '?' : lab(hi)}</text>
      <circle cx={x} cy="50" r="5" fill="#2563eb" stroke="#1e3a8a" />
      <text x={x} y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">{lab(n)}</text>
    </QFig>
  );
};

/** Szám és a kérdéses kerekített érték. */
const RoundFig: React.FC<{ n: string; to: string }> = ({ n, to }) => (
  <QFig h={70}>
    <rect x="22" y="16" width="78" height="38" rx="9" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
    <text x="61" y="41" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e3a8a">{n}</text>
    <text x="120" y="29" textAnchor="middle" fontSize={to.length > 7 ? 8 : 9} fontWeight="bold" fill="#7c2d12">{to}</text>
    <text x="120" y="49" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#7c2d12">≈</text>
    <rect x="140" y="16" width="78" height="38" rx="9" fill="#fee2e2" stroke={UNK} strokeWidth="1.5" />
    <text x="179" y="41" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

/** Csille számokkal. */
const CartFig: React.FC<{ label: string; nums: string[] }> = ({ label, nums }) => (
  <QFig h={130}>
    <text x="120" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#713f12">{label}</text>
    {[0, 1, 2, 3, 4].map((j) => (
      <circle key={j} cx={80 + j * 20} cy="38" r="9" fill={['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7'][j]} stroke="#1e293b" strokeWidth="0.6" />
    ))}
    <path d="M 55 42 L 185 42 L 175 106 L 65 106 Z" fill="#dc2626" stroke="#7f1d1d" strokeWidth="2" />
    <rect x="70" y="50" width="100" height="48" rx="6" fill="#fff7ed" />
    <text x="120" y="69" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7f1d1d">{nums[0]}, {nums[1]}</text>
    <text x="120" y="88" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7f1d1d">{nums[2]}, {nums[3]}</text>
    <circle cx="88" cy="114" r="9" fill="#7f1d1d" />
    <circle cx="152" cy="114" r="9" fill="#7f1d1d" />
  </QFig>
);

/** Pénztárca érmékkel. */
const PurseFig: React.FC<{ coins: number[]; color: string }> = ({ coins, color }) => (
  <QFig h={120}>
    <path d="M 60 30 Q 40 100 70 110 L 170 110 Q 200 100 180 30 Z" fill={color} stroke="#334155" strokeWidth="2" />
    <path d="M 60 30 Q 120 18 180 30" fill="none" stroke="#334155" strokeWidth="2" />
    {coins.map((c, i) => {
      const cx = 85 + (i % 3) * 36;
      const cy = 55 + Math.floor(i / 3) * 34;
      return (
        <g key={i}>
          <circle cx={cx} cy={cy} r="15" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
          <text x={cx} y={cy + 4} textAnchor="middle" fontSize={c >= 1000 ? 9 : 10} fontWeight="bold" fill="#1e293b">{c}</text>
        </g>
      );
    })}
  </QFig>
);

/** Hegyek magassággal. */
const PeaksFig: React.FC<{ heights: number[] }> = ({ heights }) => (
  <QFig h={130}>
    {heights.map((h, i) => {
      const x = 40 + i * 54;
      const top = 115 - (h / 10000) * 80;
      return (
        <g key={h}>
          <polygon points={`${x - 28},115 ${x},${top} ${x + 28},115`} fill="#94a3b8" stroke="#475569" />
          <polygon points={`${x - 6},${top + 10} ${x},${top} ${x + 6},${top + 10}`} fill="#fff" />
          <rect x={x - 22} y={top - 17} width="44" height="14" rx="4" fill="#fff" stroke="#334155" />
          <text x={x} y={top - 6} textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#0f172a">{h} m</text>
        </g>
      );
    })}
    <rect x="2" y="115" width="236" height="12" fill="#4ade80" />
  </QFig>
);

export const ROUNDING_10000_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'r10k-q1',
    level: 1,
    questionTypeBadge: 'Számszomszédok',
    figure: <SegFig lo={4760} hi={4770} n={4763} hideEnds color="#0284c7" />,
    question: 'Melyek a 4763 tízes számszomszédjai?',
    options: ['4760 és 4770', '4700 és 4800', '4762 és 4764', '4750 és 4760'],
    correctAnswer: 0,
    explanation: 'A 4763 a 4760 és a 4770 kerek tízesek között van. (A 4762 és 4764 az egyes szomszédok.)'
  },
  {
    id: 'r10k-q2',
    level: 1,
    questionTypeBadge: 'Számszomszédok',
    question: 'Melyek az 5364 egyes számszomszédjai?',
    options: ['5363 és 5365', '5360 és 5370', '5354 és 5374', '5363 és 5364'],
    correctAnswer: 0,
    explanation: 'Az egyes szomszédok eggyel kisebbek és eggyel nagyobbak: 5363 és 5365.'
  },
  {
    id: 'r10k-q3',
    level: 1,
    questionTypeBadge: 'Számszomszédok',
    figure: <SegFig lo={5300} hi={5400} n={5364} hideEnds color="#dc2626" />,
    question: 'Melyek az 5364 százas számszomszédjai?',
    options: ['5300 és 5400', '5360 és 5370', '5000 és 6000', '5200 és 5300'],
    correctAnswer: 0,
    explanation: 'Az 5364-ben 53 százas van, ezért az 5300 és az 5400 közé esik.'
  },
  {
    id: 'r10k-q4',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    figure: <SegFig lo={4000} hi={5000} n={4200} />,
    question: 'Kerekítsd ezresre: 4200 ≈ ?',
    options: ['4000', '5000', '4200', '4100'],
    correctAnswer: 0,
    explanation: 'A 4200 a 4000-hez van közelebb (200 a távolság), mint az 5000-hez (800).'
  },
  {
    id: 'r10k-q5',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    figure: <SegFig lo={3000} hi={4000} n={3800} />,
    question: 'Kerekítsd ezresre: 3800 ≈ ?',
    options: ['4000', '3000', '3800', '3900'],
    correctAnswer: 0,
    explanation: 'A 3800 a 4000-hez van közelebb (200), mint a 3000-hez (800). Felfelé kerekítünk.'
  },
  {
    id: 'r10k-q6',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    figure: <SegFig lo={3000} hi={4000} n={3500} />,
    question: 'Kerekítsd ezresre: 3500 ≈ ?',
    options: ['4000', '3000', '3500', '3600'],
    correctAnswer: 0,
    explanation: 'A 3500 pont középen van. Ilyenkor a nagyobb ezresre kerekítünk: 4000.'
  },
  {
    id: 'r10k-q7',
    level: 1,
    questionTypeBadge: 'Kerekítés tízesre',
    figure: <RoundFig n="2131" to="tízesre" />,
    question: 'Kerekítsd tízesre: 2131 ≈ ?',
    options: ['2130', '2140', '2100', '2000'],
    correctAnswer: 0,
    explanation: 'A tízes szomszédok 2130 és 2140. Az egyesek helyén 1 áll, így a 2130 van közelebb.'
  },
  {
    id: 'r10k-q8',
    level: 1,
    questionTypeBadge: 'Kerek szám',
    question: 'Kerekítsd ezresre: 7000 ≈ ?',
    options: ['7000', '8000', '6000', '7100'],
    correctAnswer: 0,
    explanation: 'A kerek ezres ezresre kerekített értéke maga a szám: 7000.'
  },
  {
    id: 'r10k-q9',
    level: 1,
    questionTypeBadge: 'Jelölés',
    question: 'Melyik jel jelenti azt, hogy „körülbelül egyenlő”?',
    options: ['≈', '=', '<', '>'],
    correctAnswer: 0,
    explanation: 'A kerekített értéket a ≈ jellel írjuk: 4200 ≈ 4000.'
  },
  {
    id: 'r10k-q10',
    level: 1,
    questionTypeBadge: 'Kerekítés százasra',
    figure: <RoundFig n="4720" to="százasra" />,
    question: 'Kerekítsd százasra: 4720 ≈ ?',
    options: ['4700', '4800', '4720', '4730'],
    correctAnswer: 0,
    explanation: 'A százas szomszédok 4700 és 4800. A tízesek helyén 2 áll, ezért lefelé: 4700.'
  },

  // ---------------------------- 2. szint ----------------------------
  {
    id: 'r10k-q11',
    level: 2,
    questionTypeBadge: 'Csille',
    figure: <CartFig label="ezresre ≈ 7000" nums={['6449', '7500', '7449', '6333']} />,
    question: 'A csillében lévő számok közül melyiknek az ezresre kerekített értéke 7000?',
    options: ['7449', '7500', '6449', '6333'],
    correctAnswer: 0,
    explanation: '7449 ≈ 7000. A 7500 pont középen van, ezért 8000 lesz. 6449 ≈ 6000, 6333 ≈ 6000.'
  },
  {
    id: 'r10k-q12',
    level: 2,
    questionTypeBadge: 'Csille',
    figure: <CartFig label="százasra ≈ 2300" nums={['2250', '2350', '2391', '2248']} />,
    question: 'Melyik szám százasra kerekített értéke 2300?',
    options: ['2250', '2350', '2391', '2248'],
    correctAnswer: 0,
    explanation: 'A 2250 pont 2200 és 2300 között középen van, ezért felfelé: 2300. A 2350 ≈ 2400, a 2391 ≈ 2400, a 2248 ≈ 2200.'
  },
  {
    id: 'r10k-q13',
    level: 2,
    questionTypeBadge: 'Kerekítés százasra',
    figure: <RoundFig n="4545" to="százasra" />,
    question: 'Kerekítsd százasra: 4545 ≈ ?',
    options: ['4500', '4600', '4550', '4000'],
    correctAnswer: 0,
    explanation: 'A tízesek helyén 4 áll, ezért lefelé kerekítünk: 4500. Ha előbb tízesre kerekítenéd (4550), tévesen 4600 jönne ki!'
  },
  {
    id: 'r10k-q14',
    level: 2,
    questionTypeBadge: 'Kerekítés százasra',
    figure: <SegFig lo={5000} hi={5100} n={5050} hideEnds color="#dc2626" />,
    question: 'Kerekítsd százasra: 5050 ≈ ?',
    options: ['5100', '5000', '5060', '6000'],
    correctAnswer: 0,
    explanation: 'Az 5050 pont 5000 és 5100 között középen van, ezért a nagyobbra kerekítünk: 5100.'
  },
  {
    id: 'r10k-q15',
    level: 2,
    questionTypeBadge: 'Kerekítés tízesre',
    question: 'Kerekítsd tízesre: 9047 ≈ ?',
    options: ['9050', '9040', '9000', '9100'],
    correctAnswer: 0,
    explanation: 'A tízes szomszédok 9040 és 9050. Az egyesek helyén 7 áll, ezért felfelé: 9050.'
  },
  {
    id: 'r10k-q16',
    level: 2,
    questionTypeBadge: 'Kerekítés ezresre',
    question: 'Kerekítsd ezresre: 1295 ≈ ?',
    options: ['1000', '2000', '1300', '1200'],
    correctAnswer: 0,
    explanation: 'Az ezres szomszédok 1000 és 2000. A százasok helyén 2 áll, ezért lefelé: 1000. (1300 a százasra kerekített érték.)'
  },
  {
    id: 'r10k-q17',
    level: 2,
    questionTypeBadge: 'Kerekítés ezresre',
    figure: <SegFig lo={4000} hi={5000} n={4449} hideEnds color="#16a34a" />,
    question: 'Kerekítsd ezresre: 4449 ≈ ?',
    options: ['4000', '5000', '4500', '4400'],
    correctAnswer: 0,
    explanation: 'A 4449 a 4000-hez van közelebb (a százasok helyén 4 áll). Ne kerekíts lépcsőzetesen (4450 → 4500 → 5000)!'
  },
  {
    id: 'r10k-q18',
    level: 2,
    questionTypeBadge: 'Kerekítés ezresre',
    figure: <SegFig lo={9000} hi={10000} n={9500} hideEnds color="#16a34a" />,
    question: 'Kerekítsd ezresre: 9500 ≈ ?',
    options: ['10 000', '9000', '9500', '9600'],
    correctAnswer: 0,
    explanation: 'A 9500 pont 9000 és 10 000 között középen van, ezért a nagyobbra: 10 000.'
  },
  {
    id: 'r10k-q19',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <PurseFig coins={[10, 50, 200, 1000]} color="#fde047" />,
    question: 'Tádé pénztárcájában 10, 50, 200 és 1000 fabatka van. Mennyi ez ezresre kerekítve?',
    options: ['1000', '2000', '1300', '1260'],
    correctAnswer: 0,
    explanation: 'Összesen 10 + 50 + 200 + 1000 = 1260 fabatka. Ez az 1000-hez van közelebb: 1260 ≈ 1000.'
  },
  {
    id: 'r10k-q20',
    level: 2,
    questionTypeBadge: 'Hegyek',
    figure: <PeaksFig heights={[5725, 7047, 8500, 9963]} />,
    question: 'Melyik hegy magassága 10 000 m százasra kerekítve és ezresre kerekítve is?',
    options: ['9963 m', '8500 m', '7047 m', '5725 m'],
    correctAnswer: 0,
    explanation: '9963 ≈ 10 000 százasra (a tízesek helyén 6 áll) és ezresre is. A 8500 ezresre csak 9000.'
  },

  // ---------------------------- 3. szint ----------------------------
  {
    id: 'r10k-q21',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'Csodafalva lakóinak száma ezresre kerekítve 8000. Hány lakója lehet a falunak?',
    options: ['7612', '8500', '7499', '8613'],
    correctAnswer: 0,
    explanation: 'Ezresre 8000 a 7500 és 8499 közötti számok kerekített értéke. Ilyen a 7612. A 8500 ≈ 9000, a 7499 ≈ 7000, a 8613 ≈ 9000.'
  },
  {
    id: 'r10k-q22',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'A faluban élő pónik számának százasra kerekített értéke 4500. Hány póni élhet a faluban?',
    options: ['4462', '4449', '4550', '4612'],
    correctAnswer: 0,
    explanation: 'Százasra 4500 a 4450 és 4549 közötti számok kerekített értéke. Ilyen a 4462. A 4449 ≈ 4400, a 4550 és a 4612 ≈ 4600.'
  },
  {
    id: 'r10k-q23',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    figure: <SegFig lo={3240} hi={3260} n={3250} color="#0284c7" />,
    question: 'A kunyhók számának tízesre kerekített értéke 3250. Melyik a legkisebb lehetséges szám?',
    options: ['3245', '3240', '3250', '3254'],
    correctAnswer: 0,
    explanation: '3245 ≈ 3250 (pont középen, felfelé). A 3244 már 3240-re kerekedik. A 3250 és a 3254 is jó lenne, de nem ezek a legkisebbek.'
  },
  {
    id: 'r10k-q24',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'Melyik a legnagyobb szám, amelynek százasra kerekített értéke 6800?',
    options: ['6849', '6850', '6899', '6800'],
    correctAnswer: 0,
    explanation: 'A 6850 már középen van, és felfelé, 6900-ra kerekedik. Az előtte lévő 6849 még 6800-ra: ez a legnagyobb.'
  },
  {
    id: 'r10k-q25',
    level: 3,
    questionTypeBadge: 'Két kerekítés',
    question: 'Melyik számnak az ezresre és a százasra kerekített értéke is 5000?',
    options: ['4987', '4949', '5050', '5500'],
    correctAnswer: 0,
    explanation: '4987 ≈ 5000 százasra (a tízesek helyén 8) és ezresre is. A 4949 százasra 4900, az 5050 százasra 5100, az 5500 ezresre 6000.'
  },
  {
    id: 'r10k-q26',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: <PurseFig coins={[500, 1000, 2000, 5000]} color="#fb923c" />,
    question: 'Tati pénztárcájában 500, 1000, 2000 és 5000 fabatka van. Mennyi ez ezresre kerekítve?',
    options: ['9000', '8000', '8500', '10 000'],
    correctAnswer: 0,
    explanation: 'Összesen 500 + 1000 + 2000 + 5000 = 8500. Ez pont középen van 8000 és 9000 között, ezért 9000.'
  },
  {
    id: 'r10k-q27',
    level: 3,
    questionTypeBadge: 'Pénz',
    question: 'Tóninál 20, 100, 100, 200 és 2000 fabatka, Teónál 500, 500, 50, 200 és 500 fabatka van. Mennyi a pénzük ezresre kerekítve?',
    options: ['Mindkettőjüké 2000.', 'Tónié 2000, Teóé 1000.', 'Tónié 3000, Teóé 2000.', 'Tónié 2420, Teóé 1750.'],
    correctAnswer: 0,
    explanation: 'Tóni: 2420 ≈ 2000. Teó: 1750 ≈ 2000 (a 2000-hez van közelebb). A 2420 és az 1750 a pontos összeg, nem a kerekített.'
  },
  {
    id: 'r10k-q28',
    level: 3,
    questionTypeBadge: 'Két kerekítés',
    question: 'Melyik számnak egyezik meg a tízesre és a százasra kerekített értéke?',
    options: ['1503', '1638', '3741', '4314'],
    correctAnswer: 0,
    explanation: '1503 ≈ 1500 tízesre és százasra is. 1638: 1640 és 1600; 3741: 3740 és 3700; 4314: 4310 és 4300.'
  },
  {
    id: 'r10k-q29',
    level: 3,
    questionTypeBadge: 'Két kerekítés',
    question: 'Egy szám tízesre kerekítve 4510, százasra kerekítve 4500. Melyik lehet ez a szám?',
    options: ['4513', '4504', '4516', '4551'],
    correctAnswer: 0,
    explanation: '4513 ≈ 4510 tízesre és ≈ 4500 százasra. 4504 ≈ 4500 tízesre, 4516 ≈ 4520 tízesre, 4551 ≈ 4550 és 4600.'
  },
  {
    id: 'r10k-q30',
    level: 3,
    questionTypeBadge: 'Kerekítés',
    figure: <RoundFig n="3615" to="t / sz / E" />,
    question: 'Négyszer dobtál a dobókockával: 3, 6, 1, 5. Ebből lett a 3615. Mi a tízesre, százasra és ezresre kerekített értéke?',
    options: ['3620, 3600, 4000', '3610, 3600, 4000', '3620, 3700, 4000', '3620, 3600, 3000'],
    correctAnswer: 0,
    explanation: 'Tízesre: az egyesek helyén 5 → 3620. Százasra: a tízesek helyén 1 → 3600. Ezresre: a százasok helyén 6 → 4000.'
  }
];

export const Rounding10000Quiz: React.FC<{
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
      topicId="g4-count-kerekites-quiz"
      subtopicId="szamszomszedok-kerekites"
      title="10. Számszomszédok, kerekítés – Kvíz"
      subtitle="30 feladat 3 szinten: számszomszédok, kerekítés tízesre, százasra és ezresre."
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • KVÍZ"
      questions={ROUNDING_10000_QUESTIONS}
      cheatSheets={[
        {
          title: 'Számszomszédok (5364)',
          items: [
            'egyes: 5363 és 5365',
            'tízes: 5360 és 5370',
            'százas: 5300 és 5400',
            'ezres: 5000 és 6000'
          ]
        },
        {
          title: 'Kerekítés',
          items: [
            'A közelebbi szomszédra kerekítünk.',
            'Pont középen: a nagyobbra (3500 ≈ 4000).',
            'A kerek szám önmaga marad (7000 ≈ 7000).',
            'Jel: ≈ (körülbelül egyenlő).'
          ]
        },
        {
          title: 'Melyik jegyet nézd?',
          items: [
            'tízesre: az egyeseket',
            'százasra: a tízeseket',
            'ezresre: a százasokat',
            '0–4: lefelé, 5–9: felfelé. Egy lépésben kerekíts!'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Rounding10000Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Rounding10000Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Rounding10000Quiz;
