import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CountingExamSorterProps {
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

const COUNTING_EXAM_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Kerekítés ezresre",
    description: "Melyik ezreshez kerekítjük a számot?",
    categories: [
      { id: 'e3000', name: "≈ 3000", color: 'sky' },
      { id: 'e4000', name: "≈ 4000", color: 'amber' },
      { id: 'e5000', name: "≈ 5000", color: 'purple' }
    ],
    items: [
      { id: 'cexs1', text: "2500", categoryId: 'e3000' },
      { id: 'cexs2', text: "2871", categoryId: 'e3000' },
      { id: 'cexs3', text: "3499", categoryId: 'e3000' },
      { id: 'cexs4', text: "3500", categoryId: 'e4000' },
      { id: 'cexs5', text: "4100", categoryId: 'e4000' },
      { id: 'cexs6', text: "4499", categoryId: 'e4000' },
      { id: 'cexs7', text: "4500", categoryId: 'e5000' },
      { id: 'cexs8', text: "4999", categoryId: 'e5000' },
      { id: 'cexs9', text: "5320", categoryId: 'e5000' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Figyelj a műveleti sorrendre!",
    description: "Előbb a zárójel, aztán a szorzás és osztás!",
    categories: [
      { id: 'r100', name: "= 100", color: 'emerald' },
      { id: 'r200', name: "= 200", color: 'rose' },
      { id: 'r300', name: "= 300", color: 'blue' }
    ],
    items: [
      { id: 'cexs10', text: "500 − 4 · 100", categoryId: 'r100' },
      { id: 'cexs11', text: "(370 + 130) : 5", categoryId: 'r100' },
      { id: 'cexs12', text: "1000 : 10", categoryId: 'r100' },
      { id: 'cexs13', text: "100 + 50 · 2", categoryId: 'r200' },
      { id: 'cexs14', text: "(150 − 50) · 2", categoryId: 'r200' },
      { id: 'cexs15', text: "800 : 4", categoryId: 'r200' },
      { id: 'cexs16', text: "600 − 600 : 2", categoryId: 'r300' },
      { id: 'cexs17', text: "3 · 120 − 60", categoryId: 'r300' },
      { id: 'cexs18', text: "1200 : 4", categoryId: 'r300' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Római számok",
    description: "Mekkora a római szám?",
    categories: [
      { id: 'kicsi', name: "10-nél kisebb", color: 'teal' },
      { id: 'kozep', name: "10 és 20 között", color: 'orange' },
      { id: 'nagy', name: "20-nál nagyobb", color: 'purple' }
    ],
    items: [
      { id: 'cexs19', text: "IV", categoryId: 'kicsi' },
      { id: 'cexs20', text: "VIII", categoryId: 'kicsi' },
      { id: 'cexs21', text: "IX", categoryId: 'kicsi' },
      { id: 'cexs22', text: "XI", categoryId: 'kozep' },
      { id: 'cexs23', text: "XIV", categoryId: 'kozep' },
      { id: 'cexs24', text: "XIX", categoryId: 'kozep' },
      { id: 'cexs25', text: "XXI", categoryId: 'nagy' },
      { id: 'cexs26', text: "XXIX", categoryId: 'nagy' },
      { id: 'cexs27', text: "XXXVI", categoryId: 'nagy' }
    ]
  }
];

const COUNTING_EXAM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: COUNTING_EXAM_SORTER_LEVELS_LIST[0],
  2: COUNTING_EXAM_SORTER_LEVELS_LIST[1],
  3: COUNTING_EXAM_SORTER_LEVELS_LIST[2]
};

export const CountingExamSorter: React.FC<CountingExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-count-tudasproba-sorter',
  topicTitle = "13. Megálló, Kitekintő – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="megallo-kitekinto-osszefoglalas"
      title={topicTitle}
      subtitle="Az egész I. fejezet: válogasd szét a számokat és műveleteket!"
      levels={COUNTING_EXAM_SORTER_LEVELS}
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

export default CountingExamSorter;
