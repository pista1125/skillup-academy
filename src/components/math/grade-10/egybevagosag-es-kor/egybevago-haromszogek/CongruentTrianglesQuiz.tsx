import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { CongruentTrianglesMatcher } from './CongruentTrianglesMatcher';
import { CongruentTrianglesSorter } from './CongruentTrianglesSorter';
import {
  IsoscelesTriangleSymmetrySvg,
  PerpendicularBisectorProofSvg,
  ParallelogramDiagonalsSvg,
  IsoscelesMiniSvg,
  PerpendicularBisectorMiniSvg,
  ParallelogramMiniSvg,
  KiteMiniSvg
} from './CongruentTrianglesFigures';

interface CongruentTrianglesQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Egyenlő szárú háromszög',
    description: 'Az alaphoz tartozó magasság szimmetriatengely: felezi az alapot (súlyvonal) és a csúcsszöget (szögfelező). Az alapi szögek egyenlők.',
    note: 'Két egybevágó derékszögű háromszögre bomlik az alap magasságával.',
    color: 'from-teal-500 to-emerald-600',
    figure: <IsoscelesTriangleSymmetrySvg size={220} />
  },
  {
    title: 'Szakaszfelező merőleges',
    description: 'Azon pontok mértani helye a síkban, amelyek egyenlő távol vannak a szakasz két végpontjától (PA = PB).',
    note: 'A háromszög három oldalfelező merőlegese a körülírt kör középpontjában metszi egymást.',
    color: 'from-indigo-500 to-blue-600',
    figure: <PerpendicularBisectorProofSvg size={220} />
  },
  {
    title: 'Paralelogramma átlói',
    description: 'A paralelogramma átlói felezik egymást, a szemközti oldalai és szögei egyenlők (bizonyítás a szemközti háromszögek egybevágóságával).',
    note: 'Rombusz esetén az átlók merőlegesek is egymásra és felezik a belső szögeket.',
    color: 'from-purple-500 to-pink-600',
    figure: <ParallelogramDiagonalsSvg size={220} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alaptulajdonságok és szimmetriák',
    subtitle: 'Egyenlő szárú háromszögek, felezők és alaptételek felismerése.',
    range: '1–10. feladat',
    focus: 'Egyenlő szárú háromszög, oldalfelező, szögfelező alaptulajdonságok',
    questions: [
      {
        id: 'ctq1-1',
        question: 'Egy egyenlő szárú háromszög szárszöge 50°. Mekkorák az alapon fekvő szögei?',
        figure: <IsoscelesTriangleSymmetrySvg size={200} />,
        options: ['65° és 65°', '50° és 80°', '60° és 60°', '45° és 85°'],
        correctAnswer: 0,
        explanation: 'A belső szögek összege 180°. A két alapi szög egyenlő: 2α + 50° = 180° ⟹ 2α = 130° ⟹ α = 65°.'
      },
      {
        id: 'ctq1-2',
        question: 'Mi a szakaszfelező merőleges definíciója?',
        figure: <PerpendicularBisectorProofSvg size={200} />,
        options: [
          'Azon pontok összessége a síkban, amelyek egyenlő távolságra vannak a szakasz két végpontjától',
          'A szakasz egyharmadában emelt egyenes',
          'A szakasszal párhuzamos egyenes',
          'A szakasz végpontjából húzott merőleges'
        ],
        correctAnswer: 0,
        explanation: 'A szakaszfelező merőleges azon pontok mértani helye a síkban, amelyek a szakasz két végpontjától azonos távolságra esnek (PA = PB).'
      },
      {
        id: 'ctq1-3',
        question: 'Hol metszik egymást egy háromszög oldalfelező merőlegesei?',
        options: [
          'A háromszög köré írt körének középpontjában',
          'A beírt kör középpontjában',
          'A háromszög súlypontjában',
          'A magasságpontban'
        ],
        correctAnswer: 0,
        explanation: 'Mivel mindhárom oldalfelező merőleges az adott csúcsoktól egyenlő távolságra lévő pontok halmaza, a metszéspont mindhárom csúcstól egyenlő távolságra van, tehát ez a körülírt kör középpontja.'
      },
      {
        id: 'ctq1-4',
        question: 'Melyik vonal esik egybe az egyenlő szárú háromszögben az alaphoz tartozó magassággal?',
        options: [
          'A súlyvonal és a csúcsszög szögfelezője is',
          'Csak a középvonal',
          'Semmilyen más vonal',
          'Az alapon fekvő szög felezője'
        ],
        correctAnswer: 0,
        explanation: 'Az egyenlő szárú háromszög tengelyes szimmetriája miatt az alaphoz tartozó magasságvonal egyben az alap felezőmerőlegese, az alaphoz tartozó súlyvonal, és a csúcsszög belső szögfelezője is.'
      },
      {
        id: 'ctq1-5',
        question: 'Mekkora egy szabályos (egyenlő oldalú) háromszög minden belső szöge?',
        options: ['60°', '45°', '90°', '75°'],
        correctAnswer: 0,
        explanation: 'A szabályos háromszög mindhárom oldala egyenlő, ezért mindhárom szöge is egyenlő: 180° / 3 = 60°.'
      },
      {
        id: 'ctq1-6',
        question: 'Mi igaz a paralelogramma átlóira?',
        figure: <ParallelogramDiagonalsSvg size={200} />,
        options: [
          'Felezik egymást',
          'Mindig merőlegesek egymásra',
          'Mindig egyenlő hosszúak',
          'Felezik a belső szögeket'
        ],
        correctAnswer: 0,
        explanation: 'Bármely paralelogramma átlói kölcsönösen felezik egymást a metszéspontjukban. (A merőlegesség a rombuszra, az egyenlő hossz a téglalapra jellemző speciális tulajdonság).'
      },
      {
        id: 'ctq1-7',
        question: 'Hol metszi egymást egy háromszög három belső szögfelezője?',
        options: [
          'A beírt kör középpontjában',
          'A köré írt kör középpontjában',
          'A magasságpontban',
          'A leghosszabb oldal felezőpontjában'
        ],
        correctAnswer: 0,
        explanation: 'A belső szögfelezők pontjai egyenlő távol vannak a háromszög oldalegyeneseitől, így metszéspontjuk mindhárom oldaltól egyenlő r sugarú távolságra van: ez a beírt kör középpontja.'
      },
      {
        id: 'ctq1-8',
        question: 'Egy háromszög két szöge 70° és 40°. Milyen típusú a háromszög?',
        options: [
          'Egyenlő szárú háromszög (a harmadik szög is 70°)',
          'Derékszögű háromszög',
          'Szabályos háromszög',
          'Általános háromszög'
        ],
        correctAnswer: 0,
        explanation: 'A harmadik szög: 180° - 70° - 40° = 70°. Mivel két szöge megegyezik (70° = 70°), a háromszög egyenlő szárú.'
      },
      {
        id: 'ctq1-9',
        question: 'Igaz-e, hogy a rombusz átlói felezik a rombusz belső szögeit?',
        options: [
          'Igen, minden rombuszban igaz',
          'Csak ha a rombusz négyzet',
          'Nem igaz egyetlen rombuszra sem',
          'Csak a hosszabbik átlóra igaz'
        ],
        correctAnswer: 0,
        explanation: 'A rombusz átlói tengelyes szimmetriatengelyek, így a csúcsoknál lévő belső szögeket szimmetrikusan felezik, és merőlegesek is egymásra.'
      },
      {
        id: 'ctq1-10',
        question: 'Hány szimmetriatengelye van egy szabályos háromszögnek?',
        options: ['3 darab', '1 darab', '0 darab', 'Végtelen sok'],
        correctAnswer: 0,
        explanation: 'A szabályos háromszögnek mindhárom oldalfelező merőlegese (amelyek a csúcsokon mennek át) szimmetriatengely, így pontosan 3 szimmetriatengelye van.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Számítások és közvetett következtetések',
    subtitle: 'Szögszámítások, szakaszok hosszának meghatározása egybevágóságból.',
    range: '11–20. feladat',
    focus: 'Derékszögű komponensek, Pitagorasz-tétel egybevágóságban, paralelogrammák',
    questions: [
      {
        id: 'ctq2-1',
        question: 'Egy egyenlő szárú háromszög alapja 12 cm, szára 10 cm. Mekkora az alaphoz tartozó magassága?',
        figure: <IsoscelesMiniSvg size={130} />,
        options: ['8 cm', '6 cm', '9 cm', '7 cm'],
        correctAnswer: 0,
        explanation: 'Az alap magassága felezi az alapot: a/2 = 6 cm. A keletkező derékszögű háromszögben a Pitagorasz-tétel szerint: m² + 6² = 10² ⟹ m² + 36 = 100 ⟹ m² = 64 ⟹ m = 8 cm.'
      },
      {
        id: 'ctq2-2',
        question: 'Egy deltoid átlói e = 16 cm és f = 12 cm. Az átlók metszéspontja a hosszabbik átlót felezi. Mekkora a deltoid területe?',
        figure: <KiteMiniSvg size={130} />,
        options: ['96 cm²', '192 cm²', '48 cm²', '120 cm²'],
        correctAnswer: 0,
        explanation: 'A deltoid területe az egymásra merőleges átlók szorzatának a fele: T = (e · f) / 2 = (16 · 12) / 2 = 192 / 2 = 96 cm².'
      },
      {
        id: 'ctq2-3',
        question: 'Egy paralelogramma egyik belső szöge 65°. Mekkorák a többi belső szögei?',
        figure: <ParallelogramMiniSvg size={130} />,
        options: ['115°, 65°, 115°', '65°, 65°, 65°', '125°, 65°, 125°', '90°, 90°, 115°'],
        correctAnswer: 0,
        explanation: 'A paralelogramma egy oldalon fekvő szögeinek összege 180° (társszögek). Így a szomszédos szög: 180° - 65° = 115°. A szemközti szögek pedig egyenlők, így: 65°, 115°, 65°, 115°.'
      },
      {
        id: 'ctq2-4',
        question: 'A derékszögű háromszög átfogójához tartozó súlyvonalának hossza hogyan viszonyul az átfogóhoz?',
        options: [
          'Pontosan fele akkora, mint az átfogó (s_c = c / 2)',
          'Egyenlő az átfogóval',
          'Harmada az átfogónak',
          'Nincs állandó arány'
        ],
        correctAnswer: 0,
        explanation: 'A Thalész-tétel miatt a derékszögű háromszög köré írt körének középpontja az átfogó felezőpontja. A felezőpontot a derékszögű csúccsal összekötő szakasz a kör sugara: R = c/2 = s_c.'
      },
      {
        id: 'ctq2-5',
        question: 'Egy egyenlő szárú háromszög alapja 16 cm, területe 48 cm². Mekkora a szára?',
        options: ['10 cm', '8 cm', '12 cm', '14 cm'],
        correctAnswer: 0,
        explanation: 'T = (a · m) / 2 ⟹ 48 = (16 · m) / 2 ⟹ 48 = 8m ⟹ m = 6 cm. Az alap fele: 8 cm. A szár a Pitagorasz-tételből: b² = 6² + 8² = 36 + 64 = 100 ⟹ b = 10 cm.'
      },
      {
        id: 'ctq2-6',
        question: 'Egy szabályos háromszög oldala 6 cm. Mekkora a magassága?',
        options: ['3√3 cm (kb. 5,2 cm)', '6√3 cm', '3 cm', '4,5 cm'],
        correctAnswer: 0,
        explanation: 'A magasságvonal derékszögű háromszögre bontja, ahol az átfogó 6 cm, a befogó 3 cm. m² + 3² = 6² ⟹ m² + 9 = 36 ⟹ m² = 27 ⟹ m = √27 = 3√3 cm.'
      },
      {
        id: 'ctq2-7',
        question: 'Egy húrtrapéz (szimmetrikus trapéz) alapjai 14 cm és 6 cm, szára 5 cm. Mekkora a magassága?',
        options: ['3 cm', '4 cm', '5 cm', '2 cm'],
        correctAnswer: 0,
        explanation: 'A szimmetria miatt a két szélre eső szakasz hossza: (14 - 6) / 2 = 8 / 2 = 4 cm. A derékszögű sarokháromszögben átfogó 5 cm, befogó 4 cm, így a magasság: m = √(5² - 4²) = √(25 - 16) = √9 = 3 cm.'
      },
      {
        id: 'ctq2-8',
        question: 'Két egyenes metszi egymást. Milyen reláció van a csúcsszögek között?',
        options: [
          'Egyenlő nagyságúak (180°-ra kiegészítő mellékszögek egyenlősége miatt)',
          'Összegük 180°',
          'Összegük 90°',
          'Nem függnek össze'
        ],
        correctAnswer: 0,
        explanation: 'A csúcsszögek ugyanannak a szögnek a mellékszögei, ezért nagyságuk pontosan megegyezik.'
      },
      {
        id: 'ctq2-9',
        question: 'Egy téglalap átlói 10 cm hosszúak és 60°-os szöget zárnak be egymással. Mekkora a téglalap rövidebb oldala?',
        options: ['5 cm', '4 cm', '5√3 cm', '6 cm'],
        correctAnswer: 0,
        explanation: 'A téglalap átlói egyenlők és felezik egymást, így félig 5 cm-es szakaszok keletkeznek. Mivel a bezárt szög 60°, az átlók által bezárt háromszög egyenlő szárú 60°-os szöggel, tehát szabályos! Ezért a harmadik oldal (a téglalap rövidebb oldala) szintén 5 cm.'
      },
      {
        id: 'ctq2-10',
        question: 'Egy rombusz oldala 13 cm, egyik átlója 24 cm. Mekkora a másik átlója?',
        options: ['10 cm', '12 cm', '8 cm', '16 cm'],
        correctAnswer: 0,
        explanation: 'A rombusz átlói merőlegesen felezik egymást. Az ismert átló fele 12 cm, a rombusz oldala 13 cm (átfogó). A másik félátló: √(13² - 12²) = √(169 - 144) = √25 = 5 cm. A teljes másik átló: 2 · 5 = 10 cm.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Nehezebb bizonyítások és térelmélet',
    subtitle: 'Magasabb szintű szerkesztések, súlypont, magasságpont és mértani helyek.',
    range: '21–30. feladat',
    focus: 'Súlypont 2:1 aránya, Euler-egyenes, szimmetriák szintézise',
    questions: [
      {
        id: 'ctq3-1',
        question: 'Milyen arányban osztja a háromszög súlypontja (S) a súlyvonalakat?',
        options: [
          '2 : 1 arányban, a csúcstól távolodva a hosszabb rész',
          '1 : 1 arányban (felezi őket)',
          '3 : 1 arányban',
          '1 : 2 arányban a csúcstól'
        ],
        correctAnswer: 0,
        explanation: 'A háromszög súlyvonalai egy pontban (súlypont) metszik egymást, és a súlypont minden súlyvonalat 2:1 arányban oszt fel úgy, hogy a csúcs felőli darab a hosszabb (a teljes hossz kétharmada).'
      },
      {
        id: 'ctq3-2',
        question: 'Mi a neve annak az egyenesnek, amelyen a magasságpont (M), a súlypont (S) és a körülírt kör középpontja (O) fekszik?',
        options: ['Euler-egyenes', 'Simson-egyenes', 'Pascal-egyenes', 'Fermat-egyenes'],
        correctAnswer: 0,
        explanation: 'Leonhard Euler bizonyította, hogy bármely háromszögben a magasságpont (M), a súlypont (S) és a körülírt kör középpontja (O) egy egyenesre esik, és MS : SO = 2 : 1. Ezt hívjuk Euler-egyenesnek.'
      },
      {
        id: 'ctq3-3',
        question: 'Egy derékszögű háromszögben hol helyezkedik el a magasságpont (M)?',
        options: [
          'Pontosan a derékszögű csúcsban',
          'Az átfogó felezőpontjában',
          'A háromszögön kívül',
          'A beírt kör középpontjában'
        ],
        correctAnswer: 0,
        explanation: 'A két befogó maga is magasságvonal (hiszen merőlegesek egymásra), így a magasságvonalak a derékszögű csúcsban futnak össze.'
      },
      {
        id: 'ctq3-4',
        question: 'Tompaszögű háromszög esetén hol található a körülírt kör középpontja (O) és a magasságpont (M)?',
        options: [
          'Mindkettő a háromszögön KÍVÜL helyezkedik el',
          'Mindkettő a háromszög belsejében van',
          'O bent van, de M kint',
          'A leghosszabb oldalra esnek'
        ],
        correctAnswer: 0,
        explanation: 'Tompaszögű háromszög esetén mind a magasságvonalak meghosszabbításai, mind az oldalfelező merőlegesek a háromszögön kívül metszik egymást.'
      },
      {
        id: 'ctq3-5',
        question: 'Egy háromszög középvonala párhuzamos az alapjával. Mekkora a hossza az alaphoz képest?',
        options: [
          'Pontosan a fele az alap hosszának (k = a / 2)',
          'Egyenlő az alappal',
          'Kétszerese az alapnak',
          'Harmada az alapnak'
        ],
        correctAnswer: 0,
        explanation: 'A háromszög két oldalának felezőpontját összekötő középvonal párhuzamos a harmadik oldallal, és hossza pontosan fele a harmadik oldal hosszának.'
      },
      {
        id: 'ctq3-6',
        question: 'Ha egy négyszög oldalfelező pontjait sorra összekötjük (Varignon-tétel), milyen négyszöget kapunk?',
        options: [
          'Mindig paralelogrammát',
          'Mindig téglalapot',
          'Mindig rombuszt',
          'Csak trapézt'
        ],
        correctAnswer: 0,
        explanation: 'A Varignon-tétel kimondja, hogy bármely konvex vagy konkáv négyszög oldalfelező pontjait összekötve paralelogrammát kapunk, mert oldalai a négyszög átlóinak középvonalai (párhuzamosak az átlókkal és felük azoknak).'
      },
      {
        id: 'ctq3-7',
        question: 'Egy derékszögű háromszög befogói 9 cm és 12 cm. Mekkora a köré írt kör sugara (R)?',
        options: ['7,5 cm', '15 cm', '6 cm', '10 cm'],
        correctAnswer: 0,
        explanation: 'Pitagorasz-tétel az átfogóra: c = √(9² + 12²) = √(81 + 144) = √225 = 15 cm. A derékszögű háromszög körülírt körének átmérője az átfogó (Thalész), így a sugara R = c / 2 = 15 / 2 = 7,5 cm.'
      },
      {
        id: 'ctq3-8',
        question: 'A fenti 9, 12, 15 cm-es derékszögű háromszögnek mekkora a beírt körének sugara (r)?',
        options: ['3 cm', '2 cm', '4 cm', '5 cm'],
        correctAnswer: 0,
        explanation: 'Derékszögű háromszög beírt körének sugara: r = (a + b - c) / 2 = (9 + 12 - 15) / 2 = 6 / 2 = 3 cm. (Vagy területtel: T = 9·12/2 = 54, s = (9+12+15)/2 = 18, r = T/s = 54/18 = 3 cm).'
      },
      {
        id: 'ctq3-9',
        question: 'Melyik négyszögnek merőlegesek az átlói és felezik egymást, de nem feltétlenül egyenlő hosszúak?',
        options: ['Rombusz', 'Téglalap', 'Paralelogramma', 'Húrtrapéz'],
        correctAnswer: 0,
        explanation: 'A rombusz átlói merőlegesek egymásra és felezik egymást (mivel egyenlő oldalú paralelogramma), de csak négyzet esetén egyenlő hosszúak.'
      },
      {
        id: 'ctq3-10',
        question: 'Hány egybevágó kis háromszögre osztja egy háromszöget a három középvonala?',
        options: [
          '4 egybevágó háromszögre, melyek mindegyikének területe T/4',
          '3 egybevágó háromszögre',
          '6 egybevágó háromszögre',
          '2 egybevágó háromszögre'
        ],
        correctAnswer: 0,
        explanation: 'A három középvonal az eredeti háromszöget 4 darab egymással kölcsönösen egybevágó, az eredetihez hasonló (1:2 arányú) háromszögre bontja, mindegyik területe az eredeti terület negyede.'
      }
    ]
  }
};

export const CongruentTrianglesQuiz: React.FC<CongruentTrianglesQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      title="Egybevágó háromszögek Kvíz"
      subtitle="Teszteld tudásodat a geometriai tételek, szimmetriák és bizonyítások világában!"
      badge="10. OSZTÁLY • VI. EGYBEVÁGÓSÁG ÉS KÖR • GYAKORLÓ KVÍZ"
      color="teal"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <CongruentTrianglesMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <CongruentTrianglesSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};
