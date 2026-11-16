import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ConeAreaVolumeSorterProps {
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

const SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hosszúság, terület, térfogat vagy szög?',
    description: 'Csoportosítsd a kifejezéseket aszerint, hogy mit adnak meg!',
    categories: [
      { id: 'len', name: 'Hosszúság', color: 'blue' },
      { id: 'area', name: 'Terület', color: 'emerald' },
      { id: 'vol', name: 'Térfogat', color: 'amber' }
    ],
    items: [
      { id: 'cavs1', text: '√(r² + M²)', categoryId: 'len' },
      { id: 'cavs2', text: '2rπ', categoryId: 'len' },
      { id: 'cavs3', text: 'ív / (2π)', categoryId: 'len' },
      { id: 'cavs4', text: 'rπa', categoryId: 'area' },
      { id: 'cavs5', text: 'rπ(r + a)', categoryId: 'area' },
      { id: 'cavs6', text: 'r²π', categoryId: 'area' },
      { id: 'cavs7', text: 'r²πM / 3', categoryId: 'vol' },
      { id: 'cavs8', text: 'r²πM', categoryId: 'vol' },
      { id: 'cavs9', text: '4r³π / 3', categoryId: 'vol' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mekkora a palást középponti szöge?',
    description: 'Számold ki α = 360° · r / a értékét, és sorold be!',
    categories: [
      { id: 'lt', name: 'α < 180°', color: 'teal' },
      { id: 'eq', name: 'α = 180°', color: 'purple' },
      { id: 'gt', name: 'α > 180°', color: 'rose' }
    ],
    items: [
      { id: 'cavs10', text: 'r = 3, a = 9', categoryId: 'lt' },
      { id: 'cavs11', text: 'r = 5, a = 13', categoryId: 'lt' },
      { id: 'cavs12', text: 'papírcsákó (132°)', categoryId: 'lt' },
      { id: 'cavs13', text: 'r = 5, a = 10', categoryId: 'eq' },
      { id: 'cavs14', text: 'a = 2r', categoryId: 'eq' },
      { id: 'cavs15', text: 'szabályos háromszög tengelymetszet', categoryId: 'eq' },
      { id: 'cavs16', text: 'r = 6, a = 10', categoryId: 'gt' },
      { id: 'cavs17', text: 'r = 2,1 dm, a = 2,9 dm', categoryId: 'gt' },
      { id: 'cavs18', text: 'r = 4, a = 5', categoryId: 'gt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kisebb vagy nagyobb mint 1 liter?',
    description: 'Számold ki a kúp térfogatát, és döntsd el!',
    categories: [
      { id: 'lt', name: 'V < 1 liter', color: 'blue' },
      { id: 'eq', name: '1 liter ≤ V ≤ 10 liter', color: 'emerald' },
      { id: 'gt', name: 'V > 10 liter', color: 'amber' }
    ],
    items: [
      { id: 'cavs19', text: 'papírpohár (d = 6 cm, M = 9 cm)', categoryId: 'lt' },
      { id: 'cavs20', text: 'd = 7,5 cm, M = 9 cm', categoryId: 'lt' },
      { id: 'cavs21', text: 'r = 3 cm, M = 4 cm', categoryId: 'lt' },
      { id: 'cavs22', text: 'popcorn-tölcsér (≈ 1678 cm³)', categoryId: 'eq' },
      { id: 'cavs23', text: 'r = 2,1 dm, a = 2,9 dm', categoryId: 'eq' },
      { id: 'cavs24', text: 'r = 10 cm, M = 30 cm', categoryId: 'eq' },
      { id: 'cavs25', text: 'sóderkupac (d = 3 m, M = 0,8 m)', categoryId: 'gt' },
      { id: 'cavs26', text: 'r = 3 dm, M = 5 dm', categoryId: 'gt' },
      { id: 'cavs27', text: 'kráter-tó (2,4 km², 6 m mély)', categoryId: 'gt' }
    ]
  }
];

const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SORTER_LEVELS_LIST[0],
  2: SORTER_LEVELS_LIST[1],
  3: SORTER_LEVELS_LIST[2]
};

export const ConeAreaVolumeSorter: React.FC<ConeAreaVolumeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-ter-forgaskup-felszin-terfogat-sorter',
  topicTitle = '13. A forgáskúp felszíne és térfogata – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-forgaskup-felszine-es-terfogata"
      title={topicTitle}
      subtitle="Rendszerezd a kúp mennyiségeit, a térfogatokat és a kiterített palástokat!"
      levels={SORTER_LEVELS}
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

export default ConeAreaVolumeSorter;
