import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { EquivalentEquationsMatcher } from './EquivalentEquationsMatcher';
import { EquivalentEquationsSorter } from './EquivalentEquationsSorter';
import {
  BalanceScaleSvg,
  ExtraneousRootsSvg,
  LostRootsSvg,
  DomainRestrictionSvg,
  FlowchartStepSvg
} from './EquivalentEquationsFigures';

interface EquivalentEquationsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A mérlegelv és az ekvivalencia',
    description: 'Két egyenlet akkor ekvivalens egy adott alaphalmazon, ha megoldáshalmazuk pontosan megegyezik. Mindkét oldalhoz ugyanazt a számot adva vagy nemnulla számmal szorozva/osztva az ekvivalencia megmarad.',
    note: 'Az alaphalmaz döntő: x² = 9 és x = 3 a valós számokon nem ekvivalens, de a pozitív egészeken (ℕ) igen!',
    color: 'from-teal-500 to-emerald-600',
    figure: <BalanceScaleSvg size={260} />
  },
  {
    title: 'Hamis gyökök és négyzetre emelés',
    description: 'Ha mindkét oldalt négyzetre emeljük: A = B ⟹ A² = B². A megfordítás azonban nem igaz, mert A = -B is lehet! Emiatt hamis gyökök léphetnek be.',
    note: 'Négyzetre emelés vagy ismeretlennel való szorzás után a kapott gyököket KÖTELEZŐ behelyettesíteni az eredeti egyenletbe!',
    color: 'from-rose-500 to-red-600',
    figure: <ExtraneousRootsSvg size={260} />
  },
  {
    title: 'Gyökvesztés és kikötések',
    description: 'Soha ne ossz ismeretlent tartalmazó kifejezéssel (pl. x² = 5x esetén ne ossz x-szel), mert ha az kifejezés 0 lehet, a megfelelő gyök elveszik! Ehelyett rendezz 0-ra és emelj ki.',
    note: 'Törtes egyenletnél először írd fel a kikötést: a nevező nem lehet nulla!',
    color: 'from-amber-500 to-orange-600',
    figure: <LostRootsSvg size={260} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és a mérlegelv',
    subtitle: '10 alapozó feladat az egyenletek ekvivalenciájáról és az egyenértékű lépésekről',
    range: '1–10. kérdés',
    focus: 'Ekvivalencia definíciója, mérlegelv, alaphalmaz és egyszerű lépések',
    badgeBg: 'bg-teal-100 dark:bg-teal-950/60',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-800 dark:text-teal-300',
    accentGradient: 'from-teal-500 to-emerald-600',
    questions: [
      {
        id: 'eeq1-1',
        level: 1,
        question: 'Mikor nevezünk két egyenletet ekvivalensnek (egyenértékűnek) egy adott alaphalmazon?',
        options: [
          'Ha a megoldáshalmazuk pontosan megegyezik',
          'Ha mindkét egyenletben ugyanazok az együtthatók szerepelnek',
          'Ha mindkét egyenlet azonos fokszámú',
          'Ha mindkét egyenletnek pontosan 1 darab megoldása van'
        ],
        correctAnswer: 'Ha a megoldáshalmazuk pontosan megegyezik',
        explanation: 'Az ekvivalencia matematikai definíciója: két egyenlet akkor és csak akkor ekvivalens egy adott alaphalmazon, ha megoldáshalmazuk teljesen azonos (M₁ = M₂).',
        hint: 'Gondolj a megoldáshalmazokra: mikor jelentenek ugyanazt?',
        questionTypeBadge: 'Alapfogalom'
      },
      {
        id: 'eeq1-2',
        level: 1,
        question: 'Melyik átalakítás tekintendő BIZTOSAN ekvivalensnek a valós számok halmazán?',
        options: [
          'Ugyanazon valós szám hozzáadása az egyenlet mindkét oldalához',
          'Mindkét oldal négyzetre emelése',
          'Mindkét oldal megszorzása ismeretlennel',
          'Mindkét oldal leosztása ismeretlennel'
        ],
        correctAnswer: 'Ugyanazon valós szám hozzáadása az egyenlet mindkét oldalához',
        explanation: 'A mérlegelv szerint bármely c valós szám hozzáadása vagy kivonása mindkét oldalból nem változtatja meg az egyenlet megoldáshalmazát.',
        hint: 'Melyik műveletnél marad meg biztosan a kétkarú mérleg egyensúlya anélkül, hogy új gyök jönne létre?',
        questionTypeBadge: 'Mérlegelv'
      },
      {
        id: 'eeq1-3',
        level: 1,
        question: 'Milyen számmal szabad megszorozni egy egyenlet mindkét oldalát úgy, hogy ekvivalens maradjon?',
        options: [
          'Bármilyen nullától különböző valós számmal',
          'Kizárólag pozitív egész számmal',
          'Tetszőleges valós számmal, beleértve a nullát is',
          'Csak racionális számmal'
        ],
        correctAnswer: 'Bármilyen nullától különböző valós számmal',
        explanation: 'Ha c ≠ 0 valós szám, akkor f(x) = g(x) ⟺ c · f(x) = c · g(x). Ha c = 0 lenne, akkor 0 = 0 azonosságot kapnánk, ami nem ekvivalens.',
        hint: 'Mi történne, ha mindkét oldalt 0-val szoroznánk be?',
        questionTypeBadge: 'Alapszabály'
      },
      {
        id: 'eeq1-4',
        level: 1,
        question: 'Melyik az 5x - 7 = 18 egyenlettel ekvivalens alak?',
        options: ['5x = 25', '5x = 11', 'x - 7 = 18', '5x = -25'],
        correctAnswer: '5x = 25',
        explanation: 'Mindkét oldalhoz 7-et adva: 5x - 7 + 7 = 18 + 7 ⟹ 5x = 25. Ez ekvivalens lépés.',
        hint: 'Adj hozzá mindkét oldalhoz 7-et!',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'eeq1-5',
        level: 1,
        question: 'Mi a megoldáshalmaza a 0 · x = 0 egyenletnek a valós számok halmazán?',
        options: [
          'A valós számok teljes halmaza (ℝ)',
          'Üres halmaz (∅)',
          'Csak a {0}',
          'Csak az {1}'
        ],
        correctAnswer: 'A valós számok teljes halmaza (ℝ)',
        explanation: 'Mivel bármilyen valós számot megszorozva 0-val nullát kapunk, az egyenlőség minden x ∈ ℝ esetén igaz (azonosság).',
        hint: 'Van-e olyan szám, amit 0-val szorozva nem 0-t kapunk?',
        questionTypeBadge: 'Azonosság'
      },
      {
        id: 'eeq1-6',
        level: 1,
        question: 'Mi a megoldáshalmaza a 0 · x = 7 egyenletnek a valós számok halmazán?',
        options: [
          'Üres halmaz (∅)',
          'Csak a {7}',
          'A valós számok teljes halmaza (ℝ)',
          'Csak a {0}'
        ],
        correctAnswer: 'Üres halmaz (∅)',
        explanation: 'Mivel a bal oldal minden valós x-re 0, a jobb oldal pedig 7, a 0 = 7 állítás ellentmondás, így az egyenletnek nincs megoldása: M = ∅.',
        hint: 'Elérhető-e, hogy 0-val szorozva 7-et kapjunk?',
        questionTypeBadge: 'Ellentmondás'
      },
      {
        id: 'eeq1-7',
        level: 1,
        question: 'Mit nevezünk egyenlet alaphalmazának?',
        options: [
          'Azt a számhalmazt, amelyből az ismeretlen lehetséges értékei kikerülhetnek',
          'Az egyenlet helyes megoldásainak halmazát',
          'A koordináta-rendszer origóját',
          'Az egyenletben szereplő együtthatók halmazát'
        ],
        correctAnswer: 'Azt a számhalmazt, amelyből az ismeretlen lehetséges értékei kikerülhetnek',
        explanation: 'Az alaphalmaz (univerzum) az a kijelölt számhalmaz, amelyen belül az egyenlet megoldásait keressük (pl. természetes számok, egészek vagy valós számok).',
        hint: 'Hol keressük a megoldásokat a feladat kitűzése alapján?',
        questionTypeBadge: 'Alapfogalom'
      },
      {
        id: 'eeq1-8',
        level: 1,
        question: 'Az alábbi lépések közül melyik NEM változtatja meg az egyenlet megoldáshalmazát?',
        options: [
          'Zárójelek felbontása és azonos fokszámú tagok összevonása az egyik oldalon',
          'Mindkét oldal szorzása az ismeretlennel',
          'A negatív előjelű tagok elhagyása',
          'Mindkét oldal négyzetre emelése'
        ],
        correctAnswer: 'Zárójelek felbontása és azonos fokszámú tagok összevonása az egyik oldalon',
        explanation: 'Az egyenlet valamelyik oldalán végzett azonos átalakítás (algebrai rendezés, összevonás) ekvivalens lépés, nem módosítja a megoldáshalmazt.',
        hint: 'Melyik művelet jelent csupán más formájú átírást?',
        questionTypeBadge: 'Azonos átalakítás'
      },
      {
        id: 'eeq1-9',
        level: 1,
        question: 'Ekvivalens-e a 4x = 12 és az x + 2 = 5 egyenlet a valós számok halmazán?',
        options: [
          'Igen, mert mindkettőnek az x = 3 az egyetlen megoldása',
          'Nem, mert az egyikben szorzás, a másikban összeadás van',
          'Nem, mert különbözőek az együtthatóik',
          'Csak a pozitív egész számok halmazán ekvivalensek'
        ],
        correctAnswer: 'Igen, mert mindkettőnek az x = 3 az egyetlen megoldása',
        explanation: '4x = 12 ⟹ x = 3 (M₁ = {3}). x + 2 = 5 ⟹ x = 3 (M₂ = {3}). Mivel M₁ = M₂ = {3}, az egyenletek ekvivalensek.',
        hint: 'Oldd meg mindkét egyenletet és hasonlítsd össze a gyökeiket!',
        questionTypeBadge: 'Ekvivalencia-vizsgálat'
      },
      {
        id: 'eeq1-10',
        level: 1,
        question: 'Mi történik egy egyenlet megoldásakor, ha mindkét oldalból kivonjuk az ismeretlent (x-et)?',
        options: [
          'Ekvivalens átalakítás, mert azonos kifejezést vontunk ki mindkét oldalból',
          'Gyökvesztés történik',
          'Hamis gyök keletkezik',
          'Ez a művelet szigorúan tilos'
        ],
        correctAnswer: 'Ekvivalens átalakítás, mert azonos kifejezést vontunk ki mindkét oldalból',
        explanation: 'Bármilyen kifejezés (akár ismeretlent tartalmazó is) hozzáadása vagy kivonása mindkét oldalból ekvivalens átalakítás, mert az f(x) = g(x) ⟺ f(x) - x = g(x) - x.',
        hint: 'A mérlegelv szerint mindkét serpenyőből elvehetünk azonos súlyt!',
        questionTypeBadge: 'Mérlegelv'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Hamis gyökök, gyökvesztés és kikötések',
    subtitle: '10 középfokú feladat a nem ekvivalens átalakítások veszélyeiről és kiszűrésükről',
    range: '11–20. kérdés',
    focus: 'Négyzetre emelés, ismeretlennel való osztás/szorzás és törtes kikötések',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-800 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    questions: [
      {
        id: 'eeq2-1',
        level: 2,
        question: 'Miért NEM ekvivalens lépés a valós számok halmazán egy egyenlet mindkét oldalának négyzetre emelése?',
        options: [
          'Mert a negatív számok négyzete is pozitív, így hamis gyökök keletkezhetnek',
          'Mert mindig elveszítjük az x = 0 gyököt',
          'Mert a másodfokú egyenleteket nem tudjuk megoldani',
          'Mert az egyenlet fokszáma felére csökken'
        ],
        correctAnswer: 'Mert a negatív számok négyzete is pozitív, így hamis gyökök keletkezhetnek',
        explanation: 'Ha A = B, abból következik A² = B², de fordítva nem: A² = B²-ből A = -B is következhet. Ez új, hamis gyököket hozhat be.',
        hint: 'Gondolj arra: (-3)² és 3² is 9!',
        questionTypeBadge: 'Hamis gyök'
      },
      {
        id: 'eeq2-2',
        level: 2,
        question: 'Az alábbi átalakítás során milyen hiba történt?  x² = 6x  ⟹  x = 6 (leosztottunk x-szel)',
        options: [
          'Gyökvesztés történt: az x = 0 gyök elveszett',
          'Hamis gyök keletkezett: az x = 6 nem megoldás',
          'Nincs hiba, az átalakítás teljesen szabályos',
          'Számolási hiba történt, x = 36 lenne a helyes'
        ],
        correctAnswer: 'Gyökvesztés történt: az x = 0 gyök elveszett',
        explanation: 'Mivel x = 0 esetén 0² = 6 · 0 igaz, az x = 0 megoldás volt. Az x-szel való osztáskor nullával osztottunk, így az x = 0 gyök elveszett.',
        hint: 'Behelyettesítve az x = 0-t az eredeti egyenletbe, igaz-e?',
        questionTypeBadge: 'Gyökvesztés'
      },
      {
        id: 'eeq2-3',
        level: 2,
        question: 'Hogyan kell HELYESEN megoldani az x² = 6x egyenletet a gyökvesztés elkerülésével?',
        options: [
          'Nullára rendezéssel és kiemeléssel: x² - 6x = 0 ⟹ x(x - 6) = 0 ⟹ x₁ = 0, x₂ = 6',
          'Négyzetgyökvonással: x = √6x',
          'Mindkét oldalból x levonásával: x² - x = 5x',
          'Megoldóképlet nélkül nem oldható meg'
        ],
        correctAnswer: 'Nullára rendezéssel és kiemeléssel: x² - 6x = 0 ⟹ x(x - 6) = 0 ⟹ x₁ = 0, x₂ = 6',
        explanation: 'Egy oldalra rendezve: x(x - 6) = 0. Egy szorzat akkor 0, ha valamelyik tényezője 0, így x = 0 vagy x = 6. Mindkét gyök megmarad.',
        hint: 'Alakítsd szorzattá az egyik oldalt!',
        questionTypeBadge: 'Helyes módszer'
      },
      {
        id: 'eeq2-4',
        level: 2,
        question: 'Mi az értelmezési tartománya az alábbi egyenletnek a valós számok halmazán: (3x + 1) / (x - 4) = 5?',
        options: [
          'x ∈ ℝ \\ {4}',
          'x ∈ ℝ \\ {-4}',
          'x ∈ ℝ \\ {0}',
          'A teljes ℝ halmaz'
        ],
        correctAnswer: 'x ∈ ℝ \\ {4}',
        explanation: 'Tört nevezője nem lehet 0: x - 4 ≠ 0 ⟹ x ≠ 4. Tehát a 4 nem tartozhat az értelmezési tartományba.',
        hint: 'Melyik számnál lenne a tört nevezője nulla?',
        questionTypeBadge: 'Kikötés'
      },
      {
        id: 'eeq2-5',
        level: 2,
        question: 'Mennyi a megoldása az (x² - 9) / (x - 3) = 0 egyenletnek a valós számok halmazán?',
        options: [
          'Csak az x = -3',
          'x₁ = 3 és x₂ = -3',
          'Csak az x = 3',
          'Nincs megoldása (∅)'
        ],
        correctAnswer: 'Csak az x = -3',
        explanation: 'Kikötés: x - 3 ≠ 0 ⟹ x ≠ 3. A számláló zérushelyei: x² - 9 = 0 ⟹ x = ±3. Mivel a 3 ki van zárva a kikötés miatt, a megoldáshalmaz csak {-3}.',
        hint: 'Figyeld a nevező kikötését: x ≠ 3!',
        questionTypeBadge: 'Törtes buktató'
      },
      {
        id: 'eeq2-6',
        level: 2,
        question: 'Ekvivalens-e az x = 4 és az x² = 16 egyenlet a valós számok halmazán (ℝ-en)?',
        options: [
          'Nem, mert az x² = 16 egyenletnek a -4 is gyöke',
          'Igen, mert 4² = 16',
          'Igen, mert mindkettőnek gyöke a 4',
          'Nem, mert a jobb oldalak különbözőek'
        ],
        correctAnswer: 'Nem, mert az x² = 16 egyenletnek a -4 is gyöke',
        explanation: 'Az első egyenlet megoldáshalmaza M₁ = {4}, a másodiké M₂ = {-4; 4}. Mivel M₁ ≠ M₂, a két egyenlet nem ekvivalens.',
        hint: 'Ugyanazok-e a megoldások, vagy az egyiknek több gyöke van?',
        questionTypeBadge: 'Ekvivalencia'
      },
      {
        id: 'eeq2-7',
        level: 2,
        question: 'Ekvivalens-e az x = 4 és az x² = 16 egyenlet a pozitív valós számok halmazán (ℝ⁺-on)?',
        options: [
          'Igen, mert ℝ⁺-on mindkét egyenlet megoldáshalmaza {4}',
          'Nem, mert az egyenletek alakja eltérő',
          'Nem, mert a négyzetre emelés sosem lehet ekvivalens',
          'Csak az egész számokon ekvivalensek'
        ],
        correctAnswer: 'Igen, mert ℝ⁺-on mindkét egyenlet megoldáshalmaza {4}',
        explanation: 'Az alaphalmaz megváltoztatja a megoldáshalmazt! ℝ⁺-on a -4 nem jöhet szóba, így mindkét egyenlet megoldáshalmaza {4}, azaz ott ekvivalensek.',
        hint: 'Szerepel-e a -4 a pozitív valós számok között?',
        questionTypeBadge: 'Alaphalmaz szerepe'
      },
      {
        id: 'eeq2-8',
        level: 2,
        question: 'Mit kell tenni, ha egy egyenlet megoldása során nem ekvivalens átalakítást hajtottunk végre?',
        options: [
          'A kapott gyököket be kell helyettesíteni az eredeti kiinduló egyenletbe (kötelező ellenőrzés)',
          'Elölről kell kezdeni az egész feladatot más módszerrel',
          'Automatikusan el kell hagyni az összes negatív gyököt',
          'Nem kell tenni semmit, ha a számolás pontos volt'
        ],
        correctAnswer: 'A kapott gyököket be kell helyettesíteni az eredeti kiinduló egyenletbe (kötelező ellenőrzés)',
        explanation: 'Ha nem ekvivalens lépést tettünk (pl. négyzetre emelés), a gyökellenőrzés a megoldás logikai része, amivel kiszűrjük a hamis gyököket.',
        hint: 'Hogyan tudhatjuk meg biztosan, hogy egy jelölt valóban kielégíti-e az eredeti egyenletet?',
        questionTypeBadge: 'Ellenőrzés'
      },
      {
        id: 'eeq2-9',
        level: 2,
        question: 'Az alábbi lépések közül melyik EKVIVALENS a valós számok halmazán?',
        options: [
          'Mindkét oldalból köbgyököt vonunk ( ³√ )',
          'Mindkét oldalt négyzetre emeljük',
          'Mindkét oldalt megszorozzuk az ismeretlennel',
          'Mindkét oldalt elosztjuk az ismeretlennel'
        ],
        correctAnswer: 'Mindkét oldalból köbgyököt vonunk ( ³√ )',
        explanation: 'A köbgyökvonás kölcsönösen egyértelmű művelet a teljes ℝ halmazon (a páratlan kitevő megőrzi az előjelet), így ekvivalens átalakítás.',
        hint: 'A páratlan kitevő megőrzi a számok előjelét!',
        questionTypeBadge: 'Köbgyök'
      },
      {
        id: 'eeq2-10',
        level: 2,
        question: 'Egy diák az x - 5 = 0 egyenlet mindkét oldalát megszorozta x-szel, így az x(x - 5) = 0 egyenletet kapta. Milyen gyök jelent meg pluszban?',
        options: [
          'Az x = 0 hamis gyök',
          'Az x = 5 hamis gyök',
          'Az x = -5 hamis gyök',
          'Nem jelent meg hamis gyök'
        ],
        correctAnswer: 'Az x = 0 hamis gyök',
        explanation: 'Az új x szorzó miatt x = 0 is gyökké vált (0 · (-5) = 0), pedig az eredeti x - 5 = 0 egyenletnek csak az 5 volt a gyöke. A 0 hamis gyök.',
        hint: 'Milyen értéknél válik nullává az új szorzótényező?',
        questionTypeBadge: 'Hamis gyök felismerése'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Érettségi és összetett egyenletmegoldások',
    subtitle: '10 komplex feladat több lépéses levezetések elemzéséről, paraméterekről és speciális esetekről',
    range: '21–30. kérdés',
    focus: 'Hibakeresés, paraméteres egyenletek ekvivalenciája és emelt szintű buktatók',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    accentGradient: 'from-teal-600 to-emerald-700',
    questions: [
      {
        id: 'eeq3-1',
        level: 3,
        question: 'Adott az alábbi levezetés: 1) x = -2; 2) x² = 4; 3) x² - 4 = 0; 4) (x - 2)(x + 2) = 0 ⟹ x = 2 vagy x = -2. Melyik lépésben sérült az ekvivalencia?',
        options: [
          'Az 1) ⟹ 2) lépésben (négyzetre emeléskor)',
          'A 2) ⟹ 3) lépésben (4 kivonásakor)',
          'A 3) ⟹ 4) lépésben (szorzattá bontáskor)',
          'Egyik lépésben sem, a levezetés teljesen ekvivalens'
        ],
        correctAnswer: 'Az 1) ⟹ 2) lépésben (négyzetre emeléskor)',
        explanation: 'Az 1) állapotban M = {-2}. A 2) állapotban (x² = 4) M = {-2; 2}. A megoldáshalmaz bővült a 2-vel, tehát az 1) ⟹ 2) lépés nem volt ekvivalens.',
        hint: 'Melyik lépés előtt volt 1 megoldás, és utána 2 megoldás?',
        questionTypeBadge: 'Hibakeresés'
      },
      {
        id: 'eeq3-2',
        level: 3,
        question: 'Milyen a valós paraméter esetén EKVIVALENS a 2x + a = 10 és a 4x + 6 = 20 egyenlet a valós számok halmazán?',
        options: ['a = 3', 'a = 5', 'a = 0', 'Bármilyen a értékre'],
        correctAnswer: 'a = 3',
        explanation: 'A második egyenlet megoldása: 4x = 14 ⟹ x = 3,5. Az első egyenletbe behelyettesítve: 2 · 3,5 + a = 10 ⟹ 7 + a = 10 ⟹ a = 3.',
        hint: 'Oldd meg a második egyenletet x-re, majd helyettesítsd be az elsőbe!',
        questionTypeBadge: 'Paraméteres'
      },
      {
        id: 'eeq3-3',
        level: 3,
        question: 'Mi a megoldása a √(2x + 6) = x - 1 egyenletnek a valós számok halmazán?',
        options: [
          'Csak az x = 5 (az x = -1 hamis gyök)',
          'x₁ = 5 és x₂ = -1',
          'Csak az x = -1',
          'Nincs valós megoldása'
        ],
        correctAnswer: 'Csak az x = 5 (az x = -1 hamis gyök)',
        explanation: 'Négyzetre emelve: 2x + 6 = x² - 2x + 1 ⟹ x² - 4x - 5 = 0 ⟹ (x - 5)(x + 1) = 0. Ellenőrzés: x = 5: √16 = 4 (jó). x = -1: √4 = -2 (hamis, mert a gyök értéke ≥ 0). Csak x = 5.',
        hint: 'Négyzetre emelés után ellenőrizd a kapott értékeket az eredeti gyökös egyenletben!',
        questionTypeBadge: 'Gyökös ellenőrzés'
      },
      {
        id: 'eeq3-4',
        level: 3,
        question: 'Melyik állítás IGAZ az alábbi két egyenletre a valós számokon: (A) |x - 3| = 0;  (B) (x - 3)² = 0?',
        options: [
          'Ekvivalensek, mert mindkettőnek az x = 3 az egyetlen valós megoldása',
          'Nem ekvivalensek, mert az egyik abszolútértékes, a másik másodfokú',
          'Nem ekvivalensek, mert a (B)-nek két megoldása van',
          'Csak az egész számokon ekvivalensek'
        ],
        correctAnswer: 'Ekvivalensek, mert mindkettőnek az x = 3 az egyetlen valós megoldása',
        explanation: '|x - 3| = 0 ⟹ x - 3 = 0 ⟹ x = 3. (x - 3)² = 0 ⟹ x - 3 = 0 ⟹ x = 3. Mindkét egyenlet megoldáshalmaza {3}, így ekvivalensek.',
        hint: 'Mikor nulla egy abszolútérték és mikor nulla egy négyzetszám?',
        questionTypeBadge: 'Ekvivalencia-vizsgálat'
      },
      {
        id: 'eeq3-5',
        level: 3,
        question: 'Lehet-e ekvivalens két olyan egyenlet, amelyeknek egyáltalán nincs valós megoldása?',
        options: [
          'Igen, mert mindkettő megoldáshalmaza az üres halmaz (M₁ = M₂ = ∅)',
          'Nem, mert a megoldások hiányában nem tudjuk összehasonlítani őket',
          'Csak akkor, ha mindkettő azonosságra vezet',
          'Nem, az ekvivalencia feltétele a legalább egy közös gyök'
        ],
        correctAnswer: 'Igen, mert mindkettő megoldáshalmaza az üres halmaz (M₁ = M₂ = ∅)',
        explanation: 'Az ekvivalencia definíciója szerint M₁ = M₂. Ha mindkettőnek üres halmaz a megoldása (M₁ = ∅ és M₂ = ∅), akkor M₁ = M₂ teljesül, tehát ekvivalensek!',
        hint: 'Egyenlő-e az üres halmaz az üres halmazzal?',
        questionTypeBadge: 'Elméleti tétel'
      },
      {
        id: 'eeq3-6',
        level: 3,
        question: 'Egyenletmegoldás során a diák az (x - 1)(x - 2) = (x - 1)(2x + 3) egyenlet mindkét oldalát elosztotta (x - 1)-gyel. Milyen gyököt veszített el?',
        options: [
          'Az x = 1 gyököt',
          'Az x = 2 gyököt',
          'Az x = -3 gyököt',
          'Nem veszített gyököt'
        ],
        correctAnswer: 'Az x = 1 gyököt',
        explanation: 'Ha x = 1, akkor a bal oldal 0 · (-1) = 0, a jobb oldal 0 · 5 = 0, vagyis az x = 1 megoldás volt. Az (x - 1)-gyel való osztás miatt ez a gyök elveszett.',
        hint: 'Melyik x értéknél válik nullává az osztó (x - 1)?',
        questionTypeBadge: 'Gyökvesztés'
      },
      {
        id: 'eeq3-7',
        level: 3,
        question: 'Melyik az a legbővebb halmaz, amelyen az x / (x² + 1) = 0 egyenlet értelmezhető?',
        options: [
          'A valós számok teljes halmaza (ℝ)',
          'ℝ \\ {-1; 1}',
          'ℝ \\ {0}',
          'ℝ⁺'
        ],
        correctAnswer: 'A valós számok teljes halmaza (ℝ)',
        explanation: 'A nevező x² + 1. Mivel minden valós x-re x² ≥ 0, ezért x² + 1 ≥ 1 > 0. A nevező soha nem lehet nulla, így az értelmezési tartomány a teljes ℝ.',
        hint: 'Lehet-e a valós számok körében az x² + 1 értéke nulla?',
        questionTypeBadge: 'Nevező vizsgálata'
      },
      {
        id: 'eeq3-8',
        level: 3,
        question: 'Tekintsük az alábbi két egyenletet: (1) x² = x; (2) x³ = x². Ekvivalensek-e a valós számok halmazán?',
        options: [
          'Igen, mindkettő megoldáshalmaza {0; 1}',
          'Nem, mert a (2)-nek a -1 is megoldása',
          'Nem, mert fokszámuk különbözik (másodfokú vs. harmadfokú)',
          'Csak a pozitív számok halmazán ekvivalensek'
        ],
        correctAnswer: 'Igen, mindkettő megoldáshalmaza {0; 1}',
        explanation: '(1) x² - x = 0 ⟹ x(x - 1) = 0 ⟹ M₁ = {0; 1}. (2) x³ - x² = 0 ⟹ x²(x - 1) = 0 ⟹ M₂ = {0; 1}. Megoldáshalmazuk azonos, tehát ekvivalensek.',
        hint: 'Oldd meg mindkettőt kiemeléssel: x(x - 1) = 0 és x²(x - 1) = 0!',
        questionTypeBadge: 'Kiemelés és fokszám'
      },
      {
        id: 'eeq3-9',
        level: 3,
        question: 'Mi a megoldása a (2x - 6) / √(x - 3) = 0 egyenletnek a valós számok halmazán?',
        options: [
          'Nincs megoldása (M = ∅)',
          'x = 3',
          'x = 0',
          'x = 6'
        ],
        correctAnswer: 'Nincs megoldása (M = ∅)',
        explanation: 'A számláló zérushelye: 2x - 6 = 0 ⟹ x = 3. Viszont a nevezőben √(x - 3) áll, ami miatt x - 3 > 0 ⟹ x > 3 a kikötés (a gyök alatti kifejezés nem lehet 0 a nevező miatt). Mivel x = 3 nem elégíti ki a kikötést, nincs megoldás: M = ∅.',
        hint: 'Lehet-e a tört nevezője nulla, vagy a gyök alatt nulla?',
        questionTypeBadge: 'Kikötési csapda'
      },
      {
        id: 'eeq3-10',
        level: 3,
        question: 'Miért hibás az alábbi „bizonyítás”, mely szerint 1 = 2? Legyen a = b. 1) a² = ab; 2) a² - b² = ab - b²; 3) (a - b)(a + b) = b(a - b); 4) a + b = b; 5) 2b = b ⟹ 2 = 1.',
        options: [
          'A 3) ⟹ 4) lépésben leosztottunk (a - b)-vel, ami a = b miatt nullával való osztást jelentett',
          'Az 1) ⟹ 2) lépésben b² kivonása nem ekvivalens',
          'A 4) ⟹ 5) lépésben a = b helyettesítés helytelen',
          'A 2) ⟹ 3) lépésben a szorzattá bontás hibás'
        ],
        correctAnswer: 'A 3) ⟹ 4) lépésben leosztottunk (a - b)-vel, ami a = b miatt nullával való osztást jelentett',
        explanation: 'Mivel a = b-ből indultunk ki, az a - b különbség pontosan 0! A 4. lépésben mindkét oldalt leosztották (a - b)-vel, ami nullával való osztás, ez pedig szigorúan tilos.',
        hint: 'Mennyi a - b értéke, ha a = b?',
        questionTypeBadge: 'Klasszikus paradoxon'
      }
    ]
  }
};

export const EquivalentEquationsQuiz: React.FC<EquivalentEquationsQuizProps> = (props) => {
  return (
    <QuizTemplate
      title="Ekvivalens egyenletek Kvíz"
      subtitle="Teszteld a tudásodat a mérlegelv, az ekvivalens átalakítások, a hamis gyökök és a gyökvesztés felismerésében!"
      topicId="g10-eq-ekvivalens-egyenletek-quiz"
      topicTitle="Ekvivalens egyenletek"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={
        <EquivalentEquationsMatcher
          onBack={props.onBack}
          onSwitchToTheory={props.onSwitchToTheory}
          onSwitchToQuiz={props.onBack}
        />
      }
      sorterComponent={
        <EquivalentEquationsSorter
          onBack={props.onBack}
          onSwitchToTheory={props.onSwitchToTheory}
          onSwitchToQuiz={props.onBack}
        />
      }
      {...props}
    />
  );
};

export default EquivalentEquationsQuiz;

