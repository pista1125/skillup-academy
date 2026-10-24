import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { KnowledgeTestMatcher } from './KnowledgeTestMatcher';
import { KnowledgeTestSorter } from './KnowledgeTestSorter';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';
import {
  ChapterSummaryMindmapSvg,
  ExamVennSieveSvg,
  CompleteGraphKHandshakesSvg,
  IntervalSetIntersectionRulerSvg,
  CountingPermutationTreeSvg,
  DeMorganVennSvg,
  RussellParadoxScaleSvg
} from './KnowledgeTestFigures';
import {
  RoundTableSvg,
  PigeonholeSvg,
  PodiumSvg,
  DigitSlotsSvg,
  BlockSeatingSvg,
  PolygonDiagonalsSvg
} from '../gyakorlas-kombinatorika/CombinatoricsPracticeFigures';
import {
  ThreeSetsVennRegionsSvg,
  SymmetricDifferenceSvg,
  NumberSetsHierarchySvg,
  SubsetInclusionVennSvg,
  DisjointSetsVennSvg,
  ComplexIntervalZIntersectionSvg,
  PowerSetTreeSvg
} from '../gyakorlas-halmazok/SetsPracticeFigures';

interface KnowledgeTestQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapozó Témazáró Feladatok (Könnyű)',
    subtitle: 'Kombinatorika, gráfok, halmazműveletek, számhalmazok és intervallumok alaptípusai.',
    range: '1 - 30. feladat',
    focus: 'Fejezeti Alapismeretek és Gyors Számítások (30 Feladat)',
    questions: [
      {
        id: 'ktq1-1',
        questionTypeBadge: 'Sorbarendezés',
        question: 'Hányféleképpen ülhet le 5 diák egymás mellé egy 5 fős padba egy moziban?',
        figure: <CountingPermutationTreeSvg size={185} />,
        options: ['120 féleképpen', '25 féleképpen', '24 féleképpen', '60 féleképpen'],
        correctAnswer: 0,
        hint: '5 különböző elem összes lehetséges sorbarendezése: 5! = 5 · 4 · 3 · 2 · 1.',
        explanation: 'Az 5 diák sorbarendezéseinek száma 5! = 5 · 4 · 3 · 2 · 1 = 120.'
      },
      {
        id: 'ktq1-2',
        questionTypeBadge: 'Gráf Kézfogások',
        question: 'Egy 6 fős társaságban mindenki mindenkivel pontosan egyszer kezet fog. Hány kézfogás történik összesen?',
        figure: <CompleteGraphKHandshakesSvg size={185} />,
        options: ['15 kézfogás', '30 kézfogás', '36 kézfogás', '12 kézfogás'],
        correctAnswer: 0,
        hint: 'A kézfogások száma az n=6 csúcsú teljes gráf éleinek száma: (n · (n - 1)) / 2.',
        explanation: '(6 · 5) / 2 = 30 / 2 = 15 kézfogás történik.'
      },
      {
        id: 'ktq1-3',
        questionTypeBadge: 'Részhalmazok Száma',
        question: 'Hány részhalmaza van egy 5 elemű halmaznak összesen?',
        figure: <PowerSetTreeSvg size={185} />,
        options: ['32 részhalmaz', '25 részhalmaz', '16 részhalmaz', '31 részhalmaz'],
        correctAnswer: 0,
        hint: 'Egy n elemű halmaz összes részhalmazának száma 2ⁿ.',
        explanation: '2⁵ = 32 részhalmaza van (beleértve az üres halmazt és önmagát is).'
      },
      {
        id: 'ktq1-4',
        questionTypeBadge: 'Intervallum és Egészek',
        question: 'Mely egész számok tartoznak a ]-3; 2] intervallumba?',
        figure: <IntervalSetIntersectionRulerSvg size={185} />,
        options: ['{-2, -1, 0, 1, 2}', '{-3, -2, -1, 0, 1, 2}', '{-2, -1, 0, 1}', '{-3, -2, -1, 0, 1}'],
        correctAnswer: 0,
        hint: 'A -3-nál nyílt (nem eleme!), a 2-nél zárt (eleme!).',
        explanation: 'Mivel a -3 nyílt, az első egész szám a -2. A 2 zárt, így benne van: {-2, -1, 0, 1, 2}.'
      },
      {
        id: 'ktq1-5',
        questionTypeBadge: 'Halmazkülönbség',
        question: 'Legyen A = {2, 3, 5, 7, 11} és B = {3, 7, 13}. Mi lesz az A \\ B halmaz?',
        options: ['{2, 5, 11}', '{13}', '{3, 7}', '{2, 5, 11, 13}'],
        correctAnswer: 0,
        hint: 'Az A \\ B azokból az A-beli elemekből áll, amelyek nincsenek benne B-ben.',
        explanation: 'Az A halmazból elvesszük a 3-at és a 7-et, így {2, 5, 11} marad.'
      },
      {
        id: 'ktq1-6',
        questionTypeBadge: 'Számhalmazok',
        question: 'Melyik állítás IGAZ az alábbiak közül?',
        figure: <ChapterSummaryMindmapSvg size={185} />,
        options: [
          'ℕ ⊆ ℤ ⊆ ℚ ⊆ ℝ',
          'ℤ ⊆ ℕ ⊆ ℚ ⊆ ℝ',
          'ℚ ⊆ ℤ ⊆ ℝ',
          'ℝ ⊆ ℚ ⊆ ℤ'
        ],
        correctAnswer: 0,
        hint: 'A természetes számok részei az egészeknek, azok a racionálisoknak, azok pedig a valósaknak.',
        explanation: 'A helyes hierarchia: ℕ ⊆ ℤ ⊆ ℚ ⊆ ℝ.'
      },
      {
        id: 'ktq1-7',
        questionTypeBadge: 'Két Halmaz Szitaformulája',
        question: 'Ha |A| = 14, |B| = 12 és |A ∩ B| = 5, akkor mennyi |A ∪ B|?',
        options: ['21', '26', '31', '19'],
        correctAnswer: 0,
        hint: '|A ∪ B| = |A| + |B| - |A ∩ B|.',
        explanation: '|A ∪ B| = 14 + 12 - 5 = 21.'
      },
      {
        id: 'ktq1-8',
        questionTypeBadge: 'Körasztal Ülésrend',
        question: 'Hányféleképpen ülhet le 4 ember egy kerek asztal köré, ha csak az egymáshoz képesti sorrend számít?',
        figure: <RoundTableSvg seatsCount={4} size={150} />,
        options: ['6 féleképpen', '24 féleképpen', '12 féleképpen', '4 féleképpen'],
        correctAnswer: 0,
        hint: 'Körasztal esetén ciklikus permutációt használunk: (n - 1)!.',
        explanation: '(4 - 1)! = 3! = 3 · 2 · 1 = 6 féle ülésrend létezik.'
      },
      {
        id: 'ktq1-9',
        questionTypeBadge: 'De Morgan Szabály',
        question: 'Mivel egyenlő az (A ∩ B) komplementere?',
        figure: <DeMorganVennSvg size={185} />,
        options: ['Ā ∪ B̄ (komplementerek uniója)', 'Ā ∩ B̄', 'A ∪ B', 'A \\ B'],
        correctAnswer: 0,
        hint: 'De Morgan II. törvénye: a metszet komplementere a komplementerek uniója.',
        explanation: 'De Morgan törvénye szerint: (A ∩ B) = Ā ∪ B̄.'
      },
      {
        id: 'ktq1-10',
        questionTypeBadge: 'Skatulya-elv Alapok',
        question: 'Legkevesebb hány embert kell kiválasztani, hogy biztosan legyen köztük legalább kettő, aki a hét azonos napján született?',
        figure: <PigeonholeSvg pigeons={8} holes={7} size={150} />,
        options: ['8 embert', '7 embert', '14 embert', '9 embert'],
        correctAnswer: 0,
        hint: 'A hét 7 napból áll (7 skatulya). n + 1 tárgy kell a biztos ütközéshez.',
        explanation: '7 skatulya esetén 7 + 1 = 8 ember szükséges, hogy a Dirichlet-elv szerint legalább egy napra legalább két ember jusson.'
      },
      {
        id: 'ktq1-11',
        questionTypeBadge: 'Szorzási Szabály',
        question: 'Egy étteremben 3 féle levesből, 4 féle főételből és 2 féle desszertből lehet 3 fogásos menüt választani. Hány különböző menü állítható össze?',
        options: ['24 menü', '9 menü', '14 menü', '12 menü'],
        correctAnswer: 0,
        hint: 'Független döntések: 3 · 4 · 2.',
        explanation: 'A szorzási szabály szerint a független választások szorzata adja az összes menüt: 3 · 4 · 2 = 24.'
      },
      {
        id: 'ktq1-12',
        questionTypeBadge: 'Könyvek a Polcon',
        question: 'Hányféle sorrendben tehetünk ki 6 különböző könyvet a könyvespolcra?',
        options: ['720 féleképpen', '120 féleképpen', '36 féleképpen', '5 040 féleképpen'],
        correctAnswer: 0,
        hint: '6 különböző elem permutációja: 6! = 6 · 5 · 4 · 3 · 2 · 1.',
        explanation: '6! = 720 sorrend létezik.'
      },
      {
        id: 'ktq1-13',
        questionTypeBadge: 'PIN Kódok Száma',
        question: 'Hány különböző 4-jegyű bankkártya PIN kód készíthető a {0, 1, ..., 9} számjegyekből, ha a jegyek ismétlődhetnek?',
        figure: <DigitSlotsSvg slots={[{ label: '1. jegy', count: '10' }, { label: '2. jegy', count: '10' }, { label: '3. jegy', count: '10' }, { label: '4. jegy', count: '10' }]} size={180} />,
        options: ['10 000 kód', '9 000 kód', '5 040 kód', '1 000 kód'],
        correctAnswer: 0,
        hint: 'Minden helyiértékre 10 jegy mehet (0000-tól 9999-ig): 10⁴.',
        explanation: '10 · 10 · 10 · 10 = 10⁴ = 10 000 különböző PIN kód létezik.'
      },
      {
        id: 'ktq1-14',
        questionTypeBadge: 'Valódi Számok',
        question: 'Hány háromjegyű pozitív egész szám létezik a tízes számrendszerben (100-tól 999-ig)?',
        options: ['900 szám', '1 000 szám', '999 szám', '899 szám'],
        correctAnswer: 0,
        hint: 'A százasok helyére nem kerülhet 0 (1..9: 9 jegy), a másik kettőre 10-10.',
        explanation: '9 · 10 · 10 = 900 háromjegyű szám létezik (999 - 100 + 1 = 900).'
      },
      {
        id: 'ktq1-15',
        questionTypeBadge: 'Gráfelmélet Alapfogalmak',
        question: 'Hány éle van egy 5 csúcsú teljes gráfnak (K₅)?',
        figure: <CompleteGraphKHandshakesSvg size={170} />,
        options: ['10 él', '20 él', '5 él', '15 él'],
        correctAnswer: 0,
        hint: 'n(n - 1) / 2 = 5 · 4 / 2.',
        explanation: 'Az 5 csúcsú teljes gráf éleinek száma: (5 · 4) / 2 = 10.'
      },
      {
        id: 'ktq1-16',
        questionTypeBadge: 'Fokszámok Összege',
        question: 'Egy egyszerű gráfban 7 él van. Mennyi a csúcsok fokszámainak összege?',
        options: ['14', '7', '21', '49'],
        correctAnswer: 0,
        hint: 'A kézfogási lemma szerint: ∑ d(v) = 2 · e.',
        explanation: 'Minden él két végponthoz csatlakozik, így 2 · 7 = 14 a fokszámok összege.'
      },
      {
        id: 'ktq1-17',
        questionTypeBadge: 'Páratlan Fokú Csúcsok',
        question: 'Hány páratlan fokszámú csúcsa lehet egy egyszerű gráfnak?',
        options: ['Csak páros számú (0, 2, 4, 6...)', 'Bármennyi', 'Csak páratlan számú', 'Pontosan kettő'],
        correctAnswer: 0,
        hint: 'Mivel a fokszámok összege 2e (páros szám), a páratlan tagok száma páros kell legyen.',
        explanation: 'Páratlan számok összege csak akkor lehet páros, ha páros sok van belőlük.'
      },
      {
        id: 'ktq1-18',
        questionTypeBadge: 'Halmazelemek',
        question: 'Ha A = {1, 3, 5, 7}, melyik kijelentés HAMIS?',
        options: ['3 ∉ A', '5 ∈ A', '7 ∈ A', '2 ∉ A'],
        correctAnswer: 0,
        hint: 'A 3 benne van A-ban, így a 3 ∉ A hamis.',
        explanation: 'A 3 eleme az A halmaznak (3 ∈ A), ezért a 3 ∉ A állítás hamis.'
      },
      {
        id: 'ktq1-19',
        questionTypeBadge: 'Üres Halmaz',
        question: 'Melyik állítás IGAZ az üres halmazról (∅)?',
        options: ['Minden halmaznak részhalmaza', 'Nincs egyetlen részhalmaza sem', 'Elemszáma 1', 'Minden számot tartalmaz'],
        correctAnswer: 0,
        hint: 'Az üres halmaz tetszőleges halmaz részhalmaza: ∅ ⊆ A.',
        explanation: 'A definíció szerint az üres halmaz bármely halmaznak részhalmaza (∅ ⊆ A), és 0 eleme van.'
      },
      {
        id: 'ktq1-20',
        questionTypeBadge: 'Részhalmazok 3 Elemre',
        question: 'Hány részhalmaza van az A = {x, y, z} halmaznak?',
        options: ['8 részhalmaz', '6 részhalmaz', '9 részhalmaz', '3 részhalmaz'],
        correctAnswer: 0,
        hint: '2³ = 8.',
        explanation: 'Egy 3 elemű halmaznak 2³ = 8 részhalmaza van: ∅, {x}, {y}, {z}, {x,y}, {x,z}, {y,z}, {x,y,z}.'
      },
      {
        id: 'ktq1-21',
        questionTypeBadge: 'Halmazmetszet',
        question: 'Ha A = {10, 20, 30} és B = {20, 30, 40, 50}, mi az A ∩ B halmaz?',
        options: ['{20, 30}', '{10}', '{40, 50}', '{10, 20, 30, 40, 50}'],
        correctAnswer: 0,
        hint: 'A metszet a közös elemekből áll.',
        explanation: 'Mindkét halmazban szerepel a 20 és a 30, így A ∩ B = {20, 30}.'
      },
      {
        id: 'ktq1-22',
        questionTypeBadge: 'Halmazunió',
        question: 'Ha A = {a, b} és B = {b, c, d}, mi az A ∪ B halmaz?',
        options: ['{a, b, c, d}', '{b}', '{a, c, d}', '{a, b, b, c, d}'],
        correctAnswer: 0,
        hint: 'Az unió egyesíti az elemeket, a halmazban az ismétlődés nem számít.',
        explanation: 'A ∪ B = {a, b, c, d}.'
      },
      {
        id: 'ktq1-23',
        questionTypeBadge: 'Alaphalmaz és Komplementer',
        question: 'Ha U = {1, 2, 3, 4, 5, 6} és A = {2, 4, 6}, mi az A komplementere (Ā)?',
        options: ['{1, 3, 5}', '{2, 4, 6}', '∅', '{1, 2, 3, 4, 5, 6}'],
        correctAnswer: 0,
        hint: 'U azon elemei, melyek nincsenek benne A-ban (a páratlanok).',
        explanation: 'Ā = U \\ A = {1, 3, 5}.'
      },
      {
        id: 'ktq1-24',
        questionTypeBadge: 'Diszjunkt Halmazok',
        question: 'Mikor mondjuk két halmazra, hogy diszjunktak?',
        figure: <DisjointSetsVennSvg size={170} />,
        options: ['Ha metszetük az üres halmaz (A ∩ B = ∅)', 'Ha uniójuk üres', 'Ha egyenlőek', 'Ha egymás részhalmazai'],
        correctAnswer: 0,
        hint: 'Diszjunkt = nincs közös elemük.',
        explanation: 'Két halmaz akkor diszjunkt, ha egyetlen közös elemük sincs: A ∩ B = ∅.'
      },
      {
        id: 'ktq1-25',
        questionTypeBadge: 'Természetes Számok',
        question: 'Melyik szám NEM tartozik a természetes számok (ℕ) halmazába?',
        options: ['-4', '0', '7', '12'],
        correctAnswer: 0,
        hint: 'A természetes számok a nemnegatív egészek: {0, 1, 2, 3...}.',
        explanation: 'A -4 negatív egész szám, nem természetes szám (-4 ∉ ℕ).'
      },
      {
        id: 'ktq1-26',
        questionTypeBadge: 'Egész Számok',
        question: 'Melyik szám tartozik az egész számok (ℤ) halmazába?',
        figure: <NumberSetsHierarchySvg size={180} />,
        options: ['-18', '3,14', '2/5', '√3'],
        correctAnswer: 0,
        hint: 'Az egészek: {..., -2, -1, 0, 1, 2, ...}.',
        explanation: 'A -18 egész szám (-18 ∈ ℤ), a többi tört, tizedestört vagy irracionális.'
      },
      {
        id: 'ktq1-27',
        questionTypeBadge: 'Racionális Számok',
        question: 'Hogyan definiáljuk a racionális számok (ℚ) halmazát?',
        options: [
          'Felírhatók p/q alakban, ahol p, q ∈ ℤ és q ≠ 0',
          'Csak a pozitív törtek halmaza',
          'Végtelen, nem szakaszos tizedestörtek halmaza',
          'Minden gyök alatti szám'
        ],
        correctAnswer: 0,
        hint: 'Két egész szám hányadosaként felírható számok.',
        explanation: 'ℚ = {p/q | p, q ∈ ℤ, q ≠ 0}.'
      },
      {
        id: 'ktq1-28',
        questionTypeBadge: 'Irracionális Számok',
        question: 'Melyik szám tartozik a racionális számok komplementerébe (ℚ* - irracionális számok)?',
        options: ['π', '0,75', '-5', '2/7'],
        correctAnswer: 0,
        hint: 'A π végtelen nem szakaszos tizedestört.',
        explanation: 'A π irracionális szám (π ∈ ℚ*).'
      },
      {
        id: 'ktq1-29',
        questionTypeBadge: 'Zárt Intervallum',
        question: 'Mit jelent a [2; 5] zárt intervallum a valós számegyenesen?',
        options: [
          'Azon x valós számok, amelyekre 2 ≤ x ≤ 5',
          'Csak a 2, 3, 4, 5 egész számok',
          'Azon x valós számok, amelyekre 2 < x < 5',
          'A 2 és az 5 számpár'
        ],
        correctAnswer: 0,
        hint: 'Zárt szögletes zárójel a végpontokat is tartalmazza, és minden közte lévő valós számot.',
        explanation: '[2; 5] = {x ∈ ℝ | 2 ≤ x ≤ 5}. Folytonos szakasz a 2 és 5 végpontokkal együtt.'
      },
      {
        id: 'ktq1-30',
        questionTypeBadge: 'Intervallum és Egészek',
        question: 'Hány eleme van a [-1; 3] ∩ ℤ halmaznak?',
        figure: <ComplexIntervalZIntersectionSvg size={180} />,
        options: ['5 elem (-1, 0, 1, 2, 3)', '4 elem', '3 elem', 'végtelen sok'],
        correctAnswer: 0,
        hint: 'Sorold fel az egészeket -1-től 3-ig: -1, 0, 1, 2, 3.',
        explanation: 'A [-1; 3] intervallumba 5 darab egész szám esik: {-1, 0, 1, 2, 3}.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Standard Dolgozatfeladatok és Számítások (Közepes)',
    subtitle: 'Számalkotási korlátozások, gráffokszám-tétel, szimmetrikus differencia és intervallum-műveletek.',
    range: '31 - 60. feladat',
    focus: 'Összetett Számítások és Feltételes Modellek (30 Feladat)',
    questions: [
      {
        id: 'ktq2-1',
        questionTypeBadge: 'Számalkotás',
        question: 'Hány 4-jegyű pozitív egész szám készíthető az {1, 2, 3, 4, 5} jegyekből, ha egy számban minden jegy csak egyszer szerepelhet?',
        options: ['120 szám', '625 szám', '60 szám', '24 szám'],
        correctAnswer: 0,
        hint: '5 elemből választunk 4-et sorrend számítással: 5 · 4 · 3 · 2.',
        explanation: 'Az ezresek helyére 5, a százasokra 4, a tízesekre 3, az egyesekre 2 jegy választható: 5 · 4 · 3 · 2 = 120 szám.'
      },
      {
        id: 'ktq2-2',
        questionTypeBadge: 'Számalkotás 0-val',
        question: 'Hány 3-jegyű szám készíthető a {0, 1, 2, 3} jegyekből ismétlés nélkül?',
        options: ['18 szám', '24 szám', '12 szám', '64 szám'],
        correctAnswer: 0,
        hint: 'Az első jegy nem lehet 0 (3 választás). A másodikra a megmaradt 3 (beleértve a 0-t), a harmadikra 2.',
        explanation: '3 · 3 · 2 = 18 háromjegyű szám készíthető.'
      },
      {
        id: 'ktq2-3',
        questionTypeBadge: 'Páros Számok Képzése',
        question: 'Hány 3-jegyű páros szám képezhető az {1, 2, 3, 4, 5} jegyekből, ha a jegyek nem ismétlődhetnek?',
        options: ['24 szám', '48 szám', '12 szám', '60 szám'],
        correctAnswer: 0,
        hint: 'Az utolsó jegy páros kell legyen ({2, 4} ⟹ 2 lehetőség). A maradék két helyre 4 és 3 jegy.',
        explanation: 'Az utolsó helyre 2 jegy mehet (2 vagy 4). Az első helyre a maradék 4 jegyből, a középsőre 3 jegyből választhatunk: 4 · 3 · 2 = 24 szám.'
      },
      {
        id: 'ktq2-4',
        questionTypeBadge: 'Permutáció Blokk-módszer',
        question: '5 barát (Anna, Béla, Cili, Dénes, Elemér) leül egy padra. Hányféleképpen ülhetnek le, ha Anna és Béla egymás mellett akarnak ülni?',
        figure: <BlockSeatingSvg size={170} />,
        options: ['48 féleképpen', '120 féleképpen', '24 féleképpen', '60 féleképpen'],
        correctAnswer: 0,
        hint: 'Tekintsük Annát és Bélát 1 blokknak. 4 elemet rendezünk sorba (4! = 24), és a blokkon belül 2! = 2 sorrend lehetséges.',
        explanation: '4! · 2! = 24 · 2 = 48 féle ülésrend lehetséges.'
      },
      {
        id: 'ktq2-5',
        questionTypeBadge: 'Körasztal 5 Személyre',
        question: 'Hányféleképpen ülhet le 5 ember egy kerek asztal köré, ha csak a relatív sorrend számít?',
        figure: <RoundTableSvg seatsCount={5} size={150} />,
        options: ['24 féleképpen', '120 féleképpen', '60 féleképpen', '12 féleképpen'],
        correctAnswer: 0,
        hint: '(n - 1)! = 4! = 24.',
        explanation: '(5 - 1)! = 4! = 4 · 3 · 2 · 1 = 24 ülésrend.'
      },
      {
        id: 'ktq2-6',
        questionTypeBadge: 'Gráffokszám Tétel',
        question: 'Létezhet-e olyan egyszerű gráf, amelynek csúcsainak fokszámai: 4, 3, 3, 2, 1, 1?',
        figure: <CompleteGraphKHandshakesSvg size={185} />,
        options: [
          'Igen, létezik ilyen gráf',
          'Nem, mert a páratlan fokszámú csúcsok száma páratlan',
          'Nem, mert nincs benne 0 fokú csúcs',
          'Nem, mert a fokszámok összege páratlan'
        ],
        correctAnswer: 0,
        hint: 'Számold meg a páratlan fokú csúcsokat: 3, 3, 1, 1 (ez 4 db, ami páros!). Az összeg 14, az élek száma 7. 6 csúcsnál a 4-es fokszám is megengedett.',
        explanation: 'A páratlan fokú csúcsok száma 4 (páros), a fokszámok összege 14 (páros, e = 7 él), és egy 6 csúcsú gráfban a maximális fokszám 5 lehet, így a megadott fokszámsor grafikus és megvalósítható.'
      },
      {
        id: 'ktq2-7',
        questionTypeBadge: 'Körmérkőzés 8 Csapattal',
        question: 'Egy 8 csapatos bajnokságban minden csapat pontosan egyszer játszik minden más csapattal. Hány mérkőzést rendeznek összesen?',
        options: ['28 mérkőzést', '56 mérkőzést', '64 mérkőzést', '32 mérkőzést'],
        correctAnswer: 0,
        hint: '(8 · 7) / 2 = 56 / 2.',
        explanation: 'A mérkőzések száma: (8 · 7) / 2 = 28.'
      },
      {
        id: 'ktq2-8',
        questionTypeBadge: 'Konvex Sokszög Átlói',
        question: 'Hány átlója van egy konvex 7-szögnek?',
        figure: <PolygonDiagonalsSvg size={160} />,
        options: ['14 átló', '21 átló', '28 átló', '10 átló'],
        correctAnswer: 0,
        hint: 'Képlet: n · (n - 3) / 2. n = 7 esetén: (7 · 4) / 2.',
        explanation: '(7 · 4) / 2 = 28 / 2 = 14 átlója van.'
      },
      {
        id: 'ktq2-9',
        questionTypeBadge: 'Konvex 8-szög Átlói',
        question: 'Hány átlója van egy konvex nyolcszögnek?',
        options: ['20 átló', '28 átló', '24 átló', '16 átló'],
        correctAnswer: 0,
        hint: '(8 · 5) / 2.',
        explanation: '(8 · 5) / 2 = 40 / 2 = 20 átló.'
      },
      {
        id: 'ktq2-10',
        questionTypeBadge: 'Venn Szöveges Feladat',
        question: 'Egy 32 fős osztályban 20-an járnak sportolni, 16-an zenélni, és 8-an mindkettőre. Hányan nem vesznek részt egyik foglalkozáson sem?',
        figure: <ExamVennSieveSvg size={185} />,
        options: ['4 diák', '6 diák', '2 diák', '8 diák'],
        correctAnswer: 0,
        hint: '|S ∪ Z| = 20 + 16 - 8 = 28. Nem vesz részt: 32 - 28.',
        explanation: '|S ∪ Z| = 20 + 16 - 8 = 28 diák vesz részt legalább egyen. Mivel az osztály 32 fős: 32 - 28 = 4 diák nem vesz részt egyik foglalkozáson sem.'
      },
      {
        id: 'ktq2-11',
        questionTypeBadge: 'Szitaformula Metszete',
        question: 'Egy 40 fős csoportban mindenki tanul legalább egy nyelvet. Ha angolul 28-an, németül 24-en tanulnak, hányan tanulják mindkét nyelvet?',
        options: ['12 fő', '8 fő', '16 fő', '4 fő'],
        correctAnswer: 0,
        hint: '|A ∩ B| = |A| + |B| - |A ∪ B| = 28 + 24 - 40.',
        explanation: '28 + 24 - 40 = 52 - 40 = 12 fő tanulja mindkét nyelvet.'
      },
      {
        id: 'ktq2-12',
        questionTypeBadge: 'Szimmetrikus Differencia',
        question: 'Legyen A = {1, 2, 3, 4} és B = {3, 4, 5, 6}. Mi lesz az A Δ B szimmetrikus differencia eredménye?',
        figure: <SymmetricDifferenceSvg size={180} />,
        options: ['{1, 2, 5, 6}', '{3, 4}', '{1, 2}', '{1, 2, 3, 4, 5, 6}'],
        correctAnswer: 0,
        hint: 'A Δ B = (A \\ B) ∪ (B \\ A).',
        explanation: 'A \\ B = {1, 2}, B \\ A = {5, 6}. Ezek egyesítése: {1, 2, 5, 6}.'
      },
      {
        id: 'ktq2-13',
        questionTypeBadge: 'Szimmetrikus Diff Kifejezése',
        question: 'Melyik formulával egyezik meg a szimmetrikus differencia (A Δ B)?',
        options: [
          '(A ∪ B) \\ (A ∩ B)',
          '(A ∩ B) \\ (A ∪ B)',
          'A ∪ B',
          '(A \\ B) ∩ (B \\ A)'
        ],
        correctAnswer: 0,
        hint: 'Az unióból kivágjuk a középső metszetet.',
        explanation: 'A Δ B = (A \\ B) ∪ (B \\ A) = (A ∪ B) \\ (A ∩ B).'
      },
      {
        id: 'ktq2-14',
        questionTypeBadge: 'De Morgan I. Törvénye',
        question: 'Mit mond ki De Morgan I. törvénye az unió komplementeréről?',
        figure: <DeMorganVennSvg size={185} />,
        options: [
          '(A ∪ B) = Ā ∩ B̄',
          '(A ∪ B) = Ā ∪ B̄',
          '(A ∪ B) = A ∩ B',
          '(A ∪ B) = Ā \\ B̄'
        ],
        correctAnswer: 0,
        hint: 'Az unió komplementere a komplementerek metszete.',
        explanation: '(A ∪ B) = Ā ∩ B̄. Aki nincs benne az unióban, az sem A-ban, sem B-ben nincs benne.'
      },
      {
        id: 'ktq2-15',
        questionTypeBadge: 'De Morgan II. Törvénye',
        question: 'Mit mond ki De Morgan II. törvénye a metszet komplementeréről?',
        options: [
          '(A ∩ B) = Ā ∪ B̄',
          '(A ∩ B) = Ā ∩ B̄',
          '(A ∩ B) = A ∪ B',
          '(A ∩ B) = A \\ B'
        ],
        correctAnswer: 0,
        hint: 'A metszet tagadása a tagadások uniója.',
        explanation: '(A ∩ B) = Ā ∪ B̄.'
      },
      {
        id: 'ktq2-16',
        questionTypeBadge: 'Különbség Átírása',
        question: 'Hogyan fejezhető ki az A \\ B különbséghalmaz a metszet és a komplementer segítségével?',
        options: ['A ∩ B̄', 'A ∪ B̄', 'Ā ∩ B', 'Ā ∪ B'],
        correctAnswer: 0,
        hint: 'Azok az elemek, amelyek benne vannak A-ban, ÉS nincsenek benne B-ben.',
        explanation: 'A \\ B = A ∩ B̄.'
      },
      {
        id: 'ktq2-17',
        questionTypeBadge: 'Valódi Részhalmazok',
        question: 'Hány valódi részhalmaza van egy 6 elemű halmaznak?',
        options: ['63', '64', '62', '31'],
        correctAnswer: 0,
        hint: 'Valódi részhalmazok száma: 2ⁿ - 1. 2⁶ - 1 = 64 - 1.',
        explanation: '2⁶ - 1 = 63 valódi részhalmaz van (maga a halmaz nem valódi részhalmaz).'
      },
      {
        id: 'ktq2-18',
        questionTypeBadge: 'Nem Üres Valódi Részhalmazok',
        question: 'Egy halmaznak pontosan 14 darab nem üres, valódi részhalmaza van. Hány eleme van a halmaznak?',
        options: ['4 elem', '3 elem', '5 elem', '6 elem'],
        correctAnswer: 0,
        hint: 'A nem üres valódi részhalmazok száma: 2ⁿ - 2 = 14.',
        explanation: '2ⁿ - 2 = 14 ⟹ 2ⁿ = 16 = 2⁴, tehát n = 4 eleme van a halmaznak.'
      },
      {
        id: 'ktq2-19',
        questionTypeBadge: '2 Elemű Részhalmazok',
        question: 'Egy 5 elemű halmaznak hány pontosan 2 elemű részhalmaza van?',
        options: ['10', '20', '5', '15'],
        correctAnswer: 0,
        hint: '5 alatt a 2: (5 · 4) / (2 · 1).',
        explanation: '(5 · 4) / 2 = 10 darab 2 elemű részhalmaz létezik.'
      },
      {
        id: 'ktq2-20',
        questionTypeBadge: 'Intervallum Metszet',
        question: 'Mi a [-3; 4] és [1; 6] intervallumok METSZETE?',
        options: ['[1; 4]', '[-3; 6]', ']1; 4[', '[1; 6]'],
        correctAnswer: 0,
        hint: 'A bal végpontok közül a nagyobbik (1), a jobb végpontok közül a kisebbik (4). Mindkettő zárt.',
        explanation: '[-3; 4] ∩ [1; 6] = [1; 4].'
      },
      {
        id: 'ktq2-21',
        questionTypeBadge: 'Intervallum Unió',
        question: 'Mi a [-2; 3[ és [1; 5] intervallumok UNIÓJA?',
        options: ['[-2; 5]', '[-2; 5[', '[1; 3[', ']-2; 5]'],
        correctAnswer: 0,
        hint: 'A bal végpontok közül a kisebbik (-2 zárt), a jobb végpontok közül a nagyobbik (5 zárt).',
        explanation: '[-2; 3[ ∪ [1; 5] = [-2; 5]. Mivel átfednek, egybefüggő intervallumot alkotnak.'
      },
      {
        id: 'ktq2-22',
        questionTypeBadge: 'Intervallum Kivonás',
        question: 'Mi lesz a [-2; 5] \\ ]1; 7] halmazkivonás pontos eredménye?',
        options: ['[-2; 1]', '[-2; 1[', ']-2; 1]', '[-2; 7]'],
        correctAnswer: 0,
        hint: 'Az 1 nincs benne a kivonandó ]1; 7] intervallumban (mert ott nyílt), ezért benne marad az eredményben!',
        explanation: 'Mivel az 1 nincs benne a levonandó ]1; 7] halmazban, a kivonás után megmarad, így a jobb oldali határ zárt marad: [-2; 1].'
      },
      {
        id: 'ktq2-23',
        questionTypeBadge: 'Intervallum Egészek',
        question: 'Hány egész szám tartozik az A = ]-5; 4] és B = [-2; 7[ intervallumok METSZETÉHEZ?',
        figure: <IntervalSetIntersectionRulerSvg size={185} />,
        options: ['7 darab (-2, -1, 0, 1, 2, 3, 4)', '6 darab', '8 darab', '5 darab'],
        correctAnswer: 0,
        hint: 'A ∩ B = [-2; 4]. Számold meg az ebbe eső egészeket: 4 - (-2) + 1.',
        explanation: 'A ∩ B = [-2; 4]. Az egész elemek: {-2, -1, 0, 1, 2, 3, 4}, ami pontosan 7 darab egész szám.'
      },
      {
        id: 'ktq2-24',
        questionTypeBadge: 'Végtelen Intervallum Komplementere',
        question: 'Ha az alaphalmaz ℝ, mi az [1; +∞[ intervallum komplementere?',
        options: [']-∞; 1[', ']-∞; 1]', '[1; -∞[', ']-∞; -1]'],
        correctAnswer: 0,
        hint: 'Az x ≥ 1 tagadása x < 1.',
        explanation: 'A komplementer azon számok halmaza, ahol x < 1, azaz ]-∞; 1[.'
      },
      {
        id: 'ktq2-25',
        questionTypeBadge: 'Végtelen Szakaszos Tizedestört',
        question: 'Melyik törtnek felel meg a 0,333... végtelen szakaszos tizedestört, és melyik halmazba tartozik?',
        options: ['1/3, és a racionális számok (ℚ) halmazába tartozik', '1/3, és irracionális (ℚ*)', '3/10, és ℕ', '3/100, és ℤ'],
        correctAnswer: 0,
        hint: 'Minden szakaszos tizedestört felírható két egész szám hányadosaként.',
        explanation: '0,333... = 1/3, két egész szám hányadosa, tehát racionális szám (1/3 ∈ ℚ).'
      },
      {
        id: 'ktq2-26',
        questionTypeBadge: 'Véges Tizedestört Tört Alakja',
        question: 'Írd fel a 0,375 véges tizedestörtet legegyszerűbb tört alakban!',
        options: ['3/8', '375/100', '7/16', '1/4'],
        correctAnswer: 0,
        hint: '375 / 1000 = (3 · 125) / (8 · 125).',
        explanation: '0,375 = 375/1000 = 3/8.'
      },
      {
        id: 'ktq2-27',
        questionTypeBadge: 'PIN Kódok Párosra Végződve',
        question: 'Hány olyan 4-jegyű bankkártya PIN kód van, amely páros számjegyre (0, 2, 4, 6, 8) végződik?',
        options: ['5 000 kód', '4 500 kód', '2 500 kód', '1 000 kód'],
        correctAnswer: 0,
        hint: 'Az első három helyre 10-10-10 jegy mehet, az utolsóra 5 páros jegy.',
        explanation: '10 · 10 · 10 · 5 = 5 000 különböző kód felel meg a feltételnek.'
      },
      {
        id: 'ktq2-28',
        questionTypeBadge: 'Dirichlet Zoknik',
        question: 'Egy fiókban sok fekete és fehér zokni van. Legalább hány zoknit kell kivennünk csukott szemmel, hogy biztosan legyen köztük egy pár azonos színű?',
        options: ['3 zoknit', '2 zoknit', '4 zoknit', '5 zoknit'],
        correctAnswer: 0,
        hint: '2 szín van (2 skatulya). 2 + 1 = 3 zokni kell.',
        explanation: 'A Dirichlet-elv szerint 2 skatulya esetén 3 tárgyból legalább egy skatulyába legalább 2 kerül, tehát 3 zokni szükséges.'
      },
      {
        id: 'ktq2-29',
        questionTypeBadge: 'Dirichlet Születési Hónapok',
        question: 'Egy szobában emberek tartózkodnak. Legkevesebb hány ember kell a szobában legyen, hogy BIZTOSAN legyen köztük legalább 3 olyan, aki azonos hónapban született?',
        options: ['25 ember', '24 ember', '13 ember', '36 ember'],
        correctAnswer: 0,
        hint: '12 hónap van. Legrosszabb esetben minden hónapban pontosan 2 ember született: 12 · 2 = 24. A 25. ember a harmadik lesz.',
        explanation: '12 hónap esetén legfeljebb 12 · 2 = 24 ember lehet úgy, hogy senkinek sincs 3 egyezése. A 25. ember biztosítja a harmadik egyezést: 24 + 1 = 25.'
      },
      {
        id: 'ktq2-30',
        questionTypeBadge: 'Fa Gráf Éleinek Száma',
        question: 'Hány éle van egy összefüggő, körmentes fának (fa gráfnak), ha 10 csúcsa van?',
        options: ['9 él', '10 él', '45 él', '8 él'],
        correctAnswer: 0,
        hint: 'Minden n csúcsú fa gráf pontosan n - 1 élet tartalmaz.',
        explanation: 'Egy fa gráfban az élek száma e = n - 1 = 10 - 1 = 9 él.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Verseny és Emelt Szintű Mesterfeladatok (Nehéz)',
    subtitle: '3-halmazos szita, indirekt bizonyítás, másodlagos hatványhalmaz és extremitások.',
    range: '61 - 90. feladat',
    focus: 'Fejezeti Mesterfokozat és Versenyelőkészítés (30 Feladat)',
    questions: [
      {
        id: 'ktq3-1',
        questionTypeBadge: '3 Halmazos Szitaformula',
        question:
          'Egy 50 fős évfolyamon 30-an szeretik a matekot, 25-en a fizikát, 22-en a kémiát. 14-en matek+fizika, 11-en matek+kémia, 10-en fizika+kémia, és 6 diák mindhármat szereti. Hányan nem szeretik egyik tárgyat sem?',
        figure: <ExamVennSieveSvg size={190} />,
        options: ['2 diák', '4 diák', '5 diák', '1 diák'],
        correctAnswer: 0,
        hint: '|M ∪ F ∪ K| = (30 + 25 + 22) - (14 + 11 + 10) + 6 = 77 - 35 + 6 = 48.',
        explanation:
          'A három tantárgy uniójának elemszáma 48 fő. Mivel az évfolyam 50 fős, 50 - 48 = 2 diák nem szereti egyik tantárgyat sem.'
      },
      {
        id: 'ktq3-2',
        questionTypeBadge: 'Pontosan Két Tárgyat Kedvelők',
        question:
          'A 31. feladat évfolyamán hány olyan diák van, aki PONTOSAN KÉT tantárgyat szeret a háromból?',
        figure: <ExamVennSieveSvg size={190} />,
        options: ['17 diák', '21 diák', '14 diák', '23 diák'],
        correctAnswer: 0,
        hint: 'A páros metszetekből le kell vonni a hármas metszetet (6-ot): (14-6) + (11-6) + (10-6).',
        explanation:
          'Csak matek+fizika: 14 - 6 = 8; csak matek+kémia: 11 - 6 = 5; csak fizika+kémia: 10 - 6 = 4. Összesen pontosan kettőt szeret: 8 + 5 + 4 = 17 diák.'
      },
      {
        id: 'ktq3-3',
        questionTypeBadge: 'Pontosan Egy Tárgyat Kedvelők',
        question:
          'A 31. feladat évfolyamán hány diák szeret PONTOSAN EGY tantárgyat a háromból?',
        options: ['25 diák', '29 diák', '20 diák', '35 diák'],
        correctAnswer: 0,
        hint: 'Vonjuk le a teljes unióból (48) a pontosan kettőt szeretőket (17) és a mindhármat szeretőket (6)!',
        explanation:
          '48 - 17 - 6 = 25 diák szeret pontosan egy tantárgyat (Csak M: 30 - 8 - 5 - 6 = 11; Csak F: 25 - 8 - 4 - 6 = 7; Csak K: 22 - 5 - 4 - 6 = 7 ⟹ 11 + 7 + 7 = 25).'
      },
      {
        id: 'ktq3-4',
        questionTypeBadge: 'Szitaformula Határok',
        question:
          'Egy 35 fős osztályban |A| = 24 és |B| = 18. Mi a LEGNAGYOBB és LEGKISSEBB lehetséges értéke az |A ∩ B| metszetnek?',
        options: [
          'Legkisebb: 7, Legnagyobb: 18',
          'Legkisebb: 0, Legnagyobb: 18',
          'Legkisebb: 7, Legnagyobb: 24',
          'Legkisebb: 11, Legnagyobb: 18'
        ],
        correctAnswer: 0,
        hint: 'Legkisebb: |A| + |B| - 35 = 24 + 18 - 35 = 7. Legnagyobb: min(|A|, |B|) = 18.',
        explanation:
          'A metszet minimális értéke: 24 + 18 - 35 = 7. A maximális érték: min(24, 18) = 18.'
      },
      {
        id: 'ktq3-5',
        questionTypeBadge: 'Másodlagos Hatványhalmaz',
        question: 'Ha egy A halmaznak 3 eleme van (|A| = 3), hány eleme van a 𝒫(𝒫(A)) hatványhalmaznak?',
        figure: <PowerSetTreeSvg size={185} />,
        options: ['256 elem', '64 elem', '512 elem', '16 elem'],
        correctAnswer: 0,
        hint: '|𝒫(A)| = 2³ = 8. Ennek hatványhalmaza: 2⁸.',
        explanation:
          '|𝒫(A)| = 2³ = 8 elem. Ennek a hatványhalmaza 𝒫(𝒫(A)), melynek elemszáma: 2⁸ = 256 elem.'
      },
      {
        id: 'ktq3-6',
        questionTypeBadge: 'Üres Halmaz Hatványhalmaza',
        question: 'Hány eleme van a 𝒫(∅) halmaznak (az üres halmaz hatványhalmazának)?',
        options: ['1 eleme van: {∅}', '0 eleme van: ∅', '2 eleme van', 'végtelen sok'],
        correctAnswer: 0,
        hint: '2⁰ = 1. Az egyetlen részhalmaz maga az üres halmaz.',
        explanation:
          '|𝒫(∅)| = 2⁰ = 1, és 𝒫(∅) = {∅}.'
      },
      {
        id: 'ktq3-7',
        questionTypeBadge: 'Harmadlagos Hatványhalmaz ∅-re',
        question: 'Hány eleme van a 𝒫(𝒫(∅)) halmaznak?',
        options: ['2 eleme van: {∅, {∅}}', '1 eleme van', '4 eleme van', '0 eleme van'],
        correctAnswer: 0,
        hint: '|𝒫(∅)| = 1 ⟹ 2¹ = 2.',
        explanation:
          'Mivel |𝒫(∅)| = 1, ennek hatványhalmaza 2¹ = 2 elemet tartalmaz: {∅, {∅}}.'
      },
      {
        id: 'ktq3-8',
        questionTypeBadge: 'Szimmetrikus Diff Alaptulajdonság',
        question: 'Melyik összefüggés HAMIS az alábbiak közül a szimmetrikus differenciára?',
        figure: <DeMorganVennSvg size={185} />,
        options: [
          'A Δ A = A',
          'A Δ A = ∅',
          'A Δ ∅ = A',
          'A Δ B = (A ∪ B) \\ (A ∩ B)'
        ],
        correctAnswer: 0,
        hint: 'Ha egy halmazból kivonjuk saját magát, üres halmazt kapunk.',
        explanation:
          'A Δ A = (A \\ A) ∪ (A \\ A) = ∅ ∪ ∅ = ∅. Tehát az A Δ A = A állítás HAMIS.'
      },
      {
        id: 'ktq3-9',
        questionTypeBadge: 'Szimmetrikus Diff Semleges Elem',
        question: 'Mi lesz az A Δ ∅ szimmetrikus differencia eredménye tetszőleges A halmaz esetén?',
        options: ['A', '∅', 'Ā', 'U'],
        correctAnswer: 0,
        hint: '(A \\ ∅) ∪ (∅ \\ A) = A ∪ ∅ = A.',
        explanation:
          'A Δ ∅ = (A \\ ∅) ∪ (∅ \\ A) = A ∪ ∅ = A. Tehát az üres halmaz semleges elem a szimmetrikus differenciára nézve.'
      },
      {
        id: 'ktq3-10',
        questionTypeBadge: 'Szimmetrikus Diff 3 Halmazra',
        question: 'Mit jelent a 3 halmazos Venn-diagramon az (A Δ B) Δ C terület?',
        figure: <ThreeSetsVennRegionsSvg size={185} />,
        options: [
          'A pontosan egy halmazba tartozó és a mindhárom halmazba tartozó elemek egyesítése',
          'Csak a mindhárom halmazba tartozó elemek',
          'A pontosan két halmazba tartozó elemek',
          'A teljes unió A ∪ B ∪ C'
        ],
        correctAnswer: 0,
        hint: 'A szimmetrikus differencia a páratlan sok halmazba eső régiókat jelöli ki (1 vagy 3 halmaz).',
        explanation:
          'A szimmetrikus differencia asszociatív és kommutatív: az (A Δ B) Δ C pontosan azokat a pontokat tartalmazza, amelyek páratlan számú halmazba tartoznak (azaz pontosan 1 vagy mind a 3 halmazba).'
      },
      {
        id: 'ktq3-11',
        questionTypeBadge: 'Oszthatósági Metszetek',
        question:
          'Az 1-től 100-ig terjedő egész számok közül hány osztható 4-gyel ÉS 6-tal is egyszerre?',
        options: ['8 szám (a 12-vel oszthatóak)', '25 szám', '16 szám', '12 szám'],
        correctAnswer: 0,
        hint: '4 és 6 legkisebb közös többszöröse az lkkt(4, 6) = 12. 100 // 12.',
        explanation:
          'A közös többszörösök a 12 többszörösei: 100 // 12 = 8 szám (12, 24, 36, 48, 60, 72, 84, 96).'
      },
      {
        id: 'ktq3-12',
        questionTypeBadge: 'Szitaformula Oszthatóságra',
        question:
          'Az 1-től 120-ig terjedő egész számok közül hány olyan van, amely sem 2-vel, sem 3-mal nem osztható?',
        options: ['40 szám', '60 szám', '20 szám', '50 szám'],
        correctAnswer: 0,
        hint: '|A| = 60 (2-vel), |B| = 40 (3-mal), |A ∩ B| = 20 (6-tal). |A ∪ B| = 60 + 40 - 20 = 80.',
        explanation:
          'A 2-vel vagy 3-mal oszthatók uniója: 60 + 40 - 20 = 80 szám. A komplementerük az 1..120 halmazon belül: 120 - 80 = 40 szám.'
      },
      {
        id: 'ktq3-13',
        questionTypeBadge: 'Dirichlet Ismerősök Tétel',
        question:
          'Bizonyítsuk be: bármely legalább 2 fős társaságban mindig van legalább két ember, akiknek ugyanannyi ismerősük van a társaságban (az ismeretség kölcsönös)! Mi a bizonyítás kulcsa?',
        figure: <CompleteGraphKHandshakesSvg size={185} />,
        options: [
          'Az n ember ismerőseinek száma 0 és n-1 közötti lehet, de a 0 és az n-1 nem fordulhat elő egyszerre, így csak n-1 féle skatulya van n emberre',
          'Mert a fokszámok összege mindig páratlan',
          'Mert mindenki mindenkivel kezet fog',
          'Mert a gráfban nem lehet kör'
        ],
        correctAnswer: 0,
        hint: 'Ha valakinek n - 1 ismerőse van (mindenkit ismer), senkinek sem lehet 0 ismerőse.',
        explanation:
          'Egy n fős csoportban az ismerősök száma {0, 1, ..., n-1} lehet. De a 0 (senkit sem ismer) és az n-1 (mindenkit ismer) egymást kizárja. Így legfeljebb n-1 különböző fokszámérték létezhet n emberre. A Dirichlet-elv miatt legalább két ember fokszáma megegyezik.'
      },
      {
        id: 'ktq3-14',
        questionTypeBadge: 'Dirichlet Rácspontok',
        question:
          'A derékszögű koordináta-rendszerben kiválasztunk 5 tetszőleges rácspontot (egész koordinátájú pontot). Igaz-e, hogy biztosan van köztük kettő, amelyek felezőpontja szintén rácspont?',
        options: [
          'Igen, mert a koordináták paritása (páros/páratlan) 4-féle lehet, és 5 pontnál a skatulya-elv miatt legalább kettő azonos paritású',
          'Nem, mert tetszőlegesen messze választhatók a pontok',
          'Csak akkor, ha egy egyenesre esnek',
          'Csak pozitív koordináták esetén igaz'
        ],
        correctAnswer: 0,
        hint: 'Két pont felezőpontja ((x1+x2)/2, (y1+y2)/2). Ez akkor egész, ha x1 és x2 paritása azonos, és y1 és y2 paritása is azonos.',
        explanation:
          'A paritáspárok: (páros, páros), (páros, páratlan), (páratlan, páros), (páratlan, páratlan) — ez 4 skatulya. 5 pont esetén a Dirichlet-elv miatt legalább 2 pont ugyanabba a paritásosztályba esik, így felezőpontjuk egész számokból áll.'
      },
      {
        id: 'ktq3-15',
        questionTypeBadge: 'Logikai Tagadás',
        question: 'Mi a pontos tagadása annak az állításnak, hogy „Minden prímszám páratlan”?',
        figure: <RussellParadoxScaleSvg size={180} />,
        options: [
          'Létezik legalább egy olyan prímszám, amely páros',
          'Minden prímszám páros',
          'Egyetlen prímszám sem páratlan',
          'Nincsenek páros számok'
        ],
        correctAnswer: 0,
        hint: 'Egy egyetemes állítás (∀) tagadása egy létezési állítás (∃) a tulajdonság ellentétével.',
        explanation:
          'A „Minden x-re P(x)” állítás tagadása: „Létezik olyan x, amire nem P(x)”. Mivel a 2 prímszám és páros, az eredeti állítás hamis, a tagadása pedig igaz.'
      },
      {
        id: 'ktq3-16',
        questionTypeBadge: 'Halmaztartalmazás Tagadása',
        question: 'Mikor mondhatjuk, hogy az A ⊆ B részhalmaz-tartalmazási reláció HAMIS?',
        figure: <SubsetInclusionVennSvg size={180} />,
        options: [
          'Ha létezik olyan x ∈ A elem, amelyre x ∉ B (azaz A \\ B ≠ ∅)',
          'Ha A ∩ B = ∅',
          'Ha B ⊆ A',
          'Ha A és B uniója véges'
        ],
        correctAnswer: 0,
        hint: 'A részhalmaz definíciója: minden A-beli elem B-ben is benne van. Tagadása: van ellenpélda A-ban.',
        explanation:
          'A ⊆ B pontosan akkor nem teljesül, ha van olyan elem, ami benne van A-ban, de nincs benne B-ben, tehát a különbséghalmaz nem üres: A \\ B ≠ ∅.'
      },
      {
        id: 'ktq3-17',
        questionTypeBadge: 'Russell-paradoxon',
        question:
          'Miért tette szükségessé Bertrand Russell paradoxona az axiomatikus halmazelmélet (pl. ZFC) megalkotását?',
        figure: <RussellParadoxScaleSvg size={180} />,
        options: [
          'Mert rávilágított, hogy bármilyen tulajdonsággal nem képezhető szabadon halmaz (nem létezhet minden halmaz halmaza)',
          'Mert bebizonyította, hogy a párhuzamos egyenesek metszik egymást',
          'Mert kiderült, hogy a nullával való osztás lehetséges',
          'Mert a negatív számoknak nem lehet gyöke'
        ],
        correctAnswer: 0,
        hint: 'A naiv halmazelméletben a szabad halmazképzés (komprehenzió) ellentmondáshoz vezetett.',
        explanation:
          'Russell paradoxona kimutatta, hogy ha tetszőleges feltétellel alkothatnánk halmazt, feloldhatatlan logikai antinómiák keletkeznének. Ezért axiomatikusan korlátozni kellett a halmazok képzését.'
      },
      {
        id: 'ktq3-18',
        questionTypeBadge: 'Végtelen Halmazok Számossága',
        question: 'Melyik állítás IGAZ a természetes számok (ℕ) és a valós számok (ℝ) számosságáról?',
        figure: <ChapterSummaryMindmapSvg size={185} />,
        options: [
          '|ℕ| = ℵ₀ (megszámlálhatóan végtelen), míg |ℝ| kontinuum számosságú (szigorúan nagyobb számosság)',
          'A két halmaz azonos számosságú',
          'A természetes számok halmaza nagyobb számosságú, mint ℝ',
          'Egyik sem végtelen halmaz'
        ],
        correctAnswer: 0,
        hint: 'Cantor második átlós módszere megmutatta, hogy a valós számok nem rendezhetők sorba.',
        explanation:
          'Georg Cantor bebizonyította, hogy a valós számok halmaza nem megszámlálható, hanem kontinuum számosságú (2^ℵ₀), ami szigorúan nagyobb számosság, mint a természetes számok ℵ₀ számossága.'
      },
      {
        id: 'ktq3-19',
        questionTypeBadge: 'Szakasz és Egyenes Számossága',
        question: 'Milyen a ]0; 1[ nyílt intervallum számossága a teljes valós számegyeneshez (ℝ) képest?',
        options: [
          'Azonos számosságúak (kölcsönösen egyértelmű megfeleltetés létesíthető közöttük pl. tangens függvénnyel)',
          'A ]0; 1[ intervallum szigorúan kisebb számosságú',
          'A ]0; 1[ intervallum véges halmaz',
          'A ]0; 1[ intervallum megszámlálhatóan végtelen'
        ],
        correctAnswer: 0,
        hint: 'Bármilyen rövid nyílt intervallum bijektíven ráképezhető a teljes számegyenesre.',
        explanation:
          'Bármely nem elfajuló intervallum (pl. ]0; 1[) kontinuum számosságú, azaz pontosan ugyanannyi pontja van, mint a teljes valós számegyenesnek.'
      },
      {
        id: 'ktq3-20',
        questionTypeBadge: 'Ismétléses Permutáció Előkészítés',
        question: 'Hányféleképpen rendezhetők sorba a MAMA szó betűi?',
        options: ['6 féleképpen', '24 féleképpen', '12 féleképpen', '4 féleképpen'],
        correctAnswer: 0,
        hint: '4 betű van, de a 2 db M és a 2 db A azonos: 4! / (2! · 2!).',
        explanation: '4! / (2! · 2!) = 24 / (2 · 2) = 6 különböző szó készíthető (MAMA, MAAM, MMAA, AMMA, AMAM, AAMM).'
      },
      {
        id: 'ktq3-21',
        questionTypeBadge: 'Körasztal Felváltva',
        question: 'Hányféleképpen ülhet le 3 fiú és 3 lány egy kerek asztal köré úgy, hogy a nemek felváltva kövessék egymást?',
        figure: <RoundTableSvg seatsCount={6} size={150} />,
        options: ['12 féleképpen', '36 féleképpen', '72 féleképpen', '6 féleképpen'],
        correctAnswer: 0,
        hint: 'Ültessük le a 3 fiút körasztalhoz: (3-1)! = 2! = 2. A 3 köztes helyre a 3 lány 3! = 6 féleképpen ülhet: 2 · 6 = 12.',
        explanation: 'A fiúk körasztal-sorrendje (3-1)! = 2. A köztük kialakuló 3 helyre a lányok 3! = 6 módon ülhetnek le: 2 · 6 = 12 ülésrend létezik.'
      },
      {
        id: 'ktq3-22',
        questionTypeBadge: 'Blokk-módszer 3 Elemre',
        question: '6 diák áll sorba. Hányféleképpen állhatnak fel, ha 3 jóbarát mindenképpen egymás mellett akar állni?',
        options: ['144 féleképpen', '720 féleképpen', '36 féleképpen', '216 féleképpen'],
        correctAnswer: 0,
        hint: 'A 3 barát 1 blokk: 4 elemet rendezünk sorba (4! = 24), a blokkon belül a barátok 3! = 6 féleképpen cserélhetnek helyet: 24 · 6.',
        explanation: '4! · 3! = 24 · 6 = 144 féle sorrend létezik.'
      },
      {
        id: 'ktq3-23',
        questionTypeBadge: 'Teljes Gráf Fokszámai',
        question: 'Lehet-e egy 5 csúcsú egyszerű gráfban minden csúcs fokszáma pontosan 4?',
        figure: <CompleteGraphKHandshakesSvg size={185} />,
        options: [
          'Igen, ez a K₅ teljes gráf',
          'Nem, mert a fokszámok összege 20',
          'Nem, mert nincs benne 0 fokú csúcs',
          'Csak akkor, ha van benne hurokél'
        ],
        correctAnswer: 0,
        hint: '5 csúcsú egyszerű gráfban minden csúcsnak legfeljebb 4 szomszédja lehet. Ha mind a 4, az a teljes gráf.',
        explanation: 'Az 5 csúcsú teljes gráfban (K₅) minden csúcs a másik 4 csúccsal össze van kötve, így minden csúcs foka 4. ∑ d(v) = 20 = 2 · 10 él.'
      },
      {
        id: 'ktq3-24',
        questionTypeBadge: 'Lehetetlen Gráffokszámsor',
        question: 'Létezhet-e olyan 6 csúcsú egyszerű gráf, amelynek 5 csúcsa 5-ös fokú, 1 csúcsa pedig 0 fokú?',
        options: [
          'Nem, mert ha van 5-ös fokú csúcs, az mindenkit ismer, így senkinek sem lehet 0 a fokszáma',
          'Igen, létezik ilyen gráf',
          'Igen, mert a fokszámok összege 25',
          'Csak páros számú élek esetén'
        ],
        correctAnswer: 0,
        hint: 'Egy 5-ös fokú csúcs a gráf összes többi csúcsával össze van kötve, így nem létezhet izolált (0 fokú) csúcs!',
        explanation: 'Ha egy csúcs foka n - 1 = 5, akkor az összes többi csúcshoz fut éle, így egyetlen csúcs sem lehet izolált (0 fokú). Ráadásul a fokszámok összege 25 lenne, ami páratlan, tehát két okból is lehetetlen.'
      },
      {
        id: 'ktq3-25',
        questionTypeBadge: 'Abszolútértékes Intervallum',
        question: 'Melyik intervallum felel meg az |x - 2| ≤ 3 egyenlőtlenség megoldáshalmazának a valós számok körében?',
        figure: <IntervalSetIntersectionRulerSvg size={185} />,
        options: ['[-1; 5]', '[-3; 3]', '] -1; 5 [', '[2; 5]'],
        correctAnswer: 0,
        hint: '|x - 2| ≤ 3 azt jelenti, hogy x távolsága a 2-től legfeljebb 3 egység: 2 - 3 ≤ x ≤ 2 + 3.',
        explanation: '-3 ≤ x - 2 ≤ 3 ⟹ -1 ≤ x ≤ 5, azaz a megoldáshalmaz a [-1; 5] zárt intervallum.'
      },
      {
        id: 'ktq3-26',
        questionTypeBadge: 'Abszolútértékes Egész Pontok',
        question: 'Hány egész megoldása van az |x - 2| ≤ 3 egyenlőtlenségnek?',
        options: ['7 darab (-1, 0, 1, 2, 3, 4, 5)', '6 darab', '5 darab', 'végtelen sok'],
        correctAnswer: 0,
        hint: 'A [-1; 5] intervallumba eső egész számok: 5 - (-1) + 1.',
        explanation: 'A [-1; 5] ∩ ℤ halmaz elemei: {-1, 0, 1, 2, 3, 4, 5}, ami 7 darab egész szám.'
      },
      {
        id: 'ktq3-27',
        questionTypeBadge: 'Oszthatósági Szita 3 Számra',
        question:
          'Az 1-től 100-ig terjedő egész számok közül hány osztható 2-vel, 3-mal VAGY 5-tel?',
        options: ['74 szám', '80 szám', '70 szám', '65 szám'],
        correctAnswer: 0,
        hint: 'Szitaformula 3 halmazra: 50 + 33 + 20 - (16 + 10 + 6) + 3 = 103 - 32 + 3 = 74.',
        explanation:
          'A 2, 3, 5 többszöröseinek száma 100-ig: |A|=50, |B|=33, |C|=20. Páros metszetek (6, 10, 15): 16 + 10 + 6 = 32. Hármas metszet (30): 3. Összesen: 50 + 33 + 20 - 32 + 3 = 74 szám.'
      },
      {
        id: 'ktq3-28',
        questionTypeBadge: 'Komplementer Elemek Száma',
        question: 'Az 1-től 100-ig terjedő egész számok közül hány olyan van, amely SEM 2-vel, SEM 3-mal, SEM 5-tel nem osztható?',
        options: ['26 szám (100 - 74)', '30 szám', '20 szám', '35 szám'],
        correctAnswer: 0,
        hint: 'A 27. feladat eredménye szerint 74 szám osztható valamelyikkel. A maradék: 100 - 74.',
        explanation: '100 - 74 = 26 olyan szám van 1 és 100 között, amely sem 2-vel, sem 3-mal, sem 5-tel nem osztható.'
      },
      {
        id: 'ktq3-29',
        questionTypeBadge: 'Cantor Átlós Módszere',
        question: 'Mit bizonyított Georg Cantor a híres második átlós módszerével (1891)?',
        options: [
          'A valós számok nem számlálhatók meg, vagyis |ℝ| > |ℕ|',
          'A prímszámok száma végtelen',
          'A kör kerülete 2πr',
          'A gráfok fokszámösszege páros'
        ],
        correctAnswer: 0,
        hint: 'Bármilyen valós számokból álló listát feltételezve mindig konstruálható egy olyan szám, ami eltér az összes listabeli számtól a diagonális jegyek módosításával.',
        explanation:
          'Cantor átlós módszere megmutatta, hogy a [0, 1] intervallum pontjai nem rendezhetők sorozatba, így a valós számok halmaza megszámlálhatatlanul végtelen.'
      },
      {
        id: 'ktq3-30',
        questionTypeBadge: 'Fejezeti Mesterkérdés',
        question:
          'Egy 10 elemű halmaznak hány olyan részhalmaza van, amely tartalmaz legalább egy elemet, de nem tartalmazza az összes elemet?',
        figure: <ChapterSummaryMindmapSvg size={185} />,
        options: ['1 022 részhalmaz (2¹⁰ - 2)', '1 024 részhalmaz', '1 023 részhalmaz', '512 részhalmaz'],
        correctAnswer: 0,
        hint: 'Nem üres, és nem a teljes halmaz: 2ⁿ - 2.',
        explanation:
          'Összes részhalmaz: 2¹⁰ = 1024. Kizárjuk az üres halmazt (1 db) és magát a 10 elemű teljes halmazt (1 db): 1024 - 2 = 1 022 részhalmaz.'
      }
    ]
  }
};

const practiceCheatSheets: CheatSheetCard[] = [
  {
    title: 'Permutációk és Sorbarendezések',
    formula: 'P_n = n! = n \\cdot (n-1) \\dots 1 \\quad | \\quad \\text{Körasztal:} \\ (n-1)!',
    description: 'n különböző elem sorbarendezéseinek száma. Független helyekre a lehetőségek szorzata érvényes.',
    note: '0! = 1 definíció szerint.',
    figure: <CountingPermutationTreeSvg size={150} />,
    color: 'rose'
  },
  {
    title: 'Gráfelmélet & Kézfogási Lemma',
    formula: '\\sum_{v \\in V} d(v) = 2e \\quad | \\quad \\binom{n}{2} = \\frac{n(n-1)}{2}',
    description: 'A fokszámok összege mindig a csúcsok közötti élek számának kétszerese. A páratlan fokszámú csúcsok száma mindig páros.',
    note: 'Teljes gráf élei n(n-1)/2, sokszög átlói n(n-3)/2.',
    figure: <CompleteGraphKHandshakesSvg size={150} />,
    color: 'amber'
  },
  {
    title: 'A Szitaformula (2 és 3 Halmazra)',
    formula: '|A \\cup B \\cup C| = \\sum |A| - \\sum |A \\cap B| + |A \\cap B \\cap C|',
    description: 'Venn-diagramos szöveges feladatok kulcsa: egyesek összege mínusz páros metszetek plusz hármas metszet.',
    note: 'Mindig a legbelső hármas metszetből indulva töltjük ki a Venn-mezőket!',
    figure: <ExamVennSieveSvg size={150} />,
    color: 'red'
  },
  {
    title: 'De Morgan Törvények & Komplementer',
    formula: '\\overline{A \\cup B} = \\overline{A} \\cap \\overline{B} \\quad | \\quad \\overline{A \\cap B} = \\overline{A} \\cup \\overline{B}',
    description: 'Az unió komplementere a komplementerek metszete; a metszet komplementere a komplementerek uniója.',
    note: 'A \\ B = A ∩ B̄.',
    figure: <DeMorganVennSvg size={150} />,
    color: 'purple'
  },
  {
    title: 'Szimmetrikus Differencia',
    formula: 'A \\Delta B = (A \\setminus B) \\cup (B \\setminus A) = (A \\cup B) \\setminus (A \\cap B)',
    description: 'Pontosan azok az elemek, amelyek a két halmaz közül CSAK AZ EGYIKBE tartoznak bele.',
    note: 'A Δ A = ∅ és A Δ ∅ = A.',
    figure: <ChapterSummaryMindmapSvg size={150} />,
    color: 'violet'
  },
  {
    title: 'Intervallumok és a Számegyenes',
    formula: '[a; b] \\cap \\mathbb{Z} = \\{k \\in \\mathbb{Z} \\mid a \\le k \\le b\\}',
    description: 'Nyílt határnál a pont nem eleme, zárt határnál eleme az intervallumnak. Metszetkor a belső szakasz, uniónál a külső határok számítanak.',
    note: 'A \\ B esetén a kivont halmaz zárt végpontja nyílttá teszi az eredményt.',
    figure: <IntervalSetIntersectionRulerSvg size={150} />,
    color: 'sky'
  }
];

export const KnowledgeTestQuiz: React.FC<KnowledgeTestQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="I. Fejezeti Témazáró Tudáspróba Kvíz"
      subtitle="Kombinatorika, gráfok, halmazműveletek, szitaformula és intervallumok 90 feladatban (30 kérdés szintenként)"
      badgeText="9. OSZTÁLY • I. KOMBINATORIKA, HALMAZOK • 🏆 FEJEZETI TÉMAZÁRÓ KVÍZ (90 FELADAT)"
      themeColor="red"
      levels={quizLevels}
      topicId="g9-komb-tudasproba-quiz"
      topicTitle="Gyakorlás, tudáspróba"
      grade={9}
      chapterId="kombinatorika-halmazok"
      cheatSheetCards={practiceCheatSheets}
      cheatSheetTitle="Fejezeti Nagylexikon és Képletgyűjtemény"
      emoji="🏆"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Fejezeti Párosító',
          subtitle: 'Párosítsd a típusfeladatokat, képleteket és definíciókat!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-red-600 dark:text-red-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <KnowledgeTestMatcher
              key={`knowledge-test-matcher-${level}`}
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
          title: 'Fejezeti Csoportosító',
          subtitle: 'Kategorizáld a fogalmakat a fejezet fő témakörei szerint!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-red-600 dark:text-red-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <KnowledgeTestSorter
              key={`knowledge-test-sorter-${level}`}
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

export default KnowledgeTestQuiz;
