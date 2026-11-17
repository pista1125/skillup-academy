import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniSticksCard, MiniCalCard } from './RomanEverydayG3CardFigures';

interface RomanEverydayG3SorterProps {
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
    title: "1. szint: Mekkora a szám?",
    description: "Hová tartozik a római szám?",
    categories: [
      { id: 'c1', name: "1-től 9-ig", color: 'sky' },
      { id: 'c2', name: "10-től 19-ig", color: 'emerald' },
      { id: 'c3', name: "20-tól 39-ig", color: 'rose' }
    ],
    items: [
      { id: 'rmes1', text: "IV", categoryId: 'c1', figure: <MiniSticksCard text="IV" /> },
      { id: 'rmes2', text: "VIII", categoryId: 'c1', figure: <MiniSticksCard text="VIII" /> },
      { id: 'rmes3', text: "IX", categoryId: 'c1' },
      { id: 'rmes4', text: "XI", categoryId: 'c2', figure: <MiniSticksCard text="XI" /> },
      { id: 'rmes5', text: "XIV", categoryId: 'c2' },
      { id: 'rmes6', text: "XIX", categoryId: 'c2', figure: <MiniSticksCard text="XIX" /> },
      { id: 'rmes7', text: "XX", categoryId: 'c3', figure: <MiniSticksCard text="XX" /> },
      { id: 'rmes8', text: "XXIX", categoryId: 'c3' },
      { id: 'rmes9', text: "XXXIV", categoryId: 'c3' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Melyik évszak?",
    description: "Melyik évszakban van ez a nap? (A naptárlapon a hónap áll.)",
    categories: [
      { id: 'tav', name: "tavasz", color: 'emerald' },
      { id: 'nyar', name: "nyár", color: 'amber' },
      { id: 'osz', name: "ősz", color: 'orange' }
    ],
    items: [
      { id: 'rmes10', text: "25.", categoryId: 'tav', figure: <MiniCalCard text="III." small /> },
      { id: 'rmes11', text: "22.", categoryId: 'tav', figure: <MiniCalCard text="IV." small /> },
      { id: 'rmes12', text: "V. 5.", categoryId: 'tav' },
      { id: 'rmes13', text: "25.", categoryId: 'nyar', figure: <MiniCalCard text="VI." small /> },
      { id: 'rmes14', text: "1.", categoryId: 'nyar', figure: <MiniCalCard text="VII." small /> },
      { id: 'rmes15', text: "VIII. 20.", categoryId: 'nyar' },
      { id: 'rmes16', text: "30.", categoryId: 'osz', figure: <MiniCalCard text="IX." small /> },
      { id: 'rmes17', text: "6.", categoryId: 'osz', figure: <MiniCalCard text="X." small /> },
      { id: 'rmes18', text: "XI. 11.", categoryId: 'osz' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Hány pálcika kell?",
    description: "Számold meg a pálcikákat! (I = 1, V = 2, X = 2)",
    categories: [
      { id: 'p3', name: "3 pálcika", color: 'sky' },
      { id: 'p4', name: "4 pálcika", color: 'purple' },
      { id: 'p5', name: "5 pálcika", color: 'teal' }
    ],
    items: [
      { id: 'rmes19', text: "III", categoryId: 'p3', figure: <MiniSticksCard text="III" /> },
      { id: 'rmes20', text: "IV", categoryId: 'p3', figure: <MiniSticksCard text="IV" /> },
      { id: 'rmes21', text: "XI", categoryId: 'p3' },
      { id: 'rmes22', text: "VII", categoryId: 'p4', figure: <MiniSticksCard text="VII" /> },
      { id: 'rmes23', text: "XV", categoryId: 'p4', figure: <MiniSticksCard text="XV" /> },
      { id: 'rmes24', text: "XX", categoryId: 'p4' },
      { id: 'rmes25', text: "VIII", categoryId: 'p5', figure: <MiniSticksCard text="VIII" /> },
      { id: 'rmes26', text: "XIV", categoryId: 'p5', figure: <MiniSticksCard text="XIV" /> },
      { id: 'rmes27', text: "XXI", categoryId: 'p5' }
    ]
  }
];

export const ROMAN_EVERYDAY_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const RomanEverydayG3Sorter: React.FC<RomanEverydayG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-rom-mindennapok-sorter',
  topicTitle = "3. Római számok a mindennapokban és fejtörők – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="romai-szamok"
      topicId={topicId}
      subtopicId="romai-szamok-a-mindennapokban"
      title={topicTitle}
      subtitle="Válogasd szét a római számokat, dátumokat és pálcikás számokat!"
      levels={ROMAN_EVERYDAY_G3_SORTER_LEVELS}
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

export default RomanEverydayG3Sorter;
