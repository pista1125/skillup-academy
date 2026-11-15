import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { DivisibilityLogicMatcher } from './DivisibilityLogicMatcher';
import { DivisibilityLogicSorter } from './DivisibilityLogicSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Két halmaz (4 és 6 többszörösei, 40-nél kisebb pozitív egészek), a metszet / unió kiemelésével. */
const TwoSetFig: React.FC<{ highlight: 'and' | 'or' }> = ({ highlight }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <rect x="6" y="6" width="228" height="138" rx="10" fill="#f8fafc" stroke="#94a3b8" />
    <text x="14" y="22" fontSize="9" fill="#475569">40-nél kisebb pozitív egészek</text>
    <circle cx="95" cy="82" r="50" fill={highlight === 'or' ? '#a7f3d0' : '#dbeafe'} fillOpacity="0.8" stroke="#2563eb" strokeWidth="1.5" />
    <circle cx="145" cy="82" r="50" fill={highlight === 'or' ? '#a7f3d0' : '#fef3c7'} fillOpacity="0.8" stroke="#d97706" strokeWidth="1.5" />
    {highlight === 'and' && (
      <path d="M 120 38.7 A 50 50 0 0 1 120 125.3 A 50 50 0 0 1 120 38.7 Z" fill="#f9a8d4" stroke="#db2777" strokeWidth="1.5" />
    )}
    <text x="72" y="86" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">4 | n</text>
    <text x="168" y="86" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#92400e">6 | n</text>
    <text x="120" y="87" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">{highlight === 'and' ? '?' : ''}</text>
    <text x="120" y="142" fontSize="10" textAnchor="middle" fill="#0f172a">{highlight === 'and' ? 'és: hány elem?' : 'vagy: hány elem összesen?'}</text>
  </svg>
);

/** A 3. feladat halmazábrája számok nélkül. */
const ThreeSetFig: React.FC<{ note: string }> = ({ note }) => (
  <svg viewBox="0 0 240 160" className={FIG_CLASS}>
    <rect x="6" y="6" width="228" height="148" rx="10" fill="#f8fafc" stroke="#94a3b8" />
    <text x="14" y="20" fontSize="8.5" fill="#475569">20-nál kisebb pozitív egészek</text>
    <circle cx="120" cy="62" r="38" fill="#fce7f3" fillOpacity="0.7" stroke="#db2777" strokeWidth="1.5" />
    <circle cx="96" cy="100" r="38" fill="#dbeafe" fillOpacity="0.7" stroke="#2563eb" strokeWidth="1.5" />
    <circle cx="144" cy="100" r="38" fill="#fef3c7" fillOpacity="0.7" stroke="#d97706" strokeWidth="1.5" />
    <text x="120" y="45" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#9d174d">30 osztói</text>
    <text x="40" y="146" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">3 többszörösei</text>
    <text x="200" y="146" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#92400e">5 többszörösei</text>
    <text x="120" y="96" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">?</text>
    <text x="196" y="30" fontSize="9" textAnchor="middle" fill="#334155">{note}</text>
  </svg>
);

/** „Ha…, akkor” – két egymásba ágyazott halmaz. */
const NestedFig: React.FC<{ outer: string; inner: string }> = ({ outer, inner }) => (
  <svg viewBox="0 0 240 140" className={FIG_CLASS}>
    <ellipse cx="120" cy="72" rx="105" ry="60" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
    <ellipse cx="140" cy="80" rx="52" ry="32" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
    <text x="60" y="45" fontSize="10" fontWeight="bold" fill="#065f46">{outer}</text>
    <text x="140" y="84" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">{inner}</text>
    <text x="55" y="92" fontSize="13" fontWeight="bold" fill="#dc2626">?</text>
  </svg>
);

