import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { Chapter5SummaryMatcher } from './Chapter5SummaryMatcher';
import { Chapter5SummarySorter } from './Chapter5SummarySorter';

interface Chapter5SummaryQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-2d-formulas',
    title: '1. Síkidomok Képletei (2D)',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Téglalap:</strong> K = 2(a + b), T = a · b</div>
        <div><strong>Négyzet:</strong> K = 4a, T = a²</div>
        <div><strong>Háromszög:</strong> T = (a · m_a) / 2</div>
        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
          Derékszögű háromszög: T = (a · b) / 2
        </div>
      </div>
    )
  },
  {
    id: 'cs-units-ladder',
    title: '2. Mértékegység Váltószámok',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>1D Hosszúság:</strong> 10-es váltószám (1 m = 10 dm = 100 cm)</div>
        <div><strong>2D Terület:</strong> 100-as váltószám (1 m² = 100 dm², 1 ha = 100 a)</div>
        <div><strong>3D Térfogat:</strong> 1000-es váltószám (1 m³ = 1000 dm³)</div>
        <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
          Űrtartalom: 1 dm³ = 1 liter, 1 cm³ = 1 ml
        </div>
      </div>
    )
  },
  {
    id: 'cs-3d-solids',
    title: '3. Térbeli Testek (3D)',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Kocka:</strong> A = 6a², V = a³</div>
        <div><strong>Téglatest:</strong> A = 2(ab + bc + ac), V = abc</div>
        <div><strong>Egyenes hasáb:</strong> A = 2T_a + T_p, V = T_a · m</div>
        <div className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
          Euler-tétel: C + L = É + 2
        </div>
      </div>
    )
  },
  {
    id: 'cs-practical-rules',
    title: '4. Gyakorlati Szabályok',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Nyitott test (5 lap):</strong> A = ab + 2ac + 2bc</div>
        <div><strong>Szobafestés:</strong> Falak 2(a+b)m - nyílászárók (+ mennyezet)</div>
        <div><strong>Él k-szorosra nő:</strong> Felszín k²-szeres, Térfogat k³-szoros!</div>
        <div className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">
          Vízszintemelkedés: V_test = T_alap · Δm
        </div>
      </div>
    )
  }
];

