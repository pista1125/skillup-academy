import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { OpenSentencesMatcher } from './OpenSentencesMatcher';
import { OpenSentencesSorter } from './OpenSentencesSorter';

export interface OpenSentencesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const OPEN_SENTENCES_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: NYITOTT MONDAT FOGALMA, ALAPHALMAZ, EGYSZERŰ EGYENLETEK (1-10)
  // =========================================================================
  {
    id: 'oq1-1',
    level: 1,
    prompt: 'Mi a nyitott mondat alapvető meghatározása a matematikában?',
    options: [
      'Olyan állítás, amelyben ismeretlen (változó) szerepel, és behelyettesítéssel válik igazzá vagy hamissá',
      'Olyan mondat, amelynek a végén nincs pont vagy kérdőjel',
      'Minden olyan számítás, amelynek az eredménye páros szám',
      'Olyan egyenlet, amelynek nincsen megoldása'
    ],
    correctAnswer: 0,
    explanation: 'A nyitott mondat olyan matematikai egyenlőség vagy egyenlőtlenség, amelyben legalább egy ismeretlen (betű vagy szimbólum, pl. x, y, a) szerepel. Önmagában se nem igaz, se nem hamis.',
    hint: 'Gondolj az x-re vagy a nyitott négyzetre: ha számot teszel a helyére, igaz vagy hamis lesz.',
    breakdown: [
      { label: 'Definíció', value: 'Változót tartalmazó eldöntendő állítás' }
    ]
  },
  {
    id: 'oq1-2',
    level: 1,
    prompt: 'Oldd meg a nyitott egyenlőséget: x + 15 = 40. Mennyi az x értéke?',
    options: [
      'x = 25',
      'x = 55',
      'x = 35',
      'x = 20'
    ],
    correctAnswer: 0,
    explanation: 'Az összeadás fordított művelete a kivonás: x = 40 − 15 = 25. Ellenőrzés: 25 + 15 = 40, valóban igaz!',
    hint: 'Vonj ki 15-öt a 40-ből: 40 − 15 = ?',
    breakdown: [
      { label: 'Művelet', value: 'x = 40 − 15' },
      { label: 'Megoldás', value: 'x = 25' }
    ]
  },
  {
    id: 'oq1-3',
    level: 1,
    prompt: 'Oldd meg az egyenletet: 4 · a = 36. Mennyi az a értéke?',
    options: [
      'a = 9',
      'a = 8',
      'a = 32',
      'a = 144'
    ],
    correctAnswer: 0,
    explanation: 'A szorzás fordított művelete az osztás: a = 36 : 4 = 9. Ellenőrzés: 4 · 9 = 36.',
    hint: '36 : 4 = ?',
    breakdown: [
      { label: 'Művelet', value: 'a = 36 : 4' },
      { label: 'Megoldás', value: 'a = 9' }
    ]
  },
  {
    id: 'oq1-4',
    level: 1,
    prompt: 'Oldd meg a nyitott mondatot: y − 12 = 28. Mennyi az y értéke?',
    options: [
      'y = 40',
      'y = 16',
      'y = 30',
      'y = 38'
    ],
    correctAnswer: 0,
    explanation: 'A kisebbítendőt keresve a kivonás fordított műveletével (hozzáadással) számolunk: y = 28 + 12 = 40. Ellenőrzés: 40 − 12 = 28.',
    hint: 'Add hozzá a 12-t a 28-hoz: 28 + 12 = ?',
    breakdown: [
      { label: 'Művelet', value: 'y = 28 + 12' },
      { label: 'Megoldás', value: 'y = 40' }
    ]
  },
  {
    id: 'oq1-5',
    level: 1,
    prompt: 'Oldd meg a nyitott mondatot: 50 − x = 16. Mennyi az x értéke?',
    options: [
      'x = 34',
      'x = 66',
      'x = 44',
      'x = 24'
    ],
    correctAnswer: 0,
    explanation: 'Vigyázat, a kivonandót keressük! A kisebbítendőből kivonjuk a különbséget: x = 50 − 16 = 34. Ellenőrzés: 50 − 34 = 16.',
    hint: '50 − ? = 16 -> x = 50 − 16.',
    breakdown: [
      { label: 'Művelet', value: 'x = 50 − 16' },
      { label: 'Megoldás', value: 'x = 34' }
    ]
  },
  {
    id: 'oq1-6',
    level: 1,
    prompt: 'Oldd meg a nyitott mondatot: b : 7 = 6. Mennyi a b értéke?',
    options: [
      'b = 42',
      'b = 13',
      'b = 36',
      'b = 1'
    ],
    correctAnswer: 0,
    explanation: 'Az osztandót úgy kapjuk meg, hogy a hányadost megszorozzuk az osztóval: b = 6 · 7 = 42. Ellenőrzés: 42 : 7 = 6.',
    hint: '6 · 7 = ?',
    breakdown: [
      { label: 'Művelet', value: 'b = 6 · 7' },
      { label: 'Megoldás', value: 'b = 42' }
    ]
  },
  {
    id: 'oq1-7',
    level: 1,
    prompt: 'Mit nevezünk egy nyitott mondat „igazsághalmazának” (I)?',
    options: [
      'Azon számok halmazát, amelyeket behelyettesítve a nyitott mondat IGAZ állítássá válik',
      'Az összes létező természetes szám halmazát',
      'Azon számokat, amelyekkel a mondat hamis lesz',
      'A feladatban szereplő számok összegét'
    ],
    correctAnswer: 0,
    explanation: 'Az igazsághalmaz (I) az alaphalmaz azon számainak összessége, amelyeket az ismeretlen helyére téve a nyitott mondat igaz egyenlőséggé vagy egyenlőtlenséggé válik.',
    hint: 'Ez maga a feladat helyes megoldásainak halmaza.',
    breakdown: [
      { label: 'Igazsághalmaz (I)', value: 'A megoldások halmaza' }
    ]
  },
  {
    id: 'oq1-8',
    level: 1,
    prompt: 'Ha az alaphalmaz a természetes számok halmaza (0, 1, 2, 3...), mi az x + 5 = 5 egyenlet megoldása?',
    options: [
      'x = 0',
      'Nincs megoldása',
      'x = 5',
      'x = 10'
    ],
    correctAnswer: 0,
    explanation: 'x = 5 − 5 = 0. Mivel a 0 természetes szám, a megoldás az x = 0 (I = {0}).',
    hint: 'Melyik számhoz kell 5-öt adni, hogy 5 maradjon?',
    breakdown: [
      { label: 'Számítás', value: 'x = 5 − 5 = 0' }
    ]
  },
  {
    id: 'oq1-9',
    level: 1,
    prompt: 'Igaz vagy hamis: az x = 7 megoldása a 3 · x + 4 = 25 nyitott mondatnak?',
    options: [
      'IGAZ',
      'HAMIS, mert az eredmény 28',
      'HAMIS, mert az x = 8 a jó',
      'Csak negatív számokra igaz'
    ],
    correctAnswer: 0,
    explanation: 'Helyettesítsük be az x = 7-et:\nBal oldal: 3 · 7 + 4 = 21 + 4 = 25.\nJobb oldal: 25.\nA bal és jobb oldal egyenlő, tehát az állítás IGAZ!',
    hint: 'Számold ki: 3 · 7 + 4 = ?',
    breakdown: [
      { label: 'Bal oldal', value: '3 · 7 + 4 = 25' },
      { label: 'Jobb oldal', value: '25' },
      { label: 'Állapot', value: 'Egyenlő (IGAZ)' }
    ]
  },
  {
    id: 'oq1-10',
    level: 1,
    prompt: 'Mi a neve annak a számhalmaznak (jele: A), amelyből az ismeretlen lehetséges értékeit kiválaszthatjuk?',
    options: [
      'Alaphalmaz',
      'Igazsághalmaz',
      'Megoldáshalmaz',
      'Nullahalmaz'
    ],
    correctAnswer: 0,
    explanation: 'Az alaphalmaz (A) jelöli ki azt a kört, ahonnan az ismeretlen értékeit egyáltalán kereshetjük (pl. egyjegyű számok, természetes számok).',
    hint: 'Ez az „alap”, amiből válogatunk.'
  },

  // =========================================================================
  // 2. SZINT: EGYENLŐTLENSÉGEK ÉS MEGOLDÁSHALMAZOK (11-20)
  // =========================================================================
  {
    id: 'oq2-1',
    level: 2,
    prompt: 'Mely természetes számok teszik igazzá az x + 6 < 11 nyitott mondatot?',
    options: [
      '{0; 1; 2; 3; 4}',
      '{1; 2; 3; 4; 5}',
      '{0; 1; 2; 3; 4; 5}',
      '{5; 6; 7}'
    ],
    correctAnswer: 0,
    explanation: 'Vonjunk ki 6-ot: x < 11 − 6, azaz x < 5. A természetes számok közül az 5-nél kisebbek: 0, 1, 2, 3, 4. (Az 5 már nem jó, mert 5 + 6 = 11 nem szigorúan kisebb 11-nél!).',
    hint: 'x < 5 a természetes számok (0, 1, 2, ...) halmazán.',
    breakdown: [
      { label: 'Egyenlőtlenség', value: 'x < 5' },
      { label: 'Megoldások', value: '{0; 1; 2; 3; 4}' }
    ]
  },
  {
    id: 'oq2-2',
    level: 2,
    prompt: 'Mely természetes számok alkotják a 2 · y ≤ 8 nyitott egyenlőtlenség igazsághalmazát?',
    options: [
      '{0; 1; 2; 3; 4}',
      '{0; 1; 2; 3}',
      '{1; 2; 3; 4}',
      '{2; 4; 6; 8}'
    ],
    correctAnswer: 0,
    explanation: 'Osszunk 2-vel: y ≤ 8 : 2, azaz y ≤ 4. Mivel a jel megengedő (kisebb vagy egyenlő: ≤), a 4 is beletartozik! Így a természetes számok: 0, 1, 2, 3, 4.',
    hint: 'y ≤ 4, a 4 is megoldás!',
    breakdown: [
      { label: 'Feltétel', value: 'y ≤ 4' },
      { label: 'Halmaz', value: '{0; 1; 2; 3; 4}' }
    ]
  },
  {
    id: 'oq2-3',
    level: 2,
    prompt: 'Mely a értékek teszik igazzá a 15 − a > 10 egyenlőtlenséget a természetes számok halmazán?',
    options: [
      '{0; 1; 2; 3; 4}',
      '{1; 2; 3; 4; 5}',
      '{5; 6; 7; 8}',
      '{0; 1; 2; 3; 4; 5}'
    ],
    correctAnswer: 0,
    explanation: 'A 15-ből legfeljebb 4-et vonhatunk ki, hogy az eredmény 10-nél nagyobb maradjon (15 − 4 = 11 > 10; de 15 − 5 = 10, ami nem nagyobb 10-nél). Tehát a = 0, 1, 2, 3, 4.',
    hint: 'Próbáld ki a számokat: 15 − 0 = 15, 15 − 1 = 14... meddig nagyobb 10-nél?',
    breakdown: [
      { label: 'Feltétel', value: 'a < 5' },
      { label: 'Megoldás', value: '{0; 1; 2; 3; 4}' }
    ]
  },
  {
    id: 'oq2-4',
    level: 2,
    prompt: 'Oldd meg a kétlépéses egyenletet: 3 · x + 1 = 16. Mennyi az x értéke?',
    options: [
      'x = 5',
      'x = 6',
      'x = 4',
      'x = 15'
    ],
    correctAnswer: 0,
    explanation: '1. lépés: Vonjunk ki 1-et: 3 · x = 16 − 1 = 15.\n2. lépés: Osszunk 3-mal: x = 15 : 3 = 5.\nEllenőrzés: 3 · 5 + 1 = 15 + 1 = 16.',
    hint: 'Először vond le az 1-et a 16-ból (15), majd oszd el 3-mal!',
    breakdown: [
      { label: '1. lépés', value: '3 · x = 15' },
      { label: '2. lépés', value: 'x = 15 : 3 = 5' }
    ]
  },
  {
    id: 'oq2-5',
    level: 2,
    prompt: 'Oldd meg a zárójeles egyenletet: (x + 4) · 2 = 20. Mennyi az x értéke?',
    options: [
      'x = 6',
      'x = 8',
      'x = 10',
      'x = 16'
    ],
    correctAnswer: 0,
    explanation: '1. lépés: Elosztjuk mindkét oldalt 2-vel: x + 4 = 20 : 2 = 10.\n2. lépés: Kivonunk 4-et: x = 10 − 4 = 6.\nEllenőrzés: (6 + 4) · 2 = 10 · 2 = 20.',
    hint: 'Mivel kell szorozni a 2-t, hogy 20 legyen? 10-zel. Tehát x + 4 = 10.',
    breakdown: [
      { label: 'Zárójel értéke', value: 'x + 4 = 10' },
      { label: 'Megoldás', value: 'x = 6' }
    ]
  },
  {
    id: 'oq2-6',
    level: 2,
    prompt: 'Mely természetes számok elégítik ki mindkét feltételt: 2 · x > 14 ÉS x < 10?',
    options: [
      '{8; 9}',
      '{7; 8; 9}',
      '{8; 9; 10}',
      '{7; 8}'
    ],
    correctAnswer: 0,
    explanation: '1) 2 · x > 14 azt jelenti, hogy x > 7 (tehát 8, 9, 10...).\n2) Másik feltétel: x < 10 (tehát ...7, 8, 9).\nA két feltétel közös metszete: 8 és 9.',
    hint: 'x nagyobb mint 7, de kisebb mint 10: melyik két szám ez?',
    breakdown: [
      { label: '1. feltétel', value: 'x > 7' },
      { label: '2. feltétel', value: 'x < 10' },
      { label: 'Közös megoldás', value: '{8; 9}' }
    ]
  },
  {
    id: 'oq2-7',
    level: 2,
    prompt: 'Mi történik egy egyenlet megoldásával (igazsághalmazával), ha mindkét oldalához hozzáadjuk ugyanazt a számot?',
    options: [
      'A megoldáshalmaz nem változik, az egyensúly megmarad',
      'A megoldás értéke a kétszeresére nő',
      'Az egyenlet érvénytelenné válik',
      'A megoldás értéke nullára csökken'
    ],
    correctAnswer: 0,
    explanation: 'Ez a mérlegelv alapja: ha egy kétkarú mérleg mindkét serpenyőjébe ugyanakkora súlyt teszünk, a mérleg egyensúlya nem billen el, a megoldás változatlan marad.',
    hint: 'Gondolj a kétkarú mérleg egyensúlyára!'
  },
  {
    id: 'oq2-8',
    level: 2,
    prompt: 'Melyik nyitott mondatnak az ÜRES HALMAZ (∅) a megoldása a természetes számok (0, 1, 2, 3...) halmazán?',
    options: [
      'x + 10 = 4',
      'x − 4 = 10',
      'x + 0 = 4',
      '4 · x = 0'
    ],
    correctAnswer: 0,
    explanation: 'Az x + 10 = 4 egyenletből x = 4 − 10 = −6 adódna, de a −6 NEM természetes szám! Ezért a természetes számok halmazán nincs megoldása: I = ∅ (üres halmaz).',
    hint: 'Nincs olyan természetes szám, amihez 10-et adva 4-et kapnánk!',
    breakdown: [
      { label: 'Számítás', value: 'x = 4 − 10 = −6' },
      { label: 'Természetes szám?', value: 'Nem, így I = ∅' }
    ]
  },
  {
    id: 'oq2-9',
    level: 2,
    prompt: 'Egy könyv ára x Ft. Ha hozzáadunk 500 Ft-ot, a kapott összeg legalább 2000 Ft lesz. Melyik nyitott mondat fejezi ki pontosan ezt az állítást?',
    options: [
      'x + 500 ≥ 2000',
      'x + 500 ≤ 2000',
      'x + 500 > 2000',
      'x + 500 = 2000'
    ],
    correctAnswer: 0,
    explanation: 'A „legalább 2000 Ft” azt jelenti, hogy 2000 Ft vagy annál több lehet: x + 500 ≥ 2000 (nagyobb vagy egyenlő).',
    hint: 'A „legalább” kulcsszó a ≥ (nagyobb vagy egyenlő) jelet jelenti.',
    breakdown: [
      { label: 'Kifejezés', value: 'x + 500 ≥ 2000' }
    ]
  },
  {
    id: 'oq2-10',
    level: 2,
    prompt: 'Oldd meg az egyenletet: 72 : x = 8. Mennyi az x értéke?',
    options: [
      'x = 9',
      'x = 8',
      'x = 576',
      'x = 7'
    ],
    correctAnswer: 0,
    explanation: 'Az osztót úgy kapjuk meg, hogy az osztandót elosztjuk a hányadossal: x = 72 : 8 = 9. Ellenőrzés: 72 : 9 = 8.',
    hint: '72-t mivel kell elosztani, hogy 8-at kapjunk? 72 : 8 = ?',
    breakdown: [
      { label: 'Művelet', value: 'x = 72 : 8' },
      { label: 'Megoldás', value: 'x = 9' }
    ]
  },

  // =========================================================================
  // 3. SZINT: ÖSSZETETT LEBONTOGATÁS ÉS SZÖVEGES FELADATOK (21-30)
  // =========================================================================
  {
    id: 'oq3-1',
    level: 3,
    prompt: 'Gondoltam egy számra. Hozzáadtam 15-öt, a kapott összeget megszoroztam 3-mal, így 75-öt kaptam. Melyik számra gondoltam?',
    options: [
      '10',
      '15',
      '12',
      '8'
    ],
    correctAnswer: 0,
    explanation: 'Nyitott mondat: (x + 15) · 3 = 75.\nVisszafelé lépkedünk (lebontogatás):\n1) x + 15 = 75 : 3 = 25\n2) x = 25 − 15 = 10.\nEllenőrzés: (10 + 15) · 3 = 25 · 3 = 75, helyes!',
    hint: 'Visszafelé számolj: 75 : 3 = 25, majd 25 − 15 = ?',
    breakdown: [
      { label: 'Egyenlet', value: '(x + 15) · 3 = 75' },
      { label: '1. lépés', value: 'x + 15 = 25' },
      { label: 'Gondolt szám', value: 'x = 10' }
    ]
  },
  {
    id: 'oq3-2',
    level: 3,
    prompt: 'Gondoltam egy számra. Kivontam belőle 8-at, az eredményt elosztottam 4-gyel, és 12-t kaptam. Melyik számra gondoltam?',
    options: [
      '56',
      '48',
      '40',
      '52'
    ],
    correctAnswer: 0,
    explanation: 'Nyitott mondat: (x − 8) : 4 = 12.\nVisszafelé lépkedünk:\n1) x − 8 = 12 · 4 = 48\n2) x = 48 + 8 = 56.\nEllenőrzés: (56 − 8) : 4 = 48 : 4 = 12, helyes!',
    hint: 'Visszafelé: 12 · 4 = 48, majd 48 + 8 = ?',
    breakdown: [
      { label: '1. lépés', value: 'x − 8 = 48' },
      { label: 'Gondolt szám', value: 'x = 56' }
    ]
  },
  {
    id: 'oq3-3',
    level: 3,
    prompt: 'Egy téglalap kerülete 36 cm, az egyik oldala 11 cm. Mennyi a másik oldalának hossza (b)?',
    options: [
      '7 cm',
      '8 cm',
      '6 cm',
      '14 cm'
    ],
    correctAnswer: 0,
    explanation: 'A kerület képlete: K = 2 · (a + b). Behelyettesítve: 2 · (11 + b) = 36.\n1) 11 + b = 36 : 2 = 18 cm (félkerület)\n2) b = 18 − 11 = 7 cm.\nEllenőrzés: 2 · (11 + 7) = 2 · 18 = 36 cm.',
    hint: 'A két szomszédos oldal összege a kerület fele: 36 : 2 = 18 cm. 18 − 11 = ?',
    breakdown: [
      { label: 'Félkerület', value: '11 + b = 18 cm' },
      { label: 'Másik oldal', value: 'b = 7 cm' }
    ]
  },
  {
    id: 'oq3-4',
    level: 3,
    prompt: 'Egy ötödikes osztályban x fiú tanul, a lányok száma pedig pontosan a fiúk számának kétszerese (2 · x). Összesen 27 tanuló jár az osztályba. Hány fiú és hány lány jár az osztályba?',
    options: [
      '9 fiú és 18 lány',
      '8 fiú és 19 lány',
      '10 fiú és 17 lány',
      '12 fiú és 15 lány'
    ],
    correctAnswer: 0,
    explanation: 'Nyitott mondat: x + 2 · x = 27.\nÖsszevonva: 3 · x = 27.\nx = 27 : 3 = 9 fiú.\nLányok: 2 · 9 = 18 lány.\nEllenőrzés: 9 + 18 = 27, valóban igaz!',
    hint: 'x + 2 · x = 3 · x = 27 -> x = 27 : 3.',
    breakdown: [
      { label: 'Egyenlet', value: '3 · x = 27' },
      { label: 'Fiúk', value: 'x = 9' },
      { label: 'Lányok', value: '2 · 9 = 18' }
    ]
  },
  {
    id: 'oq3-5',
    level: 3,
    prompt: 'Anna 5000 Ft-tal indult el a papírboltba. Vásárolt 4 darab egyforma füzetet, és fizetés után pontosan 3600 Ft-ja maradt. Mennyibe került egy füzet?',
    options: [
      '350 Ft',
      '300 Ft',
      '400 Ft',
      '450 Ft'
    ],
    correctAnswer: 0,
    explanation: 'Nyitott mondat: 5000 − 4 · x = 3600.\n1) A 4 füzet együttes ára: 5000 − 3600 = 1400 Ft.\n2) 1 füzet ára: x = 1400 : 4 = 350 Ft.',
    hint: 'Mennyit költött összesen? 5000 − 3600 = 1400 Ft. 1400 : 4 = ?',
    breakdown: [
      { label: 'Költés', value: '5000 − 3600 = 1400 Ft' },
      { label: '1 füzet ára', value: '1400 : 4 = 350 Ft' }
    ]
  },
  {
    id: 'oq3-6',
    level: 3,
    prompt: 'Oldd meg az egyenletet: 4 · x − 7 = 25. Mennyi az x értéke?',
    options: [
      'x = 8',
      'x = 7',
      'x = 9',
      'x = 6'
    ],
    correctAnswer: 0,
    explanation: '1. lépés: Hozzáadunk 7-et: 4 · x = 25 + 7 = 32.\n2. lépés: Elosztjuk 4-gyel: x = 32 : 4 = 8.\nEllenőrzés: 4 · 8 − 7 = 32 − 7 = 25.',
    hint: 'Add hozzá a 7-et a 25-höz (32), majd oszd el 4-gyel!',
    breakdown: [
      { label: '1. lépés', value: '4 · x = 32' },
      { label: 'Megoldás', value: 'x = 8' }
    ]
  },
  {
    id: 'oq3-7',
    level: 3,
    prompt: 'Oldd meg a nyitott mondatot: (3 · x + 6) : 3 = 9. Mennyi az x értéke?',
    options: [
      'x = 7',
      'x = 6',
      'x = 8',
      'x = 5'
    ],
    correctAnswer: 0,
    explanation: '1. lépés: Megszorozzuk mindkét oldalt 3-mal: 3 · x + 6 = 9 · 3 = 27.\n2. lépés: Kivonunk 6-ot: 3 · x = 27 − 6 = 21.\n3. lépés: Elosztjuk 3-mal: x = 21 : 3 = 7.\nEllenőrzés: (3 · 7 + 6) : 3 = (21 + 6) : 3 = 27 : 3 = 9.',
    hint: 'Visszafelé: 9 · 3 = 27; 27 − 6 = 21; 21 : 3 = ?',
    breakdown: [
      { label: 'Zárójel', value: '3 · x + 6 = 27' },
      { label: 'Szorzás', value: '3 · x = 21' },
      { label: 'Megoldás', value: 'x = 7' }
    ]
  },
  {
    id: 'oq3-8',
    level: 3,
    prompt: 'Két egymást követő természetes szám összege 45. Melyik ez a két szám?',
    options: [
      '22 és 23',
      '21 és 24',
      '20 és 25',
      '23 és 24'
    ],
    correctAnswer: 0,
    explanation: 'Jelöljük a kisebb számot x-szel, ekkor a következő szám (x + 1).\nEgyenlet: x + (x + 1) = 45.\n2 · x + 1 = 45\n2 · x = 44\nx = 22.\nA két szám: 22 és 23. (22 + 23 = 45).',
    hint: '2 · x + 1 = 45 -> 2 · x = 44.',
    breakdown: [
      { label: 'Egyenlet', value: '2 · x + 1 = 45' },
      { label: 'Kisebb szám', value: 'x = 22' },
      { label: 'Nagyobb szám', value: '23' }
    ]
  },
  {
    id: 'oq3-9',
    level: 3,
    prompt: 'Dóri 3 évvel idősebb Beniénél. Kettejük életkorának összege 25 év. Hány éves Beni és hány éves Dóri?',
    options: [
      'Beni 11 éves, Dóri 14 éves',
      'Beni 10 éves, Dóri 15 éves',
      'Beni 12 éves, Dóri 13 éves',
      'Beni 9 éves, Dóri 16 éves'
    ],
    correctAnswer: 0,
    explanation: 'Beni kora x, Dóri kora x + 3.\nx + (x + 3) = 25\n2 · x + 3 = 25\n2 · x = 22\nx = 11 (Beni kora).\nDóri kora: 11 + 3 = 14 év.\nEllenőrzés: 11 + 14 = 25.',
    hint: 'Vonj le 3-at a 25-ből (22), majd oszd el kettővel: 22 : 2 = 11.',
    breakdown: [
      { label: 'Beni kora', value: '11 év' },
      { label: 'Dóri kora', value: '14 év' }
    ]
  },
  {
    id: 'oq3-10',
    level: 3,
    prompt: 'Egyenlőtlenség: 35 − 2 · x ≥ 15, ha x természetes szám. Melyik a LEGNAGYOBB természetes szám, amely még kielégíti ezt az egyenlőtlenséget?',
    options: [
      '10',
      '9',
      '11',
      '12'
    ],
    correctAnswer: 0,
    explanation: 'A kivont mennyiség (2 · x) legfeljebb 35 − 15 = 20 lehet, hogy a különbség legalább 15 maradjon: 2 · x ≤ 20, amiből x ≤ 10. A legnagyobb természetes szám tehát a 10. (Ellenőrzés: 35 − 2 · 10 = 15 ≥ 15, igaz; de 11-nél már 35 − 22 = 13 < 15 lenne!).',
    hint: '35 − 2 · x legalább 15, így 2 · x legfeljebb 20 lehet: x ≤ 10.',
    breakdown: [
      { label: 'Feltétel', value: '2 · x ≤ 20' },
      { label: 'Legnagyobb x', value: '10' }
    ]
  }
];

