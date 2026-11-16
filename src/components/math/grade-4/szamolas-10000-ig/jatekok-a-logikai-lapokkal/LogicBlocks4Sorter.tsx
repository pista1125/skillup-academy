import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LogicBlocks4SorterProps {
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

const LOGIC_BLOCKS4_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Méret és lyuk",
    description: "Figyelj két tulajdonságra is: nagy-e, és lyukas-e!",
    categories: [
      { id: "bigholed", name: "Nagy és lyukas", color: "emerald" },
      { id: "bigsolid", name: "Nagy, de nem lyukas", color: "blue" },
      { id: "small", name: "Kicsi", color: "amber" }
    ],
    items: [
      { id: "lbs1", text: "nagy, piros, lyukas kör", categoryId: "bigholed" },
      { id: "lbs2", text: "nagy, sárga, lyukas kör", categoryId: "bigholed" },
      { id: "lbs3", text: "nagy, kék, lyukas négyzet", categoryId: "bigholed" },
      { id: "lbs4", text: "nagy, zöld, lyukas négyzet", categoryId: "bigholed" },
      { id: "lbs5", text: "nagy, piros, lyukas háromszög", categoryId: "bigholed" },
      { id: "lbs6", text: "nagy, sárga, lyukas háromszög", categoryId: "bigholed" },
      { id: "lbs7", text: "nagy, kék, lyukas kör", categoryId: "bigholed" },
      { id: "lbs8", text: "nagy, zöld, lyukas háromszög", categoryId: "bigholed" },
      { id: "lbs9", text: "nagy, sárga, lyukas négyzet", categoryId: "bigholed" },
      { id: "lbs10", text: "nagy, piros, nem lyukas kör", categoryId: "bigsolid" },
      { id: "lbs11", text: "nagy, sárga, nem lyukas négyzet", categoryId: "bigsolid" },
      { id: "lbs12", text: "nagy, kék, nem lyukas háromszög", categoryId: "bigsolid" },
      { id: "lbs13", text: "nagy, zöld, nem lyukas kör", categoryId: "bigsolid" },
      { id: "lbs14", text: "nagy, piros, nem lyukas négyzet", categoryId: "bigsolid" },
      { id: "lbs15", text: "nagy, sárga, nem lyukas háromszög", categoryId: "bigsolid" },
      { id: "lbs16", text: "nagy, kék, nem lyukas kör", categoryId: "bigsolid" },
      { id: "lbs17", text: "nagy, zöld, nem lyukas négyzet", categoryId: "bigsolid" },
      { id: "lbs18", text: "nagy, piros, nem lyukas háromszög", categoryId: "bigsolid" },
      { id: "lbs19", text: "kicsi, piros, lyukas kör", categoryId: "small" },
      { id: "lbs20", text: "kicsi, sárga, nem lyukas kör", categoryId: "small" },
      { id: "lbs21", text: "kicsi, kék, lyukas négyzet", categoryId: "small" },
      { id: "lbs22", text: "kicsi, zöld, nem lyukas négyzet", categoryId: "small" },
      { id: "lbs23", text: "kicsi, piros, nem lyukas háromszög", categoryId: "small" },
      { id: "lbs24", text: "kicsi, sárga, lyukas háromszög", categoryId: "small" },
      { id: "lbs25", text: "kicsi, kék, nem lyukas kör", categoryId: "small" },
      { id: "lbs26", text: "kicsi, zöld, lyukas háromszög", categoryId: "small" },
      { id: "lbs27", text: "kicsi, piros, lyukas négyzet", categoryId: "small" }
    ]
  },
  {
    level: 2,
    title: "2. szint: „Ha sárga, akkor kicsi.”",
    description: "Igaz-e az állítás a lapra? Ha igaz, miért?",
    categories: [
      { id: "notyellow", name: "Igaz, mert nem sárga", color: "blue" },
      { id: "yellowsmall", name: "Igaz, mert sárga és kicsi", color: "emerald" },
      { id: "false", name: "Hamis, mert sárga és nagy", color: "rose" }
    ],
    items: [
      { id: "lbs28", text: "nagy piros kör", categoryId: "notyellow" },
      { id: "lbs29", text: "nagy kék négyzet", categoryId: "notyellow" },
      { id: "lbs30", text: "kicsi zöld háromszög", categoryId: "notyellow" },
      { id: "lbs31", text: "nagy zöld lyukas kör", categoryId: "notyellow" },
      { id: "lbs32", text: "kicsi piros lyukas négyzet", categoryId: "notyellow" },
      { id: "lbs33", text: "nagy kék lyukas háromszög", categoryId: "notyellow" },
      { id: "lbs34", text: "kicsi kék kör", categoryId: "notyellow" },
      { id: "lbs35", text: "nagy piros háromszög", categoryId: "notyellow" },
      { id: "lbs36", text: "nagy zöld négyzet", categoryId: "notyellow" },
      { id: "lbs37", text: "kicsi sárga kör", categoryId: "yellowsmall" },
      { id: "lbs38", text: "kicsi sárga lyukas kör", categoryId: "yellowsmall" },
      { id: "lbs39", text: "kicsi sárga nem lyukas kör", categoryId: "yellowsmall" },
      { id: "lbs40", text: "kicsi sárga négyzet", categoryId: "yellowsmall" },
      { id: "lbs41", text: "kicsi sárga lyukas négyzet", categoryId: "yellowsmall" },
      { id: "lbs42", text: "kicsi sárga nem lyukas négyzet", categoryId: "yellowsmall" },
      { id: "lbs43", text: "kicsi sárga háromszög", categoryId: "yellowsmall" },
      { id: "lbs44", text: "kicsi sárga lyukas háromszög", categoryId: "yellowsmall" },
      { id: "lbs45", text: "kicsi sárga nem lyukas háromszög", categoryId: "yellowsmall" },
      { id: "lbs46", text: "nagy sárga kör", categoryId: "false" },
      { id: "lbs47", text: "nagy sárga lyukas kör", categoryId: "false" },
      { id: "lbs48", text: "nagy sárga nem lyukas kör", categoryId: "false" },
      { id: "lbs49", text: "nagy sárga négyzet", categoryId: "false" },
      { id: "lbs50", text: "nagy sárga lyukas négyzet", categoryId: "false" },
      { id: "lbs51", text: "nagy sárga nem lyukas négyzet", categoryId: "false" },
      { id: "lbs52", text: "nagy sárga háromszög", categoryId: "false" },
      { id: "lbs53", text: "nagy sárga lyukas háromszög", categoryId: "false" },
      { id: "lbs54", text: "nagy sárga nem lyukas háromszög", categoryId: "false" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Hány tulajdonság változott?",
    description: "Hasonlítsd össze a két lapot! Hány tulajdonságban különböznek?",
    categories: [
      { id: "one", name: "Pontosan 1 tulajdonság", color: "emerald" },
      { id: "two", name: "Pontosan 2 tulajdonság", color: "blue" },
      { id: "more", name: "3 vagy 4 tulajdonság", color: "purple" }
    ],
    items: [
      { id: "lbs55", text: "nagy piros kör → nagy kék kör", categoryId: "one" },
      { id: "lbs56", text: "kicsi sárga négyzet → nagy sárga négyzet", categoryId: "one" },
      { id: "lbs57", text: "piros négyzet → piros lyukas négyzet", categoryId: "one" },
      { id: "lbs58", text: "kék kör → kék háromszög", categoryId: "one" },
      { id: "lbs59", text: "nagy zöld lyukas kör → kicsi zöld lyukas kör", categoryId: "one" },
      { id: "lbs60", text: "kicsi piros háromszög → kicsi sárga háromszög", categoryId: "one" },
      { id: "lbs61", text: "nagy kék négyzet → nagy kék kör", categoryId: "one" },
      { id: "lbs62", text: "kicsi zöld lyukas háromszög → kicsi zöld háromszög", categoryId: "one" },
      { id: "lbs63", text: "nagy sárga kör → nagy zöld kör", categoryId: "one" },
      { id: "lbs64", text: "nagy zöld kör → kicsi kék kör", categoryId: "two" },
      { id: "lbs65", text: "nagy piros háromszög → kicsi piros lyukas háromszög", categoryId: "two" },
      { id: "lbs66", text: "nagy zöld kör → kicsi zöld háromszög", categoryId: "two" },
      { id: "lbs67", text: "piros kör → kék négyzet", categoryId: "two" },
      { id: "lbs68", text: "kicsi sárga négyzet → nagy sárga lyukas négyzet", categoryId: "two" },
      { id: "lbs69", text: "nagy kék lyukas kör → nagy piros kör", categoryId: "two" },
      { id: "lbs70", text: "kicsi piros kör → kicsi piros lyukas háromszög", categoryId: "two" },
      { id: "lbs71", text: "nagy sárga háromszög → kicsi zöld háromszög", categoryId: "two" },
      { id: "lbs72", text: "kék lyukas négyzet → kék háromszög", categoryId: "two" },
      { id: "lbs73", text: "kicsi kék kör → nagy piros lyukas négyzet", categoryId: "more" },
      { id: "lbs74", text: "nagy sárga kör → kicsi piros négyzet", categoryId: "more" },
      { id: "lbs75", text: "kicsi zöld lyukas háromszög → nagy kék háromszög", categoryId: "more" },
      { id: "lbs76", text: "nagy piros négyzet → kicsi sárga lyukas négyzet", categoryId: "more" },
      { id: "lbs77", text: "kicsi kék háromszög → nagy zöld lyukas kör", categoryId: "more" },
      { id: "lbs78", text: "nagy zöld lyukas kör → kicsi piros kör", categoryId: "more" },
      { id: "lbs79", text: "kicsi sárga négyzet → nagy kék lyukas háromszög", categoryId: "more" },
      { id: "lbs80", text: "nagy kék kör → kicsi kék lyukas háromszög", categoryId: "more" },
      { id: "lbs81", text: "kicsi piros lyukas négyzet → nagy zöld háromszög", categoryId: "more" }
    ]
  }
];

const LOGIC_BLOCKS4_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LOGIC_BLOCKS4_SORTER_LEVELS_LIST[0],
  2: LOGIC_BLOCKS4_SORTER_LEVELS_LIST[1],
  3: LOGIC_BLOCKS4_SORTER_LEVELS_LIST[2]
};

export const LogicBlocks4Sorter: React.FC<LogicBlocks4SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-count-logikai-lapok-sorter',
  topicTitle = "8. Játékok a logikai lapokkal – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="jatekok-a-logikai-lapokkal"
      title={topicTitle}
      subtitle="Válogasd szét a logikai lapokat tulajdonságaik és az állítások szerint!"
      levels={LOGIC_BLOCKS4_SORTER_LEVELS}
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

export default LogicBlocks4Sorter;
