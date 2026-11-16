import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NumberLineOppositesSorterProps {
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

const NUMBER_LINE_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hol van a számegyenesen?',
    description: 'A 0-tól balra, pont a 0-n vagy a 0-tól jobbra?',
    categories: [
      { id: 'left', name: 'A 0-tól balra (kék pont)', color: 'blue' },
      { id: 'zero', name: 'Pont a 0-n', color: 'amber' },
      { id: 'right', name: 'A 0-tól jobbra (piros pont)', color: 'rose' }
    ],
    items: [
      { id: 'nl2s1', text: '−7', categoryId: 'left' },
      { id: 'nl2s2', text: '−1', categoryId: 'left' },
      { id: 'nl2s3', text: 'a 4 ellentettje', categoryId: 'left' },
      { id: 'nl2s4', text: '0', categoryId: 'zero' },
      { id: 'nl2s5', text: 'a 0 ellentettje', categoryId: 'zero' },
      { id: 'nl2s6', text: 'a −1 nagyobb számszomszédja', categoryId: 'zero' },
      { id: 'nl2s7', text: '8', categoryId: 'right' },
      { id: 'nl2s8', text: 'a −2 ellentettje', categoryId: 'right' },
      { id: 'nl2s9', text: 'a −1-nél 2-vel nagyobb szám', categoryId: 'right' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hová érkezik a szöcske?',
    description: 'Számold végig az ugrásokat, és döntsd el, hol áll meg a szöcske!',
    categories: [
      { id: 'left', name: 'A 0-tól balra', color: 'blue' },
      { id: 'zero', name: 'Pont a 0-ra', color: 'amber' },
      { id: 'right', name: 'A 0-tól jobbra', color: 'rose' }
    ],
    items: [
      { id: 'nl2s10', text: '3-ról balra 7', categoryId: 'left' },
      { id: 'nl2s11', text: '0-ról balra 1', categoryId: 'left' },
      { id: 'nl2s12', text: '−2-ről balra 3', categoryId: 'left' },
      { id: 'nl2s13', text: '3-ról balra 3', categoryId: 'zero' },
      { id: 'nl2s14', text: '−4-ről jobbra 4', categoryId: 'zero' },
      { id: 'nl2s15', text: '6-ról balra 6', categoryId: 'zero' },
      { id: 'nl2s16', text: '3-ról jobbra 4', categoryId: 'right' },
      { id: 'nl2s17', text: '−6-ról jobbra 10', categoryId: 'right' },
      { id: 'nl2s18', text: '−1-ről jobbra 2', categoryId: 'right' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Milyen messze van a 0-tól?',
    description: 'Hány lépésre van a szám a 0-tól? Az ellentett számok ugyanolyan messze vannak!',
    categories: [
      { id: 'd5', name: '5 lépésre a 0-tól', color: 'teal' },
      { id: 'd10', name: '10 lépésre a 0-tól', color: 'purple' },
      { id: 'd20', name: '20 lépésre a 0-tól', color: 'emerald' }
    ],
    items: [
      { id: 'nl2s19', text: '5', categoryId: 'd5' },
      { id: 'nl2s20', text: '−5', categoryId: 'd5' },
      { id: 'nl2s21', text: 'a 2-nél 7-tel kisebb szám', categoryId: 'd5' },
      { id: 'nl2s22', text: '10', categoryId: 'd10' },
      { id: 'nl2s23', text: '−10', categoryId: 'd10' },
      { id: 'nl2s24', text: 'a −11 nagyobb számszomszédja', categoryId: 'd10' },
      { id: 'nl2s25', text: '20', categoryId: 'd20' },
      { id: 'nl2s26', text: '−20', categoryId: 'd20' },
      { id: 'nl2s27', text: 'a −15 kisebb tízes számszomszédja', categoryId: 'd20' }
    ]
  }
];

const NUMBER_LINE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NUMBER_LINE_SORTER_LEVELS_LIST[0],
  2: NUMBER_LINE_SORTER_LEVELS_LIST[1],
  3: NUMBER_LINE_SORTER_LEVELS_LIST[2]
};

export const NumberLineOppositesSorter: React.FC<NumberLineOppositesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-neg-szamegyenes-sorter',
  topicTitle = '2. Számegyenes és ellentettek – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="negativ-szamok"
      topicId={topicId}
      subtopicId="szamegyenes-es-ellentettek"
      title={topicTitle}
      subtitle="Csoportosítsd a számokat a számegyenesen elfoglalt helyük szerint!"
      levels={NUMBER_LINE_SORTER_LEVELS}
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

export default NumberLineOppositesSorter;
