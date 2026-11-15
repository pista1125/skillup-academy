import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { G11RationalIrrationalMatcher } from './G11RationalIrrationalMatcher';
import { G11RationalIrrationalSorter } from './G11RationalIrrationalSorter';
import { RightAngleMark } from './G11RationalIrrationalFigures';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Számhalmazok egymásba ágyazva, egy kérdéses számmal. */
const SetsFig: React.FC<{ value: string }> = ({ value }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <rect x="4" y="4" width="232" height="142" rx="10" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
    <text x="12" y="18" fontSize="9" fontWeight="bold" fill="#334155">ℝ</text>
    <rect x="12" y="24" width="150" height="114" rx="8" fill="#ecfdf5" stroke="#047857" />
    <text x="18" y="36" fontSize="9" fontWeight="bold" fill="#047857">ℚ</text>
    <rect x="22" y="42" width="104" height="88" rx="7" fill="#d1fae5" stroke="#0d9488" />
    <text x="28" y="54" fontSize="9" fontWeight="bold" fill="#0f766e">ℤ</text>
    <rect x="32" y="60" width="62" height="62" rx="6" fill="#a7f3d0" stroke="#065f46" />
    <text x="38" y="72" fontSize="9" fontWeight="bold" fill="#065f46">ℕ</text>
    <rect x="170" y="24" width="58" height="114" rx="8" fill="#f5f3ff" stroke="#7c3aed" />
    <text x="199" y="36" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#6d28d9">ℚ*</text>
    <text x="120" y="146" fontSize="10" textAnchor="middle" fill="#0f172a">Hová kerül: {value} ?</text>
  </svg>
);

/** Derékszögű háromszög adott befogókkal, ismeretlen átfogóval. */
const RightTriFig: React.FC<{ a: string; b: string; wide?: number; tall?: number }> = ({ a, b, wide = 140, tall = 80 }) => {
  const V: [number, number] = [170, 120];
  const A: [number, number] = [V[0] - wide, V[1]];
  const B: [number, number] = [V[0], V[1] - tall];
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <polygon points={`${A[0]},${A[1]} ${V[0]},${V[1]} ${B[0]},${B[1]}`} fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <RightAngleMark v={V} a={A} b={B} r={13} />
      <text x={(A[0] + V[0]) / 2} y={V[1] + 18} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0369a1">{a}</text>
      <text x={V[0] + 10} y={(V[1] + B[1]) / 2 + 4} fontSize="13" fontWeight="bold" fill="#0369a1">{b}</text>
      <text x={(A[0] + B[0]) / 2 - 12} y={(A[1] + B[1]) / 2 - 6} fontSize="15" fontWeight="bold" fill="#7c3aed">?</text>
    </svg>
  );
};

/** Egységnégyzet átlóval. */
const UnitSquareFig: React.FC = () => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <rect x="70" y="20" width="100" height="100" fill="#ecfdf5" stroke="#047857" strokeWidth="2" />
    <RightAngleMark v={[70, 120]} a={[170, 120]} b={[70, 20]} r={13} />
    <line x1="70" y1="120" x2="170" y2="20" stroke="#7c3aed" strokeWidth="2.5" />
    <text x="120" y="138" fontSize="12" textAnchor="middle" fill="#047857">1</text>
    <text x="178" y="74" fontSize="12" fill="#047857">1</text>
    <text x="108" y="62" fontSize="15" fontWeight="bold" fill="#7c3aed">?</text>
  </svg>
);

/** Kör adott sugárral. */
const CircleFig: React.FC = () => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <circle cx="120" cy="75" r="58" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <circle cx="120" cy="75" r="2.5" fill="#92400e" />
    <line x1="120" y1="75" x2="178" y2="75" stroke="#92400e" strokeWidth="2" />
    <text x="149" y="68" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#92400e">r = 4</text>
    <text x="110" y="110" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#b45309">T = ?</text>
  </svg>
);

