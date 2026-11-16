import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MulRelationsMatcherProps {
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

const MUL_RELATIONS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Következtetés',
    description: 'Mennyibe kerül? Következtess az ismert árból!',
    pairs: [
      { id: 'mrm1', left: '20 kg, ha 10 kg 1400 Ft', right: '2800 Ft' },
      { id: 'mrm2', left: '9 kg, ha 3 kg 900 Ft', right: '2700 Ft' },
      { id: 'mrm3', left: '15 db, ha 5 db 3000 Ft', right: '9000 Ft' },
      { id: 'mrm4', left: '2 kg, ha 8 kg 1600 Ft', right: '400 Ft' },
      { id: 'mrm5', left: '1 hét, ha 1 nap 425 Ft', right: '2975 Ft' },
      { id: 'mrm6', left: '5 nap, ha 1 nap 425 Ft', right: '2125 Ft' },
      { id: 'mrm7', left: '10 fő, ha 1 fő 320 Ft', right: '3200 Ft' },
      { id: 'mrm8', left: '30 fő, ha 10 fő 3200 Ft', right: '9600 Ft' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Duplázás és felezés',
    description: 'Az egyik tényezőt duplázzuk, a másikat felezzük. Melyik szorzattal egyenlő?',
    pairs: [
      { id: 'mrm9', left: '61 · 80', right: '122 · 40' },
      { id: 'mrm10', left: '120 · 21', right: '60 · 42' },
      { id: 'mrm11', left: '25 · 24', right: '50 · 12' },
      { id: 'mrm12', left: '35 · 14', right: '70 · 7' },
      { id: 'mrm13', left: '48 · 25', right: '24 · 50' },
      { id: 'mrm14', left: '150 · 24', right: '75 · 48' },
      { id: 'mrm15', left: '16 · 250', right: '32 · 125' },
      { id: 'mrm16', left: '64 · 50', right: '128 · 25' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Összevonás',
    description: 'Vond össze a szorzásokat! Melyik rövidebb alakkal egyenlő?',
    pairs: [
      { id: 'mrm17', left: '26 · 14 + 45 · 14', right: '71 · 14' },
      { id: 'mrm18', left: '57 · 23 + 17 · 23', right: '74 · 23' },
      { id: 'mrm19', left: '134 · 42 − 118 · 42', right: '16 · 42' },
      { id: 'mrm20', left: '432 · 19 − 357 · 19', right: '75 · 19' },
      { id: 'mrm21', left: '62 · 32 − 62 · 16', right: '62 · 16' },
      { id: 'mrm22', left: '27 · 37 − 27 · 17', right: '27 · 20' },
      { id: 'mrm23', left: '55 · 18 + 127 · 18', right: '182 · 18' },
      { id: 'mrm24', left: '61 · 10 · 10', right: '61 · 100' }
    ]
  }
];

const MUL_RELATIONS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MUL_RELATIONS_MATCHER_LEVELS_LIST[0],
  2: MUL_RELATIONS_MATCHER_LEVELS_LIST[1],
  3: MUL_RELATIONS_MATCHER_LEVELS_LIST[2]
};

export const MulRelationsMatcher: React.FC<MulRelationsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-wmult-osszefuggesek-matcher',
  topicTitle = '3. Összefüggések, következtetések – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="osszefuggesek-kovetkeztetesek"
      title={topicTitle}
      subtitle="Következtess, és párosítsd az egyenlő értékeket!"
      levels={MUL_RELATIONS_MATCHER_LEVELS}
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

export default MulRelationsMatcher;
