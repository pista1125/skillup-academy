import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { TakeCard, BackJumpCard } from './Sub50G2CardFigures';
import { PyramidCard, BalanceCard } from '../osszeadas-50-es-szamkor/Add50G2CardFigures';

interface Sub50G2MatcherProps {
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

const SUB50_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Tízesátlépés nélkül',
    description: 'Vond ki! Párosítsd a képet vagy a műveletet a különbséggel!',
    pairs: [
      { id: 's50m1', left: '', right: '24', promptFigure: <TakeCard a={27} takeOnes={3} /> },
      { id: 's50m2', left: '38 − 5', right: '33' },
      { id: 's50m3', left: '', right: '42', promptFigure: <BackJumpCard start={46} hops={[4]} /> },
      { id: 's50m4', left: '29 − 9', right: '20' },
      { id: 's50m5', left: '', right: '35', promptFigure: <TakeCard a={45} takeTens={1} /> },
      { id: 's50m6', left: '37 − 6', right: '31' },
      { id: 's50m7', left: '', right: '23', promptFigure: <BackJumpCard start={28} hops={[5]} /> },
      { id: 's50m8', left: '', right: '28', promptFigure: <TakeCard a={48} takeTens={2} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Tízesátlépéssel',
    description: 'Ugorj vissza előbb a kerek tízesig, aztán tovább!',
    pairs: [
      { id: 's50m9', left: '', right: '27', promptFigure: <BackJumpCard start={32} hops={[2, 3]} /> },
      { id: 's50m10', left: '41 − 6', right: '35' },
      { id: 's50m11', left: '', right: '36', promptFigure: <BackJumpCard start={43} hops={[3, 4]} /> },
      { id: 's50m12', left: '30 − 4', right: '26' },
      { id: 's50m13', left: '', right: '25', promptFigure: <TakeCard a={33} breakRod takeOnes={8} /> },
      { id: 's50m14', left: '50 − 7', right: '43' },
      { id: 's50m15', left: '', right: '18', promptFigure: <BackJumpCard start={25} hops={[5, 2]} /> },
      { id: 's50m16', left: '44 − 6', right: '38' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kétjegyű számok és hiányzó szám',
    description: 'Számold ki a különbséget vagy a ? helyét!',
    pairs: [
      { id: 's50m17', left: '36 − 19', right: '17' },
      { id: 's50m18', left: '', right: '27', promptFigure: <PyramidCard left="?" right="18" top="45" /> },
      { id: 's50m19', left: '', right: '4', promptFigure: <BalanceCard left="40−6" right="30+?" /> },
      { id: 's50m20', left: '□ − 12 = 25', right: '37' },
      { id: 's50m21', left: '', right: '25', promptFigure: <BackJumpCard start={42} hops={[10, 7]} /> },
      { id: 's50m22', left: '50 − 24', right: '26' },
      { id: 's50m23', left: '', right: '28', promptFigure: <PyramidCard left="19" right="?" top="47" /> },
      { id: 's50m24', left: '', right: '8', promptFigure: <BalanceCard left="33−5" right="20+?" /> }
    ]
  }
];

export const SUB50_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SUB50_G2_MATCHER_LEVELS_LIST[0],
  2: SUB50_G2_MATCHER_LEVELS_LIST[1],
  3: SUB50_G2_MATCHER_LEVELS_LIST[2]
};

export const Sub50G2Matcher: React.FC<Sub50G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-c50-kivonas-matcher',
  topicTitle = '3. Kivonás 50-es számkör – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szamolas-50-ig"
      topicId={topicId}
      subtopicId="kivonas-50-es-szamkor"
      title={topicTitle}
      subtitle="Párosítsd a kivonásokat, a visszaugrásokat és a hiányzó számokat!"
      levels={SUB50_G2_MATCHER_LEVELS}
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

export default Sub50G2Matcher;
