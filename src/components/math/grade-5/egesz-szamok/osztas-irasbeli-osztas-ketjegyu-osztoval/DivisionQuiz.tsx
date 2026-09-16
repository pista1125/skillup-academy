import React from 'react';
import { QuizTemplate, Question, CheatSheetSection } from '../QuizTemplate';
import { DivisionMatcher } from './DivisionMatcher';
import { DivisionSorter } from './DivisionSorter';

export interface DivisionQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const divisionQuestions: Question[] = [
  // ==========================================
  // LEVEL 1: Fejszámolás, 10 hatványai, 0, 1 és maradékos alapismeretek (10 kérdés)
  // ==========================================
  {
    id: 'div-l1-q1',
    level: 1,
    question: 'A 84 : 4 = 21 műveletben melyik szám az OSZTÓ?',
    highlightValue: '84 : 4 = 21',
    options: ['4', '84', '21', 'Egyik sem'],
    correctAnswer: 0,
    hint: 'Az osztó az a szám, amivel osztunk (a második tag).',
    explanation: 'Az osztás tagjai: Osztandó (84) : Osztó (4) = Hányados (21).',
    breakdown: [
      { label: 'Osztandó', value: '84' },
      { label: 'Osztó', value: '4' },
      { label: 'Hányados', value: '21' }
    ]
  },
  {
    id: 'div-l1-q2',
    level: 1,
    question: 'Mennyi a 450 : 10 osztás eredménye?',
    highlightValue: '450 : 10',
    options: ['45', '4 500', '4.5', '54'],
    correctAnswer: 0,
    hint: '10-zel osztva egy nullát elhagyunk a szám végéről.',
    explanation: '450 : 10 = 45.',
    breakdown: [
      { label: 'Szabály', value: '1 nulla elhagyása' },
      { label: 'Eredmény', value: '45' }
    ]
  },
  {
    id: 'div-l1-q3',
    level: 1,
    question: 'Mennyi a 7 200 : 100 osztás eredménye?',
    highlightValue: '7 200 : 100',
    options: ['72', '720', '7.2', '702'],
    correctAnswer: 0,
    hint: '100-zal osztva két nullát hagyunk el a szám végéről.',
    explanation: '7 200 : 100 = 72.',
    breakdown: [
      { label: 'Szabály', value: '2 nulla elhagyása' },
      { label: 'Eredmény', value: '72' }
    ]
  },
  {
    id: 'div-l1-q4',
    level: 1,
    question: 'Mit mondhatunk a 0-val való osztásról a matematikában?',
    highlightValue: 'a : 0',
    options: ['Nullával osztani TILOS és értelmezhetetlen', 'Mindig 0 az eredmény', 'Mindig 1 az eredmény', 'Mindig az eredeti szám'],
    correctAnswer: 0,
    hint: 'Nincs olyan szám, amivel 0-t szorozva pozitív számot kapnánk.',
    explanation: 'Nullával osztani szigorúan tilos és értelmetlen!',
    breakdown: [
      { label: 'Alapszabály', value: '0-val osztani TILOS!' }
    ]
  },
  {
    id: 'div-l1-q5',
    level: 1,
    question: 'Mennyi a 0 : 25 művelet eredménye?',
    highlightValue: '0 : 25',
    options: ['0', '25', '1', 'Nem értelmezhető'],
    correctAnswer: 0,
    hint: 'Ha 0 almát osztunk el 25 gyerek között, mindenkinek 0 jut.',
    explanation: '0-t bármely nem-nulla számmal osztva az eredmény mindig 0.',
    breakdown: [
      { label: 'Szabály', value: '0 : a = 0 (ha a ≠ 0)' }
    ]
  },
  {
    id: 'div-l1-q6',
    level: 1,
    question: 'Mennyi a 29 : 6 maradékos osztás eredménye?',
    highlightValue: '29 : 6',
    options: ['4, maradék 5', '4, maradék 3', '5, maradék 1', '4, maradék 6'],
    correctAnswer: 0,
    hint: '4 · 6 = 24. 29 – 24 = 5.',
    explanation: '29 : 6 = 4, maradék 5. Ellenőrzés: 4 · 6 + 5 = 24 + 5 = 29.',
    breakdown: [
      { label: 'Bennfoglalás', value: '4 · 6 = 24' },
      { label: 'Maradék', value: '29 – 24 = 5' }
    ]
  },
  {
    id: 'div-l1-q7',
    level: 1,
    question: 'Mennyi a 840 : 20 osztás eredménye fejben?',
    highlightValue: '840 : 20',
    options: ['42', '420', '84', '24'],
    correctAnswer: 0,
    hint: 'Először mindkét számból elhagyunk 1 nullát: 84 : 2.',
    explanation: '840 : 20 = 84 : 2 = 42.',
    breakdown: [
      { label: 'Egyszerűsítés', value: '840 : 20 = 84 : 2' },
      { label: 'Hányados', value: '42' }
    ]
  },
  {
    id: 'div-l1-q8',
    level: 1,
    question: 'Ha 6-tal osztunk, mekkora lehet a legnagyobb lehetséges maradék?',
    highlightValue: 'Osztó = 6, max maradék?',
    options: ['5', '6', '7', '4'],
    correctAnswer: 0,
    hint: 'A maradék mindig szigorúan kisebb kell legyen az osztónál (r < 6).',
    explanation: 'Mivel 0 ≤ r < Osztó, ezért 6-os osztónál a lehetséges maradékok: 0, 1, 2, 3, 4, 5. A legnagyobb az 5.',
    breakdown: [
      { label: 'Szabály', value: '0 ≤ r < Osztó' },
      { label: 'Legnagyobb maradék', value: '6 – 1 = 5' }
    ]
  },
  {
    id: 'div-l1-q9',
    level: 1,
    question: 'Mennyi a hiányzó szám: x : 6 = 15?',
    highlightValue: 'x : 6 = 15',
    options: ['90', '80', '60', '75'],
    correctAnswer: 0,
    hint: 'Az osztandót úgy kapjuk meg, hogy a hányadost megszorozzuk az osztóval.',
    explanation: 'x = 15 · 6 = 90.',
    breakdown: [
      { label: 'Összefüggés', value: 'x = 15 · 6' },
      { label: 'Eredmény', value: '90' }
    ]
  },
  {
    id: 'div-l1-q10',
    level: 1,
    question: 'Mennyi a 100 : 4 osztás eredménye?',
    highlightValue: '100 : 4',
    options: ['25', '20', '30', '15'],
    correctAnswer: 0,
    hint: '100 fele 50, 50 fele 25.',
    explanation: '100 : 4 = 25.',
    breakdown: [
      { label: 'Felezés kétszer', value: '100 : 2 = 50 ⟹ 50 : 2 = 25' }
    ]
  },

  // ==========================================
  // LEVEL 2: Írásbeli osztás egyjegyűvel, maradékos összefüggések (10 kérdés)
  // ==========================================
  {
    id: 'div-l2-q1',
    level: 2,
    question: 'Mennyi az 542 : 2 írásbeli osztás eredménye?',
    highlightValue: '542 : 2',
    options: ['271', '261', '281', '272'],
    correctAnswer: 0,
    hint: '5-ben a 2 megvan 2-szer (m 1); 14-ben a 2 megvan 7-szer (m 0); 2-ben a 2 megvan 1-szer (m 0).',
    explanation: '542 : 2 = 271.',
    breakdown: [
      { label: 'Százasok', value: '5 : 2 = 2, maradt 1' },
      { label: 'Tízesek', value: '14 : 2 = 7, maradt 0' },
      { label: 'Egyesek', value: '2 : 2 = 1, maradt 0' }
    ]
  },
  {
    id: 'div-l2-q2',
    level: 2,
    question: 'Mennyi a 756 : 3 írásbeli osztás eredménye?',
    highlightValue: '756 : 3',
    options: ['252', '242', '262', '256'],
    correctAnswer: 0,
    hint: '7-ben a 3 megvan 2-szer (m 1); 15-ben a 3 megvan 5-ször (m 0); 6-ban a 3 megvan 2-szer (m 0).',
    explanation: '756 : 3 = 252. Ellenőrzés: 252 · 3 = 756.',
    breakdown: [
      { label: 'Lépések', value: '7:3=2 (m 1); 15:3=5 (m 0); 6:3=2' }
    ]
  },
  {
    id: 'div-l2-q3',
    level: 2,
    question: 'Hogyan ellenőrizzük a 47 : 5 = 9, maradék 2 osztást?',
    highlightValue: '47 : 5 = 9, m 2',
    options: ['9 · 5 + 2 = 45 + 2 = 47', '9 · 5 – 2 = 43', '9 + 5 + 2 = 16', '47 – 9 = 38'],
    correctAnswer: 0,
    hint: 'Hányados · Osztó + Maradék = Osztandó.',
    explanation: 'Hányados (9) · Osztó (5) + Maradék (2) = 45 + 2 = 47.',
    breakdown: [
      { label: 'Képlet', value: 'Hányados · Osztó + Maradék = Osztandó' },
      { label: 'Számítás', value: '9 · 5 + 2 = 47 ✓' }
    ]
  },
  {
    id: 'div-l2-q4',
    level: 2,
    question: 'Mennyi a 864 : 4 írásbeli osztás eredménye?',
    highlightValue: '864 : 4',
    options: ['216', '226', '206', '214'],
    correctAnswer: 0,
    hint: '8:4=2 (m 0); 6:4=1 (m 2); 24:4=6 (m 0).',
    explanation: '864 : 4 = 216.',
    breakdown: [
      { label: 'Lépések', value: '8:4=2; 6:4=1 (m 2); 24:4=6' }
    ]
  },
  {
    id: 'div-l2-q5',
    level: 2,
    question: 'Egy pék 348 kiflit sütött, és 4-esével csomagolja zacskókba. Hány zacskó kifli lesz?',
    highlightValue: '348 : 4',
    options: ['87', '86', '97', '78'],
    correctAnswer: 0,
    hint: '34-ben a 4 megvan 8-szor (m 2); 28-ban a 4 megvan 7-szer.',
    explanation: '348 : 4 = 87 zacskó.',
    breakdown: [
      { label: 'Számolás', value: '348 : 4 = 87' }
    ]
  },
  {
    id: 'div-l2-q6',
    level: 2,
    question: 'Mennyi a 95 : 10 maradékos osztás hányadosa és maradéka?',
    highlightValue: '95 : 10',
    options: ['9, maradék 5', '8, maradék 15', '9, maradék 0', '10, maradék 5'],
    correctAnswer: 0,
    hint: '9 · 10 = 90, 95 – 90 = 5.',
    explanation: '95 : 10 = 9, maradék 5.',
    breakdown: [
      { label: 'Hányados', value: '9' },
      { label: 'Maradék', value: '5' }
    ]
  },
  {
    id: 'div-l2-q7',
    level: 2,
    question: 'Kerekítéssel becsülve mennyi a 784 : 8 szorzat nagyságrendje?',
    highlightValue: '784 : 8 (becslés)',
    options: ['800 : 8 = 100', '700 : 8 = 90', '800 : 10 = 80', '600 : 8 = 75'],
    correctAnswer: 0,
    hint: '784 ≈ 800. 800 : 8 = 100.',
    explanation: '784 ≈ 800 ⟹ 800 : 8 = 100. (A pontos érték: 98).',
    breakdown: [
      { label: 'Kerekítés', value: '784 ≈ 800' },
      { label: 'Becslés', value: '800 : 8 = 100' }
    ]
  },
  {
    id: 'div-l2-q8',
    level: 2,
    question: 'Mennyi a 625 : 25 osztás eredménye fejben?',
    highlightValue: '625 : 25',
    options: ['25', '24', '35', '15'],
    correctAnswer: 0,
    hint: '100-ban a 25 megvan 4-szer. 600-ban 24-szer, 625-ben 25-ször.',
    explanation: '625 : 25 = 25 (mert 25 · 25 = 625).',
    breakdown: [
      { label: 'Gondolatmenet', value: '6 · 4 + 1 = 25' }
    ]
  },
  {
    id: 'div-l2-q9',
    level: 2,
    question: 'Melyik számjegy hiányzik: 4?8 : 6 = 78?',
    highlightValue: '4?8 : 6 = 78',
    options: ['6', '5', '7', '8'],
    correctAnswer: 0,
    hint: 'Ellenőrizd szorzással: 78 · 6 = 468!',
    explanation: '78 · 6 = 468, így a hiányzó számjegy a 6.',
    breakdown: [
      { label: 'Szorzás', value: '78 · 6 = 468' },
      { label: 'Hiányzó jegy', value: '6' }
    ]
  },
  {
    id: 'div-l2-q10',
    level: 2,
    question: 'Mennyi az 1 000 : 8 osztás pontos értéke?',
    highlightValue: '1 000 : 8',
    options: ['125', '120', '135', '115'],
    correctAnswer: 0,
    hint: '1000 fele 500, negyede 250, nyolcada 125.',
    explanation: '1 000 : 8 = 125.',
    breakdown: [
      { label: 'Háromszori felezés', value: '1000 ⟹ 500 ⟹ 250 ⟹ 125' }
    ]
  },

  // ==========================================
  // LEVEL 3: Kétjegyű osztóval való írásbeli osztás, szöveges feladatok (10 kérdés)
  // ==========================================
  {
    id: 'div-l3-q1',
    level: 3,
    question: 'Mennyi a 842 : 26 írásbeli osztás eredménye?',
    highlightValue: '842 : 26',
    options: ['32, maradék 10', '32, maradék 8', '31, maradék 12', '33, maradék 2'],
    correctAnswer: 0,
    hint: '84-ben a 26 megvan 3-szor (3·26=78, m 6); 62-ben a 26 megvan 2-szer (2·26=52, m 10).',
    explanation: '842 : 26 = 32, maradék 10. Ellenőrzés: 32 · 26 + 10 = 832 + 10 = 842.',
    breakdown: [
      { label: '1. lépés (84 : 26)', value: '3, maradt 6' },
      { label: '2. lépés (62 : 26)', value: '2, maradt 10' }
    ]
  },
  {
    id: 'div-l3-q2',
    level: 3,
    question: 'Mennyi az 1 440 : 45 írásbeli osztás értéke?',
    highlightValue: '1 440 : 45',
    options: ['32', '34', '28', '36'],
    correctAnswer: 0,
    hint: '144-ben a 45 megvan 3-szor (3·45=135, m 9); 90-ben a 45 megvan 2-szer (2·45=90, m 0).',
    explanation: '1 440 : 45 = 32. Ellenőrzés: 32 · 45 = 1 440.',
    breakdown: [
      { label: '144 : 45', value: '3, maradt 9' },
      { label: '90 : 45', value: '2, maradt 0' }
    ]
  },
  {
    id: 'div-l3-q3',
    level: 3,
    question: 'Mennyi a 2 088 : 36 írásbeli osztás eredménye?',
    highlightValue: '2 088 : 36',
    options: ['58', '56', '62', '48'],
    correctAnswer: 0,
    hint: '208-ban a 36 megvan 5-ször (5·36=180, m 28); 288-ban a 36 megvan 8-szor (8·36=288, m 0).',
    explanation: '2 088 : 36 = 58. Ellenőrzés: 58 · 36 = 2 088.',
    breakdown: [
      { label: '208 : 36', value: '5, maradt 28' },
      { label: '288 : 36', value: '8, maradt 0' }
    ]
  },
  {
    id: 'div-l3-q4',
    level: 3,
    question: 'Egy gyümölcsösben 960 kg almát 32 kg-os rekeszekbe raknak. Hány rekesz telik meg?',
    highlightValue: '960 : 32',
    options: ['30', '32', '28', '25'],
    correctAnswer: 0,
    hint: '96 : 32 = 3, utána a 0 lehozva 0.',
    explanation: '960 : 32 = 30 rekesz.',
    breakdown: [
      { label: 'Számolás', value: '960 : 32 = 30' }
    ]
  },
  {
    id: 'div-l3-q5',
    level: 3,
    question: 'Mennyi a 3 750 : 50 osztás eredménye a legegyszerűbb módon?',
    highlightValue: '3 750 : 50',
    options: ['75', '65', '85', '70'],
    correctAnswer: 0,
    hint: 'Mindkét számból elhagyunk 1 nullát: 375 : 5 = 75.',
    explanation: '3 750 : 50 = 375 : 5 = 75.',
    breakdown: [
      { label: 'Egyszerűsítés', value: '375 : 5' },
      { label: 'Eredmény', value: '75' }
    ]
  },
  {
    id: 'div-l3-q6',
    level: 3,
    question: 'Hogyan változik a hányados, ha az osztandót és az osztót is MEGDUBPLÁZZUK (2-szeresére növeljük)?',
    highlightValue: '(2 · a) : (2 · b)',
    options: ['Nem változik', 'Kétszeresére nő', 'Feleződik', 'Négyszeresére nő'],
    correctAnswer: 0,
    hint: 'Példa: 20 : 4 = 5. Ha duplázzuk: 40 : 8 = 5!',
    explanation: 'Ez a törtbővítés/osztás alapelve: ha az osztandót és az osztót ugyanazzal a nem-nulla számmal szorozzuk, a hányados nem változik.',
    breakdown: [
      { label: 'Szabály', value: '(a · c) : (b · c) = a : b' }
    ]
  },
  {
    id: 'div-l3-q7',
    level: 3,
    question: 'Egy kirándulásra 420 diák utazik 45 fős buszokkal. Hány buszra van szükség, hogy mindenki elférjen?',
    highlightValue: '420 : 45',
    options: ['10 busz', '9 busz', '8 busz', '11 busz'],
    correctAnswer: 0,
    hint: '420 : 45 = 9, maradék 15 diák. A 15 diáknak is kell még egy busz!',
    explanation: '420 : 45 = 9, maradék 15. A 9 busz tele lesz, a maradék 15 diáknak még 1 busz kell, így összesen 10 busz szükséges.',
    breakdown: [
      { label: 'Osztás', value: '420 : 45 = 9, m 15' },
      { label: 'Szöveges válasz', value: '9 + 1 = 10 busz' }
    ]
  },
  {
    id: 'div-l3-q8',
    level: 3,
    question: 'Mennyi az 5 000 : 125 osztás értéke?',
    highlightValue: '5 000 : 125',
    options: ['40', '50', '25', '45'],
    correctAnswer: 0,
    hint: '1000-ben a 125 megvan 8-szor. 5000-ben 5 · 8 = 40-szer.',
    explanation: '5 000 : 125 = (5 · 1000) : 125 = 5 · 8 = 40.',
    breakdown: [
      { label: 'Gondolatmenet', value: '1000 : 125 = 8 ⟹ 5 · 8 = 40' }
    ]
  },
  {
    id: 'div-l3-q9',
    level: 3,
    question: 'Mennyi a hiányzó szám: 3 600 : x = 45?',
    highlightValue: '3 600 : x = 45',
    options: ['80', '70', '90', '60'],
    correctAnswer: 0,
    hint: 'x = 3600 : 45.',
    explanation: 'x = 3 600 : 45 = 80.',
    breakdown: [
      { label: 'Számítás', value: '3600 : 45 = 80' }
    ]
  },
  {
    id: 'div-l3-q10',
    level: 3,
    question: 'Melyik állítás HAMIS a maradékos osztásra?',
    highlightValue: 'Maradékos osztás állításai',
    options: [
      'A maradék lehet nagyobb az osztónál',
      'A maradék mindig kisebb az osztónál',
      'Ha a maradék 0, akkor pontosan osztható',
      'Osztandó = Hányados · Osztó + Maradék'
    ],
    correctAnswer: 0,
    hint: 'Ha a maradék nagyobb lenne az osztónál, a hányadost még lehetne növelni.',
    explanation: 'A maradék SOHA nem lehet nagyobb vagy egyenlő az osztóval (0 ≤ r < Osztó). Ezért a „lehet nagyobb” állítás hamis.',
    breakdown: [
      { label: 'Szabály', value: '0 ≤ r < Osztó' }
    ]
  }
];

