import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface OpenSentencesSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const OPEN_SENTENCES_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Igaz, hamis vagy nyitott?",
    description: "Döntsd el, hogy az állítás igaz, hamis, vagy nyitott mondat (van benne üres hely)!",
    categories: [
      { id: "igaz", name: "Igaz állítás", color: "emerald" },
      { id: "hamis", name: "Hamis állítás", color: "rose" },
      { id: "nyitott", name: "Nyitott mondat", color: "amber" }
    ],
    items: [
      { id: "oss1", text: "5 + 3 = 8", categoryId: "igaz" },
      { id: "oss2", text: "10 > 7", categoryId: "igaz" },
      { id: "oss3", text: "600 − 240 = 360", categoryId: "igaz" },
      { id: "oss4", text: "A Duna folyó.", categoryId: "igaz" },
      { id: "oss5", text: "8 · 70 = 560", categoryId: "igaz" },
      { id: "oss6", text: "367 > 365", categoryId: "igaz" },
      { id: "oss7", text: "A gólyának 2 lába van.", categoryId: "igaz" },
      { id: "oss8", text: "100 : 2 = 50", categoryId: "igaz" },
      { id: "oss9", text: "0 < 1", categoryId: "igaz" },
      { id: "oss10", text: "5 + 3 = 9", categoryId: "hamis" },
      { id: "oss11", text: "10 < 7", categoryId: "hamis" },
      { id: "oss12", text: "6 · 7 = 48", categoryId: "hamis" },
      { id: "oss13", text: "A Balaton folyó.", categoryId: "hamis" },
      { id: "oss14", text: "367 < 67", categoryId: "hamis" },
      { id: "oss15", text: "1000 : 2 = 400", categoryId: "hamis" },
      { id: "oss16", text: "A fecskének 4 lába van.", categoryId: "hamis" },
      { id: "oss17", text: "890 − 560 = 230", categoryId: "hamis" },
      { id: "oss18", text: "9 egyjegyű szám van.", categoryId: "hamis" },
      { id: "oss19", text: "□ + 3 = 8", categoryId: "nyitott" },
      { id: "oss20", text: "10 > □", categoryId: "nyitott" },
      { id: "oss21", text: "□ − 560 = 330", categoryId: "nyitott" },
      { id: "oss22", text: "A □ folyó.", categoryId: "nyitott" },
      { id: "oss23", text: "8 · □ = 560", categoryId: "nyitott" },
      { id: "oss24", text: "367 > □ > 67", categoryId: "nyitott" },
      { id: "oss25", text: "A gólyának □ lába van.", categoryId: "nyitott" },
      { id: "oss26", text: "● + ● = 100", categoryId: "nyitott" },
      { id: "oss27", text: "□ : 6 = 80", categoryId: "nyitott" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Melyik művelettel kapod meg a □-t?",
    description: "Válogasd szét a nyitott mondatokat aszerint, hogy melyik művelettel számolod ki a hiányzó számot!",
    categories: [
      { id: "add", name: "Összeadással", color: "blue" },
      { id: "sub", name: "Kivonással", color: "purple" },
      { id: "muldiv", name: "Szorzással vagy osztással", color: "teal" }
    ],
    items: [
      { id: "oss28", text: "□ − 560 = 330", categoryId: "add" },
      { id: "oss29", text: "□ − 254 = 522", categoryId: "add" },
      { id: "oss30", text: "□ − 100 = 900", categoryId: "add" },
      { id: "oss31", text: "□ − 45 = 55", categoryId: "add" },
      { id: "oss32", text: "□ − 380 = 120", categoryId: "add" },
      { id: "oss33", text: "□ − 999 = 1", categoryId: "add" },
      { id: "oss34", text: "□ − 250 = 250", categoryId: "add" },
      { id: "oss35", text: "□ − 70 = 630", categoryId: "add" },
      { id: "oss36", text: "□ − 12 = 88", categoryId: "add" },
      { id: "oss37", text: "□ + 240 = 600", categoryId: "sub" },
      { id: "oss38", text: "720 − □ = 450", categoryId: "sub" },
      { id: "oss39", text: "562 + □ = 741", categoryId: "sub" },
      { id: "oss40", text: "803 − □ = 427", categoryId: "sub" },
      { id: "oss41", text: "□ + 254 = 522", categoryId: "sub" },
      { id: "oss42", text: "1000 − □ = 630", categoryId: "sub" },
      { id: "oss43", text: "200 + □ = 250", categoryId: "sub" },
      { id: "oss44", text: "□ + 315 = 993", categoryId: "sub" },
      { id: "oss45", text: "920 − □ = 630", categoryId: "sub" },
      { id: "oss46", text: "□ · 6 = 480", categoryId: "muldiv" },
      { id: "oss47", text: "8 · □ = 560", categoryId: "muldiv" },
      { id: "oss48", text: "□ : 9 = 80", categoryId: "muldiv" },
      { id: "oss49", text: "□ : 7 = 50", categoryId: "muldiv" },
      { id: "oss50", text: "4 · □ = 360", categoryId: "muldiv" },
      { id: "oss51", text: "□ : 10 = 48", categoryId: "muldiv" },
      { id: "oss52", text: "5 · □ = 40", categoryId: "muldiv" },
      { id: "oss53", text: "□ · 3 = 180", categoryId: "muldiv" },
      { id: "oss54", text: "□ : 2 = 500", categoryId: "muldiv" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Hány megoldása van?",
    description: "Gondold végig: hány szám teszi igazzá a nyitott mondatot? (Csak 0 és 10 000 közötti egész számokra gondolj!)",
    categories: [
      { id: "one", name: "Pontosan 1 megoldás", color: "emerald" },
      { id: "many", name: "Több megoldás", color: "blue" },
      { id: "none", name: "Nincs megoldás", color: "rose" }
    ],
    items: [
      { id: "oss55", text: "□ + 5 = 12", categoryId: "one" },
      { id: "oss56", text: "367 > □ > 365", categoryId: "one" },
      { id: "oss57", text: "□ · 4 = 100", categoryId: "one" },
      { id: "oss58", text: "● + ● = 100", categoryId: "one" },
      { id: "oss59", text: "□ − 30 = 70", categoryId: "one" },
      { id: "oss60", text: "1000 − □ = 1", categoryId: "one" },
      { id: "oss61", text: "10 · □ = 1000", categoryId: "one" },
      { id: "oss62", text: "□ : 3 = 30", categoryId: "one" },
      { id: "oss63", text: "2 · □ = 18", categoryId: "one" },
      { id: "oss64", text: "5 > □", categoryId: "many" },
      { id: "oss65", text: "□ + 40 < 100", categoryId: "many" },
      { id: "oss66", text: "367 > □ > 67", categoryId: "many" },
      { id: "oss67", text: "20 > □", categoryId: "many" },
      { id: "oss68", text: "10 < □ < 14", categoryId: "many" },
      { id: "oss69", text: "2 · □ < 7", categoryId: "many" },
      { id: "oss70", text: "□ · 10 < 50", categoryId: "many" },
      { id: "oss71", text: "□ + 3 < 6", categoryId: "many" },
      { id: "oss72", text: "250 < □ < 256", categoryId: "many" },
      { id: "oss73", text: "□ + 10 < 5", categoryId: "none" },
      { id: "oss74", text: "20 < □ < 21", categoryId: "none" },
      { id: "oss75", text: "□ · 0 = 5", categoryId: "none" },
      { id: "oss76", text: "□ + 100 = 50", categoryId: "none" },
      { id: "oss77", text: "5 > □ > 4", categoryId: "none" },
      { id: "oss78", text: "□ + □ = 7", categoryId: "none" },
      { id: "oss79", text: "0 > □", categoryId: "none" },
      { id: "oss80", text: "□ · 2 = 9", categoryId: "none" },
      { id: "oss81", text: "□ < 0", categoryId: "none" }
    ]
  }
];

const OPEN_SENTENCES_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: OPEN_SENTENCES_SORTER_LEVELS_LIST[0],
  2: OPEN_SENTENCES_SORTER_LEVELS_LIST[1],
  3: OPEN_SENTENCES_SORTER_LEVELS_LIST[2]
};

export const OpenSentencesSorter: React.FC<OpenSentencesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-count-nyitott-mondatok-sorter',
  topicTitle = "5. Nyitott mondatok – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="nyitott-mondatok"
      title={topicTitle}
      subtitle="Válogasd szét az állításokat és a nyitott mondatokat!"
      levels={OPEN_SENTENCES_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default OpenSentencesSorter;
