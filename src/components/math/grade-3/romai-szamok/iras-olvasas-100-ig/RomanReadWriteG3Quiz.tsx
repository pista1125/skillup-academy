import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { RomanReadWriteG3Matcher } from './RomanReadWriteG3Matcher';
import { RomanReadWriteG3Sorter } from './RomanReadWriteG3Sorter';
import { SIGN_COLOR } from './RomanReadWriteG3Utils';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';
const SERIF = 'Georgia, "Times New Roman", serif';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const Colored: React.FC<{ s: string; x: number; y: number; size?: number }> = ({ s, x, y, size = 26 }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight="bold" fontFamily={SERIF}>
    {s.split('').map((ch, i) => (
      <tspan key={i} fill={SIGN_COLOR[ch] ?? (ch === '?' ? UNK : '#334155')}>
        {ch}
      </tspan>
    ))}
  </text>
);

const fit = (s: string) => (s.length >= 7 ? 17 : s.length >= 5 ? 21 : 26);

/** Tízesrudak + egyeskockák → ? */
const BlocksFig: React.FC<{ n: number }> = ({ n }) => {
  const t = Math.floor(n / 10);
  const e = n % 10;
  return (
    <QFig h={100}>
      {Array.from({ length: t }, (_, i) => (
        <g key={`t${i}`}>
          <rect x={16 + i * 13} y="18" width="10" height="64" rx="1.5" fill="#60a5fa" stroke="#1e40af" />
          {Array.from({ length: 9 }, (_, k) => (
            <line key={k} x1={16 + i * 13} y1={18 + 6.4 * (k + 1)} x2={26 + i * 13} y2={18 + 6.4 * (k + 1)} stroke="#1e40af" strokeWidth="0.5" />
          ))}
        </g>
      ))}
      {Array.from({ length: e }, (_, i) => (
        <rect key={`e${i}`} x={16 + t * 13 + 6 + (i % 3) * 12} y={72 - Math.floor(i / 3) * 12} width="10" height="10" rx="1.5" fill="#fbbf24" stroke="#92400e" />
      ))}
      <text x="176" y="58" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#334155">= </text>
      <rect x="190" y="32" width="38" height="38" rx="9" fill="#fee2e2" stroke={UNK} strokeWidth="1.5" />
      <text x="209" y="58" textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>?</text>
    </QFig>
  );
};

