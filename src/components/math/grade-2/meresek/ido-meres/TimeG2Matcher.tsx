import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ClockCard, DigitalCard, SectorCard, SpanCard, UntilHourCard } from './TimeG2CardFigures';

interface TimeG2MatcherProps {
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

const TIME_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Egész órák és mértékegységek',
    description: 'Olvasd le az órát, vagy keresd meg, mennyi ugyanannyi idő!',
    pairs: [
      { id: 'timm1', left: '', right: '3 óra', promptFigure: <ClockCard h={3} /> },
      { id: 'timm2', left: '', right: '6 óra', promptFigure: <ClockCard h={6} /> },
      { id: 'timm3', left: '', right: '10 óra', promptFigure: <ClockCard h={10} /> },
      { id: 'timm4', left: '', right: '12 óra', promptFigure: <ClockCard h={12} /> },
      { id: 'timm5', left: '1 nap', right: '24 óra' },
      { id: 'timm6', left: '1 óra', right: '60 perc' },
      { id: 'timm7', left: '1 hét', right: '7 nap' },
      { id: 'timm8', left: '1 év', right: '12 hónap' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Óra és perc',
    description: 'Olvasd le a mutatós és a digitális órát! Melyik idő ugyanaz?',
    pairs: [
      { id: 'timm9', left: '', right: '7 óra 30 perc', promptFigure: <ClockCard h={7} m={30} /> },
      { id: 'timm10', left: '', right: '2 óra 15 perc', promptFigure: <ClockCard h={2} m={15} /> },
      { id: 'timm11', left: '', right: '9 óra 45 perc', promptFigure: <ClockCard h={9} m={45} /> },
      { id: 'timm12', left: '', right: '11 óra 5 perc', promptFigure: <DigitalCard text="11:05" /> },
      { id: 'timm13', left: '', right: '16 óra 40 perc', promptFigure: <DigitalCard text="16:40" /> },
      { id: 'timm14', left: 'fél óra', right: '30 perc' },
      { id: 'timm15', left: 'délután 5 óra', right: '17 óra' },
      { id: 'timm16', left: 'este 8 óra', right: '20 óra' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi idő telik el?',
    description: 'Számold ki, mennyi idő telik el, vagy hány perc kell még az egész óráig!',
    pairs: [
      { id: 'timm17', left: '', right: '3 óra', promptFigure: <SpanCard from="8:00" to="11:00" /> },
      { id: 'timm18', left: '', right: '5 óra', promptFigure: <SpanCard from="13:00" to="18:00" /> },
      { id: 'timm19', left: '', right: '45 perc', promptFigure: <SectorCard minutes={45} /> },
      { id: 'timm20', left: '', right: '10 perc', promptFigure: <UntilHourCard text="6:50" /> },
      { id: 'timm21', left: '', right: '25 perc', promptFigure: <UntilHourCard text="3:35" /> },
      { id: 'timm22', left: '2 hét', right: '14 nap' },
      { id: 'timm23', left: '3 hét', right: '21 nap' },
      { id: 'timm24', left: '4 hét + 2 nap', right: '30 nap' }
    ]
  }
];

export const TIME_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: TIME_G2_MATCHER_LEVELS_LIST[0],
  2: TIME_G2_MATCHER_LEVELS_LIST[1],
  3: TIME_G2_MATCHER_LEVELS_LIST[2]
};

export const TimeG2Matcher: React.FC<TimeG2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-meres-ido-matcher',
  topicTitle = '4. Az idő mérése – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="ido-meres"
      title={topicTitle}
      subtitle="Párosítsd az órákat, az időket és a mértékegységeket!"
      levels={TIME_G2_MATCHER_LEVELS}
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

export default TimeG2Matcher;
