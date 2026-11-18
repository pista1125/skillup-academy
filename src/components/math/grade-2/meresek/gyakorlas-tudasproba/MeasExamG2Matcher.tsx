import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ObjectCard } from './MeasExamG2CardFigures';
import { RulerCard } from '../hosszusag-meres/LengthG2CardFigures';
import { BalanceCard } from '../tomeg-meres/MassG2CardFigures';
import { JugsCard } from '../urtartalom-meres/CapacityG2CardFigures';
import { ClockCard, SpanCard, WeeksCard } from '../ido-meres/TimeG2CardFigures';

interface MeasExamG2MatcherProps {
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

const MEAS_EXAM_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik mértékegység illik?',
    description: 'Mivel mérnéd a tárgyat? Párosítsd a mértékegységgel!',
    pairs: [
      { id: 'mexm1', left: '', right: 'cm', promptFigure: <ObjectCard kind="pencil" /> },
      { id: 'mexm2', left: '', right: 'm', promptFigure: <ObjectCard kind="door" /> },
      { id: 'mexm3', left: '', right: 'kg', promptFigure: <ObjectCard kind="sack" /> },
      { id: 'mexm4', left: '', right: 'l', promptFigure: <ObjectCard kind="bucket" /> },
      { id: 'mexm5', left: '', right: 'dl', promptFigure: <ObjectCard kind="mug" /> },
      { id: 'mexm6', left: '', right: '4 óra', promptFigure: <ClockCard h={4} /> },
      { id: 'mexm7', left: '1 dm', right: '10 cm' },
      { id: 'mexm8', left: '1 l', right: '10 dl' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Olvasd le és váltsd át!',
    description: 'Olvasd le a vonalzót, a mérőedényt, a mérleget és az órát!',
    pairs: [
      { id: 'mexm9', left: '', right: '9 cm', promptFigure: <RulerCard len={9} /> },
      { id: 'mexm10', left: '', right: '7 dl', promptFigure: <JugsCard full={0} part={7} /> },
      { id: 'mexm11', left: '', right: '6 óra 30 perc', promptFigure: <ClockCard h={6} m={30} /> },
      {
        id: 'mexm12',
        left: '',
        right: '15 kg',
        promptFigure: <BalanceCard left={[{ kind: 'q' }]} right={[{ kind: 'w', kg: 10 }, { kind: 'w', kg: 5 }]} />
      },
      { id: 'mexm13', left: '3 dm', right: '30 cm' },
      { id: 'mexm14', left: '2 l', right: '20 dl' },
      { id: 'mexm15', left: '1 m', right: '100 cm' },
      { id: 'mexm16', left: '2 hét', right: '14 nap' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Vegyes mértékek',
    description: 'Váltsd át, olvasd le vagy számold ki, és párosítsd!',
    pairs: [
      { id: 'mexm17', left: '4 dm 5 cm', right: '45 cm' },
      { id: 'mexm18', left: '1 l 3 dl', right: '13 dl' },
      { id: 'mexm19', left: '1 óra 20 perc', right: '80 perc' },
      { id: 'mexm20', left: '', right: '1 l 5 dl', promptFigure: <JugsCard full={1} part={5} /> },
      { id: 'mexm21', left: '', right: '4 óra', promptFigure: <SpanCard from="9:00" to="13:00" /> },
      {
        id: 'mexm22',
        left: '',
        right: 'egy doboz: 6 kg',
        promptFigure: <BalanceCard left={[{ kind: 'box' }, { kind: 'box' }]} right={[{ kind: 'w', kg: 10 }, { kind: 'w', kg: 2 }]} />
      },
      { id: 'mexm23', left: '', right: '7 cm', promptFigure: <RulerCard start={3} len={7} /> },
      { id: 'mexm24', left: '', right: '3 hét', promptFigure: <WeeksCard days={21} /> }
    ]
  }
];

export const MEAS_EXAM_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MEAS_EXAM_G2_MATCHER_LEVELS_LIST[0],
  2: MEAS_EXAM_G2_MATCHER_LEVELS_LIST[1],
  3: MEAS_EXAM_G2_MATCHER_LEVELS_LIST[2]
};

export const MeasExamG2Matcher: React.FC<MeasExamG2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-meres-tudasproba-matcher',
  topicTitle = '5. Gyakorlás, tudáspróba – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Párosítsd a tárgyakat, a mérőeszközöket és a mértékegységeket!"
      levels={MEAS_EXAM_G2_MATCHER_LEVELS}
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

export default MeasExamG2Matcher;
