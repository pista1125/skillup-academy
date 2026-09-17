import React from 'react';
import { QuizTemplate, Question, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { FractionsIntroMatcher } from './FractionsIntroMatcher';
import { FractionsIntroSorter } from './FractionsIntroSorter';
import { PieChart, Divide, Calculator, Sparkles, BookOpen } from 'lucide-react';

export interface FractionsIntroQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const questions: Question[] = [
  // ==========================================
  // --- 1. SZINT: TÖRT ALAPJAI ÉS FELÉPÍTÉSE ---
  // ==========================================
  {
    id: 'l1-q1',
    level: 1,
    prompt: 'Mit mutat meg a tört nevezője (alsó szám)?',
    options: [
      'Hány egyenlő részre osztottuk fel az 1 egészet',
      'Hány részt vettünk vagy színeztünk be',
      'Mennyivel kell megszorozni az egészet',
      'Hány egész számból áll a tört'
    ],
    correctAnswer: 0,
    explanation: 'A nevező megnevezi a törtet, és pontosan azt mutatja meg, hány egyenlő részre osztottuk fel az 1 egészet.',
    hint: 'Gondolj a nevére: „megnevezi”, hogy milyen részekről beszélünk (pl. harmadok, negyedek).',
    breakdown: [
      { label: 'Nevező (alul)', value: 'Egyenlő részek száma' }
    ]
  },
  {
    id: 'l1-q2',
    level: 1,
    prompt: 'Mit fejez ki a tört számlálója (felső szám)?',
    options: [
      'Hány darab egyenlő részt vettünk / választottunk ki',
      'Hány egyenlő részre osztottuk az egészet',
      'Milyen alakú az egész alakzat',
      'Hány egész van a törtben'
    ],
    correctAnswer: 0,
    explanation: 'A számláló „megszámlálja”, hogy az egyenlő részekből hányat vettünk figyelembe.',
    hint: 'A felső szám számlálja meg a kiválasztott szeleteket.',
    breakdown: [
      { label: 'Számláló (felül)', value: 'Kiválasztott részek száma' }
    ]
  },
  {
    id: 'l1-q3',
    level: 1,
    prompt: 'Milyen műveletnek felel meg a törtvonal?',
    options: [
      'Osztásnak (:)',
      'Szorzásnak (·)',
      'Összeadásnak (+)',
      'Kivonásnak (-)'
    ],
    correctAnswer: 0,
    explanation: 'A törtvonal az osztás műveletét jelenti. A számlálót osztjuk a nevezővel: a/b = a : b.',
    hint: 'A törtvonal két szám közötti osztást jelöl.',
    breakdown: [
      { label: 'Törtvonal', value: 'a / b = a : b (osztás)' }
    ]
  },
  {
    id: 'l1-q4',
    level: 1,
    prompt: 'Milyen szám NEM állhat soha egy tört nevezőjében?',
    options: ['0', '1', '2', '100'],
    correctAnswer: 0,
    explanation: 'A nevezőben nem állhat 0, mert nullával nem lehet osztani, és semmit sem lehet 0 egyenlő részre osztani.',
    hint: 'Nullával való osztás a matematikában értelmetlen és tilos.',
    breakdown: [
      { label: 'Aranyszabály', value: 'Nevező ≠ 0' }
    ]
  },
  {
    id: 'l1-q5',
    level: 1,
    prompt: 'Hogyan nevezzük a 3/4 törtet magyarul?',
    options: ['Háromnegyed', 'Négyharmad', 'Három és négy', 'Negyedhárom'],
    correctAnswer: 0,
    explanation: '3/4 = háromnegyed (4 egyenlő részből 3 rész).',
    hint: 'Először a számlálót olvassuk (három), majd a nevező toldalékos alakját (negyed).',
    breakdown: [
      { label: '3 / 4', value: 'háromnegyed' }
    ]
  },
  {
    id: 'l1-q6',
    level: 1,
    prompt: 'Egy pizzát 8 egyenlő szeletre vágtunk, és megettünk belőle 3 szeletet. A pizza mekkora részét ettük meg?',
    options: ['3/8', '8/3', '3/5', '5/8'],
    correctAnswer: 0,
    explanation: 'Az egész pizza 8 egyenlő részből áll (nevező = 8), és 3 szeletet ettünk meg (számláló = 3), így 3/8 részt ettünk meg.',
    hint: 'Az összes szelet száma kerül alulra, az elfogyasztott szeletek száma felülre.',
    breakdown: [
      { label: 'Összes szelet', value: '8 (nevező)' },
      { label: 'Megevett szelet', value: '3 (számláló)' },
      { label: 'Eredmény', value: '3/8' }
    ]
  },
  {
    id: 'l1-q7',
    level: 1,
    prompt: 'Hogyan nevezzük azokat a törteket, amelyeknek a számlálója 1 (pl. 1/2, 1/3, 1/4)?',
    options: ['Egységtörtek', 'Áltörtek', 'Egész törtek', 'Tizedestörtek'],
    correctAnswer: 0,
    explanation: 'Az 1 számlálójú törteket egységtörteknek nevezzük, mert pontosan 1 egységnyi részt jelölnek az egyenlő részekből.',
    hint: 'A nevük az „egy”-ből és „egység”-ből ered.',
    breakdown: [
      { label: '1 / n', value: 'Egységtört' }
    ]
  },
  {
    id: 'l1-q8',
    level: 1,
    prompt: 'Egy csokoládét 6 egyenlő kockára törünk. Mennyi 1 kocka értéke az egész csokihoz képest?',
    options: ['1/6', '6/1', '1/5', '5/6'],
    correctAnswer: 0,
    explanation: '1 kocka a 6 egyenlő részből pontosan az 1/6 (egyhatod) részt teszi ki.',
    hint: '1 részt veszünk a 6 egyenlő részből.',
    breakdown: [
      { label: '1 kocka a 6-ból', value: '1/6' }
    ]
  },
  {
    id: 'l1-q9',
    level: 1,
    prompt: 'Ha egy tortát 4 egyenlő részre vágunk, és mind a 4 szeletet megesszük (4/4), mekkora részét ettük meg a tortának?',
    options: ['1 egész tortát', 'Fél tortát', '4 egész tortát', '0 tortát'],
    correctAnswer: 0,
    explanation: '4/4 = 4 : 4 = 1 egész. Ha minden szeletet megeszünk, az egész tortát elfogyasztottuk.',
    hint: 'Ha a számláló megegyezik a nevezővel, a tört értéke pontosan 1 egész.',
    breakdown: [
      { label: '4 / 4', value: '4 : 4 = 1 egész' }
    ]
  },
  {
    id: 'l1-q10',
    level: 1,
    prompt: 'Melyik feltétel kötelező ahhoz, hogy egy alakzat részeit törttel fejezhessük ki?',
    options: [
      'Minden résznek pontosan egyenlő nagyságúnak kell lennie',
      'A részeknek különböző színűeknek kell lenniük',
      'Csak kör alakú formát lehet felosztani',
      'Legfeljebb 4 részre szabad osztani'
    ],
    correctAnswer: 0,
    explanation: 'Törtről csak akkor beszélhetünk, ha az egész felosztása során minden egyes rész szigorúan egyforma méretű.',
    hint: 'Egyenlőtlen darabok esetén nem használhatók a közönséges törtek.',
    breakdown: [
      { label: 'Alapfeltétel', value: 'Szigorúan egyenlő részek' }
    ]
  },

  // ==========================================
  // --- 2. SZINT: TÖRTFAJTÁK ÉS ÖSSZEFÜGGÉSEK ---
  // ==========================================
  {
    id: 'l2-q1',
    level: 2,
    prompt: 'Melyik állítás igaz a valódi törtekre?',
    options: [
      'A számláló kisebb a nevezőnél (értéke < 1)',
      'A számláló nagyobb a nevezőnél (értéke > 1)',
      'A számláló és nevező egyenlő (értéke = 1)',
      'A nevezője mindig 10'
    ],
    correctAnswer: 0,
    explanation: 'A valódi tört olyan tört, amelynek számlálója kisebb a nevezőnél, így az értéke 1-nél kisebb (pl. 2/3, 5/8).',
    hint: 'A „valódi tört” kevesebb, mint 1 teljes egész.',
    breakdown: [
      { label: 'Valódi tört', value: 'Számláló < Nevező (< 1)' }
    ]
  },
  {
    id: 'l2-q2',
    level: 2,
    prompt: 'Melyik az alábbiak közül ÁLTÖRT (egységnél nagyobb tört)?',
    options: ['7/4', '3/4', '5/6', '1/2'],
    correctAnswer: 0,
    explanation: 'A 7/4 áltört, mert a számlálója (7) nagyobb a nevezőjénél (4), így értéke több, mint 1 egész (1 és 3/4).',
    hint: 'Keresd azt a törtet, ahol a felső szám nagyobb az alsónál!',
    breakdown: [
      { label: '7 / 4', value: '7 > 4 → Áltört (> 1)' }
    ]
  },
  {
    id: 'l2-q3',
    level: 2,
    prompt: 'Melyik tört értéke egyenlő pontosan 1 egésszel?',
    options: ['9/9', '8/9', '9/8', '1/9'],
    correctAnswer: 0,
    explanation: 'Ha a számláló és a nevező egyenlő (9/9), az osztás eredménye 9 : 9 = 1 egész.',
    hint: 'a/a = 1 minden nullától különböző számra.',
    breakdown: [
      { label: '9 / 9', value: '9 : 9 = 1' }
    ]
  },
  {
    id: 'l2-q4',
    level: 2,
    prompt: 'Melyik relációs jel illik az 1/3 és az 1/5 egységtörtek közé: 1/3 ___ 1/5?',
    options: ['>', '<', '=', '≤'],
    correctAnswer: 0,
    explanation: '1/3 > 1/5. Egységtörteknél minél KISEBB a nevező, annál NAGYOBB a tört (a harmad szelet nagyobb az ötöd szeletnél)!',
    hint: 'Ha 3 felé vágod a pizzát, nagyobb szeletet kapsz, mintha 5 felé vágnád.',
    breakdown: [
      { label: '1/3 vs 1/5', value: '1/3 > 1/5 (Kisebb nevező = nagyobb szelet)' }
    ]
  },
  {
    id: 'l2-q5',
    level: 2,
    prompt: 'Írd fel osztási műveletként a 12/3 törtet, és add meg az értékét!',
    options: [
      '12 : 3 = 4',
      '3 : 12 = 0,25',
      '12 · 3 = 36',
      '12 - 3 = 9'
    ],
    correctAnswer: 0,
    explanation: '12/3 = 12 : 3 = 4 egész.',
    hint: 'A számlálót kell osztani a nevezővel.',
    breakdown: [
      { label: '12 / 3', value: '12 : 3 = 4' }
    ]
  },
  {
    id: 'l2-q6',
    level: 2,
    prompt: 'Melyik tört fejezi ki a FÉL (1/2) pontos értékét?',
    options: ['4/8', '3/8', '5/8', '2/8'],
    correctAnswer: 0,
    explanation: '4/8 = 1/2, mert 4 a 8-nak pontosan a fele.',
    hint: 'Keresd azt a törtet, ahol a számláló a nevező fele!',
    breakdown: [
      { label: '4 / 8', value: '4 : 8 = 1/2 (fél)' }
    ]
  },
  {
    id: 'l2-q7',
    level: 2,
    prompt: 'Egy dobozban 10 golyó van, ebből 6 piros. A golyók mekkora része piros?',
    options: ['6/10', '10/6', '4/10', '6/4'],
    correctAnswer: 0,
    explanation: '10 az összes golyó (nevező = 10), 6 a piros (számláló = 6), tehát 6/10 részük piros.',
    hint: 'Kedvező részek száma / összes részek száma.',
    breakdown: [
      { label: 'Piros / Összes', value: '6 / 10' }
    ]
  },
  {
    id: 'l2-q8',
    level: 2,
    prompt: 'Melyik tört értéke 0?',
    options: ['0/7', '7/0', '7/7', '0/0'],
    correctAnswer: 0,
    explanation: '0/7 = 0 : 7 = 0. Ha 0 részt veszünk a 7-ből, annak értéke 0. (A 7/0 és 0/0 nem értelmezhető!)',
    hint: 'Nullát bármilyen nem nulla számmal osztva nullát kapunk.',
    breakdown: [
      { label: '0 / 7', value: '0 : 7 = 0' }
    ]
  },
  {
    id: 'l2-q9',
    level: 2,
    prompt: 'Hány negyedből áll 2 egész pizza?',
    options: [
      '8 negyedből (8/4)',
      '4 negyedből (4/4)',
      '6 negyedből (6/4)',
      '2 negyedből (2/4)'
    ],
    correctAnswer: 0,
    explanation: '1 egész pizza 4 negyedből áll, így 2 egész pizza 2 · 4 = 8 negyedből (8/4 = 2).',
    hint: '2 = 2 · 4 / 4 = 8/4.',
    breakdown: [
      { label: '1 egész', value: '4/4' },
      { label: '2 egész', value: '8/4' }
    ]
  },
  {
    id: 'l2-q10',
    level: 2,
    prompt: 'Mi az 5/2 áltört vegyes szám alakja?',
    options: [
      '2 egész és 1/2',
      '1 egész és 1/2',
      '3 egész és 1/2',
      '5 egész és 1/2'
    ],
    correctAnswer: 0,
    explanation: '5 : 2 = 2, maradék 1. Tehát 5/2 = 2 egész és 1/2 (2 1/2).',
    hint: '5-ben a 2 megvan 2-szer, a maradék 1 a számlálóba kerül.',
    breakdown: [
      { label: '5 : 2', value: '2 egész, maradék 1 → 2 1/2' }
    ]
  },

  // ==========================================
  // --- 3. SZINT: TÖRTRÉSZ-SZÁMÍTÁS ÉS SZÖVEGES FELADATOK ---
  // ==========================================
  {
    id: 'l3-q1',
    level: 3,
    prompt: 'Mennyi 32-nek a 3/4 része?',
    options: ['24', '18', '20', '28'],
    correctAnswer: 0,
    explanation: '1. lépés: 32 : 4 = 8 (1 negyed rész). 2. lépés: 8 · 3 = 24 (3 negyed rész).',
    hint: 'Oszd el 4-gyel, majd szorozd meg 3-mal!',
    breakdown: [
      { label: '1/4 rész', value: '32 : 4 = 8' },
      { label: '3/4 rész', value: '8 · 3 = 24' }
    ]
  },
  {
    id: 'l3-q2',
    level: 3,
    prompt: 'Mennyi 60 percnek a 2/5 része?',
    options: ['24 perc', '20 perc', '30 perc', '12 perc'],
    correctAnswer: 0,
    explanation: '1. lépés: 60 : 5 = 12 perc (1 ötöd). 2. lépés: 12 · 2 = 24 perc (2 ötöd).',
    hint: '60 osztva 5-tel, majd szorozva 2-vel.',
    breakdown: [
      { label: '1/5 rész', value: '60 : 5 = 12 perc' },
      { label: '2/5 rész', value: '12 · 2 = 24 perc' }
    ]
  },
  {
    id: 'l3-q3',
    level: 3,
    prompt: 'Egy 28 fős osztály 4/7 része lány. Hány lány jár az osztályba?',
    options: ['16 lány', '14 lány', '12 lány', '18 lány'],
    correctAnswer: 0,
    explanation: '1. lépés: 28 : 7 = 4 fő (1 heted). 2. lépés: 4 · 4 = 16 lány (4 heted).',
    hint: '28 osztva 7-tel, szorozva 4-gyel.',
    breakdown: [
      { label: '1/7 rész', value: '28 : 7 = 4 fő' },
      { label: '4/7 rész', value: '4 · 4 = 16 lány' }
    ]
  },
  {
    id: 'l3-q4',
    level: 3,
    prompt: 'Egy 28 fős osztály 4/7 része lány. Hány FIÚ jár az osztályba?',
    options: ['12 fiú', '16 fiú', '14 fiú', '10 fiú'],
    correctAnswer: 0,
    explanation: 'Ha 16 lány van (28 · 4/7 = 16), akkor a fiúk száma: 28 - 16 = 12 fiú (vagy a maradék 3/7 rész: 4 · 3 = 12).',
    hint: 'Vond ki az összes tanulóból a lányok számát!',
    breakdown: [
      { label: 'Lányok', value: '16 fő' },
      { label: 'Fiúk', value: '28 - 16 = 12 fő' }
    ]
  },
  {
    id: 'l3-q5',
    level: 3,
    prompt: 'Petinek 1200 Ft zsebpénze volt. Elköltötte a 2/3 részét. Hány forintja MARADT?',
    options: ['400 Ft', '800 Ft', '600 Ft', '300 Ft'],
    correctAnswer: 0,
    explanation: '1200 : 3 = 400 Ft (1 harmad). Elköltött 2/3-ot (800 Ft-ot), így maradt 1/3 része, azaz 400 Ft.',
    hint: 'A maradt pénz az 1/3 rész (1200 : 3 = 400 Ft).',
    breakdown: [
      { label: 'Elköltött (2/3)', value: '800 Ft' },
      { label: 'Maradt (1/3)', value: '1200 - 800 = 400 Ft' }
    ]
  },
  {
    id: 'l3-q6',
    level: 3,
    prompt: 'Melyik szám az, amelynek az 1/4 része 15?',
    options: ['60', '45', '30', '75'],
    correctAnswer: 0,
    explanation: 'Ha 1 negyed rész = 15, akkor a teljes 4 negyed rész (az egész szám): 15 · 4 = 60.',
    hint: 'Fordított feladat: ha 1 rész 15, akkor 4 rész 15 · 4.',
    breakdown: [
      { label: '1/4 rész', value: '15' },
      { label: 'Teljes egész (4/4)', value: '15 · 4 = 60' }
    ]
  },
  {
    id: 'l3-q7',
    level: 3,
    prompt: 'Melyik szám az, amelynek a 2/3 része 18?',
    options: ['27', '24', '36', '54'],
    correctAnswer: 0,
    explanation: 'Ha 2 harmad rész = 18, akkor 1 harmad rész = 18 : 2 = 9. Az egész szám (3 harmad): 9 · 3 = 27.',
    hint: 'Először oszd el 2-vel (megtudod az 1 harmadot), majd szorozd meg 3-mal!',
    breakdown: [
      { label: '1/3 rész', value: '18 : 2 = 9' },
      { label: 'Egész (3/3)', value: '9 · 3 = 27' }
    ]
  },
  {
    id: 'l3-q8',
    level: 3,
    prompt: 'Egy 200 oldalas könyvből Anna hétfőn elolvasta az 1/5 részét, kedden a 2/5 részét. Hány oldalt olvasott el összesen a két nap alatt?',
    options: ['120 oldalt', '100 oldalt', '80 oldalt', '140 oldalt'],
    correctAnswer: 0,
    explanation: 'Összesen 1/5 + 2/5 = 3/5 részt olvasott el. 200 : 5 = 40 oldal (1/5), 40 · 3 = 120 oldal.',
    hint: 'Ad össze a törtrészeket: 1/5 + 2/5 = 3/5, majd számold ki a 200 oldal 3/5-ét.',
    breakdown: [
      { label: 'Összes törtrész', value: '3/5 rész' },
      { label: '1/5 rész', value: '200 : 5 = 40 oldal' },
      { label: '3/5 rész', value: '40 · 3 = 120 oldal' }
    ]
  },
  {
    id: 'l3-q9',
    level: 3,
    prompt: 'Egy túrázó a 24 km-es táv 3/8 részét tette meg gyalog, a többit kerékpárral. Hány kilométert tett meg KERÉKPÁRRAL?',
    options: ['15 km', '9 km', '12 km', '18 km'],
    correctAnswer: 0,
    explanation: '1 nyolcad = 24 : 8 = 3 km. Gyalog ment 3 · 3 = 9 km-t. Kerékpárral ment 24 - 9 = 15 km-t (vagy 5/8 részt: 3 · 5 = 15 km).',
    hint: 'A kerékpáros táv az 5/8 rész (24 : 8 · 5 = 15 km).',
    breakdown: [
      { label: 'Gyalog (3/8)', value: '9 km' },
      { label: 'Kerékpárral (5/8)', value: '15 km' }
    ]
  },
  {
    id: 'l3-q10',
    level: 3,
    prompt: 'Egy dobozban piros és kék golyók vannak. A golyók 3/5 része piros, és pontosan 18 darab piros golyó van. Hány golyó van összesen a dobozban?',
    options: ['30 golyó', '24 golyó', '36 golyó', '27 golyó'],
    correctAnswer: 0,
    explanation: '3 ötöd rész = 18 golyó. 1 ötöd rész = 18 : 3 = 6 golyó. Az összes golyó (5 ötöd): 6 · 5 = 30 golyó.',
    hint: '18 osztva 3-mal, majd szorozva 5-tel.',
    breakdown: [
      { label: '1/5 rész', value: '18 : 3 = 6 golyó' },
      { label: 'Összesen (5/5)', value: '6 · 5 = 30 golyó' }
    ]
  }
];

const levelConfigs: LevelConfig[] = [
  {
    level: 1,
    title: '1. Szint: Tört alapjai és felépítése',
    subtitle: 'Számláló, nevező, törtvonal, egységtörtek és szemléltetés',
    range: 'Alapfogalmak',
    focus: 'Tört fogalma, számláló, nevező, törtvonal mint osztás, nevező ≠ 0',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
    badgeBorder: 'border-amber-300 dark:border-amber-800',
    badgeText: 'text-amber-800 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    questions: questions.filter(q => q.level === 1)
  },
  {
    level: 2,
    title: '2. Szint: Törtfajták és osztás kapcsolata',
    subtitle: 'Valódi tört, áltört, 1 egész, tört mint osztás, összehasonlítás',
    range: 'Törtfajták',
    focus: 'Valódi tört (< 1), egész tört (= 1), áltört (> 1), egységtörtek nagysága',
    badgeBg: 'bg-orange-100 dark:bg-orange-950/60',
    badgeBorder: 'border-orange-300 dark:border-orange-800',
    badgeText: 'text-orange-800 dark:text-orange-300',
    accentGradient: 'from-orange-500 to-amber-600',
    questions: questions.filter(q => q.level === 2)
  },
  {
    level: 3,
    title: '3. Szint: Törtrész-számítás és szöveges feladatok',
    subtitle: 'Mennyiségek törtrésze, fordított feladatok és gyakorlati példák',
    range: 'Törtrész számítás',
    focus: 'Oszd a nevezővel, szorozd a számlálóval; összetett szöveges feladatok',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-300 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    questions: questions.filter(q => q.level === 3)
  }
];

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'parts',
    title: 'A tört felépítése',
    icon: <Divide className="w-5 h-5 text-orange-500" />,
    formula: 'Számláló / Nevező (Nevező ≠ 0)',
    note: 'Számláló (felső): vett részek. Törtvonal: osztás (:). Nevező (alsó): hány egyenlő részre osztottuk az egészet.'
  },
  {
    id: 'types',
    title: 'Törtfajták 1 egészhez képest',
    icon: <PieChart className="w-5 h-5 text-amber-500" />,
    formula: 'Valódi (< 1) • Egész (= 1) • Áltört (> 1)',
    note: 'Valódi tört: számláló < nevező (pl. 3/4). Egész: számláló = nevező (pl. 4/4 = 1). Áltört: számláló > nevező (pl. 5/4).'
  },
  {
    id: 'unit',
    title: 'Egységtörtek',
    icon: <Sparkles className="w-5 h-5 text-cyan-500" />,
    formula: '1 / n (Számláló = 1)',
    note: 'Nagyobb nevező = KISEBB szelet! 1/2 > 1/3 > 1/4 > 1/8 > 1/100.'
  },
  {
    id: 'calc',
    title: 'Törtrész kiszámítása',
    icon: <Calculator className="w-5 h-5 text-emerald-500" />,
    formula: 'Mennyiség : Nevező · Számláló',
    note: 'Pl. 24-nek a 3/4 része: 24 : 4 = 6 (1 rész), majd 6 · 3 = 18 (3 rész).'
  }
];

export const FractionsIntroQuiz: React.FC<FractionsIntroQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-fractions-intro-quiz"
      title="Ismerkedés a törtekkel Kvíz"
      subtitle="Gyakorold a tört fogalmát, a számláló és nevező szerepét, a törtfajtákat és a törtrész-számítást 3 nehézségi szinten!"
      badge="🍕 5. Osztály • II. Törtek"
      themeColor="amber"
      levels={levelConfigs}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító játék',
          subtitle: 'Találd meg az összetartozó kártyapárokat!',
          description: 'Párosítsd a törtalakokat, osztásokat és mennyiségi törtrészeket 3 nehézségi szinten.',
          badgeText: 'Párosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <FractionsIntroMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító játék',
          subtitle: 'Válogasd szét a törteket kategóriák szerint!',
          description: 'Rendezd a törteket valódi/egész/áltört vagy a félhez való viszonyuk alapján!',
          badgeText: 'Csoportosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <FractionsIntroSorter
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};

export default FractionsIntroQuiz;
