import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniBlocks, MiniLine, MiniMoney, BoxedNum } from './Numbers1000G3CardFigures';

interface Numbers1000G3MatcherProps {
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

const LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kirakás és betűk',
    description: 'Melyik szám van kirakva? Melyik szám van betűvel írva?',
    pairs: [
      { id: 'n1000m1_0', left: '', promptFigure: <MiniBlocks h={6} t={2} e={4} />, right: '624' },
      { id: 'n1000m1_1', left: '', promptFigure: <MiniBlocks h={8} t={0} e={7} />, right: '807' },
      { id: 'n1000m1_2', left: '', promptFigure: <MiniBlocks h={7} t={5} e={0} />, right: '750' },
      { id: 'n1000m1_3', left: '', promptFigure: <MiniBlocks h={9} t={3} e={1} />, right: '931' },
      { id: 'n1000m1_4', left: 'hatszázkilencvennyolc', right: '698' },
      { id: 'n1000m1_5', left: 'ezer', right: '1000' },
      { id: 'n1000m1_6', left: 'nyolcszázhúsz', right: '820' },
      { id: 'n1000m1_7', left: 'hétszázöt', right: '705' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számegyenes, pénz, bontás',
    description: 'Hol a pont? Mennyi a pénz? Melyik szám ez?',
    pairs: [
      { id: 'n1000m2_0', left: '', promptFigure: <MiniLine lo={0} hi={1000} v={300} />, right: '300' },
      { id: 'n1000m2_1', left: '', promptFigure: <MiniLine lo={600} hi={700} v={640} />, right: '640' },
      { id: 'n1000m2_2', left: '', promptFigure: <MiniLine lo={900} hi={1000} v={970} />, right: '970' },
      { id: 'n1000m2_3', left: '', promptFigure: <MiniMoney notes={[500]} coins={[200, 200]} />, right: '900 Ft' },
      { id: 'n1000m2_4', left: '', promptFigure: <MiniMoney notes={[500]} coins={[100, 50, 20]} />, right: '670 Ft' },
      { id: 'n1000m2_5', left: '7 sz + 4 t + 9 e', right: '749' },
      { id: 'n1000m2_6', left: '900 + 60 + 2', right: '962' },
      { id: 'n1000m2_7', left: '8 sz + 3 e', right: '803' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Valódi érték és beváltás',
    description: 'Mennyit ér a bekeretezett jegy? Váltsd be a tízeseket!',
    pairs: [
      { id: 'n1000m3_0', left: '', promptFigure: <BoxedNum num="736" idx={0} />, right: '700' },
      { id: 'n1000m3_1', left: '', promptFigure: <BoxedNum num="583" idx={1} />, right: '80' },
      { id: 'n1000m3_2', left: '', promptFigure: <BoxedNum num="1000" idx={0} />, right: '1000' },
      { id: 'n1000m3_3', left: '', promptFigure: <BoxedNum num="409" idx={2} />, right: '9' },
      { id: 'n1000m3_4', left: '6 sz + 15 t + 2 e', right: '752' },
      { id: 'n1000m3_5', left: '450 e + 15 t', right: '600' },
      { id: 'n1000m3_6', left: '8 sz + 12 t + 10 e', right: '930' },
      { id: 'n1000m3_7', left: '72 t + 6 e', right: '726' }
    ]
  }
];

export const NUMBERS_1000_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const Numbers1000G3Matcher: React.FC<Numbers1000G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c1000-szamok-matcher',
  topicTitle = '1. Számok 1000-ig – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-1000-ig"
      topicId={topicId}
      subtopicId="szamok-1000-ig"
      title={topicTitle}
      subtitle="Párosítsd a kirakásokat, a pénzt, a számegyenest és a bontásokat a számokkal!"
      levels={NUMBERS_1000_G3_MATCHER_LEVELS}
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

export default Numbers1000G3Matcher;
