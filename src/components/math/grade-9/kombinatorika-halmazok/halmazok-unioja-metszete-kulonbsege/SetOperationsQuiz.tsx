import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  IntersectionVennSvg,
  UnionVennSvg,
  DifferenceVennSvg,
  ComplementVennSvg,
  DisjointVennSvg,
  DeMorganUnionVennSvg,
  ThreeSetsVennSvg,
  SubsetOperationsVennSvg
} from './SetOperationsFigures';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';
import { SetOperationsMatcher } from './SetOperationsMatcher';
import { SetOperationsSorter } from './SetOperationsSorter';

interface SetOperationsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Halmazműveletek és Venn-diagramok (Könnyű)',
    subtitle: 'Metszet (∩), unió (∪), különbség (\\) és komplementer egyszerű számhalmazokon.',
    range: '1 - 10. feladat',
    focus: 'Műveleti Alapfogalmak és Számítások',
    questions: [
      {
        id: 'soq1-1',
        questionTypeBadge: 'Metszet (∩)',
        question: 'Mit jelent két halmaz metszete (A ∩ B)?',
        figure: <IntersectionVennSvg size={160} />,
        options: [
          'A mindkét halmazban KÖZÖSEN szereplő elemek halmazát',
          'Az összes elemet, ami a két halmaz valamelyikében benne van',
          'Az A halmaz azon elemeit, amelyek nincsenek benne B-ben',
          'Az üres halmazt minden esetben'
        ],
        correctAnswer: 0,
        hint: 'A metszet az „ÉS” logikai kapcsolatnak felel meg: eleme A-nak ÉS eleme B-nek.',
        explanation: 'Az A ∩ B = { x | x ∈ A és x ∈ B }, vagyis azon elemek összessége, amelyek mindkét halmazba egyszerre beletartoznak.'
      },
      {
        id: 'soq1-2',
        questionTypeBadge: 'Unió (∪)',
        question: 'Mit jelent két halmaz uniója (egyesítése, A ∪ B)?',
        figure: <UnionVennSvg size={160} />,
        options: [
          'Azon elemek halmazát, amelyek legalább az egyik halmazban benne vannak',
          'Csak azokat az elemeket, amelyek mindkét halmazban benne vannak',
          'Az A és B halmaz elemszámának szorzatát',
          'Az A halmaz komplementerét'
        ],
        correctAnswer: 0,
        hint: 'Az unió a „VAGY” logikai kapcsolat: vagy A-ban, vagy B-ben (vagy mindkettőben) benne van.',
        explanation: 'Az A ∪ B azon elemek halmaza, amelyek legalább az egyik halmazhoz hozzátartoznak: A ∪ B = { x | x ∈ A vagy x ∈ B }.'
      },
      {
        id: 'soq1-3',
        questionTypeBadge: 'Különbség (\\)',
        question: 'Ha A = {1, 2, 3, 4} és B = {3, 4, 5}, mennyi az A \\ B különbséghalmaz?',
        figure: <DifferenceVennSvg size={160} />,
        options: ['{1, 2}', '{5}', '{3, 4}', '{1, 2, 5}'],
        correctAnswer: 0,
        hint: 'Az A halmazból hagyd el azokat az elemeket, amelyek a B-ben is szerepelnek (a 3-at és 4-et)!',
        explanation: 'Az A \\ B az A azon elemei, amelyek nincsenek benne B-ben: {1, 2, 3, 4} \\ {3, 4, 5} = {1, 2}.'
      },
      {
        id: 'soq1-4',
        questionTypeBadge: 'Metszet Kiszámítása',
        question: 'Ha A = {2, 4, 6, 8} és B = {4, 8, 12}, mennyi A ∩ B?',
        options: ['{4, 8}', '{2, 6}', '{12}', '{2, 4, 6, 8, 12}'],
        correctAnswer: 0,
        hint: 'Keresd meg a két halmaz közös elemeit!',
        explanation: 'A 4 és a 8 mindkét halmazban szerepel, így a közös rész: A ∩ B = {4, 8}.'
      },
      {
        id: 'soq1-5',
        questionTypeBadge: 'Unió Kiszámítása',
        question: 'Ha A = {1, 3} és B = {2, 3, 4}, mennyi A ∪ B?',
        options: ['{1, 2, 3, 4}', '{3}', '{1, 2, 4}', '{1, 3, 2, 3, 4}'],
        correctAnswer: 0,
        hint: 'Egyesítsd az elemeket, de a közös elemet (3) csak egyszer írd fel!',
        explanation: 'Az egyesített halmazban minden előforduló elem szerepel, ismétlés nélkül: A ∪ B = {1, 2, 3, 4}.'
      },
      {
        id: 'soq1-6',
        questionTypeBadge: 'Diszjunkt Halmazok',
        question: 'Mikor nevezünk két halmazt diszjunktnak?',
        figure: <DisjointVennSvg size={160} />,
        options: [
          'Ha metszetük az üres halmaz: A ∩ B = ∅ (nincs közös elemük)',
          'Ha uniójuk az alaphalmaz',
          'Ha egyenlő az elemszámuk (|A| = |B|)',
          'Ha egymás részhalmazai'
        ],
        correctAnswer: 0,
        hint: 'A diszjunkt jelentése: szétválasztott, közös rész nélküli.',
        explanation: 'Két halmaz akkor diszjunkt, ha egyetlen közös elemük sincs, azaz metszetük az üres halmaz (A ∩ B = ∅).'
      },
      {
        id: 'soq1-7',
        questionTypeBadge: 'Komplementer Halmaz',
        question: 'Legyen az alaphalmaz U = {1, 2, 3, 4, 5, 6}, és A = {2, 4, 6}. Mi az Ā (A komplementere)?',
        figure: <ComplementVennSvg size={160} />,
        options: ['{1, 3, 5}', '{2, 4, 6}', '∅', '{1, 2, 3, 4, 5, 6}'],
        correctAnswer: 0,
        hint: 'Az U alaphalmaz azon elemei, amelyek nincsenek benne A-ban (a páratlan számok).',
        explanation: 'Ā = U \\ A = {1, 2, 3, 4, 5, 6} \\ {2, 4, 6} = {1, 3, 5}.'
      },
      {
        id: 'soq1-8',
        questionTypeBadge: 'Különbség Sorrendje',
        question: 'Ha A = {1, 2} és B = {2, 3}, mennyi a B \\ A különbség?',
        options: ['{3}', '{1}', '{2}', '∅'],
        correctAnswer: 0,
        hint: 'Figyelj a sorrendre! Most B-ből kell elvenni az A elemeit!',
        explanation: 'B \\ A = {2, 3} \\ {1, 2} = {3}. (Míg A \\ B = {1} lenne, a különbség tehát nem kommutatív!)'
      },
      {
        id: 'soq1-9',
        questionTypeBadge: 'Önmagával Vett Metszet',
        question: 'Mivel egyenlő bármely A halmaz esetén az A ∩ A és az A ∪ A?',
        options: ['Mindkettő maga az A halmaz (idempotencia)', 'Mindkettő az üres halmaz', 'Az alaphalmazzal (U)', '2A-val'],
        correctAnswer: 0,
        hint: 'Egy halmaz közös része önmagával maga a teljes halmaz.',
        explanation: 'Az unió és a metszet idempotens műveletek: A ∩ A = A és A ∪ A = A.'
      },
      {
        id: 'soq1-10',
        questionTypeBadge: 'Üres Halmazzal Vett Művelet',
        question: 'Mivel egyenlő az A ∩ ∅ és az A ∪ ∅ bármely A halmazra?',
        options: ['A ∩ ∅ = ∅  és  A ∪ ∅ = A', 'A ∩ ∅ = A  és  A ∪ ∅ = ∅', 'Mindkettő ∅', 'Mindkettő A'],
        correctAnswer: 0,
        hint: 'Az üres halmazban semmi sincs: semmivel sincs közös eleme, és hozzáadva sem ad új elemet.',
        explanation: 'Mivel ∅-nak nincs eleme, semmilyen halmazzal nincs közös része (A ∩ ∅ = ∅), egyesítéskor pedig nem ad hozzá semmit (A ∪ ∅ = A).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Műveleti Azonosságok és Komplementerek (Közepes)',
    subtitle: 'De Morgan törvények, műveletek részhalmazokkal és unió elemszám képlete.',
    range: '11 - 20. feladat',
    focus: 'Alkalmazott Szabályok és Logikai Ekvivalenciák',
    questions: [
      {
        id: 'soq2-1',
        questionTypeBadge: 'De Morgan I. Szabálya',
        question: 'A De Morgan azonosság szerint mivel egyenlő az (A ∪ B) komplementere?',
        figure: <DeMorganUnionVennSvg size={160} />,
        options: ['Ā ∩ B̄ (a komplementerek metszete)', 'Ā ∪ B̄', 'A ∩ B', 'U \\ (A ∩ B)'],
        correctAnswer: 0,
        hint: 'A komplementer zárójelbontáskor az unió jelét metszetre fordítja át!',
        explanation: 'De Morgan I. törvénye: az unió komplementere egyenlő a komplementerek metszetével: (A ∪ B)\' = Ā ∩ B̄.'
      },
      {
        id: 'soq2-2',
        questionTypeBadge: 'Unió Elemszáma',
        question: 'Ha |A| = 12, |B| = 9 és |A ∩ B| = 4, hány eleme van az A ∪ B uniónak?',
        figure: <IntersectionVennSvg size={160} />,
        options: ['17 eleme van', '21 eleme van', '25 eleme van', '13 eleme van'],
        correctAnswer: 0,
        hint: '|A ∪ B| = |A| + |B| − |A ∩ B|.',
        explanation: '|A ∪ B| = 12 + 9 − 4 = 17. A közös 4 elemet egyszer le kell vonni, mert mindkettőben benne volt!'
      },
      {
        id: 'soq2-3',
        questionTypeBadge: 'Részhalmaz Metszete',
        question: 'Ha tudjuk, hogy A ⊆ B, akkor mennyi az A ∩ B metszet?',
        figure: <SubsetOperationsVennSvg size={160} />,
        options: ['Maga az A halmaz', 'Maga a B halmaz', 'Üres halmaz (∅)', 'Az U alaphalmaz'],
        correctAnswer: 0,
        hint: 'Ha A teljes egészében benne van B-ben, akkor a közös részük a belső, szűkebb halmaz.',
        explanation: 'Ha A ⊆ B, akkor A minden eleme benne van B-ben, így a közös elemek halmaza pontosan az A halmaz: A ∩ B = A.'
      },
      {
        id: 'soq2-4',
        questionTypeBadge: 'Részhalmaz Uniója',
        question: 'Ha tudjuk, hogy A ⊆ B, akkor mennyi az A ∪ B unió?',
        figure: <SubsetOperationsVennSvg size={160} />,
        options: ['Maga a B halmaz', 'Maga az A halmaz', 'A és B szorzata', 'Üres halmaz'],
        correctAnswer: 0,
        hint: 'Ha A elemei eleve benne vannak B-ben, az egyesítés nem hoz új elemet a B-hez képest.',
        explanation: 'Ha A ⊆ B, akkor az unió a bővebb halmazzal egyezik meg: A ∪ B = B.'
      },
      {
        id: 'soq2-5',
        questionTypeBadge: 'Részhalmaz Különbsége',
        question: 'Ha tudjuk, hogy A ⊆ B, akkor mennyi az A \\ B különbség?',
        figure: <SubsetOperationsVennSvg size={160} />,
        options: ['Üres halmaz (∅)', 'A halmaz', 'B halmaz', 'B \\ A'],
        correctAnswer: 0,
        hint: 'Ha A minden eleme benne van B-ben, maradhat-e olyan A-beli elem, ami nincs B-ben?',
        explanation: 'Mivel A minden eleme B-beli is, az A-ból B összes elemét kivonva semmi sem marad: A \\ B = ∅.'
      },
      {
        id: 'soq2-6',
        questionTypeBadge: 'Disztributivitás',
        question: 'Melyik azonosság fejezi ki a metszet unióra vonatkozó disztributivitását?',
        options: [
          'A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)',
          'A ∩ (B ∪ C) = (A ∪ B) ∩ (A ∪ C)',
          'A ∩ (B ∪ C) = A ∩ B ∩ C',
          'A ∩ (B ∪ C) = (A ∩ B) \\ C'
        ],
        correctAnswer: 0,
        hint: 'Hasonlít a szorzás összeadásra vonatkozó széttagolására: a · (b + c) = a·b + a·c.',
        explanation: 'A halmazelméleti disztributivitás: A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C).'
      },
      {
        id: 'soq2-7',
        questionTypeBadge: 'Kettős Komplementer',
        question: 'Mivel egyenlő bármely A halmaz komplementerének a komplementere (Ā̄)?',
        figure: <ComplementVennSvg size={150} />,
        options: ['Maga az A halmaz', 'Az alaphalmaz (U)', 'Üres halmaz (∅)', 'Nem értelmezhető'],
        correctAnswer: 0,
        hint: 'A tagadás tagadása állítás: kétszer kiegészítve visszajutunk az eredeti halmazhoz.',
        explanation: 'A komplementerképzés involutív művelet: Ā̄ = A (kettős tagadás elve).'
      },
      {
        id: 'soq2-8',
        questionTypeBadge: 'Halmaz és Komplementer Metszete',
        question: 'Mennyi az A ∩ Ā és az A ∪ Ā bármely A halmaz és U alaphalmaz esetén?',
        figure: <ComplementVennSvg size={150} />,
        options: ['A ∩ Ā = ∅  és  A ∪ Ā = U', 'A ∩ Ā = U  és  A ∪ Ā = ∅', 'Mindkettő A', 'Mindkettő ∅'],
        correctAnswer: 0,
        hint: 'Egy elem vagy benne van A-ban, vagy kívül van rajta (a komplementerben): nincs közös részük, de együtt lefedik a teljes U-t.',
        explanation: 'Egy halmaz és komplementere diszjunktak (A ∩ Ā = ∅), egyesítésük pedig a teljes alaphalmazt adja (A ∪ Ā = U).'
      },
      {
        id: 'soq2-9',
        questionTypeBadge: 'Különbség Átírása',
        question: 'Melyik művelettel fejezhető ki az A \\ B különbség a komplementer segítségével?',
        figure: <DifferenceVennSvg size={150} />,
        options: ['A ∩ B̄', 'A ∪ B̄', 'Ā ∩ B', 'Ā ∪ B'],
        correctAnswer: 0,
        hint: 'Azok az elemek kellenek, amelyek A-ban benne vannak ÉS a B komplementerében vannak.',
        explanation: 'A \\ B = { x | x ∈ A és x ∉ B } = { x | x ∈ A és x ∈ B̄ } = A ∩ B̄.'
      },
      {
        id: 'soq2-10',
        questionTypeBadge: 'De Morgan II. Szabálya',
        question: 'Mivel egyenlő a metszet komplementere: (A ∩ B)\' ?',
        options: ['Ā ∪ B̄ (a komplementerek uniója)', 'Ā ∩ B̄', 'A ∪ B', 'U \\ A'],
        correctAnswer: 0,
        hint: 'A komplementer a metszetet (∩) unióra (∪) fordítja meg!',
        explanation: 'De Morgan II. szabálya: (A ∩ B)\' = Ā ∪ B̄.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: 3 Halmazos Venn és Érettségi Szintű Feladványok (Nehéz)',
    subtitle: '3 halmazos Venn-diagramok, szöveges egyenletek és logikai következtetések.',
    range: '21 - 30. feladat',
    focus: 'Összetett Halmazalgebra és Szöveges Modellezés',
    questions: [
      {
        id: 'soq3-1',
        questionTypeBadge: '3 Halmazos Venn Régiók',
        question: 'Hány egymástól független diszjunkt tartományra osztja a síkot 3 egymást metsző halmaz egy alaphalmazon belül?',
        figure: <ThreeSetsVennSvg size={160} />,
        options: ['8 tartományra (2³)', '6 tartományra', '7 tartományra', '9 tartományra'],
        correctAnswer: 0,
        hint: 'Minden egyes elemnél 3 független döntés van (benne van-e A-ban, B-ben, C-ben): 2³ = 8.',
        explanation: '3 halmaz esetén a sík pontosan 2³ = 8 diszjunkt régióra bomlik (a 7 belső tartomány és az 1 külső, alaphalmazbeli tartomány).'
      },
      {
        id: 'soq3-2',
        questionTypeBadge: 'Szöveges Feladat (Diákok Nyelvek)',
        question: 'Egy 30 fős osztályban 18 diák tanul angolul, 14 németül, és 6 diák mindkét nyelvet tanulja. Hányan tanulnak legalább egy nyelvet?',
        options: ['26 diák', '32 diák', '20 diák', '24 diák'],
        correctAnswer: 0,
        hint: '|A ∪ N| = |A| + |N| − |A ∩ N|.',
        explanation: '|A ∪ N| = 18 + 14 − 6 = 26 diák tanul legalább egy nyelvet.'
      },
      {
        id: 'soq3-3',
        questionTypeBadge: 'Komplementer Szöveges Kérdés',
        question: 'Az előző feladat adatai alapján (30 fős osztály, 26-an tanulnak nyelvet), hány olyan diák van, aki SEM angolul, SEM németül nem tanul?',
        figure: <DeMorganUnionVennSvg size={150} />,
        options: ['4 diák', '6 diák', '8 diák', '0 diák'],
        correctAnswer: 0,
        hint: 'Ez a nyelvet tanulók uniójának komplementere: U \\ (A ∪ N).',
        explanation: 'Az összes diákból kivonjuk a legalább egy nyelvet tanulókat: 30 − 26 = 4 diák nem tanul sem angolul, sem németül.'
      },
      {
        id: 'soq3-4',
        questionTypeBadge: 'Csak Az Egyik Halmaz Elemei',
        question: 'A korábbi feladatban (18 angol, 14 német, 6 mindkettő) hány diák tanul CSAK angolul?',
        figure: <DifferenceVennSvg size={150} />,
        options: ['12 diák', '18 diák', '8 diák', '6 diák'],
        correctAnswer: 0,
        hint: 'Az angolosok számából vond le a mindkét nyelvet tanulókat: A \\ N.',
        explanation: 'Csak angolul tanulók = |A \\ N| = |A| − |A ∩ N| = 18 − 6 = 12 diák.'
      },
      {
        id: 'soq3-5',
        questionTypeBadge: 'Szimmetrikus Különbség',
        question: 'Mit nevezünk két halmaz szimmetrikus különbségének (A △ B)?',
        options: [
          '(A \\ B) ∪ (B \\ A) (azok az elemek, amelyek pontosan az egyik halmazban vannak benne)',
          'A ∩ B (a közös elemeket)',
          'A ∪ B (az összes elemet)',
          'A \\ B (csak az A-beli elemeket)'
        ],
        correctAnswer: 0,
        hint: 'Ez a „kizáró vagy” (XOR) műveletnek felel meg: vagy csak A-ban, vagy csak B-ben van.',
        explanation: 'A szimmetrikus különbség A △ B = (A \\ B) ∪ (B \\ A) = (A ∪ B) \\ (A ∩ B), vagyis a pontosan az egyik halmazba tartozó elemek.'
      },
      {
        id: 'soq3-6',
        questionTypeBadge: 'Halmazegyenlet Következtetés',
        question: 'Ha tudjuk, hogy A \\ B = A, milyen következtetés vonható le biztosan?',
        figure: <DisjointVennSvg size={150} />,
        options: [
          'A és B diszjunkt halmazok (A ∩ B = ∅)',
          'A részhalmaza B-nek (A ⊆ B)',
          'B az üres halmaz',
          'A = B'
        ],
        correctAnswer: 0,
        hint: 'Ha a B-beli elemek elhagyása után semmi sem fogyott el A-ból, volt-e közös elemük?',
        explanation: 'Mivel A \\ B = A, az A halmazból egyetlen elem sem esett ki, vagyis B-nek nem volt közös eleme A-val: A ∩ B = ∅ (diszjunktak).'
      },
      {
        id: 'soq3-7',
        questionTypeBadge: 'Halmazegyenlet Unióra',
        question: 'Ha tudjuk, hogy A ∪ B = A, mit jelent ez a két halmaz viszonyára nézve?',
        figure: <SubsetOperationsVennSvg size={150} />,
        options: [
          'B részhalmaza A-nak (B ⊆ A)',
          'A részhalmaza B-nek (A ⊆ B)',
          'A és B diszjunktak',
          'B az alaphalmaz'
        ],
        correctAnswer: 0,
        hint: 'Ha B-t hozzáadva A-hoz nem kaptunk új elemet, hol voltak eleve B elemei?',
        explanation: 'Az A ∪ B = A pontosan akkor teljesül, ha B minden eleme már eleve benne volt A-ban, tehát B ⊆ A.'
      },
      {
        id: 'soq3-8',
        questionTypeBadge: 'Halmazegyenlet Metszetre',
        question: 'Ha tudjuk, hogy A ∩ B = A, mit jelent ez a két halmaz viszonyára?',
        figure: <SubsetOperationsVennSvg size={150} />,
        options: [
          'A részhalmaza B-nek (A ⊆ B)',
          'B részhalmaza A-nak (B ⊆ A)',
          'A = ∅ mindenképpen',
          'A és B diszjunktak'
        ],
        correctAnswer: 0,
        hint: 'Ha a közös rész maga az egész A halmaz, akkor A minden eleme B-ben is benne van.',
        explanation: 'Az A ∩ B = A pontosan akkor igaz, ha A ⊆ B.'
      },
      {
        id: 'soq3-9',
        questionTypeBadge: '3 Halmazos Szitaformula',
        question: 'Melyik a 3 halmaz uniójának helyes elemszám-képlete (|A ∪ B ∪ C|)?',
        figure: <ThreeSetsVennSvg size={150} />,
        options: [
          '|A| + |B| + |C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C|',
          '|A| + |B| + |C| - |A∩B∩C|',
          '|A| + |B| + |C| - |A∩B| - |A∩C| - |B∩C|',
          '|A| · |B| · |C|'
        ],
        correctAnswer: 0,
        hint: 'A páros metszeteket le kell vonni (túlkompenzálás), a hármas metszetet pedig a végén vissza kell adni!',
        explanation: 'Ez a híres szitaformula (Poincaré-formula): a páros metszetek levonásakor a középső hármas metszetet háromszor levontuk, ezért egyszer vissza kell adni: + |A ∩ B ∩ C|.'
      },
      {
        id: 'soq3-10',
        questionTypeBadge: 'Üres Halmaz és Komplementer',
        question: 'Mennyi az üres halmaz komplementere (∅\') és az alaphalmaz komplementere (U\')?',
        options: [
          '∅\' = U  és  U\' = ∅',
          '∅\' = ∅  és  U\' = U',
          'Mindkettő ∅',
          'Mindkettő U'
        ],
        correctAnswer: 0,
        hint: 'U \\ ∅ = U (semmit sem veszünk el U-ból), míg U \\ U = ∅ (mindent elveszünk).',
        explanation: 'Az üres halmaz komplementere a teljes univerzum (∅\' = U \\ ∅ = U), az univerzum komplementere pedig az üres halmaz (U\' = U \\ U = ∅).'
      }
    ]
  }
};

const setOperationsCheatSheets: CheatSheetCard[] = [
  {
    title: 'A 4 Fő Halmazművelet',
    items: [
      { label: 'Metszet (A ∩ B)', value: 'Közös elemek: x ∈ A és x ∈ B' },
      { label: 'Unió (A ∪ B)', value: 'Egyesítés: x ∈ A vagy x ∈ B' },
      { label: 'Különbség (A \\ B)', value: 'A-ban van, de B-ben nincs: x ∈ A és x ∉ B' },
      { label: 'Komplementer (Ā)', value: 'U alaphalmazból kivonva A: U \\ A' },
      { label: 'Diszjunkt halmazok', value: 'Nincs közös elemük: A ∩ B = ∅' }
    ]
  },
  {
    title: 'Műveleti Tulajdonságok és De Morgan',
    items: [
      { label: 'Kommutativitás', value: 'A ∪ B = B ∪ A,  A ∩ B = B ∩ A  (de A \\ B ≠ B \\ A!)' },
      { label: 'De Morgan I.', value: '(A ∪ B)\' = Ā ∩ B̄ (unió tagadása = metszet)' },
      { label: 'De Morgan II.', value: '(A ∩ B)\' = Ā ∪ B̄ (metszet tagadása = unió)' },
      { label: 'Kettős komplementer', value: 'Ā̄ = A' },
      { label: 'Különbség átírása', value: 'A \\ B = A ∩ B̄' }
    ]
  },
  {
    title: 'Részhalmazok és Elemszám Képletek',
    items: [
      { label: 'Ha A ⊆ B', value: 'A ∩ B = A,  A ∪ B = B,  A \\ B = ∅' },
      { label: 'Két halmaz uniója', value: '|A ∪ B| = |A| + |B| - |A ∩ B|' },
      { label: 'Diszjunkt unió', value: 'Ha A ∩ B = ∅, akkor |A ∪ B| = |A| + |B|' },
      { label: 'Csak A elemei', value: '|A \\ B| = |A| - |A ∩ B|' },
      { label: '3 halmaz uniója', value: '|A| + |B| + |C| - páros metszetek + |A ∩ B ∩ C|' }
    ]
  }
];

export const SetOperationsQuiz: React.FC<SetOperationsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      levelConfigs={quizLevels}
      cheatSheetCards={setOperationsCheatSheets}
      defaultLevel={1}
      topicId="g9-komb-halmaz-muveletek-quiz"
      topicTitle="9. Osztály - Halmazok Uniója, Metszete és Különbsége"
      themeColor="indigo"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a halmazműveleti képleteket a megfelelő Venn-diagramokkal!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <SetOperationsMatcher
              key={`set-ops-matcher-${level}`}
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
          subtitle: 'Kategorizáld a kifejezéseket művelettípus és érvényesség szerint!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-teal-600 dark:text-teal-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <SetOperationsSorter
              key={`set-ops-sorter-${level}`}
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

export default SetOperationsQuiz;
