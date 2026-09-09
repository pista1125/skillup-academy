import React from 'react';
import { LayoutGrid, ArrowRightLeft } from 'lucide-react';
import { QuizTemplate, LevelConfig, CheatSheetItem, DifficultyLevel, CustomGameMode } from '../QuizTemplate';
import { RemainderCalculationMatcher } from './RemainderCalculationMatcher';
import { RemainderCalculationSorter } from './RemainderCalculationSorter';

export interface RemainderCalculationQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const CHEAT_SHEET: CheatSheetItem[] = [
  {
    topic: 'Maradékos osztás alaptétele',
    formula: 'a = b · q + r',
    note: 'Osztandó = Osztó · Hányados + Maradék'
  },
  {
    topic: 'A maradék nagysága',
    formula: '0 ≤ r < b',
    note: 'A maradék nemnegatív és szigorúan kisebb az osztónál!'
  },
  {
    topic: 'Lehetséges maradékok száma',
    formula: 'b-vel osztva pontosan b db maradék',
    note: 'r ∈ {0, 1, 2, ..., b - 1}'
  },
  {
    topic: 'Ha az osztandó kisebb',
    formula: 'a < b esetén: q = 0 és r = a',
    note: 'Pl. 4 : 9 = 0, maradék 4 (mert 4 = 9·0 + 4).'
  },
  {
    topic: 'Naptárszámítás (Hét napjai)',
    formula: 'Napok száma mod 7',
    note: '7-tel osztva a maradék adja meg a napok eltolódását.'
  },
  {
    topic: '10-es maradék',
    formula: 'N mod 10 = utolsó számjegy',
    note: 'Bármely természetes szám 10-es maradéka az egyesek helyén álló számjegy.'
  }
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Alapvető maradékos osztások és lehetséges maradékok',
    range: 'Egyjegyű osztókkal végzett maradékos osztások legfeljebb 50-ig',
    focus: 'Hányados és maradék leolvasása, 0 ≤ r < b szabály',
    color: 'teal',
    badgeBg: 'bg-teal-50 dark:bg-teal-950/40',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-700 dark:text-teal-300',
    accentGradient: 'from-teal-500 to-emerald-600',
    iconBg: 'bg-teal-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Mennyi a maradék, ha 23-at elosztunk 5-tel?',
        highlightValue: '23 : 5',
        questionTypeBadge: 'Alaposztás',
        options: ['1', '2', '3', '4'],
        correctAnswer: 2,
        explanation: '23-ban az 5 megvan 4-szer (4 · 5 = 20), és a maradék 23 - 20 = 3.',
        breakdown: [
          'Keressük az 5 legnagyobb többszörösét, ami ≤ 23: 4 · 5 = 20',
          'Kivonjuk: 23 - 20 = 3',
          'Tehát 23 = 5 · 4 + 3, a maradék: 3.'
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Mennyi a hányados és a maradék, ha 37-et osztunk 6-tal?',
        highlightValue: '37 : 6',
        questionTypeBadge: 'Hányados + Maradék',
        options: ['Hányados: 5, maradék: 7', 'Hányados: 6, maradék: 1', 'Hányados: 6, maradék: 2', 'Hányados: 5, maradék: 1'],
        correctAnswer: 1,
        explanation: '37 : 6 = 6, maradék 1, mert 6 · 6 + 1 = 36 + 1 = 37.',
        breakdown: [
          '6 · 6 = 36',
          '37 - 36 = 1',
          'Mivel 0 ≤ 1 < 6, a hányados 6, a maradék 1.'
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Hányféle különböző maradék keletkezhet, ha természetes számokat 4-gyel osztunk?',
        highlightValue: 'Osztó: 4',
        questionTypeBadge: 'Maradékok száma',
        options: ['3-féle', '4-féle', '5-féle', 'Végtelen sok'],
        correctAnswer: 1,
        explanation: '4-gyel osztva pontosan 4-féle maradék lehet: 0, 1, 2, 3.',
        breakdown: [
          'Bármely b-vel osztva a lehetséges maradékok: 0, 1, ..., b-1',
          'Itt b = 4, tehát a halmaz: {0, 1, 2, 3}',
          'Ez pontosan 4 darab lehetőség.'
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Lehet-e a maradék 7, ha egy számot 6-tal osztunk?',
        highlightValue: 'r = 7, b = 6 ?',
        questionTypeBadge: 'Szabályellenőrzés',
        options: ['Igen, ha a szám nagyon nagy', 'Igen, ha a szám páratlan', 'Nem, mert a maradék mindig kisebb kell legyen az osztónál', 'Nem, mert a maradék csak páros lehet'],
        correctAnswer: 2,
        explanation: 'Nem, mert a maradék feltétele 0 ≤ r < b. 6-tal osztva a maximális maradék 5 lehet.',
        breakdown: [
          'A maradéknak szigorúan kisebbnek kell lennie az osztónál (r < b).',
          'Ha r = 7 lenne 6-os osztónál, a 7-ből még egyszer kijönne a 6, és a valós maradék 1 lenne.',
          'Tehát a válasz: Nem.'
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Mennyi a maradék, ha 4-et elosztunk 7-tel?',
        highlightValue: '4 : 7',
        questionTypeBadge: 'Kisebb osztandó',
        options: ['0', '1', '3', '4'],
        correctAnswer: 3,
        explanation: 'Ha az osztandó kisebb az osztónál (4 < 7), akkor a hányados 0, és a teljes szám megmarad maradékként (4).',
        breakdown: [
          '4-ben a 7 megvan 0-szor: 7 · 0 = 0',
          'Maradék: 4 - 0 = 4',
          '4 = 7 · 0 + 4, és 0 ≤ 4 < 7.'
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Melyik szám ad 2 maradékot 5-tel osztva?',
        highlightValue: 'N : 5 maradéka = 2',
        questionTypeBadge: 'Keresés',
        options: ['20', '22', '25', '29'],
        correctAnswer: 1,
        explanation: '22 : 5 = 4, maradék 2 (mert 22 = 5 · 4 + 2).',
        breakdown: [
          '20 : 5 = 4, maradék 0',
          '22 : 5 = 4, maradék 2 (HELYES)',
          '25 : 5 = 5, maradék 0',
          '29 : 5 = 5, maradék 4'
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Mennyi a 10-es maradéka a 387 számnak?',
        highlightValue: '387 mod 10',
        questionTypeBadge: '10-es maradék',
        options: ['3', '8', '7', '0'],
        correctAnswer: 2,
        explanation: 'Bármely egész szám 10-es maradéka az utolsó számjegye, azaz a 7.',
        breakdown: [
          '387 = 10 · 38 + 7',
          'A hányados 38, a maradék 7.'
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Ha a = 8 · 5 + 3, mennyi az a szám értéke?',
        highlightValue: 'a = 8 · 5 + 3',
        questionTypeBadge: 'Visszaszámolás',
        options: ['40', '43', '45', '48'],
        correctAnswer: 1,
        explanation: 'Először szorzunk: 8 · 5 = 40, majd hozzáadjuk a maradékot: 40 + 3 = 43.',
        breakdown: [
          '8 · 5 = 40',
          '40 + 3 = 43'
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Mennyi a maradék, ha 48-at elosztunk 8-cal?',
        highlightValue: '48 : 8',
        questionTypeBadge: 'Maradék nélküli',
        options: ['0', '1', '6', '8'],
        correctAnswer: 0,
        explanation: '48 pontosan osztható 8-cal (6 · 8 = 48), így a maradék 0.',
        breakdown: [
          '48 : 8 = 6, maradék 0',
          '48 = 8 · 6 + 0'
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Milyen maradékot ad egy páratlan szám 2-vel osztva?',
        highlightValue: 'Páratlan : 2',
        questionTypeBadge: 'Páros/Páratlan',
        options: ['0', '1', '2', 'Változó'],
        correctAnswer: 1,
        explanation: 'Minden páratlan szám 2-vel osztva pontosan 1 maradékot ad.',
        breakdown: [
          'Páros számok 2-es maradéka = 0',
          'Páratlan számok 2-es maradéka = 1'
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Naptárszámítás, óralap és összetettebb maradékos feladatok',
    range: 'Kétjegyű számok, idő- és naptárszámítás 100-ig',
    focus: '7-es és 12-es periódusok, hiányzó tagok visszaszámolása',
    color: 'indigo',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    accentGradient: 'from-indigo-500 to-teal-600',
    iconBg: 'bg-indigo-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Ha ma Hétfő van, milyen nap lesz pontosan 16 nap múlva?',
        highlightValue: 'Hétfő + 16 nap',
        questionTypeBadge: 'Naptár',
        options: ['Kedd', 'Szerda', 'Csütörtök', 'Péntek'],
        correctAnswer: 1,
        explanation: '16 : 7 = 2 hét, maradék 2 nap. Hétfő + 2 nap = Szerda.',
        breakdown: [
          '16 = 2 · 7 + 2',
          'A 2 hét eltelte után újra Hétfő lenne.',
          'Még hozzáadunk 2 napot: Hétfő $\\to$ Kedd $\\to$ Szerda.'
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Ha ma Kedd van, milyen nap lesz 30 nap múlva?',
        highlightValue: 'Kedd + 30 nap',
        questionTypeBadge: 'Naptár',
        options: ['Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
        correctAnswer: 1,
        explanation: '30 : 7 = 4 hét, maradék 2 nap. Kedd + 2 nap = Csütörtök.',
        breakdown: [
          '30 = 4 · 7 + 2',
          'Kedd + 2 nap = Csütörtök.'
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Most 8 óra van egy 12 órás órán. Hány órát mutat 27 óra múlva?',
        highlightValue: '8 óra + 27 óra',
        questionTypeBadge: 'Óralap',
        options: ['9 óra', '10 óra', '11 óra', '12 óra'],
        correctAnswer: 2,
        explanation: '27 : 12 = 2 kör, maradék 3 óra. 8 + 3 = 11 óra.',
        breakdown: [
          '27 = 2 · 12 + 3',
          'A mutató 2 teljes kört tesz meg, majd még 3 órát lép előre: 8 + 3 = 11 óra.'
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Egy számot 9-cel osztva a hányados 7, a maradék 5. Melyik ez a szám?',
        highlightValue: 'N : 9 = 7 (m: 5)',
        questionTypeBadge: 'Ismeretlen szám',
        options: ['63', '65', '68', '72'],
        correctAnswer: 2,
        explanation: 'N = 9 · 7 + 5 = 63 + 5 = 68.',
        breakdown: [
          'Osztó · Hányados = 9 · 7 = 63',
          'Hozzáadjuk a maradékot: 63 + 5 = 68.'
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Ha egy számot 7-tel osztunk, legfeljebb mekkora lehet a maradék?',
        highlightValue: 'Max maradék b = 7 esetén',
        questionTypeBadge: 'Felső korlát',
        options: ['5', '6', '7', '8'],
        correctAnswer: 1,
        explanation: 'Mivel a maradék szigorúan kisebb az osztónál (r < 7), a legnagyobb lehetséges maradék a 6.',
        breakdown: [
          'A maradékok: 0, 1, 2, 3, 4, 5, 6.',
          'A maximális érték a 6.'
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Mennyi a 85 osztva 9-cel maradéka?',
        highlightValue: '85 : 9',
        questionTypeBadge: 'Osztás',
        options: ['3', '4', '5', '6'],
        correctAnswer: 1,
        explanation: '9 · 9 = 81, 85 - 81 = 4. A maradék 4.',
        breakdown: [
          '85 = 9 · 9 + 4',
          'Maradék = 4.'
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Ha ma Péntek van, milyen nap volt 10 nappal ezelőtt?',
        highlightValue: 'Péntek - 10 nap',
        questionTypeBadge: 'Visszaszámolás',
        options: ['Kedd', 'Szerda', 'Csütörtök', 'Szombat'],
        correctAnswer: 0,
        explanation: '10 : 7 = 1 hét, maradék 3 nap. Péntektől visszafelé 3 nap: Csütörtök $\\to$ Szerda $\\to$ Kedd.',
        breakdown: [
          '10 = 1 · 7 + 3 nap vissza',
          'Péntek - 3 nap = Kedd.'
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Melyik az a legkisebb kétjegyű szám, amely 6-tal osztva 5 maradékot ad?',
        highlightValue: 'Min 2-jegyű N: N mod 6 = 5',
        questionTypeBadge: 'Szélsőérték',
        options: ['11', '17', '23', '29'],
        correctAnswer: 0,
        explanation: '6 · 1 + 5 = 11, ami már kétjegyű szám!',
        breakdown: [
          '6 · 0 + 5 = 5 (egyjegyű)',
          '6 · 1 + 5 = 11 (kétjegyű, legkisebb)'
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Mennyi maradékot ad a 100, ha 7-tel osztjuk?',
        highlightValue: '100 : 7',
        questionTypeBadge: 'Klasszikus 100 nap',
        options: ['1', '2', '3', '5'],
        correctAnswer: 1,
        explanation: '100 : 7 = 14 (14 · 7 = 98), és 100 - 98 = 2. A maradék 2.',
        breakdown: [
          '100 = 7 · 14 + 2',
          'Tehát 100 nap = 14 hét és 2 nap.'
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Melyik szám NEM adhat 3 maradékot 4-gyel osztva?',
        highlightValue: 'N mod 4 ≠ 3',
        questionTypeBadge: 'Kizárás',
        options: ['7', '15', '23', '26'],
        correctAnswer: 3,
        explanation: '26 : 4 = 6, maradék 2 (páros szám, így nem adhat páratlan 3-as maradékot).',
        breakdown: [
          '7 = 4·1 + 3 (maradék 3)',
          '15 = 4·3 + 3 (maradék 3)',
          '23 = 4·5 + 3 (maradék 3)',
          '26 = 4·6 + 2 (maradék 2 -> EZ A KAKUKKTOJÁS)'
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Szöveges feladványok, összetett periodicitás és számelmélet',
    range: 'Összetett maradékos feladatok, több feltétel egyidejű vizsgálata',
    focus: 'Közös maradékok, maradékos összeadás és szorzás szabályai',
    color: 'purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-teal-600',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Egy dobozban lévő golyókat 4-esével és 5-ösével csoportosítva is 3 marad. Legalább hány golyó van a dobozban (ha több mint 10)?',
        highlightValue: 'mod 4 = 3 és mod 5 = 3',
        questionTypeBadge: 'Közös maradék',
        options: ['15', '18', '23', '33'],
        correctAnswer: 2,
        explanation: 'A szám 3-mal nagyobb, mint a 4 és 5 legkisebb közös többszöröse (20): 20 + 3 = 23.',
        breakdown: [
          'A 4 és 5 közös többszörösei: 20, 40, 60, ...',
          'Hozzáadjuk a közös maradékot (3): 20 + 3 = 23',
          'Ellenőrzés: 23 = 4·5 + 3, és 23 = 5·4 + 3.'
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Ha a számjegyek összege 25, mennyi maradékot ad a szám 9-cel osztva?',
        highlightValue: 'Számjegyösszeg = 25',
        questionTypeBadge: 'Számjegyösszeg',
        options: ['2', '4', '7', '8'],
        correctAnswer: 2,
        explanation: 'Egy szám 9-es maradéka megegyezik a számjegyösszegének 9-es maradékával: 25 : 9 = 2, maradék 7.',
        breakdown: [
          'Számelméleti tétel: N mod 9 = (számjegyösszeg) mod 9',
          '25 : 9 = 2, mert 2 · 9 = 18',
          'Maradék: 25 - 18 = 7.'
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Ha az „A” szám 5-tel osztva 2-t, a „B” szám 5-tel osztva 4-et ad maradékul, mennyi (A + B) 5-ös maradéka?',
        highlightValue: '(A + B) mod 5',
        questionTypeBadge: 'Maradékok összege',
        options: ['1', '2', '4', '6'],
        correctAnswer: 0,
        explanation: 'A maradékok összege: 2 + 4 = 6. Mivel 6 ≥ 5, levonjuk az 5-öt: 6 - 5 = 1.',
        breakdown: [
          'Összeg maradéka = (r₁ + r₂) mod 5',
          '2 + 4 = 6',
          '6 : 5 = 1, maradék 1.'
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Ha az „A” szám 7-tel osztva 3-at, a „B” szám 7-tel osztva 4-et ad maradékul, mennyi (A · B) 7-es maradéka?',
        highlightValue: '(A · B) mod 7',
        questionTypeBadge: 'Maradékok szorzata',
        options: ['1', '3', '5', '12'],
        correctAnswer: 2,
        explanation: 'A maradékok szorzata: 3 · 4 = 12. 12-t 7-tel osztva a maradék 5.',
        breakdown: [
          'Szorzat maradéka = (r₁ · r₂) mod 7',
          '3 · 4 = 12',
          '12 : 7 = 1, maradék 5.'
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Egy év nem szökőév (365 napos). Ha január 1-je Csütörtökre esett, milyen napra esik december 31-e ugyanabban az évben?',
        highlightValue: '365 napos év',
        questionTypeBadge: 'Évnaptár',
        options: ['Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
        correctAnswer: 1,
        explanation: '365 : 7 = 52 hét + 1 nap. Január 1-től december 31-ig 364 nap telik el (364 : 7 = 52 hét kerek), így pontosan Csütörtök marad!',
        breakdown: [
          'Január 1-től Dec 31-ig az eltelt napok száma: 365 - 1 = 364 nap.',
          '364 : 7 = 52 egész hét (maradék 0).',
          'Ezért egy normál év mindig ugyanolyan napon ér véget, mint ahogy kezdődött: Csütörtök!'
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Melyik az a legnagyobb kétjegyű szám, amely 8-cal osztva 3 maradékot ad?',
        highlightValue: 'Max 2-jegyű N: N mod 8 = 3',
        questionTypeBadge: 'Szélsőérték',
        options: ['91', '96', '99', '95'],
        correctAnswer: 2,
        explanation: '8 · 12 = 96, és 96 + 3 = 99 (ami a legnagyobb kétjegyű szám)!',
        breakdown: [
          '8 legnagyobb 100 alatti többszöröse a 96 (8 · 12)',
          '96 + 3 = 99 ≤ 99 (kétjegyű)',
          'Tehát a 99 a keresett szám.'
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Ha két egymást követő természetes szám szorzatát elosztjuk 2-vel, mennyi a maradék?',
        highlightValue: 'n · (n + 1) : 2',
        questionTypeBadge: 'Bizonyítás',
        options: ['Mindig 0', 'Mindig 1', 'Attól függ, páros-e n', 'Nem lehet tudni'],
        correctAnswer: 0,
        explanation: 'Két egymást követő szám közül az egyik biztosan páros, ezért szorzatuk páros, tehát 2-vel osztva a maradék mindig 0.',
        breakdown: [
          'Egyik szám biztosan 2k alakú',
          'Páros · Páratlan = Páros',
          'Páros szám 2-es maradéka mindig 0.'
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Egy körmérkőzéses bajnokságon a körök száma 6-os ciklusban ismétlődik. A 47. forduló melyik alapkörnek felel meg?',
        highlightValue: '47 mod 6',
        questionTypeBadge: 'Ciklus',
        options: ['3. forduló', '4. forduló', '5. forduló', '6. forduló'],
        correctAnswer: 2,
        explanation: '47 : 6 = 7 kör, maradék 5. Ez az 5. alapkörnek felel meg.',
        breakdown: [
          '47 = 6 · 7 + 5',
          'A maradék 5, tehát az 5. fázisban van.'
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Ha a = 11 · q + 8, milyen maradékot ad az „a” szám, ha 11 helyett nem tudjuk a q-t, de hozzáadunk 3-at: (a + 3)?',
        highlightValue: '(a + 3) : 11 maradéka',
        questionTypeBadge: 'Algebrai maradék',
        options: ['0 (osztható 11-gyel)', '1', '3', '8'],
        correctAnswer: 0,
        explanation: 'a = 11q + 8 $\\to$ a + 3 = 11q + 8 + 3 = 11q + 11 = 11(q + 1), ami pontosan osztható 11-gyel (maradék 0).',
        breakdown: [
          'a + 3 = 11q + 8 + 3',
          '= 11q + 11 = 11 · (q + 1)',
          'Nincs maradék, azaz r = 0.'
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Egy kártyacsomagban 52 lap van. 6 játékos között egyenlően szétosztva hány lap marad a pakliban?',
        highlightValue: '52 : 6 maradéka',
        questionTypeBadge: 'Szöveges maradék',
        options: ['2', '4', '6', '8'],
        correctAnswer: 1,
        explanation: '52 : 6 = 8 lap jut mindenkinek (6 · 8 = 48), és 52 - 48 = 4 lap marad.',
        breakdown: [
          '52 = 6 · 8 + 4',
          'Mindenki kap 8 lapot, a maradék 4 lap.'
        ]
      }
    ]
  }
};

const GAME_MODES: CustomGameMode[] = [
  {
    id: 'matcher',
    title: 'Kártyás Párosító',
    subtitle: '8 pár megkeresése',
    badgeText: '8 Pár',
    icon: <LayoutGrid className="w-3.5 h-3.5 text-teal-500" />,
    render: ({ level, onNextLevel, onOpenRules }) => (
      <RemainderCalculationMatcher
        level={level}
        onNextLevel={onNextLevel}
        onOpenRules={onOpenRules}
      />
    )
  },
  {
    id: 'sorter',
    title: 'Csoportosító',
    subtitle: 'Húzd a helyére (3 csoport)',
    badgeText: '10 Elem (3 csoport)',
    icon: <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-500" />,
    render: ({ level, onNextLevel, onOpenRules }) => (
      <RemainderCalculationSorter
        level={level}
        onNextLevel={onNextLevel}
        onOpenRules={onOpenRules}
      />
    )
  }
];

export function RemainderCalculationQuiz({ onBack, onSwitchToTheory }: RemainderCalculationQuizProps) {
  return (
    <QuizTemplate
      onBack={onBack}
      emoji="⏳"
      topicBadge="⏳ 6. Osztály • I. Egész számok"
      title="Számolás maradékokkal kvíz"
      subtitle="Gyakorold a maradékos osztás alaptételét, a lehetséges maradékokat és a naptárszámítást 3 szinten!"
      cheatSheetTitle="Maradékos osztási szabályok és képletek"
      hintText="💡 Mindig ellenőrizd: a = b · q + r, ahol a maradékra 0 ≤ r < b teljesül!"
      levels={QUIZ_LEVELS}
      cheatSheet={CHEAT_SHEET}
      customGameModes={GAME_MODES}
      themeColor="teal"
    />
  );
}
