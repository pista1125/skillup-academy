import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BlocksCard, AbacusCard, DigitCard } from './Numbers500G3CardFigures';

interface Numbers500G3MatcherProps {
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

const NUMBERS_500_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kirakás és betűk',
    description: 'Melyik szám van kirakva? Melyik szám van betűvel írva?',
    pairs: [
      { id: 'n500m1_0', left: '', promptFigure: <BlocksCard h={2} t={3} e={1} />, right: '231' },
      { id: 'n500m1_1', left: '', promptFigure: <BlocksCard h={4} t={1} e={5} />, right: '415' },
      { id: 'n500m1_2', left: '', promptFigure: <BlocksCard h={3} t={0} e={6} />, right: '306' },
      { id: 'n500m1_3', left: '', promptFigure: <BlocksCard h={1} t={5} e={0} />, right: '150' },
      { id: 'n500m1_4', left: 'négyszázhúsz', right: '420' },
      { id: 'n500m1_5', left: 'háromszázkilenc', right: '309' },
      { id: 'n500m1_6', left: 'kétszázhetvenöt', right: '275' },
      { id: 'n500m1_7', left: 'ötszáz', right: '500' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Golyós számoló és bontás',
    description: 'Piros = 100, kék = 10, sárga = 1. Melyik szám ez?',
    pairs: [
      { id: 'n500m2_0', left: '', promptFigure: <AbacusCard sz={4} t={3} e={8} />, right: '438' },
      { id: 'n500m2_1', left: '', promptFigure: <AbacusCard sz={2} t={0} e={5} />, right: '205' },
      { id: 'n500m2_2', left: '', promptFigure: <AbacusCard sz={3} t={6} e={0} />, right: '360' },
      { id: 'n500m2_3', left: '', promptFigure: <AbacusCard sz={1} t={2} e={9} />, right: '129' },
      { id: 'n500m2_4', left: '3 sz + 8 t + 2 e', right: '382' },
      { id: 'n500m2_5', left: '4 sz + 6 e', right: '406' },
      { id: 'n500m2_6', left: '2 sz + 9 t', right: '290' },
      { id: 'n500m2_7', left: '400 + 70 + 1', right: '471' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Beváltás és valódi érték',
    description: 'Váltsd be a tízeseket! Mennyit ér a bekeretezett jegy?',
    pairs: [
      { id: 'n500m3_0', left: '', promptFigure: <DigitCard num="473" idx={0} />, right: '400' },
      { id: 'n500m3_1', left: '', promptFigure: <DigitCard num="258" idx={1} />, right: '50' },
      { id: 'n500m3_2', left: '', promptFigure: <DigitCard num="316" idx={2} />, right: '6' },
      { id: 'n500m3_3', left: '', promptFigure: <DigitCard num="192" idx={1} />, right: '90' },
      { id: 'n500m3_4', left: '2 sz + 14 t + 3 e', right: '343' },
      { id: 'n500m3_5', left: '35 t + 2 e', right: '352' },
      { id: 'n500m3_6', left: '1 sz + 12 t + 15 e', right: '235' },
      { id: 'n500m3_7', left: '3 sz + 9 t + 11 e', right: '401' }
    ]
  }
];

export const NUMBERS_500_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NUMBERS_500_G3_MATCHER_LEVELS_LIST[0],
  2: NUMBERS_500_G3_MATCHER_LEVELS_LIST[1],
  3: NUMBERS_500_G3_MATCHER_LEVELS_LIST[2]
};

export const Numbers500G3Matcher: React.FC<Numbers500G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c500-szamok-matcher',
  topicTitle = '1. Számok 500-ig – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-500-ig"
      topicId={topicId}
      subtopicId="szamok-500-ig"
      title={topicTitle}
      subtitle="Párosítsd a kirakásokat, a betűvel írt számokat és a bontásokat a számokkal!"
      levels={NUMBERS_500_G3_MATCHER_LEVELS}
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

export default Numbers500G3Matcher;
