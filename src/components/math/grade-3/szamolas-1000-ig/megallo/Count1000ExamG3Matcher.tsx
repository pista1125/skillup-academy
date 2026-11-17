import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniBlocks1000, MiniRoundLine, MiniJump, MiniRodGroups, MiniFlatGroups, MiniShare, MiniCoins } from './Count1000ExamG3CardFigures';


interface Count1000ExamG3MatcherProps {
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

const COUNT1000_EXAM_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Számok 1000-ig',
    description: 'Lap = 100, rúd = 10, kocka = 1. Melyik szám ez?',
    pairs: [
      { id: 'c1000m1_0', left: '', promptFigure: <MiniBlocks1000 sz={4} t={7} e={2} />, right: '472' },
      { id: 'c1000m1_1', left: '', promptFigure: <MiniBlocks1000 sz={8} t={0} e={5} />, right: '805' },
      { id: 'c1000m1_2', left: '', promptFigure: <MiniBlocks1000 sz={3} t={5} e={0} />, right: '350' },
      { id: 'c1000m1_3', left: '', promptFigure: <MiniBlocks1000 sz={9} t={1} e={9} />, right: '919' },
      { id: 'c1000m1_4', left: 'hétszázhúsz', right: '720' },
      { id: 'c1000m1_5', left: 'a 699 nagyobb egyes szomszédja', right: '700' },
      { id: 'c1000m1_6', left: '6 százas és 4 egyes', right: '604' },
      { id: 'c1000m1_7', left: 'ezer', right: '1000' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kerekítés, összeadás, kivonás',
    description: 'Kerekíts, ugorj, számolj! Párosíts!',
    pairs: [
      { id: 'c1000m2_0', left: '', promptFigure: <MiniRoundLine v={564} lo={560} hi={570} />, right: '560' },
      { id: 'c1000m2_1', left: '', promptFigure: <MiniRoundLine v={850} lo={800} hi={900} />, right: '900' },
      { id: 'c1000m2_2', left: '', promptFigure: <MiniJump from={470} by={60} />, right: '530' },
      { id: 'c1000m2_3', left: '', promptFigure: <MiniJump from={920} by={-150} />, right: '770' },
      { id: 'c1000m2_4', left: '380 + 450', right: '830' },
      { id: 'c1000m2_5', left: '1000 − 640', right: '360' },
      { id: 'c1000m2_6', left: '760 − 80', right: '680' },
      { id: 'c1000m2_7', left: '290 + 310', right: '600' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Szorzás, osztás, pénz',
    description: 'Számold ki! Párosítsd a képet és a műveletet az eredménnyel!',
    pairs: [
      { id: 'c1000m3_0', left: '', promptFigure: <MiniRodGroups groups={5} per={8} />, right: '400' },
      { id: 'c1000m3_1', left: '', promptFigure: <MiniFlatGroups groups={2} per={3} />, right: '600' },
      { id: 'c1000m3_2', left: '', promptFigure: <MiniShare total={800} k={4} />, right: '200' },
      { id: 'c1000m3_3', left: '', promptFigure: <MiniCoins coins={[200, 200, 200, 100, 50]} />, right: '750 Ft' },
      { id: 'c1000m3_4', left: '9 · 90', right: '810' },
      { id: 'c1000m3_5', left: '720 : 80', right: '9' },
      { id: 'c1000m3_6', left: '1000 : 10', right: '100' },
      { id: 'c1000m3_7', left: '7 · □ = 490', right: '70' }
    ]
  }
];


export const COUNT1000_EXAM_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: COUNT1000_EXAM_G3_MATCHER_LEVELS_LIST[0],
  2: COUNT1000_EXAM_G3_MATCHER_LEVELS_LIST[1],
  3: COUNT1000_EXAM_G3_MATCHER_LEVELS_LIST[2]
};

export const Count1000ExamG3Matcher: React.FC<Count1000ExamG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c1000-tudasproba-matcher',
  topicTitle = '5. Megálló – tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-1000-ig"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Párosítsd a képeket és a feladatokat a megoldásukkal!"
      levels={COUNT1000_EXAM_G3_MATCHER_LEVELS}
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

export default Count1000ExamG3Matcher;
