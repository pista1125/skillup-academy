import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { IconCard, MeterSticksCard, BottlesGlassesCard } from './WhatToMeasureG3CardFigures';

interface WhatToMeasureG3MatcherProps {
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

const WHAT_TO_MEASURE_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Eszközök és jelek',
    description: 'Mi a neve a mérőeszköznek? Mit jelent a jel?',
    pairs: [
      { id: 'wtmm1', left: '', promptFigure: <IconCard kind="ruler" />, right: 'vonalzó' },
      { id: 'wtmm2', left: '', promptFigure: <IconCard kind="tape" />, right: 'mérőszalag' },
      { id: 'wtmm3', left: '', promptFigure: <IconCard kind="balance" />, right: 'kétkarú mérleg' },
      { id: 'wtmm4', left: '', promptFigure: <IconCard kind="jug" />, right: 'mérőkancsó' },
      { id: 'wtmm5', left: 'cm', right: 'centiméter' },
      { id: 'wtmm6', left: 'm', right: 'méter' },
      { id: 'wtmm7', left: 'kg', right: 'kilogramm' },
      { id: 'wtmm8', left: 'dl', right: 'deciliter' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi lehet?',
    description: 'Becsülj! Melyik szám és mértékegység illik a képhez?',
    pairs: [
      { id: 'wtmm9', left: 'Milyen hosszú?', promptFigure: <IconCard kind="pencil" />, right: '15 cm' },
      { id: 'wtmm10', left: 'Milyen magas?', promptFigure: <IconCard kind="door" />, right: '2 m' },
      { id: 'wtmm11', left: 'Milyen nehéz?', promptFigure: <IconCard kind="melon" />, right: '3 kg' },
      { id: 'wtmm12', left: 'Mennyi fér bele?', promptFigure: <IconCard kind="glass" />, right: '2 dl' },
      { id: 'wtmm13', left: 'Mennyi fér bele?', promptFigure: <IconCard kind="bucket" />, right: '10 l' },
      { id: 'wtmm14', left: 'egy harmadikos gyerek tömege', right: '30 kg' },
      { id: 'wtmm15', left: 'víz a teli fürdőkádban', right: '150 l' },
      { id: 'wtmm16', left: 'tej egy tejesdobozban', right: '1 l' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Váltsd át!',
    description: '1 m = 100 cm és 1 l = 10 dl. A képen: pohár = 1 dl.',
    pairs: [
      { id: 'wtmm17', left: 'Hány cm?', promptFigure: <MeterSticksCard m={2} />, right: '200 cm' },
      { id: 'wtmm18', left: 'Hány cm?', promptFigure: <MeterSticksCard m={1} cm={50} />, right: '150 cm' },
      { id: 'wtmm19', left: 'Hány dl?', promptFigure: <BottlesGlassesCard l={2} />, right: '20 dl' },
      { id: 'wtmm20', left: 'Hány dl?', promptFigure: <BottlesGlassesCard l={1} dl={5} />, right: '15 dl' },
      { id: 'wtmm21', left: '1 m', right: '100 cm' },
      { id: 'wtmm22', left: '1 l', right: '10 dl' },
      { id: 'wtmm23', left: '1 m 20 cm', right: '120 cm' },
      { id: 'wtmm24', left: '1 l 2 dl', right: '12 dl' }
    ]
  }
];

export const WHAT_TO_MEASURE_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: WHAT_TO_MEASURE_G3_MATCHER_LEVELS_LIST[0],
  2: WHAT_TO_MEASURE_G3_MATCHER_LEVELS_LIST[1],
  3: WHAT_TO_MEASURE_G3_MATCHER_LEVELS_LIST[2]
};

export const WhatToMeasureG3Matcher: React.FC<WhatToMeasureG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-meas-mit-mivel-matcher',
  topicTitle = '1. Mit mivel mérünk? – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="mit-mivel-merunk"
      title={topicTitle}
      subtitle="Párosítsd a mérőeszközöket, a mértékegységeket és a becsléseket!"
      levels={WHAT_TO_MEASURE_G3_MATCHER_LEVELS}
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

export default WhatToMeasureG3Matcher;
