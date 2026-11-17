import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { RomanBasicsG3Matcher } from './RomanBasicsG3Matcher';
import { RomanBasicsG3Sorter } from './RomanBasicsG3Sorter';
import { SIGN_COLOR } from './RomanBasicsG3Utils';

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

const Colored: React.FC<{ s: string; x: number; y: number; size?: number }> = ({ s, x, y, size = 30 }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight="bold" fontFamily={SERIF}>
    {s.split('').map((ch, i) => (
      <tspan key={i} fill={SIGN_COLOR[ch] ?? (ch === '?' ? UNK : '#334155')}>
        {ch}
      </tspan>
    ))}
  </text>
);

/** Kőtábla: római szám → ? */
const ReadFig: React.FC<{ s: string }> = ({ s }) => (
  <QFig h={90}>
    <rect x="20" y="16" width="120" height="58" rx="10" fill="#fef3c7" stroke="#a16207" strokeWidth="2" />
    <Colored s={s} x={80} y={56} size={s.length > 4 ? 24 : 30} />
    <text x="160" y="54" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">=</text>
    <rect x="178" y="22" width="46" height="46" rx="10" fill="#fee2e2" stroke={UNK} strokeWidth="1.5" />
    <text x="201" y="54" textAnchor="middle" fontSize="24" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

/** Arab szám korongokkal (ötösével csoportosítva) → üres kőtábla. */
const WriteFig: React.FC<{ n: number }> = ({ n }) => {
  return (
    <QFig h={110}>
      <text x="40" y="44" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#1e3a8a">{n}</text>
      {Array.from({ length: n }, (_, i) => {
        const g = Math.floor(i / 5);
        const k = i % 5;
        return <circle key={i} cx={24 + g * 72 + k * 13} cy="86" r="5.5" fill="#f59e0b" stroke="#92400e" strokeWidth="0.8" />;
      })}
      <text x="96" y="44" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">=</text>
      <rect x="120" y="14" width="100" height="44" rx="10" fill="#fef3c7" stroke="#a16207" strokeWidth="2" />
      <text x="170" y="46" textAnchor="middle" fontSize="24" fontWeight="bold" fill={UNK}>?</text>
    </QFig>
  );
};

/** Csak arab szám → üres kőtábla (nagyobb számokhoz). */
const WriteBigFig: React.FC<{ n: number }> = ({ n }) => (
  <QFig h={84}>
    <rect x="20" y="18" width="72" height="48" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
    <text x="56" y="51" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#1e3a8a">{n}</text>
    <text x="112" y="51" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">=</text>
    <rect x="132" y="18" width="90" height="48" rx="10" fill="#fef3c7" stroke="#a16207" strokeWidth="2" />
    <text x="177" y="51" textAnchor="middle" fontSize="24" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

/** Keresd a jelet: ? = érték */
const SignFig: React.FC<{ value: number }> = ({ value }) => (
  <QFig h={84}>
    <rect x="40" y="16" width="56" height="54" rx="10" fill="#fef3c7" stroke="#a16207" strokeWidth="2" />
    <text x="68" y="54" textAnchor="middle" fontSize="28" fontWeight="bold" fill={UNK}>?</text>
    <text x="120" y="52" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">=</text>
    <text x="172" y="54" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#1e3a8a">{value}</text>
  </QFig>
);

/** Két kőtábla összehasonlítása. */
const CompareFig: React.FC<{ a: string; b: string }> = ({ a, b }) => (
  <QFig h={90}>
    <rect x="16" y="18" width="88" height="54" rx="10" fill="#fef3c7" stroke="#a16207" strokeWidth="2" />
    <Colored s={a} x={60} y={56} size={26} />
    <circle cx="120" cy="45" r="15" fill="#fee2e2" stroke={UNK} />
    <text x="120" y="52" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
    <rect x="136" y="18" width="88" height="54" rx="10" fill="#fef3c7" stroke="#a16207" strokeWidth="2" />
    <Colored s={b} x={180} y={56} size={26} />
  </QFig>
);

/** Hiányzó jel: ?C = 90 */
const MissingFig: React.FC<{ before: string; after: string; value: number }> = ({ before, after, value }) => (
  <QFig h={84}>
    <rect x="22" y="16" width="120" height="54" rx="10" fill="#fef3c7" stroke="#a16207" strokeWidth="2" />
    <Colored s={`${before}?${after}`} x={82} y={54} size={30} />
    <text x="164" y="52" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">=</text>
    <text x="200" y="53" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1e3a8a">{value}</text>
  </QFig>
);

/** Betűkártyák, amelyekből számot kell kirakni. */
const CardsFig: React.FC<{ signs: string[] }> = ({ signs }) => (
  <QFig h={84}>
    {signs.map((ch, i) => {
      const x = 120 - (signs.length * 54) / 2 + i * 54 + 4;
      return (
        <g key={i}>
          <rect x={x} y="16" width="46" height="54" rx="8" fill="#fff" stroke="#a16207" strokeWidth="2" />
          <text x={x + 23} y="54" textAnchor="middle" fontSize="28" fontWeight="bold" fontFamily={SERIF} fill={SIGN_COLOR[ch]}>
            {ch}
          </text>
        </g>
      );
    })}
  </QFig>
);

/** Római katonák pajzsa: az első számmal, a második ?-lel. */
const ShieldFig: React.FC<{ s: string }> = ({ s }) => (
  <QFig h={130}>
    {[0, 1].map((i) => {
      const cx = 70 + i * 100;
      return (
        <g key={i}>
          <rect x={cx - 34} y="16" width="68" height="98" rx="14" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="2.5" />
          <rect x={cx - 26} y="24" width="52" height="82" rx="10" fill="none" stroke="#fbbf24" strokeWidth="2" />
          <rect x={cx - 26} y="50" width="52" height="30" rx="5" fill="#fff7ed" />
          {i === 0 ? (
            <text x={cx} y="72" textAnchor="middle" fontSize={s.length >= 4 ? 14 : 18} fontWeight="bold" fontFamily={SERIF} fill="#7f1d1d">
              {s}
            </text>
          ) : (
            <text x={cx} y="73" textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>?</text>
          )}
        </g>
      );
    })}
    <text x="120" y="70" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">+1</text>
  </QFig>
);

/** Két amfora római számmal. */
const AmphoraFig: React.FC<{ a: string; b: string }> = ({ a, b }) => {
  const amph = (cx: number, label: string) => (
    <g>
      <path
        d={`M ${cx - 10} 18 L ${cx + 10} 18 L ${cx + 8} 30 Q ${cx + 34} 48 ${cx + 22} 86 Q ${cx + 12} 106 ${cx} 112 Q ${cx - 12} 106 ${cx - 22} 86 Q ${cx - 34} 48 ${cx - 8} 30 Z`}
        fill="#fb923c"
        stroke="#9a3412"
        strokeWidth="2"
      />
      <path d={`M ${cx - 8} 32 Q ${cx - 24} 30 ${cx - 20} 48`} fill="none" stroke="#9a3412" strokeWidth="2.5" />
      <path d={`M ${cx + 8} 32 Q ${cx + 24} 30 ${cx + 20} 48`} fill="none" stroke="#9a3412" strokeWidth="2.5" />
      <rect x={cx - 18} y="56" width="36" height="22" rx="4" fill="#fff7ed" />
      <text x={cx} y="73" textAnchor="middle" fontSize="16" fontWeight="bold" fontFamily={SERIF} fill="#7c2d12">
        {label}
      </text>
    </g>
  );
  return (
    <QFig h={124}>
      {amph(60, a)}
      <text x="110" y="74" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#334155">+</text>
      {amph(160, b)}
      <text x="214" y="74" textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>= ?</text>
    </QFig>
  );
};

export const ROMAN_BASICS_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'rb3-q1',
    level: 1,
    questionTypeBadge: 'Római jel',
    figure: <ReadFig s="V" />,
    question: 'Mennyit ér a V?',
    options: ['5', '1', '10', '50'],
    correctAnswer: 0,
    explanation: 'A V jelentése 5.'
  },
  {
    id: 'rb3-q2',
    level: 1,
    questionTypeBadge: 'Római jel',
    question: 'Mennyit ér az X?',
    options: ['10', '5', '100', '1'],
    correctAnswer: 0,
    explanation: 'Az X jelentése 10. Olyan, mint két V egymás tetején: 5 + 5.'
  },
  {
    id: 'rb3-q3',
    level: 1,
    questionTypeBadge: 'Római jel',
    figure: <SignFig value={50} />,
    question: 'Melyik jel ér 50-et?',
    options: ['L', 'C', 'X', 'V'],
    correctAnswer: 0,
    explanation: 'Az L jelentése 50. A C 100, az X 10, a V 5.'
  },
  {
    id: 'rb3-q4',
    level: 1,
    questionTypeBadge: 'Római jel',
    figure: <SignFig value={100} />,
    question: 'Melyik jel ér 100-at?',
    options: ['C', 'L', 'X', 'I'],
    correctAnswer: 0,
    explanation: 'A C jelentése 100.'
  },
  {
    id: 'rb3-q5',
    level: 1,
    questionTypeBadge: 'Olvasás',
    figure: <ReadFig s="III" />,
    question: 'Mennyi a III?',
    options: ['3', '111', '1', '30'],
    correctAnswer: 0,
    explanation: 'Három I egymás mellett: 1 + 1 + 1 = 3.'
  },
  {
    id: 'rb3-q6',
    level: 1,
    questionTypeBadge: 'Hozzáadás',
    figure: <ReadFig s="VI" />,
    question: 'Mennyi a VI?',
    options: ['6', '4', '51', '5'],
    correctAnswer: 0,
    explanation: 'Az I a V után áll, ezért hozzáadjuk: 5 + 1 = 6.'
  },
  {
    id: 'rb3-q7',
    level: 1,
    questionTypeBadge: 'Elvevés',
    question: 'Mennyi a IV?',
    options: ['4', '6', '15', '5'],
    correctAnswer: 0,
    explanation: 'Az I a V előtt áll, ezért elvesszük: 5 − 1 = 4.'
  },
  {
    id: 'rb3-q8',
    level: 1,
    questionTypeBadge: 'Olvasás',
    question: 'Mennyi a XX?',
    options: ['20', '11', '2', '1010'],
    correctAnswer: 0,
    explanation: 'Két X egymás mellett: 10 + 10 = 20.'
  },
  {
    id: 'rb3-q9',
    level: 1,
    questionTypeBadge: 'Írás',
    figure: <WriteFig n={2} />,
    question: 'Hogyan írjuk rómaiul a 2-t?',
    options: ['II', 'IV', 'V', 'XI'],
    correctAnswer: 0,
    explanation: 'Két egyes: II = 1 + 1 = 2.'
  },
  {
    id: 'rb3-q10',
    level: 1,
    questionTypeBadge: 'Hozzáadás',
    question: 'Mennyi az XI?',
    options: ['11', '9', '101', '2'],
    correctAnswer: 0,
    explanation: 'Az I az X után áll, ezért hozzáadjuk: 10 + 1 = 11.'
  },

  // ---------------------------- 2. szint ----------------------------
  {
    id: 'rb3-q11',
    level: 2,
    questionTypeBadge: 'Elvevés',
    figure: <ReadFig s="IX" />,
    question: 'Mennyi a IX?',
    options: ['9', '11', '10', '8'],
    correctAnswer: 0,
    explanation: 'Az I az X előtt áll, ezért elvesszük: 10 − 1 = 9. (A 11 az XI lenne.)'
  },
  {
    id: 'rb3-q12',
    level: 2,
    questionTypeBadge: 'Olvasás',
    figure: <ReadFig s="XIV" />,
    question: 'Mennyi a XIV?',
    options: ['14', '16', '104', '15'],
    correctAnswer: 0,
    explanation: 'X = 10, IV = 4. Együtt: 10 + 4 = 14.'
  },
  {
    id: 'rb3-q13',
    level: 2,
    questionTypeBadge: 'Írás',
    figure: <WriteFig n={4} />,
    question: 'Hogyan írjuk rómaiul a 4-et?',
    options: ['IV', 'IIII', 'VI', 'IIV'],
    correctAnswer: 0,
    explanation: 'Négy I nem állhat egymás mellett. A 4 = 5 − 1, ezért IV.'
  },
  {
    id: 'rb3-q14',
    level: 2,
    questionTypeBadge: 'Írás',
    figure: <WriteFig n={9} />,
    question: 'Hogyan írjuk rómaiul a 9-et?',
    options: ['IX', 'VIIII', 'XI', 'VIV'],
    correctAnswer: 0,
    explanation: 'A 9 = 10 − 1, ezért IX. A VIIII-ben 4 egyforma jel van, az XI pedig 11.'
  },
  {
    id: 'rb3-q15',
    level: 2,
    questionTypeBadge: 'Hozzáadás',
    figure: <ReadFig s="LX" />,
    question: 'Mennyi az LX?',
    options: ['60', '40', '510', '15'],
    correctAnswer: 0,
    explanation: 'Az X az L után áll, ezért hozzáadjuk: 50 + 10 = 60.'
  },
  {
    id: 'rb3-q16',
    level: 2,
    questionTypeBadge: 'Elvevés',
    figure: <ReadFig s="XL" />,
    question: 'Mennyi az XL?',
    options: ['40', '60', '1050', '30'],
    correctAnswer: 0,
    explanation: 'Az X az L előtt áll, ezért elvesszük: 50 − 10 = 40.'
  },
  {
    id: 'rb3-q17',
    level: 2,
    questionTypeBadge: 'Elvevés',
    question: 'Mennyi az XC?',
    options: ['90', '110', '10100', '80'],
    correctAnswer: 0,
    explanation: 'Az X a C előtt áll, ezért elvesszük: 100 − 10 = 90.'
  },
  {
    id: 'rb3-q18',
    level: 2,
    questionTypeBadge: 'Írás',
    figure: <WriteFig n={15} />,
    question: 'Hogyan írjuk rómaiul a 15-öt?',
    options: ['XV', 'VX', 'VVV', 'XIV'],
    correctAnswer: 0,
    explanation: '15 = 10 + 5, ezért XV. A V nem ismétlődhet, és nem állhat elvevő jelként.'
  },
  {
    id: 'rb3-q19',
    level: 2,
    questionTypeBadge: 'Legfeljebb 3',
    question: 'Melyik római szám van HELYESEN leírva?',
    options: ['XXX', 'XXXX', 'IIII', 'VV'],
    correctAnswer: 0,
    explanation: 'Legfeljebb 3 egyforma jel állhat egymás mellett, és a V nem ismétlődik. XXX = 30 helyes.'
  },
  {
    id: 'rb3-q20',
    level: 2,
    questionTypeBadge: 'Szabály',
    question: 'Az XI-ben az I az X után áll. Mit csinálunk vele?',
    options: ['Hozzáadjuk: 10 + 1', 'Elvesszük: 10 − 1', 'Mellé írjuk: 101', 'Nem számít, kihagyjuk'],
    correctAnswer: 0,
    explanation: 'Ha a kisebb jel jobbra áll, hozzáadjuk. XI = 10 + 1 = 11.'
  },

  // ---------------------------- 3. szint ----------------------------
  {
    id: 'rb3-q21',
    level: 3,
    questionTypeBadge: 'Olvasás',
    figure: <ReadFig s="XXIX" />,
    question: 'Mennyi a XXIX?',
    options: ['29', '31', '21', '30'],
    correctAnswer: 0,
    explanation: 'XX = 20, IX = 9. Együtt: 20 + 9 = 29. (A 31 lenne, ha az I-t hozzáadnád.)'
  },
  {
    id: 'rb3-q22',
    level: 3,
    questionTypeBadge: 'Írás',
    figure: <WriteBigFig n={19} />,
    question: 'Hogyan írjuk rómaiul a 19-et?',
    options: ['XIX', 'IXX', 'XVIIII', 'XXI'],
    correctAnswer: 0,
    explanation: '19 = 10 + 9 = X + IX = XIX. Az IXX hibás, a XVIIII-ben 4 egyforma jel van.'
  },
  {
    id: 'rb3-q23',
    level: 3,
    questionTypeBadge: 'Írás',
    figure: <WriteBigFig n={40} />,
    question: 'Hogyan írjuk rómaiul a 40-et?',
    options: ['XL', 'XXXX', 'LX', 'XXL'],
    correctAnswer: 0,
    explanation: 'Négy X nem állhat egymás mellett. 40 = 50 − 10, ezért XL. (Az LX = 60.)'
  },
  {
    id: 'rb3-q24',
    level: 3,
    questionTypeBadge: 'Hibakereső',
    question: 'Melyik római szám HIBÁS?',
    options: ['VV', 'XV', 'XX', 'LV'],
    correctAnswer: 0,
    explanation: 'A V-t nem ismételjük. 5 + 5 = 10, ezt X-szel írjuk.'
  },
  {
    id: 'rb3-q25',
    level: 3,
    questionTypeBadge: 'Hibakereső',
    question: 'Melyik római szám HIBÁS?',
    options: ['VX', 'XV', 'IX', 'XI'],
    correctAnswer: 0,
    explanation: 'A V-t soha nem vonjuk el. Csak az I és az X állhat elvevő jelként. Az 5 egyszerűen V.'
  },
  {
    id: 'rb3-q26',
    level: 3,
    questionTypeBadge: 'Hiányzó jel',
    figure: <MissingFig before="" after="C" value={90} />,
    question: 'Melyik jel kerül a ? helyére?',
    options: ['X', 'I', 'L', 'V'],
    correctAnswer: 0,
    explanation: '90 = 100 − 10, ezért XC. A C elé csak X kerülhet.'
  },
  {
    id: 'rb3-q27',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig a="IX" b="XI" />,
    question: 'Melyik a nagyobb?',
    options: ['XI, mert 11 > 9', 'IX, mert 9 > 11', 'Egyenlők, mert ugyanazok a jelek', 'Nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: 'IX = 10 − 1 = 9, XI = 10 + 1 = 11. Ugyanazok a jelek, de a sorrend számít!'
  },
  {
    id: 'rb3-q28',
    level: 3,
    questionTypeBadge: 'Kirakás',
    figure: <CardsFig signs={['X', 'I', 'V']} />,
    question: 'Mindhárom kártyát felhasználod. Melyik a legnagyobb helyes szám?',
    options: ['XVI', 'XIV', 'IVX', 'VIX'],
    correctAnswer: 0,
    explanation: 'XVI = 10 + 5 + 1 = 16, XIV = 10 + 4 = 14. Az IVX és a VIX nem helyes római szám.'
  },
  {
    id: 'rb3-q29',
    level: 3,
    questionTypeBadge: 'Szomszéd',
    figure: <ShieldFig s="XXIV" />,
    question: 'A katona pajzsán XXIV áll. A szomszédjáé eggyel több. Mi áll rajta?',
    options: ['XXV', 'XXIII', 'XXIVI', 'XXVI'],
    correctAnswer: 0,
    explanation: 'XXIV = 24. Eggyel több: 25 = XX + V = XXV.'
  },
  {
    id: 'rb3-q30',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <AmphoraFig a="XL" b="X" />,
    question: 'Az egyik amforán XL, a másikon X áll. Mennyi a kettő együtt?',
    options: ['50', '70', '30', '40'],
    correctAnswer: 0,
    explanation: 'XL = 40, X = 10. 40 + 10 = 50. Ez rómaiul L.'
  }
];

export const RomanBasicsG3Quiz: React.FC<{
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
      topicId="g3-rom-alapok-quiz"
      subtopicId="alapveto-szamjegyek-szabalyok"
      title="1. A római számjegyek és alapszabályok – Kvíz"
      subtitle="30 feladat 3 szinten: az I, V, X, L, C jelek, hozzáadás és elvevés, legfeljebb 3 egyforma jel."
      badge="3. OSZTÁLY • II. A RÓMAI SZÁMOK • KVÍZ"
      questions={ROMAN_BASICS_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Az öt jel',
          items: ['I = 1', 'V = 5', 'X = 10', 'L = 50', 'C = 100']
        },
        {
          title: 'Hozzáadás és elvevés',
          items: ['Kisebb jel jobbra: hozzáadjuk (VI = 6, LX = 60).', 'Kisebb jel balra: elvesszük (IV = 4, XL = 40).', 'Elvevés csak így: IV, IX, XL, XC.']
        },
        {
          title: 'Legfeljebb 3',
          items: ['III = 3, de 4 = IV', 'XXX = 30, de 40 = XL', 'A V és az L nem ismétlődik: 10 = X, nem VV.']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <RomanBasicsG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <RomanBasicsG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default RomanBasicsG3Quiz;
