import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface OpenSentencesMatcherProps {
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

const OPEN_SENTENCES_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Melyik szám hiányzik?",
    description: "Párosítsd a nyitott mondatot azzal a számmal, amely igazzá teszi!",
    pairs: [
      { id: "osm1", left: "□ + 240 = 600", right: "360" },
      { id: "osm2", left: "720 − □ = 450", right: "270" },
      { id: "osm3", left: "8 · □ = 560", right: "70" },
      { id: "osm4", left: "□ : 6 = 80", right: "480" },
      { id: "osm5", left: "□ − 560 = 330", right: "890" },
      { id: "osm6", left: "● + ● = 100", right: "50" },
      { id: "osm7", left: "■ + ■ + ■ = 180", right: "60" },
      { id: "osm8", left: "▲ + ▲ = 1000", right: "500" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Hogyan számolod ki?",
    description: "Párosítsd a nyitott mondatot azzal a művelettel, amellyel a □ értékét megkapod!",
    pairs: [
      { id: "osm9", left: "□ + 254 = 522", right: "522 − 254" },
      { id: "osm10", left: "□ − 254 = 522", right: "522 + 254" },
      { id: "osm11", left: "803 − □ = 427", right: "803 − 427" },
      { id: "osm12", left: "□ · 6 = 480", right: "480 : 6" },
      { id: "osm13", left: "□ : 9 = 80", right: "80 · 9" },
      { id: "osm14", left: "4 · □ = 360", right: "360 : 4" },
      { id: "osm15", left: "562 + □ = 741", right: "741 − 562" },
      { id: "osm16", left: "Gondoltam egy számra, 3-szorosa 300", right: "300 : 3" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Az összes megoldás",
    description: "Párosítsd a nyitott mondatot az ÖSSZES számmal, amely igazzá teszi!",
    pairs: [
      { id: "osm17", left: "5 > □", right: "0, 1, 2, 3, 4" },
      { id: "osm18", left: "□ + 3 < 6", right: "0, 1, 2" },
      { id: "osm19", left: "10 < □ < 14", right: "11, 12, 13" },
      { id: "osm20", left: "2 · □ < 7", right: "0, 1, 2, 3" },
      { id: "osm21", left: "20 < □ < 23", right: "21, 22" },
      { id: "osm22", left: "□ + 7 < 9", right: "0, 1" },
      { id: "osm23", left: "367 > □ > 365", right: "366" },
      { id: "osm24", left: "□ + □ = 10", right: "5" }
    ]
  }
];

const OPEN_SENTENCES_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: OPEN_SENTENCES_MATCHER_LEVELS_LIST[0],
  2: OPEN_SENTENCES_MATCHER_LEVELS_LIST[1],
  3: OPEN_SENTENCES_MATCHER_LEVELS_LIST[2]
};

export const OpenSentencesMatcher: React.FC<OpenSentencesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-count-nyitott-mondatok-matcher',
  topicTitle = "5. Nyitott mondatok – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="nyitott-mondatok"
      title={topicTitle}
      subtitle="Párosítsd a nyitott mondatokat a megoldásukkal!"
      levels={OPEN_SENTENCES_MATCHER_LEVELS}
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

export default OpenSentencesMatcher;
