import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { CirclePracticeMatcher } from './CirclePracticeMatcher';
import { CirclePracticeSorter } from './CirclePracticeSorter';
import {
  CombinedRunningTrackSvg,
  SquareInscribedCircumscribedCircleSvg,
  TrackMiniSvg,
  SquareCirclesMiniSvg,
  EquilateralIncircleMiniSvg,
  RingSectorMiniSvg
} from './CirclePracticeFigures';

interface CirclePracticeQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Stadion pálya képlete',
    description: 'K = 2L + 2rπ (2 egyenes + 1 teljes kör). T = 2rL + r²π.',
    note: 'Kanyarban a sávszélesség miatt a külső pályán futónak előrébb kell rajtolnia (lépcsős rajt)!',
    color: 'from-indigo-500 to-purple-600',
    figure: <CombinedRunningTrackSvg size={220} />
  },
  {
    title: 'Négyzet és körök',
    description: 'Beírt kör sugara r = a/2. Köré írt kör sugara R = a√2/2. T_körül / T_be = 2.',
    note: 'A körülírt kör területe pontosan a duplája a beírt kör területének!',
    color: 'from-purple-500 to-pink-600',
    figure: <SquareInscribedCircumscribedCircleSvg size={200} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető gyakorló feladatok',
    subtitle: 'Négyzetek és körök, forgások és egyszerű kombinált síkidomok.',
    range: '1–10. feladat',
    focus: 'Összetett alakzatok, forgás, négyzet és kör kapcsolata',
    questions: [
      {
        id: 'cpq1-1',
        question: 'Egy négyzet oldala 8 cm. Mekkora a beírt körének sugara?',
        figure: <SquareInscribedCircumscribedCircleSvg size={160} />,
        options: ['4 cm', '8 cm', '4√2 cm', '2 cm'],
        correctAnswer: 0,
        explanation: 'A beírt kör átmérője a négyzet oldala: d = 8 cm ⟹ r = a / 2 = 4 cm.'
      },
      {
        id: 'cpq1-2',
        question: 'Egy négyzet oldala 8 cm. Mekkora a köré írt körének sugara?',
        options: ['4√2 cm (kb. 5,66 cm)', '4 cm', '8 cm', '8√2 cm'],
        correctAnswer: 0,
        explanation: 'A négyzet átlója d = 8√2 cm. A körülírt kör sugara a félátló: R = d / 2 = 4√2 cm.'
      },
      {
        id: 'cpq1-3',
        question: 'Egy autó kereke 50 cm átmérőjű. Mekkora utat tesz meg 1 fordulat alatt (π ≈ 3,14)?',
        options: ['157 cm (1,57 m)', '314 cm', '78,5 cm', '50 cm'],
        correctAnswer: 0,
        explanation: 's = K = d · π = 50 · 3,14 = 157 cm = 1,57 m.'
      },
      {
        id: 'cpq1-4',
        question: 'Hányszorosa a négyzet köré írt kör területe a négyzetbe írt kör területének?',
        options: ['Pontosan 2-szerese', '4-szerese', '√2-szerese', '3-szorosa'],
        correctAnswer: 0,
        explanation: 'R² / r² = (a√2/2)² / (a/2)² = (2/4) / (1/4) = 2. A területarány mindig pontosan 2.'
      },
      {
        id: 'cpq1-5',
        question: 'Egy stadion pálya egyenese L = 80 m, a kanyarok sugara r = 30 m. Mekkora a pálya belső kerülete (π ≈ 3,14)?',
        figure: <CombinedRunningTrackSvg size={170} />,
        options: ['kb. 348,4 méter', '400 méter', '220 méter', '268,4 méter'],
        correctAnswer: 0,
        explanation: 'K = 2 · L + 2 · r · π = 2 · 80 + 2 · 30 · 3,14 = 160 + 188,4 = 348,4 méter.'
      },
      {
        id: 'cpq1-6',
        question: 'Mekkora az a = 6 cm oldalhosszúságú négyzetből kivágható legnagyobb kör területe?',
        options: ['9π cm² (kb. 28,3 cm²)', '36π cm²', '18π cm²', '6π cm²'],
        correctAnswer: 0,
        explanation: 'r = a / 2 = 3 cm ⟹ T = r²π = 3²π = 9π cm².'
      },
      {
        id: 'cpq1-7',
        question: 'Egy bicikli 628 métert tesz meg. Kerekének sugara 25 cm. Hányat fordult a kerék (π ≈ 3,14)?',
        options: ['400 fordulatot', '200 fordulatot', '100 fordulatot', '800 fordulatot'],
        correctAnswer: 0,
        explanation: '1 fordulat: K = 2 · 0,25 m · 3,14 = 1,57 m. Fordulatok száma: 628 / 1,57 = 400.'
      },
      {
        id: 'cpq1-8',
        question: 'Egy Norman-ablak egy téglalapból és a tetején lévő félkörből áll. Ha a szélessége 2 méter, mekkora a félkör sugara?',
        options: ['1 méter', '2 méter', '0,5 méter', '1,5 méter'],
        correctAnswer: 0,
        explanation: 'A félkör átmérője egybeesik a téglalap szélességével: d = 2 m ⟹ r = 1 m.'
      },
      {
        id: 'cpq1-9',
        question: 'Egy 10 cm sugarú kerek sajttorta felét megesszük. Mekkora a megmaradt félkör alakú torta kerülete (π ≈ 3,14)?',
        options: ['51,4 cm (31,4 cm ív + 20 cm vágási felület)', '31,4 cm', '20 cm', '62,8 cm'],
        correctAnswer: 0,
        explanation: 'K = rπ + 2r = 10 · 3,14 + 2 · 10 = 31,4 + 20 = 51,4 cm.'
      },
      {
        id: 'cpq1-10',
        question: 'Mekkora a 20 cm oldalhosszúságú négyzet köré írt kör átmérője?',
        options: ['20√2 cm (kb. 28,3 cm)', '20 cm', '40 cm', '10√2 cm'],
        correctAnswer: 0,
        explanation: 'A körülírt kör átmérője a négyzet átlója: d = a√2 = 20√2 cm.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Sávszélességek és lépcsős rajtok',
    subtitle: 'Futópályák sávkülönbségei, összetett síkidomok kerülete és területe.',
    range: '11–20. feladat',
    focus: 'Lépcsős rajt, sávkülönbség: 2π·w, több kör érintkezése',
    questions: [
      {
        id: 'cpq2-1',
        question: 'Egy futópályán a 2. sáv sugara w = 1,22 méterrel nagyobb az 1. sáv sugaránál. Hány méterrel hosszabb a 2. sáv kanyarulata (π ≈ 3,14)?',
        figure: <TrackMiniSvg size={130} />,
        options: ['kb. 7,66 méterrel (2 · π · w)', 'kb. 1,22 méterrel', 'kb. 3,83 méterrel', 'kb. 10 méterrel'],
        correctAnswer: 0,
        explanation: 'Különbség = 2π(r + w) - 2πr = 2π · w = 2 · 3,14 · 1,22 m ≈ 7,66 méter. Ezért kell a külső sávban futónak 7,66 méterrel előrébb indulnia a 400 méteres versenyben!'
      },
      {
        id: 'cpq2-2',
        question: 'Egy téglalap oldalai 6 cm és 8 cm. Mekkora a köré írt körének sugara?',
        options: ['5 cm', '10 cm', '7 cm', '4 cm'],
        correctAnswer: 0,
        explanation: 'A téglalap átlója az átmérő: d = √(6² + 8²) = √(36 + 64) = √100 = 10 cm. A sugár: R = d / 2 = 5 cm.'
      },
      {
        id: 'cpq2-3',
        question: 'Lehet-e bármilyen téglalapba kört írni úgy, hogy az mind a négy oldalt érintse?',
        options: [
          'Csak akkor, ha a téglalap négyzet (minden oldala egyenlő)',
          'Igen, bármely téglalapba beírható kör',
          'Soha nem lehetséges',
          'Csak ha az oldalak aránya 1:2'
        ],
        correctAnswer: 0,
        explanation: 'Érintőnégyszögbe csak akkor írható kör, ha a szemközti oldalak összege egyenlő (a + a = b + b ⟹ 2a = 2b ⟹ a = b). Ez téglalapnál csak négyzet esetén teljesül!'
      },
      {
        id: 'cpq2-4',
        question: 'Három egyenlő r = 10 cm sugarú pénzérme szorosan érinti egymást egy asztalon. Mekkora a három érme közé zárt síkrész területe?',
        options: ['100√3 - 50π cm² (kb. 16,1 cm²)', '50 cm²', '25π cm²', '100 cm²'],
        correctAnswer: 0,
        explanation: 'A középpontok szabályos háromszöget alkotnak, melynek oldala 2r = 20 cm. Területe: T_△ = 20²√3 / 4 = 100√3 ≈ 173,2 cm². A három érme 3 darab 60°-os körcikke együtt egy félkör: T_félkör = 10²π / 2 = 50π ≈ 157,1 cm². Köztes terület: 173,2 - 157,1 = 16,1 cm².'
      },
      {
        id: 'cpq2-5',
        question: 'Egy 400 méteres atlétikai pályán a 4. sáv futója (ahol a sávszélesség w = 1,22 m) mekkora előnyt kap a rajtnál az 1. sávhoz képest a 400 m-es futásban?',
        options: ['3 · (2π · 1,22) ≈ 23,0 méter', '7,66 méter', '15,3 méter', '30 méter'],
        correctAnswer: 0,
        explanation: 'A 4. sáv a belső sávtól 3 sávszélességnyire (3w) van. A távolságkülönbség: 2π · (3w) = 3 · (2π · 1,22) ≈ 3 · 7,66 ≈ 23,0 méter.'
      },
      {
        id: 'cpq2-6',
        question: 'Egy 1 méter oldalú négyzet mind a 4 sarkából kivágunk egy-egy r = 0,5 méter sugarú negyedkört. Mekkora a megmaradt középső alakzat területe?',
        figure: <SquareCirclesMiniSvg size={130} />,
        options: ['1 - π / 4 m² ≈ 0,215 m²', '0,5 m²', 'π / 4 m²', '0,1 m²'],
        correctAnswer: 0,
        explanation: 'A 4 darab negyedkör együtt egy teljes r = 0,5 méteres kört alkot: T_kör = 0,5² · π = 0,25π = π/4 ≈ 0,785 m². A négyzet területe 1 m². A megmaradt középső csillag alak: 1 - 0,785 = 0,215 m².'
      },
      {
        id: 'cpq2-7',
        question: 'Mekkora a fenti alakzat kerülete?',
        options: ['π méter (kb. 3,14 m)', '4 méter', '2π méter', '1 méter'],
        correctAnswer: 0,
        explanation: 'A határoló vonal 4 darab negyedkörívből áll, ami pontosan egy teljes kör kerülete: K = 2 · r · π = 2 · 0,5 · π = π méter.'
      },
      {
        id: 'cpq2-8',
        question: 'Egy henger alakú konzervdoboz átmérője 10 cm. Legalább milyen hosszú szalaggal lehet körbekötni 3 ilyen dobozt szorosan egymás mellett (π ≈ 3,14)?',
        options: ['30 + 10π cm (kb. 61,4 cm)', '30π cm', '60 cm', '45 cm'],
        correctAnswer: 0,
        explanation: 'A szalag 3 egyenes szakaszból (3 darab átmérő = 3 · 10 = 30 cm) és 3 darab 120°-os kanyarból (együtt egy teljes 10 cm-es kör kerülete = 10π cm) áll: L = 30 + 10π ≈ 61,4 cm.'
      },
      {
        id: 'cpq2-9',
        question: 'Egy kör és egy négyzet kerülete megegyezik: K = 40 cm. Melyik síkidom területe nagyobb?',
        options: [
          'A kör területe nagyobb (izoperimetrikus tétel)',
          'A négyzet területe nagyobb',
          'Pontosan megegyezik a területük',
          'Nem lehet eldönteni'
        ],
        correctAnswer: 0,
        explanation: 'Négyzet oldala 10 cm, területe: 100 cm². Kör sugara: r = 40 / (2π) ≈ 6,37 cm, területe: T = π · 6,37² ≈ 127,3 cm². Az izoperimetrikus tétel kimondja, hogy adott kerület mellett a KÖR zárja körül a lehető legnagyobb területet!'
      },
      {
        id: 'cpq2-10',
        question: 'Egy kerti medence 6 m átmérőjű kör, körben 1 m széles kőperem határolja. Hány négyzetméter a kőperem területe (π ≈ 3,14)?',
        options: ['7π m² (kb. 22,0 m²)', '9π m²', '16π m²', '4π m²'],
        correctAnswer: 0,
        explanation: 'Belső sugár r = 3 m, külső sugár R = 3 + 1 = 4 m. T = π(4² - 3²) = π(16 - 9) = 7π ≈ 21,98 m² ≈ 22,0 m².'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Haladó optimalizálás és metrikus relációk',
    subtitle: 'Izoperimetrikus tételek, lencsék és többkörös érintkezési problémák.',
    range: '21–30. feladat',
    focus: 'Izoperimetrikus probléma, érintő körök, geometriai optimalizálás',
    questions: [
      {
        id: 'cpq3-1',
        question: 'Legalább milyen hosszú szalag kell 4 darab r = 5 cm sugarú konzervdoboz szoros körbekötéséhez (négyzetes elrendezésben)?',
        options: ['40 + 10π cm (kb. 71,4 cm)', '80 cm', '40π cm', '50 cm'],
        correctAnswer: 0,
        explanation: 'Négyzetes elrendezésben 4 egyenes szakasz van (mindegyik 2r = 10 cm, összesen 40 cm), és a 4 sarokban 4 darab 90°-os ív (együtt egy teljes 2r = 10 cm átmérőjű kör kerülete: 10π cm): L = 40 + 10π ≈ 71,4 cm.'
      },
      {
        id: 'cpq3-2',
        question: 'Egy derékszögű háromszög oldalaira mint átmérőkre félköröket rajzolunk (Hippokratész holdacskái). Mi a kapcsolat a két befogóra emelt holdacska területe és a háromszög területe között?',
        options: [
          'A két holdacska együttes területe pontosan egyenlő a derékszögű háromszög területével',
          'A holdacskák területe fele a háromszögnek',
          'A holdacskák területe kétszerese a háromszögnek',
          'Nincs közvetlen egyenlőség'
        ],
        correctAnswer: 0,
        explanation: 'Hippokratész híres tétele: a két befogóra emelt félkörök területe összegéből kivonva az átfogóra emelt félkör és a háromszög különbségét, a Pitagorasz-tétel miatt (a²π/8 + b²π/8 = c²π/8) a körös tagok kiejtik egymást, és T_holdacskák = T_háromszög marad!'
      },
      {
        id: 'cpq3-3',
        question: 'Egy 10 cm sugarú körbe beírt szabályos nyolcszög területe mekkora?',
        options: ['200√2 cm² (kb. 282,8 cm²)', '300 cm²', '200 cm²', '100√2 cm²'],
        correctAnswer: 0,
        explanation: 'A nyolcszög 8 egyenlő szárú háromszögből áll, szárszögük 360°/8 = 45°. T = 8 · (1/2 · 10 · 10 · sin 45°) = 8 · 50 · (√2/2) = 200√2 ≈ 282,8 cm².'
      },
      {
        id: 'cpq3-4',
        question: 'Hány százaléka a fenti szabályos 8-szög területe a kör területének (100π ≈ 314,16 cm²)?',
        options: ['kb. 90,0%', 'kb. 80,0%', 'kb. 95,5%', 'kb. 75,0%'],
        correctAnswer: 0,
        explanation: 'Arány = 282,84 / 314,16 ≈ 0,9003 = 90,0%.'
      },
      {
        id: 'cpq3-5',
        question: 'Egy téglalap alakú acéllemez mérete 120 cm × 80 cm. Hány darab 20 cm átmérőjű kört lehet kivágni belőle a legkevesebb hulladékkal (négyzetes elrendezésben)?',
        options: ['24 darabot', '20 darabot', '30 darabot', '18 darabot'],
        correctAnswer: 0,
        explanation: '120 cm mentén: 120 / 20 = 6 darab. 80 cm mentén: 80 / 20 = 4 darab. Összesen: 6 · 4 = 24 darab.'
      },
      {
        id: 'cpq3-6',
        question: 'Mekkora a hulladék aránya a fenti acéllemezből való kivágáskor?',
        options: ['kb. 21,5% (1 - π/4)', 'kb. 15,0%', 'kb. 28,5%', 'kb. 30,0%'],
        correctAnswer: 0,
        explanation: 'Minden 20×20 cm-es cellából 1 db 10 cm sugarú kört vágunk ki. A hulladék aránya minden cellában: (400 - 100π) / 400 = 1 - π/4 ≈ 1 - 0,7854 = 0,2146 ≈ 21,5%.'
      },
      {
        id: 'cpq3-7',
        question: 'Egy körbe írt szabályos hatszög területe T_6 = 54√3 cm². Mekkora a kör területe?',
        options: ['36π cm²', '72π cm²', '54π cm²', '18π cm²'],
        correctAnswer: 0,
        explanation: 'Szabályos hatszögnél a kör sugara egyenlő az oldalával (R = a). T_6 = 6 · (a²√3 / 4) = 1,5 a²√3. 1,5 a²√3 = 54√3 ⟹ 1,5 a² = 54 ⟹ a² = 36 ⟹ a = R = 6 cm. Kör területe: T = R²π = 36π cm².'
      },
      {
        id: 'cpq3-8',
        question: 'Egy rombusz átlói 12 cm és 16 cm. Mekkora a rombuszba írható kör sugara?',
        options: ['4,8 cm', '5 cm', '4 cm', '6 cm'],
        correctAnswer: 0,
        explanation: 'A rombusz oldala a félátlókból (6 és 8 cm): a = √(6² + 8²) = 10 cm. A rombusz területe: T = (12 · 16) / 2 = 96 cm². Ugyanakkor T = a · m ⟹ 96 = 10 · m ⟹ m = 9,6 cm. A beírt kör átmérője a magasság (2r = m), így a sugár: r = 9,6 / 2 = 4,8 cm.'
      },
      {
        id: 'cpq3-9',
        question: 'Egy derékszögű háromszög átfogója c = 25 cm, beírt körének sugara r = 4 cm. Mekkora a háromszög kerülete?',
        options: ['58 cm', '50 cm', '60 cm', '54 cm'],
        correctAnswer: 0,
        explanation: 'Derékszögű háromszögben r = (a + b - c) / 2 ⟹ 4 = (a + b - 25) / 2 ⟹ 8 = a + b - 25 ⟹ a + b = 33 cm. A kerület: K = a + b + c = 33 + 25 = 58 cm.'
      },
      {
        id: 'cpq3-10',
        question: 'A fenti háromszögnek mekkora a területe?',
        options: ['116 cm²', '100 cm²', '120 cm²', '84 cm²'],
        correctAnswer: 0,
        explanation: 'T = r · s, ahol s a félkerület: s = K / 2 = 58 / 2 = 29 cm. T = 4 · 29 = 116 cm².'
      }
    ]
  }
};

export const CirclePracticeQuiz: React.FC<CirclePracticeQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      title="Körszámítások és Összetett Alakzatok Kvíz"
      subtitle="Fejleszd geometriai problémamegoldó képességedet összetett körös feladatokkal!"
      badge="10. OSZTÁLY • VI. EGYBEVÁGÓSÁG ÉS KÖR • KVÍZ"
      color="indigo"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <CirclePracticeMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => { }}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <CirclePracticeSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => { }}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};
