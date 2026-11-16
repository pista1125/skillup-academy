import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NegativesExamSorterProps {
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

const NEG_EXAM_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Negatív, nulla vagy pozitív?',
    description: 'Milyen számmal írnád le a helyzetet?',
    categories: [
      { id: 'neg', name: 'Negatív szám', color: 'blue' },
      { id: 'zero', name: 'Nulla', color: 'amber' },
      { id: 'pos', name: 'Pozitív szám', color: 'rose' }
    ],
    items: [
      { id: 'nx4s1', text: '6 fokkal fagypont alatt', categoryId: 'neg' },
      { id: 'nx4s2', text: 'a mélygarázs szintje', categoryId: 'neg' },
      { id: 'nx4s3', text: '200 Ft tartozás', categoryId: 'neg' },
      { id: 'nx4s4', text: 'a tengerszint', categoryId: 'zero' },
      { id: 'nx4s5', text: 'a földszint', categoryId: 'zero' },
      { id: 'nx4s6', text: 'az olvadó jég hőmérséklete', categoryId: 'zero' },
      { id: 'nx4s7', text: 'a 400 m-es hegycsúcs', categoryId: 'pos' },
      { id: 'nx4s8', text: 'a −8 ellentettje', categoryId: 'pos' },
      { id: 'nx4s9', text: 'nyári kánikula', categoryId: 'pos' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hová esik a számegyenesen?',
    description: 'Számold ki, és döntsd el, melyik szakaszra esik!',
    categories: [
      { id: 'lt', name: 'A −10-nél kisebb', color: 'purple' },
      { id: 'mid', name: 'A −10 és a 0 között', color: 'blue' },
      { id: 'gt', name: 'A 0-nál nagyobb', color: 'rose' }
    ],
    items: [
      { id: 'nx4s10', text: '−14', categoryId: 'lt' },
      { id: 'nx4s11', text: '−17 °C', categoryId: 'lt' },
      { id: 'nx4s12', text: 'a −15 kisebb tízes számszomszédja', categoryId: 'lt' },
      { id: 'nx4s13', text: '−3', categoryId: 'mid' },
      { id: 'nx4s14', text: '9 fabatka és 13 adósságcédula', categoryId: 'mid' },
      { id: 'nx4s15', text: '−1 °C, 4 fokot csökkent', categoryId: 'mid' },
      { id: 'nx4s16', text: '11', categoryId: 'gt' },
      { id: 'nx4s17', text: 'a −5 ellentettje', categoryId: 'gt' },
      { id: 'nx4s18', text: '7 fabatka és 2 adósságcédula', categoryId: 'gt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Nőtt, csökkent vagy nem változott?',
    description: 'Hőmérséklet és vagyon: merre változott?',
    categories: [
      { id: 'up', name: 'Melegedett / nőtt', color: 'rose' },
      { id: 'down', name: 'Hűlt / csökkent', color: 'blue' },
      { id: 'same', name: 'Nem változott', color: 'emerald' }
    ],
    items: [
      { id: 'nx4s19', text: '−5 °C → 2 °C', categoryId: 'up' },
      { id: 'nx4s20', text: '−1500 Ft → 2000 Ft', categoryId: 'up' },
      { id: 'nx4s21', text: '−10 °C → −8 °C', categoryId: 'up' },
      { id: 'nx4s22', text: '−4 °C → −19 °C', categoryId: 'down' },
      { id: 'nx4s23', text: '500 Ft → −1000 Ft', categoryId: 'down' },
      { id: 'nx4s24', text: '15 °C → −20 °C', categoryId: 'down' },
      { id: 'nx4s25', text: '−3 °C → −3 °C', categoryId: 'same' },
      { id: 'nx4s26', text: '−6 °C reggel és −6 °C este', categoryId: 'same' },
      { id: 'nx4s27', text: '1800 Ft → 1800 Ft', categoryId: 'same' }
    ]
  }
];

const NEG_EXAM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NEG_EXAM_SORTER_LEVELS_LIST[0],
  2: NEG_EXAM_SORTER_LEVELS_LIST[1],
  3: NEG_EXAM_SORTER_LEVELS_LIST[2]
};

export const NegativesExamSorter: React.FC<NegativesExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-neg-tudasproba-sorter',
  topicTitle = '4. Gyakorlás, tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="negativ-szamok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Vegyes csoportosítás az egész fejezetből."
      levels={NEG_EXAM_SORTER_LEVELS}
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

export default NegativesExamSorter;
