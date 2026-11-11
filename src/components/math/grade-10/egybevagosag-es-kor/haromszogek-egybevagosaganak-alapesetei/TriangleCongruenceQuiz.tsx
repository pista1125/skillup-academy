import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { TriangleCongruenceMatcher } from './TriangleCongruenceMatcher';
import { TriangleCongruenceSorter } from './TriangleCongruenceSorter';
import {
  FourCongruenceCasesSvg,
  AmbiguousSsaCounterexampleSvg,
  RightAngleWithDotSvg,
  SssMiniSvg,
  SasMiniSvg,
  AsaMiniSvg,
  SsaMiniSvg,
  RightTriangleMiniSvg
} from './TriangleCongruenceFigures';

interface TriangleCongruenceQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A 4 egybevágósági alapeset',
    description: '1. SSS (3 oldal) • 2. SAS (2 oldal, közbezárt szög) • 3. ASA (1 oldal, 2 szög) • 4. SSA (2 oldal, nagyobbikkal szemközti szög).',
    note: 'Egybevágó háromszögek területe és kerülete is mindig pontosan egyenlő.',
    color: 'from-emerald-500 to-teal-600',
    figure: <FourCongruenceCasesSvg size={220} />
  },
  {
    title: 'Az SSA csapda',
    description: 'Két oldal és szög esetén a szögnek kötelezően a NAGYOBB oldallal szemben kell lennie, különben 2 különböző háromszög keletkezhet!',
    note: 'Ha a szög a kisebbik oldallal szemközti, a szerkesztés nem egyértelmű.',
    color: 'from-rose-500 to-red-600',
    figure: <AmbiguousSsaCounterexampleSvg size={220} />
  },
  {
    title: 'Magyar derékszög jelölés',
    description: 'A derékszöget Magyarországon körcikk-ívvel és a belsejében lévő ponttal jelöljük (a nemzetközi négyzetes sarok helyett).',
    note: 'Derékszögű háromszögben az átfogó és az egyik befogó ismerete egyértelműen meghatározza a háromszöget (Pitagorasz-tétel).',
    color: 'from-blue-500 to-indigo-600',
    figure: <RightAngleWithDotSvg size={200} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapismeretek és tételek felismerése',
    subtitle: 'Az egybevágóság definíciója, a 4 alapeset azonosítása egyszerű adatokból.',
    range: '1–10. feladat',
    focus: 'SSS, SAS, ASA, SSA alapvető feltételei',
    questions: [
      {
        id: 'tcq1-1',
        question: 'Mit jelent pontosan az, hogy két háromszög egybevágó (△ABC ≅ △A\'B\'C\')?',
        options: [
          'Egybevágósági transzformációval (mozgatással, tükrözéssel) egymásba vihetők',
          'Csak a területük egyenlő, de az oldalaik eltérhetnek',
          'Mindkét háromszög derékszögű',
          'A kerületük összege 180 cm'
        ],
        correctAnswer: 0,
        explanation: 'Az egybevágóság definíciója szerint két síkidom egybevágó, ha létezik olyan távolságtartó transzformáció (egybevágóság), amely az egyiket pontosan a másikba képezi le.'
      },
      {
        id: 'tcq1-2',
        question: 'Melyik NEM háromszögek egybevágósági alapesete az alábbiak közül?',
        options: [
          'Három szög egyenlősége (sz, sz, sz)',
          'Három oldal páronkénti egyenlősége (o, o, o)',
          'Két oldal és a közbezárt szög egyenlősége (o, sz, o)',
          'Egy oldal és a rajta fekvő két szög egyenlősége (sz, o, sz)'
        ],
        correctAnswer: 0,
        explanation: 'A három belső szög megegyezése (sz, sz, sz) csak HASONLÓSÁGOT biztosít, egybevágóságot nem, mivel a háromszögek mérete tetszőleges arányban különbözhet!'
      },
      {
        id: 'tcq1-3',
        question: 'Egyik háromszög oldalai 4 cm, 6 cm, 7 cm. A másiké 6 cm, 4 cm, 7 cm. Egybevágóak-e?',
        figure: <SssMiniSvg size={140} />,
        options: [
          'Igen, az (o, o, o) / SSS alapeset alapján',
          'Nem, mert az oldalak sorrendje nem azonos',
          'Csak akkor, ha mindkettő derékszögű',
          'Nem dönthető el a szögek ismerete nélkül'
        ],
        correctAnswer: 0,
        explanation: 'Mivel mindhárom oldal páronként megegyezik (4 = 4, 6 = 6, 7 = 7), az (o, o, o) alapeset alapján a két háromszög egybevágó.'
      },
      {
        id: 'tcq1-4',
        question: 'Két háromszögben a = 5 cm, b = 8 cm és a közbezárt γ = 40°. Melyik eset biztosítja az egybevágóságot?',
        figure: <SasMiniSvg size={140} />,
        options: [
          '(o, sz, o) / SAS alapeset',
          '(o, o, o) / SSS alapeset',
          '(sz, sz, sz) alapeset',
          '(o, o, sz) alapeset'
        ],
        correctAnswer: 0,
        explanation: 'Két oldal és a kettőjük által közbezárt szög ismerete a klasszikus (o, sz, o) / SAS egybevágósági tétel.'
      },
      {
        id: 'tcq1-5',
        question: 'Mi a feltétele az (o, o, sz) alapeset érvényességének?',
        figure: <AmbiguousSsaCounterexampleSvg size={220} />,
        options: [
          'A szögnek a nagyobbik oldallal szemben kell lennie',
          'A szögnek kötelezően 90°-nak kell lennie',
          'A szögnek a kisebbik oldallal szemben kell lennie',
          'Nincs semmilyen külön feltétel'
        ],
        correctAnswer: 0,
        explanation: 'Két oldal és egy szög esetén csak akkor egyértelmű a háromszög, ha a szög a hosszabbik oldallal néz szembe. Ha a rövidebbel szemben lenne, két különböző alakzat is létezhetne!'
      },
      {
        id: 'tcq1-6',
        question: 'Hogyan jelöljük a magyar szabvány szerint a derékszöget a geometriai rajzokon?',
        figure: <RightAngleWithDotSvg size={140} />,
        options: [
          'Körívvel és a belsejében egy ponttal',
          'Négyzet alakú sarokkitöltéssel',
          'Két párhuzamos vonalkával',
          'Csak a 90° felirattal, jelölés nélkül'
        ],
        correctAnswer: 0,
        explanation: 'A magyar matematika oktatási hagyományban a derékszög jele a szögtartományba rajzolt negyedkörív, közepén egy jól látható ponttal.'
      },
      {
        id: 'tcq1-7',
        question: 'Ha △ABC ≅ △DEF, és AB = 6 cm, ∠B = 50°, akkor a △DEF-ben mely adatok biztosan egyenlők ezekkel?',
        options: [
          'DE = 6 cm és ∠E = 50°',
          'DF = 6 cm és ∠D = 50°',
          'EF = 6 cm és ∠F = 50°',
          'Csak a területük egyezik meg'
        ],
        correctAnswer: 0,
        explanation: 'A csúcsok megfelelő sorrendje miatt az AB oldalnak a DE oldal felel meg, a B csúcsnál lévő szögnek pedig az E csúcsnál lévő szög felel meg.'
      },
      {
        id: 'tcq1-8',
        question: 'Egy háromszög oldalai 3 cm, 4 cm és 8 cm. Lehet-e ilyen háromszöget szerkeszteni?',
        options: [
          'Nem, mert a háromszög-egyenlőtlenség szerint 3 + 4 = 7 < 8',
          'Igen, mert tetszőleges 3 számból szerkeszthető háromszög',
          'Igen, mert ez egy derékszögű háromszög',
          'Csak tompaszögű háromszögként'
        ],
        correctAnswer: 0,
        explanation: 'Bármely háromszögben bármely két oldal összege nagyobb kell legyen a harmadik oldalnál: 3 + 4 = 7, ami nem nagyobb 8-nál, így ilyen háromszög nem létezik!'
      },
      {
        id: 'tcq1-9',
        question: 'Két derékszögű háromszögben az átfogó és az egyik befogó hossza megegyezik. Egybevágóak-e?',
        options: [
          'Igen, mert az átfogó a leghosszabb oldal, így az (o, o, sz) érvényesül',
          'Nem, mert a másik befogót nem ismerjük',
          'Csak akkor, ha azonosak a hegyesszögek is',
          'Nem dönthető el'
        ],
        correctAnswer: 0,
        explanation: 'A derékszögű háromszögben a 90°-os szög a leghosszabb oldallal (az átfogóval) van szemben, így az (o, o, sz) alapeset teljesül. (Emellett a Pitagorasz-tétel miatt a harmadik oldal is automatikusan azonos).'
      },
      {
        id: 'tcq1-10',
        question: 'Igaz-e, hogy két egybevágó háromszög kerülete és területe is megegyezik?',
        options: [
          'Mindig igaz',
          'Csak a kerület egyezik, a terület nem',
          'Csak a terület egyezik, a kerület nem',
          'Egyik sem egyezik meg szükségképpen'
        ],
        correctAnswer: 0,
        explanation: 'Mivel az egybevágóság távolságtartó transzformáció, minden szakasz, szög, és így a kerület (K) valamint a terület (T) is szigorúan egyenlő.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Alkalmazások és szerkesztési feltételek',
    subtitle: 'Megadott adatok alapján az alapesetek kiválasztása, hiányzó szögek pótlása.',
    range: '11–20. feladat',
    focus: 'Belső szögek összege, derékszögű esetek, egyértelműség',
    questions: [
      {
        id: 'tcq2-1',
        question: 'Egy háromszögben c = 8 cm, α = 40°, β = 60°. Egy másikban c\' = 8 cm, α\' = 40°, γ\' = 80°. Egybevágóak?',
        figure: <AsaMiniSvg size={140} />,
        options: [
          'Igen, mert a harmadik szög mindkettőben β = 60° illetve γ = 80°',
          'Nem, mert a szögek elnevezése különbözik',
          'Csak ha a másik két oldal hossza is adva van',
          'Nem, mert az egyikben β, a másikban γ van megadva'
        ],
        correctAnswer: 0,
        explanation: 'A háromszög belső szögeinek összege 180°. Az elsőben γ = 180° - (40° + 60°) = 80°. A másodikban β\' = 180° - (40° + 80°) = 60°. Így az egy oldal és a rajta fekvő két szög (c, α, β) megegyezik, tehát egybevágóak (ASA).'
      },
      {
        id: 'tcq2-2',
        question: 'Miért hibás az a következtetés, hogy ha két háromszög területe 24 cm², akkor azok egybevágóak?',
        options: [
          'Mert az azonos területhez teljesen különböző oldalhosszak tartozhatnak (pl. 6×8/2 és 4×12/2)',
          'Mert a területnek 48 cm²-nek kellene lennie',
          'Mert csak tompaszögű háromszögeknél lenne igaz',
          'Nincs hiba, az egyenlő terület egybevágóságot jelent'
        ],
        correctAnswer: 0,
        explanation: 'Az egybevágóság maga után vonja a területegyenlőséget, de fordítva nem igaz: végtelen sok különböző alakú háromszögnek lehet hajszálpontosan 24 cm² a területe!'
      },
      {
        id: 'tcq2-3',
        question: 'Adott a = 6 cm, b = 10 cm és β = 55°. Egyértelműen meghatározza-e ez a háromszöget?',
        options: [
          'Igen, mert a megadott szög (β) a hosszabb b = 10 cm-es oldallal szemben van',
          'Nem, mert két háromszög is létezhet',
          'Nem, mert β-nak tompaszögnek kellene lennie',
          'Csak akkor, ha c oldal is ismert'
        ],
        correctAnswer: 0,
        explanation: 'Mivel b = 10 cm > a = 6 cm, és az ismert szög a nagyobbik b oldallal néz szembe, az (o, o, sz) alapeset teljesül, a háromszög egyértelműen megszerkeszthető.'
      },
      {
        id: 'tcq2-4',
        question: 'Adott a = 10 cm, b = 6 cm és β = 30°. Hány nem egybevágó háromszög szerkeszthető ezekkel az adatokkal?',
        figure: <AmbiguousSsaCounterexampleSvg size={220} />,
        options: [
          '2 különböző háromszög (egy hegyesszögű és egy tompaszögű)',
          'Pontosan 1 háromszög',
          '0 háromszög',
          'Végtelen sok háromszög'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a szög a KISEBBIK oldallal (b = 6 cm < a = 10 cm) néz szembe, és a magasság m = a · sin 30° = 10 · 0,5 = 5 cm < 6 cm, a körzőív kétszer metszi a szögszárat: 2 nem egybevágó háromszög jön létre!'
      },
      {
        id: 'tcq2-5',
        question: 'Egy egyenlő szárú háromszög alapja 10 cm, szára 13 cm. Egy másik egyenlő szárú háromszög alapja 10 cm, szára 13 cm. Egybevágóak?',
        options: [
          'Igen, az (o, o, o) alapeset miatt mindkettő oldalai: 10, 13, 13 cm',
          'Nem, mert a szárszöget nem ismerjük',
          'Csak ha a magasságuk is megegyezik',
          'Nem dönthető el'
        ],
        correctAnswer: 0,
        explanation: 'Az egyenlő szárú háromszög két szára azonos hosszú. Így mindkét háromszög oldalai 10 cm, 13 cm és 13 cm, tehát az SSS tétel alapján egybevágóak.'
      },
      {
        id: 'tcq2-6',
        question: 'Két derékszögű háromszögben megegyezik a két befogó (a = a\' és b = b\'). Melyik alapeset igazolja az egybevágóságot?',
        figure: <RightTriangleMiniSvg size={140} />,
        options: [
          '(o, sz, o) / SAS alapeset, mert a közbezárt szög mindkettőben pontosan 90°',
          '(o, o, o) alapeset',
          '(sz, sz, sz) alapeset',
          'Kizárólag a Pitagorasz-tétel önmagában'
        ],
        correctAnswer: 0,
        explanation: 'A két befogó által bezárt szög a derékszög (90°). Mivel a két befogó és a derékszög megegyezik, az (o, sz, o) alapeset közvetlenül igazolja az egybevágóságot.'
      },
      {
        id: 'tcq2-7',
        question: 'Egy rombuszt az egyik átlója két háromszögre oszt. Egybevágó-e a két keletkező háromszög?',
        options: [
          'Mindig egybevágó, mert mind a 4 oldal egyenlő, és az átló közös (o, o, o)',
          'Csak akkor, ha a rombusz négyzet',
          'Nem, mert a szögek különbözőek',
          'Csak a hosszabbik átló esetén'
        ],
        correctAnswer: 0,
        explanation: 'A rombusz mind a négy oldala egyenlő (a). Az átló hossza f. Mindkét háromszög oldalai (a, a, f), így az (o, o, o) tétel alapján mindig egybevágóak.'
      },
      {
        id: 'tcq2-8',
        question: 'Egy háromszögben a = 7 cm, b = 9 cm, c = 12 cm. Egy másikban a\' = 9 cm, b\' = 12 cm, c\' = 7 cm. Melyik transzformáció viheti át őket egymásba?',
        options: [
          'Forgatás vagy eltolás vagy tükrözés (bármely egybevágósági transzformáció)',
          'Csak nagyítás',
          'Csak merőleges vetítés',
          'Semmilyen transzformáció nem létezik'
        ],
        correctAnswer: 0,
        explanation: 'Az oldalak halmaza azonos {7, 9, 12}, tehát a két háromszög egybevágó. Az egybevágóság definíciója szerint létezik olyan eltolásból, elforgatásból és tükrözésből álló transzformáció, amely egymásba viszi őket.'
      },
      {
        id: 'tcq2-9',
        question: 'Ha két szabályos (egyenlő oldalú) háromszög egyik oldala egyenlő (a = a\'), akkor:',
        options: [
          'A két háromszög biztosan egybevágó',
          'Csak hasonlóak, de nem feltétlenül egybevágóak',
          'Csak a magasságuk egyenlő, a területük nem',
          'Nem lehet eldönteni'
        ],
        correctAnswer: 0,
        explanation: 'A szabályos háromszög mindhárom oldala egyenlő (a, a, a) és minden szöge 60°. Ha egy oldaluk egyenlő, mindhárom oldaluk megegyezik, így az SSS alapeset alapján egybevágóak.'
      },
      {
        id: 'tcq2-10',
        question: 'Egy háromszög területe 30 cm², kerülete 30 cm. Lehet-e egybevágó egy 30 cm² területű és 28 cm kerületű háromszöggel?',
        options: [
          'Nem, mert egybevágó alakzatok kerületének kötelezően egyenlőnek kell lennie',
          'Igen, mert a területük azonos',
          'Igen, ha mindkettő tompaszögű',
          'Lehetséges, ha a magasságuk azonos'
        ],
        correctAnswer: 0,
        explanation: 'Az egybevágóság szigorú feltétele a megfelelő oldalak egyenlősége. Ha a kerületük különbözik (30 cm ≠ 28 cm), az oldalak összege sem azonos, tehát kizárt, hogy egybevágóak legyenek!'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Geometriai bizonyítások és összetett feladványok',
    subtitle: 'Egybevágóság felhasználása tételek és tulajdonságok szigorú bizonyítására.',
    range: '21–30. feladat',
    focus: 'Bizonyítási lépések, szimmetriák, négyszögek tulajdonságai',
    questions: [
      {
        id: 'tcq3-1',
        question: 'Hogyan bizonyítható az egybevágósággal, hogy az egyenlő szárú háromszög alapon fekvő szögei egyenlők?',
        figure: <RightTriangleMiniSvg size={140} />,
        options: [
          'Az alaphoz tartozó magasságvonal két egybevágó derékszögű háromszögre osztja a háromszöget',
          'A belső szögek összege mindig 180°',
          'A Pitagorasz-tétel segítségével közvetlenül',
          'A Thalész-tétel alkalmazásával'
        ],
        correctAnswer: 0,
        explanation: 'Ha behúzzuk az alaphoz tartozó magasságot (m), az eredeti háromszög két derékszögű háromszögre bomlik. Mindkettőben az átfogó a szár (b), az egyik befogó a közös magasság (m). Mivel átfogó és befogó egyezik (o, o, sz), a két félháromszög egybevágó, így alapi szögeik (α = β) egyenlők.'
      },
      {
        id: 'tcq3-2',
        question: 'Egy konvex négyszög szemközti oldalai párhuzamosak (paralelogramma). Mivel igazoljuk, hogy a szemközti oldalai egyenlő hosszúak is?',
        options: [
          'Az egyik átló behúzásával két egybevágó háromszög keletkezik az (sz, o, sz) tétel miatt (váltószögek és közös átló)',
          'A négyszög belső szögeinek összege 360°',
          'Mert a területe T = a · b',
          'A köré írható kör tulajdonságai alapján'
        ],
        correctAnswer: 0,
        explanation: 'Az átló behúzásakor a párhuzamos oldalak miatt egyenlő váltószögek keletkeznek az átló két oldalán. Az átló közös oldal, rajta fekszik a két váltószögpár, így az ASA tétel alapján a két háromszög egybevágó, amiből következik a szemközti oldalak egyenlősége.'
      },
      {
        id: 'tcq3-3',
        question: 'Egy körben két húr hossza egyenlő (d₁ = d₂). Mit mondhatunk a középpontból hozzájuk húzott merőleges szakaszok (távolságok) hosszáról?',
        options: [
          'A középponttól mért távolságuk pontosan megegyezik',
          'A hosszabb húr van közelebb a középponthoz',
          'A távolságuk aránya 1:2',
          'Nem állítható fel összefüggés'
        ],
        correctAnswer: 0,
        explanation: 'A középpontot a húrok végpontjaival összekötve egyenlő szárú háromszögeket kapunk (száruk a sugár R). Mivel az alapok (a húrok) egyenlők, a háromszögek egybevágóak (SSS), így a hozzájuk tartozó magasságok (a középponttól mért távolságok) is egyenlők.'
      },
      {
        id: 'tcq3-4',
        question: 'A szakaszfelező merőleges bármely P pontja egyenlő távol van a szakasz két végpontjától (PA = PB). Melyik alapesettel bizonyítjuk ezt?',
        options: [
          '(o, sz, o) / SAS alapeset: F a felezőpont (AF = FB), a merőleges közös szár, és a bezárt szög 90°',
          '(sz, sz, sz) alapeset',
          'Csak a koordinátageometria távolságképletével bizonyítható',
          'Csak Thalész-tétellel igazolható'
        ],
        correctAnswer: 0,
        explanation: 'Legyen F az AB szakasz felezőpontja. A △AFP és △BFP derékszögű háromszögekben: AF = FB (felezőpont), PF közös oldal, és a bezárt szög mindkettőben 90°. Az (o, sz, o) alapján a két háromszög egybevágó, így átfogóik is egyenlők: PA = PB.'
      },
      {
        id: 'tcq3-5',
        question: 'Melyik állítás IGAZ a paralelogramma átlóinak metszéspontjára (O)?',
        options: [
          'Az átlók metszéspontja mindkét átlót felezi, mert a szemközti háromszögek egybevágóak',
          'Az átlók mindig merőlegesek egymásra',
          'Az átlók mindig egyenlő hosszúak',
          'A metszéspont az átlókat 1:2 arányban osztja'
        ],
        correctAnswer: 0,
        explanation: 'A szemközti háromszögek (pl. △ABO és △CDO) egybevágóak az (sz, o, sz) alapeset alapján (AB = CD szemközti oldalak, és a rajtuk fekvő váltószögek egyenlők). Ezért megfelelő oldalaik is egyenlők: AO = OC és BO = OD, vagyis az átlók felezik egymást.'
      },
      {
        id: 'tcq3-6',
        question: 'Adott a = 8 cm, b = 5 cm és a szög α = 45° (a-val szemben). Hány megoldása van a szerkesztésnek?',
        options: [
          'Pontosan 1 megoldás, mert a szög a hosszabb oldallal szemközti (8 > 5)',
          '2 megoldás',
          '0 megoldás',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a = 8 cm nagyobb, mint b = 5 cm, és a megadott α szög az a oldallal néz szembe, az (o, o, sz) tétel szerint a feladatnak pontosan egyértelmű (1) megoldása van.'
      },
      {
        id: 'tcq3-7',
        question: 'Egy deltoid szimmetriaátlója két háromszögre bontja a deltoidot. Melyik alapeset alapján egybevágó a két fél?',
        options: [
          '(o, o, o) / SSS alapeset: két szomszédos oldal egyenlő (a=a, b=b) és a szimmetriaátló közös',
          '(sz, sz, sz) alapeset',
          '(sz, o, sz) alapeset',
          'Nem egybevágóak, csak a területük egyenlő'
        ],
        correctAnswer: 0,
        explanation: 'A deltoid definíciója szerint két-két szomszédos oldala egyenlő: a = a és b = b. A szimmetriaátló e mindkét háromszögnek közös oldala. Mivel mindhárom oldal páronként egyenlő (a, b, e), a két háromszög az SSS alapeset miatt egybevágó.'
      },
      {
        id: 'tcq3-8',
        question: 'Két háromszögben a = 6 cm, b = 8 cm, c = 10 cm, illetve a\' = 3 cm, b\' = 4 cm, c\' = 5 cm. Egybevágóak-e?',
        options: [
          'Nem egybevágóak, mert az oldalak aránya 2:1 (hasonlóak, de nem egybevágóak)',
          'Igen, mert mindkettő derékszögű',
          'Igen, mert a szögeik megegyeznek',
          'Nem dönthető el'
        ],
        correctAnswer: 0,
        explanation: 'Mindkét háromszög derékszögű (Pitagoraszi számhármasok: 3-4-5 és 6-8-10), és a szögeik pontosan azonosak, de az oldalaik hossza nem egyenlő (arányuk 2:1). Ezért a két háromszög HASONLÓ, de NEM egybevágó.'
      },
      {
        id: 'tcq3-9',
        question: 'Egy szögfelező bármely pontja egyenlő távol van a szög száraitól. Melyik egybevágósági alapesettel igazoljuk ezt?',
        options: [
          '(sz, o, sz) / AAS: közös félegyenes (OP), derékszög a szárakra, és felezett szögek egyenlősége',
          '(o, o, o) alapeset',
          'Csak Pitagorasz-tétellel',
          'Csak koszinusztétellel'
        ],
        correctAnswer: 0,
        explanation: 'A szögfelező P pontjából merőlegeseket bocsátunk a szárakra (T₁ és T₂). A keletkező △OPT₁ és △OPT₂ derékszögű háromszögekben OP közös átfogó, a szögfelező miatt az O-nál lévő hegyesszögek egyenlők. Mivel derékszög is van bennük, minden szögük és az átfogójuk egyezik (AAS / sz, o, sz), így egybevágóak: PT₁ = PT₂.'
      },
      {
        id: 'tcq3-10',
        question: 'Mi a legfontosabb geometriai következménye annak, hogy egy alakzatot egybevágósági transzformációval vizsgálunk?',
        options: [
          'Megmaradnak a távolságok, a szögek, a területek és a párhuzamosságok is',
          'Csak az x-koordináta változik meg',
          'A körülírt kör sugara felére csökken',
          'Az alakzat orientációja kötelezően megfordul'
        ],
        correctAnswer: 0,
        explanation: 'Az egybevágóság legfőbb tulajdonsága az invariancia: a pontok távolsága, a szakaszok hossza, a szögek nagysága és a síkidom területe változatlan (invariáns) marad a transzformáció során.'
      }
    ]
  }
};

export const TriangleCongruenceQuiz: React.FC<TriangleCongruenceQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      title="Háromszögek egybevágósága Kvíz"
      subtitle="Gyakorold a 4 egybevágósági alapesetet, a szerkesztési egyértelműséget és a geometriai bizonyításokat!"
      badge="10. OSZTÁLY • VI. EGYBEVÁGÓSÁG ÉS KÖR • GYAKORLÓ KVÍZ"
      color="emerald"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <TriangleCongruenceMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <TriangleCongruenceSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};
