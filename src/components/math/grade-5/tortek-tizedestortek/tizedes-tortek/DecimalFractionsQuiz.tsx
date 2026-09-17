import React from 'react';
import { QuizTemplate, Question, DifficultyLevel } from '../QuizTemplate';
import { DecimalFractionsMatcher } from './DecimalFractionsMatcher';
import { DecimalFractionsSorter } from './DecimalFractionsSorter';

export interface DecimalFractionsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

export const decimalFractionsQuestions: Record<DifficultyLevel, Question[]> = {
  // 1. SZINT: KÖNNYŰ (10 feladat) - Helyiérték felismerés, kiolvasás, alaptörtek
  1: [
    {
      id: 'g5-df-l1-1',
      question: 'Hogyan írjuk le tizedes tört alakban a 3 tizedet?',
      options: ['0,3', '0,03', '3,0', '0,003'],
      correctAnswer: '0,3',
      explanation: 'A tizedek helyiértéke közvetlenül a tizedesvessző utáni első helyen áll: 0,3.',
      breakdown: [
        '1. lépés: 3 tized = 3/10.',
        '2. lépés: A tizedek az 1. tizedesjegyen állnak.',
        '3. lépés: Tizedes tört alak: 0,3.'
      ],
      hint: 'A tizedesvessző után 1 számjegy van: 0,3.',
      formula: '3/10 = 0,3'
    },
    {
      id: 'g5-df-l1-2',
      question: 'Hogyan olvassuk ki a 0,07 tizedes törtet?',
      options: ['7 század', '7 tized', '7 ezred', '70 század'],
      correctAnswer: '7 század',
      explanation: 'A 7-es a második tizedesjegyen áll, ami a századok helyiértéke: 7 század.',
      breakdown: [
        '1. lépés: 1. tizedesjegy (tizedek): 0.',
        '2. lépés: 2. tizedesjegy (századok): 7.',
        '3. lépés: Kiolvasva: 7 század.'
      ],
      hint: 'A tizedesvessző utáni második hely a századoké.',
      formula: '0,07 = 7/100'
    },
    {
      id: 'g5-df-l1-3',
      question: 'Melyik számjegy áll a tizedek helyén a 4,72 számban?',
      options: ['7', '4', '2', '0'],
      correctAnswer: '7',
      explanation: 'A tizedesvessző után közvetlenül az első számjegy (7) a tizedek helyiértéke.',
      breakdown: [
        '1. lépés: 4 = egyesek.',
        '2. lépés: 7 = tizedek (közvetlenül a vessző után).',
        '3. lépés: 2 = századok.'
      ],
      hint: 'A tizedesvessző utáni legelső számjegy a tized.',
      formula: '4,72 → 7 tized'
    },
    {
      id: 'g5-df-l1-4',
      question: 'Melyik közönséges tört felel meg a 0,5 tizedes törtnek?',
      options: ['1/2 (azaz 5/10)', '1/5', '5/100', '1/50'],
      correctAnswer: '1/2 (azaz 5/10)',
      explanation: '0,5 = 5/10, ami 5-tel egyszerűsítve 1/2 (egy fél).',
      breakdown: [
        '1. lépés: 0,5 = 5/10.',
        '2. lépés: Egyszerűsítés 5-tel: (5:5)/(10:5) = 1/2.'
      ],
      hint: '0,5 a felet jelenti: 1/2.',
      formula: '0,5 = 5/10 = 1/2'
    },
    {
      id: 'g5-df-l1-5',
      question: 'Hogyan írjuk le számjegyekkel: 2 egész 5 század?',
      options: ['2,05', '2,5', '2,50', '2,005'],
      correctAnswer: '2,05',
      explanation: '2 egész a vessző előtt van, a tizedek helyén 0 áll, a századok helyén pedig 5: 2,05.',
      breakdown: [
        '1. lépés: Egész rész: 2.',
        '2. lépés: Tizedek nincsenek → 0.',
        '3. lépés: Századok: 5 → 2,05.'
      ],
      hint: 'A század a vessző utáni 2. helyen áll, a tized helyére 0 kerül.',
      formula: '2 + 5/100 = 2,05'
    },
    {
      id: 'g5-df-l1-6',
      question: 'Mit választ el a tizedesvessző egy számban?',
      options: ['Az egész részt és a tört részt', 'A számlálót és a nevezőt', 'A pozitív és negatív számokat', 'A páros és páratlan számokat'],
      correctAnswer: 'Az egész részt és a tört részt',
      explanation: 'A tizedesvessző bal oldalán az egész rész (egyesek, tízesek, százasok), jobb oldalán a törtrész (tizedek, századok, ezredek) áll.',
      breakdown: [
        '1. lépés: Vessző előtt: 1-nél nem kisebb helyiértékek (egészek).',
        '2. lépés: Vessző után: 1-nél kisebb helyiértékek (törtrész).'
      ],
      hint: 'Pl. a 3,14-ben a 3 egész, a 14 század a törtrész.',
      formula: 'Egész rész , Törtrész'
    },
    {
      id: 'g5-df-l1-7',
      question: 'Hogyan írjuk tizedes tört alakban a 25/100 közönséges törtet?',
      options: ['0,25', '2,5', '0,025', '25,0'],
      correctAnswer: '0,25',
      explanation: 'A nevező 100, így 2 tizedesjegy lesz a tizedesvessző után: 0,25.',
      breakdown: [
        '1. lépés: Századrészek száma: 25.',
        '2. lépés: 100-as nevező esetén 2 tizedesjegy.',
        '3. lépés: 25/100 = 0,25.'
      ],
      hint: '25 század = 0,25.',
      formula: '25/100 = 0,25'
    },
    {
      id: 'g5-df-l1-8',
      question: 'Melyik számjegy áll a századok helyén az 1,845 számban?',
      options: ['4', '8', '5', '1'],
      correctAnswer: '4',
      explanation: 'A tizedesvessző után az 1. helyen a 8 (tized), a 2. helyen a 4 (század), a 3. helyen az 5 (ezred) áll.',
      breakdown: [
        '1. lépés: 1 = egyesek.',
        '2. lépés: 8 = tizedek.',
        '3. lépés: 4 = századok.',
        '4. lépés: 5 = ezredek.'
      ],
      hint: 'A tizedesvessző utáni második számjegy a század.',
      formula: '1,845 → 4 század'
    },
    {
      id: 'g5-df-l1-9',
      question: 'Egyenlő-e a 0,4 és a 0,40 tizedes tört?',
      options: ['Igen, mert a tizedes tört végére írt 0 nem változtatja meg az értéket', 'Nem, mert a 0,40 nagyobb', 'Nem, mert a 0,4 nagyobb', 'Csak egész számoknál egyenlő'],
      correctAnswer: 'Igen, mert a tizedes tört végére írt 0 nem változtatja meg az értéket',
      explanation: '4 tized = 40 század (bővítés 10-zel: 4/10 = 40/100). A tizedes tört legvégén álló nullák elhagyhatók vagy hozzáírhatók.',
      breakdown: [
        '1. lépés: 0,4 = 4/10 = 40/100 = 0,40.',
        '2. lépés: A tört végén lévő nullák nem módosítják a szám értékét.'
      ],
      hint: '4 tized pizza ugyanannyi, mint 40 század pizza.',
      formula: '0,4 = 0,40'
    },
    {
      id: 'g5-df-l1-10',
      question: 'Hogyan írjuk le tizedes törtként az 1 7/10 vegyes törtet?',
      options: ['1,7', '0,17', '1,07', '17,0'],
      correctAnswer: '1,7',
      explanation: '1 egész a vessző elé kerül, a 7 tized a vessző utáni 1. helyre: 1,7.',
      breakdown: [
        '1. lépés: Egész rész = 1.',
        '2. lépés: Törtrész = 7/10 = 0,7.',
        '3. lépés: Együtt: 1,7.'
      ],
      hint: '1 egész és 7 tized = 1,7.',
      formula: '1 7/10 = 1,7'
    }
  ],

  // 2. SZINT: KÖZEPES (10 feladat) - Helyiértékes felbontás, ezredek, tört átváltások
  2: [
    {
      id: 'g5-df-l2-1',
      question: 'Hogyan írjuk fel a 3,42 számot helyiértékes összeg alakjában?',
      options: ['3 + 0,4 + 0,02', '3 + 4 + 2', '3 + 0,42 + 0,02', '30 + 4 + 0,2'],
      correctAnswer: '3 + 0,4 + 0,02',
      explanation: '3 egyes (3) + 4 tized (0,4) + 2 század (0,02) = 3 + 0,4 + 0,02.',
      breakdown: [
        '1. lépés: Egyesek: 3.',
        '2. lépés: Tizedek: 4/10 = 0,4.',
        '3. lépés: Századok: 2/100 = 0,02.',
        '4. lépés: Összeg: 3 + 0,4 + 0,02.'
      ],
      hint: 'Bontsd fel egyenként a helyiértékekre: 3 + 4 tized + 2 század.',
      formula: '3,42 = 3 + 0,4 + 0,02'
    },
    {
      id: 'g5-df-l2-2',
      question: 'Hogyan írjuk le tizedes törtként a 125 ezredet (125/1000)?',
      options: ['0,125', '1,25', '0,0125', '0,1250'],
      correctAnswer: '0,125',
      explanation: 'Az ezred az 1000-es nevezőt jelenti, ami 3 tizedesjegyet jelent: 0,125.',
      breakdown: [
        '1. lépés: 125/1000 nevezője 1000 (3 nulla).',
        '2. lépés: 3 tizedesjegy a vessző után.',
        '3. lépés: 0,125.'
      ],
      hint: '1000-ben 3 nulla van, ezért 3 tizedesjegy lesz.',
      formula: '125/1000 = 0,125'
    },
    {
      id: 'g5-df-l2-3',
      question: 'Melyik szám felel meg a következő felbontásnak: 5 + 6/10 + 8/1000?',
      options: ['5,608', '5,68', '5,068', '56,8'],
      correctAnswer: '5,608',
      explanation: '5 egész, 6 tized (első tizedesjegy), 0 század (második tizedesjegy), 8 ezred (harmadik tizedesjegy) → 5,608.',
      breakdown: [
        '1. lépés: Egész = 5.',
        '2. lépés: Tizedek = 6.',
        '3. lépés: Századok = 0 (mivel nincs század a felbontásban!).',
        '4. lépés: Ezredek = 8.',
        '5. lépés: Szám: 5,608.'
      ],
      hint: 'Figyelj: század nincs a felírásban, oda 0 kerül!',
      formula: '5 + 0,6 + 0,008 = 5,608'
    },
    {
      id: 'g5-df-l2-4',
      question: 'Mennyi a 3/4 közönséges tört tizedes tört alakja?',
      options: ['0,75', '0,34', '0,43', '0,3'],
      correctAnswer: '0,75',
      explanation: 'Bővítsük a nevezőt 100-ra: (3 · 25)/(4 · 25) = 75/100 = 0,75.',
      breakdown: [
        '1. lépés: 4-et 25-tel szorozva kapunk 100-at.',
        '2. lépés: Számláló bővítése: 3 · 25 = 75.',
        '3. lépés: 75/100 = 0,75.'
      ],
      hint: 'Bővítsd a törtet 25-tel, hogy 100 legyen a nevezője!',
      formula: '3/4 = 75/100 = 0,75'
    },
    {
      id: 'g5-df-l2-5',
      question: 'Hány tizedesjegye van a 0,0402 tizedes törtnek?',
      options: ['4', '3', '2', '5'],
      correctAnswer: '4',
      explanation: 'A tizedesvessző után 4 számjegy áll (0, 4, 0, 2), így 4 tizedesjegye van (tízezred helyiértékig).',
      breakdown: [
        '1. lépés: Számoljuk meg a vessző utáni számjegyeket: 0, 4, 0, 2.',
        '2. lépés: Összesen 4 jegy van a vessző után.'
      ],
      hint: 'Számold meg, hány számjegy áll a tizedesvessző jobb oldalán!',
      formula: '0,0402 → 4 tizedesjegy'
    },
    {
      id: 'g5-df-l2-6',
      question: 'Melyik állítás IGAZ a tizedes törtek nulláira?',
      options: [
        'A szám legvégén álló nullák elhagyhatók, a szám értéke nem változik',
        'Bármelyik nullát el lehet hagyni a számból',
        'A tizedesvessző utáni első nullát mindig el kell hagyni',
        'A tizedes törtekben nem szerepelhet nulla'
      ],
      correctAnswer: 'A szám legvégén álló nullák elhagyhatók, a szám értéke nem változik',
      explanation: 'Csak a szám legvégén (jobb szélén) lévő nullák feleslegesek (pl. 2,50 = 2,5). A szám belsejében lévő nullákat (pl. 2,05) kötelező kiírni, mert azok helyiértéket jelölnek.',
      breakdown: [
        '1. lépés: 2,50 = 2,5 (érték azonos).',
        '2. lépés: 2,05 ≠ 2,5 (a belső 0 nem törölhető!).'
      ],
      hint: 'Csak a tizedestört legvégén álló 0-k hagyhatók el.',
      formula: '2,50 = 2,5'
    },
    {
      id: 'g5-df-l2-7',
      question: 'Hogyan írjuk le tizedes törtként a 1/5 közönséges törtet?',
      options: ['0,2', '0,5', '0,15', '0,02'],
      correctAnswer: '0,2',
      explanation: 'Bővítsük a nevezőt 10-re: (1 · 2)/(5 · 2) = 2/10 = 0,2.',
      breakdown: [
        '1. lépés: Nevező szorzása 2-vel: 5 · 2 = 10.',
        '2. lépés: Számláló szorzása 2-vel: 1 · 2 = 2.',
        '3. lépés: 2/10 = 0,2.'
      ],
      hint: 'Bővítsd 2-vel a számlálót és nevezőt!',
      formula: '1/5 = 2/10 = 0,2'
    },
    {
      id: 'g5-df-l2-8',
      question: 'Melyik szám nagyobb: 0,3 vagy 0,285?',
      options: ['0,3, mert 3 tized (300 ezred) nagyobb, mint 2 tized (285 ezred)', '0,285, mert a 285 nagyobb szám, mint a 3', 'Egyenlőek', 'Nem lehet összehasonlítani'],
      correctAnswer: '0,3, mert 3 tized (300 ezred) nagyobb, mint 2 tized (285 ezred)',
      explanation: 'Tizedestörteknél a helyiértékeket hasonlítjuk össze balról jobbra. 0,3 = 0,300. Mivel 3 tized > 2 tized (300 > 285 ezred), ezért 0,3 > 0,285.',
      breakdown: [
        '1. lépés: Egész részek azonosak (0).',
        '2. lépés: Tizedek helye: 3 tized vs. 2 tized.',
        '3. lépés: 3 > 2, tehát 0,300 > 0,285.'
      ],
      hint: 'Írj nullákat a 0,3 végére: 0,300 vagy 0,285 a nagyobb?',
      formula: '0,300 > 0,285'
    },
    {
      id: 'g5-df-l2-9',
      question: 'Hány forintot jelent a 2,5 ezer forint?',
      options: ['2500 Ft', '2005 Ft', '250 Ft', '25 000 Ft'],
      correctAnswer: '2500 Ft',
      explanation: '2,5 ezer = 2,5 · 1000 = 2500 Ft (2 egész ezer és fél ezer, azaz 2000 + 500 = 2500 Ft).',
      breakdown: [
        '1. lépés: 1 ezer = 1000 Ft.',
        '2. lépés: 2 ezer = 2000 Ft.',
        '3. lépés: 0,5 ezer = 500 Ft.',
        '4. lépés: Összesen: 2500 Ft.'
      ],
      hint: '2 és fél ezer forint = 2000 + 500 Ft.',
      formula: '2,5 · 1000 = 2500 Ft'
    },
    {
      id: 'g5-df-l2-10',
      question: 'Hogyan írjuk át vegyes tört alakba a 3,75 tizedes törtet legegyszerűbb alakban?',
      options: ['3 3/4', '3 75/100', '3 7/5', '375/10'],
      correctAnswer: '3 3/4',
      explanation: '3,75 = 3 75/100. A 75/100-at 25-tel egyszerűsítve: (75:25)/(100:25) = 3/4. Így 3 3/4.',
      breakdown: [
        '1. lépés: 3,75 = 3 egész és 75/100.',
        '2. lépés: Egyszerűsítés 25-tel: 75/100 = 3/4.',
        '3. lépés: Vegyes tört: 3 3/4.'
      ],
      hint: '75 század egyszerűsítve háromnegyed (3/4).',
      formula: '3,75 = 3 75/100 = 3 3/4'
    }
  ],

  // 3. SZINT: HALADÓ (10 feladat) - Összetett helyiértékes logikai feladatok, átváltások
  3: [
    {
      id: 'g5-df-l3-1',
      question: 'Melyik szám egyenlő a következővel: 14 tízes + 3 egyes + 5 tized + 2 ezred?',
      options: ['143,502', '143,52', '14,352', '1435,02'],
      correctAnswer: '143,502',
      explanation: '14 tízes = 140. 140 + 3 = 143 egész. Tizedek: 5, századok: 0, ezredek: 2 → 143,502.',
      breakdown: [
        '1. lépés: 14 · 10 = 140.',
        '2. lépés: 140 + 3 = 143 egész.',
        '3. lépés: Tizedek = 5, Századok = 0, Ezredek = 2.',
        '4. lépés: 143,502.'
      ],
      hint: 'Század helyiérték nincs megadva, így oda 0 kerül!',
      formula: '140 + 3 + 0,5 + 0,002 = 143,502'
    },
    {
      id: 'g5-df-l3-2',
      question: 'Hány méter 3 méter és 45 centiméter tizedes tört alakban kifejezve méterben?',
      options: ['3,45 m', '3,450 cm', '34,5 m', '3,045 m'],
      correctAnswer: '3,45 m',
      explanation: '1 m = 100 cm, így 1 cm = 0,01 m (1 század méter). 45 cm = 0,45 m. Összesen: 3,45 m.',
      breakdown: [
        '1. lépés: 1 cm = 1/100 m = 0,01 m.',
        '2. lépés: 45 cm = 45/100 m = 0,45 m.',
        '3. lépés: 3 m + 0,45 m = 3,45 m.'
      ],
      hint: 'A centiméter a méter századrésze.',
      formula: '3 m + 45/100 m = 3,45 m'
    },
    {
      id: 'g5-df-l3-3',
      question: 'Mennyi a 1/8 tört tizedes tört alakja?',
      options: ['0,125', '0,8', '0,18', '0,0125'],
      correctAnswer: '0,125',
      explanation: 'Bővítsük a törtet 125-tel: (1 · 125)/(8 · 125) = 125/1000 = 0,125.',
      breakdown: [
        '1. lépés: 8 · 125 = 1000.',
        '2. lépés: 1 · 125 = 125.',
        '3. lépés: 125/1000 = 0,125.'
      ],
      hint: '8 · 125 = 1000, így ezredekre bővíthető!',
      formula: '1/8 = 125/1000 = 0,125'
    },
    {
      id: 'g5-df-l3-4',
      question: 'Hány kilogramm 4 kg és 8 dkg tizedes tört alakban kilogrammban?',
      options: ['4,08 kg', '4,8 kg', '4,80 kg', '4,008 kg'],
      correctAnswer: '4,08 kg',
      explanation: '1 kg = 100 dkg, így 1 dkg = 0,01 kg (századrész). 8 dkg = 0,08 kg. Így 4,08 kg.',
      breakdown: [
        '1. lépés: 1 kg = 100 dkg.',
        '2. lépés: 8 dkg = 8/100 kg = 0,08 kg.',
        '3. lépés: 4 kg + 0,08 kg = 4,08 kg.'
      ],
      hint: '1 kg = 100 dkg, tehát a dkg a századok helyén áll!',
      formula: '4 + 8/100 = 4,08 kg'
    },
    {
      id: 'g5-df-l3-5',
      question: 'Melyik számhiány pótolja a négyzetet: 2,34 + ■ = 3 egész?',
      options: ['0,66', '0,76', '1,66', '0,64'],
      correctAnswer: '0,66',
      explanation: '3,00 - 2,34 = 0,66 (mivel 34 századhoz 66 századot kell adni, hogy 100 század = 1 egész legyen).',
      breakdown: [
        '1. lépés: 3 egész = 3,00.',
        '2. lépés: 3,00 - 2,34 = 0,66.',
        '3. lépés: Ellenőrzés: 2,34 + 0,66 = 3,00.'
      ],
      hint: '2,34-hez mennyi kell 3-ig? 3,00 - 2,34.',
      formula: '3,00 - 2,34 = 0,66'
    },
    {
      id: 'g5-df-l3-6',
      question: 'Tedd növekvő sorrendbe a következő számokat: 0,4; 0,04; 0,404; 0,044!',
      options: [
        '0,04 < 0,044 < 0,4 < 0,404',
        '0,04 < 0,4 < 0,044 < 0,404',
        '0,404 < 0,4 < 0,044 < 0,04',
        '0,044 < 0,04 < 0,4 < 0,404'
      ],
      correctAnswer: '0,04 < 0,044 < 0,4 < 0,404',
      explanation: 'Egységesítsük 3 tizedesjegyre: 0,040 < 0,044 < 0,400 < 0,404.',
      breakdown: [
        '1. lépés: 0,04 = 0,040 (40 ezred).',
        '2. lépés: 0,044 (44 ezred).',
        '3. lépés: 0,4 = 0,400 (400 ezred).',
        '4. lépés: 0,404 (404 ezred).',
        '5. lépés: Sorrend: 0,04 < 0,044 < 0,4 < 0,404.'
      ],
      hint: 'Pótold ki a számok végét nullákkal 3 tizedesjegyre!',
      formula: '0,040 < 0,044 < 0,400 < 0,404'
    },
    {
      id: 'g5-df-l3-7',
      question: 'Egy tábla csoki 10 egyenlő kockából áll. Dóri megevett 3 kockát, Peti 0,4 táblát. Hányad része maradt meg a csokinak tizedes tört alakban?',
      options: ['0,3 része', '0,7 része', '0,2 része', '0,4 része'],
      correctAnswer: '0,3 része',
      explanation: 'Dóri megevett 3/10 = 0,3 táblát. Peti megevett 0,4 táblát. Együtt: 0,3 + 0,4 = 0,7. Megmaradt: 1,0 - 0,7 = 0,3 rész.',
      breakdown: [
        '1. lépés: Dóri: 3/10 = 0,3 tábla.',
        '2. lépés: Peti: 0,4 tábla.',
        '3. lépés: Összesen megették: 0,3 + 0,4 = 0,7 tábla.',
        '4. lépés: Maradék: 1 - 0,7 = 0,3 tábla.'
      ],
      hint: '1 egészből (1,0) vonj ki 0,7-et!',
      formula: '1,0 - (0,3 + 0,4) = 0,3'
    },
    {
      id: 'g5-df-l3-8',
      question: 'Mennyi a 0,75 + 1/4 összeadás eredménye tizedes törtként és közönséges törtként?',
      options: ['1,0 (azaz 1 egész)', '0,99 (azaz 99/100)', '0,80 (azaz 4/5)', '1,25 (azaz 5/4)'],
      correctAnswer: '1,0 (azaz 1 egész)',
      explanation: '1/4 = 0,25. Így 0,75 + 0,25 = 1,00 = 1 egész.',
      breakdown: [
        '1. lépés: 1/4 átírása tizedes tört alakba: 0,25.',
        '2. lépés: Összeadás: 0,75 + 0,25 = 1,00 = 1.'
      ],
      hint: '0,75 háromnegyed, 1/4 egynegyed. 3/4 + 1/4 = 1.',
      formula: '0,75 + 0,25 = 1,0'
    },
    {
      id: 'g5-df-l3-9',
      question: 'Hány századrésze van a 0,6 számnak?',
      options: ['60 századrésze', '6 századrésze', '600 századrésze', '0,6 századrésze'],
      correctAnswer: '60 századrésze',
      explanation: '0,6 = 6/10 = 60/100, tehát 60 századrésze van.',
      breakdown: [
        '1. lépés: 0,6 = 6 tized.',
        '2. lépés: 1 tized = 10 század.',
        '3. lépés: 6 tized = 6 · 10 = 60 század.'
      ],
      hint: '0,6 = 0,60, ami 60 század.',
      formula: '0,6 = 60/100'
    },
    {
      id: 'g5-df-l3-10',
      question: 'Egy 2 literes üdítőből kiöntöttünk 0,75 litert, majd még 0,5 litert. Mennyi üdítő maradt az üvegben?',
      options: ['0,75 liter', '0,5 liter', '1,25 liter', '0,25 liter'],
      correctAnswer: '0,75 liter',
      explanation: 'Kiöntöttünk: 0,75 + 0,50 = 1,25 litert. Megmaradt: 2,00 - 1,25 = 0,75 liter (háromnegyed liter).',
      breakdown: [
        '1. lépés: Összes kiöntött ital: 0,75 + 0,50 = 1,25 liter.',
        '2. lépés: Eredeti mennyiség: 2,00 liter.',
        '3. lépés: Maradék: 2,00 - 1,25 = 0,75 liter.'
      ],
      hint: '2,00-ból vonj ki 1,25-öt!',
      formula: '2,00 - 1,25 = 0,75 l'
    }
  ]
};

export function DecimalFractionsQuiz({ onBack, onSwitchToTheory }: DecimalFractionsQuizProps) {
  return (
    <QuizTemplate
      title="Tizedes törtek kvíz"
      subtitle="Gyakorold a tizedes törtek helyiértékeit, kiolvasását és átváltásait 30 feladaton át!"
      badge="🪙 5. Osztály • Tizedes törtek"
      topicId="g5-decimal-fractions-quiz"
      category="decimal-fractions"
      grade={5}
      questions={decimalFractionsQuestions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="amber"
      renderMatcher={({ level, onNextLevel, onOpenRules }) => (
        <DecimalFractionsMatcher
          level={level}
          onNextLevel={onNextLevel}
          onOpenRules={onOpenRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={({ level, onNextLevel, onOpenRules }) => (
        <DecimalFractionsSorter
          level={level}
          onNextLevel={onNextLevel}
          onOpenRules={onOpenRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
    />
  );
}

export default DecimalFractionsQuiz;
