import React from 'react';
import { QuizTemplate, Question, CheatSheetCard, DifficultyLevel } from '../QuizTemplate';
import { LocationSummaryMatcher } from './LocationSummaryMatcher';
import { LocationSummarySorter } from './LocationSummarySorter';

export interface LocationSummaryQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const LOCATION_SUMMARY_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: FEJEZETI ALAPFOGALMAK ÉS KÖNNYŰ SZÁMÍTÁSOK (1-30)
  // =========================================================================
  {
    id: 'lsq1-1',
    level: 1,
    prompt: 'Mi a neve és mik a pontos koordinátái a koordináta-tengelyek metszéspontjának?',
    options: [
      'Origó, és koordinátái O(0; 0)',
      'Centrum, és koordinátái C(1; 1)',
      'Bázispont, és koordinátái B(0; 1)',
      'Kezdőpont, és koordinátái K(1; 0)'
    ],
    correctAnswer: 0,
    explanation: 'A koordináta-rendszer két tengelyének metszéspontját origónak nevezzük, és koordinátái O(0; 0). Innen indul a számozás mindkét irányban.',
    hint: 'Gondolj a nulla pontra: O(0; 0).',
    breakdown: [
      { label: 'Elnevezés', value: 'Origó (O)' },
      { label: 'Koordináták', value: '(0; 0)' }
    ],
    figure: (
      <svg className="w-36 h-20 mx-auto" viewBox="-50 -35 100 70">
        <line x1="-45" y1="0" x2="45" y2="0" stroke="#3b82f6" strokeWidth="1.5" />
        <line x1="0" y1="30" x2="0" y2="-30" stroke="#10b981" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="4" fill="#ef4444" />
        <text x="6" y="-6" className="text-[9px] font-black fill-red-600">O(0; 0)</text>
      </svg>
    )
  },
  {
    id: 'lsq1-2',
    level: 1,
    prompt: 'Melyik koordináta-tengelyen lépünk legelőször egy P(4; 3) pont ábrázolásakor a síkban?',
    options: [
      'A vízszintes x-tengelyen lépünk 4 egységet jobbra',
      'A függőleges y-tengelyen lépünk 4 egységet fel',
      'Mindegy a sorrend, bármelyiken kezdhetjük',
      'Az átlós tengelyen lépünk'
    ],
    correctAnswer: 0,
    explanation: 'A koordinátapárban a sorrend szigorúan kötött: P(x; y). Az első szám mindig a vízszintes x-tengely menti elmozdulást jelenti, a második pedig a függőleges y-tengelyt.',
    hint: 'Először vízszintesen jobbra-balra, utána függőlegesen fel-le!',
    breakdown: [
      { label: '1. szám (x = 4)', value: 'Vízszintesen jobbra 4' },
      { label: '2. szám (y = 3)', value: 'Függőlegesen fel 3' }
    ]
  },
  {
    id: 'lsq1-3',
    level: 1,
    prompt: 'Melyik síknegyedbe esik az a pont, amelynek mindkét koordinátája pozitív: P(5; 2)?',
    options: [
      'Az I. síknegyedbe (jobb felső negyed)',
      'A II. síknegyedbe (bal felső negyed)',
      'A III. síknegyedbe (bal alsó negyed)',
      'A IV. síknegyedbe (jobb alsó negyed)'
    ],
    correctAnswer: 0,
    explanation: 'A jobb felső tartomány az I. síknegyed, ahol mind az x, mind az y koordináta pozitív (+; +).',
    hint: 'Jobbra és fel: (+; +) &rarr; I. negyed.',
    breakdown: [
      { label: 'Előjelek', value: '(+; +)' },
      { label: 'Síknegyed', value: 'I. síknegyed' }
    ]
  },
  {
    id: 'lsq1-4',
    level: 1,
    prompt: 'A sakktáblán melyik mezőt jelöli a 4. oszlop (d) és az 5. sor metszéspontja?',
    options: [
      'd5 mező',
      '5d mező',
      'e4 mező',
      'c5 mező'
    ],
    correctAnswer: 0,
    explanation: 'A sakkban az oszlop betűjele (a-h) áll elöl, amit a sor száma (1-8) követ: d5 mező.',
    hint: 'Először az oszlop betűje (d), utána a sor száma (5).',
    breakdown: [
      { label: 'Oszlop', value: 'd' },
      { label: 'Sor', value: '5' },
      { label: 'Mező', value: 'd5' }
    ]
  },
  {
    id: 'lsq1-5',
    level: 1,
    prompt: 'Mi a következő hiányzó tag a számsorozatban: 4, 9, 14, 19, [?] ?',
    options: [
      '24 (mivel a lépésköz állandó: +5)',
      '23',
      '25',
      '21'
    ],
    correctAnswer: 0,
    explanation: 'A sorozat lépésköze: 9 - 4 = 5. A következő tag: 19 + 5 = 24.',
    hint: 'Mennyit adunk hozzá minden lépésben? 9 - 4 = 5.',
    breakdown: [
      { label: 'Lépésköz', value: '+5' },
      { label: 'Következő', value: '19 + 5 = 24' }
    ]
  },
  {
    id: 'lsq1-6',
    level: 1,
    prompt: 'Mennyi az 5. négyzetszám (5²) értéke?',
    options: [
      '25 (mivel 5 · 5 = 25)',
      '10',
      '20',
      '15'
    ],
    correctAnswer: 0,
    explanation: 'A számot önmagával szorozzuk meg: 5 · 5 = 25.',
    hint: 'Ötször öt = ?',
    breakdown: [
      { label: 'Művelet', value: '5 · 5' },
      { label: 'Négyzetszám', value: '25' }
    ]
  },
  {
    id: 'lsq1-7',
    level: 1,
    prompt: 'Egy sormintában a 3 elemű motívum: [Kör, Négyzet, Háromszög] ismétlődik ciklikusan. Mi lesz a 7. alakzat a sorban?',
    options: [
      'Kör (mivel 7 = 2 · 3 + 1, a maradék 1 &rarr; az 1. alakzat jön)',
      'Négyzet',
      'Háromszög',
      'Csillag'
    ],
    correctAnswer: 0,
    explanation: 'A periódus hossza 3. Két teljes ciklus (6 alakzat) után az 1. elem következik: Kör.',
    hint: '1. Kör, 2. Négyzet, 3. Háromszög, 4. Kör, 5. Négyzet, 6. Háromszög, 7. ?',
    breakdown: [
      { label: 'Periódus', value: '3 elem' },
      { label: '7 : 3', value: '2 (maradék 1)' },
      { label: '7. alakzat', value: 'Kör' }
    ]
  },
  {
    id: 'lsq1-8',
    level: 1,
    prompt: 'Egy számgép szabálya: „szorozz 2-vel, majd adj hozzá 3-at” (y = 2x + 3). Ha a bemenet x = 4, mennyi a kimenet y?',
    options: [
      '11 (mivel 4 · 2 + 3 = 8 + 3 = 11)',
      '14',
      '10',
      '9'
    ],
    correctAnswer: 0,
    explanation: 'Először szorzunk 2-vel: 4 · 2 = 8, majd hozzáadunk 3-at: 8 + 3 = 11.',
    hint: '4 · 2 = 8, adj hozzá 3-at!',
    breakdown: [
      { label: '4 · 2', value: '8' },
      { label: '8 + 3', value: '11' }
    ]
  },
  {
    id: 'lsq1-9',
    level: 1,
    prompt: 'Mennyi a 3. háromszögszám értéke (T₃ = 1 + 2 + 3)?',
    options: [
      '6',
      '9',
      '5',
      '8'
    ],
    correctAnswer: 0,
    explanation: 'Az első 3 természetes szám összege: 1 + 2 + 3 = 6.',
    hint: '1 + 2 + 3 = ?',
    breakdown: [
      { label: 'Összeg', value: '1 + 2 + 3 = 6' }
    ]
  },
  {
    id: 'lsq1-10',
    level: 1,
    prompt: 'Melyik sorozat tagjai alkotják a híres Fibonacci-sorozat elemeit?',
    options: [
      '1, 1, 2, 3, 5, 8, 13 ...',
      '1, 2, 4, 8, 16, 32 ...',
      '1, 4, 9, 16, 25, 36 ...',
      '2, 4, 6, 8, 10, 12 ...'
    ],
    correctAnswer: 0,
    explanation: 'A Fibonacci-sorozatban az első két tag 1, 1, és utána mindegyik tag az előző kettő összege (1+1=2, 1+2=3, 2+3=5, 3+5=8...).',
    hint: 'Minden tag az előző kettő összege!',
    breakdown: [
      { label: 'Szabály', value: 'F_n = F_{n-1} + F_{n-2}' },
      { label: 'Kezdőtagok', value: '1, 1, 2, 3, 5, 8, 13...' }
    ]
  },
  {
    id: 'lsq1-11',
    level: 1,
    prompt: 'Mi a függőleges koordináta-tengely neve a derékszögű koordináta-rendszerben?',
    options: [
      'y-tengely (ordináta)',
      'x-tengely (abszcissza)',
      'z-tengely (applikáta)',
      'Átlós tengely'
    ],
    correctAnswer: 0,
    explanation: 'A derékszögű koordináta-rendszerben a függőleges tengely az y-tengely (más néven ordináta-tengely).',
    hint: 'A vízszintes az x, a függőleges az y.',
    breakdown: [
      { label: 'Függőleges tengely', value: 'y-tengely' },
      { label: 'Latin elnevezés', value: 'ordináta' }
    ]
  },
  {
    id: 'lsq1-12',
    level: 1,
    prompt: 'Mi a vízszintes koordináta-tengely neve a derékszögű koordináta-rendszerben?',
    options: [
      'x-tengely (abszcissza)',
      'y-tengely (ordináta)',
      'Magassági tengely',
      'Forgástengely'
    ],
    correctAnswer: 0,
    explanation: 'A vízszintes tengely az x-tengely (abszcissza-tengely).',
    hint: 'A fekvő, vízszintes tengely az x.',
    breakdown: [
      { label: 'Vízszintes tengely', value: 'x-tengely' },
      { label: 'Latin elnevezés', value: 'abszcissza' }
    ]
  },
  {
    id: 'lsq1-13',
    level: 1,
    prompt: 'Egy színházi jegyen ez áll: „7. sor, 14. szék”. Miért van szükség mindkét adatra a hely meghatározásához?',
    options: [
      'Mert a nézőtér egy kétdimenziós sík, ahol egyetlen szám nem azonosítaná egyértelműen a széket',
      'Csak szokásból írják rá mindkettőt, a székszám magában is elég lenne',
      'Mert így tudják a jegy árát kiszámolni',
      'Mert a szék száma a ruhatári sorszámot jelenti'
    ],
    correctAnswer: 0,
    explanation: 'A nézőtér egy rácshálóhoz hasonlít: a sor száma az egyik dimenzió, a szék száma a másik dimenzió.',
    hint: 'Két adat kell a pontos helyhez a síkban!',
    breakdown: [
      { label: '1. koordináta', value: 'Sor (y irány)' },
      { label: '2. koordináta', value: 'Szék (x irány)' }
    ]
  },
  {
    id: 'lsq1-14',
    level: 1,
    prompt: 'A térképeken hagyományosan melyik égtáj felé mutat a felfelé mutató irány?',
    options: [
      'Észak (É)',
      'Dél (D)',
      'Kelet (K)',
      'Nyugat (Ny)'
    ],
    correctAnswer: 0,
    explanation: 'A térképeken a szabványos tájolás szerint felfelé Észak, lefelé Dél, jobbra Kelet és balra Nyugat található.',
    hint: 'Fent van az Északi-sark.',
    breakdown: [
      { label: 'Felfelé', value: 'Észak' },
      { label: 'Jobbra', value: 'Kelet' }
    ]
  },
  {
    id: 'lsq1-15',
    level: 1,
    prompt: 'Egy táblázatkezelő programban (pl. Excel) mit azonosít a B4 cellahivatkozás?',
    options: [
      'A B oszlop és a 4. sor metszéspontjában lévő cellát',
      'A 4. oszlop és a B sor celláját',
      'A B betűvel kezdődő 4 darab cellát',
      'A táblázat 24. sorát'
    ],
    correctAnswer: 0,
    explanation: 'A táblázatkezelőkben az oszlopokat betűkkel (A, B, C...), a sorokat számokkal (1, 2, 3...) jelölik. B4 a B oszlop 4. sora.',
    hint: 'B oszlop, 4. sor.',
    breakdown: [
      { label: 'Oszlop betűje', value: 'B' },
      { label: 'Sor száma', value: '4' }
    ]
  },
  {
    id: 'lsq1-16',
    level: 1,
    prompt: 'Mennyi a 4. négyzetszám (4²) értéke?',
    options: [
      '16 (mivel 4 · 4 = 16)',
      '8',
      '12',
      '20'
    ],
    correctAnswer: 0,
    explanation: 'Négyzetszám: a szám szorzata önmagával: 4 · 4 = 16.',
    hint: 'Négyszer négy = ?',
    breakdown: [
      { label: 'Szorzás', value: '4 · 4' },
      { label: 'Eredmény', value: '16' }
    ]
  },
  {
    id: 'lsq1-17',
    level: 1,
    prompt: 'Mi a következő szám a páros számok sorozatában: 2, 4, 6, 8, 10, [?] ?',
    options: [
      '12',
      '11',
      '14',
      '13'
    ],
    correctAnswer: 0,
    explanation: 'A páros számok lépésköze +2. 10 + 2 = 12.',
    hint: '10 után a következő páros szám.',
    breakdown: [
      { label: 'Lépésköz', value: '+2' },
      { label: 'Következő tag', value: '12' }
    ]
  },
  {
    id: 'lsq1-18',
    level: 1,
    prompt: 'Mi a következő szám a páratlan számok sorozatában: 1, 3, 5, 7, 9, [?] ?',
    options: [
      '11',
      '10',
      '13',
      '12'
    ],
    correctAnswer: 0,
    explanation: 'A páratlan számok lépésköze +2. 9 + 2 = 11.',
    hint: '9 után a következő páratlan szám.',
    breakdown: [
      { label: 'Lépésköz', value: '+2' },
      { label: 'Következő tag', value: '11' }
    ]
  },
  {
    id: 'lsq1-19',
    level: 1,
    prompt: 'Mennyi a 2. háromszögszám értéke (T₂ = 1 + 2)?',
    options: [
      '3',
      '2',
      '4',
      '5'
    ],
    correctAnswer: 0,
    explanation: 'Az első 2 természetes szám összege: 1 + 2 = 3.',
    hint: 'Egy meg kettő az három.',
    breakdown: [
      { label: 'Összeg', value: '1 + 2 = 3' }
    ]
  },
  {
    id: 'lsq1-20',
    level: 1,
    prompt: 'Egy sorminta 2 elemű motívumból áll: [Piros, Kék] ismétlődik. Milyen színű lesz a 10. elem a sorban?',
    options: [
      'Kék (mivel 10 páros szám, a motívum 2. eleme jön)',
      'Piros',
      'Zöld',
      'Sárga'
    ],
    correctAnswer: 0,
    explanation: 'A páratlan helyeken (1., 3., 5...) Piros, a páros helyeken (2., 4., 6., 8., 10...) Kék szín áll.',
    hint: 'A páros sorszámú helyeken Kék van.',
    breakdown: [
      { label: '10 sorszám', value: 'Páros' },
      { label: 'Szín', value: 'Kék' }
    ]
  },
  {
    id: 'lsq1-21',
    level: 1,
    prompt: 'Egy számgép szabálya: „adj hozzá 7-et” (y = x + 7). Ha a bemenet x = 15, mennyi a kimenet y?',
    options: [
      '22 (mivel 15 + 7 = 22)',
      '21',
      '23',
      '8'
    ],
    correctAnswer: 0,
    explanation: '15 + 7 = 22.',
    hint: '15-höz adj hozzá 7-et!',
    breakdown: [
      { label: 'Bemenet x', value: '15' },
      { label: 'Kimenet y', value: '15 + 7 = 22' }
    ]
  },
  {
    id: 'lsq1-22',
    level: 1,
    prompt: 'Egy számsorozat kezdőtagja 30, és minden lépésben 4-et vonunk ki (-4). Mi a sorozat 2. tagja?',
    options: [
      '26 (mivel 30 - 4 = 26)',
      '34',
      '24',
      '28'
    ],
    correctAnswer: 0,
    explanation: 'Kezdőtag: 30. A 2. tag: 30 - 4 = 26.',
    hint: 'Vonj ki 4-et a 30-ból!',
    breakdown: [
      { label: '1. tag', value: '30' },
      { label: '2. tag', value: '30 - 4 = 26' }
    ]
  },
  {
    id: 'lsq1-23',
    level: 1,
    prompt: 'Ha egy robot az origóról O(0; 0) indul, és pontosan 3 lépést tesz jobbra a rácson, melyik pontba jut?',
    options: [
      'P(3; 0)',
      'P(0; 3)',
      'P(3; 3)',
      'P(-3; 0)'
    ],
    correctAnswer: 0,
    explanation: 'Jobbra lépésnél a vízszintes x koordináta növekszik 3-mal, az y koordináta 0 marad: P(3; 0).',
    hint: 'Jobbra lépés az x tengely pozitív iránya.',
    breakdown: [
      { label: 'x koordináta', value: '0 + 3 = 3' },
      { label: 'y koordináta', value: '0' },
      { label: 'Pont', value: 'P(3; 0)' }
    ]
  },
  {
    id: 'lsq1-24',
    level: 1,
    prompt: 'Ha egy robot az origóról O(0; 0) indul, és pontosan 4 lépést tesz fel a rácson, melyik pontba jut?',
    options: [
      'P(0; 4)',
      'P(4; 0)',
      'P(4; 4)',
      'P(0; -4)'
    ],
    correctAnswer: 0,
    explanation: 'Felfelé lépésnél a függőleges y koordináta növekszik 4-gyel, az x koordináta 0 marad: P(0; 4).',
    hint: 'Felfelé lépés az y tengely pozitív iránya.',
    breakdown: [
      { label: 'x koordináta', value: '0' },
      { label: 'y koordináta', value: '0 + 4 = 4' },
      { label: 'Pont', value: 'P(0; 4)' }
    ]
  },
  {
    id: 'lsq1-25',
    level: 1,
    prompt: 'Mennyi a Fibonacci-sorozat első 4 tagjának összege: 1 + 1 + 2 + 3?',
    options: [
      '7',
      '6',
      '8',
      '5'
    ],
    correctAnswer: 0,
    explanation: '1 + 1 = 2; 2 + 2 = 4; 4 + 3 = 7.',
    hint: 'Add össze az első négy számot: 1 + 1 + 2 + 3.',
    breakdown: [
      { label: 'Összeadás', value: '1 + 1 + 2 + 3 = 7' }
    ]
  },
  {
    id: 'lsq1-26',
    level: 1,
    prompt: 'Hány dimenziós geometriai alakzat a füzetlapunk vagy a sakktábla sík felülete?',
    options: [
      '2 dimenziós (szélesség és magasság)',
      '1 dimenziós',
      '3 dimenziós',
      '0 dimenziós'
    ],
    correctAnswer: 0,
    explanation: 'A sík felületek 2 dimenziósak: van szélességük (x) és magasságuk/hosszúságuk (y).',
    hint: 'Két kiterjedése van: szélesség és hosszúság.',
    breakdown: [
      { label: 'Dimenzió', value: '2D (sík)' }
    ]
  },
  {
    id: 'lsq1-27',
    level: 1,
    prompt: 'Mi a neve annak a geometriai mozgásnak, amikor egy mintázatot irányváltoztatás nélkül elcsúsztatunk?',
    options: [
      'Eltolás (transzláció)',
      'Tükrözés',
      'Forgatás',
      'Kicsinyítés'
    ],
    correctAnswer: 0,
    explanation: 'Az eltolás során az alakzat minden pontja ugyanolyan irányban és ugyanolyan távolságra mozdul el.',
    hint: 'Párhuzamos elcsúsztatás: eltolás.',
    breakdown: [
      { label: 'Mozgás', value: 'Eltolás' }
    ]
  },
  {
    id: 'lsq1-28',
    level: 1,
    prompt: 'Egy számsorozat szabálya: minden tag megduplázódik (·2). Ha a kezdőtag 5, mennyi a 2. tag?',
    options: [
      '10 (mivel 5 · 2 = 10)',
      '7',
      '15',
      '25'
    ],
    correctAnswer: 0,
    explanation: '5 · 2 = 10.',
    hint: '5 szorozva kettővel.',
    breakdown: [
      { label: '1. tag', value: '5' },
      { label: '2. tag', value: '5 · 2 = 10' }
    ]
  },
  {
    id: 'lsq1-29',
    level: 1,
    prompt: 'Melyik pont fekszik az alábbiak közül biztosan a vízszintes x-tengelyen?',
    options: [
      'P(7; 0) (mivel a függőleges y koordinátája 0)',
      'P(0; 7)',
      'P(7; 7)',
      'P(-7; 7)'
    ],
    correctAnswer: 0,
    explanation: 'Az x-tengelyen fekvő pontok függőleges koordinátája y = 0, mert sem fel, sem le nem léptünk.',
    hint: 'Ha y = 0, a pont az x-tengelyen van.',
    breakdown: [
      { label: 'y koordináta', value: '0' },
      { label: 'Helyzet', value: 'x-tengely' }
    ]
  },
  {
    id: 'lsq1-30',
    level: 1,
    prompt: 'Hány síknegyedre osztja a síkot a két egymást metsző derékszögű koordináta-tengely?',
    options: [
      '4 síknegyedre (I., II., III. és IV.)',
      '2 síknegyedre',
      '6 síknegyedre',
      '8 síknegyedre'
    ],
    correctAnswer: 0,
    explanation: 'A két tengely 4 negyedre bontja a síkot: I. (jobb fent), II. (bal fent), III. (bal lent), IV. (jobb lent).',
    hint: 'A síkot 4 negyedre osztjuk.',
    breakdown: [
      { label: 'Negyedek száma', value: '4 síknegyed' }
    ]
  },

  // =========================================================================
  // 2. SZINT: ÖSSZEFÜGGÉSEK, INVERZEK ÉS GEOMETRIA (1-30)
  // =========================================================================
  {
    id: 'lsq2-1',
    level: 2,
    prompt: 'Melyik tengelyen fekszik a P(0; -5) pont a derékszögű koordináta-rendszerben?',
    options: [
      'A függőleges y-tengelyen (mivel az x koordinátája 0)',
      'A vízszintes x-tengelyen',
      'Az origóban',
      'Egyik tengelyen sem, a III. negyedben fekszik'
    ],
    correctAnswer: 0,
    explanation: 'Ha egy pont x-koordinátája 0, akkor se jobbra, se balra nem léptünk, így a pont pontosan a függőleges y-tengelyen helyezkedik el.',
    hint: 'x = 0 esetén a pont az y-tengelyen van!',
    breakdown: [
      { label: 'x koordináta', value: '0 (nincs vízszintes kitérés)' },
      { label: 'y koordináta', value: '-5 (lefelé 5 egység)' },
      { label: 'Helyzet', value: 'Y-tengely' }
    ],
    figure: (
      <svg className="w-36 h-20 mx-auto" viewBox="-50 -35 100 70">
        <line x1="-45" y1="0" x2="45" y2="0" stroke="#3b82f6" strokeWidth="1.5" />
        <line x1="0" y1="30" x2="0" y2="-30" stroke="#10b981" strokeWidth="1.5" />
        <circle cx="0" cy="22" r="4" fill="#ef4444" />
        <text x="6" y="24" className="text-[9px] font-black fill-red-600">P(0; -5)</text>
      </svg>
    )
  },
  {
    id: 'lsq2-2',
    level: 2,
    prompt: 'Mennyi a legrövidebb lépéstávolság (Manhattan-távolság) a P(1; 2) és a Q(5; 5) pontok között a négyzethálón haladva?',
    options: [
      '7 lépés (vízszintesen 4, függőlegesen 3 lépés: 4 + 3 = 7)',
      '5 lépés',
      '8 lépés',
      '9 lépés'
    ],
    correctAnswer: 0,
    explanation: 'A rácsvonalakon haladva: vízszintesen |5 - 1| = 4 egység, függőlegesen |5 - 2| = 3 egység. Összesen: 4 + 3 = 7 lépés.',
    hint: 'Vízszintes távolság: 5 - 1 = 4. Függőleges távolság: 5 - 2 = 3. Add össze őket!',
    breakdown: [
      { label: 'Vízszintes lépés', value: '|5 - 1| = 4' },
      { label: 'Függőleges lépés', value: '|5 - 2| = 3' },
      { label: 'Összes lépés', value: '4 + 3 = 7' }
    ]
  },
  {
    id: 'lsq2-3',
    level: 2,
    prompt: 'Egy számgép kimenete y = 23. A szabály: „szorozz 5-tel, majd vonj ki 2-t” (y = 5x - 2). Mennyi volt a bemenet (x)?',
    options: [
      'x = 5 (inverz művelet: (23 + 2) : 5 = 25 : 5 = 5)',
      'x = 4',
      'x = 6',
      'x = 21'
    ],
    correctAnswer: 0,
    explanation: 'Visszafelé számolunk ellentétes műveletekkel: először hozzáadunk 2-t (23 + 2 = 25), majd elosztjuk 5-tel (25 : 5 = 5).',
    hint: 'Fordított műveletek ellentétes sorrendben: adj hozzá 2-t, majd oszd el 5-tel!',
    breakdown: [
      { label: '1. inverz lépés', value: '23 + 2 = 25' },
      { label: '2. inverz lépés', value: '25 : 5 = 5' }
    ]
  },
  {
    id: 'lsq2-4',
    level: 2,
    prompt: 'Melyik két szám hiányzik ebből a számtani sorozatból: 7, [?], 21, 28, [?], 42 ?',
    options: [
      '14 és 35 (mivel a lépésköz +7)',
      '12 és 36',
      '14 és 36',
      '15 és 35'
    ],
    correctAnswer: 0,
    explanation: 'A 21 és 28 különbsége: 28 - 21 = 7. Első hiányzó: 7 + 7 = 14. Második hiányzó: 28 + 7 = 35.',
    hint: 'Ez a 7-es szorzótábla! 7, 14, 21, 28, 35, 42.',
    breakdown: [
      { label: 'Lépésköz', value: '28 - 21 = 7' },
      { label: '1. hiányzó', value: '7 + 7 = 14' },
      { label: '2. hiányzó', value: '28 + 7 = 35' }
    ]
  },
  {
    id: 'lsq2-5',
    level: 2,
    prompt: 'Egy díszítősorban a 4 elemű motívum: [Piros, Sárga, Kék, Zöld] ismétlődik. Milyen színű lesz a sorozat 50. eleme?',
    options: [
      'Sárga (mivel 50 = 4 · 12 + 2, a maradék 2 &rarr; a 2. szín jön)',
      'Piros',
      'Kék',
      'Zöld'
    ],
    correctAnswer: 0,
    explanation: '50 : 4 = 12, a maradék 2. A 2. elem a Sárga szín.',
    hint: 'Oszd el az 50-et 4-gyel: 50 : 4 = 12, maradék 2. Nézd a 2. színt!',
    breakdown: [
      { label: '50 : 4', value: '12 teljes periódus' },
      { label: 'Maradék', value: '2' },
      { label: '50. elem', value: 'Sárga' }
    ]
  },
  {
    id: 'lsq2-6',
    level: 2,
    prompt: 'Hány gyufaszál szükséges 6 darab egymáshoz csatlakozó négyzet kirakásához egy láncban?',
    options: [
      '19 gyufaszál (mivel a szabály: 3 · n + 1 = 3 · 6 + 1 = 19)',
      '24 gyufaszál',
      '18 gyufaszál',
      '20 gyufaszál'
    ],
    correctAnswer: 0,
    explanation: 'Az első négyzethez 4 gyufaszál kell, minden további új négyzethez 3-mal több: 3 · 6 + 1 = 19 gyufaszál.',
    hint: '3 · n + 1 képlet: 3 · 6 + 1 = ?',
    breakdown: [
      { label: 'Képlet', value: '3 · n + 1' },
      { label: 'n = 6 esetén', value: '3 · 6 + 1 = 19' }
    ]
  },
  {
    id: 'lsq2-7',
    level: 2,
    prompt: 'Melyik síknegyedbe esik egy pont, ha x < 0 és y > 0 (például P(-3; 4))?',
    options: [
      'A II. síknegyedbe (bal felső negyed)',
      'Az I. síknegyedbe',
      'A III. síknegyedbe',
      'A IV. síknegyedbe'
    ],
    correctAnswer: 0,
    explanation: 'A bal felső negyed a II. síknegyed, ahol az x negatív, az y pedig pozitív (-; +).',
    hint: 'Balra és fel: negatív x, pozitív y &rarr; II. negyed.',
    breakdown: [
      { label: 'Előjelek', value: '(-; +)' },
      { label: 'Síknegyed', value: 'II. síknegyed' }
    ]
  },
  {
    id: 'lsq2-8',
    level: 2,
    prompt: 'Mennyi a két szomszédos háromszögszám: T₃ = 6 és T₄ = 10 összege?',
    options: [
      '16 (ami pontosan a 4² négyzetszám)',
      '15',
      '20',
      '14'
    ],
    correctAnswer: 0,
    explanation: '6 + 10 = 16 = 4². Bármely két szomszédos háromszögszám összege mindig négyzetszámot ad!',
    hint: '6 + 10 = 16. És mennyi a 4 négyzete?',
    breakdown: [
      { label: '6 + 10', value: '16' },
      { label: 'Négyzetszám', value: '4² = 16' }
    ]
  },
  {
    id: 'lsq2-9',
    level: 2,
    prompt: 'Egy mértani sorozat szabálya: minden lépésben megduplázódik (·2). Ha az 1. tag 3, mennyi a sorozat 5. tagja?',
    options: [
      '48 (mivel 3 &rarr; 6 &rarr; 12 &rarr; 24 &rarr; 48)',
      '32',
      '15',
      '96'
    ],
    correctAnswer: 0,
    explanation: '1. tag: 3; 2. tag: 6; 3. tag: 12; 4. tag: 24; 5. tag: 48.',
    hint: 'Duplázd az értékeket négyszer egymás után: 3 &rarr; 6 &rarr; 12 &rarr; 24 &rarr; ?',
    breakdown: [
      { label: 'Sorozat tagjai', value: '3, 6, 12, 24, 48' },
      { label: '5. tag', value: '48' }
    ]
  },
  {
    id: 'lsq2-10',
    level: 2,
    prompt: 'Melyik szám a kakukktojás a sorozatban: 3, 6, 9, 13, 15, 18 ?',
    options: [
      'A 13 (mivel nem osztható 3-mal, a helyes érték 12 lenne)',
      'A 9',
      'A 15',
      'A 6'
    ],
    correctAnswer: 0,
    explanation: 'A sorozat a 3 többszöröseiből áll (+3 állandó lépésköz). 9 + 3 = 12, a 13 hibás.',
    hint: 'Minden tag osztható 3-mal, kivéve egyet!',
    breakdown: [
      { label: 'Szabály', value: '+3' },
      { label: 'Kakukktojás', value: '13 (helyette: 12)' }
    ]
  },
  {
    id: 'lsq2-11',
    level: 2,
    prompt: 'Melyik síknegyedbe esik a pont, ha mindkét koordinátája negatív: P(-4; -2)?',
    options: [
      'A III. síknegyedbe (bal alsó negyed)',
      'A II. síknegyedbe',
      'A IV. síknegyedbe',
      'Az I. síknegyedbe'
    ],
    correctAnswer: 0,
    explanation: 'A bal alsó tartomány a III. síknegyed, ahol az x és az y koordináta is negatív (-; -).',
    hint: 'Balra és le: mindkettő negatív &rarr; III. negyed.',
    breakdown: [
      { label: 'Előjelek', value: '(-; -)' },
      { label: 'Síknegyed', value: 'III. síknegyed' }
    ]
  },
  {
    id: 'lsq2-12',
    level: 2,
    prompt: 'Melyik síknegyedbe esik a pont, ha x > 0 és y < 0: P(6; -3)?',
    options: [
      'A IV. síknegyedbe (jobb alsó negyed)',
      'A II. síknegyedbe',
      'Az I. síknegyedbe',
      'A III. síknegyedbe'
    ],
    correctAnswer: 0,
    explanation: 'A jobb alsó tartomány a IV. síknegyed, ahol az x pozitív, de az y negatív (+; -).',
    hint: 'Jobbra és le: (+; -) &rarr; IV. negyed.',
    breakdown: [
      { label: 'Előjelek', value: '(+; -)' },
      { label: 'Síknegyed', value: 'IV. síknegyed' }
    ]
  },
  {
    id: 'lsq2-13',
    level: 2,
    prompt: 'Egy számgép szabálya: y = 3x + 4. Hogyan számolhatjuk ki visszafelé a bemenetet (x) a kimenetből (y)?',
    options: [
      'x = (y - 4) : 3 (először levonunk 4-et, majd elosztjuk 3-mal)',
      'x = y : 3 - 4',
      'x = (y + 4) · 3',
      'x = 3y + 4'
    ],
    correctAnswer: 0,
    explanation: 'Inverz műveletnél a műveletek sorrendje is megfordul: az utolsó lépés (+4) inverze az első (-4), az első lépés (·3) inverze az utolsó (:3).',
    hint: 'Ellentétes műveletek ellentétes sorrendben!',
    breakdown: [
      { label: 'Eredeti gép', value: '· 3 majd + 4' },
      { label: 'Inverz gép', value: '- 4 majd : 3' }
    ]
  },
  {
    id: 'lsq2-14',
    level: 2,
    prompt: 'Egy gyufaszál-háromszöglánc szabálya: y = 2n + 1, ahol n a háromszögek száma. Hány gyufaszál kell 8 darab háromszög kirakásához?',
    options: [
      '17 gyufaszál (mivel 2 · 8 + 1 = 17)',
      '16 gyufaszál',
      '24 gyufaszál',
      '19 gyufaszál'
    ],
    correctAnswer: 0,
    explanation: '2 · 8 + 1 = 16 + 1 = 17 gyufaszál szükséges.',
    hint: 'Kétszer nyolc meg egy = ?',
    breakdown: [
      { label: 'Képlet', value: '2n + 1' },
      { label: 'n = 8', value: '2 · 8 + 1 = 17' }
    ]
  },
  {
    id: 'lsq2-15',
    level: 2,
    prompt: 'Mennyi a lépéstávolság a P(-2; 3) és a Q(3; 3) pontok között a négyzethálón?',
    options: [
      '5 lépés (mivel az y koordináták azonosak, vízszintesen: |3 - (-2)| = 5)',
      '6 lépés',
      '4 lépés',
      '1 lépés'
    ],
    correctAnswer: 0,
    explanation: 'Mivel mindkét pont y koordinátája 3, egy vízszintes egyenesen fekszenek. Távolságuk: 3 - (-2) = 5 lépés.',
    hint: '3 és -2 távolsága a számegyenesen: 3 - (-2) = 5.',
    breakdown: [
      { label: 'x különbség', value: '|3 - (-2)| = 5' },
      { label: 'y különbség', value: '|3 - 3| = 0' },
      { label: 'Összes lépés', value: '5' }
    ]
  },
  {
    id: 'lsq2-16',
    level: 2,
    prompt: 'Mennyi az 5. háromszögszám értéke (T₅ = 1 + 2 + 3 + 4 + 5)?',
    options: [
      '15',
      '10',
      '20',
      '25'
    ],
    correctAnswer: 0,
    explanation: '1 + 2 + 3 + 4 + 5 = 15.',
    hint: 'Add össze az első 5 számot: 1 + 2 + 3 + 4 + 5.',
    breakdown: [
      { label: 'Összeadás', value: '1 + 2 + 3 + 4 + 5 = 15' }
    ]
  },
  {
    id: 'lsq2-17',
    level: 2,
    prompt: 'Mennyi az első 4 pozitív páratlan szám összege: 1 + 3 + 5 + 7?',
    options: [
      '16 (ami pontosan a 4² négyzetszám)',
      '15',
      '14',
      '18'
    ],
    correctAnswer: 0,
    explanation: '1 + 3 + 5 + 7 = 16 = 4². Az első n darab páratlan szám összege mindig n²!',
    hint: '1 + 3 + 5 + 7 = 16, ami 4 a négyzeten.',
    breakdown: [
      { label: 'Összeg', value: '16' },
      { label: 'Szabály', value: '4² = 16' }
    ]
  },
  {
    id: 'lsq2-18',
    level: 2,
    prompt: 'Egy számsorozat tagjai: 2, 4, 7, 11, 16, [?]. Mi a következő szám a sorban?',
    options: [
      '22 (mivel a lépésközök folyamatosan nőnek: +2, +3, +4, +5, +6)',
      '21',
      '20',
      '23'
    ],
    correctAnswer: 0,
    explanation: 'A lépésközök: 4-2=2, 7-4=3, 11-7=4, 16-11=5. A következő lépésköz +6, így 16 + 6 = 22.',
    hint: 'Nézd a különbségeket: +2, +3, +4, +5, következő: +6!',
    breakdown: [
      { label: 'Lépésközök', value: '+2, +3, +4, +5, +6' },
      { label: 'Következő tag', value: '16 + 6 = 22' }
    ]
  },
  {
    id: 'lsq2-19',
    level: 2,
    prompt: 'Egy sorminta 6 elemű periódussal ismétlődik. Mi lesz a sorozat 60. eleme?',
    options: [
      'A motívum 6. (legutolsó) eleme (mivel 60 : 6 = 10, a maradék 0)',
      'A motívum 1. eleme',
      'A motívum 2. eleme',
      'Nem határozható meg'
    ],
    correctAnswer: 0,
    explanation: 'A 60 pontosan osztható 6-tal, nincs maradék (maradék = 0). Ez azt jelenti, hogy a 10. teljes periódus pont a 6. elemmel zárul le.',
    hint: '60 osztható 6-tal, tehát a motívum záró eleme jön!',
    breakdown: [
      { label: '60 : 6', value: '10 (maradék 0)' },
      { label: 'Elem helye', value: '6. (záró) elem' }
    ]
  },
  {
    id: 'lsq2-20',
    level: 2,
    prompt: 'Hol helyezkedik el a koordináta-rendszerben az a pont, amelynek mindkét koordinátája 0: P(0; 0)?',
    options: [
      'Az origóban, a két koordináta-tengely metszéspontjában',
      'Csak az x-tengelyen',
      'Csak az y-tengelyen',
      'Az I. síknegyed közepén'
    ],
    correctAnswer: 0,
    explanation: 'A P(0; 0) pont az origó, amely egyszerre tartozik az x-tengelyhez és az y-tengelyhez is.',
    hint: 'Ez a kezdőpont: az origó.',
    breakdown: [
      { label: 'Koordináták', value: '(0; 0)' },
      { label: 'Helyzet', value: 'Origó' }
    ]
  },
  {
    id: 'lsq2-21',
    level: 2,
    prompt: 'Egy kockaépítmény felülnézetén egy 2x2-es négyzet látható, és mind a 4 mezőbe 2-es emeletszám van írva. Hány kiskockából épült fel a test?',
    options: [
      '8 kiskockából (mivel 4 mező · 2 emelet = 8)',
      '4 kiskockából',
      '6 kiskockából',
      '12 kiskockából'
    ],
    correctAnswer: 0,
    explanation: 'A 2x2-es rácson 4 pozíció van, mindegyiken 2 kocka magas oszlop áll: 4 · 2 = 8 kiskocka (egy 2x2x2-es kockát alkotnak!).',
    hint: '4 oszlop, mindegyik 2 kocka magas.',
    breakdown: [
      { label: 'Alaprajz mezői', value: '2 · 2 = 4 mező' },
      { label: 'Összes kocka', value: '4 · 2 = 8' }
    ]
  },
  {
    id: 'lsq2-22',
    level: 2,
    prompt: 'Egy téglalap három csúcsának koordinátái: A(1; 1), B(5; 1), C(5; 4). Mik a negyedik, D csúcs koordinátái?',
    options: [
      'D(1; 4)',
      'D(4; 1)',
      'D(1; 5)',
      'D(4; 5)'
    ],
    correctAnswer: 0,
    explanation: 'A téglalap oldalai párhuzamosak a tengelyekkel. A D csúcs x koordinátája megegyezik A x-ével (1), y koordinátája C y-ával (4): D(1; 4).',
    hint: 'D csúcs x-e mint A-é (1), y-ja mint C-é (4).',
    breakdown: [
      { label: 'x koordináta', value: '1' },
      { label: 'y koordináta', value: '4' },
      { label: 'D csúcs', value: 'D(1; 4)' }
    ]
  },
  {
    id: 'lsq2-23',
    level: 2,
    prompt: 'Egy számsorozat szabálya: a₁ = 100, és minden lépésben feleződik (:2). Mi a sorozat 4. tagja?',
    options: [
      '12,5 (mivel 100 &rarr; 50 &rarr; 25 &rarr; 12,5)',
      '25',
      '12',
      '6,25'
    ],
    correctAnswer: 0,
    explanation: '1. tag: 100; 2. tag: 50; 3. tag: 25; 4. tag: 25 : 2 = 12,5.',
    hint: '100 fele 50, annak fele 25, annak fele ?',
    breakdown: [
      { label: 'Tagok', value: '100, 50, 25, 12.5' },
      { label: '4. tag', value: '12,5' }
    ]
  },
  {
    id: 'lsq2-24',
    level: 2,
    prompt: 'Egy számgép értéktáblázata: ha x = 2, akkor y = 7; ha x = 3, akkor y = 10; ha x = 4, akkor y = 13. Mi a gép működési szabálya?',
    options: [
      'y = 3x + 1 (mivel a lépésköz 3, és 3 · 2 + 1 = 7)',
      'y = 2x + 3',
      'y = 4x - 1',
      'y = 3x - 1'
    ],
    correctAnswer: 0,
    explanation: 'Amikor x nő 1-gyel, y nő 3-mal &rarr; a szorzó 3. x = 2 esetén 3 · 2 = 6, amihez 1-et kell adni, hogy 7 legyen: y = 3x + 1.',
    hint: 'Lépésköz: 10 - 7 = 3. Próbáld ki a 3x + 1 képletet!',
    breakdown: [
      { label: 'Lépésköz', value: '+3' },
      { label: 'Szabály', value: 'y = 3x + 1' }
    ]
  },
  {
    id: 'lsq2-25',
    level: 2,
    prompt: 'Mennyi a Fibonacci-sorozat 6. és 7. tagja, ha az első 5 tag: 1, 1, 2, 3, 5?',
    options: [
      '8 és 13 (mivel 3 + 5 = 8, és 5 + 8 = 13)',
      '7 és 12',
      '8 és 12',
      '10 és 15'
    ],
    correctAnswer: 0,
    explanation: '6. tag: 3 + 5 = 8. 7. tag: 5 + 8 = 13.',
    hint: 'Add össze az előző kettőt!',
    breakdown: [
      { label: '6. tag', value: '3 + 5 = 8' },
      { label: '7. tag', value: '5 + 8 = 13' }
    ]
  },
  {
    id: 'lsq2-26',
    level: 2,
    prompt: 'Melyik tulajdonság igaz kivétel nélkül az x-tengelyen fekvő ÖSSZES pontra?',
    options: [
      'A függőleges y-koordinátájuk mindig pontosan 0',
      'A vízszintes x-koordinátájuk mindig pozitív',
      'A vízszintes x-koordinátájuk mindig pontosan 0',
      'Mindkét koordinátájuk egyenlő'
    ],
    correctAnswer: 0,
    explanation: 'Minden pont, amely az x-tengelyen fekszik, y = 0 értékkel bír, alakja P(x; 0).',
    hint: 'Az x-tengely egyenlete: y = 0.',
    breakdown: [
      { label: 'x-tengely pontjai', value: '(x; 0)' }
    ]
  },
  {
    id: 'lsq2-27',
    level: 2,
    prompt: 'Melyik tulajdonság igaz kivétel nélkül az y-tengelyen fekvő ÖSSZES pontra?',
    options: [
      'A vízszintes x-koordinátájuk mindig pontosan 0',
      'A függőleges y-koordinátájuk mindig pozitív',
      'A függőleges y-koordinátájuk mindig pontosan 0',
      'Az x és y koordinátájuk összege 0'
    ],
    correctAnswer: 0,
    explanation: 'Minden pont, amely az y-tengelyen fekszik, x = 0 értékkel bír, alakja P(0; y).',
    hint: 'Az y-tengely egyenlete: x = 0.',
    breakdown: [
      { label: 'y-tengely pontjai', value: '(0; y)' }
    ]
  },
  {
    id: 'lsq2-28',
    level: 2,
    prompt: 'Mi a szabály a következő számsorozatban: 64, 32, 16, 8, 4 ?',
    options: [
      'Minden tagot elosztunk 2-vel (: 2)',
      'Minden tagból kivonunk 32-t',
      'Minden tagot megszorzunk 2-vel',
      'Minden tagból kivonunk 8-at'
    ],
    correctAnswer: 0,
    explanation: '64 : 2 = 32, 32 : 2 = 16, 16 : 2 = 8, 8 : 2 = 4. A sorozat minden lépésben feleződik.',
    hint: 'Mindegyik az előző számnak a fele.',
    breakdown: [
      { label: 'Művelet', value: ': 2' }
    ]
  },
  {
    id: 'lsq2-29',
    level: 2,
    prompt: 'A torpedó játékban a hajód a B2, B3 és B4 mezőket foglalja el. Hány mező hosszú a hajó és hogyan helyezkedik el?',
    options: [
      '3 mező hosszú és függőlegesen áll (ugyanabban a B oszlopban)',
      '3 mező hosszú és vízszintesen áll',
      '2 mező hosszú és átlósan áll',
      '4 mező hosszú és függőlegesen áll'
    ],
    correctAnswer: 0,
    explanation: 'Mivel az oszlop azonos (B), és a sorok 2, 3, 4, a hajó 3 egység hosszú és függőleges tájolású.',
    hint: 'B oszlop 2, 3, 4 sora: függőleges, 3 mező.',
    breakdown: [
      { label: 'Oszlop', value: 'B (azonos)' },
      { label: 'Sorok', value: '2, 3, 4 (3 mező)' }
    ]
  },
  {
    id: 'lsq2-30',
    level: 2,
    prompt: 'Mennyi a 6. négyzetszám (6²) értéke?',
    options: [
      '36',
      '30',
      '42',
      '24'
    ],
    correctAnswer: 0,
    explanation: '6 · 6 = 36.',
    hint: 'Hatszor hat = 36.',
    breakdown: [
      { label: '6 · 6', value: '36' }
    ]
  },

  // =========================================================================
  // 3. SZINT: FEJEZETI MESTERFELADATOK ÉS SZINTÉZIS (1-30)
  // =========================================================================
  {
    id: 'lsq3-1',
    level: 3,
    prompt: 'Egy számtani sorozat 1. tagja a₁ = 4, az állandó lépésköz d = 6. Mennyi a sorozat 10. tagja (a₁₀)?',
    options: [
      '58 (mivel a₁₀ = 4 + 9 · 6 = 4 + 54 = 58)',
      '64',
      '60',
      '52'
    ],
    correctAnswer: 0,
    explanation: 'A 10. taghoz 9 darab lépésközt kell hozzáadni az 1. taghoz: 4 + 9 · 6 = 4 + 54 = 58.',
    hint: 'a₁ + 9 · d képlet: 4 + 9 · 6 = ?',
    breakdown: [
      { label: 'Képlet', value: 'a₁ + (n - 1) · d' },
      { label: 'Számolás', value: '4 + 9 · 6 = 58' }
    ]
  },
  {
    id: 'lsq3-2',
    level: 3,
    prompt: 'Egy P(4; -3) pontot tükrözünk a vízszintes x-tengelyre. Mik lesznek a P\' tükörkép koordinátái?',
    options: [
      "P'(4; 3) (az x változatlan marad, az y előjelet vált)",
      "P'(-4; -3)",
      "P'(-4; 3)",
      "P'(3; -4)"
    ],
    correctAnswer: 0,
    explanation: 'Az x-tengelyre való tükrözésnél a vízszintes helyzet (x = 4) nem változik, de a pont a tengely túloldalára kerül, így az y koordinátája ellentétes előjelű lesz (-3 &rarr; +3).',
    hint: 'x-tengely tükrözésnél az x marad, csak az y vált előjelet!',
    breakdown: [
      { label: 'Eredeti pont', value: 'P(4; -3)' },
      { label: 'Tükörkép', value: "P'(4; 3)" }
    ]
  },
  {
    id: 'lsq3-3',
    level: 3,
    prompt: 'Mennyi az első 9 pozitív páratlan szám összege: 1 + 3 + 5 + 7 + 9 + 11 + 13 + 15 + 17?',
    options: [
      '81 (mivel az első n páratlan szám összege n², és 9² = 81)',
      '90',
      '80',
      '79'
    ],
    correctAnswer: 0,
    explanation: 'Az első n darab páratlan szám összege mindig pontosan n². 9 szám esetén: 9² = 81.',
    hint: '9 páratlan szám összege = 9² = ?',
    breakdown: [
      { label: 'Összeg szabály', value: 'n²' },
      { label: '9²', value: '81' }
    ]
  },
  {
    id: 'lsq3-4',
    level: 3,
    prompt: 'Egy sorminta motívuma 5 elemből áll: [A, B, C, D, E]. Hányadik elem a sorban a 200. betű?',
    options: [
      'Az E betű (mivel 200 = 5 · 40 + 0, nincs maradék &rarr; a motívum legutolsó eleme)',
      'Az A betű',
      'A B betű',
      'A C betű'
    ],
    correctAnswer: 0,
    explanation: '200 : 5 = 40, a maradék 0. A 0 maradék azt jelenti, hogy egy teljes ciklus zárult le, tehát a motívum utolsó (5.) eleme, az E betű a 200. tag.',
    hint: '200 pontosan osztható 5-tel, így a motívum záró eleme jön!',
    breakdown: [
      { label: '200 : 5', value: '40 (maradék 0)' },
      { label: '200. elem', value: 'E (utolsó elem)' }
    ]
  },
  {
    id: 'lsq3-5',
    level: 3,
    prompt: 'Mennyi a Fibonacci-sorozat 8. tagja (F₈), ha az első 7 tag: 1, 1, 2, 3, 5, 8, 13, [?] ?',
    options: [
      '21 (mivel 8 + 13 = 21)',
      '19',
      '24',
      '26'
    ],
    correctAnswer: 0,
    explanation: 'Az utolsó két tag a 8 és a 13. Összegük: 8 + 13 = 21.',
    hint: 'Add össze az utolsó két tagot: 8 + 13 = ?',
    breakdown: [
      { label: 'F₆ + F₇', value: '8 + 13' },
      { label: 'F₈', value: '21' }
    ]
  },
  {
    id: 'lsq3-6',
    level: 3,
    prompt: 'Melyik szám az egyetlen 1-nél nagyobb szám az első 100 szám között, amely EGYSZERRE háromszögszám (T₈) és négyzetszám (6²) is?',
    options: [
      '36',
      '25',
      '49',
      '64'
    ],
    correctAnswer: 0,
    explanation: '6 · 6 = 36 (négyzetszám), és 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = 36 (háromszögszám).',
    hint: '6 négyzete = 36, és 1-től 8-ig az összeg is 36.',
    breakdown: [
      { label: '6²', value: '36' },
      { label: 'T₈', value: '36' }
    ]
  },
  {
    id: 'lsq3-7',
    level: 3,
    prompt: 'Egy robot az origóról O(0; 0) indul. Lép: 4-et jobbra, 3-at fel, 2-t balra, majd 5-öt le. Melyik pontba érkezik a robot?',
    options: [
      'P(2; -2) (mivel x = 4 - 2 = 2, y = 3 - 5 = -2)',
      'P(-2; 2)',
      'P(2; 2)',
      'P(6; -2)'
    ],
    correctAnswer: 0,
    explanation: 'x tengelyen: +4 - 2 = +2. y tengelyen: +3 - 5 = -2. Az érkezési pont P(2; -2), ami a IV. síknegyedben van.',
    hint: 'Vízszintes: +4 - 2 = 2. Függőleges: +3 - 5 = -2.',
    breakdown: [
      { label: 'x koordináta', value: '4 - 2 = 2' },
      { label: 'y koordináta', value: '3 - 5 = -2' },
      { label: 'Végpont', value: 'P(2; -2)' }
    ]
  },
  {
    id: 'lsq3-8',
    level: 3,
    prompt: 'Egy gyufaszál-háromszöglánc szabálya: y = 2x + 1, ahol x a háromszögek száma. Hány háromszögből áll a lánc, ha pontosan 31 gyufaszálat használtunk fel?',
    options: [
      '15 háromszögből (mivel 2x + 1 = 31 &rarr; 2x = 30 &rarr; x = 15)',
      '16 háromszögből',
      '14 háromszögből',
      '30 háromszögből'
    ],
    correctAnswer: 0,
    explanation: 'Egyenlet: 2x + 1 = 31. Kivonunk 1-et: 2x = 30. Osztunk 2-vel: x = 15 háromszög.',
    hint: '31 - 1 = 30, mennyi a 30 fele?',
    breakdown: [
      { label: '2x + 1 = 31', value: '2x = 30' },
      { label: 'x értéke', value: '15 háromszög' }
    ]
  },
  {
    id: 'lsq3-9',
    level: 3,
    prompt: 'Miért pont a szomszédos Fibonacci-számok párjaiból (pl. 34 és 55) állnak a napraforgó magtányérjának magspiráljai?',
    options: [
      'Mert ez az aranymetszésen alapuló matematikai szög biztosítja a magok legtökéletesebb, hézagmentes helykihasználását',
      'Mert a napraforgó csak páratlan számú magot tud növeszteni',
      'Véletlen egybeesés, nincs matematikai oka',
      'Mert a szél iránya így forgatja a virágot'
    ],
    correctAnswer: 0,
    explanation: 'A természetben az optimális fény- és helykihasználás vezet a Fibonacci-számokhoz: a szomszédos Fibonacci-számok aránya az aranymetszéshez tart, amely a legkevésbé hagy üres helyet a magok között.',
    hint: 'A legtökéletesebb helykihasználás miatt.',
    breakdown: [
      { label: 'Biológiai ok', value: 'Hézagmentes magtömörítés' },
      { label: 'Matematika', value: 'Fibonacci és aranymetszés' }
    ]
  },
  {
    id: 'lsq3-10',
    level: 3,
    prompt: 'Melyik összefoglaló állítás fogalmazza meg a koordináta-rendszer és a sorozatok mély kapcsolatát?',
    options: [
      'A számsorozatok tagjai és sorszámai koordinátapárokként (n; aₙ) ábrázolhatók a síkban, ahol a pontok kirajzolják a sorozat szabályának vonalát vagy görbéjét',
      'Nincs semmilyen kapcsolat a koordináta-rendszer és a számsorozatok között',
      'Csak a páros számokat lehet koordináta-rendszerben ábrázolni',
      'A sorozatokat csak egyenes vonalon lehet vizsgálni'
    ],
    correctAnswer: 0,
    explanation: 'Ha egy számsorozat n sorszámát választjuk x-nek, és az aₙ tag értékét y-nak, a pontok egy síkbeli grafikont alkotnak (pl. az állandó lépésközű sorozat pontjai egy egyenesre esnek!).',
    hint: 'A sorozat pontjai a síkban koordinátapárok: (sorszám; érték).',
    breakdown: [
      { label: 'x koordináta', value: 'n (sorszám)' },
      { label: 'y koordináta', value: 'aₙ (érték)' },
      { label: 'Szemléltetés', value: 'Pontok a síkban, egyenes vagy görbe' }
    ]
  },
  {
    id: 'lsq3-11',
    level: 3,
    prompt: 'Egy P(3; 5) pontot tükrözünk az origóra O(0; 0). Mik lesznek a P\' tükörkép koordinátái?',
    options: [
      "P'(-3; -5) (az origóra való tükrözésnél mindkét koordináta ellentétes előjelűvé válik)",
      "P'(3; -5)",
      "P'(-3; 5)",
      "P'(5; 3)"
    ],
    correctAnswer: 0,
    explanation: 'Origóra való középpontos tükrözésnél mind az x, mind az y koordináta ellentétes előjelre vált: (3; 5) &rarr; (-3; -5).',
    hint: 'Origó tükrözésnél mindkét előjel megfordul!',
    breakdown: [
      { label: 'Eredeti pont', value: 'P(3; 5)' },
      { label: 'Tükörkép', value: "P'(-3; -5)" }
    ]
  },
  {
    id: 'lsq3-12',
    level: 3,
    prompt: 'Egy P(-5; 2) pontot tükrözünk a függőleges y-tengelyre. Mik lesznek a P\' koordinátái?',
    options: [
      "P'(5; 2) (csak a vízszintes x koordináta vált előjelet, az y változatlan marad)",
      "P'(-5; -2)",
      "P'(5; -2)",
      "P'(2; -5)"
    ],
    correctAnswer: 0,
    explanation: 'Az y-tengelyre tükrözve a függőleges magasság (y = 2) azonos marad, de a bal oldalról a jobb oldalra kerül a pont, így x = -5 helyett +5 lesz: P\'(5; 2).',
    hint: 'y-tengely tükrözésnél az y marad, az x vált előjelet!',
    breakdown: [
      { label: 'Eredeti pont', value: 'P(-5; 2)' },
      { label: 'Tükörkép', value: "P'(5; 2)" }
    ]
  },
  {
    id: 'lsq3-13',
    level: 3,
    prompt: 'Egy számtani sorozatban a₁ = 12 és a₄ = 27. Mennyi az állandó lépésköz (d)?',
    options: [
      'd = 5 (mivel a 4. taghoz 3 lépésköz kell: (27 - 12) : 3 = 15 : 3 = 5)',
      'd = 4',
      'd = 6',
      'd = 3'
    ],
    correctAnswer: 0,
    explanation: 'a₄ = a₁ + 3d &rarr; 27 = 12 + 3d &rarr; 15 = 3d &rarr; d = 5.',
    hint: '1. tagtól a 4. tagig 3 ugrás van: 27 - 12 = 15, 15 : 3 = ?',
    breakdown: [
      { label: 'Különbség', value: '27 - 12 = 15' },
      { label: 'Lépések száma', value: '4 - 1 = 3' },
      { label: 'Lépésköz d', value: '15 : 3 = 5' }
    ]
  },
  {
    id: 'lsq3-14',
    level: 3,
    prompt: 'Egy számgép szabálya: y = 4x - 7. Ha a kimenet y = 45, mennyi volt a bemeneti szám (x)?',
    options: [
      'x = 13 (inverz: (45 + 7) : 4 = 52 : 4 = 13)',
      'x = 12',
      'x = 14',
      'x = 11'
    ],
    correctAnswer: 0,
    explanation: 'Inverz művelet: 45 + 7 = 52. 52 : 4 = 13.',
    hint: 'Adj hozzá 7-et, majd oszd el 4-gyel!',
    breakdown: [
      { label: '1. lépés', value: '45 + 7 = 52' },
      { label: '2. lépés', value: '52 : 4 = 13' }
    ]
  },
  {
    id: 'lsq3-15',
    level: 3,
    prompt: 'Mennyi a 10. háromszögszám értéke (T₁₀ = 1 + 2 + 3 + ... + 10)?',
    options: [
      '55 (ez a szám egyben a 10. Fibonacci-szám is!)',
      '50',
      '45',
      '60'
    ],
    correctAnswer: 0,
    explanation: 'Gauss-módszerrel: (10 · 11) : 2 = 110 : 2 = 55. Érdekesség: a 10. háromszögszám megegyezik a 10. Fibonacci-számmal!',
    hint: '(10 · 11) : 2 = 55.',
    breakdown: [
      { label: 'Képlet', value: 'n(n+1) : 2' },
      { label: 'Számítás', value: '(10 · 11) : 2 = 55' }
    ]
  },
  {
    id: 'lsq3-16',
    level: 3,
    prompt: 'Mennyi az első 12 pozitív páratlan szám összege?',
    options: [
      '144 (mivel 12² = 144, ami egyben a 12. Fibonacci-szám is)',
      '120',
      '132',
      '156'
    ],
    correctAnswer: 0,
    explanation: 'Az első n páratlan szám összege n². 12 páratlan szám összege: 12² = 144. Ez a szám a 12. Fibonacci-szám is!',
    hint: 'Tizenkettő a négyzeten.',
    breakdown: [
      { label: 'Szabály', value: 'n²' },
      { label: '12²', value: '144' }
    ]
  },
  {
    id: 'lsq3-17',
    level: 3,
    prompt: 'Mennyi a lépéstávolság (Manhattan-távolság) a P(-3; 4) és a Q(5; -2) pontok között a négyzethálón?',
    options: [
      '14 lépés (|5 - (-3)| + |-2 - 4| = 8 + 6 = 14)',
      '10 lépés',
      '12 lépés',
      '16 lépés'
    ],
    correctAnswer: 0,
    explanation: 'Vízszintes távolság: |5 - (-3)| = 8. Függőleges távolság: |-2 - 4| = 6. Összes lépés: 8 + 6 = 14 lépés.',
    hint: 'Vízszintes: 5 - (-3) = 8. Függőleges: 4 - (-2) = 6. Add össze őket!',
    breakdown: [
      { label: 'x távolság', value: '8' },
      { label: 'y távolság', value: '6' },
      { label: 'Összeg', value: '14' }
    ]
  },
  {
    id: 'lsq3-18',
    level: 3,
    prompt: 'Egy négyzet három csúcsa: A(2; 2), B(6; 2), C(6; 6). Mik a D csúcs koordinátái, és mekkora a négyzet területe?',
    options: [
      'D(2; 6), területe 16 területegység (oldalhossz = 4, terület: 4 · 4 = 16)',
      'D(2; 4), területe 12',
      'D(4; 6), területe 16',
      'D(2; 6), területe 8'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet oldala: 6 - 2 = 4 egység. A D csúcs: (2; 6). Területe: 4 · 4 = 16 területegység.',
    hint: 'Oldalhossz: 6 - 2 = 4. Terület: 4 · 4 = 16.',
    breakdown: [
      { label: 'Oldalhossz', value: '4 egység' },
      { label: 'D csúcs', value: 'D(2; 6)' },
      { label: 'Terület', value: '4 · 4 = 16' }
    ]
  },
  {
    id: 'lsq3-19',
    level: 3,
    prompt: 'Egy háromszög csúcsai: A(1; 1), B(7; 1), C(4; 5). Mennyi a háromszög AB alapjának hossza és a magassága?',
    options: [
      'Alapja 6 egység, magassága 4 egység',
      'Alapja 7 egység, magassága 5 egység',
      'Alapja 6 egység, magassága 5 egység',
      'Alapja 8 egység, magassága 4 egység'
    ],
    correctAnswer: 0,
    explanation: 'Az AB alap vízszintes: hossza 7 - 1 = 6 egység. A magasság az alap (y = 1) és a C csúcs (y = 5) távolsága: 5 - 1 = 4 egység.',
    hint: 'Alap: 7 - 1 = 6. Magasság: 5 - 1 = 4.',
    breakdown: [
      { label: 'Alap', value: '7 - 1 = 6 egység' },
      { label: 'Magasság', value: '5 - 1 = 4 egység' }
    ]
  },
  {
    id: 'lsq3-20',
    level: 3,
    prompt: 'Egy számsorozat szabálya: a₁ = 1, és minden következő tag a_{n+1} = 3 · a_n - 1. Mik a sorozat első 4 tagja?',
    options: [
      '1, 2, 5, 14',
      '1, 3, 8, 23',
      '1, 2, 6, 18',
      '1, 4, 11, 32'
    ],
    correctAnswer: 0,
    explanation: 'a₁ = 1; a₂ = 3 · 1 - 1 = 2; a₃ = 3 · 2 - 1 = 5; a₄ = 3 · 5 - 1 = 14.',
    hint: 'Szorozz 3-mal, vonj ki 1-et!',
    breakdown: [
      { label: '1. tag', value: '1' },
      { label: '2. tag', value: '3 · 1 - 1 = 2' },
      { label: '3. tag', value: '3 · 2 - 1 = 5' },
      { label: '4. tag', value: '3 · 5 - 1 = 14' }
    ]
  },
  {
    id: 'lsq3-21',
    level: 3,
    prompt: 'Egy sorminta 7 betűs alapszakasza: [H, E, L, Y, M, E, G]. Mi lesz a sorozat 703. betűje?',
    options: [
      'Az L betű (mivel 703 = 7 · 100 + 3, a maradék 3 &rarr; a 3. betű)',
      'A H betű',
      'Az E betű',
      'Az Y betű'
    ],
    correctAnswer: 0,
    explanation: '703 : 7 = 100, a maradék 3. A motívum 3. betűje az L betű.',
    hint: '703 osztva 7-tel: maradék 3. A 3. betűt keresd!',
    breakdown: [
      { label: '703 : 7', value: '100 (maradék 3)' },
      { label: '3. betű', value: 'L' }
    ]
  },
  {
    id: 'lsq3-22',
    level: 3,
    prompt: 'Két szomszédos Fibonacci-szám: F₉ = 34 és F₁₀ = 55. Mennyi a 11. Fibonacci-szám (F₁₁)?',
    options: [
      '89 (mivel 34 + 55 = 89)',
      '99',
      '85',
      '90'
    ],
    correctAnswer: 0,
    explanation: 'F₁₁ = F₉ + F₁₀ = 34 + 55 = 89.',
    hint: 'Add össze a 34-et és az 55-öt!',
    breakdown: [
      { label: 'Összeg', value: '34 + 55 = 89' }
    ]
  },
  {
    id: 'lsq3-23',
    level: 3,
    prompt: 'Egy számtani sorozatban a₅ = 23 és a₈ = 35. Mennyi a sorozat kezdőtagja (a₁)?',
    options: [
      'a₁ = 7 (mivel a lépésköz d = (35 - 23) : 3 = 4, és a₁ = 23 - 4 · 4 = 7)',
      'a₁ = 5',
      'a₁ = 9',
      'a₁ = 3'
    ],
    correctAnswer: 0,
    explanation: 'a₈ - a₅ = 3d &rarr; 35 - 23 = 12 &rarr; d = 4. a₁ = a₅ - 4d = 23 - 16 = 7.',
    hint: '3 lépés alatt 12-t nő (d = 4). Menj vissza 4 lépést az 5. tagtól!',
    breakdown: [
      { label: 'Lépésköz d', value: '12 : 3 = 4' },
      { label: 'a₁ értéke', value: '23 - 4 · 4 = 7' }
    ]
  },
  {
    id: 'lsq3-24',
    level: 3,
    prompt: 'Egy kockaépítmény elöl-, oldal- és felülnézete is egy-egy 3x3-as négyzet (mindegyik nézetben 9 négyzet látszik). Legkevesebb hány kiskockából épülhetett fel egy ilyen építmény?',
    options: [
      'Legkevesebb 9 kockából (ha a kockákat átlósan vagy eltolva helyezzük el)',
      'Legkevesebb 27 kockából',
      'Legkevesebb 18 kockából',
      'Legkevesebb 12 kockából'
    ],
    correctAnswer: 0,
    explanation: 'Ügyes elrendezéssel (pl. minden sorban és oszlopban 1 kocka megfelelő magasságban) mindössze 9 kiskocka elegendő a 3x3-as nézetek kitöltéséhez.',
    hint: 'Nem kell tömör kocka: 9 kocka elegendő!',
    breakdown: [
      { label: 'Minimális kockaszám', value: '9 darab' }
    ]
  },
  {
    id: 'lsq3-25',
    level: 3,
    prompt: 'Egy számgép összetett szabálya: „szorozz 2-vel, adj hozzá 5-öt, majd az eredményt oszd el 3-mal”. Ha a bemenet x = 11, mennyi a kimenet y?',
    options: [
      'y = 9 (mivel (11 · 2 + 5) : 3 = (22 + 5) : 3 = 27 : 3 = 9)',
      'y = 8',
      'y = 10',
      'y = 7'
    ],
    correctAnswer: 0,
    explanation: '11 · 2 = 22; 22 + 5 = 27; 27 : 3 = 9.',
    hint: '11 · 2 = 22, 22 + 5 = 27, 27 : 3 = ?',
    breakdown: [
      { label: '1. lépés', value: '11 · 2 = 22' },
      { label: '2. lépés', value: '22 + 5 = 27' },
      { label: '3. lépés', value: '27 : 3 = 9' }
    ]
  },
  {
    id: 'lsq3-26',
    level: 3,
    prompt: 'Melyik pont van a legközelebb az origóhoz lépéstávolságban mérve a négyzethálón?',
    options: [
      'P(1; 1) (lépéstávolsága: |1| + |1| = 2 lépés)',
      'Q(2; 1) (lépéstávolsága: 3 lépés)',
      'R(0; 3) (lépéstávolsága: 3 lépés)',
      'S(-2; -2) (lépéstávolsága: 4 lépés)'
    ],
    correctAnswer: 0,
    explanation: 'P(1; 1) távolsága: 1 + 1 = 2 lépés. A többi pont távolsága legalább 3 lépés.',
    hint: 'Add össze a koordináták abszolútértékét: 1 + 1 = 2.',
    breakdown: [
      { label: 'P(1; 1) távolsága', value: '2 lépés (legkisebb)' }
    ]
  },
  {
    id: 'lsq3-27',
    level: 3,
    prompt: 'Egy tengelyekkel párhuzamos oldalú téglalap átlójának két végpontja: A(-2; -1) és C(4; 3). Mik a másik két csúcs (B és D) koordinátái?',
    options: [
      'B(4; -1) és D(-2; 3)',
      'B(4; 1) és D(-2; -3)',
      'B(2; -1) és D(-4; 3)',
      'B(1; 4) és D(3; -2)'
    ],
    correctAnswer: 0,
    explanation: 'B koordinátái: (C_x; A_y) = (4; -1). D koordinátái: (A_x; C_y) = (-2; 3).',
    hint: 'A csúcsok x és y koordinátáinak kombinációi!',
    breakdown: [
      { label: 'B csúcs', value: '(4; -1)' },
      { label: 'D csúcs', value: '(-2; 3)' }
    ]
  },
  {
    id: 'lsq3-28',
    level: 3,
    prompt: 'Milyen kapcsolat van bármely két szomszédos négyzetszám különbsége és a páratlan számok között?',
    options: [
      'Két szomszédos négyzetszám különbsége mindig a soron következő páratlan szám (pl. 4² - 3² = 16 - 9 = 7)',
      'Két szomszédos négyzetszám különbsége mindig páros szám',
      'A különbség mindig állandó szám',
      'Nincs összefüggés köztük'
    ],
    correctAnswer: 0,
    explanation: '(n + 1)² - n² = 2n + 1, ami pontosan a következő páratlan szám. Ezért az első n páratlan szám összege adja vissza az n² négyzetszámot!',
    hint: 'Pl. 4 - 1 = 3; 9 - 4 = 5; 16 - 9 = 7... mindegyik páratlan szám!',
    breakdown: [
      { label: 'Példa', value: '16 - 9 = 7 (páratlan)' },
      { label: 'Szabály', value: '(n+1)² - n² = 2n + 1' }
    ]
  },
  {
    id: 'lsq3-29',
    level: 3,
    prompt: 'Egy robot az origóról O(0; 0) indul, és spirálisan lépdel a rácson: 1-et jobbra, 1-et fel, 2-t balra, majd 2-t le. Melyik pontban áll a 4 lépésszakasz után?',
    options: [
      'P(-1; -1) (mivel x = 1 - 2 = -1, és y = 1 - 2 = -1)',
      'P(1; 1)',
      'P(-2; -2)',
      'P(0; 0)'
    ],
    correctAnswer: 0,
    explanation: 'x: +1 - 2 = -1. y: +1 - 2 = -1. A végpont a III. síknegyedben lévő P(-1; -1).',
    hint: 'Vízszintesen: +1 - 2 = -1. Függőlegesen: +1 - 2 = -1.',
    breakdown: [
      { label: 'x végső helyzet', value: '1 - 2 = -1' },
      { label: 'y végső helyzet', value: '1 - 2 = -1' },
      { label: 'Pont', value: 'P(-1; -1)' }
    ]
  },
  {
    id: 'lsq3-30',
    level: 3,
    prompt: 'Melyik mély elv magyarázza meg, miért jelennek meg a Fibonacci-számok, a háromszögszámok és a koordináták a természetben és a művészetben egyaránt?',
    options: [
      'Mert a matematika a ritmusok, alakzatok és szabályok egyetemes nyelve, amellyel a természet és az ember a legoptimálisabb felépítésre törekszik',
      'Mert a természeti formákat mesterségesen tervezték matematikai tankönyvek alapján',
      'Ez csupán a képzeletünk játéka, nincsenek valódi matematikai szabályok a valóságban',
      'Mert minden növény pontosan 10-es számrendszerben fejlődik'
    ],
    correctAnswer: 0,
    explanation: 'A természetben a leghatékonyabb térkitöltés, a növekedési ritmusok és az optimális energiamegosztás automatikusan a Fibonacci-arányokhoz és szabályos mintázatokhoz vezet.',
    hint: 'A matematika a természet leíró nyelve.',
    breakdown: [
      { label: 'Alapelmélet', value: 'Természet és matematika szintézise' }
    ]
  }
];

