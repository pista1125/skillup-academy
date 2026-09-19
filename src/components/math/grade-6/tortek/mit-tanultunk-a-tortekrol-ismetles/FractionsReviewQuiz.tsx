import React from 'react';
import { QuizTemplate, QuizQuestion, CheatSheetItem, CheatSheetCard } from '../QuizTemplate';
import { FractionsReviewMatcher } from './FractionsReviewMatcher';
import { FractionsReviewSorter } from './FractionsReviewSorter';

export interface FractionsReviewQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export function FractionsReviewQuiz({
  onBack,
  onSwitchToTheory
}: FractionsReviewQuizProps) {
  // 30 Részletes, pedagógiailag felépített kérdés
  const questions: QuizQuestion[] = [
    // ==========================================
    // 1. SZINT: ALAPOK (1 - 10. feladat)
    // ==========================================
    {
      id: 'q1',
      level: 1,
      prompt: 'Mit fejez ki a 3/5 tört a törtfogalom szerint?',
      options: [
        'Az 1 egészet 5 egyenlő részre osztottuk, és abból 3 részt vettünk.',
        'Az 1 egészet 3 egyenlő részre osztottuk, és abból 5 részt vettünk.',
        '3 egészet adtunk hozzá 5 egészhez.',
        '5-öt megszoroztunk 3-mal.'
      ],
      correctAnswer: 'Az 1 egészet 5 egyenlő részre osztottuk, és abból 3 részt vettünk.',
      explanation: 'A nevező (5) megmutatja, hány egyenlő részre osztottuk az egészet, a számláló (3) pedig azt, hogy hány ilyen részt vettünk.',
      breakdown: [
        { label: 'Számláló (3)', value: 'A kijelölt/elvett részek száma.' },
        { label: 'Nevező (5)', value: 'Az egyenlő részek száma, amire az egészet bontottuk.' }
      ],
      hint: 'Gondolj egy pizzára, amit 5 egyenlő szeletre vágtál, és 3 szeletet megettél!'
    },
    {
      id: 'q2',
      level: 1,
      prompt: 'Melyik tört valódi tört az alábbiak közül?',
      options: ['4/7', '7/4', '5/5', '11/3'],
      correctAnswer: '4/7',
      explanation: 'Valódi tört esetén a számláló kisebb, mint a nevező (értéke 1-nél kisebb). A 4/7-ben 4 < 7.',
      breakdown: [
        { label: 'Valódi tört feltétele', value: 'Számláló < Nevező (érték < 1)' },
        { label: 'Ellenőrzés', value: '4/7 esetén 4 < 7, tehát valódi tört.' }
      ],
      hint: 'Keresd azt a törtet, amelynek a felső száma kisebb, mint az alsó!'
    },
    {
      id: 'q3',
      level: 1,
      prompt: 'Melyik tört áltört (értéke legalább 1) az alábbiak közül?',
      options: ['9/5', '2/3', '5/8', '7/10'],
      correctAnswer: '9/5',
      explanation: 'Áltört esetén a számláló nagyobb vagy egyenlő a nevezőnél (értéke legalább 1). A 9/5-ben 9 > 5.',
      breakdown: [
        { label: 'Áltört feltétele', value: 'Számláló ≥ Nevező' },
        { label: 'Ellenőrzés', value: '9/5 = 1 4/5 > 1, tehát áltört.' }
      ],
      hint: 'Keresd azt a törtet, amelynek a számlálója nagyobb a nevezőjénél!'
    },
    {
      id: 'q4',
      level: 1,
      prompt: 'Mennyi a 2/3 tört értéke, ha 4-gyel bővítjük?',
      options: ['8/12', '6/12', '8/3', '2/12'],
      correctAnswer: '8/12',
      explanation: 'Bővítéskor a számlálót és a nevezőt is megszorozzuk ugyanazzal a számmal: 2·4 = 8 és 3·4 = 12, így 8/12.',
      breakdown: [
        { label: 'Számláló szorzása', value: '2 · 4 = 8' },
        { label: 'Nevező szorzása', value: '3 · 4 = 12' },
        { label: 'Eredmény', value: '8/12' }
      ],
      hint: 'Szorozd meg a felső és az alsó számot is 4-gyel!'
    },
    {
      id: 'q5',
      level: 1,
      prompt: 'Melyik a 12/18 tört legegyszerűbb (tovább nem egyszerűsíthető) alakja?',
      options: ['2/3', '6/9', '4/6', '3/4'],
      correctAnswer: '2/3',
      explanation: '12 és 18 legnagyobb közös osztója 6. Mindkettőt elosztva 6-tal: 12:6 = 2 és 18:6 = 3, így 2/3.',
      breakdown: [
        { label: 'Közös osztó (LNKO)', value: 'lnko(12, 18) = 6' },
        { label: 'Egyszerűsítés', value: '12:6 / 18:6 = 2/3' }
      ],
      hint: 'Oszd el a számlálót és a nevezőt a legnagyobb közös osztójukkal, 6-tal!'
    },
    {
      id: 'q6',
      level: 1,
      prompt: 'Végezd el az összeadást: 2/9 + 5/9 = ?',
      options: ['7/9', '7/18', '10/9', '7/81'],
      correctAnswer: '7/9',
      explanation: 'Azonos nevezőjű törtek összeadásakor a számlálókat összeadjuk (2 + 5 = 7), a nevező változatlan marad (9).',
      breakdown: [
        { label: 'Számlálók összege', value: '2 + 5 = 7' },
        { label: 'Közös nevező', value: '9 változatlan marad' }
      ],
      hint: 'A számlálókat add össze, a nevezőt ne változtasd meg!'
    },
    {
      id: 'q7',
      level: 1,
      prompt: 'Végezd el a kivonást és egyszerűsíts: 7/10 - 3/10 = ?',
      options: ['2/5', '4/10', '4/0', '1/5'],
      correctAnswer: '2/5',
      explanation: '7/10 - 3/10 = 4/10. Ezt 2-vel egyszerűsítve a legegyszerűbb alak: 2/5.',
      breakdown: [
        { label: 'Kivonás', value: '7/10 - 3/10 = 4/10' },
        { label: 'Egyszerűsítés 2-vel', value: '4:2 / 10:2 = 2/5' }
      ],
      hint: 'Vond ki a számlálókat, majd egyszerűsítsd a 4/10-et 2-vel!'
    },
    {
      id: 'q8',
      level: 1,
      prompt: 'Írd át a 11/4 áltörtet vegyes tört alakba!',
      options: ['2 3/4', '3 1/4', '2 1/4', '1 7/4'],
      correctAnswer: '2 3/4',
      explanation: '11 : 4 = 2, a maradék 3. Tehát 11/4 = 2 egész és 3/4 (2 3/4).',
      breakdown: [
        { label: 'Egész rész meghatározása', value: '11-ben a 4 megvan 2-szer' },
        { label: 'Maradék számlálóba', value: 'Maradék: 3 -> 2 3/4' }
      ],
      hint: 'Hányszor van meg a 11-ben a 4, és mennyi a maradék?'
    },
    {
      id: 'q9',
      level: 1,
      prompt: 'Írd át az 1 2/5 vegyes törtet közönséges áltörtté!',
      options: ['7/5', '3/5', '6/5', '8/5'],
      correctAnswer: '7/5',
      explanation: '1 egész az 5/5, ehhez hozzáadva 2/5-öt kapjuk: 5/5 + 2/5 = 7/5 (számolás: 1 · 5 + 2 = 7).',
      breakdown: [
        { label: 'Átváltási szabály', value: '(Egész · Nevező + Számláló) / Nevező' },
        { label: 'Számolás', value: '(1 · 5 + 2) / 5 = 7/5' }
      ],
      hint: '1 · 5 + 2 = 7, a nevező 5 marad.'
    },
    {
      id: 'q10',
      level: 1,
      prompt: 'Mennyi a 2/7 · 3 szorzat értéke?',
      options: ['6/7', '6/21', '2/21', '5/7'],
      correctAnswer: '6/7',
      explanation: 'Törtet egész számmal úgy szorzunk, hogy a számlálót megszorozzuk a számmal: 2 · 3 = 6, a nevező változatlan: 6/7.',
      breakdown: [
        { label: 'Számláló szorzása', value: '2 · 3 = 6' },
        { label: 'Nevező', value: '7 változatlan' }
      ],
      hint: 'Csak a felső számot szorozd meg 3-mal!'
    },

    // ==========================================
    // 2. SZINT: KÖZEPES (11 - 20. feladat)
    // ==========================================
    {
      id: 'q11',
      level: 2,
      prompt: 'Számítsd ki: 1/2 + 1/3 = ?',
      options: ['5/6', '2/5', '2/6', '1/6'],
      correctAnswer: '5/6',
      explanation: 'A 2 és 3 legkisebb közös többszöröse a 6. Bővítve: 1/2 = 3/6, 1/3 = 2/6. Összegük: 3/6 + 2/6 = 5/6.',
      breakdown: [
        { label: 'Közös nevező', value: 'lkkt(2, 3) = 6' },
        { label: 'Bővítés', value: '3/6 + 2/6' },
        { label: 'Összeg', value: '5/6' }
      ],
      hint: 'Hozd a törteket közös nevezőre (6-odokra)!'
    },
    {
      id: 'q12',
      level: 2,
      prompt: 'Végezd el a kivonást: 3/4 - 1/6 = ?',
      options: ['7/12', '2/2', '2/12', '5/12'],
      correctAnswer: '7/12',
      explanation: 'A 4 és 6 legkisebb közös nevezője a 12. Bővítve: 3/4 = 9/12, 1/6 = 2/12. Kivonva: 9/12 - 2/12 = 7/12.',
      breakdown: [
        { label: 'Közös nevező (LKKT)', value: 'lkkt(4, 6) = 12' },
        { label: 'Bővített alakok', value: '9/12 - 2/12' },
        { label: 'Különbség', value: '7/12' }
      ],
      hint: 'A 4 és a 6 legkisebb közös többszöröse a 12.'
    },
    {
      id: 'q13',
      level: 2,
      prompt: 'Mennyi a 3/4 : 2 osztás eredménye?',
      options: ['3/8', '6/4', '3/2', '1 1/2'],
      correctAnswer: '3/8',
      explanation: 'Mivel a számláló (3) nem osztható 2-vel, a nevezőt szorozzuk meg 2-vel: 3 / (4 · 2) = 3/8.',
      breakdown: [
        { label: 'Szabály', value: 'Ha a számláló nem osztható, a nevezőt szorozzuk' },
        { label: 'Számítás', value: '3 / (4 · 2) = 3/8' }
      ],
      hint: 'Szorozd meg a nevezőt (4-et) 2-vel!'
    },
    {
      id: 'q14',
      level: 2,
      prompt: 'Mennyi a 6/11 : 3 osztás eredménye?',
      options: ['2/11', '6/33', '18/11', '2/33'],
      correctAnswer: '2/11',
      explanation: 'Mivel a számláló (6) osztható 3-mal, a számlálót osztjuk: 6:3 = 2, a nevező változatlan: 2/11.',
      breakdown: [
        { label: 'Számláló osztása', value: '6 : 3 = 2' },
        { label: 'Nevező', value: '11 változatlan' }
      ],
      hint: 'Oszd el a felső számot 3-mal!'
    },
    {
      id: 'q15',
      level: 2,
      prompt: 'Mennyi az 5/8 · 4 szorzat legegyszerűbb alakja vegyes törtként?',
      options: ['2 1/2', '20/8', '5/2', '2 1/4'],
      correctAnswer: '2 1/2',
      explanation: '5/8 · 4 = 20/8 = 5/2 = 2 1/2 (vagy a nevezőt osztva: 5 / (8:4) = 5/2 = 2 1/2).',
      breakdown: [
        { label: 'Szorzás', value: '5 · 4 / 8 = 20/8' },
        { label: 'Egyszerűsítés 4-gyel', value: '5/2' },
        { label: 'Vegyes tört alak', value: '2 1/2' }
      ],
      hint: 'Egyszerűsítsd a 4-et és a 8-at: 5/2, ami vegyes törtben 2 egész 1/2.'
    },
    {
      id: 'q16',
      level: 2,
      prompt: 'Melyik relációs jel illik a négyzet helyére: 3/5  ___  4/7 ?',
      options: ['>', '<', '=', '≤'],
      correctAnswer: '>',
      explanation: 'Közös nevezőre (35) hozva: 3/5 = 21/35, míg 4/7 = 20/35. Mivel 21/35 > 20/35, ezért 3/5 > 4/7.',
      breakdown: [
        { label: '1. tört 35-ödökben', value: '3/5 = 21/35' },
        { label: '2. tört 35-ödökben', value: '4/7 = 20/35' },
        { label: 'Összehasonlítás', value: '21/35 > 20/35' }
      ],
      hint: 'Keresztbe szorzással is ellenőrizheted: 3 · 7 = 21 és 5 · 4 = 20.'
    },
    {
      id: 'q17',
      level: 2,
      prompt: 'Számítsd ki: 2 - 3/7 = ?',
      options: ['1 4/7', '1 3/7', '11/7', '1 1/7'],
      correctAnswer: '1 4/7',
      explanation: '2 egészből 1 egészet átváltunk 7/7-re: 1 egész és 7/7 - 3/7 = 1 egész 4/7 (vagy áltörtként 14/7 - 3/7 = 11/7 = 1 4/7).',
      breakdown: [
        { label: 'Egész felbontása', value: '2 = 1 7/7' },
        { label: 'Kivonás', value: '1 7/7 - 3/7 = 1 4/7' }
      ],
      hint: 'Bontsd fel a 2 egészet 1 egészre és 7/7-re!'
    },
    {
      id: 'q18',
      level: 2,
      prompt: 'Számítsd ki: 1 1/2 + 2 1/4 = ?',
      options: ['3 3/4', '3 2/6', '3 1/4', '4 1/4'],
      correctAnswer: '3 3/4',
      explanation: 'Egész részek: 1 + 2 = 3. Törtrészek közös nevezőn: 1/2 = 2/4. 2/4 + 1/4 = 3/4. Végeredmény: 3 3/4.',
      breakdown: [
        { label: 'Egészek összege', value: '1 + 2 = 3' },
        { label: 'Törtrészek összege', value: '2/4 + 1/4 = 3/4' },
        { label: 'Összesen', value: '3 3/4' }
      ],
      hint: 'Add össze az egészeket (3), majd a törtrészeket (1/2 = 2/4, így 2/4 + 1/4 = 3/4).'
    },
    {
      id: 'q19',
      level: 2,
      prompt: 'Mennyi 24-nek a 3/4 része?',
      options: ['18', '16', '12', '20'],
      correctAnswer: '18',
      explanation: '24-nek az 1/4 része: 24 : 4 = 6. A 3/4 része ennek a 3-szorosa: 6 · 3 = 18.',
      breakdown: [
        { label: '1 rész (1/4)', value: '24 : 4 = 6' },
        { label: '3 rész (3/4)', value: '6 · 3 = 18' }
      ],
      hint: 'Oszd el a 24-et 4-gyel, majd szorozd meg 3-mal!'
    },
    {
      id: 'q20',
      level: 2,
      prompt: 'Egy 28 fős osztály 4/7 része lány. Hány lány jár az osztályba?',
      options: ['16 lány', '12 lány', '14 lány', '18 lány'],
      correctAnswer: '16 lány',
      explanation: '28 : 7 = 4 (1/7 rész). 4 · 4 = 16 lány (4/7 rész).',
      breakdown: [
        { label: '1/7 rész számolása', value: '28 : 7 = 4' },
        { label: '4/7 rész számolása', value: '4 · 4 = 16' }
      ],
      hint: 'Oszd el a 28-at a nevezővel (7), majd szorozd meg a számlálóval (4)!'
    },

    // ==========================================
    // 3. SZINT: HALADÓ (21 - 30. feladat)
    // ==========================================
    {
      id: 'q21',
      level: 3,
      prompt: 'Számítsd ki a műveletsor eredményét: (1/2 + 1/3) · 6 = ?',
      options: ['5', '6', '4', '1'],
      correctAnswer: '5',
      explanation: 'Zárójelben: 1/2 + 1/3 = 3/6 + 2/6 = 5/6. Ezután szorzunk 6-tal: 5/6 · 6 = 5 (vagy tagonként: 1/2·6 + 1/3·6 = 3 + 2 = 5).',
      breakdown: [
        { label: '1. lépés (zárójel)', value: '1/2 + 1/3 = 5/6' },
        { label: '2. lépés (szorzás)', value: '5/6 · 6 = 5' }
      ],
      hint: 'Végezd el először a zárójelben lévő összeadást (5/6), majd szorozz 6-tal!'
    },
    {
      id: 'q22',
      level: 3,
      prompt: 'Számítsd ki: (3/4 - 1/4) : 2 = ?',
      options: ['1/4', '1/2', '1/8', '1'],
      correctAnswer: '1/4',
      explanation: 'Zárójelben: 3/4 - 1/4 = 2/4 = 1/2. Osztva 2-vel: 1/2 : 2 = 1/4.',
      breakdown: [
        { label: 'Zárójel értéke', value: '2/4 = 1/2' },
        { label: 'Osztás 2-vel', value: '1/2 : 2 = 1/4' }
      ],
      hint: 'A zárójel értéke 2/4 = 1/2. Ennek a fele az 1/4.'
    },
    {
      id: 'q23',
      level: 3,
      prompt: 'Végezd el a vegyes törtek kivonását: 3 1/3 - 1 1/2 = ?',
      options: ['1 5/6', '1 2/3', '2 1/6', '1 1/6'],
      correctAnswer: '1 5/6',
      explanation: 'Áltörtté alakítva: 3 1/3 = 10/3 = 20/6 és 1 1/2 = 3/2 = 9/6. Különbségük: 20/6 - 9/6 = 11/6 = 1 5/6.',
      breakdown: [
        { label: 'Áltörtté alakítás', value: '10/3 és 3/2' },
        { label: 'Közös nevező (6)', value: '20/6 - 9/6' },
        { label: 'Eredmény vegyes törtben', value: '11/6 = 1 5/6' }
      ],
      hint: 'Írd át mindkettőt áltörtté (10/3 és 3/2), majd hozd 6-od közös nevezőre!'
    },
    {
      id: 'q24',
      level: 3,
      prompt: 'Melyik szám hiányzik a számlálóból: ?/6 + 1/4 = 7/12 ?',
      options: ['2', '3', '1', '4'],
      correctAnswer: '2',
      explanation: 'Közös nevezőn: ?/6 = (2·?)/12 és 1/4 = 3/12. (2·? + 3)/12 = 7/12, tehát 2·? + 3 = 7, amiből 2·? = 4, azaz ? = 2.',
      breakdown: [
        { label: '12-edekre váltás', value: 'x/6 = 2x/12 és 1/4 = 3/12' },
        { label: 'Egyenlet számlálókra', value: '2x + 3 = 7' },
        { label: 'Megoldás', value: '2x = 4 -> x = 2' }
      ],
      hint: '7/12 - 1/4 = 7/12 - 3/12 = 4/12 = 2/6. Tehát a számláló a 2.'
    },
    {
      id: 'q25',
      level: 3,
      prompt: 'Számítsd ki a kifejezés értékét: 4 · (2/3 - 1/6) = ?',
      options: ['2', '1 1/2', '2 1/3', '3'],
      correctAnswer: '2',
      explanation: 'Zárójelben: 2/3 - 1/6 = 4/6 - 1/6 = 3/6 = 1/2. Szorozva 4-gyel: 4 · 1/2 = 2.',
      breakdown: [
        { label: 'Zárójel kiszámítása', value: '4/6 - 1/6 = 3/6 = 1/2' },
        { label: 'Szorzás 4-gyel', value: '4 · 1/2 = 2' }
      ],
      hint: 'A zárójelben 4/6 - 1/6 = 3/6 = 1/2. 4 darab fél az pontosan 2 egész.'
    },
    {
      id: 'q26',
      level: 3,
      prompt: 'Péter a zsebpénze 1/3 részét fagyira, 2/5 részét könyvre költötte. A zsebpénzének mekkora része maradt meg?',
      options: ['4/15 része', '7/15 része', '1/5 része', '11/15 része'],
      correctAnswer: '4/15 része',
      explanation: 'Elköltött rész: 1/3 + 2/5 = 5/15 + 6/15 = 11/15. A megmaradt rész az egészből kivonva: 15/15 - 11/15 = 4/15.',
      breakdown: [
        { label: 'Elköltött összesen', value: '5/15 + 6/15 = 11/15' },
        { label: 'Megmaradt rész', value: '1 - 11/15 = 4/15' }
      ],
      hint: 'Add össze a két elköltött törtet közös nevezőn (15-ödökben), majd vond ki 1 egészből (15/15)!'
    },
    {
      id: 'q27',
      level: 3,
      prompt: 'Egy túrázó délelőtt megtette az út 3/8 részét, délután a 2/5 részét. Az egész útnak hányad része maradt még hátra?',
      options: ['9/40 része', '31/40 része', '5/13 része', '11/40 része'],
      correctAnswer: '9/40 része',
      explanation: 'Megtett út: 3/8 + 2/5 = 15/40 + 16/40 = 31/40. Hátralévő út: 40/40 - 31/40 = 9/40.',
      breakdown: [
        { label: 'Közös nevező (40)', value: '3/8 = 15/40 és 2/5 = 16/40' },
        { label: 'Megtett út', value: '15/40 + 16/40 = 31/40' },
        { label: 'Hátralévő út', value: '40/40 - 31/40 = 9/40' }
      ],
      hint: 'A 8 és az 5 legkisebb közös nevezője a 40.'
    },
    {
      id: 'q28',
      level: 3,
      prompt: 'Számítsd ki: 1/2 · 4 + 2/3 · 6 = ?',
      options: ['6', '5', '7', '8'],
      correctAnswer: '6',
      explanation: '1/2 · 4 = 2 és 2/3 · 6 = (2·6)/3 = 12/3 = 4. Összegük: 2 + 4 = 6.',
      breakdown: [
        { label: '1. tag értéke', value: '1/2 · 4 = 2' },
        { label: '2. tag értéke', value: '2/3 · 6 = 4' },
        { label: 'Összeg', value: '2 + 4 = 6' }
      ],
      hint: 'Számold ki külön a két szorzatot, majd add össze az eredményeket!'
    },
    {
      id: 'q29',
      level: 3,
      prompt: 'Melyik a helyes sorrend növekvő sorrendben a következő törtekre: 2/3,  3/5,  5/6 ?',
      options: [
        '3/5 < 2/3 < 5/6',
        '2/3 < 3/5 < 5/6',
        '5/6 < 2/3 < 3/5',
        '3/5 < 5/6 < 2/3'
      ],
      correctAnswer: '3/5 < 2/3 < 5/6',
      explanation: 'Közös nevezőre (30) hozva: 3/5 = 18/30, 2/3 = 20/30, 5/6 = 25/30. Mivel 18 < 20 < 25, a sorrend: 3/5 < 2/3 < 5/6.',
      breakdown: [
        { label: 'Közös nevező (30)', value: '3/5 = 18/30; 2/3 = 20/30; 5/6 = 25/30' },
        { label: 'Sorrend felállítása', value: '18/30 < 20/30 < 25/30' }
      ],
      hint: 'Hozd mind a 3 törtet közös nevezőre, a 30-ra!'
    },
    {
      id: 'q30',
      level: 3,
      prompt: 'Egy víztartály 5/6 részéig volt vízzel. Kiengedtek belőle 1/3 tartálynyi vizet, majd hozzáöntöttek 1/4 tartálynyit. A tartály mekkora része van most tele?',
      options: ['3/4 része', '2/3 része', '7/12 része', '5/12 része'],
      correctAnswer: '3/4 része',
      explanation: 'Műveletsor: 5/6 - 1/3 + 1/4. Közös nevező a 12: 10/12 - 4/12 + 3/12 = (10 - 4 + 3)/12 = 9/12 = 3/4.',
      breakdown: [
        { label: 'Közös nevezőre hozás (12)', value: '5/6 = 10/12; 1/3 = 4/12; 1/4 = 3/12' },
        { label: 'Műveletek elvégzése', value: '10/12 - 4/12 + 3/12 = 9/12' },
        { label: 'Egyszerűsítés 3-mal', value: '9/12 = 3/4' }
      ],
      hint: 'Hozd mindhárom törtet 12-edekre: 10/12 - 4/12 + 3/12.'
    }
  ];

  const cheatSheetItems: CheatSheetItem[] = [
    {
      topic: 'Tört fogalma',
      formula: 'a/b = a : b',
      note: 'a = számláló (hány részt vettünk), b = nevező (hány egyenlő részre osztottuk).'
    },
    {
      topic: 'Bővítés & Egyszerűsítés',
      formula: 'a/b = (a·k)/(b·k) = (a:k)/(b:k)',
      note: 'Az érték nem változik. Ha a számláló és nevező relatív prímek, a tört tovább nem egyszerűsíthető.'
    },
    {
      topic: 'Összeadás & Kivonás',
      formula: 'a/c ± b/c = (a ± b)/c',
      note: 'Különböző nevezők esetén először LKKT közös nevezőre bővítünk, majd számlálókat műveletezzük.'
    },
    {
      topic: 'Szorzás egész számmal',
      formula: 'a/b · n = (a·n)/b = a/(b:n)',
      note: 'A számlálót szorozzuk VAGY a nevezőt osztjuk a számmal.'
    },
    {
      topic: 'Osztás egész számmal',
      formula: 'a/b : n = (a:n)/b = a/(b·n)',
      note: 'A számlálót osztjuk (ha osztható) VAGY a nevezőt szorozzuk a számmal.'
    }
  ];

  const cheatSheetCards: CheatSheetCard[] = [
    {
      id: 'cs1',
      title: 'Törtfogalom és Típusok',
      formula: 'a/b',
      note: 'Valódi tört (<1), Áltört (≥1), Vegyes tört (egész + tört).'
    },
    {
      id: 'cs2',
      title: 'Közös Nevező Keresés',
      formula: 'lkkt(b_1, b_2)',
      note: 'A legkisebb olyan szám, amely mindkét nevezőnek többszöröse.'
    },
    {
      id: 'cs3',
      title: 'Műveletek Egész Számmal',
      formula: '· n  \\quad  : n',
      note: 'Szorzásnál számláló szorzása vagy nevező osztása; osztásnál számláló osztása vagy nevező szorzása.'
    }
  ];

  return (
    <QuizTemplate
      title="Mit tanultunk a törtekről? Ismétlés"
      subtitle="30 feladat: Törtfogalom, bővítés, egyszerűsítés, összeadás, kivonás, szorzás és osztás egész számmal."
      emoji="🍕"
      badgeText="🍕 6. Osztály • II. Törtek"
      grade={6}
      chapterId="g6-fractions"
      topicId="g6-fractions-review-quiz"
      questions={questions}
      cheatSheet={cheatSheetItems}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<FractionsReviewMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<FractionsReviewSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
}

export default FractionsReviewQuiz;
