import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MixedSequencesMatcherProps {
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

const MIXED_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Milyen sorozat?',
    description: 'Párosítsd a sorozat kezdetét a típusával!',
    pairs: [
      { id: 'mxm1', left: '3; 7; 11; 15; …', right: 'számtani, d = 4' },
      { id: 'mxm2', left: '3; 6; 12; 24; …', right: 'mértani, q = 2' },
      { id: 'mxm3', left: '20; 17; 14; 11; …', right: 'számtani, d = −3' },
      { id: 'mxm4', left: '81; 27; 9; 3; …', right: 'mértani, q = 1/3' },
      { id: 'mxm5', left: '5; −10; 20; −40; …', right: 'mértani, q = −2' },
      { id: 'mxm6', left: '7; 7; 7; 7; …', right: 'számtani és mértani is' },
      { id: 'mxm7', left: '1; 4; 9; 16; …', right: 'négyzetszámok (egyik sem)' },
      { id: 'mxm8', left: '1; 1; 2; 3; 5; …', right: 'Fibonacci-sorozat (egyik sem)' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Középső tagok',
    description: 'Párosítsd az adatokat a keresett taggal!',
    pairs: [
      { id: 'mxm9', left: '4; x; 10 számtani sorozat', right: 'x = 7' },
      { id: 'mxm10', left: '4; x; 9 mértani sorozat, x > 0', right: 'x = 6' },
      { id: 'mxm11', left: '2; x; 32 mértani sorozat, x > 0', right: 'x = 8' },
      { id: 'mxm12', left: '3; x; 21 számtani sorozat', right: 'x = 12' },
      { id: 'mxm13', left: 'mértani: a₅ = 4, a₉ = 324', right: 'a₇ = 36' },
      { id: 'mxm14', left: 'számtani: a₃ = 10, a₇ = 30', right: 'a₅ = 20' },
      { id: 'mxm15', left: 'háromszög szögei számtani sorozatban', right: 'a középső szög 60°' },
      { id: 'mxm16', left: '1² + 2² + 3² + 4²', right: '30' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Szöveges feladatok',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'mxm17', left: 'a₁ = 5, d = 2, Sₙ = 357', right: 'n = 17' },
      { id: 'mxm18', left: 'Angéla: 8, 10, … járólap, összesen 858', right: '26 sor' },
      { id: 'mxm19', left: 'faiskola: 40, 44, … csemete, összesen 1020', right: '15 sor' },
      { id: 'mxm20', left: 'a₁ = 16, q = 1,07: 1000-nél kisebb tagok', right: '62 tag' },
      { id: 'mxm21', left: 'a₁ = 10, d = 2, Sₙ > 1000', right: 'legalább 28 tag' },
      { id: 'mxm22', left: 'a₁ = 10, q = 1,2, Sₙ > 1000', right: 'legalább 17 tag' },
      { id: 'mxm23', left: '1² + 2² + … + 25²', right: '5525' },
      { id: 'mxm24', left: 'négyszintes torta cukordíszítése', right: '≈ 189,3 cm' }
    ]
  }
};

export const MixedSequencesMatcher: React.FC<MixedSequencesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-seq-vegyes-matcher',
  topicTitle = '7. Vegyes feladatok – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="vegyes-feladatok"
      title={topicTitle}
      subtitle="Ismerd fel a sorozatokat, számold ki a középső tagokat, és oldd meg a vegyes feladatokat!"
      levels={MIXED_MATCHER_LEVELS}
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

export default MixedSequencesMatcher;