const divisionCheatSheet: CheatSheetSection[] = [
  {
    title: 'Az Osztás Alapfogalmai',
    items: [
      { label: 'Művelet felépítése', value: 'Osztandó : Osztó = Hányados' },
      { label: '0 az osztásban', value: '0 : a = 0 (ha a ≠ 0), de 0-val osztani TILOS!' },
      { label: '1 az osztásban', value: 'a : 1 = a' }
    ]
  },
  {
    title: 'Maradékos Osztás',
    items: [
      { label: 'Alaptétel', value: 'Osztandó = Hányados · Osztó + Maradék' },
      { label: 'Maradék korlátja', value: '0 ≤ Maradék < Osztó (szigorúan kisebb)' }
    ]
  },
  {
    title: 'Osztás 10 Hatványaival',
    items: [
      { label: ': 10', value: '1 nullát elhagyunk (450 : 10 = 45)' },
      { label: ': 100', value: '2 nullát elhagyunk (7 200 : 100 = 72)' },
      { label: ': 1 000', value: '3 nullát elhagyunk (38 000 : 1 000 = 38)' }
    ]
  }
];

export function DivisionQuiz({ onBack, onSwitchToTheory }: DivisionQuizProps) {
  return (
    <QuizTemplate
      topicId="g5-division"
      topicTitle="Osztás, írásbeli osztás kétjegyű osztóval"
      grade={5}
      chapterId="egesz-szamok"
      title="Osztás, írásbeli osztás Kvíz"
      subtitle="Gyakorold a fejben és írásban történő osztást, a maradékos osztást és a kétjegyű osztóval való számolást!"
      questions={divisionQuestions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      cheatSheetSections={divisionCheatSheet}
      matcherComponent={<DivisionMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<DivisionSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
}

export default DivisionQuiz;
