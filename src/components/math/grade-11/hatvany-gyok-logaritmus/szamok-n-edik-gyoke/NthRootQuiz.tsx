import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { NthRootMatcher } from './NthRootMatcher';
import { NthRootSorter } from './NthRootSorter';

const QSVG = 'w-full max-w-[280px] h-auto mx-auto';

/** Kocka egy adattal és ismeretlen éllel. */
const CubeFig: React.FC<{ data: string }> = ({ data }) => (
  <svg viewBox="0 0 240 160" className={QSVG}>
    <polygon points="60,50 140,50 140,130 60,130" fill="#fce7f3" stroke="#334155" strokeWidth="1.5" />
    <polygon points="60,50 90,25 170,25 140,50" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />
    <polygon points="140,50 170,25 170,105 140,130" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
    <text x="100" y="148" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#be185d">
      a = ?
    </text>
    <text x="205" y="75" fontSize="12" textAnchor="middle" fill="#0f172a">
      {data}
    </text>
  </svg>
);

const SPHERE_FIG = (
  <svg viewBox="0 0 240 160" className={QSVG}>
    <rect x="85" y="115" width="14" height="40" fill="#94a3b8" />
    <circle cx="92" cy="72" r="50" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
    <ellipse cx="92" cy="72" rx="50" ry="12" fill="none" stroke="#2563eb" strokeDasharray="4 3" />
    <line x1="92" y1="72" x2="142" y2="72" stroke="#be185d" strokeWidth="2" />
    <text x="117" y="66" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#be185d">
      R = ?
    </text>
    <text x="195" y="60" fontSize="12" textAnchor="middle" fill="#0f172a">
      V = 113 m³
    </text>
    <text x="195" y="80" fontSize="10" textAnchor="middle" fill="#475569">
      V = 4πR³/3
    </text>
  </svg>
);

/** y = x⁴ és az y = 81 egyenes – a metszéspontok helye nincs megjelölve. */
const EVEN_POWER_FIG = (() => {
  const toS = (x: number, y: number): [number, number] => [120 + x * 26, 140 - y * 1.4];
  let d = '';
  let pen = false;
  for (let i = 0; i <= 160; i++) {
    const x = -4 + (8 * i) / 160;
    const y = Math.pow(x, 4);
    if (y > 95) {
      pen = false;
      continue;
    }
    const [sx, sy] = toS(x, y);
    d += `${pen ? 'L' : 'M'} ${sx.toFixed(1)} ${sy.toFixed(1)} `;
    pen = true;
  }
  return (
    <svg viewBox="0 0 240 160" className={QSVG}>
      <line x1="10" y1="140" x2="230" y2="140" stroke="#94a3b8" />
      <line x1="120" y1="5" x2="120" y2="155" stroke="#94a3b8" />
      <path d={d} fill="none" stroke="#059669" strokeWidth="2.5" />
      <line x1="10" y1={toS(0, 81)[1]} x2="230" y2={toS(0, 81)[1]} stroke="#f59e0b" strokeDasharray="5 4" strokeWidth="1.5" />
      <text x="226" y={toS(0, 81)[1] - 4} fontSize="11" textAnchor="end" fill="#b45309">
        y = 81
      </text>
      <text x="200" y="130" fontSize="11" fill="#059669">
        y = x⁴
      </text>
      <text x="40" y="20" fontSize="12" fontWeight="bold" fill="#b91c1c">
        Hány metszéspont? ?
      </text>
    </svg>
  );
})();

