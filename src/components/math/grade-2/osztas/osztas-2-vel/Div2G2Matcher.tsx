import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { PackCard, ShareCard, HalfCard } from './Div2G2CardFigures';

interface Div2G2MatcherProps {
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

const DIV2_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Csomagolás és szétosztás',
    description: 'Hány csomag lett? Mennyi jut egy tányérra? Párosítsd!',
    pairs: [
      { id: 'd2m1', left: '', right: '2', promptFigure: <PackCard n={4} /> },
      { id: 'd2m2', left: '6 : 2', right: '3' },
      { id: 'd2m3', left: '', right: '4', promptFigure: <ShareCard each={4} q total={8} /> },
      { id: 'd2m4', left: '10 : 2', right: '5' },
      { id: 'd2m5', left: '', right: '6', promptFigure: <PackCard n={12} /> },
      { id: 'd2m6', left: 'a 14 fele', right: '7' },
      { id: 'd2m7', left: '', right: '8', promptFigure: <ShareCard each={8} q total={16} /> },
      { id: 'd2m8', left: '2 : 2', right: '1' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Osztás 2-vel',
    description: 'Számold ki a hányadost, és párosítsd!',
    pairs: [
      { id: 'd2m9', left: '18 : 2', right: '9' },
      { id: 'd2m10', left: '', right: '10', promptFigure: <PackCard n={20} /> },
      { id: 'd2m11', left: '14 : 2', right: '7' },
      { id: 'd2m12', left: '', right: '6', promptFigure: <ShareCard each={6} q total={12} /> },
      { id: 'd2m13', left: '0 : 2', right: '0' },
      { id: 'd2m14', left: '', right: '8', promptFigure: <HalfCard big="16" half="?" /> },
      { id: 'd2m15', left: '8 : 2', right: '4' },
      { id: 'd2m16', left: '', right: '5', promptFigure: <PackCard n={10} /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Párok és maradék',
    description: 'Keresd meg a szorzás párját, vagy számold meg a csomagokat és a maradékot!',
    pairs: [
      { id: 'd2m17', left: '12 : 2 = 6', right: '6 · 2 = 12' },
      { id: 'd2m18', left: '18 : 2 = 9', right: '9 · 2 = 18' },
      { id: 'd2m19', left: '', right: '3 csomag, 1 marad', promptFigure: <PackCard n={7} /> },
      { id: 'd2m20', left: '', right: '4 csomag, 1 marad', promptFigure: <PackCard n={9} /> },
      { id: 'd2m21', left: '', right: '5 csomag, 0 marad', promptFigure: <PackCard n={10} /> },
      { id: 'd2m22', left: '□ : 2 = 8', right: '16' },
      { id: 'd2m23', left: '', right: '2 csomag, 1 marad', promptFigure: <PackCard n={5} /> },
      { id: 'd2m24', left: '', right: '20', promptFigure: <HalfCard big="?" half="10" /> }
    ]
  }
];

export const DIV2_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: DIV2_G2_MATCHER_LEVELS_LIST[0],
  2: DIV2_G2_MATCHER_LEVELS_LIST[1],
  3: DIV2_G2_MATCHER_LEVELS_LIST[2]
};

export const Div2G2Matcher: React.FC<Div2G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-osztas-2-matcher',
  topicTitle = '1. Osztás 2-vel – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="osztas-2-vel"
      title={topicTitle}
      subtitle="Párosítsd a csomagolásokat, a szétosztásokat és az osztásokat!"
      levels={DIV2_G2_MATCHER_LEVELS}
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

export default Div2G2Matcher;
