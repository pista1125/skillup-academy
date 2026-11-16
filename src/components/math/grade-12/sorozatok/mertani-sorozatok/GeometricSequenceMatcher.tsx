import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GeometricSequenceMatcherProps {
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

const GEOMETRIC_SEQUENCE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Sorozat és kvóciens",
    description: "Párosítsd a mértani sorozatot a kvóciensével!",
    pairs: [
      { id: "gsm101", left: "2; 6; 18; …", right: "q = 3" },
      { id: "gsm102", left: "80; 40; 20; …", right: "q = 1/2" },
      { id: "gsm103", left: "5; −10; 20; …", right: "q = −2" },
      { id: "gsm104", left: "3; 6; 12; …", right: "q = 2" },
      { id: "gsm105", left: "1; −1; 1; …", right: "q = −1" },
      { id: "gsm106", left: "7; 7; 7; …", right: "q = 1" },
      { id: "gsm107", left: "1000; 100; 10; …", right: "q = 0,1" },
      { id: "gsm108", left: "64; −16; 4; …", right: "q = −1/4" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Adatokból az eredmény",
    description: "Párosítsd az adatokat a kérdezett értékkel!",
    pairs: [
      { id: "gsm201", left: "a₁ = 7, a₄ = 189: q", right: "3" },
      { id: "gsm202", left: "a₁ = 7, q = 3: a₆", right: "1701" },
      { id: "gsm203", left: "a₁ = 7, a₄ = −0,875: q", right: "−0,5" },
      { id: "gsm204", left: "a₂ = 1600, a₄ = 4: q", right: "1/20 vagy −1/20" },
      { id: "gsm205", left: "a₁₂ = 10, a₁₄ = 40: q", right: "2 vagy −2" },
      { id: "gsm206", left: "a₁ = 64, q = 1/2: a₄", right: "8" },
      { id: "gsm207", left: "a₁ = 10²³, q = 0,001: a₈", right: "100" },
      { id: "gsm208", left: "a₁ = 8, q = −2: a₄", right: "−64" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Folyamat és szorzó",
    description: "Párosítsd a folyamatot a kvócienssel!",
    pairs: [
      { id: "gsm301", left: "évi 3,5%-os kamatos kamat", right: "q = 1,035" },
      { id: "gsm302", left: "évi 2%-os csökkenés", right: "q = 0,98" },
      { id: "gsm303", left: "évi 15%-os értékcsökkenés", right: "q = 0,85" },
      { id: "gsm304", left: "évi 10%-os növekedés", right: "q = 1,1" },
      { id: "gsm305", left: "oldalfelező négyzetek oldalai", right: "q = 1/√2" },
      { id: "gsm306", left: "oldalfelező négyzetek területei", right: "q = 1/2" },
      { id: "gsm307", left: "napi duplázódás", right: "q = 2" },
      { id: "gsm308", left: "mindenki 3 új embernek mondja tovább", right: "q = 3" }
    ]
  }
};

export const GeometricSequenceMatcher: React.FC<GeometricSequenceMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-seq-mertani-matcher',
  topicTitle = "5. Mértani sorozatok – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="mertani-sorozatok"
      title={topicTitle}
      subtitle="Párosítsd a sorozatokat a kvóciensükkel, az adatokat az eredménnyel és a hétköznapi folyamatokat a szorzóval!"
      levels={GEOMETRIC_SEQUENCE_MATCHER_LEVELS}
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

export default GeometricSequenceMatcher;