/** Számegyenes intervallummal. */
const IntervalFig: React.FC = () => (
  <svg viewBox="0 0 240 110" className={FIG_CLASS}>
    <line x1="10" y1="60" x2="230" y2="60" stroke="#334155" strokeWidth="2" />
    {[-3, -2, -1, 0].map((k, i) => (
      <g key={k}>
        <line x1={30 + i * 60} y1="54" x2={30 + i * 60} y2="66" stroke="#334155" strokeWidth="2" />
        <text x={30 + i * 60} y="84" fontSize="12" textAnchor="middle" fill="#334155">{k === 0 ? '0' : `−${-k}`}</text>
      </g>
    ))}
    <line x1="90" y1="60" x2="150" y2="60" stroke="#7c3aed" strokeWidth="5" />
    <circle cx="90" cy="60" r="5" fill="#7c3aed" />
    <circle cx="150" cy="60" r="5" fill="#7c3aed" />
    <text x="120" y="38" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#6d28d9">[−2; −1]</text>
  </svg>
);

const RATIONAL_IRRATIONAL_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: fogalmak (1–10)
  {
    id: 'ri-q1',
    level: 1,
    questionTypeBadge: 'Irracionális',
    question: 'Melyik szám irracionális az alábbiak közül?',
    options: ['√2', '√4', '0,333…', '22/7'],
    correctAnswer: 0,
    explanation: 'A 2 nem négyzetszám, ezért √2 irracionális. √4 = 2 egész, 0,333… = 1/3 szakaszos, a 22/7 pedig közönséges tört – ezek racionálisak.'
  },
  {
    id: 'ri-q2',
    level: 1,
    questionTypeBadge: 'Definíció',
    question: 'Mit nevezünk irracionális számnak?',
    options: [
      'Olyan valós számot, amely nem írható fel két egész szám hányadosaként',
      'Olyan számot, amelynek tizedes tört alakja végtelen',
      'Minden negatív számot',
      'Minden gyökjeles kifejezést'
    ],
    correctAnswer: 0,
    explanation: 'Az irracionális számok a nem racionális valós számok. A végtelen tizedes tört még lehet szakaszos (pl. 1/3 = 0,333…), és √9 = 3 is gyökjeles, mégis racionális.'
  },
  {
    id: 'ri-q3',
    level: 1,
    questionTypeBadge: 'Tizedes tört',
    question: 'Milyen az irracionális számok tizedes tört alakja?',
    options: ['Végtelen, nem szakaszos', 'Véges', 'Végtelen szakaszos', 'Lehet véges is, végtelen is'],
    correctAnswer: 0,
    explanation: 'A véges és a végtelen szakaszos tizedes törtek racionális számok. Az irracionális számok tizedes tört alakja végtelen és nem szakaszos.'
  },
  {
    id: 'ri-q4',
    level: 1,
    questionTypeBadge: 'Számhalmazok',
    question: 'Melyik legszűkebb számhalmaznak eleme a √144?',
    figure: <SetsFig value="√144" />,
    options: ['ℕ (természetes számok)', 'ℚ* (irracionális számok)', 'ℚ, de nem ℤ', 'ℤ, de nem ℕ'],
    correctAnswer: 0,
    explanation: '√144 = 12, mert 12² = 144. A 12 természetes szám (így egész, racionális és valós is).'
  },
  {
    id: 'ri-q5',
    level: 1,
    questionTypeBadge: 'Számhalmazok',
    question: 'Hová kerül a halmazábrán az 1/5-nél 2/3-dal kisebb szám?',
    figure: <SetsFig value="1/5 − 2/3" />,
    options: ['ℚ-ba, de nem ℤ-be', 'ℤ-be, de nem ℕ-be', 'ℚ*-ba (irracionális)', 'ℕ-be'],
    correctAnswer: 0,
    explanation: '1/5 − 2/3 = 3/15 − 10/15 = −7/15: negatív, nem egész, de két egész szám hányadosa, tehát racionális.'
  },
  {
    id: 'ri-q6',
    level: 1,
    questionTypeBadge: 'Pitagorasz',
    question: 'Mekkora az 1 egység oldalú négyzet átlója, és milyen szám ez?',
    figure: <UnitSquareFig />,
    options: ['√2 ≈ 1,41, irracionális', '2, racionális', '1,41, racionális', '√2 = 1,4, racionális'],
    correctAnswer: 0,
    explanation: 'Pitagorasz tétele szerint d² = 1² + 1² = 2, így d = √2 ≈ 1,41. A √2 irracionális; az 1,41 csak a kerekített értéke.'
  },
  {
    id: 'ri-q7',
    level: 1,
    questionTypeBadge: 'Kör területe',
    question: 'Mennyi a 4 egység sugarú kör területe, és milyen szám ez?',
    figure: <CircleFig />,
    options: ['16π ≈ 50,27, irracionális', '8π ≈ 25,13, irracionális', '16π = 50,27, racionális', '50, racionális'],
    correctAnswer: 0,
    explanation: 'T = r²π = 4² · π = 16π ≈ 50,27. A π irracionális, és egy nem nulla racionális szám (16) szorzata vele szintén irracionális.'
  },
  {
    id: 'ri-q8',
    level: 1,
    questionTypeBadge: 'Halmazok',
    question: 'Mit kapunk, ha a racionális és az irracionális számok halmazát egyesítjük (ℚ ∪ ℚ*)?',
    options: ['A valós számok halmazát (ℝ)', 'Az üres halmazt', 'Az egész számok halmazát', 'A racionális számok halmazát'],
    correctAnswer: 0,
    explanation: 'Minden valós szám vagy racionális, vagy irracionális (egyszerre nem lehet mindkettő): ℚ ∪ ℚ* = ℝ, és ℚ ∩ ℚ* = ∅.'
  },
  {
    id: 'ri-q9',
    level: 1,
    questionTypeBadge: 'Szakaszos tört',
    question: 'Melyik közönséges tört egyenlő a 0,333… (= 0,(3)) végtelen szakaszos tizedes törttel?',
    options: ['1/3', '3/10', '33/100', '1/30'],
    correctAnswer: 0,
    explanation: 'x = 0,333… ⇒ 10x = 3,333… ⇒ 9x = 3 ⇒ x = 1/3. A 3/10 = 0,3 és 33/100 = 0,33 véges, 1/30 = 0,0333…'
  },
  {
    id: 'ri-q10',
    level: 1,
    questionTypeBadge: 'Négyzetgyök',
    question: 'Mikor racionális egy pozitív egész szám négyzetgyöke?',
    options: ['Ha a szám négyzetszám', 'Ha a szám páros', 'Ha a szám prím', 'Mindig'],
    correctAnswer: 0,
    explanation: 'Pozitív egész n esetén √n pontosan akkor racionális (sőt egész), ha n négyzetszám: √4 = 2, √9 = 3, de √2, √3, √5, √8 irracionális.'
  },

  // LEVEL 2: műveletek, átalakítások (11–20)
  {
    id: 'ri-q11',
    level: 2,
    questionTypeBadge: 'Műveletek',
    question: '„Bármely két irracionális szám összege irracionális.” Igaz-e?',
    options: ['Hamis, pl. √2 + (−√2) = 0', 'Igaz, mert ℚ* zárt az összeadásra', 'Hamis, pl. √2 + √2 = 2√2', 'Igaz, pl. √2 + √3 irracionális'],
    correctAnswer: 0,
    explanation: 'Egyetlen ellenpélda elég: √2 és −√2 irracionális, összegük 0 racionális. (A 2√2 irracionális, ezért az nem ellenpélda; egy példa pedig nem bizonyítja az általános állítást.)'
  },
  {
    id: 'ri-q12',
    level: 2,
    questionTypeBadge: 'Műveletek',
    question: 'Melyik példa mutatja, hogy két irracionális szám szorzata lehet racionális?',
    options: ['√3 · 2√3 = 6', '√2 · √3 = √6', '2 · π = 2π', '√2 + √2 = 2√2'],
    correctAnswer: 0,
    explanation: '√3 és 2√3 is irracionális, szorzatuk 2 · (√3)² = 2 · 3 = 6 racionális. A √6 és a 2π irracionális, az utolsó pedig összeadás.'
  },
  {
    id: 'ri-q13',
    level: 2,
    questionTypeBadge: 'Műveletek',
    question: 'Mit mondhatunk egy racionális és egy irracionális szám összegéről?',
    options: ['Mindig irracionális', 'Mindig racionális', 'Lehet racionális is, irracionális is', 'Mindig egész szám'],
    correctAnswer: 0,
    explanation: 'Ha r + i = q racionális volna, akkor i = q − r két racionális szám különbsége, tehát racionális lenne – ellentmondás. Pl. 0 + √2 = √2.'
  },
  {
    id: 'ri-q14',
    level: 2,
    questionTypeBadge: 'Műveletek',
    question: 'Mikor lehet egy racionális és egy irracionális szám szorzata racionális?',
    options: ['Csak akkor, ha a racionális tényező 0', 'Soha', 'Mindig', 'Ha a racionális tényező 1'],
    correctAnswer: 0,
    explanation: '0 · √3 = 0 racionális. Ha r ≠ 0 és r · i = q racionális lenne, akkor i = q : r is racionális volna. Az 1 · √3 = √3 irracionális.'
  },
  {
    id: 'ri-q15',
    level: 2,
    questionTypeBadge: 'Szakaszos tört',
    question: 'Írd fel közönséges tört alakban a 0,272727… = 0,(27) számot!',
    options: ['3/11', '27/100', '3/10', '2/7'],
    correctAnswer: 0,
    explanation: 'x = 0,2727… ⇒ 100x = 27,2727… ⇒ 99x = 27 ⇒ x = 27/99 = 3/11.'
  },
  {
    id: 'ri-q16',
    level: 2,
    questionTypeBadge: 'Szakaszos tört',
    question: 'Írd fel közönséges tört alakban a 0,1666… = 0,1(6) számot!',
    options: ['1/6', '16/99', '1/16', '8/45'],
    correctAnswer: 0,
    explanation: '10x = 1,666…, 100x = 16,666…; kivonva 90x = 15, x = 15/90 = 1/6. (8/45 = 0,1777…, 16/99 = 0,1616…)'
  },
  {
    id: 'ri-q17',
    level: 2,
    questionTypeBadge: 'Szerkesztés',
    question: 'Melyik derékszögű háromszög átfogója √13 hosszú?',
    figure: <RightTriFig a="a" b="b" wide={120} tall={80} />,
    options: ['A 3 és 2 befogójú', 'Az 1 és 3 befogójú', 'A 2 és 2 befogójú', 'Az 1 és 4 befogójú'],
    correctAnswer: 0,
    explanation: '3² + 2² = 9 + 4 = 13, így az átfogó √13. (1 + 9 = 10, 4 + 4 = 8, 1 + 16 = 17.)'
  },
  {
    id: 'ri-q18',
    level: 2,
    questionTypeBadge: 'Szerkesztés',
    question: 'Egy derékszögű háromszög befogói 2 és 1 egység. Mekkora az átfogója?',
    figure: <RightTriFig a="2" b="1" wide={140} tall={70} />,
    options: ['√5', '3', '√3', '5'],
    correctAnswer: 0,
    explanation: 'c² = 2² + 1² = 5 ⇒ c = √5 ≈ 2,24. Így szerkeszthető meg a √5 a számegyenesen.'
  },
  {
    id: 'ri-q19',
    level: 2,
    questionTypeBadge: 'Négyzetgyök',
    question: 'Melyik szám racionális?',
    options: ['√(4/9)', '√8', '√0,9', '√12'],
    correctAnswer: 0,
    explanation: '√(4/9) = 2/3, mert (2/3)² = 4/9. √8 = 2√2 és √12 = 2√3 irracionális; √0,9 = √(9/10) = 3/√10 szintén irracionális.'
  },
  {
    id: 'ri-q20',
    level: 2,
    questionTypeBadge: 'Halmazok',
    question: 'Mivel egyenlő a ℝ ∖ ℚ* halmaz (a valós számokból elhagyjuk az irracionálisakat)?',
    options: ['ℚ', '∅', 'ℚ*', 'ℤ'],
    correctAnswer: 0,
    explanation: 'ℝ = ℚ ∪ ℚ*, és a két halmaz diszjunkt, így ℝ ∖ ℚ* = ℚ.'
  },

  // LEVEL 3: bizonyítás, összetett feladatok (21–30)
  {
    id: 'ri-q21',
    level: 3,
    questionTypeBadge: 'Bizonyítás',
    question: 'Hogyan kezdődik a „√2 irracionális” állítás indirekt bizonyítása?',
    options: [
      'Tegyük fel, hogy √2 = p/q, ahol p és q relatív prím pozitív egészek',
      'Tegyük fel, hogy √2 irracionális',
      'Kiszámoljuk √2 első 10 tizedesjegyét',
      'Tegyük fel, hogy √2 = 1,4142'
    ],
    correctAnswer: 0,
    explanation: 'Indirekt bizonyításnál az állítás tagadását tesszük fel: √2 racionális, azaz felírható tovább nem egyszerűsíthető p/q törtként, majd ellentmondásra jutunk.'
  },
  {
    id: 'ri-q22',
    level: 3,
    questionTypeBadge: 'Bizonyítás',
    question: 'A √2 = p/q feltevésből p² = 2q² adódik. Mi következik ebből?',
    options: ['p páros', 'q páros, p páratlan', 'p prímszám', 'p = 2q'],
    correctAnswer: 0,
    explanation: 'p² = 2q² páros, és páratlan szám négyzete páratlan, ezért p páros. Ezután p = 2k-ból q² = 2k², így q is páros lesz.'
  },
  {
    id: 'ri-q23',
    level: 3,
    questionTypeBadge: 'Bizonyítás',
    question: 'Mi az ellentmondás a √2 irracionalitásának bizonyításában?',
    options: [
      'p és q is páros, pedig relatív prímeknek választottuk őket',
      'p² negatív lenne',
      'q = 0 adódik',
      'A √2 nagyobb lenne 2-nél'
    ],
    correctAnswer: 0,
    explanation: 'p és q közös osztója a 2, ami ellentmond annak, hogy a p/q tört tovább nem egyszerűsíthető. A feltevés tehát hamis, √2 irracionális.'
  },
  {
    id: 'ri-q24',
    level: 3,
    questionTypeBadge: 'Tizedes tört',
    question: 'Miért irracionális a 0,12112211122211112222… szám (egyre több 1-es, majd ugyanannyi 2-es)?',
    options: [
      'Mert tizedes tört alakja végtelen és nem szakaszos',
      'Mert végtelen tizedes tört',
      'Mert csak 1-es és 2-es jegyekből áll',
      'Mert 1-nél kisebb'
    ],
    correctAnswer: 0,
    explanation: 'Ha k hosszú szakasza lenne, az egymás utáni k darab 1-es miatt a szakasz csupa 1-esből állna, de végtelen sok 2-es is van – ellentmondás. A „végtelen” önmagában kevés: 0,333… is végtelen.'
  },
  {
    id: 'ri-q25',
    level: 3,
    questionTypeBadge: 'Műveletek',
    question: 'P = 5π + 2. Melyik művelet eredménye racionális?',
    options: ['P − 5π', 'P · 2', 'P − 2', 'P + π'],
    correctAnswer: 0,
    explanation: 'P − 5π = 2 racionális. P · 2 = 10π + 4, P − 2 = 5π és P + π = 6π + 2 mind irracionális.'
  },
  {
    id: 'ri-q26',
    level: 3,
    questionTypeBadge: 'Négyzetgyök',
    question: 'Melyik szám négyzetgyöke racionális?',
    options: ['700/1575', '(2³ · 3² · 7³; 2⁴ · 3 · 7)', '[2² · 3 · 5³ · 7; 3² · 5² · 11]', 'π⁴'],
    correctAnswer: 0,
    explanation: '700/1575 = 4/9, a gyöke 2/3. Az lnko 2³ · 3 · 7 = 168, az lkkt 2² · 3² · 5³ · 7 · 11 – mindkettőben van páratlan kitevő, így gyökük irracionális; √(π⁴) = π² irracionális.'
  },
  {
    id: 'ri-q27',
    level: 3,
    questionTypeBadge: 'Racionális',
    question: 'Hány olyan racionális szám van, amely negatív, végtelen szakaszos tizedes tört, közönséges tört alakjában a nevező egyjegyű és 3-mal nagyobb a számlálónál, és ez a tört tovább egyszerűsíthető?',
    options: ['1', '2', '0', '3'],
    correctAnswer: 0,
    explanation: 'A tört −n/(n + 3), n + 3 ≤ 9. Egyszerűsíthető, ha 3 | n: n = 3 (−3/6 = −0,5 véges, nem jó) vagy n = 6 (−6/9 = −2/3 = −0,666…, jó). Egyetlen ilyen szám van.'
  },
  {
    id: 'ri-q28',
    level: 3,
    questionTypeBadge: 'Irracionális',
    question: 'Racionális-e a √2 reciproka?',
    options: ['Nem: 1/√2 = √2/2, ami irracionális', 'Igen: 1/√2 = 0,5', 'Igen, mert reciprokot képezni ℚ-ban lehet', 'Nem, mert negatív'],
    correctAnswer: 0,
    explanation: '1/√2 = √2/2 egy nem nulla racionális szám (1/2) és egy irracionális szám szorzata, tehát irracionális.'
  },
  {
    id: 'ri-q29',
    level: 3,
    questionTypeBadge: 'Intervallum',
    question: 'Melyik szám irracionális és eleme a [−2; −1] intervallumnak?',
    figure: <IntervalFig />,
    options: ['−√3', '−√5', '−1,5', '−√0,5'],
    correctAnswer: 0,
    explanation: '−√3 ≈ −1,73 ∈ [−2; −1] és irracionális. −√5 ≈ −2,24 kívül esik, −1,5 racionális, −√0,5 ≈ −0,71 nincs az intervallumban.'
  },
  {
    id: 'ri-q30',
    level: 3,
    questionTypeBadge: 'Irracionális',
    question: 'Melyik szám negatív, irracionális, −1-nél nagyobb, és a négyzete legfeljebb 0,5?',
    options: ['−√2/2', '−√0,6', '−0,5', '−π/3'],
    correctAnswer: 0,
    explanation: '(−√2/2)² = 2/4 = 0,5 ≤ 0,5, és −√2/2 ≈ −0,71 > −1, irracionális. (−√0,6)² = 0,6 > 0,5; −0,5 racionális; −π/3 ≈ −1,05 < −1.'
  }
];

