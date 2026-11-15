import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { SimilarityPracticeExamMatcher } from './SimilarityPracticeExamMatcher';
import { SimilarityPracticeExamSorter } from './SimilarityPracticeExamSorter';
import {
  SynthesisConceptMapSvg,
  HexagonTrianglesSimilaritySvg,
  MirrorReflectionMeasurementSvg,
  TruncatedPyramidSectionsSvg,
  PyraminxSimilaritySvg
} from './SimilarityPracticeExamFigures';

interface SimilarityPracticeExamQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A Hasonlóság Alaptörvényei & Skálázás',
    description:
      'Hasonló alakzatokban a megfelelő oldalak aránya λ (állandó), a megfelelő szögek páronként egyenlők. Kerületek aránya K\'/K = λ, területek aránya T\'/T = λ², testek térfogatának aránya V\'/V = λ³.',
    note: 'Aranyszabály: Ha az oldalhossz k-szorosára nő, a terület k²-szeresére, a térfogat k³-szorosára változik!',
    color: 'from-violet-500 to-purple-600',
    figure: <SynthesisConceptMapSvg size={260} />
  },
  {
    title: 'Optikai és Geometriai Magasságmérés',
    description:
      'Tükörmódszernél a fényvisszaverődés törvénye (α = β) miatt a két derékszögű háromszög hasonló (sz-sz alapeset). Tárgymagasság / Szemmagasság = Tárgytávolság / Megfigyelőtávolság.',
    note: 'Gyakorlati példa: 184 cm-es szemmagasság, 1,6 m és 5,6 m távolság ➔ M = 184 · (5,6 / 1,6) = 644 cm = 6,44 m!',
    color: 'from-purple-500 to-indigo-600',
    figure: <MirrorReflectionMeasurementSvg size={260} />
  },
  {
    title: 'Gúlametszet, Csonkagúla és Varignon-tétel',
    description:
      'Alappal párhuzamos metszősík: a keletkező kis gúla hasonló az eredetihez, magasságok aránya megegyezik az alapélek arányával. Varignon-tétel: Bármely négyszög oldalfelező pontjai paralelogrammát alkotnak, területe T_négyszög / 2.',
    note: 'Speciális esetek: merőleges átlók ➔ téglalap; egyenlő átlók ➔ rombusz; merőleges és egyenlő átlók ➔ négyzet!',
    color: 'from-indigo-600 to-violet-700',
    figure: <TruncatedPyramidSectionsSvg size={260} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Fejezeti alapok és fogalmi feladványok',
    description: '30 alapozó feladat: hasonlósági arány, kerület- és területarány, alapesetek és metrikus tételek.',
    range: '1–30. kérdés',
    focus: 'Alapfogalmak, λ és λ² skálázás, alapesetek felismerése',
    badgeBg: 'bg-violet-100 dark:bg-violet-950/60',
    badgeBorder: 'border-violet-200 dark:border-violet-800',
    badgeText: 'text-violet-800 dark:text-violet-300',
    accentGradient: 'from-violet-500 to-purple-600',
    questions: [
      {
        id: 1,
        question: 'Mi a középpontos hasonlóság hasonlósági aránya (λ)?',
        options: ['A képszakasz és az eredeti szakasz hosszának hányadosa', 'A képszög és az eredeti szög aránya', 'A területek különbsége', 'A hasonlósági középpont koordinátája'],
        correctAnswer: 0,
        explanation: 'A hasonlósági arány definíció szerint a képszakasz és a megfelelő eredeti szakasz hosszának hányadosa: λ = a\' / a.'
      },
      {
        id: 2,
        question: 'Ha egy középpontos nagyítás aránya λ = 3, hányszorosára változik a síkidom területe?',
        options: ['3-szorosára', '6-szorosára', '9-szeresére', '27-szeresére'],
        correctAnswer: 2,
        explanation: 'Hasonló síkidomok területe a hasonlósági arány négyzetével skálázódik: T\' / T = λ² = 3² = 9.'
      },
      {
        id: 3,
        question: 'Melyik pont fixpontja minden középpontos hasonlóságnak?',
        options: ['A hasonlóság középpontja (O)', 'Az origó', 'A súlypont', 'Nincs fixpontja'],
        correctAnswer: 0,
        explanation: 'A hasonlóság középpontjának (O) képe önmaga, így O mindig fixpont.'
      },
      {
        id: 4,
        question: 'Milyen transzformáció adódik, ha a középpontos hasonlóság aránya λ = -1?',
        options: ['Tengelyes tükrözés', 'Középpontos tükrözés (pontra tükrözés)', 'Identitás', 'Eltolás'],
        correctAnswer: 1,
        explanation: 'Ha λ = -1, a középpontos hasonlóság megegyezik az O pontra vonatkozó középpontos tükrözéssel.'
      },
      {
        id: 5,
        question: 'Mikor mondjuk két síkidomra, hogy hasonlók?',
        options: ['Ha megfelelő oldalaik aránya állandó és megfelelő szögeik egyenlők', 'Ha területük megegyezik', 'Ha van közös csúcsuk', 'Ha kerületük egyenlő'],
        correctAnswer: 0,
        explanation: 'Két alakzat hasonló, ha létezik olyan hasonlósági transzformáció, amely az egyiket a másikba viszi, vagyis megfelelő oldalaik aránya állandó és megfelelő szögeik páronként egyenlők.'
      },
      {
        id: 6,
        question: 'Hogyan aránylanak egymáshoz hasonló síkidomok kerületei?',
        options: ['λ² arányban', 'λ arányban (megegyezik a hasonlóság arányával)', '√λ arányban', 'Mindig egyenlők'],
        correctAnswer: 1,
        explanation: 'A kerületek aránya megegyezik a hasonlóság lineáris arányával: K\' / K = λ.'
      },
      {
        id: 7,
        question: 'Melyik az I. háromszöghasonlósági alapeset (sz-sz)?',
        options: ['Két szög páronként egyenlő', 'Két oldal egyenlő', 'Minden oldal egyenlő', 'Egy szög és egy oldal egyenlő'],
        correctAnswer: 0,
        explanation: 'Az I. alapeset szerint két háromszög hasonló, ha két-két belső szögük páronként egyenlő (sz-sz).'
      },
      {
        id: 8,
        question: 'Melyik az a síkidompár, amelyik MINDIG hasonló egymáshoz?',
        options: ['Két téglalap', 'Két szabályos háromszög', 'Két rombusz', 'Két húrtrapéz'],
        correctAnswer: 1,
        explanation: 'Bármely két szabályos háromszög minden belső szöge 60°, oldalaik egyenlők, így mindig hasonlók.'
      },
      {
        id: 9,
        question: 'Mit mond ki a háromszög középvonal-tétele?',
        options: ['A középvonal fele a párhuzamos oldalnak és párhuzamos vele', 'A középvonal merőleges az oldalra', 'A középvonal kétszerese az oldalnak', 'A középvonal felezi a szemközti szöget'],
        correctAnswer: 0,
        explanation: 'A háromszög középvonala párhuzamos a harmadik oldallal, és hossza pontosan fele a harmadik oldalénak.'
      },
      {
        id: 10,
        question: 'Milyen arányban osztja a háromszög súlypontja a súlyvonalakat?',
        options: ['1 : 1 arányban (felezi)', '2 : 1 arányban a csúcstól számítva', '3 : 1 arányban', '1 : 2 arányban a csúcstól számítva'],
        correctAnswer: 1,
        explanation: 'A háromszög súlypontja a csúcstól számítva 2 : 1 arányban osztja a súlyvonalakat.'
      },
      {
        id: 11,
        question: 'Mi a magasságtétel képlete derékszögű háromszögben?',
        options: ['m = √(p · q)', 'm = (p + q) / 2', 'm = p · q', 'm = √(p² + q²)'],
        correctAnswer: 0,
        explanation: 'A magasságtétel szerint az átfogóhoz tartozó magasság az átfogószeletek mértani közepe: m = √(p · q).'
      },
      {
        id: 12,
        question: 'Mi a befogótétel képlete az a befogóra?',
        options: ['a = √(p · c)', 'a = √(q · c)', 'a = p · c', 'a = (p + c) / 2'],
        correctAnswer: 0,
        explanation: 'A befogótétel szerint a² = p · c, azaz a = √(p · c).'
      },
      {
        id: 13,
        question: 'Ha a hasonlósági arány 0 < λ < 1, akkor a transzformáció:',
        options: ['Valódi nagyítás', 'Valódi kicsinyítés', 'Egybevágóság', 'Tengelyes tükrözés'],
        correctAnswer: 1,
        explanation: 'Ha 0 < λ < 1, a képalakzat minden mérete kisebb az eredetinél, tehát valódi kicsinyítés.'
      },
      {
        id: 14,
        question: 'Mi a térkép méretaránya, ha 1 cm a térképen 500 m-nek felel meg a valóságban?',
        options: ['1 : 500', '1 : 5 000', '1 : 50 000', '1 : 500 000'],
        correctAnswer: 2,
        explanation: '500 m = 50 000 cm, így az arány 1 : 50 000.'
      },
      {
        id: 15,
        question: 'Hány hasonló derékszögű háromszög keletkezik, ha meghúzzuk az átfogóhoz tartozó magasságot?',
        options: ['2', '3 (az eredeti és a két részháromszög)', '4', '1'],
        correctAnswer: 1,
        explanation: 'Az eredeti háromszög és a magasság által létrehozott két kisebb derékszögű háromszög mind hasonló egymáshoz (összesen 3).'
      },
      {
        id: 16,
        question: 'Két négyzet mindig hasonló egymáshoz?',
        options: ['Igen, mindig', 'Csak ha területük egyenlő', 'Csak ha oldalaik párhuzamosak', 'Nem, soha'],
        correctAnswer: 0,
        explanation: 'Minden négyzet szögei 90°-osak és oldalaik egyenlők, így bármely két négyzet mindig hasonló.'
      },
      {
        id: 17,
        question: 'Két kör mindig hasonló egymáshoz?',
        options: ['Igen, mindig', 'Csak ha sugaruk egyenlő', 'Csak ha koncentrikusak', 'Nem'],
        correctAnswer: 0,
        explanation: 'Minden kör alakja azonos, egyetlen méretük (a sugár) arányában mindig hasonlók egymáshoz.'
      },
      {
        id: 18,
        question: 'Ha egy háromszög mindhárom középvonalát behúzzuk, hány hasonló háromszögre bomlik az eredeti?',
        options: ['2', '3', '4 egybevágó (és az eredetihez hasonló) háromszögre', '6'],
        correctAnswer: 2,
        explanation: 'A három középvonal a háromszöget 4 egybevágó részháromszögre bontja, melyek mindegyike λ = 1/2 arányban hasonló az eredetihez.'
      },
      {
        id: 19,
        question: 'Egy háromszög területe 40 cm². Mennyi a 3 középvonal által határolt belső háromszög területe?',
        options: ['20 cm²', '10 cm²', '5 cm²', '8 cm²'],
        correctAnswer: 1,
        explanation: 'Mivel λ = 1/2, a területarány λ² = 1/4. Tehát 40 / 4 = 10 cm².'
      },
      {
        id: 20,
        question: 'Mit állít a párhuzamos szelőszakaszok tétele?',
        options: ['A párhuzamos szakaszok aránya megegyezik a csúcstól mért távolságok arányával', 'A párhuzamosak mindig egyenlő hosszúak', 'A szelők merőlegesek a szárakra', 'A metszéspont felezi a szárakat'],
        correctAnswer: 0,
        explanation: 'A párhuzamos szelőszakaszok aránya megegyezik a szög csúcsától mért megfelelő távolságok arányával.'
      },
      {
        id: 21,
        question: 'Ha a hasonlósági arány λ = 2, hogyan változik egy test térfogata?',
        options: ['2-szeresére', '4-szeresére', '8-szorosára', '16-szorosára'],
        correctAnswer: 2,
        explanation: 'Hasonló testek térfogata a hasonlóság köbével skálázódik: V\' / V = λ³ = 2³ = 8.'
      },
      {
        id: 22,
        question: 'Mit nevezünk két pozitív szám mértani közepének?',
        options: ['A két szám szorzatának négyzetgyökét: √(a · b)', 'A két szám összegének felét: (a + b) / 2', 'A két szám különbségét', 'A két szám hányadosát'],
        correctAnswer: 0,
        explanation: 'Két nemnegatív szám mértani közepe definíció szerint szorzatuk négyzetgyöke: √(a · b).'
      },
      {
        id: 23,
        question: 'Igaz-e, hogy két rombusz mindig hasonló egymáshoz?',
        options: ['Igen, mert minden oldaluk egyenlő', 'Nem, csak akkor, ha egy belső szögük nagysága megegyezik', 'Nem, a rombuszok sosem hasonlók', 'Csak ha négyzetek'],
        correctAnswer: 1,
        explanation: 'Bár oldalaik aránya azonos, a szögeik tetszőlegesek lehetnek, így csak akkor hasonlók, ha egy szögük egyenlő.'
      },
      {
        id: 24,
        question: 'Ha a hasonlóság aránya λ = 1, a transzformáció:',
        options: ['Egybevágóság', 'Nagyítás', 'Kicsinyítés', 'Párhuzamos eltolás kizárólag'],
        correctAnswer: 0,
        explanation: 'Ha |λ| = 1, a transzformáció távolságtartó, vagyis egybevágóság.'
      },
      {
        id: 25,
        question: 'Egy trapéz párhuzamos alapjai 10 cm és 30 cm. Mennyi a hasonlósági arány az átlók által képzett két alapon fekvő háromszög között?',
        options: ['1 : 2', '1 : 3', '1 : 9', '3 : 10'],
        correctAnswer: 1,
        explanation: 'A két háromszög hasonló (sz-sz alapeset), arányuk az alapok hányadosa: 10 / 30 = 1/3.'
      },
      {
        id: 26,
        question: 'Melyik alapeset mondja ki: két háromszög hasonló, ha megfelelő oldalaik aránya megegyezik?',
        options: ['I. alapeset (sz-sz)', 'II. alapeset (o-o-o)', 'III. alapeset (o-sz-o)', 'IV. alapeset (o-o-sz)'],
        correctAnswer: 1,
        explanation: 'A II. alapeset az oldalak arányának egyenlőségét követeli meg: a\'/a = b\'/b = c\'/c (o-o-o).'
      },
      {
        id: 27,
        question: 'Hogyan határozzuk meg az átfogó hosszát a vetületek ismeretében?',
        options: ['c = p + q', 'c = p · q', 'c = √(p² + q²)', 'c = p - q'],
        correctAnswer: 0,
        explanation: 'A magasság talppontja az átfogót p és q részekre bontja, így c = p + q.'
      },
      {
        id: 28,
        question: 'Ha egy épület tervrajzának méretaránya 1 : 100, hány cm-es a tervrajzon egy 4 méteres fal?',
        options: ['40 cm', '4 cm', '0,4 cm', '400 cm'],
        correctAnswer: 1,
        explanation: '4 m = 400 cm. 400 / 100 = 4 cm a tervrajzon.'
      },
      {
        id: 29,
        question: 'Melyik tétel bizonyítható közvetlenül a befogótétel két egyenletének összeadásából?',
        options: ['Thálész-tétel', 'Pitagorasz-tétel', 'Magasságtétel', 'Szelőtétel'],
        correctAnswer: 1,
        explanation: 'a² + b² = pc + qc = (p + q)c = c · c = c², ami pontosan a Pitagorasz-tétel!'
      },
      {
        id: 30,
        question: 'Ha egy négyszög oldalfelező pontjait összekötjük, milyen négyszöget kapunk?',
        options: ['Tetszőleges négyszöget', 'Paralelogrammát (Varignon-tétel)', 'Mindig téglalapot', 'Mindig trapézt'],
        correctAnswer: 1,
        explanation: 'A Varignon-tétel szerint bármely négyszög oldalfelező pontjai paralelogrammát alkotnak.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Geometriai számítások és gyakorlati feladatok',
    description: '30 számításos feladat: optikai mérések, gúlametszetek, trapézok, háromszögek kerülete és területe.',
    range: '31–60. kérdés',
    focus: 'Numerikus számítások, szöveges feladatok, metrikus tételek alkalmazása',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-800 dark:text-indigo-300',
    accentGradient: 'from-purple-500 to-indigo-600',
    questions: [
      {
        id: 31,
        question: 'Egy háromszög oldalai 14 cm, 28 cm és 35 cm. Hozzá hasonló háromszög kerülete K\' = 7,7 cm. Mekkorák az oldalai?',
        options: ['1,4 cm; 2,8 cm; 3,5 cm', '0,7 cm; 1,4 cm; 1,75 cm', '2 cm; 4 cm; 5 cm', '1,1 cm; 2,2 cm; 3,3 cm'],
        correctAnswer: 0,
        explanation: 'Az eredeti háromszög kerülete K = 14 + 28 + 35 = 77 cm. λ = 7,7 / 77 = 0,1. Az oldalak: 1,4 cm; 2,8 cm; 3,5 cm.'
      },
      {
        id: 32,
        question: 'Járókelő szemmagassága 184 cm, távolsága a tükörtől 1,6 m, a lámpa távolsága a tükörtől 5,6 m. Milyen magas a lámpa?',
        options: ['5,12 m', '6,44 m', '6,80 m', '7,20 m'],
        correctAnswer: 1,
        explanation: 'M / 184 = 5,6 / 1,6 = 3,5 ➔ M = 184 · 3,5 = 644 cm = 6,44 m.'
      },
      {
        id: 33,
        question: 'Egy 12 cm magasságú négyzet alapú gúlát a magasság felső harmadolópontjánál elvágunk. Mekkora a kis gúla alapéle, ha a nagyé 12 cm?',
        options: ['3 cm', '4 cm', '6 cm', '8 cm'],
        correctAnswer: 1,
        explanation: 'Felső harmad: m₁ = 4 cm. λ = 4 / 12 = 1/3. A kis alapél: 12 · (1/3) = 4 cm.'
      },
      {
        id: 34,
        question: 'A fenti gúla feladatban mekkora a kis gúla és a nagy gúla alapterületének aránya?',
        options: ['1 : 3', '1 : 6', '1 : 9', '1 : 27'],
        correctAnswer: 2,
        explanation: 'A területek aránya λ² = (1/3)² = 1/9.'
      },
      {
        id: 35,
        question: 'Egy csonkagúla alapja 400 cm², fedőlapja 64 cm², magassága 21 cm. Mekkora a kiegészítő gúla magassága (x)?',
        options: ['10 cm', '12 cm', '14 cm', '16 cm'],
        correctAnswer: 2,
        explanation: 'λ = √(400 / 64) = 20 / 8 = 2,5. (x + 21) / x = 2,5 ➔ x + 21 = 2,5x ➔ 1,5x = 21 ➔ x = 14 cm.'
      },
      {
        id: 36,
        question: 'Egy derékszögű háromszög átfogóját a magasság p = 5,4 cm és q = 9,6 cm részekre osztja. Mekkora a magasság (m)?',
        options: ['6,8 cm', '7,2 cm', '7,5 cm', '8,0 cm'],
        correctAnswer: 1,
        explanation: 'm = √(5,4 · 9,6) = √51,84 = 7,2 cm.'
      },
      {
        id: 37,
        question: 'A fenti háromszögben (p = 5,4 cm, q = 9,6 cm) mekkora az a befogó hossza?',
        options: ['8 cm', '9 cm', '10 cm', '12 cm'],
        correctAnswer: 1,
        explanation: 'c = 5,4 + 9,6 = 15 cm. a = √(p · c) = √(5,4 · 15) = √81 = 9 cm.'
      },
      {
        id: 38,
        question: 'A fenti háromszögben (p = 5,4 cm, q = 9,6 cm) mekkora a b befogó hossza?',
        options: ['10 cm', '11 cm', '12 cm', '13 cm'],
        correctAnswer: 2,
        explanation: 'b = √(q · c) = √(9,6 · 15) = √144 = 12 cm.'
      },
      {
        id: 39,
        question: 'Mekkora a fenti háromszög (a = 9 cm, b = 12 cm, c = 15 cm) körülírt körének sugara?',
        options: ['6 cm', '7,5 cm', '9 cm', '15 cm'],
        correctAnswer: 1,
        explanation: 'Thálész tétele szerint a derékszögű háromszög körülírt körének átmérője az átfogó: R = c / 2 = 15 / 2 = 7,5 cm.'
      },
      {
        id: 40,
        question: 'Egy derékszögű háromszög átfogója c = 16 cm, egyik befogója a = 15 cm. Mekkora a p vetület?',
        options: ['12,5 cm', '14,0625 cm', '13,5 cm', '15,25 cm'],
        correctAnswer: 1,
        explanation: 'a² = p · c ➔ 15² = p · 16 ➔ 225 = 16p ➔ p = 225 / 16 = 14,0625 cm.'
      },
      {
        id: 41,
        question: 'Egy trapéz alapjai AB = 5, CD = 2, szárai AD = 2,7, BC = 2,1. Szárainak meghosszabbítása P-ben metszi egymást. Mekkora DP = x?',
        options: ['1,2', '1,4', '1,8', '2,0'],
        correctAnswer: 2,
        explanation: 'x / (x + 2,7) = 2 / 5 ➔ 5x = 2x + 5,4 ➔ 3x = 5,4 ➔ x = 1,8.'
      },
      {
        id: 42,
        question: 'A fenti trapéz feladatban mekkora CP = y szakasz?',
        options: ['1,1', '1,4', '1,6', '1,9'],
        correctAnswer: 1,
        explanation: 'y / (y + 2,1) = 2 / 5 ➔ 5y = 2y + 4,2 ➔ 3y = 4,2 ➔ y = 1,4.'
      },
      {
        id: 43,
        question: 'Hányadrésze a fenti trapézban a DCP kiegészítő háromszög területe az ABP háromszög területének?',
        options: ['2 / 5', '4 / 25 = 16%', '1 / 4', '4 / 21'],
        correctAnswer: 1,
        explanation: 'T(DCP) / T(ABP) = (2 / 5)² = 4 / 25 = 0,16 (16%).'
      },
      {
        id: 44,
        question: 'Hányadrésze a kiegészítő háromszög területe a TRAPÉZ területének?',
        options: ['4 / 25', '4 / 21', '2 / 3', '5 / 21'],
        correctAnswer: 1,
        explanation: 'A trapéz területe T(ABP) - T(DCP) = 21/25 T(ABP). Tehát T(DCP) / T(trapéz) = (4/25) / (21/25) = 4 / 21.'
      },
      {
        id: 45,
        question: 'Egy trapéz alapjai 24 mm és 96 mm. Az átlók metszéspontján át az alapokkal párhuzamos szakasz egyik fele EK. Mekkora EK?',
        options: ['12 mm', '16 mm', '19,2 mm', '24 mm'],
        correctAnswer: 2,
        explanation: 'Hasonlóság: AK/KC = 96/24 = 4. EK/CD = AK/AC = 4/5 ➔ EK = (4/5) · 24 = 19,2 mm.'
      },
      {
        id: 46,
        question: 'Mekkora a fenti feladatban a teljes EF párhuzamos szakasz hossza?',
        options: ['24 mm', '32 mm', '38,4 mm', '48 mm'],
        correctAnswer: 2,
        explanation: 'KF = EK = 19,2 mm, így EF = 19,2 + 19,2 = 38,4 mm (ez a két alap harmonikus közepe: 2 · 96 · 24 / 120 = 38,4 mm).'
      },
      {
        id: 47,
        question: 'Egy szabályos hatszög oldala a = 6 cm. Mekkora a legrövidebb átlója?',
        options: ['6 cm', '6√2 cm', '6√3 ≈ 10,39 cm', '12 cm'],
        correctAnswer: 2,
        explanation: 'A szabályos hatszög két szomszédos csúcsát összekötő rövid átló hossza d = 2 · a · cos(30°) = a√3 = 6√3 ≈ 10,39 cm.'
      },
      {
        id: 48,
        question: 'Egy háromszög oldalát 7 egyenlő részre osztjuk, és párhuzamosokat húzunk az alappal. Hányadrésze a legkisebb háromszög területe a teljes háromszögnek?',
        options: ['1 / 7', '1 / 14', '1 / 49', '1 / 21'],
        correctAnswer: 2,
        explanation: 'A legfelső kis háromszög hasonlósági aránya λ = 1/7, területe λ² = (1/7)² = 1/49-ed része az egésznek.'
      },
      {
        id: 49,
        question: 'Egy derékszögű háromszög átfogóját a magasság 2 cm és 8 cm szakaszokra osztja. Mekkora a háromszög területe?',
        options: ['16 cm²', '20 cm²', '24 cm²', '32 cm²'],
        correctAnswer: 1,
        explanation: 'c = 2 + 8 = 10 cm. m = √(2 · 8) = √16 = 4 cm. T = (c · m) / 2 = (10 · 4) / 2 = 20 cm².'
      },
      {
        id: 50,
        question: 'A fenti háromszögben (p = 2 cm, q = 8 cm) mekkora a rövidebb befogó?',
        options: ['2 cm', '√20 ≈ 4,47 cm', '4 cm', '5 cm'],
        correctAnswer: 1,
        explanation: 'a = √(p · c) = √(2 · 10) = √20 = 2√5 ≈ 4,47 cm.'
      },
      {
        id: 51,
        question: 'Egy 1,8 m magas ember árnyéka 2,4 m. Ugyanekkor egy fa árnyéka 16 m. Milyen magas a fa?',
        options: ['10 m', '12 m', '14 m', '15 m'],
        correctAnswer: 1,
        explanation: 'H / 16 = 1,8 / 2,4 = 0,75 ➔ H = 16 · 0,75 = 12 m.'
      },
      {
        id: 52,
        question: 'Két hasonló háromszög területe 50 cm² és 72 cm². Mennyi a hasonlóság aránya (λ)?',
        options: ['5 / 6', '25 / 36', '6 / 5', '1,44'],
        correctAnswer: 0,
        explanation: 'T₁ / T₂ = 50 / 72 = 25 / 36 ➔ λ = √(25 / 36) = 5 / 6.'
      },
      {
        id: 53,
        question: 'Egy 6 m széles vetítővászonra 3 m távolságból 2 m széles képet vetít a projektor. Milyen messzire kell tenni, hogy a kép kitöltse a 6 m-es vásznat?',
        options: ['6 m', '9 m', '12 m', '18 m'],
        correctAnswer: 1,
        explanation: 'A szélesség és a távolság arányos: d / 6 = 3 / 2 ➔ d = 6 · 1,5 = 9 m.'
      },
      {
        id: 54,
        question: 'Egy háromszög súlyvonala 18 cm hosszú. Milyen távolságra van a súlypont a csúcstól?',
        options: ['6 cm', '9 cm', '12 cm', '15 cm'],
        correctAnswer: 2,
        explanation: 'A súlypont 2 : 1 arányban osztja a súlyvonalat: a csúcstól 2/3 részre van, azaz (2/3) · 18 = 12 cm.'
      },
      {
        id: 55,
        question: 'A fenti háromszögben milyen távolságra van a súlypont az oldal felezőpontjától?',
        options: ['6 cm', '9 cm', '12 cm', '3 cm'],
        correctAnswer: 0,
        explanation: 'A felezőpont felé eső rész 1/3: (1/3) · 18 = 6 cm.'
      },
      {
        id: 56,
        question: 'Egy derékszögű háromszög befogói 6 cm és 8 cm. Mekkora az átfogóhoz tartozó magasság (m)?',
        options: ['4,8 cm', '5,0 cm', '5,2 cm', '4,5 cm'],
        correctAnswer: 0,
        explanation: 'Átfogó c = √(6² + 8²) = 10 cm. Terület T = (6 · 8) / 2 = 24 cm². m = 2T / c = 48 / 10 = 4,8 cm.'
      },
      {
        id: 57,
        question: 'A fenti háromszögben (a = 6, b = 8, c = 10) mekkora a p átfogószelet?',
        options: ['3,2 cm', '3,6 cm', '4,0 cm', '6,4 cm'],
        correctAnswer: 1,
        explanation: 'a² = p · c ➔ 36 = p · 10 ➔ p = 3,6 cm.'
      },
      {
        id: 58,
        question: 'Egy derékszögű háromszög átfogóhoz tartozó magassága 6 cm, egyik szelete p = 4 cm. Mekkora az átfogó (c)?',
        options: ['9 cm', '13 cm', '15 cm', '12 cm'],
        correctAnswer: 1,
        explanation: 'm² = p · q ➔ 36 = 4 · q ➔ q = 9 cm. c = p + q = 4 + 9 = 13 cm.'
      },
      {
        id: 59,
        question: 'Egy négyszög területe 84 cm². Mekkora az oldalfelező pontjai által meghatározott Varignon-paralelogramma területe?',
        options: ['21 cm²', '42 cm²', '63 cm²', '56 cm²'],
        correctAnswer: 1,
        explanation: 'A Varignon-tétel szerint a paralelogramma területe pontosan fele a négyszög területének: 84 / 2 = 42 cm².'
      },
      {
        id: 60,
        question: 'Ha egy négyszög átlói merőlegesek egymásra, milyen alakzatot határoznak meg az oldalfelező pontjai?',
        options: ['Rombuszt', 'Téglalapot', 'Trapézt', 'Általános paralelogrammát'],
        correctAnswer: 1,
        explanation: 'Mivel a paralelogramma oldalai az átlókkal párhuzamosak, ha az átlók merőlegesek, az oldalak is merőlegesek egymásra ➔ téglalap.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Emelt szintű tételek, bizonyítások és elméleti szintézis',
    description: '30 haladó feladat: AM-GM egyenlőtlenség, térbeli arányok, trapéz harmonikus közepe, igaz-hamis kérdések.',
    range: '61–90. kérdés',
    focus: 'Matematikai precizitás, tételes bizonyítások, térbeli hasonlóság',
    badgeBg: 'bg-rose-100 dark:bg-rose-950/60',
    badgeBorder: 'border-rose-200 dark:border-rose-800',
    badgeText: 'text-rose-800 dark:text-rose-300',
    accentGradient: 'from-indigo-600 to-violet-700',
    questions: [
      {
        id: 61,
        question: 'Hogyan bizonyítható geometriailag a számtani és mértani közép közötti √(ab) ≤ (a + b) / 2 egyenlőtlenség?',
        options: ['Thálész-félkörben a talppontból emelt magasság (√(ab)) legfeljebb akkora, mint a kör sugara ((a+b)/2)', 'Pitagorasz-tétellel a derékszögű háromszögben', 'A kerületi szögek tételével', 'Középvonal-tétellel'],
        correctAnswer: 0,
        explanation: 'Thálész-félkörben az átmérő c = a + b, a sugár r = (a + b)/2. A talppontból emelt magasság m = √(ab). Mivel m ≤ r a körben, ezért √(ab) ≤ (a + b)/2.'
      },
      {
        id: 62,
        question: 'Mikor áll fenn egyenlőség a számtani és mértani közép egyenlőtlenségében: √(ab) = (a + b) / 2?',
        options: ['Ha a = b (a háromszög egyenlő szárú derékszögű)', 'Ha a = 2b', 'Ha a + b = 1', 'Soha nem állhat fenn'],
        correctAnswer: 0,
        explanation: 'Egyenlőség pontosan akkor teljesül, ha a magasság megegyezik a sugárral, vagyis a talppont a kör középpontja: a = b.'
      },
      {
        id: 63,
        question: 'A Pyraminx szabályos tetraéder élhosszát másfélszeresére (λ = 1,5) növeljük. Hányszorosára nő a test teljes felszíne?',
        options: ['1,5-szeresére', '2,25-szörösére', '3,375-szeresére', '4,5-szeresére'],
        correctAnswer: 1,
        explanation: 'A felszín síkidomok területeinek összege, így λ² = 1,5² = 2,25-szörösére változik.'
      },
      {
        id: 64,
        question: 'A fenti Pyraminx feladatban hányszorosára változik a test térfogata?',
        options: ['2,25-szörösére', '3,0-szeresére', '3,375-szeresére (1,5³)', '4,5-szeresére'],
        correctAnswer: 2,
        explanation: 'A térfogat a hasonlóság köbével változik: V\' / V = λ³ = 1,5³ = 3,375-szörösére.'
      },
      {
        id: 65,
        question: 'Milyen alakzatot határoznak meg egy olyan négyszög oldalfelező pontjai, amelynek átlói EGYENLŐ hosszúak?',
        options: ['Téglalapot', 'Rombuszt', 'Négyzetet', 'Trapézt'],
        correctAnswer: 1,
        explanation: 'A paralelogramma oldalai az átlók felével egyenlők. Mivel az átlók egyenlők, a paralelogramma minden oldala egyenlő ➔ rombusz.'
      },
      {
        id: 66,
        question: 'Mikor alkotnak egy négyszög oldalfelező pontjai NÉGYZETET?',
        options: ['Ha az átlók merőlegesek és egyenlő hosszúak', 'Ha a négyszög deltoid', 'Ha a négyszög rombusz', 'Bármely téglalap esetén'],
        correctAnswer: 0,
        explanation: 'Téglalap feltétele (átlók merőlegesek) ÉS rombusz feltétele (átlók egyenlők) egyszerre kell teljesüljön ➔ négyzet.'
      },
      {
        id: 67,
        question: 'Egy trapéz átlóinak metszéspontján átmenő, alapokkal párhuzamos szakasz hossza az alapok milyen közepe?',
        options: ['Számtani közepe', 'Mértani közepe', 'Harmonikus közepe: 2ac / (a + c)', 'Négyzetes közepe'],
        correctAnswer: 2,
        explanation: 'A tétel szerint a szakaszt az átlómetszéspont felezi, és mindkét fél ac/(a+c), így az egész szakasz 2ac/(a+c), a két alap harmonikus közepe.'
      },
      {
        id: 68,
        question: 'Döntsd el: Két húrtrapéz hasonló, ha megegyeznek szögeik nagyságában?',
        options: ['Igaz', 'Hamis (az alapok és szárak aránya függetlenül változhat a szögektől)', 'Csak ha derékszögűek', 'Csak ha területük egyenlő'],
        correctAnswer: 1,
        explanation: 'Hamis! Húrtrapézoknál a szögek egyezése csak azt rögzíti, hogy a szárak milyen szögben hajlanak az alapokhoz, de az alapok egymáshoz viszonyított aránya tetszőleges lehet.'
      },
      {
        id: 69,
        question: 'Döntsd el: Két derékszögű háromszög mindig hasonló egymáshoz?',
        options: ['Igaz', 'Hamis (csak akkor, ha egy hegyesszögük nagysága megegyezik)', 'Csak ha egyenlő szárúak', 'Mindig igaz a derékszög miatt'],
        correctAnswer: 1,
        explanation: 'Hamis! A derékszög mellett szükség van még legalább egy hegyesszög egyenlőségére (sz-sz alapeset).'
      },
      {
        id: 70,
        question: 'Döntsd el: Két paralelogramma mindig hasonló egymáshoz?',
        options: ['Igaz', 'Hamis (az oldalarányok és a belső szögek is eltérhetnek)', 'Csak ha rombuszok', 'Igaz, ha átlóik egyenlők'],
        correctAnswer: 1,
        explanation: 'Hamis! Két paralelogramma szögei és szomszédos oldalainak aránya is teljesen független egymástól.'
      },
      {
        id: 71,
        question: 'Döntsd el: Két háromszög hasonló, ha megegyeznek két oldal arányában és egy szögük nagyságában?',
        options: ['Mindig igaz', 'Hamis (a szögnek vagy a két oldal által közbezártnak, vagy a nagyobbikkal szemköztinek kell lennie)', 'Csak tompaszög esetén igaz', 'Csak derékszögre igaz'],
        correctAnswer: 1,
        explanation: 'Hamis! Ez a IV. alapeset csapdája: a szögnek a két oldal által KÖZBEZÁRTNAK (III. eset), vagy a kettő közül a NAGYOBBIKKAL SZEMKÖZTINEK (IV. eset) kell lennie.'
      },
      {
        id: 72,
        question: 'Döntsd el: Két egyenlő szárú háromszög hasonló, ha van egyenlő nagyságú szögük?',
        options: ['Mindig igaz', 'Hamis (nem mindegy, hogy a szárszögük vagy az alapon fekvő szögük egyenlő-e)', 'Csak ha hegyesszögűek', 'Mindig hamis'],
        correctAnswer: 1,
        explanation: 'Hamis! Például ha az egyik szárszöge 40°, a másik alapon fekvő szöge 40°, akkor a szögeik (40°, 70°, 70°) és (40°, 40°, 100°), tehát nem hasonlók!'
      },
      {
        id: 73,
        question: 'Egy háromszög 3 súlyvonala a háromszöget 6 kisebb háromszögre bontja. Mit tudunk a területeikről?',
        options: ['Mind a 6 háromszög területe pontosan egyenlő (T / 6)', 'A csúcsokhoz közelebbiek területe nagyobb', 'A kerületeik egyenlők', 'Mindegyik területe T / 3'],
        correctAnswer: 0,
        explanation: 'Klasszikus tétel: a három súlyvonal által meghatározott mind a hat részháromszög területe egyenlő, az eredeti terület 1/6-a.'
      },
      {
        id: 74,
        question: 'Egy derékszögű háromszög átfogójához tartozó súlyvonala hossza s_c = 13 cm. Mekkora az átfogó?',
        options: ['13 cm', '26 cm', '39 cm', '6,5 cm'],
        correctAnswer: 1,
        explanation: 'Thálész tétele alapján a derékszögű háromszög körülírt körének középpontja az átfogó felezőpontja, így s_c = R = c / 2 ➔ c = 2 · 13 = 26 cm.'
      },
      {
        id: 75,
        question: 'Mi történik a sík orientációjával, ha a hasonlóság aránya negatív (λ < 0)?',
        options: ['Az orientáció változatlan marad', 'Az alakzat orientációja (körüljárási iránya) megfordul', 'Az alakzat elfajul egyenessé', 'A terület negatív lesz'],
        correctAnswer: 1,
        explanation: 'Két dimenzióban a negatív középpontos hasonlóság pontra tükrözéssel egyenértékű, ami síkban megőrzi az orientációt (180°-os forgatás).'
      },
      {
        id: 76,
        question: 'Egy kúp magasságát felére csökkentjük az alaplappal párhuzamos metszettel. Hányadrésze a levágott kis kúp térfogata az eredetinek?',
        options: ['1 / 2', '1 / 4', '1 / 8', '1 / 16'],
        correctAnswer: 2,
        explanation: 'λ = 1/2. Hasonló testek térfogataránya λ³ = (1/2)³ = 1/8.'
      },
      {
        id: 77,
        question: 'A fenti feladatban a csonkakúp térfogata hányadrésze az eredeti kúpnak?',
        options: ['1 / 8', '7 / 8', '3 / 4', '1 / 2'],
        correctAnswer: 1,
        explanation: 'V_csonka = V_eredeti - V_kis = V_eredeti - (1/8)V_eredeti = (7/8) V_eredeti.'
      },
      {
        id: 78,
        question: 'Egy trapéz párhuzamos alapjai 12 és 18. Átlói metszéspontja K. Milyen arányban osztja a K pont az átlókat?',
        options: ['1 : 1', '2 : 3', '4 : 9', '3 : 2'],
        correctAnswer: 1,
        explanation: 'Az átlók a párhuzamos alapok arányában osztják egymást: 12 / 18 = 2/3, azaz 2 : 3 arányban.'
      },
      {
        id: 79,
        question: 'Egy szakasz két részre osztásakor a kisebb rész úgy aránylik a nagyobbhoz, mint a nagyobb az egészhez. Mi ennek az aránynak a neve?',
        options: ['Mértani sorozat', 'Aranymetszés (Φ ≈ 0,618 vagy 1,618)', 'Harmonikus arány', 'Euler-arány'],
        correctAnswer: 1,
        explanation: 'Ez az aranymetszés klasszikus definíciója: x / (1 - x) = (1 - x) / 1 ➔ Φ ≈ 0,618 (vagy 1/Φ ≈ 1,618).'
      },
      {
        id: 80,
        question: 'Ha egy négyszög szemközti oldalfelező pontjait összekötjük, mi igaz a két összekötő szakaszra?',
        options: ['Mindig merőlegesek', 'Kölcsönösen felezik egymást', 'Egyenlő hosszúak', 'Párhuzamosak az oldalakkal'],
        correctAnswer: 1,
        explanation: 'Mivel az oldalfelező pontok paralelogrammát alkotnak, a szemközti felezőket összekötő szakaszok ennek a paralelogrammának az átlói, melyek felezik egymást.'
      },
      {
        id: 81,
        question: 'Egy háromszög területe T. A súlypontot összekötjük a 3 csúccsal. Mekkora a keletkező 3 háromszög területe?',
        options: ['T / 2', 'T / 3 mindegyiké', 'T / 4', 'Eltérő területek'],
        correctAnswer: 1,
        explanation: 'A súlypont a csúcsokkal összekötve a háromszöget 3 egyenlő területű részre osztja, mindegyik területe T / 3.'
      },
      {
        id: 82,
        question: 'Derékszögű háromszög átfogójához tartozó magassága m. Igaz-e, hogy m ≤ c / 2 mindig teljesül?',
        options: ['Igen, mindig (Thálész-tétel és AM-GM miatt)', 'Nem, m lehet nagyobb is c/2-nél', 'Csak egyenlő oldalú háromszögre igaz', 'Csak ha c páros szám'],
        correctAnswer: 0,
        explanation: 'Igaz, mert a háromszög Thálész-félkörbe írható, ahol a magasság nem haladhatja meg a kört sugarát (r = c/2).'
      },
      {
        id: 83,
        question: 'Egy deltoid oldalfelező pontjai milyen négyszöget határoznak meg?',
        options: ['Rombuszt', 'Téglalapot', 'Paralelogrammát általában', 'Trapézt'],
        correctAnswer: 1,
        explanation: 'A deltoid átlói merőlegesek egymásra, ezért a Varignon-paralelogramma szögei 90°-osak, tehát téglalap keletkezik.'
      },
      {
        id: 84,
        question: 'Egy téglalap oldalfelező pontjai milyen négyszöget határoznak meg?',
        options: ['Téglalapot', 'Rombuszt', 'Négyzetet', 'Trapézt'],
        correctAnswer: 1,
        explanation: 'A téglalap átlói egyenlő hosszúak, ezért a Varignon-paralelogramma oldalai egyenlők, vagyis rombusz keletkezik.'
      },
      {
        id: 85,
        question: 'Egy szabályos gúla magassága 15 cm, térfogata 270 cm³. A csúcstól 5 cm-re lévő párhuzamos síkkal elvágjuk. Mekkora a kis gúla térfogata?',
        options: ['90 cm³', '30 cm³', '10 cm³', '27 cm³'],
        correctAnswer: 2,
        explanation: 'λ = 5 / 15 = 1/3. V_kis = λ³ · V_nagy = (1/27) · 270 = 10 cm³.'
      },
      {
        id: 86,
        question: 'Két hasonló sokszög területe 48 cm² és 108 cm². Ha a kisebb kerülete 20 cm, mekkora a nagyobb kerülete?',
        options: ['25 cm', '30 cm', '35 cm', '45 cm'],
        correctAnswer: 1,
        explanation: 'T₁ / T₂ = 48 / 108 = 4 / 9 ➔ λ = √(4 / 9) = 2 / 3. K₂ = K₁ / λ = 20 / (2/3) = 30 cm.'
      },
      {
        id: 87,
        question: 'Melyik állítás HAMIS a középpontos hasonlóságról?',
        options: ['Egyenest egyenessel párhuzamos egyenesbe visz át', 'Szögtartó transzformáció', 'Távolságtartó transzformáció minden λ esetén', 'Kör képe mindig kör'],
        correctAnswer: 2,
        explanation: 'A középpontos hasonlóság csak akkor távolságtartó, ha |λ| = 1. Általában aránytartó, de nem távolságtartó.'
      },
      {
        id: 88,
        question: 'A koordináta-rendszerben az origó középponttal λ = -2 arányú hasonlóságot alkalmazunk. Mi lesz a P(3; -4) pont képe?',
        options: ['P\'(-6; 8)', 'P\'(6; -8)', 'P\'(-1,5; 2)', 'P\'(-6; -8)'],
        correctAnswer: 0,
        explanation: 'Origó középpontú nyújtásnál a koordináták λ-szorosukra változnak: P\'(3 · (-2); -4 · (-2)) = P\'(-6; 8).'
      },
      {
        id: 89,
        question: 'Egy háromszög oldalai a = 5, b = 6, c = 7. Hozzá hasonló háromszög leghosszabb oldala c\' = 21. Mekkora a területek aránya?',
        options: ['3 : 1', '6 : 1', '9 : 1', '27 : 1'],
        correctAnswer: 2,
        explanation: 'λ = 21 / 7 = 3. A területek aránya T\' / T = λ² = 3² = 9 : 1.'
      },
      {
        id: 90,
        question: 'Mi a hasonlósági transzformációk alaptulajdonsága a sík geometriájában?',
        options: ['Minden egyenest önmagába visz', 'Megőrzi a szakaszok arányát és a szögek nagyságát', 'Minden távolságot megőriz', 'Csak konvex alakzatokra értelmezhető'],
        correctAnswer: 1,
        explanation: 'A hasonlóság alapvető geometriai invariánsai: a szögtartás és a szakaszhosszak aránytartása (a/b = a\'/b\').'
      }
    ]
  }
};

export const SimilarityPracticeExamQuiz: React.FC<SimilarityPracticeExamQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-hasonlosag"
      subtopicId="gyakorlas-tudasproba"
      title="Hasonlóság – Fejezeti Összefoglaló Tudáspróba"
      subtitle="90 feladat 3 szinten (30 feladat/szint), átfogó fejezeti témazáró tudáspróba ábrákkal és beépített játékokkal!"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <SimilarityPracticeExamMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <SimilarityPracticeExamSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

