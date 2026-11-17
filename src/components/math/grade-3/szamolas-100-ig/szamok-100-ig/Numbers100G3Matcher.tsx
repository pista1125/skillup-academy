import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BlocksCard } from './Numbers100G3CardFigures';

interface Numbers100G3MatcherProps {
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

const NUMBERS_100_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kép, betű, szám',
    description: 'Számold meg a rudakat és a kockákat, vagy olvasd el a szót! Párosítsd a számmal!',
    pairs: [
      { id: 'n100m1', left: '', right: '38', promptFigure: <BlocksCard tens={3} ones={8} /> },
      { id: 'n100m2', left: 'nyolcvanhárom', right: '83' },
      { id: 'n100m3', left: 'tizenkilenc', right: '19' },
      { id: 'n100m4', left: 'kilencvenegy', right: '91' },
      { id: 'n100m5', left: 'ötvenöt', right: '55' },
      { id: 'n100m6', left: '', right: '60', promptFigure: <BlocksCard tens={6} ones={0} /> },
      { id: 'n100m7', left: '', right: '24', promptFigure: <BlocksCard tens={2} ones={4} /> },
      { id: 'n100m8', left: '', right: '47', promptFigure: <BlocksCard tens={4} ones={7} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Tízesek és egyesek',
    description: 'Párosítsd a képet vagy a bontást a számmal! Figyelj: a kép elején néha a kockák vannak!',
    pairs: [
      { id: 'n100m9', left: '', right: '29', promptFigure: <BlocksCard tens={2} ones={9} onesFirst /> },
      { id: 'n100m10', left: '9 t + 2 e', right: '92' },
      { id: 'n100m11', left: '', right: '70', promptFigure: <BlocksCard tens={7} ones={0} /> },
      { id: 'n100m12', left: '0 t + 7 e', right: '7' },
      { id: 'n100m13', left: '5 t + 6 e', right: '56' },
      { id: 'n100m14', left: '', right: '65', promptFigure: <BlocksCard tens={6} ones={5} onesFirst /> },
      { id: 'n100m15', left: '', right: '13', promptFigure: <BlocksCard tens={1} ones={3} onesFirst /> },
      { id: 'n100m16', left: '3 t + 1 e', right: '31' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Beváltás',
    description: 'Sok az egyes! Válts be 10 egyest egy tízesre, és párosíts!',
    pairs: [
      { id: 'n100m17', left: '', right: '44', promptFigure: <BlocksCard tens={3} ones={14} /> },
      { id: 'n100m18', left: '', right: '38', promptFigure: <BlocksCard tens={2} ones={18} /> },
      { id: 'n100m19', left: '5 t + 25 e', right: '75' },
      { id: 'n100m20', left: '1 t + 40 e', right: '50' },
      { id: 'n100m21', left: '', right: '71', promptFigure: <BlocksCard tens={6} ones={11} /> },
      { id: 'n100m22', left: '9 t + 10 e', right: '100' },
      { id: 'n100m23', left: '20 e + 4 t', right: '60' },
      { id: 'n100m24', left: '', right: '56', promptFigure: <BlocksCard tens={4} ones={16} /> }
    ]
  }
];

export const NUMBERS_100_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NUMBERS_100_G3_MATCHER_LEVELS_LIST[0],
  2: NUMBERS_100_G3_MATCHER_LEVELS_LIST[1],
  3: NUMBERS_100_G3_MATCHER_LEVELS_LIST[2]
};

export const Numbers100G3Matcher: React.FC<Numbers100G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c100-szamok-matcher',
  topicTitle = '1. Számok 100-ig – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="szamok-100-ig"
      title={topicTitle}
      subtitle="Párosítsd a számokat a betűvel írt alakjukkal és a bontásukkal!"
      levels={NUMBERS_100_G3_MATCHER_LEVELS}
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

export default Numbers100G3Matcher;
