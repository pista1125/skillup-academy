import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Rounding500G3Matcher } from './Rounding500G3Matcher';
import { Rounding500G3Sorter } from './Rounding500G3Sorter';
import { FONT, UNK, RLine, LineMark, PriceTag, DigitCards } from './Rounding500G3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const CLS = 'w-full max-w-[280px] h-auto mx-auto';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className={CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Számegyenes két kerek százas között, 10-es osztással. */
const HLine: React.FC<{ lo: number; marks: LineMark[] }> = ({ lo, marks }) => (
  <RLine lo={lo} hi={lo + 100} tickEvery={10} bigEvery={50} labels={[lo, lo + 50, lo + 100]} marks={marks} W={240} H={84} className={CLS} />
);

/** Számegyenes két kerek tízes környékén, 1-es osztással. */
const TLine: React.FC<{ lo: number; hi: number; marks: LineMark[]; labels: number[] }> = ({ lo, hi, marks, labels }) => (
  <RLine lo={lo} hi={hi} tickEvery={1} bigEvery={10} labels={labels} marks={marks} W={240} H={84} className={CLS} />
);

/** Dobozsor: '?' = keresett. */
const RowFig: React.FC<{ items: string[]; caption?: string }> = ({ items, caption }) => {
  const n = items.length;
  const w = 50;
  const gap = 8;
  const x0 = (240 - (n * w + (n - 1) * gap)) / 2;
  return (
    <QFig h={caption ? 86 : 66}>
      {items.map((t, i) => {
        const q = t === '?';
        return (
          <g key={i}>
            <rect x={x0 + i * (w + gap)} y="14" width={w} height="36" rx="8" fill={q ? '#fee2e2' : '#ecfeff'} stroke={q ? UNK : '#0891b2'} strokeWidth="1.6" />
            <text x={x0 + i * (w + gap) + w / 2} y="39" textAnchor="middle" fontSize="17" fontWeight="bold" fill={q ? UNK : '#164e63'}>{t}</text>
          </g>
        );
      })}
      {caption && <text x="120" y="72" textAnchor="middle" fontSize="11" fill="#475569">{caption}</text>}
    </QFig>
  );
};

/** „a ≈ b” kártya. */
const ApproxFig: React.FC<{ a: string; b: string }> = ({ a, b }) => (
  <QFig h={70}>
    <text x="70" y="46" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#0f172a">{a}</text>
    <text x="120" y="47" textAnchor="middle" fontSize="30" fontWeight="bold" fill="#d97706">≈</text>
    <text x="170" y="46" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#0f172a">{b}</text>
  </QFig>
);

/** Letakart jegyű szám. */
const HiddenFig: React.FC<{ digits: string[]; caption?: string }> = ({ digits, caption }) => {
  const s = 34;
  const w = digits.length * (s + 4) - 4;
  return (
    <QFig h={caption ? 86 : 68}>
      <DigitCards x={(240 - w) / 2} y={8} digits={digits} s={s} />
      {caption && <text x="120" y="76" textAnchor="middle" fontSize="11.5" fill="#475569">{caption}</text>}
    </QFig>
  );
};

/** Árcédula egy tárggyal. */
const PriceFig: React.FC<{ item: 'ball' | 'car' | 'book'; price: string }> = ({ item, price }) => (
  <QFig h={96}>
    {item === 'ball' && (
      <g>
        <circle cx="80" cy="48" r="28" fill="#f97316" stroke="#7c2d12" strokeWidth="1.5" />
        <path d="M 52 48 Q 80 26 108 48" fill="none" stroke="#fff" strokeWidth="3" />
        <path d="M 52 48 Q 80 70 108 48" fill="none" stroke="#fff" strokeWidth="3" />
      </g>
    )}
    {item === 'car' && (
      <g>
        <rect x="40" y="44" width="80" height="22" rx="6" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.5" />
        <path d="M 56 44 L 66 28 L 94 28 L 104 44 Z" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="1.5" />
        <circle cx="60" cy="68" r="8" fill="#334155" />
        <circle cx="100" cy="68" r="8" fill="#334155" />
      </g>
    )}
    {item === 'book' && (
      <g>
        <rect x="52" y="20" width="56" height="62" rx="4" fill="#a855f7" stroke="#581c87" strokeWidth="1.5" />
        <rect x="60" y="30" width="40" height="10" rx="2" fill="#fff" />
      </g>
    )}
    <PriceTag x={140} y={36} text={price} w={74} />
  </QFig>
);

