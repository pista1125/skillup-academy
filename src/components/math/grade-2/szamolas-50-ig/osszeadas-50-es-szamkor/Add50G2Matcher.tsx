import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BlocksAddCard, JumpCard, PyramidCard, BalanceCard } from './Add50G2CardFigures';

interface Add50G2MatcherProps {
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

const ADD50_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Tízesátlépés nélkül',
    description: 'Add össze! Párosítsd a képet vagy a műveletet az összeggel!',
    pairs: [
      { id: 'a50m1', left: '', right: '27', promptFigure: <BlocksAddCard a={24} b={3} /> },
      { id: 'a50m2', left: '30 + 15', right: '45' },
      { id: 'a50m3', left: '', right: '38', promptFigure: <JumpCard start={32} hops={[6]} /> },
      { id: 'a50m4', left: '4 + 21', right: '25' },
      { id: 'a50m5', left: '', right: '42', promptFigure: <BlocksAddCard a={30} b={12} /> },
      { id: 'a50m6', left: '23 + 7', right: '30' },
      { id: 'a50m7', left: '', right: '48', promptFigure: <JumpCard start={41} hops={[7]} /> },
      { id: 'a50m8', left: '', right: '29', promptFigure: <BlocksAddCard a={20} b={9} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Tízesátlépéssel',
    description: 'Ugorj előbb a kerek tízesig, aztán tovább!',
    pairs: [
      { id: 'a50m9', left: '', right: '33', promptFigure: <JumpCard start={26} hops={[4, 3]} /> },
      { id: 'a50m10', left: '28 + 6', right: '34' },
      { id: 'a50m11', left: '', right: '42', promptFigure: <JumpCard start={37} hops={[3, 2]} /> },
      { id: 'a50m12', left: '19 + 7', right: '26' },
      { id: 'a50m13', left: '', right: '32', promptFigure: <BlocksAddCard a={29} b={3} /> },
      { id: 'a50m14', left: '45 + 5', right: '50' },
      { id: 'a50m15', left: '', right: '21', promptFigure: <JumpCard start={17} hops={[3, 1]} /> },
      { id: 'a50m16', left: '36 + 8', right: '44' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kétjegyű számok és hiányzó szám',
    description: 'Számold ki az összeget vagy a ? helyét!',
    pairs: [
      { id: 'a50m17', left: '', right: '32', promptFigure: <PyramidCard left="15" right="17" /> },
      { id: 'a50m18', left: '16 + 19', right: '35' },
      { id: 'a50m19', left: '', right: '10', promptFigure: <BalanceCard left="24+6" right="20+?" /> },
      { id: 'a50m20', left: '□ + 8 = 41', right: '33' },
      { id: 'a50m21', left: '', right: '27', promptFigure: <PyramidCard left="?" right="13" top="40" /> },
      { id: 'a50m22', left: '22 + 25', right: '47' },
      { id: 'a50m23', left: '', right: '7', promptFigure: <BalanceCard left="18+9" right="20+?" /> },
      { id: 'a50m24', left: '', right: '43', promptFigure: <JumpCard start={24} hops={[10, 9]} /> }
    ]
  }
];

export const ADD50_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ADD50_G2_MATCHER_LEVELS_LIST[0],
  2: ADD50_G2_MATCHER_LEVELS_LIST[1],
  3: ADD50_G2_MATCHER_LEVELS_LIST[2]
};

export const Add50G2Matcher: React.FC<Add50G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-c50-osszeadas-matcher',
  topicTitle = '2. Összeadás 50-es számkör – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szamolas-50-ig"
      topicId={topicId}
      subtopicId="osszeadas-50-es-szamkor"
      title={topicTitle}
      subtitle="Párosítsd az összeadásokat, az ugrásokat és a hiányzó számokat!"
      levels={ADD50_G2_MATCHER_LEVELS}
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

export default Add50G2Matcher;
