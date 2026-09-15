import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { RationalSetMatcher } from './RationalSetMatcher';
import { RationalSetSorter } from './RationalSetSorter';
import { Binary, Calculator, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';

interface RationalSetQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Racionális Számok (ℚ)',
    icon: <Binary className="w-4 h-4 text-emerald-600" />,
    formula: 'ℚ = { a/b | a, b ∈ ℤ, b ≠ 0 }',
    note: 'Minden szám, amely felírható két egész szám hányadosaként. Lánc: ℕ ⊂ ℤ ⊂ ℚ.'
  },
  {
    id: 'c2',
    title: 'Véges Tizedestört Feltétele',
    icon: <Calculator className="w-4 h-4 text-blue-600" />,
    formula: 'Egyszerűsített nevezőben csak 2 és 5 prím szerepelhet',
    note: 'Pl. 3/8 = 0.375 (8 = 2³), míg 1/6 = 0.16̇ (6 = 2 · 3, a 3 miatt végtelen szakaszos).'
  },
  {
    id: 'c3',
    title: 'Szakaszos Tört Átírása',
    icon: <Sparkles className="w-4 h-4 text-purple-600" />,
    formula: '0.ȧ = a/9  |  0.aḃ = ab/99  |  0.aḃc = ...',
    note: 'Pl. 0.7̇ = 7/9,  0.45̇ = 45/99 = 5/11,  0.16̇ = (16-1)/90 = 15/90 = 1/6.'
  },
  {
    id: 'c4',
    title: 'Ellentett, Abszolútérték, Reciprok',
    icon: <HelpCircle className="w-4 h-4 text-teal-600" />,
    formula: 'Ellentett: -a (összeg = 0) | Reciprok: 1/a (szorzat = 1) | |a| ≥ 0',
    note: '|-a| = |a| (távolság a nullától).'
  }
];

