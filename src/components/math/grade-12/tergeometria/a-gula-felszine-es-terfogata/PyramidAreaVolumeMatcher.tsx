import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PyramidAreaVolumeMatcherProps {
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

const MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Képletek',
    description: 'Párosítsd a mennyiséget a képletével!',
    pairs: [
      { id: 'pavm1', left: 'gúla térfogata', right: 'T_alaplap · M / 3' },
      { id: 'pavm2', left: 'gúla felszíne', right: 'T_alaplap + T_palást' },
      { id: 'pavm3', left: 'szabályos n oldalú gúla palástja', right: 'n · a · mₒ / 2' },
      { id: 'pavm4', left: 'szabályos négyoldalú gúla felszíne', right: 'a² + 2a · mₒ' },
      { id: 'pavm5', left: 'szabályos tetraéder felszíne', right: 'a²√3' },
      { id: 'pavm6', left: 'szabályos tetraéder térfogata', right: 'a³√2 / 12' },
      { id: 'pavm7', left: 'hasáb térfogata (azonos T és M)', right: '3 · V_gúla' },
      { id: 'pavm8', left: 'gúla magassága V-ből', right: '3V / T_alaplap' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Egyszerű számolások',
    description: 'Párosítsd a gúla adatait a kérdezett mennyiséggel!',
    pairs: [
      { id: 'pavm9', left: 'a = 6, M = 10 ⇒ V', right: '120 cm³' },
      { id: 'pavm10', left: 'a = 10, mₒ = 13 ⇒ T_palást', right: '260 cm²' },
      { id: 'pavm11', left: 'a = 10, mₒ = 13 ⇒ A', right: '360 cm²' },
      { id: 'pavm12', left: 'T = 24 cm², M = 5 cm ⇒ V', right: '40 cm³' },
      { id: 'pavm13', left: 'V = 200 cm³, T = 50 cm² ⇒ M', right: '12 cm' },
      { id: 'pavm14', left: 'a = 8, M = 3 ⇒ A', right: '144 cm²' },
      { id: 'pavm15', left: 'a = 8, M = 3 ⇒ V', right: '64 cm³' },
      { id: 'pavm16', left: 'rombusz alap (18 és 15 cm), M = 15 ⇒ V', right: '675 cm³' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tankönyvi feladatok',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'pavm17', left: 'tejszínes doboz térfogata', right: '≈ 166,7 cm³' },
      { id: 'pavm18', left: 'tejszínes doboz kartonja (+5%)', right: '≈ 248 cm²' },
      { id: 'pavm19', left: 'tetőtér térfogata', right: '≈ 97,1 m³' },
      { id: 'pavm20', left: 'tető trapéz lapjának hajlásszöge', right: '≈ 42,4°' },
      { id: 'pavm21', left: '30 cm élű négyzet alapú gúla felszíne', right: '≈ 2458,8 cm²' },
      { id: 'pavm22', left: 'hatoldalú gúla (a = 12, b = 13) térfogata', right: '≈ 623,5 cm³' },
      { id: 'pavm23', left: 'hatoldalú gúla (a = 12, b = 13) felszíne', right: '≈ 789,3 cm²' },
      { id: 'pavm24', left: 'kockába írt derékszögű tetraéder felszíne (10 cm)', right: '≈ 241,4 cm²' }
    ]
  }
];

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MATCHER_LEVELS_LIST[0],
  2: MATCHER_LEVELS_LIST[1],
  3: MATCHER_LEVELS_LIST[2]
};

export const PyramidAreaVolumeMatcher: React.FC<PyramidAreaVolumeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-ter-gula-felszin-terfogat-matcher',
  topicTitle = '11. A gúla felszíne és térfogata – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-gula-felszine-es-terfogata"
      title={topicTitle}
      subtitle="Gyakorold a gúla felszínének és térfogatának képleteit és a tankönyvi feladatok eredményeit!"
      levels={MATCHER_LEVELS}
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

export default PyramidAreaVolumeMatcher;
