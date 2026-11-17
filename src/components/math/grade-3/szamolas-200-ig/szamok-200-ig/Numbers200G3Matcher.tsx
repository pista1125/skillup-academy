import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BlocksCard, AbacusCard, DigitCard } from './Numbers200G3CardFigures';

interface Numbers200G3MatcherProps {
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

const NUMBERS_200_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kirakva, betűvel, számmal',
    description: 'Melyik szám van a képen? Melyik szám van leírva betűvel?',
    pairs: [
      { id: 'n200m1', left: '', promptFigure: <BlocksCard h={1} t={2} e={4} />, right: '124' },
      { id: 'n200m2', left: 'százkilencvenkilenc', right: '199' },
      { id: 'n200m3', left: '', promptFigure: <BlocksCard h={1} t={0} e={7} />, right: '107' },
      { id: 'n200m4', left: '', promptFigure: <BlocksCard h={1} t={7} e={0} />, right: '170' },
      { id: 'n200m5', left: '', promptFigure: <BlocksCard h={2} t={0} e={0} />, right: '200' },
      { id: 'n200m6', left: 'százötvenöt', right: '155' },
      { id: 'n200m7', left: 'száztizenegy', right: '111' },
      { id: 'n200m8', left: 'százharmincnyolc', right: '138' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Golyós számoló és bontás',
    description: 'Piros = 100, kék = 10, sárga = 1. Figyelj a 0-ra!',
    pairs: [
      { id: 'n200m9', left: '', promptFigure: <AbacusCard sz={1} t={4} e={5} />, right: '145' },
      { id: 'n200m10', left: '', promptFigure: <AbacusCard sz={1} t={5} e={4} />, right: '154' },
      { id: 'n200m11', left: '', promptFigure: <AbacusCard sz={1} t={0} e={6} />, right: '106' },
      { id: 'n200m12', left: '', promptFigure: <AbacusCard sz={1} t={6} e={0} />, right: '160' },
      { id: 'n200m13', left: '100 + 80 + 3', right: '183' },
      { id: 'n200m14', left: '100 + 30 + 8', right: '138' },
      { id: 'n200m15', left: '2 sz + 0 t + 0 e', right: '200' },
      { id: 'n200m16', left: '100 + 10 + 1', right: '111' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyit ér a jegy?',
    description: 'Mennyi a számjegy valódi értéke? Nézd meg, hol áll!',
    pairs: [
      { id: 'n200m17', left: 'Mennyit ér?', promptFigure: <DigitCard num="175" idx={1} />, right: '70' },
      { id: 'n200m18', left: 'Mennyit ér?', promptFigure: <DigitCard num="157" idx={2} />, right: '7' },
      { id: 'n200m19', left: 'Mennyit ér?', promptFigure: <DigitCard num="152" idx={0} />, right: '100' },
      { id: 'n200m20', left: 'Mennyit ér?', promptFigure: <DigitCard num="152" idx={1} />, right: '50' },
      { id: 'n200m21', left: 'a 9-es a 190-ben', right: '90' },
      { id: 'n200m22', left: 'a 2-es a 200-ban', right: '200' },
      { id: 'n200m23', left: 'a 3-as a 113-ban', right: '3' },
      { id: 'n200m24', left: 'a 3-as a 131-ben', right: '30' }
    ]
  }
];

export const NUMBERS_200_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NUMBERS_200_G3_MATCHER_LEVELS_LIST[0],
  2: NUMBERS_200_G3_MATCHER_LEVELS_LIST[1],
  3: NUMBERS_200_G3_MATCHER_LEVELS_LIST[2]
};

export const Numbers200G3Matcher: React.FC<Numbers200G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c200-szamok-matcher',
  topicTitle = '1. Számok 200-ig – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-200-ig"
      topicId={topicId}
      subtopicId="szamok-200-ig"
      title={topicTitle}
      subtitle="Párosítsd a számokat a betűvel írt alakjukkal, a bontásukkal és a jegyek értékével!"
      levels={NUMBERS_200_G3_MATCHER_LEVELS}
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

export default Numbers200G3Matcher;
