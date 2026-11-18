import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RulerCard, BodyUnitCard, RodCard, TrackCard, MeterBarCard } from './LengthG2CardFigures';

interface LengthG2MatcherProps {
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

const LENGTH_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Olvasd le a vonalzóról!',
    description: 'Hány cm a csík? Melyik régi mértékegység ez? Párosítsd!',
    pairs: [
      { id: 'lenm1', left: '', right: '3 cm', promptFigure: <RulerCard len={3} /> },
      { id: 'lenm2', left: '', right: '5 cm', promptFigure: <RulerCard len={5} color="#22c55e" /> },
      { id: 'lenm3', left: '', right: '8 cm', promptFigure: <RulerCard len={8} color="#ef4444" /> },
      { id: 'lenm4', left: '', right: '12 cm', promptFigure: <RulerCard len={12} color="#a855f7" /> },
      { id: 'lenm5', left: '1 dm', right: '10 cm' },
      { id: 'lenm6', left: '1 m', right: '100 cm' },
      { id: 'lenm7', left: '', right: 'arasz', promptFigure: <BodyUnitCard kind="arasz" /> },
      { id: 'lenm8', left: '', right: 'láb', promptFigure: <BodyUnitCard kind="lab" /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Deciméter és centiméter',
    description: 'Egy narancssárga rúd 1 dm, egy kis kocka 1 cm. Párosítsd a hosszakat!',
    pairs: [
      { id: 'lenm9', left: '', right: '14 cm', promptFigure: <RodCard dm={1} cm={4} /> },
      { id: 'lenm10', left: '', right: '23 cm', promptFigure: <RodCard dm={2} cm={3} /> },
      { id: 'lenm11', left: '', right: '41 cm', promptFigure: <RodCard dm={4} cm={1} /> },
      { id: 'lenm12', left: '3 dm 7 cm', right: '37 cm' },
      { id: 'lenm13', left: '5 dm', right: '50 cm' },
      { id: 'lenm14', left: '', right: '6 cm', promptFigure: <RulerCard start={2} len={6} color="#ec4899" /> },
      { id: 'lenm15', left: '', right: '9 cm', promptFigure: <RulerCard start={3} len={9} color="#22c55e" /> },
      { id: 'lenm16', left: '10 dm', right: '1 m' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi van még hátra?',
    description: 'Számold ki, mennyi hiányzik, vagy végezd el a műveletet!',
    pairs: [
      { id: 'lenm17', left: '', right: '3 cm', promptFigure: <TrackCard done={7} /> },
      { id: 'lenm18', left: '', right: '8 cm', promptFigure: <TrackCard done={2} /> },
      { id: 'lenm19', left: '', right: '4 dm', promptFigure: <MeterBarCard filled={6} /> },
      { id: 'lenm20', left: '', right: '7 dm', promptFigure: <MeterBarCard filled={3} /> },
      { id: 'lenm21', left: '1 m − 25 cm', right: '75 cm' },
      { id: 'lenm22', left: '2 dm + 8 cm', right: '28 cm' },
      { id: 'lenm23', left: '1 dm 5 cm + 5 cm', right: '2 dm' },
      { id: 'lenm24', left: '50 cm + 50 cm', right: '1 m' }
    ]
  }
];

export const LENGTH_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LENGTH_G2_MATCHER_LEVELS_LIST[0],
  2: LENGTH_G2_MATCHER_LEVELS_LIST[1],
  3: LENGTH_G2_MATCHER_LEVELS_LIST[2]
};

export const LengthG2Matcher: React.FC<LengthG2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-meres-hosszusag-matcher',
  topicTitle = '1. A hosszúság mérése – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="hosszusag-meres"
      title={topicTitle}
      subtitle="Párosítsd a vonalzókat, a rudakat és a hosszakat!"
      levels={LENGTH_G2_MATCHER_LEVELS}
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

export default LengthG2Matcher;
