import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { RomanNumerals4Matcher } from './RomanNumerals4Matcher';
import { RomanNumerals4Sorter } from './RomanNumerals4Sorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek. Az ismeretlen: piros „?”.
// ---------------------------------------------------------------------------
const UNK = '#dc2626';
const SERIF = 'Georgia, "Times New Roman", serif';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[300px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#fff7ed" stroke="#fed7aa" />
    {children}
  </svg>
);

/** Egy jelkártya „= ?” felirattal. */
const TileFig: React.FC<{ t: string }> = ({ t }) => (
  <QFig h={100}>
    <rect x="60" y="16" width={Math.max(70, t.length * 26 + 20)} height="66" rx="14" fill="#fff" stroke="#f97316" strokeWidth="4" />
    <text x={60 + Math.max(70, t.length * 26 + 20) / 2} y="64" fontSize="38" fontWeight="bold" textAnchor="middle" fill="#9a3412" fontFamily={SERIF}>{t}</text>
    <text x={60 + Math.max(70, t.length * 26 + 20) + 14} y="60" fontSize="22" fontWeight="bold" fill={UNK}>= ?</text>
  </QFig>
);

/** Úszósapka római rajtszámmal. */
const CapFig: React.FC<{ t: string; color: string; around?: boolean }> = ({ t, color, around }) => (
  <QFig h={120}>
    <path d="M1 96 Q 60 84 130 96 T 259 96 V119 H1 Z" fill="#7dd3fc" opacity="0.7" />
    {around && (
      <g>
        <circle cx="50" cy="80" r="20" fill="#fde7d4" />
        <path d="M26 72 A24 26 0 0 1 74 72 Z" fill="#cbd5e1" />
        <text x="50" y="64" fontSize="16" fontWeight="bold" textAnchor="middle" fill={UNK}>?</text>
        <circle cx="210" cy="80" r="20" fill="#fde7d4" />
        <path d="M186 72 A24 26 0 0 1 234 72 Z" fill="#cbd5e1" />
        <text x="210" y="64" fontSize="16" fontWeight="bold" textAnchor="middle" fill={UNK}>?</text>
      </g>
    )}
    <circle cx="130" cy="78" r="26" fill="#fde7d4" />
    <circle cx="121" cy="80" r="2.5" fill="#334155" />
    <circle cx="139" cy="80" r="2.5" fill="#334155" />
    <path d="M100 70 A30 34 0 0 1 160 70 Z" fill={color} />
    <text x="130" y="60" fontSize="17" fontWeight="bold" textAnchor="middle" fill="#1e293b" fontFamily={SERIF}>{t}</text>
    {!around && (
      <g>
        <rect x="190" y="30" width="44" height="26" rx="5" fill="#fff" stroke="#94a3b8" />
        <text x="212" y="49" fontSize="15" fontWeight="bold" textAnchor="middle" fill={UNK}>?</text>
      </g>
    )}
  </QFig>
);

/** Képeslap részlete. */
const PostcardFig: React.FC<{ lines: string[]; boxes?: string[] }> = ({ lines, boxes }) => (
  <QFig h={boxes ? 130 : 100}>
    <rect x="12" y="10" width="236" height={boxes ? 110 : 80} rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 3" />
    {lines.map((l, i) => (
      <text key={i} x="130" y={36 + i * 24} fontSize="14" fontWeight={i === 0 ? 'bold' : 'normal'} textAnchor="middle" fill="#1e293b">{l}</text>
    ))}
    {boxes &&
      boxes.map((b, i) => (
        <g key={i}>
          <rect x={72 + i * 30} y="84" width="26" height="28" fill="#fff" stroke="#475569" />
          <text x={85 + i * 30} y="104" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#1e293b" fontFamily={SERIF}>{b}</text>
        </g>
      ))}
  </QFig>
);

