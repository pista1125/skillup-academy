import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Circle4MatcherProps {
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

const CIRCLE4_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: A kör fogalmai",
    description: "Párosítsd a fogalmat a jelentésével!",
    pairs: [
      { id: 'g4-geom-kor-m1', left: "középpont", right: "a kör közepe, jele: O" },
      { id: 'g4-geom-kor-m2', left: "körvonal", right: "a kör széle" },
      { id: 'g4-geom-kor-m3', left: "körlap", right: "a körvonal a belsejével együtt" },
      { id: 'g4-geom-kor-m4', left: "körző", right: "ezzel rajzolunk pontos kört" },
      { id: 'g4-geom-kor-m5', left: "körzőnyílás", right: "a körző két szárának távolsága" },
      { id: 'g4-geom-kor-m6', left: "a kör minden pontja", right: "ugyanolyan messze van a középponttól" },
      { id: 'g4-geom-kor-m7', left: "ovális", right: "kerek, de nem kör" },
      { id: 'g4-geom-kor-m8', left: "a kör nem sokszög", right: "mert görbe vonal határolja" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Körzőnyílások",
    description: "Párosítsd az egyenlő hosszúságokat!",
    pairs: [
      { id: 'g4-geom-kor-m9', left: "1 cm", right: "10 mm" },
      { id: 'g4-geom-kor-m10', left: "13 mm", right: "1 cm 3 mm" },
      { id: 'g4-geom-kor-m11', left: "15 mm", right: "1 cm 5 mm" },
      { id: 'g4-geom-kor-m12', left: "2 cm", right: "20 mm" },
      { id: 'g4-geom-kor-m13', left: "25 mm", right: "2 cm 5 mm" },
      { id: 'g4-geom-kor-m14', left: "3 cm", right: "30 mm" },
      { id: 'g4-geom-kor-m15', left: "4 cm 2 mm", right: "42 mm" },
      { id: 'g4-geom-kor-m16', left: "1 dm", right: "10 cm" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Szélesség és körzőnyílás",
    description: "A kör szélessége a középponton át kétszer akkora, mint a körzőnyílás. Párosítsd!",
    pairs: [
      { id: 'g4-geom-kor-m17', left: "1 cm-es körzőnyílás", right: "2 cm széles kör" },
      { id: 'g4-geom-kor-m18', left: "2 cm-es körzőnyílás", right: "4 cm széles kör" },
      { id: 'g4-geom-kor-m19', left: "3 cm-es körzőnyílás", right: "6 cm széles kör" },
      { id: 'g4-geom-kor-m20', left: "5 cm-es körzőnyílás", right: "10 cm széles kör" },
      { id: 'g4-geom-kor-m21', left: "15 mm-es körzőnyílás", right: "3 cm széles kör" },
      { id: 'g4-geom-kor-m22', left: "4 cm-es körzőnyílás", right: "8 cm széles kör" },
      { id: 'g4-geom-kor-m23', left: "50 cm-re van a karika minden pontja", right: "1 m széles hulahoppkarika" },
      { id: 'g4-geom-kor-m24', left: "10 cm-es körzőnyílás", right: "20 cm széles kör" }
    ]
  }
];

const CIRCLE4_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: CIRCLE4_MATCHER_LEVELS_LIST[0],
  2: CIRCLE4_MATCHER_LEVELS_LIST[1],
  3: CIRCLE4_MATCHER_LEVELS_LIST[2]
};

export const Circle4Matcher: React.FC<Circle4MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-geom-kor-matcher',
  topicTitle = "2. A kör – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId={topicId}
      subtopicId="a-kor"
      title={topicTitle}
      subtitle="Párosítsd a kör fogalmait, a körzőnyílásokat és a feladatokat!"
      levels={CIRCLE4_MATCHER_LEVELS}
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

export default Circle4Matcher;