const NTH_ROOT_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Definíció, egyszerű gyökök (1–10)
  {
    id: 'nrt-q1',
    level: 1,
    questionTypeBadge: 'n-edik gyök',
    question: 'Mennyi ⁴√81 értéke?',
    options: ['3', '9', '±3', '27'],
    correctAnswer: 0,
    explanation: '3⁴ = 81, és páros gyökkitevőnél a gyök a nemnegatív szám: ⁴√81 = 3 (nem ±3).'
  },
  {
    id: 'nrt-q2',
    level: 1,
    questionTypeBadge: 'Köbgyök',
    question: 'Mennyi ∛−216 értéke?',
    options: ['−6', '6', 'Nincs értelmezve', '−72'],
    correctAnswer: 0,
    explanation: 'Páratlan gyökkitevőnél negatív számból is vonhatunk gyököt: (−6)³ = −216, így ∛−216 = −6.'
  },
  {
    id: 'nrt-q3',
    level: 1,
    questionTypeBadge: 'n-edik gyök',
    question: 'Mennyi ⁷√128 értéke?',
    options: ['2', '4', '16', '64'],
    correctAnswer: 0,
    explanation: '2⁷ = 128, ezért ⁷√128 = 2.'
  },
  {
    id: 'nrt-q4',
    level: 1,
    questionTypeBadge: 'Négyzetgyök',
    question: 'Mennyi √100 értéke?',
    options: ['10', '±10', '50', '10 000'],
    correctAnswer: 0,
    explanation: '10² = 100, és a négyzetgyök nemnegatív: √100 = 10.'
  },
  {
    id: 'nrt-q5',
    level: 1,
    questionTypeBadge: 'Köbgyök',
    question: 'Mennyi ∛−1000 értéke?',
    options: ['−10', '10', '−100', 'Nincs értelmezve'],
    correctAnswer: 0,
    explanation: '(−10)³ = −1000, ezért ∛−1000 = −10.'
  },
  {
    id: 'nrt-q6',
    level: 1,
    questionTypeBadge: 'Értelmezés',
    question: 'Milyen számokra értelmezzük a páros kitevőjű gyököt (a valós számok körében)?',
    options: ['A nemnegatív valós számokra', 'Minden valós számra', 'Csak a pozitív egész számokra', 'Csak a negatív számokra'],
    correctAnswer: 0,
    explanation: 'Minden valós szám páros kitevőjű hatványa nemnegatív, ezért páros kitevőjű gyököt csak nemnegatív számból vonunk.'
  },
  {
    id: 'nrt-q7',
    level: 1,
    questionTypeBadge: 'Értelmezés',
    question: 'Mennyi ⁿ√0 értéke (n > 1 egész)?',
    options: ['0', '1', 'n', 'Nincs értelmezve'],
    correctAnswer: 0,
    explanation: 'A 0 pozitív egész kitevőjű gyökét is értelmezzük: ⁿ√0 = 0, mert 0ⁿ = 0.'
  },
  {
    id: 'nrt-q8',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Az ⁿ√a kifejezésben hogyan nevezzük az n-et?',
    options: ['Gyökkitevő', 'Alap', 'Hatványkitevő', 'Gyök alatti szám'],
    correctAnswer: 0,
    explanation: 'Az ⁿ√a kifejezésben a az alap (gyök alatti szám), n a gyökkitevő (n ∈ N⁺ \\ {1}).'
  },
  {
    id: 'nrt-q9',
    level: 1,
    questionTypeBadge: 'n-edik gyök',
    question: 'Mennyi ⁶√1 000 000 értéke?',
    options: ['10', '100', '1000', '166 666,7'],
    correctAnswer: 0,
    explanation: '10⁶ = 1 000 000, ezért ⁶√1 000 000 = 10. (A ∛1 000 000 lenne 100.)'
  },
  {
    id: 'nrt-q10',
    level: 1,
    questionTypeBadge: 'n-edik gyök',
    question: 'Mennyi ¹⁰√1024 értéke?',
    options: ['2', '4', '102,4', '10'],
    correctAnswer: 0,
    explanation: '2¹⁰ = 1024, ezért ¹⁰√1024 = 2.'
  },

  // LEVEL 2: Kocka, törtek, tizedes törtek (11–20)
  {
    id: 'nrt-q11',
    level: 2,
    questionTypeBadge: 'Kocka',
    question: 'Egy kocka felszíne 294 cm². Mekkora az éle?',
    figure: <CubeFig data="A = 294 cm²" />,
    options: ['7 cm', '49 cm', '≈ 17,15 cm', '≈ 6,65 cm'],
    correctAnswer: 0,
    explanation: 'A = 6a² = 294 ⇒ a² = 49 ⇒ a = 7 cm. (√294 ≈ 17,15 és ∛294 ≈ 6,65 hibás modellből jön.)'
  },
  {
    id: 'nrt-q12',
    level: 2,
    questionTypeBadge: 'Kocka',
    question: 'Egy kocka térfogata 64 cm³. Mekkora az éle?',
    figure: <CubeFig data="V = 64 cm³" />,
    options: ['4 cm', '8 cm', '16 cm', '≈ 21,3 cm'],
    correctAnswer: 0,
    explanation: 'V = a³ = 64 ⇒ a = ∛64 = 4 cm. (8 = √64 a négyzetgyök lenne.)'
  },
  {
    id: 'nrt-q13',
    level: 2,
    questionTypeBadge: 'Kocka',
    question: 'Egy kocka alakú doboz egy rétegű kibéléséhez 102 cm² anyag kell. Mekkora a doboz éle?',
    options: ['√17 ≈ 4,12 cm', '√102 ≈ 10,10 cm', '∛102 ≈ 4,67 cm', '17 cm'],
    correctAnswer: 0,
    explanation: '6a² = 102 ⇒ a² = 17 ⇒ a = √17 ≈ 4,12 cm.'
  },
  {
    id: 'nrt-q14',
    level: 2,
    questionTypeBadge: 'Kocka',
    question: 'Egy kocka alakú üvegtartályba 45 cm³ víz fér. Mekkora az éle?',
    options: ['∛45 ≈ 3,56 cm', '√45 ≈ 6,71 cm', '15 cm', '7,5 cm'],
    correctAnswer: 0,
    explanation: 'a³ = 45 ⇒ a = ∛45 ≈ 3,56 cm; valóban 3,5³ = 42,875 < 45 < 46,656 = 3,6³.'
  },
  {
    id: 'nrt-q15',
    level: 2,
    questionTypeBadge: 'Gyökvonás kézzel',
    question: 'A √3346 jegyenkénti kiszámításakor az első három jegy 57,8. Mi a következő jegy?',
    options: ['4', '5', '3', '8'],
    correctAnswer: 0,
    explanation: 'A maradék 51 600; 2 · 578 = 1156, és 11 564 · 4 = 46 256 ≤ 51 600 < 11 565 · 5 = 57 825, így a jegy 4: √3346 ≈ 57,84.'
  },
  {
    id: 'nrt-q16',
    level: 2,
    questionTypeBadge: 'Köbgyök',
    question: 'Mennyi ∛(27/8) értéke?',
    options: ['3/2', '9/4', '27/24', '3/8'],
    correctAnswer: 0,
    explanation: 'A számlálóból és a nevezőből is gyököt vonunk: (3/2)³ = 27/8.'
  },
  {
    id: 'nrt-q17',
    level: 2,
    questionTypeBadge: 'n-edik gyök',
    question: 'Mennyi ⁴√(1/16) értéke?',
    options: ['1/2', '1/4', '±1/2', '1/8'],
    correctAnswer: 0,
    explanation: '(1/2)⁴ = 1/16, és a páros gyök nemnegatív: ⁴√(1/16) = 1/2.'
  },
  {
    id: 'nrt-q18',
    level: 2,
    questionTypeBadge: 'Köbgyök',
    question: 'Mennyi ∛0,001 értéke?',
    options: ['0,1', '0,01', '0,0001', '0,3'],
    correctAnswer: 0,
    explanation: '0,1³ = 0,001, ezért ∛0,001 = 0,1.'
  },
  {
    id: 'nrt-q19',
    level: 2,
    questionTypeBadge: 'n-edik gyök',
    question: 'Mennyi ⁴√625 értéke?',
    options: ['5', '25', '±5', '156,25'],
    correctAnswer: 0,
    explanation: '5⁴ = 625, így ⁴√625 = 5. (25 = √625.)'
  },
  {
    id: 'nrt-q20',
    level: 2,
    questionTypeBadge: 'n-edik gyök',
    question: 'Mennyi ⁶√0,015625 értéke?',
    options: ['0,5', '0,25', '0,125', '0,05'],
    correctAnswer: 0,
    explanation: '0,5⁶ = 0,015625, ezért ⁶√0,015625 = 0,5.'
  },

  // LEVEL 3: Alkalmazások (21–30)
  {
    id: 'nrt-q21',
    level: 3,
    questionTypeBadge: 'Kocka',
    question: 'A bűvös kocka térfogata 216 cm³. Mekkora a felszíne?',
    options: ['216 cm²', '36 cm²', '1296 cm²', '6 cm²'],
    correctAnswer: 0,
    explanation: 'a = ∛216 = 6 cm, A = 6 · 6² = 216 cm². (36 cm² csak egy lap területe.)'
  },
  {
    id: 'nrt-q22',
    level: 3,
    questionTypeBadge: 'Gömb',
    question: 'Egy víztorony gömb alakú tartályának térfogata 113 m³. Mekkora a gömb sugara? (V = 4πR³/3)',
    figure: SPHERE_FIG,
    options: ['≈ 3,00 m', '≈ 4,83 m', '≈ 26,98 m', '≈ 10,63 m'],
    correctAnswer: 0,
    explanation: 'R³ = 3V/(4π) ≈ 26,98 ⇒ R = ∛26,98 ≈ 3,00 m. (∛113 ≈ 4,83 a 4π/3 szorzó elhagyásával jönne ki.)'
  },
  {
    id: 'nrt-q23',
    level: 3,
    questionTypeBadge: 'Gömb',
    question: 'Hány m² alumínium kell a 113 m³-es (R ≈ 3,00 m sugarú) gömbtartály burkolatához? (A = 4πR²)',
    options: ['≈ 113 m²', '≈ 28,3 m²', '≈ 37,7 m²', '≈ 339 m²'],
    correctAnswer: 0,
    explanation: 'A = 4π · 3,00² ≈ 113 m². (π R² ≈ 28,3 egy főkör területe, 4πR ≈ 37,7 nem terület.)'
  },
  {
    id: 'nrt-q24',
    level: 3,
    questionTypeBadge: 'Népesség',
    question: 'Magyarország népessége 20 év alatt 10,2 millióról 9,7 millióra csökkent, így (1 + r)²⁰ ≈ 0,95. Mennyi az átlagos évi változás?',
    options: ['≈ −0,26%', '≈ −2,5%', '≈ −5%', '≈ −0,025%'],
    correctAnswer: 0,
    explanation: '1 + r = ²⁰√0,95 ≈ 0,9974 ⇒ r ≈ −0,0026, azaz ≈ 0,26% fogyás évente. (A −5% a teljes 20 éves csökkenés.)'
  },
  {
    id: 'nrt-q25',
    level: 3,
    questionTypeBadge: 'Népesség',
    question: 'Hollandia népessége 1950-ben 10 millió, 2013-ban 16,78 millió fő volt. Mennyi az átlagos évi népszaporodás?',
    options: ['≈ 0,82%', '≈ 1,08%', '≈ 67,8%', '≈ 0,068%'],
    correctAnswer: 0,
    explanation: '1 + r = ⁶³√1,678 ≈ 1,00825 ⇒ r ≈ 0,82%. (1,08% = 67,8% : 63 – a kamatos növekedés miatt ez hibás.)'
  },
  {
    id: 'nrt-q26',
    level: 3,
    questionTypeBadge: 'Exponenciális növekedés',
    question: 'Egy tóban az algás terület minden nap ugyanannyiszorosára nő: 1,5 m²-ről egy hét alatt 27 m²-re. Hányszorosára nő naponta?',
    options: ['⁷√18 ≈ 1,51-szeresére', '18 : 7 ≈ 2,57-szeresére', '√18 ≈ 4,24-szeresére', '18-szorosára'],
    correctAnswer: 0,
    explanation: '1,5 · q⁷ = 27 ⇒ q⁷ = 18 ⇒ q = ⁷√18 ≈ 1,51.'
  },
  {
    id: 'nrt-q27',
    level: 3,
    questionTypeBadge: 'Kocka',
    question: 'Egy kocka térfogata 42 cm³. Melyik képlet adja a felszínét?',
    options: ['6 · (∛42)² cm²', '6 · 42 cm²', '6 · ∛42 cm²', '6 · √42 cm²'],
    correctAnswer: 0,
    explanation: 'a = ∛42, A = 6a² = 6 · (∛42)² ≈ 72,50 cm².'
  },
  {
    id: 'nrt-q28',
    level: 3,
    questionTypeBadge: 'n-edik gyök',
    question: 'Mennyi ⁵√(3⁴ · 3⁶) értéke?',
    options: ['9', '3', '27', '81'],
    correctAnswer: 0,
    explanation: '3⁴ · 3⁶ = 3¹⁰ = (3²)⁵, így ⁵√3¹⁰ = 3² = 9.'
  },
  {
    id: 'nrt-q29',
    level: 3,
    questionTypeBadge: 'Értelmezés',
    question: 'Melyik kifejezésnek NINCS értelme a valós számok körében?',
    options: ['⁴√−16', '∛−8', '⁵√−32', '⁶√0'],
    correctAnswer: 0,
    explanation: 'Páros gyökkitevőnél a gyök alatt nem állhat negatív szám (x⁴ ≥ 0). ∛−8 = −2, ⁵√−32 = −2, ⁶√0 = 0.'
  },
  {
    id: 'nrt-q30',
    level: 3,
    questionTypeBadge: 'Páros kitevő',
    question: 'Hány valós megoldása van az x⁴ = 81 egyenletnek?',
    figure: EVEN_POWER_FIG,
    options: ['2 (x = 3 és x = −3)', '1 (x = 3)', '0', '4'],
    correctAnswer: 0,
    explanation: 'Az y = x⁴ grafikont az y = 81 egyenes két pontban metszi: x = ±⁴√81 = ±3. A ⁴√81 jel önmagában csak a 3-at jelenti.'
  }
];