const questions: Question[] = [
  // --- 1. SZINT: ÁTFOGÓ ALAPISMERETEK ÉS KÉPLETEK (1-10) ---
  {
    id: 'q1',
    level: 1,
    question: 'Mi a téglalap kerületének helyes képlete, ha oldalai a és b?',
    options: [
      'K = 2 · (a + b)',
      'K = a · b',
      'K = 4 · a',
      'K = a + b'
    ],
    correctAnswer: 'K = 2 · (a + b)',
    explanation: 'A téglalapnak 2 darab a és 2 darab b oldala van: K = 2a + 2b = 2(a + b).'
  },
  {
    id: 'q2',
    level: 1,
    question: 'Hogyan számítjuk ki az a és b oldalú téglalap területét?',
    options: [
      'T = a · b',
      'T = 2 · (a + b)',
      'T = a²',
      'T = (a · b) / 2'
    ],
    correctAnswer: 'T = a · b',
    explanation: 'A téglalap területe a két szomszédos oldalának szorzata: T = a · b.'
  },
  {
    id: 'q3',
    level: 1,
    question: 'Mekkora az a = 6 cm és b = 4 cm befogójú derékszögű háromszög területe?',
    options: [
      '12 cm²',
      '24 cm²',
      '10 cm²',
      '20 cm²'
    ],
    correctAnswer: '12 cm²',
    explanation: 'T = (a · b) / 2 = (6 · 4) / 2 = 24 / 2 = 12 cm².'
  },
  {
    id: 'q4',
    level: 1,
    question: 'Mi a kocka felszínének (A) kiszámítási képlete, ha egy éle a?',
    options: [
      'A = 6 · a²',
      'A = a³',
      'A = 4 · a²',
      'A = 12 · a'
    ],
    correctAnswer: 'A = 6 · a²',
    explanation: 'A kockát 6 egybevágó négyzetlap határolja, egy lap területe a², így a teljes felszín A = 6a².'
  },
  {
    id: 'q5',
    level: 1,
    question: 'Mi a kocka térfogatának (V) képlete?',
    options: [
      'V = a³',
      'V = 6 · a²',
      'V = 3 · a',
      'V = a²'
    ],
    correctAnswer: 'V = a³',
    explanation: 'V = a · a · a = a³.'
  },
  {
    id: 'q6',
    level: 1,
    question: 'Hogyan számítjuk ki az a, b, c élű téglatest térfogatát?',
    options: [
      'V = a · b · c',
      'V = 2 · (ab + bc + ac)',
      'V = 4 · (a + b + c)',
      'V = a + b + c'
    ],
    correctAnswer: 'V = a · b · c',
    explanation: 'A téglatest térfogata a három különböző irányú élének szorzata: V = a · b · c = T_alap · m.'
  },
  {
    id: 'q7',
    level: 1,
    question: 'Mit állít az Euler-féle poliédertétel konvex poliéderekre a csúcsok (C), lapok (L) és élek (É) számára?',
    options: [
      'C + L = É + 2',
      'C + É = L + 2',
      'L + É = C + 2',
      'C + L + É = 2'
    ],
    correctAnswer: 'C + L = É + 2',
    explanation: 'Bármely konvex poliéderre igaz, hogy a csúcsok és lapok számának összege 2-vel több az élek számánál.'
  },
  {
    id: 'q8',
    level: 1,
    question: 'Hány köbdeciméter (dm³) pontosan 1 liter?',
    options: [
      '1 dm³',
      '10 dm³',
      '100 dm³',
      '0,1 dm³'
    ],
    correctAnswer: '1 dm³',
    explanation: 'A liter definíció szerint pontosan 1 dm³ folyadéknak felel meg: 1 dm³ = 1 liter.'
  },
  {
    id: 'q9',
    level: 1,
    question: 'Mi a váltószám a szomszédos területi mértékegységek (pl. m² → dm²) között?',
    options: [
      '100',
      '10',
      '1000',
      '60'
    ],
    correctAnswer: '100',
    explanation: 'Mivel 1 m = 10 dm, ezért 1 m² = 10 · 10 = 100 dm².'
  },
  {
    id: 'q10',
    level: 1,
    question: 'Mi a váltószám a szomszédos térfogat-mértékegységek (pl. dm³ → cm³) között?',
    options: [
      '1000',
      '100',
      '10',
      '10 000'
    ],
    correctAnswer: '1000',
    explanation: 'Mivel 1 dm = 10 cm, ezért 1 dm³ = 10 · 10 · 10 = 1000 cm³.'
  },

  // --- 2. SZINT: SZÁMÍTÁSI FELADATOK ÉS ÁTVÁLTÁSOK (11-20) ---
  {
    id: 'q11',
    level: 2,
    question: 'Hány méter 3,5 km és hány kg 2,5 tonna?',
    options: [
      '3500 m és 2500 kg',
      '350 m és 250 kg',
      '35 000 m és 25 000 kg',
      '3500 m és 250 kg'
    ],
    correctAnswer: '3500 m és 2500 kg',
    explanation: '1 km = 1000 m → 3,5 km = 3500 m. 1 t = 1000 kg → 2,5 t = 2500 kg.'
  },
  {
    id: 'q12',
    level: 2,
    question: 'Hány perc a 2,5 óra?',
    options: [
      '150 perc',
      '120 perc',
      '250 perc',
      '130 perc'
    ],
    correctAnswer: '150 perc',
    explanation: '2,5 · 60 = 150 perc.'
  },
  {
    id: 'q13',
    level: 2,
    question: 'Egy ötszög oldalai: 3 cm, 4 cm, 5 cm, 6 cm és 7 cm. Mekkora a kerülete?',
    options: [
      '25 cm',
      '20 cm',
      '30 cm',
      '24 cm'
    ],
    correctAnswer: '25 cm',
    explanation: 'K = 3 + 4 + 5 + 6 + 7 = 25 cm.'
  },
  {
    id: 'q14',
    level: 2,
    question: 'Egy négyzet kerülete 24 cm. Mekkora a területe?',
    options: [
      '36 cm²',
      '48 cm²',
      '24 cm²',
      '16 cm²'
    ],
    correctAnswer: '36 cm²',
    explanation: 'a = 24 : 4 = 6 cm. T = 6² = 36 cm².'
  },
  {
    id: 'q15',
    level: 2,
    question: 'Egy téglalap alakú szántóföld méretei 200 m × 300 m. Hány hektár (ha) a területe?',
    options: [
      '6 ha',
      '60 ha',
      '0,6 ha',
      '600 ha'
    ],
    correctAnswer: '6 ha',
    explanation: 'T = 200 · 300 = 60 000 m². Mivel 1 ha = 10 000 m², így 60 000 : 10 000 = 6 ha.'
  },
  {
    id: 'q16',
    level: 2,
    question: 'Mekkora a 2 cm, 3 cm és 4 cm élű téglatest felszíne?',
    options: [
      '52 cm²',
      '24 cm²',
      '48 cm²',
      '26 cm²'
    ],
    correctAnswer: '52 cm²',
    explanation: 'A = 2 · (2·3 + 2·4 + 3·4) = 2 · (6 + 8 + 12) = 2 · 26 = 52 cm².'
  },
  {
    id: 'q17',
    level: 2,
    question: 'Egy kocka teljes felszíne 96 cm². Milyen hosszú egy éle?',
    options: [
      '4 cm',
      '6 cm',
      '16 cm',
      '8 cm'
    ],
    correctAnswer: '4 cm',
    explanation: '1 lap területe 96 : 6 = 16 cm², amiből a = √16 = 4 cm.'
  },
  {
    id: 'q18',
    level: 2,
    question: 'Egy kocka térfogata 125 cm³. Hány centiméter az éle?',
    options: [
      '5 cm',
      '25 cm',
      '15 cm',
      '10 cm'
    ],
    correctAnswer: '5 cm',
    explanation: '5 · 5 · 5 = 125, így a = 5 cm.'
  },
  {
    id: 'q19',
    level: 2,
    question: 'Egy akvárium élei: 40 cm × 25 cm × 30 cm. Hány liter víz fér bele tele töltve?',
    options: [
      '30 liter',
      '300 liter',
      '3 liter',
      '120 liter'
    ],
    correctAnswer: '30 liter',
    explanation: 'Deciméterben: 4 dm · 2,5 dm · 3 dm = 30 dm³ = 30 liter.'
  },
  {
    id: 'q20',
    level: 2,
    question: 'Hány csúcsa és hány lapja van egy 5-oldalú egyenes hasábnak?',
    options: [
      '10 csúcsa és 7 lapja',
      '10 csúcsa és 5 lapja',
      '15 csúcsa és 7 lapja',
      '5 csúcsa és 6 lapja'
    ],
    correctAnswer: '10 csúcsa és 7 lapja',
    explanation: 'n-oldalú hasábnál C = 2n = 10, L = n + 2 = 7 (2 alaplap + 5 palástlap).'
  },

  // --- 3. SZINT: TÉMAZÁRÓ SZINTŰ ÖSSZETETT FELADATOK (21-30) ---
  {
    id: 'q21',
    level: 3,
    question: 'Egy felül nyitott téglatest alakú doboz élei: 3 cm × 4 cm alaplap, 5 cm magasság. Mekkora a külső felülete (5 lap)?',
    options: [
      '82 cm²',
      '94 cm²',
      '70 cm²',
      '60 cm²'
    ],
    correctAnswer: '82 cm²',
    explanation: 'Alaplap: 3 · 4 = 12 cm². Palást (4 fal): 2 · (3·5 + 4·5) = 70 cm². Összesen 5 lap: 12 + 70 = 82 cm².'
  },
  {
    id: 'q22',
    level: 3,
    question: 'Egy 4 m × 5 m-es, 3 m belmagasságú szoba falait és mennyezetét festjük. A nyílászárók összterülete 6 m². Mekkora a festendő felület?',
    options: [
      '68 m²',
      '74 m²',
      '48 m²',
      '54 m²'
    ],
    correctAnswer: '68 m²',
    explanation: 'Bruttó falak: 2(4+5) · 3 = 54 m². Nettó falak: 54 - 6 = 48 m². Mennyezet: 4 · 5 = 20 m². Összesen: 48 + 20 = 68 m².'
  },
  {
    id: 'q23',
    level: 3,
    question: 'A 68 m²-es felületet 1 rétegben festjük, 10 m²/l kiadósságú festékkel. A festéket 2,5 literes dobozokban árulják. Hány dobozt kell venni?',
    options: [
      '3 dobozt',
      '2 dobozt',
      '4 dobozt',
      '2,72 dobozt'
    ],
    correctAnswer: '3 dobozt',
    explanation: 'Festékigény: 68 : 10 = 6,8 liter. Dobozok száma: 6,8 : 2,5 = 2,72 → felfelé kerekítve 3 doboz szükséges.'
  },
  {
    id: 'q24',
    level: 3,
    question: 'Egy kocka éleit a 2-szeresére növeljük. Hogyan változik meg a felszíne és a térfogata?',
    options: [
      'A felszín 4-szeresére, a térfogat 8-szorosára nő',
      'Mindkettő 2-szeresére nő',
      'A felszín 2-szeresére, a térfogat 4-szeresére nő',
      'Mindkettő 8-szorosára nő'
    ],
    correctAnswer: 'A felszín 4-szeresére, a térfogat 8-szorosára nő',
    explanation: 'A felszín területi jellegű (2² = 4-szeres), a térfogat köbös jellegű (2³ = 8-szoros növekedés).'
  },
  {
    id: 'q25',
    level: 3,
    question: 'Két a = 2 cm élű kockát összeragasztunk. Mekkora a kapott test felszíne és térfogata?',
    options: [
      'A = 40 cm², V = 16 cm³',
      'A = 48 cm², V = 16 cm³',
      'A = 40 cm², V = 8 cm³',
      'A = 36 cm², V = 12 cm³'
    ],
    correctAnswer: 'A = 40 cm², V = 16 cm³',
    explanation: 'Felszín: 10 lap marad kívül → 10 · 4 = 40 cm². Térfogat: 8 + 8 = 16 cm³.'
  },
  {
    id: 'q26',
    level: 3,
    question: 'Egy 5 m × 4 m-es, 2 m mély medencét percenként 40 liter vízzel töltenek. Hány óra alatt telik meg teljesen?',
    options: [
      '16,67 óra (1000 perc)',
      '40 óra',
      '20 óra',
      '10 óra'
    ],
    correctAnswer: '16,67 óra (1000 perc)',
    explanation: 'V = 5 · 4 · 2 = 40 m³ = 40 000 liter. Töltési idő: 40 000 : 40 = 1000 perc = 16 óra 40 perc ≈ 16,67 óra.'
  },
  {
    id: 'q27',
    level: 3,
    question: 'Egy téglatest térfogata 180 cm³, alapjának élei a = 5 cm és b = 4 cm. Milyen magas a doboz?',
    options: [
      '9 cm',
      '10 cm',
      '8 cm',
      '6 cm'
    ],
    correctAnswer: '9 cm',
    explanation: 'T_alap = 5 · 4 = 20 cm². Magasság: m = 180 : 20 = 9 cm.'
  },
  {
    id: 'q28',
    level: 3,
    question: 'Egy 15 cm × 10 cm alapterületű mérőedényben a vízszint 4 cm-rel emelkedik egy kő bemerítésekor. Mekkora a kő térfogata?',
    options: [
      '600 cm³',
      '150 cm³',
      '300 cm³',
      '400 cm³'
    ],
    correctAnswer: '600 cm³',
    explanation: 'V = T_alap · Δm = (15 · 10) · 4 = 150 · 4 = 600 cm³.'
  },
  {
    id: 'q29',
    level: 3,
    question: '20 m² felület burkolásához 10% vágási ráhagyásra van szükség. A csempe 1 m²-es dobozokban kapható. Hány doboz kell?',
    options: [
      '22 doboz',
      '20 doboz',
      '21 doboz',
      '25 doboz'
    ],
    correctAnswer: '22 doboz',
    explanation: '20 · 1,10 = 22 m², így 22 doboz csempe kell.'
  },
  {
    id: 'q30',
    level: 3,
    question: 'Egy tömör kocka egyik sarkából kivágunk egy kisebb kockát. Mi történik a felszínnel és térfogattal?',
    options: [
      'A felszín változatlan marad, a térfogat csökken',
      'Mindkettő csökken',
      'A felszín nő, a térfogat csökken',
      'Mindkettő változatlan marad'
    ],
    correctAnswer: 'A felszín változatlan marad, a térfogat csökken',
    explanation: 'A kivágással anyag távozik (térfogat csökken), de az elvesztett 3 külső lapot pótolja a 3 új belső lap a lépcsőben (felszín változatlan).'
  }
];

export const Chapter5SummaryQuiz: React.FC<Chapter5SummaryQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Összefoglaló kvíz"
      subtitle="A teljes V. fejezet átfogó ellenőrzése: kerület, terület, felszín, térfogat és gyakorlati számítások 3 szinten"
      topicBadge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      badgeText="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="slate"
      topicId="g6-chapter5-summary-quiz"
      topicTitle="Összefoglalás"
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={Chapter5SummaryMatcher as any}
      sorterComponent={Chapter5SummarySorter as any}
      onBack={onBack}
      onOpenMatcher={onOpenMatcher}
      onOpenSorter={onOpenSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default Chapter5SummaryQuiz;
