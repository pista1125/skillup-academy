import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ExponentialInequalitiesMatcherProps {
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

const EXPONENTIAL_INEQUALITIES_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Közös alappal',
    description: 'Írd fel a jobb oldalt az alap hatványaként, figyelj a monotonitásra, és párosítsd a megoldással!',
    pairs: [
      { id: 'eim1', left: '2ˣ > 8', right: 'x > 3' },
      { id: 'eim2', left: '(1/2)ˣ < 8', right: 'x > −3' },
      { id: 'eim3', left: '3ˣ ≤ 2187', right: 'x ≤ 7' },
      { id: 'eim4', left: '0,5ˣ ≥ 4', right: 'x ≤ −2' },
      { id: 'eim5', left: '1,2ˣ ≥ 1,44', right: 'x ≥ 2' },
      { id: 'eim6', left: '1,2ˣ < 1', right: 'x < 0' },
      { id: 'eim7', left: '10ˣ < 0,001', right: 'x < −3' },
      { id: 'eim8', left: '4ˣ < 8', right: 'x < 1,5' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Határok logaritmussal',
    description: 'A határ x = lg b / lg a; ha 0 < a < 1, a relációjel fordul. Párosítsd!',
    pairs: [
      { id: 'eim9', left: '2ˣ ≥ 10', right: 'x ≥ 3,322' },
      { id: 'eim10', left: '0,8ˣ < 0,5', right: 'x > 3,106' },
      { id: 'eim11', left: '1 ≤ 1,5ˣ ≤ 10', right: '0 ≤ x ≤ 5,679' },
      { id: 'eim12', left: '1,15 < 1,002ˣ < 1,2', right: '69,95 < x < 91,25' },
      { id: 'eim13', left: '0,06 < 0,6ˣ < 6', right: '−3,508 < x < 5,508' },
      { id: 'eim14', left: '1,08ˣ > 10', right: 'x > 29,92' },
      { id: 'eim15', left: '0,94ˣ > 0,02', right: 'x < 63,22' },
      { id: 'eim16', left: '0,854ˣ < 0,25', right: 'x > 8,78' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Modellfeladat ↔ eredmény',
    description: 'Párosítsd a tankönyvi feladatot az (egész értékekre kerekített) eredménnyel!',
    pairs: [
      { id: 'eim17', left: 'Részvény: 2300 < 2000 · 1,002ˣ < 2400', right: 'a 70.–91. napon' },
      { id: 'eim18', left: 'Webáruház: először 100 fölött', right: 'a 30. napon' },
      { id: 'eim19', left: 'Webáruház: 1250 és 1750 között áll meg', right: 'kb. 63–67 nap' },
      { id: 'eim20', left: 'Korosztály: P(x) > 1 millió', right: '41–63 évesek' },
      { id: 'eim21', left: '¹⁴C-tartalom több mint 15%', right: 'kevesebb mint ≈ 15 683 év' },
      { id: 'eim22', left: 'Tigrisek: változás 2016 végéig', right: '≈ 27,1%-os csökkenés' },
      { id: 'eim23', left: 'Tigrisek: 900 alá', right: '2023' },
      { id: 'eim24', left: '2000 Ft, 5%: több mint 3000 Ft', right: 'legalább 9 év' }
    ]
  }
];

const EXPONENTIAL_INEQUALITIES_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: EXPONENTIAL_INEQUALITIES_MATCHER_LEVELS_LIST[0],
  2: EXPONENTIAL_INEQUALITIES_MATCHER_LEVELS_LIST[1],
  3: EXPONENTIAL_INEQUALITIES_MATCHER_LEVELS_LIST[2]
};

export const ExponentialInequalitiesMatcher: React.FC<ExponentialInequalitiesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-exp-exponencialis-egyenlotlenseg-matcher',
  topicTitle = '14. Exponenciális egyenlőtlenségek – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="exponencialis-egyenlotlensegek"
      title={topicTitle}
      subtitle="Párosítsd az exponenciális egyenlőtlenségeket a megoldáshalmazukkal és a modellfeladatokat az eredményükkel!"
      levels={EXPONENTIAL_INEQUALITIES_MATCHER_LEVELS}
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

export default ExponentialInequalitiesMatcher;
