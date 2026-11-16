import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TrueFalse4MatcherProps {
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

const TRUE_FALSE_4_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Ugyanazt jelenti",
    description: "Párosítsd az ugyanazt jelentő állításokat!",
    pairs: [
      { id: 'tfm1', left: "Mindegyik eleme páros.", right: "Nincs olyan eleme, amelyik páratlan." },
      { id: 'tfm2', left: "Egyik eleme sem páros.", right: "Mindegyik eleme páratlan." },
      { id: 'tfm3', left: "Nem mindegyik eleme páros.", right: "Van olyan eleme, amelyik nem páros." },
      { id: 'tfm4', left: "Van olyan eleme, amelyik páros.", right: "Nem igaz, hogy egyik eleme sem páros." },
      { id: 'tfm5', left: "Nincs közöttük háziállat.", right: "Egyik sem háziállat." },
      { id: 'tfm6', left: "Nem mindegyik madár tud repülni.", right: "Van olyan madár, amelyik nem tud repülni." },
      { id: 'tfm7', left: "Egyik sem hal.", right: "Nincs közöttük hal." },
      { id: 'tfm8', left: "Mindegyik vadon élő állat.", right: "Nincs közöttük olyan, amelyik nem vadon él." }
    ]
  },
  {
    level: 2,
    title: "2. szint: A munkafüzet halmaza",
    description: "MF II. 51. o. 10. A halmaz számai: 3063, 4016, 7000, 6624, 8808, 9705, 5939. Igaz vagy hamis, és miért?",
    pairs: [
      { id: 'tfm9', left: "A halmazban minden szám páratlan.", right: "Hamis: a 4016 páros" },
      { id: 'tfm10', left: "Nem minden szám kisebb, mint a 10 000.", right: "Hamis: mindegyik kisebb" },
      { id: 'tfm11', left: "Van olyan szám, amelyben a számjegyek összege 26.", right: "Igaz: 5939" },
      { id: 'tfm12', left: "Nincs olyan szám, amelyben három egyforma számjegy van.", right: "Hamis: 7000 és 8808" },
      { id: 'tfm13', left: "Több olyan szám van, amelyben van 0-s számjegy.", right: "Igaz: öt ilyen szám van" },
      { id: 'tfm14', left: "Két olyan szám van, amelyet ezresre lefelé kerekítünk.", right: "Igaz: 3063 és 4016" },
      { id: 'tfm15', left: "Van olyan szám, amelyik 9000-nél nagyobb.", right: "Igaz: 9705" },
      { id: 'tfm16', left: "Egyik szám sem kerek ezres.", right: "Hamis: 7000" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Melyik halmazra igaz?",
    description: "TK 132. o. 3. A: 1246, 54, 600, 8002, 9998 · B: 475, 33, 6606, 48, 9579 · C: 1005, 8889, 77, 1001, 423",
    pairs: [
      { id: 'tfm17', left: "Mindegyik eleme páros szám.", right: "csak az A halmazra" },
      { id: 'tfm18', left: "Egyik eleme sem páros.", right: "csak a C halmazra" },
      { id: 'tfm19', left: "Van olyan eleme, amelyik nem páros.", right: "a B és a C halmazra" },
      { id: 'tfm20', left: "Van olyan eleme, amelyik nem páratlan.", right: "az A és a B halmazra" },
      { id: 'tfm21', left: "Van olyan eleme, amelyik kétjegyű.", right: "mindhárom halmazra" },
      { id: 'tfm22', left: "Van olyan eleme, amelyik ötjegyű.", right: "egyik halmazra sem" },
      { id: 'tfm23', left: "Van páros és páratlan eleme is.", right: "csak a B halmazra" },
      { id: 'tfm24', left: "Vagy mindegyik eleme páros, vagy mindegyik páratlan.", right: "az A és a C halmazra" }
    ]
  }
];

const TRUE_FALSE_4_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: TRUE_FALSE_4_MATCHER_LEVELS_LIST[0],
  2: TRUE_FALSE_4_MATCHER_LEVELS_LIST[1],
  3: TRUE_FALSE_4_MATCHER_LEVELS_LIST[2]
};

export const TrueFalse4Matcher: React.FC<TrueFalse4MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-group-igaz-hamis-matcher',
  topicTitle = "4. Igaz vagy hamis? – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="valogatasok-csoportositasok"
      topicId={topicId}
      subtopicId="igaz-vagy-hamis"
      title={topicTitle}
      subtitle="Párosítsd az ugyanazt jelentő állításokat, és döntsd el, melyik állítás mire igaz!"
      levels={TRUE_FALSE_4_MATCHER_LEVELS}
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

export default TrueFalse4Matcher;
