import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PythagorasMatcher } from './PythagorasMatcher';
import { PythagorasSorter } from './PythagorasSorter';
import {
  PythagorasTheoremSvg,
  PythagoreanTriplesSvg,
  ConversePythagorasSvg,
  GeometricApplicationSvg
} from './PythagorasFigures';
import { ArrowRightLeft, LayoutGrid, Layers, Scale, Calculator, Square } from 'lucide-react';

interface PythagorasQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Átfogó Kiszámítása (Könnyű)',
    subtitle: 'A Pitagorasz-tétel kimondása, területi jelentése és átfogó keresése egész számokkal.',
    range: '1 - 10. feladat',
    focus: 'A tétel alapjai és közvetlen számítások',
    questions: [
      {
        id: 'pq1-1',
        questionTypeBadge: 'Tétel Felismerése',
        question: 'Melyik egyenlet fejezi ki a Pitagorasz-tételt egy olyan derékszögű háromszögben, amelynek befogói a és b, átfogója pedig c?',
        figure: <PythagorasTheoremSvg size={200} />,
        options: ['a² + b² = c²', 'a + b = c', 'a² + c² = b²', 'a² · b² = c²'],
        correctAnswer: 0,
        hint: 'A két befogó négyzetének összege egyenlő az átfogó négyzetével.',
        explanation: 'A derékszögű háromszögben a két befogó négyzetének összege mindig megegyezik az átfogó négyzetével: a² + b² = c².'
      },
      {
        id: 'pq1-2',
        questionTypeBadge: 'Átfogó Kiszámítása',
        question: 'Egy derékszögű háromszög két befogója a = 3 cm és b = 4 cm. Milyen hosszú az átfogó (c)?',
        figure: <PythagoreanTriplesSvg size={200} />,
        options: ['5 cm', '7 cm', '6 cm', '25 cm'],
        correctAnswer: 0,
        hint: 'c = √(3² + 4²) = √(9 + 16).',
        explanation: 'c² = a² + b² = 3² + 4² = 9 + 16 = 25, amiből c = √25 = 5 cm. Ez a legismertebb primitív pitagoraszi számhármas.'
      },
      {
        id: 'pq1-3',
        questionTypeBadge: 'Átfogó Kiszámítása',
        question: 'Egy derékszögű háromszög befogói 6 cm és 8 cm. Mekkora az átfogó?',
        options: ['10 cm', '14 cm', '12 cm', '100 cm'],
        correctAnswer: 0,
        hint: 'Ez a (3, 4, 5) számhármas kétszerese: c = √(36 + 64).',
        explanation: 'c² = 6² + 8² = 36 + 64 = 100, így c = √100 = 10 cm.'
      },
      {
        id: 'pq1-4',
        questionTypeBadge: 'Érvényességi Kör',
        question: 'Milyen háromszögekre érvényes a Pitagorasz-tétel?',
        options: [
          'Kizárólag derékszögű háromszögekre',
          'Minden háromszögre',
          'Csak egyenlő szárú háromszögekre',
          'Minden hegyesszögű háromszögre'
        ],
        correctAnswer: 0,
        hint: 'A tétel a derékszöget bezáró befogók és az átfogó kapcsolatát írja le.',
        explanation: 'A Pitagorasz-tétel kizárólag olyan síkbeli háromszögekre érvényes, amelyeknek van egy 90°-os szöge (derékszögű háromszögek).'
      },
      {
        id: 'pq1-5',
        questionTypeBadge: 'Területi Jelentés',
        question: 'Egy derékszögű háromszög két befogójára kifelé rajzolt négyzetek területe 25 cm² és 144 cm². Mekkora az átfogóra rajzolt négyzet területe?',
        figure: <PythagorasTheoremSvg size={200} />,
        options: ['169 cm²', '119 cm²', '13 cm²', '144 cm²'],
        correctAnswer: 0,
        hint: 'A befogókra emelt négyzetek területeinek összege egyenlő az átfogóra emelt négyzet területével: T_c = T_a + T_b.',
        explanation: 'A tétel geometriai értelme: T_c = T_a + T_b = 25 cm² + 144 cm² = 169 cm² (az átfogó maga c = √169 = 13 cm).'
      },
      {
        id: 'pq1-6',
        questionTypeBadge: 'Nevezetes Számhármas',
        question: 'Egy derékszögű háromszög befogói 5 cm és 12 cm. Mekkora az átfogója?',
        figure: <PythagoreanTriplesSvg size={200} />,
        options: ['13 cm', '17 cm', '15 cm', '169 cm'],
        correctAnswer: 0,
        hint: 'c = √(5² + 12²) = √(25 + 144).',
        explanation: 'c² = 5² + 12² = 25 + 144 = 169, amiből c = √169 = 13 cm. Az (5, 12, 13) nevezetes pitagoraszi számhármas.'
      },
      {
        id: 'pq1-7',
        questionTypeBadge: 'Oldalak Elnevezése',
        question: 'Melyik a derékszögű háromszög leghosszabb oldala?',
        options: [
          'Az átfogó (a derékszöggel szemközti oldal)',
          'A nagyobbik befogó',
          'Mindkét befogó hosszabb az átfogónál',
          'Mindig a függőleges oldal'
        ],
        correctAnswer: 0,
        hint: 'A legnagyobb belső szöggel (90°) szemben a leghosszabb oldal található.',
        explanation: 'Mivel a háromszögben a legnagyobb szög a derékszög (a másik kettő hegyesszög, összegük 90°), a vele szemközti átfogó mindig a leghosszabb oldal.'
      },
      {
        id: 'pq1-8',
        questionTypeBadge: 'Átfogó Kiszámítása',
        question: 'Egy derékszögű háromszög befogói 8 cm és 15 cm. Milyen hosszú az átfogó?',
        options: ['17 cm', '23 cm', '19 cm', '289 cm'],
        correctAnswer: 0,
        hint: 'c = √(64 + 225) = √289.',
        explanation: 'c² = 8² + 15² = 64 + 225 = 289, amiből c = √289 = 17 cm. A (8, 15, 17) primitív pitagoraszi számhármas.'
      },
      {
        id: 'pq1-9',
        questionTypeBadge: 'Számhármas Többszöröse',
        question: 'A (3, 4, 5) számhármas háromszorosával mekkora oldalú derékszögű háromszöget kapunk?',
        options: ['(9, 12, 15)', '(6, 7, 8)', '(9, 16, 25)', '(6, 8, 10)'],
        correctAnswer: 0,
        hint: 'Szorozd meg mindhárom tagot 3-mal!',
        explanation: '3 · (3, 4, 5) = (3·3, 4·3, 5·3) = (9, 12, 15). Ellenőrzés: 9² + 12² = 81 + 144 = 225 = 15².'
      },
      {
        id: 'pq1-10',
        questionTypeBadge: 'Képlet Kifejezése',
        question: 'Hogyan fejezhető ki a c átfogó közvetlenül az a és b befogókból?',
        options: ['c = √(a² + b²)', 'c = a + b', 'c = √(a + b)', 'c = a² + b²'],
        correctAnswer: 0,
        hint: 'A c² = a² + b² egyenlet mindkét oldalából négyzetgyököt vonunk.',
        explanation: 'Mivel c² = a² + b² és c > 0, ezért c = √(a² + b²).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Befogó Keresése és a Tétel Megfordítása (Közepes)',
    subtitle: 'Befogó kiszámítása (a = √(c² - b²)), szögfajták eldöntése és téglalap átlója.',
    range: '11 - 20. feladat',
    focus: 'Hiányzó befogó és háromszög-ellenőrzés',
    questions: [
      {
        id: 'pq2-1',
        questionTypeBadge: 'Befogó Kiszámítása',
        question: 'Egy derékszögű háromszög átfogója c = 10 cm, egyik befogója a = 6 cm. Mekkora a másik befogó (b)?',
        options: ['8 cm', '4 cm', '16 cm', '64 cm'],
        correctAnswer: 0,
        hint: 'b = √(c² - a²) = √(100 - 36).',
        explanation: 'b² = c² - a² = 10² - 6² = 100 - 36 = 64, így b = √64 = 8 cm. (Ez a 6-8-10-es háromszög).'
      },
      {
        id: 'pq2-2',
        questionTypeBadge: 'Befogó Kiszámítása',
        question: 'Egy derékszögű háromszög átfogója c = 25 cm, egyik befogója a = 7 cm. Milyen hosszú a b befogó?',
        options: ['24 cm', '18 cm', '32 cm', '20 cm'],
        correctAnswer: 0,
        hint: 'b = √(25² - 7²) = √(625 - 49).',
        explanation: 'b² = 25² - 7² = 625 - 49 = 576, amiből b = √576 = 24 cm. A (7, 24, 25) pitagoraszi számhármas.'
      },
      {
        id: 'pq2-3',
        questionTypeBadge: 'Tétel Megfordítása',
        question: 'Derékszögű-e az a háromszög, amelynek oldalai 9 cm, 40 cm és 41 cm?',
        figure: <ConversePythagorasSvg size={200} />,
        options: [
          'Igen, mert 9² + 40² = 81 + 1600 = 1681 = 41²',
          'Nem, mert 9 + 40 ≠ 41',
          'Nem, mert tompaszögű',
          'Csak akkor, ha egyenlő szárú'
        ],
        correctAnswer: 0,
        hint: 'Számold ki: 9² + 40² és hasonlítsd össze 41²-nel!',
        explanation: '9² = 81, 40² = 1600, összegük 1681. Mivel 41² = 1681, teljesül az a² + b² = c² egyenlőség, így a háromszög derékszögű.'
      },
      {
        id: 'pq2-4',
        questionTypeBadge: 'Szögfajta Meghatározása',
        question: 'Egy háromszög oldalai 4 cm, 5 cm és 6 cm. Milyen szögű a háromszög?',
        figure: <ConversePythagorasSvg size={200} />,
        options: [
          'Hegyesszögű (mert 4² + 5² = 41 > 6² = 36)',
          'Derékszögű (mert 4² + 5² = 6²)',
          'Tompaszögű (mert 4² + 5² < 6²)',
          'Nem alkothat háromszöget'
        ],
        correctAnswer: 0,
        hint: 'Hasonlítsd össze a két kisebb négyzetösszegét (16 + 25) a legnagyobb oldal négyzetével (36)!',
        explanation: '4² + 5² = 16 + 25 = 41, míg 6² = 36. Mivel 41 > 36 (a² + b² > c²), a háromszög mindhárom szöge hegyesszög (< 90°).'
      },
      {
        id: 'pq2-5',
        questionTypeBadge: 'Szögfajta Meghatározása',
        question: 'Egy háromszög oldalai 3 cm, 5 cm és 7 cm. Milyen szögű a háromszög?',
        options: [
          'Tompaszögű (mert 3² + 5² = 34 < 7² = 49)',
          'Hegyesszögű',
          'Derékszögű',
          'Szabályos'
        ],
        correctAnswer: 0,
        hint: 'A két kisebb oldal négyzete 9 + 25 = 34, a leghosszabb 49.',
        explanation: '3² + 5² = 9 + 25 = 34. A leghosszabb oldal négyzete 7² = 49. Mivel 34 < 49 (a² + b² < c²), a 7 cm-es oldallal szemközti szög tompaszög (> 90°).'
      },
      {
        id: 'pq2-6',
        questionTypeBadge: 'Téglalap Átlója',
        question: 'Egy téglalap szomszédos oldalai 9 cm és 12 cm. Milyen hosszú a téglalap átlója?',
        figure: <GeometricApplicationSvg size={200} />,
        options: ['15 cm', '21 cm', '18 cm', '225 cm'],
        correctAnswer: 0,
        hint: 'A téglalap átlója derékszögű háromszöget alkot az oldalakkal: d = √(9² + 12²).',
        explanation: 'd² = 9² + 12² = 81 + 144 = 225, amiből d = √225 = 15 cm. (A 3-4-5 számhármas háromszorosa).'
      },
      {
        id: 'pq2-7',
        questionTypeBadge: 'Gyakorlati Szöveges Feladat',
        question: 'Egy 5 méter hosszú létrát támasztunk a függőleges falhoz úgy, hogy az alja 3 méterre van a faltól. Milyen magasan éri el a létra a falat?',
        options: ['4 méter', '2 méter', '3,5 méter', '16 méter'],
        correctAnswer: 0,
        hint: 'A létra hossza az átfogó (c = 5), a faltól való távolság az egyik befogó (a = 3). Keresd a b befogót!',
        explanation: 'A fal és a talaj derékszöget zár be. b² = c² - a² = 5² - 3² = 25 - 9 = 16, így b = √16 = 4 méter magasan éri el a falat.'
      },
      {
        id: 'pq2-8',
        questionTypeBadge: 'Befogó Képlet',
        question: 'Hogyan fejezhető ki helyesen az a befogó a c átfogóból és a b befogóból?',
        options: ['a = √(c² - b²)', 'a = √(b² - c²)', 'a = c - b', 'a = √(c² + b²)'],
        correctAnswer: 0,
        hint: 'Az átfogó négyzetéből vonjuk ki a másik befogó négyzetét, nem fordítva!',
        explanation: 'Mivel c² = a² + b², mindkét oldalból b²-et kivonva kapjuk: a² = c² - b², amiből a = √(c² - b²).'
      },
      {
        id: 'pq2-9',
        questionTypeBadge: 'Többszörös Felismerése',
        question: 'Az alábbiak közül melyik számhármas NEM pitagoraszi számhármas?',
        options: ['(4, 5, 6)', '(6, 8, 10)', '(5, 12, 13)', '(10, 24, 26)'],
        correctAnswer: 0,
        hint: 'Ellenőrizd az a² + b² = c² feltételt!',
        explanation: 'A (4, 5, 6) esetén 4² + 5² = 16 + 25 = 41 ≠ 6² = 36, tehát nem pitagoraszi számhármas. A többi mind derékszögű háromszöget ad.'
      },
      {
        id: 'pq2-10',
        questionTypeBadge: 'Egyenlő Szárú Derékszögű',
        question: 'Egy egyenlő szárú derékszögű háromszög befogói 1-1 egység hosszúak. Mekkora az átfogója?',
        options: ['√2 egység (kb. 1,41)', '2 egység', '1 egység', '√3 egység'],
        correctAnswer: 0,
        hint: 'c² = 1² + 1² = 2.',
        explanation: 'c² = 1² + 1² = 1 + 1 = 2, így c = √2. Ez az egységnégyzet átlójának hossza.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Geometriai Alkalmazások és Emelt Szintű Számítások (Nehéz)',
    subtitle: 'Négyzet átlója (a√2), szabályos háromszög magassága, szimmetrikus alakzatok és távolságok.',
    range: '21 - 30. feladat',
    focus: 'Összetett alakzatok és alkalmazott geometria',
    questions: [
      {
        id: 'pq3-1',
        questionTypeBadge: 'Négyzet Átlója',
        question: 'Egy négyzet oldala a = 6 cm. Mennyi a négyzet átlójának pontos hossza?',
        figure: <GeometricApplicationSvg size={200} />,
        options: ['6√2 cm (kb. 8,49 cm)', '12 cm', '6√3 cm', '36 cm'],
        correctAnswer: 0,
        hint: 'd = √(a² + a²) = √(2a²) = a · √2.',
        explanation: 'A négyzet átlója az oldalakkal derékszögű háromszöget alkot: d² = 6² + 6² = 36 + 36 = 72, így d = √72 = √(36 · 2) = 6√2 cm.'
      },
      {
        id: 'pq3-2',
        questionTypeBadge: 'Négyzet Oldala Átlóból',
        question: 'Egy négyzet átlója d = 10 cm. Mennyi a négyzet oldala (a)?',
        options: ['5√2 cm (kb. 7,07 cm)', '5 cm', '10√2 cm', '8 cm'],
        correctAnswer: 0,
        hint: 'Mivel d = a√2, ezért a = d / √2 = 10 / √2.',
        explanation: 'a = 10 / √2 = (10 · √2) / 2 = 5√2 cm. (Ellenőrzés: (5√2)² + (5√2)² = 50 + 50 = 100 = 10²).'
      },
      {
        id: 'pq3-3',
        questionTypeBadge: 'Szabályos Háromszög Magassága',
        question: 'Egy 10 cm oldalú szabályos (egyenlő oldalú) háromszögben milyen hosszú az alaphoz tartozó magasságvonal?',
        options: ['5√3 cm (kb. 8,66 cm)', '5 cm', '5√2 cm', '10√3 cm'],
        correctAnswer: 0,
        hint: 'A magasságvonal az oldalt 5 cm-es szakaszokra felezi: m = √(10² - 5²).',
        explanation: 'A szabályos háromszög fele egy derékszögű háromszög, ahol az átfogó 10 cm, az egyik befogó 5 cm. m² = 10² - 5² = 100 - 25 = 75, így m = √75 = √(25 · 3) = 5√3 cm.'
      },
      {
        id: 'pq3-4',
        questionTypeBadge: 'Egyenlő Szárú Háromszög Magassága',
        question: 'Egy egyenlő szárú háromszög alapja a = 12 cm, szárai pedig b = 10 cm hosszúak. Mekkora az alaphoz tartozó magasság (m)?',
        figure: <GeometricApplicationSvg size={200} />,
        options: ['8 cm', '6 cm', '10 cm', '4 cm'],
        correctAnswer: 0,
        hint: 'A magasságvonal felezi az alapot: a/2 = 6 cm. Alkalmazd a Pitagorasz-tételt a derékszögű részháromszögre: m = √(10² - 6²).',
        explanation: 'Az alap fele 6 cm. A derékszögű háromszögben az átfogó a szár (10 cm), az egyik befogó az alap fele (6 cm). m = √(10² - 6²) = √(100 - 36) = √64 = 8 cm.'
      },
      {
        id: 'pq3-5',
        questionTypeBadge: 'Egyenlő Szárú Háromszög Területe',
        question: 'Mekkora az előző feladatbeli egyenlő szárú háromszög területe (alap = 12 cm, szár = 10 cm, magasság = 8 cm)?',
        options: ['48 cm²', '96 cm²', '60 cm²', '40 cm²'],
        correctAnswer: 0,
        hint: 'T = (alap · magasság) / 2.',
        explanation: 'T = (a · m) / 2 = (12 · 8) / 2 = 96 / 2 = 48 cm².'
      },
      {
        id: 'pq3-6',
        questionTypeBadge: 'Rombusz Átlói és Oldala',
        question: 'Egy rombusz átlói e = 12 cm és f = 16 cm hosszúak. Milyen hosszú a rombusz oldala (a)?',
        options: ['10 cm', '14 cm', '20 cm', '8 cm'],
        correctAnswer: 0,
        hint: 'A rombusz átlói merőlegesen felezik egymást! A félátlók: e/2 = 6 cm és f/2 = 8 cm.',
        explanation: 'A rombuszt az átlói négy egybevágó derékszögű háromszögre bontják, amelyek befogói a félátlók: 6 cm és 8 cm. Az oldal az átfogó: a = √(6² + 8²) = √(36 + 64) = √100 = 10 cm.'
      },
      {
        id: 'pq3-7',
        questionTypeBadge: 'Kör Húrja és Távolsága',
        question: 'Egy r = 13 cm sugarú körben egy húr hossza 24 cm. Milyen távol van a húr a kör középpontjától?',
        options: ['5 cm', '7 cm', '12 cm', '11 cm'],
        correctAnswer: 0,
        hint: 'A középpontból a húrra bocsátott merőleges felezi a húrt (12 cm). A sugár (13 cm) az átfogó.',
        explanation: 'A sugár, a húr fele (12 cm) és a távolság (d) derékszögű háromszöget alkot. d = √(13² - 12²) = √(169 - 144) = √25 = 5 cm.'
      },
      {
        id: 'pq3-8',
        questionTypeBadge: 'Koordinátageometria Távolság',
        question: 'Milyen távol van az origótól az A(8; 15) pont a derékszögű koordináta-rendszerben?',
        options: ['17 egység', '23 egység', '15 egység', '√161 egység'],
        correctAnswer: 0,
        hint: 'A pont koordinátái a befogók: x = 8, y = 15. A távolság d = √(8² + 15²).',
        explanation: 'A koordináta-tengelyek merőlegesek, így d = √(x² + y²) = √(8² + 15²) = √(64 + 225) = √289 = 17 egység.'
      },
      {
        id: 'pq3-9',
        questionTypeBadge: 'Téglatest Testátlója',
        question: 'Egy téglatest élhosszúságai a = 3 cm, b = 4 cm és c = 12 cm. Milyen hosszú a testátlója (D)?',
        options: ['13 cm', '19 cm', '15 cm', '144 cm'],
        correctAnswer: 0,
        hint: 'Térbeli Pitagorasz-tétel: D = √(a² + b² + c²).',
        explanation: 'Az alaplap átlója d = √(3² + 4²) = 5 cm. A testátló a magassággal (12 cm) és az alapátlóval derékszögű háromszöget alkot: D = √(5² + 12²) = √(25 + 144) = √169 = 13 cm. (Vagy közvetlenül: D = √(3² + 4² + 12²) = √(9 + 16 + 144) = √169 = 13 cm).'
      },
      {
        id: 'pq3-10',
        questionTypeBadge: 'Pitagorasz Általánosítás (Alakzatok a befogókon)',
        question: 'A derékszögű háromszög mindhárom oldalára kifelé félköröket rajzolunk (a, b és c átmérővel). Mi mondható el a két befogóra rajzolt félkör területének összegéről?',
        options: [
          'Pontosan megegyezik az átfogóra rajzolt félkör területével (T_c = T_a + T_b)',
          'Nagyobb, mint az átfogóra rajzolt félkör területe',
          'Kisebb, mint az átfogóra rajzolt félkör területe',
          'Nem állandó, függ a hegyesszögek nagyságától'
        ],
        correctAnswer: 0,
        hint: 'A tétel nemcsak négyzetekre, hanem bármilyen egymáshoz hasonló síkidomra (félkörök, szabályos sokszögek) is érvényes!',
        explanation: 'A Pitagorasz-tétel általánosítása szerint a befogókra kifelé rajzolt bármely hasonló síkidomok területeinek összege egyenlő az átfogóra rajzolt megfelelő alakzat területével. Ezen alapul Hippokratész híres holdacskáinak tétele is.'
      }
    ]
  }
};

export const PythagorasQuiz: React.FC<PythagorasQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Pitagorasz tétele"
      subtitle="30 feladat 3 szinten, párosító és csoportosító módokkal, a derékszögű háromszög alapjaitól a geometriai alkalmazásokig"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-pitagorasz"
      topicBadge="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • KVÍZ"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      levels={quizLevels}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító játék',
          subtitle: 'Keresd meg az összetartozó geometriai párokat!',
          icon: <ArrowRightLeft className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <PythagorasMatcher
              key={`pythagoras-matcher-${level}`}
              level={level}
              currentLevel={level}
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
          title: 'Csoportosító játék',
          subtitle: 'Csoportosítsd a számhármasokat és szögfajtákat!',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <PythagorasSorter
              key={`pythagoras-sorter-${level}`}
              level={level}
              currentLevel={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToMatcher={switchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
      cheatSheetContent={
        <div className="space-y-4">
          <CheatSheetCard
            title="A Pitagorasz-tétel Képletei"
            icon={<Layers className="w-5 h-5 text-blue-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Alapösszefüggés:</strong> a² + b² = c² (kizárólag derékszögű háromszögben!)</li>
              <li><strong>Átfogó keresése:</strong> c = √(a² + b²)</li>
              <li><strong>Befogó keresése:</strong> a = √(c² - b²) és b = √(c² - a²)</li>
              <li><strong>Területi jelentés:</strong> T_c = T_a + T_b</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Pitagoraszi Számhármasok & Megfordítás"
            icon={<Scale className="w-5 h-5 text-emerald-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Alap számhármasok:</strong> (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25)</li>
              <li><strong>Többszörösök:</strong> (6, 8, 10), (9, 12, 15), (10, 24, 26)</li>
              <li><strong>Hegyesszögű:</strong> a² + b² &gt; c²</li>
              <li><strong>Derékszögű:</strong> a² + b² = c²</li>
              <li><strong>Tompaszögű:</strong> a² + b² &lt; c²</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Alkalmazások Síkidomokban"
            icon={<Square className="w-5 h-5 text-purple-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Négyzet átlója:</strong> d = a · √2</li>
              <li><strong>Szabályos háromszög magassága:</strong> m = (a · √3) / 2</li>
              <li><strong>Téglatest testátlója:</strong> D = √(a² + b² + c²)</li>
              <li><strong>Egyenlő szárú magassága:</strong> m = √(b² - (a/2)²)</li>
            </ul>
          </CheatSheetCard>
        </div>
      }
    />
  );
};
