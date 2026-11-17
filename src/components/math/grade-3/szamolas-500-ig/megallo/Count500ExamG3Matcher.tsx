import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniBlocks, MiniCoins, MiniRoundLine, MiniJump, MiniShare, MiniRodGroups, MiniBar500 } from './Count500ExamG3CardFigures';

interface Count500ExamG3MatcherProps {
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

const COUNT500_EXAM_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Számok és pénz',
    description: 'Melyik szám ez? Mennyi pénz? Párosíts!',
    pairs: [
      { id: 'c500m1_0', left: '', promptFigure: <MiniBlocks sz={2} t={3} e={5} />, right: '235' },
      { id: 'c500m1_1', left: '', promptFigure: <MiniBlocks sz={4} t={0} e={7} />, right: '407' },
      { id: 'c500m1_2', left: '', promptFigure: <MiniBlocks sz={1} t={5} e={0} />, right: '150' },
      { id: 'c500m1_3', left: '', promptFigure: <MiniCoins coins={[200, 100, 50, 20]} />, right: '370 Ft' },
      { id: 'c500m1_4', left: 'négyszázhúsz', right: '420' },
      { id: 'c500m1_5', left: 'háromszázkilenc', right: '309' },
      { id: 'c500m1_6', left: '3 százas és 6 egyes', right: '306' },
      { id: 'c500m1_7', left: '4 százas és 9 tízes', right: '490' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kerekítés',
    description: 'Kerekíts! Melyik kerek szám lesz belőle?',
    pairs: [
      { id: 'c500m2_0', left: 'tízesre', promptFigure: <MiniRoundLine v={247} lo={240} hi={250} />, right: '250' },
      { id: 'c500m2_1', left: 'százasra', promptFigure: <MiniRoundLine v={362} lo={300} hi={400} />, right: '400' },
      { id: 'c500m2_2', left: 'százasra', promptFigure: <MiniRoundLine v={318} lo={300} hi={400} />, right: '300' },
      { id: 'c500m2_3', left: 'tízesre', promptFigure: <MiniRoundLine v={453} lo={450} hi={460} />, right: '450' },
      { id: 'c500m2_4', left: '128 ≈ ? (tízesre)', right: '130' },
      { id: 'c500m2_5', left: '149 ≈ ? (százasra)', right: '100' },
      { id: 'c500m2_6', left: '205 ≈ ? (tízesre)', right: '210' },
      { id: 'c500m2_7', left: '450 ≈ ? (százasra)', right: '500' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Vegyes műveletek',
    description: 'Számold ki! Párosítsd az eredménnyel!',
    pairs: [
      { id: 'c500m3_0', left: '', promptFigure: <MiniJump from={270} by={60} />, right: '330' },
      { id: 'c500m3_1', left: '', promptFigure: <MiniShare total={280} k={4} />, right: '70' },
      { id: 'c500m3_2', left: '', promptFigure: <MiniRodGroups groups={6} per={8} />, right: '480' },
      { id: 'c500m3_3', left: '', promptFigure: <MiniBar500 known={380} />, right: '120' },
      { id: 'c500m3_4', left: '450 − 260', right: '190' },
      { id: 'c500m3_5', left: '9 · 40', right: '360' },
      { id: 'c500m3_6', left: '350 : 50', right: '7' },
      { id: 'c500m3_7', left: '150 + 7 · 20', right: '290' }
    ]
  }
];

export const COUNT500_EXAM_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: COUNT500_EXAM_G3_MATCHER_LEVELS_LIST[0],
  2: COUNT500_EXAM_G3_MATCHER_LEVELS_LIST[1],
  3: COUNT500_EXAM_G3_MATCHER_LEVELS_LIST[2]
};

export const Count500ExamG3Matcher: React.FC<Count500ExamG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c500-tudasproba-matcher',
  topicTitle = '5. Megálló – tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-500-ig"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Párosítsd a képeket és a műveleteket az eredményükkel!"
      levels={COUNT500_EXAM_G3_MATCHER_LEVELS}
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

export default Count500ExamG3Matcher;
