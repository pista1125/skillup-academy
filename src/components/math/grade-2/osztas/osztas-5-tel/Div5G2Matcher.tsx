import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { GroupDotsCard150, PlatesCard150, FifthCard150, TargetCard150 } from './Div5G2CardFigures';

interface Div5G2MatcherProps {
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

const LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány ötös van benne?',
    description: 'Számold meg az ötösöket, vagy oszd el 5-tel! Párosítsd az eredménnyel!',
    pairs: [
      { id: 'd5m1', left: '10 : 5', right: '2' },
      { id: 'd5m2', left: '', right: '3', promptFigure: <GroupDotsCard150 total={15} /> },
      { id: 'd5m3', left: '20 : 5', right: '4' },
      { id: 'd5m4', left: '', right: '5', promptFigure: <TargetCard150 kind="coin" total={25} /> },
      { id: 'd5m5', left: '30 : 5', right: '6' },
      { id: 'd5m6', left: '', right: '7', promptFigure: <GroupDotsCard150 total={35} /> },
      { id: 'd5m7', left: '40 : 5', right: '8' },
      { id: 'd5m8', left: '', right: '9', promptFigure: <TargetCard150 kind="hand" total={45} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Szétosztás és ötöde',
    description: 'Oszd szét 5 tányérra, vagy keresd meg a szám ötödét!',
    pairs: [
      { id: 'd5m9', left: '5 : 5', right: '1' },
      { id: 'd5m10', left: '', right: '2', promptFigure: <FifthCard150 from={10} /> },
      { id: 'd5m11', left: '0 : 5', right: '0' },
      { id: 'd5m12', left: '', right: '3', promptFigure: <PlatesCard150 total={15} /> },
      { id: 'd5m13', left: 'a 20 ötöde', right: '4' },
      { id: 'd5m14', left: '', right: '10', promptFigure: <FifthCard150 from={50} /> },
      { id: 'd5m15', left: '45 : 5', right: '9' },
      { id: 'd5m16', left: '', right: '6', promptFigure: <PlatesCard150 total={30} /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Maradékos osztás',
    description: 'Hány teli ötös van, és mennyi marad? Párosítsd a művelettel!',
    pairs: [
      { id: 'd5m17', left: '', right: '4 · 5 + 2', promptFigure: <GroupDotsCard150 total={22} /> },
      { id: 'd5m18', left: '13', right: '2 · 5 + 3' },
      { id: 'd5m19', left: '', right: '3 · 5 + 4', promptFigure: <GroupDotsCard150 total={19} /> },
      { id: 'd5m20', left: '31', right: '6 · 5 + 1' },
      { id: 'd5m21', left: '', right: '5 · 5 + 2', promptFigure: <GroupDotsCard150 total={27} /> },
      { id: 'd5m22', left: '44', right: '8 · 5 + 4' },
      { id: 'd5m23', left: '', right: '7 · 5 + 3', promptFigure: <GroupDotsCard150 total={38} /> },
      { id: 'd5m24', left: '46', right: '9 · 5 + 1' }
    ]
  }
];

export const DIV5_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const Div5G2Matcher: React.FC<Div5G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-osztas-5-matcher',
  topicTitle = '4. Osztás 5-tel – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="osztas-5-tel"
      title={topicTitle}
      subtitle="Párosítsd az osztásokat, a csoportokat és a maradékos műveleteket!"
      levels={DIV5_G2_MATCHER_LEVELS}
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

export default Div5G2Matcher;
