import React from 'react';
import { QuizTemplate, Question, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { FractionsExpandSimplifyMatcher } from './FractionsExpandSimplifyMatcher';
import { FractionsExpandSimplifySorter } from './FractionsExpandSimplifySorter';
import { Scale, Sparkles, Divide, Calculator, ArrowRightLeft, Layers } from 'lucide-react';

export interface FractionsExpandSimplifyQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const questions: Question[] = [
  // =========================================================================
  // --- 1. SZINT: BŐVÍTÉS ÉS EGYSZERŰSÍTÉS ALAPJAI, AZONOS NEVEZŐ/SZÁMLÁLÓ ---
  // =========================================================================
  {
    id: 'l1-q1',
    level: 1,
    prompt: 'Mit jelent egy tört bővítése?',
    options: [
      'A számlálót és a nevezőt is megszorozzuk ugyanazzal a 0-tól különböző számmal',
      'Hozzáadunk ugyanannyit a számlálóhoz és a nevezőhöz is',
      'Csak a számlálót szorozzuk meg egy számmal',
      'Csak a nevezőt osztjuk el egy számmal'
    ],
    correctAnswer: 0,
    explanation: 'Tört bővítésekor a számlálót és a nevezőt ugyanazzal a nullától különböző számmal szorozzuk meg. A tört értéke nem változik.',
    hint: 'Gondolj arra: mindkét számot ugyanazzal a számmal kell megszorozni!',
    breakdown: [
      { label: 'Bővítés', value: 'a/b = (a · k) / (b · k) ahol k ≠ 0' }
    ]
  },
  {
    id: 'l1-q2',
    level: 1,
    prompt: 'Mit jelent egy tört egyszerűsítése?',
    options: [
      'A számlálót és a nevezőt is elosztjuk egy közös osztójukkal (ami nem 0)',
      'Kivonunk ugyanannyit a számlálóból és a nevezőből is',
      'Csak a nevezőt osztjuk el egy számmal',
      'Elhagyjuk a számlálót a törtből'
    ],
    correctAnswer: 0,
    explanation: 'Egyszerűsítéskor a számlálót és a nevezőt is elosztjuk a közös osztójukkal. A tört értéke ettől nem változik.',
    hint: 'Az egyszerűsítés a bővítés megfordítása: osztunk a közös osztóval.',
    breakdown: [
      { label: 'Egyszerűsítés', value: 'a/b = (a : k) / (b : k) ahol k közös osztó' }
    ]
  },
  {
    id: 'l1-q3',
    level: 1,
    prompt: 'Hogyan változik egy tört értéke bővítéskor vagy egyszerűsítéskor?',
    options: [
      'A tört értéke nem változik, pontosan ugyanaz marad',
      'Bővítéskor nagyobb lesz, egyszerűsítéskor kisebb lesz',
      'Bővítéskor kisebb lesz, egyszerűsítéskor nagyobb lesz',
      'Mindig megduplázódik az értéke'
    ],
    correctAnswer: 0,
    explanation: 'Bár a számláló és a nevező számai megváltoznak, a felosztás és a kiválasztott részek aránya azonos marad, így a tört értéke változatlan.',
    hint: 'Pl. fél pizza = 1/2 = 2/4 = 4/8 szelet: a megevett pizza mennyisége nem változik!',
    breakdown: [
      { label: 'Tört értéke', value: 'Egyenértékű (azonos marad)' }
    ]
  },
  {
    id: 'l1-q4',
    level: 1,
    prompt: 'Melyik tört az 1/2 bővített alakja?',
    options: [
      '4/8',
      '2/5',
      '3/4',
      '5/8'
    ],
    correctAnswer: 0,
    explanation: 'Az 1/2 számlálóját és nevezőjét 4-gyel megszorozva kapjuk: 1·4 = 4 és 2·4 = 8, tehát 4/8.',
    hint: 'Keresd azt a törtet, ahol a számláló pontosan a fele a nevezőnek!',
    breakdown: [
      { label: 'Szorzó', value: 'k = 4' },
      { label: 'Bővítés', value: '(1 · 4) / (2 · 4) = 4/8' }
    ]
  },
  {
    id: 'l1-q5',
    level: 1,
    prompt: 'Milyen számmal szoroztuk a számlálót és a nevezőt, ha a 2/3 törtből 8/12 lett?',
    options: [
      '4-gyel',
      '3-mal',
      '6-tal',
      '2-vel'
    ],
    correctAnswer: 0,
    explanation: '8 : 2 = 4 és 12 : 3 = 4, tehát a bővítés szorzója a 4.',
    hint: 'Oszd el az új számlálót az eredetivel: 8 : 2 = ?',
    breakdown: [
      { label: 'Számláló aránya', value: '8 : 2 = 4' },
      { label: 'Nevező aránya', value: '12 : 3 = 4' }
    ]
  },
  {
    id: 'l1-q6',
    level: 1,
    prompt: 'Milyen alakot kapunk, ha a 6/9 törtet 3-mal egyszerűsítjük?',
    options: [
      '2/3',
      '3/3',
      '2/9',
      '3/6'
    ],
    correctAnswer: 0,
    explanation: 'A számlálót és a nevezőt is elosztjuk 3-mal: 6:3 = 2 és 9:3 = 3, így az eredmény 2/3.',
    hint: 'Végezd el az osztást mindkét számon: 6 : 3 és 9 : 3.',
    breakdown: [
      { label: 'Számláló osztása', value: '6 : 3 = 2' },
      { label: 'Nevező osztása', value: '9 : 3 = 3' },
      { label: 'Eredmény', value: '2/3' }
    ]
  },
  {
    id: 'l1-q7',
    level: 1,
    prompt: 'Mikor mondjuk egy törtről, hogy a „legegyszerűbb alakjában” van?',
    options: [
      'Ha a számlálónak és a nevezőnek 1-en kívül nincs más közös osztója',
      'Ha a számlálója egyenlő 1-gyel',
      'Ha a számlálója kisebb a nevezőjénél',
      'Ha mindkét szám páros szám'
    ],
    correctAnswer: 0,
    explanation: 'Egy tört akkor van legegyszerűbb alakban, ha a számláló és a nevező relatív prímek, azaz legnagyobb közös osztójuk az 1.',
    hint: 'Akkor legegyszerűbb, ha már nem tudod tovább osztani egyik számot sem közös osztóval.',
    breakdown: [
      { label: 'Feltétel', value: 'LNKO(számláló, nevező) = 1' }
    ]
  },
  {
    id: 'l1-q8',
    level: 1,
    prompt: 'Melyik tört van a legegyszerűbb alakjában az alábbiak közül?',
    options: [
      '5/7',
      '4/6',
      '6/8',
      '9/12'
    ],
    correctAnswer: 0,
    explanation: 'Az 5 és a 7 relatív prímek (prímszámok), nincs közös osztójuk 1-en kívül. A 4/6 (2-vel), 6/8 (2-vel) és 9/12 (3-mal) még tovább egyszerűsíthetők.',
    hint: 'Keresd azt a párt, amelyek nem oszthatók ugyanazzal a 2-nél nagyobb vagy egyenlő számmal!',
    breakdown: [
      { label: '4/6', value: '= 2/3 (egyszerűsíthető)' },
      { label: '6/8', value: '= 3/4 (egyszerűsíthető)' },
      { label: '9/12', value: '= 3/4 (egyszerűsíthető)' },
      { label: '5/7', value: 'Már a legegyszerűbb alak!' }
    ]
  },
  {
    id: 'l1-q9',
    level: 1,
    prompt: 'Két AZONOS NEVEZŐJŰ tört közül melyik a nagyobb? (pl. 3/7 és 5/7)',
    options: [
      'Amelyiknek nagyobb a számlálója (5/7 > 3/7)',
      'Amelyiknek kisebb a számlálója',
      'Mindig az első tört a nagyobb',
      'Egyenlőek, mert a nevezőjük azonos'
    ],
    correctAnswer: 0,
    explanation: 'Ha a nevezők azonosak, a részek mérete megegyezik (hetedek). Így az a nagyobb mennyiség, amelyikből több darabot vettünk: 5/7 > 3/7.',
    hint: 'Gondolj a tortaszeletekre: 5 szelet több, mint 3 ugyanolyan szelet!',
    breakdown: [
      { label: 'Azonos nevezőnél', value: 'Nagyobb számláló = nagyobb tört' }
    ]
  },
  {
    id: 'l1-q10',
    level: 1,
    prompt: 'Két AZONOS SZÁMLÁLÓJÚ tört közül melyik a nagyobb? (pl. 3/4 és 3/8)',
    options: [
      'Amelyiknek kisebb a nevezője (3/4 > 3/8)',
      'Amelyiknek nagyobb a nevezője (3/8 > 3/4)',
      'Mindkettő pontosan egyenlő',
      'Nem hasonlíthatók össze'
    ],
    correctAnswer: 0,
    explanation: 'A kisebb nevező azt jelenti, hogy kevesebb felé vágtuk az egészet, így a szeletek nagyobbak! 3 nagy negyed szelet több, mint 3 apró nyolcad szelet.',
    hint: 'Kisebb nevező = nagyobb szeletméret!',
    breakdown: [
      { label: 'Azonos számlálónál', value: 'Kisebb nevező = nagyobb tört (3/4 > 3/8)' }
    ]
  },

  // =========================================================================
  // --- 2. SZINT: HIÁNYZÓ TAGOK, EGYSZERŰSÍTÉS ÉS RELÁCIÓK ---
  // =========================================================================
  {
    id: 'l2-q1',
    level: 2,
    prompt: 'Melyik szám hiányzik a kérdőjel helyéről: 3/5 = ? / 20 ?',
    options: [
      '12',
      '15',
      '9',
      '10'
    ],
    correctAnswer: 0,
    explanation: 'A nevező a 4-szeresére nőtt (5 · 4 = 20), így a számlálót is meg kell szorozni 4-gyel: 3 · 4 = 12.',
    hint: 'Hányszorosa a 20 az 5-nek? Szorozd meg a számlálót is ennyivel!',
    breakdown: [
      { label: 'Nevező bővítése', value: '5 · 4 = 20' },
      { label: 'Számláló bővítése', value: '3 · 4 = 12' }
    ]
  },
  {
    id: 'l2-q2',
    level: 2,
    prompt: 'Melyik szám hiányzik a kérdőjel helyéről: 24/36 = 2 / ? ?',
    options: [
      '3',
      '4',
      '6',
      '12'
    ],
    correctAnswer: 0,
    explanation: 'A számlálót 12-vel osztottuk (24 : 12 = 2), ezért a nevezőt is el kell osztani 12-vel: 36 : 12 = 3.',
    hint: '24 : 2 = 12-vel egyszerűsítettünk. Oszd el a 36-ot is 12-vel!',
    breakdown: [
      { label: 'Egyszerűsítő osztó', value: '24 : 2 = 12' },
      { label: 'Nevező osztása', value: '36 : 12 = 3' },
      { label: 'Eredmény', value: '2/3' }
    ]
  },
  {
    id: 'l2-q3',
    level: 2,
    prompt: 'Mi a 18/24 tört legegyszerűbb alakja?',
    options: [
      '3/4',
      '6/8',
      '9/12',
      '2/3'
    ],
    correctAnswer: 0,
    explanation: 'A 18 és a 24 legnagyobb közös osztója a 6. 18:6 = 3 és 24:6 = 4, így a legegyszerűbb alak 3/4.',
    hint: 'Egyszerűsíts a legnagyobb közös osztóval (6-tal)!',
    breakdown: [
      { label: 'Közös osztó', value: '6' },
      { label: 'Egyszerűsítés', value: '(18:6) / (24:6) = 3/4' }
    ]
  },
  {
    id: 'l2-q4',
    level: 2,
    prompt: 'Mennyi a 25/100 tört legegyszerűbb alakja?',
    options: [
      '1/4',
      '1/5',
      '5/20',
      '2/5'
    ],
    correctAnswer: 0,
    explanation: 'Mindkét szám osztható 25-tel: 25:25 = 1 és 100:25 = 4. Így a legegyszerűbb alak 1/4.',
    hint: 'Hányszor van meg a 25 a 100-ban?',
    breakdown: [
      { label: 'Egyszerűsítés 25-tel', value: '(25:25) / (100:25) = 1/4' }
    ]
  },
  {
    id: 'l2-q5',
    level: 2,
    prompt: 'Melyik relációs jel illik a két tört közé: 4/9 ... 7/9 ?',
    options: [
      '< (kisebb)',
      '> (nagyobb)',
      '= (egyenlő)',
      'Nem összehasonlítható'
    ],
    correctAnswer: 0,
    explanation: 'A nevezők azonosak (9), a számlálók közül pedig 4 < 7, ezért 4/9 < 7/9.',
    hint: 'Azonos nevező esetén a kisebb számlálójú tört a kisebb.',
    breakdown: [
      { label: 'Nevezők', value: 'Mindkettő 9' },
      { label: 'Számlálók', value: '4 < 7' },
      { label: 'Reláció', value: '4/9 < 7/9' }
    ]
  },
  {
    id: 'l2-q6',
    level: 2,
    prompt: 'Melyik relációs jel illik a két tört közé: 5/6 ... 5/8 ?',
    options: [
      '> (nagyobb)',
      '< (kisebb)',
      '= (egyenlő)',
      'Nem dönthető el'
    ],
    correctAnswer: 0,
    explanation: 'A számlálók azonosak (5). Mivel a 6 kisebb, mint a 8, a hatod részek nagyobbak a nyolcadoknál, tehát 5/6 > 5/8.',
    hint: 'Azonos számlálóknál a kisebb nevezőjű tört a nagyobb!',
    breakdown: [
      { label: 'Számlálók', value: 'Mindkettő 5' },
      { label: 'Nevezők', value: '6 < 8' },
      { label: 'Eredmény', value: '5/6 > 5/8' }
    ]
  },
  {
    id: 'l2-q7',
    level: 2,
    prompt: 'Egészítsd ki a hiányzó számot: 7/8 = 35 / ?',
    options: [
      '40',
      '48',
      '32',
      '45'
    ],
    correctAnswer: 0,
    explanation: 'A számláló 5-szörösére nőtt (7 · 5 = 35), így a nevezőt is meg kell szorozni 5-tel: 8 · 5 = 40.',
    hint: '35 : 7 = 5. Szorozd meg a 8-at is 5-tel!',
    breakdown: [
      { label: 'Szorzó', value: 'k = 5' },
      { label: 'Nevező', value: '8 · 5 = 40' }
    ]
  },
  {
    id: 'l2-q8',
    level: 2,
    prompt: 'Melyik tört NEM egyenlő a 2/3-dal?',
    options: [
      '8/15',
      '4/6',
      '8/12',
      '10/15'
    ],
    correctAnswer: 0,
    explanation: '4/6 = 2/3 (2-vel), 8/12 = 2/3 (4-gyel), 10/15 = 2/3 (5-tel). Viszont a 8/15-ben a nevező 15-höz a 2·5=10 tartozna (10/15), így 8/15 ≠ 2/3.',
    hint: 'Bővítsd a 2/3-ot a megadott nevezőkre (pl. 15-re: (2·5)/(3·5) = 10/15)!',
    breakdown: [
      { label: '4/6', value: '= 2/3 (szorzó: 2)' },
      { label: '8/12', value: '= 2/3 (szorzó: 4)' },
      { label: '10/15', value: '= 2/3 (szorzó: 5)' },
      { label: '8/15', value: '≠ 2/3 (helyesen 10/15 lenne)' }
    ]
  },
  {
    id: 'l2-q9',
    level: 2,
    prompt: 'Egyszerűsítsd a 42/70 törtet a lehető legegyszerűbb alakra!',
    options: [
      '3/5',
      '6/10',
      '21/35',
      '7/10'
    ],
    correctAnswer: 0,
    explanation: 'A 42 és a 70 legnagyobb közös osztója a 14. 42 : 14 = 3 és 70 : 14 = 5. Tehát a legegyszerűbb alak 3/5 (a 21/35 és 6/10 még tovább egyszerűsíthető).',
    hint: 'Mindkét szám osztható 7-tel és 2-vel is, azaz 14-gyel!',
    breakdown: [
      { label: 'Osztás 7-tel', value: '42/70 = 6/10' },
      { label: 'Osztás 2-vel', value: '6/10 = 3/5' },
      { label: 'Legegyszerűbb alak', value: '3/5' }
    ]
  },
  {
    id: 'l2-q10',
    level: 2,
    prompt: 'Melyik a helyes NÖVEKVŐ sorrendje a következő törteknek: 2/7, 5/7, 1/7, 4/7 ?',
    options: [
      '1/7 < 2/7 < 4/7 < 5/7',
      '5/7 < 4/7 < 2/7 < 1/7',
      '1/7 < 4/7 < 2/7 < 5/7',
      '2/7 < 1/7 < 4/7 < 5/7'
    ],
    correctAnswer: 0,
    explanation: 'Azonos nevezőknél a számlálók növekvő sorrendje határozza meg a törtek sorrendjét: 1 < 2 < 4 < 5, így 1/7 < 2/7 < 4/7 < 5/7.',
    hint: 'Rendezd növekvő sorba a számlálókat: 1, 2, 4, 5.',
    breakdown: [
      { label: 'Számlálók sorrendje', value: '1 < 2 < 4 < 5' },
      { label: 'Törtek sorrendje', value: '1/7 < 2/7 < 4/7 < 5/7' }
    ]
  },

  // =========================================================================
  // --- 3. SZINT: KÖZÖS NEVEZŐRE HOZÁS, ÖSSZETETT FELADATOK ÉS PROBLÉMÁK ---
  // =========================================================================
  {
    id: 'l3-q1',
    level: 3,
    prompt: 'Mi a legkisebb közös nevezője a 3/4 és az 5/6 törteknek?',
    options: [
      '12',
      '24',
      '18',
      '10'
    ],
    correctAnswer: 0,
    explanation: 'A 4 és a 6 legkisebb közös többszöröse (LKKT) a 12. Bár a 24 is közös többszörös, a legkisebb a 12.',
    hint: 'Sorold fel a 4 többszöröseit (4, 8, 12, 16...) és a 6 többszöröseit (6, 12, 18...). Mi az első közös szám?',
    breakdown: [
      { label: '4 többszörösei', value: '4, 8, 12, 16...' },
      { label: '6 többszörösei', value: '6, 12, 18...' },
      { label: 'LKKT(4, 6)', value: '12' }
    ]
  },
  {
    id: 'l3-q2',
    level: 3,
    prompt: 'Melyik tört a nagyobb: 3/4 vagy 5/6 ?',
    options: [
      '5/6',
      '3/4',
      'Pontosan egyenlőek',
      'Nem dönthető el'
    ],
    correctAnswer: 0,
    explanation: 'Közös nevezőre (12) hozzuk őket: 3/4 = 9/12 és 5/6 = 10/12. Mivel 9/12 < 10/12, ezért 5/6 a nagyobb.',
    hint: 'Bővítsd mindkettőt 12-edekre: 3/4 = ?/12 és 5/6 = ?/12.',
    breakdown: [
      { label: '3/4 bővítve 3-mal', value: '9/12' },
      { label: '5/6 bővítve 2-vel', value: '10/12' },
      { label: 'Összehasonlítás', value: '9/12 < 10/12, tehát 5/6 > 3/4' }
    ]
  },
  {
    id: 'l3-q3',
    level: 3,
    prompt: 'Melyik relációs jel illik a 2/3 és az 5/8 közé: 2/3 ... 5/8 ?',
    options: [
      '> (nagyobb)',
      '< (kisebb)',
      '= (egyenlő)',
      'Nem eldönthető'
    ],
    correctAnswer: 0,
    explanation: 'Közös nevezőjük 24: 2/3 = 16/24 (szorzó: 8) és 5/8 = 15/24 (szorzó: 3). Mivel 16/24 > 15/24, ezért 2/3 > 5/8.',
    hint: 'Hozd őket közös nevezőre (24-re)!',
    breakdown: [
      { label: '2/3 bővítve 8-cal', value: '16/24' },
      { label: '5/8 bővítve 3-mal', value: '15/24' },
      { label: 'Eredmény', value: '16/24 > 15/24 → 2/3 > 5/8' }
    ]
  },
  {
    id: 'l3-q4',
    level: 3,
    prompt: 'Hozd közös nevezőre a 7/10 és 4/15 törteket a legkisebb közös nevezővel! Melyik a helyes pár?',
    options: [
      '21/30 és 8/30',
      '14/30 és 8/30',
      '21/60 és 16/60',
      '35/50 és 20/50'
    ],
    correctAnswer: 0,
    explanation: '10 és 15 legkisebb közös többszöröse 30. 7/10 = (7·3)/(10·3) = 21/30, és 4/15 = (4·2)/(15·2) = 8/30.',
    hint: 'Mi a 10 és 15 legkisebb közös többszöröse? (30)',
    breakdown: [
      { label: 'Közös nevező', value: 'LKKT(10, 15) = 30' },
      { label: '7/10 bővítése', value: '3-mal: 21/30' },
      { label: '4/15 bővítése', value: '2-vel: 8/30' }
    ]
  },
  {
    id: 'l3-q5',
    level: 3,
    prompt: 'Anna egy csoki 3/5 részét ette meg, míg Bence a 7/10 részét. Ki evett többet a csokiból?',
    options: [
      'Bence evett többet',
      'Anna evett többet',
      'Pontosan ugyanannyit ettek',
      'Nem tudjuk, mert nem azonos a nevező'
    ],
    correctAnswer: 0,
    explanation: 'Anna része tizedekben kifejezve: 3/5 = 6/10. Bence 7/10-et evett. Mivel 7/10 > 6/10, Bence evett többet.',
    hint: 'Váltsd át a 3/5-öt tizedekre: 3/5 = ?/10.',
    breakdown: [
      { label: 'Anna része', value: '3/5 = 6/10' },
      { label: 'Bence része', value: '7/10' },
      { label: 'Összevetés', value: '7/10 > 6/10 → Bence evett többet' }
    ]
  },
  {
    id: 'l3-q6',
    level: 3,
    prompt: 'Melyik a helyes NÖVEKVŐ sorrendje a következő törteknek: 1/2, 2/3, 3/4 ?',
    options: [
      '1/2 < 2/3 < 3/4',
      '3/4 < 2/3 < 1/2',
      '2/3 < 1/2 < 3/4',
      '1/2 < 3/4 < 2/3'
    ],
    correctAnswer: 0,
    explanation: 'Közös nevezőjük 12: 1/2 = 6/12, 2/3 = 8/12, 3/4 = 9/12. Mivel 6 < 8 < 9, így a sorrend: 1/2 < 2/3 < 3/4.',
    hint: 'Bővítsd mindhárom törtet 12-es nevezőre!',
    breakdown: [
      { label: '1/2', value: '= 6/12' },
      { label: '2/3', value: '= 8/12' },
      { label: '3/4', value: '= 9/12' },
      { label: 'Sorrend', value: '6/12 < 8/12 < 9/12' }
    ]
  },
  {
    id: 'l3-q7',
    level: 3,
    prompt: 'Egy futóversenyen Peti a táv 5/8 részét, Dóri a 3/4 részét, Gábor pedig az 1/2 részét futotta le. Ki jutott a legmesszebb?',
    options: [
      'Dóri',
      'Peti',
      'Gábor',
      'Peti és Dóri holtversenyben állnak'
    ],
    correctAnswer: 0,
    explanation: 'Hozzunk mindent közös 8-as nevezőre: Peti = 5/8, Dóri = 3/4 = 6/8, Gábor = 1/2 = 4/8. 6/8 a legnagyobb, tehát Dóri jutott a legmesszebb.',
    hint: 'Írd fel a 3/4-et és az 1/2-et is nyolcadokban!',
    breakdown: [
      { label: 'Gábor', value: '1/2 = 4/8' },
      { label: 'Peti', value: '5/8' },
      { label: 'Dóri', value: '3/4 = 6/8' },
      { label: 'Legnagyobb', value: '6/8 (Dóri)' }
    ]
  },
  {
    id: 'l3-q8',
    level: 3,
    prompt: 'Mely számok hiányoznak az alábbi egyenlőségláncból: 1/2 = A / 8 = 12 / 24 = B / 10 ?',
    options: [
      'A = 4 és B = 5',
      'A = 2 és B = 5',
      'A = 4 és B = 2',
      'A = 8 és B = 10'
    ],
    correctAnswer: 0,
    explanation: 'Minden tört értéke 1/2 (a számláló a nevező fele). Ezért A = 8 : 2 = 4, és B = 10 : 2 = 5.',
    hint: 'Mindegyik törtnek a felet (1/2-et) kell jelentenie!',
    breakdown: [
      { label: 'A/8 = 1/2', value: 'A = 4 (4/8 = 1/2)' },
      { label: 'B/10 = 1/2', value: 'B = 5 (5/10 = 1/2)' }
    ]
  },
  {
    id: 'l3-q9',
    level: 3,
    prompt: 'Melyik tört a nagyobb: 11/12 vagy 19/20 ?',
    options: [
      '19/20',
      '11/12',
      'Pontosan egyenlőek',
      'Nem dönthető el'
    ],
    correctAnswer: 0,
    explanation: 'Mindkét törtből pontosan 1 szelet hiányzik az 1 egészhez: az elsőből 1/12, a másodikból 1/20. Mivel az 1/20 kisebb hiány, mint az 1/12, a 19/20 közelebb van az egészhez, tehát 19/20 > 11/12.',
    hint: 'Gondolj a kiegészítő törtrészre: 1 - 11/12 = 1/12 és 1 - 19/20 = 1/20. Amelyikből kevesebb hiányzik, az a nagyobb!',
    breakdown: [
      { label: '11/12 hiánya', value: '1/12 hiányzik az egészhez' },
      { label: '19/20 hiánya', value: '1/20 hiányzik az egészhez' },
      { label: 'Hiányok összevetése', value: '1/20 < 1/12 (kisebb hiány = nagyobb érték)' }
    ]
  },
  {
    id: 'l3-q10',
    level: 3,
    prompt: 'Egy osztályban a tanulók 1/3 része focizik, 2/5 része kosarazik. Melyik sportot űzik többen a kettő közül?',
    options: [
      'A kosárlabdát',
      'A focit',
      'Pontosan ugyanannyian',
      'Nem lehet összehasonlítani'
    ],
    correctAnswer: 0,
    explanation: 'Közös nevezőjük 15: 1/3 = 5/15 és 2/5 = 6/15. Mivel 6/15 > 5/15, kosarazni többen járnak, mint focizni.',
    hint: 'Hozd közös 15-ös nevezőre az 1/3-ot és a 2/5-öt!',
    breakdown: [
      { label: 'Focizók', value: '1/3 = 5/15' },
      { label: 'Kosarazók', value: '2/5 = 6/15' },
      { label: 'Eredmény', value: '6/15 > 5/15 (kosárlabda nyert)' }
    ]
  }
];

const levelConfigs: Record<number, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Bővítés és egyszerűsítés alapjai',
    description: 'Egyenértékű törtek felismerése, számláló/nevező szorzása és osztása, legegyszerűbb alak.',
    badgeText: 'Alapok',
    questions: questions.filter((q) => q.level === 1)
  },
  2: {
    level: 2,
    title: '2. Szint: Hiányzó tagok és azonos nevezőjű/számlálójú törtek',
    description: 'Hiányzó számlálók és nevezők kiszámítása egyenlőségekben, azonos nevezőjű és számlálójú törtek összehasonlítása.',
    badgeText: 'Középhaladó',
    questions: questions.filter((q) => q.level === 2)
  },
  3: {
    level: 3,
    title: '3. Szint: Közös nevező és összetett összehasonlítás',
    description: 'Különböző nevezőjű törtek összehasonlítása közös nevezővel, sorrendbe állítás, szöveges feladatok.',
    badgeText: 'Mesterfok',
    questions: questions.filter((q) => q.level === 3)
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'expand',
    title: 'Bővítés szabálya',
    icon: <ArrowRightLeft className="w-5 h-5 text-amber-500" />,
    formula: 'a / b = (a · k) / (b · k)',
    note: 'Szorozd meg a számlálót ÉS a nevezőt is ugyanazzal a számmal (k ≠ 0)! A tört értéke változatlan marad.'
  },
  {
    id: 'simplify',
    title: 'Egyszerűsítés szabálya',
    icon: <Divide className="w-5 h-5 text-blue-500" />,
    formula: 'a / b = (a : k) / (b : k)',
    note: 'Oszd el a számlálót ÉS a nevezőt is a közös osztójukkal! Legegyszerűbb alak: ha már nincs 1-nél nagyobb közös osztó.'
  },
  {
    id: 'same-compare',
    title: 'Azonos tagok összehasonlítása',
    icon: <Scale className="w-5 h-5 text-emerald-500" />,
    formula: 'Azonos nevező: nagyobb számláló > • Azonos számláló: kisebb nevező >',
    note: 'Pl. 5/7 > 3/7 (több heted szelet), és 3/4 > 3/8 (a negyed szeletek jóval nagyobbak a nyolcadoknál).'
  },
  {
    id: 'common-den',
    title: 'Különböző nevezők összehasonlítása',
    icon: <Layers className="w-5 h-5 text-purple-500" />,
    formula: '1. LKKT megkeresése → 2. Bővítés → 3. Számlálók összevetése',
    note: 'Pl. 3/4 vs. 5/6: közös nevező 12 → 9/12 < 10/12, tehát 3/4 < 5/6.'
  }
];

export const FractionsExpandSimplifyQuiz: React.FC<FractionsExpandSimplifyQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-fractions-expand-simplify-quiz"
      title="Törtek bővítése, egyszerűsítése, összehasonlítása Kvíz"
      subtitle="Teszteld a tudásodat a törtek bővítéséről, egyszerűsítéséről és összehasonlításáról 30 feladaton keresztül!"
      badge="⚖️ 5. Osztály • II. Törtek"
      themeColor="amber"
      levels={levelConfigs}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító játék',
          subtitle: 'Találd meg az egyenértékű kártyapárokat!',
          description: 'Párosítsd a bővített, egyszerűsített törtalakokat és hiányzó tagokat 3 nehézségi szinten.',
          badgeText: 'Párosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <FractionsExpandSimplifyMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító játék',
          subtitle: 'Válogasd szét a törteket csoportokba!',
          description: 'Rendezd a törteket alapértékük, egyszerűsíthetőségük vagy a 3/4-hez való viszonyuk alapján!',
          badgeText: 'Csoportosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <FractionsExpandSimplifySorter
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};

export default FractionsExpandSimplifyQuiz;
