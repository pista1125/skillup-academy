import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { DiscsCard, DotsPairCard, LineArrowCard, OrdinalDotsCard } from './Numbers20G2CardFigures';

interface Numbers20G2MatcherProps {
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
  [key: string]: unknown;
}

const NUMBERS20_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kép, betű, szám',
    description: 'Számold meg a korongokat vagy a pöttyöket, és párosítsd a számmal!',
    pairs: [
      { id: 'n20m1', left: '', right: '14', promptFigure: <DiscsCard tens={1} ones={4} /> },
      { id: 'n20m2', left: 'tizenegy', right: '11' },
      { id: 'n20m3', left: 'húsz', right: '20' },
      { id: 'n20m4', left: 'nulla', right: '0' },
      { id: 'n20m5', left: '', right: '7', promptFigure: <DotsPairCard count={7} /> },
      { id: 'n20m6', left: '', right: '18', promptFigure: <DiscsCard tens={1} ones={8} /> },
      { id: 'n20m7', left: '', right: '5', promptFigure: <LineArrowCard value={5} lo={0} hi={10} /> },
      { id: 'n20m8', left: '', right: '12', promptFigure: <DotsPairCard count={12} /> },
    ],
  },
  {
    level: 2,
    title: '2. szint: Helyiérték és számszomszédok',
    description: 'Párosítsd a bontást, a képet vagy a szomszédot a számmal! Figyelj a sorrendre is!',
    pairs: [
      { id: 'n20m9', left: '', right: '16', promptFigure: <DiscsCard tens={1} ones={6} onesFirst /> },
      { id: 'n20m10', left: '1 t + 9 e', right: '19' },
      { id: 'n20m11', left: '', right: '13', promptFigure: <LineArrowCard value={13} lo={10} hi={20} /> },
      { id: 'n20m12', left: '0 t + 8 e', right: '8' },
      { id: 'n20m13', left: '', right: '10', promptFigure: <DiscsCard tens={1} ones={0} /> },
      { id: 'n20m14', left: '', right: '15', promptFigure: <DiscsCard tens={1} ones={5} onesFirst /> },
      { id: 'n20m15', left: '18 kisebb szomszédja', right: '17' },
      { id: 'n20m16', left: '', right: '20', promptFigure: <DiscsCard tens={2} ones={0} /> },
    ],
  },
  {
    level: 3,
    title: '3. szint: Beváltás, sorszám, nyitott mondat',
    description: 'Válts be 10 egyest 1 tízesre, olvasd le a sorszámot és a számegyenest!',
    pairs: [
      { id: 'n20m17', left: '', right: '10', promptFigure: <DiscsCard tens={0} ones={10} /> },
      { id: 'n20m18', left: '', right: '20', promptFigure: <DiscsCard tens={1} ones={10} /> },
      { id: 'n20m19', left: '', right: '4.', promptFigure: <OrdinalDotsCard total={6} targetIndex={4} /> },
      { id: 'n20m20', left: '', right: '6.', promptFigure: <OrdinalDotsCard total={7} targetIndex={6} /> },
      { id: 'n20m21', left: '10 < □ < 12', right: '11' },
      { id: 'n20m22', left: '19 > □ > 17', right: '18' },
      { id: 'n20m23', left: '', right: '15', promptFigure: <LineArrowCard value={15} lo={10} hi={20} /> },
      { id: 'n20m24', left: '20 kisebb szomszédja', right: '19' },
    ],
  },
];

export const NUMBERS20_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NUMBERS20_G2_MATCHER_LEVELS_LIST[0],
  2: NUMBERS20_G2_MATCHER_LEVELS_LIST[1],
  3: NUMBERS20_G2_MATCHER_LEVELS_LIST[2],
};

export const Numbers20G2Matcher: React.FC<Numbers20G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-c20-szamok-matcher',
  topicTitle = '1. Számok 0-tól 20-ig – Párosító',
  ...rest
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : 1);
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId={topicId}
      subtopicId="szamok-0-tol-20-ig"
      title={topicTitle}
      subtitle="Párosítsd a képeket, számneveket és helyiérték-bontásokat a számokkal!"
      levels={NUMBERS20_G2_MATCHER_LEVELS}
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

export default Numbers20G2Matcher;