const questions: Question[] = [
  // ==========================================
  // --- 1. SZINT: SZÁMHALMAZOK ÉS ALAPFOGALMAK (1-10) ---
  // ==========================================
  {
    id: 'q1-1',
    level: 1,
    question: 'Mi a racionális számok (ℚ) pontos matematikai definíciója?',
    options: [
      'Azon számok, amelyek felírhatók két egész szám hányadosaként (a/b, ahol a, b ∈ ℤ és b ≠ 0).',
      'Minden pozitív és negatív tizedestört, még ha nem is szakaszos.',
      'Csak a természetes számok és azok ellentettjei.',
      'Kizárólag a pozitív törtek halmaza.'
    ],
    correctAnswer: 'Azon számok, amelyek felírhatók két egész szám hányadosaként (a/b, ahol a, b ∈ ℤ és b ≠ 0).',
    explanation: 'A racionális szám definíciója: két egész szám hányadosa (tört alakja), ahol a nevező nem nulla.',
    hint: 'A racionális szó a latin „ratio” (arány, hányados) szóból ered.',
    breakdown: [
      { label: 'Definíció', value: 'ℚ = { a/b | a, b ∈ ℤ, b ≠ 0 }' },
      { label: 'Példák', value: '3/4, -5 = -5/1, 0 = 0/1, 0.7 = 7/10' }
    ]
  },
  {
    id: 'q1-2',
    level: 1,
    question: 'Melyik összefüggés írja le helyesen a számhalmazok egymásba ágyazottságát?',
    options: [
      'ℕ ⊂ ℤ ⊂ ℚ (Természetes ⊂ Egész ⊂ Racionális)',
      'ℚ ⊂ ℤ ⊂ ℕ',
      'ℤ ⊂ ℕ ⊂ ℚ',
      'ℕ ⊂ ℚ ⊂ ℤ'
    ],
    correctAnswer: 'ℕ ⊂ ℤ ⊂ ℚ (Természetes ⊂ Egész ⊂ Racionális)',
    explanation: 'Minden természetes szám egész szám is, és minden egész szám racionális szám is (pl. 4 = 4/1).',
    hint: 'A természetes számok a legszűkebb, a racionális számok a legtágabb halmaz a három közül.',
    breakdown: [
      { label: 'ℕ (Természetes)', value: '{0, 1, 2, ...}' },
      { label: 'ℤ (Egész)', value: '{..., -2, -1, 0, 1, 2, ...}' },
      { label: 'ℚ (Racionális)', value: 'Egész számok és törtek' }
    ]
  },
  {
    id: 'q1-3',
    level: 1,
    question: 'Mennyi a -3/5 szám ellentettje?',
    options: [
      '+3/5',
      '-5/3',
      '+5/3',
      '1'
    ],
    correctAnswer: '+3/5',
    explanation: 'Egy szám ellentettje az azonos abszolútértékű, de ellentétes előjelű szám. (-3/5 ellentettje +3/5).',
    hint: 'Egy szám és ellentettjének összege mindig 0!',
    breakdown: [
      { label: 'Szám', value: '-3/5' },
      { label: 'Ellentett', value: '-(-3/5) = +3/5' },
      { label: 'Ellenőrzés', value: '(-3/5) + (+3/5) = 0' }
    ]
  },
  {
    id: 'q1-4',
    level: 1,
    question: 'Mennyi a -3/5 szám reciproka?',
    options: [
      '-5/3',
      '+5/3',
      '+3/5',
      '-1'
    ],
    correctAnswer: '-5/3',
    explanation: 'A reciprok képzésnél a számláló és a nevező helyet cserél, de az előjel megmarad! (-3/5 reciproka -5/3).',
    hint: 'Egy szám és reciprokának szorzata mindig +1! (-3/5 · (-5/3) = +1).',
    breakdown: [
      { label: 'Szám', value: '-3/5' },
      { label: 'Reciprok', value: '1 / (-3/5) = -5/3' },
      { label: 'Ellenőrzés', value: '(-3/5) · (-5/3) = +1' }
    ]
  },
  {
    id: 'q1-5',
    level: 1,
    question: 'Mit fejez ki egy szám abszolútértéke (|x|)?',
    options: [
      'A szám távolságát a 0-tól a számegyenesen (soha nem negatív).',
      'A számnak a -1-gyel vett szorzatát.',
      'A szám reciprokát.',
      'A szám négyzetét.'
    ],
    correctAnswer: 'A szám távolságát a 0-tól a számegyenesen (soha nem negatív).',
    explanation: 'A távolság mindig nemnegatív érték: |5| = 5 és |-5| = 5, |0| = 0.',
    hint: 'A távolság nem lehet negatív.',
    breakdown: [
      { label: 'Definíció', value: '|x| = x ha x ≥ 0, és |x| = -x ha x < 0' },
      { label: 'Példa', value: '|-8.4| = 8.4' }
    ]
  },
  {
    id: 'q1-6',
    level: 1,
    question: 'Melyik szám NEM eleme a természetes számok halmazának (ℕ), de eleme az egész számok halmazának (ℤ)?',
    options: [
      '-12',
      '0',
      '7',
      '3/4'
    ],
    correctAnswer: '-12',
    explanation: 'A -12 negatív egész szám (ℤ eleme), de nem természetes szám (0 és pozitív egészek).',
    hint: 'Keresd a negatív egész számot!',
    breakdown: [
      { label: '-12 ∈ ℤ', value: 'Igaz (egész szám)' },
      { label: '-12 ∈ ℕ', value: 'Hamis (nem természetes szám)' }
    ]
  },
  {
    id: 'q1-7',
    level: 1,
    question: 'Lehet-e egy tört nevezője 0 a racionális számok körében?',
    options: [
      'Nem, 0-val való osztás a matematikában nem értelmezhető.',
      'Igen, ekkor a tört értéke 0.',
      'Igen, ekkor a tört értéke végtelen.',
      'Csak akkor, ha a számláló is 0.'
    ],
    correctAnswer: 'Nem, 0-val való osztás a matematikában nem értelmezhető.',
    explanation: 'A nullával való osztás tiltott és értelmetlen művelet, ezért a racionális számoknál a nevező szigorúan b ≠ 0.',
    hint: 'Próbáld meg elosztani a tortát 0 ember között: nincs értelme a kérdésnek!',
    breakdown: [
      { label: 'Szabály', value: 'Nevező ≠ 0' }
    ]
  },
  {
    id: 'q1-8',
    level: 1,
    question: 'Mennyi az alábbi kifejezés értéke: -|-9|?',
    options: [
      '-9',
      '+9',
      '0',
      '1/9'
    ],
    correctAnswer: '-9',
    explanation: 'Először a belső abszolútértéket végezzük el: |-9| = 9. Majd rátesszük az előtte álló mínusz jelet: -9.',
    hint: 'Vigyázz a zárójelezési sorrendre: a külső mínusz az abszolútérték elvégzése UTÁN hat!',
    breakdown: [
      { label: '1. Belső rész', value: '|-9| = 9' },
      { label: '2. Mínusz előjel', value: '-(9) = -9' }
    ]
  },
  {
    id: 'q1-9',
    level: 1,
    question: 'Melyik számnak NINCS reciproka?',
    options: [
      '0',
      '1',
      '-1',
      '0.5'
    ],
    correctAnswer: '0',
    explanation: 'A 0-nak nincs reciproka, mert 1/0 nem értelmezhető, és nincs olyan szám, amivel 0-t szorozva 1-et kapnánk.',
    hint: 'Melyik számmal nem szabad osztani?',
    breakdown: [
      { label: 'Feltétel', value: '0 · x = 1 ⟹ nincs megoldás' }
    ]
  },
  {
    id: 'q1-10',
    level: 1,
    question: 'Mennyi a 0.25 racionális szám legegyszerűbb közönséges tört alakja?',
    options: [
      '1/4',
      '25/10',
      '2/5',
      '1/5'
    ],
    correctAnswer: '1/4',
    explanation: '0.25 = 25/100, amit 25-tel egyszerűsítve 1/4-et kapunk.',
    hint: 'Gondolj a 25 fillérre vagy negyedórára: a negyed az 1/4.',
    breakdown: [
      { label: 'Átírás', value: '0.25 = 25/100' },
      { label: 'Egyszerűsítés', value: '25/100 = 1/4' }
    ]
  },

  // ==========================================
  // --- 2. SZINT: TÖRT-TIZEDESTÖRT ÁTVÁLTÁSOK (11-20) ---
  // ==========================================
  {
    id: 'q2-1',
    level: 2,
    question: 'Milyen tizedestört alakja van a 3/8 közönséges törtnek?',
    options: [
      '0.375 (Véges tizedestört)',
      '0.333... (Végtelen szakaszos)',
      '0.38',
      '0.83'
    ],
    correctAnswer: '0.375 (Véges tizedestört)',
    explanation: 'A nevező 8 = 2³, így csak 2-es prímtényezőt tartalmaz, ezért véges tizedestört: 3 : 8 = 0.375.',
    hint: 'Végezd el az írásbeli osztást: 3 : 8 = 0.375.',
    breakdown: [
      { label: 'Osztás', value: '3 : 8 = 0.375' },
      { label: 'Nevező prímjei', value: '8 = 2³ (csak 2-es ⟹ véges)' }
    ]
  },
  {
    id: 'q2-2',
    level: 2,
    question: 'Melyik törtből LESZ végtelen szakaszos tizedestört?',
    options: [
      '5/6',
      '3/4',
      '7/20',
      '9/25'
    ],
    correctAnswer: '5/6',
    explanation: 'A 6 nevező prímtényezői: 6 = 2 · 3. A 3-as prímtényező miatt az osztás sosem ér véget: 5/6 = 0.8333... = 0.83̇.',
    hint: 'Bontsd fel a nevezőket prímtényezőkre: amelyikben nem csak 2 vagy 5 van, az végtelen szakaszos lesz!',
    breakdown: [
      { label: '6 = 2 · 3', value: 'A 3 miatt végtelen szakaszos (0.83̇)' },
      { label: '4 = 2²', value: 'Véges (0.75)' },
      { label: '20 = 2² · 5', value: 'Véges (0.35)' },
      { label: '25 = 5²', value: 'Véges (0.36)' }
    ]
  },
  {
    id: 'q2-3',
    level: 2,
    question: 'Mennyi a 7/20 tört tizedestört alakja?',
    options: [
      '0.35',
      '0.7',
      '0.035',
      '0.37'
    ],
    correctAnswer: '0.35',
    explanation: 'Bővítsük a törtet 5-tel, hogy a nevező 100 legyen: 7/20 = 35/100 = 0.35.',
    hint: 'Bővítsd a nevezőt 100-ra (szorozz 5-tel)!',
    breakdown: [
      { label: 'Bővítés', value: '7/20 = (7 · 5) / (20 · 5) = 35/100' },
      { label: 'Tizedestört', value: '0.35' }
    ]
  },
  {
    id: 'q2-4',
    level: 2,
    question: 'Mennyi az 1/3 tört tizedestört alakja?',
    options: [
      '0.333... = 0.3̇ (végtelen tiszta szakaszos)',
      '0.3',
      '0.13',
      '0.33'
    ],
    correctAnswer: '0.333... = 0.3̇ (végtelen tiszta szakaszos)',
    explanation: '1 : 3 = 0.3333..., ahol a 3-as számjegy végtelen sokszor ismétlődik közvetlenül a tizedesvessző után.',
    hint: '1 osztva 3-mal sosem fogy el: a maradék mindig 1.',
    breakdown: [
      { label: 'Osztás', value: '1 : 3 = 0.333...' },
      { label: 'Jelölés', value: '0.3̇ (pont a 3-as felett)' }
    ]
  },
  {
    id: 'q2-5',
    level: 2,
    question: 'Melyik szám a legkisebb az alábbiak közül?',
    options: [
      '-3.5',
      '-3.05',
      '-2.9',
      '-3.55'
    ],
    correctAnswer: '-3.55',
    explanation: 'Negatív számoknál az a kisebb, amelyiknek nagyobb az abszolútértéke (messzebb van nullától balra): -3.55 < -3.5 < -3.05 < -2.9.',
    hint: 'Képzeld el a számegyenesen: melyik van a leginkább balra?',
    breakdown: [
      { label: 'Számegyenes sorrend', value: '-3.55 < -3.50 < -3.05 < -2.90' }
    ]
  },
  {
    id: 'q2-6',
    level: 2,
    question: 'Hány egész szám esik a -3.8 és +2.4 racionális számok közé a számegyenesen?',
    options: [
      '6 darab (-3, -2, -1, 0, 1, 2)',
      '5 darab',
      '7 darab',
      '4 darab'
    ],
    correctAnswer: '6 darab (-3, -2, -1, 0, 1, 2)',
    explanation: 'A köztes egész számok: -3, -2, -1, 0, 1, 2. Ez összesen 6 darab egész szám.',
    hint: 'Sorold fel az egészeket -3-tól +2-ig!',
    breakdown: [
      { label: 'Alsó határ', value: '-3.8 < -3' },
      { label: 'Felső határ', value: '2 < 2.4' },
      { label: 'Egészek', value: '{-3, -2, -1, 0, 1, 2} ⟹ 6 db' }
    ]
  },
  {
    id: 'q2-7',
    level: 2,
    question: 'Melyik egyenlő a 2/3 tizedestört alakjával?',
    options: [
      '0.666... = 0.6̇',
      '0.6',
      '0.67',
      '0.23'
    ],
    correctAnswer: '0.666... = 0.6̇',
    explanation: '2 : 3 = 0.6666... (0.6̇ végtelen tiszta szakaszos tizedestört).',
    hint: '2 : 3 = 0.666...',
    breakdown: [
      { label: 'Osztás', value: '2 : 3 = 0.666...' }
    ]
  },
  {
    id: 'q2-8',
    level: 2,
    question: 'Mennyi a |-4.5| + |+3.2| - |-1.7| kifejezés pontos értéke?',
    options: [
      '6.0',
      '9.4',
      '-3.0',
      '2.6'
    ],
    correctAnswer: '6.0',
    explanation: 'Az abszolútértékek kiszámolva: 4.5 + 3.2 - 1.7 = 7.7 - 1.7 = 6.0.',
    hint: 'Először végezd el az abszolútértékeket: |-4.5|=4.5, |+3.2|=3.2, |-1.7|=1.7.',
    breakdown: [
      { label: 'Abszolútértékek', value: '4.5 + 3.2 - 1.7' },
      { label: 'Eredmény', value: '7.7 - 1.7 = 6.0' }
    ]
  },
  {
    id: 'q2-9',
    level: 2,
    question: 'Milyen típusú tizedestört a 0.8333... (0.83̇)?',
    options: [
      'Végtelen vegyes szakaszos tizedestört',
      'Végtelen tiszta szakaszos tizedestört',
      'Véges tizedestört',
      'Irracionális szám'
    ],
    correctAnswer: 'Végtelen vegyes szakaszos tizedestört',
    explanation: 'A szakasz előtt áll a 8-as jegy, amely nem ismétlődik, és utána ismétlődik a 3-as, ezért vegyes szakaszos.',
    hint: 'A tizedesvessző után van egy nem ismétlődő rész (8) és egy ismétlődő rész (3).',
    breakdown: [
      { label: 'Nem ismétlődő előtag', value: '8' },
      { label: 'Ismétlődő szakasz', value: '3̇' },
      { label: 'Típus', value: 'Vegyes szakaszos' }
    ]
  },
  {
    id: 'q2-10',
    level: 2,
    question: 'Mennyi az 1/9 tört tizedestört alakja?',
    options: [
      '0.111... = 0.1̇',
      '0.19',
      '0.9',
      '0.09'
    ],
    correctAnswer: '0.111... = 0.1̇',
    explanation: '1 : 9 = 0.1111... = 0.1̇. Minden k/9 alakú tört 0.k̇ tiszta szakaszos tizedestörtet ad (pl. 2/9 = 0.2̇, 7/9 = 0.7̇).',
    hint: '1 : 9 = 0.111...',
    breakdown: [
      { label: 'Képlet', value: 'k/9 = 0.k̇' }
    ]
  },

  // ==========================================
  // --- 3. SZINT: SZAKASZOS TÖRTEK ÉS ÖSSZETETT FELADATOK (21-30) ---
  // ==========================================
  {
    id: 'q3-1',
    level: 3,
    question: 'Írd fel a 0.7̇ (0.777...) tiszta szakaszos tizedestörtet közönséges tört alakban!',
    options: [
      '7/9',
      '7/10',
      '7/99',
      '77/100'
    ],
    correctAnswer: '7/9',
    explanation: 'x = 0.777... ⟹ 10x = 7.777... ⟹ 10x - x = 7 ⟹ 9x = 7 ⟹ x = 7/9.',
    hint: 'Az 1 jegyű tiszta szakaszos tört nevezője mindig 9!',
    breakdown: [
      { label: 'Egyenlet', value: '10x - x = 7.777... - 0.777... = 7' },
      { label: '9x = 7', value: 'x = 7/9' }
    ]
  },
  {
    id: 'q3-2',
    level: 3,
    question: 'Írd fel a 0.45̇ (0.454545...) tiszta szakaszos tizedestörtet egyszerűsített tört alakban!',
    options: [
      '5/11',
      '45/100',
      '45/9',
      '9/20'
    ],
    correctAnswer: '5/11',
    explanation: '0.45̇ = 45/99. Mindkét tagot 9-cel egyszerűsítve: 45:9 / 99:9 = 5/11.',
    hint: 'Kétjegyű szakasz esetén a nevező 99, majd egyszerűsíts 9-cel!',
    breakdown: [
      { label: 'Átírás', value: '0.4545... = 45/99' },
      { label: 'Egyszerűsítés 9-cel', value: '45/99 = 5/11' }
    ]
  },
  {
    id: 'q3-3',
    level: 3,
    question: 'Írd fel a 0.16̇ (0.1666...) vegyes szakaszos tizedestörtet egyszerűsített tört alakban!',
    options: [
      '1/6',
      '16/99',
      '16/90',
      '1/5'
    ],
    correctAnswer: '1/6',
    explanation: '100y = 16.666..., 10y = 1.666... ⟹ 90y = 15 ⟹ y = 15/90 = 1/6.',
    hint: '100x - 10x = 16.666... - 1.666... = 15 ⟹ 90x = 15.',
    breakdown: [
      { label: 'Egyenlet', value: '90y = 16 - 1 = 15' },
      { label: 'Tört', value: '15/90 = 1/6' }
    ]
  },
  {
    id: 'q3-4',
    level: 3,
    question: 'Írd fel a 0.25̇ (0.2555...) vegyes szakaszos tizedestörtet közönséges törtként!',
    options: [
      '23/90',
      '25/99',
      '25/90',
      '1/4'
    ],
    correctAnswer: '23/90',
    explanation: '100y = 25.555..., 10y = 2.555... ⟹ 90y = 25 - 2 = 23 ⟹ y = 23/90.',
    hint: 'A számláló (25 - 2 = 23), a nevező 90 (1 szakaszos jegy = 9, 1 előtag = 0).',
    breakdown: [
      { label: 'Számláló', value: '25 - 2 = 23' },
      { label: 'Nevező', value: '90' },
      { label: 'Eredmény', value: '23/90' }
    ]
  },
  {
    id: 'q3-5',
    level: 3,
    question: 'Melyik állítás IGAZ az irracionális számokra (ℝ \\ ℚ)?',
    options: [
      'Olyan számok, amelyek tizedestört alakja végtelen és NEM szakaszos (pl. √2, π).',
      'Minden negatív tört irracionális szám.',
      'A racionális számok és az irracionális számok halmazának van közös eleme.',
      'Minden végtelen szakaszos tizedestört irracionális.'
    ],
    correctAnswer: 'Olyan számok, amelyek tizedestört alakja végtelen és NEM szakaszos (pl. √2, π).',
    explanation: 'Az irracionális számok NEM írhatók fel két egész szám hányadosaként (pl. √2 = 1.41421356..., π = 3.14159265...).',
    hint: 'A racionális számok végesek vagy szakaszosak. Ami végtelen ÉS nem szakaszos, az az irracionális.',
    breakdown: [
      { label: 'Racionális (ℚ)', value: 'Véges vagy végtelen szakaszos' },
      { label: 'Irracionális (ℚ*)', value: 'Végtelen és NEM szakaszos (pl. √2, π)' }
    ]
  },
  {
    id: 'q3-6',
    level: 3,
    question: 'Hány olyan egész szám x létezik, amelyre teljesül, hogy |x| ≤ 4?',
    options: [
      '9 darab (-4, -3, -2, -1, 0, 1, 2, 3, 4)',
      '8 darab',
      '4 darab',
      '5 darab'
    ],
    correctAnswer: '9 darab (-4, -3, -2, -1, 0, 1, 2, 3, 4)',
    explanation: '|x| ≤ 4 azt jelenti, hogy -4 ≤ x ≤ 4. Az egész számok: -4, -3, -2, -1, 0, 1, 2, 3, 4 (összesen 9 db).',
    hint: 'Ne felejtsd el a 0-t és a negatív egészeket sem!',
    breakdown: [
      { label: 'Egyenlőtlenség', value: '-4 ≤ x ≤ 4' },
      { label: 'Elemek száma', value: '4 pozitív + 1 nulla + 4 negatív = 9 db' }
    ]
  },
  {
    id: 'q3-7',
    level: 3,
    question: 'Mennyi a következő művelet pontos eredménye: (0.3̇) + (0.6̇)?',
    options: [
      '1',
      '0.9',
      '0.99',
      '0.9̇'
    ],
    correctAnswer: '1',
    explanation: '0.3̇ = 1/3 és 0.6̇ = 2/3. Összegük: 1/3 + 2/3 = 3/3 = 1. (Megjegyzés: 0.9̇ matematikailag pontosan 1-gyel egyenlő!).',
    hint: 'Váltsd át mindkettőt törtté: 1/3 + 2/3 = ?',
    breakdown: [
      { label: 'Törtek', value: '1/3 + 2/3 = 3/3' },
      { label: 'Eredmény', value: '1' }
    ]
  },
  {
    id: 'q3-8',
    level: 3,
    question: 'Ha a = -2/3 és b = 3/4, mennyi az |a · b| értéke?',
    options: [
      '1/2',
      '-1/2',
      '6/12',
      '5/7'
    ],
    correctAnswer: '1/2',
    explanation: 'a · b = (-2/3) · (3/4) = -6/12 = -1/2. Ennek abszolútértéke: |-1/2| = 1/2.',
    hint: 'Szorozd össze a törteket (egyszerűsíts 3-mal és 2-vel), majd vedd az abszolútértéket!',
    breakdown: [
      { label: 'Szorzat', value: '(-2/3) · (3/4) = -2/4 = -1/2' },
      { label: 'Abszolútérték', value: '|-1/2| = 1/2' }
    ]
  },
  {
    id: 'q3-9',
    level: 3,
    question: 'Melyik az a racionális szám, amelynek reciproka megegyezik az ellentettjével?',
    options: [
      'Nincs ilyen valós racionális szám.',
      '1',
      '-1',
      '0'
    ],
    correctAnswer: 'Nincs ilyen valós racionális szám.',
    explanation: 'Feltétel: 1/x = -x ⟹ x² = -1. Valós/racionális számok körében a négyzet sosem lehet negatív, így nincs ilyen szám.',
    hint: 'Ha 1/x = -x, akkor x² = -1 lenne. Létezik olyan racionális szám, aminek a négyzete negatív?',
    breakdown: [
      { label: 'Egyenlet', value: '1/x = -x ⟹ x² = -1' },
      { label: 'Következtetés', value: 'Nincs racionális megoldás' }
    ]
  },
  {
    id: 'q3-10',
    level: 3,
    question: 'Mennyi a 0.1̇2̇ (0.121212...) szakaszos tizedestört legegyszerűbb tört alakja?',
    options: [
      '4/33',
      '12/100',
      '12/90',
      '3/25'
    ],
    correctAnswer: '4/33',
    explanation: '0.1212... = 12/99. Mindkét tagot 3-mal egyszerűsítve: 12:3 / 99:3 = 4/33.',
    hint: 'Kétjegyű tiszta szakasz: 12/99, egyszerűsíts 3-mal!',
    breakdown: [
      { label: 'Tört alak', value: '12/99' },
      { label: 'Egyszerűsítés 3-mal', value: '4/33' }
    ]
  }
];

export const RationalSetQuiz: React.FC<RationalSetQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="4. A racionális számok halmaza – Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: ℕ ⊂ ℤ ⊂ ℚ hierarchia, tört-tizedestört átváltások, szakaszos tizedestörtek és abszolútérték"
      questions={questions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-8-szamok-betuk-racionalis-halmaz-quiz"
      pdfFilename="8_osztaly_a_racionalis_szamok_halmaza_kviz.pdf"
      badgeColor="emerald"
      matcherComponent={<RationalSetMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<RationalSetSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      cheatSheetCards={cheatSheetCards}
    />
  );
};

export default RationalSetQuiz;
