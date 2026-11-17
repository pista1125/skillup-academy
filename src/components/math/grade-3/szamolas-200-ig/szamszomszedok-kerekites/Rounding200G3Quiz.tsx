import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Rounding200G3Matcher } from './Rounding200G3Matcher';
import { Rounding200G3Sorter } from './Rounding200G3Sorter';
import { FONT, UNK, NumLine, LineMark, PriceTag, DigitCards } from './Rounding200G3Parts';

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

/** Számegyenes-részlet a kérdésekhez. */
const Line: React.FC<{ lo: number; hi: number; marks: LineMark[]; labels: number[] }> = ({ lo, hi, marks, labels }) => (
  <NumLine lo={lo} hi={hi} marks={marks} labelSet={labels} W={240} H={84} className={CLS} />
);

/** Szomszédsor: dobozok egymás mellett, '?' = keresett. */
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

/** Növények a magasságvonalak mellett. */
const PlantsFig: React.FC<{ lines: number[]; plants: { name: string; h: number }[] }> = ({ lines, plants }) => {
  const lo = lines[0] - 10;
  const Y = (cm: number) => 118 - (cm - lo) * 2.2;
  const step = 160 / plants.length;
  return (
    <QFig h={140}>
      <rect x="2" y="118" width="236" height="20" fill="#bbf7d0" />
      {lines.map((cm) => (
        <g key={cm}>
          <line x1="58" y1={Y(cm)} x2="232" y2={Y(cm)} stroke="#64748b" strokeDasharray="4 3" />
          <text x="54" y={Y(cm) + 4} textAnchor="end" fontSize="10.5" fill="#334155">{cm} cm</text>
        </g>
      ))}
      {plants.map((p, i) => {
        const x = 72 + step * i + step / 2;
        const top = Y(p.h);
        return (
          <g key={p.name}>
            <line x1={x} y1="118" x2={x} y2={top} stroke="#15803d" strokeWidth="3.5" />
            <path d={`M ${x} ${(118 + top) / 2} q 12 -8 16 3 q -10 5 -16 -3`} fill="#22c55e" />
            <circle cx={x} cy={top} r="7" fill="#f472b6" stroke="#9d174d" />
            <circle cx={x} cy={top} r="2.5" fill="#fde047" />
            <text x={x} y="133" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#14532d">{p.name}</text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Árcédulás tárgyak. */
const PricesFig: React.FC<{ items: { name: string; price: number; color: string }[] }> = ({ items }) => {
  const step = 240 / items.length;
  return (
    <QFig h={100}>
      {items.map((it, i) => {
        const cx = step * i + step / 2;
        return (
          <g key={it.name}>
            {it.name === 'labda' ? (
              <g>
                <circle cx={cx} cy="34" r="18" fill={it.color} stroke="#334155" strokeWidth="1.4" />
                <path d={`M ${cx - 18} 34 Q ${cx} 22 ${cx + 18} 34`} fill="none" stroke="#fff" strokeWidth="2" />
              </g>
            ) : it.name === 'ceruza' ? (
              <g>
                <rect x={cx - 30} y="28" width="48" height="12" fill={it.color} stroke="#334155" />
                <path d={`M ${cx + 18} 28 L ${cx + 30} 34 L ${cx + 18} 40 Z`} fill="#fde68a" stroke="#334155" />
              </g>
            ) : (
              <rect x={cx - 20} y="24" width="40" height="20" rx="4" fill={it.color} stroke="#334155" />
            )}
            <PriceTag x={cx - 30} y={60} w={62} text={`${it.price} Ft`} />
            <text x={cx} y="96" textAnchor="middle" fontSize="10.5" fill="#475569">{it.name}</text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Hiányzó számjegy + kerekített érték. */
const MissingDigitFig: React.FC<{ digits: string[]; rounded: number }> = ({ digits, rounded }) => (
  <QFig h={76}>
    <DigitCards x={34} y={14} digits={digits} s={34} />
    <text x="160" y="50" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#d97706">≈</text>
    <text x="205" y="50" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0f172a">{rounded}</text>
  </QFig>
);

/** Számkártyák egymás mellett. */
const CardsFig: React.FC<{ nums: number[] }> = ({ nums }) => {
  const w = 58;
  const gap = 14;
  const x0 = (240 - (nums.length * w + (nums.length - 1) * gap)) / 2;
  return (
    <QFig h={70}>
      {nums.map((n, i) => (
        <g key={n}>
          <rect x={x0 + i * (w + gap)} y="14" width={w} height="40" rx="8" fill="#fef9c3" stroke="#a16207" strokeWidth="1.6" />
          <text x={x0 + i * (w + gap) + w / 2} y="41" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#713f12">{n}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Nagy jel egy példával. */
const SignFig: React.FC = () => (
  <QFig h={70}>
    <text x="70" y="46" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#0f172a">158</text>
    <text x="120" y="48" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#d97706">≈</text>
    <text x="170" y="46" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#0f172a">160</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const ROUNDING_200_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'r200g3-q1',
    level: 1,
    questionTypeBadge: 'Egyes szomszéd',
    figure: <Line lo={124} hi={132} labels={[]} marks={[{ v: 128, color: '#a16207' }, { v: 129, label: '?' }]} />,
    question: 'Melyik a 128 nagyobb egyes szomszédja?',
    options: ['129', '127', '138', '130'],
    correctAnswer: 0,
    explanation: 'A nagyobb egyes szomszéd 1-gyel nagyobb: 128 + 1 = 129.'
  },
  {
    id: 'r200g3-q2',
    level: 1,
    questionTypeBadge: 'Egyes szomszéd',
    question: 'Melyik a 153 kisebb egyes szomszédja?',
    options: ['152', '154', '143', '150'],
    correctAnswer: 0,
    explanation: 'A kisebb egyes szomszéd 1-gyel kisebb: 153 − 1 = 152.'
  },
  {
    id: 'r200g3-q3',
    level: 1,
    questionTypeBadge: 'Tízes szomszéd',
    figure: <Line lo={158} hi={192} labels={[160, 190]} marks={[{ v: 176, color: '#a16207' }]} />,
    question: 'Melyik két kerek tízes között van a 176?',
    options: ['170 és 180', '160 és 170', '175 és 177', '180 és 190'],
    correctAnswer: 0,
    explanation: 'A 176-ban 17 tízes van. Előtte a 170, utána a 180 jön. Ezek a tízes szomszédai.'
  },
  {
    id: 'r200g3-q4',
    level: 1,
    questionTypeBadge: 'Tízes szomszéd',
    question: 'Melyek a 104 tízes szomszédai?',
    options: ['100 és 110', '103 és 105', '90 és 100', '110 és 120'],
    correctAnswer: 0,
    explanation: 'A 104 a 100 és a 110 között van. A 103 és a 105 az egyes szomszédai.'
  },
  {
    id: 'r200g3-q5',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    figure: <Line lo={128} hi={142} labels={[130, 140]} marks={[{ v: 132, color: '#a16207' }]} />,
    question: 'Kerekítsd tízesre! 132 ≈ ?',
    options: ['130', '140', '135', '100'],
    correctAnswer: 0,
    explanation: 'Az egyesek helyén 2 áll. Ez kevesebb 5-nél, ezért a kisebb tízes jön: 132 ≈ 130.'
  },
  {
    id: 'r200g3-q6',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    figure: <Line lo={178} hi={192} labels={[180, 190]} marks={[{ v: 187, color: '#a16207' }]} />,
    question: 'Kerekítsd tízesre! 187 ≈ ?',
    options: ['190', '180', '185', '200'],
    correctAnswer: 0,
    explanation: 'Az egyesek helyén 7 áll. Ez 5 vagy több, ezért a nagyobb tízes jön: 187 ≈ 190.'
  },
  {
    id: 'r200g3-q7',
    level: 1,
    questionTypeBadge: 'A ≈ jel',
    figure: <SignFig />,
    question: 'Mit jelent a ≈ jel?',
    options: ['körülbelül egyenlő', 'pontosan egyenlő', 'kisebb, mint', 'nagyobb, mint'],
    correctAnswer: 0,
    explanation: 'A ≈ jelentése: körülbelül egyenlő. A 158 körülbelül 160.'
  },
  {
    id: 'r200g3-q8',
    level: 1,
    questionTypeBadge: 'Magasság',
    figure: <PlantsFig lines={[110, 120, 130]} plants={[{ name: 'virág', h: 124 }]} />,
    question: 'Mit tudsz a virág magasságáról?',
    options: ['120 cm-nél magasabb, de 130 cm-nél alacsonyabb', '130 cm-nél magasabb', 'Pontosan 120 cm magas', '110 cm-nél alacsonyabb'],
    correctAnswer: 0,
    explanation: 'A virág feje a 120 cm-es és a 130 cm-es vonal között van. A pontos magasságát nem látjuk.'
  },
  {
    id: 'r200g3-q9',
    level: 1,
    questionTypeBadge: 'Kerek tízes',
    question: 'Kerekítsd tízesre! 140 ≈ ?',
    options: ['140', '150', '130', '100'],
    correctAnswer: 0,
    explanation: 'A 140 kerek tízes. A kerek tízes tízesre kerekítve önmaga: 140 ≈ 140.'
  },
  {
    id: 'r200g3-q10',
    level: 1,
    questionTypeBadge: 'Egyes szomszéd',
    figure: <RowFig items={['159', '?', '161']} caption="A két szélső szám az egyes szomszéd." />,
    question: 'Melyik számnak az egyes szomszédai a 159 és a 161?',
    options: ['160', '150', '170', '158'],
    correctAnswer: 0,
    explanation: 'A 159 és a 161 között egyetlen szám van: a 160.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'r200g3-q11',
    level: 2,
    questionTypeBadge: 'Kerekítés 5-tel',
    figure: <Line lo={158} hi={172} labels={[160, 170]} marks={[{ v: 165, color: '#a16207' }]} />,
    question: 'Kerekítsd tízesre! 165 ≈ ?',
    options: ['170', '160', '165', '200'],
    correctAnswer: 0,
    explanation: 'A 165 pont középen van. Ha az egyesek helyén 5 áll, a nagyobb tízesre kerekítünk: 165 ≈ 170.'
  },
  {
    id: 'r200g3-q12',
    level: 2,
    questionTypeBadge: 'Kerekítés 5-tel',
    question: 'Kerekítsd tízesre! 195 ≈ ?',
    options: ['200', '190', '195', '100'],
    correctAnswer: 0,
    explanation: 'Az egyesek helyén 5 áll, ezért felfelé kerekítünk. A 190 utáni kerek tízes a 200. 195 ≈ 200.'
  },
  {
    id: 'r200g3-q13',
    level: 2,
    questionTypeBadge: 'Kerekítés',
    figure: <Line lo={88} hi={102} labels={[90, 100]} marks={[{ v: 96, color: '#a16207' }]} />,
    question: 'Kerekítsd tízesre! 96 ≈ ?',
    options: ['100', '90', '95', '106'],
    correctAnswer: 0,
    explanation: 'A 96 közelebb van a 100-hoz: csak 4 lépés. 96 ≈ 100.'
  },
  {
    id: 'r200g3-q14',
    level: 2,
    questionTypeBadge: 'Tízes szomszéd',
    figure: <RowFig items={['?', '190', '?']} caption="kisebb tízes – szám – nagyobb tízes" />,
    question: 'Melyek a 190 tízes szomszédai?',
    options: ['180 és 200', '190 és 200', '180 és 190', '189 és 191'],
    correctAnswer: 0,
    explanation: 'A 190 kerek tízes. Nem lehet a saját szomszédja. Előtte a 180, utána a 200 a kerek tízes.'
  },
  {
    id: 'r200g3-q15',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <Line lo={138} hi={162} labels={[140, 150, 160]} marks={[{ v: 157, label: '?' }]} />,
    question: 'Kerekítsd tízesre a ? helyén lévő számot!',
    options: ['160', '150', '157', '170'],
    correctAnswer: 0,
    explanation: 'A ? helyén a 157 áll (150 után 7 lépés). Az egyes 7, ezért felfelé: 157 ≈ 160.'
  },
  {
    id: 'r200g3-q16',
    level: 2,
    questionTypeBadge: 'Becslés',
    figure: <PricesFig items={[{ name: 'labda', price: 128, color: '#f97316' }]} />,
    question: 'Körülbelül mennyibe kerül a labda?',
    options: ['kb. 130 Ft', 'kb. 120 Ft', 'kb. 100 Ft', 'kb. 140 Ft'],
    correctAnswer: 0,
    explanation: 'Kerekítsd tízesre: 128 ≈ 130, mert az egyes 8. A labda kb. 130 Ft.'
  },
  {
    id: 'r200g3-q17',
    level: 2,
    questionTypeBadge: 'Kerekítés',
    question: 'Melyik szám tízesre kerekítve NEM 140?',
    options: ['146', '135', '144', '139'],
    correctAnswer: 0,
    explanation: '146 ≈ 150, mert az egyes 6. A többi: 135 ≈ 140, 144 ≈ 140, 139 ≈ 140.'
  },
  {
    id: 'r200g3-q18',
    level: 2,
    questionTypeBadge: 'Igaz vagy hamis?',
    question: 'Melyik igaz?',
    options: ['173 ≈ 170', '173 ≈ 180', '176 ≈ 170', '171 ≈ 180'],
    correctAnswer: 0,
    explanation: '173-ban az egyes 3, ezért lefelé: 173 ≈ 170. A többi hamis: 176 ≈ 180 és 171 ≈ 170.'
  },
  {
    id: 'r200g3-q19',
    level: 2,
    questionTypeBadge: 'Magasság',
    figure: <PlantsFig lines={[130, 140, 150]} plants={[{ name: 'A', h: 134 }, { name: 'B', h: 145 }, { name: 'C', h: 153 }]} />,
    question: 'Melyik virág 140 cm-nél magasabb, de 150 cm-nél alacsonyabb?',
    options: ['B', 'A', 'C', 'Egyik sem'],
    correctAnswer: 0,
    explanation: 'A B virág feje a 140 cm-es és a 150 cm-es vonal között van. Az A alacsonyabb, a C magasabb.'
  },
  {
    id: 'r200g3-q20',
    level: 2,
    questionTypeBadge: 'Tízes szomszéd',
    question: 'Melyik a 118 nagyobb tízes szomszédja?',
    options: ['120', '110', '119', '128'],
    correctAnswer: 0,
    explanation: 'A 118 a 110 és a 120 között van. A nagyobb tízes szomszéd a 120.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'r200g3-q21',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    figure: <Line lo={162} hi={178} labels={[]} marks={[{ v: 170, color: '#a16207' }]} />,
    question: 'Hány szám van, amelyet tízesre kerekítve 170 lesz?',
    options: ['10', '9', '5', '11'],
    correctAnswer: 0,
    explanation: 'Ezek a számok: 165, 166, 167, 168, 169, 170, 171, 172, 173, 174. Ez 10 szám.'
  },
  {
    id: 'r200g3-q22',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'Melyik a legkisebb szám, amelyet tízesre kerekítve 130 lesz?',
    options: ['125', '121', '120', '126'],
    correctAnswer: 0,
    explanation: 'Lentről a 125-től kezdve kerekítünk 130-ra. A 124 még 120 lenne. Tehát a 125.'
  },
  {
    id: 'r200g3-q23',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'Melyik a legnagyobb szám, amelyet tízesre kerekítve 180 lesz?',
    options: ['184', '185', '189', '179'],
    correctAnswer: 0,
    explanation: 'A 184 még 180 lesz. A 185-ben már 5 az egyes, abból 190 lesz. Tehát a 184.'
  },
  {
    id: 'r200g3-q24',
    level: 3,
    questionTypeBadge: 'Hiányzó számjegy',
    figure: <MissingDigitFig digits={['1', '□', '4']} rounded={150} />,
    question: 'Melyik számjegy hiányzik? A szám tízesre kerekítve 150.',
    options: ['5', '4', '6', '1'],
    correctAnswer: 0,
    explanation: '154 ≈ 150, mert az egyes 4. Ha 4 lenne a helyén, 144 ≈ 140 lenne. Tehát az 5 hiányzik.'
  },
  {
    id: 'r200g3-q25',
    level: 3,
    questionTypeBadge: 'Hiányzó számjegy',
    figure: <MissingDigitFig digits={['1', '6', '□']} rounded={160} />,
    question: 'Melyik számjegy lehet a helyén? A szám tízesre kerekítve 160.',
    options: ['3', '5', '7', '9'],
    correctAnswer: 0,
    explanation: '163 ≈ 160. De 165 ≈ 170, 167 ≈ 170 és 169 ≈ 170. Csak 0, 1, 2, 3 vagy 4 lehet. Ezek közül itt a 3 van.'
  },
  {
    id: 'r200g3-q26',
    level: 3,
    questionTypeBadge: 'Becslés',
    figure: <PricesFig items={[{ name: 'ceruza', price: 47, color: '#22c55e' }, { name: 'radír', price: 32, color: '#60a5fa' }]} />,
    question: 'Kerekítsd tízesre az árakat, és add össze! Kb. mennyit fizetsz?',
    options: ['kb. 80 Ft', 'kb. 70 Ft', 'kb. 90 Ft', 'kb. 60 Ft'],
    correctAnswer: 0,
    explanation: '47 ≈ 50 és 32 ≈ 30. 50 + 30 = 80. Kb. 80 Ft-ot fizetsz. (Pontosan 79 Ft.)'
  },
  {
    id: 'r200g3-q27',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    figure: <RowFig items={['136', '?']} caption="kisebb egyes szomszéd – a gondolt szám" />,
    question: 'A gondolt szám kisebb egyes szomszédja a 136. Kerekítsd tízesre a gondolt számot!',
    options: ['140', '130', '137', '150'],
    correctAnswer: 0,
    explanation: 'A gondolt szám 1-gyel nagyobb: 137. Az egyes 7, ezért felfelé: 137 ≈ 140.'
  },
  {
    id: 'r200g3-q28',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    figure: <RowFig items={['150', '1?5', '160']} caption="tízes szomszédok – a gondolt szám" />,
    question: 'A szám tízes szomszédai 150 és 160. Az egyesek helyén 5 áll. Mennyi a tízesre kerekített értéke?',
    options: ['160', '150', '155', '165'],
    correctAnswer: 0,
    explanation: 'A szám a 155. Ha 5 az egyes, felfelé kerekítünk: 155 ≈ 160.'
  },
  {
    id: 'r200g3-q29',
    level: 3,
    questionTypeBadge: 'Magasság',
    question: 'Panni 126 cm, Marci 134 cm magas. Mennyi a magasságuk tízesre kerekítve?',
    options: ['Mindkettő kb. 130 cm', 'Panni kb. 120 cm, Marci kb. 130 cm', 'Panni kb. 130 cm, Marci kb. 140 cm', 'Panni kb. 120 cm, Marci kb. 140 cm'],
    correctAnswer: 0,
    explanation: '126 ≈ 130, mert az egyes 6. 134 ≈ 130, mert az egyes 4. Kerekítve egyformák, pedig Marci 8 cm-rel magasabb!'
  },
  {
    id: 'r200g3-q30',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CardsFig nums={[143, 148, 152]} />,
    question: 'Melyik két kártyán lévő szám kerekítve ugyanannyi?',
    options: ['148 és 152', '143 és 148', '143 és 152', 'Mind a három'],
    correctAnswer: 0,
    explanation: '143 ≈ 140, 148 ≈ 150, 152 ≈ 150. Tehát a 148 és a 152 is 150 lesz.'
  }
];

export const Rounding200G3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="szamolas-200-ig"
      topicId="g3-c200-kerekites-quiz"
      subtopicId="szamszomszedok-kerekites"
      title="3. Számszomszédok, kerekítés – Kvíz"
      subtitle="30 feladat 3 szinten: egyes és tízes szomszédok, kerekítés tízesre, becslés."
      badge="3. OSZTÁLY • III. SZÁMOLÁS 0-TÓL 200-IG • KVÍZ"
      questions={ROUNDING_200_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Szomszédok',
          items: ['Egyes szomszédok: 146 < 147 < 148', 'Tízes szomszédok: 140 < 147 < 150', 'A 160 tízes szomszédai: 150 és 170']
        },
        {
          title: 'Kerekítés tízesre',
          items: ['Nézd az egyeseket!', '0, 1, 2, 3, 4 → le: 133 ≈ 130', '5, 6, 7, 8, 9 → fel: 135 ≈ 140', 'Kerek tízes marad: 180 ≈ 180']
        },
        {
          title: 'Visszafelé',
          items: ['Ezekből lesz 150: 145-től 154-ig', 'Ez 10 szám.', 'A ≈ jelentése: körülbelül egyenlő']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Rounding200G3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Rounding200G3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Rounding200G3Quiz;
