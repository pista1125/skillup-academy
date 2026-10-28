import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { LinearSystemsMatcher } from './LinearSystemsMatcher';
import { LinearSystemsSorter } from './LinearSystemsSorter';
import {
  LinearSystemComparisonSvg,
  SystemIntersectionSvg,
  SubstitutionWorkflowSvg,
  EliminationWorkflowSvg
} from './LinearSystemsFigures';
import { ArrowRightLeft, LayoutGrid, Repeat, Calculator, Trophy, CheckCircle2 } from 'lucide-react';

interface LinearSystemsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Rendszerek és Behelyettesítés (Könnyű)',
    subtitle: 'Rendezett számpárok, egyszerű behelyettesítés és ellentett együtthatók összeadása.',
    range: '1 - 10. feladat',
    focus: 'Behelyettesítés és Egyszerű Összeadás',
    questions: [
      {
        id: 'lsq1-1',
        questionTypeBadge: 'Az Egyenletrendszer Fogalma',
        question: 'Mit nevezünk egy elsőfokú kétismeretlenes egyenletrendszer megoldásának?',
        figure: <LinearSystemComparisonSvg size={170} />,
        options: [
          'Olyan (x; y) rendezett számpárt, amely mindkét egyenletet egyszerre kielégíti',
          'Két tetszőleges számot, amelyek összege 10',
          'Csak az x ismeretlen értékét',
          'Bármelyik számot, amely az első egyenletbe illik'
        ],
        correctAnswer: 0,
        hint: 'Két ismeretlen van (x és y), és a megoldásnak MINDKÉT egyenletre egyszerre igaznak kell lennie.',
        explanation: 'A megoldás egy (x; y) rendezett számpár, amelyet behelyettesítve mind az I., mind a II. egyenlet bal és jobb oldala megegyezik.'
      },
      {
        id: 'lsq1-2',
        questionTypeBadge: 'Összeg és Különbség Rendszere',
        question: 'Mi az x + y = 10 és x - y = 4 egyenletrendszer megoldása?',
        options: ['(x; y) = (7; 3)', '(x; y) = (6; 4)', '(x; y) = (8; 2)', '(x; y) = (5; 5)'],
        correctAnswer: 0,
        hint: 'Adjuk össze a két egyenletet: (x + x) + (y - y) = 10 + 4 → 2x = 14.',
        explanation: '2x = 14 → x = 7. Visszahelyettesítve: 7 + y = 10 → y = 3. Ellenőrzés: 7 - 3 = 4.'
      },
      {
        id: 'lsq1-3',
        questionTypeBadge: 'Közvetlen Behelyettesítés',
        question: 'Ha x = 2y és x + y = 12, mennyi az (x; y) számpár?',
        figure: <SubstitutionWorkflowSvg size={170} />,
        options: ['(x; y) = (8; 4)', '(x; y) = (6; 3)', '(x; y) = (4; 8)', '(x; y) = (10; 2)'],
        correctAnswer: 0,
        hint: 'Helyettesíts 2y-t az x helyére: 2y + y = 12 → 3y = 12.',
        explanation: '3y = 12 → y = 4. x = 2 · 4 = 8. Megoldás: (8; 4).'
      },
      {
        id: 'lsq1-4',
        questionTypeBadge: 'Ismert Érték Beírása',
        question: 'Adott a 2x + y = 11 egyenletrendszer, ahol y = 3. Mennyi az x értéke?',
        options: ['x = 4', 'x = 7', 'x = 5', 'x = 3'],
        correctAnswer: 0,
        hint: '2x + 3 = 11 → 2x = 8.',
        explanation: '2x + 3 = 11 → 2x = 8 → x = 4. A számpár: (4; 3).'
      },
      {
        id: 'lsq1-5',
        questionTypeBadge: 'Módszerválasztás',
        question: 'Melyik módszer a leggyorsabb, ha az egyik egyenletben +y, a másikban -y szerepel?',
        options: [
          'A két egyenlet összeadása (egyenlő együtthatók módszere), mert y azonnal kiesik',
          'Négyzetre emelni mindkét egyenletet',
          'Kifejezni az y-t mindkettőből és osztani',
          'Grafikont rajzolni'
        ],
        correctAnswer: 0,
        hint: '+y és -y összege nulla: (+y) + (-y) = 0.',
        explanation: 'Ellentett együtthatók esetén a két egyenletet összeadva az adott ismeretlen azonnal eliminálódik (kiesik).'
      },
      {
        id: 'lsq1-6',
        questionTypeBadge: 'Összeadásos Levezetés',
        question: 'Oldd meg fejben: x + y = 9 és 2x - y = 6. Mennyi az x értéke?',
        options: ['x = 5', 'x = 4', 'x = 3', 'x = 6'],
        correctAnswer: 0,
        hint: 'Adjuk össze a két egyenletet: (x + 2x) = 9 + 6 → 3x = 15.',
        explanation: '3x = 15 → x = 5. (y = 4, mert 5 + 4 = 9).'
      },
      {
        id: 'lsq1-7',
        questionTypeBadge: 'Formális Jelölés',
        question: 'Hogyan jelöljük szabályosan az egyenletrendszer megoldáshalmazát, ha x = 2 és y = 5?',
        options: ['M = {(2; 5)}', 'M = {2, 5}', 'M = (2; 5)', 'x = 2; y = 5 halmaz nélkül'],
        correctAnswer: 0,
        hint: 'A halmazjelek ({}) közé rendezett számpár kerek zárójelben kerül: {(x; y)}.',
        explanation: 'A megoldáshalmaz eleme a rendezett pár: M = {(2; 5)}.'
      },
      {
        id: 'lsq1-8',
        questionTypeBadge: 'Számpár Tesztelése',
        question: 'Megoldása-e a (3; 1) számpár a 2x + y = 7 és x - 2y = 1 egyenletrendszernek?',
        options: [
          'Igen, mert mindkét egyenletbe behelyettesítve igaz állítást kapunk',
          'Nem, mert csak az elsőbe jó',
          'Nem, mert csak a másodikba jó',
          'Csak akkor, ha felcseréljük a számokat'
        ],
        correctAnswer: 0,
        hint: 'I. 2·3 + 1 = 7 (igaz). II. 3 - 2·1 = 1 (igaz).',
        explanation: 'Mivel 2·3 + 1 = 7 és 3 - 2·1 = 1 is igaz, a (3; 1) számpár valóban megoldás.'
      },
      {
        id: 'lsq1-9',
        questionTypeBadge: 'Kivonásos Megoldás',
        question: 'Mi az x értéke a 3x - y = 8 és y = 1 rendszerben?',
        options: ['x = 3', 'x = 4', 'x = 2', 'x = 9'],
        correctAnswer: 0,
        hint: '3x - 1 = 8 → 3x = 9.',
        explanation: '3x - 1 = 8 → 3x = 9 → x = 3.'
      },
      {
        id: 'lsq1-10',
        questionTypeBadge: 'Együtthatók Összeadása',
        question: 'Mi a megoldása az x + 2y = 8 és x - 2y = 0 egyenletrendszernek?',
        options: ['(x; y) = (4; 2)', '(x; y) = (2; 4)', '(x; y) = (6; 1)', '(x; y) = (8; 0)'],
        correctAnswer: 0,
        hint: 'Összeadva: 2x = 8 → x = 4. 4 - 2y = 0 → 2y = 4 → y = 2.',
        explanation: '2x = 8 → x = 4. 4 + 2y = 8 → 2y = 4 → y = 2. Megoldás: (4; 2).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Egyenlő Együtthatók és Szöveges Rendszerek (Közepes)',
    subtitle: 'Beszorzás ellentett együtthatókra, fejek és lábak, pénzérmés szöveges feladatok.',
    range: '11 - 20. feladat',
    focus: 'Kiküszöbölés és Szöveges Feladatok',
    questions: [
      {
        id: 'lsq2-1',
        questionTypeBadge: 'Beszorzásos Kiküszöbölés',
        question: 'Mivel kell megszorozni a II. egyenletet a 2x + 3y = 13 és x - y = 4 rendszerben, hogy y kiessen az összeadáskor?',
        figure: <EliminationWorkflowSvg size={170} />,
        options: ['3-mal (így -3y lesz)', '-2-vel', '2-vel', '4-gyel'],
        correctAnswer: 0,
        hint: 'A felső egyenletben +3y van. Az ellentettje -3y lenne.',
        explanation: 'Ha a II. egyenletet 3-mal szorozzuk: 3x - 3y = 12. Ekkor +3y és -3y kiejtik egymást összeadáskor.'
      },
      {
        id: 'lsq2-2',
        questionTypeBadge: 'Rendszer Megoldása',
        question: 'Mi a fenti rendszer (2x + 3y = 13 és x - y = 4) megoldáspárja?',
        options: ['(x; y) = (5; 1)', '(x; y) = (4; 0)', '(x; y) = (6; 2)', '(x; y) = (3; -1)'],
        correctAnswer: 0,
        hint: '2x + 3y = 13 és 3x - 3y = 12 összeadva: 5x = 25 → x = 5. y = x - 4 = 1.',
        explanation: '5x = 25 → x = 5. y = 5 - 4 = 1. Ellenőrzés: 2·5 + 3·1 = 13.'
      },
      {
        id: 'lsq2-3',
        questionTypeBadge: 'Számok Összege és Különbsége',
        question: 'Két szám összege 35, különbsége 11. Melyik ez a két szám?',
        options: ['23 és 12', '24 és 11', '22 és 13', '20 és 15'],
        correctAnswer: 0,
        hint: 'x + y = 35 és x - y = 11. Összeadva 2x = 46.',
        explanation: '2x = 46 → x = 23. y = 35 - 23 = 12. Ellenőrzés: 23 - 12 = 11.'
      },
      {
        id: 'lsq2-4',
        questionTypeBadge: 'Fejek és Lábak Feladat',
        question: 'Egy udvarban csirkék (2 láb) és nyulak (4 láb) szaladgálnak. Összesen 15 fej és 44 láb van. Hány nyúl van?',
        options: ['7 nyúl', '8 nyúl', '6 nyúl', '9 nyúl'],
        correctAnswer: 0,
        hint: 'cs + ny = 15 és 2cs + 4ny = 44. Szorozd az elsőt 2-vel: 2cs + 2ny = 30.',
        explanation: '(2cs + 4ny) - (2cs + 2ny) = 44 - 30 → 2ny = 14 → ny = 7 nyúl (és 8 csirke: 8·2 + 7·4 = 16 + 28 = 44).'
      },
      {
        id: 'lsq2-5',
        questionTypeBadge: 'Pénzérmék Értéke',
        question: 'Összesen 20 darab 50 és 100 Ft-os érménk van, értékük együtt 1400 Ft. Hány darab 100 Ft-osunk van?',
        options: ['8 db', '10 db', '12 db', '6 db'],
        correctAnswer: 0,
        hint: 'x + y = 20 és 50x + 100y = 1400. Szorozd az elsőt 50-nel: 50x + 50y = 1000.',
        explanation: '50y = 400 → y = 8 db 100 Ft-os (és 12 db 50 Ft-os: 12·50 + 8·100 = 600 + 800 = 1400 Ft).'
      },
      {
        id: 'lsq2-6',
        questionTypeBadge: 'Kétismeretlenes Levezetés',
        question: 'Mi a megoldása a 3x + 2y = 16 és 5x - 2y = 0 egyenletrendszernek?',
        options: ['(x; y) = (2; 5)', '(x; y) = (4; 2)', '(x; y) = (3; 3,5)', '(x; y) = (2; 4)'],
        correctAnswer: 0,
        hint: 'Összeadva: 8x = 16 → x = 2. 5·2 - 2y = 0 → 2y = 10 → y = 5.',
        explanation: '8x = 16 → x = 2. 3·2 + 2y = 16 → 2y = 10 → y = 5. Megoldás: (2; 5).'
      },
      {
        id: 'lsq2-7',
        questionTypeBadge: 'Téglalap Geometriai Modell',
        question: 'Egy téglalap kerülete 28 cm. A hosszúsága 2 cm-rel nagyobb a szélességénél. Mennyi a hossza és szélessége?',
        options: ['8 cm és 6 cm', '9 cm és 5 cm', '10 cm és 4 cm', '7 cm és 7 cm'],
        correctAnswer: 0,
        hint: '2(a + b) = 28 → a + b = 14. Másik egyenlet: a - b = 2.',
        explanation: 'Összeadva: 2a = 16 → a = 8 cm. b = 14 - 8 = 6 cm. Kerület: 2·(8+6) = 28 cm.'
      },
      {
        id: 'lsq2-8',
        questionTypeBadge: 'Kivonásos Kiküszöbölés',
        question: 'Oldd meg: 4x + 3y = 18 és 2x + 3y = 12. Mi a legegyszerűbb lépés?',
        options: [
          'Kivonjuk a II. egyenletet az I.-ből, így 2x = 6 → x = 3',
          'Összeadjuk a két egyenletet',
          'Beszorozzuk mindkettőt 3-mal',
          'Elosztjuk x-szel'
        ],
        correctAnswer: 0,
        hint: 'Mindkét egyenletben +3y szerepel, így kivonáskor y azonnal kiesik.',
        explanation: '(4x + 3y) - (2x + 3y) = 18 - 12 → 2x = 6 → x = 3. Visszahelyettesítve: 2·3 + 3y = 12 → 3y = 6 → y = 2.'
      },
      {
        id: 'lsq2-9',
        questionTypeBadge: 'Ellentmondó Rendszer Felismerése',
        question: 'Melyik egyenletpárnak NINCS megoldása?',
        options: [
          '2x + y = 5 és 2x + y = 8',
          '2x + y = 5 és x - y = 1',
          'x + y = 4 és 2x + 2y = 8',
          'x = 3 és y = 4'
        ],
        correctAnswer: 0,
        hint: 'A bal oldalak azonosak (2x + y), de az 5 sosem egyenlő 8-cal.',
        explanation: 'Kivonva a kettőt 0 = -3 ellentmondásra jutunk: párhuzamos egyenesek, M = ∅.'
      },
      {
        id: 'lsq2-10',
        questionTypeBadge: 'Ellenőrzés Mindkét Egyenletbe',
        question: 'Miért kötelező az egyenletrendszer megoldását MINDKÉT egyenletbe behelyettesíteni az ellenőrzéskor?',
        options: [
          'Mert egy számpár kielégítheti az egyik egyenletet úgy is, hogy a másikban teljesen hibás',
          'Mert a jobb oldalt nem szabad számolni',
          'Mert az x és y értéke felcserélhető',
          'Csak formai követelmény'
        ],
        correctAnswer: 0,
        hint: 'A rendszer definíciója szerint a számpárnak MINDKÉT összefüggést egyszerre kell teljesítenie.',
        explanation: 'Az egyenletrendszer megoldása közös gyök: csak akkor helyes, ha mindkét eredeti egyenlet igaz állítássá válik.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Grafikus Megoldás és Összetett Rendszerek (Nehéz)',
    subtitle: 'Metszéspontok leolvasása, párhuzamosság, azonosság és zárójeles-törtes rendszerek.',
    range: '21 - 30. feladat',
    focus: 'Grafikonok és Összetett Rendszerek',
    questions: [
      {
        id: 'lsq3-1',
        questionTypeBadge: 'Grafikus Metszéspont',
        question: 'A koordináta-rendszerben az x + y = 5 és 2x - y = 4 egyenesek metszéspontja M(3; 2). Mi a rendszer megoldása?',
        figure: <SystemIntersectionSvg size={170} />,
        options: [
          '(x; y) = (3; 2)',
          'x = 5 és y = 4',
          'Csak x = 3',
          'Nincs megoldás'
        ],
        correctAnswer: 0,
        hint: 'A metszéspont koordinátái pontosan az x és y megoldásértékeket adják meg.',
        explanation: 'A grafikus megoldás lényege: a két egyenes közös pontjának koordinátái adják a rendezett számpárt: (x; y) = (3; 2).'
      },
      {
        id: 'lsq3-2',
        questionTypeBadge: 'Párhuzamos Egyenesek',
        question: 'Mit jelent geometriailag, ha az elsőfokú kétismeretlenes egyenletrendszernek nincs megoldása (M = ∅)?',
        options: [
          'A két egyenlethez tartozó egyenes párhuzamos és nem esik egybe',
          'A két egyenes merőleges egymásra',
          'A két egyenes az origóban metszi egymást',
          'A két egyenes teljesen egybeesik'
        ],
        correctAnswer: 0,
        hint: 'Ha nincs közös pont a síkon, a vonalak sosem találkoznak.',
        explanation: 'A síkban két egyenesnek akkor nincs közös pontja, ha párhuzamosak és különbözőek.'
      },
      {
        id: 'lsq3-3',
        questionTypeBadge: 'Egybeeső Egyenesek',
        question: 'Mit jelent geometriailag és algebrailag, ha a rendszernek végtelen sok megoldása van?',
        options: [
          'A két egyenes egybeesik, a két egyenlet valójában egymás számszorosa (azonosság)',
          'A két egyenes egy pontban metszi egymást',
          'Nincs megoldása',
          'Az x tengely párhuzamos az y tengellyel'
        ],
        correctAnswer: 0,
        hint: 'Minden pont közös, mert ugyanazt az egyenest rajzoltuk meg kétszer.',
        explanation: 'Az egybeeső egyenesek minden pontja megoldás: a két egyenlet ekvivalens egymással.'
      },
      {
        id: 'lsq3-4',
        questionTypeBadge: 'Törtes Egyenletrendszer',
        question: 'Oldd meg a rendszert: x/3 + y/2 = 4 és x - y = 2. Mennyi az (x; y)?',
        options: ['(x; y) = (6; 4)', '(x; y) = (3; 1)', '(x; y) = (5; 3)', '(x; y) = (4; 2)'],
        correctAnswer: 0,
        hint: 'Szorozd az elsőt 6-tal: 2x + 3y = 24. Másodikból x = y + 2. Behelyettesítve: 2(y + 2) + 3y = 24.',
        explanation: '5y + 4 = 24 → 5y = 20 → y = 4. x = 4 + 2 = 6. Ellenőrzés: 6/3 + 4/2 = 2 + 2 = 4.'
      },
      {
        id: 'lsq3-5',
        questionTypeBadge: 'Azonos Arányú Egyenletek',
        question: 'Hány megoldása van a 3x + 6y = 12 és x + 2y = 4 rendszernek a valós számpárok halmazán?',
        options: [
          'Végtelen sok megoldása van (azonosság)',
          'Pontosan 1 megoldása van',
          'Nincs megoldása',
          'Két megoldása van'
        ],
        correctAnswer: 0,
        hint: 'Oszd el a felső egyenletet 3-mal: x + 2y = 4 adódik, ami pontosan a második egyenlet!',
        explanation: 'A két egyenlet egymás háromszorosa, így egybeeső egyenesek: végtelen sok számpár megoldás.'
      },
      {
        id: 'lsq3-6',
        questionTypeBadge: 'Ellentmondás Levezetése',
        question: 'Mi a megoldáshalmaza a 4x - 2y = 10 és 2x - y = 3 egyenletrendszernek?',
        options: [
          'M = ∅ (nincs megoldás)',
          'M = {(2; -1)}',
          'Végtelen sok megoldás',
          'M = {(0; 0)}'
        ],
        correctAnswer: 0,
        hint: 'A II. egyenlet kétszerese 4x - 2y = 6. Kivonva az I.-ből: 0 = 4.',
        explanation: '(4x - 2y) - (4x - 2y) = 10 - 6 → 0 = 4 ellentmondás, tehát M = ∅.'
      },
      {
        id: 'lsq3-7',
        questionTypeBadge: 'Zárójeles Egyenletrendszer',
        question: 'Oldd meg a rendszert: 2(x + y) - x = 8 és 2x - y = 1. Mennyi az (x; y) megoldáspár?',
        options: ['(x; y) = (2; 3)', '(x; y) = (3; 2)', '(x; y) = (4; 1)', '(x; y) = (1; 4)'],
        correctAnswer: 0,
        hint: 'I. egyenlet összevonva: x + 2y = 8. II. egyenletből y = 2x - 1. x + 2(2x - 1) = 8.',
        explanation: '5x - 2 = 8 → 5x = 10 → x = 2. y = 2·2 - 1 = 3. Megoldás: (2; 3).'
      },
      {
        id: 'lsq3-8',
        questionTypeBadge: 'Törtes és Egész Rendszer',
        question: 'Mi a megoldása az (x + y)/4 = 3 és (x - y)/2 = 1 rendszernek?',
        options: ['(x; y) = (7; 5)', '(x; y) = (8; 4)', '(x; y) = (6; 6)', '(x; y) = (9; 3)'],
        correctAnswer: 0,
        hint: 'x + y = 12 és x - y = 2. Összeadva: 2x = 14 → x = 7, y = 5.',
        explanation: 'x + y = 12 és x - y = 2 → 2x = 14 → x = 7. y = 12 - 7 = 5. Megoldás: (7; 5).'
      },
      {
        id: 'lsq3-9',
        questionTypeBadge: 'Kétlépéses Behelyettesítés',
        question: 'Mennyi az y értéke a 3x + 4y = 18 és 2x - y = 1 rendszerben?',
        options: ['y = 3', 'y = 2', 'y = 4', 'y = 1'],
        correctAnswer: 0,
        hint: 'II.-ből y = 2x - 1. Behelyettesítve: 3x + 4(2x - 1) = 18 → 11x - 4 = 18 → 11x = 22 → x = 2.',
        explanation: 'x = 2, így y = 2·2 - 1 = 3. Megoldás: (2; 3).'
      },
      {
        id: 'lsq3-10',
        questionTypeBadge: '0 = 0 Eset Értelmezése',
        question: 'Ha az egyenletrendszer átalakítása során a 0 = 0 számazonossághoz jutunk, mi a helyes következtetés?',
        options: [
          'A rendszernek végtelen sok megoldáspárja van a valós számok halmazán',
          'Nincs megoldása a rendszernek',
          'A megoldás x = 0 és y = 0',
          'Hibát követtünk el a levezetésben'
        ],
        correctAnswer: 0,
        hint: 'A két egyenlet kölcsönösen fedi egymást: azonosság.',
        explanation: 'A 0 = 0 azt jelzi, hogy a két egyenlet ugyanazt a feltételt írja le: az egyenes minden pontja megoldáspárt képez.'
      }
    ]
  }
};

const cheatSheetData: CheatSheetCard[] = [
  {
    title: '1. A Rendszer Fogalma és Megoldása',
    badge: '(x; y) rendezett pár',
    points: [
      'Megoldás: olyan (x₀; y₀) számpár, amely MINDKÉT egyenletet egyszerre kielégíti.',
      'Megoldáshalmaz felírása: M = {(x₀; y₀)} kapcsos és kerek zárójelekkel!',
      'Ellenőrzés: mindkét egyenletbe külön-külön kötelező behelyettesíteni!'
    ]
  },
  {
    title: '2. Behelyettesítő Módszer',
    badge: 'Kifejezés & beírás',
    points: [
      'Akkor ideális, ha valamelyik ismeretlen együtthatója +1 vagy -1.',
      '1. Kifejezzük: pl. x = 7 - 2y.',
      '2. ZÁRÓJELBEN behelyettesítjük a másik egyenletbe: 3(7 - 2y) + y = 11.',
      '3. Kiszámoljuk y-t, majd visszahelyettesítve x-et.'
    ]
  },
  {
    title: '3. Egyenlő Együtthatók (Kiküszöbölés)',
    badge: 'Ellentett együtthatók',
    points: [
      'Akkor ajánlott, ha egyik ismeretlen sem 1-es együtthatójú.',
      'Beszorozzuk az egyenleteket úgy, hogy x vagy y előtt ellentett számok álljanak (pl. +6y és -6y).',
      'Összeadjuk a két egyenletet: az adott ismeretlen kiesik!'
    ]
  },
  {
    title: '4. Grafikus Metszéspontok & Esetek',
    badge: 'Geometria',
    points: [
      'Metsző egyenesek: pontosan 1 megoldáspár M = {(x₀; y₀)}.',
      'Párhuzamos egyenesek: ellentmondás, 0 = c (c ≠ 0) → M = ∅.',
      'Egybeeső egyenesek: azonosság, 0 = 0 → végtelen sok megoldáspár.'
    ]
  }
];

export const LinearSystemsQuiz: React.FC<LinearSystemsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Egyenletrendszerek – Gyakorló Kvíz"
      subtitle="30 válogatott feladat 3 szinten a behelyettesítő és egyenlő együtthatós módszerből, grafikus metszéspontokból és szöveges feladatokból"
      badgeText="9. OSZTÁLY • III. EGYENLETEK ÉS AZONOSSÁGOK • 9. TÉMAKÖR"
      themeColor="red"
      storageKey="grade9-linear-systems-quiz-score"
      levels={quizLevels}
      cheatSheet={cheatSheetData}
      grade={9}
      chapterId="egyenletek-azonossagok"
      topicId="g9-egyenlet-rendszerek-quiz"
      topicTitle="Elsőfokú kétismeretlenes egyenletrendszer"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a rendszereket a lépéseikkel és (x; y) gyökeikkel!',
          badgeText: '6 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-red-600 dark:text-red-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <LinearSystemsMatcher
              key={`linear-systems-matcher-${level}`}
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
          subtitle: 'Kategorizáld a rendszereket ajánlott módszer, gyökök száma és előjelei szerint!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-rose-600 dark:text-rose-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <LinearSystemsSorter
              key={`linear-systems-sorter-${level}`}
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

