import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RationalExponents1MatcherProps {
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

const RATIONAL_EXPONENTS_1_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hatvány ↔ gyök',
    description: 'Párosítsd az 1/n kitevőjű hatványt a gyökös alakjával!',
    pairs: [
      { id: 're1m1', left: 'a¹⁄ⁿ', right: 'ⁿ√a' },
      { id: 're1m2', left: '16¹⁄²', right: '√16' },
      { id: 're1m3', left: '8¹⁄³', right: '∛8' },
      { id: 're1m4', left: '81¹⁄⁴', right: '⁴√81' },
      { id: 're1m5', left: '32¹⁄⁵', right: '⁵√32' },
      { id: 're1m6', left: '2¹⁄¹²', right: '¹²√2' },
      { id: 're1m7', left: '1,011¹⁄³', right: '∛1,011' },
      { id: 're1m8', left: '1,3¹⁄⁷', right: '⁷√1,3' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számolás fejben',
    description: 'Párosítsd a hatványt a pontos értékével!',
    pairs: [
      { id: 're1m9', left: '16¹⁄²', right: '4' },
      { id: 're1m10', left: '8¹⁄³', right: '2' },
      { id: 're1m11', left: '81¹⁄⁴', right: '3' },
      { id: 're1m12', left: '1000¹⁄³', right: '10' },
      { id: 're1m13', left: '0,04¹⁄²', right: '0,2' },
      { id: 're1m14', left: '6,25¹⁄²', right: '2,5' },
      { id: 're1m15', left: '0,125¹⁄³', right: '0,5' },
      { id: 're1m16', left: '(7⁴)¹⁄²', right: '49' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Modellek',
    description: 'Párosítsd a tankönyvi modell kérdését az eredménnyel!',
    pairs: [
      { id: 're1m17', left: 'Népesség: szorzó 1/3 év alatt', right: '∛1,011 ≈ 1,0037' },
      { id: 're1m18', left: 'Tavirózsa: napi szorzó', right: '⁷√1,3 ≈ 1,0382' },
      { id: 're1m19', left: 'Két szomszédos félhang hányadosa', right: '¹²√2 ≈ 1,0595' },
      { id: 're1m20', left: 'A kvint (7 félhang) frekvenciaaránya', right: '≈ 1,498' },
      { id: 're1m21', left: 'Világnépesség 2011. október végén', right: '≈ 7,006 milliárd fő' },
      { id: 're1m22', left: 'Tavirózsák területe a 7. napon', right: '10,4 m²' },
      { id: 're1m23', left: 'Magyarország népessége 2013. január 1-jén', right: '≈ 9957 ezer fő' },
      { id: 're1m24', left: 'A 3. felharmonikus távolsága az alaphangtól', right: '19 félhang' }
    ]
  }
];

const RATIONAL_EXPONENTS_1_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: RATIONAL_EXPONENTS_1_MATCHER_LEVELS_LIST[0],
  2: RATIONAL_EXPONENTS_1_MATCHER_LEVELS_LIST[1],
  3: RATIONAL_EXPONENTS_1_MATCHER_LEVELS_LIST[2]
};

export const RationalExponents1Matcher: React.FC<RationalExponents1MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-exp-tortkitevo-elso-matcher',
  topicTitle = '3. Racionális számok a kitevőben I. – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="racionalis-szamok-kitevoben-1"
      title={topicTitle}
      subtitle="Párosítsd az 1/n kitevős hatványokat a gyökös alakjukkal, az értékükkel és a modellek eredményeivel!"
      levels={RATIONAL_EXPONENTS_1_MATCHER_LEVELS}
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

export default RationalExponents1Matcher;
