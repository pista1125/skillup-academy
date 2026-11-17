import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniSticksCard } from '../romai-szamok-a-mindennapokban/RomanEverydayG3CardFigures';
import { MiniRodsCard } from './RomanExamG3CardFigures';

interface RomanExamG3SorterProps {
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

const LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Mekkora?",
    description: "Hová tartozik a szám? A rudak segítenek.",
    categories: [
      { id: 'k1', name: "10-nél kisebb", color: 'sky' },
      { id: 'k2', name: "10 és 50 között", color: 'emerald' },
      { id: 'k3', name: "50-nél nagyobb", color: 'rose' }
    ],
    items: [
      { id: 'rexs1', text: "VII", categoryId: 'k1', figure: <MiniRodsCard n={7} small /> },
      { id: 'rexs2', text: "IV", categoryId: 'k1' },
      { id: 'rexs3', text: "IX", categoryId: 'k1' },
      { id: 'rexs4', text: "XXIII", categoryId: 'k2', figure: <MiniRodsCard n={23} small /> },
      { id: 'rexs5', text: "XLIV", categoryId: 'k2', figure: <MiniRodsCard n={44} small /> },
      { id: 'rexs6', text: "XVI", categoryId: 'k2' },
      { id: 'rexs7', text: "LII", categoryId: 'k3', figure: <MiniRodsCard n={52} small /> },
      { id: 'rexs8', text: "LXXX", categoryId: 'k3', figure: <MiniRodsCard n={80} small /> },
      { id: 'rexs9', text: "XCI", categoryId: 'k3' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Szabályos vagy hibás?",
    description: "Nézd meg jól a jeleket!",
    categories: [
      { id: 'ok', name: "Szabályos", color: 'emerald' },
      { id: 'four', name: "Hibás: 4 egyforma jel", color: 'amber' },
      { id: 'sub', name: "Hibás: rossz kivonás", color: 'rose' }
    ],
    items: [
      { id: 'rexs10', text: "XLIV", categoryId: 'ok', figure: <MiniSticksCard text="XLIV" /> },
      { id: 'rexs11', text: "XCIX", categoryId: 'ok' },
      { id: 'rexs12', text: "LXXVIII", categoryId: 'ok' },
      { id: 'rexs13', text: "IIII", categoryId: 'four', figure: <MiniSticksCard text="IIII" /> },
      { id: 'rexs14', text: "XXXX", categoryId: 'four', figure: <MiniSticksCard text="XXXX" /> },
      { id: 'rexs15', text: "VIIII", categoryId: 'four' },
      { id: 'rexs16', text: "IC", categoryId: 'sub' },
      { id: 'rexs17', text: "VX", categoryId: 'sub', figure: <MiniSticksCard text="VX" /> },
      { id: 'rexs18', text: "IL", categoryId: 'sub', figure: <MiniSticksCard text="IL" /> }
    ]
  },
  {
    level: 3,
    title: "3. szint: Melyik tízesek között?",
    description: "Melyik két kerek tízes közé esik a szám?",
    categories: [
      { id: 't2', name: "XX és XXX között", color: 'sky' },
      { id: 't4', name: "XL és L között", color: 'purple' },
      { id: 't6', name: "LX és LXX között", color: 'teal' }
    ],
    items: [
      { id: 'rexs19', text: "XXIV", categoryId: 't2', figure: <MiniRodsCard n={24} small /> },
      { id: 'rexs20', text: "XXVIII", categoryId: 't2' },
      { id: 'rexs21', text: "XXI", categoryId: 't2', figure: <MiniRodsCard n={21} small /> },
      { id: 'rexs22', text: "XLI", categoryId: 't4' },
      { id: 'rexs23', text: "XLVII", categoryId: 't4', figure: <MiniRodsCard n={47} small /> },
      { id: 'rexs24', text: "XLIII", categoryId: 't4' },
      { id: 'rexs25', text: "LXII", categoryId: 't6', figure: <MiniRodsCard n={62} small /> },
      { id: 'rexs26', text: "LXIX", categoryId: 't6' },
      { id: 'rexs27', text: "LXV", categoryId: 't6', figure: <MiniRodsCard n={65} small /> }
    ]
  }
];

export const ROMAN_EXAM_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const RomanExamG3Sorter: React.FC<RomanExamG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-rom-tudasproba-sorter',
  topicTitle = "4. Gyakorlás, tudáspróba – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="romai-szamok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Válogasd szét a római számokat nagyság és szabályosság szerint!"
      levels={ROMAN_EXAM_G3_SORTER_LEVELS}
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

export default RomanExamG3Sorter;
