import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NumeralSystems1MatcherProps {
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

const NUMERAL_SYSTEMS1_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Számrendszerek és számjegyek',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'ns1m1', left: 'Kettes számrendszer', right: 'Számjegyei: 0 és 1' },
      { id: 'ns1m2', left: 'Nyolcas számrendszer', right: 'Számjegyei: 0, 1, …, 7' },
      { id: 'ns1m3', left: 'Tizenkettes számrendszer', right: 'Számjegyei: 0, …, 9, A, B' },
      { id: 'ns1m4', left: 'Tizenhatos (hexadecimális) számrendszer', right: 'Számjegyei: 0, …, 9, A, …, F' },
      { id: 'ns1m5', left: 'Az A számjegy', right: 'Értéke 10' },
      { id: 'ns1m6', left: 'Az F számjegy', right: 'Értéke 15' },
      { id: 'ns1m7', left: '1 tucat', right: '12 darab' },
      { id: 'ns1m8', left: '1 nagytucat', right: '12 · 12 = 144 darab' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Átírás tízes számrendszerbe',
    description: 'Párosítsd a számot a tízes számrendszerbeli értékével!',
    pairs: [
      { id: 'ns1m9', left: '943₁₂', right: '1347' },
      { id: 'ns1m10', left: '20123₄', right: '539' },
      { id: 'ns1m11', left: '1A7B₁₂', right: '3263' },
      { id: 'ns1m12', left: '725₈', right: '469' },
      { id: 'ns1m13', left: '10011010₂', right: '154' },
      { id: 'ns1m14', left: '11111111₂', right: '255' },
      { id: 'ns1m15', left: '2113₄', right: '151' },
      { id: 'ns1m16', left: '3114₅', right: '409' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Felírás más számrendszerben',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'ns1m17', left: '6700 a kettes számrendszerben', right: '1101000101100₂' },
      { id: 'ns1m18', left: '6700 a tizenhatos számrendszerben', right: '1A2C₁₆' },
      { id: 'ns1m19', left: '469 a tizenkettes számrendszerben', right: '331₁₂' },
      { id: 'ns1m20', left: '100 a nyolcas számrendszerben', right: '144₈' },
      { id: 'ns1m21', left: '100 a kettes számrendszerben', right: '1100100₂' },
      { id: 'ns1m22', left: '100 a tizenkettes számrendszerben', right: '84₁₂' },
      { id: 'ns1m23', left: '111₂ + 1₂', right: '1000₂' },
      { id: 'ns1m24', left: '1000₆ + 100₈ + 101₂ (tízesben)', right: '285' }
    ]
  }
];

const NUMERAL_SYSTEMS1_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NUMERAL_SYSTEMS1_MATCHER_LEVELS_LIST[0],
  2: NUMERAL_SYSTEMS1_MATCHER_LEVELS_LIST[1],
  3: NUMERAL_SYSTEMS1_MATCHER_LEVELS_LIST[2]
};

export const NumeralSystems1Matcher: React.FC<NumeralSystems1MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-num-szamrendszer-elso-matcher',
  topicTitle = '7. Számrendszerek I. – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="szamrendszerek-1"
      title={topicTitle}
      subtitle="Párosítsd a számrendszereket a számjegyeikkel, és a más alapú számokat tízes számrendszerbeli értékükkel!"
      levels={NUMERAL_SYSTEMS1_MATCHER_LEVELS}
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

export default NumeralSystems1Matcher;