export const OpenSentencesQuiz: React.FC<OpenSentencesQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Nyitott mondatok kvíz"
      subtitle="30 feladat 3 szinten: egyenlőségek, egyenlőtlenségek, alaphalmaz, igazsághalmaz, lebontogatás és szöveges feladatok"
      questions={OPEN_SENTENCES_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-open-sentences-quiz"
      storageKey="g5-open-sentences-quiz"
      renderMatcher={(level, onBack, onSwitchToTheory) => (
        <OpenSentencesMatcher
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(level, onBack, onSwitchToTheory) => (
        <OpenSentencesSorter
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      cheatSheetCards={{
        1: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-purple-700 dark:text-purple-400">1. Szint Puskája: Alapfogalmak</div>
            <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
              <div>• <strong>Nyitott mondat:</strong> Ismeretlent (x, y, a, □) tartalmazó matematikai állítás.</div>
              <div>• <strong>Alaphalmaz (A):</strong> Azok a számok, amelyek közül válogathatunk.</div>
              <div>• <strong>Igazsághalmaz (I):</strong> Azok a számok, amelyek igazzá teszik a mondatot.</div>
              <div>• <strong>Egyszerű egyenletek:</strong> x + a = b → x = b − a; c · x = d → x = d : c.</div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-purple-700 dark:text-purple-400">2. Szint Puskája: Egyenlőtlenségek</div>
            <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
              <div>• <strong>Szigorú jel (&lt;, &gt;):</strong> Az adott határpont NEM tartozik a megoldások közé.</div>
              <div>• <strong>Megengedő jel (≤, ≥):</strong> Az adott határpont IS megoldás (kisebb vagy egyenlő).</div>
              <div>• <strong>Üres halmaz (∅):</strong> Ha az alaphalmazból semmi sem teszi igazzá (pl. x + 5 = 2).</div>
              <div>• <strong>Mérlegelv:</strong> Mindkét oldalhoz ugyanazt hozzáadva az egyensúly megmarad.</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-purple-700 dark:text-purple-400">3. Szint Puskája: Lebontogatási Módszer</div>
            <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
              <div>• <strong>Visszafelé lépkedés:</strong> A műveletek fordított sorrendben és fordított előjellel.</div>
              <div>• <strong>Szorzás/osztás zárójellel:</strong> Előbb ossz vagy szorozz, majd vond ki/add hozzá!</div>
              <div>• <strong>Kivonandó keresése:</strong> a − x = b esetén x = a − b!</div>
              <div>• <strong>Behelyettesítéses ellenőrzés:</strong> A kapott számot mindig számold vissza az eredetibe!</div>
            </div>
          </div>
        )
      }}
    />
  );
};
