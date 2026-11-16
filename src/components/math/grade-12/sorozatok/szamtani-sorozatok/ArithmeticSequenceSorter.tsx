import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ArithmeticSequenceSorterProps {
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

const ARITHMETIC_SEQUENCE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Számtani sorozat?",
    description: "Növő vagy csökkenő számtani sorozat kezdete – vagy egyik sem?",
    categories: [
      { id: "inc", name: "növő számtani sorozat", color: "emerald" },
      { id: "dec", name: "csökkenő számtani sorozat", color: "blue" },
      { id: "no", name: "nem számtani sorozat", color: "rose" }
    ],
    items: [
      { id: "ass101", text: "3; 7; 11; 15", categoryId: "inc" },
      { id: "ass102", text: "34; 36; 38; 40", categoryId: "inc" },
      { id: "ass103", text: "824; 851; 878", categoryId: "inc" },
      { id: "ass104", text: "6; 12; 18; 24", categoryId: "inc" },
      { id: "ass105", text: "5; 5,6; 6,2; 6,8", categoryId: "inc" },
      { id: "ass106", text: "−29; −24; −19", categoryId: "inc" },
      { id: "ass107", text: "2300; 2400; 2500", categoryId: "inc" },
      { id: "ass108", text: "−12; −8; −4; 0", categoryId: "inc" },
      { id: "ass109", text: "0,5; 1; 1,5; 2", categoryId: "inc" },
      { id: "ass110", text: "20; 17; 14; 11", categoryId: "dec" },
      { id: "ass111", text: "39; 37; 35; 33", categoryId: "dec" },
      { id: "ass112", text: "0; −5; −10", categoryId: "dec" },
      { id: "ass113", text: "1; 0,5; 0; −0,5", categoryId: "dec" },
      { id: "ass114", text: "100; 90; 80; 70", categoryId: "dec" },
      { id: "ass115", text: "−1; −3; −5; −7", categoryId: "dec" },
      { id: "ass116", text: "12; 9; 6; 3", categoryId: "dec" },
      { id: "ass117", text: "7,5; 7; 6,5", categoryId: "dec" },
      { id: "ass118", text: "1000; 900; 800", categoryId: "dec" },
      { id: "ass119", text: "2; 4; 8; 16", categoryId: "no" },
      { id: "ass120", text: "1; 4; 9; 16", categoryId: "no" },
      { id: "ass121", text: "1; −1; 1; −1", categoryId: "no" },
      { id: "ass122", text: "1; 2; 3; 5; 8", categoryId: "no" },
      { id: "ass123", text: "1; 0,5; 0,25; 0,125", categoryId: "no" },
      { id: "ass124", text: "3; 1; −2; −3", categoryId: "no" },
      { id: "ass125", text: "201; 202; 204; 208", categoryId: "no" },
      { id: "ass126", text: "0; 1; 3; 6; 10", categoryId: "no" },
      { id: "ass127", text: "5; 7; 10; 14", categoryId: "no" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Melyik sorozat tagja?",
    description: "Minden szám pontosan az egyik számtani sorozatnak tagja.",
    categories: [
      { id: "a", name: "aₙ = 4n − 1", color: "purple" },
      { id: "b", name: "aₙ = 5n − 2", color: "amber" },
      { id: "c", name: "aₙ = 6n", color: "teal" }
    ],
    items: [
      { id: "ass201", text: "7", categoryId: "a" },
      { id: "ass202", text: "11", categoryId: "a" },
      { id: "ass203", text: "15", categoryId: "a" },
      { id: "ass204", text: "19", categoryId: "a" },
      { id: "ass205", text: "27", categoryId: "a" },
      { id: "ass206", text: "31", categoryId: "a" },
      { id: "ass207", text: "35", categoryId: "a" },
      { id: "ass208", text: "39", categoryId: "a" },
      { id: "ass209", text: "47", categoryId: "a" },
      { id: "ass210", text: "8", categoryId: "b" },
      { id: "ass211", text: "13", categoryId: "b" },
      { id: "ass212", text: "28", categoryId: "b" },
      { id: "ass213", text: "33", categoryId: "b" },
      { id: "ass214", text: "38", categoryId: "b" },
      { id: "ass215", text: "53", categoryId: "b" },
      { id: "ass216", text: "58", categoryId: "b" },
      { id: "ass217", text: "68", categoryId: "b" },
      { id: "ass218", text: "73", categoryId: "b" },
      { id: "ass219", text: "6", categoryId: "c" },
      { id: "ass220", text: "12", categoryId: "c" },
      { id: "ass221", text: "24", categoryId: "c" },
      { id: "ass222", text: "30", categoryId: "c" },
      { id: "ass223", text: "36", categoryId: "c" },
      { id: "ass224", text: "42", categoryId: "c" },
      { id: "ass225", text: "54", categoryId: "c" },
      { id: "ass226", text: "60", categoryId: "c" },
      { id: "ass227", text: "66", categoryId: "c" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Mennyi a differencia?",
    description: "Csoportosítsd az adatokat a differencia szerint!",
    categories: [
      { id: "p2", name: "d = 2", color: "blue" },
      { id: "p4", name: "d = 4", color: "emerald" },
      { id: "m2", name: "d = −2", color: "rose" }
    ],
    items: [
      { id: "ass301", text: "a₁₂ = 40, a₁₅ = 46", categoryId: "p2" },
      { id: "ass302", text: "a 33-nál nagyobb páros számok növekvő sorozata", categoryId: "p2" },
      { id: "ass303", text: "a₁ = 1, a₁₁ = 21", categoryId: "p2" },
      { id: "ass304", text: "a₃ = 0, a₈ = 10", categoryId: "p2" },
      { id: "ass305", text: "a₅ − a₂ = 6", categoryId: "p2" },
      { id: "ass306", text: "b₁₀ = 19, b₁ = 1", categoryId: "p2" },
      { id: "ass307", text: "a₂₀ − a₁₀ = 20", categoryId: "p2" },
      { id: "ass308", text: "a₁ + a₃ = 10 és a₂ + a₄ = 14", categoryId: "p2" },
      { id: "ass309", text: "a pozitív páratlan számok növekvő sorozata", categoryId: "p2" },
      { id: "ass310", text: "a₂₈ = 96, a₃₂ = 112", categoryId: "p4" },
      { id: "ass311", text: "b₇ − b₁ = 24", categoryId: "p4" },
      { id: "ass312", text: "a₁ = −12, a₂ = −8", categoryId: "p4" },
      { id: "ass313", text: "a₃ − a₁ = 8", categoryId: "p4" },
      { id: "ass314", text: "3; 7; 11; …", categoryId: "p4" },
      { id: "ass315", text: "a₁₀ = 40, a₁ = 4", categoryId: "p4" },
      { id: "ass316", text: "a₆ = 0, a₇ = 4", categoryId: "p4" },
      { id: "ass317", text: "a₁ = 0 és a₁ + a₂ + a₃ = 12", categoryId: "p4" },
      { id: "ass318", text: "a 4-gyel osztható pozitív egészek növekvő sorozata", categoryId: "p4" },
      { id: "ass319", text: "a₅ + a₆ = 60 és a₈ + a₉ + a₁₀ = 69", categoryId: "m2" },
      { id: "ass320", text: "a₁ = 39, a₂ = 37", categoryId: "m2" },
      { id: "ass321", text: "a₁₀ = 0, a₁₁ = −2", categoryId: "m2" },
      { id: "ass322", text: "a₄ − a₁ = −6", categoryId: "m2" },
      { id: "ass323", text: "20; 18; 16; …", categoryId: "m2" },
      { id: "ass324", text: "a₃ = 5, a₈ = −5", categoryId: "m2" },
      { id: "ass325", text: "a₁ = 1, a₆ = −9", categoryId: "m2" },
      { id: "ass326", text: "a₇ − a₂ = −10", categoryId: "m2" },
      { id: "ass327", text: "a 100-nál kisebb páros számok csökkenő sorozata", categoryId: "m2" }
    ]
  }
};

export const ArithmeticSequenceSorter: React.FC<ArithmeticSequenceSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-seq-szamtani-sorter',
  topicTitle = "3. Számtani sorozatok – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="szamtani-sorozatok"
      title={topicTitle}
      subtitle="Ismerd fel a számtani sorozatokat, a tagokat és a differenciát!"
      levels={ARITHMETIC_SEQUENCE_SORTER_LEVELS}
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

export default ArithmeticSequenceSorter;
