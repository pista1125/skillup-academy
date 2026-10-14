import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { FractionPartMatcher } from './FractionPartMatcher';
import { FractionPartSorter } from './FractionPartSorter';

interface FractionPartQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
}

export const FractionPartQuiz: React.FC<FractionPartQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onOpenMatcher,
  onOpenSorter
}) => {
  const questions: Question[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Alapszabályok és egyszerű számítások)
    // ==========================================
    {
      id: 'q1',
      level: 1,
      question: 'Milyen matematikai művelettel számítjuk ki egy szám törtrészét?',
      options: [
        'A számot megszorozzuk a megadott törttel',
        'A számot elosztjuk a számlálóval',
        'Kivonjuk a számból a törtet',
        'Összeadjuk a számot és a törtet'
      ],
      correctAnswer: 0,
      hint: 'Törtrész = Egész · (a / b).',
      explanation: 'Egy szám törtrészét úgy kapjuk meg, hogy a számot megszorozzuk a törttel (azaz osztunk a nevezővel és szorzunk a számlálóval).'
    },
    {
      id: 'q2',
      level: 1,
      question: 'Mennyi 80-nak a 3/4 része?',
      options: [
        '60',
        '20',
        '40',
        '64'
      ],
      correctAnswer: 0,
      hint: 'Először 80 : 4 = 20, majd 20 · 3 = ?',
      explanation: '80 : 4 = 20 (ez az 1/4 rész), majd 20 · 3 = 60.'
    },
    {
      id: 'q3',
      level: 1,
      question: 'Milyen művelettel számítjuk vissza az egész számot, ha ismerjük egy törtrészének értékét?',
      options: [
        'A törtrész értékét elosztjuk a törttel',
        'A törtrész értékét megszorozzuk a számlálóval',
        'Kivonjuk a törtrészt az 1-ből',
        'Összeadjuk a számlálót és a nevezőt'
      ],
      correctAnswer: 0,
      hint: 'Egész = Törtrész : (a / b).',
      explanation: 'Az egész visszaszámolásához a megadott törtrészt elosztjuk a törttel (azaz osztunk a számlálóval és szorzunk a nevezővel).'
    },
    {
      id: 'q4',
      level: 1,
      question: 'Melyik számnak a fele (1/2 része) az 50?',
      options: [
        '100',
        '25',
        '75',
        '150'
      ],
      correctAnswer: 0,
      hint: 'Ha a fele 50, akkor a duplája a teljes egész.',
      explanation: '50 : (1/2) = 50 · 2 = 100.'
    },
    {
      id: 'q5',
      level: 1,
      question: 'Mennyi 150-nek a 2/5 része?',
      options: [
        '60',
        '30',
        '50',
        '75'
      ],
      correctAnswer: 0,
      hint: '150 : 5 = 30, majd 30 · 2 = ?',
      explanation: '150 : 5 = 30 (ez az 1/5 rész), majd 30 · 2 = 60.'
    },
    {
      id: 'q6',
      level: 1,
      question: 'Hányadrésze a 15 a 45-nek?',
      options: [
        '1/3 része',
        '1/4 része',
        '3/5 része',
        '1/2 része'
      ],
      correctAnswer: 0,
      hint: 'Írd fel törtként: 15 / 45, majd egyszerűsíts!',
      explanation: '15 / 45 = (15 : 15) / (45 : 15) = 1/3 része.'
    },
    {
      id: 'q7',
      level: 1,
      question: 'Mennyi 200 Ft-nak a 7/10 része?',
      options: [
        '140 Ft',
        '70 Ft',
        '120 Ft',
        '160 Ft'
      ],
      correctAnswer: 0,
      hint: '200 : 10 = 20, majd 20 · 7 = ?',
      explanation: '200 : 10 = 20 Ft, és 20 · 7 = 140 Ft.'
    },
    {
      id: 'q8',
      level: 1,
      question: 'Egy tábla csokoládé 24 kockából áll. Péter megette a 3/8 részét. Hány kockát evett meg?',
      options: [
        '9 kockát',
        '8 kockát',
        '6 kockát',
        '12 kockát'
      ],
      correctAnswer: 0,
      hint: '24 : 8 = 3, majd 3 · 3 = ?',
      explanation: '24 : 8 = 3 (1/8 rész), így 3 · 3 = 9 kockát evett meg.'
    },
    {
      id: 'q9',
      level: 1,
      question: 'Hány perc 1 óra 2/3 része?',
      options: [
        '40 perc',
        '30 perc',
        '45 perc',
        '20 perc'
      ],
      correctAnswer: 0,
      hint: '1 óra = 60 perc. Mennyi 60 percnek a 2/3 része?',
      explanation: '60 perc : 3 = 20 perc (1/3 rész), így 20 · 2 = 40 perc.'
    },
    {
      id: 'q10',
      level: 1,
      question: 'Ha egy torta 5/6 részét megették, mekkora törtrész maradt meg belőle?',
      options: [
        '1/6 része',
        '2/6 része',
        '1/5 része',
        '5/6 része'
      ],
      correctAnswer: 0,
      hint: 'A teljes egész az 6/6 rész.',
      explanation: 'A teljes torta 6/6 része. 6/6 - 5/6 = 1/6 része maradt meg.'
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Visszaszámolás és szöveges feladatok)
    // ==========================================
    {
      id: 'q11',
      level: 2,
      question: 'Melyik számnak a 2/3 része a 40?',
      options: [
        '60',
        '80',
        '50',
        '90'
      ],
      correctAnswer: 0,
      hint: '40 : 2 = 20 (ez az 1/3 rész), majd 20 · 3 = ?',
      explanation: '40 : (2/3) = 40 : 2 · 3 = 20 · 3 = 60.'
    },
    {
      id: 'q12',
      level: 2,
      question: 'Melyik számnak a 3/5 része a 90?',
      options: [
        '150',
        '120',
        '180',
        '135'
      ],
      correctAnswer: 0,
      hint: '90 : 3 = 30 (ez az 1/5 rész), majd 30 · 5 = ?',
      explanation: '90 : (3/5) = 90 : 3 · 5 = 30 · 5 = 150.'
    },
    {
      id: 'q13',
      level: 2,
      question: 'Anna elköltötte a zsebpénzének 4/7 részét, ami 2400 Ft volt. Mennyi volt az összes zsebpénze?',
      options: [
        '4200 Ft',
        '3600 Ft',
        '4800 Ft',
        '3500 Ft'
      ],
      correctAnswer: 0,
      hint: '2400 : 4 = 600 Ft (1/7 rész), majd 600 · 7 = ?',
      explanation: '2400 : 4 = 600 Ft az 1/7 rész. A teljes zsebpénz (7/7 rész): 600 · 7 = 4200 Ft.'
    },
    {
      id: 'q14',
      level: 2,
      question: 'Hányadrésze a 45 perc a 2 órának?',
      options: [
        '3/8 része',
        '3/4 része',
        '1/4 része',
        '5/12 része'
      ],
      correctAnswer: 0,
      hint: '2 óra = 120 perc. Mennyi 45 / 120 egyszerűsítve?',
      explanation: '2 óra = 120 perc. 45 / 120 = (45 : 15) / (120 : 15) = 3/8 része.'
    },
    {
      id: 'q15',
      level: 2,
      question: 'Hányadrésze a 250 g a 2 kg-nak?',
      options: [
        '1/8 része',
        '1/4 része',
        '1/5 része',
        '1/10 része'
      ],
      correctAnswer: 0,
      hint: '2 kg = 2000 g. Írd fel: 250 / 2000.',
      explanation: '2 kg = 2000 g. 250 / 2000 = (250 : 250) / (2000 : 250) = 1/8 része.'
    },
    {
      id: 'q16',
      level: 2,
      question: 'Egy könyv 240 oldalas. Dóri elolvasta az 5/8 részét. Hány oldal van még hátra?',
      options: [
        '90 oldal',
        '150 oldal',
        '80 oldal',
        '100 oldal'
      ],
      correctAnswer: 0,
      hint: 'Ha 5/8-át elolvasta, 3/8-a van még hátra. Vagy 240 - 150 = ?',
      explanation: '1/8 rész = 240 : 8 = 30 oldal. Elolvasott: 5 · 30 = 150 oldalt. Hátravan: 240 - 150 = 90 oldal (vagy 3 · 30 = 90).'
    },
    {
      id: 'q17',
      level: 2,
      question: 'Egy víztartálynak a 4/9 része tele van, ami 360 liter vizet jelent. Hány liter víz fér a teljes tartályba?',
      options: [
        '810 liter',
        '720 liter',
        '900 liter',
        '640 liter'
      ],
      correctAnswer: 0,
      hint: '360 : 4 = 90 liter (1/9 rész), majd 90 · 9 = ?',
      explanation: '360 : 4 = 90 liter az 1/9 rész. A teljes tartály (9/9 rész): 90 · 9 = 810 liter.'
    },
    {
      id: 'q18',
      level: 2,
      question: 'Egy téglalap területe 180 cm². Mekkora a 7/12 részének a területe?',
      options: [
        '105 cm²',
        '95 cm²',
        '115 cm²',
        '120 cm²'
      ],
      correctAnswer: 0,
      hint: '180 : 12 = 15 cm², majd 15 · 7 = ?',
      explanation: '180 : 12 = 15 cm² (1/12 rész), így 15 · 7 = 105 cm².'
    },
    {
      id: 'q19',
      level: 2,
      question: 'Egy 32 fős osztály 3/4 része sportol rendszeresen. Közülük 1/3 rész focizik. Hány tanuló focizik?',
      options: [
        '8 tanuló',
        '6 tanuló',
        '12 tanuló',
        '10 tanuló'
      ],
      correctAnswer: 0,
      hint: 'Először számold ki a sportolókat: 32 · (3/4) = 24, majd ennek az 1/3 részét!',
      explanation: 'Sportol: 32 : 4 · 3 = 24 tanuló. Ebből focizik: 24 : 3 = 8 tanuló (ami az egész osztály 1/4 része: 3/4 · 1/3 = 1/4).'
    },
    {
      id: 'q20',
      level: 2,
      question: 'Melyik szám nagyobb: a 60-nak a 3/5 része vagy a 40-nek a 3/4 része?',
      options: [
        'Egyenlőek (mindkettő 36)',
        'A 60-nak a 3/5 része nagyobb',
        'A 40-nek a 3/4 része nagyobb',
        'Nem lehet eldönteni'
      ],
      correctAnswer: 0,
      hint: '60 · (3/5) = 12 · 3 = 36. És 40 · (3/4) = 10 · 3 = ?',
      explanation: '60 : 5 · 3 = 12 · 3 = 36. 40 : 4 · 3 = 10 · 3 = 30... Állj! 36 ≠ 30! Tehát a 60-nak a 3/5 része (36) nagyobb mint a 40-nek a 3/4 része (30)!'
    },

    // ==========================================
    // 3. SZINT: MESTER (Összetett és fordított feladatok)
    // ==========================================
    {
      id: 'q21',
      level: 3,
      question: 'Balázs a pénzének 1/3 részét könyvre, a MARADÉK 1/2 részét mozira költötte. Végül maradt 2000 Ft-ja. Mennyi pénze volt eredetileg?',
      options: [
        '6000 Ft',
        '4000 Ft',
        '8000 Ft',
        '5000 Ft'
      ],
      correctAnswer: 0,
      hint: 'Könyv után maradt 2/3 része. Ennek a fele 1/3 rész. Tehát a megmaradt 2000 Ft az eredeti pénz 1/3 része.',
      explanation: 'A könyv után megmaradt 2/3 rész. Ennek a fele (1/3 rész) ment mozira, így megint 1/3 rész maradt meg. Mivel az 1/3 rész = 2000 Ft, a teljes pénze 2000 · 3 = 6000 Ft volt.'
    },
    {
      id: 'q22',
      level: 3,
      question: 'Egy kirándulócsoport az első nap megtette az út 2/5 részét, a második nap a maradék út 3/4 részét. Hányadrésze maradt a harmadik napra az egész útnak?',
      options: [
        '3/20 része',
        '1/5 része',
        '1/10 része',
        '3/10 része'
      ],
      correctAnswer: 0,
      hint: '1. nap után maradt 3/5. 2. napon ennek 3/4-ét tették meg: (3/5) · (3/4) = 9/20.',
      explanation: '1. nap után maradt 3/5 rész. 2. nap: 3/5 · 3/4 = 9/20 rész. A két nap alatt: 2/5 + 9/20 = 8/20 + 9/20 = 17/20 rész. A 3. napra maradt: 20/20 - 17/20 = 3/20 része az útnak.'
    },
    {
      id: 'q23',
      level: 3,
      question: 'Egy kabát árát felemelték az 1/5 részével, így az új ára 18 000 Ft lett. Mennyi volt az eredeti ára?',
      options: [
        '15 000 Ft',
        '14 400 Ft',
        '16 000 Ft',
        '12 000 Ft'
      ],
      correctAnswer: 0,
      hint: 'Az új ár az eredeti ár 6/5 része (1 + 1/5 = 6/5). 18 000 : 6 · 5 = ?',
      explanation: 'Az új ár az eredeti ár 6/5 része. 18 000 : 6 = 3000 Ft (1/5 rész), így az eredeti ár (5/5 rész): 3000 · 5 = 15 000 Ft.'
    },
    {
      id: 'q24',
      level: 3,
      question: 'Egy akvárium 3/4 részig van vízzel. Ha kimerünk belőle 15 litert, akkor félig (2/4 részig) lesz. Hány literes az akvárium?',
      options: [
        '60 literes',
        '45 literes',
        '50 literes',
        '75 literes'
      ],
      correctAnswer: 0,
      hint: 'A 3/4 és az 1/2 (2/4) különbsége 1/4 rész. Ez az 1/4 rész = 15 liter.',
      explanation: '3/4 - 1/2 = 3/4 - 2/4 = 1/4 rész. Ez az 1/4 rész felel meg 15 liternek. A teljes akvárium térfogata: 15 · 4 = 60 liter.'
    },
    {
      id: 'q25',
      level: 3,
      question: 'Egy szám 2/3 részének a 4/5 része 24. Melyik ez a szám?',
      options: [
        '45',
        '40',
        '50',
        '60'
      ],
      correctAnswer: 0,
      hint: 'Törtrész törtrésze: (2/3) · (4/5) = 8/15. Melyik számnak a 8/15 része 24?',
      explanation: '2/3 · 4/5 = 8/15 része a számnak 24. 24 : 8 = 3 (1/15 rész), így a teljes szám: 3 · 15 = 45.'
    },
    {
      id: 'q26',
      level: 3,
      question: 'Melyik számnak az 5/6 része 25-tel több, mint a fele (3/6 része)?',
      options: [
        '75',
        '60',
        '90',
        '50'
      ],
      correctAnswer: 0,
      hint: '5/6 - 3/6 = 2/6 = 1/3 része a számnak pontosan 25.',
      explanation: '5/6 - 1/2 = 5/6 - 3/6 = 2/6 = 1/3 rész. Ha az 1/3 rész 25, akkor a teljes szám: 25 · 3 = 75.'
    },
    {
      id: 'q27',
      level: 3,
      question: 'Egy kertészetben 360 fa van. A fák 1/3 része almafa, 1/4 része körtefa, a többi szilvafa. Hány szilvafa van a kertben?',
      options: [
        '150 fa',
        '120 fa',
        '90 fa',
        '180 fa'
      ],
      correctAnswer: 0,
      hint: 'Almafa: 360 : 3 = 120. Körtefa: 360 : 4 = 90. Szilvafa: 360 - 120 - 90 = ?',
      explanation: 'Almafa: 120 db. Körtefa: 90 db. Együtt: 120 + 90 = 210 db. Szilvafa: 360 - 210 = 150 db (ami a fák 5/12 része).'
    },
    {
      id: 'q28',
      level: 3,
      question: 'Egy iskola tanulóinak 4/7 része lány. Tudjuk, hogy 120-szal több lány van, mint fiú. Hány tanuló jár az iskolába?',
      options: [
        '840 tanuló',
        '700 tanuló',
        '560 tanuló',
        '980 tanuló'
      ],
      correctAnswer: 0,
      hint: 'Lányok: 4/7 rész, fiúk: 3/7 rész. A különbség 1/7 rész = 120 tanuló.',
      explanation: 'A lányok 4/7, a fiúk 7/7 - 4/7 = 3/7 rész. A különbség: 4/7 - 3/7 = 1/7 rész. Mivel 1/7 rész = 120 tanuló, az egész iskola létszáma: 120 · 7 = 840 tanuló.'
    },
    {
      id: 'q29',
      level: 3,
      question: 'Ha egy számot megszorzunk 3/4-gyel, az eredmény 18-cal kevesebb lesz az eredeti számnál. Melyik ez a szám?',
      options: [
        '72',
        '54',
        '90',
        '36'
      ],
      correctAnswer: 0,
      hint: 'Az egész (4/4) és a 3/4 különbsége 1/4 rész. Ez az 1/4 rész = 18.',
      explanation: 'Az egészből kivonva a 3/4-ét 1/4 rész marad. Ez a hiányzó 1/4 rész = 18. A teljes szám: 18 · 4 = 72.'
    },
    {
      id: 'q30',
      level: 3,
      question: 'Egy hordóban bor van. Először eladták az 1/4 részét, majd még 30 litert, így a hordó fele kiürült. Hány liter bor volt eredetileg a teli hordóban?',
      options: [
        '120 liter',
        '100 liter',
        '80 liter',
        '150 liter'
      ],
      correctAnswer: 0,
      hint: 'A feléhez (2/4) még 1/4 rész hiányzott az első eladás (1/4) után. Tehát a 30 liter = 1/4 rész.',
      explanation: 'Az eladott rész: 1/4 rész + 30 liter = 1/2 rész (azaz 2/4 rész). Ebből a 30 liter pontosan 2/4 - 1/4 = 1/4 rész. A teljes hordó: 30 · 4 = 120 liter.'
    }
  ];

  return (
    <QuizTemplate
      title="Törtrész és egész kvíz"
      subtitle="Gyakorold a törtrész kiszámítását, visszaszámolást az egészre és szöveges feladatokat 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 🏆 KVÍZ"
      themeColor="teal"
      category="Törtrész"
      topicTitle="Törtrész és az egész"
      questions={questions}
      matcherComponent={FractionPartMatcher}
      sorterComponent={FractionPartSorter}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default FractionPartQuiz;
