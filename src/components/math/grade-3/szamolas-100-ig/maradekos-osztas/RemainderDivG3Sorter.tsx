import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RowsCard, BagsCard } from './RemainderDivG3CardFigures';

interface RemainderDivG3SorterProps {
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

const REMAINDER_DIV_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Osztás 3-mal',
    description: 'Mennyi marad, ha 3-mal osztasz? A képen egy keretben 3 korong van.',
    categories: [
      { id: 'm0', name: 'marad 0', color: 'sky' },
      { id: 'm1', name: 'marad 1', color: 'emerald' },
      { id: 'm2', name: 'marad 2', color: 'rose' }
    ],
    items: [
      { id: 'rdivs1', text: '12 : 3', categoryId: 'm0', figure: <RowsCard groups={4} per={3} loose={0} /> },
      { id: 'rdivs2', text: '18 : 3', categoryId: 'm0' },
      { id: 'rdivs3', text: '27 : 3', categoryId: 'm0' },
      { id: 'rdivs4', text: '13 : 3', categoryId: 'm1', figure: <RowsCard groups={4} per={3} loose={1} /> },
      { id: 'rdivs5', text: '22 : 3', categoryId: 'm1' },
      { id: 'rdivs6', text: '28 : 3', categoryId: 'm1' },
      { id: 'rdivs7', text: '14 : 3', categoryId: 'm2', figure: <RowsCard groups={4} per={3} loose={2} /> },
      { id: 'rdivs8', text: '20 : 3', categoryId: 'm2', figure: <RowsCard groups={6} per={3} loose={2} /> },
      { id: 'rdivs9', text: '26 : 3', categoryId: 'm2' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Vegyes osztók',
    description: 'Végezd el az osztást! Mennyi a maradék?',
    categories: [
      { id: 'r1', name: 'marad 1', color: 'amber' },
      { id: 'r2', name: 'marad 2', color: 'purple' },
      { id: 'r3', name: 'marad 3', color: 'teal' }
    ],
    items: [
      { id: 'rdivs10', text: '21 : 4', categoryId: 'r1', figure: <RowsCard groups={5} per={4} loose={1} /> },
      { id: 'rdivs11', text: '36 : 5', categoryId: 'r1' },
      { id: 'rdivs12', text: '50 : 7', categoryId: 'r1' },
      { id: 'rdivs13', text: '38 : 4', categoryId: 'r2' },
      { id: 'rdivs14', text: '44 : 6', categoryId: 'r2' },
      { id: 'rdivs15', text: '26 : 6', categoryId: 'r2', figure: <RowsCard groups={4} per={6} loose={2} /> },
      { id: 'rdivs16', text: '23 : 5', categoryId: 'r3', figure: <RowsCard groups={4} per={5} loose={3} /> },
      { id: 'rdivs17', text: '59 : 8', categoryId: 'r3' },
      { id: 'rdivs18', text: '17 : 7', categoryId: 'r3', figure: <RowsCard groups={2} per={7} loose={3} /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Jó vagy hibás?',
    description: 'Ellenőrizd! Mi a baj a megoldással? A zacskós kép a megoldást mutatja.',
    categories: [
      { id: 'jo', name: 'Jó', color: 'emerald' },
      { id: 'nagym', name: 'Túl nagy a maradék', color: 'rose' },
      { id: 'nagyh', name: 'Túl nagy a hányados', color: 'sky' }
    ],
    items: [
      { id: 'rdivs19', text: '20 : 6 = 3 marad 2', categoryId: 'jo', figure: <BagsCard bags={3} loose={2} small /> },
      { id: 'rdivs20', text: '35 : 8 = 4 marad 3', categoryId: 'jo' },
      { id: 'rdivs21', text: '41 : 9 = 4 marad 5', categoryId: 'jo' },
      { id: 'rdivs22', text: '20 : 6 = 2 marad 8', categoryId: 'nagym', figure: <BagsCard bags={2} loose={8} small /> },
      { id: 'rdivs23', text: '35 : 8 = 3 marad 11', categoryId: 'nagym', figure: <BagsCard bags={3} loose={11} small /> },
      { id: 'rdivs24', text: '30 : 7 = 3 marad 9', categoryId: 'nagym' },
      { id: 'rdivs25', text: '20 : 6 = 4 marad 2', categoryId: 'nagyh', figure: <BagsCard bags={4} loose={2} small /> },
      { id: 'rdivs26', text: '35 : 8 = 5 marad 1', categoryId: 'nagyh' },
      { id: 'rdivs27', text: '30 : 7 = 5 marad 2', categoryId: 'nagyh' }
    ]
  }
];

export const REMAINDER_DIV_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: REMAINDER_DIV_G3_SORTER_LEVELS_LIST[0],
  2: REMAINDER_DIV_G3_SORTER_LEVELS_LIST[1],
  3: REMAINDER_DIV_G3_SORTER_LEVELS_LIST[2]
};

export const RemainderDivG3Sorter: React.FC<RemainderDivG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c100-maradekos-sorter',
  topicTitle = '4. Maradékos osztás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="maradekos-osztas"
      title={topicTitle}
      subtitle="Válogasd szét az osztásokat a maradékuk szerint!"
      levels={REMAINDER_DIV_G3_SORTER_LEVELS}
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

export default RemainderDivG3Sorter;
