import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { CircleCircumferenceAreaMatcher } from './CircleCircumferenceAreaMatcher';
import { CircleCircumferenceAreaSorter } from './CircleCircumferenceAreaSorter';
import {
  CircleCircumferenceDissectionSvg,
  CircularRingAreaSvg,
  ArchimedesPiApproximationSvg,
  CircleRadiusMiniSvg,
  CircleDiameterMiniSvg,
  CircularRingMiniSvg,
  SemicircleMiniSvg,
  SquareInscribedCircleMiniSvg
} from './CircleCircumferenceAreaFigures';

interface CircleCircumferenceAreaQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Körképletek',
    description: 'K = 2rπ = dπ (kerület). T = r²π = (d²π)/4 (terület). Körgyűrű: T = π(R² - r²).',
    note: 'Sugár r = d/2. Ha az átmérő van megadva, ne felejtsd el felezni a területhez!',
    color: 'from-cyan-500 to-blue-600',
    figure: <CircleCircumferenceDissectionSvg size={220} />
  },
  {
    title: 'A körgyűrű területe',
    description: 'T = π(R² - r²). A külső nagy kör területéből kivonjuk a belső fehér kör területét.',
    note: 'CSAPDA: T ≠ π(R - r)², a sugarakat külön-külön kell négyzetre emelni!',
    color: 'from-blue-500 to-indigo-600',
    figure: <CircularRingAreaSvg size={200} />
  },
  {
    title: 'A π értéke és tulajdonságai',
    description: 'π = K / d ≈ 3,14159... Irracionális szám, nem periodikus végtelen tizedestört.',
    note: 'Számoláskor ha a feladat nem kéri a pontos π-s alakot, 3,14-gyel számolunk.',
    color: 'from-emerald-500 to-teal-600',
    figure: <ArchimedesPiApproximationSvg size={200} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapképletek és közvetlen számítások',
    subtitle: 'Kerület és terület kiszámítása adott sugárból vagy átmérőből.',
    range: '1–10. feladat',
    focus: 'K = 2rπ, T = r²π, d = 2r',
    questions: [
      {
        id: 'cca1-1',
        question: 'Mekkora az 5 cm sugarú kör kerülete (π ≈ 3,14)?',
        figure: <CircleRadiusMiniSvg size={140} />,
        options: ['31,4 cm', '15,7 cm', '78,5 cm', '10 cm'],
        correctAnswer: 0,
        explanation: 'K = 2 · r · π = 2 · 5 · 3,14 = 10 · 3,14 = 31,4 cm.'
      },
      {
        id: 'cca1-2',
        question: 'Mekkora az 5 cm sugarú kör területe (π ≈ 3,14)?',
        options: ['78,5 cm²', '31,4 cm²', '25 cm²', '15,7 cm²'],
        correctAnswer: 0,
        explanation: 'T = r² · π = 5² · 3,14 = 25 · 3,14 = 78,5 cm².'
      },
      {
        id: 'cca1-3',
        question: 'Egy kör átmérője d = 12 cm. Mekkora a kör területe pontos π-s alakban?',
        figure: <CircleDiameterMiniSvg size={140} />,
        options: ['36π cm²', '144π cm²', '72π cm²', '12π cm²'],
        correctAnswer: 0,
        explanation: 'A sugár az átmérő fele: r = d / 2 = 12 / 2 = 6 cm. A terület: T = r² · π = 6² · π = 36π cm².'
      },
      {
        id: 'cca1-4',
        question: 'Egy kör kerülete 62,8 cm. Mekkora a sugara (π ≈ 3,14)?',
        options: ['10 cm', '20 cm', '5 cm', '31,4 cm'],
        correctAnswer: 0,
        explanation: 'K = 2rπ ⟹ 62,8 = 2 · r · 3,14 = 6,28 · r ⟹ r = 62,8 / 6,28 = 10 cm.'
      },
      {
        id: 'cca1-5',
        question: 'Hogyan változik a kör kerülete, ha a sugarát a háromszorosára növeljük?',
        options: [
          'A kerülete is 3-szorosára nő',
          'A kerülete 9-szeresére nő',
          'A kerülete 6-szorosára nő',
          'Nem változik'
        ],
        correctAnswer: 0,
        explanation: 'K = 2rπ. A kerület egyenesen arányos a sugárral (első hatvány), így 3-szoros sugár esetén a kerület is pontosan 3-szorosára nő.'
      },
      {
        id: 'cca1-6',
        question: 'Hogyan változik a kör területe, ha a sugarát a duplájára (2-szeresére) növeljük?',
        options: [
          'A területe 4-szeresére nő (2² = 4)',
          'A területe 2-szeresére nő',
          'A területe 8-szorosára nő',
          'A területe 6-szorosára nő'
        ],
        correctAnswer: 0,
        explanation: 'T = r² · π. A terület a sugár négyzetével arányos. Ha r -> 2r, akkor T_új = (2r)² · π = 4r²π = 4 · T, tehát 4-szeresére nő!'
      },
      {
        id: 'cca1-7',
        question: 'Milyen szám a π a matematika halmazai szerint?',
        options: [
          'Irracionális szám (végtelen, nem szakaszos tizedestört)',
          'Racionális szám, pontosan egyenlő 22/7-tel',
          'Természetes szám',
          'Egész szám'
        ],
        correctAnswer: 0,
        explanation: 'A π irracionális szám: nem írható fel két egész szám hányadosaként (p/q alakban), tizedesjegyei a végtelenségig folytatódnak mindenféle szabályos ismétlődés nélkül.'
      },
      {
        id: 'cca1-8',
        question: 'Mekkora a 4 cm belső és 6 cm külső sugarú körgyűrű területe pontos alakban?',
        figure: <CircularRingAreaSvg size={160} />,
        options: ['20π cm²', '52π cm²', '4π cm²', '10π cm²'],
        correctAnswer: 0,
        explanation: 'T_gyűrű = π · (R² - r²) = π · (6² - 4²) = π · (36 - 16) = 20π cm².'
      },
      {
        id: 'cca1-9',
        question: 'Egy kör területe 49π cm². Mekkora a kör kerülete?',
        options: ['14π cm', '7π cm', '28π cm', '49π cm'],
        correctAnswer: 0,
        explanation: 'T = r²π = 49π ⟹ r² = 49 ⟹ r = 7 cm. A kerület: K = 2rπ = 2 · 7 · π = 14π cm.'
      },
      {
        id: 'cca1-10',
        question: 'Egy 10 cm átmérőjű félkör kerülete miből áll össze?',
        figure: <SemicircleMiniSvg size={140} />,
        options: [
          'A félkörívből és az átmérőből (K = rπ + 2r)',
          'Csak a félkörívből (K = rπ)',
          'A teljes kör kerületének feléből (K = rπ)',
          'K = 2rπ + d'
        ],
        correctAnswer: 0,
        explanation: 'A félkör síkidomként zárt alakzat, határoló vonala a félkörív (rπ = 5π) és a lezáró egyenes átmérő (2r = 10 cm), így K = rπ + 2r.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Körgyűrűk és fordított számítások',
    subtitle: 'Összetett területszámítások, sugarak visszaszámolása kerületből/területből.',
    range: '11–20. feladat',
    focus: 'Körgyűrű vastagsága, körbe/köré írt négyzet, forgások',
    questions: [
      {
        id: 'cca2-1',
        question: 'Egy bicikli kerekének átmérője 70 cm. Hány métert halad előre a kerékpár 100 teljes fordulat alatt (π ≈ 3,14)?',
        options: ['219,8 métert', '439,6 métert', '153,8 métert', '100 métert'],
        correctAnswer: 0,
        explanation: 'Egy fordulat = kerület: K = d · π = 70 · 3,14 = 219,8 cm = 2,198 m. 100 fordulat: 100 · 2,198 m = 219,8 m.'
      },
      {
        id: 'cca2-2',
        question: 'Egy 10 cm oldalhosszúságú négyzetbe beírható maximális kör területe mekkora?',
        figure: <SquareInscribedCircleMiniSvg size={140} />,
        options: ['25π cm² (kb. 78,5 cm²)', '100π cm²', '50π cm²', '20π cm²'],
        correctAnswer: 0,
        explanation: 'A négyzetbe írt kör átmérője egyenlő a négyzet oldalával: d = 10 cm ⟹ r = 5 cm. A terület: T = r²π = 5²π = 25π cm².'
      },
      {
        id: 'cca2-3',
        question: 'A fenti 10 cm-es négyzet köré írt kör területe mekkora?',
        options: ['50π cm² (kb. 157 cm²)', '100π cm²', '25π cm²', '75π cm²'],
        correctAnswer: 0,
        explanation: 'A négyzet köré írt kör átmérője a négyzet átlója: d = a√2 = 10√2 cm ⟹ R = 5√2 cm. T = R²π = (5√2)² · π = (25 · 2) · π = 50π cm².'
      },
      {
        id: 'cca2-4',
        question: 'Mekkora a hulladék (kieső rész) területe, ha egy 10 cm oldalhosszúságú négyzetlapból kivágjuk a legnagyobb beírható kört?',
        options: ['100 - 25π cm² (kb. 21,5 cm²)', '25 cm²', '15 cm²', '50 - 25π cm²'],
        correctAnswer: 0,
        explanation: 'Négyzet területe: T_négyzet = 10² = 100 cm². Beírt kör területe: T_kör = 25π ≈ 78,5 cm². A hulladék: 100 - 78,5 = 21,5 cm² (100 - 25π).'
      },
      {
        id: 'cca2-5',
        question: 'Egy kör alakú futópálya belső sugara 40 m, szélessége 5 m. Mekkora a futópálya területe?',
        figure: <CircularRingMiniSvg size={140} />,
        options: ['425π m² (kb. 1335 m²)', '25π m²', '200π m²', '800π m²'],
        correctAnswer: 0,
        explanation: 'Belső sugár r = 40 m, külső sugár R = 40 + 5 = 45 m. T = π(R² - r²) = π(45² - 40²) = π(2025 - 1600) = 425π m².'
      },
      {
        id: 'cca2-6',
        question: 'Egy kör területe 100 cm². Mekkora egy olyan kör területe, amelynek a sugara fele akkora?',
        options: ['25 cm²', '50 cm²', '10 cm²', '12,5 cm²'],
        correctAnswer: 0,
        explanation: 'A terület a sugár négyzetével arányos: ha a sugár a felére csökken (1/2), a terület az (1/2)² = 1/4-ére csökken: 100 / 4 = 25 cm².'
      },
      {
        id: 'cca2-7',
        question: 'Egy kör kerülete 10%-kal nő. Hány százalékkal nő meg a területe?',
        options: ['21%-kal', '10%-kal', '20%-kal', '100%-kal'],
        correctAnswer: 0,
        explanation: 'A kerület 10%-os növekedése a sugár 1,1-szeresére növekedését jelenti. A terület az arány négyzetével nő: 1,1² = 1,21, vagyis a terület 21%-kal lesz nagyobb!'
      },
      {
        id: 'cca2-8',
        question: 'Egy 20 cm sugarú kerek pizza területe hányszorosa egy 10 cm sugarú kis pizzáénak?',
        options: ['4-szerese', '2-szerese', '3-szorosa', '8-szorosa'],
        correctAnswer: 0,
        explanation: 'Sugárarány: 20/10 = 2. Területarány: 2² = 4. A 40 cm átmérőjű nagy pizza pontosan négyszer akkora, mint a 20 cm átmérőjű kis pizza!'
      },
      {
        id: 'cca2-9',
        question: 'Egy autó kereke percenként 600-at fordul. A kerék sugara 30 cm. Mekkora az autó sebessége km/h-ban (π ≈ 3,14)?',
        options: ['kb. 67,8 km/h', 'kb. 45 km/h', 'kb. 90 km/h', 'kb. 120 km/h'],
        correctAnswer: 0,
        explanation: 'K = 2 · 0,3 m · 3,14 = 1,884 m fordulatonként. 1 perc alatt: 600 · 1,884 m = 1130,4 m/perc. 1 óra alatt: 1130,4 · 60 = 67 824 m/h = 67,8 km/h.'
      },
      {
        id: 'cca2-10',
        question: 'Egy körgyűrű területe 45π cm², külső sugara R = 9 cm. Mekkora a belső sugara (r)?',
        options: ['6 cm', '4 cm', '5 cm', '7 cm'],
        correctAnswer: 0,
        explanation: 'T = π(R² - r²) ⟹ 45π = π(9² - r²) ⟹ 45 = 81 - r² ⟹ r² = 81 - 45 = 36 ⟹ r = 6 cm.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett és érettségi szintű feladatok',
    subtitle: 'Stadion alakú pályák, n-szögek határértéke, valós alkalmazások.',
    range: '21–30. feladat',
    focus: 'Kombinált síkidomok, ívhosszak átváltása, optimalizálás',
    questions: [
      {
        id: 'cca3-1',
        question: 'Egy futópálya két 100 m-es egyenes szakaszból és két félkör alakú kanyarból áll (összesen 400 m a belső pálya kerülete). Mekkora a félkörök sugara (π ≈ 3,14)?',
        options: ['kb. 31,85 méter', 'kb. 50 méter', 'kb. 63,7 méter', 'kb. 25 méter'],
        correctAnswer: 0,
        explanation: 'A két egyenes szakasz együtt 2 · 100 = 200 m. A két félkör együtt egy teljes kört ad: K_kör = 400 - 200 = 200 m. 2rπ = 200 ⟹ r = 200 / (2 · 3,14) = 100 / 3,14 ≈ 31,85 méter.'
      },
      {
        id: 'cca3-2',
        question: 'Mekkora az előző feladatbeli 400 méteres stadionpálya által bezárt teljes terület?',
        options: ['kb. 9557 m²', 'kb. 6370 m²', 'kb. 12000 m²', 'kb. 8000 m²'],
        correctAnswer: 0,
        explanation: 'A terület a téglalapból és a két félkörből (egy teljes körből) áll. Téglalap: 100 m · 2r = 100 · 63,7 = 6370 m². Kör területe: r²π = (31,85)² · 3,14 = 1014,4 · 3,14 ≈ 3187 m². Teljes terület: 6370 + 3187 = 9557 m².'
      },
      {
        id: 'cca3-3',
        question: 'Egy kör sugara r = 10 cm. Mekkora a körbe írt szabályos 12-szög területe?',
        options: ['300 cm²', '314 cm²', '250 cm²', '280 cm²'],
        correctAnswer: 0,
        explanation: 'A szabályos 12-szög 12 darab egyenlő szárú háromszögből áll, melyek szárai r = 10 cm, szárszögük 360°/12 = 30°. Egy háromszög területe: (1/2) · r · r · sin 30° = (1/2) · 100 · 0,5 = 25 cm². A 12-szög területe: 12 · 25 = 300 cm² (nagyon közel a kör 100π ≈ 314 cm² területéhez!).'
      },
      {
        id: 'cca3-4',
        question: 'Egy fa törzsének kerülete 188,4 cm. Becsüld meg a fa törzsének átmérőjét (π ≈ 3,14)!',
        options: ['60 cm', '30 cm', '90 cm', '45 cm'],
        correctAnswer: 0,
        explanation: 'K = d · π ⟹ d = K / π = 188,4 / 3,14 = 60 cm.'
      },
      {
        id: 'cca3-5',
        question: 'Két koncentrikus kör sugara 10 cm és 8 cm. A nagyobbik kör egy húrja érinti a kisebbik kört. Mekkora ennek az érintő húrnak a hossza?',
        figure: <CircularRingAreaSvg size={160} />,
        options: ['12 cm', '6 cm', '16 cm', '10 cm'],
        correctAnswer: 0,
        explanation: 'A belső kör érintési pontja az érintési sugárral derékszöget zár be, és felezi a külső kör húrját. Derékszögű háromszög: átfogó R = 10 cm, befogó r = 8 cm. A félhúr hossza: √(10² - 8²) = √(100 - 64) = √36 = 6 cm. A teljes húr: 2 · 6 = 12 cm.'
      },
      {
        id: 'cca3-6',
        question: 'Mi a fenti feladatban az érintő húr hossza (h = 12 cm) és a körgyűrű területe közötti meglepő kapcsolat (Mamikon-tétel)?',
        options: [
          'T_gyűrű = π · (h / 2)² = π · 6² = 36π cm²',
          'T_gyűrű = h · π = 12π cm²',
          'T_gyűrű = h² · π = 144π cm²',
          'Nincs összefüggés a húr és a terület között'
        ],
        correctAnswer: 0,
        explanation: 'A Pitagorasz-tétel szerint R² - r² = (h/2)². Mivel a körgyűrű területe T = π(R² - r²), ezért T = π · (h/2)² = 36π cm². A körgyűrű területe kizárólag a belső kört érintő húr hosszától függ!'
      },
      {
        id: 'cca3-7',
        question: 'Egy egyenlő oldalú háromszög magassága 9 cm. Mekkora a beírt körének területe?',
        options: ['9π cm²', '27π cm²', '3π cm²', '18π cm²'],
        correctAnswer: 0,
        explanation: 'Szabályos háromszögben a súlypont egyben a beírt kör középpontja, amely a magasságot 2:1 arányban osztja. A beírt kör sugara az alsó egyharmad: r = m / 3 = 9 / 3 = 3 cm. Területe: T = r²π = 3²π = 9π cm².'
      },
      {
        id: 'cca3-8',
        question: 'Ugyanezen 9 cm magasságú szabályos háromszög köré írt körének területe mekkora?',
        options: ['36π cm²', '18π cm²', '27π cm²', '81π cm²'],
        correctAnswer: 0,
        explanation: 'A körülírt kör sugara a magasság kétharmada: R = (2/3) · 9 = 6 cm. Területe: T = R²π = 6²π = 36π cm² (pontosan négyszerese a beírt kör területének!).'
      },
      {
        id: 'cca3-9',
        question: 'Egy kör kerülete K = 20π cm. Ha a területét 44%-kal növelni szeretnénk, hány cm-rel kell megnövelni a sugarát?',
        options: ['2 cm-rel (r_új = 12 cm)', '4,4 cm-rel', '1 cm-rel', '3 cm-rel'],
        correctAnswer: 0,
        explanation: 'K = 20π ⟹ r = 10 cm. T = 100π. 44%-os növekedéssel: T_új = 144π cm². r_új² = 144 ⟹ r_új = 12 cm. A sugár növekedése: 12 - 10 = 2 cm.'
      },
      {
        id: 'cca3-10',
        question: 'Miért nem lehet körzővel és vonalzóval kört négyszögesíteni (Lindemann-tétel, 1882)?',
        options: [
          'Mert a π transzcendens szám, így √π nem szerkeszthető meg euklideszi lépésekkel',
          'Mert a kör területe mindig páratlan szám',
          'Mert a körző szára elhajlik',
          'Mert a négyzetnek 4 csúcsa van, a körnek pedig 0'
        ],
        correctAnswer: 0,
        explanation: 'A kör négyszögesítése azt jelentené, hogy megszerkesztünk egy olyan négyzetet, amelynek területe megegyezik az adott kör területével (a² = r²π ⟹ a = r√π). Ferdinand von Lindemann 1882-ben bebizonyította, hogy a π transzcendens szám, ezért algebrai egyenletek gyökeként (így körzővel és vonalzóval) nem állítható elő.'
      }
    ]
  }
};

export const CircleCircumferenceAreaQuiz: React.FC<CircleCircumferenceAreaQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      title="A kör kerülete és területe Kvíz"
      subtitle="Számold ki a kerületet, területet, körgyűrűt és oldj meg összetett gyakorlati feladványokat!"
      badge="10. OSZTÁLY • VI. EGYBEVÁGÓSÁG ÉS KÖR • GYAKORLÓ KVÍZ"
      color="cyan"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <CircleCircumferenceAreaMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <CircleCircumferenceAreaSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};
