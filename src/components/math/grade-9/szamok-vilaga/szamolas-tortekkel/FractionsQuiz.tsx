import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { FractionsMatcher } from './FractionsMatcher';
import { FractionsSorter } from './FractionsSorter';
import {
  CommonDenominatorSvg,
  ComplexFractionSvg,
  FractionMultDivSvg,
  FractionPartChainSvg
} from './FractionsFigures';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';

interface FractionsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapműveletek, Bővítés és Reciprok (Könnyű)',
    subtitle: 'Közönséges törtek összeadása, kivonása, szorzása, osztása és egyszerűsítése.',
    range: '1 - 10. feladat',
    focus: 'Tankönyvi Alapműveletek',
    questions: [
      {
        id: 'fq1-1',
        questionTypeBadge: 'Összeadás Közös Nevezővel',
        question: 'Mennyi a 7/9 + 3/2 művelet pontos értéke a tankönyv bevezető példája alapján?',
        figure: <CommonDenominatorSvg size={160} />,
        options: ['41/18', '10/11', '10/18', '21/18'],
        correctAnswer: 0,
        hint: 'A 9 és 2 legkisebb közös többszöröse 18. Bővíts: 14/18 + 27/18 = ?',
        explanation: 'Közös nevezőre hozzuk a törteket: 7/9 = 14/18 és 3/2 = 27/18. Összeadva: (14 + 27)/18 = 41/18.'
      },
      {
        id: 'fq1-2',
        questionTypeBadge: 'Kivonás és Negatív Tört',
        question: 'Mennyi a 7/9 - 3/2 művelet pontos értéke?',
        options: ['-13/18', '4/7', '13/18', '-4/18'],
        correctAnswer: 0,
        hint: '14/18 - 27/18 = ? A kisebb számlálóból vonjuk ki a nagyobbat!',
        explanation: 'Közös nevezővel: 14/18 - 27/18 = (14 - 27)/18 = -13/18.'
      },
      {
        id: 'fq1-3',
        questionTypeBadge: 'Tört Szorzása Egész Számmal',
        question: 'Hogyan szorozzuk a 3/4 törtet az 5 egész számmal a tankönyv szabálya szerint?',
        figure: <FractionMultDivSvg size={160} />,
        options: [
          'A számlálót szorozzuk az 5-tel: (3 · 5)/4 = 15/4',
          'A számlálót és nevezőt is szorozzuk 5-tel: 15/20',
          'A nevezőt szorozzuk 5-tel: 3/20',
          'Nem végezhető el'
        ],
        correctAnswer: 0,
        hint: 'Törtet egész számmal úgy szorzunk, hogy a számlálóját szorozzuk meg, a nevező változatlan marad.',
        explanation: 'A tankönyvi szabály: tört szorzása egész számmal: a számlálót szorozzuk az egész számmal, a nevező változatlan: 3/4 · 5 = 15/4.'
      },
      {
        id: 'fq1-4',
        questionTypeBadge: 'Tört Osztása Egész Számmal',
        question: 'Mennyi a 35/4 : 5 művelet értéke a számláló osztásával?',
        options: ['7/4', '7/20', '35/20', '1/4'],
        correctAnswer: 0,
        hint: 'Mivel a 35 osztható 5-tel: 35 : 5 = 7.',
        explanation: 'Ha a számláló osztható az egész számmal, a számlálót osztjuk: (35 : 5)/4 = 7/4.'
      },
      {
        id: 'fq1-5',
        questionTypeBadge: 'Tört Osztása (Nevező Szorzása)',
        question: 'Mennyi a 3/4 : 5 művelet értéke, ha a számláló nem osztható 5-tel?',
        options: ['3/20', '15/4', '3/9', '8/4'],
        correctAnswer: 0,
        hint: 'A nevezőt kell megszorozni az egész számmal: 4 · 5 = ?',
        explanation: 'Ha a számláló nem osztható, a nevezőt szorozzuk az egész számmal: 3 / (4 · 5) = 3/20.'
      },
      {
        id: 'fq1-6',
        questionTypeBadge: 'Tört Szorzása Törttel',
        question: 'Mennyi a 2/7 · 5/3 szorzat értéke?',
        options: ['10/21', '7/10', '10/10', '6/35'],
        correctAnswer: 0,
        hint: 'Számlálót a számlálóval (2 · 5), nevezőt a nevezővel (7 · 3).',
        explanation: 'Számlálók szorzata: 2 · 5 = 10, nevezők szorzata: 7 · 3 = 21. Eredmény: 10/21.'
      },
      {
        id: 'fq1-7',
        questionTypeBadge: 'Osztás Törttel (Reciprok)',
        question: 'Mennyi az 5 : (3/4) osztás értéke a reciprok szabállyal?',
        options: [
          '20/3 (mivel 5 · 4/3 = 20/3)',
          '15/4',
          '3/20',
          '12/5'
        ],
        correctAnswer: 0,
        hint: 'Törttel úgy osztunk, hogy az osztó reciprokával (4/3) szorzunk!',
        explanation: 'Az osztó reciproka 4/3, így: 5 : (3/4) = 5 · (4/3) = 20/3.'
      },
      {
        id: 'fq1-8',
        questionTypeBadge: 'Tört Egyszerűsítése',
        question: 'Melyik a 32/44 tört legegyszerűbb, tovább nem egyszerűsíthető alakja?',
        options: ['8/11', '16/22', '4/5', '8/12'],
        correctAnswer: 0,
        hint: 'Mi a 32 és 44 legnagyobb közös osztója? 4-gyel egyszerűsíts!',
        explanation: 'A számlálót és nevezőt is elosztjuk 4-gyel: 32 : 4 = 8, 44 : 4 = 11. Eredmény: 8/11.'
      },
      {
        id: 'fq1-9',
        questionTypeBadge: 'Tört Bővítése',
        question: 'Melyik számmal kell bővíteni az 5/6 törtet, hogy a nevezője 18 legyen?',
        options: ['3-mal (15/18)', '12-vel', '2-vel', '6-tal'],
        correctAnswer: 0,
        hint: '6 · ? = 18. Szorozd meg a számlálót is ugyanazzal!',
        explanation: '18 : 6 = 3, így 3-mal kell bővíteni mindkét tagot: (5 · 3) / (6 · 3) = 15/18.'
      },
      {
        id: 'fq1-10',
        questionTypeBadge: 'Tizedestört Reciproka',
        question: 'Mennyi a 0,4 tizedestört reciproka?',
        options: ['2,5 (5/2)', '0,6', '4', '1,4'],
        correctAnswer: 0,
        hint: '0,4 = 4/10 = 2/5. Mi a 2/5 reciproka?',
        explanation: '0,4 tört alakja 2/5. Ennek reciproka 5/2, ami tizedestörtként pontosan 2,5. Ellenőrzés: 0,4 · 2,5 = 1.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Emeletes Törtek és Műveleti Sorrend (Közepes)',
    subtitle: 'Többszintes törtek, fő törtvonal és zárójelek helyes kezelése.',
    range: '11 - 20. feladat',
    focus: 'Emeletes Törtek és Prioritások',
    questions: [
      {
        id: 'fq2-1',
        questionTypeBadge: 'Emeletes Tört (Tankönyvi Minta)',
        question: 'Mennyi az (1 + 1/5) / (1 - 1/5) emeletes tört pontos értéke?',
        figure: <ComplexFractionSvg size={160} />,
        options: ['3/2 (1,5)', '2/3', '6/5', '1'],
        correctAnswer: 0,
        hint: 'Számold ki a számlálót (5/5 + 1/5 = 6/5) és a nevezőt (5/5 - 1/5 = 4/5)!',
        explanation: 'Számláló: 1 + 1/5 = 6/5. Nevező: 1 - 1/5 = 4/5. Emeletes tört: (6/5) : (4/5) = 6/5 · 5/4 = 6/4 = 3/2 = 1,5.'
      },
      {
        id: 'fq2-2',
        questionTypeBadge: 'Emeletes Tört Kivonással',
        question: 'Mennyi a (3/5 - 1/6) / (2/3 + 1/2) emeletes tört értéke a tankönyv 49. oldaláról?',
        options: ['13/35', '13/30', '7/6', '26/70'],
        correctAnswer: 0,
        hint: 'Számláló: 18/30 - 5/30 = 13/30. Nevező: 4/6 + 3/6 = 7/6.',
        explanation: 'Számláló: 13/30. Nevező: 7/6 = 35/30. Osztás: (13/30) · (6/7) = 13 / (5 · 7) = 13/35.'
      },
      {
        id: 'fq2-3',
        questionTypeBadge: 'Fő Törtvonal Pozíciója',
        question: 'Mennyi a különbség a (2/3) / 4 és a 2 / (3/4) kifejezések értéke között?',
        options: [
          'Az első 1/6, a második 8/3',
          'Mindkettő 1/6',
          'Mindkettő 8/3',
          'Az első 6, a második 24'
        ],
        correctAnswer: 0,
        hint: 'A fő törtvonal az osztás: (2/3) : 4 vs. 2 : (3/4).',
        explanation: '(2/3) : 4 = 2/12 = 1/6. Viszont 2 : (3/4) = 2 · (4/3) = 8/3. A fő törtvonal helye döntő jelentőségű!'
      },
      {
        id: 'fq2-4',
        questionTypeBadge: 'Törtrész Kiszámítása',
        question: 'Mennyi 28-nak a 2/7 része a tankönyv definíciója szerint?',
        options: ['8', '14', '4', '7'],
        correctAnswer: 0,
        hint: '28-at szorozd meg 2/7-del: (28 · 2) / 7.',
        explanation: 'Egy szám 2/7 része azt jelenti: a számot megszorozzuk 2/7-del: 28 · 2/7 = (28 : 7) · 2 = 4 · 2 = 8.'
      },
      {
        id: 'fq2-5',
        questionTypeBadge: 'Negatív Törtek Szorzása',
        question: 'Mennyi a (-5/6) · (-3/10) szorzat értéke?',
        options: ['1/4', '-1/4', '15/60', '-1/2'],
        correctAnswer: 0,
        hint: 'Mínusz szorozva mínusszal plusz! Keresztbe egyszerűsíts: 5 és 10, 3 és 6.',
        explanation: 'Két negatív szám szorzata pozitív: (5 · 3) / (6 · 10). Egyszerűsítve: (1 · 1) / (2 · 2) = 1/4.'
      },
      {
        id: 'fq2-6',
        questionTypeBadge: 'Műveleti Sorrend Zárójellel',
        question: 'Mennyi a 3/4 + 1/4 · 2/3 műveletsor értéke?',
        options: ['11/12', '2/3', '1/3', '5/6'],
        correctAnswer: 0,
        hint: 'A szorzást kell előbb elvégezni: 1/4 · 2/3 = 2/12 = 1/6!',
        explanation: 'Először a szorzás: 1/4 · 2/3 = 1/6. Utána közös nevezővel az összeadás: 3/4 + 1/6 = 9/12 + 2/12 = 11/12.'
      },
      {
        id: 'fq2-7',
        questionTypeBadge: 'Előjelszabály Törteknél',
        question: 'Melyik kifejezés NEM egyenlő a - (3/4) tört értékével?',
        options: ['(-3) / (-4)', '(-3) / 4', '3 / (-4)', '- 0,75'],
        correctAnswer: 0,
        hint: 'Két negatív szám hányadosa pozitív!',
        explanation: '(-3)/(-4) = +3/4 = +0,75, ami pozitív szám, míg a többi mind -0,75.'
      },
      {
        id: 'fq2-8',
        questionTypeBadge: 'Reciprok Összefüggés',
        question: 'Mennyi a -3/8 tört reciproka?',
        options: ['-8/3', '8/3', '3/8', '-3/8'],
        correctAnswer: 0,
        hint: 'A reciprok előjele mindig megegyezik az eredeti szám előjelével!',
        explanation: 'Egy tört reciprokánál felcseréljük a számlálót és nevezőt, az előjel változatlan marad: (-3/8) · (-8/3) = +1.'
      },
      {
        id: 'fq2-9',
        questionTypeBadge: 'Zárójelek Elhagyása',
        question: 'Az alábbi kifejezések közül melyikben hagyható el a zárójel az eredmény megváltoztatása nélkül?',
        options: [
          '(3/4 · 2/5) + 1/2',
          '3/4 · (2/5 + 1/2)',
          '5 - (1/3 + 1/4)',
          '(1/2 : 1/3) : 1/4'
        ],
        correctAnswer: 0,
        hint: 'A szorzás a zárójel nélkül is megelőzi az összeadást.',
        explanation: 'Mivel a szorzás amúgy is megelőzi az összeadást a műveleti sorrendben, a (3/4 · 2/5) körüli zárójel felesleges, értéke nem változik.'
      },
      {
        id: 'fq2-10',
        questionTypeBadge: 'Összegből Való Egyszerűsítés',
        question: 'Igaz-e a következő átalakítás: (2 + 7) / 2 = 1 + 7 = 8?',
        options: [
          'Hamis, mert (2 + 7)/2 = 9/2 = 4,5, összegből nem egyszerűsítünk tagonként',
          'Igaz, mert a 2-vel egyszerűsítettünk',
          'Csak akkor igaz, ha a számláló páros',
          'Igaz, a törtek disztributív tulajdonsága miatt'
        ],
        correctAnswer: 0,
        hint: 'Számold ki az eredeti tört pontos értékét: 9/2 mennyi?',
        explanation: 'Gyakori buktató: összegből tagonként nem egyszerűsítünk! (2 + 7)/2 = 9/2 = 4,5 ≠ 8.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Szöveges Feladatok és Láncolt Törtrészek (Nehéz)',
    subtitle: 'Tankönyvi mazsola- és ecetsav-feladatok, érettségi típusú emeletes törtek.',
    range: '21 - 30. feladat',
    focus: 'Összetett és Szöveges Típusfeladatok',
    questions: [
      {
        id: 'fq3-1',
        questionTypeBadge: 'Tk. 50. o. Mazsola-feladat',
        question: '2,5 kg mazsolából Klári elviszi az 1/12 részét, Andi a maradék 3/11 részét, Zsolt a további maradék 1/4 részét, Emese pedig a maradék 2/3 részét. Hányadrésze maradt meg a mazsolának?',
        figure: <FractionPartChainSvg size={160} />,
        options: ['1/6 része', '1/12 része', '1/4 része', '1/8 része'],
        correctAnswer: 0,
        hint: 'Szorozd össze a megmaradt részeket: (1 - 1/12) · (1 - 3/11) · (1 - 1/4) · (1 - 2/3)!',
        explanation: 'A megmaradt hányadok: (11/12) · (8/11) · (3/4) · (1/3). Egyszerűsítve a 11-gyel, 3-mal, 8/12 = 2/3, 2/3 · 3/4 · 1/3 = 1/6!'
      },
      {
        id: 'fq3-2',
        questionTypeBadge: 'Mazsola Tömege Grammban',
        question: 'A fenti mazsola-feladatban hány gramm mazsola maradt meg a 2,5 kg-ból (egy tizedesre kerekítve)?',
        options: ['416,7 g', '208,3 g', '500,0 g', '312,5 g'],
        correctAnswer: 0,
        hint: '2,5 kg = 2500 g. Mennyi 2500 g-nak az 1/6 része?',
        explanation: '2500 · 1/6 = 2500 / 6 = 416,666... g ≈ 416,7 gramm.'
      },
      {
        id: 'fq3-3',
        questionTypeBadge: 'Tk. 50. o. Ecetsav Keverés',
        question: 'Összeöntünk 1,5 liter (2/5 ecetsav) és 2,5 liter (1/10 ecetsav) oldatot, majd hozzáadunk 1 liter vizet. Hányadrésze lett ecetsav az 5 literes végső oldatnak?',
        options: ['17/100 (17%)', '3/10 (30%)', '1/5 (20%)', '21/100 (21%)'],
        correctAnswer: 0,
        hint: 'Számold ki a tiszta ecetsav mennyiségét: 1,5 · 2/5 + 2,5 · 1/10 = 0,6 + 0,25 = 0,85 liter. Oszd el 5-tel!',
        explanation: 'Tiszta ecetsav: 1,5 · 2/5 = 0,6 l; 2,5 · 1/10 = 0,25 l. Összes ecetsav = 0,85 l. A teljes oldat 5 l. Hányad: 0,85 / 5 = 17/100 (17%).'
      },
      {
        id: 'fq3-4',
        questionTypeBadge: 'Tk. 50. o. Vegyszeres Feladat',
        question: '3,7 liter oldat 1/10 része vegyszer. 2,3 liter oldat 2/15 része ugyanaz a vegyszer. Összeöntjük a két oldatot (összesen 6 liter). Mennyi tiszta vegyszer van benne literben?',
        options: ['101/150 liter (kb. 0,677 l)', '0,55 liter', '3/5 liter', '1/6 liter'],
        correctAnswer: 0,
        hint: '3,7 · 1/10 = 37/100. 2,3 · 2/15 = 46/150 = 23/75.',
        explanation: '37/100 + 46/150 = 111/300 + 92/300 = 203/300 liter tiszta vegyszer, ami kb. 0,677 liter.'
      },
      {
        id: 'fq3-5',
        questionTypeBadge: 'Láncolt Emeletes Tört',
        question: 'Mennyi az 1 + 1 / (1 + 1/2) láncolt tört pontos értéke?',
        options: ['5/3', '4/3', '3/2', '7/4'],
        correctAnswer: 0,
        hint: 'Alulról indulj: 1 + 1/2 = 3/2. Ennek reciproka 2/3. 1 + 2/3 = ?',
        explanation: '1 + 1/2 = 3/2. 1 / (3/2) = 2/3. Így 1 + 2/3 = 5/3.'
      },
      {
        id: 'fq3-6',
        questionTypeBadge: 'Egész Visszakövetkeztetése',
        question: 'Egy középiskolai osztály 3/5 része, azaz 18 fő leánytanuló. Hány fős az egész osztály?',
        options: ['30 fős', '28 fős', '36 fős', '25 fős'],
        correctAnswer: 0,
        hint: 'Ha az egész x, akkor x · 3/5 = 18. Oszd el a 18-at 3/5-del!',
        explanation: 'x = 18 : (3/5) = 18 · (5/3) = 6 · 5 = 30 fős az osztály.'
      },
      {
        id: 'fq3-7',
        questionTypeBadge: 'Érettségi Típusfeladat',
        question: 'Mennyi a 2/3 - 1/4 : 3/8 kifejezés pontos értéke?',
        options: ['0', '1/3', '2/3', '-1/6'],
        correctAnswer: 0,
        hint: 'Előbb az osztást végezd el: 1/4 : 3/8 = 1/4 · 8/3 = 2/3!',
        explanation: 'Osztás előbb: 1/4 : 3/8 = 1/4 · 8/3 = 8/12 = 2/3. Kivonás: 2/3 - 2/3 = 0.'
      },
      {
        id: 'fq3-8',
        questionTypeBadge: 'Tizedestört és Tört Összege',
        question: 'Mennyi a 0,25 + 1/3 művelet pontos tört értéke?',
        options: ['7/12', '5/8', '2/7', '11/12'],
        correctAnswer: 0,
        hint: '0,25 = 1/4. Közös nevező a 4 és 3 között 12.',
        explanation: '0,25 = 1/4 = 3/12. 1/3 = 4/12. Összegük: 3/12 + 4/12 = 7/12.'
      },
      {
        id: 'fq3-9',
        questionTypeBadge: 'Két Tört Közötti Szám',
        question: 'Melyik szám található pontosan félúton (számtani közepe) az 1/3 és az 1/2 között?',
        options: ['5/12', '2/5', '7/12', '3/8'],
        correctAnswer: 0,
        hint: 'Add össze a két törtet (1/3 + 1/2 = 5/6), majd oszd el 2-vel!',
        explanation: '(1/3 + 1/2) : 2 = (2/6 + 3/6) : 2 = (5/6) : 2 = 5/12.'
      },
      {
        id: 'fq3-10',
        questionTypeBadge: 'Összetett Buktató Teszt',
        question: 'Az alábbi állítások közül melyik HAMIS?',
        options: [
          'Egy pozitív szám reciproka mindig kisebb az eredeti számnál',
          'Bármely két racionális szám szorzata racionális szám',
          'Törtet törttel osztani annyi, mint az osztó reciprokával szorozni',
          'A negatív tört reciproka negatív tört'
        ],
        correctAnswer: 0,
        hint: 'Gondolj az 1/2 reciprokára: 1/2 reciproka 2, ami nagyobb, mint 1/2!',
        explanation: 'Ha egy pozitív szám 1-nél kisebb (pl. 1/2, 1/4), a reciproka (2, 4) NAGYOBB nála! Ezért az állítás hamis.'
      }
    ]
  }
};

const fractionsCheatSheets: CheatSheetCard[] = [
  {
    id: 'fcs-1',
    title: 'Összeadás és Kivonás Szabálya',
    formula: '\\frac{a}{c} \\pm \\frac{b}{c} = \\frac{a \\pm b}{c} \\quad | \\quad \\text{Közös nevező: } \\text{lkkt}(d_1, d_2)',
    description: 'Törteket csak azonos nevező esetén adhatunk össze vagy vonhatunk ki. Mindig bővítsünk a legkisebb közös többszörösre!',
    note: 'Soha ne add össze a nevezőket!',
    figure: <CommonDenominatorSvg size={140} />,
    color: 'blue'
  },
  {
    id: 'fcs-2',
    title: 'Szorzás és Osztás Törtekkel',
    formula: '\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d} \\quad | \\quad \\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}',
    description: 'Szorzásnál számlálót számlálóval, nevezőt nevezővel. Osztásnál az osztó reciprokával szorzunk!',
    note: 'Szorzás előtt mindig egyszerűsíts keresztbe!',
    figure: <FractionMultDivSvg size={140} />,
    color: 'cyan'
  },
  {
    id: 'fcs-3',
    title: 'Emeletes Törtek Feloldása',
    formula: '\\frac{\\frac{a}{b}}{\\frac{c}{d}} = \\frac{a}{b} : \\frac{c}{d} = \\frac{a \\cdot d}{b \\cdot c}',
    description: 'A fő törtvonal az osztásjelet helyettesíti. Külön számold ki a számlálót és nevezőt, majd oszd el őket!',
    note: 'Ügyelj a fő törtvonal pozíciójára az egyenlőségjel magasságában!',
    figure: <ComplexFractionSvg size={140} />,
    color: 'purple'
  },
  {
    id: 'fcs-4',
    title: 'Törtrész és Maradékok Láncolása',
    formula: 'Törtrész = X \\cdot \\frac{a}{b} \\quad | \\quad \\text{Maradék} = X \\cdot \\left(1 - \\frac{a}{b}\\right)',
    description: 'Egy szám törtrésze a szorzatuk. Ha a maradék törtrészét veszik el, mindig az (1 - törtrész) faktorokkal láncolunk.',
    note: 'A tankönyvi mazsola- és keverési feladatok kulcsa!',
    figure: <FractionPartChainSvg size={140} />,
    color: 'amber'
  }
];

export const FractionsQuiz: React.FC<FractionsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Számolás Törtekkel Gyakorló Kvíz"
      subtitle="Törtek értelmezése, egyszerűsítés, bővítés, alapműveletek és emeletes törtek 30 feladatban"
      badgeText="9. OSZTÁLY • II. A SZÁMOK VILÁGA • ½ GYAKORLÓ KVÍZ"
      emoji="½"
      themeColor="cyan"
      levelConfigs={quizLevels}
      cheatSheetCards={fractionsCheatSheets}
      cheatSheetTitle="Törtműveletek és Emeletes Törtek Segédlet"
      defaultLevel={1}
      grade={9}
      chapterId="szamok-vilaga"
      topicId="g9-szamok-tortek-quiz"
      topicTitle="Számolás törtekkel"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a törtműveleteket, emeletes törteket és eredményeiket!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <FractionsMatcher
              key={`fractions-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToSorter={switchToSorter}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító Játék',
          subtitle: 'Kategorizáld a törteket nagyság, előjel és igazságtartalom szerint!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-teal-600 dark:text-teal-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <FractionsSorter
              key={`fractions-sorter-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToMatcher={switchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};

export default FractionsQuiz;
