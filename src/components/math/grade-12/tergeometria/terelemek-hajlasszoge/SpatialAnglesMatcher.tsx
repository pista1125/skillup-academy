import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SpatialAnglesMatcherProps {
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

const SPATIAL_ANGLES_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Definíciók',
    description: 'Párosítsd a térelem-párt a hajlásszög értelmezésével vagy értékével!',
    pairs: [
      { id: 'sam1', left: 'Két metsző egyenes hajlásszöge', right: 'A keletkező szögek közül a nem nagyobbik' },
      { id: 'sam2', left: 'Két párhuzamos egyenes szöge', right: '0°' },
      { id: 'sam3', left: 'Egyenes és sík hajlásszöge', right: 'Az egyenes és merőleges vetületének szöge' },
      { id: 'sam4', left: 'Síkra merőleges egyenes szöge a síkkal', right: '90°' },
      { id: 'sam5', left: 'Két metsző sík hajlásszöge', right: 'A metszésvonalra merőleges, síkbeli egyenesek szöge' },
      { id: 'sam6', left: 'Hajlásszögek lehetséges értékei', right: '0° és 90° között' },
      { id: 'sam7', left: 'Egyenes merőleges a síkra, ha …', right: 'merőleges a döféspontján átmenő két síkbeli egyenesre' },
      { id: 'sam8', left: 'A hajlásszög kiszámítása', right: 'alkalmas derékszögű háromszögben, szögfüggvényekkel' }
    ]
  },
  {
    level: 2,
    title: '2. szint: A kocka nevezetes szögei',
    description: 'Párosítsd az ABCDEFGH kocka térelem-párjait a hajlásszögükkel!',
    pairs: [
      { id: 'sam9', left: 'AF lapátló és AB él', right: '45°' },
      { id: 'sam10', left: 'AG testátló és ABCD alaplap', right: '≈ 35,3° (tg = 1/√2)' },
      { id: 'sam11', left: 'AG testátló és AE él', right: '≈ 54,7° (cos = 1/√3)' },
      { id: 'sam12', left: 'Két testátló (AG és CE)', right: '≈ 70,5°' },
      { id: 'sam13', left: 'BDG sík és ABCD alaplap', right: '≈ 54,7° (tg = √2)' },
      { id: 'sam14', left: 'AF és BD lapátló (kitérők)', right: '60°' },
      { id: 'sam15', left: 'AE él és ABCD alaplap', right: '90°' },
      { id: 'sam16', left: 'AB él és EFGH fedőlap', right: '0° (párhuzamos)' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tankönyvi feladatok',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'sam17', left: 'Láda 30 × 6 × 5 cm testátlója', right: '31 cm' },
      { id: 'sam18', left: 'Láda: AG és HB testátló szöge', right: '≈ 29,2°' },
      { id: 'sam19', left: 'Láda: AG és a legnagyobb lap szöge', right: '≈ 9,3°' },
      { id: 'sam20', left: 'Oszlop 5 × 5 × 9: ABGH és az alaplap', right: '≈ 60,9°' },
      { id: 'sam21', left: 'Oszlop 5 × 5 × 9: ACGE területe', right: '45√2 ≈ 63,64 cm²' },
      { id: 'sam22', left: 'Hatszög hasáb, testátló 14 cm, 60° ⇒ alapél', right: '3,5 cm' },
      { id: 'sam23', left: 'Téglatest 5,18 × 3,75 × 9,92: AG és CE', right: '≈ 65,6°' },
      { id: 'sam24', left: 'Oszlop a = 10, m = 7: AK és alaplap', right: '≈ 44,71°' }
    ]
  }
];

const SPATIAL_ANGLES_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SPATIAL_ANGLES_MATCHER_LEVELS_LIST[0],
  2: SPATIAL_ANGLES_MATCHER_LEVELS_LIST[1],
  3: SPATIAL_ANGLES_MATCHER_LEVELS_LIST[2]
};

export const SpatialAnglesMatcher: React.FC<SpatialAnglesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-ter-hajlasszog-matcher',
  topicTitle = '9. Térelemek hajlásszöge – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="terelemek-hajlasszoge"
      title={topicTitle}
      subtitle="Gyakorold a hajlásszögek definícióit, a kocka nevezetes szögeit és a tankönyvi feladatokat!"
      levels={SPATIAL_ANGLES_MATCHER_LEVELS}
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

export default SpatialAnglesMatcher;
