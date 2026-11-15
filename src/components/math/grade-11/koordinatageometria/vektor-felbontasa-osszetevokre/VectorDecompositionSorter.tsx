import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface VectorDecompositionSorterProps {
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

const VECTOR_DECOMPOSITION_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Felbontható-e?',
    description: 'Döntsd el, hogy a vektor felbontható-e a megadott két irányba, és ha igen, egyértelműen-e!',
    categories: [
      { id: 'unique', name: 'Egyértelműen felbontható', color: 'emerald' },
      { id: 'none', name: 'Nem bontható fel', color: 'rose' },
      { id: 'many', name: 'Felbontható, de nem egyértelműen', color: 'amber' }
    ],
    items: [
      { id: 'vds1', text: '→a és →b nem párhuzamos, →v tetszőleges', categoryId: 'unique' },
      { id: 'vds2', text: 'Szabályos hatszög: →AC felbontása →AB és →AF irányába', categoryId: 'unique' },
      { id: 'vds3', text: 'A katamarán elmozdulása a partra merőleges és a parttal párhuzamos irányba', categoryId: 'unique' },
      { id: 'vds4', text: '→a ∥ →b, →v merőleges rájuk', categoryId: 'none' },
      { id: 'vds5', text: 'Szabályos hatszög: →AC felbontása →AB és →DE irányába', categoryId: 'none' },
      { id: 'vds6', text: '→a és →b egyirányú, →v 45°-os szöget zár be velük', categoryId: 'none' },
      { id: 'vds7', text: '→a ∥ →b, és →v is párhuzamos velük', categoryId: 'many' },
      { id: 'vds8', text: '→b = −→a és →v = 2→a', categoryId: 'many' },
      { id: 'vds9', text: 'Szabályos hatszög: →AD felbontása →AO és →BC irányába', categoryId: 'many' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Az együttható előjele',
    description: 'Pozitív, negatív vagy nulla a kérdezett együttható?',
    categories: [
      { id: 'pos', name: 'Pozitív', color: 'blue' },
      { id: 'neg', name: 'Negatív', color: 'rose' },
      { id: 'zero', name: 'Nulla', color: 'slate' }
    ],
    items: [
      { id: 'vds10', text: '→v = 3→a − 2→b – az →a együtthatója', categoryId: 'pos' },
      { id: 'vds11', text: 'Hatszög: →AO = m · →AB + n · →AF – az n', categoryId: 'pos' },
      { id: 'vds12', text: 'Az →a irányú összetevő →a-val egyirányú', categoryId: 'pos' },
      { id: 'vds13', text: '→v = 3→a − 2→b – a →b együtthatója', categoryId: 'neg' },
      { id: 'vds14', text: '→q = −1 · →u + 3/2 · →v – az →u együtthatója', categoryId: 'neg' },
      { id: 'vds15', text: 'Az →a irányú összetevő →a-val ellentétes irányú', categoryId: 'neg' },
      { id: 'vds16', text: '→u = 2→b + 0→c – a →c együtthatója', categoryId: 'zero' },
      { id: 'vds17', text: '→v ∥ →a (és →a ∦ →b) – a →b együtthatója', categoryId: 'zero' },
      { id: 'vds18', text: 'A nullvektor felbontása – az →a együtthatója', categoryId: 'zero' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz, hamis vagy adatfüggő?',
    description: 'Mindig igaz, hamis, vagy a konkrét vektoroktól függ?',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'depends', name: 'Adatfüggő', color: 'amber' }
    ],
    items: [
      { id: 'vds19', text: 'Nem párhuzamos →a és →b esetén minden →v felbontása egyértelmű', categoryId: 'true' },
      { id: 'vds20', text: 'Merőleges összetevők esetén |→v|² az összetevők hosszának négyzetösszege', categoryId: 'true' },
      { id: 'vds21', text: 'Lejtőn a súlyerő lejtővel párhuzamos összetevője G · sin α', categoryId: 'true' },
      { id: 'vds22', text: 'Az összetevők hosszának összege mindig |→v|', categoryId: 'false' },
      { id: 'vds23', text: 'Két párhuzamos vektor irányába a sík bármely vektora felbontható', categoryId: 'false' },
      { id: 'vds24', text: 'Lejtőn a súlyerő lejtőre merőleges összetevője G · sin α', categoryId: 'false' },
      { id: 'vds25', text: 'Az →a irányú összetevő hosszabb, mint →a', categoryId: 'depends' },
      { id: 'vds26', text: 'A felbontás paralelogrammája téglalap', categoryId: 'depends' },
      { id: 'vds27', text: 'A felbontásban az m együttható negatív', categoryId: 'depends' }
    ]
  }
];

const VECTOR_DECOMPOSITION_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: VECTOR_DECOMPOSITION_SORTER_LEVELS_LIST[0],
  2: VECTOR_DECOMPOSITION_SORTER_LEVELS_LIST[1],
  3: VECTOR_DECOMPOSITION_SORTER_LEVELS_LIST[2]
};

export const VectorDecompositionSorter: React.FC<VectorDecompositionSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-geo-vektor-felbontas-sorter',
  topicTitle = '4. Ráadás – Vektor felbontása összetevőkre – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="vektor-felbontasa-osszetevokre"
      title={topicTitle}
      subtitle="Rendszerezd, mikor bontható fel egy vektor, milyen előjelűek az együtthatók, és mely állítások igazak!"
      levels={VECTOR_DECOMPOSITION_SORTER_LEVELS}
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

export default VectorDecompositionSorter;
