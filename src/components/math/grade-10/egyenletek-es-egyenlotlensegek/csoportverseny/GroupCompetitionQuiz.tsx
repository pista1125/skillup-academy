import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { GroupCompetitionMatcher } from './GroupCompetitionMatcher';
import { GroupCompetitionSorter } from './GroupCompetitionSorter';
import {
  TeamChallengeRelaySvg,
  ErrorHuntStepAnalysisSvg,
  SpeedVieteDuelSvg,
  SignChartSprintSvg,
  ScoreboardTournamentSvg
} from './GroupCompetitionFigures';

interface GroupCompetitionQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A Csoportverseny 4 Aranyszabálya',
    description:
      'Egy csapatversenyben a siker kulcsa a felelősségmegosztás: 1. Levezető (algebra), 2. Kikötésfelelős (alaphalmaz, hamis gyökök kizárása), 3. Előjelelemző (parabola, táblázat), 4. Időfelelős (visszaszámláló). A hamis gyök bent hagyása súlyos pontlevonással jár!',
    note: 'Aranyszabály: A gyorsaság fontos, de a pontosság dönt!',
    color: 'from-pink-500 to-rose-600',
    figure: <TeamChallengeRelaySvg size={260} />
  },
  {
    title: 'Detektív Hibakeresés Levezetésekben',
    description:
      'Ha egy levezetésben négyzetre emeltek, azonnal gyanakodj hamis gyökre! A négyzetgyök értéke soha nem lehet negatív. Ismeretlennel való leosztás gyökvesztést okoz (az x = 0 gyök eltűnik). Negatívval való szorzáskor/osztáskor az egyenlőtlenség iránya kötelezően megfordul!',
    note: 'Leleplezés: A végén mindig csinálj ellenőrzést az eredeti egyenletbe!',
    color: 'from-rose-500 to-red-600',
    figure: <ErrorHuntStepAnalysisSvg size={260} />
  },
  {
    title: 'Villám Viète és Előjeltáblázat Reflexek',
    description:
      'Normált egyenletnél (x² + px + q = 0) bontsd fel a q szorzatot egész számpárokra, és keresd meg azt, amelynek összege -p! Törtes egyenlőtlenségnél a nevező gyökét nyílt zárójellel (kerek zárójel) kell kizárni a megoldáshalmazból!',
    note: 'Tipp: Ha c = 0, az egyik gyök azonnal 0!',
    color: 'from-purple-600 to-pink-700',
    figure: <SpeedVieteDuelSvg size={260} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Villámfeladványok és azonnali reflexek',
    subtitle: '10 pörgős kérdés: Viète-gyöksejtés, hiányos egyenletek és alapvető kikötések',
    range: '1–10. kérdés',
    focus: 'Gyors fejben számolás, hiányos egyenletek gyökei, nevező és gyök alatti kikötések',
    badgeBg: 'bg-pink-100 dark:bg-pink-950/60',
    badgeBorder: 'border-pink-200 dark:border-pink-800',
    badgeText: 'text-pink-800 dark:text-pink-300',
    accentGradient: 'from-pink-500 to-rose-600',
    questions: [
      {
        id: 'gcq-1-1',
        question: 'Melyek az x² - 7x + 12 = 0 egyenlet valós gyökei?',
        options: ['x₁ = 3 és x₂ = 4', 'x₁ = -3 és x₂ = -4', 'x₁ = 2 és x₂ = 6', 'x₁ = -2 és x₂ = -6'],
        correctAnswer: 0,
        explanation: 'A Viète-formulák szerint a szorzat q = 12, az összeg -p = 7. A 3 és 4 összege 7, szorzata 12.',
        hint: 'Keresd meg a 12 azon két tényezőjét, melyeknek összege 7!'
      },
      {
        id: 'gcq-1-2',
        question: 'Mi a megoldáshalmaza az x² - 16 = 0 hiányos másodfokú egyenletnek?',
        options: ['M = {-4; 4}', 'M = {4}', 'M = {16}', 'M = ∅'],
        correctAnswer: 0,
        explanation: 'x² = 16 esetén két valós gyök van: x = 4 vagy x = -4.',
        hint: 'A pozitív és a negatív szám négyzete is lehet 16!'
      },
      {
        id: 'gcq-1-3',
        question: 'Oldd meg fejben a 2x² - 10x = 0 egyenletet!',
        options: ['M = {0; 5}', 'M = {5}', 'M = {-5; 0}', 'M = {2; 10}'],
        correctAnswer: 0,
        explanation: 'Kiemeléssel: 2x(x - 5) = 0. Egy szorzat akkor 0, ha 2x = 0 (x = 0) vagy x - 5 = 0 (x = 5).',
        hint: 'Ne ossz le x-szel, hanem emelj ki!'
      },
      {
        id: 'gcq-1-4',
        question: 'Mi a kötelező kikötés a √(3x - 6) = x egyenlet bal oldalára a valós számokon?',
        options: ['3x - 6 ≥ 0, azaz x ≥ 2', 'x > 2', 'x ≥ 6', 'Nincs szükség kikötésre'],
        correctAnswer: 0,
        explanation: 'A valós számok halmazán a négyzetgyök alatti kifejezés nem lehet negatív: 3x - 6 ≥ 0 ⇒ 3x ≥ 6 ⇒ x ≥ 2.',
        hint: 'Négyzetgyököt csak nemnegatív számból vonhatunk.'
      },
      {
        id: 'gcq-1-5',
        question: 'Hány valós gyöke van az x² + 6x + 9 = 0 egyenletnek?',
        options: [
          'Pontosan 1 (kétszeres) valós gyöke van: x = -3',
          'Két különböző valós gyöke van: 3 és -3',
          'Nincs valós gyöke',
          'Végtelen sok valós gyöke van'
        ],
        correctAnswer: 0,
        explanation: 'Mivel x² + 6x + 9 = (x + 3)², a diszkrimináns D = 36 - 36 = 0, így egyetlen kétszeres gyök van: x = -3.',
        hint: 'Vedd észre a teljes négyzet azonosságot: (a + b)²!'
      },
      {
        id: 'gcq-1-6',
        question: 'Mi az x² + 25 = 0 egyenlet megoldáshalmaza a valós számok körében?',
        options: ['M = ∅ (nincs valós megoldás)', 'M = {-5; 5}', 'M = {5}', 'M = {-25; 25}'],
        correctAnswer: 0,
        explanation: 'x² = -25. Mivel bármely valós szám négyzete nemnegatív (x² ≥ 0), nincs olyan valós szám, amelynek négyzete -25 lenne.',
        hint: 'Lehet egy valós szám négyzete negatív?'
      },
      {
        id: 'gcq-1-7',
        question: 'Ha egy másodfokú egyenlet két gyökének összege 8, szorzata 15, mi az egyenlet normált alakja?',
        options: ['x² - 8x + 15 = 0', 'x² + 8x + 15 = 0', 'x² - 15x + 8 = 0', 'x² + 8x - 15 = 0'],
        correctAnswer: 0,
        explanation: 'A normált másodfokú egyenlet alakja: x² - (x₁ + x₂)x + (x₁x₂) = 0 ⇒ x² - 8x + 15 = 0.',
        hint: 'Az x együtthatója mindig a gyökök összegének ellentettje (-p)!'
      },
      {
        id: 'gcq-1-8',
        question: 'Miért veszélyes egy versenyben az x² = 6x egyenlet mindkét oldalát leosztani x-szel?',
        options: [
          'Mert gyökvesztés történik: az x = 0 gyök elveszik',
          'Mert hamis gyök keletkezik',
          'Mert megfordul az egyenlet előjele',
          'Semmi baj nincs vele, ez a leggyorsabb módszer'
        ],
        correctAnswer: 0,
        explanation: 'Mivel x felveheti a 0 értéket, az x-szel való osztás nem ekvivalens átalakítás, és az x = 0 gyököt elveszítjük.',
        hint: 'Ismeretlennel osztani tilos, helyette kiemelünk!'
      },
      {
        id: 'gcq-1-9',
        question: 'Oldd meg a -4x > 20 egyenlőtlenséget a valós számok halmazán!',
        options: ['x < -5', 'x > -5', 'x < 5', 'x > 5'],
        correctAnswer: 0,
        explanation: 'Negatív számmal (-4) való osztáskor a relációjel kötelezően megfordul: x < 20 / (-4) ⇒ x < -5.',
        hint: 'Mi történik a relációjellel, ha negatív számmal osztasz?'
      },
      {
        id: 'gcq-1-10',
        question: 'Egy algebrai tört nevezője x - 7. Mi a kötelező kikötés?',
        options: ['x ≠ 7', 'x > 7', 'x ≥ 7', 'x ≠ 0'],
        correctAnswer: 0,
        explanation: 'A nevező soha nem lehet 0: x - 7 ≠ 0 ⇒ x ≠ 7.',
        hint: 'Nullával nem osztunk!'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Detektív kihívás és leleplezés',
    subtitle: '10 hibakereső és stratégiai feladat: hamis gyökök, törtes egyenlőtlenségek és relációjelek',
    range: '11–20. kérdés',
    focus: 'Hamis gyökök felismerése, törtes egyenlőtlenség intervallumai, diszkrimináns vizsgálata',
    badgeBg: 'bg-pink-100 dark:bg-pink-950/60',
    badgeBorder: 'border-pink-200 dark:border-pink-800',
    badgeText: 'text-pink-800 dark:text-pink-300',
    accentGradient: 'from-pink-500 to-rose-600',
    questions: [
      {
        id: 'gcq-2-1',
        question: 'Egy diák levezetése: √(x + 5) = -2 ⇒ x + 5 = 4 ⇒ x = -1. Mi a leleplezésed?',
        options: [
          'A négyzetgyök értéke nem lehet negatív (-2), így x = -1 hamis gyök, M = ∅',
          'A négyzetre emelés hibás volt, 4 helyett -4 kellett volna',
          'Az x + 5 = 4-ből x = 1 jön ki, nem -1',
          'A levezetés teljesen hibátlan'
        ],
        correctAnswer: 0,
        explanation: 'A négyzetgyök nemnegatív értékű: √(x + 5) ≥ 0, így nem lehet egyenlő -2-vel. Az x = -1 behelyettesítve √4 = 2 ≠ -2.',
        hint: 'Nézd meg az eredeti egyenlet jobb oldalát!'
      },
      {
        id: 'gcq-2-2',
        question: 'Mi a megoldáshalmaza az (x - 3)(x + 2) < 0 egyenlőtlenségnek?',
        options: [']-2; 3[ (nyílt intervallum)', '[-2; 3] (zárt intervallum)', 'x < -2 vagy x > 3', 'x < 3'],
        correctAnswer: 0,
        explanation: 'A szorzat gyökei -2 és 3. Felfelé nyíló parabola (a = 1 > 0) a tengely alatt a gyökök között jár: -2 < x < 3, azaz ]-2; 3[.',
        hint: 'A szigorú egyenlőtlenség (<) miatt a határok nem tartoznak a megoldáshoz!'
      },
      {
        id: 'gcq-2-3',
        question: 'Oldd meg: (x² - 9) / (x - 3) = 0!',
        options: ['M = {-3} (csak a -3)', 'M = {-3; 3}', 'M = {3}', 'M = ∅'],
        correctAnswer: 0,
        explanation: 'Kikötés: x - 3 ≠ 0 ⇒ x ≠ 3. A számláló x² - 9 = 0 esetén x = 3 vagy x = -3, de a 3 ki van zárva a nevező miatt, így csak x = -3 a megoldás.',
        hint: 'Ellenőrizd a kikötést a nevezőre!'
      },
      {
        id: 'gcq-2-4',
        question: 'A √(x + 2) = x egyenlet négyzetre emelésével az x² - x - 2 = 0 egyenletet kapjuk (gyökök: 2 és -1). Melyik a valódi megoldáshalmaz?',
        options: ['M = {2} (a -1 hamis gyök)', 'M = {-1; 2}', 'M = {-1}', 'M = ∅'],
        correctAnswer: 0,
        explanation: 'Próba x = -1 esetén: √(-1 + 2) = √1 = 1, míg a jobb oldal -1. 1 ≠ -1, tehát x = -1 hamis gyök! Próba x = 2-re: √(2+2) = 2, ami helyes.',
        hint: 'Helyettesítsd vissza mindkét értéket az eredeti egyenletbe!'
      },
      {
        id: 'gcq-2-5',
        question: 'Mi a megoldása az (x + 4) / (x - 1) ≤ 0 egyenlőtlenségnek?',
        options: ['[-4; 1[ (a -4 zárt, az 1 nyílt)', '[-4; 1]', ']-4; 1[', 'x ≤ -4 vagy x > 1'],
        correctAnswer: 0,
        explanation: 'A számláló zérushelye x = -4, a nevezőé x = 1 (kikötés: x ≠ 1). A tört előjele a határok között negatív, a -4 megengedett (0 lehet), de az 1 nem!',
        hint: 'A nevezőben álló gyök SOHA nem lehet zárt határoló pont!'
      },
      {
        id: 'gcq-2-6',
        question: 'Miért nincs valós gyöke az x² - 4x + 5 = 0 egyenletnek?',
        options: [
          'Mert a diszkrimináns negatív: D = 16 - 20 = -4 < 0',
          'Mert a konstans tag pozitív',
          'Mert b páros szám',
          'Mert x₁ + x₂ = 4 nem lehetséges'
        ],
        correctAnswer: 0,
        explanation: 'A diszkrimináns D = b² - 4ac = (-4)² - 4·1·5 = 16 - 20 = -4. Mivel D < 0, a valós számok körében nincs megoldás.',
        hint: 'Számold ki a diszkriminánst: b² - 4ac!'
      },
      {
        id: 'gcq-2-7',
        question: 'Egy diák a 2x² = 8x egyenletet leosztotta 2x-szel, és x = 4-et adott be. Milyen hibát követett el?',
        options: [
          'Gyökvesztést követett el: az x = 0 gyököt elhagyta',
          'Hamis gyököt vitt be a rendszerbe',
          'Rosszul számolta ki a 8 / 2-t',
          'Nem írt fel diszkriminánst'
        ],
        correctAnswer: 0,
        explanation: 'A helyes megoldás: 2x² - 8x = 0 ⇒ 2x(x - 4) = 0 ⇒ x₁ = 0, x₂ = 4. Az ismeretlennel leosztás eltüntette a 0-t.',
        hint: 'Mi történt az x = 0 lehetőséggel?'
      },
      {
        id: 'gcq-2-8',
        question: 'Melyek az |x - 5| = 3 egyenlet pontos megoldásai?',
        options: ['x₁ = 2 és x₂ = 8', 'x₁ = -2 és x₂ = 8', 'Csak x = 8', 'x₁ = -8 és x₂ = 8'],
        correctAnswer: 0,
        explanation: 'x - 5 = 3 ⇒ x = 8, vagy x - 5 = -3 ⇒ x = 2. Mindkét szám távolsága az 5-től pontosan 3.',
        hint: 'Gondolj a számegyenesen az 5-től való távolságra!'
      },
      {
        id: 'gcq-2-9',
        question: 'Mi a megoldáshalmaza az (x - 2)² ≤ 0 egyenlőtlenségnek a valós számokon?',
        options: ['M = {2} (egyetlen pont)', 'M = ∅', 'M = ℝ', 'x ≤ 2'],
        correctAnswer: 0,
        explanation: 'Bármely valós szám négyzete nemnegatív: (x - 2)² ≥ 0. Ezért a kifejezés sosem lehet szigorúan negatív (< 0), de = 0 lehet, ha x = 2.',
        hint: 'Lehet egy teljes négyzet negatív? És mikor 0?'
      },
      {
        id: 'gcq-2-10',
        question: 'Miért hibás a következő lépés: (x + 1)/(x - 3) > 1  ⇒  x + 1 > x - 3?',
        options: [
          'Mert ismeretlennel szoroztunk át, aminek nem ismerjük az előjelét (ha x - 3 < 0, a jel megfordulna)',
          'Mert a számlálót elfelejtettük négyzetre emelni',
          'Mert a jobb oldalt le kellett volna vonni nullára rendezés nélkül',
          'A lépés teljesen helyes volt'
        ],
        correctAnswer: 0,
        explanation: 'Egyenlőtlenségnél ismeretlent tartalmazó nevezővel tilos átbeszorozni az előjel ismerete nélkül. Helyette 0-ra kell rendezni: (x+1)/(x-3) - 1 > 0.',
        hint: 'Mi történik a relációjellel, ha az (x - 3) negatív szám?'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Bajnokok ligája és összetett stratégia',
    subtitle: '10 komplex versenyfeladat: paraméterek, szimmetrikus kifejezések és halmazok szintézise',
    range: '21–30. kérdés',
    focus: 'Paraméteres diszkrimináns, Viète azonosságok, összetett egyenletrendszerek és kikötések',
    badgeBg: 'bg-pink-100 dark:bg-pink-950/60',
    badgeBorder: 'border-pink-200 dark:border-pink-800',
    badgeText: 'text-pink-800 dark:text-pink-300',
    accentGradient: 'from-pink-500 to-rose-600',
    questions: [
      {
        id: 'gcq-3-1',
        question: 'Milyen k valós paraméter esetén van az x² - 8x + k = 0 egyenletnek pontosan 1 valós gyöke?',
        options: ['k = 16', 'k = 64', 'k = 8', 'k = -16'],
        correctAnswer: 0,
        explanation: 'Pontosan 1 valós gyök akkor van, ha D = b² - 4ac = 0. (-8)² - 4·1·k = 64 - 4k = 0 ⇒ 4k = 64 ⇒ k = 16.',
        hint: 'Állítsd a diszkriminánst egyenlővé nullával!'
      },
      {
        id: 'gcq-3-2',
        question: 'Ha x₁ és x₂ az x² - 5x + 3 = 0 egyenlet valós gyökei, mennyi x₁² + x₂² pontos értéke?',
        options: ['19', '25', '22', '31'],
        correctAnswer: 0,
        explanation: 'Viète szerint x₁ + x₂ = 5 és x₁x₂ = 3. A négyzetösszeg: x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂ = 5² - 2·3 = 25 - 6 = 19.',
        hint: 'Használd az (x₁ + x₂)² - 2x₁x₂ azonosságot!'
      },
      {
        id: 'gcq-3-3',
        question: 'Ha x₁ és x₂ a 2x² + 6x - 1 = 0 egyenlet gyökei, mennyi 1/x₁ + 1/x₂ értéke?',
        options: ['6', '-6', '3', '-3'],
        correctAnswer: 0,
        explanation: '1/x₁ + 1/x₂ = (x₁ + x₂) / (x₁x₂). Mivel x₁ + x₂ = -6/2 = -3, és x₁x₂ = -1/2, a hányados: (-3) / (-1/2) = 6. (Vagy egyszerűen -b/c = -6/(-1) = 6).',
        hint: 'Közös nevezőre hozás után: (x₁ + x₂) / (x₁x₂).'
      },
      {
        id: 'gcq-3-4',
        question: 'Oldd meg a |2x - 6| ≤ 4 egyenlőtlenséget a valós számokon!',
        options: ['[1; 5]', ']-∞; 1] ∪ [5; ∞[', '[2; 5]', ']1; 5['],
        correctAnswer: 0,
        explanation: '-4 ≤ 2x - 6 ≤ 4 ⇒ 6 hozzáadásával: 2 ≤ 2x ≤ 10 ⇒ 2-vel osztva: 1 ≤ x ≤ 5, azaz [1; 5].',
        hint: 'Bontsd fel kétoldali egyenlőtlenségre: -4 ≤ 2x - 6 ≤ 4!'
      },
      {
        id: 'gcq-3-5',
        question: 'A √(2x + 7) = x + 2 egyenlet megoldása során x² + 2x - 3 = 0 adódik (gyökök: 1 és -3). Mi a helyes megoldáshalmaz?',
        options: ['M = {1} (a -3 hamis gyök)', 'M = {-3; 1}', 'M = {-3}', 'M = ∅'],
        correctAnswer: 0,
        explanation: 'Próba x = -3 esetén: √(2(-3)+7) = √1 = 1, míg a jobb oldal -3 + 2 = -1. 1 ≠ -1, tehát x = -3 hamis! Próba x = 1-re: √(2+7) = 3 és 1+2 = 3 (stimmel).',
        hint: 'Végezz próbát az eredeti egyenletben mindkét gyökkel!'
      },
      {
        id: 'gcq-3-6',
        question: 'Milyen m paraméterértékek esetén nincs valós gyöke az x² + 4x + m = 0 egyenletnek?',
        options: ['m > 4', 'm < 4', 'm ≥ 4', 'm = 4'],
        correctAnswer: 0,
        explanation: 'Nincs valós gyök, ha D < 0. D = 16 - 4m < 0 ⇒ 16 < 4m ⇒ m > 4.',
        hint: 'A diszkrimináns legyen szigorúan negatív!'
      },
      {
        id: 'gcq-3-7',
        question: 'Mi a megoldáshalmaza az (x² - 16)(x - 2) ≥ 0 egyenlőtlenségnek?',
        options: ['[-4; 2] ∪ [4; ∞[', '[-4; 4]', '] -∞; -4] ∪ [2; 4]', '[2; 4]'],
        correctAnswer: 0,
        explanation: 'A tényezők gyökei sorrendben: -4, 2, 4. Előjeltáblázat alapján a szorzat pozitív vagy 0 a [-4; 2] szakaszon és 4-től jobbra: [-4; 2] ∪ [4; ∞[.',
        hint: 'Ábrázold a gyököket (-4, 2, 4) és vizsgáld a szorzat előjelét intervallumonként!'
      },
      {
        id: 'gcq-3-8',
        question: 'Oldd meg: √(x - 1) · (x - 5) = 0!',
        options: ['M = {1; 5}', 'M = {5}', 'M = {1}', 'M = ∅'],
        correctAnswer: 0,
        explanation: 'Kikötés a gyök miatt: x - 1 ≥ 0 ⇒ x ≥ 1. A szorzat 0, ha √(x-1) = 0 (x = 1) vagy x - 5 = 0 (x = 5). Mivel mindkét szám ≥ 1, M = {1; 5}.',
        hint: 'Mindkét tényező lehet 0, de ellenőrizd a gyök alatti kikötést!'
      },
      {
        id: 'gcq-3-9',
        question: 'Oldd meg: (x² - 5x + 6) / √(x - 1) = 0!',
        options: ['M = {2; 3}', 'M = {1; 2; 3}', 'M = {3}', 'M = ∅'],
        correctAnswer: 0,
        explanation: 'Kikötés a nevezőben lévő gyök miatt: x - 1 > 0 ⇒ x > 1 (0 nem lehet a nevező). A számláló gyökei x = 2 és x = 3. Mivel mindkettő > 1, M = {2; 3}.',
        hint: 'A nevezőben álló négyzetgyök szigorúan pozitív kell legyen (nem lehet 0)!'
      },
      {
        id: 'gcq-3-10',
        question: 'Keressétek meg az összes olyan valós x számot, amelyre: √(x - 3) + √(3 - x) = 0!',
        options: ['Csak x = 3', 'Minden x ≥ 3', 'Nincs ilyen x szám (M = ∅)', 'x = 0'],
        correctAnswer: 0,
        explanation: 'Kikötések: x - 3 ≥ 0 (x ≥ 3) és 3 - x ≥ 0 (x ≤ 3). Az egyetlen valós szám, amely mindkét feltételnek eleget tesz: x = 3. Ekkor √0 + √0 = 0.',
        hint: 'Nézd meg a két gyök alatti kifejezés értelmezési tartományának metszetét!'
      }
    ]
  }
};

export const GroupCompetitionQuiz: React.FC<GroupCompetitionQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-eq-csoportverseny-quiz"
      topicTitle="8. Csoportverseny"
      badge="10. OSZTÁLY • VIII. EGYENLETEK ÉS EGYENLŐTLENSÉGEK • KVÍZ"
      themeColor="pink"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <GroupCompetitionMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <GroupCompetitionSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

