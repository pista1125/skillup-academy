import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface G11VectorAdditionSorterProps {
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

const VECTOR_ADDITION_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Skalár, vektor vagy művelet?',
    description: 'Döntsd el, hogy skalármennyiségről, vektormennyiségről vagy vektorokkal végzett műveletről van szó!',
    categories: [
      { id: 'scalar', name: 'Skalármennyiség', color: 'emerald' },
      { id: 'vector', name: 'Vektormennyiség', color: 'blue' },
      { id: 'op', name: 'Vektorművelet', color: 'purple' }
    ],
    items: [
      { id: 'vas1', text: 'Egy test tömege (2 kg)', categoryId: 'scalar' },
      { id: 'vas2', text: 'A futás ideje (12,4 s)', categoryId: 'scalar' },
      { id: 'vas3', text: 'Két város távolsága (233 km)', categoryId: 'scalar' },
      { id: 'vas4', text: 'Egy repülőgép elmozdulása 1 s alatt', categoryId: 'vector' },
      { id: 'vas5', text: 'Az oldalszél sebessége', categoryId: 'vector' },
      { id: 'vas6', text: 'A kötélhúzásban kifejtett erő', categoryId: 'vector' },
      { id: 'vas7', text: 'Két eltolás egymásutánjának helyettesítése egyetlen eltolással', categoryId: 'op' },
      { id: 'vas8', text: 'Az ellentett vektor képzése', categoryId: 'op' },
      { id: 'vas9', text: 'Erők eredőjének meghatározása', categoryId: 'op' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mi az összeg? (ABCD paralelogramma)',
    description: 'Csoportosítsd az összegeket az eredményük szerint!',
    categories: [
      { id: 'zero', name: '→0 (nullvektor)', color: 'slate' },
      { id: 'ac', name: '→AC', color: 'blue' },
      { id: 'ad', name: '→AD', color: 'rose' }
    ],
    items: [
      { id: 'vas10', text: '→AB + →BA', categoryId: 'zero' },
      { id: 'vas11', text: '→AB + →BC + →CA', categoryId: 'zero' },
      { id: 'vas12', text: '→AB + →BC + →CD + →DA', categoryId: 'zero' },
      { id: 'vas13', text: '→AB + →BC', categoryId: 'ac' },
      { id: 'vas14', text: '→AD + →DC', categoryId: 'ac' },
      { id: 'vas15', text: '→AB + →AD', categoryId: 'ac' },
      { id: 'vas16', text: '→AB + →BD', categoryId: 'ad' },
      { id: 'vas17', text: '→AC + →CD', categoryId: 'ad' },
      { id: 'vas18', text: '→AB + →BC + →CD', categoryId: 'ad' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hogyan aránylik |→a + →b| és |→a| + |→b|?',
    description: 'Mindig igaz: |→a + →b| ≤ |→a| + |→b|. Melyik eset melyik csoportba tartozik?',
    categories: [
      { id: 'eq', name: '|→a + →b| = |→a| + |→b|', color: 'emerald' },
      { id: 'lt', name: '0 < |→a + →b| < |→a| + |→b|', color: 'amber' },
      { id: 'null', name: '→a + →b = →0', color: 'rose' }
    ],
    items: [
      { id: 'vas19', text: 'Két ember ugyanabba az irányba húzza a szekeret', categoryId: 'eq' },
      { id: 'vas20', text: '3 km-t északra, majd még 2 km-t északra sétálunk', categoryId: 'eq' },
      { id: 'vas21', text: '→a és →b (nem nulla) párhuzamos és egyirányú', categoryId: 'eq' },
      { id: 'vas22', text: 'Leszálló gép elmozdulása és a merőleges oldalszél', categoryId: 'lt' },
      { id: 'vas23', text: '|→a| = 5, |→b| = 3, a szögük 60°', categoryId: 'lt' },
      { id: 'vas24', text: '|→a| = 6, |→b| = 2,5, ellentétes irányúak', categoryId: 'lt' },
      { id: 'vas25', text: '→b = −→a', categoryId: 'null' },
      { id: 'vas26', text: '→a = →AB és →b = →BA', categoryId: 'null' },
      { id: 'vas27', text: 'Döntetlen kötélhúzás: a két csapat által kifejtett erő', categoryId: 'null' }
    ]
  }
];

const VECTOR_ADDITION_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: VECTOR_ADDITION_SORTER_LEVELS_LIST[0],
  2: VECTOR_ADDITION_SORTER_LEVELS_LIST[1],
  3: VECTOR_ADDITION_SORTER_LEVELS_LIST[2]
};

export const G11VectorAdditionSorter: React.FC<G11VectorAdditionSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-geo-vektor-osszeadas-sorter',
  topicTitle = '1. Vektorok összeadása – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="vektorok-osszeadasa"
      title={topicTitle}
      subtitle="Rendszerezd a skalár- és vektormennyiségeket, a vektorösszegeket és az összegvektor hosszát!"
      levels={VECTOR_ADDITION_SORTER_LEVELS}
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

export default G11VectorAdditionSorter;