/** Fák a magasságvonalak mellett. */
const TreesFig: React.FC<{ lines: number[]; trees: { name: string; h: number }[] }> = ({ lines, trees }) => {
  const lo = lines[0] - 10;
  const Y = (cm: number) => 118 - (cm - lo) * 2.6;
  return (
    <QFig h={140}>
      <rect x="2" y="118" width="236" height="20" fill="#bbf7d0" />
      {lines.map((cm) => (
        <g key={cm}>
          <line x1="60" y1={Y(cm)} x2="232" y2={Y(cm)} stroke="#64748b" strokeDasharray="4 3" />
          <text x="56" y={Y(cm) + 4} textAnchor="end" fontSize="10.5" fill="#334155">{cm} cm</text>
        </g>
      ))}
      {trees.map((t, i) => {
        const x = 110 + i * 70;
        const top = Y(t.h);
        return (
          <g key={t.name}>
            <rect x={x - 4} y={(top + 118) / 2} width="8" height={118 - (top + 118) / 2} fill="#92400e" />
            <ellipse cx={x} cy={(top + (top + 118) / 2) / 2 + 2} rx="18" ry={((top + 118) / 2 - top) / 2 + 2} fill="#22c55e" stroke="#15803d" />
            <text x={x} y="133" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#14532d">{t.name}</text>
          </g>
        );
      })}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const ROUNDING_500_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'r500g3-q1',
    level: 1,
    questionTypeBadge: 'Egyes szomszédok',
    figure: <RowFig items={['?', '268', '?']} />,
    question: 'Melyek a 268 egyes szomszédai?',
    options: ['267 és 269', '260 és 270', '258 és 278', '266 és 270'],
    correctAnswer: 0,
    explanation: 'Egyet lépünk vissza és egyet előre: 267 és 269.'
  },
  {
    id: 'r500g3-q2',
    level: 1,
    questionTypeBadge: 'Tízes szomszédok',
    figure: <TLine lo={428} hi={442} labels={[430, 440]} marks={[{ v: 434, color: '#a16207' }]} />,
    question: 'Melyek a 434 tízes szomszédai?',
    options: ['430 és 440', '433 és 435', '400 és 500', '420 és 430'],
    correctAnswer: 0,
    explanation: 'A 434 a 430 és a 440 között van. Ez a két legközelebbi kerek tízes.'
  },
  {
    id: 'r500g3-q3',
    level: 1,
    questionTypeBadge: 'Százas szomszédok',
    figure: <HLine lo={300} marks={[{ v: 368, color: '#a16207' }]} />,
    question: 'Melyek a 368 százas szomszédai?',
    options: ['300 és 400', '360 és 370', '367 és 369', '200 és 300'],
    correctAnswer: 0,
    explanation: 'A 368 a 300 és a 400 között van. Ez a két legközelebbi kerek százas.'
  },
  {
    id: 'r500g3-q4',
    level: 1,
    questionTypeBadge: 'Kerekítés tízesre',
    figure: <TLine lo={238} hi={252} labels={[240, 250]} marks={[{ v: 243, color: '#a16207' }]} />,
    question: 'Kerekítsd tízesre: 243 ≈ ?',
    options: ['240', '250', '200', '243'],
    correctAnswer: 0,
    explanation: 'Az egyesek helyén 3 áll. Ez kevesebb, mint 5, ezért lefelé: 243 ≈ 240.'
  },
  {
    id: 'r500g3-q5',
    level: 1,
    questionTypeBadge: 'Kerekítés tízesre',
    question: 'Kerekítsd tízesre: 467 ≈ ?',
    options: ['470', '460', '500', '400'],
    correctAnswer: 0,
    explanation: 'Az egyesek helyén 7 áll. Ez 5 vagy több, ezért felfelé: 467 ≈ 470.'
  },
  {
    id: 'r500g3-q6',
    level: 1,
    questionTypeBadge: 'Kerekítés százasra',
    figure: <HLine lo={200} marks={[{ v: 218, color: '#a16207' }]} />,
    question: 'Kerekítsd százasra: 218 ≈ ?',
    options: ['200', '300', '220', '210'],
    correctAnswer: 0,
    explanation: 'A tízesek helyén 1 áll. Ez kevesebb, mint 5, ezért lefelé: 218 ≈ 200.'
  },
  {
    id: 'r500g3-q7',
    level: 1,
    questionTypeBadge: 'Kerekítés százasra',
    figure: <HLine lo={300} marks={[{ v: 381, color: '#a16207' }]} />,
    question: 'Kerekítsd százasra: 381 ≈ ?',
    options: ['400', '300', '380', '390'],
    correctAnswer: 0,
    explanation: 'A tízesek helyén 8 áll. Ez 5 vagy több, ezért felfelé: 381 ≈ 400.'
  },
  {
    id: 'r500g3-q8',
    level: 1,
    questionTypeBadge: 'Kerek százas',
    question: 'Mennyi a 300 százasra kerekítve?',
    options: ['300', '400', '200', '350'],
    correctAnswer: 0,
    explanation: 'A 300 már kerek százas. Nem kell kerekíteni: 300 ≈ 300.'
  },
  {
    id: 'r500g3-q9',
    level: 1,
    questionTypeBadge: 'A ≈ jel',
    figure: <ApproxFig a="412" b="410" />,
    question: 'Mit jelent ez a jel: ≈?',
    options: ['körülbelül egyenlő', 'pontosan egyenlő', 'nagyobb', 'kisebb'],
    correctAnswer: 0,
    explanation: 'A ≈ jel azt jelenti: körülbelül egyenlő. A 412 körülbelül 410.'
  },
  {
    id: 'r500g3-q10',
    level: 1,
    questionTypeBadge: 'Kerekítés százasra',
    figure: <HLine lo={400} marks={[{ v: 450, color: '#a16207' }]} />,
    question: 'A 450 pont középen van. Kerekítsd százasra!',
    options: ['500', '400', '450', '410'],
    correctAnswer: 0,
    explanation: 'Ha a tízesek helyén 5 áll, a nagyobb százasra kerekítünk: 450 ≈ 500.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'r500g3-q11',
    level: 2,
    questionTypeBadge: 'Kerekítés tízesre',
    figure: <TLine lo={488} hi={500} labels={[490, 500]} marks={[{ v: 495, color: '#a16207' }]} />,
    question: 'Kerekítsd tízesre: 495 ≈ ?',
    options: ['500', '490', '400', '495'],
    correctAnswer: 0,
    explanation: 'Az egyesek helyén 5 áll, ezért felfelé kerekítünk. A 490 után az 500 jön: 495 ≈ 500.'
  },
  {
    id: 'r500g3-q12',
    level: 2,
    questionTypeBadge: 'Kerekítés százasra',
    figure: <HiddenFig digits={['1', '4', '9']} caption="Százasra kerekítünk." />,
    question: 'Kerekítsd százasra: 149 ≈ ?',
    options: ['100', '200', '150', '140'],
    correctAnswer: 0,
    explanation: 'Csak a tízeseket nézd! A tízesek helyén 4 áll, ezért lefelé: 149 ≈ 100. A 149 még nem érte el a 150-et.'
  },
  {
    id: 'r500g3-q13',
    level: 2,
    questionTypeBadge: 'Kerekítés százasra',
    figure: <HLine lo={0} marks={[{ v: 98, color: '#a16207' }]} />,
    question: 'Kerekítsd százasra: 98 ≈ ?',
    options: ['100', '0', '90', '200'],
    correctAnswer: 0,
    explanation: 'A 98 a 0 és a 100 között van, nagyon közel a 100-hoz: 98 ≈ 100.'
  },
  {
    id: 'r500g3-q14',
    level: 2,
    questionTypeBadge: 'Tízes szomszédok',
    figure: <RowFig items={['?', '300', '?']} caption="kisebb tízes – a szám – nagyobb tízes" />,
    question: 'Melyek a 300 tízes szomszédai?',
    options: ['290 és 310', '300 és 310', '200 és 400', '299 és 301'],
    correctAnswer: 0,
    explanation: 'A szám nem lehet a saját szomszédja. A 300 előtti kerek tízes a 290, utána a 310.'
  },
  {
    id: 'r500g3-q15',
    level: 2,
    questionTypeBadge: 'Százas szomszédok',
    figure: <RowFig items={['?', '400', '?']} caption="kisebb százas – a szám – nagyobb százas" />,
    question: 'Melyek a 400 százas szomszédai?',
    options: ['300 és 500', '400 és 500', '390 és 410', '300 és 400'],
    correctAnswer: 0,
    explanation: 'A 400 kerek százas. Az előtte lévő kerek százas a 300, az utána lévő az 500.'
  },
  {
    id: 'r500g3-q16',
    level: 2,
    questionTypeBadge: 'Kerekítés tízesre',
    question: 'Melyik szám tízesre kerekített értéke 260?',
    options: ['256', '254', '266', '250'],
    correctAnswer: 0,
    explanation: '256 ≈ 260, mert az egyes 6. A 254 és a 250 ≈ 250, a 266 ≈ 270.'
  },
  {
    id: 'r500g3-q17',
    level: 2,
    questionTypeBadge: 'Hosszúság',
    figure: <HLine lo={200} marks={[{ v: 236, label: '236 m', color: '#a16207' }]} />,
    question: 'A kerítés 236 m hosszú. Mennyi ez százasra kerekítve?',
    options: ['200 m', '240 m', '300 m', '230 m'],
    correctAnswer: 0,
    explanation: 'A tízesek helyén 3 áll, ezért lefelé: 236 m ≈ 200 m. (A 240 m a tízesre kerekítés.)'
  },
  {
    id: 'r500g3-q18',
    level: 2,
    questionTypeBadge: 'Árak',
    figure: <PriceFig item="ball" price="345 Ft" />,
    question: 'Mennyibe kerül a labda tízesre kerekítve?',
    options: ['350 Ft', '340 Ft', '300 Ft', '400 Ft'],
    correctAnswer: 0,
    explanation: 'Az egyesek helyén 5 áll, ezért felfelé: 345 Ft ≈ 350 Ft.'
  },
  {
    id: 'r500g3-q19',
    level: 2,
    questionTypeBadge: 'Közelebb',
    figure: (
      <RLine
        lo={350}
        hi={460}
        tickEvery={10}
        bigEvery={50}
        labels={[350, 400, 450]}
        marks={[
          { v: 362, color: '#7c3aed' },
          { v: 412, color: '#059669' },
          { v: 438, color: '#ea580c' },
          { v: 455, color: '#2563eb' }
        ]}
        W={240}
        H={84}
        className={CLS}
      />
    ),
    question: 'Melyik szám van a legközelebb a 400-hoz?',
    options: ['412', '362', '438', '455'],
    correctAnswer: 0,
    explanation: 'A 412 csak 12 lépésre van a 400-tól. A 362 és a 438 is 38 lépésre, a 455 pedig 55 lépésre.'
  },
  {
    id: 'r500g3-q20',
    level: 2,
    questionTypeBadge: 'Visszafelé',
    figure: <TLine lo={472} hi={488} labels={[475, 480, 485]} marks={[{ v: 480, label: '480', color: '#a16207' }]} />,
    question: 'Hány olyan szám van, amelynek tízesre kerekített értéke 480?',
    options: ['10', '9', '5', '11'],
    correctAnswer: 0,
    explanation: 'Lentről: 475, 476, 477, 478, 479. Maga a 480. Fentről: 481, 482, 483, 484. Ez 10 szám.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'r500g3-q21',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    figure: <RLine lo={200} hi={400} tickEvery={10} bigEvery={50} labels={[200, 250, 300, 350, 400]} marks={[{ v: 300, label: '300', color: '#a16207' }]} W={240} H={84} className={CLS} />,
    question: 'Melyik számokból lesz 300, ha százasra kerekítünk?',
    options: ['250-től 349-ig', '300-tól 399-ig', '200-tól 300-ig', '251-től 350-ig'],
    correctAnswer: 0,
    explanation: 'Lentről a 250-től jönnek (az 5 tízes már felfelé megy). Fentről a 349-ig, mert a 350 már 400 lesz.'
  },
  {
    id: 'r500g3-q22',
    level: 3,
    questionTypeBadge: 'Letakart jegy',
    figure: <HiddenFig digits={['4', '?', '7']} caption="Az egyik jegyet letakartuk." />,
    question: 'Tízesre kerekítve felfelé kell kerekíteni. Biztos ez?',
    options: ['Biztos', 'Lehet, de nem biztos', 'Lehetetlen', 'Csak ha □ = 0'],
    correctAnswer: 0,
    explanation: 'Tízesre az egyest nézzük. Az egyes 7, ez látszik. 7 ≥ 5, ezért mindig felfelé: biztos.'
  },
  {
    id: 'r500g3-q23',
    level: 3,
    questionTypeBadge: 'Letakart jegy',
    figure: <HiddenFig digits={['4', '?', '7']} caption="Az egyik jegyet letakartuk." />,
    question: 'Százasra kerekítve 500 lesz. Biztos ez?',
    options: ['Lehet, de nem biztos', 'Biztos', 'Lehetetlen', 'Csak ha □ = 0'],
    correctAnswer: 0,
    explanation: 'Százasra a tízest nézzük, de az le van takarva. Ha 5–9 van alatta, 500 lesz (pl. 457). Ha 0–4, akkor 400 (pl. 427).'
  },
  {
    id: 'r500g3-q24',
    level: 3,
    questionTypeBadge: 'Letakart jegy',
    figure: <HiddenFig digits={['3', '?', '2']} caption="Az egyik jegyet letakartuk." />,
    question: 'Tízesre kerekítve 400 lesz. Biztos ez?',
    options: ['Lehetetlen', 'Biztos', 'Lehet, de nem biztos', 'Csak ha □ = 9'],
    correctAnswer: 0,
    explanation: 'A legnagyobb ilyen szám a 392. Az egyes 2, ezért lefelé: 392 ≈ 390. 400 sosem lesz belőle.'
  },
  {
    id: 'r500g3-q25',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    figure: <HiddenFig digits={['?', '?', '7']} caption="tízesre ≈ 250, százasra ≈ 200" />,
    question: 'Tízesre kerekítve 250, százasra kerekítve 200. Az egyesek helyén 7 áll. Melyik szám ez?',
    options: ['247', '257', '207', '297'],
    correctAnswer: 0,
    explanation: 'Tízesre 250: 245-től 254-ig. Ebből 7-esre végződik: 247. Százasra: 247 ≈ 200, mert a tízes 4. Jó!'
  },
  {
    id: 'r500g3-q26',
    level: 3,
    questionTypeBadge: 'Becslés',
    figure: (
      <QFig h={60}>
        <PriceTag x={22} y={18} text="289 Ft" w={78} />
        <text x="120" y="35" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#334155">+</text>
        <PriceTag x={140} y={18} text="108 Ft" w={78} />
      </QFig>
    ),
    question: 'Egy kisautó 289 Ft, egy radír 108 Ft. Kerekítsd százasra az árakat! Kb. mennyit fizetsz?',
    options: ['400 Ft', '300 Ft', '500 Ft', '390 Ft'],
    correctAnswer: 0,
    explanation: '289 ≈ 300 és 108 ≈ 100. 300 + 100 = 400. Kb. 400 Ft. (Pontosan 397 Ft.)'
  },
  {
    id: 'r500g3-q27',
    level: 3,
    questionTypeBadge: 'Letakart jegy',
    figure: <HiddenFig digits={['3', '?', '6']} caption="százasra kerekítve ≈ 400" />,
    question: 'Melyik jegy lehet a □ helyén, hogy százasra kerekítve 400 legyen?',
    options: ['7', '4', '3', '0'],
    correctAnswer: 0,
    explanation: '376 ≈ 400, mert a tízes 7. A 346, 336, 306 mind 300 lesz, mert ott a tízes kisebb, mint 5.'
  },
  {
    id: 'r500g3-q28',
    level: 3,
    questionTypeBadge: 'Kétféle kerekítés',
    question: 'Melyik szám tízesre és százasra kerekítve is ugyanannyi?',
    options: ['302', '352', '318', '265'],
    correctAnswer: 0,
    explanation: '302 ≈ 300 tízesre és 302 ≈ 300 százasra is. A többinél más jön ki: 352 ≈ 350 és ≈ 400.'
  },
  {
    id: 'r500g3-q29',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    figure: <RowFig items={['300', '?', '360']} caption="kisebb százas – a szám – nagyobb tízes" />,
    question: 'A kisebb százas szomszédja 300, a nagyobb tízes szomszédja 360. Az egyesek helyén 4 áll. Melyik szám ez?',
    options: ['354', '364', '344', '254'],
    correctAnswer: 0,
    explanation: 'Ha a nagyobb tízes szomszéd 360, a szám 351 és 359 között van. 4-re végződik: 354.'
  },
  {
    id: 'r500g3-q30',
    level: 3,
    questionTypeBadge: 'Magasság',
    figure: <TreesFig lines={[240, 250, 260]} trees={[{ name: 'A', h: 245 }, { name: 'B', h: 254 }]} />,
    question: 'Az A fa 245 cm, a B fa 254 cm magas. Mennyi a magasságuk tízesre kerekítve?',
    options: ['Mindkettő kb. 250 cm', 'A kb. 240 cm, B kb. 250 cm', 'A kb. 250 cm, B kb. 260 cm', 'A kb. 240 cm, B kb. 260 cm'],
    correctAnswer: 0,
    explanation: '245 ≈ 250, mert az egyes 5. 254 ≈ 250, mert az egyes 4. Kerekítve egyformák, pedig 9 cm a különbség!'
  }
];

