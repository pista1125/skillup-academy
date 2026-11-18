import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CloverCard, GroupsCard, JumpsCard, TriCard, ArrayCard, ArrowCard } from './Mult3G2CardFigures';

interface Mult3G2MatcherProps {
  level?: DifficultyLevel | { level?: DifficultyLevel };
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
}

const MULT3_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány darab?',
    description: 'Számolj hármasával, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'm3m1', left: '1 · 3', right: '3' },
      { id: 'm3m2', left: '', right: '6', promptFigure: <CloverCard n={2} /> },
      { id: 'm3m3', left: '', right: '9', promptFigure: <GroupsCard groups={3} /> },
      { id: 'm3m4', left: '3 + 3 + 3 + 3', right: '12' },
      { id: 'm3m5', left: '', right: '15', promptFigure: <JumpsCard jumps={5} /> },
      { id: 'm3m6', left: '6 · 3', right: '18' },
      { id: 'm3m7', left: '', right: '21', promptFigure: <CloverCard n={7} /> },
      { id: 'm3m8', left: '10 · 3', right: '30' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik szorzás?',
    description: 'Párosítsd a képet vagy az összeadást a szorzással!',
    pairs: [
      { id: 'm3m9', left: '3 + 3', right: '2 · 3' },
      { id: 'm3m10', left: '', right: '3 · 3', promptFigure: <TriCard n={3} /> },
      { id: 'm3m11', left: '', right: '4 · 3', promptFigure: <CloverCard n={4} /> },
      { id: 'm3m12', left: '3 + 3 + 3 + 3 + 3', right: '5 · 3' },
      { id: 'm3m13', left: '', right: '6 · 3', promptFigure: <ArrayCard rows={3} cols={6} /> },
      { id: 'm3m14', left: '', right: '8 · 3', promptFigure: <JumpsCard jumps={8} /> },
      { id: 'm3m15', left: '27', right: '9 · 3' },
      { id: 'm3m16', left: '30', right: '10 · 3' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hiányzó szám',
    description: 'Keresd meg, melyik szám kerül a ? vagy a □ helyére!',
    pairs: [
      { id: 'm3m17', left: '', right: '1', promptFigure: <ArrowCard from="?" to="3" /> },
      { id: 'm3m18', left: '□ · 3 = 12', right: '4' },
      { id: 'm3m19', left: '', right: '6', promptFigure: <JumpsCard jumps={6} endLabel="18" /> },
      { id: 'm3m20', left: '3 · □ = 21', right: '7' },
      { id: 'm3m21', left: '', right: '9', promptFigure: <ArrowCard from="?" to="27" /> },
      { id: 'm3m22', left: '', right: '15', promptFigure: <ArrowCard from="5" to="?" /> },
      { id: 'm3m23', left: '8 · 3 − 4', right: '20' },
      { id: 'm3m24', left: '6 · 3 + 3', right: '21' }
    ]
  }
];

export const MULT3_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MULT3_G2_MATCHER_LEVELS_LIST[0],
  2: MULT3_G2_MATCHER_LEVELS_LIST[1],
  3: MULT3_G2_MATCHER_LEVELS_LIST[2]
};

export const Mult3G2Matcher: React.FC<Mult3G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-szorzas-3-matcher',
  topicTitle = '2. Szorzás 3-mal – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="szorzas-3-mal"
      title={topicTitle}
      subtitle="Párosítsd a hármas csoportokat, a szorzásokat és a hiányzó számokat!"
      levels={MULT3_G2_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
    />
  );
};

export default Mult3G2Matcher;
