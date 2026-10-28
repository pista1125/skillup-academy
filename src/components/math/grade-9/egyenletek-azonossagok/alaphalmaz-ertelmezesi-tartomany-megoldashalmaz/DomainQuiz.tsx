import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { DomainMatcher } from './DomainMatcher';
import { DomainSorter } from './DomainSorter';
import {
  DomainInclusionSvg,
  FractionRestrictionSvg,
  SquareRootRestrictionSvg,
  FalseRootSvg
} from './DomainFigures';
import { ArrowRightLeft, LayoutGrid, CircleDot, Lock, Boxes, AlertTriangle } from 'lucide-react';

interface DomainQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alaphalmaz és Nevező Kikötések (Könnyű)',
    subtitle: 'Halmazok viszonya, a nullával való osztás szigorú tilalma és alapértelmezett halmazok.',
    range: '1 - 10. feladat',
    focus: 'Alaphalmaz és Törtes Kikötések',
    questions: [
      {
        id: 'dq1-1',
        questionTypeBadge: 'Halmazok Viszonya',
        question: 'Milyen tartalmazási viszony áll fenn a Megoldáshalmaz (M), az Értelmezési Tartomány (É.T.) és az Alaphalmaz (A) között?',
        figure: <DomainInclusionSvg size={170} />,
        options: [
          'M ⊆ É.T. ⊆ A',
          'A ⊆ É.T. ⊆ M',
          'É.T. ⊆ M ⊆ A',
          'M = É.T. = A mindig'
        ],
        correctAnswer: 0,
        hint: 'A legbővebb az Alaphalmaz, ebből szűr az Értelmezési Tartomány, és ennek része a Megoldáshalmaz.',
        explanation: 'A megoldások az É.T. elemei közül kerülnek ki, az É.T. pedig az Alaphalmaz része: M ⊆ É.T. ⊆ A.'
      },
      {
        id: 'dq1-2',
        questionTypeBadge: 'Tört Nevezőjének Kikötése',
        question: 'Mi a kötelező kikötés az 5 / (x - 7) = 2 egyenlet megoldása előtt?',
        figure: <FractionRestrictionSvg size={170} />,
        options: ['x ≠ 7', 'x ≠ 5', 'x ≠ 0', 'x ≥ 7'],
        correctAnswer: 0,
        hint: 'A tört nevezője nem lehet nulla! x - 7 = 0 mikor lenne?',
        explanation: 'Nullával való osztás nincs értelmezve, ezért a nevező nem lehet 0: x - 7 ≠ 0 → x ≠ 7.'
      },
      {
        id: 'dq1-3',
        questionTypeBadge: 'Lineáris Nevező',
        question: 'Mi a kikötés a (3x + 1) / (2x - 8) = 4 egyenletnél?',
        options: ['x ≠ 4', 'x ≠ 8', 'x ≠ 2', 'x ≠ -1/3'],
        correctAnswer: 0,
        hint: '2x - 8 ≠ 0 → 2x ≠ 8 → x ≠ 4.',
        explanation: 'A nevező 2x - 8 ≠ 0 → 2x ≠ 8 → x ≠ 4. A számláló lehet nulla, ott nincs kikötés.'
      },
      {
        id: 'dq1-4',
        questionTypeBadge: 'Alapértelmezett Alaphalmaz',
        question: 'Ha a feladat nem ad meg külön alaphalmazt (A), mit tekintünk annak alapértelmezetten a középiskolában?',
        options: [
          'A valós számok halmazát (A = ℝ)',
          'A természetes számok halmazát (A = ℕ)',
          'A racionális számok halmazát (A = ℚ)',
          'Az üres halmazt (A = ∅)'
        ],
        correctAnswer: 0,
        hint: 'A lehető legtágabb valós számkört tekintjük alapnak.',
        explanation: 'Megkötés hiányában az alaphalmaz automatikusan a valós számok halmaza: A = ℝ.'
      },
      {
        id: 'dq1-5',
        questionTypeBadge: 'Szűkített Alaphalmaz (ℕ)',
        question: 'Mi az x - 5 = 2 egyenlet megoldáshalmaza, ha az alaphalmaz a természetes számok halmaza (A = ℕ)?',
        options: ['M = {7}', 'M = ∅', 'M = {-7}', 'M = {3}'],
        correctAnswer: 0,
        hint: 'x = 7. Benne van a 7 a természetes számokban?',
        explanation: 'x = 7 természetes szám (7 ∈ ℕ), így a megoldáshalmaz: M = {7}.'
      },
      {
        id: 'dq1-6',
        questionTypeBadge: 'Kieső Megoldás',
        question: 'Mi az x + 6 = 2 egyenlet megoldáshalmaza, ha az alaphalmaz a természetes számok halmaza (A = ℕ)?',
        options: ['M = ∅ (üres halmaz)', 'M = {-4}', 'M = {4}', 'M = {8}'],
        correctAnswer: 0,
        hint: 'x = -4. De a -4 negatív szám, nem természetes!',
        explanation: 'x = -4 nem eleme a természetes számoknak (-4 ∉ ℕ). Ezért ezen az alaphalmazon nincs megoldás: M = ∅.'
      },
      {
        id: 'dq1-7',
        questionTypeBadge: 'Értelmezési Tartomány Felírása',
        question: 'Hogyan jelöljük az f(x) = (x + 2) / x kifejezés értelmezési tartományát?',
        options: ['É.T. = ℝ \\ {0}', 'É.T. = ℝ \\ {-2}', 'É.T. = ℝ', 'É.T. = ]0; +∞['],
        correctAnswer: 0,
        hint: 'A nevezőben közvetlenül x áll, tehát x nem lehet 0.',
        explanation: 'A nevező miatt x ≠ 0, vagyis minden valós szám megengedett a 0 kivételével: É.T. = ℝ \\ {0}.'
      },
      {
        id: 'dq1-8',
        questionTypeBadge: 'Konstans Nevező',
        question: 'Szükséges-e kikötést tenni az (x + 3) / 5 = 4 egyenlet megoldásakor?',
        options: [
          'Nem szükséges, mert a nevező konstans 5, amely sosem lehet nulla',
          'Igen, x ≠ 5 kötelező',
          'Igen, x ≠ -3 kötelező',
          'Csak akkor, ha x negatív'
        ],
        correctAnswer: 0,
        hint: 'Van ismeretlen (x) a nevezőben? 5 mikor egyenlő 0-val? Soha!',
        explanation: 'Mivel a nevezőben állandó szám (5) van, amely sosem válik nullává, nem kell kikötést tenni, É.T. = ℝ.'
      },
      {
        id: 'dq1-9',
        questionTypeBadge: 'Több Kizárt Érték',
        question: 'Mely értékek NEM megengedettek az 1 / [(x - 1)(x - 5)] = 0 kifejezés esetén?',
        options: ['x = 1 és x = 5', 'Csak x = 1', 'Csak x = 5', 'x = -1 és x = -5'],
        correctAnswer: 0,
        hint: 'Egy szorzat akkor 0, ha valamelyik tényezője 0. x - 1 = 0 vagy x - 5 = 0.',
        explanation: 'A nevező szorzat alakú: x - 1 ≠ 0 és x - 5 ≠ 0, tehát x ≠ 1 és x ≠ 5.'
      },
      {
        id: 'dq1-10',
        questionTypeBadge: 'Nulla mint Gyök',
        question: 'Mi a megoldáshalmaza a 3x = 0 egyenletnek, ha A = ℝ?',
        options: ['M = {0}', 'M = ∅', 'M = ℝ', 'Nincs megoldása'],
        correctAnswer: 0,
        hint: '3 · 0 = 0, a 0 teljesen érvényes valós szám!',
        explanation: '3x = 0 → x = 0. A 0 egy létező, szabályos valós szám, így M = {0}. (Nem keverendő össze a nullával való osztással!).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Négyzetgyökös Kikötések és Számhalmazok (Közepes)',
    subtitle: 'Gyök alatti nemnegativitás, intervallumos É.T. és a számhalmazok szűkítő hatása.',
    range: '11 - 20. feladat',
    focus: 'Gyökös Kikötések és Számhalmazok',
    questions: [
      {
        id: 'dq2-1',
        questionTypeBadge: 'Négyzetgyökös Feltétel',
        question: 'Mi a feltétele annak, hogy a √(x - 5) kifejezés valós szám legyen?',
        figure: <SquareRootRestrictionSvg size={170} />,
        options: ['x ≥ 5', 'x > 5', 'x ≠ 5', 'x ≤ 5'],
        correctAnswer: 0,
        hint: 'A négyzetgyök alatt álló kifejezés nem lehet negatív: x - 5 ≥ 0.',
        explanation: 'A valós számokon csak nemnegatív számból vonhatunk négyzetgyököt: x - 5 ≥ 0 → x ≥ 5.'
      },
      {
        id: 'dq2-2',
        questionTypeBadge: 'Gyökös Értelmezési Tartomány',
        question: 'Mi az f(x) = √(2x + 6) függvény értelmezési tartománya (A = ℝ)?',
        options: ['[-3; +∞[', '[3; +∞[', ']-∞; -3]', 'ℝ \\ {-3}'],
        correctAnswer: 0,
        hint: '2x + 6 ≥ 0 → 2x ≥ -6 → x ≥ -3.',
        explanation: '2x + 6 ≥ 0 → 2x ≥ -6 → x ≥ -3. Intervallumban: É.T. = [-3; +∞[.'
      },
      {
        id: 'dq2-3',
        questionTypeBadge: 'Egész Számok Halmaza (ℤ)',
        question: 'Mi a 2x = 9 egyenlet megoldáshalmaza, ha az alaphalmaz az egész számok halmaza (A = ℤ)?',
        options: ['M = ∅ (üres halmaz)', 'M = {4,5}', 'M = {4}', 'M = {5}'],
        correctAnswer: 0,
        hint: 'x = 4,5. De a 4,5 törtszám, nem egész szám!',
        explanation: 'x = 4,5 nem egész szám (4,5 ∉ ℤ). Mivel az alaphalmaz nem tartalmazza, M = ∅.'
      },
      {
        id: 'dq2-4',
        questionTypeBadge: 'Racionális Számok (ℚ)',
        question: 'Mi az x² = 2 egyenlet megoldáshalmaza, ha az alaphalmaz a racionális számok halmaza (A = ℚ)?',
        options: ['M = ∅', 'M = {√2, -√2}', 'M = {1,41}', 'M = {2}'],
        correctAnswer: 0,
        hint: 'A √2 felírható két egész szám hányadosaként? Nem, irracionális szám!',
        explanation: 'A √2 és -√2 irracionális számok, nem elemei a racionális számok halmazának (±√2 ∉ ℚ). Ezért M = ∅.'
      },
      {
        id: 'dq2-5',
        questionTypeBadge: 'Másodfokú Egyenlet ℕ-en',
        question: 'Mely gyökök alkotják az x² = 25 egyenlet megoldáshalmazát, ha A = ℕ?',
        options: ['M = {5}', 'M = {-5, 5}', 'M = ∅', 'M = {25}'],
        correctAnswer: 0,
        hint: 'x₁ = 5 és x₂ = -5. De melyik természetes szám?',
        explanation: 'A +5 természetes szám (5 ∈ ℕ), de a -5 nem (negatív). Ezért a megoldáshalmaz csak az 5-öt tartalmazza: M = {5}.'
      },
      {
        id: 'dq2-6',
        questionTypeBadge: 'Megfordított Gyökös Feltétel',
        question: 'Mi az értelmezési tartománya a √(8 - x) kifejezésnek?',
        options: [']-∞; 8]', '[8; +∞[', 'x ≠ 8', ']-∞; -8]'],
        correctAnswer: 0,
        hint: '8 - x ≥ 0 → 8 ≥ x, azaz x ≤ 8.',
        explanation: '8 - x ≥ 0 → x ≤ 8. Intervallumként: ]-∞; 8].'
      },
      {
        id: 'dq2-7',
        questionTypeBadge: 'Üres Halmaz Jelölése',
        question: 'Mit jelent pontosan az M = ∅ jelölés egy egyenlet megoldásakor?',
        options: [
          'Az egyenletnek egyetlen olyan megoldása sincs, amely kielégíti a feltételeket és az alaphalmazba tartozik',
          'Az egyenlet megoldása az x = 0 szám',
          'Elfelejtettük befejezni a feladatot',
          'Az egyenletnek végtelen sok megoldása van'
        ],
        correctAnswer: 0,
        hint: 'A ∅ az üres halmaz jele, ami egyetlen elemet sem tartalmaz.',
        explanation: 'M = ∅ azt jelenti, hogy az egyenletnek nincs megoldása az adott alaphalmazon (ellentmondásos vagy kieső gyökök).'
      },
      {
        id: 'dq2-8',
        questionTypeBadge: 'Tört Nevezőjében Gyök',
        question: 'Mi a pontos kikötés az 1 / √(x - 3) kifejezésnél?',
        options: ['x > 3 (szigorúan nagyobb)', 'x ≥ 3', 'x ≠ 3', 'x < 3'],
        correctAnswer: 0,
        hint: 'Két szabály találkozik: a gyök miatt ≥ 0, de a nevező miatt nem lehet 0!',
        explanation: 'A gyök miatt x - 3 ≥ 0, de a tört nevezője miatt nem lehet 0, így x - 3 > 0 → x > 3.'
      },
      {
        id: 'dq2-9',
        questionTypeBadge: 'Halmazkülönbség Értelmezése',
        question: 'Melyik szám tartozik a ℤ \\ ℕ (egész, de nem természetes) halmazba?',
        options: ['-7', '0', '5', '2,5'],
        correctAnswer: 0,
        hint: 'Egésznek kell lennie, de nem lehet természetes (nemnegatív) szám.',
        explanation: 'A -7 negatív egész szám, így benne van a ℤ halmazban, de nincs benne a ℕ halmazban.'
      },
      {
        id: 'dq2-10',
        questionTypeBadge: 'Tört Alaphalmazbeli Tagsága',
        question: 'Egy egyenlet levezetése során x = 7/4 adódik. Ha az alaphalmaz A = ℚ (racionális számok), mi a megoldáshalmaz?',
        options: ['M = {7/4}', 'M = ∅', 'M = {1,75}', 'Csak egész szám fogadható el'],
        correctAnswer: 0,
        hint: 'A 7/4 két egész szám hányadosa. Racionális szám?',
        explanation: 'A racionális számok definíciója szerint két egész hányadosa, így 7/4 ∈ ℚ, a megoldás érvényes: M = {7/4}.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Hamis Gyökök és Ekvivalens Átalakítások (Nehéz)',
    subtitle: 'Kikötések kizáró ereje, nem ekvivalens lépések és összetett értelmezési tartományok.',
    range: '21 - 30. feladat',
    focus: 'Hamis Gyökök és Nem Ekvivalens Műveletek',
    questions: [
      {
        id: 'dq3-1',
        questionTypeBadge: 'Hamis Gyök Törtes Egyenletnél',
        question: 'Adott az (x² - 9) / (x - 3) = 6 egyenlet. Egyszerűsítés után x + 3 = 6 → x = 3 adódik. Mi az egyenlet valódi megoldáshalmaza?',
        figure: <FalseRootSvg size={170} />,
        options: [
          'M = ∅ (nincs megoldás, mert x = 3 hamis gyök)',
          'M = {3}',
          'M = {6}',
          'M = ℝ \\ {3}'
        ],
        correctAnswer: 0,
        hint: 'Mi volt a legelső kikötés a nevezőre? x - 3 ≠ 0 → x ≠ 3!',
        explanation: 'Mivel a kezdeti kikötés x ≠ 3, az átalakítás után kapott x = 3 hamis gyök (0-val való osztást eredményezne). Ezért M = ∅.'
      },
      {
        id: 'dq3-2',
        questionTypeBadge: 'Négyzetre Emelés mint Nem Ekvivalens Lépés',
        question: 'Miért NEM ekvivalens átalakítás az egyenlet mindkét oldalának négyzetre emelése?',
        options: [
          'Mert hamis gyököket hozhat be az egyenletbe, mivel (-a)² = a²',
          'Mert mindig elveszítünk egy gyököt',
          'Mert nem lehet elvégezni negatív számokra',
          'Mert a jobb oldal mindig kétszeresére nő'
        ],
        correctAnswer: 0,
        hint: 'Például x = -3 esetén négyzetre emelve x² = 9 lesz, amiből x = 3 is adódik!',
        explanation: 'Négyzetre emeléskor a két oldal előjele elvész, ami olyan új „gyököket” generálhat, amelyek az eredeti egyenletnek nem megoldásai (hamis gyökök).'
      },
      {
        id: 'dq3-3',
        questionTypeBadge: 'Negatív Értékű Gyök',
        question: 'Mi a megoldáshalmaza a √(x + 1) = -3 egyenletnek a valós számok halmazán?',
        options: [
          'M = ∅ (lehetetlen, nincs megoldás)',
          'M = {8}',
          'M = {-10}',
          'M = {9}'
        ],
        correctAnswer: 0,
        hint: 'Lehet egy valós négyzetgyök értéke negatív szám (-3)? Nem!',
        explanation: 'A valós négyzetgyök definíció szerint nemnegatív (≥ 0). A √(x + 1) = -3 egyenlőség sosem teljesülhet, M = ∅. (A négyzetre emeléssel kapott x = 8 hamis gyök).'
      },
      {
        id: 'dq3-4',
        questionTypeBadge: 'Gyökvesztés Veszélye',
        question: 'Miért tilos az x² = 7x egyenlet mindkét oldalát egyszerűen elosztani x-szel?',
        options: [
          'Mert ha x = 0, akkor 0-val osztanánk, és ezzel elveszítjük az x = 0 valódi gyököt',
          'Mert az x² nem osztható x-szel',
          'Mert így hamis gyököt kapnánk',
          'Mert az x mindig páros szám kell legyen'
        ],
        correctAnswer: 0,
        hint: 'Ismeretlennel való osztás gyökvesztést okozhat!',
        explanation: 'Az x-szel való osztás kizárja az x = 0 esetet, pedig 0² = 7·0 igaz! Helyesen: x² - 7x = 0 → x(x - 7) = 0, így x₁ = 0 és x₂ = 7.'
      },
      {
        id: 'dq3-5',
        questionTypeBadge: 'Összetett Nevező Kikötése',
        question: 'Mely értékeket kell kizárni az (x + 1) / (x² - 16) = 3 egyenlet értelmezési tartományából?',
        options: ['x ≠ 4 és x ≠ -4', 'Csak x ≠ 4', 'Csak x ≠ 16', 'x ≠ -1'],
        correctAnswer: 0,
        hint: 'x² - 16 = (x - 4)(x + 4) ≠ 0.',
        explanation: 'x² - 16 ≠ 0 → x² ≠ 16 → x ≠ 4 és x ≠ -4. Mindkét értéket ki kell zárni: É.T. = ℝ \\ {-4; 4}.'
      },
      {
        id: 'dq3-6',
        questionTypeBadge: 'Tört és Gyök Együtt',
        question: 'Mi az értelmezési tartománya az f(x) = √(x - 2) / (x - 5) kifejezésnek?',
        options: [
          '[2; 5[ ∪ ]5; +∞[',
          '[2; +∞[',
          'ℝ \\ {5}',
          ']5; +∞['
        ],
        correctAnswer: 0,
        hint: 'Gyök miatt: x ≥ 2. Nevező miatt: x ≠ 5. A kettő metszete?',
        explanation: 'x ≥ 2 és x ≠ 5 egyszerre teljesül. Intervallumként: [2; 5[ ∪ ]5; +∞[.'
      },
      {
        id: 'dq3-7',
        questionTypeBadge: 'Ellenőrzés Kötelezősége',
        question: 'Mikor kötelező a kapott gyököket az EREDETI egyenletbe behelyettesítve ellenőrizni?',
        options: [
          'Mindig, de különösen akkor, ha nem ekvivalens átalakítást (pl. négyzetre emelés) végeztünk',
          'Csak akkor, ha a megoldás negatív',
          'Csak ha a tanár külön kéri',
          'Soha nem kötelező, ha a mérlegelv szabályos volt'
        ],
        correctAnswer: 0,
        hint: 'A nem ekvivalens lépések hamis gyököket vihetnek be, amelyeket csak a behelyettesítés leplez le.',
        explanation: 'Nem ekvivalens átalakítások (négyzetre emelés) után az ellenőrzés a bizonyítás része: csak így zárhatók ki a hamis gyökök.'
      },
      {
        id: 'dq3-8',
        questionTypeBadge: 'Azonosság Kikötéssel',
        question: 'Oldd meg a (2x - 6) / (x - 3) = 2 egyenletet!',
        options: [
          'M = ℝ \\ {3}',
          'M = ℝ (minden valós szám)',
          'M = {3}',
          'M = ∅'
        ],
        correctAnswer: 0,
        hint: 'Számláló: 2(x - 3). Egyszerűsítve 2 = 2 azonosság! De mi a kikötés?',
        explanation: 'A bal oldal 2(x - 3)/(x - 3) = 2, ami minden értékre 2, kivéve az x = 3-at, ahol a nevező 0! Ezért M = ℝ \\ {3}.'
      },
      {
        id: 'dq3-9',
        questionTypeBadge: 'Negatív Négyzet a Gyök Alatt',
        question: 'Mi a megoldáshalmaza a √(-x² - 1) = 0 egyenletnek a valós számok halmazán?',
        options: [
          'M = ∅ (mert a gyök alatti kifejezés minden valós x-re negatív)',
          'M = {0}',
          'M = {1, -1}',
          'M = ℝ'
        ],
        correctAnswer: 0,
        hint: 'x² ≥ 0, így -x² ≤ 0, tehát -x² - 1 ≤ -1 mindig szigorúan negatív!',
        explanation: 'Mivel -x² - 1 mindig legfeljebb -1, a gyök alatt sosem állhat nemnegatív szám a valós számok körében: É.T. = ∅, így M = ∅.'
      },
      {
        id: 'dq3-10',
        questionTypeBadge: 'Tört Kiesése Ellentmondással',
        question: 'Mi az 3 / (x - 2) = 3 / (x - 2) + 4 egyenlet megoldása?',
        options: [
          'M = ∅ (ellentmondás)',
          'x = 2',
          'M = ℝ \\ {2}',
          'x = 4'
        ],
        correctAnswer: 0,
        hint: 'Vonj ki mindkét oldalból 3 / (x - 2)-t! Mi marad?',
        explanation: 'A tört kivonása után 0 = 4 marad, ami lehetetlen (ellentmondás). Így M = ∅.'
      }
    ]
  }
};

const cheatSheetData: CheatSheetCard[] = [
  {
    title: '1. Halmazok Egymásba Ágyazása',
    badge: 'M ⊆ É.T. ⊆ A',
    points: [
      'Alaphalmaz (A): a számok összessége, ahonnan keresünk (alapesetben A = ℝ).',
      'Értelmezési Tartomány (É.T.): az alaphalmaz azon része, ahol a műveletek elvégezhetők.',
      'Megoldáshalmaz (M): az É.T. azon elemei, amelyek kielégítik az egyenletet.'
    ]
  },
  {
    title: '2. Törtes Kikötés (Nevező ≠ 0)',
    badge: 'Nullával nem osztunk!',
    points: [
      'A tört nevezője SOSEM lehet 0!',
      'Kikötés mindig a legelső sorban, az átalakítások előtt teendő.',
      'Pl. 1 / (x - 4) esetén: x - 4 ≠ 0 → x ≠ 4, így É.T. = ℝ \\ {4}.'
    ]
  },
  {
    title: '3. Gyökös Kikötés (Nemnegativitás)',
    badge: 'Gyökjel alatt ≥ 0',
    points: [
      'Páros kitevőjű gyök valós számok körében csak nemnegatív számra létezik.',
      'Pl. √(x - 3) esetén: x - 3 ≥ 0 → x ≥ 3, azaz É.T. = [3; +∞[.',
      'Ha a gyök a nevezőben van: szigorúan > 0 (nem lehet egyenlő 0-val).'
    ]
  },
  {
    title: '4. Hamis Gyökök & Nem Ekvivalens Lépések',
    badge: 'Veszélyes műveletek',
    points: [
      'Négyzetre emelés: hamis gyököket hozhat be! (Kötelező az ellenőrzés).',
      'Ismeretlennel való osztás: tilos meggondolatlanul, mert gyököt veszíthetünk (pl. x = 0).',
      'Ha a kapott x nem része az É.T.-nek vagy az A-nak, a gyököt elvetjük: nem megoldás!'
    ]
  }
];

export const DomainQuiz: React.FC<DomainQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Alaphalmaz, Értelmezési Tartomány – Gyakorló Kvíz"
      subtitle="30 válogatott feladat 3 szinten kikötésekből, gyökös és törtes feltételekből, alaphalmaz szerinti szűrésből és hamis gyökökből"
      badgeText="9. OSZTÁLY • III. EGYENLETEK ÉS AZONOSSÁGOK • 7. TÉMAKÖR"
      themeColor="rose"
      storageKey="grade9-domain-quiz-score"
      levels={quizLevels}
      cheatSheet={cheatSheetData}
      grade={9}
      chapterId="egyenletek-azonossagok"
      topicId="g9-egyenlet-alaphalmaz-quiz"
      topicTitle="Alaphalmaz, értelmezési tartomány, megoldáshalmaz"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a kifejezéseket a kikötéseikkel és megoldáshalmazukkal!',
          badgeText: '6 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-rose-600 dark:text-rose-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <DomainMatcher
              key={`domain-matcher-${level}`}
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
          subtitle: 'Kategorizáld a kifejezéseket kikötésük, halmazuk és gyökük sorsa szerint!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-pink-600 dark:text-pink-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <DomainSorter
              key={`domain-sorter-${level}`}
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