/** Igazságtáblázat-részlet. */
const TruthFig: React.FC<{ a: string; b: string; op: string }> = ({ a, b, op }) => (
  <svg viewBox="0 0 240 110" className={FIG_CLASS}>
    {[
      ['A', a],
      ['B', b],
      [op, '?']
    ].map(([h, v], i) => (
      <g key={h}>
        <rect x={10 + i * 75} y="15" width="70" height="30" rx="6" fill="#0f766e" />
        <text x={45 + i * 75} y="35" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#ffffff">{h}</text>
        <rect
          x={10 + i * 75}
          y="52"
          width="70"
          height="34"
          rx="6"
          fill={v === 'igaz' ? '#bbf7d0' : v === 'hamis' ? '#fecaca' : '#f1f5f9'}
          stroke="#64748b"
        />
        <text x={45 + i * 75} y="74" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">{v}</text>
      </g>
    ))}
  </svg>
);

export const DIVISIBILITY_LOGIC_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'dl-q1',
    level: 1,
    questionTypeBadge: 'Kijelentés',
    question: 'Melyik mondat kijelentés (állítás), azaz melyikről dönthető el egyértelműen, hogy igaz vagy hamis?',
    options: ['A 9571 többszöröse a 3-nak.', 'Az oszthatósági szabályok könnyen megjegyezhetők.', 'A 13 szerencsés szám.', 'Írd fel a 30 osztóit!'],
    correctAnswer: 0,
    explanation: 'A „9571 többszöröse a 3-nak” egyértelműen eldönthető (hamis, mert 9 + 5 + 7 + 1 = 22). A „könnyen megjegyezhető” és a „szerencsés” véleményt fejez ki, a felszólító mondat pedig nem kijelentés.'
  },
  {
    id: 'dl-q2',
    level: 1,
    questionTypeBadge: 'Logikai érték',
    question: 'Mi a logikai értéke a „A 9571 többszöröse a 3-nak.” kijelentésnek?',
    options: ['Hamis, mert a számjegyek összege 22, ami nem osztható 3-mal', 'Igaz, mert a számjegyek összege 22', 'Igaz, mert a szám páratlan', 'Nem kijelentés, ezért nincs logikai értéke'],
    correctAnswer: 0,
    explanation: 'Egy szám akkor és csak akkor osztható 3-mal, ha számjegyeinek összege osztható 3-mal. 9 + 5 + 7 + 1 = 22, és 3 ∤ 22, ezért a kijelentés hamis.'
  },
  {
    id: 'dl-q3',
    level: 1,
    questionTypeBadge: 'Tagadás',
    question: 'Melyik a „A 6 páros szám.” kijelentés tagadása?',
    options: ['A 6 páratlan szám.', 'A 7 páros szám.', 'A 6 nem osztható 3-mal.', 'Minden páros szám 6.'],
    correctAnswer: 0,
    explanation: 'A tagadás: „Nem igaz, hogy a 6 páros szám.”, azaz „A 6 nem páros szám.”, vagyis „A 6 páratlan szám.” Az eredeti igaz, a tagadása hamis.'
  },
  {
    id: 'dl-q4',
    level: 1,
    questionTypeBadge: 'És',
    question: 'Mikor igaz két kijelentés „és” kapcsolata (konjunkciója)?',
    options: ['Ha mindkét kijelentés igaz', 'Ha legalább az egyik kijelentés igaz', 'Ha pontosan az egyik kijelentés igaz', 'Ha mindkét kijelentés hamis'],
    correctAnswer: 0,
    explanation: 'Az „és” művelet csak akkor igaz, ha mindkét kijelentés igaz; minden más esetben hamis.'
  },
  {
    id: 'dl-q5',
    level: 1,
    questionTypeBadge: 'Vagy',
    question: 'Mikor igaz két kijelentés megengedő „vagy” kapcsolata (diszjunkciója)?',
    options: ['Ha legalább az egyik kijelentés igaz', 'Ha mindkét kijelentés igaz', 'Ha pontosan az egyik kijelentés igaz', 'Ha az első igaz és a második hamis'],
    correctAnswer: 0,
    explanation: 'A megengedő „vagy” akkor igaz, ha legalább az egyik kijelentés igaz (lehet mindkettő is), és csak akkor hamis, ha mindkettő hamis.'
  },
  {
    id: 'dl-q6',
    level: 1,
    questionTypeBadge: 'Kizáró vagy',
    question: 'Mikor igaz a „vagy A, vagy B” (kizáró vagy) állítás?',
    options: ['Ha pontosan az egyik kijelentés igaz', 'Ha legalább az egyik kijelentés igaz', 'Ha mindkét kijelentés igaz', 'Ha egyik kijelentés sem igaz'],
    correctAnswer: 0,
    explanation: 'A kizáró vagy akkor igaz, ha a két kijelentés közül kizárólag (pontosan) az egyik igaz; ha mindkettő igaz vagy mindkettő hamis, akkor hamis.'
  },
  {
    id: 'dl-q7',
    level: 1,
    questionTypeBadge: 'És',
    question: 'Mi a logikai értéke: „A 7 páratlan szám és az 1 prímszám.”?',
    figure: <TruthFig a="igaz" b="hamis" op="A és B" />,
    options: ['Hamis, mert az 1 nem prímszám', 'Igaz, mert a 7 páratlan', 'Igaz, mert az egyik rész igaz', 'Nem dönthető el'],
    correctAnswer: 0,
    explanation: 'Az „és” csak akkor igaz, ha mindkét rész igaz. A 7 valóban páratlan, de az 1 nem prímszám (csak 1 osztója van), ezért az állítás hamis.'
  },
  {
    id: 'dl-q8',
    level: 1,
    questionTypeBadge: 'Vagy',
    question: 'Mi a logikai értéke: „A 12 osztható 3-mal vagy a 2 prímszám.”?',
    figure: <TruthFig a="igaz" b="igaz" op="A vagy B" />,
    options: ['Igaz, mert legalább az egyik rész igaz', 'Hamis, mert mindkét rész igaz', 'Hamis, mert a 12 nem prím', 'Nem kijelentés'],
    correctAnswer: 0,
    explanation: 'Mindkét rész igaz (3 | 12, és a 2 prím). A megengedő „vagy” ilyenkor is igaz.'
  },
  {
    id: 'dl-q9',
    level: 1,
    questionTypeBadge: 'Kizáró vagy',
    question: 'Mi a logikai értéke: „Vagy a 12 osztható 3-mal, vagy a 2 prímszám.”?',
    figure: <TruthFig a="igaz" b="igaz" op="vagy-vagy" />,
    options: ['Hamis, mert mindkét rész igaz', 'Igaz, mert mindkét rész igaz', 'Igaz, mert legalább az egyik rész igaz', 'Hamis, mert egyik rész sem igaz'],
    correctAnswer: 0,
    explanation: 'A „vagy-vagy” kizáró vagy: pontosan az egyik részének kell igaznak lennie. Itt mindkettő igaz, ezért az állítás hamis.'
  },
  {
    id: 'dl-q10',
    level: 1,
    questionTypeBadge: 'Halmazok',
    question: 'Melyik halmazműveletnek felel meg az „és” logikai művelet?',
    options: ['Metszet (A ∩ B)', 'Unió (A ∪ B)', 'Komplementer', 'Különbség (A \\ B)'],
    correctAnswer: 0,
    explanation: 'A ∩ B azoknak az elemeknek a halmaza, amelyek A-nak ÉS B-nek is elemei. (A megengedő „vagy” az uniónak, a tagadás a komplementernek felel meg.)'
  },
  // ---------- 2. szint ----------
  {
    id: 'dl-q11',
    level: 2,
    questionTypeBadge: 'Minden / van',
    question: 'Melyik a „Minden kétjegyű prímszám páratlan.” kijelentés tagadása?',
    options: ['Van olyan kétjegyű prímszám, amely nem páratlan.', 'Minden kétjegyű prímszám páros.', 'Nincs páratlan kétjegyű prímszám.', 'Van olyan kétjegyű prímszám, amely páratlan.'],
    correctAnswer: 0,
    explanation: 'Az általános érvényű („minden”) kijelentés tagadása: van olyan, amelyre nem teljesül a tulajdonság. Az eredeti igaz, így a tagadás hamis.'
  },
  {
    id: 'dl-q12',
    level: 2,
    questionTypeBadge: 'Minden / van',
    question: 'Melyik a „Van olyan prímszám, ami páros.” kijelentés tagadása?',
    options: ['Minden prímszám páratlan.', 'Van olyan prímszám, ami páratlan.', 'Minden páros szám prímszám.', 'Van olyan páros szám, ami nem prím.'],
    correctAnswer: 0,
    explanation: 'A létezést állító („van olyan”) kijelentés tagadása: minden szám olyan, amelyre nem teljesül: „Minden prímszám nem páros”, azaz „Minden prímszám páratlan.” (Hamis, hiszen a 2 páros prím.)'
  },
  {
    id: 'dl-q13',
    level: 2,
    questionTypeBadge: 'Minden / van',
    question: 'Melyik a „Van olyan szám, amelynek pontosan 5 pozitív osztója van.” kijelentés tagadása?',
    options: [
      'Minden számnak 5-től különböző számú pozitív osztója van.',
      'Minden számnak pontosan 5 pozitív osztója van.',
      'Van olyan szám, amelynek nem 5 pozitív osztója van.',
      'Van olyan szám, amelynek pontosan 4 pozitív osztója van.'
    ],
    correctAnswer: 0,
    explanation: '„Van olyan” tagadása „minden … nem”: egyetlen számnak sincs pontosan 5 pozitív osztója. (Az eredeti igaz, pl. a 16 osztói: 1, 2, 4, 8, 16, így a tagadás hamis.)'
  },
  {
    id: 'dl-q14',
    level: 2,
    questionTypeBadge: 'Implikáció',
    question: 'Mikor hamis egy „ha A, akkor B” típusú állítás?',
    options: ['Ha az előtag (A) igaz és az utótag (B) hamis', 'Ha az előtag hamis és az utótag igaz', 'Ha mindkét tag hamis', 'Ha mindkét tag igaz'],
    correctAnswer: 0,
    explanation: 'Az implikáció csak akkor hamis, ha a feltétel teljesül, de a következmény nem – ez az ellenpélda. Minden más esetben igaz.'
  },
  {
    id: 'dl-q15',
    level: 2,
    questionTypeBadge: 'Implikáció',
    question: 'Egy autóról tudjuk, hogy Ferrari. Mi a logikai értéke: „Ha ez az autó egy Suzuki, akkor Magyarországon gyártották.”?',
    figure: <TruthFig a="hamis" b="hamis" op="ha A, akkor B" />,
    options: ['Igaz, mert az előtag hamis', 'Hamis, mert a Ferrarit nem Magyarországon gyártják', 'Hamis, mert mindkét tag hamis', 'Nem dönthető el'],
    correctAnswer: 0,
    explanation: 'A „ha…, akkor” állítás csak akkor hamis, ha az előtag igaz és az utótag hamis. Itt az előtag („ez az autó Suzuki”) hamis, ezért az állítás igaz.'
  },
  {
    id: 'dl-q16',
    level: 2,
    questionTypeBadge: 'Megfordítás',
    question: 'Mi a „Ha egy egész szám osztható 4-gyel, akkor páros.” állítás megfordítása, és mi a logikai értéke?',
    figure: <NestedFig outer="páros számok" inner="4 többszörösei" />,
    options: [
      'Ha egy egész szám páros, akkor osztható 4-gyel. – hamis (pl. 6)',
      'Ha egy egész szám páros, akkor osztható 4-gyel. – igaz',
      'Ha egy egész szám nem osztható 4-gyel, akkor páratlan. – igaz',
      'Ha egy egész szám páratlan, akkor nem osztható 4-gyel. – hamis'
    ],
    correctAnswer: 0,
    explanation: 'A megfordításban a feltétel és a következmény helyet cserél: „ha páros, akkor 4 | n”. Hamis, mert a 6 páros, de 4 ∤ 6. Az eredeti állítás viszont igaz.'
  },
  {
    id: 'dl-q17',
    level: 2,
    questionTypeBadge: 'Ellenpélda',
    question: 'Melyik szám ellenpélda a „Ha egy szám osztható 4-gyel és 6-tal, akkor osztható 24-gyel.” állításra?',
    options: ['12', '24', '48', '8'],
    correctAnswer: 0,
    explanation: 'Ellenpélda: az előtag igaz, az utótag hamis. A 12 osztható 4-gyel és 6-tal, de 24-gyel nem. (24 és 48 osztható 24-gyel, a 8 pedig 6-tal nem osztható.)'
  },
  {
    id: 'dl-q18',
    level: 2,
    questionTypeBadge: 'Ellenpélda',
    question: 'Melyik szám ellenpélda a „Ha egy szám osztható 2-vel és 4-gyel, akkor osztható 6-tal.” állításra?',
    options: ['4', '12', '24', '36'],
    correctAnswer: 0,
    explanation: 'A 4 osztható 2-vel és 4-gyel, de 6-tal nem, így ellenpélda. A 12, 24, 36 osztható 6-tal, ezek nem cáfolják az állítást.'
  },
  {
    id: 'dl-q19',
    level: 2,
    questionTypeBadge: 'Venn-diagram',
    question: 'Hány olyan 40-nél kisebb pozitív egész szám van, amely osztható 4-gyel ÉS 6-tal?',
    figure: <TwoSetFig highlight="and" />,
    options: ['3', '9', '12', '1'],
    correctAnswer: 0,
    explanation: 'Az „és” miatt a metszetet nézzük: a 4-gyel és 6-tal is osztható számok a 12 többszörösei: 12, 24, 36 – ez 3 szám.'
  },
  {
    id: 'dl-q20',
    level: 2,
    questionTypeBadge: 'Venn-diagram',
    question: 'Hány olyan 40-nél kisebb pozitív egész szám van, amely osztható 4-gyel VAGY 6-tal?',
    figure: <TwoSetFig highlight="or" />,
    options: ['12', '15', '3', '9'],
    correctAnswer: 0,
    explanation: 'A „vagy” miatt az uniót nézzük: 4 többszörösei 9 db (4, …, 36), 6 többszörösei 6 db (6, …, 36), közös 3 db. |A ∪ B| = 9 + 6 − 3 = 12.'
  },
  // ---------- 3. szint ----------
  {
    id: 'dl-q21',
    level: 3,
    questionTypeBadge: 'Megfordítás',
    question: '„Ha egy természetes szám osztható 3-mal, akkor osztható 9-cel.” Mi az állítás és a megfordítása logikai értéke?',
    options: ['Az állítás hamis, a megfordítás igaz', 'Az állítás igaz, a megfordítás hamis', 'Mindkettő igaz', 'Mindkettő hamis'],
    correctAnswer: 0,
    explanation: 'Az állítás hamis (a 6 osztható 3-mal, de 9-cel nem). A megfordítás: „ha 9 | n, akkor 3 | n” – igaz, mert a 9 többszöröse a 3-nak.'
  },
  {
    id: 'dl-q22',
    level: 3,
    questionTypeBadge: 'Megfordítás',
    question: '„Ha egy természetes szám osztható 12-vel, akkor osztható 4-gyel.” Mi az állítás és a megfordítása logikai értéke?',
    figure: <NestedFig outer="4 többszörösei" inner="12 többszörösei" />,
    options: ['Az állítás igaz, a megfordítás hamis', 'Az állítás hamis, a megfordítás igaz', 'Mindkettő igaz', 'Mindkettő hamis'],
    correctAnswer: 0,
    explanation: 'Igaz, mert a 12 többszöröse a 4-nek. A megfordítás („ha 4 | n, akkor 12 | n”) hamis, ellenpélda pl. a 4 vagy a 8.'
  },
  {
    id: 'dl-q23',
    level: 3,
    questionTypeBadge: 'Ellenpélda',
    question: 'Melyik ellenpélda cáfolja a „Két prímszám összege mindig páros.” állítást?',
    options: ['2 + 3 = 5', '3 + 5 = 8', '5 + 7 = 12', '2 + 2 = 4'],
    correctAnswer: 0,
    explanation: 'Ellenpéldában két prím összege páratlan kell legyen: ez csak a 2 (az egyetlen páros prím) szereplésével lehetséges: 2 + 3 = 5. A többi összeg páros, nem cáfol.'
  },
  {
    id: 'dl-q24',
    level: 3,
    questionTypeBadge: 'Ekvivalencia',
    question: 'Igaz-e: „Két pozitív egész szorzata akkor és csak akkor páros, ha mindkét szám páros.”?',
    options: ['Hamis: pl. 2 · 3 = 6 páros, pedig a 3 páratlan', 'Igaz', 'Hamis: pl. 3 · 5 = 15 páratlan', 'Hamis: pl. 2 · 4 = 8 páros'],
    correctAnswer: 0,
    explanation: 'Az egyik irány igaz (ha mindkettő páros, a szorzat páros), de a másik nem: a szorzat már akkor páros, ha legalább az egyik tényező páros (2 · 3 = 6). A 3 · 5 és a 2 · 4 nem cáfolja az állítást.'
  },
  {
    id: 'dl-q25',
    level: 3,
    questionTypeBadge: 'Ekvivalencia',
    question: 'Igaz-e: „Egy pozitív egész szám akkor és csak akkor osztható 12-vel, ha osztható 3-mal és 4-gyel.”?',
    options: [
      'Igaz, mert 3 és 4 relatív prímek, így [3; 4] = 12',
      'Hamis, ellenpélda a 24',
      'Hamis, mert a 6 osztható 3-mal, de 12-vel nem',
      'Hamis, mert 12 = 2 · 6 is'
    ],
    correctAnswer: 0,
    explanation: 'Ha 12 | n, akkor 3 | n és 4 | n. Fordítva: ha 3 | n és 4 | n, akkor [3; 4] = 12 | n, mert 3 és 4 relatív prímek. Mindkét irány igaz. (A 6 nem osztható 4-gyel, így nem ellenpélda.)'
  },
  {
    id: 'dl-q26',
    level: 3,
    questionTypeBadge: 'Ekvivalencia',
    question: 'Igaz-e: „Egy természetes szám akkor és csak akkor osztható 5-tel, ha az utolsó számjegye 5.”?',
    options: ['Hamis, mert pl. a 10 osztható 5-tel, de 0-ra végződik', 'Igaz', 'Hamis, mert a 15 utolsó jegye 5, de nem osztható 5-tel', 'Hamis, mert az 5 prímszám'],
    correctAnswer: 0,
    explanation: 'Ha az utolsó jegy 5, akkor a szám osztható 5-tel (ez az irány igaz), de a 0-ra végződő számok is oszthatók 5-tel, így az ekvivalencia hamis.'
  },
  {
    id: 'dl-q27',
    level: 3,
    questionTypeBadge: 'Érettségi 2020',
    question: 'A: Ha egy pozitív egész osztója 24-nek, akkor osztója 12-nek is. B: Ha egy pozitív egész osztható 12-vel, akkor 6-tal is. C: Ha egy pozitív egész osztható 2-vel és 4-gyel, akkor 8-cal is. Mi a logikai értékük?',
    options: ['A: hamis, B: igaz, C: hamis', 'A: igaz, B: igaz, C: hamis', 'A: hamis, B: igaz, C: igaz', 'A: igaz, B: hamis, C: hamis'],
    correctAnswer: 0,
    explanation: 'A hamis (a 8 osztója 24-nek, de 12-nek nem). B igaz (a 12 többszöröse a 6-nak). C hamis (a 4 osztható 2-vel és 4-gyel, de 8-cal nem).'
  },
  {
    id: 'dl-q28',
    level: 3,
    questionTypeBadge: 'Érettségi 2010',
    question: 'Melyik állítások igazak? I. Minden prímszám páratlan. II. Létezik páratlan prímszám. III. Minden egész szám racionális szám. IV. Van olyan irracionális szám, amely felírható két egész szám hányadosaként. V. Nem létezik páros prímszám.',
    options: ['Csak a II. és a III.', 'Csak a II.', 'Az I., a II. és a III.', 'A II., a III. és az V.'],
    correctAnswer: 0,
    explanation: 'I. hamis (a 2 páros prím), II. igaz (pl. 3), III. igaz (n = n/1), IV. hamis (két egész hányadosa racionális), V. hamis (a 2 páros prím).'
  },
  {
    id: 'dl-q29',
    level: 3,
    questionTypeBadge: 'Venn-diagram',
    question: 'Melyik 20-nál kisebb pozitív egészekre teljesül, hogy VAGY a 3-nak többszöröse, VAGY a 30-nak osztója (pontosan az egyik)?',
    figure: <ThreeSetFig note="vagy-vagy" />,
    options: ['1, 2, 5, 9, 10, 12, 18', '3, 6, 15', '1, 2, 3, 5, 6, 9, 10, 12, 15, 18', '9, 12, 18'],
    correctAnswer: 0,
    explanation: '3 többszörösei: 3, 6, 9, 12, 15, 18; a 30 osztói: 1, 2, 3, 5, 6, 10, 15. A közös elemeket (3, 6, 15) el kell hagyni: 1, 2, 5, 9, 10, 12, 18.'
  },
  {
    id: 'dl-q30',
    level: 3,
    questionTypeBadge: 'Venn-diagram',
    question: 'Melyik 20-nál kisebb pozitív egészek NEM osztói a 30-nak, DE többszörösei az 5-nek?',
    figure: <ThreeSetFig note="nem … de …" />,
    options: ['Nincs ilyen szám', '5, 10, 15', '15', '20'],
    correctAnswer: 0,
    explanation: 'Az 5 többszörösei 20 alatt: 5, 10, 15 – mindhárom osztója a 30-nak. Így a keresett halmaz üres. (A 20 nem kisebb 20-nál.)'
  }
];

