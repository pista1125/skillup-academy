import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ConeAreaVolumeMatcherProps {
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
      { id: 'cavm1', left: 'palást területe', right: 'rπa' },
      { id: 'cavm2', left: 'kúp felszíne', right: 'rπ(r + a)' },
      { id: 'cavm3', left: 'kúp térfogata', right: 'r²π · M / 3' },
      { id: 'cavm4', left: 'alaplap területe', right: 'r²π' },
      { id: 'cavm5', left: 'kiterített palást középponti szöge', right: '360° · r / a' },
      { id: 'cavm6', left: 'kiterített palást ívhossza', right: '2rπ' },
      { id: 'cavm7', left: 'körcikk területe', right: 'i · r / 2' },
      { id: 'cavm8', left: 'alkotó', right: '√(r² + M²)' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Egyszerű számolások',
    description: 'Párosítsd a kúp adatait az eredménnyel!',
    pairs: [
      { id: 'cavm9', left: 'r = 3, M = 4 ⇒ T_palást', right: '15π cm²' },
      { id: 'cavm10', left: 'r = 3, M = 4 ⇒ A', right: '24π cm²' },
      { id: 'cavm11', left: 'r = 3, M = 4 ⇒ V', right: '12π cm³' },
      { id: 'cavm12', left: 'r = 5, M = 9 ⇒ V', right: '75π cm³' },
      { id: 'cavm13', left: 'r = 6, a = 10 ⇒ α', right: '216°' },
      { id: 'cavm14', left: 'r = 5, a = 10 ⇒ α', right: '180° (félkör)' },
      { id: 'cavm15', left: 'henger 90 cm³ ⇒ azonos kúp', right: '30 cm³' },
      { id: 'cavm16', left: 'kúp : gömb : henger (Arkhimédész)', right: '1 : 2 : 3' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tankönyvi feladatok',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'cavm17', left: 'd = 7,5 cm, M = 9 cm ⇒ A', right: '≈ 159,0 cm²' },
      { id: 'cavm18', left: 'd = 7,5 cm, M = 9 cm ⇒ V', right: '≈ 132,5 cm³' },
      { id: 'cavm19', left: 'r = 2,1 dm, a = 2,9 dm ⇒ V', right: '≈ 9,24 dm³' },
      { id: 'cavm20', left: 'r = 2,1 dm, a = 2,9 dm ⇒ palást szöge', right: '≈ 260,7°' },
      { id: 'cavm21', left: 'sóderkupac (d = 3 m, M = 0,8 m)', right: '≈ 1,88 m³' },
      { id: 'cavm22', left: 'papírcsákó (132°, ív 44 cm) magassága', right: '≈ 18 cm' },
      { id: 'cavm23', left: 'popcorn-tölcsér (R = 20, ív 60) térfogata', right: '≈ 1678 cm³' },
      { id: 'cavm24', left: 'Arkhimédész-kúp felszíne (r = 5)', right: '25π(1 + √5) ≈ 254 cm²' }
    ]
  }
];

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MATCHER_LEVELS_LIST[0],
  2: MATCHER_LEVELS_LIST[1],
  3: MATCHER_LEVELS_LIST[2]
};

export const ConeAreaVolumeMatcher: React.FC<ConeAreaVolumeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-ter-forgaskup-felszin-terfogat-matcher',
  topicTitle = '13. A forgáskúp felszíne és térfogata – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-forgaskup-felszine-es-terfogata"
      title={topicTitle}
      subtitle="Gyakorold a kúp palástjának, felszínének és térfogatának kiszámítását!"
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

export default ConeAreaVolumeMatcher;
