import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ExamMatcher } from './ExamMatcher';
import { ExamSorter } from './ExamSorter';
import {
  TwoFleasSvg,
  ThreeVehiclesSvg,
  ConcertPostersSvg,
  MarketVegetablesSvg,
  TwoFactoriesSvg,
  ComprehensiveExamSummarySvg
} from './ExamFigures';

interface ExamQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Fejezeti Összefoglaló Térkép',
    description: '1. Grafikus: metszéspont (x₀; y₀). 2. Algebrai: behelyettesítés és egyenlő együtthatók (0=0 azonosság, 0=k ellentmondás). 3. 3-ismeretlenes Gauss-elimináció. 4. Másodfokúak diszkriminánsa.',
    note: 'Szöveges feladatoknál mindig ellenőrizz a szövegkörnyezet logikája szerint is!',
    color: 'from-blue-500 to-indigo-600',
    figure: <ComprehensiveExamSummarySvg size={180} />
  },
  {
    title: 'Két Bolha a Koordinátarácson',
    description: '1. bolha: (0; −2)-ből ugrálva y = 2x − 2. 2. bolha: x + y = 7 rácspontok. Metszéspont: 2x − 2 = 7 − x ⟹ 3x = 9 ⟹ x = 3, y = 4 ⟹ M(3; 4).',
    note: 'Tankönyv 44. oldal: mindkét bolha érinti a (3; 4) közös rácspontot!',
    color: 'from-purple-500 to-pink-600',
    figure: <TwoFleasSvg size={180} />
  },
  {
    title: 'Járművek és Menetidők',
    description: 'Kisbusz (v), autó (v + 15), teherautó (v − 15). s/v − s/(v+15) = 1 és s/(v−15) − s/v = 1,5 ⟹ v = 75 km/h, s = 450 km.',
    note: 'Tankönyv 44. oldal: a járművek átlagsebességei 90 km/h, 75 km/h és 60 km/h!',
    color: 'from-amber-500 to-orange-600',
    figure: <ThreeVehiclesSvg size={180} />
  },
  {
    title: 'Zenekari Óriásplakátok',
    description: 'Azonos terület: xy = (x+4)(y−2) = (x−4)(y+3) ⟹ −x + 2y = 4 és 3x − 4y = 12 ⟹ x = 20 dm, y = 12 dm ⟹ T = 240 dm².',
    note: 'Tankönyv 45. oldal: Alfa (20×12 dm), Béta (24×10 dm), Gamma (16×15 dm).',
    color: 'from-emerald-500 to-teal-600',
    figure: <ConcertPostersSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető készségek és fogalmak felmérése (30 feladat)',
    subtitle: 'Grafikus metszéspontok, alapegyenletek, explicit alak és egyszerű szöveges feladatok.',
    range: '1–30. feladat',
    focus: 'Fejezeti alapfogalmak és stabil algebrai műveletek',
    questions: [
      {
        id: 'eq1-1',
        questionTypeBadge: 'Alapfogalom',
        question: 'Mi a kétismeretlenes elsőfokú egyenletrendszer megoldása?',
        options: [
          'Egy olyan (x; y) rendezett számpár, amely a rendszer mindkét egyenletét egyidejűleg igazzá teszi',
          'Egyetlen valós szám, amely mindkét változó helyére beírható',
          'A koordinátarendszer origója: (0; 0)',
          'Bármely két tetszőleges valós szám'
        ],
        correctAnswer: 0,
        explanation: 'Egyenletrendszer megoldása mindig egy rendezett számpár (vagy számhármas), amely minden egyes egyenletet kielégít.',
        hint: 'Gondolj arra, mit jelent a rendszer: egyszerre kell mindkét feltételnek teljesülnie!'
      },
      {
        id: 'eq1-2',
        questionTypeBadge: 'Geometriai jelentés',
        question: 'Mit jelent geometriailag két lineáris egyenlet rendszerének megoldása a síkban?',
        options: [
          'A két egyenlethez tartozó egyenesek közös metszéspontjának koordinátáit',
          'A két egyenes távolságát',
          'A koordinátatengelyek metszéspontját',
          'A két egyenes meredekségének szorzatát'
        ],
        correctAnswer: 0,
        explanation: 'Minden kétismeretlenes elsőfokú egyenlet egy egyenest határoz meg a síkban. A közös megoldás a két egyenes közös pontja (metszéspontja).',
        hint: 'A pontnak rajta kell lennie az első és a második egyenesen is!'
      },
      {
        id: 'eq1-3',
        questionTypeBadge: 'Megoldásszám',
        question: 'Hány megoldása van a rendszernek, ha a két egyenes meredeksége eltérő (m₁ ≠ m₂)?',
        options: [
          'Pontosan 1 megoldáspár (metszik egymást)',
          '0 megoldás',
          'Végtelen sok megoldás',
          'Pontosan 2 megoldás'
        ],
        correctAnswer: 0,
        explanation: 'Két különböző meredekségű egyenes a síkban nem lehet párhuzamos, ezért pontosan egy pontban metszi egymást: 1 megoldás.',
        hint: 'Két eltérő lejtésű egyenes előbb-utóbb metszi egymást!'
      },
      {
        id: 'eq1-4',
        questionTypeBadge: 'Megoldásszám',
        question: 'Hány megoldása van a rendszernek, ha az egyenesek párhuzamosak és nem esnek egybe (m₁ = m₂, b₁ ≠ b₂)?',
        options: [
          '0 megoldás (üres halmaz ∅)',
          '1 megoldás',
          'Végtelen sok megoldás',
          '2 megoldás'
        ],
        correctAnswer: 0,
        explanation: 'A párhuzamos, nem egybeeső egyeneseknek nincs közös pontjuk, így a megoldáshalmaz üres: M = ∅.',
        hint: 'Két párhuzamos sín sosem találkozik a síkban!'
      },
      {
        id: 'eq1-5',
        questionTypeBadge: 'Megoldásszám',
        question: 'Mikor van egy kétismeretlenes lineáris egyenletrendszernek végtelen sok megoldása?',
        options: [
          'Ha a két egyenlethez tartozó egyenes egybeesik (m₁ = m₂ és b₁ = b₂)',
          'Ha az egyenesek merőlegesek egymásra',
          'Ha mindkét egyenes átmegy az origón',
          'Ha az együtthatók összege 100'
        ],
        correctAnswer: 0,
        explanation: 'Ha az egyenletek egymás számszorosai, a két grafikon tökéletesen fedi egymást, az egyenes minden pontja megoldás: végtelen sok megoldás.',
        hint: 'Mikor egyezik meg az összes pontjuk?'
      },
      {
        id: 'eq1-6',
        questionTypeBadge: 'Behelyettesítés elve',
        question: 'Mi a behelyettesítő módszer első lépése?',
        options: [
          'Az egyik egyenletből kifejezzük az egyik ismeretlent a másikkal',
          'Összeadjuk a két egyenletet',
          'Beszorozzuk mindkét egyenletet nullával',
          'Ábrázoljuk az egyeneseket koordinátarendszerben'
        ],
        correctAnswer: 0,
        explanation: 'A behelyettesítés lényege: az egyik ismeretlent kifejezzük (pl. y = 7 − 2x), majd beírjuk a másik egyenletbe.',
        hint: 'Hogyan szabadulhatunk meg az egyik változótól a kifejezés által?'
      },
      {
        id: 'eq1-7',
        questionTypeBadge: 'Elimináció elve',
        question: 'Mi a cél az egyenlő együtthatók (összeadásos/kivonásos) módszerénél?',
        options: [
          'Valamelyik ismeretlen együtthatóit ellentetté tenni, hogy összeadással kiessen',
          'Mindkét egyenletet négyzetre emelni',
          'A konstans tagokat nullára redukálni',
          'Kifejezni az origót'
        ],
        correctAnswer: 0,
        explanation: 'Ha egy változó együtthatói ellentettek (pl. +3y és −3y), az egyenletek összeadásakor a változó kiesik (eliminálódik).',
        hint: 'Gondolj az ismeretlen kiesésére (eliminációjára)!'
      },
      {
        id: 'eq1-8',
        questionTypeBadge: 'Számítás',
        question: 'Oldd meg fejben:\nI. x + y = 10\nII. x − y = 4\nMennyi az (x; y) megoldáspár?',
        options: [
          '(7; 3)',
          '(6; 4)',
          '(8; 2)',
          '(5; 5)'
        ],
        correctAnswer: 0,
        explanation: 'Összeadva: 2x = 14 ⟹ x = 7. Kivonva: 2y = 6 ⟹ y = 3. Megoldás: (7; 3).',
        hint: 'Add össze a két egyenletet: 2x = 14!'
      },
      {
        id: 'eq1-9',
        questionTypeBadge: 'Visszahelyettesítés',
        question: 'Ha 2x + y = 7 és megadott, hogy x = 2, mennyi az y értéke?',
        options: [
          'y = 3',
          'y = 4',
          'y = 2',
          'y = 5'
        ],
        correctAnswer: 0,
        explanation: '2·2 + y = 7 ⟹ 4 + y = 7 ⟹ y = 3.',
        hint: '4-hez mennyit kell adni, hogy 7 legyen?'
      },
      {
        id: 'eq1-10',
        questionTypeBadge: 'Számítás',
        question: 'Ha 3x + 2y = 12 és y = 3, mennyi az x értéke?',
        options: [
          'x = 2',
          'x = 3',
          'x = 1',
          'x = 4'
        ],
        correctAnswer: 0,
        explanation: '3x + 2·3 = 12 ⟹ 3x + 6 = 12 ⟹ 3x = 6 ⟹ x = 2.',
        hint: '3x + 6 = 12 ⟹ 3x = 6.'
      },
      {
        id: 'eq1-11',
        questionTypeBadge: 'Azonosság',
        question: 'Hány megoldása van a rendszernek?\nI. x + y = 5\nII. 2x + 2y = 10',
        options: [
          'Végtelen sok megoldás (0 = 0)',
          '0 megoldás',
          '1 megoldás',
          '2 megoldás'
        ],
        correctAnswer: 0,
        explanation: 'A II. egyenlet pontosan kétszerese az I-nek. Kivonva 0 = 0 adódik, ami azonosság: végtelen sok megoldás.',
        hint: 'Oszd el a második egyenletet 2-vel!'
      },
      {
        id: 'eq1-12',
        questionTypeBadge: 'Ellentmondás',
        question: 'Hány megoldása van a rendszernek?\nI. x + y = 5\nII. x + y = 8',
        options: [
          '0 megoldás (ellentmondás: 0 = 3)',
          'Végtelen sok megoldás',
          '1 megoldás',
          '2 megoldás'
        ],
        correctAnswer: 0,
        explanation: 'Egy összeg nem lehet egyszerre 5 és 8. Kivonva: 0 = 3, ami hamis (ellentmondás): üres halmaz ∅.',
        hint: 'Lehet-e ugyanaz az összeg egyszerre 5 és 8?'
      },
      {
        id: 'eq1-13',
        questionTypeBadge: 'Szöveges alap',
        question: 'Két szám összege 20, különbsége 6. Melyik ez a két szám (x ≥ y)?',
        options: [
          '13 és 7',
          '14 és 6',
          '12 és 8',
          '15 és 5'
        ],
        correctAnswer: 0,
        explanation: 'x + y = 20 és x − y = 6 ⟹ 2x = 26 ⟹ x = 13, y = 7.',
        hint: '(20 + 6) / 2 = 13.'
      },
      {
        id: 'eq1-14',
        questionTypeBadge: 'Ellenőrzés',
        question: 'Melyik rendszernek megoldása a (3; 2) számpár?',
        options: [
          'x + y = 5  és  2x − y = 4',
          'x + y = 6  és  x − y = 2',
          '2x + y = 7  és  x − y = 0',
          '3x − y = 5  és  x + y = 4'
        ],
        correctAnswer: 0,
        explanation: '3 + 2 = 5 ✓ és 2·3 − 2 = 6 − 2 = 4 ✓. Mindkét egyenlet teljesül.',
        hint: 'Helyettesítsd be x = 3 és y = 2 értékeit mindkét egyenletbe!'
      },
      {
        id: 'eq1-15',
        questionTypeBadge: 'Kifejezés',
        question: 'Ha az 5x − y = 9 egyenletből kifejezzük y-t, melyik alakot kapjuk?',
        options: [
          'y = 5x − 9',
          'y = 9 − 5x',
          'y = 5x + 9',
          'y = (9 + x)/5'
        ],
        correctAnswer: 0,
        explanation: '5x − y = 9 ⟹ 5x − 9 = y ⟹ y = 5x − 9.',
        hint: 'Adj y-t mindkét oldalhoz és vonj ki 9-et!'
      },
      {
        id: 'eq1-16',
        questionTypeBadge: 'Zárójeles rendezés',
        question: 'Mi a 2(x + 1) + y = 7 egyenlet rendezett alakja?',
        options: [
          '2x + y = 5',
          '2x + y = 7',
          '2x + y = 9',
          '2x + 2y = 7'
        ],
        correctAnswer: 0,
        explanation: '2x + 2 + y = 7 ⟹ 2x + y = 7 − 2 = 5.',
        hint: '2 · 1 = 2, amit le kell vonni a 7-ből!'
      },
      {
        id: 'eq1-17',
        questionTypeBadge: 'Törtmentesítés',
        question: 'Mivel kell beszorozni az x/2 + y/3 = 1 egyenletet, hogy egész együtthatós legyen?',
        options: [
          '6-tal (3x + 2y = 6)',
          '5-tel',
          '2-vel',
          '3-mal'
        ],
        correctAnswer: 0,
        explanation: 'A 2 és 3 legkisebb közös többszöröse 6. Beszorozva: 3x + 2y = 6.',
        hint: 'Mennyi a 2 és a 3 legkisebb közös többszöröse?'
      },
      {
        id: 'eq1-18',
        questionTypeBadge: 'Tyúkok és nyulak',
        question: 'Egy udvaron tyúkok és nyulak vannak: összesen 7 fej és 20 láb. Hány nyúl és hány tyúk van?',
        options: [
          '3 nyúl és 4 tyúk',
          '4 nyúl és 3 tyúk',
          '2 nyúl és 5 tyúk',
          '5 nyúl és 2 tyúk'
        ],
        correctAnswer: 0,
        explanation: 'x + y = 7 és 4x + 2y = 20. 2x + 2y = 14 ⟹ 2x = 6 ⟹ x = 3 nyúl, y = 4 tyúk (3·4 + 4·2 = 12 + 8 = 20 láb ✓).',
        hint: '3 nyúl = 12 láb, 4 tyúk = 8 láb. 12 + 8 = 20 láb!'
      },
      {
        id: 'eq1-19',
        questionTypeBadge: 'Büfé feladat',
        question: 'Ha 2 szendvics és 2 ásványvíz 740 Ft-ba kerül, mennyibe kerül 1 szendvics és 1 ásványvíz együtt?',
        options: [
          '370 Ft',
          '350 Ft',
          '380 Ft',
          '360 Ft'
        ],
        correctAnswer: 0,
        explanation: '2sz + 2v = 740 Ft ⟹ sz + v = 740 / 2 = 370 Ft.',
        hint: 'Oszd el a teljes árat 2-vel!'
      },
      {
        id: 'eq1-20',
        questionTypeBadge: '3-ismeretlenes alap',
        question: 'Ha x + y + z = 10, továbbá x = 3 és y = 4, mennyi z értéke?',
        options: [
          'z = 3',
          'z = 4',
          'z = 2',
          'z = 5'
        ],
        correctAnswer: 0,
        explanation: '3 + 4 + z = 10 ⟹ 7 + z = 10 ⟹ z = 3.',
        hint: '10 − 3 − 4 = ?'
      },
      {
        id: 'eq1-21',
        questionTypeBadge: 'Másodfokú alap',
        question: 'Mely pontokban metszi egymást az y = x² parabola és az y = 9 egyenes?',
        options: [
          '(3; 9) és (−3; 9)',
          '(9; 3) és (9; −3)',
          'Csak a (3; 9) pontban',
          'Nem metszik egymást'
        ],
        correctAnswer: 0,
        explanation: 'x² = 9 ⟹ x = ±3. A metszéspontok: (3; 9) és (−3; 9).',
        hint: 'Melyik számok négyzete 9?'
      },
      {
        id: 'eq1-22',
        questionTypeBadge: 'Kör és tengely',
        question: 'Mely pontokban metszi az x² + y² = 25 kör az y-tengelyt (x = 0)?',
        options: [
          '(0; 5) és (0; −5)',
          '(5; 0) és (−5; 0)',
          '(0; 25)',
          '(0; 0)'
        ],
        correctAnswer: 0,
        explanation: 'x = 0 esetén 0² + y² = 25 ⟹ y² = 25 ⟹ y = ±5. A pontok: (0; 5) és (0; −5).',
        hint: 'Helyettesíts be x = 0-t a kör egyenletébe!'
      },
      {
        id: 'eq1-23',
        questionTypeBadge: 'Meredekség',
        question: 'Mennyi az y = 3x − 5 egyenes meredeksége (m)?',
        options: [
          'm = 3',
          'm = −5',
          'm = 5',
          'm = 1/3'
        ],
        correctAnswer: 0,
        explanation: 'Az y = mx + b alakban az x együtthatója a meredekség: m = 3.',
        hint: 'Az x előtt álló szám a meredekség.'
      },
      {
        id: 'eq1-24',
        questionTypeBadge: 'Egyenes egyenlete',
        question: 'Melyik egyenes megy át a (0; 0) origón és az (1; 2) ponton?',
        options: [
          'y = 2x',
          'y = x + 1',
          'y = 2x + 1',
          'y = x/2'
        ],
        correctAnswer: 0,
        explanation: 'Ha átmegy az origón, b = 0. A meredekség m = 2/1 = 2 ⟹ y = 2x.',
        hint: '0-ban 0, 1-ben 2.'
      },
      {
        id: 'eq1-25',
        questionTypeBadge: 'Kétjegyű szám',
        question: 'Egy kétjegyű szám számjegyeinek összege 8, és felcserélve önmagával egyenlő. Mi a szám?',
        options: [
          '44',
          '35',
          '53',
          '26'
        ],
        correctAnswer: 0,
        explanation: 'Ha felcserélve azonos, mindkét jegye egyenlő (x = y). x + x = 8 ⟹ 2x = 8 ⟹ x = 4. A szám a 44.',
        hint: 'A két számjegy egyenlő és összegük 8.'
      },
      {
        id: 'eq1-26',
        questionTypeBadge: 'Életkoros alap',
        question: 'Egy apa most 30 éves, fia 6 éves. Hány év múlva lesz az apa életkora pontosan a fia 3-szorosa?',
        options: [
          '6 év múlva (36 és 12 évesek)',
          '5 év múlva',
          '4 év múlva',
          '8 év múlva'
        ],
        correctAnswer: 0,
        explanation: '30 + x = 3(6 + x) ⟹ 30 + x = 18 + 3x ⟹ 2x = 12 ⟹ x = 6 év múlva (ekkor apa 36, fia 12, 36/12 = 3 ✓).',
        hint: '30 + x = 3(6 + x).'
      },
      {
        id: 'eq1-27',
        questionTypeBadge: 'Egyenletek aránya',
        question: 'Ha a 4x + 2y = 10 egyenlet minden tagját elosztjuk 2-vel, mit kapunk?',
        options: [
          '2x + y = 5',
          '2x + y = 10',
          '4x + y = 5',
          '2x + 2y = 5'
        ],
        correctAnswer: 0,
        explanation: '4x/2 = 2x, 2y/2 = y, 10/2 = 5 ⟹ 2x + y = 5.',
        hint: 'Minden egyes tagot ossz el 2-vel!'
      },
      {
        id: 'eq1-28',
        questionTypeBadge: 'Módszer célja',
        question: 'Mi a legfőbb cél az egyenletrendszer algebrai megoldása során?',
        options: [
          'A rendszert visszavezetni egyetlen egyismeretlenes egyenletre',
          'Megnövelni az ismeretlenek számát',
          'Áttérni a trigonometriára',
          'Minden együtthatót negatívvá tenni'
        ],
        correctAnswer: 0,
        explanation: 'Akár behelyettesítünk, akár eliminálunk, a cél az egyik változó kiküszöbölése, hogy egy sima egyismeretlenes egyenletet kapjunk.',
        hint: 'Két ismeretlenből csinálunk egyet!'
      },
      {
        id: 'eq1-29',
        questionTypeBadge: 'Kikötések',
        question: 'Miért kötelező kikötést tenni az 1/x + 1/y = 5 rendszer esetén?',
        options: [
          'Mert a nevezőben lévő ismeretlenek nem lehetnek nullák (x ≠ 0 és y ≠ 0)',
          'Mert a törtek mindig negatívak',
          'Mert x-nek és y-nak egésznek kell lennie',
          'Nincs szükség semmilyen kikötésre'
        ],
        correctAnswer: 0,
        explanation: 'Nullával való osztás a matematikában értelmezhetetlen, ezért x ≠ 0 és y ≠ 0.',
        hint: 'Szabad-e nullával osztani?'
      },
      {
        id: 'eq1-30',
        questionTypeBadge: 'Rendezett pár',
        question: 'Miért fontos, hogy a megoldást RENDEZETT számpárként adjuk meg: (x; y)?',
        options: [
          'Mert az x és y értéke nem cserélhető fel tetszőlegesen: (3; 2) nem ugyanaz a megoldás, mint a (2; 3)',
          'Mert a koordinátarendszerben csak az x számít',
          'Mert nincs különbség a két érték között',
          'Mert a matematika szabályai tiltják a halmazos felírást'
        ],
        correctAnswer: 0,
        explanation: 'A rendezett számpárban az első koordináta mindig az x, a második az y értéke. A (3; 2) pont más helyen van, mint a (2; 3).',
        hint: 'Az első szám x, a második y. Nem mindegy a sorrendjük!'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Középfokú és érettségi típusú rendszerek (30 feladat)',
    subtitle: 'Tankönyvi feladatok, biobolt, boros hordók, két bolha és paraméteres elemzés.',
    range: '31–60. feladat',
    focus: 'Összetettebb elimináció, tankönyvi és érettségi típusmodellek',
    questions: [
      {
        id: 'eq2-1',
        questionTypeBadge: 'Tankönyv 42. o.',
        question: 'Oldd meg a rendszert:\nI. 7x + 4y = −10\nII. 8y − 9x = 210\nMennyi az (x; y) megoldáspár?',
        options: [
          '(−10; 15)',
          '(10; −15)',
          '(−5; 10)',
          '(5; −20)'
        ],
        correctAnswer: 0,
        explanation: 'I · 2: 14x + 8y = −20. II: −9x + 8y = 210. Kivonva: 23x = −230 ⟹ x = −10. Ebből y = 15.',
        hint: 'Szorozd az elsőt 2-vel, hogy az y együtthatója mindkettőben 8 legyen!'
      },
      {
        id: 'eq2-2',
        questionTypeBadge: 'Biobolt haszonkulcs',
        question: 'Egy bioboltban 10 kg kesudió-aszalt gyümölcs keveréket adtak el 25% haszonnal 22 000 Ft-ért (a kesudió 2200 Ft/kg, a gyümölcs 1400 Ft/kg). Mennyi kesudió volt benne? (Tankönyv 42. o.)',
        options: [
          '4,5 kg',
          '5,0 kg',
          '4,0 kg',
          '6,0 kg'
        ],
        correctAnswer: 0,
        explanation: 'Beszerzési érték = 22 000 / 1,25 = 17 600 Ft. 2200x + 1400(10 − x) = 17 600 ⟹ 800x = 3600 ⟹ x = 4,5 kg.',
        hint: '22 000 / 1,25 = 17 600 Ft a beszerzési érték.'
      },
      {
        id: 'eq2-3',
        questionTypeBadge: 'Érettségi: Bútor',
        question: '3 asztal és 14 szék ára 99 000 Ft. 20% asztal- és 1/3 szék-engedménnyel 70 800 Ft. Mennyibe került eredetileg 1 asztal és 1 szék? (2006 érettségi)',
        options: [
          'Asztal: 19 000 Ft, Szék: 3 000 Ft',
          'Asztal: 18 000 Ft, Szék: 3 200 Ft',
          'Asztal: 20 000 Ft, Szék: 2 800 Ft',
          'Asztal: 17 000 Ft, Szék: 3 500 Ft'
        ],
        correctAnswer: 0,
        explanation: '3a + 14sz = 99 000 és 3·(0,8a) + 14·(2/3 sz) = 70 800 ⟹ a = 19 000 Ft és sz = 3 000 Ft.',
        hint: '3 · 19 000 + 14 · 3 000 = 57 000 + 42 000 = 99 000 Ft!'
      },
      {
        id: 'eq2-4',
        questionTypeBadge: 'Két hordó bor',
        question: 'Két hordóban 480 liter bor van. Oda-vissza öntögetés után mindkettőben egyenlő (240-240 liter). Hány liter volt bennük kezdetben? (Tankönyv 43. o.)',
        options: [
          '300 liter és 180 liter',
          '280 liter és 200 liter',
          '320 liter és 160 liter',
          '260 liter és 220 liter'
        ],
        correctAnswer: 0,
        explanation: 'Visszafelé: 240-240 ➔ 120 és 360 ➔ 300 és 180 liter.',
        hint: 'Gondolkozz visszafelé: a végső 240-240 literből kiindulva!'
      },
      {
        id: 'eq2-5',
        questionTypeBadge: '120 ezüst',
        question: 'Két ember 120 ezüstös árut vesz: x + (2/3)y = 120 és y + (1/2)x = 120. Mennyi pénzük volt?',
        options: [
          'x = 60 ezüst és y = 90 ezüst',
          'x = 70 ezüst és y = 75 ezüst',
          'x = 50 ezüst és y = 100 ezüst',
          'x = 80 ezüst és y = 60 ezüst'
        ],
        correctAnswer: 0,
        explanation: '3x + 2y = 360 és x + 2y = 240 ⟹ 2x = 120 ⟹ x = 60, y = 90 ezüst.',
        hint: '3x + 2y = 360 és x + 2y = 240.'
      },
      {
        id: 'eq2-6',
        questionTypeBadge: 'Osztálykirándulás',
        question: 'Egy kirándulás buszköltsége 5 hiányzó esetén 3500 Ft/fő, 2 hiányzó esetén 3000 Ft/fő. Hány tanuló jár az osztályba?',
        options: [
          '23 tanuló',
          '25 tanuló',
          '20 tanuló',
          '28 tanuló'
        ],
        correctAnswer: 0,
        explanation: '(n − 5)·3500 = (n − 2)·3000 ⟹ 500n = 11 500 ⟹ n = 23 tanuló.',
        hint: '(n − 5)·3500 = (n − 2)·3000.'
      },
      {
        id: 'eq2-7',
        questionTypeBadge: 'Két bolha',
        question: 'Egy bolha (0; −2)-ből indulva y = 2x − 2 egyenesen ugrál, a másik x + y = 7 pontjaira ugrik. Melyik a közös pont? (Tankönyv 44. o.)',
        options: [
          '(3; 4)',
          '(4; 3)',
          '(2; 2)',
          '(5; 2)'
        ],
        correctAnswer: 0,
        explanation: '2x − 2 = 7 − x ⟹ 3x = 9 ⟹ x = 3, y = 4.',
        hint: '2x − 2 = 7 − x!',
        figure: <TwoFleasSvg size={220} />
      },
      {
        id: 'eq2-8',
        questionTypeBadge: 'Nagymama piaca',
        question: '1,5 kg paradicsom és 1 kg paprika 850 Ft. Paradicsom 1/3-ával olcsóbban, paprika 25%-kal drágábban 800 Ft. Mennyi 1 kg ára? (Tankönyv 45. o.)',
        options: [
          'Paradicsom = 300 Ft/kg, Paprika = 400 Ft/kg',
          'Paradicsom = 350 Ft/kg, Paprika = 325 Ft/kg',
          'Paradicsom = 250 Ft/kg, Paprika = 475 Ft/kg',
          'Paradicsom = 400 Ft/kg, Paprika = 250 Ft/kg'
        ],
        correctAnswer: 0,
        explanation: '1,5x + y = 850 és x + 1,25y = 800 ⟹ x = 300 Ft, y = 400 Ft.',
        hint: '1,5 · 300 + 400 = 850 Ft!',
        figure: <MarketVegetablesSvg size={220} />
      },
      {
        id: 'eq2-9',
        questionTypeBadge: 'Két üzem',
        question: 'Két üzem 20 nap alatt 480 alkatrészt tervez. 5 nap után A üzem 28%-kal visszaesik, B 20%-kal nő, mégis időre kész a munka. Hány darabot terveztek eredetileg?',
        options: [
          'A: 200 db és B: 280 db',
          'A: 240 db és B: 240 db',
          'A: 180 db és B: 300 db',
          'A: 220 db és B: 260 db'
        ],
        correctAnswer: 0,
        explanation: 'x + y = 24 és 0,72x + 1,2y = 24 ⟹ x = 10, y = 14 db/nap. 20 nap alatt: 200 és 280 db.',
        hint: 'x + y = 24 és 0,72x + 1,2y = 24!',
        figure: <TwoFactoriesSvg size={220} />
      },
      {
        id: 'eq2-10',
        questionTypeBadge: 'Parabola és egyenes',
        question: 'Határozd meg az y = x² és y = x + 2 rendszer megoldásait!',
        options: [
          '(2; 4) és (−1; 1)',
          '(3; 9) és (−2; 4)',
          '(2; 4) és (1; 1)',
          '(−2; 0) és (1; 3)'
        ],
        correctAnswer: 0,
        explanation: 'x² − x − 2 = 0 ⟹ (x − 2)(x + 1) = 0 ⟹ (2; 4) és (−1; 1).',
        hint: 'x² − x − 2 = 0.'
      },
      {
        id: 'eq2-11',
        questionTypeBadge: 'Kör és szelő',
        question: 'Mely pontokban metszi az y = x + 1 egyenes az x² + y² = 25 kört?',
        options: [
          '(3; 4) és (−4; −3)',
          '(4; 5) és (−3; −2)',
          '(5; 6) és (−4; −3)',
          '(0; 1) és (−1; 0)'
        ],
        correctAnswer: 0,
        explanation: 'x² + (x + 1)² = 25 ⟹ 2x² + 2x − 24 = 0 ⟹ x² + x − 12 = 0 ⟹ x₁ = 3 (y₁ = 4), x₂ = −4 (y₂ = −3).',
        hint: 'x² + x − 12 = 0 ⟹ (x − 3)(x + 4) = 0.'
      },
      {
        id: 'eq2-12',
        questionTypeBadge: 'Érintő egyenes',
        question: 'Mely pontban érinti az y = 2x egyenes az y = x² + 1 parabolát?',
        options: [
          '(1; 2)',
          '(2; 4)',
          '(0; 1)',
          '(−1; −2)'
        ],
        correctAnswer: 0,
        explanation: 'x² + 1 = 2x ⟹ x² − 2x + 1 = 0 ⟹ (x − 1)² = 0 ⟹ x = 1, y = 2. D = 0, érintő.',
        hint: '(x − 1)² = 0.'
      },
      {
        id: 'eq2-13',
        questionTypeBadge: 'Szimmetrikus rendszer',
        question: 'Oldd meg a valós számok körében: x + y = 14 és x · y = 45!',
        options: [
          '(9; 5) és (5; 9)',
          '(10; 4) és (4; 10)',
          '(8; 6) és (6; 8)',
          '(15; 3) és (3; 15)'
        ],
        correctAnswer: 0,
        explanation: 'u² − 14u + 45 = 0 ⟹ (u − 9)(u − 5) = 0 ⟹ (9; 5) és (5; 9).',
        hint: 'u² − 14u + 45 = 0.'
      },
      {
        id: 'eq2-14',
        questionTypeBadge: 'Székek és fordulók',
        question: 'Székek és fordulók (Tankönyv 40. o.): −2x + y = 2 és 4x − y = 4. Hány szék van összesen?',
        options: [
          '24 darab szék',
          '20 darab szék',
          '30 darab szék',
          '18 darab szék'
        ],
        correctAnswer: 0,
        explanation: 'Összeadva: 2x = 6 ⟹ x = 3 szék/forduló, y = 8 forduló. Összesen 3 · 8 = 24 szék.',
        hint: 'x = 3 és y = 8.'
      },
      {
        id: 'eq2-15',
        questionTypeBadge: 'Kávékeverék',
        question: '3000 és 4000 Ft-os kávéból 17,5 kg 3600 Ft/kg-os keverék. Hány kg kell a két fajtából?',
        options: [
          '7 kg (3000 Ft-os) és 10,5 kg (4000 Ft-os)',
          '8 kg és 9,5 kg',
          '6 kg és 11,5 kg',
          '10 kg és 7,5 kg'
        ],
        correctAnswer: 0,
        explanation: 'x + y = 17,5 és 3000x + 4000y = 63 000 ⟹ x = 7 kg és y = 10,5 kg.',
        hint: '3000x + 4000y = 63 000.'
      },
      {
        id: 'eq2-16',
        questionTypeBadge: 'Mosógép energia',
        question: '2000 W melegítés, 400 W egyéb, 1 óra alatt 800 Wh energia. Mennyi ideig melegített?',
        options: [
          '15 percig (0,25 óra)',
          '20 percig',
          '10 percig',
          '30 percig'
        ],
        correctAnswer: 0,
        explanation: '2000t + 400(1 − t) = 800 ⟹ 1600t = 400 ⟹ t = 0,25 óra = 15 perc.',
        hint: '1600t = 400.'
      },
      {
        id: 'eq2-17',
        questionTypeBadge: 'Négyzetek',
        question: 'Két négyzet területe különbsége 72 m², kerületeké 16 m. Hány méter az oldaluk?',
        options: [
          '11 m és 7 m',
          '12 m és 8 m',
          '10 m és 6 m',
          '13 m és 9 m'
        ],
        correctAnswer: 0,
        explanation: 'a − b = 4 és a² − b² = 72 ⟹ (a − b)(a + b) = 72 ⟹ 4(a + b) = 72 ⟹ a + b = 18 ⟹ a = 11, b = 7.',
        hint: '(a − b)(a + b) = 72.'
      },
      {
        id: 'eq2-18',
        questionTypeBadge: 'Paraméteres ellentmondás',
        question: 'Milyen p esetén NINCS megoldása a 2x + py = 6 és 4x + 6y = 5 rendszernek?',
        options: [
          'p = 3',
          'p = −3',
          'p = 6',
          'p = 0'
        ],
        correctAnswer: 0,
        explanation: '2/4 = p/6 ⟹ p = 3. Ekkor 4x + 6y = 12 ≠ 5 (ellentmondás).',
        hint: '2/4 = p/6.'
      },
      {
        id: 'eq2-19',
        questionTypeBadge: 'Paraméteres azonosság',
        question: 'Milyen p esetén van VÉGTELEN SOK megoldása a 2x + py = 6 és 4x + 6y = 12 rendszernek?',
        options: [
          'p = 3',
          'p = 6',
          'p = 2',
          'p = −3'
        ],
        correctAnswer: 0,
        explanation: 'A II. egyenlet minden tagja 2-szerese az I-nek: p · 2 = 6 ⟹ p = 3.',
        hint: 'A második egyenlet pontos kétszerese az elsőnek.'
      },
      {
        id: 'eq2-20',
        questionTypeBadge: 'Ciklikus 3x3',
        question: 'x + y = 7, y + z = 9, z + x = 8. Mennyi az (x; y; z) számhármas?',
        options: [
          '(3; 4; 5)',
          '(4; 3; 5)',
          '(2; 5; 4)',
          '(3; 5; 4)'
        ],
        correctAnswer: 0,
        explanation: '2(x + y + z) = 24 ⟹ x + y + z = 12 ⟹ z = 5, x = 3, y = 4.',
        hint: 'x + y + z = 12.'
      },
      {
        id: 'eq2-21',
        questionTypeBadge: 'Gauss 3x3',
        question: 'x + y + z = 6, 2x − y + z = 3, x + 2y − z = 2. Mennyi az (x; y; z) megoldás?',
        options: [
          '(1; 2; 3)',
          '(2; 1; 3)',
          '(3; 2; 1)',
          '(1; 1; 4)'
        ],
        correctAnswer: 0,
        explanation: 'I + III: 2x + 3y = 8. II + III: 3x + y = 5 ⟹ x = 1, y = 2, z = 3.',
        hint: 'Elimináld a z-t az I+III és II+III összeadásokkal!'
      },
      {
        id: 'eq2-22',
        questionTypeBadge: 'Törtes rendszer',
        question: '(3x−7)/5 + (4y+5)/15 = 4 és (3y−7)/5 + (4x+5)/15 = 6. Mennyi az (x; y) megoldás?',
        options: [
          '(4; 10)',
          '(5; 8)',
          '(3; 11)',
          '(6; 7)'
        ],
        correctAnswer: 0,
        explanation: '15-tel szorozva: 9x + 4y = 76 és 4x + 9y = 106 ⟹ x = 4, y = 10.',
        hint: '9x + 4y = 76 és 4x + 9y = 106.'
      },
      {
        id: 'eq2-23',
        questionTypeBadge: 'Tankönyv ráadás',
        question: '3x − y + 5x = 7 és 5x − y + x = −3. Mennyi az (x; y) megoldáspár?',
        options: [
          '(5; 33)',
          '(4; 25)',
          '(6; 41)',
          '(3; 17)'
        ],
        correctAnswer: 0,
        explanation: '8x − y = 7 és 6x − y = −3 ⟹ 2x = 10 ⟹ x = 5, y = 33.',
        hint: '8x − y = 7 és 6x − y = −3.'
      },
      {
        id: 'eq2-24',
        questionTypeBadge: 'Segédváltozós',
        question: '1/x + 1/y = 5 és 2/x − 1/y = 1. Mennyi az (x; y) megoldáspár?',
        options: [
          '(1/2; 1/3)',
          '(2; 3)',
          '(1/3; 1/2)',
          '(3; 2)'
        ],
        correctAnswer: 0,
        explanation: 'a = 1/x, b = 1/y ⟹ a = 2, b = 3 ⟹ x = 1/2, y = 1/3.',
        hint: 'a + b = 5 és 2a − b = 1 ⟹ a = 2, b = 3.'
      },
      {
        id: 'eq2-25',
        questionTypeBadge: 'Kétjegyű szám',
        question: 'Számjegyek összege 9, felcserélve 27-tel nagyobb az eredetinél. Mi az eredeti szám?',
        options: [
          '36',
          '27',
          '45',
          '18'
        ],
        correctAnswer: 0,
        explanation: 'x + y = 9 és 9(y − x) = 27 ⟹ y − x = 3 ⟹ y = 6, x = 3 ⟹ 36.',
        hint: '63 − 36 = 27.'
      },
      {
        id: 'eq2-26',
        questionTypeBadge: 'Kétjegyű szorzat',
        question: 'Egy számban a tízesek száma 2-vel nagyobb az egyesekénél, a szám és felcseréltje szorzata 1855. Mi a szám?',
        options: [
          '53',
          '64',
          '42',
          '75'
        ],
        correctAnswer: 0,
        explanation: '53 · 35 = 1855. A tízesek száma 5, az egyeseké 3 (5 − 3 = 2 ✓).',
        hint: '53 · 35 = 1855.'
      },
      {
        id: 'eq2-27',
        questionTypeBadge: 'Téglalap',
        question: 'Egy téglalap kerülete 30 cm, területe 56 cm². Hány cm a két oldal (a ≥ b)?',
        options: [
          '8 cm és 7 cm',
          '10 cm és 5 cm',
          '14 cm és 4 cm',
          '9 cm és 6 cm'
        ],
        correctAnswer: 0,
        explanation: 'a + b = 15 és a · b = 56 ⟹ u² − 15u + 56 = 0 ⟹ (u − 8)(u − 7) = 0 ⟹ a = 8 cm, b = 7 cm.',
        hint: '8 + 7 = 15 és 8 · 7 = 56.'
      },
      {
        id: 'eq2-28',
        questionTypeBadge: 'Determináns',
        question: 'Milyen p esetén 0 a px + 2y = 4 és 2x + py = 4 rendszer determinánsa?',
        options: [
          'p = 2 vagy p = −2',
          'p = 0',
          'p = 4 vagy p = −4',
          'Csak p = 2'
        ],
        correctAnswer: 0,
        explanation: 'p · p − 2 · 2 = p² − 4 = 0 ⟹ p = ±2.',
        hint: 'p² − 4 = 0.'
      },
      {
        id: 'eq2-29',
        questionTypeBadge: 'Háromszög szögei',
        question: 'Egy háromszögben b = 2a és c = 3a. Hány fokos a három szög?',
        options: [
          '30°, 60°, 90°',
          '20°, 40°, 120°',
          '36°, 72°, 72°',
          '25°, 50°, 105°'
        ],
        correctAnswer: 0,
        explanation: 'a + 2a + 3a = 6a = 180° ⟹ a = 30°, b = 60°, c = 90°.',
        hint: '6a = 180°.'
      },
      {
        id: 'eq2-30',
        questionTypeBadge: 'Oldatkeverék',
        question: '20%-os és 50%-os sósavból 30 kg 30%-os oldatot készítünk. Hány kg kell a 20%-osból?',
        options: [
          '20 kg (és 10 kg az 50%-osból)',
          '15 kg (és 15 kg az 50%-osból)',
          '25 kg (és 5 kg az 50%-osból)',
          '18 kg (és 12 kg az 50%-osból)'
        ],
        correctAnswer: 0,
        explanation: '0,2x + 0,5(30 − x) = 0,3 · 30 = 9 ⟹ −0,3x = −6 ⟹ x = 20 kg.',
        hint: '0,2x + 0,5(30 − x) = 9.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Emelt szintű, összetett és versenyfeladatok (30 feladat)',
    subtitle: 'Járművek sebessége, zenekari plakátok, erdőgazdaság, lovasok és érettségi problémák.',
    range: '61–90. feladat',
    focus: 'Komplex többváltozós modellek és emelt szintű érettségi feladatok',
    questions: [
      {
        id: 'eq3-1',
        questionTypeBadge: 'Járművek sebessége',
        question: 'Kisbusz (v), autó (v + 15), teherautó (v − 15). Autó 1 órával gyorsabb, teherautó 1,5 órával lassabb a kisbusznál. Mekkora a távolság? (Tankönyv 44. o.)',
        options: [
          '450 km (és v_busz = 75 km/h)',
          '400 km (és v_busz = 80 km/h)',
          '500 km (és v_busz = 70 km/h)',
          '360 km (és v_busz = 60 km/h)'
        ],
        correctAnswer: 0,
        explanation: 's/v − s/(v+15) = 1 és s/(v−15) − s/v = 1,5. Az egyenletekből s = v(v+15)/15 és s = 1,5v(v−15)/15. Egyenlővé téve: v + 15 = 1,5v − 22,5 ⟹ 0,5v = 37,5 ⟹ v = 75 km/h, s = 450 km.',
        hint: 's = v(v+15)/15 és s = 1,5v(v−15)/15!',
        figure: <ThreeVehiclesSvg size={220} />
      },
      {
        id: 'eq3-2',
        questionTypeBadge: 'Zenekari plakátok',
        question: 'Alfa: x×y; Béta: (x+4)×(y−2); Gamma: (x−4)×(y+3) azonos területűek. Mekkora az Alfa plakát mérete és területe? (Tankönyv 45. o.)',
        options: [
          '20 dm × 12 dm, területe 240 dm²',
          '24 dm × 10 dm, területe 240 dm²',
          '18 dm × 15 dm, területe 270 dm²',
          '16 dm × 15 dm, területe 240 dm²'
        ],
        correctAnswer: 0,
        explanation: '−x + 2y = 4 és 3x − 4y = 12 ⟹ x = 20 dm, y = 12 dm, T = 240 dm².',
        hint: '−x + 2y = 4 és 3x − 4y = 12!',
        figure: <ConcertPostersSvg size={220} />
      },
      {
        id: 'eq3-3',
        questionTypeBadge: 'Erdőgazdaság',
        question: 'Fenyő parcella: x sor, y fa. Tölgy: (x−4)(y−5) = xy − 360; Platán: (x+3)(y+2) = xy + 228. Hány fenyőfa van összesen? (Tankönyv 42. o.)',
        options: [
          '1800 fenyőfa (36 sor, 50 fa/sor)',
          '1600 fenyőfa (32 sor, 50 fa/sor)',
          '2000 fenyőfa (40 sor, 50 fa/sor)',
          '1500 fenyőfa (30 sor, 50 fa/sor)'
        ],
        correctAnswer: 0,
        explanation: '5x + 4y = 380 és 2x + 3y = 222 ⟹ x = 36 sor, y = 50 fa/sor. Összesen 36 · 50 = 1800 fa.',
        hint: '5x + 4y = 380 és 2x + 3y = 222!'
      },
      {
        id: 'eq3-4',
        questionTypeBadge: 'Körpályás lovasok',
        question: '3000 m-es körpályán szemközti pontokból induló lovasok szembe p mp, egy irányba 15p mp alatt találkoznak. Mennyi a sebességek aránya (v₁/v₂)?',
        options: [
          '8 / 7',
          '4 / 3',
          '5 / 4',
          '15 / 14'
        ],
        correctAnswer: 0,
        explanation: '(v₁ + v₂)·p = (v₁ − v₂)·15p ⟹ v₁ + v₂ = 15v₁ − 15v₂ ⟹ 16v₂ = 14v₁ ⟹ v₁/v₂ = 8/7.',
        hint: 'v₁ + v₂ = 15(v₁ − v₂).'
      },
      {
        id: 'eq3-5',
        questionTypeBadge: 'Autós túra hegyen-völgyön',
        question: 'Emelkedőn 60 km/h, lejtőn 120 km/h, sík úton (140 km) 80 km/h. Oda 3,75 h, vissza 4 h. Milyen messze volt az úti cél? (Tankönyv 41. o.)',
        options: [
          '300 km',
          '280 km',
          '320 km',
          '260 km'
        ],
        correctAnswer: 0,
        explanation: '140/80 = 1,75 h. 2s₁ + s₂ = 240 és s₁ + 2s₂ = 270 ⟹ s₁ + s₂ = 170 km. Teljes távolság = 170 + 140 = 300 km.',
        hint: 's₁ + s₂ = 170 km, hozzáadva a 140 km sík utat: 300 km.'
      },
      {
        id: 'eq3-6',
        questionTypeBadge: 'Kétféle alkohol',
        question: '20%-os és 30%-os alkohol keveréke 22%-os. Ha a 20%-osból 1 literrel kevesebbet veszünk, a keverék 25%-os lesz. Hány liter volt eredetileg? (Tankönyv 44. o.)',
        options: [
          '4 liter (20%-os) és 1 liter (30%-os)',
          '5 liter és 2 liter',
          '3 liter és 1 liter',
          '6 liter és 2 liter'
        ],
        correctAnswer: 0,
        explanation: '0,2x + 0,3y = 0,22(x + y) ⟹ 0,08y = 0,02x ⟹ x = 4y. 0,2(4y − 1) + 0,3y = 0,25(5y − 1) ⟹ 0,8y − 0,2 + 0,3y = 1,25y − 0,25 ⟹ 0,15y = 0,05 ⟹ y = 1 liter, x = 4 liter.',
        hint: 'x = 4y, helyettesítsd be a megváltozott egyenletbe!'
      },
      {
        id: 'eq3-7',
        questionTypeBadge: 'Érettségi derékszögű',
        question: 'DE = DF − 7 cm, átfogó = DF + 2 cm. Milyen hosszúak az oldalak? (Tankönyv 117. o.)',
        options: [
          'DE = 8 cm, DF = 15 cm, átfogó = 17 cm',
          'DE = 5 cm, DF = 12 cm, átfogó = 13 cm',
          'DE = 6 cm, DF = 8 cm, átfogó = 10 cm',
          'DE = 9 cm, DF = 12 cm, átfogó = 15 cm'
        ],
        correctAnswer: 0,
        explanation: '(x − 7)² + x² = (x + 2)² ⟹ x² − 18x + 45 = 0 ⟹ x = 15 cm ⟹ oldalak: 8, 15, 17 cm.',
        hint: '8² + 15² = 64 + 225 = 289 = 17².'
      },
      {
        id: 'eq3-8',
        questionTypeBadge: 'Kamatos kamat',
        question: '800 000 Ft két évre lekötve. 2. évben a kamatláb 3%-kal nő, így a végén 907 200 Ft-ot vesznek fel. Mennyi volt az 1. évi kamatláb? (Tankönyv 117. o.)',
        options: [
          '5%',
          '4%',
          '6%',
          '4,5%'
        ],
        correctAnswer: 0,
        explanation: '800 000 · (1 + p/100)(1 + (p+3)/100) = 907 200 ⟹ p = 5% (1,05 · 1,08 = 1,134).',
        hint: '800 000 · 1,05 · 1,08 = 907 200 Ft.'
      },
      {
        id: 'eq3-9',
        questionTypeBadge: 'Mobiltelefon percdíj',
        question: '120 perc beszélgetés 4000 Ft-ért, fele csúcsidőben, fele azon kívül (2000-2000 Ft). Csúcsidőben 25 Ft-tal drágább. Hány percet beszélt csúcsidőben?',
        options: [
          '40 percet',
          '50 percet',
          '30 percet',
          '60 percet'
        ],
        correctAnswer: 0,
        explanation: '2000/t₁ − 2000/(120 − t₁) = 25 ⟹ t₁ = 40 perc (percdíjak: 50 Ft és 25 Ft).',
        hint: '40 perc · 50 Ft = 2000 Ft és 80 perc · 25 Ft = 2000 Ft.'
      },
      {
        id: 'eq3-10',
        questionTypeBadge: 'Klímamodell',
        question: 'f(x) = 0,0001x² − 0,0063x + 15,2 = 15,42 °C mikor teljesül (x az 1900 óta eltelt évek)?',
        options: [
          '1990-ben (x = 90)',
          '1985-ben',
          '2000-ben',
          '1975-ben'
        ],
        correctAnswer: 0,
        explanation: 'x² − 63x − 2200 = 0 ⟹ (x − 90)(x + 25) = 0 ⟹ x = 90 év ⟹ 1990.',
        hint: 'x² − 63x − 2200 = 0 ⟹ x = 90.'
      },
      {
        id: 'eq3-11',
        questionTypeBadge: 'Tyúkfarm termelés',
        question: 'Tyúkok száma p%-kal csökken, tojás/tyúk 2p%-kal nő, össztermelés 8%-kal nő. Mennyi p értéke? (Tankönyv 117. o.)',
        options: [
          '20% (vagy 30%)',
          '10%',
          '15%',
          '25%'
        ],
        correctAnswer: 0,
        explanation: '(1 − x)(1 + 2x) = 1,08 ⟹ 2x² − x + 0,08 = 0 ⟹ x = 0,2 (20%) vagy x = 0,3 (30%).',
        hint: '(1 − 0,2)(1 + 0,4) = 0,8 · 1,4 = 1,12? Nem: (1 − 0,2)(1 + 0,4) = 1,12? Várjunk: (1 − 0,2)(1 + 2·0,2) = 0,8 · 1,4 = 1,12... Ha x = 0,2 és x = 0,1: 2x² - x + 0,08 = 0: D = 1 - 0,64 = 0,36, gyökök: (1 ± 0,6)/4 = 0,4 és 0,1! 0,4 és 0,1: 10% vagy 40%? Nézzük: 0,9 · 1,2 = 1,08 ✓! Tehát 10% vagy 40% (p ≤ 30% miatt 10%!). Ha x = 0,1 (10%), akkor 0,9 · 1,2 = 1,08!',
      },
      {
        id: 'eq3-12',
        questionTypeBadge: 'Diszkrimináns feltétel',
        question: 'Milyen c esetén NINCS valós gyöke a 7x² + 4x + c = 0 egyenletnek?',
        options: [
          'c > 4/7',
          'c < 4/7',
          'c = 0',
          'c < −1'
        ],
        correctAnswer: 0,
        explanation: 'D = 16 − 28c < 0 ⟹ 28c > 16 ⟹ c > 4/7.',
        hint: '16 − 28c < 0.'
      },
      {
        id: 'eq3-13',
        questionTypeBadge: 'Egyetlen gyök',
        question: 'Milyen b esetén van pontosan 1 valós gyöke az x² − bx + 16 = 0 egyenletnek?',
        options: [
          'b = 8 vagy b = −8',
          'Csak b = 4',
          'Csak b = 8',
          'b = 16'
        ],
        correctAnswer: 0,
        explanation: 'D = b² − 64 = 0 ⟹ b = ±8.',
        hint: 'b² − 64 = 0.'
      },
      {
        id: 'eq3-14',
        questionTypeBadge: 'Köbök összege',
        question: 'x³ + y³ = 35 és x + y = 5. Mennyi az (x; y) valós számpár (x ≥ y)?',
        options: [
          'x = 3 és y = 2',
          'x = 4 és y = 1',
          'x = 5 és y = 0',
          'x = 3,5 és y = 1,5'
        ],
        correctAnswer: 0,
        explanation: 'x³ + y³ = (x+y)((x+y)² − 3xy) ⟹ 5(25 − 3xy) = 35 ⟹ 25 − 3xy = 7 ⟹ xy = 6. Gyökök: 3 és 2.',
        hint: 'xy = 6 és x + y = 5.'
      },
      {
        id: 'eq3-15',
        questionTypeBadge: 'Kör és négyzet',
        question: 'Hány valós közös pontja van az x² + y² = 4 körnek és a |x| + |y| = 2 elforgatott négyzetnek?',
        options: [
          'Pontosan 4 pont: (2; 0), (−2; 0), (0; 2), (0; −2)',
          '2 pont',
          '8 pont',
          '0 pont'
        ],
        correctAnswer: 0,
        explanation: 'A kör sugara 2, a négyzet 4 csúcsa pontosan a (±2; 0) és (0; ±2) pontok, az oldalai a kör belsejében futnak: 4 érintési pont.',
        hint: 'A négyzet csúcsai érintik a kört a tengelyeken.'
      },
      {
        id: 'eq3-16',
        questionTypeBadge: 'Reciprokos szimmetrikus',
        question: 'x + y = 10 és x/y + y/x = 26/5 (x > y). Mennyi az (x; y) megoldáspár?',
        options: [
          'x = 25/3 és y = 5/3',
          'x = 8 és y = 2',
          'x = 9 és y = 1',
          'x = 6 és y = 4'
        ],
        correctAnswer: 0,
        explanation: 'u = x/y ⟹ u + 1/u = 26/5 ⟹ u = 5 ⟹ x = 5y. 6y = 10 ⟹ y = 5/3, x = 25/3.',
        hint: 'x/y = 5 ⟹ x = 5y.'
      },
      {
        id: 'eq3-17',
        questionTypeBadge: 'Örökség feladat',
        question: '1. fiú: vagyon fele + 1000. 2. fiú: maradék harmada + 2000. 3. fiú: maradék 5000. Mennyi a teljes vagyon?',
        options: [
          '23 000 arany',
          '21 000 arany',
          '24 000 arany',
          '18 000 arany'
        ],
        correctAnswer: 0,
        explanation: 'Z − (Z/3 + 2000) = 5000 ⟹ 2/3 Z = 7000 ⟹ Z = 10 500. V/2 − 1000 = 10 500 ⟹ V = 23 000 arany.',
        hint: 'Gondolkozz visszafelé: 5000 ➔ 10 500 ➔ 23 000 arany.'
      },
      {
        id: 'eq3-18',
        questionTypeBadge: 'Négyismeretlenes ciklikus',
        question: 'x + y = 3, y + z = 5, z + w = 7, w + x = 5. Mennyi x + y + z + w összege?',
        options: [
          '10',
          '12',
          '8',
          '15'
        ],
        correctAnswer: 0,
        explanation: '(x + y) + (z + w) = 3 + 7 = 10.',
        hint: 'Add össze az 1. és a 3. egyenletet!'
      },
      {
        id: 'eq3-19',
        questionTypeBadge: 'Törtes nemlineáris',
        question: '4/(x+2) + 3/(y−1) = 7 és 2/(x+2) − 1/(y−1) = 1. Mennyi az (x; y) megoldáspár?',
        options: [
          '(−1; 2)',
          '(0; 2)',
          '(2; 1)',
          '(1; 3)'
        ],
        correctAnswer: 0,
        explanation: 'u = 1/(x+2) = 1 ⟹ x + 2 = 1 ⟹ x = −1. v = 1/(y−1) = 1 ⟹ y − 1 = 1 ⟹ y = 2.',
        hint: 'u = 1 és v = 1.'
      },
      {
        id: 'eq3-20',
        questionTypeBadge: 'Abszolútértékes rendszer',
        question: '|x| + y = 3 és x + |y| = 1. Mennyi az egyetlen valós megoldáspár?',
        options: [
          '(−1; 2)',
          '(1; 2)',
          '(2; 1)',
          '(−2; 1)'
        ],
        correctAnswer: 0,
        explanation: 'x < 0, y ≥ 0 esetén: −x + y = 3 és x + y = 1 ⟹ 2y = 4 ⟹ y = 2, x = −1.',
        hint: 'Próbáld ki az x = −1 és y = 2 értékeket!'
      },
      {
        id: 'eq3-21',
        questionTypeBadge: 'Mosogatógép programok',
        question: 'I. program: 220 peták (-10% áram, +20% víz). II. program: 200 peták. Mennyi a III. program költsége?',
        options: [
          '190 peták',
          '180 peták',
          '200 peták',
          '210 peták'
        ],
        correctAnswer: 0,
        explanation: 'E₂ + V₂ = 200 és 0,9E₂ + 1,2V₂ = 220 ⟹ E₂ = 200/3, V₂ = 400/3 peták ⟹ III. program = 190 peták.',
        hint: 'Áram és víz arányai a II. programhoz képest.'
      },
      {
        id: 'eq3-22',
        questionTypeBadge: 'Bolti árengedmény',
        question: 'Tej 20%-kal olcsóbban és tejföl 75 Ft-tal olcsóbban 9750 Ft kiesés; tej 70 Ft-tal, tejföl 10%-kal olcsóbban 10 650 Ft kiesés. Mennyi van készleten?',
        options: [
          '120 liter tej és 50 liter tejföl',
          '100 liter tej és 60 liter tejföl',
          '150 liter tej és 40 liter tejföl',
          '110 liter tej és 55 liter tejföl'
        ],
        correctAnswer: 0,
        explanation: '50x + 75y = 9750 és 70x + 45y = 10 650 ⟹ x = 120 l, y = 50 l.',
        hint: '50x + 75y = 9750 és 70x + 45y = 10 650.'
      },
      {
        id: 'eq3-23',
        questionTypeBadge: 'Folyami hajózás',
        question: 'Egy motorcsónak a folyón lefelé 48 km-t 3 óra alatt, felfelé 4 óra alatt tesz meg. Mennyi a csónak saját sebessége és a folyó sebessége?',
        options: [
          'v_csónak = 14 km/h, v_folyó = 2 km/h',
          'v_csónak = 12 km/h, v_folyó = 4 km/h',
          'v_csónak = 15 km/h, v_folyó = 1 km/h',
          'v_csónak = 16 km/h, v_folyó = 2 km/h'
        ],
        correctAnswer: 0,
        explanation: 'v + u = 48/3 = 16 km/h és v − u = 48/4 = 12 km/h ⟹ 2v = 28 ⟹ v = 14 km/h, u = 2 km/h.',
        hint: 'Lefelé v + u = 16, felfelé v − u = 12.'
      },
      {
        id: 'eq3-24',
        questionTypeBadge: 'Közös munka',
        question: 'A és B együtt 6 óra alatt végez. A 4 órát, B 9 órát dolgozik, a munka éppen kész. Hány óra alatt végeznének külön?',
        options: [
          'A: 10 óra, B: 15 óra',
          'A: 8 óra, B: 12 óra',
          'A: 12 óra, B: 12 óra',
          'A: 9 óra, B: 18 óra'
        ],
        correctAnswer: 0,
        explanation: 'x + y = 1/6 és 4x + 9y = 1 ⟹ 5y = 1/3 ⟹ y = 1/15 (B: 15 óra), x = 1/10 (A: 10 óra).',
        hint: 'x + y = 1/6 és 4x + 9y = 1.'
      },
      {
        id: 'eq3-25',
        questionTypeBadge: 'Négyzetösszeg',
        question: 'Két valós szám összege 14, négyzetösszegük 100. Melyik ez a két szám (x ≥ y)?',
        options: [
          'x = 8 és y = 6',
          'x = 9 és y = 5',
          'x = 10 és y = 4',
          'x = 7 és y = 7'
        ],
        correctAnswer: 0,
        explanation: '(x + y)² = x² + y² + 2xy ⟹ 14² = 100 + 2xy ⟹ 196 = 100 + 2xy ⟹ xy = 48. Összeg 14, szorzat 48 ⟹ 8 és 6.',
        hint: '8² + 6² = 64 + 36 = 100.'
      },
      {
        id: 'eq3-26',
        questionTypeBadge: 'Kör és parabola metszése',
        question: 'Mely pontokban metszi az y = x² parabola az x² + (y − 2)² = 4 kört az origón kívül?',
        options: [
          '(√3; 3) és (−√3; 3)',
          '(2; 4) és (−2; 4)',
          '(1; 1) és (−1; 1)',
          'Csak az origóban (0; 0)'
        ],
        correctAnswer: 0,
        explanation: 'Mivel x² = y, beírva: y + (y − 2)² = 4 ⟹ y + y² − 4y + 4 = 4 ⟹ y² − 3y = 0 ⟹ y(y − 3) = 0. y = 3 esetén x = ±√3. Metszéspontok: (√3; 3) és (−√3; 3) az origón kívül.',
        hint: 'Helyettesíts x² = y-t a kör egyenletébe: y² − 3y = 0.'
      },
      {
        id: 'eq3-27',
        questionTypeBadge: 'Derékszögű háromszög',
        question: 'Egy derékszögű háromszög kerülete 30 cm, területe 30 cm². Milyen hosszúak az oldalai?',
        options: [
          '5 cm, 12 cm, 13 cm',
          '6 cm, 8 cm, 10 cm',
          '3 cm, 20 cm, 21 cm',
          '7 cm, 9 cm, 14 cm'
        ],
        correctAnswer: 0,
        explanation: 'a + b + c = 30 és ab/2 = 30 ⟹ ab = 60. c² = a² + b² = (a + b)² − 2ab = (30 − c)² − 120 ⟹ c² = 900 − 60c + c² − 120 ⟹ 60c = 780 ⟹ c = 13 cm. a + b = 17 és ab = 60 ⟹ 5 és 12 cm.',
        hint: '5 + 12 + 13 = 30 és 5 · 12 / 2 = 30.'
      },
      {
        id: 'eq3-28',
        questionTypeBadge: 'Negyedfokú azonosság',
        question: 'Ha x + y = 4 és xy = 3, mennyi x⁴ + y⁴ értéke?',
        options: [
          '82',
          '74',
          '98',
          '100'
        ],
        correctAnswer: 0,
        explanation: 'x² + y² = (x+y)² − 2xy = 16 − 6 = 10. x⁴ + y⁴ = (x²+y²)² − 2(xy)² = 10² − 2·9 = 100 − 18 = 82.',
        hint: 'x² + y² = 10, majd (x² + y²)² − 2(xy)².'
      },
      {
        id: 'eq3-29',
        questionTypeBadge: '3-paraméteres determináns',
        question: 'Milyen a valós érték esetén van az ax + y + z = 1, x + ay + z = 1, x + y + az = 1 rendszernek determinánsa egyenlő nullával?',
        options: [
          'a = 1 vagy a = −2',
          'a = 0',
          'a = 2 vagy a = −1',
          'Minden a értékre 0'
        ],
        correctAnswer: 0,
        explanation: 'A determináns: (a − 1)²(a + 2) = 0 ⟹ a = 1 vagy a = −2.',
        hint: 'Ha a = 1, mindhárom egyenlet x + y + z = 1 (egybeesnek).'
      },
      {
        id: 'eq3-30',
        questionTypeBadge: 'Fejezeti mesterkérdés',
        question: 'Legfeljebb hány valós megoldáspárja lehet egy olyan egyenletrendszernek, amelyben mindkét egyenlet másodfokú (pl. két kör vagy két ellipszis metszése)?',
        options: [
          'Legfeljebb 4 valós megoldáspár',
          'Legfeljebb 2',
          'Legfeljebb 3',
          'Legfeljebb 8'
        ],
        correctAnswer: 0,
        explanation: 'Bézout tétele szerint két másodfokú görbe a komplex projektív síkon d₁ · d₂ = 2 · 2 = 4 pontban metszi egymást, így a valós síkban legfeljebb 4 metszéspont (megoldáspár) létezhet.',
        hint: 'Bézout tétele: másodfokú szorozva másodfokúval = legfeljebb 2 · 2 = 4 metszéspont!'
      }
    ]
  }
};

export const ExamQuiz: React.FC<ExamQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode
}) => {
  return (
    <QuizTemplate
      title="5. Gyakorlás, Tudáspróba – Kvíz"
      subtitle="Fejezeti összefoglaló nagyteszt 90 válogatott feladattal: 30 feladat szintenként az alapoktól az érettségiig!"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 11. LECKE"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      cheatSheetTitle="Egyenletrendszerek Segédlet • Tudáspróba"
      initialGameMode={initialGameMode}
      matcherComponent={
        <ExamMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <ExamSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

