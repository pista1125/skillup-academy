import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PrismAreaVolumeMatcherProps {
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

const PRISM_AREA_VOLUME_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Képletek',
    description: 'Párosítsd a mennyiséget a képletével!',
    pairs: [
      { id: 'pavm1', left: 'hasáb térfogata', right: 'V = T_alaplap · M' },
      { id: 'pavm2', left: 'egyenes hasáb felszíne', right: 'A = 2 · T_alaplap + K_alaplap · M' },
      { id: 'pavm3', left: 'egyenes hasáb palástja', right: 'T_palást = K_alaplap · M' },
      { id: 'pavm4', left: 'kocka térfogata', right: 'V = a³' },
      { id: 'pavm5', left: 'kocka felszíne', right: 'A = 6a²' },
      { id: 'pavm6', left: 'téglatest térfogata', right: 'V = abc' },
      { id: 'pavm7', left: 'téglatest felszíne', right: 'A = 2(ab + bc + ca)' },
      { id: 'pavm8', left: 'ferde hasáb felszíne', right: 'A = 2 · T_alaplap + a paralelogrammák területe' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Számolj!',
    description: 'Párosítsd a testet a kért mennyiséggel!',
    pairs: [
      { id: 'pavm9', left: '4 cm élű kocka térfogata', right: '64 cm³' },
      { id: 'pavm10', left: '3 cm élű kocka felszíne', right: '54 cm²' },
      { id: 'pavm11', left: '2 × 3 × 4 cm-es téglatest felszíne', right: '52 cm²' },
      { id: 'pavm12', left: '5 × 3 × 6 cm-es téglatest térfogata', right: '90 cm³' },
      { id: 'pavm13', left: 'K = 20 cm, M = 6 cm egyenes hasáb palástja', right: '120 cm²' },
      { id: 'pavm14', left: '3 és 4 cm befogójú háromszög alapú, 10 cm magas hasáb térfogata', right: '60 cm³' },
      { id: 'pavm15', left: '5 cm alapélű, 8 cm magas négyzetes oszlop térfogata', right: '200 cm³' },
      { id: 'pavm16', left: '150 cm² felszínű kocka térfogata', right: '125 cm³' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Gyakorlati feladatok',
    description: 'Párosítsd a feladatot az eredménnyel!',
    pairs: [
      { id: 'pavm17', left: 'a kalapácsfej tömege', right: '≈ 500 g' },
      { id: 'pavm18', left: 'a vízelvezető árok mélysége', right: '37,5 cm' },
      { id: 'pavm19', left: '120 m-es árokszakaszba férő víz', right: '112 500 liter' },
      { id: 'pavm20', left: 'az I-tartó anyagának sűrűsége', right: '≈ 7,84 g/cm³' },
      { id: 'pavm21', left: 'a dobogó felszíne alsó lapok nélkül', right: '24 525 cm²' },
      { id: 'pavm22', left: 'a 2240 literes hatszög alapú medence alapéle', right: '≈ 1,2 m' },
      { id: 'pavm23', left: 'a nyolcszög alapú (bűvös kocka) hasáb térfogata', right: '21 térfogategység' },
      { id: 'pavm24', left: '3-szoros nagyításnál a térfogat', right: '27-szeres' }
    ]
  }
};

export const PrismAreaVolumeMatcher: React.FC<PrismAreaVolumeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-ter-hasab-felszin-terfogat-matcher',
  topicTitle = '3. A hasáb felszíne és térfogata – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-hasab-felszine-es-terfogata"
      title={topicTitle}
      subtitle="Gyakorold a hasáb felszínének és térfogatának képleteit és a gyakorlati feladatokat!"
      levels={PRISM_AREA_VOLUME_MATCHER_LEVELS}
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

export default PrismAreaVolumeMatcher;
