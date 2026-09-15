import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { SetOperationsMatcher } from './SetOperationsMatcher';
import { SetOperationsSorter } from './SetOperationsSorter';
import { Layers, Shapes, Calculator, Sparkles, Box, CheckCircle2 } from 'lucide-react';

interface SetOperationsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Metszet (A ∩ B)',
    icon: <Layers className="w-4 h-4 text-indigo-600" />,
    formula: 'A ∩ B = { x | x ∈ A ÉS x ∈ B }',
    note: 'A közös elemek összessége. Ha A ∩ B = ∅, a két halmaz diszjunkt.'
  },
  {
    id: 'c2',
    title: 'Unió (A ∪ B)',
    icon: <Sparkles className="w-4 h-4 text-purple-600" />,
    formula: 'A ∪ B = { x | x ∈ A VAGY x ∈ B }',
    note: 'Az összes elem egyesítése (a közös elemek csak egyszer szerepelnek).'
  },
  {
    id: 'c3',
    title: 'Különbség (A \\ B)',
    icon: <Shapes className="w-4 h-4 text-rose-600" />,
    formula: 'A \\ B = { x | x ∈ A ÉS x ∉ B }',
    note: 'A halmaz elemei a B-beli elemek elhagyásával. Vigyázz: A \\ B ≠ B \\ A!'
  },
  {
    id: 'c4',
    title: 'Szita-formula (2 halmazra)',
    icon: <Calculator className="w-4 h-4 text-emerald-600" />,
    formula: '|A ∪ B| = |A| + |B| - |A ∩ B|',
    note: 'A közös részt egyszer le kell vonni, mert mindkét halmazban szerepel.'
  }
];

