import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CardBlocks, CardRoundLine, CardCoins } from './Count200ExamG3CardFigures';

interface Count200ExamG3MatcherProps {
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

export const COUNT200_EXAM_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Számok 200-ig',
    description: 'Piros = 100, kék = 10, sárga = 1. Párosítsd a képet vagy a szöveget a számmal!',
    pairs: [
      { id: 'c200em1', prompt: '', promptFigure: <CardBlocks h={1} t={2} e={5} />, value: '125' },
      { id: 'c200em2', prompt: '', promptFigure: <CardBlocks h={1} t={5} e={2} />, value: '152' },
      { id: 'c200em3', prompt: '', promptFigure: <CardBlocks h={1} t={0} e={7} />, value: '107' },
      { id: 'c200em4', prompt: '', promptFigure: <CardBlocks h={1} t={7} e={0} />, value: '170' },
      { id: 'c200em5', prompt: 'száznegyvenhárom', value: '143' },
      { id: 'c200em6', prompt: 'kétszáz', value: '200' },
      { id: 'c200em7', prompt: '1 sz + 9 t + 1 e', value: '191' },
      { id: 'c200em8', prompt: '16 tízes', value: '160' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Kerekítés tízesre',
    description: 'Melyik kerek tízeshez van közelebb? Párosítsd a számot a kerekített értékével!',
    pairs: [
      { id: 'c200em9', prompt: '≈ ?', promptFigure: <CardRoundLine n={147} />, value: '150' },
      { id: 'c200em10', prompt: '≈ ?', promptFigure: <CardRoundLine n={162} />, value: '160' },
      { id: 'c200em11', prompt: '≈ ?', promptFigure: <CardRoundLine n={185} />, value: '190' },
      { id: 'c200em12', prompt: '≈ ?', promptFigure: <CardRoundLine n={113} />, value: '110' },
      { id: 'c200em13', prompt: '199 ≈ ?', value: '200' },
      { id: 'c200em14', prompt: '104 ≈ ?', value: '100' },
      { id: 'c200em15', prompt: '174 ≈ ?', value: '170' },
      { id: 'c200em16', prompt: '125 ≈ ?', value: '130' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Pénz és műveletek',
    description: 'Számold össze a pénzt, vagy végezd el a műveletet!',
    pairs: [
      { id: 'c200em17', prompt: 'Hány Ft?', promptFigure: <CardCoins values={[100, 50, 20]} />, value: '170 Ft' },
      { id: 'c200em18', prompt: 'Hány Ft?', promptFigure: <CardCoins values={[100, 20, 5]} />, value: '125 Ft' },
      { id: 'c200em19', prompt: 'Hány Ft?', promptFigure: <CardCoins values={[50, 50, 50]} />, value: '150 Ft' },
      { id: 'c200em20', prompt: 'Hány Ft?', promptFigure: <CardCoins values={[20, 20, 20]} />, value: '60 Ft' },
      { id: 'c200em21', prompt: '60 + 80', value: '140' },
      { id: 'c200em22', prompt: '200 − 90', value: '110' },
      { id: 'c200em23', prompt: '4 · 30', value: '120' },
      { id: 'c200em24', prompt: '180 : 2', value: '90' }
    ]
  }
};

export const Count200ExamG3Matcher: React.FC<Count200ExamG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c200-tudasproba-matcher',
  topicTitle = '6. Megálló – tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-200-ig"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Számok, kerekítés, pénz és műveletek 200-ig – párosítsd őket!"
      levels={COUNT200_EXAM_G3_MATCHER_LEVELS}
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

export default Count200ExamG3Matcher;
