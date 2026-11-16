import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ShapesExamSorterProps {
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

const SHAPES_EXAM_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Síkidom, sokszög vagy test?',
    description: 'Válogasd szét!',
    categories: [
      { id: 'plane', name: 'Síkidom, de nem sokszög', color: 'emerald' },
      { id: 'poly', name: 'Sokszög', color: 'sky' },
      { id: 'solid', name: 'Test', color: 'amber' }
    ],
    items: [
      { id: 'ses1', text: 'kör', categoryId: 'plane' },
      { id: 'ses2', text: 'félkör', categoryId: 'plane' },
      { id: 'ses3', text: 'tojás alakú (ovális) lap', categoryId: 'plane' },
      { id: 'ses4', text: 'háromszög', categoryId: 'poly' },
      { id: 'ses5', text: 'négyzet', categoryId: 'poly' },
      { id: 'ses6', text: 'L alakú hatszög', categoryId: 'poly' },
      { id: 'ses7', text: 'kocka', categoryId: 'solid' },
      { id: 'ses8', text: 'gömb', categoryId: 'solid' },
      { id: 'ses9', text: 'henger', categoryId: 'solid' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Milyen szög?',
    description: 'Derékszögnél kisebb, derékszög vagy derékszögnél nagyobb?',
    categories: [
      { id: 'less', name: 'Derékszögnél kisebb', color: 'emerald' },
      { id: 'right', name: 'Derékszög', color: 'blue' },
      { id: 'more', name: 'Derékszögnél nagyobb', color: 'orange' }
    ],
    items: [
      { id: 'ses10', text: 'az óramutatók 1 órakor', categoryId: 'less' },
      { id: 'ses11', text: 'az óramutatók 10 órakor', categoryId: 'less' },
      { id: 'ses12', text: 'alig nyitott olló két éle', categoryId: 'less' },
      { id: 'ses13', text: 'az óramutatók 9 órakor', categoryId: 'right' },
      { id: 'ses14', text: 'a füzetlap sarka', categoryId: 'right' },
      { id: 'ses15', text: 'negyed fordulat', categoryId: 'right' },
      { id: 'ses16', text: 'az óramutatók 5 órakor', categoryId: 'more' },
      { id: 'ses17', text: 'az óramutatók 8 órakor', categoryId: 'more' },
      { id: 'ses18', text: 'az L alakú sokszög beugró sarka (belülről)', categoryId: 'more' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tükrözés, eltolás vagy elforgatás?',
    description: 'Melyik mozgás történik?',
    categories: [
      { id: 'mirror', name: 'Tükrözés', color: 'purple' },
      { id: 'shift', name: 'Eltolás', color: 'orange' },
      { id: 'rot', name: 'Elforgatás', color: 'teal' }
    ],
    items: [
      { id: 'ses19', text: 'Az arcunk a tükörben', categoryId: 'mirror' },
      { id: 'ses20', text: 'A fák képe a tó vizén', categoryId: 'mirror' },
      { id: 'ses21', text: 'Félbehajtott lapra nyomott festékfolt másik fele', categoryId: 'mirror' },
      { id: 'ses22', text: 'A tolóajtó kinyitása', categoryId: 'shift' },
      { id: 'ses23', text: 'A busz az egyenes úton megállóról megállóra', categoryId: 'shift' },
      { id: 'ses24', text: 'A szék 1 m-rel keletre tolva', categoryId: 'shift' },
      { id: 'ses25', text: 'A körhinta forgása', categoryId: 'rot' },
      { id: 'ses26', text: 'A nagymutató útja 15 perc alatt', categoryId: 'rot' },
      { id: 'ses27', text: 'A sablon a gombostű körül', categoryId: 'rot' }
    ]
  }
];

const SHAPES_EXAM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SHAPES_EXAM_SORTER_LEVELS_LIST[0],
  2: SHAPES_EXAM_SORTER_LEVELS_LIST[1],
  3: SHAPES_EXAM_SORTER_LEVELS_LIST[2]
};

export const ShapesExamSorter: React.FC<ShapesExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-geom-tudasproba-sorter',
  topicTitle = '9. Gyakorlás, tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Rendszerezd a síkidomokat, a szögeket és a mozgásokat!"
      levels={SHAPES_EXAM_SORTER_LEVELS}
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

export default ShapesExamSorter;