const questions: Question[] = [
  // ==========================================
  // --- 1. SZINT: ALAPFOGALMAK ÉS JELÖLÉSEK (1-10) ---
  // ==========================================
  {
    id: 'q1-1',
    level: 1,
    question: 'Mit jelent két halmaz metszete (A ∩ B)?',
    options: [
      'Azon elemek halmaza, amelyek mindkét halmaznak elemei (x ∈ A és x ∈ B).',
      'Azon elemek halmaza, amelyek legalább az egyik halmaznak elemei.',
      'Azon elemek halmaza, amelyek csak az A halmazban vannak benne.',
      'Az A és B halmazok elemszámának szorzata.'
    ],
    correctAnswer: 'Azon elemek halmaza, amelyek mindkét halmaznak elemei (x ∈ A és x ∈ B).',
    explanation: 'A metszet a logikai ÉS kapcsolatnak felel meg: pontosan azok az elemek alkotják, amelyek mind az A, mind a B halmazba beletartoznak.',
    hint: 'Gondolj az útkereszteződésre: a közös útszakasz az, ahol mindkét út találkozik!',
    breakdown: [
      { label: 'Jelölés', value: 'A ∩ B (metszet)' },
      { label: 'Logikai feltétel', value: 'x ∈ A ÉS x ∈ B' },
      { label: 'Venn-diagram', value: 'A két kör közös átfedő része' }
    ]
  },
  {
    id: 'q1-2',
    level: 1,
    question: 'Mit jelent két halmaz uniója (A ∪ B)?',
    options: [
      'Azon elemek halmaza, amelyek legalább az egyik halmaznak elemei (x ∈ A vagy x ∈ B).',
      'Csak a két halmaz közös elemeinek halmaza.',
      'Azon elemek halmaza, amelyek egyik halmazban sincsenek benne.',
      'Az A halmaz elemei a B elemei nélkül.'
    ],
    correctAnswer: 'Azon elemek halmaza, amelyek legalább az egyik halmaznak elemei (x ∈ A vagy x ∈ B).',
    explanation: 'Az unió (egyesítés) a megengedő VAGY kapcsolat: minden olyan elem beletartozik, amelyik A-ban, B-ben, vagy mindkettőben megtalálható.',
    hint: 'Az unió egyesítést jelent: öntsük össze a két halmaz összes elemét egy közös tálba!',
    breakdown: [
      { label: 'Jelölés', value: 'A ∪ B (unió)' },
      { label: 'Logikai feltétel', value: 'x ∈ A VAGY x ∈ B' },
      { label: 'Fontos szabály', value: 'A közös elemeket csak egyszer írjuk le' }
    ]
  },
  {
    id: 'q1-3',
    level: 1,
    question: 'Mikor mondjuk két halmazra, hogy diszjunktak?',
    options: [
      'Ha nincs közös elemük, azaz metszetük az üres halmaz (A ∩ B = ∅).',
      'Ha pontosan ugyanazok az elemeik vannak.',
      'Ha az egyik halmaz részhalmaza a másiknak.',
      'Ha az elemszámuk megegyezik.'
    ],
    correctAnswer: 'Ha nincs közös elemük, azaz metszetük az üres halmaz (A ∩ B = ∅).',
    explanation: 'A diszjunkt halmazoknak egyetlen közös elemük sincs, a Venn-diagramon a két kör nem metszi egymást.',
    hint: 'Diszjunkt = különálló, független, nincs átfedés.',
    breakdown: [
      { label: 'Feltétel', value: 'A ∩ B = ∅' },
      { label: 'Példa', value: 'Páros számok és páratlan számok diszjunktak' }
    ]
  },
  {
    id: 'q1-4',
    level: 1,
    question: 'Mit jelent az A \\ B (különbség) halmazművelet?',
    options: [
      'Azon elemek halmaza, amelyek az A-nak elemei, de a B-nek nem.',
      'Azon elemek halmaza, amelyek a B-nek elemei, de az A-nak nem.',
      'A két halmaz összes elemének összege.',
      'A két halmaz közös elemei.'
    ],
    correctAnswer: 'Azon elemek halmaza, amelyek az A-nak elemei, de a B-nek nem.',
    explanation: 'Az A \\ B műveletnél az A halmaz elemeiből elhagyjuk mindazokat, amelyek a B-ben is szerepelnek.',
    hint: '„A mínusz B”: az A halmazból levonjuk a B elemeit.',
    breakdown: [
      { label: 'Jelölés', value: 'A \\ B' },
      { label: 'Logikai feltétel', value: 'x ∈ A és x ∉ B' }
    ]
  },
  {
    id: 'q1-5',
    level: 1,
    question: 'Igaz-e, hogy a halmazkivonás felcserélhető, azaz A \\ B = B \\ A minden halmazra?',
    options: [
      'Nem igaz, a halmazkivonás nem felcserélhető (A \\ B általában nem egyenlő B \\ A-val).',
      'Igen, mint minden alapművelet a matematikában.',
      'Csak akkor nem igaz, ha az egyik halmaz üres.',
      'Csak véges halmazokra igaz.'
    ],
    correctAnswer: 'Nem igaz, a halmazkivonás nem felcserélhető (A \\ B általában nem egyenlő B \\ A-val).',
    explanation: 'A halmazkivonás nem kommutatív: pl. {1, 2} \\ {2, 3} = {1}, míg {2, 3} \\ {1, 2} = {3}.',
    hint: 'Gondolj a számok kivonására: 5 - 2 = 3, de 2 - 5 = -3 (nem ugyanaz!).',
    breakdown: [
      { label: 'Példa A \\ B', value: '{1, 2} \\ {2, 3} = {1}' },
      { label: 'Példa B \\ A', value: '{2, 3} \\ {1, 2} = {3}' },
      { label: 'Következtetés', value: '{1} ≠ {3} ⟹ A \\ B ≠ B \\ A' }
    ]
  },
  {
    id: 'q1-6',
    level: 1,
    question: 'Mivel egyenlő egy halmaz metszete az üres halmazzal (A ∩ ∅)?',
    options: [
      '∅ (üres halmaz)',
      'A',
      '{0}',
      'Nem értelmezhető'
    ],
    correctAnswer: '∅ (üres halmaz)',
    explanation: 'Mivel az üres halmaznak egyetlen eleme sincs, semmilyen közös eleme nem lehet az A halmazzal, így az eredmény ∅.',
    hint: 'Hány olyan dolog létezik, ami benne van az üres halmazban?',
    breakdown: [
      { label: 'Művelet', value: 'A ∩ ∅ = ∅' },
      { label: 'Unió esetén', value: 'A ∪ ∅ = A lenne' }
    ]
  },
  {
    id: 'q1-7',
    level: 1,
    question: 'Mivel egyenlő egy halmaz uniója önmagával (A ∪ A)?',
    options: [
      'A',
      '2A',
      '∅',
      '{A, A}'
    ],
    correctAnswer: 'A',
    explanation: 'Az unió önmagával önmaga (idempotens tulajdonság), mivel az ismétlődő elemeket a halmazban csak egyszer vesszük figyelembe.',
    hint: 'Ha összeöntöd egy doboz golyóit ugyanolyan golyókkal, a különböző elemek köre nem változik.',
    breakdown: [
      { label: 'Azonosság', value: 'A ∪ A = A' },
      { label: 'Metszetnél is', value: 'A ∩ A = A' }
    ]
  },
  {
    id: 'q1-8',
    level: 1,
    question: 'Egy U alaphalmaz esetén mit jelent az A halmaz komplementere (Ā vagy A\')?',
    options: [
      'Az alaphalmaz azon elemeinek összessége, amelyek nem tartoznak az A halmazhoz (U \\ A).',
      'Az A halmaz elemeinek négyzete.',
      'Az A halmazzal diszjunkt bármely tetszőleges halmaz.',
      'Az A halmaz reciproka.'
    ],
    correctAnswer: 'Az alaphalmaz azon elemeinek összessége, amelyek nem tartoznak az A halmazhoz (U \\ A).',
    explanation: 'A komplementer a kiegészítő halmaz: mindaz, ami az alaphalmazból hiányzik ahhoz képest, ami A-ban van.',
    hint: 'Komplementer = kiegészítő. Mi kell még az egészhez (U-hoz)?',
    breakdown: [
      { label: 'Képlet', value: 'Ā = U \\ A' },
      { label: 'Azonosság', value: 'A ∪ Ā = U és A ∩ Ā = ∅' }
    ]
  },
  {
    id: 'q1-9',
    level: 1,
    question: 'Ha A ⊆ B (azaz A részhalmaza B-nek), akkor mivel egyenlő a metszetük (A ∩ B)?',
    options: [
      'A',
      'B',
      '∅',
      'U'
    ],
    correctAnswer: 'A',
    explanation: 'Ha A minden eleme benne van B-ben is, akkor a közös részük a teljes A halmaz.',
    hint: 'Gondolj egy kis dobozra egy nagyobb dobozban: mi a közös tartalmuk? A kis doboz!',
    breakdown: [
      { label: 'Feltétel', value: 'A ⊆ B' },
      { label: 'Metszet', value: 'A ∩ B = A' },
      { label: 'Unió', value: 'A ∪ B = B' }
    ]
  },
  {
    id: 'q1-10',
    level: 1,
    question: 'Melyik összefüggés érvényes a komplementer komplementerére ((Ā)̄)?',
    options: [
      '(Ā)̄ = A (kettős tagadás visszakapja az eredeti halmazt)',
      '(Ā)̄ = ∅',
      '(Ā)̄ = U',
      '(Ā)̄ = -A'
    ],
    correctAnswer: '(Ā)̄ = A (kettős tagadás visszakapja az eredeti halmazt)',
    explanation: 'A nem-nek a tagadása önmaga: ha kétszer vesszük a komplementert, visszajutunk az eredeti A halmazhoz.',
    hint: 'A nem igaz tagadása az igaz!',
    breakdown: [
      { label: 'Azonosság', value: 'Ā̄ = A' },
      { label: 'Jelentés', value: 'Kettős komplementer szabály' }
    ]
  },

  // ==========================================
  // --- 2. SZINT: KONKRÉT MŰVELETI FELADATOK (11-20) ---
  // ==========================================
  {
    id: 'q2-1',
    level: 2,
    question: 'Legyen A = {1, 2, 3, 4, 5} és B = {3, 4, 5, 6, 7}. Mi az A ∩ B halmaz?',
    options: [
      '{3, 4, 5}',
      '{1, 2, 6, 7}',
      '{1, 2, 3, 4, 5, 6, 7}',
      '{1, 2}'
    ],
    correctAnswer: '{3, 4, 5}',
    explanation: 'A közös elemek a 3, a 4 és az 5, mert ezek szerepelnek mindkét halmazban.',
    hint: 'Keresd meg azokat a számokat, amik mindkét felsorolásban ott vannak!',
    breakdown: [
      { label: 'A halmaz', value: '{1, 2, 3, 4, 5}' },
      { label: 'B halmaz', value: '{3, 4, 5, 6, 7}' },
      { label: 'Közös elemek', value: '3, 4, 5 ⟹ A ∩ B = {3, 4, 5}' }
    ]
  },
  {
    id: 'q2-2',
    level: 2,
    question: 'Legyen A = {2, 4, 6} és B = {1, 2, 3, 4}. Mi az A ∪ B halmaz?',
    options: [
      '{1, 2, 3, 4, 6}',
      '{2, 4}',
      '{1, 2, 2, 3, 4, 4, 6}',
      '{6}'
    ],
    correctAnswer: '{1, 2, 3, 4, 6}',
    explanation: 'Az unióba beletesszük mindkét halmaz összes elemét, a 2-t és 4-et csak egyszer kiírva: {1, 2, 3, 4, 6}.',
    hint: 'Egyesítsd az elemeket és töröld az ismétlődéseket!',
    breakdown: [
      { label: 'Összes elem', value: '1, 2, 3, 4, 6' },
      { label: 'Unió', value: 'A ∪ B = {1, 2, 3, 4, 6}' }
    ]
  },
  {
    id: 'q2-3',
    level: 2,
    question: 'Legyen A = {10, 20, 30, 40} és B = {30, 40, 50}. Mi az A \\ B halmaz?',
    options: [
      '{10, 20}',
      '{50}',
      '{30, 40}',
      '{10, 20, 50}'
    ],
    correctAnswer: '{10, 20}',
    explanation: 'Az A halmazból elhagyjuk a 30-at és 40-et (mivel B-ben is benne vannak), így megmarad a {10, 20}.',
    hint: 'A-ból húzd ki azokat a számokat, amik a B-ben is megtalálhatók!',
    breakdown: [
      { label: 'A elemei', value: '{10, 20, 30, 40}' },
      { label: 'B-beli közösök', value: '30, 40' },
      { label: 'A \\ B', value: '{10, 20}' }
    ]
  },
  {
    id: 'q2-4',
    level: 2,
    question: 'Ugyanezen halmazokra (A = {10, 20, 30, 40}, B = {30, 40, 50}) mennyi a B \\ A halmaz?',
    options: [
      '{50}',
      '{10, 20}',
      '{30, 40}',
      '∅'
    ],
    correctAnswer: '{50}',
    explanation: 'A B halmaz elemei {30, 40, 50}. Elhagyva belőle az A-ban szereplő 30-at és 40-et, csak az {50} marad.',
    hint: 'Most a B halmazból indulj ki, és abból vond le a közös elemeket!',
    breakdown: [
      { label: 'B elemei', value: '{30, 40, 50}' },
      { label: 'Levonva A elemei', value: '30, 40 levonva' },
      { label: 'B \\ A', value: '{50}' }
    ]
  },
  {
    id: 'q2-5',
    level: 2,
    question: 'Legyen U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} az alaphalmaz, és A a 10-nél nem nagyobb prímszámok halmaza ({2, 3, 5, 7}). Mi az Ā (A komplementere)?',
    options: [
      '{1, 4, 6, 8, 9, 10}',
      '{4, 6, 8, 9, 10}',
      '{1, 3, 5, 7, 9}',
      '{0, 1, 4, 6, 8, 9, 10}'
    ],
    correctAnswer: '{1, 4, 6, 8, 9, 10}',
    explanation: 'Az alaphalmazból elhagyjuk a 2, 3, 5, 7 prímeket. Figyelem: az 1 nem prím, így az 1 is beletartozik a komplementerbe!',
    hint: 'Ne feledd: az 1 nem prímszám és nem összetett szám, de benne van az alaphalmazban!',
    breakdown: [
      { label: 'Alaphalmaz U', value: '{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}' },
      { label: 'A prímek', value: '{2, 3, 5, 7}' },
      { label: 'Ā = U \\ A', value: '{1, 4, 6, 8, 9, 10}' }
    ]
  },
  {
    id: 'q2-6',
    level: 2,
    question: 'Legyen A a 10-nél kisebb páros számok halmaza ({0, 2, 4, 6, 8}) és B a 10-nél kisebb páratlan számok halmaza ({1, 3, 5, 7, 9}). Mi az A ∩ B?',
    options: [
      '∅ (üres halmaz)',
      '{0}',
      '{1, 2, 3, 4, 5, 6, 7, 8, 9}',
      '{2}'
    ],
    correctAnswer: '∅ (üres halmaz)',
    explanation: 'Egyetlen természetes szám sem lehet egyszerre páros és páratlan is, így a két halmaznak nincs közös eleme: A ∩ B = ∅.',
    hint: 'Létezik olyan egész szám, ami egyszerre páros és páratlan?',
    breakdown: [
      { label: 'A', value: 'Páros számok' },
      { label: 'B', value: 'Páratlan számok' },
      { label: 'Metszet', value: '∅ (diszjunkt halmazok)' }
    ]
  },
  {
    id: 'q2-7',
    level: 2,
    question: 'Ha |A| = 12, |B| = 8 és A ∩ B = ∅ (diszjunktak), mennyi az |A ∪ B|?',
    options: [
      '20',
      '12',
      '4',
      '96'
    ],
    correctAnswer: '20',
    explanation: 'Diszjunkt halmazok esetén |A ∪ B| = |A| + |B| = 12 + 8 = 20, mert nincs levonandó közös rész.',
    hint: 'Mivel nincs közös elemük, egyszerűen csak add össze a két darabszámot!',
    breakdown: [
      { label: 'Szita-formula', value: '|A ∪ B| = |A| + |B| - |A ∩ B|' },
      { label: 'Behelyettesítés', value: '12 + 8 - 0 = 20' }
    ]
  },
  {
    id: 'q2-8',
    level: 2,
    question: 'Legyen A = {x ∈ ℕ | x < 6} = {0, 1, 2, 3, 4, 5} és B = {x ∈ ℕ | 3 ≤ x ≤ 8} = {3, 4, 5, 6, 7, 8}. Mennyi az |A ∩ B|?',
    options: [
      '3',
      '2',
      '6',
      '9'
    ],
    correctAnswer: '3',
    explanation: 'A közös elemek: {3, 4, 5}, azaz pontosan 3 darab elem van a metszetben.',
    hint: 'Mely természetes számok kisebbek 6-nál ÉS legalább 3-ak?',
    breakdown: [
      { label: 'A ∩ B', value: '{3, 4, 5}' },
      { label: 'Elemszám |A ∩ B|', value: '3 db' }
    ]
  },
  {
    id: 'q2-9',
    level: 2,
    question: 'Ha A ⊆ B, mennyi az A \\ B halmaz?',
    options: [
      '∅ (üres halmaz)',
      'A',
      'B',
      'B \\ A'
    ],
    correctAnswer: '∅ (üres halmaz)',
    explanation: 'Mivel A minden eleme benne van B-ben is, ha A-ból levonjuk B összes elemét, semmi sem marad: A \\ B = ∅.',
    hint: 'Ha mindened megvan a másiknak is, és elvesszük azt, amid közös, mi marad neked?',
    breakdown: [
      { label: 'Feltétel', value: 'A minden eleme benne van B-ben' },
      { label: 'A \\ B', value: '∅' }
    ]
  },
  {
    id: 'q2-10',
    level: 2,
    question: 'Ha A = {1, 2, 3, 4} és B = {3, 4}, mennyi az (A \\ B) ∪ B halmaz?',
    options: [
      '{1, 2, 3, 4} (az eredeti A halmaz)',
      '{1, 2}',
      '{3, 4}',
      '∅'
    ],
    correctAnswer: '{1, 2, 3, 4} (az eredeti A halmaz)',
    explanation: 'A \\ B = {1, 2}. Ezt egyesítve B-vel ({3, 4}): {1, 2} ∪ {3, 4} = {1, 2, 3, 4} = A.',
    hint: 'Számold ki először a zárójelet: A \\ B, majd egyesítsd B-vel!',
    breakdown: [
      { label: '1. Lépés', value: 'A \\ B = {1, 2}' },
      { label: '2. Lépés', value: '{1, 2} ∪ {3, 4} = {1, 2, 3, 4} = A' }
    ]
  },

  // ==========================================
  // --- 3. SZINT: SZITA-FORMULA ÉS FELVÉTELI FELADATOK (21-30) ---
  // ==========================================
  {
    id: 'q3-1',
    level: 3,
    question: 'Egy 28 fős osztályban mindenki sportol valamit. 18-an fociznak és 16-an kosaraznak. Hányan űzik mindkét sportágat?',
    options: [
      '6 diák',
      '8 diák',
      '10 diák',
      '4 diák'
    ],
    correctAnswer: '6 diák',
    explanation: 'A Szita-formula szerint: |F ∩ K| = |F| + |K| - |F ∪ K| = 18 + 16 - 28 = 34 - 28 = 6 diák.',
    hint: 'Add össze a két létszámot (18 + 16 = 34), és nézd meg, mennyivel lépi túl a teljes osztálylétszámot (28)!',
    breakdown: [
      { label: 'Focisták |F|', value: '18 fő' },
      { label: 'Kosarasok |K|', value: '16 fő' },
      { label: 'Összesen |F ∪ K|', value: '28 fő' },
      { label: 'Közös rész |F ∩ K|', value: '18 + 16 - 28 = 6 fő' }
    ]
  },
  {
    id: 'q3-2',
    level: 3,
    question: 'Az előző feladat alapján (18 focista, 16 kosaras, 6 mindkettő) hányan vannak, akik CSAK fociznak?',
    options: [
      '12 diák',
      '18 diák',
      '10 diák',
      '6 diák'
    ],
    correctAnswer: '12 diák',
    explanation: 'A csak focizók száma: |F \\ K| = |F| - |F ∩ K| = 18 - 6 = 12 diák.',
    hint: 'A 18 focistából vond le azokat a 6-ot, akik kosaraznak is!',
    breakdown: [
      { label: 'Képlet', value: '|F \\ K| = |F| - |F ∩ K|' },
      { label: 'Számolás', value: '18 - 6 = 12 fő' }
    ]
  },
  {
    id: 'q3-3',
    level: 3,
    question: 'Egy 32 fős osztályban 20-an tanulnak angolul, 15-en németül, és 5-en EGYIK nyelvet sem tanulják. Hányan tanulják mindkét nyelvet?',
    options: [
      '8 diák',
      '5 diák',
      '3 diák',
      '10 diák'
    ],
    correctAnswer: '8 diák',
    explanation: 'Mivel 5-en nem tanulnak nyelvet, a nyelvet tanulók uniója: |A ∪ N| = 32 - 5 = 27 fő. Ekkor |A ∩ N| = 20 + 15 - 27 = 35 - 27 = 8 diák.',
    hint: 'Először vond le a 32-ből azt az 5-öt, aki nem tanul semmit! Az lesz a valódi unió (|A ∪ N| = 27).',
    breakdown: [
      { label: 'Nyelvet tanulók |A ∪ N|', value: '32 - 5 = 27 fő' },
      { label: 'Közös |A ∩ N|', value: '20 + 15 - 27 = 8 fő' }
    ]
  },
  {
    id: 'q3-4',
    level: 3,
    question: 'Ha |A| = 25, |B| = 20 és |A ∪ B| = 35, mennyi a csak a B halmazba tartozó elemek száma (|B \\ A|)?',
    options: [
      '10 elem',
      '15 elem',
      '5 elem',
      '20 elem'
    ],
    correctAnswer: '10 elem',
    explanation: 'A metszet: |A ∩ B| = 25 + 20 - 35 = 10. Ekkor |B \\ A| = |B| - |A ∩ B| = 20 - 10 = 10 elem.',
    hint: 'Számold ki először a közös részt (|A ∩ B| = 10), majd vond le a B-ből!',
    breakdown: [
      { label: '1. Metszet', value: '|A ∩ B| = 25 + 20 - 35 = 10' },
      { label: '2. Csak B', value: '|B \\ A| = 20 - 10 = 10' }
    ]
  },
  {
    id: 'q3-5',
    level: 3,
    question: 'Egy táborban 40 gyerek van. 22-en tudnak úszni, 25-en tudnak biciklizni. Minimum hány gyerek tud mind úszni, mind biciklizni?',
    options: [
      '7 gyerek',
      '0 gyerek',
      '22 gyerek',
      '15 gyerek'
    ],
    correctAnswer: '7 gyerek',
    explanation: 'A metszet akkor a legkisebb, ha minden gyerek tud legalább valamit (|Ú ∪ B| legfeljebb 40). Ekkor |Ú ∩ B| ≥ 22 + 25 - 40 = 47 - 40 = 7 gyerek.',
    hint: '22 + 25 = 47, ami 7-tel több mint a teljes 40 fős létszám. Ez a 7 ember legalább elkerülhetetlenül a közös részben van!',
    breakdown: [
      { label: 'Összeg', value: '22 + 25 = 47' },
      { label: 'Maximális unió', value: '40 fő' },
      { label: 'Minimális metszet', value: '47 - 40 = 7 fő' }
    ]
  },
  {
    id: 'q3-6',
    level: 3,
    question: 'Ugyanezen adatok mellett (40 gyerek, 22 úszik, 25 biciklizik) maximum hányan tudhatnak mindkettőt?',
    options: [
      '22 gyerek',
      '25 gyerek',
      '40 gyerek',
      '7 gyerek'
    ],
    correctAnswer: '22 gyerek',
    explanation: 'A metszet legfeljebb akkora lehet, mint a kisebb halmaz elemszáma: min(22, 25) = 22 gyerek (ha minden úszó tud biciklizni is).',
    hint: 'Nem lehet több közös ember, mint ahány úszó összesen van a táborban!',
    breakdown: [
      { label: 'Felső korlát', value: '|A ∩ B| ≤ min(|A|, |B|)' },
      { label: 'Eredmény', value: 'min(22, 25) = 22 fő' }
    ]
  },
  {
    id: 'q3-7',
    level: 3,
    question: 'Az 1-től 100-ig terjedő egész számok között hány olyan szám van, amely 3-mal VAGY 5-tel osztható?',
    options: [
      '47 szám',
      '53 szám',
      '33 szám',
      '20 szám'
    ],
    correctAnswer: '47 szám',
    explanation: '3-mal osztható: [100/3] = 33 db. 5-tel osztható: [100/5] = 20 db. Mindkettővel (15-tel) osztható: [100/15] = 6 db. Szita: 33 + 20 - 6 = 47 db.',
    hint: 'Számold ki külön a 3-mal, külön az 5-tel oszthatókat, majd vond le a 15-tel osztható közösöket!',
    breakdown: [
      { label: '3-mal osztható |A|', value: '33 db (3, 6, ..., 99)' },
      { label: '5-tel osztható |B|', value: '20 db (5, 10, ..., 100)' },
      { label: '15-tel osztható |A ∩ B|', value: '6 db (15, 30, 45, 60, 75, 90)' },
      { label: 'Szita-formula', value: '33 + 20 - 6 = 47 db' }
    ]
  },
  {
    id: 'q3-8',
    level: 3,
    question: 'Az 1-től 100-ig terjedő egész számok között hány olyan szám van, amely SEM 3-mal, SEM 5-tel NEM osztható?',
    options: [
      '53 szám',
      '47 szám',
      '50 szám',
      '40 szám'
    ],
    correctAnswer: '53 szám',
    explanation: 'Mivel 47 szám osztható 3-mal vagy 5-tel, a komplementer (egyikkel sem osztható): 100 - 47 = 53 szám.',
    hint: 'A 100-ból vond le az előző feladat eredményét (a 47-et)!',
    breakdown: [
      { label: 'Összes szám', value: '100 db' },
      { label: 'Legalább eggyel osztható', value: '47 db' },
      { label: 'Egyikkel sem osztható', value: '100 - 47 = 53 db' }
    ]
  },
  {
    id: 'q3-9',
    level: 3,
    question: 'Ha |A| = 15, |B| = 12, |C| = 10, és a három halmaz páronként diszjunkt (nincs semmilyen közös elemük), mennyi az |A ∪ B ∪ C|?',
    options: [
      '37',
      '27',
      '15',
      '0'
    ],
    correctAnswer: '37',
    explanation: 'Páronként diszjunkt halmazok esetén az unió elemszáma az egyes elemszámok összege: 15 + 12 + 10 = 37.',
    hint: 'Mivel semmilyen átfedés nincs köztük, egyszerűen add össze a 3 számot!',
    breakdown: [
      { label: 'Számolás', value: '15 + 12 + 10 = 37' }
    ]
  },
  {
    id: 'q3-10',
    level: 3,
    question: 'Egy iskolai vetélkedőn 50 diák vett részt. Matematikából 30-an, fizikából 25-en szereztek dicséretet. Ha 5 diák egyikből sem kapott dicséretet, hányan kaptak CSAK fizikából dicséretet?',
    options: [
      '15 diák',
      '10 diák',
      '25 diák',
      '20 diák'
    ],
    correctAnswer: '15 diák',
    explanation: 'A dicséretet szerzők: 50 - 5 = 45 fő. Metszet (mindkettő): 30 + 25 - 45 = 10 fő. Csak fizikából: |F \\ M| = 25 - 10 = 15 fő.',
    hint: '1. Dicséretesek uniója: 50 - 5 = 45. 2. Közös: 30 + 25 - 45 = 10. 3. Csak fizika: 25 - 10 = 15.',
    breakdown: [
      { label: '1. Unió |M ∪ F|', value: '50 - 5 = 45 fő' },
      { label: '2. Mindkettő |M ∩ F|', value: '30 + 25 - 45 = 10 fő' },
      { label: '3. Csak fizika |F \\ M|', value: '25 - 10 = 15 fő' }
    ]
  }
];

export const SetOperationsQuiz: React.FC<SetOperationsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="3. Műveletek halmazokkal – Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: metszet (∩), unió (∪), különbség (\\), komplementer (A'), Szita-formula és szöveges felvételi feladatok"
      questions={questions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-8-szamok-betuk-halmaz-muveletek-quiz"
      pdfFilename="8_osztaly_muveletek_halmazokkal_kviz.pdf"
      badgeColor="indigo"
      matcherComponent={<SetOperationsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<SetOperationsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      cheatSheetCards={cheatSheetCards}
    />
  );
};

export default SetOperationsQuiz;
