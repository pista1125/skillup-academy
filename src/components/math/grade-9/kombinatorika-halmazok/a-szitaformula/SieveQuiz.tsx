import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  TwoSetsSieveSvg,
  DivisibilitySieveSvg,
  ThreeSetsSieveSvg,
  SurveyVennSvg,
  DisjointSieveSvg
} from './SieveFigures';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';
import { SieveMatcher } from './SieveMatcher';
import { SieveSorter } from './SieveSorter';

interface SieveQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Két Halmaz Szitaformulája és Alapszámítások (Könnyű)',
    subtitle: '|A ∪ B| = |A| + |B| − |A ∩ B| képlet, duplán számolás elve és egyszerű szöveges feladatok.',
    range: '1 - 10. feladat',
    focus: 'Képletalkalmazás és Alapismeretek',
    questions: [
      {
        id: 'siq1-1',
        questionTypeBadge: 'Szitaformula Képlet',
        question: 'Melyik a két halmaz uniójának helyes szitaformulája?',
        figure: <TwoSetsSieveSvg size={160} />,
        options: [
          '|A ∪ B| = |A| + |B| − |A ∩ B|',
          '|A ∪ B| = |A| + |B| + |A ∩ B|',
          '|A ∪ B| = |A| · |B|',
          '|A ∪ B| = |A| + |B|'
        ],
        correctAnswer: 0,
        hint: 'A duplán számolt közös metszetet egyszer le kell vonni az összegből!',
        explanation: 'A logikai szitaformula két halmazra: |A ∪ B| = |A| + |B| − |A ∩ B|.'
      },
      {
        id: 'siq1-2',
        questionTypeBadge: 'Miért Vonjuk Le?',
        question: 'Miért kell levonni a metszet elemszámát (|A ∩ B|) az |A| + |B| összegből?',
        figure: <TwoSetsSieveSvg size={160} />,
        options: [
          'Mert a közös elemeket mindkét halmazban megszámoltuk, így kétszer szerepelnének',
          'Mert a metszet elemei nem tartoznak az unióba',
          'Mert a kivonás műveletével kapjuk meg a komplementert',
          'Ez csak egy közelítő becslés'
        ],
        correctAnswer: 0,
        hint: 'A közös elemek A-ban is és B-ben is benne vannak, így az egyszerű összeadásban duplán lennének jelen.',
        explanation: 'Mivel a közös elemeket |A| és |B| is tartalmazza, a sima összeadásban kétszer szerepelnének. Hogy pontosan egyszer számoljuk őket, egyszer le kell vonni: −|A ∩ B|.'
      },
      {
        id: 'siq1-3',
        questionTypeBadge: 'Egyszerű Számítás',
        question: 'Ha |A| = 15, |B| = 10 és |A ∩ B| = 3, mennyi az unió elemszáma (|A ∪ B|)?',
        options: ['22 elem', '25 elem', '28 elem', '18 elem'],
        correctAnswer: 0,
        hint: '|A ∪ B| = 15 + 10 − 3.',
        explanation: '|A ∪ B| = 15 + 10 − 3 = 22 elem.'
      },
      {
        id: 'siq1-4',
        questionTypeBadge: 'Metszet Kiszámítása',
        question: 'Ha |A| = 20, |B| = 18 és az unió |A ∪ B| = 30, hány elem van a metszetben (|A ∩ B|)?',
        options: ['8 elem', '10 elem', '38 elem', '12 elem'],
        correctAnswer: 0,
        hint: '|A ∩ B| = |A| + |B| − |A ∪ B| = 20 + 18 − 30.',
        explanation: '|A ∩ B| = 20 + 18 − 30 = 8 elem.'
      },
      {
        id: 'siq1-5',
        questionTypeBadge: 'Diszjunkt Halmazok',
        question: 'Ha A és B diszjunkt halmazok (A ∩ B = ∅), |A| = 7 és |B| = 5, mennyi |A ∪ B|?',
        figure: <DisjointSieveSvg size={160} />,
        options: ['12 elem', '7 elem', '35 elem', '0 elem'],
        correctAnswer: 0,
        hint: 'Diszjunkt halmazoknál a metszet elemszáma 0, így semmit sem kell levonni.',
        explanation: 'Mivel |A ∩ B| = 0, ezért |A ∪ B| = 7 + 5 − 0 = 12 elem.'
      },
      {
        id: 'siq1-6',
        questionTypeBadge: 'Szöveges Feladat (Diákok)',
        question: 'Egy 25 fős osztályban 15-en sportolnak, 12-en zenélnek, és 5-en mindkettőt űzik. Hányan csinálnak LEGALÁBB EGYET a kettő közül?',
        figure: <SurveyVennSvg size={160} total={25} onlyA={10} both={5} onlyB={7} neither={3} labelA="Sport (15)" labelB="Zene (12)" />,
        options: ['22 diák', '27 diák', '20 diák', '17 diák'],
        correctAnswer: 0,
        hint: 'A „legalább az egyik” az uniót jelenti: 15 + 12 − 5.',
        explanation: '|S ∪ Z| = 15 + 12 − 5 = 22 diák csinál legalább egy tevékenységet.'
      },
      {
        id: 'siq1-7',
        questionTypeBadge: 'Semelyiket Sem Űzők',
        question: 'Az előző feladat adatai alapján (25 fős osztály, 22-en csinálnak legalább egyet), hány diák NEM sportol ÉS NEM zenél?',
        figure: <SurveyVennSvg size={160} total={25} onlyA={10} both={5} onlyB={7} neither={3} labelA="Sport (15)" labelB="Zene (12)" />,
        options: ['3 diák', '5 diák', '2 diák', '0 diák'],
        correctAnswer: 0,
        hint: 'Az összes diák létszámából vond le a legalább egyet űzők számát: 25 − 22.',
        explanation: '25 − 22 = 3 diák nem sportol és nem zenél.'
      },
      {
        id: 'siq1-8',
        questionTypeBadge: 'Csak Az Egyik Tevékenység',
        question: 'A 15 sportoló és 5 mindkettőt űző diák közül hányan vannak, akik CSAK sportolnak (de nem zenélnek)?',
        options: ['10 diák', '15 diák', '5 diák', '7 diák'],
        correctAnswer: 0,
        hint: 'A sportolók számából vond le a mindkettőt csinálókat: 15 − 5.',
        explanation: 'Csak sportolók = |S \\ Z| = 15 − 5 = 10 diák.'
      },
      {
        id: 'siq1-9',
        questionTypeBadge: 'Pontosan Egyet Űzők',
        question: 'Hány olyan diák van az osztályban, aki PONTOSAN EGY tevékenységet űz (vagy csak sportol, vagy csak zenél)?',
        options: ['17 diák (10 + 7)', '22 diák', '12 diák', '5 diák'],
        correctAnswer: 0,
        hint: 'Csak sportolók (10) + Csak zenélők (12 − 5 = 7).',
        explanation: 'Csak sportol: 10 fő. Csak zenél: 12 − 5 = 7 fő. Pontosan egyet csinál: 10 + 7 = 17 diák.'
      },
      {
        id: 'siq1-10',
        questionTypeBadge: 'Unió Felső Korlátja',
        question: 'Lehet-e két véges halmaz uniójának elemszáma (|A ∪ B|) nagyobb, mint |A| + |B|?',
        options: [
          'Soha nem lehet nagyobb (mindig |A ∪ B| ≤ |A| + |B|)',
          'Igen, ha a halmazok metszete nagy',
          'Igen, ha végtelen halmazokról van szó',
          'Csak negatív számok esetén'
        ],
        correctAnswer: 0,
        hint: 'Mivel a metszet elemszáma nem lehet negatív, a levonás miatt az unió legfeljebb az összegükkel lehet egyenlő.',
        explanation: 'Mivel |A ∩ B| ≥ 0, ezért |A ∪ B| = |A| + |B| − |A ∩ B| ≤ |A| + |B|. Az unió legfeljebb akkor éri el az összeget, ha a halmazok diszjunktak.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Oszthatósági Szita és 2-3 Halmazos Összefüggések (Közepes)',
    subtitle: 'Számelméleti alkalmazások, Poincaré-elv 3 halmazra és legkisebb közös többszörös.',
    range: '11 - 20. feladat',
    focus: 'Kombinatorikus Számelmélet és 3 Halmaz',
    questions: [
      {
        id: 'siq2-1',
        questionTypeBadge: 'Oszthatóság: 2 vagy 3',
        question: 'Hány olyan pozitív egész szám van 1 és 100 között, amely osztható 2-vel vagy 3-mal?',
        figure: <DivisibilitySieveSvg size={170} />,
        options: ['67 szám', '83 szám', '50 szám', '64 szám'],
        correctAnswer: 0,
        hint: '2-vel oszt.: 50, 3-mal oszt.: 33, mindkettővel (6-tal) oszt.: 16. Képlet: 50 + 33 − 16.',
        explanation: '[100/2] = 50, [100/3] = 33, [100/6] = 16. A szitaformulával: 50 + 33 − 16 = 67 szám.'
      },
      {
        id: 'siq2-2',
        questionTypeBadge: 'Sem 2-vel, Sem 3-mal',
        question: 'Hány olyan egész szám van 1 és 100 között, amely SEM 2-vel, SEM 3-mal NEM osztható?',
        figure: <DivisibilitySieveSvg size={170} />,
        options: ['33 szám', '17 szám', '50 szám', '16 szám'],
        correctAnswer: 0,
        hint: 'A 100-ból vond le azokat, amelyek legalább az egyikkel oszthatók (67)!',
        explanation: 'Az összes 100 számból levonva a 2-vel vagy 3-mal oszthatókat: 100 − 67 = 33 darab szám.'
      },
      {
        id: 'siq2-3',
        questionTypeBadge: 'Oszthatóság: 3 vagy 5',
        question: 'Hány olyan egész szám van 1 és 100 között, amely osztható 3-mal vagy 5-tel?',
        options: ['47 szám', '53 szám', '40 szám', '50 szám'],
        correctAnswer: 0,
        hint: '3-mal oszt: 33, 5-tel oszt: 20, 15-tel oszt: 6. Képlet: 33 + 20 − 6.',
        explanation: '[100/3] = 33, [100/5] = 20, [100/15] = 6. Szitaformula: 33 + 20 − 6 = 47 szám.'
      },
      {
        id: 'siq2-4',
        questionTypeBadge: 'Nem Relatív Prím Osztók',
        question: 'Hány olyan szám van 1 és 100 között, amely osztható 4-gyel vagy 6-tal?',
        options: ['33 szám (lkkt = 12)', '37 szám', '41 szám', '25 szám'],
        correctAnswer: 0,
        hint: 'Figyelem! 4 és 6 legkisebb közös többszöröse 12, nem 24! [100/4]=25, [100/6]=16, [100/12]=8.',
        explanation: '4 és 6 metszete a 12 többszörösei: [100/4]=25, [100/6]=16, [100/12]=8. Eredmény: 25 + 16 − 8 = 33 szám.'
      },
      {
        id: 'siq2-5',
        questionTypeBadge: '3 Halmazos Szita Képlete',
        question: 'Melyik taggal zárul a 3 halmaz uniójának szitaformulája (|A ∪ B ∪ C|)?',
        figure: <ThreeSetsSieveSvg size={160} />,
        options: [
          '+ |A ∩ B ∩ C| (hozzáadjuk a hármas metszetet)',
          '− |A ∩ B ∩ C| (levonjuk a hármas metszetet)',
          '+ |A| · |B| · |C|',
          'Nincs szükség harmadik tagra'
        ],
        correctAnswer: 0,
        hint: 'A páros metszetek levonásakor a középső hármas metszetet teljesen levontuk (3-szor), így egyszer vissza kell pótolni!',
        explanation: 'A 3 halmazos szitaformula: |A ∪ B ∪ C| = |A| + |B| + |C| − (|A∩B| + |A∩C| + |B∩C|) + |A ∩ B ∩ C|.'
      },
      {
        id: 'siq2-6',
        questionTypeBadge: '3 Halmaz Számítás',
        question: 'Ha |A| = 10, |B| = 10, |C| = 10, minden páros metszet 3 elemű, és a hármas metszet |A ∩ B ∩ C| = 1, mennyi |A ∪ B ∪ C|?',
        figure: <ThreeSetsSieveSvg size={160} />,
        options: ['22 elem', '21 elem', '30 elem', '20 elem'],
        correctAnswer: 0,
        hint: '10 + 10 + 10 − (3 + 3 + 3) + 1.',
        explanation: '|A ∪ B ∪ C| = 30 − 9 + 1 = 22 elem.'
      },
      {
        id: 'siq2-7',
        questionTypeBadge: 'Részhalmaz Eset',
        question: 'Ha A ⊆ B, akkor a szitaformula szerint mennyi |A ∪ B|?',
        options: ['Maga |B| (mivel |A ∩ B| = |A|)', '|A| + |B|', '|A|', '0'],
        correctAnswer: 0,
        hint: 'Ha A részhalmaza B-nek, akkor a metszetük A, így |A| + |B| − |A| = |B|.',
        explanation: 'Mivel A ⊆ B, ezért A ∩ B = A, tehát |A ∪ B| = |A| + |B| − |A| = |B|.'
      },
      {
        id: 'siq2-8',
        questionTypeBadge: 'Kávé és Tea Felmérés',
        question: 'Egy 40 fős munkahelyen 22-en kávéznak, 18-an teáznak, és 8-an mindkettőt fogyasztják. Hányan kávéznak CSAK (teát nem isznak)?',
        options: ['14 fő', '22 fő', '8 fő', '10 fő'],
        correctAnswer: 0,
        hint: 'A kávézók teljes számából vond le a mindkettőt ivókat: 22 − 8.',
        explanation: 'Csak kávézók = 22 − 8 = 14 fő.'
      },
      {
        id: 'siq2-9',
        questionTypeBadge: 'Kávé és Tea Unió',
        question: 'Az előző feladat adatai alapján (22 kávé, 18 tea, 8 mindkettő), hányan fogyasztanak LEGALÁBB egyet a két ital közül?',
        options: ['32 fő', '40 fő', '30 fő', '24 fő'],
        correctAnswer: 0,
        hint: '22 + 18 − 8.',
        explanation: 'Unió = 22 + 18 − 8 = 32 fő.'
      },
      {
        id: 'siq2-10',
        questionTypeBadge: 'Sem Kávé, Sem Tea',
        question: 'Hányan vannak a 40 fős irodában, akik SEM kávét, SEM teát nem isznak?',
        options: ['8 fő', '10 fő', '6 fő', '12 fő'],
        correctAnswer: 0,
        hint: 'Összlétszám (40) mínusz az unió (32).',
        explanation: '40 − 32 = 8 fő nem iszik sem kávét, sem teát.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: 3 Halmazos Venn és Érettségi Szintű Szöveges Feladványok (Nehéz)',
    subtitle: 'Három halmazos szöveges modellezés, zónaszámítások és kombinatorikai határok.',
    range: '21 - 30. feladat',
    focus: 'Összetett Rendszermodellezés és Vizsgafeladványok',
    questions: [
      {
        id: 'siq3-1',
        questionTypeBadge: '3 Halmazos Szakkörök',
        question: 'Egy 30 fős osztályban 15-en matek, 12-en fizika, 10-en infó szakkörre járnak. Matek és fizika: 5 fő, matek és infó: 4 fő, fizika és infó: 3 fő. Mindháromra 2 fő jár. Hányan járnak LEGALÁBB EGY szakkörre?',
        figure: <ThreeSetsSieveSvg size={160} />,
        options: ['27 diák', '30 diák', '25 diák', '29 diák'],
        correctAnswer: 0,
        hint: 'Alkalmazd a 3 halmazos szitaformulát: 15 + 12 + 10 − 5 − 4 − 3 + 2.',
        explanation: '|M ∪ F ∪ I| = (15 + 12 + 10) − (5 + 4 + 3) + 2 = 37 − 12 + 2 = 27 diák.'
      },
      {
        id: 'siq3-2',
        questionTypeBadge: 'Semelyik Szakkörre Nem Jár',
        question: 'Az előző feladatban (30 diák, 27-en járnak legalább egyre), hány diák NEM jár egyetlen szakkörre sem?',
        options: ['3 diák', '5 diák', '0 diák', '2 diák'],
        correctAnswer: 0,
        hint: '30 − 27.',
        explanation: '30 − 27 = 3 diák nem jár semelyik szakkörre.'
      },
      {
        id: 'siq3-3',
        questionTypeBadge: 'Csak Matek Szakkör',
        question: 'Hány olyan diák van, aki KIZÁRÓLAG matek szakkörre jár (se fizikára, se infóra)?',
        options: ['8 diák', '15 diák', '6 diák', '10 diák'],
        correctAnswer: 0,
        hint: 'A 15 matekosból vond le a páros metszetek belső részeit! Matek-Fizika csak: 5 − 2 = 3, Matek-Infó csak: 4 − 2 = 2, Hármas: 2. Összes levonandó: 3 + 2 + 2 = 7.',
        explanation: 'Csak matek = 15 − (3 + 2 + 2) = 15 − 7 = 8 diák.'
      },
      {
        id: 'siq3-4',
        questionTypeBadge: 'Pontosan Két Szakkör',
        question: 'Hány olyan diák van a 30 fős osztályban, aki PONTOSAN KÉT szakkörre jár?',
        options: ['6 diák', '12 diák', '8 diák', '5 diák'],
        correctAnswer: 0,
        hint: 'A páros metszetekből le kell vonni a hármas metszetet mindháromnál: (5 − 2) + (4 − 2) + (3 − 2).',
        explanation: 'Csak M-F: 5 − 2 = 3. Csak M-I: 4 − 2 = 2. Csak F-I: 3 − 2 = 1. Összesen pontosan kettőre: 3 + 2 + 1 = 6 diák.'
      },
      {
        id: 'siq3-5',
        questionTypeBadge: 'Pontosan Egy Szakkör',
        question: 'Hány olyan diák van, aki PONTOSAN EGY szakkörre jár a háromból?',
        options: ['19 diák', '27 diák', '15 diák', '21 diák'],
        correctAnswer: 0,
        hint: 'Az unióból (27) vond le a pontosan kettőre járókat (6) és a mindháromra járókat (2): 27 − 6 − 2.',
        explanation: 'Pontosan egyre járók = 27 − 6 − 2 = 19 diák.'
      },
      {
        id: 'siq3-6',
        questionTypeBadge: 'Oszthatóság: 2, 3 vagy 5',
        question: 'Hány szám van 1 és 120 között, amely osztható 2-vel, 3-mal vagy 5-tel?',
        options: ['88 szám', '96 szám', '84 szám', '100 szám'],
        correctAnswer: 0,
        hint: '3 halmazos szita 120-ig: [120/2]=60, [120/3]=40, [120/5]=24. Párok: 60/6=20, 120/10=12, 120/15=8. Hármas: 120/30=4. Képlet: 60+40+24 - 20-12-8 + 4.',
        explanation: '60 + 40 + 24 − (20 + 12 + 8) + 4 = 124 − 40 + 4 = 88 szám.'
      },
      {
        id: 'siq3-7',
        questionTypeBadge: 'Unió Lehetséges Határai',
        question: 'Ha |A| = 20 és |B| = 15, mi a lehetséges LEGKISEBB és LEGNAGYOBB értéke az |A ∪ B| uniónak?',
        options: [
          'Minimum: 20 (ha B ⊆ A), Maximum: 35 (ha diszjunktak)',
          'Minimum: 15, Maximum: 35',
          'Minimum: 5, Maximum: 35',
          'Mindig pontosan 35'
        ],
        correctAnswer: 0,
        hint: 'A legkisebb unió akkor jön létre, ha a kisebb halmaz teljesen benne van a nagyobbikban. A legnagyobb unió, ha egyáltalán nincs közös elemük.',
        explanation: 'Az unió minimális, ha B ⊆ A (ekkor |A ∪ B| = 20). Maximális, ha A ∩ B = ∅ (ekkor |A ∪ B| = 20 + 15 = 35).'
      },
      {
        id: 'siq3-8',
        questionTypeBadge: 'Metszet Kényszerített Minimuma',
        question: 'Egy 30 fős osztályban 20-an beszélnek angolul és 18-an németül. Legalább hány diáknak KELL feltétlenül mindkét nyelvet beszélnie?',
        options: ['Legalább 8 diáknak (20 + 18 − 30)', 'Legalább 2 diáknak', 'Lehet 0 diák is', 'Legalább 10 diáknak'],
        correctAnswer: 0,
        hint: 'Mivel az osztály létszáma legfeljebb 30, |A ∪ B| ≤ 30. Így |A ∩ B| = |A| + |B| − |A ∪ B| ≥ 20 + 18 − 30 = 8.',
        explanation: 'Ha senki sem beszélne semmit a két nyelven kívül, az unió akkor is legfeljebb 30 lehet: |A ∩ B| ≥ 20 + 18 − 30 = 8 diák kötelező átfedés!'
      },
      {
        id: 'siq3-9',
        questionTypeBadge: 'Általános Poincaré Előjelek',
        question: 'A szitaformula általánosításában 4 halmaz esetén milyen előjellel szerepel a négyes metszet (|A ∩ B ∩ C ∩ D|)?',
        options: ['Negatív (−) előjellel', 'Pozitív (+) előjellel', 'Szorzásként', 'Nem szerepel benne'],
        correctAnswer: 0,
        hint: 'Az előjelek a halmazok számával váltakoznak: 1 halmaz: +, 2 halmaz: −, 3 halmaz: +, 4 halmaz: −.',
        explanation: 'A szitaformulában az előjelek szigorúan váltakoznak: Σ₁ − Σ₂ + Σ₃ − Σ₄, tehát a 4-es metszet negatív előjellel szerepel.'
      },
      {
        id: 'siq3-10',
        questionTypeBadge: 'De Morgan Számszerű Formája',
        question: 'Hogyan fejezhető ki a két halmazon kívüli elemek száma (|U \\ (A ∪ B)|) az alaphalmaz és a halmazok méreteivel?',
        options: [
          '|U| − |A| − |B| + |A ∩ B|',
          '|U| − |A| − |B| − |A ∩ B|',
          '|U| − |A ∩ B|',
          '|U| / (|A| + |B|)'
        ],
        correctAnswer: 0,
        hint: '|U| − |A ∪ B| = |U| − (|A| + |B| − |A ∩ B|) = |U| − |A| − |B| + |A ∩ B|.',
        explanation: 'A zárójel felbontásakor a mínusz jel megváltoztatja a belső metszet előjelét: |U| − |A| − |B| + |A ∩ B|.'
      }
    ]
  }
};

const sieveCheatSheets: CheatSheetCard[] = [
  {
    title: 'Két Halmaz Szitaformulája',
    items: [
      { label: 'Unió képlete', value: '|A ∪ B| = |A| + |B| - |A ∩ B|' },
      { label: 'Metszet képlete', value: '|A ∩ B| = |A| + |B| - |A ∪ B|' },
      { label: 'Diszjunkt unió', value: 'Ha A ∩ B = ∅ ➔ |A ∪ B| = |A| + |B|' },
      { label: 'Csak A elemei', value: '|A \\ B| = |A| - |A ∩ B|' },
      { label: 'Pontosan egy halmazban', value: '|A \\ B| + |B \\ A| = |A ∪ B| - |A ∩ B|' }
    ]
  },
  {
    title: 'Három Halmaz Szitaformulája',
    items: [
      { label: 'Poincaré-formula', value: '|A| + |B| + |C| - páros metszetek + |A ∩ B ∩ C|' },
      { label: 'Páros metszetek', value: '- |A ∩ B| - |A ∩ C| - |B ∩ C|' },
      { label: 'Hármas metszet', value: '+ |A ∩ B ∩ C| (visszapótlás)' },
      { label: 'Bentről kifelé szabály', value: 'Először a hármas metszetet írd be a Venn-be!' },
      { label: 'Pontosan 2 szakkör', value: 'A páros metszetek mínusz a hármas metszetek' }
    ]
  },
  {
    title: 'Oszthatóság és Számelmélet',
    items: [
      { label: 'd-vel osztható N-ig', value: '[N / d] (egészrész)' },
      { label: 'Közös többszörösök', value: 'Mindig az lkkt-vel kell osztani: [N / lkkt(a, b)]' },
      { label: 'Relatív prímeknél', value: 'lkkt(2, 3) = 6,  lkkt(3, 5) = 15' },
      { label: 'Nem relatív prímeknél', value: 'lkkt(4, 6) = 12 (nem 24!)' },
      { label: 'Egyikkel sem osztható', value: 'N - |A ∪ B| (univerzumból kivonva)' }
    ]
  }
];

export const SieveQuiz: React.FC<SieveQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      levelConfigs={quizLevels}
      cheatSheetCards={sieveCheatSheets}
      defaultLevel={1}
      topicId="g9-komb-szitaformula-quiz"
      topicTitle="9. Osztály - A Szitaformula és Alkalmazásai"
      themeColor="amber"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a szitaformula képleteit a megfelelő szöveges feladatokkal!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <SieveMatcher
              key={`sieve-matcher-${level}`}
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
          subtitle: 'Kategorizáld a feladványokat halmazszám és megoldási modell szerint!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <SieveSorter
              key={`sieve-sorter-${level}`}
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

export default SieveQuiz;
