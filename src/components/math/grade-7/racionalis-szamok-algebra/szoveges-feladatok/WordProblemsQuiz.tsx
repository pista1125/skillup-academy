import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { WordProblemsMatcher } from './WordProblemsMatcher';
import { WordProblemsSorter } from './WordProblemsSorter';
import {
  FileQuestion,
  Layers,
  Scale,
  Calculator,
  Zap,
  LayoutGrid,
  ArrowRightLeft,
  PieChart,
  ShoppingBag,
  Clock,
  Coins,
  TrendingUp
} from 'lucide-react';

interface WordProblemsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Törtrész kiszámítása',
    icon: <Calculator className="w-4 h-4 text-purple-600" />,
    formula: 'Törtrész = Egész · Tört',
    note: 'Ha az egésznek keressük a törtrészét, összeszorozzuk őket. Pl. 1200 Ft 3/4 része: 1200 · 3/4 = (1200 : 4) · 3 = 900 Ft.'
  },
  {
    id: 'c2',
    title: 'Az egész visszaszámolása',
    icon: <Scale className="w-4 h-4 text-blue-600" />,
    formula: 'Egész = Törtrész : Tört',
    note: 'Ha a részből keressük az egészet, a részt elosztjuk a törttel. Pl. ha egy szám 2/3 része 40, akkor a szám 40 : (2/3) = 40 · 3/2 = 60.'
  },
  {
    id: 'c3',
    title: 'Részarány megállapítása',
    icon: <PieChart className="w-4 h-4 text-emerald-600" />,
    formula: 'Hányadrész = Kérdezett mennyiség / Egész',
    note: 'Mindig azonos mértékegységre váltunk először! Pl. 15 perc az 1 órának (60 percnek): 15/60 = 1/4 része.'
  },
  {
    id: 'c4',
    title: 'A maradék számítása',
    icon: <ShoppingBag className="w-4 h-4 text-amber-600" />,
    formula: 'Maradék tört = 1 - Elhasznált tört',
    note: 'Az egész mindig 1. Ha elköltjük a pénzünk 3/5 részét, akkor megmarad az 1 - 3/5 = 2/5 része.'
  },
  {
    id: 'c5',
    title: 'A maradék törtrésze',
    icon: <Zap className="w-4 h-4 text-rose-600" />,
    formula: '2. lépés = Maradék tört · Új tört',
    note: 'Ha elköltöttük az 1/3-ot, a maradék 2/3. Ha ennek elköltjük a felét (1/2), akkor (2/3) · (1/2) = 1/3-ot költöttünk el másodszorra.'
  },
  {
    id: 'c6',
    title: 'Mértékegységek & Ellenőrzés',
    icon: <Clock className="w-4 h-4 text-indigo-600" />,
    formula: '1 óra = 60 perc, 1 kg = 1000 g, 1 km = 1000 m',
    note: 'Szöveges feladatnál mindig végezz szöveges ellenőrzést és adj teljes szöveges választ mértékegységgel!'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Törtrészek & Arányok',
    subtitle: 'Törtrész számítás, az egész visszakeresése és egyszerű hányadrészek',
    range: '1 - 10. feladat',
    focus: 'Törtrész & Egész visszaszámolás',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Mennyi 1200 Ft-nak a 3/4 része?',
        question: 'Mennyi 1200 Ft-nak a 3/4 része?',
        options: ['800 Ft', '900 Ft', '1000 Ft', '750 Ft'],
        correctAnswer: '900 Ft',
        explanation: '1200 · (3/4) = (1200 : 4) · 3 = 300 · 3 = 900 Ft.',
        breakdown: [
          { label: 'Egy negyedrész', value: '1200 : 4 = 300 Ft' },
          { label: 'Három negyedrész', value: '300 · 3 = 900 Ft' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Egy könyv 240 oldalas. Anna elolvasta a könyv 2/5 részét. Hány oldalt olvasott el?',
        question: 'Egy könyv 240 oldalas. Anna elolvasta a könyv 2/5 részét. Hány oldalt olvasott el?',
        options: ['96 oldalt', '80 oldalt', '120 oldalt', '100 oldalt'],
        correctAnswer: '96 oldalt',
        explanation: '240 · (2/5) = (240 : 5) · 2 = 48 · 2 = 96 oldal.',
        breakdown: [
          { label: '1/5 rész', value: '240 : 5 = 48 oldal' },
          { label: '2/5 rész', value: '48 · 2 = 96 oldal' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Egy gondolt szám 1/3 része 18. Melyik ez a szám?',
        question: 'Egy gondolt szám 1/3 része 18. Melyik ez a szám?',
        options: ['6', '36', '54', '24'],
        correctAnswer: '54',
        explanation: 'Ha a szám harmada 18, akkor a teljes szám: 18 : (1/3) = 18 · 3 = 54.',
        breakdown: [
          { label: 'Művelet', value: '18 : (1/3) = 18 · 3' },
          { label: 'Eredmény', value: '54' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Egy szám 3/4 része 45. Melyik ez a szám?',
        question: 'Egy szám 3/4 része 45. Melyik ez a szám?',
        options: ['60', '50', '40', '75'],
        correctAnswer: '60',
        explanation: '45 : (3/4) = 45 · (4/3) = (45 : 3) · 4 = 15 · 4 = 60.',
        breakdown: [
          { label: '1/4 rész', value: '45 : 3 = 15' },
          { label: '4/4 rész (egész)', value: '15 · 4 = 60' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Hányadrésze 20 perc az 1 órának?',
        question: 'Hányadrésze 20 perc az 1 órának?',
        options: ['1/2', '1/3', '1/4', '1/5'],
        correctAnswer: '1/3',
        explanation: '1 óra = 60 perc. 20 / 60 = 2/6 = 1/3 része.',
        breakdown: [
          { label: 'Azonos mértékegység', value: '1 óra = 60 perc' },
          { label: 'Tört alak & egyszerűsítés', value: '20/60 = 1/3' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Egy 500 fős iskolában a tanulók 3/10 része jár zeneiskolába. Hányan zenélnek?',
        question: 'Egy 500 fős iskolában a tanulók 3/10 része jár zeneiskolába. Hányan zenélnek?',
        options: ['100 fő', '150 fő', '50 fő', '200 fő'],
        correctAnswer: '150 fő',
        explanation: '500 · (3/10) = (500 : 10) · 3 = 50 · 3 = 150 tanuló.',
        breakdown: [
          { label: '1/10 rész', value: '500 : 10 = 50 fő' },
          { label: '3/10 rész', value: '50 · 3 = 150 fő' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Egy zsák lisztből felhasználták a 4/7 részét. Az egész liszt hányadrésze maradt meg?',
        question: 'Egy zsák lisztből felhasználták a 4/7 részét. Az egész liszt hányadrésze maradt meg?',
        options: ['3/7', '2/7', '4/7', '1/7'],
        correctAnswer: '3/7',
        explanation: 'Az egész liszt 1 = 7/7. A maradék: 1 - 4/7 = 7/7 - 4/7 = 3/7 rész.',
        breakdown: [
          { label: 'Egész liszt', value: '1 = 7/7' },
          { label: 'Maradék számítása', value: '7/7 - 4/7 = 3/7' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Mennyi 2500 méternek a 2/5 része?',
        question: 'Mennyi 2500 méternek a 2/5 része?',
        options: ['500 m', '1000 m', '1250 m', '1500 m'],
        correctAnswer: '1000 m',
        explanation: '2500 · (2/5) = (2500 : 5) · 2 = 500 · 2 = 1000 m (1 km).',
        breakdown: [
          { label: '1/5 rész', value: '2500 : 5 = 500 m' },
          { label: '2/5 rész', value: '500 · 2 = 1000 m' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Egy zsebpénz 2/3 része 1600 Ft. Mennyi volt a teljes zsebpénz?',
        question: 'Egy zsebpénz 2/3 része 1600 Ft. Mennyi volt a teljes zsebpénz?',
        options: ['2400 Ft', '3200 Ft', '2000 Ft', '1800 Ft'],
        correctAnswer: '2400 Ft',
        explanation: '1600 : (2/3) = 1600 · (3/2) = (1600 : 2) · 3 = 800 · 3 = 2400 Ft.',
        breakdown: [
          { label: '1/3 rész', value: '1600 : 2 = 800 Ft' },
          { label: '3/3 rész (egész)', value: '800 · 3 = 2400 Ft' }
        ]
      },
      {
        id: 'q1-10',
        prompt: '250 gramm hányadrésze 1 kilogrammnak?',
        question: '250 gramm hányadrésze 1 kilogrammnak?',
        options: ['1/2', '1/5', '1/4', '1/10'],
        correctAnswer: '1/4',
        explanation: '1 kg = 1000 g. 250 / 1000 = 1/4 része.',
        breakdown: [
          { label: 'Azonos egység', value: '1 kg = 1000 g' },
          { label: 'Arány egyszerűsítése', value: '250/1000 = 1/4' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Többlépéses Feladatok & Maradékok',
    subtitle: 'Kétlépéses szöveges feladatok, maradék összegek és részarányok',
    range: '11 - 20. feladat',
    focus: 'Többlépéses feladatok & Maradék',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Péternek 6000 Ft-ja volt. Elköltötte a pénze 2/3 részét. Hány forintja MARADT meg?',
        question: 'Péternek 6000 Ft-ja volt. Elköltötte a pénze 2/3 részét. Hány forintja MARADT meg?',
        options: ['4000 Ft', '2000 Ft', '3000 Ft', '1500 Ft'],
        correctAnswer: '2000 Ft',
        explanation: 'Ha elköltötte a 2/3-át, akkor a megmaradt része 1 - 2/3 = 1/3. 6000 · 1/3 = 2000 Ft.',
        breakdown: [
          { label: 'Elköltött rész', value: '6000 · 2/3 = 4000 Ft' },
          { label: 'Maradék', value: '6000 - 4000 = 2000 Ft' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Egy 300 oldalas könyvnek Bence hétfőn elolvasta az 1/5-ét, kedden a 3/10-ét. Hány oldalt olvasott el a két nap alatt összesen?',
        question: 'Egy 300 oldalas könyvnek Bence hétfőn elolvasta az 1/5-ét, kedden a 3/10-ét. Hány oldalt olvasott el a két nap alatt összesen?',
        options: ['150 oldalt', '120 oldalt', '90 oldalt', '180 oldalt'],
        correctAnswer: '150 oldalt',
        explanation: '1/5 + 3/10 = 2/10 + 3/10 = 5/10 = 1/2 része. 300 · (1/2) = 150 oldal.',
        breakdown: [
          { label: 'Összesített arány', value: '2/10 + 3/10 = 5/10 = 1/2' },
          { label: 'Elolvasott oldalak', value: '300 · 1/2 = 150 oldal' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Egy kirándulócsoport az első nap megtette az út 3/8 részét, a második nap a 2/8 részét. Az út hányadrésze maradt a harmadik napra?',
        question: 'Egy kirándulócsoport az első nap megtette az út 3/8 részét, a második nap a 2/8 részét. Az út hányadrésze maradt a harmadik napra?',
        options: ['5/8', '3/8', '1/4', '1/8'],
        correctAnswer: '3/8',
        explanation: 'Megtett rész: 3/8 + 2/8 = 5/8. A maradék harmadik napra: 1 - 5/8 = 3/8 rész.',
        breakdown: [
          { label: 'Eddig megtett rész', value: '3/8 + 2/8 = 5/8' },
          { label: 'Hátralévő rész', value: '1 - 5/8 = 3/8' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Egy téglalap alakú kert területe 480 m². A virágos rész a kert 3/8-a, a zöldséges a kert 1/4-e, a többi füvesített. Hány m² a fű?',
        question: 'Egy téglalap alakú kert területe 480 m². A virágos rész a kert 3/8-a, a zöldséges a kert 1/4-e, a többi füvesített. Hány m² a fű?',
        options: ['180 m²', '120 m²', '300 m²', '240 m²'],
        correctAnswer: '180 m²',
        explanation: '3/8 + 1/4 = 3/8 + 2/8 = 5/8 a virág és zöldség. A fű a maradék 3/8: 480 · (3/8) = (480 : 8) · 3 = 60 · 3 = 180 m².',
        breakdown: [
          { label: 'Virág + zöldség', value: '3/8 + 2/8 = 5/8' },
          { label: 'Füvesített rész', value: '480 · 3/8 = 180 m²' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Egy tartályból leengedték a víz 4/9 részét, így 250 liter víz maradt benne. Hány literes a teli tartály?',
        question: 'Egy tartályból leengedték a víz 4/9 részét, így 250 liter víz maradt benne. Hány literes a teli tartály?',
        options: ['450 liter', '500 liter', '400 liter', '350 liter'],
        correctAnswer: '450 liter',
        explanation: 'A megmaradt rész 1 - 4/9 = 5/9. Ha a tartály 5/9 része 250 liter, akkor a teljes tartály: 250 : (5/9) = 250 · (9/5) = 50 · 9 = 450 liter.',
        breakdown: [
          { label: 'Megmaradt arány', value: '1 - 4/9 = 5/9' },
          { label: 'Teljes űrtartalom', value: '250 : (5/9) = 450 liter' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Egy 32 fős osztályban a tanulók 3/8-a fiú. Hány LÁNY jár az osztályba?',
        question: 'Egy 32 fős osztályban a tanulók 3/8-a fiú. Hány LÁNY jár az osztályba?',
        options: ['12 lány', '20 lány', '16 lány', '18 lány'],
        correctAnswer: '20 lány',
        explanation: 'A lányok aránya 1 - 3/8 = 5/8 része az osztálynak. 32 · (5/8) = (32 : 8) · 5 = 4 · 5 = 20 lány.',
        breakdown: [
          { label: 'Lányok aránya', value: '1 - 3/8 = 5/8' },
          { label: 'Lányok létszáma', value: '32 · 5/8 = 20 fő' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Zsuzsi elköltötte a pénzének az 1/4 részét ajándékra, majd a MEGMARADT pénzének a felét könyvre. A teljes pénzének hányadrésze maradt meg?',
        question: 'Zsuzsi elköltötte a pénzének az 1/4 részét ajándékra, majd a MEGMARADT pénzének a felét könyvre. A teljes pénzének hányadrésze maradt meg?',
        options: ['1/4', '3/8', '1/2', '1/8'],
        correctAnswer: '3/8',
        explanation: 'Első költés után maradt: 1 - 1/4 = 3/4. Ennek a fele ment könyvre, tehát a másik fele maradt meg: (3/4) · (1/2) = 3/8 része.',
        breakdown: [
          { label: '1. lépés utáni maradék', value: '1 - 1/4 = 3/4' },
          { label: 'Végső maradék', value: '(3/4) · (1/2) = 3/8' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Egy kerékpáros 45 km-t tett meg, ami a tervezett túraútvonal 3/5 része. Hány km van még hátra a túrából?',
        question: 'Egy kerékpáros 45 km-t tett meg, ami a tervezett túraútvonal 3/5 része. Hány km van még hátra a túrából?',
        options: ['75 km', '30 km', '25 km', '15 km'],
        correctAnswer: '30 km',
        explanation: 'A teljes túra: 45 : (3/5) = 45 · 5/3 = 75 km. A hátralévő táv: 75 - 45 = 30 km (vagy a 75 km 2/5 része = 30 km).',
        breakdown: [
          { label: 'Teljes túra', value: '45 : (3/5) = 75 km' },
          { label: 'Hátralévő táv', value: '75 - 45 = 30 km' }
        ]
      },
      {
        id: 'q2-9',
        prompt: '45 perc hányadrésze a 3 órának?',
        question: '45 perc hányadrésze a 3 órának?',
        options: ['1/4', '1/3', '1/6', '3/8'],
        correctAnswer: '1/4',
        explanation: '3 óra = 180 perc. 45 / 180 = 1/4 része.',
        breakdown: [
          { label: '3 óra percben', value: '3 · 60 = 180 perc' },
          { label: 'Hányados', value: '45 / 180 = 1/4' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Egy szám 2/3 részének a 3/4 része 15. Melyik ez a szám?',
        question: 'Egy szám 2/3 részének a 3/4 része 15. Melyik ez a szám?',
        options: ['30', '45', '20', '60'],
        correctAnswer: '30',
        explanation: '(2/3) · (3/4) = 6/12 = 1/2 része a számnak 15. A szám tehát 15 : (1/2) = 15 · 2 = 30.',
        breakdown: [
          { label: 'Kombinált arány', value: '(2/3) · (3/4) = 1/2' },
          { label: 'A keresett szám', value: '15 : (1/2) = 30' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett & Láncolt Szöveges Feladatok',
    subtitle: 'Többlépcsős maradékos feladatok, fordított gondolkodás és modellezés',
    range: '21 - 30. feladat',
    focus: 'Összetett láncolt feladatok & Modellezés',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Tamás elköltötte a zsebpénze 2/5 részét, majd a maradék 1/3-át fagylaltra. Így 1600 Ft-ja maradt. Mennyi pénze volt eredetileg?',
        question: 'Tamás elköltötte a zsebpénze 2/5 részét, majd a maradék 1/3-át fagylaltra. Így 1600 Ft-ja maradt. Mennyi pénze volt eredetileg?',
        options: ['4000 Ft', '3600 Ft', '5000 Ft', '4500 Ft'],
        correctAnswer: '4000 Ft',
        explanation: '1. lépés után maradt: 1 - 2/5 = 3/5. A maradék 1/3-ának elköltése után a megmaradt rész a 3/5-nek a 2/3 része: (3/5) · (2/3) = 2/5 része az eredetinek. Ha a pénz 2/5 része 1600 Ft, akkor az egész: 1600 : (2/5) = 1600 · 5/2 = 4000 Ft.',
        breakdown: [
          { label: '1. maradék', value: '1 - 2/5 = 3/5' },
          { label: 'Végső arány', value: '(3/5) · (2/3) = 2/5' },
          { label: 'Eredeti összeg', value: '1600 : (2/5) = 4000 Ft' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Egy hordó tele van borral. Kiengedik a bor 3/8-át, majd még 15 litert. Ekkor a hordóban még pontosan a feléig van bor. Hány literes a hordó?',
        question: 'Egy hordó tele van borral. Kiengedik a bor 3/8-át, majd még 15 litert. Ekkor a hordóban még pontosan a feléig van bor. Hány literes a hordó?',
        options: ['120 liter', '100 liter', '80 liter', '160 liter'],
        correctAnswer: '120 liter',
        explanation: 'Kezdetben 1 = 8/8 volt. Maradt 1/2 = 4/8. Tehát összesen kiengedtek 8/8 - 4/8 = 4/8 = 1/2 részt. Mivel először 3/8-at engedtek ki, a további 15 liter a 4/8 - 3/8 = 1/8 résznek felel meg! Ha az 1/8 rész 15 liter, a hordó: 15 · 8 = 120 liter.',
        breakdown: [
          { label: 'Összes kiengedett rész', value: '1 - 1/2 = 4/8' },
          { label: '15 liter aránya', value: '4/8 - 3/8 = 1/8' },
          { label: 'Hordó űrtartalma', value: '15 · 8 = 120 liter' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Egy autós az út első harmadát 60 km/h, a második felét más tempóban tette meg. Az út hányadrésze maradt a harmadik szakaszra?',
        question: 'Egy autós az út első harmadát 60 km/h, a második felét más tempóban tette meg. Az út hányadrésze maradt a harmadik szakaszra?',
        options: ['1/6', '1/5', '1/3', '1/12'],
        correctAnswer: '1/6',
        explanation: 'Megtett út aránya: 1/3 + 1/2 = 2/6 + 3/6 = 5/6. A maradék: 1 - 5/6 = 1/6 rész.',
        breakdown: [
          { label: '1. és 2. szakasz', value: '1/3 + 1/2 = 5/6' },
          { label: '3. szakasz aránya', value: '1 - 5/6 = 1/6' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Egy iskolai vetélkedőn 72 diák indult. Az 1. fordulóban kiesett a tanulók 1/4 része, a 2. fordulóban a bent maradók 1/3 része. Hány diák jutott be a döntőbe?',
        question: 'Egy iskolai vetélkedőn 72 diák indult. Az 1. fordulóban kiesett a tanulók 1/4 része, a 2. fordulóban a bent maradók 1/3 része. Hány diák jutott be a döntőbe?',
        options: ['36 diák', '24 diák', '48 diák', '30 diák'],
        correctAnswer: '36 diák',
        explanation: '1. forduló után maradt: 72 · (3/4) = 54 diák. 2. fordulóban kiesett az 1/3-uk, vagyis bent maradt a 2/3-uk: 54 · (2/3) = 36 diák.',
        breakdown: [
          { label: '1. forduló után', value: '72 · 3/4 = 54 fő' },
          { label: '2. forduló után (döntősök)', value: '54 · 2/3 = 36 fő' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Egy üzem dolgozóinak 4/7 része nő. Tudjuk, hogy 24 férfival kevesebb dolgozik az üzemben, mint nő. Hány dolgozója van az üzemnek összesen?',
        question: 'Egy üzem dolgozóinak 4/7 része nő. Tudjuk, hogy 24 férfival kevesebb dolgozik az üzemben, mint nő. Hány dolgozója van az üzemnek összesen?',
        options: ['168 fő', '140 fő', '196 fő', '112 fő'],
        correctAnswer: '168 fő',
        explanation: 'Nők: 4/7, Férfiak: 1 - 4/7 = 3/7. A különbség: 4/7 - 3/7 = 1/7 rész. Ez az 1/7 rész 24 fő. A teljes létszám: 24 · 7 = 168 fő.',
        breakdown: [
          { label: 'Férfiak aránya', value: '1 - 4/7 = 3/7' },
          { label: 'Különbség', value: '4/7 - 3/7 = 1/7 = 24 fő' },
          { label: 'Összlétszám', value: '24 · 7 = 168 fő' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Egy gyümölcsösben a fák 2/5 része almafa, 1/3 része szilvafa, a fennmaradó 32 fa pedig körtefa. Hány fa van összesen a gyümölcsösben?',
        question: 'Egy gyümölcsösben a fák 2/5 része almafa, 1/3 része szilvafa, a fennmaradó 32 fa pedig körtefa. Hány fa van összesen a gyümölcsösben?',
        options: ['120 fa', '150 fa', '90 fa', '180 fa'],
        correctAnswer: '120 fa',
        explanation: 'Alma + szilva = 2/5 + 1/3 = 6/15 + 5/15 = 11/15. A körtefa a maradék: 1 - 11/15 = 4/15 rész. Ha 4/15 rész 32 fa, akkor 1/15 rész = 32 : 4 = 8 fa. A teljes gyümölcsös: 8 · 15 = 120 fa.',
        breakdown: [
          { label: 'Alma + szilva', value: '2/5 + 1/3 = 11/15' },
          { label: 'Körte aránya', value: '1 - 11/15 = 4/15 = 32 fa' },
          { label: 'Összes fa', value: '(32 : 4) · 15 = 120 fa' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Melyik az a szám, amelynek a 4/5 részéből 12-t levonva 28-at kapunk?',
        question: 'Melyik az a szám, amelynek a 4/5 részéből 12-t levonva 28-at kapunk?',
        options: ['50', '45', '60', '40'],
        correctAnswer: '50',
        explanation: 'Jelölje a számot x. (4/5) · x - 12 = 28  =>  (4/5) · x = 40  =>  x = 40 : (4/5) = 40 · 5/4 = 50.',
        breakdown: [
          { label: 'Egyenlet felírása', value: '4/5 · x - 12 = 28' },
          { label: 'Rendezés', value: '4/5 · x = 40' },
          { label: 'x értéke', value: '40 · 5/4 = 50' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Egy kiránduláson a költségeket három barát osztotta szét: Ádám fizette az összeg 3/10-ét, Béla az 1/2-ét, Csaba pedig a maradék 3600 Ft-ot. Mennyibe került a kirándulás összesen?',
        question: 'Egy kiránduláson a költségeket három barát osztotta szét: Ádám fizette az összeg 3/10-ét, Béla az 1/2-ét, Csaba pedig a maradék 3600 Ft-ot. Mennyibe került a kirándulás összesen?',
        options: ['18 000 Ft', '20 000 Ft', '15 000 Ft', '24 000 Ft'],
        correctAnswer: '18 000 Ft',
        explanation: 'Ádám + Béla = 3/10 + 1/2 = 3/10 + 5/10 = 8/10 = 4/5 rész. Csaba a maradék 1/5 részt fizette. Ha az 1/5 rész 3600 Ft, a teljes összeg: 3600 · 5 = 18 000 Ft.',
        breakdown: [
          { label: 'Ádám + Béla', value: '3/10 + 5/10 = 8/10 = 4/5' },
          { label: 'Csaba része', value: '1 - 4/5 = 1/5 = 3600 Ft' },
          { label: 'Teljes összeg', value: '3600 · 5 = 18 000 Ft' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Egy téglalap szélessége 15 cm, ami a hosszúságának a 3/4 része. Mekkora a téglalap KERÜLETE?',
        question: 'Egy téglalap szélessége 15 cm, ami a hosszúságának a 3/4 része. Mekkora a téglalap KERÜLETE?',
        options: ['70 cm', '60 cm', '80 cm', '300 cm'],
        correctAnswer: '70 cm',
        explanation: 'A hosszúság: 15 : (3/4) = 15 · 4/3 = 20 cm. A kerület: K = 2 · (a + b) = 2 · (20 + 15) = 2 · 35 = 70 cm.',
        breakdown: [
          { label: 'Hosszúság', value: '15 : (3/4) = 20 cm' },
          { label: 'Kerület képlet', value: 'K = 2 · (20 + 15) = 70 cm' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Egy akvárium 3/5 részéig van vízzel. Ha hozzáöntünk még 8 litert, akkor a 3/4 részéig lesz tele. Mekkora az akvárium űrtartalma?',
        question: 'Egy akvárium 3/5 részéig van vízzel. Ha hozzáöntünk még 8 litert, akkor a 3/4 részéig lesz tele. Mekkora az akvárium űrtartalma?',
        options: ['53,3 liter', '53 liter', '50 liter', '60 liter'],
        correctAnswer: '53,3 liter',
        explanation: 'A szintemelkedés: 3/4 - 3/5 = 15/20 - 12/20 = 3/20 rész. Ez a 3/20 rész 8 liter. A teljes űrtartalom: 8 : (3/20) = 8 · 20/3 = 160/3 = 53,33 liter.',
        breakdown: [
          { label: '8 liter törtrésze', value: '3/4 - 3/5 = 3/20' },
          { label: 'Teljes űrtartalom', value: '8 : (3/20) = 160/3 = 53,3 liter' }
        ]
      }
    ]
  }
};

export const WordProblemsQuiz: React.FC<WordProblemsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      subject="math"
      grade="grade-7"
      topicId="racionalis-szamok-algebra"
      subtopicId="szoveges-feladatok"
      emoji="📖"
      topicBadge="7. Osztály • Matematika II. Témakör"
      badgeText="7. Osztály • Matematika II. Témakör"
      title="4. Szöveges feladatok Kvíz"
      cheatSheetTitle="Szöveges Feladatok Megoldási Szabálytár"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      themeColor="blue"
      hintText="💡 Törtrész kiszámításánál szorzunk, az egész visszakeresésénél osztunk, a maradék számításánál pedig 1-ből vonunk ki!"
      customGameModes={[
        {
          id: 'matcher',
          title: 'Kártyás Párosító',
          subtitle: 'Párosítsd a szöveges feladatokat a helyes végeredményekkel!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-blue-500" />,
          render: ({ level, onNextLevel, onOpenRules }) => (
            <WordProblemsMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Kategorizáld a feladatokat a műveleti típusuk vagy eredményük szerint!',
          badgeText: '10 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-500" />,
          render: ({ level, onNextLevel, onOpenRules }) => (
            <WordProblemsSorter
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
            />
          )
        }
      ]}
    />
  );
};