export const NthRootQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId="g11-exp-n-edik-gyok-quiz"
      subtopicId="szamok-n-edik-gyoke"
      title="2. Számok n-edik gyöke – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: n-edik gyök definíció alapján, páros és páratlan gyökkitevő, kocka és gömb, átlagos évi változás."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • KVÍZ"
      questions={NTH_ROOT_QUESTIONS}
      cheatSheets={[
        {
          title: 'Definíció',
          items: ['ⁿ√a = b ⇔ bⁿ = a', 'n páros: a ≥ 0 és ⁿ√a ≥ 0', 'n páratlan: minden valós a; előjele = a előjele', 'ⁿ√0 = 0; √a = ²√a; ∛a „köbgyök”']
        },
        {
          title: 'Geometria',
          items: ['Kocka: A = 6a² ⇒ a = √(A/6)', 'Kocka: V = a³ ⇒ a = ∛V', 'Gömb: V = 4πR³/3 ⇒ R = ∛(3V/(4π))', 'Gömb felszíne: A = 4πR²']
        },
        {
          title: 'Átlagos változás',
          items: ['Pₙ = P₀ · (1 + r)ⁿ', '1 + r = ⁿ√(Pₙ / P₀)', 'r < 0: fogyás, r > 0: növekedés', 'Magyarország 2001–2021: ≈ −0,26% / év']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <NthRootMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <NthRootSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default NthRootQuiz;