/** Színes ovális kártyák római számokkal. */
const OvalsFig: React.FC<{ items: string[] }> = ({ items }) => {
  const colors = ['#ef4444', '#eab308', '#a855f7', '#0ea5e9', '#ec4899', '#f59e0b'];
  return (
    <QFig h={80}>
      {items.map((t, i) => (
        <g key={i}>
          <rect x={10 + i * 41} y="24" width="37" height="30" rx="15" fill="#fff" stroke={colors[i % colors.length]} strokeWidth="2.5" />
          <text x={28.5 + i * 41} y="45" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#1e293b" fontFamily={SERIF}>{t}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Tábla a kerületekkel. */
const BoardFig: React.FC<{ name: string; t: string }> = ({ name, t }) => (
  <QFig h={90}>
    <rect x="30" y="14" width="200" height="62" rx="8" fill="#14532d" stroke="#a16207" strokeWidth="5" />
    <text x="130" y="54" fontSize="20" fontWeight="bold" textAnchor="middle" fill="#f8fafc" fontFamily={SERIF}>{name}: {t}.</text>
  </QFig>
);

/** Három színes lap (TK 28/5.). */
const CoveredFig: React.FC = () => (
  <QFig h={110}>
    {[
      { c: '#22c55e', n: 'zöld' },
      { c: '#facc15', n: 'sárga' },
      { c: '#38bdf8', n: 'kék' }
    ].map((p, i) => (
      <g key={p.n}>
        <rect x={50 + i * 60} y="16" width="40" height="60" rx="20" fill={p.c} />
        <text x={70 + i * 60} y="52" fontSize="20" fontWeight="bold" textAnchor="middle" fill="#fff">?</text>
        <text x={70 + i * 60} y="96" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#334155">{p.n}</text>
      </g>
    ))}
  </QFig>
);

/** Gyufaszálas egyenlőség: XXX − XI = XXI */
const MatchFig: React.FC = () => {
  const s = (x1: number, y1: number, x2: number, y2: number, k: string) => (
    <g key={k}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
      <circle cx={x1} cy={y1} r="3" fill="#dc2626" />
    </g>
  );
  const X = (x: number, k: string) => [s(x, 30, x + 20, 70, k + 'a'), s(x + 20, 30, x, 70, k + 'b')];
  const I = (x: number, k: string) => [s(x, 30, x, 70, k)];
  return (
    <QFig h={100}>
      {[
        ...X(12, 'a'),
        ...X(36, 'b'),
        ...X(60, 'c'),
        s(90, 50, 104, 50, 'm'),
        ...X(112, 'd'),
        ...I(140, 'e'),
        s(152, 44, 166, 44, 'q1'),
        s(152, 56, 166, 56, 'q2'),
        ...X(176, 'f'),
        ...X(200, 'g'),
        ...I(230, 'h')
      ]}
      <text x="130" y="90" fontSize="10" fontWeight="bold" textAnchor="middle" fill={UNK}>1 gyufaszál áthelyezésével: ?</text>
    </QFig>
  );
};

/** Római számos óra; a kismutató szöge órában megadva. */
const ClockFig: React.FC<{ hour: number }> = ({ hour }) => {
  const nums = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
  const a = (hour * Math.PI) / 6;
  return (
    <QFig h={150}>
      <circle cx="130" cy="75" r="66" fill="#fffbeb" stroke="#b45309" strokeWidth="4" />
      {nums.map((n, i) => {
        const t = (i * Math.PI) / 6;
        return (
          <text key={n} x={Math.round((130 + 50 * Math.sin(t)) * 10) / 10} y={Math.round((75 - 50 * Math.cos(t)) * 10) / 10 + 4} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#78350f" fontFamily={SERIF}>
            {n}
          </text>
        );
      })}
      <line x1="130" y1="75" x2="130" y2="30" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <line x1="130" y1="75" x2={Math.round((130 + 30 * Math.sin(a)) * 10) / 10} y2={Math.round((75 - 30 * Math.cos(a)) * 10) / 10} stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
      <circle cx="130" cy="75" r="4" fill="#b45309" />
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const ROMAN_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'rn-q1',
    level: 1,
    questionTypeBadge: 'Alapjelek',
    figure: <TileFig t="V" />,
    question: 'Mennyit ér a római V jel?',
    options: ['5', '4', '6', '10'],
    correctAnswer: 0,
    explanation: 'A V jel értéke 5 – mint egy kézen az ujjak száma.'
  },
  {
    id: 'rn-q2',
    level: 1,
    questionTypeBadge: 'Alapjelek',
    figure: <TileFig t="X" />,
    question: 'Mennyit ér a római X jel?',
    options: ['10', '9', '11', '5'],
    correctAnswer: 0,
    explanation: 'Az X jel értéke 10 – mint két kézen az ujjak száma.'
  },
  {
    id: 'rn-q3',
    level: 1,
    questionTypeBadge: 'Római → arab',
    figure: <CapFig t="XII" color="#22c55e" />,
    question: 'Milyen rajtszám áll az úszósapkán? XII',
    options: ['12', '102', '21', '11'],
    correctAnswer: 0,
    explanation: 'XII = 10 + 1 + 1 = 12. A római számoknak nincs helyiértéke, ezért nem 102!'
  },
  {
    id: 'rn-q4',
    level: 1,
    questionTypeBadge: 'Római → arab',
    question: 'Mennyi a VII?',
    options: ['7', '52', '6', '8'],
    correctAnswer: 0,
    explanation: 'VII = 5 + 1 + 1 = 7.'
  },
  {
    id: 'rn-q5',
    level: 1,
    questionTypeBadge: 'Kivonás szabálya',
    question: 'Mennyi a IV?',
    options: ['4', '6', '5', '14'],
    correctAnswer: 0,
    explanation: 'Az I a V előtt áll, ezért elvesszük: IV = 5 − 1 = 4. (VI lenne a 6.)'
  },
  {
    id: 'rn-q6',
    level: 1,
    questionTypeBadge: 'Kivonás szabálya',
    question: 'Mennyi a IX?',
    options: ['9', '11', '19', '8'],
    correctAnswer: 0,
    explanation: 'Az I az X előtt áll: IX = 10 − 1 = 9. (XI lenne a 11.)'
  },
  {
    id: 'rn-q7',
    level: 1,
    questionTypeBadge: 'Arab → római',
    question: 'Hogyan írjuk római számmal a 3-at?',
    options: ['III', 'IIII', 'VII', 'IIV'],
    correctAnswer: 0,
    explanation: '3 = 1 + 1 + 1, tehát III.'
  },
  {
    id: 'rn-q8',
    level: 1,
    questionTypeBadge: 'Arab → római',
    question: 'Hogyan írjuk római számmal a 20-at?',
    options: ['XX', 'XXX', 'XII', 'VV'],
    correctAnswer: 0,
    explanation: '20 = 10 + 10, tehát XX. A V jelet nem ismételjük, így a VV hibás.'
  },
  {
    id: 'rn-q9',
    level: 1,
    questionTypeBadge: 'Arab → római',
    question: 'Hogyan írjuk római számmal a 11-et?',
    options: ['XI', 'IX', 'XII', 'VVI'],
    correctAnswer: 0,
    explanation: '11 = 10 + 1, a kisebb jel a nagyobb UTÁN áll: XI. (Az IX a 9.)'
  },
  {
    id: 'rn-q10',
    level: 1,
    questionTypeBadge: 'Római → arab',
    figure: <CapFig t="XXV" color="#ef4444" />,
    question: 'Milyen rajtszám áll ezen az úszósapkán? XXV',
    options: ['25', '205', '15', '35'],
    correctAnswer: 0,
    explanation: 'XXV = 10 + 10 + 5 = 25.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'rn-q11',
    level: 2,
    questionTypeBadge: 'Arab → római',
    question: 'Hogyan írjuk római számmal a 37-et?',
    options: ['XXXVII', 'XXXVIII', 'XXVII', 'XXXIIV'],
    correctAnswer: 0,
    explanation: '37 = 10 + 10 + 10 + 5 + 1 + 1 → XXXVII.'
  },
  {
    id: 'rn-q12',
    level: 2,
    questionTypeBadge: 'Arab → római',
    question: 'Hogyan írjuk római számmal a 19-et?',
    options: ['XIX', 'IXX', 'XVIIII', 'XXI'],
    correctAnswer: 0,
    explanation: '19 = 10 + 9 = X + IX → XIX. A XVIIII-ben négy I van egymás mellett, ez hibás.'
  },
  {
    id: 'rn-q13',
    level: 2,
    questionTypeBadge: 'Arab → római',
    question: 'Hogyan írjuk római számmal a 28-at?',
    options: ['XXVIII', 'XXIIX', 'XXVII', 'XXXVIII'],
    correctAnswer: 0,
    explanation: '28 = 10 + 10 + 5 + 1 + 1 + 1 → XXVIII. (Kettő I nem állhat az X előtt.)'
  },
  {
    id: 'rn-q14',
    level: 2,
    questionTypeBadge: 'Arab → római',
    question: 'Hogyan írjuk római számmal a 26-ot?',
    options: ['XXVI', 'XXIV', 'XXVII', 'XVVI'],
    correctAnswer: 0,
    explanation: '26 = 10 + 10 + 5 + 1 → XXVI. (A XXIV a 24.)'
  },
  {
    id: 'rn-q15',
    level: 2,
    questionTypeBadge: 'Sorba rendezés',
    figure: <OvalsFig items={['XX', 'IV', 'XV', 'IX', 'XI', 'VI']} />,
    question: 'Rendezd növekvő sorrendbe: XX, IV, XV, IX, XI, VI',
    options: ['IV, VI, IX, XI, XV, XX', 'VI, IV, IX, XI, XV, XX', 'IV, VI, XI, IX, XV, XX', 'IV, IX, VI, XI, XV, XX'],
    correctAnswer: 0,
    explanation: 'Váltsd át: IV = 4, VI = 6, IX = 9, XI = 11, XV = 15, XX = 20. Növekvő sorrend: 4, 6, 9, 11, 15, 20.'
  },
  {
    id: 'rn-q16',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a nagyobb: XIV vagy XVI?',
    options: ['XVI', 'XIV', 'Egyenlők', 'Nem lehet összehasonlítani'],
    correctAnswer: 0,
    explanation: 'XIV = 10 + 4 = 14, XVI = 10 + 6 = 16. A 16 a nagyobb, tehát a XVI.'
  },
  {
    id: 'rn-q17',
    level: 2,
    questionTypeBadge: 'Kerület',
    figure: <PostcardFig lines={['KISS VALÉRIA', 'VIII. kerület']} />,
    question: 'Hányadik kerületben lakik Vali néni, ha a címben VIII. kerület áll?',
    options: ['8.', '7.', '13.', '3.'],
    correctAnswer: 0,
    explanation: 'VIII = 5 + 1 + 1 + 1 = 8. Vali néni a 8. kerületben lakik.'
  },
  {
    id: 'rn-q18',
    level: 2,
    questionTypeBadge: 'Hónap',
    figure: <PostcardFig lines={['Kedves Vali néni!', 'XI. 2-án reggel érkezünk.']} />,
    question: 'Mona és Manó XI. 2-án érkezik. Melyik hónapban?',
    options: ['novemberben', 'szeptemberben', 'februárban', 'decemberben'],
    correctAnswer: 0,
    explanation: 'XI = 10 + 1 = 11. Az év 11. hónapja a november. (A IX = 9 lenne a szeptember.)'
  },
  {
    id: 'rn-q19',
    level: 2,
    questionTypeBadge: 'Kerület',
    figure: <BoardFig name="Tünde" t="XXIV" />,
    question: 'Hányadik kerületben lakik Tünde?',
    options: ['24.', '26.', '16.', '34.'],
    correctAnswer: 0,
    explanation: 'XXIV = 10 + 10 + (5 − 1) = 24.'
  },
  {
    id: 'rn-q20',
    level: 2,
    questionTypeBadge: 'Kerület',
    figure: <BoardFig name="Lali" t="XXXIX" />,
    question: 'Hányadik kerületben lakik Lali?',
    options: ['39.', '41.', '29.', '31.'],
    correctAnswer: 0,
    explanation: 'XXXIX = 10 + 10 + 10 + (10 − 1) = 39.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'rn-q21',
    level: 3,
    questionTypeBadge: 'Irányítószám',
    figure: <PostcardFig lines={['Irányítószám:']} boxes={['X', 'X', 'I', 'X']} />,
    question: 'A képeslapon az irányítószám XXIX. Melyik városba utaznak? (31 Tűfalva, 39 Mérgesfalva, 21 Fantáziafalva, 29 Mosolyfalva)',
    options: ['Mosolyfalva', 'Mérgesfalva', 'Fantáziafalva', 'Tűfalva'],
    correctAnswer: 0,
    explanation: 'XXIX = 10 + 10 + (10 − 1) = 29 → Mosolyfalva. (A 31 a XXXI, a 21 a XXI lenne.)'
  },
  {
    id: 'rn-q22',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    figure: <CoveredFig />,
    question: 'A zöld lap alatt a húsz fele van. A kék lap alatti jel a zöld alattinak a tizede. A sárga lap alatt a kék ötszöröse van. Melyik római szám van letakarva (zöld, sárga, kék sorrendben)?',
    options: ['XVI = 16', 'XIV = 14', 'XXI = 21', 'VXI = 16'],
    correctAnswer: 0,
    explanation: 'Zöld: 20 fele = 10 = X. Kék: 10 tizede = 1 = I. Sárga: 1 ötszöröse = 5 = V. X, V, I → XVI = 16.'
  },
  {
    id: 'rn-q23',
    level: 3,
    questionTypeBadge: 'Gyufaszálas fejtörő',
    figure: <MatchFig />,
    question: 'A XXX − XI = XXI nem igaz. Egy gyufaszál áthelyezése után melyik egyenlőség lesz IGAZ?',
    options: ['XXX − IX = XXI', 'XXX − XII = XXI', 'XXX − XI = XXII', 'XX − XI = XXI'],
    correctAnswer: 0,
    explanation: 'Az XI-ből az I-t az X elé tesszük: IX = 9. 30 − 9 = 21 = XXI ✓'
  },
  {
    id: 'rn-q24',
    level: 3,
    questionTypeBadge: 'Számszomszédok',
    figure: <CapFig t="XXV" color="#ef4444" around />,
    question: 'A XXV rajtszámú úszó előtt és után induló versenyző rajtszáma?',
    options: ['XXIV és XXVI', 'XXIIII és XXVI', 'XXIV és XXVII', 'XVI és XXVI'],
    correctAnswer: 0,
    explanation: 'XXV = 25. Előtte 24 = XXIV, utána 26 = XXVI. (A XXIIII hibás: négy I nem állhat egymás mellett.)'
  },
  {
    id: 'rn-q25',
    level: 3,
    questionTypeBadge: 'Szabály',
    question: 'Melyik NEM helyes római szám?',
    options: ['IIII', 'XIV', 'XXXIX', 'VIII'],
    correctAnswer: 0,
    explanation: 'Egy jel legfeljebb háromszor állhat egymás mellett. A 4 helyesen: IV.'
  },
  {
    id: 'rn-q26',
    level: 3,
    questionTypeBadge: 'Számalkotás',
    question: 'Az X, V és I jelek mindegyikét egyszer felhasználva melyik két római szám rakható ki?',
    options: ['XIV és XVI', 'XVI és VXI', 'IXV és XVI', 'XIV és IVX'],
    correctAnswer: 0,
    explanation: 'XVI = 10 + 5 + 1 = 16 és XIV = 10 + (5 − 1) = 14. A VXI, IXV, IVX nem helyes írásmód.'
  },
  {
    id: 'rn-q27',
    level: 3,
    questionTypeBadge: 'Művelet',
    question: 'Mennyi: XXXV − XX? Az eredményt római számmal add meg!',
    options: ['XV', 'XXV', 'V', 'XIV'],
    correctAnswer: 0,
    explanation: 'XXXV = 35, XX = 20. 35 − 20 = 15 = XV.'
  },
  {
    id: 'rn-q28',
    level: 3,
    questionTypeBadge: 'Művelet',
    question: 'Mennyi: XIX + XI? Az eredményt római számmal add meg!',
    options: ['XXX', 'XXIX', 'XX', 'XXXI'],
    correctAnswer: 0,
    explanation: 'XIX = 19, XI = 11. 19 + 11 = 30 = XXX.'
  },
  {
    id: 'rn-q29',
    level: 3,
    questionTypeBadge: 'Óra',
    figure: <ClockFig hour={9} />,
    question: 'Hány órát mutat ez a római számos óra? (A nagymutató a XII-n áll.)',
    options: ['9 órát', '11 órát', '3 órát', '10 órát'],
    correctAnswer: 0,
    explanation: 'A kismutató a IX-re mutat: IX = 9. Az óra 9 órát mutat. (Az XI a 11 lenne – vigyázz, ne cseréld fel!)'
  },
  {
    id: 'rn-q30',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a legnagyobb szám?',
    options: ['XXXIX', 'XXXVIII', 'XXIX', 'XXXIV'],
    correctAnswer: 0,
    explanation: 'XXXIX = 39, XXXVIII = 38, XXIX = 29, XXXIV = 34. A legnagyobb a 39.'
  }
];

export const RomanNumerals4Quiz: React.FC<{
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
      topicId="g4-count-romai-quiz"
      subtopicId="a-romai-szamok"
      title="7. A római számok – Kvíz"
      subtitle="30 feladat 3 szinten: I, V, X jelek, átváltás, sorba rendezés, kerületek, hónapok, fejtörők."
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • KVÍZ"
      themeColor="amber"
      questions={ROMAN_QUESTIONS}
      cheatSheets={[
        {
          title: 'A jelek',
          items: ['I = 1', 'V = 5', 'X = 10', 'Nincs helyiérték és nincs 0: XII = 10 + 1 + 1 = 12']
        },
        {
          title: 'Szabályok',
          items: [
            'Kisebb jel a nagyobb UTÁN → hozzáadjuk: VI = 6, XI = 11',
            'I a V vagy X ELŐTT → elvesszük: IV = 4, IX = 9',
            'Egy jel legfeljebb 3-szor egymás mellett: III, XXX',
            'A V jel nem ismétlődik: 10 = X, nem VV'
          ]
        },
        {
          title: 'Hasznos számok',
          items: ['14 = XIV, 19 = XIX, 24 = XXIV', '29 = XXIX, 34 = XXXIV, 39 = XXXIX', 'XI. hónap = november, IX. hónap = szeptember', 'VIII. kerület = 8. kerület']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <RomanNumerals4Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <RomanNumerals4Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default RomanNumerals4Quiz;