export const Rounding500G3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="szamolas-500-ig"
      topicId="g3-c500-kerekites-quiz"
      subtopicId="szamszomszedok-kerekites"
      title="2. Számszomszédok, kerekítés – Kvíz"
      subtitle="30 feladat 3 szinten: egyes, tízes és százas szomszédok, kerekítés tízesre és százasra, becslés."
      badge="3. OSZTÁLY • V. SZÁMOLÁS 0-TÓL 500-IG • KVÍZ"
      questions={ROUNDING_500_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Szomszédok',
          items: ['Egyes: 367 < 368 < 369', 'Tízes: 360 < 368 < 370', 'Százas: 300 < 368 < 400', 'A 300 százas szomszédai: 200 és 400']
        },
        {
          title: 'Kerekítés',
          items: ['Tízesre: nézd az egyest! 243 ≈ 240, 247 ≈ 250', 'Százasra: nézd a tízest! 226 ≈ 200, 281 ≈ 300', '5 → mindig felfelé: 450 ≈ 500']
        },
        {
          title: 'Vigyázz!',
          items: ['Csak egyszer kerekíts! 349 ≈ 300', 'Kerek százas marad: 400 ≈ 400', 'Ezekből lesz 300: 250-től 349-ig']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Rounding500G3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Rounding500G3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Rounding500G3Quiz;
