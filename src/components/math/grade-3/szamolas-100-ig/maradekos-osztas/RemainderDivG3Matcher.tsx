import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { PacksRowCard, BagsCard } from './RemainderDivG3CardFigures';

interface RemainderDivG3MatcherProps {
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

const REMAINDER_DIV_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kis számok',
    description: 'Párosítsd az osztást vagy a képet az eredményével! A képen: hány tele keret van, és hány korong maradt ki?',
    pairs: [
      { id: 'rdivm1', left: '13 : 2', right: '6 marad 1' },
      { id: 'rdivm2', left: '', right: '3 marad 2', promptFigure: <PacksRowCard groups={3} size={3} loose={2} /> },
      { id: 'rdivm3', left: '', right: '2 marad 1', promptFigure: <PacksRowCard groups={2} size={4} loose={1} /> },
      { id: 'rdivm4', left: '19 : 5', right: '3 marad 4' },
      { id: 'rdivm5', left: '', right: '3 marad 3', promptFigure: <PacksRowCard groups={3} size={4} loose={3} /> },
      { id: 'rdivm6', left: '7 : 2', right: '3 marad 1' },
      { id: 'rdivm7', left: '22 : 5', right: '4 marad 2' },
      { id: 'rdivm8', left: '', right: '5 marad 1', promptFigure: <PacksRowCard groups={5} size={3} loose={1} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Nagyobb számok',
    description: 'Párosítsd az osztást az eredményével! A zacskós kép: hány tele zacskó lett, és hány korong maradt?',
    pairs: [
      { id: 'rdivm9', left: '47 : 6', right: '', valueFigure: <BagsCard bags={7} loose={5} /> },
      { id: 'rdivm10', left: '38 : 9', right: '', valueFigure: <BagsCard bags={4} loose={2} /> },
      { id: 'rdivm11', left: '50 : 8', right: '', valueFigure: <BagsCard bags={6} loose={2} /> },
      { id: 'rdivm12', left: '29 : 4', right: '', valueFigure: <BagsCard bags={7} loose={1} /> },
      { id: 'rdivm13', left: '60 : 7', right: '8 marad 4' },
      { id: 'rdivm14', left: '43 : 5', right: '8 marad 3' },
      { id: 'rdivm15', left: '71 : 8', right: '8 marad 7' },
      { id: 'rdivm16', left: '55 : 6', right: '9 marad 1' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Visszafelé',
    description: 'Melyik szám van a □ helyén? A zacskós képen: hány korong volt összesen?',
    pairs: [
      { id: 'rdivm17', left: '5 egy zacskóban', right: '38', promptFigure: <BagsCard bags={7} loose={3} /> },
      { id: 'rdivm18', left: '6 egy zacskóban', right: '29', promptFigure: <BagsCard bags={4} loose={5} /> },
      { id: 'rdivm19', left: '□ : 9 = 8 marad 1', right: '73' },
      { id: 'rdivm20', left: '□ : 3 = 9 marad 1', right: '28' },
      { id: 'rdivm21', left: '7 egy zacskóban', right: '46', promptFigure: <BagsCard bags={6} loose={4} /> },
      { id: 'rdivm22', left: '8 egy zacskóban', right: '47', promptFigure: <BagsCard bags={5} loose={7} /> },
      { id: 'rdivm23', left: '□ : 4 = 9 marad 3', right: '39' },
      { id: 'rdivm24', left: '□ : 2 = 8 marad 1', right: '17' }
    ]
  }
];

export const REMAINDER_DIV_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: REMAINDER_DIV_G3_MATCHER_LEVELS_LIST[0],
  2: REMAINDER_DIV_G3_MATCHER_LEVELS_LIST[1],
  3: REMAINDER_DIV_G3_MATCHER_LEVELS_LIST[2]
};

export const RemainderDivG3Matcher: React.FC<RemainderDivG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c100-maradekos-matcher',
  topicTitle = '4. Maradékos osztás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="maradekos-osztas"
      title={topicTitle}
      subtitle="Párosítsd a maradékos osztásokat az eredményükkel!"
      levels={REMAINDER_DIV_G3_MATCHER_LEVELS}
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

export default RemainderDivG3Matcher;
