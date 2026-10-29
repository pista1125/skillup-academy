import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { GeometryReviewMatcher, matcherLevels } from './GeometryReviewMatcher';
import { GeometryReviewSorter, sorterLevels } from './GeometryReviewSorter';
import {
  ComprehensiveGeometryOverviewSVG,
  PythagorasAndSpecialTrianglesSVG,
  ThalesAndTangentsSummarySVG,
  TriangleAreaMasterFormulasSVG
} from './GeometryReviewFigures';
import {
  Layers,
  Sparkles,
  Compass,
  Circle,
  HelpCircle,
  Award,
  Calculator,
  Triangle,
  BookmarkCheck
} from 'lucide-react';

interface GeometryReviewQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Alapszámítások (Könnyű)',
    subtitle: '30 feladat: szögek, háromszög-egyenlőtlenség, Pitagorasz-alapok és nevezetes pontok.',
    range: '1 - 30. feladat',
    focus: 'A 12 alfejezet alapvető fogalmainak és képleteinek biztos ismerete',
    questions: [
      {
        id: 'grq1-1',
        questionTypeBadge: 'Belső Szögek Összege',
        question: 'Mennyi bármely síkbeli háromszög belső szögeinek összege?',
        options: ['180°', '360°', '90°', '270°'],
        correctAnswer: 0,
        hint: 'A három csúcsnál lévő belső szögek összege egy egyenesszöget ad ki.',
        explanation: 'Minden euklideszi síkbeli háromszögben a belső szögek összege pontosan 180°: α + β + γ = 180°.'
      },
      {
        id: 'grq1-2',
        questionTypeBadge: 'Külső Szögek Összege',
        question: 'Mennyi bármely háromszög külső szögeinek (csúcsonként egyet véve) összege?',
        options: ['360°', '180°', '540°', '720°'],
        correctAnswer: 0,
        hint: 'Minden konvex sokszög külső szögeinek összege azonos.',
        explanation: 'Bármely konvex sokszög, így a háromszög külső szögeinek összege mindig 360°.'
      },
      {
        id: 'grq1-3',
        questionTypeBadge: 'Szögszámítás',
        question: 'Egy háromszög két belső szöge 48° és 72°. Mekkora a harmadik belső szöge?',
        options: ['60°', '50°', '70°', '65°'],
        correctAnswer: 0,
        hint: '180° - (48° + 72°) = ?',
        explanation: '48° + 72° = 120°. A harmadik szög: 180° - 120° = 60°.'
      },
      {
        id: 'grq1-4',
        questionTypeBadge: 'Külső Szög Tétele',
        question: 'Egy háromszög két belső szöge 35° és 65°. Mekkora a harmadik csúcshoz tartozó külső szög?',
        options: ['100°', '80°', '110°', '90°'],
        correctAnswer: 0,
        hint: 'A külső szög tétel szerint a külső szög egyenlő a két nem mellette fekvő belső szög összegével.',
        explanation: 'A külső szög tétele alapján: γ\' = α + β = 35° + 65° = 100°.'
      },
      {
        id: 'grq1-5',
        questionTypeBadge: 'Háromszög-egyenlőtlenség',
        question: 'Az alábbi oldalhosszak közül melyikből szerkeszthető háromszög?',
        options: ['5 cm, 7 cm, 10 cm', '3 cm, 4 cm, 8 cm', '2 cm, 6 cm, 8 cm', '1 cm, 2 cm, 5 cm'],
        correctAnswer: 0,
        hint: 'A két rövidebb oldal összegének szigorúan nagyobbnak kell lennie a leghosszabbnál.',
        explanation: 'Az 5 + 7 = 12 > 10, így ebből szerkeszthető háromszög. A 3+4 < 8 és 2+6 = 8 nem elég.'
      },
      {
        id: 'grq1-6',
        questionTypeBadge: 'Pitagorasz-tétel',
        question: 'Melyik képlet fejezi ki helyesen a Pitagorasz-tételt az a, b befogójú és c átfogójú derékszögű háromszögre?',
        options: ['a² + b² = c²', 'a + b = c', 'a² + c² = b²', 'a² · b² = c²'],
        correctAnswer: 0,
        hint: 'A két befogó négyzetének összege egyenlő az átfogó négyzetével.',
        explanation: 'A Pitagorasz-tétel: a² + b² = c².'
      },
      {
        id: 'grq1-7',
        questionTypeBadge: 'Pitagoraszi Alapszámítás',
        question: 'Egy derékszögű háromszög befogói a = 6 cm és b = 8 cm. Mekkora a c átfogója?',
        options: ['10 cm', '14 cm', '12 cm', '9 cm'],
        correctAnswer: 0,
        hint: 'c = √(6² + 8²) = √(36 + 64).',
        explanation: 'c² = 6² + 8² = 36 + 64 = 100 ⇒ c = √100 = 10 cm (a 3-4-5 háromszög kétszerese).'
      },
      {
        id: 'grq1-8',
        questionTypeBadge: 'Pitagoraszi Befogó',
        question: 'Egy derékszögű háromszög átfogója 13 cm, egyik befogója 5 cm. Mekkora a másik befogója?',
        options: ['12 cm', '8 cm', '10 cm', '11 cm'],
        correctAnswer: 0,
        hint: 'b = √(13² - 5²) = √(169 - 25).',
        explanation: 'b² = 13² - 5² = 169 - 25 = 144 ⇒ b = √144 = 12 cm.'
      },
      {
        id: 'grq1-9',
        questionTypeBadge: 'Pitagorasz Megfordítása',
        question: 'Egy háromszög oldalai 9 cm, 12 cm és 15 cm. Milyen típusú ez a háromszög?',
        options: ['Derékszögű', 'Tompaszögű', 'Hegyesszögű', 'Nem létezik'],
        correctAnswer: 0,
        hint: 'Ellenőrizd: 9² + 12² egyenlő-e 15²-tel!',
        explanation: '9² + 12² = 81 + 144 = 225, és 15² = 225. Mivel a² + b² = c², a háromszög derékszögű.'
      },
      {
        id: 'grq1-10',
        questionTypeBadge: '45-45-90 Háromszög',
        question: 'Egy négyzet oldala 7 cm. Milyen hosszú az átlója?',
        options: ['7√2 cm', '14 cm', '7√3 cm', '10 cm'],
        correctAnswer: 0,
        hint: 'Az átló d = a√2.',
        explanation: 'A négyzet átlója a Pitagorasz-tétel szerint: d = √(a² + a²) = a√2 = 7√2 cm.'
      },
      {
        id: 'grq1-11',
        questionTypeBadge: '30-60-90 Háromszög',
        question: 'Egy 30°-60°-90° derékszögű háromszög átfogója 16 cm. Milyen hosszú a 30°-os szöggel szemközti befogója?',
        options: ['8 cm', '8√3 cm', '4 cm', '10 cm'],
        correctAnswer: 0,
        hint: 'A 30°-os szöggel szemközti befogó pontosan fele az átfogónak.',
        explanation: 'A 30°-os szöggel szemközti befogó a szabályos háromszög feléből adódóan: a = c / 2 = 16 / 2 = 8 cm.'
      },
      {
        id: 'grq1-12',
        questionTypeBadge: 'Körülírt Kör Középpontja',
        question: 'Mely vonalak metszéspontja határozza meg a háromszög körülírt körének O középpontját?',
        options: [
          'Az oldalfelező merőlegesek',
          'A belső szögfelezők',
          'A magasságvonalak',
          'A súlyvonalak'
        ],
        correctAnswer: 0,
        hint: 'A csúcsoktól kell egyenlő távolságra lennie, ezért szakaszfelező merőlegesek kellenek.',
        explanation: 'A körülírt kör középpontja az oldalfelező merőlegesek metszéspontja, mivel ez egyenlő távol van mindhárom csúcstól.'
      },
      {
        id: 'grq1-13',
        questionTypeBadge: 'Beírt Kör Középpontja',
        question: 'Mely vonalak metszéspontja a háromszög beírt körének I középpontja?',
        options: [
          'A belső szögfelezők',
          'Az oldalfelező merőlegesek',
          'A súlyvonalak',
          'A középvonalak'
        ],
        correctAnswer: 0,
        hint: 'Az oldalaktól kell egyenlő távolságra lennie.',
        explanation: 'A beírt kör középpontja a belső szögfelezők metszéspontja, mivel ez egyenlő távolságra van mindhárom oldaltól.'
      },
      {
        id: 'grq1-14',
        questionTypeBadge: 'Súlypont Tulajdonsága',
        question: 'Milyen arányban osztja a súlypont a súlyvonalat a csúcstól mérve?',
        options: ['2 : 1', '1 : 1', '3 : 1', '1 : 2'],
        correctAnswer: 0,
        hint: 'A csúcs felé eső rész a hosszabb (kétszerese a felezőpont felé esőnek).',
        explanation: 'A súlypont a súlyvonalat a csúcstól számítva 2 : 1 arányban osztja fel.'
      },
      {
        id: 'grq1-15',
        questionTypeBadge: 'Súlyvonal Számítás',
        question: 'Egy súlyvonal teljes hossza 18 cm. Milyen hosszú a csúcstól a súlypontig tartó szakasz?',
        options: ['12 cm', '6 cm', '9 cm', '10 cm'],
        correctAnswer: 0,
        hint: 'A teljes hossz 2/3 része esik a csúcs felé.',
        explanation: 'A csúcs felőli szakasz: 18 · (2/3) = 12 cm. (A maradék rész 6 cm).'
      },
      {
        id: 'grq1-16',
        questionTypeBadge: 'Magasságpont Elhelyezkedése',
        question: 'Hol található egy derékszögű háromszög M magasságpontja?',
        options: [
          'A derékszögű csúcsban',
          'Az átfogó felezőpontjában',
          'A háromszög belsejében',
          'A háromszögön kívül'
        ],
        correctAnswer: 0,
        hint: 'A két befogó maga is magasságvonal, így a metszéspontjuk a derékszögű csúcs.',
        explanation: 'Derékszögű háromszögben a két befogó merőleges egymásra, így az M magasságpont pontosan a derékszögű csúcsban van.'
      },
      {
        id: 'grq1-17',
        questionTypeBadge: 'Thalész-tétel Alapja',
        question: 'Mekkora szög alatt látszik egy kör átmérője a körvonal bármely pontjából?',
        options: ['90°', '60°', '45°', '180°'],
        correctAnswer: 0,
        hint: 'Ez a Thalész-tétel alapvető állítása.',
        explanation: 'Thalész tétele szerint a kör átmérője a körvonal bármely pontjából (az átmérő végpontjait kivéve) 90°-os derékszög alatt látszik.'
      },
      {
        id: 'grq1-18',
        questionTypeBadge: 'Derékszögű Körülírt Köre',
        question: 'Hol van a derékszögű háromszög körülírt körének O középpontja?',
        options: [
          'Az átfogó felezőpontjában',
          'A derékszögű csúcsban',
          'A háromszög súlypontjában',
          'A háromszögön kívül'
        ],
        correctAnswer: 0,
        hint: 'Thalész megfordítása szerint az átfogó a körülírt kör átmérője.',
        explanation: 'A derékszögű háromszög átfogója a körülírt kör átmérője, így a középpont az átfogó felezőpontja: R = c / 2.'
      },
      {
        id: 'grq1-19',
        questionTypeBadge: 'Középvonal Hossza',
        question: 'Egy háromszög alapja 14 cm. Milyen hosszú az ezzel az alappal párhuzamos középvonal?',
        options: ['7 cm', '14 cm', '28 cm', '10 cm'],
        correctAnswer: 0,
        hint: 'A középvonal felezi a két szárat és hossza a harmadik oldal fele.',
        explanation: 'A középvonal párhuzamos a szemközti oldallal és hossza pontosan annak a fele: k = a / 2 = 14 / 2 = 7 cm.'
      },
      {
        id: 'grq1-20',
        questionTypeBadge: 'Alap Területképlet',
        question: 'Egy háromszög oldala a = 12 cm, a hozzá tartozó magassága m_a = 5 cm. Mekkora a területe?',
        options: ['30 cm²', '60 cm²', '15 cm²', '45 cm²'],
        correctAnswer: 0,
        hint: 'T = (a · m_a) / 2.',
        explanation: 'T = (12 · 5) / 2 = 60 / 2 = 30 cm².'
      },
      {
        id: 'grq1-21',
        questionTypeBadge: 'Derékszögű Területe',
        question: 'Egy derékszögű háromszög befogói 6 cm és 9 cm. Mekkora a területe?',
        options: ['27 cm²', '54 cm²', '15 cm²', '36 cm²'],
        correctAnswer: 0,
        hint: 'T = (a · b) / 2.',
        explanation: 'A derékszögű háromszög területe a két befogó szorzatának a fele: T = (6 · 9) / 2 = 54 / 2 = 27 cm².'
      },
      {
        id: 'grq1-22',
        questionTypeBadge: 'Magasság Visszaszámítása',
        question: 'Egy háromszög területe 40 cm², az egyik oldala 10 cm. Mekkora az ehhez az oldalhoz tartozó magassága?',
        options: ['8 cm', '4 cm', '16 cm', '5 cm'],
        correctAnswer: 0,
        hint: 'm_a = (2T) / a.',
        explanation: 'm_a = (2 · 40) / 10 = 80 / 10 = 8 cm.'
      },
      {
        id: 'grq1-23',
        questionTypeBadge: 'Egyenlő Szárú Szöge',
        question: 'Egy egyenlő szárú háromszög szárszöge 40°. Mekkorák az alapon fekvő szögei?',
        options: ['70° és 70°', '80° és 80°', '60° és 60°', '50° és 50°'],
        correctAnswer: 0,
        hint: '(180° - 40°) / 2 = ?',
        explanation: 'A belső szögösszeg 180°. Az alapon fekvő két szög egyenlő: (180° - 40°) / 2 = 140° / 2 = 70°.'
      },
      {
        id: 'grq1-24',
        questionTypeBadge: 'Szabályos Háromszög Szöge',
        question: 'Mekkorák egy szabályos (egyenlő oldalú) háromszög belső szögei?',
        options: ['Mindegyik 60°', 'Mindegyik 90°', 'Mindegyik 45°', 'Változó'],
        correctAnswer: 0,
        hint: '180° / 3 = ?',
        explanation: 'A szabályos háromszög mindhárom oldala és mindhárom belső szöge egyenlő: 180° / 3 = 60°.'
      },
      {
        id: 'grq1-25',
        questionTypeBadge: 'Kör Érintője',
        question: 'Milyen szöget zár be a kör érintője az érintési pontba húzott sugárral?',
        options: ['90°', '45°', '0° (párhuzamosak)', '180°'],
        correctAnswer: 0,
        hint: 'Az érintő merőleges az érintési sugárra.',
        explanation: 'A kör érintője minden pontjában merőleges (90°-os szöget zár be) az érintési pontba mutató sugárra.'
      },
      {
        id: 'grq1-26',
        questionTypeBadge: 'Csúcsszögek és Mellékszögek',
        question: 'Két egyenes metszi egymást. Az egyik szög 65°. Mekkora a mellette fekvő mellékszög?',
        options: ['115°', '65°', '25°', '90°'],
        correctAnswer: 0,
        hint: 'A mellékszögek összege 180°.',
        explanation: 'A mellékszögek összege 180°, így a mellékszög: 180° - 65° = 115°.'
      },
      {
        id: 'grq1-27',
        questionTypeBadge: 'Beírt Kör Sugár Képlete',
        question: 'Hogyan számolható ki a beírt kör r sugara a területből (T) és a félkerületből (s)?',
        options: ['r = T / s', 'r = T · s', 'r = s / T', 'r = 2T / s'],
        correctAnswer: 0,
        hint: 'Mivel T = r · s, így r = ...',
        explanation: 'A terület felbontható három kis háromszögre: T = (a·r)/2 + (b·r)/2 + (c·r)/2 = r·(a+b+c)/2 = r · s, tehát r = T / s.'
      },
      {
        id: 'grq1-28',
        questionTypeBadge: 'Hérón Félkerület',
        question: 'Egy háromszög oldalai 7 cm, 8 cm és 9 cm. Mennyi a félkerülete (s)?',
        options: ['12 cm', '24 cm', '14 cm', '10 cm'],
        correctAnswer: 0,
        hint: 's = (a + b + c) / 2.',
        explanation: 'K = 7 + 8 + 9 = 24 cm. A félkerület: s = 24 / 2 = 12 cm.'
      },
      {
        id: 'grq1-29',
        questionTypeBadge: 'Magyar Szabványos Jelölés',
        question: 'Hogyan jelöljük a magyar szabvány szerint a derékszöget geometriai rajzokon?',
        options: [
          'Egy negyedkörívvel, benne egy ponttal',
          'Egy kis négyzettel a sarokban',
          'Két párhuzamos vonallal',
          'Egy kis kereszttel'
        ],
        correctAnswer: 0,
        hint: 'Ív + pont a magyar rajzokon.',
        explanation: 'A magyar geometriai és műszaki rajzi hagyományban a derékszöget körcikk ívvel és annak középpontjában egy ponttal jelöljük.'
      },
      {
        id: 'grq1-30',
        questionTypeBadge: 'Euler-egyenes Sorrendje',
        question: 'Mely három nevezetes pont fekszik egy egyenesen (Euler-egyenes)?',
        options: [
          'Magasságpont (M), Súlypont (S), Körülírt kör középpontja (O)',
          'Beírt kör középpontja (I), Súlypont (S), Magasságpont (M)',
          'Körülírt kör kp. (O), Beírt kör kp. (I), Magasságpont (M)',
          'Mind a négy pont egybeesik tetszőleges háromszögben'
        ],
        correctAnswer: 0,
        hint: 'Az I (beírt kör) általában nincs rajta az Euler-egyenesen, csak az M, S, O.',
        explanation: 'Bármely nem szabályos háromszögben az M (magasságpont), S (súlypont) és O (körülírt kör középpontja) egy egyenesen fekszik (Euler-egyenes).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Összetettebb Számítások és Tételek (Közepes)',
    subtitle: '30 feladat: 30-60-90 és 45-45-90 arányok, Thalész-alkalmazások, Hérón és területek.',
    range: '1 - 30. feladat',
    focus: 'Összetettebb geometriai összefüggések és képletek alkalmazása',
    questions: [
      {
        id: 'grq2-1',
        questionTypeBadge: 'Szabályos Háromszög Magassága',
        question: 'Egy szabályos háromszög oldala a = 10 cm. Milyen hosszú a magassága?',
        options: ['5√3 cm', '5 cm', '10√3 cm', '5√2 cm'],
        correctAnswer: 0,
        hint: 'A szabályos háromszög magassága: m = (a√3) / 2.',
        explanation: 'm = (10 · √3) / 2 = 5√3 cm.'
      },
      {
        id: 'grq2-2',
        questionTypeBadge: 'Szabályos Háromszög Területe',
        question: 'Egy szabályos háromszög oldala a = 6 cm. Mekkora a területe?',
        options: ['9√3 cm²', '18√3 cm²', '36 cm²', '12√3 cm²'],
        correctAnswer: 0,
        hint: 'T = (a² · √3) / 4.',
        explanation: 'T = (6² · √3) / 4 = (36 · √3) / 4 = 9√3 cm².'
      },
      {
        id: 'grq2-3',
        questionTypeBadge: '30-60-90 Háromszög Befogója',
        question: 'Egy 30°-60°-90° derékszögű háromszög rövidebb befogója 5 cm. Mekkora a hosszabb befogója és átfogója?',
        options: [
          'b = 5√3 cm,  c = 10 cm',
          'b = 10 cm,  c = 5√3 cm',
          'b = 5√2 cm,  c = 10 cm',
          'b = 8 cm,  c = 12 cm'
        ],
        correctAnswer: 0,
        hint: 'A rövidebb befogó a, a hosszabb a√3, az átfogó 2a.',
        explanation: 'Ha a = 5 cm, akkor a hosszabb befogó b = a√3 = 5√3 cm, az átfogó pedig c = 2a = 10 cm.'
      },
      {
        id: 'grq2-4',
        questionTypeBadge: 'Egyenlő Szárú Háromszög Magassága',
        question: 'Egy egyenlő szárú háromszög alapja 12 cm, szárai 10 cm hosszúak. Milyen hosszú az alaphoz tartozó magassága?',
        options: ['8 cm', '6 cm', '9 cm', '7 cm'],
        correctAnswer: 0,
        hint: 'A magasság felezi az alapot: a féldarab 6 cm. Használd a Pitagorasz-tételt!',
        explanation: 'Az alap fele 6 cm. A derékszögű háromszögben: m² = 10² - 6² = 100 - 36 = 64 ⇒ m = 8 cm.'
      },
      {
        id: 'grq2-5',
        questionTypeBadge: 'Egyenlő Szárú Területe',
        question: 'Mekkora az előző feladatbeli egyenlő szárú háromszög területe (alap = 12 cm, szár = 10 cm)?',
        options: ['48 cm²', '60 cm²', '96 cm²', '40 cm²'],
        correctAnswer: 0,
        hint: 'T = (alap · magasság) / 2 = (12 · 8) / 2.',
        explanation: 'T = (12 · 8) / 2 = 96 / 2 = 48 cm².'
      },
      {
        id: 'grq2-6',
        questionTypeBadge: 'Téglalap Átlója',
        question: 'Egy téglalap oldalai 15 cm és 20 cm. Milyen hosszú az átlója?',
        options: ['25 cm', '35 cm', '28 cm', '30 cm'],
        correctAnswer: 0,
        hint: 'd = √(15² + 20²).',
        explanation: 'd² = 15² + 20² = 225 + 400 = 625 ⇒ d = √625 = 25 cm (a 3-4-5 számhármas ötszöröse).'
      },
      {
        id: 'grq2-7',
        questionTypeBadge: 'Rombusz Átlói és Oldala',
        question: 'Egy rombusz átlói e = 16 cm és f = 12 cm. Milyen hosszú a rombusz oldala?',
        options: ['10 cm', '14 cm', '20 cm', '8 cm'],
        correctAnswer: 0,
        hint: 'A rombusz átlói merőlegesen felezik egymást! A félegyenesek: 8 cm és 6 cm.',
        explanation: 'Az átlók felei: 8 cm és 6 cm. A derékszögű háromszögből: a² = 8² + 6² = 64 + 36 = 100 ⇒ a = 10 cm.'
      },
      {
        id: 'grq2-8',
        questionTypeBadge: 'Derékszögű Átfogó Magassága',
        question: 'Egy derékszögű háromszög befogói 9 cm és 12 cm. Mekkora az átfogóhoz tartozó m_c magasság?',
        options: ['7,2 cm', '6 cm', '8,4 cm', '7,5 cm'],
        correctAnswer: 0,
        hint: 'Az átfogó c = 15 cm. A terület kétféleképpen: T = (a·b)/2 = (c·m_c)/2 ⇒ m_c = (a·b)/c.',
        explanation: 'c = √(9² + 12²) = 15 cm. m_c = (9 · 12) / 15 = 108 / 15 = 7,2 cm.'
      },
      {
        id: 'grq2-9',
        questionTypeBadge: 'Magasságtétel Alkalmazása',
        question: 'Egy derékszögű háromszög átfogóját a magasságtalppont két szeletre osztja: p = 4 cm és q = 9 cm. Milyen hosszú az átfogóhoz tartozó magasság?',
        options: ['6 cm', '6,5 cm', '5 cm', '7,2 cm'],
        correctAnswer: 0,
        hint: 'A magasságtétel: m_c² = p · q.',
        explanation: 'm_c² = p · q = 4 · 9 = 36 ⇒ m_c = √36 = 6 cm.'
      },
      {
        id: 'grq2-10',
        questionTypeBadge: 'Befogótétel Alkalmazása',
        question: 'Egy derékszögű háromszög átfogója c = 25 cm, az "a" befogó átfogóra eső merőleges vetülete p = 9 cm. Milyen hosszú az "a" befogó?',
        options: ['15 cm', '12 cm', '16 cm', '20 cm'],
        correctAnswer: 0,
        hint: 'A befogótétel: a² = c · p.',
        explanation: 'a² = c · p = 25 · 9 = 225 ⇒ a = √225 = 15 cm.'
      },
      {
        id: 'grq2-11',
        questionTypeBadge: 'Thalész-tétel és Szögek',
        question: 'Egy kör AB átmérőjének hossza 10 cm. C a körvonal egy pontja úgy, hogy a CAB szög 35°. Mekkora az ABC szög?',
        options: ['55°', '45°', '65°', '35°'],
        correctAnswer: 0,
        hint: 'Thalész tétele miatt a C-nél lévő szög 90°. A másik kettő összege 90°.',
        explanation: 'Thalész tétele szerint ACB∠ = 90°. A derékszögű háromszögben: ABC∠ = 90° - 35° = 55°.'
      },
      {
        id: 'grq2-12',
        questionTypeBadge: 'Kör Érintőszakaszának Hossza',
        question: 'Egy 5 cm sugarú kör középpontjától egy külső P pont 13 cm távolságra van. Milyen hosszú a P pontból a körhöz húzott érintőszakasz?',
        options: ['12 cm', '8 cm', '10 cm', '14 cm'],
        correctAnswer: 0,
        hint: 'Az érintési sugár merőleges az érintőre. Derékszögű háromszög: r = 5, átfogó = 13.',
        explanation: 'Az O, E, P háromszög derékszögű az E érintési pontban: d² = r² + e² ⇒ 13² = 5² + e² ⇒ e = √(169 - 25) = 12 cm.'
      },
      {
        id: 'grq2-13',
        questionTypeBadge: 'Középvonalak Által Határolt Terület',
        question: 'Egy háromszög területe 48 cm². A három középvonala összekötésével kapott belső kis háromszög mekkora területű?',
        options: ['12 cm²', '24 cm²', '16 cm²', '8 cm²'],
        correctAnswer: 0,
        hint: 'A 3 középvonal a háromszöget 4 darab egybevágó kis háromszögre osztja.',
        explanation: 'A három középvonal a háromszöget 4 egyenlő területű részre osztja, így a középső kis háromszög területe: 48 / 4 = 12 cm².'
      },
      {
        id: 'grq2-14',
        questionTypeBadge: 'Súlyvonalak és Terület',
        question: 'A háromszög súlypontját összekötjük a három csúccsal. Milyen arányban osztják fel ezek a szakaszok az eredeti háromszög területét?',
        options: [
          '3 egyenlő területű részre (T/3 mindegyik)',
          '2 : 1 : 1 arányban',
          'Csak szabályos háromszögben egyenlők',
          'A magasságok arányában'
        ],
        correctAnswer: 0,
        hint: 'A súlypont és a csúcsok 3 darab azonos területű háromszöget határoznak meg.',
        explanation: 'Bármely háromszögben a súlypont a három csúccsal összekötve három egyenlő területű (T/3 nagyságú) háromszögre bontja az alakzatot.'
      },
      {
        id: 'grq2-15',
        questionTypeBadge: 'Beírt Kör Sugár Számítása',
        question: 'Egy derékszögű háromszög oldalai 6 cm, 8 cm és 10 cm. Mekkora a beírt körének r sugara?',
        options: ['2 cm', '3 cm', '1,5 cm', '2,5 cm'],
        correctAnswer: 0,
        hint: 'T = (6 · 8) / 2 = 24. s = (6 + 8 + 10) / 2 = 12. r = T / s.',
        explanation: 'T = 24 cm², s = 12 cm ⇒ r = 24 / 12 = 2 cm. (Derékszögűnél ellenőrzés: r = (a + b - c) / 2 = (6 + 8 - 10)/2 = 2 cm).'
      },
      {
        id: 'grq2-16',
        questionTypeBadge: 'Körülírt Kör Sugár Számítása',
        question: 'Egy derékszögű háromszög befogói 7 cm és 24 cm. Mekkora a körülírt körének R sugara?',
        options: ['12,5 cm', '25 cm', '15 cm', '10 cm'],
        correctAnswer: 0,
        hint: 'Számold ki az átfogót! R = c / 2.',
        explanation: 'c = √(7² + 24²) = √(49 + 576) = √625 = 25 cm. A derékszögű háromszög körülírt körének sugara: R = c / 2 = 12,5 cm.'
      },
      {
        id: 'grq2-17',
        questionTypeBadge: 'Hérón-képlet Számítása',
        question: 'Egy háromszög oldalai 5 cm, 5 cm és 6 cm. Mekkora a területe Hérón-képlettel számolva?',
        options: ['12 cm²', '15 cm²', '18 cm²', '10 cm²'],
        correctAnswer: 0,
        hint: 's = (5 + 5 + 6)/2 = 8. T = √[8 · (8-5) · (8-5) · (8-6)].',
        explanation: 's = 8 cm. T = √[8 · 3 · 3 · 2] = √[8 · 18] = √144 = 12 cm².'
      },
      {
        id: 'grq2-18',
        questionTypeBadge: 'Euler-egyenes Szakaszarány',
        question: 'Egy háromszögben a magasságpont (M) és a súlypont (S) távolsága 6 cm. Milyen távol van a súlypont a körülírt kör O középpontjától?',
        options: ['3 cm', '6 cm', '12 cm', '2 cm'],
        correctAnswer: 0,
        hint: 'Az Euler-egyenesen az arány: MS : SO = 2 : 1.',
        explanation: 'Mivel MS : SO = 2 : 1, ezért SO = MS / 2 = 6 / 2 = 3 cm.'
      },
      {
        id: 'grq2-19',
        questionTypeBadge: 'Tompaszögű Háromszög és O',
        question: 'Hol található a tompaszögű háromszög körülírt körének O középpontja?',
        options: [
          'A háromszögön kívül, a leghosszabb oldallal szemközti oldalon',
          'A háromszög belsejében',
          'A tompaszögű csúcsban',
          'A leghosszabb oldal felezőpontjában'
        ],
        correctAnswer: 0,
        hint: 'Hegyesszögűnél belül van, derékszögűnél az átfogón, tompaszögűnél...',
        explanation: 'Tompaszögű háromszög esetén az oldalfelező merőlegesek a háromszögön kívül metszik egymást.'
      },
      {
        id: 'grq2-20',
        questionTypeBadge: 'Külső Pontból Húzott Két Érintő',
        question: 'Egy külső P pontból két érintőt húzunk egy körhöz, az érintési pontok E₁ és E₂. Milyen kapcsolat van a PE₁ és PE₂ szakaszok hossza között?',
        options: [
          'Mindig pontosan egyenlő hosszúak (PE₁ = PE₂)',
          'PE₁ mindig hosszabb, mint PE₂',
          'Összegük a kör átmérője',
          'Csak akkor egyenlők, ha P a kör középpontjában van'
        ],
        correctAnswer: 0,
        hint: 'A két érintő háromszög egybevágó egymással az OP tengelyre való tükrözés miatt.',
        explanation: 'A külső pontból húzott két érintőszakasz mindig egyenlő hosszú (PE₁ = PE₂), mivel a két keletkező derékszögű háromszög egybevágó.'
      },
      {
        id: 'grq2-21',
        questionTypeBadge: 'Hegyesszögű vagy Tompaszögű?',
        question: 'Egy háromszög oldalai 4 cm, 6 cm és 7 cm. Milyen szögfajtájú ez a háromszög?',
        options: ['Hegyesszögű', 'Derékszögű', 'Tompaszögű', 'Egyenlő szárú'],
        correctAnswer: 0,
        hint: 'Hasonlítsd össze a leghosszabb oldal négyzetét a másik kettő összegével: 7² vs 4² + 6².',
        explanation: '4² + 6² = 16 + 36 = 52. A leghosszabb oldal négyzete: 7² = 49. Mivel 49 < 52 (c² < a² + b²), a háromszög hegyesszögű.'
      },
      {
        id: 'grq2-22',
        questionTypeBadge: 'Tompaszögű Felismerése',
        question: 'Egy háromszög oldalai 4 cm, 5 cm és 7 cm. Milyen szögei vannak ennek a háromszögnek?',
        options: ['Tompaszögű', 'Derékszögű', 'Hegyesszögű', 'Ilyen háromszög nem létezik'],
        correctAnswer: 0,
        hint: '7² = 49, míg 4² + 5² = 16 + 25 = 41.',
        explanation: 'Mivel 7² = 49 > 41 = 4² + 5² (c² > a² + b²), a legnagyobb szög tompaszög (> 90°).'
      },
      {
        id: 'grq2-23',
        questionTypeBadge: 'Szögfelező Tétel Tulajdonsága',
        question: 'Egy háromszög belső szögfelezője milyen pontok mértani helye?',
        options: [
          'Azon pontoké, amelyek a szög két szárától egyenlő távolságra vannak',
          'Azon pontoké, amelyek a szemközti oldal csúcsaitól egyenlő távol vannak',
          'Azon pontoké, amelyek távolsága a csúcstól állandó',
          'A súlypont és magasságpont összekötő vonala'
        ],
        correctAnswer: 0,
        hint: 'A szögfelező pontjai a szög két szárát érintik azonos távolságra.',
        explanation: 'A szögfelező definíció szerint a szögtartomány azon pontjainak mértani helye, amelyek a szög két szárától egyenlő távolságra vannak.'
      },
      {
        id: 'grq2-24',
        questionTypeBadge: 'Szimmetrikus Trapéz Magassága',
        question: 'Egy egyenlő szárú (szimmetrikus) trapéz párhuzamos oldalai a = 14 cm és c = 6 cm, szárai b = 5 cm. Mekkora a trapéz magassága?',
        options: ['3 cm', '4 cm', '5 cm', '2,5 cm'],
        correctAnswer: 0,
        hint: 'A szimmetria miatt a szárak alatti kis szakasz: (14 - 6) / 2 = 4 cm. Használd a Pitagoraszt!',
        explanation: 'x = (14 - 6) / 2 = 4 cm. A derékszögű háromszögből: m² = 5² - 4² = 25 - 16 = 9 ⇒ m = 3 cm.'
      },
      {
        id: 'grq2-25',
        questionTypeBadge: 'Szimmetrikus Trapéz Területe',
        question: 'Mekkora az előző feladatbeli trapéz területe (a = 14 cm, c = 6 cm, m = 3 cm)?',
        options: ['30 cm²', '60 cm²', '20 cm²', '45 cm²'],
        correctAnswer: 0,
        hint: 'T = ((a + c) / 2) · m.',
        explanation: 'T = ((14 + 6) / 2) · 3 = 10 · 3 = 30 cm².'
      },
      {
        id: 'grq2-26',
        questionTypeBadge: 'Két Párhuzamos Vonal Távolsága',
        question: 'Mit nevezünk két párhuzamos egyenes távolságának?',
        options: [
          'Az egyik egyenes tetszőleges pontjából a másikra bocsátott merőleges szakasz hosszát',
          'Bármely két pontjuk közötti szakasz hosszát',
          'A két egyenes átlagos távolságát',
          'A velük 45°-os szöget bezáró szakasz hosszát'
        ],
        correctAnswer: 0,
        hint: 'A geometriában a távolság mindig a legrövidebb, azaz merőleges út.',
        explanation: 'Két párhuzamos egyenes távolsága az egyik egyenes egy tetszőleges pontjából a másikra állított merőleges szakasz hossza.'
      },
      {
        id: 'grq2-27',
        questionTypeBadge: 'Kör Húrja és Távolsága a Kp.-tól',
        question: 'Egy 10 cm sugarú körben egy húr hossza 16 cm. Milyen távol van a húr a kör középpontjától?',
        options: ['6 cm', '8 cm', '7 cm', '5 cm'],
        correctAnswer: 0,
        hint: 'A középpontból húzott merőleges felezi a húrt: féldarab 8 cm. Derékszögű háromszög: r = 10, d, 8.',
        explanation: 'A merőleges felezi a húrt (8 cm). Derékszögű háromszögből: d² = 10² - 8² = 100 - 64 = 36 ⇒ d = 6 cm.'
      },
      {
        id: 'grq2-28',
        questionTypeBadge: 'Kör Cikk és Szelet Fogalma',
        question: 'Mi a különbség a körcikk és a körszelet között?',
        options: [
          'A körcikket két sugár és egy ív határolja, míg a körszeletet egy húr és egy ív',
          'A körcikk mindig félkör, a körszelet negyedkör',
          'Nincs különbség, a két szó szinonima',
          'A körcikk területe mindig kisebb a körszeleténél'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a tortacikkre (középpontból induló vágások) és a lehasított szeletre (húr mentén levágva).',
        explanation: 'A körcikk (torta-szelet) két sugár és a körív által határolt alakzat; a körszelet egy húr és az általa levágott ív közötti terület.'
      },
      {
        id: 'grq2-29',
        questionTypeBadge: 'Átfogóhoz Tartozó Súlyvonal',
        question: 'Egy derékszögű háromszög átfogója 20 cm. Milyen hosszú az átfogóhoz tartozó s_c súlyvonal?',
        options: ['10 cm', '20 cm', '5 cm', '15 cm'],
        correctAnswer: 0,
        hint: 'Thalész megfordítása: az átfogó felezőpontja a körülírt kör középpontja, így s_c = R = c / 2.',
        explanation: 'A derékszögű háromszögben az átfogóhoz tartozó súlyvonal hossza pontosan megegyezik a körülírt kör sugarával: s_c = c / 2 = 20 / 2 = 10 cm.'
      },
      {
        id: 'grq2-30',
        questionTypeBadge: 'Középvonalak Háromszöge',
        question: 'Egy háromszög oldalai 10 cm, 14 cm és 16 cm. Mekkora a középvonalai által alkotott belső háromszög kerülete?',
        options: ['20 cm', '40 cm', '10 cm', '30 cm'],
        correctAnswer: 0,
        hint: 'Az eredeti háromszög kerülete K = 10 + 14 + 16 = 40 cm. A középvonalak hossza az oldalak fele.',
        explanation: 'A középvonalak az oldalak felével egyenlők (5, 7, 8 cm), így a belső háromszög kerülete pontosan az eredeti kerület fele: 40 / 2 = 20 cm.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Verseny- és Érettségi Szintű Geometria (Nehéz)',
    subtitle: '30 feladat: összetett síkidomok, Hérón és sugaras összefüggések, mértani helyek és bizonyítások.',
    range: '1 - 30. feladat',
    focus: 'Középszintű és emelt szintű érettségi geometriai típusfeladatok mesteri szintű megoldása',
    questions: [
      {
        id: 'grq3-1',
        questionTypeBadge: 'Körülírt Kör Sugár Hérónnal',
        question: 'Egy háromszög oldalai 13 cm, 14 cm és 15 cm. A területe T = 84 cm². Mekkora a körülírt körének R sugara?',
        options: ['8,125 cm (65/8 cm)', '7 cm', '9,5 cm', '8,5 cm'],
        correctAnswer: 0,
        hint: 'Használd az R = (a · b · c) / (4T) képletet!',
        explanation: 'R = (13 · 14 · 15) / (4 · 84) = 2730 / 336 = 65 / 8 = 8,125 cm.'
      },
      {
        id: 'grq3-2',
        questionTypeBadge: 'Beírt Kör Sugár Hérónnal',
        question: 'Mekkora az előző feladatbeli háromszög (oldalai 13, 14, 15 cm, T = 84 cm²) beírt körének r sugara?',
        options: ['4 cm', '3,5 cm', '4,5 cm', '3 cm'],
        correctAnswer: 0,
        hint: 's = (13 + 14 + 15) / 2 = 21. r = T / s.',
        explanation: 's = 42 / 2 = 21 cm. r = T / s = 84 / 21 = 4 cm.'
      },
      {
        id: 'grq3-3',
        questionTypeBadge: 'Háromszög Legkisebb Magassága',
        question: 'A 13, 14, 15 cm oldalú háromszögben (T = 84 cm²) melyik oldalhoz tartozik a legkisebb magasság, és mekkora az értéke?',
        options: [
          'A 15 cm-es oldalhoz, m = 11,2 cm',
          'A 13 cm-es oldalhoz, m = 12,9 cm',
          'A 14 cm-es oldalhoz, m = 12 cm',
          'Mindhárom magasság egyenlő'
        ],
        correctAnswer: 0,
        hint: 'A leghosszabb oldalhoz tartozik a legkisebb magasság! m_c = (2T) / c.',
        explanation: 'A legkisebb magasság a leghosszabb (15 cm-es) oldalhoz tartozik: m = (2 · 84) / 15 = 168 / 15 = 11,2 cm.'
      },
      {
        id: 'grq3-4',
        questionTypeBadge: 'Szabályos Háromszög Sugarai',
        question: 'Egy szabályos háromszög magassága 12 cm. Mekkora a beírt (r) és a körülírt (R) körének sugara?',
        options: [
          'r = 4 cm,  R = 8 cm',
          'r = 6 cm,  R = 6 cm',
          'r = 3 cm,  R = 9 cm',
          'r = 5 cm,  R = 7 cm'
        ],
        correctAnswer: 0,
        hint: 'Szabályos háromszögben a magasságpont egybeesik a súlyponttal, így r = m/3 és R = 2m/3.',
        explanation: 'r = m / 3 = 12 / 3 = 4 cm. R = 2m / 3 = 24 / 3 = 8 cm (mindig R = 2r).'
      },
      {
        id: 'grq3-5',
        questionTypeBadge: 'Érintő Négyszög Tétele',
        question: 'Egy köré írt négyszög (érintőnégyszög) három oldala sorban a = 6 cm, b = 9 cm és c = 8 cm. Mekkora a negyedik d oldal?',
        options: ['5 cm', '7 cm', '11 cm', '6 cm'],
        correctAnswer: 0,
        hint: 'Érintőnégyszögben a szemközti oldalak összege egyenlő: a + c = b + d.',
        explanation: 'a + c = b + d ⇒ 6 + 8 = 9 + d ⇒ 14 = 9 + d ⇒ d = 5 cm.'
      },
      {
        id: 'grq3-6',
        questionTypeBadge: 'Húrnégyszög Szögtétele',
        question: 'Egy körbe írt négyszög (húrnégyszög) egyik belső szöge 74°. Mekkora a vele szemközti belső szög?',
        options: ['106°', '74°', '16°', '116°'],
        correctAnswer: 0,
        hint: 'Húrnégyszögben a szemközti szögek összege 180°.',
        explanation: 'A húrnégyszögek alaptétele szerint a szemközti belső szögek összege 180°: 180° - 74° = 106°.'
      },
      {
        id: 'grq3-7',
        questionTypeBadge: 'Thalész és Húrhossz',
        question: 'Egy 10 cm sugarú körben felveszünk egy AB átmérőt és a körvonal egy C pontját úgy, hogy AC = 12 cm. Milyen hosszú a BC húr?',
        options: ['16 cm', '8 cm', '14 cm', '15 cm'],
        correctAnswer: 0,
        hint: 'Az átmérő hossza 20 cm. Thalész tétele miatt a C-nél derékszög van!',
        explanation: 'Az AB átmérő = 20 cm. Mivel ACB∠ = 90°, a Pitagorasz-tétel szerint: BC² = 20² - 12² = 400 - 144 = 256 ⇒ BC = 16 cm.'
      },
      {
        id: 'grq3-8',
        questionTypeBadge: 'Derékszögű Trapéz Pitagorasszal',
        question: 'Egy derékszögű trapéz párhuzamos alapjai 16 cm és 10 cm, ferde szára 10 cm. Mekkora a trapéz derékszögű szára (magassága)?',
        options: ['8 cm', '6 cm', '9 cm', '7 cm'],
        correctAnswer: 0,
        hint: 'Vágd le a derékszögű részt téglalapra! A kis derékszögű háromszög alapja: 16 - 10 = 6 cm.',
        explanation: 'A merőleges magasság levág egy derékszögű háromszöget, melynek egyik befogója 16 - 10 = 6 cm, átfogója 10 cm. m = √(10² - 6²) = 8 cm.'
      },
      {
        id: 'grq3-9',
        questionTypeBadge: 'Derékszögű Trapéz Átlója',
        question: 'Milyen hosszú az előző feladatbeli derékszögű trapéz (alapok: 16 és 10 cm, magasság: 8 cm) hosszabbik átlója?',
        options: ['8√5 cm (kb. 17,89 cm)', '20 cm', '18 cm', '16√2 cm'],
        correctAnswer: 0,
        hint: 'A hosszabbik átló a nagyobbik alappal (16 cm) és a magassággal (8 cm) alkot derékszögű háromszöget.',
        explanation: 'd² = 16² + 8² = 256 + 64 = 320 ⇒ d = √320 = √(64 · 5) = 8√5 cm.'
      },
      {
        id: 'grq3-10',
        questionTypeBadge: 'Két Kör Közös Érintője',
        question: 'Két kör sugara R = 8 cm és r = 3 cm, középpontjaik távolsága d = 13 cm. Milyen hosszú a külső közös érintőszakaszuk?',
        options: ['12 cm', '10 cm', '11 cm', '13 cm'],
        correctAnswer: 0,
        hint: 'Toljuk el a közös érintőt a kisebbik kör kp.-jába! A befogó R - r = 5 cm, átfogó d = 13 cm.',
        explanation: 'A derékszögű háromszög átfogója a középpontok távolsága (13 cm), egyik befogója a sugarak különbsége (8 - 3 = 5 cm). x = √(13² - 5²) = 12 cm.'
      },
      {
        id: 'grq3-11',
        questionTypeBadge: 'Érintőszerkesztés Lépései',
        question: 'Külső P pontból kört érintő egyeneseket szerkesztünk. Mi a szerkesztés kulcslépése?',
        options: [
          'Az OP szakasz mint átmérő fölé Thalész-kört rajzolunk',
          'Merőlegest állítunk az OP szakaszra a P pontban',
          'P-ből körívet húzunk 2r sugárral',
          'Szögfelezőt szerkesztünk a P csúcsból'
        ],
        correctAnswer: 0,
        hint: 'Az érintési pontban a sugár és az érintő derékszöget zár be, ezt a 90°-ot Thalész-körrel kapjuk meg.',
        explanation: 'Az OP szakasz felezőpontja köré rajzolt Thalész-kör metszi ki az adott körből az érintési pontokat, mivel ott lesz a derékszög.'
      },
      {
        id: 'grq3-12',
        questionTypeBadge: 'Súlyvonalak és Területfelezés',
        question: 'Egy háromszög területe 72 cm². A három súlyvonal 6 kisebb háromszögre bontja az alakzatot. Mekkora egy ilyen kis háromszög területe?',
        options: ['12 cm²', '18 cm²', '24 cm²', '9 cm²'],
        correctAnswer: 0,
        hint: 'A három súlyvonal a háromszöget 6 egyenlő területű részre osztja.',
        explanation: 'Bármely háromszögben a három súlyvonal 6 darab azonos területű háromszöget képez: 72 / 6 = 12 cm².'
      },
      {
        id: 'grq3-13',
        questionTypeBadge: 'Egyenlő Oldalú Háromszög és Körök',
        question: 'Egy szabályos háromszög területe 36√3 cm². Milyen hosszú az oldala?',
        options: ['12 cm', '6 cm', '18 cm', '9 cm'],
        correctAnswer: 0,
        hint: 'T = (a² · √3) / 4 = 36√3.',
        explanation: 'a² · √3 / 4 = 36√3 ⇒ a² / 4 = 36 ⇒ a² = 144 ⇒ a = 12 cm.'
      },
      {
        id: 'grq3-14',
        questionTypeBadge: 'Középvonalak Trapézban',
        question: 'Egy trapéz alapjai a = 15 cm és c = 9 cm. Milyen hosszú a szárak felezőpontjait összekötő középvonala?',
        options: ['12 cm', '6 cm', '14 cm', '10 cm'],
        correctAnswer: 0,
        hint: 'A trapéz középvonala a két párhuzamos alap számtani közepe: k = (a + c) / 2.',
        explanation: 'k = (a + c) / 2 = (15 + 9) / 2 = 24 / 2 = 12 cm.'
      },
      {
        id: 'grq3-15',
        questionTypeBadge: 'Hegyesszögű Háromszög Euler-távolság',
        question: 'Egy háromszög Euler-egyenesén az M (magasságpont) és O (körülírt középpont) közötti távolság 15 cm. Hol helyezkedik el a súlypont az MO szakaszon?',
        options: [
          'M-től 10 cm-re, O-tól 5 cm-re',
          'M-től 7,5 cm-re (középen)',
          'M-től 5 cm-re, O-tól 10 cm-re',
          'Az MO szakaszon kívül'
        ],
        correctAnswer: 0,
        hint: 'Az arány MS : SO = 2 : 1. A szakasz 3 egyenlő részre oszlik.',
        explanation: 'Az MO szakasz hossza 3 egység. 1 egység = 15 / 3 = 5 cm. Így MS = 2 · 5 = 10 cm, SO = 5 cm.'
      },
      {
        id: 'grq3-16',
        questionTypeBadge: 'Mértani Hely Síkban',
        question: 'Mi azon pontok mértani helye a síkban, amelyekből egy adott AB szakasz derékszög (90°) alatt látszik?',
        options: [
          'Az AB szakasz mint átmérő fölé rajzolt körvonal (az A és B végpontok nélkül)',
          'Az AB szakasz szakaszfelező merőlegese',
          'Egy AB-vel párhuzamos egyenespár',
          'Egy A középpontú kör'
        ],
        correctAnswer: 0,
        hint: 'Thalész tétele és megfordítása határozza meg.',
        explanation: 'A Thalész-tétel és megfordítása alapján a sík azon pontjainak halmaza, amelyekből egy AB szakasz derékszögben látszik, az AB átmérőjű Thalész-kör (az A és B pontok kivételével).'
      },
      {
        id: 'grq3-17',
        questionTypeBadge: 'Átfogó Magassága Képlet',
        question: 'Egy derékszögű háromszög átfogóhoz tartozó magassága m_c = 12 cm, és az átfogó egyik szelete p = 9 cm. Milyen hosszú a másik q szelet és a teljes c átfogó?',
        options: [
          'q = 16 cm,  c = 25 cm',
          'q = 12 cm,  c = 21 cm',
          'q = 18 cm,  c = 27 cm',
          'q = 15 cm,  c = 24 cm'
        ],
        correctAnswer: 0,
        hint: 'm_c² = p · q ⇒ 144 = 9 · q.',
        explanation: 'm_c² = p · q ⇒ 12² = 9 · q ⇒ 144 = 9q ⇒ q = 16 cm. A teljes átfogó c = p + q = 9 + 16 = 25 cm.'
      },
      {
        id: 'grq3-18',
        questionTypeBadge: 'Befogók Meghatározása Magasságtételből',
        question: 'Az előző feladatban (p = 9 cm, q = 16 cm, c = 25 cm) mekkorák az "a" és "b" befogók?',
        options: [
          'a = 15 cm,  b = 20 cm',
          'a = 12 cm,  b = 16 cm',
          'a = 10 cm,  b = 24 cm',
          'a = 14 cm,  b = 18 cm'
        ],
        correctAnswer: 0,
        hint: 'Befogótétel: a = √(c · p) és b = √(c · q).',
        explanation: 'a = √(25 · 9) = 5 · 3 = 15 cm. b = √(25 · 16) = 5 · 4 = 20 cm. (Ellenőrzés: 15² + 20² = 225 + 400 = 625 = 25²).'
      },
      {
        id: 'grq3-19',
        questionTypeBadge: 'Rombusz Magassága',
        question: 'Egy rombusz oldala 10 cm, területe 80 cm². Milyen hosszú a rombusz magassága?',
        options: ['8 cm', '4 cm', '10 cm', '6 cm'],
        correctAnswer: 0,
        hint: 'A rombusz paralelogramma: T = a · m.',
        explanation: 'T = a · m ⇒ 80 = 10 · m ⇒ m = 8 cm.'
      },
      {
        id: 'grq3-20',
        questionTypeBadge: 'Rombusz Beírt Köre',
        question: 'Mekkora az előző feladatbeli rombuszba (m = 8 cm) írható kör sugara?',
        options: ['4 cm', '8 cm', '2 cm', '5 cm'],
        correctAnswer: 0,
        hint: 'A rombusz szemközti oldalainak távolsága a magasság, ami a beírt kör átmérője: 2r = m.',
        explanation: 'A rombusz magassága éppen a beírt kör átmérője, így a beírt kör sugara: r = m / 2 = 8 / 2 = 4 cm.'
      },
      {
        id: 'grq3-21',
        questionTypeBadge: 'Háromszög Terület és Magasság Arány',
        question: 'Ha egy háromszög egyik oldalát megduplázzuk, a hozzá tartozó magasságát pedig harmadoljuk, hogyan változik a területe?',
        options: [
          'Az eredeti 2/3 része lesz',
          'Az eredeti 3/2 része lesz',
          'Változatlan marad',
          'Az eredeti 1/3 része lesz'
        ],
        correctAnswer: 0,
        hint: 'T_új = (2a · (m/3)) / 2 = (2/3) · ((a·m)/2).',
        explanation: 'T_új = (2a · m/3) / 2 = (2/3) · (a·m / 2) = (2/3) · T_eredeti.'
      },
      {
        id: 'grq3-22',
        questionTypeBadge: 'Pitagorasz Térbeli Alkalmazás',
        question: 'Egy téglatest élei 3 cm, 4 cm és 12 cm hosszúak. Milyen hosszú a testátlója?',
        options: ['13 cm', '15 cm', '14 cm', '11 cm'],
        correctAnswer: 0,
        hint: 'D = √(a² + b² + c²).',
        explanation: 'D² = 3² + 4² + 12² = 9 + 16 + 144 = 169 ⇒ D = √169 = 13 cm.'
      },
      {
        id: 'grq3-23',
        questionTypeBadge: 'Két Kör Érintkezése',
        question: 'Két kör kívülről érinti egymást. Sugaraik 9 cm és 4 cm. Milyen hosszú a közös külső érintőszakaszuk?',
        options: ['12 cm', '13 cm', '10 cm', '14 cm'],
        correctAnswer: 0,
        hint: 'Középpontok távolsága d = R + r = 13 cm. Sugarak különbsége R - r = 5 cm.',
        explanation: 'd = 9 + 4 = 13 cm. A derékszögű háromszögből: e² = d² - (R - r)² = 13² - 5² = 169 - 25 = 144 ⇒ e = 12 cm. (Képlet: e = 2√(Rr) = 2√36 = 12 cm).'
      },
      {
        id: 'grq3-24',
        questionTypeBadge: 'Szabályos Hatszög Területe',
        question: 'Egy szabályos hatszög oldala a = 4 cm. Mekkora a területe?',
        options: ['24√3 cm²', '16√3 cm²', '48 cm²', '32√3 cm²'],
        correctAnswer: 0,
        hint: 'A szabályos hatszög 6 egybevágó szabályos háromszögből áll!',
        explanation: 'Egy szabályos háromszög területe: (4² · √3) / 4 = 4√3 cm². A 6 darab területe: 6 · 4√3 = 24√3 cm².'
      },
      {
        id: 'grq3-25',
        questionTypeBadge: 'Szabályos Hatszög Átlói',
        question: 'Milyen hosszú az "a" oldalú szabályos hatszög leghosszabb átlója?',
        options: ['2a', 'a√3', 'a√2', '3a'],
        correctAnswer: 0,
        hint: 'A leghosszabb átló a körülírt kör átmérője, átmegy a középponton.',
        explanation: 'A szabályos hatszög leghosszabb átlója két szemközti csúcsot köt össze a középponton át, hossza pontosan 2a (a körülírt kör átmérője).'
      },
      {
        id: 'grq3-26',
        questionTypeBadge: 'Szabályos Hatszög Rövidebb Átlója',
        question: 'Milyen hosszú az "a" oldalú szabályos hatszög rövidebb átlója (két másodszomszédos csúcs távolsága)?',
        options: ['a√3', '2a', 'a√2', '1,5a'],
        correctAnswer: 0,
        hint: 'Ez két darab 30-60-90-es háromszög magasságának összege, vagy egy 120°-os egyenlő szárú háromszög alapja.',
        explanation: 'A rövidebb átló két szabályos háromszög magasságából tevődik össze: 2 · (a√3 / 2) = a√3.'
      },
      {
        id: 'grq3-27',
        questionTypeBadge: 'Deltoid Területe',
        question: 'Egy deltoid átlói merőlegesek egymásra, hosszuk e = 14 cm és f = 10 cm. Mekkora a területe?',
        options: ['70 cm²', '140 cm²', '35 cm²', '100 cm²'],
        correctAnswer: 0,
        hint: 'Bármely merőleges átlójú négyszög területe: T = (e · f) / 2.',
        explanation: 'A merőleges átlójú négyszögek területe a befoglaló téglalap felével egyenlő: T = (14 · 10) / 2 = 70 cm².'
      },
      {
        id: 'grq3-28',
        questionTypeBadge: 'Háromszög Külső Szögfelezői',
        question: 'A háromszög két külső szögfelezőjének és a harmadik belső szögfelezőjének metszéspontja mit határoz meg?',
        options: [
          'A hozzáírt körök egyikének középpontját',
          'A beírt kör középpontját',
          'A súlypontot',
          'A magasságpontot'
        ],
        correctAnswer: 0,
        hint: 'Egy háromszögnek 1 beírt köre és 3 hozzáírt köre van.',
        explanation: 'Két külső szögfelező és a harmadik belső szögfelező egy pontban metszi egymást: ez a háromszög egyik hozzáírt körének középpontja.'
      },
      {
        id: 'grq3-29',
        questionTypeBadge: 'Szögfelező Aránytétele',
        question: 'A háromszög belső szögfelezője a szemközti oldalt milyen arányban osztja fel?',
        options: [
          'A szomszédos oldalak hosszának arányában (x / y = b / c)',
          'Mindig pontosan felezi (1 : 1)',
          'A magasságok fordított arányában',
          'Négyzetes arányban (b² / c²)'
        ],
        correctAnswer: 0,
        hint: 'Ez a szögfelezőtétel: a szögfelező a szemközti oldalt a közrefogó oldalak arányában osztja.',
        explanation: 'A szögfelezőtétel kimondja, hogy a háromszög belső szögfelezője a szemközti oldalt a szomszédos oldalak hosszának arányában osztja fel: x / y = b / c.'
      },
      {
        id: 'grq3-30',
        questionTypeBadge: 'Érettségi Összefoglaló Tétel',
        question: 'Melyik állítás HAMIS az alábbiak közül?',
        options: [
          'Minden háromszögben a magasságpont mindig a háromszög belsejében van',
          'A beírt kör középpontja minden háromszögben a belső tartományban helyezkedik el',
          'A Thalész-kör átmérője a köré írt derékszögű háromszög átfogója',
          'A háromszög súlypontja a súlyvonalakat 2 : 1 arányban osztja'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a tompaszögű háromszög magasságpontjára!',
        explanation: 'Az állítás hamis: a magasságpont tompaszögű háromszögben a háromszögön KÍVÜL van, míg derékszögű háromszögben maga a derékszögű csúcs. Csak hegyesszögű háromszögben van belül.'
      }
    ]
  }
};

export const GeometryReviewQuiz: React.FC<GeometryReviewQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="13. Gyakorlás, tudáspróba – Átfogó Kvíz"
      subtitle="90 feladat 3 szinten: a IV. fejezet teljes anyagának ellenőrzése és érettségi szintű felkészülés"
      themeColor="red"
      levels={quizLevels}
      storageKey="grade9-geometry-review-quiz"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          label: 'Párosító játék',
          icon: <Sparkles className="w-4 h-4" />,
          description: 'Kösd össze az összetartozó geometriai elemeket!',
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz }) => (
            <GeometryReviewMatcher
              level={level}
              currentLevel={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onBack={onBack}
              onSwitchToTheory={onSwitchToTheory}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToSorter={onSwitchToSorter}
            />
          )
        },
        {
          id: 'sorter',
          label: 'Csoportosító játék',
          icon: <Layers className="w-4 h-4" />,
          description: 'Válogasd szét a kategóriákba!',
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz }) => (
            <GeometryReviewSorter
              level={level}
              currentLevel={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onBack={onBack}
              onSwitchToTheory={onSwitchToTheory}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToMatcher={onSwitchToMatcher}
            />
          )
        }
      ]}
      cheatSheetContent={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CheatSheetCard
            title="Szögek és Háromszögek Alaptételei"
            icon={<Triangle className="w-5 h-5 text-red-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Belső szögösszeg:</strong> α + β + γ = 180°</li>
              <li><strong>Külső szögösszeg:</strong> Mindig 360°</li>
              <li><strong>Külső szög tétele:</strong> α' = β + γ (a két nem mellette fekvő összege)</li>
              <li><strong>Háromszög-egyenlőtlenség:</strong> a + b &gt; c (létezés feltétele)</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Pitagorasz és Különleges Derékszögűek"
            icon={<BookmarkCheck className="w-5 h-5 text-red-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Pitagorasz-tétel:</strong> a² + b² = c² (megfordítása is érvényes!)</li>
              <li><strong>30°-60°-90°:</strong> Oldalak a, a√3, 2a (a 30°-os befogó = c/2)</li>
              <li><strong>45°-45°-90°:</strong> Oldalak a, a, a√2 (négyzet átlója d = a√2)</li>
              <li><strong>Magasság- és befogótétel:</strong> m² = p · q, &nbsp; a² = c · p</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Nevezetes Pontok és Euler-egyenes"
            icon={<Compass className="w-5 h-5 text-red-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>O:</strong> Oldalfelező merőlegesek metszése (körülírt kör kp.)</li>
              <li><strong>I:</strong> Belső szögfelezők metszése (beírt kör kp., mindig belül)</li>
              <li><strong>M:</strong> Magasságvonalak metszése (derékszögűnél a derékszögű csúcs)</li>
              <li><strong>S:</strong> Súlyvonalak metszése (csúcstól mérve 2 : 1 arányban oszt)</li>
              <li><strong>Euler-egyenes:</strong> M, S, O egy egyenesen, és MS : SO = 2 : 1</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Thalész és Területképletek"
            icon={<Circle className="w-5 h-5 text-red-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Thalész:</strong> Kör átmérőjének látószöge = 90°</li>
              <li><strong>Alap-magasság:</strong> T = (a · m_a) / 2 = (a · b) / 2 (derékszögű)</li>
              <li><strong>Szabályos háromszög:</strong> T = (a²√3) / 4, &nbsp; m = (a√3) / 2</li>
              <li><strong>Hérón-képlet:</strong> T = √[s(s-a)(s-b)(s-c)], ahol s = (a+b+c)/2</li>
              <li><strong>Sugarak:</strong> r = T / s &nbsp;és&nbsp; R = abc / (4T) (derékszögűnél R = c/2)</li>
            </ul>
          </CheatSheetCard>
        </div>
      }
    />
  );
};

