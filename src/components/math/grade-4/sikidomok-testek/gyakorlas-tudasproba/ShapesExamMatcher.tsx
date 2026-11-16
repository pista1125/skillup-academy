import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ShapesExamMatcherProps {
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

const SHAPES_EXAM_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Síkidomok és a kör',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'sem1', left: 'síkidom', right: 'egyenes vagy görbe vonal is határolhatja' },
      { id: 'sem2', left: 'sokszög', right: 'csak egyenes szakaszok határolják' },
      { id: 'sem3', left: 'átló', right: 'két nem szomszédos csúcsot köt össze' },
      { id: 'sem4', left: 'téglalap', right: 'négyszög, minden szöge derékszög' },
      { id: 'sem5', left: 'négyzet', right: 'téglalap, minden oldala egyenlő hosszú' },
      { id: 'sem6', left: 'párhuzamos egyenesek', right: 'sosem találkoznak' },
      { id: 'sem7', left: 'a kör középpontja', right: 'ettől a kör minden pontja ugyanolyan messze van' },
      { id: 'sem8', left: 'körző', right: 'ezzel rajzolunk kört' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Testek és szimmetria',
    description: 'Párosítsd a kérdést a válasszal!',
    pairs: [
      { id: 'sem9', left: 'a kocka lapjai', right: '6 egyforma négyzet' },
      { id: 'sem10', left: 'a téglatest élei', right: '12 él' },
      { id: 'sem11', left: 'a kocka csúcsai', right: '8 csúcs' },
      { id: 'sem12', left: 'a gömb', right: 'görbe felület határolja' },
      { id: 'sem13', left: 'a henger', right: 'síklap és görbe felület is határolja' },
      { id: 'sem14', left: 'az alaprajz', right: 'felülnézet a tornyok magasságával' },
      { id: 'sem15', left: 'a négyzet szimmetriatengelyei', right: '4 tengely' },
      { id: 'sem16', left: 'a kör szimmetriatengelyei', right: 'végtelen sok tengely' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mozgások és tájékozódás',
    description: 'Párosítsd a mozgást vagy a jelölést a leírásával!',
    pairs: [
      { id: 'sem17', left: 'tükrözés', right: 'ugyanakkora, de fordított kép' },
      { id: 'sem18', left: 'eltolás', right: 'irány és távolság kell hozzá, nem fordul el' },
      { id: 'sem19', left: 'elforgatás', right: 'a tű körül fordul, például negyed fordulattal' },
      { id: 'sem20', left: 'kétszeresére nagyítás', right: 'minden méret · 2, az alak marad' },
      { id: 'sem21', left: 'felére kicsinyítés', right: 'minden méret : 2' },
      { id: 'sem22', left: 'G1', right: 'a G jelű oszlop 1-es mezője' },
      { id: 'sem23', left: 'e1', right: 'itt áll a világos király a sakkjáték elején' },
      { id: 'sem24', left: '3É', right: '3 lépés észak felé' }
    ]
  }
];

const SHAPES_EXAM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SHAPES_EXAM_MATCHER_LEVELS_LIST[0],
  2: SHAPES_EXAM_MATCHER_LEVELS_LIST[1],
  3: SHAPES_EXAM_MATCHER_LEVELS_LIST[2]
};

export const ShapesExamMatcher: React.FC<ShapesExamMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-geom-tudasproba-matcher',
  topicTitle = '9. Gyakorlás, tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Ismételd át a fejezet fogalmait: síkidomok, testek, szimmetria, mozgások, tájékozódás!"
      levels={SHAPES_EXAM_MATCHER_LEVELS}
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

export default ShapesExamMatcher;
