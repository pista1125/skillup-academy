import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { SpecialTrianglesMatcher } from './SpecialTrianglesMatcher';
import { SpecialTrianglesSorter } from './SpecialTrianglesSorter';
import {
  HalfEquilateralSvg,
  IsoscelesRightSvg,
  SpecialTrianglesComparisonSvg
} from './SpecialTrianglesFigures';
import { ArrowRightLeft, LayoutGrid, Layers, Scale, Square, Triangle } from 'lucide-react';

interface SpecialTrianglesQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Oldalarányok (Könnyű)',
    subtitle: 'A 30°-60°-90° és a 45°-45°-90° háromszögek közvetlen oldalszámításai és szögei.',
    range: '1 - 10. feladat',
    focus: 'Különleges háromszögek alapismeretei',
    questions: [
      {
        id: 'sq1-1',
        questionTypeBadge: 'Félszabályos Háromszög Aránya',
        question: 'Milyen arányban állnak egymással a 30°-60°-90°-os háromszög oldalai a legrövidebbtől a leghosszabbig haladva?',
        figure: <HalfEquilateralSvg size={200} />,
        options: ['1 : √3 : 2', '1 : 1 : √2', '3 : 4 : 5', '1 : 2 : 3'],
        correctAnswer: 0,
        hint: 'A 30°-kal szemközti oldal 1, a 60°-kal szemközti √3, az átfogó pedig 2 egység.',
        explanation: 'A 30°-60°-90°-os háromszög oldalaránya 1 : √3 : 2. Az átfogó mindig kétszerese a 30°-os szöggel szemközti rövidebb befogónak.'
      },
      {
        id: 'sq1-2',
        questionTypeBadge: 'Egyenlő Szárú Derékszögű Aránya',
        question: 'Milyen arányban állnak egymással a 45°-45°-90°-os háromszög oldalai?',
        figure: <IsoscelesRightSvg size={200} />,
        options: ['1 : 1 : √2', '1 : √3 : 2', '1 : 2 : √5', '1 : 1 : 2'],
        correctAnswer: 0,
        hint: 'A két befogó egyenlő, az átfogó a négyzet átlója.',
        explanation: 'A 45°-45°-90°-os háromszög két befogója egyenlő ($a$), az átfogója pedig $a\sqrt{2}$, így az oldalarány 1 : 1 : √2.'
      },
      {
        id: 'sq1-3',
        questionTypeBadge: 'Átfogó Keresése (30°-60°-90°)',
        question: 'Egy 30°-60°-90°-os háromszögben a 30°-os szöggel szemközti rövidebb befogó 6 cm. Milyen hosszú az átfogó (c)?',
        options: ['12 cm', '6√3 cm', '18 cm', '6√2 cm'],
        correctAnswer: 0,
        hint: 'Az átfogó pontosan a kétszerese a 30°-os szöggel szemközti oldalnak: c = 2a.',
        explanation: 'c = 2 · a = 2 · 6 cm = 12 cm.'
      },
      {
        id: 'sq1-4',
        questionTypeBadge: 'Hosszabbik Befogó Keresése',
        question: 'Az előző feladatbeli háromszögben (rövid befogó a = 6 cm) milyen hosszú a 60°-os szöggel szemközti hosszabbik befogó?',
        options: ['6√3 cm (kb. 10,39 cm)', '12 cm', '6√2 cm', '9 cm'],
        correctAnswer: 0,
        hint: 'b = a · √3.',
        explanation: 'A 60°-kal szemközti befogó a rövidebbik befogó √3-szorosa: b = 6√3 cm.'
      },
      {
        id: 'sq1-5',
        questionTypeBadge: 'Átfogó Keresése (45°-45°-90°)',
        question: 'Egy egyenlő szárú derékszögű háromszög befogói 8 cm hosszúak. Milyen hosszú az átfogója?',
        figure: <IsoscelesRightSvg size={200} />,
        options: ['8√2 cm (kb. 11,31 cm)', '16 cm', '8√3 cm', '64 cm'],
        correctAnswer: 0,
        hint: 'c = a · √2.',
        explanation: 'c = a · √2 = 8√2 cm. Ez megegyezik a 8 cm oldalú négyzet átlójának hosszával.'
      },
      {
        id: 'sq1-6',
        questionTypeBadge: 'Eredet és Származtatás',
        question: 'Melyik síkidom felezésével keletkezik a 30°-60°-90°-os háromszög?',
        options: [
          'Szabályos (egyenlő oldalú) háromszög',
          'Négyzet',
          'Szabályos ötszög',
          'Egyenlő szárú tompaszögű háromszög'
        ],
        correctAnswer: 0,
        hint: 'A szabályos háromszög mindegyik szöge 60°, magassága az egyiket két 30°-os szögre osztja.',
        explanation: 'A szabályos háromszög egyik magasságvonalát behúzva két egybevágó 30°-60°-90°-os derékszögű háromszöget kapunk.'
      },
      {
        id: 'sq1-7',
        questionTypeBadge: 'Eredet és Származtatás',
        question: 'Melyik síkidom felezésével keletkezik a 45°-45°-90°-os háromszög?',
        options: ['Négyzet (átlója mentén)', 'Téglalap', 'Rombusz', 'Szabályos háromszög'],
        correctAnswer: 0,
        hint: 'A négyzet 90°-os szögeit az átló két 45°-os szögre felezi.',
        explanation: 'A négyzetet az egyik átlója mentén kettévágva két egybevágó 45°-45°-90°-os egyenlő szárú derékszögű háromszög jön létre.'
      },
      {
        id: 'sq1-8',
        questionTypeBadge: 'Rövid Befogó Keresése Átfogóból',
        question: 'Egy 30°-60°-90°-os háromszög átfogója c = 16 cm. Mekkora a 30°-os szöggel szemközti befogója?',
        options: ['8 cm', '8√3 cm', '4 cm', '16√3 cm'],
        correctAnswer: 0,
        hint: 'A 30°-kal szemközti oldal mindig az átfogó fele: a = c / 2.',
        explanation: 'a = c / 2 = 16 / 2 = 8 cm.'
      },
      {
        id: 'sq1-9',
        questionTypeBadge: '45°-45°-90° Szimmetria',
        question: 'Hány szimmetriatengelye van egy 45°-45°-90°-os háromszögnek?',
        options: ['1 szimmetriatengely (az átfogóhoz tartozó magasság)', '2', '3', '0 (nincs)'],
        correctAnswer: 0,
        hint: 'Mivel egyenlő szárú háromszög, az alapjának (az átfogónak) felezőmerőlegese tengely.',
        explanation: 'Mint minden egyenlő szárú (nem szabályos) háromszögnek, pontosan 1 szimmetriatengelye van: a derékszögű csúcsból induló szögfelező/magasságvonal.'
      },
      {
        id: 'sq1-10',
        questionTypeBadge: 'Területképlet (45°-45°-90°)',
        question: 'Egy egyenlő szárú derékszögű háromszög befogói 6 cm hosszúak. Mekkora a területe?',
        options: ['18 cm²', '36 cm²', '12 cm²', '18√2 cm²'],
        correctAnswer: 0,
        hint: 'T = (befogó · befogó) / 2 = a² / 2.',
        explanation: 'T = (a · a) / 2 = 6² / 2 = 36 / 2 = 18 cm² (pontosan a 6 cm oldalú négyzet területének fele).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Visszaszámolások és Gyöktelenítés (Közepes)',
    subtitle: 'Befogó visszaszámolása átfogóból, hosszabbik befogóból, és szabályos háromszög magassága.',
    range: '11 - 20. feladat',
    focus: 'Gyökös átalakítások és fordított feladatok',
    questions: [
      {
        id: 'sq2-1',
        questionTypeBadge: 'Befogó Keresése Átfogóból (45°-45°-90°)',
        question: 'Egy 45°-45°-90°-os háromszög átfogója c = 12 cm. Mekkora a befogója (a)?',
        options: ['6√2 cm (kb. 8,49 cm)', '6 cm', '12√2 cm', '6√3 cm'],
        correctAnswer: 0,
        hint: 'a = c / √2 = 12 / √2. Gyökteleníts: (12 · √2) / 2.',
        explanation: 'a = 12 / √2 = (12 · √2) / 2 = 6√2 cm. (Ellenőrzés: (6√2)² + (6√2)² = 72 + 72 = 144 = 12²).'
      },
      {
        id: 'sq2-2',
        questionTypeBadge: 'Rövid Befogó Keresése b-ből (30°-60°-90°)',
        question: 'Egy 30°-60°-90°-os háromszögben a 60°-os szöggel szemközti hosszabbik befogó b = 15 cm. Mekkora a 30°-os szöggel szemközti rövidebb befogó (a)?',
        options: ['5√3 cm (kb. 8,66 cm)', '5 cm', '15√3 cm', '7,5 cm'],
        correctAnswer: 0,
        hint: 'Mivel b = a√3, ezért a = b / √3 = 15 / √3 = (15√3) / 3.',
        explanation: 'a = 15 / √3 = (15 · √3) / 3 = 5√3 cm. Ekkor az átfogó c = 2a = 10√3 cm.'
      },
      {
        id: 'sq2-3',
        questionTypeBadge: 'Szabályos Háromszög Magassága',
        question: 'Egy szabályos háromszög oldala a = 14 cm. Milyen hosszú a magassága?',
        figure: <HalfEquilateralSvg size={200} />,
        options: ['7√3 cm (kb. 12,12 cm)', '7 cm', '14√3 cm', '7√2 cm'],
        correctAnswer: 0,
        hint: 'A magasság egy félszabályos háromszöget ad, ahol az átfogó 14 cm, a rövid befogó 7 cm: m = 7√3 cm.',
        explanation: 'm = (a · √3) / 2 = (14 · √3) / 2 = 7√3 cm.'
      },
      {
        id: 'sq2-4',
        questionTypeBadge: 'Szabályos Háromszög Oldala Magasságból',
        question: 'Egy szabályos háromszög magassága m = 6√3 cm. Mekkora a háromszög oldala (a)?',
        options: ['12 cm', '6 cm', '18 cm', '6√3 cm'],
        correctAnswer: 0,
        hint: 'm = (a · √3) / 2 = 6√3 => a / 2 = 6.',
        explanation: '(a · √3) / 2 = 6√3 => a / 2 = 6 => a = 12 cm.'
      },
      {
        id: 'sq2-5',
        questionTypeBadge: 'Terület Kiszámítása (30°-60°-90°)',
        question: 'Egy 30°-60°-90°-os háromszög rövidebb befogója a = 4 cm. Mennyi a háromszög területe?',
        options: ['8√3 cm² (kb. 13,86 cm²)', '16√3 cm²', '8 cm²', '16 cm²'],
        correctAnswer: 0,
        hint: 'A másik befogó b = 4√3 cm. T = (a · b) / 2.',
        explanation: 'b = 4√3 cm. T = (a · b) / 2 = (4 · 4√3) / 2 = 16√3 / 2 = 8√3 cm².'
      },
      {
        id: 'sq2-6',
        questionTypeBadge: 'Átfogóhoz Tartozó Magasság (45°-45°-90°)',
        question: 'Egy 45°-45°-90°-os háromszög átfogója c = 10 cm. Milyen hosszú az átfogóhoz tartozó magasságvonal (m_c)?',
        options: ['5 cm', '5√2 cm', '10 cm', '2,5 cm'],
        correctAnswer: 0,
        hint: 'A szimmetria miatt a derékszögű csúcsból induló magasság az átfogót felezi, és maga is két kisebb 45°-45°-90°-os háromszöget hoz létre.',
        explanation: 'Az átfogóhoz tartozó magasság pontosan az átfogó fele: m_c = c / 2 = 10 / 2 = 5 cm (Thalész-tétel és szimmetria alapján).'
      },
      {
        id: 'sq2-7',
        questionTypeBadge: 'Oldalak Aránya Változóval',
        question: 'Ha egy derékszögű háromszög átfogója 2x, egyik befogója pedig x, mekkorák a háromszög hegyesszögei?',
        options: ['30° és 60°', '45° és 45°', '20° és 70°', '35° és 55°'],
        correctAnswer: 0,
        hint: 'Ha az egyik befogó pontosan a fele az átfogónak, az a 30°-60°-90°-os háromszög!',
        explanation: 'Mivel a befogó az átfogó fele ($x / 2x = 1/2$), a szemközti szög szükségképpen 30°, a másik hegyesszög pedig 60°.'
      },
      {
        id: 'sq2-8',
        questionTypeBadge: 'Kocka Lapátlója',
        question: 'Egy 5 cm élhosszúságú kocka lapátlója milyen háromszög átfogója, és mekkora a hossza?',
        options: ['45°-45°-90°-os háromszög átfogója, hossza 5√2 cm', '30°-60°-90°-os, hossza 10 cm', '3-4-5-ös, hossza 5 cm', '5√3 cm'],
        correctAnswer: 0,
        hint: 'A kocka lapja négyzet, átlója a 45°-45°-90°-os háromszög átfogója.',
        explanation: 'A lap négyzet, oldalélei 5 cm és 5 cm. Az átló d = 5√2 cm (egy 45°-45°-90°-os derékszögű háromszög átfogója).'
      },
      {
        id: 'sq2-9',
        questionTypeBadge: 'Négyzet Kerülete Átlóból',
        question: 'Egy négyzet átlója d = 8√2 cm. Mekkora a négyzet kerülete?',
        options: ['32 cm', '64 cm', '16√2 cm', '32√2 cm'],
        correctAnswer: 0,
        hint: 'd = a√2 => a = 8 cm. K = 4a.',
        explanation: 'a = d / √2 = 8 cm. A kerület K = 4 · 8 cm = 32 cm.'
      },
      {
        id: 'sq2-10',
        questionTypeBadge: 'Szabályos Háromszög Területe',
        question: 'Egy 6 cm oldalú szabályos háromszög területe mennyi?',
        options: ['9√3 cm² (kb. 15,59 cm²)', '18 cm²', '18√3 cm²', '9 cm²'],
        correctAnswer: 0,
        hint: 'T = (a² · √3) / 4 = (36 · √3) / 4.',
        explanation: 'T = (a² · √3) / 4 = (36 · √3) / 4 = 9√3 cm².'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Geometriai Feladatok (Nehéz)',
    subtitle: 'Szabályos hatszögek, kombinált síkidomok, kocka testátlója és derékszögű trapéz.',
    range: '21 - 30. feladat',
    focus: 'Emelt szintű problémamegoldás és térgeometria',
    questions: [
      {
        id: 'sq3-1',
        questionTypeBadge: 'Szabályos Hatszög Szemközti Oldalai',
        question: 'Egy szabályos hatszög oldala a = 6 cm. Milyen távol van egymástól két párhuzamos szemközti oldala?',
        options: ['6√3 cm (kb. 10,39 cm)', '12 cm', '6√2 cm', '9 cm'],
        correctAnswer: 0,
        hint: 'A távolság két darab szabályos háromszög-magasság összege: 2 · ((a√3)/2) = a√3.',
        explanation: 'A szabályos hatszög középpontjából húzott sugár 6 szabályos háromszögre osztja a hatszöget. Két szemközti oldal távolsága a magasság duplája: d = 2 · m = 2 · ((6√3)/2) = 6√3 cm.'
      },
      {
        id: 'sq3-2',
        questionTypeBadge: 'Kocka Testátlója',
        question: 'Egy kocka éle a = 4 cm. Milyen hosszú a testátlója (D)?',
        options: ['4√3 cm (kb. 6,93 cm)', '4√2 cm', '8 cm', '12 cm'],
        correctAnswer: 0,
        hint: 'A lapátló d = 4√2 cm. A testátló a lapátlóval és az éllel alkot derékszögű háromszöget: D = √((4√2)² + 4²).',
        explanation: 'D² = (a√2)² + a² = 2a² + a² = 3a² => D = a√3 = 4√3 cm.'
      },
      {
        id: 'sq3-3',
        questionTypeBadge: 'Derékszögű Trapéz Szögekkel',
        question: 'Egy derékszögű trapéz hosszabbik alapja 14 cm, ferde szára 10 cm, és a ferde szár a hosszabbik alappal 60°-os szöget zár be. Milyen hosszú a trapéz magassága (m)?',
        options: ['5√3 cm (kb. 8,66 cm)', '5 cm', '10 cm', '5√2 cm'],
        correctAnswer: 0,
        hint: 'A ferde szár és a magasság egy 30°-60°-90°-os háromszöget zár be, ahol a ferde szár az átfogó (10 cm).',
        explanation: 'A csúcsból lehúzott magasság egy 30°-60°-90°-os derékszögű háromszöget vág le. Az átfogó 10 cm, az alapon lévő levágott szakasz 10 / 2 = 5 cm (a 30°-kal szemközti oldal), a magasság pedig m = 5√3 cm (a 60°-kal szemközti oldal).'
      },
      {
        id: 'sq3-4',
        questionTypeBadge: 'Derékszögű Trapéz Rövíd Alapja',
        question: 'Az előző feladatban (hosszabb alap = 14 cm, levágott alaprész = 5 cm) milyen hosszú a trapéz rövidebbik alapja (c)?',
        options: ['9 cm', '10 cm', '8 cm', '7 cm'],
        correctAnswer: 0,
        hint: 'c = 14 - 5 cm.',
        explanation: 'A hosszabb alapból kivonva a derékszögű háromszög alapi befogóját (5 cm): c = 14 - 5 = 9 cm.'
      },
      {
        id: 'sq3-5',
        questionTypeBadge: 'Két Háromszög Kombinációja',
        question: 'Egy négyszög átlója két derékszögű háromszögre osztja a síkidomot: az egyik egy 30°-60°-90°-os háromszög (átfogója az átló), a másik egy 45°-45°-90°-os háromszög (átfogója szintén az átló). Ha a 30°-os szöggel szemközti oldal 4 cm, mekkorák a 45°-os háromszög befogói?',
        options: ['4√2 cm', '8 cm', '4√3 cm', '2√2 cm'],
        correctAnswer: 0,
        hint: 'A 30°-os oldal 4 cm, így a közös átló c = 2 · 4 = 8 cm. A 45°-os háromszög befogói: 8 / √2.',
        explanation: 'A közös átfogó hossza c = 2 · 4 = 8 cm. A 45°-45°-90°-os háromszögben a befogók: a = c / √2 = 8 / √2 = 4√2 cm.'
      },
      {
        id: 'sq3-6',
        questionTypeBadge: 'Szabályos Hatszög Területe',
        question: 'Mekkora a 4 cm oldalú szabályos hatszög területe?',
        options: ['24√3 cm² (kb. 41,57 cm²)', '12√3 cm²', '48 cm²', '16√3 cm²'],
        correctAnswer: 0,
        hint: 'A hatszög 6 egybevágó szabályos háromszögből áll: T = 6 · ((a²√3) / 4).',
        explanation: 'Egy szabályos háromszög területe: T₁ = (4² · √3) / 4 = 4√3 cm². A hatszög 6 ilyen részből áll: T = 6 · 4√3 = 24√3 cm².'
      },
      {
        id: 'sq3-7',
        questionTypeBadge: 'Árnyék és Napállás',
        question: 'Egy 18 méter magas fa árnyéka a vízszintes talajon pontosan 6√3 méter hosszú. Mekkora szögben süt a Nap a vízszinteshez képest?',
        options: ['60°', '30°', '45°', '75°'],
        correctAnswer: 0,
        hint: 'A függőleges magasság és az árnyék aránya: 18 / (6√3) = 3 / √3 = √3.',
        explanation: 'A fa magassága 18 = 6√3 · √3 méter. Tehát a fa magassága a vízszintes árnyék √3-szorosa! Ez azt jelenti, hogy a fával szemben 60°-os szög van, vagyis a Nap 60°-os szögben áll a horizonthoz képest.'
      },
      {
        id: 'sq3-8',
        questionTypeBadge: 'Négyzetbe Írt Egyenlő Oldalú Háromszög',
        question: 'Egy a oldalú négyzetbe egyenlő szárú derékszögű háromszöget rajzolunk úgy, hogy a derékszög a négyzet egyik csúcsa, a befogók pedig a négyzet oldalain fekszenek (hosszuk a/2). Mekkora a levágott kis háromszög átfogója?',
        options: ['(a√2) / 2', 'a / 2', 'a√2', 'a / √3'],
        correctAnswer: 0,
        hint: 'Befogók a/2, átfogó c = (a/2) · √2.',
        explanation: 'c = (a / 2) · √2 = (a√2) / 2.'
      },
      {
        id: 'sq3-9',
        questionTypeBadge: 'Szabályos Tetraéder Lapmagassága',
        question: 'Egy szabályos tetraéder minden éle a = 12 cm. Milyen hosszú bármelyik oldallapjának a magassága?',
        options: ['6√3 cm', '6 cm', '6√2 cm', '12√3 cm'],
        correctAnswer: 0,
        hint: 'A tetraéder lapjai szabályos háromszögek: m = (a√3) / 2.',
        explanation: 'Mivel a tetraéder lapjai 12 cm-es szabályos háromszögek, a lapmagasság a félszabályos háromszögből m = (12 · √3) / 2 = 6√3 cm.'
      },
      {
        id: 'sq3-10',
        questionTypeBadge: 'Különleges Szögek Kiegészítése',
        question: 'Egy derékszögű háromszög átfogója c = 20 cm, egyik szöge 15°. Ha a derékszögű csúcsból behúzzuk az átfogó felezőmerőlegesét és magasságát, milyen különleges háromszögek segítik a magasság meghatározását?',
        options: [
          'A körülírt kör sugara r = 10 cm egyenlő szárú háromszöget ad, melynek külső szöge 30°, így a magasság m = 5 cm',
          'Közvetlenül egy 45°-45°-90°-os háromszöget kapunk',
          'Csak szögfüggvényekkel lehet kiszámítani',
          'A magasság 10 cm lesz'
        ],
        correctAnswer: 0,
        hint: 'A Thalész-tétel miatt a kör középpontja az átfogó felezőpontja (R = 10 cm). A középpontból a csúcshoz húzott sugár 30°-os középponti szöget zár be a magassággal!',
        explanation: 'A körülírt kör sugara R = c / 2 = 10 cm. Az átfogó felezőpontját (O) a derékszögű csúccsal összekötve egyenlő szárú háromszöget kapunk, melynek szárszöge 30°. A derékszögű csúcsból induló magasság az O-ból induló 10 cm-es átfogójú kis 30°-60°-90°-os háromszög rövid befogója lesz: m = 10 / 2 = 5 cm!'
      }
    ]
  }
};

export const SpecialTrianglesQuiz: React.FC<SpecialTrianglesQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Különleges derékszögű háromszögek"
      subtitle="30 feladat 3 szinten, párosító és csoportosító módokkal a 30°-60°-90° és 45°-45°-90° háromszögek oldalarányairól"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-kulonleges-derekszogu"
      topicBadge="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • KVÍZ"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      levels={quizLevels}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító játék',
          subtitle: 'Keresd meg az összetartozó geometriai párokat!',
          icon: <ArrowRightLeft className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <SpecialTrianglesMatcher
              key={`special-triangles-matcher-${level}`}
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
          subtitle: 'Csoportosítsd a különleges háromszögeket és képleteiket!',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <SpecialTrianglesSorter
              key={`special-triangles-sorter-${level}`}
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
            title="30° - 60° - 90° (Félszabályos) Képletek"
            icon={<Triangle className="w-5 h-5 text-amber-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Oldalarány:</strong> 1 : √3 : 2 (a : a√3 : 2a)</li>
              <li><strong>30°-kal szemben:</strong> a (az átfogó fele: a = c / 2)</li>
              <li><strong>60°-kal szemben:</strong> b = a · √3 (szabályos háromszög magassága)</li>
              <li><strong>Átfogó:</strong> c = 2a</li>
              <li><strong>Terület:</strong> T = (a² · √3) / 2</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="45° - 45° - 90° (Egyenlő szárú derékszögű)"
            icon={<Square className="w-5 h-5 text-indigo-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Oldalarány:</strong> 1 : 1 : √2 (a : a : a√2)</li>
              <li><strong>Két befogó:</strong> a = b (egyenlők)</li>
              <li><strong>Átfogó (négyzet átlója):</strong> c = a · √2</li>
              <li><strong>Befogó visszaszámolása:</strong> a = c / √2 = (c · √2) / 2</li>
              <li><strong>Terület:</strong> T = a² / 2</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Alkalmazások és Térbeli Testek"
            icon={<Layers className="w-5 h-5 text-emerald-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Szabályos háromszög magassága:</strong> m = (a · √3) / 2</li>
              <li><strong>Szabályos háromszög területe:</strong> T = (a² · √3) / 4</li>
              <li><strong>Kocka lapátlója:</strong> d = a · √2</li>
              <li><strong>Kocka testátlója:</strong> D = a · √3</li>
              <li><strong>Szabályos hatszög szemközti oldaltávolság:</strong> a · √3</li>
            </ul>
          </CheatSheetCard>
        </div>
      }
    />
  );
};

