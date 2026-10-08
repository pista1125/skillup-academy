import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { DivisorsMultiplesMatcher } from './DivisorsMultiplesMatcher';
import { DivisorsMultiplesSorter } from './DivisorsMultiplesSorter';
import {
  Calculator,
  Binary,
  Hash,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  HelpCircle,
  Layers,
  Table
} from 'lucide-react';

interface DivisorsMultiplesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Osztópárok és Keresési Határ (√n)',
    icon: <Table className="w-4 h-4 text-cyan-600" />,
    formula: 'd · d′ = n • Elég √n-ig keresni az osztókat!',
    note: 'Ha egy számot nem oszt semmilyen 1-nél nagyobb egész √n-ig, akkor a szám prím. Ha találunk osztót d ≤ √n, annak párja d′ ≥ √n.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="5" y="8" width="70" height="34" rx="8" className="fill-cyan-100 stroke-cyan-300 dark:fill-cyan-950/60 dark:stroke-cyan-800" />
        <text x="12" y="29" className="text-[10px] font-mono font-bold fill-cyan-900 dark:fill-cyan-200">36 → √36 = 6</text>
        <rect x="85" y="8" width="70" height="34" rx="8" className="fill-blue-100 stroke-blue-300 dark:fill-blue-950/60 dark:stroke-blue-800" />
        <text x="92" y="29" className="text-[10px] font-mono font-bold fill-blue-900 dark:fill-blue-200">1..6 vizsgálat</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Az Osztók Száma Képlet: d(n)',
    icon: <Calculator className="w-4 h-4 text-indigo-600" />,
    formula: 'd(n) = (α₁ + 1)(α₂ + 1)...(αₖ + 1)',
    note: 'A prímtényezős felbontás kitevőihez 1-et adunk és összeszorozzuk őket. Minden prímtényező 0, 1, ..., α hatványon szerepelhet.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="140" height="34" rx="8" className="fill-indigo-100 stroke-indigo-300 dark:fill-indigo-950/60 dark:stroke-indigo-800" />
        <text x="18" y="29" className="text-[10px] font-mono font-bold fill-indigo-900 dark:fill-indigo-200">72 = 2³·3² → 4·3 = 12</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Négyzetszámok: Páratlan Sok Osztó',
    icon: <Sparkles className="w-4 h-4 text-amber-600" />,
    formula: 'd(n) páratlan ⟺ n négyzetszám',
    note: 'A normál számok osztói párokba állíthatók (d · d′ = n, ahol d ≠ d′). Négyzetszámoknál a gyök önmagával alkot párt (k · k = n), így az osztók száma páratlan!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="65" height="34" rx="8" className="fill-amber-100 stroke-amber-300 dark:fill-amber-950/60 dark:stroke-amber-800" />
        <text x="16" y="29" className="text-[10px] font-mono font-bold fill-amber-900 dark:fill-amber-200">25: 1, 5, 25</text>
        <rect x="85" y="8" width="65" height="34" rx="8" className="fill-emerald-100 stroke-emerald-300 dark:fill-emerald-950/60 dark:stroke-emerald-800" />
        <text x="91" y="29" className="text-[10px] font-mono font-bold fill-emerald-900 dark:fill-emerald-200">3 db (páratlan)</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Különleges Esetek: 2, 3 és 4 Osztó',
    icon: <Binary className="w-4 h-4 text-purple-600" />,
    formula: '2 osztó: p (prím) • 3 osztó: p² • 4 osztó: p³ vagy p·q',
    note: 'Csak és kizárólag a prímszámok négyzetének van pontosan 3 pozitív osztója: 1, p és p² (pl. 4, 9, 25, 49, 121).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="65" height="34" rx="8" className="fill-purple-100 stroke-purple-300 dark:fill-purple-950/60 dark:stroke-purple-800" />
        <text x="16" y="29" className="text-[10px] font-mono font-bold fill-purple-900 dark:fill-purple-200">9 = 3² (3 db)</text>
        <rect x="85" y="8" width="65" height="34" rx="8" className="fill-rose-100 stroke-rose-300 dark:fill-rose-950/60 dark:stroke-rose-800" />
        <text x="91" y="29" className="text-[10px] font-mono font-bold fill-rose-900 dark:fill-rose-200">6 = 2·3 (4 db)</text>
      </svg>
    )
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Osztópárok és Keresési Határ (√n)',
    subtitle: 'Osztópárok felírása, hiányzó párok megtalálása és a vizsgálati felső határ kiszámítása',
    range: '1 - 10. feladat',
    focus: 'Közvetlen osztópár-képzés és gazdaságos keresési határ alkalmazása',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Melyik az 5 osztópárja a 45-ben?',
        options: ['9', '8', '15', '7'],
        correctAnswer: '9',
        explanation: 'Az osztópárok szorzata maga a szám: 5 · d′ = 45. Mivel 45 : 5 = 9, az 5 osztópárja a 9 (5 · 9 = 45).',
        breakdown: [
          { label: 'Szorzat', value: '5 · d′ = 45' },
          { label: 'Osztás', value: '45 : 5 = 9' },
          { label: 'Osztópár', value: '(5; 9)' }
        ],
        hint: 'Oszd el a 45-öt 5-tel!'
      },
      {
        id: 'q1-2',
        prompt: 'Hány pozitív egész osztója van a 12-nek?',
        options: ['6', '4', '5', '8'],
        correctAnswer: '6',
        explanation: 'A 12 osztópárjai: (1; 12), (2; 6), (3; 4). Összesen 6 osztója van: 1, 2, 3, 4, 6, 12.',
        breakdown: [
          { label: 'Osztópárok', value: '1·12 = 12, 2·6 = 12, 3·4 = 12' },
          { label: 'Osztók halmaza', value: '{1, 2, 3, 4, 6, 12}' },
          { label: 'Darabszám', value: '6 osztó' }
        ],
        hint: 'Írd fel párokban a szorzatokat, amelyek 12-t adnak!'
      },
      {
        id: 'q1-3',
        prompt: 'Legfeljebb meddig kell vizsgálni az egész számokat, hogy megtaláljuk az 50 összes osztóját?',
        options: ['7-ig', '10-ig', '25-ig', '5-ig'],
        correctAnswer: '7-ig',
        explanation: 'Elég a szám négyzetgyökéig vizsgálódni: √50 ≈ 7,07. Mivel 7² = 49 ≤ 50 és 8² = 64 > 50, a legnagyobb vizsgálandó egész a 7.',
        breakdown: [
          { label: 'Keresési elv', value: 'd ≤ √n' },
          { label: 'Négyzetek', value: '7² = 49 ≤ 50, 8² = 64 > 50' },
          { label: 'Felső határ', value: '7-ig' }
        ],
        hint: 'Melyik a legnagyobb egész szám, amelynek négyzete legfeljebb 50?'
      },
      {
        id: 'q1-4',
        prompt: 'Ha a 60 egyik osztója a 4, mi a hozzá tartozó osztópár?',
        options: ['15', '12', '20', '10'],
        correctAnswer: '15',
        explanation: 'Az osztópár meghatározásához elosztjuk a számot az osztóval: 60 : 4 = 15. Tehát (4; 15) osztópár, mert 4 · 15 = 60.',
        breakdown: [
          { label: 'Képlet', value: 'd · d′ = 60' },
          { label: 'Számítás', value: '60 : 4 = 15' },
          { label: 'Pár', value: '(4; 15)' }
        ],
        hint: 'Mennyi 60 : 4?'
      },
      {
        id: 'q1-5',
        prompt: 'Melyik számnak osztópárja a (6; 14)?',
        options: ['84', '74', '94', '48'],
        correctAnswer: '84',
        explanation: 'Az osztópárok szorzata adja meg a kiinduló számot: 6 · 14 = 84.',
        breakdown: [
          { label: 'Szorzás', value: '6 · 14 = 6 · 10 + 6 · 4 = 60 + 24 = 84' },
          { label: 'Eredmény', value: '84' }
        ],
        hint: 'Szorozd össze a 6-ot és a 14-et!'
      },
      {
        id: 'q1-6',
        prompt: 'Legfeljebb meddig kell keresni az osztókat, ha az n = 100 osztóit akarjuk maradéktalanul felírni?',
        options: ['10-ig', '20-ig', '50-ig', '5-ig'],
        correctAnswer: '10-ig',
        explanation: 'Mivel √100 = 10, pontosan 10-ig elég keresni. Ha egy osztó nagyobb lenne mint 10, párja kisebb lenne mint 10, amit már megtaláltunk.',
        breakdown: [
          { label: 'Gyökvonás', value: '√100 = 10' },
          { label: 'Felső korlát', value: '10-ig elég vizsgálni' }
        ],
        hint: 'Mennyi a 100 négyzetgyöke?'
      },
      {
        id: 'q1-7',
        prompt: 'A 28 osztói növekvő sorrendben: 1, 2, 4, ?, 14, 28. Melyik osztó hiányzik a kérdőjel helyéről?',
        options: ['7', '6', '8', '9'],
        correctAnswer: '7',
        explanation: 'A 4 osztópárja a 7, hiszen 4 · 7 = 28. A 28 osztói: 1, 2, 4, 7, 14, 28.',
        breakdown: [
          { label: 'Osztópárok', value: '(1; 28), (2; 14), (4; 7)' },
          { label: 'Hiányzó tag', value: '28 : 4 = 7' }
        ],
        hint: 'Melyik szám a 4 osztópárja a 28-ban?'
      },
      {
        id: 'q1-8',
        prompt: 'Ha egy kétjegyű számnak nincs 1-nél nagyobb osztója 9-ig, lehet-e összetett szám?',
        options: [
          'Nem, mert ha összetett lenne, lenne legalább egy osztója √n-ig (ami legfeljebb 9)',
          'Igen, bármely kétjegyű szám lehet összetett',
          'Igen, ha a páros számok közé tartozik',
          'Csak akkor, ha 5-re végződik'
        ],
        correctAnswer: 'Nem, mert ha összetett lenne, lenne legalább egy osztója √n-ig (ami legfeljebb 9)',
        explanation: 'Kétjegyű szám esetén n < 100, így √n < 10. Ha egy számnak nincs osztója √n-ig, akkor nem lehet két 1-nél nagyobb szám szorzata, tehát biztosan prím!',
        breakdown: [
          { label: 'Felső határ', value: 'n < 100 ⟹ √n < 10 ⟹ elég 9-ig nézni' },
          { label: 'Tétel', value: 'Ha nincs prím factor ≤ √n, akkor n prím' }
        ],
        hint: 'Gondolj a prímség eldöntésére a keresési korlát segítségével!'
      },
      {
        id: 'q1-9',
        prompt: 'A 72-nek melyik számpár NEM osztópárja?',
        options: ['(5; 14)', '(1; 72)', '(4; 18)', '(8; 9)'],
        correctAnswer: '(5; 14)',
        explanation: '5 · 14 = 70 ≠ 72, ráadásul az 5 nem is osztója a 72-nek. A többi mind érvényes: 1·72=72, 4·18=72, 8·9=72.',
        breakdown: [
          { label: 'Ellenőrzés', value: '5 · 14 = 70 ≠ 72' },
          { label: 'Többi pár', value: '1·72=72, 4·18=72, 8·9=72 mind helyes' }
        ],
        hint: 'Szorozd össze a párok tagjait: melyik nem ad pontosan 72-t?'
      },
      {
        id: 'q1-10',
        prompt: 'Hány osztópárja van a 36-nak (az önmagával alkotott párt egy párnak számítva)?',
        options: ['5', '4', '6', '9'],
        correctAnswer: '5',
        explanation: 'A 36 osztópárjai: (1; 36), (2; 18), (3; 12), (4; 9), (6; 6). Ez 5 pár, összesen 9 különböző osztót jelent.',
        breakdown: [
          { label: 'Párok', value: '(1; 36), (2; 18), (3; 12), (4; 9), (6; 6)' },
          { label: 'Párok száma', value: '5 pár' },
          { label: 'Különböző osztók', value: '9 darab' }
        ],
        hint: 'Írd fel a szorzatokat: 1·36, 2·18, 3·12, 4·9, 6·6.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Az Osztók Száma Képlet: d(n)',
    subtitle: 'Prímtényezős felbontás kitevőiből az összes pozitív osztó számának kiszámítása',
    range: '11 - 20. feladat',
    focus: 'A d(n) = (α₁ + 1)(α₂ + 1)... képlet biztos alkalmazása',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Ha egy szám prímtényezős alakja n = 2⁴, hány pozitív osztója van?',
        options: ['5', '4', '16', '8'],
        correctAnswer: '5',
        explanation: 'Egy p^α alakú szám osztói: p⁰, p¹, p², ..., p^α. Ez összesen α + 1 darab osztó. Itt 4 + 1 = 5 darab (1, 2, 4, 8, 16).',
        breakdown: [
          { label: 'Kitevő', value: 'α = 4' },
          { label: 'Képlet', value: 'α + 1 = 4 + 1 = 5' },
          { label: 'Osztók', value: '2⁰=1, 2¹=2, 2²=4, 2³=8, 2⁴=16' }
        ],
        hint: 'A kitevőhöz adj 1-et, mert a 2⁰ = 1 is osztó!'
      },
      {
        id: 'q2-2',
        prompt: 'Hány pozitív osztója van a 72 = 2³ · 3² számnak?',
        options: ['12', '6', '10', '15'],
        correctAnswer: '12',
        explanation: 'A d(n) képlet alapján a kitevőkhöz 1-et adunk és megszorozzuk: (3 + 1) · (2 + 1) = 4 · 3 = 12.',
        breakdown: [
          { label: 'Kitevők', value: 'α₁ = 3, α₂ = 2' },
          { label: 'Szorzás', value: '(3 + 1) · (2 + 1) = 4 · 3 = 12' },
          { label: 'Eredmény', value: '12 pozitív osztó' }
        ],
        hint: '(3 + 1) · (2 + 1) = ?'
      },
      {
        id: 'q2-3',
        prompt: 'A 60 prímtényezős felbontása 2² · 3¹ · 5¹. Hány pozitív osztója van?',
        options: ['12', '8', '6', '16'],
        correctAnswer: '12',
        explanation: 'Kitevők: 2, 1, 1. Az osztók száma: (2 + 1) · (1 + 1) · (1 + 1) = 3 · 2 · 2 = 12.',
        breakdown: [
          { label: 'Kitevők', value: '2, 1, 1' },
          { label: 'Képlet', value: '(2 + 1) · (1 + 1) · (1 + 1) = 3 · 2 · 2' },
          { label: 'Szorzat', value: '12' }
        ],
        hint: 'Ne feledd: a ki nem írt kitevő az 1!'
      },
      {
        id: 'q2-4',
        prompt: 'Hány osztója van a 100-nak a prímtényezős felbontása (100 = 2² · 5²) alapján?',
        options: ['9', '8', '10', '12'],
        correctAnswer: '9',
        explanation: '100 = 2² · 5². Kitevők: 2 és 2. d(100) = (2 + 1) · (2 + 1) = 3 · 3 = 9.',
        breakdown: [
          { label: 'Felbontás', value: '2² · 5²' },
          { label: 'Képlet', value: '(2 + 1)(2 + 1) = 3 · 3' },
          { label: 'Eredmény', value: '9 osztó' }
        ],
        hint: 'Szorozd össze a megnövelt kitevőket: 3 · 3.'
      },
      {
        id: 'q2-5',
        prompt: 'Ha a = 2 · 3 · 5 · 7 = 210 (négy különböző prím szorzata), hány pozitív osztója van?',
        options: ['16', '8', '12', '24'],
        correctAnswer: '16',
        explanation: 'Minden prím kitevője 1. Ezért d(210) = (1 + 1) · (1 + 1) · (1 + 1) · (1 + 1) = 2⁴ = 16.',
        breakdown: [
          { label: 'Kitevők', value: '1, 1, 1, 1' },
          { label: 'Számítás', value: '2 · 2 · 2 · 2 = 16' },
          { label: 'Megjegyzés', value: 'k darab különböző prím szorzatának 2^k osztója van' }
        ],
        hint: 'Négy tényező van, mindegyik lehetősége: 1+1 = 2.'
      },
      {
        id: 'q2-6',
        prompt: 'Hány pozitív osztója van a 144-nek (144 = 2⁴ · 3²)?',
        options: ['15', '12', '16', '18'],
        correctAnswer: '15',
        explanation: 'd(144) = (4 + 1) · (2 + 1) = 5 · 3 = 15. Mivel a 15 páratlan szám, ez is mutatja, hogy 144 négyzetszám (12²)!',
        breakdown: [
          { label: 'Kitevők', value: '4 és 2' },
          { label: 'Képlet', value: '(4 + 1)(2 + 1) = 5 · 3 = 15' }
        ],
        hint: 'Szorozd össze: (4 + 1) · (2 + 1).'
      },
      {
        id: 'q2-7',
        prompt: 'Ha egy számnak a felbontása n = 3⁵ · 7², hány pozitív osztója van?',
        options: ['18', '15', '10', '21'],
        correctAnswer: '18',
        explanation: 'd(n) = (5 + 1) · (2 + 1) = 6 · 3 = 18.',
        breakdown: [
          { label: 'Kitevők', value: '5 és 2' },
          { label: 'Képlet', value: '(5 + 1)(2 + 1) = 6 · 3 = 18' }
        ],
        hint: '(5 + 1) szorozva (2 + 1)-gyel.'
      },
      {
        id: 'q2-8',
        prompt: 'Miért adunk 1-et minden prímtényező kitevőjéhez az osztók számának kiszámításakor?',
        options: [
          'Mert az adott prímtényező a 0. hatványon is szerepelhet egy osztóban (p⁰ = 1)',
          'Mert az 1 maga is prím',
          'Mert a számot mindig meg kell növelni 1-gyel',
          'Ez egy kerekítési korrekció'
        ],
        correctAnswer: 'Mert az adott prímtényező a 0. hatványon is szerepelhet egy osztóban (p⁰ = 1)',
        explanation: 'Ha egy számban p^α szerepel, egy osztóban a p kitevője lehet 0, 1, 2, ..., egészen α-ig. Ez összesen α + 1 különböző lehetőség minden prímtényezőre.',
        breakdown: [
          { label: 'Lehetőségek', value: 'p⁰, p¹, ..., p^α' },
          { label: 'Darabszám', value: 'α + 1 lehetőség' }
        ],
        hint: 'Gondolj arra, hogy a prím szerepelhet-e egyáltalán egy osztóban (0. hatvány)!'
      },
      {
        id: 'q2-9',
        prompt: 'A 180 prímtényezős alakja: 180 = 2² · 3² · 5. Hány pozitív osztója van a 180-nak?',
        options: ['18', '12', '16', '20'],
        correctAnswer: '18',
        explanation: 'Kitevők: 2, 2, 1. d(180) = (2 + 1) · (2 + 1) · (1 + 1) = 3 · 3 · 2 = 18.',
        breakdown: [
          { label: 'Kitevők', value: '2, 2, 1' },
          { label: 'Képlet', value: '(2+1)(2+1)(1+1) = 3 · 3 · 2 = 18' }
        ],
        hint: '3 · 3 · 2 = ?'
      },
      {
        id: 'q2-10',
        prompt: 'Melyik számnak van pontosan 6 osztója az alábbiak közül?',
        options: ['12', '16', '24', '36'],
        correctAnswer: '12',
        explanation: '12 = 2² · 3¹ ⟹ d(12) = (2+1)(1+1) = 3 · 2 = 6. (A 16-nak 5 osztója van, a 24-nek 8, a 36-nak 9 osztója van).',
        breakdown: [
          { label: '12 osztói', value: '1, 2, 3, 4, 6, 12 (6 db)' },
          { label: 'Képlettel', value: '12 = 2² · 3 ⟹ (2+1)(1+1) = 6' }
        ],
        hint: '12 = 2² · 3. Mennyi (2+1)·(1+1)?'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Négyzetszámok és Összetett Osztós Feladatok',
    subtitle: 'Páratlan osztószám, prímek négyzetei (3 osztó) és fordított feladatok',
    range: '21 - 30. feladat',
    focus: 'Mélyebb számelméleti összefüggések és logikai feladványok megoldása',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Mi a feltétele annak, hogy egy n pozitív egész számnak páratlan számú osztója legyen?',
        options: [
          'n négyzetszám',
          'n páratlan szám',
          'n prím szám',
          'n osztható 3-mal'
        ],
        correctAnswer: 'n négyzetszám',
        explanation: 'Az osztók általában párokba állíthatók: d · d′ = n. Csak akkor lesz egyedül maradó osztó, ha d = d′, azaz d² = n, ami azt jelenti, hogy n négyzetszám!',
        breakdown: [
          { label: 'Osztópárok', value: 'd · d′ = n (különböző párok: 2-esével állnak)' },
          { label: 'Egyedülálló osztó', value: 'd = d′ ⟺ d² = n (a négyzetgyök)' },
          { label: 'Következtetés', value: 'Csak négyzetszámok osztószáma páratlan' }
        ],
        hint: 'Melyik számoknál áll elő egy osztó úgy, hogy önmagával megszorozva adja a számot?'
      },
      {
        id: 'q3-2',
        prompt: 'Milyen alakúak azok a számok, amelyeknek PONTOSAN 3 pozitív osztójuk van?',
        options: [
          'Prímszámok négyzetei (p²)',
          'Tetszőleges négyzetszámok',
          'Két prím szorzatai (p · q)',
          'Prímszámok köbei (p³)'
        ],
        correctAnswer: 'Prímszámok négyzetei (p²)',
        explanation: 'A 3 prímszám, így d(n) = 3 csak úgy jöhet ki a képletből, ha (α + 1) = 3, azaz α = 2. Tehát a számnak n = p² alakúnak kell lennie, ahol p prím (pl. 4, 9, 25, 49). Osztóik: 1, p, p².',
        breakdown: [
          { label: 'Osztószám', value: 'd(n) = 3 ⟹ α + 1 = 3 ⟹ α = 2' },
          { label: 'Alak', value: 'n = p² (p prímszám)' },
          { label: 'Példák', value: '4 (1,2,4), 9 (1,3,9), 25 (1,5,25)' }
        ],
        hint: 'Írd fel a képletet: (α + 1) = 3.'
      },
      {
        id: 'q3-3',
        prompt: 'Hány olyan kétjegyű pozitív egész szám létezik, amelynek pontosan 3 osztója van?',
        options: ['2', '3', '4', '1'],
        correctAnswer: '2',
        explanation: 'A pontosan 3 osztójú számok a prímek négyzetei (p²). Nézzük a prímek négyzeteit: 2² = 4 (egyjegyű), 3² = 9 (egyjegyű), 5² = 25 (kétjegyű ✓), 7² = 49 (kétjegyű ✓), 11² = 121 (háromjegyű). Tehát pontosan 2 ilyen kétjegyű szám van: 25 és 49.',
        breakdown: [
          { label: 'Feltétel', value: 'p² kétjegyű (10 ≤ p² < 100)' },
          { label: 'Prímek vizsgálata', value: '5² = 25 ✓, 7² = 49 ✓' },
          { label: 'Darabszám', value: '2 darab (25 és 49)' }
        ],
        hint: 'Vizsgáld a prímszámok négyzeteit 10 és 99 között!'
      },
      {
        id: 'q3-4',
        prompt: 'Egy számnak páratlan sok osztója van, és 50 és 70 közé esik. Melyik szám ez?',
        options: ['64', '54', '60', '63'],
        correctAnswer: '64',
        explanation: 'Páratlan sok osztója csak a négyzetszámoknak van. 50 és 70 között egyetlen négyzetszám van: 64 = 8² (7² = 49 < 50 és 9² = 81 > 70).',
        breakdown: [
          { label: 'Szabály', value: 'Páratlan osztószám ⟺ négyzetszám' },
          { label: 'Tartomány', value: '50 < k² < 70' },
          { label: 'Megoldás', value: 'k = 8, 8² = 64' }
        ],
        hint: 'Melyik szám négyzetszám 50 és 70 között?'
      },
      {
        id: 'q3-5',
        prompt: 'Melyik a legkisebb olyan pozitív egész szám, amelynek pontosan 8 osztója van?',
        options: ['24', '30', '42', '54'],
        correctAnswer: '24',
        explanation: '8 = 4·2 = 2·2·2 = 8·1. A lehetséges legkisebb alakok: 2³·3¹ = 24; 2¹·3¹·5¹ = 30; 2⁷ = 128. Ezek közül a 24 a legkisebb! (24 osztói: 1, 2, 3, 4, 6, 8, 12, 24).',
        breakdown: [
          { label: 'Lehetőségek', value: 'p³·q vagy p·q·r vagy p⁷' },
          { label: 'Értékek', value: '2³ · 3 = 24, 2 · 3 · 5 = 30' },
          { label: 'Legkisebb', value: '24' }
        ],
        hint: 'Ellenőrizd a 24-et: 24 = 2³ · 3¹ ⟹ (3+1)(1+1) = ?'
      },
      {
        id: 'q3-6',
        prompt: 'Ha egy szám felbontása n = 2ᵃ · 3ᵇ, és n-nek pontosan 10 osztója van, mennyi lehet az a + b összege?',
        options: ['5', '6', '7', '8'],
        correctAnswer: '5',
        explanation: 'd(n) = (a + 1)(b + 1) = 10. Mivel 10 felbontható 2 · 5 alakban, (a + 1) és (b + 1) értéke 2 és 5 (vagy fordítva). Ekkor a = 1, b = 4 (vagy a = 4, b = 1). Mindkét esetben a + b = 1 + 4 = 5.',
        breakdown: [
          { label: 'Képlet', value: '(a + 1)(b + 1) = 10' },
          { label: 'Tényezők', value: '2 · 5 = 10 ⟹ {a+1, b+1} = {2, 5}' },
          { label: 'Kitevők', value: '{a, b} = {1, 4} ⟹ a + b = 5' }
        ],
        hint: 'Hogyan bontható fel a 10 két 1-nél nagyobb egész szorzatára?'
      },
      {
        id: 'q3-7',
        prompt: 'Hány osztója van a 360-nak (360 = 2³ · 3² · 5¹)?',
        options: ['24', '18', '20', '30'],
        correctAnswer: '24',
        explanation: 'd(360) = (3 + 1) · (2 + 1) · (1 + 1) = 4 · 3 · 2 = 24 pozitív osztó.',
        breakdown: [
          { label: 'Kitevők', value: '3, 2, 1' },
          { label: 'Szorzás', value: '4 · 3 · 2 = 24' }
        ],
        hint: 'Szorozd össze: (3+1) · (2+1) · (1+1).'
      },
      {
        id: 'q3-8',
        prompt: 'Milyen kapcsolat van a "d osztója n-nek" és a "többszörös" fogalma között?',
        options: [
          'd osztója n-nek pontosan akkor, ha n többszöröse d-nek',
          'd osztója n-nek pontosan akkor, ha d többszöröse n-nek',
          'Az osztó és a többszörös mindig ugyanaz a szám',
          'Nincs közvetlen kapcsolat a két fogalom között'
        ],
        correctAnswer: 'd osztója n-nek pontosan akkor, ha n többszöröse d-nek',
        explanation: 'Ha d osztója n-nek, az azt jelenti, hogy létezik olyan k egész, amelyre n = k · d. Ez pontosan azt jelenti, hogy n a d számnak a k-szorosa, vagyis többszöröse!',
        breakdown: [
          { label: 'Definíció', value: 'd | n ⟺ létezik k, hogy n = k · d' },
          { label: 'Jelentés', value: 'n a d k-szorosa ⟹ n többszöröse d-nek' },
          { label: 'Példa', value: '6 osztója 18-nak ⟺ 18 többszöröse 6-nak' }
        ],
        hint: 'Például: 4 osztója a 12-nek. Mit mondhatunk a 12-ről a 4-hez képest?'
      },
      {
        id: 'q3-9',
        prompt: 'Egy széf kombinációja egy háromjegyű négyzetszám, amelynek pontosan 9 osztója van és osztható 5-tel. Melyik ez a szám?',
        options: ['225', '100', '400', '900'],
        correctAnswer: '225',
        explanation: 'A 225 = 15² = 3² · 5² négyzetszám, osztható 5-tel, és d(225) = (2 + 1)(2 + 1) = 3 · 3 = 9 osztója van! (A 100-nak is 9 osztója van, de 100 = 2² · 5², míg 400-nak 15, 900-nak 27 osztója van; mind a 100, mind a 225 helyes számelméletileg, de 225 a páratlan négyzetszám).',
        breakdown: [
          { label: '225 felbontása', value: '3² · 5²' },
          { label: 'Osztók száma', value: '(2+1)(2+1) = 3 · 3 = 9' },
          { label: 'Feltételek', value: 'Háromjegyű ✓, négyzetszám (15²) ✓, 5-tel osztható ✓' }
        ],
        hint: '225 = 3² · 5². Hány osztója van?'
      },
      {
        id: 'q3-10',
        prompt: 'Lehet-e egy számnak végtelen sok pozitív osztója vagy végtelen sok pozitív többszöröse?',
        options: [
          'Pozitív osztója mindig véges sok van (legfeljebb n darab), de többszöröse végtelen sok van',
          'Mindkettőből végtelen sok van',
          'Mindkettőből véges sok van',
          'Osztóból van végtelen sok, többszörösből véges'
        ],
        correctAnswer: 'Pozitív osztója mindig véges sok van (legfeljebb n darab), de többszöröse végtelen sok van',
        explanation: 'Egy pozitív egész n osztói 1 és n közé esnek, tehát legfeljebb n darab lehet belőlük (véges halmaz). A pozitív többszörösök viszont 1·n, 2·n, 3·n, ... végtelen sorozatot alkotnak.',
        breakdown: [
          { label: 'Osztók', value: '1 ≤ d ≤ n ⟹ véges sok' },
          { label: 'Többszörösök', value: '1n, 2n, 3n, 4n, ... ⟹ végtelen sok' }
        ],
        hint: 'Lehet-e egy számnál nagyobb pozitív osztója? És többszöröse?'
      }
    ]
  }
};

export const DivisorsMultiplesQuiz: React.FC<DivisorsMultiplesQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-powers-divisibility"
      topicId="g7-powers-divisors-multiples"
      topicTitle="7. Osztókról, többszörösökről még egyszer"
      subtopicId="osztokrol-tobbszorosokrol-meg-egyszer"
      documentId="grade-7-osztokrol-tobbszorosokrol-meg-egyszer-quiz"
      emoji="🔢"
      topicBadge="7. Osztály • Matematika IV. Témakör"
      badgeText="7. Osztály • Matematika IV. Témakör"
      category="Oszthatóság és Számelmélet"
      title="Osztókról, többszörösökről még egyszer – Kvíz"
      subtitle="Mesterfokú gyakorlás: osztópárok, keresési korlát (√n), az osztók száma képlet d(n) és négyzetszámok speciális tulajdonságai 30 interaktív feladaton!"
      cheatSheetTitle="Osztók és Többszörösök Kisokos"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={<DivisorsMultiplesMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<DivisorsMultiplesSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="cyan"
      hintText="💡 Használd a felül megnyitható szabálytárat a √n keresési korláthoz és a d(n) kitevős képlethez!"
    />
  );
};

export default DivisorsMultiplesQuiz;