export const G11RationalIrrationalQuiz: React.FC<{
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
      topicId="g11-num-irracionalis-quiz"
      subtopicId="racionalis-irracionalis-szamok"
      title="10. Racionális számok, irracionális számok – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: számhalmazok, tizedes törtek, műveletek irracionális számokkal, szerkesztés és a √2 irracionalitásának bizonyítása."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • KVÍZ"
      questions={RATIONAL_IRRATIONAL_QUESTIONS}
      cheatSheets={[
        {
          title: 'Racionális vagy irracionális?',
          items: [
            'Racionális: p/q alakú; véges vagy végtelen szakaszos tizedes tört',
            'Irracionális: végtelen, nem szakaszos tizedes tört',
            '√n (n pozitív egész) racionális ⇔ n négyzetszám',
            'ℚ ∪ ℚ* = ℝ, ℚ ∩ ℚ* = ∅'
          ]
        },
        {
          title: 'Műveletek',
          items: [
            'racionális + irracionális = mindig irracionális',
            'racionális (≠ 0) · irracionális = mindig irracionális',
            'irracionális + irracionális: bármi lehet (√2 + (−√2) = 0)',
            'irracionális · irracionális: bármi lehet (√3 · 2√3 = 6)'
          ]
        },
        {
          title: 'Szakaszos tört → közönséges tört',
          items: [
            '0,(3): 10x − x = 3 ⇒ x = 1/3',
            '0,(27): 100x − x = 27 ⇒ x = 3/11',
            '0,1(6): 100x − 10x = 15 ⇒ x = 1/6',
            '0,(9) = 1'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <G11RationalIrrationalMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <G11RationalIrrationalSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default G11RationalIrrationalQuiz;
