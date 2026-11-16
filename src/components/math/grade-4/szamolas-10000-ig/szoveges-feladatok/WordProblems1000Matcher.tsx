import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WordProblems1000MatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const WORD_PROBLEMS1000_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Melyik művelet kell?",
    description: "Párosítsd a feladatot azzal a művelettel, amellyel megoldható!",
    pairs: [
      { id: "wpm1", left: "A tanulók ötödrésze 154 gyerek. Hányan vannak összesen?", right: "154 · 5" },
      { id: "wpm2", left: "Csabának 485 Ft-ja van, a könyv 950 Ft. Mennyi hiányzik?", right: "950 − 485" },
      { id: "wpm3", left: "Máté 350 Ft, Ádám 650 Ft. Mennyi pénzük van együtt?", right: "350 + 650" },
      { id: "wpm4", left: "22 gyerek párosával áll. Hány pár van?", right: "22 : 2" },
      { id: "wpm5", left: "88 lány és háromszor ennyi fiú. Hány fiú van?", right: "3 · 88" },
      { id: "wpm6", left: "Az út 940 m, megtettek 780 m-t. Mennyi van még hátra?", right: "940 − 780" },
      { id: "wpm7", left: "Az első tóba 550 ivadék, a másodikba 430-cal kevesebb.", right: "550 − 430" },
      { id: "wpm8", left: "Az 1000 m-es táv fele", right: "1000 : 2" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Mi a megoldás?",
    description: "Párosítsd a szöveges feladatot a helyes válasszal!",
    pairs: [
      { id: "wpm9", left: "Kristóf, anyukája (3-szor annyi) és nagymamája (6-szor annyi) együtt 110 évesek. Hány éves Kristóf?", right: "11 éves" },
      { id: "wpm10", left: "Ugyanebben a feladatban hány éves a nagymama?", right: "66 éves" },
      { id: "wpm11", left: "1 m-es léc két darabja: az egyik 4-szer akkora. Mekkora a kisebbik?", right: "20 cm" },
      { id: "wpm12", left: "Ádám 140 m-t, Roland 60 m-t tesz meg percenként, 1000 m-ről indulnak egymás felé. Mikor találkoznak?", right: "5 perc múlva" },
      { id: "wpm13", left: "22 gyerek párban, a párok 50 cm-re. Milyen hosszú a sor?", right: "5 m" },
      { id: "wpm14", left: "Máté 350 Ft, Ádám 650 Ft. Mennyit adjon Ádám, hogy egyenlő legyen?", right: "150 Ft-ot" },
      { id: "wpm15", left: "Dániel az első, a többi 3 fiú bármilyen sorrendben. Hány sorrend lehet?", right: "6" },
      { id: "wpm16", left: "Karesz 3 napon 56–56 km-t tekert, az egész út 213 km. Mennyit az utolsó napon?", right: "45 km" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Melyik rajz segít?",
    description: "Párosítsd a feladatot azzal a módszerrel, amely a legjobban segít a megoldásban!",
    pairs: [
      { id: "wpm17", left: "Futóverseny: lányok, fiúk és felnőttek, összesen 613", right: "szakaszos ábra" },
      { id: "wpm18", left: "22 gyerek párokban, 50 cm-enként", right: "számegyenes" },
      { id: "wpm19", left: "Kristóf, anyukája és nagymamája életkora", right: "színes rudak" },
      { id: "wpm20", left: "Ádám és Roland percről percre közeledik", right: "táblázat" },
      { id: "wpm21", left: "Hányféle sorrendben érhetnek célba?", right: "elágazásos rajz" },
      { id: "wpm22", left: "Gondoltam egy számra: · 3, + 60 → 300", right: "visszafelé számolás" },
      { id: "wpm23", left: "Máté és Ádám igazságosan osztozik a pénzén", right: "játékpénz" },
      { id: "wpm24", left: "2 m 8 cm, 19 dm vagy 179 cm – ki ugrott messzebb?", right: "átváltás és sorba rendezés" }
    ]
  }
];

const WORD_PROBLEMS1000_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: WORD_PROBLEMS1000_MATCHER_LEVELS_LIST[0],
  2: WORD_PROBLEMS1000_MATCHER_LEVELS_LIST[1],
  3: WORD_PROBLEMS1000_MATCHER_LEVELS_LIST[2]
};

export const WordProblems1000Matcher: React.FC<WordProblems1000MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-count-szoveges-matcher',
  topicTitle = "6. Szöveges feladatok – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="szoveges-feladatok"
      title={topicTitle}
      subtitle="Párosítsd a szöveges feladatokat a műveletükkel, a megoldásukkal és a hozzájuk illő rajzzal!"
      levels={WORD_PROBLEMS1000_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default WordProblems1000Matcher;
