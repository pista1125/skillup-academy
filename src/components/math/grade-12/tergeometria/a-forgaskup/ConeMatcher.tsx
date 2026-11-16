import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ConeMatcherProps {
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
    title: '1. szint: Fogalmak',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'conem1', left: 'forgáskúp', right: 'egyenlő szárú háromszög forgatása a szimmetriatengelye körül' },
      { id: 'conem2', left: 'alkotó (a)', right: 'a csúcsot az alapkör egy pontjával összekötő szakasz' },
      { id: 'conem3', left: 'magasság (M)', right: 'a csúcs és az alapkör középpontjának távolsága' },
      { id: 'conem4', left: 'nyílásszög (φ)', right: 'a tengelymetszet szárszöge' },
      { id: 'conem5', left: 'tengelymetszet', right: 'egyenlő szárú háromszög (alap 2r, szárak a)' },
      { id: 'conem6', left: 'alapkör', right: 'r sugarú körlap' },
      { id: 'conem7', left: 'palást', right: 'a kúpot az alapkörön kívül határoló görbült felület' },
      { id: 'conem8', left: 'egyenes körkúp', right: 'a forgáskúp másik neve' }
    ]
  },
  {
    level: 2,
    title: '2. szint: A tengelymetszet összefüggései',
    description: 'Párosítsd az ismeretlent a kiszámítás módjával!',
    pairs: [
      { id: 'conem9', left: 'a', right: '√(r² + M²)' },
      { id: 'conem10', left: 'M', right: '√(a² − r²)' },
      { id: 'conem11', left: 'r', right: '√(a² − M²)' },
      { id: 'conem12', left: 'sin(φ/2)', right: 'r / a' },
      { id: 'conem13', left: 'tg(φ/2)', right: 'r / M' },
      { id: 'conem14', left: 'cos(φ/2)', right: 'M / a' },
      { id: 'conem15', left: 'alkotó–alaplap szög', right: '90° − φ/2' },
      { id: 'conem16', left: 'tengelymetszet területe', right: 'r · M' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tankönyvi feladatok',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'conem17', left: '20 cm-es triangulum: M', right: '10√3 ≈ 17,3 cm' },
      { id: 'conem18', left: '20 cm-es triangulum: alapkör kerülete', right: '20π ≈ 62,8 cm' },
      { id: 'conem19', left: 'alkotó 24 mm, átmérő 2 cm: φ', right: '≈ 49,2°' },
      { id: 'conem20', left: 'T = 1256,6 cm², M = K/4: φ', right: '≈ 65,0°' },
      { id: 'conem21', left: 'átfogó 51, befogó 24 (hosszabbik körül): φ', right: '≈ 56,1°' },
      { id: 'conem22', left: 'alkotó 2 dm, φ = 40°: tengelymetszet kerülete', right: '≈ 5,37 dm' },
      { id: 'conem23', left: 'alkotó 2 dm, φ = 40°: tengelymetszet területe', right: '≈ 1,29 dm²' },
      { id: 'conem24', left: 'kettős kúp (50°, T = 1964 cm²): rombusz oldala', right: '≈ 59,2 cm' }
    ]
  }
];

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MATCHER_LEVELS_LIST[0],
  2: MATCHER_LEVELS_LIST[1],
  3: MATCHER_LEVELS_LIST[2]
};

export const ConeMatcher: React.FC<ConeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-ter-forgaskup-matcher',
  topicTitle = '12. A forgáskúp – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-forgaskup"
      title={topicTitle}
      subtitle="Gyakorold a forgáskúp részeit, a tengelymetszet összefüggéseit és a nyílásszög kiszámítását!"
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

export default ConeMatcher;
