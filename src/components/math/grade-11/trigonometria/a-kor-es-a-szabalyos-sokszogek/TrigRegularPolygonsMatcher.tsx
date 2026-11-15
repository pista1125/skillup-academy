import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TrigRegularPolygonsMatcherProps {
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

const TRIG_REGULAR_POLYGONS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Képletek',
    description: 'Párosítsd a mennyiséget a kiszámítási képletével! (R: köré írt kör sugara, n: oldalszám, α: középponti szög)',
    pairs: [
      {
        id: 'trpm1',
        left: 'Szabályos n-szög középponti szöge',
        right: '360° : n'
      },
      {
        id: 'trpm2',
        left: 'Szabályos n-szög oldala',
        right: 'a = 2R · sin(180° : n)'
      },
      {
        id: 'trpm3',
        left: 'Beírt kör sugara',
        right: 'ρ = R · cos(180° : n)'
      },
      {
        id: 'trpm4',
        left: 'Szabályos n-szög területe',
        right: 'T = n · R² · sin(360° : n) / 2'
      },
      {
        id: 'trpm5',
        left: 'Körív hossza',
        right: 'i = rπα / 180°'
      },
      {
        id: 'trpm6',
        left: 'Körcikk területe (szögből)',
        right: 't = r²πα / 360°'
      },
      {
        id: 'trpm7',
        left: 'Körcikk területe (ívből)',
        right: 't = i · r / 2'
      },
      {
        id: 'trpm8',
        left: 'Körszelet területe',
        right: 'r²πα / 360° − r² · sin α / 2'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: Szabályos sokszögek',
    description: 'Párosítsd a szabályos sokszöget a kért adatával!',
    pairs: [
      {
        id: 'trpm9',
        left: 'Szabályos kilencszög középponti szöge',
        right: '40°'
      },
      {
        id: 'trpm10',
        left: 'Szabályos ötszög középponti szöge',
        right: '72°'
      },
      {
        id: 'trpm11',
        left: 'Szabályos hatszög oldala (R = 4 cm)',
        right: '4 cm'
      },
      {
        id: 'trpm12',
        left: 'Négyzet oldala (R = 5 cm)',
        right: '≈ 7,07 cm'
      },
      {
        id: 'trpm13',
        left: 'Szabályos háromszög oldala (R = 1 m)',
        right: '≈ 1,73 m'
      },
      {
        id: 'trpm14',
        left: 'Szabályos 12-szög területe (R = 1)',
        right: 'pontosan 3'
      },
      {
        id: 'trpm15',
        left: 'Szabályos hatszög területe (R = 4 cm)',
        right: '≈ 41,57 cm²'
      },
      {
        id: 'trpm16',
        left: 'Szabályos kilencszög oldala (R = 17,5 cm)',
        right: '≈ 12 cm'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Körív, körcikk, körszelet',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      {
        id: 'trpm17',
        left: 'Körív: r = 6 cm, α = 60°',
        right: '2π ≈ 6,28 cm'
      },
      {
        id: 'trpm18',
        left: 'Körcikk: r = 6 cm, α = 60°',
        right: '6π ≈ 18,85 cm²'
      },
      {
        id: 'trpm19',
        left: 'Körcikk: i = 10 cm, r = 4 cm',
        right: '20 cm²'
      },
      {
        id: 'trpm20',
        left: 'Körszelet: r = 10 cm, α = 90°',
        right: '≈ 28,54 cm²'
      },
      {
        id: 'trpm21',
        left: 'Középponti szög, ha a húr a sugár 1,6-szerese',
        right: '≈ 106,26°'
      },
      {
        id: 'trpm22',
        left: 'Cső (r = 30 cm, 20 cm víz): a vízfelszín középponti szöge',
        right: '≈ 141,06°'
      },
      {
        id: 'trpm23',
        left: 'Fedetlen asztalrész: 140 cm-es terítő, 160 cm-es asztal',
        right: '≈ 1046 cm²'
      },
      {
        id: 'trpm24',
        left: 'Az 50 pennys érme tömege',
        right: '≈ 8 g'
      }
    ]
  }
];

const TRIG_REGULAR_POLYGONS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: TRIG_REGULAR_POLYGONS_MATCHER_LEVELS_LIST[0],
  2: TRIG_REGULAR_POLYGONS_MATCHER_LEVELS_LIST[1],
  3: TRIG_REGULAR_POLYGONS_MATCHER_LEVELS_LIST[2]
};

export const TrigRegularPolygonsMatcher: React.FC<TrigRegularPolygonsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-trig-szabalyos-sokszogek-matcher',
  topicTitle = '14. A kör és a szabályos sokszögek – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="a-kor-es-a-szabalyos-sokszogek"
      title={topicTitle}
      subtitle="Gyakorold a szabályos sokszögek, a körív, a körcikk és a körszelet képleteit és tankönyvi eredményeit!"
      levels={TRIG_REGULAR_POLYGONS_MATCHER_LEVELS}
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

export default TrigRegularPolygonsMatcher;
