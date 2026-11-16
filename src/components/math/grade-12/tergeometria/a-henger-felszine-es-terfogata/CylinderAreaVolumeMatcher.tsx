import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CylinderAreaVolumeMatcherProps {
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

const CYLINDER_AREA_VOLUME_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Képletek',
    description: 'Párosítsd a mennyiséget a képletével!',
    pairs: [
      { id: 'cavm1', left: 'alapkör területe', right: 'r²π' },
      { id: 'cavm2', left: 'alapkör kerülete', right: '2rπ' },
      { id: 'cavm3', left: 'palást területe', right: '2rπ · M' },
      { id: 'cavm4', left: 'henger felszíne', right: '2r²π + 2rπM' },
      { id: 'cavm5', left: 'henger térfogata', right: 'r²π · M' },
      { id: 'cavm6', left: 'egyenlő oldalú henger felszíne', right: '6r²π' },
      { id: 'cavm7', left: 'egyenlő oldalú henger térfogata', right: '2r³π' },
      { id: 'cavm8', left: 'nyitott edény (pohár) felszíne', right: 'r²π + 2rπM' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Számolj!',
    description: 'Párosítsd a hengert a kért mennyiséggel!',
    pairs: [
      { id: 'cavm9', left: 'r = 3 cm, M = 10 cm: térfogat', right: '90π cm³' },
      { id: 'cavm10', left: 'r = 2 cm, M = 5 cm: palást', right: '20π cm²' },
      { id: 'cavm11', left: 'r = 5 cm, M = 10 cm: felszín', right: '150π cm²' },
      { id: 'cavm12', left: 'd = 10 cm, M = 4 cm: térfogat', right: '100π cm³' },
      { id: 'cavm13', left: 'egyenlő oldalú, r = 3 cm: térfogat', right: '54π cm³' },
      { id: 'cavm14', left: 'egyenlő oldalú, r = 4 cm: felszín', right: '96π cm²' },
      { id: 'cavm15', left: 'r = 2,5 cm, M = 3 cm: felszín', right: '27,5π cm²' },
      { id: 'cavm16', left: 'r = 5 cm, M = 6 cm: térfogat', right: '150π cm³' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Gyakorlati feladatok',
    description: 'Párosítsd a feladatot az eredménnyel!',
    pairs: [
      { id: 'cavm17', left: 'a nagyobb konzervbe férő májkrém', right: '520 g' },
      { id: 'cavm18', left: 'festék a 40 m²-es falhoz', right: '≈ 4,8 liter' },
      { id: 'cavm19', left: 'a festék magassága a 16 cm-es vödörben', right: '≈ 23,7 cm' },
      { id: 'cavm20', left: 'víz a 3 m átmérőjű medencében (1,2 m magasan)', right: '≈ 8,48 m³' },
      { id: 'cavm21', left: 'a medence egyszeri feltöltésének ára', right: '≈ 5259 Ft' },
      { id: 'cavm22', left: 'a medence bevont belső felülete', right: '≈ 22,15 m²' },
      { id: 'cavm23', left: 'a vízszint 4,5 dl víz után (37,7 cm kerület)', right: '≈ 16 cm' },
      { id: 'cavm24', left: 'a festendő felület a koncertteremben', right: '≈ 637,4 m²' }
    ]
  }
};

export const CylinderAreaVolumeMatcher: React.FC<CylinderAreaVolumeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-ter-henger-felszin-terfogat-matcher',
  topicTitle = '5. A henger felszíne és térfogata – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-henger-felszine-es-terfogata"
      title={topicTitle}
      subtitle="Gyakorold a henger felszínének és térfogatának képleteit és a gyakorlati feladatokat!"
      levels={CYLINDER_AREA_VOLUME_MATCHER_LEVELS}
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

export default CylinderAreaVolumeMatcher;
