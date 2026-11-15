import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TrigGroupCompetitionMatcherProps {
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

const TRIG_GROUP_COMPETITION_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Az eszköztár',
    description: 'Párosítsd az eszközt a képletével!',
    pairs: [
      {
        id: 'tgcm1',
        left: 'Szinusztétel',
        right: 'a : b = sin α : sin β'
      },
      {
        id: 'tgcm2',
        left: 'Koszinusztétel',
        right: 'c² = a² + b² − 2ab · cos γ'
      },
      {
        id: 'tgcm3',
        left: 'Háromszög területe',
        right: 'a · b · sin γ / 2'
      },
      {
        id: 'tgcm4',
        left: 'Paralelogramma területe (oldalakból)',
        right: 'a · b · sin γ'
      },
      {
        id: 'tgcm5',
        left: 'Paralelogramma területe (átlókból)',
        right: 'e · f · sin φ / 2'
      },
      {
        id: 'tgcm6',
        left: 'sin(180° − α)',
        right: 'sin α'
      },
      {
        id: 'tgcm7',
        left: 'cos(180° − α)',
        right: '−cos α'
      },
      {
        id: 'tgcm8',
        left: 'Körszelet területe',
        right: 'r²πα / 360° − r² · sin α / 2'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: A verseny betűi',
    description: 'Párosítsd a versenyfeladatot az eredményével!',
    pairs: [
      {
        id: 'tgcm9',
        left: '1. feladat: a kerület számjegyeinek összege',
        right: 'A = 6'
      },
      {
        id: 'tgcm10',
        left: '2. feladat: a terület számjegyeinek szorzata',
        right: 'B = 0'
      },
      {
        id: 'tgcm11',
        left: '3. feladat: a torony magassága egészre kerekítve',
        right: 'C = 37'
      },
      {
        id: 'tgcm12',
        left: '4. feladat: a két lehetséges β összege',
        right: 'D = 180'
      },
      {
        id: 'tgcm13',
        left: '5. feladat: a kisebbik körszelet egészre kerekítve',
        right: 'E = 196'
      },
      {
        id: 'tgcm14',
        left: '1. feladat: a paralelogramma hosszabbik oldala',
        right: '35 mm'
      },
      {
        id: 'tgcm15',
        left: '2. feladat: a paralelogramma területe',
        right: '350 mm²'
      },
      {
        id: 'tgcm16',
        left: '3. feladat: a PBQ szög',
        right: '85°'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Részeredmények és házi feladatok',
    description: 'Párosítsd a kérdést a helyes részeredménnyel!',
    pairs: [
      {
        id: 'tgcm17',
        left: '3. feladat: a QB távolság',
        right: '≈ 12,03 m'
      },
      {
        id: 'tgcm18',
        left: '4. feladat: sin β értéke',
        right: '≈ 0,8907'
      },
      {
        id: 'tgcm19',
        left: '4. feladat: β tompaszögű értéke',
        right: '≈ 117,04°'
      },
      {
        id: 'tgcm20',
        left: '5. feladat: a körcikk területe',
        right: '≈ 383,97 cm²'
      },
      {
        id: 'tgcm21',
        left: '5. feladat: az AOB háromszög területe',
        right: '≈ 187,94 cm²'
      },
      {
        id: 'tgcm22',
        left: 'HF 1.: a trapéz BD átlója',
        right: '≈ 58,5 cm'
      },
      {
        id: 'tgcm23',
        left: 'HF 2.: a húrnégyszög negyedik középponti szöge',
        right: '60°'
      },
      {
        id: 'tgcm24',
        left: 'HF 2.: a húrnégyszög területe',
        right: '≈ 7,22 cm²'
      }
    ]
  }
];

const TRIG_GROUP_COMPETITION_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: TRIG_GROUP_COMPETITION_MATCHER_LEVELS_LIST[0],
  2: TRIG_GROUP_COMPETITION_MATCHER_LEVELS_LIST[1],
  3: TRIG_GROUP_COMPETITION_MATCHER_LEVELS_LIST[2]
};

export const TrigGroupCompetitionMatcher: React.FC<TrigGroupCompetitionMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-trig-csoportverseny-matcher',
  topicTitle = '15. Csoportverseny – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="csoportverseny"
      title={topicTitle}
      subtitle="Gyakorold a fejezet eszköztárát és a csoportverseny feladatainak eredményeit!"
      levels={TRIG_GROUP_COMPETITION_MATCHER_LEVELS}
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

export default TrigGroupCompetitionMatcher;
