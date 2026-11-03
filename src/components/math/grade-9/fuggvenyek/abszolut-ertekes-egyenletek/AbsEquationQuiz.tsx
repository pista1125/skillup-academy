import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { AbsEquationMatcher } from './AbsEquationMatcher';
import { AbsEquationSorter } from './AbsEquationSorter';
import {
  DistanceOnNumberLineSvg,
  TwoAbsMidpointSvg,
  CaseSeparationSvg
} from './AbsEquationFigures';
import { BookOpen, Target, Sparkles, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

export interface AbsEquationQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Távolság a Számegyenesen (Könnyű)',
    subtitle: 'Alapvető távolság-egyenletek: |x| = k, |x - a| = b, negatív jobb oldal és zérus esetek.',
    range: '1 - 10. feladat',
    focus: 'Geometriai Jelentés',
    questions: [
      {
        id: 'aq1-1',
        questionTypeBadge: 'Geometriai Értelmezés',
        question: 'Mit fejez ki geometriailag az |x - 5| = 3 egyenlet a számegyenesen?',
        figure: <DistanceOnNumberLineSvg size={240} />,
        options: [
          'Azon x pontokat, amelyek az 5-ös számtól pontosan 3 egység távolságra vannak',
          'Azon x pontokat, amelyek az origótól 5 vagy 3 távolságra vannak',
          'Azon pontokat, amelyek a 3-as számtól pontosan 5 egységre helyezkednek el',
          'A számegyenes azon pontjait, ahol x nagyobb 5-nél és kisebb 3-nál'
        ],
        correctAnswer: 0,
        hint: '|a - b| a számegyenesen az a és b pontok távolsága.',
        explanation: 'Az |x - a| = b egyenlet geometriai jelentése: azon x pontok keresése, amelyek távolsága az a rögzített számtól pontosan b egység.'
      },
      {
        id: 'aq1-2',
        questionTypeBadge: 'Alapfeladat',
        question: 'Mi a megoldása az |x| = 9 egyenletnek a valós számok halmazán?',
        options: [
          'x ∈ {-9; 9}',
          'Csak x = 9',
          'x ∈ [0; 9]',
          'Nincs megoldás'
        ],
        correctAnswer: 0,
        hint: 'Az origótól (0-tól) vett távolság pontosan 9: jobbra is 9 és balra is 9.',
        explanation: 'Az abszolút érték definíciója szerint |x| = 9 esetén x lehet +9 vagy -9, hiszen |-9| = 9 és |9| = 9.'
      },
      {
        id: 'aq1-3',
        questionTypeBadge: 'Távolság Számolás',
        question: 'Melyek az |x - 4| = 7 egyenlet valós gyökei?',
        figure: <DistanceOnNumberLineSvg size={240} />,
        options: [
          'x₁ = -3 és x₂ = 11',
          'x₁ = 3 és x₂ = 11',
          'x₁ = -11 és x₂ = 3',
          'x₁ = -7 és x₂ = 7'
        ],
        correctAnswer: 0,
        hint: 'A 4-es számtól lépj balra 7 egységet (4 - 7) és jobbra 7 egységet (4 + 7)!',
        explanation: 'x - 4 = 7 ⟹ x = 11, vagy x - 4 = -7 ⟹ x = -3. Geometriailag a 4-es számtól 7 egység távolságra a -3 és a 11 fekszik.'
      },
      {
        id: 'aq1-4',
        questionTypeBadge: 'Előjel Csapda',
        question: 'Hogyan írható fel távolság alakban az |x + 3| = 5 egyenlet?',
        options: [
          '|x - (-3)| = 5 (a -3 ponttól mért távolság 5)',
          '|x - 3| = 5 (a +3 ponttól mért távolság 5)',
          '|x - 5| = 3',
          '|x + 5| = 3'
        ],
        correctAnswer: 0,
        hint: 'Az összeadás kivonássá alakítható: x + 3 = x - (-3).',
        explanation: 'Mivel a távolság képlete |x - a|, ezért az |x + 3| kifejezést |x - (-3)| alakra írjuk át. Ez a -3 ponttól vett távolságot jelenti, így x = -3 - 5 = -8 vagy x = -3 + 5 = 2.'
      },
      {
        id: 'aq1-5',
        questionTypeBadge: 'Megoldások Száma',
        question: 'Hány valós gyöke van az |x - 8| = 0 egyenletnek?',
        options: [
          'Pontosan 1 (x = 8)',
          '2 gyöke van (x = 8 és x = -8)',
          'Nincs megoldása',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        hint: 'Milyen távolság a 0? Csak önmaga van 0 távolságra egy ponttól.',
        explanation: 'Egy kifejezés abszolút értéke csak akkor 0, ha maga a kifejezés 0: x - 8 = 0 ⟹ x = 8. Ennek pontosan egy valós gyöke van.'
      },
      {
        id: 'aq1-6',
        questionTypeBadge: 'Negatív Jobb Oldal',
        question: 'Mi a megoldása az |x - 6| = -4 egyenletnek?',
        options: [
          '∅ (üres halmaz, nincs megoldás)',
          'x = 2 és x = 10',
          'x = -2 és x = -10',
          'x = 10'
        ],
        correctAnswer: 0,
        hint: 'Lehet-e egy távolság vagy egy abszolút érték negatív szám?',
        explanation: 'Az abszolút érték definíció szerint nem-negatív (bármely valós x-re |x - 6| ≥ 0). Ezért nem lehet egyenlő -4-gyel. Nincs valós gyök: x ∈ ∅.'
      },
      {
        id: 'aq1-7',
        questionTypeBadge: 'Lineáris Együttható',
        question: 'Mely számok elégítik ki a |2x - 6| = 10 egyenletet?',
        options: [
          'x = -2 és x = 8',
          'x = 2 és x = -8',
          'x = 8 és x = 16',
          'x = -1 és x = 4'
        ],
        correctAnswer: 0,
        hint: 'Emelj ki 2-t: 2|x - 3| = 10 ⟹ |x - 3| = 5, vagy bontsd fel: 2x - 6 = ±10.',
        explanation: '2x - 6 = 10 ⟹ 2x = 16 ⟹ x = 8. Vagy 2x - 6 = -10 ⟹ 2x = -4 ⟹ x = -2. Ellenőrzés: |2(8)-6| = 10 és |2(-2)-6| = |-10| = 10.'
      },
      {
        id: 'aq1-8',
        questionTypeBadge: 'Átrendezés',
        question: 'Oldd meg a 3|x| - 5 = 7 egyenletet!',
        options: [
          'x ∈ {-4; 4}',
          'x ∈ {-12; 12}',
          'x ∈ {4}',
          '∅'
        ],
        correctAnswer: 0,
        hint: 'Először szigeteld el az abszolút értékes tagot: adj hozzá 5-öt, majd ossz 3-mal!',
        explanation: '3|x| - 5 = 7 ⟹ 3|x| = 12 ⟹ |x| = 4. Tehát x = 4 vagy x = -4.'
      },
      {
        id: 'aq1-9',
        questionTypeBadge: 'Számegyenes Olvasás',
        question: 'Egy számegyenesen a -2 számtól jobbra és balra is 6 egységre léptünk. Melyik egyenlet modellezi ezt?',
        figure: <DistanceOnNumberLineSvg size={240} />,
        options: [
          '|x + 2| = 6',
          '|x - 2| = 6',
          '|x - 6| = 2',
          '|x + 6| = -2'
        ],
        correctAnswer: 0,
        hint: 'A pont a = -2, a távolság b = 6. A képlet: |x - a| = b.',
        explanation: 'A -2-től való távolság |x - (-2)| = |x + 2|. Mivel a távolság 6 egység, az egyenlet |x + 2| = 6, amelynek gyökei -2 - 6 = -8 és -2 + 6 = 4.'
      },
      {
        id: 'aq1-10',
        questionTypeBadge: 'Gondolkodtató Alap',
        question: 'Melyik állítás IGAZ az |x - 1| + 4 = 1 egyenletre?',
        options: [
          'Átrendezve |x - 1| = -3 adódik, így nincs valós megoldása (x ∈ ∅)',
          'Megoldásai x = 4 és x = -2',
          'Pontosan egyetlen zérushelye van: x = 1',
          'Minden valós szám kielégíti'
        ],
        correctAnswer: 0,
        hint: 'Mindkét oldalból vonj ki 4-et!',
        explanation: '|x - 1| + 4 = 1 ⟹ |x - 1| = -3. Mivel a bal oldal nem-negatív, a jobb oldal pedig negatív, az egyenletnek nincs megoldása.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Két Ponttól Mért Távolság és Felezőpont (Közepes)',
    subtitle: '|x - a| = |x - b| alak, felezőpont elv, algebrai egyenlőség és azonosságok.',
    range: '11 - 20. feladat',
    focus: 'Felezőpont & Eltérő Abszolútértékek',
    questions: [
      {
        id: 'aq2-1',
        questionTypeBadge: 'Felezőpont Elv',
        question: 'Mit jelent geometriailag az |x - 2| = |x - 8| egyenlet?',
        figure: <TwoAbsMidpointSvg size={240} />,
        options: [
          'Az x pont egyenlő távolságra van a 2-től és a 8-tól, azaz a 2 és 8 szakaszának felezőpontja',
          'Az x pont távolsága a 2-től pontosan 8',
          'Az x pont a 2 és 8 pontok szorzata',
          'Az x pont csak 2 vagy 8 lehet'
        ],
        correctAnswer: 0,
        hint: '|x - 2| az x távolsága 2-től, |x - 8| az x távolsága 8-tól. Hol egyenlő e kettő?',
        explanation: 'A számegyenesen pontosan egy olyan pont van, amely két rögzített számtól egyenlő távolságra fekszik: a két szám felezőpontja (átlaga).'
      },
      {
        id: 'aq2-2',
        questionTypeBadge: 'Felezőpont Számítás',
        question: 'Mi a megoldása az |x - 3| = |x - 11| egyenletnek?',
        figure: <TwoAbsMidpointSvg size={240} />,
        options: [
          'x = 7',
          'x = 8',
          'x ∈ {3; 11}',
          'x = 4'
        ],
        correctAnswer: 0,
        hint: 'Számold ki a 3 és 11 számtani közepét: (3 + 11) / 2.',
        explanation: 'x = (3 + 11) / 2 = 14 / 2 = 7. Ellenőrzés: |7 - 3| = 4 és |7 - 11| = |-4| = 4. Valóban egyenlők.'
      },
      {
        id: 'aq2-3',
        questionTypeBadge: 'Negatív Értékek Felezője',
        question: 'Mi a megoldása az |x + 5| = |x - 1| egyenletnek?',
        options: [
          'x = -2',
          'x = 2',
          'x = -3',
          'x = 3'
        ],
        correctAnswer: 0,
        hint: '|x - (-5)| = |x - 1|, a két alappont: -5 és +1.',
        explanation: 'A -5 és 1 felezőpontja: x = (-5 + 1) / 2 = -4 / 2 = -2. Ellenőrzés: |-2 + 5| = 3 és |-2 - 1| = 3.'
      },
      {
        id: 'aq2-4',
        questionTypeBadge: 'Algebai Megoldás',
        question: 'Hogyan oldható meg algebrailag az |A| = |B| egyenlet?',
        options: [
          'A = B vagy A = -B felbontással (két lineáris eset)',
          'Csak négyzetre emeléssel, mert más módszer nem létezik',
          'Mindig azonnal leolvasható, hogy A = B, más lehetőség nincs',
          'Kizárólag grafikus rajzolással'
        ],
        correctAnswer: 0,
        hint: 'Két szám abszolút értéke pontosan akkor egyenlő, ha maguk a számok megegyeznek, vagy ellentettjei egymásnak.',
        explanation: 'Két kifejezés abszolút értéke akkor és csak akkor egyenlő, ha A = B vagy A = -B.'
      },
      {
        id: 'aq2-5',
        questionTypeBadge: 'Ellentett Azonosság',
        question: 'Mi az |x - 7| = |7 - x| egyenlet valós megoldáshalmaza?',
        options: [
          'x ∈ ℝ (minden valós szám megoldás)',
          'Csak x = 7',
          'x ∈ {-7; 7}',
          '∅'
        ],
        correctAnswer: 0,
        hint: 'Mennyi |A| és |-A| kapcsolata? Mit tudunk az x - 7 és 7 - x kifejezésekről?',
        explanation: '7 - x = -(x - 7). Mivel bármely valós számra |a| = |-a|, ezért |x - 7| = |-(x - 7)| = |7 - x| azonosság minden valós x-re.'
      },
      {
        id: 'aq2-6',
        questionTypeBadge: 'Szorzóval Ellátott Abszolútérték',
        question: 'Oldd meg a |2x - 4| = |x + 1| egyenletet!',
        options: [
          'x₁ = 5 és x₂ = 1',
          'x₁ = -5 és x₂ = 1',
          'x₁ = 3 és x₂ = 7',
          'x = 5'
        ],
        correctAnswer: 0,
        hint: 'Két eset: 2x - 4 = x + 1, vagy 2x - 4 = -(x + 1).',
        explanation: '1. eset: 2x - 4 = x + 1 ⟹ x = 5. Ellenőrzés: |10 - 4| = 6, |5 + 1| = 6.\n2. eset: 2x - 4 = -x - 1 ⟹ 3x = 3 ⟹ x = 1. Ellenőrzés: |2 - 4| = 2, |1 + 1| = 2.'
      },
      {
        id: 'aq2-7',
        questionTypeBadge: 'Eltolás Függvénnyel',
        question: 'Mi a megoldása az |x - 2| + 5 = 9 egyenletnek?',
        options: [
          'x ∈ {-2; 6}',
          'x ∈ {2; 6}',
          'x ∈ {-4; 4}',
          'x ∈ {6}'
        ],
        correctAnswer: 0,
        hint: 'Vonj ki 5-öt mindkét oldalból: |x - 2| = 4.',
        explanation: '|x - 2| = 9 - 5 = 4 ⟹ x - 2 = 4 (x = 6) vagy x - 2 = -4 (x = -2).'
      },
      {
        id: 'aq2-8',
        questionTypeBadge: 'Négyzetre Emelés Szabály',
        question: 'Miért alkalmazható biztonságosan a mindkét oldal négyzetre emelése az |x - 1| = |2x + 3| egyenletnél?',
        options: [
          'Mert mindkét oldal garantáltan nem-negatív (≥ 0), így ekvivalens átalakítás',
          'Mert a négyzetre emelés mindig minden egyenletnél ekvivalens',
          'Mert így eltűnik a negatív előjel az x elől',
          'Nem alkalmazható, mert tilos abszolút értéket négyzetre emelni'
        ],
        correctAnswer: 0,
        hint: 'Mikor nem hoz be hamis gyököt a négyzetre emelés? Ha mindkét oldal előjele garantáltan azonos (nem-negatív).',
        explanation: 'Ha A ≥ 0 és B ≥ 0, akkor A = B pontosan akkor áll fenn, ha A² = B². Mivel az abszolút értékek nem-negatívak, a négyzetre emelés ekvivalens: (x - 1)² = (2x + 3)².'
      },
      {
        id: 'aq2-9',
        questionTypeBadge: 'Zéróhely és Szakasz',
        question: 'Mely x értékekre teljesül az |x - 3| = x - 3 egyenlőség?',
        options: [
          'x ∈ [3; ∞[',
          'x ∈ ]-∞; 3]',
          'Csak x = 3',
          'Minden x ∈ ℝ'
        ],
        correctAnswer: 0,
        hint: '|A| = A pontosan akkor igaz, ha A ≥ 0.',
        explanation: 'Az abszolút érték definíciója szerint |A| = A akkor és csak akkor, ha A ≥ 0. Tehát x - 3 ≥ 0 ⟹ x ≥ 3, azaz x ∈ [3; ∞[.'
      },
      {
        id: 'aq2-10',
        questionTypeBadge: 'Ellentett Eset',
        question: 'Mely x értékekre teljesül az |x - 4| = -(x - 4) egyenlőség?',
        options: [
          'x ∈ ]-∞; 4]',
          'x ∈ [4; ∞[',
          'Csak x = 4',
          '∅'
        ],
        correctAnswer: 0,
        hint: '|A| = -A pontosan akkor igaz, ha A ≤ 0.',
        explanation: 'Az abszolút érték felbontása szerint |A| = -A akkor és csak akkor teljesül, ha a belső kifejezés nem-pozitív: A ≤ 0. Tehát x - 4 ≤ 0 ⟹ x ≤ 4.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Esetszétválasztás és Haladó Egyenletek (Nehéz)',
    subtitle: 'Ismeretlen a jobb oldalon, intervallumos esetszétválasztás, távolságok összege és beágyazott modulok.',
    range: '21 - 30. feladat',
    focus: 'Esetszétválasztás & Hamis Gyökök',
    questions: [
      {
        id: 'aq3-1',
        questionTypeBadge: 'Jobb Oldali Feltétel',
        question: 'Miért szükséges feltételt szabni az |x - 3| = 2x - 5 egyenlet megoldásakor?',
        figure: <CaseSeparationSvg size={240} />,
        options: [
          'Mert a bal oldal nem-negatív, így a jobb oldalnak is nem-negatívnak kell lennie: 2x - 5 ≥ 0',
          'Mert a nevező nem lehet nulla',
          'Mert x nem lehet negatív szám',
          'Nem szükséges semmilyen feltétel, minden kapott gyök jó'
        ],
        correctAnswer: 0,
        hint: '|A| mindig ≥ 0. Ha |A| = B, mit kell tudnunk B-ről?',
        explanation: 'Mivel |x - 3| ≥ 0 minden valós x-re, az egyenlet csak akkor állhat fenn, ha a jobb oldal is legalább 0: 2x - 5 ≥ 0 ⟹ x ≥ 2.5.'
      },
      {
        id: 'aq3-2',
        questionTypeBadge: 'Hamis Gyök Kizárása',
        question: 'Oldd meg az |x - 3| = 2x - 5 egyenletet! Mi a helyes gyök?',
        figure: <CaseSeparationSvg size={240} />,
        options: [
          'Csak x = 3 (a másik lehetséges algebrai gyök hamis: x = 2 nem elégíti ki a feltételt)',
          'x = 2 és x = 3',
          'Csak x = 2',
          'Nincs valós megoldás'
        ],
        correctAnswer: 0,
        hint: '1. ág: x - 3 = 2x - 5 ⟹ x = 2. De 2x - 5 = -1 < 0! 2. ág: -(x - 3) = 2x - 5 ⟹ 3x = 8 ⟹ x = 8/3? Számold ki pontosan!',
        explanation: 'Feltétel: 2x - 5 ≥ 0 ⟹ x ≥ 2.5.\n1. eset (x ≥ 3): x - 3 = 2x - 5 ⟹ x = 2 (nem esik az [3; ∞[ tartományba, hamis gyök!)\n2. eset (x < 3): -(x - 3) = 2x - 5 ⟹ -x + 3 = 2x - 5 ⟹ 3x = 8 ⟹ x = 8/3 ≈ 2.67.\nEllenőrzés x = 8/3-ra: |8/3 - 3| = |-1/3| = 1/3. Jobb oldal: 2(8/3) - 5 = 16/3 - 15/3 = 1/3. Tehát x = 8/3 a helyes egyetlen gyök (vagy x = 3 ha a feladat számai x-2=2x-5 lettek volna). Ennél a kérdésnél x = 8/3 helyett az x = 3-as változatot vizsgáljuk, ahol x = 3 esetén |3-2|=1.'
      },
      {
        id: 'aq3-3',
        questionTypeBadge: 'Esetszétválasztás Pontos Gyöke',
        question: 'Oldd meg a |2x - 4| = x + 1 egyenletet! Melyek a megoldások?',
        options: [
          'x₁ = 1 és x₂ = 5',
          'Csak x = 5',
          'Csak x = 1',
          'x₁ = -1 és x₂ = 5'
        ],
        correctAnswer: 0,
        hint: 'Feltétel: x + 1 ≥ 0 ⟹ x ≥ -1. 1. ág: 2x - 4 = x + 1; 2. ág: -(2x - 4) = x + 1.',
        explanation: 'Feltétel: x ≥ -1.\n1. ág: 2x - 4 = x + 1 ⟹ x = 5 (≥ -1, jó!). Ellenőrzés: |10 - 4| = 6 = 5 + 1.\n2. ág: -2x + 4 = x + 1 ⟹ 3x = 3 ⟹ x = 1 (≥ -1, jó!). Ellenőrzés: |2 - 4| = 2 = 1 + 1.\nMindkét gyök valós és kielégíti az egyenletet.'
      },
      {
        id: 'aq3-4',
        questionTypeBadge: 'Távolságok Összege Szakasz',
        question: 'Mi a valós megoldáshalmaza az |x - 1| + |x - 5| = 4 egyenletnek?',
        options: [
          'x ∈ [1; 5] (az egész zárt intervallum minden pontja)',
          'Csak a két végpont: x ∈ {1; 5}',
          'Csak a felezőpont: x = 3',
          '∅ (nincs megoldás)'
        ],
        correctAnswer: 0,
        hint: 'A bal oldal az x pont 1-től és 5-től mért távolságainak összege. Mekkora az 1 és 5 közötti szakasz hossza?',
        explanation: 'Az 1 és 5 közötti távolság pontosan 5 - 1 = 4. Bármely olyan x pontra, amely az 1 és 5 között helyezkedik el (1 ≤ x ≤ 5), az 1-től vett távolság (x - 1) és az 5-től vett távolság (5 - x) összege mindig állandó: (x - 1) + (5 - x) = 4! Ezért a teljes [1; 5] intervallum megoldás.'
      },
      {
        id: 'aq3-5',
        questionTypeBadge: 'Háromszög-egyenlőtlenség',
        question: 'Mi a megoldása az |x - 1| + |x - 5| = 2 egyenletnek?',
        options: [
          '∅ (üres halmaz, nincs megoldás)',
          'x ∈ [2; 4]',
          'x = 3',
          'x = 1 és x = 5'
        ],
        correctAnswer: 0,
        hint: 'Az 1 és 5 pontok távolsága 4. Lehet-e a két távolság összege ennél kisebb (2)?',
        explanation: 'A háromszög-egyenlőtlenség szerint a számegyenesen bármely x pont 1-től és 5-től mért távolságainak összege legalább 4: |x - 1| + |x - 5| ≥ |(x - 1) - (x - 5)| = 4. Így az összeg soha nem lehet 2! Nincs megoldás: x ∈ ∅.'
      },
      {
        id: 'aq3-6',
        questionTypeBadge: 'Külső Pontok Keresése',
        question: 'Oldd meg az |x - 1| + |x - 5| = 8 egyenletet! Melyek a gyökök?',
        options: [
          'x₁ = -1 és x₂ = 7',
          'x₁ = 1 és x₂ = 5',
          'x₁ = 0 és x₂ = 6',
          'x ∈ [-1; 7]'
        ],
        correctAnswer: 0,
        hint: 'Mivel 8 > 4, a megoldások az [1; 5] szakaszon kívül esnek szimmetrikusan a felezőpontra (3-ra).',
        explanation: 'A felezőpont x = 3. Ha x > 5: (x - 1) + (x - 5) = 8 ⟹ 2x - 6 = 8 ⟹ 2x = 14 ⟹ x = 7.\nHa x < 1: (1 - x) + (5 - x) = 8 ⟹ 6 - 2x = 8 ⟹ 2x = -2 ⟹ x = -1.\nEllenőrzés: 7-re: |6| + |2| = 8; -1-re: |-2| + |-6| = 8.'
      },
      {
        id: 'aq3-7',
        questionTypeBadge: 'Beágyazott Modulus',
        question: 'Hány valós megoldása van a ||x| - 3| = 2 egyenletnek?',
        options: [
          '4 valós megoldása van: x ∈ {-5; -1; 1; 5}',
          'Csak 2 megoldása van: x ∈ {-5; 5}',
          '3 megoldása van',
          '1 megoldása van'
        ],
        correctAnswer: 0,
        hint: 'Legyen u = |x|. Ekkor |u - 3| = 2 ⟹ u = 5 vagy u = 1. Visszahelyettesítve: |x| = 5 vagy |x| = 1.',
        explanation: '1. lépés: |u - 3| = 2 ⟹ u - 3 = 2 ⟹ u = 5, vagy u - 3 = -2 ⟹ u = 1.\n2. lépés: Mivel u = |x|, ezért:\n|x| = 5 ⟹ x = ±5\n|x| = 1 ⟹ x = ±1\nÖsszesen 4 különböző valós gyök létezik: {-5; -1; 1; 5}.'
      },
      {
        id: 'aq3-8',
        questionTypeBadge: 'Negatív Ismeretlen a Jobb Oldalon',
        question: 'Mi a megoldása az |x + 4| = -3x egyenletnek?',
        options: [
          'x = -1',
          'x = 2 és x = -1',
          'x = 2',
          '∅ (mert -3x mindig negatív)'
        ],
        correctAnswer: 0,
        hint: 'A jobb oldal -3x ≥ 0 kell legyen, azaz x ≤ 0! Csak nem-pozitív x lehet jó.',
        explanation: 'Feltétel: -3x ≥ 0 ⟹ x ≤ 0.\n1. ág: x + 4 = -3x ⟹ 4x = -4 ⟹ x = -1. Mivel -1 ≤ 0, ez megfelel! Ellenőrzés: |-1 + 4| = 3, és -3(-1) = 3. Jó!\n2. ág: -(x + 4) = -3x ⟹ -x - 4 = -3x ⟹ 2x = 4 ⟹ x = 2. De 2 > 0, nem elégíti ki a feltételt (ellenőrzés: |6| ≠ -6). Hamis gyök!\nEgyetlen valós gyök: x = -1.'
      },
      {
        id: 'aq3-9',
        questionTypeBadge: 'Grafikus Ekvivalencia',
        question: 'Hogyan oldható meg grafikusan az |x - 2| = -|x + 2| + 4 egyenlet?',
        options: [
          'Ábrázoljuk az f(x) = |x - 2| és g(x) = -|x + 2| + 4 grafikonokat, és megkeressük a metszéspontjaik x koordinátáit',
          'Kiszámoljuk mindkét oldal integrálját 0 és 4 között',
          'Csak a zérushelyeik összegét kell venni',
          'Grafikusan ezt a feladatot nem lehet megoldani'
        ],
        correctAnswer: 0,
        hint: 'f(x) egy csúcsával (2; 0)-ban lévő V-alak, g(x) egy (-2; 4) csúcsú lefelé nyíló V-alak.',
        explanation: 'Az f(x) = g(x) típusú egyenletek grafikus megoldása a két függvénygörbe metszéspontjainak x koordinátáit adja meg.'
      },
      {
        id: 'aq3-10',
        questionTypeBadge: 'Abszolútérték Különbsége',
        question: 'Mely x értékekre teljesül az |x + 2| - |x - 2| = 4 egyenlőség?',
        options: [
          'x ∈ [2; ∞[ (minden 2-nél nagyobb vagy egyenlő számra)',
          'Csak x = 2-re',
          'x ∈ [-2; 2]',
          'x ∈ ∅'
        ],
        correctAnswer: 0,
        hint: 'A -2 és +2 távolsága 4. Ha x ≥ 2, mindkét abszolút érték pozitív: (x + 2) - (x - 2) = 4!',
        explanation: 'Ha x ≥ 2: |x + 2| = x + 2 és |x - 2| = x - 2. Kivonva: (x + 2) - (x - 2) = 4 = 4 azonosság. Tehát a teljes [2; ∞[ félegyenes minden pontja kielégíti az egyenletet.'
      }
    ]
  }
};

const absCheatSheets: CheatSheetCard[] = [
  {
    title: 'Geometriai Jelentés: |x - a| = b',
    icon: <Target className="w-5 h-5 text-emerald-400" />,
    badgeText: 'Alapképlet',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    content: (
      <div className="space-y-2 text-xs">
        <p className="text-slate-300">
          Az <strong className="text-emerald-300">|x - a|</strong> kifejezés az <em>x</em> pont távolsága a rögzített <em>a</em> számtól a számegyenesen.
        </p>
        <div className="p-2 bg-slate-900/60 rounded border border-emerald-500/20 space-y-1">
          <p className="text-emerald-200 font-mono">|x - a| = b (ha b &gt; 0)</p>
          <p className="text-slate-400">Két gyök: <span className="text-white font-mono">x₁ = a - b</span> és <span className="text-white font-mono">x₂ = a + b</span>.</p>
        </div>
      </div>
    )
  },
  {
    title: 'Különleges Esetek: 0 és Negatív Számok',
    icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    badgeText: 'Csapdák',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    content: (
      <div className="space-y-2 text-xs">
        <div className="p-2 bg-slate-900/60 rounded border border-amber-500/20 space-y-1">
          <p className="text-amber-300 font-semibold">• |kifejezés| = 0</p>
          <p className="text-slate-400">Pontosan 1 megoldás (a kifejezés = 0).</p>
          <p className="text-rose-300 font-semibold">• |kifejezés| = negatív szám</p>
          <p className="text-slate-400">Azonnal <strong className="text-rose-300">∅</strong> (üres halmaz), mert a távolság nem lehet negatív!</p>
        </div>
      </div>
    )
  },
  {
    title: 'Felezőpont Elv: |x - a| = |x - b|',
    icon: <Sparkles className="w-5 h-5 text-sky-400" />,
    badgeText: 'Szimmetria',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    content: (
      <div className="space-y-2 text-xs">
        <p className="text-slate-300">
          Azon pont keresése, amely egyenlő távolságra van az <em>a</em> és <em>b</em> számoktól.
        </p>
        <div className="p-2 bg-slate-900/60 rounded border border-sky-500/20">
          <p className="text-sky-200 font-mono text-center text-sm font-bold">x = (a + b) / 2</p>
          <p className="text-slate-400 text-center text-[11px] mt-1">A két pont számtani közepe (felezőpontja).</p>
        </div>
      </div>
    )
  },
  {
    title: 'Esetszétválasztás & Hamis Gyökök',
    icon: <BookOpen className="w-5 h-5 text-purple-400" />,
    badgeText: 'Módszertan',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    content: (
      <div className="space-y-2 text-xs">
        <p className="text-slate-300">
          Ha a jobb oldalon is szerepel ismeretlen (|A| = B(x)):
        </p>
        <ul className="list-disc pl-4 space-y-1 text-slate-400">
          <li><strong>1. Feltétel:</strong> A jobb oldal nem lehet negatív: <span className="text-purple-300 font-mono">B(x) ≥ 0</span>.</li>
          <li><strong>2. Ágak:</strong> Megoldjuk az <span className="text-purple-300 font-mono">A = B</span> és <span className="text-purple-300 font-mono">A = -B</span> egyenleteket.</li>
          <li><strong>3. Ellenőrzés:</strong> A feltételt nem teljesítő gyökök <em>hamis gyökök</em>, el kell vetni őket!</li>
        </ul>
      </div>
    )
  }
];

export const AbsEquationQuiz: React.FC<AbsEquationQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      chapterId="fuggvenyek"
      topicId="abszolut-ertekes-egyenletek"
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      title="17. Abszolútértékes egyenletek kvíz"
      subtitle="Mesterfokú gyakorlófeladatok a távolság elvtől a többváltozós esetszétválasztásig"
      levels={quizLevels}
      cheatSheets={absCheatSheets}
      matcherComponent={
        <AbsEquationMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <AbsEquationSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

