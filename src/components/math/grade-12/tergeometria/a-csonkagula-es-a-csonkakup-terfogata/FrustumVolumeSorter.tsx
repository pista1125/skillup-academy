import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FrustumVolumeSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const FRUSTUM_VOLUME_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Melyik test térfogatképlete?",
    description: "Csoportosítsd a képleteket és jellemzőket!",
    categories: [
      { id: 'pyr', name: "Gúla / kúp", color: 'blue' },
      { id: 'frustum', name: "Csonkagúla / csonkakúp", color: 'amber' },
      { id: 'prism', name: "Hasáb / henger", color: 'emerald' }
    ],
    items: [
      { id: 'fvs1', text: "T · M / 3", categoryId: 'pyr' },
      { id: 'fvs2', text: "r²π · m / 3", categoryId: 'pyr' },
      { id: 'fvs3', text: "A fedőlap területe t = 0", categoryId: 'pyr' },
      { id: 'fvs4', text: "M/3 · (T + √(Tt) + t)", categoryId: 'frustum' },
      { id: 'fvs5', text: "Mπ/3 · (R² + Rr + r²)", categoryId: 'frustum' },
      { id: 'fvs6', text: "Nagy gúla − hasonló kis gúla", categoryId: 'frustum' },
      { id: 'fvs7', text: "T · M", categoryId: 'prism' },
      { id: 'fvs8', text: "r²π · m", categoryId: 'prism' },
      { id: 'fvs9', text: "A fedőlap területe t = T", categoryId: 'prism' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Melyik módszer a kényelmesebb?",
    description: "Döntsd el, melyik úton érdemes elindulni!",
    categories: [
      { id: 'ratio', name: "Hasonlósági arány (λ³)", color: 'purple' },
      { id: 'formula', name: "Képlet T-vel, t-vel, M-mel", color: 'teal' },
      { id: 'height', name: "Előbb a magasságot kell kiszámolni", color: 'rose' }
    ],
    items: [
      { id: 'fvs10', text: "A kis gúla magassága az eredeti 60%-a", categoryId: 'ratio' },
      { id: 'fvs11', text: "A kúpot a magassága felénél vágjuk el", categoryId: 'ratio' },
      { id: 'fvs12', text: "A magasságot három egyenlő részre osztó síkok", categoryId: 'ratio' },
      { id: 'fvs13', text: "Ismert az alaplap és a fedőlap területe és a magasság", categoryId: 'formula' },
      { id: 'fvs14', text: "Csonkakúp: R, r és M adott", categoryId: 'formula' },
      { id: 'fvs15', text: "Négyzetes csonkagúla: a, b és M adott", categoryId: 'formula' },
      { id: 'fvs16', text: "Csonkakúp: R, r és az alkotó adott", categoryId: 'height' },
      { id: 'fvs17', text: "Csonkagúla: a, b és az oldalél hajlásszöge adott", categoryId: 'height' },
      { id: 'fvs18', text: "Csonkakúp: R, r és az alkotó hajlásszöge adott", categoryId: 'height' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Igaz vagy hamis?",
    description: "Válogasd szét az állításokat!",
    categories: [
      { id: 'true', name: "Mindig igaz", color: 'emerald' },
      { id: 'false', name: "Hamis", color: 'rose' },
      { id: 'depends', name: "Az adatoktól függ", color: 'amber' }
    ],
    items: [
      { id: 'fvs19', text: "V = M/3 · (T + √(Tt) + t) t = 0-ra a gúla térfogatát adja", categoryId: 'true' },
      { id: 'fvs20', text: "A levágott kis gúla hasonló az eredeti gúlához", categoryId: 'true' },
      { id: 'fvs21', text: "M · (T + t)/2 nagyobb a csonkagúla valódi térfogatánál", categoryId: 'true' },
      { id: 'fvs22', text: "A csonkagúla térfogata M · (T + t)/2", categoryId: 'false' },
      { id: 'fvs23', text: "A kúp magasságának felénél vágva két egyenlő térfogatú rész keletkezik", categoryId: 'false' },
      { id: 'fvs24', text: "λ = 0,6 esetén a kis gúla térfogata az eredeti 60%-a", categoryId: 'false' },
      { id: 'fvs25', text: "A csonkagúla térfogata nagyobb, mint a kiegészítő gúláé", categoryId: 'depends' },
      { id: 'fvs26', text: "A csonkakúp térfogata nagyobb 100 cm³-nél", categoryId: 'depends' },
      { id: 'fvs27', text: "A kiegészítő kúp magasabb, mint a csonkakúp", categoryId: 'depends' }
    ]
  }
];

const FRUSTUM_VOLUME_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: FRUSTUM_VOLUME_SORTER_LEVELS_LIST[0],
  2: FRUSTUM_VOLUME_SORTER_LEVELS_LIST[1],
  3: FRUSTUM_VOLUME_SORTER_LEVELS_LIST[2]
};

export const FrustumVolumeSorter: React.FC<FrustumVolumeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-ter-csonka-terfogat-sorter',
  topicTitle = "16. A csonkagúla és a csonkakúp térfogata – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-csonkagula-es-a-csonkakup-terfogata"
      title={topicTitle}
      subtitle="Rendszerezd a módszereket, a testeket és az állításokat!"
      levels={FRUSTUM_VOLUME_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default FrustumVolumeSorter;