/** Kőtábla: római szám → ? */
const ReadFig: React.FC<{ s: string }> = ({ s }) => (
  <QFig h={90}>
    <rect x="14" y="16" width="146" height="58" rx="10" fill="#fef3c7" stroke="#a16207" strokeWidth="2" />
    <Colored s={s} x={87} y={55} size={fit(s)} />
    <text x="176" y="54" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#334155">=</text>
    <rect x="190" y="24" width="40" height="42" rx="9" fill="#fee2e2" stroke={UNK} strokeWidth="1.5" />
    <text x="210" y="53" textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

/** Arab szám → üres kőtábla, alatta a bontás helye. */
const WriteFig: React.FC<{ n: number; split?: boolean }> = ({ n, split }) => (
  <QFig h={split ? 112 : 84}>
    <rect x="16" y="18" width="70" height="48" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
    <text x="51" y="51" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#1e3a8a">{n}</text>
    <text x="104" y="51" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">=</text>
    <rect x="122" y="18" width="104" height="48" rx="10" fill="#fef3c7" stroke="#a16207" strokeWidth="2" />
    <text x="174" y="51" textAnchor="middle" fontSize="24" fontWeight="bold" fill={UNK}>?</text>
    {split && (
      <text x="120" y="96" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
        <tspan fill="#1e40af">{Math.floor(n / 10) * 10}</tspan> + <tspan fill="#b45309">{n % 10}</tspan>
      </text>
    )}
  </QFig>
);

/** Két kőtábla összehasonlítása. */
const CompareFig: React.FC<{ a: string; b: string }> = ({ a, b }) => (
  <QFig h={90}>
    <rect x="10" y="18" width="96" height="54" rx="10" fill="#fef3c7" stroke="#a16207" strokeWidth="2" />
    <Colored s={a} x={58} y={53} size={a.length >= 6 ? 15 : a.length >= 4 ? 19 : 24} />
    <circle cx="120" cy="45" r="13" fill="#fee2e2" stroke={UNK} />
    <text x="120" y="51" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>?</text>
    <rect x="134" y="18" width="96" height="54" rx="10" fill="#fef3c7" stroke="#a16207" strokeWidth="2" />
    <Colored s={b} x={182} y={53} size={b.length >= 6 ? 15 : b.length >= 4 ? 19 : 24} />
  </QFig>
);

/** Számszomszéd: [előtte] [szám] [utána], a keresett helyen ?. */
const NeighbourFig: React.FC<{ known: string; side: 'before' | 'after' }> = ({ known, side }) => (
  <QFig h={84}>
    {[0, 1].map((i) => {
      const x = 20 + i * 108;
      const isKnown = side === 'after' ? i === 0 : i === 1;
      return (
        <g key={i}>
          <rect x={x} y="18" width="92" height="48" rx="10" fill={isKnown ? '#fef3c7' : '#fee2e2'} stroke={isKnown ? '#a16207' : UNK} strokeWidth="2" />
          {isKnown ? <Colored s={known} x={x + 46} y={50} size={known.length >= 5 ? 17 : 21} /> : <text x={x + 46} y="51" textAnchor="middle" fontSize="24" fontWeight="bold" fill={UNK}>?</text>}
        </g>
      );
    })}
    <text x="120" y="80" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
      {side === 'after' ? 'eggyel több →' : '← eggyel kevesebb'}
    </text>
  </QFig>
);

/** Római mérföldkő. */
const MilestoneFig: React.FC<{ s: string }> = ({ s }) => (
  <QFig h={130}>
    <path d="M 0 112 Q 120 100 240 112 L 240 128 L 0 128 Z" fill="#d6d3d1" />
    {[0, 1].map((i) => {
      const cx = 70 + i * 100;
      return (
        <g key={i}>
          <path d={`M ${cx - 30} 112 L ${cx - 30} 40 Q ${cx} 14 ${cx + 30} 40 L ${cx + 30} 112 Z`} fill="#e7e5e4" stroke="#57534e" strokeWidth="2" />
          {i === 0 ? (
            <Colored s={s} x={cx} y={78} size={s.length >= 5 ? 14 : 17} />
          ) : (
            <text x={cx} y="80" textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>?</text>
          )}
        </g>
      );
    })}
    <text x="120" y="70" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">+10</text>
  </QFig>
);

/** Két hajó amforákkal (római számmal jelölve). */
const ShipsFig: React.FC<{ a: string; b: string }> = ({ a, b }) => (
  <QFig h={120}>
    <rect x="2" y="92" width="236" height="26" fill="#bae6fd" />
    {[a, b].map((s, i) => {
      const cx = 64 + i * 112;
      return (
        <g key={i}>
          <line x1={cx} y1="16" x2={cx} y2="74" stroke="#78350f" strokeWidth="2.5" />
          <path d={`M ${cx + 2} 20 L ${cx + 32} 52 L ${cx + 2} 60 Z`} fill="#fef3c7" stroke="#a16207" />
          <path d={`M ${cx - 46} 74 L ${cx + 46} 74 L ${cx + 32} 98 L ${cx - 32} 98 Z`} fill="#b45309" stroke="#78350f" strokeWidth="2" />
          <rect x={cx - 30} y="78" width="60" height="16" rx="3" fill="#fff7ed" />
          <Colored s={s} x={cx} y={91} size={13} />
        </g>
      );
    })}
    <text x="120" y="54" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#334155">+</text>
  </QFig>
);

export const ROMAN_READ_WRITE_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'rrw3-q1',
    level: 1,
    questionTypeBadge: 'Írás',
    figure: <BlocksFig n={23} />,
    question: 'Hogyan írjuk rómaiul a 23-at?',
    options: ['XXIII', 'XXXII', 'XIII', 'XXIV'],
    correctAnswer: 0,
    explanation: '23 = 20 + 3. A 20 = XX, a 3 = III. Együtt: XXIII.'
  },
  {
    id: 'rrw3-q2',
    level: 1,
    questionTypeBadge: 'Olvasás',
    figure: <ReadFig s="XXXV" />,
    question: 'Melyik szám ez: XXXV?',
    options: ['35', '25', '33', '45'],
    correctAnswer: 0,
    explanation: 'XXX = 30, V = 5. 30 + 5 = 35.'
  },
  {
    id: 'rrw3-q3',
    level: 1,
    questionTypeBadge: 'Olvasás',
    figure: <ReadFig s="XXVIII" />,
    question: 'Melyik szám ez: XXVIII?',
    options: ['28', '23', '38', '32'],
    correctAnswer: 0,
    explanation: 'XX = 20, VIII = 8. 20 + 8 = 28.'
  },
  {
    id: 'rrw3-q4',
    level: 1,
    questionTypeBadge: 'Írás',
    figure: <BlocksFig n={31} />,
    question: 'Hogyan írjuk rómaiul a 31-et?',
    options: ['XXXI', 'XXIX', 'IXXX', 'XXXII'],
    correctAnswer: 0,
    explanation: '31 = 30 + 1. A 30 = XXX, az 1 = I. Együtt: XXXI.'
  },
  {
    id: 'rrw3-q5',
    level: 1,
    questionTypeBadge: 'Írás',
    question: 'Hogyan írjuk rómaiul a 17-et?',
    options: ['XVII', 'XIIV', 'VIIX', 'XVI'],
    correctAnswer: 0,
    explanation: '17 = 10 + 7. A 10 = X, a 7 = VII. Együtt: XVII.'
  },
  {
    id: 'rrw3-q6',
    level: 1,
    questionTypeBadge: 'Olvasás',
    figure: <ReadFig s="XXXIX" />,
    question: 'Melyik szám ez: XXXIX?',
    options: ['39', '41', '31', '29'],
    correctAnswer: 0,
    explanation: 'XXX = 30, IX = 9. 30 + 9 = 39. (A 41 akkor jönne ki, ha az I-t hozzáadnád.)'
  },
  {
    id: 'rrw3-q7',
    level: 1,
    questionTypeBadge: 'Írás',
    question: 'Hogyan írjuk rómaiul a 26-ot?',
    options: ['XXVI', 'XXIV', 'XVVI', 'XXXVI'],
    correctAnswer: 0,
    explanation: '26 = 20 + 6. A 20 = XX, a 6 = VI. Együtt: XXVI.'
  },
  {
    id: 'rrw3-q8',
    level: 1,
    questionTypeBadge: 'Olvasás',
    figure: <ReadFig s="XXIV" />,
    question: 'Melyik szám ez: XXIV?',
    options: ['24', '26', '25', '34'],
    correctAnswer: 0,
    explanation: 'XX = 20, IV = 4. 20 + 4 = 24.'
  },
  {
    id: 'rrw3-q9',
    level: 1,
    questionTypeBadge: 'Tízesrész',
    question: 'Hogyan írjuk rómaiul a 30-at?',
    options: ['XXX', 'III', 'XXXX', 'XL'],
    correctAnswer: 0,
    explanation: 'A 30 három tízes: X + X + X = XXX.'
  },
  {
    id: 'rrw3-q10',
    level: 1,
    questionTypeBadge: 'Egyesrész',
    figure: <WriteFig n={34} split />,
    question: '34 = 30 + 4. Hogyan írjuk rómaiul a 4-et?',
    options: ['IV', 'IIII', 'VI', 'XL'],
    correctAnswer: 0,
    explanation: 'A 4 = 5 − 1 = IV. Így a 34 = XXX + IV = XXXIV.'
  },

  // ---------------------------- 2. szint ----------------------------
  {
    id: 'rrw3-q11',
    level: 2,
    questionTypeBadge: 'Tízesrész',
    question: 'Hogyan írjuk rómaiul az 50-et?',
    options: ['L', 'XXXXX', 'C', 'VX'],
    correctAnswer: 0,
    explanation: 'Az 50-nek saját jele van: L.'
  },
  {
    id: 'rrw3-q12',
    level: 2,
    questionTypeBadge: 'Tízesrész',
    figure: <WriteFig n={70} />,
    question: 'Hogyan írjuk rómaiul a 70-et?',
    options: ['LXX', 'XXL', 'LXXX', 'VII'],
    correctAnswer: 0,
    explanation: '70 = 50 + 10 + 10 = L + X + X = LXX.'
  },
  {
    id: 'rrw3-q13',
    level: 2,
    questionTypeBadge: 'Tízesrész',
    question: 'Hogyan írjuk rómaiul a 80-at?',
    options: ['LXXX', 'XXC', 'LXX', 'VIII'],
    correctAnswer: 0,
    explanation: '80 = 50 + 10 + 10 + 10 = LXXX. Az XXC hibás: csak egy X állhat a C előtt.'
  },
  {
    id: 'rrw3-q14',
    level: 2,
    questionTypeBadge: 'Tízesrész',
    figure: <WriteFig n={90} />,
    question: 'Hogyan írjuk rómaiul a 90-et?',
    options: ['XC', 'LXXXX', 'CX', 'LXL'],
    correctAnswer: 0,
    explanation: '90 = 100 − 10 = XC. Az LXXXX-ben 4 X van, a CX pedig 110 lenne.'
  },
  {
    id: 'rrw3-q15',
    level: 2,
    questionTypeBadge: 'Írás',
    figure: <WriteFig n={45} split />,
    question: 'Hogyan írjuk rómaiul a 45-öt?',
    options: ['XLV', 'VL', 'XXXXV', 'LV'],
    correctAnswer: 0,
    explanation: '45 = 40 + 5 = XL + V = XLV. A V-t nem vonjuk el, ezért a VL hibás.'
  },
  {
    id: 'rrw3-q16',
    level: 2,
    questionTypeBadge: 'Olvasás',
    figure: <ReadFig s="LXIII" />,
    question: 'Melyik szám ez: LXIII?',
    options: ['63', '53', '43', '73'],
    correctAnswer: 0,
    explanation: 'LX = 60, III = 3. 60 + 3 = 63.'
  },
  {
    id: 'rrw3-q17',
    level: 2,
    questionTypeBadge: 'Írás',
    figure: <BlocksFig n={58} />,
    question: 'Hogyan írjuk rómaiul az 58-at?',
    options: ['LVIII', 'LIIX', 'LVII', 'LXVIII'],
    correctAnswer: 0,
    explanation: '58 = 50 + 8 = L + VIII = LVIII.'
  },
  {
    id: 'rrw3-q18',
    level: 2,
    questionTypeBadge: 'Olvasás',
    figure: <ReadFig s="XCV" />,
    question: 'Melyik szám ez: XCV?',
    options: ['95', '115', '105', '85'],
    correctAnswer: 0,
    explanation: 'XC = 90, V = 5. 90 + 5 = 95. (115 jönne ki, ha az X-et hozzáadnád.)'
  },
  {
    id: 'rrw3-q19',
    level: 2,
    questionTypeBadge: 'Írás',
    question: 'Hogyan írjuk rómaiul a 100-at?',
    options: ['C', 'LL', 'XC', 'CX'],
    correctAnswer: 0,
    explanation: 'A 100-nak saját jele van: C. Az L-t nem írjuk kétszer.'
  },
  {
    id: 'rrw3-q20',
    level: 2,
    questionTypeBadge: 'Olvasás',
    figure: <ReadFig s="LXXVII" />,
    question: 'Melyik szám ez: LXXVII?',
    options: ['77', '72', '67', '87'],
    correctAnswer: 0,
    explanation: 'LXX = 70, VII = 7. 70 + 7 = 77.'
  },

  // ---------------------------- 3. szint ----------------------------
  {
    id: 'rrw3-q21',
    level: 3,
    questionTypeBadge: 'Írás',
    figure: <WriteFig n={94} split />,
    question: 'Hogyan írjuk rómaiul a 94-et?',
    options: ['XCIV', 'LXXXXIV', 'XCVI', 'IVXC'],
    correctAnswer: 0,
    explanation: '94 = 90 + 4 = XC + IV = XCIV. Elöl a tízesrész, utána az egyesrész.'
  },
  {
    id: 'rrw3-q22',
    level: 3,
    questionTypeBadge: 'Olvasás',
    figure: <ReadFig s="XLIX" />,
    question: 'Melyik szám ez: XLIX?',
    options: ['49', '59', '41', '61'],
    correctAnswer: 0,
    explanation: 'XL = 40, IX = 9. 40 + 9 = 49.'
  },
  {
    id: 'rrw3-q23',
    level: 3,
    questionTypeBadge: 'Írás',
    question: 'Hogyan írjuk rómaiul a 99-et?',
    options: ['XCIX', 'IC', 'LXXXXIX', 'XCVIIII'],
    correctAnswer: 0,
    explanation: '99 = 90 + 9 = XC + IX = XCIX. Az IC hibás, mert az I csak a V és az X elé kerülhet.'
  },
  {
    id: 'rrw3-q24',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig a="XL" b="XXXVIII" />,
    question: 'Melyik a nagyobb?',
    options: ['XL, mert 40 > 38', 'XXXVIII, mert hosszabb', 'Egyenlők', 'Nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: 'XL = 40, XXXVIII = 38. A hosszabb római szám nem mindig a nagyobb!'
  },
  {
    id: 'rrw3-q25',
    level: 3,
    questionTypeBadge: 'Számszomszéd',
    figure: <NeighbourFig known="XXXIX" side="after" />,
    question: 'Melyik szám jön a XXXIX után?',
    options: ['XL', 'XXXX', 'XLI', 'XXXVIII'],
    correctAnswer: 0,
    explanation: 'XXXIX = 39. Utána a 40 jön, ez XL. A XXXX hibás, mert 4 egyforma jel van benne.'
  },
  {
    id: 'rrw3-q26',
    level: 3,
    questionTypeBadge: 'Számszomszéd',
    figure: <NeighbourFig known="LX" side="before" />,
    question: 'Melyik szám áll közvetlenül az LX előtt?',
    options: ['LIX', 'LVIIII', 'LXI', 'LXIX'],
    correctAnswer: 0,
    explanation: 'LX = 60. Előtte az 59 áll: 50 + 9 = L + IX = LIX.'
  },
  {
    id: 'rrw3-q27',
    level: 3,
    questionTypeBadge: 'Sorba rendezés',
    question: 'Melyik sor van növekvő sorrendben?',
    options: ['XIX, XXV, XL, LII', 'XL, XIX, LII, XXV', 'XXV, XIX, XL, LII', 'XIX, XL, XXV, LII'],
    correctAnswer: 0,
    explanation: 'XIX = 19, XXV = 25, XL = 40, LII = 52. 19 < 25 < 40 < 52.'
  },
  {
    id: 'rrw3-q28',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <MilestoneFig s="XLVI" />,
    question: 'Az egyik mérföldkövön XLVI áll. A következőn 10-zel több. Mi áll rajta?',
    options: ['LVI', 'XLVII', 'LXVI', 'XLXVI'],
    correctAnswer: 0,
    explanation: 'XLVI = 46. 46 + 10 = 56 = 50 + 6 = LVI.'
  },
  {
    id: 'rrw3-q29',
    level: 3,
    questionTypeBadge: 'Írás',
    question: 'Hány jelből áll a 88 római alakja?',
    options: ['8', '2', '6', '7'],
    correctAnswer: 0,
    explanation: '88 = 80 + 8 = LXXX + VIII = LXXXVIII. Ez 4 + 4 = 8 jel.'
  },
  {
    id: 'rrw3-q30',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <ShipsFig a="XXXVI" b="XIV" />,
    question: 'Az egyik hajón XXXVI, a másikon XIV amfora van. Hány amfora van összesen?',
    options: ['L', 'XL', 'LX', 'XLX'],
    correctAnswer: 0,
    explanation: 'XXXVI = 36, XIV = 14. 36 + 14 = 50. Rómaiul: L.'
  }
];

