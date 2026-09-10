import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { FractionsDecimalsMatcher } from './FractionsDecimalsMatcher';
import { FractionsDecimalsSorter } from './FractionsDecimalsSorter';
import {
  Sparkles,
  Layers,
  Scale,
  Calculator,
  Zap,
  LayoutGrid,
  ArrowRightLeft,
  Binary,
  Percent,
  Divide
} from 'lucide-react';

interface FractionsDecimalsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A tört felépítése & Fajtái',
    icon: <Divide className="w-4 h-4 text-purple-600" />,
    formula: 'a / b = a : b  (b ≠ 0)',
    note: 'Valódi tört: |a| < |b| (értéke < 1). Áltört: |a| ≥ |b|. Vegyes szám: 2 3/4 = 11/4, negatívnál: -2 3/4 = -11/4.'
  },
  {
    id: 'c2',
    title: 'Bővítés és Egyszerűsítés',
    icon: <Layers className="w-4 h-4 text-indigo-600" />,
    formula: '(a · k)/(b · k) = a/b,  (a : m)/(b : m) = a/b',
    note: 'A tört értéke változatlan marad. Legegyszerűbb alakban a számláló és a nevező relatív prímek: lnko(a, b) = 1.'
  },
  {
    id: 'c3',
    title: 'Véges tizedestörtek',
    icon: <Sparkles className="w-4 h-4 text-emerald-600" />,
    formula: 'Nevező prímfelbontása: CSAK 2 és/vagy 5',
    note: 'Pl. 1/2 = 0,5, 1/4 = 0,25, 3/8 = 0,375, 7/20 = 0,35. Ha más prím is van a nevezőben (3, 7, 11), akkor végtelen szakaszos!'
  },
  {
    id: 'c4',
    title: 'Szakaszos tizedestörtek',
    icon: <Zap className="w-4 h-4 text-amber-600" />,
    formula: '1/3 = 0,3̇,  2/3 = 0,6̇,  1/6 = 0,16̇,  4/11 = 0,3̇6̇',
    note: 'Tiszta szakaszos: a vessző után azonnal ismétlődik. Vegyes szakaszos: van nem ismétlődő előtag is (pl. 0,166...).'
  },
  {
    id: 'c5',
    title: 'Tizedestört átírása törtté',
    icon: <Calculator className="w-4 h-4 text-blue-600" />,
    formula: '0,6 = 6/10 = 3/5,  0,35 = 35/100 = 7/20',
    note: 'A helyiérték szerinti 10-hatvány a nevező, majd elosztjuk a számlálót és nevezőt a legnagyobb közös osztóval (LNKO).'
  },
  {
    id: 'c6',
    title: 'Törtek összehasonlítása',
    icon: <Scale className="w-4 h-4 text-rose-600" />,
    formula: '3/4 vs 5/6 ⟹ 9/12 < 10/12 ⟹ 3/4 < 5/6',
    note: 'Közös nevezőre hozzuk a törteket, és a számlálókat hasonlítjuk össze. Negatívoknál a balra lévő a kisebb: -3/4 < -1/2!'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Egyszerű Átváltások',
    subtitle: 'Tört fogalma, bővítés, egyszerűsítés, alap tizedestörtek és vegyes számok',
    range: '1 - 10. feladat',
    focus: 'Alapok & Átváltások',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q1',
        title: 'Mit fejez ki az a/b törtben a nevező (b)?',
        options: [
          'Hány egyenlő részre osztottuk az egészet',
          'Hány részt vettünk az egészből',
          'A tört és az 1 szorzatát',
          'A számláló előjelét'
        ],
        correctAnswer: 'Hány egyenlő részre osztottuk az egészet',
        hint: 'A nevező megnevezi a részek méretét (pl. harmadok, negyedek, ötödök).',
        explanation: 'A tört felírásában a nevező (alsó szám) mutatja meg, hogy az egészet hány egyenlő részre osztottuk fel, míg a számláló (felső szám) azt, hogy ezekből a részekből hányat vettünk.',
        steps: [
          { label: 'Törtvonal felett', value: 'Számláló (a): kiválasztott részek száma' },
          { label: 'Törtvonal alatt', value: 'Nevező (b): egyenlő részek száma (b ≠ 0)' }
        ]
      },
      {
        id: 'q2',
        title: 'Melyik törtet kapjuk, ha a 3/5 törtet bővítjük 4-gyel?',
        options: ['12/20', '7/9', '12/5', '3/20'],
        correctAnswer: '12/20',
        hint: 'Bővítésnél a számlálót és a nevezőt is meg kell szorozni ugyanazzal a számmal.',
        explanation: 'A bővítés során a számlálót és a nevezőt is megszorozzuk 4-gyel: (3 · 4) / (5 · 4) = 12/20. A tört értéke ezzel nem változik.',
        steps: [
          { label: 'Számláló szorzása', value: '3 · 4 = 12' },
          { label: 'Nevező szorzása', value: '5 · 4 = 20' },
          { label: 'Eredmény', value: '12/20' }
        ]
      },
      {
        id: 'q3',
        title: 'Melyik a 18/24 tört tovább nem egyszerűsíthető alakja?',
        options: ['3/4', '9/12', '6/8', '2/3'],
        correctAnswer: '3/4',
        hint: 'Keresd meg 18 és 24 legnagyobb közös osztóját (LNKO = 6).',
        explanation: '18 és 24 legnagyobb közös osztója a 6. Mindkettőt elosztva 6-tal: 18 : 6 = 3 és 24 : 6 = 4, így a legegyszerűbb alak 3/4.',
        steps: [
          { label: 'LNKO(18, 24)', value: '6' },
          { label: 'Egyszerűsítés', value: '(18 : 6) / (24 : 6) = 3/4' }
        ]
      },
      {
        id: 'q4',
        title: 'Mennyi a 7/10 tört értéke tizedestört alakban?',
        options: ['0,7', '0,07', '7,0', '0,77'],
        correctAnswer: '0,7',
        hint: 'A 10-es nevező 1 tizedesjegyet jelent.',
        explanation: 'A 7/10 felírása tizedestörtként hét tized, azaz 0,7.',
        steps: [
          { label: 'Helyiérték', value: 'Tizedek helye: 1 tizedesjegy' },
          { label: 'Tizedes alak', value: '0,7' }
        ]
      },
      {
        id: 'q5',
        title: 'Mennyi a 0,25 tizedestört legegyszerűbb tört alakja?',
        options: ['1/4', '25/10', '1/5', '2/5'],
        correctAnswer: '1/4',
        hint: '0,25 = 25/100, egyszerűsíts 25-tel!',
        explanation: '0,25 = 25/100. Mind a számlálót, mind a nevezőt elosztva 25-tel a legegyszerűbb alak 1/4.',
        steps: [
          { label: 'Tört alak', value: '25/100' },
          { label: 'Egyszerűsítés 25-tel', value: '(25 : 25) / (100 : 25) = 1/4' }
        ]
      },
      {
        id: 'q6',
        title: 'Hogyan írható fel a 3 és 1/2 vegyes szám áltörtként?',
        options: ['7/2', '5/2', '6/2', '8/2'],
        correctAnswer: '7/2',
        hint: 'Szorozd meg az egészet a nevezővel, és add hozzá a számlálót: (3 · 2 + 1) / 2.',
        explanation: '3 egész az 3 · 2 = 6 ketted, hozzáadva a meglévő 1 kettedet: (3 · 2 + 1) / 2 = 7/2.',
        steps: [
          { label: 'Egészek kettedekben', value: '3 · 2 = 6' },
          { label: 'Számláló hozzáadása', value: '6 + 1 = 7' },
          { label: 'Áltört alak', value: '7/2' }
        ]
      },
      {
        id: 'q7',
        title: 'Hogyan írható fel a 11/4 áltört vegyes számként?',
        options: ['2 és 3/4', '3 és 1/4', '2 és 1/4', '1 és 7/4'],
        correctAnswer: '2 és 3/4',
        hint: 'Oszd el a 11-et 4-gyel: 11 : 4 = 2, a maradék 3.',
        explanation: '11-ben a 4 megvan 2-szer, és a maradék 3. Ezért a vegyes szám alak 2 egész 3/4.',
        steps: [
          { label: 'Egész hányados', value: '11 : 4 = 2 (egész)' },
          { label: 'Maradék', value: '11 - (2 · 4) = 3 (negyed)' },
          { label: 'Vegyes szám', value: '2 és 3/4' }
        ]
      },
      {
        id: 'q8',
        title: 'Melyik az alábbiak közül valódi tört?',
        options: ['4/7', '7/4', '5/5', '9/2'],
        correctAnswer: '4/7',
        hint: 'Valódi tört esetén a számláló abszolútértéke kisebb a nevezőjénél (|a| < |b|).',
        explanation: 'A 4/7 törtben a számláló (4) kisebb a nevezőnél (7), ezért valódi tört (értéke 0 és 1 közé esik). A 7/4 és 9/2 áltört, az 5/5 pedig egy egész.',
        steps: [
          { label: 'Számláló és nevező', value: '4 < 7' },
          { label: 'Típus', value: 'Valódi tört (< 1)' }
        ]
      },
      {
        id: 'q9',
        title: 'Miért nem lehet egy tört nevezője 0 (nulla)?',
        options: [
          'Mert a nullával való osztás nincs értelmezve a matematikában',
          'Mert a tört értéke akkor automatikusan nulla lenne',
          'Mert a nulla nem természetes szám',
          'Mert a törtvonal csak szorzást jelenthet'
        ],
        correctAnswer: 'Mert a nullával való osztás nincs értelmezve a matematikában',
        hint: 'A törtvonal osztást jelent: a / 0 = a : 0 lenne.',
        explanation: 'A törtvonal osztást jelöl: a/b = a : b. Mivel nullával nem oszthatunk, ezért a nevező soha nem veheti fel a 0 értéket.',
        steps: [
          { label: 'Törtvonal jelentése', value: 'a / b = a : b' },
          { label: 'Feltétel', value: 'b ≠ 0 (értelmezési tartomány)' }
        ]
      },
      {
        id: 'q10',
        title: 'Melyik relációs jel illik a pontozott helyre: 5/9 ... 7/9?',
        options: ['<', '>', '=', '≤'],
        correctAnswer: '<',
        hint: 'Azonos nevezőjű törtek közül az a nagyobb, amelyiknek a számlálója nagyobb.',
        explanation: 'Mivel a két tört nevezője megegyezik (9), a számlálókat hasonlítjuk össze: 5 < 7, így 5/9 < 7/9.',
        steps: [
          { label: 'Közös nevező', value: '9' },
          { label: 'Számlálók összevetése', value: '5 < 7 ⟹ 5/9 < 7/9' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Véges és Szakaszos Tizedestörtek, Összehasonlítás',
    subtitle: 'Végesség feltétele, periodikus tizedesek, közös nevező és negatív törtek',
    range: '11 - 20. feladat',
    focus: 'Gyakorlat & Alkalmazás',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'q11',
        title: 'Melyik törtből LESZ VÉGES tizedestört az alábbiak közül?',
        options: ['3/8', '2/9', '5/6', '4/15'],
        correctAnswer: '3/8',
        hint: 'Egy egyszerűsített tört akkor véges tizedestört, ha a nevező prímfelbontásában csak 2 és/vagy 5 szerepel.',
        explanation: 'A 8 prímfelbontása: 8 = 2³, kizárólag a 2 szerepel benne, így 3/8 = 0,375 (véges). A többi nevezőben (9 = 3², 6 = 2·3, 15 = 3·5) ott van a 3, így azok végtelen szakaszosak.',
        steps: [
          { label: '8 felbontása', value: '8 = 2 · 2 · 2 = 2³ (csak 2-es!)' },
          { label: 'Tizedes alak', value: '3 : 8 = 0,375 (Véges)' }
        ]
      },
      {
        id: 'q12',
        title: 'Mennyi a 2/3 tört tizedestört alakja?',
        options: ['0,666... (0,6̇)', '0,6', '0,67', '0,23'],
        correctAnswer: '0,666... (0,6̇)',
        hint: '2-ben a 3 nincs meg egészként: 20 : 3 = 6, marad a 2, ami végtelenül ismétlődik.',
        explanation: '2 : 3 = 0,6666... = 0,6̇ (tiszta szakaszos tizedestört, a 6-os számjegy a végtelenségig ismétlődik).',
        steps: [
          { label: 'Írásbeli osztás', value: '2,0 : 3 = 0,6 maradt 2' },
          { label: 'Ismétlődő maradék', value: '20 : 3 = 6 maradt 2 ⟹ szakasz: 6' },
          { label: 'Jelölés', value: '0,6̇' }
        ]
      },
      {
        id: 'q13',
        title: 'Melyik a helyes reláció a 3/4 és az 5/6 törtek között?',
        options: ['3/4 < 5/6', '3/4 > 5/6', '3/4 = 5/6', 'Nem hasonlíthatóak össze'],
        correctAnswer: '3/4 < 5/6',
        hint: 'Hozd közös nevezőre őket! 4 és 6 legkisebb közös többszöröse 12.',
        explanation: '3/4 = 9/12 és 5/6 = 10/12. Mivel 9/12 < 10/12, ezért 3/4 < 5/6.',
        steps: [
          { label: 'Közös nevező (LKKT)', value: 'LKKT(4, 6) = 12' },
          { label: 'Bővítés', value: '3/4 = 9/12,  5/6 = 10/12' },
          { label: 'Összevetés', value: '9/12 < 10/12 ⟹ 3/4 < 5/6' }
        ]
      },
      {
        id: 'q14',
        title: 'Melyik a 0,35 tizedestört legegyszerűbb tört alakja?',
        options: ['7/20', '35/100', '3/5', '7/25'],
        correctAnswer: '7/20',
        hint: '0,35 = 35/100, egyszerűsíts 5-tel!',
        explanation: '0,35 = 35/100. Mind a számlálót, mind a nevezőt elosztva 5-tel: 35 : 5 = 7 és 100 : 5 = 20, így a legegyszerűbb alak 7/20.',
        steps: [
          { label: 'Tört alak', value: '35/100' },
          { label: 'Egyszerűsítés 5-tel', value: '(35 : 5) / (100 : 5) = 7/20' }
        ]
      },
      {
        id: 'q15',
        title: 'Milyen típusú tizedestörtet kapunk az 1/6 tört átváltásakor?',
        options: [
          'Vegyes szakaszos tizedestört (0,16̇)',
          'Tiszta szakaszos tizedestört (0,6̇)',
          'Véges tizedestört (0,16)',
          'Nem periodikus végtelen tizedestört'
        ],
        correctAnswer: 'Vegyes szakaszos tizedestört (0,16̇)',
        hint: '1 : 6 = 0,1666... A tizedesvessző után van egy 1-es, és csak utána ismétlődik a 6.',
        explanation: '1/6 = 0,1666... = 0,16̇. Mivel a szakasz (a 6-os ismétlődése) nem közvetlenül a tizedesvessző után kezdődik, hanem van előtte egy nem ismétlődő 1-es tizedesjegy, ezért ez vegyes szakaszos tizedestört.',
        steps: [
          { label: 'Osztás', value: '1 : 6 = 0,1666...' },
          { label: 'Nem ismétlődő előtag', value: '1 tized' },
          { label: 'Ismétlődő szakasz', value: '6 századok, ezredek...' },
          { label: 'Típus', value: 'Vegyes szakaszos (0,16̇)' }
        ]
      },
      {
        id: 'q16',
        title: 'Melyik állítás igaz a -2/3 és -1/3 negatív törtekre?',
        options: ['-2/3 < -1/3', '-2/3 > -1/3', '-2/3 = -1/3', '|-2/3| < |-1/3|'],
        correctAnswer: '-2/3 < -1/3',
        hint: 'A számegyenesen a balra lévő szám a kisebb. -2/3 távolabb van balra a nullától, mint -1/3.',
        explanation: 'A számegyenesen a -2/3 a -1/3-tól balra helyezkedik el (-0,66... < -0,33...), így -2/3 < -1/3. (Bár az abszolútértéke nagyobb: |-2/3| > |-1/3|).',
        steps: [
          { label: 'Értékek tizedesben', value: '-2/3 ≈ -0,67,  -1/3 ≈ -0,33' },
          { label: 'Számegyenes elhelyezkedés', value: '-0,67 balrább van, mint -0,33' },
          { label: 'Eredmény', value: '-2/3 < -1/3' }
        ]
      },
      {
        id: 'q17',
        title: 'Milyen számlálót kapunk, ha a 7/15 törtet 60-as nevezőre bővítjük?',
        options: ['28', '35', '21', '42'],
        correctAnswer: '28',
        hint: 'Nézd meg, hányszorosa a 60 a 15-nek: 60 : 15 = 4.',
        explanation: 'A nevezőt 4-gyel szoroztuk (15 · 4 = 60), így a számlálót is 4-gyel kell szoroznunk: 7 · 4 = 28. A bővített tört 28/60.',
        steps: [
          { label: 'Bővítő szorzó', value: '60 : 15 = 4' },
          { label: 'Új számláló', value: '7 · 4 = 28' },
          { label: 'Bővített tört', value: '28/60' }
        ]
      },
      {
        id: 'q18',
        title: 'Mennyi a 45/60 tört legegyszerűbb alakja?',
        options: ['3/4', '9/12', '15/20', '4/5'],
        correctAnswer: '3/4',
        hint: '45 és 60 legnagyobb közös osztója 15.',
        explanation: 'LNKO(45, 60) = 15. Mind a számlálót, mind a nevezőt 15-tel osztva: 45 : 15 = 3 és 60 : 15 = 4, a végeredmény 3/4.',
        steps: [
          { label: 'LNKO(45, 60)', value: '15' },
          { label: 'Egyszerűsítés', value: '(45 : 15) / (60 : 15) = 3/4' }
        ]
      },
      {
        id: 'q19',
        title: 'Hogyan írható fel a -2 és 3/5 negatív vegyes szám áltörtként?',
        options: ['-13/5', '-7/5', '-11/5', '13/5'],
        correctAnswer: '-13/5',
        hint: 'Vigyázz! Az előjel az egész kifejezésre vonatkozik: -(2 · 5 + 3) / 5.',
        explanation: 'A negatív előjel az egész vegyes számra vonatkozik: - (2 + 3/5) = - (10/5 + 3/5) = -13/5.',
        steps: [
          { label: 'Abszolútérték áltörtje', value: '(2 · 5 + 3) / 5 = 13/5' },
          { label: 'Előjel hozzárendelése', value: '-13/5' }
        ]
      },
      {
        id: 'q20',
        title: 'Mennyi a 7/8 tört értéke tizedestörtben és százalékban?',
        options: ['0,875 és 87,5%', '0,78 és 78%', '0,85 és 85%', '0,875 és 8,75%'],
        correctAnswer: '0,875 és 87,5%',
        hint: '7 : 8 = 0,875. Százalékhoz szorozd meg 100-zal!',
        explanation: '7 : 8 = 0,875. Mivel 1 egész = 100%, ezért 0,875 · 100% = 87,5%.',
        steps: [
          { label: 'Tizedes alak', value: '7 : 8 = 0,875' },
          { label: 'Százalék alak', value: '0,875 · 100% = 87,5%' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Haladó Összefüggések és Logikai Feladatok',
    subtitle: 'Törtes egyenletek, periodicitás, paraméteres törtek és összetett szöveges feladatok',
    range: '21 - 30. feladat',
    focus: 'Mesterfok & Logika',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q21',
        title: 'Melyik a helyes növekvő sorrend az alábbi számok között: -3/4, -1/2, 0, 2/5, 5/8?',
        options: [
          '-3/4 < -1/2 < 0 < 2/5 < 5/8',
          '-1/2 < -3/4 < 0 < 2/5 < 5/8',
          '-3/4 < -1/2 < 0 < 5/8 < 2/5',
          '0 < -1/2 < -3/4 < 2/5 < 5/8'
        ],
        correctAnswer: '-3/4 < -1/2 < 0 < 2/5 < 5/8',
        hint: 'Írd át mindet tizedestört alakra: -0,75; -0,50; 0; 0,40; 0,625.',
        explanation: 'Tizedestört alakban: -3/4 = -0,75; -1/2 = -0,50; 2/5 = 0,40; 5/8 = 0,625. Növekvő sorrendben: -0,75 < -0,50 < 0 < 0,40 < 0,625, azaz -3/4 < -1/2 < 0 < 2/5 < 5/8.',
        steps: [
          { label: 'Negatívak rendezése', value: '-0,75 < -0,50 (azaz -3/4 < -1/2)' },
          { label: 'Nulla', value: '0' },
          { label: 'Pozitívak rendezése', value: '0,40 < 0,625 (azaz 2/5 < 5/8)' },
          { label: 'Teljes sorrend', value: '-3/4 < -1/2 < 0 < 2/5 < 5/8' }
        ]
      },
      {
        id: 'q22',
        title: 'Melyik relációs jel helyes a következő összehasonlításban: 5/8 ... 0,63?',
        options: ['<', '>', '=', '≤'],
        correctAnswer: '<',
        hint: '5/8 = 0,625. Hasonlítsd össze 0,625-öt és 0,630-at!',
        explanation: '5/8 = 0,625. Összevetve 0,630-cal: 0,625 < 0,630, így 5/8 < 0,63.',
        steps: [
          { label: '5/8 tizedes alakja', value: '5 : 8 = 0,625' },
          { label: 'Összehasonlítás', value: '0,625 < 0,630 ⟹ 5/8 < 0,63' }
        ]
      },
      {
        id: 'q23',
        title: 'Határozd meg x értékét, ha (x + 2) / 18 = 5 / 6 !',
        options: ['13', '15', '11', '17'],
        correctAnswer: '13',
        hint: 'Bővítsd az 5/6 törtet 18-as nevezőre: 5/6 = 15/18.',
        explanation: '5/6 bővítve 3-mal: 15/18. Mivel a nevezők megegyeznek: x + 2 = 15, amiből 2-t kivonva: x = 13.',
        steps: [
          { label: 'Bővítés 18-as nevezőre', value: '5/6 = (5 · 3)/(6 · 3) = 15/18' },
          { label: 'Számlálók egyenlősége', value: 'x + 2 = 15' },
          { label: 'x megoldása', value: 'x = 15 - 2 = 13' }
        ]
      },
      {
        id: 'q24',
        title: 'Melyik nevező (n) esetén LESZ az a/n (legegyszerűbb alakú) törtből véges tizedestört?',
        options: ['n = 40', 'n = 21', 'n = 18', 'n = 33'],
        correctAnswer: 'n = 40',
        hint: 'Keresd azt a számot, amelynek prímfelbontásában CSAK 2 és 5 szerepel.',
        explanation: '40 = 2³ · 5 (csak 2 és 5 prímekből áll), így a/40 mindig véges tizedestört. A többinél: 21 = 3·7, 18 = 2·3², 33 = 3·11 (más prímek is vannak, így végtelen szakaszosak lennének).',
        steps: [
          { label: '40 prímfelbontása', value: '40 = 2 · 2 · 2 · 5 = 2³ · 5' },
          { label: 'Szabály ellenőrzése', value: 'Csak 2 és 5 prímek ⟹ Véges tizedestört!' }
        ]
      },
      {
        id: 'q25',
        title: 'Mi a 50. tizedesjegye a 4/11 = 0,3̇6̇ szakaszos tizedestörtnek?',
        options: ['6', '3', '4', '0'],
        correctAnswer: '6',
        hint: 'A szakasz hossza 2 jegy: a páratlanadik helyeken 3, a párosadik helyeken 6 áll.',
        explanation: 'A szakasz a 36 számpár, azaz az 1., 3., 5., ... (páratlan) helyeken a 3-as, míg a 2., 4., 6., ..., 50. (páros) helyeken a 6-os áll. Mivel 50 páros szám, az 50. jegy a 6.',
        steps: [
          { label: 'Szakasz periódusa', value: '3, 6 (hossz: 2 jegy)' },
          { label: 'Páros/páratlan index', value: 'Páratlan: 3, Páros: 6' },
          { label: '50. helyiérték', value: '50 páros ⟹ 6' }
        ]
      },
      {
        id: 'q26',
        title: 'Melyik kifejezés egyenlő a -(-5 / -8) értékével?',
        options: ['-5/8', '+5/8', '-8/5', '+8/5'],
        correctAnswer: '-5/8',
        hint: 'A tört belsejében: (-5) / (-8) = +5/8. Előtte van egy mínuszjel: -(+5/8).',
        explanation: 'Két negatív szám hányadosa pozitív: (-5) / (-8) = +5/8. A tört előtti negatív előjel miatt: -(+5/8) = -5/8.',
        steps: [
          { label: 'Tört előjele', value: '(-5) / (-8) = +5/8' },
          { label: 'Külső előjel hatása', value: '-(+5/8) = -5/8' }
        ]
      },
      {
        id: 'q27',
        title: 'Melyik tovább már nem egyszerűsíthető tört értéke pontosan 0,4̇5̇ ?',
        options: ['5/11', '45/100', '9/20', '4/9'],
        correctAnswer: '5/11',
        hint: 'Tiszta 2 jegyű periódus átírásakor a nevező 99: 45/99. Egyszerűsíts 9-cel!',
        explanation: 'A 0,4̇5̇ kétjegyű tiszta szakaszos tört értéke 45/99. Mindkettőt elosztva 9-cel: 45 : 9 = 5 és 99 : 9 = 11, így a legegyszerűbb alak 5/11.',
        steps: [
          { label: '99-es szabály', value: '0,4̇5̇ = 45/99' },
          { label: 'Egyszerűsítés 9-cel', value: '(45 : 9) / (99 : 9) = 5/11' }
        ]
      },
      {
        id: 'q28',
        title: 'Egy osztály 30 tanulójának 2/5 része fiú. A lányok 1/3 része táncol. Hány lány táncol az osztályban?',
        options: ['6', '12', '18', '4'],
        correctAnswer: '6',
        hint: 'Először számold ki a fiúk és lányok számát: fiúk = 30 · 2/5 = 12, lányok = 30 - 12 = 18.',
        explanation: 'Fiúk száma: 30 · (2/5) = 12. Lányok száma: 30 - 12 = 18. A lányok 1/3 része táncol: 18 · (1/3) = 6 lány.',
        steps: [
          { label: 'Fiúk száma', value: '30 · (2/5) = 12 fő' },
          { label: 'Lányok száma', value: '30 - 12 = 18 fő' },
          { label: 'Táncoló lányok', value: '18 · (1/3) = 6 fő' }
        ]
      },
      {
        id: 'q29',
        title: 'Hány olyan egész k szám létezik, amelyre igaz: 1/3 < k/12 < 3/4 ?',
        options: ['4 darab', '3 darab', '5 darab', '2 darab'],
        correctAnswer: '4 darab',
        hint: 'Hozd a határokat 12-es közös nevezőre: 4/12 < k/12 < 9/12.',
        explanation: '1/3 = 4/12 és 3/4 = 9/12. A feltétel: 4/12 < k/12 < 9/12, amiből 4 < k < 9. A lehetséges egész k értékek: 5, 6, 7, 8 (összesen 4 darab szám).',
        steps: [
          { label: 'Közös nevezőre hozás', value: '4/12 < k/12 < 9/12' },
          { label: 'Számlálók relációja', value: '4 < k < 9' },
          { label: 'Megoldások halmaza', value: 'k ∈ {5, 6, 7, 8} (4 darab)' }
        ]
      },
      {
        id: 'q30',
        title: 'Ha a = 0,3,  b = 1/3,  c = 0,3̇4̇ , mi a helyes növekvő sorrend?',
        options: ['a < b < c', 'b < a < c', 'c < b < a', 'a < c < b'],
        correctAnswer: 'a < b < c',
        hint: 'Írd fel a számokat 4 tizedesjegy pontossággal: a = 0,3000, b = 0,3333..., c = 0,3434...',
        explanation: 'Nézzük meg a számok tizedes jegyeit: a = 0,3000, b = 1/3 = 0,3333..., c = 0,3434... Látható, hogy 0,3000 < 0,3333 < 0,3434, így a < b < c.',
        steps: [
          { label: 'a tizedesjegyei', value: '0,3000...' },
          { label: 'b tizedesjegyei', value: '0,3333...' },
          { label: 'c tizedesjegyei', value: '0,3434...' },
          { label: 'Sorrend', value: '0,3000 < 0,3333 < 0,3434 ⟹ a < b < c' }
        ]
      }
    ]
  }
};

export const FractionsDecimalsQuiz: React.FC<FractionsDecimalsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      emoji="🍰"
      topicBadge="7. Osztály • Matematika II. Témakör"
      badgeText="7. Osztály • Matematika II. Témakör"
      title="2. Törtek, tizedes törtek Kvíz"
      cheatSheetTitle="Törtek & Tizedestörtek Szabálytár"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      themeColor="purple"
      hintText="💡 Tizedes átváltásnál a nevező prímfelbontása dönti el, hogy véges (csak 2 és 5) vagy szakaszos lesz-e az eredmény!"
      customGameModes={[
        {
          id: 'matcher',
          title: 'Kártyás Párosító',
          subtitle: 'Párosítsd a törteket, tizedestörteket és százalékokat!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-purple-500" />,
          render: ({ level, onNextLevel, onOpenRules }) => (
            <FractionsDecimalsMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Kategorizáld a törteket és tizedestörteket!',
          badgeText: '10 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-500" />,
          render: ({ level, onNextLevel, onOpenRules }) => (
            <FractionsDecimalsSorter
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