const LEVEL_CHEAT_SHEETS: Record<DifficultyLevel, CheatSheetCard[]> = {
  1: [
    {
      id: 'cs1-1',
      title: 'Koordináta Alapok',
      badge: 'ALAPOK',
      description: 'Origó O(0; 0). Rendezett számpár P(x; y): először x (vízszintes), utána y (függőleges). I. negyed: (+; +).',
      formula: 'P(x; y)',
      note: 'A sorrend kötött: (vízszintes; függőleges)!'
    },
    {
      id: 'cs1-2',
      title: 'Sorminták és Sorozatok',
      badge: 'RITMUS',
      description: 'Ismétlődő motívum = alapszakasz. Számsorozat lépésköze: szomszédos tagok különbsége. Négyzetszám: n².',
      note: 'A sorszám maradékos osztásával megkapod a díszítősor n-edik elemét.'
    }
  ],
  2: [
    {
      id: 'cs2-1',
      title: 'Tengelyek és Síknegyedek',
      badge: 'TÉRKÉP',
      description: 'X-tengelyen: (x; 0). Y-tengelyen: (0; y). II. negyed: (-; +), III. negyed: (-; -), IV. negyed: (+; -).',
      formula: 'd_{Manhattan} = |x_2 - x_1| + |y_2 - y_1|',
      note: 'Lépéstávolság = vízszintes + függőleges távolság.'
    },
    {
      id: 'cs2-2',
      title: 'Számgép és Inverz Művelet',
      badge: 'SZÁMOLÁS',
      description: 'Ha y = ax + b, akkor visszafelé x = (y - b) : a. Ellentétes műveletek ellentétes sorrendben!',
      note: 'Két szomszédos háromszögszám összege mindig négyzetszám!'
    }
  ],
  3: [
    {
      id: 'cs3-1',
      title: 'Számtani és Fibonacci Képletek',
      badge: 'KÉPLETEK',
      description: 'a_n = a_1 + (n - 1) · d. Fibonacci: F_n = F_{n-1} + F_{n-2}. Első n páratlan összege: n².',
      formula: 'a_n = a_1 + (n - 1)d \\quad | \\quad F_n = F_{n-1} + F_{n-2}',
      note: '36 = 6² = T₈. 55 = T₁₀ = F₁₀. 144 = 12² = F₁₂.'
    },
    {
      id: 'cs3-2',
      title: 'Geometria és Természet',
      badge: 'SZINTÉZIS',
      description: 'Tükrözés x-tengelyre: (x; -y). Napraforgó és fenyőtoboz spiráljai: szomszédos Fibonacci-számok.',
      note: 'A matematika a természet leíró nyelve!'
    }
  ]
};

export const LocationSummaryQuiz: React.FC<LocationSummaryQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-loc-summary-quiz"
      title="Helymeghatározás, sorozatok összefoglaló kvíz"
      subtitle="90 feladat 3 szinten (szintenként 30 kérdés): a fejezet 4 alappillérének teljes felmérése és záró játékmódok"
      questions={LOCATION_SUMMARY_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-location-summary-quiz"
      storageKey="g5-loc-summary-quiz"
      cheatSheetCards={LEVEL_CHEAT_SHEETS}
      matcherComponent={LocationSummaryMatcher}
      sorterComponent={LocationSummarySorter}
    />
  );
};
