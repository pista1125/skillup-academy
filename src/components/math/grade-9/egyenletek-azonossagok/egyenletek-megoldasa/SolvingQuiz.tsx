import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { SolvingMatcher } from './SolvingMatcher';
import { SolvingSorter } from './SolvingSorter';
import {
  SolvingAlgorithmSvg,
  BracketExpansionSvg,
  CommonDenominatorSvg,
  EquivalenceChainSvg
} from './SolvingFigures';
import { ArrowRightLeft, LayoutGrid, Scale, Divide, Zap, CheckCircle2 } from 'lucide-react';

interface SolvingQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Mérlegelv és Zárójelbontás (Könnyű)',
    subtitle: 'Zárójeles lineáris egyenletek, mérlegelvi alaplépések és összevonás.',
    range: '1 - 10. feladat',
    focus: 'Mérlegelv és Zárójeles Egyenletek',
    questions: [
      {
        id: 'sq1-1',
        questionTypeBadge: 'Megoldási Algoritmus',
        question: 'Melyik lépést célszerű elvégezni az egynemű tagok összevonása előtt?',
        figure: <SolvingAlgorithmSvg size={170} />,
        options: [
          'A zárójelek felbontását és a törtek eltüntetését beszorzással',
          'Azonnal elosztani az egyenletet az ismeretlen együtthatójával',
          'Négyzetre emelni mindkét oldalt',
          'Csak a bal oldalból kivonni az ismeretlent'
        ],
        correctAnswer: 0,
        hint: 'A zárójelekben lévő tagokat először ki kell szabadítani a műveleti sorrend szerint.',
        explanation: 'A szisztematikus sorrend: 1. Kikötés → 2. Zárójelbontás → 3. Törtek eltüntetése → 4. Összevonás → 5. Mérlegelv → 6. Osztás és ellenőrzés.'
      },
      {
        id: 'sq1-2',
        questionTypeBadge: 'Zárójelbontás Szorzóval',
        question: 'Hogyan bontjuk fel helyesen a 3(2x - 5) kifejezést?',
        figure: <BracketExpansionSvg size={170} />,
        options: ['6x - 15', '6x - 5', '5x - 15', '6x + 15'],
        correctAnswer: 0,
        hint: 'A 3-mal mindkét belső tagot meg kell szorozni: 3 · 2x és 3 · (-5).',
        explanation: '3 · (2x - 5) = 3 · 2x - 3 · 5 = 6x - 15.'
      },
      {
        id: 'sq1-3',
        questionTypeBadge: 'Zárójel Előtti Mínusz',
        question: 'Milyen alakra egyszerűsödik a -(4x - 7) kifejezés a zárójel elhagyása után?',
        options: ['-4x + 7', '-4x - 7', '4x + 7', '4x - 7'],
        correctAnswer: 0,
        hint: 'A zárójel előtti mínuszjel minden belső előjelet megfordít: -(+4x) = -4x és -(-7) = +7.',
        explanation: '-(4x - 7) = (-1) · (4x - 7) = -4x + 7.'
      },
      {
        id: 'sq1-4',
        questionTypeBadge: 'Egyszerű Zárójeles Egyenlet',
        question: 'Mi a 2(x + 3) = 14 egyenlet gyöke a valós számok halmazán?',
        options: ['x = 4', 'x = 5', 'x = 7', 'x = 8'],
        correctAnswer: 0,
        hint: '2x + 6 = 14 → 2x = 8.',
        explanation: '2x + 6 = 14 → 2x = 8 → x = 4. Ellenőrzés: 2 · (4 + 3) = 2 · 7 = 14.'
      },
      {
        id: 'sq1-5',
        questionTypeBadge: 'Zárójeles és Konstans Tag',
        question: 'Mi a megoldása az 5(x - 2) + 3 = 18 egyenletnek?',
        options: ['x = 5', 'x = 4', 'x = 6', 'x = 3'],
        correctAnswer: 0,
        hint: '5x - 10 + 3 = 18 → 5x - 7 = 18.',
        explanation: '5x - 10 + 3 = 18 → 5x - 7 = 18 → 5x = 25 → x = 5.'
      },
      {
        id: 'sq1-6',
        questionTypeBadge: 'Kétoldali Ismeretlen',
        question: 'Mi az x értéke a 4x + 7 = 2x + 19 egyenletben?',
        options: ['x = 6', 'x = 12', 'x = 4', 'x = 5'],
        correctAnswer: 0,
        hint: 'Vonj ki 2x-et mindkét oldalból: 2x + 7 = 19.',
        explanation: '4x + 7 = 2x + 19 → 2x + 7 = 19 → 2x = 12 → x = 6.'
      },
      {
        id: 'sq1-7',
        questionTypeBadge: 'Rendezési Stratégia',
        question: 'Hogyan célszerű rendezni a 7x - 5 = 3x + 15 egyenletet a negatív előjelek elkerüléséhez?',
        options: [
          'Mindkét oldalból kivonunk 3x-et, így bal oldalon 4x marad',
          'Mindkét oldalból kivonunk 7x-et, így bal oldalon -5 marad',
          'Mindkét oldalt elosztjuk 7-tel',
          'Összeadjuk a két oldalt'
        ],
        correctAnswer: 0,
        hint: 'A kisebb együtthatójú x-es tagot (3x) érdemes kivonni mindkét oldalból.',
        explanation: 'Ha a kisebb 3x-et vonjuk ki: 7x - 3x - 5 = 15 → 4x - 5 = 15, az x együtthatója pozitív (+4) marad.'
      },
      {
        id: 'sq1-8',
        questionTypeBadge: 'Osztásos Alapegyenlet',
        question: 'Mi a gyöke az x / 4 + 3 = 7 egyenletnek?',
        options: ['x = 16', 'x = 12', 'x = 28', 'x = 4'],
        correctAnswer: 0,
        hint: 'Vonj ki 3-at: x / 4 = 4. Majd szorozz 4-gyel!',
        explanation: 'x / 4 + 3 = 7 → x / 4 = 4 → x = 16.'
      },
      {
        id: 'sq1-9',
        questionTypeBadge: 'Zárójelbontás és Osztás',
        question: 'Mi a megoldása a 2(3x - 1) = 16 egyenletnek?',
        options: ['x = 3', 'x = 4', 'x = 2', 'x = 5'],
        correctAnswer: 0,
        hint: '6x - 2 = 16 → 6x = 18.',
        explanation: '6x - 2 = 16 → 6x = 18 → x = 3.'
      },
      {
        id: 'sq1-10',
        questionTypeBadge: 'Negatív Ismeretlen Izolálása',
        question: 'Mi a helyes teendő, ha a mérlegelvi levezetés végén -x = 5 adódik?',
        options: [
          'Mindkét oldalt megszorozzuk vagy elosztjuk (-1)-gyel: x = -5',
          'Elhagyjuk a mínuszjelet: x = 5',
          'Az egyenletnek nincs megoldása',
          'x = 1/5 lesz az eredmény'
        ],
        correctAnswer: 0,
        hint: '-x valójában (-1) · x. Oszd el (-1)-gyel!',
        explanation: '-x = 5 → (-1) · x = 5 → x = 5 / (-1) = -5.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Törtes Egyenletek és Közös Nevező (Közepes)',
    subtitle: 'Törtek felszámolása legkisebb közös többszörössel, zárójeles törtvonalak.',
    range: '11 - 20. feladat',
    focus: 'Törtes Egyenletek és LKKT',
    questions: [
      {
        id: 'sq2-1',
        questionTypeBadge: 'Közös Nevező Kiválasztása',
        question: 'Melyik a legkisebb szám, amellyel beszorozva az x / 3 + x / 4 = 7 egyenlet mindkét oldalát eltűnnek a törtek?',
        figure: <CommonDenominatorSvg size={170} />,
        options: ['12', '7', '24', '6'],
        correctAnswer: 0,
        hint: 'A 3 és 4 legkisebb közös többszöröse (LKKT).',
        explanation: 'LKKT(3, 4) = 12. Mindkét oldalt 12-vel szorozva: 4x + 3x = 84.'
      },
      {
        id: 'sq2-2',
        questionTypeBadge: 'Törtes Egyenlet Levezetése',
        question: 'Mi az x / 3 + x / 4 = 7 egyenlet gyöke?',
        options: ['x = 12', 'x = 14', 'x = 84', 'x = 7'],
        correctAnswer: 0,
        hint: '12-vel beszorozva: 4x + 3x = 84 → 7x = 84.',
        explanation: '4x + 3x = 84 → 7x = 84 → x = 12. Ellenőrzés: 12/3 + 12/4 = 4 + 3 = 7.'
      },
      {
        id: 'sq2-3',
        questionTypeBadge: 'Egytagú Törtes Egyenlet',
        question: 'Mennyi az x értéke a (2x - 1) / 5 = 3 egyenletben?',
        options: ['x = 8', 'x = 7', 'x = 16', 'x = 15'],
        correctAnswer: 0,
        hint: 'Szorozz mindkét oldalt 5-tel: 2x - 1 = 15.',
        explanation: '2x - 1 = 15 → 2x = 16 → x = 8.'
      },
      {
        id: 'sq2-4',
        questionTypeBadge: 'Tört Két Oldalon (Keresztszorzás)',
        question: 'Mi a megoldása az (x + 2) / 3 = (x - 1) / 2 egyenletnek?',
        options: ['x = 7', 'x = 5', 'x = 1', 'x = -7'],
        correctAnswer: 0,
        hint: 'Beszorozva 6-tal: 2(x + 2) = 3(x - 1) → 2x + 4 = 3x - 3.',
        explanation: '2x + 4 = 3x - 3 → 4 + 3 = 3x - 2x → x = 7.'
      },
      {
        id: 'sq2-5',
        questionTypeBadge: 'Törtvonal előtti Mínusz Csapdája',
        question: 'Mi lesz a -(x - 3) / 4 kifejezésből, ha mindkét oldalt beszorozzuk 12-vel?',
        options: ['-3(x - 3) = -3x + 9', '-3x - 9', '3x - 9', '-3x - 3'],
        correctAnswer: 0,
        hint: '12 / 4 = 3, de a tört előtti mínusz a teljes számlálóra vonatkozik: -3 · (x - 3)!',
        explanation: 'A törtvonal zárójelet helyettesít: - [12/4 · (x - 3)] = -3(x - 3) = -3x + 9.'
      },
      {
        id: 'sq2-6',
        questionTypeBadge: 'Összetett Törtes Egyenlet',
        question: 'Mi a megoldása az (x - 1) / 2 + (x + 1) / 3 = 5 egyenletnek?',
        options: ['x = 6,2', 'x = 6', 'x = 5', 'x = 7'],
        correctAnswer: 0,
        hint: 'Szorozz 6-tal: 3(x - 1) + 2(x + 1) = 30 → 3x - 3 + 2x + 2 = 30.',
        explanation: '5x - 1 = 30 → 5x = 31 → x = 31 / 5 = 6,2.'
      },
      {
        id: 'sq2-7',
        questionTypeBadge: 'Tört és Egész Tag Egyenlet',
        question: 'Mi a (3x - 5) / 2 = x + 1 egyenlet megoldása?',
        options: ['x = 7', 'x = 6', 'x = 5', 'x = 8'],
        correctAnswer: 0,
        hint: 'Szorozz 2-vel: 3x - 5 = 2(x + 1) = 2x + 2.',
        explanation: '3x - 5 = 2x + 2 → x - 5 = 2 → x = 7.'
      },
      {
        id: 'sq2-8',
        questionTypeBadge: 'Két Zárójeles Tag Összevonása',
        question: 'Mi a megoldása a 3(x + 2) - 2(x - 3) = 15 egyenletnek?',
        options: ['x = 3', 'x = 5', 'x = 1', 'x = 4'],
        correctAnswer: 0,
        hint: '3x + 6 - 2x + 6 = 15 → x + 12 = 15.',
        explanation: '3x + 6 - 2x + 6 = 15 → x + 12 = 15 → x = 3.'
      },
      {
        id: 'sq2-9',
        questionTypeBadge: 'Azonosság Megkülönböztetése',
        question: 'Melyik egyenlőség AZONOSSÁG az alábbiak közül?',
        options: [
          '3(2x - 4) = 6x - 12',
          '3(2x - 4) = 6x + 12',
          '2x + 5 = 15',
          'x + 1 = x + 3'
        ],
        correctAnswer: 0,
        hint: 'Bontsd fel a zárójelet: 3 · 2x - 3 · 4 = 6x - 12. Mindkét oldal azonos!',
        explanation: 'A 3(2x - 4) felbontva pontosan 6x - 12, így a bal és jobb oldal minden valós x-re megegyezik: azonosság.'
      },
      {
        id: 'sq2-10',
        questionTypeBadge: '0-val Való Szorzás Tilalma',
        question: 'Miért NEM megengedett egyenletmegoldáskor mindkét oldalt megszorozni 0-val?',
        options: [
          'Mert a 0 = 0 azonosságot eredményez minden egyenletre, teljesen megsemmisítve az információt',
          'Mert a számológép hibát jelez',
          'Mert negatív számot kapnánk',
          'Mert a jobb oldal kétszeresére nő'
        ],
        correctAnswer: 0,
        hint: 'Bármit szorzol 0-val, 0 lesz: az x + 5 = 9 egyenletből is 0 = 0 lenne.',
        explanation: 'A 0-val való szorzás nem ekvivalens átalakítás: minden egyenletből a mindig igaz 0 = 0-t hozza létre, elveszítve a gyököket.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Egyenletek és Speciális Esetek (Nehéz)',
    subtitle: 'Többtagú törtes-zárójeles egyenletek, azonosság és ellentmondás levezetése.',
    range: '21 - 30. feladat',
    focus: 'Összetett Elsőfokú Egyenletek és Speciális Esetek',
    questions: [
      {
        id: 'sq3-1',
        questionTypeBadge: 'Összetett Törtes Levezetés',
        question: 'Mi a megoldása a (2x - 1)/3 - (x + 2)/4 = 1 egyenletnek?',
        figure: <EquivalenceChainSvg size={170} />,
        options: ['x = 4,4', 'x = 4', 'x = 5,2', 'x = 3,8'],
        correctAnswer: 0,
        hint: 'Szorozz 12-vel: 4(2x - 1) - 3(x + 2) = 12 → 8x - 4 - 3x - 6 = 12.',
        explanation: '5x - 10 = 12 → 5x = 22 → x = 22 / 5 = 4,4.'
      },
      {
        id: 'sq3-2',
        questionTypeBadge: 'Azonosság Levezetése',
        question: 'Mi az 5(x - 2) - 2(3x - 1) = 4 - (x + 12) egyenlet megoldáshalmaza?',
        options: [
          'M = ℝ (minden valós szám, azonosság)',
          'M = ∅ (nincs megoldás)',
          'x = 0',
          'x = 12'
        ],
        correctAnswer: 0,
        hint: 'Bal oldal: 5x - 10 - 6x + 2 = -x - 8. Jobb oldal: 4 - x - 12 = -x - 8.',
        explanation: 'Mivel mindkét oldal pontosan -x - 8-cal egyenlő (-x - 8 = -x - 8), az egyenlőség minden valós számra igaz: M = ℝ.'
      },
      {
        id: 'sq3-3',
        questionTypeBadge: 'Ellentmondás Levezetése',
        question: 'Mi a 4(x + 2) - 3(x - 1) = x + 15 egyenlet megoldása?',
        options: [
          'M = ∅ (nincs megoldás, ellentmondás)',
          'M = ℝ',
          'x = 4',
          'x = 15'
        ],
        correctAnswer: 0,
        hint: 'Bal oldal: 4x + 8 - 3x + 3 = x + 11. Egyenlet: x + 11 = x + 15.',
        explanation: 'x kivonása után 11 = 15 marad, ami sosem teljesül: ellentmondás, M = ∅.'
      },
      {
        id: 'sq3-4',
        questionTypeBadge: 'Közös Nevezős Törtes',
        question: 'Mennyi a gyöke az (x + 1)/6 - (2x - 3)/4 = 1/12 egyenletnek?',
        options: ['x = 2,5', 'x = 3', 'x = 2', 'x = 1,5'],
        correctAnswer: 0,
        hint: 'LKKT = 12. 2(x + 1) - 3(2x - 3) = 1 → 2x + 2 - 6x + 9 = 1.',
        explanation: '-4x + 11 = 1 → -4x = -10 → x = -10 / (-4) = 2,5.'
      },
      {
        id: 'sq3-5',
        questionTypeBadge: 'Tizedestörtes Egyenlet',
        question: 'Mi az 0,4x - 1,2 = 0,1x + 0,6 egyenlet megoldása?',
        options: ['x = 6', 'x = 5', 'x = 4', 'x = 8'],
        correctAnswer: 0,
        hint: 'Szorozz be 10-zel: 4x - 12 = x + 6 → 3x = 18.',
        explanation: '3x - 12 = 6 → 3x = 18 → x = 6.'
      },
      {
        id: 'sq3-6',
        questionTypeBadge: 'Törtes Együttható Keresztszorzással',
        question: 'Mi a 3(x - 1) / 5 = 2(x + 2) / 3 egyenlet gyöke?',
        options: ['x = -29', 'x = 29', 'x = -19', 'x = 19'],
        correctAnswer: 0,
        hint: 'Beszorozva 15-tel: 9(x - 1) = 10(x + 2) → 9x - 9 = 10x + 20.',
        explanation: '9x - 9 = 10x + 20 → -9 - 20 = 10x - 9x → -29 = x.'
      },
      {
        id: 'sq3-7',
        questionTypeBadge: 'Közös Nevező és Szabad Tag',
        question: 'Ha az x / 2 + 1 = 3 egyenletet beszorozzuk 2-vel, mi lesz a helyes alak?',
        options: [
          'x + 2 = 6 (a szabad tagot is szorozzuk!)',
          'x + 1 = 6',
          'x + 2 = 3',
          'x + 1 = 3'
        ],
        correctAnswer: 0,
        hint: 'A mérlegelv szerint MINDEN tagot meg kell szorozni a 2-vel: (x/2)·2 + 1·2 = 3·2.',
        explanation: 'A mérlegelv szigorú szabálya, hogy a szorzás az egyenlet minden egyes tagjára kiterjed: x + 2 = 6.'
      },
      {
        id: 'sq3-8',
        questionTypeBadge: 'Törtes és Ismeretlen Tag',
        question: 'Mi a gyöke az x - (x - 1)/3 = (x + 2)/2 egyenletnek?',
        options: ['x = 4', 'x = 5', 'x = 3', 'x = 6'],
        correctAnswer: 0,
        hint: 'LKKT = 6. 6x - 2(x - 1) = 3(x + 2) → 6x - 2x + 2 = 3x + 6.',
        explanation: '4x + 2 = 3x + 6 → x = 4. Ellenőrzés: 4 - 3/3 = 3; (4+2)/2 = 3. 3 = 3!'
      },
      {
        id: 'sq3-9',
        questionTypeBadge: 'Kétoldali Ellenőrzés Szabálya',
        question: 'Hogyan igazolható megbízhatóan, hogy az x = 4 valóban gyöke a fenti egyenletnek?',
        options: [
          'Külön kiszámoljuk a bal oldal értékét B(4)=3, a jobb oldalét J(4)=3, és egyenlők',
          'Elég megnézni a levezetés utolsó sorát',
          'Ha a kapott szám egész szám, automatikusan helyes',
          'Megnézzük a tankönyv végén az eredményt'
        ],
        correctAnswer: 0,
        hint: 'B(x₀) és J(x₀) külön-külön kiszámítása az eredeti egyenletbe való beírással.',
        explanation: 'A kétoldali független behelyettesítés: B(4) = 4 - 3/3 = 3 és J(4) = 6/2 = 3. Mivel B(4) = J(4), a megoldás bizonyítottan helyes.'
      },
      {
        id: 'sq3-10',
        questionTypeBadge: '0x = 0 Végeredmény',
        question: 'Egyenlet átalakítása után a 0 · x = 0 összefüggéshez jutunk. Mi a megoldáshalmaz a valós számokon?',
        options: [
          'M = ℝ (minden valós szám megoldás)',
          'M = {0} (csak a nulla)',
          'M = ∅ (nincs megoldás)',
          'x = 1'
        ],
        correctAnswer: 0,
        hint: 'Bármilyen számot szorzol 0-val, 0-t kapsz: 0 = 0 mindig igaz!',
        explanation: '0 · x = 0 minden valós x esetén teljesül, így az egyenlet azonosság: M = ℝ.'
      }
    ]
  }
};

const cheatSheetData: CheatSheetCard[] = [
  {
    title: '1. A 6 Lépéses Megoldási Menet',
    badge: 'Módszertan',
    points: [
      '1. Kikötések (É.T. meghatározása).',
      '2. Zárójelek felbontása (disztributivitás).',
      '3. Törtek eltüntetése (LKKT-vel való szorzás).',
      '4. Mindkét oldalon egynemű tagok összevonása.',
      '5. Mérlegelvvel rendezés: x balra, számok jobbra.',
      '6. Osztás x együtthatójával, majd ellenőrzés!'
    ]
  },
  {
    title: '2. Zárójelbontás & Mínuszjelek',
    badge: 'Előjelszabályok',
    points: [
      'a(b + c) = ab + ac: minden tagot szorozni kell!',
      'Zárójel előtti mínuszjel: -(2x - 5) = -2x + 5 (minden előjel fordul).',
      '-(x - 3)/4 beszorozva 12-vel: -3(x - 3) = -3x + 9!'
    ]
  },
  {
    title: '3. Törtes Egyenletek & LKKT',
    badge: 'Közös nevező',
    points: [
      'Szorozd meg mindkét oldalt a nevezők legkisebb közös többszörösével.',
      'MINDEN tagot meg kell szorozni, a tört nélküli konstansokat is!',
      'Keresztszorzás: a/b = c/d esetén a · d = b · c.'
    ]
  },
  {
    title: '4. Speciális Esetek & Ellenőrzés',
    badge: 'Kimenetelek',
    points: [
      'Egyértelmű gyök: ax = b → x = b/a.',
      'Azonosság: 0x = 0 → M = ℝ (minden valós szám).',
      'Ellentmondás: 0x = c (c ≠ 0) → M = ∅ (nincs megoldás).',
      'Ellenőrzés: mindig az EREDETI egyenlet B(x) és J(x) oldalába külön-külön!'
    ]
  }
];

export const SolvingQuiz: React.FC<SolvingQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Egyenletek Megoldása – Gyakorló Kvíz"
      subtitle="30 válogatott feladat 3 szinten a mérlegelv, zárójeles és törtes egyenletek szisztematikus levezetéséből"
      badgeText="9. OSZTÁLY • III. EGYENLETEK ÉS AZONOSSÁGOK • 8. TÉMAKÖR"
      themeColor="teal"
      storageKey="grade9-solving-quiz-score"
      levels={quizLevels}
      cheatSheet={cheatSheetData}
      grade={9}
      chapterId="egyenletek-azonossagok"
      topicId="g9-egyenlet-megoldasa-quiz"
      topicTitle="Egyenletek megoldása"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd az egyenleteket a lépéseikkel és megoldásaikkal!',
          badgeText: '6 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-teal-600 dark:text-teal-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <SolvingMatcher
              key={`solving-matcher-${level}`}
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
          subtitle: 'Kategorizáld az egyenleteket azonnali lépésük és gyökük típusa szerint!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <SolvingSorter
              key={`solving-sorter-${level}`}
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

