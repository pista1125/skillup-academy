import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FractionsExamMatcherProps {
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

export const FRACTIONS_EXAM_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hányad része?',
    description: 'Párosítsd a leírást a tört nevével!',
    pairs: [
      { id: 'fem1', left: '2 egyenlő részből 1', right: 'fele (1 ketted)' },
      { id: 'fem2', left: '3 egyenlő részből 2', right: '2 harmad' },
      { id: 'fem3', left: '4 egyenlő részből 3', right: '3 negyed' },
      { id: 'fem4', left: '5 egyenlő részből 1', right: '1 ötöd' },
      { id: 'fem5', left: '6 egyenlő részből 5', right: '5 hatod' },
      { id: 'fem6', left: '8 egyenlő részből 3', right: '3 nyolcad' },
      { id: 'fem7', left: '10 egyenlő részből 7', right: '7 tized' },
      { id: 'fem8', left: '4 egyenlő részből 4', right: '1 egész' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Más néven ugyanannyi',
    description: 'Párosítsd az egyenlő mennyiségeket! Vannak egynél nagyobb törtek is.',
    pairs: [
      { id: 'fem9', left: '5 negyed', right: '1 egész és 1 negyed' },
      { id: 'fem10', left: '7 harmad', right: '2 egész és 1 harmad' },
      { id: 'fem11', left: '3 fél', right: '1 és fél' },
      { id: 'fem12', left: '1 harmad', right: '2 hatod' },
      { id: 'fem13', left: '3 negyed', right: '6 nyolcad' },
      { id: 'fem14', left: '1 ötöd', right: '2 tized' },
      { id: 'fem15', left: '10 tized', right: '1 egész' },
      { id: 'fem16', left: '8 negyed', right: '2 egész' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Számold ki!',
    description: 'Párosítsd a törtrészt az értékével!',
    pairs: [
      { id: 'fem17', left: '2400-nak a fele', right: '1200' },
      { id: 'fem18', left: '2400-nak az 1 harmada', right: '800' },
      { id: 'fem19', left: '2400-nak az 1 tizenkettede', right: '200' },
      { id: 'fem20', left: '3200-nak a 3 negyede', right: '2400' },
      { id: 'fem21', left: '6000-nek a 3 tizede', right: '1800' },
      { id: 'fem22', left: '1200-nak az 1 harmada', right: '400' },
      { id: 'fem23', left: '180 diák fele', right: '90' },
      { id: 'fem24', left: '6000-nek az 1 százada', right: '60' }
    ]
  }
];

const FRACTIONS_EXAM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: FRACTIONS_EXAM_MATCHER_LEVELS_LIST[0],
  2: FRACTIONS_EXAM_MATCHER_LEVELS_LIST[1],
  3: FRACTIONS_EXAM_MATCHER_LEVELS_LIST[2]
};

export const FractionsExamMatcher: React.FC<FractionsExamMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-frac-tudasproba-matcher',
  topicTitle = '6. Gyakorlás, tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="tortszamok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Vegyes párosítás a teljes fejezetből: törtek neve, egyenlő törtek, törtrész kiszámítása."
      levels={FRACTIONS_EXAM_MATCHER_LEVELS}
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

export default FractionsExamMatcher;