export const RomanReadWriteG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="romai-szamok"
      topicId="g3-rom-iras-olvasas-quiz"
      subtopicId="iras-olvasas-100-ig"
      title="2. Római számok írása és olvasása 100-ig – Kvíz"
      subtitle="30 feladat 3 szinten: írás és olvasás tízesrészre és egyesrészre bontással, összehasonlítás, számszomszédok."
      badge="3. OSZTÁLY • II. A RÓMAI SZÁMOK • KVÍZ"
      questions={ROMAN_READ_WRITE_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Tízesrészek',
          items: ['10 X, 20 XX, 30 XXX', '40 XL, 50 L, 60 LX', '70 LXX, 80 LXXX', '90 XC, 100 C']
        },
        {
          title: 'Egyesrészek',
          items: ['1 I, 2 II, 3 III', '4 IV, 5 V, 6 VI', '7 VII, 8 VIII, 9 IX']
        },
        {
          title: 'Így dolgozz',
          items: ['Írás: 94 = 90 + 4 = XC + IV = XCIV', 'Olvasás: LXXVIII = LXX + VIII = 70 + 8 = 78', 'A hosszabb nem mindig nagyobb: L > XXXVIII']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <RomanReadWriteG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <RomanReadWriteG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default RomanReadWriteG3Quiz;
