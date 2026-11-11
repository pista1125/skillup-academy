import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { EverydayArcsSectorsMatcher } from './EverydayArcsSectorsMatcher';
import { EverydayArcsSectorsSorter } from './EverydayArcsSectorsSorter';
import {
  ClockHandsAngleSvg,
  WindshieldWiperCoverageSvg,
  ClockMiniSvg,
  WiperMiniSvg,
  GearMiniSvg,
  PizzaSliceMiniSvg
} from './EverydayArcsSectorsFigures';

interface EverydayArcsSectorsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Óramutatók szöge',
    description: 'Nagymutató: 6°/perc. Kismutató: 0,5°/perc (30°/óra). Két óraszám között 30° van.',
    note: '3:15-kor a szög 7,5°, 6:00-kor 180°, 12:00-kor 0°.',
    color: 'from-purple-500 to-indigo-600',
    figure: <ClockHandsAngleSvg size={200} />
  },
  {
    title: 'Ablaktörlő területe',
    description: 'T = (π · (R² - r²) · α) / 360°. Körgyűrű-cikk területének felel meg.',
    note: 'R a lapát külső végének, r a belső végének távolsága a forgástengelytől.',
    color: 'from-blue-500 to-cyan-600',
    figure: <WindshieldWiperCoverageSvg size={220} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Óramutatók és egyszerű modellek',
    subtitle: 'Egész órák szögei, egyszerű körcikk-számítások a mindennapi életben.',
    range: '1–10. feladat',
    focus: 'Óramutató egész órakor, tortaszelet, forgó öntöző',
    questions: [
      {
        id: 'eas1-1',
        question: 'Hány fokos szöget zár be a kismutató és a nagymutató pontosan 3:00 órakor?',
        figure: <ClockMiniSvg size={130} />,
        options: ['90°', '60°', '45°', '120°'],
        correctAnswer: 0,
        explanation: '3 órakor a kismutató a 3-ason (90°), a nagymutató a 12-esen (0°) áll, a bezárt szög pontosan 3 · 30° = 90°.'
      },
      {
        id: 'eas1-2',
        question: 'Hány fokos szöget zár be a két mutató 6:00 órakor?',
        options: ['180°', '90°', '120°', '360°'],
        correctAnswer: 0,
        explanation: 'A mutatók egy egyenesbe esnek, ellentétes irányba mutatnak: 6 · 30° = 180°.'
      },
      {
        id: 'eas1-3',
        question: 'Hány fokos szöget fordul el az óra nagymutatója 20 perc alatt?',
        options: ['120°', '60°', '100°', '90°'],
        correctAnswer: 0,
        explanation: 'A nagymutató 1 perc alatt 6°-ot fordul: 20 · 6° = 120°.'
      },
      {
        id: 'eas1-4',
        question: 'Hány fokos szöget fordul el a kismutató 1 óra (60 perc) alatt?',
        options: ['30°', '60°', '12°', '0,5°'],
        correctAnswer: 0,
        explanation: '1 óra alatt a kismutató egyik óráról a következőre vándorol: 360° / 12 = 30°.'
      },
      {
        id: 'eas1-5',
        question: 'Egy kerti körlocsoló 10 méteres sugárban locsol, és 90°-os szektorban mozog. Mekkora területet öntöz (π ≈ 3,14)?',
        options: ['78,5 m²', '314 m²', '157 m²', '25 m²'],
        correctAnswer: 0,
        explanation: 'T = (10² · 3,14 · 90) / 360 = 314 / 4 = 78,5 m².'
      },
      {
        id: 'eas1-6',
        question: 'Hány fokos szöget zár be a két óramutató 1:00 órakor?',
        options: ['30°', '15°', '60°', '45°'],
        correctAnswer: 0,
        explanation: '1 óraegységnyi távolság: 1 · 30° = 30°.'
      },
      {
        id: 'eas1-7',
        question: 'Egy pizzát 6 egyenlő szeletre vágtak. Mekkora egy szelet középponti szöge?',
        figure: <PizzaSliceMiniSvg size={130} />,
        options: ['60°', '45°', '90°', '72°'],
        correctAnswer: 0,
        explanation: '360° / 6 = 60°.'
      },
      {
        id: 'eas1-8',
        question: 'Hány fokos szöget fordul el a kismutató 10 perc alatt?',
        options: ['5°', '10°', '60°', '1°'],
        correctAnswer: 0,
        explanation: 'A kismutató sebessége 0,5° percenként: 10 · 0,5° = 5°.'
      },
      {
        id: 'eas1-9',
        question: 'Hány fokos szöget zár be a két mutató 4:00 órakor?',
        options: ['120°', '90°', '150°', '100°'],
        correctAnswer: 0,
        explanation: '4 · 30° = 120°.'
      },
      {
        id: 'eas1-10',
        question: 'Egy autó sebességmérő mutatója 0 km/h-tól 240 km/h-ig 240°-os szöget jár be. Hány fokos elfordulás felel meg 1 km/h sebességváltozásnak?',
        options: ['1°', '0,5°', '2°', '10°'],
        correctAnswer: 0,
        explanation: '240° / 240 km/h = 1° elmozdulás km/h-nként.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Törtidők szögei és ablaktörlők',
    subtitle: 'Óramutatók szögei nem egész órákban, ablaktörlő lapátok felülete.',
    range: '11–20. feladat',
    focus: 'Óramutatók 3:15, 8:20, 2:30 esetén, ablaktörlő sávja',
    questions: [
      {
        id: 'eas2-1',
        question: 'Hány fokos szöget zár be az óra két mutatója pontosan 3:15-kor?',
        figure: <ClockHandsAngleSvg size={160} />,
        options: ['7,5°', '0°', '15°', '5°'],
        correctAnswer: 0,
        explanation: 'A nagymutató a 15 percnél 90°-on áll. A kismutató 3 óra 15 perckor: 3 · 30° + 15 · 0,5° = 90° + 7,5° = 97,5°. A kettőjük különbsége: 97,5° - 90° = 7,5°.'
      },
      {
        id: 'eas2-2',
        question: 'Hány fokos szöget zár be a két óramutató 8:20-kor?',
        options: ['130°', '120°', '140°', '110°'],
        correctAnswer: 0,
        explanation: 'Kismutató: 8 · 30° + 20 · 0,5° = 240° + 10° = 250°. Nagymutató: 20 · 6° = 120°. Különbség: 250° - 120° = 130°.'
      },
      {
        id: 'eas2-3',
        question: 'Hány fokos szöget zár be a két óramutató 2:30-kor?',
        options: ['105°', '90°', '120°', '115°'],
        correctAnswer: 0,
        explanation: 'Kismutató: 2 · 30° + 30 · 0,5° = 60° + 15° = 75°. Nagymutató: 30 · 6° = 180°. Különbség: 180° - 75° = 105°.'
      },
      {
        id: 'eas2-4',
        question: 'Egy ablaktörlő lapát 40 cm hosszú, a belső vége 10 cm-re van a forgásponttól (így a külső vége 50 cm-re). A törlési szög 120°. Mekkora a megtisztított felület (π ≈ 3,14)?',
        figure: <WindshieldWiperCoverageSvg size={170} />,
        options: ['kb. 2512 cm²', 'kb. 3140 cm²', 'kb. 1256 cm²', 'kb. 5000 cm²'],
        correctAnswer: 0,
        explanation: 'R = 50 cm, r = 10 cm. T = (π · (50² - 10²) · 120) / 360 = (3,14 · (2500 - 100)) / 3 = (3,14 · 2400) / 3 = 3,14 · 800 = 2512 cm².'
      },
      {
        id: 'eas2-5',
        question: 'Egy legyezőt 150°-os szögben nyitnak ki. A bordák hossza 24 cm, a papírborítás a felső 16 cm-es sávban van (belső sugár 8 cm). Mekkora a papír felülete (π ≈ 3,14)?',
        options: ['kb. 670 cm²', 'kb. 500 cm²', 'kb. 800 cm²', 'kb. 450 cm²'],
        correctAnswer: 0,
        explanation: 'R = 24 cm, r = 8 cm. T = (3,14 · (24² - 8²) · 150) / 360 = (3,14 · (576 - 64) · 5) / 12 = (3,14 · 512 · 5) / 12 = 8038,4 / 12 ≈ 669,9 cm² ≈ 670 cm².'
      },
      {
        id: 'eas2-6',
        question: 'Hány fokos szöget zár be a két óramutató 9:30-kor?',
        options: ['105°', '90°', '115°', '120°'],
        correctAnswer: 0,
        explanation: 'Kismutató: 9 · 30° + 30 · 0,5° = 270° + 15° = 285°. Nagymutató: 30 · 6° = 180°. Különbség: 285° - 180° = 105°.'
      },
      {
        id: 'eas2-7',
        question: 'Egy körforgalom külső sugara 25 m, belső sugara 15 m. Mekkora az aszfaltozott úttest területe (π ≈ 3,14)?',
        options: ['1256 m²', '1570 m²', '942 m²', '628 m²'],
        correctAnswer: 0,
        explanation: 'T = π · (25² - 15²) = 3,14 · (625 - 225) = 3,14 · 400 = 1256 m².'
      },
      {
        id: 'eas2-8',
        question: 'Egy kör alakú asztallap átmérője 140 cm. Középre egy 40 cm átmérőjű forgótálcát tesznek. Mekkora az asztal szabadon maradt területe (π ≈ 3,14)?',
        options: ['kb. 14 130 cm²', 'kb. 15 386 cm²', 'kb. 12 000 cm²', 'kb. 9420 cm²'],
        correctAnswer: 0,
        explanation: 'R = 70 cm, r = 20 cm. T = 3,14 · (70² - 20²) = 3,14 · (4900 - 400) = 3,14 · 4500 = 14 130 cm².'
      },
      {
        id: 'eas2-9',
        question: 'Hány fokos szöget zár be a két óramutató 12:20-kor?',
        options: ['110°', '120°', '100°', '115°'],
        correctAnswer: 0,
        explanation: 'Nagymutató: 20 · 6° = 120°. Kismutató: 20 · 0,5° = 10°. Különbség: 120° - 10° = 110°.'
      },
      {
        id: 'eas2-10',
        question: 'Egy kerti körlocsoló 12 méter távolságra szór, de egy kerti ház fala miatt csak 270°-os szögben foroghat. Hány négyzetmétert öntöz meg (π ≈ 3,14)?',
        options: ['kb. 339,1 m²', '452,2 m²', '226 m²', '113 m²'],
        correctAnswer: 0,
        explanation: 'T = (12² · 3,14 · 270) / 360 = (144 · 3,14 · 3) / 4 = 36 · 3,14 · 3 = 339,12 m².'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Mutatók találkozása és optimalizálás',
    subtitle: 'Algebrai egyenletek a mutatók fedésére, merőlegességére és kanyarívekre.',
    range: '21–30. feladat',
    focus: 'Fedés egyenlete, relatív szögsebesség, autóút kanyarodási sugara',
    questions: [
      {
        id: 'eas3-1',
        question: '12:00 óra után mikor fedi egymást legközelebb a kismutató és a nagymutató?',
        options: ['1 óra 5 és 5/11 perckor (kb. 1:05:27)', 'Pontosan 1:05-kor', '1:06-kor', '1:10-kor'],
        correctAnswer: 0,
        explanation: 'A nagymutató relatív sebessége a kismutatóhoz képest: 6° - 0,5° = 5,5° percenként = 11/2 °/perc. 1 órakor (30°-os lemaradásban van a nagymutató): t = 30° / 5,5° = 60/11 perc = 5 és 5/11 perc. Tehát 1 óra 5 és 5/11 perckor fedik egymást.'
      },
      {
        id: 'eas3-2',
        question: 'Hányszor zár be derékszöget (90°) az óra két mutatója egy teljes 12 órás körforgás alatt?',
        options: ['22 alkalommal', '24 alkalommal', '12 alkalommal', '11 alkalommal'],
        correctAnswer: 0,
        explanation: 'Egy 12 órás ciklusban a nagymutató 11-szer előzi meg a kismutatót. Minden előzési ciklusban pontosan 2-szer zárnak be 90°-ot (egyszer 90°-os lemaradásban, egyszer 90°-os előnyben). Így: 11 · 2 = 22 alkalommal.'
      },
      {
        id: 'eas3-3',
        question: 'Egy autópálya-lehajtó 90°-os kanyarulatának külső sugara R = 80 m, belső sugara r = 74 m (6 m sávszélesség). Hány méterrel hosszabb a külső szalagkorlát a belsőnél (π ≈ 3,14)?',
        options: ['kb. 9,42 méterrel (6 · π / 2)', '6 méterrel', '18,84 méterrel', '12 méterrel'],
        correctAnswer: 0,
        explanation: 'Különbség: i_külső - i_belső = (2π(R - r) · 90) / 360 = (2π · 6) / 4 = 12π / 4 = 3π ≈ 9,42 méter.'
      },
      {
        id: 'eas3-4',
        question: '3 óra és 4 óra között mikor áll a két óramutató pontosan egymással szemben (180°-os szög)?',
        options: ['3 óra 49 és 1/11 perckor', '3:45-kor', '3:50-kor', '3 óra 48 perckor'],
        correctAnswer: 0,
        explanation: '3:00-kor a kismutató 90°-on áll. A 180°-os különbséghez a nagymutatónak 90° + 180° = 270°-ot kell behoznia. Relatív sebesség: 5,5°/perc. t = 270 / 5,5 = 540 / 11 = 49 és 1/11 perc.'
      },
      {
        id: 'eas3-5',
        question: 'Egy étteremben a 30 cm átmérőjű pizza 2400 Ft, a 45 cm átmérőjű családi pizza 4500 Ft. Melyik éri meg jobban a vendégnek négyzetcentiméterre vetítve?',
        options: [
          'A családi pizza jóval olcsóbb cm²-enként (kb. 2,83 Ft/cm² vs 3,39 Ft/cm²)',
          'A 30 cm-es pizza éri meg jobban',
          'Pontosan ugyanannyiba kerülnek cm²-enként',
          'Nem lehet eldönteni'
        ],
        correctAnswer: 0,
        explanation: '30 cm pizza: r = 15 cm, T = 225π ≈ 707 cm². Ár/cm² = 2400 / 707 ≈ 3,39 Ft/cm². 45 cm pizza: r = 22,5 cm, T = 506,25π ≈ 1590 cm². Ár/cm² = 4500 / 1590 ≈ 2,83 Ft/cm². A családi pizza több mint 16%-kal olcsóbb fajlagosan!'
      },
      {
        id: 'eas3-6',
        question: 'Egy vasúti kanyarban a vágány sugara r = 600 méter, a kanyar szöge 45°. Mennyi idő alatt halad át rajta egy 72 km/h (20 m/s) sebességű vonat (π ≈ 3,14)?',
        options: ['kb. 23,55 másodperc', 'kb. 47 másodperc', 'kb. 15 másodperc', 'kb. 30 másodperc'],
        correctAnswer: 0,
        explanation: 'Ívhossz: i = (2 · 600 · 3,14 · 45) / 360 = (1200 · 3,14) / 8 = 150 · 3,14 = 471 méter. Idő: t = s / v = 471 m / (20 m/s) = 23,55 másodperc.'
      },
      {
        id: 'eas3-7',
        question: 'Egy óra számlapján a nagymutató hossza 15 cm. Mekkora sebességgel mozog a nagymutató hegye cm/perc-ben (π ≈ 3,14)?',
        options: ['kb. 1,57 cm/perc', '3,14 cm/perc', '0,78 cm/perc', '6 cm/perc'],
        correctAnswer: 0,
        explanation: '1 óra (60 perc) alatt leírt út a teljes kerület: K = 2 · 15 · 3,14 = 94,2 cm. Sebesség: v = 94,2 cm / 60 perc = 1,57 cm/perc.'
      },
      {
        id: 'eas3-8',
        question: 'Hány fokos szöget zár be a két óramutató 7:35-kor?',
        options: ['17,5°', '0°', '35°', '12,5°'],
        correctAnswer: 0,
        explanation: 'Nagymutató: 35 · 6° = 210°. Kismutató: 7 · 30° + 35 · 0,5° = 210° + 17,5° = 227,5°. Különbség: 227,5° - 210° = 17,5°.'
      },
      {
        id: 'eas3-9',
        question: 'Egy kör alakú akvárium külső átmérője 60 cm, üvegfalának vastagsága 2 cm. Hány liter víz fér bele, ha 40 cm magasan töltik fel (π ≈ 3,14)?',
        options: ['kb. 98,5 liter', 'kb. 113 liter', 'kb. 80 liter', 'kb. 105 liter'],
        correctAnswer: 0,
        explanation: 'Belső átmérő: d = 60 - 2 · 2 = 56 cm ⟹ belső sugár r = 28 cm. Belső alap területe: T = 28² · 3,14 = 784 · 3,14 = 2461,76 cm². Térfogat: V = T · m = 2461,76 · 40 = 98 470 cm³ = 98,47 dm³ ≈ 98,5 liter.'
      },
      {
        id: 'eas3-10',
        question: 'Hány órakor fedi egymást a két mutató 11:00 és 12:00 között?',
        options: ['Pontosan 12:00-kor (11 és 12 között nincs más fedés)', '11:55-kor', '11:54 és 6/11 perckor', '11:50-kor'],
        correctAnswer: 0,
        explanation: 'A 11:00 utáni első találkozási pont: t = (11 · 30°) / 5,5° = 330 / 5,5 = 60 perc, vagyis hajszálpontosan 12:00:00-kor érnek össze!'
      }
    ]
  }
};

export const EverydayArcsSectorsQuiz: React.FC<EverydayArcsSectorsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      title="Körívek és körcikkek a mindennapokban Kvíz"
      subtitle="Valós geometriai problémák: órák szögei, ablaktörlők és gazdasági összehasonlítások."
      badge="10. OSZTÁLY • VI. EGYBEVÁGÓSÁG ÉS KÖR • GYAKORLÓ KVÍZ"
      color="purple"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <EverydayArcsSectorsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <EverydayArcsSectorsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};
