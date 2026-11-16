import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Scaling4MatcherProps {
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

const SCALING4_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mi nagyít, mi kicsinyít?',
    description: 'Párosítsd a tárgyakat és a fogalmakat a jelentésükkel!',
    pairs: [
      { id: 'scm1', left: 'nagyító', right: 'a katicát nagyobbnak mutatja' },
      { id: 'scm2', left: 'térkép', right: 'egy ország kicsinyített mása papíron' },
      { id: 'scm3', left: 'földgömb', right: 'a Föld kicsinyített mása' },
      { id: 'scm4', left: 'vetítő (projektor)', right: 'a képet nagyítva vetíti a falra' },
      { id: 'scm5', left: 'mikroszkóp', right: 'egészen apró dolgokat nagyít fel' },
      { id: 'scm6', left: 'hasonló alakzatok', right: 'ugyanolyan alakúak, de nem ugyanakkorák' },
      { id: 'scm7', left: 'kétszeresére nagyítás', right: 'minden méret 2-szer akkora lesz' },
      { id: 'scm8', left: 'felére kicsinyítés', right: 'minden méret fele akkora lesz' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Téglalapok nagyítva, kicsinyítve',
    description: 'Párosítsd a téglalapot (széles · magas, kis négyzetekben) a nagyított vagy kicsinyített képével!',
    pairs: [
      { id: 'scm9', left: '3 · 2, kétszeresére', right: '6 · 4' },
      { id: 'scm10', left: '6 · 4, felére', right: '3 · 2' },
      { id: 'scm11', left: '1 · 1, háromszorosára', right: '3 · 3' },
      { id: 'scm12', left: '2 · 5, kétszeresére', right: '4 · 10' },
      { id: 'scm13', left: '4 · 4, felére', right: '2 · 2' },
      { id: 'scm14', left: '8 · 2, felére', right: '4 · 1' },
      { id: 'scm15', left: '3 · 1, háromszorosára', right: '9 · 3' },
      { id: 'scm16', left: '5 · 2, kétszeresére', right: '10 · 4' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Lépéssorok és darabszámok',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'scm17', left: '2→, 3↓, 2←, 3↑ kétszerezve', right: '4→, 6↓, 4←, 6↑' },
      { id: 'scm18', left: '2→, 3↓, 2←, 3↑ kettőt hozzáadva', right: '4→, 5↓, 4←, 5↑ (nem hasonló)' },
      { id: 'scm19', left: '4f, 2j, 4l, 2b felezve', right: '2f, 1j, 2l, 1b' },
      { id: 'scm20', left: '1É, 2K, 1D, 2NY négyszerezve', right: '4É, 8K, 4D, 8NY' },
      { id: 'scm21', left: '1→, 1↓, 1←, 1↑ háromszorozva', right: '3→, 3↓, 3←, 3↑' },
      { id: 'scm22', left: '1 kis négyzet kétszeresére nagyítva', right: '4 kis négyzet' },
      { id: 'scm23', left: '2 · 2-es négyzet kétszeresére nagyítva', right: '16 kis négyzet' },
      { id: 'scm24', left: 'A 10 egység kerületű téglalap kétszeresére nagyítva', right: '20 egység kerület' }
    ]
  }
];

const SCALING4_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SCALING4_MATCHER_LEVELS_LIST[0],
  2: SCALING4_MATCHER_LEVELS_LIST[1],
  3: SCALING4_MATCHER_LEVELS_LIST[2]
};

export const Scaling4Matcher: React.FC<Scaling4MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-geom-nagyitas-matcher',
  topicTitle = '5. Nagyítás, kicsinyítés – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId={topicId}
      subtopicId="nagyitas-kicsinyites"
      title={topicTitle}
      subtitle="Gyakorold a nagyítást és a kicsinyítést: eszközök, téglalapok, lépéssorok!"
      levels={SCALING4_MATCHER_LEVELS}
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

export default Scaling4Matcher;