export const DivisibilityLogicQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId="g11-num-oszthatosag-logika-quiz"
      subtopicId="oszthatosag-es-logika"
      title="5. Oszthatóság és logika – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: állítások, tagadás, „és”, „vagy”, „ha…, akkor”, megfordítás és ellenpéldák."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • KVÍZ"
      questions={DIVISIBILITY_LOGIC_QUESTIONS}
      cheatSheets={[
        {
          title: 'Logikai műveletek',
          items: [
            'nem A: igaz, ha A hamis',
            'A és B: igaz, ha mindkettő igaz (metszet)',
            'A vagy B: igaz, ha legalább az egyik igaz (unió)',
            'vagy A, vagy B: igaz, ha pontosan az egyik igaz'
          ]
        },
        {
          title: 'Ha…, akkor; akkor és csak akkor',
          items: [
            'ha A, akkor B: csak akkor hamis, ha A igaz és B hamis',
            'hamis ⇔ van ellenpélda',
            'megfordítás: ha B, akkor A – külön kell ellenőrizni',
            'A ⇔ B: igaz, ha A és B értéke megegyezik'
          ]
        },
        {
          title: 'Tagadás, minden / van olyan',
          items: [
            'minden … → van olyan, amelyre nem …',
            'van olyan … → minden … nem …',
            'Minden prím páratlan – hamis (a 2)',
            '4 | n és 6 | n ⇒ 12 | n (nem 24!)'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <DivisibilityLogicMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <DivisibilityLogicSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default DivisibilityLogicQuiz;
