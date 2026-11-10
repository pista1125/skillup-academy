import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { GroupCompetitionMatcher } from './GroupCompetitionMatcher';
import { GroupCompetitionSorter } from './GroupCompetitionSorter';
import {
  TournamentBracketSvg,
  DetectiveErrorHuntSvg,
  SpeedDiscriminantGaugeSvg,
  TeamRelayStrategySvg
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
    title: 'A 4 fordulós bajnokság',
    description: '1. Forduló: Villámkvíz (10 p) ⟶ 2. Forduló: Detektív Hibakeresés (20 p) ⟶ 3. Forduló: Stratégia (30 p) ⟶ 4. Forduló: Döntő Szöveges Váltó (50 p).',
    note: 'A gyors és hibátlan megoldásokért +5 gyorsasági bónuszpont jár a futamokban!',
    color: 'from-pink-500 to-rose-600',
    figure: <TournamentBracketSvg size={220} />
  },
  {
    title: 'Detektív hibavadászat',
    description: '1. (-b)² = +b² mindig! 2. Ha a ≠ 1, a nevező 2·a, nem 2! 3. Ismeretlennel soha ne oszd le az egyenletet! 4. A hamis gyököket azonnal vesd el!',
    note: 'A vizsgahibák 90%-a előjel- vagy zárójelezési figyelmetlenségből adódik.',
    color: 'from-amber-500 to-orange-600',
    figure: <DetectiveErrorHuntSvg size={220} />
  },
  {
    title: 'Villám diszkrimináns trükkök',
    description: 'Ha a és c különböző előjelű (ac < 0), akkor D > 0 BIZTOSAN ⟹ Azonnal 2 valós gyök van! Ha teljes négyzet (x ± d)², akkor D = 0 ⟹ 1 kettős gyök.',
    note: 'D = b² - 4ac. Ha D < 0, a valós számok körében nincs megoldás (M = ∅).',
    color: 'from-rose-500 to-pink-600',
    figure: <SpeedDiscriminantGaugeSvg size={220} />
  },
  {
    title: 'Csapatváltó szereposztás',
    description: '1. Elemző (0-ra rendezés, kikötések) ⟶ 2. Számoló (Diszkrimináns és √D) ⟶ 3. Megoldó (Gyökök számítása) ⟶ 4. Ellenőr (Viète & Szöveges válasz).',
    note: 'Minden tag a saját szakaszáért felel, így nincs felesleges párhuzamos munka!',
    color: 'from-purple-500 to-violet-600',
    figure: <TeamRelayStrategySvg size={220} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Villám diszkrimináns és gyökök száma fejben',
    subtitle: 'Gyors fejszámolási trükkök és a valós gyökök számának azonnali megállapítása.',
    range: '1–10. feladat',
    focus: 'Gyors diszkrimináns elemzés papír nélkül',
    questions: [
      {
        id: 'gcq1-1',
        question: 'Hány valós gyöke van az 5x² + 7x - 3 = 0 egyenletnek anélkül, hogy kiszámolnánk a pontos D értéket?',
        options: [
          'Biztosan 2 valós gyöke van, mert a és c különböző előjelű (ac < 0)',
          '1 valós gyöke van',
          '0 valós gyöke van',
          'Nem lehet megállapítani számolás nélkül'
        ],
        correctAnswer: 0,
        explanation: 'Ha a = 5 és c = -3, akkor ac = -15 < 0. Ekkor -4ac = +60 > 0, így D = b² - 4ac = 49 + 60 > 0 mindig, tehát pontosan 2 valós gyök van.'
      },
      {
        id: 'gcq1-2',
        question: 'Mennyi az x² - 6x + 9 = 0 egyenlet diszkriminánsa és hány valós gyöke van?',
        options: [
          'D = 0, és 1 valós (kettős) gyöke van: x = 3',
          'D = 72, és 2 valós gyöke van',
          'D = -36, és 0 valós gyöke van',
          'D = 9, és 2 valós gyöke van'
        ],
        correctAnswer: 0,
        explanation: 'D = (-6)² - 4 · 1 · 9 = 36 - 36 = 0. Mivel D = 0, az egyenlet (x - 3)² = 0 alakú, 1 valós kettős gyökkel.'
      },
      {
        id: 'gcq1-3',
        question: 'Hány valós gyöke van az x² + 49 = 0 egyenletnek?',
        options: [
          '0 valós gyöke van (nincs valós megoldás, ∅)',
          '2 valós gyöke van (±7)',
          '1 valós gyöke van (7)',
          '4 valós gyöke van'
        ],
        correctAnswer: 0,
        explanation: 'x² = -49. Mivel bármely valós szám négyzete nemnegatív (x² ≥ 0), egyetlen valós szám négyzete sem lehet negatív (-49).'
      },
      {
        id: 'gcq1-4',
        question: 'Mennyi a 2x² - 5x + 2 = 0 egyenlet diszkriminánsa?',
        options: [
          'D = 9  (√D = 3)',
          'D = 41',
          'D = 1',
          'D = -9'
        ],
        correctAnswer: 0,
        explanation: 'D = (-5)² - 4 · 2 · 2 = 25 - 16 = 9 > 0.'
      },
      {
        id: 'gcq1-5',
        question: 'Melyik egyenletnek van pontosan 1 valós kettős gyöke az alábbiak közül?',
        options: [
          '4x² - 12x + 9 = 0',
          'x² - 5x + 6 = 0',
          'x² + 4 = 0',
          '2x² + 3x - 5 = 0'
        ],
        correctAnswer: 0,
        explanation: '4x² - 12x + 9 = (2x - 3)². D = 144 - 4 · 4 · 9 = 144 - 144 = 0. Gyöke: x = 3/2.'
      },
      {
        id: 'gcq1-6',
        question: 'Mennyi a gyökök összege (x₁ + x₂) a 3x² - 9x + 2 = 0 egyenletnél a Viète-formula szerint?',
        options: [
          '3',
          '-3',
          '9',
          '2/3'
        ],
        correctAnswer: 0,
        explanation: 'Viète-formula: x₁ + x₂ = -b / a = -(-9) / 3 = 9 / 3 = 3.'
      },
      {
        id: 'gcq1-7',
        question: 'Mennyi a gyökök szorzata (x₁ · x₂) a fenti 3x² - 9x + 2 = 0 egyenletnél?',
        options: [
          '2/3',
          '-2/3',
          '2',
          '3/2'
        ],
        correctAnswer: 0,
        explanation: 'Viète-formula: x₁ · x₂ = c / a = 2 / 3.'
      },
      {
        id: 'gcq1-8',
        question: 'Hány valós gyöke van a -x² + 2x - 5 = 0 egyenletnek?',
        options: [
          '0 valós gyöke van (D = -16 < 0)',
          '2 valós gyöke van',
          '1 valós gyöke van',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        explanation: 'D = 2² - 4 · (-1) · (-5) = 4 - 20 = -16 < 0. Mivel D negatív, nincs valós gyök.'
      },
      {
        id: 'gcq1-9',
        question: 'Egy másodfokú egyenlet főegyütthatója pozitív (a > 0). Milyen feltétel esetén érinti a parabola az x-tengelyt?',
        options: [
          'Ha D = 0',
          'Ha D > 0',
          'Ha D < 0',
          'Ha c = 0'
        ],
        correctAnswer: 0,
        explanation: 'A parabola pontosan akkor érinti az x-tengelyt egyetlen közös pontban, ha a diszkrimináns D = 0.'
      },
      {
        id: 'gcq1-10',
        question: 'Mennyi az x² - 100 = 0 hiányos egyenlet két valós gyöke fejben?',
        options: [
          'x₁ = 10 és x₂ = -10',
          'Csak x = 10',
          'Csak x = 50',
          'Nincs valós megoldása'
        ],
        correctAnswer: 0,
        explanation: 'x² = 100 ⟹ x = ±√100 = ±10. Mindkét előjel megoldás!'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Detektív hibavadászat – Hol a hiba a levezetésben?',
    subtitle: 'Ismerd fel a vizsgadolgozatokból vett klasszikus hibákat és javítsd őket azonnal!',
    range: '11–20. feladat',
    focus: 'Típushibák detektálása és elhárítása',
    questions: [
      {
        id: 'gcq2-1',
        question: 'Egy diák ezt írta: „Ha b = -6, akkor a diszkriminánsban b² = -36.” Mi a hiba?',
        options: [
          'Zárójelhiba: negatív szám négyzete mindig pozitív: (-6)² = +36',
          'Nincs hiba, -6 négyzete valóban -36',
          'A b értékét meg kell szorozni 2-vel',
          'A diszkriminánsban nem b² szerepel'
        ],
        correctAnswer: 0,
        explanation: 'Minden valós szám négyzete nemnegatív: (-6) · (-6) = +36. Zárójel nélkül a mínusz előjel a hatványozás után érvényesülne.'
      },
      {
        id: 'gcq2-2',
        question: 'Péter így oldotta meg a 3x² - 12x = 0 egyenletet: „Leosztok x-szel: 3x - 12 = 0 ⟹ x = 4.” Miért veszített pontot?',
        options: [
          'Mert x-szel való leosztáskor elveszítette az x = 0 gyököt',
          'Mert 12 / 3 nem 4',
          'Mert a negatív gyököt kellett volna megadnia',
          'Mert a megoldóképletet kötelező leírni'
        ],
        correctAnswer: 0,
        explanation: 'Ismeretlennel soha nem szabad osztani, ha az ismeretlen 0 lehet! Helyesen: 3x(x - 4) = 0 ⟹ x₁ = 0 és x₂ = 4.'
      },
      {
        id: 'gcq2-3',
        question: 'A 2x² - 6x + 1 = 0 egyenlet megoldásakor a diák a nevezőbe 2-t írt. Mi a helyes nevező?',
        options: [
          '4  (mert 2 · a = 2 · 2 = 4)',
          '2',
          '1',
          '6'
        ],
        correctAnswer: 0,
        explanation: 'A megoldóképlet nevezője 2 · a! Mivel a = 2, a nevező értéke 2 · 2 = 4.'
      },
      {
        id: 'gcq2-4',
        question: 'Egy törtes egyenlet megoldása során a diák x₁ = 3 és x₂ = -1 gyököket kapott. A kiinduló egyenletben szerepelt a 4/(x - 3) tag. Mi a helyes megoldáshalmaz?',
        options: [
          'M = {-1}  (az x = 3 hamis gyök a nevező miatt)',
          'M = {-1; 3}',
          'M = {3}',
          'M = ∅'
        ],
        correctAnswer: 0,
        explanation: 'Az x = 3 esetén a nevező (x - 3) nulla lenne, amivel nem lehet osztani. Ezért x = 3 hamis gyök, egyetlen megoldás: x = -1.'
      },
      {
        id: 'gcq2-5',
        question: 'A √(x + 3) = -2 egyenletet egy csapat azonnal négyzetre emelte: x + 3 = 4 ⟹ x = 1. Miért hibás a következtetés?',
        options: [
          'Mert négyzetgyök értéke a valós számok körében soha nem lehet negatív (-2)',
          'Mert 4 - 3 = 2',
          'Mert a bal oldalt kétszer kellett volna négyzetre emelni',
          'Mert x = -1 jött volna ki'
        ],
        correctAnswer: 0,
        explanation: 'Négyzetgyök definíció szerint nemnegatív (√(A) ≥ 0). √(x + 3) = -2-nek nincs valós megoldása (M = ∅).'
      },
      {
        id: 'gcq2-6',
        question: 'Egy szöveges mozgásos feladatban a másodfokú egyenlet két gyöke v₁ = 60 km/h és v₂ = -80 km/h. Mi a helyes válasz a jármű sebességére?',
        options: [
          'A jármű sebessége 60 km/h, a negatív gyököt mint fizikai képtelenséget elvetjük',
          'A jármű sebessége -80 km/h',
          'A jármű két sebességgel is mehet: 60 és 80 km/h',
          'Nincs megoldás'
        ],
        correctAnswer: 0,
        explanation: 'A fizikai sebesség skaláris nagysága szigorúan pozitív valós szám (v > 0).'
      },
      {
        id: 'gcq2-7',
        question: 'Egy diák a 4x² = 36 egyenletet így oldotta meg: x² = 9 ⟹ x = 3. Mi a hiányosság?',
        options: [
          'Elfelejtette a negatív gyököt: x = -3 is megoldás (x = ±3)',
          '36 / 4 nem 9',
          'Négyzetre kellett volna emelni a 9-et',
          'Nincs hiányosság'
        ],
        correctAnswer: 0,
        explanation: 'Tiszta másodfokú egyenletnél gyökvonáskor mindkét előjel megoldás: x₁,₂ = ±√9 = ±3.'
      },
      {
        id: 'gcq2-8',
        question: 'Egyenlet: x² - 4x - 5 = 0. A megoldóképlet elején a diák ezt írta: x₁,₂ = (-4 ± √...) / 2. Mi a hiba?',
        options: [
          'Előjelhiba: ha b = -4, akkor a képletben -b = -(-4) = +4 kell szerepeljen',
          'A nevező nem 2',
          'A gyökjel alatt 0 szerepel',
          'Nincs hiba'
        ],
        correctAnswer: 0,
        explanation: 'A megoldóképlet -b-vel kezdődik. Mivel b = -4, annak ellentettje: -(-4) = +4.'
      },
      {
        id: 'gcq2-9',
        question: 'Egy tanuló a (2x - 1)(x + 3) = 5 egyenletet úgy próbálta megoldani, hogy 2x - 1 = 5 vagy x + 3 = 5. Miért durva hiba ez?',
        options: [
          'Mert a nullosztómentesség szabálya csak akkor érvényes, ha a jobb oldal NULLA (szorzat = 0)!',
          'Mert nem vonta ki az 5-öt',
          'Mert a bal oldalt el kellett volna osztani 2-vel',
          'Mert x negatív lesz'
        ],
        correctAnswer: 0,
        explanation: 'Csak 0-ra rendezett szorzatnál igaz, hogy ha A · B = 0, akkor A = 0 vagy B = 0. Ha a szorzat 5, a tényezők végtelen sokféle számok lehetnek (pl. 1·5, 2·2,5, stb.). Előbb be kell szorozni és 0-ra rendezni!'
      },
      {
        id: 'gcq2-10',
        question: 'Egy diák a sebességfeladatban ezt írta: 180/v - 180/(v + 15) = 20 (mert 20 perc volt a nyereség). Miért kapott rossz eredményt?',
        options: [
          'Mert a 20 percet nem váltotta át órára: 20 perc = 20/60 = 1/3 óra',
          'Mert 180 helyett 360-at kellett volna írni',
          'Mert v + 15 helyett v - 15 a gyorsabb',
          'Mert a jobb oldalra 0-t kellett volna írni'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a sebesség km/h dimenziójú, a menetidőnek órában kell szerepelnie: 20 perc = 1/3 óra.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett csapatfeladványok és stratégiai döntések',
    subtitle: 'Visszavezetések, csapatváltók és gyors döntések a bajnoki címért.',
    range: '21–30. feladat',
    focus: 'Összetett versenyszituációk és kombinált feladványok',
    questions: [
      {
        id: 'gcq3-1',
        question: 'Az x⁴ - 29x² + 100 = 0 egyenlet u = x² helyettesítés után au² + bu + c = 0 alakú. Mennyi a 4 valós gyök növekvő sorrendben?',
        options: [
          '-5; -2; 2; 5',
          '-4; -25; 25; 4',
          '2; 5',
          '-10; -2; 2; 10'
        ],
        correctAnswer: 0,
        explanation: 'u² - 29u + 100 = 0 ⟹ (u - 25)(u - 4) = 0 ⟹ u₁ = 25 ⟹ x = ±5; u₂ = 4 ⟹ x = ±2. A gyökök: -5; -2; 2; 5.'
      },
      {
        id: 'gcq3-2',
        question: 'Ha egy csoportversenyben az a feladat, hogy állapítsd meg x³ - 16x = 0 összes gyökét 10 másodperc alatt, mi a leggyorsabb módszer?',
        options: [
          'Kiemelés: x(x² - 16) = 0 ⟹ x₁ = 0 és x₂,₃ = ±4',
          'Megoldóképlet alkalmazása harmadfokra',
          'Próbálgatás 1-től 10-ig',
          'Osztás x-szel'
        ],
        correctAnswer: 0,
        explanation: 'x kiemelése után azonnal adódik a nullagyök (x = 0) és a tiszta másodfokú tényezőből x = ±4.'
      },
      {
        id: 'gcq3-3',
        question: 'Két cső együtt 4 óra alatt tölti fel a tartályt. Csak az egyik cső 6 órával tovább dolgozna egyedül, mint a másik. Melyik másodfokú egyenletet oldja meg a csapat?',
        options: [
          't² - 2t - 24 = 0',
          't² + 2t - 24 = 0',
          't² - 6t - 24 = 0',
          't² - 4t - 6 = 0'
        ],
        correctAnswer: 0,
        explanation: '1/t + 1/(t + 6) = 1/4 ⟹ 4(t + 6) + 4t = t(t + 6) ⟹ 8t + 24 = t² + 6t ⟹ t² - 2t - 24 = 0.'
      },
      {
        id: 'gcq3-4',
        question: 'Mennyi a gyorsabb cső ideje a t² - 2t - 24 = 0 egyenletből?',
        options: [
          '6 óra (a t = -4 gyök elvetve)',
          '4 óra',
          '8 óra',
          '12 óra'
        ],
        correctAnswer: 0,
        explanation: '(t - 6)(t + 4) = 0 ⟹ t = 6 óra. A másik cső: 6 + 6 = 12 óra.'
      },
      {
        id: 'gcq3-5',
        question: 'Egy színházi előadás bevétele B(x) = (2000 + x)(600 - 0,1x). Milyen x áremelés esetén lesz a bevétel maximális a csapat szerint?',
        options: [
          'x = 2000 Ft áremelés mellett (4000 Ft jegyár)',
          'x = 1000 Ft áremelés mellett',
          'x = 500 Ft áremelés mellett',
          'x = 3000 Ft áremelés mellett'
        ],
        correctAnswer: 0,
        explanation: 'B(x) = -0,1x² + 400x + 1 200 000. Csúcspont: x_opt = -400 / (2 · (-0,1)) = 400 / 0,2 = 2000 Ft emelés.'
      },
      {
        id: 'gcq3-6',
        question: 'Egy termék ára 2 egymást követő évben azonos p%-kal nőtt. 80 000 Ft-ról 115 200 Ft-ra drágult. Mennyi volt p?',
        options: [
          '20%',
          '22%',
          '18%',
          '44%'
        ],
        correctAnswer: 0,
        explanation: 'q² = 115 200 / 80 000 = 1,44 ⟹ q = √1,44 = 1,20 ⟹ p = 20%.'
      },
      {
        id: 'gcq3-7',
        question: 'Mi a legfontosabb teendő a Csapatváltó 4. tagjának (Ellenőr) a lap beadása előtt?',
        options: [
          'Ellenőrizni, hogy a kizárt hamis gyököket kihúzták-e, és a feladat szöveges kérdésére adtak-e választ mértékegységgel',
          'Újraszámolni a diszkriminánst a nulláról',
          'Megváltoztatni a betűjeleket',
          'Átírni az eredményt törtről tizedestörtre'
        ],
        correctAnswer: 0,
        explanation: 'Az Ellenőr feladata a minőségbiztosítás: kizárni a hamis gyököket és a kérdésre válaszolni pontos mértékegységgel.'
      },
      {
        id: 'gcq3-8',
        question: 'Egy derékszögű háromszög befogói x és x + 7, átfogója 13 cm. Mennyi x a csapat gyors Pitagorasz-levezetése után?',
        options: [
          'x = 5 cm (a háromszög oldalai: 5, 12, 13 cm)',
          'x = 6 cm',
          'x = 4 cm',
          'x = 7 cm'
        ],
        correctAnswer: 0,
        explanation: 'x² + (x + 7)² = 169 ⟹ 2x² + 14x + 49 = 169 ⟹ 2x² + 14x - 120 = 0 ⟹ x² + 7x - 60 = 0 ⟹ (x - 5)(x + 12) = 0 ⟹ x = 5 cm.'
      },
      {
        id: 'gcq3-9',
        question: 'Milyen előnnyel jár a Viète-formulák ismerete a csoportversenyen?',
        options: [
          'Másodpercek alatt ellenőrizhető a számolt gyökök helyessége (x₁ + x₂ = -b/a és x₁ · x₂ = c/a), így nem kell hosszú behelyettesítést végezni',
          'Nem kell diszkriminánst számolni',
          'Minden gyököt automatikusan pozitívvá tesz',
          'Kiküszöböli a törtes nevezőket'
        ],
        correctAnswer: 0,
        explanation: 'A Viète-formulák azonnali villámellenőrzést tesznek lehetővé fejszámolással, azonnal kiszűrve a számolási elírásokat.'
      },
      {
        id: 'gcq3-10',
        question: 'Mitől lesz egy csapat igazán sikeres a matematikai csoportversenyen?',
        options: [
          'A tiszta szereposztástól, a feladatok párhuzamos és logikus felosztásától, valamint a fegyelmezett önellenőrzéstől',
          'Ha a leggyorsabb tag egyedül próbál meg mindent megoldani',
          'Ha mindenki ugyanazt a részszámítást végzi el',
          'Ha nem ellenőrzik a hamis gyököket a gyorsaság érdekében'
        ],
        correctAnswer: 0,
        explanation: 'A kooperáció lényege a specializáció (Elemző, Számoló, Megoldó, Ellenőr) és a fegyelmezett csapatmunka.'
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
      topicId="g10-masodfoku-egyenletek"
      topicTitle="Csoportverseny"
      subtitle="Villámkérdések, detektív hibakeresés, csapatváltó és stratégiai feladványok kvíze"
      badge="39. LECKE • KVÍZ"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={GroupCompetitionMatcher}
      sorterComponent={GroupCompetitionSorter}
    />
  );
};

